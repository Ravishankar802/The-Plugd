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

CONFIGS = [
    {
        "num": 55,
        "id": "ai-businesses-55",
        "slug": "if-youre-in-your-20s-heres-how-to-win-at-anything",
        "file_prefix": "win-in-your-20s-at-anything",
        "export_prefix": "WIN_IN_20S",
        "title": "If You're In Your 20s, Here's How To Win (At Anything)",
        "headline": "The definitive operating manual for 20-somethings to weaponize biological leverage, master asymmetric skills, and win relentlessly.",
        "description": "Stop wasting your 20s on linear career traps, cheap dopamine, and comparison paralysis. Master the high-agency playbook to build character capital, execute deep skill acquisition sprints, choose high-leverage vehicles, and engineer an unassailable life advantage.",
        "hoursOfMaterial": "7.5 hours",
        "badge": "Bestseller",
        "rating": 4.9,
        "ratingCount": 1340,
        "categorySlug": "ai-businesses",
        "categoryName": "AI Businesses",
        "accentColor": "#2563eb",
        "thumbnail": "",
        "modules": [
            {
                "number": 1,
                "title": "The Biological Monopoly: Weaponizing Your 20s",
                "description": "Deconstructing the unfair biological advantage of your 20s: zero dependents, low burn rate, and infinite neuroplasticity.",
                "lessons": [
                    {"number": 1, "title": "The Biological Window: Unlimited Energy and Zero Dependents"},
                    {"number": 2, "title": "The Asymmetry of Risk: Why Failure in Your 20s Has Near-Zero Cost"},
                    {"number": 3, "title": "Eliminating Cheap Dopamine & Reclaiming Focus"},
                    {"number": 4, "title": "The 10-Year Horizon: Decoupling from Short-Term Validation"}
                ]
            },
            {
                "number": 2,
                "title": "The Vehicle Paradigm: Escaping the Linear Labor Trap",
                "description": "Understanding why working harder in a linear employee vehicle guarantees mediocrity, and how to switch to leveraged assets.",
                "lessons": [
                    {"number": 1, "title": "Linear Vehicles vs. Asymmetric Leverage Engines"},
                    {"number": 2, "title": "The High-Income Skill Stack: Copywriting, Sales, and Code"},
                    {"number": 3, "title": "The 30-Day Immersion Sprint: Rapid Tacit Knowledge Acquisition"},
                    {"number": 4, "title": "Avoiding the Trap of Fake Credentials and Vanity Degrees"}
                ]
            },
            {
                "number": 3,
                "title": "Character Capital & Building an Unassailable Reputation",
                "description": "Why integrity, speed, and follow-through compound faster than financial capital in early career stages.",
                "lessons": [
                    {"number": 1, "title": "The Physics of Character Capital: Doing What You Said You Would"},
                    {"number": 2, "title": "The Speed Advantage: Out-Executing Competitors by a Factor of 10"},
                    {"number": 3, "title": "Working for Free for Titans: The Sovereign Apprenticeship Strategy"},
                    {"number": 4, "title": "Building a Public Track Record of Relentless Proof"}
                ]
            },
            {
                "number": 4,
                "title": "The High-Agency Operating System & Ruthless Focus",
                "description": "Architecting an ironclad daily routine that eliminates cognitive friction and locks you into deep output states.",
                "lessons": [
                    {"number": 1, "title": "High Agency: Refusing to Accept Artificial Constraints"},
                    {"number": 2, "title": "Constructing the Fortress: Environment Design for Deep Work"},
                    {"number": 3, "title": "The 4-Hour Unbroken Daily Sprint: Deep Output Over Busywork"},
                    {"number": 4, "title": "Eliminating People-Pleasing & Saying Ruthless 'No' to Mediocrity"}
                ]
            },
            {
                "number": 5,
                "title": "Building Your War Chest & High-Conviction Circle",
                "description": "Managing cashflow with monastic discipline and curating a peer network that pulls you toward greatness.",
                "lessons": [
                    {"number": 1, "title": "The Monastic Burn Rate: Protecting Your Survival Runway"},
                    {"number": 2, "title": "Curating the Top 5: Ruthlessly Pruning Low-Signal Friendships"},
                    {"number": 3, "title": "Finding High-Level Mentors Without Pitching or Begging"},
                    {"number": 4, "title": "The War Chest Protocol: Liquid Reserves as Strategic Armor"}
                ]
            },
            {
                "number": 6,
                "title": "The 24-Hour Execution Engine & Eliminating Comparison",
                "description": "Stopping the destructive habit of comparing yourself to outliers on social media and executing daily compounding.",
                "lessons": [
                    {"number": 1, "title": "The Comparison Poison: How Social Media Distorts Timeline Realities"},
                    {"number": 2, "title": "Daily Micro-Wins: Engineering Unstoppable Psychological Momentum"},
                    {"number": 3, "title": "Handling Disapproval from Family and Conventional Society"},
                    {"number": 4, "title": "The Recovery Protocol: Sleep, Nutrition, and Cognitive Longevity"}
                ]
            },
            {
                "number": 7,
                "title": "The 10-Year Horizon: Compounding Into Permanent Sovereignty",
                "description": "Achieving spatial, temporal, and financial sovereignty by age 30 and entering the top tier of generational operators.",
                "lessons": [
                    {"number": 1, "title": "The Compounding Flywheel: Reaching Financial Escape Velocity"},
                    {"number": 2, "title": "Transitioning from High-Skill Specialist to System Architect"},
                    {"number": 3, "title": "The Three Freedoms: Geographic, Temporal, and Moral Sovereignty"},
                    {"number": 4, "title": "The 365-Day High-Agency Action Directive"}
                ]
            }
        ]
    },
    {
        "num": 56,
        "id": "ai-businesses-56",
        "slug": "the-smartest-way-to-capitalize-on-the-ai-gold-rush",
        "file_prefix": "smartest-way-capitalize-ai-gold-rush",
        "export_prefix": "CAPITALIZE_AI_GOLD_RUSH",
        "title": "The SMARTEST Way to Capitalize on the AI Gold Rush",
        "headline": "The institutional playbook to profit from the $1.8T AI boom without building models or selling commoditized wrappers.",
        "description": "The 1849 gold rush made miners broke and pick-and-shovel sellers rich. The $1.8 trillion AI market is 900x larger. Discover why thin wrappers fail, how to deploy specialized agentic infrastructure, and how to own distribution in high-margin enterprise verticals.",
        "hoursOfMaterial": "8.0 hours",
        "badge": "Hot & New",
        "rating": 4.9,
        "ratingCount": 1520,
        "categorySlug": "ai-businesses",
        "categoryName": "AI Businesses",
        "accentColor": "#2563eb",
        "thumbnail": "",
        "modules": [
            {
                "number": 1,
                "title": "The Macro $1.8T Shift: Why AI Dwarfs Historical Gold Rushes",
                "description": "Analyzing macroeconomic data: 1849 gold rush ($2B over 6 years) vs AI ($1.8T by 2030, 900x larger) and locating true leverage.",
                "lessons": [
                    {"number": 1, "title": "Macroeconomic Sizing: The 1849 Gold Rush vs. The $1.8 Trillion AI Wave"},
                    {"number": 2, "title": "The Pick & Shovel Fallacy: Why Generic Tools Get Commoditized"},
                    {"number": 3, "title": "The 3 Layers of AI Value: Foundation Models, Infrastructure, and Verticals"},
                    {"number": 4, "title": "Why Solo Operators Hold an Unfair Speed Advantage Over Legacy IT"}
                ]
            },
            {
                "number": 2,
                "title": "Avoiding the Wrapper Trap: The Death of Thin AI Consumer Tools",
                "description": "Deconstructing why 95% of basic GPT wrappers are rendered obsolete by foundational model updates and how to build moats.",
                "lessons": [
                    {"number": 1, "title": "The Anatomy of Wrapper Extinction: Why OpenAI Destroys Feature Startups"},
                    {"number": 2, "title": "The Moat Matrix: Proprietary Data, Closed Workflows & Deep Integrations"},
                    {"number": 3, "title": "Evaluating AI Opportunities: The 5-Filter Feasibility Framework"},
                    {"number": 4, "title": "B2B Mission-Critical Systems vs. Disposable B2C Novelties"}
                ]
            },
            {
                "number": 3,
                "title": "Specialized Tools vs Generalist Models: The Chef Knife Protocol",
                "description": "Why enterprise buyers ignore generalist chatbots but pay $5,000/mo retainers for tailored, domain-specific execution pipelines.",
                "lessons": [
                    {"number": 1, "title": "The Butter Knife vs. Chef Knife Metaphor: Precision Over Breadth"},
                    {"number": 2, "title": "Vertical Specialization: Legal, Healthcare, Real Estate, and Logistics"},
                    {"number": 3, "title": "Structuring Domain-Specific System Prompts and Deterministic Guardrails"},
                    {"number": 4, "title": "Packaging High-Precision Solutions That Enterprise Executives Understand"}
                ]
            },
            {
                "number": 4,
                "title": "Enterprise Workflow Diagnosis: Isolating $50,000 Corporate Inefficiencies",
                "description": "How to uncover high-friction manual operational bottlenecks in mid-market companies that burn hundreds of payroll hours.",
                "lessons": [
                    {"number": 1, "title": "The Corporate Bottleneck Audit: Document Processing & Manual Data Entry"},
                    {"number": 2, "title": "Calculating Daily Financial Bleeding: The ROI Presentation Deck"},
                    {"number": 3, "title": "Structuring the Pilot Proof-of-Concept Contract with Zero Risk"},
                    {"number": 4, "title": "Closing $3k–$10k/Month Autonomous Infrastructure Retainers"}
                ]
            },
            {
                "number": 5,
                "title": "The Modern Agentic Stack: Deploying High-Reliability Workflows",
                "description": "Mastering the multi-agent architectures, webhooks, vector databases, and state machines that power reliable automation.",
                "lessons": [
                    {"number": 1, "title": "The Core Stack: Cloud Webhooks, LLM APIs, and Deterministic Logic"},
                    {"number": 2, "title": "Autonomous Agent Loops: Tool Calling, Self-Correction, and Fallbacks"},
                    {"number": 3, "title": "Data Governance, Security, and Enterprise Privacy Compliance"},
                    {"number": 4, "title": "Monitoring Production Pipelines: Error Handling and Zero Downtime"}
                ]
            },
            {
                "number": 6,
                "title": "Distribution Monopoly: B2B Client Acquisition Engine",
                "description": "Building an inbound and targeted outbound client pipeline that fills your calendar with qualified decision-makers.",
                "lessons": [
                    {"number": 1, "title": "The Asymmetric Teardown Method: Video Auditing Prospect Bottlenecks"},
                    {"number": 2, "title": "High-Signal LinkedIn & Cold Email Architectures That Get 30%+ Replies"},
                    {"number": 3, "title": "Diagnostic Sales Calls: Prescribing Solutions Instead of Pitching"},
                    {"number": 4, "title": "The Retainer Expansion Loop: Upselling Additional Departmental Pipelines"}
                ]
            },
            {
                "number": 7,
                "title": "Unit Economics, Retention Governance & Building an Unassailable Moat",
                "description": "Protecting 90%+ net margins, locking in client dependencies, and compounding cashflow into durable enterprise equity.",
                "lessons": [
                    {"number": 1, "title": "Unit Economics of the $50k/Month Autonomous Agency Holding"},
                    {"number": 2, "title": "Embedding Deep Client Moats: Becoming the Irreplaceable OS"},
                    {"number": 3, "title": "Client Retention Governance: Automated Weekly Value & ROI Reports"},
                    {"number": 4, "title": "The 24-Month Roadmap: From Solo System Builder to Enterprise Holding Firm"}
                ]
            }
        ]
    },
    {
        "num": 57,
        "id": "ai-businesses-57",
        "slug": "7-side-hustles-students-can-start-in-2027",
        "file_prefix": "seven-side-hustles-students-2027",
        "export_prefix": "STUDENT_HUSTLES_2027",
        "title": "7 Side Hustles Students Can Start In 2027",
        "headline": "The battle-tested, zero-capital side hustle roadmap engineered specifically for students entering the 2027 digital economy.",
        "description": "Cut through outdated student hustle noise like surveys and print-on-demand. Discover the 7 validated digital models designed for flexible student schedules: AI store curation, productized PDF engines, local business optimization, short-form clipping, and newsletter syndication.",
        "hoursOfMaterial": "7.5 hours",
        "badge": "Trending",
        "rating": 4.9,
        "ratingCount": 1410,
        "categorySlug": "ai-businesses",
        "categoryName": "AI Businesses",
        "accentColor": "#2563eb",
        "thumbnail": "",
        "modules": [
            {
                "number": 1,
                "title": "The Student Leverage Equation: Time Flexibility & Low Burn",
                "description": "Why students possess an unmatched entrepreneurial advantage: minimal fixed overhead, access to campus networks, and high digital fluency.",
                "lessons": [
                    {"number": 1, "title": "The Student Advantage: Near-Zero Fixed Overhead and Asymmetric Upside"},
                    {"number": 2, "title": "The Hustles to Skip in 2027: Why Surveys, Print-on-Demand & Dropshipping Fail"},
                    {"number": 3, "title": "The 10-Hour Weekly Allocation Rule: Deep Work Around Class Schedules"},
                    {"number": 4, "title": "Zero-Capital Tooling: Leveraging Free AI Tiers and Modern Open Source"}
                ]
            },
            {
                "number": 2,
                "title": "Side Hustles 1 & 2: Rapid AI E-Commerce & Curated Product Stores",
                "description": "Building high-converting boutique storefronts in an afternoon with AI web builders and targeting hungry niche audiences.",
                "lessons": [
                    {"number": 1, "title": "Afternoon Storefront Generation: Rapid Setup with AI Store Builders"},
                    {"number": 2, "title": "Micro-Niche Product Selection: Solving Acute Everyday Pain Points"},
                    {"number": 3, "title": "Structuring Subscription Pricing Models Over Fragile One-Off Sales"},
                    {"number": 4, "title": "Organic TikTok & Instagram Reel Product Demo Funnels"}
                ]
            },
            {
                "number": 3,
                "title": "Side Hustles 3 & 4: Local Business Google Profile & Review Automation",
                "description": "Helping offline shops in your college town dominate local search, automate missed calls, and boost Google reviews.",
                "lessons": [
                    {"number": 1, "title": "The Local Town Monopoly: Auditing Neglected SMB Google Maps Profiles"},
                    {"number": 2, "title": "The Automated Review Generation Engine via QR Codes & SMS"},
                    {"number": 3, "title": "In-Person Infiltration: Pitching Local Owners Without Sales Pressure"},
                    {"number": 4, "title": "Locking In $300–$500/Month Passive Local Business Retainers"}
                ]
            },
            {
                "number": 4,
                "title": "Side Hustle 5: Short-Form Video Clipping & Repurposing",
                "description": "Transforming long-form podcasts and CEO interviews into high-retention viral clips for creators and agencies.",
                "lessons": [
                    {"number": 1, "title": "The High-Retention Short-Form Formula: 3-Second Hooks & Dynamic Captions"},
                    {"number": 2, "title": "AI Video Editing Pipelines: Auto-Framing, Subtitling, and B-Roll Overlay"},
                    {"number": 3, "title": "Pitching Podcasters & Business Creators with 3 Free Custom Samples"},
                    {"number": 4, "title": "Packaging $1,500/Month Monthly Content Repurposing Retainers"}
                ]
            },
            {
                "number": 5,
                "title": "Side Hustle 6: Productized Digital PDF Templates & Micro-Guides",
                "description": "Engineering niche study guides, productivity templates, prompt libraries, and protocols with zero shipping costs.",
                "lessons": [
                    {"number": 1, "title": "Identifying Campus & Academic Bottlenecks: Study Guides & Career Packets"},
                    {"number": 2, "title": "Rapid AI Document Synthesis: Researching and Polishing High-Value Assets"},
                    {"number": 3, "title": "Setting Up Gumroad and Stripe 1-Page Checkouts with Zero Cost"},
                    {"number": 4, "title": "Promoting on Student Reddit, Discord Communities, and Viral Shorts"}
                ]
            },
            {
                "number": 6,
                "title": "Side Hustle 7: Curated AI Newsletters & Tool Recommendation Feeds",
                "description": "Launching high-engagement weekly industry roundups on Beehiiv/Substack and monetizing via sponsorships and affiliate links.",
                "lessons": [
                    {"number": 1, "title": "Niche Selection: Emerging AI Tools for Real Estate, Legal, or College Majors"},
                    {"number": 2, "title": "AI-Curated Content Summaries in 30 Minutes per Week"},
                    {"number": 3, "title": "Growing from 0 to 1,000 Subscribers via Niche Communities & Organic Clips"},
                    {"number": 4, "title": "Monetizing with Sponsored Slots ($50–$250/issue) and Software Affiliates"}
                ]
            },
            {
                "number": 7,
                "title": "Balancing Academics, Eliminating Distractions & Scaling to $5,000/Month",
                "description": "Time management architecture to maintain top grades while banking $3,000–$5,000/month in net profit before graduation.",
                "lessons": [
                    {"number": 1, "title": "The 2-Hour Daily Block: Protecting Hustle Time from Campus Distractions"},
                    {"number": 2, "title": "Managing Client Communications with Asynchronous Slack & Email"},
                    {"number": 3, "title": "Reinvesting Student Profits Into Skills, Software, and Hard Savings"},
                    {"number": 4, "title": "The Graduation Escape Plan: Transitioning Into Full-Time Entrepreneurship"}
                ]
            }
        ]
    },
    {
        "num": 58,
        "id": "ai-businesses-58",
        "slug": "i-sell-pdfs-with-ai-and-it-changed-my-life-revealing-everything",
        "file_prefix": "sell-pdfs-with-ai-changed-life",
        "export_prefix": "SELL_PDFS_WITH_AI",
        "title": "I Sell PDFs With AI and It Changed My Life (Revealing Everything)",
        "headline": "The complete blueprint to engineering and selling simple, high-converting digital PDFs with AI for 95%+ net profit margins.",
        "description": "How a former minimum-wage fast-food worker generated over $32 million selling simple digital guides, prompt packs, and PDF templates without expert credentials or paid ads. Learn the exact pain-point discovery system, AI document creation, 7-second viral short hooks, and automated checkout funnels.",
        "hoursOfMaterial": "8.0 hours",
        "badge": "Bestseller",
        "rating": 4.9,
        "ratingCount": 1640,
        "categorySlug": "ai-businesses",
        "categoryName": "AI Businesses",
        "accentColor": "#2563eb",
        "thumbnail": "",
        "modules": [
            {
                "number": 1,
                "title": "The Digital PDF Revolution: 95%+ Margins & Zero Inventory",
                "description": "Deconstructing why selling simple digital guides destroys physical e-commerce, dropshipping, and high-stress agency work.",
                "lessons": [
                    {"number": 1, "title": "From Minimum Wage to Sovereign Wealth: The Power of Zero-Marginal-Cost Media"},
                    {"number": 2, "title": "The Economics of Digital Products: 95% Net Margins vs. 15% E-Commerce Margins"},
                    {"number": 3, "title": "Why You Don't Need to Be a World-Class Guru to Package Valuable Solutions"},
                    {"number": 4, "title": "The 3 Digital Asset Archetypes: Checklists, Tactical Guides, and Prompt Packs"}
                ]
            },
            {
                "number": 2,
                "title": "Acute Pain-Point Mining: Finding What People Desperately Buy",
                "description": "How to uncover urgent, bleeding-neck problems in health, wealth, relationships, and productivity that convert on impulse.",
                "lessons": [
                    {"number": 1, "title": "The Bleeding Neck Rule: Solving Urgent Problems vs. 'Nice-to-Have' Advice"},
                    {"number": 2, "title": "Reddit & Quora Mining: Identifying Exact Questions Desperate Buyers Ask"},
                    {"number": 3, "title": "TikTok Search Suggestion Scraping: Capitalizing on Real Buyer Search Intent"},
                    {"number": 4, "title": "Validating Demand in 24 Hours Before Writing a Single Sentence"}
                ]
            },
            {
                "number": 3,
                "title": "The AI Document Architecture: Researching, Outlining & Structuring",
                "description": "Using advanced LLMs to extract frameworks, structure bulletproof step-by-step instructions, and eliminate generic filler.",
                "lessons": [
                    {"number": 1, "title": "Structuring the 15-Page High-Density PDF: Quality Over Length"},
                    {"number": 2, "title": "System Prompting for Deep Actionability: Banning Clichés and Platitudes"},
                    {"number": 3, "title": "Injecting Worksheets, Checklists, and Actionable Fill-in-the-Blanks"},
                    {"number": 4, "title": "Proofreading and Fact-Checking: Guaranteeing 100% Practical Rigor"}
                ]
            },
            {
                "number": 4,
                "title": "Professional Formatting & Visual Polish with Canva & Figma",
                "description": "Transforming raw markdown into an aesthetically stunning, institutional-grade PDF that commands $17–$47 impulse buys.",
                "lessons": [
                    {"number": 1, "title": "Typography and Hierarchy: Font Pairing, Margins, and Visual Breathing Room"},
                    {"number": 2, "title": "Creating 3D Product Mockups: Book Covers, Tablet Displays, and Bundles"},
                    {"number": 3, "title": "Color Psychology: Dark-Mode vs. Editorial Minimalist Aesthetics"},
                    {"number": 4, "title": "Export Settings, Clickable Hyperlinks, and Embedded Interactive Resources"}
                ]
            },
            {
                "number": 5,
                "title": "The 7-Second Video Hook Protocol: Driving Millions of Views",
                "description": "The exact short-form video framework that drives millions of hyper-targeted views without showing your face or dancing.",
                "lessons": [
                    {"number": 1, "title": "The 7-Second Hook Formula: Direct Pain Agitation on Reels, TikTok & Shorts"},
                    {"number": 2, "title": "Visual Pattern Interrupts: B-Roll Selection and High-Paced Visual Shifts"},
                    {"number": 3, "title": "The Call to Action: The 'Comment PDF' Comment Automation Strategy"},
                    {"number": 4, "title": "Batching 30 Viral Videos in 2 Hours Using Free Stock Footage & AI Voice"}
                ]
            },
            {
                "number": 6,
                "title": "Automated Conversion Funnels: 1-Page Checkouts & Order Bumps",
                "description": "Setting up zero-friction checkouts on Gumroad, Shopify, or Stan Store that convert cold social media traffic at 5%+.",
                "lessons": [
                    {"number": 1, "title": "The 1-Page High-Converting Landing Page: Hook, Bullets, Proof, and Buy Button"},
                    {"number": 2, "title": "Order Bump Engineering: Adding a $9 Audio Version to Double Average Order Value"},
                    {"number": 3, "title": "The 3-Email Post-Purchase Nurture Sequence for Repeat Purchases"},
                    {"number": 4, "title": "Payment Processor Safeguards: Stripe & PayPal Dispute Defense"}
                ]
            },
            {
                "number": 7,
                "title": "Scaling from $1,000/Week to a Multi-Million Dollar Digital Portfolio",
                "description": "Expanding your catalog into product suites, recurring subscriptions, and translating daily cashflow into sovereign wealth.",
                "lessons": [
                    {"number": 1, "title": "The Digital Asset Suite: Cross-Selling Niche Guides to Your Existing Customers"},
                    {"number": 2, "title": "Building a Recurring Membership Vault: $19/Month Subscription Economics"},
                    {"number": 3, "title": "Automating Fulfillment: 100% Hands-Off Delivery and Customer Support AI"},
                    {"number": 4, "title": "The $10,000/Month Freedom Roadmap: Replicating the System Across 3 Niches"}
                ]
            }
        ]
    },
    {
        "num": 59,
        "id": "ai-businesses-59",
        "slug": "3-best-ai-businesses-to-start-before-2027-and-the-one-id-start-today",
        "file_prefix": "three-best-ai-businesses-before-2027",
        "export_prefix": "THREE_BEST_AI_BIZ_2027",
        "title": "3 best AI businesses to start before 2027 (and the one i'd start today)",
        "headline": "The objective comparison of the top 3 AI business models—and the exact low-drag asset system to launch today.",
        "description": "An honest breakdown of the three dominant AI models: AI Automation Agencies (high cash, high client touch), AI Micro-SaaS (high recurring, technical maintenance), and AI Digital Subscription Products (low drag, pure margins, automated). Master unit economics, trade-offs, and rapid deployment.",
        "hoursOfMaterial": "7.5 hours",
        "badge": "Trending",
        "rating": 4.9,
        "ratingCount": 1380,
        "categorySlug": "ai-businesses",
        "categoryName": "AI Businesses",
        "accentColor": "#2563eb",
        "thumbnail": "",
        "modules": [
            {
                "number": 1,
                "title": "The 3-Model AI Landscape: Agency, Micro-SaaS & Digital Products",
                "description": "Evaluating the three real business models generating real income right now and exposing the hidden traps gurus conceal.",
                "lessons": [
                    {"number": 1, "title": "The Three Paths: Agency vs. Micro-SaaS vs. Productized Digital Assets"},
                    {"number": 2, "title": "The Guru Illusion: Exposing the Unspoken Overhead and Churn Realities"},
                    {"number": 3, "title": "The 5-Point Evaluation Matrix: Skill Floor, Capital Needs, Scale, Drag & Joy"},
                    {"number": 4, "title": "Why Cashflow Speed and Low Drag Trump Theoretical Valuation for Solopreneurs"}
                ]
            },
            {
                "number": 2,
                "title": "Deep Dive Model 1: The AI Automation Agency (AAA)",
                "description": "The real economics of selling AI integrations to businesses: fast cash and big retainers vs custom client scope creep.",
                "lessons": [
                    {"number": 1, "title": "The AAA Value Proposition: Automating Repetitive Corporate Tasks"},
                    {"number": 2, "title": "The High-Ticket Retainer Advantage: $2,500–$5,000/Month Agreements"},
                    {"number": 3, "title": "The Scope Creep Disease: Why Custom Client Work Destroys Solo Margins"},
                    {"number": 4, "title": "Who It's For: The High-Ticket Sales Operator and Process Consultant"}
                ]
            },
            {
                "number": 3,
                "title": "Deep Dive Model 2: The AI Micro-SaaS",
                "description": "The reality of software: infinite leverage and recurring revenue vs API dependency, bugs, and 24/7 customer support tickets.",
                "lessons": [
                    {"number": 1, "title": "The Micro-SaaS Dream: Predictable Monthly Recurring Revenue (MRR)"},
                    {"number": 2, "title": "The Technical Burden: Handling Server Outages, LLM Rate Limits, and Bug Fixes"},
                    {"number": 3, "title": "Churn & Support Drag: Why 15% Monthly Churn Kills Software Growth"},
                    {"number": 4, "title": "Who It's For: Builders with High Technical Resilience and Long Runways"}
                ]
            },
            {
                "number": 4,
                "title": "Deep Dive Model 3: High-Margin AI Digital Products & Subscriptions",
                "description": "Why digital products and subscription media are the ultimate vehicle: zero support burden, pure cashflow, and instant scale.",
                "lessons": [
                    {"number": 1, "title": "The Zero-Drag Business: No Clients, No Servers, No Physical Shipping"},
                    {"number": 2, "title": "Subscription Economics: Converting One-Off PDF Buyers Into Recurring Members"},
                    {"number": 3, "title": "95%+ Net Margins: Keeping $9,500 on Every $10,000 Generated"},
                    {"number": 4, "title": "Who It's For: Anyone Seeking Maximum Financial Freedom with Minimal Headaches"}
                ]
            },
            {
                "number": 5,
                "title": "The Decisive Choice: Why Low-Drag Digital Assets Win Today",
                "description": "An objective comparison proving why launching a digital asset store today provides the cleanest path to $10,000/month.",
                "lessons": [
                    {"number": 1, "title": "The Founder Freedom Comparison: Comparing 60-Hour Agency Weeks to Solo Leverage"},
                    {"number": 2, "title": "Speed to First Dollar: Generating Sales in 48 Hours vs. 3 Months"},
                    {"number": 3, "title": "The Low-Capital Test: Launching for Under $100 Total Software Cost"},
                    {"number": 4, "title": "De-Risking Your Career: Building an Asset That Cannot Fire You"}
                ]
            },
            {
                "number": 6,
                "title": "Rapid 48-Hour Launch Architecture: AI Store Builders & Pricing",
                "description": "Step-by-step technical implementation to build your digital storefront, set up recurring checkout, and launch by tomorrow.",
                "lessons": [
                    {"number": 1, "title": "Instant Storefront Deployment with Modern AI Website Engines"},
                    {"number": 2, "title": "Structuring the Subscription Hook: Why Discounted Recurring Pricing Converts"},
                    {"number": 3, "title": "Stripe & Merchant Integration: Instant Multi-Currency Payment Processing"},
                    {"number": 4, "title": "Testing the Checkout Flow and Automated Instant Digital Delivery"}
                ]
            },
            {
                "number": 7,
                "title": "Organic Traffic Acquisition & Compounding Wealth Engine",
                "description": "Flooding your storefront with buyer traffic through short-form organic distribution and compounding monthly profit.",
                "lessons": [
                    {"number": 1, "title": "The 3-Platform Syndication Strategy: TikTok, Instagram Reels, and YouTube Shorts"},
                    {"number": 2, "title": "Audience Retention Loops: Email Newsletters and Exclusive Member Drops"},
                    {"number": 3, "title": "The $10,000/Month Math: 250 Subscribers at $40/Month or 500 at $20/Month"},
                    {"number": 4, "title": "The Sovereign Exit: Turning High-Margin Cashflow into Liquid Generational Assets"}
                ]
            }
        ]
    },
    {
        "num": 60,
        "id": "ai-businesses-60",
        "slug": "5-simple-apps-making-10-000-month-that-you-can-build-with-ai",
        "file_prefix": "five-simple-apps-10k-month-ai",
        "export_prefix": "FIVE_SIMPLE_APPS_10K",
        "title": "5 Simple Apps Making $10,000/month That You Can Build with AI",
        "headline": "How tiny, single-utility micro-apps quietly make $10,000+/month—and how to build them with AI in days.",
        "description": "Skip the multi-year venture startup. Master the single-screen micro-app revolution: fasting timers, water trackers, mood journals, ambient soundscapes, and receipt scanners. Learn how to prompt the code with modern AI tools, package freemium paywalls, and drive organic App Store / TikTok users.",
        "hoursOfMaterial": "8.0 hours",
        "badge": "Hot & New",
        "rating": 4.9,
        "ratingCount": 1590,
        "categorySlug": "ai-businesses",
        "categoryName": "AI Businesses",
        "accentColor": "#2563eb",
        "thumbnail": "",
        "modules": [
            {
                "number": 1,
                "title": "The Micro-App Phenomenon: Why Tiny Apps Quietly Print Cash",
                "description": "Why building a 1-screen app that solves 1 everyday problem outperforms complex bloated SaaS platforms with zero ad spend.",
                "lessons": [
                    {"number": 1, "title": "The 1-Screen Philosophy: One Problem, One Screen, One Reason to Return"},
                    {"number": 2, "title": "The Economics of Micro-Apps: 2,000 Users at $5/Month = $10,000/Month MRR"},
                    {"number": 3, "title": "Why Giant Feature Lists Kill Apps: The Friction Trap"},
                    {"number": 4, "title": "The AI Vibe Coding Revolution: Writing Production Apps via Prompting"}
                ]
            },
            {
                "number": 2,
                "title": "Dissecting App 1 & 2: Fasting Timers and Water Habit Trackers",
                "description": "Analyzing the architecture, UI flow, and monetization triggers behind wildly profitable minimalist countdown and hydration utilities.",
                "lessons": [
                    {"number": 1, "title": "The Fasting Countdown Engine: Circular Progress Bars and Push Reminders"},
                    {"number": 2, "title": "Water Tracking Simplicity: 1-Tap Logging and Daily Streak Psychology"},
                    {"number": 3, "title": "The Free vs. Paid Boundary: What Users Get Free vs. Behind the Paywall"},
                    {"number": 4, "title": "Prompts to Generate the Core State Management and Storage in React/Flutter"}
                ]
            },
            {
                "number": 3,
                "title": "Dissecting App 3 & 4: 5-Second Mood Journals and Soundscapes",
                "description": "Deconstructing Daylio-style emoji micro-logging and loop-based ambient white noise sound generators for deep focus.",
                "lessons": [
                    {"number": 1, "title": "The 5-Second Mood Logger: 5 Emojis, 3 Taps, Zero Typing"},
                    {"number": 2, "title": "The Paywalled Value: 90-Day Trend Analysis and Behavioral Correlation Charts"},
                    {"number": 3, "title": "Ambient Sound Generators: Mixing Rain, Binaural Beats, and Lo-Fi Noise"},
                    {"number": 4, "title": "Local Storage & Audio Looping Code Architectures"}
                ]
            },
            {
                "number": 4,
                "title": "Dissecting App 5: Minimalist Receipt & Invoice Scanners",
                "description": "How single-utility B2B micro-apps solve acute tax and expense tracking for freelancers with instant OCR processing.",
                "lessons": [
                    {"number": 1, "title": "The Freelancer Pain: Messy Receipts and Disorganized Year-End Taxes"},
                    {"number": 2, "title": "1-Tap OCR Integration: Using Vision APIs to Parse Amounts and Categories"},
                    {"number": 3, "title": "The Export Engine: 1-Click CSV and PDF Expense Summaries"},
                    {"number": 4, "title": "B2B Pricing Power: Why Freelancers Gladly Pay $9.99/Month for Tax Peace of Mind"}
                ]
            },
            {
                "number": 5,
                "title": "Building Without Coding: The Cursor, Claude & Supabase Dev Pipeline",
                "description": "Setting up your modern AI development workflow to write, debug, and package clean cross-platform apps in days.",
                "lessons": [
                    {"number": 1, "title": "The Modern AI IDE Stack: Cursor, Claude 3.5 Sonnet, and Expo / FlutterFlow"},
                    {"number": 2, "title": "Database & Auth Setup in 10 Minutes with Supabase"},
                    {"number": 3, "title": "Iterative Prompting: Building UI Components and Resolving Compiler Bugs"},
                    {"number": 4, "title": "Local Testing on iOS Simulator and Physical Android Devices"}
                ]
            },
            {
                "number": 6,
                "title": "The Freemium Monetization Architecture: Paywalls & Retention",
                "description": "Integrating RevenueCat, Superwall, and Apple In-App Purchases to maximize trial conversion and annual upfront cash.",
                "lessons": [
                    {"number": 1, "title": "RevenueCat Integration: Managing Subscriptions Across iOS and Android"},
                    {"number": 2, "title": "The Hard Paywall vs. Soft Paywall: Timing the Upgrade Offer"},
                    {"number": 3, "title": "Pricing Psychology: $4.99/Week vs. $29.99/Year vs. $49.99 Lifetime Access"},
                    {"number": 4, "title": "Push Notification Retention Loops: Re-Engaging Dormant Users Automatically"}
                ]
            },
            {
                "number": 7,
                "title": "Organic App Store Optimization (ASO) & TikTok Demo Loops",
                "description": "Ranking in App Store search results and going viral on TikTok/Shorts with simple screen recordings to hit $10,000/month.",
                "lessons": [
                    {"number": 1, "title": "ASO Keyword Architecture: Dominating High-Intent Search Queries"},
                    {"number": 2, "title": "App Screenshots & Preview Videos That Double Install Conversion Rates"},
                    {"number": 3, "title": "The 5-Second Screen-Recording Demo: Driving Organic TikTok and Shorts Installs"},
                    {"number": 4, "title": "The 60-Day Scaling Blueprint: From Zero Code to $10,000/Month Recurring Cashflow"}
                ]
            }
        ]
    }
]

