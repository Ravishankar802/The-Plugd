export interface PlaybookLessonMeta {
  id: string;
  number: string;
  title: string;
  duration: string;
}

export interface PlaybookModuleMeta {
  id: string;
  number: string;
  title: string;
  description: string;
  duration: string;
  lessons: PlaybookLessonMeta[];
}

export const AI_AUTOMATIONS_MODULES_METADATA: PlaybookModuleMeta[] = [
  {
    id: "module-01",
    number: "01",
    title: "Getting Started with AI Automation & The $10,000 Milestone",
    description:
      "Understand what AI automation is in plain English, why everyday businesses pay for it, how the math to $10,000 works, and how complete beginners can start with zero coding.",
    duration: "40 min",
    lessons: [
      { id: "01-1", number: "1.1", title: "What AI Automation Really Is (And Why You Don't Need Coding Skills)", duration: "10 min" },
      { id: "01-2", number: "1.2", title: "How Businesses Value Automation: The Math of Saved Hours", duration: "10 min" },
      { id: "01-3", number: "1.3", title: "The $10,000 Roadmap: Breaking Big Goals into Realistic Client Projects", duration: "10 min" },
      { id: "01-4", number: "1.4", title: "The Problem-Solver Mindset: Fixing Annoying Tasks vs Selling AI Hype", duration: "10 min" },
    ],
  },
  {
    id: "module-02",
    number: "02",
    title: "Tool 1: Make.com — Visual No-Code Workflows on Autopilot",
    description:
      "Learn how to visually connect everyday apps like Google Sheets, Gmail, Forms, and Slack to run tasks automatically without writing a single line of code.",
    duration: "44 min",
    lessons: [
      { id: "02-1", number: "2.1", title: "What Make.com Is and What Beginners Can Build in 30 Minutes", duration: "11 min" },
      { id: "02-2", number: "2.2", title: "Step-by-Step: Connecting Google Forms to Instant Email & Spreadsheet Alerts", duration: "11 min" },
      { id: "02-3", number: "2.3", title: "Real-World Service: Automated Lead Notification Systems for Local Businesses", duration: "11 min" },
      { id: "02-4", number: "2.4", title: "Pricing Your Workflow, Free Plan Tips, and Your First Action Task", duration: "11 min" },
    ],
  },
  {
    id: "module-03",
    number: "03",
    title: "Tool 2: Custom GPTs — Building Tailored AI Assistants Anyone Can Use",
    description:
      "Create specialized AI helpers loaded with custom instructions and reference documents that solve specific everyday tasks for consultants, agents, and creators.",
    duration: "42 min",
    lessons: [
      { id: "03-1", number: "3.1", title: "Understanding Custom GPTs: How They Differ from Generic Chatbots", duration: "10 min" },
      { id: "03-2", number: "3.2", title: "Step-by-Step: Building an Assistant with Custom Knowledge Files", duration: "11 min" },
      { id: "03-3", number: "3.3", title: "Real-World Service: Creating Industry Assistants for Real Estate & Coaches", duration: "11 min" },
      { id: "03-4", number: "3.4", title: "How to Package & Sell Assistants, Workarounds for Free Users & Action Task", duration: "10 min" },
    ],
  },
  {
    id: "module-04",
    number: "04",
    title: "Tool 3: ManyChat — Automated DMs & Lead Funnels on Instagram",
    description:
      "Set up automatic Instagram and Facebook direct message sequences that respond to comments, deliver free resources, and collect customer contacts 24/7.",
    duration: "43 min",
    lessons: [
      { id: "04-1", number: "4.1", title: "Why Automated DMs Convert 5x Better Than Links in Bio", duration: "10 min" },
      { id: "04-2", number: "4.2", title: "Step-by-Step: Setting Up a 'Comment KEYWORD to Get Link' Flow", duration: "11 min" },
      { id: "04-3", number: "4.3", title: "Real-World Service: Setting Up Lead Funnels for Local Clinics & Creators", duration: "11 min" },
      { id: "04-4", number: "4.4", title: "Instagram Guidelines, Pricing Your Setup, and Your Action Task", duration: "11 min" },
    ],
  },
  {
    id: "module-05",
    number: "05",
    title: "Tool 4: Notion AI — Building Client Workspaces & Operations Hubs",
    description:
      "Transform messy spreadsheets and email threads into clean, organized Notion operating systems equipped with AI summarization and project tracking.",
    duration: "42 min",
    lessons: [
      { id: "05-1", number: "5.1", title: "The Small Business Organization Headache and How Notion Solves It", duration: "10 min" },
      { id: "05-2", number: "5.2", title: "Step-by-Step: Building a Clean Client Project Hub with AI Summaries", duration: "11 min" },
      { id: "05-3", number: "5.3", title: "Real-World Service: Selling Turnkey Business Operating Hubs", duration: "11 min" },
      { id: "05-4", number: "5.4", title: "Sharing Templates, Free Tier Capabilities, and Your Action Task", duration: "10 min" },
    ],
  },
  {
    id: "module-06",
    number: "06",
    title: "Tool 5: Opus Clip & Descript — Automated Video Repurposing",
    description:
      "Turn 1 long podcast, video, or presentation into 10 viral short-form clips with animated captions, hooks, and clean audio in minutes.",
    duration: "45 min",
    lessons: [
      { id: "06-1", number: "6.1", title: "The Short-Form Content Bottleneck: Why Creators and Businesses Need Help", duration: "11 min" },
      { id: "06-2", number: "6.2", title: "Step-by-Step: Extracting 10 Polished Clips with Animated Captions", duration: "12 min" },
      { id: "06-3", number: "6.3", title: "Real-World Service: Offering a Monthly Video Repurposing Retainer", duration: "11 min" },
      { id: "06-4", number: "6.4", title: "Quality Checkpoints, Free Credits Tips, and Your Action Task", duration: "11 min" },
    ],
  },
  {
    id: "module-07",
    number: "07",
    title: "Tool 6: Canva Magic Studio — Automated Design & Content Bundles",
    description:
      "Use AI bulk-creation and smart templates to generate dozens of cohesive social media posts, presentations, and marketing banners in minutes.",
    duration: "42 min",
    lessons: [
      { id: "07-1", number: "7.1", title: "Speed Over Manual Design: How Bulk Creation Saves 10+ Hours a Week", duration: "10 min" },
      { id: "07-2", number: "7.2", title: "Step-by-Step: Bulk Creating 30 Branded Social Posts in 5 Minutes", duration: "11 min" },
      { id: "07-3", number: "7.3", title: "Real-World Service: Selling Monthly Content & Marketing Bundles", duration: "11 min" },
      { id: "07-4", number: "7.4", title: "Brand Consistency Rules, Free vs Pro Features, and Your Action Task", duration: "10 min" },
    ],
  },
  {
    id: "module-08",
    number: "08",
    title: "Tool 7: Perplexity & Research AI — Fast Market Research & Lead Lists",
    description:
      "Conduct quick, cited market research and compile structured prospect lists for local businesses and agencies in a fraction of the time.",
    duration: "41 min",
    lessons: [
      { id: "08-1", number: "8.1", title: "Turning Internet Research into High-Value Business Intelligence", duration: "10 min" },
      { id: "08-2", number: "8.2", title: "Step-by-Step: Compiling a Verified 50-Prospect Lead List with AI", duration: "11 min" },
      { id: "08-3", number: "8.3", title: "Real-World Service: Providing Competitor Summaries & Sourced Lead Dossiers", duration: "10 min" },
      { id: "08-4", number: "8.4", title: "Verifying Facts, Free Search Techniques, and Your Action Task", duration: "10 min" },
    ],
  },
  {
    id: "module-09",
    number: "09",
    title: "Landing Clients, Packaging Services & Building to $10,000+",
    description:
      "Learn how to package simple automation services, find your first paying clients without paid ads, price your work fairly, and build toward the $10,000 milestone.",
    duration: "44 min",
    lessons: [
      { id: "09-1", number: "9.1", title: "Packaging Simple Offers: The 'Fix One Headache' Service Model", duration: "11 min" },
      { id: "09-2", number: "9.2", title: "Where to Find Your First 3 Clients Without Cold Calling or Paid Ads", duration: "11 min" },
      { id: "09-3", number: "9.3", title: "How to Price Confidently: One-Off Setup Fees vs Monthly Retainers", duration: "11 min" },
      { id: "09-4", number: "9.4", title: "The Client Handover Checklist: Delivering Work That Gets Referrals", duration: "11 min" },
    ],
  },
];
