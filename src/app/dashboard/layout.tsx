import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/DashboardSidebar";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Authenticate session
  const session = await getSession();

  if (!session || !session.userId) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row text-zinc-100">
      {/* Responsive Dashboard Sidebar */}
      <DashboardSidebar
        email={session.email}
        username={session.username}
        isAdmin={session.isAdmin || false}
      />

      {/* Main Panel */}
      <main className="flex-1 md:ml-[280px] pt-16 md:pt-0 p-6 md:p-10 flex flex-col min-h-screen overflow-x-hidden">
        <div className="flex-1 max-w-5xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
