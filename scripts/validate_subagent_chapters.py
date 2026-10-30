import sys
import re
from pathlib import Path

BANNED = [
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
    re.compile(r'lorem ipsum', re.I),
]

def check_chapter(filepath, expected_title=None):
    p = Path(filepath)
    if not p.exists():
        return False, [f"File {filepath} does not exist"]
    
    text = p.read_text(encoding='utf-8')
    lines = text.splitlines()
    
    problems = []
    
    if len(lines) < 3:
        problems.append("File too short")
        return False, problems
        
    if not lines[0].startswith('# '):
        problems.append("Line 1 must start with '# '")
    elif expected_title and lines[0] != f"# {expected_title}":
        problems.append(f"Line 1 title mismatch: got '{lines[0]}', expected '# {expected_title}'")
        
    if lines[1] != "":
        problems.append("Line 2 must be empty")
        
    body = "\n".join(lines[2:]).strip()
    paras = [p.strip() for p in body.split("\n\n") if p.strip()]
    
    num_paras = len(paras)
    if not (16 <= num_paras <= 18):
        problems.append(f"Paragraph count is {num_paras}, must be exactly 16, 17, or 18")
        
    total_words = 0
    for idx, para in enumerate(paras, 1):
        if '\n' in para:
            problems.append(f"Para {idx} has embedded newlines")
            
        # check markdown formatting
        if re.search(r'(\*\*|\*|`|\[.*\]\(.*\)|\#|^>|^[-+*] |^\d+\. )', para):
            problems.append(f"Para {idx} has markdown formatting")
            
        words = para.split()
        pw = len(words)
        total_words += pw
        
        if pw < 65 or pw > 135:
            problems.append(f"Para {idx} word count {pw} outside range [65, 135]")
            
        for b in BANNED:
            if b.search(para):
                problems.append(f"Para {idx} contains banned term: {b.pattern}")
                
    if not (1550 <= total_words <= 1850):
        problems.append(f"Total words {total_words} outside range [1550, 1850]")
        
    return len(problems) == 0, problems, num_paras, total_words

if __name__ == '__main__':
    for ch_num, (fname, title) in [
        (15, ('15-bankroll-management-quarantine-rules-for-young-operators.md', 'Bankroll Management Quarantine Rules for Young Operators')),
        (16, ('16-avoiding-bad-influences-and-distracting-peer-pressure.md', 'Avoiding Bad Influences and Distracting Peer Pressure')),
        (17, ('17-the-final-sprint-to-one-hundred-thousand-dollars.md', 'The Final Sprint to One Hundred Thousand Dollars')),
        (18, ('18-tax-strategy-and-corporate-setup-for-young-earners.md', 'Tax Strategy and Corporate Setup for Young Earners')),
        (19, ('19-what-one-hundred-thousand-dollars-actually-changes.md', 'What One Hundred Thousand Dollars Actually Changes')),
        (20, ('20-the-next-million-dollar-commercial-horizon.md', 'The Next Million Dollar Commercial Horizon')),
    ]:
        path = Path("book-manuscripts/how-i-turned-300-to-100-000-at-19-my-side-hustles") / fname
        if path.exists():
            ok, problems, np, tw = check_chapter(path, title)
            print(f"{fname}: {'OK' if ok else 'FAIL'} | {np} paras | {tw} words")
            for prob in problems:
                print(f"  - {prob}")
        else:
            print(f"{fname}: NOT CREATED YET")
