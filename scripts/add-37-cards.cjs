const fs = require('fs');
const path = require('path');

const YOUTUBE_URLS = {
  "How to become rich with social media (my exact playbook)": "https://www.youtube.com/watch?v=21flGkcZO3A",
  "How to Get Rich for Service-Based Businesses (Thank Me Later)": "https://www.youtube.com/watch?v=mRlSb0O5QNU",
  "The New Way of Making Content In The Age of AI": "https://www.youtube.com/watch?v=XsWSvz-aewA",
  "How to Catch Up In Life (Using Logic)": "https://www.youtube.com/watch?v=EonibwnAEME",
  "What Makes The Perfect Business (5 Things)": "https://www.youtube.com/watch?v=3fsJFUvA6Ts",
  "How to Use AI in Your Business in 2026": "https://www.youtube.com/watch?v=fr78adfAnuA",
  "If You Have Multiple Interests, Please Start a One-Person Business": "https://www.youtube.com/watch?v=XqS7kIWMIDE",
  "Learn This Skill If You Want To Win In The Next 2-3 Years": "https://www.youtube.com/watch?v=bWR_3Sg-H-8",
};

const NEW_TITLES = [
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
  "The $30K/Month Al Faceless Shorts Method Nobody's Talking About"
];

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function makeDescription(title) {
  return `A practical playbook breaking down proven frameworks, execution tactics, and actionable strategies for "${title}".`;
}

const catalogPath = path.join(__dirname, '../src/lib/playbooks-catalog.ts');
let catalogContent = fs.readFileSync(catalogPath, 'utf8');

// Match ALL_PLAYBOOK_SUMMARIES
const match = catalogContent.match(/export const ALL_PLAYBOOK_SUMMARIES: PlaybookSummary\[\] = (\[[\s\S]*?\n\];)/);
if (!match) {
  console.error("Could not find ALL_PLAYBOOK_SUMMARIES in catalog");
  process.exit(1);
}

const existingItems = JSON.parse(match[1].replace(/;\s*$/, ''));
console.log(`Current items: ${existingItems.length}`);

let idCounter = 14;
const addedItems = [];

for (const title of NEW_TITLES) {
  const existing = existingItems.find(p => p.title.toLowerCase() === title.toLowerCase());
  if (existing) {
    console.log(`Skipping duplicate: "${title}"`);
    continue;
  }

  const slug = slugify(title);
  const id = `ai-businesses-${String(idCounter++).padStart(2, '0')}`;
  const item = {
    id,
    slug,
    title,
    headline: makeDescription(title),
    description: makeDescription(title),
    categorySlug: "ai-businesses",
    categoryName: "AI Businesses",
    price: 3,
    originalPrice: 9,
    currency: "USD",
    modulesCount: 0,
    lessonsCount: 0,
    hoursOfMaterial: "",
    badge: "Coming Soon",
    href: `/coming-soon?playbook=${slug}`,
  };

  if (YOUTUBE_URLS[title]) {
    item.sourceUrl = YOUTUBE_URLS[title];
  }

  addedItems.push(item);
}

console.log(`Adding ${addedItems.length} new items.`);
const allItems = [...existingItems, ...addedItems];
console.log(`Total items now: ${allItems.length}`);

const formattedJson = JSON.stringify(allItems, null, 2);
const newDeclaration = `export const ALL_PLAYBOOK_SUMMARIES: PlaybookSummary[] = ${formattedJson};`;

catalogContent = catalogContent.replace(match[0], newDeclaration);
fs.writeFileSync(catalogPath, catalogContent, 'utf8');
console.log("Successfully updated src/lib/playbooks-catalog.ts!");
