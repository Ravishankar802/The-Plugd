with open("src/lib/playbooks-catalog.ts", "r", encoding="utf-8") as f:
    text = f.read()

import re
matches = re.findall(r'\{\s*"id":\s*"(ai-businesses-(?:1[7-9]|2[0-4]))"[\s\S]*?"slug":\s*"([^"]+)"[\s\S]*?"title":\s*"([^"]+)"', text)
for pid, slug, title in matches:
    print(f"{pid}: slug='{slug}' | title='{title}'")
