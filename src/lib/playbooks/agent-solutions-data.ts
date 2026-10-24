import type { Course, Module, Lesson } from "../playbooks-data";
import type { PlaybookDetailData, PlaybookDetailModule } from "../dating-playbook-detail";

export const AGENT_SOLUTIONS_SLUG = "5-ai-agents-you-can-build-and-sell-without-training-your-own-model";
export const AGENT_SOLUTIONS_ID = "ai-businesses-03";

const modulesMetadata = [
  {
    id: "module-01",
    number: "01",
    title: "Agentic Architecture & Foundations",
    description: "Understand the core mechanics of autonomous AI agents: memory, tool invocation, and decision loops.",
    duration: "55m",
    lessons: [
      {
        id: "01-1",
        number: "1.1",
        title: "What Makes an Agent: Moving Beyond Static Prompts & Linear Automations",
        duration: "14m",
        summary: "Understand the structural difference between deterministic linear automations, static prompts, and autonomous agent loops that reason, invoke external tools, and handle unexpected inputs.",
        slides: [
          {
            title: "What Qualifies as an Autonomous Agent?",
            subtitle: "The 4-part architecture separating dynamic agents from basic LLM prompts",
            bulletPoints: [
              "A prompt generates text once; a linear workflow follows fixed if-then rules; an agent decides what action to take next based on live environmental feedback.",
              "The Core Agent Loop: Perception (Webhooks/Events) → Cognitive Evaluation (LLM Reasoning) → Tool Execution (APIs/Databases) → Verification (Self-Correction).",
              "Why commercial clients pay $2,500+ for agents: They handle ambiguous, variable human communication that breaks traditional rule-based automations.",
              "You never need to train foundational models: Enterprise value lies in domain-specific tool integration, system prompt boundaries, and deterministic error fallback.",
            ],
            takeaway: "Agents combine reasoning models with external tools and validation loops to autonomously achieve business goals.",
          },
          {
            title: "The Agent Tool-Calling Anatomy",
            subtitle: "How Claude 3.7 & GPT-4o invoke external functions via structured JSON",
            bulletPoints: [
              "JSON Schema Definitions: Teaching the agent what tools exist, required parameters, and expected output formats.",
              "System Prompt Guardrails: Explicit instructions specifying tool execution order, retry limits, and escalation triggers.",
              "State & Context Memory: Passing execution history across multi-turn reasoning steps without exceeding context windows.",
              "Human-in-the-Loop Fallbacks: Setting automated thresholds where the agent pauses and requests supervisor sign-off before committing financial or customer-facing actions.",
            ],
            takeaway: "Clean tool definitions and strict boundary rules prevent hallucinations and ensure enterprise-grade reliability.",
          },
          {
            title: "Commercial Feasibility & Client Economics",
            subtitle: "Why small and mid-market companies buy pre-packaged agentic solutions",
            bulletPoints: [
              "Custom model training costs $50,000+ and months of engineering; tool-augmented agents deploy in 3 to 7 days.",
              "Clients care about business outcomes: Reduced response time, zero dropped leads, and 80%+ manual data entry elimination.",
              "Transparent Unit Economics: A $2,500 setup fee covers system architecture; an ongoing $600/month retainer covers API cost monitoring, prompt updates, and new tool connectors.",
              "Deliverable ownership: Clients host their own accounts (OpenAI, Anthropic, Make.com, Airtable), keeping your agency liability-free.",
            ],
            takeaway: "Sell business bottleneck removal, not artificial intelligence hype.",
          },
        ],
        writtenContent: `
# What Makes an Agent: Moving Beyond Static Prompts & Linear Automations

In the current enterprise landscape, businesses are overwhelmed by AI hype but desperately in need of operational efficiency. Many agencies make the mistake of attempting to train custom neural networks or pitch basic chatbot prompts that provide zero measurable ROI.

An **autonomous AI agent** is fundamentally different from a simple prompt or a static Zapier workflow. A traditional automation requires every single condition to be anticipated in advance: if Column C equals "Quote", send Email Template B. If a customer replies with an unexpected question or a scanned PDF instead of a form field, the automation breaks.

## The 4 Components of an Autonomous Agent

1. **Perception Engine**: Ingests unstructured inputs—incoming emails, audio transcripts, support tickets, or database triggers.
2. **Cognitive Planner**: A frontier reasoning model (such as Claude 3.7 Sonnet or GPT-4o) evaluates the input against explicit system rules and formulates an execution plan.
3. **Tool Execution Matrix**: The agent calls external APIs—searching an Airtable database, verifying calendar availability via Google Calendar, generating an invoice in QuickBooks, or sending a Slack alert.
4. **Validation & Self-Correction**: The agent inspects the tool response, checks for errors, and either completes the objective or modifies its strategy.

## Implementation Blueprint & Tool Schemas

To build agents commercially without coding foundational models, you leverage **Tool Calling (Function Calling)**. You define your tools as structured JSON schemas. When the model determines that an action is required, it outputs a deterministic JSON payload requesting execution.
        `,
      },
      {
        id: "01-2",
        number: "1.2",
        title: "The Agent Tech Stack: APIs, Vector Storage, and Execution Environments",
        duration: "13m",
        summary: "Master the 4 layers of modern no-code and low-code agent architecture: Anthropic/OpenAI APIs, Make.com orchestration, Airtable state storage, and Pinecone vector retrieval.",
        slides: [
          {
            title: "The Commercial Agent Tech Stack",
            subtitle: "Assembling enterprise-grade autonomous systems without custom backend code",
            bulletPoints: [
              "Layer 1 (Cognitive Engine): Anthropic Claude 3.7 Sonnet for document extraction; GPT-4o for structured tool-calling speed.",
              "Layer 2 (Execution Orchestrator): Make.com or n8n for visual routing, webhooks, error handlers, and authentication.",
              "Layer 3 (Relational State Memory): Airtable or PostgreSQL (Supabase) for session histories, logs, and client approval interfaces.",
              "Layer 4 (Knowledge Base & Retrieval): Vector embeddings or native large-context injection (Claude 200K window) for company documentation.",
            ],
            takeaway: "A disciplined 4-layer stack provides enterprise capabilities with zero custom server maintenance.",
          },
        ],
        writtenContent: "Detailed breakdown of agent architecture layers, API key management, and production-ready visual execution workflows.",
      },
      {
        id: "01-3",
        number: "1.3",
        title: "Tool-Calling & Function Orchestration: Building Deterministic Workflows",
        duration: "14m",
        summary: "Learn how to define clean JSON tool schemas, enforce parameter validation, and structure multi-step reasoning chains without hallucination.",
        slides: [
          {
            title: "Deterministic Function Calling Architecture",
            subtitle: "Guaranteeing predictable execution from probabilistic LLMs",
            bulletPoints: [
              "Defining strict JSON schemas for every external tool: name, description, required parameters, and types.",
              "Zero-shot tool selection: Enabling the model to select the right tool from a catalog of 10+ operational capabilities.",
              "Handling tool execution returns: Feeding API responses back into the model context for synthesis.",
              "Setting hard execution limits (Max 5 loops) to eliminate infinite billing cycles.",
            ],
            takeaway: "Constrain model flexibility with rigid schemas to guarantee production dependability.",
          },
        ],
        writtenContent: "Step-by-step tutorial on constructing function calling schemas in Make.com and Anthropic workbench.",
      },
      {
        id: "01-4",
        number: "1.4",
        title: "Safety Guardrails, Token Budgets, and Human-in-the-Loop Safeguards",
        duration: "14m",
        summary: "Deploy bulletproof guardrails: budget caps, sensitive action pauses, prompt injection defenses, and client notification dashboards.",
        slides: [
          {
            title: "Enterprise Safety & Guardrail Design",
            subtitle: "Preventing hallucinations, rogue transactions, and prompt injection attacks",
            bulletPoints: [
              "Threshold-based Human Sign-Off: Any action involving refunds, contracts, or outbound mass emails requires staff approval.",
              "Token & Cost Quotas: Hard monthly caps per client account to eliminate unexpected API billing spikes.",
              "Input Sanitization: Pre-processing customer messages to neutralize malicious prompt injection attempts.",
              "Audit Logging: Storing full execution transcripts in Airtable for complete transparency and compliance.",
            ],
            takeaway: "Enterprise buyers only sign contracts when safety guardrails are visibly demonstrated.",
          },
        ],
        writtenContent: "Comprehensive security checklist, rate-limiting frameworks, and supervisor approval flow architectures.",
      },
    ],
  },
  {
    id: "module-02",
    number: "02",
    title: "Agent #1: The Inbound Lead Triage & Instant Proposal Agent",
    description: "Build an autonomous agent that ingests inbound inquiries, scores deal value, drafts customized SOW proposals, and books calls in under 90 seconds.",
    duration: "52m",
    lessons: [
      {
        id: "02-1",
        number: "2.1",
        title: "Agent Architecture: Webhook Ingestion, ICP Scoring & Context Retrieval",
        duration: "13m",
        summary: "Architect the triage pipeline connecting web forms, email inboxes, CRM lookups, and Claude 3.7 evaluation logic.",
        slides: [
          {
            title: "Inbound Triage & Proposal Architecture",
            subtitle: "Automating the 90-second speed-to-lead workflow for B2B trade & service firms",
            bulletPoints: [
              "Lead Ingestion: Catching incoming form submissions or inbound email inquiries via Instant Webhooks.",
              "Company Enrichment: Scraping prospect website and LinkedIn profile via Perplexity or Clearbit API.",
              "ICP Scoring Engine: Evaluating lead budget, urgency, and fit against client qualification criteria (Tier A/B/C).",
              "Dynamic Routing: High-intent leads receive automated custom proposals and VIP booking links instantly.",
            ],
            takeaway: "Responding in under 2 minutes increases lead conversion rates by over 390%.",
          },
        ],
        writtenContent: "Technical blueprint for the 90-second proposal generation engine with webhook configurations and routing logic.",
      },
      {
        id: "02-2",
        number: "2.2",
        title: "Building the Proposal Generator: Dynamic Pricing & Scope Formulation",
        duration: "13m",
        summary: "Create deterministic pricing templates that dynamically calculate project estimates based on client specifications.",
        slides: [
          {
            title: "Dynamic Proposal & SOW Synthesis",
            subtitle: "Generating PDF proposals with custom deliverables and tiered pricing",
            bulletPoints: [
              "Extracting customer requirements from unstructured inquiry messages.",
              "Matching pain points to client pricing matrix in Airtable.",
              "Generating personalized 3-page proposal PDFs using DocuGenerate or HTML-to-PDF APIs.",
              "Attaching custom Loom video placeholders and personalized cover letters.",
            ],
            takeaway: "High-ticket prospects convert when proposals directly mirror their exact language and problem set.",
          },
        ],
        writtenContent: "Full SOW proposal generation prompt templates, variable mappings, and PDF creation pipeline.",
      },
      {
        id: "02-3",
        number: "2.3",
        title: "Calendar Integration, SMS Confirmation & CRM Sync",
        duration: "13m",
        summary: "Connect Cal.com/Calendly webhooks, Twilio SMS alerts, and HubSpot/Airtable synchronization.",
        slides: [
          {
            title: "Calendar Coordination & Multi-Channel Alerts",
            subtitle: "Closing the booking loop without human calendar friction",
            bulletPoints: [
              "Two-way calendar availability lookup and temporary slot reservation.",
              "Instant SMS notification with interactive reschedule capabilities via Twilio.",
              "Automated pre-call briefing note created in client CRM with AI research summary.",
              "Automated reminder sequence at 24 hours and 1 hour before scheduled call.",
            ],
            takeaway: "Automated SMS confirmations drop appointment no-show rates from 30% to under 8%.",
          },
        ],
        writtenContent: "Calendar webhook setup, Twilio SMS routing, and automated executive meeting brief creation.",
      },
      {
        id: "02-4",
        number: "2.4",
        title: "Testing, Edge-Case Handling & Client Demonstration Workflow",
        duration: "13m",
        summary: "Test edge cases: vague budgets, spam submissions, competitor inquiries, and out-of-scope requests.",
        slides: [
          {
            title: "Stress Testing & Client Demo Scripts",
            subtitle: "How to showcase the triage agent to land $2,500 setup fees",
            bulletPoints: [
              "Simulating edge cases: Incomplete submissions, foreign languages, and competitor espionage.",
              "The 3-Minute Live Audit Demo: Submitting a live test inquiry on the prospect's website during discovery.",
              "Packaging the deliverable: $2,500 implementation fee + $600/month maintenance retainer.",
              "Client handover checklist: Account provisioning, webhook secrets, and staff notification rules.",
            ],
            takeaway: "Live demonstrations on the prospect's actual workflow close deals faster than any slide presentation.",
          },
        ],
        writtenContent: "Complete testing scenarios, client demonstration walkthrough, and objection handling scripts.",
      },
    ],
  },
  {
    id: "module-03",
    number: "03",
    title: "Agent #2: The Executive Market Research & Intelligence Agent",
    description: "Construct an autonomous market research agent that monitors competitor moves, extracts regulatory filings, and delivers executive intelligence digests.",
    duration: "48m",
    lessons: [
      {
        id: "03-1",
        number: "3.1",
        title: "Intelligence Agent Architecture: Web Crawling, RSS & Vector Synthesis",
        duration: "12m",
        summary: "Build an automated scraper and RSS ingestion system that monitors industry news, competitor updates, and executive social channels.",
        slides: [
          {
            title: "Autonomous Intelligence Gathering",
            subtitle: "Transforming 20 hours of weekly research into automated executive dossiers",
            bulletPoints: [
              "Automated daily crawling of competitor pricing pages, changelogs, and job boards.",
              "Ingesting regulatory filings, SEC reports, and patent filings via public APIs.",
              "Filtering signal from noise using Claude 3.7 relevance scoring prompts.",
              "Storing extracted insights in a searchable company vector index.",
            ],
            takeaway: "Executives happily pay $1,500/month for concise, actionable competitor intelligence.",
          },
        ],
        writtenContent: "Technical guide on configuring Apify web scrapers, RSS feeds, and Claude 3.7 extraction pipelines.",
      },
      {
        id: "03-2",
        number: "3.2",
        title: "Synthesizing Unstructured Data: 200K Context Window Deep Extraction",
        duration: "12m",
        summary: "Leverage Claude's massive context window to synthesize 100-page earnings calls, PDFs, and competitor transcripts into structured summaries.",
        slides: [
          {
            title: "Deep Context Dossier Synthesis",
            subtitle: "Extracting strategic insights from complex 100+ page enterprise documents",
            bulletPoints: [
              "Loading entire quarterly reports and conference transcripts into a single prompt execution.",
              "Extracting competitor pricing pivots, product roadmaps, and key executive hires.",
              "Formatting findings into standardized executive SWOT tables and strategic action items.",
              "Zero-hallucination citation: Forcing the model to quote exact page numbers and document sources.",
            ],
            takeaway: "Source-cited summaries build executive trust and eliminate verification overhead.",
          },
        ],
        writtenContent: "Prompt architecture for multi-document synthesis, citation extraction, and executive briefing formats.",
      },
      {
        id: "03-3",
        number: "3.3",
        title: "Automated Slack & Email Digest Distribution",
        duration: "12m",
        summary: "Format research insights into polished executive email briefs and interactive Slack channel notifications.",
        slides: [
          {
            title: "Executive Delivery & Alert Formatting",
            subtitle: "Delivering high-signal intelligence directly into client leadership workflows",
            bulletPoints: [
              "Formatting weekly executive briefs with clean HTML email templates.",
              "Interactive Slack notifications with one-click 'Request Deep Dive' agent triggers.",
              "Automated tagging of company stakeholders based on topic relevance.",
              "Archive dashboard in Airtable allowing team members to query past research.",
            ],
            takeaway: "Deliver insights where leadership already works: Slack, Teams, or morning email.",
          },
        ],
        writtenContent: "Slack webhook formatting, Block Kit JSON structures, and automated email digest templates.",
      },
      {
        id: "03-4",
        number: "3.4",
        title: "Commercial Packaging: Selling Retainer Research to Law, PE & Consulting Firms",
        duration: "12m",
        summary: "Position this agent to private equity firms, boutique consultancies, and corporate legal teams for $1,500–$3,000/month retainers.",
        slides: [
          {
            title: "Selling High-Ticket Intelligence Retainers",
            subtitle: "Targeting high-margin B2B sectors that bill $400+/hour for research",
            bulletPoints: [
              "Target Niches: Boutique private equity firms, M&A advisory, and commercial litigation practices.",
              "The Value Metric: Replacing 15 hours of junior associate research time per week.",
              "Offer Architecture: $3,500 setup (source connection & custom schema) + $1,500/mo ongoing monitoring.",
              "The Proof-of-Concept Pitch: Delivering a free 3-page competitor audit in under 24 hours.",
            ],
            takeaway: "Target industries where information speed directly impacts deal closures.",
          },
        ],
        writtenContent: "Outreach scripts for investment and legal firms, proposal templates, and retainer contract clauses.",
      },
    ],
  },
  {
    id: "module-04",
    number: "04",
    title: "Agent #3: The Multi-Channel Support & Ticket Escalation Agent",
    description: "Deploy an intelligent customer support agent that resolves 70%+ of tier-1 inquiries, performs live database lookups, and escalates complex issues with full context.",
    duration: "50m",
    lessons: [
      {
        id: "04-1",
        number: "4.1",
        title: "Customer Support Agent Architecture & Knowledge Synchronization",
        duration: "12m",
        summary: "Connect Zendesk, Freshdesk, Intercom, or email inboxes with dynamic Notion and Airtable knowledge bases.",
        slides: [
          {
            title: "Tier-1 Autonomous Support Architecture",
            subtitle: "Resolving 70%+ of routine inquiries without human staff intervention",
            bulletPoints: [
              "Two-way synchronization between customer help articles and the agent cognitive context.",
              "Customer identification and lifetime value lookup via Shopify, Stripe, or CRM APIs.",
              "Intent classification: Return requests, shipping status, product recommendations, and billing disputes.",
              "Safe API execution: Checking live tracking numbers without granting write access to core systems.",
            ],
            takeaway: "Safe read-only tool connections enable powerful capabilities without financial risk.",
          },
        ],
        writtenContent: "Architectural blueprint for helpdesk integrations, database lookups, and intent classification models.",
      },
      {
        id: "04-2",
        number: "4.2",
        title: "Live Database Tool Execution: Order Status, Shipping & Account Lookups",
        duration: "13m",
        summary: "Configure deterministic tool calls that allow the agent to fetch tracking numbers, update shipping addresses, and query customer records.",
        slides: [
          {
            title: "Live Account & Order Operations",
            subtitle: "Empowering agents to take real-world customer support actions",
            bulletPoints: [
              "Calling Shopify Admin API to retrieve live fulfillment and courier tracking links.",
              "Updating customer shipping addresses before orders enter fulfillment.",
              "Validating customer identity via email verification codes before modifying accounts.",
              "Logging every resolution in the primary helpdesk ticket with internal notes.",
            ],
            takeaway: "Actions beat answers: Customers want problems solved, not just text explanations.",
          },
        ],
        writtenContent: "Shopify and Stripe API tool schemas, validation protocols, and customer identity verification workflows.",
      },
      {
        id: "04-3",
        number: "4.3",
        title: "Smart Escalation Protocol & Supervisor Handoff with Context Summary",
        duration: "12m",
        summary: "Design seamless human escalation triggers when sentiment turns negative or requests exceed authorized thresholds.",
        slides: [
          {
            title: "Seamless Escalation & Context Preservation",
            subtitle: "Ensuring human agents never ask customers to repeat themselves",
            bulletPoints: [
              "Sentiment Monitoring: Escalating instantly when customer exhibits severe frustration or threat of churn.",
              "Executive Escalation Brief: Compiling customer history, issue summary, actions attempted, and recommended resolution.",
              "Live routing to the appropriate specialist team in Slack or Zendesk.",
              "Seamless handoff banner: Notifying the customer that a senior specialist is reviewing their dossier.",
            ],
            takeaway: "Escalation is not failure: It is the foundation of high-trust automation.",
          },
        ],
        writtenContent: "Sentiment analysis prompt filters, escalation routing rules, and internal summary note templates.",
      },
      {
        id: "04-4",
        number: "4.4",
        title: "Pricing & Retainer Management: E-Commerce & SaaS Support Contracts",
        duration: "13m",
        summary: "Structure pricing models ($3,000 setup + $1,000/mo retainer or per-resolved-ticket fees) for e-commerce brands.",
        slides: [
          {
            title: "Support Agent Packaging & Unit Economics",
            subtitle: "Selling $3,000 implementations to high-volume e-commerce and SaaS brands",
            bulletPoints: [
              "The Value Math: A human support agent costs $3,500/month; the agent handles 2,000 tickets for $1,000/month.",
              "Pricing Model: $3,000 setup fee + $850/month base retainer (up to 1,500 resolutions) + $0.50/resolution overage.",
              "Guaranteed SLAs: First response time under 15 seconds 24/7/365.",
              "The Pilot Offer: Deploying the agent on a single category (e.g., 'Where is my order?') for 14 days.",
            ],
            takeaway: "High ticket volume makes support automation an immediate, no-brainer operational decision.",
          },
        ],
        writtenContent: "Contract templates, SLA agreements, and e-commerce pitch decks for customer support agents.",
      },
    ],
  },
  {
    id: "module-05",
    number: "05",
    title: "Agents #4 & #5: Document Extraction & Invoice Triage",
    description: "Implement specialized B2B operational agents: Document Extraction & Reconciliation Agent and Autonomous Invoice Processing Agent.",
    duration: "48m",
    lessons: [
      {
        id: "05-1",
        number: "5.1",
        title: "Document Extraction Agent: Parsing Complex Invoices, Scans & PDFs",
        duration: "12m",
        summary: "Build an OCR and structured extraction agent using Claude 3.7 vision and document parsing capabilities.",
        slides: [
          {
            title: "Vision & Document Extraction Engine",
            subtitle: "Converting chaotic invoices, receipts, and contracts into flawless database records",
            bulletPoints: [
              "Ingesting scanned PDFs, smartphone photos, and email attachments.",
              "Using Claude 3.7 Sonnet multimodal vision to read handwriting and skewed tables.",
              "Extracting vendor name, line items, tax, total, PO number, and payment terms into JSON.",
              "Mathematical validation: Verifying that line items sum up exactly to the invoice total before committing.",
            ],
            takeaway: "Multimodal models eliminate the need for brittle traditional OCR templates.",
          },
        ],
        writtenContent: "Vision prompt schemas, mathematical validation code blocks, and invoice parsing workflows.",
      },
      {
        id: "05-2",
        number: "5.2",
        title: "Autonomous Invoice Triage: Matching POs, Approval Routing & ERP Sync",
        duration: "12m",
        summary: "Connect QuickBooks, Xero, or NetSuite to automate invoice reconciliation and approval workflows.",
        slides: [
          {
            title: "Automated AP Triage & Reconciliation",
            subtitle: "Closing the accounts payable loop with three-way purchase order matching",
            bulletPoints: [
              "Three-Way Matching: Verifying invoice against purchase order and inventory receipt in Airtable.",
              "Automated Approval Routing: Generating Slack interactive buttons for department head approval.",
              "Direct ERP Injection: Pushing validated invoices into QuickBooks Online or Xero as draft bills.",
              "Audit Trail: Archiving original PDF attachments alongside approval timestamps and extraction confidence scores.",
            ],
            takeaway: "Finance teams gladly pay thousands to eliminate end-of-month reconciliation chaos.",
          },
        ],
        writtenContent: "QuickBooks and Xero API schemas, approval webhook configurations, and reconciliation logic.",
      },
      {
        id: "05-3",
        number: "5.3",
        title: "Legal & Contract Dossier Agent: Extracting Risk Flags & Expiration Dates",
        duration: "12m",
        summary: "Deploy Agent #5 to review commercial vendor contracts, identify indemnity clauses, and track renewal deadlines.",
        slides: [
          {
            title: "Contract Risk & Renewal Intelligence",
            subtitle: "Protecting commercial clients from auto-renewals and liability traps",
            bulletPoints: [
              "Ingesting 30+ page Master Services Agreements and vendor contracts.",
              "Extracting non-standard liability caps, indemnity obligations, and termination clauses.",
              "Automated Calendar Sync: Pushing contract expiration and notice deadlines into Google Calendar.",
              "Risk Scorecard: Generating an executive summary highlighting non-standard vendor terms.",
            ],
            takeaway: "Contract visibility prevents costly auto-renewals and legal surprises.",
          },
        ],
        writtenContent: "Legal extraction prompt templates, risk scoring rubrics, and automated deadline tracking systems.",
      },
      {
        id: "05-4",
        number: "5.4",
        title: "Packaging Back-Office Automation: Landing CFO & Operations Clients",
        duration: "12m",
        summary: "Package document and invoice agents as high-margin operational sprints for mid-market CFOs.",
        slides: [
          {
            title: "Selling to Finance & Operations Executives",
            subtitle: "Pitching tangible cost reduction and error elimination to decision makers",
            bulletPoints: [
              "The CFO Pitch: Eliminating 15 hours of manual data entry per week and stopping duplicate invoices.",
              "Offer Framing: The 'Accounts Payable Modernization Sprint' ($3,500 setup + $750/mo retainer).",
              "Security Reassurance: Client owns all API credentials; no proprietary data is stored on external agency servers.",
              "The 5-Invoice Demonstration: Processing 5 of their actual vendor invoices in real-time during your sales call.",
            ],
            takeaway: "CFOs buy when you quantify error prevention and employee hour reallocation.",
          },
        ],
        writtenContent: "Discovery call frameworks for CFOs, sample SOW contracts, and security compliance documentation.",
      },
    ],
  },
  {
    id: "module-06",
    number: "06",
    title: "Commercialization: Packaging, Pricing & Retainers",
    description: "Package, price, sell, and scale your 5-agent catalog into a predictable $10,000+ monthly recurring revenue agency.",
    duration: "47m",
    lessons: [
      {
        id: "06-1",
        number: "6.1",
        title: "The 3-Tier Offer Architecture: Sprints, Systems, and Strategic Retainers",
        duration: "12m",
        summary: "Structure your service offerings into high-converting packages: $1,500 Sprint, $3,500 Custom System, and $1,200/mo Retainer.",
        slides: [
          {
            title: "Three-Tier Pricing & Offer Psychology",
            subtitle: "Structuring packages that maximize upfront cashflow and monthly recurring revenue",
            bulletPoints: [
              "Tier 1 (Sprint - $1,500): Single Agent Deployment (e.g., Inbound Lead Triage) built and launched in 7 days.",
              "Tier 2 (Core System - $3,500): Dual-Agent Operational Hub (Triage + Support or Invoicing) with custom CRM connectors.",
              "Tier 3 (Enterprise Retainer - $1,200/mo): Ongoing optimization, prompt tuning, new tool integrations, and priority SLA.",
              "Never sell raw hours: Always sell finished operational assets with clear business metrics.",
            ],
            takeaway: "Tiered pricing anchors buyers to the core system while creating a seamless retainer upgrade path.",
          },
        ],
        writtenContent: "Offer architecture breakdown, deliverables lists, and contract boundary definitions.",
      },
      {
        id: "06-2",
        number: "6.2",
        title: "Landing Your First 3 Agent Clients: The Personalized Interactive Demo",
        duration: "12m",
        summary: "Master client acquisition using 3-minute video audits and interactive sandbox demos that prove value before the call.",
        slides: [
          {
            title: "The Frictionless Acquisition Engine",
            subtitle: "Booking qualified discovery calls without cold pitching or spamming",
            bulletPoints: [
              "The 3-Minute Video Audit: Submitting a sample inquiry on the prospect's website and recording how the agent processes it.",
              "Targeting Established Businesses: Sourcing companies with $50K+ monthly overhead that feel the pain of manual delays.",
              "Low-Friction Call-to-Action: 'Mind if I send over the 2-minute video showing the automated proposal draft?'",
              "Closing on the First Call: Demonstrating live tool execution in under 10 minutes.",
            ],
            takeaway: "Show, don't tell: A personalized demo on the prospect's brand is 10x more effective than a generic deck.",
          },
        ],
        writtenContent: "Outreach templates, Loom video scripts, prospect qualification criteria, and follow-up cadence.",
      },
      {
        id: "06-3",
        number: "6.3",
        title: "Client Onboarding & Delivering Production-Safe Deployments",
        duration: "12m",
        summary: "Execute a smooth 7-day client onboarding process that builds client confidence and establishes long-term retainers.",
        slides: [
          {
            title: "The 7-Day Client Onboarding Sequence",
            subtitle: "Systematic delivery that prevents scope creep and solidifies ongoing retainers",
            bulletPoints: [
              "Day 1: Kickoff questionnaire and client account provisioning (OpenAI, Anthropic, Make.com).",
              "Day 2-3: Staging environment build and tool schema configuration.",
              "Day 4: Sandbox simulation testing with client historical data.",
              "Day 5: Staff walk-through and human-in-the-loop approval interface training.",
              "Day 6-7: Production cutover, live monitoring, and kickoff of monthly retainer maintenance.",
            ],
            takeaway: "Disciplined onboarding establishes authority and prevents client anxiety.",
          },
        ],
        writtenContent: "Onboarding checklists, account provisioning guides, and staff training SOP templates.",
      },
      {
        id: "06-4",
        number: "6.4",
        title: "Scaling to $10,000+ MRR: Account Expansion & The 90-Day Roadmap",
        duration: "11m",
        summary: "Build an agency servicing 8 to 10 retainer clients in under 20 hours a week with 85%+ net profit margins.",
        slides: [
          {
            title: "Scaling to $10,000/Month Recurring",
            subtitle: "The mathematical roadmap to a solo high-margin automation practice",
            bulletPoints: [
              "The Retention Equation: 8 clients on an average $1,250/mo retainer = $10,000/month recurring income.",
              "Account Expansion: Deploying Agent #2 and Agent #3 to existing satisfied clients for additional setup fees.",
              "Automating Agency Operations: Using your own internal agents to manage client check-ins and monthly reporting.",
              "The 90-Day Execution Calendar: Sprints, outreach quotas, and milestone checkpoints to hit 5-figure MRR.",
            ],
            takeaway: "Retainer stability and high client retention create true entrepreneurial leverage.",
          },
        ],
        writtenContent: "90-day execution calendar, financial planning spreadsheets, and retainer expansion playbooks.",
      },
    ],
  },
];

