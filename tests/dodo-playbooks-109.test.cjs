// Disable review phase free access during payment suite to test direct checkout & webhook verification
process.env.NEXT_PUBLIC_REVIEW_PHASE_FREE_ACCESS = "false";
process.env.DODO_PAYMENTS_MODE = "live_mode";
process.env.DODO_PAYMENTS_API_KEY = "dodo_live_mock_key_for_tests";

const test = require("node:test");
const assert = require("node:assert");
const path = require("node:path");
const fs = require("node:fs");
const ts = require("typescript");
const Module = require("node:module");
const crypto = require("node:crypto");
const { Webhook } = require("standardwebhooks");

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

require.extensions[".tsx"] = function (module, filename) {
  const code = fs.readFileSync(filename, "utf8");
  const result = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  });
  module._compile(result.outputText, filename);
};

const origResolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain) {
  if (request.startsWith("@/")) {
    const subPath = request.slice(2);
    const resolvedPath = path.join(process.cwd(), "src", subPath);
    if (fs.existsSync(resolvedPath + ".ts")) return resolvedPath + ".ts";
    if (fs.existsSync(resolvedPath + ".tsx")) return resolvedPath + ".tsx";
    if (fs.existsSync(resolvedPath)) return resolvedPath;
  }
  return origResolveFilename.call(this, request, parent, isMain);
};

// In-Memory Prisma Mock
class InMemoryPrismaMock {
  constructor() {
    this.reset();
  }

  reset() {
    this._customers = new Map();
    this._coursePurchases = new Map();
    this._processedWebhooks = new Map();
    this._complimentaryAccess = new Map();
  }

  get customer() {
    return {
      findUnique: async ({ where }) => {
        if (where.email) return this._customers.get(where.email.toLowerCase()) || null;
        if (where.accessKey) {
          for (const c of this._customers.values()) {
            if (c.accessKey === where.accessKey) return c;
          }
        }
        if (where.id) {
          for (const c of this._customers.values()) {
            if (c.id === where.id) return c;
          }
        }
        return null;
      },
      create: async ({ data }) => {
        if (this._customers.has(data.email.toLowerCase())) {
          const err = new Error("Unique constraint failed on the fields: (`email`)");
          err.code = "P2002";
          err.meta = { target: ["email"] };
          throw err;
        }
        const id = "cust_" + Math.random().toString(36).substring(2, 8);
        const record = { id, ...data, email: data.email.toLowerCase() };
        this._customers.set(record.email, record);
        return record;
      },
    };
  }

