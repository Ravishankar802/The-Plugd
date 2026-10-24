/**
 * CUSTOMER LOGIN SECURITY TEST SUITE (6-Digit Numeric OTP)
 *
 * NOTE ON TEST ENVIRONMENT & CONCURRENCY MODELING:
 * These tests run using an in-memory Prisma mock (`InMemoryPrismaMock`) that models
 * PostgreSQL's READ COMMITTED transaction semantics, row-level locking (`FOR UPDATE`),
 * and atomic conditional update expressions (`{ increment: 1 }`).
 *
 * DISTINCTION FROM LIVE DATABASE:
 * - Mock-Level Tests: Validate application logic, input validation, cryptographic hashing,
 *   timing-safe checks, lifecycle state transitions, rate limits, and concurrent race
 *   resolution using granular entity-level locks rather than a global serialized mutex.
 * - Live PostgreSQL Verification: Real database constraints, write-ahead logs, and Neon
 *   connection pooling are verified during staging/production database testing.
 */

// Disable review phase free access during security regression suite to test paid access locks
process.env.NEXT_PUBLIC_REVIEW_PHASE_FREE_ACCESS = "false";

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

// In-Memory Database Mock with Per-Entity Row Locking (modeling PostgreSQL concurrency)
class InMemoryPrismaMock {
  constructor() {
    this.reset();
  }

  reset() {
    this._customers = new Map();
    this._coursePurchases = new Map();
    this._complimentaryAccess = new Map();
    this._otpTokens = new Map();
    this._rowLocks = new Map(); // key -> Promise resolver
  }

