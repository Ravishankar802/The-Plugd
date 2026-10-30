from author_investing_01_05_v2 import ch01_paras, ch02_paras, fw_paras
from batch5b_author_engine import clean_paragraph

def stats(name, paras):
    paras = [clean_paragraph(p) for p in paras]
    total = sum(len(p.split()) for p in paras)
    print(f"{name}: {len(paras)} paras, {total} words (avg {total/len(paras):.1f})")

stats("fw", fw_paras)
stats("ch01", ch01_paras)
stats("ch02", ch02_paras)
