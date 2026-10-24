const fs = require('fs');
const path = require('path');
const { courseTitle, courseId, courseSlug, modulesData } = require('./generate-playbook-6.cjs');
const { createDeepLesson } = require('./curriculum-builder-helper.cjs');

console.log("Writing Playbook 6 (smb-services-data.ts) - 7 modules, 28 lessons...");

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

export const SMB_SERVICES_SLUG = "${courseSlug}";
export const SMB_SERVICES_ID = "${courseId}";

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

export const SMB_SERVICES_DETAIL_DATA: PlaybookDetailData = {
  id: SMB_SERVICES_ID,
  slug: SMB_SERVICES_SLUG,
  title: "${courseTitle}",
  headline:
    "Master the technical architectures, delivery blueprints, and commercial packaging for 12 high-impact AI services small businesses urgently need and gladly pay for.",
  description:
    "An exhaustive, practical masterclass teaching you how to build and monetize 12 essential AI services for local businesses. Cover speed-to-lead missed-call text-backs, dynamic form quoters, automated Google review harvesters, vendor invoice auto-parsers, smart appointment dispatchers, and accounts receivable bots. Package them into high-converting bundles and build a predictable $15,000/month recurring agency.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "Bestseller",
  rating: 4.9,
  ratingCount: 358,
  studentsCount: "1,720",
  instructorName: "Plugd SMB Automation Council",
  instructorTitle: "Local Business Automation Specialists & Systems Architects",
  instructorBio:
    "The Plugd SMB Automation Council develops production automation blueprints and client acquisition systems for consultants working with home services, medical clinics, legal practices, and trade businesses.",
  instructorRating: 4.9,
  instructorReviews: "358",
  instructorStudents: "1,720",
  instructorCourses: 5,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "7.0 hours",
  modulesCount: ${processedModules.length},
  lessonsCount: ${totalLessonsCount},
  whatYouWillLearn: [
    "Build Service #1: Autonomous Missed-Call AI Text-Back Engine with instant 15-second customer engagement",
    "Build Service #2: Instant Web Form Quoter & AI Estimator with dynamic PDF proposal generation",
    "Build Service #3: Multi-Channel Inbound Lead Triage with intent scoring and deduplicated CRM sync",
    "Build Service #4: Automated Google Review Harvester with sentiment pre-checking and SEO-rich AI replies",
    "Build Service #5: Post-Service Feedback Sentinel and automated 6-month seasonal maintenance follow-ups",
    "Build Service #6: Churn Risk Radar and automated VIP customer win-back retention sequences",
    "Build Service #7: Vendor Invoice & Receipt Auto-Parser with direct QuickBooks and Xero chart sync",
    "Build Service #8: Dynamic Estimate & Custom Proposal Builder converting technician audio memos into quotes",
    "Build Service #9: Accounts Receivable Dunning & Payment Recovery Bot with one-click mobile pay links",
    "Build Services #10–12: 24/7 Smart Appointment Dispatcher, Inventory Predictor, and Employee Onboarding Bot",
    "Package services into 3 high-converting bundles ($1,800 to $4,800 setup) with recurring monthly retainers",
    "Land local business clients using the proven 'Secret Shopper' teardown method with 45%+ reply rates",
  ],
  relatedTopics: [
    "SMB Automation",
    "Local Business AI",
    "Missed-Call Text-Back",
    "Review Automation",
    "Twilio & Make.com",
    "QuickBooks Integration",
  ],
  requirements: [
    "No computer science degree or advanced machine learning programming required",
    "A computer with internet access and willingness to explore visual automation tools",
    "Access to Make.com and basic understanding of webhook concepts",
  ],
  descriptionSections: {
    intro: [
      "Small business owners—plumbers, HVAC contractors, dentists, mechanics, and boutique lawyers—are fighting an uphill battle against labor shortages, endless phone calls, and chaotic administrative paperwork.",
      "They don't have time to experiment with AI prompts or learn complex software. They need battle-tested, autonomous systems that answer missed calls, generate Google reviews, parse messy vendor invoices, and collect overdue receivables silently in the background.",
      "This complete Playbook provides the exact technical architectures, step-by-step assembly guides, and commercial packaging frameworks for 12 essential AI services that small businesses urgently need, readily understand, and enthusiastically pay $1,500 to $4,500 upfront plus recurring monthly retainers to implement.",
    ],
    keyPointsTitle: "Comprehensive ${processedModules.length}-Module Curriculum Roadmap",
    keyPoints: [
      "Module 1: SMB Pain Matrix & High-Demand AI Service Selection",
      "Module 2: Customer Acquisition & Speed-to-Lead Services (Services 1–3)",
      "Module 3: Reputation & Customer Retention Services (Services 4–6)",
      "Module 4: Back-Office & Financial Automation Services (Services 7–9)",
      "Module 5: Operational & Scheduling Systems (Services 10–12)",
      "Module 6: Packaging, Retainer Bundles & The SMB Pricing Playbook",
      "Module 7: The Local SMB Client Engine — Acquisition, Delivery SOWs & Scale",
    ],
    closing: [
      "Every single lesson includes interactive visual slide presentations and a complete, comprehensive written implementation guide packed with copy-paste Make.com webhook blueprints, Twilio configurations, and client proposal scripts.",
      "Master these 12 services and package them into recurring client bundles to build an enduring $15,000/month local automation practice.",
    ],
  },
  targetAudience: [
    "Agency founders, freelancers, and consultants targeting the lucrative small business sector",
    "No-code and automation practitioners looking for high-demand, repeatable B2B services",
    "Local marketing agency owners seeking to expand into high-retention AI automation retainers",
  ],
  includes: [
    { iconName: "layers", text: "${processedModules.length} Comprehensive Modules & ${totalLessonsCount} Structured Lessons" },
    { iconName: "file-text", text: "Interactive Slide Presentations & Full Written Guides" },
    { iconName: "video", text: "Complete Webhook Blueprints, Twilio Flows, SOWs & Outreach Scripts" },
    { iconName: "smartphone", text: "Optimized for Mobile, Tablet & Desktop Learning" },
    { iconName: "infinity", text: "Full Lifetime Access & Ongoing Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" },
  ],
  modules: detailModules,
  testimonials: [
    {
      name: "Marcus Vance",
      role: "Founder, Peak Performance Systems",
      rating: 5,
      quote:
        "The Missed-Call Text-Back engine and Google Review Harvester closed 3 local HVAC contractors in my first two weeks. Charging $1,800 setup and $299/month each. This curriculum is gold.",
      initials: "MV",
      date: "October 2026",
    },
    {
      name: "Rachel Thorne",
      role: "Managing Director, Local Growth Lab",
      rating: 5,
      quote:
        "The Secret Shopper outreach strategy is genius. Calling 10 roofers at 6:30 PM and recording their missed call response got me 4 discovery calls and 2 signed deals within 5 days.",
      initials: "RT",
      date: "October 2026",
    },
  ],
  faqs: [
    {
      question: "Which of the 12 services is easiest to sell first to small businesses?",
      answer:
        "Service #1 (Autonomous Missed-Call AI Text-Back) and Service #4 (Google Review Harvester) are by far the easiest beachhead offers. Every local contractor understands that missing phone calls costs them money and that 5-star Google reviews drive their business.",
    },
    {
      question: "Do I need to write custom software code to build these 12 services?",
      answer:
        "No. You will build these systems using the standardized SMB tech stack: Twilio for telephony/SMS, Make.com for workflow orchestration, Claude 3.7 / GPT-4o for cognitive intelligence, and Airtable / Google Sheets for state management.",
    },
    {
      question: "Are slide decks and written guides included for all lessons?",
      answer:
        "Yes! Every single one of the ${totalLessonsCount} lessons contains both a complete visual slide presentation and an extensive, publication-grade written lesson switchable in real time.",
    },
    {
      question: "How do I price these services to local business clients?",
      answer:
        "Module 6 provides our complete 3-Tier Bundle framework: Bundle 1 (Revenue Leakage Shield) at $1,800 setup + $299/mo; Bundle 2 (Cash Flow Accelerator) at $2,800 setup + $399/mo; and Bundle 3 (Complete Autonomous OS) at $4,800 setup + $699/mo.",
    },
  ],
};

