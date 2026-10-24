const fs = require('fs');
const path = require('path');
const { createLesson } = require('./curriculum-builder-helper.cjs');

const courseTitle = "7 AI Automation Tools That Could Make You $10,000+";

const modulesData = [
  {
    num: 1,
    id: "module-01",
    title: "Getting Started with AI Automation & The $10,000 Milestone",
    duration: "1h 45m",
    description: "Demystify no-code AI automation, calculate your trajectory to $10,000/month, and master the fundamental trigger-logic-action paradigm.",
    lessons: [
      {
        lesNum: 1,
        title: "What AI Automation Really Is (And Why You Don't Need Coding Skills)",
        duration: "15m",
        summary: "Understand the fundamental shift from custom coding to visual orchestration engines connecting cloud APIs.",
        bulletPoints: [
          "The No-Code Paradigm: Modern APIs provide REST endpoints that visual builders connect seamlessly without writing raw Python or JavaScript.",
          "The Automation Triad: Every commercial system consists of an Ingestion Trigger, Cognitive Reasoning Layer, and Execution Dispatcher.",
          "Enterprise Willingness to Pay: Businesses pay for operational efficiency and eliminated manual hours, not line count of code.",
          "Accessible Tech Stack: How visual platforms enable solo builders to deploy solutions that once required a full engineering squad."
        ],
        takeaway: "Businesses buy solved operational problems, not lines of code. Visual orchestration delivers enterprise value in days instead of months."
      },
      {
        lesNum: 2,
        title: "The $10,000 Income Roadmap: Breaking Down the Numbers",
        duration: "15m",
        summary: "Deconstruct the exact mathematical pathways to achieving $10,000/month through setup fees and recurring retainers.",
        bulletPoints: [
          "Retainer Mathematical Models: Four clients at $2,500/month or ten clients at $1,000/month create recurring financial predictability.",
          "One-Off Sprints vs. Retainers: Why initial workflow implementations ($1,500-$3,500) must transition into ongoing optimization retainers ($500-$1,000/mo).",
          "Customer Lifetime Value: Keeping client churn below 5% through monthly performance reports and proactive workflow tuning.",
          "The 90-Day Ramp Timeline: Realistic progression milestones from initial sandbox builds to full client capacity."
        ],
        takeaway: "Recurring retainers are the backbone of predictable agency revenue. Never sell a one-time build without an attached maintenance contract."
      },
      {
        lesNum: 3,
        title: "The 3 Core Ingredients of Every Automation (Trigger, Action, Logic)",
        duration: "15m",
        summary: "Master the fundamental anatomy of every workflow: event listeners, computational reasoning, and destination dispatchers.",
        bulletPoints: [
          "Event Triggers: Webhook pushes, scheduled cron polls, and database change streams that awaken the automation.",
          "Cognitive Transformation: Parsing JSON payloads, calling LLM prompts, and filtering routing conditions.",
          "Deterministic Execution: Sending API POST/PATCH requests to CRMs, payment processors, and communication channels.",
          "State Persistence: Recording execution logs and status flags to prevent duplicated downstream actions."
        ],
        takeaway: "Every complex enterprise automation is merely a chain of simple triggers, transformations, and actions linked with guardrails."
      },
      {
        lesNum: 4,
        title: "Common Misconceptions That Stop Complete Beginners",
        duration: "15m",
        summary: "Dismantle imposter syndrome, developer bias, and unfounded fears about AI model instability in commercial settings.",
        bulletPoints: [
          "The 'Coding Required' Myth: Modern SaaS platforms are designed explicitly for API interoperability, not custom compiler engineering.",
          "The 'AI Hallucinates Everything' Fallacy: How temperature constraints, schema validation, and grounding prevent output drift.",
          "Client Perception: Why small business owners care about saving 15 hours a week, not what tools you used under the hood.",
          "Risk Management: Isolating environments with sandbox API keys to prevent accidental data overrides."
        ],
        takeaway: "Confidence comes from verified client outcomes. Master the business outcome and the technical mechanics will naturally follow."
      },
      {
        lesNum: 5,
        title: "Auditing Everyday Business Time Drains (The 5-Hour Test)",
        duration: "15m",
        summary: "Learn how to conduct an operational diagnostic to uncover high-friction tasks that cost businesses thousands monthly.",
        bulletPoints: [
          "The 5-Hour Rule: Identifying any task that administrative staff performs manually for more than five hours each week.",
          "Data Re-Entry Traps: Copy-pasting lead details from email forms to spreadsheets and then to proprietary software.",
          "Customer Status Bottlenecks: Repeated inquiries regarding shipment tracking, appointment availability, and document signing.",
          "Quantifying Friction: Calculating annual employee labor cost waste to justify premium implementation pricing."
        ],
        takeaway: "If an employee performs a sequence of clicks and keystrokes identically three times a day, it should be automated."
      },
      {
        lesNum: 6,
        title: "Selecting Your First Tech Stack & Setting Up Free Sandboxes",
        duration: "15m",
        summary: "Set up development environments, obtain free developer trial tiers, and organize credentials safely.",
        bulletPoints: [
          "Core Account Architecture: Establishing clean accounts across Make.com, OpenAI Platform, Airtable, and GitHub.",
          "Environment Isolation: Maintaining separate staging and production workspaces to protect live client data.",
          "API Key Hygiene: Using encrypted password managers and environment variables rather than hardcoding credentials.",
          "Zero-Cost Prototyping: Maximizing generous freemium tiers during the learning and initial showcase phase."
        ],
        takeaway: "Treat your development environment with enterprise discipline from day one. Proper credential hygiene prevents catastrophic data leaks."
      },
      {
        lesNum: 7,
        title: "Module 1 Checkpoint: Your $10K Milestone Execution Plan",
        duration: "15m",
        summary: "Synthesize the foundational principles into a tangible 90-day action plan tailored to your specific background and niche.",
        bulletPoints: [
          "Niche Alignment: Choosing an industry where manual overhead is high and technology adoption is historically low.",
          "Service Definition: Packaging one specific operational automation as your initial flagship offering.",
          "Revenue Target Roadmap: Setting weekly lead outreach and discovery call targets to achieve $10,000/month.",
          "Operational Commitments: Committing to hands-on build exercises across the upcoming tool-specific modules."
        ],
        takeaway: "Execution beats strategy. Build your sandbox, select your target niche, and proceed systematically through each tool module."
      }
    ]
  },
  {
    num: 2,
    id: "module-02",
    title: "Tool 1 — Make.com (Visual Workflow Orchestration Engine)",
    duration: "1h 45m",
    description: "Master Make.com from basic scenarios to advanced routers, error handlers, and high-throughput data iterators.",
    lessons: [
      {
        lesNum: 1,
        title: "Setting Up Make.com & Navigating the Visual Scenario Builder",
        duration: "15m",
        summary: "Learn the architecture of Make.com scenarios, bundles, operations, and the visual canvas execution model.",
        bulletPoints: [
          "Canvas Navigation: Understanding modules, connection lines, data bubbles, and scenario settings.",
          "Operations & Data Bundles: How Make processes collections of records through sequential pipeline steps.",
          "Trigger Types: Distinguishing between Instant Webhooks (push) and Polling triggers (cron intervals).",
          "Execution History & Logs: Inspecting detailed input/output bundles to debug pipeline states."
        ],
        takeaway: "Make.com visual scenarios provide full transparency into data payloads at every node of execution."
      },
      {
        lesNum: 2,
        title: "Connecting Your First Two Apps (Google Sheets to Gmail & Slack)",
        duration: "15m",
        summary: "Build an end-to-end integration listening for row additions and dispatching formatted multi-channel alerts.",
        bulletPoints: [
          "OAuth Connections: Authenticating cloud providers securely without sharing plain-text passwords.",
          "Dynamic Variable Mapping: Injecting spreadsheet row values into email bodies and Slack notification templates.",
          "Data Type Parsing: Handling date conversions, boolean checks, and currency formatting cleanly.",
          "Single-Record vs. Bulk Processing: Managing multi-row batch execution without exceeding rate limits."
        ],
        takeaway: "Mastering dynamic field mapping allows you to connect any arbitrary SaaS database to any communication channel."
      },
      {
        lesNum: 3,
        title: "Data Mapping, Formatting & Handling Unstructured Text",
        duration: "15m",
        summary: "Use built-in Make functions for regex text extraction, array manipulation, and date calculations.",
        bulletPoints: [
          "Built-in String Functions: Utilizing substring, trim, lower, and regex replace to sanitize incoming inputs.",
          "Date & Time Parsing: Converting UTC timestamps to localized client timezones with parseDate and formatDate.",
          "Array Navigation: Accessing specific nested elements using get, map, and array slicing.",
          "Fallback Value Handling: Using the ifempty function to prevent pipeline breaks when optional fields are null."
        ],
        takeaway: "Robust automations never assume inputs are clean. Always normalize and sanitize data before passing to destination APIs."
      },
      {
        lesNum: 4,
        title: "Error Handlers & Routers: Building Bulletproof Workflows",
        duration: "15m",
        summary: "Implement Rollback, Commit, Resume, and Ignore directives alongside multi-branch router filters.",
        bulletPoints: [
          "Router Logic: Splitting a single data stream into conditional branches based on record properties.",
          "Error Directives: Deploying Resume (fallback values), Ignore (skip non-critical steps), and Break (automatic retries).",
          "Automated Failure Alerting: Configuring instant notifications to agency Telegram/Slack channels upon unhandled exceptions.",
          "Transactional Integrity: Ensuring failed mid-scenario steps do not leave client databases in corrupted states."
        ],
        takeaway: "Production reliability separates amateurs from agencies. Every external API call must have a configured error handling directive."
      },
      {
        lesNum: 5,
        title: "Scheduling, Webhooks & Instant Trigger Optimization",
        duration: "15m",
        summary: "Configure custom webhook URLs, manage queue concurrency, and minimize operation consumption costs.",
        bulletPoints: [
          "Custom Webhooks: Setting up instant endpoints with payload structure auto-discovery.",
          "Queue Processing: Managing sequential vs. parallel execution to prevent database write conflicts.",
          "Operation Optimization: Structuring scenarios to accomplish tasks in fewer operations to reduce platform overhead.",
          "Webhook Security: Verifying shared secrets and IP header origin to block malicious requests."
        ],
        takeaway: "Instant webhooks eliminate unnecessary polling costs and deliver real-time responsiveness that delights clients."
      },
      {
        lesNum: 6,
        title: "Advanced Iterators, Aggregators & Multi-Branch Logic",
        duration: "15m",
        summary: "Master array deconstruction with Iterators and record reassembly with Array, Text, and Numeric Aggregators.",
        bulletPoints: [
          "Iterator Mechanics: Unpacking an array of items (like invoice line items) into individual processing bundles.",
          "Aggregator Synthesis: Recombining transformed bundles into a single structured array or HTML digest table.",
          "Cross-Module Filtering: Applying granular boundary filters to route high-value leads differently from low-tier inquiries.",
          "Nested Scenario Architecture: Triggering subordinate scenarios via webhook calls for modular maintainability."
        ],
        takeaway: "Iterators and aggregators unlock complex enterprise data transformations that visual tools otherwise struggle to handle."
      },
      {
        lesNum: 7,
        title: "Module 2 Project: The Autonomous Inbound Inquiry Dispatcher",
        duration: "15m",
        summary: "Build, test, and package a production-ready lead triaging engine routing inquiries to CRM, Slack, and email.",
        bulletPoints: [
          "System Scope: Ingest web form submissions, evaluate lead budget, and alert sales representatives via Slack.",
          "CRM Record Creation: Automatically insert and link contacts and deals inside HubSpot or Airtable.",
          "Automated Response Email: Dispatch personalized confirmation emails with attached capability decks.",
          "Client Packaging: How to sell this exact dispatcher workflow for $1,500 setup plus $350/month maintenance."
        ],
        takeaway: "This inbound dispatcher solves an immediate revenue bottleneck for businesses and serves as your first sellable asset."
      }
    ]
  },
  {
    num: 3,
    id: "module-03",
    title: "Tool 2 — n8n (Self-Hosted Advanced Workflow Architecture)",
    duration: "1h 45m",
    description: "Deploy n8n for data-sovereign enterprise clients who require on-premise execution, custom JavaScript nodes, and zero operation limits.",
    lessons: [
      {
        lesNum: 1,
        title: "Why Modern Businesses Choose n8n for Data Sovereignty",
        duration: "15m",
        summary: "Understand the regulatory, cost, and architectural advantages of open-source workflow orchestration.",
        bulletPoints: [
          "Data Privacy & Compliance: Keeping healthcare and financial data within client-owned infrastructure for GDPR/HIPAA compliance.",
          "Zero Per-Operation Pricing: Executing millions of data cycles without exponential SaaS subscription bills.",
          "Full Code Extensibility: Writing arbitrary Node.js scripts and importing npm packages directly inside nodes.",
          "Enterprise Positioning: How offering self-hosted solutions allows you to close security-conscious B2B accounts."
        ],
        takeaway: "n8n gives you enterprise credibility. When security-conscious clients reject cloud SaaS tools, n8n closes the deal."
      },
      {
        lesNum: 2,
        title: "Self-Hosting vs. Cloud: Free Deployment on Railway or VPS",
        duration: "15m",
        summary: "Deploy an enterprise n8n instance with persistent Docker volumes and SSL certificates in under 15 minutes.",
        bulletPoints: [
          "One-Click Deployments: Launching n8n on Railway.app with PostgreSQL database persistence.",
          "VPS Setup via Docker Compose: Configuring an isolated Ubuntu droplet on Hetzner or DigitalOcean with Caddy reverse proxy.",
          "SSL & Domain Configuration: Pointing custom subdomains (e.g., automations.client.com) with automatic HTTPS.",
          "Backup Strategies: Automating daily PostgreSQL dumps to Amazon S3 to protect workflow configurations."
        ],
        takeaway: "Hosting your own multi-tenant n8n infrastructure reduces agency operating costs to pennies while charging premium client fees."
      },
      {
        lesNum: 3,
        title: "Visual Node Orchestration & Complex Branching in n8n",
        duration: "15m",
        summary: "Master the node-based flow canvas, pin data for fast testing, and implement switch conditions.",
        bulletPoints: [
          "The n8n Execution Paradigm: How items flow as structured JSON arrays through node ports.",
          "Data Pinning: Freezing sample incoming payloads to test downstream logic without re-triggering external events.",
          "Switch Node Rules: Evaluating complex multi-case conditions with string, numeric, and regex comparisons.",
          "Sub-Workflow Execution: Triggering modular sub-workflows to keep master canvases clean and organized."
        ],
        takeaway: "Data pinning in n8n drastically accelerates development by allowing instantaneous feedback on node transformations."
      },
      {
        lesNum: 4,
        title: "Writing Custom JavaScript Code Nodes for Advanced Logic",
        duration: "15m",
        summary: "Leverage Node.js within the Code node to transform nested data structures and perform complex calculations.",
        bulletPoints: [
          "The Run Once vs. Run for Each Item Pattern: Optimizing execution efficiency across large record batches.",
          "JavaScript Array Methods: Utilizing map, filter, reduce, and find to reshape payloads in milliseconds.",
          "External NPM Libraries: Enabling crypto, moment, or lodash inside custom environment variables.",
          "Defensive Coding: Implementing try/catch wrappers within code nodes to guarantee graceful failure modes."
        ],
        takeaway: "A single 5-line JavaScript node often replaces 10 visual transformation modules, drastically simplifying your architecture."
      },
      {
        lesNum: 5,
        title: "Handling High-Volume Webhooks & Database Polling",
        duration: "15m",
        summary: "Architect systems capable of ingesting thousands of webhook events per minute without dropping connections.",
        bulletPoints: [
          "Webhook Response Modes: Immediately responding with 200 OK while processing asynchronous tasks in the background.",
          "PostgreSQL & MySQL Nodes: Executing parameterized SQL queries, bulk upserts, and relational transactions.",
          "Concurrency Management: Configuring n8n queue mode with Redis to scale horizontally across multiple worker nodes.",
          "Dead Letter Queues: Storing unprocessable webhook payloads in a staging database for manual review."
        ],
        takeaway: "Decoupling webhook ingestion from downstream processing ensures your workflows never drop mission-critical client events."
      },
      {
        lesNum: 6,
        title: "Securing Credentials, Environment Variables & API Keys",
        duration: "15m",
        summary: "Implement enterprise credential management, role-based access control, and environment isolation.",
        bulletPoints: [
          "n8n Credential Store: Encrypted at rest using AES-256 encryption keys defined in the server environment.",
          "Environment Variables: Managing distinct staging and production API endpoints cleanly across instances.",
          "User Access Management: Assigning editor vs. viewer roles to prevent unauthorized client modifications.",
          "Audit Logging: Monitoring user edits and scenario revisions to maintain compliance and traceability."
        ],
        takeaway: "Enterprise clients demand verifiable security. Encrypted credentials and role-based permissions satisfy corporate IT audits."
      },
      {
        lesNum: 7,
        title: "Module 3 Project: Enterprise-Grade CRM Sync & Hygiene Pipeline",
        duration: "15m",
        summary: "Build and deploy an automated data deduplication, enrichment, and bi-directional CRM synchronization system.",
        bulletPoints: [
          "Project Blueprint: Connect webhooks, query PostgreSQL, deduplicate contacts by email domain, and sync to HubSpot.",
          "Data Cleansing: Capitalize company names, validate phone numbers into E.164 format, and verify email MX records.",
          "Automated Conflict Resolution: Resolving discrepancies when records are updated simultaneously across two platforms.",
          "Commercial Value: Pitching this as an Enterprise Data Hygiene Retainer for $3,000 setup plus $850/month."
        ],
        takeaway: "Clean CRM data is universally valuable to sales leaders. This hygiene pipeline is one of the easiest high-ticket offers to sell."
      }
    ]
  },
  {
    num: 4,
    id: "module-04",
    title: "Tool 3 — OpenAI Assistants API & Function Calling",
    duration: "1h 45m",
    description: "Turn static LLMs into deterministic operational engines using tool schemas, vector search RAG, and strict JSON outputs.",
    lessons: [
      {
        lesNum: 1,
        title: "Moving Beyond Basic ChatGPT: The Power of Programmatic AI",
        duration: "15m",
        summary: "Understand why manual web chat fails in business operations and how programmatic API endpoints deliver automation.",
        bulletPoints: [
          "The Interface Trap: Why manual copying from web chatbots cannot scale across automated enterprise workflows.",
          "Stateless vs. Stateful APIs: Comparing Chat Completions with the persistent thread management of the Assistants API.",
          "Deterministic Parameters: Setting temperature to 0.0 and seed parameters to guarantee consistent structured behavior.",
          "Automated Execution Loops: Enabling language models to execute autonomously inside background server scenarios."
        ],
        takeaway: "Programmatic AI transforms conversational novelties into autonomous operational infrastructure that works while you sleep."
      },
      {
        lesNum: 2,
        title: "Defining Custom Instructions, Role Persona & Guardrails",
        duration: "15m",
        summary: "Engineer bulletproof system prompts that enforce boundaries, eliminate hallucination, and govern output tone.",
        bulletPoints: [
          "Role Grounding: Explicitly establishing operational authority, context, and domain boundaries in the system prompt.",
          "Negative Constraints: Explicitly defining what the model must never attempt, assume, or fabricate.",
          "Confidence Scoring: Instructing the assistant to provide an uncertainty flag when input data is incomplete.",
          "Human-in-the-Loop Routing: Triggering administrative alerts when model certainty drops below business thresholds."
        ],
        takeaway: "System instructions are the software specifications of the AI era. Precision in prompt constraints guarantees reliability."
      },
      {
        lesNum: 3,
        title: "Leveraging File Search (RAG) for Custom Business Knowledge",
        duration: "15m",
        summary: "Upload internal documentation, product catalogs, and SOPs to provide real-time grounded context.",
        bulletPoints: [
          "Vector Stores & Chunking: How the Assistants API parses, indexes, and retrieves relevant text passages automatically.",
          "Document Hygiene: Formatting corporate PDFs, Markdown files, and spreadsheets to maximize vector semantic search accuracy.",
          "Citation Transparency: Extracting source annotations to verify which internal policy document informed the output.",
          "Managing Context Windows: Balancing vector retrieval density against token consumption costs."
        ],
        takeaway: "RAG gives AI a private, up-to-date memory of the client's business, eliminating generic responses and hallucinations."
      },
      {
        lesNum: 4,
        title: "Function Calling (Tool Use): Empowering AI to Query Real APIs",
        duration: "15m",
        summary: "Author clean JSON schemas that allow the assistant to trigger external database lookups and calculations.",
        bulletPoints: [
          "Tool Schema Design: Defining tool name, description, and strict parameter types in JSON schema format.",
          "The Function Call Loop: Model selects tool -> workflow executes external API -> workflow returns result to model.",
          "Multiple Tool Selection: Allowing the model to orchestrate multi-step research sequences autonomously.",
          "Parameter Validation: Enforcing required properties and enum constraints to prevent malformed API requests."
        ],
        takeaway: "Tool calling bridges the gap between language reasoning and real-world database actions, making AI genuinely useful."
      },
      {
        lesNum: 5,
        title: "Enforcing JSON Schemas & Eliminating Hallucinations",
        duration: "15m",
        summary: "Utilize structured outputs with strict JSON schemas to guarantee 100% predictable downstream data ingestion.",
        bulletPoints: [
          "The Structured Outputs Paradigm: Using response_format: { type: 'json_schema', strict: true } to eliminate parse errors.",
          "Schema Definition Rules: Why every field must be marked required and additionalProperties must be set to false.",
          "Downstream Ingestion Safety: Guaranteeing that Make.com or n8n can map JSON fields without regex fallback hacks.",
          "Zero Hallucination Benchmarks: Verifying that model outputs adhere to schema types under high-volume stress tests."
        ],
        takeaway: "Strict structured outputs eliminate JSON parsing failures forever. Your automations will never crash on malformed syntax."
      },
      {
        lesNum: 6,
        title: "Token Cost Management & Model Selection (GPT-4o vs. Mini)",
        duration: "15m",
        summary: "Optimize operational margins by selecting the right model for each task and caching repetitive context.",
        bulletPoints: [
          "Model Selection Matrix: Deploying GPT-4o Mini for classification and parsing; reserving GPT-4o for complex synthesis.",
          "Prompt Caching Economics: Leveraging automated prompt caching to slash input token costs by up to 50%.",
          "Context Pruning: Truncating conversational thread history to prevent unnecessary token bloat on long customer interactions.",
          "Client Billing Transparency: Factoring API token consumption directly into your recurring monthly maintenance fee."
        ],
        takeaway: "Smart model routing delivers 90% of the cognitive capability at 10% of the cost, maximizing your agency profit margins."
      },
      {
        lesNum: 7,
        title: "Module 4 Project: Autonomous Customer Support Triaging Assistant",
        duration: "15m",
        summary: "Build an end-to-end support assistant reading incoming Zendesk/HelpScout tickets and drafting verified responses.",
        bulletPoints: [
          "Project Blueprint: Ingest tickets, retrieve return policy from vector store, call database for order status, and draft reply.",
          "Classification & Tagging: Automatically assign sentiment score, urgency level, and department routing tags.",
          "Approval Queue Workflow: Presenting drafted responses in an Airtable review queue for human agent one-click dispatch.",
          "Client Pricing Strategy: Selling this support accelerator for $2,500 setup plus $750/month ongoing maintenance."
        ],
        takeaway: "Support triaging saves companies hundreds of hours monthly and provides an undeniable return on investment."
      }
    ]
  },
  {
    num: 5,
    id: "module-05",
    title: "Tool 4 — Airtable + Softr (Client Portals & Relational Backends)",
    duration: "1h 45m",
    description: "Design relational database architectures and client-facing interfaces that turn raw automations into intuitive SaaS products.",
    lessons: [
      {
        lesNum: 1,
        title: "Relational Database Foundations for Non-Developers",
        duration: "15m",
        summary: "Understand tables, linked records, primary keys, and foreign relationships without complex SQL syntax.",
        bulletPoints: [
          "Spreadsheets vs. Relational Databases: Why flat Excel sheets collapse when managing multi-entity business workflows.",
          "Linked Record Architecture: Connecting Clients, Projects, Tasks, Invoices, and Deliverables cleanly.",
          "Rollups & Lookups: Aggregating child record totals (e.g., total invoice balance) onto parent company records.",
          "Data Normalization: Eliminating data redundancy so updating an address once updates it across all historical orders."
        ],
        takeaway: "Relational databases are the single source of truth for business operations. Clean schema design prevents chaotic workflow errors."
      },
      {
        lesNum: 2,
        title: "Designing Normalized Tables (Clients, Projects, Invoices, Deliverables)",
        duration: "15m",
        summary: "Build a production-grade operational CRM schema tailored to professional service agencies and consultants.",
        bulletPoints: [
          "Primary Key Conventions: Crafting readable, formula-generated primary keys (e.g., [INV-2026-004] - Acme Corp).",
          "Single-Select Status Pipelines: Establishing explicit status stages that serve as automation triggers.",
          "Field Type Discipline: Using strict email, phone, number, and currency field types to enforce input validation.",
          "Formula Optimization: Writing IF, DATETIME_DIFF, and ARRAYJOIN formulas to calculate operational velocity."
        ],
        takeaway: "A well-structured Airtable base acts as the central brain of an automated business, making operations effortless."
      },
      {
        lesNum: 3,
        title: "Airtable Automations: Native Scripts, Formula Fields & Webhooks",
        duration: "15m",
        summary: "Harness built-in Airtable triggers and JavaScript automations for fast, internal operational tasks.",
        bulletPoints: [
          "Native Trigger Types: When record enters view, when record matches conditions, or when form submitted.",
          "Airtable Scripting Extension: Writing 10-line JavaScript snippets to deduplicate records and format payloads.",
          "Outgoing Webhook Actions: Triggering Make.com or n8n scenarios instantly when a status changes to 'Approved'.",
          "Native Action Guardrails: Managing Airtable monthly automation limits through selective conditional triggers."
        ],
        takeaway: "Native Airtable automations handle internal record hygiene, leaving complex multi-app orchestration to Make and n8n."
      },
      {
        lesNum: 4,
        title: "Building Client Dashboards & Portals in Softr Without Code",
        duration: "15m",
        summary: "Connect Softr to Airtable to publish secure, responsive client portals complete with authentication and permissions.",
        bulletPoints: [
          "Softr + Airtable Synergy: How Softr converts relational database tables into beautiful, client-facing web applications.",
          "Block Selection: Deploying dynamic list blocks, table views, Kanban boards, and action buttons without code.",
          "Custom Branding: Styling portal typography, color palettes, and logos to match the client's corporate identity.",
          "Real-Time Bi-Directional Sync: Ensuring client portal edits immediately reflect across underlying Airtable records."
        ],
        takeaway: "Softr transforms back-end database plumbing into an executive-facing software portal that clients happily pay thousands for."
      },
      {
        lesNum: 5,
        title: "Managing User Permissions, Magic Links & Client Access Control",
        duration: "15m",
        summary: "Configure role-based access control so clients only see their own projects, invoices, and sensitive deliverables.",
        bulletPoints: [
          "User Groups & Permissions: Defining Client vs. Staff vs. Administrator access tiers inside Softr.",
          "Conditional Record Visibility: Filtering list blocks so logged-in users only access records where email matches.",
          "Passwordless Magic Links: Frictionless, secure client authentication without cumbersome forgotten-password tickets.",
          "Data Isolation Verification: Auditing portal views to guarantee zero risk of cross-client data exposure."
        ],
        takeaway: "Strict user permissions protect client privacy and allow you to serve multiple clients from a single centralized base."
      },
      {
        lesNum: 6,
        title: "Connecting Airtable to Make.com for Two-Way Relational Sync",
        duration: "15m",
        summary: "Build bi-directional integrations that query linked records, create relational associations, and manage updates.",
        bulletPoints: [
          "Search Records Module: Querying Airtable with formula filters to locate existing records before creating duplicates.",
          "Linked Record Creation: Passing record IDs into linked record fields to establish relational associations dynamically.",
          "Upsert Patterns: Updating existing records or creating new ones based on unique identifier matching.",
          "Batch Operations: Using Make's bulk record modules to process hundreds of updates in a single API operation."
        ],
        takeaway: "Bi-directional relational sync connects front-end client portal interactions directly into your automated execution pipelines."
      },
      {
        lesNum: 7,
        title: "Module 5 Project: The White-Label Client Operations Hub",
        duration: "15m",
        summary: "Package and deploy a complete client portal where customers submit requests, track progress, and review invoices.",
        bulletPoints: [
          "Project Blueprint: Complete Softr portal powered by Airtable with integrated Make.com notification automations.",
          "Deliverable Showcase: Interactive deliverables gallery with revision request buttons and automated approval logging.",
          "Billing Integration: Displaying outstanding Stripe invoice links and payment status badges dynamically.",
          "Commercial Value: Selling this custom client portal solution for $3,500 setup plus $500/month hosting & maintenance."
        ],
        takeaway: "A custom client portal elevates your service from a freelance gig to a high-value software-enabled agency partnership."
      }
    ]
  },
  {
    num: 6,
    id: "module-06",
    title: "Tool 5 — ElevenLabs & HeyGen (AI Voice & Video Systems)",
    duration: "1h 45m",
    description: "Automate personalized audio generation, dynamic video prospecting, and localized content repurposing at commercial scale.",
    lessons: [
      {
        lesNum: 1,
        title: "The Commercial Explosion of Voice & Avatar Automation",
        duration: "15m",
        summary: "Understand how synthetic voice and generative video are transforming B2B outreach, customer training, and marketing.",
        bulletPoints: [
          "The Personalization Imperative: Personalized video and audio outreach generates 3x to 5x higher response rates than plain text.",
          "Production Bottlenecks Eliminated: Generating hundreds of customized video assets without cameras, studios, or voice actors.",
          "The B2B Commercial Opportunity: Selling automated outbound video pipelines to agencies, real estate firms, and SaaS companies.",
          "Ethical & Legal Safeguards: Managing client consent, biometric disclosures, and avoiding deceptive synthetic media."
        ],
        takeaway: "Generative media allows you to produce personalized video and audio assets at scale, creating unmatched client outreach leverage."
      },
      {
        lesNum: 2,
        title: "Professional Voice Cloning & High-Fidelity Audio Generation",
        duration: "15m",
        summary: "Master ElevenLabs voice cloning, emotion controls, latency optimization, and programmatic text-to-speech API calls.",
        bulletPoints: [
          "Instant vs. Professional Voice Cloning: Uploading clean reference audio to capture vocal nuances and timbre accurately.",
          "Voice Settings Tuning: Adjusting stability, clarity, and style exaggeration parameters to eliminate robotic artifacts.",
          "The ElevenLabs API: Passing dynamic text payloads from Make.com to generate MP3 audio files in seconds.",
          "Audio Storage & Hosting: Storing generated sound files on Amazon S3 or Cloudinary for public streaming delivery."
        ],
        takeaway: "High-fidelity synthetic audio sounds indistinguishable from human speech when properly tuned with stability and clarity parameters."
      },
      {
        lesNum: 3,
        title: "Automating Video Prospecting with Dynamic HeyGen Avatars",
        duration: "15m",
        summary: "Build personalized video generation pipelines using custom client avatars, dynamic variable scripts, and background slides.",
        bulletPoints: [
          "HeyGen Studio Avatar Setup: Creating custom corporate avatars using high-definition green screen footage.",
          "Dynamic Variable Templates: Creating video templates with customizable text, prospect names, and background website screenshots.",
          "HeyGen API Integration: Triggering personalized video generation automatically whenever a new high-value lead is enriched.",
          "Video Landing Page Delivery: Embedding generated video outputs inside personalized, responsive landing pages."
        ],
        takeaway: "Automated personalized video makes prospects feel like the founder recorded a dedicated message just for them."
      },
      {
        lesNum: 4,
        title: "Programmatic Podcast & Long-Form Video Repurposing",
        duration: "15m",
        summary: "Ingest long-form YouTube or Zoom recordings, transcribe with Whisper, and extract viral short-form clips automatically.",
        bulletPoints: [
          "Audio Extraction & Transcription: Passing video URLs to OpenAI Whisper to generate timestamped SRT subtitle files.",
          "Cognitive Clip Selection: Using Claude 3.7 to identify the most compelling 45-second hooks and insight moments.",
          "Dynamic Caption Rendering: Applying stylish, animated subtitles and vertical 9:16 aspect ratio crops automatically.",
          "Multi-Platform Distribution: Scheduling processed clips to TikTok, YouTube Shorts, and LinkedIn through social APIs."
        ],
        takeaway: "Automated content repurposing transforms one hour of executive video into 10 high-engagement social assets with zero editing effort."
      },
      {
        lesNum: 5,
        title: "Multilingual Dubbing & Localization for Global Audiences",
        duration: "15m",
        summary: "Translate corporate training and marketing videos into 29+ languages with automatic voice matching and lip synchronization.",
        bulletPoints: [
          "AI Dubbing Architecture: Speech recognition -> language translation -> synthetic speech generation -> video restitching.",
          "Vocal Identity Preservation: Retaining the speaker's original vocal tone, pitch, and cadence across foreign languages.",
          "Automated Lip-Syncing: Aligning speaker mouth movements to translated phonetic sounds using generative diffusion.",
          "Global Enterprise Value: Selling multinational localization packages to software companies and course creators."
        ],
        takeaway: "AI dubbing allows companies to expand into international markets instantly without hiring expensive voice translation studios."
      },
      {
        lesNum: 6,
        title: "Ethical Guardrails, Voice Rights & Client Consent Frameworks",
        duration: "15m",
        summary: "Implement strict legal authorization forms, biometric data storage policies, and watermarking compliance.",
        bulletPoints: [
          "Voice & Likeness Release Forms: Securing explicit, written commercial authorization before cloning any client's voice or likeness.",
          "Content Verification Protocols: Implementing automated checks to prevent unauthorized generation of defamatory or sensitive content.",
          "Platform Watermarking: Adhering to C2PA standards and platform disclosure guidelines for synthetic media.",
          "Risk Mitigation Clauses: Incorporating explicit liability limitation terms inside client master service agreements."
        ],
        takeaway: "Enterprise clients require strict legal protection. Professional consent documentation positions you as a mature agency partner."
      },
      {
        lesNum: 7,
        title: "Module 6 Project: Personalized B2B Video Prospecting Engine",
        duration: "15m",
        summary: "Build an automated engine that enriches leads, captures website screenshots, generates custom avatar videos, and sends emails.",
        bulletPoints: [
          "Full Pipeline Architecture: Ingest lead -> capture website thumbnail via URLBox -> generate HeyGen video -> send via Instantly.",
          "Dynamic Script Personalization: Mentioning prospect's company name, recent achievements, and specific operational bottlenecks.",
          "Automated Delivery: Embedding thumbnail GIF previews inside cold email sequences with high-intent tracking pixels.",
          "Commercial Pricing: Packaging this outbound video prospecting system for $3,000 setup plus $1,000/month retainer."
        ],
        takeaway: "This automated video prospecting engine generates massive client ROI and commands top-tier agency pricing."
      }
    ]
  },
  {
    num: 7,
    id: "module-07",
    title: "Tool 6 — Perplexity & DeepSeek (Live Intelligence & Market Research)",
    duration: "1h 45m",
    description: "Harness real-time search models, web scraping APIs, and deep reasoning engines to deliver automated corporate intelligence.",
    lessons: [
      {
        lesNum: 1,
        title: "Real-Time Web Scraping vs. Trained Knowledge: When to Use Search AI",
        duration: "15m",
        summary: "Understand the architectural divergence between static training cutoff models and real-time live search engines.",
        bulletPoints: [
          "The Knowledge Cutoff Problem: Why standard LLMs fail when business decisions require live pricing, news, or competitor changes.",
          "Search-Augmented Generation: Combining live web search indexing with neural synthesis to produce accurate, referenced intelligence.",
          "The Perplexity Sonar API: Programmatically querying live search models with strict domain filtering and citation tracking.",
          "Commercial Applications: Automated market analysis, daily competitive alerts, and real-time lead qualification."
        ],
        takeaway: "Search AI bridges the gap between static model weights and live internet truth, unlocking real-time operational intelligence."
      },
      {
        lesNum: 2,
        title: "Automated Competitor Tracking & Pricing Change Monitoring",
        duration: "15m",
        summary: "Build scheduled workflows that scrape rival product pages, detect pricing adjustments, and alert executive teams.",
        bulletPoints: [
          "Web Scraping with Firecrawl: Extracting clean Markdown and structured text from JavaScript-heavy corporate websites.",
          "Diff Detection Logic: Comparing newly scraped pricing structures against previous records stored in Airtable.",
          "Synthesis with DeepSeek: Analyzing pricing shifts and generating strategic summary briefs on competitor positioning.",
          "Executive Alerting: Dispatching formatted Slack notifications to product marketing and sales leadership."
        ],
        takeaway: "Automated competitive intelligence keeps your clients one step ahead of market rivals without manual research hours."
      },
      {
        lesNum: 3,
        title: "Extracting Key Executive Hires & Intent Signals from Live Web",
        duration: "15m",
        summary: "Monitor press releases, LinkedIn updates, and job boards to detect high-intent buying signals from prospective accounts.",
        bulletPoints: [
          "Intent Signal Monitoring: Tracking executive turnover (e.g., new VP of Operations) as an immediate trigger for sales outreach.",
          "Job Board Scraping: Ingesting active hiring listings to identify what software tools and challenges target companies face.",
          "Entity Normalization: Cleaning executive names, titles, and past company affiliations into structured CRM properties.",
          "Automated Outbound Triggering: Immediately enrolling accounts into specialized outreach sequences upon detected intent signals."
        ],
        takeaway: "Reaching out within 48 hours of an executive hire dramatically increases meeting booking rates for B2B sales teams."
      },
      {
        lesNum: 4,
        title: "Synthesizing 100+ Page Financial Filings into Executive Briefs",
        duration: "15m",
        summary: "Ingest dense quarterly 10-Q reports and conference call transcripts to generate actionable strategic insights in seconds.",
        bulletPoints: [
          "Long-Context Window Mastery: Loading entire 100-page enterprise filings into 200k+ token context models without truncation.",
          "Targeted Extraction Prompts: Instructing models to extract capital allocation changes, revenue guidance, and risk disclosures.",
          "Structured Markdown Output: Formatting dense financials into standardized executive tables with executive summary bullet points.",
          "Automated PDF Parsing: Converting complex multi-column financial PDFs into clean, searchable plain text."
        ],
        takeaway: "Extracting actionable signal from dense corporate documents saves analysts dozens of hours per research engagement."
      },
      {
        lesNum: 5,
        title: "Building an Automated Industry Newsletter & Trend Radar",
        duration: "15m",
        summary: "Create a fully autonomous research pipeline that scours 50+ industry sources, selects top news, and drafts newsletters.",
        bulletPoints: [
          "Multi-Source Ingestion: Pulling RSS feeds, Twitter lists, Substack posts, and Google News queries into a single data lake.",
          "Relevance & Scoring Engine: Scoring articles on novelty, commercial significance, and audience interest using Claude 3.7.",
          "Editorial Synthesis: Drafting engaging newsletter blurbs with quotes, takeaway insights, and verified source links.",
          "ESP Publishing Integration: Automatically pushing drafted campaigns to Beehiiv, Substack, or Mailchimp review queues."
        ],
        takeaway: "Automated content radars allow companies to publish authoritative industry newsletters consistently with minimal editor oversight."
      },
      {
        lesNum: 6,
        title: "Formatting Unstructured Search Data into Structured JSON",
        duration: "15m",
        summary: "Convert noisy, raw internet search results into normalized JSON records ready for relational database insertion.",
        bulletPoints: [
          "The Noise Problem: Managing messy search snippets containing ads, navigation menus, and boilerplate text.",
          "Two-Step Cognitive Cleansing: Step 1 extracts raw text; Step 2 maps entities strictly into typed JSON schemas.",
          "Handling Incomplete Data: Applying heuristic fallbacks when secondary data points (like phone numbers) are unavailable.",
          "Validation Scripts: Testing parsed JSON records against schema validators before triggering database write operations."
        ],
        takeaway: "Transforming unstructured web noise into pristine relational records is the core superpower of modern search intelligence."
      },
      {
        lesNum: 7,
        title: "Module 7 Project: Daily Executive Market Intelligence Digest",
        duration: "15m",
        summary: "Build an automated intelligence engine monitoring 5 industry competitors and delivering a daily Slack/email brief at 8 AM.",
        bulletPoints: [
          "Architecture Blueprint: Scheduled 6 AM cron -> Perplexity search -> DeepSeek synthesis -> Airtable log -> Slack notification.",
          "Executive Formatting: Clean formatting with key metrics, strategic threats, opportunity highlights, and source links.",
          "Historical Archival: Storing all past intelligence briefs in a searchable Airtable base for longitudinal trend analysis.",
          "Client Pricing Strategy: Packaging this Market Intelligence Radar for $2,000 setup plus $750/month recurring retainer."
        ],
        takeaway: "Executive leadership gladly pays $750/month to wake up to a strategic market brief that gives them an unfair advantage."
      }
    ]
  },
  {
    num: 8,
    id: "module-08",
    title: "Tool 7 — Twilio & WhatsApp Business API (Conversational Messaging)",
    duration: "1h 45m",
    description: "Deploy high-converting SMS and WhatsApp conversational automations for local businesses with 98% open rates.",
    lessons: [
      {
        lesNum: 1,
        title: "The Power of SMS & WhatsApp: 98% Open Rates for Local Businesses",
        duration: "15m",
        summary: "Understand why text messaging outperforms email by 5x for appointment bookings, customer inquiries, and lead conversion.",
        bulletPoints: [
          "The Attention Economy: 98% of SMS messages are opened within 3 minutes, compared to an average 20% email open rate.",
          "The Local Business Problem: Local service companies lose up to 60% of potential customers due to missed incoming phone calls.",
          "Conversational Speed to Lead: Contacting an inbound lead within 60 seconds increases conversion rates by over 300%.",
          "Omnichannel Architecture: Unifying SMS, WhatsApp, and web chats into a single centralized CRM inbox."
        ],
        takeaway: "SMS and WhatsApp deliver immediate customer attention. For local businesses, speed to lead directly translates into revenue."
      },
      {
        lesNum: 2,
        title: "Provisioning Virtual Numbers & Registering Meta Business Profiles",
        duration: "15m",
        summary: "Set up Twilio phone numbers, complete WhatsApp Business API onboarding, and establish approved message templates.",
        bulletPoints: [
          "Twilio Number Procurement: Buying local area code and toll-free virtual numbers configured for voice and SMS webhooks.",
          "Meta Business Verification: Navigating WhatsApp Business Manager verification and brand display name approval.",
          "Message Template Guidelines: Crafting pre-approved marketing and utility templates adhering to WhatsApp policies.",
          "Webhook Configuration: Pointing incoming message status callbacks to Make.com or n8n endpoints."
        ],
        takeaway: "Proper regulatory registration and template approval ensure high deliverability and protect client accounts from bans."
      },
      {
        lesNum: 3,
        title: "Instant Missed-Call Text-Back Automation (Recovering Lost Leads)",
        duration: "15m",
        summary: "Build the single highest-ROI automation for local service businesses: immediate automated SMS responses to missed calls.",
        bulletPoints: [
          "The Missed Call Problem: When a contractor or dental office misses a call, the prospect immediately calls the next competitor.",
          "The 30-Second Solution: Twilio detects unanswered call -> instantly dispatches polite SMS: 'Sorry we missed your call! How can we help?'",
          "Interactive Response Handling: Capturing prospect replies and notifying staff via Slack or mobile push notification.",
          "ROI Demonstration: Proving to business owners that recovering just 2 missed calls per month pays for your entire agency retainer."
        ],
        takeaway: "Missed-call text-back is the ultimate no-brainer client pitch. It pays for itself within the first 48 hours of deployment."
      },
      {
        lesNum: 4,
        title: "Conversational Appointment Booking via SMS & Calendar API",
        duration: "15m",
        summary: "Allow customers to book, reschedule, and confirm service appointments entirely through automated text message conversations.",
        bulletPoints: [
          "Conversational Scheduling Flow: AI parses requested days/times and checks Google Calendar/Cal.com real-time availability.",
          "Time Slot Offering: Proposing two convenient calendar slots and locking the reservation upon customer text confirmation.",
          "Calendar Event Creation: Generating calendar events with customer details and dispatching automated reminder invites.",
          "No-Show Reduction: Automated 24-hour and 2-hour pre-appointment confirmation texts that reduce no-show rates by 40%."
        ],
        takeaway: "Automated SMS booking eliminates telephone tag and fills client calendars with zero manual administrative overhead."
      },
      {
        lesNum: 5,
        title: "Automated Review Requests & Reputation Management Sequences",
        duration: "15m",
        summary: "Build post-service review generation workflows that systematically collect 5-star Google and Yelp reviews.",
        bulletPoints: [
          "The Review Funnel Trigger: Triggering review requests 2 hours after service completion in the client's billing system.",
          "Sentiment Pre-Screening: Asking a simple 1-to-5 rating question via SMS before routing to public review platforms.",
          "Direct Google Review Routing: Directing satisfied (4-5 star) customers straight to the business Google Maps review link.",
          "Private Feedback Safeguard: Routing neutral or negative feedback to management privately to protect public ratings."
        ],
        takeaway: "Positive Google reviews drive organic local search rankings. This automated review funnel consistently builds client trust."
      },
      {
        lesNum: 6,
        title: "Compliance, Opt-In Regulations (A2P 10DLC) & Spam Prevention",
        duration: "15m",
        summary: "Navigate TCPA, A2P 10DLC registration, opt-out keywords (STOP/UNSUBSCRIBE), and message throttling rules.",
        bulletPoints: [
          "A2P 10DLC Registration: Submitting brand and campaign registrations to US telecom carriers to guarantee 100% deliverability.",
          "Mandatory Opt-In Disclosures: Ensuring web forms feature clear SMS consent language and privacy policy checkboxes.",
          "Automated Opt-Out Handling: Configuring immediate compliance responses to STOP, UNSUBSCRIBE, and HELP keywords.",
          "Sending Window Guardrails: Restricting automated SMS dispatch strictly between 8 AM and 8 PM in the recipient's local timezone."
        ],
        takeaway: "Strict compliance protects your agency and clients from severe regulatory fines and maintains carrier trust."
      },
      {
        lesNum: 7,
        title: "Module 8 Project: Turnkey Local Business Lead-Capture Bot",
        duration: "15m",
        summary: "Build an omnichannel lead recovery and booking engine integrating missed calls, SMS, WhatsApp, and Google Calendar.",
        bulletPoints: [
          "Complete System Blueprint: Missed-call detection -> SMS greeting -> qualification questions -> calendar booking -> CRM sync.",
          "Client Dashboard Integration: Logging all customer conversations inside a centralized Airtable or Softr communication inbox.",
          "Live Demo Testing: Conducting real-time test calls and text interactions to verify flawless conversational flow.",
          "Commercial Packaging: Selling this turnkey local lead bot for $1,500 setup plus $350/month recurring maintenance."
        ],
        takeaway: "This turnkey lead bot delivers immediate measurable revenue for local clients and creates a sticky recurring retainer."
      }
    ]
  },
  {
    num: 9,
    id: "module-09",
    title: "Commercial Packaging, Retainers & Scaling to $10,000/Month",
    duration: "1h 45m",
    description: "Package the 7 tools into high-ticket productized offers, master the Trojan Horse sales strategy, and sign retainer clients.",
    lessons: [
      {
        lesNum: 1,
        title: "Packaging 7 Tools into 3 Productized Commercial Offers",
        duration: "15m",
        summary: "Stop selling random technical tools; package capabilities into three clear, productized outcome-based offers.",
        bulletPoints: [
          "The Productization Advantage: Fixed scope, fixed price, and predictable delivery timelines eliminate custom proposal fatigue.",
          "Tier 1 Offer (Lead Capture Sprint - $1,500): Missed-call text-back, inbound lead triaging, and automated CRM sync.",
          "Tier 2 Offer (Operations Hub - $3,500): Airtable relational backend, Softr client portal, and multi-channel notification pipelines.",
          "Tier 3 Offer (Full AI Operating System - $7,500): Custom OpenAI assistants, search intelligence, and video generation workflows."
        ],
        takeaway: "Clients don't buy tools; they buy business outcomes. Productized packages make decisions clear and easy for buyers."
      },
      {
        lesNum: 2,
        title: "Value-Based Pricing vs. Hourly Billing: Charging $2,500+ Per Sprint",
        duration: "15m",
        summary: "Escape the hourly trap and price implementations based on the financial value and hours saved for the client.",
        bulletPoints: [
          "The Hourly Rate Ceiling: Hourly billing penalizes efficiency and positions you as a commoditized technical contractor.",
          "The ROI Anchor Calculation: If an automation saves 40 employee hours monthly ($1,600 value), a $3,500 setup is an obvious investment.",
          "Revenue Acceleration Framing: Tying lead response automations directly to increased closing rates and additional client revenue.",
          "Retainer Structuring: Attaching mandatory $500 to $1,000/month ongoing optimization contracts to every implementation."
        ],
        takeaway: "Anchor your price against the costly business problem you solve, not the time it takes you to configure the workflow."
      },
      {
        lesNum: 3,
        title: "Crafting High-Converting 'Trojan Horse' Video Audits for Prospects",
        duration: "15m",
        summary: "Master the 5-minute personalized Loom audit strategy that closes 30%+ of cold and warm B2B prospects.",
        bulletPoints: [
          "The Trojan Horse Concept: Rather than pitching generic services, diagnose a specific live friction point on the prospect's website.",
          "The 5-Minute Loom Structure: 60s compliment & problem reveal -> 2m live workflow diagram walkthrough -> 2m ROI projection & CTA.",
          "The Interactive Hook: Submitting a test lead on their form and recording the lack of immediate response on camera.",
          "Frictionless Call to Action: Inviting them to review the visual workflow blueprint on a no-pressure 15-minute diagnostic call."
        ],
        takeaway: "A 5-minute video demonstrating their specific operational bottleneck is 100x more persuasive than a 10-page text proposal."
      },
      {
        lesNum: 4,
        title: "The 4-Part Discovery Call: Diagnosing Client Pain and Closing",
        duration: "15m",
        summary: "Execute consultative discovery calls that guide prospects to calculate their own operational waste and demand your solution.",
        bulletPoints: [
          "Phase 1 (Diagnostic Rapport): Asking targeted questions regarding current software friction and administrative time drains.",
          "Phase 2 (Cost of Inaction): Guiding the prospect to verbally articulate the annual financial cost of their current manual bottlenecks.",
          "Phase 3 (Visual Blueprint Reveal): Sharing your screen to present the customized architecture diagram solving their pain.",
          "Phase 4 (Collaborative Closing): Offering two tiered implementation options and securing verbal agreement on the setup sprint."
        ],
        takeaway: "Great sales conversations feel like diagnostic doctor visits. Ask probing questions, diagnose the friction, and prescribe the solution."
      },
      {
        lesNum: 5,
        title: "Drafting Frictionless SOW Contracts & Recurring Retainer Terms",
        duration: "15m",
        summary: "Protect your agency with clean, professional Statements of Work, payment milestones, and retainer agreements.",
        bulletPoints: [
          "Key SOW Clauses: Defining explicit deliverables, milestone delivery dates, client asset prerequisites, and acceptance criteria.",
          "Scope Creep Defense: Limiting revisions to two rounds and specifying out-of-scope hourly change order rates.",
          "Payment Terms: Enforcing 50% upfront deposit before work begins and 50% upon completed staging demonstration.",
          "Retainer Agreements: Setting up recurring automated Stripe billing for monthly maintenance, API monitoring, and SLA support."
        ],
        takeaway: "Clear contracts prevent scope creep, protect cash flow, and establish a professional, boundary-respecting business relationship."
      },
      {
        lesNum: 6,
        title: "Delivery Operations, Client Onboarding & SLA Maintenance",
        duration: "15m",
        summary: "Establish systematic delivery workflows, recorded client training handoffs, and proactive monthly maintenance.",
        bulletPoints: [
          "The Client Onboarding Kit: Automated intake forms gathering credentials, brand assets, and API tokens securely.",
          "Staging to Production Migration: Testing scenarios thoroughly in sandbox environments before pointing to live production databases.",
          "Recorded Video Handoff: Providing a 15-minute recorded Loom walkthrough demonstrating how staff interact with the system.",
          "Monthly Value Reports: Sending automated PDF digests showing total hours saved, leads processed, and pipeline health."
        ],
        takeaway: "Monthly value reports remind clients why your retainer is indispensable, virtually eliminating client churn."
      },
      {
        lesNum: 7,
        title: "Capstone Project: Launching Your $10K AI Automation Agency",
        duration: "15m",
        summary: "Finalize your agency service portfolio, publish your case study showcase, and execute your first client outreach sprint.",
        bulletPoints: [
          "Final Agency Portfolio: Your 3 packaged offers complete with visual architecture diagrams and ROI calculations.",
          "Outreach Execution Plan: Sending 20 personalized Trojan Horse audits weekly to reach your first 3 retainer clients in 30 days.",
          "Scaling Milestones: Progressing from $3,000/mo (first client) to $6,000/mo to the $10,000/month financial freedom milestone.",
          "The Plugd Certification: Confidently deploying commercial AI automation solutions as an elite systems architect."
        ],
        takeaway: "You now possess the complete technical blueprints and commercial framework to build a thriving $10,000/month AI automation business."
      }
    ]
  }
];

module.exports = {
  courseTitle,
  modulesData,
};
