import re

path = "scripts/author_catchup_part3_full.py"
txt = open(path, encoding="utf-8").read()

# Expand ch12 para 3
target_ch12_p3 = 'At a seventy-five percent savings rate, every single calendar year of disciplined execution buys you three full years of total financial independence.'
repl_ch12_p3 = 'At a seventy-five percent savings rate, every single calendar year of disciplined execution buys you three full years of total financial independence. This mathematical velocity creates an unshakeable psychological advantage, transforming what previously felt like an endless marathon into a short, intense sprint toward permanent autonomy.'
assert target_ch12_p3 in txt, "ch12 p3 target not found"
txt = txt.replace(target_ch12_p3, repl_ch12_p3, 1)

# Expand ch13 paras
target_ch13_p1 = 'if the hardware is compromised, the software will inevitably crash.'
repl_ch13_p1 = 'if the hardware is compromised, the software will inevitably crash. Attempting to push through severe biological debt produces only cognitive sludge, emotional irritability, and low-quality decisions that multiply errors.'
assert target_ch13_p1 in txt
txt = txt.replace(target_ch13_p1, repl_ch13_p1, 1)

target_ch13_p2 = 'starved of restorative sleep and essential nutrients.'
repl_ch13_p2 = 'starved of restorative sleep and essential nutrients. When metabolic health is systematically neglected, executive stamina collapses by early afternoon, leaving the individual incapable of executing the high-order problem solving required to break free from stagnation.'
assert target_ch13_p2 in txt
txt = txt.replace(target_ch13_p2, repl_ch13_p2, 1)

target_ch13_p5 = 'when your brain is starved of steady fuel.'
repl_ch13_p5 = 'when your brain is starved of steady fuel. This neurochemical rollercoaster shatters your sustained attention span, forcing you into reactive snacking and fragmented thinking that destroys deep analytical focus.'
assert target_ch13_p5 in txt
txt = txt.replace(target_ch13_p5, repl_ch13_p5, 1)

target_ch13_p6 = 'blood flow centered in the brain.'
repl_ch13_p6 = 'blood flow centered in the brain. Stable blood sugar provides a calm, continuous hum of mental clarity from dawn until dusk, eliminating the post-lunch energy crashes that paralyze ordinary corporate employees.'
assert target_ch13_p6 in txt
txt = txt.replace(target_ch13_p6, repl_ch13_p6, 1)

target_ch13_p7 = 'directly stimulating neurogenesis in the hippocampus.'
repl_ch13_p7 = 'directly stimulating neurogenesis in the hippocampus. Regular cardiovascular training actively stimulates neurogenesis and elevates levels of brain-derived neurotrophic factor, effectively expanding your capacity to learn complex technical skills under high operational pressure.'
assert target_ch13_p7 in txt
txt = txt.replace(target_ch13_p7, repl_ch13_p7, 1)

target_ch13_p8 = 'armor that protects against fatigue.'
repl_ch13_p8 = 'armor that protects against fatigue. Physical strength anchors psychological resilience, ensuring you remain calm and composed during intense commercial negotiations.'
assert target_ch13_p8 in txt
txt = txt.replace(target_ch13_p8, repl_ch13_p8, 1)

# Expand ch14 paras
target_ch14_p2 = 'personal growth stalls every time they make progress.'
repl_ch14_p2 = 'personal growth stalls every time they make progress. Breaking away from comfortable social drift requires confronting the fear of being misunderstood, judged, or labeled as obsessed by people who have chosen passive entertainment over personal mastery.'
assert target_ch14_p2 in txt
txt = txt.replace(target_ch14_p2, repl_ch14_p2, 1)

target_ch14_p3 = 'people who feel threatened by your ambition.'
repl_ch14_p3 = 'people who feel threatened by your ambition. Every low-agency conversation filled with cynicism and complaint acts like an invisible friction brake on your ambition, gradually eroding your belief in what is possible.'
assert target_ch14_p3 in txt
txt = txt.replace(target_ch14_p3, repl_ch14_p3, 1)

target_ch14_p4 = 'pull you back down into the bucket.'
repl_ch14_p4 = 'pull you back down into the bucket. Recognizing these negative relational dynamics without anger or judgment is the essential diagnostic step that enables rational personal reconstruction and long-term protection of your trajectory.'
assert target_ch14_p4 in txt
txt = txt.replace(target_ch14_p4, repl_ch14_p4, 1)

open(path, "w", encoding="utf-8").write(txt)
print("Updated author_catchup_part3_full.py successfully!")
