import { MODULE_01_DATA } from "./module-01-content";
import { MODULE_02_DATA } from "./module-02-content";
import { MODULE_03_DATA } from "./module-03-content";
import { MODULE_04_DATA } from "./module-04-content";
import { MODULE_05_DATA } from "./module-05-content";
import { MODULE_06_DATA } from "./module-06-content";
import { MODULE_07_DATA } from "./module-07-content";
import { MODULE_08_DATA } from "./module-08-content";
import { MODULE_09_DATA } from "./module-09-content";
import { MODULE_10_DATA } from "./module-10-content";
import { DATING_PLAYBOOK_MODULES } from "./dating-playbook-curriculum";
import { AI_AUTOMATIONS_PLAYBOOK_COURSE } from "./ai-automations-course";
import { AI_SERVICE_BUSINESS_PLAYBOOK_COURSE } from "./ai-service-business-course";
import { AGENT_SOLUTIONS_COURSE, AGENT_SOLUTIONS_SLUG, AGENT_SOLUTIONS_ID } from "./playbooks/agent-solutions-data";
import { FREELANCE_INCOME_COURSE, FREELANCE_INCOME_SLUG, FREELANCE_INCOME_ID } from "./playbooks/freelance-income-data";
import { AGENCY_BLUEPRINT_COURSE, AGENCY_BLUEPRINT_SLUG, AGENCY_BLUEPRINT_ID } from "./playbooks/agency-blueprint-data";
import { SMB_SERVICES_COURSE, SMB_SERVICES_SLUG, SMB_SERVICES_ID } from "./playbooks/smb-services-data";
import { MICRO_SAAS_COURSE, MICRO_SAAS_SLUG, MICRO_SAAS_ID } from "./playbooks/micro-saas-data";
import { LOCAL_CHATBOTS_COURSE, LOCAL_CHATBOTS_SLUG, LOCAL_CHATBOTS_ID } from "./playbooks/local-chatbots-data";

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
  title?: string;
  subtitle?: string;
  bulletPoints?: string[];
  takeaway?: string;
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
  diagram?: {
    title?: string;
    steps: {
      step: string;
      title: string;
      desc: string;
      tech?: string;
      metric?: string;
    }[];
  };
  chart?: {
    title?: string;
    data: {
      label: string;
      value: string | number;
      barPct?: number;
      badge?: string;
      note?: string;
    }[];
  };
  metricsGrid?: {
    label: string;
    val: string;
    change?: string;
    note?: string;
  }[];
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
  slug: "men" | "women" | "7-ai-automations" | "ai-businesses-01" | string;
  categorySlug?: string;
  categoryName?: string;
  title: string;
  shortTitle: string;
  audience: "Men" | "Women" | string;
  targetGender?: "for-men" | "for-women" | string;
  headline: string;
  subheadline: string;
  description: string;
  price: number;
  originalPrice: number;
  currency: string;
  badge?: string;
  rating?: number;
  ratingCount?: number;
  primaryColor?: string;
  outcomes?: string[];
  modulesCount: number;
  lessonsCount: number;
  hoursOfMaterial: string;
  accentColor: string;
  stats?: {
    label: string;
    value: string;
  }[];
  highlights?: string[];
  modules: Module[];
  faqs?: {
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

// Construct any remaining modules (empty once all 10 are integrated)
function buildRemainingModules(): Module[] {
  return DATING_PLAYBOOK_MODULES.slice(10).map((curriculumMod) => {
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
  MODULE_03_DATA,
  MODULE_04_DATA,
  MODULE_05_DATA,
  MODULE_06_DATA,
  MODULE_07_DATA,
  MODULE_08_DATA,
  MODULE_09_DATA,
  MODULE_10_DATA,
  ...buildRemainingModules(),
];

export const DATING_PLAYBOOK_COURSE: Course = {
  id: "dating-playbook",
  slug: "men",
  categorySlug: "dating",
  categoryName: "Dating",
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
  accentColor: "#2563eb",
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

export {
  AI_AUTOMATIONS_PLAYBOOK_COURSE,
  AI_SERVICE_BUSINESS_PLAYBOOK_COURSE,
  AGENT_SOLUTIONS_COURSE,
  FREELANCE_INCOME_COURSE,
  AGENCY_BLUEPRINT_COURSE,
  SMB_SERVICES_COURSE,
  MICRO_SAAS_COURSE,
  LOCAL_CHATBOTS_COURSE,
};

export const COURSES: Record<string, Course> = {
  men: DATING_PLAYBOOK_COURSE,
  women: DATING_PLAYBOOK_COURSE,
  "dating-playbook": DATING_PLAYBOOK_COURSE,
  "7-ai-automations": AI_AUTOMATIONS_PLAYBOOK_COURSE,
  "ai-businesses-01": AI_AUTOMATIONS_PLAYBOOK_COURSE,
  "ai-businesses-02": AI_SERVICE_BUSINESS_PLAYBOOK_COURSE,
  "build-a-10000-month-ai-service-business-with-just-3-core-tools": AI_SERVICE_BUSINESS_PLAYBOOK_COURSE,
  // 3. 5 AI Agents
  "ai-businesses-03": AGENT_SOLUTIONS_COURSE,
  "5-ai-agents-you-can-build-and-sell-without-training-your-own-model": AGENT_SOLUTIONS_COURSE,
  // 4. Turn 1 AI Skill
  "ai-businesses-04": FREELANCE_INCOME_COURSE,
  "turn-1-ai-skill-into-4-different-freelance-income-streams": FREELANCE_INCOME_COURSE,
  // 5. 30-Day AI Agency Blueprint
  "ai-businesses-05": AGENCY_BLUEPRINT_COURSE,
  "the-30-day-ai-agency-blueprint-from-zero-portfolio-to-paying-clients": AGENCY_BLUEPRINT_COURSE,
  // 6. 12 AI Services for SMBs
  "ai-businesses-06": SMB_SERVICES_COURSE,
  "12-ai-services-small-businesses-need-but-rarely-know-how-to-build": SMB_SERVICES_COURSE,
  // 7. Build a Micro-SaaS
  "ai-businesses-07": MICRO_SAAS_COURSE,
  "build-a-micro-saas-with-ai-in-7-days-instead-of-spending-months-coding": MICRO_SAAS_COURSE,
  // 8. Sell AI Chatbots
  "ai-businesses-08": LOCAL_CHATBOTS_COURSE,
  "sell-ai-chatbots-to-10-local-businesses-without-hiring-a-developer": LOCAL_CHATBOTS_COURSE,
};

export function getCourse(slug: string = "men"): Course {
  return COURSES[slug] || DATING_PLAYBOOK_COURSE;
}

export function getAllCourses(): Course[] {
  return [
    DATING_PLAYBOOK_COURSE,
    AI_AUTOMATIONS_PLAYBOOK_COURSE,
    AI_SERVICE_BUSINESS_PLAYBOOK_COURSE,
    AGENT_SOLUTIONS_COURSE,
    FREELANCE_INCOME_COURSE,
    AGENCY_BLUEPRINT_COURSE,
    SMB_SERVICES_COURSE,
    MICRO_SAAS_COURSE,
    LOCAL_CHATBOTS_COURSE,
  ];
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

export function getPlaybookOverviewUrl(courseSlug: string = "men"): string {
  const resolvedSlug = COURSES[courseSlug]?.slug || courseSlug;
  if (resolvedSlug === "men" || resolvedSlug === "women" || resolvedSlug === "dating-playbook") {
    return "/dating-playbook";
  }
  return `/${resolvedSlug}`;
}

export { validateCurriculumStructure } from "./curriculum-validator";
