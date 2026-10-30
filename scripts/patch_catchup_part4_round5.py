import re

path = "scripts/author_catchup_part4.py"
txt = open(path, encoding="utf-8").read()

# ch16: add 15 words
t1 = "Environmental consistency creates an unshakeable operational momentum that carries you through the most demanding projects."
r1 = "Environmental consistency creates an unshakeable operational momentum that carries you through the most demanding projects and complex analytical problem solving."

# ch17: add 10 words
t2 = "providing an unshakeable stream of high-margin liquidity that supports your complete personal independence."
r2 = "providing an unshakeable stream of high-margin liquidity that supports your complete personal independence and long-term autonomy."

# ch20: add 10 words
t3 = "Building durable assets that serve real human needs ensures that your contribution and capital continue expanding for decades."
r3 = "Building durable assets that serve real human needs ensures that your contribution and capital continue expanding for decades with compounding strength."

for t, r in [(t1, r1), (t2, r2), (t3, r3)]:
    assert t in txt, f"Target not found: {t[:40]}"
    txt = txt.replace(t, r, 1)

open(path, "w", encoding="utf-8").write(txt)
print("Round 5 patch applied!")
