import type { PlaybookDetailData } from "../dating-playbook-detail";
import { FIVE_SIMPLE_APPS_10K_MODULES } from "./five-simple-apps-10k-month-ai-data";

export const FIVE_SIMPLE_APPS_10K_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-60",
  slug: "5-simple-apps-making-10-000-month-that-you-can-build-with-ai",
  title: "5 Simple Apps Making $10,000/month That You Can Build with AI",
  headline: "How tiny, single-utility micro-apps quietly make $10,000+/month\u2014and how to build them with AI in days.",
  description: "Skip the multi-year venture startup. Master the single-screen micro-app revolution: fasting timers, water trackers, mood journals, ambient soundscapes, and receipt scanners. Learn how to prompt the code with modern AI tools, package freemium paywalls, and drive organic App Store / TikTok users.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 9,
  originalPrice: 15,
  currency: "USD",
  discountPercentage: 40,

  rating: 4.7,
  ratingCount: "5.8k",
  studentsCount: "2,430",
  instructorName: "Plugd Systems Architect",
  instructorTitle: "Principal Sovereign Operator & Systems Architect",
  instructorBio: "Advising ambitious solopreneurs, digital architects, and agency operators on deploying high-margin autonomous systems, digital assets, and sovereign holding architectures.",
  instructorRating: 4.7,
  instructorReviews: "5.8k",
  instructorStudents: "2,430",
  instructorCourses: 7,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793023911/5_Simple_Apps_Making_10_000_Month_That_You_Can_Build_With_AI.png",
  hoursOfMaterial: "8.0 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Master the complete operational and systemic mechanics of 5 Simple Apps Making $10,000/month That You Can Build with AI",
    "Identify and dismantle the subtle psychological and tactical traps that cause 99% of operators to fail",
    "Deploy deterministic, battle-tested execution workflows and autonomous pipelines to achieve rapid velocity",
    "Structure unassailable high-margin unit economics with >90% net margins and minimal overhead",
    "Implement daily non-negotiable action directives and emergency protocols to protect focus and compounding",
    "Scale from initial cashflow to an unassailable sovereign holding portfolio"
  ],
  relatedTopics: [
    "AI Businesses",
    "Digital Leverage",
    "Solopreneurship",
    "Sovereign Assets",
    "Automation",
    "Cashflow Architecture"
  ],
  requirements: [
    "A computer with an internet connection and modern web browser",
    "Willingness to commit to disciplined daily execution without making excuses",
    "Zero financial capital, existing network, or prior business experience required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive masterclass on 5 Simple Apps Making $10,000/month That You Can Build with AI. This playbook is engineered for ambitious operators who refuse to accept linear employment, corporate busywork, and financial fragility.",
      "Rather than teaching fleeting hacks or theoretical daydreaming, this curriculum delivers battle-tested systems, worked unit economics, tactical battle decision matrices, and complete production-grade blueprints.",
      "Every single lesson provides both an interactive, cinematic slide deck presentation and a comprehensive, in-depth written guide (>2,500 words) detailing the exact step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: The Micro-App Phenomenon: Why Tiny Apps Quietly Print Cash",
      "Act 2: Dissecting App 1 & 2: Fasting Timers and Water Habit Trackers",
      "Act 3: Dissecting App 3 & 4: 5-Second Mood Journals and Soundscapes",
      "Act 4: Dissecting App 5: Minimalist Receipt & Invoice Scanners",
      "Act 5: Building Without Coding: The Cursor, Claude & Supabase Dev Pipeline",
      "Act 6: The Freemium Monetization Architecture: Paywalls & Retention",
      "Act 7: Organic App Store Optimization (ASO) & TikTok Demo Loops",
    ],
    closing: [
      "Every lesson is designed for immediate tactical execution, complete with 24-hour action directives and sovereign battle matrices.",
      "Join thousands of operators worldwide who have deployed these exact systems to reclaim their cognitive freedom, geographic autonomy, and financial independence."
    ]
  },
  targetAudience: [
    "Ambitious operators seeking to engineer an unassailable life and financial advantage",
    "Solopreneurs and creators transitioning from linear time-for-money labor to scalable assets",
    "Professionals seeking practical frameworks, automated pipelines, and high-margin cashflow",
    "Anyone committed to achieving genuine spatial, temporal, and economic sovereignty"
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Acts & 28 Cinematic Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Ready-to-Deploy Automation Blueprints, Diagnostic Outreach Scripts & SOPs" },
    { iconName: "file-text", text: "High-Ticket Client Service Level Agreements & Risk-Reversal Contracts" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: FIVE_SIMPLE_APPS_10K_MODULES.map((mod) => ({
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
      question: "Do I need technical skills or a team to implement this?",
      answer: "No. The entire curriculum is designed for solo operators using modern no-code software, autonomous agent tools, and personal leverage."
    },
    {
      question: "Is this one-time access or a subscription?",
      answer: "You receive lifetime access to all slides, written guides, and future updates for a single one-time payment of $3 USD."
    }
  ]
};

// Backwards-compatible aliases
export const FIVE_SIMPLE_APPS_10K_DETAIL = FIVE_SIMPLE_APPS_10K_DETAIL_DATA;