  // Simulates acquiring an exclusive row-level lock (e.g. FOR UPDATE)
  async _acquireLock(key) {
    while (this._rowLocks.has(key)) {
      await new Promise((r) => setTimeout(r, 2));
    }
    let release;
    const lockPromise = new Promise((resolve) => {
      release = resolve;
    });
    this._rowLocks.set(key, { promise: lockPromise, release });
    return () => {
      this._rowLocks.delete(key);
      release();
    };
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
        // Model real asynchronous database latency tick
        await new Promise((r) => setTimeout(r, 2));

        const email = data.email.toLowerCase();
        for (const c of this._customers.values()) {
          if (c.email.toLowerCase() === email) {
            const p2002 = new Error("Unique constraint failed on the fields: (`email`)");
            p2002.code = "P2002";
            p2002.meta = { target: ["email"] };
            throw p2002;
          }
          if (c.accessKey === data.accessKey) {
            const p2002 = new Error("Unique constraint failed on the fields: (`accessKey`)");
            p2002.code = "P2002";
            p2002.meta = { target: ["accessKey"] };
            throw p2002;
          }
        }

        const id = "cust_" + Math.random().toString(36).slice(2, 10);
        const record = { id, ...data, email };
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
      findFirst: async ({ where, orderBy }) => {
        let matches = [];
        for (const t of this._otpTokens.values()) {
          if (where.email && t.email.toLowerCase() !== where.email.toLowerCase()) continue;
          if (where.code && t.code !== where.code) continue;
          if (where.used !== undefined && t.used !== where.used) continue;
          if (where.expiresAt && where.expiresAt.gt && t.expiresAt <= where.expiresAt.gt) continue;
          if (where.createdAt && where.createdAt.gt && t.createdAt <= where.createdAt.gt) continue;
          matches.push({ ...t });
        }
        if (orderBy && orderBy.createdAt === "desc") {
          matches.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        }
        return matches.length > 0 ? matches[0] : null;
      },
      create: async ({ data }) => {
        const id = "otp_" + Math.random().toString(36).slice(2, 10);
        const record = {
          id,
          attempts: 0,
          createdAt: new Date(),
          ...data,
          email: data.email.toLowerCase(),
        };
        this._otpTokens.set(id, record);
        return { ...record };
      },
      update: async ({ where, data }) => {
        const existing = this._otpTokens.get(where.id);
        if (!existing) throw new Error("OtpToken not found");
        let newAttempts = existing.attempts;
        if (data.attempts !== undefined) {
          if (typeof data.attempts === "object" && data.attempts.increment) {
            newAttempts = existing.attempts + data.attempts.increment;
          } else {
            newAttempts = data.attempts;
          }
        }
        const updated = { ...existing, ...data, attempts: newAttempts };
        this._otpTokens.set(where.id, updated);
        return { ...updated };
      },
      updateMany: async ({ where, data }) => {
        let count = 0;
        for (const [id, t] of this._otpTokens.entries()) {
          if (where.id && t.id !== where.id) continue;
          if (where.email && t.email.toLowerCase() !== where.email.toLowerCase()) continue;
          if (where.used !== undefined && t.used !== where.used) continue;
          if (where.attempts && where.attempts.lt !== undefined && t.attempts >= where.attempts.lt) continue;

          let newAttempts = t.attempts;
          if (data.attempts !== undefined) {
            if (typeof data.attempts === "object" && data.attempts.increment) {
              newAttempts = t.attempts + data.attempts.increment;
            } else {
              newAttempts = data.attempts;
            }
          }

          this._otpTokens.set(id, { ...t, ...data, attempts: newAttempts });
          count++;
        }
        return { count };
      },
    };
  }

  async $queryRaw(strings, ...values) {
    const query = strings.join("?");
    // Simulate Customer row-level lock
    if (query.includes('FROM "Customer"') && query.includes("FOR UPDATE")) {
      const email = values[0];
      const unlock = await this._acquireLock(`customer:${email.toLowerCase()}`);
      if (this._currentTxLocks) this._currentTxLocks.push(unlock);
      const cust = await this.customer.findUnique({ where: { email } });
      return cust ? [{ id: cust.id }] : [];
    }
    // Simulate OtpToken row-level lock
    if (query.includes('FROM "OtpToken"') && query.includes("FOR UPDATE")) {
      const email = values[0];
      const unlock = await this._acquireLock(`otp:${email.toLowerCase()}`);
      if (this._currentTxLocks) this._currentTxLocks.push(unlock);
      const row = await this.otpToken.findFirst({
        where: { email, used: false, expiresAt: { gt: new Date() } },
        orderBy: { createdAt: "desc" },
      });
      return row ? [row] : [];
    }
    return [];
  }

  // Transactions run CONCURRENTLY; locks are held per entity row, not globally
  async $transaction(fn) {
    const txLocks = [];
    const txClient = Object.create(this);
    txClient._currentTxLocks = txLocks;

    try {
      // Simulate real I/O tick so concurrent requests interleave realistically
      await new Promise((r) => setTimeout(r, 2));
      return await fn(txClient);
    } finally {
      // Release all row locks acquired during this transaction
      for (const unlock of txLocks) {
        unlock();
      }
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

// Mock next/headers and next/navigation for server component & metadata tests
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

let mockRedirectUrl = null;
require.cache[require.resolve("next/navigation")] = {
  id: require.resolve("next/navigation"),
  filename: require.resolve("next/navigation"),
  loaded: true,
  exports: {
    redirect: (url) => {
      mockRedirectUrl = url;
      throw new Error(`NEXT_REDIRECT:${url}`);
    },
    notFound: () => {
      throw new Error("NEXT_NOT_FOUND");
    },
  },
};

const lessonPageModule = require("@/app/learn/[courseSlug]/[lessonId]/page.tsx");
const { generateMetadata, default: LessonPresentationPage } = lessonPageModule;

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

test("Scenario 1: Non-owner login attempt returns generic response without creating OTP or leaking state", async () => {
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

test("Scenario 2: Valid owner login generates 6-digit numeric code, stores salted hash, and dispatches email", async () => {
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

  // Email dispatched with 6-digit numeric code
  assert.ok(dispatchedData);
  assert.strictEqual(dispatchedData.email, "buyer@example.com");
  assert.strictEqual(typeof dispatchedData.code, "string");
  assert.strictEqual(dispatchedData.code.length, 6);
  assert.ok(/^\d{6}$/.test(dispatchedData.code));

  // Token is stored SALTED and HASHED in the database (raw numeric code is never in DB)
  assert.strictEqual(mockPrisma._otpTokens.size, 1);
  const storedOtp = Array.from(mockPrisma._otpTokens.values())[0];
  assert.notStrictEqual(storedOtp.code, dispatchedData.code);

  const parts = storedOtp.code.split(":");
  assert.strictEqual(parts.length, 2);
  const [salt, hash] = parts;
  const expectedHash = crypto.createHash("sha256").update(salt + dispatchedData.code).digest("hex");
  assert.strictEqual(hash, expectedHash);

  assert.strictEqual(storedOtp.attempts, 0);
  assert.strictEqual(storedOtp.used, false);
  assert.ok(storedOtp.expiresAt > new Date());
});

test("Scenario 3: Resend cooldown (60s) rejects duplicate code requests with HTTP 429", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();
  await seedOwner("cooldown@example.com");

  emailService.setTestEmailInterceptor(() => {});

  // First request succeeds
  const req1 = new Request("https://theplugd.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "cooldown@example.com" }),
  });
  const res1 = await loginRoute.POST(req1);
  assert.strictEqual(res1.status, 200);

  // Immediate second request triggers cooldown
  const req2 = new Request("https://theplugd.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "cooldown@example.com" }),
  });
  const res2 = await loginRoute.POST(req2);
  const json2 = await res2.json();

  assert.strictEqual(res2.status, 429);
  assert.ok(json2.error.includes("Please wait"));
  assert.ok(res2.headers.get("retry-after"));
});

test("Scenario 4: Valid code verification restores session and redirects to course", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();
  const owner = await seedOwner("verified@example.com");

  let dispatched = null;
  emailService.setTestEmailInterceptor((data) => {
    dispatched = data;
  });

  // Request code
  const loginReq = new Request("https://theplugd.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "verified@example.com" }),
  });
  await loginRoute.POST(loginReq);

  // Verify code
  const verifyReq = new Request("https://theplugd.com/api/auth/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "verified@example.com", code: dispatched.code }),
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

test("Scenario 5: Incorrect code increments attempts counter and returns remaining attempts", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();
  await seedOwner("wrongcode@example.com");

  let dispatched = null;
  emailService.setTestEmailInterceptor((data) => {
    dispatched = data;
  });

  const loginReq = new Request("https://theplugd.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "wrongcode@example.com" }),
  });
  await loginRoute.POST(loginReq);

  // Wrong code
  const wrongReq = new Request("https://theplugd.com/api/auth/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "wrongcode@example.com", code: "000000" }),
  });
  const wrongRes = await verifyRoute.POST(wrongReq);
  const wrongJson = await wrongRes.json();

  assert.strictEqual(wrongRes.status, 400);
  assert.ok(wrongJson.error.includes("4 attempts remaining"));
  assert.strictEqual(wrongRes.cookies.get("plugd_access_key"), undefined);

  // Stored token is NOT used, but attempts incremented to 1
  const storedOtp = Array.from(mockPrisma._otpTokens.values())[0];
  assert.strictEqual(storedOtp.attempts, 1);
  assert.strictEqual(storedOtp.used, false);
});

