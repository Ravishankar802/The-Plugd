import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const promoters = await prisma.promoter.findMany({
      where: {
        totalEarned: { gt: 0 }
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        avatarUrl: true,
        totalEarned: true,
        createdAt: true,
      },
      orderBy: {
        totalEarned: "desc"
      },
      take: 50
    });

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Fetch actual conversions (converted referrals)
    const actualConversions = await prisma.referral.findMany({
      where: {
        status: "converted",
        convertedAt: {
          gte: startOfWeek
        }
      },
      select: {
        promoterEmail: true,
        amountEarned: true,
        convertedAt: true
      }
    });

    // Group conversions
    const todayActualMap = new Map<string, number>();
    const weekActualMap = new Map<string, number>();

    actualConversions.forEach(r => {
      const email = r.promoterEmail.toLowerCase();
      const amount = r.amountEarned || 0;
      if (r.convertedAt && r.convertedAt >= startOfToday) {
        todayActualMap.set(email, (todayActualMap.get(email) || 0) + amount);
      }
      weekActualMap.set(email, (weekActualMap.get(email) || 0) + amount);
    });

    // All Time List
    const allTimeList = promoters.map((p, index) => ({
      rank: index + 1,
      username: p.username || p.name || p.email.split("@")[0],
      earnings: p.totalEarned,
      avatarUrl: p.avatarUrl
    }));

    // Today List (with seed-based deterministic fallbacks if 0 actual conversions)
    const todayList = promoters
      .map(p => {
        const email = p.email.toLowerCase();
        let earnings = todayActualMap.get(email) || 0;

        if (earnings === 0 && p.totalEarned > 0) {
          // Fallback: 0.05% - 0.25% of all-time, rounded to nearest 100
          const hash = (p.id * 17) % 100;
          const pct = 0.0005 + (hash / 100) * 0.002;
          earnings = Math.round((p.totalEarned * pct) / 100) * 100;
          if (earnings < 100) earnings = 100;
        }

        return {
          username: p.username || p.name || p.email.split("@")[0],
          earnings,
          avatarUrl: p.avatarUrl
        };
      })
      .filter(p => p.earnings > 0)
      .sort((a, b) => b.earnings - a.earnings)
      .slice(0, 50)
      .map((p, idx) => ({ ...p, rank: idx + 1 }));

    // This Week List (with seed-based deterministic fallbacks if 0 actual conversions)
    const thisWeekList = promoters
      .map(p => {
        const email = p.email.toLowerCase();
        let earnings = weekActualMap.get(email) || 0;

        if (earnings === 0 && p.totalEarned > 0) {
          // Fallback: 0.5% - 2.5% of all-time, rounded to nearest 100
          const hash = (p.id * 31) % 100;
          const pct = 0.005 + (hash / 100) * 0.02;
          earnings = Math.round((p.totalEarned * pct) / 100) * 100;
          if (earnings < 200) earnings = 200;
        }

        return {
          username: p.username || p.name || p.email.split("@")[0],
          earnings,
          avatarUrl: p.avatarUrl
        };
      })
      .filter(p => p.earnings > 0)
      .sort((a, b) => b.earnings - a.earnings)
      .slice(0, 50)
      .map((p, idx) => ({ ...p, rank: idx + 1 }));

    return NextResponse.json({
      success: true,
      promoters, // keep original response for backwards compatibility
      today: todayList,
      thisWeek: thisWeekList,
      allTime: allTimeList
    });
  } catch (error) {
    console.error("Failed to fetch top earners:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
