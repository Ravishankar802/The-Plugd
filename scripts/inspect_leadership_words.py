import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from author_leadership_part1 import ch06_paras, ch07_paras, ch08_paras, ch09_paras, ch10_paras
import re

with open('scripts/patch_leadership_01_10.py', 'r', encoding='utf-8') as f:
    text = f.read()

def get_exts(varname):
    m = re.search(varname + r'\s*=\s*\[(.*?)\]', text, re.DOTALL)
    if not m:
        return []
    lines = m.group(1).split('\n')
    res = []
    for l in lines:
        l = l.strip()
        if l.startswith('"') and l.endswith('",'):
            res.append(l[1:-2])
        elif l.startswith('"') and l.endswith('"'):
            res.append(l[1:-1])
    return res

for idx, (p_list, varname) in enumerate([(ch06_paras, 'ch06_exts'), (ch07_paras, 'ch07_exts'),
                                         (ch08_paras, 'ch08_exts'), (ch09_paras, 'ch09_exts'), (ch10_paras, 'ch10_exts')], 6):
    exts = get_exts(varname)
    enriched = [p + ' ' + ext for p, ext in zip(p_list, exts)]
    total = sum(len(p.split()) for p in enriched)
    print(f'ch{idx:02d}: paras={len(enriched)} base={sum(len(p.split()) for p in p_list)} ext={sum(len(e.split()) for e in exts)} total={total}')
