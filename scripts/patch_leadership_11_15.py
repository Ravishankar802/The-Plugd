"""
Enrich and validate Chapters 11 to 15 for 'if-you-dont-understand-leadership-youll-never-win'
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from batch5b_author_engine import write_and_verify_chapter
from author_leadership_part2a import (
    ch11_paras, ch12_paras, ch13_paras, ch14_paras, ch15_paras,
    ch11_title, ch12_title, ch13_title, ch14_title, ch15_title,
    SLUG
)

ch11_exts = [
    "Executing necessary separations with speed and moral courage protects organizational standards, preserves capital, and reinforces the absolute primacy of mission victory across the enterprise.",
    "Procrastinating on hard personnel decisions breeds corrosive cynicism, forces exceptional team members to carry dead weight, and permanently damages leadership credibility in the eyes of top performers.",
    "Delivering termination decisions with calm emotional neutrality prevents manipulative arguments, honors the gravity of the transition, and ensures that the separation remains clean, professional, and final.",
    "Keeping termination conversations concise and focused on logistical separation protects the dignity of the departing employee and minimizes unnecessary psychological distress for all parties involved.",
    "Providing generous severance support and treating departing colleagues with genuine human dignity preserves your professional reputation and transforms alumni into powerful lifelong advocates for the company.",
    "Immediate, unambiguous feedback delivered during early performance interventions gives struggling employees a fair, structured opportunity to course-correct before separation becomes inevitable.",
    "Distinguishing clearly between coachable technical skill deficits and incurable character flaws prevents leaders from wasting precious executive time on unfixable behavioral problems.",
    "Documenting expectations and commitments in writing removes subjective bias, clarifies accountability, and provides an unvarnished factual record that dismantles defensive emotional arguments.",
    "Communicating openly with surviving team members immediately following a termination quells anxiety, reaffirms corporate standards, and refocuses collective energy on forward operational momentum.",
    "A-players celebrate the swift removal of chronic underperformers as proof that leadership possesses the courage to defend excellence and protect the team from mediocrity.",
    "Addressing minor standard violations immediately prevents the normalization of deviance and stops small performance frictions from compounding into terminal career-ending crises.",
    "Practicing radical candor by pairing personal investment with direct challenge gives leaders the moral authority to demand exceptional execution without triggering personal defensiveness.",
    "Scheduling difficult performance reviews on weekday mornings allows departing employees immediate access to professional support networks and reflects thoughtful executive maturity.",
    "Refusing to sugarcoat critical feedback with manipulative rhetorical techniques ensures that employees understand the precise reality of their operational standing without confusion.",
    "Embracing comfortable silence during difficult conversations forces the other party to process reality rather than engaging in defensive chatter or emotional deflection.",
    "Treating former team members with continued fairness and professional courtesy strengthens your enterprise brand and builds an influential network of alumni throughout the broader industry.",
    "Developing the emotional fortitude to execute difficult conversations swiftly and cleanly is the definitive hallmark of seasoned, unshakeable organizational command and executive maturity."
]

ch12_exts = [
    "Aligning human incentives with the long-term survival of the enterprise eliminates organizational friction and transforms self-interest into an unstoppable engine of collective victory.",
    "Installing authentic downside accountability alongside commercial upside prevents short-term executive looting and guarantees that leaders focus on sustainable, generational solvency.",
    "Restructuring sales compensation around gross margin thresholds, collected cash, and long-term retention ensures that revenue generation serves true enterprise profitability rather than vanity metrics.",
    "Granting meaningful equity stakes coupled with transparent financial literacy turns employees from transactional mercenaries into deeply devoted long-term organizational stewards.",
    "Balancing primary performance metrics with rigorous counter-metrics prevents clever operators from gaming the compensation system to the detriment of holistic business health.",
    "Promoting exclusively those who achieve stellar commercial results while demonstrating unyielding cultural integrity signals to the entire company what behaviors are truly valued.",
    "Eliminating hollow vanity titles preserves a lean, meritocratic corporate hierarchy where authority and respect are earned through demonstrable commercial impact rather than bureaucratic status.",
    "Rewarding extraordinary velocity and initiative in real time creates a powerful behavioral feedback loop that fuels continuous operational momentum across the organization.",
    "Designing shared cross-functional incentives dismantles territorial departmental silos and forces disparate teams to collaborate closely on core commercial objectives.",
    "Publicly celebrating quiet operational leverage and automation reinforces that strategic discipline and thoughtful system design are valued far above performative overwork and exhaustion.",
    "Maintaining variable bonus structures that fluctuate transparently with commercial reality defends the enterprise against the dangerous entitlement of fixed overhead commitments.",
    "Protecting disciplined risk-takers from punishment when well-structured commercial experiments fail preserves the creative courage necessary to achieve breakthrough market innovation.",
    "Enforcing executive compensation clawbacks provides an unshakeable institutional defense against reckless financial manipulation and short-sighted corporate gamble.",
    "Structuring vendor and contractor agreements around milestone outcomes and delivery speed aligns external partner profitability with your internal project execution timeline.",
    "Auditing compensation structures regularly ensures that incentive formulas evolve dynamically to match the changing strategic priorities of a maturing commercial enterprise.",
    "Harmonizing individual economic interests with enterprise survival creates a self-sustaining organizational flywheel that operates with minimal supervisory friction or management overhead.",
    "Mastering incentive architecture allows an executive to guide complex human systems toward historic commercial achievements through the invisible gravity of self-interest."
]

ch13_exts = [
    "Establishing a disciplined, predictable operational cadence transforms ambitious strategy into daily execution, ensuring that strategic intent survives the chaotic friction of competitive markets.",
    "Protecting executive calendars from reactive meeting bloat and chaotic scheduling preserves the cognitive bandwidth required to solve complex problems and direct long-term strategy.",
    "Executing synchronous standups with military brevity keeps teams aligned, surfaces critical operational blockers immediately, and prevents minor delays from compounding into missed deadlines.",
    "Anchoring weekly business reviews in standardized, unvarnished quantitative dashboards ensures that leadership confronts objective reality rather than comfortable, polished corporate narratives.",
    "Enforcing strict meeting standards with written agendas, explicit deliverables, and built-in transition buffers transforms company meetings from time-wasting rituals into high-leverage decision forums.",
    "Replacing superficial slide presentations with rigorous, written narrative memos forces executive teams to think deeply, analyze counter-arguments, and make thoroughly vetted strategic decisions.",
    "Restricting meeting attendance strictly to decision-makers and active executors eliminates spectators, encourages radical candor, and preserves hundreds of hours of executive productivity.",
    "Assigning every action item to a single, named individual with an uncompromising deadline ensures that operational commitments are executed without ambiguity or diffusion of responsibility.",
    "Conducting comprehensive monthly financial deep dives provides the executive tier with the diagnostic clarity needed to optimize unit economics, manage cash burn, and scale efficiently.",
    "Disciplining quarterly strategic planning around a minimal set of prioritized objectives ensures that the entire enterprise focuses its limited resources on transformative commercial milestones.",
    "Pruning low-leverage initiatives, obsolete reports, and zombie projects quarterly liberates precious human and financial capital to invest behind proven market momentum.",
    "Implementing company-wide focus blocks and meeting-free days protects uninterrupted deep work, dramatically accelerating technical output and high-leverage intellectual creation.",
    "Tightening operational rhythms and increasing communication cadences during industry crises provides an unshakeable structural anchor that keeps the organization calm and execution-focused.",
    "Conducting periodic cadence audits to purge obsolete recurring meetings prevents the enterprise from settling into comfortable, performative administrative theater over time.",
    "Prioritizing weekly one-on-one sessions between managers and direct reports builds psychological safety, uncovers organizational friction, and prevents high-performer turnover across teams.",
    "Achieving flawless synchronization across daily, weekly, and monthly operational rhythms allows an organization to execute with effortless velocity and unshakeable competitive resilience.",
    "Disciplined operational cadences provide the execution engine that turns visionary ideas into enduring commercial realities through daily, uncompromising accountability."
]

ch14_exts = [
    "Treating organizational communication as a high-velocity operating system ensures that critical information flows cleanly, eliminating latency and aligning thousands of operators behind the mission.",
    "Transitioning from chaotic oral traditions and ephemeral chat channels to rigorous written documentation preserves institutional memory and establishes an immutable single source of truth.",
    "Documenting high-stakes decisions in a central knowledge repository eliminates ambiguity, ends repetitive debates, and allows new team members to execute with full historical context.",
    "Demolishing toxic information silos through radical internal transparency empowers frontline operators to make smart, autonomous decisions without waiting for bureaucratic permission.",
    "Establishing realistic asynchronous communication response expectations frees knowledge workers from continuous distraction, enabling prolonged blocks of focused, high-leverage creation.",
    "Enforcing strict channel hierarchies for chat, project software, documentation wikis, and executive memos prevents cross-platform chaos and restores cognitive sanity to the organization.",
    "Applying the Bottom Line Up Front principle in all written communication ensures that key decisions and required actions are grasped instantaneously by busy executive colleagues.",
    "Banning sprawling reply-all email threads and resolving complex disputes through brief, focused synchronous calls eliminates information clutter and speeds up alignment across units.",
    "Relentlessly filtering out administrative noise and prioritizing actionable KPI variances ensures that leadership remains laser-focused on core strategic threats and opportunities.",
    "Standardizing frontline updates around structured five-paragraph situation reports provides executive leadership with fast, decision-ready field intelligence in under two minutes.",
    "Addressing what happened, why it happened, and what it means for daily roles in every company announcement prevents transition anxiety and maintains high organizational morale.",
    "Upholding the iron rule of public praise and private critique protects employee trust, encourages courageous initiative, and preserves individual dignity during course-corrections.",
    "Fostering an executive culture of intellectual candor and structured debate ensures that flawed proposals are dismantled early while total unity of command is maintained.",
    "Conducting regular communication audits to uncover and resolve information latency bottlenecks accelerates decision velocity and improves operational cohesion across the company.",
    "Mastering evocative executive storytelling unites disparate teams behind a transcendent commercial narrative, turning daily operational struggles into a shared heroic mission.",
    "Operating a frictionless communication nervous system enables an enterprise to sense market shifts instantly, adapt dynamically, and out-execute sluggish bureaucratic competitors.",
    "A refined communication operating system aligns thousands of minds into a single cohesive force, turning strategic vision into rapid, coordinated market dominance."
]

ch15_exts = [
    "Defending the enterprise against the natural thermodynamic creep of corporate bureaucracy preserves the speed, agility, and aggressive execution spirit of a high-growth vanguard.",
    "Refusing to solve isolated human errors with universal procedural handcuffs protects the autonomy of high performers and prevents the creeping paralysis of administrative red tape.",
    "Enforcing the rule of one-in, two-out for corporate procedures compels managers to ruthlessly evaluate whether new policies justify the operational friction they create.",
    "Disciplining product development and strategic roadmaps against scope creep keeps the enterprise focused on mastering its core commercial engine rather than chasing distractions.",
    "Applying the minimum viable process standard ensures that corporate workflows exist strictly to prevent catastrophe and accelerate velocity rather than provide comfort to middle managers.",
    "Dismantling managerial empire-building by rewarding lean efficiency and high leverage cements the principle that output matters far more than headcount or budget size.",
    "Engaging frontline operators in annual bureaucracy hackathons surfaces and destroys useless rules, sending an undeniable signal that common sense reigns over procedural dogma.",
    "Restricting operational squads to small, autonomous two-pizza teams preserves radical ownership, high execution velocity, and complete freedom from corporate bureaucracy.",
    "Eliminating diffusion-of-responsibility committees and assigning single directly responsible individuals guarantees that high-stakes decisions are made with speed and absolute clarity.",
    "Auditing and consolidating the company software stack eliminates digital bloat, cuts SaaS waste, and prevents fragmented platforms from fracturing team attention and focus.",
    "Keeping human resources tightly focused on recruiting elite talent and supporting operational leaders prevents the rise of toxic, performative compliance bureaucracy.",
    "Simplifying organizational reporting lines into single, direct managerial relationships eliminates matrix confusion, political positioning, and jurisdictional friction across departments.",
    "Maintaining executive proximity to frontline operations, customer support tickets, and floor-level realities protects leadership instincts from ivory-tower isolation and arrogance.",
    "Incentivizing the active destruction of unnecessary red tape through cash bounty programs empowers the entire workforce to defend organizational speed as a competitive moat.",
    "Scaling an organization to immense size while codifying processes with disciplined minimalism allows an enterprise to maintain the lethal velocity of a hungry startup.",
    "Protecting the mission from internal administrative rot preserves the vital creative spark that enables talented teams to generate extraordinary customer value at breakneck speed.",
    "Relentlessly pruning corporate complexity ensures that your enterprise remains an agile, high-velocity war machine capable of dominating shifting commercial landscapes."
]

e_ch11 = [p + " " + ext for p, ext in zip(ch11_paras, ch11_exts)]
e_ch12 = [p + " " + ext for p, ext in zip(ch12_paras, ch12_exts)]
e_ch13 = [p + " " + ext for p, ext in zip(ch13_paras, ch13_exts)]
e_ch14 = [p + " " + ext for p, ext in zip(ch14_paras, ch14_exts)]
e_ch15 = [p + " " + ext for p, ext in zip(ch15_paras, ch15_exts)]

if __name__ == '__main__':
    print("--- Validating enriched Chapters 11 to 15 ---")
    write_and_verify_chapter(SLUG, "11-the-art-of-the-difficult-conversation-and-swift-firing.md", ch11_title, e_ch11, min_words=1500, max_words=1850)
    write_and_verify_chapter(SLUG, "12-designing-incentives-that-align-with-enterprise-survival.md", ch12_title, e_ch12, min_words=1500, max_words=1850)
    write_and_verify_chapter(SLUG, "13-operational-rhythms-and-the-cadence-of-accountability.md", ch13_title, e_ch13, min_words=1500, max_words=1850)
    write_and_verify_chapter(SLUG, "14-communication-as-an-operating-system.md", ch14_title, e_ch14, min_words=1500, max_words=1850)
    write_and_verify_chapter(SLUG, "15-protecting-the-mission-from-bureaucracy-and-scope-creep.md", ch15_title, e_ch15, min_words=1500, max_words=1850)
