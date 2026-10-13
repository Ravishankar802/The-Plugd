import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import {
  getCustomerByAccessKey,
  hasUserAccessToCourse,
} from "@/lib/playbooks";
import { dodoClient, isDodoConfigured, getDodoCourseProductId } from "@/lib/dodopayments";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const courseSlug = url.searchParams.get("courseSlug")?.toLowerCase() || url.searchParams.get("slug")?.toLowerCase() || "men";
    const sessionId = url.searchParams.get("session_id");

    let accessKey: string | undefined;
    let checkoutToken: string | undefined;
    try {
      const cookieStore = await cookies();
      accessKey = cookieStore.get("plugd_access_key")?.value;
      checkoutToken = cookieStore.get("plugd_checkout_token")?.value;
    } catch {}

    if (!accessKey || !checkoutToken) {
      const cookieHeader = req.headers.get("cookie") || "";
      if (!accessKey) {
        const matchAccess = cookieHeader.match(/plugd_access_key=([^;]+)/);
        accessKey = matchAccess ? matchAccess[1] : undefined;
      }
      if (!checkoutToken) {
        const matchToken = cookieHeader.match(/plugd_checkout_token=([^;]+)/);
        checkoutToken = matchToken ? matchToken[1] : undefined;
      }
    }

    if (accessKey) {
      const customer = await getCustomerByAccessKey(accessKey);
      if (customer) {
        const owns = await hasUserAccessToCourse(customer.id, courseSlug, customer.email);
        if (owns) {
          return NextResponse.json({
            owned: true,
            email: customer.email,
          });
        }
        // If customer does not own the requested course, but session_id is present,
        // do not return owned: false immediately. Proceed to session verification flow.
        if (!sessionId) {
          return NextResponse.json({
            owned: false,
            email: customer.email,
          });
        }
      }
    }

    // Direct checkout session verification: bridge checkoutToken to accessKey once payment succeeds
    if (sessionId && typeof sessionId === "string" && isDodoConfigured()) {
      try {
        const session = await dodoClient.checkoutSessions.retrieve(sessionId);
        if (session?.payment_status === "succeeded" && session?.payment_id) {
          const payment = await dodoClient.payments.retrieve(session.payment_id);
          const expectedProductId = getDodoCourseProductId();
          const hasProduct = Array.isArray(payment.product_cart) && payment.product_cart.some(
            (item: { product_id?: string }) => item?.product_id === expectedProductId
          );
          const isCorrectAmount = payment.total_amount === 300;
          const isCorrectCurrency = payment.currency?.toUpperCase() === "USD";
          const sessionMetadata = ((session as unknown as { metadata?: Record<string, string> })?.metadata || {}) as Record<string, string>;
          const paymentMetadata = (payment.metadata || {}) as Record<string, string>;
          const courseSlugMetadata = (paymentMetadata.courseSlug || sessionMetadata.courseSlug || "").toLowerCase();
          const isCorrectCourse = courseSlugMetadata === "men";

          if (hasProduct && isCorrectAmount && isCorrectCurrency && isCorrectCourse) {
            const sessionCheckoutToken = paymentMetadata.checkoutToken || sessionMetadata.checkoutToken;

            // Validate matching secure checkout token
            if (sessionCheckoutToken && checkoutToken && sessionCheckoutToken === checkoutToken) {
              // 1. First use trustworthy email from verified checkout/payment data
              let customerEmail = (session.customer_email || "").trim().toLowerCase();
              // 2. If checkout session does not contain customer email, use verified payment email
              if ((!customerEmail || !customerEmail.includes("@")) && payment?.customer?.email) {
                customerEmail = payment.customer.email.trim().toLowerCase();
              }
              // 3. Fall back to metadata email if needed
              if ((!customerEmail || !customerEmail.includes("@")) && (paymentMetadata.customerEmail || sessionMetadata.customerEmail)) {
                customerEmail = (paymentMetadata.customerEmail || sessionMetadata.customerEmail || "").trim().toLowerCase();
              }

              if (customerEmail && customerEmail.includes("@")) {
                // Confirm that the authoritative webhook has persisted the verified purchase in the database
                const verifiedPurchase = await prisma.coursePurchase.findFirst({
                  where: {
                    paymentId: payment.payment_id,
                    courseSlug: "men",
                  },
                });

                if (verifiedPurchase) {
                  // Verify that the purchase belongs to the customer identified by the verified payment
                  const purchaseCustomer = await prisma.customer.findUnique({
                    where: { id: verifiedPurchase.customerId },
                  });

                  if (purchaseCustomer && purchaseCustomer.email.toLowerCase() === customerEmail) {
                    const owns = await hasUserAccessToCourse(purchaseCustomer.id, courseSlug, purchaseCustomer.email);
                    if (owns) {
                      const res = NextResponse.json({
                        owned: true,
                        email: purchaseCustomer.email,
                      });

                      res.cookies.set("plugd_access_key", purchaseCustomer.accessKey, {
                        path: "/",
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 60 * 60 * 24 * 365,
                        sameSite: "lax",
                      });

                      return res;
                    }
                  }
                }

                // If the webhook has not yet completed fulfillment, return pending/not-owned response
                // without issuing an access cookie so client polling can retry safely
                return NextResponse.json({ owned: false });
              } else {
                console.warn("[CHECK_OWNERSHIP_REJECTED] Missing or invalid customer email in verified payment");
              }
            } else {
              console.warn("[CHECK_OWNERSHIP_REJECTED] Missing or mismatched checkoutToken");
            }
          } else {
            console.warn("[CHECK_OWNERSHIP_REJECTED] Product, amount, currency, or course metadata mismatch");
          }
        }
      } catch (sessionErr) {
        console.warn("[CHECK_OWNERSHIP_SESSION_POLL_ERROR]", sessionErr);
      }
    }

    return NextResponse.json({ owned: false });
  } catch {
    return NextResponse.json({ owned: false });
  }
}
