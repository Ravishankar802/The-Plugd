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

    const account = await prisma.account.create({
      data: {
        name:          String(name),
        xHandle:       cleanHandle,
        avatarPath:    imageUrl || avatarPath || "",
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
  } catch (error: unknown) {
    console.error("POST /api/accounts error:", error);

    // Prisma unique constraint (duplicate xHandle)
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "This X handle is already listed. Use a different one or access your dashboard." },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
  }
}
