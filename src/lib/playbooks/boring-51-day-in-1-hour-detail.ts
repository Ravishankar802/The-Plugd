import type { PlaybookDetailData } from "../dating-playbook-detail";
import { BORING_51_DAY_IN_1_HOUR_MODULES } from "./boring-51-day-in-1-hour-data";

export const BORING_51_DAY_IN_1_HOUR_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-66",
  slug: "its-boring-but-i-make-51-day-in-1-hour-at-22",
  title: "It’s boring but I make $51/day in 1 hour at 22",
  headline: "Find what people want, source it for less, and learn how to turn simple Depop listings into a potential side income using AliExpress and AI.",
  description: "What if your next side hustle started with a tote bag and a little product research? Explore the Depop selling method behind a reported $51/day profit experiment, from spotting buying signals and finding affordable suppliers to creating eye-catching AI product images. Get a seven-day launch plan, pricing calculations, listing templates, and a practical one-hour daily workflow, with essential marketplace compliance checks.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "4.7k",
  studentsCount: "3,750",
  instructorName: "Kunal Raj",
  instructorTitle: "Marketplace Arbitrage Operator & Commerce Strategist",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.7k",
  instructorStudents: "3,750",
  instructorCourses: 3,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793023911/It_s_Boring_But_Will_Make_Even_Beginners_Millionaires_in_2026.png",
  hoursOfMaterial: "8.9 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Master the complete operational and systemic mechanics of It’s boring but I make $51/day in 1 hour at 22",
    "Identify high-intent buyer signals on Depop including in-bag counts and offer velocity",
    "Source affordable, reliable supplier items on AliExpress using reverse-image research",
    "Calculate precise net contribution margins with platform fees and refund allowances",
    "Generate photorealistic flat-lay lifestyle imagery with AI while preserving exact product specs",
    "Execute a disciplined 60-minute daily routine to manage orders, customer inquiries, and listings"
  ],
  relatedTopics: [
    "Marketplace Arbitrage",
    "Depop Selling",
    "Ecommerce Operations",
    "AI Product Photography",
    "Lean Sourcing",
    "Side Hustle Systems"
  ],
  requirements: [
    "A computer or smartphone with an internet connection",
    "Free Depop and AliExpress seller/buyer accounts",
    "Willingness to learn marketplace demand metrics and structured product research",
    "Zero prior ecommerce, bulk inventory, or coding experience required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive masterclass on It’s boring but I make $51/day in 1 hour at 22. This playbook turns a reported real-world ecommerce experiment into an actionable operating manual for independent digital builders.",
      "Rather than preaching generic dropshipping theory or risky branded counterfeit schemes, this curriculum delivers structured demand-validation frameworks, hard unit margin arithmetic, AI visual merchandising, and a disciplined 60-minute daily operating routine.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: Marketplace Arbitrage & Operational Economics",
      "Act 2: Niche Selection & The Unbranded Advantage",
      "Act 3: Depop Demand Intelligence & Sourcing Validation",
      "Act 4: Supplier Vetting & The Fulfilment Pipeline",
      "Act 5: Attention-Earning AI Photography & Trustworthy Copy",
      "Act 6: Marketplace Compliance, Policy Defense & Order Operations",
      "Act 7: The 7-Day Launch Experiment & Scaling Roadmap"
    ],
    closing: [
      "Every lesson is designed for immediate tactical execution, complete with 24-hour action directives and sovereign battle decision matrices.",
      "Join thousands of modern operators who use these exact frameworks to build lean, policy-compliant marketplace side hustles."
    ]
  },
  targetAudience: [
    "Independent side hustlers looking to generate practical daily cashflow with minimal upfront capital",
    "Digital sellers seeking to master high-intent product research and AI lifestyle photography",
    "Beginners who want a structured 7-day launch experiment rather than vague ecommerce advice",
    "Commerce operators committed to honest, policy-compliant marketplace selling"
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Ready-to-Deploy 7-Day Launch Plan, Margin Calculators & Review SOPs" },
    { iconName: "file-text", text: "Supplier Vetting Checklists, Listing Templates & Daily 1-Hour Schedule" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: BORING_51_DAY_IN_1_HOUR_MODULES.map((mod) => ({
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
      name: "Liam Fletcher",
      role: "Ecom Builder",
      rating: 5,
      quote: "Finally, a side hustle guide that actually shows you what to look for. The trick of checking how many people have an item in their bag instead of just counting likes was such a useful insight.",
      initials: "LF",
      date: "August 2026"
    },
    {
      name: "Aisha Rahman",
      role: "Digital Seller",
      rating: 5,
      quote: "I went in thinking this would be another generic dropshipping tutorial, but the product photography section completely changed my perspective. The AI image prompts and listing examples alone make this worth reading.",
      initials: "AR",
      date: "August 2026"
    },
    {
      name: "Benjamin Clarke",
      role: "Side Hustle Operator",
      rating: 5,
      quote: "Simple concept, solid execution. I particularly appreciated the profit calculations because it's easy to see a $30 price difference and forget about shipping, fees, and refunds. This explains the numbers properly.",
      initials: "BC",
      date: "August 2026"
    }
  ],
  faqs: [
    {
      question: "Do I need to buy bulk inventory upfront before making sales?",
      answer: "No. The playbook demonstrates a lean dropshipping model where you source and fulfill items after orders are received, with a strong recommendation to test physical samples to verify quality."
    },
    {
      question: "Can I really execute this in just one hour per day?",
      answer: "Yes. By following the structured 60-minute daily routine and batching tasks like research, image generation, and description writing, you can run a focused marketplace shop without full-time commitment."
    },
    {
      question: "What tools do I need to start?",
      answer: "A smartphone or computer with internet access, a free Depop account, an AliExpress account, and basic image generation tools (like ChatGPT) are all you need."
    },
    {
      question: "What is included with my one-time purchase?",
      answer: "You receive full lifetime digital access to the complete 7-module visual presentation player (112 slides), 28 comprehensive written lesson guides, practical battle exercises, downloadable operational templates, and all future curriculum updates with zero subscription fees."
    }
  ]
};
