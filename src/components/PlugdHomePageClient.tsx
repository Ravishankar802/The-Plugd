"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  X,
  ChevronDown,
  Check,
  LayoutGrid,
  List,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import PlaybookFeedCard from "@/components/PlaybookFeedCard";
import { IS_REVIEW_PHASE_FREE_ACCESS } from "@/lib/config";
import type { PlaybookSummary } from "@/lib/categories";

interface PlugdHomePageClientProps {
  playbooks: PlaybookSummary[];
  hasAccess?: boolean;
}

type SortOption = "featured" | "newest" | "oldest" | "az";
type CategoryFilter = "all" | "ai-businesses";
type ViewMode = "grid" | "list";

export default function PlugdHomePageClient({
  playbooks,
  hasAccess = false,
}: PlugdHomePageClientProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Dropdown states
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Reliable outside-click and Escape key handler for dropdowns
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as Node;
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(target)
      ) {
        setIsCategoryOpen(false);
      }
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(target)
      ) {
        setIsSortOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsCategoryOpen(false);
        setIsSortOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick, true);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick, true);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Filter and sort the Playbooks
  const filteredAndSortedPlaybooks = useMemo(() => {
    let result = [...playbooks];

    // 1. Category filter: only 'all' or 'ai-businesses'
    if (selectedCategory === "ai-businesses") {
      result = result.filter(
        (p) => p.categorySlug === "ai-businesses"
      );
    }

    // 2. Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          (p.badge && p.badge.toLowerCase().includes(q))
      );
    }

    // 3. Sorting
    switch (sortOption) {
      case "newest":
        // Sort newest first by publishedAt or reverse catalog order
        result.sort((a, b) => {
          if (a.publishedAt && b.publishedAt) {
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
          }
          return b.id.localeCompare(a.id);
        });
        break;
      case "oldest":
        // Sort oldest first
        result.sort((a, b) => {
          if (a.publishedAt && b.publishedAt) {
            return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
          }
          return a.id.localeCompare(b.id);
        });
        break;
      case "az":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "featured":
      default:
        // Default preserved catalog order
        break;
    }

    return result;
  }, [playbooks, selectedCategory, searchQuery, sortOption]);

  const sortLabels: Record<SortOption, string> = {
    featured: "Featured",
    newest: "Newest",
    oldest: "Oldest",
    az: "A–Z",
  };

  const categoryLabels: Record<CategoryFilter, string> = {
    all: "All Categories",
    "ai-businesses": "AI Businesses",
  };

  const countText = `${filteredAndSortedPlaybooks.length} ${
    filteredAndSortedPlaybooks.length === 1 ? "Playbook" : "Playbooks"
  }`;

  return (
    <div className="min-h-screen bg-[#e7e4dd] text-[#1c1917] font-sans antialiased selection:bg-[#2563eb] selection:text-white flex flex-col justify-between">
      <div>
        {/* Sticky Header with "Plugd Playbooks" Branding */}
        <Header
          variant="platform"
          hasAccess={hasAccess}
          showSearch={false}
        />

        <main className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10 pt-8 sm:pt-12 pb-20">
          {/* ========================================================= */}
          {/* 1. EDITORIAL HERO SECTION (Inspired by Billion Dollar PDFs) */}
          {/* ========================================================= */}
          <section className="relative flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14 pt-2 pb-6">
            {/* Left Column: Eyebrow, Editorial Title, Description */}
            <div className="flex-1 max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#78716c] font-semibold mb-3">
                <span>A DIRECTORY</span>
                <span>·</span>
                <span>2026</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1c1917] leading-[1.08]">
                Plugd Playbooks
              </h1>

              <p className="mt-4 sm:mt-5 text-[15px] sm:text-base text-[#57534e] leading-relaxed max-w-xl font-normal">
                Practical playbooks for building AI businesses, finding customers,
                and creating income online. Explore actionable knowledge, proven
                frameworks, and step-by-step guides designed to help you turn ideas into
                execution.
              </p>
            </div>

            {/* Right Column: Decorative Animated Geometric Orbit Emblem */}
            <div className="shrink-0 flex items-center justify-center">
              <OrbitEmblem />
            </div>
          </section>

          {/* ========================================================= */}
          {/* 2. SUBTLE DIVIDER LINE */}
          {/* ========================================================= */}
          <div className="border-t border-[#dcd8d0] my-6 sm:my-8" />

          {/* ========================================================= */}
          {/* 3. SEARCH & FILTER TOOLBAR (Inspired by Screenshot 3) */}
          {/* ========================================================= */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-5">
            {/* Left: Search input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#78716c] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Playbooks..."
                className="w-full h-10 pl-9 pr-9 rounded-xl border border-[#d6d3d1] bg-white text-[13.5px] sm:text-sm text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:border-[#1c1917] shadow-2xs transition-all"
                aria-label="Search Playbooks"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#78716c] hover:text-[#1c1917] p-1 rounded-full hover:bg-[#ded9d0] transition-colors cursor-pointer"
                  title="Clear search"
                  aria-label="Clear search input"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Right: Controls (Category Dropdown, Sort Dropdown, Grid/List Toggle) */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* Category Dropdown */}
              <div className="relative" ref={categoryDropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsCategoryOpen(!isCategoryOpen);
                    setIsSortOpen(false);
                  }}
                  className="inline-flex items-center gap-2 h-10 px-3.5 rounded-xl border border-[#d6d3d1] bg-white text-xs sm:text-[13px] font-medium text-[#1c1917] hover:border-[#a8a29e] shadow-2xs transition-all cursor-pointer"
                  aria-expanded={isCategoryOpen}
                  aria-haspopup="listbox"
                >
                  <span className="text-[#78716c]">Category:</span>
                  <span className="font-semibold">{categoryLabels[selectedCategory]}</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-[#78716c] transition-transform duration-150 ${
                      isCategoryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCategoryOpen && (
                  <div className="absolute right-0 sm:left-0 sm:right-auto mt-1.5 w-48 rounded-xl border border-[#dcd8d0] bg-white p-1.5 shadow-lg z-30 animate-in fade-in zoom-in-95 duration-100">
                    {(["all", "ai-businesses"] as CategoryFilter[]).map((catKey) => {
                      const isSelected = selectedCategory === catKey;
                      return (
                        <button
                          key={catKey}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(catKey);
                            setIsCategoryOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-[13px] rounded-lg transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-[#eff6ff] text-[#2563eb] font-semibold"
                              : "text-[#44403c] hover:bg-[#f7f8fa]"
                          }`}
                          role="option"
                          aria-selected={isSelected}
                        >
                          <span>{categoryLabels[catKey]}</span>
                          {isSelected && <Check className="h-3.5 w-3.5 text-[#2563eb]" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="relative" ref={sortDropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsSortOpen(!isSortOpen);
                    setIsCategoryOpen(false);
                  }}
                  className="inline-flex items-center gap-2 h-10 px-3.5 rounded-xl border border-[#d6d3d1] bg-white text-xs sm:text-[13px] font-medium text-[#1c1917] hover:border-[#a8a29e] shadow-2xs transition-all cursor-pointer"
                  aria-expanded={isSortOpen}
                  aria-haspopup="listbox"
                >
                  <span className="text-[#78716c]">Sort:</span>
                  <span className="font-semibold">{sortLabels[sortOption]}</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-[#78716c] transition-transform duration-150 ${
                      isSortOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isSortOpen && (
                  <div className="absolute right-0 mt-1.5 w-44 rounded-xl border border-[#dcd8d0] bg-white p-1.5 shadow-lg z-30 animate-in fade-in zoom-in-95 duration-100">
                    {(["featured", "newest", "oldest", "az"] as SortOption[]).map((optKey) => {
                      const isSelected = sortOption === optKey;
                      return (
                        <button
                          key={optKey}
                          type="button"
                          onClick={() => {
                            setSortOption(optKey);
                            setIsSortOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-[13px] rounded-lg transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-[#eff6ff] text-[#2563eb] font-semibold"
                              : "text-[#44403c] hover:bg-[#f7f8fa]"
                          }`}
                          role="option"
                          aria-selected={isSelected}
                        >
                          <span>{sortLabels[optKey]}</span>
                          {isSelected && <Check className="h-3.5 w-3.5 text-[#2563eb]" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Grid / List View Toggle */}
              <div
                className="inline-flex items-center rounded-xl border border-[#d6d3d1] bg-white p-1 shadow-2xs"
                role="group"
                aria-label="View layout switcher"
              >
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-[#1c1917] text-white"
                      : "text-[#78716c] hover:text-[#1c1917] hover:bg-[#f2eee3]"
                  }`}
                  title="Grid view"
                  aria-label="Switch to grid view"
                  aria-pressed={viewMode === "grid"}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "list"
                      ? "bg-[#1c1917] text-white"
                      : "text-[#78716c] hover:text-[#1c1917] hover:bg-[#f2eee3]"
                  }`}
                  title="List view"
                  aria-label="Switch to list view"
                  aria-pressed={viewMode === "list"}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 4. RESULT COUNT & ACTIVE FILTER PILLS */}
          {/* ========================================================= */}
          <div className="flex items-center justify-between gap-4 mb-6 text-xs font-mono text-[#78716c]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#44403c]">{countText}</span>
              {searchQuery.trim() && (
                <span>
                  matching &ldquo;
                  <strong className="text-[#1c1917] font-semibold">{searchQuery}</strong>
                  &rdquo;
                </span>
              )}
            </div>

            {(searchQuery.trim() || selectedCategory !== "all" || sortOption !== "featured") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSortOption("featured");
                }}
                className="inline-flex items-center gap-1 text-[#2563eb] hover:text-[#1d4ed8] hover:underline cursor-pointer"
              >
                <span>Reset filters</span>
              </button>
            )}
          </div>

          {/* ========================================================= */}
          {/* 5. DIRECTORY CONTENT (GRID OR LIST VIEW) */}
          {/* ========================================================= */}
          {filteredAndSortedPlaybooks.length > 0 ? (
            viewMode === "grid" ? (
              /* GRID VIEW: Responsive 1-to-4 column grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-7 items-stretch">
                {filteredAndSortedPlaybooks.map((playbook) => (
                  <div key={playbook.id} className="flex flex-col h-full">
                    <PlaybookFeedCard playbook={playbook} />
                  </div>
                ))}
              </div>
            ) : (
              /* LIST VIEW: Clean horizontal editorial rows */
              <div className="space-y-4">
                {filteredAndSortedPlaybooks.map((playbook) => (
                  <PlaybookListRow key={playbook.id} playbook={playbook} />
                ))}
              </div>
            )
          ) : (
            /* EMPTY STATE */
            <div className="py-24 text-center max-w-md mx-auto">
              <p className="text-[15px] sm:text-base font-medium text-[#78716c]">
                No Playbooks found matching &ldquo;{searchQuery}&rdquo;.
              </p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSortOption("featured");
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#d6d3d1] bg-white px-4 py-1.5 text-xs font-mono font-semibold text-[#1c1917] hover:border-[#1c1917] transition-colors cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================= */}
      {/* 6. MINIMAL EDITORIAL FOOTER */}
      {/* ========================================================= */}
      <footer className="border-t border-[#dcd8d0] bg-[#ded9d0] py-8 text-xs text-[#57534e]">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1c1917]">Plugd Playbooks</span>
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

/**
 * Editorial List Row Component for List View mode
 */
function PlaybookListRow({ playbook }: { playbook: PlaybookSummary }) {
  const formattedPrice = playbook.price ? Number(playbook.price).toFixed(2) : "3.00";

  return (
    <div className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-white hover:bg-[#f7f8fa] border border-[#dcd8d0] hover:border-[#c7c4c0] shadow-[0_1px_3px_rgba(28,25,23,0.04)] hover:shadow-md transition-all duration-200">
      <div className="flex items-start sm:items-center gap-4 sm:gap-5 flex-1 min-w-0">
        {/* Thumbnail Preview */}
        <Link
          href={playbook.href}
          className="relative aspect-video w-32 sm:w-44 shrink-0 overflow-hidden rounded-xl bg-[#eeebe5] border border-[#e5e1d8] focus:outline-none"
          tabIndex={-1}
          aria-hidden="true"
        >
          {playbook.thumbnail ? (
            <Image
              src={playbook.thumbnail}
              alt={playbook.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-[#eeebe5]" />
          )}
        </Link>

        {/* Text & Metadata */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#eff6ff] text-[11px] font-semibold text-[#1d4ed8]">
              {playbook.categoryName}
            </span>
            {playbook.badge && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#f5f5f4] text-[11px] font-bold text-[#44403c] border border-[#e7e5e4]">
                {playbook.badge}
              </span>
            )}
          </div>

          <Link href={playbook.href} className="focus:outline-none block">
            <h3 className="text-base sm:text-lg font-semibold text-[#1c1917] leading-snug group-hover:text-[#2563eb] transition-colors line-clamp-4">
              {playbook.title}
            </h3>
          </Link>

          <p className="mt-1 text-xs sm:text-[13px] text-[#57534e] line-clamp-2 max-w-3xl">
            {playbook.description}
          </p>

          <div className="mt-2.5 flex items-center flex-wrap gap-2 sm:gap-3 text-xs text-[#78716c]">
            {playbook.rating && (
              <div className="inline-flex items-center gap-1 font-semibold text-[#1c1917]">
                <Star className="h-3 w-3 fill-[#d97706] text-[#d97706]" />
                <span>{playbook.rating}</span>
                {playbook.ratingCount && (
                  <span className="text-[#78716c] font-normal">
                    ({typeof playbook.ratingCount === "number"
                      ? playbook.ratingCount.toLocaleString()
                      : playbook.ratingCount})
                  </span>
                )}
              </div>
            )}
            {playbook.modulesCount > 0 && (
              <>
                <span className="text-[#d6d3d1]">·</span>
                <span>{playbook.modulesCount} modules</span>
                <span className="text-[#d6d3d1]">·</span>
                <span>{playbook.lessonsCount} lessons</span>
                {playbook.slidesCount && (
                  <>
                    <span className="text-[#d6d3d1]">·</span>
                    <span>{playbook.slidesCount} slides</span>
                  </>
                )}
              </>
            )}
            {playbook.hoursOfMaterial && (
              <>
                <span className="text-[#d6d3d1]">·</span>
                <span>{playbook.hoursOfMaterial}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Pricing & CTA Button */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#f0eee9]">
        <div className="text-right">
          {playbook.badge === "Coming Soon" ? (
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center rounded-md bg-stone-100 px-2 py-0.5 text-xs font-bold text-stone-600 border border-stone-200">
                Coming Soon
              </span>
              <span className="text-[11px] text-[#78716c] font-medium hidden xs:inline">
                In Production
              </span>
            </div>
          ) : IS_REVIEW_PHASE_FREE_ACCESS ? (
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
                Free
              </span>
              <span className="text-[11px] text-[#78716c] font-medium hidden xs:inline">
                Review Access
              </span>
            </div>
          ) : (
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-[#1c1917]">
                ${formattedPrice}
              </span>
              <span className="text-xs text-[#a8a29e] line-through">
                ${(playbook.originalPrice ?? 9).toFixed(2)}
              </span>
            </div>
          )}
        </div>

        {playbook.badge === "Coming Soon" ? (
          <Link
            href={playbook.href}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700 px-4 py-2 text-xs font-semibold shadow-xs transition-colors"
          >
            <span>Coming Soon</span>
          </Link>
        ) : IS_REVIEW_PHASE_FREE_ACCESS ? (
          <Link
            href={playbook.href}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2 text-xs font-semibold shadow-xs transition-colors"
          >
            <span>Start Reading</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <Link
            href={playbook.href}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#1c1917] hover:bg-[#2563eb] text-white px-4 py-2 text-xs font-semibold shadow-xs transition-colors"
          >
            <span>Add to cart</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}

/**
 * Original decorative animated geometric orbit emblem.
 * Uses lightweight pure SVG with slow gentle rotation and prefers-reduced-motion fallback.
 */
function OrbitEmblem() {
  return (
    <div
      className="relative w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 select-none pointer-events-none flex items-center justify-center"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Static Background Guide Rings */}
        <circle
          cx="160"
          cy="160"
          r="152"
          stroke="#78716c"
          strokeWidth="0.75"
          strokeDasharray="2 4"
          opacity="0.35"
        />
        <circle
          cx="160"
          cy="160"
          r="140"
          stroke="#78716c"
          strokeWidth="0.5"
          opacity="0.25"
        />

        {/* Slow Clockwise Rotating Orbit Layer */}
        <g className="origin-center animate-[spin_60s_linear_infinite] motion-reduce:animate-none">
          {/* Main Circular Ring */}
          <circle
            cx="160"
            cy="160"
            r="124"
            stroke="#57534e"
            strokeWidth="0.9"
            opacity="0.45"
          />

          {/* 8 Geometric Tick Marks on Ring */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={`tick-${deg}`}
              x1="160"
              y1="34"
              x2="160"
              y2="40"
              stroke="#1c1917"
              strokeWidth="1"
              opacity="0.6"
              transform={`rotate(${deg} 160 160)`}
            />
          ))}

          {/* Tilted Orbital Ellipse 1 (at 32 deg) */}
          <ellipse
            cx="160"
            cy="160"
            rx="132"
            ry="58"
            stroke="#2563eb"
            strokeWidth="0.85"
            opacity="0.55"
            transform="rotate(32 160 160)"
          />

          {/* Node on Orbital Ellipse 1 */}
          <g transform="rotate(32 160 160)">
            <circle cx="292" cy="160" r="3.5" fill="#2563eb" />
            <circle cx="292" cy="160" r="7" stroke="#2563eb" strokeWidth="0.5" opacity="0.4" />
          </g>
        </g>

        {/* Counter-Clockwise Rotating Orbit Layer */}
        <g className="origin-center animate-[spin_48s_linear_infinite_reverse] motion-reduce:animate-none">
          {/* Tilted Orbital Ellipse 2 (at -38 deg) */}
          <ellipse
            cx="160"
            cy="160"
            rx="128"
            ry="62"
            stroke="#78716c"
            strokeWidth="0.85"
            strokeDasharray="4 4"
            opacity="0.45"
            transform="rotate(-38 160 160)"
          />

          {/* Inner Dashed Concentric Ring */}
          <circle
            cx="160"
            cy="160"
            r="92"
            stroke="#1c1917"
            strokeWidth="0.8"
            strokeDasharray="3 5"
            opacity="0.4"
          />

          {/* Node on Ring */}
          <circle cx="160" cy="68" r="3" fill="#1c1917" />
          <circle cx="160" cy="252" r="2.5" fill="#78716c" opacity="0.7" />
        </g>

        {/* Center Geometric Core: Knowledge Spark / Diamond */}
        <circle
          cx="160"
          cy="160"
          r="54"
          stroke="#78716c"
          strokeWidth="0.75"
          opacity="0.3"
        />
        <circle
          cx="160"
          cy="160"
          r="36"
          stroke="#78716c"
          strokeWidth="0.5"
          strokeDasharray="2 2"
          opacity="0.4"
        />

        {/* Central Geometric Symbol */}
        <polygon
          points="160,136 177,160 160,184 143,160"
          fill="none"
          stroke="#2563eb"
          strokeWidth="1.5"
        />
        <polygon
          points="160,143 172,160 160,177 148,160"
          fill="none"
          stroke="#1c1917"
          strokeWidth="0.75"
          opacity="0.6"
        />
        <circle cx="160" cy="160" r="3" fill="#2563eb" />
      </svg>
    </div>
  );
}
