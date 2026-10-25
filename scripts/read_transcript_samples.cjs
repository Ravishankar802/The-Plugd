const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scripts/video_transcript.json', 'utf8'));

console.log('Total entries:', data.length);
for (let i = 0; i < data.length; i += 25) {
  const item = data[i];
  const m = Math.floor(item.start / 60);
  const s = Math.floor(item.start % 60);
  console.log(`[${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}] ${item.text}`);
}
