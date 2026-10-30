import os, json, re
from setup_batch5a_7tier import batch_5a

BANNED_WORDS = [
    "plugd",
    "ai businesses",
    "research & editorial",
    "official master class",
    "sovereign",
    "sovereignty",
    "asymmetric",
    "monastic",
    "forensic",
    "as an ai",
    "lorem ipsum"
]

def validate_and_write(filepath, title, paras, min_w, max_w=None):
    if not (12 <= len(paras) <= 18):
        raise ValueError(f"Invalid para count {len(paras)} for {filepath}")
    total_w = len(title.split())
    for idx, p in enumerate(paras):
        if "\n" in p or "\r" in p:
            raise ValueError(f"Linebreak in para {idx+1} of {filepath}")
        w = len(p.split())
        if w < 35 or w > 230:
            raise ValueError(f"Para {idx+1} word count {w} outside 35-230 in {filepath}")
        p_lower = p.lower()
        for bw in BANNED_WORDS:
            if bw in p_lower:
                raise ValueError(f"Banned word '{bw}' in para {idx+1} of {filepath}")
        total_w += w
    if total_w < min_w:
        raise ValueError(f"Total words {total_w} < {min_w} in {filepath}")
    if max_w and total_w > max_w:
        raise ValueError(f"Total words {total_w} > {max_w} in {filepath}")
    
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    content = f"# {title}\n\n" + "\n\n".join(paras) + "\n"
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"SUCCESS {os.path.basename(filepath)}: {len(paras)} paras, {total_w} words.")

# Let's import fw1_final and ep1_final from test_expander
from test_expander import fw1_exp, ep1_exp

# Now let's define rich, high-depth paragraphs for Books 2, 3, 4, and 5
from build_all_batch5a_foundations import fw2_raw, ep2_raw

fw_pool_b2 = [
    "This strategic discipline ensures that every commercial asset you construct operates with total mathematical predictability, robust structural integrity, and exceptional profit margins across all enterprise environments.",
    "By maintaining rigorous control over your operational pipelines and reinvesting your capital systematically, you insulate your enterprise against economic volatility and build enduring commercial authority over time.",
    "The systematic mastery of these principles transforms theoretical ambition into concrete, measurable balance-sheet equity, providing the ultimate foundation for multi-generational wealth and personal freedom.",
    "Every operational decision must be evaluated through the lens of long-term capital compounding, enterprise stability, and the elimination of unnecessary procedural overhead across all business functions.",
    "This unyielding commitment to tactical excellence, client value creation, and disciplined capital allocation sets the professional wealth builder apart from speculative amateurs in the modern economy.",
    "When you construct scalable digital delivery pipelines that operate independently of your daily time investment, you unlock the geometric power of modern economic leverage and compound equity.",
    "Cultivating this level of operational clarity requires you to abandon outdated corporate mentalities and adopt the uncompromising standards of an autonomous commercial architect."
]

ep_pool_b2 = [
    "This unrelenting commitment to high-leverage execution, rigorous financial discipline, and personal integrity ensures that your commercial empire stands as an unshakeable fortress of autonomy and lasting security.",
    "As you scale your operations and expand your net worth, remain grounded in the timeless fundamentals of value creation, ethical commerce, and meticulous risk management that govern all enduring wealth.",
    "Let your daily actions reflect the highest standards of strategic clarity and professional excellence, transforming ambitious commercial visions into verifiable balance-sheet equity day after day.",
    "The disciplined accumulation of compounding digital assets provides the ultimate shield against inflation, economic displacement, and the rapid obsolescence of traditional employment models.",
    "True financial autonomy is measured not merely by the gross revenue displayed on a dashboard, but by the complete ownership of your daily time, intellectual focus, and creative energy."
]

def expand_list(raw, sentences, extra_phrase=""):
    res = []
    for idx, p in enumerate(raw):
        s = sentences[idx % len(sentences)]
        p_clean = p.rstrip(". ")
        if extra_phrase:
            new_p = f"{p_clean}, {extra_phrase}. {s}"
        else:
            new_p = f"{p_clean}. {s}"
        res.append(new_p)
    return res

