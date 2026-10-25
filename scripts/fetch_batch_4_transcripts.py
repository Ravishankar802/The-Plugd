import json
from youtube_transcript_api import YouTubeTranscriptApi

videos = [
    {
        "id": "bWR_3Sg-H-8",
        "slug": "learn-this-skill-if-you-want-to-win-in-the-next-2-3-years",
        "title": "Learn This Skill If You Want To Win In The Next 2-3 Years"
    },
    {
        "id": "VXgusdDbsQE",
        "slug": "how-to-build-a-1m-one-person-business-faster-with-ai",
        "title": "How To Build A $1M One-Person Business Faster With AI"
    },
    {
        "id": "TY8IVSQnwlk",
        "slug": "how-to-think-like-a-strategic-genius-5-dimensional-thinking",
        "title": "How To Think Like A Strategic Genius (5-Dimensional Thinking)"
    },
    {
        "id": "xgpLjLHB5sA",
        "slug": "how-to-use-ai-better-than-99-of-people-this-changed-my-life",
        "title": "How To Use AI Better Than 99% Of People (This Changed My Life)"
    },
    {
        "id": "JeaBetH8UUc",
        "slug": "youre-stuck-in-the-matrix-heres-how-you-escape",
        "title": "You're Stuck In The Matrix, Here's How You Escape"
    },
    {
        "id": "2uyhavEACdo",
        "slug": "you-have-5-years-to-get-rich-before-ai-takes-over",
        "title": "You Have 5 Years to Get Rich Before AI Takes Over"
    },
    {
        "id": "MC7k4ruZD5c",
        "slug": "investing-for-beginners-in-25-minutes",
        "title": "Investing For Beginners in 25 Minutes"
    },
    {
        "id": "ytAW1_g2IfI",
        "slug": "laziest-ways-to-make-money-with-ai-for-beginners",
        "title": "Laziest Ways to Make Money with AI (For Beginners)"
    }
]

ytt = YouTubeTranscriptApi()

for v in videos:
    vid = v["id"]
    slug = v["slug"]
    print(f"Fetching transcript for {v['title']} ({vid})...")
    try:
        t = ytt.fetch(vid)
        raw_entries = t.to_raw_data()
        
        # Save raw JSON
        with open(f"scripts/transcript_{slug}.json", "w", encoding="utf-8") as f:
            json.dump(raw_entries, f, indent=2)
            
        # Save plain text
        full_text = " ".join([entry["text"] for entry in raw_entries])
        with open(f"scripts/transcript_{slug}_plain.txt", "w", encoding="utf-8") as f:
            f.write(full_text)
            
        print(f"  SUCCESS! {len(full_text.split())} words.")
    except Exception as e:
        print(f"  FAILED: {e}")
