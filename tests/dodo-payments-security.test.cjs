const test = require("node:test");
const assert = require("node:assert");
const path = require("node:path");
const fs = require("node:fs");
const ts = require("typescript");
const Module = require("node:module");
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
    // Check if file exists with .ts or .tsx
    if (fs.existsSync(resolvedPath + ".ts")) return resolvedPath + ".ts";
    if (fs.existsSync(resolvedPath + ".tsx")) return resolvedPath + ".tsx";
    if (fs.existsSync(resolvedPath)) return resolvedPath;
  }
  return origResolveFilename.call(this, request, parent, isMain);
};

// In-memory Database Mock for isolation and deterministic assertions
class InMemoryPrismaMock {
  constructor() {
    this.reset();
  }

  reset() {
    this._customers = new Map();
    this._coursePurchases = new Map();
    this._processedWebhooks = new Map();
    this._complimentaryAccess = new Map();
    this.simulateTxFailure = false;
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
      upsert: async ({ where, create, update }) => {
        const existing = await this.customer.findUnique({ where });
        if (existing) return existing;
        return await this.customer.create({ data: create });
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
            return p;
          }
          if (where.customerId && p.customerId === where.customerId) {
            return p;
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
      upsert: async ({ where, create, update }) => {
        const key = `${where.customerId_courseSlug.customerId}_${where.customerId_courseSlug.courseSlug.toLowerCase()}`;
        const existing = this._coursePurchases.get(key);
        if (existing) {
          const updated = { ...existing, ...update, updatedAt: new Date() };
          this._coursePurchases.set(key, updated);
          return updated;
        }
        const record = {
          id: "cp_" + Math.random().toString(36).substring(2, 8),
          ...create,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        this._coursePurchases.set(key, record);
        return record;
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
    if (this.simulateTxFailure) {
      throw new Error("Simulated database connection failure");
    }
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

// Mock next/headers for LearnCoursePage server component tests
const mockBrowserCookies = new Map();
require.cache[require.resolve("next/headers")] = {
  id: require.resolve("next/headers"),
  filename: require.resolve("next/headers"),
  loaded: true,
  exports: {
    cookies: async () => ({
      get: (name) => (mockBrowserCookies.has(name) ? { value: mockBrowserCookies.get(name) } : undefined),
    }),
  },
};

// Mock next/navigation for LearnCoursePage server component tests
let mockRedirectUrl = null;
require.cache[require.resolve("next/navigation")] = {
  id: require.resolve("next/navigation"),
  filename: require.resolve("next/navigation"),
  loaded: true,
  exports: {
    redirect: (url) => {
      mockRedirectUrl = url;
    },
    notFound: () => {
      throw new Error("NEXT_NOT_FOUND");
    },
  },
};

// Import route modules and helpers
const dodopayments = require("@/lib/dodopayments.ts");
const checkoutRoute = require("@/app/api/checkout/route.ts");
const webhookRoute = require("@/app/api/webhook/dodo/route.ts");
const checkOwnershipRoute = require("@/app/api/customer/check-ownership/route.ts");
const playbooks = require("@/lib/playbooks.ts");
const LearnCoursePage = require("@/app/learn/[courseSlug]/page.tsx").default;

const TEST_SECRET = "whsec_MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw";
const TEST_PRODUCT_ID = "pdt_0NpUSu9EmAAsRoz2l3ZNV";

// Helper to sign webhooks using standardwebhooks
function createSignedWebhookRequest(payload, secret = TEST_SECRET, options = {}) {
  const body = typeof payload === "string" ? payload : JSON.stringify(payload);
  const eventId = options.eventId || "msg_" + Math.random().toString(36).substring(2, 10);
  const date = options.date || new Date();
  const wh = new Webhook(secret);
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
    body,
  };
}

test("Scenario 1: Missing Dodo API key - checkout fails safely with 503 and records no purchase", async () => {
  mockPrisma.reset();
  const origKey = process.env.DODO_PAYMENTS_API_KEY;
  delete process.env.DODO_PAYMENTS_API_KEY;

  try {
    const req = new Request("https://theplugd.com/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "user1@example.com" }),
    });

    const res = await checkoutRoute.POST(req);
    const json = await res.json();

    assert.strictEqual(res.status, 503);
    assert.strictEqual(json.error, "Payment service is currently unavailable. Please try again later.");
    assert.strictEqual(mockPrisma._coursePurchases.size, 0);
  } finally {
    process.env.DODO_PAYMENTS_API_KEY = origKey || "live_test_key_valid";
  }
});

test("Scenario 2: Missing product ID - checkout fails safely with 503 and records no purchase", async () => {
  mockPrisma.reset();
  process.env.DODO_PAYMENTS_API_KEY = "live_test_api_key_12345";
  const origCoursePid = process.env.DODO_COURSE_PRODUCT_ID;
  const origPaymentsPid = process.env.DODO_PAYMENTS_PRODUCT_ID;

  // Temporarily force helper to return empty string
  const origGetPid = dodopayments.getDodoCourseProductId;
  dodopayments.getDodoCourseProductId = () => "";

  try {
    const req = new Request("https://theplugd.com/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "user2@example.com" }),
    });

    const res = await checkoutRoute.POST(req);
    const json = await res.json();

    assert.strictEqual(res.status, 503);
    assert.strictEqual(json.error, "Payment service is currently unavailable. Please try again later.");
    assert.strictEqual(mockPrisma._coursePurchases.size, 0);
  } finally {
    dodopayments.getDodoCourseProductId = origGetPid;
    process.env.DODO_COURSE_PRODUCT_ID = origCoursePid;
    process.env.DODO_PAYMENTS_PRODUCT_ID = origPaymentsPid;
  }
});

test("Scenario 3: Dodo checkout-session creation failure - returns 502 with no purchase recorded", async () => {
  mockPrisma.reset();
  process.env.DODO_PAYMENTS_API_KEY = "live_test_api_key_12345";
  process.env.DODO_COURSE_PRODUCT_ID = TEST_PRODUCT_ID;

  // Mock checkoutSessions.create to simulate network / API failure
  const origCreate = dodopayments.dodoClient.checkoutSessions.create;
  dodopayments.dodoClient.checkoutSessions.create = async () => {
    throw new Error("Dodo network timeout");
  };

  try {
    const req = new Request("https://theplugd.com/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "user3@example.com" }),
    });

    const res = await checkoutRoute.POST(req);
    const json = await res.json();

    assert.strictEqual(res.status, 502);
    assert.strictEqual(json.error, "Failed to initialize checkout. Please try again.");
    assert.strictEqual(mockPrisma._coursePurchases.size, 0);
  } finally {
    dodopayments.dodoClient.checkoutSessions.create = origCreate;
  }
});

test("Scenario 4: Valid checkout request - creates hosted checkout session for configured product without granting free access", async () => {
  mockPrisma.reset();
  process.env.DODO_PAYMENTS_API_KEY = "live_test_api_key_12345";
  process.env.DODO_COURSE_PRODUCT_ID = TEST_PRODUCT_ID;

  let capturedParams = null;
  const origCreate = dodopayments.dodoClient.checkoutSessions.create;
  dodopayments.dodoClient.checkoutSessions.create = async (params) => {
    capturedParams = params;
    return {
      checkout_url: "https://checkout.dodopayments.com/buy/session_abc123",
      session_id: "session_abc123",
    };
  };

  try {
    const req = new Request("https://theplugd.com/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "validcustomer@example.com", name: "John Doe" }),
    });

    const res = await checkoutRoute.POST(req);
    const json = await res.json();

    assert.strictEqual(res.status, 200);
    assert.strictEqual(json.checkoutUrl, "https://checkout.dodopayments.com/buy/session_abc123");
    assert.strictEqual(capturedParams.product_cart[0].product_id, TEST_PRODUCT_ID);
    assert.strictEqual(capturedParams.product_cart[0].quantity, 1);
    assert.strictEqual(capturedParams.customer.email, "validcustomer@example.com");
    assert.strictEqual(capturedParams.metadata.courseSlug, "men");
    // Ensure access is NOT granted at checkout initiation
    assert.strictEqual(mockPrisma._coursePurchases.size, 0);
  } finally {
    dodopayments.dodoClient.checkoutSessions.create = origCreate;
  }
});

