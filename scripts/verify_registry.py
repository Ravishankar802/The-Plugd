import re

with open("src/lib/slide-templates/registry.ts", "r", encoding="utf-8") as f:
    text = f.read()

tmpl_matches = re.findall(r'"([a-z0-9\-]+)":\s*\{\s*templateId:', text)
print("Templates defined:", len(tmpl_matches), tmpl_matches)

# Extract assignedPlaybookIds
ids = re.findall(r'assignedPlaybookIds:\s*\[(.*?)\]', text, re.DOTALL)
all_ids = []
for block in ids:
    all_ids.extend(re.findall(r'"([^"]+)"', block))
print("Assigned IDs:", len(all_ids), len(set(all_ids)), "Duplicates:", len(all_ids) - len(set(all_ids)))

# Extract assignedPlaybookSlugs
slugs = re.findall(r'assignedPlaybookSlugs:\s*\[(.*?)\]', text, re.DOTALL)
all_slugs = []
for block in slugs:
    all_slugs.extend(re.findall(r'"([^"]+)"', block))
print("Assigned Slugs:", len(all_slugs), len(set(all_slugs)), "Duplicates:", len(all_slugs) - len(set(all_slugs)))

assert len(all_ids) == len(set(all_ids)), "Duplicate IDs found!"
assert len(all_slugs) == len(set(all_slugs)), "Duplicate Slugs found!"
print("VERIFICATION COMPLETE: Zero collisions across templates!")
