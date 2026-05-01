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
    <aside className="w-[280px] bg-[#111111] border-r border-[#2a2a2a] flex flex-col h-screen fixed left-0 top-0 z-30">
      {/* Top: Logo */}
      <div className="p-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-black font-black text-xl">P</span>
          </div>
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
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? "bg-white text-black font-bold" 
                  : "text-[#a1a1aa] hover:text-white hover:bg-[#1a1a1a]"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}

        {isAdmin && (
          <div className="pt-8">
            <p className="px-4 text-[0.7rem] font-bold text-[#52525b] uppercase tracking-[0.15em] mb-4">ADMIN</p>
            {adminItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive 
                      ? "bg-white text-black font-bold" 
                      : "text-[#a1a1aa] hover:text-white hover:bg-[#1a1a1a]"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* Bottom info */}
      <div className="p-4">
        <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-6 space-y-4 shadow-xl">
          <div>
            <p className="text-[0.7rem] text-[#52525b] font-bold uppercase tracking-[0.15em] mb-1">Signed in as</p>
            <p className="text-white font-bold text-sm truncate">{email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-transparent border border-[#2a2a2a] text-[#a1a1aa] hover:text-white hover:bg-[#1a1a1a] transition-all text-sm font-medium"
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}
