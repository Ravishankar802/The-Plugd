import os

files_to_update = [
    "src/lib/playbooks-catalog.ts",
    "src/lib/playbooks/become-millionaire-2026-full-blueprint-data.ts",
    "src/lib/playbooks/become-millionaire-2026-full-blueprint-detail.ts",
    "src/app/if-i-wanted-to-become-a-millionaire-in-2026-this-is-what-id-do-full-blueprint/page.tsx",
    "tests/populated-54-playbooks.test.cjs",
    "scripts/generate_playbook_54.py",
    "scripts/patch_catalog_playbook_54.py",
    "scripts/generate_populated_54_test.py"
]

target_phrase = " [FULL BLUEPRINT]"

for rel_path in files_to_update:
    if not os.path.exists(rel_path):
        continue
    with open(rel_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    count1 = content.count(target_phrase)
    content = content.replace(target_phrase, "")
    
    # Just in case without leading space
    count2 = content.count("[FULL BLUEPRINT]")
    content = content.replace("[FULL BLUEPRINT]", "")
    
    with open(rel_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print(f"Updated {rel_path}: replaced {count1 + count2} occurrences")

print("All occurrences of [FULL BLUEPRINT] removed!")
