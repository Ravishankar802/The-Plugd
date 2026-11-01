"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Sparkles, Terminal } from "lucide-react";
import { PlaybookArticle } from "@/lib/playbook-articles";

interface PlaybookArticleReaderProps {
  slug: string;
  title: string;
  thumbnail: string;
  categoryName?: string;
  readingTime?: string;
  article?: PlaybookArticle | null;
}

const SERIF_EDITORIAL_FONT =
  'Charter, "Bitstream Charter", "Sitka Text", Cambria, Georgia, serif';

export default function PlaybookArticleReader({
  slug,
  title,
  thumbnail,
  categoryName = "AI Businesses",
  readingTime = "25 min read",
  article,
}: PlaybookArticleReaderProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const articleContainerRef = useRef<HTMLDivElement>(null);

  // Total tick marks in the vertical progress bar on the right (matches Medium screenshot)
  const TOTAL_TICKS = 16;

  // Track window scroll progress through the article
  const handleScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) {
      setScrollProgress(0);
      return;
    }
    const current = Math.min(1, Math.max(0, window.scrollY / totalHeight));
    setScrollProgress(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Jump to specific scroll progress percentage when clicking a tick
  const scrollToTick = (tickIndex: number) => {
    const targetRatio = tickIndex / (TOTAL_TICKS - 1);
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: targetRatio * totalHeight,
      behavior: "smooth",
    });
  };

  const handleCopyCode = (code: string, id: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(code);
      setCopiedPrompt(id);
      setTimeout(() => setCopiedPrompt(null), 2000);
    }
  };

  // Active tick index based on scroll position
  const activeTickIndex = Math.min(
    TOTAL_TICKS - 1,
    Math.max(0, Math.round(scrollProgress * (TOTAL_TICKS - 1)))
  );

  // Markdown-like link and code parser for paragraphs
  const renderFormattedParagraph = (text: string, pIdx: number) => {
    // Check if the paragraph is a prompt (starts with / or is a full prompt line)
    const isPromptBlock = text.startsWith("/ui-ux-pro-max");

    if (isPromptBlock) {
      return (
        <div
          key={pIdx}
          className="my-7 rounded-xl bg-[#1c1917] border border-stone-800 p-4 sm:p-5 relative group shadow-xs"
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800 text-xs text-stone-400 font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Terminal className="h-3.5 w-3.5" />
              Claude Code Prompt
            </span>
            <button
              onClick={() => handleCopyCode(text, `p-${pIdx}`)}
              className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer text-[11px]"
            >
              {copiedPrompt === `p-${pIdx}` ? "Copied!" : "Copy Prompt"}
            </button>
          </div>
          <pre className="font-mono text-xs sm:text-[13.5px] text-stone-200 whitespace-pre-wrap leading-relaxed select-text">
            {text}
          </pre>
        </div>
      );
    }

    // Numbered list format (e.g. 1. Point of view \n 2. Typography...)
    if (text.includes("\n") && text.match(/^\d\./m)) {
      const items = text.split("\n").filter((l) => l.trim().length > 0);
      return (
        <ol key={pIdx} className="my-6 space-y-2.5 pl-2 sm:pl-4">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="text-[17px] sm:text-[19px] text-[#1c1917] leading-[1.8] flex items-baseline gap-3"
              style={{ fontFamily: SERIF_EDITORIAL_FONT }}
            >
              <span className="font-mono text-xs sm:text-sm font-semibold text-[#78716c] shrink-0">
                0{idx + 1}
              </span>
              <span>{item.replace(/^\d+\.\s*/, "")}</span>
            </li>
          ))}
        </ol>
      );
    }

    // Parse inline markdown links: [text](url)
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      const label = match[1];
      const url = match[2];
      parts.push(
        <a
          key={`${pIdx}-${match.index}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#2563eb] hover:text-[#1d4ed8] underline underline-offset-4 decoration-[#2563eb]/40 hover:decoration-[#2563eb] font-medium transition-colors"
        >
          {label}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return (
      <p
        key={pIdx}
        className="my-6 sm:my-7 text-[17px] sm:text-[19px] text-[#292524] leading-[1.85] tracking-[-0.003em]"
        style={{ fontFamily: SERIF_EDITORIAL_FONT }}
      >
        {parts.length > 0 ? parts : text}
      </p>
    );
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1c1917] selection:bg-[#2563eb] selection:text-white relative font-sans antialiased">
      {/* Sticky Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#e7e5e4] px-4 sm:px-8 lg:px-12 py-3.5 transition-all">
        <div className="w-full flex items-center justify-between">
          <Link
            href={`/${slug}`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#78716c] hover:text-[#1c1917] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Playbook Overview</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e7e5e4] text-[11px] font-mono font-medium text-[#44403c] shadow-2xs">
              <Clock className="h-3 w-3 text-[#78716c]" />
              {readingTime}
            </span>
          </div>
        </div>
      </header>

      {/* Signature Vertical Progress Bar on the Right Edge (Matches Medium Screenshot in Light Mode) */}
      <div
        className="fixed right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-40 select-none hidden sm:flex flex-col items-center justify-center gap-[5px] py-3 px-1.5 cursor-pointer"
        title={`${Math.round(scrollProgress * 100)}% read`}
      >
        {Array.from({ length: TOTAL_TICKS }).map((_, idx) => {
          const isActive = idx === activeTickIndex;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToTick(idx)}
              className="py-0.5 px-1 flex items-center justify-center cursor-pointer transition-all hover:scale-125 focus:outline-hidden"
              aria-label={`Jump to ${Math.round((idx / (TOTAL_TICKS - 1)) * 100)}%`}
            >
              <span
                className={`transition-all duration-150 rounded-xs block ${
                  isActive
                    ? "w-[15px] h-[2.5px] bg-[#1c1917] shadow-xs"
                    : "w-[11px] h-[1.5px] bg-[#d6d3cd] hover:bg-[#a8a29e]"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Main Article Container */}
      <main
        ref={articleContainerRef}
        className="max-w-[720px] mx-auto px-5 sm:px-8 pt-10 pb-28"
      >
        {/* Eyebrow Metadata: Category + Reading Time */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#78716c] mb-4">
          <span className="font-semibold text-[#44403c]">{categoryName}</span>
          <span>•</span>
          <span className="text-[#78716c] font-medium">{readingTime}</span>
        </div>

        {/* Article Title */}
        <h1
          className="text-3xl sm:text-4xl md:text-[44px] font-bold text-[#1c1917] tracking-[-0.015em] leading-[1.18] mb-6"
          style={{ fontFamily: SERIF_EDITORIAL_FONT }}
        >
          {title}
        </h1>

        {/* Author / Publication Meta */}
        <div className="flex items-center justify-between py-4 border-y border-[#e7e5e4] mb-8 text-xs text-[#78716c] font-sans">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1c1917] text-white flex items-center justify-center font-bold text-xs uppercase shadow-2xs">
              PL
            </div>
            <div>
              <div className="font-semibold text-[#1c1917]">
                {article?.authorName || "Plugd Systems Architect"}
              </div>
              <div className="text-[11px] text-[#78716c] font-mono">
                Official Playbook Guide
              </div>
            </div>
          </div>
          <div className="text-[#78716c] font-mono text-[11px]">
            {readingTime}
          </div>
        </div>

        {/* Playbook Thumbnail (At the very top of all content as required) */}
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-12 border border-[#e7e5e4] shadow-[0_4px_24px_rgba(28,25,23,0.06)] bg-[#eeebe5]">
          <Image
            src={thumbnail}
            alt={title}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>

        {/* If article content is available, render article content */}
        {article ? (
          <article className="article-body">
            {/* Intro Paragraphs */}
            <div className="article-intro mb-10 pb-8 border-b border-[#e7e5e4]">
              {article.introParagraphs.map((para, idx) =>
                renderFormattedParagraph(para, idx)
              )}
            </div>

            {/* Chapters */}
            {article.chapters.map((chapter) => (
              <section key={chapter.id} className="article-chapter my-12 pt-6">
                <div className="mb-6">
                  <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#78716c] block mb-1.5">
                    Chapter {chapter.number}
                  </span>
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-[#1c1917] tracking-tight leading-snug"
                    style={{ fontFamily: SERIF_EDITORIAL_FONT }}
                  >
                    {chapter.title}
                  </h2>
                </div>

                <div className="chapter-content">
                  {chapter.paragraphs.map((para, pIdx) =>
                    renderFormattedParagraph(para, pIdx + chapter.number * 100)
                  )}
                </div>
              </section>
            ))}

            {/* End of Playbook Card */}
            <div className="mt-16 pt-8 border-t border-[#e7e5e4] text-center">
              <div className="inline-block p-3 rounded-full bg-white border border-[#e7e5e4] mb-4 shadow-2xs">
                <Sparkles className="h-5 w-5 text-[#1c1917]" />
              </div>
              <h3
                className="text-xl font-bold text-[#1c1917] mb-2"
                style={{ fontFamily: SERIF_EDITORIAL_FONT }}
              >
                You've completed this Playbook
              </h3>
              <p className="text-xs sm:text-sm text-[#78716c] mb-6 max-w-md mx-auto">
                Ready to take action? Return to the overview or review the requirements to get started.
              </p>
              <Link
                href={`/${slug}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#1c1917] hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer shadow-xs"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Return to Playbook Overview</span>
              </Link>
            </div>
          </article>
        ) : (
          /* Placeholder for playbooks where article content is in preparation */
          <div className="py-12 text-center bg-white rounded-2xl border border-[#e7e5e4] p-8 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-[#FBF9F5] border border-[#e7e5e4] flex items-center justify-center mx-auto mb-5 text-[#1c1917]">
              <Clock className="h-6 w-6 text-[#78716c]" />
            </div>

            <span className="inline-block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#78716c] bg-[#FBF9F5] border border-[#e7e5e4] px-3 py-1 rounded-full mb-3">
              Article Content in Preparation
            </span>

            <h2
              className="text-xl sm:text-2xl font-bold text-[#1c1917] mb-3"
              style={{ fontFamily: SERIF_EDITORIAL_FONT }}
            >
              {title}
            </h2>

            <p className="text-sm text-[#78716c] mb-8 max-w-md mx-auto leading-relaxed">
              The complete article for this playbook is currently being formatted and will be published shortly.
            </p>

            <Link
              href={`/${slug}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1c1917] hover:bg-stone-800 text-white font-medium text-xs sm:text-sm transition-colors shadow-xs"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Playbook Overview</span>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
