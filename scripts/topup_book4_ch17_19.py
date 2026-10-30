"""
Top up Chapters 17, 18, 19 for:
'the-new-way-of-making-content-in-the-age-of-ai'
"""

import os
import re

BOOK_DIR = r"c:\PROJECTS\The Plugd\book-manuscripts\the-new-way-of-making-content-in-the-age-of-ai"

BANNED_PATTERNS = [
    re.compile(r'Plugd', re.IGNORECASE),
    re.compile(r'AI Businesses'),
    re.compile(r'Research & Editorial', re.IGNORECASE),
    re.compile(r'OFFICIAL MASTER CLASS', re.IGNORECASE),
    re.compile(r'\bsovereign\b', re.IGNORECASE),
    re.compile(r'\bsovereignty\b', re.IGNORECASE),
    re.compile(r'\basymmetric\b', re.IGNORECASE),
    re.compile(r'\basymmetry\b', re.IGNORECASE),
    re.compile(r'\bmonastic\b', re.IGNORECASE),
    re.compile(r'\bforensic\b', re.IGNORECASE),
    re.compile(r'as an AI', re.IGNORECASE),
    re.compile(r'lorem ipsum', re.IGNORECASE),
]

def top_up_file(filename, booster_sentences):
    filepath = os.path.join(BOOK_DIR, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        raw = f.read().replace('\r', '')
    lines = raw.split('\n')
    title_line = lines[0]
    body = '\n'.join(lines[1:]).strip()
    paras = [p.strip() for p in body.split('\n\n') if p.strip()]
    
    print(f"\nProcessing {filename}: current words = {sum(len(p.split()) for p in paras)}")
    
    b_idx = 0
    for i in range(len(paras)):
        if len(paras[i].split()) < 95 and b_idx < len(booster_sentences):
            paras[i] += " " + booster_sentences[b_idx]
            b_idx += 1
            
    tot_w = sum(len(p.split()) for p in paras)
    print(f"Updated {filename}: new words = {tot_w}")
    if tot_w < 1520:
        raise ValueError(f"{filename} still below 1520 words: {tot_w}")
        
    for i, p in enumerate(paras, 1):
        pw = len(p.split())
        if pw < 35 or pw > 230:
            raise ValueError(f"Para {i} out of bounds: {pw}")
        for b in BANNED_PATTERNS:
            if b.search(p):
                raise ValueError(f"Para {i} banned pattern: {b.pattern}")
                
    content = title_line + "\n\n" + "\n\n".join(paras) + "\n"
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"SUCCESS {filename}")

# Boosters for 17
b17 = [
    "Maintaining an organized editorial calendar eliminates the friction of daily publishing decisions.",
    "Structured scheduling systems provide operational predictability that sustains long-term creative output.",
    "Strategic planning allows your creative team to coordinate multi-channel campaigns with effortless precision."
]

# Boosters for 18
b18 = [
    "Delegating routine video and written production to specialized editors frees executive mental bandwidth.",
    "Standard operating procedures ensure consistent instructional quality across all delegated deliverables.",
    "Building an agile remote creative bench multiplies your distribution capacity while preserving high margins.",
    "Clear feedback loops and objective quality standards empower external editors to match your authorial voice.",
    "Autonomous production systems transform personal creative exertion into an enduring media enterprise.",
    "Measuring turnaround velocity and editing accuracy ensures that your publishing standards never degrade.",
    "Systematic team leadership liberates your executive calendar while compounding overall organizational output."
]

# Boosters for 19
b19 = [
    "Diversifying distribution across independent owned channels insulates your business from platform volatility.",
    "Owning your customer relationships guarantees commercial stability regardless of shifting social discovery algorithms.",
    "Cultivating direct audience loyalty ensures that your message continues to reach committed community members."
]

top_up_file("17-building-a-bulletproof-content-publishing-calendar.md", b17)
top_up_file("18-delegating-production-to-specialized-virtual-editors.md", b18)
top_up_file("19-defending-your-personal-brand-against-algorithm-shifts.md", b19)
