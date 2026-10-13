import { NextResponse } from "next/server";
import { randomBytes, createHash } from "crypto";
import prisma from "@/lib/prisma";
import { hasUserAccessToCourse } from "@/lib/playbooks";
import { sendLoginEmail } from "@/lib/email";
import { checkLoginRateLimit } from "@/lib/auth-rate-limit";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawEmail = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    // Basic email validation
    if (!rawEmail || !rawEmail.includes("@") || rawEmail.length > 255) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Rate limiting: check IP and email separately
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-real-ip") ||
      "unknown-client";

    const ipLimit = checkLoginRateLimit(`ip:${ip}`, 10, 15 * 60 * 1000);
    const emailLimit = checkLoginRateLimit(`email:${rawEmail}`, 5, 15 * 60 * 1000);

    if (!ipLimit.allowed || !emailLimit.allowed) {
      const retryAfter = Math.max(ipLimit.retryAfterSeconds, emailLimit.retryAfterSeconds);
      return NextResponse.json(
        { error: "Too many login attempts. Please wait a few minutes before trying again." },
        {
          status: 429,
          headers: { "Retry-After": String(retryAfter) },
        }
      );
    }

    // Generic unauthenticated response to prevent user enumeration
    const genericResponse = {
      success: true,
      message:
        "If an account with this email has access, a sign-in link has been sent. Please check your inbox and spam folder.",
    };

    // Verify existing customer and course purchase/entitlement
    const customer = await prisma.customer.findUnique({
      where: { email: rawEmail },
    });

    const hasAccess = await hasUserAccessToCourse(customer?.id, "men", rawEmail);

    if (hasAccess) {
      // Cryptographically random 256-bit token
      const rawToken = randomBytes(32).toString("hex");
      // Store only SHA-256 hash in database
      const hashedToken = createHash("sha256").update(rawToken).digest("hex");
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

      // Invalidate existing unused tokens for this email to enforce single active token
      await prisma.otpToken.updateMany({
        where: { email: rawEmail, used: false },
        data: { used: true },
      });

      // Persist hashed token
      await prisma.otpToken.create({
        data: {
          email: rawEmail,
          code: hashedToken,
          expiresAt,
          used: false,
        },
      });

      // Dispatch magic link email without exposing raw token in logs
      const emailResult = await sendLoginEmail({
        email: rawEmail,
        token: rawToken,
      });

      if (!emailResult.success) {
        console.error("[AUTH_LOGIN_DISPATCH_FAILED] Email provider failed to dispatch login link");
        return NextResponse.json(
          { error: "Unable to send sign-in link at this time. Please try again in a few moments." },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(genericResponse);
  } catch (error: any) {
    console.error("[AUTH_LOGIN_ERROR]", error?.message || error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
