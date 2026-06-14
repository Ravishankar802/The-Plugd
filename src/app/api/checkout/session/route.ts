import { NextResponse } from "next/server";
import DodoPayments from "dodopayments";

const dodo = new DodoPayments({
  bearerToken: process.env.DODO_API_KEY || "",
});

export async function POST(req: Request) {
  try {
    const { email, name, metadata } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const productId = process.env.NEXT_PUBLIC_DODO_PROMOTER_PRODUCT_ID;
    if (!productId) {
      return NextResponse.json({ error: "Product ID not configured" }, { status: 500 });
    }

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
      metadata,
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
