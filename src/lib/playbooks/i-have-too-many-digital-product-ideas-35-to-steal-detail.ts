import type { PlaybookDetailData } from "../dating-playbook-detail";
import { DIGITAL_PRODUCT_IDEAS_35_MODULES } from "./i-have-too-many-digital-product-ideas-35-to-steal-data";

export const DIGITAL_PRODUCT_IDEAS_35_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-79",
  slug: "i-have-too-many-digital-product-ideas-35-to-steal",
  title: "I have too many digital product ideas (35+ to steal)",
  headline: "35 digital product business ideas, with a practical framework for finding the right buyer, validating demand, and turning one promising idea into a product people will pay for.",
  description: "Explore 35 opportunities across templates, software, AI workflows, education, communities, and premium offers. Learn how to identify valuable problems, differentiate your product through specificity, test buying intent before building, package and price your solution, and launch with a focused 30-day execution plan. Includes idea evaluation scorecards, customer interview questions, offer templates, and validation checklists.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 6.99,
  currency: "USD",
  discountPercentage: 57,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,820",
  instructorName: "Rafael Mendes",
  instructorTitle: "Digital Product Architect & Portfolio Strategist",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,820",
  instructorCourses: 3,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996173/I_have_too_many_digital_product_ideas_35_to_steal.png",
  hoursOfMaterial: "10.5 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Filter 35+ candidate ideas using the 10-point evaluation scorecard to find your highest-probability winner",
    "Master the 5-variable specificity equation to transform generic commodity templates into high-value offers",
    "Build institutional decision calculators that evaluate high-stakes capital allocation and financial moves",
    "Engineer one-button micro-utilities and operational software that prevent direct business revenue leakage",
    "Deploy configured AI assistants and multi-stage production workflows that sell repeatable execution over prompts",
    "Unlock cold-start paradoxes for new businesses through targeted proof generation and review frameworks",
    "Structure high-retention post-purchase troubleshooting communities and goal-oriented accountability cohorts",
    "Execute a disciplined 30-day launch roadmap from customer interviews and Minimum Credible Offers to cash flow"
  ],
  relatedTopics: [
    "Digital Product Ideation",
    "Customer Demand Validation",
    "Niche Market Specificity",
    "Decision Calculators & Tools",
    "AI Workflow Production",
    "30-Day Product Launches"
  ],
  requirements: [
    "A computer with a modern web browser and stable high-speed internet connection",
    "A free or paid spreadsheet application (Google Sheets, Microsoft Excel, or Apple Numbers)",
    "Willingness to conduct 5 structured problem-discovery conversations with real potential buyers",
    "Dedication of 8-12 focused hours per week to execute the 30-day launch roadmap"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive operating manual for I Have Too Many Digital Product Ideas (35+ to Steal). This playbook transforms raw creative ideation into a disciplined, repeatable digital asset business.",
      "Rather than chasing 35 disparate projects simultaneously or defaulting to low-value, commodity PDF downloads that get lost in the noise, this curriculum establishes the exact step-by-step operating architecture required to find validated customer demand, differentiate through surgical specificity, engineer institutional tools, and launch with confidence.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: Foundations of Digital Product Economics & Specificity Architecture",
      "Act 2: Specialized Templates, Calculators & High-Stakes Assets",
      "Act 3: Small Software, Micro-Tools & Automated Workflow Engines",
      "Act 4: AI Assistants, Configured Bots & Specialized Knowledge Pipelines",
      "Act 5: Practical Education, Micro-Playbooks & Cold-Start Frameworks",
      "Act 6: Recurring Communities, Membership Networks & Peer Support",
      "Act 7: Premium Transformation Offers, Validation & 30-Day Launch Sprint"
    ],
    closing: [
      "Whether you are an aspiring creator struggling with idea overload or an experienced operator seeking to productize your expertise into high-margin assets, this playbook delivers the exact scorecards, customer interview scripts, pricing models, and launch schedules needed to finish your first product."
    ]
  },
  targetAudience: [
    "Entrepreneurs and solopreneurs who have multiple digital product ideas but struggle to narrow down and finish one.",
    "Freelancers, consultants, and creators wanting to transition from client service hours to scalable digital assets.",
    "Domain specialists looking to package professional calculators, templates, or workflows for their industry.",
    "Indie builders aiming to validate customer demand and collect pre-orders before investing heavily in development."
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "10-Point Idea Evaluation Scorecards & One-Page Offer Briefs" },
    { iconName: "file-text", text: "Customer Interview Scripts, Pricing Frameworks & 30-Day Launch Calendars" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: DIGITAL_PRODUCT_IDEAS_35_MODULES.map((mod) => ({
    id: mod.id,
    number: String(mod.number),
    title: mod.title,
    description: mod.description,
    duration: "90 min",
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
      name: "Lucia",
      role: "Digital Product Builder",
      rating: 5,
      quote: "I came in expecting another list of random side-hustle ideas. What I got was a much better way to think about products. The examples showing how to turn generic templates into niche-specific solutions were especially helpful.",
      initials: "L",
      date: "August 04 2026"
    },
    {
      name: "Kunal",
      role: "Solo SaaS Operator",
      rating: 5,
      quote: "The validation section alone saved me from jumping straight into development. I like that it explains how to speak with potential buyers and look for actual buying signals instead of relying on people saying an idea sounds great.",
      initials: "K",
      date: "August 08 2026"
    },
    {
      name: "Williams",
      role: "Consultant & Digital Creator",
      rating: 5,
      quote: "35 ideas, but somehow the biggest takeaway is to stop chasing 35 different projects. The breakdown of product formats and the decision scorecard helped me narrow things down to one offer I can realistically build.",
      initials: "W",
      date: "August 14 2026"
    },
    {
      name: "Fernández",
      role: "Growth Strategist & Operator",
      rating: 5,
      quote: "Really liked the section about selling the outcome rather than the number of files included. It changed how I think about pricing and packaging. The 30-day roadmap also makes the whole process feel much more manageable.",
      initials: "F",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "Do I need coding experience or advanced technical skills to build these digital products?",
      answer: "No. The 35 opportunities span across spreadsheets, fill-in-the-blank swipe files, natural language AI workflows, curated communities, and practical playbooks. For small software tools, modern natural-language coding tools allow non-engineers to prototype functional micro-utilities rapidly."
    },
    {
      question: "How do I choose which of the 35 ideas to pursue first?",
      answer: "The curriculum provides an objective 10-point evaluation scorecard that ranks candidate ideas across problem severity, buyer specificity, existing commercial demand, direct audience access, and 7-day buildability. You will select and finish one high-probability opportunity before considering expansion."
    },
    {
      question: "How can I validate customer demand before spending weeks building a product?",
      answer: "You will deploy the Minimum Credible Offer (MCO) framework and conduct targeted customer discovery audits. By examining competitors' 1-star reviews, interviewing prospective buyers about past purchasing behavior, and offering transparent early-bird preorders, you confirm willingness to pay before writing content."
    },
    {
      question: "What pricing models work best across these digital product formats?",
      answer: "Pricing is calibrated to economic value and risk mitigation rather than file counts. Entry-level swipe files and starter checklists sit between $27–$47, institutional decision calculators command $97–$197, recurring troubleshooting hubs operate at $49–$99/month, and hybrid 'Done-With-You' transformations scale to $2,500–$5,000."
    }
  ]
};
