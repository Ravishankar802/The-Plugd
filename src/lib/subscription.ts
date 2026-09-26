export interface PlanConfig {
  id: "MONTHLY" | "YEARLY";
  name: string;
  price: number;
  period: "month" | "year";
  periodLabel: string;
  savings?: string;
  features: string[];
}

export const MONETIZATION_PLANS: Record<"MONTHLY" | "YEARLY", PlanConfig> = {
  MONTHLY: {
    id: "MONTHLY",
    name: "Share Monthly",
    price: 39,
    period: "month",
    periodLabel: "₹39 / month",
    features: [
      "Make your wishlist public & shareable",
      "Personal public link (theplugd.com/@username)",
      "Direct supporter payments (100% direct UPI / QR)",
      "0% Plugd platform fee on your gifts",
      "Cancel anytime, items stay saved forever",
    ],
  },
  YEARLY: {
    id: "YEARLY",
    name: "Share Yearly",
    price: 299,
    period: "year",
    periodLabel: "₹299 / year",
    savings: "Save ~36%",
    features: [
      "Make your wishlist public & shareable for 1 full year",
      "Personal public link (theplugd.com/@username)",
      "Direct supporter payments (100% direct UPI / QR)",
      "0% Plugd platform fee on your gifts",
      "Cancel anytime, items stay saved forever",
    ],
  },
};

export interface UserSubscriptionLike {
  isPublic?: boolean | null;
  subscription?: {
    id?: string;
    plan: string;
    status: string;
    amount?: number;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
  } | null;
}

/**
 * Checks whether a user's wishlist is publicly viewable.
 * Wishlists are private by default. A user must have an active subscription
 * (Share Monthly ₹39 or Share Yearly ₹299) to unlock public sharing.
 */
export function isWishlistPublic(user: UserSubscriptionLike | null | undefined): boolean {
  if (!user || !user.subscription) return false;

  const sub = user.subscription;
  if (sub.status !== "ACTIVE") return false;

  if (sub.expiresAt) {
    const expiry = new Date(sub.expiresAt).getTime();
    if (Date.now() > expiry) {
      return false;
    }
  }

  // If user explicitly toggled it private while having active sub, honor that; otherwise default to public
  return user.isPublic !== false;
}

/**
 * Calculates expiration date given a plan
 */
export function calculateExpirationDate(plan: "MONTHLY" | "YEARLY", fromDate: Date = new Date()): Date {
  const expires = new Date(fromDate);
  if (plan === "YEARLY") {
    expires.setFullYear(expires.getFullYear() + 1);
  } else {
    expires.setMonth(expires.getMonth() + 1);
  }
  return expires;
}
