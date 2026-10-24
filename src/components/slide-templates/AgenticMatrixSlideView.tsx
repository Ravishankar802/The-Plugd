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
  Sparkles,
  BookOpen,
  Presentation,
  Check,
  Cpu,
  Bot,
  Zap,
  Network,
  Activity,
  Layers,
  LogOut,
} from "lucide-react";
import { Slide, Lesson, Module, Course } from "@/lib/playbooks-data";
import WrittenLessonViewer from "@/components/WrittenLessonViewer";
import { performLogout } from "@/lib/auth-client";

interface AgenticMatrixSlideViewProps {
  course: Course;
  module: Module;
  lesson: Lesson;
  nextLesson?: { lesson: Lesson; module: Module } | null;
  previousLesson?: { lesson: Lesson; module: Module } | null;
  initialSlideIndex?: number;
  initialFormat?: "presentation" | "written";
}

export default function AgenticMatrixSlideView({
  course,
  module,
  lesson,
  nextLesson,
  previousLesson,
  initialSlideIndex = 0,
  initialFormat = "presentation",
}: AgenticMatrixSlideViewProps) {
  
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
      router.push(`/learn/${course.slug}`);
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
      className="relative flex min-h-screen flex-col font-sans antialiased bg-[#0a0c16] text-slate-100 selection:bg-purple-600 selection:text-white"
      style={{
        backgroundImage: "radial-gradient(rgba(139, 92, 246, 0.08) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Agent Studio Telemetry Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-purple-500/20 bg-[#0d1021]/90 px-4 sm:px-8 backdrop-blur-md">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link
            href={`/learn/${course.slug}`}
            className="flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold text-purple-300 hover:bg-purple-900/50 transition-colors shrink-0"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Back to Playbook</span>
            <span className="sm:hidden">Back</span>
          </Link>

          {/* Module Selector */}
          <div className="relative" ref={moduleDropdownRef}>
            <button
              type="button"
              onClick={() => {
                setIsModuleDropdownOpen(!isModuleDropdownOpen);
                setIsLessonDropdownOpen(false);
              }}
              aria-expanded={isModuleDropdownOpen}
              className="flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-purple-500/50"
            >
              <Cpu className="h-3.5 w-3.5 text-purple-400 shrink-0" />
              <span className="font-mono text-purple-300 font-bold">MOD {module.number}</span>
              <ChevronDown className="h-3 w-3 text-slate-500" />
            </button>
            {isModuleDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 sm:w-80 rounded-2xl border border-purple-500/30 bg-[#0d1021] p-2 shadow-2xl z-50">
                <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-purple-400 border-b border-slate-800 mb-1 flex items-center justify-between">
                  <span>AGENT PIPELINE ({course.modules.length})</span>
                  <span className="text-[10px] text-slate-500">{course.modules.length} modules</span>
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
                      className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs ${
                        m.id === module.id ? "bg-purple-500/20 text-purple-300 font-bold" : "text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <span className="truncate">{m.number}. {m.title}</span>
                      {m.id === module.id && <Check className="h-3.5 w-3.5 text-purple-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Lesson Selector */}
          <div className="relative" ref={lessonDropdownRef}>
            <button
              type="button"
              onClick={() => {
                setIsLessonDropdownOpen(!isLessonDropdownOpen);
                setIsModuleDropdownOpen(false);
              }}
              aria-expanded={isLessonDropdownOpen}
              className="flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-purple-500/50 max-w-[150px] sm:max-w-[240px]"
            >
              <span className="font-mono text-purple-400 font-bold shrink-0">{lesson.number}</span>
              <span className="truncate text-slate-200">{lesson.title}</span>
              <ChevronDown className="h-3 w-3 text-slate-500 shrink-0" />
            </button>
            {isLessonDropdownOpen && (
              <div className="absolute left-0 mt-2 w-80 sm:w-96 rounded-2xl border border-purple-500/30 bg-[#0d1021] p-2 shadow-2xl z-50">
                <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-purple-400 border-b border-slate-800 mb-1 flex items-center justify-between">
                  <span>MODULE {module.number} NODES</span>
                  <span className="text-[10px] text-slate-500">{module.lessons.length} lessons</span>
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
                      className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs ${
                        l.id === lesson.id ? "bg-purple-500/20 text-purple-300 font-bold" : "text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-mono text-purple-400 font-bold shrink-0">{l.number}</span>
                        <span className="truncate">{l.title}</span>
                      </div>
                      {l.id === lesson.id && <Check className="h-3.5 w-3.5 text-purple-400 shrink-0" />}
                    </button>
                  ))}
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
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold bg-purple-500/20 border border-purple-500/40 text-purple-300 shadow-xs"
            >
              <Presentation className="h-3.5 w-3.5 text-purple-400" />
              <span className="hidden sm:inline">Presentation</span>
            </button>
            <button
              type="button"
              onClick={() => setViewFormat("written")}
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
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
                className="h-full transition-all duration-300 bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                style={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Fullscreen & Logout */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
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

      {/* Main Agent Studio Stage */}
      <main className="flex-1 flex flex-col justify-center px-4 sm:px-12 py-8 max-w-6xl mx-auto w-full">
        {/* Top Active State Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-purple-500/40 bg-purple-500/10 px-2.5 py-1 text-[11px] font-mono font-bold uppercase text-purple-300">
              EXECUTION NODE {currentIndex + 1} OF {totalSlides}
            </span>
            <span className="rounded-md border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-[11px] font-mono font-bold uppercase text-amber-400">
              TOOL SCHEMA: DETERMINISTIC
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            <span>ORCHESTRATOR: ACTIVE</span>
          </div>
        </div>

        {/* Central Agent Node Card */}
        <div className="relative rounded-3xl border border-purple-500/30 bg-gradient-to-b from-[#11142a] via-[#0d1021] to-[#0a0c16] p-6 sm:p-10 shadow-2xl shadow-purple-950/30">
          <div className="absolute top-0 right-8 -translate-y-1/2 rounded-full border border-purple-500/40 bg-purple-950 px-4 py-1 text-[11px] font-mono font-bold text-purple-300 uppercase tracking-widest shadow-lg">
            AUTONOMOUS AGENT STUDIO
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 leading-tight">
            {currentSlide.headline || currentSlide.title}
          </h2>

          {(currentSlide.subheadline || currentSlide.subtitle) && (
            <p className="text-base sm:text-xl text-purple-200/90 font-light mb-8 leading-relaxed">
              {currentSlide.subheadline || currentSlide.subtitle}
            </p>
          )}

          {/* Bullet Points Architecture */}
          {currentSlide.bulletPoints && currentSlide.bulletPoints.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentSlide.bulletPoints.map((pt, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 transition-all hover:border-purple-500/40 hover:bg-slate-900/90"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300 font-mono text-xs font-bold">
                    {i + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                    {pt}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Takeaway / Production Rule Callout */}
          {currentSlide.takeaway && (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 sm:p-5 flex items-start gap-3">
              <Zap className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  CORE PRODUCTION RULE
                </span>
                <p className="text-xs sm:text-sm text-amber-200/90 font-medium leading-relaxed">
                  {currentSlide.takeaway}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Slide Controls & Stage Navigation */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-800/60">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0 && !previousLesson}
            className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-xs font-medium text-slate-300 hover:border-purple-500/50 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
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
                      ? "h-2.5 w-2.5 sm:h-3 sm:w-3 bg-purple-400 ring-2 ring-purple-400/40 shadow-[0_0_8px_rgba(168,85,247,0.6)] scale-110"
                      : "h-2 w-2 bg-slate-800 hover:bg-slate-700 opacity-60 hover:opacity-100"
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
            className="flex items-center gap-2 rounded-full bg-purple-600 hover:bg-purple-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-950/40 transition-all hover:scale-105 active:scale-95"
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
