const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const FORBIDDEN_PHRASES = [
  "Plugd Research & Editorial",
  "AI Businesses",
  "PLUGD DIGITAL PLAYBOOK EDITION · OFFICIAL MASTER CLASS"
];

test("All 60 books have 200+ pages, zero forbidden phrases, and complete headers", () => {
  const dir = path.join(__dirname, "../src/lib/book-content");
  const files = fs.readdirSync(dir).filter(f => f.endsWith("-book.ts"));

  console.log(`Auditing ${files.length} book files...`);
  assert.ok(files.length >= 60, `Must have at least 60 book files, found ${files.length}`);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const content = fs.readFileSync(fullPath, "utf8");

    // Check forbidden phrases
    for (const phrase of FORBIDDEN_PHRASES) {
      assert.ok(
        !content.includes(phrase),
        `File ${file} contains forbidden phrase: ${phrase}`
      );
    }

    // Check page count
    const pageMatches = content.match(/"pageNumber":\s*(\d+)/g) || [];
    assert.ok(
      pageMatches.length >= 200,
      `File ${file} has only ${pageMatches.length} pages, must have >= 200`
    );

    // Check no trailing ellipses in headers
    const headerMatches = content.match(/"header":\s*"([^"]+)"/g) || [];
    for (const h of headerMatches) {
      assert.ok(
        !h.includes('..."'),
        `File ${file} contains header ending with '...': ${h}`
      );
    }
  }
});
