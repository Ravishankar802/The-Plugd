import re
from collections import Counter

with open('src/lib/playbooks-catalog.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Extract items
items = re.findall(r'\{\s*"id":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"title":\s*"([^"]+)"(?:[^{}]*?"price":\s*(\d+))?', text)
print(f"Total items found: {len(items)}")

# Let's find all occurrences of slug and price
pattern = re.compile(r'"slug":\s*"([^"]+)".*?"price":\s*(\d+)', re.DOTALL)
matches = pattern.findall(text)
print(f"Slug-price matches: {len(matches)}")

by_price = {}
for slug, price in matches:
    p = int(price)
    by_price.setdefault(p, []).append(slug)

for p in sorted(by_price.keys(), reverse=True):
    print(f"\n${p} Tier ({len(by_price[p])} books):")
    for s in by_price[p]:
        print(f"  - {s}")
