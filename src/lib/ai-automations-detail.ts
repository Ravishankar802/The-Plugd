import type { PlaybookDetailData, PlaybookDetailModule } from "./dating-playbook-detail";
import { AI_AUTOMATIONS_MODULES_METADATA } from "./ai-automations-curriculum";

const detailModules: PlaybookDetailModule[] = AI_AUTOMATIONS_MODULES_METADATA.map((m) => ({
  id: m.id,
  number: m.number,
  title: m.title,
  description: m.description,
  duration: m.duration,
  lessons: m.lessons.map((l) => ({
    id: l.id,
    number: l.number,
    title: l.title,
    duration: l.duration,
    isPreview: l.id === "01-1",
  })),
}));

export const AI_AUTOMATIONS_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-01",
  slug: "7-ai-automations",
  title: "7 AI Automations That Could Make You $10,000+ Each",
  headline: "Master 7 enterprise-grade AI automation architectures capable of delivering $10,000+ in business value.",
  description:
    "Step-by-step blueprints, system architectures, production-ready workflows, and deployment frameworks for 7 mission-critical AI automations that eliminate administrative overhead, recover revenue, and command five-figure implementation fees.",
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
  instructorName: "Plugd AI Systems Team",
  instructorTitle: "Enterprise Automation Engineers & Systems Architects",
  instructorBio:
    "The Plugd AI Systems Team specializes in architecting deterministic AI workflows, autonomous agent swarms, and enterprise data integrations for mid-market organizations and high-ticket service consultancies.",
  instructorRating: 4.9,
  instructorReviews: "384",
  instructorStudents: "1,420",
  instructorCourses: 1,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "", // Preserved empty thumbnail per specification
  hoursOfMaterial: "6.5 hours",
  modulesCount: 9,
  lessonsCount: 36,
  whatYouWillLearn: [
    "Architect and deploy 7 mission-critical, high-ticket AI automation systems",
    "Differentiate high-value enterprise engineering from low-margin commodity chatbots",
    "Build multi-channel customer resolution engines with live database mutations",
    "Implement real-time inbound lead enrichment and sub-60-second qualification pipelines",
    "Deploy multimodal document extraction pipelines with strict Pydantic JSON schema validation",
    "Synthesize weekly executive reporting with automated PDF generation and Slack delivery",
    "Design sub-600ms latency conversational voice agents with Twilio, LiveKit, and Cartesia",
    "Build private enterprise RAG search engines with hybrid retrieval and database-level RBAC",
    "Automate supply chain replenishment, dynamic safety stock calculations, and vendor POs",
    "Draft enterprise Statements of Work (SOWs) and secure recurring $2,000+/mo maintenance retainers",
  ],
  relatedTopics: [
    "AI Automation",
    "Enterprise Systems Architecture",
    "Large Language Models",
    "RAG & Vector Databases",
    "n8n & Workflow Orchestration",
    "B2B Consulting",
  ],
  requirements: [
    "Basic familiarity with modern web tools and API concepts (REST, JSON, Webhooks)",
    "No advanced machine learning or neural network training background required",
    "A computer with internet access to interact with workflow builders and cloud consoles",
  ],
  descriptionSections: {
    intro: [
      "The market for generic ChatGPT wrappers, simple prompt lists, and brittle no-code automations has collapsed into commodity pricing. Clients will not pay thousands of dollars for novelty.",
      "However, mid-market enterprises with $3M to $50M in annual revenue are actively investing five-figure budgets into mission-critical workflow infrastructure that eliminates payroll drag, prevents lead decay, and automates high-volume document compliance.",
      "7 AI Automations That Could Make You $10,000+ Each provides the definitive technical and commercial curriculum for building, hardening, and deploying 7 enterprise-grade automations that deliver overwhelming operational return on investment.",
    ],
    keyPointsTitle: "Comprehensive Architectural Coverage",
    keyPoints: [
      "Economic Foundations: Discovery audits, feasibility analysis, and latency budgeting",
      "Automation 1: Omnichannel Customer Intelligence & Resolution Engine",
      "Automation 2: High-Volume Inbound Lead Enrichment & Dynamic Qualification Pipeline",
      "Automation 3: Intelligent Document Processing & Financial ERP Ingestion",
      "Automation 4: Autonomous Executive Reporting & Financial Synthesis Engine",
      "Automation 5: Conversational Voice AI & Autonomous Booking Receptionist",
      "Automation 6: Enterprise Knowledge Intelligence & Proprietary RAG Copilot",
      "Automation 7: Dynamic Inventory Forecasting & Supply Chain Order Engine",
      "Packaging & Monetization: Statements of Work, UAT testing, and $2,000+/month maintenance retainers",
    ],
    closing: [
      "Every lesson includes both an interactive, executive slide presentation deck and a comprehensive, in-depth written engineering manual with code snippets, architecture diagrams, and operational checklists.",
      "Whether you are an independent AI consultant, agency founder, or technical entrepreneur, this Playbook provides the exact blueprints to build high-margin enterprise automation systems.",
    ],
  },
  targetAudience: [
    "AI Consultants and agency owners looking to close $10,000+ enterprise client engagements",
    "Full-stack and backend software developers seeking production architectures for LLM pipelines",
    "Operations leaders and business founders wanting to automate internal company bottlenecks",
    "Technical freelancers looking to transition away from low-margin hourly commodity work",
  ],
  includes: [
    { iconName: "video", text: "6.5 hours of structured curriculum" },
    { iconName: "file-text", text: "36 dual-format lessons (Slide Decks & Written Guides)" },
    { iconName: "layers", text: "Production architectures, code samples & JSON schemas" },
    { iconName: "smartphone", text: "Full responsive access on desktop, tablet & mobile" },
    { iconName: "infinity", text: "Lifetime access with all future module updates included" },
    { iconName: "shield-check", text: "Enterprise operational checklists and SOW templates" },
  ],
  modules: detailModules,
  testimonials: [
    {
      name: "Marcus Vance",
      role: "Operations Consultant",
      rating: 5,
      initials: "MV",
      date: "2 weeks ago",
      quote:
        "The architecture diagrams and schema validation patterns alone saved us weeks of trial and error. We deployed the document processing pipeline for a client and it performed flawlessly.",
    },
    {
      name: "Devon Reed",
      role: "AI Agency Founder",
      rating: 5,
      initials: "DR",
      date: "1 month ago",
      quote:
        "The breakdown of deterministic vs probabilistic execution is the best practical guide to enterprise AI I have seen. This is real systems engineering, not just prompt tips.",
    },
    {
      name: "Elena Rostova",
      role: "B2B Solutions Architect",
      rating: 5,
      initials: "ER",
      date: "3 weeks ago",
      quote:
        "Deploying the conversational voice receptionist using the sub-600ms latency stack transformed our client's inbound booking rate. Outstanding depth throughout all 9 modules.",
    },
  ],
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
};
