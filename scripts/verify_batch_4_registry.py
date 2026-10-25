import re

with open("src/lib/slide-templates/registry.ts", "r", encoding="utf-8") as f:
    text = f.read()

tids = re.findall(r'[\'"]?templateId[\'"]?:\s*[\'"]([^\'"]+)[\'"]', text)
print(f"Total template IDs in registry: {len(tids)}")
print(tids)

seen = set()
dups = []
for tid in tids:
    if tid in seen:
        dups.append(tid)
    seen.add(tid)

if dups:
    print(f"DUPLICATES FOUND: {dups}")
else:
    print("Uniqueness verified: 0 duplicates!")
