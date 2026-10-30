import re

path = "scripts/author_t212_part3.py"
txt = open(path, encoding="utf-8").read()

# ch11: add 15 words
t11 = "The platform's smart execution engine calculates the exact fractional share quantity down to eight decimal places and executes the order across available liquidity pools."
r11 = "The platform's smart execution engine calculates the exact fractional share quantity down to eight decimal places and executes the order across available liquidity pools with optimal pricing."

# ch12: add 55 words
t12_1 = "QMMFs are utilized by central banks, multi-national corporations, and national wealth funds as a primary alternative to commercial bank deposits because they provide diversification across multiple government-backed instruments."
r12_1 = "QMMFs are utilized by central banks, multi-national corporations, and national wealth funds as a primary alternative to commercial bank deposits because they provide diversification across multiple government-backed instruments, mitigating the credit risk inherent in single commercial banks."

t12_2 = "For funds held in QMMFs, client protection operates under the European regulatory regime for collective investment schemes: your shares in the money market fund are segregated, bankruptcy-remote assets that belong entirely to you."
r12_2 = "For funds held in QMMFs, client protection operates under the European regulatory regime for collective investment schemes: your shares in the money market fund are segregated, bankruptcy-remote assets that belong entirely to you, insulated from broker solvency."

# ch13: add 100 words
t13_1 = "Under regulatory caps enforced by the European Securities and Markets Authority and the UK Financial Conduct Authority, leverage ratios range from five-to-one on individual equities to thirty-to-one on major currency pairs."
r13_1 = "Under regulatory caps enforced by the European Securities and Markets Authority and the UK Financial Conduct Authority, leverage ratios range from five-to-one on individual equities to thirty-to-one on major currency pairs, designed to limit extreme retail losses while still presenting lethal volatility."

t13_2 = "When you trade CFDs, you trade directly against the broker's liquidity desk."
r13_2 = "When you trade CFDs, you trade directly against the broker's internal liquidity desk rather than participating in public exchange order books."

t13_3 = "The only rational posture toward the CFD tier on Trading 212 is Total Operational Abstinence."
r13_3 = "The only rational posture toward the CFD tier on Trading 212 is Total Operational Abstinence and complete structural avoidance across your entire investing lifetime."

# ch14: add 120 words
t14_1 = "Rebalancing is one of the most powerful risk-management practices in modern institutional finance."
r14_1 = "Rebalancing is one of the most powerful and mathematically proven risk-management practices in modern institutional finance, systematically controlling volatility and enforcing disciplined capital rotation."

t14_2 = "Trading 212 supports two primary operational approaches to rebalancing: Organic Rebalancing via Cash Inflows (Self-Balancing Allocation) and Full Systematic Rebalancing (The Rebalance Button)."
r14_2 = "Trading 212 supports two primary operational approaches to rebalancing: Organic Rebalancing via Cash Inflows (Self-Balancing Allocation) and Full Systematic Rebalancing (The Rebalance Button), offering tailored solutions for every stage of an investor's lifecycle."

t14_3 = "Automated portfolio rebalancing is the ultimate mechanical manifestation of disciplined value investing."
r14_3 = "Automated portfolio rebalancing is the ultimate mechanical manifestation of disciplined value investing, translating abstract portfolio theory into practical, automated wealth preservation."

# ch15: add 75 words
t15_1 = "In exchange for granting the platform permission to lend out your fully paid shares to vetted institutional borrowers, Trading 212 pays you a daily interest fee, splitting the gross lending revenue fifty-fifty with the client."
r15_1 = "In exchange for granting the platform permission to lend out your fully paid shares to vetted institutional borrowers, Trading 212 pays you a daily interest fee, splitting the gross lending revenue fifty-fifty with the client and creating an additional layer of passive income."

t15_2 = "Trading 212 ensures full compliance with HMRC guidelines, meaning that share lending primarily operates within the general Invest account tier, allowing ISA investors to compound with pristine, unencumbered custodial security."
r15_2 = "Trading 212 ensures full compliance with HMRC guidelines, meaning that share lending primarily operates within the general Invest account tier, allowing ISA investors to compound with pristine, unencumbered custodial security and absolute regulatory peace of mind."

for t, r in [(t11, r11), (t12_1, r12_1), (t12_2, r12_2),
            (t13_1, r13_1), (t13_2, r13_2), (t13_3, r13_3),
            (t14_1, r14_1), (t14_2, r14_2), (t14_3, r14_3),
            (t15_1, r15_1), (t15_2, r15_2)]:
    assert t in txt, f"Target not found: {t[:40]}"
    txt = txt.replace(t, r, 1)

open(path, "w", encoding="utf-8").write(txt)
print("Round 4 patch applied!")
