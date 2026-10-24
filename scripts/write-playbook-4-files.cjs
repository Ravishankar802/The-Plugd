const fs = require('fs');
const path = require('path');
const { courseTitle, courseId, courseSlug, modulesData } = require('./generate-playbook-4.cjs');
const { createLesson } = require('./curriculum-builder-helper.cjs');

console.log("Writing Playbook 4 (freelance-income-data.ts)...");

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

export const FREELANCE_INCOME_SLUG = "${courseSlug}";
export const FREELANCE_INCOME_ID = "${courseId}";

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

export const FREELANCE_INCOME_DETAIL_DATA: PlaybookDetailData = {
  id: FREELANCE_INCOME_ID,
  slug: FREELANCE_INCOME_SLUG,
  title: "${courseTitle}",
  headline:
    "Master one high-leverage AI capability and monetize it through 4 distinct revenue models: Sprints, Retainers, Paid Audits, and Digital Systems.",
  description:
    "An exhaustive operational guide for modern freelancers, developers, and consultants seeking to escape the hourly billing trap and build a resilient multi-stream income engine. Master Structured Document AI and workflow orchestration, then turn that single core skill into high-ticket sprints, recurring retainers, paid audits, and digital system hubs.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "Bestseller",
  rating: 4.9,
  ratingCount: 312,
  studentsCount: "1,540",
  instructorName: "Plugd Freelance Advisory",
  instructorTitle: "Multi-Stream Freelance & Automation Strategists",
  instructorBio:
    "The Plugd Freelance Advisory specializes in guiding independent operators, technical freelancers, and boutique agencies away from hourly billing toward productized service sprints, retainer contracts, and high-margin asset sales.",
  instructorRating: 4.9,
  instructorReviews: "312",
  instructorStudents: "1,540",
  instructorCourses: 4,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "7.0 hours",
  modulesCount: ${processedModules.length},
  lessonsCount: ${totalLessonsCount},
  whatYouWillLearn: [
    "Master the high-demand Anchor Skill: Structured Data Extraction & B2B Document AI",
    "Build Stream #1: $2,500 Done-For-You Workflow Implementation Sprints delivered in 7 days",
    "Package Stream #2: $800 to $1,500/mo Workflow Maintenance & SLA Retainers with high retention",
    "Productize Stream #3: $500 Paid Technical Feasibility & Architecture Audits with Loom videos",
    "Scale Stream #4: $97 to $297 Digital Operating Systems, Blueprints & Asset Kits",
    "Construct the multi-stream client conversion funnel that turns 1 lead into 3 transaction types",
    "Run automated client acquisition using reverse-engineering Loom teardowns and B2B cold email",
    "Eliminate scope creep using fixed-scope sprint contracts and client sign-off acceptance protocols",
    "Structure an independent solo practice reaching $10,000–$15,000/month in under 25 hours per week",
  ],
  relatedTopics: [
    "Freelance Business",
    "Productized Services",
    "AI Consulting",
    "Monthly Retainers",
    "Make.com Automation",
    "Document AI & OCR",
  ],
  requirements: [
    "No computer science degree or advanced machine learning experience needed",
    "Basic familiarity with tools like Airtable, Make.com, or Zapier",
    "A computer with internet connection and access to frontier AI APIs",
  ],
  descriptionSections: {
    intro: [
      "Most freelancers make the mistake of trading hours for dollars, locking themselves into an exhausting hamster wheel where income instantly stops the moment they take time off.",
      "The modern AI consulting market does not reward generalists who offer 'ChatGPT assistance.' It rewards specialized operators who master one specific, high-leverage technical problem and package it across multiple commercial offers.",
      "In this complete Playbook, you will learn how to master Structured Document Extraction & Workflow Orchestration—then multiply that single capability into four complementary income streams: Rapid 7-day Sprints, Recurring Retainers, Paid Diagnostic Audits, and Scalable Digital Systems.",
    ],
    keyPointsTitle: "Comprehensive ${processedModules.length}-Module Curriculum Breakdown",
    keyPoints: [
      "Module 1: The Anchor Skill — Structured Extraction & Knowledge AI",
      "Module 2: Income Stream 1 — High-Ticket Implementation Sprints ($2,500+)",
      "Module 3: Income Stream 2 — Recurring Workflow Retainers ($800–$1,500/mo)",
      "Module 4: Income Stream 3 — Paid AI Audits & Architecture Reviews ($500)",
      "Module 5: Income Stream 4 — Productized Templates & System Hubs ($97–$297)",
      "Module 6: Multi-Stream Flywheel & Client Conversion Architecture",
      "Module 7: Solo Operations, Delegation & $15K/Month Scaling Blueprint",
    ],
    closing: [
      "Every lesson features comprehensive presentation slides and an extensive, publication-grade written guide packed with actionable SOPs, real client email templates, and pricing calculators.",
      "Follow this proven system to transition from an overworked commodity freelancer to a highly paid, multi-stream automation consultant.",
    ],
  },
  targetAudience: [
    "Freelancers, developers, and consultants seeking to escape hourly billing",
    "No-code and automation practitioners ready to productize their offerings",
    "Solo operators aiming to build predictable $10,000+ monthly recurring income streams",
  ],
  includes: [
    { iconName: "layers", text: "${processedModules.length} In-Depth Modules & ${totalLessonsCount} Structured Lessons" },
    { iconName: "file-text", text: "Interactive Slide Presentations & Full Written Guides" },
    { iconName: "video", text: "Complete Contracts, SOW Templates, Outreach Scripts & Retainer SOPs" },
    { iconName: "smartphone", text: "Optimized for Mobile, Tablet & Desktop Learning" },
    { iconName: "infinity", text: "Lifetime Digital Access & Continuous Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" },
  ],
  modules: detailModules,
  testimonials: [
    {
      name: "Marcus Vance",
      role: "Independent Systems Architect",
      rating: 5,
      quote:
        "The shift from hourly pricing to the $2,500 7-day sprint changed everything. Sold two sprints in month one, and both clients converted to $850/mo retainers using the Friday report playbook.",
      initials: "MV",
      date: "October 2026",
    },
    {
      name: "Sarah Jenkins",
      role: "Operations Consultant",
      rating: 5,
      quote:
        "The Paid Audit framework alone is worth 100x the price. I stopped doing free 60-minute discovery calls and sold 4 audits at $500 each last month. 3 of them immediately hired me for full sprint builds.",
      initials: "SJ",
      date: "October 2026",
    },
  ],
  faqs: [
    {
      question: "What is the single anchor skill taught in this playbook?",
      answer:
        "You will master Structured B2B Document Extraction & Workflow Orchestration—using multimodal AI (Claude 3.7, GPT-4o) and deterministic schema validation to transform messy incoming client documents into clean business databases.",
    },
    {
      question: "How do the 4 income streams work together?",
      answer:
        "Stream 3 (Paid Audits) serves as the low-friction entry point for skeptical clients. Stream 1 (Implementation Sprints) delivers the core transformation in 7 days for $2,500+. Stream 2 (Monthly Retainers) provides ongoing $800–$1,500/mo recurring income to maintain the workflow. Stream 4 (Digital Systems) monetizes leads who lack the budget for full custom delivery.",
    },
    {
      question: "Are slide presentations and written guides included for all lessons?",
      answer:
        "Yes! Every single one of the ${totalLessonsCount} lessons provides a full presentation slide deck and an extensive, in-depth written guide switchable in real time.",
    },
    {
      question: "Do I need an existing audience or portfolio to get started?",
      answer:
        "No. The curriculum includes our 5-minute video teardown framework and targeted cold outreach templates that allow you to land paying clients with zero existing social following.",
    },
  ],
};

