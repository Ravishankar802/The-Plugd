import json

catalog_path = "src/lib/playbooks-catalog.ts"
with open(catalog_path, "r", encoding="utf-8") as f:
    text = f.read()

card_53 = {
    "id": "ai-businesses-53",
    "slug": "if-i-started-over-with-0-heres-my-exact-plan-to-get-to-1m",
    "title": "If I Started Over With $0, Here’s My Exact Plan to get to $1M",
    "headline": "The uncompromising step-by-step master plan to rebuild from absolute zero to $1,000,000 net worth using high-leverage skills and modern systems.",
    "description": "If you lost everything tomorrow—no money, no audience, and zero network—this is the exact phased playbook to engineer survival cashflow, scale high-ticket service operations, productize into digital leverage, and accumulate an unassailable $1,000,000 asset fortress.",
    "categorySlug": "ai-businesses",
    "categoryName": "AI Businesses",
    "price": 3,
    "originalPrice": 9,
    "currency": "USD",
    "modulesCount": 7,
    "lessonsCount": 28,
    "slidesCount": 112,
    "hoursOfMaterial": "7.5 hours",
    "badge": "Bestseller",
    "rating": 4.9,
    "ratingCount": 1420,
    "href": "/if-i-started-over-with-0-heres-my-exact-plan-to-get-to-1m"
}

formatted_card = "  " + json.dumps(card_53, indent=2).replace("\n", "\n  ") + ",\n"

marker = "export const ALL_PLAYBOOK_SUMMARIES: PlaybookSummary[] = [\n"
idx = text.find(marker)
if idx == -1:
    marker = "export const ALL_PLAYBOOK_SUMMARIES: PlaybookSummary[] = [\r\n"
    idx = text.find(marker)

if idx != -1:
    insert_pos = idx + len(marker)
    text = text[:insert_pos] + formatted_card + text[insert_pos:]
    with open(catalog_path, "w", encoding="utf-8") as f:
        f.write(text)
    print("Inserted Playbook 53 at position #1 in ALL_PLAYBOOK_SUMMARIES!")
else:
    print("ERROR: marker not found!")
