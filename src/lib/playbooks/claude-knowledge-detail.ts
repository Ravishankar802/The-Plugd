import type { PlaybookDetailData } from "../dating-playbook-detail";
import { CLAUDE_KNOWLEDGE_MODULES } from "./claude-knowledge-data";

export const CLAUDE_KNOWLEDGE_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-03",
  slug: "give-me-26-minutes-ill-give-you-10000-hours-of-claude-knowledge",
  title: "Give Me 26 Minutes, I'll Give You 10,000 Hours of Claude Knowledge",
  headline: "A high-leverage distillation of advanced Claude 3.5 Sonnet capabilities, prompt architectures, memory calibration, Artifact prototyping, and desktop Co-work automation.",
  description: "A comprehensive, practical playbook distilling 10,000 hours of Anthropic Claude expertise into an actionable curriculum. Learn memory setup, Haiku vs Sonnet vs Opus token optimization, project context architecture, native Gmail/Calendar connectors, mobile dispatch, interactive React Artifacts, and building a $10,000/month workflow automation practice.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "Top Rated",
  rating: 4.9,
  ratingCount: 420,
  studentsCount: "1,650",
  instructorName: "Plugd Enterprise Team",
  instructorTitle: "Senior AI Systems Architects & Solo Strategists",
  instructorBio: "The Plugd Enterprise Team advises founders, solo operators, and creators on deploying high-margin AI workflows, zero-ad client acquisition flywheels, and scalable digital assets.",
  instructorRating: 4.9,
  instructorReviews: "420",
  instructorStudents: "1,650",
  instructorCourses: 5,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "6.5 hours",
  modulesCount: 6,
  lessonsCount: 24,
  slidesCount: 96,
  whatYouWillLearn: [
    "Master the end-to-end framework of Give Me 26 Minutes, I'll Give You 10,000 Hours of Claude Knowledge",
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
      "A comprehensive, practical playbook distilling 10,000 hours of Anthropic Claude expertise into an actionable curriculum. Learn memory setup, Haiku vs Sonnet vs Opus token optimization, project context architecture, native Gmail/Calendar connectors, mobile dispatch, interactive React Artifacts, and building a $10,000/month workflow automation practice.",
      "Every single lesson in this comprehensive 6-module curriculum combines interactive executive presentation slides with deep, step-by-step written implementation blueprints, unit economics calculations, and real-world failure mitigation strategies.",
      "Engineered specifically for solo operators and founders looking to build a sustainable, highly lucrative business with 95%+ net profit margins."
    ],
    keyPointsTitle: "The 6-Module Comprehensive Curriculum",
    keyPoints: [
      "Module 01: Account Permanence & The Memory Calibration Protocol",
      "Module 02: Model Architecture & Token Economy: Haiku vs Sonnet vs Opus",
      "Module 03: Context Window Architecture: The Reality of Claude Projects",
      "Module 04: Connectors & Real-World Operating Integration",
      "Module 05: Desktop Co-Work & Remote Dispatch Automation",
      "Module 06: Interactive Artifacts & Commercializing to $10,000/Month"
],
    closing: [
      "Every lesson includes both presentation slides and a comprehensive written implementation guide.",
      "Eliminate confusion, master the practical systems, and begin executing your solo enterprise today."
    ]
  },
  targetAudience: [
    "Entrepreneurs who want to automate 80% of their operational tasks with Claude",
    "Professionals looking to transition from basic ChatGPT prompting to elite Claude Sonnet architecture",
    "Developers and designers who want to build and prototype full web apps in minutes with Artifacts",
    "Consultants aiming to package Claude workflow integrations into $10,000/month recurring retainers"
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
  modules: CLAUDE_KNOWLEDGE_MODULES.map((mod) => ({
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