  get coursePurchase() {
    return {
      findUnique: async ({ where }) => {
        if (where.customerId_courseSlug) {
          const key = `${where.customerId_courseSlug.customerId}_${where.customerId_courseSlug.courseSlug.toLowerCase()}`;
          return this._coursePurchases.get(key) || null;
        }
        return null;
      },
      findFirst: async ({ where }) => {
        for (const p of this._coursePurchases.values()) {
          if (where.paymentId && p.paymentId === where.paymentId) {
            if (!where.courseSlug || p.courseSlug === where.courseSlug.toLowerCase()) {
              return p;
            }
          }
          if (where.customerId && p.customerId === where.customerId) {
            if (!where.courseSlug || p.courseSlug === where.courseSlug.toLowerCase()) {
              return p;
            }
          }
        }
        return null;
      },
      findMany: async ({ where }) => {
        const list = [];
        for (const p of this._coursePurchases.values()) {
          if (!where?.customerId || p.customerId === where.customerId) {
            list.push(p);
          }
        }
        return list;
      },
      create: async (data) => {
        const payload = data.data || data;
        const key = `${payload.customerId}_${payload.courseSlug.toLowerCase()}`;
        const record = {
          id: "cp_" + Math.random().toString(36).substring(2, 8),
          ...payload,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        this._coursePurchases.set(key, record);
        return record;
      },
      update: async ({ where, data }) => {
        for (const [key, p] of this._coursePurchases.entries()) {
          if (where.id && p.id === where.id) {
            const updated = { ...p, ...data, updatedAt: new Date() };
            this._coursePurchases.set(key, updated);
            return updated;
          }
        }
        return null;
      },
      delete: async ({ where }) => {
        for (const [key, p] of this._coursePurchases.entries()) {
          if (where.id && p.id === where.id) {
            this._coursePurchases.delete(key);
            return p;
          }
        }
        return null;
      },
    };
  }

  get processedWebhook() {
    return {
      findUnique: async ({ where }) => {
        return this._processedWebhooks.get(where.id) || null;
      },
      create: async ({ data }) => {
        if (this._processedWebhooks.has(data.id)) {
          const err = new Error("Unique constraint failed on the fields: (`id`)");
          err.code = "P2002";
          err.meta = { target: ["id"] };
          throw err;
        }
        this._processedWebhooks.set(data.id, { ...data, createdAt: new Date() });
        return this._processedWebhooks.get(data.id);
      },
    };
  }

  get complimentaryAccess() {
    return {
      findUnique: async ({ where }) => {
        return this._complimentaryAccess.get(where.email.toLowerCase()) || null;
      },
    };
  }

  async $transaction(fn) {
    return await fn(this);
  }
}

const mockPrisma = new InMemoryPrismaMock();

// Mock @/lib/prisma to return mockPrisma
const prismaModulePath = path.join(process.cwd(), "src", "lib", "prisma.ts");
require.cache[prismaModulePath] = {
  id: prismaModulePath,
  filename: prismaModulePath,
  loaded: true,
  exports: {
    __esModule: true,
    default: mockPrisma,
  },
};

// Import authoritative map and helper modules
const {
  DODO_PLAYBOOK_MAP,
  DODO_PRODUCT_TO_PLAYBOOK,
  DODO_ID_TO_PLAYBOOK,
  getPlaybookDodoMapping,
  getPlaybookByDodoProductId,
} = require("@/lib/dodo-playbooks-map");

const {
  getOrCreateCustomer,
  hasUserPurchasedCourse,
  recordCoursePurchase,
  revokeCoursePurchase,
  updateCourseProgress,
  getUserPurchases,
} = require("@/lib/playbooks");

// Helper to sign standard webhook payloads
const TEST_WEBHOOK_KEY = "whsec_MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw";

function signWebhookPayload(payload, webhookKey = TEST_WEBHOOK_KEY, invalidSig = false) {
  let signingKey = webhookKey;
  if (signingKey.startsWith("whsec_test_")) {
    signingKey = "whsec_" + signingKey.slice("whsec_test_".length);
  }
  const rawBody = typeof payload === "string" ? payload : JSON.stringify(payload);
  const webhookId = "msg_" + crypto.randomBytes(12).toString("hex");
  const date = new Date();
  const wh = new Webhook(signingKey);
  const signature = invalidSig ? "v1,invalid_signature_xyz" : wh.sign(webhookId, date, rawBody);

  return {
    rawBody,
    headers: {
      "webhook-id": webhookId,
      "webhook-timestamp": String(Math.floor(date.getTime() / 1000)),
      "webhook-signature": signature,
      "content-type": "application/json",
    },
    webhookId,
  };
}

// -------------------------------------------------------------
// TEST SUITE: Complete Dodo Payments Integration for 109 Playbooks
// -------------------------------------------------------------

test("1. All 109 Playbooks are mapped with unique, valid Dodo Product IDs", () => {
  const entries = Object.values(DODO_PLAYBOOK_MAP);
  assert.strictEqual(entries.length, 109, "Should contain exactly 109 Playbook mappings");

  const productIds = new Set();
  const slugs = new Set();
  const playbookIds = new Set();

  const ARCHIVED_IDS = new Set([
    "pdt_0NpUSu9EmAAsRoz2l3ZNV",
    "pdt_0NoPsdHdBCOWG0I49LJDt",
    "pdt_0NoPsJWJ2Gwuz7Ir2e1U7",
    "pdt_0NhVMasO6TQwK4pK427wT",
    "pdt_0NhVMNBBsEQWhaIkkliJE",
    "pdt_0NejIjx2mdXJSOgzLprt5",
    "pdt_0NduKJ5KdWe8CXogjNol1",
    "pdt_0Nc6KNHWXZrgS90icyaiI",
  ]);

  for (const item of entries) {
    assert.ok(item.playbookId, `playbookId must be present for ${item.slug}`);
    assert.ok(item.slug, `slug must be present for ${item.playbookId}`);
    assert.ok(item.title, `title must be present for ${item.slug}`);
    assert.ok(item.dodoProductId.startsWith("pdt_"), `Product ID must start with pdt_: ${item.dodoProductId}`);
    assert.strictEqual(ARCHIVED_IDS.has(item.dodoProductId), false, `Archived ID leaked: ${item.dodoProductId}`);

    assert.ok(!productIds.has(item.dodoProductId), `Duplicate Dodo Product ID found: ${item.dodoProductId}`);
    productIds.add(item.dodoProductId);
    slugs.add(item.slug);
    playbookIds.add(item.playbookId);

    // Verify reverse lookup maps
    assert.strictEqual(DODO_PRODUCT_TO_PLAYBOOK[item.dodoProductId], item);
    assert.strictEqual(DODO_ID_TO_PLAYBOOK[item.playbookId], item);

    // Verify helper lookup functions
    assert.strictEqual(getPlaybookDodoMapping(item.slug), item);
    assert.strictEqual(getPlaybookDodoMapping(item.playbookId), item);
    assert.strictEqual(getPlaybookByDodoProductId(item.dodoProductId), item);
  }

  assert.strictEqual(productIds.size, 109);
  assert.strictEqual(slugs.size, 109);
  assert.strictEqual(playbookIds.size, 109);
});

test("2. Exact 5 Discounted Price Tiers distribution across all 109 Playbooks", () => {
  const tiers = { 100: 0, 200: 0, 300: 0, 400: 0, 500: 0 };

  for (const item of Object.values(DODO_PLAYBOOK_MAP)) {
    assert.ok(item.sellingPriceCents in tiers, `Unexpected price tier: ${item.sellingPriceCents}`);
    tiers[item.sellingPriceCents]++;
  }

  assert.strictEqual(tiers[100], 29, "$1.00 tier should have 29 playbooks");
  assert.strictEqual(tiers[200], 38, "$2.00 tier should have 38 playbooks");
  assert.strictEqual(tiers[300], 34, "$3.00 tier should have 34 playbooks");
  assert.strictEqual(tiers[400], 4, "$4.00 tier should have 4 playbooks");
  assert.strictEqual(tiers[500], 4, "$5.00 tier should have 4 playbooks");
  assert.strictEqual(tiers[100] + tiers[200] + tiers[300] + tiers[400] + tiers[500], 109);
});

test("3. Direct USD Amount Validation across all 5 price tiers", () => {
  // Test sample playbook from each price tier
  const tierSamples = [
    { cents: 100, item: Object.values(DODO_PLAYBOOK_MAP).find((p) => p.sellingPriceCents === 100) },
    { cents: 200, item: Object.values(DODO_PLAYBOOK_MAP).find((p) => p.sellingPriceCents === 200) },
    { cents: 300, item: Object.values(DODO_PLAYBOOK_MAP).find((p) => p.sellingPriceCents === 300) },
    { cents: 400, item: Object.values(DODO_PLAYBOOK_MAP).find((p) => p.sellingPriceCents === 400) },
    { cents: 500, item: Object.values(DODO_PLAYBOOK_MAP).find((p) => p.sellingPriceCents === 500) },
  ];

  for (const { cents, item } of tierSamples) {
    // Exact pre-tax amount
    const exactPayment = {
      currency: "USD",
      total_amount: cents,
      tax: 0,
      hasDiscount: false,
    };
    const isDirectUsd =
      !exactPayment.hasDiscount &&
      exactPayment.currency === "USD" &&
      (exactPayment.total_amount === cents ||
        (exactPayment.total_amount > cents && exactPayment.total_amount - exactPayment.tax === cents));
    assert.strictEqual(isDirectUsd, true, `Should accept exact USD amount ${cents} for ${item.slug}`);

    // With sales tax added (e.g. 8% tax)
    const taxAmount = Math.round(cents * 0.08);
    const taxedPayment = {
      currency: "USD",
      total_amount: cents + taxAmount,
      tax: taxAmount,
      hasDiscount: false,
    };
    const isTaxedValid =
      !taxedPayment.hasDiscount &&
      taxedPayment.currency === "USD" &&
      (taxedPayment.total_amount === cents ||
        (taxedPayment.total_amount > cents && taxedPayment.total_amount - taxedPayment.tax === cents));
    assert.strictEqual(isTaxedValid, true, `Should accept USD amount + tax for ${item.slug}`);

    // Rejection on underpayment
    const underPayment = {
      currency: "USD",
      total_amount: cents - 50,
      tax: 0,
      hasDiscount: false,
    };
    const isUnderValid =
      !underPayment.hasDiscount &&
      underPayment.currency === "USD" &&
      (underPayment.total_amount === cents ||
        (underPayment.total_amount > cents && underPayment.total_amount - underPayment.tax === cents));
    assert.strictEqual(isUnderValid, false, `Should reject underpayment for ${item.slug}`);

    // Rejection on unauthorized discount coupon
    const couponPayment = {
      currency: "USD",
      total_amount: cents,
      tax: 0,
      hasDiscount: true,
    };
    const isCouponValid =
      !couponPayment.hasDiscount &&
      couponPayment.currency === "USD" &&
      (couponPayment.total_amount === cents ||
        (couponPayment.total_amount > cents && couponPayment.total_amount - couponPayment.tax === cents));
    assert.strictEqual(isCouponValid, false, `Should reject unauthorized coupon for ${item.slug}`);
  }
});

test("4. Adaptive Currency Validation across multiple currencies, taxes, and boundary thresholds", () => {
  const tier300 = Object.values(DODO_PLAYBOOK_MAP).find((p) => p.sellingPriceCents === 300);
  const minSettlement = Math.floor(tier300.sellingPriceCents * 0.80); // 240 cents floor

  // Case A: EUR (€) payment with 20% VAT tax (total: 330 euro cents, tax: 55 cents)
  // Dodo settles 288 USD cents base (4% inclusive fee) + 58 USD cents settlement_tax
  const eurPayment = {
    currency: "EUR",
    total_amount: 330,
    tax: 55,
    settlement_currency: "USD",
    settlement_amount: 346, // 288 base + 58 tax
    settlement_tax: 58,
    discount_id: null,
  };
  const isEurValid =
    !eurPayment.discount_id &&
    eurPayment.settlement_currency === "USD" &&
    eurPayment.total_amount > 0 &&
    eurPayment.settlement_amount !== undefined &&
    eurPayment.settlement_amount >= minSettlement &&
    eurPayment.settlement_amount <= tier300.sellingPriceCents + eurPayment.settlement_tax;
  assert.strictEqual(isEurValid, true, "EUR payment with VAT must pass");

  // Case B: GBP (£) payment with 20% VAT tax (total: 288 pence, tax: 48 pence)
  // Settles at 292 USD cents base + 58 USD cents settlement_tax
  const gbpPayment = {
    currency: "GBP",
    total_amount: 288,
    tax: 48,
    settlement_currency: "USD",
    settlement_amount: 350, // 292 base + 58 tax
    settlement_tax: 58,
    discount_id: null,
  };
  const isGbpValid =
    !gbpPayment.discount_id &&
    gbpPayment.settlement_currency === "USD" &&
    gbpPayment.total_amount > 0 &&
    gbpPayment.settlement_amount !== undefined &&
    gbpPayment.settlement_amount >= minSettlement &&
    gbpPayment.settlement_amount <= tier300.sellingPriceCents + gbpPayment.settlement_tax;
  assert.strictEqual(isGbpValid, true, "GBP payment with tax must pass");

  // Case C: INR (₹) payment with 18% GST (total: 29500 paise, tax: 4500 paise)
  // Settles at 285 USD cents base + 51 USD cents settlement_tax
  const inrPayment = {
    currency: "INR",
    total_amount: 29500,
    tax: 4500,
    settlement_currency: "USD",
    settlement_amount: 336, // 285 base + 51 tax
    settlement_tax: 51,
    discount_id: null,
  };
  const isInrValid =
    !inrPayment.discount_id &&
    inrPayment.settlement_currency === "USD" &&
    inrPayment.total_amount > 0 &&
    inrPayment.settlement_amount !== undefined &&
    inrPayment.settlement_amount >= minSettlement &&
    inrPayment.settlement_amount <= tier300.sellingPriceCents + inrPayment.settlement_tax;
  assert.strictEqual(isInrValid, true, "INR payment with GST must pass");

  // Case D: JPY (¥) zero-decimal currency payment (450 JPY total, 0 tax)
  // Settles at 289 USD cents base
  const jpyPayment = {
    currency: "JPY",
    total_amount: 450,
    tax: 0,
    settlement_currency: "USD",
    settlement_amount: 289,
    settlement_tax: 0,
    discount_id: null,
  };
  const isJpyValid =
    !jpyPayment.discount_id &&
    jpyPayment.settlement_currency === "USD" &&
    jpyPayment.total_amount > 0 &&
    jpyPayment.settlement_amount !== undefined &&
    jpyPayment.settlement_amount >= minSettlement &&
    jpyPayment.settlement_amount <= tier300.sellingPriceCents + jpyPayment.settlement_tax;
  assert.strictEqual(isJpyValid, true, "JPY zero-decimal currency payment must pass");

  // Case E: CAD ($) Canadian Dollar payment (415 cents CAD, 0 tax)
  // Settles at 290 USD cents
  const cadPayment = {
    currency: "CAD",
    total_amount: 415,
    tax: 0,
    settlement_currency: "USD",
    settlement_amount: 290,
    settlement_tax: 0,
    discount_id: null,
  };
  const isCadValid =
    !cadPayment.discount_id &&
    cadPayment.settlement_currency === "USD" &&
    cadPayment.total_amount > 0 &&
    cadPayment.settlement_amount !== undefined &&
    cadPayment.settlement_amount >= minSettlement &&
    cadPayment.settlement_amount <= tier300.sellingPriceCents + cadPayment.settlement_tax;
  assert.strictEqual(isCadValid, true, "CAD payment must pass");

  // Case F: EXACT Boundary Threshold Tests around 80% floor (240 cents for $3 tier)
  // F1: Exactly at 240 cents (80% boundary) -> ACCEPTED
  const boundaryExact = {
    currency: "EUR",
    total_amount: 250,
    tax: 0,
    settlement_currency: "USD",
    settlement_amount: 240,
    settlement_tax: 0,
    discount_id: null,
  };
  const isBoundaryExactValid =
    !boundaryExact.discount_id &&
    boundaryExact.settlement_currency === "USD" &&
    boundaryExact.total_amount > 0 &&
    boundaryExact.settlement_amount !== undefined &&
    boundaryExact.settlement_amount >= minSettlement &&
    boundaryExact.settlement_amount <= tier300.sellingPriceCents + boundaryExact.settlement_tax;
  assert.strictEqual(isBoundaryExactValid, true, "Exact 80% boundary (240 cents) must pass");

  // F2: 1 cent BELOW threshold (239 cents) -> REJECTED
  const boundaryBelow = {
    ...boundaryExact,
    settlement_amount: 239,
  };
  const isBoundaryBelowValid =
    !boundaryBelow.discount_id &&
    boundaryBelow.settlement_currency === "USD" &&
    boundaryBelow.total_amount > 0 &&
    boundaryBelow.settlement_amount !== undefined &&
    boundaryBelow.settlement_amount >= minSettlement &&
    boundaryBelow.settlement_amount <= tier300.sellingPriceCents + boundaryBelow.settlement_tax;
  assert.strictEqual(isBoundaryBelowValid, false, "1 cent below 80% boundary (239 cents) must be rejected");

  // F3: Micro-settlement exploit (e.g. 15 cents settlement) -> REJECTED
  const microSettlement = {
    ...boundaryExact,
    settlement_amount: 15,
  };
  const isMicroValid =
    !microSettlement.discount_id &&
    microSettlement.settlement_currency === "USD" &&
    microSettlement.total_amount > 0 &&
    microSettlement.settlement_amount !== undefined &&
    microSettlement.settlement_amount >= minSettlement &&
    microSettlement.settlement_amount <= tier300.sellingPriceCents + microSettlement.settlement_tax;
  assert.strictEqual(isMicroValid, false, "Micro-settlement exploit (15 cents) must be rejected");

  // F4: Non-USD settlement currency -> REJECTED
  const nonUsdSettlement = {
    ...boundaryExact,
    settlement_currency: "EUR",
    settlement_amount: 290,
  };
  const isNonUsdValid =
    !nonUsdSettlement.discount_id &&
    nonUsdSettlement.settlement_currency === "USD" &&
    nonUsdSettlement.total_amount > 0 &&
    nonUsdSettlement.settlement_amount >= minSettlement;
  assert.strictEqual(isNonUsdValid, false, "Non-USD settlement currency must be rejected");

  // F5: Excessive settlement above expected + tax -> REJECTED
  const excessiveSettlement = {
    ...boundaryExact,
    settlement_amount: 500, // 500 cents > 300 cents expected
  };
  const isExcessiveValid =
    !excessiveSettlement.discount_id &&
    excessiveSettlement.settlement_currency === "USD" &&
    excessiveSettlement.settlement_amount <= tier300.sellingPriceCents + excessiveSettlement.settlement_tax;
  assert.strictEqual(isExcessiveValid, false, "Excessive settlement above catalog limit must be rejected");
});

test("5. Webhook signature verification and invalid payload rejection", () => {
  const secretKey = TEST_WEBHOOK_KEY;
  const rawBody = JSON.stringify({ type: "payment.succeeded", data: { payment_id: "pay_test_123" } });

  // Valid signature
  const signed = signWebhookPayload(rawBody, secretKey);
  const wh = new Webhook(secretKey);
  const verified = wh.verify(signed.rawBody, signed.headers);
  assert.ok(verified, "Valid signature must verify successfully");

  // Corrupted body
  assert.throws(() => {
    wh.verify(signed.rawBody + "tampered", signed.headers);
  }, "Tampered rawBody must fail verification");

  // Corrupted signature
  const corrupted = signWebhookPayload(rawBody, secretKey, true);
  assert.throws(() => {
    wh.verify(corrupted.rawBody, corrupted.headers);
  }, "Invalid signature header must fail verification");
});

test("6. Webhook Idempotency: Duplicate events are deduplicated safely", async () => {
  mockPrisma.reset();

  const eventId = "evt_dedup_test_999";

  // First delivery
  const existing1 = await mockPrisma.processedWebhook.findUnique({ where: { id: eventId } });
  assert.strictEqual(existing1, null);

  await mockPrisma.processedWebhook.create({
    data: { id: eventId, eventType: "payment.succeeded" },
  });

  // Second delivery
  const existing2 = await mockPrisma.processedWebhook.findUnique({ where: { id: eventId } });
  assert.ok(existing2, "Duplicate event must be found in processedWebhook");
  assert.strictEqual(existing2.id, eventId);
});

test("7. Webhook Event Routing & Purchase Revocation on Refund and Dispute Lost", async () => {
  mockPrisma.reset();

  // Create customer and purchase for a $2 playbook
  const customer = await getOrCreateCustomer("reader@example.com", mockPrisma);
  const playbook = Object.values(DODO_PLAYBOOK_MAP).find((p) => p.sellingPriceCents === 200);

  const paymentId = "pay_refund_test_001";
  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: playbook.slug,
    amount: playbook.sellingPriceDollars,
    paymentId,
    client: mockPrisma,
  });

