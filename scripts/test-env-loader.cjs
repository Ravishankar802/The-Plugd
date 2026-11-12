/**
 * Plugd Isolated Test Environment Loader & Preflight Guard
 *
 * Guarantees that test runs, probes, and verification scripts:
 * 1. Strictly run in DODO_PAYMENTS_MODE=test_mode
 * 2. Set __NEXT_PROCESSED_ENV="true" so Next.js cannot read .env.local
 * 3. NEVER inherit or load live credentials from .env.local or parent shell
 * 4. NEVER connect to remote or Neon production databases (strictly local PostgreSQL)
 * 5. Accurately report 5 distinct environment states and only report READY FOR CHECKOUT
 *    when every single required test credential, product ID, and local DB URL is verified.
 */

const fs = require("fs");
const path = require("path");

function assertLocalTestDatabase(dbUrl) {
  const urlStr = (dbUrl || process.env.DATABASE_URL || "").trim();

  if (!urlStr) {
    throw new Error(
      "[FATAL_TEST_DB_GUARD] DATABASE_URL is not set. A strictly local PostgreSQL database URL is required for test execution."
    );
  }

  const lower = urlStr.toLowerCase();

  if (lower.includes("neon.tech") || lower.includes("neondb")) {
    throw new Error(
      `[FATAL_TEST_DB_GUARD] DATABASE_URL points to Neon production database. Test aborted immediately to protect production data.`
    );
  }

  const remoteKeywords = [
    "supabase.co",
    "amazonaws.com",
    "rds.amazonaws.com",
    "azure.com",
    "render.com",
    "railway.app",
    "cockroachlabs.cloud",
    "pooler.",
  ];

  for (const keyword of remoteKeywords) {
    if (lower.includes(keyword)) {
      throw new Error(
        `[FATAL_TEST_DB_GUARD] DATABASE_URL points to remote host (${keyword}). Tests must use a local database (localhost/127.0.0.1).`
      );
    }
  }

  let parsed;
  try {
    parsed = new URL(urlStr);
  } catch (err) {
    throw new Error(
      `[FATAL_TEST_DB_GUARD] Invalid DATABASE_URL format: ${err?.message || err}`
    );
  }

  const hostname = parsed.hostname.toLowerCase();
  if (hostname !== "localhost" && hostname !== "127.0.0.1" && hostname !== "0.0.0.0") {
    throw new Error(
      `[FATAL_TEST_DB_GUARD] Refusing to run in test mode with remote host "${hostname}". Host must be "localhost" or "127.0.0.1".`
    );
  }
}

function purgeLiveCredentials() {
  if (process.env.DODO_PAYMENTS_API_KEY && !process.env.DODO_PAYMENTS_API_KEY.startsWith("dodo_test_")) {
    delete process.env.DODO_PAYMENTS_API_KEY;
  }
  if (process.env.DODO_PAYMENTS_WEBHOOK_KEY && !process.env.DODO_PAYMENTS_WEBHOOK_KEY.startsWith("whsec_test_")) {
    delete process.env.DODO_PAYMENTS_WEBHOOK_KEY;
  }
  if (process.env.DATABASE_URL) {
    const lower = process.env.DATABASE_URL.toLowerCase();
    if (
      lower.includes("neon.tech") ||
      lower.includes("neondb") ||
      lower.includes("supabase.co") ||
      lower.includes("amazonaws.com") ||
      lower.includes("azure.com") ||
      lower.includes("render.com")
    ) {
      delete process.env.DATABASE_URL;
    }
  }
}

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, "utf-8");
  const env = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[key] = val;
    }
  }
  return env;
}

function loadTestEnv(options = {}) {
  // 1. Purge live credentials from process.env
  purgeLiveCredentials();

  // 2. Set explicit test mode & Next.js environment load lock
  process.env.DODO_PAYMENTS_MODE = "test_mode";
  process.env.__NEXT_PROCESSED_ENV = "true";

  // 3. Load configuration strictly from .env.test-mode.local
  const testEnvFile = options.envFile || path.join(process.cwd(), ".env.test-mode.local");
  if (fs.existsSync(testEnvFile)) {
    const testVars = parseEnvFile(testEnvFile);
    for (const [key, value] of Object.entries(testVars)) {
      process.env[key] = value;
    }
  }

  // 4. Force strict isolation post-load
  process.env.DODO_PAYMENTS_MODE = "test_mode";
  process.env.__NEXT_PROCESSED_ENV = "true";

  // Re-verify no live credentials leaked
  if (process.env.DODO_PAYMENTS_API_KEY && !process.env.DODO_PAYMENTS_API_KEY.startsWith("dodo_test_")) {
    delete process.env.DODO_PAYMENTS_API_KEY;
    throw new Error("[TEST_ENV_LOADER] Blocked unauthorized live API key in test environment.");
  }

  if (process.env.DODO_PAYMENTS_WEBHOOK_KEY && !process.env.DODO_PAYMENTS_WEBHOOK_KEY.startsWith("whsec_test_")) {
    delete process.env.DODO_PAYMENTS_WEBHOOK_KEY;
    throw new Error("[TEST_ENV_LOADER] Blocked unauthorized live webhook secret in test environment.");
  }

  if (process.env.DATABASE_URL) {
    assertLocalTestDatabase(process.env.DATABASE_URL);
  }

  return auditTestEnvironment();
}

