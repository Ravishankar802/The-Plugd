import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { createSession } from "@/lib/auth";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

let resendInstance: Resend | null = null;
function getResend() {
  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
}

const RESERVED_USERNAMES = new Set([
  "admin",
  "dashboard",
  "api",
  "login",
  "signup",
  "settings",
  "support",
  "help",
  "about",
  "pricing",
  "plugd",
  "index",
  "home",
  "payout",
  "payments",
  "auth",
  "verification",
  "verified",
  "register",
  "faq",
  "terms",
  "privacy",
  "static",
  "assets",
  "public",
  "upload",
  "uploads",
  "legal",
  "profile",
  "items",
  "catalog",
  "category",
]);

async function sendOtpEmail(cleanEmail: string, code: string) {
  // Delete any existing unused OTP for this email
  await prisma.otpToken.deleteMany({
    where: {
      email: cleanEmail,
      used: false,
    },
  });

  // Store new OTP with 10-minute expiry
  await prisma.otpToken.create({
    data: {
      email: cleanEmail,
      code,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    },
  });

  if (!process.env.RESEND_API_KEY) {
    console.log(`\n========================================\n[DEV AUTH] 6-digit OTP for ${cleanEmail} is: ${code}\n========================================\n`);
    return;
  }

  try {
    await getResend().emails.send({
      from: "Plugd <noreply@theplugd.com>",
      to: cleanEmail,
      subject: "Your Plugd verification code",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background-color: #ffffff; border: 1px solid #f4f4f5; border-radius: 16px;">
          <div style="margin-bottom: 24px;">
            <span style="font-size: 26px; font-weight: 800; color: #f97316; letter-spacing: -0.5px;">Plugd</span>
          </div>
          <h1 style="font-size: 20px; font-weight: 800; color: #18181b; margin-bottom: 8px;">Verify your email</h1>
          <p style="font-size: 14px; color: #52525b; line-height: 1.5; margin-bottom: 24px;">Enter the 6-digit code below to verify your email and finish setting up your Plugd account:</p>
          <div style="background-color: #fff7ed; border: 1px solid #ffedd5; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
            <span style="font-family: monospace; font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #ea580c;">${code}</span>
          </div>
          <p style="font-size: 12px; color: #a1a1aa; line-height: 1.4; margin: 0;">This code expires in 10 minutes. If you did not create a Plugd account, you can safely ignore this email.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("[AUTH] Resend error:", err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      username,
      email,
      password,
      displayName,
      bio,
      avatarUrl,
      paymentLink,
      paymentQr,
      otp,
      action,
    } = body;

    // 1. Validate Username
    const cleanUsername = username?.toLowerCase().trim().replace(/^@+/, "");
    if (!cleanUsername) {
      return NextResponse.json({ error: "Username is required." }, { status: 400 });
    }

    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    if (!usernameRegex.test(cleanUsername)) {
      return NextResponse.json(
        { error: "Username must be 3-20 characters long and can only contain letters, numbers, underscores, or hyphens." },
        { status: 400 }
      );
    }

    if (RESERVED_USERNAMES.has(cleanUsername)) {
      return NextResponse.json(
        { error: "This username is reserved. Please choose another one." },
        { status: 400 }
      );
    }

    // Check if username taken
    const existingUsername = await prisma.user.findFirst({
      where: { username: { equals: cleanUsername, mode: "insensitive" } },
    });
    if (existingUsername) {
      return NextResponse.json(
        { error: "This username is already taken. Please choose another one." },
        { status: 409 }
      );
    }

    // 2. Validate Email
    const cleanEmail = email?.toLowerCase().trim();
    if (!cleanEmail || !cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const existingEmail = await prisma.user.findFirst({
      where: { email: { equals: cleanEmail, mode: "insensitive" } },
    });
    if (existingEmail) {
      return NextResponse.json(
        { error: "An account with this email address already exists." },
        { status: 409 }
      );
    }

    // 3. Validate Password
    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // 4. Validate Payment Method
    const cleanPaymentLink = paymentLink?.trim() || null;
    const cleanPaymentQr = paymentQr?.trim() || null;

    if (!cleanPaymentLink && !cleanPaymentQr) {
      return NextResponse.json(
        { error: "Payment method is required. Please provide a payment link or upload a payment QR code (UPI, GPay, PhonePe, Paytm)." },
        { status: 400 }
      );
    }

    // STEP A: If action === "send-code" or no OTP provided yet, generate & send OTP
    if (action === "send-code" || !otp) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      await sendOtpEmail(cleanEmail, code);
      return NextResponse.json({
        success: true,
        requireOtp: true,
        email: cleanEmail,
      });
    }

    // STEP B: Verify OTP before creating account
    const cleanOtp = String(otp).trim();
    if (cleanOtp.length !== 6) {
      return NextResponse.json(
        { error: "Please enter the complete 6-digit verification code." },
        { status: 400 }
      );
    }

    const validOtp = await prisma.otpToken.findFirst({
      where: {
        email: cleanEmail,
        code: cleanOtp,
        used: false,
        expiresAt: { gt: new Date() },
      },
    });

    if (!validOtp) {
      return NextResponse.json(
        { error: "Invalid or expired verification code. Please check your code or request a new one." },
        { status: 400 }
      );
    }

    // Mark OTP as used
    await prisma.otpToken.update({
      where: { id: validOtp.id },
      data: { used: true },
    });

    // 5. Prepare profile details
    const cleanDisplayName = displayName?.trim() || cleanUsername;
    const cleanBio = bio?.trim() ? bio.trim().slice(0, 500) : null;
    const cleanAvatar = avatarUrl?.trim() || "/avatars/avatar-1.png";

    // Hash password securely
    const hashedPassword = hashPassword(password);

    // 6. Create user and profile in DB
    const user = await prisma.user.create({
      data: {
        username: cleanUsername,
        email: cleanEmail,
        password: hashedPassword,
        displayName: cleanDisplayName,
        bio: cleanBio,
        avatarUrl: cleanAvatar,
        paymentLink: cleanPaymentLink,
        paymentQr: cleanPaymentQr,
        creatorProfile: {
          create: {
            displayName: cleanDisplayName,
            bio: cleanBio,
            avatarUrl: cleanAvatar,
            paymentLink: cleanPaymentLink,
            paymentQr: cleanPaymentQr,
          },
        },
      },
      include: {
        creatorProfile: true,
      },
    });

    // 7. Establish session cookie
    await createSession(user.id, user.email, user.username);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
      },
    });
  } catch (error: any) {
    console.error("[SIGNUP_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to create account. Please try again." },
      { status: 500 }
    );
  }
}
