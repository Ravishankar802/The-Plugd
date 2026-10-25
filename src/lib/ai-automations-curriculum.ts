export interface LessonMetadata {
  id: string;
  number: string;
  title: string;
  duration: string;
  summary: string;
}

export interface ModuleMetadata {
  id: string;
  number: string;
  title: string;
  description: string;
  duration: string;
  lessonsCount: number;
  lessons: LessonMetadata[];
}

export const AI_AUTOMATIONS_MODULES_METADATA: ModuleMetadata[] = [
  {
    id: "module-01",
    number: "01",
    title: "The Zero-Employee AI Revolution & The $10,000 Milestone",
    description: "Understand the seismic shift from labor to software leverage, master the mathematical pathways to $10,000/month as a solo operator, and navigate the 5-dimensional business scoring framework.",
    duration: "58m",
    lessonsCount: 4,
    lessons: [
      {
        id: "01-1",
        number: "1.1",
        title: "The Shift from Labor to Leverage: Why Solopreneurs Win with AI",
        duration: "14m",
        summary: "Understand how autonomous AI tools eliminate traditional payroll and organizational drag, enabling a single operator to deliver enterprise-grade value with zero employees.",
      },
      {
        id: "01-2",
        number: "1.2",
        title: "The $10,000+/Month Unit Economics Model: Math, Margins & Offer Architecture",
        duration: "15m",
        summary: "Deconstruct the exact mathematical pathways to $10,000/month: comparing client retainers, setup fees, and revenue-share splits with realistic margins and cost structures.",
      },
      {
        id: "01-3",
        number: "1.3",
        title: "The 5-Dimensional Business Evaluation Framework",
        duration: "14m",
        summary: "Evaluate any AI venture using the 5 core filters: General Difficulty, Time Intensity, Scalability Ceiling, Income Potential, and Operational Stress Level.",
      },
      {
        id: "01-4",
        number: "1.4",
        title: "The Zero-Employee Reality: Automation Boundaries, Tool Budgets & Quality Control",
        duration: "15m",
        summary: "Navigate the honest operational constraints of running solo: managing software overhead ($200–$400/mo), API quotas, exception handling, and contractor boundaries.",
      },
    ],
  },
  {
    id: "module-02",
    number: "02",
    title: "Business #1 — The AI Automation Agency (AAA)",
    description: "Build, package, and deploy mission-critical workflow automations for businesses, eliminating repetitive manual tasks and capturing high-margin monthly retainers.",
    duration: "57m",
    lessonsCount: 4,
    lessons: [
      {
        id: "02-1",
        number: "2.1",
        title: "Finding High-Friction Business Bottlenecks & Operational Waste",
        duration: "14m",
        summary: "Audit mid-market businesses to uncover manual data entry, slow lead triage, and repetitive workflows that owners eagerly pay $2,500+ to eliminate.",
      },
      {
        id: "02-2",
        number: "2.2",
        title: "Building the Core Technical Engine: Make.com, Airtable & LLM Webhooks",
        duration: "15m",
        summary: "Construct end-to-end event-driven pipelines that listen for customer webhooks, transform payloads with structured AI reasoning, and update databases.",
      },
      {
        id: "02-3",
        number: "2.3",
        title: "Deploying 24/7 Autonomous Lead Responders & Appointment Bots",
        duration: "14m",
        summary: "Build instant-response agents that qualify prospects in under 60 seconds, check calendar availability, and book sales meetings directly into client CRMs.",
      },
      {
        id: "02-4",
        number: "2.4",
        title: "AAA Failure Management, Error Recovery & High-Stress Mitigation",
        duration: "14m",
        summary: "Mitigate the high operational stress of mission-critical automations using dead-letter queues, automated retries, and instant monitoring alerts.",
      },
    ],
  },
  {
    id: "module-03",
    number: "03",
    title: "Business #2 — AI Creative & Short-Form Content Studio",
    description: "Launch a lean, high-velocity short-form video studio leveraging AI scriptwriting, voice cloning, and cinematic generative B-roll for brands and founders.",
    duration: "56m",
    lessonsCount: 4,
    lessons: [
      {
        id: "03-1",
        number: "3.1",
        title: "The Attention Economy & The High-Ticket Short-Form Bottleneck",
        duration: "14m",
        summary: "Capitalize on the explosive demand for short-form video (Reels, TikTok, Shorts) among brands and founders who lack the time or tools to produce content.",
      },
      {
        id: "03-2",
        number: "3.2",
        title: "The AI Creative Pipeline: Scripting, Voice Synthesis & Visual Generation",
        duration: "14m",
        summary: "Harness LLMs for high-retention storytelling hooks, ElevenLabs for voice cloning, and Higgsfield AI, Midjourney & Runway for cinematic B-roll.",
      },
      {
        id: "03-3",
        number: "3.3",
        title: "Automated Video Assembly, Pacing & Faceless Channel Systems",
        duration: "14m",
        summary: "Standardize rapid video assembly, dynamic subtitle animation, B-roll pacing, and audio mixing to produce 30 high-performing video assets in 4 hours.",
      },
      {
        id: "03-4",
        number: "3.4",
        title: "Managing Revision Traps, Client Boundaries & Defending Studio Margins",
        duration: "14m",
        summary: "Protect agency profitability from endless client revisions using rigid review portals, asynchronous approval gates, and clear deliverable caps.",
      },
    ],
  },
  {
    id: "module-04",
    number: "04",
    title: "Business #3 — AI Shadow Operating for Micro-Creators",
    description: "Partner with micro-creators (10k–50k followers) who have passionate audiences but zero monetization infrastructure, unlocking asymmetric 70/30 revenue shares without sales pressure.",
    duration: "58m",
    lessonsCount: 4,
    lessons: [
      {
        id: "04-1",
        number: "4.1",
        title: "The Hidden Goldmine: Why Micro-Creators (10k–50k) Need a Shadow Operator",
        duration: "14m",
        summary: "Discover why creators with 10k–50k engaged followers make the ideal partners: hyper-loyal audiences, zero monetization backend, and camera-only focus.",
      },
      {
        id: "04-2",
        number: "4.2",
        title: "The 70/30 Revenue-Share Architecture: Partnerships Without Cold Pitching",
        duration: "15m",
        summary: "Structure no-sales-pressure partnership deals where creators keep 70% and you earn 30% of backend revenue by running monetization on autopilot.",
      },
      {
        id: "04-3",
        number: "4.3",
        title: "Selecting High-Converting Digital Offers: Courses, Coaching & Info Communities",
        duration: "14m",
        summary: "Package the creator's domain expertise into high-margin digital products, paid memberships, and cohort communities on platforms like Whop and Skool.",
      },
      {
        id: "04-4",
        number: "4.4",
        title: "The 5-Criteria Profile of Shadow Operating: Maximum Leverage, Minimum Stress",
        duration: "15m",
        summary: "Deep-dive into why Shadow Operating scores highest across scalability and peace of mind: zero retainers, no angry daily clients, and asymmetric upside.",
      },
    ],
  },
  {
    id: "module-05",
    number: "05",
    title: "The AI Shadow Operator Launch & Monetization Engine",
    description: "Master the step-by-step launch mechanics that convert 0.2% of a micro-creator audience into $50,000 launches, followed by compounding evergreen monthly income.",
    duration: "59m",
    lessonsCount: 4,
    lessons: [
      {
        id: "05-1",
        number: "5.1",
        title: "AI-Powered Launch Strategy & Automated Sales Asset Generation",
        duration: "15m",
        summary: "Generate complete product launch funnels—including high-converting VSL scripts, landing page copy, and email announcement sequences—using specialized AI frameworks.",
      },
      {
        id: "05-2",
        number: "5.2",
        title: "The 1-Week Launch Gauntlet: From Teaser Campaign to 100 Paying Customers",
        duration: "15m",
        summary: "Execute a structured 7-day launch to a 50k audience to achieve 100 sales at $500 ($50,000 gross / $15,000 operator profit) even if 99.8% ignore it.",
      },
      {
        id: "05-3",
        number: "5.3",
        title: "Post-Launch Evergreen Systems: Compounding 50 Recurring Sales/Month",
        duration: "15m",
        summary: "Automate evergreen DM qualification, automated story triggers, and onboarding loops that generate steady $7,500/month recurring operator revenue.",
      },
      {
        id: "05-4",
        number: "5.4",
        title: "Creator Account Management: Overcoming the 5% Inaction & Delivery Stall",
        duration: "14m",
        summary: "Prevent creator procrastination and launch delays using structured milestone tracking, collaborative sprint calendars, and contract safeguards.",
      },
    ],
  },
  {
    id: "module-06",
    number: "06",
    title: "Client Acquisition & Deal Structuring Without Ad Spend",
    description: "Secure high-paying B2B automation clients and lock in top micro-creator partnerships organically through value-first audits, authentic outreach, and diagnostic calls.",
    duration: "57m",
    lessonsCount: 4,
    lessons: [
      {
        id: "06-1",
        number: "6.1",
        title: "Value-First B2B Outreach: The 3-Minute Loom Audit for AAA & Content",
        duration: "14m",
        summary: "Land high-ticket agency clients organically by auditing public bottlenecks and sending personalized video teardowns that prove immediate ROI.",
      },
      {
        id: "06-2",
        number: "6.2",
        title: "The Creator DM Infiltration Script: Signing Micro-Creators As Partners",
        duration: "14m",
        summary: "Initiate genuine conversations with 10k–50k creators on Instagram and X using value-focused scripts that trigger responses and build trust.",
      },
      {
        id: "06-3",
        number: "6.3",
        title: "The Diagnostic Partnership Call & Bulletproof Legal Contracts",
        duration: "15m",
        summary: "Conduct diagnostic discovery calls that close without pressure, and protect your revenue share with enforceable, transparent partnership agreements.",
      },
      {
        id: "06-4",
        number: "6.4",
        title: "Client Retention & Portfolio Compounding: Building a 12-Month Moat",
        duration: "14m",
        summary: "Retain B2B clients and creator partners long-term through automated monthly performance reporting, upsells, and quarterly revenue expansions.",
      },
    ],
  },
  {
    id: "module-07",
    number: "07",
    title: "The Solo Scaling Roadmap & Path to $10,000+/Month",
    description: "Synthesize all three business models into a resilient, high-margin solo enterprise that reaches $10,000+/month with lean tool budgets, minimal overhead, and zero employees.",
    duration: "58m",
    lessonsCount: 4,
    lessons: [
      {
        id: "07-1",
        number: "7.1",
        title: "The 30-Day Execution Roadmap: From Zero to First $10,000 Milestone",
        duration: "15m",
        summary: "Follow a disciplined 4-week timeline covering offer selection, technical scaffolding, partner outreach, and closing your first monetization engine.",
      },
      {
        id: "07-2",
        number: "7.2",
        title: "The Solo Operator Tool Stack & Lean Overhead Management ($250/mo Cap)",
        duration: "14m",
        summary: "Maintain 90%+ net profit margins by operating a lean, battle-tested software stack capped at $250/month across automation, AI, and hosting.",
      },
      {
        id: "07-3",
        number: "7.3",
        title: "Managing Multiple Client & Creator Portfolios As a Solo Operator",
        duration: "15m",
        summary: "Manage 3–5 simultaneous agency clients or creator partnerships solo using asynchronous communication, centralized telemetry, and automated task queues.",
      },
      {
        id: "07-4",
        number: "7.4",
        title: "Long-Term Compounding: Building Enterprise Valuation as a Solopreneur",
        duration: "14m",
        summary: "Transition from active operator to high-margin portfolio owner by balancing predictable retainer cash flow with high-upside creator equity.",
      },
    ],
  },
];
