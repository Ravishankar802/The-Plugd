import re
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from batch5b_author_engine import write_and_verify_chapter, clean_paragraph

SLUG = "copy-paste-this-strategy-to-make-your-first-5-000-online"

with open("scripts/author_copypaste5k_ch16_ch20.py", "r", encoding="utf-8") as f:
    text = f.read()

# Add 17th paragraph to ch18_base if it has 16
target_ch18 = '"Mastering the referral flywheel transitions your agency from an active hunter tracking down prey to an established commercial destination sought out by the elite operators of your industry. You build a self-sustaining client acquisition machine that expands effortlessly with every successful outcome you deliver.",'
extra_ch18 = '"Building this referral infrastructure transforms client success into your greatest marketing asset, ensuring that your calendar remains permanently filled with qualified, high-trust buyers who actively seek out your specialized expertise.",'

if target_ch18 in text and extra_ch18 not in text:
    text = text.replace(target_ch18, target_ch18 + '\n    ' + extra_ch18)
    print("Added 17th para to ch18_base")

new_ch16_exts = '''ch16_exts = [
    "Transforming client reporting into a strategic ritual of value reinforcement guarantees that corporate decision-makers recognize your continuous commercial contribution to their revenue.",
    "Delivering weekly Loom video dispatches cuts through administrative clutter, commands executive attention, and celebrates verified commercial pipeline revenue across every campaign.",
    "Structuring weekly updates around revenue headlines, pipeline breakdowns, and future priorities reinforces your role as an indispensable strategic growth partner and trusted advisor.",
    "Displaying transparent, unvarnished CRM metrics proves that your speed-to-lead software engineering operates with flawless technical reliability and exceptional speed.",
    "Addressing operational bottlenecks with proactive solutions defends client trust and demonstrates seasoned commercial problem-solving capabilities that keep accounts healthy.",
    "Outlining upcoming technical optimizations keeps client focus anchored in forward momentum, preventing complacency, administrative drift, and contract stagnation.",
    "Building undeniable, data-backed case studies provides the supreme commercial weapon for dismantling skepticism and closing future high-ticket accounts with ease.",
    "Framing case studies through compelling narrative arcs humanizes quantitative metrics, turning dry data into persuasive emotional and logical proof that resonates.",
    "Capturing spontaneous client gratitude through structured five-minute video interviews provides authentic, unvarnished sales social proof that converts prospects effortlessly.",
    "Guiding client video interviews with specific diagnostic questions extracts peer-to-peer objection handling that neutralizes prospect hesitation before discovery calls begin.",
    "Hearing respected industry peers address price and operational hesitations directly disarms prospective buyers far more effectively than traditional sales pitches.",
    "Repackaging case studies into video clips, written dossiers, and social graphics maximizes distribution leverage across your entire outbound and inbound acquisition flywheel.",
    "Featuring verified client logos and direct practice links establishes unassailable authenticity and separates your agency from dishonest, generic competitors.",
    "Injecting verified case study results directly into cold outreach copy immediately doubles reply rates and discovery call booking conversions across your pipeline.",
    "Promoting video testimonials across digital dossiers and LinkedIn feeds ignites an inbound authority flywheel that generates passive client inquiries and referrals.",
    "Systematizing case study generation converts successful client fulfillment into permanent, compounding marketing assets that fund your agency growth for decades.",
    "With undeniable proof established, you must now convert one-off setup fees into recurring monthly retainers that provide predictable, sustainable cash flow."
]'''

