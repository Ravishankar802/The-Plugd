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

test('1. Editorial Hero section and OrbitEmblem animation', () => {
  const homepageClientPath = path.join(__dirname, '../src/components/PlugdHomePageClient.tsx');
  const code = fs.readFileSync(homepageClientPath, 'utf8');

  // Eyebrow and serif headline
  assert.ok(code.includes('A DIRECTORY') && code.includes('2026'), 'Hero must contain A DIRECTORY · 2026 eyebrow');
  assert.ok(code.includes('font-serif') && code.includes('Plugd Playbooks'), 'Hero must contain Plugd Playbooks serif headline');
  assert.ok(
    code.includes('Practical playbooks for building AI businesses, finding customers'),
    'Hero must contain editorial description'
  );

  // Animated circular orbit emblem with motion-reduce fallback
  assert.ok(code.includes('function OrbitEmblem'), 'Must define OrbitEmblem component');
  assert.ok(code.includes('motion-reduce:animate-none'), 'OrbitEmblem must respect prefers-reduced-motion');
  assert.ok(code.includes('animate-[spin_60s_linear_infinite]'), 'OrbitEmblem must feature slow gentle rotation');
});

test('2. Header platform branding displays "Plugd Playbooks"', () => {
  const headerPath = path.join(__dirname, '../src/components/Header.tsx');
  const code = fs.readFileSync(headerPath, 'utf8');

  assert.ok(
    code.includes('Plugd Playbooks') && code.includes('variant === "platform"') || code.includes('Plugd Playbooks'),
    'Platform Header must display "Plugd Playbooks"'
  );
});

test('3. Search and filter toolbar adheres to Billion Dollar PDFs specifications', () => {
  const homepageClientPath = path.join(__dirname, '../src/components/PlugdHomePageClient.tsx');
  const code = fs.readFileSync(homepageClientPath, 'utf8');

  // Search input
  assert.ok(code.includes('placeholder="Search Playbooks..."'), 'Must include Search Playbooks... input');

  // Category filter with AI Businesses as the only active category
  assert.ok(code.includes('All Categories'), 'Category filter must include All Categories');
  assert.ok(code.includes('AI Businesses'), 'Category filter must include AI Businesses');

  // Sorting filter
  assert.ok(code.includes('Featured'), 'Sort options must include Featured');
  assert.ok(code.includes('Newest'), 'Sort options must include Newest');
  assert.ok(code.includes('Oldest'), 'Sort options must include Oldest');
  assert.ok(code.includes('A–Z'), 'Sort options must include A-Z');

  // View switcher (Grid vs List)
  assert.ok(code.includes('viewMode === "grid"'), 'Must support Grid view mode');
  assert.ok(code.includes('viewMode === "list"'), 'Must support List view mode');
  assert.ok(code.includes('PlaybookListRow'), 'Must render PlaybookListRow for list view');

  // Dynamic count calculation
  assert.ok(
    code.includes('Playbook') && code.includes('Playbooks') && code.includes('filteredAndSortedPlaybooks.length'),
    'Must dynamically compute result count'
  );
});

test('4. Old repeated category sections and trending rails are completely removed from homepage', () => {
  const homepageClientPath = path.join(__dirname, '../src/components/PlugdHomePageClient.tsx');
  const code = fs.readFileSync(homepageClientPath, 'utf8');

  assert.ok(!code.includes('Trending Playbooks'), 'Homepage must no longer render Trending Playbooks rail');
  assert.ok(!code.includes('CategoryRail'), 'Homepage must no longer render old CategoryRail sections');
});

test('5. Catalog integrity: 13 playbooks on homepage, all categorized under AI Businesses', () => {
  const { ALL_PLAYBOOK_SUMMARIES } = require('../src/lib/playbooks-catalog.ts');
  const { getPlaybooksForCategory } = require('../src/lib/categories.ts');

  assert.strictEqual(ALL_PLAYBOOK_SUMMARIES.length, 13, 'Active catalog must have exactly 13 playbooks');

  const p1 = ALL_PLAYBOOK_SUMMARIES[0];
  assert.strictEqual(p1.slug, '7-ai-automations');
  assert.strictEqual(p1.categorySlug, 'ai-businesses');
  assert.strictEqual(p1.categoryName, 'AI Businesses');

  const p2 = ALL_PLAYBOOK_SUMMARIES[1];
  assert.strictEqual(p2.slug, 'side-hustles');
  assert.strictEqual(p2.categorySlug, 'ai-businesses');
  assert.strictEqual(p2.categoryName, 'AI Businesses');
  assert.strictEqual(p2.href, '/side-hustles');

  const aiPlaybooks = getPlaybooksForCategory('ai-businesses');
  assert.strictEqual(aiPlaybooks.length, 13, 'All 13 playbooks are accessible under AI Businesses');
});
