import type { PlaybookDetailData } from "../dating-playbook-detail";
import { FIRST_100K_12_MONTHS_MODULES } from "./if-i-wanted-to-make-my-first-100k-in-12-months-id-do-this-data";

export const FIRST_100K_12_MONTHS_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-95",
  slug: "if-i-wanted-to-make-my-first-100k-in-12-months-id-do-this",
  title: "If I Wanted to Make My First $100K in 12 months, I’d Do This",
  headline: "Turn your skills into a six-figure business — find a profitable niche, craft an irresistible offer, land your first paying clients, and build towards $100K in annual revenue.",
  description: "Stop wasting months brainstorming business ideas and start building something people will actually pay for. This playbook takes you from niche selection and offer creation to customer discovery, sales conversations, and your first paying customer — with a practical roadmap for building momentum towards an $8,333 monthly revenue run rate.\n\nIncludes the Six Ps offer framework, niche-selection worksheets, discovery-call scripts, outreach templates, validation trackers, sales pipeline tools, and a 12-month execution roadmap.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 2,
  originalPrice: 4.99,
  currency: "USD",
  discountPercentage: 60,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,910",
  instructorName: "Jordan Hayes",
  instructorTitle: "Lifestyle Business Architect & Six-Figure Systems Strategist",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,910",
  instructorCourses: 4,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996176/If_I_Wanted_to_Make_My_First_100K_in_12_months_I_d_Do_This.png",
  hoursOfMaterial: "11.2 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  accentColor: "#38bdf8",
  whatYouWillLearn: [
    "Navigate the 5-phase lifestyle business journey: Ideation, Validation, Momentum, Leverage, Freedom",
    "Reverse-engineer the $100K annual target into an actionable $8,333 monthly run rate",
    "Translate existing employment craft skills and personal struggle victories into commercial value",
    "Apply the 3-Filter Niche Audit: Do I like them? Can I help them? Will they pay $2,000+?",
    "Architect high-converting offers with the Six Ps: Person, Problem, Promise, Plan, Product, Price",
    "Execute 10+ diagnostic discovery calls using non-adversarial The Mom Test interview rules",
    "Generate qualified leads through warm networks, niche interest media, and community authority",
    "Close high-ticket clients ($2,000–$3,000) using the 10-step consultative sales framework"
  ],
  relatedTopics: [
    "Six-Figure Lifestyle Business",
    "The Six Ps Offer Architecture",
    "The 3-Filter Niche Audit",
    "Non-Adversarial Discovery Calls",
    "Interest Media Lead Generation",
    "The $8,333 Monthly Run Rate"
  ],
  requirements: [
    "A computer or smartphone with internet connectivity",
    "Willingness to inventory existing craft skills, workplace tasks, and personal experiences",
    "Commitment to speaking directly with prospective customers through discovery calls",
    "An action-oriented mindset focused on selling an offer before building complex software"
  ],
  descriptionSections: {
    intro: [
      "Most aspiring entrepreneurs waste months building products in isolation, designing logos, and polishing landing pages before confirming whether anyone is willing to pay. They fall into the Product-First Trap, mistaking planning for progress.",
      "If I Wanted to Make My First $100K in 12 months, I’d Do This provides the definitive, battle-tested roadmap for building an enduring six-figure lifestyle business from a standing start.",
      "By following the 5-Phase Evolution—Ideation, Validation, Momentum, Leverage, and Freedom—operators master how to inventory craft skills, select profitable niches, engineer Six-P offers, conduct diagnostic discovery calls, close high-ticket clients, and compound momentum toward an $8,333 monthly revenue run rate."
    ],
    keyPointsTitle: "What Makes The Six-P Launch System Superior:",
    keyPoints: [
      "Offer-First Engineering: We package the transformation and validate customer willingness to pay before investing time in fulfillment.",
      "The Six Ps Framework: Perfect your Person, Problem, Promise (<10 words), Plan (3–5 steps), Product (minimum deliverables), and Price ($2,000+).",
      "High-Ticket Unit Economics: Reaching $8,333/month requires closing just 4 to 5 clients at $2,000/month rather than chasing 800+ micro-buyers.",
      "Non-Adversarial Discovery: Learn to ask behavioral questions using The Mom Test principles, uncovering unvarnished client vernacular.",
      "The 12-Month Master Schedule: Follow a structured chronological roadmap from 14-day ideation to 90-day validation and 12-month run-rate stability."
    ],
    closing: [
      "Whether you are launching your first business while working a full-time job or transitioning from freelance chaos to a predictable lifestyle studio, this playbook delivers the exact operational blueprint required to build a sovereign, six-figure enterprise in 12 months."
    ]
  },
  targetAudience: [
    "Aspiring entrepreneurs seeking a proven, step-by-step roadmap to their first $100K",
    "Freelancers and consultants looking to transition to high-ticket, recurring retainers",
    "Full-time professionals seeking to build a six-figure lifestyle business on the side",
    "Builders who want to validate real customer demand before writing code or building products"
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "The Complete Six Ps Offer Architecture & 5-Phase Roadmap" },
    { iconName: "file-text", text: "Niche Brainstorm Worksheets, Discovery Call Scripts & 12-Month Scorecards" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: FIRST_100K_12_MONTHS_MODULES.map((mod) => ({
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
      name: "Everett",
      role: "Verified Reader",
      rating: 5,
      quote: "I've consumed way too much business content without actually getting anywhere. The niche-selection process finally gave me a way to compare ideas instead of jumping between them. The Six Ps framework is probably my favourite part because it turns a vague business idea into an actual offer.",
      initials: "E",
      date: "August 04 2026"
    },
    {
      name: "Mariana",
      role: "Verified Reader",
      rating: 5,
      quote: "The discovery-call section is incredibly valuable. I used to think selling meant convincing people to buy, but this explains how to understand their problems first and present an offer that makes sense. The different conversation frameworks are especially helpful for beginners.",
      initials: "M",
      date: "August 08 2026"
    },
    {
      name: "Jayden",
      role: "Verified Reader",
      rating: 5,
      quote: "What stood out to me was the emphasis on selling the offer before spending months building the product. The examples, worksheets, and validation tracker make it much easier to take action. It's a refreshing approach compared with all the usual build-a-brand-first advice.",
      initials: "J",
      date: "August 14 2026"
    },
    {
      name: "Silva",
      role: "Verified Reader",
      rating: 5,
      quote: "I appreciate that the playbook doesn't pretend $100K is guaranteed or that revenue equals profit. It breaks down the actual stages, from choosing a niche to getting the first sale and building momentum. The 12-month roadmap gives you something concrete to work towards without making the process feel mysterious.",
      initials: "S",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "What does the $100K target actually measure?",
      answer: "The $100,000 target represents an annual business revenue run rate, equivalent to approximately $8,333 per month. It measures gross commercial revenue, not net personal income, profit, or take-home pay. Costs, taxes, software, and contractor expenses must be deducted."
    },
    {
      question: "What are the five phases of a lifestyle business?",
      answer: "The five phases are: 1) Ideation (Weeks 1–2: choosing a niche and drafting the Six-P offer), 2) Validation (Months 1–3: discovery calls and securing Client #1), 3) Momentum (Months 4–12: scaling to the $8,333/month run rate), 4) Leverage (Years 2–3: $100K to $1M), and 5) Freedom ($1M to $5M lifestyle range)."
    },
    {
      question: "What is the Six Ps Offer Framework?",
      answer: "The Six Ps framework structures a complete commercial offer: Person (bullseye customer), Problem (concrete operational pain), Promise (sub-10-word outcome), Plan (3–5 step bridge), Product (minimum deliverables), and Price (value-anchored high-ticket fee around $2,000+)."
    },
    {
      question: "Why does the playbook emphasize $2,000+ offers?",
      answer: "Higher-priced offers make reaching $8,333/month drastically simpler for a solo builder: maintaining 4 clients at $2,000/month or closing 3 projects at $3,000 requires far less marketing traffic than selling hundreds of $10 to $27 micro-products."
    },
    {
      question: "What are the three discovery call frames?",
      answer: "The three frames are: 1) Market Research (asking questions about workflows when learning a niche), 2) Free Helpful Session (offering genuine coaching on a specific bottleneck in exchange for feedback), and 3) Sales Call (openly assessing mutual fit, presenting the plan, and stating price)."
    },
    {
      question: "How long should I spend in the ideation phase?",
      answer: "Cap Phase 1 Ideation strictly at 1 to 2 weeks (roughly 10–15 hours/week). Brainstorm 20 niches, filter to your top 3, choose one champion, draft your Six-P offer on one page, and move immediately into Phase 2 Validation."
    }
  ]
};
