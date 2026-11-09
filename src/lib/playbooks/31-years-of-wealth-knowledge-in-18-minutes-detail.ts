import type { PlaybookDetailData } from "../dating-playbook-detail";
import { WEALTH_KNOWLEDGE_31_YEARS_MODULES } from "./31-years-of-wealth-knowledge-in-18-minutes-data";

export const WEALTH_KNOWLEDGE_31_YEARS_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-89",
  slug: "31-years-of-wealth-knowledge-in-18-minutes",
  title: "31 Years of Wealth Knowledge in 18 Minutes",
  headline: "Stop chasing a bigger paycheck and start building real wealth — master the four stages of financial freedom, turn your income into productive assets, and make your money work harder over time.",
  description: "A practical roadmap to building long-term wealth through four essential stages: active income, consistent surplus, productive assets, and passive income. Learn how to increase your earning power, pay your future self first, start investing at a manageable scale, and build income streams that can gradually cover your living expenses. Includes a 90-day implementation plan, Wealth Ladder assessment, monthly money-flow worksheets, asset evaluation checklists, passive-income trackers, and compounding scenarios.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 6.99,
  currency: "USD",
  discountPercentage: 57,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,910",
  instructorName: "Martim Neves",
  instructorTitle: "Financial Systems Architect & Wealth Ladder Strategist",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,910",
  instructorCourses: 2,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996169/31_Years_of_Wealth_Knowledge_in_18_Minutes.png",
  hoursOfMaterial: "11.2 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  accentColor: "#10b981",
  whatYouWillLearn: [
    "Navigate the 4-stage Wealth Ladder from active labor to prefunded passive income",
    "Audit monthly cash flow to eliminate deficits and establish a reliable active surplus",
    "Deploy the future-first equation by automatically routing 20% into investments on payday",
    "Distinguish productive cash-distributing assets from speculative non-yielding instruments",
    "Deploy Tiny Income-Generating Assets (TIGAs) to learn risk mechanics at a manageable scale",
    "Construct compounding yield reinvestment flywheels across dividend equities and REIT funds",
    "Calculate the Passive-Income Coverage Ratio to track real progress toward financial autonomy",
    "Model multi-scenario compounding returns and protect purchasing power against inflation"
  ],
  relatedTopics: [
    "The 4-Stage Wealth Ladder",
    "Productive Income-Generating Assets",
    "Future-First Automated Banking",
    "TIGA Micro-Asset Architecture",
    "Passive-Income Coverage Telemetry",
    "Long-Term Multi-Scenario Compounding"
  ],
  requirements: [
    "A computer or smartphone with internet access",
    "Willingness to review bank statements and calculate monthly baseline expenses honestly",
    "Commitment to establishing automated monthly savings allocations before lifestyle spending",
    "An open, long-term mindset focused on sustainable compounding rather than get-rich-quick speculation"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive operating manual for 31 Years of Wealth Knowledge in 18 Minutes. This playbook condenses decades of hard-won financial insights into a structured, production-grade operating system centered on the Wealth Ladder.",
      "Rather than chasing volatile speculative trends that risk your core survival capital, this curriculum provides the exact step-by-step frameworks, automated banking blueprints, asset evaluation checklists, and compounding models required to progress from active labor to prefunded passive income.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: The Wealth Ladder Architecture & Active Income Foundations",
      "Act 2: Rung Two Engineering: Pay-Your-Future-Self-First Automation",
      "Act 3: Rung Three Mastery: Constructing Productive Asset Portfolios",
      "Act 4: Equity Ownership & The Two Golden Stairways",
      "Act 5: Rung Four Ascension: Prefunded Passive Income Engineering",
      "Act 6: Long-Term Compounding, Inflation & Purchasing Power Defense",
      "Act 7: The 90-Day Wealth Implementation Roadmap & Operational Scorecards"
    ],
    closing: [
      "Whether you are working to eliminate a persistent monthly cash flow deficit or looking to structure an institutional-grade portfolio that prefunds your cost of living, this playbook delivers the exact operational blueprint needed to execute with confidence."
    ]
  },
  targetAudience: [
    "Working professionals who want to translate active salary into durable, productive wealth.",
    "Individuals seeking a clear, stage-by-stage roadmap from earning a surplus to achieving passive income.",
    "Beginner investors who want to master asset evaluation and compounding without overwhelming jargon.",
    "Independent operators and builders seeking lifetime financial sovereignty and work autonomy."
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "The Wealth Ladder Assessment & Automated Banking Blueprints" },
    { iconName: "file-text", text: "Asset Evaluation Checklists, TIGA Trackers & Compounding Worksheets" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: WEALTH_KNOWLEDGE_31_YEARS_MODULES.map((mod) => ({
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
      name: "Marshall",
      role: "Verified Reader",
      rating: 5,
      quote: "The Wealth Ladder is such a useful way to understand where you actually stand financially. Instead of jumping straight into investing, it shows you what needs to happen first and gives you a clear next step.",
      initials: "M",
      date: "August 04 2026"
    },
    {
      name: "Nandakumar",
      role: "Verified Reader",
      rating: 5,
      quote: "I really liked the distinction between earning money, keeping money, and owning things that generate income. The worksheets make the concepts practical, especially the monthly allocation and passive-income trackers.",
      initials: "N",
      date: "August 08 2026"
    },
    {
      name: "Gabriel",
      role: "Verified Reader",
      rating: 5,
      quote: "The section on productive assets was my favourite. It explains dividends, rental income, funds, and business ownership without making everything sound like an easy path to passive income. Very grounded and informative.",
      initials: "G",
      date: "August 14 2026"
    },
    {
      name: "Maya",
      role: "Verified Reader",
      rating: 5,
      quote: "The compounding section completely changed how I think about consistency and time. I also appreciated the 90-day plan because it turns a big financial goal into manageable actions instead of overwhelming you with investment jargon.",
      initials: "M",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "What are the four rungs of the Wealth Ladder?",
      answer: "The Wealth Ladder consists of: 1) Active Income (earning reliably more than expenses), 2) Consistent Surplus (automatically allocating capital before spending), 3) Productive Assets (accumulating holdings that pay contractual cash distributions), and 4) Passive Income (prefunding income streams that cover living expenses)."
    },
    {
      question: "What is a TIGA (Tiny Income-Generating Asset)?",
      answer: "A TIGA is a small-scale, accessible productive asset—such as fractional shares of a dividend-paying ETF or a real estate trust—used as a practical learning laboratory to observe distributions, fees, volatility, and tax treatment before committing substantial capital."
    },
    {
      question: "What is the Passive-Income Coverage Ratio?",
      answer: "The Passive-Income Coverage Ratio is calculated by dividing reliable monthly net passive asset income by monthly baseline living expenses and multiplying by 100. It measures the exact percentage of your lifestyle that is prefunded by capital rather than active labor."
    },
    {
      question: "How do I protect my accumulated investments against inflation?",
      answer: "By calculating real purchasing power returns, investing in productive equities with pricing power, holding real estate assets with inflation-indexed rental potential, and utilizing defensive holdings such as Treasury Inflation-Protected Securities (TIPS)."
    }
  ]
};
