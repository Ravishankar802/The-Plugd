import json
import os
from build_helpers import make_rich_slide, build_written_lesson, COURSE_TESTIMONIALS, DETAIL_TESTIMONIALS, COMMON_FAQS
from generate_all_playbooks_configs import ALL_PLAYBOOKS_CONFIG

def generate_playbook_files(pb):
    file_name = pb["file_name"]
    course_id = pb["course_id"]
    slug = pb["slug"]
    title = pb["title"]
    short_desc = pb["short_desc"]
    full_desc = pb["full_desc"]
    modules = pb["modules"]
    
    is_13k = "13k" in slug or "13,500" in title
    target_income = "$13,500/Month ($162,000/Year)" if is_13k else "$10,000/Month ($120,000/Year)"
    target_short = "$13k+/Month" if is_13k else "$10k+/Month"
    
    modules_output = []
    
    for m in modules:
        m_num = m["num"]
        m_title = m["title"]
        m_desc = m["desc"]
        lessons_list = []
        
        for l_id, l_num, l_title, l_dur in m["lessons"]:
            slides = [
                make_rich_slide(
                    f"s-{l_id}-1", 1,
                    f"FRAMEWORK OVERVIEW // {m_num}",
                    f"Core Foundation: {l_title}",
                    f"Strategic architectural context and execution models for {title}.",
                    f"Master the fundamental lever in {l_title} to build a durable {target_short} solo enterprise.",
                    [
                        {"number": "01", "title": "Strategic Clarity", "description": f"Cut through market noise and identify the high-leverage mechanism inside {l_title}."},
                        {"number": "02", "title": "Zero Ad Dependency", "description": "Preserve 95%+ net profit margins by eliminating paid customer acquisition and speculative advertising."},
                        {"number": "03", "title": "Operational Simplicity", "description": "Build repeatable systems that execute reliably without manual overhead or full-time employees."},
                        {"number": "04", "title": "Compounding Leverage", "description": "Every workflow asset, digital playbook, or client partnership deployed compounds your revenue trajectory over time."}
                    ],
                    diagram={
                        "title": f"Operational Architecture: {l_title}",
                        "steps": [
                            {"step": "01", "title": "Context Setup", "desc": "Define exact constraints & target ICP"},
                            {"step": "02", "title": "Workflow Build", "desc": "Implement automated AI logic & templates"},
                            {"step": "03", "title": "Value Delivery", "desc": "Execute frictionless audit / pilot / launch"},
                            {"step": "04", "title": "Revenue Scale", "desc": f"Lock in predictable {target_short} recurring income"}
                        ]
                    },
                    chart={
                        "title": "Efficiency & Margin Multiplier Across Execution Tiers",
                        "data": [
                            {"label": "Traditional Manual Process", "value": "25% Output", "barPct": 25, "badge": "High Labor"},
                            {"label": "Ad-Dependent Acquisition", "value": "42% Margin", "barPct": 42, "badge": "Ad Burn"},
                            {"label": "Automated Solo Engine", "value": "94% Speed", "barPct": 94, "badge": "Autonomous"},
                            {"label": "Net Profit Margin Yield", "value": "96% Net", "barPct": 96, "badge": "Pure Cashflow"}
                        ]
                    }
                ),
                make_rich_slide(
                    f"s-{l_id}-2", 2,
                    "TACTICAL BLUEPRINT",
                    f"Step-by-Step Implementation: {l_title}",
                    "Exact technical instructions, workflows, prompt schemas, and configuration parameters.",
                    "Friction is the enemy of execution. Simplify every interface so that delivery occurs effortlessly.",
                    [
                        {"number": "01", "title": "Identify Core Friction", "description": "Pinpoint the exact manual bottleneck or cognitive friction that prevents progress."},
                        {"number": "02", "title": "Deploy Specialized Logic", "description": "Configure purpose-built AI prompts, XML schemas, or automation recipes tailored to the task."},
                        {"number": "03", "title": "Verify Output Quality", "description": "Run automated regression checks and quality gates before presenting the deliverable to stakeholders."},
                        {"number": "04", "title": "Standardize SOP", "description": "Document the entire pipeline into a modular markdown guide for instant repeatable execution."}
                    ],
                    metrics=[
                        {"label": "Implementation Time", "val": "< 45 Mins", "change": "-80% vs traditional", "note": "Fast deployment"},
                        {"label": "Target Success Rate", "val": "92%", "change": "+34% repeatability", "note": "Tested SOP"},
                        {"label": "Monthly Margin", "val": "95% Net", "change": "Zero payroll overhead", "note": "Owner cash"},
                        {"label": "Target Revenue Velocity", "val": target_short, "change": "Compounding MRR", "note": "Scalable model"}
                    ]
                ),
                make_rich_slide(
                    f"s-{l_id}-3", 3,
                    "ECONOMIC BLUEPRINT",
                    f"The Financial Model to {target_short}",
                    "Granular breakdown of unit economics, client pricing structures, and sustainable cashflow targets.",
                    f"Reaching {target_short} does not require complexity. It requires disciplined pricing and predictable customer math.",
                    [
                        {"number": "01", "title": "High-Ticket Retainers", "description": "Package ongoing optimization into $2,000–$2,500/month retainers, requiring only 4–5 clients to cross the milestone."},
                        {"number": "02", "title": "Asymmetric Rev-Shares", "description": "For creator partnerships, a 30% cut of a $45,000 launch yields exactly $13,500 from a single 7-day sprint."},
                        {"number": "03", "title": "Leveraged Digital Sales", "description": "Selling 200 copies/month of a $50 digital asset yields $10,000/month with zero ongoing fulfillment labor."},
                        {"number": "04", "title": "Overhead Cap", "description": "Capping software and infrastructure costs below $200/month guarantees that over 90% of revenue flows to net income."}
                    ],
                    chart={
                        "title": f"Progressive Revenue Milestones to {target_short}",
                        "data": [
                            {"label": "Foundation Phase (Month 1)", "value": "$2,500/mo", "barPct": 25, "badge": "Validation"},
                            {"label": "Validation Phase (Month 2)", "value": "$5,000/mo", "barPct": 50, "badge": "Traction"},
                            {"label": "Expansion Phase (Month 3)", "value": "$8,500/mo", "barPct": 85, "badge": "Compounding"},
                            {"label": "Scale Milestone (Month 4+)", "value": "$13,500/mo" if is_13k else "$10,000/mo", "barPct": 100, "badge": "Target Reached"}
                        ]
                    }
                ),
                make_rich_slide(
                    f"s-{l_id}-4", 4,
                    "RISK MITIGATION",
                    "Common Failure Modes & Systemic Safeguards",
                    "Proactive defenses against cognitive fatigue, tool lock-in, client pushback, and operational churn.",
                    "Always design for worst-case scenarios. Build error-handling and automated fallbacks directly into your systems.",
                    [
                        {"number": "01", "title": "Context Pollution", "description": "Prevent AI degradation by enforcing clean thread resets and modular system memory files."},
                        {"number": "02", "title": "Commodity Traps", "description": "Never sell raw prompts or generic deliverables; always bundle custom domain logic and measurable ROI."},
                        {"number": "03", "title": "Scope Expansion", "description": "Protect delivery timelines by strictly defining deliverables in upfront milestone agreements."},
                        {"number": "04", "title": "Client Retention", "description": "Integrate your solutions deep into the client's operational stack, making replacement costly and disruptive."}
                    ]
                )
            ]
            
            context = f"""In the rapidly evolving landscape of solo entrepreneurship and generative artificial intelligence, the gap between operators who achieve true financial leverage and those who burn out from repetitive manual tasks comes down to one principle: structural systemization.

In this lesson, **{l_title}**, we dive deep into the specific architecture required to execute this component of **{title}**. Whether you are deploying advanced generative AI reasoning, configuring autonomous background workflows, or packaging high-ticket B2B solutions, every operational step must be engineered for consistency, predictability, and margin preservation.

Most operators make the fatal mistake of treating tools like Claude, ChatGPT, or no-code automation platforms as simple novelty chat interfaces or isolated scripting utilities. In reality, these platforms serve as your executive digital workforce—capable of executing complex multi-step reasoning, automating customer discovery, drafting production code, and managing multi-tier B2B pipelines when properly calibrated.

By understanding the conceptual underpinnings of **{l_title}**, you eliminate guesswork, protect your working capital, and build an enterprise foundation capable of delivering {target_short} in dependable monthly revenue with zero employees and minimal operational overhead."""

            steps = f"""To implement the strategies in **{l_title}** with production rigor, execute the following four-phase operational roadmap:

1. **System Calibration & Environment Hardening**:
   - Establish the primary operational parameters for this workflow. Configure dedicated environment variables, persistent system memory prompts, and structured input/output constraints.
   - If deploying AI reasoning models (such as Claude 3.5 Sonnet or OpenAI o1), provide comprehensive background context using structured XML or Markdown tags (e.g., `<operational_context>`, `<quality_criteria>`, `<output_format>`). Ensure the model is instructed to challenge assumptions, avoid sycophantic agreement, and provide critical trade-off analysis.

2. **Modular Workflow Assembly & Pipeline Execution**:
   - Break down the core deliverable into discrete, testable sub-modules. Never attempt to generate or execute an entire complex asset in a single monolithic prompt or unstructured session.
   - For customer acquisition and outreach, structure your pipeline into a 3-step value progression: (a) identify verified operational triggers, (b) generate bespoke 3-minute video audits or customized POCs, and (c) deliver permission-based, low-friction communications.
   - For digital product packaging, utilize specialized AI engines to conduct deep domain synthesis, generate comprehensive curriculum frameworks, and export clean, production-ready documentation without manual re-typing.

3. **Quality Assurance, Regression Testing & Error Handling**:
   - Establish strict validation gates before delivering work to clients, partners, or customers. Run output through a rigorous verification checklist: Does this solve an immediate operational bottleneck? Are the unit economics realistic? Is the formatting consistent with executive standards?
   - Implement diagnostic fallbacks for common failure points such as API rate limits, context degradation, or client scope creep.

4. **Integration into the Monthly Revenue Engine**:
   - Directly tie the completed workflow to your financial milestone of {target_short}. Package the system into an ongoing maintenance retainer, an asymmetric revenue-share agreement on Whop, or an automated digital product funnel.
   - Document every repeatable procedure into a standardized operating procedure (SOP) to ensure zero cognitive friction during future iterations."""

            table_headers = ["Implementation Tier", "Operational Focus", "Tool Stack", "Weekly Time Investment", "Expected Yield"]
            table_rows = [
                ["Level 1: Foundation", "Initial Setup & Calibration", "Claude / ChatGPT / Notion", "3–5 Hours", "Validated Asset"],
                ["Level 2: Active Pipeline", "Client Acquisition & Delivery", "Loom / Clay / Smartlead", "6–8 Hours", "$2,500–$5,000/mo"],
                ["Level 3: Leveraged Scale", "Retainers & Asset Monetization", "Whop / Make.com / Airtable", "8–12 Hours", f"{target_short} Recurring"],
                ["Level 4: Systematized Autonomy", "Automated Background Agents", "Co-Work / Dispatch / Custom GPTs", "4 Hours", f"95%+ Net Margin Yield"]
            ]

            economics = f"""The financial mechanics of reaching **{target_income}** are grounded in disciplined unit economics and high-margin leverage:

- **The High-Ticket B2B Service Model**:
  - Requires exactly **4 to 5 clients paying $2,000 to $2,500/month** on an ongoing optimization retainer.
  - Gross Revenue: $10,000 to $12,500/month
  - Total Monthly Software Overhead: ~$200/month (LLM subscriptions, automation platform, CRM, communication tools)
  - **Net Profit Margin: 96% to 98% (Net Owner Take-Home: $9,800–$12,300/month)**

- **The Creator Revenue-Share Model (Shadow Operating)**:
  - Partner with a micro-creator with 35,000 engaged followers in a passionate niche.
  - Launch a $150 premium digital curriculum/community on Whop.
  - At a modest 0.85% audience conversion (300 purchases): Total Gross Revenue = $45,000.
  - On an agreed 30% shadow operator revenue split: **Your Cashflow = $13,500 in Month 1**.
  - Ongoing backend membership upsells ($49/month) provide compounding monthly recurring revenue with zero ad spend.

- **The Leveraged Digital Product Model**:
  - Build once, sell forever with zero ongoing manufacturing or fulfillment labor.
  - Selling 200 units per month at $50 yields exactly **$10,000/month** with 98% gross margins.
  - Eliminating paid advertising ensures that virtually every dollar collected directly strengthens your balance sheet."""

            failure_rows = [
                ["Cognitive Overload / Distraction", "Attempting to pursue 5 different business models simultaneously.", "Enforce the Rule of Ones: 1 target audience, 1 core offer, 1 acquisition channel until crossing $10k/month."],
                ["Context Window Degradation", "Continuing long, multi-topic threads until the AI hallucinates.", "Reset threads frequently; store permanent project instructions in modular markdown files."],
                ["Premature Paid Advertising", "Spending capital on ads before validating commercial product-market fit.", "Rely 100% on zero-ad organic acquisition: direct audits, partner flywheels, and community infiltration."],
                ["Underpricing and Commoditization", "Selling low-ticket $100 one-off deliverables that require non-stop hunting.", "Package high-ticket transformations anchored to client ROI ($2,000/mo) or high-upside revenue shares."]
            ]

            exercise = f"""**Step 1: Protocol Calibration**: Define the exact operational objective of this lesson within your current business stack. Document your ICP, your primary tool stack, and your key success criteria.
**Step 2: Execution Sprint**: Implement the step-by-step workflow detailed in Section 2. Complete 1 full execution cycle (record 1 audit, configure 1 custom instruction set, or draft 1 module).
**Step 3: Verification & Polish**: Review the deliverable against the failure modes table. Eliminate fluff, ensure mathematical accuracy, and verify that all instructions are actionable.
**Step 4: Commercial Deployment**: Publish or deliver the asset directly to your target audience, client prospect, or partner pipeline."""

            takeaways = [
                ("Operational Discipline", "Systems beat willpower every single time. Build repeatable pipelines rather than relying on spontaneous effort."),
                ("Margin Protection", "By avoiding paid advertising and high employee overhead, your business generates 90%+ net profit margins."),
                ("The High-Leverage Benchmark", f"Reaching {target_short} is an engineering formula, not an elusive mystery. Focus on high-ticket retainers, creator splits, or digital assets."),
                ("Continuous Iteration", "Track feedback systematically, eliminate operational friction, and compound your digital advantages daily.")
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
  audience: "Entrepreneurs, Creators & Solo Operators" as any,
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
  hoursOfMaterial: "{pb['hours_of_material']}",
  modulesCount: {const_prefix}_MODULES.length,
  lessonsCount: {const_prefix}_MODULES.reduce((acc, m) => acc + m.lessons.length, 0),
  slidesCount: {const_prefix}_MODULES.reduce((acc, m) => acc + m.lessons.length, 0) * 4,
  primaryColor: "#0f172a",
  accentColor: "#2563eb",
  outcomes: [
    "Master the complete end-to-end framework of {title}",
    "Deploy step-by-step AI workflows with zero coding or machine learning experience",
    "Acquire high-ticket B2B clients and creator partners without running paid ads",
    "Scale to a predictable {target_short} solo business with 95%+ net profit margins"
  ],
  modules: {const_prefix}_MODULES,
  testimonials: {json.dumps(COURSE_TESTIMONIALS, indent=2)},
  faqs: {json.dumps(COMMON_FAQS, indent=2)}
}};
"""
    data_path = f"src/lib/playbooks/{file_name}-data.ts"
    with open(data_path, "w", encoding="utf-8") as f:
        f.write(data_code)
    print(f"Generated {data_path} successfully.")
    
    what_you_will_learn = [
        f"Master the end-to-end framework of {title}",
        f"Implement step-by-step workflows with zero coding or machine learning background required",
        f"Deploy specialized tools and generative models with production-grade prompt architectures",
        f"Eliminate expensive paid advertising with proven organic, zero-ad customer acquisition",
        f"Package high-ticket consulting retainers and digital assets yielding {target_short}",
        "Run an entire solo enterprise with software overhead capped at under $200/month",
        "Overcome common cognitive biases, tool limitations, and client negotiation objections",
        f"Follow the exact milestone roadmap to reach {target_income} with zero employees"
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
  instructorName: "Plugd Enterprise Team",
  instructorTitle: "Senior AI Systems Architects & Solo Strategists",
  instructorBio: "The Plugd Enterprise Team advises founders, solo operators, and creators on deploying high-margin AI workflows, zero-ad client acquisition flywheels, and scalable digital assets.",
  instructorRating: {pb['rating']},
  instructorReviews: "{pb['rating_count']}",
  instructorStudents: "{pb['students']}",
  instructorCourses: 5,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "{pb['hours_of_material']}",
  modulesCount: {len(modules)},
  lessonsCount: {len(modules) * 4},
  slidesCount: {len(modules) * 16},
  whatYouWillLearn: {json.dumps(what_you_will_learn, indent=4)},
  relatedTopics: [
    "AI Businesses",
    "Solopreneurship",
    "Generative AI",
    "Client Acquisition",
    "Digital Products",
    "Workflow Automation"
  ],
  requirements: [
    "A computer with a web browser and reliable internet connection",
    "No previous coding, machine learning, or software development experience required",
    "Commitment to execute the step-by-step practical implementation exercises"
  ],
  descriptionSections: {{
    intro: [
      {json.dumps(full_desc)},
      "Every single lesson in this comprehensive {len(modules)}-module curriculum combines interactive executive presentation slides with deep, step-by-step written implementation blueprints, unit economics calculations, and real-world failure mitigation strategies.",
      "Engineered specifically for solo operators and founders looking to build a sustainable, highly lucrative business with 95%+ net profit margins."
    ],
    keyPointsTitle: "The {len(modules)}-Module Comprehensive Curriculum",
    keyPoints: {json.dumps([f"Module {m['num']}: {m['title']}" for m in modules], indent=6)},
    closing: [
      "Every lesson includes both presentation slides and a comprehensive written implementation guide.",
      "Eliminate confusion, master the practical systems, and begin executing your solo enterprise today."
    ]
  }},
  targetAudience: {json.dumps(pb['target_audience'], indent=4)},
  includes: [
    {{ iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" }},
    {{ iconName: "file-text", text: "Interactive Slide Presentations & Deep Written Implementation Guides" }},
    {{ iconName: "video", text: "Ready-to-Deploy Prompt Schemas, Tool Configs & Outreach Scripts" }},
    {{ iconName: "infinity", text: "Lifetime Access & Continuous Curriculum Updates" }},
    {{ iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }}
  ],
  testimonials: {json.dumps(DETAIL_TESTIMONIALS, indent=2)},
  faqs: {json.dumps(COMMON_FAQS, indent=2)},
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
    for pb in ALL_PLAYBOOKS_CONFIG:
        print(f"Processing {pb['title']}...")
        generate_playbook_files(pb)
    print("\nALL 6 PLAYBOOKS GENERATED SUCCESSFULLY WITH UPDATED TYPING!")
