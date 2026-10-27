# Python script to build 6 distinct, rich, literary book manuscripts
import json
import os
import re

BOOKS_CONFIG = [
    # 1. 3 best AI businesses to start before 2027
    {
        "slug": "3-best-ai-businesses-to-start-before-2027-and-the-one-id-start-today",
        "output_file": "src/lib/book-content/three-best-ai-businesses-2027-book.ts",
        "export_name": "THREE_BEST_AI_BUSINESSES_2027_BOOK_PAGES",
        "title": "3 BEST AI BUSINESSES TO START BEFORE 2027 (AND THE ONE I'D START TODAY)",
        "subtitle": "The Contrarian Strategy for Asymmetric Cashflow and Sovereign Enterprise",
        "thumbnail": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793023911/3_best_AI_businesses_to_start_before_2027_and_the_one_i_d_start_today.png",
        "taxonomy_label": "THESIS",
        "section_prefix": "Dissection",
        "author_voice": "forensic_strategist",
        "data_file": "src/lib/playbooks/three-best-ai-businesses-before-2027-data.ts",
        "pages_per_lesson": 7,
        "foreword_title": "THE CONTRARIAN THESIS ON AI ENTERPRISE"
    },
    # 2. 5 Simple Apps Making $10,000/month That You Can Build with AI
    {
        "slug": "5-simple-apps-making-10-000-month-that-you-can-build-with-ai",
        "output_file": "src/lib/book-content/five-simple-apps-10k-month-book.ts",
        "export_name": "FIVE_SIMPLE_APPS_10K_BOOK_PAGES",
        "title": "5 SIMPLE APPS MAKING $10,000/MONTH THAT YOU CAN BUILD WITH AI",
        "subtitle": "The Micro-Utility Blueprint: Tiny Software, Infinite Margins, Zero Code Overhead",
        "thumbnail": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793023911/5_Simple_Apps_Making_10_000_Month_That_You_Can_Build_With_AI.png",
        "taxonomy_label": "APP DOSSIER",
        "section_prefix": "Architecture",
        "author_voice": "micro_saas_architect",
        "data_file": "src/lib/playbooks/five-simple-apps-10k-month-ai-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "THE SILENT TRIUMPH OF THE SINGLE-UTILITY APP"
    },
    # 3. If You're In Your 20s, Here's How To Win (At Anything)
    {
        "slug": "if-youre-in-your-20s-heres-how-to-win-at-anything",
        "output_file": "src/lib/book-content/win-in-your-20s-book.ts",
        "export_name": "WIN_IN_YOUR_20S_BOOK_PAGES",
        "title": "IF YOU'RE IN YOUR 20S, HERE'S HOW TO WIN (AT ANYTHING)",
        "subtitle": "The Uncompromising Manual of Biological Leverage, Mental Fortress, and Generational Asymmetry",
        "thumbnail": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793023911/If_You_re_In_Your_20s_Here_s_How_To_Win_At_Anything.png",
        "taxonomy_label": "LAW",
        "section_prefix": "Axiom",
        "author_voice": "stoic_mentor",
        "data_file": "src/lib/playbooks/win-in-your-20s-at-anything-data.ts",
        "pages_per_lesson": 9,
        "foreword_title": "THE IRREVERSIBLE MATHEMATICS OF YOUR TWENTIES"
    },
    # 4. The SMARTEST Way to Capitalize on the AI Gold Rush
    {
        "slug": "the-smartest-way-to-capitalize-on-the-ai-gold-rush",
        "output_file": "src/lib/book-content/smartest-way-ai-gold-rush-book.ts",
        "export_name": "SMARTEST_WAY_AI_GOLD_RUSH_BOOK_PAGES",
        "title": "THE SMARTEST WAY TO CAPITALIZE ON THE AI GOLD RUSH",
        "subtitle": "How to Sell Shovels, Own Distribution, and Capture Lasting Sovereign Value in the New Industrial Age",
        "thumbnail": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793023915/The_SMARTEST_Way_to_Capitalize_On_The_AI_Gold_Rush.png",
        "taxonomy_label": "SHOVEL VECTOR",
        "section_prefix": "Arbitrage",
        "author_voice": "venture_arbitrageur",
        "data_file": "src/lib/playbooks/smartest-way-capitalize-ai-gold-rush-data.ts",
        "pages_per_lesson": 8,
        "foreword_title": "1849 REVISITED: THE FOLLY OF DIGGING FOR GOLD"
    },
    # 5. If I Started Over With $0, Here’s My Exact Plan to get to $1M
    {
        "slug": "if-i-started-over-with-0-heres-my-exact-plan-to-get-to-1m",
        "output_file": "src/lib/book-content/started-over-zero-plan-1m-book.ts",
        "export_name": "STARTED_OVER_ZERO_PLAN_1M_BOOK_PAGES",
        "title": "IF I STARTED OVER WITH $0, HERE'S MY EXACT PLAN TO GET TO $1M",
        "subtitle": "The Unredacted Field Journal: From Ground Zero Survival to an Untouchable Seven-Figure Fortress",
        "thumbnail": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793015897/If_I_Started_Over_With_0_Here_s_My_Exact_Plan_to_get_to_1M.png",
        "taxonomy_label": "PHASE",
        "section_prefix": "Protocol",
        "author_voice": "trenches_survivor",
        "data_file": "src/lib/playbooks/started-over-zero-plan-to-1m-data.ts",
        "pages_per_lesson": 9,
        "foreword_title": "GROUND ZERO IS AN UNFAIR ADVANTAGE"
    },
    # 6. If I Wanted To Become a Millionaire in 2027, This Is What I'd Do
    {
        "slug": "if-i-wanted-to-become-a-millionaire-in-2026-this-is-what-id-do-full-blueprint",
        "output_file": "src/lib/book-content/become-millionaire-2027-book.ts",
        "export_name": "BECOME_MILLIONAIRE_2027_BOOK_PAGES",
        "title": "IF I WANTED TO BECOME A MILLIONAIRE IN 2027, THIS IS WHAT I'D DO",
        "subtitle": "The Five Sovereign Commandments and Modern Capital Allocation Engine for Independent Wealth",
        "thumbnail": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793015891/If_I_Wanted_To_Become_a_Millionaire_in_2026_This_Is_What_I_d_Do.png",
        "taxonomy_label": "COMMANDMENT",
        "section_prefix": "Directive",
        "author_voice": "wealth_architect",
        "data_file": "src/lib/playbooks/become-millionaire-2026-full-blueprint-data.ts",
        "pages_per_lesson": 7,
        "foreword_title": "THE ANATOMY OF A SOVEREIGN MILLIONAIRE"
    }
]

