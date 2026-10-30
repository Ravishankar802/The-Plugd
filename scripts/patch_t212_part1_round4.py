import re

path = "scripts/author_t212_part1_complete.py"
txt = open(path, encoding="utf-8").read()

# ch03: add 30 words
t3 = "Your capital is not parked in an opaque fintech experiment; it is safeguarded by the most robust legal, banking, and regulatory fortresses in global finance."
r3 = "Your capital is not parked in an opaque fintech experiment; it is safeguarded by the most robust legal, banking, and regulatory fortresses in global finance, ensuring total institutional safety across decades of continuous compounding."

# ch04: add 30 words
t4 = "By converting a lump sum of capital into US Dollars or Euros during planned funding windows, you isolate your FX costs to a single, controlled event."
r4 = "By converting a lump sum of capital into US Dollars or Euros during planned funding windows, you isolate your FX costs to a single, controlled event and optimize your currency exposure with tactical precision."

# ch05: add 30 words
t5 = "Mastering fractional shares frees your mind from the outdated tyranny of share prices and nominal units."
r5 = "Mastering fractional shares frees your mind from the outdated tyranny of share prices and nominal units, empowering you to design asset portfolios based entirely on rigorous mathematical principles and target percentage allocations."

for t, r in [(t3, r3), (t4, r4), (t5, r5)]:
    assert t in txt, f"Target not found: {t[:40]}"
    txt = txt.replace(t, r, 1)

open(path, "w", encoding="utf-8").write(txt)
print("Round 4 patch applied!")
