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
    id: "ai-businesses-61",
    slug: "i-tried-a-100-free-ai-side-hustle-for-indians-real-results",
    title: "I Tried A 100% FREE AI Side Hustle For Indians (Real Results)",
    dataFile: "src/lib/playbooks/free-ai-side-hustle-indians-data.ts",
    detailFile: "src/lib/playbooks/free-ai-side-hustle-indians-detail.ts",
    routeDir: "src/app/i-tried-a-100-free-ai-side-hustle-for-indians-real-results",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-62",
    slug: "i-built-an-85m-ai-startup-in-5-months-heres-my-playbook",
    title: "I Built An $85M AI Startup in 5 Months (here's my playbook)",
    dataFile: "src/lib/playbooks/built-85m-ai-startup-data.ts",
    detailFile: "src/lib/playbooks/built-85m-ai-startup-detail.ts",
    routeDir: "src/app/i-built-an-85m-ai-startup-in-5-months-heres-my-playbook",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-63",
    slug: "give-me-27-minutes-and-ill-make-you-disgustingly-good-at-digital-marketing",
    title: "Give Me 27 Minutes and I'll Make You Disgustingly Good at Digital Marketing",
    dataFile: "src/lib/playbooks/give-me-27-minutes-digital-marketing-data.ts",
    detailFile: "src/lib/playbooks/give-me-27-minutes-digital-marketing-detail.ts",
    routeDir: "src/app/give-me-27-minutes-and-ill-make-you-disgustingly-good-at-digital-marketing",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-64",
    slug: "if-youre-ambitious-and-in-your-20s-or-30s-please-watch-this",
    title: "If you're ambitious and in your 20s or 30s, please watch this.",
    dataFile: "src/lib/playbooks/ambitious-in-20s-or-30s-data.ts",
    detailFile: "src/lib/playbooks/ambitious-in-20s-or-30s-detail.ts",
    routeDir: "src/app/if-youre-ambitious-and-in-your-20s-or-30s-please-watch-this",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-65",
    slug: "this-ai-business-will-make-you-10k-month-with-zero-employees",
    title: "This AI Business Will Make You $10k/Month (With Zero Employees)",
    dataFile: "src/lib/playbooks/ai-business-10k-month-zero-employees-data.ts",
    detailFile: "src/lib/playbooks/ai-business-10k-month-zero-employees-detail.ts",
    routeDir: "src/app/this-ai-business-will-make-you-10k-month-with-zero-employees",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-103",
    slug: "the-1-000-hour-1-person-ai-business",
    title: "The $1,000/hour 1-person AI business",
    dataFile: "src/lib/playbooks/the-1000-hour-1-person-ai-business-data.ts",
    detailFile: "src/lib/playbooks/the-1000-hour-1-person-ai-business-detail.ts",
    routeDir: "src/app/the-1-000-hour-1-person-ai-business",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-102",
    slug: "top-10-claude-ai-side-hustles-that-can-pay-a-full-time-income-ranked",
    title: "Top 10 Claude AI Side Hustles That Can Pay A Full-Time Income (Ranked)",
    dataFile: "src/lib/playbooks/top-10-claude-side-hustles-data.ts",
    detailFile: "src/lib/playbooks/top-10-claude-side-hustles-detail.ts",
    routeDir: "src/app/top-10-claude-ai-side-hustles-that-can-pay-a-full-time-income-ranked",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-101",
    slug: "i-tested-3-methods-to-make-1-lakh-with-ai-in-india-real-results",
    title: "I Tested 3 Methods To Make ₹1 Lakh With AI in India?(Real Results)",
    dataFile: "src/lib/playbooks/tested-3-methods-make-1-lakh-ai-india-data.ts",
    detailFile: "src/lib/playbooks/tested-3-methods-make-1-lakh-ai-india-detail.ts",
    routeDir: "src/app/i-tested-3-methods-to-make-1-lakh-with-ai-in-india-real-results",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-100",
    slug: "this-ai-side-hustle-makes-4-lakhs-month-copy-me",
    title: "This AI Side Hustle Makes 4 Lakhs/Month (Copy Me)",
    dataFile: "src/lib/playbooks/this-ai-side-hustle-makes-4-lakhs-month-copy-me-data.ts",
    detailFile: "src/lib/playbooks/this-ai-side-hustle-makes-4-lakhs-month-copy-me-detail.ts",
    routeDir: "src/app/this-ai-side-hustle-makes-4-lakhs-month-copy-me",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-99",
    slug: "when-i-understood-this-about-investing-my-life-changed",
    title: "When I Understood This About Investing. My Life Changed.",
    dataFile: "src/lib/playbooks/when-i-understood-this-about-investing-my-life-changed-data.ts",
    detailFile: "src/lib/playbooks/when-i-understood-this-about-investing-my-life-changed-detail.ts",
    routeDir: "src/app/when-i-understood-this-about-investing-my-life-changed",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-98",
    slug: "i-sold-ai-digital-products-for-7-days-100-free-tools",
    title: "I Sold AI Digital Products For 7 Days (100% FREE Tools)",
    dataFile: "src/lib/playbooks/i-sold-ai-digital-products-for-7-days-100-free-tools-data.ts",
    detailFile: "src/lib/playbooks/i-sold-ai-digital-products-for-7-days-100-free-tools-detail.ts",
    routeDir: "src/app/i-sold-ai-digital-products-for-7-days-100-free-tools",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-97",
    slug: "i-tried-a-zero-skill-ai-side-hustle-for-indians-copy-me",
    title: "I Tried A Zero Skill AI Side Hustle For Indians (Copy Me)",
    dataFile: "src/lib/playbooks/i-tried-a-zero-skill-ai-side-hustle-for-indians-copy-me-data.ts",
    detailFile: "src/lib/playbooks/i-tried-a-zero-skill-ai-side-hustle-for-indians-copy-me-detail.ts",
    routeDir: "src/app/i-tried-a-zero-skill-ai-side-hustle-for-indians-copy-me",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-96",
    slug: "in-18-minutes-youll-understand-generational-wealth",
    title: "In 18 Minutes, You'll Understand Generational Wealth",
    dataFile: "src/lib/playbooks/in-18-minutes-youll-understand-generational-wealth-data.ts",
    detailFile: "src/lib/playbooks/in-18-minutes-youll-understand-generational-wealth-detail.ts",
    routeDir: "src/app/in-18-minutes-youll-understand-generational-wealth",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-95",
    slug: "if-i-wanted-to-make-my-first-100k-in-12-months-id-do-this",
    title: "If I Wanted to Make My First $100K in 12 months, I’d Do This",
    dataFile: "src/lib/playbooks/if-i-wanted-to-make-my-first-100k-in-12-months-id-do-this-data.ts",
    detailFile: "src/lib/playbooks/if-i-wanted-to-make-my-first-100k-in-12-months-id-do-this-detail.ts",
    routeDir: "src/app/if-i-wanted-to-make-my-first-100k-in-12-months-id-do-this",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-94",
    slug: "if-you-only-read-one-money-playbook-make-it-this",
    title: "If You Only Read One Money Playbook, Make It This",
    dataFile: "src/lib/playbooks/if-you-only-read-one-money-playbook-make-it-this-data.ts",
    detailFile: "src/lib/playbooks/if-you-only-read-one-money-playbook-make-it-this-detail.ts",
    routeDir: "src/app/if-you-only-read-one-money-playbook-make-it-this",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-93",
    slug: "starting-an-ai-side-hustle-is-easy-copy-this-system",
    title: "Starting An AI Side Hustle Is EASY (Copy This System)",
    dataFile: "src/lib/playbooks/starting-an-ai-side-hustle-is-easy-copy-this-system-data.ts",
    detailFile: "src/lib/playbooks/starting-an-ai-side-hustle-is-easy-copy-this-system-detail.ts",
    routeDir: "src/app/starting-an-ai-side-hustle-is-easy-copy-this-system",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-92",
    slug: "im-broke-what-business-do-i-start",
    title: "\"I'm Broke, What Business Do I Start?\"",
    dataFile: "src/lib/playbooks/im-broke-what-business-do-i-start-data.ts",
    detailFile: "src/lib/playbooks/im-broke-what-business-do-i-start-detail.ts",
    routeDir: "src/app/im-broke-what-business-do-i-start",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-91",
    slug: "i-blew-up-a-youtube-channel-in-24-hours-with-ai",
    title: "I BLEW UP a YouTube Channel in 24 Hours with AI",
    dataFile: "src/lib/playbooks/i-blew-up-a-youtube-channel-in-24-hours-with-ai-data.ts",
    detailFile: "src/lib/playbooks/i-blew-up-a-youtube-channel-in-24-hours-with-ai-detail.ts",
    routeDir: "src/app/i-blew-up-a-youtube-channel-in-24-hours-with-ai",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-90",
    slug: "if-i-started-with-0-heres-my-exact-plan-to-100k",
    title: "If I Started With $0, Here's My Exact Plan To $100K",
    dataFile: "src/lib/playbooks/if-i-started-with-0-heres-my-exact-plan-to-100k-data.ts",
    detailFile: "src/lib/playbooks/if-i-started-with-0-heres-my-exact-plan-to-100k-detail.ts",
    routeDir: "src/app/if-i-started-with-0-heres-my-exact-plan-to-100k",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-89",
    slug: "31-years-of-wealth-knowledge-in-18-minutes",
    title: "31 Years of Wealth Knowledge in 18 Minutes",
    dataFile: "src/lib/playbooks/31-years-of-wealth-knowledge-in-18-minutes-data.ts",
    detailFile: "src/lib/playbooks/31-years-of-wealth-knowledge-in-18-minutes-detail.ts",
    routeDir: "src/app/31-years-of-wealth-knowledge-in-18-minutes",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-88",
    slug: "if-i-wanted-to-make-my-first-100k-in-2027-id-do-this",
    title: "If I Wanted to Make My First $100K in 2027, I’d Do This",
    dataFile: "src/lib/playbooks/if-i-wanted-to-make-my-first-100k-in-2027-id-do-this-data.ts",
    detailFile: "src/lib/playbooks/if-i-wanted-to-make-my-first-100k-in-2027-id-do-this-detail.ts",
    routeDir: "src/app/if-i-wanted-to-make-my-first-100k-in-2027-id-do-this",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-87",
    slug: "make-your-first-3000-online-in-90days-or-scroll-for-5-37mins",
    title: "Make your first $3,000 online in 90days (Or scroll for 5.37mins)",
    dataFile: "src/lib/playbooks/make-your-first-3000-online-in-90days-or-scroll-for-5-37mins-data.ts",
    detailFile: "src/lib/playbooks/make-your-first-3000-online-in-90days-or-scroll-for-5-37mins-detail.ts",
    routeDir: "src/app/make-your-first-3000-online-in-90days-or-scroll-for-5-37mins",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-86",
    slug: "how-to-build-a-10000-website-with-gpt-6-astra-full-tutorial",
    title: "How To Build a $10,000 Website with GPT-6 Astra (Full Tutorial)",
    dataFile: "src/lib/playbooks/how-to-build-a-10000-website-with-gpt-6-astra-full-tutorial-data.ts",
    detailFile: "src/lib/playbooks/how-to-build-a-10000-website-with-gpt-6-astra-full-tutorial-detail.ts",
    routeDir: "src/app/how-to-build-a-10000-website-with-gpt-6-astra-full-tutorial",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-85",
    slug: "how-to-make-progress-faster-than-everyone",
    title: "How to make progress faster than everyone",
    dataFile: "src/lib/playbooks/how-to-make-progress-faster-than-everyone-data.ts",
    detailFile: "src/lib/playbooks/how-to-make-progress-faster-than-everyone-detail.ts",
    routeDir: "src/app/how-to-make-progress-faster-than-everyone",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-84",
    slug: "build-a-10k-month-ai-influencer-in-9-mins",
    title: "Build a $10k/month Ai influencer in 9 mins...",
    dataFile: "src/lib/playbooks/build-a-10k-month-ai-influencer-in-9-mins-data.ts",
    detailFile: "src/lib/playbooks/build-a-10k-month-ai-influencer-in-9-mins-detail.ts",
    routeDir: "src/app/build-a-10k-month-ai-influencer-in-9-mins",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-83",
    slug: "how-i-made-16-705-83-on-whop-as-a-low-iq-21-year-old",
    title: "How I Made $16,705.83 On Whop (as a low iq 21 year old)",
    dataFile: "src/lib/playbooks/how-i-made-16-705-83-on-whop-as-a-low-iq-21-year-old-data.ts",
    detailFile: "src/lib/playbooks/how-i-made-16-705-83-on-whop-as-a-low-iq-21-year-old-detail.ts",
    routeDir: "src/app/how-i-made-16-705-83-on-whop-as-a-low-iq-21-year-old",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-82",
    slug: "its-boring-but-i-make-745-day-in-4-hours-at-22",
    title: "It's boring but i make $745/day in 4 hours at 22",
    dataFile: "src/lib/playbooks/its-boring-but-i-make-745-day-in-4-hours-at-22-data.ts",
    detailFile: "src/lib/playbooks/its-boring-but-i-make-745-day-in-4-hours-at-22-detail.ts",
    routeDir: "src/app/its-boring-but-i-make-745-day-in-4-hours-at-22",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-81",
    slug: "how-i-went-from-0-to-92k-month-at-19-my-full-story",
    title: "How I Went From $0 to $92K/Month at 19 (My Full Story)",
    dataFile: "src/lib/playbooks/how-i-went-from-0-to-92k-month-at-19-my-full-story-data.ts",
    detailFile: "src/lib/playbooks/how-i-went-from-0-to-92k-month-at-19-my-full-story-detail.ts",
    routeDir: "src/app/how-i-went-from-0-to-92k-month-at-19-my-full-story",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-80",
    slug: "this-one-book-has-the-power-to-change-your-entire-life",
    title: "This ONE Book Has The Power to Change Your ENTIRE Life",
    dataFile: "src/lib/playbooks/this-one-book-has-the-power-to-change-your-entire-life-data.ts",
    detailFile: "src/lib/playbooks/this-one-book-has-the-power-to-change-your-entire-life-detail.ts",
    routeDir: "src/app/this-one-book-has-the-power-to-change-your-entire-life",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-79",
    slug: "i-have-too-many-digital-product-ideas-35-to-steal",
    title: "I have too many digital product ideas (35+ to steal)",
    dataFile: "src/lib/playbooks/i-have-too-many-digital-product-ideas-35-to-steal-data.ts",
    detailFile: "src/lib/playbooks/i-have-too-many-digital-product-ideas-35-to-steal-detail.ts",
    routeDir: "src/app/i-have-too-many-digital-product-ideas-35-to-steal",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-78",
    slug: "how-a-faceless-channel-made-12-804-month-with-claude",
    title: "How a Faceless Channel Made $12,804/Month With Claude",
    dataFile: "src/lib/playbooks/how-a-faceless-channel-made-12-804-month-with-claude-data.ts",
    detailFile: "src/lib/playbooks/how-a-faceless-channel-made-12-804-month-with-claude-detail.ts",
    routeDir: "src/app/how-a-faceless-channel-made-12-804-month-with-claude",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-77",
    slug: "the-new-way-to-make-money-with-ai-at-night-even-if-you-have-a-9-5",
    title: "The New Way to Make Money with AI at Night (Even If You Have a 9-5)",
    dataFile: "src/lib/playbooks/the-new-way-to-make-money-with-ai-at-night-even-if-you-have-a-9-5-data.ts",
    detailFile: "src/lib/playbooks/the-new-way-to-make-money-with-ai-at-night-even-if-you-have-a-9-5-detail.ts",
    routeDir: "src/app/the-new-way-to-make-money-with-ai-at-night-even-if-you-have-a-9-5",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-76",
    slug: "how-i-built-it-400k-month-ios-app",
    title: "How I Built It: $400K/Month iOS App",
    dataFile: "src/lib/playbooks/how-i-built-it-400k-month-ios-app-data.ts",
    detailFile: "src/lib/playbooks/how-i-built-it-400k-month-ios-app-detail.ts",
    routeDir: "src/app/how-i-built-it-400k-month-ios-app",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-75",
    slug: "how-to-reinvent-yourself-in-90-days-to-become-rich-as-f-ck",
    title: "how to reinvent yourself in 90 days to become rich as f*ck",
    dataFile: "src/lib/playbooks/how-to-reinvent-yourself-in-90-days-to-become-rich-as-f-ck-data.ts",
    detailFile: "src/lib/playbooks/how-to-reinvent-yourself-in-90-days-to-become-rich-as-f-ck-detail.ts",
    routeDir: "src/app/how-to-reinvent-yourself-in-90-days-to-become-rich-as-f-ck",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-74",
    slug: "ai-agents-the-most-valuable-skill-you-can-learn-in-2027-full-course",
    title: "AI Agents: The Most Valuable Skill You Can Learn in 2027 (Full Course)",
    dataFile: "src/lib/playbooks/ai-agents-the-most-valuable-skill-you-can-learn-in-2027-data.ts",
    detailFile: "src/lib/playbooks/ai-agents-the-most-valuable-skill-you-can-learn-in-2027-detail.ts",
    routeDir: "src/app/ai-agents-the-most-valuable-skill-you-can-learn-in-2027-full-course",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-73",
    slug: "if-i-had-1-year-to-make-10m-this-is-my-plan",
    title: "If I Had 1 Year to Make $10M - This Is My Plan",
    dataFile: "src/lib/playbooks/if-i-had-1-year-to-make-10m-this-is-my-plan-data.ts",
    detailFile: "src/lib/playbooks/if-i-had-1-year-to-make-10m-this-is-my-plan-detail.ts",
    routeDir: "src/app/if-i-had-1-year-to-make-10m-this-is-my-plan",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-72",
    slug: "bro-im-begging-you-to-build-this-4-8m-product-idea",
    title: "Bro, I'm BEGGING you to build this $4.8M product idea",
    dataFile: "src/lib/playbooks/bro-im-begging-you-to-build-this-4-8m-product-idea-data.ts",
    detailFile: "src/lib/playbooks/bro-im-begging-you-to-build-this-4-8m-product-idea-detail.ts",
    routeDir: "src/app/bro-im-begging-you-to-build-this-4-8m-product-idea",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-71",
    slug: "if-i-had-to-start-a-business-from-scratch-id-do-this",
    title: "If I Had To Start a Business From Scratch, I'd Do This",
    dataFile: "src/lib/playbooks/if-i-had-to-start-a-business-from-scratch-id-do-this-data.ts",
    detailFile: "src/lib/playbooks/if-i-had-to-start-a-business-from-scratch-id-do-this-detail.ts",
    routeDir: "src/app/if-i-had-to-start-a-business-from-scratch-id-do-this",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-70",
    slug: "how-i-build-a-10cr-agency-without-any-knowledge",
    title: "How I build a 10cr Agency Without any Knowledge",
    dataFile: "src/lib/playbooks/how-i-build-a-10cr-agency-without-any-knowledge-data.ts",
    detailFile: "src/lib/playbooks/how-i-build-a-10cr-agency-without-any-knowledge-detail.ts",
    routeDir: "src/app/how-i-build-a-10cr-agency-without-any-knowledge",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-69",
    slug: "zero-to-1000-profit-with-dropshipping-using-ai-24hours",
    title: "Zero To $1,000 Profit with Dropshipping Using AI (24HOURS)",
    dataFile: "src/lib/playbooks/zero-to-1000-profit-dropshipping-ai-24hours-data.ts",
    detailFile: "src/lib/playbooks/zero-to-1000-profit-dropshipping-ai-24hours-detail.ts",
    routeDir: "src/app/zero-to-1000-profit-with-dropshipping-using-ai-24hours",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-68",
    slug: "marketing-agents-are-too-good-now",
    title: "Marketing Agents Are Too Good Now",
    dataFile: "src/lib/playbooks/marketing-agents-are-too-good-now-data.ts",
    detailFile: "src/lib/playbooks/marketing-agents-are-too-good-now-detail.ts",
    routeDir: "src/app/marketing-agents-are-too-good-now",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-67",
    slug: "claude-chatgpt-57152-in-90-days",
    title: "Claude + ChatGPT = $57,152 In 90 Days",
    dataFile: "src/lib/playbooks/claude-chatgpt-57152-in-90-days-data.ts",
    detailFile: "src/lib/playbooks/claude-chatgpt-57152-in-90-days-detail.ts",
    routeDir: "src/app/claude-chatgpt-57152-in-90-days",
    expectedModules: 7,
    expectedLessons: 28,
    expectedSlides: 112
  },
  {
    id: "ai-businesses-66",
    slug: "its-boring-but-i-make-51-day-in-1-hour-at-22",
    title: "It’s boring but I make $51/day in 1 hour at 22",
    dataFile: "src/lib/playbooks/boring-51-day-in-1-hour-data.ts",
    detailFile: "src/lib/playbooks/boring-51-day-in-1-hour-detail.ts",
    routeDir: "src/app/its-boring-but-i-make-51-day-in-1-hour-at-22",
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
    title: "5 Ways to Find Paying Customers Without Spending on Ads",
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
