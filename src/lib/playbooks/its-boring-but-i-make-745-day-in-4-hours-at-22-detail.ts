import type { PlaybookDetailData } from "../dating-playbook-detail";
import { ITS_BORING_745_DAY_MODULES } from "./its-boring-but-i-make-745-day-in-4-hours-at-22-data";

export const ITS_BORING_745_DAY_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-82",
  slug: "its-boring-but-i-make-745-day-in-4-hours-at-22",
  title: "It's boring but i make $745/day in 4 hours at 22",
  headline: "Find products people already want, build a store that sells, and turn Meta ads into a measurable ecommerce system — without wasting weeks guessing what might work.",
  description: "Go from product research to your first validated ecommerce offer with a practical, step-by-step dropshipping playbook. Learn to uncover winning product opportunities through competitor ad research, calculate real profit margins, build a focused Shopify store with AI tools, create profitable bundles, and test different customer desires through Meta ads. Includes ready-to-use prompts, product research scorecards, unit-economics calculators, campaign tracking sheets, daily P&L templates, and a complete launch roadmap.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 6.99,
  currency: "USD",
  discountPercentage: 57,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,910",
  instructorName: "Myles Grant",
  instructorTitle: "E-Commerce Architect & Media Buying Strategist",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,910",
  instructorCourses: 2,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996180/It_s_boring_but_i_make_745_day_in_4_hours_at_22.png",
  hoursOfMaterial: "11.1 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Uncover validated product opportunities by reverse-engineering 30+ day competitor ad longevity on Meta",
    "Calculate exact pre-ad contribution margins and break-even customer acquisition costs across single and bundle tiers",
    "Build a focused, high-converting single-product Shopify store in minutes using structured AI prompt briefs",
    "Design high-margin quantity bundles (Buy 1, Buy 2 Get 1, Buy 3 Get 2) that elevate Average Order Value by 40%+",
    "Deploy the Meta 3-Desire CBO testing framework to identify winning customer motivations with minimal ad spend",
    "Audit full-funnel conversion telemetry to diagnose and fix link-click, add-to-cart, and checkout friction",
    "Implement daily P&L accounting tracking net contribution profit after deducting COGS, freight, fees, and apps",
    "Execute the 4-hour daily operator workflow and the One-Page E-Commerce Operating System for sustainable scaling"
  ],
  relatedTopics: [
    "E-Commerce & Dropshipping",
    "Meta Ads & Media Buying",
    "Shopify Conversion Optimization",
    "Unit Economics & Margin Control",
    "Multi-Unit Bundle Strategy",
    "Product Research & Validation"
  ],
  requirements: [
    "A computer with an internet connection and basic familiarity with e-commerce platforms",
    "Willingness to conduct disciplined competitor research and follow structured ad testing frameworks",
    "Commitment to audit financial records daily and prioritize net profit over gross sales vanity",
    "An open, analytical mindset ready to evaluate customer data and iterate based on objective feedback"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive operating manual for It's boring but i make $745/day in 4 hours at 22. This playbook translates modern direct-to-consumer dropshipping from an unpredictable gamble into a measurable, repeatable engineering discipline.",
      "Rather than chasing fleeting viral trends, copying low-resolution video ads, or relying on vanity ROAS screenshots that hide massive operational losses, this curriculum delivers the exact step-by-step operating architecture required to uncover validated consumer demand, engineer high-AOV bundle offers, deploy native Meta ad tests, and track net cash flow through a rigorous daily P&L.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: The Lean E-Commerce Business Model & P&L Architecture",
      "Act 2: Demand-Driven Product Research & Competitor Longevity",
      "Act 3: Supplier Sourcing, Product Verification & Risk Controls",
      "Act 4: Rapid Shopify Architecture & AI-Assisted Store Creation",
      "Act 5: Multi-Unit Bundle Engineering & Average Order Value Maximization",
      "Act 6: Creative Ideation & Meta 3-Desire Testing Architecture",
      "Act 7: Daily Operations, Time Management & Sustainable Scaling"
    ],
    closing: [
      "Whether you are launching your first e-commerce store, transitioning from chaotic product testing to disciplined systems, or looking to scale a lean single-product brand, this playbook delivers the exact calculators, checklists, and daily operating rhythms needed to succeed."
    ]
  },
  targetAudience: [
    "Aspiring e-commerce entrepreneurs looking for a practical, step-by-step blueprint to validate their first store.",
    "Dropshippers tired of unprofitable ad spend who want to master real unit economics and bundle engineering.",
    "Media buyers and marketers wanting to deploy structured 3-desire creative testing architectures on Meta.",
    "Independent operators who want to build a focused, profitable e-commerce business in 4 hours per day."
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "AI Store Prompt Briefs, Bundle Calculators & Daily P&L Spreadsheet Models" },
    { iconName: "file-text", text: "Competitor Longevity Audits, Meta 3-Desire Setups & The One-Page Operating System" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: ITS_BORING_745_DAY_MODULES.map((mod) => ({
    id: mod.id,
    number: String(mod.number),
    title: mod.title,
    description: mod.description,
    duration: "95 min",
    lessonsCount: mod.lessons.length,
    lessons: mod.lessons.map((les: any, idx: number) => ({
      id: les.id,
      number: String(les.number),
      title: les.title,
      duration: les.duration,
      isPreview: idx === 0 && mod.number === "01",
    })),
  })),
  testimonials: [
    {
      name: "Cameron",
      role: "E-Commerce Operator",
      rating: 5,
      quote: "I've read plenty of dropshipping guides, but most jump straight into finding a product and running ads. This one actually explains how to evaluate whether a product is worth selling in the first place. The competitor research and product scorecard sections alone make this worth going through.",
      initials: "C",
      date: "August 04 2026"
    },
    {
      name: "Valentina",
      role: "Digital Brand Strategist",
      rating: 5,
      quote: "The unit economics section was a real eye-opener. I used to think good ROAS meant I was making money, but the breakdown of fulfilment, fees, ad spend, and contribution completely changed how I look at ecommerce. Super practical and easy to follow.",
      initials: "V",
      date: "August 08 2026"
    },
    {
      name: "Jamal",
      role: "DTC Store Owner",
      rating: 5,
      quote: "My favourite part is how the entire process connects. Product research flows into the store, the bundle offer, creative testing, and then the daily P&L. It doesn't feel like a collection of random tips. It gives you an actual workflow to follow.",
      initials: "J",
      date: "August 14 2026"
    },
    {
      name: "Aria",
      role: "Performance Marketer",
      rating: 5,
      quote: "Really appreciated the focus on execution over endless store customisation. The AI store-building workflow, bundle planning, and three-angle ad testing gave me a much clearer picture of what to work on first. The launch checklist is especially useful when you're ready to stop researching and start building.",
      initials: "A",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "How does this dropshipping playbook differ from typical internet marketing courses?",
      answer: "Unlike typical tutorials that celebrate gross sales screenshots and vanity ROAS figures, this playbook focuses strictly on net retained cash flow. It teaches you how to calculate pre-ad contribution margins, build automated daily P&L spreadsheets, engineer multi-unit quantity bundles, and run structured 3-desire Meta ad tests within a realistic 4-hour daily operating routine."
    },
    {
      question: "What does the 30-day competitor ad longevity rule mean in product research?",
      answer: "The 30-day rule states that you should focus product research on competitor ads that have remained actively funded on Meta for at least 30 to 90 consecutive days. Because advertisers rarely burn marketing capital on unprofitable campaigns for weeks on end, ad longevity serves as a reliable empirical signal of underlying market demand."
    },
    {
      question: "Why are multi-unit bundle offers so critical for e-commerce profitability?",
      answer: "Single-item sales often yield razor-thin margins after deducting customer acquisition cost (CAC), COGS, and payment fees. By introducing quantity tiers—such as Buy 2 Get 1 Free—you tap into natural household utility and increase Average Order Value (AOV). Because your acquisition cost remains relatively fixed, the larger order produces substantially more net cash contribution per customer."
    },
    {
      question: "What is the 3-Desire testing framework on Meta ads?",
      answer: "The 3-Desire framework maps a single product against three fundamentally different emotional motivations (e.g., Hygiene vs Confidence vs Time Convenience) and houses them in three isolated ad sets inside a Campaign Budget Optimization (CBO) structure. This teaches you which specific customer psychology drives profitable purchases rather than wasting budget on minor headline tweaks."
    }
  ]
};
