import json

P3_MODULES = [
    {
        "num": "01",
        "title": "Account Permanence & The Memory Calibration Protocol",
        "desc": "Establish unshakeable account infrastructure, prevent devastating memory loss, and execute the self-discovery interview that calibrates Claude into your executive digital clone.",
        "lessons": [
            ("01-1", "01.1", "The Permanent Email Architecture & Account Preservation", 15),
            ("01-2", "01.2", "The 10-Question Personal Memory Calibration Interview", 18),
            ("01-3", "01.3", "System Prompt Engineering for Claude 3.5 Sonnet", 17),
            ("01-4", "01.4", "Overcoming Context Amnesia with Structured Memory Markdown", 19),
        ]
    },
    {
        "num": "02",
        "title": "Model Architecture & Token Economy: Haiku vs Sonnet vs Opus",
        "desc": "Master the distinct strengths, speed differentials, token costs, and usage reset limits across the Anthropic model spectrum to optimize throughput.",
        "lessons": [
            ("02-1", "02.1", "The Triad Matrix: When to Deploy Haiku, Sonnet 3.5, and Opus", 16),
            ("02-2", "02.2", "Usage Limit Engineering: Avoiding Mid-Task Lockout Sprints", 18),
            ("02-3", "02.3", "Deep Research Mode: Scouring the Web for Structured Intelligence", 20),
            ("02-4", "02.4", "Cost-Yield Optimization: Maximizing Token Value Per Dollar", 17),
        ]
    },
    {
        "num": "03",
        "title": "Context Window Architecture: The Reality of Claude Projects",
        "desc": "Deconstruct why naive Claude Projects cause cognitive degradation, how to maintain thread hygiene, and how to structure project knowledge bases without context poisoning.",
        "lessons": [
            ("03-1", "03.1", "Why Naive Claude Projects Fail & The Thread Contamination Trap", 18),
            ("03-2", "03.2", "Structured Project Knowledge: XML Schema & Modular Files", 20),
            ("03-3", "03.3", "Thread Hygiene Protocols & Context Compaction Workflows", 17),
            ("03-4", "03.4", "Maintaining Multi-Step Reasoning Focus Across Long Horizons", 19),
        ]
    },
    {
        "num": "04",
        "title": "Connectors & Real-World Operating Integration",
        "desc": "Bridge Claude directly to your operational ecosystem via Gmail, Google Calendar, and live connectors to build an 80% personal assistant for $20/month.",
        "lessons": [
            ("04-1", "04.1", "Setting Up Native Connectors: Gmail & Google Calendar Integration", 18),
            ("04-2", "04.2", "Calendar Defense: Automated Schedule Triage & Time-Blocking", 19),
            ("04-3", "04.3", "Asynchronous Email Triage & Inbox Zero Execution Engine", 21),
            ("04-4", "04.4", "Meeting Preparation Intelligence: Automated Dossier Generation", 17),
        ]
    },
    {
        "num": "05",
        "title": "Desktop Co-Work & Remote Dispatch Automation",
        "desc": "Transform Claude from a chat interface into an autonomous desktop assistant using local file manipulation, Co-work execution, and mobile QR dispatch.",
        "lessons": [
            ("05-1", "05.1", "Claude Co-Work: Autonomous Desktop & Local Workspace Execution", 22),
            ("05-2", "05.2", "Dispatch Architecture: Remote Mobile-to-Desktop Job Triggering", 20),
            ("05-3", "05.3", "Overnight Autonomous Batch Processing & Headless Task Execution", 19),
            ("05-4", "05.4", "Jarvis-Style Multi-Step Tool Orchestration & Guardrails", 21),
        ]
    },
    {
        "num": "06",
        "title": "Interactive Artifacts & Rapid Full-Stack Prototyping",
        "desc": "Eliminate frontend engineering and UI design bottlenecks by commanding Claude Artifacts to generate interactive React dashboards, games, and visual tools.",
        "lessons": [
            ("06-1", "06.1", "Artifacts Architecture: Real-Time Interactive Code Compilation", 18),
            ("06-2", "06.2", "Prototyping Production Web Apps & Dashboards in Under 10 Minutes", 20),
            ("06-3", "06.3", "Claude Design: Bypassing Graphic Designers for Commercial Assets", 19),
            ("06-4", "06.4", "Exporting Artifacts to Production Next.js & Tailwind Systems", 21),
        ]
    },
    {
        "num": "07",
        "title": "Commercializing Claude Systems: Scaling to $10,000/Month",
        "desc": "Package advanced Claude workflows into high-ticket B2B operational transformations, client internal copilots, and predictable $10,000/month recurring retainers.",
        "lessons": [
            ("07-1", "07.1", "Packaging Claude Workflows as High-Ticket $2,500 Setup Services", 20),
            ("07-2", "07.2", "The 4-Client Path to $10,000/Month Recurring Maintenance Retainers", 22),
            ("07-3", "07.3", "Auditing Client Bottlenecks & Presenting the Operational ROI", 19),
            ("07-4", "07.4", "The Autonomous Solo Operator Cadence: Running a 95% Margin Agency", 21),
        ]
    }
]

