const fs = require('fs');
const path = require('path');

const slugs = [
  '3-best-ai-businesses-to-start-before-2027-and-the-one-id-start-today',
  'the-4-levels-to-getting-rich-in-2026',
  'how-i-turned-300-to-100-000-at-19-my-side-hustles',
  'the-new-way-of-making-content-in-the-age-of-ai',
  'how-to-think-like-a-strategic-genius-5-dimensional-thinking'
];

console.log("STATUS CHECK FOR BATCH 5A (FIRST 5 BOOKS OF $7 TIER):");
let allComplete = true;

slugs.forEach(slug => {
  const dir = path.join(__dirname, '..', 'book-manuscripts', slug);
  if (!fs.existsSync(dir)) {
    console.log(`[${slug}]: MISSING DIRECTORY`);
    allComplete = false;
    return;
  }
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && f !== 'outline.md');
  const count = files.length;
  
  const hasFw = fs.existsSync(path.join(dir, '00-foreword.md'));
  const hasEp = fs.existsSync(path.join(dir, '99-epilogue.md'));
  const chapters = files.filter(f => /^\d{2}-.*\.md$/.test(f) && f !== '00-foreword.md' && f !== '99-epilogue.md');
  
  if (count === 22) {
    let totalWords = 0;
    files.forEach(f => {
      const text = fs.readFileSync(path.join(dir, f), 'utf8');
      totalWords += text.trim().split(/\s+/).length;
    });
    console.log(`[${slug}]: 22/22 files -> PASS (${totalWords} words)`);
  } else {
    allComplete = false;
    console.log(`[${slug}]: ${count}/22 files (Chapters: ${chapters.length}/20, FW: ${hasFw}, EP: ${hasEp}) - IN PROGRESS`);
  }
});

if (allComplete) {
  console.log("\n*** ALL 5 BOOKS OF BATCH 5A ARE 100% COMPLETE AND PASSING! ***");
} else {
  console.log("\nStill in progress...");
}
