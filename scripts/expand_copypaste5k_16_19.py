import re

with open("scripts/author_copypaste5k_ch16_ch20.py", "r", encoding="utf-8") as f:
    text = f.read()

new_ch16_exts = '''ch16_exts = [
    "Transforming client reporting into a strategic ritual of value reinforcement guarantees that corporate decision-makers recognize your continuous commercial contribution to their revenue and business growth.",
    "Delivering weekly Loom video dispatches cuts through administrative clutter, commands executive attention, and celebrates verified commercial pipeline revenue across every single active campaign.",
    "Structuring weekly updates around revenue headlines, pipeline breakdowns, and future priorities reinforces your role as an indispensable strategic growth partner and trusted commercial advisor to leadership.",
    "Displaying transparent, unvarnished CRM metrics proves that your speed-to-lead software engineering operates with flawless technical reliability, data integrity, and exceptional operational speed.",
    "Addressing operational bottlenecks with proactive solutions defends client trust and demonstrates seasoned commercial problem-solving capabilities that keep enterprise accounts healthy and thriving.",
    "Outlining upcoming technical optimizations keeps client focus anchored in forward momentum, preventing complacency, administrative drift, and contract stagnation throughout the engagement.",
    "Building undeniable, data-backed case studies provides the supreme commercial weapon for dismantling prospect skepticism and closing future high-ticket accounts with effortless ease.",
    "Framing case studies through compelling narrative arcs humanizes quantitative metrics, turning dry operational data into persuasive emotional and logical proof that resonates with buyers.",
    "Capturing spontaneous client gratitude through structured five-minute video interviews provides authentic, unvarnished sales social proof that converts skeptical prospects into paying clients effortlessly.",
    "Guiding client video interviews with specific diagnostic questions extracts peer-to-peer objection handling that neutralizes prospect hesitation before discovery calls even begin.",
    "Hearing respected industry peers address price and operational hesitations directly disarms prospective corporate buyers far more effectively than traditional high-pressure sales pitches.",
    "Repackaging case studies into video clips, written dossiers, and social graphics maximizes distribution leverage across your entire outbound prospecting and inbound acquisition flywheel.",
    "Featuring verified client logos and direct practice links establishes unassailable authenticity and separates your agency from dishonest, generic competitors in the marketplace.",
    "Injecting verified case study results directly into cold outreach copy immediately doubles reply rates and discovery call booking conversions across your active prospecting pipeline.",
    "Promoting video testimonials across digital dossiers and LinkedIn feeds ignites an inbound authority flywheel that generates passive client inquiries, appointments, and referrals.",
    "Systematizing case study generation converts successful client fulfillment into permanent, compounding marketing assets that fund your agency growth for years and decades to come.",
    "With undeniable proof established, you must now convert one-off setup fees into recurring monthly retainers that provide predictable, sustainable, and compounding cash flow."
]'''

new_ch17_exts = '''ch17_exts = [
    "Escaping the transactional treadmill through monthly recurring retainers provides the financial predictability required to build an enduring agency with stable, growing cash reserves.",
    "Anchoring your service in ongoing operational necessity ensures that clients view your monthly retainer as an essential business utility that they cannot afford to cancel or disconnect.",
    "Deploying the two-tier commercial model captures substantial upfront setup fees while seamlessly initiating ongoing monthly recurring subscriptions that compound predictably over time.",
    "Packaging retainer value around infrastructure management, optimization, database broadcasts, and technical support makes contract cancellation an act of commercial self-sabotage for the client.",
    "Managing platform hosting, SMS carrier compliance, and phone numbers relieves clients of technical headaches, justifying continuous monthly retainer fees without resistance or friction.",
    "Delivering ongoing conversion A/B testing and workflow optimization guarantees that your client's sales pipeline continuously outperforms competitors in local and regional commercial markets.",
    "Executing monthly seasonal database reactivation broadcasts generates recurring revenue spikes for clients without requiring additional advertising spend, external traffic, or manual labor.",
    "Providing rapid priority technical support guarantees gives corporate decision-makers immense peace of mind and defends your agency accounts against unnecessary churn and frustration.",
    "Leading the retainer transition conversation at the three-week mark celebrates early wins and frames ongoing retainers as natural, agreed-upon operational workflows for the business.",
    "Assuming continuity and presenting the retainer as a pre-agreed operational workflow eliminates awkward sales friction and secures effortless subscription renewals month after month.",
    "Deploying the risk inversion frame demonstrates that disconnecting the system risks massive revenue losses that far exceed the modest monthly retainer fee required for service.",
    "Automating recurring monthly credit card charges through Stripe eliminates manual invoice chasing and guarantees predictable cash collection on the first of each business month.",
    "Compounding recurring retainers month over month builds an unshakeable financial baseline that permanently banishes feast-or-famine agency cycles from your entrepreneurial life.",
    "Building a recurring revenue baseline elevates the long-term enterprise valuation of your agency, transforming it into a valuable, sellable commercial asset with deep market moats.",
    "Securing monthly retainers liberates executive bandwidth, allowing you to focus on strategic growth rather than desperate, short-term survival prospecting and manual execution.",
    "Mastering retainer architecture turns every closed client into a compounding, long-term commercial annuity that funds generational wealth, enterprise stability, and agency expansion.",
    "With recurring cash flow secured, you must now activate client referral engines that multiply your client roster without increasing cold outreach spend or ad budget."
]'''