test("Scenario 6: Max 5 failed attempts deactivates the code permanently", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();
  await seedOwner("bruteforce@example.com");

  let dispatched = null;
  emailService.setTestEmailInterceptor((data) => {
    dispatched = data;
  });

  const loginReq = new Request("https://theplugd.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "bruteforce@example.com" }),
  });
  await loginRoute.POST(loginReq);

  // Submit 4 incorrect attempts
  for (let i = 1; i <= 4; i++) {
    const res = await verifyRoute.POST(
      new Request("https://theplugd.com/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "bruteforce@example.com", code: "00000" + i }),
      })
    );
    assert.strictEqual(res.status, 400);
  }

  // 5th attempt locks the code
  const res5 = await verifyRoute.POST(
    new Request("https://theplugd.com/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "bruteforce@example.com", code: "000005" }),
    })
  );
  const json5 = await res5.json();
  assert.strictEqual(res5.status, 400);
  assert.ok(json5.error.includes("Maximum attempts reached"));

  const storedOtp = Array.from(mockPrisma._otpTokens.values())[0];
  assert.strictEqual(storedOtp.attempts, 5);
  assert.strictEqual(storedOtp.used, true);

  // 6th attempt (even with CORRECT code) is rejected because code was deactivated
  const res6 = await verifyRoute.POST(
    new Request("https://theplugd.com/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "bruteforce@example.com", code: dispatched.code }),
    })
  );
  assert.strictEqual(res6.status, 400);
  assert.strictEqual(res6.cookies.get("plugd_access_key"), undefined);
});

