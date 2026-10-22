const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

// Register in-memory TypeScript transpilation and path alias resolution
require.extensions[".ts"] = function (module, filename) {
  let code = fs.readFileSync(filename, "utf8");
  code = code.replace(/@\//g, path.resolve(__dirname, "../src") + "/");
  const result = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  });
  module._compile(result.outputText, filename);
};

test("1. The original The Dating Playbook is restored in the catalog", () => {
  const { getAllPlaybooks, DATING_PLAYBOOK_SUMMARY } = require("../src/lib/categories.ts");
  const playbooks = getAllPlaybooks();

  const datingPlaybook = playbooks.find((p) => p.slug === "men" || p.id === "dating-playbook");
  assert.ok(datingPlaybook, "The Dating Playbook must be present in PLAYBOOKS");
  assert.strictEqual(datingPlaybook.title, "The Dating Playbook");
  assert.strictEqual(datingPlaybook.categorySlug, "dating");
  assert.strictEqual(datingPlaybook.price, 3);
  assert.strictEqual(datingPlaybook.href, "/men");
  assert.strictEqual(datingPlaybook.modulesCount, 10);
  assert.strictEqual(datingPlaybook.lessonsCount, 69);
  assert.strictEqual(datingPlaybook.badge, "Bestseller");
});

test("2. The Dating category contains The Dating Playbook plus all 20 new Dating Playbooks", () => {
  const { getPlaybooksForCategory } = require("../src/lib/categories.ts");
  const datingPlaybooks = getPlaybooksForCategory("dating");

  assert.strictEqual(datingPlaybooks.length, 21, "Dating category must contain exactly 21 playbooks (1 original + 20 new)");

  // 1st item is the flagship The Dating Playbook
  assert.strictEqual(datingPlaybooks[0].slug, "men");
  assert.strictEqual(datingPlaybooks[0].title, "The Dating Playbook");
  assert.strictEqual(datingPlaybooks[0].price, 3);

  // Subsequent 20 items are dating-01 through dating-20
  for (let i = 1; i <= 20; i++) {
    const numStr = String(i).padStart(2, "0");
    const expectedId = `dating-${numStr}`;
    const p = datingPlaybooks[i];
    assert.strictEqual(p.id, expectedId, `Expected ${expectedId} at position ${i}`);
    assert.strictEqual(p.categorySlug, "dating");
  }
});

test("3. Total catalog count is 321 (320 playbooks across 16 categories + 1 restored Dating Playbook)", () => {
  const { getAllPlaybooks } = require("../src/lib/categories.ts");
  const playbooks = getAllPlaybooks();
  assert.strictEqual(playbooks.length, 321);

  // Verify no duplicate IDs or slugs
  const idSet = new Set();
  const slugSet = new Set();
  for (const p of playbooks) {
    assert.ok(!idSet.has(p.id), `Duplicate playbook ID found: ${p.id}`);
    assert.ok(!slugSet.has(p.slug), `Duplicate playbook slug found: ${p.slug}`);
    idSet.add(p.id);
    slugSet.add(p.slug);
  }
});

test("4. The Dating Playbook curriculum and slide content are completely intact", () => {
  const { COURSES, DATING_PLAYBOOK_COURSE } = require("../src/lib/playbooks-data.ts");
  assert.ok(COURSES.men, "COURSES.men must exist");
  assert.strictEqual(COURSES.men.title, "The Dating Playbook");
  assert.strictEqual(COURSES.men.modules.length, 10, "Must have exactly 10 modules");

  const totalLessons = COURSES.men.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  assert.strictEqual(totalLessons, 69, "Must have exactly 69 lessons");

  // Verify first lesson has both presentation slides and written essay
  const firstModule = COURSES.men.modules[0];
  const firstLesson = firstModule.lessons[0];
  assert.strictEqual(firstLesson.id, "01-1");
  assert.ok(firstLesson.slides && firstLesson.slides.length > 0, "First lesson must have slides");
  assert.ok(firstLesson.writtenLesson && firstLesson.writtenLesson.length > 100, "First lesson must have written essay");
});
