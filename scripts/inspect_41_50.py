import re

with open('src/lib/playbooks-catalog.ts', 'r', encoding='utf-8') as f:
    text = f.read()

for i in range(41, 51):
    pat = rf'\{{\s*"id":\s*"ai-businesses-{i}",[\s\S]*?\n\s*\}}'
    m = re.search(pat, text)
    if m:
        print(f"=== ai-businesses-{i} ===")
        print(m.group(0))
