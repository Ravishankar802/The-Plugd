import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { isWishlistPublic, MONETIZATION_PLANS } from "@/lib/subscription";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();

  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: { subscription: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isPublic = isWishlistPublic(user);
    const sub = user.subscription;
    const isSubscribed = Boolean(
      sub &&
      (sub.status === "ACTIVE" || (sub.status === "CANCELLED" && sub.expiresAt)) &&
      (!sub.expiresAt || new Date(sub.expiresAt) > new Date())
    );

    return NextResponse.json({
      isPublic,
      isSubscribed,
      subscription: sub
        ? {
            id: sub.id,
            plan: sub.plan,
            status: sub.status,
            amount: sub.amount,
            currency: sub.currency,
            expiresAt: sub.expiresAt,
            planDetails: MONETIZATION_PLANS[sub.plan as "MONTHLY" | "YEARLY"] || null,
          }
        : null,
    });
  } catch (error) {
    console.error("[SUBSCRIPTION_STATUS_GET_ERROR]", error);
    return NextResponse.json({ error: "Failed to get subscription status" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await getSession();

  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { isPublic } = body;

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: { subscription: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Only users with an active/valid subscription can make their wishlist public
    const hasActiveSubscription = Boolean(
      user.subscription &&
      (user.subscription.status === "ACTIVE" || (user.subscription.status === "CANCELLED" && user.subscription.expiresAt)) &&
      (!user.subscription.expiresAt || new Date(user.subscription.expiresAt) > new Date())
    );

    if (isPublic && !hasActiveSubscription) {
      return NextResponse.json(
        { error: "An active Plugd Pro subscription is required to make your wishlist public." },
        { status: 403 }
      );
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { isPublic: Boolean(isPublic) },
    });

    return NextResponse.json({
      success: true,
      isPublic: updated.isPublic,
    });
  } catch (error) {
    console.error("[SUBSCRIPTION_STATUS_PATCH_ERROR]", error);
    return NextResponse.json({ error: "Failed to update wishlist visibility" }, { status: 500 });
  }
}
