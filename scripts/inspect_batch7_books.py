import json, re

cat = open("src/lib/playbooks-catalog.ts", encoding="utf-8").read()

matches = re.findall(r'\{\s*"id":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"title":\s*"([^"]+)"[\s\S]*?"price":\s*(\d+)', cat)

print(f"Total books parsed: {len(matches)}")

p3_books = [m for m in matches if int(m[3]) == 3]
print(f"Total $3 tier books: {len(p3_books)}")

for idx, (bid, slug, title, price) in enumerate(p3_books, 1):
    print(f"{idx}. [{slug}] {title} (${price})")
