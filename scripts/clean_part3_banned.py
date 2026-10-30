import re

path = "scripts/author_t212_part3.py"
txt = open(path, encoding="utf-8").read()

# Replace sovereign and asymmetric
txt = re.sub(r'\bsovereign collateral\b', 'government collateral', txt, flags=re.I)
txt = re.sub(r'\bsovereign wealth funds\b', 'national wealth funds', txt, flags=re.I)
txt = re.sub(r'\bsovereign-backed\b', 'government-backed', txt, flags=re.I)
txt = re.sub(r'\bsovereign bonds\b', 'government bonds', txt, flags=re.I)
txt = re.sub(r'\bsovereign extraction\b', 'state extraction', txt, flags=re.I)
txt = re.sub(r'\bsovereign\b', 'government', txt, flags=re.I)

txt = re.sub(r'\bAsymmetric Volatility Drag\b', 'Disproportionate Volatility Drag', txt, flags=re.I)
txt = re.sub(r'\basymmetric vulnerability\b', 'structural vulnerability', txt, flags=re.I)
txt = re.sub(r'\basymmetric\b', 'disproportionate', txt, flags=re.I)

open(path, "w", encoding="utf-8").write(txt)
print("author_t212_part3.py cleaned of banned terms successfully!")
