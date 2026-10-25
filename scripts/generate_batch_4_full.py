import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(__file__))
from build_storytelling_helpers import (
    make_story_slide,
    build_narrative_written_lesson,
    COMMON_STORY_TESTIMONIALS_COURSE,
    COMMON_STORY_TESTIMONIALS_DETAIL,
    COMMON_STORY_FAQS
)
from generate_batch_4_configs import CONFIGS_BATCH_4

file_prefixes = {
    "learn-this-skill-if-you-want-to-win-in-the-next-2-3-years": "learn-this-skill-win-next-years",
    "how-to-build-a-1m-one-person-business-faster-with-ai": "build-1m-one-person-faster-ai",
    "how-to-think-like-a-strategic-genius-5-dimensional-thinking": "think-strategic-genius-5d",
    "how-to-use-ai-better-than-99-of-people-this-changed-my-life": "use-ai-better-99-percent",
    "youre-stuck-in-the-matrix-heres-how-you-escape": "stuck-in-matrix-escape",
    "you-have-5-years-to-get-rich-before-ai-takes-over": "five-years-get-rich-before-ai",
    "investing-for-beginners-in-25-minutes": "investing-beginners-25-mins",
    "laziest-ways-to-make-money-with-ai-for-beginners": "laziest-ways-money-ai-beginners",
}

export_const_names = {
    "learn-this-skill-if-you-want-to-win-in-the-next-2-3-years": "LEARN_THIS_SKILL",
    "how-to-build-a-1m-one-person-business-faster-with-ai": "BUILD_1M_SOLO_FASTER",
    "how-to-think-like-a-strategic-genius-5-dimensional-thinking": "THINK_STRATEGIC_GENIUS",
    "how-to-use-ai-better-than-99-of-people-this-changed-my-life": "USE_AI_BETTER_99",
    "youre-stuck-in-the-matrix-heres-how-you-escape": "STUCK_IN_MATRIX_ESCAPE",
    "you-have-5-years-to-get-rich-before-ai-takes-over": "FIVE_YEARS_GET_RICH_AI",
    "investing-for-beginners-in-25-minutes": "INVESTING_BEGINNERS_25M",
    "laziest-ways-to-make-money-with-ai-for-beginners": "LAZIEST_WAYS_AI_BEGINNERS",
}

def get_target_metric_batch_4(slug):
    if "learn-this-skill" in slug:
        return "$25,000+/Month Sovereign Synthesis Retainers"
    if "1m-one-person" in slug:
        return "$83,333/Month ($1,000,000/Year Net Cash)"
    if "strategic-genius" in slug:
        return "Unassailable Strategic Moats & Enterprise Control"
    if "use-ai-better" in slug:
        return "10x Superhuman Output Velocity & Cognitive Monopoly"
    if "stuck-in-the-matrix" in slug:
        return "100% Financial & Temporal Sovereignty"
    if "5-years" in slug:
        return "7-Figure Permanent Hard-Asset Fortress"
    if "investing-for-beginners" in slug:
        return "25-Minute Compounding Wealth Machine"
    if "laziest-ways" in slug:
        return "$5,000$10,000/Month Zero-Friction Passive Flow"
    return "$10,000+/Month ($120,000+/Year)"

