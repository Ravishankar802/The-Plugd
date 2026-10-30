import re

path = "scripts/author_t212_part2.py"
txt = open(path, encoding="utf-8").read()

# ch06: add ~150 words across 5 paras
t6_1 = "A single cash deposit into the Pie automatically distributes capital across all underlying holdings according to your target allocation with a single tap."
r6_1 = "A single cash deposit into the Pie automatically distributes capital across all underlying holdings according to your target allocation with a single tap, executing multiple institutional micro-orders in parallel."

t6_2 = "You select the exact companies you wish to own, exclude corporate sectors that violate your personal risk criteria, and adjust percentage weightings whenever your investment thesis evolves, enjoying institutional portfolio construction capabilities at zero cost."
r6_2 = "You select the exact companies you wish to own, exclude corporate sectors that violate your personal risk criteria, and adjust percentage weightings whenever your investment thesis evolves, enjoying institutional portfolio construction capabilities at zero cost and without ongoing management drag."

t6_3 = "Self-balancing via incoming cash flows re-aligns your portfolio toward its target weightings organically, achieving optimal balance through fresh capital deployment alone."
r6_3 = "Self-balancing via incoming cash flows re-aligns your portfolio toward its target weightings organically, achieving optimal balance through fresh capital deployment alone, shielding your accumulated principal from unnecessary tax realization."

t6_4 = "This core-and-satellite model delivers true global diversification with targeted alpha upside."
r6_4 = "This core-and-satellite model delivers true global diversification with targeted alpha upside, combining broad economic stability with the outsized compounding potential of industry leaders."

t6_5 = "You design the blueprint once, establish the mathematical target weightings, configure automated cash routing, and let the software enforce disciplined portfolio theory with mechanical perfection."
r6_5 = "You design the blueprint once, establish the mathematical target weightings, configure automated cash routing, and let the software enforce disciplined portfolio theory with mechanical perfection across decades of compounding."

# ch07: add ~120 words across 4 paras
t7_1 = "You remove the flawed human operator from the execution loop entirely."
r7_1 = "You remove the flawed human operator from the execution loop entirely, guaranteeing that your wealth accumulation proceeds uninterrupted by emotional hesitation, market headlines, or personal fatigue."

t7_2 = "Automated DCA transforms market corrections from terrifying crises into automated wealth-building engines."
r7_2 = "Automated DCA transforms market corrections from terrifying crises into automated wealth-building engines, forcing you to accumulate prime assets at historically suppressed valuations."

t7_3 = "Your recurring deposits continuously repair portfolio drift, keeping your risk profile perfectly calibrated without triggering taxable sales."
r7_3 = "Your recurring deposits continuously repair portfolio drift, keeping your risk profile perfectly calibrated without triggering taxable sales or interrupting your multi-year compounding trajectory."

t7_4 = "By automating your purchases, you remove your fragile psychology from the equation and allow the unstoppable mathematics of long-term corporate productivity to compound on your behalf."
r7_4 = "By automating your purchases, you remove your fragile psychology from the equation and allow the unstoppable mathematics of long-term corporate productivity to compound on your behalf with mechanical inevitability."

# ch08: add ~120 words across 4 paras
t8_1 = "When you purchase an index ETF, you are not gambling on the survival or competence of an individual management team; you are purchasing a proportional slice of the entire capitalist global economy, participating directly in human innovation, productivity gains, and corporate cash flows."
r8_1 = "When you purchase an index ETF, you are not gambling on the survival or competence of an individual management team; you are purchasing a proportional slice of the entire capitalist global economy, participating directly in human innovation, productivity gains, and corporate cash flows that endure across generations."

t8_2 = "Physical replication eliminates counterparty derivative risk, providing the highest standard of structural transparency and security."
r8_2 = "Physical replication eliminates counterparty derivative risk, providing the highest standard of structural transparency and security for multi-decade buy-and-hold investors who demand absolute legal backing."

t8_3 = "Choosing a Total Global ETF eliminates Geographic Single-Country Risk entirely."
r8_3 = "Choosing a Total Global ETF eliminates Geographic Single-Country Risk entirely, ensuring your financial survival is never tethered to the economic fortunes or political stability of any single nation."

