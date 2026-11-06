import type { PlaybookDetailData } from "../dating-playbook-detail";
import { MAKE_3000_ONLINE_90_DAYS_MODULES } from "./make-your-first-3000-online-in-90days-or-scroll-for-5-37mins-data";

export const MAKE_3000_ONLINE_90_DAYS_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-87",
  slug: "make-your-first-3000-online-in-90days-or-scroll-for-5-37mins",
  title: "Make your first $3,000 online in 90days (Or scroll for 5.37mins)",
  headline: "Learn to turn conversations into commissions — master DM appointment setting, qualify high-ticket prospects, and build a path from beginner to professional sales roles.",
  description: "**Learn to turn conversations into commissions — master DM appointment setting, qualify high-ticket prospects, and build a path from beginner to professional sales roles.**\n\nBreak into high-ticket sales without jumping straight into closing. This playbook walks you through DM appointment setting, natural sales conversations, lead qualification, commission structures, finding legitimate businesses, and securing your first opportunity. Follow a practical 90-day roadmap with ready-to-use scripts, application templates, qualification frameworks, income trackers, and performance scorecards.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,910",
  instructorName: "Diego Valera",
  instructorTitle: "High-Ticket Sales Strategist & DM Pipeline Architect",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,910",
  instructorCourses: 3,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996181/Make_your_first_3_000_online_in_90days_Or_scroll_for_5.37mins.png",
  hoursOfMaterial: "11.2 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  accentColor: "#059669",
  whatYouWillLearn: [
    "Master the 7-step respectful DM conversation framework to qualify inbound prospects naturally",
    "Deploy the 7-point discovery diagnosis covering goals, current reality, bottlenecks, and commitment",
    "Distinguish casual curiosity seekers from qualified buyers without premature pitching or spam",
    "Calculate real net commission earnings based on cash collected rather than vanity contract totals",
    "Execute the 25-point employer vetting audit to identify legitimate offers and avoid predatory scams",
    "Follow the structured 90-day execution roadmap from skill building to verified recurring commissions",
    "Operate sales pipelines with strict CRM lead attribution, calendar syncing, and context notes",
    "Build a resilient career path transitioning from text-based DM setting to phone triage and closing"
  ],
  relatedTopics: [
    "High-Ticket DM Appointment Setting",
    "Sales Pipeline Management & CRM Telemetry",
    "Lead Qualification & Intent Triage",
    "Commission Unit Economics & Contract Due Diligence",
    "Remote Career Laddering & High-Ticket Closing",
    "Conversational Discovery & Active Listening"
  ],
  requirements: [
    "A computer or smartphone with reliable internet access",
    "Basic written English communication skills and professional courtesy",
    "Willingness to study business offers and follow structured qualification criteria",
    "An open, coachable mindset dedicated to deliberate practice and ethical sales conduct"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive operating manual for Make your first $3,000 online in 90days (Or scroll for 5.37mins). This playbook transforms remote high-ticket sales from a confusing, hype-filled gamble into a structured, professional discipline centered on diagnostic DM appointment setting.",
      "Rather than teaching you to spam strangers with copy-pasted pitches, this curriculum provides the exact step-by-step frameworks, active listening techniques, qualification scorecards, and contract audit checklists required to break into legitimate remote sales roles and build sustainable monthly commission income.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: Foundations of High-Ticket Sales & Inbound Funnel Mechanics",
      "Act 2: The Art of Lead Qualification & Fit-First Discovery",
      "Act 3: DM Conversation Architecture & Script-Free Engagement",
      "Act 4: Commission Mathematics, Attribution & Legal Security",
      "Act 5: Employer Vetting, Offer Due Diligence & Red Flag Defense",
      "Act 6: Supervised Execution, Daily Habits & Quality Calibration",
      "Act 7: The 90-Day Scaling Blueprint & Advanced Career Transitions"
    ],
    closing: [
      "Whether you are looking to build a flexible side income alongside your primary career or looking to establish the foundational skills for a six-figure remote closing career, this playbook delivers the exact operational blueprint needed to execute with confidence."
    ]
  },
  targetAudience: [
    "Beginners who want an accessible, low-risk entry point into the lucrative world of remote high-ticket sales.",
    "Working professionals and university students seeking a flexible, skill-based online income.",
    "Existing appointment setters looking to improve their qualification rigor and show-up rates.",
    "Independent operators who want to master buyer psychology and high-ticket customer acquisition."
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Diagnostic DM Scripts, Response Matrices & Qualification Frameworks" },
    { iconName: "file-text", text: "The 25-Point Employer Audit Checklist & 90-Day Execution Roadmaps" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: MAKE_3000_ONLINE_90_DAYS_MODULES.map((mod) => ({
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
      isPreview: les.id === "01-1"
    }))
  })),
  testimonials: [
    {
      name: "Aiden",
      role: "Verified Reader",
      rating: 5,
      quote: "I finally understand how appointment setting actually works. The distinction between booked calls, attended calls, closed deals, and commissions was especially useful. It makes the whole business model much easier to evaluate.",
      initials: "A",
      date: "August 04 2026"
    },
    {
      name: "Zara",
      role: "Verified Reader",
      rating: 5,
      quote: "The DM conversation examples are genuinely helpful. Instead of teaching you to spam people with scripts, this explains how to ask better questions, understand someone's situation, and recognise when an offer isn't right for them.",
      initials: "Z",
      date: "August 08 2026"
    },
    {
      name: "Kim",
      role: "Verified Reader",
      rating: 5,
      quote: "My favourite part is the section on finding a legitimate company. There are so many exaggerated claims around high-ticket sales, so having actual questions to ask about compensation, attribution, refunds, and responsibilities is valuable.",
      initials: "K",
      date: "August 14 2026"
    },
    {
      name: "Rhea",
      role: "Verified Reader",
      rating: 5,
      quote: "Really appreciated the 90-day roadmap. It breaks a pretty intimidating career path into manageable stages, from practising conversations to applying for roles and tracking actual performance. Practical, realistic, and beginner-friendly.",
      initials: "R",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "What exactly is the role of an appointment setter in high-ticket sales?",
      answer: "An appointment setter handles inbound direct message conversations from prospective clients who have engaged with a company's marketing content. Rather than trying to close a sale in the DMs, the setter diagnoses the prospect's needs, verifies their qualification and budget fit, and schedules a structured sales consultation with a dedicated closer."
    },
    {
      question: "How are commissions calculated for appointment setters?",
      answer: "Setter commissions are typically 3% to 5% of the cash collected from closed deals attributed to the setter's booked calls. For instance, on an $8,000 package with $6,000 upfront cash collected, a 5% commission yields $300 once payments clear and refund terms are satisfied."
    },
    {
      question: "Do I need prior sales experience to succeed with this playbook?",
      answer: "No. Text-based DM appointment setting is specifically designed as the premier entry point into remote sales because it is asynchronous, allows you time to consult reference materials before replying, and builds foundational communication and qualification skills before you ever take live phone calls."
    },
    {
      question: "How do I protect myself from predatory employers or unpaid commissions?",
      answer: "Deploy the 25-point employer due diligence audit outlined in Module 5: verify product delivery and refund rates, demand an explicit written agreement specifying commission percentages and payment dates, and ensure all booked leads are tagged in the company CRM under your attributed setter ID."
    }
  ]
};
