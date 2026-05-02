import prisma from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";

// Server component — fetches accounts at request time (SSR)
export default async function Home() {
  let accounts: Awaited<ReturnType<typeof prisma.account.findMany>> = [];
  try {
    accounts = await prisma.account.findMany({
      where: { status: "paid" },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("SSR fetch failed:", error);
  }

  // Serialize dates to strings for client component
  const serialized = accounts.map((a) => ({
    id: a.id,
    name: a.name,
    xHandle: a.xHandle,
    avatarPath: a.avatarPath ?? "",
    bio: a.bio,
    niche: a.niche[0] ?? "", // HomeClient Account interface expects string, not string[]
    followersRange: a.followersRange,
    createdAt: a.createdAt.toISOString(),
  }));

  return <HomeClient initialAccounts={serialized} />;
}