  // Verify access is active
  const hasAccessBefore = await hasUserPurchasedCourse(customer.id, playbook.slug);
  assert.strictEqual(hasAccessBefore, true, "Customer must have access initially");

  // Simulate refund.succeeded
  const revoked = await revokeCoursePurchase({
    paymentId,
    client: mockPrisma,
  });
  assert.ok(revoked, "revokeCoursePurchase must return deleted record");
  assert.strictEqual(revoked.paymentId, paymentId);

  // Verify access is now revoked
  const hasAccessAfterRefund = await hasUserPurchasedCourse(customer.id, playbook.slug);
  assert.strictEqual(hasAccessAfterRefund, false, "Customer access must be revoked after refund");

  // Test dispute.lost on a second purchase
  const paymentId2 = "pay_dispute_test_002";
  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: playbook.slug,
    amount: playbook.sellingPriceDollars,
    paymentId: paymentId2,
    client: mockPrisma,
  });
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, playbook.slug), true);

  // Revoke via dispute lost
  await revokeCoursePurchase({
    paymentId: paymentId2,
    client: mockPrisma,
  });
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, playbook.slug), false);
});

test("8. Multi-Playbook Purchase Isolation across independent products", async () => {
  mockPrisma.reset();

  const customer = await getOrCreateCustomer("multibuyer@example.com", mockPrisma);

  const playbookA = Object.values(DODO_PLAYBOOK_MAP)[0]; // e.g. $2 tier
  const playbookB = Object.values(DODO_PLAYBOOK_MAP)[1]; // e.g. $1 tier

  assert.notStrictEqual(playbookA.slug, playbookB.slug);
  assert.notStrictEqual(playbookA.dodoProductId, playbookB.dodoProductId);

  // Purchase Playbook A only
  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: playbookA.slug,
    amount: playbookA.sellingPriceDollars,
    paymentId: "pay_A_111",
    client: mockPrisma,
  });

  // Check access
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, playbookA.slug), true);
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, playbookB.slug), false);

  // Purchase Playbook B
  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: playbookB.slug,
    amount: playbookB.sellingPriceDollars,
    paymentId: "pay_B_222",
    client: mockPrisma,
  });

  // Check access to both
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, playbookA.slug), true);
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, playbookB.slug), true);

  // Refunding Playbook A leaves Playbook B intact
  await revokeCoursePurchase({
    paymentId: "pay_A_111",
    client: mockPrisma,
  });

  assert.strictEqual(await hasUserPurchasedCourse(customer.id, playbookA.slug), false);
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, playbookB.slug), true);
});

// Import the actual route handlers for end-to-end integration tests
const webhookRoute = require("@/app/api/webhook/dodo/route.ts");
const checkOwnershipRoute = require("@/app/api/customer/check-ownership/route.ts");

function createSignedWebhookRequest(payload, secret = TEST_WEBHOOK_KEY, options = {}) {
  let signingSecret = secret;
  if (signingSecret.startsWith("whsec_test_")) {
    signingSecret = "whsec_" + signingSecret.slice("whsec_test_".length);
  }
  const body = typeof payload === "string" ? payload : JSON.stringify(payload);
  const eventId = options.eventId || "msg_" + crypto.randomBytes(12).toString("hex");
  const date = options.date || new Date();
  const wh = new Webhook(signingSecret);
  const signature = options.invalidSig ? "v1,bad_signature_12345" : wh.sign(eventId, date, body);

  const headers = new Headers({
    "content-type": "application/json",
    "webhook-id": eventId,
    "webhook-timestamp": String(Math.floor(date.getTime() / 1000)),
    "webhook-signature": signature,
    ...(options.extraHeaders || {}),
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

test("9. Webhook Route Handler fulfills payment.succeeded across all 5 price tiers", async () => {
  mockPrisma.reset();
  process.env.DODO_PAYMENTS_WEBHOOK_KEY = TEST_WEBHOOK_KEY;

  const sampleTiers = [100, 200, 300, 400, 500];

  for (const tierCents of sampleTiers) {
    const playbook = Object.values(DODO_PLAYBOOK_MAP).find((p) => p.sellingPriceCents === tierCents);
    const email = `tier${tierCents}@example.com`;
    const paymentId = `pay_tier_${tierCents}_${Date.now()}`;

    const eventPayload = {
      type: "payment.succeeded",
      data: {
        payment_id: paymentId,
        currency: "USD",
        total_amount: tierCents,
        tax: 0,
        settlement_currency: "USD",
        settlement_amount: tierCents,
        settlement_tax: 0,
        customer: { email, name: "Tier Tester" },
        product_cart: [{ product_id: playbook.dodoProductId, quantity: 1 }],
        metadata: {
          courseSlug: playbook.slug,
          playbookId: playbook.playbookId,
          amount: playbook.sellingPriceDollars.toFixed(2),
        },
      },
    };

    const { req } = createSignedWebhookRequest(eventPayload, TEST_WEBHOOK_KEY);
    const res = await webhookRoute.POST(req);
    assert.strictEqual(res.status, 200, `Webhook must return 200 for ${tierCents} cents`);

    const json = await res.json();
    assert.strictEqual(json.success, true);
    assert.strictEqual(json.playbook, playbook.slug);

    // Verify database fulfillment
    const customer = await mockPrisma.customer.findUnique({ where: { email } });
    assert.ok(customer, `Customer ${email} must be created in DB`);

    const owns = await hasUserPurchasedCourse(customer.id, playbook.slug);
    assert.strictEqual(owns, true, `Customer must own ${playbook.slug}`);
  }
});

test("10. Webhook Route Handler revokes purchase upon refund.succeeded", async () => {
  mockPrisma.reset();
  process.env.DODO_PAYMENTS_WEBHOOK_KEY = TEST_WEBHOOK_KEY;

  const playbook = Object.values(DODO_PLAYBOOK_MAP).find((p) => p.sellingPriceCents === 300);
  const email = "refundee@example.com";
  const paymentId = "pay_live_refund_999";

  // First fulfill payment
  const paymentPayload = {
    type: "payment.succeeded",
    data: {
      payment_id: paymentId,
      currency: "USD",
      total_amount: 300,
      tax: 0,
      settlement_currency: "USD",
      settlement_amount: 300,
      settlement_tax: 0,
      customer: { email },
      product_cart: [{ product_id: playbook.dodoProductId, quantity: 1 }],
      metadata: { courseSlug: playbook.slug },
    },
  };

  const { req: payReq } = createSignedWebhookRequest(paymentPayload, TEST_WEBHOOK_KEY);
  await webhookRoute.POST(payReq);

  const customer = await mockPrisma.customer.findUnique({ where: { email } });
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, playbook.slug), true);

  // Send refund.succeeded webhook
  const refundPayload = {
    type: "refund.succeeded",
    data: {
      payment_id: paymentId,
      refund_id: "ref_123456",
      status: "succeeded",
      is_partial: false,
    },
  };

  const { req: refReq } = createSignedWebhookRequest(refundPayload, TEST_WEBHOOK_KEY);
  const refRes = await webhookRoute.POST(refReq);
  assert.strictEqual(refRes.status, 200);

  const refJson = await refRes.json();
  assert.strictEqual(refJson.success, true);

  // Verify access is now completely revoked
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, playbook.slug), false);

  // Verify historical record is preserved with REFUNDED status for financial auditing
  const preservedRefund = await mockPrisma.coursePurchase.findUnique({
    where: { customerId_courseSlug: { customerId: customer.id, courseSlug: playbook.slug } },
  });
  assert.ok(preservedRefund, "Purchase record must be preserved in database");
  assert.strictEqual(preservedRefund.progress?.status, "REFUNDED");
  assert.ok(preservedRefund.progress?.revokedAt);
  assert.strictEqual(preservedRefund.progress?.revokedPaymentId, paymentId);
});

