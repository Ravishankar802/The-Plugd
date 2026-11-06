import type { PlaybookDetailData } from "../dating-playbook-detail";
import { GIVE_ME_27_MINS_DIGITAL_MARKETING_MODULES } from "./give-me-27-minutes-digital-marketing-data";

export const GIVE_ME_27_MINS_DIGITAL_MARKETING_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-63",
  slug: "give-me-27-minutes-and-ill-make-you-disgustingly-good-at-digital-marketing",
  title: "Give Me 27 Minutes and I'll Make You Disgustingly Good at Digital Marketing",
  headline: "Stop guessing what makes people buy. Learn to capture attention, understand customer psychology, write persuasive ads, and turn clicks into customers.",
  description: "What separates an ad people scroll past from one that actually sells? This playbook breaks down the psychology and mechanics behind effective digital marketing—from classic direct-response advertising and the HALO research strategy to creative testing, market awareness, and high-converting sales pages. Includes a 17-step copywriting framework, practical templates, and a 30-day marketing training plan.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "5.1k",
  studentsCount: "3,840",
  instructorName: "Caleb Sterling",
  instructorTitle: "Direct-Response Strategist & Growth Architect",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "5.1k",
  instructorStudents: "3,840",
  instructorCourses: 6,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793023911/Give_Me_27_Minutes_and_I_ll_Make_You_Disgustingly_Good_at_Digital_Marketing.png",
  hoursOfMaterial: "9.2 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Master the complete operational and systemic mechanics of Give Me 27 Minutes and I'll Make You Disgustingly Good at Digital Marketing",
    "Deploy the two fundamental pillars of marketing: qualified attention capture and frictionless conversion architecture",
    "Extract durable psychological mechanisms from classic direct-response print ads to build an institutional swipe file",
    "Unearth raw customer language, pains, fears, hopes, and dreams using the HALO forum research strategy",
    "Execute rapid 5-ads-per-day static creative testing matrices and match copy precisely across the 5 market awareness stages",
    "Construct high-converting landing pages using the complete 17-step selling system and empirical split-testing protocols"
  ],
  relatedTopics: [
    "Digital Marketing",
    "Direct Response",
    "Copywriting",
    "Ad Creative Testing",
    "Funnel Optimization",
    "Customer Psychology"
  ],
  requirements: [
    "A computer with an internet connection and a modern web browser",
    "Willingness to study customer language and execute empirical testing without relying on guesswork",
    "Zero prior paid advertising budget or expensive agency tools required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive masterclass on Give Me 27 Minutes and I'll Make You Disgustingly Good at Digital Marketing. This playbook translates an elite 11-step direct-response methodology into a practical, repeatable operating system.",
      "Rather than teaching fleeting platform hacks or subjective aesthetic opinions, this curriculum delivers battle-tested psychological frameworks, customer research strategies, native ad creative formats, and a 17-step sales page architecture that consistently converts cold traffic into customers.",
      "Every single lesson provides both an interactive, cinematic slide deck presentation and a comprehensive, in-depth written guide detailing the exact step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: Attention & Conversion: The Dual Foundations of Direct Response",
      "Act 2: Classic Direct-Response Advertising & Modern Swipe-File Mastery",
      "Act 3: Demand Capture vs. Demand Generation: Channel Architecture",
      "Act 4: Native Feed Creatives & The AIDA Persuasion Engine",
      "Act 5: Customer Psychology & The HALO Forum Research Strategy",
      "Act 6: Rapid Creative Testing & Multi-Tier Market Awareness",
      "Act 7: The 17-Step Selling System & Funnel Optimization Engine"
    ],
    closing: [
      "Every lesson is designed for immediate tactical execution, complete with 24-hour action directives and sovereign battle decision matrices.",
      "Join thousands of marketers, founders, and growth operators worldwide who use these exact frameworks to build predictable, high-margin customer acquisition engines."
    ]
  },
  targetAudience: [
    "Founders and entrepreneurs seeking to build predictable, high-converting customer acquisition systems",
    "Media buyers and performance marketers looking to reduce customer acquisition costs with superior creative",
    "Copywriters and designers transitioning to high-impact direct-response advertising",
    "Anyone committed to mastering the timeless principles of attention, persuasion, and human decision-making"
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Acts & 28 Cinematic Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Ready-to-Deploy HALO Research Sheets, Creative Briefs & Testing Matrices" },
    { iconName: "file-text", text: "17-Step Sales Letter Checklists, Feature-Benefit Spreadsheets & Review SOPs" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: GIVE_ME_27_MINS_DIGITAL_MARKETING_MODULES.map((mod) => ({
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
      name: "Oliver Hayes",
      role: "Direct-Response Marketer",
      rating: 5,
      quote: "The HALO strategy alone makes this worth reading. I never realised how much better marketing becomes when you actually study what customers say instead of guessing what they want.",
      initials: "OH",
      date: "August 2026"
    },
    {
      name: "Kavya Menon",
      role: "Performance Media Buyer",
      rating: 5,
      quote: "Finally, a marketing guide that goes beyond random ad tips. The examples, swipe-file exercises, and copywriting framework make it something I can genuinely use while working on campaigns.",
      initials: "KM",
      date: "August 2026"
    },
    {
      name: "Ryan Cooper",
      role: "E-Commerce Founder",
      rating: 5,
      quote: "I particularly enjoyed the sections on demand generation and customer awareness. They helped me understand why some ads need to educate people first instead of immediately pushing a product.",
      initials: "RC",
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
