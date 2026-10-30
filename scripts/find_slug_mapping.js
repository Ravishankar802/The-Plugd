const fs = require('fs');
const content = fs.readFileSync('src/lib/book-content/index.ts', 'utf-8');
const slugs = ['7-proven-ways-to-make-money-with-ai-no-experience', 'my-honest-advice-to-someone-who-wants-to-get-rich'];
for (const s of slugs) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(s)) {
      console.log(lines.slice(i, i + 4).join('\n'));
      break;
    }
  }
}
