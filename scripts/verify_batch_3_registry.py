with open("src/lib/slide-templates/registry.ts", "r", encoding="utf-8") as f:
    text = f.read()

import re
matches = re.findall(r'"templateId":\s*"([^"]+)"|templateId:\s*"([^"]+)"', text)
template_ids = [m[0] or m[1] for m in matches]
print(f"Total template IDs in registry: {len(template_ids)}")
print(template_ids)
assert len(template_ids) == len(set(template_ids)), "Duplicate template IDs found!"
print("Uniqueness verified: 0 duplicates!")
