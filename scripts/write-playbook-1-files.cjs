const fs = require('fs');
const path = require('path');
const { courseTitle, courseId, courseSlug, modulesData } = require('./generate-playbook-1.cjs');
const { createDeepLesson } = require('./curriculum-builder-helper.cjs');

console.log("Writing Playbook 1 files (7 modules, 28 lessons)...");

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

// Write src/lib/ai-automations-curriculum.ts
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

export const AI_AUTOMATIONS_MODULES_METADATA: ModuleMetadata[] = ${JSON.stringify(metadata, null, 2)};

export const AI_AUTOMATIONS_CURRICULUM = {
  totalModules: ${metadata.length},
  totalLessons: ${metadata.reduce((acc, m) => acc + m.lessons.length, 0)},
  estimatedHours: "7.0 hours",
  modules: AI_AUTOMATIONS_MODULES_METADATA,
};
`;

fs.writeFileSync(path.join(__dirname, '../src/lib/ai-automations-curriculum.ts'), curriculumTs, 'utf8');
console.log("Updated src/lib/ai-automations-curriculum.ts");

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
fs.writeFileSync(path.join(__dirname, '../src/lib/ai-automations-content-1.ts'), buildModuleLessons(0, 2), 'utf8');
console.log("Updated src/lib/ai-automations-content-1.ts");

// Write content-2 (Modules 3, 4, 5)
fs.writeFileSync(path.join(__dirname, '../src/lib/ai-automations-content-2.ts'), buildModuleLessons(2, 5), 'utf8');
console.log("Updated src/lib/ai-automations-content-2.ts");

// Write content-3 (Modules 6, 7)
fs.writeFileSync(path.join(__dirname, '../src/lib/ai-automations-content-3.ts'), buildModuleLessons(5, 7), 'utf8');
console.log("Updated src/lib/ai-automations-content-3.ts");

// Write ai-automations-course.ts
const courseTs = `import type { Course, Module, Lesson } from "./playbooks-data";
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
    subtitle: \`Module \${meta.number} · \${meta.lessons.length} Lessons\`,
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
`;
fs.writeFileSync(path.join(__dirname, '../src/lib/ai-automations-course.ts'), courseTs, 'utf8');
console.log("Updated src/lib/ai-automations-course.ts");

// Update detail-data and detail.ts
const totalLessonsCount = metadata.reduce((acc, m) => acc + m.lessons.length, 0);

