import json
import os
import sys

# Ensure scripts dir is in path
sys.path.append(os.path.dirname(__file__))
from slide_builder import make_rich_slide
from generate_content_1_v2 import m01_l1_slides, m01_l1_written, m01_l2_slides, m01_l2_written

# =========================================================================
# MODULE 02: Business #1 — The AI Workflow Automation Agency (AAA)
# =========================================================================

# --- LESSON 2.1 ---
m02_l1_slides = [
    make_rich_slide(
        "s-021-1", 1, "MODULE 02 · LESSON 2.1",
        "The High-Ticket AI Agency Paradigm",
        "Why businesses happily pay $2,500/month retainers for automated operations while ignoring cheap chatbots.",
        [
            {"title": "The Chatbot Commoditization Trap", "desc": "Selling generic customer-support chat widgets is a race to the bottom; business owners view them as annoying novelties worth under $100."},
            {"title": "The High-ROI Operations Paradigm", "desc": "When you automate mission-critical revenue workflows (speed-to-lead, CRM sync, appointment booking), you directly increase the client's bank balance."},
            {"title": "The B2B Margin Reality", "desc": "A business earning $1,000,000/year loses $80,000 annually to dropped leads and manual administrative delays; solving this makes a $2,500/mo fee an undeniable bargain."},
            {"title": "The Zero-Code Advantage", "desc": "Using Make.com and Airtable allows a solo operator to build enterprise-grade data pipelines without maintaining fragile custom codebase infrastructure."}
        ],
        "Never sell artificial intelligence as a novelty; sell measurable revenue recovery and operational time savings.",
        metrics=[
            {"label": "Standard Agency Retainer", "val": "$2,000 - $3,500/mo", "note": "High B2B perceived value"},
            {"label": "Average Lead Value in B2B", "val": "$1,500 - $5,000", "note": "Contractors, Legal, Medical"},
            {"label": "Setup Sprint Fee", "val": "$2,500 One-Time", "note": "Covers initial workflow build"},
            {"label": "Monthly Margin to Solo Founder", "val": "96%+", "note": "Fractions of a cent per API call"}
        ]
    ),
    make_rich_slide(
        "s-021-2", 2, "MODULE 02 · LESSON 2.1",
        "The 3 Core Offers of a High-Ticket AAA",
        "The three standardized automation packages that consistently command $2,000 to $5,000/month retainers.",
        [
            {"title": "Speed-to-Lead Telephony Engine", "desc": "Automated instant SMS, AI voice qualification (Vapi/Twilio), and calendar booking within 45 seconds of form submission."},
            {"title": "Autonomous CRM & Pipeline Sync", "desc": "Bi-directional webhook synchronization between lead capture forms, Airtable, HubSpot, and team Slack/email alerts with zero human delay."},
            {"title": "AI Document & Proposal Triage", "desc": "LLM-powered extraction that ingests inbound customer PDFs/inquiries, summarizes scope, generates estimates, and creates client invoices."},
            {"title": "Modular Standardization", "desc": "Build each system once as an exportable Make.com blueprint, then customize only the webhook endpoints and API keys for each new client."}
        ],
        "Standardize your core 3 offerings so you never build bespoke systems from scratch for each new client.",
        diagram={
            "title": "The Core AAA Operational Offering Triad",
            "steps": [
                {"step": "01", "tech": "Twilio + Vapi", "title": "Speed-to-Lead", "desc": "Instant SMS & AI voice qualification under 45 seconds.", "metric": "78% Contact Rate"},
                {"step": "02", "tech": "Make.com + Airtable", "title": "Pipeline Sync", "desc": "Automated CRM lead routing, deduplication, team alerts.", "metric": "0 Data Loss"},
                {"step": "03", "tech": "OpenAI / Claude", "title": "Proposal Triage", "desc": "Automated PDF parsing, scope extraction, draft estimate creation.", "metric": "85% Time Saved"},
                {"step": "04", "tech": "Stripe + Cal.com", "title": "Revenue Engine", "desc": "Automated appointment booking and client deposit collection.", "metric": "3x Close Rate"}
            ]
        }
    ),
    make_rich_slide(
        "s-021-3", 3, "MODULE 02 · LESSON 2.1",
        "The High-Ticket Target Market Filter",
        "How to qualify high-value business niches that have the cash flow to afford $2,500/month retainers.",
        [
            {"title": "High Customer Lifetime Value ($2k+)", "desc": "Target niches where a single closed customer is worth thousands: HVAC installers, roofing contractors, cosmetic dentists, boutique law firms."},
            {"title": "Existing Inbound Lead Volume", "desc": "The business must already invest in paid advertising or SEO; automations amplify existing traffic, they do not create demand from zero."},
            {"title": "Severe Operational Bottlenecks", "desc": "Look for owners who personally answer phone calls or whose administrative staff takes 4 hours to follow up with new inquiries."},
            {"title": "The Budget Threshold ($500k+ Gross)", "desc": "Avoid cash-poor startups; focus on established service businesses generating $500,000 to $3,000,000 in annual gross billings."}
        ],
        "Target businesses where closing just one extra lead per month pays for your entire $2,500/month retainer fee.",
        chart={
            "title": "Client ROI: Retainer Fee vs Value of 2 Captured Leads",
            "data": [
                {"label": "Monthly Agency Retainer Fee", "value": "$2,500 Cost", "barPct": 25, "badge": "Your Fee", "note": "Paid on 1st of month"},
                {"label": "Roofing / HVAC (2 Captured Leads)", "value": "$16,000 Gross Profit", "barPct": 100, "badge": "6.4x ROI", "note": "Average deal value $8,000"},
                {"label": "Cosmetic Dental (2 Captured Cases)", "value": "$10,000 Gross Profit", "barPct": 62, "badge": "4.0x ROI", "note": "Implants/veneers average $5,000"},
                {"label": "Boutique Legal (1 Retained Case)", "value": "$7,500 Gross Profit", "barPct": 47, "badge": "3.0x ROI", "note": "Personal injury or business counsel"}
            ]
        }
    ),
    make_rich_slide(
        "s-021-4", 2, "MODULE 02 · LESSON 2.1",
        "The Solo Capacity & Uptime Moat",
        "How a single operator manages 5 high-ticket agency clients in under 18 hours per week.",
        [
            {"title": "Centralized Telemetry Dashboard", "desc": "Monitor all 5 client accounts from a master Airtable command center tracking lead volumes, error rates, and API latency in real time."},
            {"title": "Automated Circuit Breakers", "desc": "Implement fallback routing so if an external API times out, the lead is automatically captured in a fail-safe Google Sheet and SMS alert."},
            {"title": "The No-Slack Operational Boundary", "desc": "Never give clients open Slack access; batch all communications into asynchronous Notion comments and once-monthly Loom ROI reviews."},
            {"title": "The Mathematical Target", "desc": "Four clients @ $2,500/month equals exactly $10,000/month in gross revenue, yielding over $9,750 in net profit with zero employee payroll."}
        ],
        "Build reliable, self-monitoring systems so you can manage a six-figure agency portfolio in under 18 hours a week.",
        metrics=[
            {"label": "Max Solo Client Capacity", "val": "5 - 6 Accounts", "note": "Zero employee burnout"},
            {"label": "Average Weekly Workload", "val": "15 - 18 Hours", "note": "Asynchronous delivery"},
            {"label": "Gross Monthly Billings", "val": "$10,000 - $15,000", "note": "4 - 6 active retainers"},
            {"label": "Net Profit Margin", "val": "96% - 98%", "note": "Under $250 overhead"}
        ]
    )
]

