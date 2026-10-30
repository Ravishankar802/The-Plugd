import sys, os
sys.path.insert(0, os.path.abspath('.'))
from scripts.author_t212_part3 import ch11_paras, ch12_paras, ch13_paras, ch14_paras, ch15_paras

for name, paras in [("ch11", ch11_paras), ("ch12", ch12_paras), ("ch13", ch13_paras), ("ch14", ch14_paras), ("ch15", ch15_paras)]:
    w = sum(len(p.split()) for p in paras)
    print(f"{name}: {len(paras)} paras, {w} words")
