import prisma from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";
import { cookies } from "next/headers";

// Server component — fetches accounts at request time (SSR)
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ 
    page?: string;
    q?: string;
    niches?: string;
    followers?: string;
    status?: string;
    sort?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  const { 
    page: pageStr = "1", 
    q = "", 
    niches: nichesStr = "", 
    followers = "All Ranges", 
    status = "All",
    sort = "Latest"
  } = await searchParams;

  const currentPage = parseInt(pageStr);
  const PAGE_SIZE = 50;
  const skip = (currentPage - 1) * PAGE_SIZE;

  // Get user email for status filtering
  const cookieStore = await cookies();
  const userEmail = cookieStore.get("plugd_user_email")?.value || null;

  // Construct Prisma Filter
  const where: any = {
    status: "paid",
  };

  // Search filter
  if (q.trim()) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { xHandle: { contains: q, mode: 'insensitive' } },
      { bio: { contains: q, mode: 'insensitive' } },
    ];
  }

  // Niches filter
  if (nichesStr) {
    const selectedNiches = nichesStr.split(",").filter(Boolean);
    where.niche = {
      hasSome: selectedNiches
    };
  }

  // Followers filter
  if (followers !== "All Ranges") {
    where.followersRange = followers;
  }

  // Status filter (Requires User Status Join)
  if (userEmail && status !== "All") {
    if (status === "Not Viewed") {
      where.userStatuses = {
        none: { userId: userEmail }
      };
    } else {
      const statusMap: Record<string, string> = {
        "Followed": "followed",
        "Saved": "saved",
        "Not Interested": "not_interested"
      };
      where.userStatuses = {
        some: {
          userId: userEmail,
          status: statusMap[status]
        }
      };
    }
  }

  // Sorting
  let orderBy: any = { id: "desc" };
  if (sort === "Oldest") orderBy = { id: "asc" };
  // Shuffle is handled client-side or we can do random sort if we want, 
  // but for pagination shuffle is tricky. We'll stick to client-side shuffle 
  // or a stable random if needed. For now, Latest is default.

  try {
    // Fetch total count and current page accounts in parallel
    const [accounts, totalCount] = await Promise.all([
      prisma.account.findMany({
        where,
        orderBy,
        skip,
        take: PAGE_SIZE,
      }),
      prisma.account.count({ where })
    ]);

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

    return (
      <HomeClient 
        initialAccounts={serialized} 
        totalFilteredCount={totalCount}
        currentPage={currentPage}
        pageSize={PAGE_SIZE}
      />
    );
  } catch (error) {
    console.error("SSR fetch failed:", error);
    return <HomeClient initialAccounts={[]} totalFilteredCount={0} currentPage={1} pageSize={PAGE_SIZE} />;
  }
}
