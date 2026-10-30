import os
import sys
import re

BANNED = [
    r'Plugd',
    r'AI Businesses',
    r'Research & Editorial',
    r'OFFICIAL MASTER CLASS',
    r'\bsovereign\b',
    r'\bsovereignty\b',
    r'\basymmetric\b',
    r'\bmonastic\b',
    r'\bforensic\b',
    r'as an AI',
    r'lorem ipsum'
]

def check_chapter(file_path):
    filename = os.path.basename(file_path)
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.splitlines()
    if not lines:
        return [f"{filename}: File is empty"]
    
    problems = []
    if not lines[0].startswith('# '):
        problems.append(f"{filename}: First line must be '# Title', found: {lines[0]}")
    
    if len(lines) > 1 and lines[1] != "":
        problems.append(f"{filename}: Line 2 must be an empty line")

    # Split into paragraphs by blank lines
    body = "\n".join(lines[2:])
    raw_paras = [p.strip() for p in body.split("\n\n") if p.strip()]

    num_paras = len(raw_paras)
    if num_paras < 16 or num_paras > 18:
        problems.append(f"{filename}: Paragraph count is {num_paras}, must be exactly 16 to 18")

    total_words = 0
    for idx, p in enumerate(raw_paras, 1):
        # check single line (no embedded linebreaks)
        if '\n' in p:
            problems.append(f"{filename} para {idx}: contains embedded newline")
        
        # markdown formatting check
        if re.search(r'(\*\*|__|`|^\s*[-*+]\s|^\s*\d+\.\s|^\s*>|^\s*#)', p):
            problems.append(f"{filename} para {idx}: contains markdown formatting")
            
        words = p.split()
        pw = len(words)
        total_words += pw
        if pw < 65:
            problems.append(f"{filename} para {idx}: too short ({pw} words, must be 65-135)")
        elif pw > 135:
            problems.append(f"{filename} para {idx}: too long ({pw} words, must be 65-135)")

        for b in BANNED:
            if re.search(b, p, re.IGNORECASE if 'AI Businesses' not in b else 0):
                problems.append(f"{filename} para {idx}: contains banned term matching {b}")

    if total_words < 1550 or total_words > 1850:
        problems.append(f"{filename}: Total word count is {total_words}, must be between 1,550 and 1,850")

    print(f"{filename}: {num_paras} paras, {total_words} words. {'PASS' if not problems else 'FAIL'}")
    return problems

if __name__ == '__main__':
    target_files = sys.argv[1:]
    all_problems = []
    for tf in target_files:
        probs = check_chapter(tf)
        all_problems.extend(probs)
    if all_problems:
        print("\nPROBLEMS ENCOUNTERED:")
        for p in all_problems:
            print(" -", p)
        sys.exit(1)
    else:
        print("\nAll checked files passed successfully!")
