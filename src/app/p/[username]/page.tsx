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

  const COUNTRY_TO_ISO: Record<string, string> = {
    "Afghanistan": "af", "Albania": "al", "Algeria": "dz", "Angola": "ao", "Argentina": "ar", "Armenia": "am", "Australia": "au", "Austria": "at", "Azerbaijan": "az",
    "Bahrain": "bh", "Bangladesh": "bd", "Belarus": "by", "Belgium": "be", "Benin": "bj", "Bolivia": "bo", "Bosnia and Herzegovina": "ba", "Botswana": "bw",
    "Brazil": "br", "Bulgaria": "bg", "Burkina Faso": "bf", "Cambodia": "kh", "Cameroon": "cm", "Canada": "ca", "Chile": "cl", "China": "cn", "Colombia": "co",
    "Costa Rica": "cr", "Croatia": "hr", "Cyprus": "cy", "Czech Republic": "cz", "Denmark": "dk", "Dominican Republic": "do", "Ecuador": "ec", "Egypt": "eg",
    "El Salvador": "sv", "Estonia": "ee", "Ethiopia": "et", "Finland": "fi", "France": "fr", "Georgia": "ge", "Germany": "de", "Ghana": "gh", "Greece": "gr",
    "Guatemala": "gt", "Honduras": "hn", "Hong Kong": "hk", "Hungary": "hu", "Iceland": "is", "India": "in", "Indonesia": "id", "Iraq": "iq", "Ireland": "ie",
    "Israel": "il", "Italy": "it", "Ivory Coast": "ci", "Jamaica": "jm", "Japan": "jp", "Jordan": "jo", "Kazakhstan": "kz", "Kenya": "ke", "Kosovo": "xk",
    "Kuwait": "kw", "Kyrgyzstan": "kg", "Latvia": "lv", "Lebanon": "lb", "Libya": "ly", "Lithuania": "lt", "Luxembourg": "lu", "Malaysia": "my", "Mali": "ml",
    "Malta": "mt", "Mexico": "mx", "Moldova": "md", "Mongolia": "mn", "Morocco": "ma", "Mozambique": "mz", "Myanmar": "mm", "Namibia": "na", "Nepal": "np",
    "Netherlands": "nl", "New Zealand": "nz", "Nicaragua": "ni", "Niger": "ne", "Nigeria": "ng", "North Macedonia": "mk", "Norway": "no", "Oman": "om",
    "Pakistan": "pk", "Palestine": "ps", "Panama": "pa", "Paraguay": "py", "Peru": "pe", "Philippines": "ph", "Poland": "pl", "Portugal": "pt", "Qatar": "qa",
    "Romania": "ro", "Russia": "ru", "Rwanda": "rw", "Saudi Arabia": "sa", "Senegal": "sn", "Serbia": "rs", "Sierra Leone": "sl", "Singapore": "sg",
    "Slovakia": "sk", "Slovenia": "si", "South Africa": "za", "South Korea": "kr", "Spain": "es", "Sri Lanka": "lk", "Sweden": "se", "Switzerland": "ch",
    "Taiwan": "tw", "Tajikistan": "tj", "Tanzania": "tz", "Thailand": "th", "Tunisia": "tn", "Turkey": "tr", "Turkmenistan": "tm", "Uganda": "ug",
    "Ukraine": "ua", "United Arab Emirates": "ae", "United Kingdom": "gb", "United States": "us", "Uruguay": "uy", "Uzbekistan": "uz",
    "Venezuela": "ve", "Vietnam": "vn", "Yemen": "ye", "Zambia": "zm", "Zimbabwe": "zw"
  };

  const countryName = promoter.payoutRegion === "INDIA" ? "India" : (promoter.intlBankCountry || "United States");
  const countryIso = COUNTRY_TO_ISO[countryName] || "us";
  const flagCodePoints = countryIso.toUpperCase().split("").map(char => 127397 + char.charCodeAt(0));
  let flag = "🌐";
  try {
    flag = String.fromCodePoint(...flagCodePoints);
  } catch (e) {}

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
