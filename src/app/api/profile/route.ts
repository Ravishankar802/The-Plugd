import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// PATCH: Update user's profile and appearance settings
export async function PATCH(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { 
      displayName, 
      bio, 
      avatarUrl, 
      bannerUrl, 
      accentColor, 
      instagramUrl, 
      xUrl, 
      youtubeUrl, 
      tiktokUrl 
    } = body;

    const updateData: any = {};
    if (displayName !== undefined) {
      updateData.displayName = displayName.trim() || session.email.split("@")[0];
    }
    if (bio !== undefined) updateData.bio = bio;
    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl || null;
    if (bannerUrl !== undefined) updateData.bannerUrl = bannerUrl || null;
    if (accentColor !== undefined) updateData.accentColor = accentColor || "#f97316";
    if (instagramUrl !== undefined) updateData.instagramUrl = instagramUrl || null;
    if (xUrl !== undefined) updateData.xUrl = xUrl || null;
    if (youtubeUrl !== undefined) updateData.youtubeUrl = youtubeUrl || null;
    if (tiktokUrl !== undefined) updateData.tiktokUrl = tiktokUrl || null;

    const updatedUser = await prisma.user.update({
      where: { id: session.userId },
      data: updateData,
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error("[PROFILE_PATCH_ERROR]", error);
    return NextResponse.json({ error: "Failed to update profile settings" }, { status: 500 });
  }
}
