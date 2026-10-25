with open("tests/populated-32-playbooks.test.cjs", "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
curr_mod = None
for line in lines:
    if "expectedModules:" in line:
        curr_mod = int(line.split(":")[1].strip().replace(",", ""))
    if "expectedLessons:" in line and curr_mod is not None:
        correct_lessons = curr_mod * 4
        new_lines.append(f"    expectedLessons: {correct_lessons},\n")
        continue
    new_lines.append(line)

with open("tests/populated-32-playbooks.test.cjs", "w", encoding="utf-8") as f:
    f.writelines(new_lines)
print("Updated test file successfully")
