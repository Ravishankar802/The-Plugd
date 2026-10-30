const fs = require('fs');
const path = require('path');

const slug = '7-proven-ways-to-make-money-with-ai-no-experience';
const dir = path.join('book-manuscripts', slug);
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

const phrases = {};
for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf-8');
  const words = content.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  for (let i = 0; i <= words.length - 12; i++) {
    const phrase = words.slice(i, i + 12).join(' ');
    phrases[phrase] = (phrases[phrase] || 0) + 1;
  }
}

const repeated = Object.entries(phrases).filter(([p, count]) => count > 1);
console.log(`Found ${repeated.length} repeated 12-word phrases:`);
for (const [p, count] of repeated.slice(0, 10)) {
  console.log(`[${count}x]: "${p}"`);
}
