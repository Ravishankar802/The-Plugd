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
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Check,
  PieChart,
  DollarSign,
  TrendingUp,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { Slide, Lesson, Module, Course } from "@/lib/playbooks-data";
import WrittenLessonViewer from "@/components/WrittenLessonViewer";

interface QuadrantRevenueSlideViewProps {
  course: Course;
  module: Module;
  lesson: Lesson;
  nextLesson?: { lesson: Lesson; module: Module } | null;
  previousLesson?: { lesson: Lesson; module: Module } | null;
  initialSlideIndex?: number;
  initialFormat?: "presentation" | "written";
}

export default function QuadrantRevenueSlideView({
  course,
  module,
  lesson,
  nextLesson,
  previousLesson,
  initialSlideIndex = 0,
  initialFormat = "presentation",
}: QuadrantRevenueSlideViewProps) {
  
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
      className="relative flex min-h-screen flex-col font-sans antialiased bg-[#faf7f2] text-stone-900 selection:bg-orange-600 selection:text-white"
    >
      {/* Editorial Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-stone-200 bg-white/90 px-4 sm:px-8 backdrop-blur-md shadow-xs">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link
            href={`/learn/${course.slug}`}
            className="flex items-center gap-1.5 rounded-full border border-orange-300 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-800 hover:bg-orange-100 transition-colors shrink-0"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Syllabus</span>
          </Link>

          <span className="font-mono text-xs font-bold text-orange-700 bg-orange-100/70 border border-orange-200 px-2.5 py-1 rounded-full">
            MOD {module.number} · {lesson.number}
          </span>
          <span className="truncate text-xs font-semibold text-stone-800 hidden sm:inline">{lesson.title}</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-mono font-bold text-emerald-800">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
            <span>4-QUADRANT REVENUE HUD</span>
          </div>

          <button
            onClick={() => setViewFormat("written")}
            className="flex items-center gap-1.5 rounded-full border border-stone-300 bg-stone-100 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-200"
          >
            <BookOpen className="h-3.5 w-3.5 text-orange-700" />
            <span className="hidden sm:inline">Written Guide</span>
          </button>
        </div>
      </header>

      {/* Main Quadrant Stage */}
      <main className="flex-1 flex flex-col justify-center px-4 sm:px-12 py-8 max-w-6xl mx-auto w-full">
        {/* Quadrant Visual Meter */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          <div className="rounded-xl border border-stone-200 bg-white p-3 text-center shadow-xs">
            <span className="text-[10px] font-mono uppercase font-bold text-stone-500 block">Q1: SPRINTS</span>
            <span className="text-sm font-black text-orange-700">$2,500/gig</span>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-3 text-center shadow-xs">
            <span className="text-[10px] font-mono uppercase font-bold text-stone-500 block">Q2: RETAINERS</span>
            <span className="text-sm font-black text-emerald-700">$950/month</span>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-3 text-center shadow-xs">
            <span className="text-[10px] font-mono uppercase font-bold text-stone-500 block">Q3: TEMPLATES</span>
            <span className="text-sm font-black text-blue-700">$297/sale</span>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-3 text-center shadow-xs">
            <span className="text-[10px] font-mono uppercase font-bold text-stone-500 block">Q4: ADVISORY</span>
            <span className="text-sm font-black text-purple-700">$1,500/day</span>
          </div>
        </div>

        {/* Central Content Card */}
        <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 shadow-lg relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 border border-orange-200 px-3 py-1 text-xs font-mono font-bold text-orange-800 mb-4">
            <PieChart className="h-3.5 w-3.5" />
            <span>REVENUE STREAM DIVERSIFICATION · SLIDE {currentIndex + 1}/{totalSlides}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-stone-900 mb-3">
            {currentSlide.headline || currentSlide.title}
          </h2>

          {(currentSlide.subheadline || currentSlide.subtitle) && (
            <p className="text-base sm:text-xl text-stone-600 mb-8 font-normal leading-relaxed">
              {currentSlide.subheadline || currentSlide.subtitle}
            </p>
          )}

          {currentSlide.bulletPoints && currentSlide.bulletPoints.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentSlide.bulletPoints.map((pt, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4 hover:border-orange-300 hover:bg-orange-50/30 transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-700 mb-1.5">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    <span>DELIVERY PILLAR {i + 1}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {pt}
                  </p>
                </div>
              ))}
            </div>
          )}

          {currentSlide.takeaway && (
            <div className="rounded-2xl border border-emerald-300 bg-emerald-50/70 p-4 sm:p-5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                HIGH-MARGIN MONETIZATION PRINCIPLE
              </span>
              <p className="text-xs sm:text-sm font-semibold text-emerald-950">
                {currentSlide.takeaway}
              </p>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-stone-200">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0 && !previousLesson}
            className="flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2.5 text-xs font-medium text-stone-700 hover:bg-stone-100 disabled:opacity-40"
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
                  i === currentIndex ? "w-8 bg-orange-600" : "w-2 bg-stone-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 rounded-full bg-orange-600 hover:bg-orange-700 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:scale-105"
          >
            <span>{currentIndex === totalSlides - 1 ? (nextLesson ? "Next Lesson" : "Finish") : "Next Slide"}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
