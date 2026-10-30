# Helper to verify text and write chapters
import re
import os

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

def validate_and_write(filename, title, paras, out_dir):
    print(f"\n==========================================")
    print(f"Validating {filename}: {title}")
    print(f"==========================================")
    
    if len(paras) not in [16, 17, 18]:
        raise ValueError(f"Paragraph count {len(paras)} is not in [16, 17, 18]")
        
    total_words = 0
    clean_paras = []
    
    for i, p in enumerate(paras, 1):
        p_clean = " ".join(p.strip().split())
        if '\n' in p_clean:
            raise ValueError(f"Para {i} has internal newline")
        
        pw = len(p_clean.split())
        total_words += pw
        print(f"Para {i:02d}: {pw} words")
        
        if pw < 65 or pw > 135:
            raise ValueError(f"Para {i} word count {pw} outside [65, 135]")
            
        if re.search(r'[*_`>|#]', p_clean):
            raise ValueError(f"Para {i} contains markdown symbols: {p_clean}")
            
        if re.match(r'^\s*[-+*]\s+', p_clean) or re.match(r'^\s*\d+\.\s+', p_clean):
            raise ValueError(f"Para {i} looks like list item")
            
        for b in BANNED_PATTERNS:
            if b.search(p_clean):
                raise ValueError(f"Para {i} contains banned pattern {b.pattern}")
                
        clean_paras.append(p_clean)
        
    print(f"Total Words: {total_words} (Target: 1550 - 1850)")
    if total_words < 1550 or total_words > 1850:
        raise ValueError(f"Total words {total_words} outside [1550, 1850]")
        
    content = f"# {title}\n\n" + "\n\n".join(clean_paras) + "\n"
    
    dest_path = os.path.join(out_dir, filename)
    with open(dest_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Successfully wrote {dest_path}")
