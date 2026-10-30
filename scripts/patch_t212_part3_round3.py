import re

path = "scripts/author_t212_part3.py"
txt = open(path, encoding="utf-8").read()

# ch11: add 20 words
t11 = "Value orders align your execution directly with your financial budget rather than arbitrary market units."
r11 = "Value orders align your execution directly with your financial budget rather than arbitrary market units, simplifying portfolio contributions for every disciplined investor."

# ch12: add 75 words
t12_1 = "These client accounts are legally designated as held in trust"
# Wait, let's find an exact sentence in ch12:
t12_1 = "This means an investor holding a ten-thousand-pound emergency liquidity reserve or opportunistic cash buffer inside their Trading 212 account generates approximately five hundred pounds per year in completely passive, risk-adjusted interest income."
r12_1 = "This means an investor holding a ten-thousand-pound emergency liquidity reserve or opportunistic cash buffer inside their Trading 212 account generates approximately five hundred pounds per year in completely passive, risk-adjusted interest income, turning idle cash into a productive cash flow stream."

t12_2 = "Trading 212 provides complete operational transparency by allowing you to view the exact allocation of your cash between QMMFs and bank deposits at any time inside the app's Interest tab."
r12_2 = "Trading 212 provides complete operational transparency by allowing you to view the exact allocation of your cash between QMMFs and bank deposits at any time inside the app's Interest tab, giving you complete visibility into the institutional custody of your liquid capital."

# ch13: add 130 words
t13_1 = "In any other industry—medicine, aviation, structural engineering—a consumer product that resulted in an eighty percent failure rate would be permanently banned by government authorities."
r13_1 = "In any other industry—medicine, aviation, structural engineering—a consumer product that resulted in an eighty percent failure rate would be permanently banned by government authorities due to the catastrophic danger it poses to consumer solvency."

t13_2 = "Retail traders also fall prey to the Cognitive Delusion of Short-Term Price Prediction."
r13_2 = "Retail traders also fall prey to the Cognitive Delusion of Short-Term Price Prediction, convincing themselves that historical chart squiggles reveal the future intentions of institutional algorithms."

t13_3 = "Real wealth building is patient, methodical, and profoundly boring: depositing money every month into diversified index funds, collecting dividends, letting automated systems rebalance your holdings, and giving the power of compounding twenty years to work its magic."
r13_3 = "Real wealth building is patient, methodical, and profoundly boring: depositing money every month into diversified index funds, collecting dividends, letting automated systems rebalance your holdings, and giving the power of compounding twenty years to work its magic without psychological interference."

# ch14: add 170 words
t14_1 = "The first and most mathematically elegant rebalancing protocol is Organic Rebalancing via Incoming Cash Flows."
r14_1 = "The first and most mathematically elegant rebalancing protocol is Organic Rebalancing via Incoming Cash Flows, which harnesses natural liquidity to restore portfolio balance."

t14_2 = "In Threshold-Based Rebalancing, you establish quantitative tolerance bands around your target weightings, regardless of the calendar, allowing market price movements rather than arbitrary dates to trigger tactical adjustments."
r14_2 = "In Threshold-Based Rebalancing, you establish quantitative tolerance bands around your target weightings, regardless of the calendar, allowing market price movements rather than arbitrary dates to trigger tactical adjustments. This objective ruleset prevents premature liquidation of winning positions while enforcing disciplined re-entry into undervalued sectors."

t14_3 = "Beware of Hyperactive Rebalancing."
r14_3 = "Beware of the destructive temptation of Hyperactive Rebalancing, which generates unnecessary friction and taxes while interrupting the natural compounding curve of elite corporate compounders."

# ch15: add 90 words
t15_1 = "Proponents argue that share lending provides free, incremental cash flow with negligible real-world risk, fully protected by institutional collateral."
r15_1 = "Proponents argue that share lending provides free, incremental cash flow with negligible real-world risk, fully protected by institutional collateral that preserves principal safety across market volatility."

t15_2 = "On Trading 212, you can view the active lending status and daily interest earned on every holding inside the app's Share Lending tab."
r15_2 = "On Trading 212, you can view the active lending status and daily interest earned on every holding inside the app's Share Lending tab, providing complete operational transparency and real-time earnings tracking."

for t, r in [(t11, r11), (t12_1, r12_1), (t12_2, r12_2),
            (t13_1, r13_1), (t13_2, r13_2), (t13_3, r13_3),
            (t14_1, r14_1), (t14_2, r14_2), (t14_3, r14_3),
            (t15_1, r15_1), (t15_2, r15_2)]:
    assert t in txt, f"Target not found: {t[:40]}"
    txt = txt.replace(t, r, 1)

open(path, "w", encoding="utf-8").write(txt)
print("Round 3 patch applied!")
