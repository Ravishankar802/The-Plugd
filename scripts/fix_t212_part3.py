with open('scripts/author_t212_part3.py', 'r', encoding='utf-8') as f:
    c = f.read()

idx = c.find('if __name__ == "__main__":')
new_main = '''if __name__ == "__main__":
    print("Writing Chapter 11...")
    write_ch("11-order-execution-types-market-limit-stop-and-value-orders-in-practice.md", "Order Execution Types: Market, Limit, Stop, and Value Orders in Practice", ch11_paras, 17, 1500)

    print("Writing Chapter 12...")
    write_ch("12-cash-interest-on-uninvested-funds-monetizing-liquid-reserves-safely.md", "Cash Interest on Uninvested Funds: Monetizing Liquid Reserves Safely", ch12_paras, 17, 1500)

    print("Writing Chapter 13...")
    write_ch("13-the-cfd-trap-why-most-retail-traders-lose-money-and-how-to-avoid-it.md", "The CFD Trap: Why Most Retail Traders Lose Money and How to Avoid It", ch13_paras, 17, 1500)

    print("Writing Chapter 14...")
    write_ch("14-portfolio-rebalancing-protocols-maintaining-optimal-weightings-automatically.md", "Portfolio Rebalancing Protocols: Maintaining Optimal Weightings Automatically", ch14_paras, 17, 1500)

    print("Writing Chapter 15...")
    write_ch("15-share-lending-mechanics-assessing-counterparty-risk-vs-incremental-yield.md", "Share Lending Mechanics: Assessing Counterparty Risk vs Incremental Yield", ch15_paras, 17, 1500)
    print("Part 3 successfully written!")
'''
c = c[:idx] + new_main
with open('scripts/author_t212_part3.py', 'w', encoding='utf-8') as f:
    f.write(c)
print('Fixed main block!')
