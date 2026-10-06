"use client";

import { useState, useEffect, useCallback } from "react";
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
  MessageSquare,
  Sparkles,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  Check,
} from "lucide-react";
import { Slide, Lesson, Module, Course } from "@/lib/playbooks-data";

interface SlideViewerProps {
  course: Course;
  module: Module;
  lesson: Lesson;
  nextLesson?: { lesson: Lesson; module: Module } | null;
  initialSlideIndex?: number;
}

export default function SlideViewer({
  course,
  module,
  lesson,
  nextLesson,
  initialSlideIndex = 0,
}: SlideViewerProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(initialSlideIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const totalSlides = lesson.slides.length;
  const currentSlide: Slide = lesson.slides[currentIndex] || lesson.slides[0];

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
  }, [handleNext, handlePrev, isFullscreen, course.slug, router]);

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

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative flex min-h-screen flex-col bg-[#0A0A0C] text-white selection:bg-[#FF5500] selection:text-white ${
        isFullscreen ? "p-0" : ""
      }`}
    >
      {/* Top Header Controls Bar */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-neutral-800/80 bg-[#121216]/90 px-4 sm:px-8 backdrop-blur-md">
        {/* Left: Exit + Syllabus Navigation */}
        <div className="flex items-center gap-4">
          <Link
            href={`/learn/${course.slug}`}
            className="flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Exit to Syllabus</span>
            <span className="sm:hidden">Exit</span>
          </Link>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="text-[#FF5500] font-bold">MOD {module.number}</span>
            <span>/</span>
            <span className="truncate max-w-xs">{lesson.title}</span>
          </div>
        </div>

        {/* Center: Slide Position Counter */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold text-neutral-300">
            {currentIndex + 1}{" "}
            <span className="text-neutral-600 font-normal">/</span> {totalSlides}
          </span>
          <div className="h-1.5 w-20 sm:w-32 rounded-full bg-neutral-800 overflow-hidden">
            <div
              className="h-full bg-[#FF5500] transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
            />
          </div>
        </div>

        {/* Right: Fullscreen & Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleFullscreen}
            className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>

          <Link
            href={`/learn/${course.slug}`}
            className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* Main Slide Presentation Stage */}
      <main className="relative flex flex-1 items-center justify-center p-4 sm:p-8 lg:p-14 overflow-hidden">
        <div
          key={`${lesson.id}-${currentIndex}`}
          className={`relative w-full max-w-5xl rounded-3xl border border-neutral-800/80 bg-gradient-to-b from-[#141418] via-[#101014] to-[#0D0D10] p-6 sm:p-12 lg:p-16 shadow-2xl transition-all ${
            slideDirection === "next" ? "animate-slide-right" : "animate-slide-left"
          }`}
        >
          {/* Slide Top Eyebrow Tag */}
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/90 px-3.5 py-1 text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF5500]" />
              {currentSlide.eyebrow || `MODULE ${module.number} · ${lesson.number}`}
            </div>

            <div className="font-mono text-[11px] text-neutral-600 uppercase tracking-widest hidden sm:block">
              {course.title}
            </div>
          </div>

          {/* SLIDE TYPE: TITLE */}
          {currentSlide.type === "TITLE" && (
            <div className="py-6 sm:py-12">
              <h1 className="font-editorial-title text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] mb-6">
                {currentSlide.headline}
              </h1>
              {currentSlide.subheadline && (
                <p className="text-lg sm:text-2xl text-neutral-400 max-w-3xl font-light leading-relaxed">
                  {currentSlide.subheadline}
                </p>
              )}
            </div>
          )}

          {/* SLIDE TYPE: BIG_STATEMENT */}
          {currentSlide.type === "BIG_STATEMENT" && (
            <div className="py-8 sm:py-14 max-w-4xl">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
                "{currentSlide.headline}"
              </h2>
              {currentSlide.subheadline && (
                <p className="text-base sm:text-xl text-[#FF5500] font-mono leading-relaxed">
                  {currentSlide.subheadline}
                </p>
              )}
            </div>
          )}

          {/* SLIDE TYPE: QUOTE */}
          {currentSlide.type === "QUOTE" && (
            <div className="py-8 sm:py-12 max-w-3xl">
              <div className="text-5xl sm:text-6xl font-serif text-[#FF5500] mb-2">“</div>
              <blockquote className="text-2xl sm:text-4xl font-light text-white leading-relaxed mb-6">
                {currentSlide.quote?.text || currentSlide.headline}
              </blockquote>
              <div className="flex items-center gap-3 font-mono text-xs text-neutral-400">
                <span className="font-bold text-white">{currentSlide.quote?.author}</span>
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
          {currentSlide.type === "FRAMEWORK" && (
            <div className="py-4">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2">
                {currentSlide.headline}
              </h2>
              {currentSlide.subheadline && (
                <p className="text-sm sm:text-base text-neutral-400 mb-8">
                  {currentSlide.subheadline}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentSlide.pillars?.map((pillar, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 sm:p-6 transition-all hover:border-neutral-700 hover:bg-neutral-900"
                  >
                    {pillar.badge && (
                      <span className="inline-block rounded-full bg-[#FF5500]/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#FF5500] uppercase tracking-wider mb-3">
                        {pillar.badge}
                      </span>
                    )}
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE TYPE: COMPARISON */}
          {currentSlide.type === "COMPARISON" && (
            <div className="py-4">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-8">
                {currentSlide.headline}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left (Ineffective) */}
                <div className="rounded-2xl border border-red-950/40 bg-red-950/10 p-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase font-bold tracking-wider mb-4">
                    <X className="h-4 w-4" />
                    <span>{currentSlide.comparison?.leftTitle}</span>
                  </div>
                  <ul className="space-y-3">
                    {currentSlide.comparison?.leftItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                        <span className="text-red-400/80 font-bold shrink-0">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right (Calibrated) */}
                <div className="rounded-2xl border border-[#FF5500]/40 bg-[#FF5500]/5 p-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#FF5500] uppercase font-bold tracking-wider mb-4">
                    <Check className="h-4 w-4" />
                    <span>{currentSlide.comparison?.rightTitle}</span>
                  </div>
                  <ul className="space-y-3">
                    {currentSlide.comparison?.rightItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-white">
                        <span className="text-[#FF5500] font-bold shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE TYPE: BEFORE_AFTER */}
          {currentSlide.type === "BEFORE_AFTER" && (
            <div className="py-4">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-8">
                {currentSlide.headline}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
                  <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2">
                    {currentSlide.beforeAfter?.beforeLabel}
                  </div>
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                    {currentSlide.beforeAfter?.beforeText}
                  </p>
                </div>
                <div className="rounded-2xl border border-[#FF5500]/40 bg-[#FF5500]/10 p-6">
                  <div className="text-xs font-mono text-[#FF5500] uppercase tracking-widest mb-2 font-bold">
                    {currentSlide.beforeAfter?.afterLabel}
                  </div>
                  <p className="text-sm sm:text-base text-white leading-relaxed font-medium">
                    {currentSlide.beforeAfter?.afterText}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE TYPE: MYTH_REALITY */}
          {currentSlide.type === "MYTH_REALITY" && (
            <div className="py-4">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-8">
                {currentSlide.headline}
              </h2>
              <div className="space-y-4">
                <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span>The Social Media Myth</span>
                  </div>
                  <p className="text-sm sm:text-base text-neutral-300">
                    "{currentSlide.mythReality?.myth}"
                  </p>
                </div>

                <div className="rounded-2xl border border-[#FF5500]/30 bg-[#FF5500]/10 p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#FF5500] uppercase tracking-widest mb-2 font-bold">
                    <Sparkles className="h-4 w-4" />
                    <span>The Brutal Reality</span>
                  </div>
                  <p className="text-sm sm:text-base text-white font-medium mb-3">
                    {currentSlide.mythReality?.reality}
                  </p>
                  <div className="text-xs font-mono text-neutral-300 border-t border-neutral-800 pt-3">
                    <span className="text-[#FF5500]">TACTICAL TAKEAWAY: </span>
                    {currentSlide.mythReality?.takeaway}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE TYPE: TEXT_MOCKUP */}
          {currentSlide.type === "TEXT_MOCKUP" && (
            <div className="py-4">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2">
                {currentSlide.headline}
              </h2>
              {currentSlide.messageContext && (
                <p className="text-xs sm:text-sm text-neutral-400 font-mono mb-6">
                  // {currentSlide.messageContext}
                </p>
              )}

              <div className="mx-auto max-w-md rounded-3xl border border-neutral-800 bg-[#16161A] p-6 shadow-xl mb-6">
                <div className="space-y-3">
                  {currentSlide.messages?.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${
                        msg.sender === "you" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm ${
                          msg.sender === "you"
                            ? "bg-[#FF5500] text-white rounded-br-xs font-medium"
                            : "bg-neutral-800 text-neutral-100 rounded-bl-xs"
                        }`}
                      >
                        {msg.text}
                      </div>
                      {msg.time && (
                        <span className="text-[10px] text-neutral-500 font-mono mt-1 px-1">
                          {msg.time}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {currentSlide.messageBreakdown && (
                <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 text-xs sm:text-sm text-neutral-300 font-mono leading-relaxed">
                  <span className="text-[#FF5500] font-bold">ANALYSIS: </span>
                  {currentSlide.messageBreakdown}
                </div>
              )}
            </div>
          )}

          {/* SLIDE TYPE: EXERCISE */}
          {currentSlide.type === "EXERCISE" && (
            <div className="py-4">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2">
                {currentSlide.headline}
              </h2>
              <div className="rounded-2xl border border-[#FF5500]/40 bg-gradient-to-r from-neutral-900 to-[#1A1A20] p-6 sm:p-8 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-bold text-white">
                    {currentSlide.exercise?.title}
                  </div>
                  <span className="rounded-full bg-[#FF5500] px-3 py-1 text-xs font-mono font-bold text-white uppercase">
                    {currentSlide.exercise?.timeframe}
                  </span>
                </div>
                <p className="text-sm text-neutral-300 mb-6 italic">
                  Objective: {currentSlide.exercise?.objective}
                </p>

                <div className="space-y-3 border-t border-neutral-800 pt-4">
                  {currentSlide.exercise?.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF5500]/20 text-[11px] font-mono font-bold text-[#FF5500]">
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
          {currentSlide.type === "RECAP" && (
            <div className="py-4">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-8">
                {currentSlide.headline}
              </h2>
              <div className="space-y-4">
                {currentSlide.recapPoints?.map((pt, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5"
                  >
                    <div className="rounded-lg bg-[#FF5500]/10 p-2 text-[#FF5500] shrink-0">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <p className="text-sm sm:text-base text-neutral-200 font-medium pt-1">
                      {pt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE TYPE: CHAPTER_END */}
          {currentSlide.type === "CHAPTER_END" && (
            <div className="py-8 sm:py-14 text-center max-w-xl mx-auto">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#FF5500]/20 text-[#FF5500]">
                <Sparkles className="h-8 w-8" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
                {currentSlide.headline}
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 mb-8">
                {currentSlide.subheadline}
              </p>

              {nextLesson ? (
                <button
                  onClick={() => router.push(`/learn/${course.slug}/${nextLesson.lesson.id}`)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#FF5500] px-8 py-4 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  <span>Continue to {nextLesson.lesson.number}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <Link
                  href={`/learn/${course.slug}`}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-[#0E0E10] shadow-lg transition-transform hover:scale-105"
                >
                  <span>Back to Course Syllabus</span>
                  <BookOpen className="h-4 w-4" />
                </Link>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Bottom Sticky Slide Navigation Bar */}
      <footer className="sticky bottom-0 z-40 flex h-20 items-center justify-between border-t border-neutral-800/80 bg-[#121216]/90 px-4 sm:px-8 backdrop-blur-md">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-xs sm:text-sm font-semibold text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous Slide</span>
          <span className="sm:hidden">Prev</span>
        </button>

        {/* Keyboard Hint */}
        <div className="hidden md:flex items-center gap-4 text-[11px] font-mono text-neutral-500">
          <span>Use [←] and [→] arrow keys to navigate</span>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-[#0E0E10] shadow-md transition-all hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>
            {currentIndex === totalSlides - 1
              ? nextLesson
                ? "Next Lesson →"
                : "Complete Lesson"
              : "Next Slide"}
          </span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </footer>
    </div>
  );
}
