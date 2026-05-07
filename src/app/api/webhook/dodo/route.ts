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
      const metadata = payment.metadata || {};
      const accountId = metadata.metadata_accountId || metadata.accountId;
      const claimHandle = metadata.metadata_claimHandle || metadata.claimHandle;

      if (claimHandle) {
        // Handle Claim Flow
        const account = await prisma.account.findFirst({
          where: {
            xHandle: {
              equals: claimHandle,
              mode: "insensitive",
            },
          },
        });

        if (!account) {
          console.error(`Account not found for claim: ${claimHandle}`);
          return NextResponse.json({ error: "Account not found" }, { status: 404 });
        }

        await prisma.account.update({
          where: { id: account.id },
          data: {
            status: "paid",
            paid: true,
            isClaimed: true,
            email: payment.customer.email,
            paymentId: payment.payment_id
          }
        });
        console.log(`Account ${claimHandle} successfully claimed by ${payment.customer.email}`);
      } else if (accountId) {
        // Handle New Account Flow
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

        await prisma.account.update({
          where: { id: parseInt(accountId) },
          data: { 
            status: "paid",
            paid: true,
            isClaimed: true,
            paymentId: payment.payment_id
          },
        });
        console.log(`Account ${accountId} successfully marked as paid.`);
      } else {
        console.error("No accountId or claimHandle found in metadata", metadata);
        return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook verification failed" }, { status: 401 });
  }
}
