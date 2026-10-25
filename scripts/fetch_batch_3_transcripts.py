import os
import json
from youtube_transcript_api import YouTubeTranscriptApi

BATCH_3_VIDEOS = [
    {"id": "7_woRSpZrHw", "name": "turned_300_to_100k_at_19", "title": "How I turned $300 to $100,000 At 19 (My Side Hustles)"},
    {"id": "21flGkcZO3A", "name": "rich_with_social_media", "title": "How to become rich with social media (my exact playbook)"},
    {"id": "mRlSb0O5QNU", "name": "get_rich_service_businesses", "title": "How to Get Rich for Service-Based Businesses (Thank Me Later)"},
    {"id": "XsWSvz-aewA", "name": "new_way_content_ai", "title": "The New Way of Making Content In The Age of AI"},
    {"id": "EonibwnAEME", "name": "catch_up_in_life_logic", "title": "How to Catch Up In Life (Using Logic)"},
    {"id": "3fsJFUvA6Ts", "name": "perfect_business_5_things", "title": "What Makes The Perfect Business (5 Things)"},
    {"id": "fr78adfAnuA", "name": "use_ai_in_business_2026", "title": "How to Use AI in Your Business in 2026"},
    {"id": "XqS7kIWMIDE", "name": "multiple_interests_one_person", "title": "If You Have Multiple Interests, Please Start a One-Person Business"}
]

ytt = YouTubeTranscriptApi()

for v in BATCH_3_VIDEOS:
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

print("Done fetching batch 3 transcripts.")
