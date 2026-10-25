files = [
    ("17", "transcript_turned_300_to_100k_at_19_plain.txt"),
    ("18", "transcript_rich_with_social_media_plain.txt"),
    ("19", "transcript_get_rich_service_businesses_plain.txt"),
    ("20", "transcript_new_way_content_ai_plain.txt"),
    ("21", "transcript_catch_up_in_life_logic_plain.txt"),
    ("22", "transcript_perfect_business_5_things_plain.txt"),
    ("23", "transcript_use_ai_in_business_2026_plain.txt"),
    ("24", "transcript_multiple_interests_one_person_plain.txt")
]

for num, fn in files:
    with open("scripts/" + fn, "r", encoding="utf-8") as f:
        text = f.read()
    words = text.split()
    print(f"=== PB {num}: {fn} ({len(words)} words) ===")
    print(" ".join(words[:50]))
    print("...")
    print(" ".join(words[len(words)//2:len(words)//2 + 50]))
    print("\n")
