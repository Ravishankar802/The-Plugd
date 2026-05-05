import prisma from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";

// Server component — fetches accounts at request time (SSR)
// force-dynamic ensures fresh DB data on every request, not stale build-time snapshot
export const dynamic = "force-dynamic";

export default async function Home() {
  let accounts: Awaited<ReturnType<typeof prisma.account.findMany>> = [];
  try {
    accounts = await prisma.account.findMany({
      where: { status: "paid" },
      orderBy: { createdAt: "desc" },
    });
    console.log("SSR Accounts count:", accounts.length);
  } catch (error) {
    console.error("SSR fetch failed:", error);
  }

  // Serialize dates to strings for client component
  const serialized = accounts.map((a) => ({
    id: a.id,
    name: a.name,
    xHandle: a.xHandle,
    avatarUrl: a.avatarUrl ?? "",
    bio: a.bio,
    niche: a.niche,
    followersRange: a.followersRange,
    createdAt: a.createdAt.toISOString(),
  }));

  return <HomeClient initialAccounts={serialized} />;
}
