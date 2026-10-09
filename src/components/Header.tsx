"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, BookOpen, Layers, LogOut } from "lucide-react";
import { performLogout } from "@/lib/auth-client";

export default function Header({
  activeCourse,
  onOpenCheckout,
  isLanding = false,
}: {
  activeCourse?: string;
  onOpenCheckout?: (slug?: "men" | "women") => void;
  isLanding?: boolean;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isLanding) {
    return (
      <header className="sticky top-0 z-40 w-full border-b border-[#e7e5e4] bg-[#f6f6f4]/95 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between px-6">
          {/* Brand Logo & Lockup */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 text-[#1c1917] transition-colors"
            aria-label="The Dating Playbook, home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="180 180 664 664"
              width="28"
              height="28"
              aria-hidden="true"
              className="shrink-0"
            >
              <rect x="180" y="180" width="664" height="664" rx="120" fill="#1C1917" />
              <path
                d="M232 512 C 352 318, 672 318, 792 512 C 672 706, 352 706, 232 512 Z"
                fill="#F6F6F4"
              />
              <circle cx="512" cy="512" r="108" fill="#F97316" />
              <circle cx="512" cy="512" r="42" fill="#1C1917" />
            </svg>
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
                href="/my-playbooks"
                className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#1c1917] transition-colors hover:text-[#78716c]"
              >
                <BookOpen className="h-3.5 w-3.5 text-[#f97316]" />
                <span>My Playbooks</span>
              </Link>
            </nav>

            {/* Header Purchase CTA */}
            <div className="hidden sm:block">
              <button
                onClick={() => (onOpenCheckout ? onOpenCheckout("men") : undefined)}
                className="btn btn-surface btn-small cursor-pointer"
                data-cta="nav"
              >
                <span className="btn-dot" aria-hidden="true" />
                <span>Get the playbook for $3</span>
              </button>
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
          <Link href="/my-playbooks" className="nav-pill">
            My Playbooks
          </Link>
        </nav>
      </header>
    );
  }

  // Non-Landing Header (e.g. /my-playbooks, /learn/men, etc.)
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e7e5e4] bg-[#faf8f5]/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 text-[#1c1917] transition-colors"
            aria-label="The Dating Playbook, home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="180 180 664 664"
              width="28"
              height="28"
              aria-hidden="true"
              className="shrink-0"
            >
              <rect x="180" y="180" width="664" height="664" rx="120" fill="#1C1917" />
              <path
                d="M232 512 C 352 318, 672 318, 792 512 C 672 706, 352 706, 232 512 Z"
                fill="#F6F6F4"
              />
              <circle cx="512" cy="512" r="108" fill="#F97316" />
              <circle cx="512" cy="512" r="42" fill="#1C1917" />
            </svg>
            <span className="text-[16px] font-semibold tracking-[-0.01em] text-[#1c1917] transition-colors group-hover:text-[#78716c]">
              The Dating Playbook
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

          {onOpenCheckout && (
            <button
              onClick={() => onOpenCheckout("men")}
              className="inline-flex items-center gap-2 rounded-full bg-[#1c1917] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <span>Get The Playbook · $3</span>
            </button>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={performLogout}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#e7e5e4] bg-white px-3 py-1.5 text-xs font-medium text-[#78716c] hover:text-[#1c1917] cursor-pointer"
          >
            <LogOut className="h-3 w-3" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
