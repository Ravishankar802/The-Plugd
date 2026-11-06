import type { PlaybookDetailData } from "../dating-playbook-detail";
import { BUILT_85M_AI_STARTUP_MODULES } from "./built-85m-ai-startup-data";

export const BUILT_85M_AI_STARTUP_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-62",
  slug: "i-built-an-85m-ai-startup-in-5-months-heres-my-playbook",
  title: "I Built An $85M AI Startup in 5 Months (here's my playbook)",
  headline: "Build a high-growth startup from the ground up with a proven framework for validating ideas, launching an MVP, attracting customers, and creating repeatable growth systems.",
  description: "Learn how to identify emerging market opportunities, validate real customer demand using the CODE framework, and build a focused MVP without wasting months on unnecessary features. This practical founder's playbook covers audience building, customer feedback, founder-led content, GTM outreach, lead magnets, AI search visibility, and a 90-day execution plan—all inspired by the reported journey behind an $85M AI startup.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "3,120",
  instructorName: "Nathan Cole",
  instructorTitle: "Founder & AI Enterprise Architect",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "3,120",
  instructorCourses: 5,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793998241/I_Built_An_85M_AI_Startup_in_5_Months_here_s_my_playbook.png",
  hoursOfMaterial: "9.0 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Master the complete operational and systemic mechanics of I Built An $85M AI Startup in 5 Months (here's my playbook)",
    "Assemble a high-velocity founding team with clean ownership across UX, deep engineering, and commercial GTM distribution",
    "Deploy the battle-tested CODE framework (Consumer trends, Opportunity, Demand, Economic sizing) to validate real willingness to pay",
    "Ship an aggressively simple single-job MVP in under 14 days and establish a 48-hour customer feedback-to-shipping loop",
    "Build a 3-layer distribution machine combining founder-led education, diagnostic GTM outreach, and Answer Engine Optimization (AEO)",
    "Execute an interactive diagnostic lead magnet and a structured 90-day execution roadmap to reach repeatable enterprise ARR"
  ],
  relatedTopics: [
    "AI Startups",
    "SaaS Architecture",
    "GTM Strategy",
    "CODE Framework",
    "Product Design",
    "Answer Engine Optimization"
  ],
  requirements: [
    "A computer with an internet connection and modern web browser",
    "Willingness to commit to disciplined founder-led customer discovery without cutting corners",
    "Zero prior venture funding or deep technical machine learning knowledge required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive masterclass on I Built An $85M AI Startup in 5 Months (here's my playbook). This playbook turns the reported high-growth journey behind Searchable into a battle-tested, practical operating manual.",
      "Rather than romanticizing startup overnight success, this curriculum breaks down the rigorous engineering discipline, customer discovery frameworks, single-job MVP scoping, and layered distribution channels that take a company from zero to multi-million ARR.",
      "Every single lesson provides both an interactive, cinematic slide deck presentation and a comprehensive, in-depth written guide detailing the exact step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: Assembling the Triad Founding Team & Capability Ownership",
      "Act 2: Market Validation via the CODE Framework",
      "Act 3: Audience Building & High-Signal Pre-Launch Waitlists",
      "Act 4: The Single-Job MVP & Ruthless Scope Reduction",
      "Act 5: Early Access & The Rapid Feedback Flywheel",
      "Act 6: The Three-Layer Content & Go-to-Market Engine",
      "Act 7: Interactive Lead Magnets, Public Launch & The 90-Day Scaling Blueprint"
    ],
    closing: [
      "Every lesson is designed for immediate tactical execution, complete with 24-hour action directives and sovereign battle decision matrices.",
      "Join thousands of founders and operators worldwide who use these exact frameworks to build resilient, profitable, and enduring software enterprises."
    ]
  },
  targetAudience: [
    "Aspiring and early-stage founders seeking a structured roadmap from idea to paying customers",
    "Technical operators and engineers wanting to master product design, GTM distribution, and commercial positioning",
    "Product leaders and growth marketers looking to capitalize on Answer Engine Optimization (AEO) and AI discovery",
    "Anyone committed to building high-leverage software assets with capital efficiency"
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Acts & 28 Cinematic Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Ready-to-Deploy CODE Scorecards, Diagnostic Outreach Scripts & SOPs" },
    { iconName: "file-text", text: "Founder Ownership Agreements, MVP Scope Filters & Weekly Review Templates" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: BUILT_85M_AI_STARTUP_MODULES.map((mod) => ({
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
      name: "Corey",
      role: "Startup Founder",
      rating: 5,
      quote: "One of the most practical startup guides I've read. The CODE framework completely changed how I evaluate business ideas. I especially liked the focus on validating demand before spending months building.",
      initials: "C",
      date: "August 2026"
    },
    {
      name: "Jared",
      role: "Enterprise Product Lead",
      rating: 5,
      quote: "This connects all the important pieces of building a startup—from finding the opportunity to getting your first customers. The 90-day execution plan makes everything feel much more actionable.",
      initials: "J",
      date: "August 2026"
    },
    {
      name: "Shane",
      role: "Technical Co-Founder",
      rating: 5,
      quote: "Loved the emphasis on building an audience before launching. The MVP and customer-feedback chapters are especially valuable. It feels like an actual operating manual rather than another motivational startup ebook.",
      initials: "S",
      date: "August 2026"
    }
  ],
  faqs: [
    {
      question: "How is this different from typical corporate training or video courses?",
      answer: "Most courses present sterile, boring slides filled with academic jargon. This playbook is structured like a cinematic story arc—breaking down the psychological crucibles, real-world failures, high-stakes decisions, and exact tactical mechanics that took operators from zero to multi-million ARR independence."
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
