import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createGift } from "@/lib/gifts";
import { dodoClient, DODO_GIFT_PRODUCT_ID, isDodoConfigured } from "@/lib/dodopayments";
import {
  getOrCreateCustomer,
  getCustomerByAccessKey,
  hasCustomerPurchasedTemplate,
  recordTemplateOwnership,
  createTemplateInstance,
} from "@/lib/ownership";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const target = body.target === "him" ? "him" : "her";
    const templateId = String(body.templateId || body.mood || "after-dark").toLowerCase();
    const senderName = body.senderName || "";
    const senderEmail = (body.senderEmail || "").trim().toLowerCase();
    const recipientName = body.recipientName || "";
    const customNote = body.customNote || "";

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "https://theplugd.com";

    const cookieStore = await cookies();
    const accessKeyCookie = cookieStore.get("plugd_access_key")?.value;

    let customer = null;
    if (senderEmail) {
      customer = await getOrCreateCustomer(senderEmail);
    } else if (accessKeyCookie) {
      customer = await getCustomerByAccessKey(accessKeyCookie);
    }

    // Check if customer already owns this template
    if (customer) {
      const alreadyOwned = await hasCustomerPurchasedTemplate(customer.id, templateId);

      if (alreadyOwned) {
        // Customer already owns this template! Generate a new instance for FREE.
        const instance = await createTemplateInstance({
          customerId: customer.id,
          templateId,
          target,
          recipientName,
          senderName,
          customNote,
        });

        const res = NextResponse.json({
          alreadyOwned: true,
          message: "YOU ALREADY OWN THIS TEMPLATE",
          slug: instance.slug,
          redirectUrl: `/order/${instance.slug}?owned=true`,
        });

        res.cookies.set("plugd_access_key", customer.accessKey, {
          path: "/",
          httpOnly: false,
          maxAge: 60 * 60 * 24 * 365, // 1 year
          sameSite: "lax",
        });

        return res;
      }
    }

    // If customer doesn't exist yet, create an anonymous/unclaimed customer or customer from email
    if (!customer) {
      const fallbackEmail = senderEmail || `guest_${Date.now()}@theplugd.com`;
      customer = await getOrCreateCustomer(fallbackEmail);
    }

    // If Dodo Payments is configured:
    if (isDodoConfigured() && DODO_GIFT_PRODUCT_ID) {
      try {
        const gift = await createGift({
          target,
          mood: templateId,
          senderName,
          senderEmail: customer.email,
          recipientName,
          customNote,
          status: "PENDING",
          amount: 2.99,
          customerId: customer.id,
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
            email: customer.email,
            name: senderName || "Sender",
          },
          return_url: returnUrl,
          metadata: {
            giftId: gift.id,
            slug: gift.slug,
            target,
            templateId,
            customerId: customer.id,
            customerEmail: customer.email,
          },
        });

        if (checkoutSession.checkout_url) {
          const res = NextResponse.json({
            checkoutUrl: checkoutSession.checkout_url,
            slug: gift.slug,
          });

          res.cookies.set("plugd_access_key", customer.accessKey, {
            path: "/",
            httpOnly: false,
            maxAge: 60 * 60 * 24 * 365,
            sameSite: "lax",
          });

          return res;
        }
      } catch (dodoError: any) {
        console.warn("[DODO_CHECKOUT_FALLBACK]", dodoError?.message);
      }
    }

    // Direct Instant Flow (for test mode, demo mode, or when Dodo keys aren't set)
    // 1. Record permanent ownership of the template
    await recordTemplateOwnership({
      customerId: customer.id,
      templateId,
      amount: 2.99,
    });

    // 2. Generate the first instance
    const gift = await createGift({
      target,
      mood: templateId,
      senderName,
      senderEmail: customer.email,
      recipientName,
      customNote,
      status: "PAID",
      amount: 2.99,
      customerId: customer.id,
    });

    const res = NextResponse.json({
      success: true,
      slug: gift.slug,
      redirectUrl: `/order/${gift.slug}`,
    });

    res.cookies.set("plugd_access_key", customer.accessKey, {
      path: "/",
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });

    return res;
  } catch (error: any) {
    console.error("[CHECKOUT_API_ERROR]", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create checkout" },
      { status: 500 }
    );
  }
}
