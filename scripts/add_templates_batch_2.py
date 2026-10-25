import re

with open('src/lib/slide-templates/registry.ts', 'r', encoding='utf-8') as f:
    code = f.read()

target = '  // 9. Playbook 8: Build A One-Person Business As A Beginner (From $0 To $10K)'
assert target in code, "Target not found in registry.ts"

new_templates = '''  // 10. Playbook 9: Laziest Way to Make Money Online in 2026 ($500/day)
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
'''

# Find insertion point before '};'
idx = code.rfind('};\n\n/**\n * Register or update a slide template')
if idx == -1:
    idx = code.rfind('};\n\nexport function registerTemplate')

assert idx != -1, "Insertion point not found"
new_code = code[:idx] + new_templates + code[idx:]

with open('src/lib/slide-templates/registry.ts', 'w', encoding='utf-8') as f:
    f.write(new_code)

print("Successfully injected 8 new templates into registry.ts!")
