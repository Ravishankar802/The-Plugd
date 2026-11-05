import type { PlaybookDetailData } from "../dating-playbook-detail";
import { THE_1000_HOUR_1_PERSON_AI_BUSINESS_MODULES } from "./the-1000-hour-1-person-ai-business-data";

export const THE_1000_HOUR_1_PERSON_AI_BUSINESS_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-103",
  slug: "the-1-000-hour-1-person-ai-business",
  title: "The $1,000/hour 1-person AI business",
  headline: "Turn AI into a one-person growth business: find local companies losing customers, fix their marketing funnels, and build a high-value service around measurable results.",
  description: "**Turn AI into a one-person growth business: find local companies losing customers, fix their marketing funnels, and build a high-value service around measurable results.**\n\nLearn how to build an AI-assisted marketing service for established local businesses, from choosing a profitable niche and finding high-value prospects to auditing websites, building landing pages, and improving lead conversion. This playbook includes the Dream 100 acquisition strategy, outreach templates, pricing frameworks, practical AI prompts, client reporting systems, and a complete 90-day execution roadmap.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,820",
  instructorName: "Divya Tiwari",
  instructorTitle: "Local Growth & Client Acquisition Architect",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,820",
  instructorCourses: 1,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793023911/The_1_000_hour_1_person_AI_business.png",
  hoursOfMaterial: "9.2 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Identify high-value local trade businesses ($2M–$20M revenue) with existing ad budgets and massive conversion leaks",
    "Conduct forensic ad-to-page audits that prove to owners exactly where their paid clicks evaporate into bounces",
    "Design high-converting multi-intent landing pages catering simultaneously to emergency callers, price researchers, and online schedulers",
    "Craft direct-response trade copy and local trust architecture using structured Claude prompt chains",
    "Execute the Dream 100 client acquisition framework with personalized 3-minute video audits and dimensional lumpy mail",
    "Structure sprint-plus-retainer pricing models ($1,500–$3,500 setup + $1,000–$2,500/mo) anchored to average job value",
    "Deliver executive one-page ROI reports that track qualified calls and booked jobs to keep client retention above 98%",
    "Follow the complete 90-day execution roadmap to build a sovereign $10,000+/month one-person consultancy"
  ],
  relatedTopics: [
    "AI",
    "Local Business Growth",
    "Conversion Audits",
    "Dream 100 Acquisition",
    "Landing Page Architecture",
    "One-Person Agency"
  ],
  requirements: [
    "A computer or smartphone with internet access and a modern web browser",
    "Willingness to evaluate business models using objective economics rather than vanity metrics",
    "Zero prior coding or advanced engineering background required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive masterclass on The $1,000/Hour 1-Person AI Business. This playbook is engineered for ambitious solopreneurs, digital builders, and independent operators seeking real, sustainable cashflow rather than fragile income hacks.",
      "The central insight of this playbook is that an HVAC or plumbing owner does not wake up wanting an AI agent—they want more profitable booked jobs from the advertising budget they already spend. By diagnosing conversion leaks and deploying high-converting landing pages with AI assistance, a single operator can capture immense commercial leverage.",
      "Every single lesson provides both a visual slide presentation and an in-depth written guide detailing step-by-step implementation, worked economic calculations, diagnostic checklists, and cold outreach scripts."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: The Main Street Opportunity & Economic Positioning",
      "Act 2: High-Value Trade Niche Selection & The Scorecard",
      "Act 3: Conversion-Leak Auditing & Ad-to-Page Congruency",
      "Act 4: High-Converting Multi-Intent Local Funnel Architecture",
      "Act 5: The AI-Powered One-Person Production Stack",
      "Act 6: Relationship Client Acquisition: Dream 100 & Lumpy Mail",
      "Act 7: Pricing, Retention Reporting & The 90-Day Scaling Blueprint"
    ],
    closing: [
      "Every lesson is designed for immediate tactical execution, complete with actionable battle exercises and forensic audit templates.",
      "Join thousands of operators worldwide who deploy these exact frameworks to validate demand, protect capital, and build sovereign cashflow."
    ]
  },
  targetAudience: [
    "Solopreneurs and digital operators wanting to build a high-margin service business without employees",
    "Consultants and marketing professionals seeking to escape commoditized retainer pricing",
    "AI enthusiasts who want to apply generative tools to real-world commercial problems on Main Street",
    "Anyone looking for a transparent, practical roadmap to client acquisition and high-leverage delivery"
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Cinematic Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Ready-to-Deploy Claude Prompt Chains, Teardown Scripts & Scorecards" },
    { iconName: "file-text", text: "Client Proposal Templates, Scope Boundary Agreements & Pilot SOPs" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: THE_1000_HOUR_1_PERSON_AI_BUSINESS_MODULES.map((mod) => ({
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
      isFree: idx === 0 && mod.number === "01",
    })),
  })),
  testimonials: [
    {
      name: "Aditya",
      role: "Growth Consultant",
      rating: 5,
      quote: "Excellent breakdown of how to actually sell AI services to businesses. The focus on fixing real marketing problems instead of pitching random AI automations completely changed how I look at this opportunity.",
      initials: "A",
      date: "August 04 2026"
    },
    {
      name: "Sanjana",
      role: "Local Marketing Strategist",
      rating: 5,
      quote: "The Dream 100 strategy and personalised audit templates are gold. I especially liked how the playbook explains finding businesses, identifying their conversion gaps, and approaching owners with something genuinely useful.",
      initials: "S",
      date: "August 08 2026"
    },
    {
      name: "Raghav",
      role: "Solopreneur & Developer",
      rating: 5,
      quote: "Very practical and well structured. The landing-page workflows, pricing logic, client acquisition system, and 90-day roadmap make this feel like an actual business blueprint rather than another AI side-hustle guide.",
      initials: "R",
      date: "August 14 2026"
    },
    {
      name: "Devika",
      role: "B2B Marketing Architect",
      rating: 5,
      quote: "My favourite part is the emphasis on measurable business results. It explains how to connect marketing improvements to qualified leads and booked jobs instead of blindly selling websites or AI agents. A genuinely valuable read.",
      initials: "D",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "How is this different from typical corporate training or video courses?",
      answer: "Most courses present sterile, boring slides filled with academic jargon. This playbook is structured like a cinematic story arc—breaking down the psychological crucibles, real-world failures, high-stakes decisions, and exact tactical mechanics that took operators from zero to multi-six and seven-figure independence."
    },
    {
      question: "Can I apply this if I am starting from absolute zero with no experience?",
      answer: "Yes. Every playbook follows a chronological hero's journey from ground zero (no capital, no audience, no technical skill) through validation, cashflow generation, and autonomous scaling."
    },
    {
      question: "What is included with my one-time purchase?",
      answer: "You receive full lifetime digital access to the complete multi-module visual presentation player, comprehensive written lesson guides, practical battle exercises, downloadable operational templates, and all future curriculum updates with zero subscription fees."
    },
    {
      question: "Can I access this on mobile or tablet devices?",
      answer: "Yes, the learning player and written reader are fully responsive and optimized for seamless viewing across smartphones, tablets, laptops, and ultra-wide desktop monitors."
    }
  ]
};
