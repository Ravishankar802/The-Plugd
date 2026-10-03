"use client";

import { useState, useMemo } from "react";
import { ChevronDown, Check, X } from "lucide-react";
import {
  Template,
  TEMPLATES,
  MOOD_CATEGORIES,
  MoodCategory,
  TemplateStyle,
} from "@/lib/templates";
import TemplateCard from "./TemplateCard";
import TemplateDetailModal from "./TemplateDetailModal";
import CheckoutModal from "@/components/CheckoutModal";

interface MarketplaceCatalogProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onTemplateSelect?: (template: Template) => void;
}

const STYLE_OPTIONS: { id: string; label: string }[] = [
  { id: "all", label: "All Styles" },
  { id: "minimal", label: "Minimal" },
  { id: "cinematic", label: "Cinematic" },
  { id: "editorial", label: "Editorial" },
  { id: "experimental", label: "Experimental" },
  { id: "animated", label: "Animated" },
  { id: "dark", label: "Dark" },
  { id: "soft", label: "Soft" },
  { id: "playful", label: "Playful" },
];

const PRICE_OPTIONS = [
  { id: "all", label: "All Prices" },
  { id: "2.99", label: "$2.99" },
  { id: "4.99", label: "$4.99" },
  { id: "9.99", label: "$9.99" },
];