test("Scenario 7: Reusing an already consumed code is rejected", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();
  await seedOwner("reuser@example.com");

  let dispatched = null;
  emailService.setTestEmailInterceptor((data) => {
    dispatched = data;
  });

  await loginRoute.POST(
    new Request("https://theplugd.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "reuser@example.com" }),
    })
  );

  // 1st verify succeeds
  const res1 = await verifyRoute.POST(
    new Request("https://theplugd.com/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "reuser@example.com", code: dispatched.code }),
    })
  );
  assert.strictEqual(res1.status, 200);

  // 2nd verify fails
  const res2 = await verifyRoute.POST(
    new Request("https://theplugd.com/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "reuser@example.com", code: dispatched.code }),
    })
  );
  assert.strictEqual(res2.status, 400);
  assert.strictEqual(res2.cookies.get("plugd_access_key"), undefined);
});

test("Scenario 8: Expired code (>10 minutes) is rejected", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();
  await seedOwner("expired@example.com");

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.createHash("sha256").update(salt + "123456").digest("hex");

  // Create expired OTP
  await mockPrisma.otpToken.create({
    data: {
      email: "expired@example.com",
      code: `${salt}:${hash}`,
      attempts: 0,
      expiresAt: new Date(Date.now() - 1000 * 60), // Expired 1 min ago
      used: false,
    },
  });

  const res = await verifyRoute.POST(
    new Request("https://theplugd.com/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "expired@example.com", code: "123456" }),
    })
  );
  const json = await res.json();

  assert.strictEqual(res.status, 400);
  assert.ok(json.error.includes("Invalid or expired"));
  assert.strictEqual(res.cookies.get("plugd_access_key"), undefined);
});

test("Scenario 9: Malformed or non-numeric code is rejected with 400", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();

  const testCodes = ["12345", "1234567", "abcdef", "123a56", ""];
  for (const c of testCodes) {
    const res = await verifyRoute.POST(
      new Request("https://theplugd.com/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@example.com", code: c }),
      })
    );
    assert.strictEqual(res.status, 400);
    const json = await res.json();
    assert.ok(json.error.includes("valid 6-digit"));
  }
});

test("Scenario 10: Valid code for email without course entitlement is rejected with 403", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.createHash("sha256").update(salt + "654321").digest("hex");

  // Insert valid code for an email that has NO purchase in database
  await mockPrisma.otpToken.create({
    data: {
      email: "nopurchase@example.com",
      code: `${salt}:${hash}`,
      attempts: 0,
      expiresAt: new Date(Date.now() + 1000 * 60 * 10),
      used: false,
    },
  });

  const res = await verifyRoute.POST(
    new Request("https://theplugd.com/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "nopurchase@example.com", code: "654321" }),
    })
  );
  const json = await res.json();

  assert.strictEqual(res.status, 403);
  assert.ok(json.error.includes("No purchase"));
  assert.strictEqual(res.cookies.get("plugd_access_key"), undefined);
});

