"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Check,
  LogOut,
  Type,
  Sun,
  Moon,
  BookMarked,
  Sliders,
} from "lucide-react";
import { performLogout } from "@/lib/auth-client";
import { Lesson, Module, Course, getPlaybookOverviewUrl } from "@/lib/playbooks-data";
import { ExtendedLesson } from "@/lib/module-01-content";
import { getPlaybookPageCount, getChapterPageRange } from "@/lib/book-utils";

interface WrittenLessonViewerProps {
  course: Course;
  module: Module;
  lesson: ExtendedLesson | Lesson;
  nextLesson?: { lesson: Lesson; module: Module } | null;
  previousLesson?: { lesson: Lesson; module: Module } | null;
  onSwitchToPresentation?: () => void;
}

export default function WrittenLessonViewer({
  course,
  module,
  lesson,
  nextLesson,
  previousLesson,
}: WrittenLessonViewerProps) {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTocDropdownOpen, setIsTocDropdownOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [fontFamily, setFontFamily] = useState<"serif" | "sans">("sans");
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xl">("normal");
  const [readerTheme, setReaderTheme] = useState<"paper" | "white" | "dark">("paper");

  const tocDropdownRef = useRef<HTMLDivElement>(null);
  const settingsDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click or Escape
  useEffect(() => {
    if (!isTocDropdownOpen && !isSettingsOpen) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (tocDropdownRef.current && !tocDropdownRef.current.contains(target)) {
        setIsTocDropdownOpen(false);
      }
      if (settingsDropdownRef.current && !settingsDropdownRef.current.contains(target)) {
        setIsSettingsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsTocDropdownOpen(false);
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown, true);
    document.addEventListener("touchstart", handlePointerDown, true);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown, true);
      document.removeEventListener("touchstart", handlePointerDown, true);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTocDropdownOpen, isSettingsOpen]);

  const totalPages = useMemo(
    () => getPlaybookPageCount(course.price, course.slug),
    [course.price, course.slug]
  );

  // Flattened chapters across all modules
  const allChapters = useMemo(() => {
    const list: {
      lesson: Lesson;
      module: Module;
      index: number;
      partIndex: number;
    }[] = [];

    let count = 0;
    course.modules?.forEach((m, mIdx) => {
      m.lessons?.forEach((l) => {
        list.push({
          lesson: l,
          module: m,
          index: count++,
          partIndex: mIdx + 1,
        });
      });
    });

    return list;
  }, [course.modules]);

  const currentChapterInfo = useMemo(() => {
    const found = allChapters.find((c) => c.lesson.id === lesson.id);
    const index = found ? found.index : 0;
    const pageRange = getChapterPageRange(index, allChapters.length, totalPages);
    return {
      index,
      partIndex: found ? found.partIndex : 1,
      pageRange,
    };
  }, [allChapters, lesson.id, totalPages]);

  const extendedLesson = lesson as ExtendedLesson;
  const writtenContent =
    extendedLesson.writtenLesson ||
    (lesson as any).writtenContent ||
    lesson.summary;
  const learningObjective =
    extendedLesson.learningObjective ||
    (lesson as any).learningObjective;
  const coreTakeaway =
    extendedLesson.takeaway ||
    (lesson as any).takeaway ||
    (lesson.slides?.[0] as any)?.takeaway;

  const handleNext = () => {
    if (nextLesson) {
      router.push(`/learn/${course.slug}/${nextLesson.lesson.id}`);
    }
  };

  const handlePrevious = () => {
    if (previousLesson) {
      router.push(`/learn/${course.slug}/${previousLesson.lesson.id}`);
    }
  };

  const themeClasses = {
    paper: "bg-[#FAF8F5] text-[#1c1917]",
    white: "bg-white text-[#1c1917]",
    dark: "bg-[#18181b] text-[#f4f4f5]",
  }[readerTheme];

  const cardThemeClasses = {
    paper: "bg-white border-[#E6E1D7] text-[#1c1917]",
    white: "bg-stone-50 border-stone-200 text-[#1c1917]",
    dark: "bg-[#27272a] border-stone-700 text-[#f4f4f5]",
  }[readerTheme];

  const fontClasses = fontFamily === "serif" ? "font-serif" : "font-sans";

  const fontSizeClasses = {
    normal: "text-[15px] sm:text-base leading-[1.8]",
    large: "text-base sm:text-lg leading-[1.85]",
    xl: "text-lg sm:text-xl leading-[1.9]",
  }[fontSize];

  return (
    <div className={`min-h-screen ${themeClasses} transition-colors duration-200 antialiased`}>
      {/* Top Sticky Book Reader Header */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md ${
        readerTheme === "dark"
          ? "bg-[#18181b]/95 border-stone-800"
          : "bg-[#FAF8F5]/95 border-[#E6E1D7]"
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          
          {/* Back to Book Overview */}
          <Link
            href={`/${course.slug}`}
            className="flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors shrink-0"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Book</span>
          </Link>

          {/* Book Title & Chapter Selector */}
          <div className="relative flex-1 max-w-md text-center" ref={tocDropdownRef}>
            <button
              type="button"
              onClick={() => setIsTocDropdownOpen(!isTocDropdownOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-black/5 text-xs font-semibold max-w-full truncate cursor-pointer transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5 shrink-0 text-stone-500" />
              <span className="truncate">
                Ch. {currentChapterInfo.index + 1}: {lesson.title}
              </span>
              <ChevronDown className="h-3 w-3 shrink-0 text-stone-400" />
            </button>

            {/* Table of Contents Dropdown */}
            {isTocDropdownOpen && (
              <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 sm:w-96 max-h-[70vh] overflow-y-auto rounded-xl border shadow-xl p-2 z-50 text-left ${
                readerTheme === "dark" ? "bg-[#27272a] border-stone-700" : "bg-white border-stone-200"
              }`}>
                <div className="px-3 py-2 border-b border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-500">
                  <span>Table of Contents</span>
                  <span>{totalPages} Pages</span>
                </div>

                <div className="py-1 divide-y divide-stone-100/60">
                  {course.modules.map((m, mIdx) => (
                    <div key={m.id} className="py-1.5">
                      <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-stone-400 block pb-1">
                        Part {mIdx + 1}: {m.title}
                      </span>
                      {m.lessons.map((l) => {
                        const chIdx = allChapters.findIndex((c) => c.lesson.id === l.id);
                        const range = getChapterPageRange(chIdx, allChapters.length, totalPages);
                        const isCurrent = l.id === lesson.id;

                        return (
                          <Link
                            key={l.id}
                            href={`/learn/${course.slug}/${l.id}`}
                            onClick={() => setIsTocDropdownOpen(false)}
                            className={`flex items-center justify-between px-3 py-1.5 rounded-md text-xs transition-colors ${
                              isCurrent
                                ? "bg-stone-900 text-white font-semibold"
                                : "hover:bg-stone-100 text-stone-700"
                            }`}
                          >
                            <span className="truncate pr-2">{l.title}</span>
                            <span className="text-[10px] font-mono opacity-70 shrink-0">
                              pp. {range.startPage}–{range.endPage}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reader Display Settings & Logout */}
          <div className="flex items-center gap-1 shrink-0 relative" ref={settingsDropdownRef}>
            <button
              type="button"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="p-1.5 rounded-full hover:bg-black/5 text-stone-600 transition-colors cursor-pointer"
              title="Reading Appearance"
            >
              <Type className="h-4 w-4" />
            </button>

            {isSettingsOpen && (
              <div className={`absolute right-0 top-full mt-2 w-56 rounded-xl border shadow-xl p-3 z-50 text-xs space-y-3 ${
                readerTheme === "dark" ? "bg-[#27272a] border-stone-700" : "bg-white border-stone-200"
              }`}>
                <div>
                  <span className="text-stone-400 block text-[10px] font-bold uppercase tracking-wider mb-1">
                    Typeface
                  </span>
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      type="button"
                      onClick={() => setFontFamily("serif")}
                      className={`py-1 rounded font-serif cursor-pointer ${
                        fontFamily === "serif" ? "bg-stone-800 text-white" : "bg-stone-100 text-stone-800"
                      }`}
                    >
                      Book Serif
                    </button>
                    <button
                      type="button"
                      onClick={() => setFontFamily("sans")}
                      className={`py-1 rounded font-sans cursor-pointer ${
                        fontFamily === "sans" ? "bg-stone-800 text-white" : "bg-stone-100 text-stone-800"
                      }`}
                    >
                      Clean Sans
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-stone-400 block text-[10px] font-bold uppercase tracking-wider mb-1">
                    Font Size
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    {(["normal", "large", "xl"] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFontSize(s)}
                        className={`py-1 rounded capitalize cursor-pointer ${
                          fontSize === s ? "bg-stone-800 text-white" : "bg-stone-100 text-stone-800"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-stone-400 block text-[10px] font-bold uppercase tracking-wider mb-1">
                    Paper Theme
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      type="button"
                      onClick={() => setReaderTheme("paper")}
                      className={`py-1 rounded cursor-pointer ${
                        readerTheme === "paper" ? "ring-2 ring-stone-800" : ""
                      } bg-[#FAF8F5] text-stone-900 border border-stone-200`}
                    >
                      Paper
                    </button>
                    <button
                      type="button"
                      onClick={() => setReaderTheme("white")}
                      className={`py-1 rounded cursor-pointer ${
                        readerTheme === "white" ? "ring-2 ring-stone-800" : ""
                      } bg-white text-stone-900 border border-stone-200`}
                    >
                      White
                    </button>
                    <button
                      type="button"
                      onClick={() => setReaderTheme("dark")}
                      className={`py-1 rounded cursor-pointer ${
                        readerTheme === "dark" ? "ring-2 ring-stone-400" : ""
                      } bg-[#18181b] text-white border border-stone-700`}
                    >
                      Dark
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => performLogout()}
              className="p-1.5 rounded-full hover:bg-black/5 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
              title="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Book Reader Container */}
      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-10 sm:py-16">
        
        {/* Front Matter Notice for Chapter 1 */}
        {currentChapterInfo.index === 0 && (
          <div className="mb-12 pb-8 border-b border-stone-200/80 text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-stone-400 font-mono">
              PLUGD DIGITAL PLAYBOOK EDITION
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              {course.title}
            </h2>
            <p className="text-xs text-stone-500 font-serif italic">
              First Edition · {totalPages} Pages · Published by Plugd Systems Research
            </p>
          </div>
        )}

        {/* Chapter Header */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
            <span className="uppercase tracking-wider">
              Part {currentChapterInfo.partIndex} · {module.title}
            </span>
            <span className="px-2 py-0.5 rounded-full border border-stone-200 bg-white/50 text-[11px]">
              pp. {currentChapterInfo.pageRange.startPage} – {currentChapterInfo.pageRange.endPage} of {totalPages}
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold leading-tight tracking-tight">
            Chapter {currentChapterInfo.index + 1}: {lesson.title}
          </h1>

          {learningObjective && (
            <p className="font-serif italic text-sm sm:text-base text-stone-600 border-l-2 border-stone-400 pl-4 py-1">
              {learningObjective}
            </p>
          )}
        </div>

        {/* Chapter Body (Rendered as Book Pages) */}
        <article className={`${fontClasses} ${fontSizeClasses} space-y-6 pt-2`}>
          {writtenContent ? (
            <div
              className="prose prose-stone max-w-none text-inherit leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: formatBookMarkdown(writtenContent),
              }}
            />
          ) : (
            <div className="space-y-4">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none">
                {lesson.summary || "This chapter delivers foundational operational frameworks and strategic directives."}
              </p>
            </div>
          )}
        </article>

        {/* Core Directives / Key Takeaway Box */}
        {coreTakeaway && (
          <div className={`mt-12 p-6 rounded-xl border ${cardThemeClasses} space-y-2 shadow-2xs`}>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Chapter Action Directive</span>
            </div>
            <p className="font-serif text-sm sm:text-base leading-relaxed font-medium">
              {coreTakeaway}
            </p>
          </div>
        )}

        {/* Chapter Navigation Footer */}
        <div className="mt-14 pt-8 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          {previousLesson ? (
            <button
              onClick={handlePrevious}
              className="w-full sm:w-auto flex items-center gap-2 px-4 py-2.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-xs font-medium text-stone-800 transition-colors shadow-2xs cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
              <div className="text-left">
                <span className="text-[10px] text-stone-400 block">Previous Chapter</span>
                <span className="font-serif truncate max-w-[180px] block">{previousLesson.lesson.title}</span>
              </div>
            </button>
          ) : (
            <div />
          )}

          <div className="text-center text-xs text-stone-400 font-mono">
            Page {currentChapterInfo.pageRange.endPage} of {totalPages}
          </div>

          {nextLesson ? (
            <button
              onClick={handleNext}
              className="w-full sm:w-auto flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1c1917] hover:bg-stone-800 text-white text-xs font-medium transition-colors shadow-xs cursor-pointer"
            >
              <div className="text-right">
                <span className="text-[10px] text-stone-400 block">Next Chapter</span>
                <span className="font-serif truncate max-w-[180px] block">{nextLesson.lesson.title}</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <Link
              href={`/${course.slug}`}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-medium transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Complete Playbook</span>
            </Link>
          )}
        </div>

      </main>
    </div>
  );
}

/**
 * Converts markdown-style headings, bolding, lists, and tables into book typography
 */
function formatBookMarkdown(content: string): string {
  if (!content) return "";

  let html = content
    // Headings
    .replace(/^### (.*$)/gim, '<h3 class="font-serif font-bold text-lg text-stone-900 mt-6 mb-2 tracking-tight">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="font-serif font-bold text-xl text-stone-900 mt-8 mb-3 border-b border-stone-200/60 pb-1.5 tracking-tight">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="font-serif font-bold text-2xl text-stone-900 mt-10 mb-4 tracking-tight">$1</h1>')
    // Bold / italic
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-stone-900">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    // Blockquotes / Zero-to-One principles
    .replace(/^\> (.*$)/gim, '<blockquote class="border-l-2 border-stone-800 pl-4 py-1.5 my-4 italic text-stone-700 bg-stone-50/50 rounded-r">$1</blockquote>')
    // Bullet points
    .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-stone-700">$1</li>')
    // Line breaks & paragraphs
    .replace(/\n\n/g, '</p><p class="my-4 text-stone-800 leading-relaxed font-serif">');

  return `<p class="my-4 text-stone-800 leading-relaxed font-serif first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:leading-none">${html}</p>`;
}
