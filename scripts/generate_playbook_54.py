import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from build_storytelling_helpers import (
    make_story_slide,
    build_narrative_written_lesson,
    COMMON_STORY_TESTIMONIALS_COURSE,
    COMMON_STORY_TESTIMONIALS_DETAIL,
    COMMON_STORY_FAQS
)

CONFIG_54 = {
    "id": "ai-businesses-54",
    "slug": "if-i-wanted-to-become-a-millionaire-in-2026-this-is-what-id-do-full-blueprint",
    "title": "If I Wanted To Become a Millionaire in 2026, This Is What I'd Do",
    "headline": "The definitive step-by-step master execution blueprint to build an unassailable seven-figure net worth in 2026 using modern leverage and asymmetric systems.",
    "description": "A comprehensive operational masterclass breaking down the exact modern mechanics of wealth: mastering asymmetric skills, engineering high-ticket irresistible offers, deploying the Rule of 100 acquisition engine, scaling productized operations, and defending capital into a permanent $1,000,000 fortress.",
    "hoursOfMaterial": "8.5 hours",
    "badge": "Hot & New",
    "rating": 4.9,
    "ratingCount": 1680,
    "modules": [
        {
            "number": 1,
            "title": "The 2026 Economic Landscape & The 4 Leverage Levers",
            "description": "Understanding the macroeconomic shifts of 2026 and mastering the four fundamental forms of asymmetric leverage: labor, capital, code, and media.",
            "lessons": [
                {"number": 1, "title": "The Macroeconomic Shift: Why Traditional Linear Labor is Obsolete"},
                {"number": 2, "title": "The 4 Forms of Leverage: Labor, Capital, Code & Media"},
                {"number": 3, "title": "The Volume-to-Skill Equation: Repetition as Wealth Generation"},
                {"number": 4, "title": "Eliminating Friction Points: The Zero-Waste Calendar Audit"}
            ]
        },
        {
            "number": 2,
            "title": "Selecting High-Demand Asymmetric Skills for 2026",
            "description": "Identifying high-barrier, recession-proof skills that enterprises desperately pay top-tier retainers to solve.",
            "lessons": [
                {"number": 1, "title": "The Rule of Asymmetry: High-Barrier vs. Low-Barrier Skills"},
                {"number": 2, "title": "B2B Pain Diagnosis: Isolating Expensive Corporate Inefficiencies"},
                {"number": 3, "title": "The Modern Tech Stack: Deploying AI & Autonomous Workflows"},
                {"number": 4, "title": "The 30-Day Skill Stacking Sprint: Becoming Irreplaceable"}
            ]
        },
        {
            "number": 3,
            "title": "Constructing the Irresistible High-Ticket Offer",
            "description": "Engineering high-conviction agreements that maximize perceived likelihood of achievement and eliminate buyer friction.",
            "lessons": [
                {"number": 1, "title": "The Value Equation: Dream Outcomes & Perceived Likelihood"},
                {"number": 2, "title": "Reversing Operational Risk: Performance Contracts & Skin-in-the-Game"},
                {"number": 3, "title": "Premium Pricing Psychology: Why Higher Prices Enhance Delivery"},
                {"number": 4, "title": "The 1-Page Offer Memo: Packaging Your Outcome Cleanly"}
            ]
        },
        {
            "number": 4,
            "title": "The Core Acquisition Engine: The Rule of 100",
            "description": "Deploying the daily non-negotiable volume requirement across organic outreach, diagnostic audits, and high-converting conversations.",
            "lessons": [
                {"number": 1, "title": "The Rule of 100: Daily High-Signal Outreach vs. Passive Hope"},
                {"number": 2, "title": "Organic Value Teardowns: Securing Clients via Diagnostic Audits"},
                {"number": 3, "title": "The Pilot-to-Retainer Protocol: Risk-Free Proof of Concept"},
                {"number": 4, "title": "High-Ticket Consultative Sales: Diagnosis Over Pressure"}
            ]
        },
        {
            "number": 5,
            "title": "Scaling Beyond Yourself: Systems, Delegation & SOPs",
            "description": "Transitioning from solo operator to systems architect by documenting tacit knowledge and delegating fulfillment.",
            "lessons": [
                {"number": 1, "title": "The Document-Then-Delegate SOP Pipeline: Capturing Tacit Skill"},
                {"number": 2, "title": "The Autonomous Operations Flywheel: Cloud & Software Pipelines"},
                {"number": 3, "title": "Hiring High-Performance Offshore Operators for Under $10/Hour"},
                {"number": 4, "title": "Client Delivery Governance: Protecting 95%+ Retention Rates"}
            ]
        },
        {
            "number": 6,
            "title": "The Productized Transition & Enterprise Equity",
            "description": "Transforming bespoke services into standardized productized assets and compounding digital media distribution.",
            "lessons": [
                {"number": 1, "title": "From Custom Chaos to Standardized Productized Lines"},
                {"number": 2, "title": "Recurring Revenue Retainers vs. One-Off Cash Traps"},
                {"number": 3, "title": "Building Media Distribution: Owning Organic Inbound Channels"},
                {"number": 4, "title": "The Software & Digital Asset Layer: Zero Marginal Cost Cash"}
            ]
        },
        {
            "number": 7,
            "title": "The $1M Wealth Accumulation & Defense Protocol",
            "description": "Guarding against lifestyle creep, optimizing corporate tax entities, and systematically compounding surplus net earnings.",
            "lessons": [
                {"number": 1, "title": "The Monastic Wealth Defense Rule: Capping Lifestyle Inflation at 15%"},
                {"number": 2, "title": "Tax Optimization & Entity Architecture for Seven-Figure Operators"},
                {"number": 3, "title": "The Systematic Capital Sweep: Channeling Cash Into Compounding Assets"},
                {"number": 4, "title": "Protecting the War Chest: Liquidity, Insurance & Downside Hedging"}
            ]
        },
        {
            "number": 8,
            "title": "The 365-Day Millionaire Execution Protocol",
            "description": "The exact quarterly execution cadence and daily operating rhythm to hit the seven-figure milestone within 12 to 24 months.",
            "lessons": [
                {"number": 1, "title": "Quarterly Milestone Decomposition: The Mathematical Execution Path"},
                {"number": 2, "title": "The Anti-Distraction Shield: Navigating the Murky Middle Plateau"},
                {"number": 3, "title": "Transitioning From Tactical Grinder to Sovereign Capital Allocator"},
                {"number": 4, "title": "The Permanent Blueprint: Your Daily Non-Negotiable Rituals"}
            ]
        }
    ]
}

