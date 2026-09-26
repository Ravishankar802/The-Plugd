"use client";

import Link from "next/link";
import { User, Heart, Palette, ExternalLink, LogOut, Menu, X } from "lucide-react";
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
    { name: "Profile", href: "/dashboard", icon: User },
    { name: "My Wishlist", href: "/dashboard/items", icon: Heart },
    { name: "Edit Profile", href: "/profile", icon: Palette },
  ];

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-zinc-200/80 bg-white/95 px-4 backdrop-blur md:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="font-logo text-2xl font-extrabold tracking-normal text-orange-500 select-none">
            Plugd
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="p-1.5 text-zinc-600 hover:text-zinc-900"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen ? (
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-xs md:hidden"
          aria-label="Close navigation overlay"
        />
      ) : null}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed left-0 top-16 z-40 flex h-[calc(100vh-64px)] w-[280px] flex-col border-r border-zinc-200/80 bg-white transition-transform md:top-0 md:h-screen ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="hidden items-center gap-3 px-6 pb-6 pt-7 md:flex">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="font-logo text-3xl font-extrabold tracking-normal text-orange-500 select-none leading-none">
              Plugd
            </span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1.5 px-4 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                  active
                    ? "bg-orange-500 text-black shadow-xs"
                    : "border border-transparent text-zinc-600 hover:border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}

          {username ? (
            <Link
              href={`/${username}`}
              target="_blank"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm font-bold text-zinc-600 transition hover:border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900"
            >
              <ExternalLink className="h-4 w-4 text-zinc-400" />
              View Public Page
            </Link>
          ) : null}
        </nav>

        <div className="border-t border-zinc-200/80 p-4">
          <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50 p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">Signed in as</p>
            <p className="mt-1 truncate text-sm font-bold text-zinc-900" title={email}>
              {email}
            </p>
            {username ? <p className="mt-0.5 text-xs font-semibold text-orange-600">@{username}</p> : null}
            <button
              type="button"
              onClick={logout}
              className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white text-xs font-bold text-zinc-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 cursor-pointer shadow-xs"
            >
              <LogOut className="h-3.5 w-3.5" />
              Log out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
