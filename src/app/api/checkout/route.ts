import { NextResponse } from "next/server";
import DodoPayments from "dodopayments";

export async function POST(req: Request) {
  const dodo = new DodoPayments({
    bearerToken: process.env.DODO_API_KEY || "mock_key",
  });
  try {
    const { accountId } = await req.json();

    const session = await dodo.checkoutSessions.create({
      product_cart: [
        {
          product_id: process.env.DODO_PRODUCT_ID!,
          quantity: 1,
        },
      ],
      metadata: {
        accountId: accountId.toString(),
      },
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-payment?accountId=${accountId}`,
    });

    return NextResponse.json({ url: session.checkout_url });
  } catch (error) {
    console.error("POST /api/checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
