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
from generate_batch_2_configs import ALL_BATCH_2_PLAYBOOKS

def generate_batch_2_playbook_files(pb):
    file_name = pb["file_name"]
    course_id = pb["course_id"]
    slug = pb["slug"]
    title = pb["title"]
    short_desc = pb["short_desc"]
    full_desc = pb["full_desc"]
    modules = pb["modules"]
    hours_of_material = pb["hours_of_material"]
    
    is_500_day = "500-day" in slug or "$500/day" in title
    is_1m = "1-000-000" in slug or "1000000" in slug or "$1M" in title or "millionaires" in slug
    is_350k = "350-000" in slug or "$350,000" in title
    
    target_metric = "$500/Day ($15,000/Month)" if is_500_day else ("$350,000/Month Net Profit" if is_350k else "$1,000,000 Liquid Wealth")
    
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
                    f"The brutal collision between traditional effort and asymmetric leverage inside {title}.",
                    f"Every breakthrough begins with a moment of disgust at the old, broken way of operating.",
                    [
                        {"number": "01", "title": "The Illusion of Effort", "description": f"99% of people believe grinding harder within a broken vehicle produces wealth; inside {l_title}, we invert this premise entirely."},
                        {"number": "02", "title": "The Inciting Catalyst", "description": f"A single sharp realization shatters the matrix: conventional paths trade life force for linear, taxable wages."},
                        {"number": "03", "title": "The Asymmetric Pivot", "description": f"By shifting from linear labor to engineered leverage, you position your operations for {target_metric}."},
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
                        {"label": "Operating Net Margin", "val": "96.4%", "note": "Zero bloated staff overhead"},
                        {"label": "Target Daily Velocity", "val": "$500/day", "note": "Consistent asynchronous cash"},
                        {"label": "Time to First Cashflow", "val": "14 Days", "note": "Rapid validation sprint"},
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
                            {"label": "Month 06 (Momentum)", "value": "$30,000", "barPct": 28, "badge": "Velocity"},
                            {"label": "Month 12 (Scale)", "value": "$100,000", "barPct": 55, "badge": "Flywheel"},
                            {"label": "Month 36 (Sovereignty)", "value": "$1,000,000+", "barPct": 100, "badge": "Freedom"}
                        ]
                    }
                )
            ]
            
            # Generate rich, movie-like narrative written lesson (>2,200 chars)
            cold_open = f"""Imagine stepping into a dimly lit penthouse room overlooking the skyline at 2:00 AM. Your phone sits facedown on the marble desk. No alarm clocks are set for tomorrow. No commute waits for you in the morning. On your screen is a clean dashboard displaying verified deposits flowing in on complete autopilot: $500, then another $1,500, then a multi-thousand-dollar wire confirmation.

This is not a theoretical fantasy. This is the exact daily operating reality of operators who have unlocked the code of **{l_title}**.

Most people spend their entire lives believing the noble lie of the industrial complex: that if you just wake up early, put your head down, and grind for forty years at a desk, the system will eventually reward you with freedom. But when you look at the raw mathematical reality, that equation is broken. Inflation quietly eats 10% to 15% of your purchasing power every single year. Taxes cannibalize nearly half of every incremental dollar you earn. And worst of all, you are trading your only non-renewable asset—your finite, irreplaceable youth—for linear, taxable wages that barely keep pace with rent.

To break out of that meat grinder, you need an asymmetric vehicle. You need to master **{l_title}** not as an academic exercise, but as an escape vehicle engineered to deliver {target_metric} with uncompromising net margins."""

            the_trap = f"""Why does 99% of the population remain trapped in financial mediocrity when the internet provides universal access to infinite global distribution?

The answer lies in the **Sycophancy and Glamour Trap**:
1. **Chasing Flashy, Crowded Business Models**: Beginners constantly gravitate toward whatever model is trending on TikTok or Twitter this week. Whether it is speculative crypto day-trading, oversaturated dropshipping stores selling cheap plastic widgets from China, or low-margin physical products with high chargeback rates, novices mistake popular hype for profitability. In reality, the most lucrative businesses are quiet, unsexy, and operate in total stealth with virtually zero competition.
2. **The High-Cost Status signaling Trap**: The second fatal mistake occurs the moment an operator tastes their first $10,000 or $50,000 windfall. Instead of plowing that velocity capital back into liquid war chests or sovereign assets, they immediately lease expensive German cars, move into overpriced luxury apartments, and start buying designer clothes to project the illusion of wealth to strangers who do not care about them. Within three months, their monthly burn rate explodes, forcing them right back into a state of financial panic.
3. **The Absence of Operational Moats**: Treating business like a chaotic series of manual tasks rather than building repeatable, automated software and media machinery. If your business stops generating revenue the second you step away from your keyboard to sleep, you do not own a business—you own a high-stress, low-security job."""

            the_breakthrough = f"""To execute the master strategy of **{l_title}** with surgical precision, follow the four-phase operational blueprint below:

#### Phase 1: Environment Hardening & Monastic Focus
- Eliminate all digital noise. Quarantine your calendar into dedicated 90-minute deep work sprints. Block algorithmically manipulated feeds, doom-scrolling apps, and toxic peer groups that drain your creative velocity.
- Establish dedicated operating accounts with zero speculative balance mixing. Keep your business treasury isolated in tier-1 institutions with multi-currency reserves.

#### Phase 2: Asymmetric Value Architecture
- Identify high-pain operational bottlenecks in high-spending markets. Whether it is saving local businesses 20 hours of manual data entry a week, hijacking viral video moments for lucrative affiliate deals, or packaging custom AI support workflows, ensure your value proposition is mathematically undeniable.
- Structure your offer with **Convex Asymmetry**: small downside (a few hours of focused setup) paired with uncapped, exponential upside (recurring $500/day cashflow or equity multipliers).

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
                ["Overhead & Margin", "Bloated Teams & 25% Thin Margins", "Zero Full-Time Staff & 96%+ Net Margins"],
                ["Execution Cadence", "Scattered Chaos & Distraction", "90-Minute Daily Monastic Deep Work Sprint"],
                ["Geographic Freedom", "Tethered to a Single Office or City", "100% Sovereign Global Location Independence"]
            ]

            financial_math = f"""The financial mechanics behind reaching **{target_metric}** are governed by cold, disciplined unit economics rather than hopeful optimism:

