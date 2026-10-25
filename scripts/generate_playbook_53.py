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

CONFIG_53 = {
    "id": "ai-businesses-53",
    "slug": "if-i-started-over-with-0-heres-my-exact-plan-to-get-to-1m",
    "title": "If I Started Over With $0, Here’s My Exact Plan to get to $1M",
    "headline": "The uncompromising step-by-step master plan to rebuild from absolute zero to $1,000,000 net worth using high-leverage skills and modern systems.",
    "description": "If you lost everything tomorrow—no money, no audience, and zero network—this is the exact phased playbook to engineer survival cashflow, scale high-ticket service operations, productize into digital leverage, and accumulate an unassailable $1,000,000 asset fortress.",
    "hoursOfMaterial": "7.5 hours",
    "badge": "Bestseller",
    "rating": 4.9,
    "ratingCount": 1420,
    "modules": [
        {
            "number": 1,
            "title": "The Zero Baseline & Survival Cashflow Protocol ($0 to $5K)",
            "description": "Deconstructing the psychology of starting over with zero capital and securing immediate survival revenue within 14 days.",
            "lessons": [
                {"number": 1, "title": "The Psychological Reset & Eliminating Poverty Identity"},
                {"number": 2, "title": "The 48-Hour High-Income Skill Acquisition Sprint"},
                {"number": 3, "title": "Zero-Capital Direct Outreach & Sell-by-Chat Tactics"},
                {"number": 4, "title": "Closing the First 3 Case-Study Retainers ($1.5k–$3k/mo)"}
            ]
        },
        {
            "number": 2,
            "title": "The Service Solopreneur Foundation ($5K to $15K/Month)",
            "description": "Structuring specialized high-conviction service offers and delivering exceptional client outcomes with 90%+ margins.",
            "lessons": [
                {"number": 1, "title": "Ruthless Avatar Niche Selection & Acute Problem Diagnosis"},
                {"number": 2, "title": "Crafting the Irresistible No-Brainer Risk-Reversal Offer"},
                {"number": 3, "title": "Zero-Overhead Delivery Infrastructure & AI Tooling"},
                {"number": 4, "title": "Client Retention Mechanics & Protecting High Net Margins"}
            ]
        },
        {
            "number": 3,
            "title": "The Systems & Leveraged Delegation Shift ($15K to $40K/Month)",
            "description": "Transitioning from overworked freelancer to business owner by implementing buyback principles and operational SOPs.",
            "lessons": [
                {"number": 1, "title": "The Buyback Principle: Auditing Hourly Energy & Time"},
                {"number": 2, "title": "Building Bulletproof SOPs with the Loom-to-Doc Pipeline"},
                {"number": 3, "title": "Hiring Your First Offshore Operations Specialist"},
                {"number": 4, "title": "Shifting From Fulfillment Operator to Chief Rainmaker"}
            ]
        },
        {
            "number": 4,
            "title": "Productizing Services Into High-Margin Assets ($40K to $75K/Month)",
            "description": "Packaging customized service workflows into standardized productized assets and organic inbound media engines.",
            "lessons": [
                {"number": 1, "title": "Transforming Custom Chaos Into a Productized Machine"},
                {"number": 2, "title": "Pre-Selling High-Ticket Cohorts & Assets Before Building"},
                {"number": 3, "title": "The Inbound Authority Flywheel (X, LinkedIn & Video)"},
                {"number": 4, "title": "Deploying Algorithmic Funnels & Automated Sales Pipelines"}
            ]
        },
        {
            "number": 5,
            "title": "Building the Sovereign Enterprise Machine ($75K to $100K+/Month)",
            "description": "Scaling operations, removing single points of failure, and establishing resilient multi-stream cashflow engines.",
            "lessons": [
                {"number": 1, "title": "Installing Middle Management & Fractional Leadership"},
                {"number": 2, "title": "Unit Economics of the 7-Figure Lean Holding Structure"},
                {"number": 3, "title": "Eliminating Founder Reliance in Client Acquisition"},
                {"number": 4, "title": "De-Risking Cashflow Vulnerabilities & Multi-Stream Revenue"}
            ]
        },
        {
            "number": 6,
            "title": "The Wealth Accumulation & Defense Protocol (The $1M Cumulative Milestone)",
            "description": "Systematic cash management, lifestyle protection, tax optimization, and compounding surplus revenue into permanent assets.",
            "lessons": [
                {"number": 1, "title": "Eliminating Lifestyle Creep: The Monastic Wealth Defense Rule"},
                {"number": 2, "title": "Entity Structuring, Tax Optimization & Retained Earnings"},
                {"number": 3, "title": "Systematic Profit Sweeping Into Hard Compounding Assets"},
                {"number": 4, "title": "Acquiring Cash-Flowing Digital Assets with Zero Personal Debt"}
            ]
        },
        {
            "number": 7,
            "title": "The Sovereign Titan Mindset & Generational Autonomy",
            "description": "Achieving true spatial, temporal, and financial sovereignty with an unassailable $1,000,000 net-worth fortress.",
            "lessons": [
                {"number": 1, "title": "The 10-Year Horizon: Shifting from Operator to Allocator"},
                {"number": 2, "title": "Protecting Your Cognitive Monopoly & High-Conviction Circle"},
                {"number": 3, "title": "The Ultimate Freedom Equation: Decoupled Time & Income"},
                {"number": 4, "title": "The 12-Month Execution Roadmap to Hit Your First $1,000,000"}
            ]
        }
    ]
}

