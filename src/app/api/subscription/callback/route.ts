import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { MONETIZATION_PLANS, calculateExpirationDate } from "@/lib/subscription";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const planParam = (url.searchParams.get("plan") || "MONTHLY").toUpperCase() as "MONTHLY" | "YEARLY";
  const planKey = planParam === "YEARLY" ? "YEARLY" : "MONTHLY";
  const userId = url.searchParams.get("userId");
  const sessionId = url.searchParams.get("session_id");

  if (!userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const planConfig = MONETIZATION_PLANS[planKey];
    const expiresAt = calculateExpirationDate(planKey);

    await prisma.$transaction([
      prisma.subscription.upsert({
        where: { userId: user.id },
        update: {
          plan: planKey,
          status: "ACTIVE",
          amount: planConfig.price,
          currency: "INR",
          sessionId: sessionId || null,
          expiresAt,
        },
        create: {
          userId: user.id,
          plan: planKey,
          status: "ACTIVE",
          amount: planConfig.price,
          currency: "INR",
          sessionId: sessionId || null,
          expiresAt,
        },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: { isPublic: true },
      }),
    ]);

    const destination = user.username ? `/@${user.username}?upgraded=true` : `/profile?upgraded=true`;
    return NextResponse.redirect(new URL(destination, req.url));
  } catch (error) {
    console.error("[SUBSCRIPTION_CALLBACK_ERROR]", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}
