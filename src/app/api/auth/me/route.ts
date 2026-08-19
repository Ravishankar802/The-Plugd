import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();

  if (!session || !session.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: {
        categories: {
          orderBy: { displayOrder: "asc" },
        },
        items: {
          orderBy: { displayOrder: "asc" },
        },
        paymentSettings: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Calculate profile completeness (5 sections, 20% each)
    let completeness = 0;
    if (user.username) completeness += 20;
    if (user.displayName && user.displayName !== user.email.split("@")[0]) completeness += 20;
    if (user.bio && user.bio.trim() !== "") completeness += 20;
    if (user.avatarUrl) completeness += 20;

    const hasUpi = !!(user.paymentSettings?.upiEnabled && user.paymentSettings?.upiId);
    const hasBank = !!(
      user.paymentSettings?.bankEnabled &&
      user.paymentSettings?.accountNumber &&
      user.paymentSettings?.ifsc &&
      user.paymentSettings?.accountHolder
    );
    if (hasUpi || hasBank) completeness += 20;

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
        bannerUrl: user.bannerUrl,
        accentColor: user.accentColor,
        instagramUrl: user.instagramUrl,
        xUrl: user.xUrl,
        youtubeUrl: user.youtubeUrl,
        tiktokUrl: user.tiktokUrl,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      categories: user.categories,
      items: user.items,
      paymentSettings: user.paymentSettings,
      completeness,
      isAdmin: session.isAdmin || false,
    });
  } catch (error: any) {
    console.error("[AUTH_ME_ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