m02_l1_written = r"""# The Anatomy of a High-Ticket AI Automation Agency (AAA)

The landscape of AI agencies is divided into two distinct worlds:
1. **The Low-Ticket Commodity Sellers:** Beginners offering basic ChatGPT customer service chatbots or generic social media bots for $150 on freelance marketplaces. They spend 40 hours dealing with difficult clients for negligible profit.
2. **The High-Ticket Systems Architects:** Professional solo operators who diagnose expensive operational bottlenecks in established B2B firms, deploy autonomous revenue engines, and command **$2,500/month recurring retainers**.

To reach **$10,000+/month** as a solo operator, you must position yourself exclusively in the second category.

---

## 1. Why Businesses Happily Pay $2,500/Month Retainers

Consider the unit economics of a typical local service company (e.g., an HVAC contractor or boutique law firm generating $1,200,000/year):
- They spend **$8,000/month** on Google Local Services and Meta ads.
- They generate **150 inbound form leads and phone inquiries** per month.
- Because the office manager is busy managing appointments and payroll, inquiries wait an average of **2 to 4 hours** before receiving a callback.
- Industry data proves that leads called after 30 minutes convert at less than **10%**, whereas leads contacted in **under 5 minutes convert at over 70%**.
- The contractor is losing **20 to 30 closed jobs per month**, representing **$60,000+ in missed gross profit**.

When you deploy an automated speed-to-lead workflow that triggers an instant personalized SMS and AI voice qualification in **under 45 seconds**, you recover just 3 of those lost jobs ($9,000+ profit). 

Charging a **$2,500/month retainer** is not an expense for the client; it is an undeniable **3.6x return on investment**.

---

## 2. The 3 Core High-Ticket Offers

```
+--------------------------------------------------------------------------+
|                  THE 3 STANDARDIZED AAA CORE OFFERS                      |
+--------------------------------------------------------------------------+

  OFFER 1: 24/7 AUTONOMOUS SPEED-TO-LEAD ENGINE
  - Problem: Inbound leads go cold when submitted after business hours.
  - Architecture: Webhook -> OpenAI Triage -> Twilio SMS -> Cal.com Booking.
  - Commercial Value: Replaces $4,000/mo in night-shift receptionist wages.
  - Pricing: $2,500 setup sprint + $1,500 - $2,500/month retainer.

  OFFER 2: RELATIONAL CRM & PIPELINE ENRICHMENT
  - Problem: Sales reps spend 12 hours/week manually copy-pasting data.
  - Architecture: Airtable Master Base + Make.com Webhook Routers + Softr Portal.
  - Commercial Value: Eliminates 45 hours of manual data entry per month.
  - Pricing: $3,500 setup sprint + $1,000/month maintenance.

  OFFER 3: MULTIMODAL PROPOSAL & ESTIMATE TRIAGE
  - Problem: Inbound quote requests sit in email inboxes for 4 days.
  - Architecture: Document parser + Claude 3.5 extraction + automated quote draft.
  - Commercial Value: Reduces quote turnaround from 96 hours to 12 minutes.
  - Pricing: $3,000 setup sprint + $1,500/month retainer.
+--------------------------------------------------------------------------+
```

---

## 3. The Quantitative P&L of a Solo 4-Client AAA

```
Gross Revenue: 4 Retainers @ $2,500/month = $10,000.00
Software Expenses:
  - Make.com Pro (40,000 Operations): -$29.00
  - OpenAI & Anthropic API Credits: -$55.00
  - Airtable Team Plan: -$20.00
  - Loom & Google Workspace: -$24.00
Total Expenses: -$128.00
NET TAKE-HOME PROFIT: $9,872.00 / month (98.7% Net Margin)
```

---

## 4. Potential Failure Modes and Pitfalls

### Pitfall 1: Agreeing to Build Custom Code from Scratch
- **The Error:** A client convinces you to build a custom React dashboard from scratch. You spend 6 weeks debugging CSS and database migrations.
- **The Fix:** Strictly use no-code and visual platforms: Make.com, Airtable, Softr. If a client demands custom native code, charge a minimum $15,000 engineering fee or decline the project.

### Pitfall 2: Taking on Clients with Zero Existing Inbound Traffic
- **The Error:** Pitching speed-to-lead automation to a brand-new business that receives 2 website visits a week. 
- **The Fix:** Pre-qualify clients. They must receive a minimum of 50 inbound inquiries per month for your automation to deliver tangible commercial impact.

---

## 5. Practical Implementation Exercise

1. **Identify Your Target High-Ticket Niche:** Choose one industry with high transaction value: HVAC/Roofing, Cosmetic Dentists, or Boutique Legal.
2. **Draft Your One-Sentence Value Proposition:** E.g., *"We build autonomous speed-to-lead engines that contact inbound inquiries in under 45 seconds, recovering 25%+ of lost revenue for established service firms."*
3. **Set Up Your Demo Make.com Scenario:** Create a sample scenario connecting a webhook to OpenAI text generation and an Airtable row creation.

---

## 6. Key Actionable Takeaways

1. **Sell revenue recovery, never technology:** Business owners pay for closed sales and saved hours, not AI hype.
2. **Target high customer-lifetime-value industries:** Choose niches where closing 1 extra deal covers your entire fee.
3. **Four $2,500 retainers equal $10,000/month:** Maintain extreme operational focus on signing and retaining 4 clients.
4. **Standardize your blueprints:** Build your system once and customize it for each client in under 4 hours.
"""

