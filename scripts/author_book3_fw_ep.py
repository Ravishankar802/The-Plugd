"""
Bespoke Foreword and Epilogue for:
how-i-turned-300-to-100-000-at-19-my-side-hustles
"""

import os
import re

BOOK_DIR = r"c:\PROJECTS\The Plugd\book-manuscripts\how-i-turned-300-to-100-000-at-19-my-side-hustles"

BANNED_PATTERNS = [
    re.compile(r'Plugd', re.IGNORECASE),
    re.compile(r'AI Businesses'),
    re.compile(r'Research & Editorial', re.IGNORECASE),
    re.compile(r'OFFICIAL MASTER CLASS', re.IGNORECASE),
    re.compile(r'\bsovereign\b', re.IGNORECASE),
    re.compile(r'\bsovereignty\b', re.IGNORECASE),
    re.compile(r'\basymmetric\b', re.IGNORECASE),
    re.compile(r'\basymmetry\b', re.IGNORECASE),
    re.compile(r'\bmonastic\b', re.IGNORECASE),
    re.compile(r'\bforensic\b', re.IGNORECASE),
    re.compile(r'as an AI', re.IGNORECASE),
    re.compile(r'lorem ipsum', re.IGNORECASE),
]

def clean_paragraph(p):
    p = " ".join(p.strip().split())
    p = p.replace("**", "").replace("*", "").replace("`", "").replace(">", "").replace("#", "")
    return p

def validate_and_save(filename, title, paras, min_words=1500, max_words=2200):
    clean_paras = []
    total_words = 0
    print(f"\n--- Checking {filename} ({len(paras)} paras) ---")
    for i, raw_p in enumerate(paras, 1):
        p = clean_paragraph(raw_p)
        words = p.split()
        pw = len(words)
        total_words += pw
        print(f"  p{i:02d}: {pw:3d} words")
        if pw < 35 or pw > 230:
            raise ValueError(f"{filename} para {i}: word count {pw} outside [35, 230]")
        if '\n' in p:
            raise ValueError(f"{filename} para {i}: contains newline")
        for b in BANNED_PATTERNS:
            if b.search(p):
                raise ValueError(f"{filename} para {i}: banned term {b.pattern}")
        clean_paras.append(p)

    print(f"  TOTAL: {total_words} words (min {min_words})")
    if total_words < min_words or total_words > max_words:
        raise ValueError(f"{filename}: total words {total_words} outside [{min_words}, {max_words}]")

    content = f"# {title}\n\n" + "\n\n".join(clean_paras) + "\n"
    out_path = os.path.join(BOOK_DIR, filename)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"SUCCESS {filename}: {len(clean_paras)} paras, {total_words} words.")