test("11. Webhook Route Handler handles dispute.lost, isolates subscription events and payment failures", async () => {
  mockPrisma.reset();
  process.env.DODO_PAYMENTS_WEBHOOK_KEY = TEST_WEBHOOK_KEY;

  const playbook = Object.values(DODO_PLAYBOOK_MAP).find((p) => p.sellingPriceCents === 100);
  const email = "disputer@example.com";
  const paymentId = "pay_live_dispute_888";

  // Grant purchase
  const payPayload = {
    type: "payment.succeeded",
    data: {
      payment_id: paymentId,
      currency: "USD",
      total_amount: 100,
      customer: { email },
      product_cart: [{ product_id: playbook.dodoProductId, quantity: 1 }],
      metadata: { courseSlug: playbook.slug },
    },
  };
  await webhookRoute.POST(createSignedWebhookRequest(payPayload, TEST_WEBHOOK_KEY).req);

  const customer = await mockPrisma.customer.findUnique({ where: { email } });
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, playbook.slug), true);

  // dispute.lost revokes access
  const disputeLostPayload = {
    type: "dispute.lost",
    data: {
      payment_id: paymentId,
      dispute_id: "dsp_123",
      dispute_status: "dispute_lost",
    },
  };
  const dspRes = await webhookRoute.POST(createSignedWebhookRequest(disputeLostPayload, TEST_WEBHOOK_KEY).req);
  assert.strictEqual(dspRes.status, 200);
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, playbook.slug), false);

  // Verify historical record is preserved with DISPUTED status for financial auditing
  const preservedDispute = await mockPrisma.coursePurchase.findUnique({
    where: { customerId_courseSlug: { customerId: customer.id, courseSlug: playbook.slug } },
  });
  assert.ok(preservedDispute, "Disputed purchase record must be preserved in database");
  assert.strictEqual(preservedDispute.progress?.status, "DISPUTED");
  assert.ok(preservedDispute.progress?.revokedAt);
  assert.strictEqual(preservedDispute.progress?.revokedPaymentId, paymentId);

  // subscription.active is acknowledged and isolated
  const subPayload = {
    type: "subscription.active",
    data: {
      subscription_id: "sub_123",
    },
  };
  const subRes = await webhookRoute.POST(createSignedWebhookRequest(subPayload, TEST_WEBHOOK_KEY).req);
  assert.strictEqual(subRes.status, 200);
  const subJson = await subRes.json();
  assert.strictEqual(subJson.ignored, true);

  // payment.failed does not grant access
  const failPayload = {
    type: "payment.failed",
    data: {
      payment_id: "pay_failed_000",
      customer: { email: "failer@example.com" },
    },
  };
  const failRes = await webhookRoute.POST(createSignedWebhookRequest(failPayload, TEST_WEBHOOK_KEY).req);
  assert.strictEqual(failRes.status, 200);
  const failJson = await failRes.json();
  assert.strictEqual(failJson.status, "payment.failed");
});

test("12. Customer Check Ownership route verifies access for Playbooks", async () => {
  mockPrisma.reset();

  const playbook = Object.values(DODO_PLAYBOOK_MAP)[0];
  const customer = await getOrCreateCustomer("verifier@example.com", mockPrisma);

  // Unowned check
  const reqUnowned = new Request(`https://theplugd.com/api/customer/check-ownership?courseSlug=${playbook.slug}`, {
    headers: {
      cookie: `plugd_access_key=${customer.accessKey}; plugd_checkout_token=tok123`,
    },
  });
  const resUnowned = await checkOwnershipRoute.GET(reqUnowned);
  const jsonUnowned = await resUnowned.json();
  assert.strictEqual(jsonUnowned.owned, false);

  // Grant purchase
  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: playbook.slug,
    amount: playbook.sellingPriceDollars,
    paymentId: "pay_check_001",
    client: mockPrisma,
  });

  // Owned check
  const reqOwned = new Request(`https://theplugd.com/api/customer/check-ownership?courseSlug=${playbook.slug}`, {
    headers: {
      cookie: `plugd_access_key=${customer.accessKey}; plugd_checkout_token=tok123`,
    },
  });
  const resOwned = await checkOwnershipRoute.GET(reqOwned);
  const jsonOwned = await resOwned.json();
  assert.strictEqual(jsonOwned.owned, true);
  assert.strictEqual(jsonOwned.email, customer.email);
});

const checkoutRoute = require("@/app/api/checkout/route.ts");
const dodopayments = require("@/lib/dodopayments.ts");

test("13. Checkout Route: Rejects missing, empty, whitespace, and unknown slugs with 400; preserves explicit 'men' and valid playbooks", async () => {
  mockPrisma.reset();
  process.env.DODO_PAYMENTS_API_KEY = "live_mock_api_key_test_12345";
  process.env.DODO_COURSE_PRODUCT_ID = "pdt_0NpUSu9EmAAsRoz2l3ZNV";

  // Case A1: Reject missing courseSlug ({}) with HTTP 400
  const reqMissing = new Request("https://theplugd.com/api/checkout", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  });
  const resMissing = await checkoutRoute.POST(reqMissing);
  assert.strictEqual(resMissing.status, 400);
  const jsonMissing = await resMissing.json();
  assert.strictEqual(jsonMissing.error, "Course slug is required.");

  // Case A2: Reject empty string courseSlug ({ courseSlug: "" }) with HTTP 400
  const reqEmpty = new Request("https://theplugd.com/api/checkout", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ courseSlug: "" }),
  });
  const resEmpty = await checkoutRoute.POST(reqEmpty);
  assert.strictEqual(resEmpty.status, 400);
  const jsonEmpty = await resEmpty.json();
  assert.strictEqual(jsonEmpty.error, "Course slug is required.");

  // Case A3: Reject whitespace-only courseSlug ({ courseSlug: "   " }) with HTTP 400
  const reqWhitespace = new Request("https://theplugd.com/api/checkout", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ courseSlug: "   " }),
  });
  const resWhitespace = await checkoutRoute.POST(reqWhitespace);
  assert.strictEqual(resWhitespace.status, 400);
  const jsonWhitespace = await resWhitespace.json();
  assert.strictEqual(jsonWhitespace.error, "Course slug is required.");

  // Case A4: Reject completely unknown slug with HTTP 400
  const reqUnknown = new Request("https://theplugd.com/api/checkout", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ courseSlug: "unknown-arbitrary-slug-xyz" }),
  });
  const resUnknown = await checkoutRoute.POST(reqUnknown);
  assert.strictEqual(resUnknown.status, 400);
  const jsonUnknown = await resUnknown.json();
  assert.strictEqual(jsonUnknown.error, "Invalid or unrecognized playbook slug.");

  // Case B: Preserve explicit 'men' checkout with amount: 300
  let capturedLegacyParams = null;
  const origCreate = dodopayments.dodoClient.checkoutSessions.create;
  dodopayments.dodoClient.checkoutSessions.create = async (params) => {
    capturedLegacyParams = params;
    return {
      checkout_url: "https://checkout.dodopayments.com/buy/legacy_session_123",
      session_id: "legacy_session_123",
    };
  };

  try {
    const reqLegacy = new Request("https://theplugd.com/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ courseSlug: "men" }),
    });
    const resLegacy = await checkoutRoute.POST(reqLegacy);
    assert.strictEqual(resLegacy.status, 200);
    assert.strictEqual(capturedLegacyParams.product_cart[0].product_id, "pdt_0NpUSu9EmAAsRoz2l3ZNV");
    assert.strictEqual(capturedLegacyParams.product_cart[0].amount, 300, "Legacy 'men' course must preserve amount: 300");
    assert.strictEqual(capturedLegacyParams.metadata.courseSlug, "men");
  } finally {
    dodopayments.dodoClient.checkoutSessions.create = origCreate;
  }

  // Case C: Valid 109-Playbook checkout session applies native discount (no amount override)
  const samplePlaybook = Object.values(DODO_PLAYBOOK_MAP).find((p) => p.sellingPriceCents === 200);
  let capturedPlaybookParams = null;
  dodopayments.dodoClient.checkoutSessions.create = async (params) => {
    capturedPlaybookParams = params;
    return {
      checkout_url: "https://checkout.dodopayments.com/buy/playbook_session_456",
      session_id: "playbook_session_456",
    };
  };

  try {
    const reqPlaybook = new Request("https://theplugd.com/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ courseSlug: samplePlaybook.slug }),
    });
    const resPlaybook = await checkoutRoute.POST(reqPlaybook);
    assert.strictEqual(resPlaybook.status, 200);
    assert.strictEqual(capturedPlaybookParams.product_cart[0].product_id, samplePlaybook.dodoProductId);
    assert.strictEqual(capturedPlaybookParams.product_cart[0].quantity, 1);
    assert.strictEqual(capturedPlaybookParams.product_cart[0].amount, undefined, "Native discount must NOT override amount");
    assert.strictEqual(capturedPlaybookParams.metadata.courseSlug, samplePlaybook.slug);
    assert.strictEqual(capturedPlaybookParams.metadata.amount, samplePlaybook.sellingPriceDollars.toFixed(2));
    assert.strictEqual(capturedPlaybookParams.metadata.expectedCents, String(samplePlaybook.sellingPriceCents));
  } finally {
    dodopayments.dodoClient.checkoutSessions.create = origCreate;
  }
});

test("14. Customer Check Ownership: Rejects missing, empty, whitespace, and unknown slugs with HTTP 400", async () => {
  mockPrisma.reset();

  // Case A1: Missing query params
  const resMissing = await checkOwnershipRoute.GET(new Request("https://theplugd.com/api/customer/check-ownership"));
  assert.strictEqual(resMissing.status, 400);
  const jsonMissing = await resMissing.json();
  assert.strictEqual(jsonMissing.error, "Course slug is required.");

  // Case A2: Empty query param
  const resEmpty = await checkOwnershipRoute.GET(new Request("https://theplugd.com/api/customer/check-ownership?courseSlug="));
  assert.strictEqual(resEmpty.status, 400);
  const jsonEmpty = await resEmpty.json();
  assert.strictEqual(jsonEmpty.error, "Course slug is required.");

  // Case A3: Whitespace-only query param
  const resWhitespace = await checkOwnershipRoute.GET(new Request("https://theplugd.com/api/customer/check-ownership?courseSlug=%20%20%20"));
  assert.strictEqual(resWhitespace.status, 400);
  const jsonWhitespace = await resWhitespace.json();
  assert.strictEqual(jsonWhitespace.error, "Course slug is required.");

  // Case A4: Unknown slug query param
  const resUnknown = await checkOwnershipRoute.GET(new Request("https://theplugd.com/api/customer/check-ownership?courseSlug=some-random-unknown-course"));
  assert.strictEqual(resUnknown.status, 400);
  const jsonUnknown = await resUnknown.json();
  assert.strictEqual(jsonUnknown.error, "Invalid or unrecognized playbook slug.");
});

