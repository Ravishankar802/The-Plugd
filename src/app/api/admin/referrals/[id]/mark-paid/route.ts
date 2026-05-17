import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "ravx003@gmail.com";
    const isAdmin = session.email.toLowerCase() === adminEmail.toLowerCase();
    
    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const promoterId = parseInt(id);
    const { note } = await req.json();

    const promoter = await prisma.promoter.findUnique({
      where: { id: promoterId }
    });

    if (!promoter) {
      return NextResponse.json({ error: "Promoter not found" }, { status: 404 });
    }

    if (promoter.pendingPayout <= 0) {
      return NextResponse.json({ error: "No pending payout" }, { status: 400 });
    }

    const payoutAmount = promoter.pendingPayout;

    // Atomic transaction
    await prisma.$transaction([
      // 1. Create Payout record
      prisma.referralPayout.create({
        data: {
          promoterId: promoterId,
          amount: payoutAmount,
          note: note || "Marked as paid by admin"
        }
      }),
      // 2. Update Promoter stats
      prisma.promoter.update({
        where: { id: promoterId },
        data: {
          totalPaid: { increment: payoutAmount },
          pendingPayout: 0
        }
      }),
      // 3. Update pending withdrawal requests to paid status
      prisma.withdrawalRequest.updateMany({
        where: {
          userId: promoter.email,
          status: "pending"
        },
        data: {
          status: "paid"
        }
      })
    ]);

    return NextResponse.json({ success: true, amount: payoutAmount });
  } catch (error) {
    console.error("Mark as paid error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
