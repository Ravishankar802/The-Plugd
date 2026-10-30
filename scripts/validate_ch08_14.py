import os
import re
import sys

BANNED = [
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

EXPECTED_TITLES = {
    "08-converting-free-audits-into-monthly-retainers.md": "Converting Free Audits into Monthly Retainers",
    "09-the-ten-thousand-dollar-inflection-point.md": "The Ten Thousand Dollar Inflection Point",
    "10-managing-burnout-while-working-seventy-hour-weeks.md": "Managing Burnout While Working Seventy-Hour Weeks",
    "11-hustle-three-productized-local-business-automation.md": "Hustle Three: Productized Local Business Automation",
    "12-selling-instant-response-systems-to-contractors.md": "Selling Instant-Response Systems to Contractors",
    "13-the-fifty-thousand-dollar-operational-hurdle.md": "The Fifty Thousand Dollar Operational Hurdle",
    "14-hiring-your-first-freelance-assistants.md": "Hiring Your First Freelance Assistants",
}

DIR_PATH = r"c:\PROJECTS\The Plugd\book-manuscripts\how-i-turned-300-to-100-000-at-19-my-side-hustles"

def check_file(filename):
    filepath = os.path.join(DIR_PATH, filename)
    if not os.path.exists(filepath):
        return [f"File {filename} does not exist."]
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.splitlines()
    errors = []
    
    expected_title = EXPECTED_TITLES[filename]
    if len(lines) < 3:
        return [f"{filename}: file too short"]
        
    if lines[0] != f"# {expected_title}":
        errors.append(f"{filename}: Line 1 must be '# {expected_title}', got '{lines[0]}'")
    if lines[1] != "":
        errors.append(f"{filename}: Line 2 must be empty line, got '{lines[1]}'")
        
    # Check body structure
    raw_paras = content.split("\n\n")
    # First item is '# Title'
    if raw_paras[0].strip() != f"# {expected_title}":
        errors.append(f"{filename}: first block is not title")
        
    paras = raw_paras[1:]
    # Check if last item has trailing newline
    paras = [p.strip() for p in paras if p.strip()]
    
    if not (16 <= len(paras) <= 18):
        errors.append(f"{filename}: Expected 16-18 paragraphs, found {len(paras)}")
        
    total_words = 0
    shingles = {}
    
    for i, p in enumerate(paras, 1):
        if "\n" in p:
            errors.append(f"{filename} para {i}: Contains embedded newline")
        words = p.split()
        wc = len(words)
        total_words += wc
        if not (65 <= wc <= 135):
            errors.append(f"{filename} para {i}: Word count {wc} out of range [65, 135]")
            
        # check markdown
        if re.search(r'(\*\*|\*|`|\[.*?\]\(.*?\)|\#{1,6}\s|^\s*[-*+]\s|^\s*\d+\.\s|^\s*>)', p):
            errors.append(f"{filename} para {i}: Contains prohibited markdown formatting")
            
        for b in BANNED:
            if b.search(p):
                errors.append(f"{filename} para {i}: Contains banned term {b.pattern}")
                
        # shingles of 12 words
        ws = [re.sub(r'[^a-z0-9\']', '', w.lower()) for w in words]
        ws = [w for w in ws if w]
        for k in range(0, len(ws) - 11):
            sh = " ".join(ws[k:k+12])
            shingles[sh] = shingles.get(sh, 0) + 1
            if shingles[sh] > 1:
                errors.append(f"{filename} para {i}: Internal duplicate 12-word shingle '{sh}'")
                
    if not (1550 <= total_words <= 1850):
        errors.append(f"{filename}: Total word count {total_words} out of range [1550, 1850]")
        
    return errors, total_words, len(paras)

if __name__ == "__main__":
    for fname in EXPECTED_TITLES:
        res = check_file(fname)
        if isinstance(res, tuple):
            errs, tw, nump = res
            if errs:
                print(f"FAILED {fname}: {len(errs)} errors (Words: {tw}, Paras: {nump})")
                for e in errs[:10]:
                    print("  -", e)
            else:
                print(f"PASSED {fname}: {tw} words, {nump} paragraphs")
        else:
            print(f"FAILED {fname}: {res}")
