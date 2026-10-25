import type { Course, Module, Lesson } from "./playbooks-data";
import { AI_AUTOMATIONS_MODULES_METADATA } from "./ai-automations-curriculum";
import { MODULE_01_LESSONS, MODULE_02_LESSONS } from "./ai-automations-content-1";
import { MODULE_03_LESSONS, MODULE_04_LESSONS, MODULE_05_LESSONS } from "./ai-automations-content-2";
import { MODULE_06_LESSONS, MODULE_07_LESSONS } from "./ai-automations-content-3";

const ALL_LESSON_COLLECTIONS = [
  MODULE_01_LESSONS,
  MODULE_02_LESSONS,
  MODULE_03_LESSONS,
  MODULE_04_LESSONS,
  MODULE_05_LESSONS,
  MODULE_06_LESSONS,
  MODULE_07_LESSONS,
];

export const AI_AUTOMATIONS_MODULES: Module[] = AI_AUTOMATIONS_MODULES_METADATA.map((meta, idx) => {
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

export const AI_AUTOMATIONS_PLAYBOOK_COURSE: Course = {
  id: "ai-businesses-01",
  slug: "7-ai-automations" as any,
  categorySlug: "ai-businesses",
  categoryName: "AI Businesses",
  title: "These 3 AI Businesses Will Make You $10k+/Month (With Zero Employees)",
  shortTitle: "3 AI Businesses to $10k+/Month",
  audience: "Beginners, Freelancers & Aspiring Entrepreneurs" as any,
  targetGender: "for-all" as any,
  headline: "Master the 3 proven AI business models to reach $10,000+/month as a solo operator with zero employees.",
  subheadline:
    "A practical, comprehensive guide to the 3 dominant zero-employee AI businesses: AI Automation Agency, Short-Form Content Studio, and AI Shadow Operating. Reach $10,000+/month with zero employees.",
  description:
    "A comprehensive, practical playbook breaking down the 3 dominant zero-employee AI businesses: AI Workflow Automation Agency (AAA), AI Short-Form Content Studio, and AI Shadow Operating. Learn the unit economics of $10,000/month, the 5-criteria evaluation framework, no-code tool stacks, client acquisition without ad spend, and asymmetric 70/30 creator revenue shares.",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  badge: "Bestseller",
  rating: 4.9,
  ratingCount: 384,
  hoursOfMaterial: "7.5 hours",
  slidesCount: 112,
  modulesCount: AI_AUTOMATIONS_MODULES.length,
  lessonsCount: AI_AUTOMATIONS_MODULES.reduce((acc, m) => acc + m.lessons.length, 0),
  primaryColor: "#0f766e",
  accentColor: "#f59e0b",
  outcomes: [
    "Evaluate AI opportunities using the 5-criteria matrix: Difficulty, Time, Scalability, Income, and Stress",
    "Master the rigorous unit economics required to build a predictable $10,000+/month recurring income stream solo",
    "Build speed-to-lead and operations automation engines using Make.com, Airtable, and OpenAI APIs",
    "Deploy a batch short-form video assembly line producing 30 vertical assets in 4 hours",
    "Partner with 15k–75k micro-creators on 70/30 revenue-share Skool launches with zero upfront capital",
  ],
  modules: AI_AUTOMATIONS_MODULES,
  testimonials: [
    {
      name: "Marcus Vance",
      role: "Operations Consultant",
      quote: "The unit economics breakdown in Module 1 and the 3-minute Loom teardown strategy in Module 6 helped me land 3 local business retainers at $2,000/month each in less than 3 weeks.",
      handle: "@marcus_ops",
    },
    {
      name: "Elena Rostova",
      role: "AI Creative Studio Founder",
      quote: "The batch short-form production pipeline saved my sanity. I produce 30 vertical videos in a single afternoon and manage 4 founder retainers at $2,500/month solo.",
      handle: "@elena_creative",
    },
  ],
};
