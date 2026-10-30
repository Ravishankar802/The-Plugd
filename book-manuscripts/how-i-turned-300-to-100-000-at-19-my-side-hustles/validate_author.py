import re
import os
import sys

BANNED_PATTERNS = [
    re.compile(r'Plugd', re.I),
    re.compile(r'AI Businesses'),
    re.compile(r'Research & Editorial', re.I),
    re.compile(r'OFFICIAL MASTER CLASS', re.I),
    re.compile(r'\bsovereign\b', re.I),
    re.compile(r'\bsovereignty\b', re.I),
    re.compile(r'\basymmetric\b', re.I),
    re.compile(r'\bmonastic\b', re.I),
    re.compile(r'\bforensic\b', re.I),
    re.compile(r'as an AI', re.I),
    re.compile(r'lorem ipsum', re.I)
]

def check_chapter(file_path):
    issues = []
    if not os.path.exists(file_path):
        return [f"File {file_path} does not exist"]
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.splitlines()
    if not lines or not lines[0].startswith('# '):
        issues.append("Line 1 must start with '# '")
    
    if len(lines) > 1 and lines[1] != "":
        issues.append("Line 2 must be an empty line")

    # Split into paragraphs by blank lines
    raw_paras = content.split('\n\n')
    # first element has the title
    first_block = raw_paras[0].splitlines()
    if len(first_block) > 1:
        # Title plus something else without double newline
        issues.append("Title block should only be '# Title'")
    
    paras = raw_paras[1:]
    # Check paragraph count: exactly 16 to 18
    if not (16 <= len(paras) <= 18):
        issues.append(f"Paragraph count is {len(paras)}, must be between 16 and 18")

    total_words = 0
    for idx, p in enumerate(paras, 1):
        p_clean = p.strip()
        if not p_clean:
            issues.append(f"Paragraph {idx} is empty or extra blank line found")
            continue
        
        # Check no embedded newline
        if '\n' in p_clean:
            issues.append(f"Paragraph {idx} contains internal newlines")
            
        words = p_clean.split()
        pw = len(words)
        total_words += pw

        if pw < 65 or pw > 135:
            issues.append(f"Paragraph {idx} word count {pw} outside [65, 135]")

        # Check banned formatting: **, *, `, -, 1., >, |, #
        if re.search(r'[*_`>|#]', p_clean):
            issues.append(f"Paragraph {idx} contains forbidden markdown symbols (*, _, `, >, |, #)")
        if re.match(r'^\s*[-+*]\s+', p_clean):
            issues.append(f"Paragraph {idx} looks like a list item")
        if re.match(r'^\s*\d+\.\s+', p_clean):
            issues.append(f"Paragraph {idx} looks like an ordered list item")

        # Check banned words
        for b in BANNED_PATTERNS:
            if b.search(p_clean):
                issues.append(f"Paragraph {idx} contains banned word matching {b.pattern}")

    if not (1550 <= total_words <= 1850):
        issues.append(f"Total word count {total_words} outside [1550, 1850]")

    return issues, len(paras), total_words

if __name__ == '__main__':
    for path in sys.argv[1:]:
        issues, pcount, wcount = check_chapter(path)
        print(f"=== {os.path.basename(path)}: {pcount} paras, {wcount} words ===")
        if issues:
            for iss in issues:
                print(f"  [ISSUE] {iss}")
        else:
            print("  OK! All checks passed.")
