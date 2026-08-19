import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ItemDetailClient from "@/components/ItemDetailClient";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ username: string; itemSlug: string }> | { username: string; itemSlug: string };
}

// Generate Dynamic SEO & OpenGraph Metadata for Individual Items
export async function generateMetadata({ params }: PageProps) {
  try {
    const resolvedParams = await params;
    const rawUsername = resolvedParams.username;
    const itemSlug = resolvedParams.itemSlug;

    if (!rawUsername.startsWith("%40") && !rawUsername.startsWith("@")) {
      return { title: "Goal Not Found — Plugd" };
    }

    const username = decodeURIComponent(rawUsername).replace(/^@/, "");

    const creator = await prisma.user.findUnique({
      where: { username },
    });

    if (!creator) {
      return { title: "Page Not Found — Plugd" };
    }

    const item = await prisma.item.findFirst({
      where: {
        userId: creator.id,
        slug: itemSlug,
        isPublished: true,
        isArchived: false,
      },
    });

    if (!item) {
      return { title: "Goal Not Found — Plugd" };
    }

    const title = `Support ${creator.displayName}'s ${item.name} — Plugd`;
    const description = item.shortDescription || `Help ${creator.displayName} reach their support goal: ${item.name}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        images: item.imageUrl ? [{ url: item.imageUrl }] : [],
      },
    };
  } catch (error) {
    return { title: "Plugd" };
  }
}

export default async function ItemDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const rawUsername = resolvedParams.username;
  const itemSlug = resolvedParams.itemSlug;

  // Validate path starts with @ (e.g. /@username)
  if (!rawUsername.startsWith("%40") && !rawUsername.startsWith("@")) {
    notFound();
  }

  const username = decodeURIComponent(rawUsername).replace(/^@/, "");

  // 1. Fetch creator
  const creator = await prisma.user.findUnique({
    where: { username },
  });

  if (!creator) {
    notFound();
  }

  // 2. Fetch item details (must be published and not archived)
  const item = await prisma.item.findFirst({
    where: {
      userId: creator.id,
      slug: itemSlug,
      isPublished: true,
      isArchived: false,
    },
    include: {
      category: {
        select: {
          name: true,
          icon: true,
        },
      },
    },
  });

  if (!item) {
    notFound();
  }

  // 3. Fetch payment settings
  const paymentSettings = await prisma.paymentSettings.findUnique({
    where: { userId: creator.id },
  });

  const safePaymentSettings = paymentSettings
    ? {
        upiEnabled: paymentSettings.upiEnabled,
        upiId: paymentSettings.upiId,
        upiQrUrl: paymentSettings.upiQrUrl,
        bankEnabled: paymentSettings.bankEnabled,
        accountHolder: paymentSettings.accountHolder,
        accountNumber: paymentSettings.accountNumber,
        ifsc: paymentSettings.ifsc,
        bankName: paymentSettings.bankName,
      }
    : null;

  const safeCreatorData = {
    username: creator.username!,
    displayName: creator.displayName || creator.email.split("@")[0],
    avatarUrl: creator.avatarUrl,
    accentColor: creator.accentColor,
  };

  const safeItemData = {
    id: item.id,
    name: item.name,
    slug: item.slug,
    shortDescription: item.shortDescription,
    description: item.description,
    imageUrl: item.imageUrl,
    createdAt: item.createdAt.toISOString(),
    category: item.category,
  };

  return (
    <ItemDetailClient
      creator={safeCreatorData}
      item={safeItemData}
      paymentSettings={safePaymentSettings}
    />
  );
}
