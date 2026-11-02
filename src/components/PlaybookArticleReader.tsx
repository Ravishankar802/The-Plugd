"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Sparkles, Terminal } from "lucide-react";
import { PlaybookArticle } from "@/lib/playbook-articles";
import { getAuthorProfile, getAvatarBgColor } from "@/lib/book-utils";

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
  categoryName = "AI",
  readingTime = "25 min read",
  article,
}: PlaybookArticleReaderProps) {
  const authorName = article?.authorName || getAuthorProfile(categoryName, slug).name;
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

  // Inline markdown parser: **bold**, *italic*, `code`, [link](url)
  const renderInlineText = (text: string, keyPrefix: string): React.ReactNode => {
    const tokenRegex = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    const parts: React.ReactNode[] = [];

    while ((match = tokenRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      if (match[2] && match[3]) {
        // Link [label](url)
        parts.push(
          <a
            key={`${keyPrefix}-link-${match.index}`}
            href={match[3]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2563eb] hover:text-[#1d4ed8] underline underline-offset-4 decoration-[#2563eb]/40 hover:decoration-[#2563eb] font-medium transition-colors"
          >
            {match[2]}
          </a>
        );
      } else if (match[4]) {
        // Bold **text**
        parts.push(
          <strong key={`${keyPrefix}-b-${match.index}`} className="font-bold text-[#1c1917]">
            {match[4]}
          </strong>
        );
      } else if (match[5]) {
        // Italic *text*
        parts.push(
          <em key={`${keyPrefix}-i-${match.index}`} className="italic">
            {match[5]}
          </em>
        );
      } else if (match[6]) {
        // Code `text`
        parts.push(
          <code
            key={`${keyPrefix}-c-${match.index}`}
            className="px-1.5 py-0.5 rounded bg-stone-200/70 font-mono text-xs sm:text-sm text-[#1c1917]"
          >
            {match[6]}
          </code>
        );
      }
      lastIndex = tokenRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  type ContentBlock =
    | { type: "prompt"; content: string }
    | { type: "heading"; content: string }
    | { type: "formula"; content: string }
    | { type: "table"; rows: string[][] }
    | { type: "bullet"; items: { text: string }[] }
    | { type: "check"; items: { checked: boolean; text: string }[] }
    | { type: "numbered"; items: { number?: string; text: string }[] }
    | { type: "paragraph"; content: string };

  const parseBlocks = (rawText: string): ContentBlock[] => {
    const text = rawText.replace(/\r\n/g, "\n").trim();
    if (!text) return [];

    // Full prompt blocks
    if (
      text.startsWith("/ui-ux-pro-max") ||
      text.startsWith("Based on the competitor breakdown")
    ) {
      return [{ type: "prompt", content: text }];
    }

    const rawLines = text.split("\n");
    const blocks: ContentBlock[] = [];
    let currentParagraphLines: string[] = [];
    let currentListItems: any[] = [];
    let currentListType: "bullet" | "check" | "numbered" | null = null;
    let currentTableLines: string[][] = [];

    const flushParagraph = () => {
      if (currentParagraphLines.length > 0) {
        const pText = currentParagraphLines.join(" ").trim();
        if (pText) {
          blocks.push({ type: "paragraph", content: pText });
        }
        currentParagraphLines = [];
      }
    };

    const flushList = () => {
      if (currentListItems.length > 0 && currentListType) {
        if (currentListType === "bullet") {
          blocks.push({ type: "bullet", items: [...currentListItems] });
        } else if (currentListType === "check") {
          blocks.push({ type: "check", items: [...currentListItems] });
        } else if (currentListType === "numbered") {
          blocks.push({ type: "numbered", items: [...currentListItems] });
        }
        currentListItems = [];
        currentListType = null;
      }
    };

    const flushTable = () => {
      if (currentTableLines.length > 0) {
        blocks.push({ type: "table", rows: [...currentTableLines] });
        currentTableLines = [];
      }
    };

    const flushAll = () => {
      flushParagraph();
      flushList();
      flushTable();
    };

    for (let i = 0; i < rawLines.length; i++) {
      const line = rawLines[i].trim();
      if (!line) {
        flushAll();
        continue;
      }

      // Check if line is a table row (has tab or markdown |...|)
      if (line.includes("\t") || (line.startsWith("|") && line.endsWith("|"))) {
        flushParagraph();
        flushList();
        if (line.includes("\t")) {
          currentTableLines.push(line.split("\t").map((c) => c.trim()));
        } else {
          if (!line.match(/^\|[\s\-:|]+\|$/)) {
            currentTableLines.push(line.split("|").slice(1, -1).map((c) => c.trim()));
          }
        }
        continue;
      } else if (currentTableLines.length > 0) {
        flushTable();
      }

      // Check if line is a prompt template start
      if (line.startsWith("### Prompt:") || line.startsWith("Prompt:")) {
        flushAll();
        const promptLines = [line.replace(/^###\s*/, "")];
        i++;
        while (i < rawLines.length) {
          promptLines.push(rawLines[i]);
          i++;
        }
        blocks.push({ type: "prompt", content: promptLines.join("\n") });
        break;
      }

      // Check if line is heading with ###
      if (line.startsWith("### ")) {
        flushAll();
        blocks.push({ type: "heading", content: line.replace(/^###\s*/, "") });
        continue;
      }

      // Section or takeaway heading pattern like "8.2 Know...", "Week 1: ...", "Phase 1: ...", "Step 1: ...", "Chapter Takeaway"
      const isHeadingPattern =
        line.match(/^\d+\.\d+\s+[A-Za-z]/) ||
        line.match(/^(Week|Phase|Step|Rule|Stage)\s+\d+[:\s]/i) ||
        line.match(/^Chapter Takeaway$/i);

      if (isHeadingPattern) {
        flushAll();
        blocks.push({ type: "heading", content: line });
        continue;
      }

      // Check if line is checklist item: - [ ] or - [x]
      const checkMatch = line.match(/^-\s*\[([ xX])\]\s*(.*)/);
      if (checkMatch) {
        flushParagraph();
        flushTable();
        if (currentListType && currentListType !== "check") flushList();
        currentListType = "check";
        currentListItems.push({
          checked: checkMatch[1].toLowerCase() === "x",
          text: checkMatch[2],
        });
        continue;
      }

      // Check if line is bullet list: - or *
      const bulletMatch = line.match(/^[-*]\s+(.*)/);
      if (bulletMatch) {
        flushParagraph();
        flushTable();
        if (currentListType && currentListType !== "bullet") flushList();
        currentListType = "bullet";
        currentListItems.push({ text: bulletMatch[1] });
        continue;
      }

      // Check if line is numbered list item: 1. or 2.
      const numberedMatch = line.match(/^(\d+)\.\s+(.*)/);
      if (numberedMatch) {
        flushParagraph();
        flushTable();
        if (currentListType && currentListType !== "numbered") flushList();
        currentListType = "numbered";
        currentListItems.push({ number: numberedMatch[1], text: numberedMatch[2] });
        continue;
      }

      // Check if line is a mathematical formula
      const isFormula =
        line.startsWith("\\[") ||
        line.endsWith("\\]") ||
        line.includes("\\frac") ||
        (line.includes(" = ") &&
          (line.includes("÷") || line.includes("×") || line.includes("−") || line.includes("+") || line.includes("%")) &&
          !line.endsWith("."));

      if (isFormula) {
        flushAll();
        blocks.push({
          type: "formula",
          content: line.replace(/\\\[|\\\]/g, "").trim(),
        });
        continue;
      }

      if (currentListType) flushList();
      if (currentTableLines.length > 0) flushTable();

      currentParagraphLines.push(line);
    }

    flushAll();
    return blocks;
  };

  const renderBlock = (block: ContentBlock, blockKey: string) => {
    switch (block.type) {
      case "prompt":
        return (
          <div
            key={blockKey}
            className="my-7 rounded-xl bg-[#1c1917] border border-stone-800 p-4 sm:p-5 relative group shadow-xs"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800 text-xs text-stone-400 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Terminal className="h-3.5 w-3.5" />
                Prompt Template
              </span>
              <button
                onClick={() => handleCopyCode(block.content, blockKey)}
                className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer text-[11px]"
              >
                {copiedPrompt === blockKey ? "Copied!" : "Copy Prompt"}
              </button>
            </div>
            <pre className="font-mono text-xs sm:text-[13.5px] text-stone-200 whitespace-pre-wrap leading-relaxed select-text">
              {block.content}
            </pre>
          </div>
        );

      case "heading":
        return (
          <h3
            key={blockKey}
            className="text-xl sm:text-2xl font-bold text-[#1c1917] mt-10 mb-3 pt-2 tracking-tight"
            style={{ fontFamily: SERIF_EDITORIAL_FONT }}
          >
            {renderInlineText(block.content, blockKey)}
          </h3>
        );

      case "formula":
        return (
          <div
            key={blockKey}
            className="my-6 p-4 sm:p-5 rounded-xl bg-[#FAF8F5] border border-stone-300/80 font-mono text-sm sm:text-base text-stone-900 flex items-center justify-center text-center overflow-x-auto shadow-2xs font-semibold"
          >
            {renderInlineText(block.content, blockKey)}
          </div>
        );

      case "table":
        return (
          <div
            key={blockKey}
            className="my-7 overflow-x-auto rounded-lg border border-[#e7e5e4] bg-white shadow-2xs"
          >
            <table className="w-full text-left text-sm sm:text-base border-collapse">
              {block.rows.length > 0 && (
                <thead>
                  <tr className="bg-stone-100/90 border-b border-[#e7e5e4] text-[#1c1917] font-semibold text-xs sm:text-sm uppercase tracking-wider">
                    {block.rows[0].map((cell, cIdx) => (
                      <th key={cIdx} className="px-4 py-3 font-semibold text-[#1c1917]">
                        {renderInlineText(cell, `${blockKey}-th-${cIdx}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody className="divide-y divide-[#e7e5e4]">
                {block.rows.slice(1).map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className={rIdx % 2 === 0 ? "bg-white" : "bg-stone-50/50"}
                  >
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className="px-4 py-3 text-stone-800 text-[15px] sm:text-[16px] leading-relaxed"
                      >
                        {renderInlineText(cell, `${blockKey}-td-${rIdx}-${cIdx}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "bullet":
        return (
          <ul key={blockKey} className="my-6 space-y-2.5 pl-2 sm:pl-4">
            {block.items.map((item, idx) => (
              <li
                key={idx}
                className="text-[17px] sm:text-[19px] text-[#1c1917] leading-[1.8] flex items-baseline gap-3"
                style={{ fontFamily: SERIF_EDITORIAL_FONT }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#1c1917] mt-3 shrink-0" />
                <span>{renderInlineText(item.text, `${blockKey}-li-${idx}`)}</span>
              </li>
            ))}
          </ul>
        );

      case "check":
        return (
          <ul key={blockKey} className="my-6 space-y-2.5 pl-2 sm:pl-4">
            {block.items.map((item, idx) => (
              <li
                key={idx}
                className="text-[17px] sm:text-[19px] text-[#1c1917] leading-[1.8] flex items-start gap-3"
                style={{ fontFamily: SERIF_EDITORIAL_FONT }}
              >
                <span
                  className={`inline-flex items-center justify-center w-5 h-5 rounded border ${
                    item.checked
                      ? "bg-emerald-600 border-emerald-600 text-white font-bold"
                      : "border-stone-400 bg-white"
                  } text-xs mt-1 shrink-0`}
                >
                  {item.checked ? "✓" : ""}
                </span>
                <span>{renderInlineText(item.text, `${blockKey}-chk-${idx}`)}</span>
              </li>
            ))}
          </ul>
        );

      case "numbered":
        return (
          <ol key={blockKey} className="my-6 space-y-2.5 pl-2 sm:pl-4">
            {block.items.map((item, idx) => (
              <li
                key={idx}
                className="text-[17px] sm:text-[19px] text-[#1c1917] leading-[1.8] flex items-baseline gap-3"
                style={{ fontFamily: SERIF_EDITORIAL_FONT }}
              >
                <span className="font-mono text-xs sm:text-sm font-semibold text-[#78716c] shrink-0">
                  {item.number
                    ? parseInt(item.number) < 10
                      ? `0${item.number}`
                      : item.number
                    : `0${idx + 1}`}
                </span>
                <span>{renderInlineText(item.text, `${blockKey}-num-${idx}`)}</span>
              </li>
            ))}
          </ol>
        );

      case "paragraph":
      default:
        return (
          <p
            key={blockKey}
            className="my-6 sm:my-7 text-[17px] sm:text-[19px] text-[#292524] leading-[1.85] tracking-[-0.003em]"
            style={{ fontFamily: SERIF_EDITORIAL_FONT }}
          >
            {renderInlineText(block.content, blockKey)}
          </p>
        );
    }
  };

  const renderFormattedParagraph = (text: string, pIdx: number) => {
    const blocks = parseBlocks(text);
    if (blocks.length === 0) return null;
    return (
      <React.Fragment key={pIdx}>
        {blocks.map((block, bIdx) => renderBlock(block, `p-${pIdx}-${bIdx}`))}
      </React.Fragment>
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
            <div
              className="w-9 h-9 rounded-full text-white flex items-center justify-center font-bold text-xs uppercase shadow-2xs"
              style={{ backgroundColor: getAvatarBgColor(authorName) }}
            >
              {authorName.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-[#1c1917]">
                {authorName}
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
