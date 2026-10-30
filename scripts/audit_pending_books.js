const fs = require('fs');

const testFile = fs.readFileSync('tests/all-60-books.test.cjs', 'utf-8');
const bookFiles = [];
const regex = /require\(['"]\.\.\/src\/lib\/book-content\/([^'"]+)['"]\)/g;
let m;
while ((m = regex.exec(testFile)) !== null) {
  bookFiles.push(m[1]);
}
console.log(`Audited book files in test suite: ${bookFiles.length}`);

// Check which book files are in book-manuscripts
const manDirs = fs.readdirSync('book-manuscripts');
console.log(`Directories in book-manuscripts: ${manDirs.length}`);

// Check which of the 60 book files have been converted to manuscripts
const indexTs = fs.readFileSync('src/lib/book-content/index.ts', 'utf-8');
const completedFiles = [];
const pendingFiles = [];

for (const bf of bookFiles) {
  // check if any manuscript corresponds to this book file
  // or check if the book file has > 268 pages
  const fileContent = fs.readFileSync(`src/lib/book-content/${bf}.ts`, 'utf-8');
  const pageMatches = fileContent.match(/"pageNumber":\s*(\d+)/g);
  const maxPage = pageMatches ? Math.max(...pageMatches.map(p => parseInt(p.match(/\d+/)[0]))) : 0;
  if (maxPage > 270) {
    completedFiles.push({ file: bf, pages: maxPage });
  } else {
    pendingFiles.push({ file: bf, pages: maxPage });
  }
}

console.log(`\nCompleted books (>270 pages): ${completedFiles.length}`);
console.log(`Pending books (<=268 pages): ${pendingFiles.length}`);

console.log('\nPending books to rewrite in Batch 7:');
for (const p of pendingFiles) {
  console.log(`- ${p.file} (${p.pages} pages)`);
}
