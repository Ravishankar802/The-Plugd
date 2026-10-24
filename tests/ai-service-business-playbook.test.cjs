const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

test("1. Exact title verification in catalog and codebase", () => {
  const catalogContent = fs.readFileSync(
    path.join(__dirname, "../src/lib/playbooks-catalog.ts"),
    "utf8"
  );

  const exactExpectedTitle = "Build a $10,000/Month AI Service Business With Just 3 Core Tools";

  // Must contain exact new title
  assert.ok(
    catalogContent.includes(exactExpectedTitle),
    `playbooks-catalog.ts must contain exact title "${exactExpectedTitle}"`
  );

  // Must NOT contain old title
  assert.ok(
    !catalogContent.includes("Build a $1,000/Month AI Service Business With Just 3 Core Tools"),
    "playbooks-catalog.ts must NOT contain the old title with '$1,000/Month'"
  );
});

test("2. Detail view data and curriculum integrity", () => {
  const curriculumFile = fs.readFileSync(
    path.join(__dirname, "../src/lib/ai-service-business-curriculum.ts"),
    "utf8"
  );
  assert.ok(curriculumFile.includes("AI_SERVICE_BUSINESS_MODULES_METADATA"));

  const detailFile = fs.readFileSync(
    path.join(__dirname, "../src/lib/ai-service-business-detail.ts"),
    "utf8"
  );
  assert.ok(
    detailFile.includes('title: "Build a $10,000/Month AI Service Business With Just 3 Core Tools"'),
    "Detail data must use exact title"
  );
  assert.ok(
    detailFile.includes('id: "ai-businesses-02"'),
    "ID must be ai-businesses-02"
  );
  assert.ok(
    detailFile.includes('slug: "build-a-10000-month-ai-service-business-with-just-3-core-tools"'),
    "Slug must be clean descriptive title-based slug"
  );
  assert.ok(detailFile.includes("price: 3"), "Price must be 3");
  assert.ok(detailFile.includes("originalPrice: 9"), "Original price must be 9");
  assert.ok(detailFile.includes("modulesCount: 7"), "Must have 7 modules");
  assert.ok(detailFile.includes("lessonsCount: 28"), "Must have 28 lessons");
  assert.ok(detailFile.includes("Airtable"), "Must include Airtable tool");
  assert.ok(detailFile.includes("Claude 3.7"), "Must include Claude 3.7 tool");
  assert.ok(detailFile.includes("Make.com"), "Must include Make.com tool");
});

test("3. Course object and playbooks-data integration", () => {
  const playbooksDataFile = fs.readFileSync(
    path.join(__dirname, "../src/lib/playbooks-data.ts"),
    "utf8"
  );
  assert.ok(
    playbooksDataFile.includes("AI_SERVICE_BUSINESS_PLAYBOOK_COURSE"),
    "playbooks-data.ts must import and export AI_SERVICE_BUSINESS_PLAYBOOK_COURSE"
  );
  assert.ok(
    playbooksDataFile.includes('"build-a-10000-month-ai-service-business-with-just-3-core-tools": AI_SERVICE_BUSINESS_PLAYBOOK_COURSE'),
    "COURSES map must include canonical title-based slug"
  );
  assert.ok(
    playbooksDataFile.includes('"ai-businesses-02": AI_SERVICE_BUSINESS_PLAYBOOK_COURSE'),
    "COURSES map must retain legacy ai-businesses-02 mapping for backwards compatibility"
  );
});

test("4. Unique PPT template registry and verification", () => {
  const registryFile = fs.readFileSync(
    path.join(__dirname, "../src/lib/slide-templates/registry.ts"),
    "utf8"
  );
  assert.ok(
    registryFile.includes('"agency-revenue-os"'),
    "Registry must include 'agency-revenue-os' template"
  );
  assert.ok(
    registryFile.includes('"build-a-10000-month-ai-service-business-with-just-3-core-tools"'),
    "agency-revenue-os template must be assigned to canonical title slug"
  );
  assert.ok(
    registryFile.includes("verifyTemplateUniqueness"),
    "Registry must export verifyTemplateUniqueness"
  );

  const slideViewerFile = fs.readFileSync(
    path.join(__dirname, "../src/components/SlideViewer.tsx"),
    "utf8"
  );
  assert.ok(
    slideViewerFile.includes("getTemplateForPlaybook"),
    "SlideViewer must query getTemplateForPlaybook"
  );
  assert.ok(
    slideViewerFile.includes("AgencyRevenueSlideView"),
    "SlideViewer must render AgencyRevenueSlideView for agency-revenue-os template"
  );
});

test("5. Landing page routes: canonical title-based slug and legacy redirect", () => {
  const canonicalPagePath = path.join(
    __dirname,
    "../src/app/build-a-10000-month-ai-service-business-with-just-3-core-tools/page.tsx"
  );
  assert.ok(fs.existsSync(canonicalPagePath), "Canonical title slug landing page must exist");
  const canonicalContent = fs.readFileSync(canonicalPagePath, "utf8");
  assert.ok(
    canonicalContent.includes("AI_SERVICE_BUSINESS_DETAIL_DATA"),
    "Page must use AI_SERVICE_BUSINESS_DETAIL_DATA"
  );
  assert.ok(
    canonicalContent.includes("PlaybookDetailView"),
    "Page must render PlaybookDetailView"
  );

  const legacyPagePath = path.join(__dirname, "../src/app/ai-businesses-02/page.tsx");
  assert.ok(fs.existsSync(legacyPagePath), "Legacy route file src/app/ai-businesses-02/page.tsx must exist");
  const legacyContent = fs.readFileSync(legacyPagePath, "utf8");
  assert.ok(
    legacyContent.includes("redirect(") &&
      legacyContent.includes("/build-a-10000-month-ai-service-business-with-just-3-core-tools"),
    "Legacy /ai-businesses-02 page must redirect to canonical title-based slug"
  );
});

