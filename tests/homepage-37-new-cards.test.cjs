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

const EXPECTED_37_TITLES = [
  "I Locked Myself In a Room Until I Built a $350,000/mo Business",
  "The 4 Levels To Getting RICH in 2023",
  "The A.I. Revolution: 8 Ways to get RICH",
  "How I turned $300 to $100,000 At 19 (My Side Hustles)",
  "How to become rich with social media (my exact playbook)",
  "How to Get Rich for Service-Based Businesses (Thank Me Later)",
  "The New Way of Making Content In The Age of AI",
  "How to Catch Up In Life (Using Logic)",
  "What Makes The Perfect Business (5 Things)",
  "How to Use AI in Your Business in 2026",
  "If You Have Multiple Interests, Please Start a One-Person Business",
  "Learn This Skill If You Want To Win In The Next 2-3 Years",
  "How To Build A $1M One-Person Business Faster With AI",
  "How To Think Like A Strategic Genius (5-Dimensional Thinking)",
  "How To Use AI Better Than 99% Of People (This Changed My Life)",
  "You're Stuck In The Matrix, Here's How You Escape",
  "You Have 5 Years to Get Rich Before AI Takes Over",
  "Investing For Beginners in 25 Minutes",
  "Laziest Ways to Make Money with AI (For Beginners)",
  "How to Use Trading 212 in 2026 (Full Investing Guide)",
  "7 Side Hustles Students Can Start In 2026",
  "Making Money Online is Easy, Actually (Just Copy Me)",
  "How to Make Your First $10,000 As a Teen (Stupid Simple)",
  "The Only Investing Video You’ll Ever Need (Start With $100)",
  "7 Proven Ways to Make Money With AI (No Experience)",
  "How to ACTUALLY Lock In (No Bullsh*t Guide)",
  "18 Years Of UGLY Business Advice In 19 Minutes",
  "Want to made god-tier money? Use this sales tactic (Made me $10M)",
  "There Are Only 3 Types Of Profitable Businesses (Pick ONE)",
  "If You Don't Understand Leadership, You'll Never Win",
  "I Built A Business With AI In 24 Hours",
  "Copy & Paste THIS Strategy To Make Your First $5,000 Online",
  "7 Remote Jobs You Can Do From Home",
  "I Asked AI To Make Me As Much Money As Possible",
  "These Are The Best Business Books To Read (7 Billionaire Books)",
  "My honest advice to someone who wants to get rich.",
  "The $30K/Month Al Faceless Shorts Method Nobody's Talking About",
];

const EXPECTED_YOUTUBE_URLS = {
  "How to become rich with social media (my exact playbook)": "https://www.youtube.com/watch?v=21flGkcZO3A",
  "How to Get Rich for Service-Based Businesses (Thank Me Later)": "https://www.youtube.com/watch?v=mRlSb0O5QNU",
  "The New Way of Making Content In The Age of AI": "https://www.youtube.com/watch?v=XsWSvz-aewA",
  "How to Catch Up In Life (Using Logic)": "https://www.youtube.com/watch?v=EonibwnAEME",
  "What Makes The Perfect Business (5 Things)": "https://www.youtube.com/watch?v=3fsJFUvA6Ts",
  "How to Use AI in Your Business in 2026": "https://www.youtube.com/watch?v=fr78adfAnuA",
  "If You Have Multiple Interests, Please Start a One-Person Business": "https://www.youtube.com/watch?v=XqS7kIWMIDE",
  "Learn This Skill If You Want To Win In The Next 2-3 Years": "https://www.youtube.com/watch?v=bWR_3Sg-H-8",
};

test('1. Total catalog contains exactly 50 playbooks (2 original + 11 from previous + 37 from current)', () => {
  const { ALL_PLAYBOOK_SUMMARIES } = require('../src/lib/playbooks-catalog.ts');
  const { getAllPlaybooks } = require('../src/lib/categories.ts');

  assert.strictEqual(ALL_PLAYBOOK_SUMMARIES.length, 50, 'Total catalog must have exactly 50 playbooks');
  assert.strictEqual(getAllPlaybooks().length, 50, 'getAllPlaybooks() must return 50 playbooks');
});

