import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  dodoClient,
  isDodoConfigured,
  getDodoCourseProductId,
  getPlaybookByDodoProductId,
  type DodoPlaybookMapping,
} from "@/lib/dodopayments";
import {
  getOrCreateCustomer,
  recordCoursePurchase,
  revokeCoursePurchase,
} from "@/lib/playbooks";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const mode = process.env.DODO_PAYMENTS_MODE?.trim();
    const webhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY?.trim();

    if (!mode || (mode !== "test_mode" && mode !== "live_mode")) {
      console.error(`[DODO_WEBHOOK_ERROR] Invalid or missing DODO_PAYMENTS_MODE: "${mode}"`);
      return NextResponse.json(
        { error: "Invalid payment mode configuration" },
        { status: 500 }
      );
    }

    if (!webhookKey) {
      console.error("[DODO_WEBHOOK_ERROR] DODO_PAYMENTS_WEBHOOK_KEY is not configured");
      return NextResponse.json(
        { error: "Webhook signing key not configured" },
        { status: 500 }
      );
    }

    // Cryptographic webhook key isolation
    if (mode === "test_mode" && !webhookKey.startsWith("whsec_test_")) {
      console.error("[DODO_WEBHOOK_ERROR] Test mode requires a dedicated test webhook secret (starting with whsec_test_)");
      return NextResponse.json(
        { error: "Invalid test webhook signing key configuration" },
        { status: 500 }
      );
    }

    if (mode === "live_mode" && webhookKey.startsWith("whsec_test_")) {
      console.error("[DODO_WEBHOOK_ERROR] Live mode cannot accept a test webhook secret (starting with whsec_test_)");
      return NextResponse.json(
        { error: "Invalid live webhook signing key configuration" },
        { status: 500 }
      );
    }

    // Normalize whsec_test_ to standardwebhooks whsec_ prefix so standard Base64 decoding succeeds
    let effectiveWebhookKey = webhookKey;
    if (effectiveWebhookKey.startsWith("whsec_test_")) {
      effectiveWebhookKey = "whsec_" + effectiveWebhookKey.slice("whsec_test_".length);
    }

    const rawBody = await req.text();
    const headers: Record<string, string> = {};
    req.headers.forEach((val, key) => {
      headers[key.toLowerCase()] = val;
    });

    interface WebhookEventPayload {
      type?: string;
      event_id?: string;
      id?: string;
      data?: {
        payment_id?: string;
        currency?: string;
        total_amount?: number;
        tax?: number;
        settlement_currency?: string;
        settlement_amount?: number;
        settlement_tax?: number;
        discount_id?: string | null;
        customer?: {
          email?: string;
          name?: string;
        };
        metadata?: Record<string, string>;
        product_cart?: Array<{
          product_id?: string;
          quantity?: number;
          amount?: number;
        }>;
        [key: string]: unknown;
      };
      [key: string]: unknown;
    }

    let event: WebhookEventPayload | null = null;
    try {
      event = dodoClient.webhooks.unwrap(rawBody, { headers, key: effectiveWebhookKey }) as unknown as WebhookEventPayload;
    } catch (sigErr: unknown) {
      const errorMsg = sigErr instanceof Error ? sigErr.message : String(sigErr);
      console.error("[DODO_WEBHOOK_ERROR] Signature verification failed:", errorMsg);
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 400 }
      );
    }

    const type = String(event?.type || "");
    const data = event?.data;

    const eventId = (
      req.headers.get("webhook-id") ||
      req.headers.get("x-webhook-id") ||
      event?.event_id ||
      event?.id ||
      (data?.payment_id ? `evt_${type}_${data.payment_id}` : "")
    )?.trim();

    // 1. Check for duplicate processed events (Idempotency)
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

    // 2. Handle Refund Succeeded -> Revoke Access
    if (type === "refund.succeeded") {
      const refundPaymentId = data?.payment_id;
      if (refundPaymentId) {
        try {
          await revokeCoursePurchase({ paymentId: refundPaymentId, reason: "REFUNDED" });
          console.info(`[DODO_WEBHOOK_REFUND] Access revoked for refunded payment: ${refundPaymentId}`);
        } catch (revokeErr: unknown) {
          const errorMsg = revokeErr instanceof Error ? revokeErr.message : String(revokeErr);
          console.error("[DODO_WEBHOOK_REFUND_ERROR]", errorMsg);
        }
      }
      if (eventId) {
        await prisma.processedWebhook.create({
          data: {
            id: eventId,
            eventType: type,
          },
        }).catch(() => {});
      }
      return NextResponse.json(
        { success: true, message: "Refund processed, access revoked" },
        { status: 200 }
      );
    }

    // 3. Handle Dispute Lost -> Revoke Access
    if (type === "dispute.lost") {
      const disputePaymentId = data?.payment_id;
      if (disputePaymentId) {
        try {
          await revokeCoursePurchase({ paymentId: disputePaymentId, reason: "DISPUTED" });
          console.info(`[DODO_WEBHOOK_DISPUTE_LOST] Access revoked for lost dispute on payment: ${disputePaymentId}`);
        } catch (revokeErr: unknown) {
          const errorMsg = revokeErr instanceof Error ? revokeErr.message : String(revokeErr);
          console.error("[DODO_WEBHOOK_DISPUTE_ERROR]", errorMsg);
        }
      }
      if (eventId) {
        await prisma.processedWebhook.create({
          data: {
            id: eventId,
            eventType: type,
          },
        }).catch(() => {});
      }
      return NextResponse.json(
        { success: true, message: "Dispute lost, access revoked" },
        { status: 200 }
      );
    }

    // 4. Handle other dispute or non-terminal events
    if (
      type.startsWith("dispute.") ||
      type === "refund.failed" ||
      type === "payment.failed" ||
      type === "payment.cancelled" ||
      type === "payment.processing"
    ) {
      if (eventId) {
        await prisma.processedWebhook.create({
          data: {
            id: eventId,
            eventType: type,
          },
        }).catch(() => {});
      }
      return NextResponse.json(
        { received: true, status: type },
        { status: 200 }
      );
    }

    // 5. Isolate subscription events (Playbooks are strictly one-time lifetime access)
    if (type.startsWith("subscription.")) {
      if (eventId) {
        await prisma.processedWebhook.create({
          data: {
            id: eventId,
            eventType: type,
          },
        }).catch(() => {});
      }
      return NextResponse.json(
        { received: true, ignored: true, reason: "Subscription events isolated from playbooks" },
        { status: 200 }
      );
    }

    // 6. Only continue fulfillment for payment.succeeded
    if (type !== "payment.succeeded") {
      if (eventId) {
        await prisma.processedWebhook.create({
          data: {
            id: eventId,
            eventType: type,
          },
        }).catch(() => {});
      }
      return NextResponse.json(
        { received: true, ignored: true },
        { status: 200 }
      );
    }

    if (!data) {
      console.warn("[DODO_WEBHOOK_REJECTED] Missing event data");
      return NextResponse.json(
        { error: "Missing event data" },
        { status: 400 }
      );
    }

    // 7. Resolve Playbook from product_cart or authoritative payment lookup
    let matchedPlaybook: DodoPlaybookMapping | null = null;
    let isLegacyDatingPlaybook = false;

    const productCart = data.product_cart;
    if (Array.isArray(productCart) && productCart.length > 0) {
      for (const item of productCart) {
        if ((item?.quantity ?? 1) === 1) {
          const prodId = item?.product_id;
          if (prodId) {
            const mapping = getPlaybookByDodoProductId(prodId);
            if (mapping) {
              matchedPlaybook = mapping;
              break;
            }
            if (mode !== "test_mode" && prodId === getDodoCourseProductId()) {
              isLegacyDatingPlaybook = true;
              break;
            }
          }
        }
      }
    } else if (data.payment_id && isDodoConfigured()) {
      // Fallback: ONLY when product_cart is omitted from the webhook payload, perform authoritative server lookup
      try {
        const authoritativePayment = await dodoClient.payments.retrieve(data.payment_id);
        if (Array.isArray(authoritativePayment.product_cart)) {
          for (const item of authoritativePayment.product_cart) {
            if ((item?.quantity ?? 1) === 1) {
              const prodId = item?.product_id;
              if (prodId) {
                const mapping = getPlaybookByDodoProductId(prodId);
                if (mapping) {
                  matchedPlaybook = mapping;
                  break;
                }
                if (mode !== "test_mode" && prodId === getDodoCourseProductId()) {
                  isLegacyDatingPlaybook = true;
                  break;
                }
              }
            }
          }
        }
      } catch (lookupErr: unknown) {
        const errorMsg = lookupErr instanceof Error ? lookupErr.message : String(lookupErr);
        console.error("[DODO_WEBHOOK_LOOKUP_ERROR]", errorMsg);
      }
    }

    if (!matchedPlaybook && !isLegacyDatingPlaybook) {
      console.warn(`[DODO_WEBHOOK_REJECTED] Product ID mismatch for payment: ${data.payment_id}`);
      return NextResponse.json(
        { error: "Product mismatch" },
        { status: 400 }
      );
    }

    // 8. Metadata and course validation
    const metadata = (data.metadata || {}) as Record<string, string>;
    const metadataCourseSlug = metadata.courseSlug?.toLowerCase();

    if (isLegacyDatingPlaybook) {
      if (metadataCourseSlug !== "men") {
        console.warn(`[DODO_WEBHOOK_REJECTED] Invalid or missing courseSlug metadata: ${metadataCourseSlug}`);
        return NextResponse.json(
          { error: "Invalid course metadata" },
          { status: 400 }
        );
      }
      if (metadata.amount && metadata.amount !== "3.00") {
        console.warn(`[DODO_WEBHOOK_REJECTED] Metadata amount mismatch: ${metadata.amount}`);
        return NextResponse.json(
          { error: "Amount mismatch" },
          { status: 400 }
        );
      }
    } else if (matchedPlaybook) {
      if (
        metadataCourseSlug &&
        metadataCourseSlug !== matchedPlaybook.slug.toLowerCase() &&
        metadataCourseSlug !== matchedPlaybook.playbookId.toLowerCase()
      ) {
        console.warn(`[DODO_WEBHOOK_REJECTED] Invalid courseSlug metadata: ${metadataCourseSlug}`);
        return NextResponse.json(
          { error: "Invalid course metadata" },
          { status: 400 }
        );
      }
      if (metadata.amount && metadata.amount !== matchedPlaybook.sellingPriceDollars.toFixed(2)) {
        console.warn(`[DODO_WEBHOOK_REJECTED] Metadata amount mismatch: ${metadata.amount}`);
        return NextResponse.json(
          { error: "Amount mismatch" },
          { status: 400 }
        );
      }
    }

    // Determine target course slug, expected amount, and pricing tier
    const targetCourseSlug = matchedPlaybook ? matchedPlaybook.slug : "men";
    const expectedCents = matchedPlaybook ? matchedPlaybook.sellingPriceCents : 300;
    const sellingPriceDollars = matchedPlaybook ? matchedPlaybook.sellingPriceDollars : 3.0;

    // 9. Currency and amount validation:
    // - For direct USD: pre-tax customer amount must equal expected discounted cents ($1-$5 USD).
    // - For Adaptive Currency: customer pays in local currency (e.g. INR), Dodo settles into the
    //   merchant's USD balance (settlement_currency === "USD"), net settlement is positive and does
    //   not exceed the expected base product price plus settlement tax, and no unauthorized coupon discount was applied.
    const paymentCurrency = data.currency?.toUpperCase();
    const totalAmount = typeof data.total_amount === "number" ? data.total_amount : 0;
    const tax = typeof data.tax === "number" ? data.tax : 0;
    const settlementCurrency = data.settlement_currency?.toUpperCase();
    const settlementAmount = typeof data.settlement_amount === "number" ? data.settlement_amount : undefined;
    const settlementTax = typeof data.settlement_tax === "number" ? data.settlement_tax : 0;
    const hasDiscount = Boolean(data.discount_id);

    // Direct USD: exact base price pre-tax, no unauthorized discount coupon
    const isDirectUsd =
      !hasDiscount &&
      paymentCurrency === "USD" &&
      (totalAmount === expectedCents || (totalAmount > expectedCents && totalAmount - tax === expectedCents));

    // Adaptive Currency: settled in USD for the catalog product.
    // Dodo applies a tiered conversion fee (4% for transactions under $500, deducted in inclusive mode),
    // plus intra-day FX market fluctuation spread. Setting a defensible floor of 80% of expected base price
    // accommodates Dodo's 4% fee and up to a 16% exchange rate variance/buffer, while strictly blocking
    // underpayment or micro-settlement attacks.
    const minAdaptiveSettlement = Math.floor(expectedCents * 0.80);
    const isAdaptiveSettlement =
      !hasDiscount &&
      settlementCurrency === "USD" &&
      totalAmount > 0 &&
      settlementAmount !== undefined &&
      settlementAmount >= minAdaptiveSettlement &&
      settlementAmount <= expectedCents + settlementTax;

    if (!isDirectUsd && !isAdaptiveSettlement) {
      if (paymentCurrency !== "USD" && settlementCurrency !== "USD") {
        console.warn(
          `[DODO_WEBHOOK_REJECTED] Currency mismatch: currency=${paymentCurrency}, settlement_currency=${settlementCurrency}`
        );
        return NextResponse.json(
          { error: "Currency mismatch" },
          { status: 400 }
        );
      }
      // Flag underpayment or uncertain settlement for manual review; fail closed without automated entitlement
      console.warn(
        `[DODO_WEBHOOK_FLAGGED_UNDERPAYMENT] Payment ${data.payment_id} for ${targetCourseSlug} settled outside verified boundary: total_amount=${totalAmount} ${paymentCurrency}, tax=${tax}, settlement_amount=${settlementAmount} ${settlementCurrency}, settlement_tax=${settlementTax}, expected=${expectedCents}, minRequired=${minAdaptiveSettlement}, hasDiscount=${hasDiscount}. Access withheld for safety.`
      );
      return NextResponse.json(
        { error: "Amount mismatch", detail: "Settlement amount outside verified threshold; withheld for manual review" },
        { status: 400 }
      );
    }

    // 9. Customer validation
    const customerEmail = (data.customer?.email || metadata.customerEmail || "").trim().toLowerCase();
    if (!customerEmail || !customerEmail.includes("@")) {
      console.warn("[DODO_WEBHOOK_REJECTED] Missing or invalid customer email");
      return NextResponse.json(
        { error: "Missing required customer email" },
        { status: 400 }
      );
    }

    const paymentId = data.payment_id;
    if (!paymentId) {
      console.warn("[DODO_WEBHOOK_REJECTED] Missing payment_id");
      return NextResponse.json(
        { error: "Missing payment ID" },
        { status: 400 }
      );
    }

    // 10. Atomic database fulfillment with transaction
    try {
      await prisma.$transaction(async (tx) => {
        // Re-check eventId inside transaction to prevent concurrent duplicate delivery race conditions
        if (eventId) {
          const existingInTx = await tx.processedWebhook.findUnique({
            where: { id: eventId },
          });
          if (existingInTx) {
            return;
          }
        }

        const customer = await getOrCreateCustomer(customerEmail, tx);

        await recordCoursePurchase({
          customerId: customer.id,
          courseSlug: targetCourseSlug,
          amount: sellingPriceDollars,
          paymentId,
          client: tx,
        });

        if (eventId) {
          await tx.processedWebhook.create({
            data: {
              id: eventId,
              eventType: String(type),
            },
          });
        }
      });
    } catch (fulfillmentError: unknown) {
      const errorMsg = fulfillmentError instanceof Error ? fulfillmentError.message : String(fulfillmentError);
      const errorCode = (fulfillmentError as { code?: string })?.code;

      // 1. Cross-account payment reuse or invalid client state
      if (errorMsg.includes("Payment ID already associated with another customer account")) {
        console.warn("[DODO_WEBHOOK_REJECTED]", errorMsg);
        return NextResponse.json(
          { error: errorMsg },
          { status: 400 }
        );
      }

      // 2. Concurrency handling: If a concurrent delivery won the race, handle P2002 gracefully.
      // Confirm that the corresponding event or purchase was actually committed before treating as duplicate.
      if (errorCode === "P2002") {
        const confirmedEvent = eventId
          ? await prisma.processedWebhook.findUnique({ where: { id: eventId } })
          : null;
        const confirmedPurchase = paymentId
          ? await prisma.coursePurchase.findFirst({ where: { paymentId } })
          : null;

        if (confirmedEvent || confirmedPurchase) {
          console.info("[DODO_WEBHOOK_CONCURRENT_DUPLICATE] Handled concurrent duplicate race condition successfully");
          return NextResponse.json(
            { success: true, message: "Duplicate webhook event already processed" },
            { status: 200 }
          );
        }
      }

      console.error("[DODO_WEBHOOK_FULFILLMENT_ERROR]", errorMsg);
      return NextResponse.json(
        { error: "Database fulfillment failed, please retry" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, playbook: targetCourseSlug });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("[DODO_WEBHOOK_HANDLER_ERROR]", errorMsg);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 400 }
    );
  }
}