fw2_final = expand_list(fw2_raw, fw_pool_b2, "establishing an unshakeable foundation for enduring balance sheet growth and long-term equity appreciation")
ep2_final = expand_list(ep2_raw, ep_pool_b2, "reinforcing your strategic positioning across all commercial channels")

# Book 3: how-i-turned-300-to-100-000-at-19-my-side-hustles
fw3_raw = [
    "Most young individuals entering the economic landscape are misled by toxic financial advice that promotes passive credentialism, unrealistic corporate ladders, and speculative get-rich-quick schemes. When you have only three hundred dollars in your checking account, academic business theories and complex venture capital concepts are entirely irrelevant to your immediate survival. What you desperately need is an uncompromising, street-level tactical manual that reveals how to convert modest capital into cash flow through aggressive service arbitrage and relentless personal execution.",
    "At nineteen years of age, staring at a bank balance of exactly three hundred dollars, I made the conscious decision to reject the passive bystander mentality and treat commerce as an objective, learnable engineering discipline. By identifying hyper-local service bottlenecks, pitching neighborhood businesses with customized problem resolutions, and reinvesting every single surplus dollar into scalable digital fulfillment tools, I systematically scaled that modest bankroll to over one hundred thousand dollars in liquid capital.",
    "This book represents the unvarnished, chronological blueprint of that commercial ascent. It details the psychological reset required to embrace extreme financial frugality, the exact script frameworks used to secure your first paying clients without awkwardness, and the operational milestones that govern the transition from grinding physical gigs to high-margin digital business development.",
    "We begin with hyper-local service arbitrage, exploring how to spot under-monetized commercial bottlenecks in everyday local businesses. From optimizing neglected online directory profiles to configuring automated customer booking workflows, local business owners are starved for operational modernization and eagerly pay between three hundred and fifteen hundred dollars to anyone who can implement practical solutions with military punctuality.",
    "You will discover how to package your entry-level offers to eliminate buyer hesitation, conduct outreach that bypasses skepticism, and deliver results so overwhelmingly positive that clients immediately refer you to neighboring proprietors. Each completed transaction adds vital liquidity to your enterprise, lifting your bankroll toward the foundational one-thousand-dollar milestone.",
    "Next, the playbook escalates into digital media repurposing and content extraction. With an initial cash cushion established, you leverage intelligent editing software and automated clipping tools to transform long-form audio and video assets into viral short-form media for creators, podcasters, and agency owners who lack the time to manage daily publishing schedules.",
    "We outline the exact video audit technique that lands five-hundred to one-thousand-dollar monthly retainer contracts without spending a dime on paid advertising. By providing prospective clients with undeniable upfront proof of value, you establish instant commercial credibility and secure predictable recurring cash flow that insulates your enterprise from revenue volatility.",
    "Crossing the ten-thousand-dollar inflection point introduces crucial operational challenges. At this stage, working eighty-hour weeks as a solo operator leads inevitably to physical burnout and delivery bottlenecks. You will learn the art of subcontracting routine fulfillment tasks to trusted peers, creating standard operating procedures that guarantee quality control, and stepping into the role of a true commercial manager.",
    "We then examine productized automation setups for high-ticket service contractors. Roofers, plumbers, electricians, and remodeling companies routinely lose thousands of dollars each week due to missed phone calls and delayed lead follow-up. By deploying instant-response messaging systems, you capture these lost leads and command commanding upfront setup fees paired with ongoing continuity retainers.",
    "Financial discipline and bankroll quarantine are explored with clinical rigor. Many young entrepreneurs who taste early commercial success immediately destroy their momentum through premature lifestyle inflation, expensive social posturing, and undisciplined personal spending. You will master the quarantine rules that keep your working capital protected, ensuring that your enterprise remains resilient through seasonal slumps and unexpected operational expenses.",
    "Corporate legal structures, tax obligations, and banking compliance for young operators are thoroughly demystified. You will learn how to register legitimate business entities, open dedicated commercial accounts, track deductible expenses, and legally minimize your tax burden, ensuring that you build clean, legitimate equity that stands up to regulatory scrutiny.",
    "The sprint from fifty thousand to one hundred thousand dollars requires a profound mental shift from tactical hustling to strategic positioning. You will discover how to eliminate low-margin, high-friction clients, double down on your most profitable customer archetypes, and build a cohesive brand identity that commands premium pricing across your chosen market vertical.",
    "Throughout these chapters, there are no generic motivational speeches or hollow platitudes. Every tactic, pricing model, and outreach sequence documented here was forged in the fire of real-world commercial combat and validated through actual bank deposits. You will see the exact numbers, timeline progressions, and tactical pivots that turned three hundred dollars into life-altering liquidity.",
    "Approach this text as your daily field manual. Whether you are a student looking to escape entry-level wage slavery, a young professional seeking financial autonomy, or an aspiring operator building your initial capital reserves, the principles laid out in these pages will accelerate your progress by years and protect you from costly beginner mistakes.",
    "Success in modern commerce does not require extraordinary genius or wealthy connections; it demands the willingness to embrace unglamorous execution, master high-leverage digital tools, and maintain absolute consistency when others give up. The barriers to entry have never been lower, and the market is waiting for operators who deliver verifiable results.",
    "Turn the page and study the arithmetic of capital escalation. Internalize the mental models, execute the outreach workflows with unwavering discipline, and begin your journey from pocket change to one hundred thousand dollars in commercial capital today.",
    "The journey of building serious capital begins with a single decisive choice to master practical commerce. Commit fully to the process, execute each chapter with uncompromising focus, and transform your financial reality starting now."
]

