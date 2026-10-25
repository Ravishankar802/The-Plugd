import json
import os
import sys

sys.path.append(os.path.dirname(__file__))
from slide_builder import make_rich_slide
from generate_content_1_v2 import m01_l1_slides, m01_l1_written, m01_l2_slides, m01_l2_written

# LESSON 1.3
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

# (m01_l3_written is defined in build_full_module1_and_2 or imported)
from build_full_module1_and_2 import m01_l3_written, m01_l4_slides, m01_l4_written

MODULE_01 = [
    {
        "id": "01-1", "number": "1.1", "title": "The Death of the 20-Person Agency & The Solopreneur Advantage",
        "duration": "14m",
        "summary": "Understand how AI and visual automation allow a solo operator to produce the output of an 8-person agency while keeping 95%+ net profit margins.",
        "learningObjective": "Analyze the structural collapse of high-overhead traditional agencies, compare net take-home margins, and master the 4 cornerstones of solo operational sovereignty.",
        "takeaway": "Stop measuring business success by headcount; true modern leverage is maximizing net take-home profit with zero employee payroll.",
        "slides": m01_l1_slides, "writtenLesson": m01_l1_written
    },
    {
        "id": "01-2", "number": "1.2", "title": "The $10,000+/Month Unit Economics Model: Math, Margins & Offer Architecture",
        "duration": "15m",
        "summary": "Deconstruct the exact mathematical pathways to $10,000/month: comparing client retainers, setup fees, and revenue-share splits with realistic margins and cost structures.",
        "learningObjective": "Master the rigorous unit economics required to net $10,000+/month, evaluate 4 distinct pricing models, and maintain an audited monthly software overhead under $250.",
        "takeaway": "Stop searching for complex financial models; $10k/month is a simple math equation: 4 retainers at $2,500 or 1 high-leverage creator launch.",
        "slides": m01_l2_slides, "writtenLesson": m01_l2_written
    },
    {
        "id": "01-3", "number": "1.3", "title": "The 5-Criteria Business Evaluation Framework",
        "duration": "15m",
        "summary": "Evaluate any AI business opportunity using Difficulty, Time Intensity, Scalability, Income Potential, and Stress Level before writing a single line of code.",
        "learningObjective": "Deploy the 5-dimensional scoring matrix across AAA, Content Studios, and Shadow Operating to objectively select the highest-ROI model for your personal profile.",
        "takeaway": "Never choose a business model based on hype; score every opportunity across Difficulty, Time, Scalability, Income, and Stress.",
        "slides": m01_l3_slides, "writtenLesson": m01_l3_written
    },
    {
        "id": "01-4", "number": "1.4", "title": "Selecting Your Ideal AI Model: Skills, Capital & Risk Alignment",
        "duration": "14m",
        "summary": "Map your technical skills, capital constraints, and risk tolerance to the ideal business archetype, and commit to a single model for 30 days.",
        "learningObjective": "Diagnose your solopreneur archetype, launch with under $70 in startup tools, and execute a 30-day focus protocol to sign your first paying client.",
        "takeaway": "Commit to one avatar, one offer, and one vehicle for 30 unbroken days; momentum compounds only through relentless consistency.",
        "slides": m01_l4_slides, "writtenLesson": m01_l4_written
    }
]

print("module1_data created with 4 lessons.")
