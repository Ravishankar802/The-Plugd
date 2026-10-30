import os, re

path = "scripts/author_catchup_part2.py"
txt = open(path, encoding="utf-8").read()

# Let's inspect the word counts of ch07, ch08, ch09, ch10 before writing by parsing the arrays directly:
def extract_paras(var_name, text):
    m = re.search(rf"{var_name}\s*=\s*\[(.*?)\]\s*\n\s*ch", text, re.DOTALL)
    if not m:
        m = re.search(rf"{var_name}\s*=\s*\[(.*?)\]\s*\n\s*print", text, re.DOTALL)
    raw = m.group(1)
    paras = re.findall(r'"([^"\\]*(?:\\.[^"\\]*)*)"', raw)
    return paras

ch07 = extract_paras("ch07_paras", txt)
ch08 = extract_paras("ch08_paras", txt)
ch09 = extract_paras("ch09_paras", txt)
ch10 = extract_paras("ch10_paras", txt)

print("ch07:", len(ch07), "paras,", sum(len(p.split()) for p in ch07), "words")
print("ch08:", len(ch08), "paras,", sum(len(p.split()) for p in ch08), "words")
print("ch09:", len(ch09), "paras,", sum(len(p.split()) for p in ch09), "words")
print("ch10:", len(ch10), "paras,", sum(len(p.split()) for p in ch10), "words")