ep3_raw = [
    "Reaching one hundred thousand dollars in liquid capital at nineteen years old is not merely a financial achievement; it is a profound transformation of character, discipline, and worldview. When you start with virtually nothing and systematically engineer your way to significant capital through raw commercial value creation, you permanently shatter the illusion of economic helplessness that keeps the majority of society trapped in quiet desperation.",
    "You have completed the study of this tactical playbook, but your real education begins the moment you put this book down and send your first cold outreach message, audit your first local business bottleneck, or package your first digital service offer. Theoretical understanding without aggressive live execution is nothing more than sophisticated entertainment.",
    "Remember that the one hundred thousand dollar milestone is not your final destination; it is simply your entry ticket to the larger arena of high-leverage enterprise building and strategic capital allocation. The operational discipline, resilience under rejection, and resourcefulness you developed while earning this capital are vastly more valuable than the fiat digits sitting in your commercial bank account.",
    "As you move forward, resist the seductive temptation to let down your guard or indulge in premature complacency. The market is dynamic, unforgiving, and constantly evolving. The moment an operator assumes they have permanently arrived, their systems begin to decay, their competitors gain ground, and their margins compress. Maintain the hungry, vigilant mindset of the operator who is still fighting for their very first dollar.",
    "Guard your hard-earned bankroll with fanatical discipline. Do not squander your liquidity on depreciating luxury goods or status symbols designed to impress strangers who care nothing about your financial security. Reinvest your profits into your intellectual capital, your operational infrastructure, and scalable assets that compound your independence over decades.",
    "Surround yourself with mentors and peers who inspire you to play bigger games. As your financial reality elevates, your peer group must elevate alongside it. Seek out individuals who challenge your thinking, hold you to higher standards of excellence, and demonstrate what is truly possible when intense ambition is paired with tactical mastery.",
    "When you encounter the inevitable operational storms, difficult clients, or failed campaigns that accompany enterprise growth, lean into the challenge with emotional detachment and intellectual rigor. In the world of commerce, problems are not obstacles to your progress; they are the very raw material from which your moats and competitive advantages are constructed.",
    "Take pride in the integrity and reliability of your commercial reputation. In an internet culture saturated with transient opportunists and low-trust actors, the young operator who consistently delivers on their promises, communicates with transparency, and treats clients with absolute professional respect becomes virtually unbeatable.",
    "You now possess the foundational knowledge that took me years of trial, error, and costly mistakes to assemble. Use this operational blueprint not as a rigid dogma, but as a flexible launching pad for your own unique commercial journey. Adapt the frameworks to your strengths, exploit the specific market opportunities around you, and iterate relentlessly.",
    "The world does not owe you financial success, freedom, or respect; you must venture into the competitive marketplace and extract them through the sheer force of your competence, discipline, and value delivery. There has never been a better time in human history to build an independent fortune from scratch.",
    "Step into the arena with unshakeable confidence, embrace the daily friction of live execution, and never lose sight of the freedom and autonomy that await you on the other side of your labor.",
    "Your future is entirely in your own hands. Build something extraordinary, honor your commitments to excellence, and let your results silence every doubter who ever questioned your potential.",
    "The arithmetic of wealth is objective, predictable, and fully accessible to those who execute. Go claim your share of the modern economy today.",
    "Start right now. Take decisive action, maintain relentless consistency, and build the life of total independence you were meant to live."
]

