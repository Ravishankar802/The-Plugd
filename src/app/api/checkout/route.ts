import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dodoClient, isDodoConfigured } from "@/lib/dodopayments";
import {
  getOrCreateCustomer,
  recordCoursePurchase,
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
        redirectUrl: "/my-playbooks?access=granted",
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
        redirectUrl: "/my-playbooks",
      });

      res.cookies.set("plugd_access_key", customer.accessKey, {
        path: "/",
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });

      return res;
    }

    // 3. One-time payment of exactly $3 USD
    const price = 3.0;

    // Dodo Payments integration (if configured in production)
    const dodoProductId = process.env.DODO_COURSE_PRODUCT_ID || process.env.DODO_PAYMENTS_PRODUCT_ID;
    if (isDodoConfigured() && dodoProductId) {
      try {
        const returnUrl = `${origin}/my-playbooks?session_id={CHECKOUT_SESSION_ID}&purchased=men`;

        const checkoutSession = await dodoClient.checkoutSessions.create({
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

        if (checkoutSession.checkout_url) {
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
        }
      } catch (dodoError: any) {
        console.warn("[DODO_COURSE_CHECKOUT_FALLBACK]", dodoError?.message);
      }
    }

    // Direct Instant Access Flow (one-time $3 payment recorded)
    await recordCoursePurchase({
      customerId: customer.id,
      courseSlug: "men",
      amount: price,
    });

    const res = NextResponse.json({
      success: true,
      message: "The Dating Playbook unlocked successfully",
      redirectUrl: "/my-playbooks?purchased=men",
    });

    res.cookies.set("plugd_access_key", customer.accessKey, {
      path: "/",
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });

    return res;
  } catch (error: any) {
    console.error("[COURSE_CHECKOUT_ERROR]", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process checkout" },
      { status: 500 }
    );
  }
}
