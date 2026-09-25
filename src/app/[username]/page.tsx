import { notFound } from "next/navigation";
import PublicProfileClient from "@/components/PublicProfileClient";
import { resolveWishlistItem } from "@/lib/catalog";
import { getCreatorDisplayName } from "@/lib/creator";
import { getSession } from "@/lib/auth";
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

  const displayName = getCreatorDisplayName(user.creatorProfile, user.displayName || user.email.split("@")[0]);

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
  const username = normalizeUsername(resolvedParams.username);

  if (!username) {
    notFound();
  }

  const user = await prisma.user.findFirst({
    where: { username: { equals: username, mode: "insensitive" } },
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

  const isOwner = session?.userId === user.id;

  return (
    <PublicProfileClient
      creator={{
        username: user.username || username,
        displayName: getCreatorDisplayName(user.creatorProfile, user.displayName || user.email.split("@")[0]),
        bio: user.bio || user.creatorProfile?.bio,
        avatarUrl: user.avatarUrl || user.creatorProfile?.avatarUrl,
        paymentLink: user.paymentLink || user.creatorProfile?.paymentLink,
        paymentQr: user.paymentQr || user.creatorProfile?.paymentQr,
      }}
      categories={categories}
      items={items}
      isOwner={isOwner}
      isViewerLoggedIn={Boolean(session?.userId)}
    />
  );
}
