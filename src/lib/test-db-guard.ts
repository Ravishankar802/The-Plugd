/**
 * Test Database Safety Guard
 *
 * Enforces strict isolation to ensure test suites, automated probes,
 * or test-mode runners NEVER connect to production databases (e.g. Neon, AWS RDS, Supabase).
 *
 * In test mode, only strictly local PostgreSQL instances (localhost or 127.0.0.1) are permitted.
 */

export function isLocalDatabase(dbUrl?: string): boolean {
  const urlStr = (dbUrl || process.env.DATABASE_URL || "").trim();
  if (!urlStr) return false;

  // Remote domain keywords that immediately invalidate local status
  const remoteKeywords = [
    "neon.tech",
    "neondb",
    "supabase.co",
    "amazonaws.com",
    "rds.amazonaws.com",
    "azure.com",
    "render.com",
    "railway.app",
    "cockroachlabs.cloud",
    "pooler.",
  ];

  const lower = urlStr.toLowerCase();
  for (const keyword of remoteKeywords) {
    if (lower.includes(keyword)) {
      return false;
    }
  }

  try {
    const parsed = new URL(urlStr);
    const hostname = parsed.hostname.toLowerCase();
    return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0";
  } catch {
    return false;
  }
}

export function assertLocalTestDatabase(dbUrl?: string): void {
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

  let parsed: URL;
  try {
    parsed = new URL(urlStr);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(
      `[FATAL_TEST_DB_GUARD] Invalid DATABASE_URL format: ${msg}`
    );
  }

  const hostname = parsed.hostname.toLowerCase();
  if (hostname !== "localhost" && hostname !== "127.0.0.1" && hostname !== "0.0.0.0") {
    throw new Error(
      `[FATAL_TEST_DB_GUARD] Refusing to run in test mode with remote host "${hostname}". Host must be "localhost" or "127.0.0.1".`
    );
  }
}
