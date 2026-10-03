"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Filter,
  Search,
  X,
  ChevronDown,
  Flame,
  Star,
  Clock,
  Heart,
} from "lucide-react";
import {
  Template,
  TEMPLATES,
  MOOD_CATEGORIES,
  MoodCategory,
  TemplateStyle,
  TemplateAudience,
} from "@/lib/templates";
import TemplateCard from "./TemplateCard";
import TemplateDetailModal from "./TemplateDetailModal";
import CheckoutModal from "@/components/CheckoutModal";

interface MarketplaceCatalogProps {
  onTemplateSelect?: (template: Template) => void;
}

export default function MarketplaceCatalog({ onTemplateSelect }: MarketplaceCatalogProps) {
  // Filter & Sort States
  const [activeMood, setActiveMood] = useState<MoodCategory>("ALL");
  const [activeSort, setActiveSort] = useState<"trending" | "best" | "recent">("trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<"all" | "2.99" | "free">("all");
  const [audienceFilter, setAudienceFilter] = useState<"all" | "her" | "him">("all");
  const [styleFilter, setStyleFilter] = useState<string>("all");

  // Modals state
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [checkoutTemplate, setCheckoutTemplate] = useState<Template | null>(null);

  // Compute category counts
  const moodCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    counts["ALL"] = TEMPLATES.length;
    TEMPLATES.forEach((t) => {
      counts[t.mood] = (counts[t.mood] || 0) + 1;
    });
    return counts;
  }, []);

  // Featured templates (top 3)
  const featuredTemplates = useMemo(() => {
    return TEMPLATES.filter((t) => t.featured).slice(0, 3);
  }, []);

  // Filtered & Sorted templates
  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter((t) => {
      // Mood filter
      if (activeMood !== "ALL" && t.mood !== activeMood) {
        return false;
      }
      // Audience filter
      if (audienceFilter === "her" && t.target !== "her" && t.target !== "both") {
        return false;
      }
      if (audienceFilter === "him" && t.target !== "him" && t.target !== "both") {
        return false;
      }
      // Style filter
      if (styleFilter !== "all" && t.style.toLowerCase() !== styleFilter.toLowerCase()) {
        return false;
      }
      // Price filter
      if (priceFilter === "free" && t.price > 0) {
        return false;
      }
      if (priceFilter === "2.99" && t.price !== 2.99) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = t.name.toLowerCase().includes(query);
        const matchTagline = t.tagline.toLowerCase().includes(query);
        const matchMood = t.mood.toLowerCase().includes(query);
        const matchStyle = t.style.toLowerCase().includes(query);
        const matchDesc = t.description.toLowerCase().includes(query);
        if (!matchName && !matchTagline && !matchMood && !matchStyle && !matchDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (activeSort === "trending") {
        return b.sendsCount - a.sendsCount;
      }
      if (activeSort === "best") {
        return b.rating - a.rating;
      }
      if (activeSort === "recent") {
        return b.id.localeCompare(a.id);
      }
      return 0;
    });
  }, [activeMood, audienceFilter, styleFilter, priceFilter, searchQuery, activeSort]);

  // For Her & For Him dedicated sub-collections
  const forHerTemplates = useMemo(() => {
    return TEMPLATES.filter((t) => t.target === "her" || t.target === "both").slice(0, 4);
  }, []);

  const forHimTemplates = useMemo(() => {
    return TEMPLATES.filter((t) => t.target === "him" || t.target === "both").slice(0, 4);
  }, []);

  function handleUnlock(template: Template) {
    setPreviewTemplate(null);
    setCheckoutTemplate(template);
    if (onTemplateSelect) {
      onTemplateSelect(template);
    }
  }

  function resetFilters() {
    setActiveMood("ALL");
    setAudienceFilter("all");
    setStyleFilter("all");
    setPriceFilter("all");
    setSearchQuery("");
    setActiveSort("trending");
  }

  const hasActiveFilters =
    activeMood !== "ALL" ||
    audienceFilter !== "all" ||
    styleFilter !== "all" ||
    priceFilter !== "all" ||
    searchQuery.trim().length > 0;

  return (
    <div className="w-full space-y-20 pb-24">
      {/* 1. FEATURED EXPERIENCES SECTION */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-white/10 pb-4">
          <div className="space-y-1 text-left">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-rose-400">
              Curated Selection
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Featured Experiences
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500">
            Plugd Studio Editions
          </span>
        </div>

        {/* 3 Huge Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              featured={true}
              onSelect={handleUnlock}
              onPreview={(t) => setPreviewTemplate(t)}
            />
          ))}
        </div>
      </section>

      {/* 2. EXPLORE BY MOOD (Category Taxonomy) */}
      <section id="categories" className="mx-auto max-w-7xl px-5 sm:px-8 space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="space-y-0.5 text-left">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
              Taxonomy
            </p>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
              Explore by Mood
            </h3>
          </div>
          <span className="text-[11px] font-mono text-zinc-500">
            {MOOD_CATEGORIES.length - 1} mood categories
          </span>
        </div>

        {/* Horizontally scrollable on mobile, refined pill row on desktop */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap">
          {MOOD_CATEGORIES.map((cat) => {
            const count = moodCounts[cat.id] || 0;
            const isSelected = activeMood === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveMood(cat.id)}
                className={`group shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
                  isSelected
                    ? "bg-white text-black shadow-lg shadow-white/10 font-semibold"
                    : "border border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <span>{cat.name}</span>
                {count > 0 && (
                  <span
                    className={`text-[10px] rounded-full px-1.5 py-0.2 ${
                      isSelected
                        ? "bg-black/10 text-black font-bold"
                        : "bg-white/5 text-zinc-500 group-hover:text-zinc-300"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. TEMPLATES MARKETPLACE GRID (Heart of the marketplace) */}
      <section id="templates" className="mx-auto max-w-7xl px-5 sm:px-8 space-y-6">
        {/* Marketplace Filter / Sort Bar (Framer-inspired) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
          {/* Left: Sort Pills (Trending | Best | Recent) */}
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] p-1 w-fit">
            <button
              onClick={() => setActiveSort("trending")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-mono transition ${
                activeSort === "trending"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Flame className="h-3 w-3" />
              <span>Trending</span>
            </button>

            <button
              onClick={() => setActiveSort("best")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-mono transition ${
                activeSort === "best"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Star className="h-3 w-3" />
              <span>Best</span>
            </button>

            <button
              onClick={() => setActiveSort("recent")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-mono transition ${
                activeSort === "recent"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Clock className="h-3 w-3" />
              <span>Recent</span>
            </button>
          </div>

          {/* Right: Dropdowns / Filters */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Search Input */}
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates..."
                className="h-9 w-40 sm:w-52 rounded-full border border-white/10 bg-white/[0.03] pl-8 pr-3 text-xs text-white placeholder-zinc-500 focus:border-white/30 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 text-zinc-500 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Audience Filter (For Her / For Him) */}
            <select
              value={audienceFilter}
              onChange={(e) => setAudienceFilter(e.target.value as any)}
              className="h-9 rounded-full border border-white/10 bg-white/[0.03] px-3.5 text-xs font-mono text-zinc-300 focus:border-white/30 focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#121217] text-white">For: Everyone</option>
              <option value="her" className="bg-[#121217] text-white">For: Her</option>
              <option value="him" className="bg-[#121217] text-white">For: Him</option>
            </select>

            {/* Style Filter */}
            <select
              value={styleFilter}
              onChange={(e) => setStyleFilter(e.target.value)}
              className="h-9 rounded-full border border-white/10 bg-white/[0.03] px-3.5 text-xs font-mono text-zinc-300 focus:border-white/30 focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#121217] text-white">Style: All</option>
              <option value="cinematic" className="bg-[#121217] text-white">Cinematic</option>
              <option value="editorial" className="bg-[#121217] text-white">Editorial</option>
              <option value="dark" className="bg-[#121217] text-white">Dark</option>
              <option value="animated" className="bg-[#121217] text-white">Animated</option>
              <option value="soft" className="bg-[#121217] text-white">Soft</option>
              <option value="playful" className="bg-[#121217] text-white">Playful</option>
              <option value="minimal" className="bg-[#121217] text-white">Minimal</option>
              <option value="experimental" className="bg-[#121217] text-white">Experimental</option>
            </select>

            {/* Price Filter */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value as any)}
              className="h-9 rounded-full border border-white/10 bg-white/[0.03] px-3.5 text-xs font-mono text-zinc-300 focus:border-white/30 focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#121217] text-white">Price: All</option>
              <option value="2.99" className="bg-[#121217] text-white">$2.99 (Standard)</option>
              <option value="free" className="bg-[#121217] text-white">Free Samples</option>
            </select>

            {/* Reset Button */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="h-9 inline-flex items-center gap-1 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 text-xs font-mono text-rose-300 hover:bg-rose-500/20 transition"
              >
                <X className="h-3 w-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
          <span>
            Showing {filteredTemplates.length} {filteredTemplates.length === 1 ? "template" : "templates"}
            {activeMood !== "ALL" ? ` in ${activeMood}` : ""}
          </span>
          <span className="text-[11px] text-zinc-600">
            Click any card to preview or unlock
          </span>
        </div>

        {/* 3-Column Template Grid */}
        {filteredTemplates.length === 0 ? (
          <div className="py-20 text-center space-y-4 rounded-3xl border border-white/5 bg-white/[0.01] p-8">
            <p className="text-base text-zinc-400 font-light">
              No digital experience templates match your filter combination.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black hover:bg-zinc-200 transition"
            >
              <span>Clear All Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={handleUnlock}
                onPreview={(t) => setPreviewTemplate(t)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 4. FOR HER SHOWCASE (Preserves & Elevates /for-her) */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 space-y-8 pt-8 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-0.5 text-[11px] font-mono uppercase tracking-widest text-rose-300">
              <span>👩</span>
              <span>FOR HER</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              Experiences she&apos;ll actually want to open.
            </h2>
            <p className="text-zinc-400 text-sm font-light">
              Curated interactive templates designed to be dropped right into her DMs.
            </p>
          </div>

          <Link
            href="/for-her"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:border-white/30 hover:bg-white/[0.06] transition"
          >
            <span>VIEW ALL FOR HER →</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {forHerTemplates.map((template) => (
            <TemplateCard
              key={`her-${template.id}`}
              template={template}
              onSelect={handleUnlock}
              onPreview={(t) => setPreviewTemplate(t)}
            />
          ))}
        </div>
      </section>

      {/* 5. FOR HIM SHOWCASE (Preserves & Elevates /for-him) */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 space-y-8 pt-8 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-0.5 text-[11px] font-mono uppercase tracking-widest text-amber-300">
              <span>👨</span>
              <span>FOR HIM</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              Experiences he&apos;ll actually want to open.
            </h2>
            <p className="text-zinc-400 text-sm font-light">
              Unexpected digital artifacts that make him stop scrolling and screenshot immediately.
            </p>
          </div>

          <Link
            href="/for-him"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:border-white/30 hover:bg-white/[0.06] transition"
          >
            <span>VIEW ALL FOR HIM →</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {forHimTemplates.map((template) => (
            <TemplateCard
              key={`him-${template.id}`}
              template={template}
              onSelect={handleUnlock}
              onPreview={(t) => setPreviewTemplate(t)}
            />
          ))}
        </div>
      </section>

      {/* 6. MARKETPLACE VALUE BANNER */}
      <section className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-black p-8 sm:p-12 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-mono text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>THE PLUGD MARKETPLACE MODEL</span>
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
              Buy once. Own forever. Send whenever.
            </h2>
            <p className="mx-auto max-w-xl text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
              When you purchase a template, you own the experience permanently. Generate a new link tonight, next week, or next year—with zero recurring subscription fees.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              $2.99 One-Time
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Unlimited Private Links
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              No App Required
            </span>
          </div>
        </div>
      </section>

      {/* DETAIL PREVIEW MODAL */}
      <TemplateDetailModal
        template={previewTemplate}
        isOpen={Boolean(previewTemplate)}
        onClose={() => setPreviewTemplate(null)}
        onUnlock={handleUnlock}
      />

      {/* CHECKOUT MODAL */}
      {checkoutTemplate && (
        <CheckoutModal
          isOpen={Boolean(checkoutTemplate)}
          onClose={() => setCheckoutTemplate(null)}
          target={checkoutTemplate.target === "him" ? "him" : "her"}
          mood={checkoutTemplate.id}
        />
      )}
    </div>
  );
}
