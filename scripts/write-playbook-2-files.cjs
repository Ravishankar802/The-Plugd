const fs = require('fs');
const path = require('path');
const { courseTitle, courseId, courseSlug, modulesData } = require('./generate-playbook-2.cjs');
const { createDeepLesson } = require('./curriculum-builder-helper.cjs');

console.log("Writing Playbook 2 files (7 modules, 28 lessons)...");

// 1. Build metadata
const metadata = modulesData.map((m) => {
  const lessons = m.lessons.map((l) => ({
    id: `${String(m.num).padStart(2, "0")}-${l.lesNum}`,
    number: `${m.num}.${l.lesNum}`,
    title: l.title,
    duration: l.duration,
    summary: l.summary,
  }));
  return {
    id: m.id,
    number: String(m.num).padStart(2, "0"),
    title: m.title,
    description: m.description,
    duration: m.duration,
    lessonsCount: lessons.length,
    lessons,
  };
});

// Write src/lib/ai-service-business-curriculum.ts
const curriculumTs = `export interface LessonMetadata {
  id: string;
  number: string;
  title: string;
  duration: string;
  summary: string;
}

export interface ModuleMetadata {
  id: string;
  number: string;
  title: string;
  description: string;
  duration: string;
  lessonsCount: number;
  lessons: LessonMetadata[];
}

export const AI_SERVICE_BUSINESS_MODULES_METADATA: ModuleMetadata[] = ${JSON.stringify(metadata, null, 2)};

export const AI_SERVICE_BUSINESS_CURRICULUM = {
  totalModules: ${metadata.length},
  totalLessons: ${metadata.reduce((acc, m) => acc + m.lessons.length, 0)},
  estimatedHours: "7.0 hours",
  modules: AI_SERVICE_BUSINESS_MODULES_METADATA,
};
`;

fs.writeFileSync(path.join(__dirname, '../src/lib/ai-service-business-curriculum.ts'), curriculumTs, 'utf8');
console.log("Updated src/lib/ai-service-business-curriculum.ts");

// Helper to build lessons array for a range of modules
function buildModuleLessons(startIdx, endIdx) {
  let output = `import { Lesson } from "@/lib/playbooks-data";\n\n`;
  output += `export interface ExtendedLesson extends Lesson {\n  learningObjective: string;\n  writtenLesson: string;\n  takeaway: string;\n}\n\n`;

  for (let idx = startIdx; idx < endIdx; idx++) {
    const m = modulesData[idx];
    const fullLessons = m.lessons.map((l) => {
      const lesObj = createDeepLesson({
        modNum: m.num,
        lesNum: l.lesNum,
        title: l.title,
        duration: l.duration,
        summary: l.summary,
        bulletPointsSlide1: l.bulletPoints,
        takeawaySlide1: l.takeaway,
        workedCalculations: l.workedCalculations,
        codeOrSchema: l.codeOrSchema,
        courseTitle,
        modTitle: m.title,
      });
      return {
        ...lesObj,
        learningObjective: l.summary,
        takeaway: l.takeaway,
      };
    });

    const constName = `MODULE_${String(m.num).padStart(2, "0")}_LESSONS`;
    output += `// ==========================================\n// MODULE ${String(m.num).padStart(2, "0")}: ${m.title}\n// ==========================================\n`;
    output += `export const ${constName}: ExtendedLesson[] = ${JSON.stringify(fullLessons, null, 2)};\n\n`;
  }
  return output;
}

// Write content-1 (Modules 1, 2)
fs.writeFileSync(path.join(__dirname, '../src/lib/ai-service-business-content-1.ts'), buildModuleLessons(0, 2), 'utf8');
console.log("Updated src/lib/ai-service-business-content-1.ts");

// Write content-2 (Modules 3, 4, 5)
fs.writeFileSync(path.join(__dirname, '../src/lib/ai-service-business-content-2.ts'), buildModuleLessons(2, 5), 'utf8');
console.log("Updated src/lib/ai-service-business-content-2.ts");

// Write content-3 (Modules 6, 7)
fs.writeFileSync(path.join(__dirname, '../src/lib/ai-service-business-content-3.ts'), buildModuleLessons(5, 7), 'utf8');
console.log("Updated src/lib/ai-service-business-content-3.ts");