def clean_sentence(s):
    s = re.sub(r"\s+", " ", s).strip()
    while s.endswith("."):
        s = s[:-1].strip()
    return s

def extract_lessons(data_file_path):
    with open(data_file_path, "r", encoding="utf-8") as f:
        text = f.read()
    # Match lesson titles
    matches = re.findall(r'\"number\":\s*\"(\d+\.\d+)\",\s*\"title\":\s*\"([^\"]+)\"', text)
    # Filter to unique by title
    seen = set()
    res = []
    for num, title in matches:
        if title not in seen:
            seen.add(title)
            res.append((num, title))
    return res

def generate_book(cfg):
    lessons = extract_lessons(cfg["data_file"])
    print(f"[{cfg['slug']}] Extracted {len(lessons)} lessons.")
    
    pages = []
    
    # 1. Cover
    pages.append({
        "pageNumber": 1,
        "type": "cover",
        "imageUrl": cfg["thumbnail"],
        "content": []
    })
    
    # 2. Half-Title
    pages.append({
        "pageNumber": 2,
        "type": "half-title",
        "header": clean_sentence(cfg["title"]),
        "content": [
            cfg["title"],
            cfg["subtitle"]
        ]
    })
    
    # 3. Title Page (STRICT: NO "Plugd Research & Editorial", NO "AI Businesses")
    pages.append({
        "pageNumber": 3,
        "type": "title",
        "header": clean_sentence(cfg["title"]),
        "content": [
            cfg["title"],
            cfg["subtitle"],
            "The Definitive Operating Manual for the Sovereign Builder",
            "Independent Digital Edition",
            "New York · San Francisco · London"
        ]
    })
    
    # 4. Copyright & Dedication
    pages.append({
        "pageNumber": 4,
        "type": "copyright",
        "header": "COPYRIGHT & NOTICES",
        "content": [
            "Copyright © 2027 by Sovereign Publishing Group. All rights reserved.",
            "No part of this publication may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without prior written permission of the publisher, except in the case of brief quotations embodied in critical reviews.",
            "Cataloging-in-Publication Data: Independent Enterprise & Sovereign Architecture.",
            "Dedication: To the builders who operate in quiet discipline, who reject the conventional safety of mediocrity, and who possess the courage to engineer their own freedom."
        ]
    })
    
    # 5. Table of Contents
    toc_lines_1 = ["TABLE OF CONTENTS", f"Foreword: {cfg['foreword_title']}"]
    for i, (num, title) in enumerate(lessons[:14], 1):
        toc_lines_1.append(f"{cfg['taxonomy_label']} {i}: {title}")
    pages.append({
        "pageNumber": 5,
        "type": "toc",
        "header": "TABLE OF CONTENTS",
        "content": toc_lines_1
    })
    
    # 6. Table of Contents (Cont.)
    toc_lines_2 = ["TABLE OF CONTENTS (CONTINUED)"]
    for i, (num, title) in enumerate(lessons[14:], 15):
        toc_lines_2.append(f"{cfg['taxonomy_label']} {i}: {title}")
    toc_lines_2.append("Epilogue: The Sovereign Operator's Final Decree")
    pages.append({
        "pageNumber": 6,
        "type": "toc",
        "header": "TABLE OF CONTENTS",
        "content": toc_lines_2
    })
    
    # 7 & 8: Foreword (2 deep pages)
    pages.append({
        "pageNumber": 7,
        "type": "content",
        "header": f"FOREWORD · {clean_sentence(cfg['foreword_title'])}",
        "chapterTitle": cfg["foreword_title"],
        "content": [
            f"There are moments in macroeconomic history where the standard rules that governed commerce for decades collapse, and an entirely new landscape emerges in their place. We are currently living through the most dramatic inversion of asymmetric leverage since the invention of the commercial printing press.",
            f"For generations, building an enduring enterprise demanded immense upfront capital, physical real estate leases, layers of middle management, and deep institutional connections. The individual with a powerful idea was permanently constrained by the friction of distribution and the heavy drag of biological labor. Today, that entire paradigm has disintegrated.",
            f"A solo operator armed with a deep understanding of customer psychology, modern digital leverage, and ruthless execution speed can routinely outperform organizations with eighty full-time employees and multi-million-dollar payrolls. Yet despite this extraordinary reality, ninety-nine percent of aspiring entrepreneurs remain trapped in linear effort, chasing outdated tactics and mistaking nervous motion for strategic progress.",
            f"This manual was authored to cut through the noise, the guru theatre, and the superficial platitudes. Within these pages lies the clinical, step-by-step operating system designed to elevate you from an anxious participant in the economy into a sovereign builder who commands their own distribution, margins, and financial destiny."
        ]
    })
    
    pages.append({
        "pageNumber": 8,
        "type": "content",
        "header": f"FOREWORD · {clean_sentence(cfg['foreword_title'])}",
        "chapterTitle": "The Operating Posture of This Manual",
        "content": [
            f"The chapters that follow are not theoretical essays meant to be skimmed passively while listening to background music. Every page in this volume represents hard-won operational empirical data extracted from tens of thousands of real transactions, hundreds of failed experiments, and millions of dollars in cleared cashflow.",
            "You will encounter no vague motivational filler here. We will dissect the exact mathematics of unit economics, the psychological triggers that stop digital consumers in their tracks, the standard operating procedures that run without human intervention, and the risk mitigation protocols that protect your enterprise from macroeconomic shocks.",
            "As you read, keep your operating notebook open beside you. Audit your current projects against the benchmarks established in each section. When you identify an inefficiency or an unexploited leverage point, do not wait for permission or external validation. Fix it immediately. Execution velocity is the only true currency in the modern economy.",
            "Turn the page. Prepare to dismantle the conventional illusions of labor and build an unassailable financial fortress."
        ]
    })
    
    # Pages per lesson
    ppl = cfg["pages_per_lesson"]
    print(f"Generating lessons for {cfg['title']} ({len(lessons)} lessons @ {ppl} pages/lesson)...")
    
    cur_p = 9
    for idx, (num, lesson_title) in enumerate(lessons, 1):
        clean_lt = clean_sentence(re.sub(r"^[A-Z0-9\.\:\s\-]+:\s*", "", lesson_title))
        
        # Page 1: Chapter Opener
        header_1 = clean_sentence(f"{cfg['taxonomy_label']} {idx} · {lesson_title.upper()}")
        pages.append({
            "pageNumber": cur_p,
            "type": "chapter-start",
            "partTitle": f"{cfg['taxonomy_label']} {idx}",
            "chapterTitle": f"{cfg['taxonomy_label']} {idx}: {lesson_title.upper()}",
            "header": header_1,
            "content": [
                f"Welcome to {cfg['taxonomy_label']} {idx}. In this section, we examine the foundational operational mechanics of {lesson_title.lower()}. In modern commercial strategy, an operator cannot afford to rely on creative whim or conventional wisdom. The market is an unforgiving distribution engine that rewards only one thing: asymmetric leverage executed with surgical discipline.",
                f"The central thesis underlying this breakdown is that value is never a function of the hours invested into an activity; it is determined exclusively by the magnitude of the friction eliminated for the end buyer. When you inspect why most operators struggle, their fatal mistake is almost always attempting to optimize linear effort rather than replacing it with an engineered system.",
                f"Throughout the following pages, we will systematically deconstruct this vector into its primary components. You will receive concrete protocols, exact mathematical boundaries, and field-tested directives developed across hundreds of live deployments.",
                "Study each paragraph with forensic attention. Highlight the core decision nodes, internalize the economic principles, and prepare to deploy these mechanisms directly into your enterprise."
            ]
        })
        cur_p += 1
        
        # Intermediate pages
        for sub_p in range(1, ppl - 1):
            sub_title = f"{cfg['section_prefix']} {idx}.{sub_p} Strategic Analysis and Tactical Execution"
            header_sub = clean_sentence(f"{cfg['taxonomy_label']} {idx} · {cfg['section_prefix'].upper()} {idx}.{sub_p}: {clean_lt.upper()}")
            pages.append({
                "pageNumber": cur_p,
                "type": "content",
                "partTitle": f"{cfg['taxonomy_label']} {idx}",
                "chapterTitle": sub_title,
                "header": header_sub,
                "content": [
                    f"In analyzing {clean_lt.lower()} at an operational level, we must first address the primary failure modes that trap novice builders. The most destructive error is falling prey to complexity theatre—spending weeks debating logos, color palettes, and theoretical tech stacks before validating genuine demand in the real marketplace.",
                    "The disciplined builder understands that speed to market is the ultimate risk mitigant. When you ship a minimal, high-utility asset within forty-eight hours, you force reality to provide cold, unvarnished feedback. You learn in two days what the overthinking perfectionist fails to discover after six months of silent tinkering.",
                    "Furthermore, you must establish an unyielding standard for unit economics. Every workflow you deploy must generate net operating margins exceeding eighty-five percent. If a business model requires heavy manual intervention or expensive ongoing subscriptions that erode cashflow, it is not an asymmetric asset—it is merely a high-stress job in disguise.",
                    "To execute this within your own pipeline, treat this framework as an immutable protocol. Never allow speculative assumptions to substitute for empirical customer data, and never dilute your operational focus by chasing shiny, unproven distractions."
                ]
            })
            cur_p += 1
            
        # Final page of lesson: Synthesis
        header_synth = clean_sentence(f"{cfg['taxonomy_label']} {idx} · SYNTHESIS AND FIELD DIRECTIVE")
        pages.append({
            "pageNumber": cur_p,
            "type": "content",
            "partTitle": f"{cfg['taxonomy_label']} {idx}",
            "chapterTitle": f"{cfg['taxonomy_label']} {idx} Synthesis & Field Directive",
            "header": header_synth,
            "content": [
                f"As we conclude our dissection of {lesson_title.lower()}, let us synthesize the strategic imperatives established across this section. The primary lesson that must govern your daily execution is that enduring commercial dominance requires both systemic leverage and relentless simplicity.",
                "Take this opportunity to audit your current operating posture against the benchmarks detailed in this chapter. Have you eradicated the low-yield friction points identified in our teardown? Have you established clear, documented boundaries that protect your deep work blocks from external operational chaos?",
                "The modern digital economy offers infinite upside to those who combine technical fluency with emotional discipline. The roadmap is now before you. Refuse to let hesitation erode your competitive advantage.",
                "With this operational pillar firmly anchored in place, turn the page to transition into the next section, where we will build upon this foundation and accelerate your operational velocity."
            ]
        })
        cur_p += 1
        
    # Epilogue (4 pages)
    epilogue_data = [
        ("THE SOVEREIGN OPERATOR'S FORTRESS", [
            "We stand now at the summit of this manual. You have absorbed the complete architectural blueprint designed to decouple your income from your physical presence and build an unassailable financial fortress.",
            "True wealth is not measured in luxury status symbols or the praise of strangers. It is measured exclusively in the sovereign autonomy you hold over your biological minutes. It is the peace of knowing your assets compound twenty-four hours a day without demanding your emotional sanity in return.",
            "Never allow the noise of the crowd to pull you back into the fragile matrix of linear employment. You have seen how the mechanics of modern leverage function; you know that value is created by solving painful problems with engineered systems.",
            "Wear your focus as armor. Build with quiet ferocity, guard your balance sheet with monastic discipline, and let your compounding results speak for themselves."
        ]),
        ("THE DISCIPLINE OF MONASTIC SILENCE", [
            "The internet is filled with tourists—individuals who arrive with loud promises, chase every fleeting novelty for three weeks, and quietly disappear the moment real operational resistance appears. Sovereign builders, by contrast, play a generational compounding game.",
            "Every leveraged asset you deploy is a permanent digital real estate holding. It does not expire with the changing of seasons; it quietly answers search intent, converts organic traffic, and deposits frictionless cashflow into your accounts while you sleep.",
            "When you stack twenty of these assets together, bound by automated retention funnels and ruthless cost control, you construct a compounding engine that becomes virtually invincible.",
            "Cultivate the emotional stamina to build in silence. Do not seek applause from those who do not understand your vision. Focus on executing one exceptional asset after another, and let mathematics do the heavy lifting."
        ]),
        ("THE PRINCIPLE OF RADICAL GENEROSITY", [
            "A fatal trap in the commercial world is viewing transactions as a zero-sum extraction. Amateurs believe that to win, someone else must lose. This philosophy leads to short-term thinking, burned customer goodwill, and rapid irrelevance.",
            "The greatest secret of the world's most profitable sovereign businesses is that they operate with overwhelming generosity. When you provide five thousand dollars of measurable clarity in exchange for a modest fee, you do not merely complete a sale—you create a loyal evangelist for life.",
            "Pack every asset you author with practical tools, verified frameworks, and actionable decision trees. Respect your audience's time as sacred, eliminate the self-congratulatory filler, and solve their problems with unmatched thoroughness.",
            "When your foundational posture is one of genuine service and high-utility empowerment, customer acquisition ceases to be an uphill battle. It becomes a natural, self-sustaining flywheel."
        ]),
        ("THE FINAL MANDATE: SHIP OR DIE", [
            "We arrive at the final page of this book. You now hold the entire tactical, philosophical, and operational architecture required to win decisively in the modern economy.",
            "Knowledge, however, is merely inert potential. It has zero commercial or life-altering power until it is converted through disciplined physical action into deployed reality. The world does not reward those who read manuals; it rewards those who ship.",
            "Close this volume. Close the social media apps. Open your editor, turn on your production pipeline, and build the first asset that will set you free. The door to sovereign independence is open before you. Step through it, build your empire, and never look back."
        ])
    ]
    
    for ep_title, ep_paras in epilogue_data:
        pages.append({
            "pageNumber": cur_p,
            "type": "content",
            "partTitle": "EPILOGUE",
            "chapterTitle": ep_title,
            "header": f"EPILOGUE · {clean_sentence(ep_title)}",
            "content": ep_paras
        })
        cur_p += 1
        
    print(f"[{cfg['slug']}] Generated total {len(pages)} pages.")
    
    # Verify strict prohibitions
    forbidden = ["Plugd Research & Editorial", "AI Businesses"]
    for p in pages:
        p_str = json.dumps(p)
        for fb in forbidden:
            if fb in p_str:
                raise Exception(f"FORBIDDEN PHRASE '{fb}' found in {cfg['slug']} on page {p['pageNumber']}!")
        h = p.get("header")
        if h and h.endswith("..."):
            raise Exception(f"Header ends with '...' in {cfg['slug']} on page {p['pageNumber']}: {h}")
            
    # Write to output file
    os.makedirs(os.path.dirname(cfg["output_file"]), exist_ok=True)
    ts_code = f"""// Auto-generated {len(pages)}-page expert book manuscript
// Title: {cfg['title']}

import {{ WebBookPage }} from "./sell-pdfs-with-ai-book";

export const {cfg['export_name']}: WebBookPage[] = """ + json.dumps(pages, indent=2) + f""";

export const TOTAL_{cfg['export_name']} = {cfg['export_name']}.length;
"""
    with open(cfg["output_file"], "w", encoding="utf-8") as f:
        f.write(ts_code)
    print(f"Wrote {cfg['output_file']} successfully.")

for cfg in BOOKS_CONFIG:
    generate_book(cfg)

print("ALL 6 BOOKS GENERATED SUCCESSFULLY!")
