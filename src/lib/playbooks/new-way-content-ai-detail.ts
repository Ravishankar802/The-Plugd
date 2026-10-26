import type { PlaybookDetailData } from "../dating-playbook-detail";
import { NEW_WAY_CONTENT_AI_MODULES } from "./new-way-content-ai-data";

export const NEW_WAY_CONTENT_AI_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-20",
  slug: "the-new-way-of-making-content-in-the-age-of-ai",
  title: "The New Way of Making Content In The Age of AI",
  headline: "How to build an untouchable personal brand across 21M+ followers in spite of AI by mastering Proof of Work, credibility arbitrage, and high-signal storytelling.",
  description: "The Lead Strategist breaks down how to build an iconic personal brand in the age of artificial intelligence. Discover why generic AI content fails, how to leverage the Proof of Work moat, the 3 pillars of uncopyable content (Proof, Beliefs, Mechanics), how to use AI strictly as a production assistant rather than an author, and how to convert attention into enterprise value.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 7,
  originalPrice: 12,
  currency: "USD",
  discountPercentage: 42,

  rating: 4.6,
  ratingCount: "3.4k",
  studentsCount: "2,810",
  instructorName: "Plugd Systems Architect",
  instructorTitle: "Principal Sovereign Operator & Systems Architect",
  instructorBio: "Advising ambitious solopreneurs, digital architects, and agency operators on deploying high-margin autonomous systems, high-ticket services, and sovereign digital holding companies.",
  instructorRating: 4.6,
  instructorReviews: "3.4k",
  instructorStudents: "2,810",
  instructorCourses: 6,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793017435/The_New_Way_of_Making_Content_In_The_Age_of_AI.png",
  hoursOfMaterial: "6.5 hours",
  modulesCount: 6,
  lessonsCount: 24,
  slidesCount: 96,
  whatYouWillLearn: [
    "Deconstruct and master the exact operational mechanics of The New Way of Making Content In The Age of AI",
    "Deploy high-margin no-code software systems, AI pipelines, and automated client workflows",
    "Acquire high-ticket clients and customers organically with zero ad spend using diagnostic teardowns",
    "Structure irresistible, high-conviction offers that command premium upfront retainers",
    "Establish ironclad operational routines that prevent burnout and eliminate manual friction",
    "Build a diversified, untouchable sovereign enterprise yielding Uncopyable Media Authority & Enterprise Value with zero employees"
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
      "Welcome to the definitive masterclass on The New Way of Making Content In The Age of AI. This playbook is engineered for ambitious operators who refuse to accept linear employment, corporate busywork, and fragile business models.",
      "Rather than teaching fleeting hacks or superficial theories, this curriculum delivers battle-tested systems, worked unit economics, tactical battle decision matrices, and complete production-grade blueprints.",
      "Every single lesson provides both an interactive, cinematic slide deck presentation and a comprehensive, in-depth written guide (>2,500 words) detailing the exact step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 01: Act I: The 21 Million Follower Proof & The AI Content Sea of Mediocrity",
      "Act 02: Act II: The 3 Pillars of Uncopyable Content: Proof, Beliefs & Mechanics",
      "Act 03: Act III: Using AI as a Tireless Producer, Never the Creative Author",
      "Act 04: Act IV: The Personal Brand Economics: Turning Views into Enterprise Value",
      "Act 05: Act V: The Solo Creator Production Blueprint for 2026",
      "Act 06: Act VI: The Sovereign Creator: Building a Brand That Outlives Algorithms",
    ],
    closing: [
      "Every lesson is designed for immediate tactical execution, complete with 24-hour action directives and sovereign battle matrices.",
      "Join thousands of operators worldwide who have deployed these exact systems to reclaim their cognitive freedom, geographic autonomy, and financial independence."
    ]
  },
  targetAudience: [
    "Content creators and founders wanting to stand out amidst the flood of generic AI noise",
    "Entrepreneurs who want to leverage their real-world scars and business proof into media authority",
    "Operators looking to streamline video editing and atomization with modern AI tools",
    "Brand builders focused on long-term Lindy credibility and enterprise valuation multiples"
],
  includes: [
    { iconName: "layers", text: "6 Structured Acts & 24 Cinematic Production Lessons" },
    { iconName: "presentation", text: "96 Visual Presentation Slides & 24 In-Depth Written Guides" },
    { iconName: "video", text: "Ready-to-Deploy Automation Blueprints, Diagnostic Outreach Scripts & SOPs" },
    { iconName: "file-text", text: "High-Ticket Client Service Level Agreements & Risk-Reversal Contracts" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: NEW_WAY_CONTENT_AI_MODULES.map((mod) => ({
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
export const NEW_WAY_CONTENT_AI_DATA = NEW_WAY_CONTENT_AI_DETAIL_DATA;
