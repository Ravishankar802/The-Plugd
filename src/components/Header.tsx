"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X, BookOpen } from "lucide-react";

export default function Header({
  activeCourse,
  onOpenCheckout,
}: {
  activeCourse?: "men" | "women";
  onOpenCheckout?: (slug?: "men" | "women") => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