def generate_playbook_53():
    pb = CONFIG_53
    slug = pb["slug"]
    file_name = "started-over-zero-plan-to-1m"
    export_prefix = "STARTED_OVER_ZERO_TO_1M"
    course_id = pb["id"]
    title = pb["title"]
    short_desc = pb["headline"]
    full_desc = pb["description"]
    hours_of_material = pb["hoursOfMaterial"]
    modules = pb["modules"]
    target_metric = "$1,000,000 Net Worth Fortress"
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
                    f"The collision between starting with nothing and engineering sovereign wealth inside {title}.",
                    f"Zero capital is not a death sentence; it is the ultimate forcing function for pure skill leverage in {l_title}.",
                    [
                        {"number": "01", "title": "The Zero-Dollar Illusion", "description": "Most people believe you need capital to generate capital; in reality, capital is merely a lagging multiplier of high-leverage skill acquisition."},
                        {"number": "02", "title": "The Speed of Execution", "description": "When your bank account is empty, your speed to market must be infinite. Eliminating hesitation turns desperation into tactical momentum."},
                        {"number": "03", "title": "The Asymmetric Pivot", "description": f"By trading acute problem-solving for upfront cashflow, you engineer the first critical stepping stones toward {target_metric}."},
                        {"number": "04", "title": "Radical Resourcefulness", "description": "You do not need loans, investors, or office space; you only need an internet connection, relentless discipline, and direct distribution."}
                    ],
                    diagram={
                        "title": f"Cinematic Story Arc: {l_title}",
                        "steps": [
                            {"step": "01", "title": "Absolute Ground Zero", "desc": "Wiping out debt and mental inertia"},
                            {"step": "02", "title": "The Cashflow Spark", "desc": f"Mastering and monetizing {l_title}"},
                            {"step": "03", "title": "Systematized Scale", "desc": "Deploying delegation & productized offers"},
                            {"step": "04", "title": "The $1M Fortress", "desc": f"Solidifying your {target_metric}"}
                        ]
                    },
                    chart={
                        "title": "Capital Velocity: Survival Hustle vs. Systematic 7-Figure Architecture",
                        "data": [
                            {"label": "Random Side Gigs", "value": "10% Velocity", "barPct": 10, "badge": "High Drag"},
                            {"label": "Unsystematized Freelancing", "value": "35% Velocity", "barPct": 35, "badge": "Time Capped"},
                            {"label": "Leveraged Agency Engine", "value": "85% Velocity", "barPct": 85, "badge": "Scale Ready"},
                            {"label": "Sovereign Holding Asset", "value": "98% Velocity", "barPct": 98, "badge": "True Wealth"}
                        ]
                    }
                ),
                # Slide 2: The Turning Point
                make_story_slide(
                    f"s-{l_id}-2", 2,
                    f"ACT {m_num} // SCENE 02: THE TURNING POINT",
                    f"The Plot Twist: The Leverage Threshold",
                    f"How confronting operational bottlenecks in {l_title} forces the transition from sweat to systems.",
                    "When linear effort fails to scale, the true sovereign builder deploys leverage, standard operating procedures, and automated infrastructure.",
                    [
                        {"number": "01", "title": "The Ceiling of Pure Effort", "description": "Working 16 hours a day caps out at survival wages; true scaling requires decoupling income from physical minutes."},
                        {"number": "02", "title": "The Proprietary Protocol", "description": f"Structuring {l_title} into documented, repeatable workflows allows junior talent and software to deliver perfection."},
                        {"number": "03", "title": "Eliminating Low-Value Drudgery", "description": "Auditing every minute against your buyback rate to ensure you only execute activities generating >$500/hour in value."},
                        {"number": "04", "title": "The Multiplier Effect", "description": f"By treating {l_title} as an institutional system rather than a personal job, enterprise value expands exponentially."}
                    ],
                    metrics=[
                        {"label": "Target Operating Margin", "val": "92.4%", "note": "Zero bloated corporate overhead"},
                        {"label": "Target Run-Rate", "val": "$83,333/Mo", "note": "$1,000,000/year pace"},
                        {"label": "Validation Window", "val": "14 Days", "note": "Rapid client acquisition sprint"},
                        {"label": "Sovereign Independence", "val": "10/10", "note": "Full location and schedule freedom"}
                    ]
                ),
                # Slide 3: The Execution Climax
                make_story_slide(
                    f"s-{l_id}-3", 3,
                    f"ACT {m_num} // SCENE 03: THE EXECUTION CLIMAX",
                    f"The Battle Protocol: 4-Stage Execution Sequence",
                    f"The exact tactical roadmap to implement {l_title} with surgical precision and zero capital waste.",
                    "Discipline is binary: either you rigorously execute the playbook, or you surrender to economic chaos.",
                    [
                        {"number": "01", "title": "Phase 1: Diagnostic Audit", "description": f"Isolate the single highest-value acute problem within {l_title} that buyers are desperate to solve today."},
                        {"number": "02", "title": "Phase 2: High-Conviction Packaging", "description": "Construct an offer with dramatic risk-reversal, guaranteeing measurable business ROI for the client."},
                        {"number": "03", "title": "Phase 3: Systematic Delivery Pipeline", "description": "Implement autonomous tools, no-code integrations, and documented SOPs for zero-friction fulfillment."},
                        {"number": "04", "title": "Phase 4: Cash Sweeping & Capital Reinvestment", "description": f"Channel operational profits directly into liquid reserves and compounding assets toward {target_metric}."}
                    ],
                    diagram={
                        "title": f"Tactical Execution Architecture: {l_title}",
                        "steps": [
                            {"step": "01", "title": "Acute Diagnosis", "desc": "Identify high-dollar pain"},
                            {"step": "02", "title": "Packaged Offer", "desc": "Build risk-reversed agreement"},
                            {"step": "03", "title": "SOP Automation", "desc": "Streamline delivery pipelines"},
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
                    f"You have conquered ground zero; your operational engine now fuels your {target_metric} on total autopilot.",
                    [
                        {"number": "01", "title": "Untouchable Economic Security", "description": "Even if the market crashes or your current business vanishes, you now possess the repeatable playbook to generate cashflow from scratch at will."},
                        {"number": "02", "title": "Total Calendar Autonomy", "description": "You own your waking hours. No mandatory status meetings, no toxic clients, and no geographic tethers."},
                        {"number": "03", "title": "Liquid War Chest Reserves", "description": f"Surplus net earnings compound safely in boring, hard assets, guaranteeing long-term multi-generational stability."},
                        {"number": "04", "title": "The Master Allocator Seat", "description": f"With {l_title} systematized, you step permanently into the role of principal strategic architect."}
                    ],
                    chart={
                        "title": "Cumulative Net Worth Progression to $1,000,000",
                        "data": [
                            {"label": "Months 1-3 ($0 to Survival)", "value": "$15,000 Net", "barPct": 15, "badge": "Cashflow Spark"},
                            {"label": "Months 4-8 (Service Scaled)", "value": "$95,000 Net", "barPct": 38, "badge": "Agency Engine"},
                            {"label": "Months 9-16 (Systems & Leverage)", "value": "$380,000 Net", "barPct": 70, "badge": "Asset Lift"},
                            {"label": "Months 17-24 (The $1M Fortress)", "value": "$1,000,000+ Net", "barPct": 100, "badge": "Sovereign Exit"}
                        ]
                    }
                )
            ]
            
            # Written Lesson Generation
            cold_open = f"""Picture waking up tomorrow with your bank account completely emptied, your audience wiped clean, and your professional contacts stripped away. The panic that paralyzes 99% of people in this scenario stems from a fundamental misunderstanding: they believe wealth resides in bank balances. The reality taught in **{title}** is that wealth is not capital—wealth is your psychological fortitude, your mastery of high-value skill arbitrage, and your ability to solve acute problems for economic decision-makers.

In this lesson—**{l_title}**—we dismantle the anxiety of starting from zero and replace it with a clinical, tactical blueprint. You will master the exact operational mechanics required to generate immediate cashflow, structure unshakeable offers, eliminate wasted motion, and establish the foundational bedrock for your **{target_metric}**."""

            the_trap = f"""The fatal mistake made by novice operators when staring down a zero baseline is succumbing to complexity paralysis. They spend precious weeks debating company names, building complex websites, designing business cards, or filing incorporation paperwork before validating that anyone will pay them a single dollar. This is vanity busywork masquerading as entrepreneurship.

The market does not compensate you for setting up an LLC; it compensates you for solving an urgent, expensive problem with speed and precision. When approaching {l_title}, you must avoid the trap of selling generic, commoditized labor. If you offer generalist services, you will compete against millions of low-cost freelancers in a race to the bottom. Instead, you must narrow your focus to a specific, painful operational bottleneck where failure is costly and success yields immediate, measurable ROI."""

            the_breakthrough = f"""The breakthrough occurs when you realize that businesses are always eager to pay high fees if you eliminate risk and guarantee tangible value. By combining specialized technical execution with direct, personalized outreach, you can secure $2,000 to $5,000 monthly retainers within days of starting over—even with zero portfolio.

Inside {l_title}, we execute the Sovereign Problem-Solver Shift. You don't ask for a job; you audit an existing enterprise, identify a clear inefficiency or revenue leak, and deliver a risk-reversed solution on a silver platter. You build credibility by doing the thinking for them. Once the first cash hits your Stripe account, you ruthlessly protect your margins, reinvest into speed-enhancing tooling, and begin building the documented standard operating procedures that pave the road to seven figures."""

            battle_headers = ["Operational Vector", "The Amateur / Broke Mindset", "The Sovereign $1M Architect"]
            battle_rows = [
                ["Capital Assumption", "Believes you need venture capital or savings to launch", "Leverages free digital tools and direct skill monetization from day one"],
                ["Overhead Discipline", "Leases offices, buys expensive gear, and bleeds capital", "Maintains 92%+ net margin by operating lean with cloud tools"],
                ["Client Outreach", "Sends generic automated spam blasts to thousands of inboxes", "Sends hyper-targeted diagnostic teardowns to pre-qualified buyers"],
                ["Delivery Philosophy", "Treats every project as a bespoke, chaotic manual grind", "Productizes solutions into documented SOPs and repeatable modules"],
                ["Capital Allocation", "Inflates lifestyle immediately upon seeing initial profits", "Sweeps 80%+ of free cashflow into boring, compounding wealth assets"]
            ]

            financial_math = f"""Let us map out the uncompromising unit economics required to ascend from $0 to **{target_metric}**:

**Stage 1: Survival Cashflow ($0 to $10,000/Month)**
- Offer Structure: High-Ticket Specialized Retainer at $2,500/month.
- Client Target: Exactly 4 clients = $10,000/month gross revenue.
- Tooling Costs: $150/month (Loom, domain, email workspace, basic AI APIs).
- Net Monthly Cashflow: $9,850 (98.5% net margin).

**Stage 2: Systems & Team Scale ($10,000 to $40,000/Month)**
- Average Contract Value: $4,000/month.
- Client Count: 10 active clients = $40,000/month.
- Operations Specialist (2 full-time offshore operators): -$3,200/month.
- Software & Delivery Infrastructure: -$800/month.
- Net Monthly Profit: $36,000/month (90% net margin).

**Stage 3: The Cumulative $1,000,000 Milestone**
- Operating at $36,000/month net cashflow generates **$432,000 in net retained profit annually**.
- In just 24 to 28 months of disciplined profit sweeping into yield-bearing index instruments and hard assets, your net worth permanently crosses the $1,000,000 threshold."""

            failure_scenarios = [
                ("The Premature Scale Trap", "Hiring staff or signing software subscriptions before closing your first 3 paying clients.", "The First-Dollar Rule: Never spend capital on infrastructure until client retainer deposits have cleared in your bank account."),
                ("The Customization Curse", "Saying yes to every custom request a client asks for, turning your business into a stressful, low-margin freelance job.", "Enforce strict scope boundaries. Deliver one core outcome flawlessly; charge 3x for any custom additions."),
                ("The Lifestyle Inflation Trap", "Buying expensive cars, clothes, and apartments as soon as monthly income hits $10K-$20K.", "The 24-Month Monastic Lock: Live on 15% of your income; sweep the remaining 85% into liquid reserves until $1,000,000 net worth is reached.")
            ]

            action_directive = f"""Within the next 24 hours, execute this tactical checklist:
1. **Audit Your High-Value Skill Stack**: Write down the single most valuable digital skill you can deliver this week (automation, content, sales, systems).
2. **Identify 10 Target Enterprises**: Find 10 companies in a specific niche that are actively losing money due to the exact problem you solve in {l_title}.
3. **Record 3 Diagnostic Teardowns**: Send 3 personalized 3-minute video audits demonstrating the exact solution to decision-makers with zero friction.
4. **Enforce the Sovereign Metric**: Write **{target_metric}** on your workspace and commit to the daily 90-minute monastic deep work sprint."""

            mantras = [
                ("Capital Follows Competence", "Never cry about having no money. Sharpen your skills, solve expensive problems, and capital will flood into your hands."),
                ("Speed Destroys Doubt", "When you have zero resources, your only true weapon is velocity. Out-execute, out-iterate, and out-deliver every competitor."),
                ("Live in Monastic Silence", "True wealth makes no noise. While amateurs show off rented luxury, the sovereign builder quietly secures an eight-figure balance sheet."),
                ("Ground Zero is an Advantage", "Starting with nothing gives you nothing to lose, zero corporate baggage, and infinite freedom to execute with total ferocity.")
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
    "Master the complete end-to-end operational roadmap to go from $0 to $1,000,000 net worth",
    "Acquire and monetize high-ticket digital skills with zero initial capital or outside funding",
    "Build standard operating procedures and deploy offshore talent to scale services without burnout",
    "Productize agency services into scalable digital assets and automated acquisition pipelines",
    "Protect and compound retained business cashflow into an unassailable seven-figure asset fortress"
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
  studentsCount: "3,480",
  instructorName: "Plugd Systems Architect",
  instructorTitle: "Principal Sovereign Operator & Systems Architect",
  instructorBio: "Advising ambitious solopreneurs, digital architects, and agency operators on deploying high-margin autonomous systems, high-ticket services, and sovereign digital holding companies.",
  instructorRating: {rating},
  instructorReviews: "{rating_count}",
  instructorStudents: "3,480",
  instructorCourses: 7,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "{hours_of_material}",
  modulesCount: {total_modules},
  lessonsCount: {total_lessons},
  slidesCount: {total_slides},
  whatYouWillLearn: [
    "Deconstruct the clinical phased framework to go from $0 capital to $1,000,000 net worth",
    "Identify and monetize high-leverage digital skills within 48 hours without spending on ads",
    "Craft irresistible risk-reversed retainer offers that command $2,500 to $5,000 upfront fees",
    "Implement the Buyback Principle to delegate fulfillment to offshore operators for <$8/hour",
    "Productize custom service chaos into standardized, repeatable high-margin digital assets",
    "Establish the monastic profit-sweeping protocol that guarantees generational wealth preservation"
  ],
  relatedTopics: [
    "AI Businesses",
    "Wealth Creation",
    "From Scratch to $1M",
    "Productized Services",
    "Buyback Principle",
    "Sovereign Assets"
  ],
  requirements: [
    "A computer with an internet connection and modern web browser",
    "Willingness to commit to relentless daily execution without making excuses",
    "Zero financial capital, existing network, or prior business experience required"
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
    "Anyone starting from scratch with $0 who needs a clinical, step-by-step path to financial sovereignty",
    "Freelancers and solopreneurs capped by trading hours for linear dollars seeking scalable agency systems",
    "Ambitious operators looking to build, productize, and compound cashflow into an unassailable $1M net worth",
    "Anyone seeking the strategic clarity and systems discipline required to achieve permanent economic freedom"
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
    generate_playbook_53()
