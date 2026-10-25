import re
with open("src/lib/slide-templates/registry.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Let's find all templateIds
tids = re.findall(r'[\'"]?templateId[\'"]?:\s*[\'"]([^\'"]+)[\'"]', text)
print(f"Total templateIds found: {len(tids)}")
for i, tid in enumerate(tids):
    print(f"{i+1}. {tid}")
