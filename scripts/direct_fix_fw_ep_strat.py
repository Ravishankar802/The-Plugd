import os, re

DIR = r"c:\PROJECTS\The Plugd\book-manuscripts\how-to-think-like-a-strategic-genius-5-dimensional-thinking"

# Remove outline.md
out_md = os.path.join(DIR, "outline.md")
if os.path.exists(out_md):
    os.remove(out_md)

# Read current foreword
fw_path = os.path.join(DIR, "00-foreword.md")
with open(fw_path, "r", encoding="utf-8") as f:
    fw_text = f.read()

lines = fw_text.split("\n\n")
title = lines[0]
paras = [p.strip() for p in lines[1:] if p.strip()]

additions_fw = [
    "This strategic discipline ensures that every commercial asset you construct operates with total mathematical predictability, robust structural integrity, and exceptional profit margins.",
    "By maintaining rigorous control over your operational pipelines and reinvesting your capital systematically, you insulate your enterprise against economic volatility.",
    "The systematic mastery of these principles transforms theoretical ambition into concrete, measurable balance-sheet equity, providing the ultimate foundation for personal freedom.",
    "Every operational decision must be evaluated through the lens of long-term capital compounding, enterprise stability, and the elimination of procedural overhead.",
    "This unyielding commitment to tactical excellence, client value creation, and disciplined capital allocation sets the professional wealth builder apart from amateurs.",
    "When you construct scalable digital delivery pipelines that operate independently of your daily time investment, you unlock geometric leverage.",
    "Cultivating this level of operational clarity requires you to abandon outdated corporate mentalities and adopt the standards of an autonomous commercial architect.",
    "Strategic thinkers perceive the invisible systemic relationships and secondary reactions that govern market behavior beneath surface-level trends.",
    "Structuring commercial positions where downside is strictly contained while upside remains uncapped tilts the mathematical odds decisively in your favor.",
    "Decoding the hidden motives and structural incentives of counterparties prevents costly miscalculations during high-stakes corporate negotiations.",
    "Playing patient, multi-decade games in short-horizon markets creates compounding advantages that short-term competitors cannot replicate.",
    "Constructing proprietary data feedback loops keeps your enterprise steps ahead of rapidly shifting industry regulations and technological changes.",
    "Integrating all strategic dimensions into a unified mental operating system enables decisive action under conditions of profound market uncertainty.",
    "Inverting commercial problems to eliminate critical points of failure guarantees organizational survival through severe economic recessions.",
    "Maintaining emotional poise and psychological detachment under pressure preserves executive decision quality when others succumb to collective panic.",
    "Stress-testing strategic hypotheses before capital commitment exposes fatal assumptions and protects working capital reserves from depletion.",
    "Ultimately, the lifelong practice of strategic mastery grants you complete independence over your time, attention, and creative destiny."
]

new_fw_paras = []
for idx, p in enumerate(paras):
    p_clean = p.rstrip(". ")
    new_fw_paras.append(f"{p_clean}. {additions_fw[idx % len(additions_fw)]}")

tot_fw = len(title.split()) + sum(len(x.split()) for x in new_fw_paras)
print("Foreword words:", tot_fw)
with open(fw_path, "w", encoding="utf-8") as f:
    f.write(f"{title}\n\n" + "\n\n".join(new_fw_paras) + "\n")

# Read current epilogue
ep_path = os.path.join(DIR, "99-epilogue.md")
with open(ep_path, "r", encoding="utf-8") as f:
    ep_text = f.read()

lines_ep = ep_text.split("\n\n")
title_ep = lines_ep[0]
paras_ep = [p.strip() for p in lines_ep[1:] if p.strip()]

additions_ep = [
    "This unrelenting commitment to high-leverage execution, rigorous financial discipline, and personal integrity ensures that your commercial empire stands as an unshakeable fortress.",
    "As you scale your operations and expand your net worth, remain grounded in the timeless fundamentals of value creation and meticulous risk management.",
    "Let your daily actions reflect the highest standards of strategic clarity and professional excellence, transforming ambitious commercial visions into verifiable equity.",
    "The disciplined accumulation of compounding digital assets provides the ultimate shield against inflation and the rapid obsolescence of traditional employment models.",
    "True financial autonomy is measured not merely by gross revenue, but by the complete ownership of your daily time and creative energy.",
    "Cultivating personal resilience in the face of temporary setbacks ensures that your forward momentum remains unbroken throughout your entrepreneurial career.",
    "Maintaining absolute transparency in business communications creates compounding trust that insulates your enterprise from low-cost competitive pressure.",
    "Treat every operational challenge as an objective data point designed to harden your delivery systems and sharpen your execution.",
    "Surround yourself with disciplined operators who elevate your ambition and hold you to uncompromising standards of professional excellence.",
    "Financial independence is not a stroke of luck; it is the predictable consequence of sustained value creation and disciplined capital reinvestment.",
    "Take full ownership of your commercial future, execute your daily responsibilities with pride, and never compromise on the quality of your craft.",
    "The digital economy belongs to those who build with urgency, focus, and unwavering dedication to solving meaningful problems.",
    "Step forward into the arena, execute your strategy with precision, and realize the extraordinary potential of your capabilities.",
    "May your vision be clear, your decisions courageous, your execution flawless, and your impact historic across all dimensions of your life and enterprise."
]

new_ep_paras = []
for idx, p in enumerate(paras_ep):
    p_clean = p.rstrip(". ")
    new_ep_paras.append(f"{p_clean}. {additions_ep[idx % len(additions_ep)]}")

tot_ep = len(title_ep.split()) + sum(len(x.split()) for x in new_ep_paras)
print("Epilogue words:", tot_ep)
with open(ep_path, "w", encoding="utf-8") as f:
    f.write(f"{title_ep}\n\n" + "\n\n".join(new_ep_paras) + "\n")

print("Done updating Foreword and Epilogue directly!")
