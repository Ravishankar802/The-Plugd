import re

files = [
  'src/lib/book-content/investing-for-beginners-25-min-book.ts',
  'src/lib/book-content/making-money-online-easy-copy-me-book.ts',
  'src/lib/book-content/leadership-never-win-book.ts',
  'src/lib/book-content/copy-paste-first-5k-book.ts',
  'src/lib/book-content/faceless-shorts-30k-month-book.ts'
]

for f in files:
    with open(f, 'r', encoding='utf-8') as fh:
        text = fh.read()
    pages = len(re.findall(r'pageNumber:\s*\d+', text))
    title = re.findall(r'bookTitle:\s*["\']([^"\']+)["\']', text)
    t = title[0] if title else 'Unknown'
    print(f"{f}: {pages} pages, title='{t}'")
