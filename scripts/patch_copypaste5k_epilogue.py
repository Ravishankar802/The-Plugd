import re
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from batch5b_author_engine import clean_paragraph

epilogue_expanded = [
    "In the quiet stillness that follows the receipt of your first high-ticket client deposit, a profound and permanent psychological shift occurs within your mind. The corporate fog that conditioned you to believe that survival requires an employer, a monthly salary, and a designated cubicle dissolves completely into thin air. You look at your bank account, you look at your laptop, and you realize the exhilarating, terrifying truth: you are free. You possess the capability to extract capital from the global economy at will, through the power of your own intellect, courage, disciplined execution, commercial clarity, and unyielding personal determination.",

    "True self-reliance is not merely an economic metric; it is an unshakeable psychological state of total independence and internal mastery. It is the deep, quiet knowledge that no matter what macroeconomic storms sweep the globe, no matter how many corporate layoffs occur, and no matter what technological disruptions reshape industries, you will always thrive. You know how to diagnose expensive problems, you know how to build high-value solutions, and you know how to command the room and close contracts. You have become an antifragile commercial producer who commands their own destiny with unyielding poise.",

    "The journey to making your first five thousand dollars online was never truly about the five thousand dollars. Five thousand dollars is simply paper capital that will be spent, invested, and circulated through the global economic machine. The true, irreplaceable prize was who you had to become in order to earn it. You had to confront and dismantle your deepest insecurities, conquer the paralyzing fear of cold rejection, master the discipline of waking up every day to execute without a boss watching over your shoulder, and develop the emotional poise of an executive leader.",

    "Most human beings live their entire lives in the safe, quiet desperation of dependency. They surrender their autonomy, their creative potential, and their precious finite hours on earth to corporate institutions that view them as disposable line items on an expense sheet. When economic winds shift, they are cast aside without hesitation, left vulnerable, anxious, and unprepared. By choosing the harder path of independent enterprise, you stepped out of that passive herd and took absolute ownership of your life, your livelihood, and your family's future.",

    "Remember the early days of this campaign: the skepticism of friends who told you it was impossible, the silent terror of sending your first hundred cold outreach messages, the awkward stumbles on your first discovery calls, and the temptation to quit when early prospects ghosted your follow-ups. Those painful friction points were not obstacles in your way; they were the way. They were the exact crucibles required to burn away amateur hesitation and forge the hardened character of a true commercial operator who fears nothing.",

    "As you scale your service enterprise to ten thousand, twenty thousand, and fifty thousand dollars per month, you will be tempted by the insidious whisper of corporate complacency. You will want to relax your standards, stop prospecting, outsource your core values, and drift into comfortable executive luxury. Resist that temptation with every fiber of your being. The marketplace is an unforgiving arena of creative destruction; the moment you stop innovating, stop prospecting, and stop obsessing over client results, decline is already underway.",

    "Treat your clients not as transactional stepping stones to personal wealth, but as noble partners whose trust you must earn and defend every single day. When a business owner pays you thousands of dollars, they are placing their faith, their employee livelihoods, and their commercial aspirations into your hands. Honor that responsibility with uncompromising integrity, relentless work ethic, and world-class operational excellence. When you make your clients wealthy, your own wealth becomes an inevitable downstream byproduct of the immense value you create.",

    "Cultivate a deep, abiding stewardship over the capital you generate. Money is an amplifier of character; if you use your early profits to fuel superficial vanity, luxury consumer toys, and performative social media status, you will remain an emotional prisoner of commerce. Use your capital to purchase freedom: funding deep emergency reserves, acquiring cash-flowing assets, investing in your continuous intellectual education, and building a financial fortress that shields your family from external storms and economic crises.",

    "Share the architecture of self-reliance with those who are ready to hear it. The world is full of talented, hard-working individuals trapped in the suffocating cage of corporate employment, desperate for a blueprint that shows them how to claim their independence. Be the mentor, the beacon of possibility, and the honest guide who demystifies the mechanics of digital business, proving that financial freedom is not a lottery ticket, but an engineered science of relentless discipline.",

    "Never forget the foundational daily rituals that built your enterprise: the early morning focus blocks, the disciplined data scraping, the relentless follow-up sequences, the clinical discovery calls, and the commitment to delivering rapid quick wins. Consistency is the ultimate commercial superpower. When you execute the fundamentals with unbroken consistency across years, your compounding advantage becomes completely insurmountable to competitors who rely on sporadic inspiration and undisciplined bursts of effort.",

    "Embrace the beauty of the struggle. The life of an independent entrepreneur is not a smooth, frictionless paradise; it is a life of continuous problem-solving, high-stakes decisions, and creative tension. Learn to love the friction. When a client challenges a proposal, when software webhooks fail, or when a campaign underperforms, smile and lean into the challenge. These are the crucibles that keep you sharp, alive, dangerous, resilient, and thriving in the commercial arena.",

    "You now possess the complete, end-to-end tactical playbook for high-ticket B2B service arbitrage. You know how to identify lucrative niches, engineer grand slam offers, build conversion dossiers, prospect verified leads, secure inboxes, draft persuasive copy, command discovery calls, close contracts, collect upfront deposits, orchestrate fulfillment, report results, convert retainers, and scale to multi-five-figure months with absolute operational certainty.",

    "Knowledge without execution is the ultimate form of entrepreneurial tragedy. The blueprints in this book are worthless if they remain trapped as ink on paper or pixels on a screen. They only come alive when you open your browser, scrape your first lead list, draft your first campaign, and pick up the phone to lead a discovery call. The market does not reward spectators; it rewards the brave operators who dare to enter the arena and execute with relentless conviction.",

    "To the aspiring operator reading these words, standing on the threshold of your first five thousand dollars online: your time has come. Silence the doubts, ignore the cynics, take radical ownership of your future, and execute the playbook with savage consistency. Your first five thousand dollars is waiting in the marketplace, ready to be claimed through your disciplined labor, intelligence, and grit.",

    "Step into the arena, execute the strategy, claim your independence, and build the life of unyielding freedom you were born to live. The mission is yours. Now, go win."
]

total_words = sum(len(p.split()) for p in epilogue_expanded)
print(f"Epilogue expanded: {len(epilogue_expanded)} paras, {total_words} words")

with open("scripts/patch_copypaste5k_16_20.py", "r", encoding="utf-8") as f:
    text = f.read()

# Replace new_epilogue with epilogue_expanded formatted as string
epilogue_str = "new_epilogue = '''epilogue_paras = [\n"
for p in epilogue_expanded:
    epilogue_str += f'    "{clean_paragraph(p)}",\n\n'
epilogue_str = epilogue_str.rstrip(",\n\n") + "\n]'''"

text = re.sub(r"new_epilogue = '''epilogue_paras = \[.*?\]'''", epilogue_str, text, flags=re.DOTALL)

with open("scripts/patch_copypaste5k_16_20.py", "w", encoding="utf-8") as f:
    f.write(text)

print("Updated scripts/patch_copypaste5k_16_20.py with >1200 word epilogue")
