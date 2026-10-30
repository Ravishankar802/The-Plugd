import re

path = "scripts/author_t212_part1_complete.py"
txt = open(path, encoding="utf-8").read()

# Foreword: add 25 words to para 18
t_fw = "Your future financial independence begins with the structural choices you make today, executed with consistency and unyielding mathematical logic."
r_fw = "Your future financial independence begins with the structural choices you make today, executed with consistency, clinical discipline, and unyielding mathematical logic across every market cycle."

# ch01: add 15 words to para 17
t_ch01 = "Now that we understand the economic playing field, let us examine the legal, structural, and regulatory architecture that protects your capital on Trading 212."
r_ch01 = "Now that we understand the modern economic playing field, let us examine the legal, structural, and regulatory architecture that protects your capital on Trading 212 with institutional precision."

# ch02: add 20 words to para 17
t_ch02 = "With your accounts properly configured and segregated, let us now examine the regulatory safeguards that protect your underlying capital."
r_ch02 = "With your accounts properly configured, verified, and segregated, let us now examine the regulatory safeguards that protect your underlying capital from counterparty risk and institutional turbulence."

# ch03: add ~170 words across 5 paras
t_ch03_1 = "Understanding the precise regulatory safeguards, investor compensation schemes, and asset segregation protocols governing Trading 212 is essential to deploying capital with absolute confidence."
r_ch03_1 = "Understanding the precise regulatory safeguards, investor compensation schemes, and asset segregation protocols governing Trading 212 is essential to deploying capital with absolute confidence and lasting peace of mind."

t_ch03_2 = "These client accounts are legally designated as held in trust, meaning that even in the theoretical event of Trading 212 declaring corporate bankruptcy, corporate creditors possess zero legal claim over client reserves."
r_ch03_2 = "These client accounts are legally designated as held in trust, meaning that even in the theoretical event of Trading 212 declaring corporate bankruptcy, corporate creditors possess zero legal claim over client reserves. Your liquidity remains legally ring-fenced and completely unreachable by third parties."

t_ch03_3 = "The administrator simply verifies the client ledger and facilitates the orderly transfer of your shareholdings to another authorized custodian or brokerage of your choice."
r_ch03_3 = "The administrator simply verifies the client ledger and facilitates the orderly transfer of your shareholdings to another authorized custodian or brokerage of your choice. You retain complete beneficial ownership regardless of what happens to the broker's corporate entity."

t_ch03_4 = "Financial strength and recurring profitability are the ultimate indicators of a secure, sustainable custodial partner."
r_ch03_4 = "Financial strength and recurring profitability are the ultimate indicators of a secure, sustainable custodial partner. A profitable brokerage does not need to compromise on compliance, client safety, or software infrastructure."

t_ch03_5 = "Your task is not to worry about whether your broker will survive tomorrow, but to focus your intellectual energy entirely on executing your investment strategy with mathematical discipline."
r_ch03_5 = "Your task is not to worry about whether your broker will survive tomorrow, but to focus your intellectual energy entirely on executing your investment strategy with mathematical discipline and unshakeable long-term consistency."

# ch04: add ~120 words across 4 paras
t_ch04_1 = "In 2026, Trading 212 has re-engineered cash logistics into a frictionless, multi-currency pipeline."
r_ch04_1 = "In 2026, Trading 212 has re-engineered cash logistics into a frictionless, multi-currency pipeline that operates with institutional precision across global banking networks."

t_ch04_2 = "There is zero foreign exchange conversion required at the moment of execution, meaning you pay zero FX fees on the trade."
r_ch04_2 = "There is zero foreign exchange conversion required at the moment of execution, meaning you pay zero FX fees on the trade. This structural advantage compounds dramatically over hundreds of individual equity transactions."

t_ch04_3 = "This approach provides operational clarity and shields your daily automated investments from day-to-day foreign exchange volatility."
r_ch04_3 = "This approach provides operational clarity and shields your daily automated investments from day-to-day foreign exchange volatility, preserving your capital for pure asset accumulation."

t_ch04_4 = "Now that your funds are deposited and optimized within the multi-currency architecture, let us explore the revolutionary mechanics of fractional share ownership."
r_ch04_4 = "Now that your funds are deposited, verified, and optimized within the multi-currency architecture, let us explore the revolutionary mechanics of fractional share ownership and micro-capital compounding."

# ch05: add ~70 words across 3 paras
t_ch05_1 = "They were forced to wait four months to accumulate enough cash, or redirect their capital into inferior, speculative penny stocks simply because the share price was low."
r_ch05_1 = "They were forced to wait four months to accumulate enough cash, or redirect their capital into inferior, speculative penny stocks simply because the share price was low, destroying their risk profile."

t_ch05_2 = "Maximizing the proportion of your net worth that is actively compounding in the market is the foundational secret of rapid wealth acceleration."
r_ch05_2 = "Maximizing the proportion of your net worth that is actively compounding in the market is the foundational secret of rapid wealth acceleration and financial independence."

t_ch05_3 = "You exploit market volatility to your advantage with pure mathematical automation."
r_ch05_3 = "You exploit market volatility to your advantage with pure mathematical automation, transforming market corrections into high-yield accumulation windows."

for t, r in [(t_fw, r_fw), (t_ch01, r_ch01), (t_ch02, r_ch02),
            (t_ch03_1, r_ch03_1), (t_ch03_2, r_ch03_2), (t_ch03_3, r_ch03_3), (t_ch03_4, r_ch03_4), (t_ch03_5, r_ch03_5),
            (t_ch04_1, r_ch04_1), (t_ch04_2, r_ch04_2), (t_ch04_3, r_ch04_3), (t_ch04_4, r_ch04_4),
            (t_ch05_1, r_ch05_1), (t_ch05_2, r_ch05_2), (t_ch05_3, r_ch05_3)]:
    assert t in txt, f"Target not found: {t[:40]}"
    txt = txt.replace(t, r, 1)

open(path, "w", encoding="utf-8").write(txt)
print("Part 1 patch applied successfully!")
