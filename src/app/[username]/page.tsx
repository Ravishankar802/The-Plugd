import { notFound, redirect } from "next/navigation";
import PublicProfileClient from "@/components/PublicProfileClient";
import PrivateWishlistNotice from "@/components/PrivateWishlistNotice";
import { resolveWishlistItem } from "@/lib/catalog";
import { getCreatorDisplayName } from "@/lib/creator";
import { getSession } from "@/lib/auth";
import { isWishlistPublic } from "@/lib/subscription";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface PublicProfilePageProps {
  params: Promise<{ username: string }> | { username: string };
}

function normalizeUsername(rawUsername: string) {
  if (!rawUsername) return null;
  const decoded = decodeURIComponent(rawUsername);
  return decoded.replace(/^@/, "").trim();
}

export async function generateMetadata({ params }: PublicProfilePageProps) {
  const resolvedParams = await params;
  const username = normalizeUsername(resolvedParams.username);

  if (!username) {
    return { title: "Plugd" };
  }

  const user = await prisma.user.findUnique({
    where: { username },
    include: { creatorProfile: true, subscription: true },
  });

  if (!user) {
    return { title: "Plugd" };
  }

  const isPublic = isWishlistPublic(user);
  const displayName = getCreatorDisplayName(user.creatorProfile, user.displayName || user.email.split("@")[0]);

  if (!isPublic) {
    return {
      title: `${displayName} (@${username}) • Plugd`,
      description: `@${username}'s wishlist on Plugd`,
    };
  }

  return {
    title: `${displayName} (@${username}) • Plugd Wishlist`,
    description: user.bio || user.creatorProfile?.bio || `${displayName}'s Wishlist on Plugd`,
  };
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const [resolvedParams, session] = await Promise.all([
    params,
    getSession(),
  ]);

  // Clean canonical redirect if accessed with @
  if (resolvedParams.username.startsWith("@") || resolvedParams.username.startsWith("%40")) {
    const clean = normalizeUsername(resolvedParams.username);
    if (clean) {
      redirect(`/${clean}`);
    }
  }

  const username = normalizeUsername(resolvedParams.username);

  if (!username) {
    notFound();
  }

  const user = await prisma.user.findFirst({
    where: { username: { equals: username, mode: "insensitive" } },
    include: {
      creatorProfile: true,
      subscription: true,
      wishlistItems: {
        where: { isPublished: true },
        include: {
          category: true,
          catalogItem: {
            include: {
              category: true,
            },
          },
        },
        orderBy: [{ isFeatured: "desc" }, { displayOrder: "asc" }, { createdAt: "asc" }],
      },
    },
  });

  if (!user) {
    notFound();
  }

  const isOwner = session?.userId === user.id;
  const isPublic = isWishlistPublic(user);
  const displayName = getCreatorDisplayName(user.creatorProfile, user.displayName || user.email.split("@")[0]);

  // If wishlist is private and viewer is NOT the owner:
  // Render clean Private Wishlist Notice and NEVER leak items.
  if (!isPublic && !isOwner) {
    return (
      <PrivateWishlistNotice
        displayName={displayName}
        username={user.username || username}
        avatarUrl={user.avatarUrl || user.creatorProfile?.avatarUrl}
        isLoggedIn={Boolean(session?.userId)}
      />
    );
  }

  const items = user.wishlistItems.map(resolveWishlistItem);
  const categories = Array.from(
    new Map(
      items
        .filter((item) => item.category)
        .map((item) => [item.category!.id, item.category!]),
    ).values(),
  );

  return (
    <PublicProfileClient
      creator={{
        username: user.username || username,
        displayName,
        bio: user.bio || user.creatorProfile?.bio,
        avatarUrl: user.avatarUrl || user.creatorProfile?.avatarUrl,
        paymentLink: user.paymentLink || user.creatorProfile?.paymentLink,
        paymentQr: user.paymentQr || user.creatorProfile?.paymentQr,
        instagramUrl: user.creatorProfile?.instagramUrl,
        xUrl: user.creatorProfile?.xUrl,
        youtubeUrl: user.creatorProfile?.youtubeUrl,
        tiktokUrl: user.creatorProfile?.tiktokUrl,
      }}
      categories={categories}
      items={items}
      isOwner={isOwner}
      isViewerLoggedIn={Boolean(session?.userId)}
      isWishlistPublic={isPublic}
      isSubscribed={Boolean(user.subscription && user.subscription.status === "ACTIVE")}
      subscriptionPlan={user.subscription?.plan || null}
    />
  );
}
