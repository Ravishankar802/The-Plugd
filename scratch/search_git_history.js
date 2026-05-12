const { execSync } = require('child_process');

try {
  const output = execSync('git log -p', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  const lines = output.split('\n');
  const matches = lines.filter(line => line.includes('311'));
  console.log('Matches for 311:', matches.length);
  console.log(matches.slice(0, 20).join('\n'));
} catch (err) {
  console.error(err);
}