P4_MODULES = [
    {
        "num": "01",
        "title": "Custom Instructions & Personalization Architecture",
        "desc": "Unlock the hidden settings engine to configure permanent context, eradicate AI generic clichés, and establish an unshakeable operational persona.",
        "lessons": [
            ("01-1", "01.1", "The Hidden Settings Menu: Personalization & Memory Calibration", 16),
            ("01-2", "01.2", "Profile Engineering: What ChatGPT Must Permanently Know About You", 18),
            ("01-3", "01.3", "Defining Output Formatting: Tone, Structure, Constraints, and Style", 17),
            ("01-4", "01.4", "Eradicating Corporate AI Clichés & Generic Fluff Forever", 19),
        ]
    },
    {
        "num": "02",
        "title": "Countering Sycophancy & The Devil's Advocate Protocol",
        "desc": "Neutralize ChatGPT's natural tendency to agree with your flawed assumptions by deploying ruthless counter-factual reasoning and stress-testing frameworks.",
        "lessons": [
            ("02-1", "02.1", "The Sycophancy Problem: Why ChatGPT Agrees with Flawed Ideas", 17),
            ("02-2", "02.2", "The Devil's Advocate Prompting Framework for Critical Stress-Testing", 19),
            ("02-3", "02.3", "Red-Teaming Business Decisions & Strategic Hypothesis Inversion", 20),
            ("02-4", "02.4", "Extracting Unbiased Risk Matrices Before Capital Deployment", 18),
        ]
    },
    {
        "num": "03",
        "title": "Multi-Mode Orchestration: GPT-4o vs OpenAI o1 & o3-Mini",
        "desc": "Break out of the standard chat box by commanding specialized reasoning models, real-time web search modes, and active recall study frameworks.",
        "lessons": [
            ("03-1", "03.1", "The 98% Mistake: Why Default Standard Mode Kills Productivity", 18),
            ("03-2", "03.2", "OpenAI o1 & o3-Mini: Chain-of-Thought Deep Algorithmic Reasoning", 20),
            ("03-3", "03.3", "Study Mode & Active Recall: Socratic Knowledge Acceleration", 19),
            ("03-4", "03.4", "Real-Time Search Mode: Live Web Synthesis & Market Intelligence", 17),
        ]
    },
    {
        "num": "04",
        "title": "Mobile Audio Hub & Walking Brainstorming Workflows",
        "desc": "Transform dead commute and transit hours into multi-thousand-dollar business assets by establishing a synchronized hub-and-spoke voice operating system.",
        "lessons": [
            ("04-1", "04.1", "The Hub-and-Spoke Architecture: Desktop Engine + Mobile Audio Node", 17),
            ("04-2", "04.2", "On-The-Go Synthesis: Voice Brainstorming to Structured Executables", 19),
            ("04-3", "04.3", "Instant Audio Transcription & Automatic Sync to Notion/Docs", 18),
            ("04-4", "04.4", "Executing High-Velocity Daily Reviews via Hands-Free Voice Prompts", 20),
        ]
    },
    {
        "num": "05",
        "title": "Scheduled Automations & Autonomous Screen Control",
        "desc": "Delegate repetitive data entry, browser tasks, and morning executive briefings to automated scheduled prompts and autonomous screen execution agents.",
        "lessons": [
            ("05-1", "05.1", "Scheduled Prompts: Setting Up Automated Morning Briefing Engines", 19),
            ("05-2", "05.2", "Automating Competitor Telemetry & Industry Opportunity Scanning", 21),
            ("05-3", "05.3", "Desktop Screen Autonomy: Delegating Repetitive Browser Work", 22),
            ("05-4", "05.4", "Form Submissions, Data Extraction & Autonomous Pipeline Triage", 18),
        ]
    },
    {
        "num": "06",
        "title": "Specialist Custom GPTs & API Tool-Calling Architecture",
        "desc": "Build, configure, and monetize private Custom GPTs equipped with proprietary knowledge bases and external REST API integrations.",
        "lessons": [
            ("06-1", "06.1", "Generalist vs Specialist GPTs: Assembling Your Autonomous Brain Trust", 18),
            ("06-2", "06.2", "Architecting Enterprise Custom GPTs with Structured Knowledge Files", 20),
            ("06-3", "06.3", "Connecting Custom Actions via OpenAPI Specifications & Webhooks", 22),
            ("06-4", "06.4", "Distributing & Licensing Proprietary GPTs to B2B Clients", 19),
        ]
    },
    {
        "num": "07",
        "title": "Monetizing ChatGPT Expertise to $10,000/Month Solo Income",
        "desc": "Package your deep ChatGPT mastery into high-margin consulting offers, corporate workflow integrations, and sustainable $10,000/month recurring income.",
        "lessons": [
            ("07-1", "07.1", "The Commercial AI Architect: Auditing High-Cost Corporate Inefficiencies", 20),
            ("07-2", "07.2", "Selling Custom GPT Implementation Packages for $3,500 Upfront", 21),
            ("07-3", "07.3", "The $10,000/Month Retainer Model: Maintenance, Tuning & Optimization", 22),
            ("07-4", "07.4", "The Solo Executive Playbook: Managing 4 Retainers with 10 Hours/Week", 20),
        ]
    }
]