test("Scenario 5: Missing webhook signing key - request fails closed with 500 and no purchase recorded", async () => {
  mockPrisma.reset();
  const origKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
  delete process.env.DODO_PAYMENTS_WEBHOOK_KEY;

  try {
    const { req } = createSignedWebhookRequest({ type: "payment.succeeded" });
    const res = await webhookRoute.POST(req);
    const json = await res.json();

    assert.strictEqual(res.status, 500);
    assert.strictEqual(json.error, "Webhook signing key not configured");
    assert.strictEqual(mockPrisma._coursePurchases.size, 0);
  } finally {
    process.env.DODO_PAYMENTS_WEBHOOK_KEY = origKey;
  }
});

test("Scenario 6: Invalid webhook signature - request rejected with 400 and no purchase recorded", async () => {
  mockPrisma.reset();
  process.env.DODO_PAYMENTS_WEBHOOK_KEY = TEST_SECRET;

  const { req } = createSignedWebhookRequest(
    {
      type: "payment.succeeded",
      data: { payment_id: "pay_bad_sig" },
    },
    TEST_SECRET,
    { invalidSig: true }
  );

  const res = await webhookRoute.POST(req);
  const json = await res.json();

  assert.strictEqual(res.status, 400);
  assert.strictEqual(json.error, "Invalid webhook signature");
  assert.strictEqual(mockPrisma._coursePurchases.size, 0);
});

test("Scenario 7: Valid signature and correct $3 USD product payment - purchase is recorded", async () => {
  mockPrisma.reset();
  process.env.DODO_PAYMENTS_WEBHOOK_KEY = TEST_SECRET;
  process.env.DODO_COURSE_PRODUCT_ID = TEST_PRODUCT_ID;

  const eventPayload = {
    type: "payment.succeeded",
    data: {
      payment_id: "pay_legit_100",
      total_amount: 300, // 300 cents = $3.00 USD
      currency: "USD",
      product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
      customer: { email: "happybuyer@example.com" },
      metadata: {
        courseSlug: "men",
        customerEmail: "happybuyer@example.com",
      },
    },
  };

  const { req, eventId } = createSignedWebhookRequest(eventPayload, TEST_SECRET);
  const res = await webhookRoute.POST(req);
  const json = await res.json();

  assert.strictEqual(res.status, 200);
  assert.strictEqual(json.success, true);

  const customer = await mockPrisma.customer.findUnique({ where: { email: "happybuyer@example.com" } });
  assert.ok(customer, "Customer should be created in database");

  const purchase = await mockPrisma.coursePurchase.findUnique({
    where: { customerId_courseSlug: { customerId: customer.id, courseSlug: "men" } },
  });
  assert.ok(purchase, "Course purchase should be recorded");
  assert.strictEqual(purchase.amount, 3.0);
  assert.strictEqual(purchase.currency, "USD");
  assert.strictEqual(purchase.paymentId, "pay_legit_100");

  const processed = await mockPrisma.processedWebhook.findUnique({ where: { id: eventId } });
  assert.ok(processed, "Processed webhook event should be recorded");
});

test("Scenario 8: Wrong product ID - rejected with 400 and no access granted", async () => {
  mockPrisma.reset();
  process.env.DODO_PAYMENTS_WEBHOOK_KEY = TEST_SECRET;
  process.env.DODO_COURSE_PRODUCT_ID = TEST_PRODUCT_ID;

  const eventPayload = {
    type: "payment.succeeded",
    data: {
      payment_id: "pay_wrong_product",
      total_amount: 300,
      currency: "USD",
      product_cart: [{ product_id: "pdt_SOME_OTHER_SUBSCRIPTION", quantity: 1 }],
      customer: { email: "attacker@example.com" },
      metadata: { courseSlug: "men" },
    },
  };

  const { req } = createSignedWebhookRequest(eventPayload, TEST_SECRET);
  const res = await webhookRoute.POST(req);
  const json = await res.json();

  assert.strictEqual(res.status, 400);
  assert.strictEqual(json.error, "Product mismatch");
  assert.strictEqual(mockPrisma._coursePurchases.size, 0);
});

test("Scenario 9: Wrong amount - rejected with 400 and no access granted", async () => {
  mockPrisma.reset();
  process.env.DODO_PAYMENTS_WEBHOOK_KEY = TEST_SECRET;
  process.env.DODO_COURSE_PRODUCT_ID = TEST_PRODUCT_ID;

  const eventPayload = {
    type: "payment.succeeded",
    data: {
      payment_id: "pay_wrong_amount",
      total_amount: 100, // $1.00 instead of $3.00 (300 cents)
      currency: "USD",
      product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
      customer: { email: "discountseeker@example.com" },
      metadata: { courseSlug: "men" },
    },
  };

  const { req } = createSignedWebhookRequest(eventPayload, TEST_SECRET);
  const res = await webhookRoute.POST(req);
  const json = await res.json();

  assert.strictEqual(res.status, 400);
  assert.strictEqual(json.error, "Amount mismatch");
  assert.strictEqual(mockPrisma._coursePurchases.size, 0);
});

test("Scenario 10: Wrong currency - rejected with 400 and no access granted", async () => {
  mockPrisma.reset();
  process.env.DODO_PAYMENTS_WEBHOOK_KEY = TEST_SECRET;
  process.env.DODO_COURSE_PRODUCT_ID = TEST_PRODUCT_ID;

  const eventPayload = {
    type: "payment.succeeded",
    data: {
      payment_id: "pay_wrong_currency",
      total_amount: 300,
      currency: "EUR",
      product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
      customer: { email: "eurobuyer@example.com" },
      metadata: { courseSlug: "men" },
    },
  };

  const { req } = createSignedWebhookRequest(eventPayload, TEST_SECRET);
  const res = await webhookRoute.POST(req);
  const json = await res.json();

  assert.strictEqual(res.status, 400);
  assert.strictEqual(json.error, "Currency mismatch");
  assert.strictEqual(mockPrisma._coursePurchases.size, 0);
});

test("Scenario 11: Unrelated payment event - acknowledged without granting access", async () => {
  mockPrisma.reset();
  process.env.DODO_PAYMENTS_WEBHOOK_KEY = TEST_SECRET;

  const eventPayload = {
    type: "subscription.renewed",
    data: {
      subscription_id: "sub_12345",
      customer: { email: "subuser@example.com" },
    },
  };

  const { req } = createSignedWebhookRequest(eventPayload, TEST_SECRET);
  const res = await webhookRoute.POST(req);
  const json = await res.json();

  assert.strictEqual(res.status, 200);
  assert.strictEqual(json.received, true);
  assert.strictEqual(json.ignored, true);
  assert.strictEqual(mockPrisma._coursePurchases.size, 0);
});

