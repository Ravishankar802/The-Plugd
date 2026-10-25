import json

catalog_path = "src/lib/playbooks-catalog.ts"

with open(catalog_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replacement block for ai-businesses-09 through ai-businesses-16
old_pattern_start = '  {\n    "id": "ai-businesses-09",'
old_pattern_end = '    "href": "/coming-soon?playbook=the-a-i-revolution-8-ways-to-get-rich"\n  },'

replacement = """  {
    "id": "ai-businesses-09",
    "slug": "laziest-way-to-make-money-online-in-2026-500-day",
    "title": "Laziest Way to Make Money Online in 2026 ($500/day)",
    "headline": "High-leverage, asynchronous digital cash engines generating $500/day with 98% net margins.",
    "description": "A cinematic playbook revealing high-leverage digital business models: software arbitrage, viral content clipping, curated newsletters, and permission-based outreach.",
    "categorySlug": "ai-businesses",
    "categoryName": "AI Businesses",
    "price": 3,
    "originalPrice": 9,
    "currency": "USD",
    "modulesCount": 7,
    "lessonsCount": 28,
    "slidesCount": 112,
    "hoursOfMaterial": "7.5 hours",
    "badge": "Hot & New",
    "rating": 4.9,
    "ratingCount": 412,
    "href": "/laziest-way-to-make-money-online-in-2026-500-day"
  },
  {
    "id": "ai-businesses-10",
    "slug": "the-blueprint-to-go-from-0-to-1000000",
    "title": "The Blueprint To Go From $0 To $1,000,000",
    "headline": "The 3-stage master roadmap from zero to $1M: active skills, operational leverage, and capital defense.",
    "description": "An exhaustive, cinematic masterclass breaking down the three evolutionary stages of wealth: high-income skill monetization, operational scaling, and defensive asset preservation.",
    "categorySlug": "ai-businesses",
    "categoryName": "AI Businesses",
    "price": 3,
    "originalPrice": 9,
    "currency": "USD",
    "modulesCount": 8,
    "lessonsCount": 32,
    "slidesCount": 128,
    "hoursOfMaterial": "8.5 hours",
    "badge": "Bestseller",
    "rating": 4.9,
    "ratingCount": 589,
    "href": "/the-blueprint-to-go-from-0-to-1000000"
  },
  {
    "id": "ai-businesses-11",
    "slug": "your-first-1m-is-simple-heres-how",
    "title": "Your First $1M Is Simple (Here's How)",
    "headline": "Why making your first million is mathematically simple once you master core high-income skill stacks.",
    "description": "A hard-hitting breakdown of the physics of wealth creation: escape velocity, skill stacking across copy, sales, and systems, and high-ticket retainer engineering.",
    "categorySlug": "ai-businesses",
    "categoryName": "AI Businesses",
    "price": 3,
    "originalPrice": 9,
    "currency": "USD",
    "modulesCount": 6,
    "lessonsCount": 24,
    "slidesCount": 96,
    "hoursOfMaterial": "6.5 hours",
    "badge": "Founder Pick",
    "rating": 4.9,
    "ratingCount": 467,
    "href": "/your-first-1m-is-simple-heres-how"
  },
  {
    "id": "ai-businesses-12",
    "slug": "the-5-money-principles-that-will-make-anyone-rich-in-their-20s",
    "title": "The 5 Money Principles that will make anyone RICH in their 20s",
    "headline": "The five stoic commandments that build permanent multi-millionaire wealth before age 30.",
    "description": "A profound blueprint on behavioral finance, avoiding lifestyle creep, operational cash surpluses, convex asymmetric investments, and sovereign networks.",
    "categorySlug": "ai-businesses",
    "categoryName": "AI Businesses",
    "price": 3,
    "originalPrice": 9,
    "currency": "USD",
    "modulesCount": 7,
    "lessonsCount": 28,
    "slidesCount": 112,
    "hoursOfMaterial": "7.5 hours",
    "badge": "Top Rated",
    "rating": 4.9,
    "ratingCount": 524,
    "href": "/the-5-money-principles-that-will-make-anyone-rich-in-their-20s"
  },
  {
    "id": "ai-businesses-13",
    "slug": "its-boring-but-will-make-even-beginners-millionaires-in-2026",
    "title": "It's Boring, But Will Make Even Beginners Millionaires in 2026",
    "headline": "Why unsexy B2B workflow and compliance cash engines silently build eight-figure net worths.",
    "description": "An unfiltered commercial breakdown of boring, uncrowded B2B opportunities: medical clinic workflows, invoice automations, and landing 20 clients at $2,500/mo.",
    "categorySlug": "ai-businesses",
    "categoryName": "AI Businesses",
    "price": 3,
    "originalPrice": 9,
    "currency": "USD",
    "modulesCount": 8,
    "lessonsCount": 32,
    "slidesCount": 128,
    "hoursOfMaterial": "8.5 hours",
    "badge": "High Demand",
    "rating": 4.9,
    "ratingCount": 481,
    "href": "/its-boring-but-will-make-even-beginners-millionaires-in-2026"
  },
  {
    "id": "ai-businesses-14",
    "slug": "i-locked-myself-in-a-room-until-i-built-a-350-000-mo-business",
    "title": "I Locked Myself In a Room Until I Built a $350,000/mo Business",
    "headline": "The raw story and 180-day monk-mode sprint that rebuilt a $350,000/month verified empire.",
    "description": "A cinematic masterclass detailing Sebastian Ghiorghiu's journey from rock bottom to a $350k/mo verified profit machine using high-ticket services and an organic media flywheel.",
    "categorySlug": "ai-businesses",
    "categoryName": "AI Businesses",
    "price": 3,
    "originalPrice": 9,
    "currency": "USD",
    "modulesCount": 8,
    "lessonsCount": 32,
    "slidesCount": 128,
    "hoursOfMaterial": "8.5 hours",
    "badge": "Trending",
    "rating": 4.9,
    "ratingCount": 634,
    "href": "/i-locked-myself-in-a-room-until-i-built-a-350-000-mo-business"
  },
  {
    "id": "ai-businesses-15",
    "slug": "the-4-levels-to-getting-rich-in-2026",
    "title": "The 4 Levels To Getting RICH in 2026",
    "headline": "How to break through the 4 levels of financial consciousness—from Jeffrey to Sovereign Architect.",
    "description": "A hard-hitting tactical breakdown of the four economic tiers: escaping cheap dopamine, breaking the wage cage, bypassing operator bottlenecks, and building sovereign wealth.",
    "categorySlug": "ai-businesses",
    "categoryName": "AI Businesses",
    "price": 3,
    "originalPrice": 9,
    "currency": "USD",
    "modulesCount": 6,
    "lessonsCount": 24,
    "slidesCount": 96,
    "hoursOfMaterial": "6.5 hours",
    "badge": "Bestseller",
    "rating": 4.9,
    "ratingCount": 558,
    "href": "/the-4-levels-to-getting-rich-in-2026"
  },
  {
    "id": "ai-businesses-16",
    "slug": "the-a-i-revolution-8-ways-to-get-rich",
    "title": "The A.I. Revolution: 8 Ways to get RICH",
    "headline": "The 8 proven vehicles to build wealth in the AI revolution: Value Arbitrage, bots, and micro-SaaS.",
    "description": "An actionable guide to the 8 dominant wealth pathways in the AI era: Value Arbitrage, PineScript algorithmic bots, B2B support agents, and synthetic media studios.",
    "categorySlug": "ai-businesses",
    "categoryName": "AI Businesses",
    "price": 3,
    "originalPrice": 9,
    "currency": "USD",
    "modulesCount": 8,
    "lessonsCount": 32,
    "slidesCount": 128,
    "hoursOfMaterial": "8.5 hours",
    "badge": "Hot & New",
    "rating": 4.9,
    "ratingCount": 592,
    "href": "/the-a-i-revolution-8-ways-to-get-rich"
  },"""

idx_start = content.find(old_pattern_start)
idx_end = content.find(old_pattern_end) + len(old_pattern_end)

if idx_start == -1 or idx_end == -1:
    print("ERROR: could not locate pattern in catalog!")
else:
    new_content = content[:idx_start] + replacement + content[idx_end:]
    with open(catalog_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Successfully updated playbooks-catalog.ts!")
