import type { PlaybookDetailData } from "../dating-playbook-detail";
import { FIRST_100K_IN_2027_MODULES } from "./if-i-wanted-to-make-my-first-100k-in-2027-id-do-this-data";

export const FIRST_100K_IN_2027_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-88",
  slug: "if-i-wanted-to-make-my-first-100k-in-2027-id-do-this",
  title: "If I Wanted to Make My First $100K in 2027, I’d Do This",
  headline: "Stop chasing revenue screenshots. Build the skills, income, discipline, and financial habits to earn more, spend smarter, and actually keep your first $100K.",
  description: "**Stop chasing revenue screenshots. Build the skills, income, discipline, and financial habits to earn more, spend smarter, and actually keep your first $100K.**\n\nA practical roadmap to building your first $100,000 in savings by combining smarter spending, focused execution, valuable skills, and deliberate income growth. Learn how to identify skills people already pay for, improve through real-world feedback, invest in tools and opportunities without reckless spending, and turn higher earnings into lasting financial progress.\n\nIncludes a 90-day starting plan, a 2027 execution roadmap, skill-selection scorecards, experiment trackers, weekly performance reviews, offer templates, and monthly financial worksheets.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,910",
  instructorName: "Jordan Hayes",
  instructorTitle: "Financial Systems Architect & Operational Capital Strategist",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,910",
  instructorCourses: 2,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1794000202/If_I_Wanted_to_Make_My_First_100K_in_2027_I_d_Do_This.png",
  hoursOfMaterial: "11.2 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  accentColor: "#d97706",
  whatYouWillLearn: [
    "Distinguish between vanity revenue and net retained cash to build true financial independence",
    "Audit housing, food, and transport expenses to create a consistent, predictable monthly surplus",
    "Carve out protected 4-hour daily maker blocks outside your job using the 4-4-4 operating split",
    "Deploy the One-One-One focus rule: one validated offer, one customer avatar, and one channel",
    "Execute deliberate practice feedback loops that turn raw market data into high-value competence",
    "Reinvest capital strategically into bottleneck-removing tools while eliminating technology debt",
    "Freeze baseline living expenses as active income surges to accelerate the $100K savings trajectory",
    "Follow the comprehensive 2027 year-long tactical roadmap to compound savings and retain wealth"
  ],
  relatedTopics: [
    "Personal Capital Accumulation",
    "High-Value Skill Acquisition",
    "The 4-4-4 Operating Split",
    "Lifestyle Inflation Defense",
    "First-Party Data Feedback Loops",
    "Zero-Based Financial Architecture"
  ],
  requirements: [
    "A computer or smartphone with internet access",
    "A commitment to honest financial accounting and reviewing 3 months of bank statements",
    "Willingness to compress non-essential expenses and maintain lifestyle discipline",
    "An open, coachable mindset dedicated to deliberate practice and real-world feedback"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive operating manual for If I Wanted to Make My First $100K in 2027, I’d Do This. This playbook transforms personal wealth building from a vague collection of frugal tips and inflated revenue hype into a structured, production-grade financial operating system.",
      "Rather than chasing short-term revenue spikes that leave you with nothing after taxes and expenses, this curriculum provides the exact step-by-step frameworks, expense compression audits, time blocking methods, skill scorecards, and reinvestment ledgers required to build toward $100,000 in accumulated, unencumbered savings.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: Capital Accumulation Foundations & The Expense Audit",
      "Act 2: Time Reclamation, Attention Defense & Operating Cadence",
      "Act 3: Commercial Skill Selection & Market Demand Validation",
      "Act 4: Iterative Skill Mastery & The First-Party Feedback Loop",
      "Act 5: Strategic Capital Reinvestment & Tool Bottlenecks",
      "Act 6: Active Income Acceleration & Lifestyle Inflation Defense",
      "Act 7: The 2027 Year-Long Execution Roadmap & Operational Toolkits"
    ],
    closing: [
      "Whether you are working a 9-to-5 job looking to carve out your first profitable side venture or a digital operator looking to translate erratic freelance income into permanent financial sovereignty, this playbook delivers the exact operational blueprint needed to execute with confidence."
    ]
  },
  targetAudience: [
    "Individuals committed to building their first $100,000 in genuine savings rather than chasing vanity revenue.",
    "Working professionals who want to reclaim their time and build high-value active income alongside a job.",
    "Freelancers and creators tired of feast-or-famine cycles who want a predictable capital accumulation system.",
    "Independent operators seeking a grounded, mathematically verified roadmap for wealth retention."
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "The 4-4-4 Operating Cadence & One-One-One Focus Blueprints" },
    { iconName: "file-text", text: "Skill Scorecards, Experiment Trackers & 2027 Financial Worksheets" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: FIRST_100K_IN_2027_MODULES.map((mod) => ({
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
      name: "Lucas",
      role: "Verified Reader",
      rating: 5,
      quote: "What I liked most is that this focuses on the money you actually keep, not inflated revenue numbers. The distinction between earning, profit, and savings completely changes how you think about building wealth. Very practical.",
      initials: "L",
      date: "August 04 2026"
    },
    {
      name: "Amara",
      role: "Verified Reader",
      rating: 5,
      quote: "The one-product, one-customer, one-channel framework was exactly what I needed. I tend to jump between ideas, and this gave me a much clearer way to choose a skill, find demand, and focus long enough to improve.",
      initials: "A",
      date: "August 08 2026"
    },
    {
      name: "Vikram",
      role: "Verified Reader",
      rating: 5,
      quote: "Great balance between financial discipline and increasing income. It doesn't just tell you to stop spending money; it explains how to use that extra room to develop skills, test offers, and become more valuable. The worksheets are a nice addition.",
      initials: "V",
      date: "August 14 2026"
    },
    {
      name: "Ramirez",
      role: "Verified Reader",
      rating: 5,
      quote: "The iteration and feedback section stood out to me. Instead of endlessly watching tutorials, you're encouraged to do the work, measure what happens, study your best results, and improve. The entire roadmap feels grounded and actionable.",
      initials: "R",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "Why does this playbook focus on $100,000 saved rather than $100,000 in revenue?",
      answer: "Revenue is a vanity metric that ignores operating expenses, taxes, and cost of goods. A business can make $100,000 in sales and leave its owner broke. In contrast, accumulating $100,000 in unencumbered personal savings creates permanent financial sovereignty, eliminates survival anxiety, and provides years of operational runway."
    },
    {
      question: "What is the One-One-One focus rule?",
      answer: "The One-One-One rule dictates focusing on one clear product or service, one specific customer avatar, and one primary acquisition channel until you achieve consistent, validated revenue. It prevents cognitive fragmentation and shiny object syndrome."
    },
    {
      question: "How do I make time to execute this alongside a full-time 9-to-5 job?",
      answer: "By creating Time Room: protecting an uninterrupted 2 to 4 hour block before or after work (e.g., 5am to 9am or 5pm to 9pm), eliminating passive digital scrolling, and separating focused maker production from administrative communication."
    },
    {
      question: "What is lifestyle inflation and how do I prevent it?",
      answer: "Lifestyle inflation occurs when living expenses expand automatically as earnings rise. You prevent it by freezing your baseline living costs for a defined period, deciding in advance that 70%+ of net incremental income will flow directly into liquid savings and high-leverage skill reinvestment."
    }
  ]
};
