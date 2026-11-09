import type { PlaybookDetailData } from "../dating-playbook-detail";
import { BUILD_AI_INFLUENCER_10K_MODULES } from "./build-a-10k-month-ai-influencer-in-9-mins-data";

export const BUILD_AI_INFLUENCER_10K_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-84",
  slug: "build-a-10k-month-ai-influencer-in-9-mins",
  title: "Build a $10k/month Ai influencer in 9 mins...",
  headline: "Build a virtual influencer from scratch, turn AI-generated videos into an audience, and monetise that attention through direct brand partnerships — without ever becoming the face of the account.",
  description: "Go from a character idea to a fully functioning AI influencer business with a practical workflow covering character design, consistent AI image and video generation, viral-content research, and social media growth. Then learn to approach relevant brands, negotiate affiliate commissions, set up product links, and track actual sales. Includes reusable AI prompts, character templates, content workflows, brand outreach scripts, commission calculators, and a 30-day launch roadmap.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,910",
  instructorName: "Bryce Holloway",
  instructorTitle: "Synthetic Media Strategist & Creator Operator",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,910",
  instructorCourses: 3,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996169/Build_a_10k_month_Ai_influencer_in_9_mins....png",
  hoursOfMaterial: "11.2 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  accentColor: "#38bdf8",
  whatYouWillLearn: [
    "Develop original, high-retention AI influencer archetypes backed by competitive market research and audience demand",
    "Engineer consistent character identity reference sheets and full-body anchors that eliminate facial drift across video scenes",
    "Deconstruct viral short-form video frameworks and author original Hook–Story–Payoff scripts optimized for synthetic avatars",
    "Orchestrate a high-throughput multi-modal AI video stack combining image generation, video models, and kinetic captions",
    "Launch dedicated Instagram and TikTok channel fleets with ethical algorithmic warm-up protocols and high-retention content mixes",
    "Negotiate direct brand affiliate partnerships offering 80% to 250% commissions on Amazon consumer products",
    "Master contractual attribution due diligence, spillover sales compensation, and audit-proof payout terms",
    "Execute a disciplined 30-day launch roadmap from initial character design to verified commission payouts"
  ],
  relatedTopics: [
    "Virtual Influencers & Synthetic Media",
    "AI Short-Form Video Generation",
    "Direct Brand Affiliate Partnerships",
    "Amazon Seller Influencer Deals",
    "Instagram & TikTok Audience Growth",
    "Faceless Creator Operations"
  ],
  requirements: [
    "A computer with internet access and basic familiarity with social platforms (Instagram, TikTok)",
    "Commitment to follow the reference-anchored character design workflow to maintain visual continuity",
    "Willingness to conduct contract due diligence before accepting high-percentage brand commission offers",
    "An open, analytical mindset ready to track conversion metrics and publish disciplined weekly content"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive operating manual for Build a $10k/month Ai influencer in 9 mins... This playbook deconstructs synthetic influencer creation from experimental tech novelty into a structured, scalable digital media enterprise.",
      "Rather than showing your face on camera or relying on low-paying programmatic ad revenue, this curriculum delivers the exact step-by-step operating architecture required to create consistent AI personas, produce high-retention short-form video fleets, and monetize audience attention through high-margin direct brand deals on Amazon.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: The AI Influencer Business Model & Market Architecture",
      "Act 2: Character Engineering & Visual Continuity Systems",
      "Act 3: Viral Format Deconstruction & Original Scriptwriting",
      "Act 4: AI Video Production Stack & Multi-Modal Generation",
      "Act 5: Social Distribution, Account Warm-Up & Audience Growth",
      "Act 6: Direct Brand Partnerships & Amazon Affiliate Monetisation",
      "Act 7: Full-Funnel Telemetry, 30-Day Launch Roadmap & Sustainable Scale"
    ],
    closing: [
      "Whether you are an aspiring digital creator seeking a scalable faceless business model, an affiliate marketer looking for high-margin direct brand deals, or an independent operator wanting to master synthetic media, this playbook delivers the exact prompts, templates, and frameworks needed to succeed."
    ]
  },
  targetAudience: [
    "Entrepreneurs and digital operators wanting to build a scalable media business without appearing on camera.",
    "Content creators and social media managers looking to leverage synthetic media and AI video automation.",
    "Affiliate marketers seeking high-margin direct brand deals that exceed traditional 3% retail commission rates.",
    "Independent operators who want to build a disciplined, consistent AI influencer business with sustainable cash flow."
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Master Character Prompts, Hook–Story–Payoff Storyboards & Video Workflows" },
    { iconName: "file-text", text: "Brand Outreach Templates, Commission Calculators & The 30-Day Launch Roadmap" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: BUILD_AI_INFLUENCER_10K_MODULES.map((mod) => ({
    id: mod.id,
    number: String(mod.number),
    title: mod.title,
    description: mod.description,
    duration: "96 min",
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
      name: "Adrian",
      role: "Synthetic Media Operator",
      rating: 5,
      quote: "This connects all the pieces instead of just showing how to generate an AI character. The character identity sheet and reference-image workflow are especially helpful. I can actually see how to build a recognisable account rather than generate random AI pictures.",
      initials: "A",
      date: "August 04 2026"
    },
    {
      name: "Sofia",
      role: "Short-Form Video Producer",
      rating: 5,
      quote: "The video production section is excellent. I liked how it breaks down successful videos into hooks, scenes, and payoffs, then shows how to create original versions. The prompts make the entire process much easier to follow.",
      initials: "S",
      date: "August 08 2026"
    },
    {
      name: "Nathaniel",
      role: "E-commerce Affiliate Strategist",
      rating: 5,
      quote: "The monetisation section was the biggest surprise. Most guides stop at getting views, but this explains how to approach brands, negotiate commission structures, understand attribution, and track real payouts. Very useful business perspective.",
      initials: "N",
      date: "August 14 2026"
    },
    {
      name: "Kiara",
      role: "Digital Media Entrepreneur",
      rating: 5,
      quote: "Probably the most complete AI influencer workflow I've come across. From character creation and content production to audience growth and brand partnerships, everything is organised into actionable steps. The 30-day roadmap makes getting started feel much less overwhelming.",
      initials: "K",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "What is an AI influencer and how does it generate income?",
      answer: "An AI influencer is a fictional persona represented through consistent AI-generated images, videos, and voice. Income is generated primarily through direct brand affiliate partnerships (especially with brands selling on Amazon), where the creator earns high commission rates (often 80–250%) on qualifying product orders driven through their bio link."
    },
    {
      question: "Do I need technical coding skills to create an AI influencer?",
      answer: "No. Modern AI workflows utilize intuitive multimodal platforms including large language models for scripts, diffusion models for consistent character imagery, voice synthesis engines, and video motion models without requiring software development experience."
    },
    {
      question: "Why do brands offer commissions exceeding 100% on product sales?",
      answer: "Brands in high-margin sectors (supplements, skincare, consumer goods) evaluate acquisition on Customer Lifetime Value (LTV) rather than single-order profit. High headline commission rates also compensate creators for untracked mobile spillover sales where viewers discover the product on social media and buy independently on Amazon."
    },
    {
      question: "Are AI influencers required to disclose their synthetic nature?",
      answer: "Yes. Major social platforms and advertising regulators require clear disclosures that a persona is AI-generated. Transparent disclosures build long-term audience trust and protect the account from algorithmic suppression or regulatory penalties."
    }
  ]
};
