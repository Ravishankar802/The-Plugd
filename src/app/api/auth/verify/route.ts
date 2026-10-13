import { NextResponse } from "next/server";
import { createHash } from "crypto";
import prisma from "@/lib/prisma";
import { getOrCreateCustomer, hasUserAccessToCourse } from "@/lib/playbooks";

export const dynamic = "force-dynamic";

/**
 * Scanner-safe GET handler:
 * Email security scanners and link prefetchers issue GET requests.
 * GET NEVER consumes the token and NEVER establishes a session cookie.
 * It redirects to the explicit human confirmation page at /login/verify.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token")?.trim() || "";
  const origin =
    url.origin ||
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.NODE_ENV === "production" ? "https://theplugd.com" : "http://localhost:3000");

  const purpose = (req.headers.get("purpose") || req.headers.get("sec-purpose") || "").toLowerCase();
  if (purpose.includes("prefetch")) {
    return new Response(null, { status: 204 });
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", origin));
  }

  // Redirect to confirmation page without consuming token
  const verifyPageUrl = new URL("/login/verify", origin);
  verifyPageUrl.searchParams.set("token", token);
  return NextResponse.redirect(verifyPageUrl, 307);
}

/**
 * POST handler:
 * Requires explicit user confirmation to consume the token.
 * Atomically consumes token, validates purchase entitlement,
 * and sets the session cookie.
 */
export async function POST(req: Request) {
  const url = new URL(req.url);
  const origin =
    url.origin ||
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.NODE_ENV === "production" ? "https://theplugd.com" : "http://localhost:3000");

  const contentType = (req.headers.get("content-type") || "").toLowerCase();
  const isJson = contentType.includes("application/json");

  let token = "";
  if (isJson) {
    const body = await req.json().catch(() => ({}));
    token = typeof body?.token === "string" ? body.token.trim() : "";
  } else {
    const formData = await req.formData().catch(() => null);
    if (formData) {
      const formToken = formData.get("token");
      token = typeof formToken === "string" ? formToken.trim() : "";
    }
  }

  if (!token) {
    const queryToken = url.searchParams.get("token")?.trim();
    if (queryToken) token = queryToken;
  }

  const respondError = (errorCode: string, status = 400) => {
    if (isJson) {
      return NextResponse.json({ error: errorCode }, { status });
    }
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(errorCode)}`, origin), 303);
  };

  // Validate token format (must be 64-character hex string)
  if (!token || !/^[0-9a-f]{64}$/i.test(token)) {
    return respondError("invalid_token", 400);
  }

  try {
    const hashedToken = createHash("sha256").update(token).digest("hex");

    // Atomically find and mark token as used
    const otpRecord = await prisma.$transaction(async (tx) => {
      const record = await tx.otpToken.findFirst({
        where: {
          code: hashedToken,
          used: false,
          expiresAt: { gt: new Date() },
        },
      });

      if (!record) {
        return null;
      }

      await tx.otpToken.update({
        where: { id: record.id },
        data: { used: true },
      });

      return record;
    });

    if (!otpRecord) {
      console.warn("[AUTH_VERIFY_REJECTED] Token is invalid, expired, or already used");
      return respondError("expired_or_invalid", 400);
    }

    const cleanEmail = otpRecord.email.trim().toLowerCase();

    // Confirm that the verified email identity has a legitimate fulfilled purchase or entitlement
    let customer = await prisma.customer.findUnique({
      where: { email: cleanEmail },
    });

    const hasAccess = await hasUserAccessToCourse(customer?.id, "men", cleanEmail);

    if (!hasAccess) {
      console.warn("[AUTH_VERIFY_REJECTED] Verified token for email without active course access");
      return respondError("no_access", 403);
    }

    if (!customer) {
      customer = await getOrCreateCustomer(cleanEmail);
    }

    // Set secure session cookie and redirect directly to course
    const targetUrl = "/learn/men";
    if (isJson) {
      const res = NextResponse.json({ success: true, redirectUrl: targetUrl });
      res.cookies.set("plugd_access_key", customer.accessKey, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: "lax",
      });
      return res;
    } else {
      const redirectUrl = new URL(targetUrl, origin);
      const res = NextResponse.redirect(redirectUrl, 303);
      res.cookies.set("plugd_access_key", customer.accessKey, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: "lax",
      });
      return res;
    }
  } catch (error: any) {
    console.error("[AUTH_VERIFY_ERROR]", error?.message || error);
    return respondError("server_error", 500);
  }
}
