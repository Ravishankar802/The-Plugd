import os
import re
import sys

BANNED = [
    r"Plugd",
    r"AI Businesses",
    r"Research & Editorial",
    r"OFFICIAL MASTER CLASS",
    r"\bsovereign\b",
    r"\basymmetric\b",
    r"\bmonastic\b",
    r"\bforensic\b",
    r"game-changer",
    r"unlock your potential",
    r"in today's fast-paced world",
    r"as an AI",
    r"lorem ipsum"
]

def check_file(filepath):
    print(f"Checking {os.path.basename(filepath)}...")
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    lines = content.splitlines()
    if not lines:
        print("  ERROR: Empty file")
        return False

    if not lines[0].startswith("# "):
        print(f"  ERROR: First line must start with '# ', got: {lines[0]}")
        return False

    title = lines[0]
    # Check title is followed by blank line
    if len(lines) > 1 and lines[1].strip() != "":
        print("  ERROR: Second line must be blank")
        return False

    # Extract body paragraphs
    raw_paras = content.split("\n\n")
    # First item has title
    first_block = raw_paras[0].splitlines()
    body_paras = []
    if len(first_block) > 1:
        # Title wasn't properly double-newline separated
        body_paras.extend(first_block[1:])
    body_paras.extend(raw_paras[1:])

    # Clean empty paras
    body_paras = [p.strip() for p in body_paras if p.strip()]

    print(f"  Title: {title}")
    print(f"  Paragraph count: {len(body_paras)} (Must be 16 to 18)")

    errors = []
    if len(body_paras) < 16 or len(body_paras) > 18:
        errors.append(f"Paragraph count {len(body_paras)} outside 16-18")

    total_words = len(title.split())

    for idx, p in enumerate(body_paras, 1):
        if "\n" in p:
            errors.append(f"Para {idx} has internal line break")
        
        words = p.split()
        wcount = len(words)
        total_words += wcount

        if wcount < 60:
            errors.append(f"Para {idx} too short: {wcount} words (min 60)")
        if wcount > 140:
            errors.append(f"Para {idx} too long: {wcount} words (max 140)")

        # Check markdown formatting
        if re.search(r"(\*\*|\*|_|`|#|>|\[.*?\]\(.*?\)|^\s*[-*+]\s|^\s*\d+\.\s)", p):
            errors.append(f"Para {idx} contains markdown formatting")

        # Check banned words
        for b in BANNED:
            if re.search(b, p, re.IGNORECASE):
                errors.append(f"Para {idx} contains banned word matching {b}")

    # Also check title for banned words
    for b in BANNED:
        if re.search(b, title, re.IGNORECASE):
            # Check if it's asymmetric vs asymmetry
            errors.append(f"Title contains banned word matching {b}")

    print(f"  Total chapter words: {total_words} (Must be 1600 to 1900)")
    if total_words < 1600:
        errors.append(f"Total words {total_words} < 1600")
    if total_words > 1900:
        errors.append(f"Total words {total_words} > 1900")

    if errors:
        for e in errors:
            print(f"  ERROR: {e}")
        return False
    else:
        print("  SUCCESS: All rules passed perfectly!")
        return True

if __name__ == "__main__":
    if len(sys.argv) > 1:
        check_file(sys.argv[1])
