import type { PlaybookDetailData } from "../dating-playbook-detail";
import { HOW_ID_START_20K_MONTH_AI_AGENCY_MODULES } from "./how-id-start-20k-month-ai-agency-data";

export const HOW_ID_START_20K_MONTH_AI_AGENCY_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-111",
  slug: "how-id-start-a-20k-month-ai-agency-with-claude-in-30-days",
  title: "How I'd Start a $20K/Month AI Agency With Claude in 30 Days",
  headline: "Build an AI agency that sells business results, not just AI tools. Find profitable niches, land high-value clients, partner with developers, and turn real business problems into a $20K/month agency opportunity — with a focused 30-day launch roadmap.",
  description: "**Build an AI agency that sells business results, not just AI tools. Find profitable niches, land high-value clients, partner with developers, and turn real business problems into a $20K/month agency opportunity — with a focused 30-day launch roadmap.**\n\nLearn how to launch an AI implementation agency using Claude for market research, niche selection, offer creation, prospecting, audits, and sales preparation. From finding business owners with expensive operational problems to closing projects, coordinating developers, delivering AI systems, and building recurring revenue, this playbook breaks down the entire agency-building process.\n\nIncludes Claude prompts, niche scorecards, outreach scripts, discovery call frameworks, proposal structures, pricing models, client delivery checklists, and a practical 30-day execution plan.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "0.1k",
  publishedAt: "2026-11-10",
  studentsCount: "4,910",
  instructorName: "Nathan Cole",
  instructorTitle: "Commercial Deal Architect & Agency Strategist",
  instructorBio: "Nathan Cole is an AI agency founder, commercial deal architect, and enterprise systems strategist. He specializes in client origination models, developer arbitrage frameworks, and high-margin AI automation workflows for service businesses.",
  instructorRating: 4.9,
  instructorReviews: "0.1k",
  instructorStudents: "4,910",
  instructorCourses: 2,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1794352587/How_I_d_start_ai_agency.png",
  hoursOfMaterial: "9.8 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Master the deal-originator model: originate high-ticket clients while partnering with developers for technical delivery",
    "Deploy the 3-niche portfolio framework (Background, High-Ticket, Recurring) and score opportunities using the 6-factor matrix",
    "Use Claude for prospect research, observable customer journey audits, discovery questionnaires, and tailored demo scripting",
    "Structure outcome-driven wedge offers that solve expensive operational problems without technical jargon",
    "Execute the multi-channel prospecting engine across phone blocks, personalized cold email, and B2B strategic referral networks",
    "Run the proven two-call sales methodology: diagnose workflow pain on Call One and present dual-option proposals on Call Two",
    "Implement technical governance SOPs: secure API credentials, data retention policies, and human fail-safe escalation triggers",
    "Deconstruct the $20,000/month agency financial model, build rejection resilience, and execute the complete 30-day launch roadmap"
  ],
  relatedTopics: [
    "AI Agency Operations",
    "Deal Origination Strategy",
    "B2B Consultative Sales",
    "Claude Market Research",
    "Developer Arbitrage",
    "Monthly Recurring Retainers"
  ],
  requirements: [
    "A computer, tablet, or smartphone with internet access and a modern web browser",
    "Willingness to conduct discovery conversations with business operators and validate demand",
    "Zero prior coding, software engineering, or technical development experience required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to How I'd Start a $20K/Month AI Agency With Claude in 30 Days. This masterclass provides a complete, battle-tested operational blueprint for building a high-ticket AI implementation agency.",
      "Rather than attempting to become a full-time software engineer or competing in low-margin freelance markets, you will master the deal-originator model: diagnosing expensive business inefficiencies, crafting compelling outcome-driven proposals, and coordinating skilled developers to execute delivery while securing healthy gross margins and recurring monthly retainers."
    ],
    keyPoints: [
      "Act 1: Deal-Originator Architecture & Agency Foundations",
      "Act 2: Days 1–3: The Three-Niche Selection Portfolio & Claude Research",
      "Act 3: Days 4–7: Market Validation & Outcome-Led Offer Engineering",
      "Act 4: Days 8–21: Multi-Channel Client Acquisition & Prospecting Engines",
      "Act 5: Diagnostic Audits, Proof Demos & The Two-Call Sales Method",
      "Act 6: Technical Implementation, Developer Coordination & Client Retention",
      "Act 7: The $20K/Month Financial Model, Pipeline Math & Execution Sprint"
    ],
    closing: [
      "Whether you are launching your first B2B service or transitioning from active consulting to scalable agency retainers, this playbook equips you with the prompts, scripts, contracts, and workflows required to execute with confidence.",
      "Enroll today to unlock lifetime access to all 7 modules, 112 visual slides, 28 comprehensive written lessons, proposal templates, and the complete 30-day launch roadmap."
    ]
  },
  targetAudience: [
    "Aspiring agency founders and deal originators wanting to build high-margin B2B services without coding everything themselves",
    "Consultants and freelancers looking to transition from hourly billing to high-ticket outcome-driven AI implementations",
    "Sales professionals and operators seeking to leverage Claude for rapid prospect research, audits, and tailored demonstrations",
    "Anyone looking for a structured, evidence-based roadmap to launch, close, and deliver AI solutions in 30 days"
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Cinematic Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Claude Prompt Suites, Niche Scorecards & Diagnostic Audit Scripts" },
    { iconName: "file-text", text: "Two-Tier Proposal Templates & Technical Delivery Governance SOPs" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: HOW_ID_START_20K_MONTH_AI_AGENCY_MODULES.map((mod) => ({
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
  faqs: [
    {
      question: "Do I need coding or software development skills to run this agency?",
      answer: "No. The playbook is specifically built around the deal-originator model. You focus on client acquisition, problem diagnosis, offer engineering, and account management, while partnering with vetted contract developers or implementation specialists to build the technical systems."
    },
    {
      question: "Is $20,000 per month guaranteed in 30 days?",
      answer: "No. $20K/month is an ambitious business-planning benchmark used throughout the curriculum to model deal sizes, project margins, and retainer math. Actual earnings depend on your sales execution, market demand, niche selection, and client delivery quality."
    },
    {
      question: "What is included with my one-time purchase?",
      answer: "You receive immediate lifetime access to all 7 comprehensive modules, including 112 visual presentation slides, 28 detailed written guides, Claude research prompts, candidate niche scorecards, discovery call scripts, two-tier proposal templates, and the complete 30-day execution sprint."
    },
    {
      question: "Can I access this material on mobile and desktop?",
      answer: "Yes. Both the interactive PowerPoint-style slide presentation player and the warm light-mode editorial reader are fully responsive and optimized for seamless viewing across smartphones, tablets, and desktop computers."
    }
  ],
  testimonials: [
    {
      name: "Adrian",
      role: "Verified Reader",
      rating: 5,
      quote: "This is one of the clearest explanations I've seen of how to start an AI agency without being the person building everything. The deal-originator model, niche selection, and developer partnership approach made the business feel much more understandable.",
      initials: "A",
      date: "November 10, 2026"
    },
    {
      name: "Valentina",
      role: "Verified Reader",
      rating: 5,
      quote: "The sales process is what stood out to me. Instead of randomly pitching AI services, you learn how to identify an actual business problem, run discovery calls, prepare a tailored demo, and present a solution that makes sense.",
      initials: "V",
      date: "November 10, 2026"
    },
    {
      name: "Omar",
      role: "Verified Reader",
      rating: 5,
      quote: "Really useful frameworks throughout. The Claude prompts alone save a lot of time, especially for researching niches, preparing prospect audits, and structuring offers. I also appreciated the sections on delivery costs and client expectations.",
      initials: "O",
      date: "November 11, 2026"
    },
    {
      name: "Brooke",
      role: "Verified Reader",
      rating: 5,
      quote: "What I liked most is that it covers what happens after you get the client. Scoping, developer coordination, deposits, delivery, support, and recurring revenue are all addressed. It feels much more complete than a typical AI agency guide.",
      initials: "B",
      date: "November 11, 2026"
    }
  ]
};
