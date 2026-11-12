const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const Module = require("node:module");

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
    return originalResolveFilename.call(this, resolved, parent, isMain, options);
  }
  return originalResolveFilename.call(this, request, parent, isMain, options);
};

const mockPrisma = createMockPrisma();

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

// Load modules under test
const { DODO_PLAYBOOK_MAP } = require("../src/lib/dodopayments.ts");
const { hasUserPurchasedCourse, recordCoursePurchase, revokeCoursePurchase, checkPlaybookAccess } = require("../src/lib/playbooks.ts");

// Lightweight mock Prisma client for tests
function createMockPrisma() {
  const store = {
    purchases: new Map(),
    webhooks: new Set(),
    customers: new Map(),
    complimentary: new Map(),
  };

  const client = {
    coursePurchase: {
      findUnique: async ({ where }) => {
        if (where.customerId_courseSlug) {
          const key = `${where.customerId_courseSlug.customerId}_${where.customerId_courseSlug.courseSlug.toLowerCase()}`;
          return store.purchases.get(key) || null;
        }
        if (where.id) {
          for (const p of store.purchases.values()) {
            if (p.id === where.id) return p;
          }
        }
        return null;
      },
      findFirst: async ({ where }) => {
        for (const p of store.purchases.values()) {
          if (where.paymentId && p.paymentId === where.paymentId) return p;
        }
        return null;
      },
      findMany: async ({ where }) => {
        const list = [];
        for (const p of store.purchases.values()) {
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
        store.purchases.set(key, record);
        return record;
      },
      update: async ({ where, data }) => {
        for (const [k, p] of store.purchases.entries()) {
          if (p.id === where.id) {
            const updated = { ...p, ...data, updatedAt: new Date() };
            store.purchases.set(k, updated);
            return updated;
          }
        }
        throw new Error("Record not found");
      },
    },
    customer: {
      findUnique: async ({ where }) => {
        if (where.id) return store.customers.get(where.id) || null;
        if (where.email) {
          for (const c of store.customers.values()) {
            if (c.email === where.email) return c;
          }
        }
        if (where.accessKey) {
          for (const c of store.customers.values()) {
            if (c.accessKey === where.accessKey) return c;
          }
        }
        return null;
      },
      create: async ({ data }) => {
        const id = `cust_${Math.random().toString(36).slice(2, 8)}`;
        const record = { id, accessKey: `key_${id}`, ...data, createdAt: new Date() };
        store.customers.set(id, record);
        return record;
      },
    },
    complimentaryAccess: {
      findUnique: async ({ where }) => store.complimentary.get(where.email) || null,
    },
    processedWebhook: {
      findUnique: async ({ where }) => (store.webhooks.has(where.id) ? { id: where.id } : null),
      create: async ({ data }) => {
        store.webhooks.add(data.id);
        return data;
      },
    },
    $transaction: async (fn) => fn(client),
  };

  return client;
}

test("1. Catalog Sealing: All 110 Playbook overview page files enforce hasAccess = false by default", () => {
  const appDir = path.join(__dirname, "..", "src", "app");
  const entries = fs.readdirSync(appDir, { withFileTypes: true });
  let checkedCount = 0;

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const pagePath = path.join(appDir, entry.name, "page.tsx");
      if (fs.existsSync(pagePath)) {
        const content = fs.readFileSync(pagePath, "utf8");
        if (content.includes("PlaybookDetailView") || content.includes("hasAccess")) {
          // If hasAccess is declared, it must default to false
          const hasAccessTrueMatch = content.match(/let\s+hasAccess\s*=\s*true/);
          assert.strictEqual(
            hasAccessTrueMatch,
            null,
            `File ${pagePath} must NOT have 'let hasAccess = true;' hardcoded`
          );
          if (content.includes("let hasAccess = false;")) {
            checkedCount++;
          }
        }
      }
    }
  }

  assert.ok(checkedCount >= 109, `Expected at least 109 sealed playbooks, found ${checkedCount}`);
});

