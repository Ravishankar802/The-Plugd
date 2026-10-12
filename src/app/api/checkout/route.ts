import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dodoClient, isDodoConfigured, getDodoCourseProductId } from "@/lib/dodopayments";
import {
  getOrCreateCustomer,
  getCustomerByAccessKey,
  hasComplimentaryAccess,
  hasUserPurchasedCourse,
} from "@/lib/playbooks";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const courseSlug = "men"; // The Dating Playbook
    const email = (body.email || "").trim().toLowerCase();
    const name = (body.name || "").trim();

    if (!email || !email.includes("@")) {
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

    let customer = await getOrCreateCustomer(email);

    // 1. Verify Complimentary Access Entitlement (e.g. lifetime free accounts)
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
        httpOnly: false,
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
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });

      return res;
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

    let checkoutSession;
    try {
      const returnUrl = `${origin}/learn/men?session_id={CHECKOUT_SESSION_ID}&purchased=men`;

      checkoutSession = await dodoClient.checkoutSessions.create({
        product_cart: [
          {
            product_id: dodoProductId,
            quantity: 1,
          },
        ],
        customer: {
          email: customer.email,
          name: name || "Customer",
        },
        return_url: returnUrl,
        metadata: {
          customerId: customer.id,
          customerEmail: customer.email,
          courseSlug: "men",
          amount: "3.00",
        },
      });
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

    res.cookies.set("plugd_access_key", customer.accessKey, {
      path: "/",
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 365,
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
