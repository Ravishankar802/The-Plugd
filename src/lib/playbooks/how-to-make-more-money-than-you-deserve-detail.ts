import type { PlaybookDetailData } from "../dating-playbook-detail";
import { HOW_TO_MAKE_MORE_MONEY_THAN_YOU_DESERVE_MODULES } from "./how-to-make-more-money-than-you-deserve-data";

export const HOW_TO_MAKE_MORE_MONEY_THAN_YOU_DESERVE_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-107",
  slug: "how-to-make-more-money-than-you-deserve-my-2027-framework",
  title: "How To Make More Money Than You Deserve (My 2027 Framework)",
  headline: "Stop working harder on businesses with limited upside. Learn how to spot the business models, market gaps, and competitive advantages that can make your effort worth significantly more.",
  description: "**Stop working harder on businesses with limited upside. Learn how to spot the business models, market gaps, and competitive advantages that can make your effort worth significantly more.**\n\nExplore five business categories, from accessible cash-flow opportunities and expert-led businesses to defensible enterprises and overlooked markets with favourable supply-demand economics. Learn how to evaluate business ideas through margins, scalability, recurring demand, competitive moats, and founder independence. Includes practical scorecards, decision-making worksheets, and a 30-day sprint to identify and validate your next business opportunity.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "4.8k",
  studentsCount: "4,820",
  instructorName: "Martim Neves",
  instructorTitle: "Capital Allocator & Private Equity Operator",
  instructorBio: "Martim Neves is an entrepreneur, investor, and business architect specializing in enterprise valuation, vehicle selection, and defensible unit economics.",
  instructorRating: 4.9,
  instructorReviews: "4.8k",
  instructorStudents: "4,820",
  instructorCourses: 3,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "9.8 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Classify candidate businesses across the 5 categories by operational difficulty and financial upside",
    "Identify and avoid the operational drag spiral that turns commodity service growth into a personal prison",
    "Transform high-earning expert judgement into an institutional asset that operates without the founder",
    "Engineer structural enterprise moats across technical IP, capital intensity, and statutory regulation",
    "Identify asymmetric supply-demand arbitrage windows created by demographic and statutory shifts",
    "Calculate forensic unit economics: true contribution margin, blended CAC payback, and churn sensitivity",
    "Score business opportunities objectively using the 12-factor quantitative evaluation matrix",
    "Execute a disciplined 30-day market validation sprint to test paid customer demand before risking capital"
  ],
  relatedTopics: [
    "Business Model Architecture",
    "Enterprise Valuation",
    "Unit Economics Forensics",
    "Competitive Moats",
    "Founder Independence",
    "Capital Allocation"
  ],
  requirements: [
    "A computer, tablet, or smartphone with internet access and a modern web browser",
    "Willingness to evaluate business opportunities with cold financial rigor rather than emotional enthusiasm",
    "Zero prior corporate finance, coding, or private equity background required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the masterclass on How To Make More Money Than You Deserve (My 2027 Framework). This playbook provides a comprehensive, unvarnished decision-making architecture for choosing businesses with superior economics.",
      "Most entrepreneurial advice pushes founders to work longer, learn more skills, or develop extreme discipline inside vehicles with structurally low ceilings. In this playbook, we demonstrate why effort is multiplied—or constrained—by the economics of your chosen business vehicle, and how to identify markets where a single unit of competent execution yields outsized enterprise returns.",
      "Every single lesson provides both a visual slide presentation and an in-depth written guide detailing operational diagnostic matrices, financial forensic formulas, customer discovery interview scripts, and a complete 30-day validation sprint."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: The Vehicle Multiplier & The Five Business Categories",
      "Act 2: High-Value Practices & The Founder-Independence Problem",
      "Act 3: Moat-Built Enterprises & Long-Compounding Barriers",
      "Act 4: Category Five: Supply-Constrained & Arbitrage Windows",
      "Act 5: Financial Forensics: Unit Economics & True Enterprise Value",
      "Act 6: The 2027 Opportunity Selection System",
      "Act 7: The 30-Day Market Validation Sprint & Decision Protocols"
    ],
    closing: [
      "Every lesson is designed for immediate real-world execution, complete with actionable battle exercises, diagnostic worksheets, and tactical scripts.",
      "Join thousands of digital builders worldwide who deploy these exact frameworks to validate demand, protect advertising capital, and build sovereign cashflow."
    ]
  },
  targetAudience: [
    "Entrepreneurs and operators tired of grinding in low-margin, high-friction commodity businesses",
    "Service professionals seeking to transition from personal income practices into transferable enterprise assets",
    "Investors and search fund operators evaluating small business acquisitions and platform roll-ups",
    "Anyone looking for a structured, evidence-based methodology to choose their next business venture"
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Cinematic Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Ready-to-Deploy 12-Factor Opportunity Scorecards & Discovery Interview Scripts" },
    { iconName: "file-text", text: "Interactive Unit Margin Spreadsheets & Founder-Independence Audits" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: HOW_TO_MAKE_MORE_MONEY_THAN_YOU_DESERVE_MODULES.map((mod) => ({
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
      name: "Oliver",
      role: "Verified Reader",
      rating: 5,
      quote: "An excellent framework for thinking beyond the usual startup advice. The distinction between building a high-income business and building an actual asset was particularly eye-opening. I've started evaluating opportunities very differently.",
      initials: "O",
      date: "August 04 2026"
    },
    {
      name: "Chloe",
      role: "Verified Reader",
      rating: 5,
      quote: "I appreciated how this breaks down business economics without making everything sound like a get-rich-quick scheme. The sections on competitive moats and supply-demand gaps are especially valuable. Definitely worth working through.",
      initials: "C",
      date: "August 08 2026"
    },
    {
      name: "Lucas",
      role: "Verified Reader",
      rating: 5,
      quote: "What stood out to me was the idea of choosing the right vehicle before committing years of effort. The scorecards and worksheets make the concepts practical rather than just theoretical. A genuinely useful business resource.",
      initials: "L",
      date: "August 14 2026"
    },
    {
      name: "Amelia",
      role: "Verified Reader",
      rating: 5,
      quote: "This made me reconsider several business ideas I had been excited about. I especially liked the discussion around founder dependence, recurring revenue, and what makes a company transferable. Clear, structured, and full of useful questions to ask before taking the leap.",
      initials: "A",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "What does 'make more money than you deserve' actually mean?",
      answer: "The phrase is deliberately provocative. It does not promise money without hard work. Rather, it emphasizes that working in a business with superior economic tailwinds, recurring demand, and pricing power produces 10x–100x more financial return per hour of competent labor than grinding in a hyper-competitive, low-margin commodity market."
    },
    {
      question: "Do I need substantial investment capital to apply this framework?",
      answer: "No. The playbook examines all five business categories—ranging from accessible starter cash-flow businesses requiring minimal capital to high-barrier enterprise assets. It provides a clear 7-step progression for building capital in starter models before transitioning into defensible assets."
    },
    {
      question: "What is included with my one-time purchase?",
      answer: "You receive lifetime digital access to all 7 modules (112 visual presentation slides, 28 comprehensive written lessons), the 12-factor opportunity evaluation scorecard, the founder-independence audit matrix, and the complete 30-day opportunity selection sprint roadmap."
    },
    {
      question: "Can I access this on mobile and tablet devices?",
      answer: "Yes, both the slide presentation player and the written article reader are fully responsive and optimized for seamless viewing across smartphones, tablets, and desktop displays."
    }
  ]
};
