const { test } = require("node:test");
const assert = require("node:assert");
const path = require("node:path");
const fs = require("node:fs");
const ts = require("typescript");
const Module = require("node:module");
const { Webhook } = require("standardwebhooks");

// Configure test environment variables
process.env.NEXT_PUBLIC_REVIEW_PHASE_FREE_ACCESS = "false";
process.env.DODO_PAYMENTS_MODE = "live_mode";
process.env.DODO_PAYMENTS_API_KEY = "live_test_api_key_12345";
const TEST_WEBHOOK_KEY = "whsec_MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw";
process.env.DODO_PAYMENTS_WEBHOOK_KEY = TEST_WEBHOOK_KEY;

// Register in-memory TypeScript transpilation and path alias resolution for tests
require.extensions[".ts"] = function (module, filename) {
  const code = fs.readFileSync(filename, "utf8");
  const result = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  });
  module._compile(result.outputText, filename);
};

// Hook require for @/ path aliases
const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  if (request.startsWith("@/")) {
    const relative = request.slice(2);
    const resolved = path.join(__dirname, "..", "src", relative);
    if (fs.existsSync(resolved + ".ts")) return resolved + ".ts";
    if (fs.existsSync(resolved + ".tsx")) return resolved + ".tsx";
    if (fs.existsSync(path.join(resolved, "index.ts"))) return path.join(resolved, "index.ts");
    if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) return resolved;
    return originalResolveFilename.call(this, resolved, parent, isMain, options);
  }
  return originalResolveFilename.call(this, request, parent, isMain, options);
};

// In-Memory Database Mock
class MockDatabase {
  constructor() {
    this.reset();
  }

  reset() {
    this.customers = new Map();
    this.purchases = new Map();
    this.webhooks = new Map();
    this.simulateFailure = false;
  }

