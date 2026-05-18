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
        const referralCode = metadata.metadata_referralCode || metadata.referralCode;
        const username = metadata.metadata_username || null;
        
        await prisma.promoter.upsert({
          where: { email },
          create: {
            email,
            name: metadata.metadata_name || email.split("@")[0],
            xHandle: metadata.metadata_xHandle || null,
            username,
            referralCode: username || generateReferralCode(email),
            payoutMethod: metadata.metadata_payoutMethod || null,
            payoutDetails: metadata.metadata_payoutDetails || null,
            payoutRegion: metadata.metadata_payoutRegion || null,
            upiId: metadata.metadata_upiId || null,
            bankAccountName: metadata.metadata_bankAccountName || null,
            bankAccountNumber: metadata.metadata_bankAccountNumber || null,
            bankIfsc: metadata.metadata_bankIfsc || null,
            intlBankAccountName: metadata.metadata_intlBankAccountName || null,
            intlBankAccountNumber: metadata.metadata_intlBankAccountNumber || null,
            intlSwiftBic: metadata.metadata_intlSwiftBic || null,
            intlBankCountry: metadata.metadata_intlBankCountry || null,
            paypalEmail: metadata.metadata_paypalEmail || null,
            totalEarned: 0,
            pendingPayout: 0,
            totalClicks: 0,
            totalConversions: 0
          },
          update: {} // Already a promoter, just record payment was successful if needed
        });
        
        console.log(`Promoter ${email} successfully joined the program.`);

        // Handle Referral Credit Logic for Promoter Signups ($2 payment)
        if (referralCode) {
          const referringPromoter = await prisma.promoter.findFirst({
            where: {
              OR: [
                { referralCode },
                { username: referralCode }
              ]
            }
          });
          
          if (referringPromoter) {
            await prisma.$transaction([
              prisma.promoter.update({
                where: { id: referringPromoter.id },
                data: {
                  totalEarned: { increment: 1.0 },
                  pendingPayout: { increment: 1.0 },
                  totalConversions: { increment: 1 }
                }
              }),
              prisma.referral.create({
                data: {
                  referralCode: referralCode,
                  promoterEmail: referringPromoter.email,
                  status: "converted",
                  amountEarned: 1.0,
                  paymentId: payment.payment_id,
                  convertedAt: new Date()
                }
              })
            ]);
            console.log(`Referral credited to promoter (for promoter signup): ${referringPromoter.email}`);
          }
        }

        return NextResponse.json({ success: true });
      }

      // 2. Account Listing Payments have been removed
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook verification failed" }, { status: 401 });
  }
}
