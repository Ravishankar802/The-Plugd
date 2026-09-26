import { notFound } from "next/navigation";
import ItemDetailClient from "@/components/ItemDetailClient";
import PrivateWishlistNotice from "@/components/PrivateWishlistNotice";
import { resolveWishlistItem } from "@/lib/catalog";
import { getCreatorDisplayName } from "@/lib/creator";
import { getSession } from "@/lib/auth";
import { isWishlistPublic } from "@/lib/subscription";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface PublicItemPageProps {
  params: Promise<{ username: string; itemSlug: string }> | { username: string; itemSlug: string };
}

function normalizeUsername(rawUsername: string) {
  if (!rawUsername) return null;
  const decoded = decodeURIComponent(rawUsername);
  return decoded.replace(/^@/, "").trim();
}

export async function generateMetadata({ params }: PublicItemPageProps) {
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
  if (!isPublic) {
    return { title: `Wishlist Item • Plugd` };
  }

  const item = await prisma.wishlistItem.findFirst({
    where: {
      userId: user.id,
      slug: resolvedParams.itemSlug,
      isPublished: true,
    },
    include: {
      category: true,
      catalogItem: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!item) {
    return { title: "Plugd" };
  }

  const resolvedItem = resolveWishlistItem(item);
  const displayName = getCreatorDisplayName(user.creatorProfile, user.email.split("@")[0]);

  return {
    title: `${resolvedItem.name} — ${displayName}'s Wishlist | Plugd`,
    description:
      resolvedItem.personalNote ||
      resolvedItem.shortDescription ||
      `${resolvedItem.name} on ${displayName}'s Wishlist`,
  };
}

export default async function PublicItemPage({ params }: PublicItemPageProps) {
  const [resolvedParams, session] = await Promise.all([
    params,
    getSession(),
  ]);
  const username = normalizeUsername(resolvedParams.username);

  if (!username) {
    notFound();
  }

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      creatorProfile: true,
      subscription: true,
    },
  });

  if (!user) {
    notFound();
  }

  const isOwner = session?.userId === user.id;
  const isPublic = isWishlistPublic(user);
  const displayName = getCreatorDisplayName(user.creatorProfile, user.email.split("@")[0]);

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

  const item = await prisma.wishlistItem.findFirst({
    where: {
      userId: user.id,
      slug: resolvedParams.itemSlug,
      isPublished: true,
    },
    include: {
      category: true,
      catalogItem: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!item) {
    notFound();
  }

  const resolvedItem = resolveWishlistItem(item);

  return (
    <ItemDetailClient
      creator={{
        username: user.username || username,
        displayName: getCreatorDisplayName(user.creatorProfile, user.email.split("@")[0]),
        avatarUrl: user.creatorProfile?.avatarUrl,
        accentColor: user.creatorProfile?.accentColor,
      }}
      item={{
        name: resolvedItem.name,
        image: resolvedItem.image,
        shortDescription: resolvedItem.shortDescription,
        description: resolvedItem.description,
        personalNote: resolvedItem.personalNote,
        category: resolvedItem.category ? { name: resolvedItem.category.name } : null,
      }}
    />
  );
}