new_ch18_exts = '''ch18_exts = [
    "Building automated referral engines transitions your agency from exhausting cold prospecting into a high-converting inbound commercial powerhouse with immense industry prestige.",
    "Warm executive referrals close at four times the rate of cold leads, eliminate pricing resistance, and stay retained twice as long as transactional, skeptical buyers.",
    "Capitalizing on peak euphoria moments allows you to ask for referrals precisely when client gratitude, excitement, and enthusiasm are at their absolute highest.",
    "Requesting introductions to non-competing colleagues in neighboring cities eliminates the client's fear of empowering local business rivals in their core geographical market.",
    "Providing done-for-you introduction templates removes friction, allowing clients to connect you with peers via a simple copy-paste text, email, or chat message.",
    "Transferring client social trust directly through warm introductions establishes commanding executive credibility before the first diagnostic conversation even begins.",
    "Incentivizing introductions with retainer credits creates a compelling economic motive for clients to actively champion your agency within their professional masterminds and associations.",
    "Forming strategic partnerships with complementary non-competing service providers unlocks instant access to hundreds of qualified corporate buyers without upfront ad spend.",
    "Offering twenty percent recurring revenue shares to agency partners creates an irresistible commercial alliance that generates steady, high-quality client flow every month.",
    "Strategic alliances allow partner firms to expand their service capabilities while feeding your agency pre-sold, high-trust accounts on a predictable monthly basis.",
    "Hosting joint educational webinars with industry software providers positions your agency as the definitive category expert in front of massive, targeted business audiences.",
    "Maintaining transparent partner tracking portals and paying referral commissions promptly cements permanent, multi-year commercial alliances and mutual professional goodwill.",
    "A systematized referral engine creates an inbound gravity well that steadily fills your sales pipeline without increasing outbound ad spend, cold calling, or email outreach.",
    "Transitioning from cold outbound hunting to inbound referral attraction elevates agency prestige and commands premium, non-negotiable market pricing across verticals.",
    "Mastering the referral flywheel ensures that every successful client outcome acts as a self-multiplying commercial catalyst across your chosen industry vertical and market.",
    "Systematizing referral acquisition guarantees that your sales calendar remains permanently full of qualified, pre-sold corporate buyers seeking your specialized guidance.",
    "With client acquisition flywheels compounding, you must now install the financial and tax infrastructure that protects and organizes your capital securely and legally."
]'''

new_ch19_exts = '''ch19_exts = [
    "Systematic cash flow management, banking discipline, and tax planning transform early revenue into enduring, generational wealth and unshakeable commercial security for founders.",
    "Maintaining an unbreachable separation between business revenues and personal spending defends limited liability protection and ensures pristine corporate accounting hygiene.",
    "Forming a formal limited liability company legally insulates your personal home, vehicle, and savings from commercial disputes, debts, and unexpected operational liabilities.",
    "Utilizing modern digital business banking platforms allows granular sub-account allocations and seamless cloud accounting software integrations for real-time financial tracking.",
    "Applying the Profit First framework forces an agency to operate with extreme fiscal discipline by reserving profit before allocating allowable operating expenses and overhead.",
    "Allocating revenues bi-weekly across dedicated income, tax, profit, fulfillment, and operating accounts eliminates financial chaos, anxiety, and year-end panic permanently.",
    "Reserving thirty percent of all collected revenues for taxes transforms terrifying annual tax bills into routine, stress-free administrative transfers that take minutes.",
    "Accumulating a six-month operating expense cash reserve provides the financial staying power needed to navigate unforeseen market volatility with total calm and confidence.",
    "Sequestering fulfillment capital in dedicated accounts guarantees that subcontractors are paid immediately, preserving contractor loyalty, trust, and priority turnaround on projects.",
    "Capping operating overhead at thirty percent prevents the insidious creep of vanity software subscriptions and preserves high net profit margins across consecutive quarters.",
    "Understanding merchant processor risk algorithms allows you to avoid sudden account freezes and protect your incoming cash flow from unnecessary administrative holds or audits.",
    "Proactively communicating with payment underwriters and providing verified client contracts maintains high merchant account trust, stability, and uninterrupted processing volume.",
    "Establishing redundant payment collection options via ACH bank transfers and domestic wires prevents single-platform dependency vulnerabilities across all corporate operations.",
    "Automating cloud bookkeeping through QuickBooks or Xero provides real-time visibility over net profit margins and monthly balance sheets without manual data entry headaches.",
    "Tracking legitimate business deductions systematically lowers your annual corporate tax liability, leaving more investment capital inside your growing enterprise accounts.",
    "Disciplined financial stewardship provides the unshakeable foundation required to scale your business safely toward twenty thousand dollars per month without panic.",
    "With your financial fortress secured, you are now prepared to scale your agency from five thousand to twenty thousand dollars in monthly recurring revenue."
]'''

text = re.sub(r'ch16_exts = \[.*?\]', new_ch16_exts, text, flags=re.DOTALL)
text = re.sub(r'ch17_exts = \[.*?\]', new_ch17_exts, text, flags=re.DOTALL)
text = re.sub(r'ch18_exts = \[.*?\]', new_ch18_exts, text, flags=re.DOTALL)
text = re.sub(r'ch19_exts = \[.*?\]', new_ch19_exts, text, flags=re.DOTALL)

with open("scripts/author_copypaste5k_ch16_ch20.py", "w", encoding="utf-8") as f:
    f.write(text)

print("Updated author_copypaste5k_ch16_ch20.py with final expanded extensions")
