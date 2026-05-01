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
    
    // Extract editable fields
    const { name, xHandle, bio, niche, followersRange, avatarPath, email } = body;

    const updatedAccount = await prisma.account.update({
      where: { id },
      data: {
        name,
        xHandle,
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
    
    await prisma.account.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/accounts/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
}
