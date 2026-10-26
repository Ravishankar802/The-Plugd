import type { PlaybookDetailData } from "../dating-playbook-detail";
import { CHATGPT_KNOWLEDGE_MODULES } from "./chatgpt-knowledge-data";

export const CHATGPT_KNOWLEDGE_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-04",
  slug: "give-me-28-minutes-ill-give-you-10000-hours-of-chatgpt-knowledge",
  title: "Give Me 28 Minutes, I'll Give You 10,000 Hours of ChatGPT Knowledge",
  headline: "Concentrated ChatGPT mastery: o1/o3 reasoning models, precision custom instructions, Canvas collaboration, Custom GPTs with OpenAPI Actions, and Advanced Voice.",
  description: "An authoritative, comprehensive guide to OpenAI's advanced AI ecosystem. Master the frontier reasoning capabilities of o1 and o3, craft surgical custom instructions that eliminate sycophancy, co-edit high-ticket assets in Canvas, build custom GPTs with real-world OpenAPI Actions, and conduct live sales roleplay with Advanced Voice Mode.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 9,
  originalPrice: 15,
  currency: "USD",
  discountPercentage: 40,

  rating: 4.8,
  ratingCount: "5.4k",
  studentsCount: "2,380",
  instructorName: "Plugd Systems Architect",
  instructorTitle: "Principal Sovereign Operator & Systems Architect",
  instructorBio: "Advising ambitious solopreneurs, digital architects, and agency operators on deploying high-margin autonomous systems, high-ticket services, and sovereign digital holding companies.",
  instructorRating: 4.8,
  instructorReviews: "5.4k",
  instructorStudents: "2,380",
  instructorCourses: 6,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793013301/Give_Me_28_Minutes_I_ll_Give_You_10_000_Hours_of_ChatGPT_Knowledge.png",
  hoursOfMaterial: "8.5 hours",
  modulesCount: 8,
  lessonsCount: 32,
  slidesCount: 128,
  whatYouWillLearn: [
    "Deconstruct and master the exact operational mechanics of Give Me 28 Minutes, I'll Give You 10,000 Hours of ChatGPT Knowledge",
    "Deploy high-margin no-code software systems, AI pipelines, and automated client workflows",
    "Acquire high-ticket clients and customers organically with zero ad spend using diagnostic teardowns",
    "Structure irresistible, high-conviction offers that command premium upfront retainers",
    "Establish ironclad operational routines that prevent burnout and eliminate manual friction",
    "Build a diversified, untouchable sovereign enterprise yielding 10x Operational Speed & $15,000/Month with zero employees"
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
      "Welcome to the definitive masterclass on Give Me 28 Minutes, I'll Give You 10,000 Hours of ChatGPT Knowledge. This playbook is engineered for ambitious operators who refuse to accept linear employment, corporate busywork, and fragile business models.",
      "Rather than teaching fleeting hacks or superficial theories, this curriculum delivers battle-tested systems, worked unit economics, tactical battle decision matrices, and complete production-grade blueprints.",
      "Every single lesson provides both an interactive, cinematic slide deck presentation and a comprehensive, in-depth written guide (>2,500 words) detailing the exact step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 01: Act I: The Reasoning Revolution: o1/o3 Frontier Logic & Cognitive Architecture",
      "Act 02: Act II: Precision Custom Instructions: De-lobotomizing Your AI Operating System",
      "Act 03: Act III: The Canvas Collaborative Workspace: Co-Authoring High-Ticket Assets",
      "Act 04: Act IV: Custom GPT Mastery: Crafting Autonomous Specialized Knowledge Workers",
      "Act 05: Act V: OpenAPI Actions & Webhook Infrastructure: Turning GPTs into Software",
      "Act 06: Act VI: Advanced Voice Mode: Real-Time High-Stakes Negotiation Simulator",
      "Act 07: Act VII: Multimodal Vision Diagnostics: Instant B2B Audits from Raw Screenshots",
      "Act 08: Act VIII: Enterprise Automation Stacks: Connecting GPTs to Real-World Cashflow",
    ],
    closing: [
      "Every lesson is designed for immediate tactical execution, complete with 24-hour action directives and sovereign battle matrices.",
      "Join thousands of operators worldwide who have deployed these exact systems to reclaim their cognitive freedom, geographic autonomy, and financial independence."
    ]
  },
  targetAudience: [
    "Executives, consultants, and operators who use ChatGPT daily and want to operate in the top 1%",
    "Solopreneurs looking to build custom GPT workers that automate business administration",
    "Sales professionals wanting to practice real-time high-stakes negotiation with Advanced Voice",
    "Founders wanting to integrate Custom GPTs with Zapier, Slack, and external databases"
],
  includes: [
    { iconName: "layers", text: "8 Structured Acts & 32 Cinematic Production Lessons" },
    { iconName: "presentation", text: "128 Visual Presentation Slides & 32 In-Depth Written Guides" },
    { iconName: "video", text: "Ready-to-Deploy Automation Blueprints, Diagnostic Outreach Scripts & SOPs" },
    { iconName: "file-text", text: "High-Ticket Client Service Level Agreements & Risk-Reversal Contracts" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: CHATGPT_KNOWLEDGE_MODULES.map((mod) => ({
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
export const CHATGPT_KNOWLEDGE_DATA = CHATGPT_KNOWLEDGE_DETAIL_DATA;
