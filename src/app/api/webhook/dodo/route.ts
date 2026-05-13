import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import DodoPayments from "dodopayments";

function generateReferralCode(email: string) {
  const base = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
  const random = Math.random().toString(36).substring(2, 6);
  return `${base}-${random}`;
}

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

    const event = dodo.webhooks.unwrap(body, {
      headers,
      key: webhookSecret,
    });

    console.log("Webhook event received:", event.type);

    if (event.type === "payment.succeeded") {
      const payment = event.data;
      const metadata = payment.metadata || {};
      const type = metadata.metadata_type || metadata.type;
      
      // 1. Handle Promoter Payment ($1)
      if (type === "promoter") {
        const email = metadata.metadata_email || metadata.email || payment.customer.email;
        
        await prisma.promoter.upsert({
          where: { email },
          create: {
            email,
            name: metadata.metadata_name || email.split("@")[0],
            xHandle: metadata.metadata_xHandle || null,
            referralCode: generateReferralCode(email),
            payoutMethod: metadata.metadata_payoutMethod || null,
            payoutDetails: metadata.metadata_payoutDetails || null,
            totalEarned: 0,
            pendingPayout: 0,
            totalClicks: 0,
            totalConversions: 0
          },
          update: {} // Already a promoter, just record payment was successful if needed
        });
        
        console.log(`Promoter ${email} successfully joined the program.`);
        return NextResponse.json({ success: true });
      }

      // 2. Handle Account Payment ($2) - Existing Logic + Referral Tracking
      const accountId = metadata.metadata_accountId || metadata.accountId;
      const claimHandle = metadata.metadata_claimHandle || metadata.claimHandle;
      const referralCode = metadata.metadata_referralCode || metadata.referralCode;

      let account;
      if (claimHandle) {
        account = await prisma.account.findFirst({
          where: { xHandle: { equals: claimHandle, mode: "insensitive" } },
        });
      } else if (accountId) {
        account = await prisma.account.findUnique({
          where: { id: parseInt(accountId) },
        });
      }

      if (!account) {
        console.error(`Account not found for payment: ${accountId || claimHandle}`);
        return NextResponse.json({ error: "Account not found" }, { status: 404 });
      }

      if (!account.paid) {
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
        console.log(`Account ${account.xHandle} successfully marked as paid.`);

        // Handle Referral Credit Logic
        if (referralCode) {
          const promoter = await prisma.promoter.findUnique({
            where: { referralCode }
          });
          
          if (promoter) {
            await prisma.$transaction([
              prisma.promoter.update({
                where: { id: promoter.id },
                data: {
                  totalEarned: { increment: 1.0 },
                  pendingPayout: { increment: 1.0 },
                  totalConversions: { increment: 1 }
                }
              }),
              prisma.referral.create({
                data: {
                  referralCode: referralCode,
                  promoterEmail: promoter.email,
                  status: "converted",
                  amountEarned: 1.0,
                  paymentId: payment.payment_id,
                  convertedAt: new Date()
                }
              })
            ]);
            console.log(`Referral credited to promoter: ${promoter.email}`);
          }
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook verification failed" }, { status: 401 });
  }
}