# --- LESSON 2.2 ---
m02_l2_slides = [
    make_rich_slide(
        "s-022-1", 1, "MODULE 02 · LESSON 2.2",
        "The Operational Bottleneck Audit",
        "How to inspect a business's daily operations and uncover high-friction manual data leaks.",
        [
            {"title": "The $50/Hour Data Entry Leak", "desc": "Highly paid office staff spending 15 hours a week re-typing customer information between email, spreadsheets, and legacy CRMs."},
            {"title": "The Forgotten After-Hours Lead", "desc": "Over 40% of high-intent B2B inquiries arrive between 6:00 PM and 8:00 AM; businesses ignore them until 10:00 AM the next day."},
            {"title": "The Manual Follow-Up Failure", "desc": "Sales teams abandon prospects after 1 unreturned call, whereas 80% of sales require 4 to 6 follow-up touchpoints."},
            {"title": "The Fragmented Tool Silo", "desc": "Using 6 disconnected SaaS tools (Typeform, Gmail, Google Sheets, Slack, QuickBooks, Salesforce) with zero automated sync between them."}
        ],
        "Where human friction and repetitive copy-pasting exist, an urgent high-ticket automation opportunity is waiting.",
        chart={
            "title": "Where Business Hours Are Wasted: Weekly Breakdown",
            "data": [
                {"label": "Manual Data Entry & CRM Sync", "value": "14.5 Hours / Wk", "barPct": 72, "badge": "High Friction", "note": "Re-typing names, emails, addresses"},
                {"label": "Chasing Stalled Leads (Manual)", "value": "11.0 Hours / Wk", "barPct": 55, "badge": "Low Conversion", "note": "Manual email and text follow-ups"},
                {"label": "Drafting Standard Estimates", "value": "8.5 Hours / Wk", "barPct": 42, "badge": "Repetitive", "note": "Copy-pasting standard pricing templates"},
                {"label": "Scheduling & Rescheduling Calls", "value": "6.0 Hours / Wk", "barPct": 30, "badge": "Calendar Tag", "note": "Back-and-forth email scheduling"}
            ]
        }
    ),
    make_rich_slide(
        "s-022-2", 2, "MODULE 02 · LESSON 2.2",
        "The ROI Calculation Formula",
        "Translating manual operational waste into undeniable dollar figures that justify your fee.",
        [
            {"title": "The Labor Savings Metric", "desc": "2 employees spending 10 hrs/week on manual tasks = 80 hours/month * $30/hr loaded wage = $2,400/month in pure wasted payroll."},
            {"title": "The Revenue Recovery Metric", "desc": "100 monthly leads * 15% missed after-hours rate = 15 lost leads * 20% normal close rate * $2,500 deal value = $7,500/month lost revenue."},
            {"title": "The Total Monthly Bottleneck Cost", "desc": "$2,400 labor waste + $7,500 missed sales = $9,900/month in quantifiable financial bleed."},
            {"title": "The Irresistible Pricing Pivot", "desc": "When you show a business owner they are bleeding $9,900/month, charging $2,500/month to solve it represents an immediate 4x net gain."}
        ],
        "Always calculate the client's financial bleed before pitching your price; math closes deals far better than persuasive rhetoric.",
        metrics=[
            {"label": "Monthly Payroll Bleed", "val": "$2,400 / mo", "note": "80 hrs manual data entry"},
            {"label": "Monthly Lost Lead Revenue", "val": "$7,500 / mo", "note": "Dropped after-hours leads"},
            {"label": "Total Client Bleed", "val": "$9,900 / mo", "note": "Quantifiable annual leak ($118k)"},
            {"label": "Your Monthly Fee", "val": "$2,500 / mo", "note": "Delivers instant 4x ROI"}
        ]
    ),
    make_rich_slide(
        "s-022-3", 3, "MODULE 02 · LESSON 2.2",
        "The 4-Step Process Discovery Workflow",
        "The structured interview framework used during discovery calls to extract the client's exact operational friction.",
        [
            {"title": "Step 1: Inbound Entry Audit", "desc": "Ask: 'What exact steps occur from the second someone submits a form on your website until they speak with an estimator?'"},
            {"title": "Step 2: Tool & Hand-off Mapping", "desc": "Ask: 'Which software tools do those details pass through, and who is manually moving the information between them?'"},
            {"title": "Step 3: Latency & Drop-Off Diagnosis", "desc": "Ask: 'What is your average response time on a Sunday afternoon, and what percentage of leads never get a callback?'"},
            {"title": "Step 4: Solution Architecture", "desc": "Diagram the future state live on screen: 'Here is how an automated webhook and AI triage eliminates all 4 manual steps.'"}
        ],
        "A discovery call should feel like an MRI scan; diagnose the exact operational fracture before prescribing the software cure.",
        diagram={
            "title": "Bottleneck Discovery to Solution Architecture",
            "steps": [
                {"step": "01", "tech": "Discovery", "title": "Audit Lead Flow", "desc": "Trace exact path from initial click to sales conversation.", "metric": "Uncover 4 Leaks"},
                {"step": "02", "tech": "Quantify", "title": "Calculate Bleed", "desc": "Multiply lost leads by average customer lifetime value.", "metric": "$9,900/mo Bleed"},
                {"step": "03", "tech": "Diagram", "title": "Map Future State", "desc": "Show visual Make.com replacement of all 4 manual steps.", "metric": "< 45s Execution"},
                {"step": "04", "tech": "Close", "title": "Present Retainer", "desc": "Position $2,500/month fee as a 4x ROI revenue protection plan.", "metric": "Signed SOW"}
            ]
        }
    ),
    make_rich_slide(
        "s-022-4", 4, "MODULE 02 · LESSON 2.2",
        "Prioritizing High-ROI vs Low-Value Workflows",
        "Selecting only workflows that directly impact top-line revenue or critical operational uptime.",
        [
            {"title": "Tier 1: Revenue Impact (Always Automate)", "desc": "Speed-to-lead, instant quote generation, automated appointment reminders, and missed-call recovery."},
            {"title": "Tier 2: High Operational Friction (Automate)", "desc": "Automated invoice creation in QuickBooks, CRM pipeline stage sync, customer onboarding document generation."},
            {"title": "Tier 3: Low-Value Traps (Avoid)", "desc": "Automating social media caption generation, internal team birthday alerts, or obscure HR forms."},
            {"title": "The Strategic Rule", "desc": "Only build workflows where you can measure a direct dollar return on the client's monthly P&L statement."}
        ],
        "Refuse to automate low-value internal busywork; build systems that directly generate sales or recover lost revenue.",
        chart={
            "title": "Workflow Prioritization Matrix: Business Impact vs Effort",
            "data": [
                {"label": "Tier 1: Speed-to-Lead & Recovery", "value": "Impact: 9.5 / 10 · High ROI", "barPct": 95, "badge": "Primary Offer", "note": "Directly generates thousands in sales"},
                {"label": "Tier 2: CRM & Invoice Sync", "value": "Impact: 7.5 / 10 · Labor Savings", "barPct": 75, "badge": "Retainer Upsell", "note": "Saves 40+ administrative hours/mo"},
                {"label": "Tier 3: Social Media & Internal Bots", "value": "Impact: 2.0 / 10 · Low Value", "barPct": 20, "badge": "Do Not Sell", "note": "Novelty projects with zero client ROI"}
            ]
        }
    )
]

