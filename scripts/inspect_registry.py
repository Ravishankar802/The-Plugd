with open("src/lib/slide-templates/registry.ts", "r", encoding="utf-8") as f:
    text = f.read()

import re
matches = re.findall(r'templateId:\s*"([^"]+)",\s*name:\s*"([^"]+)"[\s\S]*?assignedPlaybookSlugs:\s*\[([^\]]+)\]', text)
for tid, name, slugs in matches:
    clean_slugs = ", ".join(s.strip().replace('"', '') for s in slugs.split(','))
    print(f"{tid:32} | {name:35} | {clean_slugs}")
print(f"Total templates in registry: {len(matches)}")
