import type { PlaybookDetailData } from "../dating-playbook-detail";
import { MARKETING_AGENTS_TOO_GOOD_MODULES } from "./marketing-agents-are-too-good-now-data";

export const MARKETING_AGENTS_TOO_GOOD_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-68",
  slug: "marketing-agents-are-too-good-now",
  title: "Marketing Agents Are Too Good Now",
  headline: "Go beyond basic automations. Learn to build AI marketing agents that understand customer behaviour, create campaigns, manage ads, and improve their decisions using real business data.",
  description: "What if your marketing system could do more than follow instructions? This playbook walks through the architecture behind autonomous marketing agents—from connecting analytics, CRM, and revenue data to generating ad creatives, testing campaigns, and learning from performance. It also explores AI-first product opportunities, practical agent workflows, implementation roadmaps, and the safeguards needed before handing AI control of real marketing operations.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "4.8k",
  studentsCount: "3,920",
  instructorName: "Jack Robertson",
  instructorTitle: "Autonomous Systems Architect & Performance Marketing Lead",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.8k",
  instructorStudents: "3,920",
  instructorCourses: 3,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996181/Marketing_Agents_Are_Too_Good_Now.png",
  hoursOfMaterial: "9.5 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Master the complete technical architecture of Marketing Agents Are Too Good Now",
    "Integrate Meta Ads, Google Analytics, PostHog, HubSpot, and Stripe into unified ClickHouse schemas",
    "Mine customer communities and forums with Perplexity to isolate high-intent pain points and desired outcomes",
    "Build automated creative generation pipelines with multi-modal vision quality control and brand guidelines",
    "Safely integrate with the Facebook Marketing API using least-privilege scopes and sandboxed draft staging",
    "Operate high-velocity 10-ads-per-day testing loops, manage winners pools, and prevent creative entropy"
  ],
  relatedTopics: [
    "AI Marketing Agents",
    "Performance Marketing",
    "Meta Ads Automation",
    "Revenue Attribution",
    "Data Pipelines",
    "Autonomous Growth"
  ],
  requirements: [
    "A computer with an internet connection",
    "Basic familiarity with online marketing metrics (CAC, LTV, ROAS)",
    "Interest in building or supervising autonomous software agents and growth pipelines",
    "Zero prior Python programming or deep technical data engineering required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive masterclass on Marketing Agents Are Too Good Now. This playbook transforms cutting-edge autonomous agent theory into a practical, step-by-step engineering manual for digital founders, growth marketers, and modern operators.",
      "Rather than relying on fragile linear automation scripts or asking ChatGPT to draft superficial ads, this curriculum demonstrates how to unite full-funnel business data, run bounded decision loops, stage creative campaigns safely, and let real customer revenue guide marketing investments.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: The Autonomous Marketing Agent Architecture",
      "Act 2: Unified Data Pipelines & Customer Journey Attribution",
      "Act 3: Customer Pain-Point Discovery & Reddit Mining",
      "Act 4: The Automated Creative Generation Pipeline",
      "Act 5: Safe Meta Ads Integration & Bounded API Execution",
      "Act 6: The Autonomous Testing Loop & Creative Entropy Solutions",
      "Act 7: Full Implementation Roadmap & Enterprise Safeguards"
    ],
    closing: [
      "Every lesson is designed for immediate tactical execution, complete with 24-hour action directives and sovereign battle decision matrices.",
      "Join thousands of modern operators who use these exact frameworks to build lean, authoritative, and profitable media and software engines."
    ]
  },
  targetAudience: [
    "Growth marketers looking to transcend manual ad management with autonomous, data-driven agent loops",
    "Software founders seeking to build self-optimizing distribution engines directly into their products",
    "Performance marketing agencies looking to automate creative testing and deliver 10x output for clients",
    "Digital operators committed to building defensible, high-leverage marketing systems with strict risk safeguards"
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Ready-to-Deploy 8-Phase Staged Implementation Roadmap & Operating Contracts" },
    { iconName: "file-text", text: "Warehouse Schemas, Vision QC Prompts & 10-Ads/Day Testing SOPs" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: MARKETING_AGENTS_TOO_GOOD_MODULES.map((mod) => ({
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
      isPreview: idx === 0 && mod.number === "01",
    })),
  })),
  testimonials: [
    {
      name: "Harshil Deshmukh",
      role: "Growth Engineer",
      rating: 5,
      quote: "I finally understand the difference between an AI automation and an actual agent. The architecture section made the whole concept click, especially how advertising data, CRM activity, and revenue can work together.",
      initials: "HD",
      date: "August 2026"
    },
    {
      name: "Elena Brooks",
      role: "Performance Marketing Lead",
      rating: 5,
      quote: "Loved that this goes beyond prompting ChatGPT to write ads. The creative pipeline, feedback loops, and campaign decision systems gave me a much clearer picture of what building a real marketing agent involves.",
      initials: "EB",
      date: "August 2026"
    },
    {
      name: "Karthik Reddy",
      role: "SaaS Founder",
      rating: 5,
      quote: "The implementation roadmap is probably my favourite part. It breaks a pretty intimidating project into manageable stages, starting with read-only analysis before moving towards automated actions. Very practical.",
      initials: "KR",
      date: "August 2026"
    }
  ],
  faqs: [
    {
      question: "Can I build these marketing agents without a dedicated engineering team?",
      answer: "Yes. The playbook provides clear modular architectures using open-source tools like Airbyte and ClickHouse alongside managed cloud hosting options, allowing solo founders and small growth teams to deploy them."
    },
    {
      question: "Will an autonomous marketing agent risk spending budget without my permission?",
      answer: "No. The entire system is built around bounded autonomy and least-privilege security. High-impact actions like budget scaling and live publishing require human signoff, and hardcoded spend caps protect your account."
    },
    {
      question: "Which advertising platforms are covered in this playbook?",
      answer: "While Meta Ads serves as the primary technical implementation example, the four-layer architecture applies directly to Google Ads, LinkedIn Ads, cold email systems, and organic content pipelines."
    },
    {
      question: "What is included with my one-time purchase?",
      answer: "You receive full lifetime digital access to the complete 7-module visual presentation player (112 slides), 28 comprehensive written lesson guides, operating contracts, prompt templates, and all future curriculum updates with zero subscription fees."
    }
  ]
};
