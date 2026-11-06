import type { PlaybookDetailData } from "../dating-playbook-detail";
import { FACELESS_CHANNEL_12K_CLAUDE_MODULES } from "./how-a-faceless-channel-made-12-804-month-with-claude-data";

export const FACELESS_CHANNEL_12K_CLAUDE_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-78",
  slug: "how-a-faceless-channel-made-12-804-month-with-claude",
  title: "How a Faceless Channel Made $12,804/Month With Claude",
  headline: "A practical blueprint for building a faceless YouTube business with a consistent AI-generated host, automated video production, and digital products as a revenue stream.",
  description: "Turn Claude and AI video-generation tools into a repeatable content production system. Learn how to develop a virtual presenter, research audience-driven topics, create original videos, and sell digital products that complement your channel. Includes reusable prompts, production workflows, revenue calculations, quality checklists, and a 30-day launch roadmap.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,740",
  instructorName: "Brady Lawson",
  instructorTitle: "AI Media Architect & Systems Operator",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,740",
  instructorCourses: 3,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996192/How_a_Faceless_Channel_Made_12_804_Month_With_Claude.png",
  hoursOfMaterial: "10.8 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Build a persistent, photorealistic virtual presenter with locked visual identity across hundreds of videos",
    "Engineer audience-calibrated YouTube script architectures using Claude 3.5 Sonnet to maximize retention",
    "Construct multi-track cinematic B-roll pipelines combining Midjourney, Kling, and ElevenLabs voice models",
    "Architect high-converting digital products (toolkits, templates, databases) monetizing day-one traffic",
    "Implement the 3-Layer Monetization Engine decoupling channel revenue from volatile YouTube AdSense RPMs",
    "Master YouTube click-through packaging, high-contrast thumbnail compositions, and title tension formulas",
    "Deploy automated editing scripts, FFmpeg workflows, and standardized subtitle styling protocols",
    "Execute a structured 30-day channel launch roadmap to build an enduring media enterprise"
  ],
  relatedTopics: [
    "Faceless YouTube Channels",
    "Claude Scripting Workflows",
    "AI Avatar Generation",
    "Digital Product Funnels",
    "Voice Cloning & Audio Engineering",
    "Automated Video Production"
  ],
  requirements: [
    "A computer with a modern web browser and stable high-speed internet connection",
    "Access to Claude (Anthropic) or compatible advanced large language model",
    "Basic familiarity with video creation tools and digital storefront platforms (Gumroad, Lemon Squeezy)",
    "Dedication of 8-12 hours per week to execute character testing, scripting, and media synthesis"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive operating manual for How a Faceless Channel Made $12,804/Month With Claude. This playbook demystifies autonomous AI media production and replaces hype with a proven, enterprise-grade publishing system.",
      "Rather than relying solely on capricious YouTube AdSense payouts or producing low-effort AI slop that gets penalized by platform algorithms, this curriculum demonstrates how to build an authoritative digital brand with a persistent virtual persona, rigorous factual research, cinematic visual pacing, and high-margin digital products.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: Foundations of Faceless AI Media Architecture & The $12.8K Operating Thesis",
      "Act 2: Digital Character Engineering & Persistent Persona Genesis",
      "Act 3: Algorithmic Market Intelligence & Retention Scriptwriting with Claude",
      "Act 4: High-Fidelity Audio Engineering & Voice Synthesis Pipelines",
      "Act 5: Cinematic B-Roll Generation, Visual Motion & Automated Post-Production",
      "Act 6: Packaging Architecture, CTR Optimization & Algorithmic Distribution",
      "Act 7: Digital Product Monetization Engine, Multi-Tier Funnels & Enterprise Scaling"
    ],
    closing: [
      "Whether you are an aspiring creator wanting to build a sustainable digital income without revealing your face, or an experienced operator seeking to systematize media production through artificial intelligence, this playbook delivers the exact prompts, character seeds, economic models, and launch schedules needed to execute."
    ]
  },
  targetAudience: [
    "Digital entrepreneurs wanting to build high-earning media assets without appearing on camera or recording their voice.",
    "Content creators and video editors seeking to automate production pipelines with Claude and advanced generative AI.",
    "Solopreneurs looking to monetize targeted niche traffic with high-margin digital products and automated sales funnels.",
    "Marketers and media operators aiming to build scalable, low-overhead YouTube channels across global verticals."
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Claude Scripting Prompts, Character Seed Bibles & Editing Workflows" },
    { iconName: "file-text", text: "Unit Economics Spreadsheets, Funnel Schemas & 30-Day Launch Roadmaps" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: FACELESS_CHANNEL_12K_CLAUDE_MODULES.map((mod) => ({
    id: mod.id,
    number: String(mod.number),
    title: mod.title,
    description: mod.description,
    duration: "92 min",
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
      name: "Ananya",
      role: "Digital Creator & Media Builder",
      rating: 5,
      quote: "Finally, a guide that explains the entire process instead of just throwing AI tools at you. The character development, scripting, and video production workflows made the business model much easier to understand. Loved the practical prompts.",
      initials: "A",
      date: "August 04 2026"
    },
    {
      name: "Vincent",
      role: "E-Commerce Operator & Strategist",
      rating: 5,
      quote: "The digital product strategy was the most interesting part for me. I hadn't considered building revenue around a channel rather than depending entirely on YouTube ads. The examples helped me see how the pieces fit together.",
      initials: "V",
      date: "August 08 2026"
    },
    {
      name: "Mehul Shah",
      role: "Content Director & Agency Founder",
      rating: 5,
      quote: "I appreciated how much attention this gives to consistency. Creating an AI presenter is one thing; making that character feel recognisable across dozens of videos is another. The character bible and production templates are genuinely useful.",
      initials: "M",
      date: "August 14 2026"
    },
    {
      name: "Ethan",
      role: "Solo Tech Builder & Operator",
      rating: 5,
      quote: "More realistic than most AI side-hustle guides. It doesn't pretend that generating videos automatically means making thousands of dollars. The revenue breakdown, quality checks, and 30-day roadmap make this a much better starting point.",
      initials: "E",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "Do I need to show my face or record my own voice to build this business?",
      answer: "No. The entire business model is designed from first principles to be 100% faceless and voice-free. You will utilize persistent AI visual avatars and hyper-realistic neural voice synthesis with studio-grade cadence and pacing."
    },
    {
      question: "How does this channel earn $12,804/month without millions of subscribers?",
      answer: "The channel operates on a 3-Layer Monetization Model: YouTube AdSense ($3,120), digital product sales ($8,420), and targeted brand sponsorships ($1,264). By guiding viewers from videos into proprietary digital products, earnings per thousand views (RPM) surge from $4–$6 to over $40+."
    },
    {
      question: "Will YouTube demonetize or penalize AI-generated faceless channels?",
      answer: "YouTube penalizes repetitive, low-effort programmatic spam. This playbook teaches high-value editorial scripting with Claude, original investigative research, bespoke persistent avatars, and human-in-the-loop post-production that fully complies with YouTube monetization policies."
    },
    {
      question: "What software stack is required and what are the ongoing operational costs?",
      answer: "The production pipeline relies on Claude 3.5 Sonnet ($20/mo), Midjourney ($30/mo), ElevenLabs ($22/mo), Kling AI / Hedra ($30/mo), and CapCut Pro or DaVinci Resolve (free or $10/mo). Total monthly operating expenses typically average $100–$120, yielding profit margins exceeding 90% at scale."
    }
  ]
};
