import type { PlaybookDetailData } from "../dating-playbook-detail";
import { MULTIPLE_INTERESTS_ONE_PERSON_MODULES } from "./multiple-interests-one-person-data";

export const MULTIPLE_INTERESTS_ONE_PERSON_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-24",
  slug: "if-you-have-multiple-interests-please-start-a-one-person-business",
  title: "If You Have Multiple Interests, Please Start a One-Person Business",
  headline: "The Solopreneur Architect's polymath blueprint: why niching down kills creative passion, and how to monetize multiple interests into an authentic, eight-figure one-person media enterprise.",
  description: "The celebrated Renaissance Polymath framework by The Solopreneur Architect. Discover why traditional advice to niche down into one tiny topic destroys creative fulfillment, how to curate your interest constellation into a personal monopoly, the weekly long-form essay atomization engine, packaging problem-solving digital products, building software holding assets (Eden model), and designing the 4-hour monastic workday.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 9,
  originalPrice: 15,
  currency: "USD",
  discountPercentage: 40,

  rating: 4.6,
  ratingCount: "3.5k",
  studentsCount: "3,750",
  instructorName: "Plugd Systems Architect",
  instructorTitle: "Principal Sovereign Operator & Systems Architect",
  instructorBio: "Advising ambitious solopreneurs, digital architects, and agency operators on deploying high-margin autonomous systems, high-ticket services, and sovereign digital holding companies.",
  instructorRating: 4.6,
  instructorReviews: "3.5k",
  instructorStudents: "3,750",
  instructorCourses: 6,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793015894/If_You_Have_Multiple_Interests_Please_Start_a_One-Person_Business.png",
  hoursOfMaterial: "8.5 hours",
  modulesCount: 8,
  lessonsCount: 32,
  slidesCount: 128,
  whatYouWillLearn: [
    "Deconstruct and master the exact operational mechanics of If You Have Multiple Interests, Please Start a One-Person Business",
    "Deploy high-margin no-code software systems, AI pipelines, and automated client workflows",
    "Acquire high-ticket clients and customers organically with zero ad spend using diagnostic teardowns",
    "Structure irresistible, high-conviction offers that command premium upfront retainers",
    "Establish ironclad operational routines that prevent burnout and eliminate manual friction",
    "Build a diversified, untouchable sovereign enterprise yielding $15,000–$30,000/Month Sovereign Polymath MRR with zero employees"
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
      "Welcome to the definitive masterclass on If You Have Multiple Interests, Please Start a One-Person Business. This playbook is engineered for ambitious operators who refuse to accept linear employment, corporate busywork, and fragile business models.",
      "Rather than teaching fleeting hacks or superficial theories, this curriculum delivers battle-tested systems, worked unit economics, tactical battle decision matrices, and complete production-grade blueprints.",
      "Every single lesson provides both an interactive, cinematic slide deck presentation and a comprehensive, in-depth written guide (>2,500 words) detailing the exact step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 01: Act I: The Specialist Trap & The Renaissance Polymath Awakening",
      "Act 02: Act II: Curating Your Interest Constellation: Finding the Unifying Thread",
      "Act 03: Act III: The 1-Person Content Ecosystem: Long-Form Writing to Micro-Media",
      "Act 04: Act IV: The Problem-Solver Product: Monetizing What You Just Mastered",
      "Act 05: Act V: The Asynchronous Software & Community Holding Asset (Eden Model)",
      "Act 06: Act VI: The 4-Hour Monastic Workday: Deep Work & Intellectual Freedom",
      "Act 07: Act VII: Overcoming Self-Doubt, Creator Burnout & Algorithmic Anxiety",
      "Act 08: Act VIII: The Sovereign Polymath: Complete Autonomy of Soul & Estate",
    ],
    closing: [
      "Every lesson is designed for immediate tactical execution, complete with 24-hour action directives and sovereign battle matrices.",
      "Join thousands of operators worldwide who have deployed these exact systems to reclaim their cognitive freedom, geographic autonomy, and financial independence."
    ]
  },
  targetAudience: [
    "Multi-passionate individuals who refuse to be pigeonholed into a single boring niche",
    "Creators wanting to build an authentic one-person media holding company",
    "Writers and intellectuals wanting to monetize their genuine fascination stack",
    "Solopreneurs aiming for complete time, location, and creative sovereignty with a 4-hour workday"
],
  includes: [
    { iconName: "layers", text: "8 Structured Acts & 32 Cinematic Production Lessons" },
    { iconName: "presentation", text: "128 Visual Presentation Slides & 32 In-Depth Written Guides" },
    { iconName: "video", text: "Ready-to-Deploy Automation Blueprints, Diagnostic Outreach Scripts & SOPs" },
    { iconName: "file-text", text: "High-Ticket Client Service Level Agreements & Risk-Reversal Contracts" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: MULTIPLE_INTERESTS_ONE_PERSON_MODULES.map((mod) => ({
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
export const MULTIPLE_INTERESTS_ONE_PERSON_DATA = MULTIPLE_INTERESTS_ONE_PERSON_DETAIL_DATA;
