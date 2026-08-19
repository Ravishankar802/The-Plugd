import { NextResponse } from "next/server";
import { getSession, encrypt } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

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
]);

export async function POST(req: Request) {
  try {
    // 1. Check authentication
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { username } = await req.json();
    const cleanUsername = username?.toLowerCase().trim().replace(/^@+/, ""); // strip leading @ if sent

    if (!cleanUsername) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    // 2. Validate format
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    if (!usernameRegex.test(cleanUsername)) {
      return NextResponse.json(
        { error: "Username must be 3-20 characters long and contain only letters, numbers, underscores, or hyphens." },
        { status: 400 }
      );
    }

    // 3. Check reserved list
    if (RESERVED_USERNAMES.has(cleanUsername)) {
      return NextResponse.json({ error: "This username is reserved and cannot be claimed." }, { status: 400 });
    }

    // 4. Check if already taken in DB
    const existingUser = await prisma.user.findUnique({
      where: { username: cleanUsername },
    });

    if (existingUser && existingUser.id !== session.userId) {
      return NextResponse.json({ error: "Username is already taken by another creator." }, { status: 400 });
    }

    // 5. Update user in DB
    const updatedUser = await prisma.user.update({
      where: { id: session.userId },
      data: { username: cleanUsername },
    });

    // 6. Refresh the session cookie with the new username
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const updatedSession = await encrypt({
      userId: updatedUser.id,
      email: session.email,
      username: updatedUser.username,
      isAdmin: session.isAdmin || false,
      expires,
    });

    const cookieStore = await cookies();
    cookieStore.set("plugd-session", updatedSession, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({
      message: "Username claimed successfully",
      username: updatedUser.username,
    });
  } catch (error: any) {
    console.error("[CLAIM_USERNAME_ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
