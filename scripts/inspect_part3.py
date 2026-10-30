import re

txt = open("scripts/author_catchup_part3.py", encoding="utf-8").read()
# Let's extract each array cleanly:
lines = txt.split("\n")
cur_var = None
var_paras = {}

for line in lines:
    m = re.match(r"^(ch\d+_paras)\s*=\s*\[", line)
    if m:
        cur_var = m.group(1)
        var_paras[cur_var] = []
        continue
    if cur_var:
        if line.strip() == "]":
            cur_var = None
            continue
        p = line.strip()
        if p.startswith('"') and (p.endswith('",') or p.endswith('"')):
            p_clean = p.strip('",')
            var_paras[cur_var].append(p_clean)

for v, paras in var_paras.items():
    w = sum(len(p.split()) for p in paras)
    print(v, len(paras), "paras", w, "words")
