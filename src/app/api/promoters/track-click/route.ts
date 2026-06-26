import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { referralCode, source } = await req.json();

    if (!referralCode) {
      return NextResponse.json({ error: "Referral code is required" }, { status: 400 });
    }

    const promoter = await prisma.promoter.findFirst({
      where: {
        OR: [
          { referralCode },
          { username: referralCode }
        ]
      }
    });

    if (!promoter) {
      return NextResponse.json({ error: "Invalid referral code" }, { status: 404 });
    }

    const allowedSources = ["whatsapp", "telegram", "x", "reddit", "discord", "instagram", "facebook", "linkedin", "youtube", "tiktok", "pinterest", "threads"];
    let normalizedSource = source ? String(source).toLowerCase().trim() : "others";
    if (!allowedSources.includes(normalizedSource)) {
      normalizedSource = "others";
    }

    await prisma.$transaction([
      prisma.promoter.update({
        where: { id: promoter.id },
        data: {
          totalClicks: {
            increment: 1
          }
        }
      }),
      prisma.referral.create({
        data: {
          referralCode: promoter.referralCode,
          promoterEmail: promoter.email,
          status: "clicked",
          paymentId: normalizedSource
        }
      })
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking referral click:", error);
    return NextResponse.json({ error: "Failed to track click" }, { status: 500 });
  }
}
