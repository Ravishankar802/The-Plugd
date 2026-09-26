import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { dodoClient, DODO_PRODUCT_IDS, isDodoConfigured } from "@/lib/dodopayments";
import { MONETIZATION_PLANS, calculateExpirationDate } from "@/lib/subscription";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const session = await getSession();

  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const planKey = (body.plan || "MONTHLY").toUpperCase() as "MONTHLY" | "YEARLY";

    if (planKey !== "MONTHLY" && planKey !== "YEARLY") {
      return NextResponse.json({ error: "Invalid plan selected" }, { status: 400 });
    }

    const planConfig = MONETIZATION_PLANS[planKey];

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: { subscription: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const returnUrl = `${origin}/api/subscription/callback?plan=${planKey}&userId=${user.id}`;

    // If Dodo Payments is configured with product IDs and API key, call Dodo API
    if (isDodoConfigured()) {
      try {
        const productId = DODO_PRODUCT_IDS[planKey];

        if (productId) {
          const checkoutSession = await dodoClient.checkoutSessions.create({
            product_cart: [
              {
                product_id: productId,
                quantity: 1,
              },
            ],
            customer: {
              email: user.email,
              name: user.displayName || user.username || "User",
            },
            return_url: `${returnUrl}&session_id={CHECKOUT_SESSION_ID}`,
            metadata: {
              userId: user.id,
              plan: planKey,
              username: user.username || "",
            },
          });

          if (checkoutSession.checkout_url) {
            return NextResponse.json({
              checkoutUrl: checkoutSession.checkout_url,
              sessionId: checkoutSession.session_id,
            });
          }
        }
      } catch (dodoError: any) {
        console.warn("[DODO_PAYMENTS_CHECKOUT_ERROR]", dodoError.message);
        if (process.env.NODE_ENV === "production" && process.env.DODO_PAYMENTS_MODE !== "test") {
          return NextResponse.json(
            { error: "Payment checkout initialization failed. Please try again shortly." },
            { status: 502 }
          );
        }
      }
    }

    // Strictly restrict fallback to development / sandbox testing:
    // It can NEVER accidentally grant production Pro access without a real Dodo payment.
    const isDevelopmentOrTest =
      process.env.NODE_ENV !== "production" ||
      process.env.DODO_PAYMENTS_MODE === "test";

    if (!isDevelopmentOrTest) {
      return NextResponse.json(
        { error: "Dodo Payments is not configured for live checkout. Please configure DODO_PAYMENTS_API_KEY." },
        { status: 503 }
      );
    }

    // Direct Dev / Sandbox mode simulation:
    const expiresAt = calculateExpirationDate(planKey);

    await prisma.$transaction([
      prisma.subscription.upsert({
        where: { userId: user.id },
        update: {
          plan: planKey,
          status: "ACTIVE",
          amount: planConfig.price,
          currency: "INR",
          expiresAt,
        },
        create: {
          userId: user.id,
          plan: planKey,
          status: "ACTIVE",
          amount: planConfig.price,
          currency: "INR",
          expiresAt,
        },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: { isPublic: true },
      }),
    ]);

    const username = user.username || "";
    return NextResponse.json({
      success: true,
      activated: true,
      redirectUrl: username ? `/@${username}?upgraded=true` : `/profile?upgraded=true`,
      message: `Your wishlist is now public on the ${planConfig.name} plan!`,
    });
  } catch (error: any) {
    console.error("[SUBSCRIPTION_CHECKOUT_ERROR]", error);
    return NextResponse.json(
      { error: error?.message || "Failed to initiate subscription checkout" },
      { status: 500 }
    );
  }
}