new_ch17_exts = '''ch17_exts = [
    "Escaping the transactional treadmill through monthly recurring retainers provides the financial predictability required to build an enduring agency with stable cash reserves.",
    "Anchoring your service in ongoing operational necessity ensures that clients view your monthly retainer as an essential business utility that they cannot afford to cancel.",
    "Deploying the two-tier commercial model captures substantial upfront setup fees while seamlessly initiating ongoing monthly recurring subscriptions that compound over time.",
    "Packaging retainer value around infrastructure management, optimization, database broadcasts, and technical support makes contract cancellation an act of commercial self-sabotage.",
    "Managing platform hosting, SMS carrier compliance, and phone numbers relieves clients of technical headaches, justifying continuous monthly retainer fees without resistance.",
    "Delivering ongoing conversion A/B testing and workflow optimization guarantees that your client's sales pipeline continuously outperforms competitors in local commercial markets.",
    "Executing monthly seasonal database reactivation broadcasts generates recurring revenue spikes for clients without requiring additional advertising spend or manual labor.",
    "Providing rapid priority technical support guarantees gives corporate decision-makers immense peace of mind and defends your agency accounts against unnecessary churn.",
    "Leading the retainer transition conversation at the three-week mark celebrates early wins and frames ongoing retainers as natural, agreed-upon operational workflows.",
    "Assuming continuity and presenting the retainer as a pre-agreed operational workflow eliminates awkward sales friction and secures effortless subscription renewals.",
    "Deploying the risk inversion frame demonstrates that disconnecting the system risks massive revenue losses that far exceed the modest monthly retainer fee.",
    "Automating recurring monthly credit card charges through Stripe eliminates manual invoice chasing and guarantees predictable cash collection on the first of each month.",
    "Compounding recurring retainers month over month builds an unshakeable financial baseline that permanently banishes feast-or-famine agency cycles from your life.",
    "Building a recurring revenue baseline elevates the long-term enterprise valuation of your agency, transforming it into a valuable, sellable commercial asset.",
    "Securing monthly retainers liberates executive bandwidth, allowing you to focus on strategic growth rather than desperate, short-term survival prospecting.",
    "Mastering retainer architecture turns every closed client into a compounding, long-term commercial annuity that funds generational wealth and agency expansion.",
    "With recurring cash flow secured, you must now activate client referral engines that multiply your client roster without increasing cold outreach spend."
]'''

new_ch18_exts = '''ch18_exts = [
    "Building automated referral engines transitions your agency from exhausting cold prospecting into a high-converting inbound commercial powerhouse with immense prestige.",
    "Warm executive referrals close at four times the rate of cold leads, eliminate pricing resistance, and stay retained twice as long as transactional buyers.",
    "Capitalizing on peak euphoria moments allows you to ask for referrals precisely when client gratitude and enthusiasm are at their absolute highest.",
    "Requesting introductions to non-competing colleagues in neighboring cities eliminates the client's fear of empowering local business rivals in their core market.",
    "Providing done-for-you introduction templates removes friction, allowing clients to connect you with peers via a simple copy-paste text or email message.",
    "Transferring client social trust directly through warm introductions establishes commanding executive credibility before the first diagnostic conversation begins.",
    "Incentivizing introductions with retainer credits creates a compelling economic motive for clients to actively champion your agency within their professional masterminds.",
    "Forming strategic partnerships with complementary non-competing service providers unlocks instant access to hundreds of qualified corporate buyers without ad spend.",
    "Offering twenty percent recurring revenue shares to agency partners creates an irresistible commercial alliance that generates steady, high-quality client flow.",
    "Strategic alliances allow partner firms to expand their service capabilities while feeding your agency pre-sold, high-trust accounts on a monthly basis.",
    "Hosting joint educational webinars with industry software providers positions your agency as the definitive category expert in front of massive target audiences.",
    "Maintaining transparent partner tracking portals and paying referral commissions promptly cements permanent, multi-year commercial alliances and mutual goodwill.",
    "A systematized referral engine creates an inbound gravity well that steadily fills your sales pipeline without increasing outbound ad spend or cold outreach.",
    "Transitioning from cold outbound hunting to inbound referral attraction elevates agency prestige and commands premium, non-negotiable market pricing.",
    "Mastering the referral flywheel ensures that every successful client outcome acts as a self-multiplying commercial catalyst across your chosen industry vertical.",
    "Systematizing referral acquisition guarantees that your sales calendar remains permanently full of qualified, pre-sold corporate buyers seeking your guidance.",
    "With client acquisition flywheels compounding, you must now install the financial and tax infrastructure that protects and organizes your capital securely."
]'''