- **The Software & Media Arbitrage Model**:
  - Target Monthly Net Cashflow: **$15,000/Month ($180,000/Year)**
  - Daily Inflow Required: **$500/Day**
  - **Unit Scenario A (Subscription SaaS / Portal)**: 50 active recurring members @ $300/month = $15,000/month MRR.
  - **Unit Scenario B (High-Ticket Strategic Retainers)**: Exactly 6 B2B clients @ $2,500/month on automated maintenance agreements = $15,000/month MRR.
  - **Monthly Operational Software Overhead**:
    - Cloud Infrastructure & API Tokens: ~$60/month
    - Domain, Hosting & SSL Security: ~$25/month
    - Stripe & Payment Processing: 2.9% per transaction
    - **Total Net Profit Margin: 96.8% ($14,500+ Take-Home Monthly Cash)**

- **The 36-Month Capital Compounding Curve**:
  - By strictly maintaining a flat personal cost of living and banking $12,000+ in surplus cashflow every month, you accumulate **$144,000 in liquid capital in your first 12 months**.
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
                "summary": f"{l_title} — Cinematic breakdown, narrative case study, decision matrix, and financial model.",
                "slides": slides,
                "writtenLesson": written
            })
            
        modules_output.append({
            "id": f"m-{m_num}",
            "number": m_num,
            "title": m_title,
            "subtitle": f"Act {m_num} · 4 Scenes",
            "description": m_desc,
            "duration": f"{sum(l[3] for l in m['lessons'])} min",
            "lessonsCount": len(lessons_list),
            "lessons": lessons_list
        })
        
    const_prefix = file_name.upper().replace("-", "_")
    data_code = f"""import type {{ Course, Module, Lesson, Slide }} from "../playbooks-data";

export const {const_prefix}_ID = "{course_id}";
export const {const_prefix}_SLUG = "{slug}";
export const {const_prefix}_TITLE = {json.dumps(title)};

export const {const_prefix}_MODULES: Module[] = {json.dumps(modules_output, indent=2)};

export const {const_prefix}_COURSE: Course = {{
  id: {const_prefix}_ID,
  slug: {const_prefix}_SLUG as any,
  categorySlug: "ai-businesses",
  categoryName: "AI Businesses",
  title: {const_prefix}_TITLE,
  shortTitle: {json.dumps(title[:32])},
  audience: "Entrepreneurs, Creators & Sovereign Operators" as any,
  targetGender: "for-all" as any,
  headline: {json.dumps(short_desc)},
  subheadline: {json.dumps(short_desc)},
  description: {json.dumps(full_desc)},
  price: 3,
  originalPrice: 9,
  currency: "USD",
  badge: "{pb['badge']}",
  rating: {pb['rating']},
  ratingCount: {pb['rating_count']},
  hoursOfMaterial: "{hours_of_material}",
  modulesCount: {const_prefix}_MODULES.length,
  lessonsCount: {const_prefix}_MODULES.reduce((acc, m) => acc + m.lessons.length, 0),
  slidesCount: {const_prefix}_MODULES.reduce((acc, m) => acc + m.lessons.length, 0) * 4,
  primaryColor: "#0f172a",
  accentColor: "#f59e0b",
  outcomes: [
    "Master the narrative-driven, cinematic framework of {title}",
    "Deploy step-by-step systems to reach {target_metric} with extreme net margins",
    "Acquire high-value clients and buyers organically without spending on paid ads",
    "Escape the middle-class hamster wheel and achieve lasting geographic and temporal sovereignty"
  ],
  modules: {const_prefix}_MODULES,
  testimonials: {json.dumps(COMMON_STORY_TESTIMONIALS_COURSE, indent=2)},
  faqs: {json.dumps(COMMON_STORY_FAQS, indent=2)}
}};
"""
    data_path = f"src/lib/playbooks/{file_name}-data.ts"
    with open(data_path, "w", encoding="utf-8") as f:
        f.write(data_code)
    print(f"Generated {data_path} successfully ({len(modules_output)} modules, {len(modules_output)*4} lessons, {len(modules_output)*16} slides).")
    
    what_you_will_learn = [
        f"Master the complete storytelling and execution framework of {title}",
        f"Implement battle-tested workflows designed to generate {target_metric}",
        "Eradicate low-leverage linear work and deploy asymmetric leverage (media, code, capital, systems)",
        "Eliminate expensive advertising costs with permission-based organic pull funnels",
        "Structure high-margin retainers and digital assets yielding 95%+ net profit margins",
        "Operate your entire solo enterprise in 90 minutes of focused daily deep work",
        "Overcome psychological bottlenecks, lifestyle creep, and shiny object syndrome",
        "Build an unshakeable family fortress with liquid cashflow and sovereign wealth preservation"
    ]
    
    detail_code = f"""import type {{ PlaybookDetailData }} from "../dating-playbook-detail";
import {{ {const_prefix}_MODULES }} from "./{file_name}-data";

export const {const_prefix}_DETAIL_DATA: PlaybookDetailData = {{
  id: "{course_id}",
  slug: "{slug}",
  title: {json.dumps(title)},
  headline: {json.dumps(short_desc)},
  description: {json.dumps(full_desc)},
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "{pb['badge']}",
  rating: {pb['rating']},
  ratingCount: {pb['rating_count']},
  studentsCount: "{pb['students']}",
  instructorName: "Plugd Sovereign Team",
  instructorTitle: "Wealth Architects & Sovereign Systems Operators",
  instructorBio: "The Plugd Sovereign Team decodes seven- and eight-figure business models into cinematic, narrative-driven educational masterclasses for high-agency founders.",
  instructorRating: {pb['rating']},
  instructorReviews: "{pb['rating_count']}",
  instructorStudents: "{pb['students']}",
  instructorCourses: 8,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "{hours_of_material}",
  modulesCount: {len(modules)},
  lessonsCount: {len(modules) * 4},
  slidesCount: {len(modules) * 16},
  whatYouWillLearn: {json.dumps(what_you_will_learn, indent=4)},
  relatedTopics: [
    "Wealth Creation",
    "Sovereign Mindset",
    "High-Income Skills",
    "Financial Freedom",
    "Digital Assets",
    "Solopreneurship"
  ],
  requirements: [
    "A computer with an internet connection and an unshakeable desire for freedom",
    "No previous coding, business degree, or financial background required",
    "Willingness to execute the daily 90-minute monastic deep work protocol"
  ],
  descriptionSections: {{
    intro: [
      {json.dumps(full_desc)},
      "Every single lesson in this cinematic {len(modules)}-Act storytelling masterclass combines immersive, movie-like executive slides with deep written case breakdowns, hard mathematical unit economics, and actionable battle checklists.",
      "Engineered specifically for ambitious operators and founders determined to break out of the matrix and claim undeniable sovereignty in 2026."
    ],
    keyPointsTitle: "The {len(modules)}-Act Storytelling Curriculum",
    keyPoints: {json.dumps([f"Act {m['num']}: {m['title']}" for m in modules], indent=6)},
    closing: [
      "Every lesson includes both presentation slides and a comprehensive written implementation guide.",
      "Stop trading time for linear wages. Step into the arena and claim your sovereign financial independence today."
    ]
  }},
  targetAudience: {json.dumps(pb['target_audience'], indent=4)},
  includes: [
    {{ iconName: "layers", text: "{len(modules)} Structured Acts & {len(modules) * 4} Cinematic Scenes" }},
    {{ iconName: "presentation", text: "{len(modules) * 16} Visual Presentation Slides & {len(modules) * 4} In-Depth Written Guides" }},
    {{ iconName: "video", text: "Ready-to-Deploy Strategic Prompts, SOP Blueprints & Diagnostic Teardowns" }},
    {{ iconName: "infinity", text: "Lifetime Access & Continuous Curriculum Updates" }},
    {{ iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }}
  ],
  testimonials: {json.dumps(COMMON_STORY_TESTIMONIALS_DETAIL, indent=2)},
  faqs: {json.dumps(COMMON_STORY_FAQS, indent=2)},
  modules: {const_prefix}_MODULES.map((mod) => ({{
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
    detail_path = f"src/lib/playbooks/{file_name}-detail.ts"
    with open(detail_path, "w", encoding="utf-8") as f:
        f.write(detail_code)
    print(f"Generated {detail_path} successfully.")

if __name__ == "__main__":
    for pb in ALL_BATCH_2_PLAYBOOKS:
        print(f"\nProcessing {pb['title']}...")
        generate_batch_2_playbook_files(pb)
    print("\nALL 8 BATCH 2 PLAYBOOKS GENERATED SUCCESSFULLY WITH STORYTELLING ARCHITECTURE!")
