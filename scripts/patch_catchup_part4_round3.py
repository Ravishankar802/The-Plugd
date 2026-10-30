import re

path = "scripts/author_catchup_part4.py"
txt = open(path, encoding="utf-8").read()

# ch16: add 50 words
t1 = "Spatial conditioning removes the exhausting mental negotiation that typically precedes the initiation of deep work."
r1 = "Spatial conditioning removes the exhausting mental negotiation that typically precedes the initiation of deep work. When your physical surroundings are aligned exclusively with focus, your brain enters flow states without preliminary friction or hesitation."

# ch17: add 35 words
t2 = "Digital intellectual property represents the definitive mechanical bridge separating exhausted freelancers from true enterprise architects."
r2 = "Digital intellectual property represents the definitive mechanical bridge separating exhausted freelancers from true enterprise architects. Once established, these automated software and media assets continue compounding your net worth indefinitely."

# ch18: add 15 words
t3 = "Clinical problem formulation removes the paralyzing shame of failure and allows you to iterate with unshakeable tactical focus."
r3 = "Clinical problem formulation removes the paralyzing shame of failure and allows you to iterate with unshakeable tactical focus and clinical precision under pressure."

# ch20: add 40 words
t4 = "When your commercial offerings solve enduring human problems with technological excellence, your enterprise becomes an immovable pillar of value."
r4 = "When your commercial offerings solve enduring human problems with technological excellence, your enterprise becomes an immovable pillar of value. Generational security is achieved not through frantic chasing, but through patient, compounding institutional mastery."

for t, r in [(t1, r1), (t2, r2), (t3, r3), (t4, r4)]:
    assert t in txt, f"Target not found: {t[:40]}"
    txt = txt.replace(t, r, 1)

open(path, "w", encoding="utf-8").write(txt)
print("Round 3 patch applied successfully!")
