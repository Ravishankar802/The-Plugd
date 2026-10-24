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
  Check,
  FileSpreadsheet,
  Gauge,
  Briefcase,
  Boxes,
  Presentation,
  LogOut,
} from "lucide-react";
import { Slide, Lesson, Module, Course, getPlaybookOverviewUrl } from "@/lib/playbooks-data";
import WrittenLessonViewer from "@/components/WrittenLessonViewer";
import { performLogout } from "@/lib/auth-client";

interface CatalogServiceSlideViewProps {
  course: Course;
  module: Module;
  lesson: Lesson;
  nextLesson?: { lesson: Lesson; module: Module } | null;
  previousLesson?: { lesson: Lesson; module: Module } | null;
  initialSlideIndex?: number;
  initialFormat?: "presentation" | "written";
}

export default function CatalogServiceSlideView({
  course,
  module,
  lesson,
  nextLesson,
  previousLesson,
  initialSlideIndex = 0,
  initialFormat = "presentation",
}: CatalogServiceSlideViewProps) {
  
  const router = useRouter();
  const [viewFormat, setViewFormat] = useState<"presentation" | "written">(initialFormat);
  const [currentIndex, setCurrentIndex] = useState(initialSlideIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isModuleDropdownOpen, setIsModuleDropdownOpen] = useState(false);
  const [isLessonDropdownOpen, setIsLessonDropdownOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const moduleDropdownRef = useRef<HTMLDivElement>(null);
  const lessonDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentIndex(initialSlideIndex);
    setIsNavigating(false);
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
    if (isNavigating) return;
    if (currentIndex < totalSlides - 1) {
      goToSlide(currentIndex + 1, "next");
    } else if (nextLesson) {
      setIsNavigating(true);
      setIsModuleDropdownOpen(false);
      setIsLessonDropdownOpen(false);
      router.push(`/learn/${course.slug}/${nextLesson.lesson.id}${viewFormat === "written" ? "?format=written" : ""}`);
    } else {
      setIsNavigating(true);
      setIsModuleDropdownOpen(false);
      setIsLessonDropdownOpen(false);
      router.push(getPlaybookOverviewUrl(course.slug));
    }
  }, [currentIndex, totalSlides, nextLesson, goToSlide, router, course.slug, isNavigating, viewFormat]);

  const handlePrev = useCallback(() => {
    if (isNavigating) return;
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1, "prev");
    } else if (previousLesson) {
      setIsNavigating(true);
      setIsModuleDropdownOpen(false);
      setIsLessonDropdownOpen(false);
      router.push(`/learn/${course.slug}/${previousLesson.lesson.id}?slide=last${viewFormat === "written" ? "&format=written" : ""}`);
    }
  }, [currentIndex, previousLesson, goToSlide, router, course.slug, isNavigating, viewFormat]);

  // Dropdown close handlers with capture phase for reliable outside clicks
  useEffect(() => {
    if (!isModuleDropdownOpen && !isLessonDropdownOpen) return;
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (moduleDropdownRef.current && !moduleDropdownRef.current.contains(target)) {
        setIsModuleDropdownOpen(false);
      }
      if (lessonDropdownRef.current && !lessonDropdownRef.current.contains(target)) {
        setIsLessonDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModuleDropdownOpen(false);
        setIsLessonDropdownOpen(false);
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
  }, [isModuleDropdownOpen, isLessonDropdownOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewFormat !== "presentation") return;
      if (isModuleDropdownOpen || isLessonDropdownOpen) {
        if (e.key === "Escape") {
          e.preventDefault();
          setIsModuleDropdownOpen(false);
          setIsLessonDropdownOpen(false);
          return;
        }
      }
      if (e.key === "ArrowRight" || e.key === " ") {
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
      className="relative flex min-h-screen flex-col font-sans antialiased bg-[#f4f4f5] text-zinc-900 selection:bg-blue-600 selection:text-white"
    >
      {/* Service Spec Catalog Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-zinc-200 bg-white/90 px-4 sm:px-8 backdrop-blur-md shadow-xs">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link
            href={getPlaybookOverviewUrl(course.slug)}
            className="flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors shrink-0"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Back to Playbook</span>
            <span className="sm:hidden">Back</span>
          </Link>

          {/* Module Selector */}
          <div className="relative shrink-0" ref={moduleDropdownRef}>
            <button
              type="button"
              onClick={() => {
                setIsModuleDropdownOpen(!isModuleDropdownOpen);
                setIsLessonDropdownOpen(false);
              }}
              aria-expanded={isModuleDropdownOpen}
              className="flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-900 hover:bg-blue-100"
            >
              <Boxes className="h-3.5 w-3.5 text-blue-600 shrink-0" />
              <span className="font-mono font-bold text-blue-800">CATALOG #{module.number}</span>
              <ChevronDown className="h-3 w-3 text-blue-500" />
            </button>
            {isModuleDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 sm:w-80 rounded-2xl border border-zinc-200 bg-white p-2 shadow-2xl z-50">
                <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-blue-700 border-b border-zinc-100 mb-1 flex items-center justify-between">
                  <span>SERVICE CATALOGS ({course.modules.length})</span>
                  <span className="text-[10px] text-zinc-400">{course.modules.length} modules</span>
                </div>
                <div className="max-h-64 overflow-y-auto space-y-1 py-1">
                  {course.modules.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setIsModuleDropdownOpen(false);
                        router.push(`/learn/${course.slug}/${m.lessons[0].id}`);
                      }}
                      className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-colors ${
                        m.id === module.id ? "bg-blue-100 text-blue-900 font-bold" : "text-zinc-700 hover:bg-zinc-50"
                      }`}
                    >
                      <span className="truncate">{m.number}. {m.title}</span>
                      {m.id === module.id && <Check className="h-3.5 w-3.5 text-blue-600 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Lesson Selector */}
          <div className="relative min-w-0" ref={lessonDropdownRef}>
            <button
              type="button"
              onClick={() => {
                setIsLessonDropdownOpen(!isLessonDropdownOpen);
                setIsModuleDropdownOpen(false);
              }}
              aria-expanded={isLessonDropdownOpen}
              className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-800 hover:bg-zinc-100 max-w-[140px] sm:max-w-[240px]"
            >
              <span className="font-mono font-bold text-blue-700 shrink-0">{lesson.number}</span>
              <span className="truncate">{lesson.title}</span>
              <ChevronDown className="h-3 w-3 text-zinc-500 shrink-0" />
            </button>
            {isLessonDropdownOpen && (
              <div className="absolute left-0 mt-2 w-80 sm:w-96 rounded-2xl border border-zinc-200 bg-white p-2 shadow-2xl z-50">
                <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-blue-700 border-b border-zinc-100 mb-1 flex items-center justify-between">
                  <span>CATALOG #{module.number} SPECS</span>
                  <span className="text-[10px] text-zinc-400">{module.lessons.length} lessons</span>
                </div>
                <div className="max-h-64 overflow-y-auto space-y-1 py-1">
                  {module.lessons.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => {
                        setIsLessonDropdownOpen(false);
                        router.push(`/learn/${course.slug}/${l.id}`);
                      }}
                      className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-colors ${
                        l.id === lesson.id ? "bg-blue-100 text-blue-900 font-bold" : "text-zinc-700 hover:bg-zinc-50"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-mono font-bold text-blue-700 shrink-0">{l.number}</span>
                        <span className="truncate">{l.title}</span>
                      </div>
                      {l.id === lesson.id && <Check className="h-3.5 w-3.5 text-blue-600 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Format Selector */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border border-zinc-200 bg-zinc-100 p-0.5 shadow-xs">
            <button
              type="button"
              disabled
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold bg-blue-100 border border-blue-200 text-blue-800 shadow-xs"
            >
              <Presentation className="h-3.5 w-3.5 text-blue-600" />
              <span className="hidden sm:inline">Presentation</span>
            </button>
            <button
              type="button"
              onClick={() => setViewFormat("written")}
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Written Lesson</span>
            </button>
          </div>
        </div>

        {/* Right: Fullscreen & Logout */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={performLogout}
            className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 transition-colors cursor-pointer"
            title="Log out"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
      </header>

      {/* Main Spec Sheet Stage */}
      <main className="flex-1 flex flex-col justify-center px-4 sm:px-12 py-8 max-w-6xl mx-auto w-full">
        {/* Service Metadata Chips */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-[11px] font-mono font-bold text-blue-800 uppercase">
              DELIVERABLE SPEC SHEET {currentIndex + 1}/{totalSlides}
            </span>
            <span className="rounded-md border border-teal-200 bg-teal-50 px-2.5 py-1 text-[11px] font-mono font-bold text-teal-800 uppercase">
              COMPLEXITY: TURN-KEY
            </span>
          </div>
          <div className="text-xs font-mono text-zinc-500 font-bold">
            STACK: MAKE + AIRTABLE + OPENAI
          </div>
        </div>

        {/* Central Spec Sheet Card */}
        <div className="rounded-3xl border border-zinc-300 bg-white p-6 sm:p-10 shadow-lg relative">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-900 mb-3">
            {currentSlide.headline || currentSlide.title}
          </h2>

          {(currentSlide.subheadline || currentSlide.subtitle) && (
            <p className="text-base sm:text-xl text-zinc-600 mb-8 font-normal leading-relaxed">
              {currentSlide.subheadline || currentSlide.subtitle}
            </p>
          )}

          {currentSlide.bulletPoints && currentSlide.bulletPoints.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentSlide.bulletPoints.map((pt, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="text-xs font-mono font-bold text-blue-700 mb-1">
                    SPECIFICATION STEP 0{i + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                    {pt}
                  </p>
                </div>
              ))}
            </div>
          )}

          {currentSlide.takeaway && (
            <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4 sm:p-5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-800 block mb-1">
                SMB COMMERCIAL IMPLEMENTATION RULE
              </span>
              <p className="text-xs sm:text-sm font-semibold text-teal-950">
                {currentSlide.takeaway}
              </p>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-zinc-200">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0 && !previousLesson}
            className="flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100 disabled:opacity-40 transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>
              {currentIndex === 0 && previousLesson
                ? `Prev Lesson (${previousLesson.lesson.number})`
                : "Previous"}
            </span>
          </button>

          {/* Lesson Progress Dots in Module */}
          <div className="flex items-center gap-2 px-2" role="tablist" aria-label="Lessons in module">
            {module.lessons.map((l) => {
              const isActive = l.id === lesson.id;
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => {
                    if (!isActive) {
                      router.push(`/learn/${course.slug}/${l.id}`);
                    }
                  }}
                  className={`rounded-full transition-all cursor-pointer ${
                    isActive
                      ? "h-2.5 w-2.5 sm:h-3 sm:w-3 bg-blue-600 ring-2 ring-blue-600/40 shadow-xs scale-110"
                      : "h-2 w-2 bg-zinc-300 hover:bg-zinc-400 opacity-70 hover:opacity-100"
                  }`}
                  title={`Lesson ${l.number}: ${l.title}`}
                  aria-label={`Lesson ${l.number}: ${l.title}`}
                  aria-current={isActive ? "step" : undefined}
                />
              );
            })}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 rounded-full bg-blue-700 hover:bg-blue-800 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:scale-105"
          >
            <span>
              {currentIndex === totalSlides - 1
                ? nextLesson
                  ? `Next Lesson (${nextLesson.lesson.number})`
                  : "Finish"
                : "Next Slide"}
            </span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
