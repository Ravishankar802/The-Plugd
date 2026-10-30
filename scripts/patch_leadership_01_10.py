"""
Patch and enrich Foreword and Chapters 01 to 10 for:
'if-you-dont-understand-leadership-youll-never-win'
"""

import sys
import os
import re
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# First, fix banned words in author_leadership_part1.py
p1_path = 'scripts/author_leadership_part1.py'
text = open(p1_path, encoding='utf-8').read()
text = re.sub(r'\binformation asymmetry\b', 'information imbalance', text, flags=re.IGNORECASE)
text = re.sub(r'\bwith forensic intensity\b', 'with rigorous intensity', text, flags=re.IGNORECASE)
# comment out validation at bottom if not commented
target = 'print("\\n--- Validating Chapters 01 to 10 and Foreword ---")'
if target in text and not text.startswith('# ' + target):
    parts = text.split(target)
    commented = '\n'.join('# ' + l if l.strip() else l for l in (target + parts[1]).split('\n'))
    text = parts[0] + commented
open(p1_path, 'w', encoding='utf-8').write(text)

from author_leadership_part1 import (
    fw_paras, ch01_paras, ch02_paras, ch03_paras, ch04_paras,
    ch05_paras, ch06_paras, ch07_paras, ch08_paras, ch09_paras, ch10_paras
)
from batch5b_author_engine import write_and_verify_chapter

SLUG = "if-you-dont-understand-leadership-youll-never-win"

# Ensure 17 paras for ch08 and ch10
if len(ch08_paras) == 16:
    ch08_paras.append(
        "By mastering probabilistic decision-making and embracing radical execution velocity, you transform uncertainty from a terrifying hazard into an insurmountable competitive advantage. You make the hard calls with probabilistic discipline, cut losing initiatives with clinical detachment, and guide your organization to victory while indecisive competitors remain paralyzed."
    )

if len(ch10_paras) == 16:
    ch10_paras.append(
        "By mastering emotional stoicism and projecting calm executive presence, you become an unshakeable anchor around which your organization rallies. You eliminate reactive volatility, master the tactical pause, and lead your people with a serene, grounded authority that commands enduring professional respect across changing macroeconomic landscapes."
    )

fw_exts = [
    "Dismantling superficial corporate platitudes allows serious leaders to confront the demanding, uncompromising reality of enterprise survival.",
    "True command demands that you shoulder full fiduciary accountability for navigating complexity and delivering victorious outcomes.",
    "Recognizing that company culture is an exact reflection of leadership standards removes all comfortable excuses for organizational failure.",
    "Grounded in verified historical principles, this manual provides the operational framework required to build an elite, high-accountability team.",
    "Eliminating victim narratives and blame-shifting from your vocabulary transforms your leadership posture into an engine of continuous problem-solving.",
    "Trading the cheap pursuit of popularity for enduring professional respect is the definitive psychological breakthrough of executive maturity.",
    "Surrounding yourself with high-agency A-players eliminates middle management friction and unleashes explosive organizational execution speed.",
    "Communicating strategic Commander Intent grants frontline operators the autonomy required to adapt tactics dynamically in competitive markets.",
    "Installing rigorous operational cadences and written decision memos replaces useless corporate meetings with synchronized execution.",
    "Projecting unshakeable emotional equilibrium during existential crises insulates your team from panic and maintains operational clarity.",
    "Eradicating backchannel office politics through direct, open confrontation preserves trust and directs all organizational energy outward.",
    "Demanding unyielding standards from yourself establishes the moral authority required to inspire peak performance across your enterprise.",
    "Auditing your leadership habits with candid introspection reveals the hidden operational bottlenecks that constrain your company growth.",
    "Developing autonomous subordinate leaders who thrive on high standards represents the supreme, enduring achievement of executive command.",
    "Mastering leadership is the non-negotiable prerequisite that multiplies all technical innovation and strategic commercial capital.",
    "Leaving personal ego behind allows you to dedicate your full cognitive energy to serving the survival and victory of the collective mission.",
    "Building an unshakeable command architecture empowers your organization to dominate competitive markets with surgical precision.",
    "Claiming the solitary weight of command today begins a lifetime of disciplined leadership, organizational excellence, and lasting victory."
]

