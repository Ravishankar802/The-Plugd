"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X, BookOpen } from "lucide-react";

export default function Header({
  activeCourse,
  onOpenCheckout,
  isLanding = false,
}: {
  activeCourse?: "men" | "women";
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
                What's inside
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
            </nav>

            {/* Header Purchase CTA */}
            <div className="hidden sm:block">
              <button
                onClick={() => (onOpenCheckout ? onOpenCheckout("men") : undefined)}
                className="btn btn-surface btn-small"
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
          <a
            href="#curriculum"
            className="nav-pill"
          >
            What's inside
          </a>
          <a
            href="#testimonials"
            className="nav-pill"
          >
            In their words
          </a>
          <a
            href="#faq"
            className="nav-pill"
          >
            FAQ
          </a>
        </nav>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#E8E4DC] bg-[#FAF8F5]/90 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="group flex items-center gap-2 text-xl font-bold tracking-tight text-[#0E0E10]"
            >
              <span className="font-mono text-2xl font-black tracking-tighter">PLUGD</span>
              <span className="h-2 w-2 rounded-full bg-[#FF5500] transition-transform group-hover:scale-125" />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 pl-4 text-[13px] font-medium tracking-wide text-[#646059]">
              <Link
                href="/women"
                className={`transition-colors hover:text-[#0E0E10] ${
                  activeCourse === "women" ? "font-semibold text-[#0E0E10]" : ""
                }`}
              >
                For Women
              </Link>
              <Link
                href="/men"
                className={`transition-colors hover:text-[#0E0E10] ${
                  activeCourse === "men" ? "font-semibold text-[#0E0E10]" : ""
                }`}
              >
                For Men
              </Link>
              <a
                href="#curriculum"
                className="transition-colors hover:text-[#0E0E10]"
              >
                Curriculum
              </a>
              <a
                href="#how-it-works"
                className="transition-colors hover:text-[#0E0E10]"
              >
                How It Works
              </a>
              <a
                href="#faq"
                className="transition-colors hover:text-[#0E0E10]"
              >
                FAQ
              </a>
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/my-playbooks"
              className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-[#646059] transition-colors hover:text-[#0E0E10]"
            >
              <BookOpen className="h-3.5 w-3.5 text-[#FF5500]" />
              My Playbooks
            </Link>

            <button
              onClick={() => onOpenCheckout ? onOpenCheckout(activeCourse) : window.location.href = activeCourse ? `/${activeCourse}#pricing` : "/#playbooks"}
              className="group relative inline-flex items-center gap-2 rounded-full bg-[#0E0E10] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-neutral-800 hover:shadow"
            >
              <span>Get the playbooks</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/my-playbooks"
              className="rounded-full border border-[#E6E1D7] bg-white px-3 py-1.5 text-[11px] font-medium text-[#0E0E10]"
            >
              My Playbooks
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-[#0E0E10] hover:bg-[#F2EFE9]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-[#E8E4DC] bg-[#FAF8F5] px-4 py-6 md:hidden">
            <div className="flex flex-col space-y-4">
              <Link
                href="/women"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-semibold text-[#0E0E10]"
              >
                <span>Course 01: For Women</span>
                <span className="text-xs text-[#FF5500]">Explore →</span>
              </Link>
              <Link
                href="/men"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-base font-semibold text-[#0E0E10]"
              >
                <span>Course 02: For Men</span>
                <span className="text-xs text-[#FF5500]">Explore →</span>
              </Link>
              <a
                href="#curriculum"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-[#646059]"
              >
                Curriculum & Modules
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-[#646059]"
              >
                How It Works
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-[#646059]"
              >
                Frequently Asked Questions
              </a>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenCheckout) onOpenCheckout(activeCourse);
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-[#0E0E10] py-3 text-sm font-semibold text-white shadow-sm"
                >
                  <span>Get the Playbook →</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
