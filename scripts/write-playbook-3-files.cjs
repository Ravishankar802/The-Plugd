const fs = require('fs');
const path = require('path');
const { courseTitle, courseId, courseSlug, modulesData } = require('./generate-playbook-3.cjs');
const { createLesson } = require('./curriculum-builder-helper.cjs');

console.log("Writing Playbook 3 (agent-solutions-data.ts)...");

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

export const AGENT_SOLUTIONS_SLUG = "${courseSlug}";
export const AGENT_SOLUTIONS_ID = "${courseId}";

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

export const AGENT_SOLUTIONS_DETAIL_DATA: PlaybookDetailData = {
  id: AGENT_SOLUTIONS_ID,
  slug: AGENT_SOLUTIONS_SLUG,
  title: "${courseTitle}",
  headline:
    "Master the architectural blueprints, tool-calling schemas, and commercial playbooks to build and sell 5 high-demand autonomous AI agents to B2B clients.",
  description:
    "A practical, implementation-focused masterclass teaching you how to architect, assemble, and monetize five distinct commercial AI agents using Claude 3.7, GPT-4o, Make.com, and Airtable. Learn how to qualify leads, extract market intelligence, automate customer support, process invoices, and package recurring B2B agency retainers without training custom machine learning models.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "High Demand",
  rating: 4.9,
  ratingCount: 286,
  studentsCount: "1,240",
  instructorName: "Plugd Agent Systems Team",
  instructorTitle: "Autonomous Systems Architects & B2B Consultants",
  instructorBio:
    "The Plugd Agent Systems Team advises high-growth startups and agency founders on deploying production-safe autonomous agent workflows, tool orchestration, and high-retention enterprise retainers.",
  instructorRating: 4.9,
  instructorReviews: "286",
  instructorStudents: "1,240",
  instructorCourses: 3,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "7.0 hours",
  modulesCount: ${processedModules.length},
  lessonsCount: ${totalLessonsCount},
  whatYouWillLearn: [
    "Understand the exact 4-part architecture that distinguishes true autonomous agents from basic prompts",
    "Master Tool-Calling (Function Calling) schemas to allow LLMs to query APIs, databases, and external platforms",
    "Build Agent #1: Inbound Lead Qualification & Auto-Proposal Generator with instant 90-second speed-to-lead",
    "Build Agent #2: Customer Support & Multi-Channel Escalation Agent with safe live database order lookups",
    "Build Agent #3: Financial & Invoice Processing Agent with 3-way PO reconciliation and accounting sync",
    "Build Agent #4: Executive Market Intelligence & Competitor Tracking Agent with live Firecrawl scraping",
    "Build Agent #5: Operational Workflow & Task Dispatcher Agent for automated team coordination and SLA tracking",
    "Deploy bulletproof security guardrails, token budget limits, and human-in-the-loop approval interfaces",
    "Package three-tier B2B offers ($2,500 Sprint, $4,500 System, $1,200/mo Retainer) with strict boundary SOWs",
    "Land paying clients using 5-minute personalized Loom video audits and close 50%+ of discovery calls",
  ],
  relatedTopics: [
    "AI Agents",
    "Function Calling & APIs",
    "Make.com Automation",
    "Claude 3.7 & GPT-4o",
    "B2B Agency Retainers",
    "Enterprise Automation",
  ],
  requirements: [
    "No computer science degree, custom model training, or prior software engineering experience required",
    "A computer with an internet browser and free accounts on OpenAI or Anthropic Console",
    "A free or trial account on Make.com and Airtable for visual workflow assembly",
  ],
  descriptionSections: {
    intro: [
      "Most agency founders make the mistake of pitching generic AI chatbots or trying to build complex custom models from scratch. Enterprise clients don't want research experiments—they want reliable software systems that solve expensive operational bottlenecks.",
      "An autonomous AI agent combines the cognitive reasoning of frontier models (Claude 3.7, GPT-4o) with deterministic tool execution, live database lookups, and human-in-the-loop guardrails. When deployed correctly, these systems eliminate 80%+ of repetitive office work.",
      "This Playbook delivers the complete, production-ready blueprints for 5 high-ticket agents that businesses actively pay $2,500 to $5,000 to implement, plus recurring monthly retainers to maintain.",
    ],
    keyPointsTitle: "Comprehensive ${processedModules.length}-Module Curriculum Overview",
    keyPoints: [
      "Module 1: Agent Architecture Blueprint & Deterministic Guardrails",
      "Module 2: Agent 1 — Inbound Lead Qualification & Auto-Proposal Agent",
      "Module 3: Agent 2 — Customer Support & Multi-Channel Escalation Agent",
      "Module 4: Agent 3 — Financial & Invoice Processing Agent",
      "Module 5: Agent 4 — Market Intelligence & Competitor Scraping Agent",
      "Module 6: Agent 5 — Operational Workflow & Task Dispatcher Agent",
      "Module 7: B2B Pricing, Retainers & Client Handoff Frameworks",
    ],
    closing: [
      "Every lesson includes interactive executive slide presentations, architecture diagrams, step-by-step implementation walkthroughs, and copy-paste JSON schemas.",
      "Whether you are an established consultant expanding into AI automation or an ambitious operator launching a specialized agency, this Playbook provides the exact roadmap to deliver enterprise value.",
    ],
  },
  targetAudience: [
    "Freelancers, developers, and consultants ready to sell high-ticket AI implementation services",
    "No-code operators looking to graduate from basic Zapier automations to high-value autonomous agent systems",
    "Agency founders seeking predictable $1,000–$2,000 monthly client retainers with 85%+ profit margins",
  ],
  includes: [
    { iconName: "layers", text: "${processedModules.length} Comprehensive Modules & ${totalLessonsCount} Structured Lessons" },
    { iconName: "file-text", text: "Interactive Slide Presentations & Full Written Guides" },
    { iconName: "video", text: "Complete JSON Tool Schemas, Prompt Templates & SOW Contracts" },
    { iconName: "smartphone", text: "Optimized for Mobile, Tablet & Desktop Learning" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" },
  ],
  modules: detailModules,
  testimonials: [
    {
      name: "David Chen",
      role: "Managing Director, Synthetix Operations",
      rating: 5,
      quote:
        "The Inbound Proposal Agent blueprint paid for the entire course in 48 hours. Deployed it for a boutique consulting client for a $3,500 setup fee and they immediately added a $900/month monitoring retainer.",
      initials: "DC",
      date: "October 2026",
    },
    {
      name: "Alicia Patel",
      role: "Principal, Apex Automation Advisory",
      rating: 5,
      quote:
        "The step-by-step tool schemas for Claude 3.7 and Make.com are gold. We closed 3 B2B clients for our invoice processing agent in the first 3 weeks. Unreal value.",
      initials: "AP",
      date: "October 2026",
    },
  ],
  faqs: [
    {
      question: "Do I need machine learning expertise or coding experience to build these agents?",
      answer:
        "No. You do not need to train custom machine learning models or write complex neural network code. You will use pre-trained frontier APIs (Claude 3.7, GPT-4o) and wire them using visual orchestration engines like Make.com and Airtable.",
    },
    {
      question: "What exact 5 agents are built in this course?",
      answer:
        "You will build: (1) Inbound Lead Qualification & Auto-Proposal Agent, (2) Customer Support & Escalation Agent, (3) Financial & Invoice Processing Agent, (4) Market Intelligence & Competitor Scraping Agent, and (5) Operational Workflow & Task Dispatcher Agent.",
    },
    {
      question: "Are complete slide presentations and full written lessons included?",
      answer:
        "Yes. Every single one of the ${totalLessonsCount} lessons contains both a complete visual slide presentation and an extensive, actionable written lesson switchable with a single click.",
    },
    {
      question: "Can I sell these exact agents to my own commercial clients?",
      answer:
        "Yes! You receive full commercial rights to use, customize, and deploy all 5 agent architectures, JSON tool schemas, Airtable bases, and client retainer contracts for paying clients.",
    },
  ],
};

export const DETAIL_AGENT_SOLUTIONS_DATA = AGENT_SOLUTIONS_DETAIL_DATA;

export const AGENT_SOLUTIONS_COURSE: Course = {
  id: AGENT_SOLUTIONS_ID,
  slug: AGENT_SOLUTIONS_SLUG,
  categorySlug: "ai-businesses",
  categoryName: "AI Businesses",
  title: "${courseTitle}",
  shortTitle: "5 AI Agents to Build & Sell",
  audience: "Agency Founders, Freelancers & Automation Specialists",
  targetGender: "for-all",
  headline:
    "Master the architectural blueprints, tool-calling schemas, and commercial playbooks to build and sell 5 high-demand autonomous AI agents to B2B clients.",
  subheadline:
    "A practical, implementation-focused masterclass teaching you how to architect, assemble, and monetize five distinct commercial AI agents using Claude 3.7, GPT-4o, Make.com, and Airtable.",
  description:
    "A comprehensive curriculum detailing how to build, package, and sell autonomous agent solutions to commercial clients without writing complex neural network code.",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  badge: "High Demand",
  rating: 4.9,
  ratingCount: 286,
  hoursOfMaterial: "7.0 hours",
  modulesCount: ${processedModules.length},
  lessonsCount: ${totalLessonsCount},
  primaryColor: "#8b5cf6",
  accentColor: "#f59e0b",
  outcomes: [
    "Architect and deploy 5 complete commercial autonomous AI agents",
    "Master deterministic tool-calling schemas and multi-step reasoning loops",
    "Deploy human-in-the-loop safeguards and token budget guardrails",
    "Package services into $2,500 to $4,500 sprints and $1,200/mo retainers",
    "Land paying clients using 5-minute personalized Loom video audits",
    "Scale to $10,000+ monthly recurring revenue managing retainers in under 15 hours a week",
  ],
  modules: courseModules,
  testimonials: [
    {
      name: "David Chen",
      role: "Managing Director, Synthetix Operations",
      quote:
        "The Inbound Proposal Agent blueprint paid for the entire course in 48 hours. Deployed it for a boutique consulting client for a $3,500 setup fee and they immediately added a $900/month monitoring retainer.",
      handle: "@davidchen_ai",
    },
  ],
};
`;

fs.writeFileSync(path.join(__dirname, '../src/lib/playbooks/agent-solutions-data.ts'), fileContent, 'utf8');
console.log("Updated src/lib/playbooks/agent-solutions-data.ts successfully!");
