import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const account = await prisma.account.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive'
        },
        status: "paid" // Ensure they only see paid profiles in dashboard
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!account) {
      return NextResponse.json({ found: false }, { status: 404 });
    }

    return NextResponse.json({ found: true, account });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
