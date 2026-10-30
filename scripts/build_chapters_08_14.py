import os
import re
import sys

TARGET_DIR = r"c:\PROJECTS\The Plugd\book-manuscripts\the-new-way-of-making-content-in-the-age-of-ai"

BANNED = [
    re.compile(r"Plugd", re.I),
    re.compile(r"AI Businesses"),
    re.compile(r"Research & Editorial", re.I),
    re.compile(r"OFFICIAL MASTER CLASS", re.I),
    re.compile(r"\bsovereign\b", re.I),
    re.compile(r"\bsovereignty\b", re.I),
    re.compile(r"\basymmetric\b", re.I),
    re.compile(r"\bmonastic\b", re.I),
    re.compile(r"\bforensic\b", re.I),
    re.compile(r"as an AI", re.I),
    re.compile(r"lorem ipsum", re.I),
]

def validate_chapter(filename, title, paragraphs):
    errors = []
    if len(paragraphs) < 16 or len(paragraphs) > 18:
        errors.append(f"{filename}: paragraph count {len(paragraphs)} not between 16 and 18")
    
    total_words = 0
    for idx, p in enumerate(paragraphs, 1):
        if "\n" in p:
            errors.append(f"{filename} para {idx}: contains embedded newline")
        if re.search(r"(\*\*|\*|`|#|>|\[|\]|- |\d+\.)", p):
            errors.append(f"{filename} para {idx}: contains markdown formatting")
        words = p.split()
        pw = len(words)
        total_words += pw
        if pw < 65 or pw > 135:
            errors.append(f"{filename} para {idx}: word count {pw} outside range [65, 135]")
        for b in BANNED:
            if b.search(p):
                errors.append(f"{filename} para {idx}: contains banned term {b.pattern}")
    
    if total_words < 1550 or total_words > 1850:
        errors.append(f"{filename}: total words {total_words} outside range [1550, 1850]")
        
    return errors, total_words

print("Validator ready.")
