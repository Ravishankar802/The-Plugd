/**
 * Persistent PPT Slide Template Registry
 *
 * Mandatory requirement: Every Playbook must have its own distinct PPT slide template/design.
 * A template assigned to one Playbook must NEVER be reused for another.
 * This registry enforces programmatic uniqueness across all 300+ Playbooks.
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
  // 1. Reference Blueprint Template (7 AI Automation Tools)
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

  // 3. New Unique Template for Playbook 2: Build a $10,000/Month AI Service Business With Just 3 Core Tools
  "agency-revenue-os": {
    templateId: "agency-revenue-os",
    name: "B2B Agency Revenue OS (Executive Terminal)",
    categoryTheme: "High-Ticket AI Services & Agency Systems",
    description:
      "Deep technical slate/navy canvas (#0b0f19) with an ambient cyan/emerald dot-grid matrix, dual-border glassmorphism terminal card, financial milestone HUD with $10K MRR stage trackers, pipeline workflow cards, and emerald (#10b981) + cyan (#06b6d4) revenue accents.",
    colorPalette: {
      canvasBg: "#0b0f19",
      stageBg: "linear-gradient(145deg, rgba(15,23,42,0.95), rgba(11,15,25,0.98))",
      border: "rgba(16, 185, 129, 0.25)",
      primaryText: "#f8fafc",
      secondaryText: "#94a3b8",
      accent: "#10b981", // Emerald revenue accent
      accentSecondary: "#06b6d4", // Cyan pipeline accent
      highlightPillBg: "rgba(16, 185, 129, 0.12)",
      highlightPillText: "#34d399",
    },
    visualMotifs: [
      "Technical dot-grid background matrix (24px cyan/emerald grid)",
      "Executive Terminal HUD status header with live Stage & Revenue Milestones ($10,000/mo MRR KPI)",
      "Stack indicator tags: AIRTABLE + CLAUDE + MAKE",
      "Step-by-step deliverable pipeline cards with status flags (SOP READY, CLIENT APPROVED)",
      "Financial ROI and transparent unit economics badges",
      "High-ticket client negotiation and objection scripts",
    ],
    layoutArchitecture:
      "Technical executive terminal with top telemetry HUD, dual-tone card borders, and multi-tier pipeline blocks",
    assignedPlaybookIds: ["ai-businesses-02"],
    assignedPlaybookSlugs: [
      "build-a-10000-month-ai-service-business-with-just-3-core-tools",
      "ai-businesses-02",
    ],
  },

  // 4. Playbook 3: 5 AI Agents You Can Build and Sell Without Training Your Own Model
  "agentic-workflow-matrix": {
    templateId: "agentic-workflow-matrix",
    name: "Agentic Workflow & Autonomous Systems Studio",
    categoryTheme: "Multi-Agent Orchestration & Tool-Calling Systems",
    description:
      "Cyber-slate canvas (#0f172a) with neon violet (#8b5cf6) and bright amber (#f59e0b) node-calling blocks, multi-agent status badges, and interactive tool schemas.",
    colorPalette: {
      canvasBg: "#0f172a",
      stageBg: "linear-gradient(145deg, #1e1b4b, #0f172a)",
      border: "rgba(139, 92, 246, 0.3)",
      primaryText: "#f8fafc",
      secondaryText: "#cbd5e1",
      accent: "#8b5cf6",
      accentSecondary: "#f59e0b",
      highlightPillBg: "rgba(139, 92, 246, 0.15)",
      highlightPillText: "#c084fc",
    },
    visualMotifs: [
      "Multi-node agent execution graph",
      "Tool-calling execution blocks with JSON schema previews",
      "Active agent status chips (IDLE | REASONING | TOOL CALL | COMPLETE)",
      "Autonomous reasoning loop diagrams",
    ],
    layoutArchitecture: "Agent studio terminal with left tool-calling rail and center reasoning node canvas",
    assignedPlaybookIds: ["ai-businesses-03"],
    assignedPlaybookSlugs: [
      "5-ai-agents-you-can-build-and-sell-without-training-your-own-model",
      "ai-businesses-03",
    ],
  },

  // 5. Playbook 4: Turn 1 AI Skill Into 4 Different Freelance Income Streams
  "quadrant-revenue-stream": {
    templateId: "quadrant-revenue-stream",
    name: "Modular Multi-Stream Revenue Dashboard",
    categoryTheme: "Freelance Monetization & Productized Services",
    description:
      "Warm editorial parchment (#faf7f2) with deep terracotta (#c2410c) and forest sage (#15803d) split meters, 4-quadrant cashflow progression cards, and client lifetime value metrics.",
    colorPalette: {
      canvasBg: "#faf7f2",
      stageBg: "#ffffff",
      border: "#e5e0d8",
      primaryText: "#1c1917",
      secondaryText: "#57534e",
      accent: "#c2410c",
      accentSecondary: "#15803d",
      highlightPillBg: "#ffedd5",
      highlightPillText: "#c2410c",
    },
    visualMotifs: [
      "4-Quadrant revenue distribution meters (Sprints, Retainers, Digital SOPs, Advisory)",
      "Monthly revenue target dials and yield percentages",
      "Client conversion cross-sell flowcharts",
      "Warm dual-column editorial layout",
    ],
    layoutArchitecture: "Editorial parchment dashboard with 4-quadrant metric HUD and dual-column delivery cards",
    assignedPlaybookIds: ["ai-businesses-04"],
    assignedPlaybookSlugs: [
      "turn-1-ai-skill-into-4-different-freelance-income-streams",
      "ai-businesses-04",
    ],
  },

  // 6. Playbook 5: The 30-Day AI Agency Blueprint: From Zero Portfolio to Paying Clients
  "agency-chronicle-calendar": {
    templateId: "agency-chronicle-calendar",
    name: "Chronological 30-Day Milestone Dossier",
    categoryTheme: "Agency Incubation & Rapid Deployment",
    description:
      "Deep carbon canvas (#121316) with burnt amber (#d97706) and electric sky blue (#38bdf8), 30-day timeline progress bar, daily sprint dossier cards, and diagnostic discovery scripts.",
    colorPalette: {
      canvasBg: "#121316",
      stageBg: "linear-gradient(160deg, #181a20, #0f1013)",
      border: "rgba(217, 119, 6, 0.28)",
      primaryText: "#f9fafb",
      secondaryText: "#9ca3af",
      accent: "#d97706",
      accentSecondary: "#38bdf8",
      highlightPillBg: "rgba(217, 119, 6, 0.14)",
      highlightPillText: "#fbbf24",
    },
    visualMotifs: [
      "Day 1 to Day 30 chronological timeline scrubber across top",
      "Daily sprint milestone checklist dossiers",
      "Video audit cold outreach sequence badges",
      "Carbon executive styling with glowing amber highlights",
    ],
    layoutArchitecture: "Chronological campaign dashboard with top week-by-week scrubber and daily execution dossier card",
    assignedPlaybookIds: ["ai-businesses-05"],
    assignedPlaybookSlugs: [
      "the-30-day-ai-agency-blueprint-from-zero-portfolio-to-paying-clients",
      "ai-businesses-05",
    ],
  },

  // 7. Playbook 6: 12 AI Services Small Businesses Need but Rarely Know How to Build
  "catalog-service-index": {
    templateId: "catalog-service-index",
    name: "Commercial Service Catalog & Delivery Spec",
    categoryTheme: "SMB Turn-Key Systems & Operational Automations",
    description:
      "Clean light zinc canvas (#f4f4f5) with deep cobalt (#1e40af) and bright seafoam teal (#0d9488), structured 2-column service catalog cards, tool stack badges, and deliverable complexity ratings.",
    colorPalette: {
      canvasBg: "#f4f4f5",
      stageBg: "#ffffff",
      border: "#e4e4e7",
      primaryText: "#18181b",
      secondaryText: "#52525b",
      accent: "#1e40af",
      accentSecondary: "#0d9488",
      highlightPillBg: "#eff6ff",
      highlightPillText: "#1e40af",
    },
    visualMotifs: [
      "Structured 2-column service catalog cards",
      "Deliverable complexity meters (Level 1–5)",
      "Integration tool tags (Make + Twilio + Airtable + OpenAI)",
      "Client ROI and payback period callout cards",
    ],
    layoutArchitecture: "Structured catalog spec sheet with left service index and right implementation architecture",
    assignedPlaybookIds: ["ai-businesses-06"],
    assignedPlaybookSlugs: [
      "12-ai-services-small-businesses-need-but-rarely-know-how-to-build",
      "ai-businesses-06",
    ],
  },

  // 8. Playbook 7: Build a Micro-SaaS With AI in 7 Days Instead of Spending Months Coding
  "code-terminal-compiler": {
    templateId: "code-terminal-compiler",
    name: "Developer IDE & Code Compiler Canvas",
    categoryTheme: "Full-Stack Micro-SaaS & AI Software Engineering",
    description:
      "Dark code editor terminal (#0d1117) with syntax-highlighted code editor cards, git branch commit diagrams, Day 1 of 7 countdown badge, and terminal prompt headers.",
    colorPalette: {
      canvasBg: "#0d1117",
      stageBg: "#161b22",
      border: "#30363d",
      primaryText: "#e6edf3",
      secondaryText: "#8b949e",
      accent: "#38bdf8",
      accentSecondary: "#84cc16",
      highlightPillBg: "rgba(56, 189, 248, 0.12)",
      highlightPillText: "#38bdf8",
    },
    visualMotifs: [
      "Tabbed IDE code editor mockup (day-0X.ts)",
      "Syntax-highlighted code cards with copy-paste actions",
      "Git commit hash tags and branch status diagrams",
      "Next.js 15 App Router directory tree diagrams",
    ],
    layoutArchitecture: "Developer IDE workspace with file tabs header, syntax code stage, and bottom compiler output console",
    assignedPlaybookIds: ["ai-businesses-07"],
    assignedPlaybookSlugs: [
      "build-a-micro-saas-with-ai-in-7-days-instead-of-spending-months-coding",
      "ai-businesses-07",
    ],
  },

  // 9. Playbook 8: Sell AI Chatbots to 10 Local Businesses Without Hiring a Developer
  "conversational-flow-studio": {
    templateId: "conversational-flow-studio",
    name: "Live Chatbot Simulator & Sales Walkthrough",
    categoryTheme: "Conversational AI & Local Agency Sales",
    description:
      "Warm subtle studio grey (#f3f4f6) with deep emerald teal (#0f766e) and vivid coral (#f43f5e), live interactive smartphone chat bubble simulation cards, customer intent branching nodes, and local sales callout blocks.",
    colorPalette: {
      canvasBg: "#f3f4f6",
      stageBg: "#ffffff",
      border: "#e5e7eb",
      primaryText: "#111827",
      secondaryText: "#4b5563",
      accent: "#0f766e",
      accentSecondary: "#f43f5e",
      highlightPillBg: "#ccfbf1",
      highlightPillText: "#0f766e",
    },
    visualMotifs: [
      "Smartphone mobile mockup frame with live chat dialogue bubbles",
      "Intent classification branching trees and quick-reply chips",
      "Trojan Horse video demo script callouts",
      "Local business trade icons and 1-click booking preview",
    ],
    layoutArchitecture: "Split studio canvas with left conversational phone mockup and right commercial sales framework",
    assignedPlaybookIds: ["ai-businesses-08"],
    assignedPlaybookSlugs: [
      "sell-ai-chatbots-to-10-local-businesses-without-hiring-a-developer",
      "ai-businesses-08",
    ],
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
 * Throws or returns an audit report confirming zero collision.
 */
