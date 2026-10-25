const https = require('https');

function check(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, length: data.length, body: data });
      });
    }).on('error', (err) => resolve({ error: err.message }));
  });
}

(async () => {
  console.log('Checking live deployment on https://theplugd.com ...');
  for (let attempt = 1; attempt <= 12; attempt++) {
    const resHome = await check('https://theplugd.com');
    const hasNewCards = resHome.body ? resHome.body.includes('10,000 Hours of Claude Knowledge') : false;
    const hasCount = resHome.body ? resHome.body.includes('13 Playbooks') : false;

    console.log(`[Attempt ${attempt}] Status: ${resHome.status}, Has "Claude Knowledge": ${hasNewCards}, Has "13 Playbooks": ${hasCount}`);

    if (hasNewCards && hasCount) {
      console.log('✔ New 11-card deployment is LIVE on production!');
      const res7Ai = await check('https://theplugd.com/7-ai-automations');
      console.log('✔ /7-ai-automations status:', res7Ai.status);

      const resSide = await check('https://theplugd.com/side-hustles');
      console.log('✔ /side-hustles status:', resSide.status);

      const resComingSoon = await check('https://theplugd.com/coming-soon?playbook=give-me-26-minutes-ill-give-you-10000-hours-of-claude-knowledge');
      console.log('✔ /coming-soon status:', resComingSoon.status);
      process.exit(0);
    }

    await new Promise(r => setTimeout(r, 5000));
  }

  console.log('Deployment still propagating on Vercel.');
})();
