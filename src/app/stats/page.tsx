import prisma from "@/lib/prisma";
import StatsClient from "@/components/StatsClient";
import { cookies } from "next/headers";

export const revalidate = 60;

const FOLLOWERS_RANGES = [
  "0-100", "100-500", "500-1K", "1K-2K", "2K-5K", "5K-10K", "10K-25K", "25K-50K", "50K-100K", "100K+"
];

export default async function StatsPage() {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get("plugd_user_email")?.value || null;

  // Run all independent queries in parallel
  const [totalCount, groupedFollowers, allAccounts, user] = await Promise.all([
    prisma.account.count({ where: { status: "paid" } }),
    prisma.account.groupBy({
      by: ['followersRange'],
      where: { status: "paid" },
      _count: { _all: true }
    }),
    prisma.account.findMany({ 
      where: { status: "paid" }, 
      select: { niche: true } 
    }),
    userEmail ? prisma.account.findFirst({
      where: { email: userEmail, status: "paid" }
    }) : Promise.resolve(null)
  ]);

  // Process follower stats
  const followerStatsMap = Object.fromEntries(groupedFollowers.map(g => [g.followersRange, g._count._all]));
  const followerStats = FOLLOWERS_RANGES.map(range => ({
    range,
    count: followerStatsMap[range] || 0
  }));

  // Process niche stats
  const nicheCounts: Record<string, number> = {};
  allAccounts.forEach(acc => {
    acc.niche.forEach(n => {
      nicheCounts[n] = (nicheCounts[n] || 0) + 1;
    });
  });

  const nicheStats = Object.entries(nicheCounts)
    .map(([niche, count]) => ({ niche, count }))
    .sort((a, b) => b.count - a.count);

  const isPaidUser = !!user;

  return (
    <StatsClient 
      totalCount={totalCount}
      followerStats={followerStats}
      nicheStats={nicheStats}
      isPaidUser={isPaidUser}
      userEmail={userEmail}
    />
  );
}
