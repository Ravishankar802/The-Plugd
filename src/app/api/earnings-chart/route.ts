import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getSession();

    if (!session || !session.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range") || "7d";

    let daysCount = 7;
    if (range === "4w") {
      daysCount = 28;
    } else if (range === "3m") {
      daysCount = 90;
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
        promoterEmail: session.email.toLowerCase(),
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

    // Aggregate by date (YYYY-MM-DD) in local time
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

    // Format for Recharts
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
  } catch (error: any) {
    console.error("Error in earnings-chart API:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch earnings data" }, { status: 500 });
  }
}
