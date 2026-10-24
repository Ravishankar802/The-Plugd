"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Course, Lesson, Module } from "@/lib/playbooks-data";

export interface UsePlayerControlsProps {
  course: Course;
  module: Module;
  lesson: Lesson;
  nextLesson?: { lesson: Lesson; module: Module } | null;
  previousLesson?: { lesson: Lesson; module: Module } | null;
  totalSlides?: number;
  initialSlideIndex?: number;
  initialFormat?: "presentation" | "written";
}

export function usePlayerControls({
  course,
  module,
  lesson,
  nextLesson,
  previousLesson,
  totalSlides = 1,
  initialSlideIndex = 0,
  initialFormat = "presentation",
}: UsePlayerControlsProps) {
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

  // Robust outside-click dismissal using capture phase
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

    // Use capture phase so any click on slide canvas, cards, buttons, or controls closes open dropdowns
    document.addEventListener("mousedown", handlePointerDown, true);
    document.addEventListener("touchstart", handlePointerDown, true);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown, true);
      document.removeEventListener("touchstart", handlePointerDown, true);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModuleDropdownOpen, isLessonDropdownOpen]);

  const toggleModuleDropdown = useCallback(() => {
    setIsModuleDropdownOpen((prev) => !prev);
    setIsLessonDropdownOpen(false);
  }, []);

  const toggleLessonDropdown = useCallback(() => {
    setIsLessonDropdownOpen((prev) => !prev);
    setIsModuleDropdownOpen(false);
  }, []);

  const closeDropdowns = useCallback(() => {
    setIsModuleDropdownOpen(false);
    setIsLessonDropdownOpen(false);
  }, []);

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
      closeDropdowns();
      router.push(`/learn/${course.slug}/${nextLesson.lesson.id}${viewFormat === "written" ? "?format=written" : ""}`);
    } else {
      setIsNavigating(true);
      closeDropdowns();
      router.push(`/learn/${course.slug}`);
    }
  }, [currentIndex, totalSlides, nextLesson, course.slug, goToSlide, router, isNavigating, viewFormat, closeDropdowns]);

  const handlePrev = useCallback(() => {
    if (isNavigating) return;
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1, "prev");
    } else if (previousLesson) {
      setIsNavigating(true);
      closeDropdowns();
      router.push(`/learn/${course.slug}/${previousLesson.lesson.id}?slide=last${viewFormat === "written" ? "&format=written" : ""}`);
    }
  }, [currentIndex, previousLesson, course.slug, goToSlide, router, isNavigating, viewFormat, closeDropdowns]);

  // Keyboard slide navigation
  useEffect(() => {
    if (viewFormat === "written") return;
    const handleKeyDown = (e: KeyboardEvent) => {
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

  return {
    viewFormat,
    setViewFormat,
    currentIndex,
    setCurrentIndex,
    isFullscreen,
    toggleFullscreen,
    slideDirection,
    touchStartX,
    handleTouchStart,
    handleTouchEnd,
    isModuleDropdownOpen,
    setIsModuleDropdownOpen,
    isLessonDropdownOpen,
    setIsLessonDropdownOpen,
    moduleDropdownRef,
    lessonDropdownRef,
    toggleModuleDropdown,
    toggleLessonDropdown,
    closeDropdowns,
    goToSlide,
    handleNext,
    handlePrev,
    isNavigating,
  };
}
