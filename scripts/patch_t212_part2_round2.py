import re

path = "scripts/author_t212_part2.py"
txt = open(path, encoding="utf-8").read()

# ch06: add 110 words across 4 paras
t6_a = "In traditional retail investing, managing a multi-asset portfolio was an exhausting operational burden requiring manual spreadsheet calculations, continuous mathematical tracking, and endless individual trade orders."
r6_a = "In traditional retail investing, managing a multi-asset portfolio was an exhausting operational burden requiring manual spreadsheet calculations, continuous mathematical tracking, and endless individual trade orders that wasted hours of valuable time."

t6_b = "A master Pie can hold not only individual stocks and ETFs, but also nested Sub-Pies that represent specific operational themes or geographic sectors."
r6_b = "A master Pie can hold not only individual stocks and ETFs, but also nested Sub-Pies that represent specific operational themes or geographic sectors, giving you extraordinary architectural flexibility in organizing your capital."

t6_c = "When you browse community Pies, you can analyze verified user track records, asset allocations, and historical returns."
# Wait, let's look at the exact text for Pie library in ch06:
# "Furthermore, Trading 212 provides the Pie Library, a public social feature where experienced investors and community members share their verified Pie architectures."
t6_c = "Furthermore, Trading 212 provides the Pie Library, a public social feature where experienced investors and community members share their verified Pie architectures."
r6_c = "Furthermore, Trading 212 provides the Pie Library, a public social feature where experienced investors and community members share their verified Pie architectures. This collaborative feature allows you to study real-world asset allocations, analyze verified user track records, and inspect performance distributions across diverse market environments."

t6_d = "If you ever need to extract capital from a Pie to fund living expenses or reallocate cash, you do not need to liquidate the entire portfolio."
r6_d = "If you ever need to extract capital from a Pie to fund living expenses or reallocate cash, you do not need to liquidate the entire portfolio or trigger catastrophic tax consequences."

# ch07: add 70 words across 3 paras
t7_a = "The human limbic system evolved to survive physical threats on the ancestral savannah, where panic responses like running away from a predator were essential to survival."
r7_a = "The human limbic system evolved to survive physical threats on the ancestral savannah, where panic responses like running away from a predator were essential to survival. In financial markets, these hardwired survival impulses betray you, prompting irrational panic selling at the exact moments when buying represents the highest-expected-value decision."

t7_b = "When you look back on your financial life ten or twenty years from now, you will realize that your greatest wealth-generating deposits were the ones executed by AutoInvest on rainy Tuesday mornings when the headlines were screaming about impending economic collapse."
r7_b = "When you look back on your financial life ten or twenty years from now, you will realize that your greatest wealth-generating deposits were the ones executed by AutoInvest on rainy Tuesday mornings when the headlines were screaming about impending economic collapse. Consistent execution amidst widespread terror is the universal signature of successful long-term investors."

# ch08: add 70 words across 3 paras
t8_a = "When you own the entire global market, you guarantee that you will capture the performance of the small handful of massive corporate winners that generate the overwhelming majority of total market returns."
r8_a = "When you own the entire global market, you guarantee that you will capture the performance of the small handful of massive corporate winners that generate the overwhelming majority of total market returns. You eliminate the devastating risk of stock-picking failure while participating directly in global economic progress."

t8_b = "A premier index fund operates with near-zero tracking error, faithfully replicating the performance of its target benchmark."
r8_b = "A premier index fund operates with near-zero tracking error, faithfully replicating the performance of its target benchmark across every trading session, ensuring you receive the exact market return you are entitled to."

# ch09: add 110 words across 4 paras
t9_a = "Capital appreciation on a computer screen is intellectually satisfying, but unrealized paper gains cannot pay for groceries, fund mortgage payments, or provide living expenses during an emergency without selling shares."
r9_a = "Capital appreciation on a computer screen is intellectually satisfying, but unrealized paper gains cannot pay for groceries, fund mortgage payments, or provide living expenses during an emergency without selling shares and depleting your ownership base."

t9_b = "The objective of this strategy is not to chase high current yields—which frequently indicate distressed, dying companies paying unsustainable dividends—but to capture a secure, growing stream of cash flow that compounds exponentially over time, shielding your purchasing power."
r9_b = "The objective of this strategy is not to chase high current yields—which frequently indicate distressed, dying companies paying unsustainable dividends—but to capture a secure, growing stream of cash flow that compounds exponentially over time, shielding your purchasing power against monetary debasement."

t9_c = "When selecting dividend growth assets on Trading 212, an investor must look beyond superficial marketing claims and evaluate four foundational financial metrics."
r9_c = "When selecting dividend growth assets on Trading 212, an investor must look beyond superficial marketing claims and evaluate four foundational financial metrics with rigorous clinical discipline."

t9_d = "When you rely solely on capital appreciation, a severe market crash causes immense emotional anguish as your account balance declines."
r9_d = "When you rely solely on capital appreciation, a severe market crash causes immense emotional anguish as your account balance declines, creating psychological panic that frequently leads to destructive capitulation."

# ch10: add 50 words across 2 paras
t10_a = "Losing nearly a third of your dividend cash flow severely impairs your compounding velocity."
r10_a = "Losing nearly a third of your dividend cash flow severely impairs your compounding velocity, siphoning away vital liquidity that should be working to purchase additional productive shares."

t10_b = "An investor must simply factor the fifteen percent drag into their net cash flow projections, recognizing that the complete exemption from domestic capital gains tax vastly outweighs the foreign withholding deduction."
r10_b = "An investor must simply factor the fifteen percent drag into their net cash flow projections, recognizing that the complete exemption from domestic capital gains tax vastly outweighs the foreign withholding deduction and preserves the overwhelming majority of your wealth."

for t, r in [(t6_a, r6_a), (t6_b, r6_b), (t6_c, r6_c), (t6_d, r6_d),
            (t7_a, r7_a), (t7_b, r7_b),
            (t8_a, r8_a), (t8_b, r8_b),
            (t9_a, r9_a), (t9_b, r9_b), (t9_c, r9_c), (t9_d, r9_d),
            (t10_a, r10_a), (t10_b, r10_b)]:
    assert t in txt, f"Target not found: {t[:40]}"
    txt = txt.replace(t, r, 1)

open(path, "w", encoding="utf-8").write(txt)
print("Round 2 patch applied!")
