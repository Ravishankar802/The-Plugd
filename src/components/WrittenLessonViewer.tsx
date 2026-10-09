"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Presentation,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Lesson, Module, Course } from "@/lib/playbooks-data";
import { ExtendedLesson } from "@/lib/module-01-content";

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
  onSwitchToPresentation,
}: WrittenLessonViewerProps) {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);

  const extendedLesson = lesson as ExtendedLesson;
  const writtenContent = extendedLesson.writtenLesson || lesson.summary;

  const handleMarkComplete = () => {
    setIsCompleted(true);
    fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseSlug: course.slug,
        lessonId: lesson.id,
        isCompleted: true,
      }),
    }).catch(() => {});
  };

  // Simple Markdown parser for editorial rendering
  const renderMarkdown = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];
    let currentList: string[] = [];
    let inTable = false;
    let tableRows: string[][] = [];

    const flushParagraph = (key: string) => {
      if (currentParagraph.length > 0) {
        elements.push(
          <p
            key={key}
            className="text-[16.5px] sm:text-[17.5px] text-[#3b3836] leading-[1.8] mb-6 tracking-normal"
          >
            {renderInline(currentParagraph.join(" "))}
          </p>
        );
        currentParagraph = [];
      }
    };

    const flushList = (key: string) => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={key} className="space-y-3.5 my-6 pl-2 list-none">
            {currentList.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-[16px] sm:text-[17px] text-[#3b3836] leading-relaxed"
              >
                <span className="h-2 w-2 rounded-full bg-[#f97316] shrink-0 mt-2.5" />
                <span>{renderInline(item)}</span>
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    const flushTable = (key: string) => {
      if (tableRows.length > 0) {
        const [header, , ...body] = tableRows;
        elements.push(
          <div key={key} className="my-8 overflow-x-auto rounded-2xl border border-[#e7e5e4] bg-white shadow-xs">
            <table className="w-full text-left border-collapse text-sm sm:text-base">
              {header && (
                <thead className="bg-[#fbf5ef] border-b border-[#e7e5e4]">
                  <tr>
                    {header.map((col, idx) => (
                      <th
                        key={idx}
                        className="py-3 px-4 font-bold text-[#1c1917] font-mono text-xs uppercase tracking-wider"
                      >
                        {col.trim()}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody className="divide-y divide-[#f0eee9]">
                {body.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#fbfbfa]">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="py-3.5 px-4 text-[#44403c] leading-relaxed">
                        {renderInline(cell.trim())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    const renderInline = (text: string): React.ReactNode => {
      // Bold **text**
      const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
      return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-[#1c1917]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <em key={i} className="italic text-[#1c1917]">
              {part.slice(1, -1)}
            </em>
          );
        }
        return part;
      });
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
        flushParagraph(`p-${index}`);
        flushList(`l-${index}`);
        inTable = true;
        const cols = trimmed.slice(1, -1).split("|");
        tableRows.push(cols);
        return;
      } else if (inTable) {
        flushTable(`t-${index}`);
      }

      if (trimmed.startsWith("### ")) {
        flushParagraph(`p-${index}`);
        flushList(`l-${index}`);
        elements.push(
          <h2
            key={`h3-${index}`}
            className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#1c1917] mt-12 mb-4 pt-4 border-t border-[#f0eee9]"
          >
            {trimmed.replace("### ", "")}
          </h2>
        );
      } else if (trimmed.startsWith("#### ")) {
        flushParagraph(`p-${index}`);
        flushList(`l-${index}`);
        elements.push(
          <h3
            key={`h4-${index}`}
            className="text-lg sm:text-xl font-bold tracking-tight text-[#1c1917] mt-8 mb-3"
          >
            {trimmed.replace("#### ", "")}
          </h3>
        );
      } else if (trimmed.startsWith("> ")) {
        flushParagraph(`p-${index}`);
        flushList(`l-${index}`);
        elements.push(
          <blockquote
            key={`bq-${index}`}
            className="my-7 rounded-2xl border-l-4 border-[#f97316] bg-[#fbf5ef] py-4 px-5 sm:px-6 italic text-[16px] sm:text-[17px] text-[#44403c] leading-relaxed shadow-xs"
          >
            {renderInline(trimmed.replace("> ", ""))}
          </blockquote>
        );
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        flushParagraph(`p-${index}`);
        currentList.push(trimmed.slice(2));
      } else if (/^\d+\.\s/.test(trimmed)) {
        flushParagraph(`p-${index}`);
        currentList.push(trimmed.replace(/^\d+\.\s/, ""));
      } else if (trimmed === "---") {
        flushParagraph(`p-${index}`);
        flushList(`l-${index}`);
        elements.push(<hr key={`hr-${index}`} className="my-10 border-[#e7e5e4]" />);
      } else if (trimmed === "") {
        flushParagraph(`p-${index}`);
        flushList(`l-${index}`);
      } else {
        currentParagraph.push(trimmed);
      }
    });

    flushParagraph("final-p");
    flushList("final-l");
    if (inTable) flushTable("final-t");

    return elements;
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1917] font-sans antialiased selection:bg-[#f97316] selection:text-white">
      {/* Sticky Header Navigation */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[#e7e5e4] bg-[#faf8f5]/90 px-4 sm:px-8 backdrop-blur-md">
        {/* Left: Exit to Syllabus */}
        <div className="flex items-center gap-3">
          <Link
            href={`/learn/${course.slug}`}
            className="flex items-center gap-1.5 rounded-full border border-[#e7e5e4] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#57534e] transition-colors hover:border-[#1c1917] hover:text-[#1c1917] shadow-xs"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Exit to Syllabus</span>
            <span className="sm:hidden">Syllabus</span>
          </Link>

          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-[#78716c]">
            <span className="font-bold text-[#f97316]">MODULE {module.number}</span>
            <span>·</span>
            <span className="truncate max-w-sm">{lesson.title}</span>
          </div>
        </div>

        {/* Center: Format Selector Toggle */}
        <div className="flex items-center rounded-full border border-[#e7e5e4] bg-[#f0eee9] p-0.5 shadow-xs">
          <button
            type="button"
            onClick={onSwitchToPresentation}
            className="flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold text-[#57534e] hover:text-[#1c1917] transition-colors"
          >
            <Presentation className="h-3.5 w-3.5" />
            <span>Presentation</span>
          </button>
          <button
            type="button"
            disabled
            className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-bold text-[#1c1917] shadow-xs"
          >
            <BookOpen className="h-3.5 w-3.5 text-[#f97316]" />
            <span>Written Lesson</span>
          </button>
        </div>

        {/* Right: Next / Return Control */}
        <div className="flex items-center gap-2">
          {nextLesson && (
            <Link
              href={`/learn/${course.slug}/${nextLesson.lesson.id}?format=written`}
              className="flex items-center gap-1 rounded-full border border-[#e7e5e4] bg-white px-3 py-1.5 text-xs font-semibold text-[#57534e] hover:border-[#1c1917] hover:text-[#1c1917] transition-colors shadow-xs"
            >
              <span className="hidden sm:inline">Next Lesson</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </header>

      {/* Main Reading Container */}
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Lesson Breadcrumb & Title */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#fed7aa] bg-[#fff7ed] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[#f97316] mb-4">
            <span>MODULE {module.number} · LESSON {lesson.number}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1c1917] leading-tight mb-4">
            {lesson.title}
          </h1>
          <p className="text-base sm:text-lg text-[#57534e] leading-relaxed max-w-2xl">
            {lesson.summary}
          </p>

          {/* Learning Objective Callout */}
          {extendedLesson.learningObjective && (
            <div className="mt-8 rounded-2xl border border-[#e7e5e4] bg-white p-5 sm:p-6 shadow-xs flex items-start gap-4 text-left">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f97316]/10 text-[#f97316] shrink-0 mt-0.5">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#78716c] mb-1">
                  Learning Objective
                </div>
                <div className="text-sm sm:text-[15px] font-medium text-[#1c1917] leading-relaxed">
                  {extendedLesson.learningObjective}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Written Essay Body */}
        <article className="prose prose-neutral max-w-none border-t border-[#e7e5e4] pt-8">
          {renderMarkdown(writtenContent)}
        </article>

        {/* Core Takeaway Card */}
        {extendedLesson.takeaway && (
          <div className="mt-12 rounded-3xl border border-[#fed7aa] bg-[#fff7ed] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#f97316] uppercase tracking-wider mb-2">
              <Sparkles className="h-4 w-4" />
              <span>Core Principle Takeaway</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-[#1c1917] leading-snug">
              &ldquo;{extendedLesson.takeaway}&rdquo;
            </p>
          </div>
        )}

        {/* Completion & Next Lesson Section */}
        <div className="mt-14 border-t border-[#e7e5e4] pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            type="button"
            onClick={handleMarkComplete}
            disabled={isCompleted}
            className={`flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold shadow-xs transition-all ${
              isCompleted
                ? "bg-emerald-600 text-white cursor-default"
                : "bg-[#1c1917] text-white hover:bg-neutral-800 hover:scale-[1.02]"
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{isCompleted ? "Completed" : "Mark as Completed"}</span>
          </button>

          <div className="flex items-center gap-3">
            {previousLesson && (
              <Link
                href={`/learn/${course.slug}/${previousLesson.lesson.id}?format=written`}
                className="flex items-center gap-1.5 rounded-2xl border border-[#e7e5e4] bg-white px-4 py-3 text-xs sm:text-sm font-semibold text-[#57534e] hover:border-[#1c1917] hover:text-[#1c1917] transition-colors shadow-xs"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Prev Lesson</span>
              </Link>
            )}

            {nextLesson ? (
              <Link
                href={`/learn/${course.slug}/${nextLesson.lesson.id}?format=written`}
                className="flex items-center gap-2 rounded-2xl bg-[#f97316] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#ea580c] transition-all hover:scale-[1.02]"
              >
                <span>Continue to {nextLesson.lesson.number}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                href={`/learn/${course.slug}`}
                className="flex items-center gap-2 rounded-2xl bg-white border border-[#e7e5e4] px-5 py-3 text-xs sm:text-sm font-bold text-[#1c1917] shadow-xs hover:border-[#1c1917]"
              >
                <span>Back to Syllabus</span>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
