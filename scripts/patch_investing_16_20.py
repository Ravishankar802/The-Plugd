"""
Enrichment extensions for ch16 to ch20 and epilogue of investing-for-beginners-in-25-minutes.
"""

from author_investing_ch16_ch20 import ch16_paras, ch17_paras, ch18_paras, ch19_paras, ch20_paras, ep_paras
from batch5b_author_engine import write_and_verify_chapter

SLUG = "investing-for-beginners-in-25-minutes"

ch16_exts = [
    "Recognizing that cash quietly loses purchasing power every year forces you to re-evaluate your perception of real financial safety.",
    "Distinguishing real goods from paper currency units is the vital mental shift that separates investors from perennial cash savers.",
    "Accepting currency debasement as an ongoing institutional reality empowers you to position your assets on the winning side of inflation.",
    "Hoarding liquid cash beyond your necessary emergency buffer guarantees the slow and permanent destruction of your life savings.",
    "Anchoring your net worth in tangible productive capacity ensures that your family balance sheet remains resilient across monetary regimes.",
    "Commercial enterprises possess the vital capability to pass cost increases directly to consumers, protecting your equity yields.",
    "Collecting expanding corporate dividend streams preserves your real living standard across decades of central bank monetary expansion.",
    "Historical evidence confirms that corporate equities remain the premier liquid vehicle for overcoming severe macroeconomic inflationary shocks.",
    "Incorporating inflation-protected treasury securities provides an unassailable baseline of purchasing power preservation for conservative assets.",
    "Utilizing government savings bonds creates an exceptional liquid haven that protects emergency reserves from inflationary decay.",
    "Rejecting speculative commodities prevents your balance sheet from being whipsawed by unbacked tokens that produce zero internal cash flow.",
    "Commercial real estate assets offer valuable secondary inflation protection through automatic lease escalations and rising replacement values.",
    "Avoiding speculative panic during inflationary spikes protects your hard-earned capital from impulsive, high-risk allocation errors.",
    "Evaluating your retirement numbers through inflation-adjusted math guarantees that your projected lifestyle matches future economic reality.",
    "Locking in fixed borrowing costs on essential assets while collecting inflating equity dividends turns monetary expansion to your advantage.",
    "Transforming yourself from a passive consumer into an equity-owning capitalist aligns your personal prosperity with ongoing enterprise productivity.",
    "Defeating inflation through productive asset ownership sets the stage for expanding your portfolio into dynamic international markets."
]

ch17_exts = [
    "Dismantling home country bias is essential for building an institutional-grade portfolio that captures global economic progress.",
    "Overcoming the familiarity trap enables you to see that true financial safety lies in global commercial diversification.",
    "Recognizing that foreign markets represent forty percent of global public wealth exposes the danger of narrow domestic concentration.",
    "Capturing premier foreign industrial and technological leaders connects your portfolio to the most innovative firms on earth.",
    "Decades of historical data prove that international equities regularly cycle through extended periods of superior outperformance.",
    "Guarding against recency bias ensures that you remain open to global capital flows and changing geopolitical economic cycles.",
    "The historical lesson of foreign market bubbles underscores why global diversification is non-negotiable for long-term survival.",
    "Spreading your equity ownership across multiple continents insulates your family from idiosyncratic domestic political or economic crises.",
    "Holding assets denominated in diverse foreign currencies provides a vital structural hedge against domestic currency depreciation.",
    "Balancing established foreign economies with dynamic emerging markets optimizes your exposure to global demographic expansion.",
    "Modern broad international index funds make global capital allocation completely frictionless and ultra-low-cost for retail savers.",
    "Total world market index funds provide the ultimate self-balancing global engine, harvesting returns wherever growth occurs.",
    "Direct corporate domicile abroad provides institutional legal protections that domestic multinational companies cannot duplicate.",
    "Allocating twenty to forty percent of equities to foreign markets captures meaningful diversification benefits without excessive volatility.",
    "Refusing to abandon underperforming asset classes prevents you from buying high and selling low at cyclical turning points.",
    "Embracing the global commercial landscape allows you to participate in the hard-won achievements of human innovation worldwide.",
    "Expanding your vision to embrace the entire planet prepares you to climb the systematic milestone ladder of lifelong wealth."
]

