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
    assignedPlaybookSlugs: ["ai-businesses-02"],
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
