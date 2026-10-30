import re

with open("scripts/patch_leadership_01_10.py", "r", encoding="utf-8") as f:
    text = f.read()

new_ch07_exts = '''ch07_exts = [
    "Eliminating poisonous office politics and interpersonal factionalism is an essential executive duty that determines whether an organization scales rapidly into a market leader or collapses inward from petty squabbling.",
    "Recognizing that unresolved conflict quietly drains executive cognitive energy, poisons team morale, and distracts high-performing operators from commercial objectives compels immediate and decisive executive intervention.",
    "Uncovering the hidden agendas, defensive maneuvering, and territorial power games that breed political maneuvering requires maintaining absolute, unwavering transparency in all executive communications and strategic reviews.",
    "Treating triangular gossip and passive-aggressive backchanneling as fireable cultural offenses permanently protects organizational cohesion and preserves operational trust across cross-functional departments.",
    "Refusing to entertain private complaints about colleagues without the other party present forces employees to communicate directly, honestly, professionally, and with mutual respect.",
    "Establishing structured conflict-resolution protocols provides a safe, objective framework where disputing leaders can debate high-stakes ideas fiercely while respecting one another on a personal level.",
    "Focusing team debates exclusively on objective market data, customer outcomes, and enterprise survival dismantles emotional ego battles and restores rational strategic focus to the conversation.",
    "Rewarding leaders who prioritize enterprise-wide success over narrow departmental empires actively discourages territorial protectionism and short-sighted resource hoarding across business units.",
    "Eliminating ambiguous operational ownership and overlapping functional roles removes the root structural cause that sparks bitter jurisdictional turf wars between ambitious managers.",
    "Encouraging radical candor and passionate intellectual debate in executive meetings ensures that flawed concepts are demolished early while unity of command is preserved across the leadership tier.",
    "Holding joint retrospectives after major conflicts helps competing teams build mutual empathy, align shared goals, and forge resilient collaborative working relationships for future campaigns.",
    "Refusing to allow political maneuvering to influence promotions or executive compensation sends an unmistakable signal that pure merit and unwavering integrity are the only paths to advancement.",
    "Conducting periodic organizational health checks surfaces latent resentments and unresolved frictions before they metastasize into toxic cultural rot that destabilizes the company.",
    "Modeling egoless, collaborative leadership in every cross-functional decision inspires senior directors to subordinate personal ambitions to the greater mission of the company.",
    "Creating an unshakeable environment of trust and transparency unleashes collective human potential and accelerates execution velocity to historic levels across all divisions.",
    "Eradicating corporate politics transforms your enterprise into a unified, high-trust vanguard that effortlessly out-maneuvers divided, bureaucratic competitors in the open market.",
    "With internal politics permanently eliminated, you are now prepared to guide your enterprise through the dense fog of extreme market uncertainty."
]'''

new_ch08_exts = '''ch08_exts = [
    "Accepting that business is conducted under conditions of extreme ambiguity liberates you from the naive expectation of analytical certainty and perpetual executive comfort.",
    "Overcoming analysis paralysis prevents valuable competitive windows from slamming shut while your team waits endlessly for perfect, non-existent market data.",
    "Recognizing that the cost of delay almost always exceeds the cost of sub-optimal action drives aggressive, decisive operational velocity across every division of the enterprise.",
    "The 70-Percent Decision Rule provides the ideal operational balance between informed quantitative analysis and competitive execution speed in fast-moving industries.",
    "Executing Two-Way Door decisions rapidly allows you to gather real-world diagnostic feedback from the marketplace and iterate toward the optimal commercial path.",
    "Applying the mental model of Inversion uncovers hidden failure vectors, allowing you to install bulletproof operational defenses before an unexpected disaster strikes.",
    "Second-Order Thinking forces you to evaluate downstream consequences thoroughly, preventing short-sighted tactical moves from causing severe long-term structural harm.",
    "Deploying a Red Team Protocol stress-tests executive assumptions, dismantling dangerous confirmation bias before substantial capital is permanently committed to an unproven path.",
    "Conducting a Pre-Mortem removes corporate optimism and empowers team members to identify catastrophic flaws in the operational plan with complete psychological safety.",
    "Reviewing pre-mortem failure causes allows leadership to re-engineer roadmaps and eliminate fatal vulnerabilities prior to committing precious resources to product launch.",
    "Accepting that high-velocity leadership involves making honest, reversible mistakes frees your organization to take calculated commercial risks without crippling fear of failure.",
    "Evaluating decision quality by the rigor of your process rather than transient short-term luck prevents dangerous cognitive resulting and destructive false confidence.",
    "Projecting unshakeable conviction once a decision is made rallies the entire organization to execute with relentless energy, singular unity, and uncompromising focus.",
    "Maintaining an executive Decision Journal provides an unvarnished diagnostic mirror that sharpens your strategic intuition and probabilistic calibration over decades of command.",
    "Exercising decisiveness daily builds an unyielding executive muscle that leaves sluggish, bureaucratic competitors permanently behind in the competitive dust.",
    "Steering through uncertainty with calm, probabilistic clarity is the definitive hallmark of seasoned, unshakeable organizational command and mature leadership.",
    "With decision-making mastery achieved, you must now prepare yourself to navigate the supreme test of command: leading through existential organizational crises."
]'''

text = re.sub(r'ch07_exts = \[.*?\]', new_ch07_exts, text, flags=re.DOTALL)
text = re.sub(r'ch08_exts = \[.*?\]', new_ch08_exts, text, flags=re.DOTALL)

with open("scripts/patch_leadership_01_10.py", "w", encoding="utf-8") as f:
    f.write(text)

print("Updated ch07_exts and ch08_exts in patch_leadership_01_10.py")
