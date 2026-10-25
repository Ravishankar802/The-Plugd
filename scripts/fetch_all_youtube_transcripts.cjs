const https = require('https');
const fs = require('fs');
const path = require('path');

const VIDEOS = [
  { id: 'wtDDjBOfTZo', name: 'claude_26min' },
  { id: 'w-lkP9XcZfg', name: 'chatgpt_28min' },
  { id: 'DZoeGR_tatA', name: '5_proven_ways' },
  { id: 'q1g65sjQI-4', name: 'ai_side_hustles_2026' },
  { id: 'Mp2i27w8KPQ', name: 'copy_paste_13k' },
  { id: 'US47EpxBVHk', name: 'one_person_business_10k' }
];

function fetchTranscript(video) {
  return new Promise((resolve) => {
    console.log(`Fetching transcript for ${video.name} (${video.id})...`);
    https.get(`https://www.youtube.com/watch?v=${video.id}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (res) => {
      let watchHtml = '';
      res.on('data', c => watchHtml += c);
      res.on('end', () => {
        const apiKeyMatch = watchHtml.match(/"INNERTUBE_API_KEY":"([^"]+)"/);
        const serializedTokenMatch = watchHtml.match(/"getTranscriptEndpoint":\{"params":"([^"]+)"/);

        if (!apiKeyMatch || !serializedTokenMatch) {
          console.log(`Could not find Innertube tokens for ${video.name}`);
          return resolve({ video, success: false });
        }

        const postData = JSON.stringify({
          context: {
            client: { clientName: 'WEB', clientVersion: '2.20240101.00.00', hl: 'en', gl: 'US' }
          },
          params: serializedTokenMatch[1]
        });

        const req = https.request({
          hostname: 'www.youtube.com',
          path: '/youtubei/v1/get_transcript?key=' + apiKeyMatch[1],
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            'Content-Length': Buffer.byteLength(postData)
          }
        }, (apiRes) => {
          let apiData = '';
          apiRes.on('data', c => apiData += c);
          apiRes.on('end', () => {
            try {
              const parsed = JSON.parse(apiData);
              const segments = parsed.actions?.[0]?.updateEngagementPanelAction?.content?.transcriptRenderer?.content?.transcriptSearchPanelRenderer?.body?.transcriptSegmentListRenderer?.initialSegments;
              if (segments && segments.length > 0) {
                const textWithTimes = segments.map(seg => {
                  const renderer = seg.transcriptSegmentRenderer;
                  const time = renderer?.startMs ? Math.floor(parseInt(renderer.startMs) / 1000) : 0;
                  const text = renderer?.snippet?.runs?.map(r => r.text).join('') || '';
                  return `[${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')}] ${text}`;
                }).join('\n');
                const plainText = segments.map(seg => {
                  return seg.transcriptSegmentRenderer?.snippet?.runs?.map(r => r.text).join('') || '';
                }).join(' ').replace(/\s+/g, ' ');

                fs.writeFileSync(path.join(__dirname, `transcript_${video.name}.txt`), textWithTimes);
                fs.writeFileSync(path.join(__dirname, `transcript_${video.name}_plain.txt`), plainText);
                console.log(`✔ Successfully saved transcript for ${video.name} (${segments.length} segments, ${plainText.split(' ').length} words)`);
                resolve({ video, success: true, wordCount: plainText.split(' ').length });
              } else {
                console.log(`No segments found for ${video.name}`);
                resolve({ video, success: false });
              }
            } catch (err) {
              console.log(`JSON parse error for ${video.name}:`, err.message);
              resolve({ video, success: false });
            }
          });
        });
        req.on('error', (err) => {
          console.log(`API request error for ${video.name}:`, err.message);
          resolve({ video, success: false });
        });
        req.write(postData);
        req.end();
      });
    }).on('error', (err) => {
      console.log(`Watch page fetch error for ${video.name}:`, err.message);
      resolve({ video, success: false });
    });
  });
}

async function run() {
  for (const v of VIDEOS) {
    await fetchTranscript(v);
  }
  console.log('All transcript fetches finished.');
}

run();
