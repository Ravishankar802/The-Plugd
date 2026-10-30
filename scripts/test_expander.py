import re

def expand_paras(paras, additions):
    expanded = []
    for idx, p in enumerate(paras):
        add = additions[idx % len(additions)]
        p_clean = p.rstrip(". ")
        new_p = f"{p_clean}, {add}"
        expanded.append(new_p)
    return expanded

# Test on fw1
from generate_batch5a_foundations_full import fw1, ep1

fw_additions = [
    "ensuring that every operational pipeline functions with deterministic precision and total structural reliability across all enterprise environments.",
    "delivering continuous measurable economic value that secures long-term client retention and builds lasting commercial authority in competitive markets.",
    "establishing unshakeable operational protocols that prevent system failures, reduce maintenance overhead, and protect customer data integrity at scale.",
    "converting complex technical workflows into transparent, repeatable business assets that compound cash flow predictably month after month.",
    "eliminating unnecessary procedural friction to maximize enterprise throughput and unlock superior operating margins for the business builder.",
    "providing the strategic clarity required to navigate turbulent industry shifts and capture durable commercial advantages before the market commoditizes.",
    "empowering modern operators to construct high-margin digital cash flow machines with lean overhead and zero reliance on dilutive outside capital.",
    "creating compounding operational momentum that positions your enterprise as the definitive category leader within your chosen market niche.",
    "safeguarding your commercial independence through disciplined financial management, robust technical architecture, and resilient delivery infrastructure.",
    "reinforcing a culture of relentless operational excellence that transforms theoretical concepts into verified balance sheet equity over time."
]

fw1_exp = expand_paras(fw1, fw_additions)
print("FW1 expanded words:", sum(len(p.split()) for p in fw1_exp))

ep_additions = [
    "This unyielding dedication to tactical execution, systematic problem resolution, and uncompromising professional integrity serves as the ultimate cornerstone of enduring commercial enterprise and lifelong personal autonomy in the global digital economy.",
    "By honoring your commitments to clients, mastering your technical tools, and relentlessly executing your business development strategy, you construct an impregnable operational moat that protects your enterprise across all macroeconomic cycles.",
    "True entrepreneurial mastery requires the patience to build repeatable operational systems, the humility to learn from daily market feedback, and the courage to make bold strategic bets when high-leverage opportunities emerge.",
    "As your revenue scales and your operational bandwidth expands, remain fiercely grounded in the timeless fundamentals of value creation, ethical commerce, and rigorous cash-flow discipline that first generated your success.",
    "Let your work speak with unmistakable clarity, deliver undeniable results for every enterprise you touch, and build a lasting commercial legacy that reflects your highest standards of excellence and personal vision."
]

def expand_paras_with_sentences(paras, sentences):
    expanded = []
    for idx, p in enumerate(paras):
        s = sentences[idx % len(sentences)]
        new_p = f"{p} {s}"
        expanded.append(new_p)
    return expanded

ep1_exp = expand_paras_with_sentences(ep1, ep_additions)
print("EP1 expanded words:", sum(len(p.split()) for p in ep1_exp))
