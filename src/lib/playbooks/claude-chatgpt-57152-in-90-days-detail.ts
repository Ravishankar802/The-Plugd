import type { PlaybookDetailData } from "../dating-playbook-detail";
import { CLAUDE_CHATGPT_57K_MODULES } from "./claude-chatgpt-57152-in-90-days-data";

export const CLAUDE_CHATGPT_57K_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-67",
  slug: "claude-chatgpt-57152-in-90-days",
  title: "Claude + ChatGPT = $57,152 In 90 Days",
  headline: "Turn Claude and ChatGPT into your faceless YouTube production team—from finding viral-worthy topics to scripting, editing, branding, and publishing Shorts.",
  description: "Millions of views don't happen just because you use AI. This playbook breaks down a complete Shorts workflow built around competitor research, original storytelling, AI voiceovers, visual production, and channel branding. Follow the 90-day roadmap, use ready-made prompts, and learn how to measure retention, improve your videos, and build a repeatable content operation.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "4.8k",
  studentsCount: "3,890",
  instructorName: "Rishabh Jain",
  instructorTitle: "Faceless Media Strategist & AI Content Architect",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.8k",
  instructorStudents: "3,890",
  instructorCourses: 3,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996170/Claude_ChatGPT_57_152_In_90_Days.png",
  hoursOfMaterial: "9.1 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Master the complete operational and systemic mechanics of Claude + ChatGPT = $57,152 In 90 Days",
    "Reverse-engineer competitor outlier Shorts to identify proven topics and narrative structures",
    "Write high-retention 4-beat short-form scripts under 150 words using advanced Claude prompts",
    "Construct scene-by-scene visual storyboards with dynamic 2.5-second pacing and sound design",
    "Brand and launch an authoritative YouTube channel using ChatGPT for names, logos, and descriptions",
    "Execute a disciplined 90-day publishing calendar while diversifying revenue beyond Shorts AdSense"
  ],
  relatedTopics: [
    "YouTube Shorts",
    "Faceless Channels",
    "Claude Scripting",
    "ChatGPT Branding",
    "Video Production",
    "Creator Monetization"
  ],
  requirements: [
    "A computer or smartphone with an internet connection",
    "Free or standard accounts with Claude, ChatGPT, and a vertical video editor",
    "Willingness to learn short-form storytelling, retention metrics, and ethical media production",
    "Zero prior video editing, on-camera, or channel management experience required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive masterclass on Claude + ChatGPT = $57,152 In 90 Days. This playbook turns a reported real-world YouTube Shorts experiment into an actionable operating manual for independent digital creators and media operators.",
      "Rather than preaching low-effort AI spam or hoping for random viral hits, this curriculum delivers structured competitor intelligence protocols, curiosity-gap scriptwriting architectures, precise timeline storyboarding, and a disciplined 90-day execution roadmap.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: The Faceless Shorts Business Model & Video Economics",
      "Act 2: Competitor Intelligence & Systematic Channel Analysis",
      "Act 3: Scriptwriting & Curiosity-Gap Narrative Engineering",
      "Act 4: Visual Storyboarding & Scene-by-Scene Production Planning",
      "Act 5: Vertical Video Assembly, Voiceover & Timeline Pacing",
      "Act 6: Channel Branding & Identity Systems with ChatGPT",
      "Act 7: The 90-Day Scaling Roadmap, Retention & Monetization"
    ],
    closing: [
      "Every lesson is designed for immediate tactical execution, complete with 24-hour action directives and sovereign battle decision matrices.",
      "Join thousands of modern operators who use these exact frameworks to build lean, authoritative, and profitable media channels."
    ]
  },
  targetAudience: [
    "Independent creators who want to build a profitable faceless YouTube channel without appearing on camera",
    "Digital operators seeking to leverage Claude and ChatGPT for high-velocity research, scripting, and branding",
    "Video editors looking to optimize their short-form production pipelines and retention metrics",
    "Media builders committed to ethical, verified, and high-retention educational storytelling"
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Ready-to-Deploy 90-Day Publishing Roadmap, Hook Frameworks & Prompt SOPs" },
    { iconName: "file-text", text: "Scene Breakdown Templates, Caption Guides & Daily 75-Minute Workflow" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: CLAUDE_CHATGPT_57K_MODULES.map((mod) => ({
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
      name: "Daniel",
      role: "Content Creator",
      rating: 5,
      quote: "The best part is how the entire process connects. I went from thinking about AI videos as random clips to understanding how research, scripting, storyboarding, and editing fit into one production system.",
      initials: "D",
      date: "August 2026"
    },
    {
      name: "Felix Morgan",
      role: "Video Strategist",
      rating: 5,
      quote: "Those Claude prompts are incredibly useful. The competitor research and scene breakdown sections gave me a much clearer way to plan videos instead of staring at a blank screen wondering what to make.",
      initials: "FM",
      date: "August 2026"
    },
    {
      name: "Anika Patel",
      role: "Media Operator",
      rating: 5,
      quote: "I expected another guide promising effortless YouTube money. Instead, it actually explains retention, copyright, monetisation, and production costs. That honest approach made the material much more valuable.",
      initials: "AP",
      date: "August 2026"
    }
  ],
  faqs: [
    {
      question: "Do I need prior video editing experience to execute this playbook?",
      answer: "No. The playbook breaks down each step of the vertical video assembly process using intuitive editing tools, ready-made prompt templates, and clear timeline guidelines."
    },
    {
      question: "Is $57,152 in 90 days guaranteed?",
      answer: "No. The $57,152 figure is a case-study headline from the source experiment. Your results depend on niche selection, audience retention, geographical RPM, and consistent execution."
    },
    {
      question: "What tools are required to start?",
      answer: "You need access to Claude, ChatGPT, a video editor with vertical timeline capabilities, and a free YouTube account. All workflows can be tested on standard subscriptions."
    },
    {
      question: "What is included with my one-time purchase?",
      answer: "You receive full lifetime digital access to the complete 7-module visual presentation player (112 slides), 28 comprehensive written lesson guides, prompt templates, operational checklists, and all future curriculum updates with zero subscription fees."
    }
  ]
};
