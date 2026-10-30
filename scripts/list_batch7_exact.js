const fs = require('fs');
const path = require('path');

const dir = path.join('src', 'lib', 'book-content');
const files = fs.readdirSync(dir).filter(f => f.endsWith('-book.ts'));

const completed = [];
const pending = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf-8');
  const pages = (content.match(/"pageNumber":\s*(\d+)/g) || []).length;
  // Extract title
  const titleMatch = content.match(/Title:\s*(.+)/i) || content.match(/"header":\s*"([^"]+)"/);
  const title = titleMatch ? titleMatch[1].trim() : file;
  
  if (pages > 270) {
    completed.push({ file, pages, title });
  } else {
    pending.push({ file, pages, title });
  }
}

console.log(`Total book files: ${files.length}`);
console.log(`Completed books (>270 pages): ${completed.length}`);
console.log(`Pending books (<=268 pages): ${pending.length}`);

console.log('\n--- The 9 Pending Books in Batch 7 ($3 Tier) ---');
pending.forEach((p, idx) => {
  console.log(`${idx + 1}. [${p.file}] (currently ${p.pages} pages)`);
});
