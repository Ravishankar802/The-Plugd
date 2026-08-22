import { notFound } from "next/navigation";
import PublicProfileClient from "@/components/PublicProfileClient";
import { ensureCatalogSeeded, resolveWishlistItem } from "@/lib/catalog";
import { getCreatorDisplayName } from "@/lib/creator";
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
    include: { creatorProfile: true },
  });

  if (!user) {
    return { title: "Plugd" };
  }

  const displayName = getCreatorDisplayName(user.creatorProfile, user.email.split("@")[0]);

  return {
    title: `${displayName}'s Wishlist | Plugd`,
    description: user.creatorProfile?.bio || `${displayName}'s Wishlist on Plugd`,
  };
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  await ensureCatalogSeeded();
  const resolvedParams = await params;
  const username = normalizeUsername(resolvedParams.username);

  if (!username) {
    notFound();
  }

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      creatorProfile: true,
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
        displayName: getCreatorDisplayName(user.creatorProfile, user.email.split("@")[0]),
        bio: user.creatorProfile?.bio,
        avatarUrl: user.creatorProfile?.avatarUrl,
        bannerUrl: user.creatorProfile?.bannerUrl,
        accentColor: user.creatorProfile?.accentColor,
        instagramUrl: user.creatorProfile?.instagramUrl,
        xUrl: user.creatorProfile?.xUrl,
        youtubeUrl: user.creatorProfile?.youtubeUrl,
        tiktokUrl: user.creatorProfile?.tiktokUrl,
      }}
      categories={categories}
      items={items}
    />
  );
}
