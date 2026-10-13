const test = require("node:test");
const assert = require("node:assert");
const path = require("node:path");
const fs = require("node:fs");
const crypto = require("node:crypto");
const ts = require("typescript");
const Module = require("node:module");

// Register in-memory TypeScript transpilation and path alias resolution
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

// In-Memory Database Mock with Transaction Concurrency Locking
class InMemoryPrismaMock {
  constructor() {
    this.reset();
  }

  reset() {
    this._customers = new Map();
    this._coursePurchases = new Map();
    this._complimentaryAccess = new Map();
    this._otpTokens = new Map();
    this._txLock = false;
  }

  get customer() {
    return {
      findUnique: async ({ where }) => {
        if (where.email) {
          const email = where.email.toLowerCase();
          for (const c of this._customers.values()) {
            if (c.email.toLowerCase() === email) return { ...c };
          }
          return null;
        }
        if (where.accessKey) {
          for (const c of this._customers.values()) {
            if (c.accessKey === where.accessKey) return { ...c };
          }
          return null;
        }
        if (where.id) {
          return this._customers.has(where.id) ? { ...this._customers.get(where.id) } : null;
        }
        return null;
      },
      create: async ({ data }) => {
        const id = "cust_" + Math.random().toString(36).slice(2, 10);
        const record = { id, ...data, email: data.email.toLowerCase() };
        this._customers.set(id, record);
        return { ...record };
      },
    };
  }

  get coursePurchase() {
    return {
      findUnique: async ({ where }) => {
        if (where.customerId_courseSlug) {
          const key = `${where.customerId_courseSlug.customerId}_${where.customerId_courseSlug.courseSlug.toLowerCase()}`;
          return this._coursePurchases.has(key) ? { ...this._coursePurchases.get(key) } : null;
        }
        return null;
      },
      findFirst: async ({ where }) => {
        for (const p of this._coursePurchases.values()) {
          if (where.paymentId && p.paymentId !== where.paymentId) continue;
          if (where.courseSlug && p.courseSlug !== where.courseSlug.toLowerCase()) continue;
          return { ...p };
        }
        return null;
      },
      create: async ({ data }) => {
        const id = "cp_" + Math.random().toString(36).slice(2, 10);
        const record = { id, ...data, courseSlug: data.courseSlug.toLowerCase() };
        const key = `${record.customerId}_${record.courseSlug}`;
        this._coursePurchases.set(key, record);
        return { ...record };
      },
    };
  }

  get complimentaryAccess() {
    return {
      findUnique: async ({ where }) => {
        const email = where.email?.toLowerCase();
        return this._complimentaryAccess.has(email) ? { ...this._complimentaryAccess.get(email) } : null;
      },
      create: async ({ data }) => {
        const record = { ...data, email: data.email.toLowerCase() };
        this._complimentaryAccess.set(record.email, record);
        return { ...record };
      },
    };
  }

  get otpToken() {
    return {
      findFirst: async ({ where }) => {
        for (const t of this._otpTokens.values()) {
          if (where.code && t.code !== where.code) continue;
          if (where.used !== undefined && t.used !== where.used) continue;
          if (where.expiresAt && where.expiresAt.gt && t.expiresAt <= where.expiresAt.gt) continue;
          return { ...t };
        }
        return null;
      },
      create: async ({ data }) => {
        const id = "otp_" + Math.random().toString(36).slice(2, 10);
        const record = { id, ...data, email: data.email.toLowerCase() };
        this._otpTokens.set(id, record);
        return { ...record };
      },
      update: async ({ where, data }) => {
        const existing = this._otpTokens.get(where.id);
        if (!existing) throw new Error("OtpToken not found");
        const updated = { ...existing, ...data };
        this._otpTokens.set(where.id, updated);
        return { ...updated };
      },
      updateMany: async ({ where, data }) => {
        let count = 0;
        for (const [id, t] of this._otpTokens.entries()) {
          if (where.email && t.email.toLowerCase() !== where.email.toLowerCase()) continue;
          if (where.used !== undefined && t.used !== where.used) continue;
          this._otpTokens.set(id, { ...t, ...data });
          count++;
        }
        return { count };
      },
    };
  }

  async $transaction(fn) {
    while (this._txLock) {
      await new Promise((r) => setTimeout(r, 2));
    }
    this._txLock = true;
    try {
      // Simulate real I/O latency to stress-test concurrent transaction isolation
      await new Promise((r) => setTimeout(r, 2));
      return await fn(this);
    } finally {
      this._txLock = false;
    }
  }
}

const mockPrisma = new InMemoryPrismaMock();

// Mock @/lib/prisma
const prismaModule = require("@/lib/prisma");
prismaModule.default = mockPrisma;

