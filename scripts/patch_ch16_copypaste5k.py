import re

with open("scripts/author_copypaste5k_ch16_ch20.py", "r", encoding="utf-8") as f:
    text = f.read()

new_ch16_exts = '''ch16_exts = [
    "Transforming client reporting into a strategic ritual of value reinforcement guarantees that corporate decision-makers recognize your continuous commercial contribution to their revenue, profitability, and business growth.",
    "Delivering weekly Loom video dispatches cuts through administrative clutter, commands executive attention, and celebrates verified commercial pipeline revenue across every single active marketing campaign.",
    "Structuring weekly updates around revenue headlines, pipeline breakdowns, and future priorities reinforces your role as an indispensable strategic growth partner and trusted commercial advisor to senior leadership.",
    "Displaying transparent, unvarnished CRM metrics proves that your speed-to-lead software engineering operates with flawless technical reliability, data integrity, and exceptional operational execution speed.",
    "Addressing operational bottlenecks with proactive solutions defends client trust and demonstrates seasoned commercial problem-solving capabilities that keep enterprise accounts healthy, active, and thriving.",
    "Outlining upcoming technical optimizations keeps client focus anchored in forward momentum, preventing complacency, administrative drift, and contract stagnation throughout the entire commercial engagement.",
    "Building undeniable, data-backed case studies provides the supreme commercial weapon for dismantling prospect skepticism and closing future high-ticket accounts with effortless ease and confidence.",
    "Framing case studies through compelling narrative arcs humanizes quantitative metrics, turning dry operational data into persuasive emotional and logical proof that resonates deeply with buyers.",
    "Capturing spontaneous client gratitude through structured five-minute video interviews provides authentic, unvarnished sales social proof that converts skeptical prospects into paying clients effortlessly and rapidly.",
    "Guiding client video interviews with specific diagnostic questions extracts peer-to-peer objection handling that neutralizes prospect hesitation before discovery calls even begin in earnest.",
    "Hearing respected industry peers address price and operational hesitations directly disarms prospective corporate buyers far more effectively than traditional high-pressure commercial sales pitches.",
    "Repackaging case studies into video clips, written dossiers, and social graphics maximizes distribution leverage across your entire outbound prospecting and inbound acquisition flywheel.",
    "Featuring verified client logos and direct practice links establishes unassailable authenticity and separates your agency from dishonest, generic competitors in the broader marketplace.",
    "Injecting verified case study results directly into cold outreach copy immediately doubles reply rates and discovery call booking conversions across your active prospecting pipeline.",
    "Promoting video testimonials across digital dossiers and LinkedIn feeds ignites an inbound authority flywheel that generates passive client inquiries, scheduled appointments, and warm referrals.",
    "Systematizing case study generation converts successful client fulfillment into permanent, compounding marketing assets that fund your agency growth for years and decades to come.",
    "With undeniable proof established, you must now convert one-off setup fees into recurring monthly retainers that provide predictable, sustainable, and compounding monthly cash flow."
]'''

text = re.sub(r'ch16_exts = \[.*?\]', new_ch16_exts, text, flags=re.DOTALL)

with open("scripts/author_copypaste5k_ch16_ch20.py", "w", encoding="utf-8") as f:
    f.write(text)

print("Updated ch16_exts in author_copypaste5k_ch16_ch20.py")