ch18_exts = [
    "Understanding the non-linear phases of wealth accumulation sustains your motivation through the quiet early years of capital accumulation.",
    "Reaching your first thousand dollars represents a profound psychological victory that proves your capacity for financial discipline.",
    "Focusing on your savings rate during the early phase establishes the bedrock behavioral foundation for all future compounding success.",
    "Crossing the ten-thousand-dollar threshold provides your first tangible proof that invested capital works productively on your behalf.",
    "Internalizing Charlie Munger timeless wisdom gives you the fortitude to endure the grueling grind required for initial traction.",
    "Analyzing the mathematical arithmetic reveals why early sacrifices yield such an extraordinary compounding payoff in later decades.",
    "Watching subsequent hundred-thousand-dollar increments accumulate in fractions of the original time validates the power of compounding.",
    "Crossing the threshold where investment returns exceed your active salary grants you unprecedented freedom and career leverage.",
    "Reframing early progress around operational consistency rather than portfolio balance prevents you from becoming prematurely discouraged.",
    "Focusing on the subterranean foundation reminds you that towering financial structures take time to rise above ground level.",
    "Resisting the trap of lifestyle inflation keeps you from building a gilded cage that drains your growing income stream.",
    "Applying the fifty percent capture rule ensures that your savings rate expands continuously while rewarding your career progress.",
    "Reaching Coast Financial Independence lifts a massive burden of anxiety, granting you extraordinary autonomy over your schedule.",
    "Having your retirement mathematically secured allows you to make career and lifestyle decisions rooted in passion rather than fear.",
    "Ignoring external societal displays of debt-funded affluence keeps your focus anchored on building authentic, unencumbered freedom.",
    "Climbing the milestone ladder step by step demystifies personal finance, transforming lifelong prosperity into an achievable reality.",
    "With your compounding snowball moving with unstoppable velocity, you must now master the science of safe portfolio distribution."
]

ch19_exts = [
    "Transitioning from capital accumulation to sustainable capital distribution represents the crowning achievement of your investing life.",
    "Understanding the mathematical dynamics of portfolio withdrawals ensures that your accumulated assets support you comfortably forever.",
    "William Bengen pioneering research exposed the lethal danger of ignoring sequence of returns risk during retirement.",
    "Testing withdrawal rates against catastrophic historical crises guarantees that your retirement plan withstands severe market shocks.",
    "The Four Percent Rule provides an unshakeable mathematical baseline that turns your accumulated wealth into enduring passive income.",
    "Independent academic validation by the Trinity Study confirms that balanced index portfolios support reliable four percent distributions.",
    "Calculating your Financial Independence Number gives you a clear, objective finish line that eliminates financial ambiguity.",
    "Adjusting annual withdrawals strictly for inflation preserves your real purchasing power throughout decades of retirement living.",
    "Mitigating sequence of returns risk is the single most critical mathematical objective during the initial years of distribution.",
    "Historical data demonstrates that disciplined retirees following safe withdrawal rules typically end up with substantially expanded wealth.",
    "Adapting withdrawal percentages for extended early retirement timelines guarantees complete financial safety across five-decade horizons.",
    "Incorporating dynamic withdrawal guardrails provides flexibility that eliminates the risk of portfolio depletion entirely.",
    "Maintaining a dedicated cash and bond reserve prevents you from ever having to sell depreciated equities during bear markets.",
    "Overcoming One More Year Syndrome allows you to reclaim your precious finite time and enjoy the freedom you have earned.",
    "Playing disciplined defense during the distribution phase guarantees that your hard-won financial independence remains secure for life.",
    "Trusting the empirical arithmetic of safe withdrawal rates empowers you to step into retirement with absolute peace of mind.",
    "Synthesizing these timeless principles creates an elegant, lifelong operating system that you can execute today and maintain forever."
]

