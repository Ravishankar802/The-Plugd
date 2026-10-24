const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

test("1. Exact title verification in catalog and codebase", () => {
  const catalogContent = fs.readFileSync(
    path.join(__dirname, "../src/lib/playbooks-catalog.ts"),
    "utf8"
  );

  const exactExpectedTitle = "7 AI Automation Tools That Could Make You $10,000+";

  // Must contain exact new title
  assert.ok(
    catalogContent.includes(exactExpectedTitle),
    `playbooks-catalog.ts must contain exact title "${exactExpectedTitle}"`
  );

  // Must NOT contain old titles
  assert.ok(
    !catalogContent.includes("7 AI Automations That Could Make You $10,000+ Each"),
    "playbooks-catalog.ts must NOT contain the old title with 'Each'"
  );
  assert.ok(
    !catalogContent.includes("7 AI Automations You Can Sell to Businesses for ₹10,000+ Each"),
    "playbooks-catalog.ts must NOT contain the old title with ₹10,000 or 'sell to businesses'"
  );
  assert.ok(
    !catalogContent.includes("₹10,000+ Each"),
    "playbooks-catalog.ts must NOT contain '₹10,000+ Each'"
  );
});

test("2. Detail view data and curriculum integrity", async () => {
  const curriculumFile = fs.readFileSync(
    path.join(__dirname, "../src/lib/ai-automations-curriculum.ts"),
    "utf8"
  );
  assert.ok(curriculumFile.includes("AI_AUTOMATIONS_MODULES_METADATA"));

  const detailFile = fs.readFileSync(
    path.join(__dirname, "../src/lib/ai-automations-detail.ts"),
    "utf8"
  );
  assert.ok(
    detailFile.includes('title: "7 AI Automation Tools That Could Make You $10,000+"'),
    "Detail data must use exact title"
  );
  assert.ok(
    detailFile.includes('thumbnail: ""'),
    "Thumbnail must be empty string per specification"
  );
  assert.ok(detailFile.includes("price: 3"), "Price must be 3");
  assert.ok(detailFile.includes("originalPrice: 9"), "Original price must be 9");
  assert.ok(detailFile.includes("modulesCount: 9"), "Must have 9 modules");
  assert.ok(detailFile.includes("lessonsCount: 63"), "Must have 63 lessons");
  assert.ok(detailFile.includes("No coding, programming, or previous technical experience required"));
});

test("3. All 9 modules and 63 lessons exist with slides and written content", () => {
  const content1 = fs.readFileSync(path.join(__dirname, "../src/lib/ai-automations-content-1.ts"), "utf8");
  const content2 = fs.readFileSync(path.join(__dirname, "../src/lib/ai-automations-content-2.ts"), "utf8");
  const content3 = fs.readFileSync(path.join(__dirname, "../src/lib/ai-automations-content-3.ts"), "utf8");

  // Content 1: Modules 1, 2, 3 (21 lessons)
  assert.ok(content1.includes("MODULE_01_LESSONS"));
  assert.ok(content1.includes("MODULE_02_LESSONS"));
  assert.ok(content1.includes("MODULE_03_LESSONS"));

  // Content 2: Modules 4, 5, 6 (21 lessons)
  assert.ok(content2.includes("MODULE_04_LESSONS"));
  assert.ok(content2.includes("MODULE_05_LESSONS"));
  assert.ok(content2.includes("MODULE_06_LESSONS"));

  // Content 3: Modules 7, 8, 9 (21 lessons)
  assert.ok(content3.includes("MODULE_07_LESSONS"));
  assert.ok(content3.includes("MODULE_08_LESSONS"));
  assert.ok(content3.includes("MODULE_09_LESSONS"));

  // Check lesson count across files (excluding interface definition in content-1)
  const lessonMatches = (content1 + content2 + content3).match(/"learningObjective":\s*"/g) || (content1 + content2 + content3).match(/learningObjective:\s*"/g) || [];
  assert.equal(lessonMatches.length, 63, "Must contain exactly 63 extended lessons with learning objectives");

  const writtenLessonMatches = (content1 + content2 + content3).match(/"writtenLesson":\s*"/g) || (content1 + content2 + content3).match(/writtenLesson:\s*`/g) || [];
  assert.equal(writtenLessonMatches.length, 63, "Must contain exactly 63 written lessons");

  const takeawayMatches = (content1 + content2 + content3).match(/"takeaway":/g) || [];
  assert.ok(takeawayMatches.length >= 63, "Must contain at least 63 lesson-level takeaways");
});

test("4. Course registration in COURSES and getAllCourses()", () => {
  const playbooksDataFile = fs.readFileSync(
    path.join(__dirname, "../src/lib/playbooks-data.ts"),
    "utf8"
  );

  assert.ok(playbooksDataFile.includes("AI_AUTOMATIONS_PLAYBOOK_COURSE"));
  assert.ok(playbooksDataFile.includes('"7-ai-automations": AI_AUTOMATIONS_PLAYBOOK_COURSE'));
  assert.ok(playbooksDataFile.includes('"ai-businesses-01": AI_AUTOMATIONS_PLAYBOOK_COURSE'));
  assert.ok(playbooksDataFile.includes("getAllCourses(): Course[]"));
});

test("5. Detail page route and redirect exist", () => {
  assert.ok(
    fs.existsSync(path.join(__dirname, "../src/app/7-ai-automations/page.tsx")),
    "src/app/7-ai-automations/page.tsx must exist"
  );
  assert.ok(
    fs.existsSync(path.join(__dirname, "../src/app/ai-businesses-01/page.tsx")),
    "src/app/ai-businesses-01/page.tsx must exist"
  );

  const detailPage = fs.readFileSync(
    path.join(__dirname, "../src/app/7-ai-automations/page.tsx"),
    "utf8"
  );
  assert.ok(detailPage.includes("AI_AUTOMATIONS_DETAIL_DATA"));
  assert.ok(detailPage.includes("7 AI Automation Tools That Could Make You $10,000+"));
});

test("6. The Dating Playbook preservation", () => {
  const playbooksDataFile = fs.readFileSync(
    path.join(__dirname, "../src/lib/playbooks-data.ts"),
    "utf8"
  );

  assert.ok(playbooksDataFile.includes("DATING_PLAYBOOK_COURSE"));
  assert.ok(playbooksDataFile.includes("The Dating Playbook"));
  assert.ok(playbooksDataFile.includes("price: 3"));
  assert.ok(playbooksDataFile.includes("modulesCount: 10"));
  assert.ok(playbooksDataFile.includes("lessonsCount: 69"));
});
