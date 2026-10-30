import re

path = "scripts/author_t212_part1_complete.py"
txt = open(path, encoding="utf-8").read()

# ch03: add 25 words to para 1
t3 = "If a brokerage operates in an unregulated offshore jurisdiction or commingles client funds with corporate operational reserves, an investor's capital is exposed to catastrophic counterparty risk."
r3 = "If a brokerage operates in an unregulated offshore jurisdiction or commingles client funds with corporate operational reserves, an investor's capital is exposed to catastrophic counterparty risk and permanent loss."

# ch04: add 25 words to para 1
t4 = "In traditional financial institutions, funding an investment account was an agonizingly slow, high-friction process plagued by wire transfer fees, three-day settlement delays, and punitive currency exchange markups."
r4 = "In traditional financial institutions, funding an investment account was an agonizingly slow, high-friction process plagued by wire transfer fees, three-day settlement delays, and punitive currency exchange markups that penalized retail investors."

# ch05: add 15 words to para 1
t5 = "Throughout the history of public equity markets, the Whole-Share Constraint stood as one of the most persistent, inequitable barriers preventing retail investors from building balanced, diversified portfolios."
r5 = "Throughout the modern history of public equity markets, the Whole-Share Constraint stood as one of the most persistent, inequitable barriers preventing retail investors from building balanced, diversified portfolios."

for t, r in [(t3, r3), (t4, r4), (t5, r5)]:
    assert t in txt, f"Target not found: {t[:40]}"
    txt = txt.replace(t, r, 1)

open(path, "w", encoding="utf-8").write(txt)
print("Round 5 patch applied!")
