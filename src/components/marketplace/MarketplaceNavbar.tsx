"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";

interface MarketplaceNavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function MarketplaceNavbar({
  searchQuery,
  onSearchChange,
}: MarketplaceNavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#09090b]/90 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* LEFT: PLUGD */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-[14px] font-mono tracking-[0.24em] text-white uppercase font-bold hover:text-zinc-300 transition-colors"
          >
            PLUGD
          </Link>
        </div>

        {/* CENTER: LEAVE COMPLETELY EMPTY FOR NOW */}
        <div className="flex-1" />

        {/* RIGHT: [ Search templates... ] */}
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search templates..."
            className="h-9 w-44 sm:w-64 rounded-full border border-white/10 bg-white/[0.04] pl-9 pr-7 text-xs text-white placeholder-zinc-500 focus:border-white/30 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 text-zinc-500 hover:text-white"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
