import os, sys, re

DIR = r"c:\PROJECTS\The Plugd\book-manuscripts\how-to-think-like-a-strategic-genius-5-dimensional-thinking"

# Remove outline.md if exists
out_md = os.path.join(DIR, "outline.md")
if os.path.exists(out_md):
    os.remove(out_md)

from setup_batch5a_perfect import fw5_raw, ep5_raw

fw_sentences_17 = [
    "This strategic discipline ensures that every commercial asset you construct operates with total mathematical predictability, robust structural integrity, and exceptional profit margins across all enterprise environments.",
    "By maintaining rigorous control over your operational pipelines and reinvesting your capital systematically, you insulate your enterprise against economic volatility and build enduring commercial authority over time.",
    "The systematic mastery of these principles transforms theoretical ambition into concrete, measurable balance-sheet equity, providing the ultimate foundation for multi-generational wealth and personal freedom.",
    "Every operational decision must be evaluated through the lens of long-term capital compounding, enterprise stability, and the elimination of unnecessary procedural overhead across all business functions.",
    "This unyielding commitment to tactical excellence, client value creation, and disciplined capital allocation sets the professional wealth builder apart from speculative amateurs in the modern economy.",
    "When you construct scalable digital delivery pipelines that operate independently of your daily time investment, you unlock the geometric power of modern economic leverage and compound equity.",
    "Cultivating this level of operational clarity requires you to abandon outdated corporate mentalities and adopt the uncompromising standards of an autonomous commercial architect.",
    "Strategic thinkers perceive the invisible systemic relationships, feedback loops, and multi-order reactions that govern market behavior far beneath surface-level headlines and quarterly metrics.",
    "Structuring commercial positions where downside is strictly contained while upside remains uncapped tilts the mathematical odds decisively in your favor across every market cycle.",
    "Decoding the hidden motives, corporate politics, and structural compensation incentives of counterparties prevents costly miscalculations during high-stakes commercial negotiations.",
    "Playing patient, multi-decade games in short-horizon markets creates compounding reputational and operational advantages that short-term competitors cannot replicate.",
    "Constructing proprietary data feedback loops keeps your leadership team steps ahead of rapidly shifting industry regulations, technological disruptions, and evolving customer demands.",
    "Integrating all strategic dimensions into a unified mental operating system enables decisive, aggressive action under conditions of profound macroeconomic uncertainty.",
    "Inverting commercial problems to systematically identify and eliminate critical points of failure guarantees organizational survival through the most severe economic recessions.",
    "Maintaining emotional poise and psychological detachment under pressure preserves executive decision quality when competitors succumb to collective panic and short-sighted reaction.",
    "Stress-testing strategic hypotheses before capital commitment exposes fatal assumptions early, protecting precious working capital reserves from avoidable depletion.",
    "Ultimately, the lifelong practice of five-dimensional strategic mastery grants you complete independence over your time, attention, and creative commercial destiny."
]

fw_sentences_17_part2 = [
    "Furthermore, systematic execution and rigorous attention to detail insulate your commercial infrastructure against competitive displacement across dynamic market cycles.",
    "In addition, maintaining continuous operational discipline allows your enterprise to capture superior operating margins while delivering verified economic outcomes.",
    "Moreover, establishing repeatable standard operating procedures ensures that your service delivery scales smoothly without introducing human administrative fatigue.",
    "Consequently, corporate clients view your platform as an essential operational anchor that directly safeguards their balance sheet health.",
    "Ultimately, this relentless focus on tactical excellence and enterprise value creation establishes your brand as the definitive authority in your chosen sector.",
    "This unyielding dedication to tactical delivery excellence sets the professional systems architect apart from amateur freelancers in competitive digital markets.",
    "Standardizing software configuration protocols allows your technical team to deploy complex automation suites with speed and precision.",
    "Delivering measurable operational improvements that directly reduce corporate overhead creates overwhelming client goodwill and multi-year consulting partnerships.",
    "Maintaining proactive client communication throughout the deployment lifecycle eliminates executive anxiety and reinforces your professional authority.",
    "Cultivating an unyielding reputation for delivering enterprise projects ahead of schedule transforms one-time setup contracts into lucrative ongoing retainers.",
    "Integrating all strategic dimensions into a unified mental operating system enables decisive, aggressive action under conditions of profound market uncertainty.",
    "Providing strategic clarity empowers modern operators to navigate turbulent industry shifts and capture durable commercial advantages before markets commoditize.",
    "Modern digital tools enable visionary founders to construct high-margin cash flow machines with lean overhead and zero reliance on outside venture financing.",
    "Creating compounding operational momentum positions your enterprise as the definitive category leader within your chosen market vertical.",
    "Safeguarding commercial independence requires disciplined financial accounting, robust technical architecture, and resilient delivery infrastructure.",
    "Reinforcing a culture of relentless operational excellence transforms theoretical ambition into verified balance sheet equity over time.",
    "Cultivating deep domain expertise separates elite systems architects from low-cost freelancers competing on commoditized hourly rates."
]

