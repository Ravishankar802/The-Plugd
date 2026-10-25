import json

# ==============================================================================
# PLAYBOOK 1: These 3 AI Businesses Will Make You $10k+/Month (With Zero Employees)
# 7 Modules, 28 Lessons, 112 Slides, 7.5 Hours
# ==============================================================================
P1_MODULES = [
    {
        "num": "01",
        "title": "Act I: The Solopreneur Awakening & The $10k/Month Mathematical Threshold",
        "desc": "Deconstruct why the 20-person agency model is dead, calculate the precise unit economics of $10k/month, and master the 5-criteria business evaluation matrix.",
        "lessons": [
            ("01-1", "01.1", "The Collapse of Traditional Labor Leverage: Why 20-Person Agencies Die", 16),
            ("01-2", "01.2", "The 5-Criteria Matrix: Difficulty, Time, Scalability, Income & Stress", 18),
            ("01-3", "01.3", "The Cold Mathematical Reality of $10,000 Net Monthly Cashflow", 17),
            ("01-4", "01.4", "Selecting Your Single Asymmetric AI Vehicle for Immediate Execution", 19),
        ]
    },
    {
        "num": "02",
        "title": "Act II: Business #1: The AI Automation Agency (AAA) & Speed-to-Lead",
        "desc": "Unpack the highest-demand B2B offering: installing automated lead intake, qualification, and routing systems that solve the 5-minute lead response crisis for high-ticket businesses.",
        "lessons": [
            ("02-1", "02.1", "The Speed-to-Lead Bottleneck: Why Businesses Bleed 78% of Web Leads", 17),
            ("02-2", "02.2", "No-Code Infrastructure: Make.com, Airtable & OpenAI API Pipelines", 19),
            ("02-3", "02.3", "Building the Sub-60-Second Lead Qualifier & SMS Booking Engine", 20),
            ("02-4", "02.4", "Packaging the $2,500/mo Retainer: The 'Never Miss a Lead' Guarantee", 18),
        ]
    },
    {
        "num": "03",
        "title": "Act III: Business #2: The AI Content Studio & Algorithmic Creative Loops",
        "desc": "Build an asynchronous creative assembly line that churns out 30 high-converting short-form videos in 4 hours for busy founders and executives.",
        "lessons": [
            ("03-1", "03.1", "The Attention Deficit: Why Founders Fail at Short-Form Distribution", 17),
            ("03-2", "03.2", "The 4-Hour Assembly Line: Descript, Opus Clip, ElevenLabs & Midjourney", 19),
            ("03-3", "03.3", "Viral Script Engineering: Deconstructing Hooks that Hold Retention Past 5s", 18),
            ("03-4", "03.4", "Pricing for Retention: Selling $3,000/mo 30-Video Turnkey Content Packages", 20),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: Business #3: AI Shadow Operating & The 70/30 Creator Monetization Engine",
        "desc": "Partner with overlooked 15k–75k micro-creators who have high engagement but zero business systems, launching paid Skool communities on an asymmetric 70/30 revenue split.",
        "lessons": [
            ("04-1", "04.1", "The Shadow Operator Advantage: Monetizing Attention You Didn't Build", 18),
            ("04-2", "04.2", "Vetting Micro-Creators: The 15k–75k Sweet Spot & Audience Affinity", 20),
            ("04-3", "04.3", "Designing the High-LTV Paid Community & Digital Course on Skool", 19),
            ("04-4", "04.4", "The 70/30 Legal & Revenue Structure: Zero Upfront Capital Risk", 21),
        ]
    },
    {
        "num": "05",
        "title": "Act V: The Zero-Ad Client Acquisition Engine & High-Signal Teardowns",
        "desc": "Acquire high-ticket clients without spending on ads by recording 3-minute personalized Loom video audits that diagnose broken systems and prove value instantly.",
        "lessons": [
            ("05-1", "05.1", "The Anti-Cold-Pitch: Why Generic Templates End in Spam Folders", 18),
            ("05-2", "05.2", "The 3-Minute Diagnostic Loom: Identifying and Showing Broken Pipelines", 20),
            ("05-3", "05.3", "The 10-Touch Daily Monastic Outreach Protocol on LinkedIn & Twitter", 19),
            ("05-4", "05.4", "Turning 1 Pilot Client into 3 Inbound Referrals via Diagnostic Proof", 21),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: The High-Ticket Closing Protocol & Asymmetric Partner Contracts",
        "desc": "Command $2,500–$5,000 retainers on a single 25-minute strategy call using diagnostic sales frameworks that invert power dynamics.",
        "lessons": [
            ("06-1", "06.1", "The Diagnostic Sales Call: Inverting the Vendor-Client Power Dynamic", 19),
            ("06-2", "06.2", "Drafting Ironclad Service Level Agreements (SLAs) with Zero Scope Creep", 21),
            ("06-3", "06.3", "Automated Stripe Invoicing & Upfront Payment Architecture", 20),
            ("06-4", "06.4", "Handling Objections: Price, Skepticism, and 'We Can Build It Internally'", 22),
        ]
    },
    {
        "num": "07",
        "title": "Act VII: The Solo Scaling Roadmap: From $10k to Sovereign Holding Empire",
        "desc": "Standardize your client onboarding, cap monthly software overhead under $250, bank $9,500+ monthly net profit, and protect your wealth in sovereign liquid reserves.",
        "lessons": [
            ("07-1", "07.1", "The Under-$250/mo Software Overhead: Maximizing Net Take-Home Margin", 19),
            ("07-2", "07.2", "Automating Client Delivery: Reducing Weekly Workload to 8 Hours", 21),
            ("07-3", "07.3", "The 4-Client Rule: Sustaining $10k+/Month with Absolute Peace of Mind", 20),
            ("07-4", "07.4", "The Sovereign Holding Model: Reinvesting Net Surplus into Hard Assets", 22),
        ]
    }
]

# ==============================================================================
# PLAYBOOK 2: 10 Ways to Find Paying Customers Without Spending on Ads
# 8 Modules, 32 Lessons, 128 Slides, 8.5 Hours
# ==============================================================================
P2_MODULES = [
    {
        "num": "01",
        "title": "Act I: The Zero-Dollar Customer Acquisition Law & Inbound Signal Architecture",
        "desc": "Deconstruct why paid ads burn beginner cash reserves, and establish the fundamental laws of organic customer attraction through high-signal positioning.",
        "lessons": [
            ("01-1", "01.1", "The Paid Ads Delusion: Why Early Ad Spend Guarantees Bankruptcy", 16),
            ("01-2", "01.2", "The Pull vs. Push Inversion: Attracting High-Intent Buyers Organically", 18),
            ("01-3", "01.3", "Mapping High-Friction Problems in Lucrative B2B Niches", 17),
            ("01-4", "01.4", "Setting Up Your High-Converting Zero-Dollar Lead Intake Funnel", 19),
        ]
    },
    {
        "num": "02",
        "title": "Act II: Cold Loom Teardowns & Diagnostic Value Drops (Ways 1 & 2)",
        "desc": "Master the two highest-converting direct outreach methods: diagnostic video audits and public community teardowns that turn cold prospects into eager buyers.",
        "lessons": [
            ("02-1", "02.1", "Way #1: The 3-Minute Video Diagnostic Audit (70% Open & 35% Reply Rate)", 17),
            ("02-2", "02.2", "Scripting the Loom Teardown: Showing the Wound Before the Cure", 19),
            ("02-3", "02.3", "Way #2: Public Value Drops in Niche Communities (Reddit, Discord, Facebook)", 18),
            ("02-4", "02.4", "Infiltrating Buyer Circles Without Getting Banned or Flagged as Spam", 20),
        ]
    },
    {
        "num": "03",
        "title": "Act III: Parasite SEO & High-Intent Forum Infiltration (Ways 3 & 4)",
        "desc": "Hijack high-ranking third-party domains to rank #1 on Google in 48 hours and answer burning prospect questions with authoritative case studies.",
        "lessons": [
            ("03-1", "03.1", "Way #3: Parasite SEO: Leveraging Substack, Medium & LinkedIn Pulse", 17),
            ("03-2", "03.2", "Targeting Zero-Volume, High-Ticket Purchase Intent Search Queries", 19),
            ("03-3", "03.3", "Way #4: High-Intent Quora & Forum Snippets that Rank on Page One", 18),
            ("03-4", "03.4", "Structuring Contextual In-Article Calls to Action that Convert 8% of Readers", 20),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: The Asynchronous Database Reactivation Sprint (Ways 5 & 6)",
        "desc": "Mine dormant contacts, old email lists, and previous client relationships to generate immediate five-figure cash windfalls with zero acquisition cost.",
        "lessons": [
            ("04-1", "04.1", "Way #5: The 9-Word Email Database Reactivation Protocol", 18),
            ("04-2", "04.2", "Reviving Dead CRM Contacts for Local Service Businesses on Revenue Share", 20),
            ("04-3", "04.3", "Way #6: Mining Alumni Networks & Former Colleagues with Zero Awkwardness", 19),
            ("04-4", "04.4", "The 'Permission to Pitch' Follow-Up Sequence that Closes 40% of Inactive Leads", 21),
        ]
    },
    {
        "num": "05",
        "title": "Act V: Partner Co-Marketing & Strategic Revenue Share Alliances (Ways 7 & 8)",
        "desc": "Tap into established service providers who already own your ideal clients, and create reciprocal referral agreements that generate consistent inbound deals.",
        "lessons": [
            ("05-1", "05.1", "Way #7: The Complementary Service Provider Alliance (Web Devs & Agencies)", 18),
            ("05-2", "05.2", "Drafting 15%–20% Ongoing Referral Commission Agreements that Excite Partners", 20),
            ("05-3", "05.3", "Way #8: Joint Educational Webinars & Workshop Co-Hosting", 19),
            ("05-4", "05.4", "Extracting 10+ High-Ticket Clients from a Single 45-Minute Partner Training", 21),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: Micro-Podcast Tours & Viral Bounty Referral Loops (Ways 9 & 10)",
        "desc": "Borrow authority by guesting on niche industry podcasts and engineering self-replicating customer referral engines that turn 1 client into 3.",
        "lessons": [
            ("06-1", "06.1", "Way #9: The Niche B2B Podcast Guest Tour: Booking 5 Interviews in 14 Days", 19),
            ("06-2", "06.2", "Delivering High-Impact Case Studies on Air with a Dedicated Lead Magnet URL", 21),
            ("06-3", "06.3", "Way #10: The Viral Referral Bounty System: Paying Clients to Bring Peers", 20),
            ("06-4", "06.4", "Automating Client Referral Triggers at Day 14 and Day 45 of Engagement", 22),
        ]
    },
    {
        "num": "07",
        "title": "Act VII: The Daily 45-Minute Monastic Outreach Operating System",
        "desc": "Structure your morning routine into a distraction-free, 45-minute daily customer acquisition sprint that guarantees a full pipeline without burnout.",
        "lessons": [
            ("07-1", "07.1", "The Monastic Hour: Protecting Your 8:00 AM Customer Acquisition Window", 19),
            ("07-2", "07.2", "The 10-5-1 Daily Target Matrix: 10 Touches, 5 Engagements, 1 Discovery Call", 21),
            ("07-3", "07.3", "CRM Pipeline Hygiene: Using Free Notion/Airtable Boards to Never Drop a Lead", 20),
            ("07-4", "07.4", "Handling Ghosting and Rejection with Stoic Asymmetric Persistence", 22),
        ]
    },
    {
        "num": "08",
        "title": "Act VIII: Scaling to 20 Paying Clients & Unshakeable High-Margin Retainers",
        "desc": "Transition from active prospecting to inbound authority, build a waitlist for your services, and lock in $20k–$40k/month recurring revenue with zero ad budget.",
        "lessons": [
            ("08-1", "08.1", "The Tipping Point: When Organic Outbound Becomes Unstoppable Inbound", 19),
            ("08-2", "08.2", "Creating Public Client Teardown Case Studies that Cement Industry Authority", 21),
            ("08-3", "08.3", "Instituting Price Increases & Minimum Engagement Retainers ($2,500/mo+)", 20),
            ("08-4", "08.4", "The Sovereign Growth Mandate: Reinvesting Cash Flow into Asset Ownership", 22),
        ]
    }
]

# ==============================================================================
# PLAYBOOK 3: Give Me 26 Minutes, I'll Give You 10,000 Hours of Claude Knowledge
# 6 Modules, 24 Lessons, 96 Slides, 6.5 Hours
# ==============================================================================
P3_MODULES = [
    {
        "num": "01",
        "title": "Act I: The Claude Awakening: Why Sonnet 3.7 & Opus Invert Software Engineering",
        "desc": "Unpack why Anthropic's Claude models have become the undisputed standard for complex reasoning, code architecture, and multi-turn autonomous context handling.",
        "lessons": [
            ("01-1", "01.1", "The Architectural Leap: Why Claude Crushes GPT-4 on Deep Reasoning & Coding", 16),
            ("01-2", "01.2", "The 200,000 Token Context Window: Ingesting Entire Codebases & Legal Dossiers", 18),
            ("01-3", "01.3", "Temperature, Top-P, and System Prompts: Calibrating for Zero Hallucinations", 17),
            ("01-4", "01.4", "Setting Up Your Professional Claude Enterprise Workspace & Keybindings", 19),
        ]
    },
    {
        "num": "02",
        "title": "Act II: XML Tag Architecture & Precision Context Injectors",
        "desc": "Master Anthropic's secret weapon: using structured XML markup (<context>, <rules>, <output>) to force deterministic, flawless execution on complex enterprise tasks.",
        "lessons": [
            ("02-1", "02.1", "The Science of XML Prompting: Why Claude Treats XML Tags as Hard Constraints", 17),
            ("02-2", "02.2", "The Triad Framework: Separating <context>, <instructions>, and <examples>", 19),
            ("02-3", "02.3", "Preventing Context Bleed & Prompt Injection in Multi-Turn Workflows", 18),
            ("02-4", "02.4", "Production XML Prompt Templates for Coding, Legal Analysis & Financial Modeling", 20),
        ]
    },
    {
        "num": "03",
        "title": "Act III: The Artifacts Workflow: Full-Stack Prototyping at Light Speed",
        "desc": "Transform raw prompts into interactive React apps, vector graphics, and live dashboards instantly using Claude Artifacts to replace weeks of frontend development.",
        "lessons": [
            ("03-1", "03.1", "The Artifacts Paradigm Shift: Moving from Chatbot to Live Software Studio", 17),
            ("03-2", "03.2", "Rapid UI Prototyping: Building Interactive Web Apps with Tailwind & React in 60s", 19),
            ("03-3", "03.3", "Iterative Refinement: Editing Specific Artifact Nodes Without Code Regressions", 18),
            ("03-4", "03.4", "Exporting, Deploying, and Hosting Claude Artifacts on Vercel and Netlify", 20),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: Persistent Enterprise Memory & The Claude Projects Engine",
        "desc": "Build persistent specialized intelligence by curating project knowledge bases, style guides, and master system instructions that persist across every session.",
        "lessons": [
            ("04-1", "04.1", "Escaping Context Reset: How Claude Projects Create Permanent Intelligence", 18),
            ("04-2", "04.2", "Curating Your Master Knowledge Base: Formatting Docs for Maximum RAG Recall", 20),
            ("04-3", "04.3", "Role-Based Personas: Setting Up a 24/7 Virtual CTO, Legal Counsel & Copy Chief", 19),
            ("04-4", "04.4", "Collaborative Team Workspaces: Sharing Curated AI Intelligence Across Operators", 21),
        ]
    },
    {
        "num": "05",
        "title": "Act V: Model Context Protocol (MCP) & Autonomous System Integrations",
        "desc": "Harness Anthropic's open-standard Model Context Protocol (MCP) to connect Claude directly to your local file system, PostgreSQL databases, GitHub, and APIs.",
        "lessons": [
            ("05-1", "05.1", "What is MCP? The Universal Standard Connecting AI to Local Software & APIs", 18),
            ("05-2", "05.2", "Installing and Configuring MCP Servers for Local Repos, SQLite & Postgres", 20),
            ("05-3", "05.3", "Building Custom MCP Tools: Enabling Claude to Read and Write Production Code", 19),
            ("05-4", "05.4", "Security Best Practices: Sandboxing Permissions and Preventing Rogue Executions", 21),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: Computer Use & Synthetic Engineering Holding Companies",
        "desc": "Deploy Claude's groundbreaking Computer Use capability to autonomously navigate web browsers, execute desktop software, and operate multi-thousand-dollar workflows solo.",
        "lessons": [
            ("06-1", "06.1", "Computer Use Unveiled: Giving Claude Hands, Eyes, and Cursor Control", 19),
            ("06-2", "06.2", "Automating Complex Multi-Step Desktop Tasks (Data Extraction & File Operations)", 21),
            ("06-3", "06.3", "The Solo Software Holding Company: Shipping 10 SaaS Products with Claude", 20),
            ("06-4", "06.4", "The Sovereign AI Engineer: Why 1 Mastery Hour with Claude Outweighs 10,000 Hours", 22),
        ]
    }
]

# ==============================================================================
# PLAYBOOK 4: Give Me 28 Minutes, I'll Give You 10,000 Hours of ChatGPT Knowledge
# 8 Modules, 32 Lessons, 128 Slides, 8.5 Hours
# ==============================================================================
P4_MODULES = [
    {
        "num": "01",
        "title": "Act I: The Reasoning Revolution: o1/o3 Frontier Logic & Cognitive Architecture",
        "desc": "Master OpenAI's breakthrough reasoning models (o1 and o3), understanding hidden chain-of-thought processing and when to deploy pure reasoning vs. fast generative models.",
        "lessons": [
            ("01-1", "01.1", "The Architecture of Reasoning: How OpenAI o1 Thinks Before It Speaks", 16),
            ("01-2", "01.2", "When to Use Reasoning Models vs. GPT-4o for Maximum Velocity and Cost-Efficiency", 18),
            ("01-3", "01.3", "Deconstructing the Hidden Thought Token Process to Debug Complex Outputs", 17),
            ("01-4", "01.4", "Formulating Multi-Step Algorithmic Logic and Proof Problems that Never Break", 19),
        ]
    },
    {
        "num": "02",
        "title": "Act II: Precision Custom Instructions: De-lobotomizing Your AI Operating System",
        "desc": "Strip away ChatGPT's generic, sycophantic corporate fluff by configuring custom instructions that enforce brutal brevity, expert persona framing, and deterministic outputs.",
        "lessons": [
            ("02-1", "02.1", "The Sycophancy Problem: Why Default ChatGPT Gives You Polite Mediocrity", 17),
            ("02-2", "02.2", "Architecting Box 1: Profile, Cognitive Biases & Your Domain Context", 19),
            ("02-3", "02.3", "Architecting Box 2: Banned Words, Negative Constraints & Output Rules", 18),
            ("02-4", "02.4", "The High-Performance Executive Custom Instruction Preset for Daily Use", 20),
        ]
    },
    {
        "num": "03",
        "title": "Act III: The Canvas Collaborative Workspace: Co-Authoring High-Ticket Assets",
        "desc": "Unlock the power of ChatGPT Canvas to co-edit long-form written proposals, legal agreements, and production code line-by-line without re-generating full transcripts.",
        "lessons": [
            ("03-1", "03.1", "Beyond the Linear Chat Thread: Why Canvas Changes Iterative Creation", 17),
            ("03-2", "03.2", "Targeted Line-Level Revisions: Adjusting Tone, Reading Level & Technical Rigor", 19),
            ("03-3", "03.3", "The Inline Code Debugger: Reviewing and Optimizing Python, SQL & TypeScript", 18),
            ("03-4", "03.4", "Collaboratively Drafting a $10,000 Client Proposal in Under 15 Minutes", 20),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: Custom GPT Mastery: Crafting Autonomous Specialized Knowledge Workers",
        "desc": "Build tailored Custom GPTs for yourself or corporate clients that ingest private knowledge bases, adopt proprietary frameworks, and execute standardized workflows.",
        "lessons": [
            ("04-1", "04.1", "The Custom GPT Ecosystem: From Toy Prompts to Enterprise Grade Workers", 18),
            ("04-2", "04.2", "Crafting Bulletproof Instructions with Zero Ambiguity and Strong Edge-Cases", 20),
            ("04-3", "04.3", "Knowledge Base Engineering: Cleaning Markdown & PDF Files for Fast Search", 19),
            ("04-4", "04.4", "Preventing Prompt Extraction: Protecting Your Custom GPT's System Prompt", 21),
        ]
    },
    {
        "num": "05",
        "title": "Act V: OpenAPI Actions & Webhook Infrastructure: Turning GPTs into Software",
        "desc": "Bridge Custom GPTs to the outside world using OpenAPI schemas, Zapier integrations, and custom endpoints that trigger live database lookups and actions.",
        "lessons": [
            ("05-1", "05.1", "The Power of Actions: Transforming a Language Model into an Active Tool", 18),
            ("05-2", "05.2", "Writing OpenAPI 3.0 YAML Specs for Non-Technical Operators", 20),
            ("05-3", "05.3", "Connecting Custom GPTs to Zapier Webhooks, Google Sheets & Slack", 19),
            ("05-4", "05.4", "Building a Live Stock, Crypto or CRM Lead Query Action in 20 Minutes", 21),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: Advanced Voice Mode: Real-Time High-Stakes Negotiation Simulator",
        "desc": "Harness Advanced Voice Mode with low-latency conversational intelligence to simulate intense sales negotiations, high-pressure job interviews, and investor pitches.",
        "lessons": [
            ("06-1", "06.1", "The Speech-to-Speech Paradigm: Emotion, Cadence, and Instant Interruption", 19),
            ("06-2", "06.2", "Prompting the Ruthless Negotiator: Simulating Difficult Procurement Officers", 21),
            ("06-3", "06.3", "Real-Time Accent and Dialect Training for Global Enterprise Communications", 20),
            ("06-4", "06.4", "Conducting a 15-Minute Mock Sales Call That Eliminates Real-World Objections", 22),
        ]
    },
    {
        "num": "07",
        "title": "Act VII: Multimodal Vision Diagnostics: Instant B2B Audits from Raw Screenshots",
        "desc": "Use GPT-4o vision to analyze competitor landing pages, UI wireframes, financial balance sheets, and handwritten architecture diagrams in seconds.",
        "lessons": [
            ("07-1", "07.1", "Visual Prompt Engineering: Extracting Structured JSON from Messy Images", 19),
            ("07-2", "07.2", "Auditing Landing Pages for Conversion Friction and Writing Copy Replacements", 21),
            ("07-3", "07.3", "Converting Whiteboard Sketches and Figma Mockups into Production HTML/CSS", 20),
            ("07-4", "07.4", "Extracting Line-Item Data from Invoices and Financial Reports with 99.8% Accuracy", 22),
        ]
    },
    {
        "num": "08",
        "title": "Act VIII: Enterprise Automation Stacks: Connecting GPTs to Real-World Cashflow",
        "desc": "Combine everything learned into an integrated AI operating system that powers your business, eliminates administrative labor, and compounds your competitive advantage.",
        "lessons": [
            ("08-1", "08.1", "The Integrated AI Executive Stack: Canvas, Custom GPTs, and Reasoning Chains", 19),
            ("08-2", "08.2", "Building a 1-Person Content and Marketing Agency Powered Entirely by ChatGPT", 21),
            ("08-3", "08.3", "Licensing Custom GPT Solutions to SMB Clients for $500–$1,500/Month Retainers", 20),
            ("08-4", "08.4", "The Sovereign AI Commandment: Compounding Machine Leverage Over Linear Time", 22),
        ]
    }
]

# ==============================================================================
# PLAYBOOK 5: 5 Proven Ways To Make Money With AI (No Experience)
# 8 Modules, 32 Lessons, 128 Slides, 8.5 Hours
# ==============================================================================
P5_MODULES = [
    {
        "num": "01",
        "title": "Act I: The Zero-Experience Paradigm: Leveraging Foundation Model Intelligence",
        "desc": "Discover why you don't need technical skills or coding background to profit from AI, and how complete beginners are packaging AI intelligence into high-margin cash engines.",
        "lessons": [
            ("01-1", "01.1", "The Great Equalizer: Why AI Makes Technical Experience Obsolete", 16),
            ("01-2", "01.2", "The 5 Beginner Archetypes: Matching Your Personality to the Right Model", 18),
            ("01-3", "01.3", "Overcoming Imposter Syndrome When Selling AI-Generated Solutions", 17),
            ("01-4", "01.4", "The Minimum Viable Tech Stack: Free & Low-Cost Tools to Launch Today", 19),
        ]
    },
    {
        "num": "02",
        "title": "Act II: Vehicle 1: Curated AI Generative Art & Print-on-Demand Asset Engines",
        "desc": "Master Midjourney and Ideogram to create high-demand visual assets, printable wall art, and custom merchandise sold on automated print-on-demand marketplaces.",
        "lessons": [
            ("02-1", "02.1", "The Print-on-Demand Arbitrage: Zero Inventory & 80% Gross Margins", 17),
            ("02-2", "02.2", "Prompting for Photorealism & Typography in Midjourney v6 and Ideogram", 19),
            ("02-3", "02.3", "Upscaling to 300 DPI for Commercial Printing Using Upscayl & Topaz", 18),
            ("02-4", "02.4", "Listing on Etsy and Printify with Automated SEO-Optimized Product Descriptions", 20),
        ]
    },
    {
        "num": "03",
        "title": "Act III: Vehicle 2: Automated Faceless Video Channels & Viral Attention Hijacking",
        "desc": "Build anonymous, automated video channels on TikTok, YouTube Shorts, and Instagram Reels that generate daily ad revenue and high-ticket affiliate commissions.",
        "lessons": [
            ("03-1", "03.1", "The Faceless Creator Revolution: Millions of Views Without Showing Your Face", 17),
            ("03-2", "03.2", "Scripting Viral 60-Second Narratives Using ChatGPT & Claude Story Hooks", 19),
            ("03-3", "03.3", "Generating Hyper-Realistic Voiceovers with ElevenLabs and Voice Clones", 18),
            ("03-4", "03.4", "Automating Video Assembly & Dynamic Subtitles with CapCut and InVideo", 20),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: Vehicle 3: Programmatic SEO Niche Blogs & Passive Affiliate Empires",
        "desc": "Generate dozens of targeted, high-ranking SEO articles per week that capture search traffic for low-competition buyer keywords and monetize with Amazon & SaaS affiliate links.",
        "lessons": [
            ("04-1", "04.1", "Programmatic SEO Explained: How 1 Article Template Generates 100 Pages", 18),
            ("04-2", "04.2", "Uncovering Low-Difficulty High-Intent Keywords Using Free Tools & Google Trends", 20),
            ("04-3", "04.3", "Structuring In-Depth Helpful Content that Bypasses Google's Spam Algorithms", 19),
            ("04-4", "04.4", "Monetizing with High-Paying 30% Recurring SaaS Affiliate Programs", 21),
        ]
    },
    {
        "num": "05",
        "title": "Act V: Vehicle 4: B2B Local Merchant Email Marketing Retainers",
        "desc": "Write high-converting weekly promotional and newsletter emails for local dentists, gyms, and restaurants using AI, charging $500–$1,000/month recurring fees.",
        "lessons": [
            ("05-1", "05.1", "The Hidden Goldmine of Local Merchants with Neglected Customer Databases", 18),
            ("05-2", "05.2", "Crafting 4 Weekly Email Campaigns in 30 Minutes with Tailored Prompts", 20),
            ("05-3", "05.3", "Subject Line Engineering: Achieving 45%+ Open Rates for Local Businesses", 19),
            ("05-4", "05.4", "Closing Local Business Owners with a 'Pay Only After We Drive Revenue' Pitch", 21),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: Vehicle 5: Executive AI Career Optimization & High-Ticket Resumes",
        "desc": "Package executive resume revamps, ATS keyword alignment, and LinkedIn profile overhauls for job seekers, commanding $200–$500 per client with zero manual effort.",
        "lessons": [
            ("06-1", "06.1", "The Job Market Crisis: Why Standard Resumes Get Filtered Out by ATS Systems", 19),
            ("06-2", "06.2", "The ATS Optimization Prompt Chain: Matching Resumes to Exact Job Postings", 21),
            ("06-3", "06.3", "Transforming Bland Job Descriptions into Quantifiable Executive Achievements", 20),
            ("06-4", "06.4", "Packaging Complete Career Overhauls (Resume + LinkedIn + Cover Letter) for $399", 22),
        ]
    },
    {
        "num": "07",
        "title": "Act VII: The Zero-Capital Distribution Sprint: Closing Your First $1,000 Client",
        "desc": "Execute the step-by-step 7-day sprint to land your first paying client across your chosen vehicle without spending a single dollar on advertising.",
        "lessons": [
            ("07-1", "07.1", "The 7-Day Action Sprint: From Zero Knowledge to First Customer Invoiced", 19),
            ("07-2", "07.2", "The Free Value Offer: Doing 3 Free Audits to Collect Unshakeable Proof", 21),
            ("07-3", "07.3", "Converting Free Trial Clients into $500/Month Recurring Retainers", 20),
            ("07-4", "07.4", "Setting Up Stripe Payment Links & Automated Invoice Delivery", 22),
        ]
    },
    {
        "num": "08",
        "title": "Act VIII: Stacking the 5 Vehicles into an Untouchable $10,000/Month Solo Engine",
        "desc": "Scale from your first $1,000 to a diversified $10,000/month cash machine by stacking recurring revenue vehicles and protecting your financial independence.",
        "lessons": [
            ("08-1", "08.1", "The Rule of Stacking: Stabilizing One Vehicle Before Launching the Next", 19),
            ("08-2", "08.2", "Building a Lean $10k/Month Operating Calendar (20 Hours of Work per Week)", 21),
            ("08-3", "08.3", "Tax Efficiency and Solo LLC Incorporation for Beginner Solopreneurs", 20),
            ("08-4", "08.4", "The Freedom Milestone: Replacing Your 9-to-5 with Sovereign AI Cashflow", 22),
        ]
    }
]

# ==============================================================================
# PLAYBOOK 6: The Best AI Side Hustles To Start In 2026 (No Skills)
# 6 Modules, 24 Lessons, 96 Slides, 6.5 Hours
# ==============================================================================
P6_MODULES = [
    {
        "num": "01",
        "title": "Act I: The 2026 Economic Reset: Why Legacy Side Hustles Are Completely Dead",
        "desc": "Understand the macro technological shifts that killed dropshipping, print-on-demand, and generic blogging, and identify the five high-yield side hustles built for 2026.",
        "lessons": [
            ("01-1", "01.1", "The Saturation Wall: Why 2020 Side Hustles Fail Disastrously in 2026", 16),
            ("01-2", "01.2", "The 2026 Arbitrage Window: Where Unmet Market Demand Exceeds Supply", 18),
            ("01-3", "01.3", "The No-Skills Advantage: Using AI to Outperform 10-Year Industry Veterans", 17),
            ("01-4", "01.4", "Selecting Your 2026 Vehicle Based on Time, Capital & Risk Tolerance", 19),
        ]
    },
    {
        "num": "02",
        "title": "Act II: Hustle 1: Local Google Maps AI Review Optimization & Reputation Armor",
        "desc": "Help local service businesses (roofers, plumbers, dentists) dominate Google Maps rankings by automating review requests and drafting personalized AI response profiles.",
        "lessons": [
            ("02-1", "02.1", "The Google Maps Goldmine: Why Local Businesses Live or Die by 5-Star Reviews", 17),
            ("02-2", "02.2", "Building the Automated Review Request SMS Loop with HighLevel and Make.com", 19),
            ("02-3", "02.3", "AI-Powered Review Response Engines that Boost Local SEO Rank Factors", 18),
            ("02-4", "02.4", "Closing Local Plumbers and Dentists on $497/Month 'Reputation Shield' Retainers", 20),
        ]
    },
    {
        "num": "03",
        "title": "Act III: Hustle 2: Automated Creator Audio Repurposing & Multi-Channel Syndication",
        "desc": "Turn long-form podcast audio and interviews into viral short-form clips, comprehensive show notes, and LinkedIn threads for busy creators and corporate executives.",
        "lessons": [
            ("03-1", "03.1", "The Podcaster's Dilemma: 2 Hours of Recording with Zero Social Distribution", 17),
            ("03-2", "03.2", "Automating Transcription & Chapter Splitting with Whisper & Claude 3.7", 19),
            ("03-3", "03.3", "Generating 5 Viral Clips with Captions, B-Roll & Sound Effects in 20 Minutes", 18),
            ("03-4", "03.4", "Selling the $1,500/Month 'Podcast Distribution Machine' to Niche Hosts", 20),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: Hustle 3: AI Real Estate Staging, Floor Plans & Virtual Property Packages",
        "desc": "Offer real estate agents virtual furniture staging, 3D floor plan enhancements, and compelling property listing descriptions generated in under 15 minutes.",
        "lessons": [
            ("04-1", "04.1", "The Real Estate Listing Inefficiency: Why Agents Pay $1,000+ for Staging", 18),
            ("04-2", "04.2", "Virtual Staging with AI: Placing Modern Furniture into Empty Rooms in Seconds", 20),
            ("04-3", "04.3", "Generating High-Converting Zillow Listing Descriptions & Social Property Posts", 19),
            ("04-4", "04.4", "Partnering with Local Brokerages: The $250-per-Listing Package Workflow", 21),
        ]
    },
    {
        "num": "05",
        "title": "Act V: Hustle 4: No-Code Voiceflow FAQ & Customer Support Triage Agents",
        "desc": "Build and install intelligent customer service chat and voice agents for e-commerce stores and local medical clinics that answer 80% of support tickets automatically.",
        "lessons": [
            ("05-1", "05.1", "The Death of Static Chatbots: Why Voiceflow + LLMs Revolutionize Support", 18),
            ("05-2", "05.2", "Scraping Company FAQs and Policies into a Deterministic Knowledge Base", 20),
            ("05-3", "05.3", "Connecting Customer Inquiries to Live Order Tracking and Booking Calendars", 19),
            ("05-4", "05.4", "Selling the $2,000 Setup + $500/Month Maintenance Bot to Local Clinics", 21),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: Hustle 5: Micro-Curated B2B Industry Newsletters & Sponsor Monetization",
        "desc": "Launch a specialized weekly AI-curated email newsletter for a specific high-ticket B2B industry, growing to 2,500 subscribers and selling high-margin sponsorships.",
        "lessons": [
            ("06-1", "06.1", "The Power of Niche Curation: Why Executives Pay for Filtered Insights", 19),
            ("06-2", "06.2", "Automating Weekly Industry Scraping and Executive Summaries with Perplexity", 21),
            ("06-3", "06.3", "Acquiring Your First 1,000 High-Value Readers via LinkedIn Organic Drops", 20),
            ("06-4", "06.4", "Securing $500–$1,000 Weekly Newsletter Sponsorships and Course Upsells", 22),
        ]
    }
]

# ==============================================================================
# PLAYBOOK 7: Copy & Paste THIS Strategy to Make $13k/Month with AI in 2026
# 7 Modules, 28 Lessons, 112 Slides, 7.5 Hours
# ==============================================================================
P7_MODULES = [
    {
        "num": "01",
        "title": "Act I: The $13k/Month Blueprint: Deconstructing the Copy-and-Paste B2B Machine",
        "desc": "Examine the exact mathematical breakdown, operational timeline, and core B2B service offering that allows a solo beginner to reach $13,000/month within 90 days.",
        "lessons": [
            ("01-1", "01.1", "The $13,000/Month Equation: 9 Retainers @ $1,500/Month = Freedom", 16),
            ("01-2", "01.2", "Why B2B Service Arbitrage Beats B2C Consumer Products Every Single Time", 18),
            ("01-3", "01.3", "The High-Value Deliverable: Packaging Automated Inbound Follow-Up Systems", 17),
            ("01-4", "01.4", "Setting Up Your Professional Domain, Corporate Persona & Stripe Gateway", 19),
        ]
    },
    {
        "num": "02",
        "title": "Act II: Laser-Targeted Lead Harvesting with Apify, Google Maps & Outscraper",
        "desc": "Scrape thousands of verified decision-maker emails, phone numbers, and operational profiles from Google Maps and LinkedIn without expensive subscriptions.",
        "lessons": [
            ("02-1", "02.1", "Finding Your Sweet-Spot Niche: High Average Order Value & High Customer Churn", 17),
            ("02-2", "02.2", "Harvesting 2,500 Local Business Leads with Google Maps Scraper and Apify", 19),
            ("02-3", "02.3", "Extracting Owner First Names and Direct Mobile Numbers with Outscraper", 18),
            ("02-4", "02.4", "Cleaning and Validating Email Lists with NeverBounce to Protect Deliverability", 20),
        ]
    },
    {
        "num": "03",
        "title": "Act III: Automated Enrichment & Hyper-Personalized AI First-Line Prompts",
        "desc": "Use AI prompt chaining to generate individualized compliment lines, website audit observations, and contextual conversation starters for every single lead.",
        "lessons": [
            ("03-1", "03.1", "The Demise of Generic Cold Templates: Why 1-to-1 Personalization Wins", 17),
            ("03-2", "03.2", "Using Claude and ChatGPT API to Scrape Websites and Write Custom First Lines", 19),
            ("03-3", "03.3", "Dynamic Variable Architecture: Merging City, Industry & Pain Point Columns", 18),
            ("03-4", "03.4", "Reviewing AI-Enriched Lead Lists in Bulk to Ensure Flawless Accuracy", 20),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: The Multi-Inbox Cold Email Machine (Instantly, Smartlead & DNS Armor)",
        "desc": "Configure secondary domains, SPF, DKIM, DMARC records, and automated warmup algorithms to send 500 personalized emails daily directly into primary inboxes.",
        "lessons": [
            ("04-1", "04.1", "The Golden Rule of Outbound: Never Send Cold Emails from Your Primary Domain", 18),
            ("04-2", "04.2", "Purchasing 3 Secondary Domains & Configuring Google Workspace Accounts", 20),
            ("04-3", "04.3", "Setting Up SPF, DKIM, DMARC and Custom Tracking Domains for 99% Inbox Rate", 19),
            ("04-4", "04.4", "Automated Warmup Settings in Instantly & Smartlead: Ramp Schedule & Best Practices", 21),
        ]
    },
    {
        "num": "05",
        "title": "Act V: The Trojan Horse Offer: The 48-Hour Zero-Risk Pilot Agreement",
        "desc": "Craft an irresistible offer that eliminates prospect skepticism: install an automated follow-up system for 48 hours for free, charging only after they book appointments.",
        "lessons": [
            ("05-1", "05.1", "The Psychology of Zero Risk: Why Free Trials Invert Sales Resistance", 18),
            ("05-2", "05.2", "Drafting the 2-Paragraph Cold Email That Gets a 12% Positive Reply Rate", 20),
            ("05-3", "05.3", "The Fast-Track Onboarding Call: Getting Access to Lead Flow in 15 Minutes", 19),
            ("05-4", "05.4", "Installing Pre-Built Make.com Automation Templates in Under 45 Minutes", 21),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: The 15-Minute Zoom Closing Script & $1,500/Month Retainer Contracts",
        "desc": "Conduct a simple, low-pressure review call demonstrating the appointments your system generated during the trial, smoothly converting them into a $1,500/month recurring client.",
        "lessons": [
            ("06-1", "06.1", "The 15-Minute Conversion Blueprint: Showing Proof Before Asking for Cash", 19),
            ("06-2", "06.2", "Framing the Economics: 'Would You Pay $1,500 to Generate $12,000 in Leads?'", 21),
            ("06-3", "06.3", "Sending the DocuSign Service Agreement and First Month's Stripe Invoice", 20),
            ("06-4", "06.4", "Handling the 'Let Me Think About It' Objection with Decisive Urgency", 22),
        ]
    },
    {
        "num": "07",
        "title": "Act VII: Standard Operating Procedures (SOPs): Fulfilling 10 Clients in 6 Hours/Week",
        "desc": "Build modular delivery SOPs so managing 9–10 retainer clients requires less than 6 hours per week, preserving your time while enjoying $13,000+/month net profit.",
        "lessons": [
            ("07-1", "07.1", "The 6-Hour Work Week: Preventing Fulfillment from Becoming a Full-Time Job", 19),
            ("07-2", "07.2", "Automated Monthly Reporting Dashboards that Demonstrate Unquestioned ROI", 21),
            ("07-3", "07.3", "Churn Prevention Architecture: Keeping Clients for 12+ Months on Auto-Renew", 20),
            ("07-4", "07.4", "The $13,000/Month Milestone: Reinvesting Profit into Sovereign Freedom", 22),
        ]
    }
]

# ==============================================================================
# PLAYBOOK 8: Build A One-Person Business As A Beginner (From $0 To $10K)
# 8 Modules, 32 Lessons, 128 Slides, 8.5 Hours
# ==============================================================================
P8_MODULES = [
    {
        "num": "01",
        "title": "Act I: The Zero-Dollar Origin Story: Escaping Middle-Class Financial Gravitation",
        "desc": "Break free from the psychological chains of traditional employment, overcome beginner fear of failure, and master the mindset shifts required to build a $10k/month solo venture.",
        "lessons": [
            ("01-1", "01.1", "The Middle-Class Gravitational Pull: Why Most People Never Start", 16),
            ("01-2", "01.2", "The Power of the One-Person Business: Infinite Upside with Zero Payroll", 18),
            ("01-3", "01.3", "Overcoming Information Overload: The 90-Day Execution Ban on New Ideas", 17),
            ("01-4", "01.4", "Setting Up Your Minimalist Digital Command Center & Habit Architecture", 19),
        ]
    },
    {
        "num": "02",
        "title": "Act II: Discovering Your Asymmetric Superpower & High-Income Skill Stack",
        "desc": "Audit your natural interests, past experiences, and AI tools to uncover your unique value proposition, stacking skills into an unfair market advantage.",
        "lessons": [
            ("02-1", "02.1", "The Ikigai Inversion: Where Passion, Market Need & AI Leverage Intersect", 17),
            ("02-2", "02.2", "The 4 Core Skill Stacks: Copywriting, Systems Automation, Sales & Media", 19),
            ("02-3", "02.3", "Using AI to Accelerate Skill Acquisition by 10x in Under 14 Days", 18),
            ("02-4", "02.4", "Narrowing Down Your Profitable Niche: The Specific Problem for the Specific Buyer", 20),
        ]
    },
    {
        "num": "03",
        "title": "Act III: Crafting The $2,500 Grand Slam Offer: Eliminating Client Risk",
        "desc": "Structure an irresistible, high-conviction service offer that solves a painful, expensive business problem with clear deliverables and an ironclad guarantee.",
        "lessons": [
            ("03-1", "03.1", "The Anatomy of a Grand Slam Offer: High Perceived Value vs. Low Friction", 17),
            ("03-2", "03.2", "The Math of $10,000/Month: Why 4 Clients @ $2,500 Beats 100 Products @ $100", 19),
            ("03-3", "03.3", "Crafting Your Unconditional Performance Guarantee or Risk-Reversal Clause", 18),
            ("03-4", "03.4", "Packaging Your Offer into a 1-Page Google Doc Teardown That Sells Itself", 20),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: Building The Minimum Viable Audience (MVA) with High-Signal Media",
        "desc": "Attract your first 500 highly-targeted potential buyers on LinkedIn or X by publishing actionable breakdowns, build-in-public insights, and diagnostic teardowns.",
        "lessons": [
            ("04-1", "04.1", "The Minimum Viable Audience: Why You Only Need 500 True Believers to Make $10k", 18),
            ("04-2", "04.2", "The 3-Part Content Engine: Authority Proof, Actionable How-Tos & Personal Story", 20),
            ("04-3", "04.3", "Repurposing 1 Core Idea into 5 Distinct Posts Using ChatGPT and Claude", 19),
            ("04-4", "04.4", "Engaging in the Comments: Turning Value Drops into Private DM Conversations", 21),
        ]
    },
    {
        "num": "05",
        "title": "Act V: The 1-to-1 Organic Conversion Funnel: From DM to Paid Stripe Invoice",
        "desc": "Master natural, consultative direct messaging scripts that transition interested prospects from casual social media chats into scheduled discovery calls.",
        "lessons": [
            ("05-1", "05.1", "The Anti-Spam DM Framework: Starting Conversations with Genuine Curiosity", 18),
            ("05-2", "05.2", "Diagnosing Pain in the DMs: Asking the 3 Questions that Reveal Urgent Need", 20),
            ("05-3", "05.3", "The Seamless Transition to Zoom: 'Let's Hop on a 15-Minute Triage Call'", 19),
            ("05-4", "05.4", "Conducting the 20-Minute Diagnostic Discovery Call and Collecting Upfront Payment", 21),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: Asynchronous Client Delivery & Delivering Elite Results Solo",
        "desc": "Deliver exceptional outcomes for your clients without working 60 hours a week using standardized no-code automations, Loom updates, and asynchronous client communication.",
        "lessons": [
            ("06-1", "06.1", "The Asynchronous Communication Protocol: Eliminating Useless Client Meetings", 19),
            ("06-2", "06.2", "Client Onboarding in 1 Click: Automated Welcome Packs and Intake Forms", 21),
            ("06-3", "06.3", "Using AI to Fulfill Deliverables in Half the Time with Double the Quality", 20),
            ("06-4", "06.4", "The Weekly Loom Update: Keeping Clients In Love with Your Service", 22),
        ]
    },
    {
        "num": "07",
        "title": "Act VII: Operational Discipline & Protecting the First $10,000 Liquid Reserve",
        "desc": "Manage your finances, taxes, and personal lifestyle ruthlessly to protect your first $10,000 in liquid capital, quarantining yourself from lifestyle inflation.",
        "lessons": [
            ("07-1", "07.1", "The Wealth Quarantine: Living on $3,000 While Banking $10,000 Every Month", 19),
            ("07-2", "07.2", "Setting Up Business Checking, Profit First Accounts & Tax Reserves", 21),
            ("07-3", "07.3", "Managing Psychological Burnout and Sustaining Creative Energy as a Solo Operator", 20),
            ("07-4", "07.4", "The First $10,000 Liquid Milestone: The Psychological Shift from Scarcity to Power", 22),
        ]
    },
    {
        "num": "08",
        "title": "Act VIII: Ascending to the Sovereign Architect: Beyond $10k/Month",
        "desc": "Transition from 1-on-1 service fulfillment to group coaching, proprietary software, and digital assets, building an untouchable one-person empire.",
        "lessons": [
            ("08-1", "08.1", "The Ceiling of 1-on-1 Services: When and How to Transition to 1-to-Many", 19),
            ("08-2", "08.2", "Productizing Your Knowledge into a $497 Masterclass or Paid Community", 21),
            ("08-3", "08.3", "Automating Evergreen Lead Inflow with Paid Newsletters and YouTube Long-Form", 20),
            ("08-4", "08.4", "The Sovereign Architect: Complete Freedom of Time, Location, and Purpose", 22),
        ]
    }
]

ALL_BATCH_1_PLAYBOOKS = [
    {
        "file_name": "three-ai-businesses",
        "course_id": "ai-businesses-01",
        "slug": "7-ai-automations",
        "title": "These 3 AI Businesses Will Make You $10k+/Month (With Zero Employees)",
        "short_desc": "Master the 3 proven zero-employee AI business models to reach $10,000+/month with 95% net margins: AI Automation Agency, Short-Form Studio, and Shadow Operating.",
        "full_desc": "A cinematic, deeply practical masterclass detailing how a solo operator can generate $10,000+/month across three dominant AI business models: AI Workflow Automation Agency (AAA), AI Short-Form Content Studio, and AI Shadow Operating. Learn exact unit economics, speed-to-lead automations with Make.com and OpenAI APIs, value-first Loom outreach, and asymmetric 70/30 creator revenue shares.",
        "modules": P1_MODULES,
        "hours_of_material": "7.5 hours",
        "badge": "Bestseller",
        "rating": 4.9,
        "rating_count": 384,
        "students": "1,420",
        "target_audience": [
            "Aspiring solopreneurs wanting to build a $10,000+/month business with zero employees",
            "Freelancers looking to transition from low-paying gigs to high-ticket AI agency retainers",
            "Video editors and content creators who want to build a recurring-revenue AI content studio",
            "Operators and educators who want to partner with creators on high-upside Skool community launches"
        ]
    },
    {
        "file_name": "zero-ad-customers",
        "course_id": "side-hustles-08",
        "slug": "side-hustles",
        "title": "10 Ways to Find Paying Customers Without Spending on Ads",
        "short_desc": "The 10 battle-tested organic customer acquisition systems to land high-paying clients without spending a single dollar on advertising.",
        "full_desc": "A battle-tested tactical masterclass breaking down 10 zero-dollar customer acquisition channels. Master diagnostic cold Loom audits, parasite SEO, database reactivation sprints, partner co-marketing alliances, podcast guest tours, and viral bounty referral loops to build a dependable $20k–$40k/month client pipeline with zero ad spend.",
        "modules": P2_MODULES,
        "hours_of_material": "8.5 hours",
        "badge": "Bestseller",
        "rating": 4.9,
        "rating_count": 312,
        "students": "1,180",
        "target_audience": [
            "Service providers and consultants who want paying clients without burning cash on ads",
            "Freelancers struggling with feast-or-famine income cycles who need predictable inbound leads",
            "Agency owners looking to install scalable zero-cost outbound protocols for their team",
            "Solopreneurs wanting to build a recession-proof, organic customer acquisition engine"
        ]
    },
    {
        "file_name": "claude-knowledge",
        "course_id": "ai-businesses-03",
        "slug": "give-me-26-minutes-ill-give-you-10000-hours-of-claude-knowledge",
        "title": "Give Me 26 Minutes, I'll Give You 10,000 Hours of Claude Knowledge",
        "short_desc": "The ultimate distillation of Claude 3.5 & 3.7 mastery: XML tag prompting, Artifacts rapid prototyping, persistent Projects memory, MCP tools, and Computer Use.",
        "full_desc": "A high-leverage masterclass uncovering the profound capabilities of Anthropic's Claude models. Master XML tag prompting (<rules>, <context>), rapid React and UI prototyping via Artifacts, persistent organizational memory with Projects, connecting external tools with Model Context Protocol (MCP), and autonomous desktop execution with Computer Use.",
        "modules": P3_MODULES,
        "hours_of_material": "6.5 hours",
        "badge": "Top Rated",
        "rating": 4.9,
        "rating_count": 420,
        "students": "2,150",
        "target_audience": [
            "Developers and engineers looking to 10x their coding velocity using Claude Artifacts and MCP",
            "Founders who want to build and ship production software without hiring large engineering teams",
            "Knowledge workers wanting to de-lobotomize LLMs with structured XML prompt architecture",
            "Entrepreneurs seeking to deploy autonomous Computer Use workflows in their business"
        ]
    },
    {
        "file_name": "chatgpt-knowledge",
        "course_id": "ai-businesses-04",
        "slug": "give-me-28-minutes-ill-give-you-10000-hours-of-chatgpt-knowledge",
        "title": "Give Me 28 Minutes, I'll Give You 10,000 Hours of ChatGPT Knowledge",
        "short_desc": "Concentrated ChatGPT mastery: o1/o3 reasoning models, precision custom instructions, Canvas collaboration, Custom GPTs with OpenAPI Actions, and Advanced Voice.",
        "full_desc": "An authoritative, comprehensive guide to OpenAI's advanced AI ecosystem. Master the frontier reasoning capabilities of o1 and o3, craft surgical custom instructions that eliminate sycophancy, co-edit high-ticket assets in Canvas, build custom GPTs with real-world OpenAPI Actions, and conduct live sales roleplay with Advanced Voice Mode.",
        "modules": P4_MODULES,
        "hours_of_material": "8.5 hours",
        "badge": "Hot & New",
        "rating": 4.9,
        "rating_count": 395,
        "students": "2,380",
        "target_audience": [
            "Executives, consultants, and operators who use ChatGPT daily and want to operate in the top 1%",
            "Solopreneurs looking to build custom GPT workers that automate business administration",
            "Sales professionals wanting to practice real-time high-stakes negotiation with Advanced Voice",
            "Founders wanting to integrate Custom GPTs with Zapier, Slack, and external databases"
        ]
    },
    {
        "file_name": "five-proven-ways",
        "course_id": "ai-businesses-05",
        "slug": "5-proven-ways-to-make-money-with-ai-no-experience",
        "title": "5 Proven Ways To Make Money With AI (No Experience)",
        "short_desc": "5 battle-tested zero-experience business models: Midjourney art assets, automated faceless video channels, programmatic SEO blogs, local merchant email retainers, and executive resumes.",
        "full_desc": "A zero-fluff beginner masterclass revealing 5 proven business vehicles you can start with modern AI tools and zero coding experience. Discover how to create commercial print-on-demand art, run automated faceless video channels, build passive programmatic SEO blogs, land local merchant email retainers, and transform executive resumes for high-paying clients.",
        "modules": P5_MODULES,
        "hours_of_material": "8.5 hours",
        "badge": "Bestseller",
        "rating": 4.9,
        "rating_count": 512,
        "students": "2,740",
        "target_audience": [
            "Complete beginners seeking an accessible, step-by-step entry point into the AI economy",
            "Individuals looking for high-margin side income without upfront capital or technical skills",
            "Content creators wanting to launch automated, faceless video channels on TikTok and YouTube",
            "Aspiring service providers looking to close their first $500/month local business retainers"
        ]
    },
    {
        "file_name": "ai-side-hustles-2026",
        "course_id": "ai-businesses-06",
        "slug": "the-best-ai-side-hustles-to-start-in-2026-no-skills",
        "title": "The Best AI Side Hustles To Start In 2026 (No Skills)",
        "short_desc": "The 2026 high-margin side hustle landscape: Google Maps review armor, podcast audio repurposing, AI real estate staging, Voiceflow FAQ support bots, and B2B newsletters.",
        "full_desc": "A realistic, forward-looking guide to the side hustles that actually work in the 2026 AI landscape. Discover how to install Google Maps reputation systems for local contractors, repurpose long-form podcast audio into viral clips, offer virtual staging to real estate brokerages, deploy Voiceflow customer support agents, and curate profitable industry newsletters.",
        "modules": P6_MODULES,
        "hours_of_material": "6.5 hours",
        "badge": "Trending",
        "rating": 4.8,
        "rating_count": 348,
        "students": "1,890",
        "target_audience": [
            "Side hustlers tired of outdated 2020 models like dropshipping who want real 2026 moats",
            "Professionals wanting to build a flexible $2,000–$5,000/month recurring income stream",
            "Operators who want to sell standardized AI services to local businesses and creators",
            "Solopreneurs wanting to run simple, high-margin software and media systems"
        ]
    },
    {
        "file_name": "copy-paste-13k",
        "course_id": "ai-businesses-07",
        "slug": "copy-paste-this-strategy-to-make-13k-month-with-ai-in-2026",
        "title": "Copy & Paste THIS Strategy to Make $13k/Month with AI in 2026",
        "short_desc": "The exact step-by-step copy-and-paste B2B system: scrape leads with Apify, send personalized cold emails, offer 48-hour pilot trials, and close $1,500/month retainers.",
        "full_desc": "A step-by-step tactical playbook detailing the exact B2B lead generation and automation system that scales to $13,000/month. Learn how to scrape qualified decision-makers using Google Maps and Apify, set up multi-inbox cold email infrastructure with 99% deliverability, offer zero-risk 48-hour pilot trials, and close 9 clients paying $1,500/month on automated retainers.",
        "modules": P7_MODULES,
        "hours_of_material": "7.5 hours",
        "badge": "High Demand",
        "rating": 4.9,
        "rating_count": 476,
        "students": "2,420",
        "target_audience": [
            "Entrepreneurs wanting a proven, repeatable B2B client acquisition and fulfillment formula",
            "Operators looking to build a clean $13k/month retainer model with 9 clients @ $1,500/mo",
            "Cold email practitioners wanting to master modern deliverability (Instantly, Smartlead)",
            "Solopreneurs wanting standard operating procedures that keep weekly work under 6 hours"
        ]
    },
    {
        "file_name": "one-person-business",
        "course_id": "ai-businesses-08",
        "slug": "build-a-one-person-business-as-a-beginner-from-0-to-10k",
        "title": "Build A One-Person Business As A Beginner (From $0 To $10K)",
        "short_desc": "The complete roadmap from $0 to $10,000/month as a solo beginner: skill stacking, $2,500 Grand Slam offers, minimum viable audience, and asynchronous fulfillment.",
        "full_desc": "An exhaustive, step-by-step roadmap for launching, validating, and scaling a high-leverage one-person business from scratch. Master the art of stacking high-income skills, engineering $2,500 Grand Slam offers with risk reversal, building an audience of 500 targeted buyers, converting prospects in organic DMs, and fulfilling client results asynchronously without burnout.",
        "modules": P8_MODULES,
        "hours_of_material": "8.5 hours",
        "badge": "Founder Pick",
        "rating": 4.9,
        "rating_count": 528,
        "students": "2,610",
        "target_audience": [
            "Beginners who want to escape corporate employment and reach $10,000/month net profit solo",
            "Freelancers wanting to package their skills into high-ticket $2,500 retainers",
            "Solopreneurs wanting to master organic audience building on LinkedIn and Twitter",
            "Founders who value complete autonomy, location freedom, and zero employee management"
        ]
    }
]
