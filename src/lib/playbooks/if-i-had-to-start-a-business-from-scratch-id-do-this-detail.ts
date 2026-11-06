import type { PlaybookDetailData } from "../dating-playbook-detail";
import { START_BUSINESS_FROM_SCRATCH_MODULES } from "./if-i-had-to-start-a-business-from-scratch-id-do-this-data";

export const START_BUSINESS_FROM_SCRATCH_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-71",
  slug: "if-i-had-to-start-a-business-from-scratch-id-do-this",
  title: "If I Had To Start a Business From Scratch, I'd Do This",
  headline: "A step-by-step guide to turning your existing skills into a profitable service business through real customer results, referrals, consistent outreach, and repeatable systems.",
  description: "You don't need a huge audience, a perfect business idea, or a pile of startup capital to get started. Learn how to find your first customers, offer a low-risk pilot, build credibility through genuine results, and turn that proof into a paid service. From the Rule of 300 and warm outreach to recurring revenue, niche selection, and delivery systems, this playbook walks through the process of building a business one customer at a time.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,190",
  instructorName: "Dylan Scott",
  instructorTitle: "Founder & Service Business Strategist",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,190",
  instructorCourses: 3,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996175/If_I_Had_To_Start_a_Business_From_Scratch_I_d_Do_This.png",
  hoursOfMaterial: "9.6 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Master the business-from-scratch principle: launching a lean, zero-capital service business that acts as an agile learning vehicle",
    "Conduct an uncompromising inventory of your skills, hobbies, and past problem-solving wins to isolate marketable capabilities",
    "Structure low-risk, high-commitment free or charity-linked pilots that capture verifiable proof, metrics, and permissioned testimonials",
    "Deploy the Rule of 300 attention framework: publish authoritative posts, contribute 100 contextual comments, and lead 1-to-1 conversations",
    "Productise repetitive client delivery using reusable calculation spreadsheets, onboarding SOPs, and modular asset libraries",
    "Engineer seamless continuation retainers and ascension tiers before initial client programs conclude to eliminate revenue churn"
  ],
  relatedTopics: [
    "Service Business Architecture",
    "Client Acquisition",
    "Warm Outreach",
    "The Rule of 300",
    "Recurring Retainers",
    "Productising Services"
  ],
  requirements: [
    "A computer or smartphone with internet connection",
    "Willingness to take action, conduct warm outreach, and deliver hands-on service to real clients",
    "Desire to build a sustainable, recurring-revenue service business from the ground up",
    "Zero prior startup funding, technical software engineering, or existing social media audience required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive operational manual for If I Had To Start a Business From Scratch, I'd Do This. This playbook deconstructs how ambitious operators start from zero capital, inventory their existing craft, and build a profitable, recurring service business.",
      "Rather than gambling life savings on unvalidated software ideas, expensive commercial leases, or generic advertising funnels, this curriculum establishes the exact step-by-step operating architecture required to land anchor clients, structure low-risk pilots, extract undeniable proof, deploy the Rule of 300 attention system, and scale predictable monthly retainers.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: The Zero-Capital Service Vehicle & Asset Inventory",
      "Act 2: The First Customers, Warm Outreach & Low-Risk Pilots",
      "Act 3: Referral Architecture & The Paid Offer Transition",
      "Act 4: The Rule of 300: Attention Engineering & Inbound Pipeline",
      "Act 5: Productising Delivery, Systems & Niche Specialisation",
      "Act 6: Recurring Revenue, Retention & The Continuation Offer",
      "Act 7: The Founder Operating System & Execution Sprints"
    ],
    closing: [
      "Every lesson is designed for immediate tactical execution, complete with 24-hour action directives and sovereign battle decision matrices.",
      "Join thousands of modern operators who use these exact frameworks to build lean, authoritative, and profitable service enterprises."
    ]
  },
  targetAudience: [
    "Aspiring founders who want to start a real business without large capital, complex software, or existing audiences.",
    "Freelancers and creators looking to escape unpredictable project feast-or-famine cycles and build stable retainers.",
    "Professionals seeking to turn accumulated industry skills or personal interests into high-margin consulting or service businesses.",
    "Digital operators committed to mastering direct client acquisition, referral flywheels, and systematic delivery operations."
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "The Rule of 300 Outreach Tracker & Consultative Sales Call Questionnaires" },
    { iconName: "file-text", text: "Pilot Agreements, Proof Library Templates & Delivery Productisation SOPs" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: START_BUSINESS_FROM_SCRATCH_MODULES.map((mod) => ({
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
      name: "Natalie",
      role: "Online Business Owner",
      rating: 5,
      quote: "Really liked how this breaks down the early stages of starting a business. The advice about getting results before worrying about scaling is something more beginners need to hear. The 30-day sprint makes it much easier to actually begin.",
      initials: "N",
      date: "August 04 2026"
    },
    {
      name: "Arjun",
      role: "Service Provider",
      rating: 5,
      quote: "I used to think I needed a proper website, branding, and a fully developed offer before approaching anyone. This completely changed how I look at starting. The warm outreach and pilot approach feels much more realistic.",
      initials: "A",
      date: "August 08 2026"
    },
    {
      name: "Gabriel Santos",
      role: "Operations Consultant",
      rating: 5,
      quote: "The section on turning a service into a repeatable system was my favourite. It's not just about getting customers; it explains how to deliver consistently, improve your process, and build something sustainable. Very actionable.",
      initials: "GS",
      date: "August 14 2026"
    },
    {
      name: "Chloe",
      role: "Digital Entrepreneur",
      rating: 5,
      quote: "Straightforward, practical, and refreshingly honest. I especially appreciated the mistakes section and the emphasis on building recurring relationships instead of constantly chasing new clients. Lots of ideas worth putting into practice.",
      initials: "C",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "Do I need prior business experience or outside capital to use this playbook?",
      answer: "No. The playbook specifically focuses on launching an agile service business with zero upfront capital by turning your existing knowledge into a structured pilot and earning trust through proof."
    },
    {
      question: "What is the Rule of 300 and how does it generate leads?",
      answer: "The Rule of 300 is a systematic prospecting protocol: publish one authoritative insight post, contribute 100 thoughtful contextual comments in relevant communities, and initiate consultative conversations with engaged prospects."
    },
    {
      question: "How does this playbook help me transition from free pilots to paid retainers?",
      answer: "It provides exact proposal templates, graduation review scripts, and pricing frameworks to convert early pilot wins into 12-week packaged programs and recurring monthly retainers."
    },
    {
      question: "What is included with my one-time purchase?",
      answer: "You receive full lifetime digital access to the complete 7-module visual presentation player (112 slides), 28 comprehensive written lesson guides, operating worksheets, outreach scripts, and all future curriculum updates with zero subscription fees."
    }
  ]
};
