const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const slugs = [
  'how-to-make-your-first-10-000-as-a-teen-stupid-simple',
  'there-are-only-3-types-of-profitable-businesses-pick-one',
  'i-built-a-business-with-ai-in-24-hours',
  'i-asked-ai-to-make-me-as-much-money-as-possible',
  'how-to-build-10k-websites-in-minutes-claude-ai'
];

console.log('STATUS CHECK FOR BATCH 4C (FINAL 5 BOOKS OF $9 TIER):');
let allDone = true;

for (const slug of slugs) {
  const dir = path.join(__dirname, '..', 'book-manuscripts', slug);
  if (!fs.existsSync(dir)) {
    console.log(`[${slug}] Directory does not exist!`);
    allDone = false;
    continue;
  }
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  const chs = files.filter(f => /^\d\d-/.test(f) && !f.startsWith('00-') && !f.startsWith('99-'));
  const hasFw = files.some(f => f.startsWith('00-'));
  const hasEp = files.some(f => f.startsWith('99-'));
  
  if (files.length < 22) {
    console.log(`[${slug}]: ${files.length}/22 files (Chapters: ${chs.length}/20, FW: ${hasFw}, EP: ${hasEp}) - IN PROGRESS`);
    allDone = false;
  } else {
    try {
      const out = execSync(`node scripts/check_manuscript.js ${slug}`, { encoding: 'utf8' });
      const m = out.match(/TOTAL WORDS (\d+)/);
      const words = m ? m[1] : 'unknown';
      console.log(`[${slug}]: 22/22 files -> PASS (${words} words)`);
    } catch (e) {
      console.log(`[${slug}]: 22/22 files -> FAIL! Check output:\n` + (e.stdout || e.message));
      allDone = false;
    }
  }
}

if (allDone) {
  console.log('\n*** ALL 5 BOOKS OF BATCH 4C ARE 100% COMPLETE AND PASSING! ***');
} else {
  console.log('\nStill in progress...');
}
