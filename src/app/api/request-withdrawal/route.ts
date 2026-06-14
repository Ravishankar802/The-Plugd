import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getSession();

    if (!session || !session.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.email.toLowerCase();

    // Look up the promoter details
    const promoter = await prisma.promoter.findUnique({
      where: { email }
    });

    if (!promoter) {
      return NextResponse.json({ error: "Promoter profile not found" }, { status: 404 });
    }

    // Checks that user has enough pending payout (₹5,000+) before allowing
    if (promoter.pendingPayout < 5000) {
      return NextResponse.json(
        { error: "Minimum withdrawal amount of ₹5,000 is required." },
        { status: 400 }
      );
    }

    // Check if they already have a pending withdrawal request
    const existing = await prisma.withdrawalRequest.findFirst({
      where: { userId: email, status: "pending" }
    });

    if (existing) {
      return NextResponse.json(
        { error: "You already have a pending withdrawal request." },
        { status: 400 }
      );
    }

    // Ensure User record exists
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        id: email,
        email: email
      }
    });

    const method = promoter.payoutMethod || "PayPal/UPI";
    const details = promoter.payoutDetails || "Contact promoter for details";

    // Create the withdrawal request
    const withdrawalRequest = await prisma.withdrawalRequest.create({
      data: {
        userId: user.id,
        amount: promoter.pendingPayout,
        method: method,
        details: details,
        status: "pending"
      }
    });

    return NextResponse.json({
      success: true,
      message: "Request submitted. We'll process it on the next payout date.",
      withdrawalRequest
    });

  } catch (error: any) {
    console.error("Error creating withdrawal request:", error);
    return NextResponse.json({ error: error.message || "Failed to submit request" }, { status: 500 });
  }
}