m02_l2_written = r"""# Mapping Business Bottlenecks: Identifying High-ROI Manual Workflows

The most critical skill of an AI Systems Architect is not writing intricate webhook code; it is **financial bottleneck diagnosis**. 

Most business owners know their operations are inefficient, but they lack the technical vocabulary to pinpoint why. They say things like *"Our staff is overwhelmed"* or *"Leads are slipping through the cracks."*

Your job is to act as an operational surgeon: audit their workflows, quantify their financial bleed, and show them how automated cloud systems eliminate their operational friction.

---

## 1. The 4 Universal Business Bottlenecks

Across every mid-sized B2B service firm ($500k–$3M revenue), you will consistently find four operational bottlenecks:

```
+--------------------------------------------------------------------------+
|                  THE 4 OPERATIONAL REVENUE LEAKS                         |
+--------------------------------------------------------------------------+

  LEAK 1: THE SPEED-TO-LEAD CHASM
  - Reality: Inbound web inquiries sit in an email inbox for 90 to 240 minutes.
  - Cost: Leads called after 30 minutes convert at 1/8th the rate of instant replies.
  - Annual Bleed: $40,000 – $90,000 in lost gross sales.

  LEAK 2: MANUAL DATA RE-ENTRY
  - Reality: Staff manually copies form submissions into CRM, spreadsheets, and calendar.
  - Cost: 2 employees * 10 hours/week * $28/hour loaded wage.
  - Annual Bleed: $29,120 in wasted administrative payroll.

  LEAK 3: ABANDONED PROSPECT FOLLOW-UP
  - Reality: Sales reps follow up once via phone. If unanswered, the lead is archived.
  - Cost: 80% of B2B transactions require 4 to 6 follow-up touchpoints.
  - Annual Bleed: 35% of qualified pipeline simply evaporates.

  LEAK 4: DELAYED ESTIMATE & PROPOSAL DELIVERY
  - Reality: Gathering scope and drafting standard PDF quotes takes 3 to 5 business days.
  - Cost: The prospect has already signed with a faster competitor.
  - Annual Bleed: Hundreds of hours in wasted sales team energy.
+--------------------------------------------------------------------------+
```

---

## 2. The Bottleneck ROI Calculation Model

When pitching a business owner, never say: *"We build Make.com automations with OpenAI APIs."* They do not care about your tools.

Use the **Financial Bleed Formula**:
$$\text{Total Monthly Bleed} = \text{Wasted Administrative Payroll} + \text{Lost Lead Revenue}$$

### Example Case Study: Elite Roofing & Siding ($1.5M Annual Gross)
- Inbound Leads: **120 leads / month**
- Missed / Delayed Leads (> 30 min): **35 leads (29%)**
- Normal Close Rate on Hot Leads: **25%**
- Average Job Profit: **$6,500**
- Monthly Revenue Lost to Delay: $35 \times 0.25 \times \$6,500 \times 0.50 \text{ (conservative capture)} = \mathbf{\$28,437/\text{month}}$
- Manual Data Entry Time: 45 hours / month @ $25/hr = **$1,125/month**
- **Total Bleed: $29,562 per month.**

When you present a **$2,500/month retainer** that recovers just 2 of those lost roofing jobs ($13,000 gross profit), the client is capturing an immediate **5.2x return on investment**. Closing the deal becomes a mathematical formality.

---

## 3. Potential Failure Modes and Pitfalls

### Pitfall 1: Automating Broken Processes
- **The Error:** A client has a confusing, 20-question lead capture form that converts at 1%. You build an automated webhook to sync it to Airtable.
- **The Fix:** Simplify the front-end intake first. Reduce the form to 4 essential fields (Name, Phone, Email, Primary Need) before applying automation.

### Pitfall 2: Scope Creep During Process Discovery
- **The Error:** Allowing the client to add 10 additional "nice-to-have" internal requests into a standard speed-to-lead retainer sprint.
- **The Fix:** Maintain a strict Statement of Work (SOW). Any workflow outside the core 3 agreed deliverables requires a separate $1,500 setup sprint.

---

## 4. Practical Implementation Exercise

1. **Conduct a Mock Discovery Audit:** Choose a local business you frequent. Map their intake flow from their website form. Identify the manual hand-offs and estimated response delay.
2. **Calculate Their Financial Bleed:** Estimate their monthly lead volume, average transaction size, and calculate their monthly revenue leak using the formula above.
3. **Draft a 1-Page Bottleneck Solution Blueprint:** Outline the Make.com modules required to eliminate their specific operational leak in under 45 seconds.

---

## 5. Key Actionable Takeaways

1. **Diagnose before prescribing:** Act as an operational doctor; uncover the financial bleed before discussing technology.
2. **Target high-friction revenue leaks:** Focus on speed-to-lead and abandoned follow-ups where ROI is immediately measurable.
3. **Anchor your fee against their financial loss:** A $2,500 retainer is cheap when it solves a $30,000/month operational leak.
4. **Standardize the solution:** Package the fix into an exportable blueprint you can reuse across multiple clients in the same niche.
"""