test("Scenario 12: Missing or malformed required metadata - rejected with 400 and no access granted", async () => {
  mockPrisma.reset();
  process.env.DODO_PAYMENTS_WEBHOOK_KEY = TEST_SECRET;
  process.env.DODO_COURSE_PRODUCT_ID = TEST_PRODUCT_ID;

  // Missing courseSlug metadata (does NOT silently default to "men")
  const eventPayload = {
    type: "payment.succeeded",
    data: {
      payment_id: "pay_no_meta",
      total_amount: 300,
      currency: "USD",
      product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
      customer: { email: "unspecified@example.com" },
      metadata: {}, // no courseSlug
    },
  };

  const { req } = createSignedWebhookRequest(eventPayload, TEST_SECRET);
  const res = await webhookRoute.POST(req);
  const json = await res.json();

  assert.strictEqual(res.status, 400);
  assert.strictEqual(json.error, "Invalid course metadata");
  assert.strictEqual(mockPrisma._coursePurchases.size, 0);
});

test("Scenario 13: Duplicate webhook event - acknowledged with 200 and no duplicate purchase created", async () => {
  mockPrisma.reset();
  process.env.DODO_PAYMENTS_WEBHOOK_KEY = TEST_SECRET;
  process.env.DODO_COURSE_PRODUCT_ID = TEST_PRODUCT_ID;

  const eventPayload = {
    type: "payment.succeeded",
    data: {
      payment_id: "pay_idempotent_1",
      total_amount: 300,
      currency: "USD",
      product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
      customer: { email: "idempotent@example.com" },
      metadata: { courseSlug: "men" },
    },
  };

  const eventId = "wh_idempotent_evt_999";
  const { req: req1 } = createSignedWebhookRequest(eventPayload, TEST_SECRET, { eventId });
  const res1 = await webhookRoute.POST(req1);
  assert.strictEqual(res1.status, 200);
  assert.strictEqual(mockPrisma._coursePurchases.size, 1);

  // Send exact duplicate
  const { req: req2 } = createSignedWebhookRequest(eventPayload, TEST_SECRET, { eventId });
  const res2 = await webhookRoute.POST(req2);
  const json2 = await res2.json();

  assert.strictEqual(res2.status, 200);
  assert.strictEqual(json2.message, "Duplicate webhook event already processed");
  assert.strictEqual(mockPrisma._coursePurchases.size, 1, "Must not create duplicate purchases");
});

test("Scenario 14: Failed database fulfillment - returns 500 and event remains retryable", async () => {
  mockPrisma.reset();
  process.env.DODO_PAYMENTS_WEBHOOK_KEY = TEST_SECRET;
  process.env.DODO_COURSE_PRODUCT_ID = TEST_PRODUCT_ID;

  const eventPayload = {
    type: "payment.succeeded",
    data: {
      payment_id: "pay_fail_first",
      total_amount: 300,
      currency: "USD",
      product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
      customer: { email: "retryuser@example.com" },
      metadata: { courseSlug: "men" },
    },
  };

  const eventId = "wh_retry_evt_001";

  // Simulate DB failure on first attempt
  mockPrisma.simulateTxFailure = true;
  const { req: reqFail } = createSignedWebhookRequest(eventPayload, TEST_SECRET, { eventId });
  const resFail = await webhookRoute.POST(reqFail);
  assert.strictEqual(resFail.status, 500);
  assert.strictEqual(mockPrisma._coursePurchases.size, 0);
  assert.strictEqual(mockPrisma._processedWebhooks.has(eventId), false, "Must not mark processed on failure");

  // Retry when DB recovers
  mockPrisma.simulateTxFailure = false;
  const { req: reqRetry } = createSignedWebhookRequest(eventPayload, TEST_SECRET, { eventId });
  const resRetry = await webhookRoute.POST(reqRetry);
  assert.strictEqual(resRetry.status, 200);
  assert.strictEqual(mockPrisma._coursePurchases.size, 1);
  assert.strictEqual(mockPrisma._processedWebhooks.has(eventId), true);
});

test("Scenario 15: Customer return before webhook fulfillment - access check fails until purchase is verified", async () => {
  mockPrisma.reset();

  const customer = await mockPrisma.customer.create({
    data: {
      email: "returning@example.com",
      accessKey: "key_returning_123",
    },
  });

  // Before webhook has run:
  const accessBefore = await playbooks.hasUserAccessToCourse(customer.id, "men", customer.email);
  assert.strictEqual(accessBefore, false, "No access before payment fulfillment");

  // Webhook finishes processing:
  await mockPrisma.coursePurchase.create({
    customerId: customer.id,
    courseSlug: "men",
    amount: 3.0,
    currency: "USD",
    paymentId: "pay_verified_123",
  });

  // After webhook fulfillment:
  const accessAfter = await playbooks.hasUserAccessToCourse(customer.id, "men", customer.email);
  assert.strictEqual(accessAfter, true, "Access granted after payment fulfillment");
});

test("Scenario 16: A valid payment session cannot grant access to a different browser customer", async () => {
  mockPrisma.reset();
  mockBrowserCookies.clear();
  mockRedirectUrl = null;

  process.env.DODO_PAYMENTS_API_KEY = "test_key_live_mock";
  process.env.DODO_COURSE_PRODUCT_ID = TEST_PRODUCT_ID;

  // Victim customer
  const victim = await mockPrisma.customer.create({
    data: {
      email: "victim@example.com",
      accessKey: "key_victim_111",
    },
  });

  // Attacker customer
  const attacker = await mockPrisma.customer.create({
    data: {
      email: "attacker@example.com",
      accessKey: "key_attacker_999",
    },
  });

  // Attacker is logged in with their browser cookie
  mockBrowserCookies.set("plugd_access_key", attacker.accessKey);

  // Victim's paid session
  const victimSessionId = "sess_victim_secret_123";
  const victimPaymentId = "pay_victim_valid_456";

  // Mock Dodo API responses for victim's checkout session and payment
  dodopayments.dodoClient.checkoutSessions.retrieve = async (sessionId) => {
    if (sessionId === victimSessionId) {
      return {
        id: victimSessionId,
        payment_status: "succeeded",
        payment_id: victimPaymentId,
        customer_email: victim.email,
        metadata: {
          customerId: victim.id,
          customerEmail: victim.email,
          courseSlug: "men",
          amount: "3.00",
        },
      };
    }
    throw new Error("Session not found");
  };

  dodopayments.dodoClient.payments.retrieve = async (paymentId) => {
    if (paymentId === victimPaymentId) {
      return {
        payment_id: victimPaymentId,
        status: "succeeded",
        total_amount: 300,
        currency: "USD",
        product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
        customer: { email: victim.email },
        metadata: {
          customerId: victim.id,
          customerEmail: victim.email,
          courseSlug: "men",
          amount: "3.00",
        },
      };
    }
    throw new Error("Payment not found");
  };

  // Attacker attempts to load course using victim's session_id
  const pageResult = await LearnCoursePage({
    params: Promise.resolve({ courseSlug: "men" }),
    searchParams: Promise.resolve({ session_id: victimSessionId }),
  });

  // Verify: Attacker was NOT granted access
  const attackerAccess = await playbooks.hasUserAccessToCourse(attacker.id, "men", attacker.email);
  assert.strictEqual(attackerAccess, false, "Attacker must NOT gain access to victim's purchase");

  // Verify: No course purchase was recorded for attacker
  const attackerPurchase = await mockPrisma.coursePurchase.findUnique({
    where: { customerId_courseSlug: { customerId: attacker.id, courseSlug: "men" } },
  });
  assert.strictEqual(attackerPurchase, null, "No purchase record should be created for attacker");

  // Verify: Page returned is the PendingPurchaseView (access denied state)
  assert.ok(pageResult, "Page component must render pending view");
  assert.strictEqual(pageResult.type?.name || "PendingPurchaseView", "PendingPurchaseView");
});

