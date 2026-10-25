const https = require('https');
const fs = require('fs');
const path = require('path');

const VIDEOS = [
  { id: 'wtDDjBOfTZo', name: 'claude_26min', title: "Give Me 26 Minutes, I'll Give You 10,000 Hours of Claude Knowledge" },
  { id: 'w-lkP9XcZfg', name: 'chatgpt_28min', title: "Give Me 28 Minutes, I'll Give You 10,000 Hours of ChatGPT Knowledge" },
  { id: 'DZoeGR_tatA', name: '5_proven_ways', title: "5 Proven Ways To Make Money With AI (No Experience)" },
  { id: 'q1g65sjQI-4', name: 'ai_side_hustles_2026', title: "The Best AI Side Hustles To Start In 2026 (No Skills)" },
  { id: 'Mp2i27w8KPQ', name: 'copy_paste_13k', title: "Copy & Paste THIS Strategy to Make $13k/Month with AI in 2026" },
  { id: 'US47EpxBVHk', name: 'one_person_business_10k', title: "Build A One-Person Business As A Beginner (From $0 To $10K)" }
];

function fetchVideoCaptions(video) {
  return new Promise((resolve) => {
    https.get(`https://www.youtube.com/watch?v=${video.id}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (res) => {
      let html = '';
      res.on('data', c => html += c);
      res.on('end', () => {
        const idx = html.indexOf('"captionTracks":[');
        if (idx === -1) {
          console.log(`No captionTracks found for ${video.name}`);
          return resolve(null);
        }
        const endIdx = html.indexOf(']', idx);
        const jsonStr = html.slice(idx + 16, endIdx + 1);
        try {
          const tracks = JSON.parse(jsonStr);
          // Find english track or first track
          let track = tracks.find(t => t.languageCode === 'en' || t.languageCode.startsWith('en')) || tracks[0];
          let trackUrl = track.baseUrl.replace(/\\u0026/g, '&');
          if (!trackUrl.includes('lang=en')) {
            trackUrl += '&tlang=en';
          }
          trackUrl += '&fmt=json3';

          https.get(trackUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
          }, (capRes) => {
            let capData = '';
            capRes.on('data', c => capData += c);
            capRes.on('end', () => {
              try {
                const parsed = JSON.parse(capData);
                const events = parsed.events || [];
                const lines = [];
                for (const ev of events) {
                  if (ev.segs) {
                    const text = ev.segs.map(s => s.utf8).join('').trim();
                    if (text && text !== '\n') {
                      const tSec = Math.floor((ev.tStartMs || 0) / 1000);
                      const m = Math.floor(tSec / 60);
                      const s = tSec % 60;
                      lines.push(`[${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}] ${text}`);
                    }
                  }
                }
                const fullText = lines.join('\n');
                const plainText = lines.map(l => l.replace(/\[\d+:\d+\]\s*/, '')).join(' ');
                fs.writeFileSync(path.join(__dirname, `captions_${video.name}.txt`), fullText);
                console.log(`✔ [${video.name}] Saved ${lines.length} lines, ${plainText.split(' ').length} words.`);
                resolve({ video, lineCount: lines.length, wordCount: plainText.split(' ').length, sample: lines.slice(0, 5).join(' ') });
              } catch (e) {
                console.log(`Error parsing caption JSON for ${video.name}:`, e.message);
                resolve(null);
              }
            });
          }).on('error', (e) => {
            console.log(`Error downloading captions for ${video.name}:`, e.message);
            resolve(null);
          });
        } catch (e) {
          console.log(`Error parsing tracks for ${video.name}:`, e.message);
          resolve(null);
        }
      });
    }).on('error', (e) => {
      console.log(`Error loading watch page for ${video.name}:`, e.message);
      resolve(null);
    });
  });
}

async function main() {
  for (const v of VIDEOS) {
    await fetchVideoCaptions(v);
  }
  console.log('All caption downloads complete!');
}

main();