  get customer() {
    return {
      findUnique: async ({ where }) => {
        if (where.id) return this.customers.get(where.id) || null;
        if (where.email) {
          for (const c of this.customers.values()) {
            if (c.email === where.email.toLowerCase()) return c;
          }
        }
        if (where.accessKey) {
          for (const c of this.customers.values()) {
            if (c.accessKey === where.accessKey) return c;
          }
        }
        return null;
      },
      create: async ({ data }) => {
        const id = `cust_${Math.random().toString(36).slice(2, 8)}`;
        const record = {
          id,
          accessKey: `key_${id}`,
          ...data,
          email: data.email.toLowerCase(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        this.customers.set(id, record);
        return record;
      },
    };
  }

  get coursePurchase() {
    return {
      findUnique: async ({ where }) => {
        if (where.customerId_courseSlug) {
          const key = `${where.customerId_courseSlug.customerId}_${where.customerId_courseSlug.courseSlug.toLowerCase()}`;
          return this.purchases.get(key) || null;
        }
        if (where.id) {
          for (const p of this.purchases.values()) {
            if (p.id === where.id) return p;
          }
        }
        return null;
      },
      findFirst: async ({ where }) => {
        for (const p of this.purchases.values()) {
          if (where.paymentId && p.paymentId === where.paymentId) return p;
          if (where.customerId && p.customerId === where.customerId) return p;
        }
        return null;
      },
      findMany: async ({ where }) => {
        const list = [];
        for (const p of this.purchases.values()) {
          if (where?.paymentId && p.paymentId !== where.paymentId) continue;
          if (where?.customerId && p.customerId !== where.customerId) continue;
          list.push(p);
        }
        return list;
      },
      create: async ({ data }) => {
        const key = `${data.customerId}_${data.courseSlug.toLowerCase()}`;
        const record = {
          id: `cp_${Math.random().toString(36).slice(2, 8)}`,
          ...data,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        this.purchases.set(key, record);
        return record;
      },
      update: async ({ where, data }) => {
        for (const [k, p] of this.purchases.entries()) {
          if (p.id === where.id) {
            const updated = { ...p, ...data, updatedAt: new Date() };
            this.purchases.set(k, updated);
            return updated;
          }
        }
        throw new Error("Record not found");
      },
    };
  }

  get processedWebhook() {
    return {
      findUnique: async ({ where }) => {
        return this.webhooks.get(where.id) || null;
      },
      findMany: async ({ where } = {}) => {
        const list = [];
        for (const [id, record] of this.webhooks.entries()) {
          if (where?.id?.startsWith && !id.startsWith(where.id.startsWith)) continue;
          list.push(record);
        }
        return list;
      },
      create: async ({ data }) => {
        if (this.simulateFailure) {
          throw new Error("Simulated database persistence failure");
        }
        if (this.webhooks.has(data.id)) {
          const err = new Error("Unique constraint failed on the fields: (`id`)");
          err.code = "P2002";
          throw err;
        }
        const record = { ...data, createdAt: new Date() };
        this.webhooks.set(data.id, record);
        return record;
      },
    };
  }

  async $transaction(fn) {
    return fn(this);
  }
}

const mockDb = new MockDatabase();

// Inject mock into require.cache for prisma
const prismaModulePath = path.join(process.cwd(), "src", "lib", "prisma.ts");
require.cache[prismaModulePath] = {
  id: prismaModulePath,
  filename: prismaModulePath,
  loaded: true,
  exports: {
    __esModule: true,
    default: mockDb,
    prismaClientSingleton: () => mockDb,
  },
};

// Import modules under test
const {
  hasUserPurchasedCourse,
  recordCoursePurchase,
  getManualRefundReviews,
} = require("../src/lib/playbooks.ts");
const webhookRoute = require("../src/app/api/webhook/dodo/route.ts");

// Helper to create and cryptographically sign a webhook request
function createSignedWebhookRequest(payload, secret = TEST_WEBHOOK_KEY, options = {}) {
  const body = typeof payload === "string" ? payload : JSON.stringify(payload);
  const eventId = options.eventId || "wh_msg_" + Math.random().toString(36).slice(2, 10);
  const date = options.date || new Date();
  const wh = new Webhook(secret);
  const signature = options.invalidSig ? "v1,invalid_sig_here" : wh.sign(eventId, date, body);

  const headers = new Headers({
    "content-type": "application/json",
    "webhook-id": eventId,
    "webhook-timestamp": String(Math.floor(date.getTime() / 1000)),
    "webhook-signature": signature,
  });

  return {
    req: new Request("https://theplugd.com/api/webhook/dodo", {
      method: "POST",
      headers,
      body,
    }),
    eventId,
  };
}

// -------------------------------------------------------------
// Test 1: Full refund revokes every Playbook associated with the payment ID
// -------------------------------------------------------------
test("1. Full refund revokes every Playbook associated with the payment ID", async () => {
  mockDb.reset();
  const customer = await mockDb.customer.create({
    data: { email: "fullrefund@example.com" },
  });

  const paymentId = "pay_full_refund_order_001";
  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: "7-ai-automations",
    amount: 3.0,
    paymentId,
    client: mockDb,
  });
  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: "ai-service-business",
    amount: 3.0,
    paymentId,
    client: mockDb,
  });

  // Verify initial access
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, "7-ai-automations"), true);
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, "ai-service-business"), true);

  // Send full refund webhook (is_partial === false)
  const fullRefundPayload = {
    type: "refund.succeeded",
    data: {
      refund_id: "ref_full_001",
      payment_id: paymentId,
      amount: 600,
      currency: "USD",
      is_partial: false,
    },
  };
  const { req } = createSignedWebhookRequest(fullRefundPayload);
  const res = await webhookRoute.POST(req);
  const json = await res.json();

  assert.strictEqual(res.status, 200);
  assert.strictEqual(json.success, true);
  assert.strictEqual(json.message, "Refund processed, access revoked");

  // Verify all entitlements revoked
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, "7-ai-automations"), false);
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, "ai-service-business"), false);
});

