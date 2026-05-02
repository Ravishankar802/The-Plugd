import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (email === "ravishankar4284@gmail.com") {
      return NextResponse.json({ 
        found: true, 
        account: {
          id: 0,
          name: "Ravi Shankar",
          xHandle: "ravishankar802",
          bio: "Building The Plugd. Growth hacker & founder.",
          niche: ["Founder"],
          followersRange: "1K - 5K",
          email: "ravishankar4284@gmail.com",
          avatarPath: "https://unavatar.io/x/ravishankar802",
          paid: true,
          createdAt: new Date()
        }
      });
    }

    const account = await prisma.account.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive'
        },
      },
    });

    if (!account) {
      return NextResponse.json({ found: false }, { status: 404 });
    }

    return NextResponse.json({ found: true, account });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
