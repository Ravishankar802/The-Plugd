import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { dodoClient, isDodoConfigured, getDodoCourseProductId } from "@/lib/dodopayments";
import type { Customer } from "@prisma/client";
import {
  getOrCreateCustomer,
  getCustomerByAccessKey,
  hasComplimentaryAccess,
  hasUserPurchasedCourse,
} from "@/lib/playbooks";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const courseSlug = "men"; // The Dating Playbook
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
          redirectUrl: "/learn/men?access=granted",
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
          message: "You already have access to The Dating Playbook.",
          redirectUrl: "/learn/men",
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

    // 3. One-time payment of exactly $3 USD via Dodo Payments
    if (!isDodoConfigured()) {
      console.error("[CHECKOUT_ERROR] Dodo Payments API key is not configured");
      return NextResponse.json(
        { error: "Payment service is currently unavailable. Please try again later." },
        { status: 503 }
      );
    }

    const dodoProductId = getDodoCourseProductId();
    if (!dodoProductId) {
      console.error("[CHECKOUT_ERROR] Course product ID is not configured");
      return NextResponse.json(
        { error: "Payment service is currently unavailable. Please try again later." },
        { status: 503 }
      );
    }

    const checkoutToken = randomBytes(24).toString("hex");
    const returnUrl = `${origin}/learn/men?session_id={CHECKOUT_SESSION_ID}&purchased=men`;

    const metadata: Record<string, string> = {
      courseSlug: "men",
      amount: "3.00",
      checkoutToken,
    };
    if (customer) {
      metadata.customerId = customer.id;
      metadata.customerEmail = customer.email;
    }

    const sessionParams: any = {
      product_cart: [
        {
          product_id: dodoProductId,
          quantity: 1,
          amount: 300,
        },
      ],
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
    } catch (dodoError: any) {
      console.error("[DODO_CHECKOUT_SESSION_ERROR]", dodoError?.message || dodoError);
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
  } catch (error: any) {
    console.error("[COURSE_CHECKOUT_ERROR]", error?.message || error);
    return NextResponse.json(
      { error: "Failed to process checkout. Please try again." },
      { status: 500 }
    );
  }
}
