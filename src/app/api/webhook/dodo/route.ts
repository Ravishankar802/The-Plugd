import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { dodoClient } from "@/lib/dodopayments";
import { recordCoursePurchase } from "@/lib/playbooks";

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

    const eventId = (
      req.headers.get("webhook-id") ||
      req.headers.get("x-webhook-id") ||
      event?.event_id ||
      event?.id ||
      `${type}_${data?.payment_id || "event"}_${Date.now()}`
    ).trim();

    if (eventId) {
      const alreadyProcessed = await prisma.processedWebhook.findUnique({
        where: { id: eventId },
      });

      if (alreadyProcessed) {
        return NextResponse.json(
          { success: true, message: "Duplicate webhook event already processed" },
          { status: 200 }
        );
      }
    }

    const metadata = data?.metadata || {};
    const paymentId = data?.payment_id || null;
    const courseSlug = (metadata?.courseSlug || "men").toLowerCase();
    let customerId = metadata?.customerId || null;
    const customerEmail = metadata?.customerEmail || data?.customer?.email || null;
    const amount = Number(metadata?.amount) || 3.0;

    if (type === "payment.succeeded") {
      if (!customerId && customerEmail) {
        const customer = await prisma.customer.upsert({
          where: { email: customerEmail.trim().toLowerCase() },
          update: {},
          create: {
            email: customerEmail.trim().toLowerCase(),
            accessKey: Math.random().toString(36).substring(2) + Date.now().toString(36),
          },
        });
        customerId = customer.id;
      }

      if (customerId) {
        await recordCoursePurchase({
          customerId,
          courseSlug,
          amount,
          paymentId: paymentId || undefined,
        });
      }
    }

    if (eventId) {
      await prisma.processedWebhook.create({
        data: {
          id: eventId,
          eventType: String(type),
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[DODO_WEBHOOK_ERROR]", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Webhook processing failed" },
      { status: 400 }
    );
  }
}
