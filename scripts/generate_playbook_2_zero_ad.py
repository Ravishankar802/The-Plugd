import json
import os
from build_helpers import make_rich_slide, build_written_lesson, COURSE_TESTIMONIALS, DETAIL_TESTIMONIALS, COMMON_FAQS

MODULES_DEF = [
    {
        "num": "01",
        "title": "The Zero-Ad Paradigm & Client Acquisition Foundations",
        "desc": "Establish the foundational unit economics, positioning, and infrastructure for acquiring high-value B2B customers organically without burning capital on paid advertising.",
        "lessons": [
            ("01-1", "01.1", "The Cold Reality of Ad Burn vs Zero-Ad Economics", 15),
            ("01-2", "01.2", "Setting Up Your Frictionless Pipeline & Lead CRM", 16),
            ("01-3", "01.3", "The High-Relevance ICP Sniper Profile", 18),
            ("01-4", "01.4", "The Irresistible Proof-of-Concept Pilot Offer", 20),
        ]
    },
    {
        "num": "02",
        "title": "Inbound Organic Flywheels (Methods 1 & 2)",
        "desc": "Deploy high-converting audit-based acquisition and intercept companies already actively recruiting for full-time internal roles.",
        "lessons": [
            ("02-1", "02.1", "Method 1: The Trojan Horse Video Audit", 18),
            ("02-2", "02.2", "Executing 3-Minute Loom Teardowns That Close", 20),
            ("02-3", "02.3", "Method 2: Reverse Job Board Hijacking", 17),
            ("02-4", "02.4", "Pitching Automated Fractional Systems to Hiring Teams", 19),
        ]
    },
    {
        "num": "03",
        "title": "Community & Executive Infiltration (Methods 3 & 4)",
        "desc": "Infiltrate high-intent founder ecosystems and execute high-signal executive outreach that generates warm dialogue without sales friction.",
        "lessons": [
            ("03-1", "03.1", "Method 3: Direct Community Infiltration (Slack/Discord/Skool)", 16),
            ("03-2", "03.2", "The 'Trojan Horse Case Study' Post Architecture", 18),
            ("03-3", "03.3", "Method 4: High-Signal LinkedIn Boolean Operator Sourcing", 17),
            ("03-4", "03.4", "The Two-Touch Executive Conversation Starter", 19),
        ]
    },
    {
        "num": "04",
        "title": "Network & Partner Multipliers (Methods 5 & 6)",
        "desc": "Unlock hidden cash reserves inside dormant networks and partner with complementary service providers for steady, uncompetitive client referrals.",
        "lessons": [
            ("04-1", "04.1", "Method 5: The Dormant Contact 3-Step Reactivation", 16),
            ("04-2", "04.2", "Converting Past Acquaintances into $2,000/mo Retainers", 18),
            ("04-3", "04.3", "Method 6: Non-Competing Partner Agency Flywheels", 19),
            ("04-4", "04.4", "The 20% Revenue-Share Agency Integration Deal", 21),
        ]
    },
    {
        "num": "05",
        "title": "Authority Assets & Organic Spear Posts (Methods 7 & 8)",
        "desc": "Publish hyper-specific problem-solving assets that filter tire-kickers and turn public social interactions into private discovery conversations.",
        "lessons": [
            ("05-1", "05.1", "Method 7: Organic Content Spear Posts & Comment Funnels", 17),
            ("05-2", "05.2", "Automating DM Delivery via ManyChat & Zapier", 18),
            ("05-3", "05.3", "Method 8: The Hyper-Specific Lead Magnet Teardown", 20),
            ("05-4", "05.4", "Converting Asset Downloads to Commercial Discovery Calls", 19),
        ]
    },
    {
        "num": "06",
        "title": "Direct Sprints & Referral Loops (Methods 9 & 10)",
        "desc": "Deploy laser-focused cold outreach triggered by verified company events, and engineer automated client referral systems that compound your client base.",
        "lessons": [
            ("06-1", "06.1", "Method 9: Cold Email Precision Sniper Campaigns", 18),
            ("06-2", "06.2", "Hiring Trigger Targeting via Clay & Smartlead", 20),
            ("06-3", "06.3", "Method 10: Two-Sided Referral Loops & Strategic Bounties", 17),
            ("06-4", "06.4", "Engineering Viral Client Introduction Flywheels", 19),
        ]
    },
    {
        "num": "07",
        "title": "High-Converting Discovery Calls & Retainer Negotiations",
        "desc": "Execute frictionless 15-minute qualification calls, dismantle price objections with mathematical precision, and close $2,000/month retainers without sales friction.",
        "lessons": [
            ("07-1", "07.1", "The 15-Minute Frictionless Discovery Call Framework", 18),
            ("07-2", "07.2", "Neutralizing 'Send Me a Proposal' & 'We Don't Have Budget'", 19),
            ("07-3", "07.3", "The Three-Tier Retainer Closing Architecture ($1,500 / $2,500 / $5,000)", 20),
            ("07-4", "07.4", "Live Contract Execution & Upfront Payment Collection", 21),
        ]
    },
    {
        "num": "08",
        "title": "Client Retention, Referral Loops & Scaling to $10,000/Month",
        "desc": "Synthesize the 10 customer acquisition channels into a 60-minute daily operating cadence, optimize client retention, and secure predictable $10,000/month recurring income.",
        "lessons": [
            ("08-1", "08.1", "Unit Economics: 5 Retainers @ $2,000/mo vs 10 @ $1,000/mo", 20),
            ("08-2", "08.2", "The 60-Minute Daily Client Acquisition Protocol", 18),
            ("08-3", "08.3", "Client Onboarding & Retention Systems to Prevent Churn", 19),
            ("08-4", "08.4", "SOP Automation: Delegating Lead Gen to AI Agents", 22),
        ]
    }
]

