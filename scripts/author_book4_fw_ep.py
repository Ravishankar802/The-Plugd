"""
Author bespoke Foreword and Epilogue for:
'the-new-way-of-making-content-in-the-age-of-ai'
"""

import os
import re

BOOK_DIR = r"c:\PROJECTS\The Plugd\book-manuscripts\the-new-way-of-making-content-in-the-age-of-ai"

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

fw_title = "Foreword: The Great Media Transition"
fw_paras = [
    "The landscape of digital publishing is undergoing the most violent structural transition since the birth of the World Wide Web. For two decades, the formula for building an online audience was straightforward: publish consistently, optimize for search engine keywords, maintain an active presence across major social networks, and gradually accumulate a following through linear manual exertion. Creative teams spent weeks researching single articles, hours drafting video scripts, and days editing multimedia footage. While demanding, this traditional model rewarded persistence and provided clear economic moats for established publishers.",

    "The emergence of advanced computational language models and generative media systems has permanently shattered that traditional paradigm. In less than three years, the marginal cost of producing written text, digital illustration, spoken narration, and video packaging has plummeted toward zero. Anyone with an internet connection can now generate thousands of blog posts, social updates, and automated scripts with a single click. What once required an entire corporate editorial department can now be triggered by a single person operating from a laptop in an afternoon.",

    "However, this explosion in synthetic media has produced an unexpected paradox that most digital observers completely misunderstood. Instead of ushering in a golden era of high-value information, the internet has been inundated with an ocean of bland, generic, repetitive content. Because millions of amateur creators and opportunistic spammers use identical foundational models with superficial prompts, social media feeds and search engines are flooded with recycled summaries that lack original thought, empirical evidence, or human soul.",

    "The consequence of this synthetic flood is a profound crisis of consumer trust and attention fatigue. Audiences are rapidly developing sophisticated antibodies against generic machine output. When readers detect robotic syntax, hollow buzzwords, and predictable listicle formats, they instantly bounce. Search engine algorithms and platform discovery feeds are aggressively penalizing low-effort synthetic spam, destroying the organic reach of businesses that relied on lazy automation shortcuts.",

    "In this saturated media environment, true human authenticity, idiosyncratic perspective, and verified practical experience have become the rarest and most valuable commodities in commerce. Audiences do not care about raw information; information is a free commodity. What audiences desperately crave is genuine perspective: battle-tested judgment, real-world case studies, vulnerable storytelling, and nuanced domain authority that can only be forged through actual hands-on execution in competitive markets.",

    "This book introduces the new operational framework required to build a thriving digital media machine in the age of intelligence: the hybrid creator model. This methodology rejects the naive extremes of both technophobic resistance and careless automated spam. Instead, it combines the computational speed and structural leverage of modern autonomous tools with the irreplaceable judgment, narrative taste, and moral conviction of a seasoned human operator.",

    "Throughout these chapters, you will discover how to construct an automated publishing architecture that amplifies your authentic voice rather than replacing it. You will learn how to engineer deep editorial context dossiers that train language models to write with your exact syntactic rhythm, philosophical convictions, and verified empirical case studies. By anchoring artificial intelligence to your proprietary knowledge base, you produce original, authoritative literature at ten times traditional velocity without sacrificing depth.",

    "You will also master the ten-minute long-form editorial workflow, transforming spoken voice memos into polished, multi-platform publishing assets across newsletters, podcasts, video channels, and social threads. Instead of spending eight hours staring at a blank screen, you will learn to speak your core insights into recording software and deploy automated systems to handle the structural composition, grammatical polish, and multi-format packaging.",

    "Beyond content creation mechanics, this volume provides a rigorous commercial education in audience monetization, high-ticket consulting acquisition, digital product engineering, and sponsorship negotiations. Attention without monetization is vanity; you will learn how to build automated community nurture sequences that turn casual video viewers into loyal, high-paying clients who invest in your premium advisory programs and recurring software utilities.",

    "We will also explore the critical operational disciplines of audience retention analytics, content calendar management, and delegating fulfillment to specialized virtual editors. Building an enduring digital publishing brand requires systems that operate reliably without demanding eighty hours of weekly personal toil. You will study how to assemble lean, agile creative teams that execute routine production while you focus on high-leverage strategic relationships.",

    "Finally, this manual addresses the strategic imperative of brand defense against unpredictable algorithmic shifts and platform deprecation. Relying entirely on a third-party social media platform for your livelihood is an existential risk; you will learn how to channel public attention into owned communication channels, including private email lists, SMS communities, and proprietary digital membership portals that competitors and algorithms cannot disrupt.",

    "The principles documented here have been forged through real commercial combat across dozens of competitive digital niches. They do not rely on passing algorithmic tricks or short-lived social media hacks. They are timeless media strategies adapted for the realities of modern artificial intelligence, designed to build unassailable commercial moats around your personal brand and business enterprise.",

    "As you study each chapter, approach the material with active implementation in mind. Set up your digital workspace, configure your context dossiers, test the hook architectures, and execute the multi-platform repurposing protocols. Digital mastery is not achieved through passive consumption; it is built through relentless, iterative execution in the live marketplace of public attention.",

    "The creators who flourish in this new era will not be the Luddites who refuse to touch modern tools, nor will they be the automated spammers who pollute the web with hollow noise. The future belongs entirely to the hybrid operators: disciplined thinkers who harness computational power to distribute profound human wisdom to a world desperately seeking authentic guidance.",

    "Let this book serve as your definitive technical roadmap, strategic constitution, and practical playbook for building a dominant, respected, and highly profitable digital media enterprise in the age of artificial intelligence.",

    "Turn the page with focused ambition, embrace the technological leverage before you, and begin the deliberate construction of your digital media empire with unwavering commitment and unshakeable confidence in your authentic voice.",

    "The journey begins by permanently dismantling old assumptions about content creation and embracing the new economics of digital influence. The marketplace is waiting for true authority; step forward and claim your rightful place.",

    "May this text provide the clarity, practical systems, and commercial strength needed to build a media presence that educates millions, generates exceptional wealth, and stands resilient against every future technological disruption.",

    "Commit to excellence, master the machine, honor your audience, and build an enduring legacy of truth, value, and influence that commands the respect of your entire industry.",

    "Welcome to the new frontier of digital media creation; the future belongs to those who dare to build with intelligence and integrity."
]

