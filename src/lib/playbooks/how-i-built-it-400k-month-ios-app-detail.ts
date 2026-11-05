import type { PlaybookDetailData } from "../dating-playbook-detail";
import { HOW_I_BUILT_400K_IOS_MODULES } from "./how-i-built-it-400k-month-ios-app-data";

export const HOW_I_BUILT_400K_IOS_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-76",
  slug: "how-i-built-it-400k-month-ios-app",
  title: "How I Built It: $400K/Month iOS App",
  headline: "A practical guide to turning a simple iOS app idea into a scalable business through focused product development, user analytics, experimentation, and smart distribution.",
  description: "Go behind the growth story of Brain Rot, the screen-time app whose founder reported reaching approximately $400K in monthly revenue. Learn how to identify problems worth solving, build a distinctive mobile product, prepare for launch, understand power users, improve retention, and scale acquisition channels. Includes a 90-day roadmap, recommended tools, analytics frameworks, experiment templates, and launch checklists.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,420",
  instructorName: "Jason Teo",
  instructorTitle: "iOS App Founder & Growth Engineer",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,420",
  instructorCourses: 3,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793023911/How_I_Built_It_400K_Month_iOS_App.png",
  hoursOfMaterial: "10.2 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Turn personal digital frustrations into narrow, memorable mobile utilities with emotional feedback loops",
    "Build pre-launch distribution on Instagram and TikTok to convert launch day into a $10,000 revenue event",
    "Instrument lean event taxonomies across Mixpanel and Firebase to track the exact user activation moment",
    "Conduct qualitative power-user interviews and cohort retention analysis to optimize Day 1-7-30 curves",
    "Scale creator partnerships and paid ad campaigns with strict attribution modeling and marginal CAC control",
    "Deploy annual subscription models and dynamic Superwall paywalls to generate immediate upfront working capital"
  ],
  relatedTopics: [
    "iOS App Development",
    "Mobile Growth Engineering",
    "Product Analytics & Telemetry",
    "Subscription Economics",
    "App Store Optimization (ASO)",
    "Creator Acquisition Channels"
  ],
  requirements: [
    "A computer with internet access and basic interest in mobile software or product management",
    "Familiarity with consumer mobile applications and digital subscription business models",
    "Willingness to track telemetry data, cohort retention curves, and customer acquisition metrics",
    "Zero prior Swift coding experience or venture capital funding required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive operational manual for How I Built It: $400K/Month iOS App. This playbook goes behind the scenes of Brain Rot, the gamified screen-time utility whose founder reported scaling from $10,000 to approximately $400,000 in monthly recurring revenue.",
      "Rather than treating mobile app growth as a mysterious viral lottery, this curriculum establishes the exact step-by-step operating architecture required to find problems worth solving, design emotional product hooks, prepare high-converting launches, track power-user telemetry, optimize onboarding funnels, and scale profitable creator and paid advertising channels.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: Problem Discovery & Distinctive Concept Engineering",
      "Act 2: Pre-Launch Audience Architecture & The $10K Launch Day",
      "Act 3: Behavioral Telemetry, Analytics & Activation Optimization",
      "Act 4: Relentless Micro-Experimentation & Funnel Optimization",
      "Act 5: Acquisition Scaling & Multi-Channel Distribution Economics",
      "Act 6: Subscription Architecture, Retention & Team Evolution",
      "Act 7: The Production iOS Stack & The 90-Day App Roadmap"
    ],
    closing: [
      "Whether you are an indie developer building your first consumer utility or an experienced operator seeking to master mobile subscription economics, this playbook provides the exact frameworks, configuration schemas, and decision matrices needed to build a durable software enterprise."
    ]
  },
  targetAudience: [
    "iOS developers and indie hackers wanting to turn side projects into profitable subscription businesses.",
    "Mobile product managers and growth marketers looking to master activation telemetry and cohort retention.",
    "Entrepreneurs seeking to validate consumer utility ideas and build pre-launch distribution.",
    "Founders aiming to scale creator marketing and paid ad campaigns with positive unit economics."
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Mobile Telemetry Schemas & Superwall Paywall Configuration Blueprints" },
    { iconName: "file-text", text: "10 Power-User Interview Scripts, Experiment Logs & 90-Day App Roadmaps" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: HOW_I_BUILT_400K_IOS_MODULES.map((mod) => ({
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
      name: "Jordan Ellis",
      role: "Mobile App Founder",
      rating: 5,
      quote: "I appreciated how much attention this gives to the product itself, not just the revenue story. The sections on finding a narrow problem, creating a distinctive concept, and studying power users helped me rethink how I approach app ideas. Definitely more useful than another generic startup guide.",
      initials: "J",
      date: "August 04 2026"
    },
    {
      name: "Camila Reyes",
      role: "Growth Product Manager",
      rating: 5,
      quote: "The analytics and experimentation chapters are the highlight for me. I finally have a clearer picture of what to track after launch, how to identify activation problems, and how to turn user behaviour into product improvements. The templates make the process feel manageable.",
      initials: "C",
      date: "August 08 2026"
    },
    {
      name: "Natalie",
      role: "Indie Hacker",
      rating: 5,
      quote: "Really good breakdown of the journey from idea to distribution. I particularly liked the distinction between getting downloads and acquiring users who actually retain and pay. That alone changes how you think about growth. The 90-day roadmap is a great starting point.",
      initials: "N",
      date: "August 14 2026"
    },
    {
      name: "Pierce",
      role: "Software Entrepreneur",
      rating: 5,
      quote: "This is the kind of playbook I'd want before spending months building an app. It covers audience building, MVP scope, subscriptions, acquisition economics, team decisions, and even when to consider going full-time. Practical, structured, and refreshingly honest about what the $400K figure does and doesn't prove.",
      initials: "P",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "Does this playbook guarantee reaching $400K per month with my app?",
      answer: "No. The $400,000 figure is the reported monthly revenue from the case study founder's interview. This playbook deconstructs the methodology, tools, and operational frameworks used to reach that scale—focusing on product distinction, telemetry, power-user retention, and disciplined distribution economics."
    },
    {
      question: "Do I need a large social media following before building an app?",
      answer: "While having a pre-launch audience provides early momentum, it is not an absolute prerequisite. The playbook details how to validate demand, recruit early beta testers through relevant communities, conduct user research, and test creator partnerships even with zero personal followers."
    },
    {
      question: "What is the primary monetization model recommended in this playbook?",
      answer: "Annual subscriptions. Collecting an annual fee ($29.99–$49.99) upfront provides immediate unencumbered cash flow that can be reinvested directly into customer acquisition, whereas monthly plans take months to recoup paid marketing spend."
    },
    {
      question: "What tools are covered in this curriculum?",
      answer: "The playbook covers native iOS development (Swift), backend infrastructure (Supabase), product analytics (Mixpanel, Firebase, PostHog), dynamic paywall management (Superwall), ad attribution (Appstack), and AI coding tools (Claude Code, Codex)."
    }
  ]
};
