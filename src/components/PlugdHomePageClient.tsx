"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Flame } from "lucide-react";
import Header from "@/components/Header";
import PlaybookFeedCard from "@/components/PlaybookFeedCard";
import CategoryChipsBar, { CATEGORY_CHIPS, type CategoryChipItem } from "@/components/CategoryChipsBar";
import type { PlaybookSummary } from "@/lib/categories";

interface PlugdHomePageClientProps {
  playbooks: PlaybookSummary[];
  hasAccess?: boolean;
}

export default function PlugdHomePageClient({
  playbooks,
  hasAccess = false,
}: PlugdHomePageClientProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filtered Playbooks for global search
  const filteredPlaybooks = useMemo(() => {
    if (!searchQuery.trim()) {
      return playbooks;
    }
    const q = searchQuery.toLowerCase().trim();
    return playbooks.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
    );
  }, [playbooks, searchQuery]);

  // Group playbooks by category slug for the default "All" view rails
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

  return (
    <div className="min-h-screen bg-[#e7e4dd] text-[#1c1917] font-sans antialiased selection:bg-[#2563eb] selection:text-white flex flex-col justify-between">
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
        <CategoryChipsBar selectedCategory="all" />

        {/* MAIN FEED */}
        <main className="mx-auto max-w-[1600px] px-3 sm:px-6 lg:px-8 pt-5 pb-16">
          {/* Active Search Result Cue */}
          {searchQuery.trim() && (
            <div className="flex items-center justify-between gap-4 mb-4 text-xs font-mono text-[#78716c]">
              <div className="flex items-center gap-2">
                <span>
                  Showing {filteredPlaybooks.length}{" "}
                  {filteredPlaybooks.length === 1 ? "Playbook" : "Playbooks"}
                  <span> matching &ldquo;<strong className="text-[#1c1917] font-semibold">{searchQuery}</strong>&rdquo;</span>
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="inline-flex items-center gap-1 text-[#2563eb] hover:text-[#1d4ed8] hover:underline cursor-pointer"
              >
                <span>Clear search</span>
              </button>
            </div>
          )}

          {/* Render Default "All" View with Trending + 16 Horizontal Category Rails */}
          {!searchQuery.trim() ? (
            <div>
              {/* SECTION: 20 Trending Curated Playbooks */}
              <section aria-label="Trending Playbooks">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <Flame className="h-5 w-5 text-[#2563eb] shrink-0" strokeWidth={2.5} />
                    <h2 className="text-xl sm:text-2xl font-bold text-[#1c1917] tracking-tight">
                      Trending Playbooks
                    </h2>
                  </div>
                </div>

                {/* Horizontal Rail for Trending Playbooks - Never wraps onto second row */}
                <div
                  className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-3 pt-1 px-0.5"
                  role="region"
                  aria-label="Trending Playbooks"
                >
                  {trendingPlaybooks.map((playbook) => (
                    <div key={`trending-${playbook.id}`} className="w-[280px] sm:w-[320px] shrink-0">
                      <PlaybookFeedCard playbook={playbook} />
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION: 16 Category Horizontal Rails */}
              <div className="mt-12 sm:mt-14 space-y-10 sm:space-y-12">
                {CATEGORY_CHIPS.filter((c) => c.slug !== "all").map((cat) => {
                  const catPlaybooks = playbooksByCategory[cat.slug] || [];
                  if (catPlaybooks.length === 0) return null;
                  return (
                    <CategoryRail
                      key={cat.slug}
                      category={cat}
                      playbooks={catPlaybooks}
                    />
                  );
                })}
              </div>
            </div>
          ) : filteredPlaybooks.length > 0 ? (
            /* Search Results in Grid Feed */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-7 sm:gap-x-5 sm:gap-y-8">
              {filteredPlaybooks.map((playbook) => (
                <PlaybookFeedCard key={playbook.id} playbook={playbook} />
              ))}
            </div>
          ) : (
            /* Search Empty State */
            <div className="py-24 text-center max-w-md mx-auto">
              <p className="text-[15px] sm:text-[16px] font-medium text-[#78716c]">
                No Playbooks found matching &ldquo;{searchQuery}&rdquo;.
              </p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#d6d3d1] bg-white px-4 py-1.5 text-xs font-mono font-semibold text-[#1c1917] hover:border-[#1c1917] transition-colors cursor-pointer"
                >
                  Clear search
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Minimal Footer */}
      <footer className="border-t border-[#dcd8d0] bg-[#ded9d0] py-8 text-xs text-[#57534e]">
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
  category: CategoryChipItem;
  playbooks: PlaybookSummary[];
}

function CategoryRail({
  category,
  playbooks,
}: CategoryRailProps) {
  const Icon = category.icon;

  return (
    <section className="relative" aria-label={category.label}>
      {/* Category Section Header: Title on Left, See All > on Right */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <Icon className="h-5 w-5 text-[#2563eb] shrink-0" strokeWidth={2} />
          <h2 className="text-xl sm:text-[22px] font-bold text-[#1c1917] tracking-tight">
            {category.label}
          </h2>
        </div>

        <Link
          href={category.href}
          className="inline-flex items-center text-xs sm:text-sm font-semibold text-[#2563eb] hover:text-[#1d4ed8] hover:underline focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 rounded px-1.5 py-0.5 transition-colors cursor-pointer"
          aria-label={`See all ${category.label} playbooks`}
        >
          See All &gt;
        </Link>
      </div>

      {/* Horizontal Scrollable Rail - All Playbooks in one single row */}
      <div
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
