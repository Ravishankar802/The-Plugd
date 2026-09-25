import crypto from "crypto";

/**
 * Hash a plain text password securely using Scrypt + random 16-byte salt.
 * Format returned: <salt-hex>:<derived-key-hex>
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Verify a plain text password against a stored Scrypt hash.
 * Timing-safe comparison prevents timing attacks.
 */
export function verifyPassword(password: string, combinedHash: string | null | undefined): boolean {
  if (!password || !combinedHash) return false;
  try {
    const [salt, key] = combinedHash.split(":");
    if (!salt || !key) return false;
    const derivedKey = crypto.scryptSync(password, salt, 64);
    const keyBuffer = Buffer.from(key, "hex");
    if (keyBuffer.length !== derivedKey.length) return false;
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch (error) {
    return false;
  }
}
