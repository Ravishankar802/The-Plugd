"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  X,
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/Header";
import PlaybookFeedCard from "@/components/PlaybookFeedCard";
import type { PlaybookSummary } from "@/lib/categories";

const CATEGORY_CHIPS = [
  { label: "All", slug: "all", icon: LayoutGrid },
  { label: "AI Businesses", slug: "ai-businesses", icon: Bot },
  { label: "E-commerce", slug: "ecommerce", icon: ShoppingBag },
  { label: "Side Hustles", slug: "side-hustles", icon: Flame },
  { label: "Online Income", slug: "online-income", icon: DollarSign },
  { label: "Creator Economy", slug: "creator-economy", icon: Video },
  { label: "Personal Branding", slug: "personal-branding", icon: UserCheck },
  { label: "Remote Work", slug: "remote-work", icon: Laptop },
  { label: "Lead Generation", slug: "lead-generation", icon: Target },
  { label: "Micro-SaaS", slug: "micro-saas", icon: Code2 },
  { label: "Online Marketplace", slug: "online-marketplace", icon: Store },
  { label: "Reselling", slug: "reselling", icon: RefreshCw },
  { label: "Paid Communities", slug: "paid-communities", icon: Users },
  { label: "Local Business", slug: "local-business", icon: MapPin },
  { label: "Digital Publishing", slug: "digital-publishing", icon: BookOpen },
  { label: "Newsletter Business", slug: "newsletter-business", icon: Mail },
  { label: "Dating", slug: "dating", icon: Heart },
];

interface PlugdHomePageClientProps {
  playbooks: PlaybookSummary[];
  hasAccess?: boolean;
  initialCategorySlug?: string;
}

