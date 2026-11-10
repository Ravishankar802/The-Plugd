import type { PlaybookDetailData } from "../dating-playbook-detail";
import { COURAGE_TO_BE_DISLIKED_MODULES } from "./courage-to-be-disliked-data";

export const COURAGE_TO_BE_DISLIKED_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-104",
  slug: "the-courage-to-be-disliked-summary-my-honest-review",
  title: "The Courage to be Disliked Summary + my honest review",
  headline: "Stop living for everyone else's approval. Discover how to break free from comparison, set boundaries, accept yourself, and finally live life on your own terms.",
  description: "**Stop living for everyone else's approval. Discover how to break free from comparison, set boundaries, accept yourself, and finally live life on your own terms.**\n\nExplore the five-night journey of The Courage to Be Disliked and its most powerful ideas on personal freedom, relationships, self-acceptance, and living in the present. Learn to separate your responsibilities from other people's expectations, escape the trap of comparison, and build healthier relationships — while examining the book's most controversial arguments through an honest, balanced review. Includes practical exercises, reflection prompts, and a seven-day plan to put the ideas into practice.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.7,
  ratingCount: "0.5k",
  publishedAt: "2026-10-23",
  studentsCount: "4,850",
  instructorName: "Divya Tiwari",
  instructorTitle: "Mindset Strategist & Operational Thinker",
  instructorBio: "",
  instructorRating: 4.7,
  instructorReviews: "0.5k",
  instructorStudents: "4,850",
  instructorCourses: 2,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1794352588/The_courage_to_be_disliked.png",
  hoursOfMaterial: "9.8 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Dismantle past-trauma determinism using Adlerian teleology and present-oriented goal analysis",
    "Escape the trap of perpetual comparison and reframe feelings of inferiority into disciplined skill acquisition",
    "Master the separation-of-tasks principle to eliminate approval addiction and protect mental clarity",
    "Understand why genuine personal freedom requires accepting that some people will inevitably dislike you",
    "Replace manipulative vertical praise with horizontal encouragement, gratitude, and mutual dignity",
    "Navigate the critical boundary between healthy emotional boundaries and cold, narcissistic indifference",
    "Embrace the revolutionary courage to be ordinary and treat life as a rich dance of present moments",
    "Deploy the seven-day reflection roadmap and word-for-word scripts to establish boundaries with grace"
  ],
  relatedTopics: [
    "Adlerian Psychology",
    "Personal Freedom",
    "Boundary Setting",
    "Task Separation",
    "Mindset Architecture",
    "Self-Acceptance"
  ],
  requirements: [
    "A computer, tablet, or smartphone with internet access and a modern web browser",
    "Willingness to honestly examine personal habits of approval-seeking, defensiveness, and comparison",
    "Zero prior psychology or academic background required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the comprehensive, battle-tested playbook on The Courage to Be Disliked Summary + My Honest Review. This edition translates the five-night Socratic dialogue of Ichiro Kishimi and Fumitake Koga into a rigorous, actionable blueprint for modern builders, operators, and independent thinkers.",
      "Rather than repeating conventional self-help slogans, this playbook rigorously deconstructs Alfred Adler's individual psychology. We examine the core mechanisms that liberate human beings from approval addiction, status anxiety, and historical victimhood—while fearlessly confronting the book's most controversial arguments regarding clinical trauma, structural inequality, and utility-based self-worth.",
      "Every single lesson provides both a visual slide presentation and an in-depth written guide detailing conceptual foundations, step-by-step implementation, diagnostic matrices, worked exercises, and word-for-word communication scripts."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: First Night: Teleology, Past Trauma & Present Goals",
      "Act 2: Second Night: Interpersonal Problems & The Trap of Comparison",
      "Act 3: Third Night: Separation of Tasks & Freedom from Recognition",
      "Act 4: Fourth Night: Community Feeling & The Essence of Worth",
      "Act 5: Fifth Night: Living in the Here and Now & The Courage to Be Ordinary",
      "Act 6: Honest Critique & Deconstruction: Mindset vs Reality",
      "Act 7: The Seven-Day Implementation Blueprint & Field Exercises"
    ],
    closing: [
      "Every lesson is designed for immediate real-world execution, complete with actionable battle exercises, diagnostic worksheets, and tactical scripts.",
      "Join thousands of readers worldwide who deploy these exact frameworks to break free from comparison, protect internal peace, and live life strictly on their own terms."
    ]
  },
  targetAudience: [
    "Ambitious operators and professionals who feel trapped by the constant pressure to please clients, managers, and family",
    "Creators and founders seeking the psychological resilience to endure public criticism and market indifference",
    "Anyone struggling with status anxiety, imposter syndrome, chronic comparison, or perfectionist paralysis",
    "Readers who want a balanced, intellectually honest breakdown of Adlerian psychology without blind dogma"
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Cinematic Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Ready-to-Deploy Boundary Scripts, Approval Audits & Reflection Worksheets" },
    { iconName: "file-text", text: "The Complete 7-Day Transformation Roadmap & Comparison Reset Matrix" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: COURAGE_TO_BE_DISLIKED_MODULES.map((mod) => ({
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
      name: "Ananya Krishnan",
      role: "Verified Reader",
      rating: 5,
      quote: "Loved how this breaks down the book without blindly agreeing with everything. The practical exercises made the ideas much easier to apply to everyday life.",
      initials: "A",
      date: "August 04 2026"
    },
    {
      name: "Siddharth Kulkarni",
      role: "Verified Reader",
      rating: 5,
      quote: "The section on separating your tasks from other people's expectations really hit me. A thoughtful guide that makes you question how much of your life is shaped by seeking approval.",
      initials: "S",
      date: "August 08 2026"
    },
    {
      name: "Pooja",
      role: "Verified Reader",
      rating: 5,
      quote: "More than just a book summary. I especially liked the honest criticism around trauma, relationships, and self-worth. It feels balanced rather than preachy.",
      initials: "P",
      date: "August 14 2026"
    },
    {
      name: "Karthik",
      role: "Verified Reader",
      rating: 5,
      quote: "The seven-day reflection plan is genuinely useful. The ideas about comparison, boundaries, and accepting yourself are explained in a way that actually stays with you.",
      initials: "K",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "How is this different from typical book summaries or surface-level reviews?",
      answer: "Most summaries offer shallow bullet points that fail to translate philosophy into everyday life. This playbook delivers a comprehensive masterclass—combining deep philosophical deconstruction, balanced clinical critiques, structured slide decks, worked diagnostic tables, and word-for-word relational scripts."
    },
    {
      question: "Do I need to read the original book before studying this playbook?",
      answer: "No. This playbook covers all five nights in full chronological depth, introducing every Adlerian concept from the ground up while adding critical nuance and practical exercises not found in the original dialogue."
    },
    {
      question: "What is included with my one-time purchase?",
      answer: "You receive full lifetime digital access to the complete 7-module visual presentation player (112 slides), 28 comprehensive written guides, the 7-day implementation roadmap, the Approval Audit worksheet, and all future curriculum updates with zero recurring fees."
    },
    {
      question: "Can I access this on mobile or tablet devices?",
      answer: "Yes, the learning player and written reader are fully responsive and optimized for seamless viewing across smartphones, tablets, laptops, and ultra-wide desktop monitors."
    }
  ]
};