new_ch19_exts = '''ch19_exts = [
    "Systematic cash flow management, banking discipline, and tax planning transform early revenue into enduring, generational wealth and unshakeable commercial security.",
    "Maintaining an unbreachable separation between business revenues and personal spending defends limited liability protection and ensures pristine corporate hygiene.",
    "Forming a formal limited liability company legally insulates your personal home and assets from commercial disputes, debts, and operational liabilities.",
    "Utilizing modern digital business banking platforms allows granular sub-account allocations and seamless cloud accounting software integrations for real-time tracking.",
    "Applying the Profit First framework forces an agency to operate with extreme fiscal discipline by reserving profit before allocating allowable operating expenses.",
    "Allocating revenues bi-weekly across dedicated income, tax, profit, fulfillment, and operating accounts eliminates financial chaos and panic permanently.",
    "Reserving thirty percent of all collected revenues for taxes transforms terrifying annual tax bills into routine, stress-free administrative transfers.",
    "Accumulating a six-month operating expense cash reserve provides the financial staying power needed to navigate unforeseen market volatility with total calm.",
    "Sequestering fulfillment capital in dedicated accounts guarantees that subcontractors are paid immediately, preserving contractor loyalty, trust, and priority turnaround.",
    "Capping operating overhead at thirty percent prevents the insidious creep of vanity software subscriptions and preserves high net profit margins across quarters.",
    "Understanding merchant processor risk algorithms allows you to avoid sudden account freezes and protect your incoming cash flow from unnecessary administrative holds.",
    "Proactively communicating with payment underwriters and providing verified client contracts maintains high merchant account trust, stability, and processing volume.",
    "Establishing redundant payment collection options via ACH bank transfers and domestic wires prevents single-platform dependency vulnerabilities across operations.",
    "Automating cloud bookkeeping through QuickBooks or Xero provides real-time visibility over net profit margins and monthly balance sheets without manual data entry.",
    "Tracking legitimate business deductions systematically lowers your annual corporate tax liability, leaving more investment capital inside your enterprise accounts.",
    "Disciplined financial stewardship provides the unshakeable foundation required to scale your business safely toward twenty thousand dollars per month.",
    "With your financial fortress secured, you are now prepared to scale your agency from five thousand to twenty thousand dollars in monthly recurring revenue."
]'''

new_ch20_exts = '''ch20_exts = [
    "Scaling from five thousand to twenty thousand dollars monthly requires architectural elevation, systematic pricing increases, and strategic team orchestration.",
    "Escalating contract pricing based on verified case studies halves the number of clients required while doubling net enterprise profitability and cash flow.",
    "Closing higher-ticket contracts requires the exact same sales call duration while attracting higher-respect, low-maintenance commercial partners who value outcomes.",
    "Transitioning from solo tactical execution to executive management orchestration breaks founder bottlenecks and unlocks exponential agency growth and leverage.",
    "Delegating lead prospecting and data verification to dedicated specialists frees precious founder bandwidth for high-stakes closing conversations and strategic direction.",
    "Expanding your secondary domain sending fleet and social selling activities permanently fills your calendar with qualified discovery calls across market verticals.",
    "Deploying paid video ads featuring authentic client testimonials transforms your acquisition pipeline into an automated inbound growth engine with high ROI.",
    "Implementing rigorous client retention protocols minimizes churn and allows recurring monthly retainers to compound predictably over time into substantial wealth.",
    "Offering complementary backend upsells and workflow expansions multiplies customer lifetime value without incurring new customer acquisition costs or friction.",
    "Protecting morning strategic blocks from reactive administrative trivia preserves the executive focus required to steer enterprise scaling and operational dominance.",
    "Sunsetting low-margin, high-maintenance legacy clients liberates valuable operational capacity to service elite high-ticket accounts that respect your time.",
    "Institutionalizing a culture of radical ownership and rapid execution ensures that your high standards are upheld as headcount expands across departments.",
    "Developing a generational enterprise vision elevates your leadership and transforms your agency into an enduring commercial institution with deep market moats.",
    "Reflecting on milestone breakthroughs with grounded humility fuels sustained ambition and prepares you to conquer subsequent commercial summits with poise.",
    "Mastering the architecture of twenty-thousand-dollar months cements your financial independence and proves your total mastery of the digital economy.",
    "The complete tactical manual for high-ticket service arbitrage is in your hands; now execute with relentless discipline and build your commercial empire.",
    "The culmination of this journey is explored in the epilogue: the architecture of true self-reliance and the enduring freedom of independent enterprise."
]'''

