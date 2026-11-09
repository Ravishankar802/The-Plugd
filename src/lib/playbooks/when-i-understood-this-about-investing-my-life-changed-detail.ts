import type { PlaybookDetailData } from "../dating-playbook-detail";
import { WHEN_I_UNDERSTOOD_THIS_ABOUT_INVESTING_MODULES } from "./when-i-understood-this-about-investing-my-life-changed-data";

export const WHEN_I_UNDERSTOOD_THIS_ABOUT_INVESTING_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-99",
  slug: "when-i-understood-this-about-investing-my-life-changed",
  title: "When I Understood This About Investing. My Life Changed.",
  headline: "Stop guessing with your money. Learn the investment framework that helps you spot better opportunities, understand what you actually own, protect your downside, and make smarter decisions for long-term wealth.",
  description: "Forget chasing trending stocks, predicting market crashes, or blindly trusting impressive return promises. This playbook gives you a repeatable system for evaluating investments through compounding, after-tax returns, capital-stack analysis, and the Four Goods: good people, good intentions, good rationale, and good contracts.\n\nIncludes a 100-point investment scorecard, due-diligence checklists, investment comparison matrices, practical worksheets, and a complete decision-making workflow to help you invest with greater clarity and discipline.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 1,
  originalPrice: 2.49,
  currency: "USD",
  discountPercentage: 60,

  rating: 4.9,
  ratingCount: "5.0k",
  studentsCount: "5,120",
  instructorName: "Akhil Varma",
  instructorTitle: "Fiduciary Strategist & Systematic Capital Allocator",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "5.0k",
  instructorStudents: "5,120",
  instructorCourses: 3,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996186/When_I_Understood_This_About_Investing._My_Life_Changed..png",
  hoursOfMaterial: "11.2 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  accentColor: "#10b981",
  whatYouWillLearn: [
    "The 8-step repeatable investment decision sequence to replace guesswork and emotional FOMO with systematic rigor",
    "The mathematics of unbroken time and compounding: why remaining invested consistently beats market timing",
    "Calculating retained after-friction yield: accounting for taxes, platform charges, expense ratios, and inflation drag",
    "Deconstructing the capital stack: senior secured debt, mezzanine credit, preferred equity, and residual common shares",
    "Insolvency waterfall mechanics and why owning debt does not automatically guarantee safety in financial distress",
    "The Four Goods due diligence engine: vetting good people, good intentions, good rationale, and good contracts in sequence",
    "Scoring opportunities across the 100-point scorecard: Capital Preservation, Tax Efficiency, Cash Flow, and Growth",
    "Translating investment principles into local statutory and regulatory frameworks (including Indian SEBI/MCA equivalents)"
  ],
  relatedTopics: [
    "Systematic Capital Allocation",
    "Capital Stack & Debt Seniority",
    "The Four Goods Due Diligence",
    "100-Point Investment Scorecards",
    "Friction & Retained After-Tax Yield",
    "Insolvency Waterfalls & Downside Risk"
  ],
  requirements: [
    "A computer or smartphone with reliable internet access",
    "A commitment to evaluating investments systematically rather than reacting to emotional market headlines",
    "Basic familiarity with financial concepts (returns, interest, equity)",
    "Willingness to apply mathematical worksheets, Due Diligence scripts, and 100-point scorecards"
  ],
  descriptionSections: {
    intro: [
      "Stop guessing with your money. Learn the investment framework that helps you spot better opportunities, understand what you actually own, protect your downside, and make smarter decisions for long-term wealth.",
      "When I Understood This About Investing. My Life Changed. is an institutional-grade educational framework designed to deconstruct capital allocation into repeatable, verifiable steps. Rather than attempting to predict market tops or bottoms, it establishes a deterministic decision system covering time as a partner, friction-adjusted retained returns, and capital stack seniority.",
      "From the chronological Four Goods due diligence engine (People, Intentions, Rationale, Contracts) to the 100-point diagnostic scorecard and Indian regulatory translations (SEBI, MCA ROC charges, and capital gains tax slabs), this playbook delivers the exact operational blueprint required to allocate capital with clarity, confidence, and downside protection."
    ],
    keyPointsTitle: "What Makes This Investment System Superior:",
    keyPoints: [
      "Structural Priority Clarity: Understand your exact legal claim in the capital stack—never confuse subordinated debt with secured protection.",
      "Chronological Four Goods Engine: Audit counterparty integrity and incentives before examining spreadsheet forecasts or drafting legal documents.",
      "The 100-Point Objective Scorecard: Compare public equities, private syndications, credit instruments, and cash with unified mathematical rigor.",
      "Friction-Adjusted Reality: Stop fixating on gross returns; measure the net after-tax, after-fee purchasing power that compounds over decades.",
      "Institutional Downside Focus: Learn why protecting your downside and avoiding permanent capital wipeouts is the ultimate driver of generational freedom."
    ],
    closing: [
      "True financial independence is not built on speculative gambles or emotional market timing. It is the steady accumulation of productive assets protected by sound legal structures and disciplined decision systems.",
      "Enroll today to master the Four Goods, map your capital stack, and execute the repeatable investment workflow that transforms capital allocation from an anxious guessing game into an enduring fiduciary practice."
    ]
  },
  targetAudience: [
    "Individual investors, family trustees, and operators seeking a deterministic capital allocation system",
    "Allocators tired of speculative market noise who want to understand the legal mechanics of what they own",
    "Entrepreneurs and professionals evaluating private equity deals, debt syndications, or venture convertible notes",
    "Anyone committed to protecting their downside and building multi-generational wealth through unbroken compounding"
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Masterclasses" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Lessons" },
    { iconName: "video", text: "The Four Goods Due Diligence Engine & Capital Stack Insolvency Waterfall" },
    { iconName: "file-text", text: "The 100-Point Diagnostic Scorecard & 1-Page Investment Memo Worksheets" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: WHEN_I_UNDERSTOOD_THIS_ABOUT_INVESTING_MODULES.map((mod) => ({
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
      name: "Suman",
      role: "Verified Reader",
      rating: 5,
      quote: "This completely changed how I approach investment opportunities. The Four Goods framework is particularly valuable because it forces you to look beyond attractive numbers and examine the people and incentives behind a deal. Definitely something I'll keep coming back to.",
      initials: "S",
      date: "August 04 2026"
    },
    {
      name: "Himanshu",
      role: "Verified Reader",
      rating: 5,
      quote: "The capital stack explanation was an eye-opener. I never really understood how different investors could have completely different levels of protection in the same company. The examples and checklists make a complicated subject much easier to understand.",
      initials: "H",
      date: "August 08 2026"
    },
    {
      name: "Shreya",
      role: "Verified Reader",
      rating: 5,
      quote: "I love how practical this is. Instead of telling you which stocks to buy, it teaches you how to evaluate opportunities yourself. The 100-point scorecard is a great way to organise your thinking and compare investments without getting caught up in hype.",
      initials: "S",
      date: "August 14 2026"
    },
    {
      name: "Ranjan",
      role: "Verified Reader",
      rating: 5,
      quote: "One of the best things about this playbook is how it connects everything: compounding, taxes, fees, risk, due diligence, and your actual responsibility as an investor. It feels like a proper decision-making system rather than another collection of generic investing tips.",
      initials: "R",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "Why does this playbook emphasize a repeatable decision system over stock picking?",
      answer: "Markets fluctuate constantly, and individual asset predictions fail over time. A repeatable decision system forces you to ask identical, rigorous questions regarding commercial reality, capital stack ranking, counterparty integrity, and friction drag, eliminating emotional bias and protecting your downside."
    },
    {
      question: "What is the capital stack and why is it so vital?",
      answer: "The capital stack is the legal hierarchy of financial claims that finance a business or asset. In financial distress or bankruptcy, capital is returned strictly by priority: Senior Secured Debt first, Mezzanine Debt second, Preferred Equity third, and Common Equity last. Knowing where your instrument sits reveals your true downside risk."
    },
    {
      question: "What are the Four Goods and why must they be evaluated in order?",
      answer: "The Four Goods are Good People, Good Intentions, Good Rationale, and Good Contracts. They must be evaluated in strict chronological order because a brilliant contract or spreadsheet model cannot protect you from a dishonest counterparty or misaligned incentives."
    },
    {
      question: "How does the 100-point investment scorecard work?",
      answer: "The scorecard allocates up to 25 points across four essential pillars: Capital Preservation, Tax Efficiency, Cash Flow, and Structural Growth. Every score must be justified with documented evidence. An investment with an aggregate score below 65 or scoring under 5 points in any single pillar is rejected."
    },
    {
      question: "How are the principles translated for Indian investors?",
      answer: "The playbook maps US concepts into Indian statutory and regulatory equivalents: replacing US 401(k)/IRAs with PPF, EPF, NPS, and ELSS; checking ROC charge filings on the Ministry of Corporate Affairs (MCA) portal; and calculating post-tax retained returns under Indian capital gains slabs and STT provisions."
    },
    {
      question: "What is the recommended position sizing guardrail?",
      answer: "To prevent catastrophic drawdown, the playbook mandates capping any single concentrated equity position, illiquid private debt instrument, or real estate syndication at 5% to 10% of your total investable liquid net worth."
    }
  ]
};
