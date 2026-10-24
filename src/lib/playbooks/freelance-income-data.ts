import type { Course, Module, Lesson } from "../playbooks-data";
import type { PlaybookDetailData, PlaybookDetailModule } from "../dating-playbook-detail";

export const FREELANCE_INCOME_SLUG = "turn-1-ai-skill-into-4-different-freelance-income-streams";
export const FREELANCE_INCOME_ID = "ai-businesses-04";

const modulesMetadata = [
  {
    id: "module-01",
    number: "01",
    title: "The Anchor Skill: Structured Extraction & Knowledge AI",
    description: "Master the commercially valuable anchor skill: transforming unstructured business data into clean, structured operating systems.",
    duration: "50m",
    lessons: [
      {
        id: "01-1",
        number: "1.1",
        title: "Choosing Your Anchor Skill: High-Value B2B Capabilities",
        duration: "13m",
        summary: "Identify the exact AI capability businesses pay top dollar for: Structured Document Extraction & Workflow Orchestration.",
        slides: [
          {
            title: "Why Most AI Freelancers Struggle to Make Money",
            subtitle: "The fatal trap of selling generic 'AI consulting' vs solving a specific commercial problem",
            bulletPoints: [
              "Freelancers pitching 'I can prompt ChatGPT for you' compete with free tools and low-cost gig platforms.",
              "Commercial buyers have specific, expensive bottlenecks: Unstructured PDFs, messy CRM databases, and delayed customer quoting.",
              "The High-Leverage Anchor Skill: Mastering Structured Data Extraction & Workflow Orchestration using frontier LLMs.",
              "Once you master this single technical skill, you can package it into 4 completely distinct commercial products with different pricing models.",
            ],
            takeaway: "Master one high-leverage technical capability, then multiply its value through multiple offer structures.",
          },
          {
            title: "The Anatomy of the Anchor Skill",
            subtitle: "Converting messy human communications into structured, actionable JSON data",
            bulletPoints: [
              "Prompt Engineering for Deterministic Schemas: Enforcing strict Pydantic/JSON output models without conversational fluff.",
              "Multimodal Parsing: Reading scanned vendor bills, handwritten trade estimates, and complex legal agreements.",
              "Error Handling & Confidence Scoring: Automatically flagging low-confidence extractions for human review.",
              "Connector Architecture: Passing validated data into Airtable, PostgreSQL, QuickBooks, or HubSpot.",
            ],
            takeaway: "Businesses don't pay for text generation—they pay for clean data that moves their operations forward.",
          },
        ],
        writtenContent: "In-depth guide on selecting an enterprise-grade anchor skill and why structured data extraction offers the highest monetization leverage.",
      },
      {
        id: "01-2",
        number: "1.2",
        title: "Setting Up Your Development Sandbox: Claude, Make & Airtable",
        duration: "12m",
        summary: "Build your standard reusable operating stack to test prompts, inspect JSON payloads, and manage database schemas.",
        slides: [
          {
            title: "The Reusable Freelancer Stack",
            subtitle: "Zero-cost local infrastructure to build and test client deliverables",
            bulletPoints: [
              "Claude Developer Workbench: System prompt iteration, temperature tuning, and test case evaluation.",
              "Make.com Visual Router: Rapid prototyping of webhook endpoints and API integrations.",
              "Airtable Schema Templates: Reusable base architectures that can be duplicated into client workspaces in seconds.",
              "Security Hygiene: Managing client API keys through environment variables and secret managers.",
            ],
            takeaway: "Standardize your tools so every new client project builds upon your existing library of assets.",
          },
        ],
        writtenContent: "Technical setup checklist for configuring the sandbox environment and reusable base templates.",
      },
      {
        id: "01-3",
        number: "1.3",
        title: "The 4-Stream Monetization Framework: Active, Recurring, Diagnostic, Passive",
        duration: "12m",
        summary: "Understand the financial and operational trade-offs of the 4 income streams and how they feed into each other.",
        slides: [
          {
            title: "The 4-Stream Revenue Engine",
            subtitle: "How one single skill generates cashflow, recurring stability, and passive income",
            bulletPoints: [
              "Stream 1: Done-For-You Implementation Sprints ($2,500 flat fee for rapid cashflow).",
              "Stream 2: Monthly Retainers & Maintenance ($800–$1,200/mo for predictable baseline recurring revenue).",
              "Stream 3: Diagnostic Audits & Advisory ($500 for low-friction discovery and client qualification).",
              "Stream 4: Reusable Template Hubs & Assets ($97–$297 for passive top-of-funnel lead generation).",
            ],
            takeaway: "A multi-stream model eliminates the feast-or-famine cycle typical of traditional freelancing.",
          },
        ],
        writtenContent: "Financial models and unit economics comparing hourly billing against the 4-stream ecosystem.",
      },
      {
        id: "01-4",
        number: "1.4",
        title: "Time Allocation & Balancing High-Ticket Sprints with Passive Assets",
        duration: "13m",
        summary: "Structure your weekly working hours so client delivery never prevents you from building long-term recurring assets.",
        slides: [
          {
            title: "The 50/30/20 Freelance Operating Schedule",
            subtitle: "Managing client work, retainer support, and business development in under 30 hours/week",
            bulletPoints: [
              "50% Focus Time (15 hrs/wk): Dedicated deep work on active high-ticket client implementation sprints.",
              "30% Retainer Operations (9 hrs/wk): Monitoring client logs, optimization updates, and client check-in reports.",
              "20% Asset Creation (6 hrs/wk): Refining template products, case study documentation, and outbound outreach.",
              "Setting hard boundary days: Tuesday and Thursday for client delivery; Wednesday for audits; Friday for retainer reports.",
            ],
            takeaway: "Disciplined scheduling protects your focus and ensures recurring assets continue to compound.",
          },
        ],
        writtenContent: "Calendar templates, weekly review checklists, and operational boundary SOPs for freelancers.",
      },
    ],
  },
  {
    id: "module-02",
    number: "02",
    title: "Income Stream #1: High-Ticket Implementation Sprints",
    description: "Package your anchor skill into a standardized 7-day Done-For-You Sprint selling for $2,000 to $4,000 flat.",
    duration: "48m",
    lessons: [
      {
        id: "02-1",
        number: "2.1",
        title: "Structuring the $2,500 DFY Sprint: The 'One Pain Point' Rule",
        duration: "12m",
        summary: "Define a tight, bounded implementation offer that solves a single expensive operational problem in under 7 business days.",
        slides: [
          {
            title: "The 'One Pain Point' Sprint Offer",
            subtitle: "Why narrow scope allows high prices and rapid delivery",
            bulletPoints: [
              "Never sell 'general AI consulting': Sell 'The 48-Hour Inbound Proposal Generator' or 'The Automated Invoice Intake Hub'.",
              "Fixed Scope Boundaries: Exactly 1 primary workflow, up to 3 tool connectors, and 2 rounds of revision.",
              "The $2,500 Price Point: High enough to deliver serious focus, low enough for department heads to approve without procurement committees.",
              "The 7-Day Guarantee: Delivering a working, tested production system within 7 business days of account access.",
            ],
            takeaway: "Specific deliverables with strict boundaries protect you from scope creep and build client trust.",
          },
        ],
        writtenContent: "Sample offer documents, scope boundary clauses, and client sprint agreements.",
      },
      {
        id: "02-2",
        number: "2.2",
        title: "Drafting Bulletproof Statements of Work (SOWs) and Milestones",
        duration: "12m",
        summary: "Protect your profit margins with battle-tested SOW contracts that outline exact deliverables, deadlines, and client responsibilities.",
        slides: [
          {
            title: "Bulletproof SOW Contract Architecture",
            subtitle: "The legal and operational clauses that prevent unpaid revisions",
            bulletPoints: [
              "Deliverable Definition: Listing the exact Airtable bases, Make scenarios, and webhook endpoints included.",
              "Explicit Exclusions: What is NOT included (e.g. custom mobile apps, legacy database migrations).",
              "Client Responsibilities: Providing API credentials and approving milestones within 48 hours.",
              "Payment Structure: 50% upfront deposit ($1,250) prior to kickoff; 50% on live demonstration before final handover.",
            ],
            takeaway: "Clear contracts make client relationships friendly, professional, and profitable.",
          },
        ],
        writtenContent: "Complete copy-paste SOW template with milestones, payment terms, and revision limits.",
      },
      {
        id: "02-3",
        number: "2.3",
        title: "Rapid Sprint Execution: 7 Days from Kickoff to Final Delivery",
        duration: "12m",
        summary: "Follow the day-by-day sprint execution workflow to deliver flawless automation systems without working late nights.",
        slides: [
          {
            title: "The 7-Day Sprint Delivery Playbook",
            subtitle: "A systematic engineering protocol that cuts build time by 60%",
            bulletPoints: [
              "Day 1: Kickoff questionnaire and credential verification.",
              "Day 2: Schema architecture and data modeling in Airtable.",
              "Day 3: Webhook routing and prompt formulation in Make.com.",
              "Day 4: Integration testing with 20 real client sample records.",
              "Day 5: Interface design and staff approval button setup.",
              "Day 6: Live client demonstration and feedback adjustments.",
              "Day 7: Final deployment, handover video, and retainer pitch.",
            ],
            takeaway: "Systematize your delivery so execution becomes predictable, calm, and repeatable.",
          },
        ],
        writtenContent: "Day-by-day sprint checklist, test data generation techniques, and client handover video scripts.",
      },
      {
        id: "02-4",
        number: "2.4",
        title: "Transitioning Sprint Clients into Monthly Retainers",
        duration: "12m",
        summary: "Execute the seamless handover script that turns 60%+ of sprint clients into long-term monthly retainer accounts.",
        slides: [
          {
            title: "The Post-Sprint Retainer Bridge",
            subtitle: "How to pitch ongoing support at the moment of maximum client satisfaction",
            bulletPoints: [
              "The Handover Meeting: Celebrating the successful deployment and showing the initial hours saved.",
              "The Operational Reality: Software APIs change, prompts require tuning as edge cases occur, and teams need ongoing support.",
              "The Offer: 'We can manage this completely for $850/month so your team never has to worry about broken workflows.'",
              "First 30 Days Free Incentive: Applying the second half of the setup fee as credit toward a 3-month retainer.",
            ],
            takeaway: "The easiest time to sell a retainer is immediately following a flawless implementation sprint.",
          },
        ],
        writtenContent: "Handover meeting scripts, transition email templates, and retainer conversion frameworks.",
      },
    ],
  },
  {
    id: "module-03",
    number: "03",
    title: "Income Stream #2: Recurring Monthly Retainers",
    description: "Build a dependable $5,000–$10,000 monthly income floor by packaging monitoring, prompt optimization, and workflow maintenance.",
    duration: "48m",
    lessons: [
      {
        id: "03-1",
        number: "3.1",
        title: "What Clients Actually Pay For in an AI Maintenance Retainer",
        duration: "12m",
        summary: "Demystify retainer deliverables: API cost monitoring, edge-case resolution, prompt tuning, and priority support SLAs.",
        slides: [
          {
            title: "The Anatomy of a High-Retention Retainer",
            subtitle: "Why non-technical business owners happily pay $750–$1,500 every month",
            bulletPoints: [
              "Peace of Mind: Knowing an expert is monitoring their mission-critical business automation 24/7.",
              "Error Resolution: Fixing unexpected format changes or failed webhooks before management notices.",
              "Prompt Tuning: Adjusting model parameters as new edge cases arise in production.",
              "Monthly Value Reports: Demonstrating exact hours and dollars saved every month.",
            ],
            takeaway: "Retainers sell operational security, continuous reliability, and technical accountability.",
          },
        ],
        writtenContent: "Detailed breakdown of monthly retainer service items, SLA definitions, and scope boundaries.",
      },
      {
        id: "03-2",
        number: "3.2",
        title: "The Friday 4:00 PM ROI Report: The Secret to Multi-Year Retention",
        duration: "12m",
        summary: "Automate the weekly performance email that visibly proves your ongoing value and keeps retainers active for years.",
        slides: [
          {
            title: "The Automated Friday Value Digest",
            subtitle: "The simple reporting habit that makes your agency indispensable",
            bulletPoints: [
              "Automated metrics extraction: Number of records processed, tasks completed, and hours saved.",
              "System Health Status: 99.8% uptime, zero unresolved errors, and average processing latency.",
              "Human touch note: 2 sentences highlighting a specific edge case resolved during the week.",
              "Delivered every Friday at 4:00 PM like clockwork directly to the client's inbox.",
            ],
            takeaway: "If clients don't see your ongoing value, they cancel. Automated reports make value tangible.",
          },
        ],
        writtenContent: "Make.com scenario blueprint for compiling and dispatching weekly ROI reports automatically.",
      },
      {
        id: "03-3",
        number: "3.3",
        title: "Managing 10 Retainers in Under 10 Hours a Week",
        duration: "12m",
        summary: "Build an internal centralized agency monitoring hub that aggregates alerts across all client workspaces into a single dashboard.",
        slides: [
          {
            title: "The Centralized Monitoring Command Center",
            subtitle: "Managing multiple client deployments without logging into 10 different dashboards",
            bulletPoints: [
              "Centralized Slack Error Channel: Routing webhook failure notices across all client accounts into a private channel.",
              "Automated Fallback Queues: Storing failed payloads in an Airtable quarantine base for one-click reprocessing.",
              "Scheduled Weekly Review: Spending 45 minutes on Monday morning reviewing logs across all 10 accounts.",
              "High Leverage: 10 retainers at $900/month = $9,000/month recurring income for ~8 hours of actual work per week.",
            ],
            takeaway: "Centralized monitoring allows a solo freelancer to operate with the reliability of an enterprise team.",
          },
        ],
        writtenContent: "Technical guide to setting up centralized error handling webhooks and automated reprocessing queues.",
      },
      {
        id: "03-4",
        number: "3.4",
        title: "Retainer Agreements, Invoicing & Preventing Churn",
        duration: "12m",
        summary: "Handle auto-debit payments via Stripe Billing, write friendly terms, and manage retainer churn gracefully.",
        slides: [
          {
            title: "Retainer Billing & Churn Defense",
            subtitle: "Automating subscription billing and maintaining 90%+ client retention",
            bulletPoints: [
              "Automated Stripe Invoicing: Credit card on file charged automatically on the 1st of each month.",
              "No Long-Term Lock-in: 30-day cancellation notice lowers purchase hesitation and increases initial sign-ups.",
              "Quarterly Strategic Review: A 20-minute call every 90 days to identify the next high-value automation to build.",
              "Offboarding Grace: Handing over full documentation if a client ever cancels ensures they return when needs expand.",
            ],
            takeaway: "Frictionless billing and proactive communication keep churn below 5% annually.",
          },
        ],
        writtenContent: "Stripe recurring billing configurations, contract terms, and quarterly review frameworks.",
      },
    ],
  },
  {
    id: "module-04",
    number: "04",
    title: "Income Stream #3: Strategic Audits & Diagnostic Sessions",
    description: "Sell $500–$1,000 paid diagnostic sessions that qualify high-intent clients and eliminate unpaid sales proposals.",
    duration: "48m",
    lessons: [
      {
        id: "04-1",
        number: "4.1",
        title: "The 'AI Opportunity Audit': Packaging Paid Discovery",
        duration: "12m",
        summary: "Stop doing free consulting: Package a 60-minute diagnostic session that delivers an actionable technical roadmap.",
        slides: [
          {
            title: "Packaging the Paid Diagnostic Audit",
            subtitle: "How to stop pitching free proposals and get paid $500 to qualify clients",
            bulletPoints: [
              "The Problem: Unpaid proposals waste 10+ hours and position you as a desperate vendor.",
              "The Solution: The '90-Minute AI Operations Audit' ($500 flat fee).",
              "The Deliverable: A comprehensive technical diagram identifying their top 3 bottlenecks, tool recommendations, and ROI projections.",
              "The Incentive: If the client hires you for the $2,500 sprint, the $500 audit fee is credited toward the project.",
            ],
            takeaway: "Charging for discovery immediately filters out tire-kickers and establishes you as an authority.",
          },
        ],
        writtenContent: "The complete pitch script for paid audits, client qualification criteria, and booking workflows.",
      },
      {
        id: "04-2",
        number: "4.2",
        title: "Conducting the 60-Minute Operational Diagnostic Call",
        duration: "12m",
        summary: "Master the consultative questioning framework to uncover hidden bottlenecks, manual spreadsheets, and data silos.",
        slides: [
          {
            title: "The Diagnostic Interview Framework",
            subtitle: "10 high-impact questions that reveal their most expensive operational leaks",
            bulletPoints: [
              "'Where does information get copied from one screen to another by hand?'",
              "'What is the #1 reason a customer inquiry waits more than 2 hours for a response?'",
              "'Which monthly report takes an employee more than 4 hours to assemble in Excel?'",
              "Mapping the current state vs the future automated state in real-time on a digital whiteboard.",
            ],
            takeaway: "Great consultants ask diagnostic questions; amateurs pitch tool features.",
          },
        ],
        writtenContent: "Full 10-question diagnostic interview script, note-taking templates, and live diagramming guides.",
      },
      {
        id: "04-3",
        number: "4.3",
        title: "Generating the 'Executive AI Roadmap' Deliverable in 30 Minutes",
        duration: "12m",
        summary: "Use standardized templates to produce a polished, 5-page executive roadmap deliverable that sells the implementation sprint.",
        slides: [
          {
            title: "The 5-Page Executive Roadmap",
            subtitle: "A tangible, professional asset delivered within 24 hours of the audit session",
            bulletPoints: [
              "Page 1: Executive Summary & Estimated Financial Waste ($3,400/mo in manual overhead).",
              "Page 2: Current vs Proposed System Architecture Diagram.",
              "Page 3: Recommended Tool Stack & Estimated Software Costs (Client-funded).",
              "Page 4: 3-Phase Implementation Priority Matrix (Quick Wins vs Long-Term Projects).",
              "Page 5: Implementation Proposal with the $2,500 Sprint credit applied.",
            ],
            takeaway: "A concrete written roadmap makes your proposed implementation sprint an obvious next step.",
          },
        ],
        writtenContent: "Roadmap document templates, diagramming assets, and financial ROI calculation formulas.",
      },
      {
        id: "04-4",
        number: "4.4",
        title: "Converting Audits to Sprints: The 80% Close Rate Formula",
        duration: "12m",
        summary: "Learn the closing conversation structure that converts 4 out of 5 audit clients into full implementation projects.",
        slides: [
          {
            title: "The Audit-to-Sprint Conversion Conversation",
            subtitle: "Guiding the client from diagnostic findings to active implementation",
            bulletPoints: [
              "Presenting the roadmap: 'You can hand this roadmap to internal staff, hire another developer, or have us build it in 7 days.'",
              "Applying the Audit Credit: 'Since you already paid $500 for the audit, your Sprint balance is just $2,000.'",
              "Eliminating Hesitation: They already paid you, experienced your expertise, and own the roadmap.",
              "Conversion rate: 70% to 85% of paid audit clients immediately authorize the implementation sprint.",
            ],
            takeaway: "When clients pay for the diagnostic, buying the cure is a natural progression.",
          },
        ],
        writtenContent: "Closing scripts, objection handling for audit clients, and deposit invoicing templates.",
      },
    ],
  },
  {
    id: "module-05",
    number: "05",
    title: "Income Stream #4: Reusable System Templates & Hubs",
    description: "Monetize your code-free assets into passive $97–$297 digital products that generate passive revenue and inbound enterprise leads.",
    duration: "48m",
    lessons: [
      {
        id: "05-1",
        number: "5.1",
        title: "Productizing Internal Agency Assets into Digital Templates",
        duration: "12m",
        summary: "Turn client-tested Airtable bases, Make blueprints, and prompt templates into sellable digital packages.",
        slides: [
          {
            title: "The Digital Asset Productization Loop",
            subtitle: "Packaging solutions you've already built into passive commercial products",
            bulletPoints: [
              "Don't build products based on guesses: Productize the exact workflows clients have already paid $2,500 to build.",
              "Sanitizing Internal Blueprints: Removing client proprietary data and replacing with dummy test records.",
              "The Complete Bundle: Airtable base share link + Make.com JSON blueprint + Loom setup walkthrough video.",
              "Price Point: $97 to $297 one-time purchase with instant digital delivery.",
            ],
            takeaway: "Productize solutions that have already been battle-tested in live client environments.",
          },
        ],
        writtenContent: "Asset sanitization SOPs, packaging checklists, and documentation standards for digital products.",
      },
      {
        id: "05-2",
        number: "5.2",
        title: "Setting Up Frictionless Digital Checkout & Delivery via Plugd",
        duration: "12m",
        summary: "Set up instant digital checkout, automated email delivery of blueprints, and customer onboarding.",
        slides: [
          {
            title: "Automating Digital Fulfillment",
            subtitle: "Delivering assets automatically without customer support friction",
            bulletPoints: [
              "One-click checkout integrations using modern digital payment platforms.",
              "Automated welcome email with private Notion documentation hub and resource links.",
              "Step-by-step 15-minute video tutorial walking buyers through importing the Make blueprint.",
              "Customer community access for troubleshooting and template updates.",
            ],
            takeaway: "A 10-minute setup video eliminates 95% of customer support inquiries.",
          },
        ],
        writtenContent: "Payment configuration, digital delivery automation, and customer documentation templates.",
      },
      {
        id: "05-3",
        number: "5.3",
        title: "The 'Template-to-Agency' Funnel: Generating High-Ticket Inbound Leads",
        duration: "12m",
        summary: "How $97 template buyers naturally become $2,500 sprint clients when they realize they prefer professional implementation.",
        slides: [
          {
            title: "The Trojan Horse Acquisition Funnel",
            subtitle: "Why digital templates are the most profitable client acquisition channel",
            bulletPoints: [
              "The Buyer Psychology: Busy founders buy the $97 template intending to build it themselves.",
              "The Realization: After watching the video, 15% to 20% realize they don't have the time to configure it.",
              "The Embedded Offer: A banner inside the template: 'Want us to install and customize this for your business in 48 hours?'",
              "Free Customer Acquisition: You get paid $97 by a prospect who then pays you $2,500 to do the work.",
            ],
            takeaway: "Digital products turn lead generation from an expense into a profitable revenue stream.",
          },
        ],
        writtenContent: "In-template CTA design, follow-up email sequences for template buyers, and upsell frameworks.",
      },
      {
        id: "05-4",
        number: "5.4",
        title: "The Multi-Stream Financial Flywheel: Hitting $10,000–$15,000/Month",
        duration: "12m",
        summary: "Combine all 4 streams into a predictable financial flywheel that generates diversified, resilient income.",
        slides: [
          {
            title: "The Complete 4-Stream Financial Engine",
            subtitle: "A balanced freelance practice that generates $12,500+ every month",
            bulletPoints: [
              "Stream 1 (Sprints): 2 Done-For-You Sprints per month @ $2,500 = $5,000.",
              "Stream 2 (Retainers): 6 ongoing client retainers @ $900/month = $5,400.",
              "Stream 3 (Audits): 2 paid diagnostic audits per month @ $500 = $1,000.",
              "Stream 4 (Templates): 12 digital template sales @ $97 = $1,164.",
              "Total Monthly Income: $12,564 with 85%+ net profit margins and zero employees.",
            ],
            takeaway: "Diversification across 4 revenue models provides financial peace of mind and true operational freedom.",
          },
        ],
        writtenContent: "Financial planning models, revenue forecasting spreadsheets, and the 90-day execution roadmap.",
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

export const FREELANCE_INCOME_DETAIL_DATA: PlaybookDetailData = {
  id: FREELANCE_INCOME_ID,
  slug: FREELANCE_INCOME_SLUG,
  title: "Turn 1 AI Skill Into 4 Different Freelance Income Streams",
  headline:
    "Master one high-leverage AI capability and monetize it through 4 distinct revenue models: Sprints, Retainers, Paid Audits, and Digital System Hubs.",
  description:
    "An exhaustive operational guide for modern freelancers, developers, and consultants. Learn how to master a single high-demand enterprise skill—structured knowledge extraction and document AI—and package it into four high-margin income streams. Eliminate the freelance feast-or-famine cycle and build a resilient $10,000+ monthly practice with zero employees.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "Bestseller",
  rating: 4.9,
  ratingCount: 312,
  studentsCount: "1,450",
  instructorName: "Plugd Freelance Architecture Team",
  instructorTitle: "Multi-Stream Freelance Strategists & Agency Operators",
  instructorBio:
    "The Plugd Freelance Architecture Team mentors independent operators on shifting away from hourly billing toward packaged implementation sprints, recurring retainers, and productized assets.",
  instructorRating: 4.9,
  instructorReviews: "312",
  instructorStudents: "1,450",
  instructorCourses: 3,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "5.0 hours",
  modulesCount: 5,
  lessonsCount: 20,
  whatYouWillLearn: [
    "Master the high-demand anchor skill: Structured Document Extraction & B2B Workflow Orchestration",
    "Package high-ticket $2,500 Done-For-You Sprints that deliver finished operational systems in 7 days",
    "Build a recurring monthly income floor with $800–$1,200/mo workflow monitoring retainers",
    "Stop doing free proposals by packaging and selling $500 'AI Operations Diagnostic Audits'",
    "Productize internal agency assets into $97–$297 reusable template hubs and blueprints",
    "Deploy the 'Trojan Horse' customer acquisition funnel that turns template buyers into $2,500 sprint clients",
    "Automate the 'Friday 4:00 PM ROI Digest' that visibly proves your value and keeps retainers active for years",
    "Manage 10 client retainers in under 10 hours a week using centralized error-monitoring webhooks",
    "Master consultative diagnostic questioning frameworks that close 70%+ of discovery clients",
    "Structure a resilient, diversified freelance practice generating $10,000 to $15,000 every month",
  ],
  relatedTopics: [
    "Freelancing & Consulting",
    "Multi-Stream Income",
    "B2B Retainers",
    "Document AI & Extraction",
    "Make.com & Airtable",
    "Productized Services",
  ],
  requirements: [
    "No prior programming, computer science background, or advanced coding experience required",
    "A computer with internet access and willingness to learn visual tools (Make.com, Airtable, Anthropic API)",
    "An active or trial account on Make.com and Airtable",
  ],
  descriptionSections: {
    intro: [
      "Most freelancers remain trapped on an exhausting hamster wheel: billing $40 per hour on freelance marketplaces, chasing clients for invoices, and suffering through unpredictable income dry spells.",
      "The highest-earning independent operators don't work 80 hours a week or learn 20 different software tools. They master a single, commercially critical skill and multiply its value across four distinct income models.",
      "By mastering Structured Document AI and Workflow Orchestration, you can offer rapid Done-For-You Sprints ($2,500), recurring maintenance retainers ($900/mo), paid diagnostic sessions ($500), and reusable digital templates ($97) that turn lead generation into profit.",
    ],
    keyPointsTitle: "Comprehensive 5-Module Multi-Stream Curriculum",
    keyPoints: [
      "Module 1 (The Anchor Skill): Selecting your high-leverage B2B skill, sandbox setup, and the 4-stream model",
      "Module 2 (Stream #1 - Sprints): Structuring $2,500 7-day implementation offers, bulletproof SOWs, and delivery",
      "Module 3 (Stream #2 - Retainers): High-retention maintenance offerings, automated Friday ROI reports, and centralized alerts",
      "Module 4 (Stream #3 - Audits): Packaging $500 diagnostic roadmaps, consultative discovery calls, and high conversion scripts",
      "Module 5 (Stream #4 - Templates): Productizing internal assets, automated digital delivery, and the template-to-agency funnel",
    ],
    closing: [
      "Every single lesson provides an interactive slide deck and a complete step-by-step written guide containing real client contracts, SOW templates, diagnostic questions, and financial planning models.",
      "Whether you are currently an hourly freelancer looking to escape the billable-hour trap or an ambitious professional launching a consulting firm, this Playbook provides the exact commercial roadmap.",
    ],
  },
  targetAudience: [
    "Freelancers and consultants exhausted by hourly billing and looking for predictable recurring income",
    "Developers and no-code builders who want to package their skills into high-ticket commercial offers",
    "Solo agency operators aiming for $10,000+ monthly revenue with 85%+ net profit margins",
  ],
  includes: [
    { iconName: "layers", text: "5 Structured Modules & 20 In-Depth Lessons" },
    { iconName: "file-text", text: "Executive Slide Decks & Comprehensive Written Guides" },
    { iconName: "video", text: "Copy-Paste SOW Contracts, Audit Templates & Financial Spreadsheets" },
    { iconName: "smartphone", text: "Fully Responsive Mobile, Tablet & Desktop Learning" },
    { iconName: "infinity", text: "Full Lifetime Access with Zero Subscriptions" },
    { iconName: "shield-check", text: "100% Free Access During The Content Review Phase" },
  ],
  modules: detailModules,
  testimonials: [
    {
      name: "Marcus Vance",
      role: "Independent Systems Architect",
      rating: 5,
      quote:
        "The shift from hourly pricing to the $2,500 7-day sprint changed everything. Sold two sprints in month one, and both clients converted to $850/mo retainers using the Friday report playbook.",
      initials: "MV",
      date: "October 2026",
    },
    {
      name: "Elena Rostova",
      role: "Operations Consultant",
      rating: 5,
      quote:
        "Selling the $500 AI Opportunity Audit completely eliminated unpaid sales calls. Clients take me far more seriously, and over 75% immediately hire me for the implementation sprint.",
      initials: "ER",
      date: "October 2026",
    },
  ],
  faqs: [
    {
      question: "Why focus on only 1 AI skill instead of learning multiple tools?",
      answer:
        "Mastering one commercially proven capability (like Structured Document AI) allows you to deliver deep, reliable results that businesses actually pay for. Learning 10 superficial tools creates confusion; mastering one skill and productizing it through 4 business models creates high leverage.",
    },
    {
      question: "How much time is required to manage 6 to 10 retainers?",
      answer:
        "Using our centralized monitoring architecture in Make.com, all client webhook errors and system logs feed into a single private channel. Managing 8 to 10 retainers typically takes between 6 and 10 hours per week.",
    },
    {
      question: "Can I do this while working a full-time job?",
      answer:
        "Yes. Because the 4-stream model emphasizes bounded deliverables and asynchronous delivery rather than live hourly availability, many students start by selling paid audits on weekends and delivering sprints in the evenings.",
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
      `Review the delivery blueprint for ${l.title}`,
      `Complete the revenue milestone calculation worksheet`,
      `Deploy the client acquisition template for this income stream`,
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

export const FREELANCE_INCOME_COURSE: Course = {
  id: FREELANCE_INCOME_ID,
  slug: FREELANCE_INCOME_SLUG,
  categorySlug: "ai-businesses",
  categoryName: "AI Businesses",
  title: "Turn 1 AI Skill Into 4 Different Freelance Income Streams",
  shortTitle: "1 AI Skill into 4 Income Streams",
  audience: "Freelancers, Consultants & Solo Operators",
  targetGender: "for-all",
  headline:
    "Master one high-leverage AI capability and monetize it through 4 distinct revenue models: Sprints, Retainers, Paid Audits, and Digital System Hubs.",
  subheadline:
    "An exhaustive operational guide for modern freelancers, developers, and consultants seeking to escape the hourly billing trap and build a resilient multi-stream income engine.",
  description:
    "A comprehensive curriculum detailing how to package, sell, and deliver four distinct revenue streams from a single core AI skill without hiring staff.",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  badge: "Bestseller",
  rating: 4.9,
  ratingCount: 312,
  hoursOfMaterial: "5.0 hours",
  modulesCount: 5,
  lessonsCount: 20,
  primaryColor: "#c2410c",
  accentColor: "#15803d",
  outcomes: [
    "Master Structured Document AI and B2B workflow orchestration",
    "Package and sell $2,500 Done-For-You Sprints delivered in 7 days",
    "Maintain high-retention $800–$1,200/mo workflow monitoring retainers",
    "Sell $500 paid diagnostic audits and productize $97 digital templates",
  ],
  modules: courseModules,
  testimonials: [
    {
      name: "Marcus Vance",
      role: "Independent Systems Architect",
      quote:
        "The shift from hourly pricing to the $2,500 7-day sprint changed everything. Sold two sprints in month one, and both clients converted to $850/mo retainers using the Friday report playbook.",
      handle: "@marcus_v",
    },
  ],
};

export const DETAIL_FREELANCE_INCOME_DATA = FREELANCE_INCOME_DETAIL_DATA;
