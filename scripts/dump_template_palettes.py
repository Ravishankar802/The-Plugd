import re

with open("src/lib/slide-templates/registry.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Match every block: "template-id": {
blocks = re.findall(r'(\"[a-z0-9\-]+\":\s*\{\s*templateId:.*?assignedPlaybookSlugs:.*?\]\s*\})', text, re.DOTALL)
print(f"Total template blocks found: {len(blocks)}")
for b in blocks:
    tid = re.search(r'templateId:\s*"([^"]+)"', b).group(1)
    name = re.search(r'name:\s*"([^"]+)"', b).group(1)
    slugs = re.search(r'assignedPlaybookSlugs:\s*\[(.*?)\]', b, re.DOTALL).group(1).replace('\n', ' ').strip()
    cbg = re.search(r'canvasBg:\s*"([^"]+)"', b)
    cbg_val = cbg.group(1) if cbg else "N/A"
    accent = re.search(r'accent:\s*"([^"]+)"', b)
    accent_val = accent.group(1) if accent else "N/A"
    print(f"- {tid}: {name}")
    print(f"    Slugs: {slugs}")
    print(f"    Canvas: {cbg_val} | Accent: {accent_val}")
