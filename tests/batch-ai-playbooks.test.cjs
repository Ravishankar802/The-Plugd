const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const EXPECTED_PLAYBOOKS = [
  {
    id: "ai-businesses-03",
    slug: "5-ai-agents-you-can-build-and-sell-without-training-your-own-model",
    title: "5 AI Agents You Can Build and Sell Without Training Your Own Model",
    modulesCount: 6,
    lessonsCount: 24,
    hoursOfMaterial: "5.5 hours",
    templateId: "agentic-workflow-matrix",
    component: "AgenticMatrixSlideView",
  },
  {
    id: "ai-businesses-04",
    slug: "turn-1-ai-skill-into-4-different-freelance-income-streams",
    title: "Turn 1 AI Skill Into 4 Different Freelance Income Streams",
    modulesCount: 5,
    lessonsCount: 20,
    hoursOfMaterial: "5.0 hours",
    templateId: "quadrant-revenue-stream",
    component: "QuadrantRevenueSlideView",
  },
  {
    id: "ai-businesses-05",
    slug: "the-30-day-ai-agency-blueprint-from-zero-portfolio-to-paying-clients",
    title: "The 30-Day AI Agency Blueprint: From Zero Portfolio to Paying Clients",
    modulesCount: 6,
    lessonsCount: 24,
    hoursOfMaterial: "6.0 hours",
    templateId: "agency-chronicle-calendar",
    component: "AgencyChronicleSlideView",
  },
  {
    id: "ai-businesses-06",
    slug: "12-ai-services-small-businesses-need-but-rarely-know-how-to-build",
    title: "12 AI Services Small Businesses Need but Rarely Know How to Build",
    modulesCount: 6,
    lessonsCount: 24,
    hoursOfMaterial: "5.5 hours",
    templateId: "catalog-service-index",
    component: "CatalogServiceSlideView",
  },
  {
    id: "ai-businesses-07",
    slug: "build-a-micro-saas-with-ai-in-7-days-instead-of-spending-months-coding",
    title: "Build a Micro-SaaS With AI in 7 Days Instead of Spending Months Coding",
    modulesCount: 7,
    lessonsCount: 21,
    hoursOfMaterial: "5.5 hours",
    templateId: "code-terminal-compiler",
    component: "CodeTerminalSlideView",
  },
  {
    id: "ai-businesses-08",
    slug: "sell-ai-chatbots-to-10-local-businesses-without-hiring-a-developer",
    title: "Sell AI Chatbots to 10 Local Businesses Without Hiring a Developer",
    modulesCount: 6,
    lessonsCount: 24,
    hoursOfMaterial: "5.0 hours",
    templateId: "conversational-flow-studio",
    component: "ConversationalFlowSlideView",
  },
];

test("1. Catalog integrity & exact metadata for all 6 playbooks", () => {
  const catalogContent = fs.readFileSync(
    path.join(__dirname, "../src/lib/playbooks-catalog.ts"),
    "utf8"
  );

  for (const pb of EXPECTED_PLAYBOOKS) {
    assert.ok(
      catalogContent.includes(pb.title),
      `playbooks-catalog.ts must contain exact title "${pb.title}"`
    );
    assert.ok(
      catalogContent.includes(`id: "${pb.id}"`),
      `playbooks-catalog.ts must contain id "${pb.id}"`
    );
    assert.ok(
      catalogContent.includes(`slug: "${pb.slug}"`),
      `playbooks-catalog.ts must contain slug "${pb.slug}"`
    );
    assert.ok(
      catalogContent.includes(`modulesCount: ${pb.modulesCount}`),
      `playbooks-catalog.ts must specify ${pb.modulesCount} modules for ${pb.id}`
    );
    assert.ok(
      catalogContent.includes(`lessonsCount: ${pb.lessonsCount}`),
      `playbooks-catalog.ts must specify ${pb.lessonsCount} lessons for ${pb.id}`
    );
    assert.ok(
      catalogContent.includes(`href: "/${pb.slug}"`),
      `playbooks-catalog.ts must point href to "/${pb.slug}"`
    );
  }
});

