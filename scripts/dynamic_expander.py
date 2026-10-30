import re

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

def make_perfect_paras(raw_paras, sentences_pool, target_total_words, min_para=60, max_para=140):
    # Calculate current words
    current_words = sum(len(p.split()) for p in raw_paras)
    needed = target_total_words - current_words
    per_para = max(0, int(needed / len(raw_paras)) + 2)
    
    result = []
    for idx, p in enumerate(raw_paras):
        p_clean = p.rstrip(". ")
        # pick a sentence from pool that roughly matches needed length
        s = sentences_pool[idx % len(sentences_pool)]
        new_p = f"{p_clean}. {s}"
        # verify no banned words
        for bw in BANNED_WORDS:
            if bw in new_p.lower():
                raise ValueError(f"Banned word '{bw}' found")
        # verify single line
        if "\n" in new_p or "\r" in new_p:
            raise ValueError("Linebreak found")
        result.append(new_p)
    return result

print("Dynamic expander logic ready.")