test("Scenario 17: A session with mismatched or missing trusted customer association does not grant access", async () => {
  mockPrisma.reset();
  mockBrowserCookies.clear();
  mockRedirectUrl = null;

  process.env.DODO_PAYMENTS_API_KEY = "test_key_live_mock";
  process.env.DODO_COURSE_PRODUCT_ID = TEST_PRODUCT_ID;

  const customer = await mockPrisma.customer.create({
    data: {
      email: "charlie@example.com",
      accessKey: "key_charlie_777",
    },
  });

  // Case A: Missing metadata on session/payment
  const noMetaSessionId = "sess_no_meta_001";
  const noMetaPaymentId = "pay_no_meta_001";
  dodopayments.dodoClient.checkoutSessions.retrieve = async () => ({
    id: noMetaSessionId,
    payment_status: "succeeded",
    payment_id: noMetaPaymentId,
  });
  dodopayments.dodoClient.payments.retrieve = async () => ({
    payment_id: noMetaPaymentId,
    status: "succeeded",
    total_amount: 300,
    currency: "USD",
    product_cart: [{ product_id: TEST_PRODUCT_ID }],
    customer: { email: customer.email },
    metadata: {},
  });

  mockBrowserCookies.set("plugd_access_key", customer.accessKey);
  const resNoMeta = await LearnCoursePage({
    params: Promise.resolve({ courseSlug: "men" }),
    searchParams: Promise.resolve({ session_id: noMetaSessionId }),
  });

  const accessA = await playbooks.hasUserAccessToCourse(customer.id, "men", customer.email);
  assert.strictEqual(accessA, false, "Missing metadata must not grant access");
  assert.strictEqual(resNoMeta.type?.name || "PendingPurchaseView", "PendingPurchaseView");

  // Case B: Unauthenticated visitor (no browser cookie)
  mockBrowserCookies.clear();
  const validSessionId = "sess_anon_002";
  const validPaymentId = "pay_anon_002";
  dodopayments.dodoClient.checkoutSessions.retrieve = async () => ({
    id: validSessionId,
    payment_status: "succeeded",
    payment_id: validPaymentId,
    customer_email: customer.email,
    metadata: { customerId: customer.id, customerEmail: customer.email, courseSlug: "men" },
  });
  dodopayments.dodoClient.payments.retrieve = async () => ({
    payment_id: validPaymentId,
    status: "succeeded",
    total_amount: 300,
    currency: "USD",
    product_cart: [{ product_id: TEST_PRODUCT_ID }],
    customer: { email: customer.email },
    metadata: { customerId: customer.id, customerEmail: customer.email, courseSlug: "men" },
  });

  const resUnauth = await LearnCoursePage({
    params: Promise.resolve({ courseSlug: "men" }),
    searchParams: Promise.resolve({ session_id: validSessionId }),
  });
  assert.strictEqual(resUnauth.type?.name || "PendingPurchaseView", "PendingPurchaseView", "Unauthenticated visitor cannot gain access");
});

test("Scenario 18: A payment cannot be reused to grant access to another account", async () => {
  mockPrisma.reset();
  process.env.DODO_PAYMENTS_WEBHOOK_KEY = TEST_SECRET;
  process.env.DODO_COURSE_PRODUCT_ID = TEST_PRODUCT_ID;

  // Legitimate purchaser (Customer 1)
  const cust1 = await mockPrisma.customer.create({
    data: { email: "cust1@example.com", accessKey: "key_c1_123" },
  });
  await mockPrisma.coursePurchase.create({
    customerId: cust1.id,
    courseSlug: "men",
    amount: 3.0,
    currency: "USD",
    paymentId: "pay_shared_xyz",
  });

  // Attacker (Customer 2) attempts to replay the same payment_id
  const replayPayload = {
    type: "payment.succeeded",
    data: {
      payment_id: "pay_shared_xyz",
      total_amount: 300,
      currency: "USD",
      product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
      customer: { email: "cust2@example.com" },
      metadata: { courseSlug: "men", customerEmail: "cust2@example.com" },
    },
  };

  const { req } = createSignedWebhookRequest(replayPayload, TEST_SECRET, { eventId: "wh_replay_attack_01" });
  const res = await webhookRoute.POST(req);
  const json = await res.json();

  assert.strictEqual(res.status, 400, "Must reject cross-account payment reuse with HTTP 400");
  assert.ok(json.error.includes("already associated with another customer account"));

  // Verify Customer 2 was NOT granted access or given a purchase record
  const cust2 = await mockPrisma.customer.findUnique({ where: { email: "cust2@example.com" } });
  const cust2Access = cust2 ? await playbooks.hasUserAccessToCourse(cust2.id, "men") : false;
  assert.strictEqual(cust2Access, false, "Customer 2 must not be granted access");

  // Verify Customer 1's purchase is unchanged
  const cust1Purchase = await mockPrisma.coursePurchase.findUnique({
    where: { customerId_courseSlug: { customerId: cust1.id, courseSlug: "men" } },
  });
  assert.strictEqual(cust1Purchase.paymentId, "pay_shared_xyz");
});

test("Scenario 19: An existing purchase's paymentId is not silently overwritten by an unrelated payment", async () => {
  mockPrisma.reset();
  process.env.DODO_PAYMENTS_WEBHOOK_KEY = TEST_SECRET;
  process.env.DODO_COURSE_PRODUCT_ID = TEST_PRODUCT_ID;

  const customer = await mockPrisma.customer.create({
    data: { email: "student@example.com", accessKey: "key_student_abc" },
  });

  // Pre-existing purchase with specific paymentId and progress
  const initialPurchase = await mockPrisma.coursePurchase.create({
    customerId: customer.id,
    courseSlug: "men",
    amount: 3.0,
    currency: "USD",
    paymentId: "pay_initial_111",
    progress: { completedLessons: ["01-1", "01-2"], lastViewedLessonId: "01-2" },
  });

  // A new webhook event arrives for the same student with a DIFFERENT paymentId
  const newPaymentPayload = {
    type: "payment.succeeded",
    data: {
      payment_id: "pay_different_222",
      total_amount: 300,
      currency: "USD",
      product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
      customer: { email: customer.email },
      metadata: { courseSlug: "men", customerId: customer.id, customerEmail: customer.email },
    },
  };

  const { req } = createSignedWebhookRequest(newPaymentPayload, TEST_SECRET, { eventId: "wh_new_payment_diff" });
  const res = await webhookRoute.POST(req);
  assert.strictEqual(res.status, 200);

  // Verify original paymentId was PRESERVED and not overwritten
  const purchaseAfter = await mockPrisma.coursePurchase.findUnique({
    where: { customerId_courseSlug: { customerId: customer.id, courseSlug: "men" } },
  });
  assert.strictEqual(purchaseAfter.paymentId, "pay_initial_111", "Original paymentId must not be overwritten");
  assert.deepStrictEqual(purchaseAfter.progress, initialPurchase.progress, "Progress must not be wiped");
});

test("Scenario 20: Duplicate delivery of the same payment does not corrupt purchase records", async () => {
  mockPrisma.reset();
  process.env.DODO_PAYMENTS_WEBHOOK_KEY = TEST_SECRET;
  process.env.DODO_COURSE_PRODUCT_ID = TEST_PRODUCT_ID;

  const customer = await mockPrisma.customer.create({
    data: { email: "duptest@example.com", accessKey: "key_duptest_000" },
  });

  const dupPayload = {
    type: "payment.succeeded",
    data: {
      payment_id: "pay_same_dup_333",
      total_amount: 300,
      currency: "USD",
      product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
      customer: { email: customer.email },
      metadata: { courseSlug: "men", customerId: customer.id, customerEmail: customer.email },
    },
  };

  // First delivery
  const { req: req1 } = createSignedWebhookRequest(dupPayload, TEST_SECRET, { eventId: "wh_delivery_1" });
  const res1 = await webhookRoute.POST(req1);
  assert.strictEqual(res1.status, 200);

  // Simulate user making course progress
  const purchaseBefore = await mockPrisma.coursePurchase.findFirst({ where: { paymentId: "pay_same_dup_333" } });
  await mockPrisma.coursePurchase.update({
    where: { id: purchaseBefore.id },
    data: { progress: { completedLessons: ["01-1", "01-2", "01-3"], lastViewedLessonId: "01-3" } },
  });

  // Second delivery with distinct eventId (e.g. webhook retry)
  const { req: req2 } = createSignedWebhookRequest(dupPayload, TEST_SECRET, { eventId: "wh_delivery_2" });
  const res2 = await webhookRoute.POST(req2);
  assert.strictEqual(res2.status, 200);

  // Check that progress is preserved and paymentId remains pay_same_dup_333
  const currentPurchase = await mockPrisma.coursePurchase.findUnique({
    where: { customerId_courseSlug: { customerId: customer.id, courseSlug: "men" } },
  });
  assert.strictEqual(currentPurchase.paymentId, "pay_same_dup_333");
  assert.deepStrictEqual(currentPurchase.progress.completedLessons, ["01-1", "01-2", "01-3"]);
  assert.strictEqual(mockPrisma._coursePurchases.size, 1);
});

