import type { Course, Module, Lesson } from "./playbooks-data";
import { AI_AUTOMATIONS_MODULES_METADATA } from "./ai-automations-curriculum";
import { MODULE_01_LESSONS, MODULE_02_LESSONS, MODULE_03_LESSONS } from "./ai-automations-content-1";
import { MODULE_04_LESSONS, MODULE_05_LESSONS, MODULE_06_LESSONS } from "./ai-automations-content-2";
import { MODULE_07_LESSONS, MODULE_08_LESSONS, MODULE_09_LESSONS } from "./ai-automations-content-3";

const ALL_LESSON_COLLECTIONS = [
  MODULE_01_LESSONS,
  MODULE_02_LESSONS,
  MODULE_03_LESSONS,
  MODULE_04_LESSONS,
  MODULE_05_LESSONS,
  MODULE_06_LESSONS,
  MODULE_07_LESSONS,
  MODULE_08_LESSONS,
  MODULE_09_LESSONS,
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
  title: "7 AI Automation Tools That Could Make You $10,000+",
  shortTitle: "7 AI Automation Tools",
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
  modulesCount: AI_AUTOMATIONS_MODULES.length,
  lessonsCount: 36,
  hoursOfMaterial: "6.5 hours",
  accentColor: "#2563eb",
  stats: [
    { label: "Modules", value: "9" },
    { label: "Lessons", value: "36" },
    { label: "Formats", value: "Slides & Written" },
    { label: "Access", value: "Lifetime" },
  ],
  highlights: [
    "No-Code Fundamentals: Understanding AI automation in plain English without technical jargon",
    "Tool 1 (Make.com): Connecting forms, spreadsheets, and emails into automatic lead notification flows",
    "Tool 2 (Custom GPTs): Building tailored AI helpers loaded with custom instructions and guidelines",
    "Tool 3 (ManyChat): Automated Instagram comment-to-DM funnels that capture leads 24/7",
    "Tool 4 (Notion AI): Centralizing company operations, project trackers, and client hubs",
    "Tool 5 (Opus Clip & Descript): Turning 1 long video into 10 viral captioned short-form clips",
    "Tool 6 (Canva Magic Studio): Bulk-creating 30 branded social media graphics and marketing packs",
    "Tool 7 (Perplexity AI): Fast market research, competitor audits, and verified lead list sourcing",
    "Client Acquisition Blueprint: Packaging simple services, warm outreach, and monthly retainers",
  ],
  modules: AI_AUTOMATIONS_MODULES,
  faqs: [
    {
      question: "What is included in 7 AI Automation Tools That Could Make You $10,000+?",
      answer:
        "The Playbook contains 9 beginner-friendly modules and 36 complete lessons with interactive slide presentations and in-depth written walkthroughs, step-by-step screenshots, real-world pricing guides, and practical action tasks covering 7 distinct no-code AI tools.",
    },
    {
      question: "Do I need any programming or technical skills to use this Playbook?",
      answer:
        "No. There are zero prerequisites. You do not need to know coding, software engineering, APIs, or databases. All 7 tools are visual, drag-and-drop, or conversational tools that anyone with a computer can master.",
    },
    {
      question: "Why does the title say 'Could Make You $10,000+'?",
      answer:
        "The $10,000 figure is a realistic cumulative milestone broken down mathematically throughout the course (for example, 10 client projects at $1,000 each, or 5 monthly clients on a $400/month retainer over 5 months). It is an achievable target based on real client services, not an overnight guarantee.",
    },
    {
      question: "Is this a one-time purchase?",
      answer:
        "Yes, exactly $3 USD one-time payment with lifetime access. Includes both the presentation slide decks and comprehensive written guides with all future updates.",
    },
  ],
  testimonials: [
    {
      name: "Marcus Vance",
      handle: "@marcus_v",
      role: "Freelance Consultant",
      quote:
        "The step-by-step walkthroughs make everything click. Setting up the Make.com lead notification took me 30 minutes, and I closed my first local contractor client for $450 the following week.",
    },
    {
      name: "Devon Reed",
      handle: "@devon_ai",
      role: "Agency Founder",
      quote:
        "The explanation of how to package simple services without tech jargon is worth 100x the price. Breaking down $10,000 into bite-sized projects makes the goal feel completely realistic.",
    },
  ],
};
