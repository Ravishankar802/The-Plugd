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
    "A comprehensive, practical roadmap teaching you how to build a 5-figure monthly recurring AI service business using Airtable, Claude 3.7, and Make.com. Learn the transparent unit economics, package high-value B2B deliverables, land clients with video audits, and manage recurring retainers with 90%+ profit margins.",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  modulesCount: AI_SERVICE_BUSINESS_MODULES.length,
  lessonsCount: 28,
  hoursOfMaterial: "5.5 hours",
  accentColor: "#10b981", // Emerald accent matching Agency Revenue OS
  stats: [
    { label: "Modules", value: "7" },
    { label: "Lessons", value: "28" },
    { label: "Formats", value: "Slides & Written" },
    { label: "Access", value: "Lifetime" },
  ],
  highlights: [
    "Airtable, Claude 3.7, & Make.com enterprise architecture",
    "Complete blueprints for Inbound Lead Triage, Document Extraction, and Content Repurposing",
    "Three-tier B2B pricing model: Sprints ($1,500–$3,500) + Monthly Retainers ($750–$1,500)",
    "Client acquisition using interactive prototypes and frictionless 3-minute video audits",
    "Automated weekly executive reporting for multi-year client retention",
  ],
  modules: AI_SERVICE_BUSINESS_MODULES,
  faqs: [
    {
      question: "Why specifically Airtable, Claude 3.7, and Make.com?",
      answer:
        "These three tools form the complete enterprise delivery stack: Airtable provides the relational database and client portal interfaces; Claude 3.7 delivers world-class cognitive reasoning and 200K-token document extraction; Make.com acts as the 24/7 cloud nervous system connecting them to customer forms, email, and CRMs. Master these three, and you can solve 99% of B2B operational bottlenecks without writing custom code.",
    },
    {
      question: "Do I need technical coding experience to succeed?",
      answer:
        "No. All three tools feature modern visual interfaces. We teach you how to think in terms of relational schemas, system prompts, and visual webhook logic without writing code.",
    },
    {
      question: "Is the $10,000/month revenue figure guaranteed?",
      answer:
        "No. $10,000/month is an illustrative operational milestone broken down mathematically throughout the course (for example: 6 clients on a $1,250/mo retainer, or 2 sprint setups at $2,500 plus 5 retainers at $1,000/mo). Achieving it requires disciplined execution of the prospecting, delivery, and retention methodologies taught in the Playbook.",
    },
    {
      question: "Is this a recurring subscription or a one-time payment?",
      answer: "Exactly $3 USD one-time payment with lifetime access. No subscriptions or hidden fees.",
    },
  ],
  testimonials: [
    {
      name: "Marcus Vance",
      handle: "@marcus_v",
      role: "Founder, Apex Operations",
      quote:
        "The shift from pitching hourly chatbot builds to offering the Inbound Proposal Engine changed everything. Signed two commercial trade clients at $2,500 setup + $850/mo retainer in our first 30 days.",
    },
  ],
};
