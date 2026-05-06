"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, LayoutGrid, LogOut, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface DashboardSidebarProps {
  email: string;
  isAdmin: boolean;
}

export default function DashboardSidebar({ email, isAdmin }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("plugd_user_email");
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navItems = [
    { name: "Profile", href: "/dashboard", icon: User },
  ];

  const adminItems = [
    { name: "Manage Accounts", href: "/admin", icon: LayoutGrid },
  ];

  return (
    <aside className="hidden md:flex w-[320px] bg-background border-r border-border flex-col h-screen fixed left-0 top-0 z-30">
      {/* Top: Logo */}
      <div className="px-6 pt-10 pb-6">
        <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 flex items-center justify-center">
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
          <span className="text-2xl font-[900] text-foreground tracking-[-0.02em]">Plugd</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-5 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-[0.75rem] rounded-xl transition-all ${
                isActive 
                  ? "bg-foreground/[0.05] border border-foreground/[0.08] text-foreground shadow-sm backdrop-blur-md" 
                  : "text-muted hover:text-foreground"
              }`}
            >
              <Icon size={18} className={isActive ? "text-foreground" : "text-muted"} />
              <span className={`text-[0.95rem] tracking-tight ${isActive ? "font-semibold" : "font-medium"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}

        {isAdmin && (
          <div className="mt-6">
            <div className="h-[1px] bg-border mx-4 mb-6" />
            <p className="px-4 text-[0.75rem] font-bold text-muted/40 uppercase tracking-[0.15em] mb-4">Administration</p>
            {adminItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-[0.75rem] rounded-xl transition-all ${
                    isActive 
                      ? "bg-foreground/[0.05] border border-foreground/[0.08] text-foreground shadow-sm backdrop-blur-md" 
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-foreground" : "text-muted"} />
                  <span className={`text-[0.95rem] tracking-tight ${isActive ? "font-semibold" : "font-medium"}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* Bottom info */}
      <div className="mx-3 mb-4">
        <div className="bg-pill border border-border rounded-xl p-5 space-y-4 shadow-2xl backdrop-blur-xl">
          <div>
            <p className="text-[0.8rem] text-muted lowercase font-normal mb-1">signed in as</p>
            <p className="text-foreground font-semibold text-[0.95rem] tracking-tight truncate" title={email}>{email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-lg bg-background border border-pill-border text-foreground hover:text-foreground hover:bg-accent transition-all text-[0.9rem] font-medium group"
          >
            <LogOut size={16} className="text-muted group-hover:text-foreground transition-colors" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
