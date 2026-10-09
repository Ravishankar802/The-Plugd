/**
 * Client-side authentication utilities.
 * Securely logs out the user by clearing server cookies, client cookies, storage,
 * and hard-redirecting to the public homepage.
 */
export async function performLogout() {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[LOGOUT_ERROR]", err);
  }

  // Clear cookie in document.cookie
  document.cookie =
    "plugd_access_key=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; SameSite=Lax;";

  try {
    localStorage.clear();
    sessionStorage.clear();
  } catch {}

  // Hard reload to public homepage to guarantee all client states are reset
  window.location.href = "/";
}
