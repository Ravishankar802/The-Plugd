import type { PlaybookDetailData } from "../dating-playbook-detail";
import { GET_RICH_SERVICE_BUSINESSES_MODULES } from "./get-rich-service-businesses-data";

export const GET_RICH_SERVICE_BUSINESSES_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-19",
  slug: "how-to-get-rich-for-service-based-businesses-thank-me-later",
  title: "How to Get Rich for Service-Based Businesses (Thank Me Later)",
  headline: "Step-by-step masterclass taking a service business from $55k/year to $25k+/month in 90 days: speed-to-lead, Grand Slam offers, consultative closing, and day-zero upsells.",
  description: "Step inside The Lead Strategist's live consulting room as he transforms a real service business owner from working 70 hours a week for $55k/year into a $25k/month profit machine. Master sub-5-minute speed-to-lead follow-up, value-based Grand Slam pricing, doctor-patient diagnostic sales calls, day-zero ascension upsells, and automated fulfillment SOPs.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "Top Rated",
  rating: 4.9,
  ratingCount: 628,
  studentsCount: "3,120",
  instructorName: "Plugd Systems Architect",
  instructorTitle: "Principal Sovereign Operator & Systems Architect",
  instructorBio: "Advising ambitious solopreneurs, digital architects, and agency operators on deploying high-margin autonomous systems, high-ticket services, and sovereign digital holding companies.",
  instructorRating: 4.9,
  instructorReviews: "628",
  instructorStudents: "3,120",
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
    "Deconstruct and master the exact operational mechanics of How to Get Rich for Service-Based Businesses (Thank Me Later)",
    "Deploy high-margin no-code software systems, AI pipelines, and automated client workflows",
    "Acquire high-ticket clients and customers organically with zero ad spend using diagnostic teardowns",
    "Structure irresistible, high-conviction offers that command premium upfront retainers",
    "Establish ironclad operational routines that prevent burnout and eliminate manual friction",
    "Build a diversified, untouchable sovereign enterprise yielding $25,000+/Month ($300,000/Year Net Cash) with zero employees"
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
      "Welcome to the definitive masterclass on How to Get Rich for Service-Based Businesses (Thank Me Later). This playbook is engineered for ambitious operators who refuse to accept linear employment, corporate busywork, and fragile business models.",
      "Rather than teaching fleeting hacks or superficial theories, this curriculum delivers battle-tested systems, worked unit economics, tactical battle decision matrices, and complete production-grade blueprints.",
      "Every single lesson provides both an interactive, cinematic slide deck presentation and a comprehensive, in-depth written guide (>2,500 words) detailing the exact step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 01: Act I: The 90-Day Challenge: Deconstructing Joey's $55k/Year Plateau",
      "Act 02: Act II: The Grand Slam Offer Inversion: From Hourly Labor to Value Pricing",
      "Act 03: Act III: The Speed-to-Lead Revolution: Sub-5-Minute Response Protocol",
      "Act 04: Act IV: The Diagnostic Sales Conversation: Closing Without Hard Selling",
      "Act 05: Act V: The Immediate Upsell & Ascension Engine: Monetizing Day Zero",
      "Act 06: Act VI: Asynchronous Fulfillment SOPs: Scaling Past the Founder Bottleneck",
      "Act 07: Act VII: The Referral Engine: Turning 1 Happy Client into 3 Paying Peers",
      "Act 08: Act VIII: The 90-Day Verdict: Reaching $20k+/Month & Sovereign Net Profit",
    ],
    closing: [
      "Every lesson is designed for immediate tactical execution, complete with 24-hour action directives and sovereign battle matrices.",
      "Join thousands of operators worldwide who have deployed these exact systems to reclaim their cognitive freedom, geographic autonomy, and financial independence."
    ]
  },
  targetAudience: [
    "Service business owners, agency founders, and consultants stuck under $100k/year",
    "Operators trading hourly time for dollars who need to transition to value-priced packages",
    "Sales professionals wanting to master consultative diagnostic closing without pressure",
    "Business owners wanting to install sub-5-minute speed-to-lead automated pipelines"
],
  includes: [
    { iconName: "layers", text: "8 Structured Acts & 32 Cinematic Production Lessons" },
    { iconName: "presentation", text: "128 Visual Presentation Slides & 32 In-Depth Written Guides" },
    { iconName: "video", text: "Ready-to-Deploy Automation Blueprints, Diagnostic Outreach Scripts & SOPs" },
    { iconName: "file-text", text: "High-Ticket Client Service Level Agreements & Risk-Reversal Contracts" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: GET_RICH_SERVICE_BUSINESSES_MODULES.map((mod) => ({
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
export const GET_RICH_SERVICE_BUSINESSES_DATA = GET_RICH_SERVICE_BUSINESSES_DETAIL_DATA;
