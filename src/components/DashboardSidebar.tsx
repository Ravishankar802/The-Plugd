"use client";

import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, Heart, Palette, ExternalLink, LogOut, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface DashboardSidebarProps {
  email: string;
  username?: string | null;
  isAdmin: boolean;
}

export default function DashboardSidebar({ email, username }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Wishlist", href: "/dashboard/items", icon: Heart },
    { name: "Appearance", href: "/dashboard/appearance", icon: Palette },
  ];

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-zinc-900 bg-zinc-950/90 px-4 backdrop-blur md:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Plugd" width={32} height={32} className="rounded-xl" />
          <span className="text-lg font-bold text-zinc-100">Plugd</span>
        </Link>
        <button type="button" onClick={() => setMobileOpen((value) => !value)} className="text-zinc-300">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen ? <button type="button" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 bg-black/50 md:hidden" /> : null}

      <aside className={`fixed left-0 top-16 z-40 flex h-[calc(100vh-64px)] w-[280px] flex-col border-r border-zinc-900 bg-zinc-950 transition md:top-0 md:h-screen ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="hidden items-center gap-3 px-6 pb-6 pt-6 md:flex">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Plugd" width={40} height={40} className="rounded-2xl" />
            <span className="text-xl font-black text-zinc-100">Plugd</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-orange-500 text-black"
                    : "border border-transparent text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900 hover:text-zinc-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}

          {username ? (
            <Link
              href={`/@${username}`}
              target="_blank"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold text-zinc-400 transition hover:border-zinc-800 hover:bg-zinc-900 hover:text-zinc-100"
            >
              <ExternalLink className="h-4 w-4" />
              View Public Page
            </Link>
          ) : null}
        </nav>

        <div className="border-t border-zinc-900 p-4">
          <div className="rounded-[24px] border border-zinc-800 bg-zinc-900/50 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Signed in as</p>
            <p className="mt-2 truncate text-sm font-medium text-zinc-200" title={email}>{email}</p>
            {username ? <p className="mt-1 text-sm font-bold text-orange-400">@{username}</p> : null}
            <button
              type="button"
              onClick={logout}
              className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-950 text-sm font-semibold text-zinc-200 transition hover:bg-zinc-900"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
