import os, json, re

BANNED_WORDS = [
    "plugd",
    "ai businesses",
    "research & editorial",
    "official master class",
    "sovereign",
    "sovereignty",
    "asymmetric",
    "monastic",
    "forensic",
    "as an ai",
    "lorem ipsum"
]

def check_para(p):
    words = len(p.split())
    if words < 35 or words > 230:
        raise ValueError(f"Para word count {words} outside 35-230: {p[:40]}...")
    p_lower = p.lower()
    for bw in BANNED_WORDS:
        if bw in p_lower:
            raise ValueError(f"Banned word '{bw}' in: {p[:40]}...")
    if "\n" in p or "\r" in p:
        raise ValueError("Linebreak in paragraph")
    return p

# Let's write the complete generator for Batch 5A
from setup_batch5a_7tier import batch_5a

# We will generate foundation files (outline.json, outline.md, 00-foreword.md, 99-epilogue.md) for all 5 books