def generate_playbook_2_data():
    modules_output = []
    
    for m in MODULES_DEF:
        m_num = m["num"]
        m_title = m["title"]
        m_desc = m["desc"]
        lessons_list = []
        
        for l_id, l_num, l_title, l_dur in m["lessons"]:
            slides = [
                make_rich_slide(
                    f"s-{l_id}-1", 1,
                    f"STRATEGIC DIRECTIVE // {m_num}",
                    f"Executive Foundations: {l_title}",
                    "Critical operational framework and high-leverage mental models for zero-ad acquisition.",
                    "Customer acquisition is an engineered engineering pipeline, not a lottery. Organic leverage beats ad burn every time.",
                    [
                        {"number": "01", "title": "Zero Ad Burn", "description": "Preserve 100% of gross margin by replacing unpredictable Meta/Google ad auctions with precision outbound and inbound value assets."},
                        {"number": "02", "title": "Targeted Relevance", "description": "Speak directly to a quantified operational bottleneck rather than blasting generic marketing promises to an indifferent crowd."},
                        {"number": "03", "title": "Demonstrated Competence", "description": "Lead with pre-built proofs-of-concept and customized audits that establish authority before a commercial pitch is ever delivered."},
                        {"number": "04", "title": "Compounding Leverage", "description": "Every audit, partnership, and case study asset compounds over time, driving ongoing inbound referrals without incremental cost."}
                    ],
                    diagram={
                        "title": "Zero-Ad Client Acquisition Architecture",
                        "steps": [
                            {"step": "01", "title": "Trigger Detection", "desc": "Identify active operational pain or hiring posting"},
                            {"step": "02", "title": "Value Audit", "desc": "Record 3-minute bespoke Loom solution"},
                            {"step": "03", "title": "Frictionless POC", "desc": "Deliver 48-hour pilot with guaranteed outcome"},
                            {"step": "04", "title": "Paid Retainer", "desc": "Convert to $2,000/mo recurring retainer"}
                        ]
                    },
                    chart={
                        "title": "Customer Acquisition Cost vs Lifetime Value Comparison",
                        "data": [
                            {"label": "Paid Social Ads CAC", "value": "$1,850", "barPct": 75, "badge": "High CAC"},
                            {"label": "Zero-Ad Organic CAC", "value": "$120", "barPct": 10, "badge": "93% Cheaper"},
                            {"label": "Client Lifetime Value (LTV)", "value": "$12,000", "barPct": 95, "badge": "High LTV"},
                            {"label": "Net Profit Margin Yield", "value": "92%", "barPct": 92, "badge": "Net Cash"}
                        ]
                    }
                ),
                make_rich_slide(
                    f"s-{l_id}-2", 2,
                    "TACTICAL PLAYBOOK",
                    f"Step-by-Step Execution: {l_title}",
                    "Detailed technical steps, scripts, and automation workflows to execute this client channel.",
                    "Friction kills conversion. Make it effortless for a prospect to say yes to a free audit or preliminary pilot.",
                    [
                        {"number": "01", "title": "Identify Buying Signals", "description": "Filter prospect databases by explicit hiring intent, operational expansion, or tech stack migrations."},
                        {"number": "02", "title": "Craft Bespoke Assets", "description": "Produce personalized video audits or micro-solutions addressing the exact observed workflow inefficiency."},
                        {"number": "03", "title": "Deliver Low-Friction DM", "description": "Send concise, permission-based outreach asking for authorization to share the custom asset."},
                        {"number": "04", "title": "Automate CRM Logging", "description": "Sync interactions directly into Airtable or Notion with automated follow-up cadences on Day 3 and Day 7."}
                    ],
                    metrics=[
                        {"label": "Target Close Rate", "val": "25–35%", "change": "+18% vs cold email", "note": "High intent"},
                        {"label": "Average Deal Size", "val": "$2,000/mo", "change": "Predictable MRR", "note": "Retainer contract"},
                        {"label": "Days to First Close", "val": "14 Days", "change": "High velocity", "note": "Fast payback"},
                        {"label": "Pipeline Margin", "val": "95% Net", "change": "Zero ad spend", "note": "Pure cash"}
                    ]
                ),
                make_rich_slide(
                    f"s-{l_id}-3", 3,
                    "FINANCIAL MODEL",
                    "The $10,000/Month Unit Economics Breakdown",
                    "How this specific customer acquisition method directly scales into a dependable $10,000/month recurring income.",
                    "Reaching $10,000/month does not require hundreds of customers. It requires exactly 5 high-ticket retainers @ $2,000/mo.",
                    [
                        {"number": "01", "title": "The 5-Client Formula", "description": "5 retainers @ $2,000/mo generates exactly $10,000/mo with minimal client management stress and 95% net margins."},
                        {"number": "02", "title": "Pipeline Math", "description": "At a 25% audit-to-close conversion, generating 20 bespoke audits produces 5 active recurring retainers."},
                        {"number": "03", "title": "Zero Ad Overhead", "description": "Operating without paid ads means your $10,000/mo revenue translates into over $9,200/mo in pure net owner cashflow."},
                        {"number": "04", "title": "Compounding Referrals", "description": "Each satisfied retainer client provides an average of 1.2 qualified introductions within 90 days of onboarding."}
                    ],
                    chart={
                        "title": "Monthly Revenue Progression to $10,000/Month Milestone",
                        "data": [
                            {"label": "Month 1 (1 Client)", "value": "$2,000/mo", "barPct": 20, "badge": "Launch"},
                            {"label": "Month 2 (2 Clients)", "value": "$4,000/mo", "barPct": 40, "badge": "Validation"},
                            {"label": "Month 3 (4 Clients)", "value": "$8,000/mo", "barPct": 80, "badge": "Acceleration"},
                            {"label": "Month 4 (Target Milestone)", "value": "$10,000/mo", "barPct": 100, "badge": "Target Reached"}
                        ]
                    }
                ),
                make_rich_slide(
                    f"s-{l_id}-4", 4,
                    "SYSTEM DEFENSE",
                    "Overcoming Friction & Client Objections",
                    "Proven psychological reframing and operational guardrails to handle skepticism and secure contracts.",
                    "Always de-risk the transaction. A client will never say no to an audit that is already completed and solves their bleeding pain.",
                    [
                        {"number": "01", "title": "Addressing Inertia", "description": "Counter 'We are too busy right now' by demonstrating that your system requires under 30 minutes of client onboarding time."},
                        {"number": "02", "title": "Price Justification", "description": "Anchor your $2,000/month fee against the $75,000/year salary plus benefits of a full-time in-house employee."},
                        {"number": "03", "title": "Proof of Performance", "description": "Provide a 14-day conditional milestone guarantee where the first month is refundable if core KPIs are unmet."},
                        {"number": "04", "title": "Retainer Stickiness", "description": "Integrate your workflow directly into their core databases so replacing your system would cause operational chaos."}
                    ]
                )
            ]
            
            context = f"""In the modern commercial landscape, the conventional advice to 'run paid ads to scale' has become a financial graveyard for solo operators and agency founders. With customer acquisition costs (CAC) surging across Meta, LinkedIn, and Google by over 65% in recent years, early-stage businesses frequently burn their entire working capital before ever establishing product-market resonance.

The truth is that paying customers exist in abundance right now, but they do not respond to generic advertising noise. They respond to demonstrated competence, hyper-specific relevance, and de-risked commercial propositions. In this lesson, **{l_title}**, we break down the operational mechanics of acquiring high-ticket B2B clients using organic, zero-ad acquisition channels that protect your margins and build enduring business relationships.

By focusing on direct value audits, strategic community positioning, and partner flywheels, you bypass the crowded auction of paid media entirely. You enter the prospect's world as a trusted specialist offering an obvious operational solution rather than a vendor pitching an unvetted service. This approach fundamentally preserves your unit economics, enabling a lean solo operation to generate $10,000+/month with 90%+ net profit margins."""

            steps = f"""To execute **{l_title}** with surgical precision, implement the following four-stage operational protocol:

1. **Prospect Identification & Trigger Scouring**:
   - Begin by defining a hyper-specific Ideal Customer Profile (ICP). Do not target 'all small businesses' or 'any e-commerce store'. Identify companies with between 10 and 50 employees who have recently posted a job opening, announced an operational expansion, or experienced an executive leadership change.
   - Utilize free scraping and directory tools such as LinkedIn Sales Navigator Boolean searches, Apollo.io free tiers, and niche community rosters to identify the exact decision-maker (Operations Director, Founder, or VP of Sales).

2. **Asset Synthesis & Pre-Emptive Value Creation**:
   - Construct a bespoke 3-minute video teardown or workflow blueprint addressing a visible bottleneck. If targeting an agency with slow lead response times, document their current response lag and diagram an automated 30-second speed-to-lead workflow.
   - Ensure the asset demonstrates immediate technical competence. Never pitch your service in the first two minutes; focus entirely on diagnosing their symptom, identifying the root systemic flaw, and mapping the step-by-step resolution.

3. **Frictionless Delivery & Low-Barrier Call-to-Action**:
   - Deliver the asset through a non-invasive direct message or short personalized email. Your goal in the initial touchpoint is not to close a contract, but simply to secure permission to deliver value: *'Hey [Name], noticed your team was hiring for [Role]. I put together a quick 3-minute video showing how we automated this exact workflow for another team, cutting 15 hours a week of manual triage. Mind if I send the link over?'*
   - By asking for permission before sending the link, you eliminate spam perception and generate psychological investment from the decision-maker.

4. **Conversion to a De-Risked Proof of Concept**:
   - Once the prospect watches the teardown and expresses interest, transition immediately to a 48-hour pilot offer: *'Let us build out this single integration for your team over the next 48 hours at zero upfront risk. If it saves your team at least 5 hours this week, we can discuss a ongoing monthly support retainer; if not, you keep the system with our compliments.'*"""

            table_headers = ["Channel / Strategy", "Target Audience", "Effort Level", "Close Velocity", "Margin Yield"]
            table_rows = [
                ["Trojan Horse Video Audits", "B2B Agencies & Tech SMBs", "Moderate (15m/audit)", "High (7–10 Days)", "95% Net"],
                ["Reverse Job Board Hijacking", "Companies Hiring Operations Staff", "Low (10m/pitch)", "Very High (5–7 Days)", "92% Net"],
                ["Executive Community Infiltration", "Skool/Slack Founder Communities", "Moderate (Engage daily)", "Moderate (14–21 Days)", "98% Net"],
                ["Non-Competing Partner Flywheels", "Web & Design Agencies", "Low (1 initial meeting)", "High (Ongoing referrals)", "80% Net (after 20% rev-share)"]
            ]

            economics = f"""To build a predictable, resilient solo business that yields **$10,000/Month ($120,000/Year)** in take-home income, you must adopt a high-ticket retainer framework rather than selling low-ticket, commoditized one-off gigs.

Consider the comparative economics:
- **Low-Ticket Model**: Selling $100 audits requires finding 100 new paying clients every single month. This leads to burnout, high churn, and zero compounding momentum.
- **The $10,000/Month Retainer Model**: Secure exactly **5 clients paying $2,000/month** on an ongoing workflow maintenance and optimization retainer. 
  - Total Gross Monthly Revenue: $10,000
  - Total Software & Operating Overhead: ~$350/month (Make.com, Airtable, Apollo, Loom, Workspace)
  - **Net Monthly Owner Cashflow: $9,650/month (96.5% Net Margin)**

With an average client lifetime of 8 to 12 months, acquiring just one new client every 6 weeks through these organic methods provides complete revenue stability while allowing you to focus on world-class fulfillment without advertising stress."""

            failure_rows = [
                ["Pitching Too Early in the DM", "Anxiety to sell leads to pitching before demonstrating value.", "Strictly adhere to the two-touch protocol: ask for permission to share the audit before pitching."],
                ["Generic Video Audits", "Sending pre-recorded templates that feel automated.", "Ensure the first 15 seconds shows the prospect's actual website, team page, or workflow in real-time."],
                ["Scope Creep in the Pilot", "Allowing the free or low-cost pilot to expand into full system rebuild.", "Cap the pilot strictly to 1 workflow, 1 integration trigger, and a 48-hour delivery SLA."],
                ["Failing to Re-Engage Dormant Leads", "Treating a non-response as a permanent rejection.", "Deploy a 3-touch follow-up sequence on Day 3, 7, and 14 sharing additional insights."]
            ]

            exercise = f"""**Step 1**: Identify 10 target companies matching your Ideal Customer Profile on LinkedIn or job boards that have an obvious manual bottleneck.
**Step 2**: Open Loom and record a 3-minute screen-recording teardown for the first 3 prospects. Walk through their public-facing intake process and map an automated solution.
**Step 3**: Send a 4-sentence permission-based outreach message to each decision-maker.
**Step 4**: Track responses in a clean CRM sheet and schedule your first 48-hour proof-of-concept pilot."""

            takeaways = [
                ("Margin Preservation", "Eliminating paid ad spend guarantees that 90%+ of your top-line revenue converts straight into owner profit."),
                ("Demonstrated Competence", "Showing a client how you solve their exact problem is 10x more persuasive than promising you can do it."),
                ("The 5-Client Benchmark", "Reaching $10,000/month only requires 5 stable retainers at $2,000/month; never overcomplicate your business model."),
                ("Frictionless De-risking", "Offer short pilots with clear outcome criteria to make choosing your service an undeniable operational decision.")
            ]

            written = build_written_lesson(
                m_num, m_title, l_num, l_title,
                context, steps, table_headers, table_rows, economics,
                failure_rows, exercise, takeaways
            )
            
            lessons_list.append({
                "id": l_id,
                "number": l_num,
                "title": l_title,
                "duration": f"{l_dur} min",
                "summary": f"{l_title} — Strategic overview, step-by-step implementation, decision matrix, and financial model.",
                "slides": slides,
                "writtenLesson": written
            })
            
        modules_output.append({
            "id": f"m-{m_num}",
            "number": m_num,
            "title": m_title,
            "subtitle": f"Module {m_num} · 4 Lessons",
            "description": m_desc,
            "duration": f"{sum(l[3] for l in m['lessons'])} min",
            "lessonsCount": len(lessons_list),
            "lessons": lessons_list
        })
        
    return modules_output

