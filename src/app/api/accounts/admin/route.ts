import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Admin-only endpoint: returns only paid accounts (same filter as public homepage)
export async function GET(req: Request) {
  try {
    const session = await getSession();

    if (!session?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const accounts = await prisma.account.findMany({
      where: { status: "paid" },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(accounts);
  } catch (error) {
    console.error("GET /api/accounts/admin error:", error);
    return NextResponse.json({ error: "Failed to fetch accounts" }, { status: 500 });
  }
}

// Admin-only endpoint: deletes abandoned pending_payment accounts older than 24h
export async function DELETE(req: Request) {
  try {
    const session = await getSession();

    if (!session?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago

    const result = await prisma.account.deleteMany({
      where: {
        status: "pending_payment",
        createdAt: { lt: cutoff },
      },
    });

    return NextResponse.json({
      message: `Cleaned up ${result.count} abandoned pending_payment account(s).`,
      deleted: result.count,
    });
  } catch (error) {
    console.error("DELETE /api/accounts/admin error:", error);
    return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
  }
}