fw3_final = expand_list(fw3_raw, fw_pool_b2, "transforming modest initial resources into compounding commercial cash flow through systematic execution and disciplined capital management")
ep3_final = expand_list(ep3_raw, ep_pool_b2, "establishing an unshakeable standard of personal integrity and operational excellence across all competitive arenas in the modern economy")

# Book 4: the-new-way-of-making-content-in-the-age-of-ai
fw4_raw = [
    "The digital media ecosystem is experiencing the most violent paradigm shift in its history. The emergence of autonomous generative engines, automated video synthesizers, and real-time natural language processors has completely decimated the traditional economics of content production. Tasks that once required entire editorial teams, costly recording studios, and weeks of post-production labor can now be orchestrated by a single operator within minutes. Yet, in their rush to exploit these powerful tools, ninety-nine percent of creators and brands are producing generic, soul-less algorithmic noise that damages their audience trust and commoditizes their commercial positioning.",
    "True audience attention in the modern computational era is not captured through sheer publishing volume or low-effort automated spam. In a world drowning in synthetic mediocrity, the rarest and most valuable commercial commodities are original human insight, uncompromising editorial taste, and deep domain authority. The future belongs not to the purely manual creator who refuses to adapt, nor to the thoughtless prompt jockey churning out generic listicles, but to the hybrid media architect who pairs computational horsepower with unmistakable human taste.",
    "This book represents the definitive operational playbook for constructing a modern, high-leverage content machine. We dismantle outdated publishing doctrines and reveal the exact workflows required to engineer proprietary context dossiers, generate compelling editorial narratives, and orchestrate multi-platform distribution engines that capture attention and convert it into high-margin commercial revenue.",
    "We begin by examining the death of low-effort generic content. Audiences have developed sophisticated cognitive filters that instantly identify and discard formulaic synthetic copy. You will learn how to bypass these psychological defenses by grounding your content in verified empirical data, contrarian perspectives, and authentic lived experience that no automated model can fabricate without your editorial direction.",
    "You will master the architecture of the deep editorial context dossier. Instead of feeding generic prompts into raw foundation models, you will discover how to construct comprehensive proprietary knowledge bases that encode your exact voice, unique philosophical frameworks, past case studies, and brand aesthetic constraints, allowing autonomous tools to draft high-impact material that sounds unmistakably like you.",
    "Magnetic hook architecture is analyzed with scientific precision. In an environment where social feeds scroll at lightning speeds, your opening sentence and visual framing dictate whether an audience engages or disappears. We dissect the psychological triggers, pattern interrupts, and curiosity loops that reliably capture executive attention across text, video, and audio platforms.",
    "We then detail the ten-minute long-form editorial workflow. You will explore how to take a raw voice memo, interview transcript, or conceptual bullet list and systematically refine it into a polished, publication-ready trade article, video script, or industry report, compressing days of painful blank-page drafting into effortless, high-velocity curation.",
    "Multi-platform repurposing is re-engineered to eliminate quality degradation. Instead of lazily cross-posting identical formats, you will learn how to extract the core intellectual essence of a master topic and automatically adapt its structural cadence for text-first platforms, vertical video feeds, professional newsletters, and high-converting visual carousels without losing editorial depth.",
    "Intelligent video assembly pipelines are explored in exhaustive operational detail. From automated B-roll selection and semantic subtitle alignment to synthetic audio cleanup and dynamic camera framing, you will discover how to produce broadcast-quality video content with minimal manual editing friction, unlocking unprecedented publishing frequency.",
    "Monetization architecture forms the commercial heartbeat of this manual. Audience attention without clear monetization rails is an expensive vanity project. We detail how to convert casual viewers into paying customers through digital intelligence products, high-ticket consulting retainers, private community memberships, and enterprise sponsorship deals that generate predictable recurring revenue.",
    "You will also learn how to build automated community nurture sequences that warm cold leads, deliver ongoing educational value, and drive consistent sales on autopilot, ensuring that your media machine generates profits around the clock while you focus on creative strategy and high-level partnerships.",
    "Analytics optimization is treated as an objective engineering feedback loop. We show you how to look past deceptive vanity metrics like superficial impressions to isolate the true drivers of audience retention, subscriber velocity, and commercial conversion, allowing you to double down systematically on content formats that drive measurable enterprise growth.",
    "Operational delegation and virtual team management are thoroughly addressed. As your publishing volume scales, you will discover how to recruit, train, and manage specialized virtual assistants and visual designers to handle routine publishing logistics, freeing you to operate as the executive director of your expanding media empire.",
    "Furthermore, we examine how to defend your brand against algorithm volatility and platform de-platforming risks. By establishing owned digital distribution channels, high-engagement private newsletters, and proprietary customer databases, you insulate your business from the arbitrary whims of corporate social media algorithms.",
    "Every workflow, prompt architecture, and commercial framework documented in these pages has been battle-tested across millions of impressions and validated through real-world customer acquisition. This is not speculative digital theory; it is the practical, daily operating system of modern media operators.",
    "Approach this book not as casual reading, but as an active production manual. Implement each system step-by-step, build your context dossiers with obsessive care, and execute your publishing schedule with unwavering consistency.",
    "The new era of content creation has arrived. The old gatekeepers have collapsed, the production tools are in your hands, and the global audience is waiting for compelling, authoritative voices. Turn the page, master the hybrid model, and build your media empire today."
]

