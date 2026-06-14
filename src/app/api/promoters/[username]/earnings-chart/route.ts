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

    const isDisplayPromoter = promoter.email.toLowerCase().endsWith("@example.com");

    // If it's a real promoter, or they have real conversions in the database, return real stats!
    if (!isDisplayPromoter || referrals.length > 0) {
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
            earningsByDate[dateStr] += ref.amountEarned || 100.0;
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
      dailyRate = 120000;
    } else {
      dailyRate = 30000 + 60000 * Math.pow(factor, 2.0);
    }
    
    const seededDaysActive = 45 + ((rank * 17) % 45);
    const virtualDays = promoter.totalEarned > 100000 && dailyRate > 0 ? Math.max(seededDaysActive, promoter.totalEarned / dailyRate) : 0;
    
    const roundedDaysActive = Math.max(1, Math.floor(virtualDays));
    
    // The virtual signup date is fixed relative to promoter.createdAt
    const virtualSignupDate = new Date(signupDate);
    virtualSignupDate.setDate(virtualSignupDate.getDate() - roundedDaysActive);

    // Calculate fixed sum of raw values up to roundedDaysActive to get a permanent scaleFactor
    let fixedSumRaw = 0;
    for (let d = 0; d < roundedDaysActive; d++) {
      const trend = 0.35 + 0.65 * (d / Math.max(1, roundedDaysActive - 1));
      const weeklyPhase = (rank * 3) % 7;
      const weekly = 0.8 + 0.4 * Math.sin((2 * Math.PI * (d + weeklyPhase)) / 7);
      const noiseSeed = (rank * 103 + d * 53) % 100;
      const noise = 0.3 + 1.4 * (noiseSeed / 100);
      let spike = 1.0;
      if ((rank * 7 + d * 31) % 19 === 0) {
        spike = 2.0 + ((rank * 13 + d * 7) % 5) * 0.5;
      }
      fixedSumRaw += trend * weekly * noise * spike;
    }
    const scaleFactor = promoter.totalEarned / (fixedSumRaw || 1);

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const chartData = dates.map(dateStr => {
      const [yyyy, mm, dd] = dateStr.split("-");
      const monthLabel = months[parseInt(mm, 10) - 1];
      const dayLabel = parseInt(dd, 10);
      
      const currentDate = new Date(dateStr);
      currentDate.setHours(0, 0, 0, 0);
      const virtualSignup = new Date(virtualSignupDate);
      virtualSignup.setHours(0, 0, 0, 0);
      
      const diffTime = currentDate.getTime() - virtualSignup.getTime();
      const d = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      let amount = 0;
      if (d >= 0) {
        // Calculate raw amount for this specific calendar day index 'd'
        const trend = 0.35 + 0.65 * Math.min(1.0, d / Math.max(1, roundedDaysActive - 1));
        const weeklyPhase = (rank * 3) % 7;
        const weekly = 0.8 + 0.4 * Math.sin((2 * Math.PI * (d + weeklyPhase)) / 7);
        const noiseSeed = (rank * 103 + d * 53) % 100;
        const noise = 0.3 + 1.4 * (noiseSeed / 100);
        let spike = 1.0;
        if ((rank * 7 + d * 31) % 19 === 0) {
          spike = 2.0 + ((rank * 13 + d * 7) % 5) * 0.5;
        }
        const raw = trend * weekly * noise * spike;
        amount = raw * scaleFactor;

        // If this date is today, scale it to the elapsed fraction of the day
        if (dateStr === todayStr) {
          const now = new Date();
          const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          const msElapsed = now.getTime() - startOfDay.getTime();
          // Minimum of 0.05 so it doesn't show 0 at exactly midnight, maximum of 1.0
          const dayFraction = Math.max(0.05, Math.min(1.0, msElapsed / (1000 * 60 * 60 * 24)));
          amount = amount * dayFraction;
        }
      }
      
      return {
        rawDate: dateStr,
        date: `${monthLabel} ${dayLabel}`,
        amount: Math.round(amount)
      };
    });

    return NextResponse.json({ success: true, data: chartData });
  } catch (error: any) {
    console.error("Public earnings chart fetch failed:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch earnings data" }, { status: 500 });
  }
}
