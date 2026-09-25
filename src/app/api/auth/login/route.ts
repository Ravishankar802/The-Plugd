import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { createSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const login = body.login?.trim();
    const password = body.password;

    if (!login || !password) {
      return NextResponse.json(
        { error: "Please enter your email or username and password." },
        { status: 400 }
      );
    }

    const cleanLogin = login.toLowerCase().replace(/^@+/, "");

    // Look up by email OR username (case-insensitive)
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: { equals: cleanLogin, mode: "insensitive" } },
          { username: { equals: cleanLogin, mode: "insensitive" } },
        ],
      },
      include: {
        creatorProfile: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email/username or password." },
        { status: 401 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        { error: "This account does not have a password set. Please sign up or contact support." },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email/username or password." },
        { status: 401 }
      );
    }

    // Ensure CreatorProfile exists
    if (!user.creatorProfile) {
      await prisma.creatorProfile.create({
        data: {
          userId: user.id,
          displayName: user.displayName || user.username || user.email.split("@")[0],
          bio: user.bio || null,
          avatarUrl: user.avatarUrl || null,
          paymentLink: user.paymentLink || null,
          paymentQr: user.paymentQr || null,
        },
      });
    }

    // Set authenticated session cookie
    await createSession(user.id, user.email, user.username);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.displayName || user.creatorProfile?.displayName || user.username,
      },
    });
  } catch (error: any) {
    console.error("[LOGIN_ERROR]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during login. Please try again." },
      { status: 500 }
    );
  }
}
