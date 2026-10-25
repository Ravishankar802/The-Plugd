import json

with open("tests/populated-53-playbooks.test.cjs", "r", encoding="utf-8") as f:
    text = f.read()

card_54 = {
    "id": "ai-businesses-54",
    "slug": "if-i-wanted-to-become-a-millionaire-in-2026-this-is-what-id-do-full-blueprint",
    "title": "If I Wanted To Become a Millionaire in 2026, This Is What I'd Do",
    "dataFile": "src/lib/playbooks/become-millionaire-2026-full-blueprint-data.ts",
    "detailFile": "src/lib/playbooks/become-millionaire-2026-full-blueprint-detail.ts",
    "routeDir": "src/app/if-i-wanted-to-become-a-millionaire-in-2026-this-is-what-id-do-full-blueprint",
    "expectedModules": 8,
    "expectedLessons": 32,
    "expectedSlides": 128
}

formatted_card = "    " + json.dumps(card_54, indent=4).replace("\n", "\n    ") + ",\n"

marker = '"id": "ai-businesses-01"'
idx = text.find(marker)
open_brace_01 = text.rfind('{', 0, idx)

text = text[:open_brace_01] + formatted_card + text[open_brace_01:]
text = text.replace("53", "54")

with open("tests/populated-54-playbooks.test.cjs", "w", encoding="utf-8") as f:
    f.write(text)

print("Created tests/populated-54-playbooks.test.cjs successfully!")
