const https = require('https');

https.get('https://www.youtube.com/watch?v=wtDDjBOfTZo', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}, (res) => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    const idx = html.indexOf('"captionTracks"');
    console.log('captionTracks index:', idx);
    if (idx !== -1) {
      const slice = html.slice(idx, idx + 500);
      console.log('Slice:', slice);
    }
  });
});
