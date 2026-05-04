/**
 * API route for managing accounts.
 * Handlers for GET (fetch all paid) and POST (create submission).
 */
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
    const {
      name,
      handle,    // frontend sends this
      xHandle,   // legacy key
      avatarPath,
      imageUrl,  // frontend sends this
      bio,
      category,  // frontend sends this (array of niches)
      niche,     // legacy key
      followersRange,
      email,
    } = body;

    // Validate required fields — no silent fallbacks
    const finalHandle = handle || xHandle;
    console.log('Attempting to create account with xHandle:', finalHandle);
    console.log('Request body:', body);

    if (!name || !email || !finalHandle) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and X handle are required." },
        { status: 400 }
      );
    }

    // Strip leading @ chars before saving
    const cleanHandle = String(finalHandle).replace(/^@+/, "");

    // Admin Bypass Check
    const userEmail = req.headers.get("x-user-email");
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const isAdmin = userEmail && adminEmail && userEmail.toLowerCase() === adminEmail.toLowerCase();
    console.log('Is admin:', isAdmin);

    const account = await prisma.account.create({
      data: {
        name:          String(name),
        xHandle:       cleanHandle,
        avatarUrl:     imageUrl || avatarPath || "",
        bio:           bio || "",
        niche:         category || niche || [],
        followersRange: followersRange || "",
        email:         String(email),
        paid:          isAdmin ? (body.status === "paid") : false,
        status:        isAdmin ? (body.status || "pending_payment") : "pending_payment",
      },
    });

    return NextResponse.json({
      id:        account.id,
      accountId: account.id,
    });
  } catch (error: any) {
    console.error("FULL ERROR:", error.message, error.code, error.meta);
    return NextResponse.json({ 
      error: error.message,
      code: error.code 
    }, { status: 500 });
  }
}
