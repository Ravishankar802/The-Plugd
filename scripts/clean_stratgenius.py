import os, re, glob

DIR = r"c:\PROJECTS\The Plugd\book-manuscripts\how-to-think-like-a-strategic-genius-5-dimensional-thinking"

# 1. Fix banned words in Ch 02 and Ch 03
ch2_path = os.path.join(DIR, "02-what-separates-great-strategists-from-operators.md")
with open(ch2_path, "r", encoding="utf-8") as f:
    text2 = f.read()
text2 = re.sub(r'\bsovereign\b', 'ultimate', text2, flags=re.I)
with open(ch2_path, "w", encoding="utf-8") as f:
    f.write(text2)

ch3_path = os.path.join(DIR, "03-dimension-one-second-and-third-order-consequences.md")
with open(ch3_path, "r", encoding="utf-8") as f:
    text3 = f.read()
text3 = re.sub(r'\basymmetric\b', 'high-leverage', text3, flags=re.I)
with open(ch3_path, "w", encoding="utf-8") as f:
    f.write(text3)

print("Fixed banned terms in Ch 2 and 3!")

# 2. Check duplicate shingles
files = sorted([f for f in glob.glob(os.path.join(DIR, "*.md")) if "outline" not in f])
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
for f1, f2, s in dupes[:10]:
    print(f"{f1} vs {f2}: {s}")

