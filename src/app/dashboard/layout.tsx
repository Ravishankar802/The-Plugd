import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/DashboardSidebar";
import Footer from "@/components/Footer";
import prisma from "@/lib/prisma";
import { Suspense } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || !session.email) {
    redirect("/login");
  }

  const email = session.email.toLowerCase();
  let account = null;
  let promoter = null;

  try {
    const [accountData, promoterData] = await Promise.all([
      prisma.account.findFirst({ 
        where: { email, paid: true },
        orderBy: [
          { isClaimed: 'desc' },
          { createdAt: 'desc' }
        ]
      }),
      prisma.promoter.findUnique({ where: { email } })
    ]);
    account = accountData;
    promoter = promoterData;
  } catch (error) {
    console.error("Dashboard layout fetch error:", error);
  }

  const adminEmail = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "ravx003@gmail.com").toLowerCase();
  const isAdmin = email === adminEmail;

  if (!account && !promoter && !isAdmin) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Suspense fallback={<div className="hidden md:flex w-[320px] bg-background border-r border-border h-screen fixed left-0 top-0 z-30" />}>
        <DashboardSidebar 
          email={email} 
          isAdmin={isAdmin} 
          hasAccount={!!account}
          hasPromoter={!!promoter}
        />
      </Suspense>
      <main className="flex-1 md:ml-[320px] p-6 md:p-12 flex flex-col min-h-screen">
        <div className="flex-1">
          {children}
        </div>
        <div className="mt-12">
          <Footer />
        </div>
      </main>
    </div>
  );
}
