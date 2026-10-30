import re

# Read author_leadership_part1.py
with open("scripts/author_leadership_part1.py", "r", encoding="utf-8") as f:
    text = f.read()

# Let's check paragraph counts in author_leadership_part1
# If ch08 has 16, add 17th
if 'ch08_extra_done' not in text:
    target_ch08_end = '"Steering an enterprise through uncertainty with calm, decisive clarity is the hallmark of true command. You accept ambiguity as the normal atmospheric condition of capitalism, make the hard calls with probabilistic discipline, and guide your team forward with unwavering confidence. In the following chapter, we will examine the supreme crucible of leadership: leading through crises, downturns, and catastrophic market disruptions."'
    replacement_ch08 = target_ch08_end + ',\n\n    "Building this systematic conviction transforms decision speed into an unfair competitive advantage, ensuring that your enterprise consistently out-navigates competitors who remain frozen in hesitation and bureaucratic deliberation."'
    if target_ch08_end in text:
        text = text.replace(target_ch08_end, replacement_ch08)
        print("Added 17th para to ch08")

    target_ch10_end = '"By mastering emotional stoicism and executive presence, you become an unshakeable rock upon which your organization can build an enduring commercial empire. You navigate the chaotic storms of capitalism with serene confidence, inspiring your people to rise above fear and execute with peak excellence. In the following chapter, we will examine the most emotionally challenging test of leadership communication: the art of the difficult conversation and swift firing."'
    replacement_ch10 = target_ch10_end + ',\n\n    "Embodying this grounded presence on a daily basis anchors your entire company culture, establishing a stable psychological foundation that allows your people to take courageous risks and execute with extraordinary creative freedom."'
    if target_ch10_end in text:
        text = text.replace(target_ch10_end, replacement_ch10)
        print("Added 17th para to ch10")

with open("scripts/author_leadership_part1.py", "w", encoding="utf-8") as f:
    f.write(text)

# Now update ch03_exts in patch_leadership_01_10.py
with open("scripts/patch_leadership_01_10.py", "r", encoding="utf-8") as f:
    ptext = f.read()

# Replace ch03_exts
new_ch03_exts = '''ch03_exts = [
    "Recognizing talent density as the primary driver of performance allows you to build an agile enterprise with minimal management friction and unmatched commercial velocity.",
    "Pruning low-performers dramatically elevates collective creativity, execution speed, and morale across the remaining high-performers who carry the mission.",
    "An exceptional A-player delivers an order-of-magnitude greater output than an average worker while requiring near-zero executive supervision or administrative policing.",
    "High-agency operators possess the relentless determination to overcome obstacles, invent creative solutions, and deliver promised outcomes regardless of friction.",
    "Tolerating B-players creates a deceptive illusion of adequacy that quietly dilutes standards, degrades work ethic, and drains executive cognitive bandwidth.",
    "Allowing low-performers to linger in an organization actively repels exceptional talent, driving your top operators straight into the waiting arms of competitors.",
    "Preventing the Bozo Explosion requires rigorous executive vigilance to ensure that hiring managers never compromise on talent quality during rapid expansion.",
    "Enforcing the rule that every new hire must raise average team density protects your company from bureaucratic ossification and mediocrity creep.",
    "High-performing A-players thrive exclusively in environments where their velocity is matched by talented, disciplined, and equally driven colleagues.",
    "Applying the Keeper Test once per quarter ensures that you evaluate your talent roster with absolute, unvarnished candor and operational precision.",
    "Providing generous severance packages and treating departing staff with profound dignity allows you to prune talent with integrity and corporate honor.",
    "A lean team of brilliant operators consistently outperforms bloated corporate bureaucracies while operating with superior profitability and strategic agility.",
    "High talent density enables the elimination of restrictive corporate handbooks, replacing stifling red tape with individual ownership and personal responsibility.",
    "Compensating top-tier talent significantly above market rates guarantees long-term retention and yields massive commercial returns across the fiscal year.",
    "Treating executive recruitment as a non-negotiable personal priority connects your enterprise to the most capable operators across the global market.",
    "Building an elite sanctuary of high-agency talent establishes an unstoppable organizational engine capable of historic achievement and sustained category dominance.",
    "With talent density secured, you must now articulate strategic intent with radical clarity so your high-powered team executes with speed and autonomy."
]'''

ptext = re.sub(r'ch03_exts = \[.*?\]', new_ch03_exts, ptext, flags=re.DOTALL)

with open("scripts/patch_leadership_01_10.py", "w", encoding="utf-8") as f:
    f.write(ptext)
print("Updated patch_leadership_01_10.py")