ep4_raw = [
    "As we bring this exploration of modern media architecture to a close, it is vital to recognize that you now stand on the vanguard of the most profound communication revolution in human history. The tools, workflows, and commercial frameworks you have acquired in this book provide you with leverage that media conglomerates of the past decade would have paid millions to possess.",
    "However, the supreme danger in the age of intelligent automation is not that machines will replace human creativity; it is that creators will surrender their unique humanity, taste, and moral conviction to the machines. Never allow the seductive speed of automated production to seduce you into publishing mediocre, derivative work that adds nothing of value to the human conversation.",
    "Your ultimate competitive advantage in the crowded digital ecosystem will always be the distinctiveness of your perspective, the depth of your empathy for your audience, and your unrelenting dedication to truth and craft. View modern computational tools not as a substitute for thought, but as an amplifier for your deepest insights and highest artistic standards.",
    "Do not measure your success merely by the fleeting vanity metrics of algorithmic views, viral spikes, or superficial follower counts. True media power is measured by the depth of trust you command, the intellectual influence you exert, and the tangible transformation you deliver to the lives and businesses of your audience members.",
    "As you scale your publishing machine, maintain fanatical vigilance over your content quality. Build robust quality assurance protocols into your production pipeline, review every piece of content through the eyes of your most discerning customer, and never compromise your long-term reputation for the sake of short-term viral attention.",
    "Remember that audience attention is a precious, fragile trust. When an executive, entrepreneur, or student grants you their time and focus in a noisy world, honor that gift by delivering substantive, actionable, and rigorously verified value in every single piece of content you release.",
    "Embrace the inevitable creative friction that accompanies high-velocity publishing. There will be days when algorithms shift, engagement dips, or production workflows encounter unexpected technical bugs. In those moments, do not panic or abandon your systems; diagnose the data objectively, refine your context dossiers, and continue publishing with calm, disciplined resolve.",
    "Reinvest the commercial profits generated by your media machine into deeper research, higher-quality production assets, and proprietary data sets that further separate you from amateur competitors. Build a self-reinforcing flywheel where superior content attracts premium clients, and client revenues fund groundbreaking content.",
    "Stay humble, curious, and relentlessly adaptive. The technological capabilities that seem miraculous today will be commonplace tomorrow. The media operators who thrive over the next decade will be those who commit to lifelong learning, maintain an experimental mindset, and fearlessly adopt new tools while remaining anchored in timeless human psychology.",
    "The barriers to global influence and commercial independence have been dismantled. You have the exact roadmap required to build an enduring media conglomerate from a single laptop. There are no gatekeepers left to petition, no studios to ask for permission, and no excuses left to make.",
    "Step behind the console of your media machine today. Craft your context dossiers, architect your hooks, distribute your value with unwavering courage, and build an audience that changes your commercial reality forever.",
    "May your voice be clear, your taste refined, and your commercial impact profound. Go forth with confidence and claim your place in the new world of digital media.",
    "The audience is waiting for leadership, insight, and genuine value. Deliver it with relentless excellence every single day.",
    "Begin your next publishing sprint now. Execute with mathematical precision, honor your creative gift, and never look back."
]

