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

export const AI_SERVICE_BUSINESS_MODULES_METADATA: ModuleMetadata[] = [
  {
    "id": "module-01",
    "number": "01",
    "title": "The 3-Tool Architecture & $10,000/Month Business Model",
    "description": "Understand why 3 focused tools outperform complex bloated stacks, master the business model math, and identify high-margin B2B clients.",
    "duration": "1h 45m",
    "lessonsCount": 7,
    "lessons": [
      {
        "id": "01-1",
        "number": "1.1",
        "title": "Why 3 Tools Outperform Complex 20-App Software Stacks",
        "duration": "15m",
        "summary": "Discover how mastering Airtable, Claude 3.7, and Make.com provides 100% of the leverage needed to deliver high-ticket enterprise workflows."
      },
      {
        "id": "01-2",
        "number": "1.2",
        "title": "The Core Roles: Airtable (Memory), Claude 3.7 (Reasoning), Make.com (Execution)",
        "duration": "15m",
        "summary": "Deep-dive into the architectural responsibility of each pillar and how they interlock to form an autonomous operating system."
      },
      {
        "id": "01-3",
        "number": "1.3",
        "title": "Unit Economics of the $10K Business: Setup Sprints & Recurring Retainers",
        "duration": "15m",
        "summary": "Deconstruct the exact financial model required to reach $10,000/month: charging $3,000 setup fees and $1,000/month retainers."
      },
      {
        "id": "01-4",
        "number": "1.4",
        "title": "Selecting High-Margin B2B Niches with Manual Administrative Bottlenecks",
        "duration": "15m",
        "summary": "Identify lucrative target industries where administrative waste is rampant and willingness-to-pay is exceptionally high."
      },
      {
        "id": "01-5",
        "number": "1.5",
        "title": "Pricing Philosophy: Value-Anchored Fixed Sprints vs. Hourly Traps",
        "duration": "15m",
        "summary": "Learn how to anchor pricing against customer operational savings, allowing you to charge $3,500 for a 4-hour build."
      },
      {
        "id": "01-6",
        "number": "1.6",
        "title": "Setting Up Agency Multi-Tenant Workspaces & API Infrastructure",
        "duration": "15m",
        "summary": "Establish professional agency workspaces across Airtable, Anthropic Console, and Make.com with clean client segregation."
      },
      {
        "id": "01-7",
        "number": "1.7",
        "title": "Module 1 Checkpoint: Your $10K Business Model & Flagship Service Blueprint",
        "duration": "15m",
        "summary": "Define your chosen target niche, select your initial flagship service offering, and construct your 90-day financial roadmap."
      }
    ]
  },
  {
    "id": "module-02",
    "number": "02",
    "title": "Core Tool 1 — Airtable as the Enterprise Relational Database",
    "description": "Design relational database architectures, audit trails, and client portal interfaces that act as the single source of truth.",
    "duration": "1h 45m",
    "lessonsCount": 7,
    "lessons": [
      {
        "id": "02-1",
        "number": "2.1",
        "title": "Designing Relational Data Schemas for Complex Operations",
        "duration": "15m",
        "summary": "Master data modeling principles to structure multi-table business operations cleanly without data duplication."
      },
      {
        "id": "02-2",
        "number": "2.2",
        "title": "Normalized Linking: Companies, Contacts, Invoices & Work Orders",
        "duration": "15m",
        "summary": "Build an interconnected business CRM schema linking accounts, individual stakeholders, project milestones, and billing records."
      },
      {
        "id": "02-3",
        "number": "2.3",
        "title": "Data Validation: Field Types, Enums & Status Pipeline Triggers",
        "duration": "15m",
        "summary": "Enforce strict data integrity with specialized field formats, single-select enums, and automated pipeline status gates."
      },
      {
        "id": "02-4",
        "number": "2.4",
        "title": "Rollups, Lookups & Calculated Operational Velocity Metrics",
        "duration": "15m",
        "summary": "Compute real-time operational KPIs, revenue aggregates, and processing latency directly within your relational base."
      },
      {
        "id": "02-5",
        "number": "2.5",
        "title": "Native Airtable Automations vs. External Orchestration Triggers",
        "duration": "15m",
        "summary": "Know exactly when to use native Airtable automations and when to hand off complex logic to Make.com."
      },
      {
        "id": "02-6",
        "number": "2.6",
        "title": "Building Client Interface Dashboards with Role-Based Permissions",
        "duration": "15m",
        "summary": "Deploy Airtable Interfaces to give clients and internal staff customized dashboards without exposing underlying raw tables."
      },
      {
        "id": "02-7",
        "number": "2.7",
        "title": "Module 2 Project: The Autonomous Client CRM & Work Order Hub",
        "duration": "15m",
        "summary": "Build, configure, and test a complete multi-client CRM and automated work order intake and tracking repository."
      }
    ]
  },
  {
    "id": "module-03",
    "number": "03",
    "title": "Core Tool 2 — Claude 3.7 for Reasoning, Synthesis & Decision Engines",
    "description": "Harness Claude 3.7 Sonnet for complex document parsing, deep reasoning, structured JSON schemas, and zero-hallucination outputs.",
    "duration": "1h 45m",
    "lessonsCount": 7,
    "lessons": [
      {
        "id": "03-1",
        "number": "3.1",
        "title": "The Power of Claude 3.7: Hybrid Thinking & Complex Document Extraction",
        "duration": "15m",
        "summary": "Understand why Claude 3.7 Sonnet is the premier model for high-stakes enterprise reasoning and structured document synthesis."
      },
      {
        "id": "03-2",
        "number": "3.2",
        "title": "Crafting Deterministic System Instructions That Eliminate Hallucinations",
        "duration": "15m",
        "summary": "Engineer bulletproof system prompts with explicit operational role definitions, boundary constraints, and fallback protocols."
      },
      {
        "id": "03-3",
        "number": "3.3",
        "title": "Processing 50+ Page PDF Invoices, Statements & Legal Contracts",
        "duration": "15m",
        "summary": "Pass complex multi-page document images and PDFs to Claude 3.7 to extract table data, line items, and contractual clauses."
      },
      {
        "id": "03-4",
        "number": "3.4",
        "title": "Defining Structured JSON Output Schemas for Downstream Reliability",
        "duration": "15m",
        "summary": "Enforce strict JSON formatting so Claude's output plugs directly into Airtable and Make.com without parsing errors."
      },
      {
        "id": "03-5",
        "number": "3.5",
        "title": "Multi-Step Evaluation Chains: Confidence Scores & Fallback Flags",
        "duration": "15m",
        "summary": "Build cognitive evaluation pipelines where the model scores its own certainty and triggers human review when ambiguous."
      },
      {
        "id": "03-6",
        "number": "3.6",
        "title": "Managing Token Economics & Latency Across High-Volume Operations",
        "duration": "15m",
        "summary": "Optimize API margins by caching repetitive prompt contexts, selecting model tiers, and managing throughput limits."
      },
      {
        "id": "03-7",
        "number": "3.7",
        "title": "Module 3 Project: The Cognitive Invoice Audit & Discrepancy Flagging Engine",
        "duration": "15m",
        "summary": "Build an autonomous accounting assistant that ingests supplier invoices, extracts line items, and flags billing discrepancies."
      }
    ]
  },
  {
    "id": "module-04",
    "number": "04",
    "title": "Core Tool 3 — Make.com for Frictionless Orchestration & Integrations",
    "description": "Wire Airtable and Claude 3.7 together with external apps, manage error directives, and deploy rock-solid execution pipelines.",
    "duration": "1h 45m",
    "lessonsCount": 7,
    "lessons": [
      {
        "id": "04-1",
        "number": "4.1",
        "title": "Architecture of Enterprise Make.com Scenarios: Routers & Flow Control",
        "duration": "15m",
        "summary": "Master the visual scenario builder, modular sub-routines, data bundle flow, and conditional routing filters."
      },
      {
        "id": "04-2",
        "number": "4.2",
        "title": "Ingesting Webhooks from Email, Webforms, Stripe & Client Software",
        "duration": "15m",
        "summary": "Configure custom webhook listeners that receive real-time JSON payloads from external software platforms."
      },
      {
        "id": "04-3",
        "number": "4.3",
        "title": "Wiring Airtable to Claude 3.7: Passing Context & Receiving Clean JSON",
        "duration": "15m",
        "summary": "Build the core cognitive bridge: querying Airtable for operational context, calling Claude API, and saving outputs."
      },
      {
        "id": "04-4",
        "number": "4.4",
        "title": "Error Handlers: Resume, Break, and Rollback Directives in Production",
        "duration": "15m",
        "summary": "Protect client workflows against API downtime and malformed data using enterprise error directives."
      },
      {
        "id": "04-5",
        "number": "4.5",
        "title": "Complex Data Iterators & Aggregators for Multi-Line Transactions",
        "duration": "15m",
        "summary": "Deconstruct arrays of line items with Iterators, process each item through logic checks, and aggregate results."
      },
      {
        "id": "04-6",
        "number": "4.6",
        "title": "Automated Failure Alerting & Dead-Letter Staging Repositories",
        "duration": "15m",
        "summary": "Configure instant Slack and SMS alerts to notify your agency team the moment an unexpected exception occurs."
      },
      {
        "id": "04-7",
        "number": "4.7",
        "title": "Module 4 Project: The End-to-End Autonomous Work Order Pipeline",
        "duration": "15m",
        "summary": "Connect all 3 tools into a complete, bulletproof work order intake, cognitive processing, and client delivery engine."
      }
    ]
  },
  {
    "id": "module-05",
    "number": "05",
    "title": "Packaging 3 High-Ticket Recurring Services",
    "description": "Productize your 3-tool capabilities into three high-demand B2B service packages priced between $2,500 and $7,500.",
    "duration": "1h 45m",
    "lessonsCount": 7,
    "lessons": [
      {
        "id": "05-1",
        "number": "5.1",
        "title": "The 3 Core Sellable Services: Inbound Lead Triage, Invoice Auditor, Client Portal",
        "duration": "15m",
        "summary": "Stop selling generic 'AI services'; package capabilities into 3 concrete operational outcomes that solve obvious pain."
      },
      {
        "id": "05-2",
        "number": "5.2",
        "title": "Service 1 Blueprint: 90-Second Lead Response, Enrichment & Auto-Proposal",
        "duration": "15m",
        "summary": "Step-by-step technical and commercial blueprint for selling and delivering speed-to-lead automation engines."
      },
      {
        "id": "05-3",
        "number": "5.3",
        "title": "Service 2 Blueprint: Multimodal Invoice Ingestion & Accounting Sync",
        "duration": "15m",
        "summary": "Step-by-step blueprint for automating accounts payable, PDF extraction, PO matching, and QuickBooks/Xero synchronization."
      },
      {
        "id": "05-4",
        "number": "5.4",
        "title": "Service 3 Blueprint: Custom Client Portal & Automated Project Tracking",
        "duration": "15m",
        "summary": "Step-by-step blueprint for deploying Airtable Interfaces and Softr client hubs with automated notification pipelines."
      },
      {
        "id": "05-5",
        "number": "5.5",
        "title": "Pricing Matrix: $2,500-$4,000 Setup Fees + $650-$1,250/mo Retainers",
        "duration": "15m",
        "summary": "Master the psychology of multi-tier pricing, value anchoring, and structuring mandatory ongoing maintenance retainers."
      },
      {
        "id": "05-6",
        "number": "5.6",
        "title": "Drafting Clear SOWs That Eliminate Scope Creep Completely",
        "duration": "15m",
        "summary": "Protect your time and agency margins using airtight Statement of Work templates with explicit deliverable boundaries."
      },
      {
        "id": "05-7",
        "number": "5.7",
        "title": "Module 5 Project: Packaging Your 3-Tier Commercial Offer Deck",
        "duration": "15m",
        "summary": "Create a professional, branded 1-page offer sheet and capability deck ready to send to prospective B2B clients."
      }
    ]
  },
  {
    "id": "module-06",
    "number": "06",
    "title": "Client Acquisition & Pain-First Discovery Process",
    "description": "Execute outbound lead sourcing, master the 5-minute Trojan Horse Loom audit, and close 50%+ of discovery calls.",
    "duration": "1h 45m",
    "lessonsCount": 7,
    "lessons": [
      {
        "id": "06-1",
        "number": "6.1",
        "title": "Sourcing High-Value B2B Accounts: Scraping Directories & Verifying Pain",
        "duration": "15m",
        "summary": "Build targeted prospect lists of high-margin companies experiencing acute operational and administrative bottlenecks."
      },
      {
        "id": "06-2",
        "number": "6.2",
        "title": "The 5-Minute 'Trojan Horse' Loom Audit That Books Discovery Calls",
        "duration": "15m",
        "summary": "Master the personalized video audit formula that demonstrates a prospect's specific bottleneck and books calls on autopilot."
      },
      {
        "id": "06-3",
        "number": "6.3",
        "title": "Cold Email & LinkedIn Outbound Sequences with 25%+ Booking Rates",
        "duration": "15m",
        "summary": "Deploy short, hyper-personalized outreach sequences that deliver your Loom audit directly to executive decision-makers."
      },
      {
        "id": "06-4",
        "number": "6.4",
        "title": "The 4-Stage Consultative Discovery Call: Uncovering Hidden Labor Costs",
        "duration": "15m",
        "summary": "Conduct consultative sales conversations that guide the prospect to calculate their own operational waste and demand your solution."
      },
      {
        "id": "06-5",
        "number": "6.5",
        "title": "Live Architecture Mapping: Showing Clients Their Future Efficiency On-Call",
        "duration": "15m",
        "summary": "Share your screen during discovery calls to live-map their automated workflow, building overwhelming trust and authority."
      },
      {
        "id": "06-6",
        "number": "6.6",
        "title": "Overcoming Enterprise Security Objections, Compliance & IT Concerns",
        "duration": "15m",
        "summary": "Confidently handle questions regarding data privacy, model training, SOC2 compliance, and API security."
      },
      {
        "id": "06-7",
        "number": "6.7",
        "title": "Module 6 Project: Executing Your 30-Day Prospect Outreach Campaign",
        "duration": "15m",
        "summary": "Source 50 verified target accounts, record 10 personalized Trojan Horse Loom audits, and book your first 3 client calls."
      }
    ]
  },
  {
    "id": "module-07",
    "number": "07",
    "title": "Operations, SLA Management & Scaling to $10,000/Month",
    "description": "Systematize delivery, provide automated monthly client value reports, retain 100% of accounts, and hit $10,000/month.",
    "duration": "1h 45m",
    "lessonsCount": 7,
    "lessons": [
      {
        "id": "07-1",
        "number": "7.1",
        "title": "Systematic Client Onboarding: 48-Hour Setup & Credential Handover",
        "duration": "15m",
        "summary": "Deploy a white-glove onboarding intake system that collects API keys, brand assets, and account permissions in 48 hours."
      },
      {
        "id": "07-2",
        "number": "7.2",
        "title": "Staging-to-Production Migration Protocol with Zero Downtime",
        "duration": "15m",
        "summary": "Follow enterprise deployment procedures to migrate workflows from sandbox environments to live client systems safely."
      },
      {
        "id": "07-3",
        "number": "7.3",
        "title": "Recording 15-Minute Loom Video SOPs for Client Staff Training",
        "duration": "15m",
        "summary": "Deliver clear, recorded operational training walkthroughs that empower client staff to interact with the system effortlessly."
      },
      {
        "id": "07-4",
        "number": "7.4",
        "title": "Proactive Maintenance: Monthly Health Checks, API Audits & Retainer Justification",
        "duration": "15m",
        "summary": "Perform scheduled monthly system optimizations that take you under 60 minutes while justifying ongoing retainer fees."
      },
      {
        "id": "07-5",
        "number": "7.5",
        "title": "Automated Client Value Reports Proving Return on Investment",
        "duration": "15m",
        "summary": "Generate and send automated monthly PDF digests proving exact hours saved, transactions processed, and dollars created."
      },
      {
        "id": "07-6",
        "number": "7.6",
        "title": "Managing 6 to 10 Retainers in Under 15 Hours a Week",
        "duration": "15m",
        "summary": "Organize your agency operations, automated diagnostics, and ticket queues to scale income without sacrificing personal time."
      },
      {
        "id": "07-7",
        "number": "7.7",
        "title": "Capstone Project: Achieving the $10,000 Monthly Recurring Milestone",
        "duration": "15m",
        "summary": "Synthesize all 7 modules into your complete operational agency roadmap and cross the $10,000/month recurring threshold."
      }
    ]
  }
];

export const AI_SERVICE_BUSINESS_CURRICULUM = {
  totalModules: 7,
  totalLessons: 49,
  estimatedHours: "7.0 hours",
  modules: AI_SERVICE_BUSINESS_MODULES_METADATA,
};
