import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/DashboardSidebar";
import Footer from "@/components/Footer";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "ravx003@gmail.com";
  const isAdmin = session.email.toLowerCase() === adminEmail.toLowerCase();
  
  if (!isAdmin) {
    redirect("/vault");
  }

  return (
    <div className="min-h-screen bg-background flex" style={{ fontFamily: 'Georgia, serif' }}>
      <DashboardSidebar 
        email={session.email} 
        isAdmin={isAdmin} 
        hasAccount={true} 
        hasPromoter={true} 
      />
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
