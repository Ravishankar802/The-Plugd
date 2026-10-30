import re

files = [
    ('making-money-online-is-easy-actually-just-copy-me', 'src/lib/book-content/making-money-online-easy-copy-me-book.ts'),
    ('if-you-dont-understand-leadership-youll-never-win', 'src/lib/book-content/leadership-never-win-book.ts'),
    ('copy-paste-this-strategy-to-make-your-first-5-000-online', 'src/lib/book-content/copy-paste-first-5k-book.ts'),
    ('the-30k-month-al-faceless-shorts-method-nobodys-talking-about', 'src/lib/book-content/faceless-shorts-30k-month-book.ts')
]

for slug, fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        text = f.read(12000)
    print('===', slug, '===')
    # find title, subtitle
    title_m = re.search(r'// Title:\s*(.+)', text)
    if title_m:
        print('Title:', title_m.group(1).strip())
    # find TOC or chapter titles
    chapters = re.findall(r'"chapterTitle":\s*"([^"]+)"', text)
    unique_chs = []
    for c in chapters:
        if c not in unique_chs:
            unique_chs.append(c)
    print(f'Found {len(unique_chs)} unique chapter titles:')
    for c in unique_chs[:6]:
        print('  -', c)
