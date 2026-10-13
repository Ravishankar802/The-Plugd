import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { dodoClient, isDodoConfigured, getDodoCourseProductId } from "@/lib/dodopayments";
import { getOrCreateCustomer, recordCoursePurchase } from "@/lib/playbooks";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const webhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY?.trim();
    if (!webhookKey) {
      console.error("[DODO_WEBHOOK_ERROR] DODO_PAYMENTS_WEBHOOK_KEY is not configured");
      return NextResponse.json(
        { error: "Webhook signing key not configured" },
        { status: 500 }
      );
    }

    const rawBody = await req.text();
    const headers: Record<string, string> = {};
    req.headers.forEach((val, key) => {
      headers[key.toLowerCase()] = val;
    });

    let event: any;
    try {
      event = dodoClient.webhooks.unwrap(rawBody, { headers, key: webhookKey });
    } catch (sigErr: any) {
      console.error("[DODO_WEBHOOK_ERROR] Signature verification failed:", sigErr?.message || sigErr);
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 400 }
      );
    }

    const type = event?.type;
    const data = event?.data;

    const eventId = (
      req.headers.get("webhook-id") ||
      req.headers.get("x-webhook-id") ||
      event?.event_id ||
      event?.id ||
      (data?.payment_id ? `evt_${data.payment_id}` : "")
    )?.trim();

    // 1. Check for duplicate processed events
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

    // 2. Accept only the correct successful payment event type
    if (type !== "payment.succeeded") {
      if (eventId) {
        await prisma.processedWebhook.create({
          data: {
            id: eventId,
            eventType: String(type || "unknown"),
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

    // 3. Authoritative product validation (matches The Dating Playbook product ID)
    const expectedProductId = getDodoCourseProductId();
    let productMatches = false;
    const hasProductCart = Array.isArray(data.product_cart) && data.product_cart.length > 0;
    if (hasProductCart) {
      productMatches = data.product_cart.some(
        (item: any) => item?.product_id === expectedProductId && (item?.quantity ?? 1) === 1
      );
    }

    // Fallback: If product_cart is omitted from the webhook payload, perform authoritative server-side lookup
    if (!productMatches && !hasProductCart && data.payment_id && isDodoConfigured()) {
      try {
        const authoritativePayment = await dodoClient.payments.retrieve(data.payment_id);
        if (
          Array.isArray(authoritativePayment.product_cart) &&
          authoritativePayment.product_cart.some(
            (item: any) => item?.product_id === expectedProductId && (item?.quantity ?? 1) === 1
          )
        ) {
          productMatches = true;
        }
      } catch (lookupErr: any) {
        console.error("[DODO_WEBHOOK_LOOKUP_ERROR]", lookupErr?.message || lookupErr);
      }
    }

    if (!productMatches) {
      console.warn(`[DODO_WEBHOOK_REJECTED] Product ID mismatch for payment: ${data.payment_id}`);
      return NextResponse.json(
        { error: "Product mismatch" },
        { status: 400 }
      );
    }

    // 4. Currency and amount validation:
    // - For direct USD: pre-tax customer amount must equal exactly 300 cents ($3.00 USD).
    // - For Adaptive Currency: customer pays in local currency (e.g. INR), Dodo settles into the
    //   merchant's USD balance (settlement_currency === "USD"), net settlement is positive and does
    //   not exceed the $3.00 base product price plus settlement tax, and no unauthorized discount was applied.
    const paymentCurrency = data.currency?.toUpperCase();
    const totalAmount = typeof data.total_amount === "number" ? data.total_amount : 0;
    const tax = typeof data.tax === "number" ? data.tax : 0;
    const settlementCurrency = data.settlement_currency?.toUpperCase();
    const settlementAmount = typeof data.settlement_amount === "number" ? data.settlement_amount : undefined;
    const settlementTax = typeof data.settlement_tax === "number" ? data.settlement_tax : 0;
    const hasDiscount = Boolean(data.discount_id);

    // Direct USD: exactly 300 cents base price pre-tax, no unauthorized discount
    const isDirectUsd =
      !hasDiscount &&
      paymentCurrency === "USD" &&
      (totalAmount === 300 || (totalAmount > 300 && totalAmount - tax === 300));

    // Adaptive Currency: settled in USD for the fixed $3.00 catalog product, positive settlement, no discount
    const isAdaptiveSettlement =
      !hasDiscount &&
      settlementCurrency === "USD" &&
      totalAmount > 0 &&
      settlementAmount !== undefined &&
      settlementAmount > 0 &&
      settlementAmount <= 300 + settlementTax;

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
      console.warn(
        `[DODO_WEBHOOK_REJECTED] Amount mismatch: total_amount=${totalAmount}, tax=${tax}, settlement_amount=${settlementAmount}, hasDiscount=${hasDiscount}`
      );
      return NextResponse.json(
        { error: "Amount mismatch" },
        { status: 400 }
      );
    }

    // 6. Metadata and course validation (must specifically target 'men' without defaulting)
    const metadata = data.metadata || {};
    const courseSlug = metadata.courseSlug?.toLowerCase();
    if (courseSlug !== "men") {
      console.warn(`[DODO_WEBHOOK_REJECTED] Invalid or missing courseSlug metadata: ${courseSlug}`);
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

    // 7. Customer validation
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

    // 8. Atomic database fulfillment with transaction
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
          courseSlug: "men",
          amount: 3.0,
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
    } catch (fulfillmentError: any) {
      // 1. Cross-account payment reuse or invalid client state
      if (fulfillmentError?.message?.includes("Payment ID already associated with another customer account")) {
        console.warn("[DODO_WEBHOOK_REJECTED]", fulfillmentError.message);
        return NextResponse.json(
          { error: fulfillmentError.message },
          { status: 400 }
        );
      }

      // 2. Concurrency handling: If a concurrent delivery won the race, handle P2002 gracefully.
      // Confirm that the corresponding event or purchase was actually committed before treating as duplicate.
      if (fulfillmentError?.code === "P2002") {
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

      console.error("[DODO_WEBHOOK_FULFILLMENT_ERROR]", fulfillmentError?.message || fulfillmentError);
      return NextResponse.json(
        { error: "Database fulfillment failed, please retry" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[DODO_WEBHOOK_HANDLER_ERROR]", error?.message || error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 400 }
    );
  }
}
