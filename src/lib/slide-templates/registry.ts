/**
 * Persistent PPT Slide Template Registry
 *
 * Mandatory requirement: Every Playbook must have its own distinct PPT slide template/design.
 * A template assigned to one Playbook must NEVER be reused for another.
 * This registry enforces programmatic uniqueness across all Playbooks.
 */

export interface SlideTemplateDefinition {
  templateId: string;
  name: string;
  categoryTheme: string;
  description: string;
  colorPalette: {
    canvasBg: string;
    stageBg: string;
    border: string;
    primaryText: string;
    secondaryText: string;
    accent: string;
    accentSecondary?: string;
    highlightPillBg: string;
    highlightPillText: string;
  };
  visualMotifs: string[];
  layoutArchitecture: string;
  assignedPlaybookIds: string[];
  assignedPlaybookSlugs: string[];
}

// Master persistent registry of slide templates
export const SLIDE_TEMPLATES: Record<string, SlideTemplateDefinition> = {
  // 1. Reference Blueprint Template (7 AI Automation Tools / These 3 AI Businesses)
  "blueprint-light-canvas": {
    templateId: "blueprint-light-canvas",
    name: "Editorial Blueprint Canvas",
    categoryTheme: "No-Code & Automation Tools",
    description:
      "Warm ivory canvas (#faf8f5) with rounded white cards, electric blue (#2563eb) accents, light blue metadata pill tags, and clean editorial typography.",
    colorPalette: {
      canvasBg: "#faf8f5",
      stageBg: "#ffffff",
      border: "#e7e5e4",
      primaryText: "#1c1917",
      secondaryText: "#57534e",
      accent: "#2563eb",
      highlightPillBg: "#eff6ff",
      highlightPillText: "#2563eb",
    },
    visualMotifs: [
      "Ivory background with soft lighting",
      "Pill-shaped badge with pulsing dot",
      "Clean linear comparison cards",
      "Blue accent action cards",
    ],
    layoutArchitecture: "Single centered card stage with top pill eyebrow and bottom navigation bar",
    assignedPlaybookIds: ["ai-businesses-01"],
    assignedPlaybookSlugs: ["7-ai-automations"],
  },

  // 2. Foundation Relationship Template (The Dating Playbook)
  "dark-editorial-relationship": {
    templateId: "dark-editorial-relationship",
    name: "Dark Minimalist Editorial",
    categoryTheme: "Interpersonal & Lifestyle",
    description:
      "Pitch black / obsidian background (#0A0A0C) with subtle neutral-800 borders, minimal typography, and SMS/chat scenario mockups.",
    colorPalette: {
      canvasBg: "#0A0A0C",
      stageBg: "linear-gradient(to bottom, #141418, #101014, #0D0D10)",
      border: "#262626",
      primaryText: "#ffffff",
      secondaryText: "#a3a3a3",
      accent: "#2563eb",
      highlightPillBg: "#171717",
      highlightPillText: "#a3a3a3",
    },
    visualMotifs: [
      "Deep dark obsidian atmosphere",
      "Subtle glowing drop shadows",
      "High-contrast white-on-black quotes",
      "Phone text conversation mockup bubbles",
    ],
    layoutArchitecture: "Full-bleed dark frame with subtle radial ambient glow",
    assignedPlaybookIds: ["dating-playbook"],
    assignedPlaybookSlugs: ["men", "women", "dating-playbook"],
  },

  // 3. Playbook 2: 10 Ways to Find Paying Customers Without Spending on Ads
  "organic-acquisition-dossier": {
    templateId: "organic-acquisition-dossier",
    name: "Zero-Ad Tactical Acquisition Dossier",
    categoryTheme: "Organic B2B Client Acquisition & Teardowns",
    description:
      "Deep tactical slate canvas (#090d16) with warm amber (#f59e0b) and crisp emerald (#10b981) badges, video audit frames, and pipeline conversion metrics.",
    colorPalette: {
      canvasBg: "#090d16",
      stageBg: "linear-gradient(150deg, #111827, #0b0f19)",
      border: "rgba(245, 158, 11, 0.28)",
      primaryText: "#f9fafb",
      secondaryText: "#9ca3af",
      accent: "#f59e0b",
      accentSecondary: "#10b981",
      highlightPillBg: "rgba(245, 158, 11, 0.12)",
      highlightPillText: "#fbbf24",
    },
    visualMotifs: [
      "Tactical client acquisition pipeline diagram",
      "Video audit frame markers (Loom 3-minute teardown indicator)",
      "Zero-ad CAC vs LTV comparison charts",
      "High-contrast amber focus states",
    ],
    layoutArchitecture: "Tactical mission dashboard with top channel indicator and bottom pipeline conversion bar",
    assignedPlaybookIds: ["side-hustles-08"],
    assignedPlaybookSlugs: ["side-hustles"],
  },

  // 4. Playbook 3: Give Me 26 Minutes, I'll Give You 10,000 Hours of Claude Knowledge
  "anthropic-claude-architect": {
    templateId: "anthropic-claude-architect",
    name: "Anthropic Claude Systems Architect",
    categoryTheme: "Advanced Claude 3.5 Sonnet Engineering & Artifacts",
    description:
      "Warm terracotta ivory canvas (#faf6f0) with vibrant terracotta orange (#d97706) and deep indigo slate (#312e81), XML tag prompt visualizers, and React Artifact preview frames.",
    colorPalette: {
      canvasBg: "#faf6f0",
      stageBg: "#ffffff",
      border: "#e7dfd5",
      primaryText: "#1f1d1a",
      secondaryText: "#635e57",
      accent: "#d97706",
      accentSecondary: "#312e81",
      highlightPillBg: "#fef3c7",
      highlightPillText: "#b45309",
    },
    visualMotifs: [
      "XML prompt tag syntax highlights (<operational_context>)",
      "Live interactive React Artifact frame with code preview tab",
      "Anthropic model selector indicator (Haiku / Sonnet 3.5 / Opus)",
      "Warm editorial typography with terracotta accents",
    ],
    layoutArchitecture: "Cognitive split architecture with prompt logic rail and interactive execution canvas",
    assignedPlaybookIds: ["ai-businesses-03"],
    assignedPlaybookSlugs: ["give-me-26-minutes-ill-give-you-10000-hours-of-claude-knowledge"],
  },

  // 5. Playbook 4: Give Me 28 Minutes, I'll Give You 10,000 Hours of ChatGPT Knowledge
  "openai-gpt-synthesizer": {
    templateId: "openai-gpt-synthesizer",
    name: "OpenAI GPT Deep Reasoning Synthesizer",
    categoryTheme: "ChatGPT-4o & OpenAI Reasoning Architectures",
    description:
      "Dark obsidian navy canvas (#030712) with OpenAI emerald teal (#10a37f) and electric violet (#8b5cf6), Custom GPT instruction schemas, and o1/o3 reasoning step badges.",
    colorPalette: {
      canvasBg: "#030712",
      stageBg: "linear-gradient(155deg, #0b1329, #030712)",
      border: "rgba(16, 163, 127, 0.3)",
      primaryText: "#f8fafc",
      secondaryText: "#94a3b8",
      accent: "#10a37f",
      accentSecondary: "#8b5cf6",
      highlightPillBg: "rgba(16, 163, 127, 0.12)",
      highlightPillText: "#34d399",
    },
    visualMotifs: [
      "o1/o3 Chain-of-thought reasoning step badges (Thought for 12 seconds)",
      "Custom GPT schema editor block with OpenAPI action tabs",
      "Devil's Advocate critical stress-test alert callouts",
      "OpenAI green luminous accents against deep obsidian",
    ],
    layoutArchitecture: "Reasoning telemetry matrix with top model mode switcher and bottom thought trace log",
    assignedPlaybookIds: ["ai-businesses-04"],
    assignedPlaybookSlugs: ["give-me-28-minutes-ill-give-you-10000-hours-of-chatgpt-knowledge"],
  },

  // 6. Playbook 5: 5 Proven Ways To Make Money With AI (No Experience)
  "monetization-playbook-canvas": {
    templateId: "monetization-playbook-canvas",
    name: "Zero-Experience AI Monetization Canvas",
    categoryTheme: "Beginner AI Monetization & Business Packaging",
    description:
      "Light minimalist pearl canvas (#f8fafc) with Royal Sapphire (#1d4ed8) and Lime Emerald (#65a30d), clear step-by-step business model cards, and 5-criteria scorecard meters.",
    colorPalette: {
      canvasBg: "#f8fafc",
      stageBg: "#ffffff",
      border: "#e2e8f0",
      primaryText: "#0f172a",
      secondaryText: "#475569",
      accent: "#1d4ed8",
      accentSecondary: "#65a30d",
      highlightPillBg: "#dbeafe",
      highlightPillText: "#1d4ed8",
    },
    visualMotifs: [
      "5-Criteria score meter (Longevity, Effort, Scalability, Autonomy, Margin)",
      "Clean client delivery spec cards with tool tags",
      "Transparent unit economics calculator cards",
      "Sapphire blue verified checkmarks and badges",
    ],
    layoutArchitecture: "Structured business model scorecard with top criteria gauge and dual delivery cards",
    assignedPlaybookIds: ["ai-businesses-05"],
    assignedPlaybookSlugs: ["5-proven-ways-to-make-money-with-ai-no-experience"],
  },

  // 7. Playbook 6: The Best AI Side Hustles To Start In 2026 (No Skills)
  "future-sidehustle-terminal": {
    templateId: "future-sidehustle-terminal",
    name: "2026 Side Hustle Tier-List Terminal",
    categoryTheme: "2026 AI Micro-Enterprises & Tier-Ranked Systems",
    description:
      "Modern dark slate canvas (#0f172a) with Neon Cyan (#06b6d4) and Sunburst Orange (#f97316), S-Tier to F-Tier ranking indicators, and anti-commodity quality filters.",
    colorPalette: {
      canvasBg: "#0f172a",
      stageBg: "linear-gradient(150deg, #1e293b, #0f172a)",
      border: "rgba(6, 182, 212, 0.3)",
      primaryText: "#f8fafc",
      secondaryText: "#cbd5e1",
      accent: "#06b6d4",
      accentSecondary: "#f97316",
      highlightPillBg: "rgba(6, 182, 212, 0.14)",
      highlightPillText: "#22d3ee",
    },
    visualMotifs: [
      "S-Tier / A-Tier / B-Tier / F-Tier rank badges with dynamic color coding",
      "Anti-AI Slop quality checklist with passed/failed badges",
      "Make.com / Airtable / Claude integration flowcharts",
      "Cyan glow telemetry cards with orange action highlights",
    ],
    layoutArchitecture: "Tier-list comparative terminal with left rank indicator and right implementation framework",
    assignedPlaybookIds: ["ai-businesses-06"],
    assignedPlaybookSlugs: ["the-best-ai-side-hustles-to-start-in-2026-no-skills"],
  },

  // 8. Playbook 7: Copy & Paste THIS Strategy to Make $13k/Month with AI in 2026
  "copy-paste-13k-framework": {
    templateId: "copy-paste-13k-framework",
    name: "AI Shadow Operator $13k Blueprint",
    categoryTheme: "High-Margin Creator Monetization & Whop Engines",
    description:
      "Executive deep space black canvas (#09090b) with Bright Gold (#eab308) and Cyber Emerald (#22c55e), $13,500 MRR cashflow boards, and 70/30 creator revenue split calculators.",
    colorPalette: {
      canvasBg: "#09090b",
      stageBg: "linear-gradient(155deg, #18181b, #09090b)",
      border: "rgba(234, 179, 8, 0.3)",
      primaryText: "#fafafa",
      secondaryText: "#a1a1aa",
      accent: "#eab308",
      accentSecondary: "#22c55e",
      highlightPillBg: "rgba(234, 179, 8, 0.12)",
      highlightPillText: "#facc15",
    },
    visualMotifs: [
      "70/30 Asymmetric revenue share mathematical breakdown dial",
      "Whop platform checkout & digital vault simulator",
      "7-Day social warm-up calendar with story hooks",
      "Gold and cyber-emerald executive financial status bar",
    ],
    layoutArchitecture: "Executive shadow operator console with top cashflow HUD and central partnership launch framework",
    assignedPlaybookIds: ["ai-businesses-07"],
    assignedPlaybookSlugs: ["copy-paste-this-strategy-to-make-13k-month-with-ai-in-2026"],
  },

  // 9. Playbook 8: Build A One-Person Business As A Beginner (From $0 To $10K)
  "solopreneur-zero-to-ten": {
    templateId: "solopreneur-zero-to-ten",
    name: "Solopreneur Zero-to-$10K Blueprint",
    categoryTheme: "Solo Founder Validation & Leveraged Digital Assets",
    description:
      "Warm parchment editorial canvas (#fdfbf7) with Deep Crimson Wine (#991b1b) and Rich Navy (#1e3a8a), 3-stage validation funnel cards, and customer discovery matrices.",
    colorPalette: {
      canvasBg: "#fdfbf7",
      stageBg: "#ffffff",
      border: "#ede7df",
      primaryText: "#1c1917",
      secondaryText: "#57534e",
      accent: "#991b1b",
      accentSecondary: "#1e3a8a",
      highlightPillBg: "#fee2e2",
      highlightPillText: "#991b1b",
    },
    visualMotifs: [
      "Rule of Ones clarity pillar (1 Audience, 1 Offer, 1 Channel)",
      "7-Day validation milestone progress tracker",
      "Build-once, sell-forever compounding asset curves",
      "Crimson editorial typography with crisp navy supporting frames",
    ],
    layoutArchitecture: "Editorial founder journal with top milestone tracker and center validation framework",
    assignedPlaybookIds: ["ai-businesses-08"],
    assignedPlaybookSlugs: ["build-a-one-person-business-as-a-beginner-from-0-to-10k"],
  },
  // 10. Playbook 9: Laziest Way to Make Money Online in 2026 ($500/day)
  "minimalist-cinema-dark": {
    templateId: "minimalist-cinema-dark",
    name: "Midnight Cinema $500/Day Stream",
    categoryTheme: "Asynchronous Cashflow & Automated Media Arbitrage",
    description: "Deep midnight cinematic canvas (#08080a) with amber cinematic glow (#f59e0b) and mint green (#10b981), widescreen movie aspect ratio, narrative scene cards, and $500/day cashflow dials.",
    colorPalette: {
      canvasBg: "#08080a",
      stageBg: "linear-gradient(160deg, #121217, #08080a)",
      border: "rgba(245, 158, 11, 0.25)",
      primaryText: "#f4f4f5",
      secondaryText: "#a1a1aa",
      accent: "#f59e0b",
      accentSecondary: "#10b981",
      highlightPillBg: "rgba(245, 158, 11, 0.12)",
      highlightPillText: "#fbbf24",
    },
    visualMotifs: [
      "Widescreen cinema scene letterbox styling",
      "Dynamic $500/day daily revenue speedometer",
      "Software arbitrage automated delivery pipe",
      "Amber director cut timestamp badges",
    ],
    layoutArchitecture: "Cinematic screenplay stage with top narrative act marker and center cinematic breakdown",
    assignedPlaybookIds: ["ai-businesses-09"],
    assignedPlaybookSlugs: ["laziest-way-to-make-money-online-in-2026-500-day"],
  },

  // 11. Playbook 10: The Blueprint To Go From $0 To $1,000,000
  "sovereign-vault-gold": {
    templateId: "sovereign-vault-gold",
    name: "Sovereign Treasury $1M Vault",
    categoryTheme: "Multi-Stage Capital Accumulation & Wealth Architecture",
    description: "Obsidian marble canvas (#07090e) with Imperial Gold (#eab308) and Royal Navy (#1e40af), 3-tier wealth transition gates, and institutional cashflow ledger blocks.",
    colorPalette: {
      canvasBg: "#07090e",
      stageBg: "linear-gradient(150deg, #0e1320, #07090e)",
      border: "rgba(234, 179, 8, 0.35)",
      primaryText: "#f8fafc",
      secondaryText: "#94a3b8",
      accent: "#eab308",
      accentSecondary: "#3b82f6",
      highlightPillBg: "rgba(234, 179, 8, 0.14)",
      highlightPillText: "#fde047",
    },
    visualMotifs: [
      "Three-stage $0-to-$1M staircase ascension diagram",
      "Institutional liquidity ratio telemetry dial",
      "High-contrast gold foil header typography",
      "Balance sheet active vs passive capital divider",
    ],
    layoutArchitecture: "Institutional treasury ledger with top capital milestone radar and split asset allocation stage",
    assignedPlaybookIds: ["ai-businesses-10"],
    assignedPlaybookSlugs: ["the-blueprint-to-go-from-0-to-1000000"],
  },

  // 12. Playbook 11: Your First $1M Is Simple (Here's How)
  "kinetic-velocity-neon": {
    templateId: "kinetic-velocity-neon",
    name: "Escape Velocity Kinetic Deck",
    categoryTheme: "Skill Stacking & Exponential Wealth Mechanics",
    description: "Carbon fiber dark canvas (#090a0f) with Electric Emerald (#10b981) and Hyper Cyan (#06b6d4), velocity trajectory arcs, and skill-stack leverage multipliers.",
    colorPalette: {
      canvasBg: "#090a0f",
      stageBg: "linear-gradient(160deg, #111422, #090a0f)",
      border: "rgba(16, 185, 129, 0.3)",
      primaryText: "#ffffff",
      secondaryText: "#94a3b8",
      accent: "#10b981",
      accentSecondary: "#06b6d4",
      highlightPillBg: "rgba(16, 185, 129, 0.12)",
      highlightPillText: "#34d399",
    },
    visualMotifs: [
      "Gravitational escape velocity trajectory curve",
      "Skill-stack Venn diagram (Copy + Sales + Media + Ops)",
      "Cognitive threshold breakthrough indicators",
      "Neon telemetry HUD with real-time acceleration stats",
    ],
    layoutArchitecture: "Kinetic flight telemetry deck with lateral vector metrics and center velocity core",
    assignedPlaybookIds: ["ai-businesses-11"],
    assignedPlaybookSlugs: ["your-first-1m-is-simple-heres-how"],
  },

  // 13. Playbook 12: The 5 Money Principles that will make anyone RICH in their 20s
  "monastic-editorial-parchment": {
    templateId: "monastic-editorial-parchment",
    name: "Stoic Archival Money Codex",
    categoryTheme: "Behavioral Finance & 20s Wealth Commandments",
    description: "Antiquated eggshell & slate canvas (#f4f1ea) with Deep Blood Crimson (#881337) and Warm Bronze (#78350f), classical typography, and 5 foundational rule tablets.",
    colorPalette: {
      canvasBg: "#f4f1ea",
      stageBg: "#ffffff",
      border: "#d6cfc4",
      primaryText: "#1c1917",
      secondaryText: "#57534e",
      accent: "#881337",
      accentSecondary: "#78350f",
      highlightPillBg: "#ffe4e6",
      highlightPillText: "#881337",
    },
    visualMotifs: [
      "Classical Roman numeral principle tablets (I through V)",
      "Lifestyle inflation quarantine barrier visual",
      "Asymmetric risk-reward balance scale",
      "Crimson serif editorial typography with bronze marginalia",
    ],
    layoutArchitecture: "Architectural parchment codex with top canon banner and structured tablet comparison",
    assignedPlaybookIds: ["ai-businesses-12"],
    assignedPlaybookSlugs: ["the-5-money-principles-that-will-make-anyone-rich-in-their-20s"],
  },

  // 14. Playbook 13: It's Boring, But Will Make Even Beginners Millionaires in 2026
  "industrial-concrete-slate": {
    templateId: "industrial-concrete-slate",
    name: "Brutalist Industrial Cash Engine",
    categoryTheme: "Unsexy High-Moat B2B Monopolies",
    description: "Heavy concrete slate canvas (#18181b) with Caution Hazard Yellow (#eab308) and Machine Gun Gray (#71717a), mechanical blueprints, and compounding patience meters.",
    colorPalette: {
      canvasBg: "#18181b",
      stageBg: "linear-gradient(180deg, #27272a, #18181b)",
      border: "rgba(234, 179, 8, 0.4)",
      primaryText: "#fafafa",
      secondaryText: "#a1a1aa",
      accent: "#eab308",
      accentSecondary: "#f97316",
      highlightPillBg: "rgba(234, 179, 8, 0.15)",
      highlightPillText: "#fde047",
    },
    visualMotifs: [
      "Industrial warning stripe boundary lines",
      "Boring execution compounding timeline graph",
      "Dip of Irrelevance survival gauge",
      "Monolithic monospace data telemetry blocks",
    ],
    layoutArchitecture: "Industrial control terminal with left diagnostic rail and central mechanical workflow grid",
    assignedPlaybookIds: ["ai-businesses-13"],
    assignedPlaybookSlugs: ["its-boring-but-will-make-even-beginners-millionaires-in-2026"],
  },

  // 15. Playbook 14: I Locked Myself In a Room Until I Built a $350,000/mo Business
  "solitary-monk-mode": {
    templateId: "solitary-monk-mode",
    name: "Monk Mode $350k Crucible",
    categoryTheme: "Radical Sensory Deprivation & 8-Figure Focus",
    description: "Pitch void black canvas (#050507) with Supercar Sunset Tangerine (#ea580c) and Smoked Chrome (#9ca3af), 180-day sensory deprivation countdowns, and $350k MRR verified profit proof.",
    colorPalette: {
      canvasBg: "#050507",
      stageBg: "linear-gradient(165deg, #121118, #050507)",
      border: "rgba(234, 88, 12, 0.35)",
      primaryText: "#f9fafb",
      secondaryText: "#9ca3af",
      accent: "#ea580c",
      accentSecondary: "#fb923c",
      highlightPillBg: "rgba(234, 88, 12, 0.15)",
      highlightPillText: "#fdba74",
    },
    visualMotifs: [
      "180-Day isolation crucible time-block calendar",
      "The $144k in 24 hours crash vs $350k/mo sustainable engine contrast",
      "Sensory deprivation focus telemetry HUD",
      "Vivid supercar tangerine accents against pitch-black void",
    ],
    layoutArchitecture: "Monastic chamber interface with top sensory quarantine banner and central crucible timeline",
    assignedPlaybookIds: ["ai-businesses-14"],
    assignedPlaybookSlugs: ["i-locked-myself-in-a-room-until-i-built-a-350-000-mo-business"],
  },

  // 16. Playbook 15: The 4 Levels To Getting RICH in 2026
  "matrix-dimension-indigo": {
    templateId: "matrix-dimension-indigo",
    name: "Quantum Matrix 4-Level Deck",
    categoryTheme: "Economic Consciousness & Dimensional Jumps",
    description: "Deep dimensional cosmic indigo canvas (#0b0a1a) with Electric Violet (#8b5cf6) and Cyber Cyan (#06b6d4), 4-tier matrix hierarchy ladders, and sovereign escape portals.",
    colorPalette: {
      canvasBg: "#0b0a1a",
      stageBg: "linear-gradient(155deg, #171533, #0b0a1a)",
      border: "rgba(139, 92, 246, 0.35)",
      primaryText: "#f5f3ff",
      secondaryText: "#a5b4fc",
      accent: "#8b5cf6",
      accentSecondary: "#06b6d4",
      highlightPillBg: "rgba(139, 92, 246, 0.15)",
      highlightPillText: "#c4b5fd",
    },
    visualMotifs: [
      "Four-level pyramid matrix breakdown (Jeffrey to Sovereign Architect)",
      "Dimensional jump transition portals",
      "Hourly wage cage vs equity freedom multiplier",
      "Electric violet and cyber cyan glowing circuit nodes",
    ],
    layoutArchitecture: "Multi-dimensional matrix console with left hierarchy ladder and central ascension stage",
    assignedPlaybookIds: ["ai-businesses-15"],
    assignedPlaybookSlugs: ["the-4-levels-to-getting-rich-in-2026", "the-4-levels-to-getting-rich-in-2023"],
  },

  // 17. Playbook 16: The A.I. Revolution: 8 Ways to get RICH
  "neural-frontier-matrix": {
    templateId: "neural-frontier-matrix",
    name: "Neural Frontier AI Wealth Matrix",
    categoryTheme: "Value Arbitrage & Foundational AI Engines",
    description: "Deep space neural grid canvas (#040d1a) with Quantum Teal (#0d9488) and Supernova Lime (#84cc16), Lensa AI value arbitrage tear-downs, and autonomous bot architectures.",
    colorPalette: {
      canvasBg: "#040d1a",
      stageBg: "linear-gradient(160deg, #091e36, #040d1a)",
      border: "rgba(13, 148, 136, 0.35)",
      primaryText: "#f0fdfa",
      secondaryText: "#99f6e4",
      accent: "#0d9488",
      accentSecondary: "#84cc16",
      highlightPillBg: "rgba(13, 148, 136, 0.15)",
      highlightPillText: "#2dd4bf",
    },
    visualMotifs: [
      "Value Arbitrage model diagram (Open Source Infrastructure to Consumer UX)",
      "Algorithmic trading PineScript logic flowchart",
      "Autonomous B2B customer support routing node",
      "Quantum teal and supernova lime data stream particles",
    ],
    layoutArchitecture: "Neural network command bridge with top 8-way matrix selector and central architecture canvas",
    assignedPlaybookIds: ["ai-businesses-16"],
    assignedPlaybookSlugs: ["the-a-i-revolution-8-ways-to-get-rich"],
  },
  // Thrift-to-Fortune Cash Register
  "thrift-to-fortune-ticker": {
      "templateId": "thrift-to-fortune-ticker",
      "name": "Thrift-to-Fortune Cash Register",
      "categoryTheme": "Side Hustles & Bootstrapping",
      "description": "Deep dark green canvas (#07120a) with vintage currency green (#22c55e) accents, thermal receipt paper card textures, barcode decals, and cash register tape motifs.",
      "colorPalette": {
          "canvasBg": "#07120a",
          "stageBg": "linear-gradient(160deg, #0e1e12, #08140b)",
          "border": "rgba(34, 197, 94, 0.35)",
          "primaryText": "#f0fdf4",
          "secondaryText": "#86efac",
          "accent": "#22c55e",
          "accentSecondary": "#15803d",
          "highlightPillBg": "#14532d",
          "highlightPillText": "#4ade80"
      },
      "visualMotifs": [
          "Thermal paper receipt texture",
          "Cash register digital ticker tape",
          "Currency watermark background",
          "Barcode registration stamp"
      ],
      "layoutArchitecture": "Receipt ledger stage with transaction timestamps and green ticker borders",
      "assignedPlaybookIds": [
          "ai-businesses-17"
      ],
      "assignedPlaybookSlugs": [
          "how-i-turned-300-to-100-000-at-19-my-side-hustles"
      ]
  },

  // High-Engagement Creator Studio
  "viral-creator-studio-neon": {
      "templateId": "viral-creator-studio-neon",
      "name": "High-Engagement Creator Studio",
      "categoryTheme": "Social Media & Attention Monetization",
      "description": "Ultra-rich dark violet canvas (#0f051d) with electric magenta (#d946ef) and neon purple (#a855f7) halos, live studio recording tally lights, and follower telemetry badges.",
      "colorPalette": {
          "canvasBg": "#0f051d",
          "stageBg": "linear-gradient(150deg, #18092e, #0e051c)",
          "border": "rgba(217, 70, 239, 0.35)",
          "primaryText": "#faf5ff",
          "secondaryText": "#e9d5ff",
          "accent": "#d946ef",
          "accentSecondary": "#a855f7",
          "highlightPillBg": "#581c87",
          "highlightPillText": "#f0abfc"
      },
      "visualMotifs": [
          "Studio ON-AIR red/magenta tally badge",
          "Neon purple drop glow",
          "Waveform engagement meters",
          "Lens aperture focus corners"
      ],
      "layoutArchitecture": "Broadcast studio monitor layout with live recording indicator",
      "assignedPlaybookIds": [
          "ai-businesses-18"
      ],
      "assignedPlaybookSlugs": [
          "how-to-become-rich-with-social-media-my-exact-playbook"
      ]
  },

  // High-Ticket B2B Boardroom Slate
  "boardroom-executive-slate": {
      "templateId": "boardroom-executive-slate",
      "name": "High-Ticket B2B Boardroom Slate",
      "categoryTheme": "B2B Service Businesses & Retainers",
      "description": "Subtle deep navy boardroom canvas (#09101d) with platinum cards (#0f172a), brushed steel borders, warm champagne gold (#d4af37) accents, and corporate seal marks.",
      "colorPalette": {
          "canvasBg": "#09101d",
          "stageBg": "linear-gradient(145deg, #0f1c30, #0a1322)",
          "border": "rgba(212, 175, 55, 0.32)",
          "primaryText": "#f8fafc",
          "secondaryText": "#94a3b8",
          "accent": "#d4af37",
          "accentSecondary": "#38bdf8",
          "highlightPillBg": "#1e293b",
          "highlightPillText": "#fde047"
      },
      "visualMotifs": [
          "Pinstripe executive background texture",
          "Embossed corporate seal watermark",
          "Platinum card framing",
          "Formal boardroom decision rows"
      ],
      "layoutArchitecture": "Executive summary split-briefing card with platinum border bevels",
      "assignedPlaybookIds": [
          "ai-businesses-19"
      ],
      "assignedPlaybookSlugs": [
          "how-to-get-rich-for-service-based-businesses-thank-me-later"
      ]
  },

  // Synthetic Media Timeline Canvas
  "synthetic-media-timeline": {
      "templateId": "synthetic-media-timeline",
      "name": "Synthetic Media Timeline Canvas",
      "categoryTheme": "AI Content Creation & Generative Video",
      "description": "Futuristic dark slate-blue canvas (#080f1e) with holographic cyan (#06b6d4) and electric azure (#3b82f6) tracks, NLE video timeline scrubber lines, and render status badges.",
      "colorPalette": {
          "canvasBg": "#080f1e",
          "stageBg": "linear-gradient(155deg, #0d1a33, #070e1c)",
          "border": "rgba(6, 182, 212, 0.35)",
          "primaryText": "#f0f9ff",
          "secondaryText": "#7dd3fc",
          "accent": "#06b6d4",
          "accentSecondary": "#3b82f6",
          "highlightPillBg": "#083344",
          "highlightPillText": "#67e8f9"
      },
      "visualMotifs": [
          "Multi-track video timeline ruler",
          "Holographic keyframe diamonds",
          "AI generation status pill",
          "Audio waveform decibel meters"
      ],
      "layoutArchitecture": "Non-linear editor layout with top scrubber bar and track stems",
      "assignedPlaybookIds": [
          "ai-businesses-20"
      ],
      "assignedPlaybookSlugs": [
          "the-new-way-of-making-content-in-the-age-of-ai"
      ]
  },

  // First-Principles Rationalist Blueprint
  "rationalist-logic-blueprint": {
      "templateId": "rationalist-logic-blueprint",
      "name": "First-Principles Rationalist Blueprint",
      "categoryTheme": "Logical Life Acceleration & Mindset",
      "description": "Engineering graph blueprint canvas (#06101e) with sharp technical cyan (#0284c7) grid lines, boolean logic circuit symbols, and mathematical proof structures.",
      "colorPalette": {
          "canvasBg": "#06101e",
          "stageBg": "linear-gradient(160deg, #0a1a30, #050d18)",
          "border": "rgba(56, 189, 248, 0.35)",
          "primaryText": "#f0f9ff",
          "secondaryText": "#93c5fd",
          "accent": "#38bdf8",
          "accentSecondary": "#0284c7",
          "highlightPillBg": "#0c2847",
          "highlightPillText": "#7dd3fc"
      },
      "visualMotifs": [
          "Mathematical graph paper grid",
          "Boolean proposition logic gates",
          "Vector coordinate crosshairs",
          "Q.E.D. mathematical proof markers"
      ],
      "layoutArchitecture": "Technical blueprint schematic with coordinate axes and formal logic proofs",
      "assignedPlaybookIds": [
          "ai-businesses-21"
      ],
      "assignedPlaybookSlugs": [
          "how-to-catch-up-in-life-using-logic"
      ]
  },

  // The Pentagon Monopoly Canvas
  "monopoly-pentagon-bronze": {
      "templateId": "monopoly-pentagon-bronze",
      "name": "The Pentagon Monopoly Canvas",
      "categoryTheme": "Business Architecture & Economics",
      "description": "Rich dark espresso canvas (#130e09) with warm burnished bronze (#d97706) and deep amber (#b45309) accents, 5-pillar classical architrave card, and monopoly seal emblems.",
      "colorPalette": {
          "canvasBg": "#130e09",
          "stageBg": "linear-gradient(150deg, #1f160e, #100b07)",
          "border": "rgba(217, 119, 6, 0.35)",
          "primaryText": "#fffbeb",
          "secondaryText": "#fde68a",
          "accent": "#d97706",
          "accentSecondary": "#b45309",
          "highlightPillBg": "#451a03",
          "highlightPillText": "#fbbf24"
      },
      "visualMotifs": [
          "Pentagonal geometric geometry",
          "Burnished bronze coin embossing",
          "Architectural column pillars",
          "Monopoly fortress watermarks"
      ],
      "layoutArchitecture": "Five-pillar balance framework with centered economic citadel card",
      "assignedPlaybookIds": [
          "ai-businesses-22"
      ],
      "assignedPlaybookSlugs": [
          "what-makes-the-perfect-business-5-things"
      ]
  },

  // 2026 Enterprise AI Operating System
  "cyber-enterprise-os-2026": {
      "templateId": "cyber-enterprise-os-2026",
      "name": "2026 Enterprise AI Operating System",
      "categoryTheme": "Corporate AI Strategy & Automation",
      "description": "Executive command bridge canvas (#030914) with electric sapphire (#2563eb) and modern teal (#14b8a6) telemetry cards, live AI worker heartbeat indicators, and real-time enterprise metrics.",
      "colorPalette": {
          "canvasBg": "#030914",
          "stageBg": "linear-gradient(150deg, #08162e, #030a17)",
          "border": "rgba(37, 99, 235, 0.38)",
          "primaryText": "#f8fafc",
          "secondaryText": "#94a3b8",
          "accent": "#2563eb",
          "accentSecondary": "#14b8a6",
          "highlightPillBg": "#1e3a8a",
          "highlightPillText": "#60a5fa"
      },
      "visualMotifs": [
          "Enterprise cloud telemetry dashboard",
          "Pulsing autonomous worker nodes",
          "Sapphire blue glass panels",
          "High-uptime SLA system badge"
      ],
      "layoutArchitecture": "Executive mission-control layout with system uptime and API telemetry",
      "assignedPlaybookIds": [
          "ai-businesses-23"
      ],
      "assignedPlaybookSlugs": [
          "how-to-use-ai-in-your-business-in-2026"
      ]
  },

  // Polymath DaVinci Atelier
  "polymath-atelier-sepia": {
      "templateId": "polymath-atelier-sepia",
      "name": "Polymath DaVinci Atelier",
      "categoryTheme": "Multi-Disciplinary One-Person Business",
      "description": "Rich artisanal warm sepia canvas (#120e0b) with antique copper (#ea580c) and burnished brass (#ca8a04) accents, Renaissance sketchbook compass lines, and multifaceted geometric panels.",
      "colorPalette": {
          "canvasBg": "#120e0b",
          "stageBg": "linear-gradient(150deg, #1c1511, #0f0b09)",
          "border": "rgba(234, 88, 12, 0.35)",
          "primaryText": "#fef7ee",
          "secondaryText": "#fed7aa",
          "accent": "#ea580c",
          "accentSecondary": "#ca8a04",
          "highlightPillBg": "#431407",
          "highlightPillText": "#fdba74"
      },
      "visualMotifs": [
          "Renaissance compass and golden ratio curves",
          "Antique copper ink wash",
          "Polymath constellation diagrams",
          "Handcrafted wax seal emblem"
      ],
      "layoutArchitecture": "Multi-disciplinary master studio layout with interdisciplinary nodes",
      "assignedPlaybookIds": [
          "ai-businesses-24"
      ],
      "assignedPlaybookSlugs": [
          "if-you-have-multiple-interests-please-start-a-one-person-business"
      ]
  },


  // 25. Playbook 25: Learn This Skill If You Want To Win In The Next 2-3 Years
  "meta-skill-architect-emerald": {
    templateId: "meta-skill-architect-emerald",
    name: "Meta-Skill Evolution Matrix",
    categoryTheme: "Meta-Learning & High-Agency Synthesis",
    description:
      "Deep emerald noir canvas (#06100a) with precision drafting borders (#1d442b), vibrant emerald (#10b981) highlights, and meta-skill progression nodes.",
    colorPalette: {
      canvasBg: "#06100a",
      stageBg: "linear-gradient(160deg, #0c1d13, #09170e, #06100a)",
      border: "#1d442b",
      primaryText: "#f0fdf4",
      secondaryText: "#86efac",
      accent: "#10b981",
      accentSecondary: "#34d399",
      highlightPillBg: "#062817",
      highlightPillText: "#34d399",
    },
    visualMotifs: [
      "Meta-skill hierarchy progression ladder",
      "Emerald synthesis network nodes",
      "High-agency decision vectors",
    ],
    layoutArchitecture: "Single centered card stage with meta-skill progression bar",
    assignedPlaybookIds: ["ai-businesses-25"],
    assignedPlaybookSlugs: ["learn-this-skill-if-you-want-to-win-in-the-next-2-3-years"],
  },

  // 26. Playbook 26: How To Build A $1M One-Person Business Faster With AI
  "solo-million-speedrun": {
    templateId: "solo-million-speedrun",
    name: "One-Person $1M Velocity Engine",
    categoryTheme: "One-Person Enterprise & Speed of Execution",
    description:
      "Graphite tarmac (#0a0b0e) with sky blue (#38bdf8) and indigo (#818cf8) telemetry accents, automated agent pipeline flowcharts, and rapid monetization badges.",
    colorPalette: {
      canvasBg: "#0a0b0e",
      stageBg: "linear-gradient(155deg, #13161c, #0e1117, #0a0b0e)",
      border: "#2a3242",
      primaryText: "#f8fafc",
      secondaryText: "#94a3b8",
      accent: "#38bdf8",
      accentSecondary: "#818cf8",
      highlightPillBg: "#0c2638",
      highlightPillText: "#38bdf8",
    },
    visualMotifs: [
      "1M velocity speedometer gauge",
      "Solo founder agent swarm telemetry",
      "Zero-overhead digital asset flow",
    ],
    layoutArchitecture: "High-velocity dashboard canvas with dual-tier telemetry header",
    assignedPlaybookIds: ["ai-businesses-26"],
    assignedPlaybookSlugs: ["how-to-build-a-1m-one-person-business-faster-with-ai"],
  },

  // 27. Playbook 27: How To Think Like A Strategic Genius (5-Dimensional Thinking)
  "hyper-dimensional-strategy": {
    templateId: "hyper-dimensional-strategy",
    name: "5-Dimensional Strategic Genius Prism",
    categoryTheme: "Cognitive Mastery & Multi-Order Systems",
    description:
      "Deep cosmic void canvas (#070512) with cosmic violet (#a855f7) accents, 4-quadrant integral matrix wireframes, and 5-dimensional strategic game-theory seals.",
    colorPalette: {
      canvasBg: "#070512",
      stageBg: "linear-gradient(160deg, #110b24, #0c081b, #070512)",
      border: "#2c1e54",
      primaryText: "#faf5ff",
      secondaryText: "#d8b4fe",
      accent: "#a855f7",
      accentSecondary: "#c084fc",
      highlightPillBg: "#251242",
      highlightPillText: "#c084fc",
    },
    visualMotifs: [
      "4-quadrant integral Wilber matrix",
      "5-dimensional strategic lens prism",
      "First-principles causal chain nodes",
    ],
    layoutArchitecture: "Hyper-dimensional strategic stage with integral quadrant overlay",
    assignedPlaybookIds: ["ai-businesses-27"],
    assignedPlaybookSlugs: ["how-to-think-like-a-strategic-genius-5-dimensional-thinking"],
  },

  // 28. Playbook 28: How To Use AI Better Than 99% Of People (This Changed My Life)
  "top-one-percent-ai-operator": {
    templateId: "top-one-percent-ai-operator",
    name: "Top 1% AI Synthesizer Studio",
    categoryTheme: "Superhuman Prompt Architecture & Context Steering",
    description:
      "Electric cyan dark canvas (#030c12) with laser cyan (#06b6d4) glows, deep prompt bracket syntax, and master cognitive extraction telemetry.",
    colorPalette: {
      canvasBg: "#030c12",
      stageBg: "linear-gradient(155deg, #081822, #05121b, #030c12)",
      border: "#15384d",
      primaryText: "#ecfeff",
      secondaryText: "#67e8f9",
      accent: "#06b6d4",
      accentSecondary: "#22d3ee",
      highlightPillBg: "#072b38",
      highlightPillText: "#22d3ee",
    },
    visualMotifs: [
      "Top 1% operator benchmark tag",
      "Recursive cognitive prompting brackets",
      "Context extraction matrix grid",
    ],
    layoutArchitecture: "Synthesizer studio stage with context bracket headers",
    assignedPlaybookIds: ["ai-businesses-28"],
    assignedPlaybookSlugs: ["how-to-use-ai-better-than-99-of-people-this-changed-my-life"],
  },

  // 29. Playbook 29: You're Stuck In The Matrix, Here's How You Escape
  "matrix-escape-velocity-matrix": {
    templateId: "matrix-escape-velocity-matrix",
    name: "Matrix Extraction Terminal",
    categoryTheme: "Cybernetic Sovereignty & Mental Emancipation",
    description:
      "Terminal phosphor green on black (#030804) with CRT digital rain motif, cybernetic guidance system gauges, and sovereign exit trajectory vectors.",
    colorPalette: {
      canvasBg: "#030804",
      stageBg: "linear-gradient(165deg, #07150a, #050f07, #030804)",
      border: "#13381a",
      primaryText: "#f0fdf4",
      secondaryText: "#86efac",
      accent: "#22c55e",
      accentSecondary: "#4ade80",
      highlightPillBg: "#07260e",
      highlightPillText: "#4ade80",
    },
    visualMotifs: [
      "Cybernetic guidance aperture",
      "Matrix extraction command bar",
      "Identity script rewrite terminal",
    ],
    layoutArchitecture: "Extraction terminal HUD with phosphor telemetry accents",
    assignedPlaybookIds: ["ai-businesses-29"],
    assignedPlaybookSlugs: ["youre-stuck-in-the-matrix-heres-how-you-escape"],
  },

  // 30. Playbook 30: You Have 5 Years to Get Rich Before AI Takes Over
  "five-year-window-countdown": {
    templateId: "five-year-window-countdown",
    name: "5-Year Horizon Countdown Deck",
    categoryTheme: "Economic Disruption & Urgent Capital Moats",
    description:
      "Molten ember obsidian (#0e0705) with intense warning orange (#f97316) telemetry, 5-year timeline countdown ticker, and hard-asset fortress allocation badges.",
    colorPalette: {
      canvasBg: "#0e0705",
      stageBg: "linear-gradient(160deg, #1c0e0a, #140907, #0e0705)",
      border: "#441e15",
      primaryText: "#fff7ed",
      secondaryText: "#fdba74",
      accent: "#f97316",
      accentSecondary: "#fb923c",
      highlightPillBg: "#381409",
      highlightPillText: "#fb923c",
    },
    visualMotifs: [
      "5-Year urgency countdown clock",
      "Asymmetric capital barbell badges",
      "Labor displacement risk gauge",
    ],
    layoutArchitecture: "Horizon countdown stage with urgent timeline telemetry",
    assignedPlaybookIds: ["ai-businesses-30"],
    assignedPlaybookSlugs: ["you-have-5-years-to-get-rich-before-ai-takes-over"],
  },

  // 31. Playbook 31: Investing For Beginners in 25 Minutes
  "twenty-five-min-wealth-primer": {
    templateId: "twenty-five-min-wealth-primer",
    name: "25-Minute Archival Wealth Primer",
    categoryTheme: "Index Compounding & Generational Asset Allocation",
    description:
      "Bullion institutional slate (#090d10) with teal compound interest curves (#14b8a6), 25-minute mastery timecode badges, and corporate reinvestment matrices.",
    colorPalette: {
      canvasBg: "#090d10",
      stageBg: "linear-gradient(150deg, #101920, #0c141a, #090d10)",
      border: "#1d3340",
      primaryText: "#f0fdfa",
      secondaryText: "#5eead4",
      accent: "#14b8a6",
      accentSecondary: "#2dd4bf",
      highlightPillBg: "#082824",
      highlightPillText: "#2dd4bf",
    },
    visualMotifs: [
      "25-Minute master timecode",
      "Exponential compound interest curves",
      "Corporate capital allocation flowchart",
    ],
    layoutArchitecture: "Archival wealth ledger stage with 25-min condensed headers",
    assignedPlaybookIds: ["ai-businesses-31"],
    assignedPlaybookSlugs: ["investing-for-beginners-in-25-minutes"],
  },

  // 32. Playbook 32: Laziest Ways to Make Money with AI (For Beginners)
  "passive-ai-flow-station": {
    templateId: "passive-ai-flow-station",
    name: "Zero-Friction AI Passive Flow Station",
    categoryTheme: "Turnkey AI Micro-Enterprises & Automated Cash Flow",
    description:
      "Royal lavender obsidian (#0a0712) with bright lavender (#c084fc) and fuchsia (#e879f9) accents, automated digital storefront diagrams, and zero-inventory passivity tags.",
    colorPalette: {
      canvasBg: "#0a0712",
      stageBg: "linear-gradient(160deg, #150e26, #0e091b, #0a0712)",
      border: "#331f54",
      primaryText: "#faf5ff",
      secondaryText: "#e9d5ff",
      accent: "#c084fc",
      accentSecondary: "#e879f9",
      highlightPillBg: "#291040",
      highlightPillText: "#e879f9",
    },
    visualMotifs: [
      "Passive revenue automation stream",
      "Zero-friction inventory indicator",
      "Turnkey digital asset blueprint",
    ],
    layoutArchitecture: "Passive cash flow station with automated pipeline markers",
    assignedPlaybookIds: ["ai-businesses-32"],
    assignedPlaybookSlugs: ["laziest-ways-to-make-money-with-ai-for-beginners"],
  },
};

