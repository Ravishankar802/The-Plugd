const fs = require('fs');
const path = require('path');
const { courseTitle, courseId, courseSlug, modulesData } = require('./generate-playbook-7.cjs');
const { createLesson } = require('./curriculum-builder-helper.cjs');

console.log("Writing Playbook 7 (micro-saas-data.ts)...");

const processedModules = modulesData.map((m) => {
  const lessons = m.lessons.map((l) => {
    return createLesson({
      modNum: m.num,
      lesNum: l.lesNum,
      title: l.title,
      duration: l.duration,
      summary: l.summary,
      bulletPoints: l.bulletPoints,
      takeaway: l.takeaway,
      courseTitle,
      modTitle: m.title,
    });
  });

  return {
    id: m.id,
    number: String(m.num).padStart(2, "0"),
    title: m.title,
    description: m.description,
    duration: m.duration,
    lessons,
  };
});

const totalLessonsCount = processedModules.reduce((acc, m) => acc + m.lessons.length, 0);

const fileContent = `import type { Course, Module, Lesson, Slide } from "../playbooks-data";
import type { PlaybookDetailData, PlaybookDetailModule } from "../dating-playbook-detail";

export const MICRO_SAAS_SLUG = "${courseSlug}";
export const MICRO_SAAS_ID = "${courseId}";

const modulesMetadata = ${JSON.stringify(processedModules, null, 2)};

const courseModules: Module[] = modulesMetadata.map((mod) => ({
  id: mod.id,
  number: mod.number,
  title: mod.title,
  subtitle: \`Module \${mod.number} · \${mod.lessons.length} Lessons\`,
  description: mod.description,
  duration: mod.duration,
  lessonsCount: mod.lessons.length,
  lessons: mod.lessons.map((l) => ({
    id: l.id,
    number: l.number,
    title: l.title,
    duration: l.duration,
    summary: l.summary,
    slides: l.slides as Slide[],
    writtenLesson: l.writtenLesson,
  })),
}));

const detailModules: PlaybookDetailModule[] = modulesMetadata.map((mod) => ({
  id: mod.id,
  number: mod.number,
  title: mod.title,
  description: mod.description,
  duration: mod.duration,
  lessonsCount: mod.lessons.length,
  lessons: mod.lessons.map((l) => ({
    id: l.id,
    number: l.number,
    title: l.title,
    duration: l.duration,
    isPreview: l.id === "01-1",
  })),
}));

export const MICRO_SAAS_DETAIL_DATA: PlaybookDetailData = {
  id: MICRO_SAAS_ID,
  slug: MICRO_SAAS_SLUG,
  title: "${courseTitle}",
  headline:
    "Follow the proven 7-day sprint blueprint to architect, build, monetize, and launch a profitable B2B micro-SaaS with AI, Next.js 15, and Supabase.",
  description:
    "An exhaustive, practical, day-by-day technical masterclass that guides you through building a production-ready AI micro-SaaS in 7 days. Master 24-hour problem validation, Next.js 15 App Router scaffolding, Supabase PostgreSQL with Row Level Security, frontier LLM streaming integration (Claude 3.7 & GPT-4o), credit-based usage metering, Stripe subscription billing, Upstash Redis edge rate limiting, and Product Hunt launch distribution.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "Bestseller",
  rating: 4.9,
  ratingCount: 384,
  studentsCount: "1,890",
  instructorName: "Plugd SaaS Engineering Team",
  instructorTitle: "Full-Stack SaaS Founders & Systems Architects",
  instructorBio:
    "The Plugd SaaS Engineering Team builds, launches, and scales modern cloud applications and AI-native micro-SaaS products, with multiple acquisitions and thousands of active paying subscribers worldwide.",
  instructorRating: 4.9,
  instructorReviews: "384",
  instructorStudents: "1,890",
  instructorCourses: 6,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "7.0 hours",
  modulesCount: ${processedModules.length},
  lessonsCount: ${totalLessonsCount},
  whatYouWillLearn: [
    "Validate high-intent B2B micro-SaaS problems in 24 hours by mining G2 and Reddit complaints",
    "Scaffold a Next.js 15 App Router, Tailwind CSS, TypeScript, and Shadcn UI project in minutes",
    "Design a secure PostgreSQL relational schema with Supabase Row Level Security (RLS) policies",
    "Integrate Claude 3.7 and OpenAI frontier APIs with strict deterministic Zod JSON schema validation",
    "Build real-time streaming AI response interfaces using the Vercel AI SDK for instant UX",
    "Implement passwordless Supabase Auth, protected middleware routes, and atomic credit metering",
    "Set up Stripe recurring subscription billing, webhook signature verification, and customer portals",
    "Harden your production app using Upstash Redis sliding window edge rate limiting and Sentry telemetry",
    "Execute the Day 7 launch playbook on Product Hunt, Twitter/X build-in-public, and Reddit to land your first 100 paying users",
  ],
  relatedTopics: [
    "Micro-SaaS",
    "Next.js 15 & Supabase",
    "Claude 3.7 & GPT-4o",
    "Stripe Subscriptions",
    "Product Hunt Launch",
    "Solo Founder SaaS",
  ],
  requirements: [
    "Basic familiarity with JavaScript/TypeScript, React, or modern web development concepts",
    "A computer with Node.js installed and free accounts on GitHub, Vercel, and Supabase",
    "No prior machine learning or deep neural network engineering background required",
  ],
  descriptionSections: {
    intro: [
      "The traditional advice of spending 6 to 9 months quietly coding a massive software platform in isolation is dead. In the modern AI era, lone founders are building, monetizing, and launching highly profitable, single-utility micro-SaaS products in a single 7-day sprint.",
      "By leveraging modern development primitives—Next.js 15 Server Components, Supabase PostgreSQL with Row Level Security, Shadcn UI, frontier AI APIs, and Stripe Billing—you eliminate 90% of legacy boilerplate and focus entirely on solving one expensive problem exceptionally well.",
      "This complete Playbook is an exhaustive, production-grade implementation guide. Day by day, from problem validation on Day 1 to public launch on Day 7, you will build and deploy a fully monetized, production-hardened micro-SaaS capable of generating predictable recurring revenue.",
    ],
    keyPointsTitle: "Comprehensive 7-Day Sprint Curriculum Roadmap",
    keyPoints: [
      "Module 1: Day 1 — Problem Validation, Wireframing & Scope Containment",
      "Module 2: Day 2 — Modern Full-Stack Scaffolding & Database Architecture",
      "Module 3: Day 3 — LLM Orchestration, Prompt Engineering & API Integration",
      "Module 4: Day 4 — Authentication, Multi-Tenancy & Usage-Based Metering",
      "Module 5: Day 5 — Stripe Subscriptions, Checkout & Webhook Reconciliation",
      "Module 6: Day 6 — Production Hardening, Rate Limiting & Telemetry",
      "Module 7: Day 7 — Launch Architecture, Product Hunt, First 100 Paying Users & Scale",
    ],
    closing: [
      "Every lesson features comprehensive slide presentations and an exhaustive, publication-grade written lesson with real TypeScript code snippets, SQL schemas, and copy-paste configurations.",
      "Follow this day-by-day sprint to transform your software ideas into a live, revenue-generating micro-SaaS in 7 days.",
    ],
  },
  targetAudience: [
    "Software engineers, technical founders, and developers ready to ship products rapidly",
    "Freelancers and consultants looking to build recurring SaaS revenue assets",
    "Solo operators seeking a disciplined, step-by-step roadmap from idea to paying customers in 7 days",
  ],
  includes: [
    { iconName: "layers", text: "${processedModules.length} Comprehensive Modules & ${totalLessonsCount} Structured Lessons" },
    { iconName: "file-text", text: "Interactive Slide Presentations & Full Written Guides" },
    { iconName: "video", text: "Complete Next.js 15 Codebases, Supabase SQL Schemas & Stripe Webhooks" },
    { iconName: "smartphone", text: "Optimized for Mobile, Tablet & Desktop Learning" },
    { iconName: "infinity", text: "Full Lifetime Access & Ongoing Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" },
  ],
  modules: detailModules,
  testimonials: [
    {
      name: "Alexander Kim",
      role: "Solo SaaS Founder, DocuSync AI",
      rating: 5,
      quote:
        "Following the Day-by-Day sprint allowed me to build and launch DocuSync AI in exactly 7 days. The Supabase RLS and Stripe webhook chapters saved me dozens of hours. Hit $3,200 MRR in month two.",
      initials: "AK",
      date: "October 2026",
    },
    {
      name: "Maya Patel",
      role: "Full-Stack Engineer & Creator",
      rating: 5,
      quote:
        "The best practical SaaS course on the internet. No filler, pure execution. The Zod structured output logic and Upstash Redis rate limiting alone made this worth 100x the purchase price.",
      initials: "MP",
      date: "October 2026",
    },
  ],
  faqs: [
    {
      question: "Can I really build and launch a working micro-SaaS in just 7 days?",
      answer:
        "Yes! By ruthlessly adhering to the 1-Core-Action Rule in Module 1 and standardizing on the modern velocity stack (Next.js 15, Shadcn UI, Supabase, and Stripe), all boilerplate is eliminated so you only build the unique transformation logic.",
    },
    {
      question: "What technical prerequisites are needed for this playbook?",
      answer:
        "Basic familiarity with JavaScript or TypeScript and modern React concepts is helpful. You do not need machine learning expertise or prior cloud DevOps experience.",
    },
    {
      question: "Are complete slide presentations and full written guides included?",
      answer:
        "Yes! Every single one of the ${totalLessonsCount} lessons contains both a visual presentation slide deck and an extensive, publication-grade written lesson switchable with a single click.",
    },
    {
      question: "How does the curriculum cover acquiring paying users?",
      answer:
        "Module 7 is dedicated entirely to distribution: Product Hunt top-5 launch mechanics, 60-second viral video demonstrations for Twitter/X, targeted Reddit forum seeding, and automated 4-step email onboarding drips that convert free users into paying subscribers.",
    },
  ],
};

export const DETAIL_MICRO_SAAS_DATA = MICRO_SAAS_DETAIL_DATA;

export const MICRO_SAAS_COURSE: Course = {
  id: MICRO_SAAS_ID,
  slug: MICRO_SAAS_SLUG,
  categorySlug: "ai-businesses",
  categoryName: "AI Businesses",
  title: "${courseTitle}",
  shortTitle: "Build a Micro-SaaS in 7 Days",
  audience: "Software Engineers, Solo Founders & Technical Builders",
  targetGender: "for-all",
  headline:
    "Follow the proven 7-day sprint blueprint to architect, build, monetize, and launch a profitable B2B micro-SaaS with AI, Next.js 15, and Supabase.",
  subheadline:
    "An exhaustive, practical, day-by-day technical masterclass that guides you through building a production-ready AI micro-SaaS in 7 days.",
  description:
    "A complete operational curriculum detailing how to validate, scaffold, build, monetize, and launch a profitable AI micro-SaaS in 7 days.",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  badge: "Bestseller",
  rating: 4.9,
  ratingCount: 384,
  hoursOfMaterial: "7.0 hours",
  modulesCount: ${processedModules.length},
  lessonsCount: ${totalLessonsCount},
  primaryColor: "#4f46e5",
  accentColor: "#06b6d4",
  outcomes: [
    "Validate high-intent B2B software ideas in under 24 hours",
    "Scaffold modern Next.js 15 App Router applications with Shadcn UI and TypeScript",
    "Model scalable PostgreSQL schemas with Supabase Row Level Security",
    "Stream frontier LLM responses using Vercel AI SDK and strict Zod JSON schemas",
    "Implement Stripe subscription billing, customer portals, and verified webhooks",
    "Launch on Product Hunt and acquire your first 100 paying customers",
  ],
  modules: courseModules,
  testimonials: [
    {
      name: "Alexander Kim",
      role: "Solo SaaS Founder, DocuSync AI",
      quote:
        "Following the Day-by-Day sprint allowed me to build and launch DocuSync AI in exactly 7 days. The Supabase RLS and Stripe webhook chapters saved me dozens of hours. Hit $3,200 MRR in month two.",
      handle: "@alexkim_saas",
    },
  ],
};
`;

fs.writeFileSync(path.join(__dirname, '../src/lib/playbooks/micro-saas-data.ts'), fileContent, 'utf8');
console.log("Updated src/lib/playbooks/micro-saas-data.ts successfully!");
