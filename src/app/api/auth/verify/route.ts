import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import prisma from "@/lib/prisma";
import { getOrCreateCustomer, hasUserAccessToCourse } from "@/lib/playbooks";
import { checkLoginRateLimit } from "@/lib/auth-rate-limit";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const origin =
    url.origin ||
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.NODE_ENV === "production" ? "https://theplugd.com" : "http://localhost:3000");

  return NextResponse.redirect(new URL("/login", origin));
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawEmail = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const rawCode = typeof body?.code === "string" ? body.code.trim() : "";

    // Validate email
    if (!rawEmail || !rawEmail.includes("@") || rawEmail.length > 255) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Validate 6-digit numeric format
    if (!rawCode || !/^\d{6}$/.test(rawCode)) {
      return NextResponse.json(
        { error: "Please enter a valid 6-digit verification code." },
        { status: 400 }
      );
    }

    // Rate limiting on verification attempts per IP as defense-in-depth
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-real-ip") ||
      "unknown-client";

    const ipLimit = checkLoginRateLimit(`verify:ip:${ip}`, 20, 15 * 60 * 1000);
    if (!ipLimit.allowed) {
      return NextResponse.json(
        { error: "Too many verification attempts. Please wait a few minutes before trying again." },
        {
          status: 429,
          headers: { "Retry-After": String(ipLimit.retryAfterSeconds) },
        }
      );
    }

    // Atomic transaction: verify, count attempts durably, and consume
    const verificationResult = await prisma.$transaction(async (tx) => {
      // 1. Fetch active token with row-level lock where supported
      let record: {
        id: string;
        email: string;
        code: string;
        attempts: number;
        expiresAt: Date;
        used: boolean;
      } | null = null;

      try {
        const rows = await tx.$queryRaw<Array<{
          id: string;
          email: string;
          code: string;
          attempts: number;
          expiresAt: Date;
          used: boolean;
        }>>`
          SELECT id, email, code, attempts, "expiresAt", used
          FROM "OtpToken"
          WHERE email = ${rawEmail}
            AND used = false
            AND "expiresAt" > NOW()
          ORDER BY "createdAt" DESC
          LIMIT 1
          FOR UPDATE
        `;
        record = rows && rows.length > 0 ? rows[0] : null;
      } catch {
        // Fallback to ORM findFirst if raw query is not supported by environment
        record = await tx.otpToken.findFirst({
          where: {
            email: rawEmail,
            used: false,
            expiresAt: { gt: new Date() },
          },
          orderBy: { createdAt: "desc" },
        });
      }

      if (!record) {
        return { ok: false, status: 400, error: "Invalid or expired verification code. Please request a new code." };
      }

      // Check if already exceeded attempts (5 or more)
      if (record.attempts >= 5) {
        await tx.otpToken.updateMany({
          where: { id: record.id, used: false },
          data: { used: true },
        });
        return { ok: false, status: 400, error: "Too many failed attempts. This code has been deactivated. Please request a new code." };
      }

      // Deconstruct salt and expected hash
      const parts = record.code.split(":");
      if (parts.length !== 2) {
        await tx.otpToken.updateMany({
          where: { id: record.id, used: false },
          data: { used: true },
        });
        return { ok: false, status: 400, error: "Invalid verification code state. Please request a new code." };
      }

      const [salt, expectedHash] = parts;
      const computedHash = createHash("sha256").update(salt + rawCode).digest("hex");

      const isMatch =
        computedHash.length === expectedHash.length &&
        timingSafeEqual(Buffer.from(computedHash, "hex"), Buffer.from(expectedHash, "hex"));

      if (!isMatch) {
        const nextAttempts = record.attempts + 1;
        if (nextAttempts >= 5) {
          // 5th failed attempt permanently deactivates the OTP
          await tx.otpToken.updateMany({
            where: { id: record.id, used: false },
            data: { attempts: nextAttempts, used: true },
          });
          return { ok: false, status: 400, error: "Incorrect code. Maximum attempts reached. Please request a new code." };
        } else {
          // Atomic conditional increment: ensures no lost increments across concurrent requests
          await tx.otpToken.updateMany({
            where: { id: record.id, used: false, attempts: { lt: 5 } },
            data: { attempts: { increment: 1 } },
          });
          const remaining = 5 - nextAttempts;
          return { ok: false, status: 400, error: `Incorrect code. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.` };
        }
      }

      // Code matched! Atomically consume token only if still unused and attempts < 5
      const consumed = await tx.otpToken.updateMany({
        where: { id: record.id, used: false, attempts: { lt: 5 } },
        data: { used: true },
      });

      // If consumed.count is 0, a concurrent transaction already consumed or deactivated it
      if (consumed.count === 0) {
        return { ok: false, status: 400, error: "Code has already been used or deactivated." };
      }

      return { ok: true };
    });

    if (!verificationResult.ok) {
      return NextResponse.json(
        { error: verificationResult.error },
        { status: verificationResult.status }
      );
    }

    // Verify course entitlement server-side
    let customer = await prisma.customer.findUnique({
      where: { email: rawEmail },
    });

    const hasAccess = await hasUserAccessToCourse(customer?.id, "men", rawEmail);
    if (!hasAccess) {
      console.warn(`[AUTH_VERIFY_REJECTED] Verified OTP for email without active course access: ${rawEmail}`);
      return NextResponse.json(
        { error: "No purchase of The Dating Playbook was found for this email address. Please make sure you enter the email you used at checkout." },
        { status: 403 }
      );
    }

    if (!customer) {
      customer = await getOrCreateCustomer(rawEmail);
    }

    // Restore access cookie
    const res = NextResponse.json({ success: true, redirectUrl: "/learn/men" });
    res.cookies.set("plugd_access_key", customer.accessKey, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
    });

    return res;
  } catch (error: any) {
    console.error("[AUTH_VERIFY_ERROR]", error?.message || error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