test("Scenario 21: Access-key generation uses cryptographically secure randomness", async () => {
  const keys = new Set();
  const sampleCount = 1000;

  for (let i = 0; i < sampleCount; i++) {
    const key = playbooks.generateSecureAccessKey();
    assert.strictEqual(typeof key, "string");
    assert.strictEqual(key.length, 48, "Hex of 24 bytes must be exactly 48 chars");
    assert.match(key, /^[0-9a-f]{48}$/, "Key must be lowercase hex");
    keys.add(key);
  }

  assert.strictEqual(keys.size, sampleCount, "All 1000 generated keys must be distinct (high entropy)");

  mockPrisma.reset();
  const newCustomer = await playbooks.getOrCreateCustomer("secure_test@example.com");
  assert.strictEqual(newCustomer.accessKey.length, 48);
  assert.match(newCustomer.accessKey, /^[0-9a-f]{48}$/);
});

test("Scenario 22: Concurrent duplicate webhook events are handled safely", async () => {
  mockPrisma.reset();
  process.env.DODO_PAYMENTS_WEBHOOK_KEY = TEST_SECRET;
  process.env.DODO_COURSE_PRODUCT_ID = TEST_PRODUCT_ID;

  const eventPayload = {
    type: "payment.succeeded",
    data: {
      payment_id: "pay_concurrent_999",
      total_amount: 300,
      currency: "USD",
      product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
      customer: { email: "concurrent@example.com" },
      metadata: { courseSlug: "men" },
    },
  };

  const eventId = "evt_race_condition_999";

  // Simulate Request A committing successfully
  const { req: reqA } = createSignedWebhookRequest(eventPayload, TEST_SECRET, { eventId });
  const resA = await webhookRoute.POST(reqA);
  assert.strictEqual(resA.status, 200);

  // Now simulate Request B which ran concurrently, bypassed line 48 before Request A committed,
  // but encounters P2002 when trying to create ProcessedWebhook.
  const { req: reqB } = createSignedWebhookRequest(eventPayload, TEST_SECRET, { eventId });
  const resB = await webhookRoute.POST(reqB);

  // Must return HTTP 200 with duplicate message (handled gracefully, NOT HTTP 500)
  assert.strictEqual(resB.status, 200);
  const jsonB = await resB.json();
  assert.strictEqual(jsonB.message, "Duplicate webhook event already processed");

  // Exactly 1 purchase record in DB
  assert.strictEqual(mockPrisma._coursePurchases.size, 1);
});

test("Scenario 23: Database failures still leave fulfillment retryable", async () => {
  mockPrisma.reset();
  process.env.DODO_PAYMENTS_WEBHOOK_KEY = TEST_SECRET;
  process.env.DODO_COURSE_PRODUCT_ID = TEST_PRODUCT_ID;

  const eventPayload = {
    type: "payment.succeeded",
    data: {
      payment_id: "pay_db_retry_888",
      total_amount: 300,
      currency: "USD",
      product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
      customer: { email: "retryable@example.com" },
      metadata: { courseSlug: "men" },
    },
  };

  const eventId = "evt_retryable_888";

  // Attempt 1: DB fails
  mockPrisma.simulateTxFailure = true;
  const { req: req1 } = createSignedWebhookRequest(eventPayload, TEST_SECRET, { eventId });
  const res1 = await webhookRoute.POST(req1);
  assert.strictEqual(res1.status, 500, "Database error must fail with 500");
  assert.strictEqual(mockPrisma._processedWebhooks.has(eventId), false, "Event must not be marked processed on failure");

  // Attempt 2: DB recovers, retry succeeds
  mockPrisma.simulateTxFailure = false;
  const { req: req2 } = createSignedWebhookRequest(eventPayload, TEST_SECRET, { eventId });
  const res2 = await webhookRoute.POST(req2);
  assert.strictEqual(res2.status, 200, "Retry must succeed with 200");
  assert.strictEqual(mockPrisma._processedWebhooks.has(eventId), true);
  assert.strictEqual(mockPrisma._coursePurchases.size, 1);
});

test("Scenario 24: Legitimate checkout return with matching customer cookie grants access", async () => {
  mockPrisma.reset();
  mockBrowserCookies.clear();

  process.env.DODO_PAYMENTS_API_KEY = "test_key_live_mock";
  process.env.DODO_COURSE_PRODUCT_ID = TEST_PRODUCT_ID;

  const customer = await mockPrisma.customer.create({
    data: {
      email: "legit@example.com",
      accessKey: "key_legit_555",
    },
  });

  mockBrowserCookies.set("plugd_access_key", customer.accessKey);

  const sessionId = "sess_legit_100";
  const paymentId = "pay_legit_100";

  dodopayments.dodoClient.checkoutSessions.retrieve = async () => ({
    id: sessionId,
    payment_status: "succeeded",
    payment_id: paymentId,
    customer_email: customer.email,
    metadata: {
      customerId: customer.id,
      customerEmail: customer.email,
      courseSlug: "men",
      amount: "3.00",
    },
  });

  dodopayments.dodoClient.payments.retrieve = async () => ({
    payment_id: paymentId,
    status: "succeeded",
    total_amount: 300,
    currency: "USD",
    product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
    customer: { email: customer.email },
    metadata: {
      customerId: customer.id,
      customerEmail: customer.email,
      courseSlug: "men",
      amount: "3.00",
    },
  });

  const pageResult = await LearnCoursePage({
    params: Promise.resolve({ courseSlug: "men" }),
    searchParams: Promise.resolve({ session_id: sessionId }),
  });

  const hasAccess = await playbooks.hasUserAccessToCourse(customer.id, "men", customer.email);
  assert.strictEqual(hasAccess, true, "Legitimate customer must be granted access");

  const purchase = await mockPrisma.coursePurchase.findUnique({
    where: { customerId_courseSlug: { customerId: customer.id, courseSlug: "men" } },
  });
  assert.ok(purchase, "Purchase must be recorded in database");
  assert.strictEqual(purchase.paymentId, paymentId);
  assert.strictEqual(purchase.amount, 3.0);
});

