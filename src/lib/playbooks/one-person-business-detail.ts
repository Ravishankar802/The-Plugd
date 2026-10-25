import type { PlaybookDetailData } from "../dating-playbook-detail";
import { ONE_PERSON_BUSINESS_MODULES } from "./one-person-business-data";

export const ONE_PERSON_BUSINESS_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-08",
  slug: "build-a-one-person-business-as-a-beginner-from-0-to-10k",
  title: "Build A One-Person Business As A Beginner (From $0 To $10K)",
  headline: "The complete zero-to-$10k roadmap for beginner solo founders: finding specific knowledge, crafting an MVO, setting up a 1-page funnel, and scaling with AI.",
  description: "A comprehensive operational blueprint guiding first-time entrepreneurs from absolute zero to $10,000/month. Discover how to identify your unfair advantage, package a minimum viable offer at $2,000/month, build a frictionless 1-page conversion funnel, acquire clients without ad spend, automate delivery with AI, and maintain extreme 95%+ profit margins.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "Founder Pick",
  rating: 4.9,
  ratingCount: 528,
  studentsCount: "2,380",
  instructorName: "Plugd Enterprise Team",
  instructorTitle: "Senior AI Systems Architects & Solo Strategists",
  instructorBio: "The Plugd Enterprise Team advises founders, solo operators, and creators on deploying high-margin AI workflows, zero-ad client acquisition flywheels, and scalable digital assets.",
  instructorRating: 4.9,
  instructorReviews: "528",
  instructorStudents: "2,380",
  instructorCourses: 5,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "8.5 hours",
  modulesCount: 8,
  lessonsCount: 32,
  slidesCount: 128,
  whatYouWillLearn: [
    "Master the end-to-end framework of Build A One-Person Business As A Beginner (From $0 To $10K)",
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
      "A comprehensive operational blueprint guiding first-time entrepreneurs from absolute zero to $10,000/month. Discover how to identify your unfair advantage, package a minimum viable offer at $2,000/month, build a frictionless 1-page conversion funnel, acquire clients without ad spend, automate delivery with AI, and maintain extreme 95%+ profit margins.",
      "Every single lesson in this comprehensive 8-module curriculum combines interactive executive presentation slides with deep, step-by-step written implementation blueprints, unit economics calculations, and real-world failure mitigation strategies.",
      "Engineered specifically for solo operators and founders looking to build a sustainable, highly lucrative business with 95%+ net profit margins."
    ],
    keyPointsTitle: "The 8-Module Comprehensive Curriculum",
    keyPoints: [
      "Module 01: The One-Person Business Architecture & The Solopreneur Mindset",
      "Module 02: Selecting Your Unfair Advantage & The Specific Knowledge Niche",
      "Module 03: Crafting the Irresistible Minimum Viable Offer (MVO)",
      "Module 04: The Frictionless Sales Funnel & High-Converting Landing Page",
      "Module 05: Zero-Ad Customer Acquisition & Inbound Pull Content",
      "Module 06: Lean Operations, AI Automation & Deep Work Discipline",
      "Module 07: Client Delivery, Extreme Quality & Referral Loops",
      "Module 08: The Step-by-Step Roadmap from $0 to $10,000/Month"
],
    closing: [
      "Every lesson includes both presentation slides and a comprehensive written implementation guide.",
      "Eliminate confusion, master the practical systems, and begin executing your solo enterprise today."
    ]
  },
  targetAudience: [
    "Aspiring solopreneurs stuck in analysis paralysis who need a verified zero-to-$10k blueprint",
    "Employees planning a clean, low-risk transition from corporate employment to solo autonomy",
    "Service providers wanting to escape the hourly billing trap and sell high-ticket outcomes",
    "Beginner founders wanting to keep software overhead under $100/month with zero staff"
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
  modules: ONE_PERSON_BUSINESS_MODULES.map((mod) => ({
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
