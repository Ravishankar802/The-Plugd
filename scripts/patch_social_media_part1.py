"""
Author Foreword and Chapters 01 to 05 for Book 2:
'how-to-become-rich-with-social-media-my-exact-playbook'
Strict validation: Foreword 18 paras (1500-1850 words), Ch01-Ch05 17 paras each (1500-1850 words).
Zero banned words.
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from batch6_author_engine import write_and_verify_chapter, clean_paragraph
from author_social_media_part1 import fw_title, fw_base, fw_exts, ch01_title, ch01_base, ch01_exts
from build_social_media_part1_full import (
    fw_boost, ch01_p17, full_ch01_base, full_ch01_exts, ch01_boost,
    ch02_title, ch02_base, ch02_exts, ch02_boost,
    ch03_title, ch03_base, ch03_exts, ch03_boost,
    ch04_title, ch04_base, ch04_exts, ch04_boost,
    ch05_title, ch05_base, ch05_exts, ch05_boost
)

SLUG = "how-to-become-rich-with-social-media-my-exact-playbook"

# For ch04: base has 16, exts has 17. Add 1 base para (making 17 each).
ch04_p17 = "In conclusion, engineering an irreplaceable core narrative identity elevates your media properties into a Category of One. By synthesizing a unique analytical lens, contrarian truth-telling, and distinct aesthetic cadence, you command profound commercial loyalty and establish an unassailable media brand."
full_ch04_base = ch04_base + [ch04_p17]
full_ch04_exts = ch04_exts
full_ch04_boost = ch04_boost

# For ch05: base has 15, exts has 17. Add 2 base paras (making 17 each).
ch05_p16 = "Establish structured demographic benchmarking targets for your production team. Every quarter, audit your analytics to ensure that your US audience share remains above fifty percent, your twenty-five-to-fifty-four age bracket remains above seventy percent, and your average view duration exceeds eighty percent. Explicit demographic targets keep your creative team focused on commercial value rather than vanity views."
ch05_p17 = "In conclusion, demographic precision is the mathematical multiplier of media wealth. By deliberately calibrating your topics, vocabulary, and pacing to attract affluent Tier-One decision-makers, you construct a high-value media property that captures premium advertising rates and converts views into substantial enterprise capital."
full_ch05_base = ch05_base + [ch05_p16, ch05_p17]
full_ch05_exts = ch05_exts
full_ch05_boost = ch05_boost

f_fw = [clean_paragraph(b + " " + e + " " + x) for b, e, x in zip(fw_base, fw_exts, fw_boost)]
f_ch01 = [clean_paragraph(b + " " + e + " " + x) for b, e, x in zip(full_ch01_base, full_ch01_exts, ch01_boost)]
f_ch02 = [clean_paragraph(b + " " + e + " " + x) for b, e, x in zip(ch02_base, ch02_exts, ch02_boost)]
f_ch03 = [clean_paragraph(b + " " + e + " " + x) for b, e, x in zip(ch03_base, ch03_exts, ch03_boost)]
f_ch04 = [clean_paragraph(b + " " + e + " " + x) for b, e, x in zip(full_ch04_base, full_ch04_exts, full_ch04_boost)]
f_ch05 = [clean_paragraph(b + " " + e + " " + x) for b, e, x in zip(full_ch05_base, full_ch05_exts, full_ch05_boost)]

if __name__ == '__main__':
    print("--- Verifying word counts for Foreword and Chapters 01 to 05 ---")
    for name, ch in [('fw', f_fw), ('ch01', f_ch01), ('ch02', f_ch02), ('ch03', f_ch03), ('ch04', f_ch04), ('ch05', f_ch05)]:
        print(f"{name}: {len(ch)} paras, {sum(len(p.split()) for p in ch)} words")

    print("\n--- Writing and verifying Foreword and Chapters 01 to 05 ---")
    write_and_verify_chapter(SLUG, "00-foreword.md", fw_title, f_fw, min_words=1500, max_words=1850)
    write_and_verify_chapter(SLUG, "01-the-great-divergence-vanity-metrics-versus-enterprise-equity.md", ch01_title, f_ch01, min_words=1500, max_words=1850)
    write_and_verify_chapter(SLUG, "02-the-attention-liquidity-spectrum-views-trust-and-transaction-velocity.md", ch02_title, f_ch02, min_words=1500, max_words=1850)
    write_and_verify_chapter(SLUG, "03-selecting-high-yield-commercial-niches-escaping-entertainment-poverty.md", ch03_title, f_ch03, min_words=1500, max_words=1850)
    write_and_verify_chapter(SLUG, "04-the-core-narrative-identity-engineering-irreplaceable-market-positioning.md", ch04_title, f_ch04, min_words=1500, max_words=1850)
    write_and_verify_chapter(SLUG, "05-audience-demographics-the-mathematics-of-high-net-worth-reach.md", ch05_title, f_ch05, min_words=1500, max_words=1850)
    print("Foreword and Chapters 01 to 05 all successfully written and verified!")
