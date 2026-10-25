import type { PlaybookDetailData } from "../dating-playbook-detail";
import { ONE_PERSON_BUSINESS_MODULES } from "./one-person-business-data";

export const ONE_PERSON_BUSINESS_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-08",
  slug: "build-a-one-person-business-as-a-beginner-from-0-to-10k",
  title: "Build A One-Person Business As A Beginner (From $0 To $10K)",
  headline: "A grounded, fluff-free beginner roadmap for solo founders: avoiding overcomplication, validating offers in 7 days, building leverage with digital assets, and scaling from $0 to $10k.",
  description: "The definitive beginner's roadmap to building a profitable, stress-free solo business from scratch. Master the Rule of Ones (1 target audience, 1 core offer, 1 acquisition channel), validate painful customer problems in 7 days, craft messaging that speaks directly to ideal buyers, deploy build-once-sell-forever digital assets, and follow the 3 milestones to $10,000/month with zero employees.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "Founder Pick",
  rating: 4.9,
  ratingCount: 528,
  studentsCount: "2,350",
  instructorName: "Plugd Enterprise Team",
  instructorTitle: "Senior AI Systems Architects & Solo Strategists",
  instructorBio: "The Plugd Enterprise Team advises founders, solo operators, and creators on deploying high-margin AI workflows, zero-ad client acquisition flywheels, and scalable digital assets.",
  instructorRating: 4.9,
  instructorReviews: "528",
  instructorStudents: "2,350",
  instructorCourses: 5,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "7.0 hours",
  modulesCount: 7,
  lessonsCount: 28,
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
      "The definitive beginner's roadmap to building a profitable, stress-free solo business from scratch. Master the Rule of Ones (1 target audience, 1 core offer, 1 acquisition channel), validate painful customer problems in 7 days, craft messaging that speaks directly to ideal buyers, deploy build-once-sell-forever digital assets, and follow the 3 milestones to $10,000/month with zero employees.",
      "Every single lesson in this comprehensive 7-module curriculum combines interactive executive presentation slides with deep, step-by-step written implementation blueprints, unit economics calculations, and real-world failure mitigation strategies.",
      "Engineered specifically for solo operators and founders looking to build a sustainable, highly lucrative business with 95%+ net profit margins."
    ],
    keyPointsTitle: "The 7-Module Comprehensive Curriculum",
    keyPoints: [
      "Module 01: The Solopreneur Mindset & Eradicating Complexity",
      "Module 02: Rapid Offer Validation & The 7-Day Pre-Sale Framework",
      "Module 03: High-Resonance Messaging & The 'Talking Directly to Me' Effect",
      "Module 04: The Build-Once, Sell-Forever Digital Asset Engine",
      "Module 05: Zero-Ad Customer Acquisition & Inbound Pull Content",
      "Module 06: Lean Operations, AI Automation & Deep Work Discipline",
      "Module 07: The Step-by-Step Roadmap from $0 to $10,000/Month"
],
    closing: [
      "Every lesson includes both presentation slides and a comprehensive written implementation guide.",
      "Eliminate confusion, master the practical systems, and begin executing your solo enterprise today."
    ]
  },
  targetAudience: [
    "Beginners overwhelmed by complex business models who want a simple, direct roadmap to $10k/month",
    "Solo founders wanting to validate their offer with real paying customers before investing months of work",
    "Freelancers ready to transition into build-once, sell-forever leveraged digital assets",
    "Individuals seeking time freedom, 4-hour deep work days, and an overhead under $100/month"
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
