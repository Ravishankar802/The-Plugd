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
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!account) {
      return NextResponse.json({ found: false, error: "No account found with this email." }, { status: 404 });
    }

    if (account.status === "pending_payment") {
      return NextResponse.json({ 
        found: true, 
        status: "pending",
        error: "Your payment is being verified. Your profile will appear shortly." 
      }, { status: 403 });
    }

    if (account.status !== "paid") {
      return NextResponse.json({ 
        found: false, 
        error: "Account not active. Please contact support." 
      }, { status: 403 });
    }

    return NextResponse.json({ found: true, status: "paid", account });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
