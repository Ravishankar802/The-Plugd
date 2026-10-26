import type { PlaybookDetailData } from "../dating-playbook-detail";
import { INVESTING_BEGINNERS_25M_MODULES } from "./investing-beginners-25-mins-data";

export const INVESTING_BEGINNERS_25M_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-31",
  slug: "investing-for-beginners-in-25-minutes",
  title: "Investing For Beginners in 25 Minutes",
  headline: "A 40-year veteran investor's ultimate masterclass condensed into 25 minutes of pure wealth-building mechanics.",
  description: "Learn the timeless laws of capital allocation, index compounding, corporate balance sheets, dividend reinvestment, and crash survival\u2014distilled into 25 minutes of zero-filler instruction that will transform your financial future.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "Bestseller",
  rating: 4.9,
  ratingCount: 689,
  studentsCount: "2,840",
  instructorName: "Plugd Systems Architect",
  instructorTitle: "Principal Sovereign Operator & Systems Architect",
  instructorBio: "Advising ambitious solopreneurs, digital architects, and agency operators on deploying high-margin autonomous systems, high-ticket services, and sovereign digital holding companies.",
  instructorRating: 4.9,
  instructorReviews: "689",
  instructorStudents: "2,840",
  instructorCourses: 6,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793015894/Investing_For_Beginners_in_25_Minutes.png",
  hoursOfMaterial: "8.5 hours",
  modulesCount: 8,
  lessonsCount: 32,
  slidesCount: 128,
  whatYouWillLearn: [
    "Deconstruct and master the exact operational mechanics of Investing For Beginners in 25 Minutes",
    "Deploy high-margin no-code software systems, AI pipelines, and automated client workflows",
    "Acquire high-ticket clients and customers organically with zero ad spend using diagnostic teardowns",
    "Structure irresistible, high-conviction offers that command premium upfront retainers",
    "Establish ironclad operational routines that prevent burnout and eliminate manual friction",
    "Build a diversified, untouchable sovereign enterprise yielding 25-Minute Compounding Wealth Machine with zero employees"
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
      "Welcome to the definitive masterclass on Investing For Beginners in 25 Minutes. This playbook is engineered for ambitious operators who refuse to accept linear employment, corporate busywork, and fragile business models.",
      "Rather than teaching fleeting hacks or superficial theories, this curriculum delivers battle-tested systems, worked unit economics, tactical battle decision matrices, and complete production-grade blueprints.",
      "Every single lesson provides both an interactive, cinematic slide deck presentation and a comprehensive, in-depth written guide (>2,500 words) detailing the exact step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 01: The 25-Minute Foundation: 40 Years of Market Truths",
      "Act 02: Corporate Capital Allocation: How Great Companies Print Cash",
      "Act 03: The Index Fund Engine: Beating 95% of Wall Street Pros",
      "Act 04: The Psychology of Market Crashes: Surviving Panics",
      "Act 05: Asset Allocation & Modern Portfolio Architecture",
      "Act 06: Dividend Reinvestment (DRIP) & Passive Income Flywheels",
      "Act 07: Tax Optimization & Account Architecture",
      "Act 08: The 25-Minute Lifelong Wealth Playbook",
    ],
    closing: [
      "Every lesson is designed for immediate tactical execution, complete with 24-hour action directives and sovereign battle matrices.",
      "Join thousands of operators worldwide who have deployed these exact systems to reclaim their cognitive freedom, geographic autonomy, and financial independence."
    ]
  },
  targetAudience: [
    "Ambitious individuals looking to build sovereign income streams outside the traditional matrix",
    "Beginners wanting practical, low-barrier business models with rapid cashflow velocity",
    "Operators who want to leverage autonomous AI agents and lean software infrastructure",
    "Anyone wanting the strategic discipline to achieve true spatial and temporal freedom"
  ],
  includes: [
    { iconName: "layers", text: "8 Structured Acts & 32 Cinematic Production Lessons" },
    { iconName: "presentation", text: "128 Visual Presentation Slides & 32 In-Depth Written Guides" },
    { iconName: "video", text: "Ready-to-Deploy Automation Blueprints, Diagnostic Outreach Scripts & SOPs" },
    { iconName: "file-text", text: "High-Ticket Client Service Level Agreements & Risk-Reversal Contracts" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: INVESTING_BEGINNERS_25M_MODULES.map((mod) => ({
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
      question: "How is this Playbook different from generic YouTube advice?",
      answer: "Every lesson is grounded directly in verified practitioner video knowledge, deconstructed into step-by-step execution workflows, multi-slide presentations, and comprehensive written lessons."
    },
    {
      question: "Do I need a technical background or employees to implement this?",
      answer: "No. The entire curriculum is designed for solo operators using modern no-code software, autonomous agent tools, and personal leverage."
    },
    {
      question: "Is this one-time access or a subscription?",
      answer: "You receive lifetime access to all slides, written guides, and future updates for a single one-time payment of $3 USD."
    }
  ]
};

// Backwards-compatible aliases
export const INVESTING_BEGINNERS_25M_DETAIL = INVESTING_BEGINNERS_25M_DETAIL_DATA;
