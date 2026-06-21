import { NextResponse } from "next/server";
import DodoPayments from "dodopayments";

const dodo = new DodoPayments({
  bearerToken: process.env.DODO_API_KEY || "",
});

export async function POST(req: Request) {
  try {
    const { email, name, metadata, country, tier } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    let productId = "";
    if (tier === "STARTER") {
      productId = process.env.NEXT_PUBLIC_DODO_STARTER_PRODUCT_ID || process.env.NEXT_PUBLIC_DODO_PROMOTER_PRODUCT_ID || "";
    } else if (tier === "PRO") {
      productId = process.env.NEXT_PUBLIC_DODO_PRO_PRODUCT_ID || process.env.NEXT_PUBLIC_DODO_PROMOTER_PRODUCT_ID || "";
    } else if (tier === "MAX") {
      productId = process.env.NEXT_PUBLIC_DODO_MAX_PRODUCT_ID || process.env.NEXT_PUBLIC_DODO_PROMOTER_PRODUCT_ID || "";
    } else {
      productId = process.env.NEXT_PUBLIC_DODO_PROMOTER_PRODUCT_ID || "";
    }

    if (!productId) {
      return NextResponse.json({ error: "Product ID not configured" }, { status: 500 });
    }

    const updatedMetadata = {
      ...metadata,
      metadata_tier: tier || "STARTER",
      tier: tier || "STARTER"
    };

    const session = await dodo.checkoutSessions.create({
      product_cart: [
        {
          product_id: productId,
          quantity: 1,
        },
      ],
      customer: {
        email,
        name: name || undefined,
      },
      billing_address: country ? { country: country.toUpperCase() } : undefined,
      billing_currency: country?.toUpperCase() === "IN" ? "INR" : undefined,
      metadata: updatedMetadata,
      feature_flags: {
        allow_discount_code: false,
      },
      return_url: "https://theplugd.com/vault",
    });

    return NextResponse.json({ checkoutUrl: session.checkout_url });
  } catch (error: any) {
    console.error("Failed to create Dodo Payments checkout session:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
