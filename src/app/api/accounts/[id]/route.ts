import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const body = await req.json();
    
    // Security check
    const userEmail = req.headers.get("x-user-email");
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    
    // Fetch current account to check ownership
    const currentAccount = await prisma.account.findUnique({
      where: { id },
    });

    if (!currentAccount) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    const isOwner = userEmail && currentAccount.email.toLowerCase() === userEmail.toLowerCase();
    const isAdmin = userEmail && adminEmail && userEmail.toLowerCase() === adminEmail.toLowerCase();

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract editable fields
    const { name, xHandle, bio, niche, followersRange, avatarPath, email } = body;

    const updatedAccount = await prisma.account.update({
      where: { id },
      data: {
        name,
        xHandle: xHandle ? String(xHandle).replace(/^@+/, "") : undefined,
        bio,
        niche,
        followersRange,
        avatarPath,
        email,
      },
    });

    return NextResponse.json(updatedAccount);
  } catch (error) {
    console.error("PATCH /api/accounts/[id] error:", error);
    return NextResponse.json({ error: "Failed to update account" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    
    // Security check - Only Admin can delete
    const userEmail = req.headers.get("x-user-email");
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    if (!userEmail || !adminEmail || userEmail.toLowerCase() !== adminEmail.toLowerCase()) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 401 });
    }

    await prisma.account.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/accounts/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
}
