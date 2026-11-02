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
  Terminal,
  Shield,
  Zap,
  Activity,
  Radio,
  Cpu,
  Sparkles,
} from "lucide-react";
import { IS_REVIEW_PHASE_FREE_ACCESS } from "@/lib/config";
import type { PlaybookSummary } from "@/lib/categories";
import { getAuthorProfile, getAvatarBgColor } from "@/lib/book-utils";

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

  // Telemetry real-time clock for sci-fi terminal effect
  const [timecode, setTimecode] = useState<string>("07:22:20 UTC");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, "0");
      const minutes = String(now.getUTCMinutes()).padStart(2, "0");
      const seconds = String(now.getUTCSeconds()).padStart(2, "0");
      setTimecode(`${hours}:${minutes}:${seconds} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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

    // 1. Category filter
    if (selectedCategory === "ai-businesses") {
      result = result.filter((p) => p.categorySlug === "ai-businesses");
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
        result.sort((a, b) => {
          if (a.publishedAt && b.publishedAt) {
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
          }
          return b.id.localeCompare(a.id);
        });
        break;
      case "oldest":
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
        break;
    }

    return result;
  }, [playbooks, selectedCategory, searchQuery, sortOption]);

  const sortLabels: Record<SortOption, string> = {
    featured: "FEATURED_STREAM",
    newest: "NEWEST_INCEPT",
    oldest: "OLDEST_ARCHIVE",
    az: "ALPHA_INDEX [A-Z]",
  };

  const categoryLabels: Record<CategoryFilter, string> = {
    all: "ALL_FREQUENCIES",
    "ai-businesses": "AI_SYSTEMS",
  };

  const countText = `${filteredAndSortedPlaybooks.length} ${
    filteredAndSortedPlaybooks.length === 1 ? "NODE" : "NODES"
  } ACTIVE`;

  return (
    <div
      className="min-h-screen text-[#f1f5f9] font-sans antialiased selection:bg-cyan-500 selection:text-black flex flex-col justify-between relative overflow-x-hidden"
      style={{
        backgroundColor: "#070a11",
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.12), transparent 40%),
          radial-gradient(circle at 100% 100%, rgba(129, 140, 248, 0.08), transparent 35%),
          linear-gradient(rgba(14, 165, 233, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(14, 165, 233, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 100% 100%, 32px 32px, 32px 32px",
      }}
    >
      {/* Ambient Cyber Scanline Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.035]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #000, #000 1px, transparent 1px, transparent 2px)",
          backgroundSize: "100% 2px",
        }}
      />

      <div>
        {/* ========================================================= */}
        {/* 1. SCI-FI RETRO CYBER TERMINAL HEADER */}
        {/* ========================================================= */}
        <header className="sticky top-0 z-50 w-full border-b border-cyan-500/25 bg-[#070a11]/90 backdrop-blur-md">
          <div className="mx-auto flex h-[58px] w-full max-w-[1600px] items-center justify-between px-3 sm:px-6 gap-2 sm:gap-4">
            {/* Left: Terminal System Lockup */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/"
                className="group inline-flex items-center gap-2.5 text-cyan-300 transition-colors focus:outline-none"
                aria-label="Plugd System Terminal"
              >
                <div className="relative flex items-center justify-center h-8 w-8 rounded-lg bg-cyan-950/80 border border-cyan-400/50 shadow-[0_0_12px_rgba(56,189,248,0.35)] group-hover:border-cyan-300 transition-colors">
                  <Terminal className="h-4 w-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-cyan-400 animate-ping opacity-75" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-cyan-400" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                      PLUGD // NEURAL_ARCHIVE
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/60 border border-cyan-500/40 px-1 py-0.2 rounded">
                      v2.6
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 tracking-tight hidden sm:inline">
                    CLASSIFIED OPERATIONAL PLAYBOOKS
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Live Telemetry Ticker */}
            <div className="hidden lg:flex items-center gap-3 font-mono text-[11px] text-slate-300 bg-[#0c121e]/80 border border-cyan-500/30 px-3.5 py-1.5 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.15)]">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>SYS_ONLINE</span>
              </div>
              <span className="text-cyan-500/50">|</span>
              <div className="flex items-center gap-1 text-cyan-300">
                <Activity className="h-3 w-3 text-cyan-400" />
                <span>LATENCY: 14ms</span>
              </div>
              <span className="text-cyan-500/50">|</span>
              <div className="flex items-center gap-1 text-indigo-300">
                <Cpu className="h-3 w-3 text-indigo-400" />
                <span>{timecode}</span>
              </div>
            </div>

            {/* Right: Auth / System Access */}
            <div className="flex items-center gap-2.5">
              {hasAccess ? (
                <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/50 px-3 py-1.5 rounded-lg shadow-[0_0_10px_rgba(52,211,153,0.25)]">
                  <Shield className="h-3.5 w-3.5 text-emerald-400" />
                  <span>ACCESS_AUTHORIZED</span>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-500 hover:text-black border border-cyan-400/50 hover:border-cyan-300 px-3.5 py-1.5 rounded-lg shadow-[0_0_12px_rgba(56,189,248,0.2)] hover:shadow-[0_0_18px_rgba(56,189,248,0.5)] transition-all cursor-pointer"
                >
                  <Zap className="h-3.5 w-3.5 text-cyan-400" />
                  <span>[ LOGIN // PORTAL ]</span>
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* ========================================================= */}
        {/* 2. SCI-FI RETRO HERO / HUD DOSSIER BANNER */}
        {/* ========================================================= */}
        <section className="relative mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10 pb-6">
          <div className="relative rounded-2xl border border-cyan-500/30 bg-[#0c121e]/85 p-5 sm:p-7 backdrop-blur-md shadow-[0_0_30px_rgba(14,165,233,0.12)] overflow-hidden">
            {/* Reticle corner marks '+' */}
            <span className="absolute -top-1 -left-1 text-cyan-400 font-mono text-sm select-none pointer-events-none">+</span>
            <span className="absolute -top-1 -right-1 text-cyan-400 font-mono text-sm select-none pointer-events-none">+</span>
            <span className="absolute -bottom-1 -left-1 text-cyan-400 font-mono text-sm select-none pointer-events-none">+</span>
            <span className="absolute -bottom-1 -right-1 text-cyan-400 font-mono text-sm select-none pointer-events-none">+</span>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase">
                  <Radio className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                  <span>SEC_LVL_01 // PUBLIC INTELLIGENCE DATABASE</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-100 to-indigo-300">
                  OPERATIONAL PLAYBOOK DIRECTORY
                </h1>
                <p className="text-xs sm:text-sm font-mono text-slate-300 leading-relaxed">
                  DIRECT EXECUTION BLUEPRINTS. HIGH-MARGIN AI ARCHITECTURES, VERIFIED UNIT ECONOMICS, AND PRODUCTION FRAMEWORKS BUILT FOR IMMEDIATE DEPLOYMENT.
                </p>
              </div>

              {/* Sci-Fi Status Terminal Widget */}
              <div className="shrink-0 flex flex-col gap-2 font-mono text-[11px] bg-[#070b13] border border-cyan-500/40 p-3 sm:p-4 rounded-xl shadow-inner min-w-[240px]">
                <div className="flex items-center justify-between text-slate-400 border-b border-cyan-500/20 pb-1.5">
                  <span>TERMINAL ID:</span>
                  <span className="text-cyan-300 font-bold">PLUGD-SYS-9000</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 border-b border-cyan-500/20 pb-1.5">
                  <span>ACTIVE REPO:</span>
                  <span className="text-indigo-300 font-bold">{playbooks.length} PROTOCOLS</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>TIER ACCESS:</span>
                  <span className="text-emerald-400 font-bold">$3.00 LIFETIME</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10 pb-20">
          {/* ========================================================= */}
          {/* 3. SCI-FI RETRO SEARCH & COMMAND TOOLBAR */}
          {/* ========================================================= */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-6">
            {/* Left: Sci-Fi Command Prompt Search */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-xs text-cyan-400 pointer-events-none select-none">
                &gt;
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="QUERY_PLAYBOOKS_..."
                className="w-full h-10 pl-8 pr-9 rounded-xl border border-cyan-500/35 bg-[#0c121e]/90 font-mono text-xs text-cyan-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.15)] transition-all"
                aria-label="Query Playbooks"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300 p-1 rounded hover:bg-cyan-950/50 transition-colors cursor-pointer"
                  title="Clear search"
                  aria-label="Clear search input"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Right: Controls (Category Frequency, Sort Option, Grid/List Mode) */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 font-mono text-xs">
              {/* Category Dropdown */}
              <div className="relative" ref={categoryDropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsCategoryOpen(!isCategoryOpen);
                    setIsSortOpen(false);
                  }}
                  className="inline-flex items-center gap-2 h-10 px-3.5 rounded-xl border border-cyan-500/35 bg-[#0c121e]/90 text-cyan-300 hover:border-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.1)] transition-all cursor-pointer"
                  aria-expanded={isCategoryOpen}
                  aria-haspopup="listbox"
                >
                  <span className="text-slate-400">CHANNEL:</span>
                  <span className="font-bold text-white">{categoryLabels[selectedCategory]}</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-cyan-400 transition-transform duration-150 ${
                      isCategoryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCategoryOpen && (
                  <div className="absolute right-0 sm:left-0 sm:right-auto mt-1.5 w-52 rounded-xl border border-cyan-500/40 bg-[#0a0e17] p-1.5 shadow-[0_0_20px_rgba(14,165,233,0.3)] z-30 animate-in fade-in zoom-in-95 duration-100">
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
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-cyan-950/80 text-cyan-300 font-bold border border-cyan-500/50"
                              : "text-slate-300 hover:bg-[#111927] hover:text-white"
                          }`}
                          role="option"
                          aria-selected={isSelected}
                        >
                          <span>{categoryLabels[catKey]}</span>
                          {isSelected && <Check className="h-3.5 w-3.5 text-cyan-400" />}
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
                  className="inline-flex items-center gap-2 h-10 px-3.5 rounded-xl border border-cyan-500/35 bg-[#0c121e]/90 text-cyan-300 hover:border-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.1)] transition-all cursor-pointer"
                  aria-expanded={isSortOpen}
                  aria-haspopup="listbox"
                >
                  <span className="text-slate-400">SORT:</span>
                  <span className="font-bold text-white">{sortLabels[sortOption]}</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-cyan-400 transition-transform duration-150 ${
                      isSortOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isSortOpen && (
                  <div className="absolute right-0 mt-1.5 w-52 rounded-xl border border-cyan-500/40 bg-[#0a0e17] p-1.5 shadow-[0_0_20px_rgba(14,165,233,0.3)] z-30 animate-in fade-in zoom-in-95 duration-100">
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
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-cyan-950/80 text-cyan-300 font-bold border border-cyan-500/50"
                              : "text-slate-300 hover:bg-[#111927] hover:text-white"
                          }`}
                          role="option"
                          aria-selected={isSelected}
                        >
                          <span>{sortLabels[optKey]}</span>
                          {isSelected && <Check className="h-3.5 w-3.5 text-cyan-400" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Grid / List HUD Switcher */}
              <div
                className="inline-flex items-center rounded-xl border border-cyan-500/35 bg-[#0c121e]/90 p-1 shadow-[0_0_12px_rgba(56,189,248,0.1)]"
                role="group"
                aria-label="HUD layout switcher"
              >
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                      : "text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40"
                  }`}
                  title="Grid HUD"
                  aria-label="Switch to grid HUD"
                  aria-pressed={viewMode === "grid"}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "list"
                      ? "bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                      : "text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40"
                  }`}
                  title="List HUD"
                  aria-label="Switch to list HUD"
                  aria-pressed={viewMode === "list"}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 4. TELEMETRY STATUS ROW & ACTIVE FILTER RESET */}
          {/* ========================================================= */}
          <div className="flex items-center justify-between gap-4 mb-6 font-mono text-xs text-slate-400 border-b border-cyan-500/20 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold tracking-wider">[ {countText} ]</span>
              {searchQuery.trim() && (
                <span>
                  QUERY: &ldquo;
                  <strong className="text-white font-bold">{searchQuery}</strong>
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
                className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer tracking-wider"
              >
                <span>[ RESET_FILTERS ]</span>
              </button>
            )}
          </div>

          {/* ========================================================= */}
          {/* 5. PLAYBOOK REPOSITORY (GRID OR LIST) */}
          {/* ========================================================= */}
          {filteredAndSortedPlaybooks.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-7 items-stretch">
                {filteredAndSortedPlaybooks.map((playbook, idx) => (
                  <div key={playbook.id} className="flex flex-col h-full">
                    <SciFiPlaybookCard playbook={playbook} index={idx} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAndSortedPlaybooks.map((playbook, idx) => (
                  <SciFiPlaybookListRow key={playbook.id} playbook={playbook} index={idx} />
                ))}
              </div>
            )
          ) : (
            <div className="py-24 text-center max-w-md mx-auto rounded-2xl border border-cyan-500/30 bg-[#0c121e]/70 p-8 shadow-[0_0_25px_rgba(56,189,248,0.1)]">
              <Terminal className="h-10 w-10 text-cyan-400 mx-auto mb-3 animate-pulse" />
              <p className="font-mono text-sm text-cyan-300">
                [ ERROR: ZERO_NODES_LOCATED ]
              </p>
              <p className="mt-1 text-xs font-mono text-slate-400">
                No matching data entries for query &ldquo;{searchQuery}&rdquo;.
              </p>
              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSortOption("featured");
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-400 bg-cyan-950/80 px-4 py-2 font-mono text-xs font-bold text-cyan-300 hover:bg-cyan-500 hover:text-black transition-all cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                >
                  RESET_QUERY
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================= */}
      {/* 6. SCI-FI RETRO TERMINAL FOOTER */}
      {/* ========================================================= */}
      <footer className="border-t border-cyan-500/25 bg-[#05070c] py-8 font-mono text-xs text-slate-400">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-cyan-400">PLUGD // NEURAL_TERMINAL</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">DATA_TRANSMISSION: SECURED</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <Link href="/terms-of-service" className="hover:text-cyan-300 transition-colors">
              [ TERMS ]
            </Link>
            <Link href="/privacy-policy" className="hover:text-cyan-300 transition-colors">
              [ PRIVACY ]
            </Link>
            <a href="mailto:ravx003@gmail.com" className="hover:text-cyan-300 transition-colors">
              [ CONTACT_HQ ]
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * Sci-Fi Retro Playbook Card Component
 * Preserves the exact original thumbnail image while transforming the chassis,
 * reticle brackets, dossier metadata, corner crosses, and glowing cyber CTA button.
 */
function SciFiPlaybookCard({
  playbook,
  index,
}: {
  playbook: PlaybookSummary;
  index: number;
}) {
  const authorName =
    (playbook as any).authorName ||
    getAuthorProfile(playbook.categoryName, playbook.slug).name;
  const formattedPrice = playbook.price ? Number(playbook.price).toFixed(2) : "3.00";
  const formattedOriginalPrice = (
    playbook.originalPrice ? Number(playbook.originalPrice) : 9
  ).toFixed(2);

  const nodeIndex = String(index + 1).padStart(2, "0");

  return (
    <div className="group relative flex flex-col justify-between h-full w-full rounded-xl bg-[#090e17]/95 border border-cyan-500/30 hover:border-cyan-300 p-3 sm:p-3.5 shadow-[0_0_15px_rgba(14,165,233,0.08)] hover:shadow-[0_0_25px_rgba(56,189,248,0.25)] transition-all duration-200 ease-out">
      {/* 4 Corner Crosshairs '+' */}
      <span className="absolute -top-1.5 -left-1.5 text-cyan-400 font-mono text-xs select-none pointer-events-none">+</span>
      <span className="absolute -top-1.5 -right-1.5 text-cyan-400 font-mono text-xs select-none pointer-events-none">+</span>
      <span className="absolute -bottom-1.5 -left-1.5 text-cyan-400 font-mono text-xs select-none pointer-events-none">+</span>
      <span className="absolute -bottom-1.5 -right-1.5 text-cyan-400 font-mono text-xs select-none pointer-events-none">+</span>

      {/* Top Chassis HUD Banner */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-cyan-500/20 font-mono text-[10px] text-slate-400">
        <span className="text-cyan-400 font-bold tracking-wider">NODE // PK-{nodeIndex}</span>
        <div className="flex items-center gap-1.5 text-cyan-300">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="tracking-widest">LIVE_FEED</span>
        </div>
      </div>

      {/* Clickable Card Body */}
      <Link
        href={playbook.href}
        className="flex flex-col flex-1 w-full focus:outline-none cursor-pointer"
        aria-label={`${playbook.title} — ${playbook.categoryName} Playbook`}
      >
        {/* 16:9 Thumbnail Viewport with Tactical Reticle Corners */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-[#04060a] border border-cyan-500/35 shrink-0 group-hover:border-cyan-400 transition-colors">
          {/* Tactical Corner Reticle Brackets ┌ ┐ └ ┘ */}
          <div className="pointer-events-none absolute inset-0 z-20 p-1.5 flex flex-col justify-between">
            <div className="flex justify-between">
              <span className="text-cyan-400 font-mono text-xs leading-none drop-shadow">┌</span>
              <span className="text-cyan-400 font-mono text-xs leading-none drop-shadow">┐</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyan-400 font-mono text-xs leading-none drop-shadow">└</span>
              <span className="text-cyan-400 font-mono text-xs leading-none drop-shadow">┘</span>
            </div>
          </div>

          {/* Tactical Viewport Overlay Badges */}
          <div className="pointer-events-none absolute top-2 left-2 z-20">
            <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold text-cyan-300 bg-black/80 border border-cyan-500/40 px-1.5 py-0.5 rounded shadow">
              1080P_DATA
            </span>
          </div>

          {playbook.hoursOfMaterial && (
            <div className="pointer-events-none absolute bottom-2 right-2 z-20">
              <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold text-slate-200 bg-black/80 border border-cyan-500/40 px-1.5 py-0.5 rounded shadow">
                {playbook.hoursOfMaterial}
              </span>
            </div>
          )}

          {/* Exact Original Thumbnail Image */}
          {playbook.thumbnail ? (
            <Image
              src={playbook.thumbnail}
              alt={playbook.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
              priority
            />
          ) : (
            <div className="h-full w-full bg-[#070b13]" />
          )}
        </div>

        {/* Text & Dossier Content */}
        <div className="mt-3 flex flex-col flex-1 w-full">
          {/* Operator Dossier Row */}
          <div className="flex items-center gap-2 mb-1.5">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-xs shrink-0 ring-1 ring-cyan-400/50"
              style={{ backgroundColor: getAvatarBgColor(authorName) }}
            >
              {authorName.charAt(0)}
            </div>
            <div className="font-mono text-xs truncate w-full">
              <span className="text-cyan-400/80 mr-1">OPERATOR //</span>
              <span className="text-slate-200 font-semibold">{authorName}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-[14px] sm:text-[14.5px] font-bold text-white leading-[1.35] line-clamp-2 h-[38px] sm:h-[40px] group-hover:text-cyan-300 transition-colors">
            {playbook.title}
          </h3>

          {/* Metadata & Telemetry Row */}
          <div className="mt-2.5 flex items-center gap-1.5 font-mono text-[11px] h-[22px] overflow-hidden w-full">
            {playbook.badge && (
              <span className="inline-flex items-center rounded bg-cyan-950/80 px-1.5 py-0.5 text-[10px] font-bold text-cyan-300 border border-cyan-500/40 shrink-0">
                {playbook.badge}
              </span>
            )}
            {playbook.rating && (
              <div className="inline-flex items-center gap-1 rounded bg-[#070b13] border border-cyan-500/30 px-1.5 py-0.5 text-[10px] font-bold text-amber-400 shrink-0">
                <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                <span>{playbook.rating}</span>
              </div>
            )}
            {playbook.ratingCount && (
              <div className="inline-flex items-center rounded bg-[#070b13] border border-cyan-500/30 px-1.5 py-0.5 text-[10px] text-slate-400 shrink-0">
                <span>
                  [
                  {typeof playbook.ratingCount === "number"
                    ? playbook.ratingCount.toLocaleString()
                    : playbook.ratingCount}
                  ]
                </span>
              </div>
            )}
            {playbook.modulesCount > 0 && (
              <span className="text-slate-500 text-[10px] hidden sm:inline">
                {playbook.modulesCount}M·{playbook.lessonsCount}L
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Horizontal Line Divider with Center Reticle Marker */}
      <div className="-mx-3 sm:-mx-3.5 border-t border-cyan-500/25 mt-3.5 pt-3 px-3 sm:px-3.5 flex items-center justify-between gap-2 shrink-0 relative">
        <span className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-4 h-[5px] bg-cyan-500/30 rounded-xs" />

        {/* Left: Price Readout */}
        <div className="font-mono">
          {playbook.badge === "Coming Soon" ? (
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center rounded bg-slate-900 px-1.5 py-0.5 text-[11px] font-bold text-slate-400 border border-slate-700">
                IN_PROD
              </span>
            </div>
          ) : IS_REVIEW_PHASE_FREE_ACCESS ? (
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-emerald-400">
                [ FREE_ACCESS ]
              </span>
            </div>
          ) : (
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-cyan-300">
                ${formattedPrice}
              </span>
              <span className="text-[10px] text-slate-500 line-through">
                ${formattedOriginalPrice}
              </span>
            </div>
          )}
        </div>

        {/* Right: Sci-Fi HUD Action Button */}
        <div>
          {playbook.badge === "Coming Soon" ? (
            <Link
              href={playbook.href}
              className="inline-flex items-center justify-center gap-1 font-mono text-[11px] font-bold text-slate-400 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded transition-colors"
            >
              <span>[ LOCKED ]</span>
            </Link>
          ) : IS_REVIEW_PHASE_FREE_ACCESS ? (
            <Link
              href={playbook.href}
              className="inline-flex items-center justify-center gap-1.5 font-mono text-[11px] font-bold text-black bg-cyan-400 hover:bg-cyan-300 px-3 py-1.5 rounded shadow-[0_0_12px_rgba(56,189,248,0.5)] transition-all cursor-pointer"
            >
              <span>ACCESS</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          ) : (
            <Link
              href={playbook.href}
              className="inline-flex items-center justify-center gap-1.5 font-mono text-[11px] font-bold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-400 hover:text-black border border-cyan-400/60 px-3 py-1.5 rounded shadow-[0_0_10px_rgba(56,189,248,0.2)] hover:shadow-[0_0_18px_rgba(56,189,248,0.6)] transition-all cursor-pointer"
            >
              <span>[ ACCESS → ]</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Sci-Fi Retro List Row Component for List View Mode
 */
function SciFiPlaybookListRow({
  playbook,
  index,
}: {
  playbook: PlaybookSummary;
  index: number;
}) {
  const authorName =
    (playbook as any).authorName ||
    getAuthorProfile(playbook.categoryName, playbook.slug).name;
  const formattedPrice = playbook.price ? Number(playbook.price).toFixed(2) : "3.00";
  const formattedOriginalPrice = (
    playbook.originalPrice ? Number(playbook.originalPrice) : 9
  ).toFixed(2);
  const nodeIndex = String(index + 1).padStart(2, "0");

  return (
    <div className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#090e17]/95 border border-cyan-500/30 hover:border-cyan-300 shadow-[0_0_15px_rgba(14,165,233,0.08)] hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] transition-all duration-200">
      {/* 4 Corner Crosshairs */}
      <span className="absolute -top-1 -left-1 text-cyan-400 font-mono text-xs pointer-events-none">+</span>
      <span className="absolute -top-1 -right-1 text-cyan-400 font-mono text-xs pointer-events-none">+</span>
      <span className="absolute -bottom-1 -left-1 text-cyan-400 font-mono text-xs pointer-events-none">+</span>
      <span className="absolute -bottom-1 -right-1 text-cyan-400 font-mono text-xs pointer-events-none">+</span>

      <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
        {/* Thumbnail Preview with Corner Reticles */}
        <Link
          href={playbook.href}
          className="relative aspect-video w-32 sm:w-44 shrink-0 overflow-hidden rounded-lg bg-[#04060a] border border-cyan-500/35 focus:outline-none"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="pointer-events-none absolute inset-0 z-20 p-1 flex flex-col justify-between">
            <div className="flex justify-between">
              <span className="text-cyan-400 font-mono text-[10px] leading-none">┌</span>
              <span className="text-cyan-400 font-mono text-[10px] leading-none">┐</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyan-400 font-mono text-[10px] leading-none">└</span>
              <span className="text-cyan-400 font-mono text-[10px] leading-none">┘</span>
            </div>
          </div>
          {playbook.thumbnail ? (
            <Image
              src={playbook.thumbnail}
              alt={playbook.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="h-full w-full bg-[#070b13]" />
          )}
        </Link>

        {/* Text & Dossier Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5 font-mono text-[10px]">
            <span className="text-cyan-400 font-bold">NODE // PK-{nodeIndex}</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">OPERATOR: {authorName}</span>
            {playbook.badge && (
              <span className="rounded bg-cyan-950/80 px-1.5 py-0.5 font-bold text-cyan-300 border border-cyan-500/40">
                {playbook.badge}
              </span>
            )}
          </div>

          <Link href={playbook.href} className="focus:outline-none block">
            <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
              {playbook.title}
            </h3>
          </Link>

          <p className="mt-1 text-xs font-mono text-slate-400 line-clamp-1 max-w-2xl">
            {playbook.description}
          </p>

          <div className="mt-2 flex items-center flex-wrap gap-2 sm:gap-3 font-mono text-[11px] text-slate-400">
            {playbook.rating && (
              <div className="inline-flex items-center gap-1 font-bold text-amber-400">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span>{playbook.rating}</span>
                {playbook.ratingCount && (
                  <span className="text-slate-500 font-normal">
                    (
                    {typeof playbook.ratingCount === "number"
                      ? playbook.ratingCount.toLocaleString()
                      : playbook.ratingCount}
                    )
                  </span>
                )}
              </div>
            )}
            {playbook.modulesCount > 0 && (
              <>
                <span className="text-slate-600">·</span>
                <span>{playbook.modulesCount} MODS</span>
                <span className="text-slate-600">·</span>
                <span>{playbook.lessonsCount} LESSONS</span>
              </>
            )}
            {playbook.hoursOfMaterial && (
              <>
                <span className="text-slate-600">·</span>
                <span className="text-cyan-400">{playbook.hoursOfMaterial}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Pricing & CTA Button */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-cyan-500/20 font-mono">
        <div>
          {IS_REVIEW_PHASE_FREE_ACCESS ? (
            <span className="text-xs font-bold text-emerald-400">[ FREE ]</span>
          ) : (
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-cyan-300">${formattedPrice}</span>
              <span className="text-[10px] text-slate-500 line-through">
                ${formattedOriginalPrice}
              </span>
            </div>
          )}
        </div>

        <Link
          href={playbook.href}
          className="inline-flex items-center justify-center gap-1.5 font-mono text-xs font-bold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-400 hover:text-black border border-cyan-400/60 px-4 py-1.5 rounded shadow-[0_0_10px_rgba(56,189,248,0.2)] hover:shadow-[0_0_18px_rgba(56,189,248,0.6)] transition-all cursor-pointer"
        >
          <span>[ ACCESS_DATA → ]</span>
        </Link>
      </div>
    </div>
  );
}