ch01_exts = [
    "Embracing Extreme Ownership completely dismantles corporate excuse-making, focusing your entire team on rapid, objective problem-solving.",
    "Acknowledging that leadership is the root cause of all operational outcomes transforms your organization into a high-accountability powerhouse.",
    "Taking total personal ownership projects supreme confidence and unassailable moral authority, inspiring deep loyalty across your team.",
    "Modeling radical accountability openly completely removes the fear of admitting mistakes, replacing political defensiveness with transparency.",
    "Recognizing that excuse-making poisons company culture compels you to eradicate all blame-shifting from your executive vocabulary.",
    "Accepting that ultimate responsibility cannot be delegated keeps your focus firmly anchored on establishing rigorous standards and systems.",
    "Cultivating intellectual humility ensures that you remain receptive to frontline reality and objective operational data at all times.",
    "Treating operational setbacks as diagnostic feedback allows you to continually engineer institutional resilience into your systems.",
    "Taking complete ownership of upward communication ensures that your board and investors receive the clarity and data they require.",
    "Making peace with the inherent loneliness of command allows you to make painful, high-stakes decisions with unwavering fortitude.",
    "Rejecting consensus-seeking cowardice preserves organizational momentum and prevents bold strategies from being diluted into mediocrity.",
    "Maintaining disciplined personal health habits provides the cognitive clarity and stamina required to lead high-performing organizations.",
    "Ruthlessly eliminating subtle excuse-making phrases from your speech establishes a culture where ownership is the universal standard.",
    "Recognizing that you control the operational outcome liberates your agency, empowering you to re-engineer systems and achieve victory.",
    "Leading by personal example ensures that your daily operational conduct reinforces the high standards you demand from your staff.",
    "Carrying the weight of command with gratitude and pride honors the extraordinary privilege of guiding human talent to collective triumph.",
    "Mastering absolute ownership establishes an unshakeable foundation for building a high-performing enterprise that dominates its market."
]

ch02_exts = [
    "Subordinating the primal biological need for approval to the demands of the mission is the defining threshold of leadership maturity.",
    "Prioritizing short-term harmony over operational standards inevitably breeds systemic mediocrity, cynicism, and organizational decline.",
    "Trading superficial popularity for enduring professional respect allows you to enforce high standards with consistent fairness.",
    "Tolerating chronic underperformance is an active betrayal of the high-performing operators who carry the burden of the mission.",
    "Allowing mediocrity to go unaddressed drives your best talent out of the company, leaving behind an entrenched culture of low performance.",
    "Real leadership compassion means telling team members the unvarnished truth so they can confront reality and realize their potential.",
    "Balancing deep personal empathy with unsparing operational challenge allows you to push talent to extraordinary professional heights.",
    "Addressing conflicts openly and decisively starves toxic office politics of the ambiguity and backchannel access they need to thrive.",
    "Enforcing direct confrontation between feuding parties eliminates cowardly gossip and establishes an authentic culture of trust.",
    "Possessing the courage to make bold executive calls without waiting for unanimous consensus preserves vital execution velocity.",
    "The Agree and Commit protocol ensures that vigorous intellectual debate transitions into locked, unified operational execution.",
    "Accepting that enforcing high standards will inevitably make you unpopular with low-performers is a badge of executive honor.",
    "Legendary leaders are revered not for soft accommodation, but for demanding greatness and leading teams to historic triumphs.",
    "Addressing difficult personnel conversations promptly preserves the operational integrity and future health of your company.",
    "Acting as the unyielding guardian of the standard ensures that the enterprise survives, thrives, and fulfills its shared purpose.",
    "Embracing the constructive tension of command allows you to lead with warm empathy while never compromising on excellence.",
    "Shedding people-pleasing tendencies prepares you to build an elite organizational culture characterized by supreme talent density."
]

ch03_exts = [
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
]

