"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Maximize2,
  Minimize2,
  BookOpen,
  Terminal,
  Code,
  GitBranch,
  Play,
  Check,
} from "lucide-react";
import { Slide, Lesson, Module, Course } from "@/lib/playbooks-data";
import WrittenLessonViewer from "@/components/WrittenLessonViewer";

interface CodeTerminalSlideViewProps {
  course: Course;
  module: Module;
  lesson: Lesson;
  nextLesson?: { lesson: Lesson; module: Module } | null;
  previousLesson?: { lesson: Lesson; module: Module } | null;
  initialSlideIndex?: number;
  initialFormat?: "presentation" | "written";
}

export default function CodeTerminalSlideView({
  course,
  module,
  lesson,
  nextLesson,
  previousLesson,
  initialSlideIndex = 0,
  initialFormat = "presentation",
}: CodeTerminalSlideViewProps) {
  
  const router = useRouter();
  const [viewFormat, setViewFormat] = useState<"presentation" | "written">(initialFormat);
  const [currentIndex, setCurrentIndex] = useState(initialSlideIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isModuleDropdownOpen, setIsModuleDropdownOpen] = useState(false);
  const [isLessonDropdownOpen, setIsLessonDropdownOpen] = useState(false);
  const moduleDropdownRef = useRef<HTMLDivElement>(null);
  const lessonDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentIndex(initialSlideIndex);
  }, [initialSlideIndex, lesson.id]);

  const totalSlides = lesson.slides?.length || 1;
  const currentSlide: Slide = lesson.slides?.[currentIndex] || lesson.slides?.[0];

  const goToSlide = useCallback(
    (index: number, direction: "next" | "prev" = "next") => {
      if (index >= 0 && index < totalSlides) {
        setSlideDirection(direction);
        setCurrentIndex(index);

        if (index === totalSlides - 1) {
          fetch("/api/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              courseSlug: course.slug,
              lessonId: lesson.id,
              isCompleted: true,
            }),
          }).catch(() => {});
        }
      }
    },
    [totalSlides, course.slug, lesson.id]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < totalSlides - 1) {
      goToSlide(currentIndex + 1, "next");
    } else if (nextLesson) {
      router.push(`/learn/${course.slug}/${nextLesson.lesson.id}`);
    }
  }, [currentIndex, totalSlides, nextLesson, goToSlide, router, course.slug]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1, "prev");
    } else if (previousLesson) {
      router.push(`/learn/${course.slug}/${previousLesson.lesson.id}`);
    }
  }, [currentIndex, previousLesson, goToSlide, router, course.slug]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewFormat !== "presentation") return;
      if (isModuleDropdownOpen || isLessonDropdownOpen) return;
      if (e.key === "ArrowRight" || e.key === "Space") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, viewFormat, isModuleDropdownOpen, isLessonDropdownOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    setTouchStartX(null);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  if (viewFormat === "written") {
    return (
      <WrittenLessonViewer
        course={course}
        module={module}
        lesson={lesson}
        nextLesson={nextLesson}
        previousLesson={previousLesson}
        onSwitchToPresentation={() => setViewFormat("presentation")}
      />
    );
  }


  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative flex min-h-screen flex-col font-sans antialiased bg-[#0d1117] text-[#e6edf3] selection:bg-sky-600 selection:text-white"
    >
      {/* IDE Code Header Bar */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[#30363d] bg-[#161b22]/90 px-4 sm:px-8 backdrop-blur-md">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link
            href={`/learn/${course.slug}`}
            className="flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-950/40 px-3 py-1.5 text-xs font-semibold text-sky-300 hover:bg-sky-900/50"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Syllabus</span>
          </Link>

          {/* Code File Tab */}
          <div className="flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-1 text-xs font-mono text-sky-400">
            <Terminal className="h-3.5 w-3.5" />
            <span>day-{module.number}.ts</span>
          </div>

          <span className="truncate text-xs font-mono text-slate-400 hidden sm:inline">{lesson.title}</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-lime-500/30 bg-lime-950/30 px-3 py-1 text-xs font-mono text-lime-400">
            <GitBranch className="h-3.5 w-3.5" />
            <span>BRANCH: main [READY]</span>
          </div>

          <button
            onClick={() => setViewFormat("written")}
            className="flex items-center gap-1.5 rounded-full border border-[#30363d] bg-[#21262d] px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white"
          >
            <BookOpen className="h-3.5 w-3.5 text-sky-400" />
            <span className="hidden sm:inline">Written Guide</span>
          </button>
        </div>
      </header>

      {/* Main Code Terminal Stage */}
      <main className="flex-1 flex flex-col justify-center px-4 sm:px-12 py-8 max-w-6xl mx-auto w-full">
        {/* Terminal Tab Bar */}
        <div className="flex items-center justify-between px-4 py-2 rounded-t-2xl border-t border-x border-[#30363d] bg-[#161b22] text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-2 font-bold text-slate-300">COMPILER CANVAS · DAY {module.number} OF 7</span>
          </div>
          <span className="text-sky-400 font-bold">SLIDE {currentIndex + 1}/{totalSlides}</span>
        </div>

        {/* Central Terminal Editor Card */}
        <div className="rounded-b-3xl border border-[#30363d] bg-[#0d1117] p-6 sm:p-10 shadow-2xl relative font-mono">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3 font-sans">
            {currentSlide.headline || currentSlide.title}
          </h2>

          {(currentSlide.subheadline || currentSlide.subtitle) && (
            <p className="text-base sm:text-xl text-sky-200/90 font-sans mb-8 leading-relaxed font-light">
              {currentSlide.subheadline || currentSlide.subtitle}
            </p>
          )}

          {currentSlide.bulletPoints && currentSlide.bulletPoints.length > 0 && (
            <div className="space-y-3 mb-8">
              {currentSlide.bulletPoints.map((pt, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[#30363d] bg-[#161b22] p-4 text-xs sm:text-sm text-[#e6edf3] flex items-start gap-3 hover:border-sky-500/50 transition-colors"
                >
                  <span className="text-lime-400 font-bold shrink-0">$</span>
                  <p className="leading-relaxed font-sans">{pt}</p>
                </div>
              ))}
            </div>
          )}

          {currentSlide.takeaway && (
            <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-4 sm:p-5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 block mb-1">
                ENGINEERING SPEC TAKEAWAY
              </span>
              <p className="text-xs sm:text-sm text-sky-100 font-sans font-medium">
                {currentSlide.takeaway}
              </p>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-[#30363d]">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0 && !previousLesson}
            className="flex items-center gap-2 rounded-full border border-[#30363d] bg-[#161b22] px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentIndex ? "w-8 bg-sky-400" : "w-2 bg-slate-700"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 rounded-full bg-sky-500 hover:bg-sky-400 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg transition-all hover:scale-105"
          >
            <span>{currentIndex === totalSlides - 1 ? (nextLesson ? "Next Lesson" : "Finish") : "Next Slide"}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
