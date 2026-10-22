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
    title: "The Economics & Architecture of $10,000+ AI Automations",
    description:
      "Understand the commercial thresholds that make businesses gladly invest $10,000+ in AI automations, the core tech stack, and risk guardrails.",
    duration: "42 min",
    lessons: [
      { id: "01-1", number: "1.1", title: "The $10,000 Value Threshold: Solving Pains vs Selling Prompts", duration: "10 min" },
      { id: "01-2", number: "1.2", title: "Enterprise Automation Tech Stack: Orchestration, Models & Memory", duration: "11 min" },
      { id: "01-3", number: "1.3", title: "Feasibility, Latency, Failure Modes & Guardrails", duration: "10 min" },
      { id: "01-4", number: "1.4", title: "Client Infrastructure Discovery & Integration Scoping", duration: "11 min" },
    ],
  },
  {
    id: "module-02",
    number: "02",
    title: "Automation 1: Omnichannel Customer Intelligence & Resolution Engine",
    description:
      "Architect and deploy a mission-critical customer resolution engine across email, webchat, and WhatsApp with CRM sync and human-in-the-loop triage.",
    duration: "45 min",
    lessons: [
      { id: "02-1", number: "2.1", title: "Commercial Impact: Slashing Support TCO While Boosting Velocity", duration: "10 min" },
      { id: "02-2", number: "2.2", title: "System Architecture: Multi-Agent Router, Vector Store & Memory", duration: "12 min" },
      { id: "02-3", number: "2.3", title: "Step-by-Step MVP Build: Webhooks, OpenAI/Claude APIs & Supabase", duration: "12 min" },
      { id: "02-4", number: "2.4", title: "Sentiment Triage, Escalation Logic & QA Benchmarks", duration: "11 min" },
    ],
  },
  {
    id: "module-03",
    number: "03",
    title: "Automation 2: Inbound Lead Enrichment & Dynamic Qualification Pipeline",
    description:
      "Automate instant inbound lead scoring, firmographic enrichment, customized research memos, and CRM routing for high-ticket sales teams.",
    duration: "44 min",
    lessons: [
      { id: "03-1", number: "3.1", title: "The High-Velocity Pipeline: Eliminating Lead Decay", duration: "10 min" },
      { id: "03-2", number: "3.2", title: "Enrichment Architecture: Apollo/Clearbit, Web Scraping & Scoring", duration: "12 min" },
      { id: "03-3", number: "3.3", title: "Building the Automated Pipeline: HubSpot/Salesforce Sync & Scheduling", duration: "12 min" },
      { id: "03-4", number: "3.4", title: "Real-Time Slack Alerts, SDR Briefings & Multi-Touch Nurture", duration: "10 min" },
    ],
  },
  {
    id: "module-04",
    number: "04",
    title: "Automation 3: Intelligent Document Processing & Financial Ingestion",
    description:
      "Eliminate manual accounting data entry with multimodal vision models, structured schema enforcement, and ERP reconciliation.",
    duration: "46 min",
    lessons: [
      { id: "04-1", number: "4.1", title: "The High-Ticket Document Problem: Invoices, POs & Compliance", duration: "11 min" },
      { id: "04-2", number: "4.2", title: "Multimodal Vision Architecture & Strict JSON Schema Enforcement", duration: "12 min" },
      { id: "04-3", number: "4.3", title: "Step-by-Step Build: Ingestion, Optical Parsing & Accounting Sync", duration: "12 min" },
      { id: "04-4", number: "4.4", title: "Discrepancy Flags, Audit Trails & Human Verification UI", duration: "11 min" },
    ],
  },
  {
    id: "module-05",
    number: "05",
    title: "Automation 4: Autonomous Executive Reporting & Financial Synthesis",
    description:
      "Build a pipeline that queries financial and operational databases, analyzes weekly variances, and generates executive briefing decks automatically.",
    duration: "43 min",
    lessons: [
      { id: "05-1", number: "5.1", title: "The Executive Time Drain: Manual Aggregation vs Real-Time Synthesis", duration: "10 min" },
      { id: "05-2", number: "5.2", title: "Data Pipeline: Read-Only SQL Replicas, Stripe, Shopify & GA4", duration: "11 min" },
      { id: "05-3", number: "5.3", title: "Building the Analytical Engine: Metric Variance & Trend Reasoning", duration: "11 min" },
      { id: "05-4", number: "5.4", title: "Scheduled Delivery: Automated PDF Generation & Executive Briefings", duration: "11 min" },
    ],
  },
  {
    id: "module-06",
    number: "06",
    title: "Automation 5: Conversational Voice AI & Autonomous Booking Agent",
    description:
      "Design ultra-low latency voice agents that answer inbound phone calls, qualify callers, query live scheduling APIs, and book calendar appointments.",
    duration: "48 min",
    lessons: [
      { id: "06-1", number: "6.1", title: "Voice Opportunity: Recapturing High-Intent Missed Inbound Calls", duration: "11 min" },
      { id: "06-2", number: "6.2", title: "Ultra-Low-Latency Stack: Twilio, LiveKit, Deepgram & Cartesia", duration: "13 min" },
      { id: "06-3", number: "6.3", title: "Building the Voice Agent: Function Calling, Interruption & Latency", duration: "12 min" },
      { id: "06-4", number: "6.4", title: "Telephony Compliance, Call Logging & Post-Call CRM Handshake", duration: "12 min" },
    ],
  },
  {
    id: "module-07",
    number: "07",
    title: "Automation 6: Enterprise Knowledge Intelligence & Proprietary RAG Copilot",
    description:
      "Build private enterprise search and question-answering engines grounded in corporate wikis, SOPs, past projects, and compliance manuals.",
    duration: "46 min",
    lessons: [
      { id: "07-1", number: "7.1", title: "Internal Search Friction: The Hidden Enterprise Productivity Tax", duration: "10 min" },
      { id: "07-2", number: "7.2", title: "Advanced RAG Architecture: Chunking, Hybrid Search & Cohere Reranking", duration: "13 min" },
      { id: "07-3", number: "7.3", title: "Building the Copilot: Role-Based Access, Citation Verification & Guardrails", duration: "12 min" },
      { id: "07-4", number: "7.4", title: "Slack Bot Interface, Query Analytics & Knowledge Base Refreshers", duration: "11 min" },
    ],
  },
  {
    id: "module-08",
    number: "08",
    title: "Automation 7: Dynamic Inventory Forecasting & Supply Chain Order Engine",
    description:
      "Automate stock depletion tracking, predictive reorder calculations, vendor purchase order drafting, and ERP synchronizations.",
    duration: "44 min",
    lessons: [
      { id: "08-1", number: "8.1", title: "The Working Capital Dilemma: Stockouts, Carrying Costs & Bullwhip Effects", duration: "10 min" },
      { id: "08-2", number: "8.2", title: "Forecasting Pipeline: Sales Velocity, Lead Time Buffers & Seasonality", duration: "12 min" },
      { id: "08-3", number: "8.3", title: "Building the Reorder Agent: Multi-Supplier PO Generation & Approval Flows", duration: "11 min" },
      { id: "08-4", number: "8.4", title: "Warehouse Multi-Location Sync & Vendor SLA Verification", duration: "11 min" },
    ],
  },
  {
    id: "module-09",
    number: "09",
    title: "High-Ticket Delivery, Client Handover & Retainer Monetization",
    description:
      "Package your AI automation systems with watertight Statements of Work, client acceptance testing, and recurring $2,000+/mo maintenance retainers.",
    duration: "41 min",
    lessons: [
      { id: "09-1", number: "9.1", title: "Packaging & SOW Blueprint: Defining Clear Milestones & Scope Limits", duration: "10 min" },
      { id: "09-2", number: "9.2", title: "User Acceptance Testing (UAT) & Stress Testing Protocols", duration: "10 min" },
      { id: "09-3", number: "9.3", title: "Securing $2,000+/Month Maintenance & Model Retainers", duration: "11 min" },
      { id: "09-4", number: "9.4", title: "The Enterprise Automation Operations & Handover Checklist", duration: "10 min" },
    ],
  },
];
