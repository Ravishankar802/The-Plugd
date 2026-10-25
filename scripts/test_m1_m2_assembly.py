import json
import os
import sys

# Load parts
from slide_builder import make_rich_slide
from generate_content_1_v2 import m01_l1_slides, m01_l1_written, m01_l2_slides, m01_l2_written

# Define m01_l3
m01_l3_slides = [
    make_rich_slide(
        "s-013-1", 1, "MODULE 01 · LESSON 1.3",
        "The 5-Dimensional Business Scoring System",
        "How to objectively evaluate any AI business model before investing time or capital.",
        [
            {"title": "Difficulty (Learning Curve)", "desc": "Assesses technical prerequisites, API complexity, and prompt engineering depth required to deliver reliable results."},
            {"title": "Time Intensity (Hours / Client)", "desc": "Measures ongoing manual labor required per client account, determining how many accounts a solopreneur can manage."},
            {"title": "Scalability (Fulfillment Ceiling)", "desc": "Evaluates whether operational workload increases linearly with revenue or compounds with software automation."},
            {"title": "Income Potential & Stress Level", "desc": "Balances revenue ceilings ($10k/mo vs $50k/mo) against client urgency, operational uptime, and high-stakes error risks."}
        ],
        "Never choose a business model based on hype; score every opportunity across Difficulty, Time, Scalability, Income, and Stress.",
        chart={
            "title": "The 5-Criteria Scoring Matrix Across Models",
            "data": [
                {"label": "AI Automation Agency (AAA)", "value": "Difficulty 4/5 · Income 4/5", "barPct": 75, "badge": "High Technical Moat", "note": "High setup value ($2.5k), high client retention"},
                {"label": "AI Creative & Content Studio", "value": "Difficulty 2.5/5 · Time 4/5", "barPct": 60, "badge": "Creative Assembly", "note": "Rapid client acquisition, requires revision caps"},
                {"label": "AI Shadow Operating", "value": "Difficulty 2/5 · Income 5/5", "barPct": 90, "badge": "Asymmetric Equity", "note": "Massive launch leverage, zero direct client stress"}
            ]
        }
    ),
    make_rich_slide(
        "s-013-2", 2, "MODULE 01 · LESSON 1.3",
        "Criteria #1 & #2: Difficulty vs. Time Intensity",
        "Understanding the trade-offs between initial technical complexity and ongoing operational drag.",
        [
            {"title": "The Technical Moat of Difficulty", "desc": "Higher difficulty (such as multi-step webhook routing) deters casual competitors and justifies premium $2,500/month retainers."},
            {"title": "The Time Intensity Trap", "desc": "Services requiring 8 hours of manual video curation per week naturally cap your capacity at 4 clients before burnout occurs."},
            {"title": "Frontloaded vs Backloaded Labor", "desc": "AAA requires 80% of labor in Week 1 (building scenarios) and 20% ongoing; Content Studios require consistent weekly production sprints."},
            {"title": "The 25-Hour Weekly Ceiling", "desc": "A viable solo business must generate $10,000/month while requiring under 25 hours per week of active operational time."}
        ],
        "Favor businesses that demand frontloaded technical effort over those that trap you in permanent weekly manual labor.",
        metrics=[
            {"label": "AAA Active Hours / Client", "val": "2 - 3 Hrs / Wk", "note": "Automated in cloud"},
            {"label": "Content Active Hours / Client", "val": "4 - 5 Hrs / Wk", "note": "Weekly video batches"},
            {"label": "Shadow Operator Active Hours", "val": "1 - 2 Hrs / Wk", "note": "Post-launch evergreen"},
            {"label": "Maximum Target Workweek", "val": "< 25 Hours", "note": "Preserves solo sanity"}
        ]
    ),
    make_rich_slide(
        "s-013-3", 3, "MODULE 01 · LESSON 1.3",
        "Criteria #3 & #4: Scalability vs. Income Potential",
        "How different business models cap or multiply your earning potential as a single operator.",
        [
            {"title": "Agency Retainer Cap ($10k - $15k/mo)", "desc": "A solo AAA or Content Studio maxes out at 5 to 6 clients ($12k–$15k/month) before needing to hire help."},
            {"title": "Creator Revenue-Share Upside ($10k - $50k+)", "desc": "Shadow Operating removes the capacity ceiling: 1 launch can generate $15,000 in a single week with zero additional client meetings."},
            {"title": "The Cash Flow Floor Strategy", "desc": "Anchor your baseline with 2 agency retainers ($4,000/month) to cover living costs, then pursue creator rev-shares for explosive upside."},
            {"title": "Compounding Software Equity", "desc": "Workflows built for one client can be abstracted into reusable blueprints, increasing your profit per hour on every subsequent project."}
        ],
        "Combine the steady floor of agency retainers with the asymmetric upside of creator revenue sharing.",
        diagram={
            "title": "Revenue Scaling & Capacity Architecture",
            "steps": [
                {"step": "01", "tech": "Hourly Work", "title": "Linear Cap", "desc": "Earnings strictly tied to physical hours worked.", "metric": "Max $4,000/mo"},
                {"step": "02", "tech": "Agency Retainers", "title": "Stable Floor", "desc": "4 retainers @ $2,500/mo. Predictable recurring cash.", "metric": "$10,000/mo"},
                {"step": "03", "tech": "Shadow Operator", "title": "Launch Multiplier", "desc": "1 creator launch (100 buyers @ $500). 30% operator share.", "metric": "$15,000/launch"},
                {"step": "04", "tech": "Hybrid Portfolio", "title": "Asymmetric Scale", "desc": "Stable retainers funding high-upside creator equity.", "metric": "$15k - $25k/mo"}
            ]
        }
    ),
    make_rich_slide(
        "s-013-4", 4, "MODULE 01 · LESSON 1.3",
        "Criteria #5: Stress Level & Operational Peace",
        "Evaluating the psychological cost and client urgency of each business model.",
        [
            {"title": "Mission-Critical API Stress (AAA: 4/5)", "desc": "If a client's lead webhook breaks on a Friday night, urgent troubleshooting is required to prevent missed sales."},
            {"title": "Subjective Creative Revision Stress (Content: 3/5)", "desc": "Dealing with client opinions on video colors, fonts, and pacing requires rigid revision boundaries to avoid frustration."},
            {"title": "Aligned Partnership Peace (Shadow Operating: 1.5/5)", "desc": "You and the creator share the same goal: sales. There are no angry hourly check-in calls or scope-creep disputes."},
            {"title": "The Peace-to-Profit Ratio", "desc": "True wealth is not just earning $10k+/month, but waking up without calendar dread, client emergencies, or high-stakes panic."}
        ],
        "Protect your peace of mind by establishing strict SLAs and choosing models that align incentives with your partners.",
        chart={
            "title": "Operational Stress Index Across Models",
            "data": [
                {"label": "Traditional Agency (15 Staff)", "value": "Stress Level: 5.0 / 5.0", "barPct": 100, "badge": "High Anxiety", "note": "Payroll liabilities, HR drama, rent commitments"},
                {"label": "AI Automation Agency (AAA)", "value": "Stress Level: 3.5 / 5.0", "barPct": 70, "badge": "API Reliability", "note": "Mission-critical uptime monitoring required"},
                {"label": "AI Content Studio", "value": "Stress Level: 3.0 / 5.0", "barPct": 60, "badge": "Creative Feedback", "note": "Requires rigid 48-hr revision approval gates"},
                {"label": "AI Shadow Operating", "value": "Stress Level: 1.5 / 5.0", "barPct": 30, "badge": "Aligned Partner", "note": "Pure performance upside, zero client friction"}
            ]
        }
    )
]

