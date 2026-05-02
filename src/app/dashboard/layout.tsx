"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import DashboardSidebar from "@/components/DashboardSidebar";
import Footer from "@/components/Footer";
import { User, LayoutGrid, LogOut } from "lucide-react";
import Link from "next/link";

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
        router.replace("/dashboard/login");
      } else {
        setIsLoading(false);
      }
    } else {
      setEmail(storedEmail);
      setIsLoading(false);
    }
  }, [router, pathname]);

  // Prevent back button from going to login page
  useEffect(() => {
    if (pathname === "/dashboard" || pathname === "/dashboard/manage") {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = () => {
        router.replace("/");
      };
    }
    return () => {
      window.onpopstate = null;
    };
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-muted border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  // Don't show sidebar on login page
  if (pathname === "/dashboard/login") {
    return <>{children}</>;
  }

  // Admin check
  const isAdmin = email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row overflow-x-hidden">
      <DashboardSidebar email={email || ""} isAdmin={isAdmin} />
      
      <main className="flex-1 md:ml-[320px] relative flex flex-col min-h-screen">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-6 py-4 border-b border-border bg-background sticky top-0 z-40">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-full h-full fill-none stroke-[#ff6b00] stroke-[2.5]">
                <line x1="20" y1="20" x2="8" y2="8" className="opacity-60" />
                <line x1="20" y1="20" x2="32" y2="8" className="opacity-60" />
                <line x1="20" y1="20" x2="37" y2="25" className="opacity-60" />
                <line x1="20" y1="20" x2="25" y2="37" className="opacity-60" />
                <line x1="20" y1="20" x2="3" y2="28" className="opacity-60" />
                <circle cx="20" cy="20" r="5" className="fill-[#ff6b00] stroke-none" />
                <circle cx="8" cy="8" r="2.5" className="fill-[#ff6b00] stroke-none opacity-90" />
                <circle cx="32" cy="8" r="2.5" className="fill-[#ff6b00] stroke-none opacity-90" />
                <circle cx="37" cy="25" r="2.5" className="fill-[#ff6b00] stroke-none opacity-90" />
                <circle cx="25" cy="37" r="2.5" className="fill-[#ff6b00] stroke-none opacity-90" />
                <circle cx="3" cy="28" r="2.5" className="fill-[#ff6b00] stroke-none opacity-90" />
              </svg>
            </div>
            <span className="text-xl font-[900] text-foreground tracking-[-0.02em]">Plugd</span>
          </Link>
          <div className="text-[0.8rem] text-muted font-medium truncate max-w-[150px]">
            {email}
          </div>
        </div>

        <div className="pt-6 md:pt-10 px-4 md:px-10 pb-20 md:pb-4 flex-1 w-full max-w-5xl mx-auto">
          {children}
        </div>
        
        {/* Mobile Bottom Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border px-6 py-3 flex items-center justify-around z-50">
          <Link 
            href="/dashboard" 
            className={`flex flex-col items-center gap-1 ${pathname === "/dashboard" ? "text-[#ff6b00]" : "text-muted"}`}
          >
            <User size={20} />
            <span className="text-[0.7rem] font-medium">Profile</span>
          </Link>
          
          {isAdmin && (
            <Link 
              href="/dashboard/manage" 
              className={`flex flex-col items-center gap-1 ${pathname === "/dashboard/manage" ? "text-[#ff6b00]" : "text-muted"}`}
            >
              <LayoutGrid size={20} />
              <span className="text-[0.7rem] font-medium">Manage</span>
            </Link>
          )}

          <button 
            onClick={() => {
              localStorage.removeItem("plugd_user_email");
              window.location.href = "/dashboard/login";
            }}
            className="flex flex-col items-center gap-1 text-muted"
          >
            <LogOut size={20} />
            <span className="text-[0.7rem] font-medium">Logout</span>
          </button>
        </div>

        {/* Sidebar Footer (below sidebar style nav) */}
        <div className="px-6 md:px-10 pb-24 md:pb-4 pt-8">
          <Footer showBorder={true} />
        </div>
      </main>
    </div>
  );
}
