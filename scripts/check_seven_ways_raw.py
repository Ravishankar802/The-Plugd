import sys, os
sys.path.insert(0, os.path.abspath('.'))

import scripts.author_seven_ways_part1 as p1
import scripts.author_seven_ways_part2 as p2
import scripts.author_seven_ways_part3 as p3
import scripts.author_seven_ways_part4 as p4

chapters = [
    ("foreword", p1.foreword_paras, 1500),
    ("ch01", p1.ch01_paras, 1500),
    ("ch02", p1.ch02_paras, 1500),
    ("ch03", p1.ch03_paras, 1500),
    ("ch04", p1.ch04_paras, 1500),
    ("ch05", p1.ch05_paras, 1500),
    ("ch06", p2.ch06_paras, 1500),
    ("ch07", p2.ch07_paras, 1500),
    ("ch08", p2.ch08_paras, 1500),
    ("ch09", p2.ch09_paras, 1500),
    ("ch10", p2.ch10_paras, 1500),
    ("ch11", p3.ch11_paras, 1500),
    ("ch12", p3.ch12_paras, 1500),
    ("ch13", p3.ch13_paras, 1500),
    ("ch14", p3.ch14_paras, 1500),
    ("ch15", p3.ch15_paras, 1500),
    ("ch16", p4.ch16_paras, 1500),
    ("ch17", p4.ch17_paras, 1500),
    ("ch18", p4.ch18_paras, 1500),
    ("ch19", p4.ch19_paras, 1500),
    ("ch20", p4.ch20_paras, 1500),
    ("epilogue", p4.epilogue_paras, 1200)
]

for name, paras, target in chapters:
    # clean original text by stripping any extra_sentences
    cleaned = []
    for p in paras:
        for ex in p1.extra_sentences:
            p = p.replace(ex, "")
        cleaned.append(p)
    w = sum(len(p.split()) for p in cleaned)
    print(f"{name}: {len(paras)} paras, raw words={w}, target={target}, diff={target - w}")