ep_title = "Epilogue: The Enduring Power of Human Voice"
ep_paras = [
    "Standing at the intersection of exponential technological acceleration and human creativity is both exhilarating and sobering. As machine intelligence becomes progressively more capable of generating flawless prose, photorealistic imagery, and synthetic audio that rivals human execution, the fundamental question confronting every creator becomes unavoidable: what is the enduring value of human thought in a world of infinite synthetic content?",

    "The answer, discovered through the crucible of building high-impact digital publishing engines, is both simple and profound: the value of human thought does not lie in the mechanical arrangement of words or pixels, but in the moral weight, lived experience, and personal accountability behind them. A machine can simulate emotional resonance and summarize historical data, but it can never risk its own reputation, experience physical pain, or stand behind an idea with personal conviction.",

    "When an audience chooses to follow your publications, subscribe to your newsletter, or invest thousands of dollars in your consulting guidance, they are not merely purchasing information. They are placing their trust in your character, your discernment, and your authentic journey through the marketplace. In an era where anyone can generate a million words of content in seconds, character and accountability become the ultimate competitive advantage.",

    "The technologies and platforms documented throughout this book will continue to evolve at breakneck velocity. New neural architectures will emerge, existing software tools will merge, and new social discovery algorithms will rise and fall across the digital landscape. Trying to maintain relevance by obsessively chasing every passing technological trend is an exhausting treadmill that leads to creative burnout and commercial distraction.",

    "Instead, anchor your enterprise to the timeless invariants of human nature: the universal desire for clarity amidst confusion, the hunger for authentic connection, the respect for genuine craftsmanship, and the willingness to reward individuals who solve painful problems with integrity. When your media machine is rooted in these foundational human truths, technological advancements become powerful tailwinds that accelerate your influence rather than threats that undermine it.",

    "Always remember that computational leverage is a multiplier of your existing character, not a substitute for it. If you approach content creation with laziness, deceit, or a purely mercenary desire to extract attention for quick financial gain, intelligent tools will simply amplify your mediocrity and accelerate your commercial ruin. But if you bring deep domain curiosity, relentless dedication to customer value, and uncompromising ethical standards, these same tools will transform your voice into an unstoppable force for good.",

    "Protect the sanctity of your creative sanctuary with unyielding discipline as your media conglomerate scales. Do not allow the demands of analytics dashboards, sponsorship obligations, and algorithmic metrics to detach you from the authentic wellspring of your craft. Continue reading profound literature, conducting deep investigative conversations, and spending quiet hours reflecting in solitude away from digital noise.",

    "Nurture your audience as a sacred community of human beings rather than abstract conversion metrics on a corporate balance sheet. Every subscriber, viewer, and client is a living person navigating their own career aspirations, family obligations, and personal fears. Treat their attention with the immense reverence it deserves, always delivering ten times more value than you ask for in return.",

    "Maintain rigorous humility as your reach expands and your revenues compound into seven figures. The commercial media world is filled with cautionary tales of creators who let audience applause distort their judgment, leading to public hubris and sudden downfall. Remain a perpetual student, celebrate your team achievements, and remember that true influence is measured by the tangible problems you resolve for others.",

    "As you close this book and step into your daily operational routine, let go of perfectionist hesitation. The digital landscape rewards those who execute with bold speed, learn from live audience feedback, and continuously refine their systems in public view. Do not wait for perfect conditions; publish your ideas, deploy your workflows, and build your publishing engine today.",

    "You now possess the complete architectural blueprint for building an elite, hybrid digital media machine in the age of intelligence. You have the context dossiers, the rapid drafting workflows, the multi-platform repurposing protocols, the monetization frameworks, and the brand defense strategies required to dominate your category.",

    "Step forward into the arena of digital commerce with quiet confidence, uncompromised integrity, and an indomitable work ethic. The modern world is desperately searching for leaders who speak with authentic wisdom, courageous clarity, and profound utility. Be that voice for your industry.",

    "May your publications inspire, your products transform, and your commercial enterprise thrive as an enduring testament to what is possible when human genius is amplified by intelligent leverage.",

    "The machine is ready; the tools are in your hands. Now, go forth and build a digital media empire that commands the attention, trust, and respect of the world.",

    "Never compromise your standards, never surrender your authentic voice, and never forget the sacred duty of delivering transformative truth to those who look to you for guidance.",

    "The future of media belongs to the courageous, the disciplined, and the authentic. Claim your destiny and make your mark upon the digital canvas of history.",

    "Step boldly into your commercial power, lead with honor and distinction, and continue building a commercial legacy that will endure across the decades to come.",

    "Your audience is waiting; begin your journey today with unwavering conviction and relentless purpose."
]

print("Validating Foreword and Epilogue for Book 4...")
validate_and_save("00-foreword.md", fw_title, fw_paras, min_words=1500, max_words=2200)
validate_and_save("99-epilogue.md", ep_title, ep_paras, min_words=1200, max_words=1700)
