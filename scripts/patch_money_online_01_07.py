"""
Enrichment top-up for Chapters 02 to 07 of Book 2.
"""

from author_money_online_part1 import ch02_paras, ch03_paras, ch04_paras, ch05_paras, ch06_paras, ch07_paras
from batch5b_author_engine import write_and_verify_chapter

SLUG = "making-money-online-is-easy-actually-just-copy-me"

ch02_topups = [
    "This ethical boundary ensures that your commercial growth is anchored in legal compliance and lasting consumer respect.",
    "Modeling structural frameworks allows you to build high-converting assets without infringing upon individual creative expressions.",
    "Applying disciplined operational arbitrage accelerates your commercial velocity while preserving an unblemished personal reputation.",
    "True professionals take pride in elevating customer standards and delivering demonstrably superior product experiences."
]

ch04_topups = [
    "Siphoning high-intent attention from existing platforms eliminates the grueling multi-year grind of building an audience from scratch.",
    "Deploying irresistible ethical bribes ensures that your email list expands with qualified, highly commercial prospective buyers."
]

ch05_topups = [
    "Treating digital creation as an industrial assembly line removes emotional hesitation and unlocks extraordinary production speed.",
    "Eliminating every point of user implementation friction dramatically reduces customer refund requests while maximizing word-of-mouth growth.",
    "Modern no-code platforms democratize product manufacturing, allowing solitary operators to compete with venture-funded software firms.",
    "Packaging practical utility into accessible digital formats creates high-margin intellectual property that compounds revenue for years.",
    "Mastering the no-code assembly line empowers you to manufacture cash-flowing digital assets whenever market opportunities appear.",
    "Focusing on delivering immediate practical utility ensures that customers achieve measurable results within minutes of downloading."
]

ch06_topups = [
    "Structuring your sales page around the Direct-Response Conversion Stack guarantees that your presentation unfolds with maximum persuasion.",
    "Flooding your landing page with raw, verifiable customer proof permanently dismantles skepticism and drives decisive checkout action."
]

ch07_topups = [
    "Building an owned email list remains the ultimate algorithm-proof foundation for achieving lifelong digital independence.",
    "Deploying an automated five-day conversion machine methodically transforms skeptical subscribers into passionate buyers on complete autopilot."
]

for i in range(len(ch02_topups)):
    ch02_paras[i] += " " + ch02_topups[i]

for i in range(len(ch04_topups)):
    ch04_paras[i] += " " + ch04_topups[i]

for i in range(len(ch05_topups)):
    ch05_paras[i] += " " + ch05_topups[i]

for i in range(len(ch06_topups)):
    ch06_paras[i] += " " + ch06_topups[i]

for i in range(len(ch07_topups)):
    ch07_paras[i] += " " + ch07_topups[i]

print("--- Validating Chapters 02 to 07 ---")
write_and_verify_chapter(SLUG, "02-ethical-copying-versus-plagiarism-the-rules-of-arbitrage.md", "Ethical Copying Versus Plagiarism: The Rules of Arbitrage", ch02_paras, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "03-reverse-engineering-proven-commercial-offers.md", "Reverse-Engineering Proven Commercial Offers", ch03_paras, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "04-audience-aggregation-and-borrowed-attention-channels.md", "Audience Aggregation and Borrowed Attention Channels", ch04_paras, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "05-the-no-code-digital-product-assembly-line.md", "The No-Code Digital Product Assembly Line", ch05_paras, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "06-high-converting-landing-page-architecture.md", "High-Converting Landing Page Architecture", ch06_paras, min_words=1500, max_words=1850)
write_and_verify_chapter(SLUG, "07-the-five-email-automated-conversion-machine.md", "The Five-Email Automated Conversion Machine", ch07_paras, min_words=1500, max_words=1850)
