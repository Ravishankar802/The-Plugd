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
    "title": "The Automation Business Model & The $10,000 Milestone",
    "description": "Understand the commercial automation landscape, the unit economics of reaching $10,000/month, and the core ingredients of high-margin client workflows.",
    "duration": "55m",
    "lessonsCount": 4,
    "lessons": [
      {
        "id": "01-1",
        "number": "1.1",
        "title": "The $10,000/Month Business Blueprint: The Math of Retainers vs Sprints",
        "duration": "14m",
        "summary": "Deconstruct the exact mathematical pathways to achieving $10,000/month through value-anchored setup fees and recurring maintenance retainers."
      },
      {
        "id": "01-2",
        "number": "1.2",
        "title": "The 3 Core Ingredients of Enterprise Automation (Trigger, Action, Logic)",
        "duration": "14m",
        "summary": "Master the foundational anatomy of production workflows: event listeners, computational reasoning, and destination dispatchers."
      },
      {
        "id": "01-3",
        "number": "1.3",
        "title": "Selecting High-Margin Commercial Bottlenecks to Automate",
        "duration": "13m",
        "summary": "Identify the 4 operational bottlenecks that mid-market businesses eagerly pay $3,000+ to eliminate immediately."
      },
      {
        "id": "01-4",
        "number": "1.4",
        "title": "Client Technical Scoping & The 1-Page Feasibility Audit",
        "duration": "14m",
        "summary": "Conduct technical discovery to verify API capabilities, avoid unworkable legacy systems, and construct an airtight scope of work."
      }
    ]
  },
  {
    "id": "module-02",
    "number": "02",
    "title": "Tool 1 — Make.com Visual Orchestration & Error Routing",
    "description": "Master Make.com advanced visual workflow architecture, router filters, data aggregators, and enterprise error-handling directives.",
    "duration": "56m",
    "lessonsCount": 4,
    "lessons": [
      {
        "id": "02-1",
        "number": "2.1",
        "title": "Architecting Resilient Make.com Scenarios & Custom Webhooks",
        "duration": "14m",
        "summary": "Build production-grade visual scenarios with custom webhook listeners, IP restrictions, and payload verification."
      },
      {
        "id": "02-2",
        "number": "2.2",
        "title": "Routers, Array Aggregators, & Iterators: Complex Data Transformation",
        "duration": "14m",
        "summary": "Manipulate nested JSON data structures, split arrays with iterators, and combine collections with array aggregators."
      },
      {
        "id": "02-3",
        "number": "2.3",
        "title": "Enterprise Error Directives: Resume, Break, Rollback, and Commit",
        "duration": "14m",
        "summary": "Protect scenarios from catastrophic failures using Make.com error directives that handle API downtimes and invalid inputs automatically."
      },
      {
        "id": "02-4",
        "number": "2.4",
        "title": "Automated Error Alerting & Dead-Letter Queue Logging",
        "duration": "14m",
        "summary": "Build an automated telemetry loop that captures failed execution payloads and alerts engineering via Slack/Discord instantly."
      }
    ]
  },
  {
    "id": "module-03",
    "number": "03",
    "title": "Tool 2 — n8n Self-Hosted Automation & Data Privacy",
    "description": "Deploy and manage self-hosted n8n instances on Railway/Docker, write custom JavaScript nodes, and win enterprise privacy contracts.",
    "duration": "55m",
    "lessonsCount": 4,
    "lessons": [
      {
        "id": "03-1",
        "number": "3.1",
        "title": "Deploying Self-Hosted n8n on Railway & Docker in 15 Minutes",
        "duration": "14m",
        "summary": "Provision a private, scalable n8n server on Railway or DigitalOcean with persistent PostgreSQL database storage."
      },
      {
        "id": "03-2",
        "number": "3.2",
        "title": "Writing Custom JavaScript/Python Code Nodes in n8n",
        "duration": "14m",
        "summary": "Harness the power of the Code Node to perform complex data manipulation, regex matching, and cryptographic hashing."
      },
      {
        "id": "03-3",
        "number": "3.3",
        "title": "The Enterprise Privacy Pitch: HIPAA, GDPR & On-Premise Execution",
        "duration": "14m",
        "summary": "Win high-ticket contracts with healthcare, legal, and financial firms by offering zero-third-party-data-leakage automation."
      },
      {
        "id": "03-4",
        "number": "3.4",
        "title": "Hybrid Workflows: Bridging n8n and Make.com for Optimal Cost",
        "duration": "13m",
        "summary": "Design an optimized hybrid architecture that uses Make.com for quick SaaS integrations and n8n for high-volume batch data processing."
      }
    ]
  },
  {
    "id": "module-04",
    "number": "04",
    "title": "Tools 3 & 4 — OpenAI Assistants API & Claude 3.7 Tool Calling",
    "description": "Build intelligent cognitive agents that query databases, extract structured information from messy inputs, and execute business tools.",
    "duration": "56m",
    "lessonsCount": 4,
    "lessons": [
      {
        "id": "04-1",
        "number": "4.1",
        "title": "Claude 3.7 vs OpenAI Assistants: Selecting the Cognitive Engine",
        "duration": "14m",
        "summary": "Evaluate frontier models across reasoning capability, tool-calling precision, document vision parsing, and token economics."
      },
      {
        "id": "04-2",
        "number": "4.2",
        "title": "Engineering Deterministic JSON Schemas with Strict Boundary Controls",
        "duration": "14m",
        "summary": "Force LLMs to return strict, parseable JSON conforming to Zod/JSON schemas with zero conversational filler or markdown formatting."
      },
      {
        "id": "04-3",
        "number": "4.3",
        "title": "Building Grounded Knowledge RAG with OpenAI File Search",
        "duration": "14m",
        "summary": "Ingest company policy manuals, product catalogs, and standard operating procedures into vector databases for zero-hallucination queries."
      },
      {
        "id": "04-4",
        "number": "4.4",
        "title": "Tool Execution Loops: Allowing LLMs to Query External APIs Live",
        "duration": "14m",
        "summary": "Build closed-loop reasoning systems where the model queries a live CRM database, evaluates results, and takes action autonomously."
      }
    ]
  },
  {
    "id": "module-05",
    "number": "05",
    "title": "Tool 5 — Airtable Relational Databases & Softr Portals",
    "description": "Model scalable relational database schemas in Airtable, automate state transitions, and deploy branded client portals in Softr without code.",
    "duration": "55m",
    "lessonsCount": 4,
    "lessons": [
      {
        "id": "05-1",
        "number": "5.1",
        "title": "Relational Database Modeling: Linked Records, Lookup Fields & Rollups",
        "duration": "14m",
        "summary": "Structure clean, normalized database schemas with linked record relationships, lookup fields, and conditional rollup calculations."
      },
      {
        "id": "05-2",
        "number": "5.2",
        "title": "Airtable Native Automations & Webhook Trigger Bridges",
        "duration": "14m",
        "summary": "Configure high-speed native Airtable automations and connect them to external orchestrators via authenticated webhooks."
      },
      {
        "id": "05-3",
        "number": "5.3",
        "title": "Publishing Custom Client Portals with Softr in 60 Minutes",
        "duration": "14m",
        "summary": "Build branded, interactive web portals where clients can view live reports, approve invoices, and submit requests without Airtable access."
      },
      {
        "id": "05-4",
        "number": "5.4",
        "title": "Airtable Interfaces vs Softr: Selecting the Right Front-End",
        "duration": "13m",
        "summary": "Compare Airtable Interfaces with Softr web portals to choose the right front-end based on user permissions, cost, and security."
      }
    ]
  },
  {
    "id": "module-06",
    "number": "06",
    "title": "Tools 6 & 7 — Multimodal Prospecting & Speed-to-Lead Telephony",
    "description": "Deploy personalized video/audio outreach with ElevenLabs & HeyGen, and build instant 15-second telephony lead response systems with Twilio.",
    "duration": "56m",
    "lessonsCount": 4,
    "lessons": [
      {
        "id": "06-1",
        "number": "6.1",
        "title": "ElevenLabs & HeyGen: Automated Personalized Video Prospecting",
        "duration": "14m",
        "summary": "Build an automated pipeline that generates personalized audio and dynamic video outreach assets for high-value B2B accounts."
      },
      {
        "id": "06-2",
        "number": "6.2",
        "title": "Perplexity & DeepSeek: Autonomous Market Intelligence Systems",
        "duration": "14m",
        "summary": "Build automated research bots that scrape live web data, track competitor pricing, and compile executive intelligence briefs."
      },
      {
        "id": "06-3",
        "number": "6.3",
        "title": "Twilio Telephony: The 15-Second Missed-Call AI Text-Back Engine",
        "duration": "14m",
        "summary": "Build an automated telephony system that intercepts missed business phone calls and texts callers within 15 seconds."
      },
      {
        "id": "06-4",
        "number": "6.4",
        "title": "WhatsApp Business API & Conversational Lead Qualification",
        "duration": "14m",
        "summary": "Deploy interactive WhatsApp bots that qualify global prospects, share catalog PDFs, and book calendar appointments in-chat."
      }
    ]
  },
  {
    "id": "module-07",
    "number": "07",
    "title": "Commercial Packaging, Loom Audits & Retainer Retaining",
    "description": "Package the 7 tools into 3 high-margin service offers, close clients using the 5-minute Loom teardown, and build an enduring $10K/mo agency.",
    "duration": "55m",
    "lessonsCount": 4,
    "lessons": [
      {
        "id": "07-1",
        "number": "7.1",
        "title": "The 3 High-Margin Offer Blueprints ($2,500–$4,500 Sprints)",
        "duration": "14m",
        "summary": "Package your technical skills into three defined, productized transformation offers with fixed scope and rapid delivery."
      },
      {
        "id": "07-2",
        "number": "7.2",
        "title": "The 5-Minute 'Trojan Horse' Loom Video Audit Strategy",
        "duration": "14m",
        "summary": "Record personalized, high-converting video audits that diagnose bottlenecks and demonstrate working solutions before pitching."
      },
      {
        "id": "07-3",
        "number": "7.3",
        "title": "The Ironclad SOW Contract & 50% Upfront Payment Structure",
        "duration": "14m",
        "summary": "Protect your agency with professional Statements of Work (SOWs) that define boundaries, deliverables, and payment milestones."
      },
      {
        "id": "07-4",
        "number": "7.4",
        "title": "The Retainer Retaining Engine: Scaling to $10,000/Month Solo",
        "duration": "13m",
        "summary": "Convert sprint clients into sticky $750–$1,250/month maintenance retainers using the automated weekly executive performance snapshot."
      }
    ]
  }
];

export const AI_AUTOMATIONS_CURRICULUM = {
  totalModules: 7,
  totalLessons: 28,
  estimatedHours: "7.0 hours",
  modules: AI_AUTOMATIONS_MODULES_METADATA,
};
