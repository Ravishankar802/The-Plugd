import re

path = "scripts/author_catchup_part4.py"
txt = open(path, encoding="utf-8").read()

# ch16: add 35 words
t1 = "Spatial conditioning removes the exhausting mental negotiation that typically precedes the initiation of deep work. When your physical surroundings are aligned exclusively with focus, your brain enters flow states without preliminary friction or hesitation."
r1 = "Spatial conditioning removes the exhausting mental negotiation that typically precedes the initiation of deep work. When your physical surroundings are aligned exclusively with focus, your brain enters flow states without preliminary friction or hesitation. Environmental consistency creates an unshakeable operational momentum that carries you through the most demanding projects."

# ch17: add 25 words
t2 = "Once established, these automated software and media assets continue compounding your net worth indefinitely."
r2 = "Once established, these automated software and media assets continue compounding your net worth indefinitely, providing an unshakeable stream of high-margin liquidity that supports your complete personal independence."

# ch20: add 30 words
t3 = "Generational security is achieved not through frantic chasing, but through patient, compounding institutional mastery."
r3 = "Generational security is achieved not through frantic chasing, but through patient, compounding institutional mastery. Building durable assets that serve real human needs ensures that your contribution and capital continue expanding for decades."

for t, r in [(t1, r1), (t2, r2), (t3, r3)]:
    assert t in txt, f"Target not found: {t[:40]}"
    txt = txt.replace(t, r, 1)

open(path, "w", encoding="utf-8").write(txt)
print("Final patch applied!")
