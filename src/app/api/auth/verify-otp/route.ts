import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: "Email and code are required" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. Find OTP Token
    const otpToken = await prisma.otpToken.findFirst({
      where: {
        email: cleanEmail,
        code: code.trim(),
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

    // 2. Mark OTP as used
    await prisma.otpToken.update({
      where: { id: otpToken.id },
      data: { used: true },
    });

    // 3. Find or Create User
    let user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: cleanEmail,
          displayName: cleanEmail.split("@")[0],
          accentColor: "#f97316", // default Plugd orange
        },
      });
    }

    // 4. Create Session
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "ravx003@gmail.com";
    const isAdmin = cleanEmail === adminEmail.toLowerCase();

    const session = await encrypt({
      userId: user.id,
      email: cleanEmail,
      username: user.username,
      isAdmin,
      expires,
    });

    // 5. Set Cookie
    const cookieStore = await cookies();
    cookieStore.set("plugd-session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({
      message: "Verified successfully",
      username: user.username,
    });
  } catch (error: any) {
    console.error("[VERIFY_OTP_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
