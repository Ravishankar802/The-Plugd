import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import DodoPayments from "dodopayments";
import { PromoterTier } from "@prisma/client";

function generateReferralCode(email: string) {
  const base = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
  const random = Math.random().toString(36).substring(2, 6);
  return `${base}-${random}`;
}

function calculateCommission(referrerTier: PromoterTier, purchasedTier: PromoterTier): number {
  if (referrerTier === PromoterTier.PRO) {
    if (purchasedTier === PromoterTier.STARTER) return 100.0;
    return 250.0;
  }
  if (referrerTier === PromoterTier.MAX) {
    if (purchasedTier === PromoterTier.STARTER) return 100.0;
    if (purchasedTier === PromoterTier.PRO) return 250.0;
    return 500.0;
  }
  return 100.0;
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

    if (event.type === "payment.succeeded") {
      const payment = event.data;
      const metadata = payment.metadata || {};
      const type = metadata.metadata_type || metadata.type;
      
      // 1. Handle Promoter Payment ($1)
      if (type === "promoter") {
        const email = metadata.metadata_email || metadata.email || payment.customer.email;
        const referralCode = metadata.metadata_referralCode || metadata.referralCode;
        const username = metadata.metadata_username || null;
        
        const paymentAny = payment as any;
        const productId = paymentAny.product_id || (paymentAny.product_cart && paymentAny.product_cart[0]?.product_id);
        let selectedTier: PromoterTier = PromoterTier.STARTER;

        const starterId = process.env.NEXT_PUBLIC_DODO_STARTER_PRODUCT_ID || "pdt_0Nejljx2mdXJSOgzLprt5";
        const proId = process.env.NEXT_PUBLIC_DODO_PRO_PRODUCT_ID || "pdt_0NhVMNBBsEQWhalkkliJE";
        const maxId = process.env.NEXT_PUBLIC_DODO_MAX_PRODUCT_ID || "pdt_0NhVMasO6TQwK4pK427wT";

        if (
          productId === starterId || 
          productId === "pdt_0Nejljx2mdXJSOgzLprt5" || 
          productId === "pdt_0NejIjx2mdXJSOgzLprt5"
        ) {
          selectedTier = PromoterTier.STARTER;
        } else if (productId === proId || productId === "pdt_0NhVMNBBsEQWhalkkliJE") {
          selectedTier = PromoterTier.PRO;
        } else if (productId === maxId || productId === "pdt_0NhVMasO6TQwK4pK427wT") {
          selectedTier = PromoterTier.MAX;
        } else {
          const rawTier = metadata.metadata_tier || metadata.tier || "STARTER";
          selectedTier = (rawTier === "PRO" || rawTier === "MAX") ? (rawTier as PromoterTier) : PromoterTier.STARTER;
        }

        await prisma.promoter.upsert({
          where: { email },
          create: {
            email,
            name: metadata.metadata_name || email.split("@")[0],
            xHandle: metadata.metadata_xHandle || null,
            username,
            referralCode: username || generateReferralCode(email),
            tier: selectedTier,
            phoneNumber: metadata.metadata_phoneNumber || metadata.phoneNumber || null,
            payoutMethod: metadata.metadata_payoutMethod || null,
            payoutDetails: metadata.metadata_payoutDetails || null,
            payoutRegion: metadata.metadata_payoutRegion || null,
            upiId: metadata.metadata_upiId || null,
            bankAccountName: metadata.metadata_bankAccountName || null,
            bankAccountNumber: metadata.metadata_bankAccountNumber || null,
            bankIfsc: metadata.metadata_bankIfsc || null,
            intlAccountHolderName: metadata.metadata_intlAccountHolderName || null,
            intlRoutingNumber: metadata.metadata_intlRoutingNumber || null,
            intlAccountNumber: metadata.metadata_intlAccountNumber || null,
            intlSortCode: metadata.metadata_intlSortCode || null,
            intlIban: metadata.metadata_intlIban || null,
            intlBicSwift: metadata.metadata_intlBicSwift || null,
            intlBsbCode: metadata.metadata_intlBsbCode || null,
            intlTransitNumber: metadata.metadata_intlTransitNumber || null,
            intlInstitutionNumber: metadata.metadata_intlInstitutionNumber || null,
            intlBankCountry: metadata.metadata_intlBankCountry || null,
            paypalEmail: metadata.metadata_paypalEmail || null,
            totalEarned: 0,
            pendingPayout: 0,
            totalClicks: 0,
            totalConversions: 0
          },
          update: {
            tier: selectedTier
          }
        });
        
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
            const commission = calculateCommission(referringPromoter.tier, selectedTier);

            await prisma.$transaction([
              prisma.promoter.update({
                where: { id: referringPromoter.id },
                data: {
                  totalEarned: { increment: commission },
                  pendingPayout: { increment: commission },
                  totalConversions: { increment: 1 }
                }
              }),
              prisma.referral.create({
                data: {
                  referralCode: referralCode,
                  promoterEmail: referringPromoter.email,
                  status: "converted",
                  amountEarned: commission,
                  paymentId: payment.payment_id,
                  convertedAt: new Date()
                }
              })
            ]);
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