P5_MODULES = [
    {
        "num": "01",
        "title": "The 5-Criteria Evaluation Matrix & Model Selection",
        "desc": "Filter out fleeting AI fads by evaluating the 5 legitimate business models through Longevity, Effort, Scalability, Autonomy, and Profit Margin.",
        "lessons": [
            ("01-1", "01.1", "The 5-Criteria Matrix: Longevity, Effort, Scalability, Autonomy, Margin", 16),
            ("01-2", "01.2", "The Fundamental Law: 'AI Is Not the Business, AI Is Leverage'", 17),
            ("01-3", "01.3", "Selecting Your Primary Vehicle Based on Available Capital & Time", 19),
            ("01-4", "01.4", "The 14-Day Fast-Start Validation Sprint: Securing First Cashflow", 18),
        ]
    },
    {
        "num": "02",
        "title": "Proven Model #1: AI User-Generated Content (UGC) for E-Commerce",
        "desc": "Capitalize on the massive e-commerce advertising demand by generating hyper-realistic synthetic UGC video variations for high-spending D2C brands.",
        "lessons": [
            ("02-1", "02.1", "The E-Commerce UGC Boom: Why Billion-Dollar Brands Need AI Video", 18),
            ("02-2", "02.2", "Generating Photorealistic UGC Actors & Voice Sync (HeyGen/Kling)", 20),
            ("02-3", "02.3", "Packaging 10 AI UGC Ad Variations for $1,000–$1,500 Deliverables", 19),
            ("02-4", "02.4", "Direct E-Commerce Brand Outreach & Retainer Retargeting", 21),
        ]
    },
    {
        "num": "03",
        "title": "Proven Model #2: AI Website Modernization for Local Businesses",
        "desc": "Help brick-and-mortar service businesses escape outdated Facebook pages by delivering high-converting 5-page modern websites in under 90 minutes.",
        "lessons": [
            ("03-1", "03.1", "The Local Business Gap: Millions Operating on Facebook Pages", 18),
            ("03-2", "03.2", "Rapid 5-Page AI Site Generation in 90 Minutes (Framer + Relume)", 20),
            ("03-3", "03.3", "Selling Outcomes Over Code: Framing Local Inbound Lead Value", 19),
            ("03-4", "03.4", "Closing Local Plumbers, Gyms & Dentists at $1,500 + $150/mo Hosting", 22),
        ]
    },
    {
        "num": "04",
        "title": "Proven Model #3: AI Short-Form Content & Clipping for Creators",
        "desc": "Turn long-form YouTube videos and podcasts into high-engagement viral clips for established creators with automated clipping and dynamic subtitle tools.",
        "lessons": [
            ("04-1", "04.1", "The Creator Attention Economy: Why Podcasters Desperately Need Clips", 17),
            ("04-2", "04.2", "Automated Clip Curation & Subtitle Generation (Opus Clip + Submagic)", 19),
            ("04-3", "04.3", "Transitioning from Low-Ticket Clipper to Strategic Distribution Partner", 20),
            ("04-4", "04.4", "Securing 3 Long-Term Podcaster Retainers @ $1,500/Month Each", 21),
        ]
    },
    {
        "num": "05",
        "title": "Proven Model #4: AI B2B Lead Generation & Automated Outreach",
        "desc": "Build automated prospect scraping, enrichment, and personalized cold outreach pipelines that deliver high-value booked sales meetings to B2B companies.",
        "lessons": [
            ("05-1", "05.1", "Why B2B Lead Generation Commands the Highest Agency Retainers", 19),
            ("05-2", "05.2", "Building Automated Scraping & Enrichment Lists (Apollo + Clay)", 21),
            ("05-3", "05.3", "AI Cold Outreach Personalization & Deliverability Guardrails", 20),
            ("05-4", "05.4", "Performance Pricing: Charging $2,500/mo + $100 Per Qualified Meeting", 22),
        ]
    },
    {
        "num": "06",
        "title": "Proven Model #5: AI Digital Products & Niche Playbooks",
        "desc": "Unlock the only business model with a 5/5 Autonomy Score by building, packaging, and monetizing proprietary digital playbooks that sell on autopilot.",
        "lessons": [
            ("06-1", "06.1", "The 5/5 Autonomy Score: The Power of 'Build Once, Sell Forever'", 18),
            ("06-2", "06.2", "Rapid Curriculum Research & Asset Drafting with Specialized AI Tools", 20),
            ("06-3", "06.3", "Partnering with Micro-Creators on 70/30 Revenue Share Product Launches", 21),
            ("06-4", "06.4", "Scaling to 200 Sales/Month @ $50 to Generate $10,000/Month Net Profit", 22),
        ]
    },
    {
        "num": "07",
        "title": "The $10,000/Month Solo Blueprint: Stacking & Operating",
        "desc": "Map out your exact milestone roadmap, control software overhead under $200/month, and scale cleanly to $10,000+/month with zero employees.",
        "lessons": [
            ("07-1", "07.1", "Unit Economics Comparison: Which of the 5 Models Hits $10k Fastest", 20),
            ("07-2", "07.2", "Avoiding Operational Chaos: Scaling 1 Model to $10k Before Stacking", 19),
            ("07-3", "07.3", "The $180/Month Solo Tech Stack: Running 95%+ Net Margins", 18),
            ("07-4", "07.4", "The 90-Day Beginner Execution Calendar: From Zero to $10,000/Month", 22),
        ]
    }
]