modules_data = generate_playbook_2_data()

ts_code = f"""import type {{ Course, Module, Lesson, Slide }} from "../playbooks-data";

export const ZERO_AD_CUSTOMERS_ID = "side-hustles-08";
export const ZERO_AD_CUSTOMERS_SLUG = "side-hustles";
export const ZERO_AD_CUSTOMERS_TITLE = "10 Ways to Find Paying Customers Without Spending on Ads";

export const ZERO_AD_CUSTOMERS_MODULES: Module[] = {json.dumps(modules_data, indent=2)};

export const ZERO_AD_CUSTOMERS_COURSE: Course = {{
  id: ZERO_AD_CUSTOMERS_ID,
  slug: ZERO_AD_CUSTOMERS_SLUG as any,
  categorySlug: "ai-businesses",
  categoryName: "AI Businesses",
  title: ZERO_AD_CUSTOMERS_TITLE,
  shortTitle: "10 Zero-Ad Customer Methods",
  audience: "Freelancers, Consultants & Solopreneurs" as any,
  targetGender: "for-all" as any,
  headline: "Discover 10 zero-ad customer acquisition strategies to find and close paying clients for your business.",
  subheadline: "A battle-tested tactical guide to finding paying clients organically through direct outreach, community channels, content leverage, and partnerships without spending a single dollar on ads.",
  description: "A battle-tested tactical guide to finding paying clients organically through direct outreach, community channels, content leverage, and partnerships without spending a single dollar on ads. Learn how to sign high-ticket retainers, construct 3-minute video audits, hijack job boards, and scale to $10,000+/month solo.",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  badge: "Bestseller",
  rating: 4.9,
  ratingCount: 312,
  hoursOfMaterial: "8.5 hours",
  slidesCount: 128,
  modulesCount: ZERO_AD_CUSTOMERS_MODULES.length,
  lessonsCount: ZERO_AD_CUSTOMERS_MODULES.reduce((acc, m) => acc + m.lessons.length, 0),
  primaryColor: "#090d16",
  accentColor: "#f59e0b",
  outcomes: [
    "Master 10 distinct, proven client acquisition methods that require zero ad spend",
    "Record 3-minute video audits that turn cold prospects into enthusiastic paying buyers",
    "Pitch fractional automated solutions to companies actively recruiting full-time staff",
    "Infiltrate founder communities to generate organic, high-intent inbound leads",
    "Reactivate past contacts with a proven 3-step outreach sequence",
    "Scale to a predictable $10,000+/month solo business with 5 retainers @ $2,000/month"
  ],
  modules: ZERO_AD_CUSTOMERS_MODULES,
  testimonials: {json.dumps(COURSE_TESTIMONIALS, indent=2)},
  faqs: {json.dumps(COMMON_FAQS, indent=2)}
}};
"""

