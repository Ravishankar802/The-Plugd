import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ensureCatalogSeeded } from "@/lib/catalog";
import { ensureCreatorProfile } from "@/lib/creator";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();

  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureCatalogSeeded();
    await ensureCreatorProfile(session.userId);

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: {
        creatorProfile: true,
        wishlistItems: {
          where: { isPublished: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const completenessChecks = [
      Boolean(user.username),
      Boolean(user.creatorProfile?.displayName),
      Boolean(user.creatorProfile?.bio),
      Boolean(user.creatorProfile?.avatarUrl),
      user.wishlistItems.length > 0,
    ];

    const completeness = completenessChecks.filter(Boolean).length * 20;

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        creatorProfile: user.creatorProfile,
      },
      wishlistCount: user.wishlistItems.length,
      completeness,
      isAdmin: session.isAdmin || false,
    });
  } catch (error) {
    console.error("[AUTH_ME_ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
