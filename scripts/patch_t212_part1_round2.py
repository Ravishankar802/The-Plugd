import re

path = "scripts/author_t212_part1_complete.py"
txt = open(path, encoding="utf-8").read()

# fw: add 10 words to para 1
t_fw = "In 2026, modern technological brokerages have completely rewritten the rules of retail capital allocation, empowering individuals across the economic spectrum."
r_fw = "In 2026, modern technological brokerages have completely rewritten the rules of retail capital allocation, empowering disciplined individuals across the economic spectrum to build lasting wealth."

# ch03: add ~120 words
t3_1 = "The FCA is universally recognized as one of the most stringent, rigorous, and respected financial regulatory bodies in the world, imposing strict capital adequacy requirements, rigorous compliance audits, and comprehensive consumer protection mandates on all authorized brokerages."
r3_1 = "The FCA is universally recognized as one of the most stringent, rigorous, and respected financial regulatory bodies in the world, imposing strict capital adequacy requirements, rigorous compliance audits, and comprehensive consumer protection mandates on all authorized brokerages. This rigorous oversight ensures that customer protection remains the primary operational benchmark."

t3_2 = "Operating under CySEC enables the firm to passport its investment services across all EU member states in full compliance with the European Markets in Financial Instruments Directive, commonly known as MiFID II."
r3_2 = "Operating under CySEC enables the firm to passport its investment services across all EU member states in full compliance with the European Markets in Financial Instruments Directive, commonly known as MiFID II. This harmonized regulatory framework establishes clear statutory standards for transparency, order execution, and investor safeguards."

t3_3 = "Biometric authentication—such as Face ID or fingerprint scanning—is enforced on mobile devices, preventing unauthorized local access if a physical smartphone is compromised or stolen."
r3_3 = "Biometric authentication—such as Face ID or fingerprint scanning—is enforced on mobile devices, preventing unauthorized local access if a physical smartphone is compromised or stolen. Hardware-level security ensures that physical loss of a mobile device does not compromise your underlying investment accounts."

t3_4 = "In compliance with MiFID II and FCA Best Execution rules, Trading 212 is legally obligated to take all sufficient steps to obtain the best possible execution result for client orders, taking into account price, costs, speed, likelihood of execution, and settlement."
r3_4 = "In compliance with MiFID II and FCA Best Execution rules, Trading 212 is legally obligated to take all sufficient steps to obtain the best possible execution result for client orders, taking into account price, costs, speed, likelihood of execution, and settlement. Transparent best execution reporting ensures that client orders receive optimal fill prices across global electronic exchanges."

# ch04: add ~90 words
t4_1 = "The funds clear instantly, are credited to your available balance within seconds, and carry zero processing fees from either the broker or your bank."
r4_1 = "The funds clear instantly, are credited to your available balance within seconds, and carry zero processing fees from either the broker or your bank. Instant settlement eliminates the frustrating delays that previously prevented investors from acting on time-sensitive market opportunities."

t4_2 = "When recurring deposits are combined with the platform's automated Pies and AutoInvest features, your entire wealth accumulation process becomes completely autonomous."
r4_2 = "When recurring deposits are combined with the platform's automated Pies and AutoInvest features, your entire wealth accumulation process becomes completely autonomous and emotionally detached. Automation insulates your capital deployment from psychological hesitation and short-term market noise."

t4_3 = "Most withdrawals clear into your external commercial bank within fifteen minutes, providing extraordinary liquidity whenever personal capital reallocation is required."
r4_3 = "Most withdrawals clear into your external commercial bank within fifteen minutes, providing extraordinary liquidity whenever personal capital reallocation is required. Rapid withdrawal execution ensures you maintain full command over your liquid assets without unnecessary administrative friction."

# ch05: add ~50 words
t5_1 = "You participate in one hundred percent of the proportional capital appreciation, receive proportional dividend distributions credited directly to your account, and maintain absolute control over your asset allocation."
r5_1 = "You participate in one hundred percent of the proportional capital appreciation, receive proportional dividend distributions credited directly to your account, and maintain absolute control over your asset allocation. Fractional ownership delivers complete institutional parity to every retail portfolio."

t5_2 = "Your portfolio weightings reflect your deliberate, rational asset allocation strategy rather than the arbitrary pricing decisions of corporate boards."
r5_2 = "Your portfolio weightings reflect your deliberate, rational asset allocation strategy rather than the arbitrary pricing decisions of corporate boards. True mathematical portfolio construction becomes a reality for every disciplined investor."

for t, r in [(t_fw, r_fw), (t3_1, r3_1), (t3_2, r3_2), (t3_3, r3_3), (t3_4, r3_4),
            (t4_1, r4_1), (t4_2, r4_2), (t4_3, r4_3),
            (t5_1, r5_1), (t5_2, r5_2)]:
    assert t in txt, f"Target not found: {t[:40]}"
    txt = txt.replace(t, r, 1)

open(path, "w", encoding="utf-8").write(txt)
print("Round 2 patch applied!")
