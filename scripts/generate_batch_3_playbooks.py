import json
import os
import re
from build_storytelling_helpers import (
    make_story_slide,
    build_narrative_written_lesson,
    COMMON_STORY_TESTIMONIALS_COURSE,
    COMMON_STORY_TESTIMONIALS_DETAIL,
    COMMON_STORY_FAQS
)
from generate_batch_3_configs import ALL_BATCH_3_PLAYBOOKS

def get_target_metric_batch_3(slug, title):
    if "100-000" in slug:
        return "$100,000 Liquid Savings"
    if "social-media" in slug:
        return "$20,000–$50,000/Month Net Profit & Enterprise Equity"
    if "service-based" in slug:
        return "$25,000+/Month ($300,000/Year Net Cash)"
    if "content-in-the-age-of-ai" in slug:
        return "Uncopyable Media Authority & Enterprise Value"
    if "catch-up" in slug:
        return "$100,000+ Liquid War Chest"
    if "perfect-business" in slug:
        return "$30,000–$50,000/Month 85% Net Margin Cashflow"
    if "use-ai-in-your-business" in slug:
        return "$25,000+/Month Autonomous Profit Engine"
    if "multiple-interests" in slug:
        return "$15,000–$30,000/Month Sovereign Polymath MRR"
    return "$10,000+/Month ($120,000+/Year)"

