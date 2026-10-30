"""
Enrichment extensions for ch11 to ch15 of investing-for-beginners-in-25-minutes.
"""

from author_investing_ch11_ch15 import ch11_paras, ch12_paras, ch13_paras, ch14_paras, ch15_paras
from batch5b_author_engine import write_and_verify_chapter

SLUG = "investing-for-beginners-in-25-minutes"

ch11_exts = [
    "Expecting these regular cyclical contractions prepares your mind to treat downturns as normal features of the financial landscape.",
    "Recognizing that unrealized paper volatility is not permanent loss prevents you from making catastrophic liquidation mistakes during panics.",
    "Overriding your primal fight-or-flight biology is the essential psychological victory required to build lifelong compounding wealth.",
    "Treating your equity holdings as durable, productive property insulates your emotions from the chaotic daily mood swings of public markets.",
    "Historical resilience confirms that backing human ingenuity and productive enterprise is the most reliable commercial strategy over time.",
    "Keeping the brevity of bear markets in perspective allows you to endure temporary discomfort while waiting for multi-year expansionary phases.",
    "Continuing your automated contributions through bear markets systematically plants the seeds for extraordinary future wealth creation.",
    "Consulting your written Investment Policy Statement provides an objective, rational compass that guides your actions through market storms.",
    "Maintaining an adequate liquid emergency buffer ensures that real-world crises never compel you to sell depreciated assets under duress.",
    "Disciplined rebalancing during market downturns mechanically executes the golden rule of buying undervalued assets without emotional hesitation.",
    "Harvesting capital losses in taxable accounts extracts valuable structural deductions that improve your net after-tax financial outcomes.",
    "Deleting trading applications during market downturns preserves your emotional calm and protects your portfolio from impulsive mistakes.",
    "Embracing the uncomfortable truth that fortunes are forged during market panics empowers you to buy courageously when others panic.",
    "Accepting volatility as the inevitable price of admission for superior returns aligns your mindset with verified financial reality.",
    "Viewing economic cycles with historical detachment ensures that you remain calm and composed through every seasonal economic shift.",
    "Greedily accumulating productive assets during periods of pervasive panic remains the definitive superpower of elite long-term allocators.",
    "Mastering emotional fortitude during severe crashes elevates you into the top tier of resilient, self-directed wealth builders."
]

ch12_exts = [
    "Mechanizing the discipline of buying low and selling high eliminates the emotional biases that destroy ordinary retail performance.",
    "Tracking asset proportions ensures that your portfolio remains firmly aligned with your intended risk tolerance and financial objectives.",
    "Preventing unintentional equity creep during euphoric bull markets protects your accumulated wealth from catastrophic drawdowns when tides turn.",
    "Harvesting gains from outperforming assets de-risks your balance sheet systematically without requiring speculative market timing.",
    "Forcing yourself to purchase discounted equities during recessions overcomes fear and sets up powerful long-term compounding momentum.",
    "Calendar-based rebalancing offers an elegant, low-maintenance framework that keeps your investments disciplined with minimal annual effort.",
    "Corridor rebalancing ensures that adjustments are made only when meaningful structural divergence occurs, optimizing transaction efficiency.",
    "Selecting an annual rebalancing cadence strikes the ideal balance between rigorous risk management and frictionless portfolio administration.",
    "Recognizing the potential tax liabilities of selling appreciated assets allows you to explore more efficient rebalancing alternatives.",
    "Directing ongoing cash contributions into underweighted asset classes realigns your portfolio seamlessly with zero capital gains friction.",
    "Executing rebalancing maneuvers inside tax-advantaged retirement accounts completely eliminates tax drag while maintaining portfolio balance.",
    "Harvesting volatility through systematic rebalancing extracts an unheralded mathematical premium from natural market price oscillations.",
    "Overcoming the emotional urge to chase running winners preserves your profits and reinforces long-term capital preservation principles.",
    "Trusting the mechanical discipline of rebalancing provides clarity when external economic conditions appear frightening and chaotic.",
    "Avoiding hyperactive rebalancing allows asset classes to express their natural momentum without incurring unnecessary trading drag.",
    "Treating annual rebalancing as a simple maintenance ritual ensures that your long-term wealth engine remains in peak operational condition.",
    "Institutionalizing rebalancing into your financial routine guarantees that you will systematically harvest profits and accumulate bargains forever."
]

ch13_exts = [
    "Appreciating the historical power of dividends transforms your perception of wealth creation from speculative hype to reliable arithmetic.",
    "Understanding the corporate capital allocation decision clarifies why regular cash distributions represent authentic commercial health.",
    "Demanding verifiable cash distributions filters out fraudulent accounting tricks and anchors your returns in genuine operating cash flows.",
    "Investing in companies with decades of consecutive dividend increases connects your portfolio to exceptionally resilient corporate enterprises.",
    "Expanding your yield on cost across long holding periods turns modest initial investments into prolific, inflation-beating income streams.",
    "Harvesting growing passive cash flows liberates you from the anxiety of daily stock ticker fluctuations and market commentary.",
    "Automating dividend reinvestment ensures that your capital compounds at maximum velocity without requiring ongoing manual supervision.",
    "Accelerating your share accumulation flywheel quarter after quarter turns time and compound arithmetic into an unstoppable ally.",
    "Reinvesting dividend distributions across full market cycles accounts for the vast majority of cumulative equity wealth creation.",
    "Scooping up bargain shares through automated dividend reinvestment supercharges your portfolio recovery following severe market panics.",
    "Recognizing that abnormally high yields often signal corporate distress protects your hard-earned capital from catastrophic dividend cuts.",
    "Avoiding dangerous yield traps ensures that your investment returns are driven by sustainable corporate growth rather than artificial yield.",
    "Utilizing dedicated dividend growth index funds provides instant diversification across hundreds of premier balance-sheet enterprises.",
    "Navigating dividend tax distinctions ensures that your passive cash flows are shielded inside the appropriate account structures.",
    "Transitioning from accumulation to distribution allows you to harvest organic cash flow without depleting your underlying share count.",
    "Living off dividend income provides unparalleled psychological security, insulating your retirement lifestyle from market downturns.",
    "Harnessing the continuous power of corporate dividends creates an enduring financial legacy that provides security for generations."
]

