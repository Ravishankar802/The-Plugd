import type { PlaybookDetailData } from "../dating-playbook-detail";
import { ONE_MONEY_PLAYBOOK_MODULES } from "./if-you-only-read-one-money-playbook-make-it-this-data";

export const ONE_MONEY_PLAYBOOK_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-94",
  slug: "if-you-only-read-one-money-playbook-make-it-this",
  title: "If You Only Read One Money Playbook, Make It This",
  headline: "Stop chasing quick money and start thinking like a wealth builder — master the seven laws of money, understand ownership and leverage, and learn to grow your wealth without risking everything you've built.",
  description: "**Stop chasing quick money and start thinking like a wealth builder — master the seven laws of money, understand ownership and leverage, and learn to grow your wealth without risking everything you've built.**\\n\\nMaking money is one thing. Building wealth that lasts is another. This playbook breaks down seven powerful money principles into a practical system for understanding compounding, ownership, cash flow, equity, leverage, asymmetric opportunities, and risk management.\\n\\nLearn how to evaluate investments, understand who controls the money, size your bets intelligently, and protect your financial future. Includes real-world examples, decision frameworks, investment checklists, worksheets, and a practical money operating system.",
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
  instructorTitle: "Capital Allocator & Wealth Systems Strategist",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,910",
  instructorCourses: 3,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996177/If_You_Only_Read_One_Money_Playbook_Make_It_This.png",
  hoursOfMaterial: "11.2 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  accentColor: "#10b981",
  whatYouWillLearn: [
    "Master the Seven Laws of Money and the Three-Pillar Architecture (Momentum, Structure, Asymmetry)",
    "Differentiate high earned income from lasting equity ownership and compound growth",
    "Execute rapid decision speed while maintaining patient, multidecade compounding horizons",
    "Deploy the buyer-builder model to acquire cash-flowing assets and negotiate governance rights",
    "Magnify equity returns with commercial real estate debt while eliminating toxic personal recourse",
    "Balance dual balance sheets: protect operational liquidity while accumulating generational equity",
    "Structure convex asymmetric payoff bets where downside is strictly capped and upside is exponential",
    "Enforce the 5% Empire Preservation Firewall and install the lifetime Money Operating System"
  ],
  relatedTopics: [
    "The Seven Laws of Money",
    "The Three-Pillar Wealth Triad",
    "The Buyer-Builder Model",
    "Asymmetric Leverage & Debt Covenants",
    "Cash Flow vs. Equity Balance Sheets",
    "The 4-Quadrant Risk-Control Matrix"
  ],
  requirements: [
    "A computer or smartphone with internet connectivity",
    "A basic understanding of personal budgeting, saving, and financial goal setting",
    "Willingness to honestly audit your current income, debts, assets, and liabilities",
    "An open mindset focused on long-term capital compounding rather than get-rich-quick speculation"
  ],
  descriptionSections: {
    intro: [
      "Making money is a transactional activity; building wealth that lasts is an architectural discipline. Too many high earners remain trapped on a high-speed hamster wheel—earning voraciously, consuming aggressively, and repeatedly selling their time without ever constructing permanent capital assets.",
      "If You Only Read One Money Playbook, Make It This delivers the definitive, battle-tested doctrine for transitioning from active income earner to institutional wealth builder.",
      "By applying the Seven Laws of Money within the Three-Pillar Architecture—Momentum, Structure, and Asymmetry—operators master the exact principles governing compounding, ownership, leverage, cash flow, convex payoffs, position sizing, and risk control."
    ],
    keyPointsTitle: "What Makes The Seven Laws System Essential:",
    keyPoints: [
      "The Three-Pillar Triad: Master Momentum (compounding time), Structure (ownership and governance), and Asymmetry (convex risk-reward).",
      "The Speed/Time Paradox: Learn to make investment decisions with rapid velocity while holding compounding assets across multidecade horizons.",
      "The Buyer-Builder Paradigm: Transition from an active wage-earner to a capital allocator who acquires, improves, and retains productive assets.",
      "Prudent Leverage Architecture: Multiply equity returns using asset-backed, non-recourse debt while eliminating toxic personal guarantees.",
      "The Empire Preservation Rule: Enforce mathematically governed position-sizing firewalls so no single investment failure can threaten your financial fortress."
    ],
    closing: [
      "Whether you are structuring your first commercial real estate acquisition, rebalancing an investment portfolio, or building an enduring business flywheel, this playbook provides the timeless operating system required to build, compound, and permanently protect your wealth."
    ]
  },
  targetAudience: [
    "Entrepreneurs and operators looking to transition from active business cash flow to permanent wealth",
    "High-earning professionals seeking to escape the earned income trap and build asset equity",
    "Real estate and private equity investors looking to refine position sizing and leverage management",
    "Builders who want a battle-tested money operating system to protect their financial future"
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "The Complete Seven Laws Framework & Three-Pillar Wealth Models" },
    { iconName: "file-text", text: "Dual-Balance Sheet Worksheets, Risk-Control Grids & Deal Checklists" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: ONE_MONEY_PLAYBOOK_MODULES.map((mod) => ({
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
      isPreview: false,
    })),
  })),
  testimonials: [
    {
      name: "Julia",
      role: "Verified Reader",
      rating: 5,
      quote: "One of the clearest explanations of wealth-building I've come across. The distinction between earning money and actually owning assets really changed how I look at financial decisions. The seven laws tie everything together beautifully.",
      initials: "J",
      date: "August 04 2026"
    },
    {
      name: "Enes",
      role: "Verified Reader",
      rating: 5,
      quote: "I especially liked the sections on leverage and position sizing. People talk endlessly about making bigger returns, but rarely explain how to avoid losing everything along the way. This playbook does a great job balancing ambition with financial discipline.",
      initials: "E",
      date: "August 08 2026"
    },
    {
      name: "Mark",
      role: "Verified Reader",
      rating: 5,
      quote: "The five-question investment framework alone makes this worth reading. I now have a much better way to evaluate opportunities instead of getting distracted by impressive returns or exciting promises. Practical, insightful, and easy to revisit.",
      initials: "M",
      date: "August 14 2026"
    },
    {
      name: "Krishnamurthy",
      role: "Verified Reader",
      rating: 5,
      quote: "What stood out to me was the connection between cash flow, equity, ownership, and control. It goes beyond basic saving and investing advice and gets into how wealth actually gets built and protected. The worksheets make the concepts much easier to apply.",
      initials: "K",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "What are the Seven Laws of Money?",
      answer: "The Seven Laws are: 1) Money loves speed, but wealth loves time; 2) He who gives the money has the power; 3) Leverage multiplies everything; 4) Cash flow keeps you alive, equity makes you free; 5) Risk and reward are nonlinear; 6) Don't bet the empire for a pot of gold; and 7) Diversification is a hedge against ignorance."
    },
    {
      question: "How do Momentum, Structure, and Asymmetry work together?",
      answer: "Momentum ensures capital compounds over time; Structure ensures you control the equity, governance, and financial waterfall; and Asymmetry ensures that your potential gains are convex while your downside is strictly capped so no failure can destroy your empire."
    },
    {
      question: "What is the difference between earned income and equity?",
      answer: "Earned income compensates you once for active labor and is subject to immediate high taxation. Equity represents residual ownership in a productive business or asset that compounds asynchronously and generates passive distributions."
    },
    {
      question: "Why does the playbook advise against flipping assets?",
      answer: "Flipping assets generates transaction cash but incurs severe closing fees, broker commissions, and short-term capital gains taxes, while resetting the compounding clock. Long-term holding allows assets to compound continuously without tax drag."
    },
    {
      question: "What is the 5% Empire Preservation Firewall?",
      answer: "It is an ironclad position-sizing rule that prohibits allocating more than 5% of net liquid capital to any single speculative or illiquid bet, ensuring that complete failure of any one opportunity has zero impact on core financial survival."
    },
    {
      question: "What are the five pre-investment governance questions?",
      answer: "Before deploying capital, ask: 1) Can this compound? 2) Who has control? 3) What happens if it fails? 4) Is the upside meaningful and nonlinear? and 5) Do I understand the risks in plain English?"
    }
  ]
};
