import sys, os
sys.path.insert(0, os.path.abspath('.'))

banned = ["sovereign", "asymmetric", "monastic", "forensic", "plugd", "lorem", "master class"]

import scripts.author_honest_advice_part1 as p1
import scripts.author_honest_advice_part2 as p2
import scripts.author_honest_advice_part3 as p3
import scripts.author_honest_advice_part4 as p4

modules = [("part1", p1), ("part2", p2), ("part3", p3), ("part4", p4)]

for mod_name, mod in modules:
    for attr in dir(mod):
        val = getattr(mod, attr)
        if isinstance(val, list) and attr.endswith('_paras'):
            for i, p in enumerate(val):
                for b in banned:
                    if b in p.lower():
                        print(f"[{mod_name}] {attr}[{i}] has banned '{b}': {p[:80]}")
