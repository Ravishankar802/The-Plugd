import type { PlaybookDetailData } from "../dating-playbook-detail";
import { HOW_TO_MAKE_PROGRESS_FASTER_MODULES } from "./how-to-make-progress-faster-than-everyone-data";

export const HOW_TO_MAKE_PROGRESS_FASTER_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-85",
  slug: "how-to-make-progress-faster-than-everyone",
  title: "How to make progress faster than everyone",
  headline: "Stop waiting to become good. Start creating, put your work out there, learn from every attempt, and turn consistent improvement into an unfair advantage.",
  description: "A practical system for overcoming perfectionism, getting comfortable with being a beginner, and making meaningful progress through repetition. Learn how to challenge limiting rules, collect useful feedback, identify your biggest weaknesses, document your journey, and improve your work through a structured 30-day sprint. Includes reflection exercises, iteration trackers, feedback templates, progress scorecards, and reusable workflows.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 6.99,
  currency: "USD",
  discountPercentage: 57,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,910",
  instructorName: "Tejas Patil",
  instructorTitle: "High-Performance Systems & Iterative Growth Strategist",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,910",
  instructorCourses: 2,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996172/How_to_make_progress_faster_than_everyone.png",
  hoursOfMaterial: "11.2 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  accentColor: "#10b981",
  whatYouWillLearn: [
    "Dismantle perfectionism and the beginner's quality trap to ship meaningful work without waiting for confidence",
    "Define the smallest complete attempt to test ideas in under 48 hours without excessive capital or time",
    "Deploy the 6-tier feedback triage matrix to filter out status mockery while extracting actionable defects",
    "Master the 4-stage Start–Observe–Improve–Repeat flywheel and enforce the single-variable retest rule",
    "Audit unexamined social rules and replace restrictive assumptions with empirical business experiments",
    "Structure deliberate 5-part practice units to drill core bottlenecks with high intensity and feedback density",
    "Build an authentic progress portfolio and attempt documentation ledger to turn struggles into credibility",
    "Execute the structured 30-day progress sprint to establish a permanent habit of compounding improvement"
  ],
  relatedTopics: [
    "Rapid Skill Acquisition & Learning Velocity",
    "Overcoming Perfectionism & Fear of Failure",
    "High-Yield Feedback Systems",
    "Deliberate Practice Architecture",
    "Public Building & Journey Documentation",
    "Compounding Performance Frameworks"
  ],
  requirements: [
    "An active project, skill, or business initiative you are currently working on or want to launch",
    "Willingness to produce and share an imperfect first complete attempt within the first 48 hours",
    "Commitment to solicit and process diagnostic feedback without defensive emotional resistance",
    "An open, analytical mindset dedicated to consistent weekly execution and retrospective reviews"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive operating manual for How to make progress faster than everyone. This playbook transforms skill development and venture creation from an emotional struggle with perfectionism into a systematic, compounding iteration engine.",
      "Rather than waiting months to feel confident or hiding work until it appears flawless, this curriculum provides the exact frameworks, scorecards, and protocols needed to start with your current baseline ability, gather diagnostic feedback, isolate core bottlenecks, and compound progress faster than anyone else in your field.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: The Beginner's Quality Trap & Friction Removal",
      "Act 2: Limiting Rule Auditing & Fragility-Free Commitment",
      "Act 3: The Iterative Engine: Start, Feedback, Improve, Repeat",
      "Act 4: High-Yield Feedback Systems & Journey Documentation",
      "Act 5: Fair Comparison & Deliberate Practice Schedules",
      "Act 6: Constraint Diagnosis & Reverse-Engineering Excellence",
      "Act 7: The 30-Day Sprint & The Compounding Operating System"
    ],
    closing: [
      "Whether you are launching a new startup, mastering a technical craft, building a public audience, or developing executive skills, this playbook gives you the exact tools to turn awkward beginnings into world-class mastery."
    ]
  },
  targetAudience: [
    "Entrepreneurs and digital builders struggling with perfectionism who want to launch and test offers faster.",
    "Creators and professionals who hesitate to share work publicly due to fear of looking inexperienced.",
    "Practitioners seeking structured feedback systems to identify their biggest bottlenecks and accelerate mastery.",
    "Ambitious operators who want a repeatable 30-day operating system to turn consistent repetition into an unfair advantage."
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Diagnostic Feedback Templates, Rule Audit Scorecards & Iteration Logs" },
    { iconName: "file-text", text: "30-Day Progress Sprint Roadmaps, Weekly Review Rituals & The One-Page OS" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: HOW_TO_MAKE_PROGRESS_FASTER_MODULES.map((mod) => ({
    id: mod.id,
    number: String(mod.number),
    title: mod.title,
    description: mod.description,
    duration: "96 min",
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
      name: "Isaiah",
      role: "Digital Product Builder",
      rating: 5,
      quote: "This hit differently because it focuses on the part nobody really talks about: getting over the fear of looking inexperienced. The exercises helped me recognise how much time I was wasting trying to make everything perfect before even starting.",
      initials: "I",
      date: "August 04 2026"
    },
    {
      name: "Thompson",
      role: "Creative Operator",
      rating: 5,
      quote: "I really liked the practical feedback system. Instead of just telling you to work harder, it shows you how to identify weaknesses, ask better questions, and make specific improvements. The iteration log is something I'll actually keep using.",
      initials: "T",
      date: "August 08 2026"
    },
    {
      name: "Meera",
      role: "Technical Strategist",
      rating: 5,
      quote: "The chapter about documenting your journey was my favourite. I used to focus only on finished results, but keeping track of attempts and mistakes makes progress much easier to see. This is a genuinely useful framework for anyone building a skill or project.",
      initials: "M",
      date: "August 14 2026"
    },
    {
      name: "Kulkarni",
      role: "Venture Lead",
      rating: 5,
      quote: "Simple ideas, but incredibly well organised. The 30-day sprint gives you a clear starting point, and the weekly reviews help turn motivation into an actual routine. My biggest takeaway was learning to take my work seriously without taking every criticism personally.",
      initials: "K",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "Why is shipping awkward early work better than waiting until it is polished?",
      answer: "Early clumsy attempts provide real diagnostic data about what is actually weak. Theoretical planning in isolation delays contact with reality, preventing you from learning what the market, audience, or users genuinely need."
    },
    {
      question: "How do I deal with the fear of people mocking my early attempts ('cringe')?",
      answer: "Recognize that 'cringe' is social friction applied by spectators to operators who dare to try. Use the 6-tier feedback triage matrix: discard unhelpful status mockery and extract specific, observable performance critiques that help you improve."
    },
    {
      question: "What is the One-Improvement Rule and why is it mandatory?",
      answer: "The One-Improvement Rule states that you should change only one primary variable between consecutive attempts. Changing multiple elements simultaneously creates chaos, making it impossible to know which adjustment caused the new result."
    },
    {
      question: "How does the 30-day progress sprint work?",
      answer: "The 30-day sprint is divided into two phases: Weeks 1–2 focus on shipping a baseline attempt in 48 hours and identifying the primary bottleneck; Weeks 3–4 focus on single-variable iteration, before-and-after deltas, and standardizing permanent workflows."
    }
  ]
};
