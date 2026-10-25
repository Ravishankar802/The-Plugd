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
from generate_batch_6_configs import CONFIGS_BATCH_6

file_prefixes = {
    "want-to-made-god-tier-money-use-this-sales-tactic-made-me-10m": "sales-tactic-god-tier-money",
    "there-are-only-3-types-of-profitable-businesses-pick-one": "three-types-profitable-businesses",
    "if-you-dont-understand-leadership-youll-never-win": "understand-leadership-never-win",
    "i-built-a-business-with-ai-in-24-hours": "built-business-ai-24-hours",
    "copy-paste-this-strategy-to-make-your-first-5-000-online": "copy-paste-strategy-first-5k",
    "7-remote-jobs-you-can-do-from-home": "seven-remote-jobs-from-home",
    "i-asked-ai-to-make-me-as-much-money-as-possible": "asked-ai-make-money-possible",
    "these-are-the-best-business-books-to-read-7-billionaire-books": "best-business-books-7-billionaires",
    "my-honest-advice-to-someone-who-wants-to-get-rich": "honest-advice-want-get-rich",
    "the-30k-month-al-faceless-shorts-method-nobodys-talking-about": "faceless-shorts-30k-month",
    "how-to-build-10k-websites-in-minutes-claude-ai": "build-10k-websites-claude-ai",
    "master-higgsfield-ai-in-20-minutes-beginner-tutorial": "master-higgsfield-ai-tutorial",
}

export_const_names = {
    "want-to-made-god-tier-money-use-this-sales-tactic-made-me-10m": "SALES_TACTIC_10M",
    "there-are-only-3-types-of-profitable-businesses-pick-one": "THREE_TYPES_BUSINESSES",
    "if-you-dont-understand-leadership-youll-never-win": "UNDERSTAND_LEADERSHIP",
    "i-built-a-business-with-ai-in-24-hours": "BUILT_BUSINESS_AI_24H",
    "copy-paste-this-strategy-to-make-your-first-5-000-online": "COPY_PASTE_FIRST_5K",
    "7-remote-jobs-you-can-do-from-home": "SEVEN_REMOTE_JOBS",
    "i-asked-ai-to-make-me-as-much-money-as-possible": "ASKED_AI_MAKE_MONEY",
    "these-are-the-best-business-books-to-read-7-billionaire-books": "BEST_BUSINESS_BOOKS",
    "my-honest-advice-to-someone-who-wants-to-get-rich": "HONEST_ADVICE_GET_RICH",
    "the-30k-month-al-faceless-shorts-method-nobodys-talking-about": "FACELESS_SHORTS_30K",
    "how-to-build-10k-websites-in-minutes-claude-ai": "BUILD_10K_WEBSITES_CLAUDE",
    "master-higgsfield-ai-in-20-minutes-beginner-tutorial": "MASTER_HIGGSFIELD_AI",
}

def get_target_metric_batch_6(slug):
    if "god-tier-money" in slug or "sales-tactic" in slug:
        return "$10,000,000 Sales Conversion Engine"
    if "3-types-of-profitable" in slug:
        return "High-Margin Sovereign Asset Model"
    if "leadership" in slug:
        return "High-Performance Autonomous Organization"
    if "business-with-ai-in-24-hours" in slug:
        return "24-Hour Rapid Launch Cash Machine"
    if "first-5-000-online" in slug:
        return "$5,000/Month Baseline Cashflow"
    if "7-remote-jobs" in slug:
        return "$10,000/Month Sovereign Remote Infrastructure"
    if "as-much-money-as-possible" in slug:
        return "Autonomous AI-Driven Revenue Pipeline"
    if "best-business-books" in slug:
        return "Billionaire Mental Operating Model"
    if "honest-advice" in slug:
        return "Uncompromising Wealth Accumulation Engine"
    if "faceless-shorts" in slug:
        return "$30,000/Month Media Syndication Network"
    if "10k-websites" in slug:
        return "$10,000 High-Ticket Development Retainers"
    if "higgsfield" in slug:
        return "World-Class Generative Video Production Pipeline"
    return "$10,000+/Month ($120,000+/Year)"

