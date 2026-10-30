import sys
import re
import os

BOOK_DIR = r"c:\PROJECTS\The Plugd\book-manuscripts\how-i-turned-300-to-100-000-at-19-my-side-hustles"

# Let's inspect the exact word counts
with open("scripts/author_book3_ch06_to_11.py", "r", encoding="utf-8") as f:
    text = f.read()

# Remove the validate_and_save calls at bottom to test
safe_text = re.sub(r'validate_and_save\(.*', '', text)
local_vars = {}
exec(safe_text, local_vars)

for name in ['ch06_paras', 'ch07_paras', 'ch10_paras', 'ch11_paras']:
    plist = local_vars[name]
    counts = [len(p.split()) for p in plist]
    print(f"{name}: total {sum(counts)} words, min={min(counts)}, max={max(counts)}")
