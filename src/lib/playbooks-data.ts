import { MODULE_01_DATA } from "./module-01-content";
import { MODULE_02_DATA } from "./module-02-content";
import { DATING_PLAYBOOK_MODULES } from "./dating-playbook-curriculum";

export type SlideType =
  | "TITLE"
  | "BIG_STATEMENT"
  | "QUOTE"
  | "FRAMEWORK"
  | "COMPARISON"
  | "BEFORE_AFTER"
  | "MYTH_REALITY"
  | "TEXT_MOCKUP"
  | "LIST"
  | "CHECKLIST"
  | "SCENARIO"
  | "EXERCISE"
  | "RECAP"
  | "CHAPTER_END";

export interface TextMessage {
  sender: "them" | "you";
  text: string;
  time?: string;
  reaction?: string;
}

export interface FrameworkPillar {
  title: string;
  badge?: string;
  description: string;
  points?: string[];
}

export interface Slide {
  id: string;
  order: number;
  type: SlideType;
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  quote?: {
    text: string;
    author: string;
    role?: string;
  };
  statement?: string;
  pillars?: FrameworkPillar[];
  comparison?: {
    leftTitle: string;
    leftItems: string[];
    rightTitle: string;
    rightItems: string[];
  };
  beforeAfter?: {
    beforeLabel: string;
    beforeText: string;
    afterLabel: string;
    afterText: string;
  };
  mythReality?: {
    myth: string;
    reality: string;
    takeaway: string;
  };
  messages?: TextMessage[];
  messageContext?: string;
  messageBreakdown?: string;
  listItems?: {
    number: string;
    title: string;
    description: string;
  }[];
  checklist?: {
    label: string;
    passed: boolean;
    note?: string;
  }[];
  scenario?: {
    situation: string;
    instinctiveReaction: string;
    calibratedMove: string;
    whyItWorks: string;
  };
  exercise?: {
    title: string;
    timeframe: string;
    objective: string;
    steps: string[];
  };
  recapPoints?: string[];
  nextLessonTitle?: string;
  transitionType?: "horizontal" | "vertical" | "scale" | "perspective" | "morph";
}

export interface Lesson {
  id: string;
  number: string;
  title: string;
  duration: string;
  summary: string;
  slides: Slide[];
  learningObjective?: string;
  writtenLesson?: string;
  takeaway?: string;
}

export interface Module {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  lessonsCount: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: "men" | "women";
  title: string;
  shortTitle: string;
  audience: "Men" | "Women";
  targetGender: "for-men" | "for-women";
  headline: string;
  subheadline: string;
  description: string;
  price: number;
  originalPrice: number;
  currency: string;
  modulesCount: number;
  lessonsCount: number;
  hoursOfMaterial: string;
  accentColor: string;
  stats: {
    label: string;
    value: string;
  }[];
  highlights: string[];
  modules: Module[];
  faqs: {
    question: string;
    answer: string;
  }[];
  testimonials: {
    name: string;
    handle: string;
    role: string;
    quote: string;
    metric?: string;
  }[];
}

// Construct modules 03-10 from the approved 10-module, 69-lesson curriculum
function buildRemainingModules(): Module[] {
  return DATING_PLAYBOOK_MODULES.slice(2).map((curriculumMod) => {
    const lessons: Lesson[] = curriculumMod.lessons.map((curriculumLesson) => ({
      id: curriculumLesson.id,
      number: curriculumLesson.number,
      title: curriculumLesson.title,
      duration: "10 min",
      summary: `${curriculumLesson.title} — Key frameworks and actionable principles from Module ${curriculumMod.number}: ${curriculumMod.title}.`,
      slides: [
        {
          id: `s-${curriculumLesson.id}-1`,
          order: 1,
          type: "TITLE",
          eyebrow: `MODULE ${curriculumMod.number} · LESSON ${curriculumLesson.number}`,
          headline: curriculumLesson.title.toUpperCase(),
          subheadline: curriculumMod.description,
        },
        {
          id: `s-${curriculumLesson.id}-2`,
          order: 2,
          type: "BIG_STATEMENT",
          headline: curriculumLesson.title,
          subheadline: `Core principles and practical implementation of ${curriculumLesson.title.toLowerCase()}.`,
        },
        {
          id: `s-${curriculumLesson.id}-3`,
          order: 3,
          type: "FRAMEWORK",
          headline: "Actionable Framework",
          pillars: [
            {
              title: "01. Internal State",
              badge: "Mindset",
              description: "Calibrated presence, emotional independence, and genuine self-respect.",
            },
            {
              title: "02. External Execution",
              badge: "Action",
              description: "Clear communication, natural social intelligence, and intentional behavior.",
            },
            {
              title: "03. Real-World Calibration",
              badge: "Integration",
              description: "Responding accurately to context and maintaining healthy standards.",
            },
          ],
        },
        {
          id: `s-${curriculumLesson.id}-4`,
          order: 4,
          type: "RECAP",
          headline: "Key Takeaways",
          recapPoints: [
            `Integrate the fundamental principles of ${curriculumLesson.title.toLowerCase()}.`,
            "Focus on authentic presence rather than performative behavior.",
            "Consistency and calibrated action create compounding attraction.",
          ],
        },
        {
          id: `s-${curriculumLesson.id}-5`,
          order: 5,
          type: "CHAPTER_END",
          headline: "LESSON COMPLETE",
          subheadline: "Continue to the next lesson in The Dating Playbook.",
        },
      ],
    }));

    return {
      id: curriculumMod.id,
      number: curriculumMod.number,
      title: curriculumMod.title,
      subtitle: curriculumMod.description,
      description: curriculumMod.description,
      duration: `${lessons.length * 10} min`,
      lessonsCount: lessons.length,
      lessons,
    };
  });
}

