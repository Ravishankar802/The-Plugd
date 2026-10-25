const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

// Register in-memory TypeScript transpilation and path alias resolution
const transpile = function (module, filename) {
  let code = fs.readFileSync(filename, "utf8");
  code = code.replace(/@\//g, path.resolve(__dirname, "../src") + "/");
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
require.extensions[".ts"] = transpile;
require.extensions[".tsx"] = transpile;

const EXPECTED_CATEGORIES = [
  { name: "AI Businesses", slug: "ai-businesses", expectedCount: 20 },
  { name: "E-commerce", slug: "e-commerce", expectedCount: 20 },
  { name: "Side Hustles", slug: "side-hustles", expectedCount: 20 },
  { name: "Online Income", slug: "online-income", expectedCount: 20 },
  { name: "Creator Economy", slug: "creator-economy", expectedCount: 20 },
  { name: "Personal Branding", slug: "personal-branding", expectedCount: 20 },
  { name: "Remote Work", slug: "remote-work", expectedCount: 20 },
  { name: "Lead Generation", slug: "lead-generation", expectedCount: 20 },
  { name: "Micro-SaaS", slug: "micro-saas", expectedCount: 20 },
  { name: "Online Marketplace", slug: "online-marketplace", expectedCount: 20 },
  { name: "Reselling", slug: "reselling", expectedCount: 20 },
  { name: "Paid Communities", slug: "paid-communities", expectedCount: 20 },
  { name: "Local Business", slug: "local-business", expectedCount: 20 },
  { name: "Digital Publishing", slug: "digital-publishing", expectedCount: 20 },
  { name: "Newsletter Business", slug: "newsletter-business", expectedCount: 20 },
  { name: "Dating", slug: "dating", expectedCount: 21 }, // 20 new + 1 flagship The Dating Playbook
];

test("1. All 16 categories have dedicated, clean, lowercase hyphen-separated slugs", () => {
  const { CATEGORIES, getAllCategories } = require("../src/lib/categories.ts");
  const categories = getAllCategories();

  assert.strictEqual(categories.length, 16, "Must have exactly 16 categories");

  for (let i = 0; i < EXPECTED_CATEGORIES.length; i++) {
    const expected = EXPECTED_CATEGORIES[i];
    const cat = categories[i];
    assert.ok(cat, `Category ${expected.name} must exist`);
    assert.strictEqual(cat.name, expected.name);
    assert.strictEqual(cat.slug, expected.slug);
    assert.strictEqual(cat.displayOrder, i + 1);
  }
});

test("2. getCategoryBySlug resolves each of the 16 category slugs and legacy aliases", () => {
  const { getCategoryBySlug } = require("../src/lib/categories.ts");

  for (const expected of EXPECTED_CATEGORIES) {
    const cat = getCategoryBySlug(expected.slug);
    assert.ok(cat, `getCategoryBySlug must resolve '${expected.slug}'`);
    assert.strictEqual(cat.name, expected.name);
  }

  // Alias checks
  const ecommerceAlias = getCategoryBySlug("ecommerce");
  assert.ok(ecommerceAlias, "getCategoryBySlug('ecommerce') must resolve to E-commerce");
  assert.strictEqual(ecommerceAlias.slug, "e-commerce");

  const aiAlias = getCategoryBySlug("ai-automation");
  assert.ok(aiAlias, "getCategoryBySlug('ai-automation') must resolve to AI Businesses");
  assert.strictEqual(aiAlias.slug, "ai-businesses");
});

test("3. getPlaybooksForCategory returns playbooks for active categories and 0 for empty categories", () => {
  const { getPlaybooksForCategory, getAllPlaybooks } = require("../src/lib/categories.ts");
  const { ALL_PLAYBOOK_SUMMARIES, ARCHIVED_PLAYBOOK_SUMMARIES } = require("../src/lib/playbooks-catalog.ts");

  assert.strictEqual(ALL_PLAYBOOK_SUMMARIES.length, 50, "Active public catalog must contain 50 playbooks");
  assert.strictEqual(getAllPlaybooks().length, 50, "getAllPlaybooks() must return 50 playbooks");
  assert.ok(ARCHIVED_PLAYBOOK_SUMMARIES.length >= 300, "ARCHIVED_PLAYBOOK_SUMMARIES preserves archived playbooks");

  const aiPlaybooks = getPlaybooksForCategory("ai-businesses");
  assert.strictEqual(aiPlaybooks.length, 50, "AI Businesses category has all 50 playbooks");
  assert.strictEqual(aiPlaybooks[0].title, "These 3 AI Businesses Will Make You $10k+/Month (With Zero Employees)");
  assert.strictEqual(aiPlaybooks[1].title, "10 Ways to Find Paying Customers Without Spending on Ads");

  const sideHustlesPlaybooks = getPlaybooksForCategory("side-hustles");
  assert.strictEqual(sideHustlesPlaybooks.length, 0, "Side Hustles category has 0 playbooks now that the second is under AI Businesses");

  const ecommercePlaybooks = getPlaybooksForCategory("e-commerce");
  assert.strictEqual(ecommercePlaybooks.length, 0, "Inactive categories return 0 playbooks");
});

test("4. CATEGORY_CHIPS contains All + active category (AI Businesses)", () => {
  const { CATEGORY_CHIPS, ALL_CATEGORY_CHIPS } = require("../src/components/CategoryChipsBar.tsx");

  assert.strictEqual(CATEGORY_CHIPS.length, 2, "Must have exactly 2 active chips (All, AI Businesses)");
  assert.strictEqual(CATEGORY_CHIPS[0].slug, "all");
  assert.strictEqual(CATEGORY_CHIPS[0].href, "/");
  assert.strictEqual(CATEGORY_CHIPS[1].slug, "ai-businesses");
  assert.strictEqual(CATEGORY_CHIPS[1].href, "/ai-businesses");

  assert.ok(ALL_CATEGORY_CHIPS.length >= 16, "ALL_CATEGORY_CHIPS preserves full category definitions");
});

test("5. Category Page and components adhere to UI constraints (No 'Reset filters', No 'Showing ... in ...', Has Breadcrumbs)", () => {
  const categoryPageClientContent = fs.readFileSync(
    path.resolve(__dirname, "../src/components/CategoryPageClient.tsx"),
    "utf8"
  );
  const breadcrumbContent = fs.readFileSync(
    path.resolve(__dirname, "../src/components/CategoryBreadcrumb.tsx"),
    "utf8"
  );

  // Must not contain "Reset filters"
  assert.ok(
    !categoryPageClientContent.includes("Reset filters"),
    "CategoryPageClient must NOT contain 'Reset filters'"
  );

  // Must not contain "Showing ... Playbooks in"
  assert.ok(
    !categoryPageClientContent.includes("Playbooks in"),
    "CategoryPageClient must NOT contain 'Showing ... Playbooks in ...'"
  );

  // Breadcrumb component must link to "/" for Plugd and display categoryName as non-link
  assert.ok(
    breadcrumbContent.includes('href="/"'),
    "CategoryBreadcrumb must link 'Plugd' to '/'"
  );
  assert.ok(
    breadcrumbContent.includes("{categoryName}"),
    "CategoryBreadcrumb must render {categoryName}"
  );
  assert.ok(
    !breadcrumbContent.includes('href={`/${'),
    "CategoryBreadcrumb must not link the current category item to itself"
  );
});

test("6. Playbook card hover state: subtle light grey background, darkened border, elevated shadow, blue title", () => {
  const cardContent = fs.readFileSync(
    path.resolve(__dirname, "../src/components/PlaybookFeedCard.tsx"),
    "utf8"
  );

  // Background hover state
  assert.ok(
    cardContent.includes("hover:bg-[#f7f8fa]") || cardContent.includes("hover:bg-[#F7F8FA]"),
    "Card must include subtle light grey hover background"
  );

  // Border hover state
  assert.ok(
    cardContent.includes("hover:border-[#c7c4c0]") || cardContent.includes("hover:border-"),
    "Card must strengthen border on hover"
  );

  // Title hover state
  assert.ok(
    cardContent.includes("group-hover:text-[#2563eb]"),
    "Title must retain blue hover color"
  );

  // Subtle lift
  assert.ok(
    cardContent.includes("motion-safe:hover:-translate-y-1"),
    "Card must retain subtle lift"
  );

  // Transition duration
  assert.ok(
    cardContent.includes("duration-200") || cardContent.includes("duration-150"),
    "Transition must be 150-200ms"
  );
});