const detailDataTs = `import type { PlaybookDetailData } from "./dating-playbook-detail";
import { AI_AUTOMATIONS_MODULES_METADATA } from "./ai-automations-curriculum";

export const DETAIL_AI_AUTOMATIONS_DATA: PlaybookDetailData = {
  id: "ai-businesses-01",
  slug: "7-ai-automations",
  title: "7 AI Automation Tools That Could Make You $10,000+",
  headline:
    "Learn 7 accessible AI automation tools to save businesses time, offer simple services, and build real income streams.",
  description:
    "A step-by-step, no-code playbook teaching complete beginners how to master 7 practical AI automation tools. Learn how to connect everyday business apps, build custom assistants, automate social media DMs, repurpose videos, and land paying clients with zero coding experience.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "Bestseller",
  rating: 4.9,
  ratingCount: 384,
  studentsCount: "1,420",
  instructorName: "Plugd Automation Team",
  instructorTitle: "Systems Architects & Workflow Specialists",
  instructorBio:
    "The Plugd Automation Team advises growing agencies and consultants on deploying high-ROI no-code automations, client portals, and recurring service retainers.",
  instructorRating: 4.9,
  instructorReviews: "384",
  instructorStudents: "1,420",
  instructorCourses: 4,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "7.0 hours",
  modulesCount: ${metadata.length},
  lessonsCount: ${totalLessonsCount},
  whatYouWillLearn: [
    "Connect any everyday business apps using Make.com and n8n visual builders",
    "Build custom OpenAI Assistants with tool calling and grounded file search RAG",
    "Design relational databases in Airtable and publish client portals in Softr without code",
    "Generate personalized synthetic audio and outbound video prospecting campaigns with ElevenLabs & HeyGen",
    "Scrape live web data, track competitor pricing, and synthesize filings using Perplexity & DeepSeek",
    "Deploy high-converting SMS and WhatsApp missed-call text-back and appointment booking automations",
    "Package workflows into 3 high-margin productized offers and price setup sprints at $2,500+",
    "Close B2B clients using the 5-minute Trojan Horse Loom audit without aggressive pitching",
  ],
  relatedTopics: [
    "AI Automation",
    "Make.com",
    "n8n",
    "OpenAI API",
    "Airtable",
    "Softr",
    "B2B Retainers",
    "No-Code Development",
  ],
  requirements: [
    "No coding, programming, or previous technical experience required",
    "A computer with an internet connection and modern web browser",
    "Free-tier accounts for Make.com, Airtable, and OpenAI Platform (setup guided inside)",
  ],
  descriptionSections: {
    intro: [
      "AI automation is fundamentally transforming how modern businesses operate. Companies don't need complex research algorithms—they need reliable visual systems that eliminate repetitive data re-entry, recover missed customer inquiries, and streamline day-to-day operations.",
      "By mastering 7 practical visual tools, you gain the technical leverage to build complete operational hubs for clients in days instead of months. When you solve high-friction bottlenecks, business owners happily pay premium setup fees and ongoing monthly retainers.",
      "This Playbook delivers end-to-end curriculum, visual slide presentations, and step-by-step written implementation blueprints for each tool, guiding you all the way from zero experience to a thriving $10,000/month service business.",
    ],
    keyPointsTitle: "Comprehensive 7-Module Curriculum Overview",
    keyPoints: [
      "Module 1: The Automation Business Model & The $10,000 Milestone",
      "Module 2: Tool 1 — Make.com Visual Orchestration & Error Routing",
      "Module 3: Tool 2 — n8n Self-Hosted Automation & Data Privacy",
      "Module 4: Tools 3 & 4 — OpenAI Assistants API & Claude 3.7 Tool Calling",
      "Module 5: Tool 5 — Airtable Relational Databases & Softr Portals",
      "Module 6: Tools 6 & 7 — Multimodal Prospecting & Speed-to-Lead Telephony",
      "Module 7: Commercial Packaging, Loom Audits & Retainer Retaining",
    ],
    closing: [
      "Every single lesson contains both an interactive executive slide presentation and a comprehensive written implementation guide.",
      "Whether you are launching your first freelance offer or expanding an established consulting agency, this Playbook gives you the exact tactical blueprints to deliver tangible commercial value.",
    ],
  },
  targetAudience: [
    "Complete beginners wanting to learn in-demand AI and automation skills",
    "Freelancers looking to offer high-value automation services to existing clients",
    "Consultants and virtual assistants who want to double their rates with technical leverage",
    "Entrepreneurs and agency founders looking to build a recurring $10,000/month service business",
  ],
  includes: [
    { iconName: "layers", text: "${metadata.length} Structured Modules & ${totalLessonsCount} Comprehensive Lessons" },
    { iconName: "file-text", text: "Interactive Slide Presentations & Complete Step-by-Step Written Guides" },
    { iconName: "video", text: "Ready-to-Import Make.com Blueprints, n8n JSONs & Airtable Schemas" },
    { iconName: "file-text", text: "Proven Cold Video Audit Scripts, Proposal SOWs & Retainer Agreements" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" },
  ],
  modules: AI_AUTOMATIONS_MODULES_METADATA.map((mod) => ({
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
      name: "Marcus Vance",
      role: "Operations Consultant",
      rating: 5,
      quote: "The Make.com and Airtable client portal blueprints allowed me to close a $3,500 operations hub for a boutique real estate firm on my second week.",
      initials: "MV",
      date: "October 2026",
    },
    {
      name: "Elena Rostova",
      role: "Freelance Automation Specialist",
      rating: 5,
      quote: "The Trojan Horse Loom video audit script changed everything for my outreach. 3 out of 5 prospects responded and booked calls. Already at $6,200 in monthly retainers.",
      initials: "ER",
      date: "October 2026",
    },
  ],
  faqs: [
    {
      question: "Do I need any programming experience to take this playbook?",
      answer: "No. Every tool taught in this playbook is designed for visual, no-code implementation. You will learn to connect apps, design logic, and manage databases through drag-and-drop interfaces.",
    },
    {
      question: "How realistic is the $10,000/month milestone?",
      answer: "Module 1 breaks down the exact math: signing just 4 clients on a $2,500/month retainer or 10 clients at $1,000/month achieves the target. By combining setup fees with recurring maintenance, $10K/month is an achievable 90-day target.",
    },
    {
      question: "Do I get both slide decks and full written guides?",
      answer: "Yes! Every single one of the ${totalLessonsCount} lessons contains both a complete visual slide presentation and an in-depth, step-by-step written lesson switchable with a single click.",
    },
    {
      question: "Are the blueprints and templates included?",
      answer: "Yes, you get instant download access to all Make.com scenarios, n8n workflows, Airtable base schemas, client proposal agreements, and sales scripts.",
    },
  ],
};

export const AI_AUTOMATIONS_DETAIL_DATA = DETAIL_AI_AUTOMATIONS_DATA;
`;

fs.writeFileSync(path.join(__dirname, '../src/lib/ai-automations-detail-data.ts'), detailDataTs, 'utf8');
fs.writeFileSync(path.join(__dirname, '../src/lib/ai-automations-detail.ts'), detailDataTs, 'utf8');
console.log("Updated src/lib/ai-automations-detail-data.ts & detail.ts");

console.log("Playbook 1 files written successfully!");
