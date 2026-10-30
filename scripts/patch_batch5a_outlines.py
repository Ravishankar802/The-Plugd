import json
import os

outlines = {
    "3-best-ai-businesses-to-start-before-2027-and-the-one-id-start-today": {
        "label": "VENTURES",
        "tagline": "The window of commercial inflection is open; positioning for autonomous cash flow requires timing, selection, and flawless day-one execution.",
        "dedication": "For the ambitious operators ready to build enduring software and automation businesses in the intelligence era."
    },
    "the-4-levels-to-getting-rich-in-2026": {
        "label": "CAPITAL",
        "tagline": "From linear labor to capital compounding: the definitive economic blueprint for climbing the four tiers of modern wealth creation.",
        "dedication": "For the independent professionals determined to escape the hour-for-dollar trap and achieve lasting commercial freedom."
    },
    "how-i-turned-300-to-100-000-at-19-my-side-hustles": {
        "label": "HUSTLE",
        "tagline": "Starting with pocket money and building serious liquidity through grit, service arbitrage, and productized local business automation.",
        "dedication": "For every nineteen-year-old standing with empty pockets and relentless ambition, ready to prove circumstance is nothing."
    },
    "the-new-way-of-making-content-in-the-age-of-ai": {
        "label": "MEDIA",
        "tagline": "Building a high-leverage digital publishing machine with autonomous tools, deep context dossiers, and uncopyable human authenticity.",
        "dedication": "For the modern creators and publishers who refuse to settle for synthetic spam and demand authentic commercial influence."
    },
    "how-to-think-like-a-strategic-genius-5-dimensional-thinking": {
        "label": "STRATEGY",
        "tagline": "Transcending linear tactical traps through multi-order consequences, geometric risk positioning, and long-horizon information advantages.",
        "dedication": "For the thinkers and founders who play twenty-year games in two-year markets with quiet, unshakeable mastery."
    }
}

for slug, meta in outlines.items():
    p = os.path.join("book-manuscripts", slug, "outline.json")
    with open(p, "r", encoding="utf-8") as f:
        data = json.load(f)
    data.update(meta)
    with open(p, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print(f"Patched {slug}/outline.json with label={meta['label']}")
