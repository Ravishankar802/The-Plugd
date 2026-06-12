import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ username: string }> | { username: string };
}

export async function GET(req: Request, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const username = resolvedParams.username;

    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range") || "7d";

    let daysCount = 7;
    if (range === "4w") {
      daysCount = 28;
    } else if (range === "3m") {
      daysCount = 90;
    }

    // Find the promoter first
    const promoter = await prisma.promoter.findFirst({
      where: {
        OR: [
          { username: { equals: username, mode: "insensitive" } },
          { referralCode: { equals: username, mode: "insensitive" } }
        ]
      },
      select: {
        id: true,
        email: true,
        totalEarned: true,
        createdAt: true
      }
    });

    if (!promoter) {
      return NextResponse.json({ error: "Promoter not found" }, { status: 404 });
    }

    // Generate list of date strings (YYYY-MM-DD) for the last X days in local time
    const dates: string[] = [];
    for (let i = daysCount - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      dates.push(`${yyyy}-${mm}-${dd}`);
    }

    // Query referrals since the start date
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysCount + 1);
    startDate.setHours(0, 0, 0, 0);

    const referrals = await prisma.referral.findMany({
      where: {
        promoterEmail: promoter.email.toLowerCase(),
        status: "converted",
        convertedAt: {
          gte: startDate,
          not: null
        }
      },
      select: {
        amountEarned: true,
        convertedAt: true
      }
    });

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // If there are real conversions in the database, return those real stats!
    if (referrals.length > 0) {
      const earningsByDate: Record<string, number> = {};
      dates.forEach(dateStr => {
        earningsByDate[dateStr] = 0;
      });

      referrals.forEach(ref => {
        if (ref.convertedAt) {
          const d = new Date(ref.convertedAt);
          const yyyy = d.getFullYear();
          const mm = String(d.getMonth() + 1).padStart(2, '0');
          const dd = String(d.getDate()).padStart(2, '0');
          const dateStr = `${yyyy}-${mm}-${dd}`;
          
          if (earningsByDate[dateStr] !== undefined) {
            earningsByDate[dateStr] += ref.amountEarned || 1.0;
          }
        }
      });

      const chartData = dates.map(dateStr => {
        const [yyyy, mm, dd] = dateStr.split("-");
        const monthLabel = months[parseInt(mm, 10) - 1];
        const dayLabel = parseInt(dd, 10);
        return {
          rawDate: dateStr,
          date: `${monthLabel} ${dayLabel}`,
          amount: earningsByDate[dateStr]
        };
      });

      return NextResponse.json({ success: true, data: chartData });
    }

    // Otherwise, it is a seeded promoter with dummy data! Simulate their earnings chart dynamically.
    const signupDate = promoter.createdAt ? new Date(promoter.createdAt) : new Date();
    const actualDays = Math.max(0.1, (Date.now() - signupDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Find database rank of this promoter to calculate their exact dailyRate
    const allPromoters = await prisma.promoter.findMany({
      orderBy: { totalEarned: "desc" },
      select: { id: true }
    });
    const rank = allPromoters.findIndex(p => p.id === promoter.id) + 1;
    const factor = Math.max(0, (50 - rank) / 48);
    let dailyRate = 0;
    if (rank === 1) {
      dailyRate = 1200;
    } else {
      dailyRate = 300 + 600 * Math.pow(factor, 2.0);
    }
    
    const seededDaysActive = 45 + ((promoter.id * 17) % 45);
    const virtualDays = promoter.totalEarned > 1000 && dailyRate > 0 ? Math.max(seededDaysActive, promoter.totalEarned / dailyRate) : 0;
    const daysActive = Math.max(1, actualDays, virtualDays);
    
    const avgEarningsPerDay = promoter.totalEarned / daysActive;

    const chartData = dates.map((dateStr, i) => {
      const [yyyy, mm, dd] = dateStr.split("-");
      const monthLabel = months[parseInt(mm, 10) - 1];
      const dayLabel = parseInt(dd, 10);
      
      const daysAgo = daysCount - 1 - i;
      
      let amount = 0;
      if (daysAgo < daysActive) {
        // Deterministic fluctuation of +/- 10%
        const variation = 0.9 + ((promoter.id * 13 + i * 7) % 21) / 100;
        amount = avgEarningsPerDay * variation;
      }
      
      return {
        rawDate: dateStr,
        date: `${monthLabel} ${dayLabel}`,
        amount: Math.round(amount * 100) / 100
      };
    });

    return NextResponse.json({ success: true, data: chartData });
  } catch (error: any) {
    console.error("Public earnings chart fetch failed:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch earnings data" }, { status: 500 });
  }
}