# --- LESSON 2.3: THE EXACT LESSON HIGHLIGHTED IN USER SCREENSHOT ---
m02_l3_slides = [
    make_rich_slide(
        "s-023-1", 1, "MODULE 02 · LESSON 2.3",
        "The Golden Rule of Speed-to-Lead",
        "Why inbound conversion rates drop precipitously with every minute of human delay.",
        [
            {"title": "The 5-Minute Window of Intent", "desc": "When a prospect submits an inquiry, their intent is at peak emotional focus; contacting them within 5 minutes yields a 78% contact rate."},
            {"title": "The 30-Minute Decay Cliff", "desc": "Waiting just 30 minutes causes lead qualification probability to drop by over 80% as the prospect leaves their computer or shops competitors."},
            {"title": "The After-Hours Vulnerability", "desc": "Over 42% of high-ticket B2B inquiries arrive on evenings and weekends when human staff is offline, causing valuable leads to freeze."},
            {"title": "The Autonomous Solution", "desc": "Deploying an event-driven AI response engine guarantees every lead receives a personalized, intelligent text message in under 45 seconds."}
        ],
        "Speed is the single greatest competitive advantage in sales; the first company to respond intelligently wins the deal 78% of the time.",
        chart={
            "title": "Lead Conversion Probability by Response Delay",
            "data": [
                {"label": "Under 5 Minutes (< 45s AI Response)", "value": "78% Conversion Probability", "barPct": 100, "badge": "Instant AI Trigger", "note": "Peak emotional buyer intent"},
                {"label": "15 Minutes (Delayed Human)", "value": "36% Conversion Probability", "barPct": 46, "badge": "53% Drop", "note": "Prospect begins browsing other tabs"},
                {"label": "30 Minutes (Standard Office)", "value": "19% Conversion Probability", "barPct": 24, "badge": "75% Drop", "note": "Prospect has left desk or called competitor"},
                {"label": "60+ Minutes (Average Business)", "value": "4% Conversion Probability", "barPct": 5, "badge": "Dead Pipeline", "note": "Nearly impossible to reach on phone"}
            ]
        }
    ),
    make_rich_slide(
        "s-023-2", 2, "MODULE 02 · LESSON 2.3",
        "The 45-Second Autonomous Pipeline Architecture",
        "The complete technical workflow connecting webhooks, LLM triage, CRM sync, and SMS telephony.",
        [
            {"title": "Node 1: Instant Webhook Ingestion (< 200ms)", "desc": "Make.com receives the form payload from Typeform, Webflow, or Facebook Lead Ads with zero polling delay."},
            {"title": "Node 2: Claude 3.5 Sonnet / GPT-4o Triage (< 800ms)", "desc": "Extracts customer intent, scores urgency (1-10), formats the name, and crafts a bespoke conversational SMS response."},
            {"title": "Node 3: Relational Airtable Sync (< 400ms)", "desc": "Deduplicates customer record, assigns lead status 'Processing', and stores the generated contextual prompt payload."},
            {"title": "Node 4: Twilio / Vapi SMS Delivery (< 1.5s)", "desc": "Dispatches the personalized text message containing an instant Cal.com scheduling link directly to the prospect's mobile phone."}
        ],
        "From web submission to a personalized SMS on the prospect's phone takes less than 3 seconds total execution time.",
        diagram={
            "title": "24/7 Autonomous Speed-to-Lead Execution Flow",
            "steps": [
                {"step": "01", "tech": "Typeform / Ads", "title": "Lead Trigger", "desc": "Captures raw prospect details and fires instant webhook.", "metric": "< 200ms"},
                {"step": "02", "tech": "Make.com Core", "title": "Router & Filter", "desc": "Normalizes payload, verifies valid phone number schema.", "metric": "< 150ms"},
                {"step": "03", "tech": "Claude 3.5 / GPT-4o", "title": "AI Triage Engine", "desc": "Analyzes project scope and generates personalized SMS copy.", "metric": "650ms"},
                {"step": "04", "tech": "Twilio + Cal.com", "title": "SMS & Booking", "desc": "Fires conversational SMS with instant calendar reservation link.", "metric": "< 1.2s"}
            ]
        }
    ),
    make_rich_slide(
        "s-023-3", 3, "MODULE 02 · LESSON 2.3",
        "Engineering the Conversational SMS Hook",
        "How to craft AI responses that sound like an attentive human founder rather than a spammy automated robot.",
        [
            {"title": "The Anti-Robot Rule", "desc": "Never say: 'Thank you for submitting our web form. A representative will contact you shortly.' This triggers immediate consumer disengagement."},
            {"title": "The Contextual Acknowledgment", "desc": "Reference their exact inquiry: 'Hey Sarah, saw you’re looking to replace an AC unit in North Austin. Just reviewed your request.'"},
            {"title": "The Low-Friction Micro-Commitment", "desc": "End with a simple binary question: 'Do you need this inspected before the weekend, or is early next week better?'"},
            {"title": "Autonomous Qualification", "desc": "When the lead replies via SMS, the Make.com scenario parses their response and automatically books an estimate on the calendar."}
        ],
        "A great automated text message feels like a personal, one-to-one message from the business owner.",
        metrics=[
            {"label": "Average SMS Open Rate", "val": "98.2%", "note": "Within 3 minutes of receipt"},
            {"label": "Reply Rate to Contextual SMS", "val": "54.6%", "note": "Vs 8% for generic email"},
            {"label": "Direct Calendar Bookings", "val": "38.0%", "note": "Via automated Cal.com links"},
            {"label": "Total System Latency", "val": "< 45 Seconds", "note": "Guaranteed 24/7/365"}
        ]
    ),
    make_rich_slide(
        "s-023-4", 4, "MODULE 02 · LESSON 2.3",
        "Building Circuit Breakers & Fail-Safe Telemetry",
        "Ensuring 99.9% uptime so your client never drops a lead due to third-party API outages.",
        [
            {"title": "The Error-Directive Node", "desc": "Attach Make.com 'Break' and 'Resume' directives to HTTP modules to retry failed OpenAI API calls automatically after 15 seconds."},
            {"title": "The Secondary Fail-Safe Route", "desc": "If OpenAI experiences a service outage, the scenario falls back to a deterministic, pre-written high-converting SMS template."},
            {"title": "Emergency Telegram Alerting", "desc": "Any persistent 500 API error triggers an instant webhook notification to your private mobile Telegram channel."},
            {"title": "The Monthly SLA Guarantee", "desc": "Deliver 99.9% uptime metrics in your monthly Loom report to prove your $2,500 retainer is defending their revenue 24/7."}
        ],
        "A professional automation engineer designs for failure modes; circuit breakers turn outages into invisible self-healing events.",
        chart={
            "title": "System Reliability: Standard Zapier vs AAA Circuit Breaker Architecture",
            "data": [
                {"label": "Standard Linear Zap (No Error Handler)", "value": "89.2% Uptime (Dropped Leads)", "barPct": 89, "badge": "High Risk", "note": "Fails silently on API rate-limits"},
                {"label": "AAA Circuit Breaker Engine", "value": "99.9% Uptime (Self-Healing)", "barPct": 100, "badge": "Enterprise Moat", "note": "Auto-retries + fallback SMS + instant alert"}
            ]
        }
    )
]

