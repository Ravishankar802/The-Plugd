import type { PlaybookDetailData } from "../dating-playbook-detail";
import { STARTED_OVER_ZERO_TO_1M_MODULES } from "./started-over-zero-plan-to-1m-data";

export const STARTED_OVER_ZERO_TO_1M_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-53",
  slug: "if-i-started-over-with-0-heres-my-exact-plan-to-get-to-1m",
  title: "If I Started Over With $0, Here’s My Exact Plan to get to $1M",
  headline: "The uncompromising step-by-step master plan to rebuild from absolute zero to $1,000,000 net worth using high-leverage skills and modern systems.",
  description: "If you lost everything tomorrow\u2014no money, no audience, and zero network\u2014this is the exact phased playbook to engineer survival cashflow, scale high-ticket service operations, productize into digital leverage, and accumulate an unassailable $1,000,000 asset fortress.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 19,
  originalPrice: 30,
  currency: "USD",
  discountPercentage: 37,

  rating: 4.9,
  ratingCount: "4.5k",
  studentsCount: "3,480",
  instructorName: "Plugd Systems Architect",
  instructorTitle: "Principal Sovereign Operator & Systems Architect",
  instructorBio: "Advising ambitious solopreneurs, digital architects, and agency operators on deploying high-margin autonomous systems, high-ticket services, and sovereign digital holding companies.",
  instructorRating: 4.9,
  instructorReviews: "4.5k",
  instructorStudents: "3,480",
  instructorCourses: 7,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793015897/If_I_Started_Over_With_0_Here_s_My_Exact_Plan_to_get_to_1M.png",
  hoursOfMaterial: "7.5 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Deconstruct the clinical phased framework to go from $0 capital to $1,000,000 net worth",
    "Identify and monetize high-leverage digital skills within 48 hours without spending on ads",
    "Craft irresistible risk-reversed retainer offers that command $2,500 to $5,000 upfront fees",
    "Implement the Buyback Principle to delegate fulfillment to offshore operators for <$8/hour",
    "Productize custom service chaos into standardized, repeatable high-margin digital assets",
    "Establish the monastic profit-sweeping protocol that guarantees generational wealth preservation"
  ],
  relatedTopics: [
    "AI Businesses",
    "Wealth Creation",
    "From Scratch to $1M",
    "Productized Services",
    "Buyback Principle",
    "Sovereign Assets"
  ],
  requirements: [
    "A computer with an internet connection and modern web browser",
    "Willingness to commit to relentless daily execution without making excuses",
    "Zero financial capital, existing network, or prior business experience required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive masterclass on If I Started Over With $0, Here’s My Exact Plan to get to $1M. This playbook is engineered for ambitious operators who refuse to accept linear employment, corporate busywork, and financial fragility.",
      "Rather than teaching fleeting hacks or theoretical daydreaming, this curriculum delivers battle-tested systems, worked unit economics, tactical battle decision matrices, and complete production-grade blueprints.",
      "Every single lesson provides both an interactive, cinematic slide deck presentation and a comprehensive, in-depth written guide (>2,500 words) detailing the exact step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 01: The Zero Baseline & Survival Cashflow Protocol ($0 to $5K)",
      "Act 02: The Service Solopreneur Foundation ($5K to $15K/Month)",
      "Act 03: The Systems & Leveraged Delegation Shift ($15K to $40K/Month)",
      "Act 04: Productizing Services Into High-Margin Assets ($40K to $75K/Month)",
      "Act 05: Building the Sovereign Enterprise Machine ($75K to $100K+/Month)",
      "Act 06: The Wealth Accumulation & Defense Protocol (The $1M Cumulative Milestone)",
      "Act 07: The Sovereign Titan Mindset & Generational Autonomy",
    ],
    closing: [
      "Every lesson is designed for immediate tactical execution, complete with 24-hour action directives and sovereign battle matrices.",
      "Join thousands of operators worldwide who have deployed these exact systems to reclaim their cognitive freedom, geographic autonomy, and financial independence."
    ]
  },
  targetAudience: [
    "Anyone starting from scratch with $0 who needs a clinical, step-by-step path to financial sovereignty",
    "Freelancers and solopreneurs capped by trading hours for linear dollars seeking scalable agency systems",
    "Ambitious operators looking to build, productize, and compound cashflow into an unassailable $1M net worth",
    "Anyone seeking the strategic clarity and systems discipline required to achieve permanent economic freedom"
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Acts & 28 Cinematic Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Ready-to-Deploy Automation Blueprints, Diagnostic Outreach Scripts & SOPs" },
    { iconName: "file-text", text: "High-Ticket Client Service Level Agreements & Risk-Reversal Contracts" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: STARTED_OVER_ZERO_TO_1M_MODULES.map((mod) => ({
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

// Backwards-compatible alias
export const STARTED_OVER_ZERO_TO_1M_DETAIL = STARTED_OVER_ZERO_TO_1M_DETAIL_DATA;
