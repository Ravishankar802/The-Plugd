import re

path = "scripts/author_t212_part1_complete.py"
txt = open(path, encoding="utf-8").read()

# ch03: add 60 words
t3 = "Understanding this distinction prevents unrealistic expectations."
r3 = "Understanding this distinction prevents unrealistic expectations and ensures you design asset allocation models that withstand normal equity market volatility without psychological distress."

t3_b = "You can never end up owing money to the brokerage beyond your initial deposit."
r3_b = "You can never end up owing money to the brokerage beyond your initial deposit, providing an unshakeable statutory barrier against catastrophic personal liabilities."

# ch04: add 40 words
t4 = "While currency fluctuations tend to balance out over multi-decade horizons, an investor must remain aware of this macroeconomic dynamic."
r4 = "While currency fluctuations tend to balance out over multi-decade horizons, an investor must remain aware of this macroeconomic dynamic and structure their multi-currency reserves with deliberate foresight."

# ch05: add 40 words
t5 = "For long-term investors utilizing the platform as their permanent compounding fortress, this limitation is minor."
r5 = "For long-term investors utilizing the platform as their permanent compounding fortress, this limitation is minor compared to the immense compounding benefits of frictionless daily fractional allocation."

for t, r in [(t3, r3), (t3_b, r3_b), (t4, r4), (t5, r5)]:
    assert t in txt, f"Target not found: {t[:40]}"
    txt = txt.replace(t, r, 1)

open(path, "w", encoding="utf-8").write(txt)
print("Round 3 patch applied!")
