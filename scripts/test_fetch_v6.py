from youtube_transcript_api import YouTubeTranscriptApi

videos = [
    {"id": "Huf44pheMqU", "slug": "want-to-made-god-tier-money-use-this-sales-tactic-made-me-10m"},
    {"id": "_IwYLXAXzx8", "slug": "there-are-only-3-types-of-profitable-businesses-pick-one"},
    {"id": "mnhhwBiFshA", "slug": "if-you-dont-understand-leadership-youll-never-win"},
    {"id": "ksRcFGLPoSk", "slug": "i-built-a-business-with-ai-in-24-hours"},
    {"id": "oRpjoHJcX4s", "slug": "copy-paste-this-strategy-to-make-your-first-5-000-online"},
    {"id": "_6vRyQ6sKUU", "slug": "7-remote-jobs-you-can-do-from-home"},
    {"id": "3B8Zy_jq3MA", "slug": "i-asked-ai-to-make-me-as-much-money-as-possible"},
    {"id": "vYv3YYXszXs", "slug": "these-are-the-best-business-books-to-read-7-billionaire-books"},
    {"id": "aRVv5NLVRwE", "slug": "my-honest-advice-to-someone-who-wants-to-get-rich"},
    {"id": "iJiBJAJRRkk", "slug": "the-30k-month-al-faceless-shorts-method-nobodys-talking-about"},
    {"id": "snErQUyqwCU", "slug": "how-to-build-10k-websites-in-minutes-claude-ai"},
    {"id": "3W1VhiKLNp4", "slug": "master-higgsfield-ai-in-20-minutes-beginner-tutorial"},
]

ytt = YouTubeTranscriptApi()

for v in videos:
    vid = v["id"]
    slug = v["slug"]
    print(f"Fetching {vid} ({slug})...")
    try:
        data = ytt.fetch(vid)
        plain_words = []
        for item in data:
            plain_words.append(item.text.replace("\n", " ").strip())
        plain_text = " ".join(plain_words)
        with open(f"scripts/transcript_{slug}_plain.txt", "w", encoding="utf-8") as f:
            f.write(plain_text)
        print(f"  [SUCCESS] {len(plain_words)} snippets, ~{len(plain_text.split())} words.")
    except Exception as e:
        print(f"  [FAILED] {vid}: {e}")
