import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { dodoClient, isDodoConfigured } from "@/lib/dodopayments";

export const dynamic = "force-dynamic";

/**
 * Subscription return callback.
 * IMPORTANT: The Dodo webhook (/api/webhook/dodo) is the authoritative mechanism
 * for verifying and granting Plugd Pro subscriptions.
 * This callback route only safely redirects the user back to their wishlist after checkout.
 * It NEVER grants subscription access solely from query parameters.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");
  const authSession = await getSession();

  try {
    // If sessionId is present and Dodo is configured, we can verify session status for logging
    if (sessionId && isDodoConfigured()) {
      try {
        const sessionData = await dodoClient.checkoutSessions.retrieve(sessionId);
        console.log(`[SUBSCRIPTION_CALLBACK] Session ${sessionId} status: ${sessionData.payment_status}`);
      } catch (e: any) {
        console.warn(`[SUBSCRIPTION_CALLBACK] Could not retrieve session ${sessionId}:`, e.message);
      }
    }

    // Determine destination from authenticated session
    if (authSession?.userId) {
      const user = await prisma.user.findUnique({
        where: { id: authSession.userId },
        select: { username: true },
      });

      if (user?.username) {
        return NextResponse.redirect(new URL(`/${user.username}?upgraded=true`, req.url));
      }
      return NextResponse.redirect(new URL("/profile?upgraded=true", req.url));
    }

    // If viewer is not logged in, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  } catch (error) {
    console.error("[SUBSCRIPTION_CALLBACK_ERROR]", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}
