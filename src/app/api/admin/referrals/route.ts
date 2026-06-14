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

    const [promoters, withdrawalRequests] = await Promise.all([
      prisma.promoter.findMany({
        include: {
          Referral: true,
          payouts: {
            orderBy: { createdAt: "desc" }
          }
        },
        orderBy: { createdAt: "desc" }
      }),
      prisma.withdrawalRequest.findMany({
        where: { status: "pending" }
      })
    ]);

    // Map promoters to include calculated stats
    const promotersWithStats = promoters.map(promoter => {
      const hasReferrals = promoter.Referral.length > 0;
      const clicks = promoter.totalClicks;
      const conversions = promoter.Referral.filter(r => r.status === "converted");
      const signupCount = hasReferrals ? conversions.length : promoter.totalConversions;
      
      // Revenue Generated: Users pay ₹200 for listing
      const revenueGenerated = signupCount * 200.0;
      
      // Paid Users: In this system, all "converted" referrals are paid users (₹200)
      const paidUsers = signupCount;

      const pendingRequest = withdrawalRequests.find(
        wr => wr.userId.toLowerCase() === promoter.email.toLowerCase()
      );

      return {
        ...promoter,
        totalClicks: clicks,
        totalSignups: signupCount,
        paidUsers,
        revenueGenerated,
        pendingWithdrawalRequest: pendingRequest ? {
          id: pendingRequest.id,
          amount: pendingRequest.amount,
          method: pendingRequest.method,
          details: pendingRequest.details,
          status: pendingRequest.status,
          createdAt: pendingRequest.createdAt
        } : null
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
