import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import DodoPayments from "dodopayments";

export async function POST(req: Request) {
  const dodo = new DodoPayments({
    bearerToken: process.env.DODO_API_KEY || "",
  });

  const body = await req.text();
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });

  try {
    const webhookSecret = process.env.DODO_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("DODO_WEBHOOK_SECRET is not set");
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    // Verify and unwrap the event
    const event = dodo.webhooks.unwrap(body, {
      headers,
      key: webhookSecret,
    });

    console.log("Webhook event received:", event.type);

    if (event.type === "payment.succeeded") {
      const payment = event.data;
      const accountId = payment.metadata?.accountId;

      if (!accountId) {
        console.error("No accountId found in metadata");
        return NextResponse.json({ error: "Missing accountId" }, { status: 400 });
      }

      // Idempotency: Check if already paid
      const account = await prisma.account.findUnique({
        where: { id: parseInt(accountId) },
      });

      if (!account) {
        console.error(`Account not found: ${accountId}`);
        return NextResponse.json({ error: "Account not found" }, { status: 404 });
      }

      if (account.status === "paid") {
        console.log(`Account ${accountId} already marked as paid.`);
        return NextResponse.json({ success: true, message: "Already processed" });
      }

      // Update account status
      await prisma.account.update({
        where: { id: parseInt(accountId) },
        data: { 
          status: "paid",
          paid: true,
          paymentId: payment.payment_id
        },
      });

      console.log(`Account ${accountId} successfully marked as paid.`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook verification failed" }, { status: 401 });
  }
}
