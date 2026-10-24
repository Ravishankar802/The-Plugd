import { Lesson } from "@/lib/playbooks-data";
import { ExtendedLesson } from "./ai-service-business-content-1";

// =========================================================================
// MODULE 03: Building The Core Service Deliverables
// =========================================================================
export const MODULE_03_LESSONS: ExtendedLesson[] = [
  {
    id: "03-1",
    number: "3.1",
    title: "Deliverable 1: The Automated Inbound Lead Triaging & Instant Proposal Engine",
    duration: "13 min",
    summary:
      "A complete technical walkthrough of building our flagship $2,500 service deliverable: an automated pipeline that scores inbound leads, enriches company data, and drafts tailored proposal decks in under two minutes.",
    learningObjective:
      "Build an end-to-end inbound qualification system connecting webhooks, Claude 3.7 evaluation logic, Airtable CRM tables, and automated proposal drafting.",
    takeaway:
      "Businesses lose 40% of deals due to slow quote turnarounds. Deploying an instant evaluation and proposal drafting engine delivers immediate, measurable ROI.",
    slides: [
      {
        id: "s-0301-1",
        order: 1,
        type: "TITLE",
        eyebrow: "DELIVERABLE 01 · LEAD TRIAGE & PROPOSALS",
        headline: "DELIVERABLE 1: THE INBOUND QUALIFICATION & PROPOSAL ENGINE",
        subheadline: "How to build and deploy the single most requested $2,500 enterprise automation system.",
      },
      {
        id: "s-0301-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "The company that delivers a customized, intelligent quote while the prospect is still on their website wins the deal 70% of the time.",
        subheadline: "Replace a 48-hour manual estimation delay with an automated 90-second cognitive workflow.",
      },
      {
        id: "s-0301-3",
        order: 3,
        type: "FRAMEWORK",
        headline: "The 4-Step Technical Architecture",
        subheadline: "How the data moves from raw submission to formatted proposal.",
        pillars: [
          {
            badge: "STEP 1 · INTAKE",
            title: "Smart Intake Webhook",
            description: "Captures prospect company name, project scope, budget range, and timeline via client's existing website form.",
          },
          {
            badge: "STEP 2 · COGNITION",
            title: "Claude 3.7 Evaluator",
            description: "Scores lead quality (1-10), checks fit against client's target avatar, and generates structured proposal bullet points.",
          },
          {
            badge: "STEP 3 · AIRTABLE SYNC",
            title: "CRM Entity Creation",
            description: "Creates linked records for the Account, Lead, and Draft Proposal with an editable approval status.",
          },
          {
            badge: "STEP 4 · DISPATCH",
            title: "Executive Alert & Draft",
            description: "Alerts the sales director via Slack with 1-click 'Approve & Send' button or automatically sends preliminary brief.",
          },
        ],
      },
      {
        id: "s-0301-4",
        order: 4,
        type: "SCENARIO",
        headline: "Real-World Delivery: Commercial Painting Contractor",
        scenario: {
          situation: "Contractor receives 80 inquiries monthly for commercial facility repainting. Estimator takes 3 days to travel, calculate square footage, and email PDFs.",
          instinctiveReaction: "Hiring an assistant estimator at $45,000/year who still struggles to keep up during peak season.",
          calibratedMove: "Deploy an Airtable intake form with Claude estimation formulas that calculate ballpark labor and materials instantly, emailing a preliminary bid in 2 minutes.",
          whyItWorks: "Prospects receive immediate pricing clarity; the estimator only visits qualified high-budget leads, doubling closed revenue in 60 days.",
        },
      },
      {
        id: "s-0301-5",
        order: 5,
        type: "CHECKLIST",
        headline: "Deliverable 1 Quality Checklist",
        subheadline: "Verify before handing over to the client.",
        checklist: [
          { label: "Webhook response time is under 3000ms", passed: true, note: "Prevents browser form submission timeouts" },
          { label: "Lead score accurately flags budget mismatches", passed: true, note: "If budget < $3,000, mark priority as 'Nurture'" },
          { label: "Sales staff receive instant push alerts with summary", passed: true, note: "Slack, Telegram, or SMS alert with 1-sentence synopsis" },
          { label: "Proposal draft contains zero placeholder brackets", passed: true, note: "All company variables populated dynamically" },
        ],
      },
      {
        id: "s-0301-6",
        order: 6,
        type: "CHAPTER_END",
        headline: "Lesson 3.1 Complete",
        subheadline: "Next up: Deliverable 2 — The Executive Knowledge Extraction & Market Intelligence Dossier.",
      },
    ],
    writtenLesson: `
# Deliverable 1: The Automated Inbound Lead Triaging & Instant Proposal Engine

This is your agency's **flagship service deliverable**. When you pitch this solution to a company doing $1M+ in revenue, the closing rate is exceptionally high because every business owner intuitively understands the cost of slow lead response times.

---

## The Core Problem You Are Solving
When an enterprise prospect searches for a vendor, they open 3 tabs in their browser and fill out contact forms on all three websites.
- Competitor A takes 24 hours to reply.
- Competitor B takes 4 days to reply.
- **Your Client** replies within **90 seconds** with an intelligent, personalized email addressing the prospect's exact project requirements, sharing relevant case studies, and offering a one-click link to schedule a discovery call with a preliminary budget bracket.

Your client wins that deal almost every single time.

---

## Technical Build Blueprint

### 1. The Intake Form (Airtable / Webhook)
Create a clean Airtable Form or embed a Typeform on the client's website with 5 high-leverage fields:
- Contact Name & Corporate Email
- Company Website URL
- Service Category (Dropdown)
- Project Description / Pain Point (Paragraph)
- Estimated Project Timeline & Budget (Dropdown)

### 2. Make.com Scenario Setup
1. **Webhook Node:** Captures the JSON submission.
2. **Anthropic Claude API Node:** Passes the submission data with the system prompt:
   \`\`\`
   You are the Senior Estimation Director for [Client Company].
   Evaluate the prospect's scope of work. 
   Generate a 3-paragraph executive reply that:
   1. References their specific industry challenges.
   2. Outlines our 3-step execution methodology.
   3. Suggests a preliminary budget range based on our pricing schedule.
   Return pure JSON with keys: 'lead_score', 'budget_tier', 'draft_email_subject', 'draft_email_body'.
   \`\`\`
3. **Airtable Create Record:** Creates a new record in the \`Leads\` table. Sets \`Approval Status\` to \`Pending Human Review\`.
4. **Slack / Microsoft Teams Alert:** Sends an interactive message into the client's sales channel:
   *"🔥 New High-Value Lead: [Company Name] (Score: 9/10). Draft proposal generated. Click here to approve or edit."*
5. **Staff One-Click Approval:** Once the sales rep clicks "Approved" in their Airtable Interface, Make.com automatically fires the email from the rep's personal Gmail/Outlook account.

---

## Action Task
Build this exact 4-node flow in your Make.com account. Connect a free Airtable Base and test it with a sample submission. Verify that a complete draft proposal appears in Airtable within 45 seconds of form submission.
    `,
  },
  {
    id: "03-2",
    number: "3.2",
    title: "Deliverable 2: The Executive Knowledge Extraction & Market Intelligence Dossier",
    duration: "13 min",
    summary:
      "Learn how to build an automated document intelligence pipeline that ingests long PDFs, vendor agreements, and industry transcripts, extracting high-value executive briefings into structured Airtable databases.",
    learningObjective:
      "Construct a document processing engine using Claude 3.7's 200K context window to ingest unstructured documents and produce structured intelligence dossiers.",
    takeaway:
      "Companies drown in unread 50-page PDFs. An automated pipeline that extracts key risks, pricing tables, and deadlines saves 15 hours of analyst payroll weekly.",
    slides: [
      {
        id: "s-0302-1",
        order: 1,
        type: "TITLE",
        eyebrow: "DELIVERABLE 02 · KNOWLEDGE EXTRACTION",
        headline: "DELIVERABLE 2: EXECUTIVE KNOWLEDGE DOSSIERS",
        subheadline: "Turning unread 50-page PDFs and client briefs into instant, structured intelligence hubs.",
      },
      {
        id: "s-0302-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "High-value professionals do not want to read 60-page PDF contracts. They want the 5 commercial risks, payment milestones, and obligations.",
        subheadline: "Claude 3.7 with a 200,000-token context window can digest an entire vendor RFP and output structured operational data in 25 seconds.",
      },
      {
        id: "s-0302-3",
        order: 3,
        type: "FRAMEWORK",
        headline: "The Document Intelligence Pipeline",
        subheadline: "How unstructured files become searchable operational data.",
        pillars: [
          {
            badge: "STAGE 1 · UPLOAD",
            title: "Cloud Drive Monitor",
            description: "Make.com monitors a dedicated Google Drive or Dropbox folder for newly dropped client PDFs or audio transcripts.",
          },
          {
            badge: "STAGE 2 · DIGEST",
            title: "Claude 3.7 Deep Analysis",
            description: "Reads the complete document text, extracts contract terms, financial liabilities, and action deadlines.",
          },
          {
            badge: "STAGE 3 · STRUCTURE",
            title: "Airtable Relational Mapping",
            description: "Stores key clauses, risk levels, and renewal dates in organized relational fields with tagged categories.",
          },
        ],
      },
      {
        id: "s-0302-4",
        order: 4,
        type: "RECAP",
        headline: "Deliverable 2 Best Practices",
        recapPoints: [
          "Target legal, accounting, logistics, and consulting firms with heavy document review workflows.",
          "Always include a direct link to the source document in the Airtable record for human auditability.",
          "Package this as a $2,000 implementation plus a $750/month ongoing processing retainer.",
        ],
      },
      {
        id: "s-0302-5",
        order: 5,
        type: "CHAPTER_END",
        headline: "Lesson 3.2 Complete",
        subheadline: "Next up: Deliverable 3 — Multi-Channel Content Repurposing & Client Approval Portals.",
      },
    ],
    writtenLesson: `
# Deliverable 2: The Executive Knowledge Extraction & Market Intelligence Dossier

In professional services firms (accounting practices, executive recruiters, legal consultancies, real estate syndicates), junior staff spend hundreds of hours every month opening PDFs, highlighting clauses, and typing summaries into Word documents.

This deliverable automates that entire process, turning unstructured documents into **structured, searchable intelligence records**.

---

## How It Works in Practice

1. **The Ingestion Folder:** The client drops any PDF contract, vendor proposal, or meeting transcript into a Google Drive folder titled \`[Inbound Review]\`.
2. **Make.com Detection:** Make detects the new file within 60 seconds, downloads the file stream, and extracts the raw text.
3. **Claude 3.7 Cognitive Extraction:** Claude parses the document using an extraction prompt tailored to that industry. For example, for commercial lease agreements:
   - Tenant Name & Landlord Name
   - Square Footage & Base Rent
   - Escalation Clauses (% annual increase)
   - Triple Net (NNN) Estimates
   - Expiration Date & Renewal Notice Window
   - Top 3 Operational Risks or Restrictive Covenants
4. **Airtable Dossier Base:** The structured data is written into Airtable. Automatic calendar alerts are configured to notify the executive 90 days before lease renewal deadlines.

---

## What to Charge
- **Implementation Sprint Fee:** $2,000 (Setting up the Drive watcher, Airtable schema, and Claude prompt templates).
- **Monthly Maintenance Retainer:** $750/month (Includes up to 200 document evaluations monthly, prompt calibration, and ongoing schema updates).
- **Time to Deliver:** ~4 hours once your master template is built.
    `,
  },
  {
    id: "03-3",
    number: "3.3",
    title: "Deliverable 3: Multi-Channel Content Repurposing & Client Approval Portals",
    duration: "13 min",
    summary:
      "Build an automated multi-channel media repurposing engine. Learn how to ingest raw executive audio or video, extract 5 multi-format assets using Claude, and route them to an Airtable approval queue.",
    learningObjective:
      "Design an automated content amplification engine with integrated human-in-the-loop approval workflows in Airtable Interfaces.",
    takeaway:
      "Busy CEOs and agency owners love creating content but hate formatting it. Delivering 10 polished LinkedIn posts and newsletter drafts from 1 voice memo is an effortless $1,500/month sell.",
    slides: [
      {
        id: "s-0303-1",
        order: 1,
        type: "TITLE",
        eyebrow: "DELIVERABLE 03 · CONTENT REPURPOSING",
        headline: "DELIVERABLE 3: CONTENT REPURPOSING & APPROVAL HUBS",
        subheadline: "Transforming 1 raw client voice memo into 10 polished B2B assets with one-click approval queues.",
      },
      {
        id: "s-0303-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "Every founder knows they should be posting on LinkedIn and sending a weekly newsletter, but nobody has 8 hours a week to sit and write.",
        subheadline: "Build a system where the founder records a 5-minute voice note, and an entire week of multi-channel B2B content appears in their approval dashboard.",
      },
      {
        id: "s-0303-3",
        order: 3,
        type: "FRAMEWORK",
        headline: "The 1-to-10 Repurposing Pipeline",
        subheadline: "How raw speech becomes branded corporate assets.",
        pillars: [
          {
            badge: "STEP 1 · RECORD",
            title: "Voice Memo Ingest",
            description: "Founder records a 5-minute voice memo on Telegram or WhatsApp. Make catches the audio file instantly.",
          },
          {
            badge: "STEP 2 · TRANSCRIBE",
            title: "Whisper Transcription",
            description: "Converts audio to timestamped text with accurate punctuation and domain jargon correction.",
          },
          {
            badge: "STEP 3 · ADAPT",
            title: "Claude 3.7 Tone Matching",
            description: "Rewrites the transcript into: 3 LinkedIn authority posts, 1 executive newsletter edition, and 5 tweet threads.",
          },
          {
            badge: "STEP 4 · APPROVE",
            title: "Airtable Interface Queue",
            description: "Founder opens their phone, reviews the draft posts, makes minor edits, and clicks 'Approve & Schedule'.",
          },
        ],
      },
      {
        id: "s-0303-4",
        order: 4,
        type: "RECAP",
        headline: "Deliverable 3 Summary",
        recapPoints: [
          "Human-in-the-loop approval is mandatory: never post directly to client social accounts without human sign-off.",
          "Use Airtable Interfaces so the founder can approve content on their phone in 2 minutes between meetings.",
          "Charge $1,500 to $2,500/month recurring as their automated content production partner.",
        ],
      },
      {
        id: "s-0303-5",
        order: 5,
        type: "CHAPTER_END",
        headline: "Lesson 3.3 Complete",
        subheadline: "Next up: System Reliability Engineering — Error handling, fallbacks, and safeguards.",
      },
    ],
    writtenLesson: `
# Deliverable 3: Multi-Channel Content Repurposing & Client Approval Portals

B2B founders, partners, and managing directors know that executive presence on LinkedIn generates inbound enterprise clients. But they are completely overwhelmed running their companies and have zero time to write.

Traditional content marketing agencies charge $4,000 to $8,000/month to interview the CEO, assign copywriters, and trade endless Google Docs revisions back and forth.

With our 3 Core Tools, you can build an automated system that delivers a superior result at half the cost while requiring only 1 hour of your monthly maintenance time.

---

## The Workflow Blueprint

1. **Frictionless Audio Intake:** Set up a dedicated Telegram bot or Make.com email ingestion webhook. When the CEO has an idea while driving, they record a 3-minute voice memo and send it to the bot.
2. **AI Transcription & Structuring:** Make.com routes the audio to Whisper or Claude, transcribing it with zero spelling mistakes.
3. **Claude Tone-Clone Engine:** Claude is primed with 10 of the client's best historical posts and company branding guidelines. It transforms the raw rambling memo into:
   - 2 Authority-building LinkedIn narrative posts.
   - 1 Weekly thought-leadership newsletter section.
   - 4 Actionable bullet-point takeaways.
4. **The Airtable Review Interface:** All drafts appear as visual cards in the founder's custom Airtable Interface. They can swipe through cards on their phone, edit words if desired, and click **[Approve Post]**.
5. **Scheduled Dispatch:** Once marked as Approved, Make automatically schedules the post to publish via Buffer or LinkedIn API.

This system is an extraordinarily sticky retainer: once a founder experiences the convenience of speaking into their phone and having an entire week of content ready for approval, they will never cancel this $1,500/month service.
    `,
  },
  {
    id: "03-4",
    number: "3.4",
    title: "System Reliability Engineering: Error Handling, Data Fallbacks & Client Safeguards",
    duration: "13 min",
    summary:
      "Enterprise clients fire agencies when systems break silently. Master professional error-handling in Make.com, data validation rules in Airtable, and prompt guardrails in Claude.",
    learningObjective:
      "Implement comprehensive error directives (Resume, Ignore, Rollback) in Make.com, configure system health alerts, and build fail-safe fallbacks.",
    takeaway:
      "System reliability is what separates amateur hobbyists from $10,000/month agency partners. Build error handlers that alert you before the client even notices a glitch.",
    slides: [
      {
        id: "s-0304-1",
        order: 1,
        type: "TITLE",
        eyebrow: "SYSTEM RELIABILITY · ERROR HANDLING",
        headline: "SYSTEM RELIABILITY ENGINEERING",
        subheadline: "How to build bulletproof error handlers, automatic retries, and alert monitors so client systems never fail silently.",
      },
      {
        id: "s-0304-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "If an automation breaks and the client has to tell you about it, you have failed. When an error occurs, your system should heal itself or notify you instantly.",
        subheadline: "Enterprise reliability is built on proactive error routing and graceful degradation.",
      },
      {
        id: "s-0304-3",
        order: 3,
        type: "FRAMEWORK",
        headline: "The 3 Make.com Error Directives",
        subheadline: "Master these three error handling mechanisms in Make.",
        pillars: [
          {
            badge: "DIRECTIVE 1 · RETRY / RESUME",
            title: "Break Directive",
            description: "Automatically stores failed execution bundles and retries at exponential backoff intervals (1m, 5m, 15m) if an external API experiences a temporary timeout.",
          },
          {
            badge: "DIRECTIVE 2 · LOG & CONTINUE",
            title: "Ignore / Fallback Directive",
            description: "Catches non-fatal errors (e.g. invalid phone number formatting), logs the error in Airtable, and allows the rest of the scenario to complete successfully.",
          },
          {
            badge: "DIRECTIVE 3 · ALERT DISPATCH",
            title: "Admin Alert Notification",
            description: "Sends an immediate priority message to your private Slack channel with the exact error code and scenario run URL.",
          },
        ],
      },
      {
        id: "s-0304-4",
        order: 4,
        type: "CHECKLIST",
        headline: "Production Handover Health Audit",
        subheadline: "Run every scenario through this checklist before client launch.",
        checklist: [
          { label: "Every external HTTP/API module has an error handler route attached", passed: true, note: "Prevents scenario deactivation on API timeouts" },
          { label: "All sensitive fields have null/empty validation checks", passed: true, note: "If email is missing, routes to human review queue" },
          { label: "Make.com auto-deactivation email alerts configured to agency inbox", passed: true, note: "Guarantees 15-minute response time" },
          { label: "Weekly automated health check scenario running", passed: true, note: "Tests all API endpoints every Monday at 6:00 AM" },
        ],
      },
      {
        id: "s-0304-5",
        order: 5,
        type: "CHAPTER_END",
        headline: "Module 3 Complete!",
        subheadline: "You now have 3 production deliverables. Next: Module 4 — Packaging, Pricing & Unit Economics.",
      },
    ],
    writtenLesson: `
# System Reliability Engineering: Error Handling, Data Fallbacks & Client Safeguards

The difference between a freelancer charging $30/hour and an agency partner commanding **$1,500/month retainers** is **reliability**.

Amateurs build fragile workflows that work on sunny days, but crash the first time a user submits an emoji in an email field or an external API experiences a 500-millisecond server blip. When a scenario crashes, Make.com deactivates it, leads stop arriving, and the business owner furiously emails you: *"Why didn't we receive any leads today?!"*

Once that happens, your client trust is severely damaged.

---

## 1. The Three Golden Rules of Error Handling in Make.com

### Rule 1: Always Attach a Break Directive to AI & Webhook Nodes
External APIs (Anthropic, OpenAI, Stripe) occasionally have temporary rate limits or micro-outages.
- Right-click the Claude API module in Make and select **Add error handler**.
- Choose the **Break** directive.
- Configure: Number of attempts = 3; Interval between attempts = 15 minutes.
- If Claude has a 10-second outage, Make does not deactivate your scenario. It pauses the execution bundle and retries automatically when the API recovers.

### Rule 2: Build an "Operations Error Log" Table in Airtable
In your master Airtable Base, always include a table named \`_System_Logs\`.
Whenever any step in Make encounters an unexpected format (e.g. an unreadable PDF or a corrupted image), route the error to this table with:
- Timestamp
- Error Message & Module Name
- Raw Payload JSON
- Status: \`[Needs Review]\`

### Rule 3: Private Agency Slack/Telegram Alerts
Set up a private agency Slack channel named \`#alerts-client-ops\`.
Whenever an error branch triggers in any client scenario, Make immediately posts an alert:
\`\`\`
⚠️ Warning: Client [Acme Corp] - Inbound Lead scenario encountered a malformed email address.
Bundle ID: #839210
Airtable Record: rec8941209
Status: Fallback activated successfully.
\`\`\`
You can fix the issue in 2 minutes before the client even realizes anything happened.

---

## Action Task
Open your test Make.com scenario from Lesson 3.1. Right-click the Claude node, add an error handler branch with a **Commit** or **Break** directive, and simulate an error by passing an invalid parameter. Verify that your error route handles the failure gracefully.
    `,
  },
];

