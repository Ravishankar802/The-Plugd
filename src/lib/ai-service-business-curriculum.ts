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
    "duration": "56m",
    "lessonsCount": 4,
    "lessons": [
      {
        "id": "01-1",
        "number": "1.1",
        "title": "Why 3 Tools Outperform Complex 20-App Software Stacks",
        "duration": "14m",
        "summary": "Discover how standardizing on Airtable, Claude 3.7, and Make.com provides 100% of the leverage needed to deliver high-ticket enterprise workflows."
      },
      {
        "id": "01-2",
        "number": "1.2",
        "title": "The Core Roles: Airtable (Memory), Claude 3.7 (Reasoning), Make.com (Execution)",
        "duration": "14m",
        "summary": "Deep-dive into the architectural responsibility of each pillar and how they interlock to form an autonomous operating system."
      },
      {
        "id": "01-3",
        "number": "1.3",
        "title": "Unit Economics of the $10K Business: Setup Sprints & Recurring Retainers",
        "duration": "14m",
        "summary": "Deconstruct the exact financial model required to reach $10,000/month: charging $3,000 setup fees and $1,000/month retainers."
      },
      {
        "id": "01-4",
        "number": "1.4",
        "title": "Target Market Selection: B2B Industries with High Transaction Values",
        "duration": "14m",
        "summary": "Pinpoint the exact commercial verticals with high transaction sizes, manual data entry headaches, and immediate budget authority."
      }
    ]
  },
  {
    "id": "module-02",
    "number": "02",
    "title": "Core Tool 1 — Airtable as the Enterprise Relational Database",
    "description": "Design production relational schemas, linked record architectures, role-based interfaces, and automated state pipelines.",
    "duration": "56m",
    "lessonsCount": 4,
    "lessons": [
      {
        "id": "02-1",
        "number": "2.1",
        "title": "Relational Schema Architecture: Normalization vs Spreadsheet Thinking",
        "duration": "14m",
        "summary": "Transition from flat spreadsheet thinking to relational data architecture with linked tables, foreign keys, and rollups."
      },
      {
        "id": "02-2",
        "number": "2.2",
        "title": "Building Role-Based Interfaces That Replace $10,000 Custom Software",
        "duration": "14m",
        "summary": "Design interactive Airtable Interfaces that allow non-technical client staff to manage data and approve actions securely."
      },
      {
        "id": "02-3",
        "number": "2.3",
        "title": "Airtable Native Automations & High-Speed Webhook Triggers",
        "duration": "14m",
        "summary": "Leverage Airtable's built-in automation engine for sub-second record updates and outbound webhook dispatching."
      },
      {
        "id": "02-4",
        "number": "2.4",
        "title": "Audit Logging, Data Sanitization & State Machine Design",
        "duration": "14m",
        "summary": "Implement immutable audit logs, data cleaning routines, and deterministic state transitions that prevent system corruption."
      }
    ]
  },
  {
    "id": "module-03",
    "number": "03",
    "title": "Core Tool 2 — Claude 3.7 for Reasoning, Synthesis & Extraction",
    "description": "Harness Claude 3.7 Sonnet for multimodal document extraction, reasoning loops, strict JSON output adherence, and token optimization.",
    "duration": "55m",
    "lessonsCount": 4,
    "lessons": [
      {
        "id": "03-1",
        "number": "3.1",
        "title": "Why Claude 3.7 Sonnet Dominates B2B Enterprise Extraction",
        "duration": "14m",
        "summary": "Understand Claude 3.7's superior multimodal vision, nuanced reasoning, long context window, and industry-leading JSON schema adherence."
      },
      {
        "id": "03-2",
        "number": "3.2",
        "title": "Engineering Deterministic JSON Schemas with Pydantic & Zod Standards",
        "duration": "14m",
        "summary": "Enforce strict, parseable JSON output from Claude 3.7 with zero conversational chatter or markdown syntax errors."
      },
      {
        "id": "03-3",
        "number": "3.3",
        "title": "Confidence Scoring & Automated Human-in-the-Loop Routing",
        "duration": "14m",
        "summary": "Instruct Claude 3.7 to evaluate its own extraction certainty and route ambiguous edge cases to a human review queue."
      },
      {
        "id": "03-4",
        "number": "3.4",
        "title": "Token Optimization, Prompt Caching & Client API Cost Management",
        "duration": "13m",
        "summary": "Drastically reduce client API bills by utilizing Anthropic prompt caching, context trimming, and efficient system instruction design."
      }
    ]
  },
  {
    "id": "module-04",
    "number": "04",
    "title": "Core Tool 3 — Make.com for Frictionless Orchestration & Integrations",
    "description": "Wire resilient Make.com scenarios connecting Airtable and Claude 3.7 to hundreds of commercial B2B apps without crashing.",
    "duration": "56m",
    "lessonsCount": 4,
    "lessons": [
      {
        "id": "04-1",
        "number": "4.1",
        "title": "Scenario Architecture: Connecting Airtable and Claude 3.7 Flawlessly",
        "duration": "14m",
        "summary": "Build the foundational Make.com pipeline that listens for database events, dispatches to Claude, and updates records."
      },
      {
        "id": "04-2",
        "number": "4.2",
        "title": "Advanced Data Manipulation: Regex, Iterators, and Aggregators",
        "duration": "14m",
        "summary": "Handle complex multi-line transactions, parse nested arrays, and aggregate disparate data items in a single scenario run."
      },
      {
        "id": "04-3",
        "number": "4.3",
        "title": "Enterprise Error Directives: Break, Resume, Rollback, and Commit",
        "duration": "14m",
        "summary": "Protect scenarios from fatal crashes using Make.com error directives that handle third-party API downtimes automatically."
      },
      {
        "id": "04-4",
        "number": "4.4",
        "title": "Automated Error Telemetry: Instant Alerts to Slack and Discord",
        "duration": "14m",
        "summary": "Build an automated telemetry loop that captures failed execution payloads and alerts engineering via Slack/Discord instantly."
      }
    ]
  },
  {
    "id": "module-05",
    "number": "05",
    "title": "Packaging 3 High-Ticket Commercial Services ($2,500–$4,500 Sprints)",
    "description": "Package the 3-tool architecture into three standardized, high-margin commercial service offerings that solve expensive bottlenecks.",
    "duration": "55m",
    "lessonsCount": 4,
    "lessons": [
      {
        "id": "05-1",
        "number": "5.1",
        "title": "Service #1: The Inbound Speed-to-Lead Triage Engine ($2,500)",
        "duration": "14m",
        "summary": "Build and package an automated system that intercepts web leads, enriches company data, scores intent, and alerts sales in 90 seconds."
      },
      {
        "id": "05-2",
        "number": "5.2",
        "title": "Service #2: The Accounts Payable Invoice Auditor ($3,500)",
        "duration": "14m",
        "summary": "Build an automated document processing pipeline that extracts line items from vendor bills, matches purchase orders, and syncs to QuickBooks."
      },
      {
        "id": "05-3",
        "number": "5.3",
        "title": "Service #3: The Custom Operations & Dispatch Command Hub ($4,500)",
        "duration": "14m",
        "summary": "Build a complete operational operating system with Airtable Interfaces, automated scheduling, technician dispatch, and client portals."
      },
      {
        "id": "05-4",
        "number": "5.4",
        "title": "Pricing Strategy: Fixed-Scope Sprints vs Open-Ended Hourly Rates",
        "duration": "13m",
        "summary": "Master the psychology of value-based sprint pricing to eliminate client scope creep and protect high profit margins."
      }
    ]
  },
  {
    "id": "module-06",
    "number": "06",
    "title": "Client Acquisition & The 5-Minute 'Trojan Horse' Loom Audit",
    "description": "Land high-paying commercial clients without cold calling using personalized video teardowns and consultative discovery conversations.",
    "duration": "56m",
    "lessonsCount": 4,
    "lessons": [
      {
        "id": "06-1",
        "number": "6.1",
        "title": "The Trojan Horse Strategy: Proving Value Before Pitching",
        "duration": "14m",
        "summary": "Understand the psychological power of demonstrating working prototypes and diagnosing live operational bottlenecks before reaching out."
      },
      {
        "id": "06-2",
        "number": "6.2",
        "title": "Crafting the 5-Minute Loom Teardown Video",
        "duration": "14m",
        "summary": "Master the step-by-step video script that achieves a 35%+ reply rate from busy commercial decision-makers."
      },
      {
        "id": "06-3",
        "number": "6.3",
        "title": "Multi-Touch Outbound Cadence: Cold Email, LinkedIn & Video Tracking",
        "duration": "14m",
        "summary": "Deploy a disciplined 3-touch outreach sequence combining video links, follow-up benchmarks, and view notification timing."
      },
      {
        "id": "06-4",
        "number": "6.4",
        "title": "The 30-Minute Consultative Discovery-to-Close Framework",
        "duration": "14m",
        "summary": "Lead a high-status diagnostic sales call that uncovers the client's true operational costs and leads naturally to a signed sprint contract."
      }
    ]
  },
  {
    "id": "module-07",
    "number": "07",
    "title": "Operations, SLA Contracts & Scaling to $10,000/Month Retainers",
    "description": "Deliver projects on time, structure airtight SLA contracts, convert sprints into monthly retainers, and scale to $10K/mo solo.",
    "duration": "55m",
    "lessonsCount": 4,
    "lessons": [
      {
        "id": "07-1",
        "number": "7.1",
        "title": "The 14-Day Sprint Delivery Assembly Line",
        "duration": "14m",
        "summary": "Execute client implementation sprints smoothly in 14 days using standardized onboarding SOPs and milestone checkpoints."
      },
      {
        "id": "07-2",
        "number": "7.2",
        "title": "Drafting Airtight SOWs, IP Licensing & SLA Agreements",
        "duration": "14m",
        "summary": "Protect your agency with professional Master Service Agreements (MSAs), Statements of Work (SOWs), and Service Level Agreements (SLAs)."
      },
      {
        "id": "07-3",
        "number": "7.3",
        "title": "The Friday Executive Snapshot: Retainer Retaining & Zero Churn",
        "duration": "14m",
        "summary": "Automate a weekly executive digest that visibly proves the value of your monthly retainer and prevents client cancellations."
      },
      {
        "id": "07-4",
        "number": "7.4",
        "title": "Solo Founder Freedom: Managing 10 Clients in Under 15 Hours/Week",
        "duration": "13m",
        "summary": "Master the mathematical growth engine of managing 10 ongoing retainers with automated telemetry, reaching $10K/mo solo."
      }
    ]
  }
];

export const AI_SERVICE_BUSINESS_CURRICULUM = {
  totalModules: 7,
  totalLessons: 28,
  estimatedHours: "7.0 hours",
  modules: AI_SERVICE_BUSINESS_MODULES_METADATA,
};