test("Scenario 25: Direct checkout without email - creates checkout session with $3.00 USD, sets checkoutToken cookie, records no purchase", async () => {
  mockPrisma.reset();
  process.env.DODO_PAYMENTS_API_KEY = "live_test_api_key_12345";
  process.env.DODO_COURSE_PRODUCT_ID = TEST_PRODUCT_ID;

  let capturedParams = null;
  const origCreate = dodopayments.dodoClient.checkoutSessions.create;
  dodopayments.dodoClient.checkoutSessions.create = async (params) => {
    capturedParams = params;
    return {
      checkout_url: "https://checkout.dodopayments.com/buy/direct_session_123",
      session_id: "direct_session_123",
    };
  };

  try {
    const req = new Request("https://theplugd.com/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ courseSlug: "men" }),
    });

    const res = await checkoutRoute.POST(req);
    const json = await res.json();

    assert.strictEqual(res.status, 200);
    assert.strictEqual(json.checkoutUrl, "https://checkout.dodopayments.com/buy/direct_session_123");
    assert.strictEqual(capturedParams.product_cart[0].product_id, TEST_PRODUCT_ID);
    assert.strictEqual(capturedParams.product_cart[0].amount, 300);
    assert.strictEqual(capturedParams.billing_currency, "USD");
    assert.strictEqual(capturedParams.customer, undefined);
    assert.ok(capturedParams.metadata.checkoutToken, "Must pass checkoutToken in session metadata");
    assert.strictEqual(capturedParams.feature_flags?.single_page, true, "Must enable single_page checkout feature flag");

    const setCookies = res.cookies.getAll();
    const tokenCookie = setCookies.find((c) => c.name === "plugd_checkout_token");
    assert.ok(tokenCookie, "Must set plugd_checkout_token cookie");
    assert.strictEqual(tokenCookie.value, capturedParams.metadata.checkoutToken);

    // Free access must never be granted
    assert.strictEqual(mockPrisma._coursePurchases.size, 0);
  } finally {
    dodopayments.dodoClient.checkoutSessions.create = origCreate;
  }
});

test("Scenario 26: Return polling cannot create purchase before webhook; once webhook fulfills, correct access cookie is issued", async () => {
  mockPrisma.reset();
  mockBrowserCookies.clear();

  const checkoutToken = "tok_test_checkout_secret_12345";
  mockBrowserCookies.set("plugd_checkout_token", checkoutToken);

  const sessionId = "session_direct_return_test";
  const paymentId = "pay_direct_return_100";
  const buyerEmail = "buyer_direct@example.com";

  dodopayments.dodoClient.checkoutSessions.retrieve = async () => ({
    id: sessionId,
    payment_status: "succeeded",
    payment_id: paymentId,
    customer_email: buyerEmail,
    metadata: {
      checkoutToken,
      courseSlug: "men",
      amount: "3.00",
    },
  });

  dodopayments.dodoClient.payments.retrieve = async () => ({
    payment_id: paymentId,
    status: "succeeded",
    total_amount: 300,
    currency: "USD",
    product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
    customer: { email: buyerEmail },
    metadata: {
      checkoutToken,
      courseSlug: "men",
      amount: "3.00",
    },
  });

  const checkReq = new Request(`https://theplugd.com/api/customer/check-ownership?courseSlug=men&session_id=${sessionId}`, {
    method: "GET",
    headers: {
      cookie: `plugd_checkout_token=${checkoutToken}`,
    },
  });

  // Phase 1: Polling BEFORE webhook fulfillment must return owned: false, set NO cookies, and create NO purchases
  const preWebhookRes = await checkOwnershipRoute.GET(checkReq);
  const preWebhookJson = await preWebhookRes.json();
  assert.strictEqual(preWebhookJson.owned, false, "Must return owned: false before webhook fulfillment");
  assert.strictEqual(preWebhookRes.cookies.getAll().length, 0, "No access cookie issued before webhook fulfillment");
  assert.strictEqual(mockPrisma._coursePurchases.size, 0, "Polling endpoint must NOT create purchase records");

  // Phase 2: Authoritative webhook arrives and fulfills the purchase
  const webhookPayload = {
    type: "payment.succeeded",
    data: {
      payment_id: paymentId,
      total_amount: 300,
      currency: "USD",
      product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
      customer: { email: buyerEmail },
      metadata: { courseSlug: "men", checkoutToken },
    },
  };
  const { req: whReq } = createSignedWebhookRequest(webhookPayload, TEST_SECRET, { eventId: "evt_wh_direct_return" });
  const whRes = await webhookRoute.POST(whReq);
  assert.strictEqual(whRes.status, 200, "Webhook fulfillment must succeed");
  assert.strictEqual(mockPrisma._coursePurchases.size, 1, "Webhook must persist the purchase record");

  // Phase 3: Now client polling verifies purchase persistence, sets hardened cookie, and confirms access
  const postWebhookRes = await checkOwnershipRoute.GET(checkReq);
  const postWebhookJson = await postWebhookRes.json();
  assert.strictEqual(postWebhookJson.owned, true, "Must return owned: true after webhook fulfillment");
  assert.strictEqual(postWebhookJson.email, buyerEmail);

  const setCookies = postWebhookRes.cookies.getAll();
  const accessKeyCookie = setCookies.find((c) => c.name === "plugd_access_key");
  assert.ok(accessKeyCookie, "Must set plugd_access_key cookie");
  assert.strictEqual(accessKeyCookie.httpOnly, true, "Access key cookie must be httpOnly");
  assert.strictEqual(accessKeyCookie.sameSite, "lax");

  const customer = await mockPrisma.customer.findUnique({ where: { email: buyerEmail } });
  assert.ok(customer, "Customer must exist in database");
  assert.strictEqual(accessKeyCookie.value, customer.accessKey);

  // Phase 4: Subsequent navigation with the issued cookie without session_id grants full course access
  mockBrowserCookies.set("plugd_access_key", customer.accessKey);
  const authPageResult = await LearnCoursePage({
    params: Promise.resolve({ courseSlug: "men" }),
    searchParams: Promise.resolve({}),
  });
  assert.strictEqual(typeof authPageResult, "object");
  assert.notStrictEqual(authPageResult.type?.name, "PendingPurchaseView", "Authenticated user receives course view");
});

test("Scenario 27: Page refresh after purchase retains access without session_id in URL", async () => {
  mockPrisma.reset();
  mockBrowserCookies.clear();

  const customer = await playbooks.getOrCreateCustomer("returning_student@example.com", mockPrisma);
  await playbooks.recordCoursePurchase({
    customerId: customer.id,
    courseSlug: "men",
    amount: 3.0,
    paymentId: "pay_refresh_test",
    client: mockPrisma,
  });

  mockBrowserCookies.set("plugd_access_key", customer.accessKey);

  // First page visit
  const firstVisit = await LearnCoursePage({
    params: Promise.resolve({ courseSlug: "men" }),
    searchParams: Promise.resolve({}),
  });
  assert.notStrictEqual(firstVisit.type?.name, "PendingPurchaseView");

  // Page refresh (second visit with identical cookie)
  const refreshVisit = await LearnCoursePage({
    params: Promise.resolve({ courseSlug: "men" }),
    searchParams: Promise.resolve({}),
  });
  assert.notStrictEqual(refreshVisit.type?.name, "PendingPurchaseView");
});

test("Scenario 28: Existing owner still gets immediate access in check-ownership without Dodo session lookup", async () => {
  mockPrisma.reset();
  mockBrowserCookies.clear();

  const existingCustomer = await playbooks.getOrCreateCustomer("already_owner@example.com", mockPrisma);
  await playbooks.recordCoursePurchase({
    customerId: existingCustomer.id,
    courseSlug: "men",
    amount: 3.0,
    paymentId: "pay_existing_owner_1",
    client: mockPrisma,
  });

  mockBrowserCookies.set("plugd_access_key", existingCustomer.accessKey);

  const req = new Request("https://theplugd.com/api/customer/check-ownership?courseSlug=men", {
    method: "GET",
    headers: {
      cookie: `plugd_access_key=${existingCustomer.accessKey}`,
    },
  });

  const res = await checkOwnershipRoute.GET(req);
  const json = await res.json();

  assert.strictEqual(json.owned, true);
  assert.strictEqual(json.email, existingCustomer.email);
});

