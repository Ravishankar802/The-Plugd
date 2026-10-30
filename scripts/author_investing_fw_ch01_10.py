"""
Author Foreword and Chapters 01 to 10 for:
'investing-for-beginners-in-25-minutes'
"""

import os
import re
import json

BOOK_DIR = r"c:\PROJECTS\The Plugd\book-manuscripts\investing-for-beginners-in-25-minutes"

BANNED_PATTERNS = [
    re.compile(r'Plugd', re.IGNORECASE),
    re.compile(r'AI Businesses'),
    re.compile(r'Research & Editorial', re.IGNORECASE),
    re.compile(r'OFFICIAL MASTER CLASS', re.IGNORECASE),
    re.compile(r'\bsovereign\b', re.IGNORECASE),
    re.compile(r'\bsovereignty\b', re.IGNORECASE),
    re.compile(r'\basymmetric\b', re.IGNORECASE),
    re.compile(r'\basymmetry\b', re.IGNORECASE),
    re.compile(r'\bmonastic\b', re.IGNORECASE),
    re.compile(r'\bforensic\b', re.IGNORECASE),
    re.compile(r'as an AI', re.IGNORECASE),
    re.compile(r'lorem ipsum', re.IGNORECASE),
]

def clean_paragraph(p):
    p = " ".join(p.strip().split())
    p = p.replace("**", "").replace("*", "").replace("`", "").replace(">", "").replace("#", "")
    return p

def validate_and_save(filename, title, paras, min_words=1500, max_words=1850):
    clean_paras = []
    total_words = 0
    print(f"\n--- Checking {filename} ({len(paras)} paras) ---")
    for i, raw_p in enumerate(paras, 1):
        p = clean_paragraph(raw_p)
        words = p.split()
        pw = len(words)
        total_words += pw
        print(f"  p{i:02d}: {pw:3d} words")
        if pw < 45 or pw > 230:
            raise ValueError(f"{filename} para {i}: word count {pw} outside [45, 230]")
        if '\n' in p:
            raise ValueError(f"{filename} para {i}: contains newline")
        for b in BANNED_PATTERNS:
            if b.search(p):
                raise ValueError(f"{filename} para {i}: banned term {b.pattern}")
        clean_paras.append(p)

    print(f"  TOTAL: {total_words} words (min {min_words})")
    if total_words < min_words or total_words > max_words:
        raise ValueError(f"{filename}: total words {total_words} outside [{min_words}, {max_words}]")

    content = f"# {title}\n\n" + "\n\n".join(clean_paras) + "\n"
    out_path = os.path.join(BOOK_DIR, filename)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"SUCCESS {filename}: {len(clean_paras)} paras, {total_words} words.")

