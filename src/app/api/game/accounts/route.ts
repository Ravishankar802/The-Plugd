import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Fetch random accounts
    // For small datasets, fetching all and picking random is fine.
    // For larger ones, we'd use a different approach.
    const accounts = await prisma.account.findMany({
      where: { status: "paid" },
      select: {
        id: true,
        name: true,
        xHandle: true,
        avatarUrl: true,
        bio: true,
        niche: true,
        followersRange: true,
      }
    });

    if (accounts.length < 2) {
      return NextResponse.json({ error: "Not enough accounts listed yet." }, { status: 400 });
    }

    let acc1, acc2;
    let attempts = 0;
    // Try to find two accounts with different follower ranges to avoid ties
    while (attempts < 50) {
      const idx1 = Math.floor(Math.random() * accounts.length);
      const idx2 = Math.floor(Math.random() * accounts.length);
      
      if (idx1 !== idx2) {
        acc1 = accounts[idx1];
        acc2 = accounts[idx2];
        if (acc1.followersRange !== acc2.followersRange) {
          break;
        }
      }
      attempts++;
    }

    // Fallback if we can't find different ranges after many attempts
    if (!acc1 || !acc2) {
      acc1 = accounts[0];
      acc2 = accounts[1];
    }

    return NextResponse.json({ acc1, acc2 });
  } catch (error) {
    console.error("Game API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
