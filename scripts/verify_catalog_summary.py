# scripts/verify_catalog_summary.py
import glob, os, re

files = [f for f in glob.glob('src/lib/book-content/*-book.ts') if not f.endswith('sell-pdfs-with-ai-book.ts') or 'sell-pdfs-with-ai-book.ts' in f]
print(f"Total book files found: {len(files)}")

total_pages = 0
total_words = 0
min_pages = 9999
max_pages = 0
min_words = 999999
max_words = 0

for f in sorted(files):
    txt = open(f, encoding='utf-8').read()
    pages_count = len(re.findall(r'"pageNumber":', txt))
    contents = re.findall(r'"content":\s*\[(.*?)\]', txt, re.DOTALL)
    book_words = 0
    for c in contents:
        strs = re.findall(r'"((?:[^"\\]|\\.)*)"', c)
        for s in strs:
            book_words += len(s.split())
    total_pages += pages_count
    total_words += book_words
    min_pages = min(min_pages, pages_count)
    max_pages = max(max_pages, pages_count)
    min_words = min(min_words, book_words)
    max_words = max(max_words, book_words)

print("\n" + "="*50)
print("FINAL CATALOG-WIDE REWRITE SUMMARY")
print("="*50)
print(f"Total Books: {len(files)}")
print(f"Total Pages Across Catalog: {total_pages:,}")
print(f"Total Words Across Catalog: {total_words:,}")
print(f"Average Pages per Book: {total_pages // len(files)}")
print(f"Average Words per Book: {total_words // len(files):,}")
print(f"Page Range: {min_pages} to {max_pages} pages")
print(f"Word Range: {min_words:,} to {max_words:,} words")
print("="*50 + "\n")
