const fs = require('fs');

function checkFile(path, name) {
  const content = fs.readFileSync(path, 'utf8');
  console.log('=== Checking ' + name + ' ===');
  console.log('Has 373:', content.includes('373'));
  const listMatches = content.match(/"listItems":\s*\[/g) || [];
  const diagramMatches = content.match(/"diagram":\s*\{/g) || [];
  const chartMatches = content.match(/"chart":\s*\{/g) || [];
  const takeawayMatches = content.match(/"takeaway":\s*"/g) || [];
  console.log('listItems count:', listMatches.length);
  console.log('diagram count:', diagramMatches.length);
  console.log('chart count:', chartMatches.length);
  console.log('takeaways count:', takeawayMatches.length);
}

checkFile('src/lib/ai-automations-content-1.ts', 'Content 1 (Mods 1-2)');
checkFile('src/lib/ai-automations-content-2.ts', 'Content 2 (Mods 3-5)');
checkFile('src/lib/ai-automations-content-3.ts', 'Content 3 (Mods 6-7)');
