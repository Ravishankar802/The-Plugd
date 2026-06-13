import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import PublicProfileClient from "@/components/PublicProfileClient";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ username: string }> | { username: string };
}

export default async function PublicProfilePage({ params }: PageProps) {
  // Resolve params if it's a promise (Next.js 15 convention)
  const resolvedParams = await params;
  const username = resolvedParams.username;

  const promoter = await prisma.promoter.findFirst({
    where: {
      OR: [
        { username: { equals: username, mode: "insensitive" } },
        { referralCode: { equals: username, mode: "insensitive" } }
      ]
    },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      referralCode: true,
      avatarUrl: true,
      payoutRegion: true,
      intlBankCountry: true,
      totalEarned: true,
      totalClicks: true,
      totalConversions: true,
      createdAt: true
    }
  });

  if (!promoter) {
    notFound();
  }

  const FLAG_MAP: Record<string, string> = {
    "United States": "🇺🇸",
    "United Kingdom": "🇬🇧",
    "Australia": "🇦🇺",
    "Canada": "🇨🇦",
    "Germany": "🇩🇪",
    "India": "🇮🇳",
    "France": "🇫🇷",
    "Netherlands": "🇳🇱",
    "Singapore": "🇸🇬",
    "Spain": "🇪🇸",
    "Italy": "🇮🇹",
    "Sweden": "🇸🇪",
    "Switzerland": "🇨🇭"
  };

  const countryName = promoter.payoutRegion === "INDIA" ? "India" : (promoter.intlBankCountry || "United States");
  const flag = FLAG_MAP[countryName] || "🌐";

  // Find database rank of this promoter to calculate their exact dailyRate
  const allPromoters = await prisma.promoter.findMany({
    orderBy: { totalEarned: "desc" },
    select: { id: true }
  });
  const rank = allPromoters.findIndex(p => p.id === promoter.id) + 1;

  const safePromoterData = {
    id: promoter.id,
    name: promoter.name,
    email: promoter.email,
    rank: rank,
    username: promoter.username || promoter.referralCode,
    referralCode: promoter.referralCode,
    avatarUrl: promoter.avatarUrl,
    country: countryName,
    flag: flag,
    totalEarned: promoter.totalEarned,
    totalClicks: promoter.totalClicks,
    totalConversions: promoter.totalConversions,
    createdAt: promoter.createdAt.toISOString()
  };

  return <PublicProfileClient promoter={safePromoterData} />;
}
