"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  List,
  X,
  BookOpen,
} from "lucide-react";
import {
  SELL_PDFS_WITH_AI_BOOK_PAGES,
  TOTAL_BOOK_PAGES,
  WebBookPage,
} from "@/lib/book-content/sell-pdfs-with-ai-book";

interface WebBookReaderProps {
  courseSlug: string;
  courseTitle: string;
}

export default function WebBookReader({ courseSlug, courseTitle }: WebBookReaderProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tocOpen, setTocOpen] = useState(false);
  const [, startTransition] = useTransition();

  // Load last read page from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(`plugd_started_${courseSlug}`, "true");
        const savedPage = localStorage.getItem(`plugd_book_page_${courseSlug}`);
        if (savedPage) {
          const p = parseInt(savedPage, 10);
          if (!isNaN(p) && p >= 1 && p <= TOTAL_BOOK_PAGES) {
            setCurrentPage(p);
          }
        }
      } catch (e) {
        console.warn(e);
      }
    }
  }, [courseSlug]);

  const goToPage = useCallback(
    (page: number) => {
      const target = Math.max(1, Math.min(page, TOTAL_BOOK_PAGES));
      startTransition(() => {
        setCurrentPage(target);
      });
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(`plugd_book_page_${courseSlug}`, target.toString());
        } catch {}
      }
    },
    [courseSlug]
  );

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (tocOpen) return;
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        prevPage();
      } else if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        nextPage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevPage, nextPage, tocOpen]);

  const pageData: WebBookPage =
    SELL_PDFS_WITH_AI_BOOK_PAGES[currentPage - 1] || SELL_PDFS_WITH_AI_BOOK_PAGES[0];

  const handlePrintPdf = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#F0EEEA] text-[#1c1917] select-none overflow-hidden font-sans">
      {/* Top Header Bar */}
      <header className="h-13 bg-white border-b border-stone-200 px-4 sm:px-6 flex items-center justify-between shrink-0 z-20 shadow-2xs">
        {/* Left: Back to Playbook */}
        <div className="flex items-center gap-3">
          <Link
            href={`/${courseSlug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-950 text-xs sm:text-[13px] font-semibold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Playbook</span>
          </Link>
          <span className="hidden sm:inline text-stone-300">|</span>
          <span className="hidden md:inline text-xs font-serif text-stone-700 font-medium truncate max-w-sm">
            {courseTitle}
          </span>
        </div>

        {/* Center: Page Counter on Desktop */}
        <div className="flex items-center gap-2 text-xs font-serif text-stone-700">
          <span>
            Page <strong className="font-semibold text-black">{currentPage}</strong> of{" "}
            {TOTAL_BOOK_PAGES}
          </span>
        </div>

        {/* Right: Table of Contents & Download PDF */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTocOpen(!tocOpen)}
            type="button"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            title="Table of Contents"
          >
            <List className="h-4 w-4" />
            <span className="hidden xs:inline">Contents</span>
          </button>

          <button
            onClick={handlePrintPdf}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black hover:bg-stone-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            title="Download / Print PDF"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Download PDF</span>
          </button>
        </div>
      </header>

      {/* Main Reading Stage: Centered Horizontal Rectangle Page with Empty Left and Right Margins */}
      <div className="relative flex-1 w-full flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-hidden">
        {/* Floating Prev Button in Left Margin */}
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          type="button"
          aria-label="Previous Page"
          className="absolute left-3 sm:left-6 md:left-8 z-10 p-3 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-black border border-stone-200/90 shadow-md hover:shadow-lg disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* The Book Page: Horizontal Rectangle in the Middle of the Screen */}
        <div className="relative w-full max-w-[960px] aspect-[16/10] sm:aspect-[16/9.5] bg-white rounded-xl border border-stone-200 shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col justify-between">
          {pageData.type === "cover" && pageData.imageUrl ? (
            /* Cover Page: Thumbnail fits perfectly in one page */
            <div className="relative w-full h-full bg-black">
              <Image
                src={pageData.imageUrl}
                alt={courseTitle}
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          ) : (
            /* Inside Pages: Pure white background, pure black text, professional book typography */
            <div className="w-full h-full p-6 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-between bg-white text-black font-serif select-text">
              {/* Header / Running Head */}
              <div className="border-b border-stone-200 pb-2.5 flex items-center justify-between text-[11px] sm:text-xs text-stone-500 font-serif uppercase tracking-widest">
                <span className="truncate max-w-[70%]">
                  {pageData.header || pageData.partTitle || courseTitle}
                </span>
                <span className="shrink-0">{pageData.pageNumber}</span>
              </div>

              {/* Page Content Body */}
              <div className="flex-1 py-4 sm:py-6 flex flex-col justify-center space-y-3.5 sm:space-y-4 overflow-y-auto">
                {pageData.type === "title" && (
                  <div className="text-center space-y-3 py-6">
                    <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-black font-serif">
                      {pageData.content[0]}
                    </h1>
                    <p className="text-base sm:text-lg italic text-stone-700 font-serif">
                      {pageData.content[1]}
                    </p>
                    <div className="w-16 h-0.5 bg-black mx-auto my-4" />
                    <p className="text-xs sm:text-sm text-stone-600 font-serif max-w-md mx-auto">
                      {pageData.content[2]}
                    </p>
                    <p className="text-xs font-bold text-black uppercase tracking-wider pt-6">
                      {pageData.content[3]}
                    </p>
                    <p className="text-[11px] text-stone-500 font-serif">{pageData.content[4]}</p>
                  </div>
                )}

                {pageData.type === "half-title" && (
                  <div className="text-center space-y-3 py-16">
                    <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-black font-serif">
                      {pageData.content[0]}
                    </h2>
                    <p className="text-xs sm:text-sm italic text-stone-600 font-serif">
                      {pageData.content[1]}
                    </p>
                  </div>
                )}

                {pageData.type === "copyright" && (
                  <div className="max-w-lg mx-auto text-[11px] sm:text-xs text-stone-800 leading-relaxed space-y-3 font-serif py-6">
                    {pageData.content.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                )}

                {pageData.type === "toc" && (
                  <div className="max-w-xl mx-auto space-y-2 font-serif py-2 w-full">
                    <h2 className="text-base sm:text-lg font-bold text-black border-b border-black pb-1 mb-3 uppercase tracking-wider text-center">
                      {pageData.content[0]}
                    </h2>
                    <div className="space-y-1.5 text-xs sm:text-[13px] text-stone-900 leading-normal">
                      {pageData.content.slice(1).map((item, iIdx) => {
                        const isPart = item.startsWith("PART ");
                        return (
                          <div
                            key={iIdx}
                            className={`flex justify-between items-baseline ${
                              isPart ? "font-bold text-black pt-2" : "text-stone-800 pl-4"
                            }`}
                          >
                            <span className="truncate pr-2">{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {pageData.type === "chapter-start" && (
                  <div className="space-y-4 py-2">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-widest block font-serif">
                      {pageData.partTitle}
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black font-serif leading-tight">
                      {pageData.chapterTitle}
                    </h2>
                    <div className="w-12 h-0.5 bg-black my-2" />
                    <p className="text-sm sm:text-base italic text-stone-800 leading-relaxed">
                      {pageData.content[0]}
                    </p>
                    <p className="text-xs sm:text-sm text-stone-900 leading-relaxed">
                      {pageData.content[1]}
                    </p>
                    {pageData.content[2] && (
                      <p className="text-xs sm:text-sm text-stone-900 leading-relaxed">
                        {pageData.content[2]}
                      </p>
                    )}
                  </div>
                )}

                {pageData.type === "content" && (
                  <div className="space-y-3 sm:space-y-3.5">
                    {pageData.chapterTitle && (
                      <h3 className="text-sm sm:text-base font-bold text-black font-serif">
                        {pageData.chapterTitle}
                      </h3>
                    )}
                    {pageData.content.map((block, bIdx) => {
                      if (block.startsWith("### ")) {
                        return (
                          <h4
                            key={bIdx}
                            className="text-sm sm:text-[15px] font-bold text-black font-serif pt-1"
                          >
                            {block.replace("### ", "")}
                          </h4>
                        );
                      }
                      if (block.startsWith("**Core Operator Mantra**:")) {
                        return (
                          <div
                            key={bIdx}
                            className="border-l-2 border-black pl-3 py-1 my-2 bg-stone-50 text-xs sm:text-[13px] text-stone-900 font-serif italic"
                          >
                            {block}
                          </div>
                        );
                      }
                      return (
                        <p
                          key={bIdx}
                          className="text-xs sm:text-[13.5px] md:text-sm text-stone-900 leading-relaxed font-serif"
                        >
                          {block}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer: Centered Page Number */}
              <div className="border-t border-stone-100 pt-2 text-center text-xs text-stone-400 font-serif">
                — {pageData.pageNumber} —
              </div>
            </div>
          )}
        </div>

        {/* Floating Next Button in Right Margin */}
        <button
          onClick={nextPage}
          disabled={currentPage === TOTAL_BOOK_PAGES}
          type="button"
          aria-label="Next Page"
          className="absolute right-3 sm:right-6 md:right-8 z-10 p-3 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-black border border-stone-200/90 shadow-md hover:shadow-lg disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Bottom Control Bar with Page Slider & Jump */}
      <footer className="h-14 bg-white border-t border-stone-200 px-4 sm:px-8 flex items-center justify-between shrink-0 z-20">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          type="button"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>

        {/* Slider */}
        <div className="flex-1 max-w-md mx-4 flex items-center gap-3">
          <span className="text-[11px] font-mono text-stone-400">1</span>
          <input
            type="range"
            min={1}
            max={TOTAL_BOOK_PAGES}
            value={currentPage}
            onChange={(e) => goToPage(parseInt(e.target.value, 10))}
            className="flex-1 h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-black"
          />
          <span className="text-[11px] font-mono text-stone-400">{TOTAL_BOOK_PAGES}</span>
        </div>

        <button
          onClick={nextPage}
          disabled={currentPage === TOTAL_BOOK_PAGES}
          type="button"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </footer>

      {/* Table of Contents Drawer */}
      {tocOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col font-serif">
            <div className="p-4 border-b border-stone-200 flex items-center justify-between">
              <h3 className="font-bold text-base text-black font-serif">Table of Contents</h3>
              <button
                onClick={() => setTocOpen(false)}
                type="button"
                className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-black cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 text-xs">
              <button
                onClick={() => {
                  goToPage(1);
                  setTocOpen(false);
                }}
                className={`w-full text-left p-2 rounded-lg hover:bg-stone-100 transition-colors flex justify-between ${
                  currentPage === 1 ? "bg-stone-100 font-bold" : ""
                }`}
              >
                <span>Cover</span>
                <span className="text-stone-400 font-mono">1</span>
              </button>
              <button
                onClick={() => {
                  goToPage(5);
                  setTocOpen(false);
                }}
                className={`w-full text-left p-2 rounded-lg hover:bg-stone-100 transition-colors flex justify-between ${
                  currentPage === 5 ? "bg-stone-100 font-bold" : ""
                }`}
              >
                <span>Table of Contents</span>
                <span className="text-stone-400 font-mono">5</span>
              </button>
              <button
                onClick={() => {
                  goToPage(7);
                  setTocOpen(false);
                }}
                className={`w-full text-left p-2 rounded-lg hover:bg-stone-100 transition-colors flex justify-between ${
                  currentPage === 7 ? "bg-stone-100 font-bold" : ""
                }`}
              >
                <span>Preface: The Day Everything Changed</span>
                <span className="text-stone-400 font-mono">7</span>
              </button>
              {SELL_PDFS_WITH_AI_BOOK_PAGES.filter((p) => p.type === "chapter-start").map((p) => (
                <button
                  key={p.pageNumber}
                  onClick={() => {
                    goToPage(p.pageNumber);
                    setTocOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-lg hover:bg-stone-100 transition-colors flex justify-between ${
                    currentPage >= p.pageNumber && currentPage < p.pageNumber + 7
                      ? "bg-stone-100 font-bold text-black"
                      : "text-stone-700"
                  }`}
                >
                  <span className="truncate pr-2">{p.chapterTitle}</span>
                  <span className="text-stone-400 font-mono shrink-0">{p.pageNumber}</span>
                </button>
              ))}
              <button
                onClick={() => {
                  goToPage(206);
                  setTocOpen(false);
                }}
                className={`w-full text-left p-2 rounded-lg hover:bg-stone-100 transition-colors flex justify-between ${
                  currentPage >= 206 ? "bg-stone-100 font-bold" : ""
                }`}
              >
                <span>Epilogue: The Sovereign Operator&apos;s Code</span>
                <span className="text-stone-400 font-mono">206</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
