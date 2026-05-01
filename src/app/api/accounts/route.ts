import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const accounts = await prisma.account.findMany({
      where: { status: "paid" },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(accounts);
  } catch (error) {
    console.error("GET /api/accounts error:", error);
    return NextResponse.json({ error: "Failed to fetch accounts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, xHandle, avatarPath, bio, niche, followersRange, email } = body;

    const account = await prisma.account.create({
      data: {
        name,
        xHandle,
        avatarPath,
        bio,
        niche,
        followersRange,
        email,
        paid: false,
        status: "pending_payment",
      },
    });

    return NextResponse.json({ accountId: account.id });
  } catch (error) {
    console.error("POST /api/accounts error:", error);
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
  }
}
