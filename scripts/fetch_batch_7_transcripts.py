import socket
socket.setdefaulttimeout(10)
from youtube_transcript_api import YouTubeTranscriptApi

videos = [
    {"num": 55, "id": "5BgmmGHYk1U", "slug": "if-youre-in-your-20s-heres-how-to-win-at-anything"},
    {"num": 56, "id": "G3kpTqTEAJU", "slug": "the-smartest-way-to-capitalize-on-the-ai-gold-rush"},
    {"num": 57, "id": "Uu5gNtHsEI4", "slug": "7-side-hustles-students-can-start-in-2027"},
    {"num": 58, "id": "rYUS7ibZhYo", "slug": "i-sell-pdfs-with-ai-and-it-changed-my-life-revealing-everything"},
    {"num": 59, "id": "Uq13Qt1ozGc", "slug": "3-best-ai-businesses-to-start-before-2027-and-the-one-id-start-today"},
    {"num": 60, "id": "dQEEb5HZQrA", "slug": "5-simple-apps-making-10-000-month-that-you-can-build-with-ai"},
]

ytt = YouTubeTranscriptApi()

for v in videos:
    vid = v["id"]
    slug = v["slug"]
    print(f"Fetching {vid} ({slug})...", flush=True)
    try:
        data = ytt.fetch(vid)
        plain_words = [item.text.replace("\n", " ").strip() for item in data]
        plain_text = " ".join(plain_words)
        with open(f"scripts/transcript_{slug}_plain.txt", "w", encoding="utf-8") as f:
            f.write(plain_text)
        print(f"  [SUCCESS] {len(plain_words)} snippets, ~{len(plain_text.split())} words.", flush=True)
    except Exception as e:
        print(f"  [FAILED] {vid}: {e}", flush=True)

print("Done fetching 6 transcripts.", flush=True)