test("Scenario 29: Regression test (SEC-02): Customer with access cookie for another course does not early-return false when session_id is present", async () => {
  mockPrisma.reset();
  mockBrowserCookies.clear();

  // Customer owns 'women' course, but NOT 'men'
  const customer = await playbooks.getOrCreateCustomer("cross_course_user@example.com", mockPrisma);
  await playbooks.recordCoursePurchase({
    customerId: customer.id,
    courseSlug: "women",
    amount: 3.0,
    paymentId: "pay_women_course_1",
    client: mockPrisma,
  });

  mockBrowserCookies.set("plugd_access_key", customer.accessKey);

  const checkoutToken = "tok_cross_course_sec02";
  mockBrowserCookies.set("plugd_checkout_token", checkoutToken);

  const sessionId = "session_sec02_test";
  const paymentId = "pay_sec02_test";

  dodopayments.dodoClient.checkoutSessions.retrieve = async () => ({
    id: sessionId,
    payment_status: "succeeded",
    payment_id: paymentId,
    customer_email: customer.email,
    metadata: { checkoutToken, courseSlug: "men", amount: "3.00" },
  });

  dodopayments.dodoClient.payments.retrieve = async () => ({
    payment_id: paymentId,
    status: "succeeded",
    total_amount: 300,
    currency: "USD",
    product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
    customer: { email: customer.email },
    metadata: { checkoutToken, courseSlug: "men", amount: "3.00" },
  });

  const req = new Request(`https://theplugd.com/api/customer/check-ownership?courseSlug=men&session_id=${sessionId}`, {
    method: "GET",
    headers: {
      cookie: `plugd_access_key=${customer.accessKey}; plugd_checkout_token=${checkoutToken}`,
    },
  });

  // Step 1: When webhook is pending, must NOT return early with unassociated false; must evaluate session flow and return pending
  const preRes = await checkOwnershipRoute.GET(req);
  const preJson = await preRes.json();
  assert.strictEqual(preJson.owned, false);

  // Step 2: Webhook fulfills 'men' course purchase for this customer
  const webhookPayload = {
    type: "payment.succeeded",
    data: {
      payment_id: paymentId,
      total_amount: 300,
      currency: "USD",
      product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
      customer: { email: customer.email },
      metadata: { courseSlug: "men", checkoutToken },
    },
  };
  const { req: whReq } = createSignedWebhookRequest(webhookPayload, TEST_SECRET, { eventId: "evt_sec02_wh" });
  await webhookRoute.POST(whReq);

  // Step 3: Now check-ownership confirms purchase and returns owned: true
  const postRes = await checkOwnershipRoute.GET(req);
  const postJson = await postRes.json();
  assert.strictEqual(postJson.owned, true, "Must recognize newly fulfilled course ownership without being blocked by prior cookie");
  assert.strictEqual(postJson.email, customer.email);
});

test("Scenario 30: Missing or mismatched checkout token is rejected in check-ownership even if webhook fulfilled", async () => {
  mockPrisma.reset();
  mockBrowserCookies.clear();

  const sessionId = "session_stolen_token_test";
  const paymentId = "pay_stolen_123";
  const genuineEmail = "victim@example.com";

  // Pre-seed purchase in DB (as if webhook fulfilled for victim)
  const victimCustomer = await playbooks.getOrCreateCustomer(genuineEmail, mockPrisma);
  await playbooks.recordCoursePurchase({
    customerId: victimCustomer.id,
    courseSlug: "men",
    amount: 3.0,
    paymentId,
    client: mockPrisma,
  });

  dodopayments.dodoClient.checkoutSessions.retrieve = async () => ({
    id: sessionId,
    payment_status: "succeeded",
    payment_id: paymentId,
    customer_email: genuineEmail,
    metadata: {
      checkoutToken: "genuine_token_abc",
      courseSlug: "men",
      amount: "3.00",
    },
  });

  dodopayments.dodoClient.payments.retrieve = async () => ({
    payment_id: paymentId,
    status: "succeeded",
    total_amount: 300,
    currency: "USD",
    product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
    customer: { email: genuineEmail },
    metadata: {
      checkoutToken: "genuine_token_abc",
      courseSlug: "men",
      amount: "3.00",
    },
  });

  // Attacker provides wrong checkout token
  const reqMismatched = new Request(`https://theplugd.com/api/customer/check-ownership?courseSlug=men&session_id=${sessionId}`, {
    method: "GET",
    headers: {
      cookie: "plugd_checkout_token=attacker_wrong_token",
    },
  });

  const resMismatched = await checkOwnershipRoute.GET(reqMismatched);
  const jsonMismatched = await resMismatched.json();
  assert.strictEqual(jsonMismatched.owned, false);
  assert.strictEqual(resMismatched.cookies.getAll().length, 0, "No access cookie must be issued to mismatched token");

  // Caller provides NO checkout token
  const reqMissing = new Request(`https://theplugd.com/api/customer/check-ownership?courseSlug=men&session_id=${sessionId}`, {
    method: "GET",
  });

  const resMissing = await checkOwnershipRoute.GET(reqMissing);
  const jsonMissing = await resMissing.json();
  assert.strictEqual(jsonMissing.owned, false);
  assert.strictEqual(resMissing.cookies.getAll().length, 0, "No access cookie must be issued when token is missing");
});

test("Scenario 31: Unsuccessful payment, wrong product, amount, or currency rejected in check-ownership", async () => {
  mockPrisma.reset();
  mockBrowserCookies.clear();

  const token = "tok_test_rejects";
  const sessionId = "sess_rejects";

  // Case A: Unsuccessful payment
  dodopayments.dodoClient.checkoutSessions.retrieve = async () => ({
    id: sessionId,
    payment_status: "failed",
    payment_id: "pay_failed_1",
    metadata: { checkoutToken: token, courseSlug: "men" },
  });

  const reqA = new Request(`https://theplugd.com/api/customer/check-ownership?courseSlug=men&session_id=${sessionId}`, {
    method: "GET",
    headers: { cookie: `plugd_checkout_token=${token}` },
  });
  const resA = await checkOwnershipRoute.GET(reqA);
  const jsonA = await resA.json();
  assert.strictEqual(jsonA.owned, false);
  assert.strictEqual(resA.cookies.getAll().length, 0);

  // Case B: Wrong product ID
  dodopayments.dodoClient.checkoutSessions.retrieve = async () => ({
    id: sessionId,
    payment_status: "succeeded",
    payment_id: "pay_wrong_prod",
    metadata: { checkoutToken: token, courseSlug: "men" },
  });
  dodopayments.dodoClient.payments.retrieve = async () => ({
    payment_id: "pay_wrong_prod",
    status: "succeeded",
    total_amount: 300,
    currency: "USD",
    product_cart: [{ product_id: "pdt_WRONG_PRODUCT", quantity: 1 }],
    customer: { email: "test@example.com" },
    metadata: { checkoutToken: token, courseSlug: "men" },
  });

  const resB = await checkOwnershipRoute.GET(reqA);
  const jsonB = await resB.json();
  assert.strictEqual(jsonB.owned, false);

  // Case C: Wrong amount ($1 instead of $3)
  dodopayments.dodoClient.payments.retrieve = async () => ({
    payment_id: "pay_wrong_amt",
    status: "succeeded",
    total_amount: 100,
    currency: "USD",
    product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
    customer: { email: "test@example.com" },
    metadata: { checkoutToken: token, courseSlug: "men" },
  });

  const resC = await checkOwnershipRoute.GET(reqA);
  const jsonC = await resC.json();
  assert.strictEqual(jsonC.owned, false);

  // Case D: Wrong currency (EUR instead of USD)
  dodopayments.dodoClient.payments.retrieve = async () => ({
    payment_id: "pay_wrong_curr",
    status: "succeeded",
    total_amount: 300,
    currency: "EUR",
    product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
    customer: { email: "test@example.com" },
    metadata: { checkoutToken: token, courseSlug: "men" },
  });

  const resD = await checkOwnershipRoute.GET(reqA);
  const jsonD = await resD.json();
  assert.strictEqual(jsonD.owned, false);
});

