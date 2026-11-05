import type { PlaybookDetailData } from "../dating-playbook-detail";
import { REINVENT_90_DAYS_MODULES } from "./how-to-reinvent-yourself-in-90-days-to-become-rich-as-f-ck-data";

export const REINVENT_90_DAYS_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-75",
  slug: "how-to-reinvent-yourself-in-90-days-to-become-rich-as-f-ck",
  title: "how to reinvent yourself in 90 days to become rich as f*ck",
  headline: "A 90-day personal reinvention blueprint for building a stronger identity, mastering your habits, sharpening execution, and developing the resilience to pursue meaningful success.",
  description: "Real change goes beyond motivation and morning routines. This playbook takes you through a structured 90-day process of reshaping your beliefs, managing your attention, overcoming avoidance, and developing consistent work habits. With practical exercises, daily trackers, weekly reviews, and a phased action plan, you'll learn to turn personal standards into measurable progress while building skills, pursuing opportunities, and protecting your health.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,390",
  instructorName: "Sean O'Brien",
  instructorTitle: "High-Performance Strategist & Executive Mentor",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,390",
  instructorCourses: 3,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793023911/how_to_reinvent_yourself_in_90_days_to_become_rich_as_f_ck.png",
  hoursOfMaterial: "10.2 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Master the 5-stage reinvention hierarchy: from identity and beliefs to execution and wealth accumulation",
    "Close the say-do ratio gap by establishing a personal proof ledger and unshakeable self-trust",
    "Dismantle inherited scarcity beliefs about money, sales, rejection, and personal capability",
    "Install the Stoic Sparring protocol to separate uncontrollable external noise from high-impact action",
    "Execute the phased 90-day commercial sprint: vehicle selection, market conversations, and scaling winners",
    "Maintain high-output cognitive bandwidth through progressive physical training, sleep anchors, and deep work"
  ],
  relatedTopics: [
    "Personal Reinvention",
    "Identity Economics",
    "Habit Architecture",
    "High-Performance Execution",
    "Stoic Decision Systems",
    "90-Day Blueprints"
  ],
  requirements: [
    "A computer or smartphone with internet connection",
    "A willingness to audit current habits, attention leaks, and unexamined beliefs",
    "Commitment to execute high-value input metrics rather than obsessing over immediate vanity results",
    "Zero prior business experience or startup capital required to begin"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive operational manual for how to reinvent yourself in 90 days to become rich as f*ck. This playbook deconstructs how modern high-performers, builders, and operators rebuild their identity from the ground up, master their daily habits, and execute with disciplined consistency.",
      "Rather than chasing fleeting motivational highs or micro-managing complex 30-minute calendars, this curriculum establishes the exact step-by-step operating architecture required to reshape your beliefs, manage cognitive attention, conquer avoidance through exposure, and build the physical and emotional resilience necessary to pursue compounding wealth.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: Identity Over Routine & The Foundations of Sovereign Reinvention",
      "Act 2: Cognitive Sovereignty, Risk Calibration & Discomfort Mastery",
      "Act 3: Attention Architecture, Habit Loops & Deep Work Protocols",
      "Act 4: Input Focus, Stoic Sparring & XP Learning Loops",
      "Act 5: Physical Capital & Emotional Resilience Under Pressure",
      "Act 6: The 90-Day Execution Engine: Phased Implementation (Days 1–60)",
      "Act 7: Consolidation, Metrics Governance & The Permanent Operating System (Days 61–90)"
    ],
    closing: [
      "Join thousands of modern operators who use these exact frameworks to break free from stagnation, build unshakeable self-trust, and execute with relentless clarity."
    ]
  },
  targetAudience: [
    "Ambitious operators and entrepreneurs who feel stuck in unproductive behavioral loops.",
    "Builders seeking to transition from chaotic motivation to structured, input-driven execution.",
    "Professionals looking to reinvent their identity, professional skillset, and commercial earning capacity.",
    "Anyone determined to master the mental, physical, and tactical foundations of lasting achievement."
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Daily Operating Sheets & Weekly Stoic Sparring Ledgers" },
    { iconName: "file-text", text: "Project Experiment Cards, Identity Proof Logs & 90-Day Master Audit Worksheets" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: REINVENT_90_DAYS_MODULES.map((mod) => ({
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
      name: "Valeria",
      role: "Startup Founder",
      rating: 5,
      quote: "What I liked most is that this doesn't just tell you to wake up early and work harder. The identity exercises made me look at why I keep repeating certain behaviours. The 90-day structure gives you something concrete to work on instead of another temporary motivation boost.",
      initials: "V",
      date: "August 04 2026"
    },
    {
      name: "Holloway",
      role: "Digital Product Builder",
      rating: 5,
      quote: "The section about focusing on inputs rather than obsessing over outcomes was exactly what I needed. I tend to check results constantly and lose momentum when things don't happen immediately. The weekly review and experiment templates make it much easier to stay objective.",
      initials: "H",
      date: "August 08 2026"
    },
    {
      name: "Ethan",
      role: "Agency Operator",
      rating: 5,
      quote: "Surprisingly practical. I especially liked the chapters on risk, discomfort, and handling failure. It encourages you to take action, but also reminds you not to make reckless decisions just to prove you're ambitious. That balance makes the advice feel much more grounded.",
      initials: "E",
      date: "August 14 2026"
    },
    {
      name: "Neha",
      role: "Growth Strategist",
      rating: 5,
      quote: "I've read plenty of self-improvement material, but having everything organised into a 90-day plan makes this different. The identity tracker, deep-work sheet, and daily operating template are useful tools I'll actually revisit. It feels less like motivational content and more like a personal operating manual.",
      initials: "N",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "Can someone truly reinvent their life and build wealth in just 90 days?",
      answer: "A 90-day sprint is not a magical guarantee of overnight wealth, but it is the optimal window to break chronic behavioral patterns, master high-value skills, and validate a commercial offer. By focusing on inputs, closing the say-do ratio, and testing real market demand, 90 days establishes the permanent foundation for compounding financial success."
    },
    {
      question: "How is this different from traditional self-help and motivational routines?",
      answer: "Traditional self-help focuses on superficial actions and morning routines without altering the underlying identity that governs decisions. This playbook operates on a cascading performance hierarchy: identity dictates beliefs, beliefs dictate thoughts and emotions, and emotions dictate actions. By engineering identity and accumulating empirical proof, changes become durable."
    },
    {
      question: "What is the Stoic Sparring protocol?",
      answer: "Stoic Sparring is an operational weekly T-chart exercise that divides issues into what is outside your control (algorithms, competitor actions, prospect replies) and what is inside your control (offer clarity, outreach volume, delivery quality). It eliminates emotional paralysis and forces immediate action on high-leverage priorities."
    },
    {
      question: "What tools and materials are included with this playbook?",
      answer: "You receive lifetime access to the complete 7-module visual slide presentation (112 slides), 28 comprehensive written lesson guides, the Daily Operating Sheet, Weekly Stoic Sparring Ledger, Project Experiment Cards, and the 90-Day Master Audit."
    }
  ]
};
