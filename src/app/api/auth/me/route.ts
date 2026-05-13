import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [account, promoter] = await Promise.all([
    prisma.account.findFirst({ where: { email: session.email, paid: true } }),
    prisma.promoter.findUnique({ where: { email: session.email } })
  ]);

  return NextResponse.json({
    email: session.email,
    hasAccount: !!account,
    hasPromoter: !!promoter,
    isAdmin: session.isAdmin,
    accountData: account,
    promoterData: promoter
  });
}
