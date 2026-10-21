"use client";

import Image from "next/image";
import Link from "next/link";
import { LogOut, Search, X } from "lucide-react";
import { performLogout } from "@/lib/auth-client";

export default function Header({
  activeCourse,
  onOpenCheckout,
  isLanding = false,
  hasAccess = false,
  variant,
  searchQuery = "",
  onSearchChange,
  showSearch = true,
}: {
  activeCourse?: string;
  onOpenCheckout?: (slug?: "men" | "women") => void;
  isLanding?: boolean;
  hasAccess?: boolean;
  variant?: "platform" | "dating" | "app";
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  showSearch?: boolean;
}) {
  const mode = variant || (isLanding ? "dating" : "app");

  // Platform Header (YouTube-inspired top navigation)
  if (mode === "platform") {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-[#e7e5e4] bg-[#f6f6f4]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[56px] w-full max-w-[1600px] items-center justify-between px-3 sm:px-6 gap-2 sm:gap-4">
          {/* Left: Brand Logo & Lockup */}
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-[#1c1917] transition-colors"
              aria-label="Plugd home"
            >
              <Image
                src="/icon.png"
                alt="Plugd"
                width={28}
                height={28}
                className="rounded-md shrink-0"
                priority
              />
              <span className="text-[18px] font-bold tracking-tight text-[#1c1917]">
                Plugd
              </span>
            </Link>
          </div>

          {/* Center: Search Field */}
          {showSearch && (
            <div className="flex flex-1 items-center justify-center max-w-[620px] px-1 sm:px-4">
              <div className="w-full flex items-center">
                <div className="relative flex-1 flex items-center">
                  <Search className="absolute left-3.5 h-4 w-4 text-[#78716c] pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    placeholder="Search Playbooks"
                    className="w-full h-9 sm:h-10 pl-9 pr-8 rounded-l-full border border-[#d6d3d1] bg-white text-[13.5px] sm:text-sm text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:border-[#1c1917] transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => onSearchChange?.("")}
                      className="absolute right-2.5 text-[#78716c] hover:text-[#1c1917] p-0.5 rounded-full hover:bg-[#e7e5e4] transition-colors cursor-pointer"
                      title="Clear search"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <div
                  className="h-9 sm:h-10 px-4 sm:px-5 rounded-r-full border-y border-r border-[#d6d3d1] bg-[#eceae7] text-[#44403c] flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <Search className="h-4 w-4 text-[#57534e]" />
                </div>
              </div>
            </div>
          )}

          {/* Right: Actions & Auth */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/my-playbooks"
              className="text-[13px] sm:text-[13.5px] font-medium text-[#1c1917] hover:text-[#f97316] px-2.5 sm:px-3 py-1.5 rounded-full hover:bg-black/5 transition-colors whitespace-nowrap"
            >
              My Playbooks
            </Link>

            {hasAccess ? (
              <button
                type="button"
                onClick={performLogout}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#e7e5e4] bg-white px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#78716c] hover:border-[#1c1917] hover:text-[#1c1917] transition-colors shadow-xs cursor-pointer"
                title="Log out"
              >
                <LogOut className="h-3.5 w-3.5 text-[#78716c]" />
                <span className="hidden sm:inline">Log out</span>
              </button>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full border border-[#d6d3d1] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1c1917] hover:bg-black/5 hover:border-[#1c1917] transition-colors shadow-xs"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </header>
    );
  }

  // Dating Playbook Landing Header
  if (mode === "dating") {
    return (
      <header className="sticky top-0 z-40 w-full border-b border-[#e7e5e4] bg-[#f6f6f4]/95 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between px-6">
          {/* Brand Logo & Lockup */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 text-[#1c1917] transition-colors"
            aria-label="The Dating Playbook, home"
          >
            <Image
              src="/icon.png"
              alt="The Dating Playbook"
              width={28}
              height={28}
              className="rounded-md shrink-0"
              priority
            />
            <span className="text-[16px] font-semibold tracking-[-0.01em] text-[#1c1917] transition-colors group-hover:text-[#78716c]">
              The Dating Playbook
            </span>
          </Link>

          {/* Right Navigation */}
          <div className="flex items-center gap-7">
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Sections">
              <a
                href="#curriculum"
                className="text-[14px] font-medium text-[#1c1917] transition-colors hover:text-[#78716c]"
              >
                What&apos;s inside
              </a>
              <a
                href="#testimonials"
                className="text-[14px] font-medium text-[#1c1917] transition-colors hover:text-[#78716c]"
              >
                In their words
              </a>
              <a
                href="#faq"
                className="text-[14px] font-medium text-[#1c1917] transition-colors hover:text-[#78716c]"
              >
                FAQ
              </a>
              <Link
                href="/login"
                className="text-[14px] font-medium text-[#1c1917] transition-colors hover:text-[#78716c]"
              >
                Log in
              </Link>
            </nav>

            {/* Header Purchase CTA */}
            <div className="hidden sm:block">
              {hasAccess ? (
                <Link
                  href="/learn/men"
                  className="btn btn-surface btn-small cursor-pointer"
                >
                  <span className="btn-dot" aria-hidden="true" />
                  <span>Go to Playbook →</span>
                </Link>
              ) : (
                <button
                  onClick={() => (onOpenCheckout ? onOpenCheckout("men") : undefined)}
                  className="btn btn-surface btn-small cursor-pointer"
                  data-cta="nav"
                >
                  <span className="btn-dot" aria-hidden="true" />
                  <span>Get the playbook for $3</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Pills */}
        <nav
          className="flex lg:hidden overflow-x-auto gap-2 px-6 pb-3 pt-0 no-scrollbar"
          aria-label="Sections"
        >
          <a href="#curriculum" className="nav-pill">
            What&apos;s inside
          </a>
          <a href="#testimonials" className="nav-pill">
            In their words
          </a>
          <a href="#faq" className="nav-pill">
            FAQ
          </a>
          <Link href="/login" className="nav-pill">
            Log in
          </Link>
        </nav>
      </header>
    );
  }

  // Non-Landing Header (e.g. /learn/men, presentations, login, etc.)
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e7e5e4] bg-[#faf8f5]/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 text-[#1c1917] transition-colors"
            aria-label="Plugd, home"
          >
            <Image
              src="/icon.png"
              alt="Plugd"
              width={28}
              height={28}
              className="rounded-md shrink-0"
              priority
            />
            <span className="text-[16px] font-semibold tracking-[-0.01em] text-[#1c1917] transition-colors group-hover:text-[#78716c]">
              {activeCourse ? "The Dating Playbook" : "Plugd"}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            type="button"
            onClick={performLogout}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#e7e5e4] bg-white px-3.5 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#78716c] hover:border-[#1c1917] hover:text-[#1c1917] transition-colors shadow-xs cursor-pointer"
            title="Log out of your account"
          >
            <LogOut className="h-3.5 w-3.5 text-[#78716c]" />
            <span>Log out</span>
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={performLogout}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#e7e5e4] bg-white px-3.5 py-1.5 text-xs font-medium text-[#78716c] hover:text-[#1c1917] cursor-pointer"
          >
            <LogOut className="h-3 w-3" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
