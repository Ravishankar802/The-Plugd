import type { PlaybookDetailData } from "../dating-playbook-detail";
import { I_TRIED_23_EASY_SIDE_HUSTLES_MODULES } from "./23-easy-side-hustles-data";

export const I_TRIED_23_EASY_SIDE_HUSTLES_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-110",
  slug: "i-tried-23-easy-side-hustles-that-actually-worked-copy-my-10-000-month-strategy",
  title: "I tried 23 easy SIDE HUSTLES that actually WORKED (copy my $10,000/month strategy)",
  headline: "23 side hustles. Four ways to make money. One practical roadmap to turn spare time, existing skills, and overlooked opportunities into income — and build something that can grow beyond your hours.",
  description: "**23 side hustles. Four ways to make money. One practical roadmap to turn spare time, existing skills, and overlooked opportunities into income — and build something that can grow beyond your hours.**\n\nFrom paid research studies and reselling to freelancing, print-on-demand, affiliate marketing, newsletters, and UGC, explore 23 side hustles and learn how each one actually works. Discover how to choose the right opportunity, find customers, calculate real profits, avoid scams, and turn small wins into repeatable income streams.\n\nIncludes practical checklists, pricing and profit calculations, business frameworks, a side-hustle selection scorecard, and a 30-day execution plan.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 2,
  originalPrice: 4.99,
  currency: "USD",
  discountPercentage: 60,

  rating: 4.7,
  ratingCount: "0.3k",
  publishedAt: "2026-10-30",
  studentsCount: "4,910",
  instructorName: "Alice Chen",
  instructorTitle: "Commercial Strategist & Income Systems Architect",
  instructorBio: "Alice Chen is a commercial strategist, operator, and digital asset builder specializing in multi-stream income architectures, print-on-demand e-commerce, and practical freelancer monetization frameworks.",
  instructorRating: 4.7,
  instructorReviews: "0.3k",
  instructorStudents: "4,910",
  instructorCourses: 1,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1794352586/I_tried_23_side_hustles.png",
  hoursOfMaterial: "9.8 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Master the 4-tier income framework: Claim entitlements, Convert clutter, Earn skill income, and Build scalable assets",
    "Evaluate all 23 side-hustle models using the strategic offline-vs-online and time-vs-scalability decision matrix",
    "Screen and qualify for legitimate paid research studies, user tests, focus groups, and class-action settlements",
    "Execute zero-inventory household liquidation, retail arbitrage, and niche vintage curation with positive net margins",
    "Package high-margin freelance services in video editing, thumbnail architecture, copywriting, and social media",
    "Launch print-on-demand brands without holding inventory, utilizing visual discovery engines and community promotion",
    "Monetize niche newsletters, affiliate recommendations, and non-influencer UGC with structured commercial usage rights",
    "Deploy the battle-tested 30-day execution sprint to validate demand, avoid scams, and track net hourly earnings"
  ],
  relatedTopics: [
    "Side Hustle Strategy",
    "Print-on-Demand E-Commerce",
    "Freelance Skill Monetization",
    "Retail Arbitrage & Reselling",
    "User-Generated Content (UGC)",
    "Unit Economics & Margin Worksheets"
  ],
  requirements: [
    "A computer, tablet, or smartphone with internet access and a modern web browser",
    "Willingness to track net earnings after expenses and validate customer demand before scaling",
    "Zero prior business management, technical programming, or inventory warehousing experience required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to I tried 23 easy SIDE HUSTLES that actually WORKED (copy my $10,000/month strategy). This comprehensive playbook transforms 23 diverse income streams into a disciplined, multi-tier operational blueprint.",
      "Instead of pitching get-rich-quick fantasies or surface-level listicles, this curriculum classifies income opportunities into four rigorous operational tiers: Claim, Convert, Earn, and Build. You'll learn how to leverage quick wins to generate seed capital, develop marketable skills through freelance retainers, and systematically build assets that generate revenue independently of your active hours."
    ],
    keyPoints: [
      "Act 1: The Four-Way Framework & Side Hustle Matrix",
      "Act 2: CLAIM — Monetizing Opinions, Research & Entitlements",
      "Act 3: CONVERT — Turning Possessions & Local Sourcing Into Cash",
      "Act 4: EARN (Part 1) — High-Velocity Local & Creative Gigs",
      "Act 5: EARN (Part 2) — Specialist Digital Freelancing & Services",
      "Act 6: BUILD (Part 1) — Zero-Inventory Physical & Digital Assets",
      "Act 7: BUILD (Part 2) — Media Assets, Risk Management & The 30-Day Sprint"
    ],
    closing: [
      "Whether you need immediate cash flow this weekend or want to construct a multi-thousand-dollar scalable brand, the methodology remains grounded in unit economics, scam prevention, and execution rigor.",
      "Enroll today to unlock lifetime access to all 7 modules, 112 visual slides, 28 comprehensive written lessons, calculation worksheets, and the complete 30-day execution roadmap."
    ]
  },
  targetAudience: [
    "Ambitious individuals seeking practical, vetted ways to generate supplementary cash flow in their spare time",
    "Freelancers and creators looking to transition from trading hours for money to building scalable digital and physical assets",
    "Operators wanting a disciplined framework to evaluate retail arbitrage, print-on-demand, newsletters, and UGC deals",
    "Anyone tired of generic side-hustle listicles who wants verified unit economics, anti-scam safeguards, and actionable SOPs"
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Cinematic Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Side-Hustle Selection Scorecards, Outreach Scripts & Arbitrage Worksheets" },
    { iconName: "file-text", text: "Interactive Anti-Scam Checklists & The 30-Day Multi-Stream Sprint" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: I_TRIED_23_EASY_SIDE_HUSTLES_MODULES.map((mod) => ({
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
  faqs: [
    {
      question: "Do I need upfront capital to begin with these side hustles?",
      answer: "No. Several categories in the playbook—such as claiming legitimate paid research, testing websites, and converting unneeded household possessions into cash—require zero upfront investment. The playbook specifically teaches you how to use zero-cost activities to generate seed capital for skill services and scalable assets."
    },
    {
      question: "Is the $10,000/month figure guaranteed?",
      answer: "No. $10,000 per month is an educational planning benchmark used to demonstrate unit economics, required order volumes, and client retainer math. Actual earnings depend on your location, eligibility, market demand, skill level, and consistent execution."
    },
    {
      question: "What is included with my one-time purchase?",
      answer: "You receive lifetime access to all 7 comprehensive modules, including 112 visual presentation slides, 28 detailed written guides, the side-hustle selection scorecard, arbitrage and unit-economic calculation worksheets, anti-scam checklists, and the complete 30-day execution sprint."
    },
    {
      question: "Can I access this material on mobile and desktop?",
      answer: "Yes. Both the interactive PowerPoint-style slide presentation player and the warm light-mode editorial reader are fully responsive and optimized for seamless viewing across smartphones, tablets, and desktop computers."
    }
  ],
  testimonials: [
    {
      name: "Bennett",
      role: "Verified Reader",
      rating: 5,
      quote: "I liked that this doesn't pretend every side hustle is a shortcut to getting rich. The four categories made it much easier to understand where to start and which opportunities are worth pursuing.",
      initials: "B",
      date: "October 31, 2026"
    },
    {
      name: "Caleb",
      role: "Verified Reader",
      rating: 5,
      quote: "The breakdown of skill-based income versus building something scalable was genuinely useful. I came for side-hustle ideas and ended up with a much clearer plan for what to focus on first.",
      initials: "C",
      date: "November 03, 2026"
    },
    {
      name: "Fernández",
      role: "Verified Reader",
      rating: 5,
      quote: "So many ideas, but what makes this valuable is the practical detail. The profit calculations, checklists, and warnings about scams make it feel like an actual guide rather than another list of money-making methods.",
      initials: "F",
      date: "November 06, 2026"
    },
    {
      name: "Darius",
      role: "Verified Reader",
      rating: 5,
      quote: "The 30-day plan is my favourite part. Instead of trying ten things at once, it helps you pick an opportunity, test it, track the numbers, and decide what to do next. Very practical.",
      initials: "D",
      date: "November 09, 2026"
    }
  ]
};
