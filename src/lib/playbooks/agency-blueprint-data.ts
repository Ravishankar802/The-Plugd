import type { Course, Module, Lesson } from "../playbooks-data";
import type { PlaybookDetailData, PlaybookDetailModule } from "../dating-playbook-detail";

export const AGENCY_BLUEPRINT_SLUG = "the-30-day-ai-agency-blueprint-from-zero-portfolio-to-paying-clients";
export const AGENCY_BLUEPRINT_ID = "ai-businesses-05";

const modulesMetadata = [
  {
    id: "module-01",
    number: "01",
    title: "Week 1: Niche Selection & Offer Engineering",
    description: "Days 1 to 7: Select a high-margin commercial vertical, audit existing software overhead, and define your irresistible initial offer.",
    duration: "55m",
    lessons: [
      {
        id: "01-1",
        number: "1.1",
        title: "Day 1-2: The Commercial Niche Scorecard: Target Sizing & Overhead Criteria",
        duration: "14m",
        summary: "Identify the 4 non-negotiable criteria for a profitable AI agency niche: $50K+ monthly payroll, high transaction value, manual data bottlenecks, and accessible decision-makers.",
        slides: [
          {
            title: "The B2B Niche Selection Scorecard",
            subtitle: "The 4 criteria that separate high-paying commercial clients from broke startups",
            bulletPoints: [
              "Criterion 1 (Payroll Overhead): Business must have 5+ full-time staff and at least $50,000 in monthly operational overhead.",
              "Criterion 2 (High Transaction Value): Customer lifetime value of $2,000+ so saving or landing 1 client easily justifies your fee.",
              "Criterion 3 (Manual Bottlenecks): Repetitive copy-pasting across forms, spreadsheets, quotes, and emails.",
              "Criterion 4 (Accessible Decision Makers): Clear owner, COO, or VP of Sales reachable via direct email or LinkedIn.",
            ],
            takeaway: "Pick industries where manual delay directly bleeds revenue: Commercial Trades, Logistics, Boutique Legal, and Specialized Healthcare.",
          },
        ],
        writtenContent: "Niche scoring rubric, evaluation spreadsheet, and 10 pre-vetted high-ticket B2B agency verticals.",
      },
      {
        id: "01-2",
        number: "1.2",
        title: "Day 3-4: Pain Point Diagnosis: Finding the $10,000 Operational Bleed",
        duration: "14m",
        summary: "Audit the common operational leaks in your target vertical: missed inbound leads, slow quoting cycles, manual invoice entry, and lost customer follow-ups.",
        slides: [
          {
            title: "Diagnosing Operational Leaks",
            subtitle: "Translating routine office frustrations into quantifiable financial metrics",
            bulletPoints: [
              "The Missed Lead Cost: A commercial HVAC firm losing 3 inbound quote requests per week loses $15,000+ monthly.",
              "The Speed-to-Lead Equation: Leads contacted within 5 minutes are 21x more likely to enter the sales pipeline.",
              "Manual Entry Drag: Paying an administrative employee $45,000/year to manually re-type invoice data into an ERP.",
              "Formulating the Problem Statement: 'We solve the 4-hour delay between customer inquiry and custom proposal delivery.'",
            ],
            takeaway: "Quantify the problem in dollars before you ever discuss software tools or technology.",
          },
        ],
        writtenContent: "Operational audit framework, financial bleed formulas, and client discovery questions.",
      },
      {
        id: "01-3",
        number: "1.3",
        title: "Day 5-6: Crafting the Irresistible 'No-Brainer' Micro-Offer",
        duration: "14m",
        summary: "Package your initial deliverable with an asymmetric risk-reversal proposition: The 7-Day Inbound Proposal Engine for $2,500.",
        slides: [
          {
            title: "The Asymmetric Micro-Offer Architecture",
            subtitle: "Structuring an offer so compelling that saying no feels irrational to the business owner",
            bulletPoints: [
              "The Specific Deliverable: 'We build an automated proposal generator that quotes inbound leads in under 90 seconds.'",
              "The Timeframe Guarantee: Fully implemented, tested, and handed over within 7 business days.",
              "The Risk Reversal: If the system doesn't save your team at least 10 hours in week 1, you don't pay the final balance.",
              "The Anchor Price: $2,500 setup fee ($1,250 upfront, $1,250 upon live staff sign-off).",
            ],
            takeaway: "A tight, specific micro-offer beats a vague 'AI transformation' proposal every single time.",
          },
        ],
        writtenContent: "Offer packaging templates, risk reversal language, and client agreement terms.",
      },
      {
        id: "01-4",
        number: "1.4",
        title: "Day 7: Setting Up Your Agency Infrastructure in 2 Hours",
        duration: "13m",
        summary: "Set up your lean business operating system: custom Google Workspace domain, simple landing page, Loom account, and Airtable CRM.",
        slides: [
          {
            title: "Lean Agency Operating Infrastructure",
            subtitle: "Launching your entire operational foundation for under $50 with zero technical bloat",
            bulletPoints: [
              "Professional Domain & Google Workspace: Clean professional email (firstname@agencyname.com).",
              "The 1-Page Minimalist Portfolio Site: Clear headline, problem statement, interactive video audit demo, and booking link.",
              "Loom Recording Setup: 1080p recording with crystal clear microphone audio for 3-minute video audits.",
              "Airtable Outreach CRM: Tracking prospect company, contact, personalized video link, and outreach status.",
            ],
            takeaway: "Never spend weeks building an elaborate website: Clients buy your competence, not your web design.",
          },
        ],
        writtenContent: "Step-by-step agency setup guide, DNS configuration checklist, and CRM template base link.",
      },
    ],
  },
  {
    id: "module-02",
    number: "02",
    title: "Week 1.5: The 48-Hour Prototype Sandbox",
    description: "Days 8 to 12: Build a working proof-of-concept prototype in your sandbox so you can demonstrate live results without a prior portfolio.",
    duration: "52m",
    lessons: [
      {
        id: "02-1",
        number: "2.1",
        title: "Day 8-9: Building the Universal Demo Prototype in Airtable & Make",
        duration: "13m",
        summary: "Assemble a functional, reusable sandbox prototype (Inbound Lead Triage & Proposal Drafter) using mock industry data.",
        slides: [
          {
            title: "The Universal Sandbox Prototype",
            subtitle: "Creating a live interactive demo you can customize for any prospect in 15 minutes",
            bulletPoints: [
              "Core Prototype Structure: Webform Ingestion → Claude 3.7 Evaluation → Airtable Approval Hub → Instant PDF Generator.",
              "Pre-Populated Industry Data: 5 realistic mock customer inquiries showcasing various edge cases and price points.",
              "Visual Staff Approval Interface: Clean Airtable kanban and gallery views with one-click 'Approve & Dispatch' buttons.",
              "Instant Proof: Showing prospects a working system live on your screen eliminates the need for previous client case studies.",
            ],
            takeaway: "A working prototype in your sandbox is 100x more persuasive than a static PDF portfolio.",
          },
        ],
        writtenContent: "Prototype schema configuration, pre-loaded test data sets, and Make.com scenario templates.",
      },
      {
        id: "02-2",
        number: "2.2",
        title: "Day 10: Generating Synthetic Social Proof & Case Study Assets",
        duration: "13m",
        summary: "Document the prototype's performance metrics: time saved, error rates, and speed-to-lead benchmarks to create authoritative case assets.",
        slides: [
          {
            title: "Authoritative Demonstration Assets",
            subtitle: "How to produce compelling case study documents before landing your first paying client",
            bulletPoints: [
              "Transparent Benchmarking: 'We ran 50 real-world HVAC commercial inquiries through the prototype: average response time 72 seconds.'",
              "Side-by-Side Comparison Graphic: Manual Quoting (4.5 hours, 3 software logins) vs Automated Engine (1.2 minutes, 1 click).",
              "The Architecture Diagram: Clean visual flowchart showing how incoming leads flow into Airtable and CRM databases.",
              "Packaging into a 2-Page Executive Brief: Clear problem, architecture, benchmarks, and expected commercial ROI.",
            ],
            takeaway: "Rigorous technical benchmarks and transparent testing create undeniable credibility.",
          },
        ],
        writtenContent: "Case study documentation templates, benchmark tracking sheets, and diagramming design assets.",
      },
      {
        id: "02-3",
        number: "2.3",
        title: "Day 11: Recording the 3-Minute 'Loom Demo' Master Video",
        duration: "13m",
        summary: "Record an engaging, high-energy 3-minute video walkthrough showcasing the live prototype and explaining the business ROI.",
        slides: [
          {
            title: "The 3-Minute Demo Video Formula",
            subtitle: "Scripting a high-converting video that prospects actually watch to completion",
            bulletPoints: [
              "0:00 - 0:30 (The Hook): Showing their website form and identifying the current response delay.",
              "0:30 - 1:45 (The Live Demo): Submitting a test lead and showing the proposal generate live in 60 seconds.",
              "1:45 - 2:30 (The Business Impact): Explaining the speed-to-lead advantage and hours saved for administrative staff.",
              "2:30 - 3:00 (The Low-Friction CTA): 'If you'd like to test this on your own catalog, let's grab 15 minutes.'",
            ],
            takeaway: "Keep videos under 3 minutes, focus 80% on their business outcome, and demonstrate real software execution.",
          },
        ],
        writtenContent: "Complete word-for-word Loom video script, screen recording best practices, and thumbnail design tips.",
      },
      {
        id: "02-4",
        number: "2.4",
        title: "Day 12: Stress-Testing Edge Cases & Preparing Demo Environments",
        duration: "13m",
        summary: "Verify error handling, webhook rate limits, and fallback notifications so your live demos never glitch during discovery calls.",
        slides: [
          {
            title: "Live Demo Risk Mitigation",
            subtitle: "Ensuring 100% flawless execution during live prospective client calls",
            bulletPoints: [
              "Pre-caching test data: Having backup records in Airtable in case an external API experiences latency.",
              "Screen layout optimization: Organizing browser tabs (Website Form, Airtable Dashboard, Generated PDF, Inbox).",
              "Handling internet drops: Having an offline video backup ready to share instantly if connection buffers.",
              "Confidence calibration: Rehearsing the 5-minute walkthrough until delivery feels effortless and conversational.",
            ],
            takeaway: "Preparation removes sales anxiety. When you know your demo cannot break, closing calls are relaxed.",
          },
        ],
        writtenContent: "Pre-call technical checklist, tab layout guides, and offline fallback procedures.",
      },
    ],
  },
  {
    id: "module-03",
    number: "03",
    title: "Week 2: Sourcing Prospects & Multi-Touch Outreach",
    description: "Days 13 to 19: Build a verified list of 100 high-fit commercial prospects and launch personalized multi-touch outreach campaigns.",
    duration: "50m",
    lessons: [
      {
        id: "03-1",
        number: "3.1",
        title: "Day 13-14: Prospect Sourcing: Building a 100-Company Verified Target List",
        duration: "13m",
        summary: "Use Google Maps, Apollo.io, and LinkedIn Sales Navigator to identify 100 qualified businesses with verified owner email addresses.",
        slides: [
          {
            title: "Precision B2B Prospect Sourcing",
            subtitle: "Filtering for companies with active hiring, high volume, and operational strain",
            bulletPoints: [
              "Sourcing Criteria: Companies with 5–50 employees, active Google/Meta ads, and visible office staff.",
              "Finding the Decision Maker: Identifying the Owner, Managing Partner, Director of Operations, or General Manager.",
              "Email Verification: Validating contact emails through NeverBounce or ZeroBounce to maintain 99%+ deliverability.",
              "Documenting Key Signals in Airtable: Noting current form tools, recent company news, and customer review volume.",
            ],
            takeaway: "100 hyper-targeted, verified prospects outperform 5,000 scraped, unqualified email addresses.",
          },
        ],
        writtenContent: "Prospecting filters for Apollo and LinkedIn, email verification workflows, and lead qualification criteria.",
      },
      {
        id: "03-2",
        number: "3.2",
        title: "Day 15-16: The 'Personalized Video Audit' Outreach Protocol",
        duration: "13m",
        summary: "Record custom 90-second video audits for your top 30 tier-A prospects and send hyper-personalized email pitches.",
        slides: [
          {
            title: "The 90-Second Personalized Audit Pitch",
            subtitle: "Outreach that gets 40%+ open rates and 15%+ response rates from busy owners",
            bulletPoints: [
              "Subject Line Formula: 'Quick question about {{Company}}'s quote request form'",
              "Opening Hook: 'Noticed you guys do commercial work in {{City}}—had a quick observation about your contact workflow.'",
              "The Value Asset: 'I recorded a 90-second video showing how your inbound leads can receive instant proposals.'",
              "Zero-Pressure CTA: 'No worries if you're fully booked, but here's the link if you'd like to check it out: {{Loom_Link}}'",
            ],
            takeaway: "Demonstrating respect for their time with a personalized video cuts through the noise of generic cold email.",
          },
        ],
        writtenContent: "Word-for-word cold email templates, follow-up sequences, and animated GIF preview generation guides.",
      },
      {
        id: "03-3",
        number: "3.3",
        title: "Day 17-18: Multi-Touch Cadence: Combining Email, LinkedIn & Warm Network",
        duration: "12m",
        summary: "Execute a structured 4-touch outreach sequence across 7 business days without becoming annoying or spammy.",
        slides: [
          {
            title: "The 4-Touch Follow-Up Architecture",
            subtitle: "How 70% of meeting bookings happen on the 2nd and 3rd follow-up touchpoint",
            bulletPoints: [
              "Touch 1 (Day 1): Personalized video audit email.",
              "Touch 2 (Day 3): LinkedIn connection request with a polite, non-salesy message referencing the email.",
              "Touch 3 (Day 5): Quick follow-up email sharing a 1-page architecture diagram asset.",
              "Touch 4 (Day 8): The 'Closing the Loop' email: 'Assuming this isn't a priority right now—wishing you guys a great quarter!'",
            ],
            takeaway: "Professional follow-up signals persistence, organization, and respect for their busy schedule.",
          },
        ],
        writtenContent: "Multi-channel touchpoint timeline, LinkedIn connection scripts, and breakup email templates.",
      },
      {
        id: "03-4",
        number: "3.4",
        title: "Day 19: Handling Responses, Overcoming Skepticism & Booking Calls",
        duration: "12m",
        summary: "Convert prospect email replies into scheduled calendar discovery appointments in under 3 exchanges.",
        slides: [
          {
            title: "From Email Reply to Scheduled Call",
            subtitle: "Frictionless calendar booking techniques that lock in high-intent discovery calls",
            bulletPoints: [
              "Handling 'How much does this cost?': 'Sprints range between $1,500 and $2,500 flat. Mind if I show you the live sandbox so you can see if it fits?'",
              "Handling 'We already have software': 'Totally understand! This actually connects to your existing software via webhooks rather than replacing it.'",
              "Frictionless Booking Link: Providing 2 specific times + a direct Cal.com calendar link.",
              "Immediate Calendar Confirmation: Automated calendar invite with brief agenda and video conference link.",
            ],
            takeaway: "Never answer pricing in isolation without anchoring value and booking the live diagnostic call.",
          },
        ],
        writtenContent: "Objection handling response scripts, calendar booking email templates, and calendar confirmation SOPs.",
      },
    ],
  },
  {
    id: "module-04",
    number: "04",
    title: "Week 3: The 20-Minute Diagnostic Discovery Call",
    description: "Days 20 to 24: Lead professional diagnostic sales conversations, demonstrate your live prototype, and qualify client budget.",
    duration: "48m",
    lessons: [
      {
        id: "04-1",
        number: "4.1",
        title: "Day 20: The 20-Minute Call Framework: Agenda, Authority & Diagnosis",
        duration: "12m",
        summary: "Structure your 20-minute sales conversation: Set the agenda, establish peer authority, and ask diagnostic questions.",
        slides: [
          {
            title: "The 20-Minute Diagnostic Call Framework",
            subtitle: "How to position yourself as an expert technical advisor rather than a desperate salesperson",
            bulletPoints: [
              "0:00 - 3:00 (Agenda Setting): 'The goal today is to look at your current quote workflow, see if our system fits, and if so, map out next steps.'",
              "3:00 - 10:00 (Diagnostic Questioning): Uncovering their current response time, administrative overhead, and lost deal volume.",
              "10:00 - 16:00 (The Live Sandbox Demo): Showing their actual brand or industry workflow in real-time.",
              "16:00 - 20:00 (Next Steps & Agreement): Outlining the 7-day sprint scope and scheduling the proposal review.",
            ],
            takeaway: "He who asks the questions controls the conversation. Spend 50% of the call listening.",
          },
        ],
        writtenContent: "Complete 20-minute call agenda script, opening rapport frameworks, and transition phrases.",
      },
      {
        id: "04-2",
        number: "4.2",
        title: "Day 21: Live Interactive Demonstration: Tailoring to Their Brand in Real-Time",
        duration: "12m",
        summary: "Showcase your sandbox prototype tailored with the prospect's company logo, service catalog, and typical pricing tiers.",
        slides: [
          {
            title: "The Real-Time Tailored Sandbox Demo",
            subtitle: "The psychological impact of showing a prospect their own business running on autopilot",
            bulletPoints: [
              "The 10-Minute Pre-Call Prep: Adding their logo and 3 actual services into your Airtable sandbox base.",
              "The 'Live Test': Asking the prospect: 'Give me a typical inquiry you got this week—let's type it in together.'",
              "The Reveal: Watching the AI evaluate the request, generate the custom SOW, and draft the email in 45 seconds.",
              "Checking Reactions: 'How much time does your team currently spend typing up that exact same quote?'",
            ],
            takeaway: "When a prospect sees their own services automated on screen, purchasing becomes an emotional certainty.",
          },
        ],
        writtenContent: "Sandbox personalization checklist, live testing script, and prospect engagement prompts.",
      },
      {
        id: "04-3",
        number: "4.3",
        title: "Day 22: Overcoming The Big 3 Objections: Security, Hallucinations & Cost",
        duration: "12m",
        summary: "Master authoritative answers to enterprise concerns: data privacy, AI errors/hallucinations, and software subscription costs.",
        slides: [
          {
            title: "Defusing Enterprise Objections",
            subtitle: "Confident, technical answers that eliminate client hesitation and close deals",
            bulletPoints: [
              "Objection 1 (Security): 'Your data is processed via enterprise APIs with zero training retention. All credentials remain in your private accounts.'",
              "Objection 2 (Hallucinations): 'The model only selects from your pre-approved pricing matrix. Human-in-the-loop interfaces require staff sign-off before sending.'",
              "Objection 3 (Cost): 'The software licenses cost ~$50/month. The system only needs to save 2 hours of admin time per week to be 100% ROI positive.'",
              "Checking Alignment: 'Does that structure give you the peace of mind you need to move forward?'",
            ],
            takeaway: "Objections are requests for clarification. Answer with technical specificity and calm confidence.",
          },
        ],
        writtenContent: "Word-for-word objection handling responses, security compliance bullet points, and client assurance letters.",
      },
      {
        id: "04-4",
        number: "4.4",
        title: "Day 23-24: Closing on the Call & Setting Up the SOW Review",
        duration: "12m",
        summary: "Secure verbal agreement on the call and schedule the 15-minute Statement of Work review within 48 hours.",
        slides: [
          {
            title: "Securing the Verbal Commitment",
            subtitle: "Locking in project momentum without high-pressure sales gimmicks",
            bulletPoints: [
              "The Natural Close: 'Based on what we looked at today, we can have this fully built, tested, and live in your business in 7 days.'",
              "Checking Agreement: 'Would you like me to draft up the standard 1-page SOW so we can get this on the build calendar?'",
              "Setting the Review Call: 'I'll have the agreement ready by tomorrow afternoon—let's grab 10 minutes at 3:00 PM to review and kick off.'",
              "Deposit Invoice Preparation: Generating the 50% deposit invoice in Stripe immediately following the call.",
            ],
            takeaway: "Always book the proposal review call before hanging up. Never email proposals into a vacuum.",
          },
        ],
        writtenContent: "Closing scripts, verbal agreement protocols, and SOW scheduling email templates.",
      },
    ],
  },
  {
    id: "module-05",
    number: "05",
    title: "Week 3.5: Proposals, SOWs & Closing Without Haggling",
    description: "Days 25 to 27: Present clear, 1-page Statements of Work, collect the 50% deposit, and protect project boundaries.",
    duration: "47m",
    lessons: [
      {
        id: "05-1",
        number: "5.1",
        title: "Day 25: The 1-Page High-Converting SOW Template",
        duration: "12m",
        summary: "Structure a clean, 1-page agreement covering scope, milestones, revision limits, and payment terms.",
        slides: [
          {
            title: "The 1-Page High-Converting SOW",
            subtitle: "Why 1-page agreements get signed in 24 hours while 20-page proposals gather dust",
            bulletPoints: [
              "Section 1: Project Objective (Automating speed-to-lead and quote generation).",
              "Section 2: Concrete Deliverables (Airtable Base, Make.com Scenario, Document Template, Staff SOP).",
              "Section 3: Project Timeline (Kickoff Day 1, Demonstration Day 5, Live Deployment Day 7).",
              "Section 4: Investment & Terms (50% deposit $1,250 to start; 50% balance $1,250 on live staff sign-off).",
            ],
            takeaway: "Simplicity builds trust. A clear 1-page contract communicates professional competence.",
          },
        ],
        writtenContent: "Complete 1-page SOW contract template with signature blocks and payment terms.",
      },
      {
        id: "05-2",
        number: "5.2",
        title: "Day 26: The 15-Minute SOW Review & Deposit Collection Call",
        duration: "12m",
        summary: "Walk the client through the SOW on screen, collect the digital signature, and process the 50% deposit live.",
        slides: [
          {
            title: "The 15-Minute SOW Review Call",
            subtitle: "Guiding the client through the contract and collecting the deposit without friction",
            bulletPoints: [
              "Screen Sharing the Agreement: Reading through the deliverables and timeline together line by line.",
              "Addressing Final Questions: Confirming client account ownership and credential security.",
              "Live Digital Signing: Having the client sign via DocuSign or PandaDoc during the screen share.",
              "Processing the Deposit: Sending the Stripe checkout link in chat: 'Once this clears, our build calendar is officially locked.'",
            ],
            takeaway: "Signing and paying together on the call eliminates the 2-week email chase.",
          },
        ],
        writtenContent: "SOW review script, digital signature configuration guide, and Stripe checkout link setup.",
      },
      {
        id: "05-3",
        number: "5.3",
        title: "Day 27: Dealing with Price Pushback, Payment Terms & Procurement",
        duration: "12m",
        summary: "Handle budget negotiation gracefully without discounting your core price: adjust scope, offer split payments, or hold firm.",
        slides: [
          {
            title: "Defending Your Pricing Without Conceding",
            subtitle: "How to negotiate scope rather than discounting your professional fee",
            bulletPoints: [
              "The Golden Rule: Never lower your price without removing a deliverable from scope.",
              "Handling 'Can you do this for $1,500?': 'We can do $1,500 if we remove the custom CRM sync and stick to the core Airtable interface.'",
              "Split Payment Option: Offering 3 installments ($900 x 3) for smaller trade clients.",
              "Procurement Reassurance: Providing standard W-9 and vendor registration documents instantly.",
            ],
            takeaway: "Discounting your price devalues your work. Adjusting scope preserves your authority and margins.",
          },
        ],
        writtenContent: "Scope negotiation scripts, installment agreement addendums, and vendor onboarding forms.",
      },
      {
        id: "05-4",
        number: "5.4",
        title: "The 'Founding Client' Case Study Incentive Clause",
        duration: "11m",
        summary: "Trade a small incentive for a guaranteed video testimonial and permission to publish a verified case study upon completion.",
        slides: [
          {
            title: "The Founding Client Testimonial Clause",
            subtitle: "Turning your very first paying client into permanent social proof for future deals",
            bulletPoints: [
              "The Strategic Trade: 'In exchange for our Founding Client rate, you agree to record a 2-minute video review upon delivery.'",
              "Case Study Rights: Gaining permission to use their anonymized data and workflow screenshots in future marketing.",
              "Contractual Commitment: Embedding the testimonial commitment directly into the SOW agreement.",
              "The Compounding Effect: Your first client case study makes closing the second client 3x faster.",
            ],
            takeaway: "Your first client's case study is worth more than their setup fee. Capture it systematically.",
          },
        ],
        writtenContent: "Case study release agreement clauses, video review question templates, and client interview guidelines.",
      },
    ],
  },
  {
    id: "module-06",
    number: "06",
    title: "Week 4 & Beyond: Delivery, Retainers & The 90-Day Scale",
    description: "Days 28 to 30+: Deliver the project flawlessly in 7 days, convert the client to an $800/mo retainer, and scale to $10K MRR.",
    duration: "48m",
    lessons: [
      {
        id: "06-1",
        number: "6.1",
        title: "Day 28: Client Onboarding & Automated Kickoff Protocol",
        duration: "12m",
        summary: "Send the automated kickoff email, collect API keys securely, and set up client-owned software accounts.",
        slides: [
          {
            title: "Frictionless Client Onboarding",
            subtitle: "Making clients feel instantly reassured that they hired a true professional",
            bulletPoints: [
              "Automated Kickoff Email: Dispatched within 10 minutes of deposit payment clearing.",
              "1Password / Bitwarden Secure Link: Collecting API keys and account access without emailing plaintext passwords.",
              "Client Account Architecture: Ensuring the client owns their Make.com, Airtable, and OpenAI accounts.",
              "The Kickoff Questionnaire: Clarifying exact pricing tiers, business hours, and staff notification emails.",
            ],
            takeaway: "Fast, organized onboarding eliminates buyer's remorse and sets the standard for the engagement.",
          },
        ],
        writtenContent: "Client onboarding email templates, password security SOPs, and technical kickoff questionnaires.",
      },
      {
        id: "06-2",
        number: "6.2",
        title: "Day 29: Flawless 7-Day Sprint Delivery & Staff Training",
        duration: "12m",
        summary: "Execute the rapid build, record a 10-minute staff training video, and conduct the live handover meeting.",
        slides: [
          {
            title: "The 7-Day Delivery & Training Playbook",
            subtitle: "Delivering a finished system that staff actually understand and love using",
            bulletPoints: [
              "Building in Client Staging: Constructing the workflows directly in the client's private environment.",
              "The 10-Minute Staff Video SOP: Showing employees exactly what button to click and what to check.",
              "The Live Handover Call: Walking the business owner and administrative staff through a real test lead.",
              "Collecting the Final 50% Balance: Processing the completion invoice during the handover meeting.",
            ],
            takeaway: "Great software fails if employees don't use it. Clear 10-minute training guarantees adoption.",
          },
        ],
        writtenContent: "Staff training SOP templates, video recording checklists, and project sign-off forms.",
      },
      {
        id: "06-3",
        number: "6.3",
        title: "Day 30: Pitching & Closing the Ongoing Monthly Retainer",
        duration: "12m",
        summary: "Pitch the $800–$1,200/month ongoing maintenance retainer at the moment of highest client satisfaction.",
        slides: [
          {
            title: "Closing the Ongoing Support Retainer",
            subtitle: "Securing your first recurring revenue stream on Day 30 of the blueprint",
            bulletPoints: [
              "The Handover Transition: 'The system is live and running. To keep it maintained, updated, and monitored, we have our monthly partner retainer.'",
              "The Retainer Scope: 24/7 error monitoring, monthly prompt optimization, API updates, and priority emergency support.",
              "The Retainer Price: $850/month with zero long-term contract (30-day cancellation notice).",
              "Automating the Subscription: Setting up the recurring credit card billing in Stripe immediately.",
            ],
            takeaway: "Your first paying client should also become your first recurring retainer client.",
          },
        ],
        writtenContent: "Retainer pitch scripts, monthly maintenance agreements, and Stripe subscription setup guides.",
      },
      {
        id: "06-4",
        number: "6.4",
        title: "Days 31-90: The Multi-Client Execution Calendar to $10,000 MRR",
        duration: "12m",
        summary: "Scale your outreach, maintain high client retention, and systematically build to 8 retainer clients generating $10,000+ monthly.",
        slides: [
          {
            title: "The 90-Day Scaling Blueprint to $10K MRR",
            subtitle: "The mathematical and operational path to a 6-figure solo AI agency",
            bulletPoints: [
              "The 90-Day Math: 8 retainer clients @ $1,000/mo + 2 new implementation sprints/mo @ $2,500 = $13,000/month.",
              "Weekly Prospecting Cadence: Sending 20 personalized video audits every week like clockwork.",
              "The Referral Engine: Asking satisfied clients for 1 warm introduction to another business owner in their network.",
              "Sustainable Solo Operations: Managing 8 retainers in under 15 hours a week with 88%+ net profit margins.",
            ],
            takeaway: "Consistency in weekly outreach and operational excellence in client delivery make $10K MRR predictable.",
          },
        ],
        writtenContent: "90-day scaling roadmap, weekly KPI tracking sheets, and referral generation scripts.",
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

export const AGENCY_BLUEPRINT_DETAIL_DATA: PlaybookDetailData = {
  id: AGENCY_BLUEPRINT_ID,
  slug: AGENCY_BLUEPRINT_SLUG,
  title: "The 30-Day AI Agency Blueprint: From Zero Portfolio to Paying Clients",
  headline:
    "A day-by-day, 30-day operational roadmap to launch a high-ticket B2B AI automation agency, build a working prototype, and land your first paying clients.",
  description:
    "An exhaustive, execution-first 30-day curriculum teaching you how to build a high-margin AI automation agency from scratch. Follow the exact daily milestones to select a profitable B2B niche, construct a live sandbox prototype, source 100 verified decision-makers, send personalized 3-minute video audits, master 20-minute diagnostic discovery calls, and close $2,500 sprints and $1,000/month retainers.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "High Demand",
  rating: 4.9,
  ratingCount: 345,
  studentsCount: "1,680",
  instructorName: "Plugd Agency Operations Group",
  instructorTitle: "Agency Scale Advisors & B2B Growth Specialists",
  instructorBio:
    "The Plugd Agency Operations Group advises enterprise consultants and agency founders on B2B client acquisition, high-margin service packaging, and sustainable retainer scaling.",
  instructorRating: 4.9,
  instructorReviews: "345",
  instructorStudents: "1,680",
  instructorCourses: 3,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "6.0 hours",
  modulesCount: 6,
  lessonsCount: 24,
  whatYouWillLearn: [
    "Execute the day-by-day 30-day roadmap from zero portfolio to signed commercial client contracts",
    "Identify profitable B2B niches with $50K+ monthly payroll and quantifiable operational leaks",
    "Package the irresistible 'No-Brainer' Micro-Offer: The 7-Day Inbound Proposal Engine for $2,500",
    "Build a universal working prototype in Airtable and Make.com in 48 hours without writing custom code",
    "Source 100 verified decision-maker emails using precision Apollo and LinkedIn Sales Navigator filters",
    "Record high-converting 90-second personalized Loom video audits that get 40%+ open rates",
    "Master the 20-Minute Diagnostic Discovery Call and confidently overcome security, hallucination, and pricing objections",
    "Present 1-page high-converting Statements of Work (SOWs) and collect 50% deposits on the screen share",
    "Execute flawless 7-day client onboarding and delivery while maintaining 85%+ net profit margins",
    "Transition sprint clients into $800–$1,200/month recurring retainers using the automated Friday ROI report",
  ],
  relatedTopics: [
    "AI Agency Blueprint",
    "Client Acquisition",
    "Cold Outreach & Video Audits",
    "B2B Sales & Discovery Calls",
    "Statements of Work (SOW)",
    "Retainer Scaling",
  ],
  requirements: [
    "No computer science degree, custom model training, or prior agency experience required",
    "A computer with internet access and basic familiarity with no-code tools (Make.com, Airtable)",
    "Commitment to execute the daily outreach and prototype building milestones over 30 days",
  ],
  descriptionSections: {
    intro: [
      "Most aspiring agency founders fail because they spend months building an elaborate website, debating business names, and reading AI news without ever having a sales conversation with a real business owner.",
      "The founders who succeed follow a completely different playbook: they pick a proven B2B niche with manual bottlenecks, build a working prototype in 48 hours, and reach out directly with personalized video audits that prove value upfront.",
      "The 30-Day AI Agency Blueprint is an intensive, step-by-step operational guide. It breaks down the exact daily milestones required to build your prototype sandbox, source qualified prospects, lead discovery calls, collect 50% upfront deposits, and secure monthly recurring retainers.",
    ],
    keyPointsTitle: "Comprehensive 30-Day Day-by-Day Milestone Curriculum",
    keyPoints: [
      "Week 1 (Days 1–7): Niche selection, overhead criteria, diagnosing $10K leaks, and lean infrastructure setup",
      "Week 1.5 (Days 8–12): Building the universal prototype sandbox, synthetic benchmarks, and the 3-minute Loom demo",
      "Week 2 (Days 13–19): Sourcing 100 verified prospects, personalized video audits, and multi-touch cadences",
      "Week 3 (Days 20–24): The 20-minute diagnostic discovery call, live sandbox tailoring, and defusing enterprise objections",
      "Week 3.5 (Days 25–27): The 1-page SOW contract, deposit collection on screen share, and scope defense",
      "Week 4 & Beyond (Days 28–30+): Client onboarding, 7-day sprint delivery, retainer conversion, and scaling to $10K MRR",
    ],
    closing: [
      "Every single lesson contains actionable daily tasks, word-for-word outreach scripts, SOW contract templates, diagnostic interview questions, and financial planning spreadsheets.",
      "Whether you are launching your first freelance practice or pivoting an existing service business into AI automation, this Playbook provides the exact operational blueprints to acquire paying B2B clients.",
    ],
  },
  targetAudience: [
    "Aspiring agency founders looking for a disciplined, predictable 30-day execution roadmap",
    "Freelancers and consultants ready to transition from low-paying gigs to $2,500 commercial contracts",
    "Operators who want to build a high-margin service firm with predictable recurring retainer stability",
  ],
  includes: [
    { iconName: "layers", text: "6 Structured Modules & 24 Daily Action Lessons" },
    { iconName: "file-text", text: "Executive Slide Decks & Comprehensive Written Roadmaps" },
    { iconName: "video", text: "Copy-Paste Cold Email Scripts, SOW Contracts & Discovery Guides" },
    { iconName: "smartphone", text: "Optimized for Mobile, Tablet & Desktop Learning" },
    { iconName: "infinity", text: "Full Lifetime Access with Zero Hidden Fees" },
    { iconName: "shield-check", text: "100% Free Access During The Content Review Phase" },
  ],
  modules: detailModules,
  testimonials: [
    {
      name: "Nathaniel Drake",
      role: "Founder, Apex AI Operations",
      rating: 5,
      quote:
        "Followed the Week 2 video audit framework to the letter. Sent 25 personalized Loom audits to commercial roofing contractors—booked 4 discovery calls and closed a $2,500 proposal engine in my third week.",
      initials: "ND",
      date: "October 2026",
    },
    {
      name: "Chloe Vance",
      role: "Managing Partner, B2B Automation",
      rating: 5,
      quote:
        "The 1-page SOW contract and live review call structure eliminated all procurement hesitation. Having the client sign and pay the 50% deposit on the screen share is a complete game changer.",
      initials: "CV",
      date: "October 2026",
    },
  ],
  faqs: [
    {
      question: "Can I realistically land a paying client in 30 days without prior case studies?",
      answer:
        "Yes. That is precisely why Week 1.5 focuses on building a live, working prototype in your sandbox. When you demonstrate a real, functioning automation tailored to the prospect's brand on screen, clients evaluate your software in front of their eyes rather than demanding past references.",
    },
    {
      question: "What if prospects ask for client references I don't have yet?",
      answer:
        "We teach you the 'Founding Client' positioning strategy: offering a guaranteed priority turnaround and dedicated support in exchange for an agreed-upon video case study upon completion. Transparent confidence beats invented credentials every time.",
    },
    {
      question: "How many hours per day does this 30-day blueprint require?",
      answer:
        "Roughly 1.5 to 2 hours per day. Because tasks are structured into concrete daily milestones (e.g. Day 13: Source 50 leads; Day 15: Record 5 audits), you can execute the blueprint alongside a full-time job or existing client commitments.",
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
      `Review day-by-day sprint milestone for ${l.title}`,
      `Execute daily prospecting action plan`,
      `Update client acquisition pipeline tracking CRM`,
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

export const AGENCY_BLUEPRINT_COURSE: Course = {
  id: AGENCY_BLUEPRINT_ID,
  slug: AGENCY_BLUEPRINT_SLUG,
  categorySlug: "ai-businesses",
  categoryName: "AI Businesses",
  title: "The 30-Day AI Agency Blueprint: From Zero Portfolio to Paying Clients",
  shortTitle: "30-Day AI Agency Blueprint",
  audience: "Agency Founders, Freelancers & Growth Consultants",
  targetGender: "for-all",
  headline:
    "A day-by-day, 30-day operational roadmap to launch a high-ticket B2B AI automation agency, build a working prototype, and land your first paying clients.",
  subheadline:
    "An exhaustive, execution-first 30-day curriculum teaching you how to build a high-margin AI automation agency from scratch without previous case studies.",
  description:
    "A day-by-day execution curriculum teaching operators how to source prospects, build live prototypes, lead discovery calls, and close $2,500 sprints.",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  badge: "High Demand",
  rating: 4.9,
  ratingCount: 345,
  hoursOfMaterial: "6.0 hours",
  modulesCount: 6,
  lessonsCount: 24,
  primaryColor: "#d97706",
  accentColor: "#38bdf8",
  outcomes: [
    "Execute the 30-day roadmap from zero portfolio to signed client contracts",
    "Build a universal working prototype in Airtable and Make.com in 48 hours",
    "Source 100 verified decision-makers and send 3-minute personalized Loom audits",
    "Close $2,500 implementation sprints and secure $1,000/mo ongoing retainers",
  ],
  modules: courseModules,
  testimonials: [
    {
      name: "Nathaniel Drake",
      role: "Founder, Apex AI Operations",
      quote:
        "Followed the Week 2 video audit framework to the letter. Sent 25 personalized Loom audits to commercial roofing contractors—booked 4 discovery calls and closed a $2,500 proposal engine in my third week.",
      handle: "@nathan_drake",
    },
  ],
};

export const DETAIL_AGENCY_BLUEPRINT_DATA = AGENCY_BLUEPRINT_DETAIL_DATA;
