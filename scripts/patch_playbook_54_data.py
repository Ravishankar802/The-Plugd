file_path = "src/lib/playbooks-data.ts"
with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# 1. Import
target_import = 'import { STARTED_OVER_ZERO_TO_1M_COURSE } from "./playbooks/started-over-zero-plan-to-1m-data";'
new_import = target_import + '\nimport { BECOME_MILLIONAIRE_2026_BLUEPRINT_COURSE } from "./playbooks/become-millionaire-2026-full-blueprint-data";'
if 'BECOME_MILLIONAIRE_2026_BLUEPRINT_COURSE' not in text:
    text = text.replace(target_import, new_import)

# 2. COURSES mapping
target_mapping = '"ai-businesses-53": STARTED_OVER_ZERO_TO_1M_COURSE,'
new_mapping = target_mapping + '\n  "if-i-wanted-to-become-a-millionaire-in-2026-this-is-what-id-do-full-blueprint": BECOME_MILLIONAIRE_2026_BLUEPRINT_COURSE,\n  "ai-businesses-54": BECOME_MILLIONAIRE_2026_BLUEPRINT_COURSE,'
if '"ai-businesses-54"' not in text:
    text = text.replace(target_mapping, new_mapping)

# 3. getAllCourses
target_all = 'STARTED_OVER_ZERO_TO_1M_COURSE'
idx_last = text.rfind(target_all)
if idx_last != -1:
    end_bracket = text.find('];', idx_last)
    if 'BECOME_MILLIONAIRE_2026_BLUEPRINT_COURSE' not in text[idx_last:end_bracket]:
        text = text[:idx_last + len(target_all)] + ',\n    BECOME_MILLIONAIRE_2026_BLUEPRINT_COURSE' + text[idx_last + len(target_all):]

with open(file_path, "w", encoding="utf-8") as f:
    f.write(text)

print("playbooks-data.ts patched successfully for Playbook 54!")
