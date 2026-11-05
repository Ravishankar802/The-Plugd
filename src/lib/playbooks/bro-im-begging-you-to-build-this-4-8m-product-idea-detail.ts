import type { PlaybookDetailData } from "../dating-playbook-detail";
import { BEGGING_BUILD_PRODUCT_MODULES } from "./bro-im-begging-you-to-build-this-4-8m-product-idea-data";

export const BEGGING_BUILD_PRODUCT_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-72",
  slug: "bro-im-begging-you-to-build-this-4-8m-product-idea",
  title: "Bro, I'm BEGGING you to build this $4.8M product idea",
  headline: "A practical framework for discovering overlooked physical-product opportunities, evaluating their business potential, and validating demand before investing in manufacturing.",
  description: "Not every great product idea needs a factory, a huge budget, or a complicated engineering team. This playbook teaches you how to spot everyday frustrations, uncover underserved markets, generate creative product concepts, and evaluate them through two essential lenses: bootstrapability and marketability. From customer interviews and competitor research to prototype testing, landing-page experiments, and unit economics, it takes you through the journey from a rough idea to a well-researched product opportunity.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,250",
  instructorName: "Dylan Scott",
  instructorTitle: "Hardware Founder & Physical Product Strategist",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,250",
  instructorCourses: 3,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793023911/Bro_I_m_BEGGING_you_to_build_this_4_8M_product_idea.png",
  hoursOfMaterial: "9.6 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Master the two-pillar framework: evaluate physical product ideas for Bootstrapability and Marketability",
    "Identify overlooked friction points and tool workarounds through hands-on field observation and shadowing",
    "Score product concepts systematically on the 11-dimension weighted decision matrix to eliminate founder bias",
    "Design compact products optimized for high profit density, low parcel shipping fees, and home assembly",
    "Deploy honest landing-page smoke tests and behavioral interviews to validate demand before tooling",
    "Execute the 30-day product idea sprint and 90-day pilot manufacturing roadmap without outside capital"
  ],
  relatedTopics: [
    "Hardware Prototyping",
    "Physical Product Ideation",
    "Product Validation",
    "Bootstrap Manufacturing",
    "Unit Economics",
    "Consumer Products"
  ],
  requirements: [
    "A computer or smartphone with internet connection",
    "Interest in designing, making, prototyping, or manufacturing physical products",
    "Willingness to conduct field observations, user interviews, and landing-page validation experiments",
    "Zero prior hardware engineering degrees, patent filings, or venture funding required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive operational manual for Bro, I'm BEGGING you to build this $4.8M product idea. This playbook deconstructs how independent makers and hardware founders uncover overlooked physical product opportunities, validate real customer demand, and launch profitable physical products without factory-scale capital.",
      "Rather than risking life savings on unvalidated custom molds or getting trapped in low-margin commodity races, this curriculum establishes the exact step-by-step operating architecture required to spot everyday friction, evaluate bootstrapability, engineer high profit density, deploy transparent smoke tests, and scale small-batch production with disciplined financial governance.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: The Product-Founder Mindset & Downside Engineering",
      "Act 2: Pillar One: Bootstrapability & Production Economics",
      "Act 3: Pillar Two: Marketability & Perceived Value Architecture",
      "Act 4: Systematic Idea Generation & Problem Discovery",
      "Act 5: Concept Selection & Outlier Identification",
      "Act 6: Physical Product Opportunity Patterns",
      "Act 7: Validation Sprints, Prototyping & Operational Playbook"
    ],
    closing: [
      "Every lesson is designed for immediate tactical execution, complete with 24-hour action directives and sovereign battle decision matrices.",
      "Join thousands of modern operators who use these exact frameworks to build lean, authoritative, and profitable physical product enterprises."
    ]
  },
  targetAudience: [
    "Designers, engineers, makers, and hobbyists who want to turn their CAD or prototyping skills into a viable physical product business.",
    "First-time hardware entrepreneurs looking to evaluate and de-risk product concepts before committing to expensive tooling.",
    "Solopreneurs seeking high-margin physical products that can be assembled in a home studio and shipped at scale.",
    "Operators interested in modernizing dated trade tools or creating mid-tier alternatives to overpriced industrial equipment."
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Weighted Decision Matrix Spreadsheets & Customer Interview Questionnaires" },
    { iconName: "file-text", text: "BOM Cost Calculators, Profit Density Worksheets & Smoke Testing SOPs" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: BEGGING_BUILD_PRODUCT_MODULES.map((mod) => ({
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
      name: "Ethan Caldwell",
      role: "Hardware Engineer",
      rating: 5,
      quote: "One of the better resources I've come across on physical product ideas. The two-pillar framework made me reconsider how I evaluate products. I especially liked the focus on manufacturing complexity and profit density, not just whether an idea sounds exciting.",
      initials: "EC",
      date: "August 04 2026"
    },
    {
      name: "Mariana",
      role: "Industrial Designer",
      rating: 5,
      quote: "I always thought product development started with designing something and then figuring out who would buy it. This playbook flips that approach completely. The customer observation exercises and interview questions are genuinely useful.",
      initials: "M",
      date: "August 08 2026"
    },
    {
      name: "Dev Patel",
      role: "Makerspace Founder",
      rating: 5,
      quote: "The section about validating before manufacturing probably saved me from wasting money on an idea I was getting too attached to. The scorecards, competitor analysis, and concept-testing process make the whole thing feel much more systematic.",
      initials: "DP",
      date: "August 14 2026"
    },
    {
      name: "Rebecca",
      role: "Product Strategist",
      rating: 5,
      quote: "Packed with interesting ways to think about everyday problems. I particularly enjoyed the SCAMPER techniques and the examples of finding opportunities in traditional industries. It makes you look at ordinary products and wonder what could be improved.",
      initials: "R",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "Do I need engineering degrees, factory contacts, or outside funding to use this playbook?",
      answer: "No. The playbook is specifically designed for independent operators using 3D printing, off-the-shelf components, and home assembly to launch physical products with limited capital."
    },
    {
      question: "What is profit density and why is it critical for physical products?",
      answer: "Profit density measures contribution margin per unit volume (cm3). High profit density ensures that storage, assembly, and parcel shipping do not erode margins or overwhelm small workspaces."
    },
    {
      question: "How do I validate customer demand without manufacturing units first?",
      answer: "The playbook outlines honest smoke testing protocols: diagnostic past-tense interviews, transparent concept landing pages with labeled 3D renders, and non-deceptive pre-launch waitlists."
    },
    {
      question: "What is included with my one-time purchase?",
      answer: "You receive full lifetime digital access to the complete 7-module visual presentation player (112 slides), 28 comprehensive written lesson guides, weighted decision matrix spreadsheets, customer interview scripts, and all future updates with zero subscription fees."
    }
  ]
};