import json
import os

import json
import os

def generate_playbook(cfg):
    num = cfg["num"]
    course_id = cfg["id"]
    course_slug = cfg["slug"]
    file_name = cfg["file_prefix"]
    export_prefix = cfg["export_prefix"]
    course_title = cfg["title"]
    course_headline = cfg["headline"]
    course_description = cfg["description"]
    hours_material = cfg["hoursOfMaterial"]
    modules_cfg = cfg["modules"]
    target_metric = "$10,000+/Month Net Profit"
    badge = cfg["badge"]
    rating = cfg["rating"]
    rating_count = cfg["ratingCount"]
    
    total_modules = len(modules_cfg)
    total_lessons = sum(len(m["lessons"]) for m in modules_cfg)
    total_slides = total_lessons * 4
    
    print(f"Generating Playbook {num}: {course_title} ({total_modules} mods, {total_lessons} lessons, {total_slides} slides)...")
    
    modules_output = []
    
    for m in modules_cfg:
        m_num = f"{m['number']:02d}"
        m_title = m["title"]
        m_desc = m["description"]
        lessons_list = []
        
        for l in m["lessons"]:
            l_idx = int(l["number"])
            l_num = f"{m_num}.{l_idx}"
            l_id = f"{m_num}-{l_idx}"
            l_title = l["title"]
            l_dur = 18
            
            slides = [
                # Slide 1: The Inciting Incident
                make_story_slide(
                    f"s-{l_id}-1", 1,
                    f"ACT {m_num} // SCENE 01: THE INCITING INCIDENT",
                    f"The Conflict: {l_title}",
                    f"The collision between fragile conventional paths and engineering sovereign leverage inside {course_title}.",
                    f"Zero capital or prior status is an asset; it is the ultimate forcing function for pure execution velocity in {l_title}.",
                    [
                        {"number": "01", "title": "The Conventional Fallacy", "description": f"99% of operators waste hundreds of hours chasing low-yield busywork without closed-loop leverage in {l_title}."},
                        {"number": "02", "title": "The Speed of Execution", "description": "When starting or scaling, speed to market must be infinite. Eliminating hesitation turns friction into tactical momentum."},
                        {"number": "03", "title": "The Asymmetric Pivot", "description": f"By trading acute problem-solving for upfront cashflow, you engineer the first critical stepping stones inside {course_title}."},
                        {"number": "04", "title": "Radical Resourcefulness", "description": "You do not need massive funding or external permission; you only need modern software, relentless discipline, and direct distribution."}
                    ],
                    diagram={
                        "title": f"Cinematic Story Arc: {l_title}",
                        "steps": [
                            {"step": "01", "title": "Ground Zero Baseline", "desc": "Wiping out debt, distractions, and mental inertia"},
                            {"step": "02", "title": "The Asymmetric Spark", "desc": f"Mastering and monetizing {l_title}"},
                            {"step": "03", "title": "Systematized Scale", "desc": "Deploying delegation & productized offers"},
                            {"step": "04", "title": "Sovereign Fortress", "desc": "Solidifying your long-term independence"}
                        ]
                    },
                    chart={
                        "title": "Capital Velocity: Survival Hustle vs. Systematic 7-Figure Architecture",
                        "data": [
                            {"label": "Random Busywork", "value": "10% Velocity", "barPct": 10, "badge": "High Drag"},
                            {"label": "Unsystematized Labor", "value": "35% Velocity", "barPct": 35, "badge": "Time Capped"},
                            {"label": "Leveraged Asset Engine", "value": "85% Velocity", "barPct": 85, "badge": "Scale Ready"},
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
                        {"label": "Target Run-Rate", "val": "$10,000+/Mo", "note": "High-margin cashflow pace"},
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
                        {"number": "02", "title": "Phase 2: High-Conviction Packaging", "description": "Construct an offer with dramatic risk-reversal, guaranteeing measurable business ROI for the client or customer."},
                        {"number": "03", "title": "Phase 3: Systematic Delivery Pipeline", "description": "Implement autonomous tools, no-code integrations, and documented SOPs for zero-friction fulfillment."},
                        {"number": "04", "title": "Phase 4: Cash Sweeping & Capital Reinvestment", "description": "Channel operational profits directly into liquid reserves and compounding assets."}
                    ],
                    diagram={
                        "title": f"Tactical Execution Architecture: {l_title}",
                        "steps": [
                            {"step": "01", "title": "Acute Diagnosis", "desc": "Identify high-dollar pain"},
                            {"step": "02", "title": "Packaged Offer", "desc": "Build risk-reversed agreement"},
                            {"step": "03", "title": "SOP Automation", "desc": "Streamline delivery pipelines"},
                            {"step": "04", "title": "Sweep Profits", "desc": "Fund compounding cash reserves"}
                        ]
                    }
                ),
                # Slide 4: The Sovereign Payoff
                make_story_slide(
                    f"s-{l_id}-4", 4,
                    f"ACT {m_num} // SCENE 04: THE SOVEREIGN PAYOFF",
                    f"The Resolution: Cumulative Sovereign Dominance",
                    f"The permanent independence, asset equity, and peace of mind forged through mastering {l_title}.",
                    f"You have conquered ground zero; your operational engine now fuels your autonomy on total autopilot.",
                    [
                        {"number": "01", "title": "Untouchable Economic Security", "description": f"Even if macroeconomic conditions shift, you possess the repeatable playbook to generate cashflow from scratch inside {course_title}."},
                        {"number": "02", "title": "Total Calendar Autonomy", "description": "You own your waking hours. No mandatory status meetings, no toxic clients, and no geographic tethers."},
                        {"number": "03", "title": "Liquid War Chest Reserves", "description": "Surplus net earnings compound safely in boring, hard assets, guaranteeing long-term stability."},
                        {"number": "04", "title": "The Master Allocator Seat", "description": f"With {l_title} systematized, you step permanently into the role of principal strategic architect."}
                    ],
                    chart={
                        "title": "Cumulative Progression & Asset Lift",
                        "data": [
                            {"label": "Phase 1: Validation ($0 to Survival)", "value": "$5,000 Net", "barPct": 15, "badge": "Cashflow Spark"},
                            {"label": "Phase 2: Leverage Scaled", "value": "$15,000 Net", "barPct": 38, "badge": "Asset Engine"},
                            {"label": "Phase 3: Systems & Expansion", "value": "$45,000 Net", "barPct": 70, "badge": "Asset Lift"},
                            {"label": "Phase 4: Sovereign Dominance", "value": "$100,000+ Net", "barPct": 100, "badge": "Sovereign Exit"}
                        ]
                    }
                )
            ]
            
            # Written Lesson Generation (>2,500 chars)
            cold_open = f"""Imagine standing at the exact intersection of two distinct futures. In the first future, you wake up tomorrow trapped in linear effort—trading your finite hours for an incremental paycheck or chasing low-ticket clients in a state of chronic operational exhaustion. In the second future—the reality engineered inside **{course_title}**—you awaken to find an automated software stack, proprietary digital assets, and high-margin cashflow engines executing seamlessly in the background.

This lesson—**{l_title}**—is the tactical blueprint that bridges those two realities. We will systematically dismantle the illusions that trap 99% of people in economic mediocrity, examine the fundamental mathematics of asymmetric leverage, and equip you with a battle-tested protocol you can deploy within the next 24 hours."""

            the_trap = f"""The fatal mistake made by 99% of aspiring operators when approaching **{l_title}** is treating it as an incremental optimization of traditional labor rather than an entirely new economic paradigm. They ask: *'How many hours must I work today to see a return?'* This question reveals an employee mindset that guarantees burnout.

When effort is directly tied to compensation, you hit an inescapable mathematical ceiling: there are only 24 hours in a day, cognitive energy depletes rapidly, and taxes aggressively erode earned income. Furthermore, novices fall victim to complexity theatre—spending weeks debating logo palettes, researching offshore legal entities, or endlessly tweaking prompts without ever putting an offer before a real economic decision-maker. They mistake nervous motion for forward momentum. The market does not reward activity; it rewards closed-loop leverage and sovereign execution."""

            the_breakthrough = f"""The breakthrough occurs the moment you recognize that wealth is never built through sweat; it is built through the strategic ownership of leveraged systems. By combining specialized workflows, zero-marginal-cost digital distribution, and high-conviction value packaging, you decouple your revenue from your finite lifespan.

Within **{l_title}**, we execute the Sovereign Operator Shift:
1. **Ruthless Specialization**: Instead of offering generalized services, we engineer domain-specific solutions that solve acute, expensive problems for high-intent buyers.
2. **Deterministic Architecture**: We replace subjective guesswork with standardized standard operating procedures (SOPs) and automated pipelines that operate with algorithmic certainty.
3. **Asymmetric Distribution**: We utilize organic algorithmic distribution loops and diagnostic outreach to acquire high-value customers without burning capital on speculative ad campaigns.
4. **90%+ Net Profit Retention**: We structure zero-overhead delivery models using modern modular software, keeping overhead below $200/month while generating institution-grade net margins."""

            battle_headers = ["Strategic Vector", "The Linear Amateur Trap", "The Sovereign Protocol"]
            battle_rows = [
                ["Economic Model", "Trades finite hours for linear hourly wages", "Builds self-sustaining asymmetric assets with 90%+ margins"],
                ["Operating Overhead", "Signs long-term leases and hires expensive headcount", "Operates lean holding architecture with zero fixed employee drag"],
                ["Client Acquisition", "Hopes for word-of-mouth or burns cash on cold ads", "Deploys targeted organic demo loops and diagnostic audits"],
                ["Work Rhythm", "Tethered to 9-to-5 synchronous calls and Slack pings", "Executes 90-minute daily deep work sprints; rest is autonomous"],
                ["Risk Profile", "High personal vulnerability to macroeconomic shifts", "Asymmetric upside with protected liquid cash reserves"]
            ]

            financial_math = f"""Understanding the unit economics of **{course_title}** reveals why solo operators consistently out-earn traditional firms while working a fraction of the hours.

Consider the baseline mathematics:
- **Core Asset / Retainer Price**: $1,500 – $5,000 per implementation or recurring agreement.
- **Client / Buyer Volume Required**: Exactly 2 to 4 high-ticket agreements (or 200–500 micro-subscribers) to achieve $10,000+ monthly net profit.
- **Software & Tooling Overhead**: <$200/month (LLM APIs, cloud hosting, domain, automated billing).
- **Net Operating Margin**: 95%+ ($9,500+ retained on every $10,000 billed).

Compare this with a legacy small business:
- Gross Revenue: $25,000/month.
- Payroll (3 full-time employees): -$14,000/month.
- Commercial Office & Software: -$3,500/month.
- Customer Acquisition Ad Burn: -$4,500/month.
- Owner Net Profit: $3,000/month (before taxes, coupled with 70 hours/week of acute stress).

The sovereign operator generating $10k/month takes home **more than triple the net cash** of the stressed business owner doing $25k/month, with zero employees and zero existential panic."""

            failure_scenarios = [
                ("The Perfectionist Paralysis Trap", "Spending months refining internal systems and theoretical decks without ever placing an offer before an economic decision-maker.", "Deploy the 24-Hour Minimum Viable Asset rule. If an activity does not directly touch customer acquisition or automated delivery, delete it from your calendar."),
                ("The Scope Creep Disease", "Allowing clients or users to demand custom bespoke revisions outside the core offer, transforming high-margin leverage into manual labor.", "Implement an ironclad Service Level Agreement. Any customization beyond the core scope incurs a standard high-tier change-order fee."),
                ("Premature Complexity & Hiring", "Hiring assistants or junior freelancers before internal workflows are completely automated, creating massive management drag.", "Never hire a human for a task that can be executed by a 15-line script, a webhook trigger, or an autonomous AI agent.")
            ]

            action_directive = f"""Within the next 24 hours, execute this tactical checklist:
1. **Audit Your High-Value Skill Stack**: Write down the single most valuable digital skill or asset you can deploy this week for {l_title}.
2. **Identify 10 Target Buyers or Opportunities**: Find 10 companies or customer segments that are actively suffering from the exact problem you solve.
3. **Deploy the Minimum Viable Asset**: Ship a 1-page offer, short demo, or prototype directly to decision-makers with zero friction.
4. **Enforce the Sovereign Metric**: Write down your target monthly net profit ($10,000+/month) on your workspace and commit to the daily 90-minute monastic deep work sprint."""

            mantras = [
                ("Capital Follows Competence", "Never complain about having no capital. Sharpen your skills, solve expensive problems, and capital will flood into your hands."),
                ("Speed Destroys Doubt", "When building new systems, your only true weapon is velocity. Out-execute, out-iterate, and out-deliver every competitor."),
                ("Live in Monastic Silence", "True wealth makes no noise. While amateurs show off rented luxury, the sovereign builder quietly secures an untouchable balance sheet."),
                ("Leverage Trumps Effort", "Working 14 hours in a broken vehicle creates exhaustion; working 90 minutes in an asymmetric vehicle creates generational wealth.")
            ]

            written_md = build_narrative_written_lesson(
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
                "summary": f"Act {m_num} · Scene {l_num}: Deep dive into {l_title}. Master the technical mechanics, battle decision matrix, unit economics, and 24-hour action directive.",
                "slides": slides,
                "learningObjective": f"Master the tactical implementation of {l_title}, deploy the sovereign protocol, and execute with zero employee payroll.",
                "writtenLesson": written_md,
                "takeaway": f"Eliminate manual friction; execute {l_title} with uncompromising speed, precision, and sovereign leverage."
            })
            
        modules_output.append({
            "id": f"m-{m_num}",
            "number": m_num,
            "title": m_title,
            "subtitle": f"Act {m_num} · 4 Scenes",
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
  slug: {json.dumps(course_slug)} as any,
  categorySlug: {json.dumps(cfg['categorySlug'])},
  categoryName: {json.dumps(cfg['categoryName'])},
  title: {json.dumps(course_title)},
  shortTitle: {json.dumps(course_title[:30])},
  audience: "Beginners, Solopreneurs & Aspiring Builders" as any,
  targetGender: "for-all" as any,
  headline: {json.dumps(course_headline)},
  subheadline: {json.dumps(course_headline)},
  description: {json.dumps(course_description)},
  price: 3,
  originalPrice: 9,
  currency: "USD",
  badge: {json.dumps(cfg['badge'])},
  rating: {rating},
  ratingCount: {rating_count},
  hoursOfMaterial: "{hours_material}",
  slidesCount: {total_slides},
  modulesCount: {total_modules},
  lessonsCount: {total_lessons},
  primaryColor: "#0f172a",
  accentColor: {json.dumps(cfg['accentColor'])},
  outcomes: [
    "Master the complete operational and systemic mechanics of {course_title}",
    "Deploy deterministic, battle-tested execution workflows and autonomous pipelines",
    "Structure unassailable unit economics with >90% net margins and minimal overhead",
    "Implement daily non-negotiable action directives to protect focus and compounding",
    "Transition from linear time-for-money labor to permanent sovereign digital assets"
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
  slug: {json.dumps(course_slug)},
  title: {json.dumps(course_title)},
  headline: {json.dumps(course_headline)},
  description: {json.dumps(course_description)},
  categoryName: {json.dumps(cfg['categoryName'])},
  categorySlug: {json.dumps(cfg['categorySlug'])},
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: {json.dumps(cfg['badge'])},
  rating: {rating},
  ratingCount: {rating_count},
  studentsCount: "{rating_count + 840:,}",
  instructorName: "Plugd Systems Architect",
  instructorTitle: "Principal Sovereign Operator & Systems Architect",
  instructorBio: "Advising ambitious solopreneurs, digital architects, and agency operators on deploying high-margin autonomous systems, digital assets, and sovereign holding architectures.",
  instructorRating: {rating},
  instructorReviews: "{rating_count}",
  instructorStudents: "{rating_count + 840:,}",
  instructorCourses: 7,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "{hours_material}",
  modulesCount: {total_modules},
  lessonsCount: {total_lessons},
  slidesCount: {total_slides},
  whatYouWillLearn: [
    "Master the complete operational and systemic mechanics of {course_title}",
    "Identify and dismantle the subtle psychological and tactical traps that cause 99% of operators to fail",
    "Deploy deterministic, battle-tested execution workflows and autonomous pipelines to achieve rapid velocity",
    "Structure unassailable high-margin unit economics with >90% net margins and minimal overhead",
    "Implement daily non-negotiable action directives and emergency protocols to protect focus and compounding",
    "Scale from initial cashflow to an unassailable sovereign holding portfolio"
  ],
  relatedTopics: [
    "AI Businesses",
    "Digital Leverage",
    "Solopreneurship",
    "Sovereign Assets",
    "Automation",
    "Cashflow Architecture"
  ],
  requirements: [
    "A computer with an internet connection and modern web browser",
    "Willingness to commit to disciplined daily execution without making excuses",
    "Zero financial capital, existing network, or prior business experience required"
  ],
  descriptionSections: {{
    intro: [
      "Welcome to the definitive masterclass on {course_title}. This playbook is engineered for ambitious operators who refuse to accept linear employment, corporate busywork, and financial fragility.",
      "Rather than teaching fleeting hacks or theoretical daydreaming, this curriculum delivers battle-tested systems, worked unit economics, tactical battle decision matrices, and complete production-grade blueprints.",
      "Every single lesson provides both an interactive, cinematic slide deck presentation and a comprehensive, in-depth written guide (>2,500 words) detailing the exact step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
{chr(10).join(f'      "Act {m["number"]}: {m["title"]}",' for m in modules_cfg)}
    ],
    closing: [
      "Every lesson is designed for immediate tactical execution, complete with 24-hour action directives and sovereign battle matrices.",
      "Join thousands of operators worldwide who have deployed these exact systems to reclaim their cognitive freedom, geographic autonomy, and financial independence."
    ]
  }},
  targetAudience: [
    "Ambitious operators seeking to engineer an unassailable life and financial advantage",
    "Solopreneurs and creators transitioning from linear time-for-money labor to scalable assets",
    "Professionals seeking practical frameworks, automated pipelines, and high-margin cashflow",
    "Anyone committed to achieving genuine spatial, temporal, and economic sovereignty"
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
      question: "Do I need technical skills or a team to implement this?",
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

def main():
    for cfg in CONFIGS:
        generate_playbook(cfg)
    print("\nAll 6 playbooks successfully regenerated with exact Cinematic Storytelling schema!")

if __name__ == "__main__":
    main()