/**
 * Register or update a slide template
 */
export function registerTemplate(definition: SlideTemplateDefinition): void {
  // Check for duplicate templateId
  if (SLIDE_TEMPLATES[definition.templateId] && SLIDE_TEMPLATES[definition.templateId] !== definition) {
    throw new Error(`Template with id '${definition.templateId}' already exists.`);
  }

  // Verify no playbook id is assigned to another template
  for (const [existingId, tmpl] of Object.entries(SLIDE_TEMPLATES)) {
    if (existingId !== definition.templateId) {
      for (const pId of definition.assignedPlaybookIds) {
        if (tmpl.assignedPlaybookIds.includes(pId)) {
          throw new Error(
            `Playbook ID '${pId}' is already assigned to template '${existingId}'. Unique PPT template rule violated!`
          );
        }
      }
      for (const slug of definition.assignedPlaybookSlugs) {
        if (tmpl.assignedPlaybookSlugs.includes(slug)) {
          throw new Error(
            `Playbook slug '${slug}' is already assigned to template '${existingId}'. Unique PPT template rule violated!`
          );
        }
      }
    }
  }

  SLIDE_TEMPLATES[definition.templateId] = definition;
}

/**
 * Retrieve the unique slide template assigned to a given Playbook slug or ID
 */
export function getTemplateForPlaybook(playbookSlugOrId: string): SlideTemplateDefinition {
  const normalized = playbookSlugOrId.trim().toLowerCase();

  for (const template of Object.values(SLIDE_TEMPLATES)) {
    if (
      template.assignedPlaybookSlugs.map((s) => s.toLowerCase()).includes(normalized) ||
      template.assignedPlaybookIds.map((id) => id.toLowerCase()).includes(normalized)
    ) {
      return template;
    }
  }

  // Fallback to reference blueprint if not explicitly assigned
  return SLIDE_TEMPLATES["blueprint-light-canvas"];
}

