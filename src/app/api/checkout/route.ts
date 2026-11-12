import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import {
  dodoClient,
  isDodoConfigured,
  getDodoCourseProductId,
  getPlaybookDodoMapping,
} from "@/lib/dodopayments";
import type { Customer } from "@prisma/client";
import {
  getOrCreateCustomer,
  getCustomerByAccessKey,
  hasComplimentaryAccess,
  hasUserPurchasedCourse,
} from "@/lib/playbooks";
import { IS_REVIEW_PHASE_FREE_ACCESS } from "@/lib/config";

export const dynamic = "force-dynamic";

interface ProductCartItem {
  product_id: string;
  quantity: number;
  amount?: number;
}

interface CheckoutSessionPayload {
  product_cart: ProductCartItem[];
  return_url: string;
  metadata: Record<string, string>;
  customer?: {
    email: string;
    name: string;
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    // Extract target course slugs from either slugs array, items array, or single courseSlug
    let rawSlugs: string[] = [];
    if (Array.isArray(body?.slugs) && body.slugs.length > 0) {
      rawSlugs = body.slugs.filter((s: unknown): s is string => typeof s === "string" && Boolean(s.trim()));
    } else if (Array.isArray(body?.items) && body.items.length > 0) {
      rawSlugs = body.items
        .map((it: { slug?: string }) => it?.slug)
        .filter((s: unknown): s is string => typeof s === "string" && Boolean(s?.trim()));
    } else if (typeof body?.courseSlug === "string" && body.courseSlug.trim()) {
      rawSlugs = [body.courseSlug.trim()];
    }

    if (rawSlugs.length === 0) {
      return NextResponse.json(
        { error: "Course slug is required." },
        { status: 400 }
      );
    }

    // Deduplicate and normalize slugs
    const uniqueSlugs = Array.from(new Set(rawSlugs.map((s) => s.trim().toLowerCase())));
    const isTestMode = process.env.DODO_PAYMENTS_MODE === "test_mode";

    // Validate that all requested slugs are valid catalog products
    for (const slug of uniqueSlugs) {
      const mapping = getPlaybookDodoMapping(slug);
      const isLegacyMen = !mapping && slug === "men" && !isTestMode;
      if (!mapping && !isLegacyMen) {
        return NextResponse.json(
          { error: "Invalid or unrecognized playbook slug." },
          { status: 400 }
        );
      }
    }

    // Direct access during content review phase
    if (IS_REVIEW_PHASE_FREE_ACCESS) {
      return NextResponse.json({
        success: true,
        complimentary: true,
        message: "Free content review phase active. Direct access granted.",
        redirectUrl: `/learn/${uniqueSlugs[0]}`,
      });
    }

    const rawEmail = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const name = typeof body?.name === "string" ? body.name.trim() : "";

    // If an invalid email was explicitly provided, fail fast
    if (body?.email && (!rawEmail || !rawEmail.includes("@"))) {
      return NextResponse.json(
        { error: "Please enter a valid email address to receive your playbook access." },
        { status: 400 }
      );
    }

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "https://theplugd.com";

    let accessKeyCookie: string | undefined;
    try {
      const cookieStore = await cookies();
      accessKeyCookie = cookieStore.get("plugd_access_key")?.value;
    } catch {
      const cookieHeader = req.headers.get("cookie") || "";
      const match = cookieHeader.match(/plugd_access_key=([^;]+)/);
      accessKeyCookie = match ? match[1] : undefined;
    }

    let customer: Customer | null = null;
    if (rawEmail && rawEmail.includes("@")) {
      customer = await getOrCreateCustomer(rawEmail);
    } else if (accessKeyCookie) {
      customer = await getCustomerByAccessKey(accessKeyCookie);
    }

    // Server-side ownership and complimentary access filter
    let unownedSlugs = [...uniqueSlugs];
    if (customer) {
      const filtered: string[] = [];
      for (const slug of uniqueSlugs) {
        const isComp = await hasComplimentaryAccess(customer.email, slug);
        const alreadyPurchased = await hasUserPurchasedCourse(customer.id, slug);
        if (!isComp && !alreadyPurchased) {
          filtered.push(slug);
        }
      }

      if (filtered.length === 0) {
        // Customer already owns all requested playbooks
        const targetRedirect = uniqueSlugs.length === 1 ? `/learn/${uniqueSlugs[0]}` : "/my-playbooks";
        const res = NextResponse.json({
          success: true,
          allOwned: true,
          message: "You already have access to the selected playbook(s).",
          redirectUrl: targetRedirect,
        });

        res.cookies.set("plugd_access_key", customer.accessKey, {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 365,
          sameSite: "lax",
        });

        return res;
      }

      unownedSlugs = filtered;
    }

    // Verify Dodo Payments API configuration
    if (!isDodoConfigured()) {
      console.error("[CHECKOUT_ERROR] Dodo Payments API key is not configured");
      return NextResponse.json(
        { error: "Payment service is currently unavailable. Please try again later." },
        { status: 503 }
      );
    }

    // Build multi-product product_cart array
    const productCart: ProductCartItem[] = [];
    let totalExpectedCents = 0;

    for (const slug of unownedSlugs) {
      const mapping = getPlaybookDodoMapping(slug);
      const isLegacyMen = !mapping && slug === "men" && !isTestMode;
      const dodoProductId = mapping ? mapping.dodoProductId : getDodoCourseProductId("men");

      if (!dodoProductId) {
        console.error("[CHECKOUT_ERROR] Course product ID is not configured for", slug);
        return NextResponse.json(
          { error: "Payment service is currently unavailable. Please try again later." },
          { status: 503 }
        );
      }

      const item: ProductCartItem = {
        product_id: dodoProductId,
        quantity: 1,
      };

      if (isLegacyMen) {
        item.amount = 300;
        totalExpectedCents += 300;
      } else if (mapping) {
        totalExpectedCents += mapping.sellingPriceCents;
      } else {
        totalExpectedCents += 300;
      }

      productCart.push(item);
    }

    const totalExpectedDollars = (totalExpectedCents / 100).toFixed(2);
    const checkoutToken = randomBytes(24).toString("hex");

    const returnUrl =
      unownedSlugs.length === 1
        ? `${origin}/learn/${unownedSlugs[0]}?session_id={CHECKOUT_SESSION_ID}&purchased=${unownedSlugs[0]}`
        : `${origin}/my-playbooks?session_id={CHECKOUT_SESSION_ID}&purchased=${encodeURIComponent(unownedSlugs.join(","))}`;

    const metadata: Record<string, string> = {
      courseSlug: unownedSlugs[0],
      courseSlugs: unownedSlugs.join(","),
      itemCount: String(unownedSlugs.length),
      amount: totalExpectedDollars,
      expectedCents: String(totalExpectedCents),
      checkoutToken,
    };

    if (customer) {
      metadata.customerId = customer.id;
      metadata.customerEmail = customer.email;
    }

    const sessionParams: CheckoutSessionPayload = {
      product_cart: productCart,
      return_url: returnUrl,
      metadata,
    };

    if (customer) {
      sessionParams.customer = {
        email: customer.email,
        name: name || "Customer",
      };
    }

    let checkoutSession;
    try {
      checkoutSession = await dodoClient.checkoutSessions.create(sessionParams);
    } catch (dodoError: unknown) {
      const errorMsg = dodoError instanceof Error ? dodoError.message : String(dodoError);
      console.error("[DODO_CHECKOUT_SESSION_ERROR]", errorMsg);
      return NextResponse.json(
        { error: "Failed to initialize checkout. Please try again." },
        { status: 502 }
      );
    }

    if (!checkoutSession?.checkout_url) {
      console.error("[DODO_CHECKOUT_SESSION_ERROR] No checkout URL returned by Dodo Payments");
      return NextResponse.json(
        { error: "Failed to initialize checkout. Please try again." },
        { status: 502 }
      );
    }

    const res = NextResponse.json({
      checkoutUrl: checkoutSession.checkout_url,
    });

    if (customer) {
      res.cookies.set("plugd_access_key", customer.accessKey, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }

    res.cookies.set("plugd_checkout_token", checkoutToken, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });

    return res;
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("[COURSE_CHECKOUT_ERROR]", errorMsg);
    return NextResponse.json(
      { error: "Failed to process checkout. Please try again." },
      { status: 500 }
    );
  }
}
