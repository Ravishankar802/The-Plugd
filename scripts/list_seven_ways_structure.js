const fs = require('fs');
const path = 'src/lib/playbooks/seven-proven-ways-ai-no-exp-data.ts';
const content = fs.readFileSync(path, 'utf-8');

const modRegex = /"id":\s*"m-\d+",\s*"number":\s*"(\d+)",\s*"title":\s*"([^"]+)"/g;
let m;
while ((m = modRegex.exec(content)) !== null) {
  console.log(`Module ${m[1]}: ${m[2]}`);
}

const lessonRegex = /"id":\s*"\d+-\d+",\s*"number":\s*"(\d+\.\d+)",\s*"title":\s*"([^"]+)"/g;
while ((m = lessonRegex.exec(content)) !== null) {
  console.log(`  Lesson ${m[1]}: ${m[2]}`);
}
