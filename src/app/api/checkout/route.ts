import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { dodoClient, isDodoConfigured } from "@/lib/dodopayments";
import { getOrCreateCustomer, recordCoursePurchase, getCustomerByAccessKey } from "@/lib/playbooks";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const courseSlug = (body.courseSlug || "men").toLowerCase();
    const isBundle = Boolean(body.isBundle);
    const email = (body.email || "").trim().toLowerCase();
    const name = (body.name || "").trim();

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "https://theplugd.com";

    const cookieStore = await cookies();
    const accessKeyCookie = cookieStore.get("plugd_access_key")?.value;

    let customer = null;
    if (email) {
      customer = await getOrCreateCustomer(email);
    } else if (accessKeyCookie) {
      customer = await getCustomerByAccessKey(accessKeyCookie);
    }

    if (!customer) {
      const fallbackEmail = email || `guest_${Date.now()}@theplugd.com`;
      customer = await getOrCreateCustomer(fallbackEmail);
    }

    const price = isBundle ? 79.0 : 49.0;
    const slugsToGrant = isBundle ? ["men", "women"] : [courseSlug];

    // If Dodo Payments is configured in production
    const dodoProductId = process.env.DODO_COURSE_PRODUCT_ID || process.env.DODO_PAYMENTS_PRODUCT_ID;
    if (isDodoConfigured() && dodoProductId) {
      try {
        const returnUrl = `${origin}/my-playbooks?session_id={CHECKOUT_SESSION_ID}&purchased=${courseSlug}`;

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
            courseSlug,
            isBundle: String(isBundle),
          },
        });

        if (checkoutSession.checkout_url) {
          const res = NextResponse.json({
            checkoutUrl: checkoutSession.checkout_url,
          });

          res.cookies.set("plugd_access_key", customer.accessKey, {
            path: "/",
            httpOnly: false,
            maxAge: 60 * 60 * 24 * 365, // 1 year
            sameSite: "lax",
          });

          return res;
        }
      } catch (dodoError: any) {
        console.warn("[DODO_COURSE_CHECKOUT_FALLBACK]", dodoError?.message);
      }
    }

    // Direct Instant Access Flow (instant unlock for user)
    for (const slug of slugsToGrant) {
      await recordCoursePurchase({
        customerId: customer.id,
        courseSlug: slug,
        amount: price / slugsToGrant.length,
      });
    }

    const res = NextResponse.json({
      success: true,
      message: "Playbook unlocked successfully",
      redirectUrl: `/my-playbooks?purchased=${courseSlug}`,
    });

    res.cookies.set("plugd_access_key", customer.accessKey, {
      path: "/",
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 365, // 1 year
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
