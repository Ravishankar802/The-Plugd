import json
import os
import sys

sys.path.append(os.path.dirname(__file__))

import test_m1_m2_assembly as m1
import build_full_module1_and_2 as m2

MODULE_01 = [
    {
        "id": "01-1", "number": "1.1", "title": "The Death of the 20-Person Agency & The Solopreneur Advantage",
        "duration": "14m",
        "summary": "Understand how AI and visual automation allow a solo operator to produce the output of an 8-person agency while keeping 95%+ net profit margins.",
        "learningObjective": "Analyze the structural collapse of high-overhead traditional agencies, compare net take-home margins, and master the 4 cornerstones of solo operational sovereignty.",
        "takeaway": "Stop measuring business success by headcount; true modern leverage is maximizing net take-home profit with zero employee payroll.",
        "slides": m1.m01_l1_slides, "writtenLesson": m1.m01_l1_written
    },
    {
        "id": "01-2", "number": "1.2", "title": "The $10,000+/Month Unit Economics Model: Math, Margins & Offer Architecture",
        "duration": "15m",
        "summary": "Deconstruct the exact mathematical pathways to $10,000/month: comparing client retainers, setup fees, and revenue-share splits with realistic margins and cost structures.",
        "learningObjective": "Master the rigorous unit economics required to net $10,000+/month, evaluate 4 distinct pricing models, and maintain an audited monthly software overhead under $250.",
        "takeaway": "Stop searching for complex financial models; $10k/month is a simple math equation: 4 retainers at $2,500 or 1 high-leverage creator launch.",
        "slides": m1.m01_l2_slides, "writtenLesson": m1.m01_l2_written
    },
    {
        "id": "01-3", "number": "1.3", "title": "The 5-Criteria Business Evaluation Framework",
        "duration": "15m",
        "summary": "Evaluate any AI business opportunity using Difficulty, Time Intensity, Scalability, Income Potential, and Stress Level before writing a single line of code.",
        "learningObjective": "Deploy the 5-dimensional scoring matrix across AAA, Content Studios, and Shadow Operating to objectively select the highest-ROI model for your personal profile.",
        "takeaway": "Never choose a business model based on hype; score every opportunity across Difficulty, Time, Scalability, Income, and Stress.",
        "slides": m1.m01_l3_slides, "writtenLesson": m1.m01_l3_written
    },
    {
        "id": "01-4", "number": "1.4", "title": "Selecting Your Ideal AI Model: Skills, Capital & Risk Alignment",
        "duration": "14m",
        "summary": "Map your technical skills, capital constraints, and risk tolerance to the ideal business archetype, and commit to a single model for 30 days.",
        "learningObjective": "Diagnose your solopreneur archetype, launch with under $70 in startup tools, and execute a 30-day focus protocol to sign your first paying client.",
        "takeaway": "Commit to one avatar, one offer, and one vehicle for 30 unbroken days; momentum compounds only through relentless consistency.",
        "slides": m1.m01_l4_slides, "writtenLesson": m1.m01_l4_written
    }
]

MODULE_02 = m2.MODULE_02

output_content = f"""import {{ Lesson }} from "@/lib/playbooks-data";

export interface ExtendedLesson extends Lesson {{
  learningObjective: string;
  writtenLesson: string;
  takeaway: string;
}}

// ==========================================
// MODULE 01: Foundations & The 5-Criteria Business Evaluation Framework
// ==========================================
export const MODULE_01_LESSONS: ExtendedLesson[] = {json.dumps(MODULE_01, indent=2)};

// ==========================================
// MODULE 02: Business #1 — The AI Workflow Automation Agency (AAA)
// ==========================================
export const MODULE_02_LESSONS: ExtendedLesson[] = {json.dumps(MODULE_02, indent=2)};
"""

target_path = os.path.join(os.path.dirname(__file__), '../src/lib/ai-automations-content-1.ts')
with open(target_path, 'w', encoding='utf-8') as f:
    f.write(output_content)

print(f"Successfully generated {target_path}!")
