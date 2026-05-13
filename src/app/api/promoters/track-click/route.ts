import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { referralCode } = await req.json();

    if (!referralCode) {
      return NextResponse.json({ error: "Referral code is required" }, { status: 400 });
    }

    const promoter = await prisma.promoter.findUnique({
      where: { referralCode }
    });

    if (!promoter) {
      return NextResponse.json({ error: "Invalid referral code" }, { status: 404 });
    }

    await prisma.promoter.update({
      where: { referralCode },
      data: {
        totalClicks: {
          increment: 1
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking referral click:", error);
    return NextResponse.json({ error: "Failed to track click" }, { status: 500 });
  }
}
