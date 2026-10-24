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
  headline: "Learn 7 accessible AI automation tools to save businesses time, offer simple services, and build real income streams.",
  subheadline:
    "A practical, beginner-friendly guide to 7 no-code AI tools. Learn how to set up time-saving workflows, package them into valuable client services, and reach the $10,000 income milestone.",
  description:
    "A step-by-step, no-code playbook teaching complete beginners how to master 7 practical AI automation tools. Learn how to connect everyday business apps, build custom assistants, automate social media DMs, repurpose videos, and land paying clients with zero coding experience.",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  badge: "Bestseller",
  rating: 4.9,
  ratingCount: 384,
  hoursOfMaterial: "7.0 hours",
  modulesCount: AI_AUTOMATIONS_MODULES.length,
  lessonsCount: AI_AUTOMATIONS_MODULES.reduce((acc, m) => acc + m.lessons.length, 0),
  primaryColor: "#0f766e",
  accentColor: "#f59e0b",
  outcomes: [
    "Master the 7 foundational no-code automation tools",
    "Build custom OpenAI Assistants with tool calling and grounded RAG",
    "Design relational databases in Airtable and publish client portals in Softr",
    "Deploy 15-second missed-call text-back systems with Twilio",
    "Package high-ticket services into $2,500 sprints and $850/mo retainers",
  ],
  modules: AI_AUTOMATIONS_MODULES,
  testimonials: [
    {
      name: "Marcus Vance",
      role: "Operations Consultant",
      quote: "The Make.com and Airtable client portal blueprints allowed me to close a $3,500 operations hub for a boutique real estate firm on my second week.",
      handle: "@marcus_ops",
    },
  ],
};
