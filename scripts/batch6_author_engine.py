"""
Batch 6 Author Engine: Quality standards, cleaning, verification and file writing.
Strict adherence:
- No markdown formatting (*, **, `, -, 1., >, # in body).
- Paragraph word count range: 35 to 230 words.
- Single continuous line per paragraph.
- Zero banned phrases: Plugd, AI Businesses, Research & Editorial, OFFICIAL MASTER CLASS,
  sovereign, sovereignty, asymmetric, asymmetry, monastic, forensic, as an AI, lorem ipsum.
"""
import os
import re

BANNED_WORDS = [
    "plugd",
    "ai businesses",
    "research & editorial",
    "official master class",
    "sovereign",
    "sovereignty",
    "asymmetric",
    "asymmetry",
    "monastic",
    "forensic",
    "as an ai",
    "lorem ipsum"
]

def clean_paragraph(p: str) -> str:
    """Strip any accidental markdown syntax and normalize single line whitespace."""
    p = p.replace("*", "").replace("`", "").replace("#", "").replace(">", "").strip()
    p = re.sub(r'^\s*[-•]\s*', '', p)
    p = re.sub(r'^\s*\d+\.\s*', '', p)
    p = re.sub(r'\s+', ' ', p).strip()
    return p

def verify_banned_words(text: str, context: str):
    lower = text.lower()
    for b in BANNED_WORDS:
        if b in lower:
            raise ValueError(f"[{context}] Contains banned word '{b}'!")

def write_and_verify_chapter(slug: str, filename: str, title: str, paragraphs: list, min_words=1500, max_words=1850):
    dir_path = os.path.join("book-manuscripts", slug)
    os.makedirs(dir_path, exist_ok=True)
    file_path = os.path.join(dir_path, filename)
    
    cleaned = []
    total_words = 0
    for i, p in enumerate(paragraphs):
        c = clean_paragraph(p)
        verify_banned_words(c, f"{filename} para {i+1}")
        w_len = len(c.split())
        if w_len < 35 or w_len > 230:
            raise ValueError(f"[{slug}] {filename} para {i+1}: word count {w_len} out of range [35, 230]")
        cleaned.append(c)
        total_words += w_len
        
    if total_words < min_words or total_words > max_words:
        raise ValueError(f"[{slug}] {filename}: total words {total_words} outside [{min_words}, {max_words}]")
        
    content = f"# {title}\n\n" + "\n\n".join(cleaned) + "\n"
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print(f"[{slug}] OK {filename}: {len(cleaned)} paras, {total_words} words.")
    return total_words