test("Scenario 11: Concurrency - Simultaneous incorrect attempts do not lose increments and properly track attempts", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();
  await seedOwner("simul-wrong@example.com");

  let dispatched = null;
  emailService.setTestEmailInterceptor((data) => {
    dispatched = data;
  });

  await loginRoute.POST(
    new Request("https://theplugd.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "simul-wrong@example.com" }),
    })
  );

  // Send 3 simultaneous incorrect verification attempts without global serialization
  const results = await Promise.all([
    verifyRoute.POST(
      new Request("https://theplugd.com/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "simul-wrong@example.com", code: "000001" }),
      })
    ),
    verifyRoute.POST(
      new Request("https://theplugd.com/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "simul-wrong@example.com", code: "000002" }),
      })
    ),
    verifyRoute.POST(
      new Request("https://theplugd.com/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "simul-wrong@example.com", code: "000003" }),
      })
    ),
  ]);

  // All 3 rejected with 400
  for (const res of results) {
    assert.strictEqual(res.status, 400);
  }

  // Durable attempt count must be 3 (zero lost increments)
  const storedOtp = Array.from(mockPrisma._otpTokens.values())[0];
  assert.strictEqual(storedOtp.attempts, 3);
  assert.strictEqual(storedOtp.used, false);
});

test("Scenario 12: Concurrency - Simultaneous correct attempts allow exactly ONE to succeed and consume code", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();
  await seedOwner("simul-correct@example.com");

  let dispatched = null;
  emailService.setTestEmailInterceptor((data) => {
    dispatched = data;
  });

  await loginRoute.POST(
    new Request("https://theplugd.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "simul-correct@example.com" }),
    })
  );

  // Execute two concurrent verification requests with the correct code
  const [res1, res2] = await Promise.all([
    verifyRoute.POST(
      new Request("https://theplugd.com/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "simul-correct@example.com", code: dispatched.code }),
      })
    ),
    verifyRoute.POST(
      new Request("https://theplugd.com/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "simul-correct@example.com", code: dispatched.code }),
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

test("Scenario 13: Concurrency - Simultaneous resend requests serialize and leave exactly ONE active OTP", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();
  await seedOwner("simul-resend@example.com");

  emailService.setTestEmailInterceptor(() => {});

  // Send two simultaneous code generation requests
  const [res1, res2] = await Promise.all([
    loginRoute.POST(
      new Request("https://theplugd.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "simul-resend@example.com" }),
      })
    ),
    loginRoute.POST(
      new Request("https://theplugd.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "simul-resend@example.com" }),
      })
    ),
  ]);

  const statuses = [res1.status, res2.status].sort();
  // One succeeds (200) and the other is throttled by durable cooldown (429)
  assert.strictEqual(statuses[0], 200);
  assert.strictEqual(statuses[1], 429);

  // Exactly ONE active unused OTP exists in database
  const activeTokens = Array.from(mockPrisma._otpTokens.values()).filter(
    (t) => t.email === "simul-resend@example.com" && !t.used
  );
  assert.strictEqual(activeTokens.length, 1);
});

test("Scenario 14: Complimentary access recipient (ravx003@gmail.com) logs in with 6-digit code", async () => {
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

  let dispatched = null;
  emailService.setTestEmailInterceptor((data) => {
    dispatched = data;
  });

  await loginRoute.POST(
    new Request("https://theplugd.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "ravx003@gmail.com" }),
    })
  );

  assert.ok(dispatched);
  const verifyRes = await verifyRoute.POST(
    new Request("https://theplugd.com/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "ravx003@gmail.com", code: dispatched.code }),
    })
  );

  assert.strictEqual(verifyRes.status, 200);
  const cookie = verifyRes.cookies.get("plugd_access_key");
  assert.ok(cookie);
  assert.strictEqual(cookie.value, customer.accessKey);
});

