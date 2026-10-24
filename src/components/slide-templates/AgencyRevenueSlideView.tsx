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
  X,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BookOpen,
  Presentation,
  AlertTriangle,
  Check,
  LogOut,
  Layers,
  Terminal,
  Activity,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Slide, Lesson, Module, Course } from "@/lib/playbooks-data";
import WrittenLessonViewer from "@/components/WrittenLessonViewer";
import { performLogout } from "@/lib/auth-client";

interface AgencyRevenueSlideViewProps {
  course: Course;
  module: Module;
  lesson: Lesson;
  nextLesson?: { lesson: Lesson; module: Module } | null;
  previousLesson?: { lesson: Lesson; module: Module } | null;
  initialSlideIndex?: number;
  initialFormat?: "presentation" | "written";
}

export default function AgencyRevenueSlideView({
  course,
  module,
  lesson,
  nextLesson,
  previousLesson,
  initialSlideIndex = 0,
  initialFormat = "presentation",
}: AgencyRevenueSlideViewProps) {
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

  const [isNavigating, setIsNavigating] = useState(false);

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
      router.push(`/learn/${course.slug}`);
    }
  }, [currentIndex, totalSlides, nextLesson, course.slug, goToSlide, router, isNavigating, viewFormat]);

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
  }, [currentIndex, previousLesson, course.slug, goToSlide, router, isNavigating, viewFormat]);

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

  // Keyboard Navigation
  useEffect(() => {
    if (viewFormat === "written") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModuleDropdownOpen || isLessonDropdownOpen) {
        if (e.key === "Escape") {
          e.preventDefault();
          setIsModuleDropdownOpen(false);
          setIsLessonDropdownOpen(false);
          return;
        }
      }
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Escape") {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          router.push(`/learn/${course.slug}`);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isFullscreen, course.slug, router, viewFormat, isModuleDropdownOpen, isLessonDropdownOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
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
      className={`relative flex min-h-screen flex-col font-sans antialiased bg-[#070b14] text-slate-100 selection:bg-emerald-500 selection:text-white ${
        isFullscreen ? "p-0" : ""
      }`}
      style={{
        backgroundImage: `radial-gradient(rgba(16, 185, 129, 0.09) 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    >
      {/* Top Header HUD Bar */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-emerald-500/20 bg-[#0a0f1d]/90 px-4 sm:px-8 backdrop-blur-md">
        {/* Left: Syllabus Navigation & Module/Lesson Selectors */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link
            href={`/learn/${course.slug}`}
            className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-900/50 hover:text-emerald-300 transition-colors shadow-xs shrink-0"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Syllabus</span>
          </Link>

          {/* Module Selector Dropdown */}
          <div className="relative" ref={moduleDropdownRef}>
            <button
              type="button"
              onClick={() => {
                setIsModuleDropdownOpen(!isModuleDropdownOpen);
                setIsLessonDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/80 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-emerald-500/40 hover:text-white transition-colors"
            >
              <Terminal className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span className="font-mono text-[11px] font-bold text-emerald-400">
                MOD {String(module.number).padStart(2, "0")}
              </span>
              <ChevronDown className="h-3 w-3 text-slate-500" />
            </button>

            {isModuleDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 sm:w-80 rounded-2xl border border-slate-800 bg-[#0b101f] p-2 shadow-2xl z-50">
                <div className="px-3 py-2 text-[11px] font-mono font-bold tracking-wider uppercase text-emerald-400 border-b border-slate-800/80 mb-1 flex items-center justify-between">
                  <span>SELECT MODULE</span>
                  <span className="text-[10px] text-slate-500">{course.modules.length} modules</span>
                </div>
                <div className="max-h-[60vh] overflow-y-auto space-y-1 py-1">
                  {course.modules.map((m) => {
                    const isActive = m.id === module.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setIsModuleDropdownOpen(false);
                          router.push(`/learn/${course.slug}/${m.lessons[0].id}`);
                        }}
                        className={`w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-xs transition-all ${
                          isActive
                            ? "bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30"
                            : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="font-mono text-xs text-emerald-400 font-bold shrink-0">{m.number}</span>
                          <span className="truncate">{m.title}</span>
                        </div>
                        {isActive && <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Lesson Selector Dropdown */}
          <div className="relative" ref={lessonDropdownRef}>
            <button
              type="button"
              onClick={() => {
                setIsLessonDropdownOpen(!isLessonDropdownOpen);
                setIsModuleDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/80 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-emerald-500/40 hover:text-white transition-colors max-w-[130px] sm:max-w-[200px]"
            >
              <span className="font-mono text-[11px] font-bold text-cyan-400 shrink-0">{lesson.number}</span>
              <span className="truncate text-slate-200">{lesson.title}</span>
              <ChevronDown className="h-3 w-3 text-slate-500 shrink-0" />
            </button>

            {isLessonDropdownOpen && (
              <div className="absolute left-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-800 bg-[#0b101f] p-2 shadow-2xl z-50">
                <div className="px-3 py-2 text-[11px] font-mono font-bold tracking-wider uppercase text-cyan-400 border-b border-slate-800/80 mb-1 flex items-center justify-between">
                  <span>MODULE {module.number} LESSONS</span>
                  <span className="text-[10px] text-slate-500">{module.lessons.length} lessons</span>
                </div>
                <div className="max-h-[60vh] overflow-y-auto space-y-1 py-1">
                  {module.lessons.map((l) => {
                    const isActive = l.id === lesson.id;
                    return (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => {
                          setIsLessonDropdownOpen(false);
                          router.push(`/learn/${course.slug}/${l.id}`);
                        }}
                        className={`w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-xs transition-all ${
                          isActive
                            ? "bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30"
                            : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="font-mono text-[11px] text-cyan-400 font-bold shrink-0">{l.number}</span>
                          <span className="truncate">{l.title}</span>
                        </div>
                        {isActive && <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Format Selector & Slide Counter */}
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-full border border-slate-800 bg-slate-900/90 p-0.5 shadow-xs">
            <button
              type="button"
              disabled
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow-xs"
            >
              <Presentation className="h-3.5 w-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Presentation</span>
            </button>
            <button
              type="button"
              onClick={() => setViewFormat("written")}
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Written Lesson</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-slate-300">
              {currentIndex + 1} <span className="text-slate-600">/</span> {totalSlides}
            </span>
            <div className="h-1.5 w-16 sm:w-24 rounded-full overflow-hidden bg-slate-800">
              <div
                className="h-full transition-all duration-300 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                style={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Fullscreen & Logout */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={performLogout}
            className="flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            title="Log out"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
      </header>

      {/* Main Slide Presentation Stage */}
      <main className="relative flex flex-1 items-center justify-center p-4 sm:p-8 lg:p-14 overflow-hidden">
        <div
          key={`${lesson.id}-${currentIndex}`}
          className={`relative w-full max-w-5xl rounded-3xl p-6 sm:p-12 lg:p-16 transition-all border border-emerald-500/25 bg-gradient-to-br from-[#0e1628]/95 via-[#0b101f]/95 to-[#070b14]/98 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl ring-1 ring-white/10 text-slate-100 ${
            slideDirection === "next" ? "animate-slide-right" : "animate-slide-left"
          }`}
        >
          {/* Top Telemetry HUD Header */}
          <div className="flex items-center justify-between mb-8 sm:mb-12 border-b border-slate-800/80 pb-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3.5 py-1 text-[11px] font-mono tracking-widest uppercase font-bold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {currentSlide?.eyebrow || `MODULE ${module.number} · LESSON ${lesson.number}`}
            </div>

            <div className="font-mono text-[11px] uppercase tracking-widest text-cyan-400 hidden sm:flex items-center gap-2">
              <span className="text-slate-600">STACK:</span>
              <span className="rounded bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 text-[10px]">
                AIRTABLE + CLAUDE + MAKE
              </span>
            </div>
          </div>

          {/* SLIDE TYPE: TITLE */}
          {currentSlide?.type === "TITLE" && (
            <div className="py-6 sm:py-12">
              <div className="inline-flex items-center gap-2 rounded-md bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-mono font-bold text-emerald-400 mb-6">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>$10,000/MO REVENUE ARCHITECTURE</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.08] mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
                {currentSlide.headline}
              </h1>
              {currentSlide.subheadline && (
                <p className="text-lg sm:text-2xl max-w-3xl leading-relaxed text-slate-300 font-light">
                  {currentSlide.subheadline}
                </p>
              )}
            </div>
          )}

          {/* SLIDE TYPE: BIG_STATEMENT */}
          {currentSlide?.type === "BIG_STATEMENT" && (
            <div className="py-8 sm:py-14 max-w-4xl">
              <div className="rounded-2xl border-l-4 border-l-emerald-500 border border-slate-800/80 bg-slate-900/60 p-6 sm:p-10 mb-6">
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight text-white mb-4">
                  &ldquo;{currentSlide.headline}&rdquo;
                </h2>
                {currentSlide.subheadline && (
                  <p className="text-sm sm:text-lg font-mono text-emerald-400">
                    {currentSlide.subheadline}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* SLIDE TYPE: FRAMEWORK */}
          {currentSlide?.type === "FRAMEWORK" && (
            <div className="py-4">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-2 text-white">
                {currentSlide.headline}
              </h2>
              {currentSlide.subheadline && (
                <p className="text-sm sm:text-base mb-8 text-slate-400">
                  {currentSlide.subheadline}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentSlide.pillars?.map((pillar, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 transition-all hover:border-emerald-500/40 hover:bg-slate-900/90 relative group"
                  >
                    <div className="h-1 w-12 bg-emerald-500 rounded-full mb-4 group-hover:w-full transition-all duration-300" />
                    {pillar.badge && (
                      <span className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider mb-3 border border-emerald-500/30 bg-emerald-950/40 text-emerald-400">
                        {pillar.badge}
                      </span>
                    )}
                    <h3 className="text-base sm:text-lg font-bold mb-2 text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE TYPE: COMPARISON */}
          {currentSlide?.type === "COMPARISON" && (
            <div className="py-4">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-8 text-white">
                {currentSlide.headline}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-red-900/40 bg-red-950/15 p-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase font-bold tracking-wider mb-4">
                    <X className="h-4 w-4" />
                    <span>{currentSlide.comparison?.leftTitle}</span>
                  </div>
                  <ul className="space-y-3">
                    {currentSlide.comparison?.leftItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <span className="text-red-400 font-bold shrink-0">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-6 shadow-lg shadow-emerald-950/20">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider mb-4">
                    <Check className="h-4 w-4" />
                    <span>{currentSlide.comparison?.rightTitle}</span>
                  </div>
                  <ul className="space-y-3">
                    {currentSlide.comparison?.rightItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-white font-medium">
                        <span className="text-emerald-400 font-bold shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE TYPE: LIST */}
          {currentSlide?.type === "LIST" && (
            <div className="py-4">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-2 text-white">
                {currentSlide.headline}
              </h2>
              {currentSlide.subheadline && (
                <p className="text-sm sm:text-base mb-6 text-slate-400">
                  {currentSlide.subheadline}
                </p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentSlide.listItems?.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 hover:border-emerald-500/40 transition-colors"
                  >
                    <div className="text-xs font-mono font-bold mb-1 text-emerald-400 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      PIPELINE STEP {item.number}
                    </div>
                    <div className="text-base font-bold mb-2 text-white">
                      {item.title}
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE TYPE: CHECKLIST */}
          {currentSlide?.type === "CHECKLIST" && (
            <div className="py-4">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-2 text-white">
                {currentSlide.headline}
              </h2>
              {currentSlide.subheadline && (
                <p className="text-sm sm:text-base mb-6 text-slate-400">
                  {currentSlide.subheadline}
                </p>
              )}
              <div className="space-y-3 mt-6">
                {currentSlide.checklist?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 hover:border-emerald-500/40 transition-colors"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl font-bold text-xs bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                      <Check className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm sm:text-base font-bold mb-1 text-white">
                        {item.label}
                      </div>
                      {item.note && (
                        <p className="text-xs sm:text-sm leading-relaxed text-slate-400">
                          {item.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE TYPE: SCENARIO */}
          {currentSlide?.type === "SCENARIO" && (
            <div className="py-4">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4 text-white">
                {currentSlide.headline}
              </h2>
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                  <span className="text-xs font-mono uppercase tracking-wider font-bold block mb-1 text-slate-400">
                    Live Situation:
                  </span>
                  <p className="text-sm sm:text-base text-white">
                    {currentSlide.scenario?.situation}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-red-900/40 bg-red-950/20 p-5">
                    <span className="text-xs font-mono text-red-400 uppercase tracking-wider font-bold block mb-1">
                      Amateur Reaction:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200">
                      &ldquo;{currentSlide.scenario?.instinctiveReaction}&rdquo;
                    </p>
                  </div>
                  <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-5">
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold block mb-1">
                      Enterprise Calibrated Move:
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-white">
                      &ldquo;{currentSlide.scenario?.calibratedMove}&rdquo;
                    </p>
                  </div>
                </div>
                {currentSlide.scenario?.whyItWorks && (
                  <div className="text-xs sm:text-sm font-mono p-4 rounded-xl border border-slate-800 bg-slate-900/50 text-slate-300">
                    <span className="text-emerald-400 font-bold">COMMERCIAL LEVERAGE: </span>
                    {currentSlide.scenario.whyItWorks}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SLIDE TYPE: EXERCISE */}
          {currentSlide?.type === "EXERCISE" && (
            <div className="py-4">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-2 text-white">
                {currentSlide.headline}
              </h2>
              <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-slate-900 via-[#0d1627] to-slate-900 p-6 sm:p-8 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-bold text-white flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-emerald-400" />
                    <span>{currentSlide.exercise?.title}</span>
                  </div>
                  <span className="rounded-full px-3 py-1 text-xs font-mono font-bold uppercase bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                    {currentSlide.exercise?.timeframe}
                  </span>
                </div>
                <p className="text-sm mb-6 italic text-slate-400">
                  Target Outcome: {currentSlide.exercise?.objective}
                </p>

                <div className="space-y-3 border-t border-slate-800 pt-4">
                  {currentSlide.exercise?.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-mono font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SLIDE TYPE: RECAP */}
          {currentSlide?.type === "RECAP" && (
            <div className="py-4">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-8 text-white">
                {currentSlide.headline}
              </h2>
              <div className="space-y-4">
                {currentSlide.recapPoints?.map((pt, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-emerald-500/30 transition-colors"
                  >
                    <div className="rounded-lg p-2 shrink-0 bg-emerald-500/15 text-emerald-400">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <p className="text-sm sm:text-base font-medium pt-1 text-slate-200">
                      {pt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE TYPE: CHAPTER_END */}
          {currentSlide?.type === "CHAPTER_END" && (
            <div className="py-8 sm:py-14 text-center max-w-xl mx-auto">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                <Sparkles className="h-8 w-8" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 text-white">
                {currentSlide.headline}
              </h2>
              <p className="text-sm sm:text-base mb-8 text-slate-400">
                {currentSlide.subheadline}
              </p>

              {nextLesson ? (
                <button
                  onClick={() => router.push(`/learn/${course.slug}/${nextLesson.lesson.id}`)}
                  className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95 bg-emerald-600 hover:bg-emerald-500 cursor-pointer"
                >
                  <span>Continue to {nextLesson.lesson.number}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <Link
                  href={`/learn/${course.slug}`}
                  className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-8 py-4 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
                >
                  <span>Complete Course Syllabus</span>
                  <BookOpen className="h-4 w-4" />
                </Link>
              )}
            </div>
          )}

          {/* FALLBACK SLIDE HANDLER */}
          {![
            "TITLE",
            "BIG_STATEMENT",
            "QUOTE",
            "FRAMEWORK",
            "COMPARISON",
            "LIST",
            "CHECKLIST",
            "SCENARIO",
            "EXERCISE",
            "RECAP",
            "CHAPTER_END",
          ].includes(currentSlide?.type) && (
            <div className="py-6 sm:py-12">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight mb-6 text-white">
                {currentSlide?.headline}
              </h2>
              {currentSlide?.subheadline && (
                <p className="text-base sm:text-xl font-medium leading-relaxed text-slate-400 font-light">
                  {currentSlide.subheadline}
                </p>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Bottom Floating Navigation Bar */}
      <footer className="sticky bottom-0 z-40 flex h-20 items-center justify-between border-t border-emerald-500/20 bg-[#0a0f1d]/90 px-4 sm:px-8 backdrop-blur-md">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0 && !previousLesson}
          className={`flex items-center gap-2 rounded-2xl border px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            currentIndex === 0 && !previousLesson
              ? "border-slate-800 bg-slate-900 text-slate-600 cursor-not-allowed"
              : "border-slate-700 bg-slate-900 text-slate-200 hover:border-emerald-500/50 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">
            {currentIndex === 0 && previousLesson ? `Prev Lesson (${previousLesson.lesson.number})` : "Previous Slide"}
          </span>
        </button>

        {/* Slide Position Dots */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-md px-2 scrollbar-none">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx, idx > currentIndex ? "next" : "prev")}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? "w-6 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                  : "w-2 bg-slate-800 hover:bg-slate-700"
              }`}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-600 px-5 sm:px-7 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95 hover:bg-emerald-500 cursor-pointer"
        >
          <span className="hidden sm:inline">
            {currentIndex === totalSlides - 1 ? (nextLesson ? "Next Lesson" : "Finish") : "Next Slide"}
          </span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </footer>
    </div>
  );
}