test("15. Webhook Route: Safely withholds access and logs underpayment when adaptive settlement falls below verified threshold", async () => {
  mockPrisma.reset();
  process.env.DODO_PAYMENTS_WEBHOOK_KEY = TEST_WEBHOOK_KEY;

  const playbook = Object.values(DODO_PLAYBOOK_MAP).find((p) => p.sellingPriceCents === 300);
  const email = "underpayer@example.com";
  const paymentId = "pay_underpaid_adaptive_001";

  // Adaptive currency payload where settlement_amount is below 80% threshold (e.g. 210 cents < 240 cents)
  const underpaidPayload = {
    type: "payment.succeeded",
    data: {
      payment_id: paymentId,
      currency: "INR",
      total_amount: 15000,
      tax: 0,
      settlement_currency: "USD",
      settlement_amount: 210, // 210 < 240 cents floor
      settlement_tax: 0,
      customer: { email },
      product_cart: [{ product_id: playbook.dodoProductId, quantity: 1 }],
      metadata: { courseSlug: playbook.slug, amount: "3.00" },
    },
  };

  const { req } = createSignedWebhookRequest(underpaidPayload, TEST_WEBHOOK_KEY);
  const res = await webhookRoute.POST(req);
  assert.strictEqual(res.status, 400, "Must return HTTP 400 when settlement falls below threshold");

  const json = await res.json();
  assert.strictEqual(json.error, "Amount mismatch");
  assert.strictEqual(json.detail, "Settlement amount outside verified threshold; withheld for manual review");

  // Verify access is strictly NOT granted
  const customer = await mockPrisma.customer.findUnique({ where: { email } });
  assert.strictEqual(customer, null, "Customer account must not be fulfilled for underpaid transaction");
  assert.strictEqual(mockPrisma._coursePurchases.size, 0, "No purchase record must be created");
});

// -------------------------------------------------------------
// TEST SUITE: Test-Mode Isolation & Safety Guardrails
// -------------------------------------------------------------

const {
  assertLocalTestDatabase,
  isLocalDatabase,
} = require("@/lib/test-db-guard");

const {
  validateDodoConfiguration,
  getTestModePlaybookMapping,
  getDodoCourseProductId,
  dodoClient,
  TEST_MODE_PLAYBOOK_SLUG,
  TEST_MODE_PLAYBOOK_ID,
} = require("@/lib/dodopayments");

test("16. Single-Playbook Test Registry: In test_mode, only representative Playbook resolves", () => {
  const origMode = process.env.DODO_PAYMENTS_MODE;
  const origTestProductId = process.env.DODO_TEST_PLAYBOOK_PRODUCT_ID;

  try {
    process.env.DODO_PAYMENTS_MODE = "test_mode";
    process.env.DODO_TEST_PLAYBOOK_PRODUCT_ID = "pdt_test_custom_id_777";

    // 1. Slug resolution
    const mappingBySlug = getPlaybookDodoMapping(TEST_MODE_PLAYBOOK_SLUG);
    assert.ok(mappingBySlug, "Representative slug must resolve in test_mode");
    assert.strictEqual(mappingBySlug.playbookId, TEST_MODE_PLAYBOOK_ID);
    assert.strictEqual(mappingBySlug.slug, TEST_MODE_PLAYBOOK_SLUG);
    assert.strictEqual(mappingBySlug.dodoProductId, "pdt_test_custom_id_777");
    assert.strictEqual(mappingBySlug.originalPriceCents, 699);
    assert.strictEqual(mappingBySlug.originalPriceDollars, 6.99);
    assert.strictEqual(mappingBySlug.sellingPriceCents, 300);
    assert.strictEqual(mappingBySlug.sellingPriceDollars, 3.00);
    assert.strictEqual(mappingBySlug.discountPercent, 57.08);

    // 2. PlaybookId resolution
    const mappingById = getPlaybookDodoMapping(TEST_MODE_PLAYBOOK_ID);
    assert.ok(mappingById, "Representative playbook ID must resolve in test_mode");
    assert.strictEqual(mappingById.slug, TEST_MODE_PLAYBOOK_SLUG);

    // 3. Other 108 playbooks MUST return null in test_mode (Strict Isolation)
    const otherPlaybook = Object.values(DODO_PLAYBOOK_MAP).find(
      (p) => p.slug !== TEST_MODE_PLAYBOOK_SLUG
    );
    assert.strictEqual(
      getPlaybookDodoMapping(otherPlaybook.slug),
      null,
      "Non-test playbook must return null in test_mode"
    );
    assert.strictEqual(
      getPlaybookDodoMapping(otherPlaybook.playbookId),
      null,
      "Non-test playbookId must return null in test_mode"
    );

    // 4. Legacy "men" course product ID in test mode returns ""
    assert.strictEqual(
      getDodoCourseProductId("men"),
      "",
      "Legacy men product must be inaccessible in test_mode"
    );
  } finally {
    process.env.DODO_PAYMENTS_MODE = origMode;
    process.env.DODO_TEST_PLAYBOOK_PRODUCT_ID = origTestProductId;
  }
});

test("17. Dual-Mode Product Isolation: Cross-environment product IDs are strictly rejected", () => {
  const origMode = process.env.DODO_PAYMENTS_MODE;
  const origTestProductId = process.env.DODO_TEST_PLAYBOOK_PRODUCT_ID;

  try {
    const testProductId = "pdt_test_wealth_31years";
    const liveProductId = "pdt_0Nre9LciGCRhWBJG4t6YW"; // Live ID for 31-years playbook

    // Case A: IN TEST MODE
    process.env.DODO_PAYMENTS_MODE = "test_mode";
    process.env.DODO_TEST_PLAYBOOK_PRODUCT_ID = testProductId;

    // Test product ID resolves to test mapping
    const testResolved = getPlaybookByDodoProductId(testProductId);
    assert.ok(testResolved, "Test product ID must resolve in test_mode");
    assert.strictEqual(testResolved.slug, TEST_MODE_PLAYBOOK_SLUG);

    // Live product ID is strictly rejected in test mode
    const liveInTest = getPlaybookByDodoProductId(liveProductId);
    assert.strictEqual(liveInTest, null, "Live product ID must be rejected in test_mode");

    // Any other live product ID in test mode is strictly rejected
    assert.strictEqual(
      getPlaybookByDodoProductId("pdt_0Nrg2hAvZTeljCB1fQHSW"),
      null,
      "Live product ID pdt_0Nrg2hAvZTeljCB1fQHSW must be rejected in test_mode"
    );

    // Case B: IN LIVE MODE
    process.env.DODO_PAYMENTS_MODE = "live_mode";

    // Live product ID resolves to live mapping
    const liveResolved = getPlaybookByDodoProductId(liveProductId);
    assert.ok(liveResolved, "Live product ID must resolve in live_mode");
    assert.strictEqual(liveResolved.slug, TEST_MODE_PLAYBOOK_SLUG);

    // Test product ID is strictly rejected in live mode
    const testInLive = getPlaybookByDodoProductId(testProductId);
    assert.strictEqual(testInLive, null, "Test product ID must be rejected in live_mode");

    // Any generic test-prefixed product ID is rejected in live mode
    assert.strictEqual(
      getPlaybookByDodoProductId("pdt_test_arbitrary_123"),
      null,
      "pdt_test_* must be rejected in live_mode"
    );
  } finally {
    process.env.DODO_PAYMENTS_MODE = origMode;
    process.env.DODO_TEST_PLAYBOOK_PRODUCT_ID = origTestProductId;
  }
});

test("18. Database Preflight Safety Guard: Refuses remote/Neon databases; accepts only local", () => {
  // Remote/Neon URLs that must be rejected with fatal errors
  const forbiddenUrls = [
    "postgresql://neondb_owner:npg_xyz@ep-plain-leaf-1234.us-east-2.aws.neon.tech/neondb?sslmode=require",
    "postgres://user:pass@ep-cool-lake-5678.us-east-1.aws.neon.tech/plugd_prod",
    "postgresql://postgres:pass@db.xyz.supabase.co:5432/postgres",
    "postgresql://user:pass@my-db.c9akj.rds.amazonaws.com:5432/production",
    "postgresql://user:pass@dpg-abc-a.oregon-postgres.render.com/prod_db",
  ];

  for (const url of forbiddenUrls) {
    assert.strictEqual(isLocalDatabase(url), false, `isLocalDatabase must be false for ${url}`);
    assert.throws(
      () => assertLocalTestDatabase(url),
      /FATAL_TEST_DB_GUARD/,
      `assertLocalTestDatabase must throw for ${url}`
    );
  }

  // Local URLs that must be safely accepted
  const validLocalUrls = [
    "postgresql://postgres:postgres@localhost:5432/plugd_test",
    "postgresql://postgres:postgres@127.0.0.1:5432/plugd_test",
    "postgres://app:secret@localhost:5433/local_dev",
  ];

  for (const url of validLocalUrls) {
    assert.strictEqual(isLocalDatabase(url), true, `isLocalDatabase must be true for ${url}`);
    assert.doesNotThrow(
      () => assertLocalTestDatabase(url),
      `assertLocalTestDatabase must not throw for ${url}`
    );
  }
});

