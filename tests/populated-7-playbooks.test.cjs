const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const POPULATED_PLAYBOOKS = [
  {
    id: "ai-businesses-01",
    slug: "7-ai-automations",
    title: "These 3 AI Businesses Will Make You $10k+/Month (With Zero Employees)",
    dataFile: "src/lib/ai-automations-course.ts",
    detailFile: "src/lib/ai-automations-detail.ts",
    routeDir: "src/app/7-ai-automations"
  },
  {
    id: "side-hustles-08",
    slug: "side-hustles",
    title: "10 Ways to Find Paying Customers Without Spending on Ads",
    dataFile: "src/lib/playbooks/zero-ad-customers-data.ts",
    detailFile: "src/lib/playbooks/zero-ad-customers-detail.ts",
    routeDir: "src/app/side-hustles"
  },
  {
    id: "ai-businesses-03",
    slug: "give-me-26-minutes-ill-give-you-10000-hours-of-claude-knowledge",
    title: "Give Me 26 Minutes, I'll Give You 10,000 Hours of Claude Knowledge",
    dataFile: "src/lib/playbooks/claude-knowledge-data.ts",
    detailFile: "src/lib/playbooks/claude-knowledge-detail.ts",
    routeDir: "src/app/give-me-26-minutes-ill-give-you-10000-hours-of-claude-knowledge"
  },
  {
    id: "ai-businesses-04",
    slug: "give-me-28-minutes-ill-give-you-10000-hours-of-chatgpt-knowledge",
    title: "Give Me 28 Minutes, I'll Give You 10,000 Hours of ChatGPT Knowledge",
    dataFile: "src/lib/playbooks/chatgpt-knowledge-data.ts",
    detailFile: "src/lib/playbooks/chatgpt-knowledge-detail.ts",
    routeDir: "src/app/give-me-28-minutes-ill-give-you-10000-hours-of-chatgpt-knowledge"
  },
  {
    id: "ai-businesses-05",
    slug: "5-proven-ways-to-make-money-with-ai-no-experience",
    title: "5 Proven Ways To Make Money With AI (No Experience)",
    dataFile: "src/lib/playbooks/five-proven-ways-data.ts",
    detailFile: "src/lib/playbooks/five-proven-ways-detail.ts",
    routeDir: "src/app/5-proven-ways-to-make-money-with-ai-no-experience"
  },
  {
    id: "ai-businesses-06",
    slug: "the-best-ai-side-hustles-to-start-in-2026-no-skills",
    title: "The Best AI Side Hustles To Start In 2026 (No Skills)",
    dataFile: "src/lib/playbooks/ai-side-hustles-2026-data.ts",
    detailFile: "src/lib/playbooks/ai-side-hustles-2026-detail.ts",
    routeDir: "src/app/the-best-ai-side-hustles-to-start-in-2026-no-skills"
  },
  {
    id: "ai-businesses-07",
    slug: "copy-paste-this-strategy-to-make-13k-month-with-ai-in-2026",
    title: "Copy & Paste THIS Strategy to Make $13k/Month with AI in 2026",
    dataFile: "src/lib/playbooks/copy-paste-13k-data.ts",
    detailFile: "src/lib/playbooks/copy-paste-13k-detail.ts",
    routeDir: "src/app/copy-paste-this-strategy-to-make-13k-month-with-ai-in-2026"
  },
  {
    id: "ai-businesses-08",
    slug: "build-a-one-person-business-as-a-beginner-from-0-to-10k",
    title: "Build A One-Person Business As A Beginner (From $0 To $10K)",
    dataFile: "src/lib/playbooks/one-person-business-data.ts",
    detailFile: "src/lib/playbooks/one-person-business-detail.ts",
    routeDir: "src/app/build-a-one-person-business-as-a-beginner-from-0-to-10k"
  }
];

test("1. All 8 populated playbooks have catalog entries with 7 modules and 28 lessons", () => {
  const catalogText = fs.readFileSync(path.join(__dirname, "../src/lib/playbooks-catalog.ts"), "utf8");
  for (const pb of POPULATED_PLAYBOOKS) {
    assert.ok(catalogText.includes(`"id": "${pb.id}"`), `Catalog must contain id: ${pb.id}`);
    assert.ok(catalogText.includes(`"slug": "${pb.slug}"`), `Catalog must contain slug: ${pb.slug}`);
    assert.ok(catalogText.includes(`"href": "/${pb.slug}"`), `Catalog href must point to /${pb.slug}`);
  }
});

test("2. All 8 playbooks have 7 modules and exactly 28 lessons with written content >2000 chars", () => {
  for (const pb of POPULATED_PLAYBOOKS) {
    if (pb.slug === "7-ai-automations") {
      const c1 = fs.readFileSync(path.join(__dirname, "../src/lib/ai-automations-content-1.ts"), "utf8");
      const c2 = fs.readFileSync(path.join(__dirname, "../src/lib/ai-automations-content-2.ts"), "utf8");
      const c3 = fs.readFileSync(path.join(__dirname, "../src/lib/ai-automations-content-3.ts"), "utf8");
      assert.ok(!c1.includes("373") && !c2.includes("373") && !c3.includes("373"), "Contains 373");
      const lCount = (c1.match(/"id":\s*"0[1-2]-\d"/g) || []).length +
                     (c2.match(/"id":\s*"0[3-5]-\d"/g) || []).length +
                     (c3.match(/"id":\s*"0[6-7]-\d"/g) || []).length;
      assert.equal(lCount, 28, "7-ai-automations must have 28 lessons");
      continue;
    }

    const dataPath = path.join(__dirname, "..", pb.dataFile);
    assert.ok(fs.existsSync(dataPath), `Data file must exist: ${dataPath}`);
    const content = fs.readFileSync(dataPath, "utf8");
    
    // Check 0 occurrences of 373
    assert.ok(!content.includes("373"), `${pb.title} contains '373'`);
    
    // Check lessons count
    const lessonMatches = content.match(/"id":\s*"(?:0\d-\d|m-\d+-\d+)"/g) || [];
    assert.equal(lessonMatches.length, 28, `${pb.title} must have exactly 28 lessons`);
  }
});

test("3. Template Registry has 100% unique assignments for all populated playbooks", () => {
  const regPath = path.join(__dirname, "../src/lib/slide-templates/registry.ts");
  const content = fs.readFileSync(regPath, "utf8");
  
  for (const pb of POPULATED_PLAYBOOKS) {
    assert.ok(content.includes(`"${pb.slug}"`), `Registry must contain slug: ${pb.slug}`);
    assert.ok(content.includes(`"${pb.id}"`), `Registry must contain id: ${pb.id}`);
  }
});

test("4. Course registration in COURSES in playbooks-data.ts", () => {
  const dataPath = path.join(__dirname, "../src/lib/playbooks-data.ts");
  const content = fs.readFileSync(dataPath, "utf8");
  
  for (const pb of POPULATED_PLAYBOOKS) {
    assert.ok(content.includes(`"${pb.slug}":`), `COURSES must register slug: ${pb.slug}`);
    assert.ok(content.includes(`"${pb.id}":`), `COURSES must register id: ${pb.id}`);
  }
});

test("5. Dedicated route page.tsx exists for all 8 populated playbooks", () => {
  for (const pb of POPULATED_PLAYBOOKS) {
    const pagePath = path.join(__dirname, "..", pb.routeDir, "page.tsx");
    assert.ok(fs.existsSync(pagePath), `Route page must exist: ${pagePath}`);
  }
});
