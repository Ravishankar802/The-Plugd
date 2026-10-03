"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, Sparkles, ArrowRight } from "lucide-react";

interface MarketplaceNavbarProps {
  onSearchClick?: () => void;
  onExploreClick?: () => void;
  onCategoriesClick?: () => void;
  onUnlockClick?: () => void;
}

export default function MarketplaceNavbar({
  onSearchClick,
  onExploreClick,
  onCategoriesClick,
  onUnlockClick,
}: MarketplaceNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#09090b]/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Left: Brand Wordmark with Marketplace Badge */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <span className="text-[14px] font-mono tracking-[0.25em] text-white uppercase font-bold group-hover:text-rose-400 transition-colors">
              PLUGD
            </span>
          </Link>
          <span className="hidden md:inline-flex items-center rounded-full bg-white/[0.04] border border-white/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            Marketplace
          </span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={onExploreClick}
            className="text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition"
          >
            Explore
          </button>
          <Link
            href="/for-her"
            className="text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition flex items-center gap-1.5"
          >
            <span>For Her</span>
          </Link>
          <Link
            href="/for-him"
            className="text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition flex items-center gap-1.5"
          >
            <span>For Him</span>
          </Link>
          <button
            onClick={onCategoriesClick}
            className="text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition"
          >
            Categories
          </button>
        </nav>

        {/* Right: Search, My Templates, CTA */}
        <div className="hidden md:flex items-center gap-5">
          <button
            onClick={onSearchClick}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-mono text-zinc-400 hover:border-white/20 hover:text-zinc-200 transition"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="text-[11px]">Search templates...</span>
          </button>

          <Link
            href="/my-templates"
            className="text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition"
          >
            My Templates
          </Link>

          <button
            onClick={onUnlockClick}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black shadow-lg hover:bg-zinc-200 active:scale-[0.98] transition"
          >
            <span>$2.99 / Own Forever</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onSearchClick}
            className="p-2 text-zinc-400 hover:text-white transition"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white transition"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#09090b] px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 font-mono text-sm uppercase tracking-wider">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onExploreClick?.();
              }}
              className="text-left text-zinc-300 hover:text-white py-1"
            >
              Explore
            </button>
            <Link
              href="/for-her"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white py-1"
            >
              For Her
            </Link>
            <Link
              href="/for-him"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white py-1"
            >
              For Him
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onCategoriesClick?.();
              }}
              className="text-left text-zinc-300 hover:text-white py-1"
            >
              Categories
            </button>
            <Link
              href="/my-templates"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white py-1"
            >
              My Templates
            </Link>
          </nav>

          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onUnlockClick?.();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-xs font-semibold uppercase tracking-wider text-black"
            >
              <span>$2.99 / Own Forever →</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
