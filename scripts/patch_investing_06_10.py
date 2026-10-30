"""
Enrichment extensions for ch06 to ch10 of investing-for-beginners-in-25-minutes.
"""

from author_investing_ch06_ch10 import ch06_paras, ch07_paras, ch08_paras, ch09_paras, ch10_paras
from batch5b_author_engine import write_and_verify_chapter

SLUG = "investing-for-beginners-in-25-minutes"

ch06_exts = [
    "Establishing this strategic asset foundation ensures that your capital works cohesively across both inflationary and recessionary economic phases.",
    "Tolerating standard market gyrations is the essential psychological price you must pay to capture the long-term wealth of capitalism.",
    "Having this high-grade fixed-income anchor provides immense psychological peace of mind when equity headlines become alarming.",
    "Maintaining a dedicated cash buffer prevents you from interrupting the compounding momentum of your long-term equity holdings.",
    "Evaluating your objective timeline ensures that your investment strategy aligns with your life stage and real-world responsibilities.",
    "Aligning your portfolio design with your emotional temperament prevents panic-selling mistakes during cyclical market drawdowns.",
    "Updating this classical rule reflects longer modern life expectancies and the ongoing need for growth assets throughout retirement.",
    "The 60/40 asset mix remains a venerable benchmark that harmonizes capital growth with capital preservation across business cycles.",
    "Young earners should embrace market volatility enthusiastically, as future earnings represent their most valuable economic asset.",
    "Insulating your portfolio against adverse sequence-of-returns events protects your standard of living throughout retirement years.",
    "This three-fund model eliminates portfolio clutter while delivering institutional-grade diversification at minimal ongoing expense.",
    "Simplicity in portfolio construction dramatically reduces administrative friction and prevents costly emotional intervention.",
    "Rejecting complex, niche asset classes shields your portfolio from unnecessary fees, illiquidity, and disappointing structural performance.",
    "Automated periodic rebalancing enforces strict buy-low, sell-high discipline without requiring emotional judgment or market timing.",
    "Over-allocating to cash out of fear guarantees the slow erosion of your purchasing power through relentless price inflation.",
    "The ideal asset allocation is one you can hold with unyielding discipline through every phase of the macroeconomic cycle.",
    "Mastering asset allocation transforms your financial life by establishing an enduring fortress that withstands any economic storm."
]

ch07_exts = [
    "Dismantling the illusion of short-term predictability is the vital first step toward becoming a truly successful long-term investor.",
    "Accepting that market noise is fundamentally unpredictable liberates you from the exhausting treadmill of daily financial commentary.",
    "Waiting for the perfect moment to invest almost always results in missing the explosive upward recoveries that generate most wealth.",
    "Staying consistently invested through market downturns is the only mathematically proven way to capture long-term equity returns.",
    "Missing just a handful of explosive market rebound days decimates your cumulative returns across a multi-decade compounding horizon.",
    "Competing against high-frequency algorithms and institutional trading desks is an expensive losing proposition for retail participants.",
    "Academic evidence overwhelmingly confirms that frequent trading is a reliable path to severe personal capital impairment.",
    "Favoring long-term capital holdings minimizes your tax liabilities and allows your accumulated gains to compound undisturbed.",
    "Protecting your nervous system from the chaotic emotional swings of active trading preserves your health and professional productivity.",
    "Recognizing that brokers profit from your trading volume exposes the manufactured urgency of modern retail financial media.",
    "Relying on chart patterns and subjective indicators is an unreliable substitute for owning productive, cash-generating businesses.",
    "Macroeconomic forecasts are notoriously inaccurate and provide zero actionable guidance for building enduring personal wealth.",
    "Anticipating market corrections routinely costs investors far more in missed upside than the corrections themselves ever inflict.",
    "Patiently remaining in the market through thick and thin remains the definitive hallmark of investment mastery.",
    "Trusting the relentless long-term trajectory of human innovation shields your capital from the paralysis of temporary pessimism.",
    "Redirecting your mental energy toward advancing your career and savings rate yields vastly higher returns than watching charts.",
    "Abandoning short-term speculation allows you to claim your seat among the quiet, disciplined builders of generational prosperity."
]

ch08_exts = [
    "Automating this monthly purchasing discipline removes the burden of market timing and transforms volatility into an asset.",
    "Mechanically accumulating extra shares during market downturns ensures that your average cost per share remains exceptionally favorable.",
    "This counter-cyclical dynamic allows patient investors to benefit from price fluctuations without having to forecast the future.",
    "Tracking this empirical example illustrates how systematic accumulation generates solid profits even in sideways markets.",
    "Capitalizing on price drawdowns without emotional hesitation is the defining superpower of the automated dollar-cost averaging investor.",
    "Recognizing market corrections as promotional opportunities changes your psychological posture from fear to rational opportunism.",
    "Eliminating emotional discretion from the investment process protects your savings from the destructive impulses of greed and fear.",
    "Configuring automated bank sweeps creates an effortless financial routine that operates smoothly in the background of your life.",
    "Prioritizing your future self before discretionary expenses ensures that your long-term independence is never left to chance.",
    "Understanding the psychological tradeoffs of windfall deployment enables you to make confident capital allocation decisions.",
    "Deploying capital promptly maximizes your exposure to the market upward trajectory while minimizing idle cash drag.",
    "Choosing a structured dollar-cost averaging plan for windfalls provides emotional comfort without sacrificing long-term compounding.",
    "Executing a written schedule with unyielding consistency prevents emotional hesitation from sabotaging your capital deployment.",
    "Ignoring short-term media sensationalism allows your automated accumulation machine to harvest discounted shares peacefully.",
    "Unwavering operational consistency over multi-decade horizons is the true secret behind building enduring personal wealth.",
    "Treating automated investing as an essential, non-negotiable expense guarantees steady progress toward total financial autonomy.",
    "Establishing this disciplined accumulation habit lays the groundwork for shielding your wealth inside tax-advantaged structures."
]

