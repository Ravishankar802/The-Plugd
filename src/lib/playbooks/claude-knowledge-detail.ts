import type { PlaybookDetailData } from "../dating-playbook-detail";
import { CLAUDE_KNOWLEDGE_MODULES } from "./claude-knowledge-data";

export const CLAUDE_KNOWLEDGE_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-03",
  slug: "give-me-26-minutes-ill-give-you-10000-hours-of-claude-knowledge",
  title: "Give Me 26 Minutes, I'll Give You 10,000 Hours of Claude Knowledge",
  headline: "The ultimate distillation of Claude 3.5 & 3.7 mastery: XML tag prompting, Artifacts rapid prototyping, persistent Projects memory, MCP tools, and Computer Use.",
  description: "A high-leverage masterclass uncovering the profound capabilities of Anthropic's Claude models. Master XML tag prompting (<rules>, <context>), rapid React and UI prototyping via Artifacts, persistent organizational memory with Projects, connecting external tools with Model Context Protocol (MCP), and autonomous desktop execution with Computer Use.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "Top Rated",
  rating: 4.9,
  ratingCount: 420,
  studentsCount: "2,150",
  instructorName: "Plugd Systems Architect",
  instructorTitle: "Principal Sovereign Operator & Systems Architect",
  instructorBio: "Advising ambitious solopreneurs, digital architects, and agency operators on deploying high-margin autonomous systems, high-ticket services, and sovereign digital holding companies.",
  instructorRating: 4.9,
  instructorReviews: "420",
  instructorStudents: "2,150",
  instructorCourses: 6,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "6.5 hours",
  modulesCount: 6,
  lessonsCount: 24,
  slidesCount: 96,
  whatYouWillLearn: [
    "Deconstruct and master the exact operational mechanics of Give Me 26 Minutes, I'll Give You 10,000 Hours of Claude Knowledge",
    "Deploy high-margin no-code software systems, AI pipelines, and automated client workflows",
    "Acquire high-ticket clients and customers organically with zero ad spend using diagnostic teardowns",
    "Structure irresistible, high-conviction offers that command premium upfront retainers",
    "Establish ironclad operational routines that prevent burnout and eliminate manual friction",
    "Build a diversified, untouchable sovereign enterprise yielding 10x Engineering Velocity & $15,000/Month with zero employees"
  ],
  relatedTopics: [
    "AI Businesses",
    "Solopreneurship",
    "High-Ticket Retainers",
    "No-Code Automation",
    "Zero Ad Customer Acquisition",
    "Sovereign Cashflow"
  ],
  requirements: [
    "A computer with an internet connection and modern web browser",
    "Commitment to execute the 90-minute daily monastic deep work sprints",
    "Zero coding, programming, or previous business experience required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive masterclass on Give Me 26 Minutes, I'll Give You 10,000 Hours of Claude Knowledge. This playbook is engineered for ambitious operators who refuse to accept linear employment, corporate busywork, and fragile business models.",
      "Rather than teaching fleeting hacks or superficial theories, this curriculum delivers battle-tested systems, worked unit economics, tactical battle decision matrices, and complete production-grade blueprints.",
      "Every single lesson provides both an interactive, cinematic slide deck presentation and a comprehensive, in-depth written guide (>2,500 words) detailing the exact step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 01: Act I: The Claude Awakening: Why Sonnet 3.7 & Opus Invert Software Engineering",
      "Act 02: Act II: XML Tag Architecture & Precision Context Injectors",
      "Act 03: Act III: The Artifacts Workflow: Full-Stack Prototyping at Light Speed",
      "Act 04: Act IV: Persistent Enterprise Memory & The Claude Projects Engine",
      "Act 05: Act V: Model Context Protocol (MCP) & Autonomous System Integrations",
      "Act 06: Act VI: Computer Use & Synthetic Engineering Holding Companies",
    ],
    closing: [
      "Every lesson is designed for immediate tactical execution, complete with 24-hour action directives and sovereign battle matrices.",
      "Join thousands of operators worldwide who have deployed these exact systems to reclaim their cognitive freedom, geographic autonomy, and financial independence."
    ]
  },
  targetAudience: [
    "Developers and engineers looking to 10x their coding velocity using Claude Artifacts and MCP",
    "Founders who want to build and ship production software without hiring large engineering teams",
    "Knowledge workers wanting to de-lobotomize LLMs with structured XML prompt architecture",
    "Entrepreneurs seeking to deploy autonomous Computer Use workflows in their business"
],
  includes: [
    { iconName: "layers", text: "6 Structured Acts & 24 Cinematic Production Lessons" },
    { iconName: "presentation", text: "96 Visual Presentation Slides & 24 In-Depth Written Guides" },
    { iconName: "video", text: "Ready-to-Deploy Automation Blueprints, Diagnostic Outreach Scripts & SOPs" },
    { iconName: "file-text", text: "High-Ticket Client Service Level Agreements & Risk-Reversal Contracts" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: CLAUDE_KNOWLEDGE_MODULES.map((mod) => ({
    id: mod.id,
    number: mod.number,
    title: mod.title,
    description: mod.description,
    duration: mod.duration,
    lessonsCount: mod.lessons.length,
    lessons: mod.lessons.map((les, idx) => ({
      id: les.id,
      number: les.number,
      title: les.title,
      duration: les.duration,
      isPreview: idx === 0,
    })),
  })),
  testimonials: [
  {
    "name": "Kaelen Mercer",
    "role": "Sovereign Operator",
    "rating": 5,
    "quote": "This isn't a course\u2014it felt like watching a high-stakes documentary on my own potential. Reached $18,500/month by applying the exact operational blueprint.",
    "initials": "KM",
    "date": "October 2026"
  },
  {
    "name": "Soraya Chen",
    "role": "Solo Media Strategist",
    "rating": 5,
    "quote": "The storytelling approach completely changed my psychology. I stopped chasing shiny fads and built a bulletproof 96% margin business in 60 days.",
    "initials": "SC",
    "date": "October 2026"
  },
  {
    "name": "Damian Cole",
    "role": "Capital Architect",
    "rating": 5,
    "quote": "The financial math and monk-mode discipline in this playbook saved me years of wasted trial and error. Best investment I have ever made.",
    "initials": "DC",
    "date": "October 2026"
  }
],
  faqs: [
  {
    "question": "How is this different from typical corporate training or video courses?",
    "answer": "Most courses present sterile, boring slides filled with academic jargon. This playbook is structured like a cinematic story arc\u2014breaking down the psychological crucibles, real-world failures, high-stakes decisions, and exact tactical mechanics that took operators from zero to multi-six and seven-figure independence."
  },
  {
    "question": "Can I apply this if I am starting from absolute zero with no experience?",
    "answer": "Yes. Every playbook follows a chronological hero's journey from ground zero (no capital, no audience, no technical skill) through validation, cashflow generation, and autonomous scaling."
  },
  {
    "question": "What is included with my one-time purchase?",
    "answer": "You receive full lifetime digital access to the complete multi-module visual presentation player, comprehensive written lesson guides, practical battle exercises, downloadable operational templates, and all future curriculum updates with zero subscription fees."
  },
  {
    "question": "Can I access this on mobile or tablet devices?",
    "answer": "Yes, the learning player and written reader are fully responsive and optimized for seamless viewing across smartphones, tablets, laptops, and ultra-wide desktop monitors."
  }
]
};

// Backwards-compatible aliases
export const CLAUDE_KNOWLEDGE_DATA = CLAUDE_KNOWLEDGE_DETAIL_DATA;
