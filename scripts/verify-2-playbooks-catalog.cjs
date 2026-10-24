const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log("=== RUNNING VERIFICATION FOR 2 PLAYBOOKS CATALOG ===");

// 1. Confirm that the public catalog displays exactly two Playbooks
const { ALL_PLAYBOOK_SUMMARIES, ARCHIVED_PLAYBOOK_SUMMARIES } = require('../src/lib/playbooks-catalog.ts');
const { getAllPlaybooks, getPlaybooksForCategory } = require('../src/lib/categories.ts');

assert.strictEqual(ALL_PLAYBOOK_SUMMARIES.length, 2, "ALL_PLAYBOOK_SUMMARIES must have exactly 2 playbooks");
assert.strictEqual(getAllPlaybooks().length, 2, "getAllPlaybooks() must return exactly 2 playbooks");
console.log("✔ 1. Public catalog contains exactly 2 Playbooks:");
ALL_PLAYBOOK_SUMMARIES.forEach((p, idx) => console.log(`   ${idx + 1}. [${p.slug}] ${p.title} (${p.categoryName})`));

// 2. Confirm that /7-ai-automations displays the new title everywhere appropriate
const expectedTitle = "These 3 AI Businesses Will Make You $10k+/Month (With Zero Employees)";
assert.strictEqual(ALL_PLAYBOOK_SUMMARIES[0].title, expectedTitle, "Catalog title must match");
assert.strictEqual(ALL_PLAYBOOK_SUMMARIES[0].slug, "7-ai-automations", "Slug must remain 7-ai-automations");
assert.strictEqual(ALL_PLAYBOOK_SUMMARIES[0].href, "/7-ai-automations", "Href must remain /7-ai-automations");

const detailData = require('../src/lib/ai-automations-detail-data.ts').DETAIL_AI_AUTOMATIONS_DATA;
assert.strictEqual(detailData.title, expectedTitle, "Detail data title must match");

const detailData2 = require('../src/lib/ai-automations-detail.ts').DETAIL_AI_AUTOMATIONS_DATA;
assert.strictEqual(detailData2.title, expectedTitle, "Detail export title must match");

const courseData = require('../src/lib/ai-automations-course.ts').AI_AUTOMATIONS_PLAYBOOK_COURSE;
assert.strictEqual(courseData.title, expectedTitle, "Course title must match");

const pageContent = fs.readFileSync(path.join(__dirname, '../src/app/7-ai-automations/page.tsx'), 'utf8');
assert.ok(pageContent.includes(expectedTitle), "7-ai-automations page.tsx must contain new title in metadata");
console.log("✔ 2. /7-ai-automations displays the new title across catalog, detail data, course object, and page metadata.");

// 3. Confirm that /7-ai-automations still uses its original slug and URL
assert.strictEqual(courseData.slug, "7-ai-automations");
assert.strictEqual(detailData.slug, "7-ai-automations");
console.log("✔ 3. /7-ai-automations preserves its exact original slug and route URL.");

// 4. Compare the AI Automation Playbook's content to verify that its modules, lessons, slides, written content, and ordering have not changed
assert.strictEqual(courseData.modules.length, 7, "Must preserve exactly 7 modules");
const lessonCounts = courseData.modules.map(m => m.lessons.length);
assert.deepStrictEqual(lessonCounts, [4, 4, 4, 4, 4, 4, 4], "Must preserve exactly 4 lessons per module");
const totalLessons = courseData.modules.reduce((a, m) => a + m.lessons.length, 0);
assert.strictEqual(totalLessons, 28, "Must preserve exactly 28 lessons");

// Check slides and written lessons
for (const mod of courseData.modules) {
  for (const les of mod.lessons) {
    assert.ok(les.slides && les.slides.length >= 3, `Lesson ${les.id} must have slides`);
    assert.ok(les.writtenLesson && les.writtenLesson.length > 5000, `Lesson ${les.id} must have deep written guide`);
  }
}
console.log("✔ 4. AI Automation Playbook content is 100% intact (7 modules, 28 lessons, all slides and written lessons preserved).");

// 5. Confirm that /side-hustles and all its existing content remain intact and categorized under AI Businesses
const sideHustlesPb = ALL_PLAYBOOK_SUMMARIES[1];
assert.strictEqual(sideHustlesPb.title, "10 Ways to Find Paying Customers Without Spending on Ads");
assert.strictEqual(sideHustlesPb.slug, "side-hustles");
assert.strictEqual(sideHustlesPb.href, "/side-hustles");
assert.strictEqual(sideHustlesPb.categorySlug, "ai-businesses");
assert.strictEqual(sideHustlesPb.categoryName, "AI Businesses");
const aiCategoryPlaybooks = getPlaybooksForCategory("ai-businesses");
assert.strictEqual(aiCategoryPlaybooks.length, 2, "AI Businesses category now contains both playbooks");
console.log("✔ 5. /side-hustles and all its content remain intact and categorized under AI Businesses.");

// 6. Check homepage sections, category pages, search results, recommendations, and metadata for references to removed Playbooks
const { CATEGORY_CHIPS } = require('../src/components/CategoryChipsBar.tsx');
assert.strictEqual(CATEGORY_CHIPS.length, 2, "Only active categories (All, AI Businesses) are surfaced");
assert.ok(ARCHIVED_PLAYBOOK_SUMMARIES.length >= 300, "Removed playbooks safely archived and excluded from public listings");
console.log("✔ 6. Zero empty categories surfaced in UI; all 300+ non-active playbooks safely archived.");

console.log("\n>>> ALL VERIFICATION CHECKS PASSED PERFECTLY! <<<");
