import os

files = [
    ("learn-this-skill-if-you-want-to-win-in-the-next-2-3-years", "scripts/transcript_learn-this-skill-if-you-want-to-win-in-the-next-2-3-years_plain.txt"),
    ("how-to-build-a-1m-one-person-business-faster-with-ai", "scripts/transcript_how-to-build-a-1m-one-person-business-faster-with-ai_plain.txt"),
    ("how-to-think-like-a-strategic-genius-5-dimensional-thinking", "scripts/transcript_how-to-think-like-a-strategic-genius-5-dimensional-thinking_plain.txt"),
    ("how-to-use-ai-better-than-99-of-people-this-changed-my-life", "scripts/transcript_how-to-use-ai-better-than-99-of-people-this-changed-my-life_plain.txt"),
    ("youre-stuck-in-the-matrix-heres-how-you-escape", "scripts/transcript_youre-stuck-in-the-matrix-heres-how-you-escape_plain.txt"),
    ("you-have-5-years-to-get-rich-before-ai-takes-over", "scripts/transcript_you-have-5-years-to-get-rich-before-ai-takes-over_plain.txt"),
    ("investing-for-beginners-in-25-minutes", "scripts/transcript_investing-for-beginners-in-25-minutes_plain.txt"),
    ("laziest-ways-to-make-money-with-ai-for-beginners", "scripts/transcript_laziest-ways-to-make-money-with-ai-for-beginners_plain.txt"),
]

for slug, path in files:
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    words = text.split()
    print(f"=== {slug} ({len(words)} words) ===")
    print("Start:", " ".join(words[:60]))
    print("Middle:", " ".join(words[len(words)//2 : len(words)//2 + 60]))
    print("End:", " ".join(words[-60:]))
    print()