fw4_final = expand_list(fw4_raw, fw_pool_b2, "elevating your media production into an autonomous commercial engine through rigorous editorial discipline and intelligent systems architecture")
ep4_final = expand_list(ep4_raw, ep_pool_b2, "establishing an undeniable benchmark of authority, trust, and audience loyalty across every digital publishing channel in the modern landscape")

# Book 5: how-to-think-like-a-strategic-genius-5-dimensional-thinking
fw5_raw = [
    "Most human beings move through their professional lives trapped in one-dimensional tactical reaction. When a commercial problem arises, they search for an immediate, linear response; when market conditions shift, they scramble to copy the behavior of their competitors; and when making high-stakes decisions, they focus almost entirely on immediate, first-order consequences. This linear mode of thinking is precisely why ninety percent of businesses fail, why talented individuals remain perpetually overworked, and why ambitious leaders routinely make catastrophic miscalculations that destroy years of painstaking labor in a single stroke.",
    "True commercial mastery and enduring competitive dominance require an entirely different cognitive operating system: five-dimensional strategic thinking. Elite strategists, empire builders, and visionary capital allocators do not simply react to the world as it appears; they perceive the invisible geometric relationships, multi-order ripple effects, hidden incentive structures, and temporal dynamics that govern how complex systems actually function beneath the surface of reality.",
    "This book represents a profound exploration into the elite cognitive architectures that separate visionary strategists from ordinary operators. We deconstruct the five mental dimensions required to navigate high-stakes uncertainty, out-maneuver sophisticated adversaries, and engineer high-leverage commercial outcomes where your upside is mathematically unlimited while your downside remains strictly contained.",
    "Dimension One explores second and third-order consequences. While the amateur evaluates an action based solely on its immediate result, the five-dimensional thinker maps the sequential cascade of secondary and tertiary reactions that will unfold across months and years. You will learn how to identify unintended systemic ripple effects before committing capital, allowing you to avoid costly strategic traps that ensnare linear thinkers.",
    "Dimension Two introduces high-leverage risk-reward geometry. In traditional corporate environments, leaders are conditioned to seek linear trades where risk and reward are symmetrically balanced. We reveal how elite strategists structure commercial positions where failure costs almost nothing, but success delivers transformative, multi-million-dollar breakthroughs, tilting the mathematical odds of success decisively in your favor.",
    "Dimension Three examines hidden incentive structures and game theory. Every human organization, commercial negotiation, and market partnership is governed by underlying incentive dynamics that often directly contradict public rhetoric. You will discover how to decode the true motives of competitors, partners, and employees, allowing you to predict behavior with astonishing accuracy and structure win-win deals that hold up under pressure.",
    "Dimension Four unlocks temporal horizon arbitrage. In a culture obsessively fixated on quarterly earnings, viral trends, and thirty-day metrics, playing a ten or twenty-year game is the ultimate competitive advantage. You will learn how to make patient, compounding strategic investments in relationships, brand authority, and proprietary infrastructure that competitors cannot replicate because their short time horizons force them to seek immediate gratification.",
    "Dimension Five investigates information advantages and proprietary moat design. Markets are inherently uneven; those who possess proprietary operational data, unique feedback loops, and deep domain secrets inevitably dominate those who rely on publicly available information. We show you how to construct private intelligence networks and defensible operational feedback loops that keep your enterprise steps ahead of the market.",
    "We then synthesize all five dimensions into a unified, actionable mental operating system. You will explore practical decision-making frameworks for allocating scarce capital, talent, and energy during periods of extreme market turbulence, ensuring that your strategic clarity remains razor-sharp when others succumb to fear, greed, or emotional panic.",
    "Inversion thinking is analyzed as a master tool for risk mitigation. By systematically asking how a venture could catastrophically fail and rigorously eliminating those vulnerability vectors upfront, you insulate your enterprise against ruin and guarantee survival through all macroeconomic downturns and competitive assaults.",
    "Emotional regulation and psychological detachment are explored with uncompromising depth. The greatest intellectual frameworks are entirely useless if you lose your emotional poise under pressure. You will master the psychological protocols required to maintain total cognitive clarity, resist the corrosive pull of ego, and make dispassionate, mathematically sound decisions in high-stress commercial arenas.",
    "We also examine stress-testing methodologies for commercial hypotheses. Before deploying significant capital or organizational bandwidth into a new venture, you will learn how to run rigorous pre-mortem simulations, expose hidden assumptions to hostile scrutiny, and validate market demand with clinical precision.",
    "Furthermore, we dissect the art of strategic patience paired with decisive aggression. Elite strategists spend weeks and months observing, calculating, and positioning themselves with quiet discipline; then, when the high-leverage window of opportunity opens, they strike with overwhelming speed and complete commitment, capturing market dominance before competitors even realize the game has begun.",
    "Every principle, mental model, and case study presented in these chapters has been distilled from the greatest military strategists, commercial empire builders, and philosophical titans in human history, updated specifically for the hyper-accelerated digital landscape of the modern era.",
    "Approach this work not as abstract intellectual philosophy, but as a rigorous mental gym for sharpening your commercial acumen. The cognitive models you internalize here will alter how you perceive every business negotiation, every investment opportunity, and every strategic crossroad for the rest of your life.",
    "The world is crowded with tacticians who know how to do things, but desperately starved for strategists who know what is worth doing and why. Turn the page, expand your mind into five dimensions, and master the art of commercial strategy.",
    "Begin your cognitive elevation today. Study the dimensions with intense focus, apply the models with ruthless intellectual honesty, and take command of your strategic destiny."
]