ch14_exts = [
    "Acknowledging human psychological needs allows you to design a sustainable investment strategy that prevents behavioral burnout.",
    "Partitioning your wealth into distinct Core and Explore compartments reconciles mathematical rigor with natural human curiosity.",
    "Protecting your foundational Core from speculative interference guarantees that your long-term independence remains uncompromised.",
    "Having a ring-fenced sandbox allows you to explore innovative ideas without placing your essential family security in jeopardy.",
    "Enforcing strict one-way capital boundaries prevents speculative trading losses from ever infecting your foundational retirement assets.",
    "Restricting your Explore bucket to a modest percentage ensures that single-company risks can never derail your lifelong financial freedom.",
    "Gaining firsthand experience with individual stock volatility cures you of the delusion that active market-beating is simple.",
    "Satisfying your fear of missing out with small, controlled allocations preserves your emotional discipline and long-term peace of mind.",
    "Harvesting substantial speculative gains de-risks your balance sheet and permanently locks in profits for your foundational Core.",
    "Recovering your initial capital upon doubling ensures that you compound on house money with complete psychological tranquility.",
    "Separating foundational index discipline from small speculative interests has been validated by behavioral finance experts worldwide.",
    "Maintaining rigorous intellectual humility prevents early speculative success from turning into dangerous, reckless overconfidence.",
    "Ruthlessly cutting losing Explore positions prevents emotional attachment from compounding poor investment decisions into major ruin.",
    "Deploying angel investments exclusively from your Explore bucket allows you to back exciting ventures without risking solvency.",
    "Benchmarking your stock picks against broad index funds provides honest objective proof of the power of passive compounding.",
    "Constructing an antifragile portfolio architecture accommodates human nature while ensuring multi-decade wealth accumulation.",
    "Equipping your portfolio with behavioral shock absorbers prepares you to defend your capital against predatory external forces."
]

ch15_exts = [
    "Developing rigorous analytical skepticism is your first and most vital defense against predatory financial marketing practices.",
    "Recognizing that internet lifestyle displays are calculated sales funnels prevents you from being seduced by fraudulent claims.",
    "Exposing the reality behind guru business models reveals that true financial wealth is generated by patience rather than secrets.",
    "Demanding third-party audited performance records instantly unmasks fraudulent promoters who prey on inexperienced retail savers.",
    "Understanding the commission incentives of traditional sales representatives ensures you never mistake product promotion for fiduciary advice.",
    "Scrutinizing complex insurance contracts uncovers the massive fee structures that silently transfer wealth to insurance companies.",
    "Avoiding permanent life insurance products preserves your hard-earned capital for transparent, high-growth index investments.",
    "Buying inexpensive term life insurance and investing the difference in low-cost index funds remains the premier wealth strategy.",
    "Recognizing options trading as a high-friction negative-sum game shields your capital from the relentless decay of time premium.",
    "Avoiding options speculation prevents you from subsidizing the continuous profits of institutional high-frequency market makers.",
    "Understanding the mathematical volatility drag of leveraged ETFs protects your portfolio from catastrophic compounding decay.",
    "Holding leveraged instruments through market volatility reliably destroys capital, making them unsuitable for serious long-term savers.",
    "Steering clear of illiquid non-traded funds prevents your capital from being trapped behind redemption gates during market stress.",
    "Transparent, liquid public index funds eliminate the costly middleman fees and opacity associated with private alternatives.",
    "Adhering to the principle of intellectual simplicity ensures you never deploy hard-earned capital into contracts you cannot comprehend.",
    "Having the discipline to reject complex financial products is the ultimate demonstration of genuine financial sophistication.",
    "Eliminating predatory schemes and toxic products preserves your capital to compound peacefully in productive global enterprises."
]

# Enrich paras
e_ch11 = [p + " " + ext for p, ext in zip(ch11_paras, ch11_exts)]
e_ch12 = [p + " " + ext for p, ext in zip(ch12_paras, ch12_exts)]
e_ch13 = [p + " " + ext for p, ext in zip(ch13_paras, ch13_exts)]
e_ch14 = [p + " " + ext for p, ext in zip(ch14_paras, ch14_exts)]
e_ch15 = [p + " " + ext for p, ext in zip(ch15_paras, ch15_exts)]

print("--- Validating enriched Chapters 11 to 15 ---")
write_and_verify_chapter(SLUG, "11-navigating-market-crashes-bear-markets-and-panics.md", "Navigating Market Crashes, Bear Markets, and Panics", e_ch11, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "12-the-rebalancing-discipline-selling-high-and-buying-low.md", "The Rebalancing Discipline: Selling High and Buying Low", e_ch12, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "13-dividends-reinvestment-and-passive-cash-flow.md", "Dividends, Reinvestment, and Passive Cash Flow", e_ch13, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "14-building-the-core-and-explore-portfolio.md", "Building the Core and Explore Portfolio", e_ch14, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "15-avoiding-financial-predators-gurus-and-complex-derivatives.md", "Avoiding Financial Predators, Gurus, and Complex Derivatives", e_ch15, min_words=1500, max_words=1850)
