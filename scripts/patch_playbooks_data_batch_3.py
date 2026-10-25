data_path = "src/lib/playbooks-data.ts"

with open(data_path, "r", encoding="utf-8") as f:
    c = f.read()

# 1. Imports
import_marker = 'import { AI_REVOLUTION_8_WAYS_COURSE } from "./playbooks/ai-revolution-8-ways-data";'
new_imports = """import { AI_REVOLUTION_8_WAYS_COURSE } from "./playbooks/ai-revolution-8-ways-data";
import { TURNED_300_TO_100K_COURSE } from "./playbooks/turned-300-to-100k-data";
import { RICH_WITH_SOCIAL_MEDIA_COURSE } from "./playbooks/rich-with-social-media-data";
import { GET_RICH_SERVICE_BUSINESSES_COURSE } from "./playbooks/get-rich-service-businesses-data";
import { NEW_WAY_CONTENT_AI_COURSE } from "./playbooks/new-way-content-ai-data";
import { CATCH_UP_IN_LIFE_LOGIC_COURSE } from "./playbooks/catch-up-in-life-logic-data";
import { PERFECT_BUSINESS_5_THINGS_COURSE } from "./playbooks/perfect-business-5-things-data";
import { USE_AI_IN_BUSINESS_2026_COURSE } from "./playbooks/use-ai-in-business-2026-data";
import { MULTIPLE_INTERESTS_ONE_PERSON_COURSE } from "./playbooks/multiple-interests-one-person-data";"""

c = c.replace(import_marker, new_imports)

# 2. COURSES mapping
courses_marker = '  "ai-businesses-16": AI_REVOLUTION_8_WAYS_COURSE,\n'
new_courses = """  "ai-businesses-16": AI_REVOLUTION_8_WAYS_COURSE,

  // 17. How I turned $300 to $100,000 At 19 (My Side Hustles)
  "how-i-turned-300-to-100-000-at-19-my-side-hustles": TURNED_300_TO_100K_COURSE,
  "ai-businesses-17": TURNED_300_TO_100K_COURSE,

  // 18. How to become rich with social media (my exact playbook)
  "how-to-become-rich-with-social-media-my-exact-playbook": RICH_WITH_SOCIAL_MEDIA_COURSE,
  "ai-businesses-18": RICH_WITH_SOCIAL_MEDIA_COURSE,

  // 19. How to Get Rich for Service-Based Businesses (Thank Me Later)
  "how-to-get-rich-for-service-based-businesses-thank-me-later": GET_RICH_SERVICE_BUSINESSES_COURSE,
  "ai-businesses-19": GET_RICH_SERVICE_BUSINESSES_COURSE,

  // 20. The New Way of Making Content In The Age of AI
  "the-new-way-of-making-content-in-the-age-of-ai": NEW_WAY_CONTENT_AI_COURSE,
  "ai-businesses-20": NEW_WAY_CONTENT_AI_COURSE,

  // 21. How to Catch Up In Life (Using Logic)
  "how-to-catch-up-in-life-using-logic": CATCH_UP_IN_LIFE_LOGIC_COURSE,
  "ai-businesses-21": CATCH_UP_IN_LIFE_LOGIC_COURSE,

  // 22. What Makes The Perfect Business (5 Things)
  "what-makes-the-perfect-business-5-things": PERFECT_BUSINESS_5_THINGS_COURSE,
  "ai-businesses-22": PERFECT_BUSINESS_5_THINGS_COURSE,

  // 23. How to Use AI in Your Business in 2026
  "how-to-use-ai-in-your-business-in-2026": USE_AI_IN_BUSINESS_2026_COURSE,
  "ai-businesses-23": USE_AI_IN_BUSINESS_2026_COURSE,

  // 24. If You Have Multiple Interests, Please Start a One-Person Business
  "if-you-have-multiple-interests-please-start-a-one-person-business": MULTIPLE_INTERESTS_ONE_PERSON_COURSE,
  "ai-businesses-24": MULTIPLE_INTERESTS_ONE_PERSON_COURSE,
"""

c = c.replace(courses_marker, new_courses)

# 3. getAllCourses list
list_marker = '    AI_REVOLUTION_8_WAYS_COURSE,\n  ];'
new_list = """    AI_REVOLUTION_8_WAYS_COURSE,
    TURNED_300_TO_100K_COURSE,
    RICH_WITH_SOCIAL_MEDIA_COURSE,
    GET_RICH_SERVICE_BUSINESSES_COURSE,
    NEW_WAY_CONTENT_AI_COURSE,
    CATCH_UP_IN_LIFE_LOGIC_COURSE,
    PERFECT_BUSINESS_5_THINGS_COURSE,
    USE_AI_IN_BUSINESS_2026_COURSE,
    MULTIPLE_INTERESTS_ONE_PERSON_COURSE,
  ];"""

c = c.replace(list_marker, new_list)

with open(data_path, "w", encoding="utf-8") as f:
    f.write(c)

print("Updated playbooks-data.ts with Batch 3 courses!")
