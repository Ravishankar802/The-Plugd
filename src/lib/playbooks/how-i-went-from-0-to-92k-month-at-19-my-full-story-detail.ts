import type { PlaybookDetailData } from "../dating-playbook-detail";
import { HOW_I_WENT_FROM_0_TO_92K_MONTH_AT_19_MODULES } from "./how-i-went-from-0-to-92k-month-at-19-my-full-story-data";

export const HOW_I_WENT_FROM_0_TO_92K_MONTH_AT_19_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-81",
  slug: "how-i-went-from-0-to-92k-month-at-19-my-full-story",
  title: "How I Went From $0 to $92K/Month at 19 (My Full Story)",
  headline: "From a $13 freelance job to a reported $92K business month — learn the skills, sales systems, and hard lessons behind building a business that actually lasts.",
  description: "From a $13 freelance job to a reported $92K business month — learn the skills, sales systems, and hard lessons behind building a business that actually lasts.\n\nThis is the unfiltered journey of turning small online experiments into a skill-based business, scaling into coaching and agency operations, and discovering why rapid growth can become its own biggest problem. Learn appointment setting, client acquisition, sales management, team training, service delivery, pricing, unit economics, and the systems needed to scale without losing control. Includes practical worksheets, financial dashboards, operating frameworks, and a 30-day roadmap to put the lessons into action.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,910",
  instructorName: "Terence Chew",
  instructorTitle: "Sales Systems Architect & Agency Operator",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,910",
  instructorCourses: 2,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996170/How_I_Went_From_0_to_92K_Month_at_19_My_Full_Story.png",
  hoursOfMaterial: "11.1 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Master the mechanics of high-ticket appointment setting and organic direct-message lead generation",
    "Deploy the Context-Permission-Discovery (CPD) conversational triage framework to book qualified calls without spam",
    "Enforce rigorous BANT qualification gates to eliminate tire-kickers and protect executive sales capacity",
    "Codify intuitive sales techniques into scalable SOPs, objection matrices, and 15-minute daily training routines",
    "Structure and scale high-margin coaching and agency offers with clear Service Level Agreements",
    "Audit unit economics to eliminate churn drag, excessive payroll overhead, and negative-contribution client accounts",
    "Gracefully wind down low-margin services using the 100-Task Operational Audit and process elimination framework",
    "Deploy the One-Page Operating System to maintain 60%+ net profit margins and sustainable founder sanity"
  ],
  relatedTopics: [
    "Appointment Setting",
    "High-Ticket Sales",
    "Agency Operations",
    "Sales Management & Training",
    "Unit Economics & Margin Control",
    "B2B Client Acquisition"
  ],
  requirements: [
    "A computer with internet access and basic familiarization with social media messaging platforms",
    "Willingness to conduct disciplined daily prospect outreach and follow structured conversational scripts",
    "Commitment to audit financial accounts, maintain strict tax reserves, and track operational metrics",
    "An open, coachable mindset prepared to learn from operational mistakes and prioritize profit over ego"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive operating manual for How I Went From $0 to $92K/Month at 19 (My Full Story). This playbook deconstructs the multi-year journey of Terence Chew from small freelance gigs to building, scaling, and rebuilding high-velocity sales and agency systems.",
      "Rather than glorifying surface-level revenue screenshots, this curriculum delivers the exact operating blueprints, conversational triage scripts, unit economic balance sheets, and team management protocols required to build a business that produces real, retained cash and enduring enterprise stability.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: Early Commerce, Micro-Transactions & Market Feedback",
      "Act 2: The Revenue Spike, Cash Flow Shocks & The Speculative Trap",
      "Act 3: The Foundation Skill: High-Ticket Appointment Setting",
      "Act 4: Transitioning from Solo Contributor to Manager & Coach",
      "Act 5: Building the Coaching Engine & The $92K/Month Agency Expansion",
      "Act 6: Scaling Friction, Operational Collapse & The Strategic Reset",
      "Act 7: The Sovereign Operating System & Long-Term Scalability"
    ],
    closing: [
      "Whether you are an aspiring operator seeking your first high-income digital skill, an active setter looking to transition into leadership, or an agency founder exhausted by high churn and low margins, this playbook delivers the exact systems needed to scale sustainably."
    ]
  },
  targetAudience: [
    "Aspiring digital entrepreneurs looking to acquire a high-income, high-demand sales and appointment setting skill.",
    "Sales professionals and setters wanting to transition into management, coaching, and agency ownership.",
    "Agency and coaching founders struggling with operational chaos, high churn, or razor-thin net profit margins.",
    "Operators who want to replace chaotic hustle with a predictable, high-margin One-Page Operating System."
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Context-Permission-Discovery (CPD) Messaging Scripts & BANT Qualification Gates" },
    { iconName: "file-text", text: "100-Task Operational Audit, Unit Economic Ledgers & The One-Page Operating System" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: HOW_I_WENT_FROM_0_TO_92K_MONTH_AT_19_MODULES.map((mod) => ({
    id: mod.id,
    number: String(mod.number),
    title: mod.title,
    description: mod.description,
    duration: "95 min",
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
      name: "Rivera",
      role: "Operations Director",
      rating: 5,
      quote: "Honestly, the biggest takeaway for me was that revenue doesn't automatically mean you've built a good business. The sections on the $9.9K month, the collapse, and the agency shutdown were incredibly useful. It made me rethink what I should actually be measuring.",
      initials: "R",
      date: "August 04 2026"
    },
    {
      name: "Danielle",
      role: "Sales Lead",
      rating: 5,
      quote: "I came for the appointment-setting part, but ended up getting much more out of the management and training sections. The breakdown of how to go from doing the work yourself to teaching others and managing a team is particularly valuable. Very actionable.",
      initials: "D",
      date: "August 08 2026"
    },
    {
      name: "Elias",
      role: "Agency Operator",
      rating: 5,
      quote: "What I liked most is how practical this is. Pricing, client scope, qualification, capacity planning, contribution margins — these are the things people skip when talking about starting an agency. The worksheets make it much easier to apply everything instead of just reading and forgetting.",
      initials: "E",
      date: "August 14 2026"
    },
    {
      name: "Brooke Sullivan",
      role: "Founder & CEO",
      rating: 5,
      quote: "Finally, a business playbook that doesn't pretend every growth story is a straight line upward. The lessons about chasing shiny objects, hiring too quickly, losing focus, and protecting your personal life felt refreshingly honest. The one-page operating system is something I'll keep coming back to.",
      initials: "B",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "What is appointment setting and why is it considered the foundation of modern high-ticket sales?",
      answer: "Appointment setting is the strategic process of identifying qualified prospective clients, initiating consultative conversations, diagnosing operational pain points, and booking high-intent discovery calls for sales closers. Because closers cannot spend hours prospecting without sacrificing closing performance, elite appointment setters serve as the essential growth engine for high-ticket service, agency, and coaching businesses."
    },
    {
      question: "How does this playbook address the common pitfalls of agency scaling and revenue spikes?",
      answer: "Unlike typical business tutorials that celebrate gross revenue screenshots, this playbook provides an unfiltered post-mortem of peak scaling—including a reported $92,000 month that created severe operational stress, high client churn, and vanishing profit margins. It provides concrete frameworks for calculating contribution margins, setting tax reserves, terminating toxic accounts, and running the 100-Task Rebuild."
    },
    {
      question: "How does the Context-Permission-Discovery (CPD) framework differ from traditional cold outreach?",
      answer: "Traditional outreach relies on automated 'pitch-slapping'—bombarding cold leads with aggressive paragraphs that trigger immediate defensive resistance. The CPD framework begins by establishing non-intrusive relevance, securing explicit conversational permission to ask a diagnostic question, and uncovering root friction before ever suggesting a collaborative strategy call."
    },
    {
      question: "What is the One-Page Operating System taught in the final module?",
      answer: "The One-Page Operating System is a single-page management architecture that consolidates target customer definitions, delivery SOPs, weekly unit economic ledgers, team meeting cadences, and pipeline velocity metrics. It eliminates cognitive overload and keeps a multi-six-figure enterprise lean, highly profitable, and durable."
    }
  ]
};
