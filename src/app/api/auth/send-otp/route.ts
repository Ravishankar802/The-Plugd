import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if email exists in Account table with status: 'paid'
    // User requested "Only users whose email exists in the Account table as paid get access"
    const account = await prisma.account.findFirst({
      where: {
        email: email.toLowerCase(),
        paid: true,
      },
    });

    if (!account) {
      return NextResponse.json(
        { error: "No paid account found for this email" },
        { status: 401 }
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

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    await transporter.sendMail({
      from: '"Plugd" <ravx003@gmail.com>',
      to: email,
      subject: 'Your Plugd login code',
      html: `
        <div style="font-family: sans-serif; max-width: 400px;">
          <h2>Your Plugd login code</h2>
          <p style="font-size: 36px; font-weight: bold; letter-spacing: 8px;">${code}</p>
          <p>This code expires in 5 minutes.</p>
          <p>If you didn't request this, ignore this email.</p>
        </div>
      `
    });

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