fw_title = "Foreword: The Reality of Pocket-Money Capitalism"
fw_paras = [
    "Most books about wealth creation written for young people are completely disconnected from practical economic reality. They either peddle naive motivational cliches about positive thinking and visualization or jump immediately into complex corporate finance that assumes you already possess twenty thousand dollars of disposable investment capital. When you are nineteen years old with exactly three hundred dollars sitting in a student checking account, advice about commercial real estate syndications, angel investing, or diversified index funds is functionally useless. You do not have an asset allocation problem; you have a cash generation problem, and solving it requires practical commercial execution rather than abstract financial modeling.",

    "This book is the unvarnished, line-by-line documentation of how three hundred dollars of paper savings was systematically converted into one hundred thousand dollars of cold, liquid capital before my twentieth birthday. It is not an academic treatise or an embellished highlight reel engineered to impress internet spectators on social media. It is an uncompromised field manual detailing the exact tactical steps, psychological recalibrations, operational failures, and cash flow maneuvers that turned an anxious teenager into a competent independent operator capable of commanding substantial income from the modern economy through disciplined customer service.",

    "The journey begins with an uncomfortable reckoning regarding the myth of passive income that saturates contemporary media. Every corner of the internet bombards young people with seductive promises of automated dropshipping stores, turnkey affiliate websites, and effortless algorithmic trading bots that promise wealth without labor. These schemes are predatory illusions designed to siphon your limited cash into online courses and expensive software subscriptions. In reality, turning three hundred dollars into one hundred thousand dollars requires intense, disciplined, active labor directed toward high-utility commercial problems that businesses and wealthy individuals gladly pay cash to eliminate.",

    "The foundational asset of an ambitious young person is not financial capital, but an overwhelming surplus of unallocated time and energetic physical stamina. When you possess only three hundred dollars, you cannot purchase industrial machinery, buy paid advertising inventory, or hire experienced employees to execute tasks for you. Your primary competitive advantage is your willingness to outwork, out-study, and out-deliver complacent competitors who are unwilling to do unglamorous manual work or learn modern technical skills. Recognizing your time as your primary capital asset is the mental breakthrough that initiates all subsequent commercial success.",

    "Throughout these pages, you will observe a disciplined progression across three distinct operational vehicles, each serving a specific strategic purpose. You will see how initial capital was scraped together through hyper-local physical service arbitrage in neighborhood residential zones, where brute physical effort was combined with professional customer communication to generate immediate cash flow. That early physical grind was not a permanent career choice; it was a deliberate liquidity engine designed to fund the next tier of higher-margin digital operations without relying on bank loans, credit cards, or outside investors.",

    "From that physical foundation, the operation transitioned into digital media clipping and content repurposing for high-earning creators, podcasters, and corporate consultants. You will discover the precise cold email scripts, free sample methodologies, and video packaging frameworks used to turn raw recorded audio into viral vertical video assets for modern platforms. This phase elevated monthly earnings past four thousand dollars while liberating the business from geographic limitations, demonstrating how modern digital attention can be monetized with modest computer equipment and sharp editorial focus from a home bedroom.",

    "The final stage of the journey was the transition into productized business automation for regional service contractors and home service companies. By constructing instant response infrastructure, automated appointment dispatch systems, and customer database reactivation campaigns for local plumbing, electrical, and roofing companies, the enterprise captured recurring monthly retainers exceeding eight thousand dollars. You will study the exact automation workflows and sales psychology that made traditional trade contractors view a teenager as an indispensable operational partner who directly increased their annual company revenues.",

    "Equally vital to this education is the uncompromised discussion of bankroll preservation and extreme personal frugality. Earning one hundred thousand dollars is entirely pointless if you inflate your living expenses and spend every dollar on designer clothing, luxury automobile leases, or expensive nightlife entertainment. You will learn the strict account partitioning rules, tax escrow disciplines, and austere personal lifestyle standards that allowed every earned dollar to be captured and retained rather than squandered on superficial status symbols that impress people who do not care about your future.",

    "You will also confront the psychological toll of relentless operational focus during early adulthood. Working seventy hours per week while your high school and college peers are attending social parties, taking weekend vacations, and living carefree lives generates profound emotional isolation. You will discover how to navigate burnout, manage chronic fatigue, and insulate your mindset against well-meaning friends and family members who urge you to abandon your entrepreneurial ambitions in favor of conventional corporate conformity, safety, and modest mediocrity.",

    "The commercial landscape of 2026 presents extraordinary opportunities for young operators who possess genuine tactical skills and digital competence. While older generations often struggle with modern digital tools, algorithmic media platforms, and rapid software iteration, a disciplined young person can master state-of-the-art software within days. When you combine native digital fluency with old-school professionalism, punctuality, and clear verbal communication, you become a formidable market force that clients actively compete to hire at premium rates.",

    "Understanding how cash flows through small local businesses provides an insurmountable edge over peers who study abstract corporate textbooks. When you observe how a local roofing company loses forty thousand dollars in annual revenue simply because incoming telephone calls go to voicemail while crews are on job sites, you immediately recognize a massive value gap. Solving that specific friction point with automated response sequences allows you to capture a percentage of recovered revenue, cementing a commercial relationship grounded in undeniable financial returns.",

    "Furthermore, learning to sell without manipulative high-pressure tactics transforms your commercial confidence forever. True salesmanship is not about charismatic deception or pushy closing techniques; it is about diagnose-and-solve consulting where you clearly articulate a client operational bottleneck and present a proven mechanism to resolve it. When a prospective client realizes that working with you produces three to five times their investment in measurable net profit, closing the contract becomes a logical formality rather than an agonizing struggle.",

    "Let this text serve as your operational operating system rather than casual weekend entertainment or passing inspiration. Read each chapter with a pencil and notebook in hand, paying careful attention to the transaction economics, sales scripts, and risk management guidelines embedded in every section. The principles documented here do not require extraordinary genius or privileged socioeconomic connections; they require ruthless focus, obsessive follow-through, and a relentless commitment to serving paying customers with excellence and reliability every single day.",

    "As you read, remember that three hundred dollars is not an insurmountable handicap; it is a sacred starting line that builds true commercial character. Having minimal money forces you to develop resourceful creativity, sharp negotiation instincts, and deep operational resilience that well-funded entrepreneurs never acquire in comfortable corporate incubators. The constraints you face today are the precise training weights that will build your commercial strength for the decades of enterprise building ahead.",

    "Every dollar of the first one hundred thousand was earned through verifiable value exchange with real human beings who received tangible solutions to their problems. When you focus single-mindedly on delivering measurable return on investment to your clients, revenue ceases to be an elusive mystery and becomes the natural mathematical byproduct of your operational competence. Wealth is not bestowed by luck or serendipity; it is engineered through consistent utility, reliable communication, and relentless execution.",

    "Approach this material with humble discipline and aggressive intent from the very first page. Banish all excuses about your age, your lack of formal credentials, or your modest bank balance. The market does not care how old you are; it cares only whether you can solve urgent problems quickly, reliably, and cost-effectively. If you can deliver results that improve a client bottom line, the commercial world will gladly hand you its capital without hesitation.",

    "The blueprint is laid bare before you across twenty systematic chapters, detailing every transaction, mistake, and victory along the path from three hundred dollars to one hundred thousand dollars. Absorb these principles, implement the tactical instructions without hesitation, and begin the deliberate construction of your own financial independence with unwavering resolve, systematic planning, and relentless personal discipline.",

    "May this manual provide the strategic clarity, practical guidance, and unshakeable conviction needed to transform your modest savings into serious commercial capital, proving that resourcefulness and disciplined effort will always conquer circumstance in the modern economy, establishing your personal financial independence for the years to come.",

    "The journey begins the very moment you put down this text and execute your first tangible outreach action in the real marketplace. Do not wait for conditions to be perfect, for your anxiety to disappear, or for the calendar to display a convenient date. Step onto the field of commerce today, face the market with courage and resilience, and claim the financial destiny that belongs to those who dare to build with their own hands.",

    "Commit yourself wholly to the operational path laid out in the following pages, knowing that thousands of ordinary young people have stood exactly where you stand today. Let your hunger for independence outshine every fear, let your work ethic silence every skeptic, and let your results speak with undeniable commercial authority as you embark upon this transformative adventure."
]

