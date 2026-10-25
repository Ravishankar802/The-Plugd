import type { PlaybookDetailData } from "../dating-playbook-detail";
import { CHATGPT_KNOWLEDGE_MODULES } from "./chatgpt-knowledge-data";

export const CHATGPT_KNOWLEDGE_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-04",
  slug: "give-me-28-minutes-ill-give-you-10000-hours-of-chatgpt-knowledge",
  title: "Give Me 28 Minutes, I'll Give You 10,000 Hours of ChatGPT Knowledge",
  headline: "A concentrated masterclass on ChatGPT customization, counter-sycophancy Devil's Advocate reasoning, OpenAI o1/o3 architectures, scheduled automations, and Custom GPTs.",
  description: "An exhaustive, battle-tested masterclass decoding the advanced capabilities of ChatGPT. Move beyond standard chat into custom instructions, counteracting AI sycophancy with Devil's Advocate stress-testing, commanding OpenAI o1 and o3-mini reasoning, hands-free mobile audio synthesis, autonomous screen execution, and packaging Custom GPTs to hit $10,000+/month.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "Hot & New",
  rating: 4.9,
  ratingCount: 395,
  studentsCount: "1,510",
  instructorName: "Plugd Enterprise Team",
  instructorTitle: "Senior AI Systems Architects & Solo Strategists",
  instructorBio: "The Plugd Enterprise Team advises founders, solo operators, and creators on deploying high-margin AI workflows, zero-ad client acquisition flywheels, and scalable digital assets.",
  instructorRating: 4.9,
  instructorReviews: "395",
  instructorStudents: "1,510",
  instructorCourses: 5,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "7.0 hours",
  modulesCount: 7,
  lessonsCount: 28,
  whatYouWillLearn: [
    "Master the end-to-end framework of Give Me 28 Minutes, I'll Give You 10,000 Hours of ChatGPT Knowledge",
    "Implement step-by-step workflows with zero coding or machine learning background required",
    "Deploy specialized tools and generative models with production-grade prompt architectures",
    "Eliminate expensive paid advertising with proven organic, zero-ad customer acquisition",
    "Package high-ticket consulting retainers and digital assets yielding $10k+/Month",
    "Run an entire solo enterprise with software overhead capped at under $200/month",
    "Overcome common cognitive biases, tool limitations, and client negotiation objections",
    "Follow the exact milestone roadmap to reach $10,000/Month ($120,000/Year) with zero employees"
],
  relatedTopics: [
    "AI Businesses",
    "Solopreneurship",
    "Generative AI",
    "Client Acquisition",
    "Digital Products",
    "Workflow Automation"
  ],
  requirements: [
    "A computer with a web browser and reliable internet connection",
    "No previous coding, machine learning, or software development experience required",
    "Commitment to execute the step-by-step practical implementation exercises"
  ],
  descriptionSections: {
    intro: [
      "An exhaustive, battle-tested masterclass decoding the advanced capabilities of ChatGPT. Move beyond standard chat into custom instructions, counteracting AI sycophancy with Devil's Advocate stress-testing, commanding OpenAI o1 and o3-mini reasoning, hands-free mobile audio synthesis, autonomous screen execution, and packaging Custom GPTs to hit $10,000+/month.",
      "Every single lesson in this comprehensive 7-module curriculum combines interactive executive presentation slides with deep, step-by-step written implementation blueprints, unit economics calculations, and real-world failure mitigation strategies.",
      "Engineered specifically for solo operators and founders looking to build a sustainable, highly lucrative business with 95%+ net profit margins."
    ],
    keyPointsTitle: "The 7-Module Comprehensive Curriculum",
    keyPoints: [
      "Module 01: Custom Instructions & Personalization Architecture",
      "Module 02: Countering Sycophancy & The Devil's Advocate Protocol",
      "Module 03: Multi-Mode Orchestration: GPT-4o vs OpenAI o1 & o3-Mini",
      "Module 04: Mobile Audio Hub & Walking Brainstorming Workflows",
      "Module 05: Scheduled Automations & Autonomous Screen Control",
      "Module 06: Specialist Custom GPTs & API Tool-Calling Architecture",
      "Module 07: Monetizing ChatGPT Expertise to $10,000/Month Solo Income"
],
    closing: [
      "Every lesson includes both presentation slides and a comprehensive written implementation guide.",
      "Eliminate confusion, master the practical systems, and begin executing your solo enterprise today."
    ]
  },
  targetAudience: [
    "Business owners who feel ChatGPT merely agrees with them and need rigorous critical feedback",
    "Solopreneurs wanting to build autonomous scheduled briefing and telemetry agents",
    "Operators looking to deploy Custom GPTs integrated with external REST APIs and knowledge bases",
    "AI consultants wanting to monetize proprietary GPT setups at $3,500 upfront + $1,000/mo"
],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "file-text", text: "Interactive Slide Presentations & Deep Written Implementation Guides" },
    { iconName: "video", text: "Ready-to-Deploy Prompt Schemas, Tool Configs & Outreach Scripts" },
    { iconName: "infinity", text: "Lifetime Access & Continuous Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  testimonials: [
  {
    "name": "Marcus Vance",
    "role": "Solo Systems Operator",
    "rating": 5,
    "quote": "Following these exact zero-ad methods allowed me to sign my first 3 B2B retainers in under 3 weeks. No ad spend, pure profit.",
    "initials": "MV",
    "date": "October 2026"
  },
  {
    "name": "Elena Rostova",
    "role": "Automation Consultant",
    "rating": 5,
    "quote": "The written lessons provide more tactical depth than multi-thousand dollar courses. Everything is mathematically grounded.",
    "initials": "ER",
    "date": "October 2026"
  }
],
  faqs: [
  {
    "question": "Do I need coding or machine learning experience to apply this Playbook?",
    "answer": "No. All frameworks, prompt schemas, and automation setups are designed for non-technical solo founders using modern tools like Claude, ChatGPT, Make.com, and Airtable."
  },
  {
    "question": "How quickly can I realistically reach $10,000/month?",
    "answer": "Operators who execute the 60-to-90-minute daily acquisition protocol consistently typically secure their first pilot within 14 days and scale to 4\u20135 retainers or creator partnerships within 60 to 90 days."
  },
  {
    "question": "Are the slides and written guides included with purchase?",
    "answer": "Yes. Every lesson includes both an interactive executive slide presentation and an in-depth, step-by-step written implementation guide with full lifetime access."
  }
],
  modules: CHATGPT_KNOWLEDGE_MODULES.map((mod) => ({
    id: mod.id,
    number: mod.number,
    title: mod.title,
    duration: mod.duration,
    lessonsCount: mod.lessons.length,
    lessons: mod.lessons.map((l) => ({
      id: l.id,
      number: l.number,
      title: l.title,
      duration: l.duration
    }))
  }))
};
