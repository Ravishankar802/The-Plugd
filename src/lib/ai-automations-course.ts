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
  title: "7 AI Automations That Could Make You $10,000+ Each",
  shortTitle: "7 AI Automations",
  audience: "Entrepreneurs, Consultants & AI Engineers" as any,
  targetGender: "for-all" as any,
  headline: "Master 7 enterprise-grade AI automation architectures capable of delivering $10,000+ in business value.",
  subheadline:
    "Production-ready blueprints, system architectures, workflows, and deployment frameworks for mission-critical business automations.",
  description:
    "Step-by-step blueprints, system architectures, production-ready workflows, and deployment frameworks for 7 mission-critical AI automations that eliminate administrative overhead, recover revenue, and command five-figure implementation fees.",
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
    "Enterprise AI Economics: The $10,000 value threshold, discovery audits, and infrastructure scoping",
    "Omnichannel Support & Resolution: Multi-agent routing, RAG retrieval, and real-time CRM mutations",
    "High-Velocity Inbound Lead Pipeline: Instant enrichment, AI ICP fit scoring, and automated booking",
    "Intelligent Document Processing: Vision model OCR, Pydantic validation, and accounting ERP sync",
    "Autonomous Executive Reporting: Metric variance reasoning, branded PDF decks, and scheduled delivery",
    "Conversational Voice AI: Sub-600ms latency telephony stack, calendar function calling, and barge-in",
    "Enterprise Knowledge RAG Copilot: Hybrid BM25/vector search, Cohere re-ranking, and database RBAC",
    "Supply Chain & Inventory Engine: Dynamic reorder equations, PO automation, and 1-click Slack approvals",
    "Enterprise Delivery & Handover: Airtight SOWs, UAT testing protocols, and $2,000+/mo maintenance retainers",
  ],
  modules: AI_AUTOMATIONS_MODULES,
  faqs: [
    {
      question: "What is included in 7 AI Automations That Could Make You $10,000+ Each?",
      answer:
        "The Playbook contains 9 comprehensive modules and 36 full lessons with dual slide presentations and in-depth written engineering guides, code snippets, architectural flowcharts, and operational checklists covering 7 enterprise-grade AI automations.",
    },
    {
      question: "Do I need to be a senior machine learning researcher to build these automations?",
      answer:
        "No. You do not need to train custom foundation models from scratch. These automations leverage production APIs (OpenAI, Anthropic Claude, Groq), modern workflow orchestrators (n8n, LangGraph), and cloud databases (Supabase, Postgres, Redis).",
    },
    {
      question: "Why is the title focused on $10,000+ potential value?",
      answer:
        "The $10,000 figure represents the realistic commercial project value and operational savings delivered to mid-market organizations by eliminating manual labor, preventing lead decay, and automating complex document workflows.",
    },
    {
      question: "Is this a one-time purchase?",
      answer:
        "Yes, exactly $3 USD one-time payment with lifetime access. Includes both interactive slide presentations and written guides with full ongoing updates.",
    },
  ],
  testimonials: [
    {
      name: "Marcus Vance",
      handle: "@marcus_v",
      role: "Operations Consultant",
      quote:
        "The architecture diagrams and schema validation patterns alone saved us weeks of trial and error. We deployed the document processing pipeline for a client and it performed flawlessly.",
    },
    {
      name: "Devon Reed",
      handle: "@devon_ai",
      role: "AI Agency Founder",
      quote:
        "The breakdown of deterministic vs probabilistic execution is the best practical guide to enterprise AI I have seen. This is real systems engineering, not just prompt tips.",
    },
  ],
};
