# Script to author and validate chapters 08 to 14
import os
import re

DIR = r"c:\PROJECTS\The Plugd\book-manuscripts\how-i-turned-300-to-100-000-at-19-my-side-hustles"

def verify_and_save(filename, title, paras):
    assert len(paras) in [16, 17, 18], f"Paras count {len(paras)} not in 16-18"
    total_words = 0
    wcs = []
    banned = [
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
    for i, p in enumerate(paras, 1):
        assert '\n' not in p, f"Para {i} contains newline"
        wc = len(p.split())
        wcs.append(wc)
        total_words += wc
        assert 65 <= wc <= 135, f"Para {i} wc {wc} not in [65, 135]"
        assert not re.search(r'(\*\*|\*|`|\[.*?\]\(.*?\)|\#{1,6}\s|^\s*[-*+]\s|^\s*\d+\.\s|^\s*>)', p), f"Para {i} contains markdown"
        for b in banned:
            assert not b.search(p), f"Para {i} contains banned term {b.pattern}"

    assert 1550 <= total_words <= 1850, f"Total words {total_words} not in [1550, 1850]"
    
    content = f"# {title}\n\n" + "\n\n".join(paras) + "\n"
    path = os.path.join(DIR, filename)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"SUCCESS {filename}: {len(paras)} paras, {total_words} words, range [{min(wcs)}, {max(wcs)}]")

print("Builder helper ready.")
