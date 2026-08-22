"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Sparkles, LayoutDashboard, Heart, LogIn } from "lucide-react";
import DiscoverySearch from "@/components/DiscoverySearch";
import { SEARCH_PLACEHOLDERS } from "@/lib/catalog";

interface HeaderProps {
  initialQuery?: string;
  isLoggedIn?: boolean;
  username?: string | null;
  searchAction?: string;
}

export default function Header({
  initialQuery = "",
  isLoggedIn: initialIsLoggedIn,
  username: initialUsername,
  searchAction = "/",
}: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn ?? false);
  const [username, setUsername] = useState(initialUsername ?? "");

  useEffect(() => {
    if (initialIsLoggedIn === undefined) {
      fetch("/api/auth/me")
        .then((res) => {
          if (res.ok) return res.json();
          return null;
        })
        .then((data) => {
          if (data?.user?.id) {
            setIsLoggedIn(true);
            setUsername(data.user.username || "");
          }
        })
        .catch(() => {});
    }
  }, [initialIsLoggedIn]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-[#f7f3ee]/95 backdrop-blur-xl transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:gap-6 md:px-6 md:py-3.5">
        {/* Left: Logo & Wordmark */}
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-zinc-950 shadow-md ring-1 ring-black/5 transition-transform group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Plugd Logo"
              width={36}
              height={36}
              className="h-8 w-8 object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-zinc-950">
              Plugd<span className="text-orange-500">.</span>
            </span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-wider text-zinc-500 sm:block">
              Creator Wishlist
            </span>
          </div>
        </Link>

        {/* Center: Search Bar */}
        <div className="min-w-0 flex-1 max-w-2xl">
          <DiscoverySearch
            action={searchAction}
            initialQuery={initialQuery}
            placeholders={SEARCH_PLACEHOLDERS}
          />
        </div>

        {/* Right: Auth / Action Buttons */}
        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard/items"
                className="hidden items-center gap-2 rounded-2xl border border-zinc-300/80 bg-white px-4 py-2.5 text-xs font-bold text-zinc-900 shadow-sm transition hover:border-orange-500 hover:text-orange-600 sm:inline-flex"
              >
                <Heart className="h-4 w-4 text-orange-500" />
                <span>My Wishlist</span>
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-2xl bg-zinc-950 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-zinc-800"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
                <span className="sm:hidden">Menu</span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-2xl border border-zinc-300/80 bg-white px-4 py-2.5 text-xs font-bold text-zinc-900 shadow-sm transition hover:border-zinc-950 hover:bg-zinc-50"
              >
                <LogIn className="h-4 w-4 text-zinc-600" />
                <span>Login</span>
              </Link>
              <Link
                href="/login"
                className="hidden items-center gap-1.5 rounded-2xl bg-orange-500 px-4 py-2.5 text-xs font-bold text-black shadow-sm transition hover:bg-orange-400 sm:inline-flex"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Start Wishlist</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