const ALL_PLAYBOOK_MODULES: Module[] = [
  MODULE_01_DATA,
  MODULE_02_DATA,
  ...buildRemainingModules(),
];

export const DATING_PLAYBOOK_COURSE: Course = {
  id: "dating-playbook",
  slug: "men",
  title: "The Dating Playbook",
  shortTitle: "The Dating Playbook",
  audience: "Men",
  targetGender: "for-men",
  headline: "Everything you need to understand attraction, build confidence, and get the girl you want.",
  subheadline:
    "A practical, 10-module guide to understanding attraction, building confidence, meeting women, dating, and developing meaningful relationships.",
  description:
    "A practical, 10-module guide to understanding attraction, building confidence, meeting women, dating, and developing meaningful relationships.",
  price: 3,
  originalPrice: 49,
  currency: "USD",
  modulesCount: 10,
  lessonsCount: 69,
  hoursOfMaterial: "8.5 hours",
  accentColor: "#FF5500",
  stats: [
    { label: "Modules", value: "10" },
    { label: "Lessons", value: "69" },
    { label: "Formats", value: "Slides & Written" },
    { label: "Access", value: "Lifetime" },
  ],
  highlights: [
    "The Psychology of Attraction: Visceral attraction vs logical persuasion",
    "Becoming the Man: Physical presence, lifestyle, and outcome independence",
    "Social Confidence & Charisma: Vocal cadence, body language, and natural conversation",
    "Flirting & Romantic Tension: Calibrated banter without the friend zone",
    "Texting & Real-World Dates: Closing logistics fast and creating memorable connection",
  ],
  modules: ALL_PLAYBOOK_MODULES,
  faqs: [
    {
      question: "What's included in The Dating Playbook?",
      answer:
        "The Dating Playbook covers attraction, confidence, approaching women, flirting, texting, planning dates, handling rejection, and building relationships across 10 modules and 69 lessons.",
    },
    {
      question: "Is this a one-time payment?",
      answer: "Yes, exactly $3 USD one-time payment with lifetime access. No subscription.",
    },
  ],
  testimonials: [
    {
      name: "Alex Morgan",
      handle: "@alex_m",
      role: "Member",
      quote:
        "Learning to relax, start conversations naturally, and stop treating every interaction like a test made a real difference.",
    },
  ],
};

export const COURSES: Record<string, Course> = {
  men: DATING_PLAYBOOK_COURSE,
  women: DATING_PLAYBOOK_COURSE,
  "dating-playbook": DATING_PLAYBOOK_COURSE,
};

export function getCourse(slug: string = "men"): Course {
  return COURSES[slug] || DATING_PLAYBOOK_COURSE;
}

export function getAllCourses(): Course[] {
  return [DATING_PLAYBOOK_COURSE];
}

export function getLesson(
  courseSlug: string = "men",
  lessonId: string
): { lesson: Lesson; module: Module; course: Course } | null {
  const course = COURSES[courseSlug] || DATING_PLAYBOOK_COURSE;
  if (!course) return null;

  for (const mod of course.modules) {
    const lesson = mod.lessons.find(
      (l) =>
        l.id === lessonId ||
        l.number === lessonId ||
        l.id === lessonId.replace("m-", "") ||
        // legacy ID mappings
        (lessonId === "01" && l.id === "01-1") ||
        (lessonId.startsWith("m-01-") &&
          l.id === "01-" + parseInt(lessonId.replace("m-01-0", "").replace("m-01-", ""), 10))
    );
    if (lesson) {
      return { lesson, module: mod, course };
    }
  }

  // Fallback to first lesson of first module
  const firstMod = course.modules[0];
  if (firstMod && firstMod.lessons[0]) {
    return { lesson: firstMod.lessons[0], module: firstMod, course };
  }

  return null;
}

export function getNextLesson(
  courseSlug: string = "men",
  currentLessonId: string
): { lesson: Lesson; module: Module } | null {
  const course = COURSES[courseSlug] || DATING_PLAYBOOK_COURSE;
  if (!course) return null;

  const allLessons: { lesson: Lesson; module: Module }[] = [];
  for (const mod of course.modules) {
    for (const l of mod.lessons) {
      allLessons.push({ lesson: l, module: mod });
    }
  }

  const currentIndex = allLessons.findIndex(
    (item) =>
      item.lesson.id === currentLessonId ||
      item.lesson.number === currentLessonId ||
      item.lesson.id === currentLessonId.replace("m-", "") ||
      (currentLessonId.startsWith("m-01-") &&
        item.lesson.id === "01-" + parseInt(currentLessonId.replace("m-01-0", "").replace("m-01-", ""), 10))
  );

  if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
    return allLessons[currentIndex + 1];
  }

  return null;
}

export function getPreviousLesson(
  courseSlug: string = "men",
  currentLessonId: string
): { lesson: Lesson; module: Module } | null {
  const course = COURSES[courseSlug] || DATING_PLAYBOOK_COURSE;
  if (!course) return null;

  const allLessons: { lesson: Lesson; module: Module }[] = [];
  for (const mod of course.modules) {
    for (const l of mod.lessons) {
      allLessons.push({ lesson: l, module: mod });
    }
  }

  const currentIndex = allLessons.findIndex(
    (item) =>
      item.lesson.id === currentLessonId ||
      item.lesson.number === currentLessonId ||
      item.lesson.id === currentLessonId.replace("m-", "") ||
      (currentLessonId.startsWith("m-01-") &&
        item.lesson.id === "01-" + parseInt(currentLessonId.replace("m-01-0", "").replace("m-01-", ""), 10))
  );

  if (currentIndex > 0) {
    return allLessons[currentIndex - 1];
  }

  return null;
}
