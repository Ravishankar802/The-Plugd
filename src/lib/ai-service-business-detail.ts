import type { PlaybookDetailData, PlaybookDetailModule } from "./dating-playbook-detail";
import { AI_SERVICE_BUSINESS_MODULES_METADATA } from "./ai-service-business-curriculum";

const detailModules: PlaybookDetailModule[] = AI_SERVICE_BUSINESS_MODULES_METADATA.map((m) => ({
  id: m.id,
  number: m.number,
  title: m.title,
  description: m.description,
  duration: m.duration,
  lessons: m.lessons.map((l) => ({
    id: l.id,
    number: l.number,
    title: l.title,
    duration: l.duration,
    isPreview: l.id === "01-1",
  })),
}));

export const AI_SERVICE_BUSINESS_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-02",
  slug: "ai-businesses-02",
  title: "Build a $10,000/Month AI Service Business With Just 3 Core Tools",
  headline:
    "Master the 3 high-leverage tools to build, package, and sell high-ticket AI automation services to B2B clients.",
  description:
    "A comprehensive, practical roadmap teaching you how to build a 5-figure monthly recurring AI service business using Airtable, Claude 3.7, and Make.com. Learn the transparent unit economics, package high-value B2B deliverables, land clients with video audits, and manage recurring retainers with 90%+ profit margins.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "High Demand",
  rating: 4.9,
  ratingCount: 247,
  studentsCount: "1,180",
  instructorName: "Plugd Enterprise Team",
  instructorTitle: "B2B Systems Architects & AI Operations Specialists",
  instructorBio:
    "The Plugd Enterprise Team advises founders, operators, and consultants on packaging software-leveraged B2B services, automating operational bottlenecks, and structuring high-retention monthly retainers.",
  instructorRating: 4.9,
  instructorReviews: "247",
  instructorStudents: "1,180",
  instructorCourses: 2,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "5.5 hours",
  modulesCount: 7,
  lessonsCount: 28,
  whatYouWillLearn: [
    "Understand the realistic unit economics of $10,000/month: 5 to 8 clients on $1,000–$1,500/mo retainers",
    "Master the 3 Core Tools: Airtable (Relational OS), Claude 3.7 (Cognitive Engine), and Make.com (Autonomous Nervous System)",
    "Build the 'Inbound Lead Qualification & Instant Proposal Generator' that quotes clients in under 90 seconds",
    "Deploy the 'Executive Knowledge Extraction & Market Dossier Engine' using Claude's 200,000-token context window",
    "Create an automated 'Multi-Channel Content Repurposing Hub' with integrated Airtable staff approval interfaces",
    "Package three-tier B2B offers ($1,500 Sprint, $2,500 Core, and $4,500 Partner) with strict scope boundaries",
    "Run your agency at 88%+ net profit margins by having clients own and fund their own software licenses",
    "Land high-intent enterprise clients using interactive Airtable prototypes and 3-minute personalized Loom audits",
    "Master the 20-Minute Diagnostic Discovery Call and confidently overcome security, hallucination, and pricing objections",
    "Execute the 7-day client onboarding sequence and automate the 'Friday 4:00 PM Digest' that keeps retainers active for years",
  ],
  relatedTopics: [
    "AI Service Business",
    "Airtable & Databases",
    "Make.com Automation",
    "Claude 3.7 & Prompt Engineering",
    "B2B Agency Retainers",
    "Client Acquisition",
  ],
  requirements: [
    "No previous programming, computer science degree, or coding experience required",
    "A computer with internet access and a free Google/email account",
    "Free or trial accounts on Airtable, Anthropic Console, and Make.com",
  ],
  descriptionSections: {
    intro: [
      "Most aspiring agency founders fail because they chase 50 different shiny AI tools, bill $40 per hour on freelance marketplaces, and burn out competing against global low-cost labor.",
      "The founders who quietly generate $10,000+ every month follow a completely different playbook: they master a tight 3-tool tech stack, target established B2B companies with $50K+ monthly overhead, and deliver high-value systems that eliminate costly operational bottlenecks.",
      "Build a $10,000/Month AI Service Business With Just 3 Core Tools is an exhaustive, implementation-focused curriculum. It teaches you how to design, package, sell, and maintain high-ticket AI automation solutions for businesses that eagerly pay $1,000 to $2,500 per month.",
    ],
    keyPointsTitle: "Comprehensive 7-Module Curriculum",
    keyPoints: [
      "Module 1 (Unit Economics): The mathematical equation to $10,000 MRR, niche selection criteria, and pain point diagnosis",
      "Module 2 (The 3 Core Tools): Relational schemas in Airtable, deterministic JSON prompts in Claude 3.7, and cloud routing in Make.com",
      "Module 3 (Core Deliverables): Full blueprints for Inbound Lead Triage, Document Extraction Dossiers, and Content Repurposing Portals",
      "Module 4 (Packaging & Pricing): Three-tier offer psychology, flat sprint fees ($1,500–$3,500) + recurring retainers ($750–$1,500), and bulletproof SOWs",
      "Module 5 (Client Acquisition): Interactive proof-of-concept demos, frictionless 3-minute video audits, warm referrals, and 20-minute discovery calls",
      "Module 6 (Client Management): Handling enterprise security objections, 7-day client onboarding, automated Friday ROI reports, and account expansion",
      "Module 7 (Operations & Scale): Automating your internal CRM in Airtable, managing 8 retainers in under 20 hours a week, and the 90-day execution calendar",
    ],
    closing: [
      "Every single lesson provides both an interactive, executive slide presentation deck and a comprehensive step-by-step written guide complete with architectural diagrams, transparent calculations, real-world scenarios, and actionable tasks.",
      "Whether you are an established freelancer seeking recurring retainer stability or an ambitious professional launching an AI service firm, this Playbook provides the exact operational blueprints to reach $10,000 per month.",
    ],
  },
  targetAudience: [
    "Freelancers, developers, and consultants seeking recurring monthly B2B retainers",
    "Aspiring agency founders who want to build a high-margin AI firm without hiring employees",
    "No-code and automation enthusiasts ready to package their skills into high-ticket enterprise solutions",
    "Professionals looking for a disciplined, predictable system to replace their full-time salary",
  ],
  includes: [
    { iconName: "layers", text: "7 In-Depth Modules & 28 Structured Lessons" },
    { iconName: "file-text", text: "Interactive Slide Presentations & Full Written Implementation Guides" },
    { iconName: "video", text: "Architecture Diagrams, SOW Templates & Sales Call Scripts" },
    { iconName: "smartphone", text: "Fully Responsive Mobile & Desktop Learning Experience" },
    { iconName: "infinity", text: "One-Time Payment with Lifetime Access & Future Updates" },
    { iconName: "shield-check", text: "30-Day Money-Back Guarantee & Production-Safe Architecture" },
  ],
  modules: detailModules,
  testimonials: [
    {
      name: "Marcus Vance",
      role: "Founder, Apex Operations",
      rating: 5,
      quote:
        "The shift from pitching hourly chatbot builds to offering the Inbound Proposal Engine changed everything. Signed two commercial trade clients at $2,500 setup + $850/mo retainer in our first 30 days.",
      initials: "MV",
      date: "October 2026",
    },
    {
      name: "Elena Rostova",
      role: "Automation Consultant",
      rating: 5,
      quote:
        "The section on client-owned accounts and error handling alone saved me thousands in potential mistakes. Managing 6 retainers takes me roughly 12 hours a week now.",
      initials: "ER",
      date: "October 2026",
    },
  ],
  faqs: [
    {
      question: "Why specifically Airtable, Claude 3.7, and Make.com?",
      answer:
        "These three tools form the complete enterprise delivery stack: Airtable provides the relational database and client portal interfaces; Claude 3.7 delivers world-class cognitive reasoning and 200K-token document extraction; Make.com acts as the 24/7 cloud nervous system connecting them to customer forms, email, and CRMs. Master these three, and you can solve 99% of B2B operational bottlenecks without writing custom code.",
    },
    {
      question: "Do I need technical coding experience to succeed?",
      answer:
        "No. All three tools feature modern visual interfaces. We teach you how to think in terms of relational schemas, system prompts, and visual webhook logic without writing code.",
    },
    {
      question: "Is the $10,000/month revenue figure guaranteed?",
      answer:
        "No. $10,000/month is an illustrative operational milestone broken down mathematically throughout the course (for example: 6 clients on a $1,250/mo retainer, or 2 sprint setups at $2,500 plus 5 retainers at $1,000/mo). Achieving it requires disciplined execution of the prospecting, delivery, and retention methodologies taught in the Playbook.",
    },
    {
      question: "Is this a recurring subscription or a one-time payment?",
      answer: "Exactly $3 USD one-time payment with lifetime access. No subscriptions or hidden fees.",
    },
  ],
};
