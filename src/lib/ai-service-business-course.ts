import type { Course, Module, Lesson } from "./playbooks-data";
import { AI_SERVICE_BUSINESS_MODULES_METADATA } from "./ai-service-business-curriculum";
import { MODULE_01_LESSONS, MODULE_02_LESSONS } from "./ai-service-business-content-1";
import { MODULE_03_LESSONS, MODULE_04_LESSONS, MODULE_05_LESSONS } from "./ai-service-business-content-2";
import { MODULE_06_LESSONS, MODULE_07_LESSONS } from "./ai-service-business-content-3";

const ALL_LESSON_COLLECTIONS = [
  MODULE_01_LESSONS,
  MODULE_02_LESSONS,
  MODULE_03_LESSONS,
  MODULE_04_LESSONS,
  MODULE_05_LESSONS,
  MODULE_06_LESSONS,
  MODULE_07_LESSONS,
];

export const AI_SERVICE_BUSINESS_MODULES: Module[] = AI_SERVICE_BUSINESS_MODULES_METADATA.map((meta, idx) => {
  const lessons: Lesson[] = ALL_LESSON_COLLECTIONS[idx] || [];
  return {
    id: meta.id,
    number: meta.number,
    title: meta.title,
    subtitle: `Module ${meta.number} · ${meta.lessons.length} Lessons`,
    description: meta.description,
    duration: meta.duration,
    lessonsCount: lessons.length,
    lessons,
  };
});

export const AI_SERVICE_BUSINESS_PLAYBOOK_COURSE: Course = {
  id: "ai-businesses-02",
  slug: "build-a-10000-month-ai-service-business-with-just-3-core-tools" as any,
  categorySlug: "ai-businesses",
  categoryName: "AI Businesses",
  title: "Build a $10,000/Month AI Service Business With Just 3 Core Tools",
  shortTitle: "Build a $10K/Mo AI Service Business",
  audience: "Agency Founders, Freelancers & Consultants" as any,
  targetGender: "for-all" as any,
  headline: "Master the 3 high-leverage tools to build, package, and sell high-ticket AI automation services to B2B clients.",
  subheadline:
    "A comprehensive, practical roadmap teaching you how to build a 5-figure monthly recurring AI service business using Airtable, Claude 3.7, and Make.com.",
  description:
    "A comprehensive, practical roadmap teaching you how to build a 5-figure monthly recurring AI service business using Airtable, Claude 3.7, and Make.com. Learn to package high-demand services, close clients with value-anchored proposals, and scale with recurring retainers.",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  badge: "High Demand",
  rating: 4.9,
  ratingCount: 247,
  hoursOfMaterial: "7.0 hours",
  modulesCount: AI_SERVICE_BUSINESS_MODULES.length,
  lessonsCount: AI_SERVICE_BUSINESS_MODULES.reduce((acc, m) => acc + m.lessons.length, 0),
  primaryColor: "#0f766e",
  accentColor: "#f59e0b",
  outcomes: [
    "Master the 3-tool stack (Airtable, Claude 3.7, Make.com) that runs 95% of commercial automations",
    "Design relational database schemas and role-based client interfaces",
    "Extract structured JSON from complex multimodal documents using Claude 3.7",
    "Wire resilient Make.com scenarios with enterprise error directives",
    "Package 3 high-ticket services ($2,500-$4,500) and scale to $10,000/month retainers",
  ],
  modules: AI_SERVICE_BUSINESS_MODULES,
  testimonials: [
    {
      name: "Julian Rivera",
      role: "Operations Consultant",
      quote: "Standardizing on Airtable, Claude, and Make changed my business overnight. I closed two $3,500 setup projects in week three and both clients signed ongoing $850/month retainers.",
      handle: "@jrivera_ops",
    },
  ],
};