P6_MODULES = [
    {
        "num": "01",
        "title": "The 2026 Side Hustle Tier List & Market Reality Check",
        "desc": "Examine the unfiltered 17 side hustle ranking from S-tier to F-tier, identify dead-end commodity traps, and internalize why AI is infrastructure, not the business.",
        "lessons": [
            ("01-1", "01.1", "The 2026 Tier List: S-Tier to F-Tier Unfiltered Breakdown", 17),
            ("01-2", "01.2", "Why AI Trading Bots & Prompt Packs are Dead Ends (F-Tier & D-Tier)", 18),
            ("01-3", "01.3", "The Core Law: 'The Internet is Infrastructure; AI is Infrastructure'", 19),
            ("01-4", "01.4", "Identifying High-Pain Operational Problems Businesses Urgently Pay to Fix", 20),
        ]
    },
    {
        "num": "02",
        "title": "S-Tier Dominance: AI Workflow Automation Agencies",
        "desc": "Unpack the highest-leverage business model on the tier list: building custom backend workflow integrations that save companies hundreds of operational hours.",
        "lessons": [
            ("02-1", "02.1", "Why Workflow Automation Sits at S-Tier: Measurable Hours Saved", 19),
            ("02-2", "02.2", "The Core Integration Triad: Make.com + Airtable + Claude API", 21),
            ("02-3", "02.3", "The 30-Second Speed-to-Lead Engine: Converting Inbound Inquiries", 20),
            ("02-4", "02.4", "Pricing S-Tier Automations at $3,000 Setup + $1,000/mo Retainers", 22),
        ]
    },
    {
        "num": "03",
        "title": "A-Tier High-Yield Models: B2B Lead Gen & Niche Media Assets",
        "desc": "Deploy appointment generation engines and automated niche newsletters that build tangible digital enterprise value with strong pricing power.",
        "lessons": [
            ("03-1", "03.1", "A-Tier Economics: Why Qualified B2B Sales Meetings Command Top Dollar", 18),
            ("03-2", "03.2", "Automated Niche Industry Newsletters & Content Curation Pipelines", 20),
            ("03-3", "03.3", "Building Proprietary B2B Directory Assets & Verified Data Vaults", 19),
            ("03-4", "03.4", "Securing Corporate Newsletter Sponsors & Long-Term Contracts", 21),
        ]
    },
    {
        "num": "04",
        "title": "B-Tier Traps & Strategic Upgrades: Content, Sites & Micro-SaaS",
        "desc": "Navigate the crowded middle tier of AI clipping, website design, and micro-SaaS by transitioning from commoditized deliverables to revenue-generating outcomes.",
        "lessons": [
            ("04-1", "04.1", "AI Short-Form Video: Escaping the Low-Price Race to the Bottom", 18),
            ("04-2", "04.2", "AI Websites: Selling Customer Conversion Rather Than Pretty Pixels", 19),
            ("04-3", "04.3", "The Micro-SaaS Trap: Why Distribution Always Trumps Coding Speed", 21),
            ("04-4", "04.4", "Pivoting B-Tier Skills into High-Ticket Bundled Service Packages", 20),
        ]
    },
    {
        "num": "05",
        "title": "Escaping Commodity Status: Eliminating AI Slop & Building Moats",
        "desc": "Build uncopyable competitive moats by blending artificial intelligence with human synthesis, custom business logic, and proprietary client SOPs.",
        "lessons": [
            ("05-1", "05.1", "The Dangers of Low-Barrier AI Services: Why Copycats Fail", 18),
            ("05-2", "05.2", "Injecting Proprietary Domain Logic & Bespoke Human Oversight", 20),
            ("05-3", "05.3", "Building Custom Client SOP Systems That Cannot Be Cloned", 19),
            ("05-4", "05.4", "Creating High Switching Costs to Guarantee Client Retention", 21),
        ]
    },
    {
        "num": "06",
        "title": "Zero-Ad Client Acquisition & The Trojan Horse Audit",
        "desc": "Sign high-paying business clients without running paid ads using 3-minute video audits, hiring trigger detection, and risk-reversal guarantees.",
        "lessons": [
            ("06-1", "06.1", "The 3-Minute Video Audit That Exposes Expensive Manual Bottlenecks", 19),
            ("06-2", "06.2", "Hiring Trigger Scouring: Pitching Solutions to Actively Hiring Teams", 21),
            ("06-3", "06.3", "Risk-Reversal Guarantees: 'Measurable ROI in 14 Days or Full Refund'", 20),
            ("06-4", "06.4", "Converting Initial Project Audits into $2,000/Month Ongoing Retainers", 22),
        ]
    },
    {
        "num": "07",
        "title": "The 2026 Solo Operator Playbook: Scaling to $10,000/Month",
        "desc": "Execute the mathematical blueprint to $10,000/month recurring income with just 4 to 5 high-ticket B2B clients and an automated daily routine.",
        "lessons": [
            ("07-1", "07.1", "Unit Economics: 4 Clients @ $2,500/mo vs 10 Clients @ $1,000/mo", 21),
            ("07-2", "07.2", "The 90-Minute Daily Execution Protocol for Part-Time Operators", 19),
            ("07-3", "07.3", "Streamlining Fulfillment: Automated Client Onboarding & Reporting", 20),
            ("07-4", "07.4", "Scaling Beyond $10k: Transitioning from Side Hustle to Full Independence", 22),
        ]
    }
]

