import re

with open("src/lib/playbooks-catalog.ts", "r", encoding="utf-8") as f:
    text = f.read()

fixed = re.sub(r'("href":\s*"/[^"]+")\n(\s*"sourceUrl")', r'\1,\n\2', text)

with open("src/lib/playbooks-catalog.ts", "w", encoding="utf-8") as f:
    f.write(fixed)

print("Fixed missing commas before sourceUrl!")