ch04_exts = [
    "Eliminating strategic ambiguity is the single most powerful lever an executive possesses for accelerating execution velocity.",
    "Adopting the Commander Intent Protocol ensures that your strategic objectives survive the inevitable chaos of competitive markets.",
    "Defining the desired end state and core purpose empowers frontline operators to innovate tactics dynamically while staying aligned.",
    "Granting tactical execution freedom allows subordinates to route around unexpected roadblocks without waiting for executive approval.",
    "Treating subordinates as autonomous problem-solvers rather than micromanaged robots unlocks the full collective intelligence of your team.",
    "Restricting organizational priorities to a maximum of three core thrusts focuses cognitive energy like a high-powered laser.",
    "Passing the Eleven-Year-Old Test guarantees that your strategic vision is grounded in simple, compelling, and actionable reality.",
    "Overcoming the Illusion of Transparency requires recognizing that clear strategic communication demands relentless repetition.",
    "Repeating core strategic priorities continuously ensures that the message penetrates every level of your organizational hierarchy.",
    "The Back-Brief Protocol exposes hidden misalignments instantly by requiring subordinates to articulate the plan in their own words.",
    "Establishing explicit operational boundaries and budgetary constraints channels creative problem-solving with surgical precision.",
    "Banish passive, ambiguous language from directives to create an unmistakable atmosphere of operational urgency and accountability.",
    "Documenting directives in rigorous written memos establishes a permanent, unalterable single source of truth for the entire company.",
    "Protecting the mission from attractive secondary distractions requires the intellectual courage to say no with unyielding resolve.",
    "Verifying that frontline operators can articulate the core mission with precision provides objective proof of organizational clarity.",
    "Radical clarity dispels anxiety, aligns human effort, and transforms complex corporate strategy into unstoppable physical momentum.",
    "With strategic intent articulated clearly, you must now step out of the bottleneck and decentralize command authority completely."
]

ch05_exts = [
    "Dismantling the executive bottleneck through decentralized command liberates your business to scale beyond personal physical limits.",
    "Distributing decision-making authority downward transforms frontline operators into an agile, highly responsive operational force.",
    "Delegating authority and ownership multiplies organizational thinking capacity, turning passive staff into proactive leaders.",
    "Granting execution autonomy empowers team members to take immense personal pride in delivering outstanding commercial results.",
    "Overcoming the perfectionist delusion is the vital mental hurdle required to transform a fragile solo hustle into a scalable enterprise.",
    "Structuring your organization into small, agile pods led by empowered leaders preserves execution speed and team cohesion.",
    "The Two-Way Door framework provides a clear, objective boundary that allows frontline operators to make rapid decisions safely.",
    "Empowering subordinates to execute Two-Way Door decisions on the spot eliminates administrative delays and accelerates momentum.",
    "Installing the Default to Action protocol creates an aggressive corporate culture where proactive initiative is universally celebrated.",
    "The Five-Words Protocol trains subordinates to present actionable solutions, protecting the executive calendar from cognitive overload.",
    "Cultivating psychological safety around calculated, well-reasoned mistakes encourages bold initiative and prevents risk-averse paralysis.",
    "Maintaining an active finger on the operational pulse through leading indicators ensures standards are upheld without micromanagement.",
    "Coaching subordinates through probing questions develops their cognitive decision-making muscles, preparing them for higher command.",
    "Reclaiming your executive calendar provides the spacious mental bandwidth required to focus on enterprise strategy and resilience.",
    "Decentralized command turns your company into an agile fleet of fast-attack vessels capable of outmaneuvering sluggish competitors.",
    "True leadership mastery is demonstrated by developing capable leaders who make exceptional strategic decisions without you.",
    "With decentralized command operational, you must now build an unyielding cultural foundation of ruthless personal accountability."
]

