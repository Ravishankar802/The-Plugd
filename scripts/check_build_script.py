with open('scripts/build_manuscript_books.py', 'r', encoding='utf-8') as f:
    text = f.read()

import re
keys = set(re.findall(r'outline\["([^"]+)"\]', text))
print("Outline keys required:", keys)
