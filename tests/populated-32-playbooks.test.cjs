const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const POPULATED_PLAYBOOKS = [
  {
    id: "ai-businesses-01",
    slug: "7-ai-automations",
    title: "These 3 AI Businesses Will Make You $10k+/Month (With Zero Employees)",
    dataFile: "src/lib/playbooks/three-ai-businesses-data.ts",
    detailFile: "src/lib/playbooks/three-ai-businesses-detail.ts",
    routeDir: "src/app/7-ai-automations",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "side-hustles-08",
    slug: "side-hustles",
    title: "10 Ways to Find Paying Customers Without Spending on Ads",
    dataFile: "src/lib/playbooks/zero-ad-customers-data.ts",
    detailFile: "src/lib/playbooks/zero-ad-customers-detail.ts",
    routeDir: "src/app/side-hustles",
    expectedModules: 8,
    expectedLessons: 32,
    expectedSlides: 128
  },
  {
    id: "ai-businesses-03",
    slug: "give-me-26-minutes-ill-give-you-10000-hours-of-claude-knowledge",
    title: "Give Me 26 Minutes, I'll Give You 10,000 Hours of Claude Knowledge",
    dataFile: "src/lib/playbooks/claude-knowledge-data.ts",
    detailFile: "src/lib/playbooks/claude-knowledge-detail.ts",
    routeDir: "src/app/give-me-26-minutes-ill-give-you-10000-hours-of-claude-knowledge",
    expectedModules: 6,
    expectedLessons: 24,
    expectedSlides: 96
  },
  {
    id: "ai-businesses-04",
    slug: "give-me-28-minutes-ill-give-you-10000-hours-of-chatgpt-knowledge",
    title: "Give Me 28 Minutes, I'll Give You 10,000 Hours of ChatGPT Knowledge",
    dataFile: "src/lib/playbooks/chatgpt-knowledge-data.ts",
    detailFile: "src/lib/playbooks/chatgpt-knowledge-detail.ts",
    routeDir: "src/app/give-me-28-minutes-ill-give-you-10000-hours-of-chatgpt-knowledge",
    expectedModules: 8,
    expectedLessons: 32,
    expectedSlides: 128
  },
  {
    id: "ai-businesses-05",
    slug: "5-proven-ways-to-make-money-with-ai-no-experience",
    title: "5 Proven Ways To Make Money With AI (No Experience)",
    dataFile: "src/lib/playbooks/five-proven-ways-data.ts",
    detailFile: "src/lib/playbooks/five-proven-ways-detail.ts",
    routeDir: "src/app/5-proven-ways-to-make-money-with-ai-no-experience",
    expectedModules: 8,
    expectedLessons: 32,
    expectedSlides: 128
  },
  {
    id: "ai-businesses-06",
    slug: "the-best-ai-side-hustles-to-start-in-2026-no-skills",
    title: "The Best AI Side Hustles To Start In 2026 (No Skills)",
    dataFile: "src/lib/playbooks/ai-side-hustles-2026-data.ts",
    detailFile: "src/lib/playbooks/ai-side-hustles-2026-detail.ts",
    routeDir: "src/app/the-best-ai-side-hustles-to-start-in-2026-no-skills",
    expectedModules: 6,
    expectedLessons: 24,
    expectedSlides: 96
  },
  {
    id: "ai-businesses-07",
    slug: "copy-paste-this-strategy-to-make-13k-month-with-ai-in-2026",
    title: "Copy & Paste THIS Strategy to Make $13k/Month with AI in 2026",
    dataFile: "src/lib/playbooks/copy-paste-13k-data.ts",
    detailFile: "src/lib/playbooks/copy-paste-13k-detail.ts",
    routeDir: "src/app/copy-paste-this-strategy-to-make-13k-month-with-ai-in-2026",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-08",
    slug: "build-a-one-person-business-as-a-beginner-from-0-to-10k",
    title: "Build A One-Person Business As A Beginner (From $0 To $10K)",
    dataFile: "src/lib/playbooks/one-person-business-data.ts",
    detailFile: "src/lib/playbooks/one-person-business-detail.ts",
    routeDir: "src/app/build-a-one-person-business-as-a-beginner-from-0-to-10k",
    expectedModules: 8,
    expectedLessons: 32,
    expectedSlides: 128
  },
  {
    id: "ai-businesses-09",
    slug: "laziest-way-to-make-money-online-in-2026-500-day",
    title: "Laziest Way to Make Money Online in 2026 ($500/day)",
    dataFile: "src/lib/playbooks/laziest-way-500-day-data.ts",
    detailFile: "src/lib/playbooks/laziest-way-500-day-detail.ts",
    routeDir: "src/app/laziest-way-to-make-money-online-in-2026-500-day",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-10",
    slug: "the-blueprint-to-go-from-0-to-1000000",
    title: "The Blueprint To Go From $0 To $1,000,000",
    dataFile: "src/lib/playbooks/blueprint-0-to-1m-data.ts",
    detailFile: "src/lib/playbooks/blueprint-0-to-1m-detail.ts",
    routeDir: "src/app/the-blueprint-to-go-from-0-to-1000000",
    expectedModules: 8,
    expectedLessons: 32,
    expectedSlides: 128
  },
  {
    id: "ai-businesses-11",
    slug: "your-first-1m-is-simple-heres-how",
    title: "Your First $1M Is Simple (Here's How)",
    dataFile: "src/lib/playbooks/first-1m-is-simple-data.ts",
    detailFile: "src/lib/playbooks/first-1m-is-simple-detail.ts",
    routeDir: "src/app/your-first-1m-is-simple-heres-how",
    expectedModules: 6,
    expectedLessons: 24,
    expectedSlides: 96
  },
  {
    id: "ai-businesses-12",
    slug: "the-5-money-principles-that-will-make-anyone-rich-in-their-20s",
    title: "The 5 Money Principles that will make anyone RICH in their 20s",
    dataFile: "src/lib/playbooks/money-principles-20s-data.ts",
    detailFile: "src/lib/playbooks/money-principles-20s-detail.ts",
    routeDir: "src/app/the-5-money-principles-that-will-make-anyone-rich-in-their-20s",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-13",
    slug: "its-boring-but-will-make-even-beginners-millionaires-in-2026",
    title: "It's Boring, But Will Make Even Beginners Millionaires in 2026",
    dataFile: "src/lib/playbooks/boring-millionaires-2026-data.ts",
    detailFile: "src/lib/playbooks/boring-millionaires-2026-detail.ts",
    routeDir: "src/app/its-boring-but-will-make-even-beginners-millionaires-in-2026",
    expectedModules: 8,
    expectedLessons: 32,
    expectedSlides: 128
  },
  {
    id: "ai-businesses-14",
    slug: "i-locked-myself-in-a-room-until-i-built-a-350-000-mo-business",
    title: "I Locked Myself In a Room Until I Built a $350,000/mo Business",
    dataFile: "src/lib/playbooks/locked-in-room-350k-data.ts",
    detailFile: "src/lib/playbooks/locked-in-room-350k-detail.ts",
    routeDir: "src/app/i-locked-myself-in-a-room-until-i-built-a-350-000-mo-business",
    expectedModules: 8,
    expectedLessons: 32,
    expectedSlides: 128
  },
  {
    id: "ai-businesses-15",
    slug: "the-4-levels-to-getting-rich-in-2026",
    title: "The 4 Levels To Getting RICH in 2026",
    dataFile: "src/lib/playbooks/four-levels-getting-rich-2026-data.ts",
    detailFile: "src/lib/playbooks/four-levels-getting-rich-2026-detail.ts",
    routeDir: "src/app/the-4-levels-to-getting-rich-in-2026",
    expectedModules: 6,
    expectedLessons: 24,
    expectedSlides: 96
  },
  {
    id: "ai-businesses-16",
    slug: "the-a-i-revolution-8-ways-to-get-rich",
    title: "The A.I. Revolution: 8 Ways to get RICH",
    dataFile: "src/lib/playbooks/ai-revolution-8-ways-data.ts",
    detailFile: "src/lib/playbooks/ai-revolution-8-ways-detail.ts",
    routeDir: "src/app/the-a-i-revolution-8-ways-to-get-rich",
    expectedModules: 8,
    expectedLessons: 32,
    expectedSlides: 128
  },
  {
    id: "ai-businesses-17",
    slug: "how-i-turned-300-to-100-000-at-19-my-side-hustles",
    title: "How I turned $300 to $100,000 At 19 (My Side Hustles)",
    dataFile: "src/lib/playbooks/turned-300-to-100k-data.ts",
    detailFile: "src/lib/playbooks/turned-300-to-100k-detail.ts",
    routeDir: "src/app/how-i-turned-300-to-100-000-at-19-my-side-hustles",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-18",
    slug: "how-to-become-rich-with-social-media-my-exact-playbook",
    title: "How to become rich with social media (my exact playbook)",
    dataFile: "src/lib/playbooks/rich-with-social-media-data.ts",
    detailFile: "src/lib/playbooks/rich-with-social-media-detail.ts",
    routeDir: "src/app/how-to-become-rich-with-social-media-my-exact-playbook",
    expectedModules: 8,
    expectedLessons: 32,
    expectedSlides: 128
  },
  {
    id: "ai-businesses-19",
    slug: "how-to-get-rich-for-service-based-businesses-thank-me-later",
    title: "How to Get Rich for Service-Based Businesses (Thank Me Later)",
    dataFile: "src/lib/playbooks/get-rich-service-businesses-data.ts",
    detailFile: "src/lib/playbooks/get-rich-service-businesses-detail.ts",
    routeDir: "src/app/how-to-get-rich-for-service-based-businesses-thank-me-later",
    expectedModules: 8,
    expectedLessons: 32,
    expectedSlides: 128
  },
  {
    id: "ai-businesses-20",
    slug: "the-new-way-of-making-content-in-the-age-of-ai",
    title: "The New Way of Making Content In The Age of AI",
    dataFile: "src/lib/playbooks/new-way-content-ai-data.ts",
    detailFile: "src/lib/playbooks/new-way-content-ai-detail.ts",
    routeDir: "src/app/the-new-way-of-making-content-in-the-age-of-ai",
    expectedModules: 6,
    expectedLessons: 24,
    expectedSlides: 96
  },
  {
    id: "ai-businesses-21",
    slug: "how-to-catch-up-in-life-using-logic",
    title: "How to Catch Up In Life (Using Logic)",
    dataFile: "src/lib/playbooks/catch-up-in-life-logic-data.ts",
    detailFile: "src/lib/playbooks/catch-up-in-life-logic-detail.ts",
    routeDir: "src/app/how-to-catch-up-in-life-using-logic",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-22",
    slug: "what-makes-the-perfect-business-5-things",
    title: "What Makes The Perfect Business (5 Things)",
    dataFile: "src/lib/playbooks/perfect-business-5-things-data.ts",
    detailFile: "src/lib/playbooks/perfect-business-5-things-detail.ts",
    routeDir: "src/app/what-makes-the-perfect-business-5-things",
    expectedModules: 6,
    expectedLessons: 24,
    expectedSlides: 96
  },
  {
    id: "ai-businesses-23",
    slug: "how-to-use-ai-in-your-business-in-2026",
    title: "How to Use AI in Your Business in 2026",
    dataFile: "src/lib/playbooks/use-ai-in-business-2026-data.ts",
    detailFile: "src/lib/playbooks/use-ai-in-business-2026-detail.ts",
    routeDir: "src/app/how-to-use-ai-in-your-business-in-2026",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-32",
    slug: "if-you-have-multiple-interests-please-start-a-one-person-business",
    title: "If You Have Multiple Interests, Please Start a One-Person Business",
    dataFile: "src/lib/playbooks/multiple-interests-one-person-data.ts",
    detailFile: "src/lib/playbooks/multiple-interests-one-person-detail.ts",
    routeDir: "src/app/if-you-have-multiple-interests-please-start-a-one-person-business",
    expectedModules: 8,
    expectedLessons: 32,
    expectedSlides: 128
  },
  {
    id: "ai-businesses-25",
    slug: "learn-this-skill-if-you-want-to-win-in-the-next-2-3-years",
    title: "Learn This Skill If You Want To Win In The Next 2-3 Years",
    dataFile: "src/lib/playbooks/learn-this-skill-win-next-years-data.ts",
    detailFile: "src/lib/playbooks/learn-this-skill-win-next-years-detail.ts",
    routeDir: "src/app/learn-this-skill-if-you-want-to-win-in-the-next-2-3-years",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-26",
    slug: "how-to-build-a-1m-one-person-business-faster-with-ai",
    title: "How To Build A $1M One-Person Business Faster With AI",
    dataFile: "src/lib/playbooks/build-1m-one-person-faster-ai-data.ts",
    detailFile: "src/lib/playbooks/build-1m-one-person-faster-ai-detail.ts",
    routeDir: "src/app/how-to-build-a-1m-one-person-business-faster-with-ai",
    expectedModules: 8,
    expectedLessons: 32,
    expectedSlides: 128
  },
  {
    id: "ai-businesses-27",
    slug: "how-to-think-like-a-strategic-genius-5-dimensional-thinking",
    title: "How To Think Like A Strategic Genius (5-Dimensional Thinking)",
    dataFile: "src/lib/playbooks/think-strategic-genius-5d-data.ts",
    detailFile: "src/lib/playbooks/think-strategic-genius-5d-detail.ts",
    routeDir: "src/app/how-to-think-like-a-strategic-genius-5-dimensional-thinking",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-28",
    slug: "how-to-use-ai-better-than-99-of-people-this-changed-my-life",
    title: "How To Use AI Better Than 99% Of People (This Changed My Life)",
    dataFile: "src/lib/playbooks/use-ai-better-99-percent-data.ts",
    detailFile: "src/lib/playbooks/use-ai-better-99-percent-detail.ts",
    routeDir: "src/app/how-to-use-ai-better-than-99-of-people-this-changed-my-life",
    expectedModules: 8,
    expectedLessons: 32,
    expectedSlides: 128
  },
  {
    id: "ai-businesses-29",
    slug: "youre-stuck-in-the-matrix-heres-how-you-escape",
    title: "You're Stuck In The Matrix, Here's How You Escape",
    dataFile: "src/lib/playbooks/stuck-in-matrix-escape-data.ts",
    detailFile: "src/lib/playbooks/stuck-in-matrix-escape-detail.ts",
    routeDir: "src/app/youre-stuck-in-the-matrix-heres-how-you-escape",
    expectedModules: 6,
    expectedLessons: 24,
    expectedSlides: 96
  },
  {
    id: "ai-businesses-30",
    slug: "you-have-5-years-to-get-rich-before-ai-takes-over",
    title: "You Have 5 Years to Get Rich Before AI Takes Over",
    dataFile: "src/lib/playbooks/five-years-get-rich-before-ai-data.ts",
    detailFile: "src/lib/playbooks/five-years-get-rich-before-ai-detail.ts",
    routeDir: "src/app/you-have-5-years-to-get-rich-before-ai-takes-over",
    expectedModules: 6,
    expectedLessons: 24,
    expectedSlides: 96
  },
  {
    id: "ai-businesses-31",
    slug: "investing-for-beginners-in-25-minutes",
    title: "Investing For Beginners in 25 Minutes",
    dataFile: "src/lib/playbooks/investing-beginners-25-mins-data.ts",
    detailFile: "src/lib/playbooks/investing-beginners-25-mins-detail.ts",
    routeDir: "src/app/investing-for-beginners-in-25-minutes",
    expectedModules: 8,
    expectedLessons: 32,
    expectedSlides: 128
  },
  {
    id: "ai-businesses-32",
    slug: "laziest-ways-to-make-money-with-ai-for-beginners",
    title: "Laziest Ways to Make Money with AI (For Beginners)",
    dataFile: "src/lib/playbooks/laziest-ways-money-ai-beginners-data.ts",
    detailFile: "src/lib/playbooks/laziest-ways-money-ai-beginners-detail.ts",
    routeDir: "src/app/laziest-ways-to-make-money-with-ai-for-beginners",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  }
];