P7_MODULES = [
    {
        "num": "01",
        "title": "The Micro-Creator Goldmine & The $13,500/Month Math",
        "desc": "Discover the massive untapped market of 30k–50k follower micro-creators and the exact mathematical formula that yields $13,500/month from a single partnership.",
        "lessons": [
            ("01-1", "01.1", "The Micro-Creator Opportunity: Why 30k–50k Follower Accounts Win", 18),
            ("01-2", "01.2", "The Exact $13,500 Math: 300 Buyers @ $150 with a 30% Rev-Share", 21),
            ("01-3", "01.3", "Why Passionate Creators Struggle to Monetize Beyond Free Gifts", 19),
            ("01-4", "01.4", "The AI Shadow Operator Model: Zero Audience & Zero Face Required", 20),
        ]
    },
    {
        "num": "02",
        "title": "The Starving Crowd Principle & Creator Vetting",
        "desc": "Identify obsessive micro-niches with passionate, credit-card-ready followings, and audit engagement metrics to separate vanity numbers from true buyers.",
        "lessons": [
            ("02-1", "02.1", "The Starving Crowd Principle: Why Audience Trumps Product Perfection", 19),
            ("02-2", "02.2", "Targeting High-Converting Micro-Niches (Matcha, Jiu-Jitsu, Coffee, Excel)", 21),
            ("02-3", "02.3", "Auditing Creator Followings: Spotting Fake Engagement and Bot Traffic", 20),
            ("02-4", "02.4", "The 5-Point Creator Qualification Scorecard Before Pitching", 18),
        ]
    },
    {
        "num": "03",
        "title": "Specialized AI Tools & Rapid Digital Product Packaging",
        "desc": "Leverage specialized generative tools to research, structure, and assemble world-class digital playbooks and community assets in under 72 hours.",
        "lessons": [
            ("03-1", "03.1", "Synthesize AI & Specialized Knowledge Engines: Zero-to-Draft in 48 Hours", 20),
            ("03-2", "03.2", "Structuring Premium Digital Assets: Playbooks, Toolkits & SOP Vaults", 21),
            ("03-3", "03.3", "Deploying on Whop: 1-Click Payments, Gated Access & Frictionless Onboarding", 22),
            ("03-4", "03.4", "Pricing Psychology: Why Under $1,000 Is Inexpensive in Knowledge Commerce", 19),
        ]
    },
    {
        "num": "04",
        "title": "The 70/30 Creator Partnership Pitch & Legal Architecture",
        "desc": "Approach micro-creators with an irresistible 'zero cost, pure upside' proposal, overcome brand protection objections, and lock in seamless automated payouts.",
        "lessons": [
            ("04-1", "04.1", "The 'Zero Cost, Pure Upside' Pitch: Turning Skeptics into Partners", 19),
            ("04-2", "04.2", "The 3-Sentence Direct Message & Email Script That Books Calls", 20),
            ("04-3", "04.3", "Structuring the 70/30 Split Agreement & Automated Whop Payouts", 21),
            ("04-4", "04.4", "Overcoming Creator Hesitations: Protecting Authenticity & Community Trust", 18),
        ]
    },
    {
        "num": "05",
        "title": "The 7-Day Organic Launch Sequence on Creator Socials",
        "desc": "Execute a high-converting, non-salesy 7-day warm-up sequence across the creator's social channels to generate overwhelming organic launch day demand.",
        "lessons": [
            ("05-1", "05.1", "The 7-Day Story & Reel Warm-Up Architecture: Curiosity Over Pitching", 20),
            ("05-2", "05.2", "Deploying Inbound Comment Triggers & Automated DM Funnels", 21),
            ("05-3", "05.3", "The Live Q&A Pre-Launch Event: Demonstrating Massive Proof", 19),
            ("05-4", "05.4", "Executing Launch Day: Scarcity Mechanics, Fast-Action Bonuses & Urgency", 22),
        ]
    },
    {
        "num": "06",
        "title": "Backend Membership Retention & Recurring MRR Stacking",
        "desc": "Transform one-time buyers into loyal recurring members paying $49/month, gamify community participation, and automate member support with custom AI bots.",
        "lessons": [
            ("06-1", "06.1", "The Backend Upsell: Converting $150 One-Time Buyers into $49/mo Members", 20),
            ("06-2", "06.2", "Gamifying Community Retention: Streaks, Leaderboards & Monthly Challenges", 21),
            ("06-3", "06.3", "Automating Support & Moderation with Custom AI Community Assistants", 19),
            ("06-4", "06.4", "The Monthly Recurring Revenue (MRR) Compounding Flywheel", 22),
        ]
    },
    {
        "num": "07",
        "title": "Scaling to $25,000+/Month Across Multiple Creator Alliances",
        "desc": "Systematize your shadow operating workflows, manage 3 parallel creator partnerships in under 15 hours per week, and build an enduring, saleable asset.",
        "lessons": [
            ("07-1", "07.1", "Managing 3 Simultaneous Creator Partnerships with Lean AI Workflows", 22),
            ("07-2", "07.2", "The $150/Month Solo Tech Stack: Running at 98% Net Profit Margins", 19),
            ("07-3", "07.3", "Scaling from $13,500 to $25,000+/Month: The Expansion Playbook", 21),
            ("07-4", "07.4", "Enterprise Asset Value: Building a Saleable Digital Publishing Brand", 20),
        ]
    }
]