m02_l3_written = r"""# Deploying 24/7 Autonomous Lead Response Engines (Speed-to-Lead)

In digital marketing and B2B client acquisition, there is an undisputed, empirically verified reality: **Speed-to-lead dictates conversion**.

According to landmark research published by the *Harvard Business Review* and InsideSales.com:
- Firms that attempt to contact potential customers within **5 minutes** of form submission are **nearly 100 times more likely to connect** and **21 times more likely to qualify** than those waiting 30 minutes.
- After **5 minutes**, the qualification odds drop by **80%**.
- After **60 minutes**, the lead is virtually dead—the prospect has either returned to work, closed their browser tabs, or called a competing business.

Yet, over **85% of businesses** fail the speed-to-lead test. During the business day, their average response time is **42 minutes**. On evenings and weekends, response times stretch to **14 to 36 hours**.

By building and deploying a **24/7 Autonomous Speed-to-Lead Response Engine**, a solo AI agency operator solves this massive commercial problem forever.

---

## 1. The Technical Architecture of the 45-Second Engine

Below is the complete architectural blueprint for an enterprise-grade speed-to-lead engine deployed using **Make.com, OpenAI/Claude APIs, Airtable, and Twilio**:

```
+--------------------------------------------------------------------------+
|                  24/7 AUTONOMOUS SPEED-TO-LEAD ENGINE                    |
+--------------------------------------------------------------------------+

  [Prospect Web Form / Ad]
             |
             v  (Webhook trigger < 200ms)
    [Make.com Webhook Router]
             |
             v  (JSON validation & deduplication)
    [Claude 3.5 / GPT-4o API]  <--- Prompt: Contextual triage & SMS draft
             |
             v  (Dynamic personalized text copy < 800ms)
    [Airtable Master CRM Base] <--- Logs lead, status: "Contacted", urgency score
             |
             v  (Twilio REST API dispatch < 1.2s)
   [Prospect's Mobile Phone]   <--- Personalized SMS with Cal.com booking link
             |
    TOTAL EXECUTION TIME: UNDER 3 SECONDS (Guaranteed 24/7/365)
+--------------------------------------------------------------------------+
```

---

## 2. Step-by-Step Implementation Guide in Make.com

### Module 1: Custom Webhook Listener
1. In Make.com, create a new scenario and add a **Custom Webhook** module.
2. Label it `Client-Lead-Intake-Production`.
3. Copy the unique webhook URL and paste it into the form provider (e.g., Webflow Webhook Settings, Typeform Integrations, or Meta Lead Ads Webhook).
4. Send a test submission with fields: `first_name`, `last_name`, `phone_number`, `email`, `project_description`, `urgency`.

### Module 2: Phone Number Normalization
1. Add a **Phone Number** formatting module (or simple Regex) to clean the incoming phone string into standard E.164 format: `+1XXXXXXXXXX`.
2. This prevents Twilio API delivery failures caused by parenthesis, dashes, or missing country codes.

### Module 3: LLM Cognitive Triage (OpenAI Create a Chat Completion)
1. Select model: `gpt-4o-mini` (for sub-second latency) or `claude-3-5-sonnet-20241022`.
2. Configure System Prompt:
   ```text
   You are an attentive, professional assistant to Dr. Smith at Austin Dental Clinic.
   A prospect named {{1.first_name}} just submitted an inquiry stating: "{{1.project_description}}".
   Draft a friendly, conversational SMS under 140 characters.
   Do NOT sound like a robot. Acknowledge their specific issue with empathy.
   End by asking if they would like to see available appointment slots this week.
   Do not include hashtags, emojis, or corporate clichés.
   ```
3. Set `temperature: 0.3` for consistent, professional output.

### Module 4: Relational CRM Record Creation (Airtable)
1. Connect the **Airtable Create a Record** module.
2. Map the normalized lead fields, the AI-generated SMS draft, and set `Status = "Auto-Contacted"`.
3. Set `Timestamp = now`.

### Module 5: Instant SMS Telephony (Twilio Send SMS)
1. Connect the **Twilio Send a Message** module using the client's Twilio credentials.
2. Set `To = {{normalized_phone}}`.
3. Set `Body = "{{3.choices[].message.content}} \n\nView calendar: cal.com/client-link"`.

---

## 3. Engineering Circuit Breakers and Error Handlers

In high-ticket agency services, an unhandled error means a lost client lead. You must configure **Make.com Error Directives**:

1. **Attach a 'Break' Directive to the OpenAI Node:**
   - If OpenAI experiences a 503 rate-limit error, configure the `Break` module to retry execution 3 times at 15-second intervals.
2. **Build a Fallback Branch:**
   - If the API fails after 3 retries, route execution to a fallback SMS module that sends a pre-approved, deterministic text template:
     *"Hi {{1.first_name}}, received your request! Our system is reserving your spot right now. Book your time directly here: cal.com/client-link"*
3. **Emergency Telegram Telemetry:**
   - Route any unhandled error payload via webhook to your private mobile Telegram channel so you are notified within 2 seconds.

---

## 4. Potential Failure Modes and Solutions

### Pitfall 1: Carrier Filtering & A2P 10DLC Registration
- **The Error:** In the United States, unregistered commercial SMS traffic gets blocked by carriers (AT&T, Verizon, T-Mobile).
- **The Fix:** Always register the client's business for **A2P 10DLC brand and campaign compliance** inside their Twilio console before turning on live outreach.

### Pitfall 2: Re-Engaging Leads in the Middle of the Night
- **The Error:** A lead submits a form at 3:15 AM; the system immediately texts them, waking them up and causing annoyance.
- **The Fix:** Implement a time-gate filter in Make.com: If the lead arrives between 10:00 PM and 7:00 AM local time, queue the SMS to fire automatically at 7:15 AM sharp.

---

## 5. Practical Implementation Exercise

1. **Build the Make.com Speed-to-Lead Scenario:** Follow the 5-module architecture above in your free-tier Make.com account.
2. **Test End-to-End Execution:** Fill out your test form with your own mobile phone number. Start a stopwatch. Verify that the personalized SMS arrives on your phone in under 15 seconds.
3. **Record a 60-Second Demonstration Video:** Use Loom to record yourself submitting the form and showing the instant text on your phone. This 60-second clip will be your primary sales asset to close clients.

---

## 6. Key Actionable Takeaways

1. **Response speed is binary:** You either reach the customer while they are interested, or you lose them to a faster competitor.
2. **Sub-45-second execution creates customer delight:** Prospects are stunned by the immediate, intelligent responsiveness.
3. **Circuit breakers guarantee 99.9% uptime:** Always engineer fallback branches and automated error notifications.
4. **This single system justifies a $2,500/month retainer:** Recovering just 2 or 3 lost leads per month covers the entire fee.
"""