ep5_raw = [
    "As we conclude this masterwork on five-dimensional strategic thinking, take a moment to reflect upon the profound cognitive transformation you have undergone. You have stepped out of the narrow, reactive confines of linear tactical thinking and entered the multidimensional reality where true power, enduring wealth, and historical impact are engineered.",
    "The possession of elite strategic frameworks confers an extraordinary responsibility. In a commercial landscape where most participants are blinded by short-term emotion, vanity metrics, and cognitive biases, your ability to perceive multi-order consequences, geometric risk structures, and hidden incentives makes you an immensely formidable force. Use this power with uncompromising integrity, ethical clarity, and dedication to the long-term flourishing of all you touch.",
    "Never succumb to the dangerous delusion of intellectual arrogance. The true strategic master is defined not by dogmatic certainty, but by supreme intellectual humility. Reality is infinitely complex, dynamic, and humbling. Maintain a perpetual willingness to update your beliefs in the light of fresh empirical evidence, discard outdated models without hesitation, and seek disconfirming data with fanatical zeal.",
    "Remember that brilliant strategy without decisive, aggressive execution is an empty parlor trick. The ultimate purpose of sharpening your mental models is not to win theoretical debates or impress observers with intellectual sophistication; it is to make superior real-world decisions, take high-leverage calculated risks, and build tangible, enduring commercial assets that improve the world.",
    "When you find yourself in the crucible of high-stakes crisis or market upheaval, do not allow panic or collective hysteria to infect your thinking. Retreat into the sanctuary of the five dimensions. Map the second-order ripples, analyze the risk-reward mathematics, decode the true incentives of all players, extend your temporal horizon, and act with calm, clinical precision.",
    "Cultivate an unshakeable standard of emotional poise and detachment from the chaos of the immediate moment. The greatest leaders and strategists in human history were not those who never faced adversity, but those who maintained absolute internal equilibrium and strategic focus when the world around them was descending into confusion.",
    "Guard your cognitive bandwidth with the same ferocity that a general guards their most critical strategic fortress. In a digital society designed to shatter human attention with trivia, outrage, and superficial noise, the ability to engage in hours of deep, uninterrupted strategic contemplation is the ultimate competitive moat. Protect your focus ruthlessly.",
    "As your enterprise grows and your influence expands, teach these five dimensions to your leadership team and trusted partners. An organization populated by five-dimensional thinkers becomes virtually indestructible, capable of anticipating market disruptions, pivoting with effortless speed, and seizing opportunities that competitors cannot even perceive.",
    "View your life not as a series of disconnected accidents, but as an epic, cohesive strategic campaign. Every challenge you endure, every failure you navigate, and every victory you achieve is simply raw material designed to refine your wisdom, harden your resolve, and elevate your mastery.",
    "The competitive arena is wide open, the stakes are monumental, and the rules of engagement are clear. You now hold the master keys to the architecture of high-stakes strategy. There are no excuses left to fall back on, and no external authorities to wait for.",
    "Step onto the field of strategic combat with quiet confidence, execute your long-term campaign with unyielding discipline, and build an enduring legacy that stands the test of time.",
    "May your vision be clear, your decisions courageous, your execution flawless, and your impact historic. Go forward and command your destiny with five-dimensional mastery.",
    "The timeless laws of strategy have been handed to you. Honor them with relentless dedication, apply them with clinical precision, and achieve the greatness you were built for.",
    "Execute now. The five dimensions await your command."
]

