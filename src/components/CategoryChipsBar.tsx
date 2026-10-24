"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutGrid,
  Bot,
  ShoppingBag,
  Flame,
  DollarSign,
  Video,
  UserCheck,
  Laptop,
  Target,
  Code2,
  Store,
  RefreshCw,
  Users,
  MapPin,
  BookOpen,
  Mail,
  Heart,
  type LucideIcon,
} from "lucide-react";

export interface CategoryChipItem {
  label: string;
  slug: string;
  href: string;
  icon: LucideIcon;
}

export const ALL_CATEGORY_CHIPS: CategoryChipItem[] = [
  { label: "All", slug: "all", href: "/", icon: LayoutGrid },
  { label: "AI Businesses", slug: "ai-businesses", href: "/ai-businesses", icon: Bot },
  { label: "E-commerce", slug: "e-commerce", href: "/e-commerce", icon: ShoppingBag },
  { label: "Side Hustles", slug: "side-hustles", href: "/side-hustles", icon: Flame },
  { label: "Online Income", slug: "online-income", href: "/online-income", icon: DollarSign },
  { label: "Creator Economy", slug: "creator-economy", href: "/creator-economy", icon: Video },
  { label: "Personal Branding", slug: "personal-branding", href: "/personal-branding", icon: UserCheck },
  { label: "Remote Work", slug: "remote-work", href: "/remote-work", icon: Laptop },
  { label: "Lead Generation", slug: "lead-generation", href: "/lead-generation", icon: Target },
  { label: "Micro-SaaS", slug: "micro-saas", href: "/micro-saas", icon: Code2 },
  { label: "Online Marketplace", slug: "online-marketplace", href: "/online-marketplace", icon: Store },
  { label: "Reselling", slug: "reselling", href: "/reselling", icon: RefreshCw },
  { label: "Paid Communities", slug: "paid-communities", href: "/paid-communities", icon: Users },
  { label: "Local Business", slug: "local-business", href: "/local-business", icon: MapPin },
  { label: "Digital Publishing", slug: "digital-publishing", href: "/digital-publishing", icon: BookOpen },
  { label: "Newsletter Business", slug: "newsletter-business", href: "/newsletter-business", icon: Mail },
  { label: "Dating", slug: "dating", href: "/dating", icon: Heart },
];

/**
 * Active category chips for the public catalog.
 * Only displays categories with active, available Playbooks.
 */
export const CATEGORY_CHIPS: CategoryChipItem[] = [
  { label: "All", slug: "all", href: "/", icon: LayoutGrid },
  { label: "AI Businesses", slug: "ai-businesses", href: "/ai-businesses", icon: Bot },
  { label: "Side Hustles", slug: "side-hustles", href: "/side-hustles", icon: Flame },
];

interface CategoryChipsBarProps {
  selectedCategory: string; // "all", "ai-businesses", "e-commerce", etc.
}

export default function CategoryChipsBar({ selectedCategory }: CategoryChipsBarProps) {
  const chipsContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = chipsContainerRef.current;
    if (!el) return;
    const hasMoreRight = el.scrollWidth > el.clientWidth + el.scrollLeft + 4;
    setCanScrollRight(hasMoreRight);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  // Ensure active chip is scrolled into view smoothly
  useEffect(() => {
    const el = chipsContainerRef.current;
    if (!el) return;
    const activeChipEl = el.querySelector<HTMLElement>('[data-active="true"]');
    if (activeChipEl) {
      activeChipEl.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
    }
  }, [selectedCategory]);

  return (
    <div className="sticky top-[56px] z-40 bg-[#e7e4dd]/95 backdrop-blur-md border-b border-[#dcd8d0] py-2.5">
      <div className="mx-auto max-w-[1600px] px-3 sm:px-6 lg:px-8 relative flex items-center">
        {/* Scrollable Chips Container */}
        <div
          ref={chipsContainerRef}
          onScroll={checkScroll}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth w-full py-0.5"
          role="tablist"
          aria-label="Category navigation"
        >
          {CATEGORY_CHIPS.map((chip) => {
            const isSelected = selectedCategory === chip.slug;
            const Icon = chip.icon;
            return (
              <Link
                key={chip.slug}
                href={chip.href}
                role="tab"
                aria-selected={isSelected}
                data-active={isSelected ? "true" : "false"}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[13px] sm:text-[13.5px] font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer shrink-0 ${
                  isSelected
                    ? "bg-[#1c1917] text-white shadow-xs"
                    : "bg-[#ded9d0] text-[#1c1917] hover:bg-[#d5cfc5]"
                }`}
              >
                <Icon
                  className={`h-3.5 w-3.5 shrink-0 transition-colors duration-150 ${
                    isSelected ? "text-white" : "text-[#57534e]"
                  }`}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span>{chip.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Subtle Right-Edge Fade Indicator */}
        <div
          className={`pointer-events-none absolute right-3 sm:right-6 lg:right-8 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#e7e4dd] via-[#e7e4dd]/80 to-transparent transition-opacity duration-200 z-10 ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
