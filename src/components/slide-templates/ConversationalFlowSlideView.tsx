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
  MessageSquare,
  Smartphone,
  PhoneCall,
  Check,
  Zap,
} from "lucide-react";
import { Slide, Lesson, Module, Course } from "@/lib/playbooks-data";
import WrittenLessonViewer from "@/components/WrittenLessonViewer";

interface ConversationalFlowSlideViewProps {
  course: Course;
  module: Module;
  lesson: Lesson;
  nextLesson?: { lesson: Lesson; module: Module } | null;
  previousLesson?: { lesson: Lesson; module: Module } | null;
  initialSlideIndex?: number;
  initialFormat?: "presentation" | "written";
}

export default function ConversationalFlowSlideView({
  course,
  module,
  lesson,
  nextLesson,
  previousLesson,
  initialSlideIndex = 0,
  initialFormat = "presentation",
}: ConversationalFlowSlideViewProps) {
  
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
      className="relative flex min-h-screen flex-col font-sans antialiased bg-[#f3f4f6] text-gray-900 selection:bg-teal-600 selection:text-white"
    >
      {/* Chatbot Studio Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white/90 px-4 sm:px-8 backdrop-blur-md shadow-xs">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link
            href={`/learn/${course.slug}`}
            className="flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-800 hover:bg-teal-100"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Syllabus</span>
          </Link>

          <span className="font-mono text-xs font-bold text-teal-800 bg-teal-100/70 border border-teal-200 px-2.5 py-1 rounded-full">
            MOD {module.number} · LESSON {lesson.number}
          </span>
          <span className="truncate text-xs font-semibold text-gray-800 hidden sm:inline">{lesson.title}</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-mono font-bold text-teal-800">
            <Smartphone className="h-3.5 w-3.5 text-teal-600" />
            <span>CONVERSATIONAL FLOW STUDIO</span>
          </div>

          <button
            onClick={() => setViewFormat("written")}
            className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200"
          >
            <BookOpen className="h-3.5 w-3.5 text-teal-700" />
            <span className="hidden sm:inline">Written Guide</span>
          </button>
        </div>
      </header>

      {/* Main Conversational Studio Stage */}
      <main className="flex-1 flex flex-col justify-center px-4 sm:px-12 py-8 max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-100 border border-teal-200 px-3 py-1 text-xs font-mono font-bold text-teal-800">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>CHATBOT DIALOGUE ENGINE · STEP {currentIndex + 1} OF {totalSlides}</span>
          </div>
          <span className="text-xs font-mono text-gray-500 font-bold">
            TARGET: HVAC / DENTAL / ROOFING / MEDSPA
          </span>
        </div>

        {/* Central Split Card */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-lg relative">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-gray-900 mb-3">
            {currentSlide.headline || currentSlide.title}
          </h2>

          {(currentSlide.subheadline || currentSlide.subtitle) && (
            <p className="text-base sm:text-xl text-gray-600 mb-8 font-normal leading-relaxed">
              {currentSlide.subheadline || currentSlide.subtitle}
            </p>
          )}

          {currentSlide.bulletPoints && currentSlide.bulletPoints.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentSlide.bulletPoints.map((pt, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-4 hover:border-teal-300 transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-700 mb-1">
                    <Zap className="h-3 w-3" />
                    <span>DIALOGUE BRANCH 0{i + 1}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {pt}
                  </p>
                </div>
              ))}
            </div>
          )}

          {currentSlide.takeaway && (
            <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4 sm:p-5 flex items-start gap-3">
              <PhoneCall className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-800 block mb-1">
                  LOCAL SALES & CONVERSION STRATEGY
                </span>
                <p className="text-xs sm:text-sm font-semibold text-teal-950">
                  {currentSlide.takeaway}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0 && !previousLesson}
            className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-40"
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
                  i === currentIndex ? "w-8 bg-teal-600" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 rounded-full bg-teal-600 hover:bg-teal-700 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:scale-105"
          >
            <span>{currentIndex === totalSlides - 1 ? (nextLesson ? "Next Lesson" : "Finish") : "Next Slide"}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