const detailModules: PlaybookDetailModule[] = modulesMetadata.map((m) => ({
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

export const AGENT_SOLUTIONS_DETAIL_DATA: PlaybookDetailData = {
  id: AGENT_SOLUTIONS_ID,
  slug: AGENT_SOLUTIONS_SLUG,
  title: "5 AI Agents You Can Build and Sell Without Training Your Own Model",
  headline:
    "Master the architectural blueprints, tool-calling schemas, and commercial playbooks to build and sell 5 high-demand autonomous AI agents to B2B clients.",
  description:
    "A practical, implementation-focused masterclass teaching you how to architect, assemble, and monetize five distinct commercial AI agents using Claude 3.7, GPT-4o, Make.com, and Airtable. Learn how to qualify leads, extract market intelligence, automate customer support, process invoices, and package recurring B2B agency retainers without training custom machine learning models.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "High Demand",
  rating: 4.9,
  ratingCount: 286,
  studentsCount: "1,240",
  instructorName: "Plugd Agent Systems Team",
  instructorTitle: "Autonomous Systems Architects & B2B Consultants",
  instructorBio:
    "The Plugd Agent Systems Team advises high-growth startups and agency founders on deploying production-safe autonomous agent workflows, tool orchestration, and high-retention enterprise retainers.",
  instructorRating: 4.9,
  instructorReviews: "286",
  instructorStudents: "1,240",
  instructorCourses: 3,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "5.5 hours",
  modulesCount: 6,
  lessonsCount: 24,
  whatYouWillLearn: [
    "Understand the exact 4-part architecture that distinguishes true autonomous agents from basic prompts",
    "Master Tool-Calling (Function Calling) schemas to allow LLMs to query APIs, databases, and external platforms",
    "Build Agent #1: Inbound Lead Qualification & Auto-Proposal Generator with instant 90-second speed-to-lead",
    "Build Agent #2: Executive Market Intelligence & Competitor Tracking Agent with 200K context document synthesis",
    "Build Agent #3: Multi-Channel Customer Support & Escalation Agent with safe live database order lookups",
    "Build Agent #4 & #5: Multimodal Document Extraction & Three-Way Invoice Reconciliation Agents for finance teams",
    "Deploy bulletproof security guardrails, token budget limits, and human-in-the-loop approval interfaces",
    "Package three-tier B2B offers ($1,500 Sprint, $3,500 System, $1,200/mo Retainer) with strict boundary SOWs",
    "Land paying clients using 3-minute personalized Loom video audits and live prototype demonstrations",
    "Scale to $10,000+ monthly recurring revenue managing 8 retainers in under 20 hours a week",
  ],
  relatedTopics: [
    "AI Agents",
    "Function Calling & APIs",
    "Make.com Automation",
    "Claude 3.7 & GPT-4o",
    "B2B Agency Retainers",
    "Enterprise Automation",
  ],
  requirements: [
    "No computer science degree, custom model training, or prior software engineering experience required",
    "A computer with an internet browser and free accounts on OpenAI or Anthropic Console",
    "A free or trial account on Make.com and Airtable for visual workflow assembly",
  ],
  descriptionSections: {
    intro: [
      "Most agency founders make the mistake of pitching generic AI chatbots or trying to build complex custom models from scratch. Enterprise clients don't want research experiments—they want reliable software systems that solve expensive operational bottlenecks.",
      "An autonomous AI agent combines the cognitive reasoning of frontier models (Claude 3.7, GPT-4o) with deterministic tool execution, live database lookups, and human-in-the-loop guardrails. When deployed correctly, these systems eliminate 80%+ of repetitive office work.",
      "This Playbook delivers the complete, production-ready blueprints for 5 high-ticket agents that businesses actively pay $2,500 to $5,000 to implement, plus recurring monthly retainers to maintain.",
    ],
    keyPointsTitle: "Comprehensive 6-Module Curriculum Overview",
    keyPoints: [
      "Module 1 (Foundations): The 4-part agent architecture, JSON tool schemas, state memory, and guardrails",
      "Module 2 (Agent #1): Inbound Lead Triage, CRM enrichment, dynamic proposal generation, and booking loops",
      "Module 3 (Agent #2): Autonomous market intelligence, competitor web scraping, and executive Slack digests",
      "Module 4 (Agent #3): Tier-1 customer support, live account database lookups, and supervisor escalation",
      "Module 5 (Agents #4 & #5): Multimodal invoice extraction, 3-way PO matching, and contract risk intelligence",
      "Module 6 (Commercialization): 3-tier offer packaging, client acquisition via video audits, and scaling to $10K MRR",
    ],
    closing: [
      "Every lesson includes interactive executive slide presentations, architecture diagrams, step-by-step implementation walkthroughs, and copy-paste JSON schemas.",
      "Whether you are an established consultant expanding into AI automation or an ambitious operator launching a specialized agency, this Playbook provides the exact roadmap to deliver enterprise value.",
    ],
  },
  targetAudience: [
    "Freelancers, developers, and consultants ready to sell high-ticket AI implementation services",
    "No-code operators looking to graduate from basic Zapier automations to high-value autonomous agent systems",
    "Agency founders seeking predictable $1,000–$2,000 monthly client retainers with 85%+ profit margins",
  ],
  includes: [
    { iconName: "layers", text: "6 Comprehensive Modules & 24 Structured Lessons" },
    { iconName: "file-text", text: "Interactive Slide Presentations & Full Written Guides" },
    { iconName: "video", text: "Complete JSON Tool Schemas, Prompt Templates & SOW Contracts" },
    { iconName: "smartphone", text: "Optimized for Mobile, Tablet & Desktop Learning" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & Future Curriculum Updates" },
    { iconName: "shield-check", text: "100% Free Access During The Content Review Phase" },
  ],
  modules: detailModules,
  testimonials: [
    {
      name: "David Chen",
      role: "Managing Director, Synthetix Operations",
      rating: 5,
      quote:
        "The Inbound Proposal Agent blueprint paid for the entire course in 48 hours. Deployed it for a boutique consulting client for a $3,500 setup fee and they immediately added a $900/month monitoring retainer.",
      initials: "DC",
      date: "October 2026",
    },
    {
      name: "Sarah Lindqvist",
      role: "B2B Automation Consultant",
      rating: 5,
      quote:
        "The section on JSON tool definitions and safe read-only API connections completely demystified function calling. You don't need to write custom code to deliver serious value.",
      initials: "SL",
      date: "October 2026",
    },
  ],
  faqs: [
    {
      question: "Do I need to train my own machine learning models to build these agents?",
      answer:
        "No. You utilize existing commercial foundation models (Claude 3.7 Sonnet, GPT-4o) via API. The proprietary value lies in your prompt guardrails, JSON tool calling schemas, and integration with the client's business databases.",
    },
    {
      question: "What tools and software are required?",
      answer:
        "You will use Anthropic Console / OpenAI for cognitive reasoning, Make.com or n8n for visual orchestration, and Airtable for relational state storage and client approval dashboards.",
    },
    {
      question: "Can I sell these agents to non-technical small and mid-market businesses?",
      answer:
        "Yes. In fact, mid-market businesses with $50K+ monthly payroll are the ideal target because they suffer the most from manual data entry, missed inquiries, and slow response times.",
    },
  ],
};

const courseModules: Module[] = modulesMetadata.map((m) => {
  const lessons: Lesson[] = m.lessons.map((l) => ({
    id: l.id,
    number: l.number,
    title: l.title,
    duration: l.duration,
    summary: l.summary,
    slides: l.slides.map((s, idx) => ({
      id: `s-${m.number}-${l.id}-${idx + 1}`,
      order: idx + 1,
      type: "FRAMEWORK" as const,
      headline: s.title,
      subheadline: s.subtitle,
      title: s.title,
      subtitle: s.subtitle,
      bulletPoints: s.bulletPoints,
      takeaway: s.takeaway,
    })),
    writtenContent: l.writtenContent,
    takeaways: l.slides.map((s) => s.takeaway).filter(Boolean) as string[],
    actionItems: [
      `Review the architecture diagram and system rules for ${l.title}`,
      `Configure the required API tool schema in your development environment`,
      `Execute 3 test runs with sample data to verify output determinism`,
    ],
  }));

  return {
    id: m.id,
    number: m.number,
    title: m.title,
    subtitle: `Module ${m.number} · ${lessons.length} Lessons`,
    description: m.description,
    duration: m.duration,
    lessonsCount: lessons.length,
    lessons,
  };
});

export const AGENT_SOLUTIONS_COURSE: Course = {
  id: AGENT_SOLUTIONS_ID,
  slug: AGENT_SOLUTIONS_SLUG,
  categorySlug: "ai-businesses",
  categoryName: "AI Businesses",
  title: "5 AI Agents You Can Build and Sell Without Training Your Own Model",
  shortTitle: "5 AI Agents to Build & Sell",
  audience: "Agency Founders, Freelancers & Automation Specialists",
  targetGender: "for-all",
  headline:
    "Master the architectural blueprints, tool-calling schemas, and commercial playbooks to build and sell 5 high-demand autonomous AI agents to B2B clients.",
  subheadline:
    "A practical, implementation-focused masterclass teaching you how to architect, assemble, and monetize five distinct commercial AI agents using Claude 3.7, GPT-4o, Make.com, and Airtable.",
  description:
    "A comprehensive curriculum detailing how to build, package, and sell autonomous agent solutions to commercial clients without writing complex neural network code.",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  badge: "High Demand",
  rating: 4.9,
  ratingCount: 286,
  hoursOfMaterial: "5.5 hours",
  modulesCount: 6,
  lessonsCount: 24,
  primaryColor: "#8b5cf6",
  accentColor: "#f59e0b",
  outcomes: [
    "Architect and deploy 5 complete commercial autonomous AI agents",
    "Master deterministic tool-calling schemas and multi-step reasoning loops",
    "Deploy human-in-the-loop safeguards and token budget guardrails",
    "Package services into $1,500 to $3,500 sprints and $1,200/mo retainers",
  ],
  modules: courseModules,
  testimonials: [
    {
      name: "David Chen",
      role: "Managing Director, Synthetix Operations",
      quote:
        "The Inbound Proposal Agent blueprint paid for the entire course in 48 hours. Deployed it for a boutique consulting client for a $3,500 setup fee and they immediately added a $900/month monitoring retainer.",
      handle: "@david_chen",
    },
  ],
};

export const DETAIL_AGENT_SOLUTIONS_DATA = AGENT_SOLUTIONS_DETAIL_DATA;
