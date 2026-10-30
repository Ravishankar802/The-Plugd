"""
Master Author Engine for Batch 5B ($7 Tier final 5 books)
Provides strict quality validation, shingle tracking, and file writing.
"""

import os
import re
import json

BASE_DIR = r"c:\PROJECTS\The Plugd\book-manuscripts"

BANNED_PATTERNS = [
    re.compile(r'Plugd', re.IGNORECASE),
    re.compile(r'AI Businesses'),
    re.compile(r'Research & Editorial', re.IGNORECASE),
    re.compile(r'OFFICIAL MASTER CLASS', re.IGNORECASE),
    re.compile(r'\bsovereign\b', re.IGNORECASE),
    re.compile(r'\bsovereignty\b', re.IGNORECASE),
    re.compile(r'\basymmetric\b', re.IGNORECASE),
    re.compile(r'\basymmetry\b', re.IGNORECASE),
    re.compile(r'\bmonastic\b', re.IGNORECASE),
    re.compile(r'\bforensic\b', re.IGNORECASE),
    re.compile(r'as an AI', re.IGNORECASE),
    re.compile(r'lorem ipsum', re.IGNORECASE),
]

def clean_paragraph(p):
    p = " ".join(p.strip().split())
    p = p.replace("**", "").replace("*", "").replace("`", "").replace(">", "").replace("#", "")
    return p

def write_outline(slug, data):
    book_dir = os.path.join(BASE_DIR, slug)
    os.makedirs(book_dir, exist_ok=True)
    p = os.path.join(book_dir, "outline.json")
    with open(p, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print(f"[{slug}] Saved outline.json successfully.")

def write_and_verify_chapter(slug, filename, title, paras, min_words=1500, max_words=1850):
    book_dir = os.path.join(BASE_DIR, slug)
    os.makedirs(book_dir, exist_ok=True)
    
    clean_paras = []
    total_words = 0
    is_fw_ep = filename.startswith("00-") or filename.startswith("99-")
    min_para_w = 35

    
    for i, raw_p in enumerate(paras, 1):
        p = clean_paragraph(raw_p)
        words = p.split()
        pw = len(words)
        total_words += pw
        if pw < min_para_w or pw > 230:
            raise ValueError(f"[{slug}] {filename} para {i}: word count {pw} outside [{min_para_w}, 230]")
        if '\n' in p:
            raise ValueError(f"[{slug}] {filename} para {i}: contains newline")
        for b in BANNED_PATTERNS:
            if b.search(p):
                raise ValueError(f"[{slug}] {filename} para {i}: banned term {b.pattern}")
        clean_paras.append(p)

    if total_words < min_words or total_words > max_words:
        raise ValueError(f"[{slug}] {filename}: total words {total_words} outside [{min_words}, {max_words}]")

    content = f"# {title}\n\n" + "\n\n".join(clean_paras) + "\n"
    out_path = os.path.join(book_dir, filename)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"[{slug}] OK {filename}: {len(clean_paras)} paras, {total_words} words.")

def check_book_shingles(slug):
    book_dir = os.path.join(BASE_DIR, slug)
    files = sorted([f for f in os.listdir(book_dir) if f.endswith('.md') and f != 'outline.md'])
    shingles = {}
    sources = {}
    for f in files:
        with open(os.path.join(book_dir, f), 'r', encoding='utf-8') as fh:
            raw = fh.read().replace('\r', '')
        lines = raw.split('\n')
        body = '\n'.join(lines[1:]).strip()
        paras = [p.strip() for p in body.split('\n\n') if p.strip()]
        for idx, p in enumerate(paras, 1):
            ws = re.sub(r"[^a-z0-9' ]", '', p.lower()).split()
            for k in range(0, len(ws) - 11, 6):
                sh = ' '.join(ws[k:k+12])
                shingles[sh] = shingles.get(sh, 0) + 1
                if sh not in sources:
                    sources[sh] = []
                sources[sh].append(f"{f}#p{idx}")
    
    rep = {k: v for k, v in shingles.items() if v > 2}
    print(f"[{slug}] Total 12-word shingles with count > 2: {len(rep)}")
    if len(rep) > 5:
        for sh, count in list(rep.items())[:5]:
            print(f"  Count {count}: '{sh}' in {sources[sh]}")
        raise ValueError(f"[{slug}] Repeated shingles count {len(rep)} > 5")
    return True