# Enriched Epilogue (15 paragraphs, ~1250-1350 words, each ~85 words)
new_epilogue = '''epilogue_paras = [
    "In the quiet stillness that follows the receipt of your first high-ticket client deposit, a profound and permanent psychological shift occurs within your mind. The corporate fog that conditioned you to believe that survival requires an employer, a monthly salary, and a designated cubicle dissolves completely into thin air. You look at your bank account, you look at your laptop, and you realize the exhilarating, terrifying truth: you are free. You possess the capability to extract capital from the global economy at will, through the power of your own intellect, courage, disciplined execution, commercial clarity, and unyielding personal determination. Stepping out of the employee mindset transforms your daily reality into an unconstrained landscape of boundless creative opportunity.",

    "True self-reliance is not merely an economic metric; it is an unshakeable psychological state of total independence and internal mastery. It is the deep, quiet knowledge that no matter what macroeconomic storms sweep the globe, no matter how many corporate layoffs occur, and no matter what technological disruptions reshape industries, you will always thrive. You know how to diagnose expensive problems, you know how to build high-value solutions, and you know how to command the room and close contracts. You have become an antifragile commercial producer who commands their own destiny with unyielding poise. Internal mastery and commercial competence ensure that you remain completely impervious to corporate layoffs and macroeconomic turbulence.",

    "The journey to making your first five thousand dollars online was never truly about the five thousand dollars. Five thousand dollars is simply paper capital that will be spent, invested, and circulated through the global economic machine. The true, irreplaceable prize was who you had to become in order to earn it. You had to confront and dismantle your deepest insecurities, conquer the paralyzing fear of cold rejection, master the discipline of waking up every day to execute without a boss watching over your shoulder, and develop the emotional poise of an executive leader. The profound character transformation forged through entrepreneurship represents an asset far more valuable than the financial profits you collect.",

    "Most human beings live their entire lives in the safe, quiet desperation of dependency. They surrender their autonomy, their creative potential, and their precious finite hours on earth to corporate institutions that view them as disposable line items on an expense sheet. When economic winds shift, they are cast aside without hesitation, left vulnerable, anxious, and unprepared. By choosing the harder path of independent enterprise, you stepped out of that passive herd and took absolute ownership of your life, your livelihood, and your family's future. Taking complete ownership of your economic destiny liberates your family from the chronic anxiety of institutional dependency.",

    "Remember the early days of this campaign: the skepticism of friends who told you it was impossible, the silent terror of sending your first hundred cold outreach messages, the awkward stumbles on your first discovery calls, and the temptation to quit when early prospects ghosted your follow-ups. Those painful friction points were not obstacles in your way; they were the way. They were the exact crucibles required to burn away amateur hesitation and forge the hardened character of a true commercial operator who fears nothing. Embracing early cold outreach friction and awkward discovery calls forges the hardened resilience of a seasoned commercial producer.",

    "As you scale your service enterprise to ten thousand, twenty thousand, and fifty thousand dollars per month, you will be tempted by the insidious whisper of corporate complacency. You will want to relax your standards, stop prospecting, outsource your core values, and drift into comfortable executive luxury. Resist that temptation with every fiber of your being. The marketplace is an unforgiving arena of creative destruction; the moment you stop innovating, stop prospecting, and stop obsessing over client results, decline is already underway. Maintaining relentless outbound prospecting discipline even after achieving success protects your enterprise from the subtle rot of complacency.",

    "Treat your clients not as transactional stepping stones to personal wealth, but as noble partners whose trust you must earn and defend every single day. When a business owner pays you thousands of dollars, they are placing their faith, their employee livelihoods, and their commercial aspirations into your hands. Honor that responsibility with uncompromising integrity, relentless work ethic, and world-class operational excellence. When you make your clients wealthy, your own wealth becomes an inevitable downstream byproduct of the immense value you create. Treating client accounts as sacred commercial trusts ensures that your reputation as an elite producer spreads rapidly across the industry.",

    "Cultivate a deep, abiding stewardship over the capital you generate. Money is an amplifier of character; if you use your early profits to fuel superficial vanity, luxury consumer toys, and performative social media status, you will remain an emotional prisoner of commerce. Use your capital to purchase freedom: funding deep emergency reserves, acquiring cash-flowing assets, investing in your continuous intellectual education, and building a financial fortress that shields your family from external storms and economic crises. Deploying profits to purchase lasting freedom rather than transient luxury goods provides the foundation for generational wealth creation.",

    "Share the architecture of self-reliance with those who are ready to hear it. The world is full of talented, hard-working individuals trapped in the suffocating cage of corporate employment, desperate for a blueprint that shows them how to claim their independence. Be the mentor, the beacon of possibility, and the honest guide who demystifies the mechanics of digital business, proving that financial freedom is not a lottery ticket, but an engineered science of relentless discipline. Guiding aspiring operators to achieve financial independence spreads the life-changing power of digital self-reliance across the world.",

    "Never forget the foundational daily rituals that built your enterprise: the early morning focus blocks, the disciplined data scraping, the relentless follow-up sequences, the clinical discovery calls, and the commitment to delivering rapid quick wins. Consistency is the ultimate commercial superpower. When you execute the fundamentals with unbroken consistency across years, your compounding advantage becomes completely insurmountable to competitors who rely on sporadic inspiration and undisciplined bursts of effort. Decade-long consistency in executing basic commercial fundamentals builds an insurmountable competitive moat that no rival can overcome.",

    "Embrace the beauty of the struggle. The life of an independent entrepreneur is not a smooth, frictionless paradise; it is a life of continuous problem-solving, high-stakes decisions, and creative tension. Learn to love the friction. When a client challenges a proposal, when software webhooks fail, or when a campaign underperforms, smile and lean into the challenge. These are the crucibles that keep you sharp, alive, dangerous, resilient, and thriving in the commercial arena. Viewing operational challenges and client negotiations as noble crucibles keeps your strategic instincts sharp, dangerous, and thriving.",

    "You now possess the complete, end-to-end tactical playbook for high-ticket B2B service arbitrage. You know how to identify lucrative niches, engineer grand slam offers, build conversion dossiers, prospect verified leads, secure inboxes, draft persuasive copy, command discovery calls, close contracts, collect upfront deposits, orchestrate fulfillment, report results, convert retainers, and scale to multi-five-figure months with absolute operational certainty. Mastering the full lifecycle of B2B service arbitrage equips you with an enduring commercial superpower that lasts for life.",

    "Knowledge without execution is the ultimate form of entrepreneurial tragedy. The blueprints in this book are worthless if they remain trapped as ink on paper or pixels on a screen. They only come alive when you open your browser, scrape your first lead list, draft your first campaign, and pick up the phone to lead a discovery call. The market does not reward spectators; it rewards the brave operators who dare to enter the arena and execute with relentless conviction. Transforming strategic knowledge into live client conversations bridges the gap between idle daydreaming and massive commercial wealth.",

    "To the aspiring operator reading these words, standing on the threshold of your first five thousand dollars online: your time has come. Silence the doubts, ignore the cynics, take radical ownership of your future, and execute the playbook with savage consistency. Your first five thousand dollars is waiting in the marketplace, ready to be claimed through your disciplined labor, intelligence, and grit. Taking bold, immediate action in the marketplace separates the true commercial vanguard from the passive crowd of observers.",

    "Step into the arena, execute the strategy, claim your independence, and build the life of unyielding freedom you were born to live. The mission is yours. Now, go win. The commercial arena belongs to those who dare to execute with unyielding conviction, integrity, and relentless daily momentum."
]'''

text = re.sub(r'ch16_exts = \[.*?\]', new_ch16_exts, text, flags=re.DOTALL)
text = re.sub(r'ch17_exts = \[.*?\]', new_ch17_exts, text, flags=re.DOTALL)
text = re.sub(r'ch18_exts = \[.*?\]', new_ch18_exts, text, flags=re.DOTALL)
text = re.sub(r'ch19_exts = \[.*?\]', new_ch19_exts, text, flags=re.DOTALL)
text = re.sub(r'ch20_exts = \[.*?\]', new_ch20_exts, text, flags=re.DOTALL)
text = re.sub(r'epilogue_paras = \[.*?\]', new_epilogue, text, flags=re.DOTALL)

with open("scripts/author_copypaste5k_ch16_ch20.py", "w", encoding="utf-8") as f:
    f.write(text)

print("Updated author_copypaste5k_ch16_ch20.py with enriched extensions")
