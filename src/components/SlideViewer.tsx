"use client";

import { Slide, Lesson, Module, Course } from "@/lib/playbooks-data";
import WrittenLessonViewer from "@/components/WrittenLessonViewer";
import { ExtendedLesson } from "@/lib/module-01-content";

interface SlideViewerProps {
  course: Course;
  module: Module;
  lesson: ExtendedLesson | Lesson;
  nextLesson?: { lesson: Lesson; module: Module } | null;
  previousLesson?: { lesson: Lesson; module: Module } | null;
  initialSlideIndex?: number;
  initialFormat?: "presentation" | "written";
}

/**
 * SlideViewer now acts as the Digital Book Reader bridge, directly rendering
 * the book reader experience with cover, contents, preface, and chapters.
 */
export default function SlideViewer({
  course,
  module,
  lesson,
  nextLesson,
  previousLesson,
}: SlideViewerProps) {
  return (
    <WrittenLessonViewer
      course={course}
      module={module}
      lesson={lesson}
      nextLesson={nextLesson}
      previousLesson={previousLesson}
    />
  );
}
