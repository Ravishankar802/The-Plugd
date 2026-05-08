import prisma from "@/lib/prisma";
import StatsClient from "@/components/StatsClient";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const FOLLOWERS_RANGES = [
  "0-100", "100-500", "500-1K", "1K-2K", "2K-5K", "5K-10K", "10K-25K", "25K-50K", "50K-100K", "100K+"
];

export default async function StatsPage() {
  const totalCount = await prisma.account.count({ where: { status: "paid" } });

  // Fetch follower stats
  const followerStats = await Promise.all(FOLLOWERS_RANGES.map(async range => {
    const count = await prisma.account.count({ where: { status: "paid", followersRange: range } });
    return { range, count };
  }));

  // Fetch niche stats
  const allAccounts = await prisma.account.findMany({ 
    where: { status: "paid" }, 
    select: { niche: true } 
  });
  
  const nicheCounts: Record<string, number> = {};
  allAccounts.forEach(acc => {
    acc.niche.forEach(n => {
      nicheCounts[n] = (nicheCounts[n] || 0) + 1;
    });
  });

  const nicheStats = Object.entries(nicheCounts)
    .map(([niche, count]) => ({ niche, count }))
    .sort((a, b) => b.count - a.count);

  // Auth/Payment check for ticker
  const cookieStore = await cookies();
  const userEmail = cookieStore.get("plugd_user_email")?.value || null;
  
  let isPaidUser = false;
  if (userEmail) {
    const user = await prisma.account.findFirst({
      where: { email: userEmail, status: "paid" }
    });
    isPaidUser = !!user;
  }

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
