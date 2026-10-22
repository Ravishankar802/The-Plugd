"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import CategoryChipsBar from "@/components/CategoryChipsBar";
import CategoryBreadcrumb from "@/components/CategoryBreadcrumb";
import PlaybookFeedCard from "@/components/PlaybookFeedCard";
import type { Category, PlaybookSummary } from "@/lib/categories";

interface CategoryPageClientProps {
  category: Category;
  playbooks: PlaybookSummary[];
  hasAccess?: boolean;
}

export default function CategoryPageClient({
  category,
  playbooks,
  hasAccess = false,
}: CategoryPageClientProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  return (
    <div className="min-h-screen bg-[#f6f6f4] text-[#1c1917] font-sans antialiased selection:bg-[#2563eb] selection:text-white flex flex-col justify-between">
      <div>
        {/* Compact YouTube-Style Sticky Header */}
        <Header
          variant="platform"
          hasAccess={hasAccess}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showSearch={true}
        />

        {/* Category Navigation Row */}
        <CategoryChipsBar selectedCategory={category.slug} />

        {/* Category Page Main Feed */}
        <main className="mx-auto max-w-[1600px] px-3 sm:px-6 lg:px-8 pt-5 pb-16">
          {/* Breadcrumb Navigation: Plugd > Category Name */}
          <CategoryBreadcrumb categoryName={category.name} />

          {/* Grid of Category Playbooks or Search Empty State */}
          {filteredPlaybooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-7 sm:gap-x-5 sm:gap-y-8">
              {filteredPlaybooks.map((playbook) => (
                <PlaybookFeedCard key={playbook.id} playbook={playbook} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center max-w-md mx-auto">
              <p className="text-[15px] sm:text-[16px] font-medium text-[#78716c]">
                {searchQuery
                  ? `No Playbooks found in ${category.name} matching "${searchQuery}".`
                  : `No Playbooks found for ${category.name} yet.`}
              </p>
              {searchQuery && (
                <div className="mt-4 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#d6d3d1] bg-white px-4 py-1.5 text-xs font-mono font-semibold text-[#1c1917] hover:border-[#1c1917] transition-colors cursor-pointer"
                  >
                    Clear search
                  </button>
                </div>
              )}
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