# --- LESSON 2.4 ---
m02_l4_slides = [
    make_rich_slide(
        "s-024-1", 1, "MODULE 02 · LESSON 2.4",
        "The High-Ticket Retainer Contract",
        "How to price, structure, and legally protect $2,000 to $5,000/month recurring service agreements.",
        [
            {"title": "The Setup Sprint Fee ($2,500 - $5,000)", "desc": "A non-negotiable upfront fee that covers technical discovery, Make.com blueprint deployment, and API integration."},
            {"title": "The Ongoing Maintenance Retainer ($1,500 - $3,500/mo)", "desc": "Billed automatically on the 1st of every month for 99.9% uptime monitoring, schema updates, and prompt tuning."},
            {"title": "The 90-Day Initial Commitment", "desc": "Protect your cash flow by requiring a 3-month minimum commitment before transitioning to standard month-to-month terms."},
            {"title": "Pass-Through Infrastructure Costs", "desc": "All third-party Twilio minutes, Vapi telephony credits, and SMS fees are billed directly to the client's credit card."}
        ],
        "Collect setup fees upfront to fund initial building, and lock in 90-day minimum retainers to guarantee predictable cash flow.",
        metrics=[
            {"label": "Standard Setup Sprint", "val": "$2,500 - $3,500", "note": "Collected on Day 1"},
            {"label": "Monthly Recurring Retainer", "val": "$2,000 - $2,500/mo", "note": "Billed on 1st of month"},
            {"label": "Initial Contract Term", "val": "90 Days Minimum", "note": "Protects revenue stability"},
            {"label": "Target Client Retention", "val": "10 - 14 Months", "note": "Mission-critical systems"}
        ]
    ),
    make_rich_slide(
        "s-024-2", 2, "MODULE 02 · LESSON 2.4",
        "The 1st-of-the-Month Asynchronous ROI Loom",
        "The monthly client reporting protocol that reduces churn to less than 3% per year.",
        [
            {"title": "The Churn Trap of Silence", "desc": "If a client does not hear from you for 30 days, they assume nothing is happening and begin questioning your monthly fee."},
            {"title": "The 3-Minute Video Walkthrough", "desc": "On the 1st of every month, record a concise screen-share walking through their Airtable telemetry dashboard."},
            {"title": "Highlighting Quantifiable Metrics", "desc": "Display: Total leads captured (e.g., 142), average response latency (3.2 seconds), and estimated pipeline value ($68,000)."},
            {"title": "Proactive Value Inoculation", "desc": "Delivering undeniable proof of financial return before the client ever asks guarantees perpetual contract renewal."}
        ],
        "Deliver proof of ROI on the 1st of every month to make your agency retainer an untouchable business expense.",
        chart={
            "title": "Client Retention Rate: Asynchronous ROI Loom vs Silence",
            "data": [
                {"label": "Monthly 3-Minute Asynchronous ROI Loom", "value": "97.4% Annual Retention Rate", "barPct": 97, "badge": "Elite Retention", "note": "Client sees undeniable proof of return"},
                {"label": "Traditional Silence (No Proactive Proof)", "value": "42.0% Annual Retention Rate", "barPct": 42, "badge": "High Churn", "note": "Client cancels after 3 to 4 months"}
            ]
        }
    ),
    make_rich_slide(
        "s-024-3", 3, "MODULE 02 · LESSON 2.4",
        "The 3-Tier Retainer Ascension Ladder",
        "How to expand a single $1,500/month client into a $3,500/month multi-system contract over 6 months.",
        [
            {"title": "Tier 1: Speed-to-Lead ($1,500 - $2,000/mo)", "desc": "Core entry offer: automated instant SMS, basic lead qualification, and calendar booking."},
            {"title": "Tier 2: Full Operations Hub ($2,500 - $3,500/mo)", "desc": "Ascension in Month 3: adds Airtable CRM sync, automated invoice drafting, and internal Slack alerts."},
            {"title": "Tier 3: Omnichannel Revenue Engine ($4,500+/mo)", "desc": "Ascension in Month 6: adds AI outbound reactivation, multimodal proposal parsing, and custom Softr portals."},
            {"title": "Zero Acquisition Cost Growth", "desc": "Growing existing clients up the ladder allows you to reach $10k–$15k/month without needing to prospect new accounts."}
        ],
        "The fastest way to double your agency income is to ascend existing happy clients into higher-tier operational systems.",
        diagram={
            "title": "Client Value & Retainer Ascension Roadmap",
            "steps": [
                {"step": "01", "tech": "Month 1 - 2", "title": "Tier 1: Speed-to-Lead", "desc": "Deploy 24/7 autonomous SMS and Cal.com booking engine.", "metric": "$2,000/mo"},
                {"step": "02", "tech": "Month 3 - 5", "title": "Tier 2: Operations Hub", "desc": "Ascend to Airtable relational CRM, QuickBooks invoice routing.", "metric": "$2,850/mo"},
                {"step": "03", "tech": "Month 6+", "title": "Tier 3: Omnichannel Engine", "desc": "Deploy database reactivation campaigns and custom Softr portals.", "metric": "$3,800/mo"},
                {"step": "04", "tech": "Ongoing", "title": "Performance Upside", "desc": "Negotiate base + 5% revenue share on captured deals.", "metric": "$5,000+/mo"}
            ]
        }
    ),
    make_rich_slide(
        "s-024-4", 4, "MODULE 02 · LESSON 2.4",
        "Defending Margins & Enforcing Scope Boundaries",
        "How to handle out-of-scope requests without causing friction or sacrificing your profitability.",
        [
            {"title": "The Strict Scope Boundary", "desc": "Clearly define what is covered in the retainer (uptime, bug fixes, prompt adjustments) vs what constitutes a new sprint."},
            {"title": "The Friendly SOW Gate", "desc": "When a client requests a major new feature, say: 'We can definitely build that! That falls under a dedicated 1-week sprint ($1,500).'"},
            {"title": "The Asynchronous Ticket Queue", "desc": "Direct all feature requests through a structured Notion form with defined 24-to-48-hour response windows."},
            {"title": "Protecting the 20-Hour Solo Ceiling", "desc": "Enforcing clear scope boundaries allows you to earn $10,000+/month while preserving complete calendar freedom."}
        ],
        "Firm boundaries protect both your profit margins and the client's respect for your technical authority.",
        metrics=[
            {"label": "Standard Out-of-Scope Sprint", "val": "$1,250 - $2,500", "note": "Paid upfront per build"},
            {"label": "Asynchronous SLA Window", "val": "24 - 48 Hours", "note": "Batch processed once daily"},
            {"label": "Max Retainer Clients Solo", "val": "4 to 5 Accounts", "note": "Reaches $10k - $12.5k/mo"},
            {"label": "Weekly Deep Work Hours", "val": "16 - 20 Hours", "note": "Sustainable lifestyle balance"}
        ]
    )
]