export default function MarketplaceCatalog({
  searchQuery,
  onSearchChange,
  onTemplateSelect,
}: MarketplaceCatalogProps) {
  // Filter States
  const [activeMood, setActiveMood] = useState<MoodCategory>("ALL");
  const [activeSort, setActiveSort] = useState<"trending" | "best" | "recent">("trending");
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [styleFilter, setStyleFilter] = useState<string>("all");

  // Modals state
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [checkoutTemplate, setCheckoutTemplate] = useState<Template | null>(null);

  // Grouped mood category columns for the Framer-like multi-column category presentation
  const moodColumns = useMemo(() => [
    {
      title: "Intimate",
      items: ["ROMANTIC", "AFTER DARK", "OBSESSED", "COME OVER"] as MoodCategory[],
    },
    {
      title: "Playful",
      items: ["FLIRTY", "TEASING", "CHAOTIC", "JUST BECAUSE"] as MoodCategory[],
    },
    {
      title: "Connection",
      items: ["MISS YOU", "LONG DISTANCE", "SOFT", "APOLOGY"] as MoodCategory[],
    },
    {
      title: "Occasions",
      items: ["DATE NIGHT", "BIRTHDAY", "ANNIVERSARY"] as MoodCategory[],
    },
  ], []);

  // Filtered & Sorted templates
  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter((t) => {
      // Mood filter
      if (activeMood !== "ALL" && t.mood !== activeMood) {
        return false;
      }
      // Style filter
      if (styleFilter !== "all" && t.style.toLowerCase() !== styleFilter.toLowerCase()) {
        return false;
      }
      // Price filter
      if (priceFilter !== "all") {
        const targetPrice = parseFloat(priceFilter);
        if (Math.abs(t.price - targetPrice) > 0.01) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = t.name.toLowerCase().includes(query);
        const matchTagline = t.tagline.toLowerCase().includes(query);
        const matchMood = t.mood.toLowerCase().includes(query);
        const matchStyle = t.style.toLowerCase().includes(query);
        const matchDesc = t.description.toLowerCase().includes(query);
        const matchCreator = t.creator.toLowerCase().includes(query);
        if (!matchName && !matchTagline && !matchMood && !matchStyle && !matchDesc && !matchCreator) {
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
  }, [activeMood, styleFilter, priceFilter, searchQuery, activeSort]);

  function handleUnlock(template: Template) {
    setPreviewTemplate(null);
    setCheckoutTemplate(template);
    if (onTemplateSelect) {
      onTemplateSelect(template);
    }
  }

  function formatMoodName(mood: string) {
    if (mood === "ALL") return "All";
    return mood
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const hasActiveFilters =
    activeMood !== "ALL" ||
    styleFilter !== "all" ||
    priceFilter !== "all" ||
    searchQuery.trim().length > 0;

  return (
    <div className="w-full space-y-10 pb-20">
      {/* 1. CATEGORIES = MOODS (Framer-style text column groups) */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 text-left">
        <div className="border-b border-white/10 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
              Moods
            </h2>
            {activeMood !== "ALL" && (
              <button
                onClick={() => setActiveMood("ALL")}
                className="text-xs font-mono text-zinc-400 hover:text-white transition flex items-center gap-1"
              >
                <span>View All Moods</span>
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Multi-column clean text category layout */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {moodColumns.map((col) => (
              <div key={col.title} className="space-y-2">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                  {col.title}
                </span>
                <ul className="space-y-1.5 text-xs font-normal">
                  {col.items.map((mood) => {
                    const isSelected = activeMood === mood;
                    return (
                      <li key={mood}>
                        <button
                          onClick={() => setActiveMood(isSelected ? "ALL" : mood)}
                          className={`text-left transition-colors duration-150 py-0.5 block ${
                            isSelected
                              ? "text-white font-medium underline underline-offset-4 decoration-rose-500"
                              : "text-zinc-400 hover:text-white"
                          }`}
                        >
                          {formatMoodName(mood)}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. MARKETPLACE CONTROLS (Trending / Best / Recent + Price / Mood / Style filters) */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left: Framer-style pill selector (Trending | Best | Recent) */}
          <div className="inline-flex items-center rounded-lg bg-white/[0.04] border border-white/10 p-0.5 w-fit">
            <button
              onClick={() => setActiveSort("trending")}
              className={`rounded-md px-3.5 py-1 text-xs font-medium transition-all ${
                activeSort === "trending"
                  ? "bg-[#222228] text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Trending
            </button>
            <button
              onClick={() => setActiveSort("best")}
              className={`rounded-md px-3.5 py-1 text-xs font-medium transition-all ${
                activeSort === "best"
                  ? "bg-[#222228] text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Best
            </button>
            <button
              onClick={() => setActiveSort("recent")}
              className={`rounded-md px-3.5 py-1 text-xs font-medium transition-all ${
                activeSort === "recent"
                  ? "bg-[#222228] text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Recent
            </button>
          </div>

          {/* Right: Dropdowns for Price, Mood, Style */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Price Dropdown */}
            <div className="relative">
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="h-8 appearance-none rounded-lg border border-white/10 bg-white/[0.04] pl-3 pr-7 text-xs text-zinc-300 focus:border-white/30 focus:outline-none cursor-pointer hover:border-white/20 transition"
              >
                {PRICE_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-[#121217] text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-3.5 w-3.5 text-zinc-500" />
            </div>

            {/* Mood Dropdown */}
            <div className="relative">
              <select
                value={activeMood}
                onChange={(e) => setActiveMood(e.target.value as MoodCategory)}
                className="h-8 appearance-none rounded-lg border border-white/10 bg-white/[0.04] pl-3 pr-7 text-xs text-zinc-300 focus:border-white/30 focus:outline-none cursor-pointer hover:border-white/20 transition"
              >
                {MOOD_CATEGORIES.map((m) => (
                  <option key={m.id} value={m.id} className="bg-[#121217] text-white">
                    Mood: {m.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-3.5 w-3.5 text-zinc-500" />
            </div>

            {/* Style Dropdown */}
            <div className="relative">
              <select
                value={styleFilter}
                onChange={(e) => setStyleFilter(e.target.value)}
                className="h-8 appearance-none rounded-lg border border-white/10 bg-white/[0.04] pl-3 pr-7 text-xs text-zinc-300 focus:border-white/30 focus:outline-none cursor-pointer hover:border-white/20 transition"
              >
                {STYLE_OPTIONS.map((s) => (
                  <option key={s.id} value={s.id} className="bg-[#121217] text-white">
                    Style: {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-3.5 w-3.5 text-zinc-500" />
            </div>

            {/* Reset Filters button */}
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setActiveMood("ALL");
                  setStyleFilter("all");
                  setPriceFilter("all");
                  onSearchChange("");
                }}
                className="h-8 inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 text-xs text-zinc-400 hover:text-white transition"
              >
                <X className="h-3 w-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Counter: Showing X templates */}
        <div className="flex items-center justify-between text-xs text-zinc-500 px-0.5">
          <span>
            Showing {filteredTemplates.length} {filteredTemplates.length === 1 ? "template" : "templates"}
            {activeMood !== "ALL" ? ` in ${formatMoodName(activeMood)}` : ""}
          </span>
          {searchQuery && (
            <span className="text-zinc-400">
              Matching &ldquo;{searchQuery}&rdquo;
            </span>
          )}
        </div>

        {/* 3-Column Template Grid */}
        {filteredTemplates.length === 0 ? (
          <div className="py-20 text-center space-y-3 rounded-2xl border border-white/5 bg-white/[0.01] p-8">
            <p className="text-sm text-zinc-400">
              No templates match your selected filters.
            </p>
            <button
              onClick={() => {
                setActiveMood("ALL");
                setStyleFilter("all");
                setPriceFilter("all");
                onSearchChange("");
              }}
              className="text-xs font-mono text-white underline hover:text-zinc-300"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
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

      {/* DETAIL MODAL */}
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
          target="her"
          mood={checkoutTemplate.id}
        />
      )}
    </div>
  );
}
