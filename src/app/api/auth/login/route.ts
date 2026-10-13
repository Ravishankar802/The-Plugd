import { NextResponse } from "next/server";
import { randomBytes, randomInt, createHash } from "crypto";
import prisma from "@/lib/prisma";
import { getOrCreateCustomer, hasUserAccessToCourse } from "@/lib/playbooks";
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
        "If an account with this email has access, a 6-digit verification code has been sent. Please check your inbox and spam folder.",
    };

    // Verify existing customer and course purchase/entitlement
    let customer = await prisma.customer.findUnique({
      where: { email: rawEmail },
    });

    const hasAccess = await hasUserAccessToCourse(customer?.id, "men", rawEmail);

    if (hasAccess) {
      // Ensure customer record exists prior to the transaction to serialize on the row-level lock
      if (!customer) {
        customer = await getOrCreateCustomer(rawEmail);
      }

      // Atomic transaction: lock Customer row per email, verify 60s cooldown, invalidate old OTPs, create replacement
      const txResult = await prisma.$transaction(async (tx) => {
        // Acquire exclusive row lock on the Customer record to serialize concurrent resend requests per email
        try {
          await tx.$queryRaw`
            SELECT id FROM "Customer"
            WHERE email = ${rawEmail}
            FOR UPDATE
          `;
        } catch {
          // Fallback if raw query is not supported by environment
        }

        // Verify customer record under lock
        const lockedCustomer = await tx.customer.findUnique({
          where: { email: rawEmail },
        });
        if (!lockedCustomer) {
          throw new Error("Customer record could not be established");
        }

        // Check durable resend cooldown (60 seconds between code requests)
        const recentOtp = await tx.otpToken.findFirst({
          where: {
            email: rawEmail,
            used: false,
            createdAt: { gt: new Date(Date.now() - 60 * 1000) },
          },
          orderBy: { createdAt: "desc" },
        });

        if (recentOtp) {
          const cooldownRemaining = Math.max(
            1,
            Math.ceil((recentOtp.createdAt.getTime() + 60 * 1000 - Date.now()) / 1000)
          );
          return {
            cooldown: true,
            retryAfter: cooldownRemaining,
          };
        }

        // Invalidate any existing unused tokens for this email to enforce a single active code
        await tx.otpToken.updateMany({
          where: { email: rawEmail, used: false },
          data: { used: true },
        });

        // Generate cryptographically secure random 6-digit numeric code (100000 - 999999)
        const rawCode = String(randomInt(100000, 1000000));

        // Salt and hash the code (never store plaintext numeric code in DB)
        const salt = randomBytes(16).toString("hex");
        const hashedCode = createHash("sha256").update(salt + rawCode).digest("hex");
        const storedCode = `${salt}:${hashedCode}`;

        // 10-minute expiry
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        // Persist salted hash with attempts counter initialized to 0
        await tx.otpToken.create({
          data: {
            email: rawEmail,
            code: storedCode,
            attempts: 0,
            expiresAt,
            used: false,
          },
        });

        return {
          cooldown: false,
          rawCode,
        };
      });

      if (txResult.cooldown) {
        return NextResponse.json(
          { error: `Please wait ${txResult.retryAfter} seconds before requesting a new code.` },
          {
            status: 429,
            headers: { "Retry-After": String(txResult.retryAfter) },
          }
        );
      }

      // Dispatch 6-digit code email without exposing raw code in logs
      const emailResult = await sendLoginEmail({
        email: rawEmail,
        code: txResult.rawCode!,
      });

      if (!emailResult.success) {
        console.error("[AUTH_LOGIN_DISPATCH_FAILED] Email provider failed to dispatch verification code");
        return NextResponse.json(
          { error: "Unable to send verification code at this time. Please try again in a few moments." },
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