// =========================================================================
// MODULE 04: Packaging, Pricing & Transparent Unit Economics
// =========================================================================
export const MODULE_04_LESSONS: ExtendedLesson[] = [
  {
    id: "04-1",
    number: "4.1",
    title: "The Three-Tier Offer Architecture: Sprint Setup, Core Pipeline, & Full Operational Partner",
    duration: "11 min",
    summary:
      "Learn how to structure your service offerings into three high-converting tiers. Give clients a clear choice between a focused quick-win sprint, a complete core pipeline, and an ongoing operational partnership.",
    learningObjective:
      "Package your services into three distinct pricing tiers with clear deliverables, scope boundaries, and price anchors.",
    takeaway:
      "Never present a single 'take-it-or-leave-it' price. Three tiers provide choice, anchor high perceived value, and naturally guide clients to your $2,500 flagship tier.",
    slides: [
      {
        id: "s-0401-1",
        order: 1,
        type: "TITLE",
        eyebrow: "STAGE 04 · OFFER ARCHITECTURE",
        headline: "THE THREE-TIER OFFER ARCHITECTURE",
        subheadline: "How to structure Sprint, Core, and Partner tiers to maximize deal size and closing rates.",
      },
      {
        id: "s-0401-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "When you present one price, the prospect asks: 'Should I hire them or not?' When you present three tiers, they ask: 'Which tier is right for us?'",
        subheadline: "Tiered offer psychology shifts the conversation from price resistance to scope selection.",
      },
      {
        id: "s-0401-3",
        order: 3,
        type: "FRAMEWORK",
        headline: "The Three Standard Offer Tiers",
        subheadline: "Standardized packaging for any B2B client.",
        pillars: [
          {
            badge: "TIER 1 · SPRINT ($1,500)",
            title: "Quick-Win Foundation",
            description: "Single-workflow setup (e.g., Inbound Lead Triage). 1 Airtable Base, 1 Make scenario. 7-day deployment.",
          },
          {
            badge: "TIER 2 · CORE ($2,500 + $750/MO)",
            title: "Complete Pipeline Engine",
            description: "Full Inbound + Proposal + Reporting suite. Airtable Interface portal, 3 Make scenarios, weekly health checks.",
          },
          {
            badge: "TIER 3 · PARTNER ($4,500 + $1,500/MO)",
            title: "Fractional AI Director",
            description: "End-to-end operational systems, custom document extraction, ongoing monthly prompt optimization, and Slack support.",
          },
        ],
      },
      {
        id: "s-0401-4",
        order: 4,
        type: "COMPARISON",
        headline: "Tier Psychology & Price Anchoring",
        comparison: {
          leftTitle: "What the Client Sees",
          leftItems: [
            "Tier 1 ($1,500): Looks fast and safe, but limited to one workflow.",
            "Tier 3 ($4,500): Looks comprehensive, anchors the high end of value.",
            "Tier 2 ($2,500): The 'Goldilocks' sweet spot chosen by 65% of clients.",
          ],
          rightTitle: "Agency Benefits",
          rightItems: [
            "Predictable, standardized scope for every tier.",
            "No custom proposal writing: send pre-built packages.",
            "Immediate conversion of Tier 2 into $750–$1,000/mo retainers.",
          ],
        },
      },
      {
        id: "s-0401-5",
        order: 5,
        type: "RECAP",
        headline: "Offer Architecture Rules",
        recapPoints: [
          "Always highlight Tier 2 as 'Most Popular / Recommended'.",
          "Ensure Tier 1 has a strictly defined boundary to prevent scope creep.",
          "Every tier must lead naturally into a recurring monthly management retainer.",
        ],
      },
      {
        id: "s-0401-6",
        order: 6,
        type: "CHAPTER_END",
        headline: "Lesson 4.1 Complete",
        subheadline: "Next up: Pricing for $10,000/Month — Sprints vs Retainers.",
      },
    ],
    writtenLesson: `
# The Three-Tier Offer Architecture: Sprint Setup, Core Pipeline, & Full Operational Partner

When pitching enterprise clients, presenting a single number (e.g. *"Our fee is $3,000"*) forces the buyer into a binary decision: **Yes or No**.

If they are nervous about AI or haven't worked with you before, their defensive reaction is often "No" or "Let me think about it."

By structuring your services into **Three Standardized Tiers**, you trigger the psychological principle of **Price Anchoring and Choice Architecture**:

---

## The Three Tiers Explained

### Tier 1: The Quick-Win Sprint ($1,500 One-Off)
- **Scope:** Solves one acute, single problem (e.g., Inbound Form Triaging to Airtable & instant email reply).
- **Deliverables:** 1 Airtable Base, 1 Make.com scenario, 1 Claude prompt template, 1 Loom video training.
- **Turnaround:** 5 to 7 business days.
- **Purpose:** Low-friction entry point for skeptical clients who want to test your speed and reliability before committing to a larger partnership.

### Tier 2: The Core Pipeline Engine ($2,500 Setup + $750/Month Retainer) — *The Flagship*
- **Scope:** End-to-end lead qualification, automated proposal generation, and weekly client reporting.
- **Deliverables:** Full Airtable Interface dashboard for staff, 3 Make scenarios, error-handling routers, and continuous monthly prompt tuning.
- **Turnaround:** 14 business days.
- **Purpose:** This is your primary offer. Over 60% of clients will select this tier because it provides complete peace of mind.

### Tier 3: The Dedicated Operational Partner ($4,500 Setup + $1,500/Month Retainer)
- **Scope:** Acting as their fractional Head of AI & Operations. Covers document extraction, multi-channel repurposing, bespoke API integrations, and monthly strategic planning.
- **Deliverables:** Priority private Slack access, monthly optimization sprint, up to 10 automated workflows.
- **Purpose:** Anchors the high end. It makes the $2,500 Tier look like a bargain, while yielding massive profit whenever a client accepts it.

---

## Action Task
Draft your 1-page pricing sheet with these three tiers. Ensure the deliverables in each tier are explicitly listed so scope boundaries are crystal clear.
    `,
  },
  {
    id: "04-2",
    number: "4.2",
    title: "Pricing for $10,000/Month: Flat Implementation Fees ($1,500–$3,500) + Monthly Retainers ($750–$1,500)",
    duration: "12 min",
    summary:
      "Master the art of high-ticket B2B pricing. Learn why you must never quote hourly rates, how to structure implementation sprint fees, and how to position recurring retainers as an essential insurance policy.",
    learningObjective:
      "Structure pricing contracts combining upfront setup fees with recurring retainers, eliminate hourly billing, and calculate client ROI.",
    takeaway:
      "Never bill by the hour. Hourly billing penalizes you for working fast. Always charge flat project fees plus monthly retainers based on economic value delivered.",
    slides: [
      {
        id: "s-0402-1",
        order: 1,
        type: "TITLE",
        eyebrow: "STAGE 04 · VALUE PRICING",
        headline: "PRICING FOR $10,000/MONTH",
        subheadline: "Why value-based pricing and monthly retainers are the foundation of 5-figure agency revenues.",
      },
      {
        id: "s-0402-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "If you charge $75/hour and build an automated system in 4 hours, you make $300. When you charge a $2,500 flat fee for the exact same system, you make $625/hour.",
        subheadline: "Clients care about the system working, not how many hours you sat in front of your monitor.",
      },
      {
        id: "s-0402-3",
        order: 3,
        type: "FRAMEWORK",
        headline: "The Retainer Justification Equation",
        subheadline: "The three legitimate reasons clients happily pay $750–$1,500 every month.",
        pillars: [
          {
            badge: "JUSTIFICATION 1 · UPTIME",
            title: "Proactive Health & SLA",
            description: "Daily automated ping tests, error monitoring, and guaranteed 4-hour response time if any external tool modifies its API.",
          },
          {
            badge: "JUSTIFICATION 2 · EVOLUTION",
            title: "Prompt & Data Optimization",
            description: "Monthly prompt tuning as the client's service offerings evolve, fine-tuning Claude system instructions with new edge cases.",
          },
          {
            badge: "JUSTIFICATION 3 · CAPABILITY",
            title: "Continuous Workflow Allocation",
            description: "Allocation of 2 to 4 hours of new micro-automations or field updates each month without needing new contracts.",
          },
        ],
      },
      {
        id: "s-0402-4",
        order: 4,
        type: "RECAP",
        headline: "Pricing Principles Summary",
        recapPoints: [
          "Bill upfront: 50% deposit before kickoff, 50% upon deployment.",
          "Retainers begin automatically 30 days after initial launch via recurring Stripe credit card billing.",
          "Explain retainers as 'software insurance and ongoing prompt intelligence'.",
        ],
      },
      {
        id: "s-0402-5",
        order: 5,
        type: "CHAPTER_END",
        headline: "Lesson 4.2 Complete",
        subheadline: "Next up: Tool Expenses, Margins & Overhead.",
      },
    ],
    writtenLesson: `
# Pricing for $10,000/Month: Flat Implementation Fees + Monthly Retainers

Hourly billing is the single greatest enemy of an ambitious technologist.

Consider the perverse incentive:
- An amateur who has no idea what they are doing takes **40 hours** to connect Make and Airtable. At $50/hour, they earn **$2,000**.
- A master who has pre-built templates and deep domain knowledge completes the same setup in **4 hours**. If they charge $50/hour, they earn **$200**.

Hourly billing rewards inefficiency and severely penalizes skill, speed, and preparation.

---

## The Two-Part Pricing Model

To hit $10,000/month consistently, every single client contract must contain two distinct financial components:

### 1. The Implementation Fee ($1,500 to $3,500)
This covers the initial architecture, Airtable schema setup, custom Claude prompt engineering, Make.com scenario building, and user onboarding.
- **Payment Terms:** 50% paid upon contract signing before any work begins; 50% paid upon milestone deployment (typically Day 14).
- **Psychological Effect:** This provides immediate upfront cash flow to run your business and validates that the client has real budget.

### 2. The Ongoing Optimization Retainer ($750 to $1,500/Month)
This begins 30 days after deployment and is billed automatically via Stripe on the 1st of every month.

Many new founders ask: *"Why would a client pay $1,000 every month if the automation is already running?"*

Here is how you frame the retainer to the business owner:
> *"Mr. Client, software platforms like Google, Airtable, and OpenAI update their APIs constantly. Furthermore, your business is alive—your pricing will change, your staff will change, and new customer edge cases will emerge.*
> 
> *Our monthly optimization retainer acts as your dedicated insurance policy. We monitor your pipelines 24/7, guarantee a 4-hour response time if anything breaks, update your prompt guidelines every month, and include 3 hours of ongoing workflow improvements so your system continuously gets smarter."*

To a business owner doing $100K+ monthly revenue, paying $750 to $1,000/month to guarantee their revenue engine never breaks is completely justifiable.

---

## Action Task
Write down your standard pricing terms:
- Sprint Setup: $2,500 (50% upfront / 50% on launch)
- Monthly Management: $850/month (auto-debited via Stripe)
Practice reading this proposal aloud with confidence until it feels natural.
    `,
  },
  {
    id: "04-3",
    number: "4.3",
    title: "Tool Expenses, Margins & Overhead: Running at 88%+ Net Profit Margins",
    duration: "11 min",
    summary:
      "Transparent unit economics breakdown. Learn how to structure tool accounts, client billing, API token costs, and internal expenses so your agency operates with over 88% net profit margins.",
    learningObjective:
      "Manage software subscriptions, architect client vs agency billing models, and track operational margins accurately.",
    takeaway:
      "Have clients pay for their own core software subscriptions (Airtable & Make accounts). Your agency costs remain under $100/month regardless of client volume.",
    slides: [
      {
        id: "s-0403-1",
        order: 1,
        type: "TITLE",
        eyebrow: "STAGE 04 · OPERATIONAL MARGINS",
        headline: "EXPENSES, MARGINS & OVERHEAD",
        subheadline: "How to structure account ownership and API billing to maintain 88%+ net margins at $10K/month.",
      },
      {
        id: "s-0403-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "Never pay for client infrastructure out of your own pocket. Clients own their accounts; you provide the architectural mastery.",
        subheadline: "When clients pay for their own software licenses, your agency overhead never scales with your client count.",
      },
      {
        id: "s-0403-3",
        order: 3,
        type: "FRAMEWORK",
        headline: "The Clean Account Ownership Model",
        subheadline: "Who pays for what in a professional B2B relationship.",
        pillars: [
          {
            badge: "CLIENT PAYS",
            title: "Client Software Subscriptions",
            description: "Client creates and pays for their own Airtable Team license ($20/seat) and Make.com Core plan ($9/mo). They own their data.",
          },
          {
            badge: "CLIENT PAYS",
            title: "Anthropic / OpenAI API Usage",
            description: "Client connects their credit card to Anthropic Console for API tokens ($5 to $25/mo typical). Billed directly by Anthropic.",
          },
          {
            badge: "AGENCY PAYS",
            title: "Internal Agency Tools",
            description: "Your own Google Workspace ($12), Claude Pro ($20), Make agency workspace ($29), and domain hosting (~$80/mo total).",
          },
        ],
      },
      {
        id: "s-0403-4",
        order: 4,
        type: "RECAP",
        headline: "Margin Management Rules",
        recapPoints: [
          "Clients must own their primary accounts so data privacy and compliance remain with them.",
          "Agency operating costs remain flat at ~$100/month whether you have 1 client or 10 clients.",
          "At $10,000/month revenue, your net take-home profit is approximately $9,800 to $9,900 (98%+ net margin).",
        ],
      },
      {
        id: "s-0403-5",
        order: 5,
        type: "CHAPTER_END",
        headline: "Lesson 4.3 Complete",
        subheadline: "Next up: Crafting bulletproof SOWs & Service Agreements.",
      },
    ],
    writtenLesson: `
# Tool Expenses, Margins & Overhead: Running at 88%+ Net Profit Margins

One of the greatest hazards in freelance automation is the **"All-Inclusive Tool Trap."**

Beginners often tell clients: *"For $1,000/month, I will provide the software, the API keys, the database, and the maintenance!"*

This is a terrible mistake:
1. If the client's lead volume spikes or someone uploads a 500-page document, your personal Anthropic API key gets billed $150, eating into your profits.
2. If the client ever leaves, their business data is trapped inside your personal Airtable account, creating messy legal and data ownership disputes.
3. You bear the liability for data privacy, GDPR compliance, and credential security.

---

## The Professional Standard: Client-Owned Infrastructure

In professional enterprise consulting, **the client always pays for and owns their own software licenses**.

During your Day 1 Onboarding Sprint, you guide the client to create their own accounts:
- **Airtable:** The client creates a workspace and adds you as a Workspace Creator or Collaborator. They pay Airtable directly ($20/user/mo).
- **Make.com:** The client creates an account and adds you as an Admin/Operator. They pay Make directly ($9 to $29/mo).
- **Anthropic API:** The client creates an account at console.anthropic.com, adds their corporate card, deposits $20 of API credits, and generates an API key for your Make scenario.

### Why Clients Love This
Corporate clients vastly prefer this model! It means:
- They maintain 100% ownership and security over their customer data.
- They are not held hostage by a third-party vendor.
- If they ever part ways with you in the future, their systems continue running on their own infrastructure without interruption.

### Why Your Agency Wins
- Your total agency operating expenses remain virtually **flat at under $100/month**.
- You have **zero financial exposure** to API usage spikes.
- Your net profit margin on a $10,000/month agency remains **above 95%**.

---

## Action Task
Prepare an "Onboarding Credentials Checklist" PDF template that lists the exact 3 accounts your client will set up (Airtable, Make, Anthropic) with direct signup links.
    `,
  },
  {
    id: "04-4",
    number: "4.4",
    title: "Crafting bulletproof SOWs & Service Agreements: Scope Creep Prevention & Payment Terms",
    duration: "12 min",
    summary:
      "Protect your agency against scope creep, endless revision cycles, and delayed payments. Learn the essential clauses to include in every Statement of Work and retainer contract.",
    learningObjective:
      "Draft concise, legally sound Statements of Work (SOWs), define explicit out-of-scope boundaries, and establish automated payment terms.",
    takeaway:
      "Scope creep kills agency profits. Clearly define what is included, what is excluded, and require a formal change-order fee for new requests.",
    slides: [
      {
        id: "s-0404-1",
        order: 1,
        type: "TITLE",
        eyebrow: "STAGE 04 · CONTRACTS & SOW",
        headline: "CRAFTING BULLETPROOF SOWS",
        subheadline: "How to prevent scope creep, guarantee prompt payment, and set clear client boundaries.",
      },
      {
        id: "s-0404-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "Vague contracts create angry clients. Precise contracts create trusted, long-term partnerships.",
        subheadline: "Define exactly what you are building, how many revisions are included, and what costs extra.",
      },
      {
        id: "s-0404-3",
        order: 3,
        type: "FRAMEWORK",
        headline: "The 4 Essential SOW Clauses",
        subheadline: "Every B2B contract must explicitly state these four terms.",
        pillars: [
          {
            badge: "CLAUSE 1 · BOUNDARIES",
            title: "Explicit Out-of-Scope List",
            description: "List what is NOT included (e.g., custom website redesign, legacy CRM migrations, manual cold calling).",
          },
          {
            badge: "CLAUSE 2 · ACCEPTANCE",
            title: "7-Day Acceptance Window",
            description: "Client has 7 calendar days to test deployed workflows. If no written bug report is received, the project is deemed complete and approved.",
          },
          {
            badge: "CLAUSE 3 · PAYMENT",
            title: "Strict Payment Terms",
            description: "50% upfront before work begins; final 50% due upon staging handover. Retainers auto-billed on the 1st of each month via Stripe.",
          },
          {
            badge: "CLAUSE 4 · CHANGES",
            title: "Formal Change Order Protocol",
            description: "Any feature request not in the initial SOW requires a separate written estimate at a minimum $500 add-on fee.",
          },
        ],
      },
      {
        id: "s-0404-4",
        order: 4,
        type: "RECAP",
        headline: "Contract Safety Rules",
        recapPoints: [
          "Never begin building until the 50% deposit has cleared your bank account.",
          "Keep contracts concise: a 2-page Statement of Work is signed 5x faster than a 15-page legal dissertation.",
          "Use electronic signature tools like PandaDoc, DocuSign, or Bonsai for instant mobile signing.",
        ],
      },
      {
        id: "s-0404-5",
        order: 5,
        type: "CHAPTER_END",
        headline: "Module 4 Complete!",
        subheadline: "Offers and contracts are set. Next: Module 5 — Portfolio Building & Client Acquisition.",
      },
    ],
    writtenLesson: `
# Crafting Bulletproof SOWs & Service Agreements: Scope Creep Prevention & Payment Terms

The most common reason service agencies fail is **scope creep**.

You agree to build an automated lead qualification system for $2,500. Two weeks into the project, the client casually asks:
- *"Can we also connect this to our custom QuickBooks database from 2014?"*
- *"Can you also build an automated WhatsApp bot for our sales team?"*
- *"Can you design custom HTML email templates for all our company newsletters?"*

If your contract is vague, you feel obligated to say yes to keep the client happy. Suddenly, a 10-hour project ballooning into 60 hours of unpaid labor, and your effective hourly rate drops through the floor.

---

## The Anatomy of a Clean 2-Page Statement of Work

A modern B2B agreement should be short, readable, and transparent:

### 1. Project Objectives & Target Outcomes
Summarize the business problem:
> *"The objective of this engagement is to deploy an automated Inbound Lead Qualification and Proposal Drafting Engine in Airtable and Make.com, reducing quote turnaround time from 48 hours to under 3 minutes."*

### 2. Included Deliverables (The "White List")
Bullet point the exact deliverables:
- 1 Master Airtable Base (Leads, Proposals, Activities).
- 1 Staff Review Interface with Kanban pipeline and 1-click approval buttons.
- 1 Make.com Scenario connecting website form webhook to Claude 3.7.
- 1 Loom video training walkthrough (under 10 minutes) for staff.
- 14 days of post-launch bug-fix support.

### 3. Explicit Exclusions (The "Out-of-Scope List")
This is the most critical section in the contract:
- Any custom front-end website coding or theme redesign.
- Historical data migration of leads prior to the agreement date.
- Third-party software subscription fees (Airtable, Make, Anthropic).
- Additional automation scenarios beyond the specified lead workflow.

### 4. Change Order Protocol
Include this sentence word-for-word:
> *"Any requests for modifications, additional integrations, or features outside the deliverables listed above will be scoped separately in a written Change Order at our standard rate of $150/hour, with a minimum engagement fee of $500."*

When clients know additional requests cost extra, scope creep stops immediately.

---

## Action Task
Create your standard 2-page SOW template using Google Docs or PandaDoc. Include the four core clauses and save it in your agency files.
    `,
  },
];
