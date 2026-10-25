import re

with open("src/lib/playbooks-data.ts", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add imports
new_imports = '''import { LEARN_THIS_SKILL_COURSE } from "./playbooks/learn-this-skill-win-next-years-data";
import { BUILD_1M_SOLO_FASTER_COURSE } from "./playbooks/build-1m-one-person-faster-ai-data";
import { THINK_STRATEGIC_GENIUS_COURSE } from "./playbooks/think-strategic-genius-5d-data";
import { USE_AI_BETTER_99_COURSE } from "./playbooks/use-ai-better-99-percent-data";
import { STUCK_IN_MATRIX_ESCAPE_COURSE } from "./playbooks/stuck-in-matrix-escape-data";
import { FIVE_YEARS_GET_RICH_AI_COURSE } from "./playbooks/five-years-get-rich-before-ai-data";
import { INVESTING_BEGINNERS_25M_COURSE } from "./playbooks/investing-beginners-25-mins-data";
import { LAZIEST_WAYS_AI_BEGINNERS_COURSE } from "./playbooks/laziest-ways-money-ai-beginners-data";
'''

target_import = 'import { MULTIPLE_INTERESTS_ONE_PERSON_COURSE } from "./playbooks/multiple-interests-one-person-data";\n'
assert target_import in content, "target_import not found"
content = content.replace(target_import, target_import + new_imports)

# 2. Add courses into COURSES
new_courses = '''  // 25. Learn This Skill If You Want To Win In The Next 2-3 Years
  "learn-this-skill-if-you-want-to-win-in-the-next-2-3-years": LEARN_THIS_SKILL_COURSE,
  "ai-businesses-25": LEARN_THIS_SKILL_COURSE,

  // 26. How To Build A $1M One-Person Business Faster With AI
  "how-to-build-a-1m-one-person-business-faster-with-ai": BUILD_1M_SOLO_FASTER_COURSE,
  "ai-businesses-26": BUILD_1M_SOLO_FASTER_COURSE,

  // 27. How To Think Like A Strategic Genius (5-Dimensional Thinking)
  "how-to-think-like-a-strategic-genius-5-dimensional-thinking": THINK_STRATEGIC_GENIUS_COURSE,
  "ai-businesses-27": THINK_STRATEGIC_GENIUS_COURSE,

  // 28. How To Use AI Better Than 99% Of People (This Changed My Life)
  "how-to-use-ai-better-than-99-of-people-this-changed-my-life": USE_AI_BETTER_99_COURSE,
  "ai-businesses-28": USE_AI_BETTER_99_COURSE,

  // 29. You're Stuck In The Matrix, Here's How You Escape
  "youre-stuck-in-the-matrix-heres-how-you-escape": STUCK_IN_MATRIX_ESCAPE_COURSE,
  "ai-businesses-29": STUCK_IN_MATRIX_ESCAPE_COURSE,

  // 30. You Have 5 Years to Get Rich Before AI Takes Over
  "you-have-5-years-to-get-rich-before-ai-takes-over": FIVE_YEARS_GET_RICH_AI_COURSE,
  "ai-businesses-30": FIVE_YEARS_GET_RICH_AI_COURSE,

  // 31. Investing For Beginners in 25 Minutes
  "investing-for-beginners-in-25-minutes": INVESTING_BEGINNERS_25M_COURSE,
  "ai-businesses-31": INVESTING_BEGINNERS_25M_COURSE,

  // 32. Laziest Ways to Make Money with AI (For Beginners)
  "laziest-ways-to-make-money-with-ai-for-beginners": LAZIEST_WAYS_AI_BEGINNERS_COURSE,
  "ai-businesses-32": LAZIEST_WAYS_AI_BEGINNERS_COURSE,
'''

target_courses = '  "ai-businesses-24": MULTIPLE_INTERESTS_ONE_PERSON_COURSE,\n'
assert target_courses in content, "target_courses not found"
content = content.replace(target_courses, target_courses + new_courses)

# 3. Add to getAllCourses array
new_get_all = ''',
    LEARN_THIS_SKILL_COURSE,
    BUILD_1M_SOLO_FASTER_COURSE,
    THINK_STRATEGIC_GENIUS_COURSE,
    USE_AI_BETTER_99_COURSE,
    STUCK_IN_MATRIX_ESCAPE_COURSE,
    FIVE_YEARS_GET_RICH_AI_COURSE,
    INVESTING_BEGINNERS_25M_COURSE,
    LAZIEST_WAYS_AI_BEGINNERS_COURSE'''

target_get_all = 'MULTIPLE_INTERESTS_ONE_PERSON_COURSE\n  ];'
if target_get_all not in content:
    target_get_all = 'MULTIPLE_INTERESTS_ONE_PERSON_COURSE,\n  ];'
if target_get_all not in content:
    target_get_all = 'MULTIPLE_INTERESTS_ONE_PERSON_COURSE'
    content = content.replace(target_get_all, target_get_all + new_get_all, 1)
else:
    content = content.replace(target_get_all, 'MULTIPLE_INTERESTS_ONE_PERSON_COURSE' + new_get_all + '\n  ];')

with open("src/lib/playbooks-data.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("playbooks-data.ts updated with Batch 4 courses successfully!")
