const fs = require('fs');
const path = require('path');
const { createLesson } = require('./curriculum-builder-helper.cjs');

const courseTitle = "5 AI Agents You Can Build and Sell Without Training Your Own Model";
const courseId = "ai-businesses-03";
const courseSlug = "5-ai-agents-you-can-build-and-sell-without-training-your-own-model";

const modulesData = [
  {
    num: 1,
    id: "module-01",
    title: "Agent Architecture Blueprint & Deterministic Guardrails",
    duration: "1h 45m",
    description: "Understand the 4-part agent framework, master JSON tool-calling schemas, and establish state memory and guardrails.",
    lessons: [
      {
        lesNum: 1,
        title: "The 4-Part Autonomous Agent Framework (Sensor, Memory, Brain, Actuator)",
        duration: "15m",
        summary: "Understand the core architectural anatomy that separates true autonomous agents from basic text prompts.",
        bulletPoints: [
          "Sensors (Data Ingestion): Webhooks, email listeners, and database change feeds that awaken the agent.",
          "Memory (State Persistence): Relational storage in Airtable or PostgreSQL tracking conversational and execution state.",
          "Brain (Cognitive Evaluation): Frontier LLM models evaluating inputs, selecting tools, and reasoning across constraints.",
          "Actuators (Deterministic Execution): External API endpoints, webhooks, and database updates executing real-world actions."
        ],
        takeaway: "Agents are not magic; they are software systems combining cognitive evaluation with deterministic API actuators."
      },
      {
        lesNum: 2,
        title: "Designing JSON Tool-Calling Schemas for Frontier Models",
        duration: "15m",
        summary: "Author strict JSON schemas that enable models to execute external API queries without syntax errors.",
        bulletPoints: [
          "Tool Definition Syntax: Defining tool names, human-readable descriptions, and strict property types.",
          "Enforcing Required Parameters: Restricting model flexibility to ensure required API properties are never omitted.",
          "Enum Parameter Constraining: Limiting tool choices to approved operational values to prevent malformed queries.",
          "Multi-Tool Declarations: Providing the agent with an array of complementary tools for multi-step reasoning."
        ],
        takeaway: "Tool schemas define what your agent can do in the real world. Clear schemas guarantee zero API execution errors."
      },
      {
        lesNum: 3,
        title: "Managing State & Conversational History Across Asynchronous Cycles",
        duration: "15m",
        summary: "Store operational state across multi-step execution loops without ballooning token context costs.",
        bulletPoints: [
          "The Ephemeral Context Problem: Why stateless LLMs forget past interactions and how to inject state history dynamically.",
          "Thread ID Architecture: Storing unique thread identifiers in Airtable to resume client interactions across days.",
          "Context Window Pruning: Summarizing past message rounds to keep input token costs minimal.",
          "Handling Re-Entrancy: Ensuring duplicate webhooks do not trigger duplicated execution cycles."
        ],
        takeaway: "External state memory gives your agent persistence across time, transforming one-off chats into ongoing relationships."
      },
      {
        lesNum: 4,
        title: "Deterministic Guardrails: Eliminating Hallucinations & Infinite Loops",
        duration: "15m",
        summary: "Implement loop counters, output schema validation, and confidence score thresholds to ensure production safety.",
        bulletPoints: [
          "Maximum Execution Step Limits: Hardcoding a max_steps = 5 limit to prevent expensive infinite recursive reasoning loops.",
          "Confidence Scoring: Requiring the model to output a confidence metric alongside its proposed action.",
          "Human-in-the-Loop Interception: Automatically halting execution and routing to a human review queue when certainty drops.",
          "Fallback Responses: Providing pre-scripted deterministic fallback messages when external APIs fail."
        ],
        takeaway: "Guardrails protect your agency reputation. Always implement hard step limits and human approval thresholds."
      },
      {
        lesNum: 5,
        title: "Model Selection Matrix: Routing Tasks to Claude 3.7 vs. GPT-4o",
        duration: "15m",
        summary: "Choose the optimal model for each step of an agent pipeline to balance reasoning accuracy, latency, and cost.",
        bulletPoints: [
          "Complex Synthesis & Nuance: Deploying Claude 3.7 Sonnet for document evaluation, legal review, and long-context synthesis.",
          "High-Speed Classification: Utilizing GPT-4o Mini for initial triage, spam filtering, and structured JSON parsing.",
          "Latency Benchmarks: Measuring time-to-first-token to ensure customer-facing interactions respond within acceptable thresholds.",
          "Cost Modeling: Architecting two-tier routing pipelines that accomplish 80% of tasks at 10% of the cost."
        ],
        takeaway: "Intelligent model routing allows you to deliver frontier reasoning capabilities while preserving 90%+ agency margins."
      },
      {
        lesNum: 6,
        title: "Testing & Debugging Agent Execution Logs in Real Time",
        duration: "15m",
        summary: "Monitor live agent step-by-step reasoning chains, inspect input/output payloads, and diagnose failures instantly.",
        bulletPoints: [
          "Step Tracing: Logging every intermediate tool call, parameter set, and external API response to an audit base.",
          "Simulated Sandbox Testing: Injecting synthetic customer edge cases to verify agent behavior under stress.",
          "Regression Testing: Maintaining a benchmark suite of 20 historical edge cases to test prompt updates against.",
          "Real-Time Telemetry: Configuring instant Slack alerting for any agent execution that returns an unhandled error."
        ],
        takeaway: "You cannot optimize what you do not measure. Comprehensive step logging is mandatory for enterprise client deployments."
      },
      {
        lesNum: 7,
        title: "Module 1 Checkpoint: Your Enterprise Agent Architecture Spec",
        duration: "15m",
        summary: "Synthesize the 4-part framework and tool schemas into your standardized agency agent deployment specification.",
        bulletPoints: [
          "The Standardized Architecture Spec: Your agency template defining sensors, database tables, prompts, and actuators.",
          "Security & Compliance Checklist: Enterprise data privacy, credential encryption, and human-in-the-loop protocols.",
          "Client Deliverable Format: Packaging your architecture into a professional visual diagram for prospective buyers.",
          "Module 1 Milestone: You are now equipped to build the 5 commercial agent blueprints in the following modules."
        ],
        takeaway: "A standardized architecture spec ensures every agent you build is robust, secure, and ready for commercial handoff."
      }
    ]
  },
  {
    num: 2,
    id: "module-02",
    title: "Agent 1 — Inbound Lead Qualification & Auto-Proposal Agent",
    duration: "1h 45m",
    description: "Build an autonomous agent that ingests website inquiries, enriches company data, scores intent, and generates custom proposals.",
    lessons: [
      {
        lesNum: 1,
        title: "The Speed-to-Lead Emergency & Commercial Value Proposition",
        duration: "15m",
        summary: "Understand why B2B conversion drops by 391% when response times exceed 5 minutes and how Agent #1 solves this.",
        bulletPoints: [
          "The B2B Latency Problem: Enterprise leads research 3 competitors simultaneously; the first competent response wins 70% of deals.",
          "The Agent Solution: Ingesting inquiries, enriching firmographic data, and sending custom-tailored proposals in 90 seconds.",
          "Commercial Value: Demonstrating to clients that saving just two lost enterprise deals monthly yields $20,000+ in profit.",
          "Client Pricing: Packaging Agent #1 as a $3,500 setup sprint with a recurring $750/month optimization retainer."
        ],
        takeaway: "Speed to lead is the most direct revenue driver in B2B. Agent #1 delivers instant ROI that clients easily understand."
      },
      {
        lesNum: 2,
        title: "Ingesting Inbound Inquiries from Forms, Chatbots & Calendars",
        duration: "15m",
        summary: "Set up webhook receivers that capture inbound prospect data from Typeform, HubSpot, and web forms instantly.",
        bulletPoints: [
          "Webhook Architecture: Capturing prospect name, business email, company URL, and initial problem description.",
          "Email Validation & Normalization: Filtering out disposable personal domains (@gmail, @yahoo) vs. verified corporate domains.",
          "Airtable Intake Logging: Creating immediate timestamped records in the prospect pipeline table.",
          "Triggering the Agent: Passing the raw payload to the Make.com orchestration scenario within 500 milliseconds."
        ],
        takeaway: "Clean data ingestion ensures the downstream enrichment and reasoning steps have accurate corporate identifiers."
      },
      {
        lesNum: 3,
        title: "Automated Firmographic Enrichment via Apollo & Clay APIs",
        duration: "15m",
        summary: "Equip the agent with enrichment tools to discover company employee count, annual revenue, tech stack, and funding.",
        bulletPoints: [
          "The Enrichment Tool Schema: Configuring a tool that takes a company domain and queries enrichment APIs automatically.",
          "Key Qualification Metrics: Pulling employee headcount, industry vertical, estimated revenue, and current tech stack.",
          "Decision-Maker Mapping: Identifying the prospect's exact seniority and verifying budget authority.",
          "Appending to State: Writing enriched firmographic attributes back into Airtable linked company records."
        ],
        takeaway: "Enrichment transforms a basic name and email into a complete commercial dossier before the agent writes a single word."
      },
      {
        lesNum: 4,
        title: "Intent Scoring & Dynamic Routing Logic with Claude 3.7",
        duration: "15m",
        summary: "Instruct Claude 3.7 to analyze prospect project descriptions against client ICP criteria to calculate an intent score.",
        bulletPoints: [
          "ICP Scoring Prompt: Evaluating lead fit across budget size, timeline urgency, and problem complexity (Tier 1, 2, or 3).",
          "Structured Score Output: Returning fit_score: 92, tier: 'ENTERPRISE', and justification: 'High budget, hiring actively'.",
          "Routing Rules: Routing Tier 1 leads directly to CEO/sales lead calendar; routing Tier 3 leads to self-service resources.",
          "Internal Slack Alerting: Dispatching real-time notifications to sales reps with enriched dossiers on high-scoring leads."
        ],
        takeaway: "Automated intent scoring ensures sales teams focus 100% of their energy on high-value, high-intent opportunities."
      },
      {
        lesNum: 5,
        title: "Generating Custom-Tailored Scope Proposals in Seconds",
        duration: "15m",
        summary: "Generate personalized 2-page PDF proposals addressing the prospect's specific operational bottleneck and quoting tiers.",
        bulletPoints: [
          "Dynamic Proposal Prompt: Synthesizing prospect problem statement, company background, and client service offerings.",
          "Markdown to PDF Rendering: Converting structured proposal text into a branded PDF using DocuGenerate or APITemplate.",
          "Custom Pricing Recommendations: Automatically inserting appropriate tiered pricing based on company size.",
          "Review Safeguards: Generating draft proposals for human review before client dispatch on high-ticket enterprise inquiries."
        ],
        takeaway: "A custom proposal delivered within 2 minutes of inquiry blows prospects away and sets a standard competitors cannot match."
      },
      {
        lesNum: 6,
        title: "Automating Multi-Touch Follow-Up Sequences Across Email & SMS",
        duration: "15m",
        summary: "Build scheduled follow-up loops that check for meeting booking confirmation and send gentle reminders.",
        bulletPoints: [
          "Calendar Booking Verification: Polling Cal.com or Calendly to verify if the prospect scheduled a discovery call.",
          "Conditional Follow-Up Flow: If no booking after 24 hours -> dispatch personalized check-in highlighting a relevant case study.",
          "SMS Nudge Integration: Sending a polite text message to verified mobile numbers for high-priority Tier 1 accounts.",
          "Automatic Termination: Halting all follow-up sequences the instant a meeting is booked."
        ],
        takeaway: "Follow-up persistence closes deals. Automated conditional sequences recover 30%+ of prospects who drop off initially."
      },
      {
        lesNum: 7,
        title: "Module 2 Project: Full Deployment of Agent #1 for a Commercial Client",
        duration: "15m",
        summary: "Connect all 6 steps into a turnkey lead qualification and proposal generation system ready for client delivery.",
        bulletPoints: [
          "End-to-End System Integration: Webhook -> Enrichment -> Claude Scoring -> PDF Proposal -> Email & Slack Alert.",
          "Live Client Simulation: Submitting test inquiries and verifying 90-second delivery of customized proposals.",
          "Client Training Walkthrough: Recording a 10-minute Loom video explaining how the client's team reviews lead scores.",
          "Commercial Deliverable: Your first complete, sellable agent solution valued at $3,500 setup plus $750/month."
        ],
        takeaway: "Agent #1 is a complete commercial asset. Deploy this for your first client to create instant operational transformation."
      }
    ]
  },
  {
    num: 3,
    id: "module-03",
    title: "Agent 2 — Customer Support & Multi-Channel Escalation Agent",
    duration: "1h 45m",
    description: "Build an enterprise customer support agent that resolves 70%+ of tier-1 inquiries with grounded database lookups and supervisor escalation.",
    lessons: [
      {
        lesNum: 1,
        title: "The Economics of Automated Support & Enterprise SLAs",
        duration: "15m",
        summary: "Understand how support automations slash ticket resolution costs by 80% while upholding strict enterprise SLAs.",
        bulletPoints: [
          "The Cost per Ticket Metric: Traditional human support tickets cost $15-$25 each; automated resolution costs under $0.50.",
          "First-Contact Resolution: Resolving repetitive inquiries (status updates, returns, password resets) in under 60 seconds.",
          "SLA Guarantee Maintenance: Ensuring no high-priority customer ticket breaches contractual response thresholds.",
          "Client Pricing: Packaging Agent #2 for $3,500 setup with an ongoing $1,000/month monitoring and refinement retainer."
        ],
        takeaway: "Support automation is justified by pure cost reduction and customer retention. It is one of the easiest enterprise sells."
      },
      {
        lesNum: 2,
        title: "Unified Omnichannel Ingestion (Zendesk, HelpScout, Email, Web Chat)",
        duration: "15m",
        summary: "Aggregate incoming customer support requests across multiple platforms into a single normalized data stream.",
        bulletPoints: [
          "Multi-Channel Ingestion: Connecting Zendesk webhooks, Freshdesk APIs, and direct email support addresses.",
          "Normalizing Inbound Payloads: Extracting customer ID, subject, message body, conversation history, and priority tags.",
          "Deduplication & Thread Grouping: Appending new replies to existing support tickets rather than spawning duplicates.",
          "Airtable Support Queue: Storing all active conversations inside a centralized operational support console."
        ],
        takeaway: "Unified ingestion allows your support agent to operate seamlessly regardless of what communication channel the customer uses."
      },
      {
        lesNum: 3,
        title: "Grounded Knowledge Base RAG Ingestion (Zero Hallucination)",
        duration: "15m",
        summary: "Equip the agent with vector search tools to retrieve accurate corporate policies, warranty terms, and SOP documentation.",
        bulletPoints: [
          "Document Hygiene & Formatting: Preparing company return policies, warranty terms, and product manuals for vector indexing.",
          "OpenAI File Search Vector Stores: Uploading and chunking documents with semantic similarity retrieval.",
          "Strict Grounding Instructions: Mandating that the model ONLY reference retrieved passages; if absent, state lack of information.",
          "Source Citation Tagging: Attaching internal document section references to drafted answers for supervisor verification."
        ],
        takeaway: "Strict grounding against internal documents eliminates hallucinations and ensures corporate compliance."
      },
      {
        lesNum: 4,
        title: "Live Database Tool Calling for Account & Order Verification",
        duration: "15m",
        summary: "Give the agent function-calling tools to query live order databases, tracking APIs, and subscription billing statuses.",
        bulletPoints: [
          "Order Status Tool Schema: Allowing the agent to pass order_id and retrieve shipping status, tracking numbers, and delivery dates.",
          "Customer Authentication: Verifying that the sender email matches the customer account on file before sharing details.",
          "Billing Status Tool: Checking active Stripe subscription tiers and renewal dates to answer account billing questions.",
          "Safe Read-Only Access: Restricting database credentials strictly to SELECT queries to prevent accidental modifications."
        ],
        takeaway: "Live database lookups transform support AI from a generic chatbot into an authoritative operational assistant."
      },
      {
        lesNum: 5,
        title: "Sentiment Analysis & Human Supervisor Escalation Protocols",
        duration: "15m",
        summary: "Build an automated sentiment monitor that detects customer frustration and escalates tickets to senior staff instantly.",
        bulletPoints: [
          "Sentiment Scoring Prompt: Classifying customer emotion into 'Calm', 'Confused', 'Frustrated', or 'Severe Churn Risk'.",
          "Automated Escalation Triggers: Instantly reassigning tickets to tier-2 human supervisors when sentiment is negative.",
          "Contextual Handoff Summaries: Generating a 3-bullet executive summary of the issue so human reps step in with full context.",
          "Emergency Slack Alerts: Pinging the customer success channel when VIP enterprise accounts register frustration."
        ],
        takeaway: "Intelligent escalation protects customer relationships. Know when the agent should resolve and when a human should intervene."
      },
      {
        lesNum: 6,
        title: "Automated Ticket Resolution, Tagging & Feedback Collection",
        duration: "15m",
        summary: "Dispatch verified resolution responses back to helpdesk platforms, update tags, and collect customer CSAT scores.",
        bulletPoints: [
          "Helpdesk API Dispatch: Replying to Zendesk/Freshdesk via API with properly formatted markdown responses.",
          "Automated Ticket Tagging: Applying category tags (e.g., 'Billing', 'Shipping', 'Bug Report') for executive analytics.",
          "Status Transitions: Updating ticket state to 'Resolved - Awaiting Customer Confirmation'.",
          "Automated CSAT Surveys: Sending a 1-click satisfaction survey 24 hours after resolution to monitor agent quality."
        ],
        takeaway: "Closing the loop with automated tagging and CSAT surveys provides continuous feedback on your agent's operational accuracy."
      },
      {
        lesNum: 7,
        title: "Module 3 Project: Production Support Agent with Live Lookups & Escalation",
        duration: "15m",
        summary: "Build, configure, and stress-test a complete multi-channel customer support agent ready for enterprise deployment.",
        bulletPoints: [
          "End-to-End System Blueprint: Helpdesk intake -> Vector RAG -> Order DB tool -> Sentiment check -> Response or Escalation.",
          "Simulated Edge-Case Testing: Testing angry customers, missing orders, and out-of-scope refund requests.",
          "Supervisor Approval Queue: Interface allowing support managers to review drafted replies before automated sending.",
          "Commercial Packaging: Selling Agent #2 for $3,500 setup plus $1,000/month ongoing maintenance and optimization."
        ],
        takeaway: "Agent #2 provides massive labor cost savings for e-commerce and SaaS clients, making it a cornerstone agency offering."
      }
    ]
  },
  {
    num: 4,
    id: "module-04",
    title: "Agent 3 — Financial & Invoice Processing Agent",
    duration: "1h 45m",
    description: "Build an autonomous financial agent that extracts multi-page invoices, performs 3-way PO matching, and syncs to accounting ERPs.",
    lessons: [
      {
        lesNum: 1,
        title: "The Accounts Payable Bottleneck & Enterprise Financial Pain",
        duration: "15m",
        summary: "Discover why finance departments waste 20+ hours weekly on manual data entry and how Agent #3 eliminates errors.",
        bulletPoints: [
          "The AP Workflow Friction: Manually opening vendor PDFs, typing line items into QuickBooks, and checking purchase orders.",
          "The Cost of Human Error: Duplicate invoice payments, overlooked discounts, and incorrect sales tax entries costing thousands.",
          "The Agent Solution: Ingesting supplier PDFs, extracting structured line items, verifying PO matching, and staging ERP drafts.",
          "Commercial Value: Selling this financial automation to mid-market companies for $4,500 setup plus $1,200/month retainer."
        ],
        takeaway: "Financial automation directly prevents cash leakage. Businesses immediately recognize the ROI of automated invoice auditing."
      },
      {
        lesNum: 2,
        title: "Multimodal PDF & Document Extraction with Claude 3.7",
        duration: "15m",
        summary: "Pass multi-page PDF invoices and scanned receipts directly to Claude 3.7 to extract table data with 99%+ accuracy.",
        bulletPoints: [
          "Native Multimodal Parsing: Converting PDF pages to base64 images and passing directly into the Claude Messages API.",
          "Line Item Extraction: Extracting item descriptions, quantities, unit prices, tax rates, and total amounts accurately.",
          "Vendor Normalization: Matching messy invoice vendor names (e.g., 'Acme Inc - US Div') to master vendor records.",
          "Handling Complex Scans: Accurately reading rotated pages, low-resolution receipts, and multi-currency formats."
        ],
        takeaway: "Claude 3.7 multimodal vision extracts complex tables from unstructured PDFs with near-flawless accuracy."
      },
      {
        lesNum: 3,
        title: "3-Way Purchase Order Reconciliation & Discrepancy Detection",
        duration: "15m",
        summary: "Build deterministic comparison logic that cross-references invoices against purchase orders and shipping receipts.",
        bulletPoints: [
          "The 3-Way Match Rule: Matching the Supplier Invoice against the Internal Purchase Order and the Receiving Log.",
          "Variance Thresholds: Automatically approving invoices where variance is within acceptable tolerance (e.g., under $5 or 1%).",
          "Price Increase Detection: Flagging instances where vendor unit prices increased without prior contractual agreement.",
          "Duplicate Payment Guard: Checking historical invoice numbers and vendor totals to prevent duplicate payments."
        ],
        takeaway: "Automated 3-way matching catches billing discrepancies before checks are cut, directly protecting the client's bottom line."
      },
      {
        lesNum: 4,
        title: "Strict JSON Schema Validation & Error Quarantine Staging",
        duration: "15m",
        summary: "Enforce strict JSON schema validation and quarantine malformed or suspicious financial records for human review.",
        bulletPoints: [
          "Financial JSON Schema: Mandating strict number types, ISO dates, and non-empty line item arrays.",
          "The Quarantine Table: Automatically moving records with extraction errors or discrepancies into an 'AP Review Required' view.",
          "Audit Trail Logging: Storing full raw payloads and extraction logs to support corporate accounting and tax audits.",
          "Zero Untested Writes: Never writing directly to live general ledgers without passing schema validation."
        ],
        takeaway: "Financial systems require zero tolerance for errors. Quarantining discrepancies protects general ledger integrity."
      },
      {
        lesNum: 5,
        title: "Synchronizing Bills into QuickBooks, Xero & NetSuite via API",
        duration: "15m",
        summary: "Format extracted data and push bills into cloud accounting platforms as staged drafts ready for controller approval.",
        bulletPoints: [
          "Accounting API Authentication: Connecting OAuth credentials for QuickBooks Online or Xero securely.",
          "Bill Draft Creation: Creating bill records with mapped vendor IDs, due dates, account categories, and line items.",
          "Attachment Linking: Attaching the original vendor PDF invoice directly to the accounting software record for traceability.",
          "Approval Status Flow: Staging bills as 'Draft - Pending Approval' so the CFO retains final payment authority."
        ],
        takeaway: "Staging bills as drafts preserves human authorization while eliminating 95% of the manual data entry work."
      },
      {
        lesNum: 6,
        title: "Vendor Communication: Automated Discrepancy Inquiries",
        duration: "15m",
        summary: "Enable the agent to draft polite, professional emails to vendors requesting clarification when invoices don't match POs.",
        bulletPoints: [
          "Automated Vendor Inquiry Drafting: Drafting emails detailing the exact line item discrepancy, expected PO price, and billed amount.",
          "One-Click Staff Approval: Presenting drafted vendor emails in an Airtable Interface for AP staff single-click approval.",
          "Thread Tracking: Logging vendor responses and updating the invoice status upon receipt of corrected credit memos.",
          "Professional Tone Constraints: Ensuring vendor communications remain professional, polite, and collaborative."
        ],
        takeaway: "Automated discrepancy emails resolve billing conflicts in hours instead of letting unapproved invoices stall for weeks."
      },
      {
        lesNum: 7,
        title: "Module 4 Project: Turnkey Automated Accounts Payable Pipeline",
        duration: "15m",
        summary: "Build and deploy an autonomous financial agent that ingests invoices, extracts data, matches POs, and drafts bills.",
        bulletPoints: [
          "End-to-End System Blueprint: Email attachment -> Claude extraction -> PO cross-reference -> Discrepancy check -> QuickBooks draft.",
          "Testing Real Invoices: Running multi-page test invoices with deliberate pricing errors to verify discrepancy detection.",
          "Executive Dashboard: Building an Airtable Interface showing total monthly spend, processed invoices, and flagged errors.",
          "Commercial Packaging: Selling Agent #3 for $4,500 setup plus $1,200/month ongoing maintenance and support."
        ],
        takeaway: "Agent #3 is an enterprise-grade financial asset. Finance executives immediately recognize its immense ROI."
      }
    ]
  },
  {
    num: 5,
    id: "module-05",
    title: "Agent 4 — Market Intelligence & Competitor Scraping Agent",
    duration: "1h 45m",
    description: "Build an autonomous market intelligence agent that scours competitor websites, monitors pricing changes, and delivers executive digests.",
    lessons: [
      {
        lesNum: 1,
        title: "The Market Intelligence Blindspot & B2B Executive Demand",
        duration: "15m",
        summary: "Understand why executives pay thousands monthly to receive automated strategic intelligence on their market rivals.",
        bulletPoints: [
          "The Information Gap: Executives are too busy operating their companies to manually monitor 10 competitor websites weekly.",
          "The Commercial Opportunity: Delivering real-time alerts on competitor pricing pivots, product launches, and key executive hires.",
          "Decision-Making Leverage: Giving leadership an unfair competitive advantage during strategic planning and sales cycles.",
          "Client Pricing: Packaging Agent #4 as a $3,000 setup sprint with an ongoing $850/month intelligence subscription."
        ],
        takeaway: "Market intelligence gives leadership peace of mind and strategic foresight. It is a high-retention, high-margin offering."
      },
      {
        lesNum: 2,
        title: "Automated Web Scraping via Firecrawl & Perplexity Sonar",
        duration: "15m",
        summary: "Equip the agent with tools to extract clean text from JavaScript-heavy websites and execute real-time web searches.",
        bulletPoints: [
          "Headless Web Scraping with Firecrawl: Bypassing bot protections and extracting pristine Markdown from complex competitor sites.",
          "Perplexity Sonar API: Programmatically querying live web search for recent news, press releases, and executive announcements.",
          "Target URL Scheduling: Configuring cron schedules to scrape competitor pricing, feature, and career pages weekly.",
          "Data Sanitization: Stripping navigation menus, ads, and footers to isolate core business content."
        ],
        takeaway: "Firecrawl and Perplexity give your agent live internet vision, ensuring client intelligence is always up to date."
      },
      {
        lesNum: 3,
        title: "Diff Detection & Change Analysis: Pricing, Features & Messaging",
        duration: "15m",
        summary: "Build comparison logic that compares newly scraped pages against historical baselines to pinpoint strategic pivots.",
        bulletPoints: [
          "The Diff Detection Architecture: Hashing and storing past page text in Airtable to detect content modifications.",
          "Semantic Change Analysis: Instructing Claude 3.7 to analyze text differences and classify significance (Cosmetic vs. Strategic).",
          "Pricing Change Alerts: Flagging changes in competitor tier pricing, billing frequency, or feature bundling immediately.",
          "Messaging Pivots: Detecting when competitors shift their positioning toward new customer segments."
        ],
        takeaway: "Semantic diff detection filters out trivial website updates and highlights genuine strategic competitor shifts."
      },
      {
        lesNum: 4,
        title: "Tracking Intent Signals: Executive Hires & Job Board Scraping",
        duration: "15m",
        summary: "Monitor competitor hiring patterns and executive appointments to forecast their upcoming strategic roadmap.",
        bulletPoints: [
          "Job Board Scraping: Monitoring competitor Careers pages to see what technologies and roles they are actively recruiting.",
          "Roadmap Forecasting: If a competitor hires 5 'Enterprise Account Executives', they are preparing an enterprise upmarket push.",
          "Executive Turnover Tracking: Monitoring press releases and LinkedIn for newly appointed C-suite and VP leaders.",
          "Structuring Talent Data: Storing roles, requirements, and dates inside a relational competitor intelligence base."
        ],
        takeaway: "Job listings reveal a competitor's strategy 6 months before product launch. Tracking hires provides predictive insight."
      },
      {
        lesNum: 5,
        title: "Synthesizing 100+ Page Transcripts & Filings into Strategic Briefs",
        duration: "15m",
        summary: "Ingest quarterly earnings calls and industry analyst reports into Claude's 200K context window to extract strategic insights.",
        bulletPoints: [
          "Quarterly Earnings Ingestion: Processing full earnings call transcripts from public competitors in a single prompt.",
          "Targeted Strategic Prompts: Instructing the model to extract revenue guidance, client churn comments, and risk disclosures.",
          "Competitor SWOT Generation: Automatically maintaining an updated Strengths, Weaknesses, Opportunities, and Threats matrix.",
          "Executive Formatting: Formatting findings into clean executive summary bullet points with verbatim quotes."
        ],
        takeaway: "Synthesizing dense transcripts saves executives hours of reading while surfacing mission-critical competitive nuggets."
      },
      {
        lesNum: 6,
        title: "Automated Slack & Email Executive Intelligence Briefings",
        duration: "15m",
        summary: "Format weekly intelligence digests and deliver them directly into client executive Slack channels every Monday morning.",
        bulletPoints: [
          "Executive Delivery Formats: Designing visually stunning Slack blocks and clean HTML email digests.",
          "Scheduled Monday 8 AM Dispatch: Delivering insights right before leadership team meetings.",
          "Urgent Breaking Alerts: Immediately pinging the channel when a major competitor pricing shift or acquisition occurs.",
          "Historical Archival: Storing all past intelligence briefs inside an interactive Airtable portal for historical reference."
        ],
        takeaway: "Delivering timely, beautiful executive digests reinforces the value of your retainer every single week."
      },
      {
        lesNum: 7,
        title: "Module 5 Project: The Autonomous Executive Market Radar",
        duration: "15m",
        summary: "Build, test, and deploy an automated market intelligence agent monitoring 5 competitors and delivering weekly briefs.",
        bulletPoints: [
          "End-to-End System Blueprint: Scheduled scraping -> Firecrawl -> Semantic diff -> Claude analysis -> Airtable log -> Slack digest.",
          "Testing Real Competitors: Running the pipeline against 3 real companies in your niche and reviewing the generated insights.",
          "Client Portal Showcase: Building a Softr dashboard where clients review competitor timelines and past alerts.",
          "Commercial Packaging: Selling Agent #4 for $3,000 setup plus $850/month recurring retainer."
        ],
        takeaway: "Agent #4 is a high-prestige executive product. CEOs and VPs love waking up to automated strategic intelligence."
      }
    ]
  },
  {
    num: 6,
    id: "module-06",
    title: "Agent 5 — Operational Workflow & Task Dispatcher Agent",
    duration: "1h 45m",
    description: "Build an autonomous operations coordinator that breaks complex incoming requests into sub-tasks, assigns staff, and tracks SLAs.",
    lessons: [
      {
        lesNum: 1,
        title: "The Project Management Drag: Administrative Overhead in Growing Teams",
        duration: "15m",
        summary: "Understand why mid-market agencies and teams spend 30%+ of staff time coordinating tasks rather than executing work.",
        bulletPoints: [
          "The Coordination Tax: Project managers spending hours reading client briefs, creating tickets, and chasing status updates.",
          "The Agent Solution: Ingesting client requests, decomposing deliverables into sub-tasks, assigning staff, and monitoring deadlines.",
          "Operational Throughput: Enabling existing teams to handle 50% more client accounts without hiring additional project managers.",
          "Client Pricing: Packaging Agent #5 for $4,000 setup plus $1,000/month recurring maintenance."
        ],
        takeaway: "Automated project coordination eliminates internal chaos and scales agency capacity without expanding payroll."
      },
      {
        lesNum: 2,
        title: "Ingesting Unstructured Client Briefs & Work Requests",
        duration: "15m",
        summary: "Capture client requests via email, Slack messages, or portal forms and normalize them into unified work objects.",
        bulletPoints: [
          "Multi-Source Ingestion: Listening for client requests submitted via email, Slack mentions, or Softr portal forms.",
          "Extracting Project Intent: Parsing raw messages to identify deliverables, client deadlines, priority tiers, and attached assets.",
          "Airtable Work Order Logging: Creating central project records linked to client accounts with timestamped receipts.",
          "Triggering the Coordinator: Passing project text to Claude 3.7 for automated scope decomposition."
        ],
        takeaway: "Unified request ingestion ensures no client email or message gets lost in personal inboxes."
      },
      {
        lesNum: 3,
        title: "Autonomous Task Decomposition & Dependency Mapping with Claude",
        duration: "15m",
        summary: "Instruct Claude 3.7 to analyze complex project briefs and break them down into sequential, actionable sub-tasks.",
        bulletPoints: [
          "Decomposition Prompting: Instructing the model to break high-level projects into distinct sequential milestones.",
          "Dependency Identification: Establishing which tasks block subsequent work (e.g., 'Copywriting' must precede 'Design').",
          "Time Estimation: Estimating realistic completion hours based on historical agency benchmarks.",
          "Structured JSON Task Array: Outputting an array of sub-tasks with assigned roles, deadlines, and acceptance criteria."
        ],
        takeaway: "Automated task decomposition transforms vague client requests into clear, itemized execution plans in seconds."
      },
      {
        lesNum: 4,
        title: "Dynamic Staff Capacity Allocation & Skill-Based Assignment",
        duration: "15m",
        summary: "Equip the agent with tools to query staff calendars, current workload capacity, and skill tags to assign tickets.",
        bulletPoints: [
          "Capacity Query Tool: Checking staff active ticket counts in Airtable to identify team members with available bandwidth.",
          "Skill Tag Matching: Assigning tasks specifically to team members with matching expertise (e.g., 'Figma', 'Copywriting').",
          "Balanced Workload Distribution: Preventing burnout by routing tasks away from overloaded senior team members.",
          "Assigning Deadlines: Calculating milestone due dates working backward from the client's contractual delivery deadline."
        ],
        takeaway: "Skill-based capacity allocation balances team workloads and eliminates project management bottlenecks."
      },
      {
        lesNum: 5,
        title: "Dispatching Tasks into Linear, Asana, ClickUp & Slack",
        duration: "15m",
        summary: "Use Make.com integrations to create project boards, assign tickets, and notify staff with personalized briefs.",
        bulletPoints: [
          "Task Management API Sync: Creating parent projects and sub-tasks inside Asana, ClickUp, or Linear via API.",
          "Personalized Slack Alerts: Pinging assigned team members with a 3-bullet briefing and direct links to assets.",
          "Airtable Relational Sync: Linking created external ticket IDs back to the master Airtable work order base.",
          "Two-Way Status Callbacks: Listening for ticket status updates in Asana and updating Airtable project health automatically."
        ],
        takeaway: "Bi-directional integration ensures project managers and staff work inside their preferred tools while maintaining central state."
      },
      {
        lesNum: 6,
        title: "Proactive SLA Monitoring & Automated Bottleneck Escalation",
        duration: "15m",
        summary: "Build scheduled audit routines that monitor milestone deadlines and alert management before projects go overdue.",
        bulletPoints: [
          "The SLA Watchdog: Running hourly checks to identify tasks that have remained in 'In Progress' beyond estimated hours.",
          "Predictive Delay Detection: Flagging dependent tasks that will breach deadlines if preceding tasks are not completed today.",
          "Automated Nudges: Dispatching polite Slack reminders to assigned staff 24 hours before milestone deadlines.",
          "Management Escalation: Pinging the Operations Director when critical path milestones fall 48 hours behind schedule."
        ],
        takeaway: "Proactive SLA monitoring catches delays before they impact the client, protecting your agency's delivery reputation."
      },
      {
        lesNum: 7,
        title: "Module 6 Project: The Autonomous Agency Operations Coordinator",
        duration: "15m",
        summary: "Build and deploy an autonomous task coordinator that ingests client briefs, assigns staff, and monitors SLAs.",
        bulletPoints: [
          "End-to-End System Blueprint: Brief intake -> Claude decomposition -> Capacity check -> Ticket creation -> Slack alert -> SLA watchdog.",
          "Live Simulation Testing: Submitting complex multi-deliverable client briefs and observing automated sub-task creation.",
          "Operations Dashboard: Reviewing team capacity, project progress, and active bottlenecks inside an Airtable Interface.",
          "Commercial Packaging: Selling Agent #5 for $4,000 setup plus $1,000/month ongoing maintenance."
        ],
        takeaway: "Agent #5 solves the universal challenge of team coordination, making it an indispensable operational asset."
      }
    ]
  },
  {
    num: 7,
    id: "module-07",
    title: "B2B Pricing, Retainers & Client Handoff Frameworks",
    duration: "1h 45m",
    description: "Package the 5 agents into lucrative multi-tier retainers, master the Trojan Horse sales formula, and scale to $10,000/month.",
    lessons: [
      {
        lesNum: 1,
        title: "Packaging 5 Agents into High-Ticket Service Sprints",
        duration: "15m",
        summary: "Structure your 5 agent blueprints into clear, productized commercial packages that eliminate sales friction.",
        bulletPoints: [
          "The Packaging Advantage: Fixed deliverables and clear outcomes eliminate custom proposal drag.",
          "Tier 1 (Front-Office Accelerator - $2,500): Agent #1 (Lead Triage) or Agent #2 (Customer Support).",
          "Tier 2 (Back-Office Optimizer - $4,500): Agent #3 (AP Invoice Auditor) or Agent #5 (Operations Coordinator).",
          "Tier 3 (Full Enterprise Operating System - $8,500): Multi-agent deployment integrating front and back-office pipelines."
        ],
        takeaway: "Productized packaging makes decisions simple for buyers. Position your agents as high-ROI operational systems."
      },
      {
        lesNum: 2,
        title: "Structuring Mandatory $1,000-$2,000/Month Ongoing Retainers",
        duration: "15m",
        summary: "Master the psychology and mechanics of attaching recurring maintenance retainers to every single agent deployment.",
        bulletPoints: [
          "Why Retainers Are Mandatory: Language models and external APIs require continuous monitoring, token tuning, and prompt updates.",
          "What the Retainer Covers: Software uptime monitoring, API error handling, monthly prompt optimizations, and SLA support.",
          "The First-Month Inclusion: Bundling the first 30 days of maintenance into the setup fee to establish recurring billing as normal.",
          "The Retainer Math: Managing just 6 to 8 client retainers at $1,250/month achieves the $10,000/month revenue milestone."
        ],
        takeaway: "Never deliver an agent build without an ongoing retainer. The setup fee covers your build; the retainer builds your agency wealth."
      },
      {
        lesNum: 3,
        title: "The 5-Minute 'Trojan Horse' Personalized Loom Audit Strategy",
        duration: "15m",
        summary: "Execute the proven personalized video audit formula that books discovery calls with high-ticket enterprise decision-makers.",
        bulletPoints: [
          "The Trojan Horse Concept: Diagnosing a specific operational friction point on the prospect's website rather than pitching generic AI.",
          "The 5-Minute Script: 60s compliment & problem reveal -> 2m visual agent architecture walkthrough -> 2m ROI projection & CTA.",
          "The Interactive Hook: Submitting a test inquiry on their website and demonstrating the delay in real time on camera.",
          "The Low-Friction Call to Action: Offering to share the visual agent blueprint on a quick 15-minute diagnostic call."
        ],
        takeaway: "A 5-minute video demonstrating their specific operational bottleneck is 100x more persuasive than any cold email."
      },
      {
        lesNum: 4,
        title: "Discovery Call Mastery: Calculating Client Pain & Closing on Call",
        duration: "15m",
        summary: "Conduct consultative sales conversations that lead prospects to calculate their own operational waste and close.",
        bulletPoints: [
          "The Diagnostic Framework: Asking targeted questions about current administrative hours and software friction.",
          "Quantifying Financial Waste: Guiding the client to articulate: 'This manual process costs us $40,000 a year in staff overhead.'",
          "Visual Architecture Reveal: Sharing your screen to present the customized 4-part agent diagram solving their exact pain.",
          "Collaborative Closing: Presenting two tiered options and securing agreement on the 7-day implementation sprint."
        ],
        takeaway: "When the client calculates their own financial waste, your $3,500 setup fee becomes an obvious, low-risk decision."
      },
      {
        lesNum: 5,
        title: "Drafting Bulletproof SOW Contracts & IP Assignment Clauses",
        duration: "15m",
        summary: "Protect your agency with clean Statements of Work, scope boundaries, payment terms, and intellectual property terms.",
        bulletPoints: [
          "Scope Boundaries: Explicitly defining what is included and establishing a $175/hour rate for out-of-scope requests.",
          "Payment Milestones: Enforcing 50% deposit upfront before development begins and 50% upon completed staging demonstration.",
          "IP Ownership Architecture: Granting the client a perpetual license to use the agent while retaining your proprietary workflows.",
          "Prerequisites & Pause Terms: Pausing project timelines if the client fails to provide necessary API credentials within 48 hours."
        ],
        takeaway: "Clear contracts prevent scope creep, protect cash flow, and ensure a smooth, professional client relationship."
      },
      {
        lesNum: 6,
        title: "Client Handoff, Staff Training & Automated Monthly ROI Reports",
        duration: "15m",
        summary: "Deliver white-glove client onboarding, recorded staff video tutorials, and automated monthly performance digests.",
        bulletPoints: [
          "The Staging to Production Switch: Parallel testing in sandbox before pointing webhooks to live production databases.",
          "Recorded Staff Training SOPs: Providing a 15-minute Loom walkthrough demonstrating how internal staff interact with the agent.",
          "Automated Monthly Value Reports: Sending branded PDF digests showing total hours saved, tickets resolved, and ROI created.",
          "Eliminating Churn: Reminding leadership of the financial value you deliver makes retainer renewals automatic."
        ],
        takeaway: "Monthly ROI reports make your retainer indispensable. When clients see verified labor savings, they never cancel."
      },
      {
        lesNum: 7,
        title: "Capstone Project: Scaling Your Autonomous Agent Agency to $10K/Month",
        duration: "15m",
        summary: "Synthesize all 7 modules, launch your outreach campaign, and scale your autonomous agent business to $10,000/month.",
        bulletPoints: [
          "The Complete Agency Flywheel: Outreach -> Discovery -> 7-Day Sprint -> Monthly Retainer -> Client Expansion & Referrals.",
          "Managing 8 Retainers in 15 Hours: Using centralized monitoring and automated diagnostics to maintain high operational leverage.",
          "Building Long-Term Enterprise Value: Transitioning from a solo operator to an elite AI automation consultancy.",
          "Final Graduation Checkpoint: You now possess the exact blueprints to deploy 5 commercial agents and build a $10K/month business."
        ],
        takeaway: "You have the complete technical blueprints and commercial playbook. Execute with discipline and scale your agency."
      }
    ]
  }
];

module.exports = {
  courseTitle,
  courseId,
  courseSlug,
  modulesData,
};
