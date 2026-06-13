import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Resend } from "resend";

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

    // Admin bypass
    const isAdmin = email.toLowerCase() === process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase();
    
    // Check if email exists in Account table with status: 'paid' or in Promoter table
    const [account, promoter] = await Promise.all([
      prisma.account.findFirst({
        where: {
          email: email.toLowerCase(),
          paid: true,
        },
      }),
      prisma.promoter.findUnique({
        where: {
          email: email.toLowerCase(),
        },
      }),
    ]);

    if (!account && !promoter && !isAdmin) {
      console.warn(`[AUTH] No paid account or promoter profile found for: ${email}`);
      return NextResponse.json(
        { error: "No paid account found for this email" },
        { status: 404 }
      );
    }

    // Generate random 4-digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();

    // Delete any existing unused OTP for this email
    await prisma.otpToken.deleteMany({
      where: {
        email: email.toLowerCase(),
        used: false,
      },
    });

    // Store new OTP
    await prisma.otpToken.create({
      data: {
        email: email.toLowerCase(),
        code,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      },
    });

    // Check Env Vars
    if (!process.env.RESEND_API_KEY) {
      console.error("[AUTH] Missing Resend API key");
      return NextResponse.json(
        { error: "Internal server error: Email service not configured" },
        { status: 500 }
      );
    }

    try {
      await getResend().emails.send({
        from: "Plugd <noreply@theplugd.com>",
        to: email,
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
      { error: `Internal server error: ${error.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}
