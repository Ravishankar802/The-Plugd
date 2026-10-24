const fs = require('fs');
const path = require('path');
const { courseTitle, courseId, courseSlug, modulesData } = require('./generate-playbook-8.cjs');
const { createLesson } = require('./curriculum-builder-helper.cjs');

console.log("Writing Playbook 8 (local-chatbots-data.ts)...");

const processedModules = modulesData.map((m) => {
  const lessons = m.lessons.map((l) => {
    return createLesson({
      modNum: m.num,
      lesNum: l.lesNum,
      title: l.title,
      duration: l.duration,
      summary: l.summary,
      bulletPoints: l.bulletPoints,
      takeaway: l.takeaway,
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

export const LOCAL_CHATBOTS_SLUG = "${courseSlug}";
export const LOCAL_CHATBOTS_ID = "${courseId}";

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

export const LOCAL_CHATBOTS_DETAIL_DATA: PlaybookDetailData = {
  id: LOCAL_CHATBOTS_ID,
  slug: LOCAL_CHATBOTS_SLUG,
  title: "${courseTitle}",
  headline:
    "Master the complete no-code operational system to build, package, and sell high-converting AI receptionists and chatbots to 10 local businesses without writing software code.",
  description:
    "A comprehensive, highly actionable masterclass detailing how to launch a profitable local AI chatbot agency without hiring software engineers. Learn how to architect smart visual chatbots in Voiceflow, engineer RAG knowledge bases with zero hallucinations, automate calendar booking and SMS owner alerts, deploy the high-converting 'Trojan Horse' live sandbox demo, package $750 setup fees with $150/month retainers, and scale to 25+ local clients.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "Bestseller",
  rating: 4.9,
  ratingCount: 395,
  studentsCount: "1,940",
  instructorName: "Plugd Local Systems Collective",
  instructorTitle: "Local Business Automation Specialists & Agency Mentors",
  instructorBio:
    "The Plugd Local Systems Collective advises hundreds of local service agencies and consultants across the United States, engineering thousands of local chatbot deployments and millions in recurring B2B retainer revenue.",
  instructorRating: 4.9,
  instructorReviews: "395",
  instructorStudents: "1,940",
  instructorCourses: 6,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "7.0 hours",
  modulesCount: ${processedModules.length},
  lessonsCount: ${totalLessonsCount},
  whatYouWillLearn: [
    "Build complete, production-ready AI chatbots in Voiceflow without writing a single line of software code",
    "Ingest business menus, service price lists, and FAQs into vector knowledge bases with zero hallucinations",
    "Integrate interactive calendar scheduling (Calendly / Google Calendar) directly inside the customer chat window",
    "Deploy instant 90-second owner notifications via Twilio SMS and branded email transcripts",
    "Build and execute the 'Trojan Horse' strategy: building custom live demo bots before outreach to land 40%+ responses",
    "Deliver personalized 3-minute Loom video teardowns that make saying no practically impossible for business owners",
    "Package the irresistible $750 setup + $150/month recurring retainer model with 90%+ gross profit margins",
    "Embed chatbots on WordPress, Squarespace, Wix, Shopify, and Webflow in under 5 minutes",
    "Scale to 25+ recurring monthly retainers generating $4,000 to $6,000/month in under 6 hours of weekly maintenance",
  ],
  relatedTopics: [
    "AI Chatbots",
    "Voiceflow & Botpress",
    "Local Business Agency",
    "RAG Knowledge Bases",
    "Monthly Retainers",
    "No-Code Automation",
  ],
  requirements: [
    "No computer science degree, machine learning background, or programming knowledge required",
    "A computer with internet access and a free account on Voiceflow",
    "Willingness to research local businesses and record short 3-minute video demos",
  ],
  descriptionSections: {
    intro: [
      "Every single day, local businesses—dentists, cosmetic clinics, commercial roofers, plumbing companies, and boutique law firms—lose dozens of high-value inquiries because over 50% of consumers browse websites after 5:00 PM when offices are closed.",
      "Traditional static 'Contact Us' forms have abysmal conversion rates. Consumers want immediate answers to questions regarding pricing, hours, insurance, and availability. When they don't get answers, they bounce to a competitor.",
      "In this complete Playbook, you will learn how to build, sell, and deploy intelligent 24/7 AI receptionists using visual no-code tools like Voiceflow. You'll master our proprietary 'Trojan Horse' demo strategy, deploy frictionless $750 setups with $150/month retainers, and scale your agency to 10 to 25 paying local clients.",
    ],
    keyPointsTitle: "Comprehensive ${processedModules.length}-Module Curriculum Roadmap",
    keyPoints: [
      "Module 1: The Local Chatbot Opportunity & No-Code Builder Architecture",
      "Module 2: Knowledge Base Engineering & Local RAG Architecture",
      "Module 3: Lead Capture, Booking Integrations & CRM Handshakes",
      "Module 4: The 'Trojan Horse' Live Sandbox Demo Strategy",
      "Module 5: Local Client Outreach, Loom Audits & The 10-Client Pipeline",
      "Module 6: The Local Business Pricing Playbook: $750 Setup + $150/Month Retainer",
      "Module 7: Client Onboarding, Hand-Off Protocols & Scaling to 25+ Local Retainers",
    ],
    closing: [
      "Every lesson features interactive visual presentation slides and an exhaustive, production-grade written guide packed with copy-paste Voiceflow templates, client cold outreach scripts, and 1-page service agreements.",
      "Follow this proven system to sign your first 10 local business clients without writing code or hiring software engineers.",
    ],
  },
  targetAudience: [
    "Solo operators and aspiring agency founders wanting a fast, non-technical path to recurring revenue",
    "Freelancers and local marketers seeking to add high-margin AI chatbot services to their client roster",
    "Non-technical builders who want to monetize AI without learning Python, Docker, or machine learning math",
  ],
  includes: [
    { iconName: "layers", text: "${processedModules.length} Comprehensive Modules & ${totalLessonsCount} Structured Lessons" },
    { iconName: "file-text", text: "Interactive Slide Presentations & Full Written Guides" },
    { iconName: "video", text: "Complete Voiceflow Blueprints, Trojan Horse Scripts & SOW Agreements" },
    { iconName: "smartphone", text: "Optimized for Mobile, Tablet & Desktop Learning" },
    { iconName: "infinity", text: "Full Lifetime Access & Ongoing Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" },
  ],
  modules: detailModules,
  testimonials: [
    {
      name: "Jordan Lee",
      role: "Founder, Apex Local Bots",
      rating: 5,
      quote:
        "The Trojan Horse demo strategy is unreal. Built 4 live prototype demos for local dental clinics on a Saturday, sent the Loom videos Monday morning, and had 2 signed $750 setups + $150/mo retainers by Wednesday afternoon.",
      initials: "JL",
      date: "October 2026",
    },
    {
      name: "Hannah Schmidt",
      role: "Digital Systems Consultant",
      rating: 5,
      quote:
        "I was terrified of coding, but Voiceflow and the RAG knowledge base chapter made everything so intuitive. I now manage 14 local business chatbots in under 4 hours a week. The recurring cash flow is incredible.",
      initials: "HS",
      date: "October 2026",
    },
  ],
  faqs: [
    {
      question: "Do I really not need to know how to code to build these chatbots?",
      answer:
        "Yes, absolutely. You will use visual canvas builders like Voiceflow that allow you to drag and drop conversation blocks, connect buttons, and ingest knowledge base documents without writing any JavaScript or Python.",
    },
    {
      question: "What makes local business owners actually want to buy this?",
      answer:
        "Local business owners lose thousands of dollars every week from after-hours website visitors who bounce. Showing them a live bot branded with their own logo that answers questions and books appointments 24/7 makes the $150/month retainer an absolute no-brainer investment.",
    },
    {
      question: "Are slide decks and written guides included for all lessons?",
      answer:
        "Yes! Every single one of the ${totalLessonsCount} lessons provides a full visual slide presentation and an in-depth, production-grade written lesson switchable in real time.",
    },
    {
      question: "How long does it take to deploy a client's bot once they sign?",
      answer:
        "By following our 48-Hour Rapid Onboarding assembly line in Module 7, you can customize your pre-built vertical template, embed the script tag on their website, and test the entire system in under 2 hours of actual working time.",
    },
  ],
};

export const DETAIL_LOCAL_CHATBOTS_DATA = LOCAL_CHATBOTS_DETAIL_DATA;

export const LOCAL_CHATBOTS_COURSE: Course = {
  id: LOCAL_CHATBOTS_ID,
  slug: LOCAL_CHATBOTS_SLUG,
  categorySlug: "ai-businesses",
  categoryName: "AI Businesses",
  title: "${courseTitle}",
  shortTitle: "Sell AI Chatbots to 10 Local Businesses",
  audience: "Agency Founders, Freelancers & Non-Technical Builders",
  targetGender: "for-all",
  headline:
    "Master the complete no-code operational system to build, package, and sell high-converting AI receptionists and chatbots to 10 local businesses without writing software code.",
  subheadline:
    "An exhaustive operational guide teaching you how to architect, package, and sell 24/7 AI chatbots to local businesses, secure $750 setups with $150/month retainers, and scale to 25+ clients.",
  description:
    "A comprehensive curriculum detailing how to build, sell, deliver, and scale no-code local business AI chatbots.",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  badge: "Bestseller",
  rating: 4.9,
  ratingCount: 395,
  hoursOfMaterial: "7.0 hours",
  modulesCount: ${processedModules.length},
  lessonsCount: ${totalLessonsCount},
  primaryColor: "#0284c7",
  accentColor: "#f59e0b",
  outcomes: [
    "Build complete, production-ready AI chatbots in Voiceflow with zero coding",
    "Ingest local business knowledge into RAG vector databases with zero hallucinations",
    "Integrate interactive calendar scheduling and 90-second SMS owner alerts",
    "Execute the 'Trojan Horse' pre-outreach demo strategy achieving 40%+ reply rates",
    "Package the irresistible $750 setup + $150/month recurring retainer offer",
    "Scale to 25+ local business retainers in under 6 hours of weekly maintenance",
  ],
  modules: courseModules,
  testimonials: [
    {
      name: "Jordan Lee",
      role: "Founder, Apex Local Bots",
      quote:
        "The Trojan Horse demo strategy is unreal. Built 4 live prototype demos for local dental clinics on a Saturday, sent the Loom videos Monday morning, and had 2 signed $750 setups + $150/mo retainers by Wednesday afternoon.",
      handle: "@jordanlee_ai",
    },
  ],
};
`;

fs.writeFileSync(path.join(__dirname, '../src/lib/playbooks/local-chatbots-data.ts'), fileContent, 'utf8');
console.log("Updated src/lib/playbooks/local-chatbots-data.ts successfully!");
