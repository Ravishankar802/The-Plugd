import prisma from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";

// Server component — fetches accounts at request time (SSR)
export const dynamic = "force-dynamic";

export default async function Home() {
  try {
    const accounts = await prisma.account.findMany({
      where: { status: "paid" },
      orderBy: { id: "desc" },
    });

    // Serialize accounts
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
  } catch (error) {
    console.error("SSR fetch failed:", error);
    return <HomeClient initialAccounts={[]} />;
  }
}