def generate_playbook_54():
    pb = CONFIG_54
    slug = pb["slug"]
    file_name = "become-millionaire-2026-full-blueprint"
    export_prefix = "BECOME_MILLIONAIRE_2026_BLUEPRINT"
    course_id = pb["id"]
    title = pb["title"]
    short_desc = pb["headline"]
    full_desc = pb["description"]
    hours_of_material = pb["hoursOfMaterial"]
    modules = pb["modules"]
    target_metric = "$1,000,000 Sovereign Liquid Net Worth"
    badge = pb["badge"]
    rating = pb["rating"]
    rating_count = pb["ratingCount"]
    
    modules_output = []
    
    for m in modules:
        m_num = f"{m['number']:02d}"
        m_title = m["title"]
        m_desc = m["description"]
        lessons_list = []
        
        for l in m["lessons"]:
            l_num = f"{m_num}.{int(l['number'])}"
            l_id = f"{m_num}-{int(l['number'])}"
            l_title = l["title"]
            l_dur = 18
            
            slides = [
                # Slide 1: The Inciting Incident
                make_story_slide(
                    f"s-{l_id}-1", 1,
                    f"ACT {m_num} // SCENE 01: THE INCITING INCIDENT",
                    f"The Conflict: {l_title}",
                    f"The collision between traditional linear assumptions and modern seven-figure leverage inside {title}.",
                    f"Linear effort caps your lifespan; asymmetric systems and the Rule of 100 within {l_title} engineer true velocity.",
                    [
                        {"number": "01", "title": "The Linear Trap", "description": "Trading hours for wages or basic freelance rates guarantees taxable exhaustion; wealth is created by owning asymmetric distribution and productized leverage."},
                        {"number": "02", "title": "The Asymmetric Wakeup", "description": "The difference between struggling at $3,000/month and commanding $50,000/month is not hours worked; it is the leverage multiplier of your vehicle."},
                        {"number": "03", "title": "The Modern Blueprint Shift", "description": f"By mastering the operational protocols inside {l_title}, you position your enterprise directly on the path to {target_metric}."},
                        {"number": "04", "title": "Unrelenting Volume", "description": "You abandon the fantasy of passive luck and commit to non-negotiable daily execution across acquisition and delivery."}
                    ],
                    diagram={
                        "title": f"Cinematic Story Arc: {l_title}",
                        "steps": [
                            {"step": "01", "title": "The Linear Hamster Wheel", "desc": "Capped by finite physical hours"},
                            {"step": "02", "title": "The Strategic Awakening", "desc": f"Deconstructing the leverage mechanics of {l_title}"},
                            {"step": "03", "title": "The Asymmetric Engine", "desc": "Deploying the Rule of 100 & delegation SOPs"},
                            {"step": "04", "title": "The $1M Sovereign Fortress", "desc": f"Securing your permanent {target_metric}"}
                        ]
                    },
                    chart={
                        "title": "Capital Velocity: Linear Employment vs. Sovereign Leverage Blueprint",
                        "data": [
                            {"label": "Standard Hourly Job", "value": "11% Velocity", "barPct": 11, "badge": "High Friction"},
                            {"label": "Unsystematized Agency", "value": "36% Velocity", "barPct": 36, "badge": "Overhead Heavy"},
                            {"label": "High-Ticket Productized Model", "value": "86% Velocity", "barPct": 86, "badge": "High Margin"},
                            {"label": "Seven-Figure Sovereign Asset", "value": "99% Velocity", "barPct": 99, "badge": "Total Liberty"}
                        ]
                    }
                ),
                # Slide 2: The Turning Point
                make_story_slide(
                    f"s-{l_id}-2", 2,
                    f"ACT {m_num} // SCENE 02: THE TURNING POINT",
                    f"The Plot Twist: Breaking the Ceiling",
                    f"How confronting operational bottlenecks in {l_title} forces the emergence of proprietary leverage.",
                    "When linear capacity maxes out, the true sovereign builder creates standard operating procedures, offshore pods, and automated pipelines.",
                    [
                        {"number": "01", "title": "The Crisis of Capacity", "description": "Every successful operator hits a wall where more work equals less sleep; the amateur burns out, while the architect installs leverage."},
                        {"number": "02", "title": "The Proprietary Standard", "description": f"Packaging {l_title} into documented, repeatable execution checklists allows external operators to deliver superior client outcomes."},
                        {"number": "03", "title": "Eliminating Drag", "description": "Pruning low-margin clients, unnecessary meetings, and low-leverage distractions to safeguard 100% executive focus."},
                        {"number": "04", "title": "The 10x Paradigm Shift", "description": f"Exponential growth is never about working 10x harder; it is about finding the single 10x leverage point within {l_title}."}
                    ],
                    metrics=[
                        {"label": "Target Operating Margin", "val": "91.8%", "note": "Zero bloated office lease or payroll"},
                        {"label": "Run-Rate Velocity", "val": "$83,333/Mo", "note": "$1,000,000/year annual run rate"},
                        {"label": "Acquisition Velocity", "val": "100 Units/Day", "note": "Unrelenting daily pipeline inputs"},
                        {"label": "Sovereign Independence", "val": "10/10", "note": "100% calendar & spatial autonomy"}
                    ]
                ),
                # Slide 3: The Execution Climax
                make_story_slide(
                    f"s-{l_id}-3", 3,
                    f"ACT {m_num} // SCENE 03: THE EXECUTION CLIMAX",
                    f"The Battle Protocol: Tactical Execution",
                    f"The exact 4-stage operational sequence to implement {l_title} with military precision.",
                    "Execution is binary: either you rigorously execute the blueprint, or you surrender to economic mediocrity.",
                    [
                        {"number": "01", "title": "Phase 1: Diagnostic Teardown", "description": f"Identify the acute, high-value problem within {l_title} and formulate an airtight baseline diagnostic."},
                        {"number": "02", "title": "Phase 2: High-Conviction Offer Lock", "description": "Structure the offer with performance guarantees, dramatic risk reversal, and upfront capital collection."},
                        {"number": "03", "title": "Phase 3: The Rule of 100 Outbound Engine", "description": "Execute 100 high-signal outreach actions or content units every 24 hours to guarantee predictable lead velocity."},
                        {"number": "04", "title": "Phase 4: Sovereign Scaling Lock", "description": f"Funnel surplus operating earnings directly into compounding assets, locking in your trajectory toward {target_metric}."}
                    ],
                    diagram={
                        "title": f"Tactical Execution Architecture: {l_title}",
                        "steps": [
                            {"step": "01", "title": "Audit Vector", "desc": "Identify single constraint"},
                            {"step": "02", "title": "Engineer Offer", "desc": "Deploy risk-reversed pricing"},
                            {"step": "03", "title": "Rule of 100", "desc": "Execute relentless outbound"},
                            {"step": "04", "title": "Sweep Profits", "desc": "Fund compounding $1M fortress"}
                        ]
                    }
                ),
                # Slide 4: The Sovereign Payoff
                make_story_slide(
                    f"s-{l_id}-4", 4,
                    f"ACT {m_num} // SCENE 04: THE SOVEREIGN PAYOFF",
                    f"The Resolution: Cumulative $1M Dominance",
                    f"The permanent independence, asset equity, and peace of mind forged through mastering {l_title}.",
                    f"You have permanently broken free from the linear trap; your operational infrastructure now generates {target_metric} with clockwork predictability.",
                    [
                        {"number": "01", "title": "Unassailable Equity Moat", "description": "You now control proprietary distribution funnels, high-converting offer structures, and automated delivery pipelines that competitors cannot duplicate."},
                        {"number": "02", "title": "Absolute Temporal Freedom", "description": "Your calendar belongs entirely to you; zero client fires, zero pointless meetings, and complete control over your daily focus."},
                        {"number": "03", "title": "Liquid War Chest Reserves", "description": f"Net operating profits convert directly into sovereign compounding instruments, ensuring permanent financial resilience."},
                        {"number": "04", "title": "The Master Allocator Seat", "description": f"With {l_title} systematized, you step permanently into the role of principal strategic architect."}
                    ],
                    chart={
                        "title": "Compounding Capital Velocity Over 24 Months",
                        "data": [
                            {"label": "Months 1-3 (Skill & Offer Proof)", "value": "$25,000 Total", "barPct": 15, "badge": "Validation"},
                            {"label": "Months 4-8 (Rule of 100 Engine)", "value": "$110,000 Total", "barPct": 40, "badge": "Inflection"},
                            {"label": "Months 9-16 (Systems & Productization)", "value": "$420,000 Total", "barPct": 75, "badge": "Acceleration"},
                            {"label": "Months 17-24 (The $1M Fortress)", "value": "$1,000,000+ Net", "barPct": 100, "badge": "Domination"}
                        ]
                    }
                )
            ]
            
            # Written Lesson Generation
            cold_open = f"""Imagine standing at the threshold of 2026. On one path lies the traditional path of linear employment, corporate busywork, inflationary erosion, and taxable exhaustion—where trading finite hours for an incremental paycheck keeps you permanently trapped on a financial hamster wheel. On the other path—the exact reality engineered inside **{title}**—you deploy modern leverage, asymmetric digital skill sets, and the relentless Rule of 100 acquisition engine to build an untouchable enterprise that compounds into **{target_metric}**.

This lesson—**{l_title}**—is the architectural cornerstone of that transformation. We will dismantle the cultural myths that keep 99% of people broke, rebuild the mathematical mechanics of high-ticket value creation, and equip you with a battle-tested protocol you can deploy within the next 24 hours."""

            the_trap = f"""The fatal mistake made by 99% of aspiring operators when pursuing seven-figure wealth in 2026 is treating business as an incremental extension of a job. They ask: *'How many hours must I work today to make money?'* This reveals an employee mindset that is economically terminal in the modern era. When your income is tied to personal physical labor, you face mathematical constraints: you only have 24 hours in a day, your energy depletes, and progressive taxes aggressively erode active earnings.

Furthermore, amateurs fall into the trap of complexity theatre. They spend months deliberating over branding colors, debating corporate jurisdictions, or building fancy landing pages before validating whether a single economic decision-maker will write them a check. They mistake motion for forward progress. The market does not care about your website; it only cares whether you can solve an urgent, painful, high-dollar problem with speed, certainty, and minimal effort on their part."""

            the_breakthrough = f"""The breakthrough occurs the moment you recognize that wealth is never generated through sweat; it is generated through the strategic ownership of leveraged assets. By combining high-barrier digital skills, risk-reversed high-ticket offers, and autonomous software pipelines, you permanently decouple your earnings from your finite lifespan.

Within {l_title}, we execute the Sovereign Operator Paradigm. Instead of chasing hundreds of low-paying micro-transactions or competing on price on commoditized freelancer boards, you identify acute corporate bottlenecks and present irresistible, guaranteed solutions. You don't sell your time; you sell an engineered outcome backed by proof and algorithmic certainty. This is how lean operators generate over $80,000/month while maintaining a 90%+ net operating margin."""

            battle_headers = ["Strategic Vector", "The Amateur / Broke Mindset", "The Sovereign $1M Operator"]
            battle_rows = [
                ["Unit Economics", "Trades 1 hour for $30-$100 (Taxed at highest marginal rate)", "Builds self-sustaining assets generating infinite leverage and high net margins"],
                ["Operating Overhead", "Signs long-term commercial leases and hires bloated payroll", "Maintains 90%+ net margins with zero employees using modular software"],
                ["Customer Acquisition", "Burns cash on cold Facebook ads with negative initial ROI", "Executes the Rule of 100: 100 high-signal organic diagnostic audits daily"],
                ["Work Rhythm", "Tethered to 9-to-5 synchronous Zoom calls and Slack notifications", "Executes 90-minute daily deep work sprints; rest of day is 100% autonomous"],
                ["Risk Profile", "100% vulnerable to employer layoffs, inflation, and AI obsolescence", "Controls diversified cashflow, proprietary distribution, and hard reserves"]
            ]

            financial_math = f"""Let us ground this blueprint in uncompromising, verifiable unit economics. The objective is to construct a **{target_metric}** engine with minimal operational drag.

Consider the baseline mechanics of a sovereign model:
- **Core Asset Price Point**: $3,000 – $6,000 per implementation or high-conviction agreement.
- **Client Volume Required**: Exactly 3 to 5 clients per month to reach $15,000 – $25,000 monthly cashflow.
- **Software & Tooling Overhead**: <$250/month (LLM API keys, domain, no-code stack, automated scheduler).
- **Net Operating Margin**: 95%+ ($23,750+ net profit retained on every $25,000 billed).

Compare this with a conventional agency or corporate business:
- **Gross Revenue**: $40,000/month.
- **Payroll (4 full-time employees)**: -$22,000/month.
- **Commercial Office & Software Licenses**: -$5,500/month.
- **Client Acquisition Ad Spend**: -$7,500/month.
- **Owner Net Profit**: $5,000/month (before corporate taxes, coupled with 70 hours/week of stress).

The sovereign operator generating $25k/month takes home **five times the net cash** of the stressed agency owner doing $40k/month, while working 80% fewer hours."""

            failure_scenarios = [
                ("The Perfectionist Paralysis Trap", "Spending months refining internal dashboards and theoretical frameworks without ever putting an offer before a real economic decision-maker.", "Deploy the 24-Hour Minimum Viable Asset rule. If it does not directly touch client acquisition or automated delivery, delete it from your schedule."),
                ("The Scope Creep Disease", "Allowing clients or projects to dictate custom revisions outside the original agreement, turning high-margin leverage into customized manual labor.", "Implement an ironclad Service Level Agreement (SLA). Any customization beyond the core scope incurs a $1,500/day change-order fee."),
                ("Premature Complexity & Hiring", "Hiring assistants or junior freelancers before internal workflows are completely automated and documented, creating management overhead.", "Never hire a human for a task that can be executed by a 15-line script, a webhook trigger, or an autonomous AI agent.")
            ]

            action_directive = f"""Within the next 24 hours, execute this tactical checklist:
1. **Audit Your Current Time Allocation**: Review your calendar and eliminate any low-yield commitments that do not advance {l_title}.
2. **Commit to the Core Protocol**: Write down your target metric (**{target_metric}**) and place it where you will see it every morning.
3. **Draft the Minimum Viable Asset**: Create the first iteration of your offer sheet, diagnostic teardown script, or automation pipeline today.
4. **Deploy 10 High-Signal Touchpoints**: Initiate contact with 10 prospective high-value partners or clients using the Rule of 100 workflows provided in this lesson."""

            mantras = [
                ("Leverage Trumps Effort", "Working 14 hours in a broken vehicle creates exhaustion; working 90 minutes in an asymmetric vehicle creates generational wealth."),
                ("Move in Absolute Silence", "Real wealth is invisible. While amateurs flash rented luxuries, the true titan controls enterprise cash flow without fanfare."),
                ("Defend The War Chest", "Your net worth is not what flows through your Stripe account; it is what remains protected in liquid sovereign reserves."),
                ("The First Milestone Unlocks All", f"Cross the sovereignty threshold once with {title}, and every subsequent expansion becomes effortless.")
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
            "duration": f"{len(m['lessons']) * 18} min",
            "lessonsCount": len(lessons_list),
            "lessons": lessons_list
        })
        
    total_slides = sum(len(m_out["lessons"]) * 4 for m_out in modules_output)
    total_lessons = sum(len(m_out["lessons"]) for m_out in modules_output)
    total_modules = len(modules_output)
    
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
  badge: {json.dumps(badge)},
  rating: {rating},
  ratingCount: {rating_count},
  hoursOfMaterial: "{hours_of_material}",
  slidesCount: {total_slides},
  modulesCount: {total_modules},
  lessonsCount: {total_lessons},
  primaryColor: "#0f172a",
  accentColor: "#f59e0b",
  outcomes: [
    "Master the complete 2026 execution blueprint to build an unassailable seven-figure net worth",
    "Deploy the 4 forms of modern leverage: labor, capital, code, and high-converting media",
    "Engineer irresistible high-ticket offers with built-in risk reversal and premium pricing",
    "Execute the Rule of 100 customer acquisition engine across organic audits and direct distribution",
    "Establish the monastic capital defense protocol that protects and compounds net earnings into {target_metric}"
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
    print(f"Generated data: {data_path} ({total_modules} mods, {total_lessons} lessons, {total_slides} slides)")
    
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
  badge: {json.dumps(badge)},
  rating: {rating},
  ratingCount: {rating_count},
  studentsCount: "3,890",
  instructorName: "Plugd Systems Architect",
  instructorTitle: "Principal Sovereign Operator & Systems Architect",
  instructorBio: "Advising ambitious solopreneurs, digital architects, and agency operators on deploying high-margin autonomous systems, high-ticket services, and sovereign digital holding companies.",
  instructorRating: {rating},
  instructorReviews: "{rating_count}",
  instructorStudents: "3,890",
  instructorCourses: 8,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "{hours_of_material}",
  modulesCount: {total_modules},
  lessonsCount: {total_lessons},
  slidesCount: {total_slides},
  whatYouWillLearn: [
    "Deconstruct and master the complete 2026 seven-figure blueprint from scratch",
    "Identify and monetize high-barrier asymmetric digital skills that command $3k-$10k retainers",
    "Formulate irresistible high-ticket offers backed by risk reversal and outcome guarantees",
    "Execute the Rule of 100 customer acquisition framework with zero paid ad spend",
    "Productize customized services into scalable digital holding assets and SOP-driven pipelines",
    "Deploy the monastic wealth defense system that shields and compounds profits into {target_metric}"
  ],
  relatedTopics: [
    "AI Businesses",
    "Seven-Figure Blueprint",
    "High-Ticket Sales",
    "Rule of 100",
    "Productized Services",
    "Sovereign Assets"
  ],
  requirements: [
    "A computer with an internet connection and modern web browser",
    "Commitment to execute the daily Rule of 100 volume actions without hesitation",
    "Zero prior business experience, capital, or employees required"
  ],
  descriptionSections: {{
    intro: [
      "Welcome to the definitive masterclass on {title}. This playbook is engineered for ambitious operators who refuse to accept linear employment, corporate busywork, and financial fragility.",
      "Rather than teaching fleeting hacks or theoretical daydreaming, this curriculum delivers battle-tested systems, worked unit economics, tactical battle decision matrices, and complete production-grade blueprints.",
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
  targetAudience: [
    "Ambitious individuals looking to build a dependable seven-figure asset base in 2026",
    "Freelancers and agency operators seeking to transition from chaotic custom labor to productized leverage",
    "Operators who want to master the Rule of 100 customer acquisition system with zero ad burn",
    "Anyone seeking the strategic discipline and operational systems to achieve permanent spatial and temporal freedom"
  ],
  includes: [
    {{ iconName: "layers", text: "{total_modules} Structured Acts & {total_lessons} Cinematic Production Lessons" }},
    {{ iconName: "presentation", text: "{total_slides} Visual Presentation Slides & {total_lessons} In-Depth Written Guides" }},
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
  faqs: [
    {{
      question: "How is this Playbook different from generic YouTube advice?",
      answer: "Every lesson is grounded directly in verified practitioner video knowledge, deconstructed into step-by-step execution workflows, multi-slide presentations, and comprehensive written lessons."
    }},
    {{
      question: "Do I need a technical background or employees to implement this?",
      answer: "No. The entire curriculum is designed for solo operators using modern no-code software, autonomous agent tools, and personal leverage."
    }},
    {{
      question: "Is this one-time access or a subscription?",
      answer: "You receive lifetime access to all slides, written guides, and future updates for a single one-time payment of $3 USD."
    }}
  ]
}};

// Backwards-compatible alias
export const {export_prefix}_DETAIL = {export_prefix}_DETAIL_DATA;
"""

    detail_path = os.path.join("src", "lib", "playbooks", f"{file_name}-detail.ts")
    with open(detail_path, "w", encoding="utf-8") as f:
        f.write(detail_content)
    print(f"Generated detail: {detail_path}")

if __name__ == "__main__":
    generate_playbook_54()