with open("src/lib/playbooks/zero-ad-customers-data.ts", "w", encoding="utf-8") as f:
    f.write(ts_code)

print("Generated zero-ad-customers-data.ts successfully.")

# Write detail
detail_code = f"""import type {{ PlaybookDetailData }} from "../dating-playbook-detail";
import {{ ZERO_AD_CUSTOMERS_MODULES }} from "./zero-ad-customers-data";

export const ZERO_AD_CUSTOMERS_DETAIL_DATA: PlaybookDetailData = {{
  id: "side-hustles-08",
  slug: "side-hustles",
  title: "10 Ways to Find Paying Customers Without Spending on Ads",
  headline: "Discover 10 zero-ad customer acquisition strategies to find and close paying clients for your business.",
  description: "A battle-tested tactical guide to finding paying clients organically through direct outreach, community channels, content leverage, and partnerships without spending a single dollar on ads. Learn how to sign high-ticket retainers, construct 3-minute video audits, hijack job boards, and scale to $10,000+/month solo.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "Bestseller",
  rating: 4.9,
  ratingCount: 312,
  studentsCount: "1,180",
  instructorName: "Plugd Acquisition Team",
  instructorTitle: "B2B Client Strategists & Organic Growth Architects",
  instructorBio: "The Plugd Acquisition Team specializes in designing zero-ad customer acquisition systems, cold outreach engines, and high-ticket service packaging for solo founders.",
  instructorRating: 4.9,
  instructorReviews: "312",
  instructorStudents: "1,180",
  instructorCourses: 3,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "8.5 hours",
  modulesCount: 8,
  lessonsCount: 32,
  slidesCount: 128,
  whatYouWillLearn: [
    "Deploy 10 distinct, proven client acquisition methods that require zero ad spend",
    "Master the 3-minute Loom video audit framework that turns cold prospects into enthusiastic buyers",
    "Intercept companies currently hiring full-time staff and pitch fractional automated solutions",
    "Infiltrate niche Slack, Discord, and Skool communities to generate qualified inbound leads organically",
    "Unlock hidden revenue by reactivating dormant past contacts with a proven 3-step sequence",
    "Build non-competing partner agency flywheels that deliver steady, uncompetitive client referrals",
    "Execute high-converting spear content on LinkedIn and Twitter with automated DM fulfillment funnels",
    "Scale to a predictable $10,000+/month solo operation with exactly 5 retainers @ $2,000/month"
  ],
  relatedTopics: [
    "Client Acquisition",
    "Zero-Ad Marketing",
    "Cold Outreach",
    "B2B Sales",
    "Solopreneurship",
    "Loom Audits",
    "Agency Growth"
  ],
  requirements: [
    "No paid advertising budget required; 100% organic and direct methods",
    "A computer with a web browser, internet connection, and Loom account",
    "Willingness to spend 60 minutes daily executing the direct outreach protocol"
  ],
  descriptionSections: {{
    intro: [
      "Spending thousands of dollars on speculative Facebook or LinkedIn ads is the fastest way for a new service business or solo operator to go broke. In this comprehensive playbook, you will master the 10 battle-tested customer acquisition strategies that allow you to sign high-paying clients without spending a single dollar on advertising.",
      "From high-converting 3-minute video audits and reverse job board hijacking to non-competing agency partnerships and organic spear posts, every method is broken down with step-by-step implementation guides, outreach scripts, decision matrices, and real-world unit economics.",
      "Designed specifically for solo operators, agency founders, and consultants who want to reach $10,000+/month with 95%+ profit margins."
    ],
    keyPointsTitle: "The 8-Module Client Acquisition Curriculum",
    keyPoints: [
      "Module 1: The Zero-Ad Paradigm & Client Acquisition Foundations",
      "Module 2: Inbound Organic Flywheels (Methods 1 & 2)",
      "Module 3: Community & Executive Infiltration (Methods 3 & 4)",
      "Module 4: Network & Partner Multipliers (Methods 5 & 6)",
      "Module 5: Authority Assets & Organic Spear Posts (Methods 7 & 8)",
      "Module 6: Direct Sprints & Referral Loops (Methods 9 & 10)",
      "Module 7: High-Converting Discovery Calls & Retainer Negotiations",
      "Module 8: Client Retention, Referral Loops & Scaling to $10,000/Month"
    ],
    closing: [
      "Every single lesson provides both interactive executive presentation slides and a comprehensive written lesson detailing step-by-step execution.",
      "Stop wasting money on paid ads. Master the art of direct value delivery and build an enduring, highly profitable client roster today."
    ]
  }},
  targetAudience: [
    "Freelancers and consultants who want to transition to high-ticket recurring retainers",
    "Agency founders looking to reduce client acquisition costs and eliminate ad spend",
    "Solopreneurs wanting to reach $10,000+/month with minimal overhead and zero employees",
    "Service providers who struggle with cold outreach and want a proven value-first methodology"
  ],
  includes: [
    {{ iconName: "layers", text: "7 Modules & 28 High-Impact Lessons" }},
    {{ iconName: "file-text", text: "Interactive Slide Presentations & Deep Written Implementation Guides" }},
    {{ iconName: "video", text: "Proven DM Outreach Scripts, Loom Teardown Frameworks & Pitch Templates" }},
    {{ iconName: "infinity", text: "Lifetime Access & Continuous Curriculum Updates" }},
    {{ iconName: "shield-check", text: "Verified Certificate of Completion" }}
  ],
  testimonials: {json.dumps(DETAIL_TESTIMONIALS, indent=2)},
  faqs: {json.dumps(COMMON_FAQS, indent=2)},
  modules: ZERO_AD_CUSTOMERS_MODULES.map((mod) => ({{
    id: mod.id,
    number: mod.number,
    title: mod.title,
    duration: mod.duration,
    lessonsCount: mod.lessons.length,
    lessons: mod.lessons.map((l) => ({{
      id: l.id,
      number: l.number,
      title: l.title,
      duration: l.duration
    }}))
  }}))
}};
"""

with open("src/lib/playbooks/zero-ad-customers-detail.ts", "w", encoding="utf-8") as f:
    f.write(detail_code)

print("Generated zero-ad-customers-detail.ts successfully.")
