import type { PlaybookDetailData } from "../dating-playbook-detail";
import { FIVE_PROVEN_WAYS_MODULES } from "./five-proven-ways-data";

export const FIVE_PROVEN_WAYS_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-05",
  slug: "5-proven-ways-to-make-money-with-ai-no-experience",
  title: "5 Proven Ways To Make Money With AI (No Experience)",
  headline: "Five accessible, verified AI business models designed for complete beginners: AI UGC, local website modernization, video clipping, B2B lead generation, and digital playbooks.",
  description: "A grounded, realistic roadmap breaking down the 5 most viable AI business models for newcomers. Evaluated through the 5-criteria scorecard (Longevity, Effort, Scalability, Autonomy, Margin), this playbook details step-by-step implementation, tech stacks, client closing scripts, and exact unit economics to build a $10,000/month income stream with zero employees.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "Bestseller",
  rating: 4.9,
  ratingCount: 512,
  studentsCount: "2,140",
  instructorName: "Plugd Enterprise Team",
  instructorTitle: "Senior AI Systems Architects & Solo Strategists",
  instructorBio: "The Plugd Enterprise Team advises founders, solo operators, and creators on deploying high-margin AI workflows, zero-ad client acquisition flywheels, and scalable digital assets.",
  instructorRating: 4.9,
  instructorReviews: "512",
  instructorStudents: "2,140",
  instructorCourses: 5,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "7.0 hours",
  modulesCount: 7,
  lessonsCount: 28,
  whatYouWillLearn: [
    "Master the end-to-end framework of 5 Proven Ways To Make Money With AI (No Experience)",
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
      "A grounded, realistic roadmap breaking down the 5 most viable AI business models for newcomers. Evaluated through the 5-criteria scorecard (Longevity, Effort, Scalability, Autonomy, Margin), this playbook details step-by-step implementation, tech stacks, client closing scripts, and exact unit economics to build a $10,000/month income stream with zero employees.",
      "Every single lesson in this comprehensive 7-module curriculum combines interactive executive presentation slides with deep, step-by-step written implementation blueprints, unit economics calculations, and real-world failure mitigation strategies.",
      "Engineered specifically for solo operators and founders looking to build a sustainable, highly lucrative business with 95%+ net profit margins."
    ],
    keyPointsTitle: "The 7-Module Comprehensive Curriculum",
    keyPoints: [
      "Module 01: The 5-Criteria Evaluation Matrix & Model Selection",
      "Module 02: Proven Model #1: AI User-Generated Content (UGC) for E-Commerce",
      "Module 03: Proven Model #2: AI Website Modernization for Local Businesses",
      "Module 04: Proven Model #3: AI Short-Form Content & Clipping for Creators",
      "Module 05: Proven Model #4: AI B2B Lead Generation & Automated Outreach",
      "Module 06: Proven Model #5: AI Digital Products & Niche Playbooks",
      "Module 07: The $10,000/Month Solo Blueprint: Stacking & Operating"
],
    closing: [
      "Every lesson includes both presentation slides and a comprehensive written implementation guide.",
      "Eliminate confusion, master the practical systems, and begin executing your solo enterprise today."
    ]
  },
  targetAudience: [
    "Complete beginners who want to start a proven AI side hustle without coding experience",
    "Freelancers looking to replace low-paying gigs with high-ticket B2B retainers and digital assets",
    "Creators interested in partnering with podcasters and brands on video clipping and UGC",
    "Aspiring solopreneurs seeking a 5/5 autonomy business model that sells digital products 24/7"
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
  modules: FIVE_PROVEN_WAYS_MODULES.map((mod) => ({
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
