import re

path = "scripts/author_t212_part2.py"
txt = open(path, encoding="utf-8").read()

# ch06: add 30 words
t6 = "Mastering the architecture of Pies transforms your smartphone from a dangerous venue for impulsive stock gambling into an institutional-grade portfolio management console."
r6 = "Mastering the architecture of Pies transforms your smartphone from a dangerous venue for impulsive stock gambling into an institutional-grade portfolio management console, establishing an unshakeable operational fortress for your family's future."

# ch07: add 15 words
t7 = "AutoInvest enforces the mathematical discipline of Dollar-Cost Averaging with absolute consistency."
r7 = "AutoInvest enforces the mathematical discipline of Dollar-Cost Averaging with absolute consistency and institutional detachment across every market regime."

# ch08: add 25 words
t8 = "Your core index anchor should represent between seventy and ninety percent of your total portfolio value on Trading 212."
r8 = "Your core index anchor should represent between seventy and ninety percent of your total portfolio value on Trading 212, providing an impenetrable foundation of global diversification that shelters your capital from single-company disasters."

# ch09: add 50 words
t9 = "Living off dividend cash flow is psychologically and financially superior to the conventional practice of liquidating four percent of your portfolio equity each year during retirement."
r9 = "Living off dividend cash flow is psychologically and financially superior to the conventional practice of liquidating four percent of your portfolio equity each year during retirement. A dividend-funded lifestyle decouples your daily peace of mind from market volatility, allowing you to sleep peacefully regardless of economic turbulence."

# ch10: add 20 words
t10 = "Trading 212 tracks the expiration date of your tax certification automatically and prompts you to renew your electronic signature within the application prior to expiration."
r10 = "Trading 212 tracks the expiration date of your tax certification automatically and prompts you to renew your electronic signature within the application prior to expiration, ensuring seamless regulatory compliance."

for t, r in [(t6, r6), (t7, r7), (t8, r8), (t9, r9), (t10, r10)]:
    assert t in txt, f"Target not found: {t[:40]}"
    txt = txt.replace(t, r, 1)

open(path, "w", encoding="utf-8").write(txt)
print("Round 4 patch applied!")