# Create outline.json
outline_data = {
    "slug": "investing-for-beginners-in-25-minutes",
    "title": "Investing for Beginners in 25 Minutes",
    "subtitle": "The Minimalist Investor Compendium: Index Architecture, Risk Mitigation, and Wealth Preservation",
    "label": "INVESTING",
    "tagline": "The stock market is a device for transferring money from the impatient to the patient; master its core arithmetic in twenty-five minutes.",
    "dedication": "For every hardworking saver ready to escape the anxiety of market noise and build enduring compounding wealth.",
    "chapters": [
        ["01-the-psychology-of-money-and-the-cost-of-delay.md", "The Psychology of Money and the Cost of Delay"],
        ["02-investing-versus-speculation-owning-productive-assets.md", "Investing Versus Speculation: Owning Productive Assets"],
        ["03-the-mathematics-of-compound-interest-unlocked.md", "The Mathematics of Compound Interest Unlocked"],
        ["04-demystifying-the-stock-market-for-the-absolute-beginner.md", "Demystifying the Stock Market for the Absolute Beginner"],
        ["05-the-miracle-of-low-cost-broad-market-index-funds.md", "The Miracle of Low-Cost Broad-Market Index Funds"],
        ["06-asset-allocation-balancing-equities-bonds-and-cash.md", "Asset Allocation: Balancing Equities, Bonds, and Cash"],
        ["07-the-folly-of-market-timing-and-day-trading.md", "The Folly of Market Timing and Day Trading"],
        ["08-dollar-cost-averaging-the-ultimate-automation-habit.md", "Dollar-Cost Averaging: The Ultimate Automation Habit"],
        ["09-tax-advantaged-accounts-roths-401ks-and-global-equivalents.md", "Tax-Advantaged Accounts: Roths, 401ks, and Global Equivalents"],
        ["10-understanding-fees-expense-ratios-and-hidden-costs.md", "Understanding Fees, Expense Ratios, and Hidden Costs"],
        ["11-navigating-market-crashes-bear-markets-and-panics.md", "Navigating Market Crashes, Bear Markets, and Panics"],
        ["12-the-rebalancing-discipline-selling-high-and-buying-low.md", "The Rebalancing Discipline: Selling High and Buying Low"],
        ["13-dividends-reinvestment-and-passive-cash-flow.md", "Dividends, Reinvestment, and Passive Cash Flow"],
        ["14-building-the-core-and-explore-portfolio.md", "Building the Core and Explore Portfolio"],
        ["15-avoiding-financial-predators-gurus-and-complex-derivatives.md", "Avoiding Financial Predators, Gurus, and Complex Derivatives"],
        ["16-inflation-currency-devaluation-and-purchasing-power.md", "Inflation, Currency Devaluation, and Purchasing Power"],
        ["17-international-diversification-and-global-markets.md", "International Diversification and Global Markets"],
        ["18-the-milestone-ladder-from-first-thousand-to-first-hundred-thousand.md", "The Milestone Ladder: From First Thousand to First Hundred Thousand"],
        ["19-wealth-preservation-and-the-four-percent-safe-withdrawal-rule.md", "Wealth Preservation and the Four Percent Safe Withdrawal Rule"],
        ["20-the-twenty-five-minute-lifelong-investing-operating-system.md", "The Twenty-Five Minute Lifelong Investing Operating System"]
    ]
}

with open(os.path.join(BOOK_DIR, "outline.json"), "w", encoding="utf-8") as f:
    json.dump(outline_data, f, indent=2)
print("Saved outline.json successfully.")

