const fs = require('fs');

const cat = fs.readFileSync('src/lib/playbooks-catalog.ts', 'utf-8');
const indexTs = fs.readFileSync('src/lib/book-content/index.ts', 'utf-8');

// find all slugs in index.ts
const slugRegex = /case "([^"]+)":/g;
let m;
const allSlugs = [];
while ((m = slugRegex.exec(indexTs)) !== null) {
  if (!allSlugs.includes(m[1])) {
    allSlugs.push(m[1]);
  }
}

console.log(`Total slugs in index.ts: ${allSlugs.length}`);

// find price for each slug
const slugPrices = {};
for (const slug of allSlugs) {
  const reg = new RegExp(`"slug":\\s*"${slug}"[\\s\\S]*?"price":\\s*(\\d+)`);
  const match = cat.match(reg);
  if (match) {
    slugPrices[slug] = parseInt(match[1]);
  } else {
    // try reversed
    const reg2 = new RegExp(`"price":\\s*(\\d+)[\\s\\S]*?"slug":\\s*"${slug}"`);
    const match2 = cat.match(reg2);
    slugPrices[slug] = match2 ? parseInt(match2[1]) : 3;
  }
}

// Group by price
const byPrice = {};
for (const [s, p] of Object.entries(slugPrices)) {
  byPrice[p] = byPrice[p] || [];
  byPrice[p].push(s);
}

for (const p of Object.keys(byPrice).sort((a,b) => b-a)) {
  console.log(`Price $${p}: ${byPrice[p].length} books`);
}

console.log('\n$3 tier books:');
for (const s of byPrice[3] || []) {
  console.log(`- ${s}`);
}