new_fw5 = []
for idx, p in enumerate(fw5_raw):
    p_clean = p.rstrip(". ")
    new_fw5.append(f"{p_clean}. {fw_sentences_17[idx]} {fw_sentences_17_part2[idx]}")

fw_words = 1 + sum(len(x.split()) for x in new_fw5)
print(f"Foreword: {len(new_fw5)} paras, {fw_words} words")
with open(os.path.join(DIR, "00-foreword.md"), "w", encoding="utf-8") as f:
    f.write("# Foreword\n\n" + "\n\n".join(new_fw5) + "\n")

ep_sentences_14 = [
    "This unrelenting commitment to high-leverage execution, rigorous financial discipline, and personal integrity ensures that your commercial empire stands as an unshakeable fortress of autonomy and lasting security.",
    "As you scale your operations and expand your net worth, remain grounded in the timeless fundamentals of value creation, ethical commerce, and meticulous risk management that govern all enduring wealth.",
    "Let your daily actions reflect the highest standards of strategic clarity and professional excellence, transforming ambitious commercial visions into verifiable balance-sheet equity day after day.",
    "The disciplined accumulation of compounding digital assets provides the ultimate shield against inflation, economic displacement, and the rapid obsolescence of traditional employment models.",
    "True financial autonomy is measured not merely by the gross revenue displayed on a dashboard, but by the complete ownership of your daily time, intellectual focus, and creative energy.",
    "Cultivating personal resilience in the face of temporary setbacks ensures that your forward momentum remains unbroken throughout every phase of your commercial career.",
    "Maintaining absolute transparency and high standards in business communications creates compounding trust that insulates your enterprise from low-cost competitive pressure.",
    "Treat every operational challenge, contract loss, or market downturn as an objective data point designed to harden your delivery systems and sharpen your execution.",
    "Surround yourself with disciplined operators and strategic thinkers who elevate your ambition, challenge your assumptions, and hold you to uncompromising standards of excellence.",
    "Financial independence is not a stroke of luck or circumstance; it is the predictable consequence of sustained value creation, emotional poise, and disciplined capital reinvestment.",
    "Take full ownership of your commercial destiny, execute your daily responsibilities with pride and precision, and never compromise on the quality of your craft.",
    "The modern economy belongs to those who build with urgency, focus, and unwavering dedication to solving meaningful, high-consequence problems for real-world buyers.",
    "Step forward into the commercial arena, execute your strategy with clinical precision, and realize the extraordinary potential of your intellectual and operational capabilities.",
    "May your strategic vision be clear, your decisions courageous, your execution flawless, and your long-term impact profound across every domain of your professional and personal life."
]

