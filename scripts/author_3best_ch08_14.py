# Python authoring script for Chapters 08-14 of
# '3 Best AI Businesses to Start Before 2027 and the One I Would Start Today'
import os
import re

DIR_PATH = r"c:\PROJECTS\The Plugd\book-manuscripts\3-best-ai-businesses-to-start-before-2027-and-the-one-id-start-today"

BANNED_WORDS = [
    re.compile(r'Plugd', re.I),
    re.compile(r'AI Businesses', re.I),
    re.compile(r'Research & Editorial', re.I),
    re.compile(r'OFFICIAL MASTER CLASS', re.I),
    re.compile(r'\bsovereign\b', re.I),
    re.compile(r'\bsovereignty\b', re.I),
    re.compile(r'\basymmetric\b', re.I),
    re.compile(r'\bmonastic\b', re.I),
    re.compile(r'\bforensic\b', re.I),
    re.compile(r'as an AI', re.I),
    re.compile(r'lorem ipsum', re.I),
]

def check_chapter(title, paras):
    errors = []
    if not (16 <= len(paras) <= 18):
        errors.append(f"Paragraph count {len(paras)} not in 16-18")
    
    total_words = len(title.split())
    shingles = {}
    for idx, p in enumerate(paras, 1):
        if "\n" in p or "\r" in p:
            errors.append(f"Para {idx} contains newline")
        words = p.split()
        wc = len(words)
        total_words += wc
        if not (65 <= wc <= 135):
            errors.append(f"Para {idx} word count {wc} out of range [65, 135]")
        if re.search(r'(\*\*|\*|`|\[.*?\]\(.*?\)|\#{1,6}\s|^\s*[-*+]\s|^\s*\d+\.\s|^\s*>)', p):
            errors.append(f"Para {idx} has markdown formatting")
        for bw in BANNED_WORDS:
            if bw.search(p):
                errors.append(f"Para {idx} contains banned term {bw.pattern}")
        ws = [re.sub(r'[^a-z0-9\']', '', w.lower()) for w in words]
        ws = [w for w in ws if w]
        for k in range(0, len(ws) - 11):
            sh = " ".join(ws[k:k+12])
            shingles[sh] = shingles.get(sh, 0) + 1
            if shingles[sh] > 1:
                errors.append(f"Para {idx} duplicate 12-word shingle '{sh}'")
                
    if not (1550 <= total_words <= 1850):
        errors.append(f"Total words {total_words} out of range [1550, 1850]")
        
    return errors, total_words

print("Validator ready.")
