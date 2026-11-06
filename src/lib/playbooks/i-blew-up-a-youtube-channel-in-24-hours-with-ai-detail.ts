import type { PlaybookDetailData } from "../dating-playbook-detail";
import { BLEW_UP_YOUTUBE_AI_MODULES } from "./i-blew-up-a-youtube-channel-in-24-hours-with-ai-data";

export const BLEW_UP_YOUTUBE_AI_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-91",
  slug: "i-blew-up-a-youtube-channel-in-24-hours-with-ai",
  title: "I BLEW UP a YouTube Channel in 24 Hours with AI",
  headline: "Turn AI into your Shorts production studio — reverse-engineer viral storytelling, create original transformation videos, and build a repeatable YouTube content system that can capture millions of views.",
  description: "**Turn AI into your Shorts production studio — reverse-engineer viral storytelling, create original transformation videos, and build a repeatable YouTube content system that can capture millions of views.**\\n\\nLearn how to take a proven short-form video format and transform it into an original AI-powered YouTube channel. From niche research and six-phase storytelling to consistent AI visuals, animation, voice-overs, editing, publishing, and analytics, this playbook walks you through the entire production process. Includes reusable AI prompts, scene-analysis templates, visual continuity workflows, editing checklists, performance trackers, and a practical 24-hour launch plan.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,910",
  instructorName: "Kelvin Ng",
  instructorTitle: "AI Short-Form Video Producer & YouTube Growth Strategist",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,910",
  instructorCourses: 2,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996172/I_BLEW_UP_a_YouTube_Channel_in_24_Hours_with_AI.png",
  hoursOfMaterial: "11.2 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  accentColor: "#ff4b72",
  whatYouWillLearn: [
    "Reverse-engineer viral storytelling mechanics rather than cloning surface subjects",
    "Screen video concepts using universal relatability, emotional hooks, and completion compulsion",
    "Master the 6-phase short-form narrative formula: Declare, Assessment, Isolate, Process, Build, Reveal",
    "Lock visual continuity using the dual-anchor reference protocol (environment + subject)",
    "Direct AI image-to-video animation with subtle motion and high-retention hook devices",
    "Edit professional voice-overs with zero dead air, foley sound design, and kinetic captions",
    "Package Shorts with high-converting titles and lock frame-one thumbnails via mobile app",
    "Decode multi-wave algorithmic distribution patterns and scale an episodic Short-form studio"
  ],
  relatedTopics: [
    "Short-Form Video Reverse Engineering",
    "6-Phase Narrative Storytelling Architecture",
    "Dual-Anchor AI Visual Continuity",
    "Zero Dead-Air Audio & Kinetic Typography",
    "First Frame Thumbnail Optimization",
    "Algorithmic Multi-Wave Distribution Telemetry"
  ],
  requirements: [
    "A computer with internet connectivity for generative AI tools and video editing",
    "Basic familiarity with video editing software (e.g. CapCut, Premiere, or DaVinci Resolve)",
    "Willingness to conduct forensic frame-by-frame scene analysis on competitor videos",
    "A creative mindset focused on storytelling structure rather than relying purely on random prompts"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive operating manual for I BLEW UP a YouTube Channel in 24 Hours with AI. This playbook transforms a viral 48-hour experiment into an actionable, repeatable production manual for modern creators.",
      "Rather than throwing random prompts into an image generator or cloning existing channels, this curriculum deconstructs the underlying storytelling mechanics, dual-anchor visual consistency pipelines, rapid editing systems, and algorithmic telemetry needed to build a sustainable digital media studio.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: The Viral Storytelling Engine & Format Reverse-Engineering",
      "Act 2: The Six-Phase Narrative Architecture (Declare to Reveal)",
      "Act 3: Niche Adaptation & Frictionless Channel Foundation",
      "Act 4: Consistent AI Visual Environment & Character Pipelines",
      "Act 5: Animation, Voice-Over & Rapid Editing Systems",
      "Act 6: Packaging, Publishing & The First Frame Architecture",
      "Act 7: Analytics Interpretation, Algorithmic Waves & Studio Scaling"
    ],
    closing: [
      "Whether you are launching your very first YouTube channel or looking to scale an existing content studio with generative AI, this playbook delivers the exact operational blueprint needed to execute with confidence."
    ]
  },
  targetAudience: [
    "Content creators and video editors who want to build high-retention short-form video channels.",
    "Entrepreneurs and digital operators looking to leverage AI as a production studio multiplier.",
    "Storytellers seeking a structured 6-phase framework that commands 80%+ average percentage viewed.",
    "Modern digital builders committed to mastering the discipline and mechanics of viral media."
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "The 6-Phase Storytelling Blueprint & Dual-Anchor Reference Workflows" },
    { iconName: "file-text", text: "Scene Analysis Templates, Editing Checklists & Analytics Trackers" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: BLEW_UP_YOUTUBE_AI_MODULES.map((mod) => ({
    id: mod.id,
    number: String(mod.number),
    title: mod.title,
    description: mod.description,
    duration: "96 min",
    lessonsCount: mod.lessons.length,
    lessons: mod.lessons.map((les) => ({
      id: les.id,
      number: String(les.number),
      title: les.title,
      duration: les.duration,
      isPreview: les.id === "01-1"
    }))
  })),
  testimonials: [
    {
      name: "Sam",
      role: "Verified Reader",
      rating: 5,
      quote: "The six-phase storytelling framework is the real gem here. It explains how to create that curiosity loop that makes people want to see the final reveal. I especially liked how the playbook shows you to study successful formats without simply copying other creators.",
      initials: "S",
      date: "August 04 2026"
    },
    {
      name: "Rishi",
      role: "Verified Reader",
      rating: 5,
      quote: "Finally, an AI Shorts guide that goes beyond throwing prompts into an image generator. The environment references, subject consistency, scene generation, and animation workflows make the production process much easier to understand.",
      initials: "R",
      date: "August 08 2026"
    },
    {
      name: "Zoe",
      role: "Verified Reader",
      rating: 5,
      quote: "The case study makes this particularly interesting. I liked seeing the actual production sequence, editing decisions, and analytics breakdown rather than just a screenshot of a huge view count. The templates are useful too.",
      initials: "Z",
      date: "August 14 2026"
    },
    {
      name: "Pradeep",
      role: "Verified Reader",
      rating: 5,
      quote: "My favourite part is how everything connects, from choosing the niche to scripting, generating visuals, editing, and analysing performance. It feels like a complete content-production system rather than a collection of random AI tricks.",
      initials: "P",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "What is the core operating principle behind blowing up an AI YouTube channel?",
      answer: "The operating principle is to study the underlying storytelling mechanism rather than copying surface subject matter. By analyzing what makes an idea instantly understandable, what emotion it triggers, and how curiosity is sustained, you can port a proven narrative engine into an entirely original niche."
    },
    {
      question: "What is the 6-phase storytelling formula?",
      answer: "The 6-phase formula is: 1) Declare (state the destination immediately), 2) Assessment (show starting conditions and challenge scale), 3) Isolate (break work into meticulous visible actions), 4) Process (compress intense labor into a time-lapse montage), 5) Build (bring elements together toward completion), and 6) Reveal (deliver the high-contrast before-and-after payoff)."
    },
    {
      question: "How do you prevent generative AI from morphing backgrounds and characters?",
      answer: "By deploying the dual-anchor reference protocol: first generate an empty, detailed reference image of the environment without subjects, and pair it with a dedicated high-resolution subject reference image. Inject both references into every subsequent scene prompt to lock spatial and anatomical continuity."
    },
    {
      question: "Why did the video flatline at 14,000 views before hitting 694,000 views?",
      answer: "YouTube tests short-form videos in phased audience waves. An early pause is standard algorithmic behavior while the platform evaluates average percentage viewed, retention curves, and swipe-away rates. Leaving metadata untouched allows the algorithm to release the video into larger cohorts."
    },
    {
      question: "Can AI-assisted short-form content be monetized on YouTube?",
      answer: "Yes, provided the content involves genuine human creative direction, original scripting, thoughtful editing, and meaningful variation between uploads. YouTube's policies penalize low-effort, repetitive mass-produced spam, while rewarding high-craft storytelling that engages real audiences."
    },
    {
      question: "How long does it take to produce a completed Short using this system?",
      answer: "Following the standardized 14-step assembly pipeline, an experienced operator can take an episode from initial 6-phase outline to finished 59-second export in approximately 2 hours and 3 minutes."
    }
  ]
};
