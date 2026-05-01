"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Grid, LogOut, Zap, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface DashboardSidebarProps {
  email: string;
  isAdmin: boolean;
}

export default function DashboardSidebar({ email, isAdmin }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("plugd_user_email");
    router.push("/dashboard/login");
  };

  const navItems = [
    { name: "Profile", href: "/dashboard", icon: User },
  ];

  const adminItems = [
    { name: "Manage Accounts", href: "/dashboard/manage", icon: Grid },
  ];

  return (
    <aside className="w-[280px] bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col h-screen fixed left-0 top-0 z-30">
      {/* Top: Logo */}
      <div className="px-5 py-6">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Zap className="w-8 h-8 text-[#ff6b00] fill-[#ff6b00]" />
          <span className="text-xl font-bold text-white tracking-tight">The Plugd</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-[0.65rem] rounded-lg transition-all ${
                isActive 
                  ? "bg-[#1f1f1f] text-white font-bold" 
                  : "text-[#8b8b8b] hover:text-white"
              }`}
            >
              <Icon size={18} className={isActive ? "text-white" : "text-[#8b8b8b]"} />
              <span className="text-[0.9rem]">{item.name}</span>
            </Link>
          );
        })}

        {isAdmin && (
          <div className="mt-6">
            <p className="px-4 text-[0.7rem] font-bold text-[#6b7280] uppercase tracking-[0.1em] mb-2">ADMIN</p>
            {adminItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-[0.65rem] rounded-lg transition-all ${
                    isActive 
                      ? "bg-[#1f1f1f] text-white font-bold" 
                      : "text-[#8b8b8b] hover:text-white"
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-white" : "text-[#8b8b8b]"} />
                  <span className="text-[0.9rem]">{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* Bottom info */}
      <div className="m-4">
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 space-y-4 shadow-xl">
          <div>
            <p className="text-[0.75rem] text-[#6b7280] mb-1">Signed in as</p>
            <p className="text-white font-semibold text-[0.875rem] truncate" title={email}>{email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-md bg-transparent border border-[#2a2a2a] text-[#8b8b8b] hover:border-[#dc2626] hover:text-[#dc2626] transition-all text-[0.85rem] font-medium"
          >
            <ArrowRight size={14} />
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}
