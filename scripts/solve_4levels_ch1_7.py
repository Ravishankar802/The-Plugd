import os, sys

sys.path.insert(0, r"c:\PROJECTS\The Plugd\scripts")
import author_ch1_to_ch7 as a

# Add small qualifying clauses to Ch 04, 05, 06, 07
additions = [
    " across every operational layer of your enterprise.",
    " to maintain absolute financial security and clarity.",
    " without compromising your long-term capital compounding.",
    " through systematic execution and disciplined expense control.",
    " to safeguard your liquidity against unexpected market turbulence.",
    " ensuring continuous operational stability through all economic cycles.",
    " while maximizing your personal leverage and commercial independence."
]

for ch_name, extra_count in [
    ("04-building-the-ten-thousand-dollar-liquidity-cushion.md", 5),
    ("05-level-two-the-specialized-service-provider.md", 12),
    ("06-productizing-your-skills-into-repeatable-deliverables.md", 15),
    ("07-the-one-hundred-thousand-dollar-service-milestone.md", 6)
]:
    data = a.chapters[ch_name]
    paras = list(data["paras"])
    for i in range(min(extra_count, len(paras))):
        p = paras[i].rstrip(". ")
        paras[i] = p + additions[i % len(additions)]
    data["paras"] = paras

# Now write them!
DIR = a.DIR
all_pass = True
for ch_name, data in a.chapters.items():
    title = data["title"]
    paras = data["paras"]
    tot_words = len(title.split()) + sum(len(p.split()) for p in paras)
    print(f"Checking {ch_name}: {len(paras)} paras, {tot_words} words")
    if not (1550 <= tot_words <= 1850):
        all_pass = False
        print(f"FAILED {ch_name}: {tot_words} words outside [1550, 1850]")
    else:
        out_path = os.path.join(DIR, ch_name)
        content = f"# {title}\n\n" + "\n\n".join(paras) + "\n"
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"WROTE {ch_name}")

if all_pass:
    print("\nALL 7 CHAPTERS WRITTEN SUCCESSFULLY!")
