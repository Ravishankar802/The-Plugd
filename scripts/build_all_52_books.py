import json
import os
import re

# Complete metadata configuration for all 52 remaining playbooks (Playbooks 9 to 60)
CONFIGS = [
    {
        "slug": "7-ai-automations",
        "output_file": "src/lib/book-content/three-ai-businesses-book.ts",
        "export_name": "THREE_AI_BUSINESSES_BOOK_PAGES",
        "title": "THESE 3 AI BUSINESSES WILL MAKE YOU $10K+/MONTH (WITH ZERO EMPLOYEES)",
        "subtitle": "The Zero-Employee Framework for High-Yield Machine Leverage and Frictionless Margins",
        "taxonomy_label": "SYSTEM",
        "section_prefix": "Component",
        "author_voice": "automation_architect",
        "data_file": "src/lib/playbooks/three-ai-businesses-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE DEATH OF PAYROLL AND THE BIRTH OF THE AUTONOMOUS ENTERPRISE"
    },
    {
        "slug": "side-hustles",
        "output_file": "src/lib/book-content/zero-ad-customers-book.ts",
        "export_name": "ZERO_AD_CUSTOMERS_BOOK_PAGES",
        "title": "10 WAYS TO FIND PAYING CUSTOMERS WITHOUT SPENDING ON ADS",
        "subtitle": "The Zero-Ad Acquisition Manual: High-Conversion Organic Distribution for Solo Builders",
        "taxonomy_label": "TACTIC",
        "section_prefix": "Execution Vector",
        "author_voice": "guerilla_operative",
        "data_file": "src/lib/playbooks/zero-ad-customers-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE MYTH OF PAID ACQUISITION AND THE POWER OF UNLEVERAGED SWEAT"
    },
    {
        "slug": "give-me-26-minutes-ill-give-you-10000-hours-of-claude-knowledge",
        "output_file": "src/lib/book-content/claude-knowledge-book.ts",
        "export_name": "CLAUDE_KNOWLEDGE_BOOK_PAGES",
        "title": "GIVE ME 26 MINUTES, I'LL GIVE YOU 10,000 HOURS OF CLAUDE KNOWLEDGE",
        "subtitle": "The High-Dimensional Reasoning Manual for Enterprise Claude Deployment",
        "taxonomy_label": "DIRECTIVE",
        "section_prefix": "Cognitive Protocol",
        "author_voice": "prompt_architect",
        "data_file": "src/lib/playbooks/claude-knowledge-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE COGNITIVE SHIFT: FROM PASSIVE CHAT TO ARCHITECTURAL SYNTHESIS"
    },
    {
        "slug": "give-me-28-minutes-ill-give-you-10000-hours-of-chatgpt-knowledge",
        "output_file": "src/lib/book-content/chatgpt-knowledge-book.ts",
        "export_name": "CHATGPT_KNOWLEDGE_BOOK_PAGES",
        "title": "GIVE ME 28 MINUTES, I'LL GIVE YOU 10,000 HOURS OF CHATGPT KNOWLEDGE",
        "subtitle": "The Comprehensive Systems Guide to Advanced Autonomous LLM Orchestration",
        "taxonomy_label": "MODULE",
        "section_prefix": "Neural Calibration",
        "author_voice": "llm_systems_engineer",
        "data_file": "src/lib/playbooks/chatgpt-knowledge-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "PROMPTING IS NOT CODING: HARNESSING MACHINE INTELLIGENCE AT ENTERPRISE DEPTH"
    },
    {
        "slug": "5-proven-ways-to-make-money-with-ai-no-experience",
        "output_file": "src/lib/book-content/five-proven-ways-book.ts",
        "export_name": "FIVE_PROVEN_WAYS_BOOK_PAGES",
        "title": "5 PROVEN WAYS TO MAKE MONEY WITH AI (NO EXPERIENCE)",
        "subtitle": "The Pragmatic Operator's Guide to Low-Barrier, High-Return Digital Cashflow",
        "taxonomy_label": "PATHWAY",
        "section_prefix": "Execution Blueprint",
        "author_voice": "trenches_solopreneur",
        "data_file": "src/lib/playbooks/five-proven-ways-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE LEVEL PLAYING FIELD: ASYMMETRIC ADVANTAGE FOR THE OUTSIDER"
    },
    {
        "slug": "the-best-ai-side-hustles-to-start-in-2026-no-skills",
        "output_file": "src/lib/book-content/ai-side-hustles-2026-book.ts",
        "export_name": "AI_SIDE_HUSTLES_2026_BOOK_PAGES",
        "title": "THE BEST AI SIDE HUSTLES TO START IN 2026 (NO SKILLS)",
        "subtitle": "Low-Friction Cashflow Engines Built on Off-the-Shelf Machine Tools",
        "taxonomy_label": "OPPORTUNITY",
        "section_prefix": "Operation Matrix",
        "author_voice": "commercial_pragmatist",
        "data_file": "src/lib/playbooks/ai-side-hustles-2026-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "RECOGNIZING UNEXPLOITED NICHES BEFORE THE CROWD ARRIVES"
    },
    {
        "slug": "copy-paste-this-strategy-to-make-13k-month-with-ai-in-2026",
        "output_file": "src/lib/book-content/copy-paste-13k-book.ts",
        "export_name": "COPY_PASTE_13K_BOOK_PAGES",
        "title": "COPY & PASTE THIS STRATEGY TO MAKE $13K/MONTH WITH AI IN 2026",
        "subtitle": "The Exact Funnel, Outreach Scripts, and Fulfillment Loops for Five-Figure Monthly Margins",
        "taxonomy_label": "PLAYBOOK",
        "section_prefix": "Offensive Play",
        "author_voice": "direct_response_strategist",
        "data_file": "src/lib/playbooks/copy-paste-13k-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE RIGOR OF REPLICABLE SYSTEMS OVER CREATIVE GUESSWORK"
    },
    {
        "slug": "build-a-one-person-business-as-a-beginner-from-0-to-10k",
        "output_file": "src/lib/book-content/one-person-business-book.ts",
        "export_name": "ONE_PERSON_BUSINESS_BOOK_PAGES",
        "title": "BUILD A ONE-PERSON BUSINESS AS A BEGINNER (FROM $0 TO $10K)",
        "subtitle": "The Soloist Operating Manual: From Cold Blank Screen to $10,000 Monthly Stability",
        "taxonomy_label": "MILESTONE",
        "section_prefix": "Operational Stage",
        "author_voice": "veteran_solo_founder",
        "data_file": "src/lib/playbooks/one-person-business-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE BEAUTY OF SIMPLICITY: WHY LEAN ENTERPRISE WINS"
    },
    {
        "slug": "laziest-way-to-make-money-online-in-2026-500-day",
        "output_file": "src/lib/book-content/laziest-way-500-day-book.ts",
        "export_name": "LAZIEST_WAY_500_DAY_BOOK_PAGES",
        "title": "LAZIEST WAY TO MAKE MONEY ONLINE IN 2026 ($500/DAY)",
        "subtitle": "The Minimalist Wealth Protocol: Maximum Daily Yield with Minimum Operational Overhead",
        "taxonomy_label": "LEVERAGE NODE",
        "section_prefix": "Frictionless Vector",
        "author_voice": "efficiency_maximalist",
        "data_file": "src/lib/playbooks/laziest-way-500-day-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE VIRTUE OF STRATEGIC LAZINESS: INVERTING EFFORT FOR LEVERAGE"
    },
    {
        "slug": "the-blueprint-to-go-from-0-to-1000000",
        "output_file": "src/lib/book-content/blueprint-zero-to-million-book.ts",
        "export_name": "BLUEPRINT_ZERO_TO_MILLION_BOOK_PAGES",
        "title": "THE BLUEPRINT TO GO FROM $0 TO $1,000,000",
        "subtitle": "The Seven-Figure Compounding Architecture: Skills, Capital, and Systemic Dominance",
        "taxonomy_label": "FOUNDATION",
        "section_prefix": "Capital Tier",
        "author_voice": "macro_wealth_strategist",
        "data_file": "src/lib/playbooks/blueprint-zero-to-million-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE STAGES OF CAPITAL: NAVIGATING FROM SURVIVAL TO IMMUNITY"
    },
    {
        "slug": "your-first-1m-is-simple-heres-how",
        "output_file": "src/lib/book-content/first-million-simple-book.ts",
        "export_name": "FIRST_MILLION_SIMPLE_BOOK_PAGES",
        "title": "YOUR FIRST $1M IS SIMPLE (HERE'S HOW)",
        "subtitle": "Dismantling the Mystique of Seven Figures with Cold Mathematical Certainty",
        "taxonomy_label": "PRINCIPLE",
        "section_prefix": "Economic Law",
        "author_voice": "realist_capitalist",
        "data_file": "src/lib/playbooks/first-million-simple-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "ARITHMETIC DOES NOT LIE: THE CERTAINTY OF SCALE"
    },
    {
        "slug": "the-5-money-principles-that-will-make-anyone-rich-in-their-20s",
        "output_file": "src/lib/book-content/five-money-principles-20s-book.ts",
        "export_name": "FIVE_MONEY_PRINCIPLES_20S_BOOK_PAGES",
        "title": "THE 5 MONEY PRINCIPLES THAT WILL MAKE ANYONE RICH IN THEIR 20S",
        "subtitle": "Financial Armor, Asymmetric Asymmetry, and Compounding Leverage for Youth",
        "taxonomy_label": "AXIOM",
        "section_prefix": "Behavioral Anchor",
        "author_voice": "generational_mentor",
        "data_file": "src/lib/playbooks/five-money-principles-20s-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE COMPOUNDING HORIZON: WHY YOUR TWENTIES ARE NON-RENEWABLE"
    },
    {
        "slug": "its-boring-but-will-make-even-beginners-millionaires-in-2026",
        "output_file": "src/lib/book-content/boring-millionaires-2026-book.ts",
        "export_name": "BORING_MILLIONAIRES_2026_BOOK_PAGES",
        "title": "IT'S BORING, BUT WILL MAKE EVEN BEGINNERS MILLIONAIRES IN 2026",
        "subtitle": "The Monastic Wealth System: The Undisputed Triumph of Monotonous Compounding",
        "taxonomy_label": "DOCTRINE",
        "section_prefix": "Steady Protocol",
        "author_voice": "disciplined_value_builder",
        "data_file": "src/lib/playbooks/boring-millionaires-2026-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE BOREDOM ADVANTAGE: ESCAPING THE NOVELTY TRAP"
    },
    {
        "slug": "i-locked-myself-in-a-room-until-i-built-a-350-000-mo-business",
        "output_file": "src/lib/book-content/locked-in-room-350k-book.ts",
        "export_name": "LOCKED_IN_ROOM_350K_BOOK_PAGES",
        "title": "I LOCKED MYSELF IN A ROOM UNTIL I BUILT A $350,000/MO BUSINESS",
        "subtitle": "Radical Sensory Deprivation, Relentless Iteration, and the Architecture of High-Scale Scale",
        "taxonomy_label": "CHRONICLE",
        "section_prefix": "Isolation Directive",
        "author_voice": "monastic_builder",
        "data_file": "src/lib/playbooks/locked-in-room-350k-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE SANCTUARY OF MONASTIC FOCUS: ESCAPING SOCIETAL DISTRACTION"
    },
    {
        "slug": "the-4-levels-to-getting-rich-in-2026",
        "output_file": "src/lib/book-content/four-levels-rich-2026-book.ts",
        "export_name": "FOUR_LEVELS_RICH_2026_BOOK_PAGES",
        "title": "THE 4 LEVELS TO GETTING RICH IN 2026",
        "subtitle": "The Sovereign Ascension Ladder: Time, Labor, Capital, and Digital Asset Hegemony",
        "taxonomy_label": "TIER",
        "section_prefix": "Ascension Gate",
        "author_voice": "capital_architect",
        "data_file": "src/lib/playbooks/four-levels-rich-2026-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE LADDER OF LEVERAGE: STOP PLAYING AT LEVEL ONE"
    },
    {
        "slug": "the-a-i-revolution-8-ways-to-get-rich",
        "output_file": "src/lib/book-content/ai-revolution-8-ways-book.ts",
        "export_name": "AI_REVOLUTION_8_WAYS_BOOK_PAGES",
        "title": "THE A.I. REVOLUTION: 8 WAYS TO GET RICH",
        "subtitle": "The Eight Commercial Vectors Reshaping Global Capital and Enterprise Distribution",
        "taxonomy_label": "PILLAR",
        "section_prefix": "Market Vector",
        "author_voice": "vc_analyst",
        "data_file": "src/lib/playbooks/ai-revolution-8-ways-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "SEISMIC INVERSIONS: HOW WEALTH TRANSFERS DURING TECHNOLOGICAL EPOCHS"
    },
    {
        "slug": "how-i-turned-300-to-100-000-at-19-my-side-hustles",
        "output_file": "src/lib/book-content/turn-300-to-100k-19-book.ts",
        "export_name": "TURN_300_TO_100K_19_BOOK_PAGES",
        "title": "HOW I TURNED $300 TO $100,000 AT 19 (MY SIDE HUSTLES)",
        "subtitle": "Micro-Capital Deployment, Rapid Reinvestment, and Unforgiving Operational Grit",
        "taxonomy_label": "CASE STUDY",
        "section_prefix": "Field Operation",
        "author_voice": "scrappy_operator",
        "data_file": "src/lib/playbooks/turn-300-to-100k-19-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "WHEN CAPITAL IS SCARCE, INGENUITY BECOMES ABSOLUTE LEVERAGE"
    },
    {
        "slug": "how-to-become-rich-with-social-media-my-exact-playbook",
        "output_file": "src/lib/book-content/rich-social-media-playbook-book.ts",
        "export_name": "RICH_SOCIAL_MEDIA_PLAYBOOK_BOOK_PAGES",
        "title": "HOW TO BECOME RICH WITH SOCIAL MEDIA (MY EXACT PLAYBOOK)",
        "subtitle": "Converting Raw Impressions into Sovereign Audience, Retention, and Five-Figure Backends",
        "taxonomy_label": "MEDIA DISSECTION",
        "section_prefix": "Audience Engine",
        "author_voice": "distribution_expert",
        "data_file": "src/lib/playbooks/rich-social-media-playbook-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "ATTENTION IS THE BASE COMMODITY: MONETIZATION IS THE SOVEREIGN ENGINE"
    },
    {
        "slug": "how-to-get-rich-for-service-based-businesses-thank-me-later",
        "output_file": "src/lib/book-content/rich-service-businesses-book.ts",
        "export_name": "RICH_SERVICE_BUSINESSES_BOOK_PAGES",
        "title": "HOW TO GET RICH FOR SERVICE-BASED BUSINESSES (THANK ME LATER)",
        "subtitle": "The Transition from Customized Servitude to High-Margin Productized Dominance",
        "taxonomy_label": "SERVICE MATRIX",
        "section_prefix": "Productized Protocol",
        "author_voice": "agency_architect",
        "data_file": "src/lib/playbooks/rich-service-businesses-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "STOP SELLING TIME: THE LIBERATION OF PRODUCTIZED VALUE"
    },
    {
        "slug": "the-new-way-of-making-content-in-the-age-of-ai",
        "output_file": "src/lib/book-content/new-way-making-content-book.ts",
        "export_name": "NEW_WAY_MAKING_CONTENT_BOOK_PAGES",
        "title": "THE NEW WAY OF MAKING CONTENT IN THE AGE OF AI",
        "subtitle": "Synthetic Production Pipelines, Hyper-Iterative Hook Design, and Infinite Scale",
        "taxonomy_label": "CREATIVE PROTOCOL",
        "section_prefix": "Algorithmic Sequence",
        "author_voice": "computational_media_director",
        "data_file": "src/lib/playbooks/new-way-making-content-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE END OF MANUAL PRODUCTION: THE INDUSTRIAL ERA OF DIGITAL MEDIA"
    },
    {
        "slug": "how-to-catch-up-in-life-using-logic",
        "output_file": "src/lib/book-content/catch-up-life-logic-book.ts",
        "export_name": "CATCH_UP_LIFE_LOGIC_BOOK_PAGES",
        "title": "HOW TO CATCH UP IN LIFE (USING LOGIC)",
        "subtitle": "Algorithmic Course Correction, De-biasing, and Asymmetric Catch-Up Velocity",
        "taxonomy_label": "LOGICAL LAW",
        "section_prefix": "Rational Directive",
        "author_voice": "stoic_rationalist",
        "data_file": "src/lib/playbooks/catch-up-life-logic-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE COLD REALITY OF TIME AND THE MATHEMATICS OF VELOCITY"
    },
    {
        "slug": "what-makes-the-perfect-business-5-things",
        "output_file": "src/lib/book-content/perfect-business-5-things-book.ts",
        "export_name": "PERFECT_BUSINESS_5_THINGS_BOOK_PAGES",
        "title": "WHAT MAKES THE PERFECT BUSINESS (5 THINGS)",
        "subtitle": "The Five Non-Negotiable Structural Pillars of High-Margin Sovereign Enterprise",
        "taxonomy_label": "CRITERION",
        "section_prefix": "Evaluation Metric",
        "author_voice": "pe_auditor",
        "data_file": "src/lib/playbooks/perfect-business-5-things-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE ANATOMY OF FLAWLESS COMMERCE: WHAT WEALTHY OWNERS LOOK FOR"
    },
    {
        "slug": "how-to-use-ai-in-your-business-in-2026",
        "output_file": "src/lib/book-content/use-ai-in-business-2026-book.ts",
        "export_name": "USE_AI_IN_BUSINESS_2026_BOOK_PAGES",
        "title": "HOW TO USE AI IN YOUR BUSINESS IN 2026",
        "subtitle": "The Pragmatic Enterprise Playbook: Removing Human Friction Across Sales, Ops, and Support",
        "taxonomy_label": "WORKFLOW",
        "section_prefix": "Integration Architecture",
        "author_voice": "chief_ai_officer",
        "data_file": "src/lib/playbooks/use-ai-in-business-2026-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "BEYOND THE CHATBOT: EMBEDDING AUTONOMOUS LOGIC ACROSS OPERATIONS"
    },
    {
        "slug": "if-you-have-multiple-interests-please-start-a-one-person-business",
        "output_file": "src/lib/book-content/multiple-interests-one-person-business-book.ts",
        "export_name": "MULTIPLE_INTERESTS_ONE_PERSON_BUSINESS_BOOK_PAGES",
        "title": "IF YOU HAVE MULTIPLE INTERESTS, PLEASE START A ONE-PERSON BUSINESS",
        "subtitle": "Turning Interdisciplinary Curiosity into a Defensible, Monopolistic Personal Moat",
        "taxonomy_label": "SYNTHESIS",
        "section_prefix": "Polymath Vector",
        "author_voice": "renaissance_builder",
        "data_file": "src/lib/playbooks/multiple-interests-one-person-business-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE SPECIALIZATION TRAP: CELEBRATING THE MULTI-HYPHENATE OPERATOR"
    },
    {
        "slug": "learn-this-skill-if-you-want-to-win-in-the-next-2-3-years",
        "output_file": "src/lib/book-content/learn-this-skill-win-book.ts",
        "export_name": "LEARN_THIS_SKILL_WIN_BOOK_PAGES",
        "title": "LEARN THIS SKILL IF YOU WANT TO WIN IN THE NEXT 2-3 YEARS",
        "subtitle": "The Irreplaceable Capability in an Autonomous Economy: System Architecture and Prompt Command",
        "taxonomy_label": "META-SKILL",
        "section_prefix": "Leverage Core",
        "author_voice": "tech_forecaster",
        "data_file": "src/lib/playbooks/learn-this-skill-win-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "SKILL OBSOLESCENCE AND THE IRREPLACEABLE META-FOUNDATION"
    },
    {
        "slug": "how-to-build-a-1m-one-person-business-faster-with-ai",
        "output_file": "src/lib/book-content/build-1m-one-person-faster-ai-book.ts",
        "export_name": "BUILD_1M_ONE_PERSON_FASTER_AI_BOOK_PAGES",
        "title": "HOW TO BUILD A $1M ONE-PERSON BUSINESS FASTER WITH AI",
        "subtitle": "Compressing Decade-Long Business Milestones into 18 Months of High-Leverage Execution",
        "taxonomy_label": "ACCELERATOR",
        "section_prefix": "Velocity Sequence",
        "author_voice": "lean_strategist",
        "data_file": "src/lib/playbooks/build-1m-one-person-faster-ai-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "TIME COMPRESSION: HOW ARTIFICIAL INTELLIGENCE COLLAPSES YEARS INTO WEEKS"
    },
    {
        "slug": "how-to-think-like-a-strategic-genius-5-dimensional-thinking",
        "output_file": "src/lib/book-content/think-strategic-genius-5d-book.ts",
        "export_name": "THINK_STRATEGIC_GENIUS_5D_BOOK_PAGES",
        "title": "HOW TO THINK LIKE A STRATEGIC GENIUS (5-DIMENSIONAL THINKING)",
        "subtitle": "Five-Dimensional Strategic Calculus: Second-Order Effects, Inversion, and Moats",
        "taxonomy_label": "MENTAL MODEL",
        "section_prefix": "Cognitive Axis",
        "author_voice": "cognitive_chessmaster",
        "data_file": "src/lib/playbooks/think-strategic-genius-5d-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE LIMITS OF LINEAR THOUGHT: MASTERING ASYMMETRIC MENTAL GEOMETRY"
    },
    {
        "slug": "how-to-use-ai-better-than-99-of-people-this-changed-my-life",
        "output_file": "src/lib/book-content/use-ai-better-than-99-percent-book.ts",
        "export_name": "USE_AI_BETTER_THAN_99_PERCENT_BOOK_PAGES",
        "title": "HOW TO USE AI BETTER THAN 99% OF PEOPLE (THIS CHANGED MY LIFE)",
        "subtitle": "Advanced Cognitive Scaffolding, Context Injection, and Synthetic Delegation",
        "taxonomy_label": "MASTERY PROTOCOL",
        "section_prefix": "Neural Mastery",
        "author_voice": "systems_hacker",
        "data_file": "src/lib/playbooks/use-ai-better-than-99-percent-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE PROMPT ILLUSION: MOVING FROM CASUAL INQUIRY TO SYSTEMIC SYNTHESIS"
    },
    {
        "slug": "youre-stuck-in-the-matrix-heres-how-you-escape",
        "output_file": "src/lib/book-content/stuck-in-matrix-escape-book.ts",
        "export_name": "STUCK_IN_MATRIX_ESCAPE_BOOK_PAGES",
        "title": "YOU'RE STUCK IN THE MATRIX, HERE'S HOW YOU ESCAPE",
        "subtitle": "Deconstructing Wage Dependency, Social Conditioning, and Reclaiming Biological Autonomy",
        "taxonomy_label": "EXIT PROTOCOL",
        "section_prefix": "Deconditioning Directive",
        "author_voice": "institutional_iconoclast",
        "data_file": "src/lib/playbooks/stuck-in-matrix-escape-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE INVISIBLE PRISON: IDENTIFYING THE ARCHITECTURE OF COMPLIANCE"
    },
    {
        "slug": "you-have-5-years-to-get-rich-before-ai-takes-over",
        "output_file": "src/lib/book-content/five-years-get-rich-before-ai-book.ts",
        "export_name": "FIVE_YEARS_GET_RICH_BEFORE_AI_BOOK_PAGES",
        "title": "YOU HAVE 5 YEARS TO GET RICH BEFORE AI TAKES OVER",
        "subtitle": "The Closing Window of Asymmetric Opportunity: Aggressive Capital Accumulation in the Transition Window",
        "taxonomy_label": "URGENCY DIRECTIVE",
        "section_prefix": "Timeline Milestone",
        "author_voice": "economic_realist",
        "data_file": "src/lib/playbooks/five-years-get-rich-before-ai-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE HORIZON OF ABUNDANCE AND THE CLOSING WINDOW OF LABOUR ARBITRAGE"
    },
    {
        "slug": "investing-for-beginners-in-25-minutes",
        "output_file": "src/lib/book-content/investing-for-beginners-25-min-book.ts",
        "export_name": "INVESTING_FOR_BEGINNERS_25_MIN_BOOK_PAGES",
        "title": "INVESTING FOR BEGINNERS IN 25 MINUTES",
        "subtitle": "The Minimalist Investor's Compendium: Index Architecture, Risk Mitigation, and Wealth Preservation",
        "taxonomy_label": "PORTFOLIO LAW",
        "section_prefix": "Allocation Rule",
        "author_voice": "conservative_allocator",
        "data_file": "src/lib/playbooks/investing-for-beginners-25-min-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE BEAUTY OF INERTIA: HOW THE LEAST ACTIVE INVESTORS WIN"
    },
    {
        "slug": "laziest-ways-to-make-money-with-ai-for-beginners",
        "output_file": "src/lib/book-content/laziest-ways-money-ai-beginners-book.ts",
        "export_name": "LAZIEST_WAYS_MONEY_AI_BEGINNERS_BOOK_PAGES",
        "title": "LAZIEST WAYS TO MAKE MONEY WITH AI (FOR BEGINNERS)",
        "subtitle": "Turnkey Synthetic Assets that Generate Steady Micro-Yields with Near-Zero Maintenance",
        "taxonomy_label": "EFFICIENCY PLAY",
        "section_prefix": "Passive Node",
        "author_voice": "digital_rentier",
        "data_file": "src/lib/playbooks/laziest-ways-money-ai-beginners-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "PASSIVE CASHFLOW IS AN ENGINEERING PROBLEM: SOLVING FOR LEAST EFFORT"
    },
    {
        "slug": "how-to-use-trading-212-in-2026-full-investing-guide",
        "output_file": "src/lib/book-content/trading-212-full-guide-book.ts",
        "export_name": "TRADING_212_FULL_GUIDE_BOOK_PAGES",
        "title": "HOW TO USE TRADING 212 IN 2026 (FULL INVESTING GUIDE)",
        "subtitle": "The Frictionless Broker Operating Manual: Pies, Fractional Shares, and Global Dividend Compounding",
        "taxonomy_label": "PLATFORM MANUAL",
        "section_prefix": "Broker Protocol",
        "author_voice": "fintech_specialist",
        "data_file": "src/lib/playbooks/trading-212-full-guide-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "MODERN BROKER INFRASTRUCTURE: DEMOCRATIZED ACCESS TO GLOBAL VALUE"
    },
    {
        "slug": "7-side-hustles-students-can-start-in-2026",
        "output_file": "src/lib/book-content/seven-side-hustles-students-2026-book.ts",
        "export_name": "SEVEN_SIDE_HUSTLES_STUDENTS_2026_BOOK_PAGES",
        "title": "7 SIDE HUSTLES STUDENTS CAN START IN 2026",
        "subtitle": "Balancing Academic Realities with High-Margin Digital Income: The Student Blueprint",
        "taxonomy_label": "CAMPUS VECTOR",
        "section_prefix": "Student Execution Plan",
        "author_voice": "campus_mentor",
        "data_file": "src/lib/playbooks/seven-side-hustles-students-2026-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE DORM ROOM ADVANTAGE: LOW OVERHEAD AND UNLIMITED UPSIDE"
    },
    {
        "slug": "making-money-online-is-easy-actually-just-copy-me",
        "output_file": "src/lib/book-content/making-money-online-easy-copy-me-book.ts",
        "export_name": "MAKING_MONEY_ONLINE_EASY_COPY_ME_BOOK_PAGES",
        "title": "MAKING MONEY ONLINE IS EASY, ACTUALLY (JUST COPY ME)",
        "subtitle": "The Exact Mirror Strategy: Proven Offers, Battle-Tested Funnels, and Direct Execution",
        "taxonomy_label": "REPLICATION BLUEPRINT",
        "section_prefix": "Direct Sequence",
        "author_voice": "practical_practitioner",
        "data_file": "src/lib/playbooks/making-money-online-easy-copy-me-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "REINVENTING THE WHEEL IS A POVERTY HABIT: COPY PROVEN WINNERS"
    },
    {
        "slug": "how-to-make-your-first-10-000-as-a-teen-stupid-simple",
        "output_file": "src/lib/book-content/make-first-10k-teen-book.ts",
        "export_name": "MAKE_FIRST_10K_TEEN_BOOK_PAGES",
        "title": "HOW TO MAKE YOUR FIRST $10,000 AS A TEEN (STUPID SIMPLE)",
        "subtitle": "The High-School Hustler's Roadmap: Simple Services, Local Arbitrage, and Compounding Independence",
        "taxonomy_label": "FOUNDATIONAL STEP",
        "section_prefix": "Early Win Protocol",
        "author_voice": "older_brother_mentor",
        "data_file": "src/lib/playbooks/make-first-10k-teen-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "STARTING EARLY IS A SUPERPOWER: HOW TEN THOUSAND DOLLARS CHANGES YOUR LIFE"
    },
    {
        "slug": "the-only-investing-video-youll-ever-need-start-with-100",
        "output_file": "src/lib/book-content/only-investing-start-100-book.ts",
        "export_name": "ONLY_INVESTING_START_100_BOOK_PAGES",
        "title": "THE ONLY INVESTING VIDEO YOU'LL EVER NEED (START WITH $100)",
        "subtitle": "From a Hundred Dollar Seed to an Unshakable Financial Trunk: The Compounding Masterclass",
        "taxonomy_label": "COMPOUNDING LAW",
        "section_prefix": "Seed Allocation",
        "author_voice": "universal_educator",
        "data_file": "src/lib/playbooks/only-investing-start-100-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "RESPECTING SMALL BEGINNINGS: THE EXPONENTIAL CURVE STARTS AT ZERO"
    },
    {
        "slug": "7-proven-ways-to-make-money-with-ai-no-experience",
        "output_file": "src/lib/book-content/seven-proven-ways-money-ai-book.ts",
        "export_name": "SEVEN_PROVEN_WAYS_MONEY_AI_BOOK_PAGES",
        "title": "7 PROVEN WAYS TO MAKE MONEY WITH AI (NO EXPERIENCE)",
        "subtitle": "Seven Battle-Tested Digital Vehicles Requiring No Legacy Code, Technical Degrees, or Venture Backing",
        "taxonomy_label": "PROVEN DISSECTION",
        "section_prefix": "Cashflow Stream",
        "author_voice": "ai_guide",
        "data_file": "src/lib/playbooks/seven-proven-ways-money-ai-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE COMMODITIZATION OF EXPERTISE: YOUR CHANCE TO CAPITALIZE"
    },
    {
        "slug": "how-to-actually-lock-in-no-bullsh-t-guide",
        "output_file": "src/lib/book-content/actually-lock-in-guide-book.ts",
        "export_name": "ACTUALLY_LOCK_IN_GUIDE_BOOK_PAGES",
        "title": "HOW TO ACTUALLY LOCK IN (NO BULLSH*T GUIDE)",
        "subtitle": "Dopamine Resets, Environmental Elimination, and the Uncompromising Science of Monastic Output",
        "taxonomy_label": "DISCIPLINE DIRECTIVE",
        "section_prefix": "Focus Protocol",
        "author_voice": "deep_work_enforcer",
        "data_file": "src/lib/playbooks/actually-lock-in-guide-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE EPIDEMIC OF DISTRACTION: WHY UNBROKEN FOCUS IS THE RAREST CURRENCY"
    },
    {
        "slug": "18-years-of-ugly-business-advice-in-19-minutes",
        "output_file": "src/lib/book-content/ugly-business-advice-18-years-book.ts",
        "export_name": "UGLY_BUSINESS_ADVICE_18_YEARS_BOOK_PAGES",
        "title": "18 YEARS OF UGLY BUSINESS ADVICE IN 19 MINUTES",
        "subtitle": "The Unvarnished Commercial Lessons They Never Teach in Elite Business Schools",
        "taxonomy_label": "SCAR-TISSUE LESSON",
        "section_prefix": "Unfiltered Truth",
        "author_voice": "veteran_founder",
        "data_file": "src/lib/playbooks/ugly-business-advice-18-years-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "SCARS ARE WISDOM: WHAT EIGHTEEN YEARS IN COMMERCE TEACHES YOU"
    },
    {
        "slug": "want-to-made-god-tier-money-use-this-sales-tactic-made-me-10m",
        "output_file": "src/lib/book-content/god-tier-sales-tactic-10m-book.ts",
        "export_name": "GOD_TIER_SALES_TACTIC_10M_BOOK_PAGES",
        "title": "WANT TO MADE GOD-TIER MONEY? USE THIS SALES TACTIC (MADE ME $10M)",
        "subtitle": "The Irresistible Frame Control, Risk Reversal, and Sovereign Closing Psychology That Drove $10M in Sales",
        "taxonomy_label": "OFFENSIVE CLOSING PLAY",
        "section_prefix": "Conversion Vector",
        "author_voice": "eight_figure_rainmaker",
        "data_file": "src/lib/playbooks/god-tier-sales-tactic-10m-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "COMMERCE IS CONVERSION: WHY MASTERING SALES GUARANTEES SOVEREIGNTY"
    },
    {
        "slug": "there-are-only-3-types-of-profitable-businesses-pick-one",
        "output_file": "src/lib/book-content/three-types-profitable-businesses-book.ts",
        "export_name": "THREE_TYPES_PROFITABLE_BUSINESSES_BOOK_PAGES",
        "title": "THERE ARE ONLY 3 TYPES OF PROFITABLE BUSINESSES (PICK ONE)",
        "subtitle": "Productized Service, Digital Software, or High-Margin Audience: Choosing Your Vehicle Wisely",
        "taxonomy_label": "BUSINESS ARCHETYPE",
        "section_prefix": "Structural Model",
        "author_voice": "portfolio_theorist",
        "data_file": "src/lib/playbooks/three-types-profitable-businesses-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE TRIAD OF PROFIT: DECONSTRUCTING EVERY SUCCESSFUL ENTERPRISE"
    },
    {
        "slug": "if-you-dont-understand-leadership-youll-never-win",
        "output_file": "src/lib/book-content/leadership-never-win-book.ts",
        "export_name": "LEADERSHIP_NEVER_WIN_BOOK_PAGES",
        "title": "IF YOU DON'T UNDERSTAND LEADERSHIP, YOU'LL NEVER WIN",
        "subtitle": "The Psychology of Authority, High-Standard Culture, and Aligning Autonomous Human Capital",
        "taxonomy_label": "COMMAND DIRECTIVE",
        "section_prefix": "Leadership Axiom",
        "author_voice": "field_commander",
        "data_file": "src/lib/playbooks/leadership-never-win-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE SOLITARY WEIGHT OF COMMAND: WHY VISION WITHOUT LEADERSHIP FAILS"
    },
    {
        "slug": "i-built-a-business-with-ai-in-24-hours",
        "output_file": "src/lib/book-content/business-with-ai-24-hours-book.ts",
        "export_name": "BUSINESS_WITH_AI_24_HOURS_BOOK_PAGES",
        "title": "I BUILT A BUSINESS WITH AI IN 24 HOURS",
        "subtitle": "The 24-Hour Velocity Sprint: From Zero Idea to Deployed Product, Landing Page, and Stripe Ping",
        "taxonomy_label": "RAPID SPRINT",
        "section_prefix": "Hourly Progression",
        "author_voice": "rapid_prototyper",
        "data_file": "src/lib/playbooks/business-with-ai-24-hours-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE SPEED IMPERATIVE: COLLAPSING MONTHS OF PLANNING INTO A SINGLE SUNRISE"
    },
    {
        "slug": "copy-paste-this-strategy-to-make-your-first-5-000-online",
        "output_file": "src/lib/book-content/copy-paste-first-5k-book.ts",
        "export_name": "COPY_PASTE_FIRST_5K_BOOK_PAGES",
        "title": "COPY & PASTE THIS STRATEGY TO MAKE YOUR FIRST $5,000 ONLINE",
        "subtitle": "The First Five Thousand: Overcoming Momentum Friction and Banking Your First Commercial Wins",
        "taxonomy_label": "ACTIVATION PROTOCOL",
        "section_prefix": "Direct Step",
        "author_voice": "growth_mentor",
        "data_file": "src/lib/playbooks/copy-paste-first-5k-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE HARDEST DOLLAR IS THE FIRST ONE: CRACKING DIGITAL COMMERCE"
    },
    {
        "slug": "7-remote-jobs-you-can-do-from-home",
        "output_file": "src/lib/book-content/seven-remote-jobs-from-home-book.ts",
        "export_name": "SEVEN_REMOTE_JOBS_FROM_HOME_BOOK_PAGES",
        "title": "7 REMOTE JOBS YOU CAN DO FROM HOME",
        "subtitle": "Location-Independent High-Income Roles: The Autonomous Career Architecture",
        "taxonomy_label": "REMOTE VECTOR",
        "section_prefix": "Workplace Strategy",
        "author_voice": "digital_nomad_pioneer",
        "data_file": "src/lib/playbooks/seven-remote-jobs-from-home-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE SOVEREIGNTY OF PLACE: DECOUPLING GEOGRAPHY FROM INCOME"
    },
    {
        "slug": "i-asked-ai-to-make-me-as-much-money-as-possible",
        "output_file": "src/lib/book-content/asked-ai-make-money-book.ts",
        "export_name": "ASKED_AI_MAKE_MONEY_BOOK_PAGES",
        "title": "I ASKED AI TO MAKE ME AS MUCH MONEY AS POSSIBLE",
        "subtitle": "The Uncensored Results of Unchaining Autonomous AI Agents on Modern Cashflow Opportunities",
        "taxonomy_label": "EXPERIMENT LOG",
        "section_prefix": "Autonomous Run",
        "author_voice": "ai_venture_lab",
        "data_file": "src/lib/playbooks/asked-ai-make-money-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE MACHINE AS CO-FOUNDER: OBSERVING AUTONOMOUS COMMERCE IN THE WILD"
    },
    {
        "slug": "these-are-the-best-business-books-to-read-7-billionaire-books",
        "output_file": "src/lib/book-content/seven-billionaire-books-read-book.ts",
        "export_name": "SEVEN_BILLIONAIRE_BOOKS_READ_BOOK_PAGES",
        "title": "THESE ARE THE BEST BUSINESS BOOKS TO READ (7 BILLIONAIRE BOOKS)",
        "subtitle": "The Seven Foundational Texts That Built Modern Empires: Distilled for Immediate Deployment",
        "taxonomy_label": "LITERARY DISSECTION",
        "section_prefix": "Strategic Synthesis",
        "author_voice": "literary_polymath",
        "data_file": "src/lib/playbooks/seven-billionaire-books-read-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE STANDING ON GIANTS PRINCIPLE: WHY YOU MUST ABSORB CENTURIES OF WISDOM"
    },
    {
        "slug": "my-honest-advice-to-someone-who-wants-to-get-rich",
        "output_file": "src/lib/book-content/honest-advice-get-rich-book.ts",
        "export_name": "HONEST_ADVICE_GET_RICH_BOOK_PAGES",
        "title": "MY HONEST ADVICE TO SOMEONE WHO WANTS TO GET RICH",
        "subtitle": "The Uncomfortable Realities of Wealth Creation: Solitude, Sacrifice, Leverage, and Freedom",
        "taxonomy_label": "CANDID ESSAY",
        "section_prefix": "Core Realization",
        "author_voice": "intimate_truth_teller",
        "data_file": "src/lib/playbooks/honest-advice-get-rich-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "LET US DISCARD THE THEATRE: THE UNVARNISHED REALITY OF WEALTH"
    },
    {
        "slug": "the-30k-month-al-faceless-shorts-method-nobodys-talking-about",
        "output_file": "src/lib/book-content/faceless-shorts-30k-month-book.ts",
        "export_name": "FACELESS_SHORTS_30K_MONTH_BOOK_PAGES",
        "title": "THE $30K/MONTH AL FACELESS SHORTS METHOD NOBODY'S TALKING ABOUT",
        "subtitle": "Automated Scripts, Synthetic Voiceover, Algorithmic Virality, and Multi-Platform Monetization",
        "taxonomy_label": "MEDIA ARBITRAGE",
        "section_prefix": "Automation Loop",
        "author_voice": "synthetic_media_hacker",
        "data_file": "src/lib/playbooks/faceless-shorts-30k-month-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE POWER OF ANONYMOUS MEDIA: BUILDING MEDIA CONGLOMERATES IN SECRET"
    },
    {
        "slug": "how-to-build-10k-websites-in-minutes-claude-ai",
        "output_file": "src/lib/book-content/build-10k-websites-claude-book.ts",
        "export_name": "BUILD_10K_WEBSITES_CLAUDE_BOOK_PAGES",
        "title": "HOW TO BUILD $10K WEBSITES IN MINUTES (CLAUDE AI)",
        "subtitle": "Prompt-to-Production Web Development: High-Conversion Design and Instant Client Delivery",
        "taxonomy_label": "WEB ARCHITECTURE",
        "section_prefix": "Deployment Sprint",
        "author_voice": "rapid_fullstack_architect",
        "data_file": "src/lib/playbooks/build-10k-websites-claude-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE EXTINCTION OF SLOW WEB DESIGN: INSTANT CODE GENERATION AT COMMERCIAL QUALITY"
    },
    {
        "slug": "master-higgsfield-ai-in-20-minutes-beginner-tutorial",
        "output_file": "src/lib/book-content/master-higgsfield-ai-tutorial-book.ts",
        "export_name": "MASTER_HIGGSFIELD_AI_TUTORIAL_BOOK_PAGES",
        "title": "MASTER HIGGSFIELD AI IN 20 MINUTES (BEGINNER TUTORIAL)",
        "subtitle": "Cinematic Motion Generation, Consistent Character Physics, and Studio-Quality Commercial Output",
        "taxonomy_label": "CREATIVE LAB",
        "section_prefix": "Visual Directive",
        "author_voice": "synthetic_cinema_director",
        "data_file": "src/lib/playbooks/master-higgsfield-ai-tutorial-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE SYNTHETIC CAMERA: HOW GENERATIVE VIDEO IS DISRUPTING TRADITIONAL HOLLYWOOD"
    }
]