test("Scenario 15: Resend API provider failure returns HTTP 503 generic error without false success claim", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();
  await seedOwner("provider-failure@example.com");

  const origSendLoginEmail = emailService.sendLoginEmail;
  emailService.sendLoginEmail = async () => {
    return { success: false, error: "Resend API connection error" };
  };

  try {
    const res = await loginRoute.POST(
      new Request("https://theplugd.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "provider-failure@example.com" }),
      })
    );
    const json = await res.json();

    assert.strictEqual(res.status, 503);
    assert.strictEqual(json.error, "Unable to send verification code at this time. Please try again in a few moments.");
  } finally {
    emailService.sendLoginEmail = origSendLoginEmail;
  }
});

test("Scenario 16: Rate limiting triggers HTTP 429 when IP or email threshold is exceeded", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();
  await seedOwner("ratelimited@example.com");

  emailService.setTestEmailInterceptor(() => {});

  // Send 5 allowed requests
  for (let i = 0; i < 5; i++) {
    mockPrisma._otpTokens.clear();
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

test("Scenario 17: Logout clears session cookie with maxAge 0", async () => {
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

test("Scenario 18: First-time login race - Simultaneous requests for new complimentary email create at most ONE Customer and ONE active OTP without unhandled P2002", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();

  // Create complimentary access entitlement, but NO Customer record
  await mockPrisma.complimentaryAccess.create({
    data: {
      email: "ravx003@gmail.com",
      courseSlug: "men",
      reason: "LIFETIME_FREE_ACCESS",
    },
  });

  // Verify that NO customer record exists beforehand
  const initialCustomer = await mockPrisma.customer.findUnique({
    where: { email: "ravx003@gmail.com" },
  });
  assert.strictEqual(initialCustomer, null);

  const dispatchedEmails = [];
  emailService.setTestEmailInterceptor((data) => {
    dispatchedEmails.push(data);
  });

  // Fire two simultaneous first-time login requests for the uncreated Customer
  const [res1, res2] = await Promise.all([
    loginRoute.POST(
      new Request("https://theplugd.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "ravx003@gmail.com" }),
      })
    ),
    loginRoute.POST(
      new Request("https://theplugd.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "ravx003@gmail.com" }),
      })
    ),
  ]);

  const statuses = [res1.status, res2.status].sort();
  // One request succeeds with 200, the other is gracefully throttled with 429
  // Neither request returns 500 or an unhandled P2002 error
  assert.strictEqual(statuses[0], 200);
  assert.strictEqual(statuses[1], 429);

  // Exactly ONE Customer record must exist in the database
  const customers = Array.from(mockPrisma._customers.values()).filter(
    (c) => c.email === "ravx003@gmail.com"
  );
  assert.strictEqual(customers.length, 1);
  const establishedCustomer = customers[0];
  assert.ok(establishedCustomer.accessKey);

  // Exactly ONE active (unused) OTP must exist
  const activeTokens = Array.from(mockPrisma._otpTokens.values()).filter(
    (t) => t.email === "ravx003@gmail.com" && !t.used
  );
  assert.strictEqual(activeTokens.length, 1);

  // Exactly ONE email must have been sent
  assert.strictEqual(dispatchedEmails.length, 1);
  assert.strictEqual(dispatchedEmails[0].email, "ravx003@gmail.com");

  // Verify that the code dispatched can authenticate and restore session
  const verifyRes = await verifyRoute.POST(
    new Request("https://theplugd.com/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "ravx003@gmail.com",
        code: dispatchedEmails[0].code,
      }),
    })
  );

  assert.strictEqual(verifyRes.status, 200);
  const verifyJson = await verifyRes.json();
  assert.strictEqual(verifyJson.success, true);
  const cookie = verifyRes.cookies.get("plugd_access_key");
  assert.ok(cookie);
  assert.strictEqual(cookie.value, establishedCustomer.accessKey);
});