// -------------------------------------------------------------
// Test 2: Partial refund (is_partial: true) does NOT revoke any Playbook automatically
// -------------------------------------------------------------
test("2. Partial refund (is_partial: true) does NOT revoke any Playbook automatically", async () => {
  mockDb.reset();
  const customer = await mockDb.customer.create({
    data: { email: "partialcustomer@example.com" },
  });

  const paymentId = "pay_partial_multi_002";
  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: "7-ai-automations",
    amount: 3.0,
    paymentId,
    client: mockDb,
  });
  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: "ai-service-business",
    amount: 3.0,
    paymentId,
    client: mockDb,
  });

  // Send partial refund webhook
  const partialRefundPayload = {
    type: "refund.succeeded",
    data: {
      refund_id: "ref_part_002",
      payment_id: paymentId,
      amount: 300,
      currency: "USD",
      is_partial: true,
      reason: "Customer requested partial return of 1 item",
    },
  };
  const { req } = createSignedWebhookRequest(partialRefundPayload);
  const res = await webhookRoute.POST(req);
  const json = await res.json();

  assert.strictEqual(res.status, 200);
  assert.strictEqual(json.success, true);
  assert.strictEqual(json.status, "partial_refund_flagged_for_review");

  // Verify entitlements are strictly PRESERVED (NOT revoked)
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, "7-ai-automations"), true);
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, "ai-service-business"), true);
});

// -------------------------------------------------------------
// Test 3: Partial refund creates a persistent manual-review record with all required fields
// -------------------------------------------------------------
test("3. Partial refund creates a persistent manual-review record with all required fields", async () => {
  mockDb.reset();
  const customer = await mockDb.customer.create({
    data: { email: "auditcheck@example.com" },
  });

  const paymentId = "pay_partial_audit_003";
  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: "7-ai-automations",
    amount: 3.0,
    paymentId,
    client: mockDb,
  });
  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: "dating-playbook",
    amount: 3.0,
    paymentId,
    client: mockDb,
  });

  const partialRefundPayload = {
    type: "refund.succeeded",
    data: {
      refund_id: "ref_audit_003",
      payment_id: paymentId,
      amount: 300,
      currency: "USD",
      is_partial: true,
      reason: "Item returned per policy",
    },
  };
  const { req } = createSignedWebhookRequest(partialRefundPayload);
  const res = await webhookRoute.POST(req);
  const json = await res.json();

  assert.strictEqual(res.status, 200);
  assert.ok(json.review, "Response must include persisted review record");

  // Check persistent storage
  const reviewKey = "manual_refund_review_ref_audit_003";
  const storedWebhook = await mockDb.processedWebhook.findUnique({ where: { id: reviewKey } });
  assert.ok(storedWebhook, "Review record must be stored in processedWebhook");

  const parsed = JSON.parse(storedWebhook.eventType);
  assert.strictEqual(parsed.refund_id, "ref_audit_003");
  assert.strictEqual(parsed.payment_id, paymentId);
  assert.strictEqual(parsed.refund_amount, 300);
  assert.strictEqual(parsed.currency, "USD");
  assert.strictEqual(parsed.is_partial, true);
  assert.strictEqual(parsed.reason, "Item returned per policy");
  assert.strictEqual(parsed.status, "PENDING_REVIEW");
  assert.ok(parsed.created_at, "Must have ISO created_at timestamp");
  assert.strictEqual(parsed.customer_email, "auditcheck@example.com");
  assert.deepStrictEqual(parsed.affected_playbooks.sort(), ["7-ai-automations", "dating-playbook"].sort());

  // Also verify query helper getManualRefundReviews
  const allReviews = await getManualRefundReviews(mockDb);
  assert.ok(allReviews.some((r) => r.refund_id === "ref_audit_003"));
});