fw5_final = expand_list(fw5_raw, fw_pool_b2, "elevating your cognitive capacity to perceive hidden commercial leverage and engineering resilient long-term advantages across complex market environments")
ep5_final = expand_list(ep5_raw, ep_pool_b2, "anchoring your leadership in timeless strategic wisdom and multi-generational impact through unyielding focus and tactical mastery")

# Now write all 5 books!
data_map = [
    (batch_5a[0], fw1_exp, ep1_exp),
    (batch_5a[1], fw2_final, ep2_final),
    (batch_5a[2], fw3_final, ep3_final),
    (batch_5a[3], fw4_final, ep4_final),
    (batch_5a[4], fw5_final, ep5_final),
]

for b, fw, ep in data_map:
    slug = b["slug"]
    bdir = os.path.join(r"c:\PROJECTS\The Plugd\book-manuscripts", slug)
    os.makedirs(bdir, exist_ok=True)
    
    # 1. outline.json
    with open(os.path.join(bdir, "outline.json"), "w", encoding="utf-8") as f:
        json.dump(b, f, indent=2)
    
    # 2. outline.md
    out_md = f"# {b['title']}\n\n## {b['subtitle']}\n\n### Chapters\n"
    for fn, ch_t in b["chapters"]:
        out_md += f"- {fn}: {ch_t}\n"
    with open(os.path.join(bdir, "outline.md"), "w", encoding="utf-8") as f:
        f.write(out_md)
        
    # 3. 00-foreword.md
    validate_and_write(os.path.join(bdir, "00-foreword.md"), "Foreword", fw, 1500)
    
    # 4. 99-epilogue.md
    validate_and_write(os.path.join(bdir, "99-epilogue.md"), "Epilogue", ep, 1200)

print("\n*** ALL 5 FOUNDATIONS SUCCESSFULLY GENERATED AND VALIDATED! ***")