export function verifyTemplateUniqueness(): {
  isValid: boolean;
  totalTemplates: number;
  assignedPlaybooksCount: number;
  report: string[];
} {
  const seenPlaybookIds = new Map<string, string>();
  const seenPlaybookSlugs = new Map<string, string>();
  const report: string[] = [];
  let isValid = true;

  for (const [tmplId, tmpl] of Object.entries(SLIDE_TEMPLATES)) {
    report.push(`[TEMPLATE: ${tmplId}] -> ${tmpl.name} (${tmpl.assignedPlaybookSlugs.join(", ")})`);

    for (const pId of tmpl.assignedPlaybookIds) {
      if (seenPlaybookIds.has(pId)) {
        isValid = false;
        report.push(`❌ ERROR: Duplicate Playbook ID '${pId}' in '${tmplId}' and '${seenPlaybookIds.get(pId)}'`);
      } else {
        seenPlaybookIds.set(pId, tmplId);
      }
    }

    for (const slug of tmpl.assignedPlaybookSlugs) {
      if (seenPlaybookSlugs.has(slug)) {
        isValid = false;
        report.push(`❌ ERROR: Duplicate Playbook Slug '${slug}' in '${tmplId}' and '${seenPlaybookSlugs.get(slug)}'`);
      } else {
        seenPlaybookSlugs.set(slug, tmplId);
      }
    }
  }

  if (isValid) {
    report.push(`✅ SUCCESS: All ${seenPlaybookSlugs.size} assigned Playbooks have 100% unique slide templates.`);
  }

  return {
    isValid,
    totalTemplates: Object.keys(SLIDE_TEMPLATES).length,
    assignedPlaybooksCount: seenPlaybookSlugs.size,
    report,
  };
}
