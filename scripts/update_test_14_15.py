with open('tests/populated-24-playbooks.test.cjs', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace ai-businesses-14 and 15 counts
old_14 = '''    id: "ai-businesses-14",
    slug: "i-locked-myself-in-a-room-until-i-built-a-350-000-mo-business",
    title: "I Locked Myself In a Room Until I Built a $350,000/mo Business",
    dataFile: "src/lib/playbooks/locked-in-room-350k-data.ts",
    detailFile: "src/lib/playbooks/locked-in-room-350k-detail.ts",
    routeDir: "src/app/i-locked-myself-in-a-room-until-i-built-a-350-000-mo-business",
    expectedModules: 6,
    expectedLessons: 24,
    expectedSlides: 96'''

new_14 = '''    id: "ai-businesses-14",
    slug: "i-locked-myself-in-a-room-until-i-built-a-350-000-mo-business",
    title: "I Locked Myself In a Room Until I Built a $350,000/mo Business",
    dataFile: "src/lib/playbooks/locked-in-room-350k-data.ts",
    detailFile: "src/lib/playbooks/locked-in-room-350k-detail.ts",
    routeDir: "src/app/i-locked-myself-in-a-room-until-i-built-a-350-000-mo-business",
    expectedModules: 8,
    expectedLessons: 32,
    expectedSlides: 128'''

old_15 = '''    id: "ai-businesses-15",
    slug: "the-4-levels-to-getting-rich-in-2026",
    title: "The 4 Levels To Getting RICH in 2026",
    dataFile: "src/lib/playbooks/four-levels-getting-rich-2026-data.ts",
    detailFile: "src/lib/playbooks/four-levels-getting-rich-2026-detail.ts",
    routeDir: "src/app/the-4-levels-to-getting-rich-in-2026",
    expectedModules: 8,
    expectedLessons: 32,
    expectedSlides: 128'''

new_15 = '''    id: "ai-businesses-15",
    slug: "the-4-levels-to-getting-rich-in-2026",
    title: "The 4 Levels To Getting RICH in 2026",
    dataFile: "src/lib/playbooks/four-levels-getting-rich-2026-data.ts",
    detailFile: "src/lib/playbooks/four-levels-getting-rich-2026-detail.ts",
    routeDir: "src/app/the-4-levels-to-getting-rich-in-2026",
    expectedModules: 6,
    expectedLessons: 24,
    expectedSlides: 96'''

assert old_14 in text, "old_14 not found"
assert old_15 in text, "old_15 not found"

text = text.replace(old_14, new_14).replace(old_15, new_15)

with open('tests/populated-24-playbooks.test.cjs', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated 14 and 15 successfully!')
