import json

catalog_path = "src/lib/playbooks-catalog.ts"
with open(catalog_path, "r", encoding="utf-8") as f:
    text = f.read()

card_54 = {
    "id": "ai-businesses-54",
    "slug": "if-i-wanted-to-become-a-millionaire-in-2026-this-is-what-id-do-full-blueprint",
    "title": "If I Wanted To Become a Millionaire in 2026, This Is What I'd Do [FULL BLUEPRINT]",
    "headline": "The definitive step-by-step master execution blueprint to build an unassailable seven-figure net worth in 2026 using modern leverage and asymmetric systems.",
    "description": "A comprehensive operational masterclass breaking down the exact modern mechanics of wealth: mastering asymmetric skills, engineering high-ticket irresistible offers, deploying the Rule of 100 acquisition engine, scaling productized operations, and defending capital into a permanent $1,000,000 fortress.",
    "categorySlug": "ai-businesses",
    "categoryName": "AI Businesses",
    "price": 3,
    "originalPrice": 9,
    "currency": "USD",
    "modulesCount": 8,
    "lessonsCount": 32,
    "slidesCount": 128,
    "hoursOfMaterial": "8.5 hours",
    "badge": "Hot & New",
    "rating": 4.9,
    "ratingCount": 1680,
    "href": "/if-i-wanted-to-become-a-millionaire-in-2026-this-is-what-id-do-full-blueprint"
}

formatted_card = "  " + json.dumps(card_54, indent=2).replace("\n", "\n  ") + ",\n"

marker = '"id": "ai-businesses-01"'
idx = text.find(marker)
if idx != -1:
    open_brace_01 = text.rfind('{', 0, idx)
    text = text[:open_brace_01] + formatted_card + text[open_brace_01:]
    with open(catalog_path, "w", encoding="utf-8") as f:
        f.write(text)
    print("Inserted Playbook 54 at position #2 (index 1) in ALL_PLAYBOOK_SUMMARIES!")
else:
    print("ERROR: marker for ai-businesses-01 not found!")