const { resetLoginRateLimit } = require("@/lib/auth-rate-limit");
const emailService = require("@/lib/email");
const loginRoute = require("@/app/api/auth/login/route");
const verifyRoute = require("@/app/api/auth/verify/route");
const logoutRoute = require("@/app/api/auth/logout/route");

// Helper to seed owner
async function seedOwner(email, courseSlug = "men") {
  const customer = await mockPrisma.customer.create({
    data: {
      email,
      accessKey: "acc_" + crypto.randomBytes(16).toString("hex"),
    },
  });
  await mockPrisma.coursePurchase.create({
    data: {
      customerId: customer.id,
      courseSlug,
      amount: 3.0,
      currency: "USD",
      paymentId: "pay_" + crypto.randomBytes(8).toString("hex"),
    },
  });
  return customer;
}

test("Scenario 1: Non-owner login attempt returns generic response without creating token or leaking state", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();

  let capturedEmail = null;
  emailService.setTestEmailInterceptor((data) => {
    capturedEmail = data;
  });

  const req = new Request("https://theplugd.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "stranger@example.com" }),
  });

  const res = await loginRoute.POST(req);
  const json = await res.json();

  assert.strictEqual(res.status, 200);
  assert.strictEqual(json.success, true);
  assert.ok(json.message.includes("If an account with this email has access"));
  // No active token in DB
  assert.strictEqual(mockPrisma._otpTokens.size, 0);
  // No email dispatched
  assert.strictEqual(capturedEmail, null);
});

test("Scenario 2: Valid owner login generates cryptographically hashed token and dispatches magic link with /login/verify", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();
  await seedOwner("buyer@example.com");

  let dispatchedData = null;
  emailService.setTestEmailInterceptor((data) => {
    dispatchedData = data;
  });

  const req = new Request("https://theplugd.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "buyer@example.com" }),
  });

  const res = await loginRoute.POST(req);
  const json = await res.json();

  assert.strictEqual(res.status, 200);
  assert.strictEqual(json.success, true);

  // Email dispatched with confirmation link
  assert.ok(dispatchedData);
  assert.strictEqual(dispatchedData.email, "buyer@example.com");
  assert.strictEqual(dispatchedData.token.length, 64); // 256 bits hex
  assert.ok(dispatchedData.magicLink.includes(`/login/verify?token=${dispatchedData.token}`));

  // Token is stored HASHED in the database (raw token is never in DB)
  assert.strictEqual(mockPrisma._otpTokens.size, 1);
  const storedOtp = Array.from(mockPrisma._otpTokens.values())[0];
  assert.notStrictEqual(storedOtp.code, dispatchedData.token);
  const expectedHash = crypto.createHash("sha256").update(dispatchedData.token).digest("hex");
  assert.strictEqual(storedOtp.code, expectedHash);
  assert.strictEqual(storedOtp.used, false);
  assert.ok(storedOtp.expiresAt > new Date());
});

test("Scenario 3: Scanner GET request or prefetch does NOT consume token and does NOT issue cookie", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();
  await seedOwner("scanner-test@example.com");

  let captured = null;
  emailService.setTestEmailInterceptor((data) => {
    captured = data;
  });

  const loginReq = new Request("https://theplugd.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "scanner-test@example.com" }),
  });
  await loginRoute.POST(loginReq);

  // 1. Scanner GET request to /api/auth/verify?token=...
  const scannerReq = new Request(`https://theplugd.com/api/auth/verify?token=${captured.token}`, { method: "GET" });
  const scannerRes = await verifyRoute.GET(scannerReq);

  // Must redirect to confirmation page, NOT consume token, NOT issue cookie
  assert.strictEqual(scannerRes.status, 307);
  assert.ok(scannerRes.headers.get("location").includes(`/login/verify?token=${captured.token}`));
  assert.strictEqual(scannerRes.cookies.get("plugd_access_key"), undefined);

  // Token must STILL be unused in DB
  const storedOtp = Array.from(mockPrisma._otpTokens.values())[0];
  assert.strictEqual(storedOtp.used, false);

  // 2. Prefetch header request
  const prefetchReq = new Request(`https://theplugd.com/api/auth/verify?token=${captured.token}`, {
    method: "GET",
    headers: { "purpose": "prefetch" },
  });
  const prefetchRes = await verifyRoute.GET(prefetchReq);
  assert.strictEqual(prefetchRes.status, 204);
  assert.strictEqual(storedOtp.used, false);
});

