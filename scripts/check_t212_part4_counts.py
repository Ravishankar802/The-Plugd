import sys, os
sys.path.insert(0, os.path.abspath('.'))
from scripts.author_t212_part4 import ch16_paras, ch17_paras, ch18_paras, ch19_paras, ch20_paras, epilogue_paras

for name, paras, target in [("ch16", ch16_paras, 1500), ("ch17", ch17_paras, 1500), ("ch18", ch18_paras, 1500), ("ch19", ch19_paras, 1500), ("ch20", ch20_paras, 1500), ("epilogue", epilogue_paras, 1200)]:
    w = sum(len(p.split()) for p in paras)
    print(f"{name}: {len(paras)} paras, {w} words (target {target})")