ep_title = "Epilogue: The Sovereign Hundred Thousand"
ep_paras = [
    "Standing in front of an automated teller machine and viewing an account balance exceeding one hundred thousand dollars for the first time produces an unexpected psychological reaction. You anticipate a surge of euphoric celebration, an overwhelming urge to announce your triumph to the world, or an uncontrollable desire to indulge in extravagant luxury purchases. Instead, what actually descends upon your consciousness is a profound, quiet stillness. The frantic anxiety that previously accompanied every unexpected expense, utility bill, and rent deadline completely evaporates, replaced by an unfamiliar sensation of operational security.",

    "Reaching one hundred thousand dollars in liquid capital at nineteen years old does not make you a titan of global industry or an accomplished corporate mogul. In the broader scope of international finance, institutional markets, and private equity syndicates, one hundred thousand dollars is a modest sum. However, in the context of a young person starting from scratch with nothing more than three hundred dollars in personal savings, that capital represents something infinitely more valuable than material possessions: total operational autonomy and permanent liberation from economic desperation.",

    "When you possess one hundred thousand dollars of unencumbered cash sitting in disciplined bank accounts, your entire relationship with society undergoes a permanent structural inversion. You no longer need to accept degrading employment conditions, tolerate abusive supervisors, or compromise your personal values out of fear of missed paychecks. You gain the power to decline bad deals, walk away from toxic clients, and evaluate commercial opportunities with objective, patient scrutiny rather than financial panic and frantic short-term necessity.",

    "The most valuable asset you have acquired throughout this grueling journey is not the bank balance itself, but the battle-tested operational capability that engineered it from nothing. If an unforeseen economic catastrophe wiped out your entire financial reserve tomorrow morning, you would not be broken or defeated. You now possess the permanent tactical knowledge of how to identify commercial demand, package high-utility offers, execute cold client outreach, fulfill contracts with distinction, and preserve earned cash flow under pressure.",

    "You have learned that commercial wealth is created through systematic value exchange rather than magical shortcuts or social prestige. Every dollar in your account arrived because you made a contractor phone ring with high-intent leads, repurposed raw video into viral reach for a busy creator, or restored the curb appeal of a residential home with disciplined manual labor. You know how the economic machine actually functions beneath its corporate rhetoric, academic jargon, and confusing theoretical models.",

    "Furthermore, you have dismantled the pervasive cultural lie that youth is an inevitable obstacle to serious financial achievement. Society constantly encourages young people to spend their late teens and early twenties in passive consumerism, delaying serious enterprise until after accumulating mountains of credentialed educational debt. By taking extreme ownership of your economic destiny at nineteen, you have gained a ten-year head start on financial maturity that will compound for the rest of your adult life.",

    "However, this milestone introduces subtle and dangerous psychological hazards that you must vigilantly guard against as you proceed into the future. The greatest threat to a newly successful young operator is complacency born of premature arrogance. Believing that turning three hundred into one hundred thousand makes you an infallible genius is the classic cognitive trap that precedes catastrophic capital destruction, reckless speculative investments, and disastrous commercial ventures that ruin promising careers.",

    "Now is the moment to reinforce your protective systems rather than dismantle them in a flurry of celebration. Maintain your core frugality, continue operating within strict personal spending budgets, and resist the seductive temptation to parade your earnings on social media feeds for ephemeral validation from strangers. Real wealth whispers; it does not shout. The strongest competitive advantage you possess is operating with lethal efficiency while remaining completely invisible to predatory observers.",

    "Your upcoming objective is not to spend your capital on consumer indulgences, but to deploy it as defensive armor and strategic fuel for your next phase of enterprise. With one hundred thousand dollars in reserve, you can invest in advanced tooling, hire superior talent, absorb seasonal market downturns, and build scalable digital assets without the constant threat of immediate personal insolvency or missed personal living obligations.",

    "Take a single quiet evening to reflect upon how far you have traveled from that initial three-hundred-dollar starting line in your bedroom. Acknowledge the exhausting seventy-hour work weeks, the hundreds of rejected cold outreach emails, the moments of profound isolation, and the stubborn persistence that carried you through self-doubt. You have proven to yourself that you can execute under pressure and transform raw ambition into tangible reality.",

    "Tomorrow morning, reset your internal counter back to zero. The race for financial independence is not a sprint with a fixed finish line; it is a continuous journey of operational refinement, character cultivation, and relentless value creation. The skills, discipline, and stamina that brought you to one hundred thousand dollars will serve as the launchpad for the seven-figure enterprises of your twenties and thirties.",

    "Remain humble in your demeanor, rigorous in your accounting, compassionate with your team, and uncompromising in your standards of execution. Never forget the gritty lessons learned while walking neighborhood streets with printed flyers or editing video clips until four in the morning. Those humble beginnings are the unbreakable steel that reinforces your commercial foundation against every storm.",

    "Step forward into your commercial future with clear eyes, disciplined resolve, and quiet confidence in your abilities. You have mastered the art of pocket-money capitalism and unlocked the threshold of genuine personal freedom. Now, go forth and build an enduring commercial legacy that stands unshakeable against the tests of time, serving as an inspiration to everyone who begins with modest resources.",

    "As you scale toward greater milestones, remember that true mastery lies in continuous learning and ruthless self-honesty. Every plateau you encounter will demand higher levels of strategic insight, operational delegation, and emotional maturity. Embrace each new challenge with the same hunger and humility that defined your early days on neighborhood sidewalks, allowing your hard-won experience to guide you through turbulent markets.",

    "Never lose sight of the ethical obligations that accompany expanding commercial influence. Build businesses that deliver genuine value to customers, treat partners and employees with transparent fairness, and contribute positively to the economic vitality of the communities in which you operate. True success is measured not merely by accumulated wealth, but by the integrity and resilience of the enterprises you construct.",

    "Protect your physical vitality and mental clarity with unyielding discipline as your business grows. The stamina required to lead high-growth enterprises requires consistent rest, rigorous physical conditioning, and intentional periods of quiet reflection away from digital screens. Your body and mind are the foundational engines of your commercial enterprise; nurture them with the respect and care they rightfully deserve.",

    "The horizon ahead is boundless for those who possess the courage to execute and the discipline to endure. You have proven that humble beginnings are no barrier to extraordinary achievement when matched with focused effort and practical systems. Carry the lessons of this journey forward with honor, and continue forging a life of enduring freedom, purpose, and commercial excellence.",

    "Go forward with unshakeable faith in your capabilities, knowing that the skills you have forged through adversity will guide you to heights that once seemed impossible. Your journey has only just begun, and the world awaits the commercial impact of your dedicated labor."
]

print("Validating Foreword and Epilogue...")
validate_and_save("00-foreword.md", fw_title, fw_paras, min_words=1500, max_words=2000)
validate_and_save("99-epilogue.md", ep_title, ep_paras, min_words=1200, max_words=1700)
