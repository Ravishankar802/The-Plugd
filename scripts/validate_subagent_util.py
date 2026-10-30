import re

def check_text(title, paras):
    print(f"=== CHECKING: {title} ===")
    print(f"Paragraph count: {len(paras)}")
    assert 16 <= len(paras) <= 18, f"Invalid para count {len(paras)}"
    
    banned_patterns = [
        re.compile(r'Plugd', re.I),
        re.compile(r'AI Businesses', re.I),
        re.compile(r'Research & Editorial', re.I),
        re.compile(r'OFFICIAL MASTER CLASS', re.I),
        re.compile(r'\bsovereign\b', re.I),
        re.compile(r'\bsovereignty\b', re.I),
        re.compile(r'\basymmetric\b', re.I),
        re.compile(r'\basymmetry\b', re.I),
        re.compile(r'\bmonastic\b', re.I),
        re.compile(r'\bforensic\b', re.I),
        re.compile(r'as an AI', re.I),
        re.compile(r'lorem ipsum', re.I)
    ]
    
    total_words = 0
    for i, p in enumerate(paras, 1):
        lines = p.split('\n')
        if len(lines) > 1:
            print(f"ERROR: Para {i} has embedded newlines!")
        words = p.split()
        pw = len(words)
        total_words += pw
        if pw < 65 or pw > 135:
            print(f"WARNING/ERROR: Para {i} word count: {pw} (must be 65-135)")
        for bp in banned_patterns:
            if bp.search(p):
                print(f"ERROR: Para {i} contains banned pattern: {bp.pattern}")
        # check markdown
        if re.search(r'(\*\*|\*|`|#|>|\||^\s*[-*+]|^\s*\d+\.)', p):
            print(f"ERROR: Para {i} contains markdown formatting!")
            
    print(f"Total words: {total_words} (required: 1550 - 1850)")
    assert 1550 <= total_words <= 1850, f"Total words {total_words} out of range!"
    print("PASS\n")

print("Validator ready")
