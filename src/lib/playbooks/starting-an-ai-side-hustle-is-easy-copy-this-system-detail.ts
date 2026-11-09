import type { PlaybookDetailData } from "../dating-playbook-detail";
import { STARTING_AI_SIDE_HUSTLE_MODULES } from "./starting-an-ai-side-hustle-is-easy-copy-this-system-data";

export const STARTING_AI_SIDE_HUSTLE_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-93",
  slug: "starting-an-ai-side-hustle-is-easy-copy-this-system",
  title: "Starting An AI Side Hustle Is EASY (Copy This System)",
  headline: "Stop building AI projects nobody wants. Find a problem people will actually pay to solve, create an edge competitors can't easily copy, and turn AI into a real customer-getting business.",
  description: "AI makes building easier — but finding customers, earning trust, and standing out are still the hard parts. This playbook gives you a four-gate system to validate demand, develop a competitive edge through imagination, focus, and customer context, find the right distribution channels, and build continuous learning loops.\n\nIncludes customer discovery scripts, niche scorecards, AI research prompts, MVP frameworks, distribution experiments, feedback trackers, reusable worksheets, and a practical 30-day execution roadmap.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 2,
  originalPrice: 4.99,
  currency: "USD",
  discountPercentage: 60,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,910",
  instructorName: "Eduardo Martins",
  instructorTitle: "AI Business Architect & Offer Systems Strategist",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,910",
  instructorCourses: 3,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996182/Starting_An_AI_Side_Hustle_Is_EASY_Copy_This_System.png",
  hoursOfMaterial: "11.2 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  accentColor: "#06b6d4",
  whatYouWillLearn: [
    "Master the Four-Gate Architecture: Demand, Edge, Access, and Learning Loops",
    "Avoid the Artificial Illusion: decouple digital artifact creation from market validation",
    "Apply the Niche-of-the-Niche formula to uncover hidden, highly profitable workflows",
    "Conduct non-adversarial customer discovery interviews that reveal actual willingness to pay",
    "Engineer an unassailable edge through Imagination (recombination), Focus (1-1-1-1), and Context",
    "Separate end users from economic buyers to close high-ticket institutional agreements",
    "Leverage partner channels that turn a single relationship into hundreds of qualified clients",
    "Install Formula 1 telemetry loops to ensure every customer delivery compounds your moat"
  ],
  relatedTopics: [
    "AI Side Hustle Validation",
    "The Four-Gate Business Architecture",
    "Customer Discovery Protocols",
    "Niche-of-the-Niche Positioning",
    "The User vs. Buyer Ecosystem",
    "F1 Iteration Telemetry & The Cremona Mindset"
  ],
  requirements: [
    "A computer or smartphone with internet connectivity",
    "Familiarity with standard AI tools (ChatGPT, Claude, or Gemini) as research assistants",
    "Willingness to talk directly with prospective customers and conduct behavioral interviews",
    "Commitment to testing real service offers before investing in custom software development"
  ],
  descriptionSections: {
    intro: [
      "AI has dramatically reduced the friction of writing code, drafting copy, automating workflows, and building software prototypes. But access to tools is no longer a meaningful competitive advantage when everyone commands identical neural networks.",
      "Starting An AI Side Hustle Is EASY (Copy This System) provides the comprehensive, battle-tested blueprint for moving beyond commodity AI toys into high-margin, enduring business operations.",
      "By applying the Four-Gate Architecture—Gate 1 Demand, Gate 2 Edge, Gate 3 Access, and Gate 4 Learning Loops—operators learn how to uncover acute commercial bottlenecks, construct defensible service offerings, reach paying buyers, and build a compound advantage through practice."
    ],
    keyPointsTitle: "What Makes The Four-Gate System Superior:",
    keyPoints: [
      "Demand-First Engineering: We prove customer willingness to pay through deposits and pilots before writing code.",
      "The Three-Pillar Edge: Build defensibility through distinctive idea combination, the One-One-One-One focus rule, and lived operational context.",
      "Distribution as Product: Eliminate acquisition headaches by integrating channel strategy directly into offer design and leveraging institutional gatekeepers.",
      "Formula 1 Telemetry: Turn every customer interaction, support ticket, and delivery friction point into compounding operational dominance.",
      "The Cremona Mindset: Embody the artisan philosophy that balances rapid AI execution with sovereign human judgment."
    ],
    closing: [
      "Whether you are launching your first digital venture or transitioning from freelance freeloading to an enduring productized studio, this playbook delivers the exact operational frameworks required to build a sovereign, profitable AI enterprise."
    ]
  },
  targetAudience: [
    "Aspiring entrepreneurs seeking to build a defensible, high-margin business with AI",
    "Freelancers, consultants, and operators tired of competing on commodity AI prompts",
    "Technical and non-technical builders looking to validate demand before writing code",
    "Professionals seeking a proven 30-day roadmap to commercial sovereignty"
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "The Complete Four-Gate Architecture & Discovery Workflows" },
    { iconName: "file-text", text: "Customer Evidence Logs, Combination Maps & 30-Day Sprint Trackers" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: STARTING_AI_SIDE_HUSTLE_MODULES.map((mod) => ({
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
      name: "Noah",
      role: "Verified Reader",
      rating: 5,
      quote: "Finally, an AI business guide that doesn't just throw 50 side hustle ideas at you. The four-gate framework completely changed how I evaluate opportunities. I especially liked the distinction between being able to build something and having actual evidence that someone wants to buy it.",
      initials: "N",
      date: "August 04 2026"
    },
    {
      name: "Aditi",
      role: "Verified Reader",
      rating: 5,
      quote: "The section on finding your edge was my favourite. Imagination, focus, and context are such simple concepts, but the explanations made me realise why most AI services look identical. The customer workflow exercises are particularly useful for finding opportunities that aren't obvious at first.",
      initials: "A",
      date: "August 08 2026"
    },
    {
      name: "Sebastian",
      role: "Verified Reader",
      rating: 5,
      quote: "I used to think distribution was something to figure out after building the product. This playbook makes it clear why that's backwards. The user-versus-buyer distinction and channel selection framework are excellent. It feels like practical business thinking rather than another collection of AI prompts.",
      initials: "S",
      date: "August 14 2026"
    },
    {
      name: "Nisha",
      role: "Verified Reader",
      rating: 5,
      quote: "The learning loops chapter ties everything together beautifully. Instead of treating the first launch as the finish line, it shows how to use customer feedback to improve the offer, delivery, and positioning. The 30-day plan also makes the whole framework feel manageable rather than overwhelming.",
      initials: "N",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "What is the Four-Gate AI Business System?",
      answer: "The Four-Gate System is a sequential validation framework that ensures: 1) Demand (a real buyer with painful, expensive problems willing to pay), 2) Edge (a defensible advantage via Imagination, Focus, and Context), 3) Access (reliable channels reaching economic decision-makers), and 4) Learning Loops (Formula 1 telemetry that turns feedback into compounding improvement)."
    },
    {
      question: "Why is tool access not a sustainable competitive advantage?",
      answer: "Because generative AI models and APIs are universally accessible commodities. If anyone can prompt the same output in seconds, product generation carries zero differentiation. Sustainable competitive advantage originates in customer intimacy, proprietary workflow context, and tailored delivery."
    },
    {
      question: "What is the difference between a user and an economic buyer?",
      answer: "The user is the individual who operates the tool daily; the economic buyer is the stakeholder with budgetary authority who measures return on investment. Aligning your value proposition with the buyer's financial metrics drastically shortens sales cycles."
    },
    {
      question: "Do I need coding experience to implement this playbook?",
      answer: "No. The playbook emphasizes validating demand through concierge service pilots and no-code workflows. You will learn to deliver measurable outcomes manually with AI acceleration before ever considering custom software development."
    },
    {
      question: "How long does it take to complete the Four-Gate roadmap?",
      answer: "The structured implementation plan is designed as a focused 30-day sprint: Days 1–5 Niche Narrowing, Days 6–12 Demand Discovery, Days 13–22 MVP & Edge Engineering, and Days 23–30 Access Deployment & Telemetry Installation."
    },
    {
      question: "What is the Cremona artisan principle?",
      answer: "The Cremona principle draws from traditional Italian violin makers who developed sensory judgment through years of deliberate practice. In AI business, tools automate low-value grunt work while the founder cultivates the discernment and judgment needed to guarantee exceptional quality."
    }
  ]
};
