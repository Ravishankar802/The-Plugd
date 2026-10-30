import re

path = "scripts/author_t212_part2.py"
txt = open(path, encoding="utf-8").read()

# ch06: add 20 words
t6 = "The architectural elegance of Pies lies in their complete customization and flexibility."
r6 = "The architectural elegance of Pies lies in their complete customization, operational simplicity, and multi-asset structural flexibility."

# ch08: add 15 words
t8 = "Choosing a Total Global ETF eliminates Geographic Single-Country Risk entirely, ensuring your financial survival is never tethered to the economic fortunes or political stability of any single nation."
r8 = "Choosing a Total Global ETF eliminates Geographic Single-Country Risk entirely, ensuring your financial survival is never tethered to the economic fortunes, fiscal policies, or political stability of any single nation."

# ch09: add 30 words
t9 = "This phenomenon of compounding yield on cost transforms time into an extraordinary economic ally."
r9 = "This phenomenon of compounding yield on cost transforms time into an extraordinary economic ally, turning patient investors into the true beneficiaries of corporate productivity and global economic growth."

# ch10: add 15 words
t10 = "Under the UK-US and standard European tax treaties, the statutory withholding tax rate on US corporate dividends is reduced from thirty percent down to fifteen percent for qualified non-resident individuals."
r10 = "Under the UK-US and standard European tax treaties, the statutory withholding tax rate on US corporate dividends is reduced from thirty percent down to fifteen percent for qualified non-resident individuals who properly certify their status."

for t, r in [(t6, r6), (t8, r8), (t9, r9), (t10, r10)]:
    assert t in txt, f"Target not found: {t[:40]}"
    txt = txt.replace(t, r, 1)

open(path, "w", encoding="utf-8").write(txt)
print("Round 5 patch applied!")
