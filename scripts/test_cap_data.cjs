const https = require('https');

https.get('https://www.youtube.com/watch?v=wtDDjBOfTZo', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}, (res) => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    const idx = html.indexOf('"captionTracks":[');
    const endIdx = html.indexOf(']', idx);
    const jsonStr = html.slice(idx + 16, endIdx + 1);
    const tracks = JSON.parse(jsonStr);
    let trackUrl = tracks[0].baseUrl.replace(/\\u0026/g, '&');
    console.log('Original track URL:', trackUrl);

    https.get(trackUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (cRes) => {
      console.log('Status:', cRes.statusCode, cRes.headers);
      let data = '';
      cRes.on('data', c => data += c);
      cRes.on('end', () => {
        console.log('Data length:', data.length);
        console.log('First 300 chars:', data.slice(0, 300));
      });
    });
  });
});
