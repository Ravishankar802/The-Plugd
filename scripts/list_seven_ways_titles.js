const fs = require('fs');
const path = 'src/lib/playbooks/seven-proven-ways-ai-no-exp-data.ts';
const content = fs.readFileSync(path, 'utf-8');

const regex = /"title":\s*"([^"]+)"/g;
let m;
const titles = [];
while ((m = regex.exec(content)) !== null) {
  titles.push(m[1]);
}
console.log(titles.slice(0, 35));
