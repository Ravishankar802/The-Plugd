"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
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

  // Viewport Auto-Fit Scaling
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [naturalDimensions, setNaturalDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const calculateFit = useCallback(() => {
    if (!containerRef.current || !cardRef.current) return;
    const container = containerRef.current;
    const card = cardRef.current;

    const bufferX = window.innerWidth < 640 ? 16 : 32;
    const bufferY = window.innerWidth < 640 ? 12 : 24;
    const availWidth = Math.max(container.clientWidth - bufferX, 280);
    const availHeight = Math.max(container.clientHeight - bufferY, 180);

    const unscaledWidth = card.offsetWidth;
    const unscaledHeight = card.offsetHeight;

    if (unscaledWidth > 0 && unscaledHeight > 0) {
      setNaturalDimensions({ width: unscaledWidth, height: unscaledHeight });
      const scaleX = availWidth / unscaledWidth;
      const scaleY = availHeight / unscaledHeight;
      const fitScale = Math.min(1, scaleX, scaleY);
      setScale(Math.max(0.45, Number(fitScale.toFixed(3))));
    }
  }, []);

  // Recalculate scale on slide changes
  useEffect(() => {
    setScale(1);
    setNaturalDimensions({ width: 0, height: 0 });
    const raf = requestAnimationFrame(() => {
      calculateFit();
    });
    const timer = setTimeout(calculateFit, 60);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [currentIndex, lesson.id, calculateFit]);

  // Recalculate on resize and fullscreen state changes
  useEffect(() => {
    const handleResize = () => calculateFit();
    window.addEventListener("resize", handleResize);

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      setTimeout(calculateFit, 80);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, [calculateFit]);

  // ResizeObserver for container bounds changes
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => calculateFit());
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [calculateFit]);

  const totalSlides = lesson.slides?.length || 1;
  const currentSlide: Slide = lesson.slides?.[currentIndex] || lesson.slides?.[0];

  const isModule1 = module.number === "01";

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
    } else if (nextLesson) {
      router.push(`/learn/${course.slug}/${nextLesson.lesson.id}`);
    }
  }, [currentIndex, totalSlides, nextLesson, course.slug, goToSlide, router]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1, "prev");
    }
  }, [currentIndex, goToSlide]);

  // Keyboard Navigation
  useEffect(() => {
    if (viewFormat === "written") return;

    const handleKeyDown = (e: KeyboardEvent) => {
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
  }, [handleNext, handlePrev, isFullscreen, course.slug, router, viewFormat]);

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
      className={`relative flex h-[100dvh] max-h-[100dvh] w-full flex-col font-sans antialiased overflow-hidden select-none ${
        isModule1
          ? "bg-[#faf8f5] text-[#1c1917] selection:bg-[#f97316] selection:text-white"
          : "bg-[#0A0A0C] text-white selection:bg-[#FF5500] selection:text-white"
      }`}
    >
      {/* Top Header Controls Bar */}
      <header
        className={`sticky top-0 z-50 flex h-14 sm:h-16 shrink-0 items-center justify-between border-b px-4 sm:px-8 backdrop-blur-md ${
          isModule1
            ? "border-[#e7e5e4] bg-[#faf8f5]/90 text-[#1c1917]"
            : "border-neutral-800/80 bg-[#121216]/90 text-white"
        }`}
      >
        {/* Left: Syllabus Navigation */}
        <div className="flex items-center gap-3">
          <Link
            href={`/learn/${course.slug}`}
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors shadow-xs ${
              isModule1
                ? "border-[#e7e5e4] bg-white text-[#57534e] hover:border-[#1c1917] hover:text-[#1c1917]"
                : "border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Syllabus</span>
          </Link>

          <div
            className={`hidden md:flex items-center gap-2 text-xs font-mono ${
              isModule1 ? "text-[#78716c]" : "text-neutral-400"
            }`}
          >
            <span className={`font-bold ${isModule1 ? "text-[#f97316]" : "text-[#FF5500]"}`}>
              MODULE {String(module.number).padStart(2, "0")}
            </span>
            <span>/</span>
            <span className="truncate max-w-xs">{lesson.title}</span>
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
      <main
        ref={containerRef}
        className="relative flex flex-1 min-h-0 w-full items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden"
      >
        <div
          className="relative flex items-center justify-center shrink-0"
          style={{
            width: scale < 1 && naturalDimensions.width > 0 ? `${naturalDimensions.width * scale}px` : "100%",
            height: scale < 1 && naturalDimensions.height > 0 ? `${naturalDimensions.height * scale}px` : "auto",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        >
          <div
            ref={cardRef}
            key={`${lesson.id}-${currentIndex}`}
            style={{
              transform: scale < 1 ? `scale(${scale})` : undefined,
              transformOrigin: "center center",
              width: scale < 1 && naturalDimensions.width > 0 ? `${naturalDimensions.width}px` : undefined,
            }}
            className={`relative w-full max-w-5xl rounded-3xl p-5 sm:p-8 md:p-10 lg:p-12 transition-transform duration-100 ${
              isModule1
                ? "border border-[#e7e5e4] bg-white shadow-xs text-[#1c1917]"
                : "border border-neutral-800/80 bg-gradient-to-b from-[#141418] via-[#101014] to-[#0D0D10] shadow-2xl text-white"
            } ${slideDirection === "next" ? "animate-slide-right" : "animate-slide-left"}`}
          >
            {/* Slide Top Eyebrow Tag */}
            <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
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
            <div className="py-4 sm:py-8">
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
            <div className="py-4 sm:py-8 max-w-4xl">
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
            <div className="py-4 sm:py-8 max-w-3xl">
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
            <div className="py-4 sm:py-8 text-center max-w-xl mx-auto">
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
          </div>
        </div>
      </main>

      {/* Bottom Sticky Slide Navigation Bar */}
      <footer
        className={`sticky bottom-0 z-40 flex h-16 sm:h-18 shrink-0 items-center justify-between border-t px-4 sm:px-8 backdrop-blur-md ${
          isModule1
            ? "border-[#e7e5e4] bg-[#faf8f5]/90 text-[#1c1917]"
            : "border-neutral-800/80 bg-[#121216]/90 text-white"
        }`}
      >
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
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
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] ${
            isModule1
              ? "bg-[#1c1917] text-white hover:bg-neutral-800"
              : "bg-white text-[#0E0E10] hover:bg-neutral-200"
          }`}
        >
          <span>
            {currentIndex === totalSlides - 1
              ? nextLesson
                ? `Next: ${nextLesson.lesson.number} →`
                : "Complete Lesson"
              : "Next Slide"}
          </span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </footer>
    </div>
  );
}