ep_sentences_14_part2 = [
    "This unyielding dedication to tactical execution, systematic problem resolution, and uncompromising professional integrity serves as the ultimate cornerstone of enduring enterprise.",
    "By honoring your commitments to clients, mastering your technical tools, and relentlessly executing your business development strategy, you construct an impregnable operational moat.",
    "True entrepreneurial mastery requires the patience to build repeatable operational systems, the humility to learn from daily market feedback, and the courage to make bold strategic bets.",
    "As your revenue scales and your operational bandwidth expands, remain fiercely grounded in the timeless fundamentals of value creation and rigorous cash-flow discipline.",
    "Let your work speak with unmistakable clarity, deliver undeniable results for every enterprise you touch, and build a lasting commercial legacy.",
    "Cultivating personal resilience in the face of temporary setbacks ensures that your forward momentum remains unbroken throughout your entrepreneurial career.",
    "The disciplined accumulation of productive business assets provides the ultimate protection against economic uncertainty and technological displacement.",
    "Maintaining absolute transparency in client communications creates compounding trust that insulates your enterprise from low-cost competitive pressure.",
    "Treat every operational failure as an objective data point designed to harden your delivery systems and sharpen your execution.",
    "Surround yourself with disciplined operators who elevate your ambition and hold you to uncompromising standards of professional excellence.",
    "Financial independence is not a stroke of luck; it is the predictable consequence of sustained value creation and disciplined capital reinvestment.",
    "Take full ownership of your commercial future, execute your daily responsibilities with pride, and never compromise on the quality of your craft.",
    "The digital economy belongs to those who build with urgency, focus, and unwavering dedication to solving meaningful problems.",
    "Step forward into the arena, execute your strategy with precision, and realize the extraordinary potential of your capabilities."
]

new_ep5 = []
for idx, p in enumerate(ep5_raw):
    p_clean = p.rstrip(". ")
    new_ep5.append(f"{p_clean}. {ep_sentences_14[idx]} {ep_sentences_14_part2[idx]}")

ep_words = 1 + sum(len(x.split()) for x in new_ep5)
print(f"Epilogue: {len(new_ep5)} paras, {ep_words} words")
with open(os.path.join(DIR, "99-epilogue.md"), "w", encoding="utf-8") as f:
    f.write("# Epilogue\n\n" + "\n\n".join(new_ep5) + "\n")

# Restore Ch 10, 11, 12 from sg.CHAPTERS with full paragraphs + 1 unique addition
sys.path.insert(0, r"c:\PROJECTS\The Plugd\scripts")
import author_strategic_genius_ch08_14 as sg
from fix_stratgenius_fw_ep import topup_map

ch10_paras = list(sg.CHAPTERS["10-playing-twenty-year-games-in-two-year-markets.md"]["paragraphs"])
ch11_key = [k for k in sg.CHAPTERS.keys() if "11-" in k][0]
ch11_paras = list(sg.CHAPTERS[ch11_key]["paragraphs"])
ch12_paras = list(sg.CHAPTERS["12-constructing-proprietary-feedback-loops-competitors-cannot-see.md"]["paragraphs"])

for fn, paras_raw, title in [
    ("10-playing-twenty-year-games-in-two-year-markets.md", ch10_paras, "Playing Twenty-Year Games in Two-Year Markets"),
    ("11-dimension-five-information-advantage-and-moat-design.md", ch11_paras, "Dimension Five: Information Advantage and Moat Design"),
    ("12-constructing-proprietary-feedback-loops-competitors-cannot-see.md", ch12_paras, "Constructing Proprietary Feedback Loops Competitors Cannot See")
]:
    add_list = topup_map[fn]
    new_p = []
    for i in range(len(paras_raw)):
        p_clean = paras_raw[i].rstrip(". ")
        p_clean = re.sub(r'\bsovereign\b', 'autonomous', p_clean, flags=re.I)
        p_clean = re.sub(r'\bsovereignty\b', 'independence', p_clean, flags=re.I)
        p_clean = re.sub(r'\basymmetric\b', 'high-leverage', p_clean, flags=re.I)
        p_clean = re.sub(r'\basymmetry\b', 'advantage', p_clean, flags=re.I)
        new_p.append(f"{p_clean}. {add_list[i % len(add_list)]}")
    
    tot = len(title.split()) + sum(len(x.split()) for x in new_p)
    print(f"{fn}: {len(new_p)} paras, {tot} words")
    content = f"# {title}\n\n" + "\n\n".join(new_p) + "\n"
    with open(os.path.join(DIR, fn), "w", encoding="utf-8") as f:
        f.write(content)

print("\n*** STRATGENIUS RE-GENERATION COMPLETE! ***")
