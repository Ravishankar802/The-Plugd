/**
 * Plugd Dedicated Isolated Test Server Launcher
 *
 * Enforces 100% Environment Isolation Before Starting Next.js:
 * 1. Purges any live credentials inherited from parent shell
 * 2. Loads configuration strictly from .env.test-mode.local
 * 3. Sets process.env.__NEXT_PROCESSED_ENV="true" to completely inhibit Next.js from reading .env.local
 * 4. Verifies all 5 preflight states (API key, webhook secret, product ID, local DB)
 * 5. If isolation or credentials cannot be verified, aborts startup immediately
 * 6. Boots Next.js within the locked environment
 */

const path = require("path");
const { loadTestEnv, assertLocalTestDatabase } = require("./test-env-loader.cjs");

function verifyTestEnvironment() {
  const report = loadTestEnv();

  if (report.errors.length > 0) {
    console.error("[FATAL_TEST_SERVER_ERROR] Security violations detected in test environment:");
    for (const err of report.errors) {
      console.error(`  - ${err}`);
    }
    process.exit(1);
  }

  if (!report.isReadyForCheckout) {
    console.error("[FATAL_TEST_SERVER_ERROR] Test environment is not fully configured:");
    for (const item of report.missing) {
      console.error(`  - Missing: ${item}`);
    }
    console.error("\nPlease configure .env.test-mode.local before starting the test server.");
    process.exit(1);
  }

  // Double check environment locks
  if (process.env.DODO_PAYMENTS_MODE !== "test_mode") {
    console.error("[FATAL_TEST_SERVER_ERROR] DODO_PAYMENTS_MODE is not 'test_mode'. Aborting.");
    process.exit(1);
  }

  if (process.env.__NEXT_PROCESSED_ENV !== "true") {
    console.error("[FATAL_TEST_SERVER_ERROR] __NEXT_PROCESSED_ENV lock failed. Aborting.");
    process.exit(1);
  }

  assertLocalTestDatabase(process.env.DATABASE_URL);

  return report;
}

// If invoked as a CLI command
if (require.main === module) {
  const isVerifyOnly = process.argv.includes("--verify-only") || process.argv.includes("-v");

  console.log("[TEST_SERVER_LAUNCHER] Verifying test environment isolation...");
  const report = verifyTestEnvironment();

  console.log("[TEST_SERVER_LAUNCHER] Environment isolation verified successfully.");
  console.log(`  Mode: ${process.env.DODO_PAYMENTS_MODE}`);
  console.log(`  Next.js Env Lock (__NEXT_PROCESSED_ENV): ${process.env.__NEXT_PROCESSED_ENV}`);
  console.log(`  Database URL Host: ${new URL(process.env.DATABASE_URL).hostname} (Localhost PostgreSQL)`);
  console.log(`  Test Product ID: ${process.env.DODO_TEST_PLAYBOOK_PRODUCT_ID}`);

  if (isVerifyOnly) {
    console.log("[TEST_SERVER_LAUNCHER] --verify-only flag specified. Exiting cleanly.");
    process.exit(0);
  }

  console.log("[TEST_SERVER_LAUNCHER] Booting Next.js development server in isolated test mode...");

  // Forward CLI arguments to Next CLI
  const nextArgs = process.argv.slice(2).filter((arg) => arg !== "--verify-only" && arg !== "-v");
  process.argv = [process.argv[0], path.join(process.cwd(), "node_modules/next/dist/bin/next"), "dev", ...nextArgs];

  // Run Next CLI within the isolated environment
  require(path.join(process.cwd(), "node_modules/next/dist/bin/next"));
}

module.exports = {
  verifyTestEnvironment,
};
