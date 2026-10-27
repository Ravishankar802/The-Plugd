"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  List,
  X,
} from "lucide-react";
import {
  SELL_PDFS_WITH_AI_BOOK_PAGES,
  TOTAL_BOOK_PAGES,
} from "@/lib/book-content/sell-pdfs-with-ai-book";

interface WebBookReaderProps {
  courseSlug: string;
  courseTitle: string;
}

// Classic book-style serif font stack explicitly requested by user
const CLASSIC_BOOK_FONT =
  '"Georgia", "Palatino Linotype", "Book Antiqua", Palatino, "Baskerville", serif';

export default function WebBookReader({ courseSlug, courseTitle }: WebBookReaderProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tocOpen, setTocOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isScrollingFromCodeRef = useRef(false);

  // Scroll vertically to a specific page
  const scrollToPage = useCallback(
    (page: number, smooth = true) => {
      const target = Math.max(1, Math.min(page, TOTAL_BOOK_PAGES));
      const targetEl = pageRefs.current[target - 1];
      if (targetEl && scrollContainerRef.current) {
        isScrollingFromCodeRef.current = true;
        targetEl.scrollIntoView({
          behavior: smooth ? "smooth" : "auto",
          block: "start",
        });
        setCurrentPage(target);
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(`plugd_book_page_${courseSlug}`, target.toString());
          } catch {}
        }
        setTimeout(() => {
          isScrollingFromCodeRef.current = false;
        }, 500);
      }
    },
    [courseSlug]
  );

  // Load last read page on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(`plugd_started_${courseSlug}`, "true");
        const savedPage = localStorage.getItem(`plugd_book_page_${courseSlug}`);
        if (savedPage) {
          const p = parseInt(savedPage, 10);
          if (!isNaN(p) && p >= 1 && p <= TOTAL_BOOK_PAGES && p > 1) {
            setTimeout(() => {
              scrollToPage(p, false);
            }, 150);
          }
        }
      } catch (e) {
        console.warn(e);
      }
    }
  }, [courseSlug, scrollToPage]);

  // Track active page on natural vertical scroll
  const handleScroll = useCallback(() => {
    if (isScrollingFromCodeRef.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const probeY = scrollTop + containerHeight * 0.35;

    let closestPage = 1;
    let minDistance = Infinity;

    pageRefs.current.forEach((el, idx) => {
      if (!el) return;
      const elTop = el.offsetTop;
      const dist = Math.abs(elTop - probeY);
      if (dist < minDistance) {
        minDistance = dist;
        closestPage = idx + 1;
      }
    });

    if (closestPage !== currentPage) {
      setCurrentPage(closestPage);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(`plugd_book_page_${courseSlug}`, closestPage.toString());
        } catch {}
      }
    }
  }, [currentPage, courseSlug]);

  // Keyboard navigation (Arrow keys, PageUp/Down)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (tocOpen) return;
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToPage(currentPage - 1);
      } else if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        scrollToPage(currentPage + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, scrollToPage, tocOpen]);

  const prevPage = useCallback(() => {
    scrollToPage(currentPage - 1);
  }, [currentPage, scrollToPage]);

  const nextPage = useCallback(() => {
    scrollToPage(currentPage + 1);
  }, [currentPage, scrollToPage]);

  const handlePrintPdf = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div
      className="flex flex-col h-screen w-screen bg-[#EBE7E1] text-[#1c1917] select-none overflow-hidden"
      style={{ fontFamily: CLASSIC_BOOK_FONT }}
    >
      {/* Top Header Bar */}
      <header className="h-13 bg-white border-b border-stone-200 px-4 sm:px-6 flex items-center justify-between shrink-0 z-30 shadow-2xs font-sans">
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
          <span
            className="hidden md:inline text-xs text-stone-700 font-medium truncate max-w-sm"
            style={{ fontFamily: CLASSIC_BOOK_FONT }}
          >
            {courseTitle}
          </span>
        </div>

        {/* Center: Page Counter */}
        <div
          className="flex items-center gap-2 text-xs text-stone-700"
          style={{ fontFamily: CLASSIC_BOOK_FONT }}
        >
          <span>
            Page <strong className="font-semibold text-black">{currentPage}</strong> of{" "}
            {TOTAL_BOOK_PAGES}
          </span>
        </div>

        {/* Right: Table of Contents & Download PDF */}
        <div className="flex items-center gap-2 font-sans">
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

      {/* Main Reading Stage: Natural Vertical Scroll of Centered A4 Pages */}
      <div className="relative flex-1 w-full overflow-hidden flex justify-center">
        {/* Floating Quick Navigation Buttons on Right Side */}
        <div className="fixed right-4 sm:right-8 bottom-20 z-30 flex flex-col gap-2 font-sans">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            type="button"
            aria-label="Previous Page"
            className="p-3 rounded-full bg-white/95 hover:bg-white text-stone-800 hover:text-black border border-stone-300/80 shadow-lg disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
            title="Previous Page"
          >
            <ChevronUp className="h-5 w-5" />
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === TOTAL_BOOK_PAGES}
            type="button"
            aria-label="Next Page"
            className="p-3 rounded-full bg-white/95 hover:bg-white text-stone-800 hover:text-black border border-stone-300/80 shadow-lg disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
            title="Next Page"
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>

        {/* Vertical Scroll Track: Pages Stacked Vertically with Empty Margins on Left/Right */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 h-full w-full overflow-y-auto overflow-x-hidden flex flex-col items-center py-6 sm:py-10 px-4 sm:px-6 md:px-8 space-y-8 sm:space-y-12 scroll-smooth"
          style={{ scrollbarWidth: "thin" }}
        >
          {SELL_PDFS_WITH_AI_BOOK_PAGES.map((page, idx) => {
            const isCover = page.type === "cover";

            return (
              <div
                key={page.pageNumber}
                ref={(el) => {
                  pageRefs.current[idx] = el;
                }}
                className={`select-text transition-transform duration-200 ${
                  isCover
                    ? "w-full max-w-[760px] aspect-[16/9] rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.22)] bg-black border border-stone-300 relative shrink-0"
                    : "w-full max-w-[760px] aspect-[210/297] min-h-[960px] sm:min-h-[1040px] bg-white rounded-md border border-stone-300 shadow-[0_4px_30px_rgba(0,0,0,0.10)] p-8 sm:p-12 md:p-16 flex flex-col justify-between shrink-0"
                }`}
                style={{ fontFamily: CLASSIC_BOOK_FONT }}
              >
                {isCover ? (
                  /* Cover Page: Thumbnail size as it is */
                  <div className="relative w-full h-full">
                    {page.imageUrl && (
                      <Image
                        src={page.imageUrl}
                        alt={courseTitle}
                        fill
                        priority={idx === 0}
                        className="object-cover object-center"
                      />
                    )}
                  </div>
                ) : (
                  /* A4 Pages: Flowing paragraphs one below the other */
                  <div className="w-full h-full flex flex-col justify-between text-black leading-relaxed">
                    {/* Header / Running Head */}
                    <div className="border-b border-stone-200 pb-2.5 flex items-center justify-between text-[10px] sm:text-[11px] text-stone-500 uppercase tracking-widest">
                      <span className="truncate max-w-[75%] font-medium">
                        {page.header || page.partTitle || courseTitle}
                      </span>
                      <span className="shrink-0 font-medium">{page.pageNumber}</span>
                    </div>

                    {/* Page Body: Real paragraphs one below the other */}
                    <div className="flex-1 py-5 sm:py-6 flex flex-col justify-start space-y-4 sm:space-y-4.5">
                      {page.type === "title" && (
                        <div className="text-center space-y-5 my-auto py-12">
                          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-black leading-tight">
                            {page.content[0]}
                          </h1>
                          <p className="text-base sm:text-xl italic text-stone-700">
                            {page.content[1]}
                          </p>
                          <div className="w-20 h-0.5 bg-black mx-auto my-8" />
                          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                            {page.content[2]}
                          </p>
                          <p className="text-xs font-bold text-black uppercase tracking-wider pt-10">
                            {page.content[3]}
                          </p>
                          <p className="text-[11px] text-stone-500">{page.content[4]}</p>
                        </div>
                      )}

                      {page.type === "half-title" && (
                        <div className="text-center space-y-4 my-auto py-24">
                          <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-black leading-snug">
                            {page.content[0]}
                          </h2>
                          <p className="text-xs sm:text-base italic text-stone-600">
                            {page.content[1]}
                          </p>
                        </div>
                      )}

                      {page.type === "copyright" && (
                        <div className="max-w-lg mx-auto text-xs sm:text-[13px] text-stone-800 leading-relaxed space-y-4 my-auto py-10">
                          {page.content.map((p, pIdx) => (
                            <p key={pIdx}>{p}</p>
                          ))}
                        </div>
                      )}

                      {page.type === "toc" && (
                        <div className="space-y-3 py-4 w-full my-auto">
                          <h2 className="text-base sm:text-lg font-bold text-black border-b border-black pb-1.5 mb-4 uppercase tracking-wider text-center">
                            {page.content[0]}
                          </h2>
                          <div className="space-y-2 text-xs sm:text-[13.5px] text-stone-900 leading-normal">
                            {page.content.slice(1).map((item, iIdx) => {
                              const isPart = item.startsWith("PART ");
                              return (
                                <div
                                  key={iIdx}
                                  className={`flex justify-between items-baseline ${
                                    isPart ? "font-bold text-black pt-2.5" : "text-stone-800 pl-3"
                                  }`}
                                >
                                  <span className="truncate pr-2">{item}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {page.type === "chapter-start" && (
                        <div className="space-y-4 py-2">
                          <span className="text-xs font-bold text-stone-500 uppercase tracking-widest block">
                            {page.partTitle}
                          </span>
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black leading-snug">
                            {page.chapterTitle}
                          </h2>
                          <div className="w-16 h-0.5 bg-black my-2.5" />
                          <div className="space-y-3.5 pt-2">
                            {page.content.map((para, paraIdx) => (
                              <p
                                key={paraIdx}
                                className="text-[14px] sm:text-[15px] text-stone-950 leading-[1.8] text-justify"
                              >
                                {para}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {page.type === "content" && (
                        <div className="space-y-4 py-2">
                          {page.chapterTitle && (
                            <h3 className="text-base sm:text-lg font-bold text-black pb-1.5 border-b border-stone-200">
                              {page.chapterTitle}
                            </h3>
                          )}
                          <div className="space-y-3.5 pt-1">
                            {page.content.map((para, paraIdx) => (
                              <p
                                key={paraIdx}
                                className="text-[14px] sm:text-[15px] text-stone-950 leading-[1.8] text-justify"
                              >
                                {para}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer: Centered Page Number */}
                    <div className="border-t border-stone-100 pt-3 text-center text-xs text-stone-400">
                      — {page.pageNumber} —
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Control Bar with Page Slider & Jump */}
      <footer className="h-14 bg-white border-t border-stone-200 px-4 sm:px-8 flex items-center justify-between shrink-0 z-30 font-sans">
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
            onChange={(e) => scrollToPage(parseInt(e.target.value, 10))}
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
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs font-sans">
          <div
            className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
            style={{ fontFamily: CLASSIC_BOOK_FONT }}
          >
            <div className="p-4 border-b border-stone-200 flex items-center justify-between">
              <h3 className="font-bold text-base text-black">Table of Contents</h3>
              <button
                onClick={() => setTocOpen(false)}
                type="button"
                className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-black cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 text-xs sm:text-sm">
              {SELL_PDFS_WITH_AI_BOOK_PAGES.filter(
                (p) =>
                  p.type === "cover" ||
                  p.type === "toc" ||
                  p.type === "chapter-start" ||
                  (p.chapterTitle && (p.pageNumber === 7 || p.pageNumber === 206))
              ).map((item) => (
                <button
                  key={item.pageNumber}
                  type="button"
                  onClick={() => {
                    scrollToPage(item.pageNumber);
                    setTocOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                    currentPage === item.pageNumber
                      ? "bg-black text-white font-semibold"
                      : "hover:bg-stone-100 text-stone-800"
                  }`}
                >
                  <span className="truncate pr-2">
                    {item.type === "cover"
                      ? "Cover Page"
                      : item.type === "toc"
                      ? "Table of Contents"
                      : item.chapterTitle || `Page ${item.pageNumber}`}
                  </span>
                  <span className="shrink-0 text-xs opacity-60">p. {item.pageNumber}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
