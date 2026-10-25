configs = {
    "how-i-turned-300-to-100-000-at-19-my-side-hustles": {
        "modulesCount": 7,
        "lessonsCount": 28,
        "slidesCount": 112,
        "hoursOfMaterial": "7.5 hours",
        "badge": "Top Rated",
        "rating": 4.9,
        "ratingCount": 462,
        "headline": "A raw, tactical breakdown of turning $300 into $100,000 at 19 through aggressive side hustle compounding.",
        "description": "Learn the step-by-step roadmap from flipping thrift finds to high-ticket pressure washing, window cleaning, and service arbitrage with relentless execution."
    },
    "how-to-become-rich-with-social-media-my-exact-playbook": {
        "modulesCount": 8,
        "lessonsCount": 32,
        "slidesCount": 128,
        "hoursOfMaterial": "8.5 hours",
        "badge": "Bestseller",
        "rating": 4.9,
        "ratingCount": 583,
        "headline": "The exact social media distribution engine and monetization blueprint that turns attention into millions.",
        "description": "Master algorithmic virality, high-converting offer architecture, community funnels, and enterprise digital product monetization."
    },
    "how-to-get-rich-for-service-based-businesses-thank-me-later": {
        "modulesCount": 8,
        "lessonsCount": 32,
        "slidesCount": 128,
        "hoursOfMaterial": "8.5 hours",
        "badge": "Founder Pick",
        "rating": 4.9,
        "ratingCount": 519,
        "headline": "The institutional playbook for escaping hourly billing, scaling retainers, and productizing service businesses.",
        "description": "Transform your service agency into a high-margin cash machine with value pricing, recurring service retainers, and operational leverage."
    },
    "the-new-way-of-making-content-in-the-age-of-ai": {
        "modulesCount": 6,
        "lessonsCount": 24,
        "slidesCount": 96,
        "hoursOfMaterial": "6.5 hours",
        "badge": "Hot & New",
        "rating": 4.9,
        "ratingCount": 377,
        "headline": "The next-generation AI content creation system for 10x output speed without sacrificing voice or quality.",
        "description": "Integrate synthetic media pipelines, prompt frameworks, and multi-channel asset syndication to dominate content distribution."
    },
    "how-to-catch-up-in-life-using-logic": {
        "modulesCount": 7,
        "lessonsCount": 28,
        "slidesCount": 112,
        "hoursOfMaterial": "7.5 hours",
        "badge": "High Demand",
        "rating": 4.9,
        "ratingCount": 441,
        "headline": "A ruthlessly logical, first-principles framework to compress a decade of financial and personal progress into 2 years.",
        "description": "Eliminate zero-sum friction, calculate leverage ratios, and execute systematic asymmetric bets to rapidly catch up and pull ahead in life."
    },
    "what-makes-the-perfect-business-5-things": {
        "modulesCount": 6,
        "lessonsCount": 24,
        "slidesCount": 96,
        "hoursOfMaterial": "6.5 hours",
        "badge": "Bestseller",
        "rating": 4.9,
        "ratingCount": 612,
        "headline": "The 5 structural criteria of the world's most profitable, resilient, and enjoyable wealth machines.",
        "description": "Evaluate and engineer business models with zero marginal cost of replication, high recurring margins, proprietary moats, and sovereign freedom."
    },
    "how-to-use-ai-in-your-business-in-2026": {
        "modulesCount": 7,
        "lessonsCount": 28,
        "slidesCount": 112,
        "hoursOfMaterial": "7.5 hours",
        "badge": "Hot & New",
        "rating": 4.9,
        "ratingCount": 389,
        "headline": "The forward-looking operational guide to deploying autonomous agents, multi-modal workflows, and AI infrastructure.",
        "description": "Implement cutting-edge AI pipelines across marketing, customer operations, engineering, and back-office systems for superhuman enterprise efficiency."
    },
    "if-you-have-multiple-interests-please-start-a-one-person-business": {
        "modulesCount": 8,
        "lessonsCount": 32,
        "slidesCount": 128,
        "hoursOfMaterial": "8.5 hours",
        "badge": "Founder Pick",
        "rating": 4.9,
        "ratingCount": 498,
        "headline": "Synthesize your diverse curiosities into a sovereign, high-margin, one-person media and product empire.",
        "description": "Escape the trap of forced over-specialization and build a personal monopoly business that thrives on your unique intersection of passions."
    }
}

with open("src/lib/playbooks-catalog.ts", "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
current_slug = None

for line in lines:
    for slug in configs:
        if f'"slug": "{slug}"' in line:
            current_slug = slug
            break
    
    if current_slug and current_slug in configs:
        cfg = configs[current_slug]
        if line.strip().startswith('"headline":'):
            line = f'    "headline": "{cfg["headline"]}",\n'
        elif line.strip().startswith('"description":'):
            line = f'    "description": "{cfg["description"]}",\n'
        elif line.strip().startswith('"modulesCount":'):
            line = f'    "modulesCount": {cfg["modulesCount"]},\n'
        elif line.strip().startswith('"lessonsCount":'):
            line = f'    "lessonsCount": {cfg["lessonsCount"]},\n'
        elif line.strip().startswith('"hoursOfMaterial":'):
            # Also add slidesCount right before hoursOfMaterial if not present
            line = f'    "slidesCount": {cfg["slidesCount"]},\n    "hoursOfMaterial": "{cfg["hoursOfMaterial"]}",\n'
        elif line.strip().startswith('"badge":'):
            line = f'    "badge": "{cfg["badge"]}",\n'
        elif line.strip().startswith('"href":'):
            line = f'    "rating": {cfg["rating"]},\n    "ratingCount": {cfg["ratingCount"]},\n    "href": "/{current_slug}"\n'
            current_slug = None  # finished block
    
    new_lines.append(line)

with open("src/lib/playbooks-catalog.ts", "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Catalog patched successfully using line-by-line processor!")
