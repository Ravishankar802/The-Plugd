import re

files = [
    'ai-side-hustles-2026-book.ts',
    'rich-social-media-playbook-book.ts',
    'catch-up-life-logic-book.ts',
    'trading-212-full-guide-book.ts',
    'seven-proven-ways-money-ai-book.ts',
    'honest-advice-get-rich-book.ts'
]

for f in files:
    content = open('src/lib/book-content/' + f, encoding='utf-8').read()
    pages = len(re.findall(r'pageNumber:', content))
    # Count words in paragraphs: [...]
    # find all paragraph arrays
    para_blocks = re.findall(r'paragraphs:\s*\[(.*?)\]', content, re.DOTALL)
    total_words = 0
    for block in para_blocks:
        paras = re.findall(r'["\'](.*?)["\']', block)
        for p in paras:
            total_words += len(p.split())
    print(f"{f}: {pages} pages, approx {total_words} words")
