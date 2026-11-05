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
  // 1. Reference Blueprint Template (7 AI Automation Tools / These 3 AI)
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
  "pinterest-canva-sovereign-indian-creator": {
    templateId: "pinterest-canva-sovereign-indian-creator",
    name: "Indian Sovereign Digital Creator Suite",
    categoryTheme: "Digital Products & Zero-Ad Funnels",
    description:
      "Warm spiced masala & terracotta stage (#18110e) with deep amber border (#3a2518), saffron gold accents (#f59e0b), emerald peacock highlight (#10b981), and warm cream typography.",
    colorPalette: {
      canvasBg: "#120c09",
      stageBg: "#1a120e",
      border: "#3a2518",
      primaryText: "#fef3c7",
      secondaryText: "#d97706",
      accent: "#f59e0b",
      accentSecondary: "#10b981",
      highlightPillBg: "#2d1b0f",
      highlightPillText: "#fbbf24",
    },
    visualMotifs: [
      "Zero-ad Pinterest organic traffic funnel",
      "Free-to-paid digital download conversion bridge",
      "Sovereign Indian payment gateway node",
      "Canva printable asset generator matrix",
    ],
    layoutArchitecture: "Spiced terracotta creator desk with dual funnel telemetry and Pinterest distribution rail",
    assignedPlaybookIds: ["ai-businesses-61"],
    assignedPlaybookSlugs: ["i-tried-a-100-free-ai-side-hustle-for-indians-real-results"],
  },
  "code-framework-hypergrowth-ai-startup": {
    templateId: "code-framework-hypergrowth-ai-startup",
    name: "Hypergrowth CODE Framework Terminal Canvas",
    categoryTheme: "High-Growth AI Startups & GTM Architecture",
    description:
      "Deep obsidian stage (#0b0f19) with electric cyan borders (#0284c7), cobalt blue accents (#2563eb), crisp mint status badges (#10b981), and refined institutional typography.",
    colorPalette: {
      canvasBg: "#070a12",
      stageBg: "#0b0f19",
      border: "#1e293b",
      primaryText: "#f8fafc",
      secondaryText: "#94a3b8",
      accent: "#38bdf8",
      accentSecondary: "#10b981",
      highlightPillBg: "#0f172a",
      highlightPillText: "#38bdf8",
    },
    visualMotifs: [
      "CODE framework telemetry grid",
      "Single-job MVP execution scalpel",
      "AEO prompt visibility scanner",
      "Diagnostic GTM outreach pipeline",
    ],
    layoutArchitecture: "Obsidian command station with dual ARR telemetry rail and diagnostic audit viewport",
    assignedPlaybookIds: ["ai-businesses-62"],
    assignedPlaybookSlugs: ["i-built-an-85m-ai-startup-in-5-months-heres-my-playbook"],
  },
  "halo-direct-response-persuasion-matrix": {
    templateId: "halo-direct-response-persuasion-matrix",
    name: "Direct-Response HALO Persuasion Matrix",
    categoryTheme: "Direct-Response Advertising & Copywriting Systems",
    description:
      "Deep midnight indigo stage (#111029) with electric violet border (#4338ca), vibrant iris accents (#6366f1), golden amber highlight badge (#f59e0b), and warm crisp typography.",
    colorPalette: {
      canvasBg: "#0a0918",
      stageBg: "#111029",
      border: "#282352",
      primaryText: "#f5f3ff",
      secondaryText: "#a5b4fc",
      accent: "#6366f1",
      accentSecondary: "#f59e0b",
      highlightPillBg: "#1e1b4b",
      highlightPillText: "#c7d2fe",
    },
    visualMotifs: [
      "HALO emotional driver quadrants (Pains, Fears, Hopes, Dreams)",
      "AIDA conversion funnel telemetry",
      "17-step sales letter architecture rail",
      "Empirical creative split-test matrix",
    ],
    layoutArchitecture: "Midnight indigo direct-response desk with dual HALO psychology telemetry and AIDA acquisition pipeline",
    assignedPlaybookIds: ["ai-businesses-63"],
    assignedPlaybookSlugs: ["give-me-27-minutes-and-ill-make-you-disgustingly-good-at-digital-marketing"],
  },
  "monk-mode-asymmetric-ambition-ledger": {
    templateId: "monk-mode-asymmetric-ambition-ledger",
    name: "Monk-Mode Asymmetric Ambition Ledger",
    categoryTheme: "Career Architecture & Sovereign Mastery",
    description:
      "Dark slate and carbon stage (#121316) with crimson ruby borders (#e11d48), warm ivory primary typography (#f4f4f5), muted ash secondary (#a1a1aa), and focused monastic minimalism.",
    colorPalette: {
      canvasBg: "#090a0c",
      stageBg: "#121316",
      border: "#27272a",
      primaryText: "#f4f4f5",
      secondaryText: "#a1a1aa",
      accent: "#e11d48",
      accentSecondary: "#fb7185",
      highlightPillBg: "#271219",
      highlightPillText: "#fb7185",
    },
    visualMotifs: [
      "Asymmetric risk-reward balance quadrant",
      "Monastic 90-day primary game rail",
      "Ignorance debt amortization matrix",
      "Competence ladder progression telemetry",
    ],
    layoutArchitecture: "Monastic carbon workstation with asymmetric risk quadrant rail and 90-day execution telemetry",
    assignedPlaybookIds: ["ai-businesses-64"],
    assignedPlaybookSlugs: ["if-youre-ambitious-and-in-your-20s-or-30s-please-watch-this"],
  },
  "traffic-partner-attribution-ledger": {
    templateId: "traffic-partner-attribution-ledger",
    name: "Traffic Partner Attribution Ledger",
    categoryTheme: "Creator Traffic Architecture & Incremental Attribution Systems",
    description:
      "Sleek deep obsidian and graphite stage (#0d131a) with crisp traffic cyan (#0ea5e9) borders, neon mint (#10b981) conversion metrics, luminous ice primary text (#f0f9ff), and a disciplined dual-ledger attribution rail.",
    colorPalette: {
      canvasBg: "#070b0f",
      stageBg: "#0d131a",
      border: "#1e293b",
      primaryText: "#f0f9ff",
      secondaryText: "#94a3b8",
      accent: "#0ea5e9",
      accentSecondary: "#10b981",
      highlightPillBg: "#082f49",
      highlightPillText: "#38bdf8",
    },
    visualMotifs: [
      "Verifiable UTM attribution stream and click-to-subscriber conversion funnel",
      "Traffic OS nine-system modular architecture panel",
      "Incremental revenue baseline reconciliation ledger",
      "Zero-employee 14-hour capacity allocation matrix",
    ],
    layoutArchitecture: "Deep obsidian traffic terminal with multi-platform syndication telemetry and verified attribution ledger",
    assignedPlaybookIds: ["ai-businesses-65"],
    assignedPlaybookSlugs: ["this-ai-business-will-make-you-10k-month-with-zero-employees"],
  },
  "marketplace-arbitrage-earth-canvas": {
    templateId: "marketplace-arbitrage-earth-canvas",
    name: "Boho Earth Marketplace Arbitrage Canvas",
    categoryTheme: "Marketplace Arbitrage & Commerce Curation Systems",
    description:
      "Warm organic clay and linen stage (#171614) with golden amber (#d97706) borders, terracotta (#c2410c) metric badges, bone ivory typography (#fafaf9), muted taupe secondary (#a8a29e), and a dedicated in-bag intent telemetry rail.",
    colorPalette: {
      canvasBg: "#0e0d0b",
      stageBg: "#171614",
      border: "#292524",
      primaryText: "#fafaf9",
      secondaryText: "#a8a29e",
      accent: "#d97706",
      accentSecondary: "#c2410c",
      highlightPillBg: "#2d1b0d",
      highlightPillText: "#fbbf24",
    },
    visualMotifs: [
      "Active in-bag addition intent telemetry and offer velocity stream",
      "AliExpress unit margin calculator and net contribution breakdown rail",
      "Flat-lay lifestyle photography framing guide and prompt architecture",
      "60-minute time-boxed daily operator routine matrix",
    ],
    layoutArchitecture: "Warm earthy boutique atelier workstation with real-time in-bag demand telemetry and contribution cashflow ledger",
    assignedPlaybookIds: ["ai-businesses-66"],
    assignedPlaybookSlugs: ["its-boring-but-i-make-51-day-in-1-hour-at-22"],
  },
  "claude-chatgpt-faceless-shorts-studio": {
    templateId: "claude-chatgpt-faceless-shorts-studio",
    name: "Claude & ChatGPT Faceless Shorts Studio",
    categoryTheme: "Faceless YouTube Shorts Studio & AI Video Engineering",
    description:
      "A cinematic vertical production studio combining competitor intelligence telemetry, AI scriptwriting prompts, scene-by-scene storyboard breakdowns, and YouTube retention telemetry.",
    colorPalette: {
      canvasBg: "#0f172a",
      stageBg: "#090d16",
      border: "#1e293b",
      primaryText: "#f8fafc",
      secondaryText: "#94a3b8",
      accent: "#6366f1",
      accentSecondary: "#f59e0b",
      highlightPillBg: "#1e1b4b",
      highlightPillText: "#a5b4fc",
    },
    visualMotifs: [
      "Vertical 9:16 Shorts timeline framing and audio waveform telemetry",
      "Claude competitor extraction & prompt engineering terminal",
      "Scene-by-scene visual production matrix with stock & AI prompt indicators",
      "YouTube Shorts retention curve & RPM economics dashboard",
    ],
    layoutArchitecture: "High-contrast dark-mode vertical studio with prompt terminal inspectors and multi-track video assembly tracks",
    assignedPlaybookIds: ["ai-businesses-67"],
    assignedPlaybookSlugs: ["claude-chatgpt-57152-in-90-days"],
  },
  "autonomous-marketing-agent-command-center": {
    templateId: "autonomous-marketing-agent-command-center",
    name: "Autonomous Marketing Agent Command Center",
    categoryTheme: "Autonomous Growth Engines & Performance Marketing Telemetry",
    description:
      "A dark cyberpunk cyber-command telemetry workstation with real-time ad performance dials, multi-touch attribution DAG graphs, automated vision QC terminal, and bounded spend governor rails.",
    colorPalette: {
      canvasBg: "#050d1a",
      stageBg: "#0b172a",
      border: "#162a45",
      primaryText: "#f0f9ff",
      secondaryText: "#7dd3fc",
      accent: "#06b6d4",
      accentSecondary: "#10b981",
      highlightPillBg: "#083344",
      highlightPillText: "#67e8f9",
    },
    visualMotifs: [
      "Real-time ClickHouse attribution query terminal and event stream",
      "Automated multi-modal vision quality control pass/fail inspector",
      "10-ads-per-day testing pipeline board with winners pool elevator rail",
      "Bounded autonomy budget governor and emergency kill-switch monitor",
    ],
    layoutArchitecture: "High-contrast technical cockpit with multi-column data streaming terminals and live spend allocation controls",
    assignedPlaybookIds: ["ai-businesses-68"],
    assignedPlaybookSlugs: ["marketing-agents-are-too-good-now"],
  },
  "ecom-profit-telemetry-engine": {
    templateId: "ecom-profit-telemetry-engine",
    name: "E-Commerce Profit & ROAS Telemetry Engine",
    categoryTheme: "E-Commerce Arbitrage & Rapid Store Testing Systems",
    description:
      "A high-precision e-commerce operator dashboard with real-time break-even CPA gauges, 24-hour sprint milestone trackers, AI-UGC creative testing matrices, and payment gateway float reserves.",
    colorPalette: {
      canvasBg: "#09111e",
      stageBg: "#0f1d32",
      border: "#1e3556",
      primaryText: "#f8fafc",
      secondaryText: "#94a3b8",
      accent: "#10b981",
      accentSecondary: "#38bdf8",
      highlightPillBg: "#064e3b",
      highlightPillText: "#6ee7b7",
    },
    visualMotifs: [
      "Order-level contribution margin and break-even CPA gauge dial",
      "24-hour launch milestone progress tracker and pre-flight stop-loss rail",
      "Modular 30-second AI-UGC creative script architecture matrix",
      "Meta CBO campaign telemetry with 3-way Stop/Iterate/Scale decision rules",
    ],
    layoutArchitecture: "Dark nautical cockpit workstation with multi-panel unit economics calculators and live campaign telemetry dials",
    assignedPlaybookIds: ["ai-businesses-69"],
    assignedPlaybookSlugs: ["zero-to-1000-profit-with-dropshipping-using-ai-24hours"],
  },
  "agency-founder-command-engine": {
    templateId: "agency-founder-command-engine",
    name: "Agency Founder & Retainer Operations Engine",
    categoryTheme: "Agency Scaling & Service Business Architecture",
    description: "A high-contrast editorial and operational command dashboard with retainer unit economics gauges, specialized-to-generalized capability matrix, client delivery tracker, and capacity planning rails.",
    colorPalette: {
      canvasBg: "#14120e",
      stageBg: "#1c1915",
      border: "#2e2924",
      primaryText: "#fafaf9",
      secondaryText: "#a8a29e",
      accent: "#f59e0b",
      accentSecondary: "#ea580c",
      highlightPillBg: "#291b0d",
      highlightPillText: "#fcd34d",
    },
    visualMotifs: [
      "Retainer financial progression table and gross margin gauge",
      "Specialized-to-generalized team pod structure and capability matrix",
      "High-rigor 24-hour client outreach sprint tracker and discovery script protocol",
      "Capacity utilization planner with strict client concentration risk guardrails",
    ],
    layoutArchitecture: "Operational executive studio dashboard with retainer progression ledgers, team pod structural maps, and risk telemetry rails",
    assignedPlaybookIds: ["ai-businesses-70"],
    assignedPlaybookSlugs: ["how-i-build-a-10cr-agency-without-any-knowledge"],
  },
  "service-launchpad-engine": {
    templateId: "service-launchpad-engine",
    name: "Service Launchpad & Proof Command Engine",
    categoryTheme: "Zero-Capital Service Launchpad & Proof Architecture",
    description: "A high-clarity bronze and deep obsidian operational command workstation featuring the Rule of 300 prospecting grid, pilot commitment agreement matrix, reusable delivery asset pipeline, and continuation retainer economics.",
    colorPalette: {
      canvasBg: "#121110",
      stageBg: "#1a1816",
      border: "#2b2622",
      primaryText: "#fafaf9",
      secondaryText: "#a8a29e",
      accent: "#f59e0b",
      accentSecondary: "#d97706",
      highlightPillBg: "#291b0d",
      highlightPillText: "#fcd34d",
    },
    visualMotifs: [
      "Rule of 300 attention prospecting sequence and signal mining flow",
      "High-commitment pilot architecture and permissioned proof indexing matrix",
      "Productised delivery spreadsheet calculator and onboarding SOP rail",
      "Ascension continuation retainer model with 60-day graduation review checkpoints",
    ],
    layoutArchitecture: "Operational executive studio dashboard with prospecting pipeline telemetry, pilot milestone maps, and recurring unit economics rails",
    assignedPlaybookIds: ["ai-businesses-71"],
    assignedPlaybookSlugs: ["if-i-had-to-start-a-business-from-scratch-id-do-this"],
  },
  "hardware-bootstrap-matrix": {
    templateId: "hardware-bootstrap-matrix",
    name: "Hardware Bootstrap & Product Architecture Matrix",
    categoryTheme: "Physical Product Bootstrap & Hardware Architecture",
    description: "A dark industrial command workstation featuring the two-pillar bootstrapability and marketability evaluation dials, profit density footprint meters, bill-of-materials unit economics models, and transparent smoke test rails.",
    colorPalette: {
      canvasBg: "#0f1115",
      stageBg: "#171a21",
      border: "#282d38",
      primaryText: "#f1f5f9",
      secondaryText: "#94a3b8",
      accent: "#f59e0b",
      accentSecondary: "#06b6d4",
      highlightPillBg: "#291b0d",
      highlightPillText: "#fcd34d",
    },
    visualMotifs: [
      "Two-pillar bootstrapability and marketability decision matrix",
      "Profit density and physical footprint volumetric calculator",
      "Double Diamond problem-solution divergence and SCAMPER mutation rail",
      "Honest pre-launch landing page smoke test and waitlist telemetry",
    ],
    layoutArchitecture: "Hardware engineering and prototyping lab console with bill of materials ledgers, volumetric footprint gauges, and validation telemetry",
    assignedPlaybookIds: ["ai-businesses-72"],
    assignedPlaybookSlugs: ["bro-im-begging-you-to-build-this-4-8m-product-idea"],
  },
  "ecommerce-scale-engine": {
    templateId: "ecommerce-scale-engine",
    name: "E-Commerce Scale & Inventory Governance Engine",
    categoryTheme: "E-Commerce Scaling & Inventory Governance Architecture",
    description: "A high-precision dark navy and emerald operational control deck featuring dynamic reorder point calculators, ABC inventory classification ledgers, 13-week cash conversion gauges, and product flywheel expansion maps.",
    colorPalette: {
      canvasBg: "#0a0e17",
      stageBg: "#111827",
      border: "#1f293d",
      primaryText: "#f9fafb",
      secondaryText: "#9ca3af",
      accent: "#10b981",
      accentSecondary: "#f59e0b",
      highlightPillBg: "#064e3b",
      highlightPillText: "#6ee7b7",
    },
    visualMotifs: [
      "Dynamic reorder point formula and inventory lead-time timeline",
      "Order-level contribution margin and landed COGS breakdown rail",
      "Three-scenario demand forecasting ledger with working capital safety buffer",
      "Post-mortem failure analysis matrix for multi-brand sprawl prevention",
    ],
    layoutArchitecture: "Operational executive dashboard with inventory position gauges, cash conversion meters, and SKU-level contribution rails",
    assignedPlaybookIds: ["ai-businesses-73"],
    assignedPlaybookSlugs: ["if-i-had-1-year-to-make-10m-this-is-my-plan"],
  },

  // 47. Playbook: AI Agents: The Most Valuable Skill You Can Learn in 2027 (Full Course)
  "agentic-os-nexus": {
    templateId: "agentic-os-nexus",
    name: "Agentic OS Nexus & MCP Neural Console",
    categoryTheme: "Autonomous Agent Operating Systems & Context Architecture",
    description:
      "Deep obsidian cyber-grid (#08090d) with vibrant cyan (#06b6d4) and electric violet (#8b5cf6) accents, terminal-style observe-think-act HUD loop indicators, MCP protocol connector trees, and inspectable Markdown context ledgers.",
    colorPalette: {
      canvasBg: "#08090d",
      stageBg: "#0f131a",
      border: "#1e293b",
      primaryText: "#f8fafc",
      secondaryText: "#94a3b8",
      accent: "#06b6d4",
      accentSecondary: "#8b5cf6",
      highlightPillBg: "#083344",
      highlightPillText: "#38bdf8",
    },
    visualMotifs: [
      "Observe-Think-Act cyclic telemetry loop with deterministic stop conditions",
      "Model Context Protocol (MCP) server-client interface diagrams with least-privilege badges",
      "File-system context tree visualization (CLAUDE.md/AGENTS.md, context/, skills/, memory.md)",
      "Human-in-the-loop approval gate status cards with permission boundary toggles",
    ],
    layoutArchitecture:
      "Terminal HUD system console featuring active loop telemetry, MCP connector status bars, and dual-pane context/skill inspection stages",
    assignedPlaybookIds: ["ai-businesses-74"],
    assignedPlaybookSlugs: ["ai-agents-the-most-valuable-skill-you-can-learn-in-2027-full-course"],
  },

  // 48. Playbook: how to reinvent yourself in 90 days to become rich as f*ck
  "reinvention-matrix-obsidian": {
    templateId: "reinvention-matrix-obsidian",
    name: "Reinvention Matrix & Identity Crucible",
    categoryTheme: "Radical Personal Reinvention & Behavioral Economics",
    description:
      "Deep matte carbon canvas (#090a0f) with high-voltage crimson (#ef4444) and molten gold (#f59e0b) accents, identity-belief hierarchy flowcharts, say-do ratio meters, and 90-day phased execution roadmaps.",
    colorPalette: {
      canvasBg: "#090a0f",
      stageBg: "#12131a",
      border: "#222330",
      primaryText: "#f8fafc",
      secondaryText: "#94a3b8",
      accent: "#ef4444",
      accentSecondary: "#f59e0b",
      highlightPillBg: "#450a0a",
      highlightPillText: "#fca5a5",
    },
    visualMotifs: [
      "Identity-Belief-Action-Outcome cascading hierarchy diagrams",
      "Say-Do ratio empirical tracking gauges and proof accumulation ledgers",
      "Stoic Sparring control boundary matrices (Controllable vs Uncontrollable)",
      "XP Farming learning-loop compression flowcharts with failure post-mortems",
    ],
    layoutArchitecture:
      "Executive mindset command console with active habit telemetry, risk-budget meters, and weekly deep-work pacing trackers",
    assignedPlaybookIds: ["ai-businesses-75"],
    assignedPlaybookSlugs: ["how-to-reinvent-yourself-in-90-days-to-become-rich-as-f-ck"],
  },

  // 49. Playbook: How I Built It: $400K/Month iOS App
  "ios-scale-telemetry": {
    templateId: "ios-scale-telemetry",
    name: "iOS Scale Telemetry & App Growth Engine",
    categoryTheme: "Mobile App Economics & Product Growth Telemetry",
    description:
      "Sleek Apple Silicon space gray canvas (#0b0d13) with vibrant iOS electric blue (#3b82f6) and neon violet (#8b5cf6) accents, App Store conversion funnels, power-user cohort retention grids, and subscription unit economics ledgers.",
    colorPalette: {
      canvasBg: "#0b0d13",
      stageBg: "#131622",
      border: "#1f2438",
      primaryText: "#f8fafc",
      secondaryText: "#94a3b8",
      accent: "#3b82f6",
      accentSecondary: "#8b5cf6",
      highlightPillBg: "#1e3a8a",
      highlightPillText: "#93c5fd",
    },
    visualMotifs: [
      "App Store acquisition-to-activation funnel telemetry",
      "Power-user cohort retention heatmap matrices (Day 1, Day 7, Day 30)",
      "Subscription economics ledger (ARPU, Blended CAC, LTV, Payback)",
      "Rapid onboarding A/B test sequence and screen-order flowcharts",
    ],
    layoutArchitecture:
      "Mobile product command center with interactive cohort heatmaps, paywall conversion meters, and live retention gauges",
    assignedPlaybookIds: ["ai-businesses-76"],
    assignedPlaybookSlugs: ["how-i-built-it-400k-month-ios-app"],
  },

  // 50. Playbook: The New Way to Make Money with AI at Night (Even If You Have a 9-5)
  "nocturnal-operator-console": {
    templateId: "nocturnal-operator-console",
    name: "Nocturnal Operator Console & Asynchronous Service Engine",
    categoryTheme: "Evening Side-Business Operations & Autonomous Service Dispatch",
    description:
      "Deep midnight obsidian canvas (#070b12) with radiant amber glow (#f59e0b) and cyber emerald (#10b981) highlights, 9-to-5 firewall schedule matrices, overnight AI research batch pipelines, prospect qualification scorecards, and client pilot delivery boards.",
    colorPalette: {
      canvasBg: "#070b12",
      stageBg: "#0f172a",
      border: "#1e293b",
      primaryText: "#f1f5f9",
      secondaryText: "#94a3b8",
      accent: "#f59e0b",
      accentSecondary: "#10b981",
      highlightPillBg: "#78350f",
      highlightPillText: "#fde68a",
    },
    visualMotifs: [
      "Evening 10-hour asynchronous operational time budget matrix",
      "4-filter business opportunity qualification radar (Speed, Simplicity, Demand, Schedule)",
      "Nightly batch research-to-client delivery pipeline flowcharts",
      "15-prospect qualification scorecard and outreach permission funnel",
    ],
    layoutArchitecture:
      "Nocturnal command terminal with asynchronous batch status indicators, lead qualification meters, and pilot deliverable trackers",
    assignedPlaybookIds: ["ai-businesses-77"],
    assignedPlaybookSlugs: ["the-new-way-to-make-money-with-ai-at-night-even-if-you-have-a-9-5"],
  },

  // 51. Playbook: How a Faceless Channel Made $12,804/Month With Claude
  "faceless-avatar-studio": {
    templateId: "faceless-avatar-studio",
    name: "Faceless Avatar Studio & Character Continuity Engine",
    categoryTheme: "AI Presenter Studio & Digital Product Production Pipeline",
    description:
      "Warm cinematic terracotta and sage canvas (#0a0d0c) with vintage amber gold (#d97706) and soft herb emerald (#059669) accents, character bible multi-angle matrices, visual continuity checklists, and digital product conversion funnels.",
    colorPalette: {
      canvasBg: "#0a0d0c",
      stageBg: "#121715",
      border: "#1e2622",
      primaryText: "#f3f4f3",
      secondaryText: "#94a39b",
      accent: "#d97706",
      accentSecondary: "#059669",
      highlightPillBg: "#78350f",
      highlightPillText: "#fef3c7",
    },
    visualMotifs: [
      "Multi-angle AI presenter character continuity sheets (front, 3/4, profile, close-up)",
      "Higgsfield MCP-to-Claude production shot list & scene flowcharts",
      "100,000-view digital product revenue conversion funnel diagrams",
      "Editorial safety & home-remedy boundary matrices",
    ],
    layoutArchitecture:
      "Virtual production control room with character trait continuity monitors, scene timeline rails, and product checkout conversion meters",
    assignedPlaybookIds: ["ai-businesses-78"],
    assignedPlaybookSlugs: [
      "how-a-faceless-channel-made-12-804-month-with-claude",
      "how-a-faceless-channel-made-12804-month-with-claude"
    ],
  },

  // 52. Playbook: I have too many digital product ideas (35+ to steal)
  "digital-product-forge": {
    templateId: "digital-product-forge",
    name: "Digital Product Forge & 35-Idea Validation Lab",
    categoryTheme: "Digital Product Portfolio Engineering & Demand Validation Framework",
    description:
      "Industrial titanium and copper blueprint canvas (#0c0e12) with electric cyan (#06b6d4) and radiant copper orange (#f97316) accents, 35-opportunity category radars, 10-point idea evaluation scorecards, demand validation funnels, and minimum credible offer architecture.",
    colorPalette: {
      canvasBg: "#0c0e12",
      stageBg: "#151921",
      border: "#222938",
      primaryText: "#f1f5f9",
      secondaryText: "#94a3b8",
      accent: "#06b6d4",
      accentSecondary: "#f97316",
      highlightPillBg: "#164e63",
      highlightPillText: "#cffafe",
    },
    visualMotifs: [
      "35-idea opportunity classification radar across 6 core product buckets",
      "10-point idea evaluation scorecard & customer interview decision matrix",
      "Minimum credible offer (MCO) validation funnel & pre-order intent tracker",
      "Done-with-you transformation ladder & 30-day execution sprint timeline",
    ],
    layoutArchitecture:
      "Product incubator workbench with interactive idea scorecards, buyer specificity radars, and pre-sale validation meters",
    assignedPlaybookIds: ["ai-businesses-79"],
    assignedPlaybookSlugs: ["i-have-too-many-digital-product-ideas-35-to-steal"],
  },

  // 53. Playbook: This ONE Book Has The Power to Change Your ENTIRE Life
  "cybernetic-mind-matrix": {
    templateId: "cybernetic-mind-matrix",
    name: "Cybernetic Self-Image Matrix & Neural Rehearsal Engine",
    categoryTheme: "Psycho-Cybernetics & Behavioral Operating System Architecture",
    description:
      "Deep cobalt and obsidian technical cybernetics canvas (#080c16) with radiant cyan laser (#00f2fe), electric indigo (#6366f1), and warm gold telemetry (#f59e0b) accents, cybernetic feedback guidance loops, self-image recalibration radar, mental rehearsal protocols, and 30-day behavioral tracking grids.",
    colorPalette: {
      canvasBg: "#080c16",
      stageBg: "#0f172a",
      border: "#1e293b",
      primaryText: "#f8fafc",
      secondaryText: "#94a3b8",
      accent: "#00f2fe",
      accentSecondary: "#6366f1",
      highlightPillBg: "#1e1b4b",
      highlightPillText: "#c7d2fe",
    },
    visualMotifs: [
      "Cybernetic feedback-loop steering diagrams (Destination -> Action -> Sensor -> Adjustment)",
      "Self-image vs external circumstance divergence radar",
      "5-minute process visualization timeline rail and stress-response protocols",
      "30-day self-trust behavioral ledger and limiting-belief experiment audit cards",
    ],
    layoutArchitecture:
      "Cognitive engineering console with interactive steering loop telemetry, belief-testing matrices, and daily habit execution meters",
    assignedPlaybookIds: ["ai-businesses-80"],
    assignedPlaybookSlugs: ["this-one-book-has-the-power-to-change-your-entire-life"],
  },

  // 54. Playbook: How I Went From $0 to $92K/Month at 19 (My Full Story)
  "high-velocity-operator-command": {
    templateId: "high-velocity-operator-command",
    name: "High-Velocity Operator Command & Agency Scaling Engine",
    categoryTheme: "Sales Architecture, Appointment Setting & Agency Unit Economics",
    description:
      "Deep navy and dark charcoal operations HUD (#090d14) with emerald green execution accents (#10b981), high-visibility amber alerts (#f59e0b), and slate metallic borders (#1f2937), featuring appointment-setting conversion pipelines, agency capacity load gauges, unit economics contribution ledgers, and 100-task operational rebuild protocols.",
    colorPalette: {
      canvasBg: "#090d14",
      stageBg: "#111827",
      border: "#1f2937",
      primaryText: "#f9fafb",
      secondaryText: "#9ca3af",
      accent: "#10b981",
      accentSecondary: "#f59e0b",
      highlightPillBg: "#064e3b",
      highlightPillText: "#a7f3d0",
    },
    visualMotifs: [
      "Outbound appointment-setting conversion funnel (Contacts -> Qualified DMs -> Booked Calls -> Shows -> Closes)",
      "Agency unit economics ledger (Client Retainers, Setter Commissions, Manager Overheads, Net Contribution Margin)",
      "Capacity constraint radar & team operational overhead stress-test cards",
      "The 100-Task business rebuild architecture and one-page operating system grid",
    ],
    layoutArchitecture:
      "Operational flight deck with multi-channel sales pipeline telemetry, staffing capacity monitors, and profit-margin stress testing ledgers",
    assignedPlaybookIds: ["ai-businesses-81"],
    assignedPlaybookSlugs: ["how-i-went-from-0-to-92k-month-at-19-my-full-story"],
  },

  // 55. Playbook: It's boring but i make $745/day in 4 hours at 22
  "ecommerce-ad-arbitrage-terminal": {
    templateId: "ecommerce-ad-arbitrage-terminal",
    name: "E-Commerce Ad Arbitrage & Daily Unit Economics Terminal",
    categoryTheme: "Lean Dropshipping, Meta Creative Testing & Multi-Unit Bundles",
    description:
      "Deep maritime obsidian and slate teal console (#070e17) with radiant cyan ad telemetry (#06b6d4), emerald net-profit metrics (#10b981), and steel-blue borders (#1a2c42), featuring competitor ad longevity radars, AI store brief synthesis pipelines, multi-unit bundle margin tables, and 4-hour daily operator workflow schedules.",
    colorPalette: {
      canvasBg: "#070e17",
      stageBg: "#0e1926",
      border: "#1a2c42",
      primaryText: "#f1f5f9",
      secondaryText: "#94a3b8",
      accent: "#06b6d4",
      accentSecondary: "#10b981",
      highlightPillBg: "#164e63",
      highlightPillText: "#a5f3fc",
    },
    visualMotifs: [
      "Competitor ad longevity signal radar (30+ day run-time filters, copy structure & creative hooks)",
      "Multi-tier bundle economics matrix (Single unit, Buy 2 Get 1, Buy 3 Get 2 with true contribution margin)",
      "Meta 3-desire CBO testing architecture (3 distinct angles, 3 ad sets, daily purchase telemetry)",
      "Daily 4-hour operator time allocation schedule & daily P&L net contribution waterfall",
    ],
    layoutArchitecture:
      "Direct-response commerce command console with real-time Meta campaign ROAS telemetry, bundle margin calculators, and supplier fulfilment audit scorecards",
    assignedPlaybookIds: ["ai-businesses-82"],
    assignedPlaybookSlugs: ["its-boring-but-i-make-745-day-in-4-hours-at-22"],
  },

  // 56. Playbook: How I Made $16,705.83 On Whop (as a low iq 21 year old)
  "performance-clipping-command-matrix": {
    templateId: "performance-clipping-command-matrix",
    name: "Performance Video Clipping & Multi-Platform Payout Matrix",
    categoryTheme: "Whop Video Clipping, Creator Campaigns & Short-Form Arbitrage",
    description:
      "Deep obsidian and high-contrast violet console (#0c0714) with electric ultraviolet accents (#8b5cf6), radiant fuchsia pacing meters (#d946ef), and neon lime payout telemetry (#84cc16), featuring Whop campaign scorecard matrices, AI timestamp discovery pipelines, hook-story-payoff narrative rails, and multi-channel YouTube/TikTok/Reels distribution ledgers.",
    colorPalette: {
      canvasBg: "#0c0714",
      stageBg: "#150d24",
      border: "#2a1b45",
      primaryText: "#f5f3ff",
      secondaryText: "#a78bfa",
      accent: "#8b5cf6",
      accentSecondary: "#84cc16",
      highlightPillBg: "#2e1065",
      highlightPillText: "#ddd6fe",
    },
    visualMotifs: [
      "Whop campaign evaluation scorecard (Creator charisma, RPM rate, budget remaining, moderator responsiveness)",
      "The 3-act viral clip narrative rail (3-second hook, story development, high-impact payoff)",
      "AI automated clipping pipeline (Long-form ingest -> Candidate timestamps -> 9:16 smart framing -> Dynamic captions)",
      "Multi-channel Shorts/TikTok/Instagram publishing matrix and effective hourly earnings calculator",
    ],
    layoutArchitecture:
      "High-velocity video clipping workstation with live campaign RPM telemetry, moment selection scorecards, and cross-platform publishing matrix",
    assignedPlaybookIds: ["ai-businesses-83"],
    assignedPlaybookSlugs: ["how-i-made-16-705-83-on-whop-as-a-low-iq-21-year-old"],
  },
  "synthetic-creator-studio-matrix": {
    templateId: "synthetic-creator-studio-matrix",
    name: "Synthetic Persona Studio & Brand Partnership Matrix",
    categoryTheme: "Virtual Influencers, AI Video Generation & Amazon Brand Affiliate Systems",
    colorPalette: {
      canvasBg: "#070b19",
      stageBg: "#0e162f",
      border: "#1e294b",
      primaryText: "#f0f4ff",
      secondaryText: "#94a3b8",
      accent: "#38bdf8",
      accentSecondary: "#f43f5e",
      highlightPillBg: "#1e3a8a",
      highlightPillText: "#bfdbfe",
    },
    description:
      "Split creator studio HUD with character identity telemetry, video generation timeline, and affiliate attribution ledger",
    visualMotifs: [
      "Character identity parameters (seed control, facial anchors, wardrobe continuity, voice synthesis)",
      "Multi-modal video production pipeline (LLM scripting -> Keyframe diffusion -> Video motion -> Dynamic captions)",
      "Direct brand partnership telemetry (80-250% commissions, spillover sales tracking, LTV modeling)",
      "FTC-compliant synthetic influencer disclosures and automated mobile bio link attribution",
    ],
    layoutArchitecture:
      "Split creator studio HUD with character identity telemetry, video generation timeline, and affiliate attribution ledger",
    assignedPlaybookIds: ["ai-businesses-84"],
    assignedPlaybookSlugs: ["build-a-10k-month-ai-influencer-in-9-mins"],
  },
  "iterative-acceleration-engine": {
    templateId: "iterative-acceleration-engine",
    name: "Iterative Acceleration & High-Velocity Feedback Engine",
    categoryTheme: "Rapid Skill Acquisition, Public Iteration & Compounding Performance Systems",
    description:
      "High-velocity iteration workstation with feedback triage matrices, bottleneck diagnosis trees, and 30-day sprint progress telemetry",
    colorPalette: {
      canvasBg: "#09110e",
      stageBg: "#11221c",
      border: "#1c382e",
      primaryText: "#ecfdf5",
      secondaryText: "#6ee7b7",
      accent: "#10b981",
      accentSecondary: "#f59e0b",
      highlightPillBg: "#064e3b",
      highlightPillText: "#a7f3d0",
    },
    visualMotifs: [
      "The Start-Feedback-Improve-Repeat loop flywheel (Attempt -> Observe -> Diagnose -> Adjust -> Retest)",
      "Feedback triage matrix (Repeated confusion, specific defects, unactionable cringe, safety concerns)",
      "Bottleneck prioritization scorecards (Impact x Frequency x Confidence / Effort)",
      "30-Day Progress Sprint execution roadmap & attempt documentation ledgers",
    ],
    layoutArchitecture:
      "High-velocity iteration workstation with feedback triage matrices, bottleneck diagnosis trees, and 30-day sprint progress telemetry",
    assignedPlaybookIds: ["ai-businesses-85"],
    assignedPlaybookSlugs: ["how-to-make-progress-faster-than-everyone"],
  },
  "generative-web-architect-matrix": {
    templateId: "generative-web-architect-matrix",
    name: "Generative Web Architect & Production Studio Matrix",
    categoryTheme: "AI Web Design, Client-Ready Development & High-Ticket Agency Workflows",
    description:
      "Full-stack generative web architecture console featuring brand token telemetry, component viewport simulation, and client pitch deployment matrices",
    colorPalette: {
      canvasBg: "#070e17",
      stageBg: "#0c1929",
      border: "#1a3350",
      primaryText: "#f0f7ff",
      secondaryText: "#7dd3fc",
      accent: "#0284c7",
      accentSecondary: "#f97316",
      highlightPillBg: "#0369a1",
      highlightPillText: "#e0f2fe",
    },
    visualMotifs: [
      "The 8-point client-ready quality checklist (Brand, custom assets, layout hierarchy, mobile readiness, forms, speed, SSL, domain)",
      "GPT-6 Astra prompt architecture & focused scope-locking syntax ('Do not change anything else')",
      "Client lead-form verification and end-to-end webhook delivery telemetry",
      "7-Day Client Website Launch roadmap & B2B demo prospecting scorecards",
    ],
    layoutArchitecture:
      "Full-stack generative web architecture console featuring brand token telemetry, component viewport simulation, and client pitch deployment matrices",
    assignedPlaybookIds: ["ai-businesses-86"],
    assignedPlaybookSlugs: ["how-to-build-a-10000-website-with-gpt-6-astra-full-tutorial"],
  },
  // 60. Playbook 60: Make your first $3,000 online in 90days (Or scroll for 5.37mins)
  "dm-appointment-setter-engine": {
    templateId: "dm-appointment-setter-engine",
    name: "DM High-Ticket Appointment Setter & Commission Velocity Engine",
    categoryTheme: "High-Ticket Sales, DM Qualification, Commission Attribution & Remote Setter Careers",
    description:
      "Deep slate navy canvas (#090e15) with emerald green commission telemetry (#059669), sky blue conversation threads (#38bdf8), lead qualification decision matrices, and transparent commission reconciliation ledgers",
    colorPalette: {
      canvasBg: "#090e15",
      stageBg: "#0f172a",
      border: "#1e293b",
      primaryText: "#f8fafc",
      secondaryText: "#94a3b8",
      accent: "#059669",
      accentSecondary: "#38bdf8",
      highlightPillBg: "#064e3b",
      highlightPillText: "#6ee7b7",
    },
    visualMotifs: [
      "The 7-step respectful DM qualification conversation framework",
      "Inbound message to qualified booked call to collected commission pipeline",
      "Attributed revenue, refund risk, and net commission reconciliation ledger",
      "The 90-day setter progression scorecard and B2B employer evaluation audit",
    ],
    layoutArchitecture:
      "Conversion funnel HUD with dialogue thread wireframes, lead qualification status badges, and commission attribution ledger",
    assignedPlaybookIds: ["ai-businesses-87"],
    assignedPlaybookSlugs: ["make-your-first-3000-online-in-90days-or-scroll-for-5-37mins"],
  },
  // 61. Playbook 61: If I Wanted to Make My First $100K in 2027, I’d Do This
  "sovereign-capital-accumulator": {
    templateId: "sovereign-capital-accumulator",
    name: "Sovereign Capital Accumulator & 100K Savings Matrix",
    categoryTheme: "Personal Finance, High-Value Skills, Cash Retention & 2027 Wealth Architecture",
    description:
      "Obsidian charcoal canvas (#0a0a0c) with burnished gold capital telemetry (#d97706), emerald retention signals (#10b981), surplus cash flow flowcharts, and the 4-4-4 operating split matrix",
    colorPalette: {
      canvasBg: "#0a0a0c",
      stageBg: "#121216",
      border: "#27272a",
      primaryText: "#f8fafc",
      secondaryText: "#a1a1aa",
      accent: "#d97706",
      accentSecondary: "#10b981",
      highlightPillBg: "#451a03",
      highlightPillText: "#fde68a",
    },
    visualMotifs: [
      "The 4-4-4 Operating Split: 4 Hours Promotion, 4 Hours Delivery, 4 Hours Building",
      "One Product, One Customer Avatar, One Primary Channel Focus Framework",
      "The 6-Stage Capital Accumulation Pipeline (Reduce Costs -> Reclaim Time -> Marketable Skill -> Iteration Feedback -> Selective Tooling -> Retained Cash)",
      "Monthly Net Cash Ledger: Revenue vs Gross Income vs Net Profit vs Accumulated Retained Savings",
    ],
    layoutArchitecture:
      "Sovereign financial balance sheet console with cash-flow surplus gauges, maker/manager block wireframes, and iteration feedback scorecards",
    assignedPlaybookIds: ["ai-businesses-88"],
    assignedPlaybookSlugs: ["if-i-wanted-to-make-my-first-100k-in-2027-id-do-this"],
  },
  // 62. Playbook 62: 31 Years of Wealth Knowledge in 18 Minutes
  "wealth-ladder-compounding-matrix": {
    templateId: "wealth-ladder-compounding-matrix",
    name: "The Wealth Ladder & Compounding Ascension Matrix",
    categoryTheme: "Wealth Architecture, Income Stacking, Productive Assets & Long-Term Compounding",
    description:
      "Deep forest obsidian canvas (#07130f) with emerald wealth ladder telemetry (#10b981), warm gold cash-flow nodes (#f59e0b), TIGA portfolio ledgers, and passive income coverage ratio gauges",
    colorPalette: {
      canvasBg: "#07130f",
      stageBg: "#0c1f19",
      border: "#1b382e",
      primaryText: "#f0fdf4",
      secondaryText: "#86efac",
      accent: "#10b981",
      accentSecondary: "#f59e0b",
      highlightPillBg: "#064e3b",
      highlightPillText: "#a7f3d0",
    },
    visualMotifs: [
      "The 4-Rung Wealth Ladder progression: Active Income -> Consistent Surplus -> Productive Assets -> Passive Income",
      "TIGA (Tiny Income-Generating Assets) reinvestment & income-stacking flywheel",
      "Passive Income Coverage Ratio gauge (Net Asset Income / Monthly Living Expenses)",
      "Multi-scenario compounding calculators and purchasing power inflation deflators",
    ],
    layoutArchitecture:
      "Progressive ladder hierarchy console with step-by-step financial health diagnostics, asset cash-flow tables, and compounding projection curves",
    assignedPlaybookIds: ["ai-businesses-89"],
    assignedPlaybookSlugs: ["31-years-of-wealth-knowledge-in-18-minutes"],
  },
  // 63. Playbook 63: If I Started With $0, Here's My Exact Plan To $100K
  "zero-to-hundred-k-velocity-matrix": {
    templateId: "zero-to-hundred-k-velocity-matrix",
    name: "Zero-to-$100K Financial Engine & Profit Zone Velocity Matrix",
    categoryTheme: "Zero-Capital Foundations, Main-Job Earning Growth, Profit Zone Side Incomes & Systematic $100K Accumulation",
    description:
      "Deep midnight sapphire canvas (#090e17) with slate navy stages (#0f172a), electric cyan velocity indicators (#06b6d4), emerald asset accumulation ledgers (#10b981), and 4-4 time reclamation architecture grids",
    colorPalette: {
      canvasBg: "#090e17",
      stageBg: "#0f172a",
      border: "#1e293b",
      primaryText: "#f8fafc",
      secondaryText: "#94a3b8",
      accent: "#06b6d4",
      accentSecondary: "#10b981",
      highlightPillBg: "#164e63",
      highlightPillText: "#a5f3fc",
    },
    visualMotifs: [
      "The 8-Step Financial Velocity Framework ($0 to $100K Critical Mass)",
      "The 3-Circle Profit Zone Diagnostic (Enjoyment + Skill + Market Willingness to Pay)",
      "The 4-4 Time Reclamation Grid (Morning Deep Work & Evening Execution)",
      "The S&P 500 Daily Compounding Ledger & Lifestyle Inflation Firewall",
    ],
    layoutArchitecture:
      "Split telemetry command HUD with dual metric counters, 3-circle profit intersection diagrams, and step-by-step milestone tracking",
    assignedPlaybookIds: ["ai-businesses-90"],
    assignedPlaybookSlugs: ["if-i-started-with-0-heres-my-exact-plan-to-100k"],
  },
  // 64. Playbook 64: I BLEW UP a YouTube Channel in 24 Hours with AI
  "viral-shorts-transformation-studio": {
    templateId: "viral-shorts-transformation-studio",
    name: "AI Viral Shorts Transformation Studio & Storytelling Matrix",
    categoryTheme: "Shorts Reverse-Engineering, 6-Phase Storytelling, Visual Continuity & High-Retention Video Production",
    description:
      "Neon cyberpunk crimson canvas (#0f0a14) with electric magenta stages (#1a1025), vivid violet borders (#3b185f), fluorescent coral indicators (#ff4b72), and amber retention gauges (#f59e0b)",
    colorPalette: {
      canvasBg: "#0f0a14",
      stageBg: "#1a1025",
      border: "#3b185f",
      primaryText: "#fdf4ff",
      secondaryText: "#d8b4fe",
      accent: "#ff4b72",
      accentSecondary: "#a855f7",
      highlightPillBg: "#4c0519",
      highlightPillText: "#fecdd3",
    },
    visualMotifs: [
      "The 6-Phase Storytelling Blueprint: Declare -> Assessment -> Isolate -> Process -> Build -> Reveal",
      "Dual Reference Anchor Frame (Environment Reference + Subject Reference)",
      "The Before/After Split Transformation Polaroid Canvas",
      "The 48-Hour Retention Telemetry & Average Percentage Viewed Waveform",
    ],
    layoutArchitecture:
      "Split cinematic storyboard HUD with scene-by-scene timing tracks, visual continuity reference slots, and retention drop-off analytics",
    assignedPlaybookIds: ["ai-businesses-91"],
    assignedPlaybookSlugs: ["i-blew-up-a-youtube-channel-in-24-hours-with-ai"],
  },
  // 65. Playbook 65: "I'm Broke, What Business Do I Start?"
  "zero-capital-business-catalyst": {
    templateId: "zero-capital-business-catalyst",
    name: "Zero-Capital Business Catalyst & 3P Offer Matrix",
    categoryTheme: "Zero-Capital Entrepreneurship, The Three Ps (Pain, Profession, Passion), Outcome Offer Engineering & Warm Outreach Validation",
    description:
      "Warm golden obsidian canvas (#120e08) with rich bronze stages (#1c160c), amber borders (#423018), electric honey gold indicators (#f59e0b), and emerald validation nodes (#10b981)",
    colorPalette: {
      canvasBg: "#120e08",
      stageBg: "#1c160c",
      border: "#423018",
      primaryText: "#fefce8",
      secondaryText: "#d6d3d1",
      accent: "#f59e0b",
      accentSecondary: "#10b981",
      highlightPillBg: "#451a03",
      highlightPillText: "#fef3c7",
    },
    visualMotifs: [
      "The Three Ps Diagnostic Venn Diagram (Pain, Profession, Passion)",
      "The Customer Avatar 5-Dimension Radar (Age, Gender, Profession, Pain, Passion)",
      "The I Help [WHO] achieve [OUTCOME] without [UNWANTED FRICTION] Offer Formula",
      "The 7-Day Zero-Capital Outreach & Discovery Funnel",
    ],
    layoutArchitecture:
      "Split diagnostic workspace HUD with offer formula builders, customer pain matrices, and warm outreach conversation trackers",
    assignedPlaybookIds: ["ai-businesses-92"],
    assignedPlaybookSlugs: ["im-broke-what-business-do-i-start"],
  },
  // 66. Playbook 66: "Starting An AI Side Hustle Is EASY (Copy This System)"
  "four-gate-hustle-architecture": {
    templateId: "four-gate-hustle-architecture",
    name: "Four-Gate AI Hustle Architecture & Telemetry Engine",
    categoryTheme: "The Four-Gate Validation System (Demand, Edge, Access, Learning Loops), Cremona Builder Mindset & F1 Iteration Telemetry",
    description:
      "Deep cobalt graphite canvas (#0a0f1d) with midnight navy stages (#111827), indigo hairline borders (#1e293b), electric cyan primary telemetry (#06b6d4), vivid violet edge indicators (#8b5cf6), and lime feedback accents (#84cc16)",
    colorPalette: {
      canvasBg: "#0a0f1d",
      stageBg: "#111827",
      border: "#1e293b",
      primaryText: "#f8fafc",
      secondaryText: "#cbd5e1",
      accent: "#06b6d4",
      accentSecondary: "#8b5cf6",
      highlightPillBg: "#083344",
      highlightPillText: "#a5f3fc",
    },
    visualMotifs: [
      "The Four-Gate Sequential Funnel (Gate 1 Demand, Gate 2 Edge, Gate 3 Access, Gate 4 Learning Loops)",
      "The Edge Triad Radar (Imagination, Focus, Context)",
      "The Formula 1 Telemetry Loop (Observe -> Record -> Analyse -> Decide -> Change -> Measure)",
      "The Cremona Builder Craftsmanship Matrix (Sensory Judgment vs. Raw AI Output)",
    ],
    layoutArchitecture:
      "Telemetry HUD with four-gate validation checkpoints, buyer vs. user split columns, niche scorecard calculators, and F1 feedback loop cycles",
    assignedPlaybookIds: ["ai-businesses-93"],
    assignedPlaybookSlugs: ["starting-an-ai-side-hustle-is-easy-copy-this-system"],
  },
  // 67. Playbook 67: "If You Only Read One Money Playbook, Make It This"
  "seven-laws-wealth-matrix": {
    templateId: "seven-laws-wealth-matrix",
    name: "Seven Laws Wealth Matrix & Asymmetry Radar",
    categoryTheme: "The Seven Laws of Money (Momentum, Structure, Asymmetry), Ownership & Equity Engineering, Non-Linear Risk Management",
    description:
      "Deep obsidian emerald canvas (#0b1411) with rich pine velvet stages (#11201b), muted jade borders (#1c3a30), vibrant electric emerald primary telemetry (#10b981), warm sovereign gold indicators (#eab308), and soft mint accents (#6ee7b7)",
    colorPalette: {
      canvasBg: "#0b1411",
      stageBg: "#11201b",
      border: "#1c3a30",
      primaryText: "#f0fdf4",
      secondaryText: "#cbd5e1",
      accent: "#10b981",
      accentSecondary: "#eab308",
      highlightPillBg: "#064e3b",
      highlightPillText: "#a7f3d0",
    },
    visualMotifs: [
      "The Three-Pillar Sovereign Architecture (Momentum, Structure, Asymmetry)",
      "The Seven Laws Triad Radar & Ownership/Control Matrix",
      "The Asymmetric Payoff Curve (Capped Downside vs. Non-Linear Upside)",
      "The Risk-Knowledge x Control Quadrant Matrix",
    ],
    layoutArchitecture:
      "Sovereign financial telemetry HUD with risk-control grids, cash-flow vs. equity split balance sheets, and position-sizing limiters",
    assignedPlaybookIds: ["ai-businesses-94"],
    assignedPlaybookSlugs: ["if-you-only-read-one-money-playbook-make-it-this"],
  },
  // 68. Playbook 68: "If I Wanted to Make My First $100K in 12 months, I’d Do This"
  "six-figure-momentum-engine": {
    templateId: "six-figure-momentum-engine",
    name: "Six-Figure Momentum Engine & 6P Offer Radar",
    categoryTheme: "The 5-Phase Lifestyle Roadmap, The Six Ps Offer Architecture (Person, Problem, Promise, Plan, Product, Price), Non-Adversarial Discovery & 12-Month Momentum",
    description:
      "Deep obsidian slate canvas (#0d131a) with midnight steel stages (#16202c), slate-cyan hairline borders (#233547), electric azure primary telemetry (#38bdf8), bright amber execution indicators (#f59e0b), and crisp ice-blue accents (#7dd3fc)",
    colorPalette: {
      canvasBg: "#0d131a",
      stageBg: "#16202c",
      border: "#233547",
      primaryText: "#f0f9ff",
      secondaryText: "#94a3b8",
      accent: "#38bdf8",
      accentSecondary: "#f59e0b",
      highlightPillBg: "#0c4a6e",
      highlightPillText: "#bae6fd",
    },
    visualMotifs: [
      "The 5-Phase Lifestyle Business Timeline (Ideation -> Validation -> Momentum -> Leverage -> Freedom)",
      "The Six Ps Offer Architecture Radar (Person, Problem, Promise, Plan, Product, Price)",
      "The Diverge-Converge-Emerge Niche Selection Funnel",
      "The Three-Frame Discovery Call Matrix (Research, Free Coaching, Sales)",
    ],
    layoutArchitecture:
      "Split roadmap workspace HUD with 6P offer engineering blocks, discovery call trackers, and monthly $8,333 run-rate revenue dashboards",
    assignedPlaybookIds: ["ai-businesses-95"],
    assignedPlaybookSlugs: ["if-i-wanted-to-make-my-first-100k-in-12-months-id-do-this"],
  },
  // Template 61: Dynasty Governance Architecture & 9-System Wealth Vault
  // Specifically crafted for "In 18 Minutes, You'll Understand Generational Wealth"
  "dynasty-governance-architecture": {
    templateId: "dynasty-governance-architecture",
    name: "Dynasty Governance Architecture & 9-System Wealth Vault",
    categoryTheme: "Generational Wealth Preservation, Dynasty Trusts, Family Holding Companies, Constitutional Governance & Multi-Generational Stewardship",
    description:
      "Deep fiduciary obsidian canvas (#0a1219) with dynasty steel stages (#121e2b), vault steel borders (#1e3247), sovereign emerald primary accents (#10b981), heritage amber secondary highlights (#d97706), and refined silver-white typography",
    colorPalette: {
      canvasBg: "#0a1219",
      stageBg: "#121e2b",
      border: "#1e3247",
      primaryText: "#f1f5f9",
      secondaryText: "#94a3b8",
      accent: "#10b981",
      accentSecondary: "#d97706",
      highlightPillBg: "#064e3b",
      highlightPillText: "#a7f3d0",
    },
    visualMotifs: [
      "The Nine Systems of Generational Wealth Vault Architecture",
      "The Four Pillars of Multi-Generational Preservation (Ownership, Control, Liquidity, Succession)",
      "The Tiered Liquidity Ladder & Family Bank Credit Architecture",
      "The Tripartite Governance Model (Assembly, Council, Independent Trustees)",
    ],
    layoutArchitecture:
      "Institutional family office HUD with dual-column constitutional matrices, asset risk registers, and multi-generational succession diagrams",
    assignedPlaybookIds: ["ai-businesses-96"],
    assignedPlaybookSlugs: ["in-18-minutes-youll-understand-generational-wealth"],
  },
  // Template 62: AI Persona Affiliate Engine & Digital Product Studio
  // Specifically crafted for "I Tried A Zero Skill AI Side Hustle For Indians (Copy Me)"
  "ai-persona-affiliate-engine": {
    templateId: "ai-persona-affiliate-engine",
    name: "AI Persona Affiliate Engine & Digital Product Studio",
    categoryTheme: "AI Influencer Architecture, Two-Persona Monetization (Indian Amazon Affiliate & Global Digital Products), OpenArt Consistency, Character Continuity & 7-Day Sprint",
    description:
      "Deep studio cyber navy canvas (#0c0f17) with persona stage slate (#151b27), clean neon hairline borders (#243044), vibrant saffron ember primary accents (#f97316), electric creative violet secondary highlights (#8b5cf6), and crisp white studio typography",
    colorPalette: {
      canvasBg: "#0c0f17",
      stageBg: "#151b27",
      border: "#243044",
      primaryText: "#f8fafc",
      secondaryText: "#94a3b8",
      accent: "#f97316",
      accentSecondary: "#8b5cf6",
      highlightPillBg: "#431407",
      highlightPillText: "#fed7aa",
    },
    visualMotifs: [
      "The Two-Persona Monetization Architecture (Indian Affiliate vs. US Digital Storefront)",
      "The OpenArt Character Sheet & Visual Consistency Pipeline (Face, Lighting, Locations)",
      "The 7-Day Sprint Milestones (Research -> Creation -> Production -> Funnel -> Scaling)",
      "The Conversion Funnel Telemetry (Profile Visits, Link CTR, Attributed Cart Conversions)",
    ],
    layoutArchitecture:
      "Modern creator studio HUD with split persona comparison grids, video production prompt blueprints, and real-time affiliate/storefront revenue telemetry",
    assignedPlaybookIds: ["ai-businesses-97"],
    assignedPlaybookSlugs: ["i-tried-a-zero-skill-ai-side-hustle-for-indians-copy-me"],
  },
  // Template 63: Dual-Market Digital Products Engine & 7-Day Free-Tool Lab
  // Specifically crafted for "I Sold AI Digital Products For 7 Days (100% FREE Tools)"
  "dual-market-digital-products-engine": {
    templateId: "dual-market-digital-products-engine",
    name: "Dual-Market Digital Products Engine & 7-Day Free-Tool Lab",
    categoryTheme: "AI Digital Product Engineering, Dual-Market Arbitrage (Indian ₹99 Survival Guides & US $12.99 Planners), Topmate UPI & Gumroad Storefronts, Unit Economics & 7-Day Sprint",
    description:
      "Deep studio graphite canvas (#0e1117) with dual-market obsidian stages (#161b22), steel cyan borders (#21262d), electric teal primary accents (#14b8a6), radiant coral secondary highlights (#f43f5e), and clean crisp white typography",
    colorPalette: {
      canvasBg: "#0e1117",
      stageBg: "#161b22",
      border: "#21262d",
      primaryText: "#f0f6fc",
      secondaryText: "#8b949e",
      accent: "#14b8a6",
      accentSecondary: "#f43f5e",
      highlightPillBg: "#134e4a",
      highlightPillText: "#5eead4",
    },
    visualMotifs: [
      "The Dual-Market Comparison Matrix (India ₹99 UPI vs. US $12.99 Tablet Planners)",
      "The Competitor-Gap Research Framework (Popular Listings -> Gaps -> Built Product)",
      "The 7-Day Execution Blueprint (Research -> Outline -> Draft -> Design -> Storefront -> Traffic -> Net Review)",
      "The True Net Profit & Unit Economics Calculator (Ad Spend, Platform Fees, Contribution per Order)",
    ],
    layoutArchitecture:
      "Dual-market product engineering HUD with side-by-side storefront mockups, clickable PDF inspection checklists, and break-even ad telemetry",
    assignedPlaybookIds: ["ai-businesses-98"],
    assignedPlaybookSlugs: ["i-sold-ai-digital-products-for-7-days-100-free-tools"],
  },
  // Template 64: Four-Goods Investment Decision System & Capital-Stack Radar
  // Specifically crafted for "When I Understood This About Investing. My Life Changed."
  "four-goods-investment-decision-system": {
    templateId: "four-goods-investment-decision-system",
    name: "Four-Goods Investment Decision System & Capital-Stack Radar",
    categoryTheme: "Systematic Capital Allocation, Capital Stack Priority (Senior Debt to Common Equity), The Four Goods Due-Diligence Engine, 100-Point Investment Scorecard, Friction & After-Tax Compounding",
    description:
      "Executive boardroom slate canvas (#090d16) with deep navy-indigo stages (#0f172a), midnight steel borders (#1e293b), luminous emerald green accents (#10b981), warm amber secondary highlights (#f59e0b), and platinum typography",
    colorPalette: {
      canvasBg: "#090d16",
      stageBg: "#0f172a",
      border: "#1e293b",
      primaryText: "#f8fafc",
      secondaryText: "#94a3b8",
      accent: "#10b981",
      accentSecondary: "#f59e0b",
      highlightPillBg: "#064e3b",
      highlightPillText: "#6ee7b7",
    },
    visualMotifs: [
      "The Capital-Stack Insolvency Waterfall (Senior Debt -> Mezzanine -> Preferred Equity -> Common Equity)",
      "The Four Goods Due-Diligence Compass (Good People, Good Intentions, Good Rationale, Good Contracts)",
      "The 100-Point Investment Scorecard Radar (Preservation, Tax Efficiency, Cash Flow, Growth)",
      "The Net After-Friction Compounding Formula (Gross Yield vs. After-Tax, After-Fee Retained Capital)",
    ],
    layoutArchitecture:
      "Executive investment committee terminal featuring capital-stack priority waterfalls, 100-point scorecard matrices, and scenario stress-test dashboards",
    assignedPlaybookIds: ["ai-businesses-99"],
    assignedPlaybookSlugs: ["when-i-understood-this-about-investing-my-life-changed"],
  },
  // Template 65: UGC Agency Ladder & AI Creator Production Studio
  // Specifically crafted for "This AI Side Hustle Makes 4 Lakhs/Month (Copy Me)"
  "ugc-agency-ladder-growth-engine": {
    templateId: "ugc-agency-ladder-growth-engine",
    name: "UGC Agency Ladder & AI Creator Production Studio",
    categoryTheme: "UGC Creator Coordination, AI-Generated Creator Ads (OpenArt & Claude MCP), Meta Ads Library Prospecting, Brand Creative Briefs & 4-Stage Agency Ladder",
    description:
      "Editorial lavender-slate canvas (#0f0d17) with deep violet-plum stages (#1a1528), muted mauve borders (#2d2244), radiant electric violet accents (#8b5cf6), warm coral secondary highlights (#fb7185), and crisp snow typography",
    colorPalette: {
      canvasBg: "#0f0d17",
      stageBg: "#1a1528",
      border: "#2d2244",
      primaryText: "#f8fafc",
      secondaryText: "#94a3b8",
      accent: "#8b5cf6",
      accentSecondary: "#fb7185",
      highlightPillBg: "#2e1065",
      highlightPillText: "#c4b5fd",
    },
    visualMotifs: [
      "The 4-Stage UGC Agency Ladder (Coordination -> Briefs/Scripts -> AI UGC Ads -> Full Strategy)",
      "The Meta Ads Library Prospecting Funnel (Active DTC Brands -> Creative Audit -> Email Pitch)",
      "The OpenArt & Claude MCP Synthetic Studio (Persona Generation -> Scene Prompting -> QA Audit)",
      "The Monday Morning Performance Matrix (ROAS, Creative Testing, Invoiced Retainers & Net Margins)",
    ],
    layoutArchitecture:
      "Modern agency operations console with creator database sheets, video script storyboard panels, and retainer telemetry cards",
    assignedPlaybookIds: ["ai-businesses-100"],
    assignedPlaybookSlugs: ["this-ai-side-hustle-makes-4-lakhs-month-copy-me"],
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