test('2. All 37 new titles match the supplied text exactly without omission', () => {
  const { ALL_PLAYBOOK_SUMMARIES } = require('../src/lib/playbooks-catalog.ts');
  const catalogTitles = ALL_PLAYBOOK_SUMMARIES.map((p) => p.title);

  assert.strictEqual(EXPECTED_37_TITLES.length, 37, 'Must have 37 titles in list');

  for (const expectedTitle of EXPECTED_37_TITLES) {
    assert.ok(
      catalogTitles.includes(expectedTitle),
      `Catalog must contain exact title: "${expectedTitle}"`
    );
  }
});

test('3. YouTube source links are stored on the exact 8 specified cards, and no invented URLs exist', () => {
  const { ALL_PLAYBOOK_SUMMARIES } = require('../src/lib/playbooks-catalog.ts');

  let countWithYoutube = 0;
  for (const p of ALL_PLAYBOOK_SUMMARIES) {
    if (EXPECTED_YOUTUBE_URLS[p.title]) {
      assert.strictEqual(
        p.sourceUrl,
        EXPECTED_YOUTUBE_URLS[p.title],
        `Card "${p.title}" must have exact YouTube sourceUrl`
      );
      countWithYoutube++;
    } else {
      assert.strictEqual(
        p.sourceUrl,
        undefined,
        `Card "${p.title}" must not have invented sourceUrl`
      );
    }
  }

  assert.strictEqual(countWithYoutube, 8, 'Exactly 8 cards must have YouTube source URLs');
});

test('4. No duplicate cards or IDs exist across the 50 playbooks', () => {
  const { ALL_PLAYBOOK_SUMMARIES } = require('../src/lib/playbooks-catalog.ts');

  const idSet = new Set();
  const slugSet = new Set();
  const titleSet = new Set();

  for (const p of ALL_PLAYBOOK_SUMMARIES) {
    assert.ok(!idSet.has(p.id), `Duplicate ID: ${p.id}`);
    assert.ok(!slugSet.has(p.slug), `Duplicate slug: ${p.slug}`);
    assert.ok(!titleSet.has(p.title), `Duplicate title: ${p.title}`);
    idSet.add(p.id);
    slugSet.add(p.slug);
    titleSet.add(p.title);
  }

  assert.strictEqual(idSet.size, 50);
  assert.strictEqual(slugSet.size, 50);
  assert.strictEqual(titleSet.size, 50);
});

test('5. All 50 cards are categorized and filtered correctly under AI Businesses', () => {
  const { ALL_PLAYBOOK_SUMMARIES } = require('../src/lib/playbooks-catalog.ts');
  const { getPlaybooksForCategory } = require('../src/lib/categories.ts');

  for (const p of ALL_PLAYBOOK_SUMMARIES) {
    assert.strictEqual(p.categorySlug, "ai-businesses");
    assert.strictEqual(p.categoryName, "AI Businesses");
  }

  const aiPlaybooks = getPlaybooksForCategory("ai-businesses");
  assert.strictEqual(aiPlaybooks.length, 50);
});

test('6. None of the 37 new entries contains generated lessons, modules, or presentations', () => {
  const { ALL_PLAYBOOK_SUMMARIES } = require('../src/lib/playbooks-catalog.ts');
  const { COURSES, getAllCourses } = require('../src/lib/playbooks-data.ts');

  const newCards = ALL_PLAYBOOK_SUMMARIES.filter((p) =>
    EXPECTED_37_TITLES.includes(p.title)
  );

  assert.strictEqual(newCards.length, 37);
  for (const card of newCards) {
    assert.strictEqual(card.modulesCount, 0, `Card "${card.title}" must have modulesCount 0`);
    assert.strictEqual(card.lessonsCount, 0, `Card "${card.title}" must have lessonsCount 0`);
    assert.strictEqual(COURSES[card.slug], undefined, `COURSES must not contain course object for ${card.slug}`);
  }

  const allCourses = getAllCourses();
  for (const course of allCourses) {
    assert.ok(
      !EXPECTED_37_TITLES.includes(course.title),
      `getAllCourses() must not contain lesson course for "${course.title}"`
    );
  }
});

test('7. No new card accidentally links to an existing Playbook\'s content', () => {
  const { ALL_PLAYBOOK_SUMMARIES } = require('../src/lib/playbooks-catalog.ts');

  const newCards = ALL_PLAYBOOK_SUMMARIES.filter((p) =>
    EXPECTED_37_TITLES.includes(p.title)
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
