import json
import re
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
from generate_batch_6_configs import CONFIGS_BATCH_6

catalog_path = "src/lib/playbooks-catalog.ts"
with open(catalog_path, "r", encoding="utf-8") as f:
    catalog_text = f.read()

# We need to replace items 41 to 50, and append 51 and 52 before the closing `];` of PLAYBOOKS_CATALOG.
# First find where ai-businesses-41 starts
idx_41 = catalog_text.find('"id": "ai-businesses-41"')
if idx_41 == -1:
    idx_41 = catalog_text.find("'id': 'ai-businesses-41'")

# Back up to the opening `{` of item 41
open_brace_41 = catalog_text.rfind('{', 0, idx_41)

# Find the end of item 50: find "ai-businesses-50" then the closing `}`
idx_50 = catalog_text.find('"id": "ai-businesses-50"')
close_brace_50 = catalog_text.find('}', idx_50)

print(f"Replacing from index {open_brace_41} to {close_brace_50+1}")

# Construct the replacement cards for 41-52
new_cards = []
for idx, pb in enumerate(CONFIGS_BATCH_6):
    slug = pb["slug"]
    total_mods = len(pb["modules"])
    total_lessons = total_mods * 4
    total_slides = total_mods * 16
    rating_count = 620 + idx * 45
    card = {
        "id": pb["id"],
        "slug": slug,
        "title": pb["title"],
        "headline": pb["headline"],
        "description": pb["description"],
        "categorySlug": "ai-businesses",
        "categoryName": "AI Businesses",
        "price": 3,
        "originalPrice": 9,
        "currency": "USD",
        "modulesCount": total_mods,
        "lessonsCount": total_lessons,
        "slidesCount": total_slides,
        "hoursOfMaterial": pb["hoursOfMaterial"],
        "badge": "Hot & New" if idx % 2 == 1 else "Bestseller",
        "rating": 4.9,
        "ratingCount": rating_count,
        "href": f"/{slug}"
    }
    new_cards.append(card)

# Format JSON nicely with 2 spaces and indentation of 2
cards_formatted = ",\n".join("  " + json.dumps(c, indent=2).replace("\n", "\n  ") for c in new_cards)

new_catalog_text = catalog_text[:open_brace_41] + cards_formatted + catalog_text[close_brace_50+1:]

with open(catalog_path, "w", encoding="utf-8") as f:
    f.write(new_catalog_text)

print("Catalog patched successfully with Playbooks 41-52!")
