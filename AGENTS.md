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

## 7. Lecture Hover Styling & Descriptive Playbook URL Slugs

### Core Rules for Lecture Link Hover:
1. **Isolated Lecture Hover Styling:** Lecture hover styling must affect only the individual lecture being hovered, never all lecture links in the same module.
2. **Implementation Requirement:** Do not place an unqualified `group` class on parent module containers that wraps multiple lecture links with `group-hover:underline`. Use dedicated `group/lesson` scoping so hover styling applies exclusively to the individual interactive lecture element.

### Core Rules for Playbook URL Slugs:
1. **Descriptive, Title-Derived Slugs:** Every Playbook must have a clean, descriptive, stable URL slug derived directly from its own title (via `slugifyTitle(title)`).
2. **Catalog-Wide Applicability:** Apply these slug rules consistently across the entire catalog and all categories, not just individual Playbooks.
3. **No Arbitrary Numbered Suffixes:** Arbitrary numbered suffixes such as `-02` or `-03` must never be used simply because a Playbook shares a category or a similar title.
4. **Collision Suffixes Only When Genuinely Necessary:** Add a numeric counter suffix (e.g. `-2`) only when genuinely necessary to resolve a slug collision between different Playbooks in the catalog.
5. **Backwards Compatibility & Stable Redirects:** Where appropriate, preserve previous URLs through redirects to their new canonical URLs so existing bookmarks and external links remain intact.

---

## 8. PPT Player Functionality, Boundary Navigation, and Dual-Format Delivery

### Core Rules for Player Interactions & Architecture:
1. **Dropdown Outside-Click Handling:** Every dropdown in any Playbook learning experience (Module and Lesson selectors) must close reliably when clicking outside, including clicks on slides, slide canvas cards, text elements, controls, and other interactive elements. Implement using capture-phase event listeners (`addEventListener("mousedown", ..., true)` and `touchstart`) alongside Escape key dismissal and mutual exclusivity.
2. **Cross-Module Boundary Navigation:** In every Playbook, Previous/Next lesson navigation must seamlessly cross module boundaries. Navigating past the last lesson of a module must open the first lesson of the next module. Navigating before the first lesson of a module must open the last lesson of the previous module. Reaching the end of a module is never the end of the Playbook; only the true final lesson of the final module exhibits completion behavior.
3. **Dual-Format Requirement:** Every Playbook must have both a full PPT slide presentation and a complete, actionable written lesson for every lesson. Neither format may be omitted, and written lessons must never be mere summaries, single sentences, or placeholders. Both formats must be switchable via the format toggle button.
4. **Player Feature Parity Across Templates:** When unique PPT slide templates are created for Playbooks, all player functionality (dropdowns, navigation, format toggling, keyboard shortcuts, swipe gestures, fullscreen, and progress tracking) must work identically and reliably across all templates. Unique visual styling or theme differentiation never exempts a template from full feature parity.

---

## 9. Mandatory Curriculum Structure Standard (6–7 Modules, Exactly 4 Lessons/Module)

Every current and future Playbook across the entire catalog must strictly adhere to the following permanent content standard:

### PLUGD PLAYBOOK CONTENT STANDARD

Every current and future Plugd Playbook must contain **6–7 modules**, with **exactly 4 lessons per module** (24–28 total lessons per Playbook). Every lesson must have both a substantive Presentation and a complementary Written Lesson.

| Requirement | Mandatory Rule |
|---|---|
| **Minimum modules** | 6 |
| **Preferred / Standard modules** | 7 |
| **Maximum modules** | 7 |
| **Lessons per module** | **Exactly 4** |
| **Total lessons per Playbook** | **24–28 lessons** |

### Core Content Depth & Quality Rules:
1. **Hard Structural Constraints:** Every Playbook must contain **6–7 modules**, and every module must contain **exactly 4 lessons** (total 24–28 lessons per Playbook).
2. **Substantive Dual-Format Content:** Every lesson must contain:
   - Full presentation slides (`slides` array with multiple substantive slides per lesson, each featuring title, subtitle, 4 detailed educational bullet points, and key takeaways).
   - In-depth written lesson (`writtenLesson` string of substantive length >2,000 characters, detailing conceptual foundations, step-by-step implementation, architectural decision matrices, worked economic calculations, production code/schemas, failure analysis tables, practical implementation exercises, and actionable takeaways).
3. **Deep, Actionable Instruction:** A title and a few lines of text do not constitute a complete lesson. Lessons must provide deep, practical, topic-specific instruction with detailed explanations, step-by-step implementation, worked examples, relevant tables, diagrams, charts, calculations, code or configuration examples where applicable, decision frameworks, templates, troubleshooting, exercises, and realistic case studies.
4. **Zero Placeholders & Zero Thin Content:** Never create thin, generic, repetitive, or filler content merely to populate the curriculum. The learner must receive enough detail to understand and apply the subject.
5. **Accuracy, Credibility & Factual Rigor:** Use factual, verifiable information; clearly label illustrative scenarios and financial assumptions; never invent results or promise earnings.
6. **Dynamic Metadata:** Module and lesson counts displayed in UI headers, catalog summaries, and detail pages must always be dynamically calculated from the verified curriculum.
7. **Programmatic Validation:** All Playbooks must pass `validateCurriculumStructure()` before publication.

---

## 10. Back to Playbook Overview Navigation & Clean Presentation UI

### Core Rules for Presentation UI and Overview Navigation:
1. **Back to Playbook Target:** The **Back to Playbook** button must always return directly to the Playbook's canonical overview page (`/${courseSlug}` or `/dating-playbook`), featuring breadcrumbs, ratings, creator info, "What you'll learn", and purchase/start access. It must never navigate to `/learn/${courseSlug}` or separate syllabus/start pages.
2. **Clean Header (No Fraction or Progress Bar):** Presentation player headers must not display lesson fractions (e.g. `1 / 1`) or horizontal progress bars beside them. The header remains dedicated to Back to Playbook, module selector, lesson selector, format toggle, fullscreen, and logout.
3. **Prohibited Technical UI Labels:** Presentation views must never render extraneous artificial labels or badges such as `EXECUTION NODE 1 OF 1`, `TOOL SCHEMA: DETERMINISTIC`, `ORCHESTRATOR: ACTIVE`, or `AUTONOMOUS AGENT STUDIO`.
4. **Footer Lesson Dots:** Slide footers must feature dynamic module lesson dots representing every lesson in the current module, with the active lesson enlarged and highlighted.

---

## Final Rule

**One canonical blueprint. One persistent registry. Hundreds of unique, complete Playbooks with 100% distinct PPT slide designs.**
