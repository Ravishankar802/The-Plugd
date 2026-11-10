import type { PlaybookDetailData } from "../dating-playbook-detail";
import { HOW_TO_BUILD_SELL_AI_DIGITAL_PRODUCTS_MODULES } from "./how-to-build-sell-ai-digital-products-data";

export const HOW_TO_BUILD_SELL_AI_DIGITAL_PRODUCTS_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-108",
  slug: "how-to-build-sell-ai-digital-products-2027-full-guide",
  title: "How to build & sell AI Digital Products (2027 full guide)",
  headline: "Stop building digital products nobody wants to buy. Learn how to find a paying audience, create an irresistible offer, build an AI-powered product, and turn it into a business that attracts real customers.",
  description: "**Stop building digital products nobody wants to buy. Learn how to find a paying audience, create an irresistible offer, build an AI-powered product, and turn it into a business that attracts real customers.**\n\nDiscover a complete, step-by-step system for building and selling AI-powered digital products — starting with audience research and offer validation, all the way to product creation, launch, and customer acquisition. Learn how to use AI app builders to create interactive resource apps, design focused AI tools, set up payments and protected member areas, and attract customers through organic content and email marketing.\n\nIncludes practical prompts, reusable templates, product testing checklists, marketing frameworks, and a 30-day build-and-sell roadmap to take your idea from concept to launch.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "4.8k",
  studentsCount: "4,910",
  instructorName: "Caleb Sterling",
  instructorTitle: "AI Systems Architect & Digital Product Strategist",
  instructorBio: "Caleb Sterling is a digital product architect, educator, and systems strategist specializing in no-code app construction, AI workflows, and audience monetization.",
  instructorRating: 4.9,
  instructorReviews: "4.8k",
  instructorStudents: "4,910",
  instructorCourses: 6,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "9.8 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Execute the Staircase Framework to package desirable, safe, doable, and efficient customer transformations",
    "Conduct 4-layer audience discovery to pinpoint exact customer friction, failed attempts, and private concerns",
    "Engineer a high-converting 5-layer offer architecture with split-second clarity and ethical risk reversal",
    "Design and build interactive AI Resource Apps that combine structured guides with focused AI prompt tools",
    "Author production-ready master product briefs and deploy natural-language app builders without code errors",
    "Implement secure payment webhooks, server-side access control, and automated customer onboarding",
    "Drive qualified organic customer acquisition through short-form Hook-Story-Offer bridges and searchable long-form tutorials",
    "Deploy a 5-part automated email nurture funnel and execute the structured 30-day build-and-sell launch roadmap"
  ],
  relatedTopics: [
    "AI Digital Products",
    "No-Code App Builders",
    "Offer Engineering",
    "Audience Discovery",
    "Member Area Security",
    "Email Nurture Funnels"
  ],
  requirements: [
    "A computer, tablet, or smartphone with internet access and a modern web browser",
    "Willingness to validate customer demand and research audience friction before building",
    "Zero prior coding, software engineering, or paid advertising background required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the masterclass on How to build & sell AI Digital Products (2027 full guide). This playbook provides a complete, step-by-step operating architecture for creating and monetizing digital products with AI.",
      "Most digital creators spend months in isolation building complex apps or writing generic PDFs, only to launch to total silence. In this playbook, Caleb Sterling demonstrates why starting with audience research and offer validation ensures paying customers exist before you create a single asset.",
      "Every single lesson provides both a visual slide presentation and an in-depth written guide detailing transformation mapping, master product brief prompts, payment webhook security, and organic distribution workflows."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: The Staircase Framework & Audience Research",
      "Act 2: High-Converting Offer Architecture & Risk Reversal",
      "Act 3: The AI Resource App Paradigm",
      "Act 4: Rapid AI App Construction & Iterative Engineering",
      "Act 5: Technical Launch Readiness, Payments & Access Control",
      "Act 6: Qualified Organic Acquisition & Content Bridges",
      "Act 7: Post-Launch Optimization & The 30-Day Execution Sprint"
    ],
    closing: [
      "Every lesson is designed for immediate real-world execution, complete with actionable battle exercises, diagnostic worksheets, and tactical scripts.",
      "Join thousands of digital builders worldwide who deploy these exact frameworks to validate demand, protect advertising capital, and build sovereign cashflow."
    ]
  },
  targetAudience: [
    "Creators, solopreneurs, and freelancers wanting to launch and monetize AI-powered digital products",
    "Educators and consultants seeking to package their expertise into interactive, scalable resource apps",
    "Builders tired of complex multi-month SaaS projects who want to launch lightweight products in 30 days",
    "Anyone looking for a structured, evidence-based methodology to validate, build, and sell digital assets"
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Cinematic Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Ready-to-Deploy Master Product Briefs, App Builder Prompts & Offer Formulas" },
    { iconName: "file-text", text: "Interactive Pre-Launch QA Checklists & 30-Day Build-and-Sell Sprints" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: HOW_TO_BUILD_SELL_AI_DIGITAL_PRODUCTS_MODULES.map((mod) => ({
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
      name: "Sophie",
      role: "Verified Reader",
      rating: 5,
      quote: "I used to think I needed to build an entire SaaS product to sell something with AI. This completely changed how I approach digital products. The audience-first framework and AI resource app concept are especially useful.",
      initials: "S",
      date: "August 04 2026"
    },
    {
      name: "Mason",
      role: "Verified Reader",
      rating: 5,
      quote: "Probably one of the most practical guides I've read on this topic. It doesn't just tell you to use AI and start selling. It walks through the actual process, from validating an offer to testing payments and getting customers.",
      initials: "M",
      date: "August 08 2026"
    },
    {
      name: "Kowalska",
      role: "Verified Reader",
      rating: 5,
      quote: "The templates and prompts alone make this worth reading. I particularly liked the sections about building a product around one specific customer problem instead of adding random AI features. Very clear and actionable.",
      initials: "K",
      date: "August 14 2026"
    },
    {
      name: "Nathan",
      role: "Verified Reader",
      rating: 5,
      quote: "Great breakdown of the entire process. The launch checklist, customer acquisition strategies, and 30-day plan make it much easier to know what to do next. Especially useful if you're starting from scratch and don't want to waste months building the wrong thing.",
      initials: "N",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "Do I need coding or advanced software development skills?",
      answer: "No. The playbook focuses on the AI Resource App format, utilizing modern natural-language app builders and no-code tools to create clean member dashboards, payment integrations, and focused AI tools without writing complex custom code."
    },
    {
      question: "What is an AI Resource App and why is it better than a course or PDF?",
      answer: "A static PDF is perceived as low-value, while building a full SaaS platform requires months of technical overhead. An AI Resource App provides the sweet spot: a guided instructional curriculum paired with a focused AI tool that takes user inputs and outputs an immediate customized plan or asset."
    },
    {
      question: "What is included with my one-time purchase?",
      answer: "You receive lifetime access to all 7 modules (112 visual presentation slides, 28 comprehensive written lessons), master product brief prompts, payment integration checklists, the 5-part email nurture templates, and the complete 30-day build-and-sell launch roadmap."
    },
    {
      question: "Can I access this on mobile and tablet devices?",
      answer: "Yes, both the slide presentation player and the written article reader are fully responsive and optimized for seamless viewing across smartphones, tablets, and desktop displays."
    }
  ]
};
