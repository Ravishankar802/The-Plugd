import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const accountId = searchParams.get("accountId");

  if (!accountId) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    // In a real app, you'd verify the session status with Dodo Payments here.
    // For this build, we'll assume the redirect implies a successful checkout
    // or we'd check a webhook. But since the user specifically asked for this route
    // to "set paid: true", we'll do exactly that.
    
    await prisma.account.update({
      where: { id: parseInt(accountId) },
      data: { paid: true },
    });

    return NextResponse.redirect(new URL("/success", req.url));
  } catch (error) {
    console.error("GET /api/verify-payment error:", error);
    return NextResponse.redirect(new URL("/?error=payment_verification_failed", req.url));
  }
}