test("Scenario 4: Explicit user confirmation via POST consumes token atomically and sets session cookie", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();
  const owner = await seedOwner("validcustomer@example.com");

  let captured = null;
  emailService.setTestEmailInterceptor((data) => {
    captured = data;
  });

  // Request login
  const loginReq = new Request("https://theplugd.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "validcustomer@example.com" }),
  });
  await loginRoute.POST(loginReq);

  // Explicit POST confirmation
  const verifyReq = new Request("https://theplugd.com/api/auth/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: captured.token }),
  });
  const verifyRes = await verifyRoute.POST(verifyReq);
  const verifyJson = await verifyRes.json();

  assert.strictEqual(verifyRes.status, 200);
  assert.strictEqual(verifyJson.success, true);
  assert.strictEqual(verifyJson.redirectUrl, "/learn/men");

  // Check access cookie
  const cookie = verifyRes.cookies.get("plugd_access_key");
  assert.ok(cookie);
  assert.strictEqual(cookie.value, owner.accessKey);
  assert.strictEqual(cookie.httpOnly, true);
  assert.strictEqual(cookie.sameSite.toLowerCase(), "lax");
  assert.strictEqual(cookie.path, "/");

  // Token must now be marked used
  const storedOtp = Array.from(mockPrisma._otpTokens.values())[0];
  assert.strictEqual(storedOtp.used, true);
});

test("Scenario 5: Form submission POST confirmation succeeds and redirects with 303", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();
  const owner = await seedOwner("formbuyer@example.com");

  let captured = null;
  emailService.setTestEmailInterceptor((data) => {
    captured = data;
  });

  const loginReq = new Request("https://theplugd.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "formbuyer@example.com" }),
  });
  await loginRoute.POST(loginReq);

  // Form POST submission
  const formData = new FormData();
  formData.append("token", captured.token);

  const formReq = new Request("https://theplugd.com/api/auth/verify", {
    method: "POST",
    body: formData,
  });
  const formRes = await verifyRoute.POST(formReq);

  assert.strictEqual(formRes.status, 303);
  assert.ok(formRes.headers.get("location").endsWith("/learn/men"));
  const cookie = formRes.cookies.get("plugd_access_key");
  assert.ok(cookie);
  assert.strictEqual(cookie.value, owner.accessKey);

  const storedOtp = Array.from(mockPrisma._otpTokens.values())[0];
  assert.strictEqual(storedOtp.used, true);
});

test("Scenario 6: Reusing a consumed token via POST is rejected", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();
  await seedOwner("reuser@example.com");

  let captured = null;
  emailService.setTestEmailInterceptor((data) => {
    captured = data;
  });

  const loginReq = new Request("https://theplugd.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "reuser@example.com" }),
  });
  await loginRoute.POST(loginReq);

  // First use succeeds
  const verifyReq1 = new Request("https://theplugd.com/api/auth/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: captured.token }),
  });
  const verifyRes1 = await verifyRoute.POST(verifyReq1);
  assert.strictEqual(verifyRes1.status, 200);
  assert.ok(verifyRes1.cookies.get("plugd_access_key"));

  // Second use fails
  const verifyReq2 = new Request("https://theplugd.com/api/auth/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: captured.token }),
  });
  const verifyRes2 = await verifyRoute.POST(verifyReq2);
  const verifyJson2 = await verifyRes2.json();
  assert.strictEqual(verifyRes2.status, 400);
  assert.strictEqual(verifyJson2.error, "expired_or_invalid");
  assert.strictEqual(verifyRes2.cookies.get("plugd_access_key"), undefined);
});

test("Scenario 7: Expired token on POST is rejected", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();
  await seedOwner("expired@example.com");

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

  // Insert token with past expiresAt
  await mockPrisma.otpToken.create({
    data: {
      email: "expired@example.com",
      code: hashedToken,
      expiresAt: new Date(Date.now() - 1000 * 60), // Expired 1 minute ago
      used: false,
    },
  });

  const verifyReq = new Request("https://theplugd.com/api/auth/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: rawToken }),
  });
  const verifyRes = await verifyRoute.POST(verifyReq);
  const json = await verifyRes.json();

  assert.strictEqual(verifyRes.status, 400);
  assert.strictEqual(json.error, "expired_or_invalid");
  assert.strictEqual(verifyRes.cookies.get("plugd_access_key"), undefined);
});

test("Scenario 8: Malformed or invalid token on POST is rejected", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();

  const verifyReq = new Request("https://theplugd.com/api/auth/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: "short_or_invalid_123" }),
  });
  const verifyRes = await verifyRoute.POST(verifyReq);
  const json = await verifyRes.json();

  assert.strictEqual(verifyRes.status, 400);
  assert.strictEqual(json.error, "invalid_token");
  assert.strictEqual(verifyRes.cookies.get("plugd_access_key"), undefined);
});

test("Scenario 9: Token verified for email that does not have course purchase is rejected with no_access", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();

  // Insert valid token for an email that has NO purchase in database
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

  await mockPrisma.otpToken.create({
    data: {
      email: "nopurchase@example.com",
      code: hashedToken,
      expiresAt: new Date(Date.now() + 1000 * 60 * 15),
      used: false,
    },
  });

  const verifyReq = new Request("https://theplugd.com/api/auth/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: rawToken }),
  });
  const verifyRes = await verifyRoute.POST(verifyReq);
  const json = await verifyRes.json();

  assert.strictEqual(verifyRes.status, 403);
  assert.strictEqual(json.error, "no_access");
  assert.strictEqual(verifyRes.cookies.get("plugd_access_key"), undefined);
});