test("6. Isolated lecture hover styling in PlaybookDetailView", () => {
  const detailViewContent = fs.readFileSync(
    path.join(__dirname, "../src/components/PlaybookDetailView.tsx"),
    "utf8"
  );

  // Module container must NOT have unqualified 'className="group"' which causes all child lectures to underline
  assert.ok(
    !detailViewContent.includes('<div key={module.id} className="group">'),
    "Module container must NOT have 'className=\"group\"' that causes module-wide hover cascade"
  );

  // Lecture links must use scoped group/lesson
  assert.ok(
    detailViewContent.includes("group/lesson"),
    "Lecture items must use scoped 'group/lesson'"
  );
  assert.ok(
    detailViewContent.includes("group-hover/lesson:underline"),
    "Lecture text must use scoped 'group-hover/lesson:underline'"
  );
});

test("7. Dynamic course-includes metadata calculation in PlaybookDetailView", () => {
  const detailViewContent = fs.readFileSync(
    path.join(__dirname, "../src/components/PlaybookDetailView.tsx"),
    "utf8"
  );

  // Must not have hardcoded 10 modules or 69 lessons in the JSX
  assert.ok(
    !detailViewContent.includes("<span>10 structured, progressive modules</span>"),
    "PlaybookDetailView must NOT have hardcoded '10 structured, progressive modules'"
  );
  assert.ok(
    !detailViewContent.includes("<span>69 comprehensive slide &amp; text lessons</span>"),
    "PlaybookDetailView must NOT have hardcoded '69 comprehensive slide & text lessons'"
  );

  // Must dynamically compute actualModulesCount and actualLessonsCount
  assert.ok(
    detailViewContent.includes("actualModulesCount"),
    "PlaybookDetailView must dynamically compute actualModulesCount"
  );
  assert.ok(
    detailViewContent.includes("actualLessonsCount"),
    "PlaybookDetailView must dynamically compute actualLessonsCount"
  );
  assert.ok(
    detailViewContent.includes("{actualModulesCount} structured, progressive modules"),
    "PlaybookDetailView must render actualModulesCount dynamically"
  );
  assert.ok(
    detailViewContent.includes("{actualLessonsCount} comprehensive slide &amp; text lessons"),
    "PlaybookDetailView must render actualLessonsCount dynamically"
  );
});

test("8. Global free review access configuration and entitlement bypass", () => {
  const configFile = fs.readFileSync(
    path.join(__dirname, "../src/lib/config.ts"),
    "utf8"
  );
  assert.ok(
    configFile.includes("IS_REVIEW_PHASE_FREE_ACCESS"),
    "config.ts must export IS_REVIEW_PHASE_FREE_ACCESS"
  );

  const playbooksFile = fs.readFileSync(
    path.join(__dirname, "../src/lib/playbooks.ts"),
    "utf8"
  );
  assert.ok(
    playbooksFile.includes("IS_REVIEW_PHASE_FREE_ACCESS"),
    "playbooks.ts must reference IS_REVIEW_PHASE_FREE_ACCESS"
  );

  const checkoutApiFile = fs.readFileSync(
    path.join(__dirname, "../src/app/api/checkout/route.ts"),
    "utf8"
  );
  assert.ok(
    checkoutApiFile.includes("IS_REVIEW_PHASE_FREE_ACCESS"),
    "checkout route must reference IS_REVIEW_PHASE_FREE_ACCESS"
  );

  const feedCardFile = fs.readFileSync(
    path.join(__dirname, "../src/components/PlaybookFeedCard.tsx"),
    "utf8"
  );
  assert.ok(
    feedCardFile.includes("IS_REVIEW_PHASE_FREE_ACCESS"),
    "PlaybookFeedCard must reference IS_REVIEW_PHASE_FREE_ACCESS"
  );
  assert.ok(
    feedCardFile.includes("Start Learning"),
    "PlaybookFeedCard must offer 'Start Learning' during review phase"
  );

  const lessonViewerFile = fs.readFileSync(
    path.join(__dirname, "../src/app/learn/[courseSlug]/[lessonId]/page.tsx"),
    "utf8"
  );
  assert.ok(
    lessonViewerFile.includes("IS_REVIEW_PHASE_FREE_ACCESS"),
    "Lesson viewer page must bypass gate during review phase"
  );
});

test("9. Catalog-wide title slug generation without arbitrary numbered suffixes", () => {
  const catalogContent = fs.readFileSync(
    path.join(__dirname, "../src/lib/playbooks-catalog.ts"),
    "utf8"
  );

  // Must contain canonical title-derived slug for target playbook
  assert.ok(
    catalogContent.includes('slug: "build-a-10000-month-ai-service-business-with-just-3-core-tools"'),
    "playbooks-catalog.ts must contain exact title-derived slug for Build a $10,000/Month AI Service Business"
  );
  assert.ok(
    catalogContent.includes('href: "/build-a-10000-month-ai-service-business-with-just-3-core-tools"'),
    "playbooks-catalog.ts must contain exact canonical href"
  );

  // Must NOT have numbered slug in slug: "ai-businesses-02"
  assert.ok(
    !catalogContent.includes('slug: "ai-businesses-02"'),
    "playbooks-catalog.ts must NOT use numbered slug 'ai-businesses-02'"
  );
  assert.ok(
    !catalogContent.includes('slug: "ai-businesses-03"'),
    "playbooks-catalog.ts must NOT use numbered slug 'ai-businesses-03'"
  );
});
