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
