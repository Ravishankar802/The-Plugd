import type { PlaybookDetailData } from "../dating-playbook-detail";
import { I_TRIED_SELLING_17_DIGITAL_PRODUCT_MODULES } from "./tried-selling-17-digital-product-data";

export const I_TRIED_SELLING_17_DIGITAL_PRODUCT_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-105",
  slug: "i-tried-selling-a-17-digital-product-to-make-1-000-in-10-days",
  title: "I Tried Selling a $17 Digital Product to Make $1,000 in 10 Days",
  headline: "Launch a $17 digital product, build a complete sales funnel, run paid ads, and learn how to turn clicks into customers — with a real-world experiment that reveals what actually makes money and what eats your profit.",
  description: "**Launch a $17 digital product, build a complete sales funnel, run paid ads, and learn how to turn clicks into customers — with a real-world experiment that reveals what actually makes money and what eats your profit.**\n\nLearn how to create and package a digital product, build a high-converting sales page, set up checkout and upsells, and launch Meta ad campaigns to attract buyers. Follow a real $1,000-in-10-days experiment that generated $623 in revenue but only $46 in reported profit, uncovering the mistakes, advertising lessons, pricing strategies, and funnel optimisations that every digital product seller should understand. Includes practical templates, tracking sheets, checklists, and a step-by-step launch framework.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.8,
  ratingCount: "0.4k",
  publishedAt: "2026-10-26",
  studentsCount: "4,620",
  instructorName: "Andre Simmons",
  instructorTitle: "E-Commerce Operator & Funnel Architect",
  instructorBio: "",
  instructorRating: 4.8,
  instructorReviews: "0.4k",
  instructorStudents: "4,620",
  instructorCourses: 1,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1794352586/I_Tried_Selling_a_17_Digital_Product_to_Make_1_000_in_10_Days.png",
  hoursOfMaterial: "9.8 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Package high-converting digital resource libraries and verify commercial distribution rights",
    "Design an 8-section mobile-first sales page that turns cold ad clicks into verified customers",
    "Eliminate checkout friction and deploy automated one-click post-purchase upsell hierarchies",
    "Engineer and manage manual sales campaigns inside Meta Ads Manager with ABO spend controls",
    "Isolate audience geographic tiers to prevent emerging market budget cannibalization",
    "Diagnose and resolve Meta Pixel and Conversions API (CAPI) tracking failures",
    "Avoid the multi-variable edit trap and scale profitable ad sets using strict 20-30% ladders",
    "Execute multi-source financial reconciliations to measure true net profit over vanity revenue"
  ],
  relatedTopics: [
    "Digital Products",
    "Meta Ads",
    "Funnel Architecture",
    "Low-Ticket Offers",
    "Unit Economics",
    "One-Click Upsells"
  ],
  requirements: [
    "A computer, tablet, or smartphone with internet access and a modern web browser",
    "Willingness to evaluate digital business models using real net profit rather than vanity revenue",
    "Zero prior coding or advanced paid advertising background required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the masterclass on I Tried Selling a $17 Digital Product to Make $1,000 in 10 Days. This playbook turns a documented real-world e-commerce launch experiment into a forensic, production-grade operating manual for independent digital creators.",
      "Most digital product guides show misleading top-line revenue screenshots while ignoring advertising costs, payment processing fees, and tracking drop-offs. In this playbook, we dissect a real experiment that generated $623 in gross revenue but netted only $46 in reported profit—uncovering the exact unit economics, campaign errors, and conversion mechanisms that dictate whether an offer survives.",
      "Every single lesson provides both a visual slide presentation and an in-depth written guide detailing step-by-step implementation, diagnostic matrices, worked financial equations, and practical launch checklists."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: The Low-Ticket Digital Product Model & Unit Economics",
      "Act 2: High-Converting Sales Page & Funnel Architecture",
      "Act 3: Meta Ads Architecture & Campaign Engineering",
      "Act 4: Campaign Optimization & Controlled Scaling Protocols",
      "Act 5: The Discounting Dilemma & Price Sensitivity Testing",
      "Act 6: Financial Reconciliations & Forensic Ledger Audits",
      "Act 7: The 10-Day Launch Framework & Working Templates"
    ],
    closing: [
      "Every lesson is designed for immediate real-world execution, complete with actionable battle exercises, diagnostic worksheets, and tactical scripts.",
      "Join thousands of digital builders worldwide who deploy these exact frameworks to validate demand, protect advertising capital, and build sovereign cashflow."
    ]
  },
  targetAudience: [
    "Solopreneurs and creators wanting to launch and monetize digital products using paid traffic",
    "Performance marketers seeking to optimize low-ticket front-end funnels and post-purchase upsells",
    "E-commerce operators tired of vanity revenue metrics who want to understand true unit economics",
    "Anyone looking for a transparent, practical roadmap to digital product creation, testing, and scaling"
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Cinematic Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Ready-to-Deploy Sales Page Checklists, Product Briefs & Launch Roadmaps" },
    { iconName: "file-text", text: "Interactive Break-Even Spreadsheets & Scientific Campaign Change Logs" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: I_TRIED_SELLING_17_DIGITAL_PRODUCT_MODULES.map((mod) => ({
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
  testimonials: [
    {
      name: "Pranav",
      role: "Verified Reader",
      rating: 5,
      quote: "Finally, a digital product guide that talks about profit instead of just showing revenue screenshots. The real experiment and its mistakes made this incredibly useful.",
      initials: "P",
      date: "October 28, 2026"
    },
    {
      name: "Shreya",
      role: "Verified Reader",
      rating: 5,
      quote: "The advertising and funnel sections are excellent. I especially liked the breakdown of Meta Ads, upsells, tracking, and knowing when to stop spending.",
      initials: "S",
      date: "November 01, 2026"
    },
    {
      name: "Anthony",
      role: "Verified Reader",
      rating: 5,
      quote: "Very practical from start to finish. The product validation, sales page structure, and launch checklists give you an actual system to follow instead of vague advice.",
      initials: "A",
      date: "November 05, 2026"
    },
    {
      name: "Varun",
      role: "Verified Reader",
      rating: 5,
      quote: "The $623 revenue versus $46 profit breakdown was an eye-opener. It completely changed how I think about running ads and measuring a digital product business.",
      initials: "V",
      date: "November 09, 2026"
    }
  ],
  faqs: [
    {
      question: "How is this different from typical digital product courses?",
      answer: "Most courses show misleading gross revenue screenshots and ignore advertising costs. This playbook breaks down a real-world case study—analyzing the exact $623 revenue versus $46 profit breakdown, Meta ad bottlenecks, pixel tracking errors, and multi-variable scaling mistakes."
    },
    {
      question: "Do I need technical or coding experience to build this funnel?",
      answer: "No. The playbook provides no-code sales page structures, pre-built Notion resource architectures, and step-by-step Meta Ads Manager workflows that any operator can implement."
    },
    {
      question: "What is included with my one-time purchase?",
      answer: "You receive lifetime digital access to all 7 modules (112 visual presentation slides, 28 comprehensive written guides), the 10-day launch roadmap, the Product Brief template, the 14-point Sales-Page Checklist, and the Master Break-Even Worksheet."
    },
    {
      question: "Can I access this on mobile or tablet devices?",
      answer: "Yes, both the slide presentation player and written article reader are fully responsive and optimized for seamless viewing across mobile, tablet, and desktop screens."
    }
  ]
};