t8_4 = "Building a resilient, institutional-grade portfolio does not require complex financial gymnastics; it requires anchoring your financial life in low-cost, physically replicated, Irish-domiciled accumulating global index funds."
r8_4 = "Building a resilient, institutional-grade portfolio does not require complex financial gymnastics; it requires anchoring your financial life in low-cost, physically replicated, Irish-domiciled accumulating global index funds that compound silently in the background."

# ch09: add ~150 words across 5 paras
t9_1 = "The objective of this strategy is not to chase high current yields—which frequently indicate distressed, dying companies paying unsustainable dividends—but to capture a secure, growing stream of cash flow that compounds exponentially over time."
r9_1 = "The objective of this strategy is not to chase high current yields—which frequently indicate distressed, dying companies paying unsustainable dividends—but to capture a secure, growing stream of cash flow that compounds exponentially over time, shielding your purchasing power."

t9_2 = "Furthermore, because high-quality dividend growth companies generate immense economic profits, their underlying share prices appreciate in tandem with their rising earnings, delivering robust capital appreciation alongside swelling cash flows."
r9_2 = "Furthermore, because high-quality dividend growth companies generate immense economic profits, their underlying share prices appreciate in tandem with their rising earnings, delivering robust capital appreciation alongside swelling cash flows that expand your total net worth."

t9_3 = "A viable dividend growth champion must demonstrate consistently expanding free cash flow per share over a five to ten-year timeline, ensuring that dividend increases are backed by real operational cash generation."
r9_3 = "A viable dividend growth champion must demonstrate consistently expanding free cash flow per share over a five to ten-year timeline, ensuring that dividend increases are backed by real operational cash generation rather than dangerous debt issuance."

t9_4 = "Sector diversification is essential: even the most venerable companies can face unexpected operational crises, and a balanced Pie ensures that a dividend freeze in one holding does not disrupt your portfolio's overall cash flow trajectory."
r9_4 = "Sector diversification is essential: even the most venerable companies can face unexpected operational crises, and a balanced Pie ensures that a dividend freeze in one holding does not disrupt your portfolio's overall cash flow trajectory or compromise your financial peace."

t9_5 = "Chasing unsustainable yields destroys capital; true wealth is built on durable dividend growth."
r9_5 = "Chasing unsustainable yields destroys capital; true wealth is built on durable dividend growth backed by unshakeable competitive moats, pristine balance sheets, and disciplined corporate stewardship."

# ch10: add ~110 words across 4 paras
t10_1 = "An educated capital allocator must understand international tax treaties, form execution protocols, and fund domicile strategies to shield their income from unnecessary sovereign extraction."
r10_1 = "An educated capital allocator must understand international tax treaties, form execution protocols, and fund domicile strategies to shield their income from unnecessary state extraction and bureaucratic drag."

t10_2 = "Maintaining active compliance takes thirty seconds and saves hundreds of dollars annually."
r10_2 = "Maintaining active compliance takes thirty seconds and saves hundreds of dollars annually, preventing unnecessary tax leakage from impairing your multi-year compounding trajectory."

t10_3 = "An investor must simply factor the fifteen percent drag into their net cash flow projections."
r10_3 = "An investor must simply factor the fifteen percent drag into their net cash flow projections, recognizing that the complete exemption from domestic capital gains tax vastly outweighs the foreign withholding deduction."

t10_4 = "You eliminate structural tax leakage and preserve every dollar of compounding yield."
r10_4 = "You eliminate structural tax leakage and preserve every dollar of compounding yield, ensuring that your wealth engine operates at peak mathematical efficiency across all international markets."

for t, r in [(t6_1, r6_1), (t6_2, r6_2), (t6_3, r6_3), (t6_4, r6_4), (t6_5, r6_5),
            (t7_1, r7_1), (t7_2, r7_2), (t7_3, r7_3), (t7_4, r7_4),
            (t8_1, r8_1), (t8_2, r8_2), (t8_3, r8_3), (t8_4, r8_4),
            (t9_1, r9_1), (t9_2, r9_2), (t9_3, r9_3), (t9_4, r9_4), (t9_5, r9_5),
            (t10_1, r10_1), (t10_2, r10_2), (t10_3, r10_3), (t10_4, r10_4)]:
    assert t in txt, f"Target not found: {t[:40]}"
    txt = txt.replace(t, r, 1)

open(path, "w", encoding="utf-8").write(txt)
print("Part 2 patch applied!")
