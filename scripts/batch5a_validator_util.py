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

def validate_text(title, paras, min_words, max_words=None):
    if not (12 <= len(paras) <= 18):
        return False, f"Invalid para count: {len(paras)}"
    total_words = len(title.split())
    for idx, p in enumerate(paras):
        if "\n" in p or "\r" in p:
            return False, f"Linebreak in para {idx+1}"
        words = len(p.split())
        if words < 35 or words > 230:
            return False, f"Para {idx+1} word count {words} outside 35-230"
        p_lower = p.lower()
        for bw in BANNED_WORDS:
            if bw in p_lower:
                return False, f"Para {idx+1} contains banned word '{bw}'"
        total_words += words
    if total_words < min_words:
        return False, f"Total words {total_words} < minimum {min_words}"
    if max_words and total_words > max_words:
        return False, f"Total words {total_words} > maximum {max_words}"
    return True, f"PASSED: {len(paras)} paras, {total_words} words"

print("Validator function ready.")
