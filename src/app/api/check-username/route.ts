import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const usernameParam = searchParams.get("username");

    if (!usernameParam) {
      return NextResponse.json(
        { error: "invalid format", reason: "Username is required" },
        { status: 400 }
      );
    }

    const username = usernameParam.trim();

    // 1. Length Check
    if (username.length < 3 || username.length > 20) {
      return NextResponse.json(
        { error: "invalid format", reason: "Username must be between 3 and 20 characters" },
        { status: 400 }
      );
    }

    // 2. Allowed Characters Check
    if (!/^[a-zA-Z0-9_.]+$/.test(username)) {
      return NextResponse.json(
        { error: "invalid format", reason: "Only letters, numbers, underscores (_), and periods (.) are allowed" },
        { status: 400 }
      );
    }

    // 3. Start or End with Period Check
    if (username.startsWith(".") || username.endsWith(".")) {
      return NextResponse.json(
        { error: "invalid format", reason: "Username cannot start or end with a period" },
        { status: 400 }
      );
    }

    // 4. Consecutive Periods Check
    if (username.includes("..")) {
      return NextResponse.json(
        { error: "invalid format", reason: "Username cannot contain consecutive periods (..)" },
        { status: 400 }
      );
    }

    // 5. Database Check
    const existing = await prisma.promoter.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive'
        }
      }
    });

    if (existing) {
      return NextResponse.json({ available: false });
    }

    return NextResponse.json({ available: true });
  } catch (error) {
    console.error("Check username error:", error);
    return NextResponse.json(
      { error: "internal server error", reason: "Internal server error occurred" },
      { status: 500 }
    );
  }
}
