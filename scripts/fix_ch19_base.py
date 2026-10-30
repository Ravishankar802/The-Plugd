with open("scripts/author_leadership_part2b.py", "r", encoding="utf-8") as f:
    text = f.read()

target = '"Building an antifragile enterprise ensures that your company does not merely survive the brutal storms of creative destruction; it feasts on them. You build an organization that loves volatility, embraces challenge, learns instantaneously from every misstep, and emerges from every crisis with greater market share, deeper customer trust, and unstoppable commercial velocity.",'
replacement = target + '\n    "Systemic antifragility transforms an enterprise into a living learning organism where every frontline breakdown strengthens collective defenses, turning organizational scars into permanent competitive moats that safeguard commercial longevity.",'

if target in text:
    text = text.replace(target, replacement)
    print("Added para to ch19_base")

with open("scripts/author_leadership_part2b.py", "w", encoding="utf-8") as f:
    f.write(text)

import sys
sys.path.insert(0, "scripts")
from author_leadership_part2b import ch19_base
print("ch19_base len:", len(ch19_base))
