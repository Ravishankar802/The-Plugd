import type { PlaybookDetailData } from "../dating-playbook-detail";
import { ONE_PERSON_BUSINESS_MODULES } from "./one-person-business-data";

export const ONE_PERSON_BUSINESS_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-08",
  slug: "build-a-one-person-business-as-a-beginner-from-0-to-10k",
  title: "Build A One-Person Business As A Beginner (From $0 To $10K)",
  headline: "The complete roadmap from $0 to $10,000/month as a solo beginner: skill stacking, $2,500 Grand Slam offers, minimum viable audience, and asynchronous fulfillment.",
  description: "An exhaustive, step-by-step roadmap for launching, validating, and scaling a high-leverage one-person business from scratch. Master the art of stacking high-income skills, engineering $2,500 Grand Slam offers with risk reversal, building an audience of 500 targeted buyers, converting prospects in organic DMs, and fulfilling client results asynchronously without burnout.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "Founder Pick",
  rating: 4.9,
  ratingCount: 528,
  studentsCount: "2,610",
  instructorName: "Plugd Systems Architect",
  instructorTitle: "Principal Sovereign Operator & Systems Architect",
  instructorBio: "Advising ambitious solopreneurs, digital architects, and agency operators on deploying high-margin autonomous systems, high-ticket services, and sovereign digital holding companies.",
  instructorRating: 4.9,
  instructorReviews: "528",
  instructorStudents: "2,610",
  instructorCourses: 6,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "8.5 hours",
  modulesCount: 8,
  lessonsCount: 32,
  slidesCount: 128,
  whatYouWillLearn: [
    "Deconstruct and master the exact operational mechanics of Build A One-Person Business As A Beginner (From $0 To $10K)",
    "Deploy high-margin no-code software systems, AI pipelines, and automated client workflows",
    "Acquire high-ticket clients and customers organically with zero ad spend using diagnostic teardowns",
    "Structure irresistible, high-conviction offers that command premium upfront retainers",
    "Establish ironclad operational routines that prevent burnout and eliminate manual friction",
    "Build a diversified, untouchable sovereign enterprise yielding $10,000+/Month ($120,000+/Year) with zero employees"
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
      "Welcome to the definitive masterclass on Build A One-Person Business As A Beginner (From $0 To $10K). This playbook is engineered for ambitious operators who refuse to accept linear employment, corporate busywork, and fragile business models.",
      "Rather than teaching fleeting hacks or superficial theories, this curriculum delivers battle-tested systems, worked unit economics, tactical battle decision matrices, and complete production-grade blueprints.",
      "Every single lesson provides both an interactive, cinematic slide deck presentation and a comprehensive, in-depth written guide (>2,500 words) detailing the exact step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 01: Act I: The Zero-Dollar Origin Story: Escaping Middle-Class Financial Gravitation",
      "Act 02: Act II: Discovering Your Asymmetric Superpower & High-Income Skill Stack",
      "Act 03: Act III: Crafting The $2,500 Grand Slam Offer: Eliminating Client Risk",
      "Act 04: Act IV: Building The Minimum Viable Audience (MVA) with High-Signal Media",
      "Act 05: Act V: The 1-to-1 Organic Conversion Funnel: From DM to Paid Stripe Invoice",
      "Act 06: Act VI: Asynchronous Client Delivery & Delivering Elite Results Solo",
      "Act 07: Act VII: Operational Discipline & Protecting the First $10,000 Liquid Reserve",
      "Act 08: Act VIII: Ascending to the Sovereign Architect: Beyond $10k/Month",
    ],
    closing: [
      "Every lesson is designed for immediate tactical execution, complete with 24-hour action directives and sovereign battle matrices.",
      "Join thousands of operators worldwide who have deployed these exact systems to reclaim their cognitive freedom, geographic autonomy, and financial independence."
    ]
  },
  targetAudience: [
    "Beginners who want to escape corporate employment and reach $10,000/month net profit solo",
    "Freelancers wanting to package their skills into high-ticket $2,500 retainers",
    "Solopreneurs wanting to master organic audience building on LinkedIn and Twitter",
    "Founders who value complete autonomy, location freedom, and zero employee management"
],
  includes: [
    { iconName: "layers", text: "8 Structured Acts & 32 Cinematic Production Lessons" },
    { iconName: "presentation", text: "128 Visual Presentation Slides & 32 In-Depth Written Guides" },
    { iconName: "video", text: "Ready-to-Deploy Automation Blueprints, Diagnostic Outreach Scripts & SOPs" },
    { iconName: "file-text", text: "High-Ticket Client Service Level Agreements & Risk-Reversal Contracts" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: ONE_PERSON_BUSINESS_MODULES.map((mod) => ({
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
export const ONE_PERSON_BUSINESS_DATA = ONE_PERSON_BUSINESS_DETAIL_DATA;
