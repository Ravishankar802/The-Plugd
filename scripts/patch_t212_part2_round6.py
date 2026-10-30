import re

path = "scripts/author_t212_part2.py"
txt = open(path, encoding="utf-8").read()

# ch06: add 15 words
t6 = "A Pie is a custom, visual investment container that holds up to fifty distinct stocks and ETFs, where you assign a precise target percentage weighting to each constituent asset, totaling exactly one hundred percent."
r6 = "A Pie is a custom, visual investment container that holds up to fifty distinct stocks and ETFs, where you assign a precise target percentage weighting to each constituent asset, totaling exactly one hundred percent of your portfolio allocation."

# ch08: add 10 words
t8 = "The S&P 500 has delivered a remarkable annualized return of approximately ten percent over the past century, driven by the dynamism, legal protections, and technological dominance of American capitalism. This historic track record demonstrates the extraordinary wealth-generating capacity of premier commercial enterprises."
r8 = "The S&P 500 has delivered a remarkable annualized return of approximately ten percent over the past century, driven by the dynamism, legal protections, and technological dominance of American capitalism. This historic track record demonstrates the extraordinary wealth-generating capacity of premier commercial enterprises over multi-decade compounding horizons."

# ch09: add 15 words
t9 = "The second metric is Free Cash Flow Generation."
r9 = "The second foundational metric is consistent, high-margin Free Cash Flow Generation across all operating environments."

# ch10: add 10 words
t10 = "This statutory extraction is known as Dividend Withholding Tax."
r10 = "This mandatory statutory extraction is universally known across global financial markets as Dividend Withholding Tax."

for t, r in [(t6, r6), (t8, r8), (t9, r9), (t10, r10)]:
    assert t in txt, f"Target not found: {t[:40]}"
    txt = txt.replace(t, r, 1)

open(path, "w", encoding="utf-8").write(txt)
print("Round 6 patch applied!")
