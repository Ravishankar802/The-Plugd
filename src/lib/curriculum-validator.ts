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
 * Validates that a Playbook curriculum strictly conforms to the permanent
 * PLUGD PLAYBOOK CONTENT STANDARD:
 * - 6 to 8 modules (inclusive)
 * - Exactly 4 lessons per module
 * - Total lessons: 24 to 32
 * - Every lesson contains substantive presentation slides
 * - Every lesson contains in-depth written content (>500 characters, no placeholders)
 */
export function validateCurriculumStructure(course: Course): CurriculumValidationResult {
  const errors: string[] = [];
  const modulesCount = course.modules?.length || 0;
  const lessonsPerModule: number[] = [];
  let totalLessonsCount = 0;

  if (modulesCount < 6 || modulesCount > 8) {
    errors.push(
      `Course "${course.title}" has ${modulesCount} modules. Mandatory curriculum requirement: 6 to 8 modules.`
    );
  }

  if (course.modules) {
    course.modules.forEach((mod, modIdx) => {
      const lessonCount = mod.lessons?.length || 0;
      lessonsPerModule.push(lessonCount);
      totalLessonsCount += lessonCount;

      if (lessonCount !== 4) {
        errors.push(
          `Module ${mod.number || modIdx + 1} ("${mod.title}") in "${course.title}" has ${lessonCount} lessons. Mandatory standard: exactly 4 lessons per module.`
        );
      }

      mod.lessons?.forEach((lesson) => {
        if (!lesson.slides || lesson.slides.length === 0) {
          errors.push(
            `Lesson ${lesson.id || lesson.number} in Module ${mod.number} has no presentation slides.`
          );
        } else {
          // Check that slides are substantive
          lesson.slides.forEach((slide, sIdx) => {
            if (!slide.headline || slide.headline.trim().length === 0) {
              errors.push(
                `Slide ${sIdx + 1} in lesson ${lesson.id} has an empty headline.`
              );
            }
            if (!slide.bulletPoints || slide.bulletPoints.length === 0) {
              errors.push(
                `Slide ${sIdx + 1} in lesson ${lesson.id} has no bullet points.`
              );
            }
          });
        }

        const written = lesson.writtenLesson || (lesson as any).writtenContent || "";
        if (typeof written !== "string" || written.trim().length < 500) {
          errors.push(
            `Lesson ${lesson.id || lesson.number} in Module ${mod.number} has insufficient written content (length: ${written.length}, minimum: 500 characters).`
          );
        }

        if (written.toLowerCase().includes("coming soon") || written.toLowerCase().includes("placeholder")) {
          errors.push(
            `Lesson ${lesson.id || lesson.number} contains placeholder text.`
          );
        }
      });
    });
  }

  if (totalLessonsCount < 24 || totalLessonsCount > 28) {
    errors.push(
      `Course "${course.title}" has ${totalLessonsCount} total lessons. Standard: 24 to 28 lessons (6-7 modules × 4 lessons).`
    );
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