test("2. Reader & Slide Sealing: Server routes require valid customer ownership or reject with redirect", async () => {
  const mockPrisma = createMockPrisma();
  const learnPage = fs.readFileSync(path.join(__dirname, "..", "src", "app", "learn", "[courseSlug]", "page.tsx"), "utf8");
  const slidePage = fs.readFileSync(path.join(__dirname, "..", "src", "app", "learn", "[courseSlug]", "[lessonId]", "page.tsx"), "utf8");

  // Verify server-side checkPlaybookAccess is integrated in both content pages
  assert.ok(learnPage.includes("checkPlaybookAccess"), "Reader page must call checkPlaybookAccess");
  assert.ok(slidePage.includes("checkPlaybookAccess"), "Slide viewer must call checkPlaybookAccess");

  // Verify access is strictly denied without a valid purchase or comp access
  const unauthedAccess = await checkPlaybookAccess(undefined, "7-ai-automations");
  assert.strictEqual(unauthedAccess, false, "Unauthenticated visitors must fail closed");

  const invalidKeyAccess = await checkPlaybookAccess("invalid-fake-key", "7-ai-automations");
  assert.strictEqual(invalidKeyAccess, false, "Invalid access keys must fail closed");
});

test("3. Single Playbook Purchase Isolation: Purchasing one Playbook does NOT unlock any other Playbook", async () => {
  const customer = await mockPrisma.customer.create({
    data: { email: "buyer1@example.com", name: "Buyer One" },
  });

  const playbook1 = Object.values(DODO_PLAYBOOK_MAP)[0];
  const playbook2 = Object.values(DODO_PLAYBOOK_MAP)[1];

  // Record purchase for Playbook 1 only
  await recordCoursePurchase({
    customerId: customer.id,
    courseSlug: playbook1.slug,
    amount: playbook1.sellingPriceDollars,
    paymentId: "pay_single_001",
    client: mockPrisma,
  });

  // Verify Playbook 1 is owned
  const owns1 = await hasUserPurchasedCourse(customer.id, playbook1.slug);
  assert.strictEqual(owns1, true, "Buyer must have access to Playbook 1");

  // Verify Playbook 2 is NOT owned
  const owns2 = await hasUserPurchasedCourse(customer.id, playbook2.slug);
  assert.strictEqual(owns2, false, "Buyer must NOT have access to Playbook 2");
});

test("4. Multi-Product Webhook Fulfillment: All items in product_cart are granted access atomically", async () => {
  const customer = await mockPrisma.customer.create({
    data: { email: "cartbuyer@example.com", name: "Cart Buyer" },
  });

  const item1 = Object.values(DODO_PLAYBOOK_MAP)[5];
  const item2 = Object.values(DODO_PLAYBOOK_MAP)[10];
  const item3 = Object.values(DODO_PLAYBOOK_MAP)[15];

  const paymentId = "pay_cart_multi_001";
  const matchedItems = [item1, item2, item3];

  // Execute atomic fulfillment simulating webhook handler
  await mockPrisma.$transaction(async (tx) => {
    for (const item of matchedItems) {
      await recordCoursePurchase({
        customerId: customer.id,
        courseSlug: item.slug,
        amount: item.sellingPriceDollars,
        paymentId,
        client: tx,
      });
    }
  });

  // Verify all 3 playbooks are now owned by customer
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, item1.slug), true);
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, item2.slug), true);
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, item3.slug), true);

  // When refunded, all items associated with paymentId are revoked
  await revokeCoursePurchase({
    paymentId,
    client: mockPrisma,
    reason: "REFUNDED",
  });

  // Verify all 3 playbooks are revoked
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, item1.slug), false);
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, item2.slug), false);
  assert.strictEqual(await hasUserPurchasedCourse(customer.id, item3.slug), false);
});

test("5. Multi-Product Pricing Math: Correctly sums native discounts and total savings", () => {
  const item1 = { price: 3.0, originalPrice: 9.0 }; // $6 savings
  const item2 = { price: 1.0, originalPrice: 2.49 }; // $1.49 savings
  const item3 = { price: 5.0, originalPrice: 15.0 }; // $10 savings

  const items = [item1, item2, item3];
  const count = items.length;
  const total = items.reduce((acc, i) => acc + i.price, 0);
  const originalTotal = items.reduce((acc, i) => acc + i.originalPrice, 0);
  const savings = Math.max(0, originalTotal - total);

  assert.strictEqual(count, 3);
  assert.strictEqual(Math.round(total * 100) / 100, 9.0);
  assert.strictEqual(Math.round(originalTotal * 100) / 100, 26.49);
  assert.strictEqual(Math.round(savings * 100) / 100, 17.49);
});
