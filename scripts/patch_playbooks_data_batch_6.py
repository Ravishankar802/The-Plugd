import re

file_path = "src/lib/playbooks-data.ts"
with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# 1. Imports to add
new_imports = """import { SALES_TACTIC_10M_COURSE } from "./playbooks/sales-tactic-god-tier-money-data";
import { THREE_TYPES_BUSINESSES_COURSE } from "./playbooks/three-types-profitable-businesses-data";
import { UNDERSTAND_LEADERSHIP_COURSE } from "./playbooks/understand-leadership-never-win-data";
import { BUILT_BUSINESS_AI_24H_COURSE } from "./playbooks/built-business-ai-24-hours-data";
import { COPY_PASTE_FIRST_5K_COURSE } from "./playbooks/copy-paste-strategy-first-5k-data";
import { SEVEN_REMOTE_JOBS_COURSE } from "./playbooks/seven-remote-jobs-from-home-data";
import { ASKED_AI_MAKE_MONEY_COURSE } from "./playbooks/asked-ai-make-money-possible-data";
import { BEST_BUSINESS_BOOKS_COURSE } from "./playbooks/best-business-books-7-billionaires-data";
import { HONEST_ADVICE_GET_RICH_COURSE } from "./playbooks/honest-advice-want-get-rich-data";
import { FACELESS_SHORTS_30K_COURSE } from "./playbooks/faceless-shorts-30k-month-data";
import { BUILD_10K_WEBSITES_CLAUDE_COURSE } from "./playbooks/build-10k-websites-claude-ai-data";
import { MASTER_HIGGSFIELD_AI_COURSE } from "./playbooks/master-higgsfield-ai-tutorial-data";
"""

target_import = 'import { EIGHTEEN_YEARS_UGLY_ADVICE_COURSE } from "./playbooks/eighteen-years-ugly-advice-data";\n'
if target_import in text:
    text = text.replace(target_import, target_import + new_imports)
else:
    print("WARNING: target_import not found")

# 2. Entries in COURSES mapping
new_entries = """  "want-to-made-god-tier-money-use-this-sales-tactic-made-me-10m": SALES_TACTIC_10M_COURSE,
  "ai-businesses-41": SALES_TACTIC_10M_COURSE,
  "there-are-only-3-types-of-profitable-businesses-pick-one": THREE_TYPES_BUSINESSES_COURSE,
  "ai-businesses-42": THREE_TYPES_BUSINESSES_COURSE,
  "if-you-dont-understand-leadership-youll-never-win": UNDERSTAND_LEADERSHIP_COURSE,
  "ai-businesses-43": UNDERSTAND_LEADERSHIP_COURSE,
  "i-built-a-business-with-ai-in-24-hours": BUILT_BUSINESS_AI_24H_COURSE,
  "ai-businesses-44": BUILT_BUSINESS_AI_24H_COURSE,
  "copy-paste-this-strategy-to-make-your-first-5-000-online": COPY_PASTE_FIRST_5K_COURSE,
  "ai-businesses-45": COPY_PASTE_FIRST_5K_COURSE,
  "7-remote-jobs-you-can-do-from-home": SEVEN_REMOTE_JOBS_COURSE,
  "ai-businesses-46": SEVEN_REMOTE_JOBS_COURSE,
  "i-asked-ai-to-make-me-as-much-money-as-possible": ASKED_AI_MAKE_MONEY_COURSE,
  "ai-businesses-47": ASKED_AI_MAKE_MONEY_COURSE,
  "these-are-the-best-business-books-to-read-7-billionaire-books": BEST_BUSINESS_BOOKS_COURSE,
  "ai-businesses-48": BEST_BUSINESS_BOOKS_COURSE,
  "my-honest-advice-to-someone-who-wants-to-get-rich": HONEST_ADVICE_GET_RICH_COURSE,
  "ai-businesses-49": HONEST_ADVICE_GET_RICH_COURSE,
  "the-30k-month-al-faceless-shorts-method-nobodys-talking-about": FACELESS_SHORTS_30K_COURSE,
  "ai-businesses-50": FACELESS_SHORTS_30K_COURSE,
  "how-to-build-10k-websites-in-minutes-claude-ai": BUILD_10K_WEBSITES_CLAUDE_COURSE,
  "ai-businesses-51": BUILD_10K_WEBSITES_CLAUDE_COURSE,
  "master-higgsfield-ai-in-20-minutes-beginner-tutorial": MASTER_HIGGSFIELD_AI_COURSE,
  "ai-businesses-52": MASTER_HIGGSFIELD_AI_COURSE,
"""

target_entry = '  "ai-businesses-40": EIGHTEEN_YEARS_UGLY_ADVICE_COURSE,\n'
if target_entry in text:
    text = text.replace(target_entry, target_entry + new_entries)
else:
    print("WARNING: target_entry not found")

# 3. Entries in getAllCourses
all_courses_additions = """    TRADING_212_GUIDE_COURSE,
    SIDE_HUSTLES_STUDENTS_2026_COURSE,
    MAKING_MONEY_ONLINE_EASY_COURSE,
    FIRST_10K_TEEN_COURSE,
    ONLY_INVESTING_VIDEO_100_COURSE,
    SEVEN_PROVEN_WAYS_AI_NO_EXP_COURSE,
    ACTUALLY_LOCK_IN_GUIDE_COURSE,
    EIGHTEEN_YEARS_UGLY_ADVICE_COURSE,
    SALES_TACTIC_10M_COURSE,
    THREE_TYPES_BUSINESSES_COURSE,
    UNDERSTAND_LEADERSHIP_COURSE,
    BUILT_BUSINESS_AI_24H_COURSE,
    COPY_PASTE_FIRST_5K_COURSE,
    SEVEN_REMOTE_JOBS_COURSE,
    ASKED_AI_MAKE_MONEY_COURSE,
    BEST_BUSINESS_BOOKS_COURSE,
    HONEST_ADVICE_GET_RICH_COURSE,
    FACELESS_SHORTS_30K_COURSE,
    BUILD_10K_WEBSITES_CLAUDE_COURSE,
    MASTER_HIGGSFIELD_AI_COURSE
"""

target_all = "    LAZIEST_WAYS_AI_BEGINNERS_COURSE\n  ];"
replacement_all = "    LAZIEST_WAYS_AI_BEGINNERS_COURSE,\n" + all_courses_additions + "  ];"

if target_all in text:
    text = text.replace(target_all, replacement_all)
else:
    print("WARNING: target_all not found")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(text)

print("playbooks-data.ts patched successfully!")
