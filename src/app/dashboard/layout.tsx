"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import DashboardSidebar from "@/components/DashboardSidebar";
import Footer from "@/components/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedEmail = localStorage.getItem("plugd_user_email");
    if (!storedEmail) {
      if (pathname !== "/dashboard/login") {
        router.push("/dashboard/login");
      } else {
        setIsLoading(false);
      }
    } else {
      setEmail(storedEmail);
      setIsLoading(false);
    }
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  // Don't show sidebar on login page
  if (pathname === "/dashboard/login") {
    return <>{children}</>;
  }

  // Admin check (hardcoded env check would be better in a server component, but we'll do simple check here)
  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@theplugd.com";
  const isAdmin = email === ADMIN_EMAIL;

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex overflow-hidden">
      <DashboardSidebar email={email || ""} isAdmin={isAdmin} />
      
      <main className="flex-1 ml-[280px] h-screen overflow-y-auto relative flex flex-col">
        <div className="p-12 flex-1 max-w-5xl">
          {children}
        </div>
        
        {/* Sidebar Footer (below sidebar style nav) */}
        <div className="px-12 pb-12">
          <Footer showBorder={true} />
        </div>
      </main>
    </div>
  );
}
