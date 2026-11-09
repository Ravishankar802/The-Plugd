import type { PlaybookDetailData } from "../dating-playbook-detail";
import { GENERATIONAL_WEALTH_MODULES } from "./in-18-minutes-youll-understand-generational-wealth-data";

export const GENERATIONAL_WEALTH_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-96",
  slug: "in-18-minutes-youll-understand-generational-wealth",
  title: "In 18 Minutes, You'll Understand Generational Wealth",
  headline: "Don't just build a fortune — build a system that keeps it alive for generations. Master the nine systems behind preserving family wealth, protecting ownership, preventing disputes, and preparing the next generation to carry it forward.",
  description: "Most fortunes aren't lost because families stop making money — they're lost through poor succession planning, fragmented ownership, family conflicts, and a lack of financial education. This playbook breaks down nine systems used to organise, protect, govern, and preserve wealth across generations.\n\nExplore trusts, holding companies, family constitutions, governance councils, liquidity planning, long-term investing, and next-generation training. Includes practical checklists, family governance frameworks, asset inventories, risk registers, worksheets, and an implementation roadmap — with considerations for applying the principles in India.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,942",
  instructorName: "Akhil Varma",
  instructorTitle: "Family Wealth Strategist & Fiduciary Architect",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,942",
  instructorCourses: 2,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996190/In_18_Minutes_You_ll_Understand_Generational_Wealth.png",
  hoursOfMaterial: "11.2 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  accentColor: "#10b981",
  whatYouWillLearn: [
    "Master the Nine Systems of Generational Wealth: Dynasty trusts, holding entities, family banks, constitutions, councils, transfer rules, 100-year compounding, liquidity ladders, and next-gen training",
    "Avoid the Equal Division Trap by separating economic dividend rights from operational voting authority",
    "Engineer dual-class holding company equity (Class A Voting vs. Class B Non-Voting) to safeguard decision control",
    "Install the 5-layer tiered liquidity ladder to withstand market crashes without forced fire sales",
    "Draft a Family Constitution covering dividend formulas, reinvestment ratios, and employment meritocracy",
    "Enforce Right of First Refusal (ROFR) covenants, book-value formulas, and 10-year promissory note internal buyouts",
    "Translate global fiduciary principles into compliant Indian Private Family Trusts and Family Settlement Agreements",
    "Implement age-staged financial education curricula to cultivate responsible, capable future fiduciaries"
  ],
  relatedTopics: [
    "Generational Wealth Architecture",
    "Dynasty Trusts & Fiduciary Governance",
    "Family Holding Companies",
    "The 5-Layer Liquidity Ladder",
    "Family Constitutions & Councils",
    "Indian Private Trusts & Succession"
  ],
  requirements: [
    "An open, long-term mindset dedicated to multi-generational capital stewardship and family harmony",
    "No prior legal, fiduciary, or corporate governance background required; all nine systems are explained from first principles",
    "A willingness to audit current family asset ownership, evaluate risk vulnerabilities, and formalize written rules"
  ],
  descriptionSections: {
    intro: [
      "Generational wealth is not simply a large amount of money handed from parents to children. It is an operating system that allows productive assets to survive transitions, withstand family conflict, provide liquidity when it is needed, and prepare the next generation to manage what has been built.",
      "Most family fortunes aren't lost because businesses stop generating profits — they are destroyed by lack of governance, premature asset fragmentation, unmanaged estate taxes, and entitled inheritors.",
      "In 18 Minutes, You'll Understand Generational Wealth breaks down nine battle-tested systems used by historical dynasties and elite modern family offices to organize, protect, govern, and preserve wealth across generations."
    ],
    keyPointsTitle: "What Makes The Nine-System Architecture Superior:",
    keyPoints: [
      "Operating System Over Outright Transfer: We separate the economic benefit of family wealth from divisible ownership of every underlying asset.",
      "Institutional Ring-Fencing: Centralize operating companies inside holding layers and perpetual trusts to insulate capital from lawsuits, divorce, and creditors.",
      "The Tiered Liquidity Ladder: Five distinct liquidity layers ensure that estate taxes, debt calls, and buyouts never force an emergency fire sale.",
      "Constitutional Governance: Multi-tier councils (Assembly, Council, Independent Trustees) eliminate subjective disputes and sibling deadlocks.",
      "Domestic & Cross-Border Translation: Actionable guidelines for translating Anglo-American trust structures into compliant Indian Private Trusts and Family Settlement Agreements."
    ],
    closing: [
      "A family that passes down only money gives the next generation an asset that begins to decay the moment it is distributed. A family that passes down money, rules, knowledge, judgment, and responsibility gives the next generation an enduring system."
    ]
  },
  targetAudience: [
    "Founders, business owners, and wealth creators seeking to safeguard their enterprise across multiple generations",
    "Heirs, family enterprise executives, and next-generation leaders preparing to steward shared family assets",
    "Family office executives, trustees, wealth managers, and advisors looking for an institutional governance blueprint",
    "Anyone looking to understand how the world's most enduring family dynasties protect capital across centuries"
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "The Complete Nine Systems Generational Wealth Matrix" },
    { iconName: "file-text", text: "Family Asset Inventories, Risk Registers & Governance Meeting Agendas" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: GENERATIONAL_WEALTH_MODULES.map((mod) => ({
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
      name: "Dominic",
      role: "Verified Reader",
      rating: 5,
      quote: "Such an interesting perspective on wealth. I always thought generational wealth was mostly about accumulating enough money to pass down. This made me realise that ownership structures, governance, and succession planning are just as important. The nine-system framework is excellent.",
      initials: "D",
      date: "August 04 2026"
    },
    {
      name: "Camila",
      role: "Verified Reader",
      rating: 5,
      quote: "The family constitution and governance sections were my favourites. It's easy to imagine how disagreements between heirs can destroy something that took decades to build. The practical examples make these problems feel very real, and the worksheets are genuinely useful.",
      initials: "C",
      date: "August 08 2026"
    },
    {
      name: "Isaiah",
      role: "Verified Reader",
      rating: 5,
      quote: "I appreciated that this goes beyond investing advice. It explains how trusts, holding companies, liquidity, and long-term ownership fit together. The section on preparing the next generation was especially valuable. Wealth without the knowledge to manage it doesn't last.",
      initials: "I",
      date: "August 14 2026"
    },
    {
      name: "Raghavan",
      role: "Verified Reader",
      rating: 5,
      quote: "Very well structured and surprisingly practical for such a complex topic. I particularly liked the India-specific section because it makes clear that you can't simply copy American estate-planning strategies. A great introduction to thinking about wealth beyond your own lifetime.",
      initials: "R",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "What is the primary difference between wealth transfer and wealth preservation?",
      answer: "Wealth transfer is a legal and mechanical act of passing titles and accounts to heirs. Wealth preservation is an operational system that ensures the underlying assets remain undivided, productive, liquid, and governed across generations without being liquidated during family disputes or tax events."
    },
    {
      question: "What are the Nine Systems of Generational Wealth?",
      answer: "The nine systems are: 1) Dynasty Trusts, 2) Holding Companies, 3) Permanent Life Insurance & Family Bank, 4) A Family Constitution, 5) Governance Councils & Committees, 6) Transfer Restrictions, 7) Long-Horizon (100-Year) Investing, 8) Liquidity Reserves & Capital Access, and 9) Next-Generation Training."
    },
    {
      question: "Why does equal ownership among heirs often lead to failure?",
      answer: "Equal voting ownership assumes all heirs have identical goals and capabilities. In practice, active siblings want to reinvest earnings for growth, passive siblings demand immediate cash distributions, and estranged siblings may face divorces or debts. Equal division without governance leads directly to deadlock, litigation, and forced sales."
    },
    {
      question: "How does the Family Bank concept work?",
      answer: "A family structure (such as an Irrevocable Trust) coordinates permanent life insurance cash values and capital reserves. Family members borrow from this governed pool for approved business, real estate, or educational opportunities at defined interest rates, returning principal and yield back into the family vault."
    },
    {
      question: "Can these structures be applied in India?",
      answer: "Yes, but by translating the underlying principles rather than copying US-specific mechanisms. In India, families utilize Private Family Trusts under the Indian Trusts Act, 1882, Family Settlement Agreements (FSAs) favored by Indian courts, formal registered Wills, and customized Articles of Association with pre-emption and ROFR rights under the Companies Act."
    },
    {
      question: "How should parents teach money to rising generations?",
      answer: "Move beyond routine household chores for pocket change. Instead, connect financial education to the child's natural passions through small entrepreneurial projects, teach practical accounting and value creation, and instill character through community philanthropy and gradual boardroom observation."
    }
  ]
};
