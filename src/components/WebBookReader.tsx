"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download, List, X } from "lucide-react";
import {
  SELL_PDFS_WITH_AI_BOOK_PAGES,
  WebBookPage,
} from "@/lib/book-content/sell-pdfs-with-ai-book";
import { SEVEN_SIDE_HUSTLES_2027_BOOK_PAGES } from "@/lib/book-content/seven-side-hustles-students-2027-book";
import { THREE_BEST_AI_BUSINESSES_2027_BOOK_PAGES } from "@/lib/book-content/three-best-ai-businesses-2027-book";
import { FIVE_SIMPLE_APPS_10K_BOOK_PAGES } from "@/lib/book-content/five-simple-apps-10k-month-book";
import { WIN_IN_YOUR_20S_BOOK_PAGES } from "@/lib/book-content/win-in-your-20s-book";
import { SMARTEST_WAY_AI_GOLD_RUSH_BOOK_PAGES } from "@/lib/book-content/smartest-way-ai-gold-rush-book";
import { STARTED_OVER_ZERO_PLAN_1M_BOOK_PAGES } from "@/lib/book-content/started-over-zero-plan-1m-book";
import { BECOME_MILLIONAIRE_2027_BOOK_PAGES } from "@/lib/book-content/become-millionaire-2027-book";

interface WebBookReaderProps {
  courseSlug: string;
  courseTitle: string;
  pages?: WebBookPage[];
}

// Global registry of digital book manuscripts
const BOOK_REGISTRY: Record<string, WebBookPage[]> = {
  "i-sell-pdfs-with-ai-and-it-changed-my-life-revealing-everything": SELL_PDFS_WITH_AI_BOOK_PAGES,
  "7-side-hustles-students-can-start-in-2027": SEVEN_SIDE_HUSTLES_2027_BOOK_PAGES,
  "ai-businesses-57": SEVEN_SIDE_HUSTLES_2027_BOOK_PAGES,
  "3-best-ai-businesses-to-start-before-2027-and-the-one-id-start-today": THREE_BEST_AI_BUSINESSES_2027_BOOK_PAGES,
  "5-simple-apps-making-10-000-month-that-you-can-build-with-ai": FIVE_SIMPLE_APPS_10K_BOOK_PAGES,
  "if-youre-in-your-20s-heres-how-to-win-at-anything": WIN_IN_YOUR_20S_BOOK_PAGES,
  "the-smartest-way-to-capitalize-on-the-ai-gold-rush": SMARTEST_WAY_AI_GOLD_RUSH_BOOK_PAGES,
  "if-i-started-over-with-0-heres-my-exact-plan-to-get-to-1m": STARTED_OVER_ZERO_PLAN_1M_BOOK_PAGES,
  "ai-businesses-53": STARTED_OVER_ZERO_PLAN_1M_BOOK_PAGES,
  "if-i-wanted-to-become-a-millionaire-in-2026-this-is-what-id-do-full-blueprint": BECOME_MILLIONAIRE_2027_BOOK_PAGES,
  "ai-businesses-54": BECOME_MILLIONAIRE_2027_BOOK_PAGES,
};

// Classic book-style serif font stack explicitly used inside the book
const CLASSIC_BOOK_FONT =
  '"Georgia", "Palatino Linotype", "Book Antiqua", Palatino, "Baskerville", serif';

