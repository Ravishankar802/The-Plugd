import re, glob, os

files = [
    'src/lib/book-content/five-money-principles-20s-book.ts',
    'src/lib/book-content/five-proven-ways-book.ts',
    'src/lib/book-content/laziest-way-500-day-book.ts',
    'src/lib/book-content/laziest-ways-money-ai-beginners-book.ts',
    'src/lib/book-content/only-investing-start-100-book.ts',
    'src/lib/book-content/seven-billionaire-books-read-book.ts',
    'src/lib/book-content/seven-side-hustles-students-2026-book.ts',
    'src/lib/book-content/seven-side-hustles-students-2027-book.ts'
]

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        txt = f.read()
    img = re.search(r'"imageUrl":\s*"([^"]+)"', txt)
    lbl = re.search(r'"label":\s*"([^"]+)"', txt)
    title = re.search(r'// Title:\s*(.+)', txt)
    fname = os.path.basename(fpath)
    print(f"{fname}:")
    print(f"  Title: {title.group(1) if title else 'N/A'}")
    print(f"  Label: {lbl.group(1) if lbl else 'N/A'}")
    print(f"  Image: {img.group(1) if img else 'N/A'}")
