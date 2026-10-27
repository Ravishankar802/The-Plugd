import json
import os
import re

# Books 1-8
BASE_BOOKS = [
    {
        "slug": "i-sell-pdfs-with-ai-and-it-changed-my-life-revealing-everything",
        "file": "./sell-pdfs-with-ai-book",
        "export": "SELL_PDFS_WITH_AI_BOOK_PAGES",
        "aliases": []
    },
    {
        "slug": "7-side-hustles-students-can-start-in-2027",
        "file": "./seven-side-hustles-students-2027-book",
        "export": "SEVEN_SIDE_HUSTLES_2027_BOOK_PAGES",
        "aliases": ["ai-businesses-57"]
    },
    {
        "slug": "3-best-ai-businesses-to-start-before-2027-and-the-one-id-start-today",
        "file": "./three-best-ai-businesses-2027-book",
        "export": "THREE_BEST_AI_BUSINESSES_2027_BOOK_PAGES",
        "aliases": ["ai-businesses-59"]
    },
    {
        "slug": "5-simple-apps-making-10-000-month-that-you-can-build-with-ai",
        "file": "./five-simple-apps-10k-month-book",
        "export": "FIVE_SIMPLE_APPS_10K_BOOK_PAGES",
        "aliases": ["ai-businesses-60"]
    },
    {
        "slug": "if-youre-in-your-20s-heres-how-to-win-at-anything",
        "file": "./win-in-your-20s-book",
        "export": "WIN_IN_YOUR_20S_BOOK_PAGES",
        "aliases": ["ai-businesses-55"]
    },
    {
        "slug": "the-smartest-way-to-capitalize-on-the-ai-gold-rush",
        "file": "./smartest-way-ai-gold-rush-book",
        "export": "SMARTEST_WAY_AI_GOLD_RUSH_BOOK_PAGES",
        "aliases": ["ai-businesses-56"]
    },
    {
        "slug": "if-i-started-over-with-0-heres-my-exact-plan-to-get-to-1m",
        "file": "./started-over-zero-plan-1m-book",
        "export": "STARTED_OVER_ZERO_PLAN_1M_BOOK_PAGES",
        "aliases": ["ai-businesses-53"]
    },
    {
        "slug": "if-i-wanted-to-become-a-millionaire-in-2026-this-is-what-id-do-full-blueprint",
        "file": "./become-millionaire-2027-book",
        "export": "BECOME_MILLIONAIRE_2027_BOOK_PAGES",
        "aliases": ["ai-businesses-54"]
    }
]

# Load CONFIGS from build_all_52_books.py
with open("scripts/build_all_52_books.py", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r"CONFIGS = (\[[\s\S]*?\])\r?\n\r?\n# Load thumbnails", text)
configs_52 = eval(m.group(1))

all_books = list(BASE_BOOKS)
for c in configs_52:
    # convert output_file 'src/lib/book-content/xxx.ts' to './xxx'
    base = os.path.basename(c["output_file"]).replace(".ts", "")
    all_books.append({
        "slug": c["slug"],
        "file": f"./{base}",
        "export": c["export_name"],
        "aliases": []
    })

print(f"Total books to register in index: {len(all_books)}")

# Generate src/lib/book-content/index.ts
lines = []
lines.append('import { WebBookPage, SELL_PDFS_WITH_AI_BOOK_PAGES } from "./sell-pdfs-with-ai-book";')
lines.append('')
lines.append('export type { WebBookPage };')
lines.append('')
lines.append('export async function getBookPages(courseSlug: string): Promise<WebBookPage[]> {')
lines.append('  switch (courseSlug) {')

for b in all_books:
    cases = [b["slug"]] + b["aliases"]
    for case_slug in cases:
        lines.append(f'    case "{case_slug}":')
    lines.append(f'      return (await import("{b["file"]}")).{b["export"]};')

lines.append('    default:')
lines.append('      return SELL_PDFS_WITH_AI_BOOK_PAGES;')
lines.append('  }')
lines.append('}')
lines.append('')

# Export array of all book slugs
all_slugs = []
for b in all_books:
    all_slugs.append(b["slug"])
    for a in b["aliases"]:
        all_slugs.append(a)

lines.append('export const ALL_BOOK_SLUGS = new Set(' + json.dumps(all_slugs, indent=2) + ');')
lines.append('')

with open("src/lib/book-content/index.ts", "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print("Wrote src/lib/book-content/index.ts successfully.")
