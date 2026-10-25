import os
import json
from youtube_transcript_api import YouTubeTranscriptApi

NEW_VIDEOS = [
    {"id": "6KB9h-FcD8Q", "name": "laziest_way_500_day", "title": "Laziest Way to Make Money Online in 2026 ($500/day)"},
    {"id": "as5OXeszE_s", "name": "blueprint_0_to_1m", "title": "The Blueprint To Go From $0 To $1,000,000"},
    {"id": "zyPcDQixJok", "name": "first_1m_is_simple", "title": "Your First $1M Is Simple (Here's How)"},
    {"id": "H7XTE9Yc7XM", "name": "money_principles_20s", "title": "The 5 Money Principles that will make anyone RICH in their 20s"},
    {"id": "uCjcc1TXk5c", "name": "boring_millionaires_2026", "title": "It's Boring, But Will Make Even Beginners Millionaires in 2026"},
    {"id": "I78h9HrSndE", "name": "locked_in_room_350k", "title": "I Locked Myself In a Room Until I Built a $350,000/mo Business"},
    {"id": "pA07tk7wFno", "name": "four_levels_getting_rich_2026", "title": "The 4 Levels To Getting RICH in 2026"},
    {"id": "N6FcErO6FM0", "name": "ai_revolution_8_ways", "title": "The A.I. Revolution: 8 Ways to get RICH"}
]

ytt = YouTubeTranscriptApi()

for v in NEW_VIDEOS:
    vid = v["id"]
    name = v["name"]
    print(f"Fetching {name} ({vid})...")
    try:
        data = ytt.fetch(vid)
        out_txt = []
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

print("Done fetching new transcripts.")
