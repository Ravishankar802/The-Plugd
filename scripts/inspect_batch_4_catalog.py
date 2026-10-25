import re

with open("src/lib/playbooks-catalog.ts", "r", encoding="utf-8") as f:
    text = f.read()

pattern = r'\{\s*"id":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"title":\s*"([^"]+)"'
matches = re.findall(pattern, text)
print(f"Total entries found: {len(matches)}")
for i, m in enumerate(matches[24:32]):
    print(f"{i+25}: id='{m[0]}' | slug='{m[1]}' | title='{m[2]}'")
