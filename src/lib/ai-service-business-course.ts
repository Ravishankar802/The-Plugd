import type { Course, Module, Lesson } from "./playbooks-data";
import { AI_SERVICE_BUSINESS_MODULES_METADATA } from "./ai-service-business-curriculum";
import { MODULE_01_LESSONS, MODULE_02_LESSONS } from "./ai-service-business-content-1";
import { MODULE_03_LESSONS, MODULE_04_LESSONS } from "./ai-service-business-content-2";
import { MODULE_05_LESSONS, MODULE_06_LESSONS, MODULE_07_LESSONS } from "./ai-service-business-content-3";

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
  slug: "build-a-10000-month-ai-service-business-with-just-3-core-tools",
  categorySlug: "ai-businesses",
  categoryName: "AI Businesses",
  title: "Build a $10,000/Month AI Service Business With Just 3 Core Tools",
  shortTitle: "$10K AI Service Business",
  audience: "Freelancers, Consultants & Aspiring Agency Founders",
  targetGender: "for-all",
  headline:
    "Master the 3 high-leverage tools to build, package, and sell high-ticket AI automation services to B2B clients.",
  subheadline:
    "A comprehensive, practical roadmap teaching you how to build a 5-figure monthly recurring AI service business using Airtable, Claude 3.7, and Make.com.",
  description:
    "A step-by-step curriculum guiding you through designing relational databases, building cognitive decision engines with Claude 3.7, orchestrating workflows with Make.com, and signing $1,000/month client retainers.",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  badge: "High Demand",
  rating: 4.9,
  ratingCount: 247,
  hoursOfMaterial: "7.0 hours",
  modulesCount: AI_SERVICE_BUSINESS_MODULES.length,
  lessonsCount: 49,
  primaryColor: "#064e3b",
  accentColor: "#10b981",
  stats: [
    { label: "Modules", value: String(AI_SERVICE_BUSINESS_MODULES.length) },
    { label: "Lessons", value: String(49) },
    { label: "Formats", value: "Slides & Written" },
    { label: "Access", value: "Lifetime" },
  ],
  outcomes: [
    "Master the 3-tool architecture (Airtable, Claude 3.7, Make.com) for enterprise B2B delivery",
    "Design normalized relational databases and publish client portal interfaces in Airtable",
    "Extract data from 50+ page PDFs and enforce strict JSON schemas using Claude 3.7 Sonnet",
    "Build bulletproof Make.com pipelines with enterprise Break and Resume error handling directives",
    "Package, price, and sell 3 core offerings ($2,500 setup + $1,000/month recurring retainers)",
    "Book discovery calls using the 5-minute Trojan Horse Loom audit formula",
    "Scale to $10,000/month in recurring retainer revenue operating in under 15 hours a week",
  ],
  testimonials: [
    {
      name: "Julian Rivera",
      role: "Operations Consultant",
      quote: "Standardizing on Airtable, Claude, and Make changed my business overnight. I closed two $3,500 setup projects in week three and both clients signed ongoing $850/month retainers.",
      handle: "@julian_rivera",
    },
  ],
  modules: AI_SERVICE_BUSINESS_MODULES,
};
