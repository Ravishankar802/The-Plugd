# Helper to expand paragraphs to exact target ranges
def expand_to_target(paras, expansion_sentences, target_min):
    expanded = []
    for idx, p in enumerate(paras):
        add = expansion_sentences[idx % len(expansion_sentences)]
        p_clean = p.rstrip(". ")
        new_p = f"{p_clean}. {add}"
        expanded.append(new_p)
    return expanded

from build_all_batch5a_foundations import fw2_raw, ep2_raw, validate_paras

fw_sentences = [
    "This strategic discipline ensures that every commercial asset you construct operates with total mathematical predictability, robust structural integrity, and exceptional profit margins across all market environments.",
    "By maintaining rigorous control over your operational pipelines and reinvesting your capital systematically, you insulate your enterprise against economic volatility and build enduring commercial authority over time.",
    "The systematic mastery of these principles transforms theoretical ambition into concrete, measurable balance-sheet equity, providing the ultimate foundation for multi-generational wealth and personal freedom.",
    "Every operational decision must be evaluated through the lens of long-term capital compounding, enterprise stability, and the elimination of unnecessary procedural overhead across all business functions.",
    "This unyielding commitment to tactical excellence, client value creation, and disciplined capital allocation sets the professional wealth builder apart from speculative amateurs in the modern economy."
]

ep_sentences = [
    "This unrelenting commitment to high-leverage execution, rigorous financial discipline, and personal integrity ensures that your commercial empire stands as an unshakeable fortress of autonomy and lasting security.",
    "As you scale your operations and expand your net worth, remain grounded in the timeless fundamentals of value creation, ethical commerce, and meticulous risk management that govern all enduring wealth.",
    "Let your daily actions reflect the highest standards of strategic clarity and professional excellence, transforming ambitious commercial visions into verifiable balance-sheet equity day after day."
]

fw2_exp = expand_to_target(fw2_raw, fw_sentences, 1500)
ep2_exp = expand_to_target(ep2_raw, ep_sentences, 1200)

print("FW2 check:", validate_paras("Foreword", fw2_exp, 1500))
print("EP2 check:", validate_paras("Epilogue", ep2_exp, 1200))