export const DETAIL_FREELANCE_INCOME_DATA = FREELANCE_INCOME_DETAIL_DATA;

export const FREELANCE_INCOME_COURSE: Course = {
  id: FREELANCE_INCOME_ID,
  slug: FREELANCE_INCOME_SLUG,
  categorySlug: "ai-businesses",
  categoryName: "AI Businesses",
  title: "${courseTitle}",
  shortTitle: "1 AI Skill into 4 Income Streams",
  audience: "Freelancers, Consultants & Solo Operators",
  targetGender: "for-all",
  headline:
    "Master one high-leverage AI capability and monetize it through 4 distinct revenue models: Sprints, Retainers, Paid Audits, and Digital Systems.",
  subheadline:
    "An exhaustive operational guide for modern freelancers, developers, and consultants seeking to escape the hourly billing trap and build a resilient multi-stream income engine.",
  description:
    "A comprehensive curriculum detailing how to package, sell, and deliver four distinct revenue streams from a single core AI skill without hiring staff.",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  badge: "Bestseller",
  rating: 4.9,
  ratingCount: 312,
  hoursOfMaterial: "7.0 hours",
  modulesCount: ${processedModules.length},
  lessonsCount: ${totalLessonsCount},
  primaryColor: "#c2410c",
  accentColor: "#15803d",
  outcomes: [
    "Master Structured Document AI and B2B workflow orchestration",
    "Package and sell $2,500 Done-For-You Sprints delivered in 7 days",
    "Maintain high-retention $800–$1,500/mo workflow monitoring retainers",
    "Sell $500 paid diagnostic audits and productize $97–$297 digital templates",
    "Build an automated client acquisition engine using Loom video teardowns",
    "Scale to $10,000–$15,000/month as a solo consultant under 25 hours a week",
  ],
  modules: courseModules,
  testimonials: [
    {
      name: "Marcus Vance",
      role: "Independent Systems Architect",
      quote:
        "The shift from hourly pricing to the $2,500 7-day sprint changed everything. Sold two sprints in month one, and both clients converted to $850/mo retainers using the Friday report playbook.",
      handle: "@marcus_v",
    },
  ],
};
`;

fs.writeFileSync(path.join(__dirname, '../src/lib/playbooks/freelance-income-data.ts'), fileContent, 'utf8');
console.log("Updated src/lib/playbooks/freelance-income-data.ts successfully!");
