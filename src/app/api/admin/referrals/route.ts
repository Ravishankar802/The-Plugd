import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "ravx003@gmail.com";
    const isAdmin = session.email.toLowerCase() === adminEmail.toLowerCase();
    
    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const promoters = await prisma.promoter.findMany({
      include: {
        Referral: true,
        payouts: {
          orderBy: { createdAt: "desc" }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    // Map promoters to include calculated stats
    const promotersWithStats = promoters.map(promoter => {
      const clicks = promoter.Referral.length;
      const conversions = promoter.Referral.filter(r => r.status === "converted");
      const signupCount = conversions.length;
      
      // Revenue Generated: Users pay $2 for listing
      const revenueGenerated = signupCount * 2.0;
      
      // Paid Users: In this system, all "converted" referrals are paid users ($2)
      const paidUsers = signupCount;

      return {
        ...promoter,
        totalClicks: clicks,
        totalSignups: signupCount,
        paidUsers,
        revenueGenerated,
        // pendingPayout and totalPaid are already in the model
      };
    });

    return NextResponse.json(promotersWithStats);
  } catch (error) {
    console.error("Admin referrals fetch failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
