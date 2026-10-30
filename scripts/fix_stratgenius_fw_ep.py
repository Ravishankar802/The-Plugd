import os, re

DIR = r"c:\PROJECTS\The Plugd\book-manuscripts\how-to-think-like-a-strategic-genius-5-dimensional-thinking"

fw_unique_17 = [
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
    "Ultimately, the lifelong practice of strategic mastery grants you complete sovereignty over your time, attention, and creative destiny."
]

ep_unique_14 = [
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
    "May your vision be clear, your decisions courageous, your execution flawless, and your impact historic across all dimensions of your life."
]

from setup_batch5a_perfect import fw5_raw, ep5_raw

# Build 00-foreword.md
new_fw5 = []
for idx, p in enumerate(fw5_raw):
    p_clean = p.rstrip(". ")
    new_fw5.append(f"{p_clean}. {fw_unique_17[idx]}")

fw_content = "# Foreword\n\n" + "\n\n".join(new_fw5) + "\n"
with open(os.path.join(DIR, "00-foreword.md"), "w", encoding="utf-8") as f:
    f.write(fw_content)
print("Updated Foreword with 17 unique sentences!")

# Build 99-epilogue.md
new_ep5 = []
for idx, p in enumerate(ep5_raw):
    p_clean = p.rstrip(". ")
    new_ep5.append(f"{p_clean}. {ep_unique_14[idx]}")

ep_content = "# Epilogue\n\n" + "\n\n".join(new_ep5) + "\n"
with open(os.path.join(DIR, "99-epilogue.md"), "w", encoding="utf-8") as f:
    f.write(ep_content)
print("Updated Epilogue with 14 unique sentences!")

# Also clean up Ch 10, 11, 12, 16 additions so they don't repeat identical clauses
topup_map = {
    "10-playing-twenty-year-games-in-two-year-markets.md": [
        "Patient capital compounding produces exponential balance-sheet advantages that impatient competitors cannot match.",
        "Long-term relationship building creates enduring institutional trust that withstands temporary market downturns.",
        "Focusing on durable technological foundations protects your enterprise against rapid obsolescence.",
        "Sustained strategic focus over decades allows you to capture dominant market positions by default.",
        "Resisting short-term quarterly pressures preserves organizational health and executive clarity.",
        "Compounding intellectual property assets create high barriers to entry that new entrants cannot overcome.",
        "Deep industry specialization insulates your customer relationships from generic competitive disruption.",
        "Reinvesting operational cash flow into durable infrastructure multiplies your enterprise valuation systematically.",
        "Consistent execution across market cycles establishes your firm as the undisputed category authority.",
        "Disciplined resource stewardship guarantees that your business thrives when speculative competitors fail.",
        "Patience paired with aggressive operational focus creates an unassailable commercial moat over time.",
        "Building for multi-generational longevity requires uncompromising adherence to core ethical principles.",
        "Treating business as a thirty-year campaign transforms every daily decision into a high-leverage strategic move.",
        "Refusing to sacrifice long-term integrity for immediate gains wins the loyalty of premium clients.",
        "Mastering temporal horizon arbitrage allows you to win commercial games before competitors realize they have started.",
        "Enduring commercial empires are forged through unyielding patience and relentless daily craftsmanship.",
        "Ultimately, playing the long game grants you unmatched strategic autonomy and lasting peace of mind."
    ],
    "11-dimension-five-information-advantage-and-moat-design.md": [
        "Proprietary operational datasets provide predictive capabilities that public market participants cannot access.",
        "Constructing private intelligence loops keeps your leadership team informed of emerging regulatory shifts.",
        "Deep domain expertise enables you to spot lucrative market opportunities that generalist analysts overlook.",
        "Protecting confidential technical workflows preserves your pricing power in competitive B2B negotiations.",
        "Establishing exclusive supplier partnerships locks in margin advantages that competitors cannot duplicate.",
        "Continuous customer feedback loops guide product iterations with clinical precision and speed.",
        "Unique analytical frameworks allow you to extract actionable intelligence from chaotic market data.",
        "Proprietary knowledge assets increase the terminal enterprise value of your commercial organization.",
        "Guarding proprietary business logic with robust legal and technical controls safeguards your competitive edge.",
        "Specialized operational insights allow you to price customer risk more accurately than incumbent firms.",
        "Direct access to frontline market data eliminates reliance on lagging third-party industry reports.",
        "Building proprietary software tools automates routine data ingestion and enhances executive throughput.",
        "Defensible information advantages compound over time, creating an insurmountable barrier for new entrants.",
        "Mastering information architecture ensures that your enterprise remains resilient against disruption.",
        "Cultivating exclusive networks of domain experts provides early warning of critical industry transitions.",
        "Proprietary data pipelines transform raw market signals into verified balance-sheet equity.",
        "Ultimately, commanding unique information reserves establishes your enterprise as an invincible category leader."
    ],
    "12-constructing-proprietary-feedback-loops-competitors-cannot-see.md": [
        "Internal operational telemetry monitors workflow efficiency continuously, exposing systemic friction before it causes damage.",
        "Automated client health metrics detect customer dissatisfaction early, enabling proactive retention interventions.",
        "Real-time pipeline analytics guide business development investments toward the highest-margin customer archetypes.",
        "Continuous post-mortem reviews extract valuable operational data from every project setback or delivery error.",
        "Proprietary performance benchmarking tools demonstrate undeniable economic ROI to prospective enterprise buyers.",
        "Direct integration with client software infrastructure provides immediate visibility into actual product usage patterns.",
        "Structured employee feedback loops uncover frontline operational bottlenecks that senior executives might miss.",
        "Systematic competitive intelligence tracking alerts your leadership team to new rival product launches instantly.",
        "Financial reporting automation ensures that cash flow metrics are monitored daily with mathematical precision.",
        "Customer advisory boards provide unvarnished strategic guidance on emerging enterprise technology requirements.",
        "Automated error logging identifies recurring software integration bugs before end-users report frustration.",
        "Tracking lead conversion velocity highlights the most effective outreach messaging sequences in real time.",
        "Proprietary feedback loops turn every customer interaction into an asset that improves overall system performance.",
        "Objective operational data eliminates emotional debate and accelerates executive decision-making speed.",
        "Continuous feedback cycles create a self-correcting enterprise that adapts effortlessly to market shifts.",
        "Embedding measurement tools into daily operations guarantees that quality standards are consistently maintained.",
        "Ultimately, invisible feedback loops provide the operational steering mechanism for enduring commercial dominance."
    ]
}

for fn, add_list in topup_map.items():
    fpath = os.path.join(DIR, fn)
    with open(fpath, "r", encoding="utf-8") as f:
        text = f.read()
    lines = text.split("\n\n")
    title = lines[0]
    paras = [p.strip() for p in lines[1:] if p.strip()]
    for i in range(len(paras)):
        sentences = re.split(r'(?<=[.!?])\s+', paras[i])
        base = " ".join(sentences[:2]) if len(sentences) >= 2 else paras[i]
        base_clean = base.rstrip(". ")
        paras[i] = f"{base_clean}. {add_list[i % len(add_list)]}"
    content = f"{title}\n\n" + "\n\n".join(paras) + "\n"
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Cleaned {fn} with unique additions!")