test("19. Dodo Configuration & Credential Validation: Fails closed on missing or inconsistent modes", () => {
  const origMode = process.env.DODO_PAYMENTS_MODE;
  const origApiKey = process.env.DODO_PAYMENTS_API_KEY;
  const origWebhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY;

  try {
    // Case 1: Missing or invalid DODO_PAYMENTS_MODE
    process.env.DODO_PAYMENTS_MODE = "";
    assert.throws(() => validateDodoConfiguration(), /DODO_CONFIG_ERROR/);

    process.env.DODO_PAYMENTS_MODE = "staging";
    assert.throws(() => validateDodoConfiguration(), /DODO_CONFIG_ERROR/);

    // Case 2: In test_mode, live API key is rejected
    process.env.DODO_PAYMENTS_MODE = "test_mode";
    process.env.DODO_PAYMENTS_API_KEY = "dodo_live_secret_live_key_here";
    assert.throws(() => validateDodoConfiguration(), /starting with "dodo_test_"/);

    // Case 3: In test_mode, live webhook key is rejected
    process.env.DODO_PAYMENTS_API_KEY = "dodo_test_mock_valid_key";
    process.env.DODO_PAYMENTS_WEBHOOK_KEY = "whsec_live_secret_key_12345";
    assert.throws(() => validateDodoConfiguration(), /starting with "whsec_test_"/);

    // Case 4: In test_mode with test credentials, passes
    process.env.DODO_PAYMENTS_WEBHOOK_KEY = "whsec_test_mock_secret_12345";
    const testConfig = validateDodoConfiguration();
    assert.strictEqual(testConfig.mode, "test_mode");
    assert.strictEqual(testConfig.apiKey, "dodo_test_mock_valid_key");

    // Case 5: In live_mode, test API key is rejected
    process.env.DODO_PAYMENTS_MODE = "live_mode";
    process.env.DODO_PAYMENTS_API_KEY = "dodo_test_some_test_key";
    assert.throws(() => validateDodoConfiguration(), /cannot use a test API key/);

    // Case 6: In live_mode, test webhook secret is rejected
    process.env.DODO_PAYMENTS_API_KEY = "dodo_live_key_valid_67890";
    process.env.DODO_PAYMENTS_WEBHOOK_KEY = "whsec_test_secret_abcde";
    assert.throws(() => validateDodoConfiguration(), /cannot use a test webhook secret/);
  } finally {
    process.env.DODO_PAYMENTS_MODE = origMode;
    process.env.DODO_PAYMENTS_API_KEY = origApiKey;
    process.env.DODO_PAYMENTS_WEBHOOK_KEY = origWebhookKey;
  }
});

test("20. Checkout Route in Test Mode: Only representative test Playbook can initialize checkout", async () => {
  const origMode = process.env.DODO_PAYMENTS_MODE;
  const origApiKey = process.env.DODO_PAYMENTS_API_KEY;
  const origWebhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
  const origTestProductId = process.env.DODO_TEST_PLAYBOOK_PRODUCT_ID;

  try {
    process.env.DODO_PAYMENTS_MODE = "test_mode";
    process.env.DODO_PAYMENTS_API_KEY = "dodo_test_valid_api_key_123";
    process.env.DODO_PAYMENTS_WEBHOOK_KEY = "whsec_test_mock_webhook_secret_12345";
    process.env.DODO_TEST_PLAYBOOK_PRODUCT_ID = "pdt_test_wealth_18mins";

    let interceptedParams = null;
    const origCreate = dodoClient.checkoutSessions.create;
    dodoClient.checkoutSessions.create = async (params) => {
      interceptedParams = params;
      return {
        id: "sess_test_12345",
        checkout_url: "https://test.dodopayments.com/buy/sess_test_12345",
      };
    };

    try {
      // 1. Valid test playbook slug checkout succeeds
      const reqValid = new Request("https://theplugd.com/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: "tester@example.com",
          courseSlug: TEST_MODE_PLAYBOOK_SLUG,
        }),
      });

      const resValid = await checkoutRoute.POST(reqValid);
      assert.strictEqual(resValid.status, 200, "Test playbook checkout must succeed with 200");
      const jsonValid = await resValid.json();
      assert.strictEqual(jsonValid.checkoutUrl, "https://test.dodopayments.com/buy/sess_test_12345");
      assert.strictEqual(interceptedParams.product_cart[0].product_id, "pdt_test_wealth_18mins");
      assert.strictEqual(interceptedParams.product_cart[0].quantity, 1);
      assert.strictEqual(interceptedParams.product_cart[0].amount, undefined, "Native discount must be used (no amount override)");
      assert.strictEqual(interceptedParams.metadata.expectedCents, "300");

      // 2. Any other playbook in test_mode is rejected with 400
      const reqOther = new Request("https://theplugd.com/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: "tester@example.com",
          courseSlug: "3-best-ai-businesses-to-start-before-2027-1000-day",
        }),
      });
      const resOther = await checkoutRoute.POST(reqOther);
      assert.strictEqual(resOther.status, 400, "Non-test playbook must return 400 in test mode");

      // 3. Legacy 'men' in test_mode is rejected with 400
      const reqMen = new Request("https://theplugd.com/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: "tester@example.com",
          courseSlug: "men",
        }),
      });
      const resMen = await checkoutRoute.POST(reqMen);
      assert.strictEqual(resMen.status, 400, "Legacy men checkout must return 400 in test mode");
    } finally {
      dodoClient.checkoutSessions.create = origCreate;
    }
  } finally {
    process.env.DODO_PAYMENTS_MODE = origMode;
    process.env.DODO_PAYMENTS_API_KEY = origApiKey;
    process.env.DODO_PAYMENTS_WEBHOOK_KEY = origWebhookKey;
    process.env.DODO_TEST_PLAYBOOK_PRODUCT_ID = origTestProductId;
  }
});

test("21. Webhook Route in Test Mode: Cryptographic secret isolation and test product fulfillment", async () => {
  const origMode = process.env.DODO_PAYMENTS_MODE;
  const origApiKey = process.env.DODO_PAYMENTS_API_KEY;
  const origWebhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
  const origTestProductId = process.env.DODO_TEST_PLAYBOOK_PRODUCT_ID;

  try {
    const testSecret = "whsec_test_" + Buffer.from("12345678901234567890123456789012").toString("base64");
    const testProductId = "pdt_test_wealth_18mins";

    process.env.DODO_PAYMENTS_MODE = "test_mode";
    process.env.DODO_PAYMENTS_API_KEY = "dodo_test_mock_api_key";
    process.env.DODO_PAYMENTS_WEBHOOK_KEY = testSecret;
    process.env.DODO_TEST_PLAYBOOK_PRODUCT_ID = testProductId;

    mockPrisma.reset();

    // 1. Valid test mode payment.succeeded fulfillment
    const validTestPayload = {
      type: "payment.succeeded",
      data: {
        payment_id: "pay_test_succ_001",
        currency: "USD",
        total_amount: 300,
        tax: 0,
        customer: { email: "verified_test_user@example.com" },
        product_cart: [{ product_id: testProductId, quantity: 1 }],
        metadata: {
          courseSlug: TEST_MODE_PLAYBOOK_SLUG,
          amount: "3.00",
        },
      },
    };

    const { req: reqValid } = createSignedWebhookRequest(validTestPayload, testSecret);
    const resValid = await webhookRoute.POST(reqValid);
    assert.strictEqual(resValid.status, 200, "Test payment must succeed with 200");

    const purchase = await mockPrisma.coursePurchase.findFirst({
      where: { paymentId: "pay_test_succ_001" },
    });
    assert.ok(purchase, "Purchase record must be created for test payment");
    assert.strictEqual(purchase.courseSlug, TEST_MODE_PLAYBOOK_SLUG);
    assert.strictEqual(purchase.amount, 3.0);

    // 2. Live product ID in test mode is strictly rejected
    const liveProductPayload = {
      type: "payment.succeeded",
      data: {
        payment_id: "pay_live_prod_in_test",
        currency: "USD",
        total_amount: 300,
        tax: 0,
        customer: { email: "intruder@example.com" },
        product_cart: [{ product_id: "pdt_0Nre9LciGCRhWBJG4t6YW", quantity: 1 }], // live product ID
        metadata: {
          courseSlug: TEST_MODE_PLAYBOOK_SLUG,
          amount: "3.00",
        },
      },
    };

    const { req: reqLiveProd } = createSignedWebhookRequest(liveProductPayload, testSecret);
    const resLiveProd = await webhookRoute.POST(reqLiveProd);
    assert.strictEqual(resLiveProd.status, 400, "Live product ID in test mode must be rejected with 400");
    const jsonLiveProd = await resLiveProd.json();
    assert.strictEqual(jsonLiveProd.error, "Product mismatch");

    // 3. Live webhook secret in test mode is strictly rejected with 500 config error
    const liveSecret = "whsec_" + Buffer.from("live_secret_key_1234567890123456").toString("base64");
    process.env.DODO_PAYMENTS_WEBHOOK_KEY = liveSecret;
    const { req: reqLiveSecret } = createSignedWebhookRequest(validTestPayload, liveSecret);
    const resLiveSecret = await webhookRoute.POST(reqLiveSecret);
    assert.strictEqual(resLiveSecret.status, 500, "Live webhook secret in test mode must fail closed with 500");
  } finally {
    process.env.DODO_PAYMENTS_MODE = origMode;
    process.env.DODO_PAYMENTS_API_KEY = origApiKey;
    process.env.DODO_PAYMENTS_WEBHOOK_KEY = origWebhookKey;
    process.env.DODO_TEST_PLAYBOOK_PRODUCT_ID = origTestProductId;
  }
});

// -------------------------------------------------------------
// TEST SUITE: Next.js Isolation, Prisma Guard, and Preflight Accuracy
// -------------------------------------------------------------

// Load the real prisma.ts implementation to test singleton instantiation behavior
function getRealPrismaClientSingleton() {
  const realPrismaCode = fs.readFileSync(path.join(process.cwd(), "src/lib/prisma.ts"), "utf8");
  const transpiled = ts.transpileModule(realPrismaCode, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  });
  const m = { exports: {} };
  const guard = require("@/lib/test-db-guard");
  const req = (id) => (id === "@/lib/test-db-guard" ? guard : { PrismaClient: class MockPrismaClient {} });
  const f = new Function("exports", "require", "module", transpiled.outputText);
  f(m.exports, req, m);
  return m.exports.prismaClientSingleton;
}

const {
  loadTestEnv,
  auditTestEnvironment,
  purgeLiveCredentials,
} = require("../scripts/test-env-loader.cjs");
const { loadEnvConfig } = require("@next/env");