m02_l4_written = r"""# Pricing, Packaging & Retaining AAA Retainers ($2,000–$5,000/mo)

The fatal mistake made by inexperienced automation specialists is pricing their services as one-off projects. They charge a $1,500 one-time fee to build a complex Make.com system, hand over the keys, and walk away.

Two weeks later, an external API updates its authentication payload, a webhook fails, the client becomes frustrated, and the specialist is forced to troubleshoot for free—or worse, gets blamed for lost sales.

In a professional **AI Automation Agency (AAA)**, you never sell disconnected one-off builds. You sell **mission-critical operational partnerships** structured around **setup sprint fees and recurring monthly retainers**.

---

## 1. The Standard 2-Tier Pricing Architecture

```
+--------------------------------------------------------------------------+
|                  THE STANDARD AAA PRICING ARCHITECTURE                   |
+--------------------------------------------------------------------------+

  TIER 1: THE IMPLEMENTATION SETUP SPRINT ($2,500 - $3,500 ONE-TIME)
  - Covers technical audit, API credential verification, and webhook mapping.
  - Development of Make.com scenarios, Airtable schemas, and Twilio configs.
  - End-to-end stress-testing and team onboarding tutorial via Loom.
  - Delivery Window: Exactly 14 business days from deposit payment.

  TIER 2: THE RECURRING OPERATIONS RETAINER ($1,500 - $2,500 / MONTH)
  - 99.9% Cloud Uptime Monitoring & Automated Circuit Breaker Maintenance.
  - Monthly prompt calibration and LLM fine-tuning to maintain high response rates.
  - API schema updates when third-party tools release version deprecations.
  - Bi-weekly minor workflow optimizations (up to 3 hours/month).
  - Monthly Asynchronous ROI Video Report delivered on the 1st of every month.
  - Initial Term: 90-day minimum agreement, then month-to-month with 30 days notice.
+--------------------------------------------------------------------------+
```

---

## 2. The 1st-of-the-Month Asynchronous ROI Loom Protocol

Client retention is the true foundation of reaching and sustaining **$10,000+/month** as a solo operator. If you sign 2 clients each month but lose 2 clients to churn, you are trapped on an exhausting hamster wheel.

To maintain **95%+ annual client retention**, execute the **1st-of-the-Month Asynchronous ROI Loom**:

1. Open the client's Airtable master base on screen.
2. Filter the view for the previous calendar month.
3. Record a **90-to-180-second screen-share video** following this exact script:
   > *"Good morning, team! Here is your quick 2-minute operational recap for last month. In the past 30 days, your autonomous speed-to-lead system processed 148 inbound inquiries with an average response time of 3.4 seconds. Out of those 148 inquiries, 58 prospects replied directly via SMS, and 34 booked consultation appointments directly on your calendar. Based on your average deal margin of $1,800, that represents over $60,000 in generated pipeline. All API routes and circuit breakers are running at 100% uptime. Have a fantastic month ahead!"*
4. Send the video link via email. 

When a business owner receives this video on the first day of the month, their $2,500 retainer fee is perceived as an absolute bargain.

---

## 3. Scope Boundary Defense: Managing Out-of-Scope Requests

Clients will naturally ask: *"Can you also automate our QuickBooks payroll and build a customer portal?"*

If you say yes without charging, you destroy your margins and work hours. If you say a harsh no, you create client friction.

**The Calibrated Expansion Script:**
> *"We would love to build that for you! That is a fantastic operational upgrade. Because our monthly retainer covers the maintenance, uptime, and optimization of your core speed-to-lead engine, building a complete QuickBooks invoice integration falls into a dedicated 1-week implementation sprint. We can deploy that entire system for a flat $1,500 sprint fee. Shall I send over the 1-page SOW to kick off next Monday?"*

This script frames the request as a positive upgrade, maintains professional boundaries, and generates immediate incremental cash flow.

---

## 4. Potential Failure Modes and Solutions

### Pitfall 1: Failing to Automate Payment Invoicing
- **The Error:** Manually sending PDF invoices at the end of every month and chasing clients for check payments.
- **The Fix:** Require automated credit card or ACH billing through Stripe Subscriptions on the 1st of every month before work begins.

### Pitfall 2: Neglecting the 90-Day Initial Term
- **The Error:** Letting clients sign month-to-month contracts from Day 1, allowing them to cancel after Month 1 once the initial automation is built.
- **The Fix:** Mandate a 90-day initial contract term. Explain that 90 days is required to gather sufficient baseline data and optimize conversion metrics.

---

## 5. Practical Implementation Exercise

1. **Create Your Retainer Agreement Template:** Draft a clean 2-page Service Agreement specifying the Setup Fee ($2,500), Monthly Retainer ($2,000), 90-day initial term, and asynchronous support scope.
2. **Configure Your Stripe Subscription Product:** Set up a recurring $2,000/month billing product in Stripe with automatic card retries.
3. **Record a Mock 1st-of-the-Month Loom:** Practice delivering the 2-minute ROI script using sample Airtable metrics.

---

## 6. Key Actionable Takeaways

1. **Always package setup with recurring retainers:** Never sell one-off builds without recurring maintenance.
2. **Mandate a 90-day minimum term:** Protect your cash flow and give the system time to compound.
3. **Deliver the 1st-of-the-month ROI Loom:** Proactively prove your financial return before the client ever questions your fee.
4. **Ascend existing clients:** Expanding 4 existing accounts from $2,000 to $3,500/month takes you to $14,000/month with zero new client acquisition costs.
"""

# Assemble Modules 01 and 02 into ExtendedLesson objects

MODULE_02 = [
    {
        "id": "02-1", "number": "2.1", "title": "The Anatomy of a High-Ticket AI Automation Agency (AAA)",
        "duration": "14m",
        "summary": "Discover why businesses happily pay $2,000$3,500/month retainers for operations automations while treating cheap chatbots as worthless novelties.",
        "learningObjective": "Structure high-ticket B2B automation packages, identify high-LTV business niches, and deploy standardized Make.com blueprints to command premium retainers.",
        "takeaway": "Never sell artificial intelligence as a novelty; sell measurable revenue recovery and operational time savings.",
        "slides": m02_l1_slides, "writtenLesson": m02_l1_written
    },
    {
        "id": "02-2", "number": "2.2", "title": "Mapping Business Bottlenecks: Identifying High-ROI Manual Workflows",
        "duration": "15m",
        "summary": "Conduct a discovery audit of a business's operations to pinpoint high-friction manual data leaks and quantify the exact dollar value of automating them.",
        "learningObjective": "Execute the 4-step process discovery interview, calculate quantifiable client financial bleed, and present irresistible 4x ROI automation proposals.",
        "takeaway": "Always calculate the client's financial bleed before pitching your price; math closes deals far better than persuasive rhetoric.",
        "slides": m02_l2_slides, "writtenLesson": m02_l2_written
    },
    {
        "id": "02-3", "number": "2.3", "title": "Deploying 24/7 Autonomous Lead Response Engines (Speed-to-Lead)",
        "duration": "15m",
        "summary": "Build and deploy an automated speed-to-lead pipeline that texts and qualifies inbound prospects within 45 seconds using Make.com, OpenAI, Airtable, and Twilio.",
        "learningObjective": "Architect an enterprise speed-to-lead engine in Make.com, engineer human-like conversational SMS hooks, and deploy circuit-breaker error handlers for 99.9% uptime.",
        "takeaway": "Speed is the single greatest competitive advantage in sales; the first company to respond intelligently wins the deal 78% of the time.",
        "slides": m02_l3_slides, "writtenLesson": m02_l3_written
    },
    {
        "id": "02-4", "number": "2.4", "title": "Pricing, Packaging & Retaining AAA Retainers ($2,000$5,000/mo)",
        "duration": "14m",
        "summary": "Package automation services into setup sprint fees and recurring monthly retainers, and use the 1st-of-the-month asynchronous ROI Loom to eliminate churn.",
        "learningObjective": "Structure 2-tier client agreements, execute the monthly asynchronous ROI video reporting protocol, and ascend existing accounts to $3,500+/month contracts.",
        "takeaway": "Deliver proof of ROI on the 1st of every month to make your agency retainer an untouchable business expense.",
        "slides": m02_l4_slides, "writtenLesson": m02_l4_written
    }
]

print("Module 2 loaded with", len(MODULE_02), "lessons.")
