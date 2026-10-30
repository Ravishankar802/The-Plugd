const fs = require('fs');
const cat = fs.readFileSync('src/lib/playbooks-catalog.ts', 'utf-8');
const slug = '7-proven-ways-to-make-money-with-ai-no-experience';
const idx = cat.indexOf(slug);
if (idx !== -1) {
  console.log(cat.slice(Math.max(0, idx - 150), idx + 500));
} else {
  console.log('Slug not found in playbooks-catalog.ts');
}