// -------------------------------------------------------------
// Test 4: Duplicate partial-refund webhook deliveries do not duplicate review records or revoke access
// -------------------------------------------------------------
test("4. Duplicate partial-refund webhook deliveries do not duplicate review records or revoke access", async () => {
  mockDb.reset();
  const customer = await mockDb.customer.create({
    data: { email: "duplicatecheck@example.com" },
  });

  const paymentId = "pay_dup_004";
  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: "7-ai-automations",
    amount: 3.0,
    paymentId,
    client: mockDb,
  });

  const partialRefundPayload = {
    type: "refund.succeeded",
    data: {
      refund_id: "ref_dup_004",
      payment_id: paymentId,
      amount: 300,
      currency: "USD",
      is_partial: true,
    },
  };

  // Delivery 1
  const req1 = createSignedWebhookRequest(partialRefundPayload, TEST_WEBHOOK_KEY, { eventId: "evt_dup_first" });
  const res1 = await webhookRoute.POST(req1.req);
  assert.strictEqual(res1.status, 200);

  // Delivery 2 with same webhook-id header (standard Dodo retry)
  const req2 = createSignedWebhookRequest(partialRefundPayload, TEST_WEBHOOK_KEY, { eventId: "evt_dup_first" });
  const res2 = await webhookRoute.POST(req2.req);
  const json2 = await res2.json();
  assert.strictEqual(res2.status, 200);
  assert.strictEqual(json2.message, "Duplicate webhook event already processed");

  // Delivery 3 with distinct webhook-id but identical refund_id
  const req3 = createSignedWebhookRequest(partialRefundPayload, TEST_WEBHOOK_KEY, { eventId: "evt_dup_second" });
  const res3 = await webhookRoute.POST(req3.req);
  const json3 = await res3.json();
  assert.strictEqual(res3.status, 200);
  assert.strictEqual(json3.status, "partial_refund_flagged_for_review");

  // Verify only 1 review record exists for ref_dup_004
  const allReviews = await getManualRefundReviews(mockDb);
  const matching = allReviews.filter((r) => r.refund_id === "ref_dup_004");
  assert.strictEqual(matching.length, 1, "Duplicate review record must NOT be created");

  // Entitlement remains preserved
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, "7-ai-automations"), true);
});

// -------------------------------------------------------------
// Test 5: Database failure during review-record creation returns HTTP 500 (retryable)
// -------------------------------------------------------------
test("5. Database failure during review-record creation returns HTTP 500 (retryable)", async () => {
  mockDb.reset();
  const customer = await mockDb.customer.create({
    data: { email: "failclosed@example.com" },
  });

  const paymentId = "pay_fail_closed_005";
  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: "7-ai-automations",
    amount: 3.0,
    paymentId,
    client: mockDb,
  });

  // Enable simulated database failure
  mockDb.simulateFailure = true;

  const partialRefundPayload = {
    type: "refund.succeeded",
    data: {
      refund_id: "ref_fail_005",
      payment_id: paymentId,
      amount: 300,
      currency: "USD",
      is_partial: true,
    },
  };
  const { req } = createSignedWebhookRequest(partialRefundPayload);
  const res = await webhookRoute.POST(req);
  const json = await res.json();

  // Fail closed: must return 500 so webhook sender retries delivery
  assert.strictEqual(res.status, 500);
  assert.strictEqual(json.error, "Failed to persist partial refund review record");

  // Disable failure simulation and retry
  mockDb.simulateFailure = false;
  const retryReq = createSignedWebhookRequest(partialRefundPayload);
  const retryRes = await webhookRoute.POST(retryReq.req);
  assert.strictEqual(retryRes.status, 200);

  // Entitlement remains preserved
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, "7-ai-automations"), true);
});

// -------------------------------------------------------------
// Test 6: Lost dispute continues revoking all relevant Playbooks
// -------------------------------------------------------------
test("6. Lost dispute continues revoking all relevant Playbooks", async () => {
  mockDb.reset();
  const customer = await mockDb.customer.create({
    data: { email: "disputeuser@example.com" },
  });

  const paymentId = "pay_dispute_lost_006";
  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: "7-ai-automations",
    amount: 3.0,
    paymentId,
    client: mockDb,
  });
  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: "ai-service-business",
    amount: 3.0,
    paymentId,
    client: mockDb,
  });

  assert.strictEqual(await hasUserPurchasedCourse(customer.id, "7-ai-automations"), true);
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, "ai-service-business"), true);

  const disputeLostPayload = {
    type: "dispute.lost",
    data: {
      dispute_id: "disp_006",
      payment_id: paymentId,
      amount: 600,
      currency: "USD",
    },
  };
  const { req } = createSignedWebhookRequest(disputeLostPayload);
  const res = await webhookRoute.POST(req);
  const json = await res.json();

  assert.strictEqual(res.status, 200);
  assert.strictEqual(json.success, true);
  assert.strictEqual(json.message, "Dispute lost, access revoked");

  // Verify access is revoked for all items in the disputed payment
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, "7-ai-automations"), false);
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, "ai-service-business"), false);
});

