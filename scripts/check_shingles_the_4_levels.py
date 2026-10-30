import os
import re

dir_path = r"c:\PROJECTS\The Plugd\book-manuscripts\the-4-levels-to-getting-rich-in-2026"
files = sorted([f for f in os.listdir(dir_path) if f.endswith('.md') and f != 'outline.md'])

shingles = {}
for f in files:
    with open(os.path.join(dir_path, f), 'r', encoding='utf-8') as fh:
        text = fh.read()
    lines = text.splitlines()
    body = '\n'.join(lines[1:]).strip()
    paras = [p.strip() for p in body.split('\n\n') if p.strip()]
    for p in paras:
        clean_text = re.sub(r"[^a-z0-9' ]", "", p.lower())
        words = clean_text.split()
        for k in range(0, len(words) - 11, 6):
            sh = ' '.join(words[k:k+12])
            shingles[sh] = shingles.get(sh, 0) + 1

repeats = {k: v for k, v in shingles.items() if v > 2}
print('Files checked:', len(files))
print('Repeated 12-word shingles (>2 times):', len(repeats))
for k, v in sorted(repeats.items(), key=lambda x: x[1], reverse=True)[:15]:
    print(f'  {v}x: {k}')