P8_MODULES = [
    {
        "num": "01",
        "title": "The Solopreneur Mindset & Eradicating Complexity",
        "desc": "Cut through the confusing online noise, escape the deadly trap of overcomplication, and focus exclusively on the single lever that produces $10,000/month.",
        "lessons": [
            ("01-1", "01.1", "The Trap of Overcomplication: Why Beginners Fail Before Launching", 17),
            ("01-2", "01.2", "The $10,000/Month North Star: Radical Clarity Over Feature Creep", 19),
            ("01-3", "01.3", "The Rule of Ones: 1 Target Customer, 1 High-Value Offer, 1 Channel", 18),
            ("01-4", "01.4", "Consistency Over Intelligence: Why Relentless Execution Trumps Strategy", 20),
        ]
    },
    {
        "num": "02",
        "title": "Rapid Offer Validation & The 7-Day Pre-Sale Framework",
        "desc": "Stop building products in isolation. Validate market demand in 7 days, conduct high-signal discovery interviews, and pre-sell your offer before writing code.",
        "lessons": [
            ("02-1", "02.1", "Ideas Are a Dime a Dozen: Validating True Commercial Demand in 7 Days", 18),
            ("02-2", "02.2", "Designing the Minimum Viable Offer (MVO) for Painful Problems", 20),
            ("02-3", "02.3", "Conducting 10 Customer Discovery Interviews to Uncover Bleeding Pain", 19),
            ("02-4", "02.4", "Securing Your First 3 Paid Beta Customers Before Building the Full Asset", 22),
        ]
    },
    {
        "num": "03",
        "title": "High-Resonance Messaging & The 'Talking Directly to Me' Effect",
        "desc": "Master the psychological copywriting frameworks that cause ideal prospects to stop scrolling and feel like you are speaking directly to their deepest struggles.",
        "lessons": [
            ("03-1", "03.1", "The 'Talking Directly to Me' Phenomenon: Extreme Target Specificity", 18),
            ("03-2", "03.2", "Crafting the Transformation Statement: Moving from Pain A to Outcome B", 20),
            ("03-3", "03.3", "Systematically Disarming Every Buyer Objection in Advance", 19),
            ("03-4", "03.4", "Building a High-Converting 1-Page Landing Funnel in Under 2 Hours", 21),
        ]
    },
    {
        "num": "04",
        "title": "The Build-Once, Sell-Forever Digital Asset Engine",
        "desc": "Escape the trading-time-for-dollars hamster wheel by transforming your expertise into scalable digital playbooks and automated membership communities.",
        "lessons": [
            ("04-1", "04.1", "Linear Time vs Digital Asset Leverage: The Compounding Cashflow Matrix", 19),
            ("04-2", "04.2", "Packaging High-Impact Playbooks, SOP Systems & Proprietary Toolkits", 21),
            ("04-3", "04.3", "Automated Onboarding & Frictionless Member Delivery with Zero Manual Work", 20),
            ("04-4", "04.4", "Case Study: Scaling to Multiple 5-Figures Monthly with 1 Digital Product", 22),
        ]
    },
    {
        "num": "05",
        "title": "Zero-Ad Customer Acquisition & Inbound Pull Content",
        "desc": "Attract highly qualified paying customers organically without spending on ads by publishing high-signal educational content and initiating friendly DMs.",
        "lessons": [
            ("05-1", "05.1", "The Zero-Budget Acquisition Flywheel: Organic Content & Direct Outreach", 18),
            ("05-2", "05.2", "Authoring High-Signal Educational Posts That Command Immediate Respect", 20),
            ("05-3", "05.3", "The 15-Minute Daily Inbound DM Conversation Blueprint", 19),
            ("05-4", "05.4", "Turning Casual Profile Visitors into Enthusiastic Paying Buyers", 21),
        ]
    },
    {
        "num": "06",
        "title": "Lean Operations, AI Automation & Deep Work Discipline",
        "desc": "Run your entire $10,000/month enterprise on an operating budget of under $100/month while working focused 4-hour deep work days powered by AI automation.",
        "lessons": [
            ("06-1", "06.1", "The Under-$100/Month Solo Tech Stack: Running with 95%+ Net Margins", 18),
            ("06-2", "06.2", "Automating Administrative Busywork, Billing & Customer Support with AI", 20),
            ("06-3", "06.3", "The 4-Hour Deep Work Routine: Protecting Mental Clarity & Creativity", 19),
            ("06-4", "06.4", "Ruthless Elimination: Saying No to Distractions, Shiny Objects & Complexity", 21),
        ]
    },
    {
        "num": "07",
        "title": "The Step-by-Step Roadmap from $0 to $10,000/Month",
        "desc": "Follow the structured 3-milestone sequence from your first $1,000 in revenue to a dependable, sustainable $10,000/month solo business empire.",
        "lessons": [
            ("07-1", "07.1", "Milestone 1: Crossing Your First $1,000 (The Psychological Anchor)", 19),
            ("07-2", "07.2", "Milestone 2: Scaling from $1,000 to $3,000/Month (Systematizing Delivery)", 20),
            ("07-3", "07.3", "Milestone 3: Scaling from $3,000 to $10,000/Month (Retention & Volume)", 22),
            ("07-4", "07.4", "The Sustainable Solo Empire: Autonomy, Time Freedom & Lasting Wealth", 21),
        ]
    }
]

