import type { PlaybookDetailData, PlaybookDetailModule } from "./dating-playbook-detail";
import { AI_AUTOMATIONS_MODULES_METADATA } from "./ai-automations-curriculum";

const detailModules: PlaybookDetailModule[] = AI_AUTOMATIONS_MODULES_METADATA.map((m) => ({
  id: m.id,
  number: m.number,
  title: m.title,
  description: m.description,
  duration: m.duration,
  lessons: m.lessons.map((l) => ({
    id: l.id,
    number: l.number,
    title: l.title,
    duration: l.duration,
    isPreview: l.id === "01-1",
  })),
}));

export const AI_AUTOMATIONS_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-01",
  slug: "7-ai-automations",
  title: "7 AI Automation Tools That Could Make You $10,000+",
  headline: "Learn 7 accessible AI automation tools to save businesses time, offer simple services, and build real income streams.",
  description:
    "A step-by-step, no-code playbook teaching complete beginners how to master 7 practical AI automation tools. Learn how to connect everyday business apps, build custom assistants, automate social media DMs, repurpose videos, and land paying clients with zero coding experience.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "Bestseller",
  rating: 4.9,
  ratingCount: 384,
  studentsCount: "1,420",
  instructorName: "Plugd Automation Team",
  instructorTitle: "No-Code Workflow Specialists & Digital Creators",
  instructorBio:
    "The Plugd Automation Team specializes in helping everyday freelancers, creators, and professionals simplify repetitive work, master visual AI tools, and package high-demand digital services without writing code.",
  instructorRating: 4.9,
  instructorReviews: "384",
  instructorStudents: "1,420",
  instructorCourses: 1,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "", // Preserved empty thumbnail per specification
  hoursOfMaterial: "6.5 hours",
  modulesCount: 9,
  lessonsCount: 36,
  whatYouWillLearn: [
    "Master 7 beginner-friendly, accessible AI automation tools with zero coding required",
    "Connect everyday business apps like Google Forms, Sheets, and Gmail to run on autopilot with Make.com",
    "Build customized AI assistants for real estate agents, consultants, and coaches with Custom GPTs",
    "Create automated Instagram comment-to-DM funnels that capture customer leads 24/7 with ManyChat",
    "Organize chaotic business operations into clean, centralized company hubs with Notion AI",
    "Turn 1 long video or podcast into 10 viral short-form clips with animated captions in minutes using Opus Clip",
    "Bulk-generate 30 branded social media graphics and carousels in under 5 minutes with Canva Magic Studio",
    "Conduct cited competitor research and compile verified 50-prospect B2B lead lists using Perplexity AI",
    "Package simple 'Fix One Headache' offers and find your first 3 paying clients without paid ads",
    "Break down the $10,000 income milestone into realistic, achievable client projects and retainers",
  ],
  relatedTopics: [
    "AI Automation",
    "No-Code Tools",
    "Make.com & Zapier",
    "Custom GPTs",
    "ManyChat & Social Media",
    "Freelancing & Side Hustles",
  ],
  requirements: [
    "No coding, programming, or previous technical experience required",
    "No expensive software or API subscriptions needed to start learning",
    "A computer with internet access and a free Google account",
  ],
  descriptionSections: {
    intro: [
      "You don't need a computer science degree, programming skills, or years of business experience to make money with AI automation. The modern software landscape has evolved so that anyone who knows how to connect friendly, visual tools can solve real, painful problems for small businesses and creators.",
      "Everyday business owners—from local contractors and dental clinics to online fitness coaches and podcasters—are drowning in repetitive administrative tasks. They waste 10 to 20 hours every week copying data, captioning clips, answering repetitive DMs, and formatting documents.",
      "7 AI Automation Tools That Could Make You $10,000+ is a practical, beginner-friendly roadmap that teaches you 7 distinct, accessible tools. You will learn not only how each tool works, but exactly how to package it into a valuable service, find paying clients, and build toward the $10,000 milestone.",
    ],
    keyPointsTitle: "Comprehensive 7-Tool Curriculum",
    keyPoints: [
      "Foundations: The economics of saved time, no-code concepts, and the realistic $10,000 roadmap",
      "Tool 1 (Make.com): Visual workflow automation, instant form-to-sheet sync, and lead notification alerts",
      "Tool 2 (Custom GPTs): Specialized AI assistants with pre-loaded guidelines and reference files",
      "Tool 3 (ManyChat): Automated Instagram comment-to-DM lead funnels and email capture",
      "Tool 4 (Notion AI): Client project hubs, Kanban task boards, and automated meeting notes",
      "Tool 5 (Opus Clip & Descript): Automated vertical video extraction, smart cropping, and animated captions",
      "Tool 6 (Canva Magic Studio): Bulk-creating 30 branded graphics and monthly social media asset bundles",
      "Tool 7 (Perplexity AI): Fast market research, local competitor audits, and 50-lead prospect dossiers",
      "Client Acquisition: The 'Fix One Headache' model, warm outreach methods, pricing, and client handovers",
    ],
    closing: [
      "Every single lesson includes both an interactive, executive slide presentation deck and a comprehensive, step-by-step written guide complete with click-by-click instructions, real-world examples, and practical action tasks.",
      "Whether you are a student looking for an extra income stream, an employee building a weekend side hustle, or a freelancer looking to offer simple, high-demand services, this Playbook gives you the exact skills and confidence to get started today.",
    ],
  },
  targetAudience: [
    "Complete beginners who have never used AI automation tools before",
    "Students and individuals looking for an additional source of online income",
    "Freelancers who want to offer simple, high-value automation services to their clients",
    "Employees who want to build a flexible digital side business outside their day job",
    "Aspiring entrepreneurs who want to use AI tools to solve everyday small business problems",
  ],
  includes: [
    { iconName: "video", text: "6.5 hours of structured curriculum" },
    { iconName: "file-text", text: "36 dual-format lessons (Slide Decks & Written Guides)" },
    { iconName: "layers", text: "Step-by-step walkthroughs, prompt templates & checklists" },
    { iconName: "smartphone", text: "Full responsive access on desktop, tablet & mobile" },
    { iconName: "infinity", text: "Lifetime access with all future module updates included" },
    { iconName: "shield-check", text: "Beginner-friendly action tasks & client outreach scripts" },
  ],
  modules: detailModules,
  testimonials: [
    {
      name: "Marcus Vance",
      role: "Freelance Consultant",
      rating: 5,
      initials: "MV",
      date: "2 weeks ago",
      quote:
        "The step-by-step walkthroughs make everything click. Setting up the Make.com lead notification took me 30 minutes, and I closed my first local contractor client for $450 the following week.",
    },
    {
      name: "Devon Reed",
      role: "Agency Founder",
      rating: 5,
      initials: "DR",
      date: "1 month ago",
      quote:
        "The explanation of how to package simple services without tech jargon is worth 100x the price. Breaking down $10,000 into bite-sized projects makes the goal feel completely realistic.",
    },
    {
      name: "Elena Rostova",
      role: "Social Media Freelancer",
      rating: 5,
      initials: "ER",
      date: "3 weeks ago",
      quote:
        "The ManyChat and Opus Clip walkthroughs are gold. I set up a weekly video repurposing retainer for a local coach at $600/month. So accessible for beginners!",
    },
  ],
  faqs: [
    {
      question: "What is included in 7 AI Automation Tools That Could Make You $10,000+?",
      answer:
        "The Playbook contains 9 beginner-friendly modules and 36 complete lessons with interactive slide presentations and in-depth written walkthroughs, step-by-step screenshots, real-world pricing guides, and practical action tasks covering 7 distinct no-code AI tools.",
    },
    {
      question: "Do I need any programming or technical skills to use this Playbook?",
      answer:
        "No. There are zero prerequisites. You do not need to know coding, software engineering, APIs, or databases. All 7 tools are visual, drag-and-drop, or conversational tools that anyone with a computer can master.",
    },
    {
      question: "Why does the title say 'Could Make You $10,000+'?",
      answer:
        "The $10,000 figure is a realistic cumulative milestone broken down mathematically throughout the course (for example, 10 client projects at $1,000 each, or 5 monthly clients on a $400/month retainer over 5 months). It is an achievable target based on real client services, not an overnight guarantee.",
    },
    {
      question: "Is this a one-time purchase?",
      answer:
        "Yes, exactly $3 USD one-time payment with lifetime access. Includes both the presentation slide decks and comprehensive written guides with all future updates.",
    },
  ],
};