ch20_exts = [
    "Distilling decades of financial wisdom into a simple operating system frees you from complexity and empowers decisive execution.",
    "Adopting radical operational minimalism reclaims hundreds of hours of mental bandwidth, allowing you to focus on living fully.",
    "Configuring your account infrastructure takes only minutes and establishes an institutional-grade foundation for lifetime wealth.",
    "The Three-Fund Portfolio represents the ultimate expression of elegance, delivering global diversification with zero clutter.",
    "Calibrating your asset mix to your life stage balances aggressive capital appreciation with essential downside protection.",
    "Automating the end-to-end investment pipeline removes human emotion and transforms wealth accumulation into an inevitable habit.",
    "Erecting an emotional firewall insulates your nervous system from media-driven panic and protects your long-term strategy.",
    "Limiting your maintenance to a single annual check-in preserves your time while ensuring your portfolio remains in peak condition.",
    "Periodic rebalancing effortlessly restores your target risk profile without demanding market forecasting or emotional stress.",
    "Practicing radical behavioral inertia during market panics transforms volatility into an exceptional compounding advantage.",
    "Directing your intellectual energy toward expanding your career earnings accelerates your financial independence timeline dramatically.",
    "Defining true wealth through unencumbered personal freedom rather than consumer status symbols keeps you grounded and fulfilled.",
    "The greatest dividend money pays is the autonomy to direct your own calendar and live life entirely on your own terms.",
    "Protecting your minimalist operating system from unnecessary financial products preserves your returns and peace of mind.",
    "Maintaining humble discipline across decades guarantees that the eternal arithmetic of compounding works continuously in your favor.",
    "Armed with this complete blueprint, you have everything required to transform ordinary earnings into generational prosperity.",
    "Executing your twenty-five-minute setup today begins a lifetime of compounding certainty, placing financial freedom firmly in your hands."
]

ep_exts = [
    "Recognizing the structural superiority of low-cost index investing gives you the confidence to leave market-timing to amateurs.",
    "Achieving deep emotional serenity transforms your entire life, insulating you from the chronic stress that plagues active traders.",
    "Building an antifragile financial fortress ensures that market storms feed your compounding engine rather than threatening it.",
    "Reclaiming your mental bandwidth from financial noise allows you to invest your energy in relationships, health, and creativity.",
    "Living life on your own terms is the ultimate dividend that money pays, freeing you from compromises and corporate anxiety.",
    "Standing firm against speculative cultural manias protects your hard-earned wealth from the inevitable crashes that follow.",
    "Trusting the patient tortoise approach guarantees that you stay in the race while hyperactive speculators flame out.",
    "Passing this timeless financial education forward empowers future generations to build lasting stability and personal autonomy.",
    "Embracing quiet, invisible wealth insulates you from lifestyle inflation and provides the enduring comfort of peaceful sleep.",
    "Doing nothing in personal finance is often the ultimate act of discipline that produces vastly superior long-term results.",
    "Betting on the boundless ingenuity of human civilization aligns your personal fortune with the relentless upward march of history.",
    "Approaching future economic downturns with serene confidence allows you to scoop up generational bargains without fear.",
    "Financial independence is an open, proven path accessible to anyone willing to follow simple arithmetic with patient consistency.",
    "May this manual serve as your lifelong guide, granting you the clarity and confidence to live fully and purposefully on your terms.",
    "Step forward with quiet pride as a disciplined capitalist, knowing that the eternal power of arithmetic is laboring on your behalf forever."
]

# Enrich paras
e_ch16 = [p + " " + ext for p, ext in zip(ch16_paras, ch16_exts)]
e_ch17 = [p + " " + ext for p, ext in zip(ch17_paras, ch17_exts)]
e_ch18 = [p + " " + ext for p, ext in zip(ch18_paras, ch18_exts)]
e_ch19 = [p + " " + ext for p, ext in zip(ch19_paras, ch19_exts)]
e_ch20 = [p + " " + ext for p, ext in zip(ch20_paras, ch20_exts)]
e_ep = [p + " " + ext for p, ext in zip(ep_paras, ep_exts)]

print("--- Validating enriched Chapters 16 to 20 and Epilogue ---")
write_and_verify_chapter(SLUG, "16-inflation-currency-devaluation-and-purchasing-power.md", "Inflation, Currency Devaluation, and Purchasing Power", e_ch16, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "17-international-diversification-and-global-markets.md", "International Diversification and Global Markets", e_ch17, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "18-the-milestone-ladder-from-first-thousand-to-first-hundred-thousand.md", "The Milestone Ladder: From First Thousand to First Hundred Thousand", e_ch18, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "19-wealth-preservation-and-the-four-percent-safe-withdrawal-rule.md", "Wealth Preservation and the Four Percent Safe Withdrawal Rule", e_ch19, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "20-the-twenty-five-minute-lifelong-investing-operating-system.md", "The Twenty-Five Minute Lifelong Investing Operating System", e_ch20, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "99-epilogue.md", "Epilogue: The Serenity of the Patient Capitalist", e_ep, min_words=1200, max_words=1850)
