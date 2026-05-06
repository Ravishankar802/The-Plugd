import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: "Email and code are required" }, { status: 400 });
    }

    const otpToken = await prisma.otpToken.findFirst({
      where: {
        email: email.toLowerCase(),
        code,
        used: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!otpToken) {
      return NextResponse.json(
        { error: "Invalid or expired code" },
        { status: 401 }
      );
    }

    // Mark as used
    await prisma.otpToken.update({
      where: { id: otpToken.id },
      data: { used: true },
    });

    // Create session
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "ravx003@gmail.com";
    const isAdmin = email.toLowerCase() === adminEmail.toLowerCase();
    
    const session = await encrypt({ 
      email: email.toLowerCase(), 
      isPaid: true, 
      isAdmin,
      expires 
    });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("plugd-session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({ message: "Verified successfully" });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
