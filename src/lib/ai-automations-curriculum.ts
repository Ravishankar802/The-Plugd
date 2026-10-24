export interface LessonMetadata {
  id: string;
  number: string;
  title: string;
  duration: string;
  summary: string;
}

export interface ModuleMetadata {
  id: string;
  number: string;
  title: string;
  description: string;
  duration: string;
  lessonsCount: number;
  lessons: LessonMetadata[];
}

export const AI_AUTOMATIONS_MODULES_METADATA: ModuleMetadata[] = [
  {
    "id": "module-01",
    "number": "01",
    "title": "Getting Started with AI Automation & The $10,000 Milestone",
    "description": "Demystify no-code AI automation, calculate your trajectory to $10,000/month, and master the fundamental trigger-logic-action paradigm.",
    "duration": "1h 45m",
    "lessonsCount": 7,
    "lessons": [
      {
        "id": "01-1",
        "number": "1.1",
        "title": "What AI Automation Really Is (And Why You Don't Need Coding Skills)",
        "duration": "15m",
        "summary": "Understand the fundamental shift from custom coding to visual orchestration engines connecting cloud APIs."
      },
      {
        "id": "01-2",
        "number": "1.2",
        "title": "The $10,000 Income Roadmap: Breaking Down the Numbers",
        "duration": "15m",
        "summary": "Deconstruct the exact mathematical pathways to achieving $10,000/month through setup fees and recurring retainers."
      },
      {
        "id": "01-3",
        "number": "1.3",
        "title": "The 3 Core Ingredients of Every Automation (Trigger, Action, Logic)",
        "duration": "15m",
        "summary": "Master the fundamental anatomy of every workflow: event listeners, computational reasoning, and destination dispatchers."
      },
      {
        "id": "01-4",
        "number": "1.4",
        "title": "Common Misconceptions That Stop Complete Beginners",
        "duration": "15m",
        "summary": "Dismantle imposter syndrome, developer bias, and unfounded fears about AI model instability in commercial settings."
      },
      {
        "id": "01-5",
        "number": "1.5",
        "title": "Auditing Everyday Business Time Drains (The 5-Hour Test)",
        "duration": "15m",
        "summary": "Learn how to conduct an operational diagnostic to uncover high-friction tasks that cost businesses thousands monthly."
      },
      {
        "id": "01-6",
        "number": "1.6",
        "title": "Selecting Your First Tech Stack & Setting Up Free Sandboxes",
        "duration": "15m",
        "summary": "Set up development environments, obtain free developer trial tiers, and organize credentials safely."
      },
      {
        "id": "01-7",
        "number": "1.7",
        "title": "Module 1 Checkpoint: Your $10K Milestone Execution Plan",
        "duration": "15m",
        "summary": "Synthesize the foundational principles into a tangible 90-day action plan tailored to your specific background and niche."
      }
    ]
  },
  {
    "id": "module-02",
    "number": "02",
    "title": "Tool 1 — Make.com (Visual Workflow Orchestration Engine)",
    "description": "Master Make.com from basic scenarios to advanced routers, error handlers, and high-throughput data iterators.",
    "duration": "1h 45m",
    "lessonsCount": 7,
    "lessons": [
      {
        "id": "02-1",
        "number": "2.1",
        "title": "Setting Up Make.com & Navigating the Visual Scenario Builder",
        "duration": "15m",
        "summary": "Learn the architecture of Make.com scenarios, bundles, operations, and the visual canvas execution model."
      },
      {
        "id": "02-2",
        "number": "2.2",
        "title": "Connecting Your First Two Apps (Google Sheets to Gmail & Slack)",
        "duration": "15m",
        "summary": "Build an end-to-end integration listening for row additions and dispatching formatted multi-channel alerts."
      },
      {
        "id": "02-3",
        "number": "2.3",
        "title": "Data Mapping, Formatting & Handling Unstructured Text",
        "duration": "15m",
        "summary": "Use built-in Make functions for regex text extraction, array manipulation, and date calculations."
      },
      {
        "id": "02-4",
        "number": "2.4",
        "title": "Error Handlers & Routers: Building Bulletproof Workflows",
        "duration": "15m",
        "summary": "Implement Rollback, Commit, Resume, and Ignore directives alongside multi-branch router filters."
      },
      {
        "id": "02-5",
        "number": "2.5",
        "title": "Scheduling, Webhooks & Instant Trigger Optimization",
        "duration": "15m",
        "summary": "Configure custom webhook URLs, manage queue concurrency, and minimize operation consumption costs."
      },
      {
        "id": "02-6",
        "number": "2.6",
        "title": "Advanced Iterators, Aggregators & Multi-Branch Logic",
        "duration": "15m",
        "summary": "Master array deconstruction with Iterators and record reassembly with Array, Text, and Numeric Aggregators."
      },
      {
        "id": "02-7",
        "number": "2.7",
        "title": "Module 2 Project: The Autonomous Inbound Inquiry Dispatcher",
        "duration": "15m",
        "summary": "Build, test, and package a production-ready lead triaging engine routing inquiries to CRM, Slack, and email."
      }
    ]
  },
  {
    "id": "module-03",
    "number": "03",
    "title": "Tool 2 — n8n (Self-Hosted Advanced Workflow Architecture)",
    "description": "Deploy n8n for data-sovereign enterprise clients who require on-premise execution, custom JavaScript nodes, and zero operation limits.",
    "duration": "1h 45m",
    "lessonsCount": 7,
    "lessons": [
      {
        "id": "03-1",
        "number": "3.1",
        "title": "Why Modern Businesses Choose n8n for Data Sovereignty",
        "duration": "15m",
        "summary": "Understand the regulatory, cost, and architectural advantages of open-source workflow orchestration."
      },
      {
        "id": "03-2",
        "number": "3.2",
        "title": "Self-Hosting vs. Cloud: Free Deployment on Railway or VPS",
        "duration": "15m",
        "summary": "Deploy an enterprise n8n instance with persistent Docker volumes and SSL certificates in under 15 minutes."
      },
      {
        "id": "03-3",
        "number": "3.3",
        "title": "Visual Node Orchestration & Complex Branching in n8n",
        "duration": "15m",
        "summary": "Master the node-based flow canvas, pin data for fast testing, and implement switch conditions."
      },
      {
        "id": "03-4",
        "number": "3.4",
        "title": "Writing Custom JavaScript Code Nodes for Advanced Logic",
        "duration": "15m",
        "summary": "Leverage Node.js within the Code node to transform nested data structures and perform complex calculations."
      },
      {
        "id": "03-5",
        "number": "3.5",
        "title": "Handling High-Volume Webhooks & Database Polling",
        "duration": "15m",
        "summary": "Architect systems capable of ingesting thousands of webhook events per minute without dropping connections."
      },
      {
        "id": "03-6",
        "number": "3.6",
        "title": "Securing Credentials, Environment Variables & API Keys",
        "duration": "15m",
        "summary": "Implement enterprise credential management, role-based access control, and environment isolation."
      },
      {
        "id": "03-7",
        "number": "3.7",
        "title": "Module 3 Project: Enterprise-Grade CRM Sync & Hygiene Pipeline",
        "duration": "15m",
        "summary": "Build and deploy an automated data deduplication, enrichment, and bi-directional CRM synchronization system."
      }
    ]
  },
  {
    "id": "module-04",
    "number": "04",
    "title": "Tool 3 — OpenAI Assistants API & Function Calling",
    "description": "Turn static LLMs into deterministic operational engines using tool schemas, vector search RAG, and strict JSON outputs.",
    "duration": "1h 45m",
    "lessonsCount": 7,
    "lessons": [
      {
        "id": "04-1",
        "number": "4.1",
        "title": "Moving Beyond Basic ChatGPT: The Power of Programmatic AI",
        "duration": "15m",
        "summary": "Understand why manual web chat fails in business operations and how programmatic API endpoints deliver automation."
      },
      {
        "id": "04-2",
        "number": "4.2",
        "title": "Defining Custom Instructions, Role Persona & Guardrails",
        "duration": "15m",
        "summary": "Engineer bulletproof system prompts that enforce boundaries, eliminate hallucination, and govern output tone."
      },
      {
        "id": "04-3",
        "number": "4.3",
        "title": "Leveraging File Search (RAG) for Custom Business Knowledge",
        "duration": "15m",
        "summary": "Upload internal documentation, product catalogs, and SOPs to provide real-time grounded context."
      },
      {
        "id": "04-4",
        "number": "4.4",
        "title": "Function Calling (Tool Use): Empowering AI to Query Real APIs",
        "duration": "15m",
        "summary": "Author clean JSON schemas that allow the assistant to trigger external database lookups and calculations."
      },
      {
        "id": "04-5",
        "number": "4.5",
        "title": "Enforcing JSON Schemas & Eliminating Hallucinations",
        "duration": "15m",
        "summary": "Utilize structured outputs with strict JSON schemas to guarantee 100% predictable downstream data ingestion."
      },
      {
        "id": "04-6",
        "number": "4.6",
        "title": "Token Cost Management & Model Selection (GPT-4o vs. Mini)",
        "duration": "15m",
        "summary": "Optimize operational margins by selecting the right model for each task and caching repetitive context."
      },
      {
        "id": "04-7",
        "number": "4.7",
        "title": "Module 4 Project: Autonomous Customer Support Triaging Assistant",
        "duration": "15m",
        "summary": "Build an end-to-end support assistant reading incoming Zendesk/HelpScout tickets and drafting verified responses."
      }
    ]
  },
  {
    "id": "module-05",
    "number": "05",
    "title": "Tool 4 — Airtable + Softr (Client Portals & Relational Backends)",
    "description": "Design relational database architectures and client-facing interfaces that turn raw automations into intuitive SaaS products.",
    "duration": "1h 45m",
    "lessonsCount": 7,
    "lessons": [
      {
        "id": "05-1",
        "number": "5.1",
        "title": "Relational Database Foundations for Non-Developers",
        "duration": "15m",
        "summary": "Understand tables, linked records, primary keys, and foreign relationships without complex SQL syntax."
      },
      {
        "id": "05-2",
        "number": "5.2",
        "title": "Designing Normalized Tables (Clients, Projects, Invoices, Deliverables)",
        "duration": "15m",
        "summary": "Build a production-grade operational CRM schema tailored to professional service agencies and consultants."
      },
      {
        "id": "05-3",
        "number": "5.3",
        "title": "Airtable Automations: Native Scripts, Formula Fields & Webhooks",
        "duration": "15m",
        "summary": "Harness built-in Airtable triggers and JavaScript automations for fast, internal operational tasks."
      },
      {
        "id": "05-4",
        "number": "5.4",
        "title": "Building Client Dashboards & Portals in Softr Without Code",
        "duration": "15m",
        "summary": "Connect Softr to Airtable to publish secure, responsive client portals complete with authentication and permissions."
      },
      {
        "id": "05-5",
        "number": "5.5",
        "title": "Managing User Permissions, Magic Links & Client Access Control",
        "duration": "15m",
        "summary": "Configure role-based access control so clients only see their own projects, invoices, and sensitive deliverables."
      },
      {
        "id": "05-6",
        "number": "5.6",
        "title": "Connecting Airtable to Make.com for Two-Way Relational Sync",
        "duration": "15m",
        "summary": "Build bi-directional integrations that query linked records, create relational associations, and manage updates."
      },
      {
        "id": "05-7",
        "number": "5.7",
        "title": "Module 5 Project: The White-Label Client Operations Hub",
        "duration": "15m",
        "summary": "Package and deploy a complete client portal where customers submit requests, track progress, and review invoices."
      }
    ]
  },
  {
    "id": "module-06",
    "number": "06",
    "title": "Tool 5 — ElevenLabs & HeyGen (AI Voice & Video Systems)",
    "description": "Automate personalized audio generation, dynamic video prospecting, and localized content repurposing at commercial scale.",
    "duration": "1h 45m",
    "lessonsCount": 7,
    "lessons": [
      {
        "id": "06-1",
        "number": "6.1",
        "title": "The Commercial Explosion of Voice & Avatar Automation",
        "duration": "15m",
        "summary": "Understand how synthetic voice and generative video are transforming B2B outreach, customer training, and marketing."
      },
      {
        "id": "06-2",
        "number": "6.2",
        "title": "Professional Voice Cloning & High-Fidelity Audio Generation",
        "duration": "15m",
        "summary": "Master ElevenLabs voice cloning, emotion controls, latency optimization, and programmatic text-to-speech API calls."
      },
      {
        "id": "06-3",
        "number": "6.3",
        "title": "Automating Video Prospecting with Dynamic HeyGen Avatars",
        "duration": "15m",
        "summary": "Build personalized video generation pipelines using custom client avatars, dynamic variable scripts, and background slides."
      },
      {
        "id": "06-4",
        "number": "6.4",
        "title": "Programmatic Podcast & Long-Form Video Repurposing",
        "duration": "15m",
        "summary": "Ingest long-form YouTube or Zoom recordings, transcribe with Whisper, and extract viral short-form clips automatically."
      },
      {
        "id": "06-5",
        "number": "6.5",
        "title": "Multilingual Dubbing & Localization for Global Audiences",
        "duration": "15m",
        "summary": "Translate corporate training and marketing videos into 29+ languages with automatic voice matching and lip synchronization."
      },
      {
        "id": "06-6",
        "number": "6.6",
        "title": "Ethical Guardrails, Voice Rights & Client Consent Frameworks",
        "duration": "15m",
        "summary": "Implement strict legal authorization forms, biometric data storage policies, and watermarking compliance."
      },
      {
        "id": "06-7",
        "number": "6.7",
        "title": "Module 6 Project: Personalized B2B Video Prospecting Engine",
        "duration": "15m",
        "summary": "Build an automated engine that enriches leads, captures website screenshots, generates custom avatar videos, and sends emails."
      }
    ]
  },
  {
    "id": "module-07",
    "number": "07",
    "title": "Tool 6 — Perplexity & DeepSeek (Live Intelligence & Market Research)",
    "description": "Harness real-time search models, web scraping APIs, and deep reasoning engines to deliver automated corporate intelligence.",
    "duration": "1h 45m",
    "lessonsCount": 7,
    "lessons": [
      {
        "id": "07-1",
        "number": "7.1",
        "title": "Real-Time Web Scraping vs. Trained Knowledge: When to Use Search AI",
        "duration": "15m",
        "summary": "Understand the architectural divergence between static training cutoff models and real-time live search engines."
      },
      {
        "id": "07-2",
        "number": "7.2",
        "title": "Automated Competitor Tracking & Pricing Change Monitoring",
        "duration": "15m",
        "summary": "Build scheduled workflows that scrape rival product pages, detect pricing adjustments, and alert executive teams."
      },
      {
        "id": "07-3",
        "number": "7.3",
        "title": "Extracting Key Executive Hires & Intent Signals from Live Web",
        "duration": "15m",
        "summary": "Monitor press releases, LinkedIn updates, and job boards to detect high-intent buying signals from prospective accounts."
      },
      {
        "id": "07-4",
        "number": "7.4",
        "title": "Synthesizing 100+ Page Financial Filings into Executive Briefs",
        "duration": "15m",
        "summary": "Ingest dense quarterly 10-Q reports and conference call transcripts to generate actionable strategic insights in seconds."
      },
      {
        "id": "07-5",
        "number": "7.5",
        "title": "Building an Automated Industry Newsletter & Trend Radar",
        "duration": "15m",
        "summary": "Create a fully autonomous research pipeline that scours 50+ industry sources, selects top news, and drafts newsletters."
      },
      {
        "id": "07-6",
        "number": "7.6",
        "title": "Formatting Unstructured Search Data into Structured JSON",
        "duration": "15m",
        "summary": "Convert noisy, raw internet search results into normalized JSON records ready for relational database insertion."
      },
      {
        "id": "07-7",
        "number": "7.7",
        "title": "Module 7 Project: Daily Executive Market Intelligence Digest",
        "duration": "15m",
        "summary": "Build an automated intelligence engine monitoring 5 industry competitors and delivering a daily Slack/email brief at 8 AM."
      }
    ]
  },
  {
    "id": "module-08",
    "number": "08",
    "title": "Tool 7 — Twilio & WhatsApp Business API (Conversational Messaging)",
    "description": "Deploy high-converting SMS and WhatsApp conversational automations for local businesses with 98% open rates.",
    "duration": "1h 45m",
    "lessonsCount": 7,
    "lessons": [
      {
        "id": "08-1",
        "number": "8.1",
        "title": "The Power of SMS & WhatsApp: 98% Open Rates for Local Businesses",
        "duration": "15m",
        "summary": "Understand why text messaging outperforms email by 5x for appointment bookings, customer inquiries, and lead conversion."
      },
      {
        "id": "08-2",
        "number": "8.2",
        "title": "Provisioning Virtual Numbers & Registering Meta Business Profiles",
        "duration": "15m",
        "summary": "Set up Twilio phone numbers, complete WhatsApp Business API onboarding, and establish approved message templates."
      },
      {
        "id": "08-3",
        "number": "8.3",
        "title": "Instant Missed-Call Text-Back Automation (Recovering Lost Leads)",
        "duration": "15m",
        "summary": "Build the single highest-ROI automation for local service businesses: immediate automated SMS responses to missed calls."
      },
      {
        "id": "08-4",
        "number": "8.4",
        "title": "Conversational Appointment Booking via SMS & Calendar API",
        "duration": "15m",
        "summary": "Allow customers to book, reschedule, and confirm service appointments entirely through automated text message conversations."
      },
      {
        "id": "08-5",
        "number": "8.5",
        "title": "Automated Review Requests & Reputation Management Sequences",
        "duration": "15m",
        "summary": "Build post-service review generation workflows that systematically collect 5-star Google and Yelp reviews."
      },
      {
        "id": "08-6",
        "number": "8.6",
        "title": "Compliance, Opt-In Regulations (A2P 10DLC) & Spam Prevention",
        "duration": "15m",
        "summary": "Navigate TCPA, A2P 10DLC registration, opt-out keywords (STOP/UNSUBSCRIBE), and message throttling rules."
      },
      {
        "id": "08-7",
        "number": "8.7",
        "title": "Module 8 Project: Turnkey Local Business Lead-Capture Bot",
        "duration": "15m",
        "summary": "Build an omnichannel lead recovery and booking engine integrating missed calls, SMS, WhatsApp, and Google Calendar."
      }
    ]
  },
  {
    "id": "module-09",
    "number": "09",
    "title": "Commercial Packaging, Retainers & Scaling to $10,000/Month",
    "description": "Package the 7 tools into high-ticket productized offers, master the Trojan Horse sales strategy, and sign retainer clients.",
    "duration": "1h 45m",
    "lessonsCount": 7,
    "lessons": [
      {
        "id": "09-1",
        "number": "9.1",
        "title": "Packaging 7 Tools into 3 Productized Commercial Offers",
        "duration": "15m",
        "summary": "Stop selling random technical tools; package capabilities into three clear, productized outcome-based offers."
      },
      {
        "id": "09-2",
        "number": "9.2",
        "title": "Value-Based Pricing vs. Hourly Billing: Charging $2,500+ Per Sprint",
        "duration": "15m",
        "summary": "Escape the hourly trap and price implementations based on the financial value and hours saved for the client."
      },
      {
        "id": "09-3",
        "number": "9.3",
        "title": "Crafting High-Converting 'Trojan Horse' Video Audits for Prospects",
        "duration": "15m",
        "summary": "Master the 5-minute personalized Loom audit strategy that closes 30%+ of cold and warm B2B prospects."
      },
      {
        "id": "09-4",
        "number": "9.4",
        "title": "The 4-Part Discovery Call: Diagnosing Client Pain and Closing",
        "duration": "15m",
        "summary": "Execute consultative discovery calls that guide prospects to calculate their own operational waste and demand your solution."
      },
      {
        "id": "09-5",
        "number": "9.5",
        "title": "Drafting Frictionless SOW Contracts & Recurring Retainer Terms",
        "duration": "15m",
        "summary": "Protect your agency with clean, professional Statements of Work, payment milestones, and retainer agreements."
      },
      {
        "id": "09-6",
        "number": "9.6",
        "title": "Delivery Operations, Client Onboarding & SLA Maintenance",
        "duration": "15m",
        "summary": "Establish systematic delivery workflows, recorded client training handoffs, and proactive monthly maintenance."
      },
      {
        "id": "09-7",
        "number": "9.7",
        "title": "Capstone Project: Launching Your $10K AI Automation Agency",
        "duration": "15m",
        "summary": "Finalize your agency service portfolio, publish your case study showcase, and execute your first client outreach sprint."
      }
    ]
  }
];

export const AI_AUTOMATIONS_CURRICULUM = {
  totalModules: 9,
  totalLessons: 63,
  estimatedHours: "7.5 hours",
  modules: AI_AUTOMATIONS_MODULES_METADATA,
};
