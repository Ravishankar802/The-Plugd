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
} from "lucide-react";
import { Slide, Lesson, Module, Course } from "@/lib/playbooks-data";
import WrittenLessonViewer from "@/components/WrittenLessonViewer";
import { performLogout } from "@/lib/auth-client";

interface SlideViewerProps {
  course: Course;
  module: Module;
  lesson: Lesson;
  nextLesson?: { lesson: Lesson; module: Module } | null;
  previousLesson?: { lesson: Lesson; module: Module } | null;
  initialSlideIndex?: number;
  initialFormat?: "presentation" | "written";
}

export default function SlideViewer({
  course,
  module,
  lesson,
  nextLesson,
  previousLesson,
  initialSlideIndex = 0,
  initialFormat = "presentation",
}: SlideViewerProps) {
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

  // Synchronize index when navigating with initialSlideIndex or across lessons
  useEffect(() => {
    setCurrentIndex(initialSlideIndex);
  }, [initialSlideIndex, lesson.id]);

  const totalSlides = lesson.slides?.length || 1;
  const currentSlide: Slide = lesson.slides?.[currentIndex] || lesson.slides?.[0];

  const isModule1 =
    module.number === "01" ||
    module.number === "02" ||
    module.number === "03" ||
    module.number === "04" ||
    module.number === "05" ||
    module.number === "06" ||
    module.number === "07" ||
    module.number === "08";

  const goToSlide = useCallback(
    (index: number, direction: "next" | "prev" = "next") => {
      if (index >= 0 && index < totalSlides) {
        setSlideDirection(direction);
        setCurrentIndex(index);

        // Record progress if reaching last slide
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
    }
  }, [currentIndex, totalSlides, goToSlide]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1, "prev");
    } else if (previousLesson) {
      router.push(`/learn/${course.slug}/${previousLesson.lesson.id}?slide=last`);
    }
  }, [currentIndex, previousLesson, course.slug, goToSlide, router]);

  // Close dropdowns on outside click
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

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isModuleDropdownOpen, isLessonDropdownOpen]);

  // Keyboard Navigation
  useEffect(() => {
    if (viewFormat === "written") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModuleDropdownOpen || isLessonDropdownOpen) {
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
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
  }, [
    handleNext,
    handlePrev,
    isFullscreen,
    course.slug,
    router,
    viewFormat,
    isModuleDropdownOpen,
    isLessonDropdownOpen,
  ]);

  // Touch Swipe for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
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

  // If viewing written lesson format, render WrittenLessonViewer
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

  // Presentation View
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative flex min-h-screen flex-col font-sans antialiased ${
        isModule1
          ? "bg-[#faf8f5] text-[#1c1917] selection:bg-[#f97316] selection:text-white"
          : "bg-[#0A0A0C] text-white selection:bg-[#FF5500] selection:text-white"
      } ${isFullscreen ? "p-0" : ""}`}
    >
      {/* Top Header Controls Bar */}
      <header
        className={`sticky top-0 z-50 flex h-16 items-center justify-between border-b px-4 sm:px-8 backdrop-blur-md ${
          isModule1
            ? "border-[#e7e5e4] bg-[#faf8f5]/90 text-[#1c1917]"
            : "border-neutral-800/80 bg-[#121216]/90 text-white"
        }`}
      >
        {/* Left: Syllabus Navigation & Module/Lesson Selectors */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link
            href={`/learn/${course.slug}`}
            className={`flex items-center gap-1.5 rounded-full border px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold transition-colors shadow-xs shrink-0 ${
              isModule1
                ? "border-[#e7e5e4] bg-white text-[#57534e] hover:border-[#1c1917] hover:text-[#1c1917]"
                : "border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Syllabus</span>
          </Link>

          {/* Dropdown 1: Module Selector */}
          <div className="relative shrink-0" ref={moduleDropdownRef}>
            <button
              type="button"
              onClick={() => {
                setIsModuleDropdownOpen((prev) => !prev);
                setIsLessonDropdownOpen(false);
              }}
              aria-expanded={isModuleDropdownOpen}
              aria-haspopup="listbox"
              aria-label="Select module"
              className={`flex items-center gap-1.5 rounded-xl border px-2.5 sm:px-3 py-1.5 text-xs font-mono transition-all text-left shadow-xs ${
                isModule1
                  ? "border-[#e7e5e4] bg-white text-[#1c1917] hover:border-[#d6d3d1] hover:bg-[#faf8f5]"
                  : "border-neutral-800 bg-neutral-900 text-neutral-200 hover:border-neutral-700 hover:bg-neutral-800"
              }`}
            >
              <span className={`font-bold shrink-0 ${isModule1 ? "text-[#f97316]" : "text-[#FF5500]"}`}>
                MODULE {String(module.number).padStart(2, "0")}
              </span>
              <ChevronDown
                className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${
                  isModuleDropdownOpen ? "rotate-180" : ""
                } ${isModule1 ? "text-[#78716c]" : "text-neutral-400"}`}
              />
            </button>

            {isModuleDropdownOpen && (
              <div
                role="listbox"
                aria-label="Modules"
                className={`absolute left-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] rounded-2xl border p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150 ${
                  isModule1
                    ? "border-[#e7e5e4] bg-white/95 text-[#1c1917]"
                    : "border-neutral-800 bg-[#16161a]/95 text-white"
                }`}
              >
                <div
                  className={`px-3 py-2 border-b mb-1 flex items-center justify-between ${
                    isModule1 ? "border-[#e7e5e4]" : "border-neutral-800"
                  }`}
                >
                  <span
                    className={`text-[11px] font-mono font-bold tracking-wider uppercase ${
                      isModule1 ? "text-[#f97316]" : "text-[#FF5500]"
                    }`}
                  >
                    CURRICULUM · 10 MODULES
                  </span>
                  <span
                    className={`text-[10px] font-mono ${
                      isModule1 ? "text-[#a8a29e]" : "text-neutral-500"
                    }`}
                  >
                    {course.modules.length} modules
                  </span>
                </div>

                <div className="max-h-[60vh] overflow-y-auto space-y-1 py-1 pr-1 scrollbar-thin">
                  {course.modules.map((m) => {
                    const isActive = m.id === module.id || m.number === module.number;
                    const firstLesson = m.lessons[0];
                    return (
                      <button
                        key={m.id}
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onClick={() => {
                          setIsModuleDropdownOpen(false);
                          if (firstLesson) {
                            router.push(`/learn/${course.slug}/${firstLesson.id}`);
                          }
                        }}
                        className={`w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-xs transition-all ${
                          isActive
                            ? isModule1
                              ? "bg-[#f97316]/10 text-[#f97316] font-bold"
                              : "bg-[#FF5500]/15 text-[#FF5500] font-bold"
                            : isModule1
                            ? "text-[#44403c] hover:bg-[#f5f3ef] hover:text-[#1c1917]"
                            : "text-neutral-300 hover:bg-neutral-800/80 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`font-mono shrink-0 text-[11px] font-bold ${
                              isActive
                                ? isModule1
                                  ? "text-[#f97316]"
                                  : "text-[#FF5500]"
                                : isModule1
                                ? "text-[#78716c]"
                                : "text-neutral-400"
                            }`}
                          >
                            MOD {String(m.number).padStart(2, "0")}
                          </span>
                          <span className="truncate">{m.title}</span>
                        </div>
                        {isActive && (
                          <Check
                            className={`h-3.5 w-3.5 shrink-0 ${
                              isModule1 ? "text-[#f97316]" : "text-[#FF5500]"
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Dropdown 2: Lesson Selector */}
          <div className="relative min-w-0" ref={lessonDropdownRef}>
            <button
              type="button"
              onClick={() => {
                setIsLessonDropdownOpen((prev) => !prev);
                setIsModuleDropdownOpen(false);
              }}
              aria-expanded={isLessonDropdownOpen}
              aria-haspopup="listbox"
              aria-label={`Select lesson from Module ${module.number}`}
              className={`flex items-center gap-1.5 sm:gap-2 rounded-xl border px-2.5 sm:px-3 py-1.5 text-xs font-mono transition-all text-left shadow-xs ${
                isModule1
                  ? "border-[#e7e5e4] bg-white text-[#1c1917] hover:border-[#d6d3d1] hover:bg-[#faf8f5]"
                  : "border-neutral-800 bg-neutral-900 text-neutral-200 hover:border-neutral-700 hover:bg-neutral-800"
              }`}
            >
              <span className="truncate max-w-[90px] sm:max-w-[160px] md:max-w-xs font-medium">
                {lesson.number} / {lesson.title}
              </span>
              <ChevronDown
                className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${
                  isLessonDropdownOpen ? "rotate-180" : ""
                } ${isModule1 ? "text-[#78716c]" : "text-neutral-400"}`}
              />
            </button>

            {isLessonDropdownOpen && (
              <div
                role="listbox"
                aria-label={`Module ${module.number} Lessons`}
                className={`absolute left-0 top-full mt-2 w-72 sm:w-88 max-w-[calc(100vw-2rem)] rounded-2xl border p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150 ${
                  isModule1
                    ? "border-[#e7e5e4] bg-white/95 text-[#1c1917]"
                    : "border-neutral-800 bg-[#16161a]/95 text-white"
                }`}
              >
                <div
                  className={`px-3 py-2 border-b mb-1 flex items-center justify-between ${
                    isModule1 ? "border-[#e7e5e4]" : "border-neutral-800"
                  }`}
                >
                  <span
                    className={`text-[11px] font-mono font-bold tracking-wider uppercase ${
                      isModule1 ? "text-[#f97316]" : "text-[#FF5500]"
                    }`}
                  >
                    MODULE {String(module.number).padStart(2, "0")} · LESSONS
                  </span>
                  <span
                    className={`text-[10px] font-mono ${
                      isModule1 ? "text-[#a8a29e]" : "text-neutral-500"
                    }`}
                  >
                    {module.lessons.length} lessons
                  </span>
                </div>

                <div className="max-h-[60vh] overflow-y-auto space-y-1 py-1 pr-1 scrollbar-thin">
                  {module.lessons.map((l) => {
                    const isActive = l.id === lesson.id;
                    return (
                      <button
                        key={l.id}
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onClick={() => {
                          setIsLessonDropdownOpen(false);
                          router.push(`/learn/${course.slug}/${l.id}`);
                        }}
                        className={`w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-xs transition-all ${
                          isActive
                            ? isModule1
                              ? "bg-[#f97316]/10 text-[#f97316] font-bold"
                              : "bg-[#FF5500]/15 text-[#FF5500] font-bold"
                            : isModule1
                            ? "text-[#44403c] hover:bg-[#f5f3ef] hover:text-[#1c1917]"
                            : "text-neutral-300 hover:bg-neutral-800/80 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`font-mono shrink-0 text-[11px] ${
                              isActive
                                ? isModule1
                                  ? "text-[#f97316] font-bold"
                                  : "text-[#FF5500] font-bold"
                                : isModule1
                                ? "text-[#78716c]"
                                : "text-neutral-400"
                            }`}
                          >
                            {l.number}
                          </span>
                          <span className="truncate">{l.title}</span>
                        </div>
                        {isActive && (
                          <Check
                            className={`h-3.5 w-3.5 shrink-0 ${
                              isModule1 ? "text-[#f97316]" : "text-[#FF5500]"
                            }`}
                          />
                        )}
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
          {/* Format Selector Pill */}
          <div
            className={`flex items-center rounded-full border p-0.5 shadow-xs ${
              isModule1
                ? "border-[#e7e5e4] bg-[#f0eee9]"
                : "border-neutral-800 bg-neutral-900"
            }`}
          >
            <button
              type="button"
              disabled
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-xs ${
                isModule1
                  ? "bg-white text-[#1c1917]"
                  : "bg-neutral-800 text-white"
              }`}
            >
              <Presentation className={`h-3.5 w-3.5 ${isModule1 ? "text-[#f97316]" : "text-[#FF5500]"}`} />
              <span className="hidden sm:inline">Presentation</span>
            </button>
            <button
              type="button"
              onClick={() => setViewFormat("written")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                isModule1
                  ? "text-[#57534e] hover:text-[#1c1917]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Written Lesson</span>
            </button>
          </div>

          {/* Slide Position Counter */}
          <div className="hidden sm:flex items-center gap-3">
            <span
              className={`font-mono text-xs font-semibold ${
                isModule1 ? "text-[#57534e]" : "text-neutral-300"
              }`}
            >
              {currentIndex + 1}{" "}
              <span className={isModule1 ? "text-[#a8a29e]" : "text-neutral-600 font-normal"}>
                /
              </span>{" "}
              {totalSlides}
            </span>
            <div
              className={`h-1.5 w-16 sm:w-24 rounded-full overflow-hidden ${
                isModule1 ? "bg-[#e7e5e4]" : "bg-neutral-800"
              }`}
            >
              <div
                className={`h-full transition-all duration-300 ${
                  isModule1 ? "bg-[#f97316]" : "bg-[#FF5500]"
                }`}
                style={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Fullscreen & Logout Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className={`rounded-lg p-2 transition-colors ${
              isModule1
                ? "text-[#57534e] hover:bg-neutral-200/60 hover:text-[#1c1917]"
                : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
            }`}
            title="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>

          <button
            type="button"
            onClick={performLogout}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors shadow-xs cursor-pointer ${
              isModule1
                ? "border-[#e7e5e4] bg-white text-[#57534e] hover:border-[#1c1917] hover:text-[#1c1917]"
                : "border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            }`}
            title="Log out of your account"
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
          className={`relative w-full max-w-5xl rounded-3xl p-6 sm:p-12 lg:p-16 transition-all ${
            isModule1
              ? "border border-[#e7e5e4] bg-white shadow-xs text-[#1c1917]"
              : "border border-neutral-800/80 bg-gradient-to-b from-[#141418] via-[#101014] to-[#0D0D10] shadow-2xl text-white"
          } ${slideDirection === "next" ? "animate-slide-right" : "animate-slide-left"}`}
        >
          {/* Slide Top Eyebrow Tag */}
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-mono tracking-widest uppercase font-bold ${
                isModule1
                  ? "border-[#fed7aa] bg-[#fff7ed] text-[#f97316]"
                  : "border-neutral-800 bg-neutral-900/90 text-neutral-400"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isModule1 ? "bg-[#f97316]" : "bg-[#FF5500]"
                }`}
              />
              {currentSlide?.eyebrow || `MODULE ${module.number} · LESSON ${lesson.number}`}
            </div>

            <div
              className={`font-mono text-[11px] uppercase tracking-widest hidden sm:block ${
                isModule1 ? "text-[#a8a29e]" : "text-neutral-600"
              }`}
            >
              {course.title}
            </div>
          </div>

          {/* SLIDE TYPE: TITLE */}
          {currentSlide?.type === "TITLE" && (
            <div className="py-6 sm:py-12">
              <h1
                className={`text-4xl sm:text-6xl font-bold tracking-tight leading-[1.08] mb-6 ${
                  isModule1 ? "text-[#1c1917]" : "text-white font-black"
                }`}
              >
                {currentSlide.headline}
              </h1>
              {currentSlide.subheadline && (
                <p
                  className={`text-lg sm:text-2xl max-w-3xl leading-relaxed ${
                    isModule1 ? "text-[#57534e] font-normal" : "text-neutral-400 font-light"
                  }`}
                >
                  {currentSlide.subheadline}
                </p>
              )}
            </div>
          )}

          {/* SLIDE TYPE: BIG_STATEMENT */}
          {currentSlide?.type === "BIG_STATEMENT" && (
            <div className="py-8 sm:py-14 max-w-4xl">
              <h2
                className={`text-3xl sm:text-5xl font-bold tracking-tight leading-tight mb-6 ${
                  isModule1 ? "text-[#1c1917]" : "text-white"
                }`}
              >
                &ldquo;{currentSlide.headline}&rdquo;
              </h2>
              {currentSlide.subheadline && (
                <p
                  className={`text-base sm:text-xl font-medium leading-relaxed ${
                    isModule1 ? "text-[#f97316]" : "text-[#FF5500] font-mono"
                  }`}
                >
                  {currentSlide.subheadline}
                </p>
              )}
            </div>
          )}

          {/* SLIDE TYPE: QUOTE */}
          {currentSlide?.type === "QUOTE" && (
            <div className="py-8 sm:py-12 max-w-3xl">
              <div
                className={`text-5xl sm:text-6xl font-serif mb-2 ${
                  isModule1 ? "text-[#f97316]" : "text-[#FF5500]"
                }`}
              >
                “
              </div>
              <blockquote
                className={`text-2xl sm:text-4xl leading-relaxed mb-6 ${
                  isModule1 ? "text-[#1c1917] font-normal" : "text-white font-light"
                }`}
              >
                {currentSlide.quote?.text || currentSlide.headline}
              </blockquote>
              <div
                className={`flex items-center gap-3 font-mono text-xs ${
                  isModule1 ? "text-[#78716c]" : "text-neutral-400"
                }`}
              >
                <span className={`font-bold ${isModule1 ? "text-[#1c1917]" : "text-white"}`}>
                  {currentSlide.quote?.author}
                </span>
                {currentSlide.quote?.role && (
                  <>
                    <span>•</span>
                    <span>{currentSlide.quote?.role}</span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* SLIDE TYPE: FRAMEWORK */}
          {currentSlide?.type === "FRAMEWORK" && (
            <div className="py-4">
              <h2
                className={`text-2xl sm:text-4xl font-bold tracking-tight mb-2 ${
                  isModule1 ? "text-[#1c1917]" : "text-white"
                }`}
              >
                {currentSlide.headline}
              </h2>
              {currentSlide.subheadline && (
                <p
                  className={`text-sm sm:text-base mb-8 ${
                    isModule1 ? "text-[#57534e]" : "text-neutral-400"
                  }`}
                >
                  {currentSlide.subheadline}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentSlide.pillars?.map((pillar, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl border p-5 sm:p-6 transition-all ${
                      isModule1
                        ? "border-[#e7e5e4] bg-[#faf8f5] hover:border-[#d6d3d1]"
                        : "border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 hover:bg-neutral-900"
                    }`}
                  >
                    {pillar.badge && (
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider mb-3 ${
                          isModule1
                            ? "border border-[#fed7aa] bg-[#fff7ed] text-[#f97316]"
                            : "bg-[#FF5500]/10 text-[#FF5500]"
                        }`}
                      >
                        {pillar.badge}
                      </span>
                    )}
                    <h3
                      className={`text-base sm:text-lg font-bold mb-2 ${
                        isModule1 ? "text-[#1c1917]" : "text-white"
                      }`}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isModule1 ? "text-[#57534e]" : "text-neutral-300"
                      }`}
                    >
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
              <h2
                className={`text-2xl sm:text-4xl font-bold tracking-tight mb-8 ${
                  isModule1 ? "text-[#1c1917]" : "text-white"
                }`}
              >
                {currentSlide.headline}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left (Ineffective) */}
                <div
                  className={`rounded-2xl border p-6 ${
                    isModule1
                      ? "border-[#fecaca] bg-[#fef2f2]"
                      : "border-red-950/40 bg-red-950/10"
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-red-600 uppercase font-bold tracking-wider mb-4">
                    <X className="h-4 w-4" />
                    <span>{currentSlide.comparison?.leftTitle}</span>
                  </div>
                  <ul className="space-y-3">
                    {currentSlide.comparison?.leftItems.map((item, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-2.5 text-xs sm:text-sm ${
                          isModule1 ? "text-[#44403c]" : "text-neutral-300"
                        }`}
                      >
                        <span className="text-red-500 font-bold shrink-0">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right (Calibrated) */}
                <div
                  className={`rounded-2xl border p-6 ${
                    isModule1
                      ? "border-[#fed7aa] bg-[#fff7ed]"
                      : "border-[#FF5500]/40 bg-[#FF5500]/5"
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 text-xs font-mono uppercase font-bold tracking-wider mb-4 ${
                      isModule1 ? "text-[#ea580c]" : "text-[#FF5500]"
                    }`}
                  >
                    <Check className="h-4 w-4" />
                    <span>{currentSlide.comparison?.rightTitle}</span>
                  </div>
                  <ul className="space-y-3">
                    {currentSlide.comparison?.rightItems.map((item, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-2.5 text-xs sm:text-sm ${
                          isModule1 ? "text-[#1c1917] font-medium" : "text-white"
                        }`}
                      >
                        <span
                          className={`font-bold shrink-0 ${
                            isModule1 ? "text-[#f97316]" : "text-[#FF5500]"
                          }`}
                        >
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE TYPE: MYTH_REALITY */}
          {currentSlide?.type === "MYTH_REALITY" && (
            <div className="py-4">
              <h2
                className={`text-2xl sm:text-4xl font-bold tracking-tight mb-8 ${
                  isModule1 ? "text-[#1c1917]" : "text-white"
                }`}
              >
                {currentSlide.headline}
              </h2>
              <div className="space-y-4">
                <div
                  className={`rounded-2xl border p-5 sm:p-6 ${
                    isModule1
                      ? "border-[#e7e5e4] bg-[#faf8f5]"
                      : "border-neutral-800 bg-neutral-900/40"
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-2 ${
                      isModule1 ? "text-[#78716c]" : "text-neutral-400"
                    }`}
                  >
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span>The Pervasive Myth</span>
                  </div>
                  <p
                    className={`text-sm sm:text-base leading-relaxed ${
                      isModule1 ? "text-[#57534e]" : "text-neutral-300"
                    }`}
                  >
                    &ldquo;{currentSlide.mythReality?.myth}&rdquo;
                  </p>
                </div>

                <div
                  className={`rounded-2xl border p-5 sm:p-6 ${
                    isModule1
                      ? "border-[#fed7aa] bg-[#fff7ed]"
                      : "border-[#FF5500]/30 bg-[#FF5500]/10"
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-2 font-bold ${
                      isModule1 ? "text-[#ea580c]" : "text-[#FF5500]"
                    }`}
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>The Evidence-Informed Reality</span>
                  </div>
                  <p
                    className={`text-sm sm:text-base mb-3 leading-relaxed ${
                      isModule1 ? "text-[#1c1917] font-semibold" : "text-white font-medium"
                    }`}
                  >
                    {currentSlide.mythReality?.reality}
                  </p>
                  <div
                    className={`text-xs font-mono pt-3 border-t ${
                      isModule1
                        ? "text-[#44403c] border-[#f1e6da]"
                        : "text-neutral-300 border-neutral-800"
                    }`}
                  >
                    <span className={isModule1 ? "text-[#ea580c] font-bold" : "text-[#FF5500]"}>
                      PRACTICAL TAKEAWAY:{" "}
                    </span>
                    {currentSlide.mythReality?.takeaway}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE TYPE: LIST */}
          {currentSlide?.type === "LIST" && (
            <div className="py-4">
              <h2
                className={`text-2xl sm:text-4xl font-bold tracking-tight mb-2 ${
                  isModule1 ? "text-[#1c1917]" : "text-white"
                }`}
              >
                {currentSlide.headline}
              </h2>
              {currentSlide.subheadline && (
                <p
                  className={`text-sm sm:text-base mb-6 ${
                    isModule1 ? "text-[#57534e]" : "text-neutral-400"
                  }`}
                >
                  {currentSlide.subheadline}
                </p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentSlide.listItems?.map((item, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl border p-5 ${
                      isModule1
                        ? "border-[#e7e5e4] bg-[#faf8f5]"
                        : "border-neutral-800 bg-neutral-900/60"
                    }`}
                  >
                    <div
                      className={`text-xs font-mono font-bold mb-1 ${
                        isModule1 ? "text-[#f97316]" : "text-[#FF5500]"
                      }`}
                    >
                      {item.number}
                    </div>
                    <div
                      className={`text-base font-bold mb-2 ${
                        isModule1 ? "text-[#1c1917]" : "text-white"
                      }`}
                    >
                      {item.title}
                    </div>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isModule1 ? "text-[#57534e]" : "text-neutral-300"
                      }`}
                    >
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
              <h2
                className={`text-2xl sm:text-4xl font-bold tracking-tight mb-2 ${
                  isModule1 ? "text-[#1c1917]" : "text-white"
                }`}
              >
                {currentSlide.headline}
              </h2>
              {currentSlide.subheadline && (
                <p
                  className={`text-sm sm:text-base mb-6 ${
                    isModule1 ? "text-[#57534e]" : "text-neutral-400"
                  }`}
                >
                  {currentSlide.subheadline}
                </p>
              )}
              <div className="space-y-3 mt-6">
                {currentSlide.checklist?.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-4 rounded-2xl border p-4 sm:p-5 transition-colors ${
                      isModule1
                        ? "border-[#e7e5e4] bg-[#faf8f5] hover:border-[#fed7aa]"
                        : "border-neutral-800 bg-neutral-900/60 hover:border-neutral-700"
                    }`}
                  >
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl font-bold text-xs ${
                        isModule1
                          ? "bg-[#fff7ed] border border-[#fed7aa] text-[#f97316]"
                          : "bg-[#FF5500]/10 border border-[#FF5500]/30 text-[#FF5500]"
                      }`}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm sm:text-base font-bold mb-1 ${
                          isModule1 ? "text-[#1c1917]" : "text-white"
                        }`}
                      >
                        {item.label}
                      </div>
                      {item.note && (
                        <p
                          className={`text-xs sm:text-sm leading-relaxed ${
                            isModule1 ? "text-[#57534e]" : "text-neutral-400"
                          }`}
                        >
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
              <h2
                className={`text-2xl sm:text-4xl font-bold tracking-tight mb-4 ${
                  isModule1 ? "text-[#1c1917]" : "text-white"
                }`}
              >
                {currentSlide.headline}
              </h2>
              <div className="space-y-4">
                <div
                  className={`rounded-2xl border p-5 ${
                    isModule1
                      ? "border-[#e7e5e4] bg-[#faf8f5]"
                      : "border-neutral-800 bg-neutral-900/50"
                  }`}
                >
                  <span
                    className={`text-xs font-mono uppercase tracking-wider font-bold block mb-1 ${
                      isModule1 ? "text-[#78716c]" : "text-neutral-400"
                    }`}
                  >
                    Situation:
                  </span>
                  <p className={`text-sm sm:text-base ${isModule1 ? "text-[#1c1917]" : "text-white"}`}>
                    {currentSlide.scenario?.situation}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={`rounded-2xl border p-5 ${
                      isModule1
                        ? "border-[#fecaca] bg-[#fef2f2]"
                        : "border-red-900/40 bg-red-950/20"
                    }`}
                  >
                    <span className="text-xs font-mono text-red-600 uppercase tracking-wider font-bold block mb-1">
                      Instinctive Reaction:
                    </span>
                    <p className={`text-xs sm:text-sm ${isModule1 ? "text-[#44403c]" : "text-neutral-200"}`}>
                      &ldquo;{currentSlide.scenario?.instinctiveReaction}&rdquo;
                    </p>
                  </div>
                  <div
                    className={`rounded-2xl border p-5 ${
                      isModule1
                        ? "border-[#fed7aa] bg-[#fff7ed]"
                        : "border-[#FF5500]/40 bg-[#FF5500]/10"
                    }`}
                  >
                    <span
                      className={`text-xs font-mono uppercase tracking-wider font-bold block mb-1 ${
                        isModule1 ? "text-[#ea580c]" : "text-[#FF5500]"
                      }`}
                    >
                      Calibrated Move:
                    </span>
                    <p className={`text-xs sm:text-sm font-medium ${isModule1 ? "text-[#1c1917]" : "text-white"}`}>
                      &ldquo;{currentSlide.scenario?.calibratedMove}&rdquo;
                    </p>
                  </div>
                </div>
                {currentSlide.scenario?.whyItWorks && (
                  <div
                    className={`text-xs sm:text-sm font-mono p-4 rounded-xl border ${
                      isModule1
                        ? "border-[#e7e5e4] bg-[#faf8f5] text-[#57534e]"
                        : "border-neutral-800 bg-neutral-900/40 text-neutral-300"
                    }`}
                  >
                    <span className={isModule1 ? "text-[#f97316] font-bold" : "text-[#FF5500] font-bold"}>
                      WHY IT WORKS:{" "}
                    </span>
                    {currentSlide.scenario.whyItWorks}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SLIDE TYPE: EXERCISE */}
          {currentSlide?.type === "EXERCISE" && (
            <div className="py-4">
              <h2
                className={`text-2xl sm:text-4xl font-bold tracking-tight mb-2 ${
                  isModule1 ? "text-[#1c1917]" : "text-white"
                }`}
              >
                {currentSlide.headline}
              </h2>
              <div
                className={`rounded-2xl border p-6 sm:p-8 mt-6 ${
                  isModule1
                    ? "border-[#fed7aa] bg-[#fff7ed]"
                    : "border-[#FF5500]/40 bg-gradient-to-r from-neutral-900 to-[#1A1A20]"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`text-lg font-bold ${
                      isModule1 ? "text-[#1c1917]" : "text-white"
                    }`}
                  >
                    {currentSlide.exercise?.title}
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-mono font-bold uppercase ${
                      isModule1
                        ? "bg-[#f97316] text-white"
                        : "bg-[#FF5500] text-white"
                    }`}
                  >
                    {currentSlide.exercise?.timeframe}
                  </span>
                </div>
                <p
                  className={`text-sm mb-6 italic ${
                    isModule1 ? "text-[#57534e]" : "text-neutral-300"
                  }`}
                >
                  Objective: {currentSlide.exercise?.objective}
                </p>

                <div
                  className={`space-y-3 border-t pt-4 ${
                    isModule1 ? "border-[#f1e6da]" : "border-neutral-800"
                  }`}
                >
                  {currentSlide.exercise?.steps.map((step, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 text-xs sm:text-sm ${
                        isModule1 ? "text-[#3b3836]" : "text-neutral-200"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-mono font-bold ${
                          isModule1
                            ? "bg-[#f97316] text-white"
                            : "bg-[#FF5500]/20 text-[#FF5500]"
                        }`}
                      >
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
              <h2
                className={`text-2xl sm:text-4xl font-bold tracking-tight mb-8 ${
                  isModule1 ? "text-[#1c1917]" : "text-white"
                }`}
              >
                {currentSlide.headline}
              </h2>
              <div className="space-y-4">
                {currentSlide.recapPoints?.map((pt, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-4 rounded-2xl border p-5 ${
                      isModule1
                        ? "border-[#e7e5e4] bg-[#faf8f5]"
                        : "border-neutral-800 bg-neutral-900/60"
                    }`}
                  >
                    <div
                      className={`rounded-lg p-2 shrink-0 ${
                        isModule1
                          ? "bg-[#f97316]/10 text-[#f97316]"
                          : "bg-[#FF5500]/10 text-[#FF5500]"
                      }`}
                    >
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <p
                      className={`text-sm sm:text-base font-medium pt-1 ${
                        isModule1 ? "text-[#1c1917]" : "text-neutral-200"
                      }`}
                    >
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
              <div
                className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${
                  isModule1
                    ? "bg-[#f97316]/10 text-[#f97316]"
                    : "bg-[#FF5500]/20 text-[#FF5500]"
                }`}
              >
                <Sparkles className="h-8 w-8" />
              </div>
              <h2
                className={`text-3xl sm:text-5xl font-bold tracking-tight mb-4 ${
                  isModule1 ? "text-[#1c1917]" : "text-white"
                }`}
              >
                {currentSlide.headline}
              </h2>
              <p
                className={`text-sm sm:text-base mb-8 ${
                  isModule1 ? "text-[#57534e]" : "text-neutral-400"
                }`}
              >
                {currentSlide.subheadline}
              </p>

              {nextLesson ? (
                <button
                  onClick={() => router.push(`/learn/${course.slug}/${nextLesson.lesson.id}`)}
                  className={`inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95 ${
                    isModule1 ? "bg-[#f97316] hover:bg-[#ea580c]" : "bg-[#FF5500]"
                  }`}
                >
                  <span>Continue to {nextLesson.lesson.number}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <Link
                  href={`/learn/${course.slug}`}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#1c1917] px-8 py-4 text-sm font-bold text-white shadow-md transition-transform hover:scale-105"
                >
                  <span>Course Syllabus</span>
                  <BookOpen className="h-4 w-4" />
                </Link>
              )}
            </div>
          )}

          {/* FALLBACK SLIDE HANDLER (Guarantees no slide renders as an empty card) */}
          {![
            "TITLE",
            "BIG_STATEMENT",
            "QUOTE",
            "FRAMEWORK",
            "COMPARISON",
            "MYTH_REALITY",
            "LIST",
            "CHECKLIST",
            "SCENARIO",
            "EXERCISE",
            "RECAP",
            "CHAPTER_END",
          ].includes(currentSlide?.type) && (
            <div className="py-6 sm:py-12">
              <h2
                className={`text-3xl sm:text-5xl font-bold tracking-tight leading-tight mb-6 ${
                  isModule1 ? "text-[#1c1917]" : "text-white"
                }`}
              >
                {currentSlide?.headline}
              </h2>
              {currentSlide?.subheadline && (
                <p
                  className={`text-base sm:text-xl font-medium leading-relaxed ${
                    isModule1 ? "text-[#57534e]" : "text-neutral-400 font-light"
                  }`}
                >
                  {currentSlide.subheadline}
                </p>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Bottom Sticky Slide Navigation Bar */}
      <footer
        className={`sticky bottom-0 z-40 flex h-20 items-center justify-between border-t px-4 sm:px-8 backdrop-blur-md ${
          isModule1
            ? "border-[#e7e5e4] bg-[#faf8f5]/90 text-[#1c1917]"
            : "border-neutral-800/80 bg-[#121216]/90 text-white"
        }`}
      >
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0 && !previousLesson}
          className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
            isModule1
              ? "border-[#e7e5e4] bg-white text-[#57534e] hover:border-[#1c1917] hover:text-[#1c1917] shadow-xs"
              : "border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white"
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous Slide</span>
          <span className="sm:hidden">Prev</span>
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentIndex === totalSlides - 1}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
            currentIndex === totalSlides - 1
              ? isModule1
                ? "border border-[#e7e5e4] bg-[#f5f5f4] text-[#a8a29e]"
                : "border border-neutral-800 bg-neutral-900 text-neutral-500"
              : isModule1
              ? "bg-[#1c1917] text-white hover:bg-neutral-800 hover:scale-[1.02] active:scale-[0.98]"
              : "bg-white text-[#0E0E10] hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          <span>Next Slide</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </footer>
    </div>
  );
}
