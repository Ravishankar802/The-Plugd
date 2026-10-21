"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import Header from "@/components/Header";
import PlaybookFeedCard from "@/components/PlaybookFeedCard";
import type { PlaybookSummary } from "@/lib/categories";

const CATEGORY_CHIPS = [
  { label: "All", slug: "all" },
  { label: "AI Businesses", slug: "ai-businesses" },
  { label: "E-commerce", slug: "ecommerce" },
  { label: "Side Hustles", slug: "side-hustles" },
  { label: "Online Income", slug: "online-income" },
  { label: "Creator Economy", slug: "creator-economy" },
  { label: "Personal Branding", slug: "personal-branding" },
  { label: "Remote Work", slug: "remote-work" },
  { label: "Lead Generation", slug: "lead-generation" },
  { label: "Micro-SaaS", slug: "micro-saas" },
  { label: "Online Marketplace", slug: "online-marketplace" },
  { label: "Reselling", slug: "reselling" },
  { label: "Paid Communities", slug: "paid-communities" },
  { label: "Local Business", slug: "local-business" },
  { label: "Digital Publishing", slug: "digital-publishing" },
  { label: "Newsletter Business", slug: "newsletter-business" },
  { label: "Dating", slug: "dating" },
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
        <div className="sticky top-[56px] z-40 bg-[#f6f6f4]/95 backdrop-blur-md border-b border-[#e7e5e4] py-2.5 px-3 sm:px-6">
          <div className="mx-auto max-w-[1600px] relative flex items-center">
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
                    {isSelected && chip.slug !== "all" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" aria-hidden="true" />
                    )}
                    <span>{chip.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Subtle Right-Edge Fade Indicator */}
            <div
              className={`pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#f6f6f4] via-[#f6f6f4]/80 to-transparent transition-opacity duration-200 z-10 ${
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

          {/* YouTube-Style Video Grid Feed */}
          {filteredPlaybooks.length > 0 ? (
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