def generate_batch_3_playbook_files(pb):
    file_name = pb["file_name"]
    course_id = pb["course_id"]
    slug = pb["slug"]
    title = pb["title"]
    short_desc = pb["short_desc"]
    full_desc = pb["full_desc"]
    modules = pb["modules"]
    hours_of_material = pb["hours_of_material"]
    
    target_metric = get_target_metric_batch_3(slug, title)
    
    modules_output = []
    
    for m in modules:
        m_num = m["num"]
        m_title = m["title"]
        m_desc = m["desc"]
        lessons_list = []
        
        for l_id, l_num, l_title, l_dur in m["lessons"]:
            slides = [
                # Slide 1: The Inciting Incident
                make_story_slide(
                    f"s-{l_id}-1", 1,
                    f"ACT {m_num} // SCENE 01: THE INCITING INCIDENT",
                    f"The Conflict: {l_title}",
                    f"The collision between legacy assumptions and asymmetric execution inside {title}.",
                    f"Every breakthrough begins with a moment of disgust at the old, broken way of operating.",
                    [
                        {"number": "01", "title": "The Illusion of Effort", "description": f"99% of people believe grinding longer hours within a broken legacy vehicle produces wealth; inside {l_title}, we invert this premise entirely."},
                        {"number": "02", "title": "The Inciting Catalyst", "description": "A single sharp realization shatters the matrix: conventional linear labor trades irreplaceable life force for taxable, capped wages."},
                        {"number": "03", "title": "The Asymmetric Pivot", "description": f"By shifting from manual friction to engineered machine leverage, you position your operations for {target_metric}."},
                        {"number": "04", "title": "The Sovereign Decision", "description": "You choose radical focus over scattered experimentation, refusing to accept mediocre middle-class compromises."}
                    ],
                    diagram={
                        "title": f"Cinematic Story Arc: {l_title}",
                        "steps": [
                            {"step": "01", "title": "The Old Matrix", "desc": "Trapped in linear, low-leverage grind"},
                            {"step": "02", "title": "The Awakening", "desc": f"Dissecting the hidden mechanisms of {l_title}"},
                            {"step": "03", "title": "The Secret Weapon", "desc": "Deploying asymmetric tools & autonomous workflows"},
                            {"step": "04", "title": "The Sovereign Empire", "desc": f"Reaching dependable {target_metric}"}
                        ]
                    },
                    chart={
                        "title": "Trajectory Velocity: Conventional Grind vs. Sovereign Leverage",
                        "data": [
                            {"label": "Standard Linear Labor", "value": "12% Velocity", "barPct": 12, "badge": "High Friction"},
                            {"label": "Ad-Dependent Churn", "value": "34% Velocity", "barPct": 34, "badge": "Capital Burn"},
                            {"label": "Asymmetric Systems Engine", "value": "88% Velocity", "barPct": 88, "badge": "Exponential"},
                            {"label": "Autonomous Sovereign Cashflow", "value": "97% Velocity", "barPct": 97, "badge": "Pure Liberty"}
                        ]
                    }
                ),
                # Slide 2: The Turning Point
                make_story_slide(
                    f"s-{l_id}-2", 2,
                    f"ACT {m_num} // SCENE 02: THE TURNING POINT",
                    f"The Plot Twist: Breaking the Bottleneck",
                    f"How confronting the harsh reality of {l_title} forces the emergence of the proprietary protocol.",
                    "When the old vehicle fails under pressure, the true sovereign operator invents a frictionless path forward.",
                    [
                        {"number": "01", "title": "The Crisis Point", "description": "Most novices retreat to comfort when friction strikes; the true operator studies the failure mechanics."},
                        {"number": "02", "title": "The Proprietary Inversion", "description": f"Inverting conventional wisdom inside {l_title} turns your greatest competitive disadvantage into an unshakeable moat."},
                        {"number": "03", "title": "Cutting Dead Weight", "description": "Eliminating low-yield clients, noisy social distractions, and speculative distractions to preserve 100% cognitive velocity."},
                        {"number": "04", "title": "The 10x Paradigm Shift", "description": f"The breakthrough is never about doing 10x more work; it is about finding the single 10x lever inside {l_title}."}
                    ],
                    metrics=[
                        {"label": "Operating Net Margin", "val": "94.6%", "note": "Zero bloated staff payroll"},
                        {"label": "Target Capital Velocity", "val": target_metric.split()[0], "note": "Verified sovereign inflow"},
                        {"label": "Time to Validation", "val": "14 Days", "note": "High-conviction diagnostic sprint"},
                        {"label": "Sovereignty Score", "val": "10/10", "note": "Total geographic independence"}
                    ]
                ),
                # Slide 3: The Execution Climax
                make_story_slide(
                    f"s-{l_id}-3", 3,
                    f"ACT {m_num} // SCENE 03: THE EXECUTION CLIMAX",
                    f"The Battle Protocol: Tactical Execution",
                    f"The step-by-step operational machinery that converts {l_title} into bankable enterprise equity.",
                    "Execution is the ultimate filter. Talk is cheap; deployed code, media assets, and signed retainers build empires.",
                    [
                        {"number": "01", "title": "Frictionless Onboarding", "description": "Automating the entire client or customer pipeline so conversions happen without manual back-and-forth friction."},
                        {"number": "02", "title": "The Value-First Offer", "description": f"Structuring irresistible, high-conviction deliverables tailored specifically to the core mechanics of {l_title}."},
                        {"number": "03", "title": "The Speed-to-Lead Engine", "description": "Responding to opportunities in sub-60 seconds using background automations and autonomous intelligence."},
                        {"number": "04", "title": "Locking in Retention", "description": "Making your deliverable so indispensable that clients or users never consider cancelling."}
                    ],
                    diagram={
                        "title": f"The Production Engine: {l_title}",
                        "steps": [
                            {"step": "01", "title": "Inbound Signal", "desc": "Capturing high-intent market demand organically"},
                            {"step": "02", "title": "Value Conversion", "desc": "Deploying proof assets & automated teardowns"},
                            {"step": "03", "title": "Fulfillment Loop", "desc": "Delivering flawless outcomes with zero manual strain"},
                            {"step": "04", "title": "Compounding Cash", "desc": f"Directing profits to {target_metric}"}
                        ]
                    }
                ),
                # Slide 4: The Sovereign Payoff
                make_story_slide(
                    f"s-{l_id}-4", 4,
                    f"ACT {m_num} // SCENE 04: THE SOVEREIGN PAYOFF",
                    f"The Empire: Life on the Other Side",
                    f"The lasting transformation when the systems in {l_title} execute with effortless precision.",
                    "True wealth is not measured in luxury trinkets; it is measured in the radical autonomy to control your time completely.",
                    [
                        {"number": "01", "title": "Permanent Location Freedom", "description": "Operating your entire sovereign enterprise from a single laptop in London, Dubai, Tokyo, or Lisbon with zero borders."},
                        {"number": "02", "title": "Asynchronous Cash Inflows", "description": f"Waking up to verified Stripe and banking notifications that consistently hit your {target_metric} benchmark."},
                        {"number": "03", "title": "Cognitive Sovereignty", "description": "Eliminating alarm clocks, toxic bosses, and performative meetings forever from your daily calendar."},
                        {"number": "04", "title": "The Compounding Moat", "description": f"Every lesson, workflow asset, and strategic decision executed in {l_title} compounds your net worth forever."}
                    ],
                    chart={
                        "title": "Long-Term Net Worth Compounding Over 36 Months",
                        "data": [
                            {"label": "Month 01 (Foundation)", "value": "$5,000", "barPct": 10, "badge": "Ignition"},
                            {"label": "Month 06 (Momentum)", "value": "$35,000", "barPct": 30, "badge": "Velocity"},
                            {"label": "Month 12 (Scale)", "value": "$100,000", "barPct": 60, "badge": "Flywheel"},
                            {"label": "Month 36 (Sovereignty)", "value": "$500,000+", "barPct": 100, "badge": "Freedom"}
                        ]
                    }
                )
            ]
            
            cold_open = f"""Imagine stepping into a sunlit room overlooking the Mediterranean at 9:30 AM. Your phone sits on 'Do Not Disturb' across the room. No commuting traffic. No corporate politics. No panicked client calls. On your monitor is a clean Stripe and banking dashboard displaying verified deposits flowing in on complete autopilot: retainer confirmations, recurring software subscriptions, and high-margin partner wires.

This is not a motivational fantasy. This is the exact daily operating reality of operators who have unlocked the code of **{l_title}**.

Most people spend their entire lives believing the noble lie of the industrial complex: that if you just wake up early, put your head down, and grind for forty years at a desk, the system will eventually reward you with freedom. But when you look at the raw mathematical reality, that equation is broken. Inflation quietly eats 10% to 15% of your purchasing power every single year. Taxes cannibalize nearly half of every incremental dollar you earn. And worst of all, you are trading your only non-renewable asset—your finite, irreplaceable youth—for linear, taxable wages that barely keep pace with living costs.

To break out of that meat grinder, you need an asymmetric vehicle. You need to master **{l_title}** not as an academic exercise, but as an escape vehicle engineered to deliver {target_metric} with uncompromising net margins."""

            the_trap = f"""Why does 99% of the population remain trapped in financial mediocrity when modern digital tools provide universal access to infinite global distribution?

The answer lies in the **Sycophancy and Glamour Trap**:
1. **Chasing Flashy, Crowded Business Models**: Beginners constantly gravitate toward whatever model is trending on social media this week. Whether it is speculative crypto day-trading, oversaturated dropshipping stores selling cheap plastic widgets from overseas, or low-margin physical products with high chargeback rates, novices mistake popular hype for profitability. In reality, the most lucrative businesses are quiet, unsexy, and operate in total stealth with virtually zero competition.
2. **The High-Cost Status Signaling Trap**: The second fatal mistake occurs the moment an operator tastes their first $10,000 or $50,000 windfall. Instead of plowing that velocity capital back into liquid war chests or sovereign assets, they immediately lease expensive German cars, move into overpriced luxury apartments, and start buying designer clothes to project the illusion of wealth to strangers who do not care about them. Within three months, their monthly burn rate explodes, forcing them right back into a state of financial panic.
3. **The Absence of Operational Moats**: Treating business like a chaotic series of manual tasks rather than building repeatable, automated software and media machinery. If your business stops generating revenue the second you step away from your keyboard to sleep, you do not own a business—you own a high-stress, low-security job."""

            the_breakthrough = f"""To execute the master strategy of **{l_title}** with surgical precision, follow the four-phase operational blueprint below:

#### Phase 1: Environment Hardening & Monastic Focus
- Eliminate all digital noise. Quarantine your calendar into dedicated 90-minute deep work sprints. Block algorithmically manipulated feeds, doom-scrolling apps, and toxic peer groups that drain your creative velocity.
- Establish dedicated operating accounts with zero speculative balance mixing. Keep your business treasury isolated in tier-1 institutions with multi-currency reserves.

#### Phase 2: Asymmetric Value Architecture
- Identify high-pain operational bottlenecks in high-spending markets. Whether it is saving local businesses 20 hours of manual data entry a week, capturing high-intent B2B search queries, or deploying speed-to-lead qualification engines, ensure your value proposition is mathematically undeniable.
- Structure your offer with **Convex Asymmetry**: small downside (a few hours of focused setup) paired with uncapped, exponential upside (recurring {target_metric} cashflow or equity multipliers).

#### Phase 3: The Permission-Based Pull Funnel
- Never engage in desperate cold begging or spammy sales tactics. Command attention by publishing definitive proof-of-concept diagnostics, 3-minute video breakdowns, and detailed teardown case studies.
- When prospects see that you understand their operational bottlenecks better than they do, they stop treating you like a vendor and begin treating you like an indispensable strategic advisor.

#### Phase 4: Systems Automation & Autopilot Cashflow
- Connect the core engine to background automations using Make.com, Airtable, and custom generative AI prompt pipelines.
- Standardize your customer onboarding so that new buyers or clients receive instant access, automated documentation, and scheduled deliverables without requiring you to manually touch a single file."""

            battle_headers = ["Dimensional Axis", "The Amateur's Trap (Matrix Path)", "The Sovereign Protocol (Your Path)"]
            battle_rows = [
                ["Target Outcome", "Trading 60+ Hours for Linear Paycheck", f"Asynchronous Systems Yielding {target_metric}"],
                ["Customer Acquisition", "Begging with Generic Cold Spam", "Permission-Based Teardowns & Pull Media"],
                ["Overhead & Margin", "Bloated Teams & 25% Thin Margins", "Zero Full-Time Staff & 94%+ Net Margins"],
                ["Execution Cadence", "Scattered Chaos & Distraction", "90-Minute Daily Monastic Deep Work Sprint"],
                ["Geographic Freedom", "Tethered to a Single Office or City", "100% Sovereign Global Location Independence"]
            ]

            financial_math = f"""The financial mechanics behind reaching **{target_metric}** are governed by cold, disciplined unit economics rather than hopeful optimism:

- **The Capital Compounding Engine**:
  - Target Sovereign Milestone: **{target_metric}**
  - **Unit Scenario A (High-Ticket B2B Retainers)**: Exactly 10 clients @ $2,500/month on automated maintenance and growth agreements = $25,000/month recurring revenue.
  - **Unit Scenario B (Productized Digital Holding)**: 150 members @ $197/month in an exclusive mastermind or SaaS tool = $29,550/month MRR with under 5 hours of weekly fulfillment.
  - **Unit Scenario C (Velocity Capital Arbitrage)**: Flipping or brokering 4 high-yield assets monthly netting $6,250 profit per cycle = $25,000/month cash inflow.
  - **Monthly Operational Software Overhead**:
    - Cloud Infrastructure & API Tokens: ~$65/month
    - Domain, Hosting & SSL Security: ~$25/month
    - Stripe & Payment Processing: 2.9% per transaction
    - **Total Net Profit Margin: 94.6% ($23,500+ Take-Home Monthly Net Cash)**

- **The 36-Month Capital Compounding Curve**:
  - By strictly maintaining a flat personal cost of living and banking $15,000+ in surplus cashflow every month, you accumulate **$180,000 in liquid capital in your first 12 months**.
  - Reinvesting this war chest into cashflow-generating real estate, hard sovereign gold, and private high-yield treasury debt compounds your trajectory into an undeniable multi-million-dollar family estate."""

            failure_scenarios = [
                ["Premature Scaling & Staffing", "Ego-driven hiring of unnecessary full-time employees", "Enforce the Zero-Employee Rule: Automate with AI and code before ever hiring human staff."],
                ["Lifestyle Inflation Poisoning", "Upgrading cars and apartments the moment cash hits", "Mandate an unbreakable 12-Month Expense Quarantine: Live strictly on $3,500/mo regardless of income."],
                ["Context & Focus Fragmentation", "Attempting to launch 3 side hustles simultaneously", "Execute the Rule of One: 1 Vehicle, 1 Offer, 1 Channel until you cross $10,000/Month."],
                ["Client Scope Creep Vulnerability", "Allowing clients to demand unpaid custom tasks", "Deploy ironclad Service Level Agreements (SLAs) with strict boundaries and automated billing."]
            ]

            action_directive = f"""Within the next 24 hours, execute this four-step tactical sequence:
1. **Audit Your Current Time Allocation**: Print your last 7 days of screen time. Ruthlessly delete any application or feed that does not directly contribute to building your sovereign enterprise.
2. **Select Your Primary Vehicle**: Commit 100% to the core mechanism taught in **{l_title}**. Write your commitment down on physical paper and place it on your desk.
3. **Draft Your Minimum Viable Asset**: Create the first iteration of your proof-of-concept diagnostic, video audit script, or software arbitrage portal today. Do not wait for perfection; deploy for speed.
4. **Initiate 5 High-Signal Outreach Touchpoints**: Send five value-first, diagnostic communications to prospective buyers or partners using the exact scripts provided in this lesson."""

            mantras = [
                ("Leverage Trumps Effort", "Working 14 hours in a broken vehicle creates exhaustion; working 90 minutes in an asymmetric vehicle creates generational wealth."),
                ("Defend The War Chest", "Your net worth is not what flows through your bank account; it is what remains protected in liquid sovereign reserves."),
                ("Move in Absolute Silence", "Real wealth is invisible. While amateurs flash leased sports cars, the true titan controls enterprise cashflow without drawing attention."),
                ("The First Million is The Threshold", f"Break through the gravitational pull of the matrix once with {title}, and every subsequent million becomes ten times easier.")
            ]
            
            written = build_narrative_written_lesson(
                m_num, m_title, l_num, l_title,
                cold_open, the_trap, the_breakthrough,
                battle_headers, battle_rows,
                financial_math, failure_scenarios,
                action_directive, mantras
            )
            
            lessons_list.append({
                "id": l_id,
                "number": l_num,
                "title": l_title,
                "duration": f"{l_dur} min",
                "summary": f"Act {m_num} \u00b7 Scene {l_num}: Deep dive into {l_title}. Master the technical mechanics, battle decision matrix, unit economics, and 24-hour action directive.",
                "slides": slides,
                "learningObjective": f"Master the tactical implementation of {l_title}, deploy the sovereign protocol, and execute with zero employee payroll.",
                "writtenLesson": written,
                "takeaway": f"Eliminate manual friction; execute {l_title} with uncompromising speed, precision, and sovereign leverage."
            })
            
        modules_output.append({
            "id": f"m-{m_num}",
            "number": m_num,
            "title": m_title,
            "subtitle": f"Act {m_num} \u00b7 4 Scenes",
            "description": m_desc,
            "duration": f"{sum(l[3] for l in m['lessons'])} min",
            "lessonsCount": len(lessons_list),
            "lessons": lessons_list
        })
        
    export_prefix = re.sub(r'[^a-zA-Z0-9]+', '_', file_name).upper()
    
    # 1. Output Data File
    data_content = f"""import type {{ Course, Module, Lesson }} from "../playbooks-data";

export const {export_prefix}_MODULES: Module[] = {json.dumps(modules_output, indent=2)};

export const {export_prefix}_COURSE: Course = {{
  id: {json.dumps(course_id)},
  slug: {json.dumps(slug)} as any,
  categorySlug: "ai-businesses",
  categoryName: "AI Businesses",
  title: {json.dumps(title)},
  shortTitle: {json.dumps(title[:30])},
  audience: "Beginners, Freelancers & Aspiring Entrepreneurs" as any,
  targetGender: "for-all" as any,
  headline: {json.dumps(short_desc)},
  subheadline: {json.dumps(short_desc)},
  description: {json.dumps(full_desc)},
  price: 3,
  originalPrice: 9,
  currency: "USD",
  badge: {json.dumps(pb["badge"])},
  rating: {pb["rating"]},
  ratingCount: {pb["rating_count"]},
  hoursOfMaterial: "{hours_of_material}",
  slidesCount: {len(modules_output) * 16},
  modulesCount: {len(modules_output)},
  lessonsCount: {len(modules_output) * 4},
  primaryColor: "#0f172a",
  accentColor: "#f59e0b",
  outcomes: [
    "Master the complete end-to-end framework and operational workflows for {title}",
    "Execute tactical customer acquisition and high-converting offer packaging without burning capital on ads",
    "Deploy autonomous software systems, AI pipelines, and lean digital infrastructure",
    "Build a predictable, high-margin cash engine targeting {target_metric} with zero employee overhead"
  ],
  modules: {export_prefix}_MODULES,
  testimonials: {json.dumps(COMMON_STORY_TESTIMONIALS_COURSE, indent=2)},
  faqs: {json.dumps(COMMON_STORY_FAQS, indent=2)}
}};

// Backwards-compatible aliases
export const {export_prefix}_DATA = {export_prefix}_COURSE;
"""

    data_path = os.path.join("src", "lib", "playbooks", f"{file_name}-data.ts")
    with open(data_path, "w", encoding="utf-8") as f:
        f.write(data_content)
    print(f"Generated data: {data_path}")
    
    # 2. Output Detail File
    detail_content = f"""import type {{ PlaybookDetailData }} from "../dating-playbook-detail";
import {{ {export_prefix}_MODULES }} from "./{file_name}-data";

export const {export_prefix}_DETAIL_DATA: PlaybookDetailData = {{
  id: {json.dumps(course_id)},
  slug: {json.dumps(slug)},
  title: {json.dumps(title)},
  headline: {json.dumps(short_desc)},
  description: {json.dumps(full_desc)},
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: {json.dumps(pb["badge"])},
  rating: {pb["rating"]},
  ratingCount: {pb["rating_count"]},
  studentsCount: "{pb["students"]}",
  instructorName: "Plugd Systems Architect",
  instructorTitle: "Principal Sovereign Operator & Systems Architect",
  instructorBio: "Advising ambitious solopreneurs, digital architects, and agency operators on deploying high-margin autonomous systems, high-ticket services, and sovereign digital holding companies.",
  instructorRating: {pb["rating"]},
  instructorReviews: "{pb["rating_count"]}",
  instructorStudents: "{pb["students"]}",
  instructorCourses: 6,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "{hours_of_material}",
  modulesCount: {len(modules_output)},
  lessonsCount: {len(modules_output) * 4},
  slidesCount: {len(modules_output) * 16},
  whatYouWillLearn: [
    "Deconstruct and master the exact operational mechanics of {title}",
    "Deploy high-margin no-code software systems, AI pipelines, and automated client workflows",
    "Acquire high-ticket clients and customers organically with zero ad spend using diagnostic teardowns",
    "Structure irresistible, high-conviction offers that command premium upfront retainers",
    "Establish ironclad operational routines that prevent burnout and eliminate manual friction",
    "Build a diversified, untouchable sovereign enterprise yielding {target_metric} with zero employees"
  ],
  relatedTopics: [
    "AI Businesses",
    "Solopreneurship",
    "High-Ticket Retainers",
    "No-Code Automation",
    "Zero Ad Customer Acquisition",
    "Sovereign Cashflow"
  ],
  requirements: [
    "A computer with an internet connection and modern web browser",
    "Commitment to execute the 90-minute daily monastic deep work sprints",
    "Zero coding, programming, or previous business experience required"
  ],
  descriptionSections: {{
    intro: [
      "Welcome to the definitive masterclass on {title}. This playbook is engineered for ambitious operators who refuse to accept linear employment, corporate busywork, and fragile business models.",
      "Rather than teaching fleeting hacks or superficial theories, this curriculum delivers battle-tested systems, worked unit economics, tactical battle decision matrices, and complete production-grade blueprints.",
      "Every single lesson provides both an interactive, cinematic slide deck presentation and a comprehensive, in-depth written guide (>2,500 words) detailing the exact step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
{chr(10).join(f'      "Act {m["number"]}: {m["title"]}",' for m in modules_output)}
    ],
    closing: [
      "Every lesson is designed for immediate tactical execution, complete with 24-hour action directives and sovereign battle matrices.",
      "Join thousands of operators worldwide who have deployed these exact systems to reclaim their cognitive freedom, geographic autonomy, and financial independence."
    ]
  }},
  targetAudience: {json.dumps(pb["target_audience"], indent=4)},
  includes: [
    {{ iconName: "layers", text: "{len(modules_output)} Structured Acts & {len(modules_output) * 4} Cinematic Production Lessons" }},
    {{ iconName: "presentation", text: "{len(modules_output) * 16} Visual Presentation Slides & {len(modules_output) * 4} In-Depth Written Guides" }},
    {{ iconName: "video", text: "Ready-to-Deploy Automation Blueprints, Diagnostic Outreach Scripts & SOPs" }},
    {{ iconName: "file-text", text: "High-Ticket Client Service Level Agreements & Risk-Reversal Contracts" }},
    {{ iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" }},
    {{ iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }}
  ],
  modules: {export_prefix}_MODULES.map((mod) => ({{
    id: mod.id,
    number: mod.number,
    title: mod.title,
    description: mod.description,
    duration: mod.duration,
    lessonsCount: mod.lessons.length,
    lessons: mod.lessons.map((les, idx) => ({{
      id: les.id,
      number: les.number,
      title: les.title,
      duration: les.duration,
      isPreview: idx === 0,
    }})),
  }})),
  testimonials: {json.dumps(COMMON_STORY_TESTIMONIALS_DETAIL, indent=2)},
  faqs: {json.dumps(COMMON_STORY_FAQS, indent=2)}
}};

// Backwards-compatible aliases
export const {export_prefix}_DATA = {export_prefix}_DETAIL_DATA;
"""

    detail_path = os.path.join("src", "lib", "playbooks", f"{file_name}-detail.ts")
    with open(detail_path, "w", encoding="utf-8") as f:
        f.write(detail_content)
    print(f"Generated detail: {detail_path}")

for pb in ALL_BATCH_3_PLAYBOOKS:
    generate_batch_3_playbook_files(pb)

print("Batch 3 generation complete!")
