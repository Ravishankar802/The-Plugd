import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { dodoClient, DODO_PRODUCT_IDS } from "@/lib/dodopayments";
import { calculateExpirationDate } from "@/lib/subscription";

export const dynamic = "force-dynamic";

function resolvePlan(data: any): { plan: "MONTHLY" | "YEARLY"; amount: number } {
  const productId =
    data?.product_id ||
    (Array.isArray(data?.product_cart) && data.product_cart[0]?.product_id) ||
    data?.line_items?.[0]?.product_id;

  if (productId === DODO_PRODUCT_IDS.YEARLY) {
    return { plan: "YEARLY", amount: 299 };
  }
  if (productId === DODO_PRODUCT_IDS.MONTHLY) {
    return { plan: "MONTHLY", amount: 39 };
  }

  const metaPlan = String(data?.metadata?.plan || "").toUpperCase();
  if (metaPlan === "YEARLY") {
    return { plan: "YEARLY", amount: 299 };
  }
  return { plan: "MONTHLY", amount: 39 };
}

function resolveExpiresAt(data: any, plan: "MONTHLY" | "YEARLY"): Date {
  const raw = data?.next_billing_date || data?.expires_at || data?.current_period_end;
  if (raw) {
    const parsed = new Date(raw);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
  }
  return calculateExpirationDate(plan);
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const webhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY;

    if (!webhookKey && process.env.NODE_ENV === "production") {
      console.error("[DODO_WEBHOOK_ERROR] DODO_PAYMENTS_WEBHOOK_KEY is not configured in production");
      return NextResponse.json({ error: "Webhook key not configured" }, { status: 500 });
    }

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

    // 1. Idempotency Check using event ID / webhook ID
    const eventId = (
      req.headers.get("webhook-id") ||
      req.headers.get("x-webhook-id") ||
      event?.event_id ||
      event?.id ||
      `${type}_${data?.subscription_id || data?.payment_id || "event"}_${event?.timestamp || Date.now()}`
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

    // 2. Identify the User from trusted event metadata or database lookup
    const metadata = data?.metadata || {};
    let userId: string | null = metadata?.userId || metadata?.user_id || null;

    if (!userId && data?.subscription_id) {
      const existingSub = await prisma.subscription.findFirst({
        where: { subscriptionId: data.subscription_id },
      });
      if (existingSub) {
        userId = existingSub.userId;
      }
    }

    if (!userId && data?.customer?.email) {
      const userByEmail = await prisma.user.findUnique({
        where: { email: data.customer.email },
      });
      if (userByEmail) {
        userId = userByEmail.id;
      }
    }

    if (!userId) {
      console.warn(`[DODO_WEBHOOK] No user found for event ${type} (subscription: ${data?.subscription_id})`);
      if (eventId) {
        await prisma.processedWebhook.create({
          data: { id: eventId, eventType: String(type) },
        });
      }
      return NextResponse.json({ received: true, note: "User not found" });
    }

    const planInfo = resolvePlan(data);
    const subscriptionId = data?.subscription_id || null;
    const paymentId = data?.payment_id || null;

    // 3. Handle the 9 Subscription Lifecycle Events
    switch (type) {
      case "payment.succeeded": {
        // 1. Extract product ID from the payment event
        const paymentProductId =
          data?.product_id ||
          (Array.isArray(data?.product_cart) && data.product_cart[0]?.product_id) ||
          data?.line_items?.[0]?.product_id;

        // 2. Reject/ignore if the payment does NOT correspond to either Plugd Pro product
        const isMonthlyPro = paymentProductId === DODO_PRODUCT_IDS.MONTHLY;
        const isYearlyPro = paymentProductId === DODO_PRODUCT_IDS.YEARLY;

        if (!isMonthlyPro && !isYearlyPro) {
          console.log(`[DODO_WEBHOOK] Ignored payment.succeeded for non-Plugd-Pro product: ${paymentProductId || "unknown"}`);
          if (eventId) {
            await prisma.processedWebhook.create({
              data: { id: eventId, eventType: String(type) },
            });
          }
          return NextResponse.json({
            received: true,
            note: "Ignored non-Plugd-Pro payment",
          });
        }

        // 3. Check for subscription association and exact billing cycle information
        const paymentSubId = data?.subscription_id || null;
        const rawExpiry = data?.next_billing_date || data?.expires_at || data?.current_period_end;
        let expiresAt: Date | null = null;
        if (rawExpiry) {
          const parsed = new Date(rawExpiry);
          if (!isNaN(parsed.getTime())) {
            expiresAt = parsed;
          }
        }

        // 4. If payment.succeeded does not contain enough subscription period information,
        // do not invent a fake expiration date. Record paymentId on existing subscription if present,
        // and leave activation/dates to subscription.active / subscription.renewed / subscription.updated.
        if (!expiresAt) {
          if (paymentId) {
            await prisma.subscription.updateMany({
              where: { userId },
              data: {
                paymentId,
                ...(paymentSubId ? { subscriptionId: paymentSubId } : {}),
              },
            });
          }

          console.log(
            `[DODO_WEBHOOK] payment.succeeded recorded for Pro product ${paymentProductId}. Awaiting subscription.active / renewed for billing dates.`
          );
          break;
        }

        // 5. If exact billing period information is present:
        const plan = isYearlyPro ? "YEARLY" : "MONTHLY";
        const amount = isYearlyPro ? 299 : 39;

        await prisma.$transaction([
          prisma.subscription.upsert({
            where: { userId },
            update: {
              plan,
              status: "ACTIVE",
              amount,
              currency: "INR",
              paymentId: paymentId ?? undefined,
              subscriptionId: paymentSubId ?? undefined,
              expiresAt,
            },
            create: {
              userId,
              plan,
              status: "ACTIVE",
              amount,
              currency: "INR",
              paymentId,
              subscriptionId: paymentSubId,
              expiresAt,
            },
          }),
          prisma.user.update({
            where: { id: userId },
            data: { isPublic: true },
          }),
        ]);
        break;
      }

      case "subscription.active":
      case "subscription.renewed": {
        const expiresAt = resolveExpiresAt(data, planInfo.plan);

        await prisma.$transaction([
          prisma.subscription.upsert({
            where: { userId },
            update: {
              plan: planInfo.plan,
              status: "ACTIVE",
              amount: planInfo.amount,
              currency: "INR",
              paymentId: paymentId ?? undefined,
              subscriptionId: subscriptionId ?? undefined,
              expiresAt,
            },
            create: {
              userId,
              plan: planInfo.plan,
              status: "ACTIVE",
              amount: planInfo.amount,
              currency: "INR",
              paymentId,
              subscriptionId,
              expiresAt,
            },
          }),
          prisma.user.update({
            where: { id: userId },
            data: { isPublic: true },
          }),
        ]);
        break;
      }

      case "subscription.plan_changed": {
        const expiresAt = resolveExpiresAt(data, planInfo.plan);

        await prisma.$transaction([
          prisma.subscription.upsert({
            where: { userId },
            update: {
              plan: planInfo.plan,
              status: "ACTIVE",
              amount: planInfo.amount,
              currency: "INR",
              subscriptionId: subscriptionId ?? undefined,
              expiresAt,
            },
            create: {
              userId,
              plan: planInfo.plan,
              status: "ACTIVE",
              amount: planInfo.amount,
              currency: "INR",
              subscriptionId,
              expiresAt,
            },
          }),
          prisma.user.update({
            where: { id: userId },
            data: { isPublic: true },
          }),
        ]);
        break;
      }

      case "subscription.updated": {
        const dodoStatus = String(data?.status || "").toLowerCase();
        const expiresAt = resolveExpiresAt(data, planInfo.plan);
        const hasTimeLeft = expiresAt.getTime() > Date.now();

        if (dodoStatus === "active") {
          await prisma.$transaction([
            prisma.subscription.upsert({
              where: { userId },
              update: {
                plan: planInfo.plan,
                status: "ACTIVE",
                amount: planInfo.amount,
                subscriptionId: subscriptionId ?? undefined,
                expiresAt,
              },
              create: {
                userId,
                plan: planInfo.plan,
                status: "ACTIVE",
                amount: planInfo.amount,
                currency: "INR",
                subscriptionId,
                expiresAt,
              },
            }),
            prisma.user.update({
              where: { id: userId },
              data: { isPublic: true },
            }),
          ]);
        } else if (dodoStatus === "cancelled") {
          // If cancelled but paid period hasn't ended yet, preserve access until expiresAt
          await prisma.$transaction([
            prisma.subscription.updateMany({
              where: { userId },
              data: {
                status: "CANCELLED",
                expiresAt,
              },
            }),
            prisma.user.update({
              where: { id: userId },
              data: { isPublic: hasTimeLeft },
            }),
          ]);
        } else if (dodoStatus === "expired") {
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
        } else if (dodoStatus === "on_hold" || dodoStatus === "failed") {
          await prisma.$transaction([
            prisma.subscription.updateMany({
              where: { userId },
              data: { status: "ON_HOLD" },
            }),
            prisma.user.update({
              where: { id: userId },
              data: { isPublic: hasTimeLeft },
            }),
          ]);
        }
        break;
      }

      case "subscription.cancelled": {
        // CANCELLATION BEHAVIOR:
        // Do NOT make wishlist private immediately if Dodo indicates subscription remains active until expiresAt.
        const expiresAt = resolveExpiresAt(data, planInfo.plan);
        const hasTimeLeft = expiresAt.getTime() > Date.now();

        await prisma.$transaction([
          prisma.subscription.updateMany({
            where: { userId },
            data: {
              status: "CANCELLED",
              expiresAt,
            },
          }),
          prisma.user.update({
            where: { id: userId },
            data: { isPublic: hasTimeLeft },
          }),
        ]);
        break;
      }

      case "subscription.on_hold":
      case "subscription.failed": {
        const expiresAt = resolveExpiresAt(data, planInfo.plan);
        const hasTimeLeft = expiresAt.getTime() > Date.now();

        await prisma.$transaction([
          prisma.subscription.updateMany({
            where: { userId },
            data: {
              status: "ON_HOLD",
              expiresAt,
            },
          }),
          prisma.user.update({
            where: { id: userId },
            data: { isPublic: hasTimeLeft },
          }),
        ]);
        break;
      }

      case "subscription.expired": {
        // Paid period has ended. Revoke public sharing; preserve all wishlist data.
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
        break;
      }

      default:
        console.log(`[DODO_WEBHOOK] Unhandled event type: ${type}`);
        break;
    }

    // 4. Record event as successfully processed for idempotency
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
    console.error("[DODO_WEBHOOK_VERIFICATION_ERROR]", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Webhook processing or verification failed" },
      { status: 400 }
    );
  }
}
