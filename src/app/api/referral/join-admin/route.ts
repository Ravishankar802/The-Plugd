import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

function generateReferralCode(email: string) {
  const base = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
  const random = Math.random().toString(36).substring(2, 6);
  return `${base}-${random}`;
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "ravx003@gmail.com";

    if (!session || session.email !== adminEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.email;

    const promoter = await prisma.promoter.upsert({
      where: { email },
      create: {
        email,
        name: email.split("@")[0],
        referralCode: generateReferralCode(email),
        totalEarned: 0,
        pendingPayout: 0,
        totalClicks: 0,
        totalConversions: 0
      },
      update: {}
    });

    return NextResponse.json({ success: true, promoter });
  } catch (error) {
    console.error("Admin bypass error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
