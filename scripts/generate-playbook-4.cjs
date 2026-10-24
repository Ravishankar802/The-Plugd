const fs = require('fs');
const path = require('path');
const { createLesson } = require('./curriculum-builder-helper.cjs');

const courseTitle = "Turn 1 AI Skill Into 4 Different Freelance Income Streams";
const courseId = "ai-businesses-04";
const courseSlug = "turn-1-ai-skill-into-4-different-freelance-income-streams";

const modulesData = [
  {
    num: 1,
    id: "module-01",
    title: "The Core Master Skill — Advanced System Prompting & Architecture",
    duration: "1h 45m",
    description: "Master the single high-leverage skill that powers all 4 income streams: structured prompt engineering, JSON schemas, and deterministic workflow design.",
    lessons: [
      {
        lesNum: 1,
        title: "The 1-Skill Thesis: Why System Prompt Engineering Powers 4 Cash Flows",
        duration: "15m",
        summary: "Understand how deep mastery of structured LLM system prompting enables you to build sprints, retainers, audits, and digital products.",
        bulletPoints: [
          "The Freelancer Trap: Spreading your attention across 10 mediocre skills versus mastering 1 high-leverage capability.",
          "What System Prompt Engineering Really Is: Authoring deterministic operational constraints, evaluation logic, and JSON schemas.",
          "The Commercial Multiplier: How the same core capability packages into four distinct price points and client segments.",
          "Escaping Commoditization: Why business clients pay $3,000 for structured systems while ignoring $25/hour prompt typists."
        ],
        takeaway: "Master one high-leverage skill deeply. When you master system architecture, you unlock multiple independent revenue streams."
      },
      {
        lesNum: 2,
        title: "Role Grounding, Strict Persona Boundaries & Domain Authority",
        duration: "15m",
        summary: "Engineer professional system prompts that establish clear operational authority, domain boundaries, and zero-drift persona.",
        bulletPoints: [
          "Contextual Grounding: Establishing the operational mandate, business domain, and technical authority in the system prompt.",
          "Persona Consistency: Preventing conversational drift across extended multi-turn interactions.",
          "Constraint Hierarchies: Defining explicit priority tiers when client instructions conflict with safety rules.",
          "Tone & Formatting Governance: Ensuring outputs match corporate enterprise standards."
        ],
        takeaway: "Rigorous role grounding ensures your AI tools perform like senior specialists rather than generic chatbots."
      },
      {
        lesNum: 3,
        title: "Zero-Hallucination Frameworks: Negative Constraints & Grounding",
        duration: "15m",
        summary: "Implement strict negative constraints, factual boundaries, and confidence flags that prevent factual errors.",
        bulletPoints: [
          "The Negative Constraint Pattern: Explicitly listing what the model must NEVER do, assume, or fabricate.",
          "Grounding Against Source Context: Forcing the model to cite verifiable facts from provided client documents.",
          "Confidence Scoring Output: Requiring the model to return a certainty score from 0.0 to 1.0 with its extraction.",
          "Fallback Triggering: Automatically signaling when external data is required before an action can be completed."
        ],
        takeaway: "Negative constraints and strict grounding eliminate business risk, giving clients the confidence to deploy automated systems."
      },
      {
        lesNum: 4,
        title: "Enforcing Strict JSON Schemas for Software Interoperability",
        duration: "15m",
        summary: "Master structured outputs and JSON schema definitions to ensure model outputs integrate seamlessly with APIs and databases.",
        bulletPoints: [
          "Structured Output Architecture: Using response_format with strict JSON schemas to eliminate syntax errors permanently.",
          "Schema Definition Rules: Requiring every property and setting additionalProperties: false to prevent schema drift.",
          "Data Type Parsing: Ensuring ISO dates, numbers, booleans, and arrays format predictably for databases.",
          "Eliminating Markdown Wrappers: Generating pure raw JSON payloads without annoying triple-backtick markdown blocks."
        ],
        takeaway: "Strict JSON schemas bridge the gap between creative language generation and deterministic enterprise databases."
      },
      {
        lesNum: 5,
        title: "Few-Shot Demonstration Engineering & Edge Case Handling",
        duration: "15m",
        summary: "Provide curated input-output demonstration pairs within prompts to guide models through ambiguous real-world edge cases.",
        bulletPoints: [
          "The Power of Few-Shot Examples: Demonstrating complex formatting and edge case handling through concrete examples.",
          "Negative Examples: Showing the model exactly what a rejected or malformed output looks like.",
          "Managing Diverse Formats: Teaching the model to handle variations in international dates, phone numbers, and address formats.",
          "Context Token Budgeting: Selecting 2 to 3 high-impact demonstration pairs to avoid unnecessary token consumption."
        ],
        takeaway: "Two well-crafted few-shot examples do more to align model behavior than three pages of abstract instructions."
      },
      {
        lesNum: 6,
        title: "Chain-of-Thought Decomposition for Multi-Step Complex Decisions",
        duration: "15m",
        summary: "Guide models through explicit reasoning steps before generating final outputs to drastically reduce cognitive errors.",
        bulletPoints: [
          "Thinking Steps: Forcing the model to analyze evidence, evaluate criteria, and verify constraints before answering.",
          "Separating Reasoning from Output: Extracting internal thinking tokens into a private audit block before presenting client outputs.",
          "Error Reduction Benchmarks: Why step-by-step cognitive decomposition reduces logic failures by over 70%.",
          "Production Efficiency: Balancing reasoning depth against latency requirements in live customer-facing workflows."
        ],
        takeaway: "Structured chain-of-thought reasoning elevates model accuracy from amateur guessing to professional analysis."
      },
      {
        lesNum: 7,
        title: "Module 1 Checkpoint: Building Your Master System Prompt Library",
        duration: "15m",
        summary: "Assemble and test your reusable modular prompt templates that will serve as the engine for all 4 income streams.",
        bulletPoints: [
          "The Modular Prompt Repository: Storing tested system prompts, tool schemas, and evaluation constraints in an organized library.",
          "Version Control for Prompts: Tracking revisions, benchmark test results, and client customizations.",
          "The 4-Stream Readiness Test: Validating that your core prompt engine is ready to power sprints, retainers, audits, and products.",
          "Module 1 Milestone: You now possess the foundational master skill. Let's monetize it across Stream 1."
        ],
        takeaway: "Your master prompt library is your most valuable intellectual property. Organize it with care and deploy it across all 4 streams."
      }
    ]
  },
  {
    num: 2,
    id: "module-02",
    title: "Income Stream 1 — Done-For-You Workflow Automation Sprints ($1,500–$3,500)",
    duration: "1h 45m",
    description: "Package your core skill into rapid 5-day fixed-price implementation sprints that solve specific operational bottlenecks.",
    lessons: [
      {
        lesNum: 1,
        title: "The 5-Day Sprint Model: Why Fast Delivery Commands Premium Pricing",
        duration: "15m",
        summary: "Understand why clients eagerly pay $2,500 for a 5-day delivery sprint while hesitating on 6-month consulting engagements.",
        bulletPoints: [
          "Speed as a Value Metric: Business owners want operational relief this week, not next quarter.",
          "Fixed-Scope Discipline: Limiting the sprint strictly to one core operational bottleneck to guarantee rapid completion.",
          "Eliminating Proposal Drag: Using productized sprint packages to close deals on a single discovery call.",
          "High Effective Hourly Rate: Delivering a $2,500 sprint in 8 to 12 total hours yields $200-$300/hour."
        ],
        takeaway: "Speed is a premium feature. Delivering a solved operational problem in 5 days commands respect and top-tier pricing."
      },
      {
        lesNum: 2,
        title: "Packaging Sprint Offer 1: The Inbound Lead Triage & Auto-Response Engine",
        duration: "15m",
        summary: "Complete blueprint for packaging and delivering speed-to-lead automation for sales teams for $2,000-$3,000.",
        bulletPoints: [
          "The Commercial Bottleneck: Sales teams taking 4+ hours to respond to inbound web inquiries, losing deals to competitors.",
          "The Sprint Scope: Webhook listener -> Apollo enrichment -> Claude qualification & proposal draft -> Slack alert & CRM sync.",
          "5-Day Delivery Schedule: Day 1 scope, Day 2 build, Day 3 test, Day 4 client walkthrough, Day 5 go-live.",
          "Pricing & Invoicing: $2,500 flat fee (50% deposit upfront, 50% upon successful staging demonstration)."
        ],
        takeaway: "The Inbound Triage sprint solves an immediate revenue bottleneck and is the easiest sprint to sell to any B2B company."
      },
      {
        lesNum: 3,
        title: "Packaging Sprint Offer 2: The Document Extraction & Accounting Pipeline",
        duration: "15m",
        summary: "Blueprint for packaging invoice and contract parsing workflows for finance departments for $3,000-$3,500.",
        bulletPoints: [
          "The Commercial Bottleneck: Finance clerks manually keying PDF invoice line items into accounting software.",
          "The Sprint Scope: Inbound email monitor -> Claude multimodal PDF parsing -> PO reconciliation -> QuickBooks draft sync.",
          "5-Day Delivery Schedule: Standardized delivery protocol ensuring zero disruption to client accounting systems.",
          "Pricing & Invoicing: $3,500 flat fee with an attached $750/month ongoing maintenance retainer."
        ],
        takeaway: "Accounting automation delivers instant, measurable labor savings. Finance leaders easily justify the investment."
      },
      {
        lesNum: 4,
        title: "Packaging Sprint Offer 3: The Multi-Channel Content Repurposing Studio",
        duration: "15m",
        summary: "Blueprint for automating executive video, audio, and podcast repurposing into multi-platform social assets for $2,500.",
        bulletPoints: [
          "The Commercial Bottleneck: Founders and marketing teams creating 1 video weekly but failing to distribute across LinkedIn and Twitter.",
          "The Sprint Scope: YouTube/Zoom ingestion -> Whisper transcription -> Claude hook extraction -> social post drafts in Airtable.",
          "5-Day Delivery Schedule: Connecting media feeds, configuring prompt tone templates, and testing automated drafts.",
          "Pricing & Invoicing: $2,500 setup fee plus $650/month ongoing content queue maintenance."
        ],
        takeaway: "Content repurposing gives marketing teams 10x distribution leverage without hiring expensive video editors."
      },
      {
        lesNum: 5,
        title: "The 5-Day Sprint Execution Protocol (Day 1 to Day 5 SOP)",
        duration: "15m",
        summary: "Master the exact daily operating procedure to deliver sprints systematically without stress or delays.",
        bulletPoints: [
          "Day 1 (Intake & Sandbox): Gathering credentials, establishing sandbox databases, and confirming boundary specifications.",
          "Day 2 (Core Build): Wiring visual scenarios in Make.com and configuring Claude system instructions.",
          "Day 3 (Stress Testing): Injecting edge-case payloads, testing error handlers, and tuning prompt parameters.",
          "Day 4 (Staging Walkthrough): Conducting a 30-minute recorded client demonstration in the staging environment.",
          "Day 5 (Go-Live & Transition): Swapping production credentials, verifying live execution, and securing final sign-off."
        ],
        takeaway: "A disciplined 5-day protocol ensures predictable delivery, delighted clients, and zero late-night emergency scrambles."
      },
      {
        lesNum: 6,
        title: "Managing Client Boundaries & Eliminating Mid-Sprint Scope Creep",
        duration: "15m",
        summary: "Protect your timeline and profit margins by enforcing strict boundaries when clients request extra features.",
        bulletPoints: [
          "The Scope Boundary Script: 'That is a fantastic feature idea! Let's log it for our Phase 2 sprint or monthly retainer.'",
          "Written Change Orders: Establishing an explicit $175/hour fee for any work outside the signed Statement of Work.",
          "Prerequisite Clause: Pausing the 5-day clock if the client takes longer than 24 hours to provide necessary API access.",
          "Client Respect: Professional boundaries position you as a serious enterprise partner rather than a subordinate freelancer."
        ],
        takeaway: "Boundaries protect your profit margins. Never do free out-of-scope work; log feature requests for the recurring retainer."
      },
      {
        lesNum: 7,
        title: "Module 2 Project: Executing Your First $2,500 Automation Sprint",
        duration: "15m",
        summary: "Finalize your sprint offer sheet, prepare your delivery templates, and simulate an end-to-end 5-day sprint execution.",
        bulletPoints: [
          "Your Packaged Sprint Asset: A polished 1-page sprint specification sheet ready to send to prospective clients.",
          "Pre-Built Starter Templates: Organizing your reusable Make.com blueprints and Airtable bases for rapid deployment.",
          "Financial Target: Closing 2 sprints monthly generates $5,000 to $7,000 in upfront cash flow.",
          "Stream 1 Milestone: You now have a proven done-for-you cash flow engine. Let's attach recurring retainers in Stream 2."
        ],
        takeaway: "Done-for-you sprints generate immediate upfront capital. Next, we turn these sprint clients into monthly recurring retainers."
      }
    ]
  },
  {
    num: 3,
    id: "module-03",
    title: "Income Stream 2 — Monthly Optimization & Maintenance Retainers ($750–$1,500/mo)",
    duration: "1h 45m",
    description: "Convert 80%+ of sprint clients into predictable, recurring monthly maintenance retainers that compound your income.",
    lessons: [
      {
        lesNum: 1,
        title: "The Retainer Compounding Flywheel: Why Retainers Beat Project Hunting",
        duration: "15m",
        summary: "Understand the financial peace and enterprise valuation created by recurring monthly maintenance agreements.",
        bulletPoints: [
          "The Freelancer Hamster Wheel: Starting from $0 every single month versus waking up with $8,000 in recurring retainer income.",
          "The Math of 10 Clients: Ten clients paying $1,000/month generates a predictable $120,000 annual baseline income.",
          "Client Psychology: Businesses gladly pay $1,000/month to guarantee that mission-critical automated pipelines never fail.",
          "Low Churn Mechanics: Why workflow automations become embedded in daily operations, keeping clients retained for 12+ months."
        ],
        takeaway: "Retainers provide financial freedom and peace of mind. Every sprint you sell must be designed to convert into a monthly retainer."
      },
      {
        lesNum: 2,
        title: "What the Retainer Covers: Software Uptime, Prompt Tuning & Bug Fixes",
        duration: "15m",
        summary: "Define explicit, low-effort retainer deliverables that provide massive client value while taking you under 2 hours monthly.",
        bulletPoints: [
          "24/7 Automated Health Monitoring: Webhook alert listeners notifying you immediately of external API errors.",
          "Prompt Optimization & Edge-Case Updates: Updating system prompts when clients encounter unusual customer queries.",
          "Database Hygiene & Archival: Pruning old records, managing Airtable formula efficiency, and auditing backups.",
          "Token & API Consumption Oversight: Managing Anthropic and OpenAI usage quotas to prevent surprise overages."
        ],
        takeaway: "Retainer maintenance takes 1 to 2 hours per client per month when properly automated, creating 90%+ gross profit margins."
      },
      {
        lesNum: 3,
        title: "The Seamless Transition: How to Pitch the Retainer on Day 4 of the Sprint",
        duration: "15m",
        summary: "Master the exact conversational script that effortlessly transitions sprint clients into ongoing monthly agreements.",
        bulletPoints: [
          "The Day 4 Staging Transition: 'Now that the system is built, we have two options for ongoing support and API governance.'",
          "Option A vs. Option B Framing: Option A (Client manages raw API errors themselves) vs. Option B (We guard and optimize the system monthly).",
          "The First Month Incentive: Offering the first 30 days of retainer maintenance included with the sprint fee to establish recurring billing.",
          "Automated Stripe Subscriptions: Setting up recurring credit card billing before the system goes live in production."
        ],
        takeaway: "Pitch the retainer before the project ends. Framing maintenance as system insurance makes acceptance natural."
      },
      {
        lesNum: 4,
        title: "Structuring 6-Month Minimum Commitments & Service Level Agreements",
        duration: "15m",
        summary: "Draft professional retainer agreements that establish 6-month commitments, SLA response times, and payment terms.",
        bulletPoints: [
          "Term Length Psychology: Establishing 6-month minimum initial commitments to filter out flaky clients and secure cash flow.",
          "Defining SLA Response Windows: Committing to a 4-hour response window for critical outages and 24 hours for minor tweaks.",
          "Scope Limitations: Limiting monthly retainer scope to 3 to 5 hours of minor tweaks, excluding full new workflow builds.",
          "Cancellation Policies: Requiring 30 days written notice prior to contract renewal terms."
        ],
        takeaway: "Clear retainer agreements establish professional boundaries and lock in predictable recurring revenue."
      },
      {
        lesNum: 5,
        title: "Proactive Monthly Health Checks That Justify Retainer Value",
        duration: "15m",
        summary: "Perform systematic 45-minute monthly audits that remind the client why your retainer is indispensable.",
        bulletPoints: [
          "The 45-Minute Audit Routine: Reviewing Make execution histories, clearing warning queues, and checking token consumption.",
          "Preventive Maintenance Logs: Documenting 2 to 3 minor optimizations completed during the month.",
          "Prompt Calibration: Testing model outputs against newly introduced client product lines or policy changes.",
          "Client Perception: Proactive communication demonstrates that you are actively guarding their systems."
        ],
        takeaway: "Proactive communication eliminates retainer churn. Never let a month pass without communicating system health."
      },
      {
        lesNum: 6,
        title: "Automated Monthly ROI Reports: Proving Value Every 30 Days",
        duration: "15m",
        summary: "Generate and send automated monthly PDF digests detailing exact hours saved, transactions processed, and dollars created.",
        bulletPoints: [
          "The 3 Core Metrics: Total executions logged, estimated administrative hours saved, and operational error rate.",
          "Automating the Report: Using Airtable data and Make.com to generate and email a branded PDF digest on the 1st of every month.",
          "The Executive Value Anchor: Reminding the CEO that your $850 retainer saved $4,200 in staff labor makes canceling impossible.",
          "Executive Testimonials: Using glowing monthly responses as case study material for new prospect outreach."
        ],
        takeaway: "When clients receive an automated report proving they saved $4,000 for an $850 fee, they remain retained for years."
      },
      {
        lesNum: 7,
        title: "Module 3 Project: Retainer Contract & Automated Reporting Pipeline",
        duration: "15m",
        summary: "Build your standardized retainer agreement template and configure your automated monthly client ROI reporting system.",
        bulletPoints: [
          "Standard Retainer Agreement: Your legal agreement template complete with SLA definitions and scope boundaries.",
          "Automated Monthly ROI Scenario: Make.com workflow pulling Airtable stats and generating branded client digests.",
          "Financial Milestone: Retaining 6 clients at $1,000/month provides a $6,000/month recurring income floor.",
          "Stream 2 Milestone: You now have a recurring income engine. Let's add high-margin Operational Audits in Stream 3."
        ],
        takeaway: "Recurring retainers are the foundation of agency wealth. Next, we add paid upfront audits to convert skeptical prospects."
      }
    ]
  },
  {
    num: 4,
    id: "module-04",
    title: "Income Stream 3 — Operational Audits & Feasibility Blueprints ($500–$1,200)",
    duration: "1h 45m",
    description: "Sell paid operational diagnostics that evaluate client bottlenecks, deliver visual architecture blueprints, and lead into sprints.",
    lessons: [
      {
        lesNum: 1,
        title: "The Paid Audit Strategy: Getting Paid to Pitch High-Ticket Sprints",
        duration: "15m",
        summary: "Understand why selling a low-friction $750 audit breaks through sales resistance and naturally leads into a $3,500 sprint.",
        bulletPoints: [
          "The Low-Commitment Gateway: Skeptical prospects who hesitate on a $3,500 sprint will happily buy a $750 diagnostic audit.",
          "Doctor-Patient Dynamic: A paid audit positions you as a diagnostic expert prescribing treatment rather than a pushy salesperson.",
          "Paid Sales Prospecting: You get paid $750 to uncover every operational problem in the client's business.",
          "The Conversion Rate: Over 70% of paid audit clients immediately roll the audit fee into the full implementation sprint."
        ],
        takeaway: "Paid audits eliminate sales resistance. You get paid to diagnose the client's business and naturally propose the implementation."
      },
      {
        lesNum: 2,
        title: "The 60-Minute Operational Discovery Interview Framework",
        duration: "15m",
        summary: "Conduct structured diagnostic interviews that uncover hidden friction, repetitive data tasks, and software silos.",
        bulletPoints: [
          "The 4 Diagnostic Pillars: Data Ingestion friction, Decision-Making bottlenecks, System Hand-off delays, and Reporting overhead.",
          "The 'Show Me Your Screen' Technique: Asking staff to perform their everyday tasks on screen to identify repetitive keystrokes.",
          "Quantifying Friction: Documenting exact weekly employee hours spent on copy-pasting, data formatting, and status checking.",
          "Building the Pain Inventory: Creating an itemized list of 5 to 10 operational bottlenecks ranked by financial cost."
        ],
        takeaway: "Watch what staff actually do, not what management thinks they do. Observing real workflows reveals massive automation opportunities."
      },
      {
        lesNum: 3,
        title: "Creating Visual System Architecture Blueprints in Whimsical / Miro",
        duration: "15m",
        summary: "Translate messy operational processes into clean, stunning visual flowcharts that make the automation solution obvious.",
        bulletPoints: [
          "The 'Current State vs. Future State' Canvas: Visually contrasting the broken chaotic manual flow with the elegant automated system.",
          "Standard Iconography: Using standardized visual badges for Triggers, LLM Reasoning Nodes, Database Stores, and Alerts.",
          "Color-Coded Friction: Highlighting manual human bottlenecks in red and automated autonomous steps in green.",
          "Executive Presentation: Designing diagrams clean enough to be included in boardroom presentations."
        ],
        takeaway: "Visual blueprints make abstract software concepts tangible. Clients can instantly see their future efficiency."
      },
      {
        lesNum: 4,
        title: "Drafting the Feasibility & ROI Report: Calculating Hard Labor Savings",
        duration: "15m",
        summary: "Compile audit findings into an authoritative 6-page executive report quantifying annual labor waste and implementation ROI.",
        bulletPoints: [
          "The Executive Summary: 1 page highlighting core operational bottlenecks and projected financial return.",
          "The Financial Waste Breakdown: Calculating current employee labor costs (e.g., 25 hrs/week x $35/hr = $45,500/year).",
          "Technical Feasibility Scoring: Rating each proposed automation by technical complexity vs. operational impact.",
          "The Implementation Roadmap: Presenting a phased rollout schedule over the next 30 to 60 days."
        ],
        takeaway: "A comprehensive ROI report makes the cost of doing nothing painful and the implementation fee look trivial."
      },
      {
        lesNum: 5,
        title: "The Audit Delivery Presentation: Converting the Audit into a $3,500 Sprint",
        duration: "15m",
        summary: "Deliver the audit findings on a 45-minute video call and seamlessly transition the client into your implementation sprint.",
        bulletPoints: [
          "The Presentation Structure: 15m review of current bottlenecks -> 15m visual architecture reveal -> 15m phased proposal.",
          "The Fee Roll-In Incentive: 'If you move forward with the implementation sprint within 7 days, we credit 100% of the $750 audit fee.'",
          "Eliminating Risk: The client feels like they received the audit for free if they move forward with implementation.",
          "Securing the Commitment: Closing the $3,500 sprint deposit directly on the delivery call."
        ],
        takeaway: "Crediting the audit fee toward the implementation sprint creates urgency and closes 70%+ of audit clients on the call."
      },
      {
        lesNum: 6,
        title: "Auditing Software Stacks for Security, API Access & Rate Limits",
        duration: "15m",
        summary: "Assess the client's current software subscriptions to verify API availability, webhook capabilities, and plan tiers.",
        bulletPoints: [
          "API Tier Verification: Checking if client CRM/software plans include REST API access or require subscription upgrades.",
          "Webhook Support Checks: Verifying whether software platforms support instant outgoing webhooks or require polling.",
          "Rate Limit Assessment: Ensuring anticipated data volumes will not breach external provider API throttling limits.",
          "Authentication Protocol Audit: Determining whether integrations require OAuth 2.0, API keys, or enterprise SSO."
        ],
        takeaway: "Checking API feasibility during the audit prevents unpleasant technical surprises during the implementation sprint."
      },
      {
        lesNum: 7,
        title: "Module 4 Project: Producing Your First Client Feasibility Blueprint",
        duration: "15m",
        summary: "Assemble your standardized audit intake questionnaire, visual blueprint template, and executive ROI report format.",
        bulletPoints: [
          "The Operational Audit Kit: Intake questionnaire, Whimsical diagram template, and 6-page executive report template.",
          "The $750 Audit Offer Sheet: 1-page marketing overview explaining the diagnostic audit deliverables and fee credit incentive.",
          "Financial Impact: Selling 2 audits monthly generates $1,500 in upfront revenue and pipeline for $7,000+ in implementation sprints.",
          "Stream 3 Milestone: You now have a low-friction diagnostic offering. Let's add passive Digital Assets in Stream 4."
        ],
        takeaway: "Paid audits provide immediate income while feeding your high-ticket sprint pipeline. Next, we build passive digital assets."
      }
    ]
  },
  {
    num: 5,
    id: "module-05",
    title: "Income Stream 4 — High-Value Digital SOPs & Template Assets ($150–$500 Passive)",
    duration: "1h 45m",
    description: "Package your tested workflow blueprints into premium digital templates and SOPs that generate recurring passive cash flow.",
    lessons: [
      {
        lesNum: 1,
        title: "The Digital Asset Opportunity: Monetizing Code & Blueprints You Already Built",
        duration: "15m",
        summary: "Discover how packaging client deliverables into reusable templates creates scalable, passive software income.",
        bulletPoints: [
          "Building Once, Selling 100 Times: Sanitizing and packaging client workflows into commercial template products.",
          "The Audience: DIY operators, junior freelancers, and tech-savvy business owners who cannot afford $3,500 sprints.",
          "Pricing Architecture: Selling premium, production-ready operational kits for $150 to $499 rather than cheap $10 ebooks.",
          "Passive Cash Flow: Generating $2,000-$4,000 monthly with near-zero ongoing fulfillment overhead."
        ],
        takeaway: "Every client workflow you build can be sanitized and repackaged into a premium digital asset that sells repeatedly."
      },
      {
        lesNum: 2,
        title: "Sanitizing Client Systems into Turnkey Commercial Templates",
        duration: "15m",
        summary: "Learn how to strip proprietary client data, replace credentials with placeholders, and export shareable blueprints.",
        bulletPoints: [
          "Data Sanitization Protocols: Removing all proprietary client names, customer PII, and specific business credentials.",
          "Airtable Base Sharing: Creating clean base snapshot links with dummy sample data illustrating proper usage.",
          "Make.com Blueprint Exports: Exporting scenario JSONs with standardized variable placeholders (e.g., {{YOUR_API_KEY}}).",
          "Prompt Template Documentation: Providing structured prompt instructions with clear variable insertion markers."
        ],
        takeaway: "Thorough sanitization protects client confidentiality while creating a plug-and-play asset for your template customers."
      },
      {
        lesNum: 3,
        title: "Authoring Comprehensive Video & Written Implementation SOPs",
        duration: "15m",
        summary: "Record detailed 20-minute Loom installation walkthroughs and author written setup documentation that eliminates support tickets.",
        bulletPoints: [
          "The Video Walkthrough Structure: 3m architecture overview -> 10m step-by-step setup -> 7m testing and verification.",
          "Step-by-Step Written Guides: Markdown documentation complete with screenshots, required field checklists, and FAQ.",
          "Common Error Troubleshooting: Proactively documenting the top 5 setup errors and how to resolve them in seconds.",
          "Self-Service Excellence: Comprehensive documentation ensures 95%+ of buyers install the template without asking for support."
        ],
        takeaway: "High-quality video and written SOPs transform a raw template into a premium product that buyers gladly review with 5 stars."
      },
      {
        lesNum: 4,
        title: "Product 1: The B2B Inbound Lead Triage Blueprint ($197)",
        duration: "15m",
        summary: "Package, document, and price the complete inbound qualification and proposal generation engine for commercial sale.",
        bulletPoints: [
          "Product Inclusions: Airtable CRM base, Make.com scenario blueprint, Claude 3.7 prompt templates, and 25-minute Loom tutorial.",
          "Target Buyers: Freelancers, boutique agencies, and sales consultants looking to install speed-to-lead for themselves or clients.",
          "Value Proposition: 'Install our proven $2,500 speed-to-lead engine in your business this afternoon for just $197.'",
          "Upsell Opportunity: Offering a $497 'Done-With-You' 1-hour installation call on the checkout thank-you page."
        ],
        takeaway: "A production-grade lead triage blueprint is a universally desirable asset that converts cold traffic consistently."
      },
      {
        lesNum: 5,
        title: "Product 2: The Accounts Payable Invoice Audit Kit ($297)",
        duration: "15m",
        summary: "Package the multimodal invoice extraction and PO reconciliation pipeline into a turnkey accounting kit.",
        bulletPoints: [
          "Product Inclusions: Airtable AP base, Claude vision extraction prompts, 3-way match logic, and QuickBooks integration guide.",
          "Target Buyers: Bookkeepers, fractional CFOs, and small accounting firms looking to offer automated AP services.",
          "Value Proposition: 'Automate invoice data entry and catch vendor billing errors with our turnkey Claude 3.7 AP kit.'",
          "High Perceived Value: Accounting workflows carry immense financial credibility, easily commanding $297."
        ],
        takeaway: "Financial templates carry high commercial value. Bookkeepers and consultants view $297 as a tiny investment for massive leverage."
      },
      {
        lesNum: 6,
        title: "Setting Up Your Digital Storefront on Lemon Squeezy / Gumroad",
        duration: "15m",
        summary: "Configure high-converting product checkout pages, automated license delivery, and affiliates with zero technical headaches.",
        bulletPoints: [
          "Merchant of Record Setup: Using Lemon Squeezy or Gumroad to handle global sales tax, VAT, and payments automatically.",
          "High-Converting Sales Copy: Structure: Big Problem -> Visual Blueprint Showcase -> Inclusions -> Social Proof -> Guarantee.",
          "Automated Customer Delivery: Instantly redirecting buyers to a clean Notion customer hub containing all assets and videos.",
          "Affiliate Program Configuration: Setting up a 30% affiliate program allowing students and collaborators to promote your products."
        ],
        takeaway: "Modern Merchant of Record platforms handle global tax and delivery effortlessly, leaving you free to focus on product quality."
      },
      {
        lesNum: 7,
        title: "Module 5 Project: Launching Your First Digital Operational Kit",
        duration: "15m",
        summary: "Publish your first sanitized operational template, record the setup SOP, and launch your digital checkout page.",
        bulletPoints: [
          "Completed Digital Product: Sanitized blueprint JSON, Airtable base template, 20-minute Loom SOP, and Notion delivery page.",
          "Live Checkout Page: Branded Lemon Squeezy / Gumroad sales page ready to process customer orders.",
          "Passive Revenue Milestone: Selling 15 templates monthly generates $3,000 to $4,500 in 100% margin recurring cash flow.",
          "Stream 4 Milestone: You have unlocked passive leverage. Now let's connect all 4 streams in a cohesive marketing engine."
        ],
        takeaway: "Digital products provide passive income and establish your industry authority. Next, we master client acquisition."
      }
    ]
  },
  {
    num: 6,
    id: "module-06",
    title: "Portfolio Showcase, Pricing Psychology & B2B Client Acquisition",
    duration: "1h 45m",
    description: "Build an irresistible portfolio showcase, master consultative sales psychology, and acquire high-ticket clients consistently.",
    lessons: [
      {
        lesNum: 1,
        title: "Building a Proof-First Portfolio Showcase Without Past Case Studies",
        duration: "15m",
        summary: "Create compelling proof of capability using live interactive sandbox demonstrations and visual architecture blueprints.",
        bulletPoints: [
          "The Cold Start Problem: How to demonstrate elite competence when you haven't worked with Fortune 500 brands yet.",
          "The Interactive Sandbox Showcase: Embedding live Airtable and Softr demos that prospective clients can click and test.",
          "Visual Architecture Case Studies: Publishing detailed breakdowns of complex workflows you built during this course.",
          "Proof-First Positioning: 'We don't sell theories; here is the live system running in real time.'"
        ],
        takeaway: "A working interactive demo is infinitely more convincing than a PDF of logos. Let prospects experience your software."
      },
      {
        lesNum: 2,
        title: "The Trojan Horse Video Strategy: The Highest-Converting Outbound Engine",
        duration: "15m",
        summary: "Master the 5-minute personalized Loom audit framework that books high-ticket discovery calls on autopilot.",
        bulletPoints: [
          "The Trojan Horse Concept: Diagnosing a specific operational bottleneck on the prospect's website on camera.",
          "The 5-Minute Formula: 45s compliment & friction test -> 2m visual blueprint reveal -> 2m ROI projection & soft CTA.",
          "The Interactive Hook: Submitting a test lead on their form and recording the lack of immediate automated response.",
          "The Low-Friction Call to Action: Offering to share the visual workflow blueprint on a no-pressure 15-minute diagnostic call."
        ],
        takeaway: "Personalized video audits demonstrate immediate value and book discovery calls with 30%+ response rates."
      },
      {
        lesNum: 3,
        title: "Cold Email & LinkedIn Outreach Frameworks That Generate Inbound Demand",
        duration: "15m",
        summary: "Deploy short, hyper-personalized outreach sequences that generate warm replies from executive decision-makers.",
        bulletPoints: [
          "The Permission-First Cold Email: Short, 3-sentence email asking permission to send the personalized video audit.",
          "LinkedIn Social Selling: Connecting with founders, commenting on operational pain points, and sharing workflow breakdowns.",
          "Follow-Up Cadence: A 4-step sequence across 14 days combining soft check-ins with relevant customer ROI case studies.",
          "Inbox Hygiene: Setting up dedicated secondary domains, DKIM/SPF records, and warm-up tools to maintain 99% deliverability."
        ],
        takeaway: "Ask for permission to share value rather than pitching immediately. Conversational outreach turns cold prospects into buyers."
      },
      {
        lesNum: 4,
        title: "The 4-Part Discovery Call: Diagnosing Client Pain and Closing on the Call",
        duration: "15m",
        summary: "Execute consultative discovery conversations that lead clients to calculate their own operational waste and demand your solution.",
        bulletPoints: [
          "Phase 1 (Diagnostic Rapport): Asking probing questions about current software friction and administrative time drains.",
          "Phase 2 (Quantifying the Waste): Guiding the client to articulate: 'This manual copy-pasting costs us $35,000 annually.'",
          "Phase 3 (Visual Blueprint Reveal): Sharing your screen to present the customized 3-tool architecture solving their exact bottleneck.",
          "Phase 4 (Collaborative Closing): Offering two tiered options and securing agreement on the 5-day implementation sprint."
        ],
        takeaway: "When the client calculates their own financial waste, your $3,500 implementation fee becomes an obvious, low-risk decision."
      },
      {
        lesNum: 5,
        title: "Overcoming Pricing Objections & Technical Skepticism",
        duration: "15m",
        summary: "Master the exact responses to handle 'That seems expensive', 'Can we build this ourselves?', and 'Is AI secure?'.",
        bulletPoints: [
          "The 'Too Expensive' Reframe: Anchoring against annual employee labor costs: '$3,500 once to eliminate $30,000 in annual labor waste.'",
          "The 'We Can Build It Internally' Reframe: 'Your engineers can build it in 4 months; we deploy a battle-tested system on Monday.'",
          "The Security & Compliance Reframe: Explaining that business API calls are encrypted and never used for model training.",
          "The Reversal Guarantee: Offering milestone sign-off in staging before production migration."
        ],
        takeaway: "Objections are requests for clarification. Confidently reframing value turns skeptical prospects into enthusiastic buyers."
      },
      {
        lesNum: 6,
        title: "Drafting Frictionless Statements of Work & Retainer Agreements",
        duration: "15m",
        summary: "Protect your time and profit margins with clean Statements of Work, scope boundaries, and recurring billing terms.",
        bulletPoints: [
          "Key SOW Clauses: Defining explicit deliverables, milestone delivery dates, client prerequisites, and acceptance criteria.",
          "Scope Creep Defense: Limiting revisions to 2 rounds and specifying a $175/hour fee for out-of-scope feature requests.",
          "Payment Terms: Enforcing 50% deposit upfront before work begins and 50% upon completed staging demonstration.",
          "Recurring Retainer Clause: Bundling ongoing maintenance and API monitoring directly into the agreement."
        ],
        takeaway: "Clear contracts prevent scope creep, protect cash flow, and ensure a smooth, professional client relationship."
      },
      {
        lesNum: 7,
        title: "Module 6 Project: Launching Your Outbound Client Acquisition Sprint",
        duration: "15m",
        summary: "Source 50 verified target accounts, record 10 personalized Loom audits, and book your first 3 client discovery calls.",
        bulletPoints: [
          "Prospect List Assembly: Curating 50 targeted B2B companies with verified decision-maker emails in your niche.",
          "Batch Video Production: Recording 10 personalized Loom audits using the proven 5-minute formula in a single afternoon.",
          "Campaign Dispatch: Enrolling prospects into customized outreach sequences with active response tracking.",
          "Milestone Objective: Securing at least 3 discovery calls and closing your first $2,500+ implementation sprint."
        ],
        takeaway: "Consistent outreach creates consistent revenue. Execute this campaign and sign your first high-ticket sprint client."
      }
    ]
  },
  {
    num: 7,
    id: "module-07",
    title: "Income Diversification, Time Management & Scaling to $12,000/Month",
    duration: "1h 45m",
    description: "Synthesize all 4 income streams into an integrated $12,000/month business operating in under 25 hours per week.",
    lessons: [
      {
        lesNum: 1,
        title: "The $12,000/Month Revenue Architecture: Balancing the 4 Streams",
        duration: "15m",
        summary: "Deconstruct the exact multi-stream portfolio model that delivers $12,000/month with high profit margins and stability.",
        bulletPoints: [
          "The Revenue Mix: Stream 1 (1 Sprint @ $3,000) + Stream 2 (6 Retainers @ $1,000 = $6,000) + Stream 3 (1 Audit @ $750) + Stream 4 (10 Templates @ $250 = $2,500).",
          "Total Monthly Income: $12,250/month across diversified, uncorrelated income streams.",
          "Anti-Fragile Positioning: If sprint sales slow down, retainers and digital products maintain your income baseline.",
          "Capital Reinvestment: Reinvesting profits into outbound automation tools and premium development sandboxes."
        ],
        takeaway: "A balanced 4-stream portfolio delivers stability, high margins, and complete immunity from client dry spells."
      },
      {
        lesNum: 2,
        title: "Weekly Time Allocation: Operating All 4 Streams in 25 Hours/Week",
        duration: "15m",
        summary: "Organize your weekly calendar to manage client delivery, retainer maintenance, and template marketing efficiently.",
        bulletPoints: [
          "Monday (Client Delivery Sprints): 6 hours dedicated to building and testing active client sprint scenarios.",
          "Tuesday & Wednesday (Client Communications & Demos): 5 hours for discovery calls, staging reviews, and audits.",
          "Thursday (Retainer Health Checks & Support): 4 hours conducting monthly system audits and automated reporting.",
          "Friday (Product Marketing & Outbound): 5 hours recording Loom audits and updating digital template products."
        ],
        takeaway: "Time blocking protects your focus. A disciplined 25-hour weekly schedule ensures high revenue without burnout."
      },
      {
        lesNum: 3,
        title: "Automating Your Own Agency: Using the 3 Tools on Your Business",
        duration: "15m",
        summary: "Deploy Airtable, Claude, and Make.com to automate your own inbound lead triage, invoicing, and client reporting.",
        bulletPoints: [
          "Eating Your Own Cooking: Using your flagship Inbound Triage system to qualify and respond to your own agency leads.",
          "Automated Invoicing & Collections: Using Stripe webhooks to trigger automated receipts and payment reminder notices.",
          "Client Onboarding Automation: Automatically generating project boards and Airtable bases upon contract signing.",
          "Operational Leverage: Running a 6-figure agency as a solo operator with zero full-time employees."
        ],
        takeaway: "Automate your own business first. Running your agency on the 3-tool architecture provides the ultimate case study."
      },
      {
        lesNum: 4,
        title: "Upselling Sprint Clients into Secondary Workflows & Enterprise Retainers",
        duration: "15m",
        summary: "Expand client accounts organically by identifying secondary operational bottlenecks during monthly retainer reviews.",
        bulletPoints: [
          "The Natural Expansion Path: Once a client experiences the ROI of their first sprint, they ask: 'What else can we automate?'.",
          "Quarterly Strategy Audits: Conducting 30-minute quarterly reviews to map out their next high-priority operational workflow.",
          "Packaging Phase 2 Sprints: Selling secondary $3,000 implementation sprints to existing retained clients.",
          "Retainer Value Compounding: Increasing monthly retainer fees from $850 to $1,500 as you manage multiple client pipelines."
        ],
        takeaway: "Existing clients are your easiest source of new revenue. Delivering exceptional ROI creates endless expansion opportunities."
      },
      {
        lesNum: 5,
        title: "Building Long-Term Enterprise Equity vs. Freelance Labor",
        duration: "15m",
        summary: "Transition your mindset from a commoditized hourly freelancer to the founder of a high-value software-enabled consultancy.",
        bulletPoints: [
          "The Freelancer vs. Founder Mindset: Freelancers trade hours for dollars; founders build scalable systems, retainers, and assets.",
          "Enterprise Value Creation: A business with $8,000 in monthly recurring contract revenue has tangible saleable enterprise value.",
          "Brand Positioning: Positioning your agency as the specialized automation authority for your chosen industry vertical.",
          "Long-Term Career Freedom: Operating a business that delivers location independence, financial security, and personal autonomy."
        ],
        takeaway: "Stop thinking like a freelancer. You are building an enduring, valuable software-enabled automation business."
      },
      {
        lesNum: 6,
        title: "Continuous Learning & Staying Ahead of Frontier AI Shifts",
        duration: "15m",
        summary: "Keep your skills sharp as models evolve, adopting new frontier capabilities without breaking client production systems.",
        bulletPoints: [
          "The Fast-Moving Frontier: Monitoring major model releases from Anthropic, OpenAI, and open-source ecosystems.",
          "Testing New Models in Sandboxes: Benchmarking reasoning improvements in isolated staging environments before production rollouts.",
          "Graceful Model Upgrades: Swapping model names in Make.com HTTP headers to give clients instant performance boosts.",
          "Positioning as an Advisor: Guiding clients through AI hype and prescribing practical, reliable tools that actually work."
        ],
        takeaway: "Clients rely on you to navigate the fast-moving AI landscape. Your guidance and judgment are your greatest assets."
      },
      {
        lesNum: 7,
        title: "Capstone Project: Your Integrated $12,000/Month Business Blueprint",
        duration: "15m",
        summary: "Synthesize all 7 modules into your master operational roadmap and cross the $12,000/month recurring revenue milestone.",
        bulletPoints: [
          "The 4-Stream Operational Engine: Master Prompting -> 5-Day Sprints -> Monthly Retainers -> Paid Audits -> Digital Products.",
          "Your Complete Agency Portfolio: Packaged offers, SOW contracts, Loom audit scripts, and automated client reporting systems.",
          "The 90-Day Execution Plan: Specific weekly milestones to sign your first 3 sprint clients and cross $10,000-$12,000/month.",
          "Final Graduation Checkpoint: You now possess the complete architecture, tools, and sales engine to achieve true financial freedom."
        ],
        takeaway: "You have mastered the complete 4-stream business model. Execute with consistency, deliver genuine value, and enjoy your success."
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
