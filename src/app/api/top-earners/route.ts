import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const topPromoters = await prisma.promoter.findMany({
      where: {
        totalEarned: { gt: 0 }
      },
      select: {
        id: true,
        name: true,
        username: true,
        avatarUrl: true,
        totalEarned: true,
      },
      orderBy: {
        totalEarned: "desc"
      },
      take: 50
    });

    return NextResponse.json({ success: true, promoters: topPromoters });
  } catch (error) {
    console.error("Failed to fetch top earners:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
