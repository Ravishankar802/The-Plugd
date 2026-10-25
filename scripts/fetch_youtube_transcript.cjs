const https = require('https');
const fs = require('fs');

async function fetchTranscriptInnertube() {
  const watchHtml = await new Promise((res, rej) => {
    https.get('https://www.youtube.com/watch?v=i_36dg1t0e4', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (r) => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => res(d));
    }).on('error', rej);
  });

  const apiKeyMatch = watchHtml.match(/"INNERTUBE_API_KEY":"([^"]+)"/);
  const serializedTokenMatch = watchHtml.match(/"getTranscriptEndpoint":\{"params":"([^"]+)"/);

  console.log('API Key:', apiKeyMatch ? apiKeyMatch[1] : 'null');
  console.log('Transcript params:', serializedTokenMatch ? serializedTokenMatch[1] : 'null');

  if (apiKeyMatch && serializedTokenMatch) {
    const postData = JSON.stringify({
      context: {
        client: {
          clientName: 'WEB',
          clientVersion: '2.20240101.00.00',
          hl: 'en',
          gl: 'US'
        }
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
    }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        console.log('Innertube response length:', d.length);
        fs.writeFileSync('scripts/innertube_transcript.json', d);
        try {
          const parsed = JSON.parse(d);
          const cueGroups = parsed.actions?.[0]?.updateEngagementPanelAction?.content?.transcriptRenderer?.content?.transcriptSearchPanelRenderer?.body?.transcriptSegmentListRenderer?.initialSegments;
          if (cueGroups) {
            console.log('Found cue segments:', cueGroups.length);
            const transcriptText = cueGroups.map(seg => {
              const renderer = seg.transcriptSegmentRenderer;
              const time = renderer?.startMs ? Math.floor(parseInt(renderer.startMs) / 1000) : 0;
              const text = renderer?.snippet?.runs?.map(r => r.text).join('') || '';
              return `[${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')}] ${text}`;
            }).join('\n');
            fs.writeFileSync('scripts/transcript_with_timestamps.txt', transcriptText);
            console.log('Transcript saved with timestamps! First 10 lines:');
            console.log(transcriptText.split('\n').slice(0, 10).join('\n'));
          } else {
            console.log('Keys in parsed:', Object.keys(parsed));
          }
        } catch (e) {
          console.error('Parse error:', e.message);
        }
      });
    });
    req.write(postData);
    req.end();
  }
}

fetchTranscriptInnertube();
