import json

# ==============================================================================
# PLAYBOOK 17: How I turned $300 to $100,000 At 19 (My Side Hustles)
# 7 Modules, 28 Lessons, 112 Slides, 7.5 Hours
# ==============================================================================
P17_MODULES = [
    {
        "num": "01",
        "title": "Act I: The $300 Bank Account & The Caregiver Awakening",
        "desc": "Deconstruct Sebastian Ghiorghiu's starting point: washing cars and working 12-hour caregiving night shifts, and discovering the velocity of liquid cash.",
        "lessons": [
            ("01-1", "01.1", "The $300 Starting Line: Night Shift Reality vs. Asymmetric Dreams", 16),
            ("01-2", "01.2", "The Velocity of Capital: Why Savings Without Arbitrage Stays Flat", 18),
            ("01-3", "01.3", "The Local Phone & Electronics Flipping Machine: From $300 to $1,500", 17),
            ("01-4", "01.4", "Quarantining The Velocity Fund: Resisting the Urge to Spend Early Profits", 19),
        ]
    },
    {
        "num": "02",
        "title": "Act II: The Instagram Theme Page Arbitrage & Shoutout Inversion",
        "desc": "Learn how buying cheap $20–$50 shoutouts on high-engagement meme and luxury pages created immediate, explosive product sales with zero ad inventory risk.",
        "lessons": [
            ("02-1", "02.1", "The Parasite Attention Loop: Why Theme Pages Beat Paid Ad Networks Early", 17),
            ("02-2", "02.2", "Negotiating $20 Shoutouts at 8:00 AM for Maximum Commuter Visibility", 19),
            ("02-3", "02.3", "Engineering the High-Converting 1-Product Storefront on Shopify", 18),
            ("02-4", "02.4", "Capturing 80% Net Margins on Low-Ticket Viral Impulse Buys", 20),
        ]
    },
    {
        "num": "03",
        "title": "Act III: The First Winning Product & The $1,000/Day Inflection",
        "desc": "The raw story of finding the first viral winning product, managing supplier fulfillment bottlenecks, and crossing $1,000 in daily cash receipts.",
        "lessons": [
            ("03-1", "03.1", "Spotting Viral Momentum: The 3 Criteria of a 10x Impulse Product", 17),
            ("03-2", "03.2", "The 8:00 AM Sales Spike: Watching Stripe Explode from a Hospital Shift", 19),
            ("03-3", "03.3", "Supplier Sourcing & Shipping Defense: Eliminating Chargeback Disasters", 18),
            ("03-4", "03.4", "The $10,000 Milestone: Transitioning from Hustler to Business Operator", 20),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: The Second Engine: Building a High-Ticket B2B Service Machine",
        "desc": "Why e-commerce cashflow was reinvested into a zero-inventory local service agency, selling social media marketing to car dealerships and realtors.",
        "lessons": [
            ("04-1", "04.1", "Why E-Commerce Alone is Fragile: The Need for Recurring Retainers", 18),
            ("04-2", "04.2", "Targeting High-Ticket Local Clients: Car Dealerships & Realtors", 20),
            ("04-3", "04.3", "Closing $1,500/Month Retainers with In-Person Diagnostics", 19),
            ("04-4", "04.4", "Delivering Facebook & Instagram Lead Ads with 4 Hours of Work Weekly", 21),
        ]
    },
    {
        "num": "05",
        "title": "Act V: The Six-Figure Threshold: Crossing $100,000 Liquid at Age 19",
        "desc": "The mathematical compounding of stacking e-commerce windfalls and B2B retainers, crossing $100,000 in pure liquid savings before turning twenty.",
        "lessons": [
            ("05-1", "05.1", "The Cold Financial Math: Stacking Cash Engines to Hit $100,000", 18),
            ("05-2", "05.2", "The Psychology of $100k: Breaking Free from Scarcity Anxiety", 20),
            ("05-3", "05.3", "The $2,500/mo Living Quarantine: Resisting the Supercar Temptation Early", 19),
            ("05-4", "05.4", "Defending Your Treasury: Banking, Tax Reserves & Multi-Currency Security", 21),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: The Reinvestment Mandate: From Liquid Cash to Generational Assets",
        "desc": "How Sebastian allocated his first $100,000 into real estate down payments and sovereign investments rather than depreciating luxury items.",
        "lessons": [
            ("06-1", "06.1", "The Down Payment Protocol: Purchasing Your First Cashflow Property at 19", 19),
            ("06-2", "06.2", "House Hacking & Mortgage Elimination: Living for Free with Rental Yield", 21),
            ("06-3", "06.3", "Asymmetric Reinvestment: Funding the Next-Generation Media Flywheel", 20),
            ("06-4", "06.4", "The Rule of Velocity: Keeping Cash Moving to Prevent Capital Rot", 22),
        ]
    },
    {
        "num": "07",
        "title": "Act VII: The 19-Year-Old Playbook for 2026 Beginners",
        "desc": "Translating the $300-to-$100,000 roadmap into modern 2026 tools, AI automations, and asynchronous digital media vehicles.",
        "lessons": [
            ("07-1", "07.1", "The 2026 Bootstrapping Stack: Replacing 2019 Tools with AI Leverage", 19),
            ("07-2", "07.2", "The 90-Day Execution Sprint: From $300 to Your First $10,000 Liquid", 21),
            ("07-3", "07.3", "The Sovereign Mindset: Why Youth is Your Greatest Asymmetric Advantage", 20),
            ("07-4", "07.4", "The Final Blueprint: Building an Untouchable Six-Figure War Chest", 22),
        ]
    }
]

# ==============================================================================
# PLAYBOOK 18: How to become rich with social media (my exact playbook)
# 8 Modules, 32 Lessons, 128 Slides, 8.5 Hours
# ==============================================================================
P18_MODULES = [
    {
        "num": "01",
        "title": "Act I: The 3 Billion Impression Machine & The Myth of Empty Reach",
        "desc": "Alex Hormozi breaks down why 99% of social media creators are broke despite getting millions of views, and establishes the law of Commercial Attention.",
        "lessons": [
            ("01-1", "01.1", "The Broke Creator Paradox: Millions of Views vs. Zero Bank Balance", 16),
            ("01-2", "01.2", "The 35,000 Content Pieces Reality: The Volume & Distribution Engine", 18),
            ("01-3", "01.3", "Reach vs. Purchasing Power: Targeting the 3% Who Control Capital", 17),
            ("01-4", "01.4", "The Three Monetization Horizons: Cashflow, Equity, and Enterprise Value", 19),
        ]
    },
    {
        "num": "02",
        "title": "Act II: Content That Makes Money vs. Content That Gets Views",
        "desc": "Differentiate between viral entertainment that attracts broke teenagers and high-signal, tactical business content that captures ultra-high-net-worth buyers.",
        "lessons": [
            ("02-1", "02.1", "The Audience Filter: Deliberately Repelling Unqualified Prospects", 17),
            ("02-2", "02.2", "Case Study Engineering: Showing Proof-of-Work to Attract Serious Capital", 19),
            ("02-3", "02.3", "The Four Pillars of High-LTV Content: Proof, Frameworks, Beliefs & Math", 18),
            ("02-4", "02.4", "Why Specific Tactical Blueprints Outsell Generic Inspiration 10-to-1", 20),
        ]
    },
    {
        "num": "03",
        "title": "Act III: The Multi-Platform Syndication & Repurposing Architecture",
        "desc": "Build an integrated content factory that turns one high-conviction recording session into 50 platform-optimized assets across YouTube, LinkedIn, X, and TikTok.",
        "lessons": [
            ("03-1", "03.1", "The Pillar-to-Micro Flywheel: Turning 1 Long-Form Video into 20 Micro Assets", 17),
            ("03-2", "03.2", "Platform Native Nuances: Adapting Tone for LinkedIn Professionals vs. X Operators", 19),
            ("03-3", "03.3", "Automating Editing Workflows: The Standard Operating Procedure for Editors", 18),
            ("03-4", "03.4", "Quality vs. Quantity Inversion: Achieving High Quality at Massive Scale", 20),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: The Direct Monetization Funnel: Converting Eyeballs into Retainers",
        "desc": "Construct zero-friction inbound pipelines that guide high-intent social media viewers directly into $5,000–$25,000 consulting, agency, or software contracts.",
        "lessons": [
            ("04-1", "04.1", "The Anti-Pitch Philosophy: Giving Away Your Secrets and Selling the Implementation", 18),
            ("04-2", "04.2", "The Lead Magnet Teardown: Assets that Force Buyers to Raise Their Hands", 20),
            ("04-3", "04.3", "The Inbound DM Infiltration: How Organic Replies Turn into Paid Invoices", 19),
            ("04-4", "04.4", "Closing High-Ticket Contracts Without Ever Sounding Like a Salesperson", 21),
        ]
    },
    {
        "num": "05",
        "title": "Act V: The Audience-to-Equity Arbitrage (Acquisition.com Model)",
        "desc": "How Hormozi uses organic media attention to acquire minority and majority equity stakes in multi-million-dollar private businesses with zero cash outlay.",
        "lessons": [
            ("05-1", "05.1", "The Ultimate Leverage: Trading Media Distribution for Business Equity", 18),
            ("05-2", "05.2", "Vetting Companies: Finding $3M–$10M Businesses Bottlenecked by Marketing", 20),
            ("05-3", "05.3", "Structuring the Advisory & Equity Agreement: 10%–30% Without Buying In", 19),
            ("05-4", "05.4", "Deploying Media Firepower to 3x Portfolio Company Revenue in 12 Months", 21),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: The Personal Monopoly Moat: Becoming Un-Commoditizable",
        "desc": "Build an uncopyable personal monopoly by fusing unique life experience, contrarian business theses, and radical transparency that AI can never replicate.",
        "lessons": [
            ("06-1", "06.1", "The Commodity Trap: Why Generic AI Repurposing Fails Disastrously", 19),
            ("06-2", "06.2", "The Authenticity Moat: Sharing Failures, Lawsuits & Brutal Financial Truths", 21),
            ("06-3", "06.3", "Developing a Proprietary Lexicon: Creating Memorable Business Frameworks", 20),
            ("06-4", "06.4", "The Lindy Effect of Brand: Building Content that Stays Relevant for 10 Years", 22),
        ]
    },
    {
        "num": "07",
        "title": "Act VII: The 1-Person Social Media Operating System for Beginners",
        "desc": "How a solo founder without a 20-person media team can execute the Hormozi playbook in 5 hours per week using modern AI editing tools and disciplined batching.",
        "lessons": [
            ("07-1", "07.1", "The 5-Hour Weekly Batch: Planning, Scripting & Recording in One Morning", 19),
            ("07-2", "07.2", "AI Production Accelerators: Descript, Opus Clip & Claude Formatting", 21),
            ("07-3", "07.3", "The 100-Post Challenge: Surviving the Silence Before Algorithmic Ignition", 20),
            ("07-4", "07.4", "Metrics That Actually Matter: Revenue per Follower vs. Vanity Likes", 22),
        ]
    },
    {
        "num": "08",
        "title": "Act VIII: The Sovereign Media Empire: Compounding Attention into Dynasty",
        "desc": "Scale from content creator to sovereign media titan, owning digital distribution channels that insulate your businesses from economic recessions forever.",
        "lessons": [
            ("08-1", "08.1", "The Attention Fortress: How Owned Media Protects Against Platform Bans", 19),
            ("08-2", "08.2", "Launching Proprietary Software & Communities on Top of Media Traffic", 21),
            ("08-3", "08.3", "The Long-Term Compounding Curve: From $10k/mo to Eight-Figure Portfolios", 20),
            ("08-4", "08.4", "The Sovereign Media Mandate: Never Kneeling to Paid Ad Platforms Again", 22),
        ]
    }
]

# ==============================================================================
# PLAYBOOK 19: How to Get Rich for Service-Based Businesses (Thank Me Later)
# 8 Modules, 32 Lessons, 128 Slides, 8.5 Hours
# ==============================================================================
P19_MODULES = [
    {
        "num": "01",
        "title": "Act I: The 90-Day Challenge: Deconstructing Joey's $55k/Year Plateau",
        "desc": "Step inside Alex Hormozi's real-world consulting crucible: diagnosing why a service business owner working 70 hours a week is trapped at $55k/year.",
        "lessons": [
            ("01-1", "01.1", "The $55k/Year Trap: High Effort, Low Leverage & Broken Unit Economics", 16),
            ("01-2", "01.2", "The 4 Fatal Flaws of Service Businesses: Pricing, Offer, Follow-Up & Sales", 18),
            ("01-3", "01.3", "The Diagnostic Triage: Identifying the Single Bottleneck Bleeding Cash", 17),
            ("01-4", "01.4", "The 90-Day Transformation Roadmap: The Exact Path to $20,000+/Month", 19),
        ]
    },
    {
        "num": "02",
        "title": "Act II: The Grand Slam Offer Inversion: From Hourly Labor to Value Pricing",
        "desc": "Restructure low-ticket commodity services into an irresistible, high-margin package that eliminates client price resistance and commands 5x higher rates.",
        "lessons": [
            ("02-1", "02.1", "The Death of Hourly Billing: Why Trading Time for Dollars Guarantees Poverty", 17),
            ("02-2", "02.2", "The Value Equation: Dream Outcome × Perceived Likelihood / Time & Effort", 19),
            ("02-3", "02.3", "Packaging the Core Deliverable into a $2,500–$5,000 Upfront Transformation", 18),
            ("02-4", "02.4", "The Unconditional Risk Reversal: Guarantees that Make Saying No Feel Stupid", 20),
        ]
    },
    {
        "num": "03",
        "title": "Act III: The Speed-to-Lead Revolution: Sub-5-Minute Response Protocol",
        "desc": "How fixing Joey's lead response delay from 4 hours to 90 seconds instantly tripled appointment booking rates without spending an additional dime on ads.",
        "lessons": [
            ("03-1", "03.1", "The Speed-to-Lead Decay Curve: Why Waiting 30 Minutes Kills 80% of Leads", 17),
            ("03-2", "03.2", "Automating Immediate SMS & Call Triggers Using Make.com and HighLevel", 19),
            ("03-3", "03.3", "The Double-Dial Strategy: Reaching Prospects While Their Intent is White-Hot", 18),
            ("03-4", "03.4", "Qualifying Before Booking: Eliminating Tire-Kickers and Unqualified Callers", 20),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: The Diagnostic Sales Conversation: Closing Without Hard Selling",
        "desc": "Master the consultative sales script that uncovers prospect pain, positions your service as the only logical cure, and closes $3,000 deals on one call.",
        "lessons": [
            ("04-1", "04.1", "The Doctor-Patient Frame: Why Prescription Without Diagnosis is Malpractice", 18),
            ("04-2", "04.2", "The 5 Core Discovery Questions that Reveal the Prospect's Deepest Bleed", 20),
            ("04-3", "04.3", "Presenting the Solution: Connecting Every Feature to Their Specific Wound", 19),
            ("04-4", "04.4", "Handling the 'I Need to Talk to My Spouse / Partner' Objection Flawlessly", 21),
        ]
    },
    {
        "num": "05",
        "title": "Act V: The Immediate Upsell & Ascension Engine: Monetizing Day Zero",
        "desc": "Unpack Hormozi's secret weapon: offering an immediate complementary upsell right after the initial purchase when client buying euphoria is at its peak.",
        "lessons": [
            ("05-1", "05.1", "The Day-Zero Ascension Principle: Why Buyers Want to Buy More Immediately", 18),
            ("05-2", "05.2", "Structuring the Speed & Convenience Upsell (VIP Access & Done-With-You)", 20),
            ("05-3", "05.3", "Turning a $1,500 Sale into a $3,500 Invoice with a Single 2-Minute Script", 19),
            ("05-4", "05.4", "Securing Ongoing Monthly Retainers at Point of Sale with Auto-Renew", 21),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: Asynchronous Fulfillment SOPs: Scaling Past the Founder Bottleneck",
        "desc": "Document and automate client onboarding, deliverable generation, and communication so that tripling client volume does not increase your working hours.",
        "lessons": [
            ("06-1", "06.1", "The Operator Bottleneck: Why Most Founders Become the Janitors of Their Agency", 19),
            ("06-2", "06.2", "Drafting 1-Page Standard Operating Procedures (SOPs) for Every Task", 21),
            ("06-3", "06.3", "Automated Client Onboarding Portals: Zero Friction, Instant Access", 20),
            ("06-4", "06.4", "Using AI to Fulfill Complex Deliverables in 70% Less Time", 22),
        ]
    },
    {
        "num": "07",
        "title": "Act VII: The Referral Engine: Turning 1 Happy Client into 3 Paying Peers",
        "desc": "Install systematic referral request triggers at the emotional climax of client delivery, engineering an automated organic growth loop.",
        "lessons": [
            ("07-1", "07.1", "The Referral Timing Law: When and Exactly How to Ask for Warm Introductions", 19),
            ("07-2", "07.2", "The 10-Minute Video Case Study Formula that Sells Future Prospects for You", 21),
            ("07-3", "07.3", "Structuring Client Referral Incentives that Actually Motivate Executive Clients", 20),
            ("07-4", "07.4", "Turning Positive Reviews into Organic Google and Social Media Domination", 22),
        ]
    },
    {
        "num": "08",
        "title": "Act VIII: The 90-Day Verdict: Reaching $20k+/Month & Sovereign Net Profit",
        "desc": "Analyze the real-world results of applying the Hormozi service playbook: watching Joey cross $25,000/month net profit with predictable recurring cashflow.",
        "lessons": [
            ("08-1", "08.1", "The 90-Day Before & After Audit: Revenue, Margins & Founder Freedom", 19),
            ("08-2", "08.2", "Managing Cash Reserves: Keeping 6 Months of Operating Expenses Liquid", 21),
            ("08-3", "08.3", "The Sovereign Service Model: 10 High-Paying Clients @ $2,500/Month Solo", 20),
            ("08-4", "08.4", "The Master Conclusion: Why Service Businesses are the Greatest Wealth Vehicles", 22),
        ]
    }
]

# ==============================================================================
# PLAYBOOK 20: The New Way of Making Content In The Age of AI
# 6 Modules, 24 Lessons, 96 Slides, 6.5 Hours
# ==============================================================================
P20_MODULES = [
    {
        "num": "01",
        "title": "Act I: The 21 Million Follower Proof & The AI Content Sea of Mediocrity",
        "desc": "Alex Hormozi breaks down why AI has flooded the internet with billions of commoditized, generic posts, and why Proof of Work is the only surviving moat.",
        "lessons": [
            ("01-1", "01.1", "The Flood of Mediocrity: Why 99% of AI-Generated Content Gets Zero Reach", 16),
            ("01-2", "01.2", "The Proof of Work Imperative: Why Audiences Only Trust Operators with Scars", 18),
            ("01-3", "01.3", "The Credibility Arbitrage: The Person with the Most Verifiable Proof Wins", 17),
            ("01-4", "01.4", "The 2026 Content Mandate: Building Media in Spite of AI, Not Just With It", 19),
        ]
    },
    {
        "num": "02",
        "title": "Act II: The 3 Pillars of Uncopyable Content: Proof, Beliefs & Mechanics",
        "desc": "Deconstruct the exact three-part framework Hormozi uses across all 21M followers to produce content that converts viewers into high-LTV business partners.",
        "lessons": [
            ("02-1", "02.1", "Pillar 1: Proof-First Storytelling (Real Revenue, Real Losses, Real Audits)", 17),
            ("02-2", "02.2", "Pillar 2: Contrarian Belief Shifts (Attacking Mainstream Business Myths)", 19),
            ("02-3", "02.3", "Pillar 3: Surgical Mechanics (Step-by-Step Tactical Implementation SOPs)", 18),
            ("02-4", "02.4", "The Synthesis Loop: Combining All Three Pillars into a Single 60s Reel", 20),
        ]
    },
    {
        "num": "03",
        "title": "Act III: Using AI as a Tireless Producer, Never the Creative Author",
        "desc": "The exact tool stack and prompt workflows Acquisition.com uses to cut editing time by 80% while preserving raw, authentic human voice and perspective.",
        "lessons": [
            ("03-1", "03.1", "The Tool Stack: Descript, ElevenLabs, Whisper & Claude Context Engines", 17),
            ("03-2", "03.2", "De-lobotomizing AI Prompts: Feeding Private Transcripts, Never Generic Prompts", 19),
            ("03-3", "03.3", "Automating Chapter Splitting, B-Roll Curation & Pacing Adjustments", 18),
            ("03-4", "03.4", "The Human Quality Gate: Why Every Video Must Pass Human Scrutiny", 20),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: The Personal Brand Economics: Turning Views into Enterprise Value",
        "desc": "Why making content for advertising dollars or sponsorships is amateur hour, and how to use media attention to build multi-million-dollar holding companies.",
        "lessons": [
            ("04-1", "04.1", "The Sponsor Trap: Why Brands Pay Peanuts Compared to Owning the Product", 18),
            ("04-2", "04.2", "The Enterprise Flywheel: How Organic Content Feeds Private Equity Deals", 20),
            ("04-3", "04.3", "Building Zero-CAC Acquisition Channels for Your Own Products & Software", 19),
            ("04-4", "04.4", "The 100x Multiple: Why Attention Tied to Enterprise Equity Creates Billionaires", 21),
        ]
    },
    {
        "num": "05",
        "title": "Act V: The Solo Creator Production Blueprint for 2026",
        "desc": "How a solo operator with a smartphone and a microphone can out-produce legacy media agencies by adhering to the Hormozi batching and recording protocol.",
        "lessons": [
            ("05-1", "05.1", "The Minimalist Studio Setup: iPhone, Lapel Mic, and Natural Lighting", 19),
            ("05-2", "05.2", "The Weekly 90-Minute Recording Sprint: 10 Evergreen Video Assets", 21),
            ("05-3", "05.3", "The Hook Engineering Formula: Stopping the Infinite Doom-Scroll in 2 Seconds", 20),
            ("05-4", "05.4", "Syndicating Across YouTube Shorts, Reels, TikTok & LinkedIn in 1 Click", 22),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: The Sovereign Creator: Building a Brand That Outlives Algorithms",
        "desc": "Fortress your media distribution against algorithmic changes by building deep personal affinity, email list ownership, and undeniable market reputation.",
        "lessons": [
            ("06-1", "06.1", "Algorithmic Immunity: Why True Affinity Never Dies When Platforms Change", 19),
            ("06-2", "06.2", "Converting Ephemeral Followers into Permanent Newsletter Subscribers", 21),
            ("06-3", "06.3", "The Long-Term Compound Effect: Why 3 Years of Content Creates Permanent Wealth", 20),
            ("06-4", "06.4", "The Sovereign Architect: Controlling the Most Valuable Asset in the World", 22),
        ]
    }
]

# ==============================================================================
# PLAYBOOK 21: How to Catch Up In Life (Using Logic)
# 7 Modules, 28 Lessons, 112 Slides, 7.5 Hours
# ==============================================================================
P21_MODULES = [
    {
        "num": "01",
        "title": "Act I: The Late-Start Illusion & The Rationalist Ground Zero",
        "desc": "Deconstruct the psychological paralysis of feeling behind peers, and use cold mathematical logic to prove why life is non-linear and catching up is mathematically simple.",
        "lessons": [
            ("01-1", "01.1", "The Comparison Trap: Why Your Peers' Head Start is a Statistical Illusion", 16),
            ("01-2", "01.2", "The Non-Linear Reality of Wealth: Why 80% of Progress Happens in 20% of Time", 18),
            ("01-3", "01.3", "The $1,000 Liquid Baseline: Sleeping on Gym Floors to $100M+ Net Worth", 17),
            ("01-4", "01.4", "The First Logical Axiom: Eliminating Unproductive Regret and Guilt", 19),
        ]
    },
    {
        "num": "02",
        "title": "Act II: Principle 1: The Asymmetric Skill Stacking Law",
        "desc": "Master the logic of skill stacking: how combining 3 complementary, high-income skills (copywriting, sales, systems) catapults you past 99% of single-skill specialists.",
        "lessons": [
            ("02-1", "02.1", "The Specialist Trap: Why Being in the Top 1% of One Skill is Overrated", 17),
            ("02-2", "02.2", "The Top 20% Rule: How Stacking 3 Decent Skills Creates a 1-in-1,000 Operator", 19),
            ("02-3", "02.3", "The Core Stacking Order: Copywriting -> Direct Sales -> Systems Architecture", 18),
            ("02-4", "02.4", "Using AI to Compress 5 Years of Technical Learning into 90 Days", 20),
        ]
    },
    {
        "num": "03",
        "title": "Act III: Principle 2: The Volume & Aggressive Action Metric",
        "desc": "Replace emotional hesitation with pure mathematical volume: why sending 100 cold proposals guarantees outcomes that thinking about 1 proposal never will.",
        "lessons": [
            ("03-1", "03.1", "The Law of Large Numbers: How Extreme Volume Destroys Uncertainty", 17),
            ("03-2", "03.2", "The 100-Attempt Rule: Committing to 100 Repetitions Before Evaluating Results", 19),
            ("03-3", "03.3", "Removing Emotional Friction: Treating Daily Outreach Like Toothbrushing", 18),
            ("03-4", "03.4", "The Volume Multiplier: Doing in 1 Month What Amateurs Do in 2 Years", 20),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: Principle 3: Ruthless Subtraction & Radical Quarantine",
        "desc": "Catching up requires velocity, and velocity is speed minus drag. Ruthlessly eliminate toxic friends, cheap dopamine, alcohol, and low-yield projects.",
        "lessons": [
            ("04-1", "04.1", "The Physics of Velocity: Why Subtraction Beats Addition Every Time", 18),
            ("04-2", "04.2", "The Zero-Dopamine Quarantine: Eliminating Video Games, Feeds & Distractions", 20),
            ("04-3", "04.3", "Pruning Your Social Circle: The Cost of Hanging Out with Stagnant Friends", 19),
            ("04-4", "04.4", "The 6-Month Monastic Sprint: Operating in Absolute Stealth to Build Leverage", 21),
        ]
    },
    {
        "num": "05",
        "title": "Act V: Principle 4: The Speed of Implementation & Zero-Day Latency",
        "desc": "The single trait that separates winners from losers: the time elapsed between acquiring new knowledge and executing the first real-world action.",
        "lessons": [
            ("05-1", "05.1", "The Latency Metric: Measuring the Gap Between Learning and Doing", 18),
            ("05-2", "05.2", "The 24-Hour Implementation Rule: Deploying Within 24 Hours or Dying", 20),
            ("05-3", "05.3", "Embracing Ugly Execution: Shipping Imperfect Work to Collect Real Data", 19),
            ("05-4", "05.4", "The Rapid Feedback Loop: Adjusting Strategy Based on Market Reality", 21),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: Principles 5 & 6: Living Below Means & Convex Capital Bets",
        "desc": "Maintain a flat personal cost of living regardless of income growth, building an asymmetric war chest that can be deployed into high-yield investments.",
        "lessons": [
            ("06-1", "06.1", "The Expense Freeze: Keeping Living Costs at $3,000 While Earning $20,000", 19),
            ("06-2", "06.2", "The War Chest Psychology: How $50,000 Liquid Changes Your Decision-Making", 21),
            ("06-3", "06.3", "Taking Convex Asymmetric Bets: Low Downside with Unlimited Upside", 20),
            ("06-4", "06.4", "Compounding Surplus Capital into Cashflow Real Estate and Private Equity", 22),
        ]
    },
    {
        "num": "07",
        "title": "Act VII: The Logical Ascension: From Behind in Life to Untouchable Titan",
        "desc": "Synthesize the 6 logical principles into a daily operational lifestyle, watching yourself surpass 10 years of conventional career progress in 24 months.",
        "lessons": [
            ("07-1", "07.1", "The 24-Month Retrospective: How Compounding Inverts Life Trajectory", 19),
            ("07-2", "07.2", "Handling Former Peers Who Now Ask 'What's Your Secret?'", 21),
            ("07-3", "07.3", "The Sovereign Operating Mandate: Never Lowering Your Velocity Again", 20),
            ("07-4", "07.4", "The Final Logical Proof: Why It Is Mathematically Impossible to Fail with Logic", 22),
        ]
    }
]

# ==============================================================================
# PLAYBOOK 22: What Makes The Perfect Business (5 Things)
# 6 Modules, 24 Lessons, 96 Slides, 6.5 Hours
# ==============================================================================
P22_MODULES = [
    {
        "num": "01",
        "title": "Act I: The Vehicle Selection Law: Why 80% of Success is the Business Model",
        "desc": "Alex Hormozi proves why the hardest worker in a broken, low-margin business stays poor while an average operator in a high-leverage vehicle gets wealthy with ease.",
        "lessons": [
            ("01-1", "01.1", "The Boat vs. The Rower: Why Vehicle Selection Outweighs Raw Effort 10-to-1", 16),
            ("01-2", "01.2", "The 5 Advantages Framework: The Anatomy of an Economically Flawless Business", 18),
            ("01-3", "01.3", "Why Most Entrepreneurs Pick Fragile Businesses (Hype, Fads & High Churn)", 17),
            ("01-4", "01.4", "Auditing Your Current Venture Against the 5 Golden Criteria", 19),
        ]
    },
    {
        "num": "02",
        "title": "Act II: Advantage 1: Extreme Gross Margins (85%+ Net Profit Architecture)",
        "desc": "Why gross margin is the oxygen of business growth: how high gross margins fund customer acquisition, forgive operational mistakes, and create massive net cashflow.",
        "lessons": [
            ("02-1", "02.1", "The Margin Multiplier: Why an 85% Margin Business Crushes a 20% Margin Store", 17),
            ("02-2", "02.2", "Cost of Goods Sold (COGS) Elimination: Replacing Physical Labor with Software & Media", 19),
            ("02-3", "02.3", "How High Margins Allow You to Outspend Every Competitor to Acquire Customers", 18),
            ("02-4", "02.4", "Restructuring Your Deliverable to Instantly Double Gross Margin", 20),
        ]
    },
    {
        "num": "03",
        "title": "Act III: Advantage 2: Structural Barriers to Entry & Moats",
        "desc": "If anyone can copy your business in 48 hours, you do not have a business—you have a temporary promotion. Build legal, technical, and distribution moats.",
        "lessons": [
            ("03-1", "03.1", "The Dropshipping Tragedy: Why Zero Barriers to Entry Guarantees Churn", 17),
            ("03-2", "03.2", "The 4 Real Moats: Proprietary Data, Audience Affinity, Switching Costs & Tech", 19),
            ("03-3", "03.3", "Engineering Switching Costs: Making Leaving Your Product Operationally Painful", 18),
            ("03-4", "03.4", "Protecting Your Moat with Brand Reputation and Founder Authority", 20),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: Advantages 3 & 4: Uncapped Pricing Power & Customer Stickiness",
        "desc": "Discover how pricing power allows you to raise rates by 30% with zero lost clients, and how low-churn recurring subscriptions create compounding enterprise value.",
        "lessons": [
            ("04-1", "04.1", "Warren Buffett's Golden Rule: Pricing Power as the Ultimate Health Metric", 18),
            ("04-2", "04.2", "Decoupling Price from Deliverable Costs by Selling Business ROI Transformations", 20),
            ("04-3", "04.3", "The Negative Churn Miracle: When Existing Clients Pay More Every Single Year", 19),
            ("04-4", "04.4", "Retention Architecture: Solving Ongoing Problems to Lock in Lifetime Value", 21),
        ]
    },
    {
        "num": "05",
        "title": "Act V: Advantage 5: Secular Market Tailwinds & Growing Demand",
        "desc": "Why paddling down a raging river is effortless: positioning your business in expanding markets (AI, healthcare, automation) where customer demand outstrips supply.",
        "lessons": [
            ("05-1", "05.1", "The Tailwind Principle: Why Mediocre Operators Win in Booming Sectors", 19),
            ("05-2", "05.2", "Identifying 2026 Macro Growth Sectors: B2B Automation, AI Infrastructure & Media", 21),
            ("05-3", "05.3", "Pivoting an Existing Dying Skill into a High-Tailwind Modern Offering", 20),
            ("05-4", "05.4", "The Demand Test: Validating that Buyers are Actively Searching for Solutions", 22),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: The Perfect Business Blueprint: Execution & Capital Compounding",
        "desc": "Synthesize all 5 advantages into a single, bulletproof enterprise that generates $25,000–$50,000/month net profit with zero employees and infinite enterprise multiple.",
        "lessons": [
            ("06-1", "06.1", "The 5-Advantage Scoring Matrix: Auditing and Optimizing Your Core Venture", 19),
            ("06-2", "06.2", "Building a Lean, High-Margin B2B Machine Targeting $30,000/Month Net Profit", 21),
            ("06-3", "06.3", "Enterprise Valuation Multipliers: How Perfect Businesses Sell for 8x–12x EBITDA", 20),
            ("06-4", "06.4", "The Sovereign Owner: Achieving Total Wealth, Peace, and Temporal Liberty", 22),
        ]
    }
]

# ==============================================================================
# PLAYBOOK 23: How to Use AI in Your Business in 2026
# 7 Modules, 28 Lessons, 112 Slides, 7.5 Hours
# ==============================================================================
P23_MODULES = [
    {
        "num": "01",
        "title": "Act I: The $250M Portfolio AI Operating System: Reality vs. Hype",
        "desc": "Alex Hormozi breaks down how Acquisition.com uses AI across its $250M+ portfolio to make companies Better, Cheaper, Faster, and Less Risky for customers.",
        "lessons": [
            ("01-1", "01.1", "The AI Philosophy of a $250M Portfolio: Better, Cheaper, Faster, Less Risky", 16),
            ("01-2", "01.2", "The Fear & Procrastination Trap: Why Most Business Owners Never Automate", 18),
            ("01-3", "01.3", "The One-Workflow Mandate: Automating Just ONE Bottleneck First", 17),
            ("01-4", "01.4", "Mapping Your Company's Core Operational Value Chain with AI", 19),
        ]
    },
    {
        "num": "02",
        "title": "Act II: Front-End Customer Acquisition: AI Lead Ingestion & Qualification",
        "desc": "Deploy AI agents and prompt pipelines that respond to inbound web leads in sub-60 seconds, qualify buyer intent, and book appointments onto sales calendars 24/7.",
        "lessons": [
            ("02-1", "02.1", "Speed-to-Lead Automation: The Sub-60-Second Inbound Qualification Loop", 17),
            ("02-2", "02.2", "Using LLMs to Score Lead Quality and Filter Out Unqualified Time-Wasters", 19),
            ("02-3", "02.3", "Conversational SMS & Voice Agents that Book Sales Calls on Autopilot", 18),
            ("02-4", "02.4", "Automated Personalized Loom Audits Generated Dynamically for Inbound Leads", 20),
        ]
    },
    {
        "num": "03",
        "title": "Act III: Middle-Office Delivery: Accelerating Fulfillment by 70%",
        "desc": "Integrate foundation models into client onboarding, report generation, and deliverable creation so your existing team can handle 3x more clients without hiring.",
        "lessons": [
            ("03-1", "03.1", "The Fulfillment Bottleneck: Why Servicing Clients Usually Caps Growth", 17),
            ("03-2", "03.2", "Building Custom AI Prompt Templates for Standard Client Deliverables", 19),
            ("03-3", "03.3", "Automated Ingestion & Synthesis of Client Raw Data into Executive Briefs", 18),
            ("03-4", "03.4", "Reducing Delivery Cycle Time from 14 Days to 48 Hours with AI Pipelines", 20),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: Back-Office Operations: Automated Accounting, HR & Legal Triage",
        "desc": "Eliminate expensive administrative overhead by deploying AI agents to parse invoices, reconcile expenses, draft contracts, and summarize customer support tickets.",
        "lessons": [
            ("04-1", "04.1", "The Overhead Tax: How Administrative Busywork Eats 25% of Net Margins", 18),
            ("04-2", "04.2", "Automating Invoice Ingestion, Expense Tagging & P&L Generation", 20),
            ("04-3", "04.3", "AI Legal Triage: Redlining Client MSAs and Vendor Agreements in Seconds", 19),
            ("04-4", "04.4", "Customer Support Categorization & Automated Escalation Protocols", 21),
        ]
    },
    {
        "num": "05",
        "title": "Act V: The Autonomous Agentic Workforce: Connecting Tools via Make & MCP",
        "desc": "Advance from single-prompt ChatGPT queries to autonomous multi-agent systems that coordinate across CRMs, email servers, and project management databases.",
        "lessons": [
            ("05-1", "05.1", "From Chatbots to Agents: Why Autonomous Action Execution is the Frontier", 18),
            ("05-2", "05.2", "Designing Multi-Step Webhook Automations with Make.com and Zapier", 20),
            ("05-3", "05.3", "Deploying Model Context Protocol (MCP) to Connect AI to Internal Databases", 19),
            ("05-4", "05.4", "Supervising Autonomous Agents: Error Handling, Guardrails & Human-in-the-Loop", 21),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: The Competitive Moat: Outpricing & Out-Delivering Legacy Rivals",
        "desc": "How AI-driven operational efficiency enables you to offer lower prices with higher margins, faster turnaround times, and superior guarantees that crush competitors.",
        "lessons": [
            ("06-1", "06.1", "The Competitive Inversion: When Your Delivery Cost is 90% Lower than Rivals", 19),
            ("06-2", "06.2", "Packaging the Speed Advantage: Guaranteeing 24-Hour Turnarounds", 21),
            ("06-3", "06.3", "Reinvesting AI Profit Margins into Aggressive Organic & Paid Acquisition", 20),
            ("06-4", "06.4", "Why Companies that Refuse to Adopt AI Workflows Will Die by 2027", 22),
        ]
    },
    {
        "num": "07",
        "title": "Act VII: The 2026 Executive Roadmap: Total AI Transformation",
        "desc": "A step-by-step 30-day implementation calendar for business owners to audit workflows, deploy AI accelerators, train staff, and compound enterprise profitability.",
        "lessons": [
            ("07-1", "07.1", "Week 1: The Operational Friction Audit: Ranking Tasks by Automation Potential", 19),
            ("07-2", "07.2", "Week 2: Deploying Your First Speed-to-Lead & Onboarding Automations", 21),
            ("07-3", "07.3", "Week 3: Standardizing Fulfillment Prompt Libraries Across Your Team", 20),
            ("07-4", "07.4", "Week 4: The Autonomous Operating Baseline: Banking 20+ Reclaimed Hours Weekly", 22),
        ]
    }
]

# ==============================================================================
# PLAYBOOK 24: If You Have Multiple Interests, Please Start a One-Person Business
# 8 Modules, 32 Lessons, 128 Slides, 8.5 Hours
# ==============================================================================
P24_MODULES = [
    {
        "num": "01",
        "title": "Act I: The Specialist Trap & The Renaissance Polymath Awakening",
        "desc": "Dan Koe breaks down why traditional advice to 'niche down into one tiny topic' kills your creative soul, and why multiple interests are your greatest competitive moat.",
        "lessons": [
            ("01-1", "01.1", "The Industrial Factory Trap: Why Hyper-Specialization Destroys Human Creativity", 16),
            ("01-2", "01.2", "The Modern Renaissance Man: Synthesizing Philosophy, Fitness, Tech & Business", 18),
            ("01-3", "01.3", "The Personal Monopoly: Becoming the Only Person in the World Who Can Be You", 17),
            ("01-4", "01.4", "The Economics of Authenticity: Why True Fans Pay for Your Unique Perspective", 19),
        ]
    },
    {
        "num": "02",
        "title": "Act II: Curating Your Interest Constellation: Finding the Unifying Thread",
        "desc": "Learn how to connect seemingly unrelated hobbies and passions (coding, philosophy, fitness, writing) into a coherent, high-status personal philosophy.",
        "lessons": [
            ("02-1", "02.1", "The Constellation Exercise: Mapping Your 4 Core Pillars of Fascination", 17),
            ("02-2", "02.2", "Finding the Golden Thread: The Central Thesis that Unifies All Your Work", 19),
            ("02-3", "02.3", "The Curated Media Diet: Reading Dense Books and Writing Raw Reflections", 18),
            ("02-4", "02.4", "Packaging Your Multifaceted Life into an Irresistible Personal Brand", 20),
        ]
    },
    {
        "num": "03",
        "title": "Act III: The 1-Person Content Ecosystem: Long-Form Writing to Micro-Media",
        "desc": "Build Dan Koe's celebrated writing and publishing engine: writing one comprehensive long-form newsletter each week and atomizing it into 25 high-impact social posts.",
        "lessons": [
            ("03-1", "03.1", "The Central Engine: Why the Weekly Long-Form Essay is Your Master Asset", 17),
            ("03-2", "03.2", "Atomization Architecture: Turning 1 Essay into 10 Tweets, 5 Threads & 3 Reels", 19),
            ("03-3", "03.3", "The Aphorism Framework: Writing Punchy One-Liners that Stop the Feed", 18),
            ("03-4", "03.4", "Developing an Unmistakable Visual Style: Dark Mode, Minimalist Graphics & Diagrams", 20),
        ]
    },
    {
        "num": "04",
        "title": "Act IV: The Problem-Solver Product: Monetizing What You Just Mastered",
        "desc": "How to package your own life lessons, habit systems, and learning breakthroughs into digital products and courses that solve urgent problems for your past self.",
        "lessons": [
            ("04-1", "04.1", "The Solution to Your Past Self: The Most Authentic Digital Product in the World", 18),
            ("04-2", "04.2", "Structuring the Minimum Viable Digital Guide in 7 Days on Notion or PDF", 20),
            ("04-3", "04.3", "Pricing for Velocity: The $97 to $297 Digital Asset Sweet Spot", 19),
            ("04-4", "04.4", "The Frictionless Launch: Announcing Products Naturally Inside Long-Form Essays", 21),
        ]
    },
    {
        "num": "05",
        "title": "Act V: The Asynchronous Software & Community Holding Asset (Eden Model)",
        "desc": "Transition from selling simple ebooks to hosting paid software-enabled communities and habit tracking platforms that generate dependable recurring MRR.",
        "lessons": [
            ("05-1", "05.1", "Beyond Digital Downloads: Why Community & Software Command 10x Lifetime Value", 18),
            ("05-2", "05.2", "Designing a High-Retention Paid Community on Skool or Proprietary Platforms", 20),
            ("05-3", "05.3", "The Software Multiplier: Packaging Custom Notion & App Tools into Subscriptions", 19),
            ("05-4", "05.4", "Crossing $10,000/Month in Predictable, Asynchronous Monthly Recurring Revenue", 21),
        ]
    },
    {
        "num": "06",
        "title": "Act VI: The 4-Hour Monastic Workday: Deep Work & Intellectual Freedom",
        "desc": "Protect your creative energy by designing a strict 4-hour morning deep work sprint, leaving the rest of the day open for reading, lifting, walking, and living.",
        "lessons": [
            ("06-1", "06.1", "The 4-Hour Workday Philosophy: Why More Hours Produces Diminishing Returns", 19),
            ("06-2", "06.2", "The 7:00 AM Creative Sprint: Writing in Total Flow State with Zero Alerts", 21),
            ("06-3", "06.3", "The Walking & Incubation Habit: Why Great Ideas Are Born Away from Screens", 20),
            ("06-4", "06.4", "Eliminating Meetings and Calls Forever: The 100% Asynchronous Lifestyle", 22),
        ]
    },
    {
        "num": "07",
        "title": "Act VII: Overcoming Self-Doubt, Creator Burnout & Algorithmic Anxiety",
        "desc": "Navigate the psychological minefield of the modern internet: dealing with plateauing follower numbers, mean comments, creative dry spells, and imposter syndrome.",
        "lessons": [
            ("07-1", "07.1", "The Creator Stoic: Detaching Your Self-Worth from Algorithmic Numbers", 19),
            ("07-2", "07.2", "Surviving Creative Dry Spells: The Protocol for Re-Igniting Fascination", 21),
            ("07-3", "07.3", "Handling Haters and Trolls with Amused Indifference and Unshakeable Proof", 20),
            ("07-4", "07.4", "The Longevity Mindset: Committing to the 10-Year Polymath Journey", 22),
        ]
    },
    {
        "num": "08",
        "title": "Act VIII: The Sovereign Polymath: Complete Autonomy of Soul & Estate",
        "desc": "Scale your 1-person business into an untouchable, eight-figure sovereign lifestyle holding enterprise that funds your ultimate life curiosity and purpose.",
        "lessons": [
            ("08-1", "08.1", "The Compound Growth Flywheel: When Audience, Brand & Capital Feed Themselves", 19),
            ("08-2", "08.2", "Living in Complete Sovereignty: Total Location, Time, and Creative Independence", 21),
            ("08-3", "08.3", "The Legacy of the Polymath: Inspiring Thousands to Reclaim Their Unique Genius", 20),
            ("08-4", "08.4", "The Master Decree: Never Sacrificing Your Wholeness for Commercial Conformity", 22),
        ]
    }
]

ALL_BATCH_3_PLAYBOOKS = [
    {
        "file_name": "turned-300-to-100k",
        "course_id": "ai-businesses-17",
        "slug": "how-i-turned-300-to-100-000-at-19-my-side-hustles",
        "title": "How I turned $300 to $100,000 At 19 (My Side Hustles)",
        "short_desc": "Sebastian Ghiorghiu's raw story of going from hospital night shifts and a $300 bank account to $100,000 liquid savings at 19 by stacking velocity side hustles.",
        "full_desc": "An authentic, deeply personal masterclass detailing Sebastian Ghiorghiu's journey from washing cars and caregiving night shifts to saving $100,000 liquid cash at 19. Master local phone flipping, Instagram theme page shoutout arbitrage, viral product validation, high-ticket local business retainers, and house hacking cashflow real estate.",
        "modules": P17_MODULES,
        "hours_of_material": "7.5 hours",
        "badge": "Hot & New",
        "rating": 4.9,
        "rating_count": 512,
        "students": "2,430",
        "target_audience": [
            "Young ambitious individuals looking to turn modest savings into six-figure liquid war chests",
            "Beginners wanting practical, low-barrier side hustles with rapid cashflow velocity",
            "Operators who want to stack e-commerce cash windfalls into recurring B2B agency retainers",
            "Anyone wanting the financial discipline to save $100k and buy cashflow real estate early"
        ]
    },
    {
        "file_name": "rich-with-social-media",
        "course_id": "ai-businesses-18",
        "slug": "how-to-become-rich-with-social-media-my-exact-playbook",
        "title": "How to become rich with social media (my exact playbook)",
        "short_desc": "Alex Hormozi's exact playbook: generating 3 billion impressions across 35,000 content pieces and converting attention into multi-million-dollar equity and retainers.",
        "full_desc": "The definitive commercial attention playbook by Alex Hormozi. Discover why empty reach leaves creators broke, how to target high-net-worth buyers with purchasing power, the 4 pillars of high-LTV content, multi-platform syndication workflows, and how to trade organic audience attention for equity in multi-million-dollar private companies.",
        "modules": P18_MODULES,
        "hours_of_material": "8.5 hours",
        "badge": "Bestseller",
        "rating": 4.9,
        "rating_count": 684,
        "students": "3,450",
        "target_audience": [
            "Entrepreneurs and operators who want to monetize social media attention into serious enterprise equity",
            "Creators tired of low-paying sponsorships who want to build high-ticket B2B retainers",
            "Founders wanting to build zero-CAC organic acquisition flywheels for their businesses",
            "Consultants looking to deploy the Acquisition.com content-to-equity playbook"
        ]
    },
    {
        "file_name": "get-rich-service-businesses",
        "course_id": "ai-businesses-19",
        "slug": "how-to-get-rich-for-service-based-businesses-thank-me-later",
        "title": "How to Get Rich for Service-Based Businesses (Thank Me Later)",
        "short_desc": "Step-by-step masterclass taking a service business from $55k/year to $25k+/month in 90 days: speed-to-lead, Grand Slam offers, consultative closing, and day-zero upsells.",
        "full_desc": "Step inside Alex Hormozi's live consulting room as he transforms a real service business owner from working 70 hours a week for $55k/year into a $25k/month profit machine. Master sub-5-minute speed-to-lead follow-up, value-based Grand Slam pricing, doctor-patient diagnostic sales calls, day-zero ascension upsells, and automated fulfillment SOPs.",
        "modules": P19_MODULES,
        "hours_of_material": "8.5 hours",
        "badge": "Top Rated",
        "rating": 4.9,
        "rating_count": 628,
        "students": "3,120",
        "target_audience": [
            "Service business owners, agency founders, and consultants stuck under $100k/year",
            "Operators trading hourly time for dollars who need to transition to value-priced packages",
            "Sales professionals wanting to master consultative diagnostic closing without pressure",
            "Business owners wanting to install sub-5-minute speed-to-lead automated pipelines"
        ]
    },
    {
        "file_name": "new-way-content-ai",
        "course_id": "ai-businesses-20",
        "slug": "the-new-way-of-making-content-in-the-age-of-ai",
        "title": "The New Way of Making Content In The Age of AI",
        "short_desc": "How to build an untouchable personal brand across 21M+ followers in spite of AI by mastering Proof of Work, credibility arbitrage, and high-signal storytelling.",
        "full_desc": "Alex Hormozi breaks down how to build an iconic personal brand in the age of artificial intelligence. Discover why generic AI content fails, how to leverage the Proof of Work moat, the 3 pillars of uncopyable content (Proof, Beliefs, Mechanics), how to use AI strictly as a production assistant rather than an author, and how to convert attention into enterprise value.",
        "modules": P20_MODULES,
        "hours_of_material": "6.5 hours",
        "badge": "Hot & New",
        "rating": 4.9,
        "rating_count": 542,
        "students": "2,810",
        "target_audience": [
            "Content creators and founders wanting to stand out amidst the flood of generic AI noise",
            "Entrepreneurs who want to leverage their real-world scars and business proof into media authority",
            "Operators looking to streamline video editing and atomization with modern AI tools",
            "Brand builders focused on long-term Lindy credibility and enterprise valuation multiples"
        ]
    },
    {
        "file_name": "catch-up-in-life-logic",
        "course_id": "ai-businesses-21",
        "slug": "how-to-catch-up-in-life-using-logic",
        "title": "How to Catch Up In Life (Using Logic)",
        "short_desc": "The 6 logical actions that took Alex Hormozi from $1,000 liquid to $100M+ net worth: asymmetric skill stacking, volume metrics, ruthless subtraction, and zero-day latency.",
        "full_desc": "A cold, rational masterclass on overcoming the feeling of being behind in life. Discover why human progress is non-linear, how to stack top-20% complementary skills into an unfair market advantage, the mathematical power of 100-attempt volume, ruthless subtraction of toxic friction, zero-day implementation latency, and compounding liquid capital.",
        "modules": P21_MODULES,
        "hours_of_material": "7.5 hours",
        "badge": "Founder Pick",
        "rating": 4.9,
        "rating_count": 596,
        "students": "2,980",
        "target_audience": [
            "Ambitious individuals who feel behind their peers and need a logical acceleration roadmap",
            "Operators wanting to master asymmetric skill stacking (copywriting, sales, systems)",
            "Founders who struggle with overthinking and need high-volume action frameworks",
            "Anyone needing ruthless discipline to eliminate distractions and build a $100k liquid war chest"
        ]
    },
    {
        "file_name": "perfect-business-5-things",
        "course_id": "ai-businesses-22",
        "slug": "what-makes-the-perfect-business-5-things",
        "title": "What Makes The Perfect Business (5 Things)",
        "short_desc": "The 5 unfair advantages that make any business 10x easier to grow: 85%+ gross margins, high barriers to entry, pricing power, customer stickiness, and secular tailwinds.",
        "full_desc": "Alex Hormozi breaks down why vehicle selection accounts for 80% of entrepreneurial success. Master the 5 fundamental structural advantages: extreme 85%+ gross margins, high barriers to entry that prevent competitors from copying you, pricing power that beats inflation, customer stickiness that creates negative churn, and secular market tailwinds.",
        "modules": P22_MODULES,
        "hours_of_material": "6.5 hours",
        "badge": "High Demand",
        "rating": 4.9,
        "rating_count": 489,
        "students": "2,350",
        "target_audience": [
            "Entrepreneurs choosing their next business model who want to avoid low-margin traps",
            "Founders stuck in low-margin, high-churn businesses looking to pivot into high-moat offerings",
            "Investors and operators wanting an objective scoring framework for evaluating acquisitions",
            "Solopreneurs wanting to build high-margin B2B cashflow engines targeting $30k–$50k/month"
        ]
    },
    {
        "file_name": "use-ai-in-business-2026",
        "course_id": "ai-businesses-23",
        "slug": "how-to-use-ai-in-your-business-in-2026",
        "title": "How to Use AI in Your Business in 2026",
        "short_desc": "How Alex Hormozi uses AI across his $250M+ portfolio to make businesses Better, Cheaper, Faster, and Less Risky: front-end lead engines, fulfillment acceleration, and agentic workflows.",
        "full_desc": "An executive masterclass on deploying artificial intelligence across real-world commercial operations. Learn how Hormozi's $250M portfolio implements AI across customer acquisition (sub-60s lead response, conversational SMS/voice), middle-office delivery (70% faster fulfillment), back-office automation (accounting, legal triage), and autonomous multi-agent systems via Make and MCP.",
        "modules": P23_MODULES,
        "hours_of_material": "7.5 hours",
        "badge": "Bestseller",
        "rating": 4.9,
        "rating_count": 645,
        "students": "3,280",
        "target_audience": [
            "Business owners wanting to integrate AI into existing operations to double net margins",
            "Agency founders and consultants wanting to automate client acquisition and fulfillment",
            "Executives seeking to deploy autonomous multi-agent workflows with Make.com and MCP",
            "Operators looking to outpace competitors by delivering 10x faster turnaround times"
        ]
    },
    {
        "file_name": "multiple-interests-one-person",
        "course_id": "ai-businesses-24",
        "slug": "if-you-have-multiple-interests-please-start-a-one-person-business",
        "title": "If You Have Multiple Interests, Please Start a One-Person Business",
        "short_desc": "Dan Koe's polymath blueprint: why niching down kills creative passion, and how to monetize multiple interests into an authentic, eight-figure one-person media enterprise.",
        "full_desc": "The celebrated Renaissance Polymath framework by Dan Koe. Discover why traditional advice to niche down into one tiny topic destroys creative fulfillment, how to curate your interest constellation into a personal monopoly, the weekly long-form essay atomization engine, packaging problem-solving digital products, building software holding assets (Eden model), and designing the 4-hour monastic workday.",
        "modules": P24_MODULES,
        "hours_of_material": "8.5 hours",
        "badge": "Founder Pick",
        "rating": 4.9,
        "rating_count": 718,
        "students": "3,750",
        "target_audience": [
            "Multi-passionate individuals who refuse to be pigeonholed into a single boring niche",
            "Creators wanting to build an authentic one-person media holding company",
            "Writers and intellectuals wanting to monetize their genuine fascination stack",
            "Solopreneurs aiming for complete time, location, and creative sovereignty with a 4-hour workday"
        ]
    }
]
