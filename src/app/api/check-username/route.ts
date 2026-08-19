import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username")?.toLowerCase().trim();

    if (!username) {
      return NextResponse.json({ available: false, error: "Username is required" }, { status: 400 });
    }

    // 1. Validate length and characters
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        {
          available: false,
          error: "Username must be 3-20 characters long and contain only letters, numbers, underscores, or hyphens.",
        },
        { status: 200 } // Return 200 so the client can show inline validation
      );
    }

    // 2. Check reserved list
    if (RESERVED_USERNAMES.has(username)) {
      return NextResponse.json(
        { available: false, error: "This username is reserved and cannot be claimed." },
        { status: 200 }
      );
    }

    // 3. Check uniqueness in database
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { available: false, error: "Username is already taken." },
        { status: 200 }
      );
    }

    return NextResponse.json({ available: true });
  } catch (error: any) {
    console.error("[CHECK_USERNAME_ERROR]", error);
    return NextResponse.json({ available: false, error: "Internal server error" }, { status: 500 });
  }
}