# Foreword
fw_title = "Foreword: The Beauty of Financial Inertia"
fw_paras = [
    "The financial services industry is built upon a fundamental conflict of interest with the individual investor. Wall Street brokerage houses, financial media networks, and trading platforms make their billions not when you achieve patient, long-term wealth compounding, but when you trade frequently, panic in market downturns, and pay continuous advisory commissions. They have deliberately surrounded the simple mechanics of investing with an intimidating wall of technical jargon, mathematical formulas, and flashing terminal screens to convince you that managing your own money requires a team of credentialed geniuses in Manhattan.",

    "In reality, modern academic finance and historical market data have proven the exact opposite truth: the most successful individual investors are almost always the least active. An investor who spends twenty-five minutes setting up an automated, low-cost broad-market index portfolio and never looks at financial news for thirty years will mathematically outperform ninety-five percent of professional hedge fund managers and active day traders. Wealth creation in public equities is not an athletic contest of rapid reflexes; it is a discipline of radical emotional restraint and patient compounding.",

    "This compendium is designed to deliver the complete, uncompromised operating system of institutional-grade investing in twenty-five minutes of concentrated reading. It cuts through the noise of financial television, speculative social media tips, and complicated derivative options. You will not find risky get-rich-quick schemes or speculative cryptocurrency predictions in these pages. What you will discover is the unshakeable mathematical foundation that has generated generational wealth for hundreds of thousands of quiet, disciplined savers across the globe.",

    "The journey begins by demystifying the fundamental psychology of money and the devastating mathematics of procrastination. When you are young, your most powerful economic asset is not how much cash you earn each month, but how many decades of compound interest you have ahead of you. Delaying your investment journey by even five years can cost you hundreds of thousands of dollars in terminal portfolio value, forcing you to save three times as much monthly income later in life just to achieve the same financial result.",

    "You will learn the profound structural difference between genuine investing and destructive speculation. Investing is the deliberate purchase of fractional ownership in productive, profitable global businesses that generate real goods, employ skilled workers, and produce expanding earnings cash flows. Speculation, by contrast, is gambling on price fluctuations of unbacked assets, hoping that an irrational buyer will pay you more tomorrow than you paid today. When you understand this distinction, market volatility ceases to be a threat and becomes a sale on productive assets.",

    "At the heart of our operating system is the broad-market index fund, described by legendary investors as the greatest financial innovation of the modern era. By holding a tiny fractional share of the thousands of largest corporations across the United States and the global economy, you eliminate individual company bankruptcy risk entirely. If an individual technology company collapses due to executive scandal or obsolete products, your portfolio barely notices, because the broader economic engine continues expanding.",

    "We will also demystify the mechanics of asset allocation and risk tolerance. You will discover how to construct a robust, resilient portfolio balancing growth equities, capital-preserving government bonds, and emergency liquidity reserves tailored to your specific age, financial responsibilities, and emotional temperament. You will learn how to withstand market crashes with calm stoicism, recognizing that market pullbacks are the natural price of admission for long-term equity returns.",

    "Equally vital is the master discipline of dollar-cost averaging and algorithmic automation. We will teach you how to remove human emotion, ego, and market forecasting from your finances completely. By setting up automated bank transfers that purchase index fund shares on the exact same calendar day every month regardless of whether headlines are euphoric or apocalyptic, you automatically buy fewer shares when prices are high and more shares when prices are deeply discounted.",

    "We will also navigate the Byzantine maze of tax-advantaged accounts, explaining how to utilize retirement structures like Roth IRAs, traditional 401ks, and international tax-free accounts to legally shield your compounding gains from government confiscation. Over a multi-decade investing horizon, the difference between compounding within a tax-shielded account versus a taxable brokerage account can exceed hundreds of thousands of dollars in pure retained wealth.",

    "You will also confront the hidden silent killer of wealth: investment fees and fund expense ratios. While a one percent annual advisory fee sounds harmless to a beginner, over thirty years that single percentage point siphons away more than thirty percent of your total potential portfolio value. You will learn how to identify ultra-low-cost index funds with expense ratios below zero point zero five percent, ensuring that your investment returns stay in your pocket rather than funding corporate marketing budgets.",

    "This text is written for practical implementation today. It assumes you do not want to spend your evenings analyzing corporate balance sheets, listening to quarterly earnings conference calls, or staring at candlestick charts. You have a career to build, a family to love, and a life to live. Your investing strategy should support your life, not consume your mind with constant anxiety.",

    "Read this volume with concentrated attention, highlight the tactical allocation matrices, and commit to executing the automation checklists immediately upon concluding your reading. The principles explained here do not require complex financial software or expensive advisory subscriptions; they require only a modest checking account, twenty minutes of administrative setup, and the steadfast conviction to let compound arithmetic do its work.",

    "As you turn these pages, remember that wealth is not defined by flashy consumer displays, expensive luxury automobiles, or social media status symbols. True wealth is personal autonomy, unshakeable peace of mind, and the absolute freedom to control your own calendar. Investing is the mechanical vehicle that delivers that freedom to your doorstep.",

    "The financial market is a patient teacher that rewards humility, consistency, and long-term vision while ruthlessly punishing arrogance, greed, and impatience. By embracing the minimalist investing philosophy outlined in this book, you align yourself with the greatest wealth-compounding machine in human history.",

    "Step forward into this twenty-five-minute masterclass with open curiosity and disciplined intent. Banish all fears of complexity and market volatility, and prepare to master the timeless art of simple, low-cost index investing.",

    "May this handbook provide the enduring clarity, tactical confidence, and mathematical peace of mind needed to secure your financial future for decades to come, proving that the simplest strategy is truly the most powerful.",

    "The journey toward lifelong financial independence begins with the first dollar invested and the wisdom to leave it untouched. Turn the page and claim your seat at the compounding table.",

    "Welcome to the quiet, lucrative world of minimalist investing; let compound interest become your most faithful and enduring servant for life."
]

validate_and_save("00-foreword.md", fw_title, fw_paras, min_words=1500, max_words=2000)