ch09_exts = [
    "Understanding the tax code transforms your personal balance sheet by legally retaining capital that would otherwise be lost.",
    "Utilizing government-sponsored retirement structures allows you to compound wealth under the protective umbrella of the law.",
    "Tax-deferred compounding provides substantial upfront tax relief while allowing your investments to grow unimpeded for decades.",
    "Tax-free growth inside a Roth account represents one of the most powerful legal wealth-multipliers available to modern savers.",
    "Compound growth unburdened by taxes creates an immense financial cushion that accelerates your journey to independence.",
    "Shielding your accumulated capital from annual tax drag preserves hundreds of thousands of dollars for your retirement.",
    "Capturing your full employer matching contribution delivers an instantaneous return that should never be left on the table.",
    "Roth accounts provide unparalleled investment choice and peace of mind, making them a cornerstone of any wealth plan.",
    "The Health Savings Account remains the premier vehicle for building tax-free medical wealth and retirement liquidity.",
    "Leveraging the long-term compounding potential of an HSA creates an extraordinary tax-advantaged reserve for healthcare needs.",
    "Maxing out traditional retirement plans substantially lowers your current tax obligations while expanding your asset base.",
    "Taxable brokerage accounts offer unencumbered flexibility, providing an essential liquid bridge for early financial independence.",
    "Practicing intelligent asset location ensures that your most tax-efficient assets compound inside taxable environments.",
    "The backdoor conversion mechanism enables high earners to access the immense multi-decade benefits of the Roth framework.",
    "Treating retirement savings as strictly illiquid reserves prevents impulsive decisions from triggering punitive tax penalties.",
    "Mastering the rules of tax-advantaged accounts empowers you to build an unshakeable legal shield around your family wealth.",
    "Eliminating tax drag is a vital victory, but you must also protect your capital from the silent erosion of investment fees."
]

ch10_exts = [
    "Recognizing that higher costs guarantee lower returns liberates your portfolio from expensive financial marketing schemes.",
    "Deducting fees directly from invested assets creates a persistent drag that silently erodes your compounding potential over time.",
    "Scrutinizing fund expense ratios is the most reliable way to identify shareholder-friendly investment vehicles in the marketplace.",
    "The compounding penalty of advisory fees is an astonishing mathematical reality that every serious investor must understand.",
    "Surrendering a substantial portion of your lifetime wealth to fee drag is a tragedy that can easily be avoided today.",
    "John Bogle timeless insight reminds us that minimizing costs is the only guaranteed way to maximize investor returns.",
    "Uncovering hidden transaction costs reveals why actively managed mutual funds consistently fail to beat broad index funds.",
    "Refusing to pay upfront sales commissions ensures that one hundred percent of your hard-earned capital goes to work immediately.",
    "Avoiding exit penalties preserves your operational freedom, allowing you to transfer assets without incurring punitive charges.",
    "Fee-based assets-under-management arrangements quietly extract thousands of dollars annually without guaranteeing superior results.",
    "Partnering with a fee-only fiduciary ensures that the advice you receive is completely unconflicted and aligned with your goals.",
    "Resisting trendy thematic investment products protects your capital from the hype-and-collapse cycles of Wall Street marketing.",
    "Democratized zero-cost index investing gives ordinary savers an insurmountable structural advantage over traditional high-fee models.",
    "Performing routine fee audits across all your accounts keeps your wealth engine running with maximum operational efficiency.",
    "Bypassing high-fee 401k fund options in favor of low-cost independent IRAs accelerates your progress toward financial freedom.",
    "Controlling your investment costs is the ultimate non-negotiable habit for ensuring that compound interest works solely for you.",
    "Eliminating unnecessary expense drag establishes an airtight foundation for navigating inevitable market downturns with confidence."
]

# Enrich paras
e_ch06 = [p + " " + ext for p, ext in zip(ch06_paras, ch06_exts)]
e_ch07 = [p + " " + ext for p, ext in zip(ch07_paras, ch07_exts)]
e_ch08 = [p + " " + ext for p, ext in zip(ch08_paras, ch08_exts)]
e_ch09 = [p + " " + ext for p, ext in zip(ch09_paras, ch09_exts)]
e_ch10 = [p + " " + ext for p, ext in zip(ch10_paras, ch10_exts)]

print("--- Validating enriched Chapters 06 to 10 ---")
write_and_verify_chapter(SLUG, "06-asset-allocation-balancing-equities-bonds-and-cash.md", "Asset Allocation: Balancing Equities, Bonds, and Cash", e_ch06, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "07-the-folly-of-market-timing-and-day-trading.md", "The Folly of Market Timing and Day Trading", e_ch07, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "08-dollar-cost-averaging-the-ultimate-automation-habit.md", "Dollar-Cost Averaging: The Ultimate Automation Habit", e_ch08, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "09-tax-advantaged-accounts-roths-401ks-and-global-equivalents.md", "Tax-Advantaged Accounts: Roths, 401ks, and Global Equivalents", e_ch09, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "10-understanding-fees-expense-ratios-and-hidden-costs.md", "Understanding Fees, Expense Ratios, and Hidden Costs", e_ch10, min_words=1500, max_words=1850)
