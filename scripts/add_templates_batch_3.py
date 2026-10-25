import json

TEMPLATES_BATCH_3 = {
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
        "assignedPlaybookIds": ["ai-businesses-17"],
        "assignedPlaybookSlugs": ["how-i-turned-300-to-100-000-at-19-my-side-hustles"]
    },
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
        "assignedPlaybookIds": ["ai-businesses-18"],
        "assignedPlaybookSlugs": ["how-to-become-rich-with-social-media-my-exact-playbook"]
    },
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
        "assignedPlaybookIds": ["ai-businesses-19"],
        "assignedPlaybookSlugs": ["how-to-get-rich-for-service-based-businesses-thank-me-later"]
    },
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
        "assignedPlaybookIds": ["ai-businesses-20"],
        "assignedPlaybookSlugs": ["the-new-way-of-making-content-in-the-age-of-ai"]
    },
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
        "assignedPlaybookIds": ["ai-businesses-21"],
        "assignedPlaybookSlugs": ["how-to-catch-up-in-life-using-logic"]
    },
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
        "assignedPlaybookIds": ["ai-businesses-22"],
        "assignedPlaybookSlugs": ["what-makes-the-perfect-business-5-things"]
    },
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
        "assignedPlaybookIds": ["ai-businesses-23"],
        "assignedPlaybookSlugs": ["how-to-use-ai-in-your-business-in-2026"]
    },
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
        "assignedPlaybookIds": ["ai-businesses-24"],
        "assignedPlaybookSlugs": ["if-you-have-multiple-interests-please-start-a-one-person-business"]
    }
}

reg_path = "src/lib/slide-templates/registry.ts"
with open(reg_path, "r", encoding="utf-8") as f:
    c = f.read()

marker = "  };\n};\n\n/**\n * Register or update a slide template"
alt_marker = "  },\n};\n\n/**\n * Register or update a slide template"

idx = c.find(alt_marker)
if idx == -1:
    idx = c.find(marker)

if idx != -1:
    insert_pos = idx + len("  },\n")
    new_entries = ""
    for tid, data in TEMPLATES_BATCH_3.items():
        if f'"{tid}":' not in c:
            new_entries += f"  // {data['name']}\n  \"{tid}\": " + json.dumps(data, indent=4).replace("\n", "\n  ") + ",\n\n"
    
    updated_c = c[:insert_pos] + new_entries + c[insert_pos:]
    with open(reg_path, "w", encoding="utf-8") as f:
        f.write(updated_c)
    print("Updated registry.ts with all 8 new templates!")
else:
    print("Could not find marker in registry.ts")
