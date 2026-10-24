<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# MEMORY UPDATE — PLUGD PLAYBOOK CONTENT CREATION SYSTEM & UNIQUE PPT TEMPLATE ARCHITECTURE

## 1. Objective

We have an existing catalog of approximately **300 Playbooks across 15 categories, with 20 Playbooks per category**, and the catalog may continue growing beyond 300. Creating every Playbook's content individually is time-consuming, so we have standardized the internal structure, catalog architecture, and slide-rendering framework.

Whenever provided with a Playbook title (or title + category), create the complete, production-ready Playbook using the established reference blueprint, unique PPT slide template, and persistent registry below.

---

## 2. Canonical Playbook Blueprint

- **Reference Playbook:** 7 AI Automation Tools That Could Make You $10,000+
- **URL:** https://theplugd.com/7-ai-automations

The internal Playbook page shown in the reference is the definitive blueprint for the structure, layout, design, and organization of all future Playbooks.

Replicate its overall structure and visual presentation, including:
- Playbook title, description, and introductory information
- Rating, badges, creator information, and metadata
- Pricing and purchase interface ($3 USD one-time lifetime access)
- "What you'll learn" section
- Course or Playbook inclusions
- Structured modules and lessons with accurate estimated durations
- Requirements and prerequisites
- Detailed description and supporting information (intro, key points, closing)
- Related topics, target audience, and FAQ sections
- Responsive layout, spacing, typography, borders, and interactive elements

Preserve the actual structure of the reference, adapting all content to the specific topic rather than copying the reference Playbook's text or lesson topics.

---

## 3. Mandatory Unique PPT Template for Every Playbook

**This is a critical, permanent requirement.**

Every Playbook's module lessons are presented as PowerPoint-style slides within the existing learning experience (`/learn/[playbookSlug]/[lessonId]`).

### Core Rules for PPT Slide Templates:
1. **100% Unique Design Per Playbook:** Every Playbook must have its own distinct PPT slide template/design.
2. **Catalog-Wide Applicability:** This rule applies to all 300+ existing Playbooks and every Playbook added in the future, across all categories and subjects.
3. **No Reuse:** A PPT template/design assigned to one Playbook must **never** be reused for another Playbook.
4. **Genuine Visual Distinction:** The unique design must be a genuine visual and structural distinction—not merely changing the title, body text, image, or accent color on an otherwise identical layout.
5. **Dimensional Differentiation:** Slide designs must be differentiated through:
   - Composition and layout patterns (e.g. terminal HUDs, split editorial columns, dossier files, canvas grids, telemetry dashboards)
   - Typography hierarchy (font weights, monospace labels, leading, tracking)
   - Backgrounds, textures, and visual motifs (e.g. technical dot-grids, blueprint meshes, subtle gradients, border treatments)
   - Diagrams, illustrations, and information presentation
   - Section-opening and closing slide designs
   - Interactive examples, checklists, exercises, and workflow visualizations
   - Progression between lesson concepts

Each Playbook's visual design must suit its subject and content while remaining polished, responsive, and readable on all screens.

---

## 4. Uniqueness Verification and Tracking (Persistent Registry)

Before designing any new Playbook's PPT slides:

1. **Audit Existing Templates:** Inspect the persistent template registry (`src/lib/slide-templates/registry.ts`) and existing slide-rendering implementations.
2. **Identify Existing Designs:** Check all currently assigned templates to ensure no design overlap.
3. **Create a Genuinely Distinct Template:** Author a dedicated slide theme and layout configuration tailored to the specific Playbook.
4. **Register in Persistent Registry:** Record the Playbook-to-template assignment in `src/lib/slide-templates/registry.ts`, specifying:
   - Unique `templateId`
   - Human-readable `name`
   - Detailed visual design description
   - Assigned Playbook ID and slug
   - Color palette and layout traits
5. **Run Uniqueness Verification:** Execute the programmatic verification helper (`verifyTemplateUniqueness()`) to guarantee zero duplicate assignments across the catalog.
6. **Scalability:** The registry supports indefinite catalog growth beyond 300 Playbooks with programmatic validation.

---

## 5. Default Workflow for Future Playbooks

When provided with only a Playbook title (for example: `Build a Micro-SaaS With AI in 7 Days Instead of Spending Months Coding`):

1. **Follow the Canonical Internal-Page Structure:** Mirror the layout, sections, and metadata of `/7-ai-automations`.
2. **Create Complete, Original Content:** Write comprehensive, actionable, implementation-focused curriculum tailored to the title.
3. **Structure Modules and Lessons:** Build logical progression from fundamentals to implementation, monetization, and scaling.
4. **Author Slide Content & Written Guides:** Provide rich slide decks and written lesson equivalents for every lesson.
5. **Create & Register Unique PPT Template:** Assign and implement a distinct slide template in the registry.
6. **Preserve Production Data & Identity:** Connect to existing category pages, routes, pricing, and auth without overwriting existing data.
7. **Test & Verify:** Run typechecks, build tests, access checks, checkout flow, and slide navigation.
8. **Deploy:** Commit, push to GitHub, and deploy to Vercel.

**Do not ask to explain the standard layout or slide uniqueness rule again.**

---

## 6. Production Safety & Architectural Boundaries

- Follow standard development workflow: inspect architecture -> implement content/page -> verify -> commit -> push -> deploy.
- **NEVER** run destructive database commands such as `prisma db push --accept-data-loss` without an established, safe migration plan and explicit authorization.
- Never wipe, reset, or overwrite production customer data, purchase history, or existing courses.
- Preserve all existing functionality: OTP login, Dodo checkout, complimentary access, lesson access control, progress tracking, category feeds, and search.

---

## Final Rule

**One canonical blueprint. One persistent registry. Hundreds of unique, complete Playbooks with 100% distinct PPT slide designs.**