// -------------------------------------------------------------
// Test 7: Existing refund idempotency remains intact
// -------------------------------------------------------------
test("7. Existing refund idempotency remains intact", async () => {
  mockDb.reset();
  const customer = await mockDb.customer.create({
    data: { email: "idempotency@example.com" },
  });

  const paymentId = "pay_idemp_007";
  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: "7-ai-automations",
    amount: 3.0,
    paymentId,
    client: mockDb,
  });

  const fullRefundPayload = {
    type: "refund.succeeded",
    data: {
      refund_id: "ref_idemp_007",
      payment_id: paymentId,
      amount: 300,
      currency: "USD",
      is_partial: false,
    },
  };

  const req1 = createSignedWebhookRequest(fullRefundPayload, TEST_WEBHOOK_KEY, { eventId: "evt_idemp_007" });
  const res1 = await webhookRoute.POST(req1.req);
  assert.strictEqual(res1.status, 200);
  assert.strictEqual((await res1.json()).message, "Refund processed, access revoked");

  // Re-delivery of identical event
  const req2 = createSignedWebhookRequest(fullRefundPayload, TEST_WEBHOOK_KEY, { eventId: "evt_idemp_007" });
  const res2 = await webhookRoute.POST(req2.req);
  const json2 = await res2.json();
  assert.strictEqual(res2.status, 200);
  assert.strictEqual(json2.message, "Duplicate webhook event already processed");
});

// -------------------------------------------------------------
// Test 8: A later full refund correctly revokes remaining entitlements even if a partial refund preceded it
// -------------------------------------------------------------
test("8. A later full refund correctly revokes remaining entitlements even if a partial refund preceded it", async () => {
  mockDb.reset();
  const customer = await mockDb.customer.create({
    data: { email: "twosteprefund@example.com" },
  });

  const paymentId = "pay_two_step_008";
  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: "7-ai-automations",
    amount: 3.0,
    paymentId,
    client: mockDb,
  });
  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: "ai-service-business",
    amount: 3.0,
    paymentId,
    client: mockDb,
  });

  // Step 1: Partial refund arrives first
  const partialPayload = {
    type: "refund.succeeded",
    data: {
      refund_id: "ref_step1_partial",
      payment_id: paymentId,
      amount: 300,
      currency: "USD",
      is_partial: true,
      reason: "Partial refund granted first",
    },
  };
  const reqPart = createSignedWebhookRequest(partialPayload, TEST_WEBHOOK_KEY, { eventId: "evt_step1_part" });
  const resPart = await webhookRoute.POST(reqPart.req);
  assert.strictEqual(resPart.status, 200);
  assert.strictEqual((await resPart.json()).status, "partial_refund_flagged_for_review");

  // Entitlements remain active after partial refund
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, "7-ai-automations"), true);
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, "ai-service-business"), true);

  // Step 2: Later, full refund arrives
  const fullPayload = {
    type: "refund.succeeded",
    data: {
      refund_id: "ref_step2_full",
      payment_id: paymentId,
      amount: 300,
      currency: "USD",
      is_partial: false,
      reason: "Remainder of order refunded",
    },
  };
  const reqFull = createSignedWebhookRequest(fullPayload, TEST_WEBHOOK_KEY, { eventId: "evt_step2_full" });
  const resFull = await webhookRoute.POST(reqFull.req);
  assert.strictEqual(resFull.status, 200);
  assert.strictEqual((await resFull.json()).message, "Refund processed, access revoked");

  // Entitlements are now properly revoked
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, "7-ai-automations"), false);
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, "ai-service-business"), false);
});
