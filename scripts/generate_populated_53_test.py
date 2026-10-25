import json

with open("tests/populated-52-playbooks.test.cjs", "r", encoding="utf-8") as f:
    text = f.read()

card_53 = {
    "id": "ai-businesses-53",
    "slug": "if-i-started-over-with-0-heres-my-exact-plan-to-get-to-1m",
    "title": "If I Started Over With $0, Here’s My Exact Plan to get to $1M",
    "dataFile": "src/lib/playbooks/started-over-zero-plan-to-1m-data.ts",
    "detailFile": "src/lib/playbooks/started-over-zero-plan-to-1m-detail.ts",
    "routeDir": "src/app/if-i-started-over-with-0-heres-my-exact-plan-to-get-to-1m",
    "expectedModules": 7,
    "expectedLessons": 28,
    "expectedSlides": 112
}

formatted_card = "  " + json.dumps(card_53, indent=4).replace("\n", "\n  ") + ",\n"

marker = "const POPULATED_PLAYBOOKS = [\n"
idx = text.find(marker)
if idx == -1:
    marker = "const POPULATED_PLAYBOOKS = [\r\n"
    idx = text.find(marker)

text = text[:idx + len(marker)] + formatted_card + text[idx + len(marker):]
text = text.replace("52", "53")

with open("tests/populated-53-playbooks.test.cjs", "w", encoding="utf-8") as f:
    f.write(text)

print("Created tests/populated-53-playbooks.test.cjs successfully!")
