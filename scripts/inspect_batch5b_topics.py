import re
import json

files = [
  ('investing-for-beginners-in-25-minutes', 'src/lib/book-content/investing-for-beginners-25-min-book.ts'),
  ('making-money-online-is-easy-actually-just-copy-me', 'src/lib/book-content/making-money-online-easy-copy-me-book.ts'),
  ('if-you-dont-understand-leadership-youll-never-win', 'src/lib/book-content/leadership-never-win-book.ts'),
  ('copy-paste-this-strategy-to-make-your-first-5-000-online', 'src/lib/book-content/copy-paste-first-5k-book.ts'),
  ('the-30k-month-al-faceless-shorts-method-nobodys-talking-about', 'src/lib/book-content/faceless-shorts-30k-month-book.ts')
]

for slug, fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        text = f.read()
    # Find headers or chapter names
    toc = re.findall(r'"type":\s*"chapter-opener"[^}]+', text)
    headers = re.findall(r'"header":\s*"([^"]+)"', text)
    unique_headers = []
    for h in headers:
        if h not in unique_headers and not h.startswith("CHAPTER") and not h.startswith("PART"):
            unique_headers.append(h)
    print(f"\n=== {slug} ===")
    print(f"File size: {len(text)} chars")
    print(f"Sample headers ({len(unique_headers)}):", unique_headers[:10])
