import { NextResponse } from "next/server";
import { getSession, createSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

const RESERVED_USERNAMES = new Set([
  "admin",
  "dashboard",
  "api",
  "login",
  "signup",
  "settings",
  "support",
  "help",
  "about",
  "pricing",
  "plugd",
  "index",
  "home",
  "payout",
  "payments",
  "auth",
  "verification",
  "verified",
  "register",
  "faq",
  "terms",
  "privacy",
  "static",
  "assets",
  "public",
  "upload",
  "uploads",
  "legal",
  "profile",
  "items",
  "catalog",
  "category",
]);

export async function GET() {
  const session = await getSession();

  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: { creatorProfile: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      username: user.username,
      displayName: user.displayName || user.creatorProfile?.displayName || "",
      bio: user.bio || user.creatorProfile?.bio || "",
      avatarUrl: user.avatarUrl || user.creatorProfile?.avatarUrl || "/avatars/avatar-1.svg",
      paymentLink: user.paymentLink || user.creatorProfile?.paymentLink || "",
      paymentQr: user.paymentQr || user.creatorProfile?.paymentQr || "",
    });
  } catch (error) {
    console.error("[PROFILE_GET_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await getSession();

  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      username,
      displayName,
      bio,
      avatarUrl,
      paymentLink,
      paymentQr,
      bannerUrl,
      accentColor,
      instagramUrl,
      xUrl,
      youtubeUrl,
      tiktokUrl,
    } = body;

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let updatedUsername = user.username;

    // If username is being changed
    if (username !== undefined) {
      const cleanUsername = username.toLowerCase().trim().replace(/^@+/, "");
      if (!cleanUsername) {
        return NextResponse.json({ error: "Username cannot be empty." }, { status: 400 });
      }

      const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
      if (!usernameRegex.test(cleanUsername)) {
        return NextResponse.json(
          { error: "Username must be 3-20 characters long and can only contain letters, numbers, underscores, or hyphens." },
          { status: 400 }
        );
      }

      if (RESERVED_USERNAMES.has(cleanUsername)) {
        return NextResponse.json(
          { error: "This username is reserved and cannot be claimed." },
          { status: 400 }
        );
      }

      if (cleanUsername !== user.username) {
        const existing = await prisma.user.findFirst({
          where: {
            username: { equals: cleanUsername, mode: "insensitive" },
            id: { not: user.id },
          },
        });

        if (existing) {
          return NextResponse.json(
            { error: "This username is already taken by another user." },
            { status: 409 }
          );
        }

        updatedUsername = cleanUsername;
      }
    }

    const cleanDisplayName = displayName !== undefined ? displayName.trim() : user.displayName;
    const cleanBio = bio !== undefined ? (bio.trim() ? bio.trim().slice(0, 160) : null) : user.bio;
    const cleanAvatar = avatarUrl !== undefined ? avatarUrl.trim() : user.avatarUrl;
    const cleanPaymentLink = paymentLink !== undefined ? paymentLink.trim() || null : user.paymentLink;
    const cleanPaymentQr = paymentQr !== undefined ? paymentQr.trim() || null : user.paymentQr;

    // Update User
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        username: updatedUsername,
        displayName: cleanDisplayName,
        bio: cleanBio,
        avatarUrl: cleanAvatar,
        paymentLink: cleanPaymentLink,
        paymentQr: cleanPaymentQr,
      },
    });

    // Update CreatorProfile
    await prisma.creatorProfile.upsert({
      where: { userId: user.id },
      update: {
        displayName: cleanDisplayName,
        bio: cleanBio,
        avatarUrl: cleanAvatar,
        paymentLink: cleanPaymentLink,
        paymentQr: cleanPaymentQr,
        ...(bannerUrl !== undefined ? { bannerUrl: bannerUrl || null } : {}),
        ...(accentColor !== undefined ? { accentColor: accentColor || "#f97316" } : {}),
        ...(instagramUrl !== undefined ? { instagramUrl: instagramUrl?.trim() || null } : {}),
        ...(xUrl !== undefined ? { xUrl: xUrl?.trim() || null } : {}),
        ...(youtubeUrl !== undefined ? { youtubeUrl: youtubeUrl?.trim() || null } : {}),
        ...(tiktokUrl !== undefined ? { tiktokUrl: tiktokUrl?.trim() || null } : {}),
      },
      create: {
        userId: user.id,
        displayName: cleanDisplayName,
        bio: cleanBio,
        avatarUrl: cleanAvatar,
        paymentLink: cleanPaymentLink,
        paymentQr: cleanPaymentQr,
        bannerUrl: bannerUrl || null,
        accentColor: accentColor || "#f97316",
        instagramUrl: instagramUrl?.trim() || null,
        xUrl: xUrl?.trim() || null,
        youtubeUrl: youtubeUrl?.trim() || null,
        tiktokUrl: tiktokUrl?.trim() || null,
      },
    });

    // Refresh session if username changed
    if (updatedUsername !== session.username) {
      await createSession(updatedUser.id, updatedUser.email, updatedUser.username);
    }

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        username: updatedUser.username,
        displayName: updatedUser.displayName,
        bio: updatedUser.bio,
        avatarUrl: updatedUser.avatarUrl,
        paymentLink: updatedUser.paymentLink,
        paymentQr: updatedUser.paymentQr,
      },
    });
  } catch (error) {
    console.error("[PROFILE_PATCH_ERROR]", error);
    return NextResponse.json({ error: "Failed to update profile settings" }, { status: 500 });
  }
}
