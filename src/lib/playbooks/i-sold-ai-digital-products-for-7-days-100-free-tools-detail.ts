import type { PlaybookDetailData } from "../dating-playbook-detail";
import { I_SOLD_AI_DIGITAL_PRODUCTS_MODULES } from "./i-sold-ai-digital-products-for-7-days-100-free-tools-data";

export const I_SOLD_AI_DIGITAL_PRODUCTS_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-98",
  slug: "i-sold-ai-digital-products-for-7-days-100-free-tools",
  title: "I Sold AI Digital Products For 7 Days (100% FREE Tools)",
  headline: "Stop guessing what people will buy. Find real problems, create digital products with AI, and turn them into sellable downloads — starting with free tools.",
  description: "**Stop guessing what people will buy. Find real problems, create digital products with AI, and turn them into sellable downloads — starting with free tools.**\n\nLearn how to research profitable product ideas, study competitors, and build digital products for both Indian and US buyers using AI-assisted workflows. From a ₹99 hostel survival guide to an iPad-friendly digital planner, this playbook covers product creation, storefront setup, Instagram and Pinterest marketing, paid ads, and the numbers that actually determine profit. Includes a seven-day execution plan, practical AI prompts, validation scorecards, and revenue trackers.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,952",
  instructorName: "Pooja Patil",
  instructorTitle: "Digital Product Architect & Growth Strategist",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,952",
  instructorCourses: 2,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793023911/I_Sold_AI_Digital_Products_For_7_Days_100_FREE_Tools.png",
  hoursOfMaterial: "11.2 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  accentColor: "#14b8a6",
  whatYouWillLearn: [
    "The Dual-Market Strategy: Creating targeted ₹99 UPI products for India and $12.99 tablet planners for the US",
    "Mining competitor 1-to-3 star customer reviews to identify verified usability flaws and missing product features",
    "Structuring and fact-checking a 40-page constraint-based student guide categorized by cooking appliance",
    "Designing landscape iPad-friendly digital planners with 300+ tested clickable tabs for GoodNotes and tablet apps",
    "Setting up frictionless storefronts: Topmate with instant UPI payments and Gumroad with global credit card processing",
    "Scripting 5-beat problem Reels for Instagram and creating high-converting aesthetic Pinterest pins",
    "Calculating break-even advertising mathematics and customer acquisition costs (CAC) to ensure positive unit margins",
    "Executing the structured 7-day launch sprint and auditing true net profit after ad spend and platform fees"
  ],
  relatedTopics: [
    "AI Digital Product Engineering",
    "Dual-Market Digital Publishing",
    "Competitor Review Gap Mining",
    "Topmate UPI & Gumroad Storefronts",
    "GoodNotes & Tablet Hyperlink Planners",
    "Unit Economics & Break-Even CAC"
  ],
  requirements: [
    "A computer or smartphone with reliable internet access",
    "Free accounts on Claude, Canva, Topmate, and Gumroad",
    "No prior graphic design, coding, or paid advertising experience required",
    "A commitment to fact-checking AI outputs, testing hyperlinks, and tracking true net profit"
  ],
  descriptionSections: {
    intro: [
      "Stop guessing what people will buy. Find real problems, create digital products with AI, and turn them into sellable downloads — starting with free tools.",
      "I Sold AI Digital Products For 7 Days (100% FREE Tools) documents a comprehensive real-world experiment testing two distinct products across two different markets: a ₹99 Hostel & PG Survival Guide in India and an iPad-friendly ADHD Daily Flow Planner ($12.99) in the United States.",
      "From competitor-gap research and fact-checked recipe drafting to clickable PDF hyperlink engineering, storefront setup, and break-even advertising mathematics, this playbook provides the exact operational blueprint required to launch and sell digital products sustainably."
    ],
    keyPointsTitle: "What Makes This Digital Product System Superior:",
    keyPoints: [
      "Competitor-Gap Driven: We do not guess product features; we mine 1-to-3 star customer reviews on existing bestsellers to fix the exact flaws buyers complain about.",
      "Dual-Market Diversification: Test localized Indian UPI impulse buys (₹99) alongside high-margin US dollar digital downloads ($12.99).",
      "Rigorous Quality Assurance: Learn how to fact-check AI recipes and stress-test 300+ clickable tabs on real tablet annotation apps before listing.",
      "Frictionless Payment Flows: Integrate Topmate UPI for instant mobile sales in India and Gumroad for automated global digital delivery.",
      "Honest Unit Economics: Learn the exact formulas to calculate break-even CAC, deduct payment gateway fees, and verify true net cash profit."
    ],
    closing: [
      "Whether you are looking to launch your first digital download from India or scale a multi-product global publishing portfolio, this playbook delivers the exact operational framework needed to turn AI tools into an enduring creator business."
    ]
  },
  targetAudience: [
    "Creators, solopreneurs, and side-hustlers looking to build digital products with free AI tools",
    "Aspiring publishers seeking to validate real customer demand before spending months creating products",
    "E-commerce entrepreneurs looking to tap into both the Indian UPI market and Western digital storefronts",
    "Anyone looking for a practical, hype-free guide to digital product creation, quality control, and unit economics"
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Masterclasses" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "The Complete Dual-Market Strategy (India ₹99 Guide + US $12.99 Planner)" },
    { iconName: "file-text", text: "Competitor Mining Templates, Prompt Libraries & 7-Day Sprint Worksheets" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: I_SOLD_AI_DIGITAL_PRODUCTS_MODULES.map((mod) => ({
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
      name: "Ananya",
      role: "Verified Reader",
      rating: 5,
      quote: "This is one of the more practical digital-product guides I've read. It doesn't just tell you to generate an ebook with AI — it walks through researching the audience, finding gaps in existing products, and creating something people might actually pay for. The competitor research section was particularly useful.",
      initials: "A",
      date: "August 04 2026"
    },
    {
      name: "Chandana",
      role: "Verified Reader",
      rating: 5,
      quote: "I loved seeing the India and US approaches side by side. The hostel guide is such a relatable product idea, and the planner example shows how to think about a completely different audience. The seven-day roadmap makes it much easier to get started.",
      initials: "C",
      date: "August 08 2026"
    },
    {
      name: "Renu",
      role: "Verified Reader",
      rating: 5,
      quote: "The profit calculations and advertising breakdown are what make this stand out. A lot of guides focus on sales screenshots, but this one explains fees, ad spend, break-even costs, and why revenue isn't the same as profit. Very useful.",
      initials: "R",
      date: "August 14 2026"
    },
    {
      name: "Vaishali",
      role: "Verified Reader",
      rating: 5,
      quote: "Really appreciated the attention to product quality. The sections on clickable PDFs, mobile-friendly layouts, recipe checking, and planner navigation are things beginners could easily overlook. It feels like a proper workflow from idea to launch, not just an AI prompt collection.",
      initials: "V",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "What does '100% Free Tools' actually mean in this playbook?",
      answer: "'100% free tools' describes the initial creation and storefront setup phase: Claude (free tier) for research, Canva (free tier) for PDF design, and Topmate/Gumroad for listing without upfront subscription fees. It does not mean running paid advertising is free."
    },
    {
      question: "Why did the experiment test both India and the US?",
      answer: "Testing both markets reveals contrasting buyer behaviors: Indian students convert easily on low-ticket ₹99 impulse guides via instant UPI, while US tablet users readily pay $12.99 USD for specialized GoodNotes planners with tested navigation."
    },
    {
      question: "How do you find gaps in competitor products?",
      answer: "Search digital marketplaces for bestselling products in your niche, then filter reviews specifically for 1-star, 2-star, and 3-star ratings. Note recurring complaints (e.g. broken hyperlinks, cluttered layouts, missing single-appliance recipes) and build your product to fix those exact flaws."
    },
    {
      question: "What were the reported results of the 7-day experiment?",
      answer: "The source reported 67 orders for the Indian guide (via Meta ads) and 26 orders for the US planner (via Pinterest ads, generating ~$336 USD). While the transcript contains arithmetic transcription inconsistencies, the experiment demonstrates that paid ads can drive immediate volume when unit economics are managed."
    },
    {
      question: "How do I calculate break-even advertising costs?",
      answer: "Deduct platform and payment gateway fees from the selling price to find your net contribution per order. If a ₹99 guide yields ₹75 net after fees, your break-even CAC is ₹75. If your ad cost per purchase exceeds ₹75, you are losing money on every order."
    },
    {
      question: "How do I test digital planner hyperlinks before launching?",
      answer: "Export your landscape PDF and import it into an actual tablet PDF annotation app like GoodNotes, Notability, or Xodo. Tap every monthly tab, daily button, and index link to confirm they navigate accurately without crashing the app."
    }
  ]
};
