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
    
    const roundedDaysActive = Math.max(1, Math.floor(daysActive));
    
    // Generate raw amounts for all days from 0 to roundedDaysActive - 1
    const rawAmounts: number[] = [];
    let sumRaw = 0;
    
    for (let d = 0; d < roundedDaysActive; d++) {
      // 1. Overall growth trend: starts smaller (e.g. 35% level) and goes to 100%
      const trend = 0.35 + 0.65 * (d / Math.max(1, roundedDaysActive - 1));
      
      // 2. Weekly seasonality: sine wave with period of 7 days
      const weeklyPhase = (promoter.id * 3) % 7;
      const weekly = 0.8 + 0.4 * Math.sin((2 * Math.PI * (d + weeklyPhase)) / 7);
      
      // 3. Natural fluctuation noise: deterministic based on promoter ID and day
      const noiseSeed = (promoter.id * 103 + d * 53) % 100;
      const noise = 0.3 + 1.4 * (noiseSeed / 100);
      
      // 4. Occasional spikes on random days (e.g. 2x - 4x)
      let spike = 1.0;
      if ((promoter.id * 7 + d * 31) % 19 === 0) {
        spike = 2.0 + ((promoter.id * 13 + d * 7) % 5) * 0.5;
      }
      
      const raw = trend * weekly * noise * spike;
      rawAmounts.push(raw);
      sumRaw += raw;
    }
    
    // Scale raw amounts so their sum is exactly equal to promoter.totalEarned
    const scaledAmounts = rawAmounts.map(raw => {
      return (raw * promoter.totalEarned) / (sumRaw || 1);
    });
    
    // Round to 2 decimal places
    const dailyEarnings = scaledAmounts.map(val => Math.round(val * 100) / 100);
    
    // Adjust for any small rounding error on the final day so the sum is EXACTLY promoter.totalEarned
    const currentSum = dailyEarnings.reduce((sum, val) => sum + val, 0);
    const diff = promoter.totalEarned - currentSum;
    if (dailyEarnings.length > 0) {
      dailyEarnings[dailyEarnings.length - 1] = Math.round((dailyEarnings[dailyEarnings.length - 1] + diff) * 100) / 100;
    }

    const chartData = dates.map((dateStr, i) => {
      const [yyyy, mm, dd] = dateStr.split("-");
      const monthLabel = months[parseInt(mm, 10) - 1];
      const dayLabel = parseInt(dd, 10);
      
      const daysAgo = daysCount - 1 - i;
      
      let amount = 0;
      if (daysAgo < roundedDaysActive) {
        const d = (roundedDaysActive - 1) - daysAgo;
        amount = dailyEarnings[d] || 0;
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
