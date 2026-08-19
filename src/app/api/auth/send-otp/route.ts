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

    // Generate random 4-digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();

    // Delete any existing unused OTP for this email
    await prisma.otpToken.deleteMany({
      where: {
        email: cleanEmail,
        used: false,
      },
    });

    // Store new OTP
    await prisma.otpToken.create({
      data: {
        email: cleanEmail,
        code,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      },
    });

    // Development / Console Logging Bypass
    if (!process.env.RESEND_API_KEY) {
      console.log(`\n========================================\n[DEV AUTH] OTP for ${cleanEmail} is: ${code}\n========================================\n`);
      return NextResponse.json({ message: "OTP sent successfully (Logged to console in development)" });
    }

    try {
      await getResend().emails.send({
        from: "Plugd <noreply@theplugd.com>",
        to: cleanEmail,
        subject: "Your Plugd login code",
        html: `<p>Your login code is <strong>${code}</strong>. It expires in 10 minutes.</p>`,
      });
    } catch (mailError) {
      console.error("[AUTH] Resend error:", mailError);
      return NextResponse.json(
        { error: "Internal server error: Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error: any) {
    console.error("[AUTH] Unexpected error in send-otp:", error);
    return NextResponse.json(
      { error: `Internal server error: ${error.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}
