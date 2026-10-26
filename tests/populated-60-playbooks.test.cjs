const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const POPULATED_PLAYBOOKS = [
  {
    id: "ai-businesses-55",
    slug: "if-youre-in-your-20s-heres-how-to-win-at-anything",
    title: "If You're In Your 20s, Here's How To Win (At Anything)",
    dataFile: "src/lib/playbooks/win-in-your-20s-at-anything-data.ts",
    detailFile: "src/lib/playbooks/win-in-your-20s-at-anything-detail.ts",
    routeDir: "src/app/if-youre-in-your-20s-heres-how-to-win-at-anything",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-56",
    slug: "the-smartest-way-to-capitalize-on-the-ai-gold-rush",
    title: "The SMARTEST Way to Capitalize on the AI Gold Rush",
    dataFile: "src/lib/playbooks/smartest-way-capitalize-ai-gold-rush-data.ts",
    detailFile: "src/lib/playbooks/smartest-way-capitalize-ai-gold-rush-detail.ts",
    routeDir: "src/app/the-smartest-way-to-capitalize-on-the-ai-gold-rush",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-57",
    slug: "7-side-hustles-students-can-start-in-2027",
    title: "7 Side Hustles Students Can Start In 2027",
    dataFile: "src/lib/playbooks/seven-side-hustles-students-2027-data.ts",
    detailFile: "src/lib/playbooks/seven-side-hustles-students-2027-detail.ts",
    routeDir: "src/app/7-side-hustles-students-can-start-in-2027",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-58",
    slug: "i-sell-pdfs-with-ai-and-it-changed-my-life-revealing-everything",
    title: "I Sell PDFs With AI and It Changed My Life (Revealing Everything)",
    dataFile: "src/lib/playbooks/sell-pdfs-with-ai-changed-life-data.ts",
    detailFile: "src/lib/playbooks/sell-pdfs-with-ai-changed-life-detail.ts",
    routeDir: "src/app/i-sell-pdfs-with-ai-and-it-changed-my-life-revealing-everything",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-59",
    slug: "3-best-ai-businesses-to-start-before-2027-and-the-one-id-start-today",
    title: "3 best AI businesses to start before 2027 (and the one i'd start today)",
    dataFile: "src/lib/playbooks/three-best-ai-businesses-before-2027-data.ts",
    detailFile: "src/lib/playbooks/three-best-ai-businesses-before-2027-detail.ts",
    routeDir: "src/app/3-best-ai-businesses-to-start-before-2027-and-the-one-id-start-today",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-60",
    slug: "5-simple-apps-making-10-000-month-that-you-can-build-with-ai",
    title: "5 Simple Apps Making $10,000/month That You Can Build with AI",
    dataFile: "src/lib/playbooks/five-simple-apps-10k-month-ai-data.ts",
    detailFile: "src/lib/playbooks/five-simple-apps-10k-month-ai-detail.ts",
    routeDir: "src/app/5-simple-apps-making-10-000-month-that-you-can-build-with-ai",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
      "id": "ai-businesses-54",
      "slug": "if-i-started-over-with-0-heres-my-exact-plan-to-get-to-1m",
      "title": "If I Started Over With $0, Here\u2019s My Exact Plan to get to $1M",
      "dataFile": "src/lib/playbooks/started-over-zero-plan-to-1m-data.ts",
      "detailFile": "src/lib/playbooks/started-over-zero-plan-to-1m-detail.ts",
      "routeDir": "src/app/if-i-started-over-with-0-heres-my-exact-plan-to-get-to-1m",
      "expectedModules": 7,
      "expectedLessons": 28,
      "expectedSlides": 112
  },
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
,
  {
    id: "ai-businesses-33",
    slug: "how-to-use-trading-212-in-2026-full-investing-guide",
    title: "How to Use Trading 212 in 2026 (Full Investing Guide)",
    dataFile: "src/lib/playbooks/trading-212-investing-guide-data.ts",
    detailFile: "src/lib/playbooks/trading-212-investing-guide-detail.ts",
    routeDir: "src/app/how-to-use-trading-212-in-2026-full-investing-guide",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-34",
    slug: "7-side-hustles-students-can-start-in-2026",
    title: "7 Side Hustles Students Can Start In 2026",
    dataFile: "src/lib/playbooks/side-hustles-students-2026-data.ts",
    detailFile: "src/lib/playbooks/side-hustles-students-2026-detail.ts",
    routeDir: "src/app/7-side-hustles-students-can-start-in-2026",
    expectedModules: 8,
    expectedLessons: 32,
    expectedSlides: 128
  },
  {
    id: "ai-businesses-35",
    slug: "making-money-online-is-easy-actually-just-copy-me",
    title: "Making Money Online is Easy, Actually (Just Copy Me)",
    dataFile: "src/lib/playbooks/making-money-online-easy-copy-data.ts",
    detailFile: "src/lib/playbooks/making-money-online-easy-copy-detail.ts",
    routeDir: "src/app/making-money-online-is-easy-actually-just-copy-me",
    expectedModules: 6,
    expectedLessons: 24,
    expectedSlides: 96
  },
  {
    id: "ai-businesses-36",
    slug: "how-to-make-your-first-10-000-as-a-teen-stupid-simple",
    title: "How to Make Your First $10,000 As a Teen (Stupid Simple)",
    dataFile: "src/lib/playbooks/first-10k-teen-simple-data.ts",
    detailFile: "src/lib/playbooks/first-10k-teen-simple-detail.ts",
    routeDir: "src/app/how-to-make-your-first-10-000-as-a-teen-stupid-simple",
    expectedModules: 8,
    expectedLessons: 32,
    expectedSlides: 128
  },
  {
    id: "ai-businesses-37",
    slug: "the-only-investing-video-youll-ever-need-start-with-100",
    title: "The Only Investing Video You'll Ever Need (Start With $100)",
    dataFile: "src/lib/playbooks/only-investing-video-100-data.ts",
    detailFile: "src/lib/playbooks/only-investing-video-100-detail.ts",
    routeDir: "src/app/the-only-investing-video-youll-ever-need-start-with-100",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-38",
    slug: "7-proven-ways-to-make-money-with-ai-no-experience",
    title: "7 Proven Ways to Make Money With AI (No Experience)",
    dataFile: "src/lib/playbooks/seven-proven-ways-ai-no-exp-data.ts",
    detailFile: "src/lib/playbooks/seven-proven-ways-ai-no-exp-detail.ts",
    routeDir: "src/app/7-proven-ways-to-make-money-with-ai-no-experience",
    expectedModules: 8,
    expectedLessons: 32,
    expectedSlides: 128
  },
  {
    id: "ai-businesses-39",
    slug: "how-to-actually-lock-in-no-bullsh-t-guide",
    title: "How to ACTUALLY Lock In (No Bullsh*t Guide)",
    dataFile: "src/lib/playbooks/actually-lock-in-guide-data.ts",
    detailFile: "src/lib/playbooks/actually-lock-in-guide-detail.ts",
    routeDir: "src/app/how-to-actually-lock-in-no-bullsh-t-guide",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-40",
    slug: "18-years-of-ugly-business-advice-in-19-minutes",
    title: "18 Years Of UGLY Business Advice In 19 Minutes",
    dataFile: "src/lib/playbooks/eighteen-years-ugly-advice-data.ts",
    detailFile: "src/lib/playbooks/eighteen-years-ugly-advice-detail.ts",
    routeDir: "src/app/18-years-of-ugly-business-advice-in-19-minutes",
    expectedModules: 8,
    expectedLessons: 32,
    expectedSlides: 128
  },
  {
      "id": "ai-businesses-41",
      "slug": "want-to-made-god-tier-money-use-this-sales-tactic-made-me-10m",
      "title": "Want to made god-tier money? Use this sales tactic (Made me $10M)",
      "dataFile": "src/lib/playbooks/sales-tactic-god-tier-money-data.ts",
      "detailFile": "src/lib/playbooks/sales-tactic-god-tier-money-detail.ts",
      "routeDir": "src/app/want-to-made-god-tier-money-use-this-sales-tactic-made-me-10m",
      "expectedModules": 7,
      "expectedLessons": 28,
      "expectedSlides": 112
  },
  {
      "id": "ai-businesses-42",
      "slug": "there-are-only-3-types-of-profitable-businesses-pick-one",
      "title": "There Are Only 3 Types Of Profitable Businesses (Pick ONE)",
      "dataFile": "src/lib/playbooks/three-types-profitable-businesses-data.ts",
      "detailFile": "src/lib/playbooks/three-types-profitable-businesses-detail.ts",
      "routeDir": "src/app/there-are-only-3-types-of-profitable-businesses-pick-one",
      "expectedModules": 8,
      "expectedLessons": 32,
      "expectedSlides": 128
  },
  {
      "id": "ai-businesses-43",
      "slug": "if-you-dont-understand-leadership-youll-never-win",
      "title": "If You Don't Understand Leadership, You'll Never Win",
      "dataFile": "src/lib/playbooks/understand-leadership-never-win-data.ts",
      "detailFile": "src/lib/playbooks/understand-leadership-never-win-detail.ts",
      "routeDir": "src/app/if-you-dont-understand-leadership-youll-never-win",
      "expectedModules": 6,
      "expectedLessons": 24,
      "expectedSlides": 96
  },
  {
      "id": "ai-businesses-44",
      "slug": "i-built-a-business-with-ai-in-24-hours",
      "title": "I Built A Business With AI In 24 Hours",
      "dataFile": "src/lib/playbooks/built-business-ai-24-hours-data.ts",
      "detailFile": "src/lib/playbooks/built-business-ai-24-hours-detail.ts",
      "routeDir": "src/app/i-built-a-business-with-ai-in-24-hours",
      "expectedModules": 7,
      "expectedLessons": 28,
      "expectedSlides": 112
  },
  {
      "id": "ai-businesses-45",
      "slug": "copy-paste-this-strategy-to-make-your-first-5-000-online",
      "title": "Copy & Paste THIS Strategy To Make Your First $5,000 Online",
      "dataFile": "src/lib/playbooks/copy-paste-strategy-first-5k-data.ts",
      "detailFile": "src/lib/playbooks/copy-paste-strategy-first-5k-detail.ts",
      "routeDir": "src/app/copy-paste-this-strategy-to-make-your-first-5-000-online",
      "expectedModules": 8,
      "expectedLessons": 32,
      "expectedSlides": 128
  },
  {
      "id": "ai-businesses-46",
      "slug": "7-remote-jobs-you-can-do-from-home",
      "title": "7 Remote Jobs You Can Do From Home",
      "dataFile": "src/lib/playbooks/seven-remote-jobs-from-home-data.ts",
      "detailFile": "src/lib/playbooks/seven-remote-jobs-from-home-detail.ts",
      "routeDir": "src/app/7-remote-jobs-you-can-do-from-home",
      "expectedModules": 7,
      "expectedLessons": 28,
      "expectedSlides": 112
  },
  {
      "id": "ai-businesses-47",
      "slug": "i-asked-ai-to-make-me-as-much-money-as-possible",
      "title": "I Asked AI To Make Me As Much Money As Possible",
      "dataFile": "src/lib/playbooks/asked-ai-make-money-possible-data.ts",
      "detailFile": "src/lib/playbooks/asked-ai-make-money-possible-detail.ts",
      "routeDir": "src/app/i-asked-ai-to-make-me-as-much-money-as-possible",
      "expectedModules": 6,
      "expectedLessons": 24,
      "expectedSlides": 96
  },
  {
      "id": "ai-businesses-48",
      "slug": "these-are-the-best-business-books-to-read-7-billionaire-books",
      "title": "These Are The Best Business Books To Read (7 Billionaire Books)",
      "dataFile": "src/lib/playbooks/best-business-books-7-billionaires-data.ts",
      "detailFile": "src/lib/playbooks/best-business-books-7-billionaires-detail.ts",
      "routeDir": "src/app/these-are-the-best-business-books-to-read-7-billionaire-books",
      "expectedModules": 8,
      "expectedLessons": 32,
      "expectedSlides": 128
  },
  {
      "id": "ai-businesses-49",
      "slug": "my-honest-advice-to-someone-who-wants-to-get-rich",
      "title": "My honest advice to someone who wants to get rich",
      "dataFile": "src/lib/playbooks/honest-advice-want-get-rich-data.ts",
      "detailFile": "src/lib/playbooks/honest-advice-want-get-rich-detail.ts",
      "routeDir": "src/app/my-honest-advice-to-someone-who-wants-to-get-rich",
      "expectedModules": 7,
      "expectedLessons": 28,
      "expectedSlides": 112
  },
  {
      "id": "ai-businesses-50",
      "slug": "the-30k-month-al-faceless-shorts-method-nobodys-talking-about",
      "title": "The $30K/Month Al Faceless Shorts Method Nobody's Talking About",
      "dataFile": "src/lib/playbooks/faceless-shorts-30k-month-data.ts",
      "detailFile": "src/lib/playbooks/faceless-shorts-30k-month-detail.ts",
      "routeDir": "src/app/the-30k-month-al-faceless-shorts-method-nobodys-talking-about",
      "expectedModules": 8,
      "expectedLessons": 32,
      "expectedSlides": 128
  },
  {
      "id": "ai-businesses-51",
      "slug": "how-to-build-10k-websites-in-minutes-claude-ai",
      "title": "How to Build $10K Websites in Minutes (Claude AI)",
      "dataFile": "src/lib/playbooks/build-10k-websites-claude-ai-data.ts",
      "detailFile": "src/lib/playbooks/build-10k-websites-claude-ai-detail.ts",
      "routeDir": "src/app/how-to-build-10k-websites-in-minutes-claude-ai",
      "expectedModules": 7,
      "expectedLessons": 28,
      "expectedSlides": 112
  },
  {
      "id": "ai-businesses-54",
      "slug": "master-higgsfield-ai-in-20-minutes-beginner-tutorial",
      "title": "Master Higgsfield AI in 20 Minutes (Beginner Tutorial)",
      "dataFile": "src/lib/playbooks/master-higgsfield-ai-tutorial-data.ts",
      "detailFile": "src/lib/playbooks/master-higgsfield-ai-tutorial-detail.ts",
      "routeDir": "src/app/master-higgsfield-ai-in-20-minutes-beginner-tutorial",
      "expectedModules": 6,
      "expectedLessons": 24,
      "expectedSlides": 96
  }
];
test("1. All 60 populated playbooks have catalog entries with accurate modules, lessons, and slides counts", () => {
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

test("2. All 54 playbooks have varied modules (6, 7, or 8) and exact slides (96, 112, 128) with written content", () => {
  for (const pb of POPULATED_PLAYBOOKS) {
    const dataPath = path.join(__dirname, "..", pb.dataFile);
    assert.ok(fs.existsSync(dataPath), `Data file must exist: ${dataPath}`);
    const content = fs.readFileSync(dataPath, "utf8");
    
    // Check 0 occurrences of 373
    assert.ok(!content.includes("373"), `${pb.title} contains '373'`);
    
    // Check lessons count
    const lessonMatches = content.match(/"id":\s*"(?:0\d-\d|m-\d+-\d+|\d{2}-\d)"/g) || [];
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

test("3. Zero creator names in all 60 populated playbooks", () => {
  const forbiddenCreators = [
    "Alex Hormozi", "Hormozi",
    "Sebastian Ghiorghiu", "Ghiorghiu",
    "Dan Koe",
    "Iman Gadzhi", "Gadzhi",
    "Charlie Chang", "Ali Abdaal"
  ];
  
  for (const pb of POPULATED_PLAYBOOKS) {
    const dataPath = path.join(__dirname, "..", pb.dataFile);
    const content = fs.readFileSync(dataPath, "utf8");
    for (const name of forbiddenCreators) {
      const pattern = new RegExp(`\\b${name}\\b`, "i");
      assert.ok(!pattern.test(content), `${pb.title} contains forbidden creator name: ${name}`);
    }
  }
});

test("4. Course registration in COURSES in playbooks-data.ts", () => {
  const dataText = fs.readFileSync(path.join(__dirname, "../src/lib/playbooks-data.ts"), "utf8");
  for (const pb of POPULATED_PLAYBOOKS) {
    assert.ok(dataText.includes(`"${pb.slug}"`), `COURSES must register slug: ${pb.slug}`);
    assert.ok(dataText.includes(`"${pb.id}"`), `COURSES must register id: ${pb.id}`);
  }
});

test("5. Dedicated route page.tsx exists for all 60 populated playbooks", () => {
  for (const pb of POPULATED_PLAYBOOKS) {
    const pagePath = path.join(__dirname, `../src/app/${pb.slug}/page.tsx`);
    assert.ok(fs.existsSync(pagePath), `Route page.tsx must exist: ${pagePath}`);
  }
});
