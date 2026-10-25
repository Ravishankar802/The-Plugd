const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

// Register in-memory TypeScript transpilation and path alias resolution
const transpile = function (module, filename) {
  let code = fs.readFileSync(filename, 'utf8');
  code = code.replace(/@\//g, path.resolve(__dirname, '../src') + '/');
  const result = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  });
  module._compile(result.outputText, filename);
};
require.extensions['.ts'] = transpile;
require.extensions['.tsx'] = transpile;

const EXPECTED_NEW_TITLES = [
  "Give Me 26 Minutes, I'll Give You 10,000 Hours of Claude Knowledge",
  "Give Me 28 Minutes, I'll Give You 10,000 Hours of ChatGPT Knowledge",
  "5 Proven Ways To Make Money With AI (No Experience)",
  "The Best AI Side Hustles To Start In 2026 (No Skills)",
  "Copy & Paste THIS Strategy to Make $13k/Month with AI in 2026",
  "Build A One-Person Business As A Beginner (From $0 To $10K)",
  "Laziest Way to Make Money Online in 2026 ($500/day)",
  "The Blueprint To Go From $0 To $1,000,000",
  "Your First $1M Is Simple (Here's How)",
  "The 5 Money Principles that will make anyone RICH in their 20s",
  "It's Boring, But Will Make Even Beginners Millionaires in 2026",
];

test('1. All 11 new cards appear in the homepage catalog alongside the 2 existing ones (total 13)', () => {
  const { ALL_PLAYBOOK_SUMMARIES } = require('../src/lib/playbooks-catalog.ts');
  const { getAllPlaybooks } = require('../src/lib/categories.ts');

  assert.strictEqual(ALL_PLAYBOOK_SUMMARIES.length, 13, 'Total catalog must have exactly 13 playbooks');
  assert.strictEqual(getAllPlaybooks().length, 13, 'getAllPlaybooks() must return 13 playbooks');
});

test('2. Every title matches the supplied text exactly with capitalization, punctuation, numbers, and currency symbols', () => {
  const { ALL_PLAYBOOK_SUMMARIES } = require('../src/lib/playbooks-catalog.ts');

  const catalogTitles = ALL_PLAYBOOK_SUMMARIES.map((p) => p.title);
  for (const expectedTitle of EXPECTED_NEW_TITLES) {
    assert.ok(
      catalogTitles.includes(expectedTitle),
      `Catalog must contain exact title: "${expectedTitle}"`
    );
  }
});

test('3. Both existing Playbooks remain visible, unchanged, and at the top of the directory', () => {
  const { ALL_PLAYBOOK_SUMMARIES } = require('../src/lib/playbooks-catalog.ts');

  assert.strictEqual(
    ALL_PLAYBOOK_SUMMARIES[0].title,
    "These 3 AI Businesses Will Make You $10k+/Month (With Zero Employees)"
  );
  assert.strictEqual(ALL_PLAYBOOK_SUMMARIES[0].slug, "7-ai-automations");
  assert.strictEqual(ALL_PLAYBOOK_SUMMARIES[0].href, "/7-ai-automations");

  assert.strictEqual(
    ALL_PLAYBOOK_SUMMARIES[1].title,
    "10 Ways to Find Paying Customers Without Spending on Ads"
  );
  assert.strictEqual(ALL_PLAYBOOK_SUMMARIES[1].slug, "side-hustles");
  assert.strictEqual(ALL_PLAYBOOK_SUMMARIES[1].href, "/side-hustles");
});

test('4. All 13 cards are categorized and filtered correctly under AI Businesses', () => {
  const { ALL_PLAYBOOK_SUMMARIES } = require('../src/lib/playbooks-catalog.ts');
  const { getPlaybooksForCategory } = require('../src/lib/categories.ts');

  for (const p of ALL_PLAYBOOK_SUMMARIES) {
    assert.strictEqual(p.categorySlug, "ai-businesses");
    assert.strictEqual(p.categoryName, "AI Businesses");
  }

  const aiPlaybooks = getPlaybooksForCategory("ai-businesses");
  assert.strictEqual(aiPlaybooks.length, 13);
});

test('5. No fake ratings, review counts, or bestseller badges on the 11 new cards', () => {
  const { ALL_PLAYBOOK_SUMMARIES } = require('../src/lib/playbooks-catalog.ts');

  const newCards = ALL_PLAYBOOK_SUMMARIES.filter((p) =>
    EXPECTED_NEW_TITLES.includes(p.title)
  );

  assert.strictEqual(newCards.length, 11);
  for (const card of newCards) {
    assert.strictEqual(card.rating, undefined, `Card "${card.title}" must not have fabricated rating`);
    assert.strictEqual(card.ratingCount, undefined, `Card "${card.title}" must not have fabricated ratingCount`);
    assert.notStrictEqual(card.badge, "Bestseller", `Card "${card.title}" must not claim Bestseller`);
    assert.strictEqual(card.badge, "Coming Soon", `Card "${card.title}" must have Coming Soon badge`);
  }
});

test('6. None of the 11 new entries contains generated lessons, modules, or presentation data', () => {
  const { ALL_PLAYBOOK_SUMMARIES } = require('../src/lib/playbooks-catalog.ts');
  const { COURSES, getAllCourses } = require('../src/lib/playbooks-data.ts');

  const newCards = ALL_PLAYBOOK_SUMMARIES.filter((p) =>
    EXPECTED_NEW_TITLES.includes(p.title)
  );

  for (const card of newCards) {
    assert.strictEqual(card.modulesCount, 0, `Card "${card.title}" must have modulesCount 0`);
    assert.strictEqual(card.lessonsCount, 0, `Card "${card.title}" must have lessonsCount 0`);
    assert.strictEqual(COURSES[card.slug], undefined, `COURSES must not contain course object for ${card.slug}`);
  }

  const allCourses = getAllCourses();
  for (const course of allCourses) {
    assert.ok(
      !EXPECTED_NEW_TITLES.includes(course.title),
      `getAllCourses() must not contain lesson course for "${course.title}"`
    );
  }
});

test('7. No new card accidentally links to an existing Playbook\'s content', () => {
  const { ALL_PLAYBOOK_SUMMARIES } = require('../src/lib/playbooks-catalog.ts');

  const newCards = ALL_PLAYBOOK_SUMMARIES.filter((p) =>
    EXPECTED_NEW_TITLES.includes(p.title)
  );

  for (const card of newCards) {
    assert.notStrictEqual(card.href, "/7-ai-automations");
    assert.notStrictEqual(card.href, "/side-hustles");
    assert.notStrictEqual(card.href, "/men");
    assert.notStrictEqual(card.slug, "7-ai-automations");
    assert.notStrictEqual(card.slug, "side-hustles");
    assert.ok(card.href.startsWith("/coming-soon?playbook="));
  }
});

test('8. Safe coming-soon placeholder route and card buttons handle not-yet-available state', () => {
  const cardPath = path.join(__dirname, '../src/components/PlaybookFeedCard.tsx');
  const cardCode = fs.readFileSync(cardPath, 'utf8');

  assert.ok(cardCode.includes('playbook.badge === "Coming Soon"'), 'PlaybookFeedCard must handle Coming Soon badge');
  assert.ok(cardCode.includes('In Production'), 'PlaybookFeedCard must display In Production indicator');

  const comingSoonPagePath = path.join(__dirname, '../src/app/coming-soon/page.tsx');
  assert.ok(fs.existsSync(comingSoonPagePath), 'coming-soon page must exist');
});
