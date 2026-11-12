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

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    // 0. Course slug validation: must be a non-empty string
    if (!body || typeof body.courseSlug !== "string" || !body.courseSlug.trim()) {
      return NextResponse.json(
        { error: "Course slug is required." },
        { status: 400 }
      );
    }

    const cleanSlug = body.courseSlug.trim().toLowerCase();
    const isTestMode = process.env.DODO_PAYMENTS_MODE === "test_mode";

    // In test mode, only the representative test playbook is active.
    // In live mode, matches one of the 109 Playbooks, or explicitly "men" for legacy checkout
    const mapping = getPlaybookDodoMapping(cleanSlug);
    const isLegacyMen = !mapping && cleanSlug === "men" && !isTestMode;

    if (!mapping && !isLegacyMen) {
      return NextResponse.json(
        { error: "Invalid or unrecognized playbook slug." },
        { status: 400 }
      );
    }

    const courseSlug = mapping ? mapping.slug : "men";

    // Direct access during content review phase
    if (IS_REVIEW_PHASE_FREE_ACCESS) {
      return NextResponse.json({
        success: true,
        complimentary: true,
        message: "Free content review phase active. Direct access granted.",
        redirectUrl: `/learn/${courseSlug}`,
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

    // 1. Verify Complimentary Access Entitlement (e.g. lifetime free accounts)
    if (customer) {
      const isComp = await hasComplimentaryAccess(customer.email, courseSlug);
      if (isComp) {
        const res = NextResponse.json({
          success: true,
          complimentary: true,
          message: "Complimentary lifetime access verified.",
          redirectUrl: `/learn/${courseSlug}?access=granted`,
        });

        res.cookies.set("plugd_access_key", customer.accessKey, {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 365, // 1 year
          sameSite: "lax",
        });

        return res;
      }

      // 2. Check if customer already owns the playbook
      const alreadyPurchased = await hasUserPurchasedCourse(customer.id, courseSlug);
      if (alreadyPurchased) {
        const res = NextResponse.json({
          success: true,
          message: "You already have access to this playbook.",
          redirectUrl: `/learn/${courseSlug}`,
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
    }

    // 3. Resolve playbook and corresponding Dodo product mapping
    if (!isDodoConfigured()) {
      console.error("[CHECKOUT_ERROR] Dodo Payments API key is not configured");
      return NextResponse.json(
        { error: "Payment service is currently unavailable. Please try again later." },
        { status: 503 }
      );
    }

    const dodoProductId = mapping ? mapping.dodoProductId : getDodoCourseProductId("men");
    if (!dodoProductId) {
      console.error("[CHECKOUT_ERROR] Course product ID is not configured for", courseSlug);
      return NextResponse.json(
        { error: "Payment service is currently unavailable. Please try again later." },
        { status: 503 }
      );
    }

    const targetSlug = mapping ? mapping.slug : "men";
    const playbookId = mapping ? mapping.playbookId : "dating-men";
    const expectedSellingPrice = mapping ? mapping.sellingPriceDollars.toFixed(2) : "3.00";
    const expectedCents = mapping ? mapping.sellingPriceCents : 300;

    const checkoutToken = randomBytes(24).toString("hex");
    const returnUrl = `${origin}/learn/${targetSlug}?session_id={CHECKOUT_SESSION_ID}&purchased=${targetSlug}`;

    const metadata: Record<string, string> = {
      courseSlug: targetSlug,
      playbookId,
      amount: expectedSellingPrice,
      expectedCents: String(expectedCents),
      checkoutToken,
    };
    if (customer) {
      metadata.customerId = customer.id;
      metadata.customerEmail = customer.email;
    }

    // Dodo native discounts apply automatically when product_id is passed with quantity: 1 and no manual amount override
    interface ProductCartItem {
      product_id: string;
      quantity: number;
      amount?: number;
    }

    const productItem: ProductCartItem = {
      product_id: dodoProductId,
      quantity: 1,
    };
    if (isLegacyMen) {
      productItem.amount = 300;
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

    const sessionParams: CheckoutSessionPayload = {
      product_cart: [productItem],
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
