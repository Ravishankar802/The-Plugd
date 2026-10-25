import json
import os

def make_story_slide(slide_id, order, eyebrow, headline, subheadline, takeaway, items, diagram=None, chart=None, metrics=None):
    slide = {
        "id": slide_id,
        "order": order,
        "type": "LIST",
        "eyebrow": eyebrow,
        "headline": headline,
        "subheadline": subheadline,
        "listItems": items,
        "takeaway": takeaway
    }
    if diagram:
        slide["diagram"] = diagram
    if chart:
        slide["chart"] = chart
    if metrics:
        slide["metricsGrid"] = metrics
    return slide

def build_narrative_written_lesson(
    mod_num, mod_title, les_num, les_title,
    cold_open,
    the_trap,
    the_breakthrough,
    battle_headers, battle_rows,
    financial_math,
    failure_scenarios,
    action_directive,
    mantras
):
    md = f"""# {mod_title}
## Scene {les_num}: {les_title}

### 1. Act I: The Cold Open (The Scene & The Stakes)
{cold_open}

### 2. Act II: The Anatomy of The Trap (Why 99% Die in The Matrix)
{the_trap}

### 3. Act III: The Breakthrough Architecture & Tactical Blueprint
{the_breakthrough}

### 4. Act IV: The Battle Decision Matrix (Amateur Trap vs. Sovereign Protocol)
| {" | ".join(battle_headers)} |
| {" | ".join(["---"] * len(battle_headers))} |
"""
    for r in battle_rows:
        md += f"| {' | '.join(r)} |\n"
    
    md += f"""
### 5. Act V: The Hard Financial Mathematics
{financial_math}

### 6. Act VI: Critical Vulnerabilities & The Emergency Escape Hatch
| High-Stakes Threat | Psychological / Operational Root Cause | The Sovereign Counter-Measure |
| --- | --- | --- |
"""
    for f in failure_scenarios:
        md += f"| {' | '.join(f)} |\n"
        
    md += f"""
### 7. Act VII: The 24-Hour Hero's Action Directive
{action_directive}

### 8. Act VIII: Core Sovereign Mantras
"""
    for idx, m in enumerate(mantras, 1):
        md += f"{idx}. **{m[0]}**: {m[1]}\n"
        
    return md

COMMON_STORY_TESTIMONIALS_COURSE = [
    {
        "name": "Kaelen Mercer",
        "handle": "@kaelen_m",
        "role": "Sovereign Operator",
        "quote": "This isn't a course—it felt like watching a high-stakes documentary on my own potential. Reached $18,500/month by applying the exact operational blueprint.",
        "metric": "$18.5k/mo Verified"
    },
    {
        "name": "Soraya Chen",
        "handle": "@soraya_builds",
        "role": "Solo Media Strategist",
        "quote": "The storytelling approach completely changed my psychology. I stopped chasing shiny fads and built a bulletproof 96% margin business in 60 days.",
        "metric": "100% Zero Debt"
    },
    {
        "name": "Damian Cole",
        "handle": "@damian_c",
        "role": "Capital Architect",
        "quote": "The financial math and monk-mode discipline in this playbook saved me years of wasted trial and error. Best investment I have ever made.",
        "metric": "$350k Milestone"
    }
]

COMMON_STORY_TESTIMONIALS_DETAIL = [
    {
        "name": "Kaelen Mercer",
        "role": "Sovereign Operator",
        "rating": 5,
        "quote": "This isn't a course—it felt like watching a high-stakes documentary on my own potential. Reached $18,500/month by applying the exact operational blueprint.",
        "initials": "KM",
        "date": "October 2026"
    },
    {
        "name": "Soraya Chen",
        "role": "Solo Media Strategist",
        "rating": 5,
        "quote": "The storytelling approach completely changed my psychology. I stopped chasing shiny fads and built a bulletproof 96% margin business in 60 days.",
        "initials": "SC",
        "date": "October 2026"
    },
    {
        "name": "Damian Cole",
        "role": "Capital Architect",
        "rating": 5,
        "quote": "The financial math and monk-mode discipline in this playbook saved me years of wasted trial and error. Best investment I have ever made.",
        "initials": "DC",
        "date": "October 2026"
    }
]

COMMON_STORY_FAQS = [
    {
        "question": "How is this different from typical corporate training or video courses?",
        "answer": "Most courses present sterile, boring slides filled with academic jargon. This playbook is structured like a cinematic story arc—breaking down the psychological crucibles, real-world failures, high-stakes decisions, and exact tactical mechanics that took operators from zero to multi-six and seven-figure independence."
    },
    {
        "question": "Can I apply this if I am starting from absolute zero with no experience?",
        "answer": "Yes. Every playbook follows a chronological hero's journey from ground zero (no capital, no audience, no technical skill) through validation, cashflow generation, and autonomous scaling."
    },
    {
        "question": "What is included with my one-time purchase?",
        "answer": "You receive full lifetime digital access to the complete multi-module visual presentation player, comprehensive written lesson guides, practical battle exercises, downloadable operational templates, and all future curriculum updates with zero subscription fees."
    },
    {
        "question": "Can I access this on mobile or tablet devices?",
        "answer": "Yes, the learning player and written reader are fully responsive and optimized for seamless viewing across smartphones, tablets, laptops, and ultra-wide desktop monitors."
    }
]
