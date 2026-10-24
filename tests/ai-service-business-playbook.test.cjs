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
    detailFile.includes('slug: "ai-businesses-02"'),
    "Slug must be ai-businesses-02"
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
    playbooksDataFile.includes('"ai-businesses-02": AI_SERVICE_BUSINESS_PLAYBOOK_COURSE'),
    "COURSES map must include ai-businesses-02"
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
    registryFile.includes('"ai-businesses-02"'),
    "agency-revenue-os template must be assigned to ai-businesses-02"
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

test("5. Landing page route /ai-businesses-02 exists", () => {
  const pagePath = path.join(__dirname, "../src/app/ai-businesses-02/page.tsx");
  assert.ok(fs.existsSync(pagePath), "Page file src/app/ai-businesses-02/page.tsx must exist");
  const content = fs.readFileSync(pagePath, "utf8");
  assert.ok(
    content.includes("AI_SERVICE_BUSINESS_DETAIL_DATA"),
    "Page must use AI_SERVICE_BUSINESS_DETAIL_DATA"
  );
  assert.ok(
    content.includes("PlaybookDetailView"),
    "Page must render PlaybookDetailView"
  );
});

test("6. Dynamic course-includes metadata calculation in PlaybookDetailView", () => {
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

test("7. Global free review access configuration and entitlement bypass", () => {
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