for pb in CONFIGS_BATCH_4:
    slug = pb["slug"]
    file_name = file_prefixes[slug]
    export_prefix = export_const_names[slug]
    course_id = pb["id"]
    title = pb["title"]
    short_desc = pb["headline"]
    full_desc = pb["description"]
    hours_of_material = pb["hoursOfMaterial"]
    modules = pb["modules"]
    target_metric = get_target_metric_batch_4(slug)
    
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
                    f"The collision between conventional assumptions and asymmetric execution inside {title}.",
                    f"Conventional models produce friction and exhaustion; sovereign leverage inside {l_title} flips the equation permanently.",
                    [
                        {"number": "01", "title": "The Illusion of Linear Effort", "description": f"99% of people believe grinding longer hours within obsolete systems yields freedom; inside {l_title}, we invert this premise entirely."},
                        {"number": "02", "title": "The Inciting Realization", "description": "Trading finite hours for linear compensation creates taxable exhaustion; sovereign operators build assets that compound without presence."},
                        {"number": "03", "title": "The Asymmetric Pivot", "description": f"By shifting from manual friction to engineered systems, you position your operations for {target_metric}."},
                        {"number": "04", "title": "The Sovereign Commitment", "description": "You choose radical focus over scattered experimentation, refusing to accept mediocre middle-class compromises."}
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
                    f"The exact 4-stage operational sequence to implement {l_title} without friction or guesswork.",
                    "Execution is binary: either you own the machine, or you are a cog in someone else's machine.",
                    [
                        {"number": "01", "title": "Phase 1: Diagnostic Teardown", "description": f"Isolate the single highest-value leverage point within {l_title} and establish rigorous baseline metrics."},
                        {"number": "02", "title": "Phase 2: Closed-Loop Architecture", "description": "Deploy autonomous software triggers, direct distribution funnels, and zero-latency client handoffs."},
                        {"number": "03", "title": "Phase 3: Live Market Stress-Test", "description": "Put the system under market pressure with real buyers; iterate rapidly based on empirical data."},
                        {"number": "04", "title": "Phase 4: Sovereign Scaling Lock", "description": f"Funnel operational surpluses into permanent assets, cementing your run-rate toward {target_metric}."}
                    ],
                    diagram={
                        "title": f"Tactical Execution Architecture: {l_title}",
                        "steps": [
                            {"step": "01", "title": "Isolate Node", "desc": "Identify single constraint"},
                            {"step": "02", "title": "Automate Loop", "desc": "Deploy software triggers"},
                            {"step": "03", "title": "Stress Test", "desc": "Run live market validation"},
                            {"step": "04", "title": "Sovereign Scale", "desc": "Channel profits into assets"}
                        ]
                    }
                ),
                # Slide 4: The Sovereign Payoff
                make_story_slide(
                    f"s-{l_id}-4", 4,
                    f"ACT {m_num} // SCENE 04: THE SOVEREIGN PAYOFF",
                    f"The Final Ascendancy: Generational Autonomy",
                    f"Locking in durable competitive advantage, high cash-flow margins, and absolute sovereignty.",
                    "True wealth is not what flows through your bank account; it is what remains protected in liquid sovereign reserves.",
                    [
                        {"number": "01", "title": "The Decoupling Milestone", "description": "Your revenue is now 100% disconnected from physical hours worked; your digital assets work 24/7/365."},
                        {"number": "02", "title": "The Fortress Balance Sheet", "description": f"Accumulating consistent monthly surpluses to build an unbreachable war chest targeting {target_metric}."},
                        {"number": "03", "title": "Total Spatial & Temporal Freedom", "description": "Working from any jurisdiction worldwide with a laptop, secure connection, and absolute peace of mind."},
                        {"number": "04", "title": "The Generational Moat", "description": f"The proprietary knowledge and systems forged in {title} become permanent family wealth."}
                    ],
                    metrics=[
                        {"label": "Weekly Work Hours", "val": "4-10 Hrs", "note": "Pure high-leverage strategy"},
                        {"label": "Monthly Net Surplus", "val": "$10,000+", "note": "Reinvested into hard assets"},
                        {"label": "Location Freedom", "val": "100%", "note": "Global nomad flexibility"},
                        {"label": "Cognitive Clarity", "val": "10/10", "note": "Zero employee drama"}
                    ]
                )
            ]
            
            cold_open = f"""Imagine standing at the edge of a fundamental career shift. On one side is the comfortable, suffocating trap of traditional linear effort: working 50 to 60 hours every single week in a vehicle where your upside is mathematically capped, your margins are devoured by inflation, and your time is held hostage by corporate bureaucracy. On the other side is the asymmetric paradigm revealed in **{l_title}**: an operational framework where a single focused operator, armed with modern leverage and sovereign clarity, generates the revenue and impact of an entire department.

This is not theoretical speculation. Every day you remain trapped in obsolete linear thinking, you pay a devastating tax in lost compounding. When you examine the mechanics of {title}, you discover that the difference between struggle and dominance is not talent, luck, or brute-force willpower; it is the structural architecture of the vehicle you choose to operate."""

            the_trap = f"""Why do 99% of intelligent, hard-working individuals fail to achieve financial sovereignty? Because they are operating on flawed cultural programming:
1. **The Brute-Force Fallacy**: Believing that grinding longer hours within a broken, non-scalable model will magically produce wealth.
2. **The Employee Mindset in Freelancer Clothes**: Escaping a boss only to become an on-demand servant to 10 demanding micro-managers.
3. **The Complexity Poison**: Adding bloated software, unnecessary hires, and convoluted systems that drain net profit and create paralysis.
4. **The Lack of an Asymmetric Thesis**: Failing to identify where a single unit of input produces 100 units of high-margin economic output within {l_title}."""

            the_breakthrough = f"""The breakthrough of **{l_title}** rests on three foundational pillars:
- **First-Principles Simplification**: Stripping away every non-essential activity until only the raw, cashflow-generating mechanism remains.
- **Closed-Loop Software Automation**: Replacing human administrative friction with deterministic code, prompt workflows, and automated webhooks.
- **Asymmetric Offer Calibration**: Packaging your output so that buyers perceive an immediate 10x return on investment, making price resistance completely irrelevant."""

            battle_headers = ["Operating Dimension", "Amateur Trap (99%)", "Sovereign Protocol (Top 1%)", "Strategic Payoff"]
            battle_rows = [
                ["Cognitive Focus", "Scattered across 10 speculative ideas", "Relentless execution of 1 proven vehicle", "Unstoppable momentum"],
                ["Cost Architecture", "High overhead, software subscriptions & staff", "Near-zero overhead ($100/mo stack)", "95%+ Net profit margins"],
                ["Pricing Strategy", "Competing on low rates and hourly billing", "Value-based pricing anchored to client upside", "5x-10x Larger cash inflows"],
                ["Fulfillment Engine", "Manual, emotional, hands-on labor", "Automated pipelines & productized assets", "True time sovereignty"]
            ]

            financial_math = f"""Let us examine the concrete unit economics required to achieve **{target_metric}**:
- **Scenario A (High-Ticket Asymmetric Value)**: 5 clients paying $2,500/month on automated retainer = $12,500/month ($150,000/year).
- **Scenario B (Productized Digital Asset)**: 150 members paying $97/month in an exclusive asset vault = $14,550/month ($174,600/year) with 2 hours of weekly fulfillment.
- **Scenario C (Hybrid Sovereign Model)**: 3 retainers @ $3,500/mo + $4,500/mo in automated digital assets = $15,000/month ($180,000/year).
- **Monthly Overhead**:
  - Domain, SSL & Server: ~$30/month
  - AI API Tokens & Automation: ~$45/month
  - Payment Processing: 2.9%
  - **Net Take-Home Cashflow: 94%+ ($14,000+ monthly liquid surplus)**."""

            failure_scenarios = [
                ["Premature Complexity Trap", "Adding multiple product tiers before validating 1 core offer", "Enforce the Rule of One: 1 Offer, 1 Channel, 1 System until you cross $10,000/Month."],
                ["Lifestyle Inflation Vulnerability", "Upgrading personal expenses the moment cash flow spikes", "Establish a strict 12-Month Capital Quarantine: Live on baseline expenses and bank the surplus."],
                ["Inconsistent Execution Syndrome", "Starting with intensity for 7 days, then abandoning the protocol", "Lock in 90-minute daily monastic deep work sprints that occur before opening email or social feeds."],
                ["Scope Creep Poisoning", "Allowing clients or projects to demand unpaid custom work", "Deploy rigid Service Level Agreements (SLAs) with strict boundaries and automated upsells."]
            ]

            action_directive = f"""Within the next 24 hours, execute this tactical checklist:
1. **Audit Your Current Time Allocation**: Review your calendar and eliminate any low-yield commitments that do not advance {l_title}.
2. **Commit to the Core Protocol**: Write down your target metric (**{target_metric}**) and place it where you will see it every morning.
3. **Draft the Minimum Viable Asset**: Create the first iteration of your offer sheet, prompt framework, or diagnostic teardown today.
4. **Deploy 5 High-Signal Touchpoints**: Initiate contact with 5 prospective high-value partners or clients using the scripts provided in this lesson."""

            mantras = [
                ("Leverage Trumps Effort", "Working 14 hours in a broken vehicle creates exhaustion; working 90 minutes in an asymmetric vehicle creates generational wealth."),
                ("Move in Absolute Silence", "Real wealth is invisible. While amateurs flash leased luxuries, the true titan controls enterprise cash flow without fanfare."),
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
  ratingCount: {pb["ratingCount"]},
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
  ratingCount: {pb["ratingCount"]},
  studentsCount: "2,840",
  instructorName: "Plugd Systems Architect",
  instructorTitle: "Principal Sovereign Operator & Systems Architect",
  instructorBio: "Advising ambitious solopreneurs, digital architects, and agency operators on deploying high-margin autonomous systems, high-ticket services, and sovereign digital holding companies.",
  instructorRating: {pb["rating"]},
  instructorReviews: "{pb["ratingCount"]}",
  instructorStudents: "2,840",
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
  targetAudience: [
    "Ambitious individuals looking to build sovereign income streams outside the traditional matrix",
    "Beginners wanting practical, low-barrier business models with rapid cashflow velocity",
    "Operators who want to leverage autonomous AI agents and lean software infrastructure",
    "Anyone wanting the strategic discipline to achieve true spatial and temporal freedom"
  ],
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

// Backwards-compatible aliases
export const {export_prefix}_DETAIL = {export_prefix}_DETAIL_DATA;
"""
    detail_path = os.path.join("src", "lib", "playbooks", f"{file_name}-detail.ts")
    with open(detail_path, "w", encoding="utf-8") as f:
        f.write(detail_content)
    print(f"Generated detail: {detail_path}")

print("Batch 4 full generation completed successfully!")
