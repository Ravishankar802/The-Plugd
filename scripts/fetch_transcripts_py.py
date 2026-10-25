import os
import json
from youtube_transcript_api import YouTubeTranscriptApi

VIDEOS = [
    {"id": "wtDDjBOfTZo", "name": "claude_26min", "title": "Give Me 26 Minutes, I'll Give You 10,000 Hours of Claude Knowledge"},
    {"id": "w-lkP9XcZfg", "name": "chatgpt_28min", "title": "Give Me 28 Minutes, I'll Give You 10,000 Hours of ChatGPT Knowledge"},
    {"id": "DZoeGR_tatA", "name": "5_proven_ways", "title": "5 Proven Ways To Make Money With AI (No Experience)"},
    {"id": "q1g65sjQI-4", "name": "ai_side_hustles_2026", "title": "The Best AI Side Hustles To Start In 2026 (No Skills)"},
    {"id": "Mp2i27w8KPQ", "name": "copy_paste_13k", "title": "Copy & Paste THIS Strategy to Make $13k/Month with AI in 2026"},
    {"id": "US47EpxBVHk", "name": "one_person_business_10k", "title": "Build A One-Person Business As A Beginner (From $0 To $10K)"}
]

ytt = YouTubeTranscriptApi()

for v in VIDEOS:
    vid = v["id"]
    name = v["name"]
    print(f"Fetching {name} ({vid})...")
    try:
        data = ytt.fetch(vid)
        out_txt = []
        words_count = 0
        plain_words = []
        for item in data:
            start = int(item.start)
            m = start // 60
            s = start % 60
            text = item.text.replace("\n", " ").strip()
            out_txt.append(f"[{m:02d}:{s:02d}] {text}")
            plain_words.append(text)
            
        full_text = "\n".join(out_txt)
        plain_text = " ".join(plain_words)
        
        with open(f"scripts/transcript_{name}.txt", "w", encoding="utf-8") as f:
            f.write(full_text)
        with open(f"scripts/transcript_{name}_plain.txt", "w", encoding="utf-8") as f:
            f.write(plain_text)
            
        print(f"[SUCCESS] Saved {name}: {len(data)} snippets, {len(plain_text.split())} words.")
    except Exception as e:
        print(f"[ERROR] Failed fetching {name}: {e}")

print("Done fetching transcripts.")