test("Scenario 19: Lesson metadata access control - Unauthenticated visitor receives generic fallback metadata without private lesson title or summary, while entitled customer receives full metadata", async () => {
  mockPrisma.reset();
  resetLoginRateLimit();
  mockBrowserCookies.clear();
  mockRedirectUrl = null;

  const params = Promise.resolve({ courseSlug: "men", lessonId: "01-1" });

  // 1. Unauthenticated visitor (no cookie)
  const unauthMeta = await generateMetadata({ params });
  assert.strictEqual(unauthMeta.title, "The Dating Playbook — Lesson");
  assert.strictEqual(unauthMeta.description, "Sign in to access your copy of The Dating Playbook.");
  assert.strictEqual(unauthMeta.openGraph?.title, "The Dating Playbook — Lesson");
  assert.strictEqual(unauthMeta.openGraph?.description, "Sign in to access your copy of The Dating Playbook.");
  assert.strictEqual(unauthMeta.twitter?.title, "The Dating Playbook — Lesson");
  assert.strictEqual(unauthMeta.twitter?.description, "Sign in to access your copy of The Dating Playbook.");

  // Confirm private lesson title and summary are NOT exposed in any field
  assert.strictEqual(unauthMeta.title.includes("Anatomy of Romantic Attraction"), false);
  assert.strictEqual(unauthMeta.description.includes("neurobiological"), false);

  // Unauthenticated page render must redirect
  let unauthRedirected = false;
  try {
    await LessonPresentationPage({ params });
  } catch (err) {
    if (err.message.startsWith("NEXT_REDIRECT")) {
      unauthRedirected = true;
    }
  }
  assert.strictEqual(unauthRedirected, true);
  assert.strictEqual(mockRedirectUrl, "/?checkout=true&lesson=01-1");

  // 2. Forged / invalid access key
  mockBrowserCookies.set("plugd_access_key", "forged_nonexistent_key_9999");
  const forgedMeta = await generateMetadata({ params });
  assert.strictEqual(forgedMeta.title, "The Dating Playbook — Lesson");
  assert.strictEqual(forgedMeta.description, "Sign in to access your copy of The Dating Playbook.");

  // 3. Customer exists in database, but does NOT own course
  const nonOwner = await mockPrisma.customer.create({
    data: {
      email: "noaccess@example.com",
      accessKey: "acc_noaccess_12345",
    },
  });
  mockBrowserCookies.set("plugd_access_key", nonOwner.accessKey);
  const nonOwnerMeta = await generateMetadata({ params });
  assert.strictEqual(nonOwnerMeta.title, "The Dating Playbook — Lesson");
  assert.strictEqual(nonOwnerMeta.description, "Sign in to access your copy of The Dating Playbook.");

  // 4. Authorized owner (purchased course)
  const owner = await seedOwner("owner_meta@example.com");
  mockBrowserCookies.set("plugd_access_key", owner.accessKey);
  const ownerMeta = await generateMetadata({ params });

  assert.ok(ownerMeta.title.includes("1.1 The Anatomy of Romantic Attraction"));
  assert.ok(ownerMeta.title.includes("The Dating Playbook"));
  assert.ok(ownerMeta.description.includes("neurobiological and psychological mechanisms"));
  assert.ok(ownerMeta.openGraph?.title.includes("1.1 The Anatomy of Romantic Attraction"));
  assert.ok(ownerMeta.twitter?.title.includes("1.1 The Anatomy of Romantic Attraction"));

  // 5. Complimentary access recipient
  mockPrisma.reset();
  await mockPrisma.complimentaryAccess.create({
    data: {
      email: "ravx003@gmail.com",
      courseSlug: "men",
      reason: "LIFETIME_FREE_ACCESS",
    },
  });
  const compCust = await mockPrisma.customer.create({
    data: {
      email: "ravx003@gmail.com",
      accessKey: "acc_comp_meta_9876",
    },
  });
  mockBrowserCookies.set("plugd_access_key", compCust.accessKey);
  const compMeta = await generateMetadata({ params });
  assert.ok(compMeta.title.includes("1.1 The Anatomy of Romantic Attraction"));
  assert.ok(compMeta.description.includes("neurobiological and psychological mechanisms"));

  // Cleanup
  mockBrowserCookies.clear();
});