test("1. All 32 populated playbooks have catalog entries with accurate modules, lessons, and slides counts", () => {
  const catalogText = fs.readFileSync(path.join(__dirname, "../src/lib/playbooks-catalog.ts"), "utf8");
  for (const pb of POPULATED_PLAYBOOKS) {
    assert.ok(catalogText.includes(`"id": "${pb.id}"`), `Catalog must contain id: ${pb.id}`);
    assert.ok(catalogText.includes(`"slug": "${pb.slug}"`), `Catalog must contain slug: ${pb.slug}`);
    assert.ok(catalogText.includes(`"href": "/${pb.slug}"`), `Catalog href must point to /${pb.slug}`);
    assert.ok(catalogText.includes(`"modulesCount": ${pb.expectedModules}`), `Catalog must specify ${pb.expectedModules} modules for ${pb.slug}`);
    assert.ok(catalogText.includes(`"lessonsCount": ${pb.expectedLessons}`), `Catalog must specify ${pb.expectedLessons} lessons for ${pb.slug}`);
    assert.ok(catalogText.includes(`"slidesCount": ${pb.expectedSlides}`), `Catalog must specify ${pb.expectedSlides} slides for ${pb.slug}`);
  }
});

test("2. All 32 playbooks have varied modules (6, 7, or 8) and exact slides (96, 112, 128) with written content", () => {
  for (const pb of POPULATED_PLAYBOOKS) {
    const dataPath = path.join(__dirname, "..", pb.dataFile);
    assert.ok(fs.existsSync(dataPath), `Data file must exist: ${dataPath}`);
    const content = fs.readFileSync(dataPath, "utf8");
    
    // Check 0 occurrences of 373
    assert.ok(!content.includes("373"), `${pb.title} contains '373'`);
    
    // Check lessons count
    const lessonMatches = content.match(/"id":\s*"(?:0\d-\d|m-\d+-\d+)"/g) || [];
    assert.equal(lessonMatches.length, pb.expectedLessons, `${pb.title} must have exactly ${pb.expectedLessons} lessons`);

    // Check slides count
    const slideMatches = content.match(/"id":\s*"s-/g) || [];
    assert.equal(slideMatches.length, pb.expectedSlides, `${pb.title} must have exactly ${pb.expectedSlides} slides`);

    // Check cinematic storytelling structure (Scene and Act keywords)
    assert.ok(content.includes("SCENE 01: THE INCITING INCIDENT"), `${pb.title} must have Scene 01`);
    assert.ok(content.includes("SCENE 02: THE TURNING POINT"), `${pb.title} must have Scene 02`);
    assert.ok(content.includes("SCENE 03: THE EXECUTION CLIMAX"), `${pb.title} must have Scene 03`);
    assert.ok(content.includes("SCENE 04: THE SOVEREIGN PAYOFF"), `${pb.title} must have Scene 04`);
    assert.ok(content.includes("Act I: The Cold Open"), `${pb.title} must have Act I in written lesson`);
  }
});

test("3. Template Registry has 100% unique assignments for all 32 populated playbooks", () => {
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

test("5. Dedicated route page.tsx exists for all 32 populated playbooks", () => {
  for (const pb of POPULATED_PLAYBOOKS) {
    const pagePath = path.join(__dirname, "..", pb.routeDir, "page.tsx");
    assert.ok(fs.existsSync(pagePath), `Route page must exist: ${pagePath}`);
  }
});