ALL_PLAYBOOKS_CONFIG = [
    {
        "file_name": "claude-knowledge",
        "course_id": "ai-businesses-03",
        "slug": "give-me-26-minutes-ill-give-you-10000-hours-of-claude-knowledge",
        "title": "Give Me 26 Minutes, I'll Give You 10,000 Hours of Claude Knowledge",
        "short_desc": "A high-leverage distillation of advanced Claude 3.5 Sonnet capabilities, prompt architectures, memory calibration, Artifact prototyping, and desktop Co-work automation.",
        "full_desc": "A comprehensive, practical playbook distilling 10,000 hours of Anthropic Claude expertise into an actionable curriculum. Learn memory setup, Haiku vs Sonnet vs Opus token optimization, project context architecture, native Gmail/Calendar connectors, mobile dispatch, interactive React Artifacts, and building a $10,000/month workflow automation practice.",
        "modules": P3_MODULES,
        "badge": "Top Rated",
        "rating": 4.9,
        "rating_count": 420,
        "students": "1,650",
        "target_audience": [
            "Entrepreneurs who want to automate 80% of their operational tasks with Claude",
            "Professionals looking to transition from basic ChatGPT prompting to elite Claude Sonnet architecture",
            "Developers and designers who want to build and prototype full web apps in minutes with Artifacts",
            "Consultants aiming to package Claude workflow integrations into $10,000/month recurring retainers"
        ]
    },
    {
        "file_name": "chatgpt-knowledge",
        "course_id": "ai-businesses-04",
        "slug": "give-me-28-minutes-ill-give-you-10000-hours-of-chatgpt-knowledge",
        "title": "Give Me 28 Minutes, I'll Give You 10,000 Hours of ChatGPT Knowledge",
        "short_desc": "A concentrated masterclass on ChatGPT customization, counter-sycophancy Devil's Advocate reasoning, OpenAI o1/o3 architectures, scheduled automations, and Custom GPTs.",
        "full_desc": "An exhaustive, battle-tested masterclass decoding the advanced capabilities of ChatGPT. Move beyond standard chat into custom instructions, counteracting AI sycophancy with Devil's Advocate stress-testing, commanding OpenAI o1 and o3-mini reasoning, hands-free mobile audio synthesis, autonomous screen execution, and packaging Custom GPTs to hit $10,000+/month.",
        "modules": P4_MODULES,
        "badge": "Hot & New",
        "rating": 4.9,
        "rating_count": 395,
        "students": "1,510",
        "target_audience": [
            "Business owners who feel ChatGPT merely agrees with them and need rigorous critical feedback",
            "Solopreneurs wanting to build autonomous scheduled briefing and telemetry agents",
            "Operators looking to deploy Custom GPTs integrated with external REST APIs and knowledge bases",
            "AI consultants wanting to monetize proprietary GPT setups at $3,500 upfront + $1,000/mo"
        ]
    },
    {
        "file_name": "five-proven-ways",
        "course_id": "ai-businesses-05",
        "slug": "5-proven-ways-to-make-money-with-ai-no-experience",
        "title": "5 Proven Ways To Make Money With AI (No Experience)",
        "short_desc": "Five accessible, verified AI business models designed for complete beginners: AI UGC, local website modernization, video clipping, B2B lead generation, and digital playbooks.",
        "full_desc": "A grounded, realistic roadmap breaking down the 5 most viable AI business models for newcomers. Evaluated through the 5-criteria scorecard (Longevity, Effort, Scalability, Autonomy, Margin), this playbook details step-by-step implementation, tech stacks, client closing scripts, and exact unit economics to build a $10,000/month income stream with zero employees.",
        "modules": P5_MODULES,
        "badge": "Bestseller",
        "rating": 4.9,
        "rating_count": 512,
        "students": "2,140",
        "target_audience": [
            "Complete beginners who want to start a proven AI side hustle without coding experience",
            "Freelancers looking to replace low-paying gigs with high-ticket B2B retainers and digital assets",
            "Creators interested in partnering with podcasters and brands on video clipping and UGC",
            "Aspiring solopreneurs seeking a 5/5 autonomy business model that sells digital products 24/7"
        ]
    },
    {
        "file_name": "ai-side-hustles-2026",
        "course_id": "ai-businesses-06",
        "slug": "the-best-ai-side-hustles-to-start-in-2026-no-skills",
        "title": "The Best AI Side Hustles To Start In 2026 (No Skills)",
        "short_desc": "The definitive 2026 tier list ranking 17 side hustles from S-tier to F-tier, detailing how to avoid commodity AI slop and build high-ticket workflow automations and media assets.",
        "full_desc": "An unfiltered commercial breakdown ranking 17 popular AI side hustles. Learn why AI trading bots and generic prompt packs belong in F-tier, why workflow automations dominate S-tier, how to avoid the low-price race to the bottom, and how to close $2,500/month business clients using 3-minute video audits without spending money on ads.",
        "modules": P6_MODULES,
        "badge": "Trending",
        "rating": 4.8,
        "rating_count": 348,
        "students": "1,290",
        "target_audience": [
            "Side hustlers overwhelmed by conflicting online advice looking for an honest tier-list breakdown",
            "Operators looking to build high-margin S-tier Make.com and Claude workflow automations",
            "Content creators who want to build durable niche media assets and newsletters",
            "Full-time employees seeking a 90-minute daily operating cadence to scale an AI business to $10,000/mo"
        ]
    },
    {
        "file_name": "copy-paste-13k",
        "course_id": "ai-businesses-07",
        "slug": "copy-paste-this-strategy-to-make-13k-month-with-ai-in-2026",
        "title": "Copy & Paste THIS Strategy to Make $13k/Month with AI in 2026",
        "short_desc": "A step-by-step masterclass on partnering with 30k–50k micro-creators, launching digital knowledge assets on Whop, and generating $13,500/month on 70/30 revenue splits.",
        "full_desc": "The complete operational blueprint for the AI Shadow Operating model. Discover how to identify starving micro-audiences in high-passion niches, package premium digital playbooks using specialized AI tools in 72 hours, pitch creators on a zero-risk 70/30 revenue share, execute 7-day organic launch sequences on creator socials, and generate $13,500/month from a single partnership.",
        "modules": P7_MODULES,
        "badge": "High Demand",
        "rating": 4.9,
        "rating_count": 476,
        "students": "1,890",
        "target_audience": [
            "Aspiring operators who want to make $13,000+/month without having their own audience or showing their face",
            "Individuals looking to partner with micro-creators on asymmetric 70/30 revenue splits",
            "Digital marketers seeking to deploy high-converting community launches and playbooks on Whop",
            "Entrepreneurs wanting to stack recurring monthly memberships and compound cash flow"
        ]
    },
    {
        "file_name": "one-person-business",
        "course_id": "ai-businesses-08",
        "slug": "build-a-one-person-business-as-a-beginner-from-0-to-10k",
        "title": "Build A One-Person Business As A Beginner (From $0 To $10K)",
        "short_desc": "A grounded, fluff-free beginner roadmap for solo founders: avoiding overcomplication, validating offers in 7 days, building leverage with digital assets, and scaling from $0 to $10k.",
        "full_desc": "The definitive beginner's roadmap to building a profitable, stress-free solo business from scratch. Master the Rule of Ones (1 target audience, 1 core offer, 1 acquisition channel), validate painful customer problems in 7 days, craft messaging that speaks directly to ideal buyers, deploy build-once-sell-forever digital assets, and follow the 3 milestones to $10,000/month with zero employees.",
        "modules": P8_MODULES,
        "badge": "Founder Pick",
        "rating": 4.9,
        "rating_count": 528,
        "students": "2,350",
        "target_audience": [
            "Beginners overwhelmed by complex business models who want a simple, direct roadmap to $10k/month",
            "Solo founders wanting to validate their offer with real paying customers before investing months of work",
            "Freelancers ready to transition into build-once, sell-forever leveraged digital assets",
            "Individuals seeking time freedom, 4-hour deep work days, and an overhead under $100/month"
        ]
    }
]