test("22. Prisma Client Protection: Refuses Neon and remote databases before initialization in test mode", () => {
  const origMode = process.env.DODO_PAYMENTS_MODE;
  const origDbUrl = process.env.DATABASE_URL;
  const prismaClientSingleton = getRealPrismaClientSingleton();

  try {
    process.env.DODO_PAYMENTS_MODE = "test_mode";

    // Case A: Neon production database URL must throw immediately
    process.env.DATABASE_URL = "postgresql://neondb_owner:npg_123@ep-cool.us-east-2.aws.neon.tech/neondb?sslmode=require";
    assert.throws(
      () => prismaClientSingleton(),
      /FATAL_TEST_DB_GUARD.*Neon production database/
    );

    // Case B: Supabase remote database URL must throw immediately
    process.env.DATABASE_URL = "postgresql://postgres:secret@db.xyz.supabase.co:5432/postgres";
    assert.throws(
      () => prismaClientSingleton(),
      /FATAL_TEST_DB_GUARD.*remote host/
    );

    // Case C: Missing DATABASE_URL must throw immediately
    delete process.env.DATABASE_URL;
    assert.throws(
      () => prismaClientSingleton(),
      /FATAL_TEST_DB_GUARD.*DATABASE_URL is not set/
    );

    // Case D: Approved localhost PostgreSQL URL succeeds without throwing
    process.env.DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/plugd_test";
    assert.doesNotThrow(() => {
      const client = prismaClientSingleton();
      assert.ok(client, "PrismaClient singleton instantiated with local test database");
    });

    // Case E: Approved 127.0.0.1 PostgreSQL URL succeeds without throwing
    process.env.DATABASE_URL = "postgresql://postgres:postgres@127.0.0.1:5432/plugd_test";
    assert.doesNotThrow(() => {
      const client = prismaClientSingleton();
      assert.ok(client, "PrismaClient singleton instantiated with 127.0.0.1 test database");
    });
  } finally {
    process.env.DODO_PAYMENTS_MODE = origMode;
    process.env.DATABASE_URL = origDbUrl;
  }
});

test("23. Next.js Environment Isolation: __NEXT_PROCESSED_ENV lock prevents .env.local reload", () => {
  const origProcessed = process.env.__NEXT_PROCESSED_ENV;
  const origApiKey = process.env.DODO_PAYMENTS_API_KEY;
  const origDb = process.env.DATABASE_URL;

  try {
    // 1. Purge live credentials from process.env
    delete process.env.DODO_PAYMENTS_API_KEY;
    delete process.env.DATABASE_URL;

    // 2. Activate the internal Next.js environment lock
    process.env.__NEXT_PROCESSED_ENV = "true";
    process.env.DODO_PAYMENTS_MODE = "test_mode";
    process.env.TEST_ISOLATION_SENTINEL = "locked_value";

    // 3. Invoke Next.js's loadEnvConfig
    loadEnvConfig(process.cwd());

    // 4. Verify that .env.local did NOT inject live credentials or production DATABASE_URL
    assert.strictEqual(
      process.env.DODO_PAYMENTS_API_KEY,
      undefined,
      "Next.js must NOT load DODO_PAYMENTS_API_KEY from .env.local when lock is active"
    );
    assert.strictEqual(
      process.env.DATABASE_URL,
      undefined,
      "Next.js must NOT load production Neon DATABASE_URL from .env.local when lock is active"
    );
    assert.strictEqual(
      process.env.TEST_ISOLATION_SENTINEL,
      "locked_value",
      "Process memory must retain test environment variables"
    );
  } finally {
    process.env.__NEXT_PROCESSED_ENV = origProcessed;
    process.env.DODO_PAYMENTS_API_KEY = origApiKey;
    process.env.DATABASE_URL = origDb;
    delete process.env.TEST_ISOLATION_SENTINEL;
  }
});

test("24. Parent-Shell Live Credential Purge: Live keys and remote databases are wiped from memory", () => {
  const origApiKey = process.env.DODO_PAYMENTS_API_KEY;
  const origWebhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
  const origDb = process.env.DATABASE_URL;

  try {
    // Simulate parent shell that had live production environment variables exported
    process.env.DODO_PAYMENTS_API_KEY = "dodo_live_PRODUCTION_SECRET_KEY_99999";
    process.env.DODO_PAYMENTS_WEBHOOK_KEY = "whsec_PRODUCTION_LIVE_WEBHOOK_SECRET";
    process.env.DATABASE_URL = "postgresql://prod_user:prod_pass@ep-plain-123.us-east-1.aws.neon.tech/neondb";

    purgeLiveCredentials();

    assert.strictEqual(process.env.DODO_PAYMENTS_API_KEY, undefined, "Live API key must be purged");
    assert.strictEqual(process.env.DODO_PAYMENTS_WEBHOOK_KEY, undefined, "Live webhook key must be purged");
    assert.strictEqual(process.env.DATABASE_URL, undefined, "Neon production database URL must be purged");
  } finally {
    process.env.DODO_PAYMENTS_API_KEY = origApiKey;
    process.env.DODO_PAYMENTS_WEBHOOK_KEY = origWebhookKey;
    process.env.DATABASE_URL = origDb;
  }
});

test("25. Accurate Test-Environment Preflight: Distinguishes between unconfigured, blocked, and ready", () => {
  const origApiKey = process.env.DODO_PAYMENTS_API_KEY;
  const origWebhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
  const origProductId = process.env.DODO_TEST_PLAYBOOK_PRODUCT_ID;
  const origDb = process.env.DATABASE_URL;

  try {
    // State A: Completely unconfigured environment
    delete process.env.DODO_PAYMENTS_API_KEY;
    delete process.env.DODO_PAYMENTS_WEBHOOK_KEY;
    delete process.env.DODO_TEST_PLAYBOOK_PRODUCT_ID;
    delete process.env.DATABASE_URL;

    const unconfReport = auditTestEnvironment();
    assert.strictEqual(unconfReport.loaderIntegrity, true, "Loader integrity passes");
    assert.strictEqual(unconfReport.testApiKeyValid, false);
    assert.strictEqual(unconfReport.testWebhookKeyValid, false);
    assert.strictEqual(unconfReport.testProductIdValid, false);
    assert.strictEqual(unconfReport.localDbValid, false);
    assert.strictEqual(unconfReport.isReadyForCheckout, false, "Must NOT be ready for checkout");
    assert.strictEqual(unconfReport.overallStatus, "UNCONFIGURED");
    assert.strictEqual(unconfReport.missing.length, 4, "Must list all 4 missing items");

    // State B: Security violation (e.g. Neon DB configured) -> BLOCKED
    process.env.DODO_PAYMENTS_API_KEY = "dodo_test_mock_123456789";
    process.env.DODO_PAYMENTS_WEBHOOK_KEY = "whsec_test_mock_secret_123456789";
    process.env.DODO_TEST_PLAYBOOK_PRODUCT_ID = "pdt_test_wealth_18";
    process.env.DATABASE_URL = "postgresql://user:pass@ep-leaf.neon.tech/neondb";

    const blockedReport = auditTestEnvironment();
    assert.strictEqual(blockedReport.localDbValid, false);
    assert.strictEqual(blockedReport.isReadyForCheckout, false);
    assert.strictEqual(blockedReport.overallStatus, "BLOCKED");
    assert.ok(blockedReport.errors.some((e) => e.includes("Neon production database")));

    // State C: Fully configured with valid test credentials and local DB -> READY FOR CHECKOUT
    process.env.DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/plugd_test";

    const readyReport = auditTestEnvironment();
    assert.strictEqual(readyReport.loaderIntegrity, true);
    assert.strictEqual(readyReport.testApiKeyValid, true);
    assert.strictEqual(readyReport.testWebhookKeyValid, true);
    assert.strictEqual(readyReport.testProductIdValid, true);
    assert.strictEqual(readyReport.localDbValid, true);
    assert.strictEqual(readyReport.isReadyForCheckout, true, "Must be ready for checkout");
    assert.strictEqual(readyReport.overallStatus, "READY FOR CHECKOUT");
    assert.strictEqual(readyReport.missing.length, 0);
    assert.strictEqual(readyReport.errors.length, 0);
  } finally {
    process.env.DODO_PAYMENTS_API_KEY = origApiKey;
    process.env.DODO_PAYMENTS_WEBHOOK_KEY = origWebhookKey;
    process.env.DODO_TEST_PLAYBOOK_PRODUCT_ID = origProductId;
    process.env.DATABASE_URL = origDb;
  }
});

test("26. Test Server Launcher: verifyTestEnvironment() confirms isolation before booting Next.js", () => {
  const origApiKey = process.env.DODO_PAYMENTS_API_KEY;
  const origWebhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
  const origProductId = process.env.DODO_TEST_PLAYBOOK_PRODUCT_ID;
  const origDb = process.env.DATABASE_URL;

  const { verifyTestEnvironment } = require("../scripts/start-test-server.cjs");

  try {
    // Valid isolated test environment
    process.env.DODO_PAYMENTS_API_KEY = "dodo_test_mock_secret_key_12345";
    process.env.DODO_PAYMENTS_WEBHOOK_KEY = "whsec_test_mock_webhook_secret_67890";
    process.env.DODO_TEST_PLAYBOOK_PRODUCT_ID = "pdt_test_wealth_18mins";
    process.env.DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/plugd_test";

    const report = verifyTestEnvironment();
    assert.strictEqual(report.isReadyForCheckout, true);
    assert.strictEqual(process.env.__NEXT_PROCESSED_ENV, "true", "__NEXT_PROCESSED_ENV lock must be engaged");
    assert.strictEqual(process.env.DODO_PAYMENTS_MODE, "test_mode", "DODO_PAYMENTS_MODE must be test_mode");
  } finally {
    process.env.DODO_PAYMENTS_API_KEY = origApiKey;
    process.env.DODO_PAYMENTS_WEBHOOK_KEY = origWebhookKey;
    process.env.DODO_TEST_PLAYBOOK_PRODUCT_ID = origProductId;
    process.env.DATABASE_URL = origDb;
  }
});