function auditTestEnvironment() {
  const missing = [];
  const errors = [];

  // State 1: Loader Integrity
  const loaderIntegrity = true;

  // State 2: Test API credentials
  let testApiKeyValid = false;
  const apiKey = (process.env.DODO_PAYMENTS_API_KEY || "").trim();
  if (!apiKey) {
    missing.push("DODO_PAYMENTS_API_KEY (must start with dodo_test_)");
  } else if (!apiKey.startsWith("dodo_test_")) {
    errors.push(`DODO_PAYMENTS_API_KEY does not start with dodo_test_ (starts with ${apiKey.slice(0, 10)}...)`);
  } else if (apiKey.length < 15) {
    errors.push("DODO_PAYMENTS_API_KEY is too short or malformed");
  } else {
    testApiKeyValid = true;
  }

  // State 3: Test Webhook secret
  let testWebhookKeyValid = false;
  const webhookKey = (process.env.DODO_PAYMENTS_WEBHOOK_KEY || "").trim();
  if (!webhookKey) {
    missing.push("DODO_PAYMENTS_WEBHOOK_KEY (must start with whsec_test_)");
  } else if (!webhookKey.startsWith("whsec_test_")) {
    errors.push(`DODO_PAYMENTS_WEBHOOK_KEY does not start with whsec_test_ (starts with ${webhookKey.slice(0, 11)}...)`);
  } else if (webhookKey.length < 20) {
    errors.push("DODO_PAYMENTS_WEBHOOK_KEY is too short or malformed");
  } else {
    testWebhookKeyValid = true;
  }

  // State 4: Test Product ID
  let testProductIdValid = false;
  const productId = (process.env.DODO_TEST_PLAYBOOK_PRODUCT_ID || "").trim();
  if (!productId) {
    missing.push("DODO_TEST_PLAYBOOK_PRODUCT_ID (must start with pdt_)");
  } else if (!productId.startsWith("pdt_")) {
    errors.push("DODO_TEST_PLAYBOOK_PRODUCT_ID must start with pdt_");
  } else {
    testProductIdValid = true;
  }

  // State 5: Local test database
  let localDbValid = false;
  const dbUrl = (process.env.DATABASE_URL || "").trim();
  if (!dbUrl) {
    missing.push("DATABASE_URL (must point to local PostgreSQL, e.g. postgresql://localhost:5432/plugd_test)");
  } else {
    try {
      assertLocalTestDatabase(dbUrl);
      localDbValid = true;
    } catch (err) {
      errors.push(`DATABASE_URL rejected by test-db-guard: ${err.message}`);
    }
  }

  const isReadyForCheckout =
    loaderIntegrity &&
    testApiKeyValid &&
    testWebhookKeyValid &&
    testProductIdValid &&
    localDbValid &&
    errors.length === 0;

  let overallStatus = "UNCONFIGURED";
  if (errors.length > 0) {
    overallStatus = "BLOCKED";
  } else if (isReadyForCheckout) {
    overallStatus = "READY FOR CHECKOUT";
  }

  return {
    loaderIntegrity,
    testApiKeyValid,
    testWebhookKeyValid,
    testProductIdValid,
    localDbValid,
    isReadyForCheckout,
    overallStatus,
    missing,
    errors,
  };
}

// CLI check
if (require.main === module) {
  try {
    const report = loadTestEnv();
    console.log("========================================================================");
    console.log("PLUGD TEST-MODE ENVIRONMENT PREFLIGHT AUDIT");
    console.log("========================================================================");
    console.log(`  1. Loader Integrity:                      ${report.loaderIntegrity ? "PASSED" : "FAILED"}`);
    console.log(`  2. Test API Credentials (dodo_test_...):  ${report.testApiKeyValid ? "CONFIGURED & VALID" : "UNCONFIGURED"}`);
    console.log(`  3. Test Webhook Secret (whsec_test_...):  ${report.testWebhookKeyValid ? "CONFIGURED & VALID" : "UNCONFIGURED"}`);
    console.log(`  4. Test Product ID (pdt_...):             ${report.testProductIdValid ? "CONFIGURED & VALID" : "UNCONFIGURED"}`);
    console.log(`  5. Local PostgreSQL Database:             ${report.localDbValid ? "CONFIGURED & VALID" : "UNCONFIGURED"}`);
    console.log("------------------------------------------------------------------------");
    console.log(`OVERALL STATUS: ${report.overallStatus}`);
    console.log("========================================================================");

    if (report.missing.length > 0) {
      console.log("\nPending Configuration Requirements (fill in .env.test-mode.local):");
      for (const item of report.missing) {
        console.log(`  [ ] ${item}`);
      }
    }

    if (report.errors.length > 0) {
      console.log("\nBlocking Security Violations:");
      for (const err of report.errors) {
        console.log(`  [!] ${err}`);
      }
      process.exit(1);
    }

    if (!report.isReadyForCheckout) {
      console.log("\nNotice: System is safely unconfigured. Checkout sessions remain blocked until all 4 values are set.");
    }
  } catch (err) {
    console.error("[TEST_ENV_LOADER] Preflight safety check failed:", err.message);
    process.exit(1);
  }
}

module.exports = {
  loadTestEnv,
  auditTestEnvironment,
  assertLocalTestDatabase,
  purgeLiveCredentials,
};
