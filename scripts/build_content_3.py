import json
import os
import sys

# Add scripts directory to path
sys.path.append(os.path.dirname(__file__))

from module6_data import MODULE_06
from module7_data import MODULE_07

print(f"Loaded Module 06 with {len(MODULE_06)} lessons.")
print(f"Loaded Module 07 with {len(MODULE_07)} lessons.")

output_content = f"""import {{ Lesson }} from "@/lib/playbooks-data";

export interface ExtendedLesson extends Lesson {{
  learningObjective: string;
  writtenLesson: string;
  takeaway: string;
}}

// ==========================================
// MODULE 06: Client Acquisition & Partner Pitching
// ==========================================
export const MODULE_06_LESSONS: ExtendedLesson[] = {json.dumps(MODULE_06, indent=2)};

// ==========================================
// MODULE 07: The Solo Scaling Roadmap & Path to $10,000+/Month
// ==========================================
export const MODULE_07_LESSONS: ExtendedLesson[] = {json.dumps(MODULE_07, indent=2)};
"""

target_path = os.path.join(os.path.dirname(__file__), '../src/lib/ai-automations-content-3.ts')
with open(target_path, 'w', encoding='utf-8') as f:
    f.write(output_content)

print(f"Successfully generated {target_path}")
