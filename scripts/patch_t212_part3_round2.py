import re

path = "scripts/author_t212_part3.py"
txt = open(path, encoding="utf-8").read()

# ch11: add ~50 words
t11 = "Value orders streamline capital allocation for recurring savers."
r11 = "Value orders streamline capital allocation for recurring savers, eliminating mathematical friction and allowing investors to deploy exact currency amounts without calculating share fractions manually."

t11_b = "When placing limit orders for undervalued assets, sophisticated investors universally deploy GTC orders."
r11_b = "When placing limit orders for undervalued assets, sophisticated investors universally deploy GTC orders, setting institutional traps that capture temporary market mispricings while they sleep."

# ch12: add ~110 words
t12_a = "Trading 212 recognized this macroeconomic shift and pioneered one of the most generous, transparent, and flexible cash interest programs in the entire digital brokerage industry."
r12_a = "Trading 212 recognized this macroeconomic shift and pioneered one of the most generous, transparent, and flexible cash interest programs in the entire digital brokerage industry, challenging legacy banking institutions."

t12_b = "On Trading 212, interest is calculated down to the minute on your settled uninvested balance and credited directly to your cash wallet every single day."
r12_b = "On Trading 212, interest is calculated down to the minute on your settled uninvested balance and credited directly to your cash wallet every single day, providing immediate liquidity and accelerating daily compounding."

t12_c = "Multi-Currency Interest Yields represent another massive strategic advantage for global builders."
r12_c = "Multi-Currency Interest Yields represent another massive strategic advantage for global builders who manage capital across international borders and diversify their currency reserves."

t12_d = "In the taxable Invest account, interest paid on uninvested cash constitutes taxable savings income subject to your domestic income tax rates."
r12_d = "In the taxable Invest account, interest paid on uninvested cash constitutes taxable savings income subject to your domestic income tax rates, requiring accurate annual reporting to your national revenue agency."

# ch13: add ~180 words
t13_a = "A Contract for Difference does not grant you ownership of any underlying shares, bonds, or commodities."
r13_a = "A Contract for Difference does not grant you ownership of any underlying shares, bonds, or commodities, completely excluding you from shareholder rights, corporate governance, and long-term asset compounding."

t13_b = "Now examine the mathematical inverse of that exact same position."
r13_b = "Now examine the cold mathematical inverse of that exact same position, where volatility compounds against the trader with devastating force."

t13_c = "Overnight financing costs create a relentless, compounding mathematical headwind."
r13_c = "Overnight financing costs create a relentless, compounding mathematical headwind that slowly bleeds capital from accounts that hold positions open past the daily market close."

t13_d = "Retail users stop acting as rational capital allocators and devolve into impulsive financial gamblers, making twenty trades a day and paying hundreds of pounds in cumulative spreads."
r13_d = "Retail users stop acting as rational capital allocators and devolve into impulsive financial gamblers, making twenty trades a day and paying hundreds of pounds in cumulative spreads that line the broker's pockets."

t13_e = "If you wish to trade options, futures, or leveraged assets, allocate a tiny, expendable Play-Money Budget—never exceeding two percent of your net worth—to a completely separate account, with the explicit psychological expectation that the capital will likely be lost."
r13_e = "If you wish to trade options, futures, or leveraged assets, allocate a tiny, expendable Play-Money Budget—never exceeding two percent of your net worth—to a completely separate account, with the explicit psychological expectation that the capital will likely be lost, preserving your core wealth intact."

# ch14: add ~250 words across 8 paras
t14_a = "You might decide to allocate fifty percent of your capital to a broad US equity index, thirty percent to a global international index, ten percent to emerging markets, and ten percent to dividend growth champions."
r14_a = "You might decide to allocate fifty percent of your capital to a broad US equity index, thirty percent to a global international index, ten percent to emerging markets, and ten percent to dividend growth champions, establishing a resilient multi-asset foundation."

t14_b = "Within six to twelve months of active market movement, your portfolio will inevitably suffer from Portfolio Drift."
r14_b = "Within six to twelve months of active market movement, your portfolio will inevitably suffer from Portfolio Drift, as divergent sector performance pulls your holdings away from their original strategic blueprint."

t14_c = "Trading 212 provides multiple sophisticated rebalancing mechanisms within its signature Pies architecture."
r14_c = "Trading 212 provides multiple sophisticated rebalancing mechanisms within its signature Pies architecture, giving investors both passive and active tools to maintain portfolio equilibrium."

t14_d = "However, over prolonged multi-year bull runs, organic rebalancing through fresh deposits may become mathematically insufficient to correct extreme portfolio drift."
r14_d = "However, over prolonged multi-year bull runs, organic rebalancing through fresh deposits may become mathematically insufficient to correct extreme portfolio drift, especially as total portfolio capital expands relative to monthly cash inflows."

t14_e = "What previously required an investor two hours of spreadsheet calculations and twenty individual trade orders is executed in under sixty seconds with a single confirmation."
r14_e = "What previously required an investor two hours of spreadsheet calculations and twenty individual trade orders is executed in under sixty seconds with a single confirmation, drastically lowering the cognitive barrier to disciplined portfolio maintenance."

t14_f = "In Threshold-Based Rebalancing, you establish quantitative tolerance bands around your target weightings, regardless of the calendar."
r14_f = "In Threshold-Based Rebalancing, you establish quantitative tolerance bands around your target weightings, regardless of the calendar, allowing market price movements rather than arbitrary dates to trigger tactical adjustments."

t14_g = "Great businesses must be given room to run."
r14_g = "Great businesses must be given room to run, as the outsized returns of elite corporate winners are the primary engine of long-term market outperformance."

# ch15: add ~130 words across 5 paras
t15_a = "However, in modern institutional capital markets, shares of publicly traded corporations are not merely passive storehouses of value; they are valuable financial instruments in high demand by institutional market participants who are willing to pay daily borrowing fees to temporarily utilize those securities."
r15_a = "However, in modern institutional capital markets, shares of publicly traded corporations are not merely passive storehouses of value; they are valuable financial instruments in high demand by institutional market participants who are willing to pay daily borrowing fees to temporarily utilize those securities, creating a multi-trillion-dollar institutional lending marketplace."

t15_b = "What about Voting Rights and Liquidity?"
r15_b = "What about the practical impact of share lending on Voting Rights and Liquidity for retail investors?"

t15_c = "How much yield does share lending actually generate?"
r15_c = "How much incremental yield does participating in share lending actually generate for a long-term retail investor?"

t15_d = "Inside your account settings, you can toggle Share Lending On or Off at any time with a single tap."
r15_d = "Inside your account settings, you can toggle Share Lending On or Off at any time with a single tap, retaining absolute command over how your shares are utilized."

for t, r in [(t11, r11), (t11_b, r11_b),
            (t12_a, r12_a), (t12_b, r12_b), (t12_c, r12_c), (t12_d, r12_d),
            (t13_a, r13_a), (t13_b, r13_b), (t13_c, r13_c), (t13_d, r13_d), (t13_e, r13_e),
            (t14_a, r14_a), (t14_b, r14_b), (t14_c, r14_c), (t14_d, r14_d), (t14_e, r14_e), (t14_f, r14_f), (t14_g, r14_g),
            (t15_a, r15_a), (t15_b, r15_b), (t15_c, r15_c), (t15_d, r15_d)]:
    assert t in txt, f"Target not found: {t[:40]}"
    txt = txt.replace(t, r, 1)

open(path, "w", encoding="utf-8").write(txt)
print("Round 2 patch applied!")
