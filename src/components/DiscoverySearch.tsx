"use client";

import { Search, X, ArrowRight, Sparkles, FolderOpen, Layers, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import CategoryIcon from "@/components/CategoryIcon";
import type { SearchResults, SearchCategory, SearchSubcategory, SearchItem } from "@/lib/search";

interface DiscoverySearchProps {
  action: string;
  initialQuery?: string;
  placeholders: string[];
  placeholderPrefix?: string;
}

export default function DiscoverySearch({
  action,
  initialQuery = "",
  placeholders,
}: DiscoverySearchProps) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [query, setQuery] = useState(initialQuery);
  const [isFading, setIsFading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResults | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // Rotate search placeholders smoothly
  useEffect(() => {
    if (placeholders.length <= 1) return;

    const interval = window.setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setPlaceholderIndex((current) => (current + 1) % placeholders.length);
        setIsFading(false);
      }, 200);
    }, 2800);

    return () => window.clearInterval(interval);
  }, [placeholders]);

  // Fetch live search results with debouncing
  const performSearch = useCallback(async (searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setResults(null);
      setIsLoading(false);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}&limit=8`, {
        signal: controller.signal,
      });
      if (res.ok) {
        const data: SearchResults = await res.json();
        setResults(data);
        setIsOpen(true);
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        console.error("Search fetch error:", err);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults(null);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      performSearch(trimmed);
    }, 180);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClear = () => {
    setQuery("");
    setResults(null);
    setIsOpen(false);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  const handleFocus = () => {
    if (query.trim()) {
      setIsOpen(true);
      if (!results && !isLoading) {
        performSearch(query.trim());
      }
    }
  };

  const hasMatches =
    results &&
    (results.categories.length > 0 ||
      results.subcategories.length > 0 ||
      results.items.length > 0);

  return (
    <div ref={containerRef} className="relative w-full group">
      <form action={action} method="GET" onSubmit={() => setIsOpen(false)}>
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-4 h-4 w-4 text-zinc-400 transition-colors group-focus-within:text-orange-500 md:h-5 md:w-5" />
          <input
            ref={inputRef}
            type="search"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            autoComplete="off"
            placeholder={placeholders[placeholderIndex] || "Search wishlist items..."}
            className={`h-11 md:h-12 w-full rounded-2xl border border-zinc-200/90 bg-white pl-11 pr-10 text-xs md:text-sm font-medium text-zinc-900 shadow-sm outline-none transition-all placeholder:text-zinc-400 placeholder:transition-opacity focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ${
              isFading ? "placeholder:opacity-0" : "placeholder:opacity-100"
            }`}
          />
          {query ? (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 p-1 text-zinc-400 hover:text-zinc-700 transition"
              title="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </form>

      {/* Live Search Results Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl border border-zinc-200/90 bg-white shadow-2xl backdrop-blur-xl overflow-hidden max-h-[75vh] overflow-y-auto no-scrollbar">
          {isLoading && !results ? (
            <div className="p-6 text-center text-xs font-semibold text-zinc-500 flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
              <span>Searching across catalog...</span>
            </div>
          ) : null}

          {/* If No Results Found */}
          {!isLoading && results && !hasMatches && (
            <div className="p-6 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-500 mb-2.5">
                <Search className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold text-zinc-900">
                No results found for &ldquo;{query}&rdquo;
              </h4>
              <p className="mt-1 text-xs text-zinc-500 max-w-sm mx-auto">
                We couldn&apos;t find any matching categories, subcategories, or items.
              </p>
              <div className="mt-4 flex justify-center">
                <Link
                  href="/dashboard/items"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-orange-500 hover:text-black"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Create Custom Item</span>
                </Link>
              </div>
            </div>
          )}

          {/* Results Sections */}
          {results && hasMatches && (
            <div className="divide-y divide-zinc-100">
              {/* 1. Categories */}
              {results.categories.length > 0 && (
                <div className="p-3.5 bg-zinc-50/50">
                  <div className="flex items-center gap-1.5 px-1.5 pb-2 text-[11px] font-bold uppercase tracking-wider text-orange-600">
                    <FolderOpen className="h-3.5 w-3.5" />
                    <span>Categories</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {results.categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={cat.href}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-2 rounded-xl border border-zinc-200/90 bg-white px-3 py-1.5 text-xs font-bold text-zinc-800 shadow-xs hover:border-orange-500 hover:bg-orange-50/50 hover:text-orange-950 transition"
                      >
                        <CategoryIcon name={cat.icon} className="h-3.5 w-3.5 text-orange-500" />
                        <span>{cat.name}</span>
                        <ArrowRight className="h-3 w-3 text-zinc-400" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Subcategories */}
              {results.subcategories.length > 0 && (
                <div className="p-3.5">
                  <div className="flex items-center gap-1.5 px-1.5 pb-2 text-[11px] font-bold uppercase tracking-wider text-orange-600">
                    <Layers className="h-3.5 w-3.5" />
                    <span>Subcategories</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={sub.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl border border-transparent p-2 hover:border-zinc-200 hover:bg-zinc-50 transition group/sub"
                      >
                        {sub.image ? (
                          <img
                            src={sub.image}
                            alt={sub.name}
                            className="h-10 w-10 rounded-lg object-cover border border-zinc-200 bg-zinc-100 shrink-0"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-500 shrink-0">
                            <Sparkles className="h-4 w-4" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-zinc-900 truncate group-hover/sub:text-orange-600 transition">
                            {sub.name}
                          </div>
                          <div className="text-[11px] text-zinc-500">
                            in {sub.parentCategoryName}
                          </div>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-zinc-300 group-hover/sub:text-orange-500 transition shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Items */}
              {results.items.length > 0 && (
                <div className="p-3.5">
                  <div className="flex items-center gap-1.5 px-1.5 pb-2 text-[11px] font-bold uppercase tracking-wider text-orange-600">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Wishlist Items</span>
                  </div>
                  <div className="space-y-1">
                    {results.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 rounded-xl p-2 hover:bg-zinc-50 transition group/item"
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-11 w-11 rounded-xl object-cover border border-zinc-200 bg-zinc-50 shrink-0"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 text-zinc-400 shrink-0">
                            <Sparkles className="h-4 w-4" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-zinc-900 truncate group-hover/item:text-orange-600 transition">
                            {item.name}
                          </div>
                          <div className="text-[11px] font-medium text-zinc-500">
                            {item.categoryName}
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-orange-600 group-hover/item:translate-x-0.5 transition-transform shrink-0">
                          View &rarr;
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom footer linking to full page results */}
              <div className="bg-zinc-50 px-4 py-2.5 flex items-center justify-between border-t border-zinc-100">
                <Link
                  href={`/?q=${encodeURIComponent(query)}`}
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-bold text-zinc-700 hover:text-orange-600 transition flex items-center gap-1.5"
                >
                  <span>See all results for &ldquo;{query}&rdquo;</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <span className="text-[10px] text-zinc-400 hidden sm:inline">
                  Press <kbd className="rounded border border-zinc-300 bg-white px-1 py-0.5 font-mono text-[9px] shadow-2xs">Enter ↵</kbd>
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
