import re

with open('src/lib/playbooks-catalog.ts', 'r', encoding='utf-8') as f:
    text = f.read()

matches = re.findall(r'"id":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"title":\s*"([^"]+)"', text)
for i, m in enumerate(matches[:20]):
    print(f'{i+1}. id={m[0]}, slug={m[1]}, title={m[2]}')
