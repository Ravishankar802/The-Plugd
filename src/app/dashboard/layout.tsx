import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (!session.isPaid) {
    redirect("/login?error=not_paid");
  }

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "ravx003@gmail.com";
  const isAdmin = session.email.toLowerCase() === adminEmail.toLowerCase();

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar email={session.email} isAdmin={isAdmin} />
      <main className="flex-1 md:ml-[320px] p-6 md:p-12">
        {children}
      </main>
    </div>
  );
}