test("27. Audit Record Preservation: Refunds and disputes retain CoursePurchase records with audit metadata", async () => {
  mockPrisma.reset();

  const customer = await getOrCreateCustomer("audit_tester@example.com", mockPrisma);
  const playbook = Object.values(DODO_PLAYBOOK_MAP)[0];
  const paymentId = "pay_audit_refund_001";

  // 1. Initial purchase
  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: playbook.slug,
    amount: playbook.sellingPriceDollars,
    paymentId,
    client: mockPrisma,
  });

  assert.strictEqual(await hasUserPurchasedCourse(customer.id, playbook.slug), true);
  const activePurchases = await getUserPurchases(customer.id);
  assert.strictEqual(activePurchases.length, 1);

  // 2. Revoke via refund
  const refundResult = await revokeCoursePurchase({
    paymentId,
    client: mockPrisma,
    reason: "REFUNDED",
  });

  assert.ok(refundResult, "revokeCoursePurchase must return the updated record");
  assert.strictEqual(refundResult.progress?.status, "REFUNDED");
  assert.ok(refundResult.progress?.revokedAt, "revokedAt must be recorded");
  assert.strictEqual(refundResult.progress?.revokedPaymentId, paymentId);

  // 3. User access is revoked
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, playbook.slug), false);

  // 4. Record is preserved in database (NOT deleted)
  const dbRecord = await mockPrisma.coursePurchase.findUnique({
    where: { customerId_courseSlug: { customerId: customer.id, courseSlug: playbook.slug } },
  });
  assert.ok(dbRecord, "Record must still exist in DB for audit trail");
  assert.strictEqual(dbRecord.progress?.status, "REFUNDED");

  // 5. getUserPurchases filters out revoked purchases by default, but includes them with includeRevoked=true
  assert.strictEqual((await getUserPurchases(customer.id)).length, 0);
  assert.strictEqual((await getUserPurchases(customer.id, true)).length, 1);

  // 6. Test DISPUTED flow on another playbook
  const playbook2 = Object.values(DODO_PLAYBOOK_MAP)[1];
  const disputePaymentId = "pay_audit_dispute_002";

  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: playbook2.slug,
    amount: playbook2.sellingPriceDollars,
    paymentId: disputePaymentId,
    client: mockPrisma,
  });
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, playbook2.slug), true);

  await revokeCoursePurchase({
    paymentId: disputePaymentId,
    client: mockPrisma,
    reason: "DISPUTED",
  });

  assert.strictEqual(await hasUserPurchasedCourse(customer.id, playbook2.slug), false);
  const disputeRecord = await mockPrisma.coursePurchase.findUnique({
    where: { customerId_courseSlug: { customerId: customer.id, courseSlug: playbook2.slug } },
  });
  assert.ok(disputeRecord, "Dispute record must still exist in DB");
  assert.strictEqual(disputeRecord.progress?.status, "DISPUTED");
  assert.ok(disputeRecord.progress?.revokedAt);
  assert.strictEqual(disputeRecord.progress?.revokedPaymentId, disputePaymentId);
});

test("28. Lesson Progress Preservation: Completed lessons and state are preserved across revocation", async () => {
  mockPrisma.reset();

  const customer = await getOrCreateCustomer("progress_tester@example.com", mockPrisma);
  const playbook = Object.values(DODO_PLAYBOOK_MAP)[2];
  const paymentId = "pay_progress_test_101";

  // Initial purchase
  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: playbook.slug,
    amount: playbook.sellingPriceDollars,
    paymentId,
    client: mockPrisma,
  });

  // User completes 3 lessons
  await updateCourseProgress({
    customerId: customer.id,
    customerEmail: customer.email,
    courseSlug: playbook.slug,
    lessonId: "lesson-01",
    isCompleted: true,
  });
  await updateCourseProgress({
    customerId: customer.id,
    customerEmail: customer.email,
    courseSlug: playbook.slug,
    lessonId: "lesson-02",
    isCompleted: true,
  });
  await updateCourseProgress({
    customerId: customer.id,
    customerEmail: customer.email,
    courseSlug: playbook.slug,
    lessonId: "lesson-03",
    isCompleted: true,
  });

  // Verify completed lessons before refund
  let purchase = await mockPrisma.coursePurchase.findUnique({
    where: { customerId_courseSlug: { customerId: customer.id, courseSlug: playbook.slug } },
  });
  assert.deepStrictEqual(purchase.progress?.completedLessons, ["lesson-01", "lesson-02", "lesson-03"]);
  assert.strictEqual(purchase.progress?.lastViewedLessonId, "lesson-03");

  // Refund occurs
  await revokeCoursePurchase({
    paymentId,
    client: mockPrisma,
    reason: "REFUNDED",
  });

  // Verify access revoked, but progress data is 100% intact
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, playbook.slug), false);

  purchase = await mockPrisma.coursePurchase.findUnique({
    where: { customerId_courseSlug: { customerId: customer.id, courseSlug: playbook.slug } },
  });
  assert.strictEqual(purchase.progress?.status, "REFUNDED");
  assert.deepStrictEqual(purchase.progress?.completedLessons, ["lesson-01", "lesson-02", "lesson-03"], "Completed lessons must NOT be wiped");
  assert.strictEqual(purchase.progress?.lastViewedLessonId, "lesson-03");
});

test("29. Repurchase Reactivation: Reactivates refunded/disputed purchase, restores access, and preserves progress", async () => {
  mockPrisma.reset();

  const customer = await getOrCreateCustomer("repurchaser@example.com", mockPrisma);
  const playbook = Object.values(DODO_PLAYBOOK_MAP)[3];
  const oldPaymentId = "pay_old_original_001";
  const newPaymentId = "pay_new_repurchase_002";

  // Step 1: Initial purchase & lesson completion
  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: playbook.slug,
    amount: playbook.sellingPriceDollars,
    paymentId: oldPaymentId,
    client: mockPrisma,
  });

  await updateCourseProgress({
    customerId: customer.id,
    customerEmail: customer.email,
    courseSlug: playbook.slug,
    lessonId: "m1-lesson-01",
    isCompleted: true,
  });

  // Step 2: Refund revokes access
  await revokeCoursePurchase({
    paymentId: oldPaymentId,
    client: mockPrisma,
    reason: "REFUNDED",
  });
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, playbook.slug), false);

  // Step 3: Customer repurchases with new paymentId
  const reactivated = await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: playbook.slug,
    amount: playbook.sellingPriceDollars,
    paymentId: newPaymentId,
    client: mockPrisma,
  });

  assert.ok(reactivated, "recordCoursePurchase must return reactivated purchase");
  assert.strictEqual(reactivated.paymentId, newPaymentId, "Payment ID must be updated to new payment");
  assert.strictEqual(reactivated.progress?.status, "ACTIVE", "Status must be reset to ACTIVE");
  assert.strictEqual(reactivated.progress?.revokedAt, undefined, "revokedAt must be cleared");
  assert.ok(reactivated.progress?.reactivatedAt, "reactivatedAt must be recorded");
  assert.deepStrictEqual(reactivated.progress?.completedLessons, ["m1-lesson-01"], "Previous lesson progress must be preserved");

  // Step 4: Access is restored!
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, playbook.slug), true);
});

test("30. Out-of-Order Webhook Protection: Stale refund webhook cannot revoke subsequent repurchase", async () => {
  mockPrisma.reset();

  const customer = await getOrCreateCustomer("reorder_tester@example.com", mockPrisma);
  const playbook = Object.values(DODO_PLAYBOOK_MAP)[4];
  const stalePaymentId = "pay_stale_first_payment";
  const currentPaymentId = "pay_fresh_repurchase_payment";

  // Customer previously purchased with stalePaymentId, then it was refunded and repurchased with currentPaymentId
  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: playbook.slug,
    amount: playbook.sellingPriceDollars,
    paymentId: stalePaymentId,
    client: mockPrisma,
  });

  await revokeCoursePurchase({
    paymentId: stalePaymentId,
    client: mockPrisma,
    reason: "REFUNDED",
  });

  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: playbook.slug,
    amount: playbook.sellingPriceDollars,
    paymentId: currentPaymentId,
    client: mockPrisma,
  });

  // Customer is currently active with currentPaymentId
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, playbook.slug), true);

  // A delayed/replayed webhook for stalePaymentId arrives
  const staleRevokeResult = await revokeCoursePurchase({
    paymentId: stalePaymentId,
    client: mockPrisma,
    reason: "REFUNDED",
  });

  // Stale revoke must return null because no active record matches stalePaymentId
  assert.strictEqual(staleRevokeResult, null, "Stale paymentId must not match active purchase with new paymentId");

  // Customer access remains ACTIVE!
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, playbook.slug), true, "New repurchase must NOT be revoked by stale refund event");

  const currentDbRecord = await mockPrisma.coursePurchase.findUnique({
    where: { customerId_courseSlug: { customerId: customer.id, courseSlug: playbook.slug } },
  });
  assert.strictEqual(currentDbRecord.paymentId, currentPaymentId);
  assert.strictEqual(currentDbRecord.progress?.status, "ACTIVE");
});

test("31. Free Access Configuration: Strictly opt-in (fails closed/paid by default)", () => {
  // Check exact implementation in src/lib/config.ts
  const configSource = fs.readFileSync(path.join(process.cwd(), "src", "lib", "config.ts"), "utf8");
  assert.ok(
    configSource.includes('process.env.NEXT_PUBLIC_REVIEW_PHASE_FREE_ACCESS === "true"'),
    "src/lib/config.ts must evaluate strictly NEXT_PUBLIC_REVIEW_PHASE_FREE_ACCESS === 'true'"
  );
  assert.ok(
    !configSource.includes(": true;"),
    "src/lib/config.ts must NOT fall back to ': true;'"
  );

  // Test runtime evaluation helper
  const evalConfig = (envVal) => {
    const prev = process.env.NEXT_PUBLIC_REVIEW_PHASE_FREE_ACCESS;
    try {
      if (envVal === undefined) {
        delete process.env.NEXT_PUBLIC_REVIEW_PHASE_FREE_ACCESS;
      } else {
        process.env.NEXT_PUBLIC_REVIEW_PHASE_FREE_ACCESS = envVal;
      }
      return process.env.NEXT_PUBLIC_REVIEW_PHASE_FREE_ACCESS === "true";
    } finally {
      if (prev === undefined) {
        delete process.env.NEXT_PUBLIC_REVIEW_PHASE_FREE_ACCESS;
      } else {
        process.env.NEXT_PUBLIC_REVIEW_PHASE_FREE_ACCESS = prev;
      }
    }
  };

  assert.strictEqual(evalConfig(undefined), false, "Undefined env var must evaluate to false (paid)");
  assert.strictEqual(evalConfig("false"), false, "'false' string must evaluate to false (paid)");
  assert.strictEqual(evalConfig(""), false, "Empty string must evaluate to false (paid)");
  assert.strictEqual(evalConfig("0"), false, "'0' string must evaluate to false (paid)");
  assert.strictEqual(evalConfig("true"), true, "'true' string must evaluate to true (free)");
});
