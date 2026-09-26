import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

let resendInstance: Resend | null = null;
function getResend() {
  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Generate random 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Delete any existing unused OTP for this email
    await prisma.otpToken.deleteMany({
      where: {
        email: cleanEmail,
        used: false,
      },
    });

    // Store new OTP with 10-minute validity
    await prisma.otpToken.create({
      data: {
        email: cleanEmail,
        code,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      },
    });

    // Development / Console Logging Bypass
    if (!process.env.RESEND_API_KEY) {
      console.log(`\n========================================\n[DEV AUTH] 6-digit OTP for ${cleanEmail} is: ${code}\n========================================\n`);
      return NextResponse.json({ message: "Verification code sent successfully", devCode: process.env.NODE_ENV === "development" ? code : undefined });
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
    } catch (mailError) {
      console.error("[AUTH] Resend error:", mailError);
      return NextResponse.json(
        { error: "Failed to send verification email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Verification code sent successfully" });
  } catch (error: any) {
    console.error("[AUTH] Unexpected error in send-otp:", error);
    return NextResponse.json(
      { error: `Internal server error: ${error.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}
