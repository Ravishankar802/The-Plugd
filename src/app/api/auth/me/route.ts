import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getSession();

  if (!session || !session.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = session.email.toLowerCase();

  try {
    const [account, promoter, pendingWithdrawal] = await Promise.all([
      prisma.account.findFirst({ 
        where: { email, paid: true },
        orderBy: [
          { isClaimed: 'desc' },
          { createdAt: 'desc' }
        ]
      }),
      prisma.promoter.findUnique({ where: { email } }),
      prisma.withdrawalRequest.findFirst({
        where: { userId: email, status: "pending" }
      })
    ]);

    let rank = 1;
    let totalPromoters = 1;
    let nextRankEarningsNeeded = 0;
    let trafficSources: { source: string; clicks: number }[] = [];

    if (promoter) {
      const [higherEarnersCount, totalCount, clickGroups] = await Promise.all([
        prisma.promoter.count({
          where: {
            totalEarned: {
              gt: promoter.totalEarned
            }
          }
        }),
        prisma.promoter.count(),
        prisma.referral.groupBy({
          by: ["paymentId"],
          where: {
            promoterEmail: promoter.email,
            status: "clicked"
          },
          _count: {
            id: true
          }
        })
      ]);

      rank = higherEarnersCount + 1;
      totalPromoters = totalCount;
      trafficSources = clickGroups.map(g => ({
        source: g.paymentId || "direct",
        clicks: g._count.id
      }));

      if (rank > 1) {
        const nextHigherPromoter = await prisma.promoter.findFirst({
          where: {
            totalEarned: {
              gt: promoter.totalEarned
            }
          },
          orderBy: {
            totalEarned: "asc"
          },
          select: {
            totalEarned: true
          }
        });
        if (nextHigherPromoter) {
          nextRankEarningsNeeded = nextHigherPromoter.totalEarned - promoter.totalEarned;
        }
      }
    }

    return NextResponse.json({
      email,
      hasAccount: !!account,
      hasPromoter: !!promoter,
      isAdmin: session.isAdmin,
      accountData: account,
      promoterData: promoter ? {
        ...promoter,
        rank,
        totalPromoters,
        nextRankEarningsNeeded
      } : null,
      hasPendingWithdrawal: !!pendingWithdrawal,
      trafficSources
    });
  } catch (error) {
    console.error("Auth me error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
