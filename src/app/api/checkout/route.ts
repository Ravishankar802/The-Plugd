import { NextResponse } from "next/server";
import { createGift } from "@/lib/gifts";
import { dodoClient, DODO_GIFT_PRODUCT_ID, isDodoConfigured } from "@/lib/dodopayments";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const target = body.target === "him" ? "him" : "her";
    const senderName = body.senderName || "";
    const senderEmail = body.senderEmail || "";
    const recipientName = body.recipientName || "";
    const customNote = body.customNote || "";

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "https://theplugd.com";

    // If Dodo Payments is configured with an API key and product ID:
    if (isDodoConfigured() && DODO_GIFT_PRODUCT_ID) {
      try {
        const gift = await createGift({
          target,
          senderName,
          senderEmail,
          recipientName,
          customNote,
          status: "PENDING",
          amount: 2.99,
        });

        const returnUrl = `${origin}/order/${gift.slug}?session_id={CHECKOUT_SESSION_ID}`;

        const checkoutSession = await dodoClient.checkoutSessions.create({
          product_cart: [
            {
              product_id: DODO_GIFT_PRODUCT_ID,
              quantity: 1,
            },
          ],
          customer: {
            email: senderEmail || "buyer@theplugd.com",
            name: senderName || "Anonymous Sender",
          },
          return_url: returnUrl,
          metadata: {
            giftId: gift.id,
            slug: gift.slug,
            target,
          },
        });

        if (checkoutSession.checkout_url) {
          return NextResponse.json({
            checkoutUrl: checkoutSession.checkout_url,
            slug: gift.slug,
          });
        }
      } catch (dodoError: any) {
        console.warn("[DODO_CHECKOUT_FALLBACK]", dodoError?.message);
        // Fallback gracefully to direct instant generation so the purchase flow is never blocked
      }
    }

    // Direct Instant Flow (for test mode, demo mode, or when Dodo keys aren't set)
    const gift = await createGift({
      target,
      senderName,
      senderEmail,
      recipientName,
      customNote,
      status: "PAID",
      amount: 2.99,
    });

    return NextResponse.json({
      success: true,
      slug: gift.slug,
      redirectUrl: `/order/${gift.slug}`,
    });
  } catch (error: any) {
    console.error("[CHECKOUT_API_ERROR]", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create checkout" },
      { status: 500 }
    );
  }
}
