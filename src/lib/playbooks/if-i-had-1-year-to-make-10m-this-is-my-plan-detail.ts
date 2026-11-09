import type { PlaybookDetailData } from "../dating-playbook-detail";
import { YEAR_TO_MAKE_10M_MODULES } from "./if-i-had-1-year-to-make-10m-this-is-my-plan-data";

export const YEAR_TO_MAKE_10M_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-73",
  slug: "if-i-had-1-year-to-make-10m-this-is-my-plan",
  title: "If I Had 1 Year to Make $10M - This Is My Plan",
  headline: "A practical e-commerce blueprint for spotting untapped demand, validating products, launching with focus, and scaling without sacrificing profitability.",
  description: "A promising product can turn into a thriving business, but rapid growth brings challenges that can undo everything. This playbook breaks down the journey from discovering customer demand and testing a product to building a differentiated brand, managing inventory, controlling cash flow, and creating an accountable team. It also examines the costly mistakes behind a major business downturn, giving you a practical 12-month roadmap and actionable templates for making smarter decisions at every stage.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 6.99,
  currency: "USD",
  discountPercentage: 57,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,280",
  instructorName: "Felix Weber",
  instructorTitle: "E-Commerce Founder & Operational Strategist",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,280",
  instructorCourses: 3,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996174/If_I_Had_1_Year_to_Make_10M_-_This_Is_My_Plan.png",
  hoursOfMaterial: "9.6 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Master the 12-month e-commerce scaling roadmap: from organic demand discovery to multi-million-dollar operational governance",
    "Identify untapped consumer demand gaps in public forums and verify functional claims using peer-reviewed scientific research",
    "Source, stress-test, and evaluate manufactured physical samples before committing to large supplier purchase orders",
    "Deploy responsible pre-order validation tests with escrow safeguards and transparent customer dispatch windows",
    "Calculate precise order-level contribution margins, blending ad CAC, freight, parcel delivery, and return allowances",
    "Implement SKU-level inventory control, dynamic reorder points, and three-scenario cash flow forecasting models"
  ],
  relatedTopics: [
    "E-Commerce Scaling",
    "Inventory Management",
    "Cash Conversion Cycle",
    "DTC Unit Economics",
    "Product Launch Validation",
    "Brand Governance"
  ],
  requirements: [
    "A computer or smartphone with internet connection",
    "Interest in launching, managing, or scaling an e-commerce or physical product business",
    "Willingness to track unit economics, contribution margins, and inventory replenishment models",
    "Zero prior venture funding, warehousing leases, or massive upfront capital required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive operational manual for If I Had 1 Year to Make $10M - This Is My Plan. This playbook deconstructs how modern e-commerce founders discover unaddressed consumer demand, validate products through disciplined pre-orders, and build high-margin brands while avoiding the catastrophic pitfalls that destroy high-growth businesses.",
      "Rather than chasing vanity revenue screenshots or burning working capital on unmanaged brand proliferation, this curriculum establishes the exact step-by-step operating architecture required to spot organic market gaps, calculate net order contribution margins, protect inventory positions with dynamic reorder points, and govern multi-million-dollar cash conversion cycles.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: The Commercial Reality & Demand Discovery Architecture",
      "Act 2: Minimal Viable Launch & Responsible Preorder Validation",
      "Act 3: Months 1–6: The Focused Offer & Proving Unit Economics",
      "Act 4: Months 7–12: Operational Systems & Product Flywheel",
      "Act 5: The Three Fatal Mistakes: Autopsy of a Downturn",
      "Act 6: Inventory Engineering & Cash Conversion Cycle",
      "Act 7: The Lean Organization, Weekly Review & Growth Rules"
    ],
    closing: [
      "Every lesson is designed for immediate tactical execution, complete with 24-hour action directives and sovereign battle decision matrices.",
      "Join thousands of modern operators who use these exact frameworks to build lean, authoritative, and profitable e-commerce enterprises."
    ]
  },
  targetAudience: [
    "E-commerce entrepreneurs looking to launch a physical product with verified demand and minimal upfront capital.",
    "Brand founders seeking to scale from $100K to multi-million-dollar revenue without sacrificing net profitability.",
    "DTC operators and marketers who want to install rigorous SKU-level inventory controls and cash conversion safeguards.",
    "Business builders who want to study the real post-mortem of a rapid business downturn to insulate their own operations."
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Dynamic Reorder Point Calculators & ABC Inventory Classification Sheets" },
    { iconName: "file-text", text: "13-Week Cash Flow Forecasts, Product Launch Scorecards & Founder Review SOPs" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: YEAR_TO_MAKE_10M_MODULES.map((mod) => ({
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
      name: "Madison",
      role: "DTC Brand Founder",
      rating: 5,
      quote: "The inventory section was a real eye-opener. I never thought deeply about how much money can get stuck in unsold products while bestsellers run out. The reorder point examples made the concept much easier to understand.",
      initials: "M",
      date: "August 04 2026"
    },
    {
      name: "Carlos",
      role: "E-Commerce Operator",
      rating: 5,
      quote: "I liked that this doesn't just celebrate a million-dollar success story. It actually examines what went wrong afterward. The lessons about focus, hiring too quickly, and launching too many brands are incredibly useful.",
      initials: "C",
      date: "August 08 2026"
    },
    {
      name: "Tanya",
      role: "Product Strategist",
      rating: 5,
      quote: "The product validation process is probably my favourite part. Finding demand, researching suppliers, ordering samples, and testing preorders gives you a much clearer way to approach your first e-commerce product.",
      initials: "T",
      date: "August 14 2026"
    },
    {
      name: "Rohan",
      role: "Digital Merchant",
      rating: 5,
      quote: "Finally, an e-commerce guide that talks about cash flow and contribution instead of just revenue screenshots. The weekly founder review and product launch checklists make this something I can actually use while running a business.",
      initials: "R",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "Does this playbook guarantee reaching $10M in sales within one year?",
      answer: "No. The playbook uses the founder's reported $10M journey and subsequent downturn as a case study to teach rigorous inventory management, unit contribution economics, and focused brand governance."
    },
    {
      question: "What is the difference between gross revenue and net contribution margin?",
      answer: "Gross revenue is top-line sales. Net contribution margin is what remains after deducting product cost, packaging, payment processing, shipping subsidies, returns, and customer acquisition advertising."
    },
    {
      question: "How do dynamic reorder points prevent inventory stockouts?",
      answer: "Dynamic reorder points calculate exact replenishment thresholds using average daily sales, supplier production lead times in days, and safety stock buffers to automate purchase timing."
    },
    {
      question: "What is included with my one-time purchase?",
      answer: "You receive full lifetime digital access to the complete 7-module visual presentation player (112 slides), 28 comprehensive written lesson guides, inventory reorder templates, cash flow models, and all future curriculum updates with zero subscription fees."
    }
  ]
};
