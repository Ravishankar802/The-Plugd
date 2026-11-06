import type { PlaybookDetailData } from "../dating-playbook-detail";
import { HOW_I_BUILD_10CR_AGENCY_MODULES } from "./how-i-build-a-10cr-agency-without-any-knowledge-data";

export const HOW_I_BUILD_10CR_AGENCY_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-70",
  slug: "how-i-build-a-10cr-agency-without-any-knowledge",
  title: "How I build a 10cr Agency Without any Knowledge",
  headline: "A practical blueprint for turning one marketable skill into a full-service agency with high-value clients, monthly retainers, a capable team, and scalable operations.",
  description: "You don't need to start with an office, a big team, or expertise in every marketing discipline. Start with one skill, build a portfolio, land your first clients, and earn their trust through exceptional delivery. This playbook shows how to make the transition from freelancer to agency founder, expand your services, build a team around your strengths, and develop the systems and financial discipline needed to pursue a much bigger business.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,120",
  instructorName: "Naveen Shetty",
  instructorTitle: "Agency Founder & Managing Partner",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,120",
  instructorCourses: 3,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996168/How_I_build_a_10cr_Agency_Without_any_Knowledge.png",
  hoursOfMaterial: "9.5 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Master the complete roadmap from solo freelance practitioner to managing a 10-crore retainer agency",
    "Identify and master a single high-value anchor craft (commercial video production, paid traffic, or direct-response copywriting)",
    "Execute high-rigor deliberate practice and curate a high-converting 90-second proof portfolio without commercial clients",
    "Run targeted cold DM and email outreach sprints to land high-trust local anchor pilot clients",
    "Transition ad-hoc project gigs into contracted monthly retainers with advance billing and clear scope guardrails",
    "Deploy the specialized-to-generalized team structure to scale delivery capacity without bloated overhead"
  ],
  relatedTopics: [
    "Agency Growth",
    "Client Acquisition",
    "Monthly Retainers",
    "Service Business Operations",
    "Creative Direction",
    "Agency Economics"
  ],
  requirements: [
    "A computer or smartphone with internet connection",
    "Willingness to practice and master one concrete digital craft or marketing skill",
    "Desire to build a sustainable, recurring-revenue service business from the ground up",
    "Zero prior business school degrees, outside capital, or leased office space required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive operational manual for How I build a 10cr Agency Without any Knowledge. This playbook deconstructs how ambitious operators start with zero formal business training, master one commercial craft, and evolve step-by-step into high-margin agency founders.",
      "Rather than chasing fragile freelance gigs or overcommitting to expensive offices and unverified full-time hires, this curriculum establishes the exact operating architecture required to land anchor clients, structure recurring retainers, build collaborative creative pods, and scale capacity with calm financial discipline.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: The Agency Progression & Single Skill Foundation",
      "Act 2: Deliberate Practice & Portfolio Engineering",
      "Act 3: Cold Outreach & Landing the Inciting Client",
      "Act 4: Transitioning from Freelance Projects to Monthly Retainers",
      "Act 5: The Specialized-to-Generalized Team Architecture",
      "Act 6: Agency Operations, Low-Overhead Growth & Quality Control",
      "Act 7: The 10-Crore Financial Horizon & Multi-City Expansion"
    ],
    closing: [
      "Every lesson is designed for immediate tactical execution, complete with 24-hour action directives and sovereign battle decision matrices.",
      "Join thousands of modern operators who use these exact frameworks to build lean, authoritative, and profitable service and media businesses."
    ]
  },
  targetAudience: [
    "Freelancers, creators, and editors who want to escape the one-off project hustle and build predictable retainer revenue.",
    "Aspiring agency founders who feel held back by lack of business degrees, capital, or commercial office space.",
    "Digital marketers and service providers seeking to scale their operational capacity, recruit skilled collaborators, and run multi-client retainers.",
    "Entrepreneurs committed to mastering craft-driven client delivery and building an enduring, high-margin service enterprise."
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Ready-to-Deploy Agency Retainer Agreements & Scope Guardrails" },
    { iconName: "file-text", text: "Cold DM Outreach Scripts, Discovery Questionnaires & Unit Economics Models" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: HOW_I_BUILD_10CR_AGENCY_MODULES.map((mod) => ({
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
      name: "Andre Whitmore",
      role: "Creative Director",
      rating: 5,
      quote: "What stood out to me was the progression. It doesn't jump straight into hiring people and chasing big retainers. It explains how to earn your way there through actual skills, client work, and trust.",
      initials: "AW",
      date: "August 04 2026"
    },
    {
      name: "Saanvi Kulkarni",
      role: "Creative Producer",
      rating: 5,
      quote: "I've been thinking about starting an agency, but always assumed I needed to know everything first. The specialised-to-generalised model changed how I look at it. Build one strong capability, then bring in the missing pieces.",
      initials: "SK",
      date: "August 08 2026"
    },
    {
      name: "Rafael Dominguez",
      role: "Media Strategist",
      rating: 5,
      quote: "The sections on retainers, team structure, and agency economics are excellent. I especially appreciated the distinction between revenue and actual profit. There's a lot of practical thinking here.",
      initials: "RD",
      date: "August 14 2026"
    },
    {
      name: "Brooke Anderson",
      role: "Agency Operator",
      rating: 5,
      quote: "My favourite part is the founder mindset chapter. Learning to solve problems, understand the work, and recognise your own weaknesses is more useful than another generic guide about getting rich with an agency.",
      initials: "BA",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "Do I need upfront capital or an office to start an agency using this playbook?",
      answer: "No. The playbook demonstrates how to start from home or cafes using a single practiced skill, reinvesting client cash flow into team capabilities and software before considering commercial leases."
    },
    {
      question: "What is the difference between freelancing and running an agency?",
      answer: "Freelancers sell their personal time for individual project deliverables. An agency delivers integrated recurring systems (strategy, production, distribution) via a coordinated team on monthly retainers."
    },
    {
      question: "How quickly can I land my first paying client?",
      answer: "The playbook outlines a structured 7-day, 70-message outreach sprint focused on local hospitality and lifestyle businesses that can land pilot clients within 1 to 2 weeks of portfolio curation."
    },
    {
      question: "What is included with my one-time purchase?",
      answer: "You receive full lifetime digital access to the complete 7-module visual presentation player (112 slides), 28 comprehensive written lesson guides, proposal templates, retainer contracts, and all future curriculum updates with zero subscription fees."
    }
  ]
};
