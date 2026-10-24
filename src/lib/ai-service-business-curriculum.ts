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

export const AI_SERVICE_BUSINESS_MODULES_METADATA: PlaybookModuleMeta[] = [
  {
    id: "module-01",
    number: "01",
    title: "The $10,000/Month Business Model & Unit Economics",
    description:
      "Understand the realistic mathematics behind a $10K/month recurring AI service firm, why high-margin retainers beat cheap one-off gigs, and how to select profitable B2B niches.",
    duration: "45 min",
    lessons: [
      { id: "01-1", number: "1.1", title: "The $10K MRR Math: Why 5–8 High-Ticket Retainers Beat 100 Cheap Micro-Gigs", duration: "11 min" },
      { id: "01-2", number: "1.2", title: "The Service-as-a-System Model: Turning Chaotic Custom Work into Repeatable Assets", duration: "11 min" },
      { id: "01-3", number: "1.3", title: "Choosing Your Profitable Niche: Identifying Businesses with $50K+ Monthly Overhead", duration: "11 min" },
      { id: "01-4", number: "1.4", title: "Diagnosing Costly Operational Bottlenecks: The 3 Headaches Owners Eagerly Pay to Fix", duration: "12 min" },
    ],
  },
  {
    id: "module-02",
    number: "02",
    title: "The 3 Core Tools Architecture & Tool Selection Rationale",
    description:
      "Master the high-leverage 3-tool tech stack (Airtable + Claude 3.7 + Make.com) that gives a solo operator enterprise-grade automation and data infrastructure capabilities.",
    duration: "48 min",
    lessons: [
      { id: "02-1", number: "2.1", title: "Why Just 3 Core Tools: Eliminating Tech Chaos to Build Predictable Solutions", duration: "12 min" },
      { id: "02-2", number: "2.2", title: "Core Tool 1 (Airtable): Architecting Relational Hubs, Portals & Clean Data Schemas", duration: "12 min" },
      { id: "02-3", number: "2.3", title: "Core Tool 2 (Claude 3.7): Advanced Reasoning, Structured JSON & Cognitive Extraction", duration: "12 min" },
      { id: "02-4", number: "2.4", title: "Core Tool 3 (Make.com): The Autonomous Cloud Nervous System Connecting Apps to AI", duration: "12 min" },
    ],
  },
  {
    id: "module-03",
    number: "03",
    title: "Building The Core Service Deliverables",
    description:
      "Step-by-step technical blueprints for building the 3 most requested high-value client workflows with zero code: lead qualification, intelligence synthesis, and content pipelines.",
    duration: "52 min",
    lessons: [
      { id: "03-1", number: "3.1", title: "Deliverable 1: The Automated Inbound Lead Triaging & Instant Proposal Engine", duration: "13 min" },
      { id: "03-2", number: "3.2", title: "Deliverable 2: The Executive Knowledge Extraction & Market Intelligence Dossier", duration: "13 min" },
      { id: "03-3", number: "3.3", title: "Deliverable 3: Multi-Channel Content Repurposing & Client Approval Portals", duration: "13 min" },
      { id: "03-4", number: "3.4", title: "System Reliability Engineering: Error Handling, Data Fallbacks & Client Safeguards", duration: "13 min" },
    ],
  },
  {
    id: "module-04",
    number: "04",
    title: "Packaging, Pricing & Transparent Unit Economics",
    description:
      "Craft irresistible B2B offers, structure flat setup sprints plus recurring monthly management retainers, and maintain 85%+ profit margins with low overhead.",
    duration: "46 min",
    lessons: [
      { id: "04-1", number: "4.1", title: "The Three-Tier Offer Architecture: Sprint Setup, Core Pipeline, & Full Operational Partner", duration: "11 min" },
      { id: "04-2", number: "4.2", title: "Pricing for $10,000/Month: Flat Implementation Fees ($1,500–$3,500) + Monthly Retainers ($750–$1,500)", duration: "12 min" },
      { id: "04-3", number: "4.3", title: "Tool Expenses, Margins & Overhead: Running at 88%+ Net Profit Margins", duration: "11 min" },
      { id: "04-4", number: "4.4", title: "Crafting bulletproof SOWs & Service Agreements: Scope Creep Prevention & Payment Terms", duration: "12 min" },
    ],
  },
  {
    id: "module-05",
    number: "05",
    title: "Portfolio Building & Risk-Free Client Acquisition",
    description:
      "Generate high-intent B2B prospect conversations using interactive proof-of-concept demos and frictionless video audits—without fabricating fake case studies.",
    duration: "48 min",
    lessons: [
      { id: "05-1", number: "5.1", title: "Building Interactive Proof-of-Concept Prototypes Without Fabricating Fake Clients", duration: "12 min" },
      { id: "05-2", number: "5.2", title: "The Frictionless Video Audit: Pitching Prospects with 3-Minute Loom Breakdowns", duration: "12 min" },
      { id: "05-3", number: "5.3", title: "B2B Multi-Channel Outreach: Warm Referrals, Founder Communities & Targeted LinkedIn", duration: "12 min" },
      { id: "05-4", number: "5.4", title: "The 20-Minute Discovery Call Framework: Diagnosing Pain Without Hard-Selling", duration: "12 min" },
    ],
  },
  {
    id: "module-06",
    number: "06",
    title: "Closing Deals, Client Onboarding & High-Retention Management",
    description:
      "Handle enterprise security and data privacy questions with ease, deliver a seamless 7-day client onboarding experience, and expand accounts into compounding recurring retainers.",
    duration: "46 min",
    lessons: [
      { id: "06-1", number: "6.1", title: "Proposal Presentation & Objection Handling: Tackling Privacy, Hallucinations & Costs", duration: "11 min" },
      { id: "06-2", number: "6.2", title: "Day 1 to Day 7 Client Onboarding: Setting Expectations & Gathering API Credentials", duration: "12 min" },
      { id: "06-3", number: "6.3", title: "Delivering Shock-and-Awe Quality: Automated Weekly Reports & Quantified Time-Saved Metrics", duration: "11 min" },
      { id: "06-4", number: "6.4", title: "The Retainer Expansion Playbook: How 1 Client Expands from $1,000 to $2,500/Month", duration: "12 min" },
    ],
  },
  {
    id: "module-07",
    number: "07",
    title: "Internal Operations, Scaling & The 90-Day Implementation Roadmap",
    description:
      "Automate your own agency operations, deliver for 8 active retainers in under 20 hours a week, and execute the exact 90-day roadmap to reach $10,000 monthly revenue.",
    duration: "45 min",
    lessons: [
      { id: "07-1", number: "7.1", title: "Automating Your Own Agency: Auto-Invoicing, Delivery Tracking & CRM in Airtable", duration: "11 min" },
      { id: "07-2", number: "7.2", title: "Delivery Capacity & Time Allocation: Managing 8 Active Retainers in Under 20 Hours a Week", duration: "11 min" },
      { id: "07-3", number: "7.3", title: "The 7 Deadly Mistakes New AI Service Founders Make (And How to Prevent Them)", duration: "11 min" },
      { id: "07-4", number: "7.4", title: "The 90-Day Step-by-Step Action Roadmap to Your First $10,000 Month", duration: "12 min" },
    ],
  },
];
