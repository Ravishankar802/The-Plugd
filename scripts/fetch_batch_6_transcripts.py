import json
from youtube_transcript_api import YouTubeTranscriptApi

videos = [
    {
        "id": "Huf44pheMqU",
        "slug": "want-to-made-god-tier-money-use-this-sales-tactic-made-me-10m",
        "title": "Want to made god-tier money? Use this sales tactic (Made me $10M)"
    },
    {
        "id": "_IwYLXAXzx8",
        "slug": "there-are-only-3-types-of-profitable-businesses-pick-one",
        "title": "There Are Only 3 Types Of Profitable Businesses (Pick ONE)"
    },
    {
        "id": "mnhhwBiFshA",
        "slug": "if-you-dont-understand-leadership-youll-never-win",
        "title": "If You Don't Understand Leadership, You'll Never Win"
    },
    {
        "id": "ksRcFGLPoSk",
        "slug": "i-built-a-business-with-ai-in-24-hours",
        "title": "I Built A Business With AI In 24 Hours"
    },
    {
        "id": "oRpjoHJcX4s",
        "slug": "copy-paste-this-strategy-to-make-your-first-5-000-online",
        "title": "Copy & Paste THIS Strategy To Make Your First $5,000 Online"
    },
    {
        "id": "_6vRyQ6sKUU",
        "slug": "7-remote-jobs-you-can-do-from-home",
        "title": "7 Remote Jobs You Can Do From Home"
    },
    {
        "id": "3B8Zy_jq3MA",
        "slug": "i-asked-ai-to-make-me-as-much-money-as-possible",
        "title": "I Asked AI To Make Me As Much Money As Possible"
    },
    {
        "id": "vYv3YYXszXs",
        "slug": "these-are-the-best-business-books-to-read-7-billionaire-books",
        "title": "These Are The Best Business Books To Read (7 Billionaire Books)"
    },
    {
        "id": "aRVv5NLVRwE",
        "slug": "my-honest-advice-to-someone-who-wants-to-get-rich",
        "title": "My honest advice to someone who wants to get rich"
    },
    {
        "id": "iJiBJAJRRkk",
        "slug": "the-30k-month-al-faceless-shorts-method-nobodys-talking-about",
        "title": "The $30K/Month Al Faceless Shorts Method Nobody's Talking About"
    },
    {
        "id": "snErQUyqwCU",
        "slug": "how-to-build-10k-websites-in-minutes-claude-ai",
        "title": "How to Build $10K Websites in Minutes (Claude AI)"
    },
    {
        "id": "3W1VhiKLNp4",
        "slug": "master-higgsfield-ai-in-20-minutes-beginner-tutorial",
        "title": "Master Higgsfield AI in 20 Minutes (Beginner Tutorial)"
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
        plain_text = " ".join([e["text"] for e in raw_entries if "text" in e])
        with open(f"scripts/transcript_{slug}_plain.txt", "w", encoding="utf-8") as f:
            f.write(plain_text)
            
        print(f"  SUCCESS! {len(raw_entries)} chunks, ~{len(plain_text.split())} words.")
    except Exception as e:
        print(f"  FAILED for {vid}: {e}")
