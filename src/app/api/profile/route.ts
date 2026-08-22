import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request) {
  const session = await getSession();

  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
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
      tiktokUrl,
    } = body;

    const profile = await prisma.creatorProfile.upsert({
      where: { userId: session.userId },
      update: {
        displayName: displayName?.trim() || null,
        bio: bio?.trim() || null,
        avatarUrl: avatarUrl || null,
        bannerUrl: bannerUrl || null,
        accentColor: accentColor || "#f97316",
        instagramUrl: instagramUrl?.trim() || null,
        xUrl: xUrl?.trim() || null,
        youtubeUrl: youtubeUrl?.trim() || null,
        tiktokUrl: tiktokUrl?.trim() || null,
      },
      create: {
        userId: session.userId,
        displayName: displayName?.trim() || null,
        bio: bio?.trim() || null,
        avatarUrl: avatarUrl || null,
        bannerUrl: bannerUrl || null,
        accentColor: accentColor || "#f97316",
        instagramUrl: instagramUrl?.trim() || null,
        xUrl: xUrl?.trim() || null,
        youtubeUrl: youtubeUrl?.trim() || null,
        tiktokUrl: tiktokUrl?.trim() || null,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("[PROFILE_PATCH_ERROR]", error);
    return NextResponse.json({ error: "Failed to update profile settings" }, { status: 500 });
  }
}
