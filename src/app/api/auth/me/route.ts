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
    const [account, promoter] = await Promise.all([
      prisma.account.findFirst({ 
        where: { email, paid: true },
        orderBy: [
          { isClaimed: 'desc' },
          { createdAt: 'desc' }
        ]
      }),
      prisma.promoter.findUnique({ where: { email } })
    ]);

    return NextResponse.json({
      email,
      hasAccount: !!account,
      hasPromoter: !!promoter,
      isAdmin: session.isAdmin,
      accountData: account,
      promoterData: promoter
    });
  } catch (error) {
    console.error("Auth me error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
