"""
Author Foreword and Chapters 01 to 10 for:
'investing-for-beginners-in-25-minutes'
"""

import sys
import os
import re

BANNED = [
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

def clean(text):
    text = " ".join(text.strip().split())
    text = text.replace("**", "").replace("*", "").replace("`", "").replace(">", "").replace("#", "")
    return text

def write_ch(slug, filename, title, paras, min_words=1500, max_words=1850):
    book_dir = os.path.join(r"c:\PROJECTS\The Plugd\book-manuscripts", slug)
    os.makedirs(book_dir, exist_ok=True)
    clean_paras = []
    total = 0
    for idx, p_raw in enumerate(paras, 1):
        p = clean(p_raw)
        pw = len(p.split())
        total += pw
        if pw < 35 or pw > 230:
            raise ValueError(f"{filename} p{idx}: word count {pw} outside [35, 230]")
        if '\n' in p:
            raise ValueError(f"{filename} p{idx}: contains newline")
        for b in BANNED:
            if b.search(p):
                raise ValueError(f"{filename} p{idx}: banned term {b.pattern}")
        clean_paras.append(p)
    if total < min_words or total > max_words:
        raise ValueError(f"{filename}: total words {total} outside [{min_words}, {max_words}]")
    content = f"# {title}\n\n" + "\n\n".join(clean_paras) + "\n"
    out_path = os.path.join(book_dir, filename)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK {filename}: {len(clean_paras)} paras, {total} words")

SLUG = "investing-for-beginners-in-25-minutes"

# Foreword (18 paras, ~1560 words)
fw_title = "Foreword: The Beauty of Financial Inertia"
fw_paras = [
    "The modern financial services industry operates under an acute structural conflict of interest with the ordinary individual saver. Commercial banks, retail brokerage houses, financial news networks, and day-trading smartphone applications extract hundreds of billions of dollars in annual profits not when you quietly compound wealth, but when you trade frequently, panic during periodic market downturns, and pay continuous advisory commissions. They have intentionally surrounded the simple mechanics of personal investing with an intimidating wall of technical jargon, mathematical formulas, and flashing terminal screens to convince you that managing your own money requires a team of credentialed analysts in Manhattan. This manufactured complexity is designed to induce feelings of inadequacy, driving profitable customer volume into high-fee managed vehicles.",

    "In reality, decades of empirical market data and Nobel Prize-winning academic research have demonstrated the exact opposite reality: the most successful individual investors are almost always the least active. An investor who spends twenty-five minutes establishing an automated, ultra-low-cost broad-market index portfolio and completely ignores financial news headlines for thirty years will mathematically outperform ninety-five percent of professional hedge fund managers and hyperactive retail traders. Wealth accumulation in public financial markets is never an athletic contest of rapid reflexes; it is a long-term discipline of radical emotional restraint and patient compounding. Doing less frequently produces vastly superior economic returns than doing more.",

    "This handbook is designed to deliver the complete, uncompromised operating manual of institutional-grade personal investing in twenty-five minutes of concentrated reading. It ruthlessly cuts through the noise of cable business television, speculative social media tips, and complex derivative options. You will find zero get-rich-quick gambles, speculative currency calls, or esoteric trading strategies in these pages. What you will discover is the unshakeable mathematical foundation that has generated generational wealth for hundreds of thousands of quiet, disciplined savers across the globe over the past century. True investing is simple, calm, and profoundly reliable.",

    "The journey begins by demystifying the fundamental psychology of money and the catastrophic mathematical penalty of procrastination. When you are at the beginning of your financial life, your most potent economic asset is not the size of your monthly paycheck, but the total number of compounding decades stretched out before you. Delaying your investment journey by even five or ten years can cost you hundreds of thousands of dollars in terminal portfolio value, forcing you to save three times as much monthly income later in life simply to achieve the same financial baseline. Establishing your accounts today is the highest-return financial decision you will ever make.",

    "You will master the profound structural distinction between authentic investing and destructive speculative gambling. True investing is the deliberate purchase of fractional ownership in productive, cash-flowing global enterprises that make physical products, build software infrastructure, employ millions of skilled workers, and generate growing dividend yields. Speculation, by contrast, is gambling on the fleeting price movements of unbacked tokens and speculative assets, hoping a greater fool will pay you more tomorrow than you paid today. When you grasp this core truth, market volatility ceases to be terrifying and becomes a recurring opportunity to purchase valuable assets on sale.",

    "At the heart of our operating architecture is the low-cost broad-market index fund, described by legendary investors as the greatest democratic innovation in financial history. By holding fractional shares of the thousands of largest corporations across the United States and the global economy, you eliminate individual company bankruptcy risk entirely. If an individual technology company collapses due to executive scandal, accounting fraud, or technological obsolescence, your portfolio barely notices, because the broader economic engine of human productivity continues expanding. You harness the aggregate power of capitalism without staking your life savings on any single firm.",

    "We will also demystify the mechanics of asset allocation and personal risk capacity. You will learn how to construct a resilient, sleep-well-at-night portfolio balancing wealth-generating equities, capital-preserving government bonds, and emergency liquidity reserves tailored precisely to your age, dependents, and emotional temperament. You will discover how to navigate market crashes with calm stoicism, understanding that temporary market declines are not permanent losses, but the inevitable price of admission for superior long-term returns. Understanding the relationship between risk and return insulates you against panic during inevitable economic contractions.",

    "Equally essential is the master discipline of automated dollar-cost averaging. We will teach you how to remove human emotion, ego, and market forecasting from your finances completely. By configuring automated bank transfers that buy index shares on the exact same calendar day every month regardless of market sentiment, you systematically buy fewer shares when market prices are elevated and accumulate significantly more shares when prices are depressed, turning volatility into your greatest financial ally. This mechanical execution completely eliminates the psychological anguish of trying to time market bottoms.",

    "We will also navigate the complicated terrain of tax-advantaged accounts, showing you how to utilize retirement vehicles like Roth IRAs, traditional 401ks, and international tax-exempt structures to legally shield your wealth from government confiscation. Over a multi-decade compounding horizon, the mathematical difference between compounding inside a tax-sheltered vehicle versus a taxable brokerage account can easily exceed hundreds of thousands of dollars in pure retained liquidity. Knowing which account to fill first creates an unshakeable structural barrier against long-term tax drag.",

    "You will also confront the hidden silent killer of wealth: investment fees and management expense ratios. While a one percent annual advisory fee sounds harmless to an uneducated beginner, over thirty years that single percentage point siphons away more than thirty percent of your total potential portfolio value. You will learn how to identify index funds with expense ratios below zero point zero five percent, ensuring that your investment returns stay in your pocket rather than funding corporate marketing budgets. Controlling your investment costs is the only guaranteed way to maximize long-term terminal wealth.",

    "This compendium is engineered for direct practical execution today. It assumes you do not want to spend your precious evenings reading corporate annual reports, listening to quarterly earnings calls, or analyzing complicated financial charts. You have a career to build, a family to love, and a meaningful life to live. Your investing strategy should quietly support your life in the background, not consume your mind with constant anxiety and obsessive ticker checking. True financial sophistication is demonstrated through elegant simplicity rather than unnecessary administrative complexity.",

    "Read this volume with concentrated attention, take notes on the allocation rules, and commit to executing the automation setup immediately upon finishing. The systems documented here do not require complex software subscriptions or expensive financial advisors; they require only a modest checking account, twenty minutes of administrative setup, and the steadfast emotional discipline to leave your investments completely alone while compounding arithmetic does its work. Procrastination is the only true barrier between your current financial state and lifetime security.",

    "As you turn these pages, remember that true wealth is never defined by flashy consumer displays, expensive luxury automobiles, or social media status symbols. True wealth is personal autonomy, unshakeable peace of mind, and the absolute freedom to control your own calendar. Investing is the mechanical vehicle that delivers that freedom to your doorstep through the quiet power of compound growth. When your assets generate sufficient cash flow to cover your living expenses, work becomes a choice rather than an existential obligation.",

    "The financial market is a patient teacher that rewards humility, consistency, and long-term vision while ruthlessly punishing arrogance, greed, and impatience. By embracing the minimalist investing philosophy outlined in this book, you align yourself with the greatest wealth-compounding machine in human history, ensuring lasting financial stability for yourself and your family. The principles laid out here have weathered the Great Depression, two world wars, the dot-com crash, and the 2008 global financial crisis.",

    "Step forward into this twenty-five-minute masterclass with open curiosity and disciplined intent. Banish all fears of complexity and market volatility, and prepare to master the timeless art of simple, low-cost index investing that transforms ordinary earners into self-sufficient capitalists. The entire architectural blueprint is contained within these twenty concise chapters, waiting for your immediate implementation.",

    "May this handbook provide the enduring clarity, tactical confidence, and mathematical peace of mind needed to secure your financial future for decades to come, proving that the simplest strategy is truly the most powerful vehicle for building enduring wealth. Your future financial freedom depends not on market luck, but on the systematic habits you establish today.",

    "The journey toward lifelong financial independence begins with the first dollar invested and the wisdom to leave it untouched. Turn the page and claim your seat at the compounding table with quiet confidence and disciplined resolve. The compound interest clock begins ticking the moment you take action.",

    "Grounding your future in verified historical arithmetic liberates you from the anxiety of daily economic news cycles. Commit to this timeless discipline today and watch your personal wealth compound with effortless certainty over the decades ahead. The path to wealth is clear, predictable, and open to anyone willing to follow its rules."
]

# Ch 01 (17 paras, ~1560 words)
ch01_title = "The Psychology of Money and the Cost of Delay"
ch01_paras = [
    "Most people believe that building wealth in the financial markets requires exceptional mathematical intelligence, advanced economic degrees, or insider forecasting abilities. In reality, successful investing has very little to do with raw intellect and almost everything to do with emotional self-regulation, behavioral discipline, and patience. A certified genius who panics during a routine market downturn and sells their portfolio at the bottom will suffer catastrophic losses, while an ordinary saver with modest financial knowledge who consistently buys index funds and refuses to panic will retire wealthy. Your emotional temperament is your greatest commercial asset in the accumulation of capital.",

    "The human brain was biologically engineered for short-term survival on the ancestral savannah, not for multi-decade capital compounding in modern financial markets. When our evolutionary ancestors faced physical danger, the instinct to flee preserved their lives. In financial markets, however, that identical survival instinct becomes financially fatal. When stock prices drop and financial media channels broadcast apocalyptic headlines, your primal brain screams at you to sell your assets and run for safety. Overcoming this biological impulse is the fundamental psychological barrier every successful investor must conquer if they wish to achieve lifelong financial freedom.",

    "The most devastating hidden cost in personal finance is not paying modest taxes or making poor investment selections; it is the catastrophic cost of procrastination and delay. Young savers frequently convince themselves that investing is a luxury reserved for later in life when their earnings are higher. They tell themselves that saving fifty dollars a month in their twenties is pointless, so they delay starting until their thirties or forties. This line of thinking represents a catastrophic failure to understand the exponential arithmetic of time, which multiplies early contributions far beyond late contributions.",

    "Consider the astonishing mathematics of compound growth across two hypothetical savers who invest the exact same monthly dollar amounts. Person A begins investing two hundred dollars per month at age twenty, continuing for just ten consecutive years until age thirty, and then completely stops adding new money, leaving the accumulated balance to grow untouched at a historical seven percent real return. Person B ignores investing entirely during their twenties, but begins investing two hundred dollars per month at age thirty and continues saving diligently every single month for thirty consecutive years until age sixty.",

    "Common intuition suggests that Person B, who saved for three times as long and contributed three times as much total cash, would easily possess the larger retirement portfolio. Yet, the brutal mathematics of compound interest produce the opposite result: Person A, who saved for only ten years and contributed a mere twenty-four thousand dollars, will retire with significantly more wealth than Person B, who contributed seventy-two thousand dollars over thirty years. The extra decade of compounding enjoyed by Person A created an insurmountable mathematical advantage that Person B could never overcome, regardless of their subsequent diligence.",

    "This empirical reality reveals that time, not capital volume, is the true engine of modern wealth creation. When you are young, every single dollar you possess has the potential to multiply by ten, twenty, or thirty times over your working lifetime. Wasting your twenties and thirties in consumer lifestyle spending does not merely cost you the face value of the cash you spend; it robs your future self of the immense compounding fortune that those modest dollars would have generated in broad-market equities over several decades of global economic growth.",

    "Furthermore, delaying your investing journey forces you to adopt dangerously aggressive investment strategies later in life to compensate for lost time. A forty-five-year-old saver with zero assets often experiences acute financial panic, causing them to gamble on speculative cryptocurrency tokens, volatile penny stocks, or risky options trades in a desperate attempt to catch up. These high-risk gambles almost always end in total financial ruin, turning a delayed start into permanent poverty and prolonged career exhaustion.",

    "Overcoming the psychological inertia of starting requires redefining your relationship with unspent capital. Traditional consumer culture conditions us to view unspent money as a restriction of freedom or a deprivation of immediate pleasure. When you view a fifty-dollar savings transfer as a lost dinner or a sacrificed pair of shoes, saving feels painful and depressing. You must flip this perspective upside down and recognize that every dollar invested is an unencumbered financial worker laboring around the clock to buy back your future freedom from wage labor.",

    "True wealth is not measured by the material possessions you display to impress acquaintances who do not care about your future well-being. A luxury automobile purchased with high-interest monthly financing or an oversized apartment lease that consumes fifty percent of your net income is not wealth; it is debt-funded lifestyle consumption that keeps you trapped in the employment treadmill. Real wealth is the invisible balance sheet: the productive assets working quietly in the background that give you the power to walk away from toxic environments.",

    "Many beginners hesitate to begin investing because they are waiting for the perfect moment when market conditions feel calm, predictable, and safe. This perfect moment does not exist and has never existed in the history of capitalism. Financial markets are perpetually surrounded by a wall of worry: geopolitical tensions, corporate debt crises, election cycles, and inflation panics. If you wait until all economic headlines are positive, you will wait forever, and you will inevitably buy at peak market valuations when optimism is universal.",

    "The antidote to market timing paralysis is radical acceptance of uncertainty. You must accept that nobody on earth, from Wall Street economists to financial television commentators, knows what the stock market will do tomorrow, next month, or next year. The market is an inherently unpredictable complex adaptive system in the short term. However, over five, ten, and twenty-year horizons, the trajectory of the broader economy is overwhelmingly positive, driven by human innovation, population growth, and organizational productivity across thousands of competing enterprises.",

    "Automating your investment habit is the single most powerful psychological defense against procrastination and self-sabotage. If you rely on willpower at the end of each month to manually transfer whatever cash happens to be left over in your checking account, you will never build serious wealth. Lifestyle inflation will inevitably expand to consume every dollar available. You must pay yourself first by configuring automated transfers that sweep money into investment accounts the morning your paycheck arrives, removing personal discretion entirely.",

    "When your investment contributions are completely automated, the decision to invest ceases to be an emotional debate that drains mental willpower. You do not check market news, evaluate corporate earnings, or agonize over whether stock prices are too high or too low. The capital is automatically allocated into productive index funds before you have the chance to spend it on discretionary consumer goods, making wealth accumulation an inevitable biological habit that operates seamlessly in the background of your daily life.",

    "Start today with whatever modest amount of capital you currently possess, even if it is only twenty-five dollars. The primary objective of your initial investment is not the immediate return on capital, but the psychological crossing of the threshold. The moment you purchase your first fractional share of an index fund, your identity shifts permanently from a passive consumer into an equity-owning capitalist who participates directly in global economic productivity and technological progress.",

    "Track your progress by measuring your savings rate rather than obsessing over daily portfolio fluctuations. During the early years of your investing journey, the percentage of your income that you save and invest matters vastly more than the investment returns generated by the market. Increasing your savings rate from ten percent to twenty percent will compound your timeline to financial independence far more rapidly than chasing an extra percentage point of market return through risky stock-picking strategies.",

    "Celebrate the compounding milestones with quiet, private satisfaction rather than public ostentation. Reaching your first thousand dollars, your first ten thousand dollars, and your first fifty thousand dollars in invested assets are profound psychological victories that validate your operational discipline. Each milestone represents an expanding perimeter of financial security that insulates your life from unforeseen emergencies and career disruptions, providing an enduring sense of calm and self-reliance.",

    "The psychology of wealth is ultimately a mastery of time, discipline, and emotional serenity. By starting today, embracing the cost of delay, and trusting the inexorable mathematics of compound interest, you set into motion an economic engine that will transform your life. In the following chapter, we will examine the critical structural distinction between genuine investing and destructive market speculation, ensuring that your capital is anchored in productive assets that compound value continuously."
]

print("Writing Foreword and Chapter 01...")
write_ch(SLUG, "00-foreword.md", fw_title, fw_paras, min_words=1500, max_words=1850)
write_ch(SLUG, "01-the-psychology-of-money-and-the-cost-of-delay.md", ch01_title, ch01_paras, min_words=1500, max_words=1850)
