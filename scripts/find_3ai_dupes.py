import os, glob

dir_path = r"c:\PROJECTS\The Plugd\book-manuscripts\3-best-ai-businesses-to-start-before-2027-and-the-one-id-start-today"
files = sorted([f for f in glob.glob(os.path.join(dir_path, "*.md")) if "outline" not in f])

seen = {}
dupes = []

for f in files:
    with open(f, "r", encoding="utf-8") as fp:
        text = fp.read()
    words = text.replace("#", "").split()
    fname = os.path.basename(f)
    for i in range(len(words) - 11):
        shingle = " ".join(words[i:i+12]).lower()
        if shingle in seen:
            dupes.append((seen[shingle], fname, shingle))
        else:
            seen[shingle] = fname

print(f"Total duplicate shingles: {len(dupes)}")
for f1, f2, s in dupes[:15]:
    print(f"{f1} vs {f2}: {s}")
