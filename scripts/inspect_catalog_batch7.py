import json, re

with open('src/lib/playbooks-catalog.ts', 'r', encoding='utf-8') as f:
    text = f.read()

slugs = [
    'the-5-money-principles-that-will-make-anyone-rich-in-their-20s',
    '5-proven-ways-to-make-money-with-ai-no-experience',
    'laziest-way-to-make-money-online-in-2026-500-day',
    'laziest-ways-to-make-money-with-ai-for-beginners',
    'the-only-investing-video-youll-ever-need-start-with-100',
    'these-are-the-best-business-books-to-read-7-billionaire-books',
    '7-side-hustles-students-can-start-in-2026',
    '7-side-hustles-students-can-start-in-2027'
]

for s in slugs:
    pos = text.find(f'"{s}"')
    if pos != -1:
        # find enclosing object
        start = text.rfind('{', 0, pos)
        end = text.find('}', pos)
        obj_txt = text[start:end+1]
        title_m = re.search(r'"title":\s*"([^"]+)"', obj_txt)
        img_m = re.search(r'"image":\s*"([^"]+)"', obj_txt)
        head_m = re.search(r'"headline":\s*"([^"]+)"', obj_txt)
        print(f"SLUG: {s}")
        print(f"  Title: {title_m.group(1) if title_m else 'N/A'}")
        print(f"  Cover: {img_m.group(1) if img_m else 'N/A'}")
        print(f"  Headline: {head_m.group(1) if head_m else 'N/A'}")
