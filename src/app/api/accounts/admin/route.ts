import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Admin-only endpoint: returns all accounts regardless of status
export async function GET(req: Request) {
  try {
    const adminEmail = req.headers.get("x-admin-email");
    
    if (!adminEmail || adminEmail !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const accounts = await prisma.account.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(accounts);
  } catch (error) {
    console.error("GET /api/accounts/admin error:", error);
    return NextResponse.json({ error: "Failed to fetch accounts" }, { status: 500 });
  }
}
