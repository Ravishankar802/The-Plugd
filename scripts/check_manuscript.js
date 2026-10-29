#!/usr/bin/env node
// Quality gate for book manuscripts. Usage: node scripts/check_manuscript.js <slug> [--min-total 64000] [--min-chapter 3000]
const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2);
const slug = args.find(a => !a.startsWith('--'));
const opt = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 ? Number(args[i + 1]) : d; };
const MIN_TOTAL = opt('min-total', 32000), MIN_CH = opt('min-chapter', 1500);
const dir = path.join(__dirname, '..', 'book-manuscripts', slug);
if (!fs.existsSync(dir)) { console.log('NO DIR', dir); process.exit(1); }
const BANNED = [/Plugd/i, /AI Businesses/, /Research & Editorial/i, /OFFICIAL MASTER CLASS/i, /\bsovereign\b/i, /\basymmetric\b/i, /\bmonastic\b/i, /\bforensic\b/i, /as an AI/i, /lorem ipsum/i];
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();
let total = 0, problems = [];
const allParas = new Map(); const shingles = new Map();
for (const f of files) {
  const raw = fs.readFileSync(path.join(dir, f), 'utf8').replace(/\r/g, '');
  const lines = raw.split('\n');
  if (!lines[0].startsWith('# ')) problems.push(f + ': first line must be "# Title"');
  const body = lines.slice(1).join('\n').trim();
  const paras = body.split(/\n\s*\n/).map(x => x.trim()).filter(Boolean);
  let w = 0;
  paras.forEach((p, i) => {
    const pw = p.split(/\s+/).length; w += pw;
    if (/^(#|[-*+] |\d+\. |>|\||```)/.test(p) || /\*\*|__|`/.test(p)) problems.push(f + ' para ' + (i + 1) + ': markdown formatting not allowed');
    if (p.includes('\n')) problems.push(f + ' para ' + (i + 1) + ': contains line break (one paragraph per block)');
    if (pw < 35) problems.push(f + ' para ' + (i + 1) + ': too short (' + pw + ' words)');
    if (pw > 230) problems.push(f + ' para ' + (i + 1) + ': too long (' + pw + ' words)');
    for (const b of BANNED) if (b.test(p)) problems.push(f + ' para ' + (i + 1) + ': banned term ' + b);
    const key = p.toLowerCase();
    if (allParas.has(key)) problems.push(f + ' para ' + (i + 1) + ': duplicate of ' + allParas.get(key));
    allParas.set(key, f + '#' + (i + 1));
    const ws = p.toLowerCase().replace(/[^a-z0-9' ]/g, '').split(/\s+/);
    for (let k = 0; k + 12 <= ws.length; k += 6) { const sh = ws.slice(k, k + 12).join(' '); shingles.set(sh, (shingles.get(sh) || 0) + 1); }
  });
  total += w;
  const isCh = /^\d\d-/.test(f) && !f.startsWith('00-') && !f.startsWith('99-');
  const min = isCh ? MIN_CH : (f.startsWith('00-') ? 1500 : f.startsWith('99-') ? 1200 : 0);
  console.log(f.padEnd(60), String(w).padStart(6), 'words', w < min ? ' <-- BELOW ' + min : '');
  if (min && w < min) problems.push(f + ': ' + w + ' words, minimum ' + min);
}
const rep = [...shingles.values()].filter(c => c > 2).length;
if (rep > 5) problems.push('repeated 12-word phrases across book: ' + rep + ' (reword repeated passages)');
if (!fs.existsSync(path.join(dir, 'outline.json'))) problems.push('missing outline.json');
if (!files.some(f => f.startsWith('00-'))) problems.push('missing 00-foreword.md');
if (!files.some(f => f.startsWith('99-'))) problems.push('missing 99-epilogue.md');
console.log('TOTAL WORDS', total, '(minimum ' + MIN_TOTAL + ')');
if (total < MIN_TOTAL) problems.push('total ' + total + ' < ' + MIN_TOTAL);
if (problems.length) { console.log('\nPROBLEMS (' + problems.length + '):'); problems.slice(0, 40).forEach(p => console.log(' - ' + p)); process.exit(1); }
console.log('PASS');