// Write ai-service-business-course.ts
const courseTs = `import type { Course, Module, Lesson } from "./playbooks-data";
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
    subtitle: \`Module \${meta.number} · \${meta.lessons.length} Lessons\`,
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
`;
fs.writeFileSync(path.join(__dirname, '../src/lib/ai-service-business-course.ts'), courseTs, 'utf8');
console.log("Updated src/lib/ai-service-business-course.ts");

// Update detail-data and detail.ts
const totalLessonsCount = metadata.reduce((acc, m) => acc + m.lessons.length, 0);

const detailDataTs = `import type { PlaybookDetailData } from "./dating-playbook-detail";
import { AI_SERVICE_BUSINESS_MODULES_METADATA } from "./ai-service-business-curriculum";

export const DETAIL_AI_SERVICE_BUSINESS_DATA: PlaybookDetailData = {
  id: "ai-businesses-02",
  slug: "build-a-10000-month-ai-service-business-with-just-3-core-tools",
  title: "Build a $10,000/Month AI Service Business With Just 3 Core Tools",
  headline:
    "Master the 3 high-leverage tools to build, package, and sell high-ticket AI automation services to B2B clients.",
  description:
    "A comprehensive, practical roadmap teaching you how to build a 5-figure monthly recurring AI service business using Airtable, Claude 3.7, and Make.com. Learn to package high-demand services, close clients with value-anchored proposals, and scale with recurring retainers.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "High Demand",
  rating: 4.9,
  ratingCount: 247,
  studentsCount: "1,180",
  instructorName: "Plugd Enterprise Systems Team",
  instructorTitle: "B2B Automation Architects & Agency Advisors",
  instructorBio:
    "The Plugd Enterprise Systems Team has deployed automated workflows for mid-market logistics, legal, and real estate firms, generating over $2.4M in client operational savings.",
  instructorRating: 4.9,
  instructorReviews: "247",
  instructorStudents: "1,180",
  instructorCourses: 3,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "7.0 hours",
  modulesCount: ${metadata.length},
  lessonsCount: ${totalLessonsCount},
  whatYouWillLearn: [
    "Master the 3-tool architecture (Airtable, Claude 3.7, Make.com) that runs 95% of commercial B2B automations",
    "Design relational database schemas with normalized linked tables and role-based client interfaces",
    "Harness Claude 3.7 Sonnet for multimodal PDF extraction, confidence scoring, and strict JSON schemas",
    "Wire resilient Make.com scenarios with enterprise error directives (Resume, Break, Rollback) that never crash",
    "Package 3 high-ticket services: Speed-to-Lead Triage ($2,500), AP Invoice Auditor ($3,500), and Operations Hub ($4,500)",
    "Close clients using the 5-minute Trojan Horse personalized video audit with 25%+ call booking rates",
    "Draft airtight Statements of Work that eliminate scope creep and enforce recurring monthly maintenance retainers",
    "Manage 8 to 10 ongoing client retainers in under 15 hours a week with automated health diagnostic alerts",
  ],
  relatedTopics: [
    "Airtable",
    "Claude 3.7",
    "Make.com",
    "B2B Retainers",
    "AI Agency Operations",
    "Relational Databases",
    "Consulting Sales",
  ],
  requirements: [
    "A computer with an internet connection and modern web browser",
    "No programming degree or previous software engineering experience required",
    "Free-tier accounts on Airtable, Anthropic Console, and Make.com (setup guided inside)",
  ],
  descriptionSections: {
    intro: [
      "Most agency founders make the mistake of chasing 20 different AI tools, resulting in fragile systems, constant breaking changes, and operational exhaustion. Elite service businesses do the exact opposite: they master 3 core, foundational tools and deploy them with surgical precision.",
      "Airtable provides enterprise relational state and custom client interfaces. Claude 3.7 delivers world-class multimodal reasoning and structured data extraction. Make.com provides the visual execution fabric that orchestrates the entire ecosystem.",
      "By standardizing on this 3-tool architecture, you can deliver enterprise-grade automation solutions in days rather than months, command $3,000+ setup fees, and secure predictable $1,000/month recurring retainers.",
    ],
    keyPointsTitle: "Comprehensive 7-Module Curriculum Overview",
    keyPoints: [
      "Module 1: The 3-Tool Architecture & $10,000/Month Business Model",
      "Module 2: Core Tool 1 — Airtable as the Enterprise Relational Database",
      "Module 3: Core Tool 2 — Claude 3.7 for Reasoning, Synthesis & Extraction",
      "Module 4: Core Tool 3 — Make.com for Frictionless Orchestration & Integrations",
      "Module 5: Packaging 3 High-Ticket Commercial Services ($2,500–$4,500 Sprints)",
      "Module 6: Client Acquisition & The 5-Minute 'Trojan Horse' Loom Audit",
      "Module 7: Operations, SLA Contracts & Scaling to $10,000/Month Retainers",
    ],
    closing: [
      "Every single one of the 28 lessons contains both a complete visual slide presentation and an in-depth, step-by-step written implementation guide.",
      "Whether you are launching your first freelance offer or expanding an established consulting agency, this Playbook gives you the exact tactical blueprints to deliver tangible commercial value.",
    ],
  },
  targetAudience: [
    "Freelancers and consultants ready to package high-ticket AI automation services",
    "Agency founders seeking predictable $1,000/month recurring client retainers with 90%+ margins",
    "No-code builders looking to standardize on a reliable, enterprise-grade software stack",
    "Professionals wanting to build a location-independent $10,000/month business with zero employees",
  ],
  includes: [
    { iconName: "layers", text: "${metadata.length} Structured Modules & ${totalLessonsCount} Comprehensive Lessons" },
    { iconName: "file-text", text: "Interactive Slide Presentations & Complete Step-by-Step Written Guides" },
    { iconName: "video", text: "Ready-to-Import Airtable Schemas, Claude Prompts & Make.com Blueprints" },
    { iconName: "file-text", text: "Tested Video Audit Pitch Scripts, Statement of Work Agreements & Retainer Contracts" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" },
  ],
  modules: AI_SERVICE_BUSINESS_MODULES_METADATA.map((mod) => ({
    id: mod.id,
    number: mod.number,
    title: mod.title,
    description: mod.description,
    duration: mod.duration,
    lessonsCount: mod.lessons.length,
    lessons: mod.lessons.map((les) => ({
      id: les.id,
      number: les.number,
      title: les.title,
      duration: les.duration,
      summary: les.summary,
      isPreview: les.id === "01-1",
    })),
  })),
  testimonials: [
    {
      name: "Julian Rivera",
      role: "Operations Consultant",
      rating: 5,
      quote: "Standardizing on Airtable, Claude, and Make changed my business overnight. I closed two $3,500 setup projects in week three and both clients signed ongoing $850/month retainers.",
      initials: "JR",
      date: "October 2026",
    },
    {
      name: "Sarah Lindqvist",
      role: "B2B Automation Agency Founder",
      rating: 5,
      quote: "The AP Invoice Auditor blueprint alone is worth ten times the price of this playbook. Deployed it for a regional logistics firm and saved them 25 hours a week from day one.",
      initials: "SL",
      date: "October 2026",
    },
  ],
  faqs: [
    {
      question: "Why only 3 tools instead of learning 10 or 15 different apps?",
      answer: "Airtable handles state, Claude handles thinking, and Make handles doing. These three tools cover 95% of commercial automation requirements. Fewer tools mean deeper mastery, zero maintenance headaches, and higher profit margins.",
    },
    {
      question: "Do I need any programming or software engineering background?",
      answer: "No. All 3 tools use visual drag-and-drop interfaces or conversational prompt instructions. You do not need to write code to build, deploy, and monetize these workflows.",
    },
    {
      question: "Are both slide decks and full written lessons included?",
      answer: "Yes! Every single one of the 28 lessons includes a complete executive slide deck and an extensive, step-by-step written lesson switchable with a single click.",
    },
    {
      question: "Can I use these blueprints directly for my own paying clients?",
      answer: "Yes, you receive full commercial rights to use, customize, and deploy all Airtable templates, prompt frameworks, Make scenarios, and sales contract agreements for your clients.",
    },
  ],
};

export const AI_SERVICE_BUSINESS_DETAIL_DATA = DETAIL_AI_SERVICE_BUSINESS_DATA;
`;

fs.writeFileSync(path.join(__dirname, '../src/lib/ai-service-business-detail-data.ts'), detailDataTs, 'utf8');
fs.writeFileSync(path.join(__dirname, '../src/lib/ai-service-business-detail.ts'), detailDataTs, 'utf8');
console.log("Updated src/lib/ai-service-business-detail-data.ts & detail.ts");

console.log("Playbook 2 files written successfully!");