export default function PlugdHomePageClient({
  playbooks,
  hasAccess = false,
  initialCategorySlug = "all",
}: PlugdHomePageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategorySlug);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const chipsContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll positions for right-edge fade indicator
  const checkScroll = () => {
    const el = chipsContainerRef.current;
    if (!el) return;
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  // Real client-side filtering combining category and search query
  const filteredPlaybooks = useMemo(() => {
    return playbooks.filter((p) => {
      // Category filter
      if (selectedCategory !== "all" && p.categorySlug !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const inTitle = p.title.toLowerCase().includes(q);
        const inCategory = p.categoryName.toLowerCase().includes(q);
        const inDesc = p.description.toLowerCase().includes(q);
        const inHeadline = p.headline.toLowerCase().includes(q);
        return inTitle || inCategory || inDesc || inHeadline;
      }

      return true;
    });
  }, [playbooks, selectedCategory, searchQuery]);

  // Group playbooks by category
  const playbooksByCategory = useMemo(() => {
    const map: Record<string, PlaybookSummary[]> = {};
    for (const p of playbooks) {
      if (!map[p.categorySlug]) {
        map[p.categorySlug] = [];
      }
      map[p.categorySlug].push(p);
    }
    return map;
  }, [playbooks]);

  // Deterministic curated trending collection (exactly 20 playbooks)
  // Takes the flagship (#1) playbook from all 16 categories, plus #2 from the first 4 categories
  const trendingPlaybooks = useMemo(() => {
    const trending: PlaybookSummary[] = [];
    const categories = CATEGORY_CHIPS.filter((c) => c.slug !== "all");

    // 1. Pick the 1st playbook from each of the 16 categories (16 playbooks)
    for (const cat of categories) {
      const list = playbooksByCategory[cat.slug] || [];
      if (list[0]) {
        trending.push(list[0]);
      }
    }

    // 2. Pick the 2nd playbook from the first 4 categories (4 playbooks) to reach exactly 20
    for (const cat of categories.slice(0, 4)) {
      const list = playbooksByCategory[cat.slug] || [];
      if (list[1]) {
        trending.push(list[1]);
      }
    }

    return trending.slice(0, 20);
  }, [playbooksByCategory]);

  const selectedChipData = CATEGORY_CHIPS.find((c) => c.slug === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f6f6f4] text-[#1c1917] font-sans antialiased selection:bg-[#f97316] selection:text-white flex flex-col justify-between">
      <div>
        {/* Compact YouTube-Style Sticky Header */}
        <Header
          variant="platform"
          hasAccess={hasAccess}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showSearch={true}
        />

        {/* YouTube-Inspired Horizontal Category Chips Bar */}
        <div className="sticky top-[56px] z-40 bg-[#f6f6f4]/95 backdrop-blur-md border-b border-[#e7e5e4] py-2.5">
          <div className="mx-auto max-w-[1600px] px-3 sm:px-6 lg:px-8 relative flex items-center">
            {/* Scrollable Chips Container */}
            <div
              ref={chipsContainerRef}
              onScroll={checkScroll}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth w-full py-0.5"
              role="tablist"
              aria-label="Filter playbooks by category"
            >
              {CATEGORY_CHIPS.map((chip) => {
                const isSelected = selectedCategory === chip.slug;
                const Icon = chip.icon;
                return (
                  <button
                    key={chip.slug}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCategory(chip.slug)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[13px] sm:text-[13.5px] font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer shrink-0 ${
                      isSelected
                        ? "bg-[#1c1917] text-white shadow-xs"
                        : "bg-[#eceae7] text-[#1c1917] hover:bg-[#e2ded9]"
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
                  </button>
                );
              })}
            </div>

            {/* Subtle Right-Edge Fade Indicator */}
            <div
              className={`pointer-events-none absolute right-3 sm:right-6 lg:right-8 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#f6f6f4] via-[#f6f6f4]/80 to-transparent transition-opacity duration-200 z-10 ${
                canScrollRight ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* MAIN FEED: Begins IMMEDIATELY Beneath Category Chips */}
        <main className="mx-auto max-w-[1600px] px-3 sm:px-6 lg:px-8 pt-5 pb-16">
          {/* Active Filter Cues / Result Count (Minimal) */}
          {(searchQuery || selectedCategory !== "all") && (
            <div className="flex items-center justify-between gap-4 mb-4 text-xs font-mono text-[#78716c]">
              <div className="flex items-center gap-2">
                <span>
                  Showing {filteredPlaybooks.length}{" "}
                  {filteredPlaybooks.length === 1 ? "Playbook" : "Playbooks"}
                  {selectedCategory !== "all" && (
                    <span> in <strong className="text-[#1c1917] font-semibold">{selectedChipData?.label}</strong></span>
                  )}
                  {searchQuery && (
                    <span> matching &ldquo;<strong className="text-[#1c1917] font-semibold">{searchQuery}</strong>&rdquo;</span>
                  )}
                </span>
              </div>

              {(searchQuery || selectedCategory !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="inline-flex items-center gap-1 text-[#f97316] hover:underline cursor-pointer"
                >
                  <X className="h-3 w-3" />
                  <span>Reset filters</span>
                </button>
              )}
            </div>
          )}

          {/* Render Default "All" View with Trending + 16 Horizontal Category Rails */}
          {selectedCategory === "all" && !searchQuery.trim() ? (
            <div>
              {/* SECTION: 20 Trending Curated Playbooks */}
              <section aria-label="Trending Playbooks">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <Flame className="h-5 w-5 text-[#f97316] shrink-0" strokeWidth={2.5} />
                    <h2 className="text-xl sm:text-2xl font-bold text-[#1c1917] tracking-tight">
                      Trending Playbooks
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-[#78716c] font-medium">
                    20 Curated Playbooks
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-7 sm:gap-x-5 sm:gap-y-8">
                  {trendingPlaybooks.map((playbook) => (
                    <PlaybookFeedCard key={`trending-${playbook.id}`} playbook={playbook} />
                  ))}
                </div>
              </section>

              {/* SECTION: 16 Category Horizontal Rails */}
              <div className="mt-14 sm:mt-16 space-y-12 sm:space-y-14">
                {CATEGORY_CHIPS.filter((c) => c.slug !== "all").map((cat) => {
                  const catPlaybooks = playbooksByCategory[cat.slug] || [];
                  if (catPlaybooks.length === 0) return null;
                  return (
                    <CategoryRail
                      key={cat.slug}
                      category={cat}
                      playbooks={catPlaybooks}
                      onSelectCategory={(slug) => {
                        setSelectedCategory(slug);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ) : filteredPlaybooks.length > 0 ? (
            /* Filtered Category / Search Results in Grid Feed */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-7 sm:gap-x-5 sm:gap-y-8">
              {filteredPlaybooks.map((playbook) => (
                <PlaybookFeedCard key={playbook.id} playbook={playbook} />
              ))}
            </div>
          ) : (
            /* Compact Intentional Empty State (Per Specification) */
            <div className="py-24 text-center max-w-md mx-auto">
              <p className="text-[15px] sm:text-[16px] font-medium text-[#78716c]">
                {searchQuery
                  ? `No Playbooks found matching "${searchQuery}".`
                  : "No Playbooks in this category yet."}
              </p>
              <div className="mt-4 flex items-center justify-center gap-3">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#d6d3d1] bg-white px-4 py-1.5 text-xs font-mono font-semibold text-[#1c1917] hover:border-[#1c1917] transition-colors cursor-pointer"
                  >
                    Clear search
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("all")}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#d6d3d1] bg-white px-4 py-1.5 text-xs font-mono font-semibold text-[#1c1917] hover:border-[#1c1917] transition-colors cursor-pointer"
                  >
                    Browse all Playbooks →
                  </button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Minimal Footer */}
      <footer className="border-t border-[#e7e5e4] bg-[#faf8f5] py-8 text-xs text-[#78716c]">
        <div className="mx-auto max-w-[1600px] px-3 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1c1917]">Plugd</span>
            <span>·</span>
            <span>Outcome-focused Playbooks</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/terms-of-service" className="hover:text-[#1c1917] transition-colors">
              Terms
            </Link>
            <Link href="/privacy-policy" className="hover:text-[#1c1917] transition-colors">
              Privacy
            </Link>
            <a href="mailto:ravx003@gmail.com" className="hover:text-[#1c1917] transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface CategoryRailProps {
  category: (typeof CATEGORY_CHIPS)[number];
  playbooks: PlaybookSummary[];
  onSelectCategory: (slug: string) => void;
}

function CategoryRail({
  category,
  playbooks,
  onSelectCategory,
}: CategoryRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkRailScroll = () => {
    const el = railRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 6);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 6);
  };

  useEffect(() => {
    checkRailScroll();
    window.addEventListener("resize", checkRailScroll);
    return () => window.removeEventListener("resize", checkRailScroll);
  }, [playbooks]);

  const scroll = (direction: "left" | "right") => {
    const el = railRef.current;
    if (!el) return;
    const scrollAmount = Math.max(el.clientWidth * 0.75, 300);
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const Icon = category.icon;

  return (
    <section className="relative">
      {/* Category Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <Icon className="h-5 w-5 text-[#f97316] shrink-0" strokeWidth={2} />
          <h2 className="text-xl sm:text-[22px] font-bold text-[#1c1917] tracking-tight">
            {category.label}
          </h2>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => onSelectCategory(category.slug)}
            className="text-xs sm:text-sm font-semibold text-[#f97316] hover:underline cursor-pointer"
          >
            View all 20 →
          </button>

          {/* Left/Right Navigation Controls */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label={`Scroll ${category.label} left`}
              className={`h-7 w-7 rounded-full border border-[#d6d3d1] bg-white flex items-center justify-center transition-colors cursor-pointer shadow-2xs ${
                canScrollLeft
                  ? "text-[#1c1917] hover:border-[#1c1917]"
                  : "text-[#a8a29e] opacity-40 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label={`Scroll ${category.label} right`}
              className={`h-7 w-7 rounded-full border border-[#d6d3d1] bg-white flex items-center justify-center transition-colors cursor-pointer shadow-2xs ${
                canScrollRight
                  ? "text-[#1c1917] hover:border-[#1c1917]"
                  : "text-[#a8a29e] opacity-40 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrollable Rail */}
      <div
        ref={railRef}
        onScroll={checkRailScroll}
        className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-3 pt-1 px-0.5"
        role="region"
        aria-label={`${category.label} Playbooks`}
      >
        {playbooks.map((playbook) => (
          <div key={playbook.id} className="w-[280px] sm:w-[320px] shrink-0">
            <PlaybookFeedCard playbook={playbook} />
          </div>
        ))}
      </div>
    </section>
  );
}
