"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Grid, LogOut, Moon, Sun, Monitor } from "lucide-react";
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
      <div className="px-8 py-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <span className="text-black font-black text-xl">P</span>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">The Plugd</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${
                isActive 
                  ? "bg-[#161616] text-white font-semibold" 
                  : "text-[#888888] hover:text-white hover:bg-[#161616]"
              }`}
            >
              <Icon size={18} className={isActive ? "text-white" : "text-[#555555]"} />
              <span className="text-[0.95rem]">{item.name}</span>
            </Link>
          );
        })}

        {isAdmin && (
          <div className="pt-10">
            <p className="px-4 text-[0.65rem] font-bold text-[#444444] uppercase tracking-[0.2em] mb-4">ADMIN</p>
            {adminItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${
                    isActive 
                      ? "bg-[#161616] text-white font-semibold" 
                      : "text-[#888888] hover:text-white hover:bg-[#161616]"
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-white" : "text-[#555555]"} />
                  <span className="text-[0.95rem]">{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* Bottom info */}
      <div className="p-4">
        <div className="bg-[#111111] border border-[#1a1a1a] rounded-2xl p-5 space-y-4 shadow-xl">
          <div>
            <p className="text-[0.65rem] text-[#444444] font-bold uppercase tracking-[0.15em] mb-1.5">Signed in as</p>
            <p className="text-[#eeeeee] font-bold text-sm truncate">{email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-transparent border border-[#1a1a1a] text-[#888888] hover:text-white hover:bg-[#161616] transition-all text-xs font-bold"
          >
            <LogOut size={14} />
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}
