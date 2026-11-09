import type { PlaybookDetailData } from "../dating-playbook-detail";
import { ZERO_TO_100K_PLAN_MODULES } from "./if-i-started-with-0-heres-my-exact-plan-to-100k-data";

export const ZERO_TO_100K_PLAN_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-90",
  slug: "if-i-started-with-0-heres-my-exact-plan-to-100k",
  title: "If I Started With $0, Here's My Exact Plan To $100K",
  headline: "Starting from $0? Build your first $100K with an eight-step system to cut financial dead weight, increase your income, launch a second income stream, and turn what you earn into lasting wealth.",
  description: "Forget get-rich-quick schemes. This playbook breaks the journey to your first $100K into eight practical steps, from reducing major expenses and reclaiming productive time to negotiating a better salary, finding your profit zone, and building a second income stream. Includes a 12-month execution roadmap, side-hustle validation frameworks, salary negotiation templates, investment planning worksheets, weekly scorecards, and a $100K milestone tracker.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 6.99,
  currency: "USD",
  discountPercentage: 57,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,910",
  instructorName: "Shawn Lim",
  instructorTitle: "Zero-Capital Strategist & Main-Job Income Optimization Architect",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,910",
  instructorCourses: 2,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996175/If_I_Started_With_0_Here_s_My_Exact_Plan_To_100K.png",
  hoursOfMaterial: "11.2 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  accentColor: "#06b6d4",
  whatYouWillLearn: [
    "Dismantle passive content consumption and install high-friction digital focus systems",
    "Compress the big three structural expenses (housing, transport, nutrition) to unlock massive monthly surplus",
    "Deploy the 4-4 time reclamation framework: 4 morning deep-work hours and 4 evening execution hours",
    "Negotiate 15% to 30% salary increases using the quantifiable Accomplishment Dossier framework",
    "Validate and launch a $2,000/month second income stream in your 3-circle profit zone within 48 hours",
    "Automate future-first S&P 500 index compounding pipelines that operate without willpower",
    "Install the lifestyle inflation firewall to ensure 50%+ of all new income permanently expands wealth",
    "Track and conquer the $100K tipping point where portfolio returns begin matching manual labor contributions"
  ],
  relatedTopics: [
    "Zero-Capital Financial Operating System",
    "The 4-4 Time Reclamation Architecture",
    "Profit Zone Side Income Validation",
    "Main-Job Salary Optimization & Accomplishment Dossier",
    "S&P 500 Automated Index Compounding",
    "Lifestyle Inflation Firewalls & $100K Milestone Telemetry"
  ],
  requirements: [
    "A computer or smartphone with internet connectivity",
    "Willingness to conduct an honest forensic audit of bank statements and time allocation",
    "Commitment to establishing automated monthly savings allocations before lifestyle spending",
    "An open, multi-year operating perspective focused on sustainable execution rather than get-rich-quick speculation"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive operating manual for If I Started With $0, Here's My Exact Plan To $100K. This playbook provides a structured, eight-step operating system designed to take you from zero capital to the first $100,000 critical mass milestone.",
      "Rather than relying on volatile business models, high-risk trading, or unrealistic lifestyle sacrifices, this curriculum integrates behavioral focus, expense compression, time management, salary maximization, side-income validation, and automated index compounding into a cohesive, repeatable machine.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: Foundations of Zero-Capital Building & Distraction Elimination",
      "Act 2: The 80/20 Expense Compression Protocol (Housing, Transport & Food)",
      "Act 3: The 4-4 Time Reclamation Architecture (Morning Deep Work & Evening Execution)",
      "Act 4: Main-Job Income Optimization & Salary Negotiation Ledgers",
      "Act 5: The Profit Zone Blueprint & Second Income Stream Validation",
      "Act 6: Systematic Long-Term Investing & S&P 500 Compounding Mechanics",
      "Act 7: Lifestyle Inflation Defense & The $100K Critical Mass Roadmap"
    ],
    closing: [
      "Whether you are starting from a standing start with zero savings or looking to break through financial stagnation, this playbook delivers the exact operational blueprint needed to execute with confidence and build your first $100K."
    ]
  },
  targetAudience: [
    "Working professionals who want to translate their primary salary into durable, compounding wealth.",
    "Individuals seeking a structured 8-step roadmap to eliminate financial dead weight and reach $100K.",
    "Aspiring side-hustlers who want to validate service offers within their profit zone without ad spend.",
    "Builders and operators committed to mastering the discipline, habits, and systems of long-term financial sovereignty."
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "The $100K Execution Roadmap & Accomplishment Dossier Framework" },
    { iconName: "file-text", text: "Profit Zone Scorecards, Salary Scripts & Investment Allocators" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: ZERO_TO_100K_PLAN_MODULES.map((mod) => ({
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
      name: "Camila",
      role: "Verified Reader",
      rating: 5,
      quote: "What I liked most is that it doesn't immediately tell you to start investing or launch some random business. It starts with fixing your financial foundation and increasing your earning power. The eight-step structure makes the whole process feel much more achievable.",
      initials: "C",
      date: "August 04 2026"
    },
    {
      name: "Ankita",
      role: "Verified Reader",
      rating: 5,
      quote: "The profit zone concept is genuinely useful. Connecting what you're good at, what you enjoy, and what people actually pay for is a much better way to approach side hustles than blindly following trends. The validation exercises are especially helpful.",
      initials: "A",
      date: "August 08 2026"
    },
    {
      name: "Joel",
      role: "Verified Reader",
      rating: 5,
      quote: "The sections on salary negotiation and lifestyle inflation stood out to me. People spend so much time looking for extra income that they forget to improve their existing income or keep the money they already make. Very practical advice.",
      initials: "J",
      date: "August 14 2026"
    },
    {
      name: "Julia",
      role: "Verified Reader",
      rating: 5,
      quote: "I love how actionable this is. The 12-month roadmap, weekly scorecard, and investment tracker make it easier to turn the ideas into an actual routine. It also does a good job explaining that $100K is a milestone to work toward, not an overnight promise.",
      initials: "J",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "Why does the plan begin with eliminating distractions and cutting expenses rather than investing?",
      answer: "Investing requires capital. If your attention is scattered and your income is entirely consumed by living costs, no investment strategy will help. The framework first creates the cash flow surplus and protected time that make sustained investing possible."
    },
    {
      question: "How does the 4-4 time framework work for people with full-time jobs?",
      answer: "The 4-4 framework organizes your waking hours outside work into two high-leverage blocks: up to 4 morning hours before work for high-cognition strategic deep work, and up to 4 evening hours for active client outreach and business delivery, reclaiming up to 35 hours weekly."
    },
    {
      question: "What is the Profit Zone and how does it prevent burnout?",
      answer: "The Profit Zone is the critical intersection of three factors: skills you possess, activities you enjoy doing, and services the market actively pays for. Operating here ensures you have the technical competence to deliver results, the enthusiasm to sustain execution, and verified commercial demand."
    },
    {
      question: "Can I reach $100K if I don't want to start a side business?",
      answer: "Yes. While a profit-zone side business accelerates your timeline, maximizing your main career through strategic salary negotiation combined with compressing major expenses and automated index investing will reliably achieve the $100K milestone over a longer horizon."
    },
    {
      question: "Why focus primarily on low-cost S&P 500 index funds?",
      answer: "Low-cost broad-market index funds capture the long-term compounding of leading corporate earnings without the catastrophic downside risk of individual stock picking, crypto speculation, or high management fee drag. It is mathematically the most reliable compounding vehicle for individual builders."
    },
    {
      question: "What happens after reaching the first $100,000?",
      answer: "Reaching $100K is the mathematical tipping point. At this stage, annual portfolio returns begin matching several months of living expenses, allowing you to gradually transition from high-intensity active labor to capital self-sufficiency, equity ownership, and complete time freedom."
    }
  ]
};
