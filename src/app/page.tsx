import prisma from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";
import { getSession } from "@/lib/auth";
import { Suspense } from "react";

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
    ref = ""
  } = await searchParams;

  const session = await getSession();
  const userEmail = session?.email || null;

  return (
    <Suspense fallback={null}>
      <HomeClient 
        userEmail={userEmail}
        referralCode={ref}
      />
    </Suspense>
  );
}
