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

test("1. The active catalog contains exactly 2 playbooks and excludes The Dating Playbook", () => {
  const { getAllPlaybooks, DATING_PLAYBOOK_SUMMARY } = require("../src/lib/categories.ts");
  const playbooks = getAllPlaybooks();

  assert.strictEqual(playbooks.length, 2, "Active public catalog must contain exactly 2 playbooks");
  const datingInCatalog = playbooks.find((p) => p.slug === "men" || p.id === "dating-playbook");
  assert.strictEqual(datingInCatalog, undefined, "The Dating Playbook must NOT be in active public catalog");

  // But DATING_PLAYBOOK_SUMMARY itself is preserved in code
  assert.strictEqual(DATING_PLAYBOOK_SUMMARY.title, "The Dating Playbook");
  assert.strictEqual(DATING_PLAYBOOK_SUMMARY.modulesCount, 10);
  assert.strictEqual(DATING_PLAYBOOK_SUMMARY.lessonsCount, 69);
});

test("2. The Dating category in public catalog returns 0 playbooks per catalog reduction", () => {
  const { getPlaybooksForCategory } = require("../src/lib/categories.ts");
  const datingPlaybooks = getPlaybooksForCategory("dating");

  assert.strictEqual(datingPlaybooks.length, 0, "Dating category must contain 0 active playbooks");
});

test("3. Total active catalog count is exactly 2 playbooks with unique IDs and slugs", () => {
  const { getAllPlaybooks } = require("../src/lib/categories.ts");
  const playbooks = getAllPlaybooks();
  assert.strictEqual(playbooks.length, 2, "Must contain exactly 2 playbooks");

  // Verify no duplicate IDs or slugs
  const idSet = new Set();
  const slugSet = new Set();
  for (const p of playbooks) {
    assert.ok(!idSet.has(p.id), `Duplicate ID ${p.id}`);
    assert.ok(!slugSet.has(p.slug), `Duplicate slug ${p.slug}`);
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
