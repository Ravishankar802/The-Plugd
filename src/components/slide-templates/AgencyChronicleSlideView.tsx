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
  Calendar,
  Check,
  Target,
  Flame,
  CheckSquare,
} from "lucide-react";
import { Slide, Lesson, Module, Course } from "@/lib/playbooks-data";
import WrittenLessonViewer from "@/components/WrittenLessonViewer";

interface AgencyChronicleSlideViewProps {
  course: Course;
  module: Module;
  lesson: Lesson;
  nextLesson?: { lesson: Lesson; module: Module } | null;
  previousLesson?: { lesson: Lesson; module: Module } | null;
  initialSlideIndex?: number;
  initialFormat?: "presentation" | "written";
}

export default function AgencyChronicleSlideView({
  course,
  module,
  lesson,
  nextLesson,
  previousLesson,
  initialSlideIndex = 0,
  initialFormat = "presentation",
}: AgencyChronicleSlideViewProps) {
  
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
      className="relative flex min-h-screen flex-col font-sans antialiased bg-[#111215] text-stone-100 selection:bg-amber-600 selection:text-white"
    >
      {/* 30-Day Campaign Chronicle Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-amber-500/20 bg-[#16181d]/90 px-4 sm:px-8 backdrop-blur-md">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link
            href={`/learn/${course.slug}`}
            className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-950/40 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-900/50"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Syllabus</span>
          </Link>

          <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2.5 py-1 rounded-full">
            WEEK {module.number} · DAY SPRINT
          </span>
          <span className="truncate text-xs font-medium text-stone-300 hidden sm:inline">{lesson.title}</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/30 px-3 py-1 text-xs font-mono text-amber-300">
            <Flame className="h-3.5 w-3.5 text-amber-400" />
            <span>DAY 1–30 CHRONICLE</span>
          </div>

          <button
            onClick={() => setViewFormat("written")}
            className="flex items-center gap-1.5 rounded-full border border-stone-800 bg-stone-900 px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-white"
          >
            <BookOpen className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden sm:inline">Written Guide</span>
          </button>
        </div>
      </header>

      {/* Main Campaign Stage */}
      <main className="flex-1 flex flex-col justify-center px-4 sm:px-12 py-8 max-w-6xl mx-auto w-full">
        {/* Top 30-Day Milestone Scrubber */}
        <div className="flex items-center justify-between gap-1 p-2 rounded-2xl border border-stone-800 bg-[#171920] mb-6 overflow-x-auto text-xs font-mono">
          {["WK 1: SETUP", "WK 2: PORTFOLIO", "WK 3: AUDITS", "WK 4: CLOSING", "WK 5: ONBOARD", "M2: SCALE"].map((wk, i) => (
            <div
              key={i}
              className={`px-3 py-1.5 rounded-xl text-center whitespace-nowrap ${
                Number(module.number) === i + 1
                  ? "bg-amber-500/20 border border-amber-500/50 text-amber-300 font-bold"
                  : "text-stone-500"
              }`}
            >
              {wk}
            </div>
          ))}
        </div>

        {/* Central Dossier Card */}
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#181a20] to-[#121316] p-6 sm:p-10 shadow-2xl relative">
          <div className="inline-flex items-center gap-2 rounded-md bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-mono font-bold text-amber-400 mb-4">
            <Target className="h-3.5 w-3.5" />
            <span>DAILY SPRINT DOSSIER · STEP {currentIndex + 1} OF {totalSlides}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            {currentSlide.headline || currentSlide.title}
          </h2>

          {(currentSlide.subheadline || currentSlide.subtitle) && (
            <p className="text-base sm:text-xl text-stone-300 font-light mb-8 leading-relaxed">
              {currentSlide.subheadline || currentSlide.subtitle}
            </p>
          )}

          {currentSlide.bulletPoints && currentSlide.bulletPoints.length > 0 && (
            <div className="space-y-3 mb-8">
              {currentSlide.bulletPoints.map((pt, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-stone-800 bg-stone-900/60 p-4 hover:border-amber-500/30 transition-colors"
                >
                  <CheckSquare className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                    {pt}
                  </p>
                </div>
              ))}
            </div>
          )}

          {currentSlide.takeaway && (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 sm:p-5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block mb-1">
                DAILY SPRINT EXECUTION TAKEAWAY
              </span>
              <p className="text-xs sm:text-sm text-amber-200 font-medium">
                {currentSlide.takeaway}
              </p>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-stone-800">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0 && !previousLesson}
            className="flex items-center gap-2 rounded-full border border-stone-800 bg-stone-900 px-4 py-2.5 text-xs font-medium text-stone-300 hover:text-white disabled:opacity-40"
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
                  i === currentIndex ? "w-8 bg-amber-500" : "w-2 bg-stone-700"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 rounded-full bg-amber-600 hover:bg-amber-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:scale-105"
          >
            <span>{currentIndex === totalSlides - 1 ? (nextLesson ? "Next Lesson" : "Finish") : "Next Slide"}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
