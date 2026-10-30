"""
Generator and validator for Chapters 01 to 07 of
'The New Way of Making Content in the Age of AI'
"""

import os
import re

DIR = r"c:\PROJECTS\The Plugd\book-manuscripts\the-new-way-of-making-content-in-the-age-of-ai"

BANNED_PATTERNS = [
    re.compile(r'Plugd', re.IGNORECASE),
    re.compile(r'AI Businesses'),
    re.compile(r'Research & Editorial', re.IGNORECASE),
    re.compile(r'OFFICIAL MASTER CLASS', re.IGNORECASE),
    re.compile(r'\bsovereign\b', re.IGNORECASE),
    re.compile(r'\bsovereignty\b', re.IGNORECASE),
    re.compile(r'\basymmetric\b', re.IGNORECASE),
    re.compile(r'\bmonastic\b', re.IGNORECASE),
    re.compile(r'\bforensic\b', re.IGNORECASE),
    re.compile(r'as an AI', re.IGNORECASE),
    re.compile(r'lorem ipsum', re.IGNORECASE),
]

def clean_paragraph(p):
    # Ensure single line
    p = " ".join(p.strip().split())
    # Ensure no markdown symbols
    p = p.replace("**", "").replace("*", "").replace("`", "").replace(">", "").replace("#", "")
    return p

def validate_and_save(filename, title, paragraphs):
    cleaned = [clean_paragraph(p) for p in paragraphs if p.strip()]
    if len(cleaned) < 16 or len(cleaned) > 18:
        raise ValueError(f"{filename}: expected 16-18 paragraphs, got {len(cleaned)}")
    
    total_words = 0
    for idx, p in enumerate(cleaned, 1):
        if "\n" in p or "\r" in p:
            raise ValueError(f"{filename} p{idx}: contains newline")
        for pat in BANNED_PATTERNS:
            if pat.search(p):
                raise ValueError(f"{filename} p{idx}: matched banned pattern {pat.pattern}")
        if re.search(r'(\*\*|__|`|^\s*[-*+]\s|^\s*\d+\.\s|^\s*>|^\s*#)', p):
            raise ValueError(f"{filename} p{idx}: contains markdown formatting")
        wcount = len(p.split())
        print(f"  p{idx:02d}: {wcount:3d} words")
        if wcount < 65 or wcount > 135:
            raise ValueError(f"{filename} p{idx}: word count {wcount} outside [65, 135]")
        total_words += wcount

    print(f"  TOTAL: {total_words} words (target 1550-1850)")
    if total_words < 1550 or total_words > 1850:
        raise ValueError(f"{filename}: total words {total_words} outside [1550, 1850]")

    filepath = os.path.join(DIR, filename)
    content = f"# {title}\n\n" + "\n\n".join(cleaned) + "\n"
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"SUCCESS {filename}: {len(cleaned)} paras, {total_words} words.\n")

