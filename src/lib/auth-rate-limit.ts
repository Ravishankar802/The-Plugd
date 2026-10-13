/**
 * In-memory sliding-window rate limiter.
 *
 * ARCHITECTURAL NOTE / LIMITATION:
 * This rate limiter stores request counters in memory within the current Node.js process.
 * On serverless platforms like Vercel, function instances are ephemeral and memory is
 * scoped per warm execution container. While this provides effective, zero-dependency
 * protection against high-frequency bursts and local brute-force attempts without requiring
 * external infrastructure (e.g. Redis / Upstash), limits are enforced per instance rather
 * than across a globally synchronized distributed store.
 */
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

let lastCleanup = Date.now();
function cleanup() {
  const now = Date.now();
  if (now - lastCleanup > 10 * 60 * 1000) {
    lastCleanup = now;
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetAt <= now) {
        rateLimitStore.delete(key);
      }
    }
  }
}

/**
 * Checks whether a given key has exceeded the rate limit.
 * Defaults to 5 requests per 15-minute window.
 */
export function checkLoginRateLimit(
  key: string,
  limit = 5,
  windowMs = 15 * 60 * 1000
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  cleanup();
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  if (entry.count >= limit) {
    const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  entry.count += 1;
  return { allowed: true, remaining: limit - entry.count, retryAfterSeconds: 0 };
}

/**
 * Resets the rate limit store (useful in tests).
 */
export function resetLoginRateLimit(key?: string) {
  if (key) {
    rateLimitStore.delete(key);
  } else {
    rateLimitStore.clear();
  }
}
