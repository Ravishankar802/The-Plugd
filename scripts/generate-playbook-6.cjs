const courseTitle = "12 AI Services Small Businesses Need but Rarely Know How to Build";
const courseId = "ai-businesses-06";
const courseSlug = "12-ai-services-small-businesses-need-but-rarely-know-how-to-build";

const modulesData = [
  {
    "num": 1,
    "id": "module-01",
    "title": "SMB Pain Matrix & High-Demand AI Service Selection",
    "description": "Understand the acute operational bottlenecks of small businesses and master the criteria for selecting high-margin, repeatable AI services.",
    "duration": "60m",
    "lessons": [
      {
        "lesNum": 1,
        "title": "The Small Business Reality: Chaos, Leaky Buckets & Labor Shortages",
        "duration": "15m",
        "summary": "Examine the real-world operational challenges of Main Street businesses and why generic AI tools fail to solve their problems.",
        "bulletPoints": [
          "Small business owners are overwhelmed operators juggling phone calls, staffing gaps, inventory, and bookkeeping simultaneously.",
          "The Leaky Bucket Problem: Why SMBs lose 30%+ of potential revenue from missed calls, delayed replies, and forgotten follow-ups.",
          "Why SMBs Don't Use ChatGPT: Business owners lack time to write prompts; they need autonomous systems that run silently in the background.",
          "The Automation Consultant Opportunity: Positioning yourself not as a tech vendor, but as an operational problem solver who stops revenue leakage."
        ],
        "takeaway": "Small business owners don't want AI software—they want their phone answered, their invoices paid, and their reviews managed automatically."
      },
      {
        "lesNum": 2,
        "title": "The 12 Core Services Selection Matrix",
        "duration": "15m",
        "summary": "Analyze the 12 high-demand SMB services across technical complexity, delivery speed, and client revenue impact.",
        "bulletPoints": [
          "The Service Evaluation Grid: Scoring services on Build Time (under 4 hours), Setup Fee ($500–$2,500), and Monthly Retainer Potential ($150–$500/mo).",
          "The 4 Operational Clusters: Lead Acquisition, Customer Retention, Back-Office Administration, and Operational Scheduling.",
          "Repeatability: Selecting services that use identical logic across plumbing, HVAC, dental, legal, and roofing verticals.",
          "The Low-Touch Rule: Prioritizing services that require zero daily maintenance once deployed."
        ],
        "takeaway": "Focus on services with low build complexity and immediate, quantifiable revenue impact for the business owner."
      },
      {
        "lesNum": 3,
        "title": "Identifying High-Value SMB Verticals",
        "duration": "15m",
        "summary": "Identify the top 5 small business industries with the highest willingness and financial capability to pay for automation.",
        "bulletPoints": [
          "Home Services & Contractors: HVAC, plumbing, roofing, electrical—high ticket transactions ($3K–$15K) where 1 missed call costs thousands.",
          "Health & Wellness Practices: Medspas, dental clinics, chiropractors—high recurring appointment volume and staff scheduling burdens.",
          "Professional Services: Boutique accounting firms, regional insurance agencies, title companies—paperwork and document-heavy workflows.",
          "Auto Repair & Specialty Trades: High customer inquiry volume with intense technician utilization challenges.",
          "Avoiding Low-Margin Businesses: Why independent coffee shops and small boutiques rarely have the budget for automation services."
        ],
        "takeaway": "Pick industries where a single converted customer or saved employee hour is worth hundreds of dollars."
      },
      {
        "lesNum": 4,
        "title": "Universal SMB Architecture, Retainer Psychology & Local Data Compliance",
        "duration": "15m",
        "summary": "Master the lightweight SMB tech stack, pricing retainer structures, and regional privacy compliance rules for local businesses.",
        "bulletPoints": [
          "The Universal SMB Stack: Twilio for SMS, Make/n8n for routing, and native webhook connectors to HubSpot, Jobber, and ServiceTitan.",
          "Pricing Psychology: Replacing hourly billing with value-anchored setup fees ($1,500-$3,500) paired with monthly retainers ($250-$500/mo).",
          "Data Privacy & Security: Enforcing strict PII redaction and local SMS opt-in compliance (A2P 10DLC) before sending automated client texts.",
          "Operational Longevity: Designing zero-maintenance automations with automated error alerts to prevent client support tickets."
        ],
        "takeaway": "Charge for operational peace of mind, not hours worked. High retainers are justified by reliability and zero client overhead."
      }
    ]
  },
  {
    "num": 2,
    "id": "module-02",
    "title": "Speed-to-Lead & Customer Acquisition Systems (Services 1–3)",
    "description": "Deploy the top three inbound lead capture and conversion automations that eliminate response latency for high-ticket local businesses.",
    "duration": "60m",
    "lessons": [
      {
        "lesNum": 1,
        "title": "Service #1: Autonomous Missed-Call AI Text-Back & Voice Response Engine",
        "duration": "15m",
        "summary": "Build and deploy an automated text-back system that intercepts unanswered incoming calls within 15 seconds to rescue high-ticket leads.",
        "bulletPoints": [
          "The 15-Second Lead Capture SLA: Why 78% of local service buyers hire the first business that responds to their inquiry.",
          "Twilio Call-Status Webhook Trigger: Capturing missed, busy, and uncompleted inbound calls instantly with caller metadata.",
          "Conversational AI Lead Qualification: Asking 2-3 essential qualification questions via SMS using OpenAI or Claude APIs.",
          "Automated Calendar Booking & Owner SMS Dispatch: Locking in appointments directly onto the business owner Google Calendar."
        ],
        "takeaway": "Missed calls are immediate revenue leaks. Responding in under 30 seconds turns a lost caller into a booked estimate."
      },
      {
        "lesNum": 2,
        "title": "Service #2: Instant Web Form Quoter & Dynamic AI Cost Estimator",
        "duration": "15m",
        "summary": "Construct an interactive web estimation engine that delivers instant customized pricing ranges and automated PDF quotes.",
        "bulletPoints": [
          "Frictionless Intake: Replacing generic Contact Us forms with structured estimation widgets that capture project scope parameters.",
          "Dynamic Cost Modeling: Feeding square footage, materials, and timeline variables into a deterministic calculation prompt.",
          "Instant PDF Proposal Generation: Programmatically compiling branded estimates using DocuSeal or PDF generation APIs.",
          "High-Intent Lead Routing: Flagging high-budget quote requests directly to the business owner phone via priority notification."
        ],
        "takeaway": "Instant pricing eliminates competitive comparison shopping. Homeowners book the contractor who quotes them immediately."
      },
      {
        "lesNum": 3,
        "title": "Service #3: Multi-Channel Inbound Lead Triage & Unified Inbound Router",
        "duration": "15m",
        "summary": "Aggregate disparate inbound inquiries from Facebook, Instagram, Google Maps, and website chat into a single automated pipeline.",
        "bulletPoints": [
          "Multi-Channel Inbound Chaos: Why SMBs fail to monitor DMs, emails, and form fills scattered across four distinct platforms.",
          "Unified Webhook Ingestion: Consolidating inquiries into a centralized Make.com or n8n orchestration router.",
          "LLM Intent Classification: Categorizing incoming messages into Urgent Service, General Question, or Spam within 2 seconds.",
          "Automated CRM Sync & De-duplication: Syncing leads to HubSpot or GoHighLevel without creating duplicate contact records."
        ],
        "takeaway": "A unified inbox engine ensures zero inbound inquiries slip through the cracks, regardless of which channel the lead uses."
      },
      {
        "lesNum": 4,
        "title": "Inbound Automation Testing, Webhook Handshakes & Client Acceptance Gates",
        "duration": "15m",
        "summary": "Implement rigorous end-to-end testing protocols, webhook signature verification, and client sign-off procedures for Services 1-3.",
        "bulletPoints": [
          "End-to-End Latency Auditing: Testing Twilio call events across 5 simulated carrier networks to verify sub-30-second SMS responses.",
          "Webhook Handshake Security: Enforcing HMAC signature verification to safeguard client endpoints against spoofed requests.",
          "Fail-Safe Human Fallbacks: Diverting unrecognized user intents to the business owner phone with full transcript context.",
          "Client Acceptance Checklist: Running live test scenarios in front of the business owner before handing over the keys."
        ],
        "takeaway": "Never declare an inbound automation live until you have proven the fail-safe human handoff in front of the client."
      }
    ]
  },
  {
    "num": 3,
    "id": "module-03",
    "title": "Reputation & Customer Retention Systems (Services 4–6)",
    "description": "Automate post-service review harvesting, sentiment interception, and customer lifetime value expansion for local service businesses.",
    "duration": "60m",
    "lessons": [
      {
        "lesNum": 1,
        "title": "Service #4: Automated Google Review Harvester & AI Sentiment Responder",
        "duration": "15m",
        "summary": "Build an automated review generation engine that systematically converts satisfied customers into 5-star Google Business ratings.",
        "bulletPoints": [
          "The Local SEO Power of Reviews: Why Google map pack rankings are 40% determined by review velocity, count, and freshness.",
          "Triggering Post-Job Review Requests: Firing automated SMS requests 2 hours after a job is marked completed in the client CRM.",
          "Negative Review Interception: Routing ratings under 4 stars to a private internal feedback form before they hit public directories.",
          "Automated AI Review Responses: Generating personalized, keyword-optimized replies to public reviews using Google Business Profile API."
        ],
        "takeaway": "Automating review generation turns every completed job into an evergreen SEO asset that drives organic inbound calls."
      },
      {
        "lesNum": 2,
        "title": "Service #5: Post-Service Quality Assurance & Warranty Follow-Up Sentinel",
        "duration": "15m",
        "summary": "Deploy automated satisfaction checkpoints and scheduled seasonal maintenance reminders that protect customer loyalty.",
        "bulletPoints": [
          "The Retention Blind Spot: Why SMBs ignore past customers until equipment breaks or the customer switches to a competitor.",
          "Day-7 and Day-30 Checkpoints: Automated check-in texts that confirm satisfactory service and catch simmering complaints early.",
          "Automated Seasonal Warranty Reminders: Triggering filter replacement or tune-up offers 6 months post-installation.",
          "Referral Generation Sequences: Offering incentives for friend referrals when customer NPS scores exceed 9 out of 10."
        ],
        "takeaway": "Customer retention is 5x cheaper than acquisition. Automated post-service check-ins unlock easy repeat revenue."
      },
      {
        "lesNum": 3,
        "title": "Service #6: Churn Risk Radar & VIP Customer Care Automation",
        "duration": "15m",
        "summary": "Implement behavioral churn detection algorithms that flag slipping commercial accounts and trigger proactive intervention.",
        "bulletPoints": [
          "Identifying Churn Signals: Monitoring booking frequency drops, delayed payment trends, and unanswered outbound emails.",
          "Automated Account Health Scoring: Calculating dynamic risk scores based on CRM interaction frequency and transaction recency.",
          "Proactive VIP Escalation: Alerting the business owner when high-margin commercial accounts show 45+ days of inactivity.",
          "Automated Win-Back Offers: Delivering tailored reactivation discounts to past accounts without manual staff effort."
        ],
        "takeaway": "Preventing churn in high-value accounts protects the foundational revenue of any recurring local service business."
      },
      {
        "lesNum": 4,
        "title": "Retention Pipeline Orchestration, Database Health & SMS Compliance",
        "duration": "15m",
        "summary": "Ensure compliance with SMS marketing regulations, clean customer contact databases, and integrate retention workflows into operations.",
        "bulletPoints": [
          "A2P 10DLC Compliance: Registering brand campaigns and verifying explicit customer opt-in consent for automated messaging.",
          "Database Sanitization: Scrubbing landlines, disconnected numbers, and duplicate entries to maintain high delivery rates.",
          "Quiet Hours Guardrails: Restricting automated SMS dispatch strictly between 9:00 AM and 7:00 PM in the client local timezone.",
          "Deliverability Monitoring: Tracking carrier bounce rates and setting up automated alerts for failed SMS transmissions."
        ],
        "takeaway": "Strict SMS compliance protects your client from regulatory fines and ensures 98%+ message delivery rates."
      }
    ]
  },
  {
    "num": 4,
    "id": "module-04",
    "title": "Back-Office & Financial Automation Systems (Services 7–9)",
    "description": "Eliminate tedious bookkeeping, invoice parsing, and unpaid receivable follow-ups with intelligent financial automations.",
    "duration": "60m",
    "lessons": [
      {
        "lesNum": 1,
        "title": "Service #7: Vendor Invoice & Receipt OCR Parser with Accounting Sync",
        "duration": "15m",
        "summary": "Construct an AI document extraction pipeline that ingests supplier receipts and maps line items directly into QuickBooks or Xero.",
        "bulletPoints": [
          "The Paperwork Nightmare: Business owners wasting 8+ hours weekly manually typing vendor receipts into accounting software.",
          "Multimodal Vision & OCR Ingestion: Passing messy receipt photos and PDF invoices into Claude 3.5 Sonnet for structured JSON extraction.",
          "Automated Line-Item Reconciliation: Matching vendor invoices against existing purchase orders and inventory categories.",
          "Direct QuickBooks / Xero API Sync: Writing categorized bills and receipt attachments directly to the accounting ledger."
        ],
        "takeaway": "Automating receipt entry gives business owners real-time cash flow visibility while saving hours of manual data entry."
      },
      {
        "lesNum": 2,
        "title": "Service #8: Dynamic Good-Better-Best Proposal Builder & E-Sign Engine",
        "duration": "15m",
        "summary": "Deploy an automated proposal generation tool that creates tiered estimates with embedded e-signature contracts.",
        "bulletPoints": [
          "The Power of Tiered Bidding: Why presenting Good-Better-Best proposals increases average job size by 24% to 35%.",
          "Dynamic Scope Compilation: Populating equipment specs, warranty terms, and financing options from a simple technician form.",
          "DocuSign & DocuSeal Automation: Generating dynamic contract envelopes and sending e-sign links directly to homeowner phones.",
          "Deposit Collection Integration: Requiring an instant 20% credit card or ACH deposit upon contract signature."
        ],
        "takeaway": "Tiered proposals unlock higher contract values while embedded e-signatures lock in client commitments on the spot."
      },
      {
        "lesNum": 3,
        "title": "Service #9: Accounts Receivable Dunning Bot & Automated Payment Recovery",
        "duration": "15m",
        "summary": "Build an automated collection engine that politely and persistently recovers overdue invoices without damaging client relationships.",
        "bulletPoints": [
          "The Aging AR Crisis: Why SMBs routinely carry $25K to $75K in 60+ day unpaid invoices due to timid manual follow-ups.",
          "Automated Aging Milestones: Triggering automated reminders at Net+3, Net+14, Net+30, and Net+45 days post-invoice.",
          "Dynamic Tone Escalation: Progressing from friendly courtesy reminders to formal legal notifications as invoices age.",
          "Embedded 1-Click Payment Links: Providing direct Stripe or QuickBooks payment links directly within SMS and email dunning messages."
        ],
        "takeaway": "Consistent, polite dunning automations recover 70%+ of past-due receivables without putting strain on staff."
      },
      {
        "lesNum": 4,
        "title": "Financial Workflow Reconciliation, Bank Feed Safety & Audit Logging",
        "duration": "15m",
        "summary": "Implement robust security controls, audit trails, and human-in-the-loop approval thresholds for all financial automations.",
        "bulletPoints": [
          "The Human-in-the-Loop Threshold: Requiring manual owner sign-off for any invoice or payout exceeding $1,000.",
          "Immutable Audit Logging: Storing full transaction payloads and extraction confidence scores in an append-only database.",
          "Reconciliation Safeguards: Verifying total invoice amounts match line-item sums before triggering ledger entries.",
          "Disaster Recovery Protocols: Building automated rollback mechanisms in the event of third-party accounting API failures."
        ],
        "takeaway": "Financial automations must always prioritize accuracy over speed. Require human review for large transactions."
      }
    ]
  },
  {
    "num": 5,
    "id": "module-05",
    "title": "Operations & Field Dispatch Automation Systems (Services 10–12)",
    "description": "Optimize technician scheduling, route planning, inventory restocking, and field compliance for trade businesses.",
    "duration": "60m",
    "lessons": [
      {
        "lesNum": 1,
        "title": "Service #10: 24/7 Smart Appointment Dispatcher & Route Optimizer",
        "duration": "15m",
        "summary": "Build an intelligent dispatch engine that clusters technician routes by geographic proximity to cut fuel and travel time.",
        "bulletPoints": [
          "The Drive-Time Drain: Why unoptimized field routes waste 90+ minutes per technician daily in unnecessary traffic.",
          "Geographic Clustering Algorithms: Grouping service calls by zip code and traffic patterns using Google Maps Distance Matrix API.",
          "Dynamic Emergency Insertion: Automatically rerouting the nearest available technician when high-priority emergencies arrive.",
          "Automated Technician SMS Alerts: Dispatching customer notes, gate codes, and job histories directly to field technician phones."
        ],
        "takeaway": "Route optimization adds an extra billable service call per technician each day without adding working hours."
      },
      {
        "lesNum": 2,
        "title": "Service #11: Predictive Inventory Reorder Alert & Truck Stock Tracker",
        "duration": "15m",
        "summary": "Implement inventory tracking automations that monitor common parts consumption and trigger automatic supplier restock orders.",
        "bulletPoints": [
          "The Missing Part Dilemma: How running out of basic capacitors or fittings derails high-margin repair jobs.",
          "Job-Completion Parts Logging: Prompting technicians to select used parts from a 10-second mobile drop-down upon job completion.",
          "Automated Restock Thresholds: Generating automated purchase orders to local suppliers when truck inventory falls below minimums.",
          "Supplier Price Auditing: Tracking price changes across multiple local distributors to secure the lowest wholesale costs."
        ],
        "takeaway": "Automated truck restocking ensures technicians always have parts on hand to complete jobs on the first visit."
      },
      {
        "lesNum": 3,
        "title": "Service #12: Employee Onboarding & Safety Certification Sentinel",
        "duration": "15m",
        "summary": "Automate trade licensing verification, safety audit logging, and new apprentice onboarding checklists.",
        "bulletPoints": [
          "Compliance Vulnerabilities: The heavy fines and insurance liabilities of lapsed technician licenses or missed safety audits.",
          "Automated Certification Expiration Tracking: Monitoring EPA, OSHA, and trade license expiration dates 60 days in advance.",
          "Daily Mobile Tailgate Safety Sign-Offs: Enforcing digital safety checklists before technicians can view their daily dispatch schedule.",
          "Streamlined Apprentice Onboarding: Guiding new hires through document submission, tax forms, and tool assignments via WhatsApp."
        ],
        "takeaway": "Automating safety compliance protects the business owner from insurance liability and costly OSHA penalties."
      },
      {
        "lesNum": 4,
        "title": "Multi-Truck Field Deployment, Mobile Webhooks & Offline Resiliency",
        "duration": "15m",
        "summary": "Deploy field automations across multi-vehicle fleets with offline caching, cellular dead-zone tolerance, and sync retries.",
        "bulletPoints": [
          "Cellular Dead-Zone Engineering: Caching field form inputs locally in mobile browser storage when technicians lose connectivity.",
          "Conflict-Free Syncing: Resolving concurrent updates when multiple technicians update shared inventory ledgers simultaneously.",
          "Field Hardware Considerations: Optimizing UI interactions for rugged tablets, outdoor glare, and one-handed mobile entry.",
          "End-of-Day Fleet Reconciliation: Running automated evening checks that verify all dispatched jobs were closed and billed."
        ],
        "takeaway": "Field systems must be built for the real world. Ensure offline caching so lost cell service never halts operations."
      }
    ]
  },
  {
    "num": 6,
    "id": "module-06",
    "title": "Packaging, Retainer Bundles & The SMB Pricing Playbook",
    "description": "Structure high-converting service bundles, price with value-anchored retainers, and enforce rock-solid client service agreements.",
    "duration": "60m",
    "lessons": [
      {
        "lesNum": 1,
        "title": "The Menu Trap: Transitioning from Point Solutions to Transformation Bundles",
        "duration": "15m",
        "summary": "Why selling individual automations invites price resistance and how to package outcomes that business owners eagerly buy.",
        "bulletPoints": [
          "The Menu Trap: Why presenting a list of 12 distinct tools confuses clients and leads to analysis paralysis.",
          "Selling Outcomes Over Features: Framing your services around revenue generation, labor reduction, and peace of mind.",
          "The 3-Tier Bundle Architecture: Structuring entry-level, standard, and comprehensive transformation tiers.",
          "Positioning Against In-House Staff: Demonstrating that a $499/month automation bundle replaces a $3,500/month administrative hire."
        ],
        "takeaway": "Never sell a technology menu. Sell complete operational solutions that solve one major business headache end-to-end."
      },
      {
        "lesNum": 2,
        "title": "The Three Core Offer Bundles: Revenue Shield, Cash Flow & Autonomous OS",
        "duration": "15m",
        "summary": "Master the exact specifications, pricing points, and deliverables for the three high-converting SMB automation packages.",
        "bulletPoints": [
          "Bundle 1: The Revenue Leakage Shield ($1,800 setup + $299/mo): Missed-call text back, review harvester, and speed-to-lead triage.",
          "Bundle 2: The Back-Office Cash Flow Accelerator ($2,800 setup + $399/mo): Invoice parser, proposal generator, and AR dunning engine.",
          "Bundle 3: The Complete Autonomous OS ($4,800 setup + $699/mo): Inbound capture, financial workflows, and smart dispatch operations.",
          "Custom Add-Ons: Monetizing custom API bridges and additional technician seats at $50/month each."
        ],
        "takeaway": "Offer three clear tiers. Most clients will choose the middle package while your highest-margin clients take the top tier."
      },
      {
        "lesNum": 3,
        "title": "Crafting the 1-Page SMB Service Level Agreement, SOW & Scope Containment",
        "duration": "15m",
        "summary": "Protect your margins with a battle-tested 1-page service contract that defines exact deliverables and prevents scope creep.",
        "bulletPoints": [
          "The 1-Page Plain-English Contract: Why 15-page legal agreements intimidate small business owners and delay closing.",
          "Defining Service Boundaries: Explicitly enumerating what is included versus what requires an additional paid change order.",
          "SLA Expectations: Setting realistic expectations for webhook uptime, API maintenance, and support turnaround times.",
          "Payment Terms & Auto-Renewal: Enforcing automatic credit card billing on the 1st of every month with 30-day cancellation notice."
        ],
        "takeaway": "A clear, concise contract builds trust with local owners while firmly protecting your agency against scope creep."
      },
      {
        "lesNum": 4,
        "title": "Automated Stripe Retainer Billing, Usage Metering & Churn Prevention",
        "duration": "15m",
        "summary": "Set up recurring billing infrastructure, manage third-party software pass-through costs, and keep client churn near zero.",
        "bulletPoints": [
          "Stripe Billing Architecture: Setting up recurring subscriptions with automatic dunning for failed client cards.",
          "Handling Software Costs: Requiring clients to maintain their own Twilio and Make accounts to eliminate pass-through liability.",
          "The Monthly Value Report: Sending an automated 1-page report detailing exact missed calls saved and reviews generated.",
          "Proactive Health Check-Ins: Conducting quarterly 15-minute optimization reviews to demonstrate ongoing agency value."
        ],
        "takeaway": "Monthly proof-of-performance reports make your retainer feel indispensable and virtually eliminate client churn."
      }
    ]
  },
  {
    "num": 7,
    "id": "module-07",
    "title": "Local SMB Client Acquisition, 7-Day Delivery SOWs & Retainer Scaling",
    "description": "Execute proven local client outreach strategies, run rapid 7-day deployments, and scale to $15,000/month in recurring revenue.",
    "duration": "60m",
    "lessons": [
      {
        "lesNum": 1,
        "title": "The Secret Shopper Inbound Audit Strategy: The Ultimate SMB Door Opener",
        "duration": "15m",
        "summary": "How to audit local business response times to generate irresistible, data-backed outreach that books sales calls on demand.",
        "bulletPoints": [
          "The Secret Shopper Audit: Calling 20 local contractors after 5:30 PM and submitting website inquiries to measure response times.",
          "Recording the Proof Video: Creating a 2-minute Loom showing their missed call and the competitor who responded in 3 minutes.",
          "The Non-Pushy Outreach Script: Sending the audit video directly to the owner via text or LinkedIn with zero hard sales pitch.",
          "Conversion Metrics: How secret shopper audits consistently generate 35%+ positive response rates from local business owners."
        ],
        "takeaway": "Showing a business owner their own lost revenue in real time is 10x more compelling than any cold sales pitch."
      },
      {
        "lesNum": 2,
        "title": "High-Conversion Local Acquisition: In-Person Blitzes, BNI & Cold Teardowns",
        "duration": "15m",
        "summary": "Master local networking channels, trade association sponsorships, and strategic referral partnerships that yield qualified leads.",
        "bulletPoints": [
          "Local BNI & Chamber Blitzes: Positioning yourself as the exclusive automation specialist in your geographic region.",
          "Strategic Alliances: Partnering with local CPA firms and web design agencies who eagerly refer their SMB clients.",
          "Targeted Direct Mail Teardowns: Sending physical 1-page operational audit letters to licensed contractor business addresses.",
          "Leveraging Early Client Case Studies: Transforming your first successful local deployment into 5 neighborhood referrals."
        ],
        "takeaway": "Local business runs on trust and relationships. Combine digital audits with personal local presence to dominate your market."
      },
      {
        "lesNum": 3,
        "title": "The 30-Minute Coffee / Zoom Closing Framework & Objection Handling",
        "duration": "15m",
        "summary": "Conduct consultative sales conversations that dismantle objections around cost, tech complexity, and staff adoption.",
        "bulletPoints": [
          "The 30-Minute Discovery Structure: Diagnosing current operational bottlenecks for 20 minutes before presenting any solution.",
          "Overcoming I Am Not Tech-Savvy: Reassuring the owner that your team handles 100% of the technical setup and maintenance.",
          "Overcoming My Staff Won Not Use It: Demonstrating that the automations run silently in the background with zero staff training required.",
          "Securing the Commitment: Collecting the initial setup deposit on the call before scheduling the onboarding kickoff."
        ],
        "takeaway": "Focus entirely on the business problem during sales calls. The less you talk about technology, the faster they buy."
      },
      {
        "lesNum": 4,
        "title": "Standardized 7-Day Rapid Deployment Assembly Line & Scaling to $15K MRR",
        "duration": "15m",
        "summary": "Execute a standardized 7-day deployment blueprint to deliver client results rapidly and scale your agency to 25+ retainers.",
        "bulletPoints": [
          "The 7-Day Deployment Sprint: Day 1 credentials, Day 2-3 build, Day 4 testing, Day 5 owner sign-off, Day 6-7 live monitoring.",
          "Standardized Template Libraries: Reusing pre-configured Make blueprints and Twilio flows to cut build times to under 3 hours.",
          "The 20-Client Retainer Math: How 20 SMB clients paying an average $400/month generates $8,000/month recurring plus $40K in setup fees.",
          "The Solo Operator Scaling Blueprint: Operating a $15,000/month agency with zero full-time staff using modular contractors."
        ],
        "takeaway": "Standardize your delivery templates so every new client takes under 4 hours to deploy. That is how you scale profitably."
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
