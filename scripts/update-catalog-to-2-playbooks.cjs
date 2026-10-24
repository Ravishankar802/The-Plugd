const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, '../src/lib/playbooks-catalog.ts');
const rawContent = fs.readFileSync(catalogPath, 'utf8');

// The 2 retained playbooks
const retainedPlaybooks = [
  {
    id: "ai-businesses-01",
    slug: "7-ai-automations",
    title: "These 3 AI Businesses Will Make You $10k+/Month (With Zero Employees)",
    headline: "Learn 7 accessible AI automation tools to save businesses time, offer simple services, and build real income streams.",
    description: "A practical, no-code guide to 7 accessible AI automation tools. Learn how to set up time-saving workflows, package them into valuable client services, and reach the $10,000 milestone.",
    categorySlug: "ai-businesses",
    categoryName: "AI Businesses",
    price: 3,
    originalPrice: 9,
    currency: "USD",
    modulesCount: 7,
    lessonsCount: 28,
    hoursOfMaterial: "7.0 hours",
    badge: "Bestseller",
    rating: 4.9,
    ratingCount: 384,
    href: "/7-ai-automations",
  },
  {
    id: "side-hustles-08",
    slug: "side-hustles",
    title: "10 Ways to Find Paying Customers Without Spending on Ads",
    headline: "Discover 10 zero-ad customer acquisition strategies to find and close paying clients for your side business.",
    description: "A battle-tested tactical guide to finding paying clients organically through direct outreach, community channels, content leverage, and partnerships without spending a single dollar on ads.",
    categorySlug: "side-hustles",
    categoryName: "Side Hustles",
    price: 3,
    originalPrice: 9,
    currency: "USD",
    modulesCount: 0,
    lessonsCount: 0,
    hoursOfMaterial: "",
    badge: "High Demand",
    rating: 4.9,
    ratingCount: 247,
    href: "/side-hustles",
  },
];

// Read existing file and convert export const ALL_PLAYBOOK_SUMMARIES into:
// export const ALL_PLAYBOOK_SUMMARIES: PlaybookSummary[] = [ ...retainedPlaybooks... ];
// export const ARCHIVED_PLAYBOOK_SUMMARIES: PlaybookSummary[] = [ ...the rest... ];

// Let's replace the start of ALL_PLAYBOOK_SUMMARIES
const startMarker = 'export const ALL_PLAYBOOK_SUMMARIES: PlaybookSummary[] = [';
const archivedMarker = 'export const ARCHIVED_PLAYBOOK_SUMMARIES: PlaybookSummary[] = [';

let newContent;
if (rawContent.includes(archivedMarker)) {
  console.log("Already archived");
} else {
  // Extract the original array body after `export const ALL_PLAYBOOK_SUMMARIES: PlaybookSummary[] = [`
  const prefix = 'import type { PlaybookSummary } from "./categories";\n\n';
  const arrayBody = rawContent.slice(rawContent.indexOf(startMarker) + startMarker.length);
  
  newContent = `${prefix}export const ALL_PLAYBOOK_SUMMARIES: PlaybookSummary[] = ${JSON.stringify(retainedPlaybooks, null, 2)};\n\n/**\n * Safely archived playbooks preserved for reference and existing student access records.\n * Excluded from the active public catalog per catalog specification.\n */\nexport const ARCHIVED_PLAYBOOK_SUMMARIES: PlaybookSummary[] = [${arrayBody}`;

  fs.writeFileSync(catalogPath, newContent, 'utf8');
  console.log("Successfully updated playbooks-catalog.ts! ALL_PLAYBOOK_SUMMARIES now contains exactly 2 playbooks.");
}
