file_path = "src/lib/playbooks-data.ts"
with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# 1. Import
target_import = 'import { MASTER_HIGGSFIELD_AI_COURSE } from "./playbooks/master-higgsfield-ai-tutorial-data";'
new_import = target_import + '\nimport { STARTED_OVER_ZERO_TO_1M_COURSE } from "./playbooks/started-over-zero-plan-to-1m-data";'
if 'STARTED_OVER_ZERO_TO_1M_COURSE' not in text:
    text = text.replace(target_import, new_import)

# 2. COURSES mapping
target_mapping = '"ai-businesses-52": MASTER_HIGGSFIELD_AI_COURSE,'
new_mapping = target_mapping + '\n  "if-i-started-over-with-0-heres-my-exact-plan-to-get-to-1m": STARTED_OVER_ZERO_TO_1M_COURSE,\n  "ai-businesses-53": STARTED_OVER_ZERO_TO_1M_COURSE,'
if '"ai-businesses-53"' not in text:
    text = text.replace(target_mapping, new_mapping)

# 3. getAllCourses
target_all = 'MASTER_HIGGSFIELD_AI_COURSE'
# Replace the last occurrence in getAllCourses
idx_last = text.rfind(target_all)
if idx_last != -1:
    end_bracket = text.find('];', idx_last)
    if 'STARTED_OVER_ZERO_TO_1M_COURSE' not in text[idx_last:end_bracket]:
        text = text[:idx_last + len(target_all)] + ',\n    STARTED_OVER_ZERO_TO_1M_COURSE' + text[idx_last + len(target_all):]

with open(file_path, "w", encoding="utf-8") as f:
    f.write(text)

print("playbooks-data.ts patched successfully for Playbook 53!")