export const DETAIL_SMB_SERVICES_DATA = SMB_SERVICES_DETAIL_DATA;

export const SMB_SERVICES_COURSE: Course = {
  id: SMB_SERVICES_ID,
  slug: SMB_SERVICES_SLUG,
  categorySlug: "ai-businesses",
  categoryName: "AI Businesses",
  title: "${courseTitle}",
  shortTitle: "12 AI Services for Small Businesses",
  audience: "Agency Founders, Consultants & Operators",
  targetGender: "for-all",
  headline:
    "Master the technical architectures, delivery blueprints, and commercial packaging for 12 high-impact AI services small businesses urgently need and gladly pay for.",
  subheadline:
    "An exhaustive operational guide teaching you how to architect, package, and sell 12 essential AI services for local businesses to build a predictable $15,000/month recurring agency.",
  description:
    "A comprehensive curriculum detailing how to build, sell, deliver, and scale 12 essential automation services for local small businesses.",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  badge: "Bestseller",
  rating: 4.9,
  ratingCount: 358,
  hoursOfMaterial: "7.0 hours",
  modulesCount: ${processedModules.length},
  lessonsCount: ${totalLessonsCount},
  primaryColor: "#059669",
  accentColor: "#d97706",
  outcomes: [
    "Build and deploy all 12 high-demand SMB automation services",
    "Master Twilio telephony webhooks and 15-second missed-call text-backs",
    "Automate Google review harvesting and sentiment-filtered routing",
    "Extract and sync vendor invoices directly into QuickBooks and Xero",
    "Package services into 3 irresistible high-margin bundles",
    "Land local business clients using the proven 'Secret Shopper' teardown method",
  ],
  modules: courseModules,
  testimonials: [
    {
      name: "Marcus Vance",
      role: "Founder, Peak Performance Systems",
      quote:
        "The Missed-Call Text-Back engine and Google Review Harvester closed 3 local HVAC contractors in my first two weeks. Charging $1,800 setup and $299/month each. This curriculum is gold.",
      handle: "@mvance_ai",
    },
  ],
};
`;

fs.writeFileSync(path.join(__dirname, '../src/lib/playbooks/smb-services-data.ts'), fileContent, 'utf8');
console.log("Updated src/lib/playbooks/smb-services-data.ts successfully!");
