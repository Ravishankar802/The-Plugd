import prisma from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";
import { getSession } from "@/lib/auth";

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
    ref?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  const { 
    page: pageStr = "1", 
    q = "", 
    niches: nichesStr = "", 
    followers = "All Ranges", 
    status = "All",
    sort = "Latest",
    ref = ""
  } = await searchParams;

  const currentPage = parseInt(pageStr);
  const PAGE_SIZE = 50;
  const skip = (currentPage - 1) * PAGE_SIZE;

  // Get user session for auth status and filtering
  const session = await getSession();
  const userEmail = session?.email || null;
  const initialIsPaid = session?.isPaid || session?.isAdmin || false;

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

  try {
    // Fetch total filtered count, current page accounts, ALL accounts for instant search, and absolute total paid count
    const [accounts, totalCount, allAccountsRaw, totalListedCount] = await Promise.all([
      prisma.account.findMany({
        where,
        orderBy,
        skip,
        take: PAGE_SIZE,
      }),
      prisma.account.count({ where }),
      prisma.account.findMany({
        where: { status: "paid" },
        select: { id: true, name: true, xHandle: true, avatarUrl: true },
        orderBy: { id: "desc" }
      }),
      prisma.account.count({ where: { status: "paid" } })
    ]);

    // Apply Shuffle if requested
    let displayAccounts = accounts;
    if (sort === "Shuffle") {
      displayAccounts = [...accounts].sort(() => Math.random() - 0.5);
    }

    // Serialize accounts
    const serialized = displayAccounts.map((a) => ({
      id: a.id,
      name: a.name,
      xHandle: a.xHandle,
      avatarUrl: a.avatarUrl ?? "",
      bio: a.bio,
      niche: a.niche,
      followersRange: a.followersRange,
      createdAt: a.createdAt.toISOString(),
    }));

    const allAccounts = allAccountsRaw.map(a => ({
      ...a,
      avatarUrl: a.avatarUrl ?? ""
    }));

    return (
      <HomeClient 
        initialAccounts={serialized} 
        allAccounts={allAccounts as any}
        totalFilteredCount={totalCount}
        totalListedCount={totalListedCount}
        currentPage={currentPage}
        pageSize={PAGE_SIZE}
        initialIsPaid={initialIsPaid}
        userEmail={userEmail}
        referralCode={ref}
      />
    );
  } catch (error) {
    console.error("SSR fetch failed:", error);
    return <HomeClient initialAccounts={[]} allAccounts={[]} totalFilteredCount={0} currentPage={1} pageSize={PAGE_SIZE} initialIsPaid={initialIsPaid} userEmail={userEmail} />;
  }
}
