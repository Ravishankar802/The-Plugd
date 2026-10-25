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
        "title": "Interactive Artifacts & Commercializing to $10,000/Month",
        "desc": "Eliminate frontend bottlenecks by generating interactive React dashboards with Claude Artifacts, packaging solutions into $2,500 retainers, and scaling a solo agency.",
        "lessons": [
            ("06-1", "06.1", "Artifacts Architecture: Real-Time Interactive Code Compilation", 18),
            ("06-2", "06.2", "Prototyping Production Web Apps & Dashboards in Under 10 Minutes", 20),
            ("06-3", "06.3", "Packaging Claude Systems into $2,500/Month High-Ticket Services", 21),
            ("06-4", "06.4", "The 4-Client Path to $10,000/Month Recurring Solopreneurship", 22),
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
        "title": "Enterprise Knowledge Ingestion & Advanced Retrieval Workflows",
        "desc": "Clean and chunk proprietary enterprise documents, eliminate hallucinations with structured grounding, and connect GPTs to Notion, Slack, and Google Drive.",
        "lessons": [
            ("07-1", "07.1", "Cleaning and Chunking Enterprise Knowledge Bases for Custom GPTs", 18),
            ("07-2", "07.2", "Semantic Search & Vector Retrieval Grounding to Eliminate Hallucinations", 20),
            ("07-3", "07.3", "Integrating Custom GPTs with Notion, Slack, and Google Drive", 19),
            ("07-4", "07.4", "Automated Knowledge Refresh Pipelines & Access Control Security", 21),
        ]
    },
    {
        "num": "08",
        "title": "Monetizing ChatGPT Expertise to $10,000/Month Solo Income",
        "desc": "Package your deep ChatGPT mastery into high-margin consulting offers, corporate workflow integrations, and sustainable $10,000/month recurring income.",
        "lessons": [
            ("08-1", "08.1", "The Commercial AI Architect: Auditing High-Cost Corporate Inefficiencies", 20),
            ("08-2", "08.2", "Selling Custom GPT Implementation Packages for $3,500 Upfront", 21),
            ("08-3", "08.3", "The $10,000/Month Retainer Model: Maintenance, Tuning & Optimization", 22),
            ("08-4", "08.4", "The Solo Executive Playbook: Managing 4 Retainers with 10 Hours/Week", 20),
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
            ("05-3", "05.4", "AI Cold Outreach Personalization & Deliverability Guardrails", 20),
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
        "title": "Client Acquisition & Deal Closing for Beginners",
        "desc": "Overcome imposter syndrome and acquire paying clients without ad spend using 3-minute video audits, risk-free pilots, and upfront contract execution.",
        "lessons": [
            ("07-1", "07.1", "The Beginner's Zero-Ad Client Acquisition Playbook", 18),
            ("07-2", "07.2", "Conducting 15-Minute Video Audits That Close Deals Organically", 20),
            ("07-3", "07.3", "Overcoming Imposter Syndrome & Experience Objections", 19),
            ("07-4", "07.4", "The Contract & Upfront Payment Collection Protocol", 21),
        ]
    },
    {
        "num": "08",
        "title": "The $10,000/Month Solo Blueprint: Systems, Stacking & Autonomy",
        "desc": "Map out your exact milestone roadmap, control software overhead under $200/month, and scale cleanly to $10,000+/month with zero employees.",
        "lessons": [
            ("08-1", "08.1", "Unit Economics Comparison: Which of the 5 Models Hits $10k Fastest", 20),
            ("08-2", "08.2", "Avoiding Operational Chaos: Scaling 1 Model to $10k Before Stacking", 19),
            ("08-3", "08.3", "The $180/Month Solo Tech Stack: Running 95%+ Net Margins", 18),
            ("08-4", "08.4", "The 90-Day Beginner Execution Calendar: From Zero to $10,000/Month", 22),
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
        "title": "B-Tier Upgrades & Moat Building: Escaping Commodity Slop",
        "desc": "Navigate the crowded middle tier of AI clipping, website design, and micro-SaaS by transitioning from commoditized deliverables to revenue-generating outcomes.",
        "lessons": [
            ("04-1", "04.1", "AI Short-Form Video: Escaping the Low-Price Race to the Bottom", 18),
            ("04-2", "04.2", "AI Websites: Selling Customer Conversion Rather Than Pretty Pixels", 19),
            ("04-3", "04.3", "Building Custom Client SOP Systems That Cannot Be Cloned", 20),
            ("04-4", "04.4", "Pivoting B-Tier Skills into High-Ticket Bundled Service Packages", 21),
        ]
    },
    {
        "num": "05",
        "title": "Zero-Ad Client Acquisition & The Trojan Horse Audit",
        "desc": "Sign high-paying business clients without running paid ads using 3-minute video audits, hiring trigger detection, and risk-reversal guarantees.",
        "lessons": [
            ("05-1", "05.1", "The 3-Minute Video Audit That Exposes Expensive Manual Bottlenecks", 19),
            ("05-2", "05.2", "Hiring Trigger Scouring: Pitching Solutions to Actively Hiring Teams", 21),
            ("05-3", "05.3", "Risk-Reversal Guarantees: 'Measurable ROI in 14 Days or Full Refund'", 20),
            ("05-4", "05.4", "Converting Initial Project Audits into $2,000/Month Ongoing Retainers", 22),
        ]
    },
    {
        "num": "06",
        "title": "The 2026 Solo Operator Playbook: Scaling to $10,000/Month",
        "desc": "Execute the mathematical blueprint to $10,000/month recurring income with just 4 to 5 high-ticket B2B clients and an automated daily routine.",
        "lessons": [
            ("06-1", "06.1", "Unit Economics: 4 Clients @ $2,500/mo vs 10 Clients @ $1,000/mo", 21),
            ("06-2", "06.2", "The 90-Minute Daily Execution Protocol for Part-Time Operators", 19),
            ("06-3", "06.3", "Streamlining Fulfillment: Automated Client Onboarding & Reporting", 20),
            ("06-4", "06.4", "Scaling Beyond $10k: Transitioning from Side Hustle to Full Independence", 22),
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
            ("02-2", "02.2", "Vetting Creators: Filtering for True High-Engagement Fanbases", 20),
            ("02-3", "02.3", "Red Flags to Avoid: Podcasters, Entertainment & Disengaged Followings", 18),
            ("02-4", "02.4", "Building Your 20-Creator High-Probability Target Roster", 21),
        ]
    },
    {
        "num": "03",
        "title": "The Value-First Zero-Risk Pitch Framework",
        "desc": "Structure an irresistible, no-brainer proposal that lands top micro-creators by assuming 100% of the financial and production risk upfront.",
        "lessons": [
            ("03-1", "03.1", "The No-Risk Pitch Architecture: 'I Do 100% of the Work, You Keep 70%'", 20),
            ("03-2", "03.2", "Outreach Script Engineering: Email, Instagram DM & Loom Teardowns", 19),
            ("03-3", "03.3", "Handling Creator Skepticism: Proving Competence Before Signing", 21),
            ("03-4", "03.4", "The Standard 70/30 Revenue-Share Legal Term Sheet", 18),
        ]
    },
    {
        "num": "04",
        "title": "The 4-Hour AI Digital Product & Curriculum Assembly Line",
        "desc": "Synthesize the creator's best YouTube videos and posts into high-value video masterclasses, worksheets, and slide decks in a single afternoon using AI.",
        "lessons": [
            ("04-1", "04.1", "Ingesting Creator Content: Transcripts to Structured Curriculum", 20),
            ("04-2", "04.2", "Drafting High-Converting Presentation Decks & Written Guides with AI", 22),
            ("04-3", "04.3", "Generating Workbooks, Checklists & Actionable Implementation Frameworks", 19),
            ("04-4", "04.4", "Packaging the $150 Flagship Course Deliverable in Under 4 Hours", 21),
        ]
    },
    {
        "num": "05",
        "title": "The Organic Launch Blueprint: Infiltrating the Creator's Audience",
        "desc": "Orchestrate a high-converting 7-day launch campaign across the creator's social channels using organic teaser posts, stories, and countdown sequences.",
        "lessons": [
            ("05-1", "05.1", "The 7-Day Organic Launch Sequence Architecture", 20),
            ("05-2", "05.2", "Drafting High-Converting Instagram Stories, YouTube Community Posts & Tweets", 19),
            ("05-3", "05.3", "Scarcity & Urgency Triggers: 48-Hour Founding Member Pricing Sprints", 21),
            ("05-4", "05.4", "Executing the 300-Buyer Milestone on Launch Day ($45,000 Gross / $13,500 Take-Home)", 22),
        ]
    },
    {
        "num": "06",
        "title": "Automated Operations, Whop/Skool Infrastructure & Delivery",
        "desc": "Set up frictionless digital storefronts, automated payment processing, instant member onboarding, and zero-headache customer support.",
        "lessons": [
            ("06-1", "06.1", "Whop vs Skool vs Stan Store: Choosing the Optimal Checkout Platform", 18),
            ("06-2", "06.2", "Automating License Provisioning, Member Onboarding & Welcome DMs", 20),
            ("06-3", "06.3", "Setting Up AI-Powered Student Support Agents to Handle Questions 24/7", 19),
            ("06-4", "06.4", "Automated Accounting & Split-Payout P&L Tracking", 17),
        ]
    },
    {
        "num": "07",
        "title": "Compounding Partnerships: Scaling to $13,500–$25,000/Month",
        "desc": "Transition single launches into evergreen monthly subscriptions, sign complementary creators, and build a multi-creator digital education network.",
        "lessons": [
            ("07-1", "07.1", "Evergreen Funnel Architecture: Converting Daily Traffic into Daily Sales", 21),
            ("07-2", "07.2", "Adding a $49/Month Community Tier to Build Predictable MRR", 20),
            ("07-3", "07.3", "Signing Your 2nd and 3rd Creator Partners Using Real Proof of Revenue", 22),
            ("07-4", "07.4", "The Autonomous Portfolio Model: Running Multiple Creators in 15 Hours/Week", 23),
        ]
    }
]

P8_MODULES = [
    {
        "num": "01",
        "title": "The One-Person Business Architecture & The Solopreneur Mindset",
        "desc": "Deconstruct the advantages of a zero-employee, high-margin solo operation, dismantle capital fallacies, and adopt the ruthless founder psychology.",
        "lessons": [
            ("01-1", "01.1", "Why the 1-Person Business Beats Traditional Startups in 2026", 17),
            ("01-2", "01.2", "The 95%+ Margin Rule: Eliminating Salaries, Offices & Overhead", 19),
            ("01-3", "01.3", "Founder Psychology: Moving from Employee Mindset to Autonomous Operator", 18),
            ("01-4", "01.4", "The Anti-Burnout Operating Cadence: Working 4 Deep Hours Daily", 20),
        ]
    },
    {
        "num": "02",
        "title": "Selecting Your Unfair Advantage & The Specific Knowledge Niche",
        "desc": "Audit your natural competencies, identify high-ticket market problems, and position your offer at the intersection of skill, leverage, and demand.",
        "lessons": [
            ("02-1", "02.1", "The Specific Knowledge Audit: Identifying What Feels Like Play to You", 18),
            ("02-2", "02.2", "Evaluating Market Willingness to Pay: The Urgent vs Nice-to-Have Test", 20),
            ("02-3", "02.3", "Defining the Narrow ICP Sniper Persona: Target Wealthy Operators", 19),
            ("02-4", "02.4", "Competitor Teardown: Finding Uncontested White Space in Saturated Markets", 21),
        ]
    },
    {
        "num": "03",
        "title": "Crafting the Irresistible Minimum Viable Offer (MVO)",
        "desc": "Package your core expertise into a crystal-clear, high-ticket solution with bold risk-reversal guarantees that make saying yes completely frictionless.",
        "lessons": [
            ("03-1", "03.1", "The Minimum Viable Offer Framework: Selling Outcomes, Never Hours", 19),
            ("03-2", "03.2", "Pricing Psychology: Anchoring Your Service at $2,000–$2,500/Month", 21),
            ("03-3", "03.3", "Risk-Reversal Guarantees: Eliminating Buyer Hesitation Instantly", 20),
            ("03-4", "03.4", "Drafting the One-Page Scope of Work & Deliverables Agreement", 18),
        ]
    },
    {
        "num": "04",
        "title": "The Frictionless Sales Funnel & High-Converting Landing Page",
        "desc": "Build a minimalist, high-converting digital storefront using Framer, Stripe, and Loom that converts qualified prospects into booked appointments.",
        "lessons": [
            ("04-1", "04.1", "The Minimalist 1-Page Funnel: Clean Copy That Drives Action", 18),
            ("04-2", "04.2", "Recording the 2-Minute Founder Loom Video That Sells For You", 20),
            ("04-3", "04.3", "Cal.com & Stripe Checkout Integration: Removing All Sales Friction", 17),
            ("04-4", "04.4", "Tracking Conversion Analytics & Eliminating Drop-Off Bottlenecks", 19),
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
        "title": "Client Delivery, Extreme Quality & Referral Loops",
        "desc": "Over-deliver dramatically in the first 7 days, eliminate buyer remorse with proactive progress reports, and turn single clients into referral flywheels.",
        "lessons": [
            ("07-1", "07.1", "Over-Delivering in the First 7 Days to Cement Client Loyalty", 19),
            ("07-2", "07.2", "Eliminating Buyer Remorse with Proactive Progress Reports", 18),
            ("07-3", "07.3", "The Asymmetrical Referral Ask: Turning 1 Client into 3", 20),
            ("07-4", "07.4", "Collecting Video Testimonials That Convert Cold Traffic", 21),
        ]
    },
    {
        "num": "08",
        "title": "The Step-by-Step Roadmap from $0 to $10,000/Month",
        "desc": "Follow the structured 3-milestone sequence from your first $1,000 in revenue to a dependable, sustainable $10,000/month solo business empire.",
        "lessons": [
            ("08-1", "08.1", "Milestone 1: Crossing Your First $1,000 (The Psychological Anchor)", 19),
            ("08-2", "08.2", "Milestone 2: Scaling from $1,000 to $3,000/Month (Systematizing Delivery)", 20),
            ("08-3", "08.3", "Milestone 3: Scaling from $3,000 to $10,000/Month (Retention & Volume)", 22),
            ("08-4", "08.4", "The Sustainable Solo Empire: Autonomy, Time Freedom & Lasting Wealth", 21),
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
        "hours_of_material": "6.5 hours",
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
        "hours_of_material": "8.0 hours",
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
        "hours_of_material": "8.5 hours",
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
        "hours_of_material": "6.5 hours",
        "badge": "Trending",
        "rating": 4.8,
        "rating_count": 348,
        "students": "1,390",
        "target_audience": [
            "Side hustlers confused by conflicting online claims about AI income opportunities",
            "Operators who want to avoid commoditized AI deliverables and build real pricing power",
            "Professionals seeking an S-tier workflow automation agency model with $1,000/month retainers",
            "Creators wanting to turn curated niche industry content into profitable media assets"
        ]
    },
    {
        "file_name": "copy-paste-13k",
        "course_id": "ai-businesses-07",
        "slug": "copy-paste-this-strategy-to-make-13k-month-with-ai-in-2026",
        "title": "Copy & Paste THIS Strategy to Make $13k/Month with AI in 2026",
        "short_desc": "A step-by-step masterclass on partnering with micro-creators on 70/30 revenue-share digital product launches yielding $13,500+/month with zero audience.",
        "full_desc": "The definitive blueprint for the AI Shadow Operating model. Discover how to identify and partner with 30k–50k follower micro-creators, turn their existing content into $150 digital courses using AI in 4 hours, execute a 7-day organic launch to 300 buyers, and generate $13,500/month in net revenue-share income without showing your face or building a personal following.",
        "modules": P7_MODULES,
        "hours_of_material": "7.5 hours",
        "badge": "High Demand",
        "rating": 4.9,
        "rating_count": 476,
        "students": "1,820",
        "target_audience": [
            "Individuals who want to build a $13k+/month online income without building a personal brand",
            "Growth operators who want to leverage existing creator attention rather than fighting for algorithms",
            "Product builders who want to create and launch profitable digital courses in under 4 hours with AI",
            "Operators looking for asymmetric revenue-share deals with 70/30 creator profit splits"
        ]
    },
    {
        "file_name": "one-person-business",
        "course_id": "ai-businesses-08",
        "slug": "build-a-one-person-business-as-a-beginner-from-0-to-10k",
        "title": "Build A One-Person Business As A Beginner (From $0 To $10K)",
        "short_desc": "The complete zero-to-$10k roadmap for beginner solo founders: finding specific knowledge, crafting an MVO, setting up a 1-page funnel, and scaling with AI.",
        "full_desc": "A comprehensive operational blueprint guiding first-time entrepreneurs from absolute zero to $10,000/month. Discover how to identify your unfair advantage, package a minimum viable offer at $2,000/month, build a frictionless 1-page conversion funnel, acquire clients without ad spend, automate delivery with AI, and maintain extreme 95%+ profit margins.",
        "modules": P8_MODULES,
        "hours_of_material": "8.5 hours",
        "badge": "Founder Pick",
        "rating": 4.9,
        "rating_count": 528,
        "students": "2,380",
        "target_audience": [
            "Aspiring solopreneurs stuck in analysis paralysis who need a verified zero-to-$10k blueprint",
            "Employees planning a clean, low-risk transition from corporate employment to solo autonomy",
            "Service providers wanting to escape the hourly billing trap and sell high-ticket outcomes",
            "Beginner founders wanting to keep software overhead under $100/month with zero staff"
        ]
    }
]