# Read m01_l3_written and m01_l4 from build_full_module1_and_2 text
with open('scripts/build_full_module1_and_2.py', 'r', encoding='utf-8') as f:
    text = f.read()

# Extract m01_l3_written
start_w3 = text.find('m01_l3_written = r"""')
end_w3 = text.find('"""\n\n# =========================================================================\n# LESSON 1.4')
m01_l3_written = text[start_w3 + len('m01_l3_written = r"""'):end_w3]

# Extract m01_l4_slides definition and written
start_s4 = text.find('m01_l4_slides = [')
start_w4 = text.find('m01_l4_written = r"""')
end_w4 = text.find('"""\n\nprint("Module 1 lessons 1.3 and 1.4 ready.")')
m01_l4_written = text[start_w4 + len('m01_l4_written = r"""'):end_w4]

# Also compile m01_l4_slides
m01_l4_slides = [
    make_rich_slide(
        "s-014-1", 1, "MODULE 01 · LESSON 1.4",
        "The Archetype Self-Diagnostic Matrix",
        "Matching your personality, technical foundation, and risk tolerance to the right business model.",
        [
            {"title": "The Systems Architect (AAA)", "desc": "Loves logic, flowcharts, APIs, and troubleshooting. Thrives on solving measurable business bottlenecks for established B2B firms."},
            {"title": "The Creative Producer (Content Studio)", "desc": "Has visual taste, understands hooks and storytelling pacing. Enjoys turning raw ideas into viral, high-retention vertical videos."},
            {"title": "The Shadow Strategist (Shadow Operating)", "desc": "Understands audience psychology, curriculum design, and sales funnels. Prefers partnering with influencers over managing clients."},
            {"title": "The Rule of Singular Commitment", "desc": "Trying to run all three models simultaneously guarantees operational collapse; commit 100% of your energy to one model for your first $10k milestone."}
        ],
        "Self-awareness is your highest-leverage asset; align your business model with your natural strengths rather than fighting your nature.",
        metrics=[
            {"label": "Systems Architect Match", "val": "AI Automation Agency", "note": "High B2B retainer stability"},
            {"label": "Creative Producer Match", "val": "AI Content Studio", "note": "Rapid client acquisition"},
            {"label": "Shadow Strategist Match", "val": "AI Shadow Operator", "note": "High asymmetric upside"},
            {"label": "Sprint Commitment", "val": "30 Unbroken Days", "note": "Zero model hopping"}
        ]
    ),
    make_rich_slide(
        "s-014-2", 2, "MODULE 01 · LESSON 1.4",
        "Capital & Tool Budget Prerequisites",
        "How to launch each model with under $100 in initial startup capital.",
        [
            {"title": "Zero Inventory or Hardware Costs", "desc": "All three models operate entirely in the cloud; a basic laptop and an internet connection are your only hardware requirements."},
            {"title": "AAA Startup Budget (~$50)", "desc": "Make.com Pro trial ($9) + OpenAI API credits ($20) + Google Workspace domain & email inbox ($12)."},
            {"title": "Content Studio Startup Budget (~$65)", "desc": "ElevenLabs Creator plan ($22) + Midjourney/Higgsfield ($30) + CapCut free tier ($0) + Loom ($12)."},
            {"title": "Shadow Operating Startup Budget (~$30)", "desc": "Notion Plus ($10) + Google Workspace ($12) + Skool (funded directly by the creator partner's card: $0 cost to you)."}
        ],
        "You do not need outside investment or personal savings to reach $10k/month; $65 in cloud tools is enough to sign your first client.",
        chart={
            "title": "Initial Startup Capital Required by Model",
            "data": [
                {"label": "AI Automation Agency (AAA)", "value": "$51 Total Startup Cost", "barPct": 25, "badge": "Make + OpenAI", "note": "Pay-as-you-go API consumption"},
                {"label": "AI Content Studio", "value": "$64 Total Startup Cost", "barPct": 32, "badge": "ElevenLabs + Video", "note": "Media synthesis tool licenses"},
                {"label": "AI Shadow Operator", "value": "$22 Total Startup Cost", "barPct": 11, "badge": "Notion + Email", "note": "Partner funds community software"}
            ]
        }
    ),
    make_rich_slide(
        "s-014-3", 3, "MODULE 01 · LESSON 1.4",
        "The 30-Day Focus Protocol",
        "Why multitasking between business models destroys momentum and guarantees zero deals.",
        [
            {"title": "The Illusion of Progress", "desc": "Spending 3 days tweaking an AAA scenario, 2 days generating AI images, and 2 days researching creators produces zero revenue."},
            {"title": "The Mastery Compound Curve", "desc": "Focusing exclusively on one model for 30 days builds deep domain fluency, reusable templates, and effortless sales confidence."},
            {"title": "The Proof-First Outreach Engine", "desc": "Send 5 hyper-targeted, value-first messages every business day (50 personalized teardowns in 10 business days) for your chosen model."},
            {"title": "The First Dollar Threshold", "desc": "Once you collect your first $2,500 retainer or launch payment, your belief shifts and scaling to $10,000/month becomes mechanical."}
        ],
        "Commit to one avatar, one offer, and one vehicle for 30 unbroken days; momentum compounds only through relentless consistency.",
        diagram={
            "title": "30-Day Operational Execution Path",
            "steps": [
                {"step": "01", "tech": "Days 1 - 7", "title": "Scaffolding", "desc": "Build demonstration asset: live Make.com scenario or 3-video sample portfolio.", "metric": "1 Demo Asset"},
                {"step": "02", "tech": "Days 8 - 14", "title": "Outbound Sprint", "desc": "Deliver 5 personalized 3-minute Loom teardowns or creator DMs daily.", "metric": "50 Touches"},
                {"step": "03", "tech": "Days 15 - 21", "title": "Discovery Calls", "desc": "Conduct 6 diagnostic consultations and present standardized proposals.", "metric": "6 Calls Booked"},
                {"step": "04", "tech": "Days 22 - 30", "title": "First Closes", "desc": "Sign first 2 retainers ($5k) or 1 creator partner ($15k target).", "metric": "$5k - $10k Closed"}
            ]
        }
    ),
    make_rich_slide(
        "s-014-4", 4, "MODULE 01 · LESSON 1.4",
        "The Hybrid Portfolio End-State",
        "How the three models synthesize into an untouchable, high-margin solo enterprise at scale.",
        [
            {"title": "The Retainer Anchor ($5,000 - $7,500/mo)", "desc": "2 to 3 AAA or Content Studio retainers provide predictable recurring cash flow that covers all living and operational expenses."},
            {"title": "The Creator Upside Engine ($15,000 - $30,000/qtr)", "desc": "1 to 2 shadow-operated creator launches per quarter provide massive six-figure financial accelerations."},
            {"title": "The Passive Backend ($2,000 - $4,000/mo)", "desc": "Ongoing 30% revenue share from recurring Skool community memberships compounds automatically with zero extra labor."},
            {"title": "Total Solopreneur Sovereignty", "desc": "A diversified solo portfolio generating $15,000 to $25,000/month with 95% net margins, zero employees, and complete location freedom."}
        ],
        "Start with one model, reach your $10,000/month milestone, and then synthesize the models into an untouchable solo enterprise.",
        metrics=[
            {"label": "Predictable Retainer Floor", "val": "$5,000 - $7,500/mo", "note": "2 - 3 B2B clients"},
            {"label": "Asymmetric Launch Windfalls", "val": "$15k - $30k / Qtr", "note": "Creator rev-share"},
            {"label": "Passive Community Backend", "val": "$2,500 - $4,000/mo", "note": "Skool memberships"},
            {"label": "Total Net Profit Margin", "val": "95%+", "note": "Zero employee payroll"}
        ]
    )
]

print("Loaded all 4 lessons of Module 1 successfully.")
