import os
import glob
import re

slug = 'the-new-way-of-making-content-in-the-age-of-ai'
book_dir = os.path.join('book-manuscripts', slug)
files = sorted([f for f in glob.glob(os.path.join(book_dir, '*.md')) if not f.endswith('outline.md')])

shingles = {}
shingle_sources = {}

for f in files:
    fname = os.path.basename(f)
    with open(f, 'r', encoding='utf-8') as fh:
        raw = fh.read().replace('\r', '')
    lines = raw.split('\n')
    body = '\n'.join(lines[1:]).strip()
    paras = [p.strip() for p in body.split('\n\n') if p.strip()]
    for i, p in enumerate(paras, 1):
        ws = re.sub(r"[^a-z0-9' ]", '', p.lower()).split()
        for k in range(0, len(ws) - 11, 6):
            sh = ' '.join(ws[k:k+12])
            shingles[sh] = shingles.get(sh, 0) + 1
            if sh not in shingle_sources:
                shingle_sources[sh] = []
            shingle_sources[sh].append(f"{fname}#p{i}")

rep = {k: v for k, v in shingles.items() if v > 2}
print(f"Total shingles with count > 2: {len(rep)}")
for sh, count in list(rep.items())[:15]:
    print(f"Count {count}: '{sh}' in {shingle_sources[sh]}")