/**
 * Programmatic verification helper to ensure catalog-wide uniqueness
 */
export function verifyTemplateUniqueness(): {
  valid: boolean;
  totalTemplates: number;
  assignedPlaybooksCount: number;
  collisions: string[];
} {
  const seenIds = new Map<string, string>();
  const seenSlugs = new Map<string, string>();
  const collisions: string[] = [];

  for (const [templateId, def] of Object.entries(SLIDE_TEMPLATES)) {
    for (const pId of def.assignedPlaybookIds) {
      if (seenIds.has(pId)) {
        collisions.push(
          `Collision on Playbook ID '${pId}': assigned to both '${seenIds.get(pId)}' and '${templateId}'`
        );
      } else {
        seenIds.set(pId, templateId);
      }
    }

    for (const slug of def.assignedPlaybookSlugs) {
      if (seenSlugs.has(slug)) {
        collisions.push(
          `Collision on Playbook Slug '${slug}': assigned to both '${seenSlugs.get(slug)}' and '${templateId}'`
        );
      } else {
        seenSlugs.set(slug, templateId);
      }
    }
  }

  return {
    valid: collisions.length === 0,
    totalTemplates: Object.keys(SLIDE_TEMPLATES).length,
    assignedPlaybooksCount: seenIds.size,
    collisions,
  };
}