for pb in CONFIGS_BATCH_6:
    slug = pb["slug"]
    file_name = file_prefixes[slug]
    export_prefix = export_const_names[slug]
    course_id = pb["id"]
    title = pb["title"]
    short_desc = pb["headline"]
    full_desc = pb["description"]
    hours_of_material = pb["hoursOfMaterial"]
    modules = pb["modules"]
    target_metric = get_target_metric_batch_6(slug)
    badge = pb.get("badge", "Bestseller")
    rating = pb.get("rating", 4.9)
    rating_count = pb.get("ratingCount", 1240)
    
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
                        {"number": "04", "title": "The Sovereign Commitment", "description": "You choose radical focus over scattered experimentation, refusing to accept mediocre compromises."}
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
                            {"label": "Manual Guesswork Churn", "value": "34% Velocity", "barPct": 34, "badge": "Capital Burn"},
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
                        {"number": "03", "title": "Cutting Dead Weight", "description": "Eliminating low-yield commitments, noisy distractions, and speculative busywork to preserve 100% cognitive velocity."},
                        {"number": "04", "title": "The 10x Paradigm Shift", "description": f"The breakthrough is never about doing 10x more work; it is about finding the single 10x lever inside {l_title}."}
                    ],
                    metrics=[
                        {"label": "Operating Net Margin", "val": "94.6%", "note": "Zero bloated staff payroll"},
                        {"label": "Target Capital Velocity", "val": target_metric.split()[0], "note": "Verified sovereign inflow"},
                        {"label": "Time to Validation", "val": "14 Days", "note": "High-conviction diagnostic sprint"},
                        {"label": "Sovereignty Score", "val": "10/10", "note": "Total operational independence"}
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
                    f"The Resolution: Asymmetric Dominance",
                    f"The durable moat, operational peace, and compounding equity created by mastering {l_title}.",
                    f"You have escaped the linear trap; your operational infrastructure now produces {target_metric} on command.",
                    [
                        {"number": "01", "title": "Permanent Equity Moat", "description": "You now control proprietary distribution, high-converting offer structures, and automated delivery pipelines that competitors cannot duplicate."},
                        {"number": "02", "title": "True Time Sovereignty", "description": "Your calendar belongs exclusively to you; zero client emergencies, zero middle management meetings, and zero linear trade-offs."},
                        {"number": "03", "title": "Liquid War Chest Accumulation", "description": f"Net cashflow converts directly into sovereign assets, securing complete resilience regardless of macroeconomic shifts."},
                        {"number": "04", "title": "The Next Frontier", "description": f"With {l_title} systematized, you unlock higher-order strategic capital allocation across your portfolio."}
                    ],
                    chart={
                        "title": "Compounding Capital Velocity Over 24 Months",
                        "data": [
                            {"label": "Month 1-3 (Setup & Proof)", "value": "$10,000 Total", "barPct": 15, "badge": "Foundation"},
                            {"label": "Month 4-8 (Systematization)", "value": "$45,000 Total", "barPct": 42, "badge": "Inflection"},
                            {"label": "Month 9-16 (Scaling Assets)", "value": "$125,000 Total", "barPct": 78, "badge": "Velocity"},
                            {"label": "Month 17-24 (Full Sovereignty)", "value": "$350,000+ Net", "barPct": 100, "badge": "Domination"}
                        ]
                    }
                )
            ]
            
            # Written Lesson Generation
            cold_open = f"""Imagine standing at the exact intersection of two distinct futures. In the first future, you wake up tomorrow to the relentless buzz of an alarm, bound to a calendar dictating your physical presence, trading your irreplaceable vital energy for an incremental salary or chaotic freelance gigs. In the second future—the reality engineered inside **{title}**—you awaken on your own schedule to find your automated software stack, client pipeline, and asymmetric operational assets executing in the background, consistently producing **{target_metric}** without requiring your physical intervention.

This lesson—**{l_title}**—is the architectural blueprint that bridges those two realities. We will dismantle the psychological traps that keep 99% of people chained to linear effort, reconstruct the fundamental mathematics of sovereign leverage, and equip you with a battle-tested protocol you can deploy within the next 24 hours."""

            the_trap = f"""The fatal mistake made by 99% of aspiring operators when approaching {l_title} is treating it as an incremental optimization of an existing job rather than an entirely new economic paradigm. They ask: *'How many hours must I work today to see a return?'* This question reveals a devastating employee mindset. When you link effort directly to compensation, you hit an inescapable ceiling: there are only 24 hours in a day, your energy depletes rapidly, and taxes aggressively erode earned income.

Furthermore, novices fall into the trap of complexity theatre. They spend weeks debating logo colors, researching offshore corporate structures before making a single dollar, or endlessly tweaking prompts without a direct distribution funnel. They mistake nervous movement for asymmetric forward velocity. The market does not reward activity; it rewards sovereign execution and closed-loop leverage."""

            the_breakthrough = f"""The breakthrough occurs the moment you recognize that wealth is never built through sweat; it is built through the strategic ownership of leveraged systems. By combining autonomous AI workflows, zero-marginal-cost digital distribution, and high-conviction value packaging, you decouple your revenue from your finite lifespan.

Within {l_title}, we execute the Sovereign Operator Shift. Instead of chasing hundreds of low-paying micro-transactions, you structure proprietary, high-leverage frameworks that solve acute, expensive problems. You don't sell your time; you sell an engineered outcome backed by proof, speed, and algorithmic certainty. This is how solo operators routinely outperform 20-person legacy agencies while maintaining a 90%+ net profit margin."""

            battle_headers = ["Strategic Vector", "The Linear Employee / Amateur Trap", "The Sovereign Operator Paradigm"]
            battle_rows = [
                ["Unit Economics", "Trades 1 hour for $30-$100 (Taxed at highest marginal rate)", "Builds self-sustaining assets generating infinite leverage and high net margins"],
                ["Operating Overhead", "Signs long-term commercial leases and hires expensive payroll", "Maintains 90%+ net margins with zero employees using modular software"],
                ["Customer Acquisition", "Burns cash on cold Facebook ads with negative initial ROI", "Deploys targeted organic teardowns and high-converting sovereign funnels"],
                ["Work Rhythm", "Tethered to 9-to-5 synchronous Zoom calls and Slack notifications", "Executes 90-minute daily deep work sprints; rest of day is 100% autonomous"],
                ["Risk Profile", "100% vulnerable to employer layoffs, inflation, and AI obsolescence", "Controls diversified cashflow, proprietary distribution, and hard reserves"]
            ]

            financial_math = f"""Let us ground this philosophy in uncompromising, verifiable unit economics. The objective is to construct an unbreakable **{target_metric}** engine with minimal operational drag.

Consider the baseline mechanics of a sovereign model:
- **Core Asset Price Point**: $2,500 – $5,000 per implementation or high-conviction agreement.
- **Client Volume Required**: Exactly 2 to 4 clients per month to reach $10,000+ monthly cashflow.
- **Software & Tooling Overhead**: <$200/month (LLM API keys, domain, no-code stack, automated scheduler).
- **Net Operating Margin**: 95.2% ($9,520+ net profit retained on every $10,000 billed).

Compare this with a conventional agency or corporate business:
- **Gross Revenue**: $25,000/month.
- **Payroll (3 full-time employees)**: -$14,000/month.
- **Commercial Office & Software Licenses**: -$3,500/month.
- **Client Acquisition Ad Spend**: -$4,500/month.
- **Owner Net Profit**: $3,000/month (before corporate taxes, coupled with 70 hours/week of stress).

The sovereign operator generating $10k/month takes home **triple the net cash** of the stressed agency owner doing $25k/month, while working 80% fewer hours."""

            failure_scenarios = [
                ("The Perfectionist Paralysis Trap", "Spending months refining internal dashboards and theoretical frameworks without ever putting an offer before a real economic decision-maker.", "Deploy the 24-Hour Minimum Viable Asset rule. If it does not directly touch client acquisition or automated delivery, delete it from your schedule."),
                ("The Scope Creep Disease", "Allowing clients or projects to dictate custom revisions outside the original agreement, turning high-margin leverage into customized manual labor.", "Implement an ironclad Service Level Agreement (SLA). Any customization beyond the core scope incurs a $1,500/day change-order fee."),
                ("Premature Complexity & Hiring", "Hiring assistants or junior freelancers before internal workflows are completely automated and documented, creating management overhead.", "Never hire a human for a task that can be executed by a 15-line script, a webhook trigger, or an autonomous AI agent.")
            ]

            action_directive = f"""Within the next 24 hours, execute this tactical checklist:
1. **Audit Your Current Time Allocation**: Review your calendar and eliminate any low-yield commitments that do not advance {l_title}.
2. **Commit to the Core Protocol**: Write down your target metric (**{target_metric}**) and place it where you will see it every morning.
3. **Draft the Minimum Viable Asset**: Create the first iteration of your offer sheet, prompt framework, or diagnostic teardown today.
4. **Deploy 5 High-Signal Touchpoints**: Initiate contact with 5 prospective high-value partners or clients using the workflows provided in this lesson."""

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
  studentsCount: "2,840",
  instructorName: "Plugd Systems Architect",
  instructorTitle: "Principal Sovereign Operator & Systems Architect",
  instructorBio: "Advising ambitious solopreneurs, digital architects, and agency operators on deploying high-margin autonomous systems, high-ticket services, and sovereign digital holding companies.",
  instructorRating: {rating},
  instructorReviews: "{rating_count}",
  instructorStudents: "2,840",
  instructorCourses: 6,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "{hours_of_material}",
  modulesCount: {total_modules},
  lessonsCount: {total_lessons},
  slidesCount: {total_slides},
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

print("Batch 6 code generation complete!")
