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
      handle, // user pattern
      xHandle, // existing
      avatarPath, // existing
      imageUrl, // user pattern
      bio, 
      category, // user pattern
      niche, // existing
      followersRange, 
      email 
    } = body;

    const account = await prisma.account.create({
      data: {
        name: name || "Unknown",
        xHandle: handle || xHandle || `user_${Math.random().toString(36).substring(7)}`,
        avatarPath: imageUrl || avatarPath || "",
        bio: bio || "No bio provided",
        niche: category || niche || [],
        followersRange: followersRange || "Unknown",
        email: email || "unknown@example.com",
        paid: false,
        status: "pending_payment",
      },
    });

    return NextResponse.json({ 
      id: account.id,
      accountId: account.id 
    });
  } catch (error: any) {
    console.error("POST /api/accounts error:", error);
    
    // Check for Prisma unique constraint error
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "This X Username is already listed. Please use a different one or access your dashboard." },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
  }
}
