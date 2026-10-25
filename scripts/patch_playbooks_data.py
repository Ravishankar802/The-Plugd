with open('src/lib/playbooks-data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

import_target = 'import { ONE_PERSON_BUSINESS_COURSE } from "./playbooks/one-person-business-data";'
new_imports = """import { ONE_PERSON_BUSINESS_COURSE } from "./playbooks/one-person-business-data";
import { LAZIEST_WAY_500_DAY_COURSE } from "./playbooks/laziest-way-500-day-data";
import { BLUEPRINT_0_TO_1M_COURSE } from "./playbooks/blueprint-0-to-1m-data";
import { FIRST_1M_IS_SIMPLE_COURSE } from "./playbooks/first-1m-is-simple-data";
import { MONEY_PRINCIPLES_20S_COURSE } from "./playbooks/money-principles-20s-data";
import { BORING_MILLIONAIRES_2026_COURSE } from "./playbooks/boring-millionaires-2026-data";
import { LOCKED_IN_ROOM_350K_COURSE } from "./playbooks/locked-in-room-350k-data";
import { FOUR_LEVELS_GETTING_RICH_2026_COURSE } from "./playbooks/four-levels-getting-rich-2026-data";
import { AI_REVOLUTION_8_WAYS_COURSE } from "./playbooks/ai-revolution-8-ways-data";"""

assert import_target in text, "import_target not found"
text = text.replace(import_target, new_imports)

courses_target = '  "build-a-one-person-business-as-a-beginner-from-0-to-10k": ONE_PERSON_BUSINESS_COURSE,\n  "ai-businesses-08": ONE_PERSON_BUSINESS_COURSE,'
new_courses = """  "build-a-one-person-business-as-a-beginner-from-0-to-10k": ONE_PERSON_BUSINESS_COURSE,
  "ai-businesses-08": ONE_PERSON_BUSINESS_COURSE,

  // 9. Laziest Way to Make Money Online in 2026 ($500/day)
  "laziest-way-to-make-money-online-in-2026-500-day": LAZIEST_WAY_500_DAY_COURSE,
  "ai-businesses-09": LAZIEST_WAY_500_DAY_COURSE,

  // 10. The Blueprint To Go From $0 To $1,000,000
  "the-blueprint-to-go-from-0-to-1000000": BLUEPRINT_0_TO_1M_COURSE,
  "ai-businesses-10": BLUEPRINT_0_TO_1M_COURSE,

  // 11. Your First $1M Is Simple (Here's How)
  "your-first-1m-is-simple-heres-how": FIRST_1M_IS_SIMPLE_COURSE,
  "ai-businesses-11": FIRST_1M_IS_SIMPLE_COURSE,

  // 12. The 5 Money Principles that will make anyone RICH in their 20s
  "the-5-money-principles-that-will-make-anyone-rich-in-their-20s": MONEY_PRINCIPLES_20S_COURSE,
  "ai-businesses-12": MONEY_PRINCIPLES_20S_COURSE,

  // 13. It's Boring, But Will Make Even Beginners Millionaires in 2026
  "its-boring-but-will-make-even-beginners-millionaires-in-2026": BORING_MILLIONAIRES_2026_COURSE,
  "ai-businesses-13": BORING_MILLIONAIRES_2026_COURSE,

  // 14. I Locked Myself In a Room Until I Built a $350,000/mo Business
  "i-locked-myself-in-a-room-until-i-built-a-350-000-mo-business": LOCKED_IN_ROOM_350K_COURSE,
  "ai-businesses-14": LOCKED_IN_ROOM_350K_COURSE,

  // 15. The 4 Levels To Getting RICH in 2026
  "the-4-levels-to-getting-rich-in-2026": FOUR_LEVELS_GETTING_RICH_2026_COURSE,
  "the-4-levels-to-getting-rich-in-2023": FOUR_LEVELS_GETTING_RICH_2026_COURSE,
  "ai-businesses-15": FOUR_LEVELS_GETTING_RICH_2026_COURSE,

  // 16. The A.I. Revolution: 8 Ways to get RICH
  "the-a-i-revolution-8-ways-to-get-rich": AI_REVOLUTION_8_WAYS_COURSE,
  "ai-businesses-16": AI_REVOLUTION_8_WAYS_COURSE,"""

assert courses_target in text, "courses_target not found"
text = text.replace(courses_target, new_courses)

all_target = '    COPY_PASTE_13K_COURSE,\n    ONE_PERSON_BUSINESS_COURSE,\n  ];'
new_all = """    COPY_PASTE_13K_COURSE,
    ONE_PERSON_BUSINESS_COURSE,
    LAZIEST_WAY_500_DAY_COURSE,
    BLUEPRINT_0_TO_1M_COURSE,
    FIRST_1M_IS_SIMPLE_COURSE,
    MONEY_PRINCIPLES_20S_COURSE,
    BORING_MILLIONAIRES_2026_COURSE,
    LOCKED_IN_ROOM_350K_COURSE,
    FOUR_LEVELS_GETTING_RICH_2026_COURSE,
    AI_REVOLUTION_8_WAYS_COURSE,
  ];"""

assert all_target in text, "all_target not found"
text = text.replace(all_target, new_all)

with open('src/lib/playbooks-data.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print("Successfully updated src/lib/playbooks-data.ts with Batch 2 playbooks!")
