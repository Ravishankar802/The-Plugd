"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";

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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

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

  const handleClear = () => {
    setQuery("");
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  return (
    <form action={action} method="GET" className="relative w-full group">
      <div className="relative flex items-center">
        <Search className="pointer-events-none absolute left-4 h-4 w-4 text-zinc-400 transition-colors group-focus-within:text-orange-500 md:h-5 md:w-5" />
        <input
          ref={inputRef}
          type="search"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholders[placeholderIndex] || "Search wishlist items..."}
          className={`h-11 md:h-12 w-full rounded-2xl border border-zinc-200/90 bg-white pl-11 pr-10 text-xs md:text-sm font-medium text-zinc-900 shadow-sm outline-none transition-all placeholder:text-zinc-400 placeholder:transition-opacity focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 ${
            isFading ? "placeholder:opacity-0" : "placeholder:opacity-100"
          }`}
        />
        {query ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 p-1 text-zinc-400 hover:text-zinc-700"
            title="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </form>
  );
}
