import type { Course, Module, Lesson } from "./playbooks-data";

export interface CurriculumValidationResult {
  valid: boolean;
  courseTitle: string;
  courseSlug: string;
  modulesCount: number;
  totalLessonsCount: number;
  lessonsPerModule: number[];
  errors: string[];
}

/**
 * Validates that a Playbook curriculum strictly conforms to the mandatory
 * curriculum standard:
 * - 7 to 10 modules (inclusive)
 * - 7 to 10 lessons per module (inclusive)
 * - Every lesson contains rich slides
 * - Every lesson contains substantive written content (>300 characters, no placeholders)
 */
export function validateCurriculumStructure(course: Course): CurriculumValidationResult {
  const errors: string[] = [];
  const modulesCount = course.modules?.length || 0;
  const lessonsPerModule: number[] = [];
  let totalLessonsCount = 0;

  if (modulesCount < 7 || modulesCount > 10) {
    errors.push(
      `Course "${course.title}" has ${modulesCount} modules. Mandatory curriculum requirement: 7 to 10 modules.`
    );
  }

  if (course.modules) {
    course.modules.forEach((mod, modIdx) => {
      const lessonCount = mod.lessons?.length || 0;
      lessonsPerModule.push(lessonCount);
      totalLessonsCount += lessonCount;

      if (lessonCount < 7 || lessonCount > 10) {
        errors.push(
          `Module ${mod.number || modIdx + 1} ("${mod.title}") in "${course.title}" has ${lessonCount} lessons. Mandatory standard: 7 to 10 lessons per module.`
        );
      }

      mod.lessons?.forEach((lesson) => {
        if (!lesson.slides || lesson.slides.length === 0) {
          errors.push(
            `Lesson ${lesson.id || lesson.number} in Module ${mod.number} has no presentation slides.`
          );
        }

        const written = lesson.writtenLesson || (lesson as any).writtenContent || "";
        if (!written || written.trim().length < 300) {
          errors.push(
            `Lesson ${lesson.id || lesson.number} in Module ${mod.number} has insufficient written content (length: ${written.length}). Must be at least 300 characters.`
          );
        }

        if (written.toLowerCase().includes("coming soon") || written.toLowerCase().includes("placeholder")) {
          errors.push(
            `Lesson ${lesson.id || lesson.number} in Module ${mod.number} contains placeholder text.`
          );
        }
      });
    });
  }

  return {
    valid: errors.length === 0,
    courseTitle: course.title,
    courseSlug: course.slug,
    modulesCount,
    totalLessonsCount,
    lessonsPerModule,
    errors,
  };
}
