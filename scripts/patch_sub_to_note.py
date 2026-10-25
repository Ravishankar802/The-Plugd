import glob

# Fix in scripts/generate_batch_2_playbooks.py
with open("scripts/generate_batch_2_playbooks.py", "r", encoding="utf-8") as f:
    gen_content = f.read()

gen_content = gen_content.replace('"sub": "Zero bloated staff overhead"', '"note": "Zero bloated staff overhead"')
gen_content = gen_content.replace('"sub": "Consistent asynchronous cash"', '"note": "Consistent asynchronous cash"')
gen_content = gen_content.replace('"sub": "Rapid validation sprint"', '"note": "Rapid validation sprint"')
gen_content = gen_content.replace('"sub": "Total geographic independence"', '"note": "Total geographic independence"')

with open("scripts/generate_batch_2_playbooks.py", "w", encoding="utf-8") as f:
    f.write(gen_content)
print("Updated scripts/generate_batch_2_playbooks.py")

# Fix across all generated data files
files = glob.glob("src/lib/playbooks/*-data.ts")
for fp in files:
    with open(fp, "r", encoding="utf-8") as f:
        c = f.read()
    if '"sub":' in c:
        c = c.replace('"sub":', '"note":')
        with open(fp, "w", encoding="utf-8") as f:
            f.write(c)
        print(f"Patched 'sub' -> 'note' in {fp}")
