import sys, os
sys.path.insert(0, os.path.abspath('.'))
import scripts.expand_t212_part4 as exp

# print lengths without asserting
for name, paras, target in [
    ("ch16", exp.p4.ch16_paras, 1500),
    ("ch17", exp.p4.ch17_paras, 1500),
    ("ch18", exp.p4.ch18_paras, 1500),
    ("ch19", exp.p4.ch19_paras, 1500),
    ("ch20", exp.p4.ch20_paras, 1500),
    ("epilogue", exp.p4.epilogue_paras, 1200)
]:
    w = sum(len(p.split()) for p in paras)
    print(f"{name}: {w} words (target {target}, diff {w - target})")
