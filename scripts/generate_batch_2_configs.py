import json

# ==============================================================================
# PLAYBOOK 9: Laziest Way to Make Money Online in 2026 ($500/day)
# 7 Modules, 28 Lessons, 112 Slides, 7.5 Hours
# ==============================================================================
P9_MODULES = [
    {
        "num": "01",
        "title": "Act I: The Rat Race Illusion & The $500/Day Awakening",
        "desc": "Deconstruct why the hardest physical workers stay broke while clever 'lazy' operators build 98% net margin cash engines, and establish the mathematical path to $500/day.",
        "lessons": [
            ("01-1", "01.1", "The Grind Myth: Why Effort Without Leverage Guarantees Poverty", 16),
            ("01-2", "01.2", "The Mathematical Truth of $500/Day ($15,000/Month Net Cashflow)", 18),
            ("01-3", "01.3", "The Four Pillars of 'Lazy' Leverage: Code, Media, Capital & Systems", 17),
            ("01-4", "01.4", "Escaping Shiny Object Syndrome: Selecting Your Single Cash Vehicle", 19),
        ]
    },
    {
        "num": "02",
        "title": "Act II: Software Arbitrage & The No-Code White-Label Machine",
        "desc": "Unpack the highest-margin 'lazy' business model: rebranding proven software infrastructure to solve painful business problems without writing a single line of code.",
        "lessons": [
            ("02-1", "02.1", "The Secret of Software Arbitrage: Packaging Existing Infrastructure", 17),
            ("02-2", "02.2", "Targeting High-Churn Business Niches Desperate for Simple Solutions", 19),
            ("02-3", "02.3", "Setting Up Your White-Label Portal & Automated Onboarding Funnel", 20),
            ("02-4", "02.4", "Pricing for Passive Velocity: $97/mo vs $297/mo Recurring Tiers", 18),
        ]
    },
    {
        "num": "03",
        "title": "Act III: The Automated Content Clipper & Viral Audience Hijacking",
        "desc": "Ride the coattails of multi-millionaire creators by repurposing high-performing video moments into viral distribution channels that generate daily affiliate cashflow.",
        "lessons": [
            ("03-1", "03.1", "The Parasite Traffic Principle: Monetizing Existing Attention", 17),
            ("03-2", "03.2", "Automating the Viral Clip Factory: Opus, CapCut & Batch Workflows", 19),
            ("03-3", "03.3", "The High-Converting Link-in-Bio Funnel That Captures 24/7 Buyers", 18),
            ("03-4", "03.4", "Securing 50% Recurring Affiliate Commissions on High-LTV SaaS", 20),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: The Asynchronous Newsletter & Micro-Sponsorship Engine",
        "desc": "Build a zero-burn digital media asset that sends one curated email per week, commands high-ticket sponsor rates, and prints cash on autopilot.",
        "lessons": [
            ("04-1", "04.1", "Why Curated Newsletters are the Ultimate Low-Stress Asset", 18),
            ("04-2", "04.2", "Scraping & Synthesizing Niche Industry News in 30 Minutes Weekly", 20),
            ("04-3", "04.3", "Crossing Your First 2,500 High-Value Executive Subscribers", 19),
            ("04-4", "04.4", "Closing $500–$1,000 Weekly Newsletter Sponsorships on Auto-Pilot", 21),
        ]
    },
    {
        "num": "05",
        "title": "Act V: Zero-Resistance Distribution & The Permission Pitch",
        "desc": "Acquire paying customers without spending a single dollar on ads using low-friction conversational scripts, community value drops, and proof assets.",
        "lessons": [
            ("05-1", "05.1", "The Anti-Sales Pitch: Leading with Demonstrable Utility", 18),
            ("05-2", "05.2", "Infiltrating Niche Reddit, Discord & Facebook Buyer Circles", 20),
            ("05-3", "05.3", "The 10-Minute Daily DM Routine That Fills Your Stripe Dashboard", 19),
            ("05-4", "05.4", "Automating Referral Bounties to Turn 1 Customer into 3", 21),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: The 90-Minute Daily Sovereign Operating Cadence",
        "desc": "Design an unshakeable lifestyle operating system where your business executes in 90 minutes of morning work, leaving the rest of the day completely free.",
        "lessons": [
            ("06-1", "06.1", "The 90-Minute Morning Power Block: Ruthless High-ROI Execution", 19),
            ("06-2", "06.2", "Delegating Boring Customer Tickets to Autonomous AI Agents", 20),
            ("06-3", "06.3", "Financial Engineering: Keeping Fixed Business Overhead Under $150/mo", 18),
            ("06-4", "06.4", "The Monastic Focus Shield: Defending Your Attention from Distractions", 21),
        ]
    },
    {
        "num": "07",
        "title": "Act VII: The Sovereign Denouement: Stacking to $15k–$30k/Month",
        "desc": "Compound your initial $500/day asset into an institutional digital portfolio, reinvest surplus cashflow, and achieve permanent location and time independence.",
        "lessons": [
            ("07-1", "07.1", "The Milestone Checklist: From Day 1 to $500 Consistent Daily Profit", 20),
            ("07-2", "07.2", "Stacking Asset #2: When and How to Replicate Your Success", 21),
            ("07-3", "07.3", "Tax & Treasury Architecture for Digital Nomads and Solo Operators", 19),
            ("07-4", "07.4", "The Sovereign Mindset: Living as an Untouchable Global Free Agent", 22),
        ]
    }
]

# ==============================================================================
# PLAYBOOK 10: The Blueprint To Go From $0 To $1,000,000
# 8 Modules, 32 Lessons, 128 Slides, 8.5 Hours
# ==============================================================================
P10_MODULES = [
    {
        "num": "01",
        "title": "Act I: The Three Stages of Wealth & The Billionaire Trap",
        "desc": "Expose the fatal error of copying a billionaire's defensive investment strategy when you have under $100k, and map the 3 true evolutionary phases of wealth.",
        "lessons": [
            ("01-1", "01.1", "The Fatal Mistake: Why Index Funds Will Never Make You Rich Fast", 17),
            ("01-2", "01.2", "The Three Economic Epochs: Cashflow Engine, Growth Forge, Sovereign Vault", 19),
            ("01-3", "01.3", "The Speed Equation: Why Making $1M at 25 Beats Making $1M at 65", 18),
            ("01-4", "01.4", "The Zero-to-$10k Sandbox: Building Unshakeable Survival Income", 20),
        ]
    },
    {
        "num": "02",
        "title": "Act II: Stage 1 ($0 to $100k) — Weaponizing High-Income Skills",
        "desc": "Master the aggressive cash-generating engine required to cross your first six figures: offering specialized, high-ticket services with 95%+ profit margins.",
        "lessons": [
            ("02-1", "02.1", "The High-Income Skill Triad: Copywriting, Sales & Media Buying", 18),
            ("02-2", "02.2", "Package Your Genius: Transitioning from Low-Ticket Gigs to $3k Retainers", 20),
            ("02-3", "02.3", "The 100-Prospect Sniper List: Signing 5 Clients in 30 Days Organically", 19),
            ("02-4", "02.4", "Hoarding Liquid Capital: The Monastic $100,000 War Chest Rule", 21),
        ]
    },
    {
        "num": "03",
        "title": "Act III: Stage 2 ($100k to $500k) — The Operational Agency Engine",
        "desc": "Scale from a solo freelancer into an agency or digital asset founder by delegating fulfillment, standardizing SOPs, and turning pipeline chaos into predictable revenue.",
        "lessons": [
            ("03-1", "03.1", "The Delegation Crucible: Letting Go of Low-Value Operational Tasks", 19),
            ("03-2", "03.2", "Contractor Arbitrage: Hiring Elite Global Talent for Fractional Roles", 21),
            ("03-3", "03.3", "Standardizing the Golden SOP: Making Your Delivery Bulletproof", 20),
            ("03-4", "03.4", "Scaling Monthly Cashflow from $15,000 to $40,000 Without Burnout", 22),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: The Psychology of the Halfway Mark — Surviving the Death Valley",
        "desc": "Navigate the dangerous psychological plateau where most entrepreneurs crash: lifestyle creep, premature luxury purchases, and boredom in routine execution.",
        "lessons": [
            ("04-1", "04.1", "The $250k Trap: Why Most Operators Flame Out Right Before Scale", 18),
            ("04-2", "04.2", "Quarantining Lifestyle Inflation: Staying Hungry When You Feel 'Rich'", 20),
            ("04-3", "04.3", "The Dopamine Reset: Finding Ecstasy in Repetitive, Boring Discipline", 19),
            ("04-4", "04.4", "Protecting Your Energy: Pruning Parasitic Friends and Low-Value Clients", 21),
        ]
    },
    {
        "num": "05",
        "title": "Act V: Stage 3 ($500k to $1,000,000) — Asymmetric Leverage & Equity",
        "desc": "Make the leap from active service cashflow to enterprise value by launching proprietary digital assets, software integrations, and recurring subscription communities.",
        "lessons": [
            ("05-1", "05.1", "The Enterprise Multiplier: Why Equity Beats Pure Service Retainers", 19),
            ("05-2", "05.2", "Launching Proprietary Digital Products to Monetize Saturated Authority", 21),
            ("05-3", "05.3", "Partnering with Existing Giants: The Power of Joint Venture Flywheels", 20),
            ("05-4", "05.4", "Crossing the 7-Figure Net Worth Milestone: Anatomy of the Final Sprint", 22),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: The Capital Preservation Codex — Defending the Fortress",
        "desc": "Now that you have made the first million, master the defensive rules of high-net-worth operators to ensure you never lose a single dollar to market cycles or bad deals.",
        "lessons": [
            ("06-1", "06.1", "The 1st Law of Wealth Preservation: 'Never Lose Capital'", 18),
            ("06-2", "06.2", "Treasury Management: Splitting Between Sovereign Cash, Gold & Hard Assets", 20),
            ("06-3", "06.3", "Why Real Estate & Private Credit Protect Cashflow from Inflation", 19),
            ("06-4", "06.4", "Saying 'No' to 99% of Pitches: Guarding Against Speculative Fads", 21),
        ]
    },
    {
        "num": "07",
        "title": "Act VII: Global Jurisdiction Arbitrage & Corporate Structuring",
        "desc": "Structure your personal and business entities internationally to legally minimize taxes, eliminate sovereign risk, and protect your assets globally.",
        "lessons": [
            ("07-1", "07.1", "The Flag Theory Architecture: Separating Passport, Residency & Bank", 19),
            ("07-2", "07.2", "Zero-Tax Jurisdictions for Digital Founders (Dubai, Caribbean, UK Remittance)", 21),
            ("07-3", "07.3", "Bank Account Fortification: Holding Multi-Currency Operational Reserves", 20),
            ("07-4", "07.4", "Legal Safeguards, Asset Trusts & Corporate Holding Structures", 22),
        ]
    },
    {
        "num": "08",
        "title": "Act VIII: The Sovereign Free Man — Life on the Other Side of $1M",
        "desc": "Synthesize the entire blueprint into your permanent identity, maintain relentless clarity, and operate as a fully autonomous global wealth architect.",
        "lessons": [
            ("08-1", "08.1", "The Truth About Life After $1,000,000: What Changes and What Remains", 19),
            ("08-2", "08.2", "Why Every Subsequent Million is 10x Easier than the First", 20),
            ("08-3", "08.3", "The Philanthropic & Legacy Mandate: Deploying Capital for True Impact", 21),
            ("08-4", "08.4", "The Eternal Student: Staying Sharp When Survival is No Longer an Issue", 22),
        ]
    }
]

# ==============================================================================
# PLAYBOOK 11: Your First $1M Is Simple (Here's How)
# 6 Modules, 24 Lessons, 96 Slides, 6.5 Hours
# ==============================================================================
P11_MODULES = [
    {
        "num": "01",
        "title": "Act I: Escape Velocity & The Physics of Financial Momentum",
        "desc": "Understand the exact mathematical physics of why the first million requires 80% of your total lifetime effort, while every subsequent million flows effortlessly.",
        "lessons": [
            ("01-1", "01.1", "The Gravitational Pull of the Middle Class: The Friction Equation", 17),
            ("01-2", "01.2", "Why 'Simple' Does Not Mean 'Easy': The 1,000-Hour Rule of Mastery", 19),
            ("01-3", "01.3", "The Velocity Threshold: Crossing from Survival into Compound Growth", 18),
            ("01-4", "01.4", "Dismantling Psychological Limiting Beliefs Around High-Ticket Money", 20),
        ]
    },
    {
        "num": "02",
        "title": "Act II: The Skill Stacking Codex — Forging Your Unfair Advantage",
        "desc": "Stack complementary high-leverage abilities—copywriting, sales closing, media buying, and systems architecture—into an uncopyable personal monopoly.",
        "lessons": [
            ("02-1", "02.1", "The Skill-Stack Venn Diagram: How 4 Average Skills Create Elite Value", 18),
            ("02-2", "02.2", "Skill #1: Hypnotic Direct-Response Copywriting That Commands Action", 20),
            ("02-3", "02.3", "Skill #2: High-Stakes B2B Sales Closing & Value Diagnostic Framing", 19),
            ("02-4", "02.4", "Skill #3: Systems Engineering & Hands-Off Fulfillment Pipelines", 21),
        ]
    },
    {
        "num": "03",
        "title": "Act III: The Mathematical Bridge — Pricing & Customer Volume",
        "desc": "Break $1,000,000 into simple, digestible mathematical units so you never feel overwhelmed by the enormity of the milestone.",
        "lessons": [
            ("03-1", "03.1", "Deconstructing $1M: 1,000 Customers @ $1k vs 100 @ $10k vs 20 @ $50k", 18),
            ("03-2", "03.2", "The Sweet Spot for Beginners: 35 Retainer Clients @ $2,500/Month", 20),
            ("03-3", "03.3", "Price Elasticity: Why Charging More Lowers Client Friction & Churn", 19),
            ("03-4", "03.4", "The Lifetime Value (LTV) Multiplier: Turning $3k Deals into $36k Relationships", 21),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: The Attention Monopoly & Organic Client Inbound",
        "desc": "Command intense commercial attention without spending on ads by engineering authority media assets, viral case teardowns, and executive pull content.",
        "lessons": [
            ("04-1", "04.1", "Inbound Attention vs Outbound Begging: The Positioning Shift", 18),
            ("04-2", "04.2", "The 3-Minute Video Diagnostic That Converts Cold CEOs into Inbound Bookings", 20),
            ("04-3", "04.3", "Leveraging Other People's Audiences (The Trojan Horse Collaboration)", 19),
            ("04-4", "04.4", "Building a Pipeline That Produces 10 Qualified Discovery Calls Weekly", 21),
        ]
    },
    {
        "num": "05",
        "title": "Act V: Zero-Employee Operational Leverage & AI Infrastructure",
        "desc": "Deliver elite results to dozens of high-paying clients simultaneously using no-code automations, specialized AI workflows, and offshore execution teams.",
        "lessons": [
            ("05-1", "05.1", "The Solo Millionaire Architecture: 95% Margins with Zero Full-Time Staff", 19),
            ("05-2", "05.2", "Automating 80% of Deliverables with Claude, Make.com and Airtable", 21),
            ("05-3", "05.3", "Client Onboarding & Reporting Portals That Eliminate Weekly Status Calls", 20),
            ("05-4", "05.4", "The Quality Guardrail: Delivering Faster Than Large Agencies with 0 Slop", 22),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: The Millionaire Flywheel — Reinvestment & Compounding",
        "desc": "Transition from grinding for every dollar into a compounding economic flywheel where your cashflow automatically buys assets that work for you forever.",
        "lessons": [
            ("06-1", "06.1", "The Reinvestment Golden Ratio: 70% Operating Surplus into Growth Assets", 19),
            ("06-2", "06.2", "Creating Asymmetric Digital Products That Generate Passive Royalties", 21),
            ("06-3", "06.3", "Locking in Your First $1,000,000 Liquid Net Worth Milestone", 20),
            ("06-4", "06.4", "The Sovereign Mindset: Operating with Total Time and Financial Immunity", 22),
        ]
    }
]

# ==============================================================================
# PLAYBOOK 12: The 5 Money Principles that will make anyone RICH in their 20s
# 7 Modules, 28 Lessons, 112 Slides, 7.5 Hours
# ==============================================================================
P12_MODULES = [
    {
        "num": "01",
        "title": "Act I: The 20s Crucible & The Status Signaling Trap",
        "desc": "Examine the psychological warfare of your twenties: why looking rich destroys your ability to become truly wealthy, and the mindset shift required for sovereignty.",
        "lessons": [
            ("01-1", "01.1", "The Great Illusion: Leased Luxury vs Sovereign Capital", 16),
            ("01-2", "01.2", "The Decade Advantage: Why Compounding in Your 20s Multiplies 50x Over Your 40s", 18),
            ("01-3", "01.3", "The Social Quarantine: Cutting Off Low-Vibration Dopamine Chasers", 17),
            ("01-4", "01.4", "The Monastic War Mindset: 3 Years of Radical Discipline", 19),
        ]
    },
    {
        "num": "02",
        "title": "Act II: Principle #1 — Live Off Cashflow Surplus, Never Investments",
        "desc": "Master the sacred rule of wealth preservation: treat your capital portfolio like an untouchable fortress and fund your lifestyle solely through operating business cashflow.",
        "lessons": [
            ("02-1", "02.1", "The Untouchable Fortress Rule: Never Cannibalize Principal Capital", 17),
            ("02-2", "02.2", "Designing Your Operating Cashflow Engine to Cover Baseline Living Costs", 19),
            ("02-3", "02.3", "The Phantom Wealth Trap: Why Paper Gains in Stocks/Crypto Feed False Ego", 18),
            ("02-4", "02.4", "The Automatic Segregation System: Splitting Income Across Dedicated Accounts", 20),
        ]
    },
    {
        "num": "03",
        "title": "Act III: Principle #2 — Ruthless Lifestyle Quarantine & Anti-Inflation",
        "desc": "Eradicate lifestyle creep before it poisons your financial trajectory: keep your living expenses flat even as your monthly income explodes from $3k to $20k+.",
        "lessons": [
            ("03-1", "03.1", "The Golden Handcuffs: Why Most High Earners Remain Month-to-Month Broke", 17),
            ("03-2", "03.2", "The 12-Month Expense Freeze: Accumulating Pure Velocity Capital", 19),
            ("03-3", "03.3", "The Stealth Wealth Protocol: Moving Silently Without Flexing on Social Media", 18),
            ("03-4", "03.4", "Reward Milestones: Celebrating Only on Verified Equity Liquidity Events", 20),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: Principle #3 — Liquidity is King: The Sovereign War Chest",
        "desc": "Discover why illiquid investments trap 20-somethings, and how maintaining deep liquid reserves lets you capitalize on generational market crashes and fire sales.",
        "lessons": [
            ("04-1", "04.1", "The Illiquidity Delusion: Why Locking Money in 401ks/Real Estate Stifles 20s Agility", 18),
            ("04-2", "04.2", "The 12-Month Cash Runway: The Psychological Power of 'F*** You' Money", 20),
            ("04-3", "04.3", "Dry Powder Advantage: Sniping Distressed Assets During Market Panics", 19),
            ("04-4", "04.4", "Structuring High-Yield Sovereign Cash Management Portfolios", 21),
        ]
    },
    {
        "num": "05",
        "title": "Act V: Principle #4 — Asymmetric Risk-Reward Bets in Your 20s",
        "desc": "Exploit the unique biological leverage of your twenties: taking calculated, high-upside entrepreneurial swings where downside is capped at zero and upside is infinite.",
        "lessons": [
            ("05-1", "05.1", "The Convexity Equation: Why Safe Paths Are Actually the Riskiest in 2026", 18),
            ("05-2", "05.2", "Zero-Downside Entrepreneurial Bets: Building Digital Businesses with Sweat Equity", 20),
            ("05-3", "05.3", "Identifying Macro Technology Waves (AI, Media Arbitrage, Remote Services)", 19),
            ("05-4", "05.4", "When to Cut Losses Fast: Ruthlessly Exiting Sunk-Cost Ventures", 21),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: Principle #5 — Your Inner Circle is an Asset Class",
        "desc": "Treat your social relationships with the rigor of a venture capital balance sheet: cultivating high-caliber alliances while cutting dead weight.",
        "lessons": [
            ("06-1", "06.1", "The Proximity Effect: You Are the Exact Average of Your 5 Daily Contacts", 18),
            ("06-2", "06.2", "How to Infiltrate High-Net-Worth Founder Circles Without Feeling Like a Parasite", 20),
            ("06-3", "06.3", "Providing Unsolicited Value: The Secret to Earning Mentorship from Titans", 19),
            ("06-4", "06.4", "The Mutual Elevation Pact: Building a Syndicate of Ambitious Builders", 21),
        ]
    },
    {
        "num": "07",
        "title": "Act VII: The 30-Year-Old Sovereign Titan Playbook",
        "desc": "Synthesize the 5 principles into an ironclad daily routine that ensures you enter your thirties with multi-million-dollar net worth, zero debt, and complete freedom.",
        "lessons": [
            ("07-1", "07.1", "The Decade Scorecard: Auditing Your Net Worth, Cashflow & Independence", 19),
            ("07-2", "07.2", "Transitioning from Aggressive Accumulation to Multigenerational Stewardship", 20),
            ("07-3", "07.3", "Maintaining Mental and Physical Vitality Alongside Financial Triumph", 21),
            ("07-4", "07.4", "The Sovereign Creed: Freedom of Time, Location, and Purpose", 22),
        ]
    }
]

# ==============================================================================
# PLAYBOOK 13: It's Boring, But Will Make Even Beginners Millionaires in 2026
# 8 Modules, 32 Lessons, 128 Slides, 8.5 Hours
# ==============================================================================
P13_MODULES = [
    {
        "num": "01",
        "title": "Act I: The 5 Raw Truths & The Allure of Unsexy Cashflow",
        "desc": "Confront the brutal realities of Building Wealth that gurus conceal: why 80% of success is timing and vehicle selection, and why boring businesses beat flashy ones.",
        "lessons": [
            ("01-1", "01.1", "Raw Truth #1: 80% of Success is Vehicle Selection & Timing, Not Hustle", 17),
            ("01-2", "01.2", "Raw Truth #2: The Glamour Trap: Why Trendy Businesses Die in Year 2", 19),
            ("01-3", "01.3", "Raw Truth #3: The Monopoly of Boring Problems (Compliance, Data, Workflow)", 18),
            ("01-4", "01.4", "Raw Truth #4 & #5: Compounding Requires Survival Through the 'Dip of Irrelevance'", 20),
        ]
    },
    {
        "num": "02",
        "title": "Act II: The Unsexy Business Landscape — Monopolizing the Dull",
        "desc": "Explore the multi-million dollar opportunities hiding in mundane B2B infrastructure: HVAC invoicing automation, medical clinic follow-ups, and legal record ingestion.",
        "lessons": [
            ("02-1", "02.1", "The Local B2B Black Goldmine: Outdated Systems Ripe for Disruption", 18),
            ("02-2", "02.2", "Niche #1: Automated Patient & Client Retention for Medical & Dental Clinics", 20),
            ("02-3", "02.3", "Niche #2: Subcontractor Invoicing & Compliance Workflows for Trade Contractors", 19),
            ("02-4", "02.4", "Niche #3: Document Parsing & Secure Client Portals for Small Accounting Firms", 21),
        ]
    },
    {
        "num": "03",
        "title": "Act III: Zero-Competition Positioning — Why Gurus Avoid This",
        "desc": "Take advantage of the fact that 99% of 20-somethings want to do dropshipping or crypto: build a business in a field where you face literally zero competent competitors.",
        "lessons": [
            ("03-1", "03.1", "The Vacuum of Competence: Why Traditional Businesses Starve for Modern Systems", 18),
            ("03-2", "03.2", "Speaking B2B ROI: How to Frame $2,500/mo as an Absolute Bargain", 20),
            ("03-3", "03.3", "Eliminating Tech Jargon: Communicating Like an Executive Partner", 19),
            ("03-4", "03.4", "The Risk-Free Pilot Offer: 'If You Don't Save 15 Hours, You Pay Nothing'", 21),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: The Monastic Fulfillment Factory — Build Once, Deploy Everywhere",
        "desc": "Turn boring tasks into automated cash assets: architect standardized templates, modular Make.com blueprints, and Airtable engines that execute with zero manual labor.",
        "lessons": [
            ("04-1", "04.1", "The Cookie-Cutter Delivery Architecture: Clone and Customize in 45 Minutes", 19),
            ("04-2", "04.2", "Connecting WhatsApp/SMS Triggers to Cloud Databases Without Coding", 21),
            ("04-3", "04.3", "AI-Powered Document Extraction Engines for Boring Paperwork", 20),
            ("04-4", "04.4", "Delivering 99.9% Uptime: Bulletproofing Your Client Automations", 22),
        ]
    },
    {
        "num": "05",
        "title": "Act V: The Direct Acquisition Machine — Cold Outbound for Boring Niches",
        "desc": "Land 5 high-retention commercial clients in 30 days using targeted directory scraping, personalized Loom video audits, and phone/email follow-up frameworks.",
        "lessons": [
            ("05-1", "05.1", "Scraping 500 Verified Local Business Owners Using Apollo & Google Maps", 18),
            ("05-2", "05.2", "The 90-Second Loom Teardown: Exposing the Leak in Their Booking System", 20),
            ("05-3", "05.3", "The 3-Step Follow-Up Sequence That Converts Cold Leads into Booked Calls", 19),
            ("05-4", "05.4", "Closing Discovery Calls in 15 Minutes: The Decision-Maker Protocol", 21),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: The Golden Handshake — 12-Month Contracts & Churn Elimination",
        "desc": "Boring businesses hate changing software. Learn how to embed yourself so deeply into their daily operations that clients stay for 3 to 5 years without question.",
        "lessons": [
            ("06-1", "06.1", "The Irreplaceable Utility Moat: Becoming Mission-Critical to Their Revenue", 18),
            ("06-2", "06.2", "Locking in Annual Agreements with Quarterly Performance Milestones", 20),
            ("06-3", "06.3", "Proactive Monthly ROI Reports: Proving Value Before They Ever Ask", 19),
            ("06-4", "06.4", "Upselling Tier 2 Add-Ons ($500/mo Speed-to-Lead, $1k/mo Automated Reviews)", 21),
        ]
    },
    {
        "num": "07",
        "title": "Act VII: The Compounding Calculus — Scaling from $10k to $50k/Month",
        "desc": "Do the simple math: 20 clients paying $2,500/month generates $50,000/month net profit ($600k/year) with an overhead of less than $300/month.",
        "lessons": [
            ("07-1", "07.1", "The Unit Economics of Boring Millions: 20 Clients @ $2,500/Month", 19),
            ("07-2", "07.2", "Hiring a $1,200/Month Dedicated Offshore Support Specialist", 21),
            ("07-3", "07.3", "Automating New Client Onboarding to Take Less Than 15 Minutes of Your Time", 20),
            ("07-4", "07.4", "Managing $50k/Month Operating Cashflow in Under 5 Hours Per Week", 22),
        ]
    },
    {
        "num": "08",
        "title": "Act VIII: The Quiet Titan — The Power of Unseen Wealth",
        "desc": "Embrace the ultimate flex: while your peers brag about volatile crypto or dropshipping revenue, you silently bank millions in predictable, recession-proof cash.",
        "lessons": [
            ("08-1", "08.1", "The Psychological Mastery of Being Undetectable and Extremely Rich", 19),
            ("08-2", "08.2", "Recession Immunity: Why Boring B2B Infrastructure Never Slows Down", 20),
            ("08-3", "08.3", "Reinvesting Corporate Cashflow into Cash-Yielding Sovereign Real Estate", 21),
            ("08-4", "08.4", "The 10-Year Vision: Building an Unshakeable $10,000,000 Family Empire", 22),
        ]
    }
]

# ==============================================================================
# PLAYBOOK 14: I Locked Myself In a Room Until I Built a $350,000/mo Business
# 8 Modules, 32 Lessons, 128 Slides, 8.5 Hours
# ==============================================================================
P14_MODULES = [
    {
        "num": "01",
        "title": "Act I: From the Trailer Park to $144k in 24 Hours",
        "desc": "The raw origin story: growing up with a single mom with nothing, fighting through poverty, and experiencing the blinding euphoria of making $144,000 in a single day.",
        "lessons": [
            ("01-1", "01.1", "The Spark: Growing Up with Three Siblings and Zero Financial Safety Net", 17),
            ("01-2", "01.2", "The First Taste of Blood: My First Viral Dropshipping Winner", 19),
            ("01-3", "01.3", "The $144,000 24-Hour Stripe Sprint: The Dopamine Tsunami", 18),
            ("01-4", "01.4", "The Illusion of Invisibility: Buying the Porsche, McLaren and Supercar Dreams", 20),
        ]
    },
    {
        "num": "02",
        "title": "Act II: The Great Collapse & The Fragility of Success",
        "desc": "The brutal aftermath: how complacency, lifestyle inflation, algorithm shifts, and fake friends destroyed the cash engine and forced a reckoning with rock bottom.",
        "lessons": [
            ("02-1", "02.1", "When the Ad Account Banned: The Fragility of Unleveraged Models", 18),
            ("02-2", "02.2", "The High-Cost Lifestyle Trap: Bleeding $20,000/Month on Empty Status", 20),
            ("02-3", "02.3", "The Identity Crisis: When the Money Stops, Who Are You?", 19),
            ("02-4", "02.4", "The Awakening: 'I Either Build an Unbreakable System or Die Mediocre'", 21),
        ]
    },
    {
        "num": "03",
        "title": "Act III: The 180-Day Monk Mode Crucible — Radical Sensory Deprivation",
        "desc": "The dramatic decision to lock himself in a room for 6 months: blocking social media, cutting off all toxic friends, and dedicating 14 hours a day to pure execution.",
        "lessons": [
            ("03-1", "03.1", "Entering the Chamber: Establishing Non-Negotiable Monk Mode Boundaries", 18),
            ("03-2", "03.2", "Cutting the Leech Network: Saying Goodbye to Everyone Who Does Not Elevate You", 20),
            ("03-3", "03.3", "The Monastic Daily Routine: 5:00 AM Cold Starts, Deep Work & Zero Distraction", 19),
            ("03-4", "03.4", "Transmuting Frustration and Pain into Savage Operational Output", 21),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: Architecting the $350k/Month High-Ticket Engine",
        "desc": "Moving away from fragile commodity products to build a high-ticket B2B service and media flywheel capable of predictable, recurring 8-figure revenue.",
        "lessons": [
            ("04-1", "04.1", "The Shift to High-Ticket: Why One $5,000 Client Beats 100 Low-Ticket Buyers", 19),
            ("04-2", "04.2", "Designing the Irresistible Grand Slam Offer: Guaranteeing Transformation", 21),
            ("04-3", "04.3", "Building the Frictionless Sales Conversion Funnel from Scratch in the Room", 20),
            ("04-4", "04.4", "Closing the First 3 Enterprise Clients at $10,000 Upfront Fees", 22),
        ]
    },
    {
        "num": "05",
        "title": "Act V: The Media Flywheel & Organic Inbound Domination",
        "desc": "Documenting the journey openly on YouTube to create an undeniable media moat that attracts high-paying buyers, strategic partners, and tier-1 investors.",
        "lessons": [
            ("05-1", "05.1", "Document, Don't Create: The Authentic Storytelling Framework That Wins Fans", 18),
            ("05-2", "05.2", "Crafting High-Converting YouTube Thumbnails and Cinematic Hooks", 20),
            ("05-3", "05.3", "The Organic Inbound Pipeline: Turning Viewers into $5,000/mo Consulting Retainers", 19),
            ("05-4", "05.4", "Monetizing Audience Trust with Integrity: Zero Scammy Endorsements", 21),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: The Million-Dollar Fulfillment Factory & Team Assembly",
        "desc": "Scaling beyond solo limits by hiring and training an elite remote team of media editors, media buyers, and operational leaders while maintaining 80%+ margins.",
        "lessons": [
            ("06-1", "06.1", "From Solo Soldier to General: Hiring Your First Executive Operations Lead", 19),
            ("06-2", "06.2", "Standard Operating Procedures (SOPs) That Allow You to Step Away", 21),
            ("06-3", "06.3", "Commission-Only High-Ticket Closing Team: Scaling Call Capacity to 50/Day", 20),
            ("06-4", "06.4", "Quality Assurance: Delivering Flawless Execution Across 100+ Active Clients", 22),
        ]
    },
    {
        "num": "07",
        "title": "Act VII: The Breakthrough — Crossing $350,000 in a Single Month",
        "desc": "The climax of the journey: breaking through the $350,000 net monthly profit barrier with verified banking telemetry, sustainable systems, and zero panic.",
        "lessons": [
            ("07-1", "07.1", "The Math of $350,000/Month: Diversified Retainers, Digital Assets & Media", 19),
            ("07-2", "07.2", "The Feeling of True Sovereignty: When Success is Systemic, Not Luck", 20),
            ("07-3", "07.3", "Handling Massive Cash Inflows: Tax Shields, Treasury Vaults & Banking", 21),
            ("07-4", "07.4", "The Post-Crucible Awakening: Emerging from the Room as a Different Human", 22),
        ]
    },
    {
        "num": "08",
        "title": "Act VIII: The Sovereign Playbook for the Next Generation",
        "desc": "The complete distillation of every lesson, habit, framework, and mental model so you can execute your own 180-day monk-mode transformation.",
        "lessons": [
            ("08-1", "08.1", "How to Design Your Personal 30, 60, and 180-Day Isolation Sprint", 19),
            ("08-2", "08.2", "The Unbreakable Discipline Protocol: Overcoming Temptation & Loneliness", 20),
            ("08-3", "08.3", "The Eternal Student: Why True Wealthy Operators Never Stop Building", 21),
            ("08-4", "08.4", "Your Destiny: Stepping into the Arena and Claiming Your Sovereign Life", 22),
        ]
    }
]

# ==============================================================================
# PLAYBOOK 15: The 4 Levels To Getting RICH in 2026
# 6 Modules, 24 Lessons, 96 Slides, 6.5 Hours
# ==============================================================================
P15_MODULES = [
    {
        "num": "01",
        "title": "Act I: The Matrix of Economic Slavery & The 4 Consciousness Tiers",
        "desc": "Examine the financial caste system governing modern society: why 99% are stuck in Level 1 and 2, and the dimensional jump required to reach sovereign wealth in 2026.",
        "lessons": [
            ("01-1", "01.1", "The Architecture of the Matrix: Why Traditional Schooling Breeds Obedient Consumers", 17),
            ("01-2", "01.2", "The 4 Levels Defined: Jeffrey, The Average Man, The High Earner, The Sovereign", 19),
            ("01-3", "01.3", "The Cost of Inaction: Inflation, AI Disruption & The 2026 Wealth Gap", 18),
            ("01-4", "01.4", "The Dimensional Jump Principle: You Cannot Solve Level 2 with Level 2 Thinking", 20),
        ]
    },
    {
        "num": "02",
        "title": "Act II: Level 1 — Escaping 'Jeffrey' (Zero Skills, Maximum Dopamine)",
        "desc": "Diagnose the lowest economic tier: trapped in doom-scrolling, video games, low self-worth, and zero marketable skills. Master the psychological escape hatch.",
        "lessons": [
            ("02-1", "02.1", "The Jeffrey Anatomy: 27% of Society Trapped in Instant Gratification", 18),
            ("02-2", "02.2", "Dopamine Fasting: Resetting Your Neural Receptors for Hard Deep Work", 20),
            ("02-3", "02.3", "Acquiring Your First Monetizable Skill: The 30-Day Immersion Sprint", 19),
            ("02-4", "02.4", "Crossing from Level 1 to Level 2: Landing Your First Paying Client or Job", 21),
        ]
    },
    {
        "num": "03",
        "title": "Act III: Level 2 — Breaking Out of 'The Average Man' ($1k–$10k Savings)",
        "desc": "Deconstruct the trap of the respectable 9-to-5: trading 40+ hours a week for a fixed paycheck, losing 15% yearly to stealth inflation, and living in perpetual fragility.",
        "lessons": [
            ("03-1", "03.1", "The Average Man's Illusion: Feeling 'Safe' in an Inflationary Meat Grinder", 18),
            ("03-2", "03.2", "Why Budgeting and Cutting Lattes Will Never Make You Rich", 20),
            ("03-3", "03.3", "The Side-Hustle Bridge: Building an After-Hours Cash Engine in 15 Hours/Week", 19),
            ("03-4", "03.4", "Replacing Your Full-Time Income: When to Hand in Your Resignation Letter", 21),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: Level 3 — The High-Earner Operator ($10k–$30k/Month)",
        "desc": "Analyze the golden handcuffs of the successful freelancer or agency owner: high income, high taxes, but chained to 70-hour workweeks with zero true equity freedom.",
        "lessons": [
            ("04-1", "04.1", "The High-Earner Bottleneck: You Own a Job, Not a Sovereign Business", 18),
            ("04-2", "04.2", "The Power of Asymmetric Pricing: Charging for Commercial Outcomes, Not Hours", 20),
            ("04-3", "04.3", "Productizing Your High-Income Service into Automated Delivery Systems", 19),
            ("04-4", "04.4", "Building the Operational Moat: Transitioning from Solo Hustler to Founder", 21),
        ]
    },
    {
        "num": "05",
        "title": "Act V: Level 4 — The Sovereign Wealth Architect ($50k+/Month & Equity)",
        "desc": "Step into true economic mastery: owning scalable digital assets, autonomous media distribution, compounding capital, and absolute location and temporal independence.",
        "lessons": [
            ("05-1", "05.1", "The Sovereign Architecture: Media, Code, Capital and Sweat-Equity Leverage", 19),
            ("05-2", "05.2", "The 95% Margin Empire: Running Multi-Six-Figure Engines with Micro-Teams", 21),
            ("05-3", "05.3", "Building Intellectual Property Assets That Appreciate While You Sleep", 20),
            ("05-4", "05.4", "Asset Diversification: Real Estate, Physical Gold & Decentralized Treasury", 22),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: The 2026 Ascension Codex — Your Personal Escape Blueprint",
        "desc": "Execute your customized roadmap through the 4 levels: time-blocked milestones, psychological checklists, and financial benchmarks for complete sovereignty in 2026.",
        "lessons": [
            ("06-1", "06.1", "The 12-Month Level-Ascension Roadmap: From Jeffrey to Sovereign Architect", 19),
            ("06-2", "06.2", "Psychological Armor: Thriving Through Market Volatility and Doubters", 21),
            ("06-3", "06.3", "The Sovereign Network: Surrounding Yourself with Level 4 Builders", 20),
            ("06-4", "06.4", "The Final Mandate: Total Freedom, Radical Purpose, and Sovereign Wealth", 22),
        ]
    }
]

# ==============================================================================
# PLAYBOOK 16: The A.I. Revolution: 8 Ways to get RICH
# 8 Modules, 32 Lessons, 128 Slides, 8.5 Hours
# ==============================================================================
P16_MODULES = [
    {
        "num": "01",
        "title": "Act I: The Great Disruption & The Concept of Value Arbitrage",
        "desc": "Deconstruct how AI is dismantling white-collar employment while creating the largest wealth transfer in human history through the power of Value Arbitrage.",
        "lessons": [
            ("01-1", "01.1", "The AI Seismic Shift: Why Millions of Jobs Will Vanish by 2026", 17),
            ("01-2", "01.2", "The Value Arbitrage Principle: Packaging Free AI Tech into Expensive Solutions", 19),
            ("01-3", "01.3", "The Lensa AI Blueprint: How a Simple Wrapper Generated Millions Overnight", 18),
            ("01-4", "01.4", "The Gold Rush Rule: Don't Dig for Gold—Sell the AI Shovels", 20),
        ]
    },
    {
        "num": "02",
        "title": "Act II: Way #1 & #2 — Value Arbitrage Wrappers & Niche AI Tools",
        "desc": "Build and market high-margin AI utility wrappers that take raw foundation models (OpenAI, Anthropic, Flux) and package them into intuitive micro-tools for specific niches.",
        "lessons": [
            ("02-1", "02.1", "Way 1: Finding High-Pain Niche Problems Ready for an AI Wrapper", 18),
            ("02-2", "02.2", "Building No-Code Frontends with Bubble and Next.js in Under 48 Hours", 20),
            ("02-3", "02.3", "Way 2: White-Label AI Micro-Tools for Real Estate, Legal & Accounting", 19),
            ("02-4", "02.4", "Pricing for Rapid Cashflow: $49/mo Micro-SaaS vs $499 Upfront Licenses", 21),
        ]
    },
    {
        "num": "03",
        "title": "Act III: Way #3 & #4 — Algorithmic Trading Bots & Code Generation",
        "desc": "Command AI models to write automated trading indicators (PineScript/TradingView), backtest high-probability market setups, and deploy automated Python scripts.",
        "lessons": [
            ("03-1", "03.1", "Way 3: Prompting ChatGPT to Write Complex PineScript Indicators", 18),
            ("03-2", "03.2", "Backtesting Algorithmic Setups: Filtering Noise & Risk Management", 20),
            ("03-3", "03.3", "Way 4: AI Full-Stack Code Generation for Custom Client Automation", 19),
            ("03-4", "03.4", "Packaging Trading Scripts & Analytical Tools for Subscription Access", 21),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: Way #5 & #6 — Autonomous Customer Support & Voice Agents",
        "desc": "Help businesses slash customer support payroll by 80% by installing intelligent conversational chatbots, automated ticketing engines, and AI phone receptionists.",
        "lessons": [
            ("04-1", "04.1", "Way 5: Building Enterprise Knowledge-Grounded Support Bots with Voiceflow", 19),
            ("04-2", "04.2", "Way 6: Deploying AI Voice Agents (Vapi/Bland) for Local Inbound Calls", 21),
            ("04-3", "04.3", "The Math That Sells: Saving E-Commerce Brands $4,000/mo in Support Labor", 20),
            ("04-4", "04.4", "Closing $3,500 Setup Fees + $750/mo Retainers for Ongoing Model Tuning", 22),
        ]
    },
    {
        "num": "05",
        "title": "Act V: Way #7 & #8 — Synthetic Media Studios & Digital Knowledge Assets",
        "desc": "Dominate content production with AI image and video pipelines, automated thumbnail creation, and proprietary digital playbooks and prompt databases.",
        "lessons": [
            ("05-1", "05.1", "Way 7: The Automated Short-Form & Synthetic UGC Video Agency", 18),
            ("05-2", "05.2", "AI YouTube Thumbnail Engineering: Midjourney + Photoshop Neural Filters", 20),
            ("05-3", "05.3", "Way 8: Creating and Selling Specialized AI System Prompt Vaults", 19),
            ("05-4", "05.4", "Partnering with High-Growth Creators on 50/50 Revenue-Share Launches", 21),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: The Zero-Ad Client Acquisition Playbook for AI Operators",
        "desc": "Land high-paying B2B clients for your AI solutions without ad spend by executing interactive proof-of-concept demonstrations and personalized video teardowns.",
        "lessons": [
            ("06-1", "06.1", "The Interactive POC Strategy: Building a 10-Minute Custom Bot Before the Call", 18),
            ("06-2", "06.2", "The 3-Minute Video Teardown That Proves Operational Inefficiency", 20),
            ("06-3", "06.3", "Infiltrating Industry Events and Local Chambers of Commerce with Live Demos", 19),
            ("06-4", "06.4", "Handling Corporate AI Objections: Data Privacy, Hallucinations & Security", 21),
        ]
    },
    {
        "num": "07",
        "title": "Act VII: The Solo AI Agency Architecture: 95% Margins & Zero Staff",
        "desc": "Run your multi-client AI solutions firm as a lean, solo operator: tech stack under $250/month, automated billing, and standardized deployment templates.",
        "lessons": [
            ("07-1", "07.1", "The Under-$250/mo AI Agency Tech Stack (APIs, Serverless, Make.com, Stripe)", 19),
            ("07-2", "07.2", "Standardized Client Agreements: Service Level Agreements (SLAs) & Retainers", 20),
            ("07-3", "07.3", "The 10-Client Retainer Math: Generating $25,000/Month Net Profit Solo", 21),
            ("07-4", "07.4", "Automating Delivery SOPs to Prevent Scope Creep and Churn", 22),
        ]
    },
    {
        "num": "08",
        "title": "Act VIII: The Sovereign Future: AI Monopoly & Generational Wealth",
        "desc": "Synthesize the 8 wealth pathways into an integrated AI holding company, reinvest surplus cashflow, and secure generational wealth in the post-AI economy.",
        "lessons": [
            ("08-1", "08.1", "Stacking the 8 Ways: Building a Diversified AI Cashflow Portfolio", 19),
            ("08-2", "08.2", "Why Speed of Execution is the Only Competitive Moat in 2026", 20),
            ("08-3", "08.3", "Protecting Your Wealth from Monetary Debasement with Hard Assets", 21),
            ("08-4", "08.4", "The Sovereign Mandate: Becoming an Untouchable Architect of the New Economy", 22),
        ]
    }
]

ALL_BATCH_2_PLAYBOOKS = [
    {
        "file_name": "laziest-way-500-day",
        "course_id": "ai-businesses-09",
        "slug": "laziest-way-to-make-money-online-in-2026-500-day",
        "title": "Laziest Way to Make Money Online in 2026 ($500/day)",
        "short_desc": "The cinematic blueprint to building high-leverage, asynchronous cash engines that generate $500/day ($15,000/month) with 98% net margins and zero employee overhead.",
        "full_desc": "A narrative-driven, battle-tested playbook revealing the 'laziest' and most lucrative online business models in 2026. Discover how to deploy software arbitrage, automated content clipping, curated newsletters, and permission-based outreach to hit a consistent $500/day in passive cashflow while working just 90 minutes daily.",
        "modules": P9_MODULES,
        "hours_of_material": "7.5 hours",
        "badge": "Hot & New",
        "rating": 4.9,
        "rating_count": 412,
        "students": "1,530",
        "target_audience": [
            "Individuals tired of traditional corporate 9-to-5 burnout seeking $500/day independence",
            "Beginner operators wanting high-margin software arbitrage without coding",
            "Content creators and clippers wanting to build automated affiliate cashflow flywheels",
            "Solopreneurs wanting to run their entire business in 90 minutes of focused morning work"
        ]
    },
    {
        "file_name": "blueprint-0-to-1m",
        "course_id": "ai-businesses-10",
        "slug": "the-blueprint-to-go-from-0-to-1000000",
        "title": "The Blueprint To Go From $0 To $1,000,000",
        "short_desc": "The 3-stage master roadmap taking you from zero to your first $1,000,000: active cashflow generation, operational scaling, and defensive wealth preservation.",
        "full_desc": "An exhaustive, cinematic masterclass breaking down the three distinct evolutionary stages of wealth creation. Learn why copying a billionaire's portfolio when you have under $100k is financial suicide, how to weaponize high-income skills, scale an operational agency engine to $40k/month, and fortress your capital with global jurisdiction arbitrage.",
        "modules": P10_MODULES,
        "hours_of_material": "8.5 hours",
        "badge": "Bestseller",
        "rating": 4.9,
        "rating_count": 589,
        "students": "2,840",
        "target_audience": [
            "Entrepreneurs and professionals stuck under $100k who need an unshakeable roadmap to $1M",
            "Agency owners and freelancers looking to scale from $10k/mo to $40k+/mo with operational systems",
            "High earners seeking to protect their capital against inflation and sovereign risk",
            "Founders who want to build generational wealth with bulletproof treasury management"
        ]
    },
    {
        "file_name": "first-1m-is-simple",
        "course_id": "ai-businesses-11",
        "slug": "your-first-1m-is-simple-heres-how",
        "title": "Your First $1M Is Simple (Here's How)",
        "short_desc": "Why making your first million is mathematically simple once you break through the gravitational pull of the middle class and master the 4 core skill stacks.",
        "full_desc": "A hard-hitting, cinematic breakdown of the physics of wealth creation. Learn why making the first million requires 80% of your lifetime effort while every subsequent million flows with ease, how to stack copywriting, sales, media, and systems into an unfair advantage, and how to price and deliver high-ticket retainers to reach $1M without burnout.",
        "modules": P11_MODULES,
        "hours_of_material": "6.5 hours",
        "badge": "Founder Pick",
        "rating": 4.9,
        "rating_count": 467,
        "students": "1,920",
        "target_audience": [
            "Aspiring millionaires seeking to understand the true mathematical physics of escape velocity",
            "Service providers wanting to stack high-income skills and command $2,500–$5,000 retainers",
            "Solo operators looking to deliver elite results using AI and no-code automation",
            "Founders wanting to simplify their path to $1,000,000 liquid net worth"
        ]
    },
    {
        "file_name": "money-principles-20s",
        "course_id": "ai-businesses-12",
        "slug": "the-5-money-principles-that-will-make-anyone-rich-in-their-20s",
        "title": "The 5 Money Principles that will make anyone RICH in their 20s",
        "short_desc": "The 5 stoic commandments that separate young men and women who look rich from those who become permanently wealthy before age 30.",
        "full_desc": "A profound, narrative-driven blueprint on behavioral finance and economic sovereignty in your twenties. Master the 5 sacred commandments: living off operational surplus rather than investments, ruthlessly quarantining lifestyle creep, keeping deep liquid war chests, taking convex asymmetric bets, and curating your inner circle as an asset class.",
        "modules": P12_MODULES,
        "hours_of_material": "7.5 hours",
        "badge": "Top Rated",
        "rating": 4.9,
        "rating_count": 524,
        "students": "2,410",
        "target_audience": [
            "Young ambitious individuals in their 20s who want to achieve multi-millionaire net worth early",
            "High earners who struggle with lifestyle inflation and saving meaningful velocity capital",
            "Solopreneurs wanting to master capital allocation, liquidity, and asymmetric risk",
            "Anyone wanting to build an unshakeable psychological foundation around money"
        ]
    },
    {
        "file_name": "boring-millionaires-2026",
        "course_id": "ai-businesses-13",
        "slug": "its-boring-but-will-make-even-beginners-millionaires-in-2026",
        "title": "It's Boring, But Will Make Even Beginners Millionaires in 2026",
        "short_desc": "Why flashy businesses crash while unsexy B2B workflow and compliance cash engines silently build eight-figure net worths with zero competition.",
        "full_desc": "An unfiltered commercial breakdown of why 80% of wealth is timing and vehicle selection. Discover how to identify and monopolize dull, unsexy B2B problems (medical clinic follow-ups, contractor billing, document ingestion), build bulletproof automations, land 20 clients paying $2,500/month, and generate $50,000/month net profit with zero hype.",
        "modules": P13_MODULES,
        "hours_of_material": "8.5 hours",
        "badge": "High Demand",
        "rating": 4.9,
        "rating_count": 481,
        "students": "2,050",
        "target_audience": [
            "Beginners frustrated by crowded, trendy online business models who want a real moat",
            "Operators who prefer steady, recurring B2B retainer cashflow over volatile consumer fads",
            "Solopreneurs looking to build simple, standardized automation engines for local businesses",
            "Founders who appreciate the quiet power of building an unshakeable $50k/month cash machine"
        ]
    },
    {
        "file_name": "locked-in-room-350k",
        "course_id": "ai-businesses-14",
        "slug": "i-locked-myself-in-a-room-until-i-built-a-350-000-mo-business",
        "title": "I Locked Myself In a Room Until I Built a $350,000/mo Business",
        "short_desc": "The raw story of falling from $144k in 24 hours to rock bottom, and the 180-day sensory deprivation monk-mode sprint that rebuilt a $350,000/month verified empire.",
        "full_desc": "A cinematic, deeply personal masterclass detailing Sebastian Ghiorghiu's journey from poverty to making $144,000 in 24 hours, losing it all to complacency and supercars, and entering a 180-day radical monk-mode isolation chamber. Learn the exact daily routine, psychological discipline, high-ticket offer architecture, and media flywheel that generated $350,000/month verified net profit.",
        "modules": P14_MODULES,
        "hours_of_material": "8.5 hours",
        "badge": "Trending",
        "rating": 4.9,
        "rating_count": 634,
        "students": "3,120",
        "target_audience": [
            "Entrepreneurs who have tasted early success but lost discipline and need a radical reset",
            "Founders wanting to implement high-ticket B2B service offers and close $10k upfront deals",
            "Content creators looking to build an organic media flywheel that feeds high-ticket services",
            "Anyone needing the psychological blueprint for an unshakeable 180-day focus sprint"
        ]
    },
    {
        "file_name": "four-levels-getting-rich-2026",
        "course_id": "ai-businesses-15",
        "slug": "the-4-levels-to-getting-rich-in-2026",
        "title": "The 4 Levels To Getting RICH in 2026",
        "short_desc": "The definitive economic caste breakdown: how to break through the 4 levels of financial consciousness—from Jeffrey to Sovereign Architect—in 2026.",
        "full_desc": "A hard-hitting philosophical and tactical breakdown of the four levels of financial freedom. Discover how to escape Level 1 (Jeffrey dopamine traps), break out of Level 2 (the Average Man wage cage), evolve past Level 3 (the High-Earner Operator bottleneck), and achieve Level 4 Sovereign Architecture with autonomous digital cashflow and generational assets in 2026.",
        "modules": P15_MODULES,
        "hours_of_material": "6.5 hours",
        "badge": "Bestseller",
        "rating": 4.9,
        "rating_count": 558,
        "students": "2,670",
        "target_audience": [
            "Anyone feeling trapped in their current economic tier who needs an exact ascension roadmap",
            "Level 1 and 2 operators ready to eliminate cheap dopamine and build monetizable skills",
            "Level 3 agency owners and freelancers ready to break the hourly ceiling and own equity",
            "Entrepreneurs aiming for complete Level 4 sovereignty in the 2026 AI-driven economy"
        ]
    },
    {
        "file_name": "ai-revolution-8-ways",
        "course_id": "ai-businesses-16",
        "slug": "the-a-i-revolution-8-ways-to-get-rich",
        "title": "The A.I. Revolution: 8 Ways to get RICH",
        "short_desc": "The 8 proven vehicles to build wealth in the AI revolution: Value Arbitrage, trading bots, autonomous customer support, synthetic media studios, and micro-SaaS.",
        "full_desc": "An actionable, comprehensive guide to the 8 dominant wealth pathways unleashed by the artificial intelligence revolution. Master the core law of Value Arbitrage (packaging open-source foundation models into targeted consumer products), building PineScript trading strategies, deploying automated B2B customer support bots, and running a 95% net margin solo AI solutions firm.",
        "modules": P16_MODULES,
        "hours_of_material": "8.5 hours",
        "badge": "Hot & New",
        "rating": 4.9,
        "rating_count": 592,
        "students": "2,890",
        "target_audience": [
            "Entrepreneurs seeking to capitalize on the greatest technological disruption of our era",
            "Operators looking to deploy Value Arbitrage and package AI wrappers for specific niches",
            "Traders and programmers wanting to use AI for algorithmic trading and script optimization",
            "Consultants aiming to install high-ticket AI support and voice agents for B2B clients"
        ]
    }
]