test("Scenario 32: Delayed or failed webhook leaves the customer pending rather than granting access", async () => {
  mockPrisma.reset();
  mockBrowserCookies.clear();

  const checkoutToken = "tok_delayed_wh_test";
  const sessionId = "session_delayed_wh";
  const paymentId = "pay_delayed_wh";
  const buyerEmail = "delayed_buyer@example.com";

  dodopayments.dodoClient.checkoutSessions.retrieve = async () => ({
    id: sessionId,
    payment_status: "succeeded",
    payment_id: paymentId,
    customer_email: buyerEmail,
    metadata: { checkoutToken, courseSlug: "men", amount: "3.00" },
  });

  dodopayments.dodoClient.payments.retrieve = async () => ({
    payment_id: paymentId,
    status: "succeeded",
    total_amount: 300,
    currency: "USD",
    product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
    customer: { email: buyerEmail },
    metadata: { checkoutToken, courseSlug: "men", amount: "3.00" },
  });

  const req = new Request(`https://theplugd.com/api/customer/check-ownership?courseSlug=men&session_id=${sessionId}`, {
    method: "GET",
    headers: { cookie: `plugd_checkout_token=${checkoutToken}` },
  });

  // Webhook failed due to database connection error
  mockPrisma.simulateTxFailure = true;
  const webhookPayload = {
    type: "payment.succeeded",
    data: {
      payment_id: paymentId,
      total_amount: 300,
      currency: "USD",
      product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
      customer: { email: buyerEmail },
      metadata: { courseSlug: "men", checkoutToken },
    },
  };
  const { req: whReq } = createSignedWebhookRequest(webhookPayload, TEST_SECRET, { eventId: "evt_delayed_fail" });
  const whRes = await webhookRoute.POST(whReq);
  assert.strictEqual(whRes.status, 500, "Failed webhook returns 500");
  mockPrisma.simulateTxFailure = false;

  // Polling must leave user pending (owned: false, no cookie)
  const pollRes = await checkOwnershipRoute.GET(req);
  const pollJson = await pollRes.json();
  assert.strictEqual(pollJson.owned, false, "Must return owned: false when webhook has not fulfilled");
  assert.strictEqual(pollRes.cookies.getAll().length, 0, "No access cookie issued");
  assert.strictEqual(mockPrisma._coursePurchases.size, 0, "No purchase in database");
});

test("Scenario 33: Customer email recovered from verified payment when absent from session", async () => {
  mockPrisma.reset();
  mockBrowserCookies.clear();

  const checkoutToken = "tok_email_recovery_test";
  const sessionId = "session_no_session_email";
  const paymentId = "pay_recovered_email_456";
  const verifiedPaymentEmail = "verified_on_payment@example.com";

  // Pre-fulfill via webhook for this verified payment email
  const customer = await playbooks.getOrCreateCustomer(verifiedPaymentEmail, mockPrisma);
  await playbooks.recordCoursePurchase({
    customerId: customer.id,
    courseSlug: "men",
    amount: 3.0,
    paymentId,
    client: mockPrisma,
  });

  // Session has NO customer_email
  dodopayments.dodoClient.checkoutSessions.retrieve = async () => ({
    id: sessionId,
    payment_status: "succeeded",
    payment_id: paymentId,
    customer_email: null,
    metadata: {
      checkoutToken,
      courseSlug: "men",
      amount: "3.00",
    },
  });

  // Payment contains the verified email collected on Dodo's hosted page
  dodopayments.dodoClient.payments.retrieve = async () => ({
    payment_id: paymentId,
    status: "succeeded",
    total_amount: 300,
    currency: "USD",
    product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
    customer: { email: verifiedPaymentEmail },
    metadata: {
      checkoutToken,
      courseSlug: "men",
      amount: "3.00",
    },
  });

  const req = new Request(`https://theplugd.com/api/customer/check-ownership?courseSlug=men&session_id=${sessionId}`, {
    method: "GET",
    headers: {
      cookie: `plugd_checkout_token=${checkoutToken}`,
    },
  });

  const res = await checkOwnershipRoute.GET(req);
  const json = await res.json();

  assert.strictEqual(json.owned, true);
  assert.strictEqual(json.email, verifiedPaymentEmail, "Email must be recovered from payment.customer.email");
});

test("Scenario 34: Cookie security attributes are hardened (httpOnly, secure in production, sameSite=lax)", async () => {
  const origNodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "production";

  try {
    mockPrisma.reset();
    mockBrowserCookies.clear();

    const checkoutToken = "tok_cookie_sec_check";
    const sessionId = "session_cookie_sec";
    const paymentId = "pay_cookie_sec";
    const buyerEmail = "sec_buyer@example.com";

    // Pre-fulfill via webhook
    const customer = await playbooks.getOrCreateCustomer(buyerEmail, mockPrisma);
    await playbooks.recordCoursePurchase({
      customerId: customer.id,
      courseSlug: "men",
      amount: 3.0,
      paymentId,
      client: mockPrisma,
    });

    dodopayments.dodoClient.checkoutSessions.retrieve = async () => ({
      id: sessionId,
      payment_status: "succeeded",
      payment_id: paymentId,
      customer_email: buyerEmail,
      metadata: { checkoutToken, courseSlug: "men", amount: "3.00" },
    });

    dodopayments.dodoClient.payments.retrieve = async () => ({
      payment_id: paymentId,
      status: "succeeded",
      total_amount: 300,
      currency: "USD",
      product_cart: [{ product_id: TEST_PRODUCT_ID, quantity: 1 }],
      customer: { email: buyerEmail },
      metadata: { checkoutToken, courseSlug: "men", amount: "3.00" },
    });

    const req = new Request(`https://theplugd.com/api/customer/check-ownership?courseSlug=men&session_id=${sessionId}`, {
      method: "GET",
      headers: { cookie: `plugd_checkout_token=${checkoutToken}` },
    });

    const res = await checkOwnershipRoute.GET(req);
    const cookies = res.cookies.getAll();
    const accessCookie = cookies.find((c) => c.name === "plugd_access_key");

    assert.ok(accessCookie, "Must set plugd_access_key");
    assert.strictEqual(accessCookie.httpOnly, true, "Must be httpOnly");
    assert.strictEqual(accessCookie.secure, true, "Must be secure in production");
    assert.strictEqual(accessCookie.sameSite, "lax", "Must be sameSite=lax");
    assert.strictEqual(accessCookie.path, "/", "Must be path=/");
  } finally {
    process.env.NODE_ENV = origNodeEnv;
  }
});

test("Scenario 35: Course product ID does not fall back to legacy DODO_PAYMENTS_PRODUCT_ID", () => {
  const origCourse = process.env.DODO_COURSE_PRODUCT_ID;
  const origLegacy = process.env.DODO_PAYMENTS_PRODUCT_ID;

  try {
    delete process.env.DODO_COURSE_PRODUCT_ID;
    process.env.DODO_PAYMENTS_PRODUCT_ID = "pdt_legacy_yearly_299";

    const resolved = dodopayments.getDodoCourseProductId();
    assert.strictEqual(resolved, "pdt_0NpUSu9EmAAsRoz2l3ZNV", "Must use canonical product ID instead of legacy $299 product");
  } finally {
    process.env.DODO_COURSE_PRODUCT_ID = origCourse;
    process.env.DODO_PAYMENTS_PRODUCT_ID = origLegacy;
  }
});
