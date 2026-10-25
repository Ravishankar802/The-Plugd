import json
import os
import sys

sys.path.append(os.path.dirname(__file__))

from enrich_all_modules import enrich_slide, clean_written_lesson
from module4_data import MODULE_04
from module5_data import MODULE_05
from module6_data import MODULE_06
from module7_data import MODULE_07

# Also load MODULE_03 from build_content_2.py
with open('scripts/build_content_2.py', 'r', encoding='utf-8') as f:
    code = f.read()

# We can execute build_content_2 up to MODULE_03
local_vars = {'__file__': os.path.abspath('scripts/build_content_2.py')}
exec(compile(code, 'build_content_2.py', 'exec'), local_vars)
MODULE_03 = local_vars['MODULE_03']

print("Loaded MODULE_03 with", len(MODULE_03), "lessons.")
print("Loaded MODULE_04 with", len(MODULE_04), "lessons.")
print("Loaded MODULE_05 with", len(MODULE_05), "lessons.")
print("Loaded MODULE_06 with", len(MODULE_06), "lessons.")
print("Loaded MODULE_07 with", len(MODULE_07), "lessons.")

def process_module(mod_list, mod_idx):
    processed = []
    for l_idx, lesson in enumerate(mod_list):
        slides = lesson.get("slides", [])
        enriched_slides = []
        for s_idx, slide in enumerate(slides):
            enriched_slides.append(enrich_slide(slide, mod_idx, l_idx, s_idx))
            
        written = clean_written_lesson(lesson.get("writtenLesson", ""))
        summary = clean_written_lesson(lesson.get("summary", ""))
        objective = clean_written_lesson(lesson.get("learningObjective", ""))
        takeaway = clean_written_lesson(lesson.get("takeaway", ""))
        title = clean_written_lesson(lesson.get("title", ""))
        
        lesson["slides"] = enriched_slides
        lesson["writtenLesson"] = written
        lesson["summary"] = summary
        lesson["learningObjective"] = objective
        lesson["takeaway"] = takeaway
        lesson["title"] = title
        processed.append(lesson)
    return processed

PROC_M03 = process_module(MODULE_03, 3)
PROC_M04 = process_module(MODULE_04, 4)
PROC_M05 = process_module(MODULE_05, 5)
PROC_M06 = process_module(MODULE_06, 6)
PROC_M07 = process_module(MODULE_07, 7)

# Write ai-automations-content-2.ts
content_2 = f"""import {{ Lesson }} from "@/lib/playbooks-data";

export interface ExtendedLesson extends Lesson {{
  learningObjective: string;
  writtenLesson: string;
  takeaway: string;
}}

// ==========================================
// MODULE 03: Business #2 — The AI Creative & Short-Form Content Studio
// ==========================================
export const MODULE_03_LESSONS: ExtendedLesson[] = {json.dumps(PROC_M03, indent=2)};

// ==========================================
// MODULE 04: Business #3 — AI Shadow Operating for Micro-Creators
// ==========================================
export const MODULE_04_LESSONS: ExtendedLesson[] = {json.dumps(PROC_M04, indent=2)};

// ==========================================
// MODULE 05: The AI Shadow Operator Launch & Monetization Engine
// ==========================================
export const MODULE_05_LESSONS: ExtendedLesson[] = {json.dumps(PROC_M05, indent=2)};
"""

target_path_2 = os.path.join(os.path.dirname(__file__), '../src/lib/ai-automations-content-2.ts')
with open(target_path_2, 'w', encoding='utf-8') as f:
    f.write(content_2)
print("Updated src/lib/ai-automations-content-2.ts successfully!")

# Write ai-automations-content-3.ts
content_3 = f"""import {{ Lesson }} from "@/lib/playbooks-data";

export interface ExtendedLesson extends Lesson {{
  learningObjective: string;
  writtenLesson: string;
  takeaway: string;
}}

// ==========================================
// MODULE 06: Client Acquisition & Partner Pitching (Zero Ad Spend)
// ==========================================
export const MODULE_06_LESSONS: ExtendedLesson[] = {json.dumps(PROC_M06, indent=2)};

// ==========================================
// MODULE 07: The Solo Scaling Roadmap & Path to $10,000+/Month
// ==========================================
export const MODULE_07_LESSONS: ExtendedLesson[] = {json.dumps(PROC_M07, indent=2)};
"""

target_path_3 = os.path.join(os.path.dirname(__file__), '../src/lib/ai-automations-content-3.ts')
with open(target_path_3, 'w', encoding='utf-8') as f:
    f.write(content_3)
print("Updated src/lib/ai-automations-content-3.ts successfully!")
