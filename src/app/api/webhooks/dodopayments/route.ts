import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { dodoClient } from "@/lib/dodopayments";
import { MONETIZATION_PLANS, calculateExpirationDate } from "@/lib/subscription";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const webhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY;

    let event: any;
    if (webhookKey) {
      const headers: Record<string, string> = {};
      req.headers.forEach((val, key) => {
        headers[key.toLowerCase()] = val;
      });
      event = dodoClient.webhooks.unwrap(rawBody, { headers, key: webhookKey });
    } else {
      event = JSON.parse(rawBody);
    }

    const type = event?.type || event?.event_type;
    const data = event?.data || {};
    const metadata = data?.metadata || {};
    const userId = metadata?.userId;

    if (!userId) {
      return NextResponse.json({ received: true, note: "No userId in metadata" });
    }

    const planKey = (metadata.plan || "MONTHLY").toUpperCase() as "MONTHLY" | "YEARLY";
    const planConfig = MONETIZATION_PLANS[planKey] || MONETIZATION_PLANS.MONTHLY;

    if (
      type === "payment.succeeded" ||
      type === "subscription.active" ||
      type === "subscription.renewed" ||
      type === "checkout.session.completed"
    ) {
      const expiresAt = calculateExpirationDate(planKey);

      await prisma.$transaction([
        prisma.subscription.upsert({
          where: { userId },
          update: {
            plan: planKey,
            status: "ACTIVE",
            amount: planConfig.price,
            currency: "INR",
            paymentId: data?.payment_id || null,
            subscriptionId: data?.subscription_id || null,
            expiresAt,
          },
          create: {
            userId,
            plan: planKey,
            status: "ACTIVE",
            amount: planConfig.price,
            currency: "INR",
            paymentId: data?.payment_id || null,
            subscriptionId: data?.subscription_id || null,
            expiresAt,
          },
        }),
        prisma.user.update({
          where: { id: userId },
          data: { isPublic: true },
        }),
      ]);
    } else if (
      type === "subscription.cancelled" ||
      type === "subscription.expired" ||
      type === "payment.failed"
    ) {
      // When subscription expires or cancels:
      // The wishlist becomes private to visitors.
      // Items and profile data are NEVER deleted or restricted from the owner.
      await prisma.$transaction([
        prisma.subscription.updateMany({
          where: { userId },
          data: { status: "EXPIRED" },
        }),
        prisma.user.update({
          where: { id: userId },
          data: { isPublic: false },
        }),
      ]);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[DODO_PAYMENTS_WEBHOOK_ERROR]", error);
    return NextResponse.json(
      { error: error?.message || "Webhook processing failed" },
      { status: 400 }
    );
  }
}
