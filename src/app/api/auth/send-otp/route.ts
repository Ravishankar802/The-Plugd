import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    console.log(`[AUTH] Sending OTP to: ${email}`);

    // Admin bypass
    const isAdmin = email.toLowerCase() === process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase();
    
    // Check if email exists in Account table with status: 'paid'
    const account = await prisma.account.findFirst({
      where: {
        email: email.toLowerCase(),
        paid: true,
      },
    });

    if (!account && !isAdmin) {
      console.warn(`[AUTH] No paid account found for: ${email}`);
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
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
      },
    });

    // Check Env Vars
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("[AUTH] Missing Gmail configuration env vars");
      return NextResponse.json(
        { error: "Internal server error: Email service not configured" },
        { status: 500 }
      );
    }

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      },
      // Adding extra config for stability
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
    });

    try {
      await transporter.sendMail({
        from: `"Plugd" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: 'Your Plugd login code',
        html: `
          <div style="font-family: sans-serif; max-width: 400px; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #333;">Your Plugd login code</h2>
            <p style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #16a34a; margin: 20px 0;">${code}</p>
            <p style="color: #666;">This code expires in 5 minutes.</p>
            <p style="color: #999; font-size: 12px; margin-top: 30px;">If you didn't request this, you can safely ignore this email.</p>
          </div>
        `
      });
      console.log(`[AUTH] OTP sent successfully to: ${email}`);
    } catch (mailError) {
      console.error("[AUTH] Nodemailer error:", mailError);
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
