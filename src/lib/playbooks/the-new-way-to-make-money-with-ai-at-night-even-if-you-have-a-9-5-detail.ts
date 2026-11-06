import type { PlaybookDetailData } from "../dating-playbook-detail";
import { NIGHT_AI_MONEY_MODULES } from "./the-new-way-to-make-money-with-ai-at-night-even-if-you-have-a-9-5-data";

export const NIGHT_AI_MONEY_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-77",
  slug: "the-new-way-to-make-money-with-ai-at-night-even-if-you-have-a-9-5",
  title: "The New Way to Make Money with AI at Night (Even If You Have a 9-5)",
  headline: "A step-by-step guide to launching an AI-powered service business alongside your 9-to-5, from choosing a profitable niche to landing and delivering your first client project.",
  description: "Learn how to spot services businesses already pay for, evaluate opportunities using AI research, and choose an offer that matches your skills and available time. Then build a portfolio with practical samples, identify qualified prospects, write personalised outreach, create a simple service website, and use AI agents to streamline repetitive work. Includes ready-to-use prompts, templates, and a 30-day execution plan.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,680",
  instructorName: "Jason Teo",
  instructorTitle: "AI Systems Architect & Digital Operator",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,680",
  instructorCourses: 3,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996183/The_New_Way_to_Make_Money_with_AI_at_Night_Even_If_You_Have_a_9-5.png",
  hoursOfMaterial: "10.4 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Spot services businesses already pay for and evaluate opportunities with AI research",
    "Structure an impenetrable energy and operational firewall protecting your 9-to-5 career",
    "Configure autonomous AI research agents to scan market openings and qualify prospects overnight",
    "Build original commercial proof assets for real brands to overcome impostor syndrome completely",
    "Construct a 10-point prospect qualification scorecard and detect live buying signals in ad libraries",
    "Draft high-reply, permission-first cold outreach that respects executive time and earns positive replies",
    "Deploy a conversion-optimized single-page service website and frictionless booking architecture",
    "Conduct consultative discovery calls and package low-risk paid micro-pilots that close immediately"
  ],
  relatedTopics: [
    "AI Service Businesses",
    "Nocturnal Side Hustles",
    "B2B Cold Outreach",
    "Ad Creative Strategy",
    "Autonomous Agent Workflows",
    "Asynchronous Client Delivery"
  ],
  requirements: [
    "A computer with a standard web browser and reliable internet access",
    "Basic familiarity with conversational AI interfaces (ChatGPT, Claude, or equivalent LLMs)",
    "Dedication of 10-15 focused hours per week outside of normal employment obligations",
    "Commitment to ethical commercial standards, data privacy compliance, and radical transparency"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive operating manual for The New Way to Make Money with AI at Night (Even If You Have a 9-5). This playbook turns the principles of asynchronous AI leverage into a disciplined, repeatable business engine built to run outside your full-time job.",
      "Rather than chasing the passive-income illusion or blasting thousands of generic AI spam emails, this curriculum establishes the exact step-by-step operating architecture required to find validated customer demand, create undeniable proof assets, qualify high-probability prospects, earn conversation permissions, and deliver agency-grade work in ninety minutes of focused evening execution.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: Foundations of Nocturnal AI Leverage & The 4-Filter Selection Matrix",
      "Act 2: Autonomous Market Research & Niche Identification",
      "Act 3: Proof Engineering & Specimen Portfolio Development",
      "Act 4: Precision Prospecting & Signal-Based Lead Scoring",
      "Act 5: Permission-First Outreach & The Conversion Web Presence",
      "Act 6: Consultative Discovery, Pilot Scoping & Production Delivery",
      "Act 7: Operational Scaling, Schedule Governance & 30-Day Execution Roadmap"
    ],
    closing: [
      "Whether you are a full-time corporate employee wanting to build an independent income stream or an experienced professional looking to transition into high-margin digital services, this playbook provides the exact frameworks, prompt architectures, and contracts needed to launch and scale with confidence."
    ]
  },
  targetAudience: [
    "Full-time employees seeking to build a sustainable, profitable side business without quitting their jobs.",
    "Freelancers and creators looking to transition from low-leverage manual hours to high-leverage AI-assisted services.",
    "Aspiring digital operators who want a structured, hype-free blueprint grounded in real commercial economics.",
    "Agency professionals aiming to unbundle slow agency services into fast, modular nocturnal offerings."
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Autonomous Lead Discovery Prompts & Prompt Architecture Blueprints" },
    { iconName: "file-text", text: "10-Point Qualification Scorecard, Micro-Pilot Contracts & 30-Day Roadmaps" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: NIGHT_AI_MONEY_MODULES.map((mod) => ({
    id: mod.id,
    number: String(mod.number),
    title: mod.title,
    description: mod.description,
    duration: "88 min",
    lessonsCount: mod.lessons.length,
    lessons: mod.lessons.map((les: any, idx: number) => ({
      id: les.id,
      number: String(les.number),
      title: les.title,
      duration: les.duration,
      isPreview: idx === 0 && mod.number === "01",
    })),
  })),
  testimonials: [
    {
      name: "Caleb Morrison",
      role: "Operations Analyst & Digital Builder",
      rating: 5,
      quote: "I've been wanting to start something on the side but kept getting stuck choosing an idea. The four-filter approach made the decision much clearer. I also liked that it pushes you to create an actual sample instead of spending weeks calling yourself an entrepreneur without having anything to show.",
      initials: "C",
      date: "August 04 2026"
    },
    {
      name: "Isabella",
      role: "Marketing Specialist & Operator",
      rating: 5,
      quote: "The prospect research and outreach sections are excellent. I especially appreciate the emphasis on finding real buying signals rather than scraping random business contacts. The prompts are detailed enough to adapt, and the advice on personally reviewing every message is important.",
      initials: "I",
      date: "August 08 2026"
    },
    {
      name: "Darius",
      role: "Corporate Software Engineer",
      rating: 5,
      quote: "Finally, an AI side-hustle guide that doesn't pretend you can press a button and wake up with money. The human-plus-AI workflow makes sense, especially for someone working full-time. The evening schedule and 30-day plan make the whole thing feel achievable.",
      initials: "D",
      date: "August 14 2026"
    },
    {
      name: "Priya",
      role: "Creative Strategist",
      rating: 5,
      quote: "My favourite part is how the playbook connects everything: choosing a service, making proof, finding prospects, getting conversations, and delivering the work. The pilot-scope and weekly-review templates are particularly useful. It's a solid starting point for turning AI skills into an actual service.",
      initials: "P",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "Can I realistically execute this playbook while working a full-time 9-to-5 job?",
      answer: "Yes. The entire operating architecture is specifically designed around a strict 10-hour weekly time budget across evenings and weekends. All client interactions and deliverables are structured asynchronously in 24-to-48-hour batches, preventing any conflict with daytime corporate employment."
    },
    {
      question: "Do I need advanced programming skills or machine learning expertise?",
      answer: "No. The playbook focuses on human-directed AI leverage using standard conversational models, structured prompting architectures, visual layout software, and public commercial databases. No coding or custom model training is required."
    },
    {
      question: "What service niches are best suited for this nocturnal operating model?",
      answer: "The curriculum provides detailed deep dives into high-demand, low-competition services that can be batched asynchronously, including static paid-social ad concepting for DTC brands, AI search engine optimization (GEO/AEO), B2B thought-leadership content systems, and enriched lead intelligence."
    },
    {
      question: "How quickly can I land my first paying commercial client?",
      answer: "The 30-day execution roadmap is engineered to guide an operator from initial skill inventory in Week 1 to custom specimen creation in Week 2, prospect qualification in Week 3, and closing an introductory paid micro-pilot ($300–$500) in Week 4."
    }
  ]
};
