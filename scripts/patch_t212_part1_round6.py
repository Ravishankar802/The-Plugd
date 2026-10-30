import re

path = "scripts/author_t212_part1_complete.py"
txt = open(path, encoding="utf-8").read()

# ch03 para 6
t3 = "The administrator simply verifies the client ledger and facilitates the orderly transfer of your shareholdings to another authorized custodian or brokerage of your choice. You retain complete beneficial ownership regardless of what happens to the broker's corporate entity."
r3 = "The administrator simply verifies the client ledger and facilitates the orderly transfer of your shareholdings to another authorized custodian or brokerage of your choice. You retain complete beneficial ownership regardless of what happens to the broker's corporate entity, ensuring your multi-decade investment horizon remains completely uninterrupted."

# ch04 para 6
t4 = "There is zero foreign exchange conversion required at the moment of execution, meaning you pay zero FX fees on the trade. This structural advantage compounds dramatically over hundreds of individual equity transactions."
r4 = "There is zero foreign exchange conversion required at the moment of execution, meaning you pay zero FX fees on the trade. This structural advantage compounds dramatically over hundreds of individual equity transactions, keeping your capital compounding at maximum velocity."

# ch05 para 6
t5 = "The answer is unequivocal: you possess complete beneficial economic ownership of your fractional shares."
r5 = "The answer is unequivocal: you possess complete, legally protected beneficial economic ownership of your fractional shares."

for t, r in [(t3, r3), (t4, r4), (t5, r5)]:
    assert t in txt, f"Target not found: {t[:40]}"
    txt = txt.replace(t, r, 1)

open(path, "w", encoding="utf-8").write(txt)
print("Round 6 patch applied!")