export default function WebBookReader({ courseSlug, courseTitle, pages }: WebBookReaderProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tocOpen, setTocOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isScrollingFromCodeRef = useRef(false);

  // Determine active book pages and total count
  const bookPages = useMemo(() => {
    return pages || BOOK_REGISTRY[courseSlug] || SELL_PDFS_WITH_AI_BOOK_PAGES;
  }, [pages, courseSlug]);

  const totalPages = bookPages.length;

  // Scroll vertically to a specific page
  const scrollToPage = useCallback(
    (page: number, smooth = true) => {
      const target = Math.max(1, Math.min(page, totalPages));
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
    [courseSlug, totalPages]
  );

  // Load last read page on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(`plugd_started_${courseSlug}`, "true");
        const savedPage = localStorage.getItem(`plugd_book_page_${courseSlug}`);
        if (savedPage) {
          const p = parseInt(savedPage, 10);
          if (!isNaN(p) && p >= 1 && p <= totalPages && p > 1) {
            setTimeout(() => {
              scrollToPage(p, false);
            }, 150);
          }
        }
      } catch (e) {
        console.warn(e);
      }
    }
  }, [courseSlug, scrollToPage, totalPages]);

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

  const handlePrintPdf = () => {
    if (typeof window !== "undefined") {
      setTocOpen(false);
      setTimeout(() => {
        window.print();
      }, 60);
    }
  };

  // Structured Table of Contents entries
  const tocEntries = useMemo(() => {
    return bookPages.filter((p, idx) => {
      if (p.type === "cover") return true;
      if (p.type === "toc" && bookPages.findIndex((bp) => bp.type === "toc") === idx) return true;
      if (p.type === "chapter-start") return true;
      if (
        p.header?.includes("PREFACE") &&
        bookPages.findIndex((bp) => bp.header?.includes("PREFACE")) === idx
      )
        return true;
      if (
        p.partTitle?.includes("EPILOGUE") &&
        bookPages.findIndex((bp) => bp.partTitle?.includes("EPILOGUE")) === idx
      )
        return true;
      return false;
    });
  }, [bookPages]);

  return (
    <div
      className="web-book-reader-root flex flex-col h-screen w-screen bg-[#EBE7E1] text-[#1c1917] select-none overflow-hidden print:h-auto print:w-auto print:overflow-visible print:bg-white print:block"
      style={{ fontFamily: CLASSIC_BOOK_FONT }}
    >
      {/* Global Print / PDF Download Stylesheet */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              @page {
                size: A4 portrait;
                margin: 0;
              }
              html, body, body > div {
                height: auto !important;
                min-height: 0 !important;
                max-height: none !important;
                overflow: visible !important;
                overflow-x: visible !important;
                overflow-y: visible !important;
                background: #ffffff !important;
                margin: 0 !important;
                padding: 0 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              header, nav, button, .web-book-header, .web-book-toc, .print\\:hidden {
                display: none !important;
              }
              .web-book-reader-root,
              .web-book-reader-stage,
              .web-book-reader-track {
                height: auto !important;
                min-height: 0 !important;
                max-height: none !important;
                width: 100% !important;
                overflow: visible !important;
                overflow-x: visible !important;
                overflow-y: visible !important;
                background: #ffffff !important;
                padding: 0 !important;
                margin: 0 !important;
                display: block !important;
                position: static !important;
              }
              .web-book-page {
                page-break-before: auto !important;
                page-break-after: always !important;
                break-after: page !important;
                page-break-inside: avoid !important;
                break-inside: avoid !important;
                width: 100% !important;
                max-width: 100% !important;
                min-height: 96vh !important;
                height: auto !important;
                box-sizing: border-box !important;
                padding: 20mm 20mm 15mm 20mm !important;
                margin: 0 !important;
                border: none !important;
                box-shadow: none !important;
                border-radius: 0 !important;
                background: #ffffff !important;
                display: flex !important;
                flex-direction: column !important;
                justify-content: space-between !important;
                position: relative !important;
              }
              .web-book-page:last-child {
                page-break-after: auto !important;
                break-after: auto !important;
              }
              .web-book-cover {
                min-height: 100vh !important;
                height: 100vh !important;
                max-height: 100vh !important;
                padding: 0 !important;
                margin: 0 !important;
                background: #000000 !important;
                overflow: hidden !important;
                page-break-after: always !important;
                break-after: page !important;
              }
              .web-book-cover img {
                object-fit: cover !important;
                object-position: center !important;
              }
            }
          `,
        }}
      />

      {/* Top Header Bar */}
      <header className="web-book-header relative h-13 bg-white border-b border-stone-200 px-4 sm:px-6 flex items-center justify-between shrink-0 z-30 shadow-2xs font-sans print:hidden">
        {/* Left: Back (shortened and moved left) + Title */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 max-w-[40%] sm:max-w-[45%]">
          <Link
            href={`/${courseSlug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-950 text-xs sm:text-[13px] font-semibold transition-colors shrink-0 font-sans"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
          <span className="hidden sm:inline text-stone-300 shrink-0">|</span>
          <span className="hidden sm:inline text-xs text-stone-700 font-medium truncate font-sans">
            {courseTitle}
          </span>
        </div>

        {/* Center: Page Counter (Exactly in the middle using absolute centering) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center pointer-events-none">
          <span className="text-xs sm:text-[13px] text-stone-600 font-sans">
            Page <strong className="font-semibold text-black">{currentPage}</strong> of{" "}
            {totalPages}
          </span>
        </div>

        {/* Right: Table of Contents & Download PDF (Homepage font-sans) */}
        <div className="flex items-center gap-2 font-sans">
          <button
            onClick={() => setTocOpen(!tocOpen)}
            type="button"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer font-sans"
            title="Table of Contents"
          >
            <List className="h-4 w-4" />
            <span className="hidden xs:inline">Contents</span>
          </button>

          <button
            onClick={handlePrintPdf}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black hover:bg-stone-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer font-sans"
            title="Download / Print PDF"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Download PDF</span>
          </button>
        </div>
      </header>

      {/* Main Reading Stage: Natural Vertical Scroll of Centered A4 Pages */}
      <div className="web-book-reader-stage relative flex-1 w-full overflow-hidden flex justify-center print:h-auto print:w-full print:overflow-visible print:block print:p-0">
        {/* Vertical Scroll Track: Pages Stacked Vertically with Empty Margins on Left/Right */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="web-book-reader-track flex-1 h-full w-full overflow-y-auto overflow-x-hidden flex flex-col items-center py-6 sm:py-10 px-4 sm:px-6 md:px-8 space-y-8 sm:space-y-12 scroll-smooth print:h-auto print:w-full print:overflow-visible print:p-0 print:m-0 print:space-y-0 print:block"
          style={{ scrollbarWidth: "thin" }}
        >
          {bookPages.map((page, idx) => {
            const isCover = page.type === "cover";

            return (
              <div
                key={page.pageNumber}
                ref={(el) => {
                  pageRefs.current[idx] = el;
                }}
                className={`select-text transition-transform duration-200 web-book-page print:m-0 print:shadow-none print:border-none print:rounded-none print:w-full print:max-w-none print:box-border ${
                  isCover
                    ? "web-book-cover w-full max-w-[760px] aspect-[16/9] rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.22)] bg-black border border-stone-300 relative shrink-0 print:aspect-auto print:h-screen print:max-h-screen print:p-0"
                    : "web-book-content-page w-full max-w-[760px] aspect-[210/297] min-h-[960px] sm:min-h-[1040px] bg-white rounded-md border border-stone-300 shadow-[0_4px_30px_rgba(0,0,0,0.10)] p-8 sm:p-12 md:p-16 flex flex-col justify-between shrink-0 print:aspect-auto print:min-h-[96vh] print:h-auto print:p-12 print:justify-between"
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
                    <div className="border-b border-stone-200 pb-2.5 flex items-center justify-between text-[10px] sm:text-[11px] text-stone-500 uppercase tracking-wider">
                      <span className="font-medium pr-4">
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

      {/* Table of Contents Drawer: classic book font for title and all entries */}
      {tocOpen && (
        <div className="web-book-toc print:hidden fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs font-sans">
          <div
            className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
            style={{ fontFamily: CLASSIC_BOOK_FONT }}
          >
            <div className="p-4 border-b border-stone-200 flex items-center justify-between">
              <h3
                className="font-bold text-lg text-black"
                style={{ fontFamily: CLASSIC_BOOK_FONT }}
              >
                Table of Contents
              </h3>
              <button
                onClick={() => setTocOpen(false)}
                type="button"
                className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-black cursor-pointer font-sans"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div
              className="flex-1 overflow-y-auto p-4 space-y-1.5 text-xs sm:text-[13.5px]"
              style={{ fontFamily: CLASSIC_BOOK_FONT }}
            >
              {tocEntries.map((item) => (
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
                      : "hover:bg-stone-100 text-stone-900"
                  }`}
                  style={{ fontFamily: CLASSIC_BOOK_FONT }}
                >
                  <span
                    className="truncate pr-2"
                    style={{ fontFamily: CLASSIC_BOOK_FONT }}
                  >
                    {item.type === "cover"
                      ? "Cover Page"
                      : item.type === "toc"
                      ? "Table of Contents"
                      : item.chapterTitle || `Page ${item.pageNumber}`}
                  </span>
                  <span
                    className="shrink-0 text-xs opacity-70"
                    style={{ fontFamily: CLASSIC_BOOK_FONT }}
                  >
                    p. {item.pageNumber}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