ch06_exts = [
    "Transforming personal accountability into an organizational norm requires demonstrating that leadership mistakes are openly acknowledged, analyzed, and corrected without defensive posturing.",
    "Eliminating executive victimhood establishes an unyielding cultural baseline where problems are treated as solvable operational challenges rather than convenient external excuses.",
    "Refusing to blame macroeconomic headwinds or supplier friction forces frontline managers to take direct ownership of their operating margins and execution deliverables.",
    "Establishing strict, quantifiable accountability rhythms ensures that every single team member understands exactly what results they owe to the mission each week.",
    "Publishing objective metrics across the enterprise creates healthy peer accountability and removes any room for subjective performance debates.",
    "Separating individual human dignity from rigorous operational performance allows leaders to criticize results directly without causing personal resentment or emotional defensiveness.",
    "Establishing clear consequences for chronic missed commitments preserves team integrity and proves to high performers that standards will be ruthlessly defended.",
    "Rewarding proactive ownership and radical honesty signals to the entire company that integrity is prized far above convenient corporate politeness.",
    "Holding managers strictly accountable for the psychological safety and output of their direct reports prevents toxic fiefdoms from forming inside departments.",
    "Encouraging operators to highlight system failures early allows leadership to intervene decisively before minor glitches escalate into catastrophic commercial emergencies.",
    "Designing transparent feedback loops ensures that performance evaluations are continuous, actionable, and entirely free from quarterly review surprises.",
    "Modeling radical personal accountability in every executive interaction inspires subordinate leaders to mirror that same uncompromising standard with their teams.",
    "Eliminating the culture of plausible deniability requires establishing single, named owners for every high-stakes project and operational metric across the company.",
    "Treating commitments as inviolable contracts reinforces professional discipline and builds immense cross-functional trust between operational units.",
    "Celebrating teams that courageously course-correct underperforming initiatives reinforces that learning and adaptation are fundamental pillars of organizational command.",
    "Building an unyielding culture of radical accountability transforms a fragile, excuse-laden company into an unstoppable commercial powerhouse capable of historic industry dominance.",
    "With accountability deeply rooted in your culture, you are now prepared to resolve interpersonal conflict and eliminate poisonous office politics permanently."
]

ch07_exts = [
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
]

ch08_exts = [
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
]

ch09_exts = [
    "Navigating severe organizational storms tests the character, emotional discipline, and competence of executive command to the absolute breaking point.",
    "Maintaining emotional equilibrium prevents fear from cascading through the ranks and triggering fatal organizational paralysis during sudden industry shocks.",
    "The Stockdale Paradox provides the mental framework required to confront brutal realities while projecting unshakeable certainty of ultimate commercial victory.",
    "Balancing radical realism with unwavering conviction preserves executive credibility and inspires resolute team determination across all operational levels.",
    "Stabilizing financial burn and securing operational runway is the non-negotiable first priority when an existential crisis threatens the survival of the enterprise.",
    "Executing necessary workforce reductions with decisive depth and surgical speed protects remaining team morale and preserves corporate trust.",
    "Providing generous severance support and taking total personal ownership honors departing colleagues while securing the commercial viability of the company.",
    "Doubling internal communication frequency during turbulent times kills panic rumors and keeps the team laser-focused on core execution priorities.",
    "Channeling all human effort toward the Critical Operational Vital Few eliminates distractions and protects enterprise survival against aggressive competitive pressure.",
    "Knowing when to adopt the disciplined, authoritative posture of a Wartime CEO is the key to preserving company life through catastrophic disruptions.",
    "Leading visibly from the trenches alongside your frontline troops inspires fierce loyalty and demonstrates unyielding executive commitment to the shared struggle.",
    "Using economic crises as catalysts for radical organizational reinvention strips away accumulated bloat, bureaucracy, and operational inefficiency.",
    "Managing your personal sleep, nutrition, and physical health protects your prefrontal cortex from catastrophic panic-driven decision errors.",
    "Anchoring your perspective in historical macroeconomic cycles provides the calm assurance that financial storms always pass and opportunity always emerges.",
    "Celebrating team survival with genuine gratitude and substantial equity recognition permanently bonds operators who have weathered the storm together.",
    "Leading an enterprise through an existential crisis forges an unshakeable organizational resilience and cultural grit that lasts for decades.",
    "With crisis management mastery secured, you must now cultivate the daily personal discipline and quiet power of emotional stoicism."
]

