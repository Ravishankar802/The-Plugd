const fs = require('fs');
const path = require('path');
const { createLesson } = require('./curriculum-builder-helper.cjs');

const courseTitle = "Build a $10,000/Month AI Service Business With Just 3 Core Tools";

const modulesData = [
  {
    num: 1,
    id: "module-01",
    title: "The 3-Tool Architecture & $10,000/Month Business Model",
    duration: "1h 45m",
    description: "Understand why 3 focused tools outperform complex bloated stacks, master the business model math, and identify high-margin B2B clients.",
    lessons: [
      {
        lesNum: 1,
        title: "Why 3 Tools Outperform Complex 20-App Software Stacks",
        duration: "15m",
        summary: "Discover how mastering Airtable, Claude 3.7, and Make.com provides 100% of the leverage needed to deliver high-ticket enterprise workflows.",
        bulletPoints: [
          "The Tool Overload Trap: Why novice agency founders drown in 20 disparate tools while elite operators standardize on 3 core pillars.",
          "The Perfect Division of Labor: Airtable manages state and client interfaces; Claude 3.7 provides cognitive reasoning; Make.com handles orchestration.",
          "Frictionless Maintenance: Fewer software dependencies mean near-zero breaking changes across client production accounts.",
          "Speed to Market: Deploying complete enterprise systems in 72 hours instead of spending months wrestling with custom code."
        ],
        takeaway: "Mastery of 3 deep tools beats surface familiarity with 20. Simplicity in architecture delivers high reliability and 85%+ profit margins."
      },
      {
        lesNum: 2,
        title: "The Core Roles: Airtable (Memory), Claude 3.7 (Reasoning), Make.com (Execution)",
        duration: "15m",
        summary: "Deep-dive into the architectural responsibility of each pillar and how they interlock to form an autonomous operating system.",
        bulletPoints: [
          "Airtable as Operational Memory: Relational data structures, audit trails, and client portal interfaces.",
          "Claude 3.7 as Cognitive Engine: Processing unstructured documents, evaluating criteria, and generating structured JSON payloads.",
          "Make.com as Execution Fabric: Ingesting webhooks, routing multi-branch logic, and executing transactional API calls.",
          "Decoupled Architecture: How isolating each role allows modular updates without risking system stability."
        ],
        takeaway: "Memory, Reasoning, and Execution: when these 3 functions are clearly separated, any business process can be automated."
      },
      {
        lesNum: 3,
        title: "Unit Economics of the $10K Business: Setup Sprints & Recurring Retainers",
        duration: "15m",
        summary: "Deconstruct the exact financial model required to reach $10,000/month: charging $3,000 setup fees and $1,000/month retainers.",
        bulletPoints: [
          "The Two Revenue Engines: High-ticket setup sprints ($2,500-$4,000) generate upfront cash; recurring retainers ($750-$1,250/mo) build equity.",
          "The Magic Number: Managing just 8 to 10 retained clients provides $10,000/month in predictable, baseline recurring cash flow.",
          "Retainer Justification: Framing ongoing fees around proactive API monitoring, workflow tuning, and monthly performance reporting.",
          "Zero Employee Overhead: How a solo operator maintains 10 clients in under 15 hours per week using automated diagnostics."
        ],
        takeaway: "Never deliver a one-time build without attaching a recurring retainer. The setup fee covers your time; the retainer builds your freedom."
      },
      {
        lesNum: 4,
        title: "Selecting High-Margin B2B Niches with Manual Administrative Bottlenecks",
        duration: "15m",
        summary: "Identify lucrative target industries where administrative waste is rampant and willingness-to-pay is exceptionally high.",
        bulletPoints: [
          "Niche Selection Criteria: High average customer value ($2,000+), paper-heavy workflows, and high administrative staff overhead.",
          "Top 4 High-Margin Sectors: Commercial real estate, specialized legal practices, logistics/freight brokerage, and boutique consulting firms.",
          "The Cost-of-Delay Indicator: Target industries where losing a prospect due to a 2-hour response delay costs $5,000+ in profit.",
          "Avoiding Low-Margin Traps: Why local restaurants and small retail shops are terrible clients for high-ticket AI automation services."
        ],
        takeaway: "Sell to businesses where customer transactions are large and operational speed directly protects five-figure revenue."
      },
      {
        lesNum: 5,
        title: "Pricing Philosophy: Value-Anchored Fixed Sprints vs. Hourly Traps",
        duration: "15m",
        summary: "Learn how to anchor pricing against customer operational savings, allowing you to charge $3,500 for a 4-hour build.",
        bulletPoints: [
          "The Labor Arbitrage Anchor: If your workflow replaces 30 hours of weekly administrative labor ($36,000/year), a $3,500 setup is trivial.",
          "The Velocity Anchor: Pricing based on speed to lead and revenue recovery rather than internal development hours.",
          "Tiered Packaging: Offering Good ($2,500), Better ($4,000), and Best ($7,500) options to eliminate binary 'yes/no' client decisions.",
          "Eliminating Scope Creep: Clearly defining exact boundary conditions in every Statement of Work."
        ],
        takeaway: "Price the value of the solved problem, never the hours on your timer. When clients save $30,000, they happily pay $4,000."
      },
      {
        lesNum: 6,
        title: "Setting Up Agency Multi-Tenant Workspaces & API Infrastructure",
        duration: "15m",
        summary: "Establish professional agency workspaces across Airtable, Anthropic Console, and Make.com with clean client segregation.",
        bulletPoints: [
          "Multi-Tenant Airtable Workspaces: Organizing client bases within dedicated enterprise workspaces to protect data isolation.",
          "Anthropic API Organization: Creating distinct project workspaces and tracking per-client token consumption.",
          "Make.com Team Accounts: Setting up client folders with granular role-based permissions and dedicated webhook queues.",
          "Security Protocol: Never co-mingling client credentials or databases in shared sandboxes."
        ],
        takeaway: "Strict workspace isolation is standard professional practice. Build clean multi-tenant infrastructure from day one."
      },
      {
        lesNum: 7,
        title: "Module 1 Checkpoint: Your $10K Business Model & Flagship Service Blueprint",
        duration: "15m",
        summary: "Define your chosen target niche, select your initial flagship service offering, and construct your 90-day financial roadmap.",
        bulletPoints: [
          "Flagship Offer Definition: Packaging your first specific operational automation with clear deliverables and pricing.",
          "Niche Positioning Statement: Crafting a clear, one-sentence value proposition for high-ticket prospective clients.",
          "Financial Milestone Tracker: Mapping the timeline to sign 3 setup clients in month one and reach 8 retainers by month three.",
          "Commitment to Implementation: Committing to building each core tool project in the subsequent modules."
        ],
        takeaway: "Clarity breeds confidence. Choose your niche, package your offer, and build the technical assets with complete focus."
      }
    ]
  },
  {
    num: 2,
    id: "module-02",
    title: "Core Tool 1 — Airtable as the Enterprise Relational Database",
    duration: "1h 45m",
    description: "Design relational database architectures, audit trails, and client portal interfaces that act as the single source of truth.",
    lessons: [
      {
        lesNum: 1,
        title: "Designing Relational Data Schemas for Complex Operations",
        duration: "15m",
        summary: "Master data modeling principles to structure multi-table business operations cleanly without data duplication.",
        bulletPoints: [
          "The Entity-Relationship Model: Identifying primary business objects (Clients, Work Orders, Invoices, Team Members).",
          "One-to-Many & Many-to-Many Relationships: Linking multiple work orders to a single client record with relational integrity.",
          "Field Normalization: Ensuring customer email or billing details exist in exactly one location to prevent data drift.",
          "Database Architecture Blueprinting: Using visual schema tools to map out tables and foreign key relationships before building."
        ],
        takeaway: "A clean relational schema is the bedrock of business automation. Proper data architecture prevents 90% of downstream workflow errors."
      },
      {
        lesNum: 2,
        title: "Normalized Linking: Companies, Contacts, Invoices & Work Orders",
        duration: "15m",
        summary: "Build an interconnected business CRM schema linking accounts, individual stakeholders, project milestones, and billing records.",
        bulletPoints: [
          "Companies to Contacts: Structuring multi-stakeholder B2B client accounts with primary decision-maker flags.",
          "Work Order Lifecycle: Tracking requests from 'Received' to 'AI Processing', 'Review Required', and 'Delivered'.",
          "Invoice Line Item Relationships: Linking individual billable services to parent invoices with automatic balance calculations.",
          "Dynamic Primary Keys: Using concatenate formulas to generate descriptive, readable record identifiers."
        ],
        takeaway: "Linked records transform flat spreadsheets into a living operational network that reflects real-world business interactions."
      },
      {
        lesNum: 3,
        title: "Data Validation: Field Types, Enums & Status Pipeline Triggers",
        duration: "15m",
        summary: "Enforce strict data integrity with specialized field formats, single-select enums, and automated pipeline status gates.",
        bulletPoints: [
          "Strict Field Types: Mandating email, phone, number, currency, and date formats to prevent malformed data entry.",
          "Single-Select Pipelines: Defining clear, mutually exclusive status stages that serve as reliable automation triggers.",
          "Required Field Validation: Using Airtable form rules and interface constraints to guarantee no incomplete records are created.",
          "Status Audit Logging: Storing timestamped records of every status change to track operational processing velocity."
        ],
        takeaway: "Strict input validation ensures your cognitive AI models receive clean, predictable data payloads every single time."
      },
      {
        lesNum: 4,
        title: "Rollups, Lookups & Calculated Operational Velocity Metrics",
        duration: "15m",
        summary: "Compute real-time operational KPIs, revenue aggregates, and processing latency directly within your relational base.",
        bulletPoints: [
          "Lookup Fields: Pulling company billing terms and priority tiers dynamically onto active work order records.",
          "Rollup Calculations: Summing paid invoice totals, counting open tickets, and averaging turnaround hours automatically.",
          "Operational Velocity Formulas: Calculating DATETIME_DIFF between submission and completion to demonstrate ROI to clients.",
          "Executive KPI Views: Building dedicated filtered views showing total hours saved and pipeline dollar value."
        ],
        takeaway: "Real-time computed KPIs provide visual proof of your system's value, making retainer renewals effortless."
      },
      {
        lesNum: 5,
        title: "Native Airtable Automations vs. External Orchestration Triggers",
        duration: "15m",
        summary: "Know exactly when to use native Airtable automations and when to hand off complex logic to Make.com.",
        bulletPoints: [
          "The Division of Labor: Using native Airtable automations for internal hygiene (record updates, field clearing, notifications).",
          "Outgoing Webhooks: Triggering external Make.com scenarios the instant a record status moves to 'Trigger AI Review'.",
          "Automation Quotas: Preserving Airtable monthly execution limits by executing heavy multi-step logic in external visual builders.",
          "Conditional Run Logic: Setting granular filter conditions to guarantee automations only fire when specific prerequisites are met."
        ],
        takeaway: "Keep native automations focused on internal state transitions; delegate external API integrations and heavy computation to Make.com."
      },
      {
        lesNum: 6,
        title: "Building Client Interface Dashboards with Role-Based Permissions",
        duration: "15m",
        summary: "Deploy Airtable Interfaces to give clients and internal staff customized dashboards without exposing underlying raw tables.",
        bulletPoints: [
          "Airtable Interfaces Overview: Creating modern, responsive web portals directly inside Airtable with drag-and-drop elements.",
          "Role-Based Access: Providing staff with operational review queues while restricting executives to high-level metric summaries.",
          "Interactive Action Buttons: Enabling human-in-the-loop approvals with single-click buttons that trigger downstream webhooks.",
          "Branded Experience: Customizing headers, colors, and instructions to make the portal feel like custom enterprise software."
        ],
        takeaway: "Airtable Interfaces turn back-end database tables into professional software products that clients love using."
      },
      {
        lesNum: 7,
        title: "Module 2 Project: The Autonomous Client CRM & Work Order Hub",
        duration: "15m",
        summary: "Build, configure, and test a complete multi-client CRM and automated work order intake and tracking repository.",
        bulletPoints: [
          "Complete Project Blueprint: Relational schema containing Accounts, Contacts, Orders, Invoices, and Automated Audit Logs.",
          "Form Intake & Triage: Public branded intake form with automated field validation and instant notification dispatch.",
          "Review Interface: Operational dashboard featuring pending reviews, one-click approvals, and velocity metrics.",
          "Commercial Deliverable: Packaging this custom operational CRM for $2,500 setup plus $500/month recurring maintenance."
        ],
        takeaway: "This operations hub is the foundational core of your 3-tool agency. Master this build and you have a high-demand B2B offering."
      }
    ]
  },
  {
    num: 3,
    id: "module-03",
    title: "Core Tool 2 — Claude 3.7 for Reasoning, Synthesis & Decision Engines",
    duration: "1h 45m",
    description: "Harness Claude 3.7 Sonnet for complex document parsing, deep reasoning, structured JSON schemas, and zero-hallucination outputs.",
    lessons: [
      {
        lesNum: 1,
        title: "The Power of Claude 3.7: Hybrid Thinking & Complex Document Extraction",
        duration: "15m",
        summary: "Understand why Claude 3.7 Sonnet is the premier model for high-stakes enterprise reasoning and structured document synthesis.",
        bulletPoints: [
          "Hybrid Thinking Architecture: How Claude 3.7 combines instantaneous response generation with deep step-by-step reasoning tokens.",
          "200K Context Window Mastery: Ingesting entire 80-page contracts, technical specs, and financial statements in a single prompt.",
          "Nuance & Nuanced Rule Adherence: Why Claude outperforms other models in following complex negative constraints.",
          "API Integration Overview: Connecting Anthropic's Messages API to Make.com and managing authentication tokens."
        ],
        takeaway: "Claude 3.7 represents the state of the art in enterprise reasoning. Its document synthesis capabilities replace hours of manual review."
      },
      {
        lesNum: 2,
        title: "Crafting Deterministic System Instructions That Eliminate Hallucinations",
        duration: "15m",
        summary: "Engineer bulletproof system prompts with explicit operational role definitions, boundary constraints, and fallback protocols.",
        bulletPoints: [
          "Role Grounding Framework: Establishing operational authority, context, and exact deliverables in the system instruction.",
          "Zero-Assumption Constraints: Explicitly forbidding the model from guessing missing values or interpolating unstated facts.",
          "Negative Examples & Edge Cases: Providing clear demonstrations of what the model must NOT do when encountering ambiguity.",
          "Temperature & Seed Control: Setting temperature to 0.0 to guarantee deterministic, reproducible outputs across identical inputs."
        ],
        takeaway: "Precision prompt engineering is code. Well-constrained system prompts eliminate hallucinations and guarantee reliable business outputs."
      },
      {
        lesNum: 3,
        title: "Processing 50+ Page PDF Invoices, Statements & Legal Contracts",
        duration: "15m",
        summary: "Pass complex multi-page document images and PDFs to Claude 3.7 to extract table data, line items, and contractual clauses.",
        bulletPoints: [
          "Multimodal PDF Processing: Sending native base64 PDF payloads directly into the Messages API for vision parsing.",
          "Multi-Column Table Extraction: Extracting complex invoice line items with accurate quantities, unit prices, and SKU codes.",
          "Contract Clause Risk Scoring: Analyzing indemnification and liability terms against pre-defined client risk standards.",
          "Token Optimization: Pre-filtering unnecessary pages to minimize input token costs on massive corporate filings."
        ],
        takeaway: "Multimodal document parsing unlocks massive enterprise value. Tasks that took accountants 4 hours are completed in 30 seconds."
      },
      {
        lesNum: 4,
        title: "Defining Structured JSON Output Schemas for Downstream Reliability",
        duration: "15m",
        summary: "Enforce strict JSON formatting so Claude's output plugs directly into Airtable and Make.com without parsing errors.",
        bulletPoints: [
          "JSON Output Formatting: Instructing Claude to return strictly valid JSON wrapped in explicit schema structures.",
          "Type Enforcement: Guaranteeing dates adhere to ISO 8601, numbers are unquoted floats, and statuses match Airtable enums.",
          "Array Structures for Line Items: Outputting nested arrays of objects that visual iterators can loop through effortlessly.",
          "Zero Markdown Wrappers: Using prompt instructions and regex cleanups to prevent markdown backtick formatting issues."
        ],
        takeaway: "Structured JSON outputs bridge cognitive reasoning with deterministic databases, creating seamless automated workflows."
      },
      {
        lesNum: 5,
        title: "Multi-Step Evaluation Chains: Confidence Scores & Fallback Flags",
        duration: "15m",
        summary: "Build cognitive evaluation pipelines where the model scores its own certainty and triggers human review when ambiguous.",
        bulletPoints: [
          "Self-Scoring Confidence: Instructing Claude to output a confidence_score between 0.0 and 1.0 alongside its extraction.",
          "Human-in-the-Loop Thresholds: Automatically routing items with confidence below 0.85 to an Airtable human review queue.",
          "Reasoning Explanations: Requiring the model to articulate why it flagged an item (e.g., 'Vendor address differs from historical record').",
          "Continuous Improvement: Using human review corrections to update system prompt edge case instructions over time."
        ],
        takeaway: "Self-assessed confidence scores eliminate operational risk. Low-certainty tasks are safely reviewed by human supervisors."
      },
      {
        lesNum: 6,
        title: "Managing Token Economics & Latency Across High-Volume Operations",
        duration: "15m",
        summary: "Optimize API margins by caching repetitive prompt contexts, selecting model tiers, and managing throughput limits.",
        bulletPoints: [
          "Prompt Caching Architecture: Using Anthropic's prompt caching headers to slash input costs by up to 90% on repeated SOP context.",
          "Model Cascading: Running lightweight classification on fast models before escalating complex reasoning to Claude 3.7 Sonnet.",
          "Rate Limit Handling: Implementing exponential backoff and retry queues in Make.com to handle API concurrency smoothly.",
          "Client Pricing Margin: Factoring API consumption into your monthly retainer so token costs are 100% client-funded."
        ],
        takeaway: "Prompt caching and intelligent model routing preserve 85%+ gross profit margins on your automated service retainers."
      },
      {
        lesNum: 7,
        title: "Module 3 Project: The Cognitive Invoice Audit & Discrepancy Flagging Engine",
        duration: "15m",
        summary: "Build an autonomous accounting assistant that ingests supplier invoices, extracts line items, and flags billing discrepancies.",
        bulletPoints: [
          "Project Blueprint: Ingest PDF invoice -> Claude 3.7 extracts JSON line items -> cross-reference purchase order -> flag variance.",
          "Discrepancy Detection: Automatically identifying price increases, incorrect tax calculations, and duplicate billing items.",
          "Airtable Output: Generating populated invoice records with linked line items and automated discrepancy alert badges.",
          "Commercial Value: Pitching this Automated AP Audit system to mid-market companies for $3,500 setup plus $850/month."
        ],
        takeaway: "Accounting automation delivers measurable financial savings by catching billing errors before payments are executed."
      }
    ]
  },
  {
    num: 4,
    id: "module-04",
    title: "Core Tool 3 — Make.com for Frictionless Orchestration & Integrations",
    duration: "1h 45m",
    description: "Wire Airtable and Claude 3.7 together with external apps, manage error directives, and deploy rock-solid execution pipelines.",
    lessons: [
      {
        lesNum: 1,
        title: "Architecture of Enterprise Make.com Scenarios: Routers & Flow Control",
        duration: "15m",
        summary: "Master the visual scenario builder, modular sub-routines, data bundle flow, and conditional routing filters.",
        bulletPoints: [
          "Scenario Architecture: Structuring visual pipelines for readability, debugging, and high throughput.",
          "Bundle Lifecycle: How Make.com ingests, iterates, transforms, and dispatches data bundles across connected modules.",
          "Router Filters: Splitting data streams based on dynamic record properties (e.g., VIP vs. Standard client requests).",
          "Modular Scenarios: Connecting parent and child scenarios via webhooks to prevent monolithic, unmaintainable workflows."
        ],
        takeaway: "Clean scenario architecture makes troubleshooting instant. Structure workflows with clear modular boundaries."
      },
      {
        lesNum: 2,
        title: "Ingesting Webhooks from Email, Webforms, Stripe & Client Software",
        duration: "15m",
        summary: "Configure custom webhook listeners that receive real-time JSON payloads from external software platforms.",
        bulletPoints: [
          "Instant Webhook Configuration: Setting up listening endpoints with automatic data structure discovery.",
          "Email Webhooks via Mailgun/Postmark: Ingesting customer emails with attachments and extracting header metadata.",
          "Payment Triggers: Listening for Stripe checkout completions and invoice payment confirmations in real time.",
          "Webhook Security: Validating HMAC signatures and IP origin to ensure requests originate from trusted client systems."
        ],
        takeaway: "Instant webhooks deliver real-time speed. When a customer takes an action, your automated pipeline responds in seconds."
      },
      {
        lesNum: 3,
        title: "Wiring Airtable to Claude 3.7: Passing Context & Receiving Clean JSON",
        duration: "15m",
        summary: "Build the core cognitive bridge: querying Airtable for operational context, calling Claude API, and saving outputs.",
        bulletPoints: [
          "Context Gathering: Querying linked Airtable records to construct a rich background prompt for the LLM.",
          "HTTP Module Mastery: Making direct authenticated POST requests to the Anthropic Messages API with custom headers.",
          "JSON Parsing: Passing Claude's structured response directly into Make's Parse JSON module for field mapping.",
          "Relational Upserts: Writing extracted entities back into Airtable linked records with verified status updates."
        ],
        takeaway: "The Airtable-Claude bridge is the core cognitive loop of your agency. Once mastered, you can automate any operational task."
      },
      {
        lesNum: 4,
        title: "Error Handlers: Resume, Break, and Rollback Directives in Production",
        duration: "15m",
        summary: "Protect client workflows against API downtime and malformed data using enterprise error directives.",
        bulletPoints: [
          "Error Directives Demystified: Deploying Resume (fallback data), Ignore (skip non-vital steps), and Break (auto-retry).",
          "Managing API Outages: Configuring Break directives to retry failed external calls with exponential backoff.",
          "Rollback Patterns: Preventing partial database writes when a downstream module experiences an unhandled failure.",
          "Dead-Letter Logging: Automatically capturing failed payloads inside a dedicated Airtable Error Queue for manual review."
        ],
        takeaway: "Professional workflows never crash silently. Enterprise error handlers guarantee zero lost data and immediate recovery."
      },
      {
        lesNum: 5,
        title: "Complex Data Iterators & Aggregators for Multi-Line Transactions",
        duration: "15m",
        summary: "Deconstruct arrays of line items with Iterators, process each item through logic checks, and aggregate results.",
        bulletPoints: [
          "Iterator Mechanics: Unpacking multi-item arrays into individual processing bundles for itemized evaluation.",
          "Transforming Line Items: Applying tax rates, currency conversions, and validation checks to each item individually.",
          "Array Aggregators: Recombining processed bundles into a structured JSON array ready for batch database insertion.",
          "Text Aggregators: Compiling multiple line item summaries into a beautifully formatted HTML email table."
        ],
        takeaway: "Iterators and aggregators handle complex enterprise batch operations with surgical precision."
      },
      {
        lesNum: 6,
        title: "Automated Failure Alerting & Dead-Letter Staging Repositories",
        duration: "15m",
        summary: "Configure instant Slack and SMS alerts to notify your agency team the moment an unexpected exception occurs.",
        bulletPoints: [
          "Instant Incident Alerting: Dispatching formatted Slack alerts containing scenario name, error message, and execution ID.",
          "Error Payload Inspection: Providing direct links to failed execution history for 60-second incident triage.",
          "Client Transparency: Maintaining an internal status log to proactively resolve issues before clients even notice.",
          "Retainer Value Demonstration: Highlighting proactive incident resolution in monthly client performance reports."
        ],
        takeaway: "Proactive monitoring turns occasional software hiccups into opportunities to demonstrate the value of your monthly retainer."
      },
      {
        lesNum: 7,
        title: "Module 4 Project: The End-to-End Autonomous Work Order Pipeline",
        duration: "15m",
        summary: "Connect all 3 tools into a complete, bulletproof work order intake, cognitive processing, and client delivery engine.",
        bulletPoints: [
          "Complete System Blueprint: Webhook intake -> Airtable logging -> Claude 3.7 reasoning -> Airtable update -> Slack alert.",
          "Full Error Handling: Every API call protected by Break and Resume directives with automated incident logging.",
          "Live End-to-End Testing: Submitting simulated client orders and verifying flawless multi-table updates.",
          "Commercial Asset: This production-ready pipeline serves as the foundational template for all client implementations."
        ],
        takeaway: "You have built the definitive 3-tool autonomous system. This architecture is directly deployable for commercial clients."
      }
    ]
  },
  {
    num: 5,
    id: "module-05",
    title: "Packaging 3 High-Ticket Recurring Services",
    duration: "1h 45m",
    description: "Productize your 3-tool capabilities into three high-demand B2B service packages priced between $2,500 and $7,500.",
    lessons: [
      {
        lesNum: 1,
        title: "The 3 Core Sellable Services: Inbound Lead Triage, Invoice Auditor, Client Portal",
        duration: "15m",
        summary: "Stop selling generic 'AI services'; package capabilities into 3 concrete operational outcomes that solve obvious pain.",
        bulletPoints: [
          "The Packaging Advantage: Fixed scope and predefined deliverables eliminate proposal anxiety and sales resistance.",
          "Package 1 (Speed-to-Lead Triage): Inbound qualification, dynamic proposal generation, and instant calendar booking.",
          "Package 2 (Cognitive AP Auditor): Multi-page invoice extraction, PO cross-referencing, and accounting synchronization.",
          "Package 3 (Executive Operations Hub): Relational database architecture, custom Softr portal, and multi-app sync."
        ],
        takeaway: "Productized packages transform you from a generic freelancer into a specialized solutions partner with clear offerings."
      },
      {
        lesNum: 2,
        title: "Service 1 Blueprint: 90-Second Lead Response, Enrichment & Auto-Proposal",
        duration: "15m",
        summary: "Step-by-step technical and commercial blueprint for selling and delivering speed-to-lead automation engines.",
        bulletPoints: [
          "The Commercial Pain: Companies that respond after 30 minutes lose 80% of high-intent enterprise leads to faster competitors.",
          "The Automated Workflow: Webform submission -> Clay/Apollo enrichment -> Claude crafts personalized proposal -> instant email.",
          "Setup Sprint Pricing: Selling the initial build for $2,500 with a 5-day delivery commitment.",
          "Recurring Retainer: Attaching a $650/month fee for lead queue monitoring, API token management, and quarterly script tuning."
        ],
        takeaway: "Speed to lead directly increases client sales conversion, making this the fastest service to sell to any B2B company."
      },
      {
        lesNum: 3,
        title: "Service 2 Blueprint: Multimodal Invoice Ingestion & Accounting Sync",
        duration: "15m",
        summary: "Step-by-step blueprint for automating accounts payable, PDF extraction, PO matching, and QuickBooks/Xero synchronization.",
        bulletPoints: [
          "The Commercial Pain: Accounting departments spend 20+ hours weekly manually typing invoice line items into ERP software.",
          "The Automated Workflow: Inbound email attachment -> Claude multimodal extraction -> PO discrepancy check -> QuickBooks draft.",
          "Setup Sprint Pricing: Selling the initial accounting pipeline for $3,500 with a 7-day delivery timeline.",
          "Recurring Retainer: Attaching a $850/month fee for vendor template maintenance, error handling, and monthly reconciliation audits."
        ],
        takeaway: "Accounts payable automation eliminates manual drudgery and catches costly billing errors, providing instant ROI."
      },
      {
        lesNum: 4,
        title: "Service 3 Blueprint: Custom Client Portal & Automated Project Tracking",
        duration: "15m",
        summary: "Step-by-step blueprint for deploying Airtable Interfaces and Softr client hubs with automated notification pipelines.",
        bulletPoints: [
          "The Commercial Pain: Agencies and consultants waste hours answering 'What is the status of my project?' client emails.",
          "The Automated Workflow: Airtable backend -> Softr client portal -> automated milestone notifications -> revision intake.",
          "Setup Sprint Pricing: Selling custom operational portals for $4,500 with a 10-day delivery commitment.",
          "Recurring Retainer: Attaching a $1,000/month fee for user permission management, base hygiene, and feature enhancements."
        ],
        takeaway: "Client portals elevate your client's brand and eliminate repetitive status updates, creating immense perceived value."
      },
      {
        lesNum: 5,
        title: "Pricing Matrix: $2,500-$4,000 Setup Fees + $650-$1,250/mo Retainers",
        duration: "15m",
        summary: "Master the psychology of multi-tier pricing, value anchoring, and structuring mandatory ongoing maintenance retainers.",
        bulletPoints: [
          "The Anchor Strategy: Presenting a $7,500 comprehensive package first makes the $3,500 core offering feel accessible.",
          "Mandatory Retainer Terms: Bundling the first month of maintenance into the setup fee to establish recurring billing as standard.",
          "What the Retainer Covers: Software uptime monitoring, API error resolution, minor workflow adjustments, and monthly value reports.",
          "Contract Longevity: Structuring 6-month minimum retainer agreements to guarantee predictable agency cash flow."
        ],
        takeaway: "Never offer setup without ongoing maintenance. The retainer guarantees system health for the client and predictable income for you."
      },
      {
        lesNum: 6,
        title: "Drafting Clear SOWs That Eliminate Scope Creep Completely",
        duration: "15m",
        summary: "Protect your time and agency margins using airtight Statement of Work templates with explicit deliverable boundaries.",
        bulletPoints: [
          "The Scope Boundary Clause: Explicitly listing what is included and specifically noting what is out of scope.",
          "Milestone Sign-Offs: Requiring written client approval at staging completion before migrating to production.",
          "Change Order Terms: Setting an explicit $175/hour fee for any feature requests outside the original agreement.",
          "Client Prerequisites: Establishing that project timelines pause if the client fails to provide necessary API credentials within 48 hours."
        ],
        takeaway: "Clear contracts protect friendships and profits. Transparent boundaries eliminate scope creep and ensure smooth delivery."
      },
      {
        lesNum: 7,
        title: "Module 5 Project: Packaging Your 3-Tier Commercial Offer Deck",
        duration: "15m",
        summary: "Create a professional, branded 1-page offer sheet and capability deck ready to send to prospective B2B clients.",
        bulletPoints: [
          "Offer Sheet Structure: Clean 1-page overview detailing the 3 service tiers, deliverables, timelines, and pricing.",
          "Visual Architecture Diagrams: Including clean workflow diagrams that explain the technical mechanism without jargon.",
          "ROI Calculator Section: Demonstrating the tangible labor cost savings and revenue recovery for each tier.",
          "Commercial Deliverable: Your finalized proposal asset ready to share during sales discovery conversations."
        ],
        takeaway: "A polished offer sheet positions you as an established solutions agency, allowing you to command premium fees."
      }
    ]
  },
  {
    num: 6,
    id: "module-06",
    title: "Client Acquisition & Pain-First Discovery Process",
    duration: "1h 45m",
    description: "Execute outbound lead sourcing, master the 5-minute Trojan Horse Loom audit, and close 50%+ of discovery calls.",
    lessons: [
      {
        lesNum: 1,
        title: "Sourcing High-Value B2B Accounts: Scraping Directories & Verifying Pain",
        duration: "15m",
        summary: "Build targeted prospect lists of high-margin companies experiencing acute operational and administrative bottlenecks.",
        bulletPoints: [
          "Target Account Identification: Using Apollo, Clay, and Google Maps to find companies with 10 to 50 employees in your niche.",
          "Pain Verification: Checking job boards for listings like 'Data Entry Clerk' or 'Administrative Assistant' as proof of manual pain.",
          "Technology Stack Auditing: Inspecting website source code to identify what forms, CRMs, and software they currently use.",
          "Decision-Maker Sourcing: Extracting verified direct email addresses and LinkedIn profiles for Managing Partners and COOs."
        ],
        takeaway: "Active hiring for administrative roles is undeniable proof of operational friction. Target companies already spending money to solve the problem."
      },
      {
        lesNum: 2,
        title: "The 5-Minute 'Trojan Horse' Loom Audit That Books Discovery Calls",
        duration: "15m",
        summary: "Master the personalized video audit formula that demonstrates a prospect's specific bottleneck and books calls on autopilot.",
        bulletPoints: [
          "The Audit Structure: 45s compliment & friction test -> 2m visual workflow solution -> 2m ROI breakdown & soft CTA.",
          "The Interactive Test: Submitting a test inquiry on their website on camera and showing the absence of an automated response.",
          "The Visual Tease: Showing a customized Make.com workflow diagram pre-built with their logo and company name.",
          "The Low-Friction CTA: 'I built the visual blueprint for this workflow. Happy to send it over or walk you through it on a quick 10-minute call.'"
        ],
        takeaway: "Demonstrating their exact operational friction on camera makes your outreach irresistible. It generates 5x higher response rates than cold text."
      },
      {
        lesNum: 3,
        title: "Cold Email & LinkedIn Outbound Sequences with 25%+ Booking Rates",
        duration: "15m",
        summary: "Deploy short, hyper-personalized outreach sequences that deliver your Loom audit directly to executive decision-makers.",
        bulletPoints: [
          "The 3-Sentence Cold Email: Short, observation-driven copy asking permission to send the personalized video audit.",
          "Follow-Up Cadence: A 4-step sequence across 12 days combining soft check-ins with tangible workflow case studies.",
          "LinkedIn Social Proximity: Connecting with prospects, engaging with recent posts, and sharing relevant automation insights.",
          "Inbox Deliverability: Setting up dedicated secondary domains, DKIM/SPF records, and warming protocols to stay out of spam."
        ],
        takeaway: "Ask for permission to share value rather than pitching immediately. Conversational outreach turns cold prospects into receptive buyers."
      },
      {
        lesNum: 4,
        title: "The 4-Stage Consultative Discovery Call: Uncovering Hidden Labor Costs",
        duration: "15m",
        summary: "Conduct consultative sales conversations that guide the prospect to calculate their own operational waste and demand your solution.",
        bulletPoints: [
          "Stage 1 (Diagnostic Questions): Uncovering current software bottlenecks: 'Where does your team spend the most repetitive time?'",
          "Stage 2 (Quantifying Financial Waste): Calculating annual costs: 'If two staff spend 15 hours weekly, that is $35,000 in labor overhead.'",
          "Stage 3 (Future-State Vision): Asking how their business would transform if response time dropped from 3 hours to 45 seconds.",
          "Stage 4 (Collaborative Solution): Presenting your 3-tool architecture as the definitive operational fix."
        ],
        takeaway: "When the client calculates their own financial waste, your $3,500 implementation fee becomes an obvious, low-risk decision."
      },
      {
        lesNum: 5,
        title: "Live Architecture Mapping: Showing Clients Their Future Efficiency On-Call",
        duration: "15m",
        summary: "Share your screen during discovery calls to live-map their automated workflow, building overwhelming trust and authority.",
        bulletPoints: [
          "Visual Mapping Tools: Using Miro, Whimsical, or Make canvas to sketch out their current broken flow vs. future automated flow.",
          "The Aha Moment: Watching the client visibly relax as they see chaotic manual tasks organized into an elegant automated pipeline.",
          "Demystifying Technology: Explaining the roles of Airtable, Claude, and Make in simple business terms without technical jargon.",
          "Securing Buy-In: Asking 'If we deployed this exact system next week, would that eliminate the bottleneck?'"
        ],
        takeaway: "Visual workflow mapping makes abstract automation tangible. Clients buy what they can see and understand."
      },
      {
        lesNum: 6,
        title: "Overcoming Enterprise Security Objections, Compliance & IT Concerns",
        duration: "15m",
        summary: "Confidently handle questions regarding data privacy, model training, SOC2 compliance, and API security.",
        bulletPoints: [
          "The Data Training Objection: Explaining that business API calls to Anthropic and OpenAI are never used to train frontier models.",
          "Encryption Standards: Highlighting that data is encrypted in transit via TLS 1.3 and at rest via AES-256 in Airtable.",
          "Human-in-the-Loop Safeguards: Reassuring clients that sensitive customer-facing outputs require internal approval before sending.",
          "The Security 1-Pager: Providing a pre-written corporate security overview document that satisfies client IT and legal teams."
        ],
        takeaway: "Addressing security proactively positions you as an enterprise-grade partner and eliminates late-stage deal friction."
      },
      {
        lesNum: 7,
        title: "Module 6 Project: Executing Your 30-Day Prospect Outreach Campaign",
        duration: "15m",
        summary: "Source 50 verified target accounts, record 10 personalized Trojan Horse Loom audits, and book your first 3 client calls.",
        bulletPoints: [
          "Prospect List Assembly: Curating 50 targeted accounts with verified decision-maker emails in your chosen niche.",
          "Batch Video Production: Recording 10 personalized Loom audits using the proven 5-minute formula in a single afternoon.",
          "Campaign Dispatch: Enrolling prospects into customized outreach sequences with active response tracking.",
          "Milestone Objective: Securing at least 3 discovery calls and closing your first $2,500+ implementation setup client."
        ],
        takeaway: "Consistent outreach creates consistent revenue. Execute this 30-day campaign and sign your first high-ticket client."
      }
    ]
  },
  {
    num: 7,
    id: "module-07",
    title: "Operations, SLA Management & Scaling to $10,000/Month",
    duration: "1h 45m",
    description: "Systematize delivery, provide automated monthly client value reports, retain 100% of accounts, and hit $10,000/month.",
    lessons: [
      {
        lesNum: 1,
        title: "Systematic Client Onboarding: 48-Hour Setup & Credential Handover",
        duration: "15m",
        summary: "Deploy a white-glove onboarding intake system that collects API keys, brand assets, and account permissions in 48 hours.",
        bulletPoints: [
          "The Client Onboarding Kit: Sending a clean, interactive Airtable form requesting necessary software access and credentials.",
          "Password Security: Using 1Password or Bitwarden secure share links rather than collecting sensitive passwords over email.",
          "Kickoff Call Structure: A 30-minute alignment meeting confirming milestone delivery dates and communication protocols.",
          "Client Perception: A frictionless, organized onboarding experience builds immediate trust and reassures the buyer."
        ],
        takeaway: "First impressions dictate the entire client relationship. A professional 48-hour onboarding sets the tone for long-term retention."
      },
      {
        lesNum: 2,
        title: "Staging-to-Production Migration Protocol with Zero Downtime",
        duration: "15m",
        summary: "Follow enterprise deployment procedures to migrate workflows from sandbox environments to live client systems safely.",
        bulletPoints: [
          "The Staging Sandbox: Building and testing all scenarios using test API keys and dummy database records.",
          "End-to-End Stress Testing: Simulating edge cases, malformed data, and high-volume bursts to verify error handling directives.",
          "The Production Switch: Updating webhook URLs and swapping staging API tokens for live production credentials.",
          "Zero-Downtime Guarantee: Running the automated system in parallel with manual workflows for 48 hours to verify parity."
        ],
        takeaway: "Parallel testing guarantees zero disruption to client operations. Enterprise discipline ensures flawless production rollouts."
      },
      {
        lesNum: 3,
        title: "Recording 15-Minute Loom Video SOPs for Client Staff Training",
        duration: "15m",
        summary: "Deliver clear, recorded operational training walkthroughs that empower client staff to interact with the system effortlessly.",
        bulletPoints: [
          "The Video SOP Structure: 3m overview of the workflow -> 7m walkthrough of the Airtable Interface -> 5m FAQ and troubleshooting.",
          "Staff Enablement: Framing the automation as an assistant that eliminates boring drudgery, not a replacement for their jobs.",
          "The Notion/Softr Knowledge Base: Housing video tutorials and written cheat sheets inside the client's operational portal.",
          "Support Ticket Reduction: High-quality documentation eliminates 95% of basic 'How do I use this?' client questions."
        ],
        takeaway: "Empowered client staff become your biggest advocates. When employees love your system, leadership never cancels the retainer."
      },
      {
        lesNum: 4,
        title: "Proactive Maintenance: Monthly Health Checks, API Audits & Retainer Justification",
        duration: "15m",
        summary: "Perform scheduled monthly system optimizations that take you under 60 minutes while justifying ongoing retainer fees.",
        bulletPoints: [
          "The Monthly Health Audit: Reviewing execution logs in Make.com and clearing warning queues.",
          "Prompt Refinement: Updating Claude 3.7 system prompts with new edge cases identified during the previous month's operations.",
          "Airtable Base Hygiene: Archiving historical records, optimizing formula fields, and auditing data integrity.",
          "Proactive Communication: Sending a monthly email confirming system uptime and completed preventive maintenance checks."
        ],
        takeaway: "Retainers are kept through proactive communication. When clients know you are guarding their systems, churn drops to zero."
      },
      {
        lesNum: 5,
        title: "Automated Client Value Reports Proving Return on Investment",
        duration: "15m",
        summary: "Generate and send automated monthly PDF digests proving exact hours saved, transactions processed, and dollars created.",
        bulletPoints: [
          "The ROI Digest Metrics: Total work orders processed, average response latency, and calculated employee hours saved.",
          "Automated Report Generation: Using Make.com and DocuGenerate to compile monthly Airtable stats into a branded executive PDF.",
          "Executive Delivery: Automatically emailing the report to the CEO and CFO on the 1st of every month.",
          "The Psychological Anchor: Reminding leadership that your $850 retainer saved them $4,500 in labor makes cancellation unthinkable."
        ],
        takeaway: "Monthly ROI reports make your retainer indispensable. Always remind the client of the financial return you deliver."
      },
      {
        lesNum: 6,
        title: "Managing 6 to 10 Retainers in Under 15 Hours a Week",
        duration: "15m",
        summary: "Organize your agency operations, automated diagnostics, and ticket queues to scale income without sacrificing personal time.",
        bulletPoints: [
          "Centralized Agency Dashboard: Managing all client bases and scenarios from a single master operations console.",
          "Universal Alert Webhooks: Routing error alerts from all 10 clients into a single centralized agency Slack channel.",
          "Batch Support Windows: Restricting non-emergency maintenance to scheduled weekly maintenance blocks.",
          "High Profit Margins: Achieving $10,000/month recurring revenue with 90%+ margins and zero full-time employees."
        ],
        takeaway: "Automation allows you to build an agency that serves your life, not one that consumes it. Scale revenue while reclaiming time."
      },
      {
        lesNum: 7,
        title: "Capstone Project: Achieving the $10,000 Monthly Recurring Milestone",
        duration: "15m",
        summary: "Synthesize all 7 modules into your complete operational agency roadmap and cross the $10,000/month recurring threshold.",
        bulletPoints: [
          "The Complete Agency Flywheel: Outreach -> Discovery -> 7-Day Sprint -> Monthly Retainer -> Automated Referral Loops.",
          "Client Expansion Opportunities: Upselling existing retainer accounts on secondary workflows to double client lifetime value.",
          "Long-Term Enterprise Valuation: Building a predictable, recurring B2B service business that can be operated or sold.",
          "Final Graduation Checkpoint: You now possess the complete architecture, tools, and sales engine to reach $10K/month and beyond."
        ],
        takeaway: "You have mastered the 3-tool architecture. Execute with consistency, deliver genuine value, and enjoy the freedom of a $10K/month business."
      }
    ]
  }
];

module.exports = {
  courseTitle,
  modulesData,
};
