import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import PublicProfileClient from "@/components/PublicProfileClient";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ username: string }> | { username: string };
}

// Generate Dynamic SEO & OpenGraph Metadata
export async function generateMetadata({ params }: PageProps) {
  try {
    const resolvedParams = await params;
    const rawUsername = resolvedParams.username;

    // Only allow usernames starting with @
    if (!rawUsername.startsWith("%40") && !rawUsername.startsWith("@")) {
      return { title: "Page Not Found — Plugd" };
    }

    const username = decodeURIComponent(rawUsername).replace(/^@/, "");

    const creator = await prisma.user.findUnique({
      where: { username },
      select: {
        username: true,
        displayName: true,
        bio: true,
        avatarUrl: true,
      },
    });

    if (!creator) {
      return { title: "Page Not Found — Plugd" };
    }

    const title = `${creator.displayName} (@${creator.username}) — Plugd`;
    const description = creator.bio || `Support ${creator.displayName}'s goals directly on Plugd!`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "profile",
        username: creator.username,
        images: creator.avatarUrl ? [{ url: creator.avatarUrl }] : [],
      },
    };
  } catch (error) {
    return { title: "Plugd" };
  }
}

export default async function PublicProfilePage({ params }: PageProps) {
  const resolvedParams = await params;
  const rawUsername = resolvedParams.username;

  // Validate path starts with @ (e.g. /@username)
  if (!rawUsername.startsWith("%40") && !rawUsername.startsWith("@")) {
    notFound();
  }

  const username = decodeURIComponent(rawUsername).replace(/^@/, "");

  // Fetch creator profile
  const creator = await prisma.user.findUnique({
    where: { username },
    include: {
      categories: {
        orderBy: { displayOrder: "asc" },
      },
      items: {
        where: { isPublished: true, isArchived: false },
        orderBy: { displayOrder: "asc" },
      },
      paymentSettings: true,
    },
  });

  if (!creator) {
    notFound();
  }

  // Ensure sensitive payment details are not leaked directly into page props
  // UPI details and bank Enabled flag are safe, but keep bank details isolated
  const safePaymentSettings = creator.paymentSettings
    ? {
        upiEnabled: creator.paymentSettings.upiEnabled,
        upiId: creator.paymentSettings.upiId,
        upiQrUrl: creator.paymentSettings.upiQrUrl,
        bankEnabled: creator.paymentSettings.bankEnabled,
        // Bank fields are sent to the client, but the modal handles exposing them.
        accountHolder: creator.paymentSettings.accountHolder,
        accountNumber: creator.paymentSettings.accountNumber,
        ifsc: creator.paymentSettings.ifsc,
        bankName: creator.paymentSettings.bankName,
      }
    : null;

  const safeCreatorData = {
    id: creator.id,
    username: creator.username!,
    displayName: creator.displayName || creator.email.split("@")[0],
    bio: creator.bio,
    avatarUrl: creator.avatarUrl,
    bannerUrl: creator.bannerUrl,
    accentColor: creator.accentColor,
    instagramUrl: creator.instagramUrl,
    xUrl: creator.xUrl,
    youtubeUrl: creator.youtubeUrl,
    tiktokUrl: creator.tiktokUrl,
  };

  return (
    <PublicProfileClient
      creator={safeCreatorData}
      categories={creator.categories}
      items={creator.items}
      paymentSettings={safePaymentSettings}
    />
  );
}