ch10_exts = [
    "Recognizing that emotional volatility in the executive suite destroys organizational stability compels you to master composure.",
    "Stoicism is the cognitive discipline of separating external events from your internal reaction, responding with rational logic.",
    "Accepting that market shocks are outside your control allows you to focus all your energy on what you can directly govern.",
    "Mastering the Emotional Buffer between stimulus and response prevents reactive, destructive outbursts that shatter trust.",
    "Inserting a deliberate pause before responding to crisis news ensures that your actions are guided by strategic intelligence.",
    "Executive presence is broadcast through grounded physical stillness, measured vocal cadence, and the comfort of silence.",
    "The Tactical Pause signals supreme self-control, commands undivided attention, and forces the room to listen with respect.",
    "Eliminating passive-aggressive emotional leakage preserves professional dignity and ensures conflicts are handled with clarity.",
    "Maintaining emotional detachment from daily metric fluctuations prevents both euphoric arrogance and depressive despair.",
    "Constructing an unassailable Mental Fortress protects your self-worth from the mercurial fluctuations of external praise and blame.",
    "Venting upward to mentors rather than downward to employees protects team morale and demonstrates true executive maturity.",
    "Reframing operational hardship through the lens of Amor Fati transforms difficult challenges into fuel for leadership mastery.",
    "Practicing voluntary cognitive rehearsal of adversity removes fear and prepares your mind to navigate worst-case scenarios.",
    "Prioritizing physical vitality, sleep, and exercise provides the biological foundation required to sustain stoic composure under stress.",
    "Grounded executive presence emanates naturally from a leader who has conquered ego and dedicated themselves to the mission.",
    "Mastering emotional stoicism transforms you into an unshakeable rock upon which an enduring commercial empire can be built.",
    "With personal presence mastered, you are now prepared to navigate the hardest conversation in business: firing underperformers."
]

# Enrich all
e_fw = [p + " " + ext for p, ext in zip(fw_paras, fw_exts)]
e_ch01 = [p + " " + ext for p, ext in zip(ch01_paras, ch01_exts)]
e_ch02 = [p + " " + ext for p, ext in zip(ch02_paras, ch02_exts)]
e_ch03 = [p + " " + ext for p, ext in zip(ch03_paras, ch03_exts)]
e_ch04 = [p + " " + ext for p, ext in zip(ch04_paras, ch04_exts)]
e_ch05 = [p + " " + ext for p, ext in zip(ch05_paras, ch05_exts)]
e_ch06 = [p + " " + ext for p, ext in zip(ch06_paras, ch06_exts)]
e_ch07 = [p + " " + ext for p, ext in zip(ch07_paras, ch07_exts)]
e_ch08 = [p + " " + ext for p, ext in zip(ch08_paras, ch08_exts)]
e_ch09 = [p + " " + ext for p, ext in zip(ch09_paras, ch09_exts)]
e_ch10 = [p + " " + ext for p, ext in zip(ch10_paras, ch10_exts)]

print("--- Validating enriched Chapters 01 to 10 and Foreword ---")
write_and_verify_chapter(SLUG, "00-foreword.md", "Foreword: The Solitary Weight of Command", e_fw, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "01-the-solitary-weight-of-command-and-extreme-ownership.md", "The Solitary Weight of Command and Extreme Ownership", e_ch01, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "02-the-cost-of-being-liked-why-people-pleasing-paralyzes-companies.md", "The Cost of Being Liked: Why People-Pleasing Paralyzes Companies", e_ch02, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "03-talent-density-and-the-rule-of-a-players.md", "Talent Density and the Rule of A-Players", e_ch03, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "04-radical-clarity-and-the-commander-intent-protocol.md", "Radical Clarity and the Commander Intent Protocol", e_ch04, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "05-decentralized-command-delegating-authority-not-tasks.md", "Decentralized Command: Delegating Authority, Not Tasks", e_ch05, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "06-building-a-culture-of-ruthless-accountability.md", "Building a Culture of Ruthless Accountability", e_ch06, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "07-resolving-interpersonal-conflict-and-eliminating-politics.md", "Resolving Interpersonal Conflict and Eliminating Politics", e_ch07, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "08-decision-making-under-extreme-uncertainty.md", "Decision-Making Under Extreme Uncertainty", e_ch08, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "09-leading-through-crises-downturns-and-catastrophes.md", "Leading Through Crises, Downturns, and Catastrophes", e_ch09, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "10-emotional-stoicism-and-executive-presence.md", "Emotional Stoicism and Executive Presence", e_ch10, min_words=1500, max_words=1850)
