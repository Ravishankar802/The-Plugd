import json
import os

def make_rich_slide(slide_id, order, eyebrow, headline, subheadline, takeaway, items, diagram=None, chart=None, metrics=None):
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

def build_written_lesson(mod_num, mod_title, les_num, les_title, context, steps, table_headers, table_rows, economics, failure_rows, exercise, takeaways):
    md = f"""# Module {mod_num}: {mod_title}
## Lesson {les_num}: {les_title}

### 1. Executive Overview & Strategic Context
{context}

### 2. Step-by-Step Implementation Architecture
{steps}

### 3. Decision Matrix & Strategic Trade-Off Analysis
| {" | ".join(table_headers)} |
| {" | ".join(["---"] * len(table_headers))} |
"""
    for r in table_rows:
        md += f"| {' | '.join(r)} |\n"
    
    md += f"""
### 4. Unit Economics & The $10,000/Month Financial Model
{economics}

### 5. Failure Modes, Edge Cases & Diagnostic Troubleshooting
| Vulnerability / Failure Mode | Root Cause | Systemic Prevention & Mitigation |
| --- | --- | --- |
"""
    for f in failure_rows:
        md += f"| {' | '.join(f)} |\n"
        
    md += f"""
### 6. Practical Implementation Exercise & Actionable Protocol
{exercise}

### 7. Core Takeaways & Mental Models
"""
    for idx, t in enumerate(takeaways, 1):
        md += f"{idx}. **{t[0]}**: {t[1]}\n"
        
    return md

COURSE_TESTIMONIALS = [
    {
        "name": "Marcus Vance",
        "handle": "@marcus_v",
        "role": "Solo Systems Operator",
        "quote": "Following these exact zero-ad methods allowed me to sign my first 3 B2B retainers in under 3 weeks. No ad spend, pure profit.",
        "metric": "$6,000/mo MRR"
    },
    {
        "name": "Elena Rostova",
        "handle": "@elena_ai",
        "role": "Automation Consultant",
        "quote": "The written lessons provide more tactical depth than multi-thousand dollar courses. Everything is mathematically grounded.",
        "metric": "10x Productivity"
    }
]

# For PlaybookDetailData interface
DETAIL_TESTIMONIALS = [
    {
        "name": "Marcus Vance",
        "role": "Solo Systems Operator",
        "rating": 5,
        "quote": "Following these exact zero-ad methods allowed me to sign my first 3 B2B retainers in under 3 weeks. No ad spend, pure profit.",
        "initials": "MV",
        "date": "October 2026"
    },
    {
        "name": "Elena Rostova",
        "role": "Automation Consultant",
        "rating": 5,
        "quote": "The written lessons provide more tactical depth than multi-thousand dollar courses. Everything is mathematically grounded.",
        "initials": "ER",
        "date": "October 2026"
    }
]

COMMON_FAQS = [
    {
        "question": "Do I need coding or machine learning experience to apply this Playbook?",
        "answer": "No. All frameworks, prompt schemas, and automation setups are designed for non-technical solo founders using modern tools like Claude, ChatGPT, Make.com, and Airtable."
    },
    {
        "question": "How quickly can I realistically reach $10,000/month?",
        "answer": "Operators who execute the 60-to-90-minute daily acquisition protocol consistently typically secure their first pilot within 14 days and scale to 4–5 retainers or creator partnerships within 60 to 90 days."
    },
    {
        "question": "Are the slides and written guides included with purchase?",
        "answer": "Yes. Every lesson includes both an interactive executive slide presentation and an in-depth, step-by-step written implementation guide with full lifetime access."
    }
]
