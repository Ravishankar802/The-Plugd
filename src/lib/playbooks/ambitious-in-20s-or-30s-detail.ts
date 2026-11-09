import type { PlaybookDetailData } from "../dating-playbook-detail";
import { AMBITIOUS_IN_20S_OR_30S_MODULES } from "./ambitious-in-20s-or-30s-data";

export const AMBITIOUS_IN_20S_OR_30S_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-64",
  slug: "if-youre-ambitious-and-in-your-20s-or-30s-please-watch-this",
  title: "If you're ambitious and in your 20s or 30s, please watch this.",
  headline: "A practical guide to turning ambition into meaningful progress through calculated risks, valuable skills, deep focus, decisive action, and consistent execution.",
  description: "Stop spreading yourself thin, waiting for the perfect opportunity, or letting other people's opinions dictate your decisions. This playbook shows you how to choose a direction, build rare competence, take intelligent risks, and stay focused on work that actually moves you forward. Includes a structured 90-day ambition plan, weekly operating system, and practical worksheets to turn big goals into consistent action.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 2,
  originalPrice: 4.99,
  currency: "USD",
  discountPercentage: 60,

  rating: 4.9,
  ratingCount: "5.4k",
  studentsCount: "4,120",
  instructorName: "Seiji Kai-Lun",
  instructorTitle: "Founding Strategist & Venture Architect",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "5.4k",
  instructorStudents: "4,120",
  instructorCourses: 5,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996177/If_you_re_ambitious_and_in_your_20s_or_30s_please_watch_this..png",
  hoursOfMaterial: "9.1 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Master the complete operational and systemic mechanics of If you're ambitious and in your 20s or 30s, please watch this.",
    "Structure asymmetric bets with strictly capped downside risk and unlimited compounding professional upside",
    "Deploy the competence ladder to build rare, commercially demanded skills instead of waiting for passive passion",
    "Enforce radical focus on one primary game for 90 days and ruthlessly prune low-yield distraction projects",
    "Make reversible decisions rapidly, pay down ignorance debt, and liberate ambition from external status judgment",
    "Execute the complete 90-day ambition roadmap and maintain weekly operating systems that outlast boredom"
  ],
  relatedTopics: [
    "Career Strategy",
    "Skill Compounding",
    "Decision Making",
    "Focus & Productivity",
    "Venture Architecture",
    "Personal Mastery"
  ],
  requirements: [
    "A notebook or modern computer with an internet connection",
    "Willingness to confront uncomfortable feedback and tolerate the unglamorous boredom of deliberate practice",
    "Zero prior business success or existing social media following required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive masterclass on If you're ambitious and in your 20s or 30s, please watch this. This playbook turns hard-won entrepreneurial lessons into an actionable operating manual for builders who refuse to settle for passive drift.",
      "Rather than preaching fleeting motivation or superficial lifestyle hacks, this curriculum delivers structured mental models, asymmetric risk frameworks, decision-speed systems, and a 90-day execution cadence designed to turn intense ambition into tangible enterprise value.",
      "Every single lesson provides both an interactive, cinematic slide deck presentation and a comprehensive, in-depth written guide detailing the exact step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: Foundational Architecture: Asymmetric Bets & Competence Over Passion",
      "Act 2: Radical Focus: Choosing Your Primary Game & The Stop-Doing Sieve",
      "Act 3: Strategic Seasons: Broad Exploration to Ruthless Exploitation",
      "Act 4: The Velocity of Execution: Fast Decisions & Paying Down Ignorance Debt",
      "Act 5: Psychological Sovereignty: Silencing Imagined Judgment & Owning Your Past",
      "Act 6: Escalating the Stakes: Solving Consequential Problems & Sustainable Obsession",
      "Act 7: Consistency Under Boredom & The 90-Day Ambition Operating System"
    ],
    closing: [
      "Every lesson is designed for immediate tactical execution, complete with 24-hour action directives and sovereign battle decision matrices.",
      "Join thousands of ambitious operators worldwide who use these exact frameworks to reclaim cognitive agency, master rare skills, and build enduring sovereign bodies of work."
    ]
  },
  targetAudience: [
    "Ambitious professionals in their twenties or thirties seeking a structured framework for rapid career and financial compounding",
    "Founders and builders prone to shiny object syndrome who want radical focus and execution velocity",
    "Creators and engineers transitioning from passive learning to shipping consequential, high-upside ventures",
    "Anyone committed to overcoming status anxiety and building an unassailable personal and commercial moat"
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Acts & 28 Cinematic Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Ready-to-Deploy 90-Day Ambition Roadmaps, Skill-Gap Ledgers & Decision Matrices" },
    { iconName: "file-text", text: "Commitment Contracts, Weekly Review SOPs & Stop-Doing Worksheets" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: AMBITIOUS_IN_20S_OR_30S_MODULES.map((mod) => ({
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
      name: "Arjun",
      role: "Software Operator",
      rating: 5,
      quote: "The biggest takeaway for me was learning to focus on one primary goal instead of constantly jumping between ideas. The 90-day plan makes it much easier to put that into practice.",
      initials: "A",
      date: "August 2026"
    },
    {
      name: "Emily Parker",
      role: "Product Strategist",
      rating: 5,
      quote: "I liked how practical this was. The sections on calculated risks, decision-making, and building competence really made me rethink how I've been approaching my career.",
      initials: "EP",
      date: "August 2026"
    },
    {
      name: "Kabir",
      role: "Agency Founder",
      rating: 5,
      quote: "A much-needed reminder that ambition means nothing without execution. The weekly review system and worksheets are particularly useful for staying accountable.",
      initials: "K",
      date: "August 2026"
    }
  ],
  faqs: [
    {
      question: "How is this different from typical corporate training or video courses?",
      answer: "Most courses present sterile, boring slides filled with academic jargon. This playbook is structured like a cinematic story arc—breaking down the psychological crucibles, real-world failures, high-stakes decisions, and exact tactical mechanics that took operators from zero to multi-million revenue independence."
    },
    {
      question: "Can I apply this if I am starting from absolute zero with no experience?",
      answer: "Yes. Every playbook follows a chronological hero's journey from ground zero (no capital, no audience, no technical team) through validation, cashflow generation, and autonomous scaling."
    },
    {
      question: "What is included with my one-time purchase?",
      answer: "You receive full lifetime digital access to the complete multi-module visual presentation player, comprehensive written lesson guides, practical battle exercises, downloadable operational templates, and all future curriculum updates with zero subscription fees."
    },
    {
      question: "Can I access this on mobile or tablet devices?",
      answer: "Yes, the learning player and written reader are fully responsive and optimized for seamless viewing across smartphones, tablets, laptops, and ultra-wide desktop monitors."
    }
  ]
};