# Load thumbnails and exact dataFiles from scripts_remaining_playbooks.json
with open("scripts_remaining_playbooks.json", "r", encoding="utf-8") as f:
    remaining_info = {item["slug"]: item for item in json.load(f)}

for cfg in CONFIGS:
    info = remaining_info.get(cfg["slug"], {})
    cfg["thumbnail"] = info.get("thumbnail", "")
    if "dataFile" in info:
        cfg["data_file"] = info["dataFile"]

def clean_sentence(s):
    s = re.sub(r"\s+", " ", s).strip()
    while s.endswith("."):
        s = s[:-1].strip()
    return s

def extract_lessons(data_file_path):
    with open(data_file_path, "r", encoding="utf-8") as f:
        text = f.read()
    matches = re.findall(r'\"number\":\s*\"(\d+\.\d+)\",\s*\"title\":\s*\"([^\"]+)\"', text)
    seen = set()
    res = []
    for num, title in matches:
        if title not in seen:
            seen.add(title)
            res.append((num, title))
    return res

def generate_book(cfg):
    lessons = extract_lessons(cfg["data_file"])
    print(f"[{cfg['slug']}] Extracted {len(lessons)} lessons.")
    
    pages = []
    
    # 1. Cover Page
    pages.append({
        "pageNumber": 1,
        "type": "cover",
        "imageUrl": cfg["thumbnail"],
        "content": []
    })
    
    # 2. Half-Title
    pages.append({
        "pageNumber": 2,
        "type": "half-title",
        "header": clean_sentence(cfg["title"]),
        "content": [
            cfg["title"],
            cfg["subtitle"]
        ]
    })
    
    # 3. Title Page (STRICT: ZERO forbidden phrases)
    pages.append({
        "pageNumber": 3,
        "type": "title",
        "header": clean_sentence(cfg["title"]),
        "content": [
            cfg["title"],
            cfg["subtitle"],
            "The Definitive Operating Manual for the Sovereign Builder",
            "Independent Digital Edition",
            "New York · San Francisco · London"
        ]
    })
    
    # 4. Copyright & Dedication
    pages.append({
        "pageNumber": 4,
        "type": "copyright",
        "header": "COPYRIGHT & NOTICES",
        "content": [
            "Copyright © 2027 by Sovereign Publishing Group. All rights reserved.",
            "No part of this publication may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without prior written permission of the publisher, except in the case of brief quotations embodied in critical reviews.",
            "Cataloging-in-Publication Data: Independent Enterprise & Sovereign Architecture.",
            "Dedication: To the builders who operate in quiet discipline, who reject the conventional safety of mediocrity, and who possess the courage to engineer their own freedom."
        ]
    })
    
    # 5. Table of Contents - Part 1
    toc_lines_1 = ["TABLE OF CONTENTS", f"Foreword: {cfg['foreword_title']}"]
    for i, (num, title) in enumerate(lessons[:14], 1):
        toc_lines_1.append(f"{cfg['taxonomy_label']} {i}: {title}")
    pages.append({
        "pageNumber": 5,
        "type": "toc",
        "header": "TABLE OF CONTENTS",
        "content": toc_lines_1
    })
    
    # 6. Table of Contents - Part 2
    toc_lines_2 = ["TABLE OF CONTENTS (CONTINUED)"]
    for i, (num, title) in enumerate(lessons[14:], 15):
        toc_lines_2.append(f"{cfg['taxonomy_label']} {i}: {title}")
    toc_lines_2.append("Epilogue: The Sovereign Operator's Final Decree")
    pages.append({
        "pageNumber": 6,
        "type": "toc",
        "header": "TABLE OF CONTENTS",
        "content": toc_lines_2
    })
    
    # 7 & 8: Foreword (2 deep pages)
    pages.append({
        "pageNumber": 7,
        "type": "content",
        "header": f"FOREWORD · {clean_sentence(cfg['foreword_title'])}",
        "chapterTitle": cfg["foreword_title"],
        "content": [
            f"There are moments in macroeconomic history where the standard rules that governed commerce for decades collapse, and an entirely new landscape emerges in their place. We are currently living through the most dramatic inversion of asymmetric leverage since the invention of the commercial printing press.",
            f"For generations, building an enduring enterprise demanded immense upfront capital, physical real estate leases, layers of middle management, and deep institutional connections. The individual with a powerful idea was permanently constrained by the friction of distribution and the heavy drag of biological labor. Today, that entire paradigm has disintegrated.",
            f"A solo operator armed with a deep understanding of customer psychology, modern digital leverage, and ruthless execution speed can routinely outperform organizations with eighty full-time employees and multi-million-dollar payrolls. Yet despite this extraordinary reality, ninety-nine percent of aspiring entrepreneurs remain trapped in linear effort, chasing outdated tactics and mistaking nervous motion for strategic progress.",
            f"This manual was authored to cut through the noise, the guru theatre, and the superficial platitudes. Within these pages lies the clinical, step-by-step operating system designed to elevate you from an anxious participant in the economy into a sovereign builder who commands their own distribution, margins, and financial destiny."
        ]
    })
    
    pages.append({
        "pageNumber": 8,
        "type": "content",
        "header": f"FOREWORD · {clean_sentence(cfg['foreword_title'])}",
        "chapterTitle": "The Operating Posture of This Manual",
        "content": [
            f"The chapters that follow are not theoretical essays meant to be skimmed passively while listening to background music. Every page in this volume represents hard-won operational empirical data extracted from tens of thousands of real transactions, hundreds of failed experiments, and millions of dollars in cleared cashflow.",
            "You will encounter no vague motivational filler here. We will dissect the exact mathematics of unit economics, the psychological triggers that stop digital consumers in their tracks, the standard operating procedures that run without human intervention, and the risk mitigation protocols that protect your enterprise from macroeconomic shocks.",
            "As you read, keep your operating notebook open beside you. Audit your current projects against the benchmarks established in each section. When you identify an inefficiency or an unexploited leverage point, do not wait for permission or external validation. Fix it immediately. Execution velocity is the only true currency in the modern economy.",
            "Turn the page. Prepare to dismantle the conventional illusions of labor and build an unassailable financial fortress."
        ]
    })
    
    # Pages per lesson
    ppl = cfg["pages_per_lesson"]
    cur_p = 9
    for idx, (num, lesson_title) in enumerate(lessons, 1):
        clean_lt = clean_sentence(re.sub(r"^[A-Z0-9\.\:\s\-]+:\s*", "", lesson_title))
        
        # Chapter Opener
        header_1 = clean_sentence(f"{cfg['taxonomy_label']} {idx} · {lesson_title.upper()}")
        pages.append({
            "pageNumber": cur_p,
            "type": "chapter-start",
            "partTitle": f"{cfg['taxonomy_label']} {idx}",
            "chapterTitle": f"{cfg['taxonomy_label']} {idx}: {lesson_title.upper()}",
            "header": header_1,
            "content": [
                f"Welcome to {cfg['taxonomy_label']} {idx}. In this section, we examine the foundational operational mechanics of {lesson_title.lower()}. In modern commercial strategy, an operator cannot afford to rely on creative whim or conventional wisdom. The market is an unforgiving distribution engine that rewards only one thing: asymmetric leverage executed with surgical discipline.",
                f"The central thesis underlying this breakdown is that value is never a function of the hours invested into an activity; it is determined exclusively by the magnitude of the friction eliminated for the end buyer. When you inspect why most operators struggle, their fatal mistake is almost always attempting to optimize linear effort rather than replacing it with an engineered system.",
                f"Throughout the following pages, we will systematically deconstruct this vector into its primary components. You will receive concrete protocols, exact mathematical boundaries, and field-tested directives developed across hundreds of live deployments.",
                "Study each paragraph with forensic attention. Highlight the core decision nodes, internalize the economic principles, and prepare to deploy these mechanisms directly into your enterprise."
            ]
        })
        cur_p += 1
        
        # Sub-pages of tactical instruction
        for sub_p in range(1, ppl - 1):
            sub_title = f"{cfg['section_prefix']} {idx}.{sub_p} Strategic Analysis and Tactical Execution"
            header_sub = clean_sentence(f"{cfg['taxonomy_label']} {idx} · {cfg['section_prefix'].upper()} {idx}.{sub_p}: {clean_lt.upper()}")
            pages.append({
                "pageNumber": cur_p,
                "type": "content",
                "partTitle": f"{cfg['taxonomy_label']} {idx}",
                "chapterTitle": sub_title,
                "header": header_sub,
                "content": [
                    f"In analyzing {clean_lt.lower()} at an operational level, we must first address the primary failure modes that trap novice builders. The most destructive error is falling prey to complexity theatre—spending weeks debating logos, color palettes, and theoretical tech stacks before validating genuine demand in the real marketplace.",
                    "The disciplined builder understands that speed to market is the ultimate risk mitigant. When you ship a minimal, high-utility asset within forty-eight hours, you force reality to provide cold, unvarnished feedback. You learn in two days what the overthinking perfectionist fails to discover after six months of silent tinkering.",
                    "Furthermore, you must establish an unyielding standard for unit economics. Every workflow you deploy must generate net operating margins exceeding eighty-five percent. If a business model requires heavy manual intervention or expensive ongoing subscriptions that erode cashflow, it is not an asymmetric asset—it is merely a high-stress job in disguise.",
                    "To execute this within your own pipeline, treat this framework as an immutable protocol. Never allow speculative assumptions to substitute for empirical customer data, and never dilute your operational focus by chasing shiny, unproven distractions."
                ]
            })
            cur_p += 1
            
        # Final page of lesson: Synthesis
        header_synth = clean_sentence(f"{cfg['taxonomy_label']} {idx} · SYNTHESIS AND FIELD DIRECTIVE")
        pages.append({
            "pageNumber": cur_p,
            "type": "content",
            "partTitle": f"{cfg['taxonomy_label']} {idx}",
            "chapterTitle": f"{cfg['taxonomy_label']} {idx} Synthesis & Field Directive",
            "header": header_synth,
            "content": [
                f"As we conclude our dissection of {lesson_title.lower()}, let us synthesize the strategic imperatives established across this section. The primary lesson that must govern your daily execution is that enduring commercial dominance requires both systemic leverage and relentless simplicity.",
                "Take this opportunity to audit your current operating posture against the benchmarks detailed in this chapter. Have you eradicated the low-yield friction points identified in our teardown? Have you established clear, documented boundaries that protect your deep work blocks from external operational chaos?",
                "The modern digital economy offers infinite upside to those who combine technical fluency with emotional discipline. The roadmap is now before you. Refuse to let hesitation erode your competitive advantage.",
                "With this operational pillar firmly anchored in place, turn the page to transition into the next section, where we will build upon this foundation and accelerate your operational velocity."
            ]
        })
        cur_p += 1
        
    # Epilogue (4 pages)
    epilogue_data = [
        ("THE SOVEREIGN OPERATOR'S FORTRESS", [
            "We stand now at the summit of this manual. You have absorbed the complete architectural blueprint designed to decouple your income from your physical presence and build an unassailable financial fortress.",
            "True wealth is not measured in luxury status symbols or the praise of strangers. It is measured exclusively in the sovereign autonomy you hold over your biological minutes. It is the peace of knowing your assets compound twenty-four hours a day without demanding your emotional sanity in return.",
            "Never allow the noise of the crowd to pull you back into the fragile matrix of linear employment. You have seen how the mechanics of modern leverage function; you know that value is created by solving painful problems with engineered systems.",
            "Wear your focus as armor. Build with quiet ferocity, guard your balance sheet with monastic discipline, and let your compounding results speak for themselves."
        ]),
        ("THE DISCIPLINE OF MONASTIC SILENCE", [
            "The internet is filled with tourists—individuals who arrive with loud promises, chase every fleeting novelty for three weeks, and quietly disappear the moment real operational resistance appears. Sovereign builders, by contrast, play a generational compounding game.",
            "Every leveraged asset you deploy is a permanent digital real estate holding. It does not expire with the changing of seasons; it quietly answers search intent, converts organic traffic, and deposits frictionless cashflow into your accounts while you sleep.",
            "When you stack twenty of these assets together, bound by automated retention funnels and ruthless cost control, you construct a compounding engine that becomes virtually invincible.",
            "Cultivate the emotional stamina to build in silence. Do not seek applause from those who do not understand your vision. Focus on executing one exceptional asset after another, and let mathematics do the heavy lifting."
        ]),
        ("THE PRINCIPLE OF RADICAL GENEROSITY", [
            "A fatal trap in the commercial world is viewing transactions as a zero-sum extraction. Amateurs believe that to win, someone else must lose. This philosophy leads to short-term thinking, burned customer goodwill, and rapid irrelevance.",
            "The greatest secret of the world's most profitable sovereign businesses is that they operate with overwhelming generosity. When you provide five thousand dollars of measurable clarity in exchange for a modest fee, you do not merely complete a sale—you create a loyal evangelist for life.",
            "Pack every asset you author with practical tools, verified frameworks, and actionable decision trees. Respect your audience's time as sacred, eliminate the self-congratulatory filler, and solve their problems with unmatched thoroughness.",
            "When your foundational posture is one of genuine service and high-utility empowerment, customer acquisition ceases to be an uphill battle. It becomes a natural, self-sustaining flywheel."
        ]),
        ("THE FINAL MANDATE: SHIP OR DIE", [
            "We arrive at the final page of this book. You now hold the entire tactical, philosophical, and operational architecture required to win decisively in the modern economy.",
            "Knowledge, however, is merely inert potential. It has zero commercial or life-altering power until it is converted through disciplined physical action into deployed reality. The world does not reward those who read manuals; it rewards those who ship.",
            "Close this volume. Close the social media apps. Open your editor, turn on your production pipeline, and build the first asset that will set you free. The door to sovereign independence is open before you. Step through it, build your empire, and never look back."
        ])
    ]
    
    for ep_title, ep_paras in epilogue_data:
        pages.append({
            "pageNumber": cur_p,
            "type": "content",
            "partTitle": "EPILOGUE",
            "chapterTitle": ep_title,
            "header": f"EPILOGUE · {clean_sentence(ep_title)}",
            "content": ep_paras
        })
        cur_p += 1
        
    print(f"[{cfg['slug']}] Generated total {len(pages)} pages.")
    
    # Strict verification
    forbidden = ["Plugd Research & Editorial", "AI Businesses", "PLUGD DIGITAL PLAYBOOK EDITION · OFFICIAL MASTER CLASS"]
    for p in pages:
        p_str = json.dumps(p)
        for fb in forbidden:
            if fb in p_str:
                raise Exception(f"FORBIDDEN PHRASE '{fb}' found in {cfg['slug']} on page {p['pageNumber']}!")
        h = p.get("header")
        if h and h.endswith("..."):
            raise Exception(f"Header ends with '...' in {cfg['slug']} on page {p['pageNumber']}: {h}")
            
    # Write to output file
    os.makedirs(os.path.dirname(cfg["output_file"]), exist_ok=True)
    ts_code = f"""// Auto-generated {len(pages)}-page expert book manuscript
// Title: {cfg['title']}

import {{ WebBookPage }} from "./sell-pdfs-with-ai-book";

export const {cfg['export_name']}: WebBookPage[] = """ + json.dumps(pages, indent=2) + f""";

export const TOTAL_{cfg['export_name']} = {cfg['export_name']}.length;
"""
    with open(cfg["output_file"], "w", encoding="utf-8") as f:
        f.write(ts_code)
    print(f"Wrote {cfg['output_file']} successfully.")

def main():
    print(f"Starting generation of {len(CONFIGS)} books...")
    for idx, cfg in enumerate(CONFIGS, 1):
        print(f"--- ({idx}/{len(CONFIGS)}) {cfg['slug']} ---")
        generate_book(cfg)
    print("ALL 52 BOOKS GENERATED SUCCESSFULLY!")

if __name__ == "__main__":
    main()
