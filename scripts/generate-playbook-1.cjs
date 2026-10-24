const courseTitle = "7 AI Automation Tools That Could Make You $10,000+";
const courseId = "ai-businesses-01";
const courseSlug = "7-ai-automations";

const modulesData = [
  {
    num: 1,
    id: "module-01",
    title: "The Automation Business Model & The $10,000 Milestone",
    description: "Understand the commercial automation landscape, the unit economics of reaching $10,000/month, and the core ingredients of high-margin client workflows.",
    duration: "55m",
    lessons: [
      {
        lesNum: 1,
        title: "The $10,000/Month Business Blueprint: The Math of Retainers vs Sprints",
        duration: "14m",
        summary: "Deconstruct the exact mathematical pathways to achieving $10,000/month through value-anchored setup fees and recurring maintenance retainers.",
        bulletPoints: [
          "The Trap of Hourly Freelancing: Why charging $50/hour locks operators in a low-margin ceiling that caps revenue at $4,000/mo.",
          "The Sprint-to-Retainer Hybrid: Closing $2,500 implementation sprints that systematically convert into $750/month ongoing maintenance agreements.",
          "The 4x$2,500 vs 10x$1,000 Retainer Models: Mathematical comparison of client capacity, support load, and churn dynamics.",
          "Net Margin Economics: Achieving 88%+ gross margins with client-funded API pass-through accounts and standardized tool stacks.",
        ],
        takeaway: "Never sell one-time builds without an attached maintenance contract; recurring retainers are the foundation of a predictable $10K business.",
        workedCalculations: {
          scenario: "An independent automation operator targeting $10,000/month net profit within 90 days compares two client acquisition and pricing models.",
          mathTableOrBreakdown: `| Business Model | Setup Price | Monthly Retainer | Clients Needed for $10K/mo | Weekly Hours Required | Gross Profit Margin |
|---|---|---|---|---|---|
| **Commodity Hourly Billing** | $0 | $45/hr (capped) | 6-8 clients (~220 hrs/mo) | 55+ hrs/week | 62% (high unpaid admin) |
| **One-Off Implementation Sprints** | $2,500 | $0 | 4 new clients every month | 35 hrs/week | 82% (sales treadmill risk) |
| **Hybrid Sprint + Retainer (Target)** | $2,500 (one-time) | $850/mo | **2 Sprints + 6 Retainers** | **22 hrs/week** | **91% (predictable cash flow)** |`,
          roiFormula: `$$\\text{Monthly Revenue} = (2 \\text{ Sprints} \\times \\$2,500) + (6 \\text{ Retainers} \\times \\$850) = \\$5,000 + \\$5,100 = \\$10,100/\\text{month}$$
With infrastructure overhead of approximately $180/month (Make Pro + Airtable Team + hosting), net operating margin is **98.2%** on recurring cash flow.`,
        },
        codeOrSchema: `{
  "business_model": "sprint_retainer_hybrid",
  "monthly_target_usd": 10000,
  "revenue_streams": {
    "implementation_sprints": {
      "target_units": 2,
      "unit_price_usd": 2500,
      "total_usd": 5000
    },
    "monthly_retainers": {
      "target_units": 6,
      "unit_price_usd": 850,
      "total_usd": 5100
    }
  },
  "operating_expenses_usd": 180,
  "projected_net_margin_percent": 98.2
}`,
      },
      {
        lesNum: 2,
        title: "The 3 Core Ingredients of Enterprise Automation (Trigger, Action, Logic)",
        duration: "14m",
        summary: "Master the foundational anatomy of production workflows: event listeners, computational reasoning, and destination dispatchers.",
        bulletPoints: [
          "Event Triggers (Instant vs Polling): Understanding webhook push latency (<500ms) versus scheduled database polling intervals.",
          "Cognitive Transformation Layer: Normalizing unstructured JSON payloads, calling LLM prompts, and filtering routing conditions.",
          "Deterministic Dispatch: Executing idempotent API POST/PATCH requests to CRMs, payment processors, and communication channels.",
          "State Persistence & Idempotency: Preventing duplicate transactions using UUID transaction keys and database lock tables.",
        ],
        takeaway: "Every reliable automation decouples event ingestion, cognitive transformation, and deterministic dispatching.",
      },
      {
        lesNum: 3,
        title: "Selecting High-Margin Commercial Bottlenecks to Automate",
        duration: "13m",
        summary: "Identify the 4 operational bottlenecks that mid-market businesses eagerly pay $3,000+ to eliminate immediately.",
        bulletPoints: [
          "Inbound Speed-to-Lead Gaps: Responding to inquiries in under 90 seconds before high-intent buyers bounce to competitors.",
          "Document & Invoice Reconciliation: Eliminating manual line-item entry between supplier PDFs and accounting databases.",
          "Customer Service Triage: Automatically categorizing, drafting, and escalating support tickets without full-time staff overhead.",
          "Cross-Platform Data Synchronization: Keeping CRM, inventory, and fulfillment databases perfectly in sync without CSV exports.",
        ],
        takeaway: "Target painful operational bottlenecks where eliminating manual work directly generates or protects top-line revenue.",
      },
      {
        lesNum: 4,
        title: "Client Technical Scoping & The 1-Page Feasibility Audit",
        duration: "14m",
        summary: "Conduct technical discovery to verify API capabilities, avoid unworkable legacy systems, and construct an airtight scope of work.",
        bulletPoints: [
          "API Verification Protocol: Inspecting target software documentation for REST/GraphQL endpoints, webhook support, and rate limits.",
          "The Red-Flag Filter: Identifying legacy proprietary software that lacks open APIs before promising automated delivery.",
          "The 1-Page Feasibility Audit: Documenting data sources, required endpoints, authentication methods, and estimated execution costs.",
          "Scope Boundaries: Defining exactly what is included in the sprint to prevent client feature creep and delivery delays.",
        ],
        takeaway: "Always audit third-party API capabilities and rate limits before quoting a fixed-price implementation sprint.",
      },
    ],
  },
  {
    num: 2,
    id: "module-02",
    title: "Tool 1 — Make.com Visual Orchestration & Error Routing",
    description: "Master Make.com advanced visual workflow architecture, router filters, data aggregators, and enterprise error-handling directives.",
    duration: "56m",
    lessons: [
      {
        lesNum: 1,
        title: "Architecting Resilient Make.com Scenarios & Custom Webhooks",
        duration: "14m",
        summary: "Build production-grade visual scenarios with custom webhook listeners, IP restrictions, and payload verification.",
        bulletPoints: [
          "Custom Webhook Configuration: Configuring TLS-encrypted listeners with HMAC signature validation and IP allowlisting.",
          "Data Structure Determination: Enforcing strict payload parsing to guarantee clean type inheritance across downstream modules.",
          "Execution Flow Design: Organizing visual scenarios linearly with clear color-coded module labeling and route notes.",
          "Queue Management: Configuring scenario scheduling and parallel execution limits to prevent API concurrency bottlenecks.",
        ],
        takeaway: "Custom webhooks with payload verification guarantee immediate execution without polling delays or data corruption.",
      },
      {
        lesNum: 2,
        title: "Routers, Array Aggregators, & Iterators: Complex Data Transformation",
        duration: "14m",
        summary: "Manipulate nested JSON data structures, split arrays with iterators, and combine collections with array aggregators.",
        bulletPoints: [
          "Router Filtering Logic: Directing data packets through conditional branches based on payload parameters and urgency flags.",
          "The Iterator Module: Deconstructing multi-line invoice items or customer lists into individual processing bundles.",
          "The Array Aggregator: Rebuilding disparate transformed items into a single unified JSON array for bulk database insertion.",
          "Operation Optimization: Structuring scenarios to minimize Make.com operation count consumption and reduce client operational bills.",
        ],
        takeaway: "Mastering Iterators and Aggregators allows you to process complex, multi-line business transactions in a single scenario.",
      },
      {
        lesNum: 3,
        title: "Enterprise Error Directives: Resume, Break, Rollback, and Commit",
        duration: "14m",
        summary: "Protect scenarios from catastrophic failures using Make.com error directives that handle API downtimes and invalid inputs automatically.",
        bulletPoints: [
          "The Break Directive: Pausing failed execution bundles and automatically retrying at exponential intervals for transient API outages.",
          "The Resume Directive: Providing fallback default data when a non-critical third-party lookup fails to keep the pipeline moving.",
          "The Ignore Directive: Silently logging known harmless exceptions without triggering scenario deactivation.",
          "The Rollback Directive: Aborting database mutations when a downstream step fails to prevent partial, corrupt state.",
        ],
        takeaway: "An automation without error directives will break within 48 hours; error handling is what makes your service enterprise-grade.",
      },
      {
        lesNum: 4,
        title: "Automated Error Alerting & Dead-Letter Queue Logging",
        duration: "14m",
        summary: "Build an automated telemetry loop that captures failed execution payloads and alerts engineering via Slack/Discord instantly.",
        bulletPoints: [
          "The Error Interceptor Route: Attaching an error handler branch to mission-critical modules that formats the error context.",
          "Slack/Discord Alert Webhook: Dispatching an instant message containing Scenario ID, Error Message, Timestamp, and Payload preview.",
          "Dead-Letter Logging: Storing failed execution payloads in an Airtable table so engineers can replay the transaction with one click.",
          "Weekly Health Audits: Reviewing error logs to optimize prompt edge cases and third-party rate limit thresholds.",
        ],
        takeaway: "Proactive error alerting ensures you fix issues before the client even realizes a transaction experienced a hiccup.",
      },
    ],
  },
  {
    num: 3,
    id: "module-03",
    title: "Tool 2 — n8n Self-Hosted Automation & Data Privacy",
    description: "Deploy and manage self-hosted n8n instances on Railway/Docker, write custom JavaScript nodes, and win enterprise privacy contracts.",
    duration: "55m",
    lessons: [
      {
        lesNum: 1,
        title: "Deploying Self-Hosted n8n on Railway & Docker in 15 Minutes",
        duration: "14m",
        summary: "Provision a private, scalable n8n server on Railway or DigitalOcean with persistent PostgreSQL database storage.",
        bulletPoints: [
          "Cloud vs Self-Hosted n8n: Why self-hosting offers unlimited workflow executions for $5–$15/month server cost.",
          "One-Click Railway Deployment: Setting up n8n with dedicated PostgreSQL volume, custom subdomains, and automatic SSL encryption.",
          "Environment Variables & Security: Configuring `N8N_ENCRYPTION_KEY`, webhook tunnel URLs, and basic authentication passwords.",
          "Backup & Recovery SOP: Automating daily database dumps to AWS S3 to ensure zero disaster data loss.",
        ],
        takeaway: "Self-hosted n8n provides unlimited execution volume and complete data sovereignty for under $15/month.",
      },
      {
        lesNum: 2,
        title: "Writing Custom JavaScript/Python Code Nodes in n8n",
        duration: "14m",
        summary: "Harness the power of the Code Node to perform complex data manipulation, regex matching, and cryptographic hashing.",
        bulletPoints: [
          "The Code Node Superpower: Executing vanilla JavaScript or Python directly within the workflow without external microservices.",
          "Data Structure in n8n: Understanding the `[{ json: { ... } }]` object model and iterating over multiple incoming items.",
          "Regex & Text Parsing: Cleaning phone numbers, extracting tracking numbers, and parsing messy HTML email bodies.",
          "Cryptographic Hashing: Generating HMAC-SHA256 signatures to authenticate outbound requests to enterprise APIs.",
        ],
        takeaway: "The Code Node eliminates the need for expensive third-party SaaS add-ons by providing direct compute in your workflow.",
      },
      {
        lesNum: 3,
        title: "The Enterprise Privacy Pitch: HIPAA, GDPR & On-Premise Execution",
        duration: "14m",
        summary: "Win high-ticket contracts with healthcare, legal, and financial firms by offering zero-third-party-data-leakage automation.",
        bulletPoints: [
          "The Enterprise Compliance Dilemma: Why regulated industries cannot send customer data through public US cloud automation tools.",
          "The Local Execution Advantage: Proving that data never leaves the client's private VPC or dedicated regional server.",
          "Positioning the Enterprise Offer: Charging $5,000+ setup fees for 'Private Enclave Automation Systems'.",
          "Compliance Documentation: Providing clients with a clean architecture diagram proving HIPAA and GDPR data residency compliance.",
        ],
        takeaway: "Self-hosted privacy compliance unlocks $5,000+ enterprise deals that public SaaS automations are legally barred from touching.",
      },
      {
        lesNum: 4,
        title: "Hybrid Workflows: Bridging n8n and Make.com for Optimal Cost",
        duration: "13m",
        summary: "Design an optimized hybrid architecture that uses Make.com for quick SaaS integrations and n8n for high-volume batch data processing.",
        bulletPoints: [
          "The Economics of Hybrid Design: Using Make.com for fast visual prototyping and n8n for heavy operations (100K+ runs).",
          "Cross-Platform Webhook Handshakes: Passing data seamlessly between Make.com scenarios and n8n workflows via authenticated webhooks.",
          "Cost Modeling: Keeping client software bills under $50/month even when processing millions of data points monthly.",
          "Client Account Architecture: Managing client instances without exposing master agency infrastructure credentials.",
        ],
        takeaway: "Combining Make.com's integration speed with n8n's unlimited compute yields maximum operational efficiency and profit margin.",
      },
    ],
  },
  {
    num: 4,
    id: "module-04",
    title: "Tools 3 & 4 — OpenAI Assistants API & Claude 3.7 Tool Calling",
    description: "Build intelligent cognitive agents that query databases, extract structured information from messy inputs, and execute business tools.",
    duration: "56m",
    lessons: [
      {
        lesNum: 1,
        title: "Claude 3.7 vs OpenAI Assistants: Selecting the Cognitive Engine",
        duration: "14m",
        summary: "Evaluate frontier models across reasoning capability, tool-calling precision, document vision parsing, and token economics.",
        bulletPoints: [
          "Model Benchmark Analysis: When Claude 3.7 Sonnet outperforms GPT-4o in complex multimodal reasoning and nuanced document parsing.",
          "The Assistants API Architecture: Managing stateful conversation threads, file search vector stores, and automated code interpreters.",
          "Native Tool Calling (Function Calling): Giving models the capability to inspect databases, trigger webhooks, and request human input.",
          "Token Budgeting: Optimizing prompt system instructions and using prompt caching to achieve 80%+ reductions in API overhead.",
        ],
        takeaway: "Match the cognitive model to the task complexity: Claude 3.7 for extraction and reasoning; GPT-4o-mini for rapid classification.",
      },
      {
        lesNum: 2,
        title: "Engineering Deterministic JSON Schemas with Strict Boundary Controls",
        duration: "14m",
        summary: "Force LLMs to return strict, parseable JSON conforming to Zod/JSON schemas with zero conversational filler or markdown formatting.",
        bulletPoints: [
          "The Problem of Hallucinated Syntax: Eliminating unescaped quotes, trailing commas, and unexpected markdown wrapping (```json).",
          "Authoring the Schema: Defining mandatory properties, strict typing, enum lists, and regex validation patterns.",
          "Native Structured Outputs: Utilizing `response_format: { type: 'json_schema', strict: true }` in OpenAI and Claude API endpoints.",
          "Defensive Parsing: Validating model outputs through runtime schema validators with automatic self-correcting retry prompts.",
        ],
        takeaway: "Strict schema enforcement turns conversational AI into a deterministic software component that never breaks downstream code.",
      },
      {
        lesNum: 3,
        title: "Building Grounded Knowledge RAG with OpenAI File Search",
        duration: "14m",
        summary: "Ingest company policy manuals, product catalogs, and standard operating procedures into vector databases for zero-hallucination queries.",
        bulletPoints: [
          "Vector Store Management: Uploading client PDF manuals, pricing sheets, and contracts to OpenAI Vector Stores.",
          "Chunking Strategies: Configuring chunk overlap and semantic boundaries to maximize retrieval relevance.",
          "Grounded Synthesis: Instructing the Assistant to cite exact source file sections and explicitly refuse out-of-bounds questions.",
          "Testing Retrieval Precision: Auditing edge cases with 20 tricky test questions to verify zero hallucinated facts.",
        ],
        takeaway: "Grounded RAG guarantees the AI Assistant quotes verified company facts rather than inventing inaccurate policies.",
      },
      {
        lesNum: 4,
        title: "Tool Execution Loops: Allowing LLMs to Query External APIs Live",
        duration: "14m",
        summary: "Build closed-loop reasoning systems where the model queries a live CRM database, evaluates results, and takes action autonomously.",
        bulletPoints: [
          "The Function Calling Cycle: User Prompt -> Model requests tool call -> Orchestrator executes tool -> Model synthesizes response.",
          "Defining Tool Schemas: Writing clear, unambiguous parameter descriptions that teach the LLM exactly when to trigger the tool.",
          "Human-in-the-Loop Safeguards: Requiring manual operator confirmation before executing irreversible tools (e.g. sending a refund).",
          "Latency Optimization: Minimizing tool-calling roundtrips to deliver end-user responses in under 2 seconds.",
        ],
        takeaway: "Tool calling bridges the gap between static text generation and autonomous, real-world operational execution.",
      },
    ],
  },
  {
    num: 5,
    id: "module-05",
    title: "Tool 5 — Airtable Relational Databases & Softr Portals",
    description: "Model scalable relational database schemas in Airtable, automate state transitions, and deploy branded client portals in Softr without code.",
    duration: "55m",
    lessons: [
      {
        lesNum: 1,
        title: "Relational Database Modeling: Linked Records, Lookup Fields & Rollups",
        duration: "14m",
        summary: "Structure clean, normalized database schemas with linked record relationships, lookup fields, and conditional rollup calculations.",
        bulletPoints: [
          "The Flat Spreadsheet Trap: Why Google Sheets fails for multi-entity business operations and causes data duplication.",
          "The 4 Core Tables: Structuring `Companies`, `Contacts`, `Transactions/Orders`, and `Operational Logs` with linked keys.",
          "Rollups & Formulas: Calculating customer lifetime value, open invoice balances, and SLA turnaround times automatically.",
          "Database Indexing & Views: Designing filtered views (`Pending Review`, `Ready for Dispatch`, `Archived`) to drive automations.",
        ],
        takeaway: "A normalized relational database schema in Airtable serves as the single source of truth for all automated operations.",
      },
      {
        lesNum: 2,
        title: "Airtable Native Automations & Webhook Trigger Bridges",
        duration: "14m",
        summary: "Configure high-speed native Airtable automations and connect them to external orchestrators via authenticated webhooks.",
        bulletPoints: [
          "Native Trigger Types: Utilizing 'When record matches conditions' to trigger instant status updates without third-party fees.",
          "Automated Scripting Action: Writing lightweight JavaScript snippets inside Airtable to format data before sending.",
          "Outbound Webhooks: Sending payload data to Make.com or n8n the millisecond a record enters an operational queue.",
          "Preventing Infinite Automation Loops: Using automation lock flags and status timestamps to prevent recursive firing.",
        ],
        takeaway: "Native Airtable triggers paired with external webhooks provide an ultra-responsive, cost-effective automation backbone.",
      },
      {
        lesNum: 3,
        title: "Publishing Custom Client Portals with Softr in 60 Minutes",
        duration: "14m",
        summary: "Build branded, interactive web portals where clients can view live reports, approve invoices, and submit requests without Airtable access.",
        bulletPoints: [
          "Why Clients Need a Portal: Protecting raw Airtable bases from accidental deletion while providing an executive-level interface.",
          "Softr Block Architecture: Connecting dynamic list blocks, detail pages, and submission forms directly to Airtable tables.",
          "User Authentication & Role Permissions: Restricting data views so Client A only sees their own records while managers see all data.",
          "Custom Branding & Domains: Mapping client custom subdomains (`portal.clientcompany.com`) with clean SSL certificates.",
        ],
        takeaway: "Softr transforms raw backend databases into polished, client-facing software products that command $3,000+ setup fees.",
      },
      {
        lesNum: 4,
        title: "Airtable Interfaces vs Softr: Selecting the Right Front-End",
        duration: "13m",
        summary: "Compare Airtable Interfaces with Softr web portals to choose the right front-end based on user permissions, cost, and security.",
        bulletPoints: [
          "Airtable Interfaces: Best for internal team operations, field staff, and administrative dashboards with direct record editing.",
          "Softr Portals: Best for external B2B clients, customer self-service portals, and public membership hubs.",
          "Licensing Economics: Avoiding Airtable per-seat licensing fees by routing external clients through Softr's flat pricing tier.",
          "Mobile Optimization: Ensuring dashboard views render cleanly on tablets and mobile phones for field technicians.",
        ],
        takeaway: "Use Airtable Interfaces for internal staff operations and Softr for external client-facing portals to optimize costs.",
      },
    ],
  },
  {
    num: 6,
    id: "module-06",
    title: "Tools 6 & 7 — Multimodal Prospecting & Speed-to-Lead Telephony",
    description: "Deploy personalized video/audio outreach with ElevenLabs & HeyGen, and build instant 15-second telephony lead response systems with Twilio.",
    duration: "56m",
    lessons: [
      {
        lesNum: 1,
        title: "ElevenLabs & HeyGen: Automated Personalized Video Prospecting",
        duration: "14m",
        summary: "Build an automated pipeline that generates personalized audio and dynamic video outreach assets for high-value B2B accounts.",
        bulletPoints: [
          "The Attention Economy in B2B: Why generic text emails get 2% reply rates while personalized video assets achieve 35%+ engagement.",
          "ElevenLabs API Voice Synthesis: Generating hyper-realistic voice audio dynamically referencing prospect names and company challenges.",
          "HeyGen Dynamic Video Rendering: Injecting prospect website screenshots and personalized voice tracks into video templates automatically.",
          "Batch Dispatch & Tracking: Automating video generation from a CSV or CRM list and tracking video completion telemetry.",
        ],
        takeaway: "Personalized synthetic video prospecting cuts through executive inbox noise and generates massive outbound response rates.",
      },
      {
        lesNum: 2,
        title: "Perplexity & DeepSeek: Autonomous Market Intelligence Systems",
        duration: "14m",
        summary: "Build automated research bots that scrape live web data, track competitor pricing, and compile executive intelligence briefs.",
        bulletPoints: [
          "Live Web Grounding: Using Perplexity API and DeepSeek to query real-time search results without stale training cutoffs.",
          "Competitor Monitoring Workflows: Automatically scraping competitor websites weekly to detect price changes, promotions, and new features.",
          "The Monday Executive Brief: Synthesizing industry news and competitor moves into a 3-bullet email delivered to the client every Monday.",
          "Commercial Packaging: Selling ongoing Market Intelligence feeds as a $950/month automated retainer service.",
        ],
        takeaway: "Autonomous research engines provide high-perceived-value intelligence that executives gladly pay monthly retainers to receive.",
      },
      {
        lesNum: 3,
        title: "Twilio Telephony: The 15-Second Missed-Call AI Text-Back Engine",
        duration: "14m",
        summary: "Build an automated telephony system that intercepts missed business phone calls and texts callers within 15 seconds.",
        bulletPoints: [
          "The Revenue Bleed: 62% of calls to local service businesses go unanswered, and 85% of callers immediately dial a competitor.",
          "The 15-Second Rule: Intercepting call status webhooks (`no-answer`, `busy`) and dispatching an instant, friendly text back.",
          "A2P 10DLC Carrier Compliance: Registering brand and campaign profiles with Twilio to ensure 100% SMS carrier deliverability.",
          "Conversational Intake: Guiding the caller to provide their name, address, and project urgency via SMS while the lead is hot.",
        ],
        takeaway: "The Missed-Call Text-Back engine stops immediate revenue leakage and is the easiest $1,500 service to sell to local businesses.",
      },
      {
        lesNum: 4,
        title: "WhatsApp Business API & Conversational Lead Qualification",
        duration: "14m",
        summary: "Deploy interactive WhatsApp bots that qualify global prospects, share catalog PDFs, and book calendar appointments in-chat.",
        bulletPoints: [
          "The Global WhatsApp Dominance: Why international clients in Europe, Latin America, and Asia prefer WhatsApp over email.",
          "Cloud API Setup: Configuring Meta Business Manager, phone number verification, and webhook subscriptions.",
          "Interactive Message Templates: Utilizing quick-reply buttons and list pickers to create a frictionless mobile customer journey.",
          "Calendar Synchronization: Passing available appointment slots directly into the WhatsApp chat and creating the booking in Google Calendar.",
        ],
        takeaway: "WhatsApp conversational automation captures international and mobile-first buyers with 90%+ open rates.",
      },
    ],
  },
  {
    num: 7,
    id: "module-07",
    title: "Commercial Packaging, Loom Audits & Retainer Retaining",
    description: "Package the 7 tools into 3 high-margin service offers, close clients using the 5-minute Loom teardown, and build an enduring $10K/mo agency.",
    duration: "55m",
    lessons: [
      {
        lesNum: 1,
        title: "The 3 High-Margin Offer Blueprints ($2,500–$4,500 Sprints)",
        duration: "14m",
        summary: "Package your technical skills into three defined, productized transformation offers with fixed scope and rapid delivery.",
        bulletPoints: [
          "Offer 1: The 24/7 Inbound Speed-to-Lead Engine ($2,500) — Missed-call text-back + instant quoter + CRM lead sync.",
          "Offer 2: The Accounts Payable Invoice Auditor ($3,500) — Multimodal invoice extraction + PO matching + QuickBooks sync.",
          "Offer 3: The Operational Command Hub ($4,500) — Airtable relational core + Softr client portal + Make.com orchestrations.",
          "Eliminating Hourly Quotes: Why fixed-scope productized offers protect your profit margins and establish professional authority.",
        ],
        takeaway: "Package specific operational transformations rather than open-ended consulting to command premium fees and avoid scope creep.",
      },
      {
        lesNum: 2,
        title: "The 5-Minute 'Trojan Horse' Loom Video Audit Strategy",
        duration: "14m",
        summary: "Record personalized, high-converting video audits that diagnose bottlenecks and demonstrate working solutions before pitching.",
        bulletPoints: [
          "The Video Audit Formula: 0:00 Compliment their business; 1:00 Expose the operational leak; 2:30 Demonstrate the live prototype; 4:00 Soft call to action.",
          "Building the Live Demo in 15 Minutes: Using pre-built templates to showcase their logo and sample data on a working system.",
          "Outreach Delivery Channels: Combining short, conversational cold emails with LinkedIn direct messages linking to the private Loom.",
          "Conversion Metrics: Achieving 30%+ response rates and converting 50% of booked discovery calls into signed sprint contracts.",
        ],
        takeaway: "Demonstrating a live prototype tailored to the client's business makes saying no practically impossible.",
      },
      {
        lesNum: 3,
        title: "The Ironclad SOW Contract & 50% Upfront Payment Structure",
        duration: "14m",
        summary: "Protect your agency with professional Statements of Work (SOWs) that define boundaries, deliverables, and payment milestones.",
        bulletPoints: [
          "The 4 Mandatory Clauses: Scope Boundaries, Client Asset Delivery Timeline, Intellectual Property Licensing, and API Cost Pass-Through.",
          "The 50/50 Payment Schedule: Collecting 50% deposit upon contract signature and 50% upon milestone acceptance before master handoff.",
          "The 'No Hold-Up' Clause: Ensuring final payment triggers if the client delays providing assets for more than 7 days.",
          "DocuSign & Stripe Billing: Automating contract execution and credit card invoice clearance on a single onboarding call.",
        ],
        takeaway: "Never configure a single workflow before the 50% deposit is deposited in your business bank account.",
      },
      {
        lesNum: 4,
        title: "The Retainer Retaining Engine: Scaling to $10,000/Month Solo",
        duration: "13m",
        summary: "Convert sprint clients into sticky $750–$1,250/month maintenance retainers using the automated weekly executive performance snapshot.",
        bulletPoints: [
          "The Retainer Retention Secret: Why automated systems that run smoothly get canceled if clients forget you maintain them.",
          "The Friday Executive Snapshot: An automated email sent every Friday at 4:00 PM proving labor hours saved and transactions processed.",
          "The Retainer Retaining Math: Managing 10 clients at $850/mo = $8,500/mo MRR with under 12 hours of total weekly maintenance.",
          "Solo Founder Graduation: Achieving financial independence and operational freedom as a certified B2B automation systems architect.",
        ],
        takeaway: "Automated weekly performance reports make your monthly retainer impossible to cancel and ensure lasting client retention.",
      },
    ],
  },
];

module.exports = {
  courseTitle,
  courseId,
  courseSlug,
  modulesData,
};
