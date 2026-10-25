import re
with open("src/lib/slide-templates/registry.ts", "r", encoding="utf-8") as f:
    text = f.read()

template_ids = re.findall(r'templateId:\s*"([^"]+)"', text)
assigned_slugs = re.findall(r'assignedPlaybookSlugs:\s*\[([^\]]+)\]', text)

for i, (tid, slugs) in enumerate(zip(template_ids, assigned_slugs)):
    print(f"{i+1}. ID: {tid} -> Slugs: {slugs.strip()}")