test("Scenario 10: Concurrent POST attempts race safely and allow only one to succeed", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();
  await seedOwner("concurrent@example.com");

  let captured = null;
  emailService.setTestEmailInterceptor((data) => {
    captured = data;
  });

  const loginReq = new Request("https://theplugd.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "concurrent@example.com" }),
  });
  await loginRoute.POST(loginReq);

  // Execute two concurrent POST verification requests
  const [res1, res2] = await Promise.all([
    verifyRoute.POST(
      new Request("https://theplugd.com/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: captured.token }),
      })
    ),
    verifyRoute.POST(
      new Request("https://theplugd.com/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: captured.token }),
      })
    ),
  ]);

  const statuses = [res1.status, res2.status].sort();
  // Exactly one succeeded (200), and one was rejected (400)
  assert.strictEqual(statuses[0], 200);
  assert.strictEqual(statuses[1], 400);

  const storedOtp = Array.from(mockPrisma._otpTokens.values())[0];
  assert.strictEqual(storedOtp.used, true);
});

test("Scenario 11: Complimentary access recipient can log in and receives access cookie", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();

  // Create complimentary access
  await mockPrisma.complimentaryAccess.create({
    data: {
      email: "ravx003@gmail.com",
      courseSlug: "men",
      reason: "LIFETIME_FREE_ACCESS",
    },
  });

  const customer = await mockPrisma.customer.create({
    data: {
      email: "ravx003@gmail.com",
      accessKey: "acc_comp_12345",
    },
  });

  let captured = null;
  emailService.setTestEmailInterceptor((data) => {
    captured = data;
  });

  const loginReq = new Request("https://theplugd.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "ravx003@gmail.com" }),
  });
  await loginRoute.POST(loginReq);

  assert.ok(captured);
  const verifyReq = new Request("https://theplugd.com/api/auth/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: captured.token }),
  });
  const verifyRes = await verifyRoute.POST(verifyReq);

  assert.strictEqual(verifyRes.status, 200);
  const cookie = verifyRes.cookies.get("plugd_access_key");
  assert.ok(cookie);
  assert.strictEqual(cookie.value, customer.accessKey);
});

test("Scenario 12: Resend API provider failure returns HTTP 503 generic error without false success claim", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();
  await seedOwner("provider-failure@example.com");

  // Force sendLoginEmail to fail as if Resend returned an error
  const origSendLoginEmail = emailService.sendLoginEmail;
  emailService.sendLoginEmail = async () => {
    return { success: false, error: "Resend API connection error" };
  };

  try {
    const loginReq = new Request("https://theplugd.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "provider-failure@example.com" }),
    });
    const res = await loginRoute.POST(loginReq);
    const json = await res.json();

    assert.strictEqual(res.status, 503);
    assert.strictEqual(json.error, "Unable to send sign-in link at this time. Please try again in a few moments.");
    assert.strictEqual(json.success, undefined);
  } finally {
    emailService.sendLoginEmail = origSendLoginEmail;
  }
});

test("Scenario 13: Rate limiting triggers HTTP 429 when threshold is exceeded", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();
  await seedOwner("ratelimited@example.com");

  emailService.setTestEmailInterceptor(() => {});

  // Send 5 allowed requests
  for (let i = 0; i < 5; i++) {
    const req = new Request("https://theplugd.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "192.0.2.1" },
      body: JSON.stringify({ email: "ratelimited@example.com" }),
    });
    const res = await loginRoute.POST(req);
    assert.strictEqual(res.status, 200);
  }

  // 6th request triggers rate limit
  const spamReq = new Request("https://theplugd.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": "192.0.2.1" },
    body: JSON.stringify({ email: "ratelimited@example.com" }),
  });
  const spamRes = await loginRoute.POST(spamReq);
  const spamJson = await spamRes.json();

  assert.strictEqual(spamRes.status, 429);
  assert.ok(spamJson.error.includes("Too many login attempts"));
  assert.ok(spamRes.headers.get("retry-after"));
});

test("Scenario 14: Logout clears session cookie with maxAge 0", async () => {
  const req = new Request("https://theplugd.com/api/auth/logout", { method: "POST" });
  const res = await logoutRoute.POST(req);
  const json = await res.json();

  assert.strictEqual(res.status, 200);
  assert.strictEqual(json.success, true);

  const cookie = res.cookies.get("plugd_access_key");
  assert.ok(cookie);
  assert.strictEqual(cookie.maxAge, 0);
  assert.strictEqual(cookie.value, "");
});
