import re
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from batch5b_author_engine import clean_paragraph

epilogue_exts = [
    "Stepping out of the employee mindset transforms your daily reality into an unconstrained landscape of boundless creative opportunity.",
    "Internal mastery and commercial competence ensure that you remain completely impervious to corporate layoffs and macroeconomic turbulence.",
    "The profound character transformation forged through entrepreneurship represents an asset far more valuable than the financial profits you collect.",
    "Taking complete ownership of your economic destiny liberates your family from the chronic anxiety of institutional dependency.",
    "Embracing early cold outreach friction and awkward discovery calls forges the hardened resilience of a seasoned commercial producer.",
    "Maintaining relentless outbound prospecting discipline even after achieving success protects your enterprise from the subtle rot of complacency.",
    "Treating client accounts as sacred commercial trusts ensures that your reputation as an elite producer spreads rapidly across the industry.",
    "Deploying profits to purchase lasting freedom rather than transient luxury goods provides the foundation for generational wealth creation.",
    "Guiding aspiring operators to achieve financial independence spreads the life-changing power of digital self-reliance across the world.",
    "Decade-long consistency in executing basic commercial fundamentals builds an insurmountable competitive moat that no rival can overcome.",
    "Viewing operational challenges and client negotiations as noble crucibles keeps your strategic instincts sharp, dangerous, and thriving.",
    "Mastering the full lifecycle of B2B service arbitrage equips you with an enduring commercial superpower that lasts for life.",
    "Transforming strategic knowledge into live client conversations bridges the gap between idle daydreaming and massive commercial wealth.",
    "Taking bold, immediate action in the marketplace separates the true commercial vanguard from the passive crowd of observers.",
    "The commercial arena belongs to those who dare to execute with unyielding conviction, integrity, and relentless daily momentum."
]

from patch_copypaste5k_epilogue import epilogue_expanded

final_epilogue = [p + " " + ext for p, ext in zip(epilogue_expanded, epilogue_exts)]
total_words = sum(len(p.split()) for p in final_epilogue)
print(f"Final Epilogue: {len(final_epilogue)} paras, {total_words} words")

with open("scripts/patch_copypaste5k_16_20.py", "r", encoding="utf-8") as f:
    text = f.read()

epilogue_str = "new_epilogue = '''epilogue_paras = [\n"
for p in final_epilogue:
    epilogue_str += f'    "{clean_paragraph(p)}",\n\n'
epilogue_str = epilogue_str.rstrip(",\n\n") + "\n]'''"

text = re.sub(r"new_epilogue = '''epilogue_paras = \[.*?\]'''", epilogue_str, text, flags=re.DOTALL)

with open("scripts/patch_copypaste5k_16_20.py", "w", encoding="utf-8") as f:
    f.write(text)

print("Updated patch_copypaste5k_16_20.py with final epilogue")
