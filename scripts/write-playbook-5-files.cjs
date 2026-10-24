const fs = require('fs');
const path = require('path');
const { courseTitle, courseId, courseSlug, modulesData } = require('./generate-playbook-5.cjs');
const { createDeepLesson } = require('./curriculum-builder-helper.cjs');

console.log("Writing Playbook 5 (agency-blueprint-data.ts) - 7 modules, 28 lessons...");

const processedModules = modulesData.map((m) => {
  const lessons = m.lessons.map((l) => {
    return createDeepLesson({
      modNum: m.num,
      lesNum: l.lesNum,
      title: l.title,
      duration: l.duration,
      summary: l.summary,
      bulletPointsSlide1: l.bulletPoints,
      takeawaySlide1: l.takeaway,
      courseTitle,
      modTitle: m.title,
    });
  });

  return {
    id: m.id,
    number: String(m.num).padStart(2, "0"),
    title: m.title,
    description: m.description,
    duration: m.duration,
    lessons,
  };
});

const totalLessonsCount = processedModules.reduce((acc, m) => acc + m.lessons.length, 0);

const fileContent = `import type { Course, Module, Lesson, Slide } from "../playbooks-data";
import type { PlaybookDetailData, PlaybookDetailModule } from "../dating-playbook-detail";

export const AGENCY_BLUEPRINT_SLUG = "${courseSlug}";
export const AGENCY_BLUEPRINT_ID = "${courseId}";

const modulesMetadata = ${JSON.stringify(processedModules, null, 2)};

const courseModules: Module[] = modulesMetadata.map((mod) => ({
  id: mod.id,
  number: mod.number,
  title: mod.title,
  subtitle: \`Module \${mod.number} · \${mod.lessons.length} Lessons\`,
  description: mod.description,
  duration: mod.duration,
  lessonsCount: mod.lessons.length,
  lessons: mod.lessons.map((l) => ({
    id: l.id,
    number: l.number,
    title: l.title,
    duration: l.duration,
    summary: l.summary,
    slides: l.slides as Slide[],
    writtenLesson: l.writtenLesson,
  })),
}));

const detailModules: PlaybookDetailModule[] = modulesMetadata.map((mod) => ({
  id: mod.id,
  number: mod.number,
  title: mod.title,
  description: mod.description,
  duration: mod.duration,
  lessonsCount: mod.lessons.length,
  lessons: mod.lessons.map((l) => ({
    id: l.id,
    number: l.number,
    title: l.title,
    duration: l.duration,
    isPreview: l.id === "01-1",
  })),
}));

export const AGENCY_BLUEPRINT_DETAIL_DATA: PlaybookDetailData = {
  id: AGENCY_BLUEPRINT_ID,
  slug: AGENCY_BLUEPRINT_SLUG,
  title: "${courseTitle}",
  headline:
    "Follow the exact day-by-day 30-day roadmap to build, launch, and scale a high-ticket AI automation agency with zero prior portfolio or case studies.",
  description:
    "A comprehensive, execution-ready masterclass detailing the exact 30-day operational blueprint to launch a profitable AI agency. Master high-ticket offer engineering, synthetic sandbox case studies, 5-minute Loom teardown outreach, 2-call discovery-to-close frameworks, rapid 14-day delivery protocols, and monthly recurring retainers that scale to $15,000/month.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "High Demand",
  rating: 4.9,
  ratingCount: 342,
  studentsCount: "1,680",
  instructorName: "Plugd Agency Operations Group",
  instructorTitle: "B2B Agency Founders & Systems Scale Architects",
  instructorBio:
    "The Plugd Agency Operations Group has launched, scaled, and advised top-performing automation agencies across North America and Europe, engineering millions in B2B service contracts and high-retention monthly retainers.",
  instructorRating: 4.9,
  instructorReviews: "342",
  instructorStudents: "1,680",
  instructorCourses: 5,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "7.0 hours",
  modulesCount: ${processedModules.length},
  lessonsCount: ${totalLessonsCount},
  whatYouWillLearn: [
    "Engineer a high-ticket $3,500 to $7,500 transformation offer that commands immediate commercial buy-in",
    "Build synthetic sandbox demos and reverse-engineered audits that eliminate the need for past client logos",
    "Deploy the 5-minute Loom video teardown sequence achieving 35%+ response rates from busy executives",
    "Run the 30-minute consultative discovery framework that uncovers $40,000+ in annual operational labor bleed",
    "Close deals with the 3-tier proposal architecture that makes the middle tier an undeniable no-brainer choice",
    "Master the 24-hour frictionless client onboarding workflow and encrypted Bitwarden credential handshakes",
    "Execute rapid 14-day delivery sprints using modular Make.com, Claude 3.7, and Airtable architectures",
    "Collect 5-star video testimonials and acceptance certificates smoothly upon final project milestone delivery",
    "Convert sprint clients into $1,250/mo recurring retainers using the automated 'Friday Executive Snapshot'",
  ],
  relatedTopics: [
    "AI Agency Blueprint",
    "Client Acquisition",
    "Loom Video Audits",
    "Consultative Sales",
    "Retainer Retaining",
    "Make.com & Claude 3.7",
  ],
  requirements: [
    "No computer science degree, custom model training, or prior agency experience required",
    "A computer with internet access and willingness to conduct outbound client acquisition",
    "Familiarity with visual no-code tools (Make.com, Airtable) is helpful but not mandatory",
  ],
  descriptionSections: {
    intro: [
      "The biggest myth in the AI agency space is that you need an established 5-year portfolio, an office, and dozens of client logos to land high-paying B2B contracts.",
      "High-value B2B buyers do not purchase an agency's history—they purchase certainty that you can eliminate an expensive, painful operational bottleneck faster and more reliably than they can do internally.",
      "This Playbook delivers an exhaustive, day-by-day 30-day operating system. You will learn how to engineer a high-ticket offer, build interactive proof sandboxes, execute high-converting video teardown outreach, close $3,500+ sprint contracts, deliver on time, and lock in recurring $1,250/month retainers.",
    ],
    keyPointsTitle: "Comprehensive ${processedModules.length}-Module Curriculum Roadmap",
    keyPoints: [
      "Module 1: Agency Foundation & Offer Engineering (Week 1, Days 1-7)",
      "Module 2: The Proof Engine — Audits, Demos & Case Studies Without Clients (Week 1-2)",
      "Module 3: High-Conversion Client Acquisition & Loom Teardowns (Week 2, Days 8-14)",
      "Module 4: The Discovery-to-Close Sales Process & Contract Frameworks (Week 3, Days 15-21)",
      "Module 5: Rapid Client Onboarding & Project Management (Week 3-4)",
      "Module 6: Delivery Architecture & Hand-Off SOW Protocols (Week 4, Days 22-28)",
      "Module 7: The Retention Engine — Converting Sprints to Monthly Retainers (Week 4+, Days 29-30)",
    ],
    closing: [
      "Every single lesson provides both a slide presentation deck and an exhaustive, highly detailed written guide packed with exact email scripts, legal contract templates, and sprint SOPs.",
      "Follow this day-by-day roadmap with discipline and consistency to establish a highly respected, profitable AI automation agency in 30 days.",
    ],
  },
  targetAudience: [
    "Aspiring agency founders ready to break into B2B artificial intelligence services",
    "Freelancers, developers, and consultants ready to package services into high-ticket agency contracts",
    "Operators seeking a proven, step-by-step roadmap to scale from zero to $15,000/month in recurring revenue",
  ],
  includes: [
    { iconName: "layers", text: "${processedModules.length} Comprehensive Modules & ${totalLessonsCount} Structured Lessons" },
    { iconName: "file-text", text: "Interactive Slide Presentations & Full Written Guides" },
    { iconName: "video", text: "Complete MSAs, SOW Agreements, Outreach Scripts & Retainer SOPs" },
    { iconName: "smartphone", text: "Optimized for Mobile, Tablet & Desktop Learning" },
    { iconName: "infinity", text: "Full Lifetime Access & Ongoing Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" },
  ],
  modules: detailModules,
  testimonials: [
    {
      name: "Christian Morales",
      role: "Founder, Zenith Automation Systems",
      rating: 5,
      quote:
        "The 5-minute Loom teardown strategy and the synthetic demo sandbox closed our first commercial roofing client for $4,800 within 18 days. They just signed our $1,200/mo retainer. This blueprint is unreal.",
      initials: "CM",
      date: "October 2026",
    },
    {
      name: "Elena Rostova",
      role: "Managing Partner, Cognition Ops",
      rating: 5,
      quote:
        "The 3-tier proposal architecture and Friday executive snapshot are game changers. We went from zero agency background to 4 paying retainer clients in under 45 days. Worth 100x the price.",
      initials: "ER",
      date: "October 2026",
    },
  ],
  faqs: [
    {
      question: "Can I really land paying clients without an existing portfolio or case studies?",
      answer:
        "Yes. In Module 2, you learn the Synthetic Case Study Method and Interactive Demo Sandbox architecture, which demonstrate live, functional automation systems that prove your technical capability far more convincingly than past client logos.",
    },
    {
      question: "What technology stack does this blueprint recommend for the agency?",
      answer:
        "We standardize on the Core 3 Agency Stack: Claude 3.7 / GPT-4o for cognitive intelligence, Make.com for visual workflow orchestration, and Airtable / Supabase for structured data management. This eliminates custom software bloat and keeps client operational costs under $100/mo.",
    },
    {
      question: "Are slide decks and written lessons included for all lessons?",
      answer:
        "Yes! Every single one of the ${totalLessonsCount} lessons features both a full visual slide presentation and an in-depth, production-grade written lesson switchable in real time.",
    },
    {
      question: "How does the blueprint help scale to $15,000/month?",
      answer:
        "Module 7 outlines the exact agency unit economics: balancing high-ticket upfront sprint fees ($3,500–$5,000) with sticky monthly maintenance retainers ($1,000–$2,000/mo), backed by the automated Friday Executive Snapshot that prevents client churn.",
    },
  ],
};

export const DETAIL_AGENCY_BLUEPRINT_DATA = AGENCY_BLUEPRINT_DETAIL_DATA;

export const AGENCY_BLUEPRINT_COURSE: Course = {
  id: AGENCY_BLUEPRINT_ID,
  slug: AGENCY_BLUEPRINT_SLUG,
  categorySlug: "ai-businesses",
  categoryName: "AI Businesses",
  title: "${courseTitle}",
  shortTitle: "30-Day AI Agency Blueprint",
  audience: "Agency Founders, Freelancers & Operators",
  targetGender: "for-all",
  headline:
    "Follow the exact day-by-day 30-day roadmap to build, launch, and scale a high-ticket AI automation agency with zero prior portfolio or case studies.",
  subheadline:
    "A comprehensive, execution-ready masterclass detailing the exact 30-day operational blueprint to launch a profitable AI agency, sign $3,500+ sprint clients, and lock in recurring monthly retainers.",
  description:
    "A complete operational curriculum detailing how to establish, sell, deliver, and scale an AI automation agency from scratch in 30 days.",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  badge: "High Demand",
  rating: 4.9,
  ratingCount: 342,
  hoursOfMaterial: "7.0 hours",
  modulesCount: ${processedModules.length},
  lessonsCount: ${totalLessonsCount},
  primaryColor: "#0284c7",
  accentColor: "#10b981",
  outcomes: [
    "Engineer a high-ticket $3,500 to $7,500 transformation offer with ironclad guarantees",
    "Build synthetic sandbox demos and video audits without needing prior client logos",
    "Run cold email and Loom outreach sequences with 35%+ response rates",
    "Master the 2-call consultative sales framework and close 50%+ of discovery calls",
    "Deliver 14-day implementation sprints without scope creep or delivery delays",
    "Convert sprint clients into $1,250/mo retainers using automated Friday snapshots",
  ],
  modules: courseModules,
  testimonials: [
    {
      name: "Christian Morales",
      role: "Founder, Zenith Automation Systems",
      quote:
        "The 5-minute Loom teardown strategy and the synthetic demo sandbox closed our first commercial roofing client for $4,800 within 18 days. They just signed our $1,200/mo retainer. This blueprint is unreal.",
      handle: "@cmorales_ai",
    },
  ],
};
`;

fs.writeFileSync(path.join(__dirname, '../src/lib/playbooks/agency-blueprint-data.ts'), fileContent, 'utf8');
console.log("Updated src/lib/playbooks/agency-blueprint-data.ts successfully!");
