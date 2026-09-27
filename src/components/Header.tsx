"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Sparkles, User, Heart, LogIn } from "lucide-react";
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
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/95 backdrop-blur-xl transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2.5 px-3 py-2 md:gap-6 md:px-6 md:py-3.5">
        {/* Left: Logo */}
        <Link href="/" className="group flex shrink-0 items-center pl-1 sm:pl-3 md:pl-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Plugd"
            className="h-8 sm:h-9 md:h-10 w-auto object-contain select-none transition-transform duration-200 group-hover:scale-[1.02]"
          />
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
        <div className="flex shrink-0 items-center gap-1.5 md:gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-1.5 md:gap-2">
              <Link
                href="/dashboard/items"
                className="hidden items-center gap-2 rounded-2xl border border-zinc-300/80 bg-white px-4 py-2.5 text-xs font-bold text-zinc-900 shadow-sm transition hover:border-black hover:text-black sm:inline-flex"
              >
                <Heart className="h-4 w-4 text-zinc-900" />
                <span>My Wishlist</span>
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 rounded-xl md:rounded-2xl bg-black px-2.5 py-1.5 md:px-4 md:py-2.5 text-[11px] md:text-xs font-bold text-white shadow-sm transition hover:bg-zinc-800"
              >
                <User className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span>Profile</span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 md:gap-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 rounded-xl md:rounded-2xl border border-zinc-300/80 bg-white px-2.5 py-1.5 md:px-4 md:py-2.5 text-[11px] md:text-xs font-bold text-zinc-900 shadow-sm transition hover:border-black hover:bg-zinc-50"
              >
                <LogIn className="h-3.5 w-3.5 md:h-4 md:w-4 text-zinc-600" />
                <span>Login</span>
              </Link>
              <Link
                href="/login"
                className="hidden items-center gap-1.5 rounded-2xl bg-black px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-zinc-800 sm:inline-flex"
              >
                <Sparkles className="h-3.5 w-3.5 text-zinc-300" />
                <span>Start Wishlist</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