test("2. Unique PPT Template Registry guarantees 100% uniqueness", () => {
  const registryContent = fs.readFileSync(
    path.join(__dirname, "../src/lib/slide-templates/registry.ts"),
    "utf8"
  );

  const seenTemplateIds = new Set();
  const seenPlaybookSlugs = new Set();

  for (const pb of EXPECTED_PLAYBOOKS) {
    // Template ID must not be reused
    assert.ok(!seenTemplateIds.has(pb.templateId), `Duplicate templateId ${pb.templateId}`);
    seenTemplateIds.add(pb.templateId);

    // Template definition must exist in registry
    assert.ok(
      registryContent.includes(`"${pb.templateId}":`),
      `registry.ts must define template "${pb.templateId}"`
    );
    assert.ok(
      registryContent.includes(`"${pb.slug}"`),
      `registry.ts must assign slug "${pb.slug}" to template "${pb.templateId}"`
    );
    assert.ok(
      registryContent.includes(`"${pb.id}"`),
      `registry.ts must assign id "${pb.id}" to template "${pb.templateId}"`
    );

    // Ensure slug is unique
    assert.ok(!seenPlaybookSlugs.has(pb.slug), `Duplicate playbook slug ${pb.slug}`);
    seenPlaybookSlugs.add(pb.slug);
  }
});

test("3. SlideViewer dispatches to all 6 unique template components", () => {
  const slideViewerContent = fs.readFileSync(
    path.join(__dirname, "../src/components/SlideViewer.tsx"),
    "utf8"
  );

  for (const pb of EXPECTED_PLAYBOOKS) {
    assert.ok(
      slideViewerContent.includes(pb.component),
      `SlideViewer.tsx must import and render component "${pb.component}"`
    );
    assert.ok(
      slideViewerContent.includes(`template.templateId === "${pb.templateId}"`),
      `SlideViewer.tsx must branch for templateId "${pb.templateId}"`
    );

    // Verify component file exists
    const componentPath = path.join(
      __dirname,
      `../src/components/slide-templates/${pb.component}.tsx`
    );
    assert.ok(
      fs.existsSync(componentPath),
      `Component file ${pb.component}.tsx must exist`
    );
  }
});

test("4. Course registration in COURSES and playbooks-data.ts", () => {
  const playbooksDataContent = fs.readFileSync(
    path.join(__dirname, "../src/lib/playbooks-data.ts"),
    "utf8"
  );

  for (const pb of EXPECTED_PLAYBOOKS) {
    assert.ok(
      playbooksDataContent.includes(pb.slug),
      `playbooks-data.ts must register slug "${pb.slug}"`
    );
    assert.ok(
      playbooksDataContent.includes(pb.id),
      `playbooks-data.ts must register id "${pb.id}"`
    );
  }
});

test("5. Landing page routes and legacy redirects exist", () => {
  for (const pb of EXPECTED_PLAYBOOKS) {
    const pagePath = path.join(__dirname, `../src/app/${pb.slug}/page.tsx`);
    assert.ok(fs.existsSync(pagePath), `Landing page route /${pb.slug} must exist`);

    const pageContent = fs.readFileSync(pagePath, "utf8");
    assert.ok(
      pageContent.includes("PlaybookDetailView"),
      `Page /${pb.slug} must render PlaybookDetailView`
    );
    assert.ok(
      pageContent.includes(pb.title),
      `Page /${pb.slug} metadata must include exact title "${pb.title}"`
    );

    // Legacy redirect exists
    const redirectPath = path.join(__dirname, `../src/app/${pb.id}/page.tsx`);
    assert.ok(
      fs.existsSync(redirectPath),
      `Legacy redirect route /${pb.id} must exist`
    );
    const redirectContent = fs.readFileSync(redirectPath, "utf8");
    assert.ok(
      redirectContent.includes(`redirect("/${pb.slug}")`),
      `Legacy route /${pb.id} must redirect to "/${pb.slug}"`
    );
  }
});

test("6. Review phase free access remains safely active platform-wide", () => {
  const configContent = fs.readFileSync(
    path.join(__dirname, "../src/lib/config.ts"),
    "utf8"
  );
  assert.ok(
    configContent.includes("export const IS_REVIEW_PHASE_FREE_ACCESS"),
    "IS_REVIEW_PHASE_FREE_ACCESS must be exported"
  );
  assert.ok(
    configContent.includes("process.env.NEXT_PUBLIC_REVIEW_PHASE_FREE_ACCESS !== \"false\""),
    "IS_REVIEW_PHASE_FREE_ACCESS must default to true when env is not false"
  );
});
