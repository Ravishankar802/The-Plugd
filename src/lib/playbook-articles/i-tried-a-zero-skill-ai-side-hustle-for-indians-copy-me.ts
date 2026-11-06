import { PlaybookArticle } from "./types";

export const ZERO_SKILL_AI_INDIANS_ARTICLE: PlaybookArticle = {
  slug: "i-tried-a-zero-skill-ai-side-hustle-for-indians-copy-me",
  title: "I Tried A Zero Skill AI Side Hustle For Indians (Copy Me)",
  readingTime: "32 min read",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996174/I_Tried_A_Zero_Skill_AI_Side_Hustle_For_Indians_Copy_Me.png",
  publishedDate: "August 2026",
  authorName: "Pooja Patil",
  authorTitle: "AI Creator Strategist & Digital Monetisation Architect",
  introParagraphs: [
    "What this playbook is—and is not: This playbook turns the source experiment into an operating guide. It covers two distinct AI-influencer models: 1. An India-focused fashion persona that showcases products and earns through affiliate commissions. 2. A US-oriented personality brand that publishes opinion-led short videos and sells a digital product.",
    "The source experiment ran for roughly seven days and reported approximately ₹3,400 in Amazon affiliate earnings from the Indian persona and US$17.98 in digital-product sales from the other persona. It also reported a combined figure of about ₹6,000. These are the experiment's reported results, not independently verified earnings, guaranteed outcomes, or a reliable forecast of monthly income. The source's suggestion that the method could produce ₹70,000–₹80,000 per month is an extrapolation, not a result demonstrated by the seven-day test.",
    "'Zero skill' should be understood as low technical barriers, not zero work or zero judgement. You still need to choose a market, create a coherent character, check product accuracy, publish consistently, understand affiliate rules, and improve content based on performance. AI can accelerate production; it does not remove the need for editorial judgement or audience trust."
  ],
  chapters: [
    {
      id: "part-1-business-model",
      number: 1,
      title: "Part 1 — The Business Model: The Two-Persona Strategy & Revenue Paths",
      paragraphs: [
        "1. The Two-Persona Strategy: The experiment deliberately tested two different audiences and monetisation routes instead of forcing one account to serve everyone.",
        "• Model A (Indian Fashion Influencer): Audience: Indian shoppers. Content format: Outfit showcases, hauls, product-led Reels. Monetisation: Amazon Associates affiliate commissions. Main asset: Product discovery and purchase intent.\n• Model B (US-Oriented Character Brand): Audience: English-speaking audience, especially US-facing. Content format: Opinion-led character videos. Monetisation: Digital products sold through a storefront. Main asset: A memorable character and a product that fits its audience.",
        "Why separate the models? Different buying behaviour (a viewer seeking an outfit link has distinct intent from someone watching relationship commentary), different monetisation mechanics (affiliate commissions vs digital product margin), different creative formats, and cleaner performance attribution.",
        "2. The Actual Revenue Paths:\n• Affiliate Model: Create useful product-discovery content -> Direct viewers to a clearly labelled profile link -> Viewer clicks eligible link -> Viewer makes qualifying purchase -> Programme attributes eligible purchase -> Affiliate receives payout according to programme terms.\n• Digital-Product Model: Build audience around a recurring problem/viewpoint -> Create useful downloadable product -> Publish on digital storefront -> Link in profile -> Demonstrate product relevance through content -> Track visits, purchases, refunds, and net proceeds."
      ],
      callout: {
        type: "info",
        title: "The Attribution Principle",
        content: "A click is not a sale. A sale is not necessarily an eligible commission. Returns, cancellations, attribution windows, category rates, and programme conditions affect final earnings."
      }
    },
    {
      id: "part-2-research-before-creating",
      number: 2,
      title: "Part 2 — Research Before Creating: Niche Validation & Monetisation Choice",
      paragraphs: [
        "3. Validate the Niche, Not Just the Trend: The source identifies three broad evergreen areas for character-led content: Health, Wealth, and Relationships. It also examines accounts like a poetry-focused Indian AI influencer, life in Japan, and recognizable older-character accounts. Observe content mechanics that attract genuine attention rather than copying superficial aesthetics.",
        "A Practical Research Routine: Inspect accounts across seven criteria: Character recognizability, content format, hook velocity (stopping scroll in 2 seconds), recurring topic resonance, audience intent, offer alignment, and 30-post repeatability without repetition.",
        "Niche Selection Scorecard (Rate 1 to 5):\n1. You understand audience interests (/5)\n2. Niche supports repeatable short-form content (/5)\n3. Relevant products or useful digital offer exists (/5)\n4. Content can be created without misleading viewers (/5)\n5. Character is clearly differentiated (/5)\n6. Niche can be sustained for at least 30 posts (/5) -> Total out of 30.",
        "4. Choose the Monetisation Route Early: Content and offer must be designed together from Day 1. For Indian fashion, verify affiliate eligibility and product price fit. For digital products, ensure the character discusses a specific recurring problem that a $8–$15 download directly solves."
      ],
      callout: {
        type: "checklist",
        title: "Pre-Launch Research Audit",
        items: [
          "Confirm at least 10 competitor Reels with sustained comment engagement, not just viral views.",
          "Check whether the exact products shown in fashion showcases are currently in stock on Amazon India.",
          "Verify that the digital storefront (Gumroad, Whop) supports payouts to your bank in India.",
          "Confirm that you can state the character's purpose in a single concise sentence."
        ]
      }
    },
    {
      id: "part-3-build-the-character",
      number: 3,
      title: "Part 3 — Build the Character: AI Character Profiles & Personas",
      paragraphs: [
        "5. Create a Character Profile with AI: The source used Claude to generate several character concepts, refining one into 'Grandma Dot' (opinion-led older woman with rich-aunt energy) and the second into 'Meher Kapoor' (young Indian fashion influencer in Jaipur).",
        "Workflow: Generate options -> Compare -> Select -> Refine -> Document. Always create an original fictional persona; never imitate a real person or clone a real living creator's likeness.",
        "6. Example Model A: Opinion-Led Older Character ('Grandma Dot'): Polished, affluent, bluntly honest personality giving candid commentary on modern dating (the talking stage, dry texting, splitting the bill, attention vs. commitment). Signature details: Silver-blonde hairstyle, statement jewelry, emerald ring, living-room armchair setting, dry delivery.",
        "7. Example Model B: Indian Fashion Persona ('Meher Kapoor'): Audience: Indian fashion shoppers. Content promise: Outfit inspiration and product discovery. Main formats: Try-on style montages, suit combinations, haul edits. Setting: Jaipur-inspired lifestyle backdrop. Monetisation: Amazon Fashion affiliate links."
      ],
      callout: {
        type: "prompt",
        title: "Character Profile Generation Prompt",
        content: "Create three distinct fictional social-media influencer concepts for the [NICHE] niche aimed at [TARGET AUDIENCE]. Provide name, username ideas, age, fictional background, visual signatures, three recurring content pillars, distinctive hook, 10 video concepts, and a realistic monetisation route. Do not imitate real living people."
      }
    },
    {
      id: "part-4-visual-continuity",
      number: 4,
      title: "Part 4 — Generate Consistent Visual Assets: Reference Sheets & OpenArt",
      paragraphs: [
        "8. Create a Character Reference Sheet: Continuity is the backbone of virtual influencers. The character sheet must include: front-facing portrait, three-quarter angle, full-body view, typical outfit, hair/makeup specifications, distinctive accessories, and lighting style.",
        "Location Reference Sheet: Create 2–3 recurring settings (e.g., kitchen island, living room armchair) with fixed background layout, lighting, and color palette. A repeatable environment makes the persona feel like a real living entity rather than a random gallery of Midjourney images.",
        "9. Maintain Visual Continuity: When generating new images, use image-to-image or OpenArt character references. Inspect every asset at full 100% resolution for facial consistency, skin tone, hand artifacts, jewelry alignment, and fabric realism before publishing.",
        "10. Create a Reusable Character in OpenArt: 1. Open Character Creation -> 2. Start from Image -> 3. Upload approved reference -> 4. Name persona -> 5. Select or design voice model -> 6. Input concise background description -> 7. Save and reuse across video pipelines."
      ]
    },
    {
      id: "part-5-short-form-content",
      number: 5,
      title: "Part 5 — Turn Ideas into Short-Form Content: Scripting & Video Generation",
      paragraphs: [
        "11. Build a Content Bank Before Publishing: Generate 20 video concepts and complete 5 full scripts before publishing anything. Structure each script: 1. Clear 2-second hook, 2. Specific observation or relatable scenario, 3. Distinctive character interpretation, 4. Natural conclusion or CTA.",
        "12. Give the Character a Recognizable Voice: For opinion characters, focus on one situation per video, maintain a consistent emotional register, and avoid generic motivational quotes. For fashion personas, emphasize the outfit fit, fabric details, and occasions suited for the look.",
        "13. Generate Lip-Sync Talking Videos: In OpenArt, select the saved character, choose lip-sync/talking video workflow, paste the script, set 9:16 vertical ratio, enable voice audio, and audit the output for natural lip synchronisation and facial expressions.",
        "14. Create Fashion Showcase Videos: Use product images from approved Amazon listings combined with the saved character reference. Ensure generated models represent garments responsibly without making false claims about personal wear or fabric authenticity."
      ]
    },
    {
      id: "part-6-indian-affiliate-funnel",
      number: 6,
      title: "Part 6 — Set Up the Indian Affiliate Funnel: Linktree & Amazon Associates",
      paragraphs: [
        "15. Build the Profile Around Product Discovery: The Instagram profile must immediately communicate: What does this account publish? Who is it for? Where can I find the exact outfits? Include transparent disclosure: 'AI-generated fashion visuals | Curated affiliate links'.",
        "16. Create a Link-in-Bio Product Hub: Use Linktree or a dedicated landing page to organize items into intuitive collections: Festive Suits, Everyday Kurtis, Under-₹1,000 Finds, and 'Outfits from Recent Reels'. Audit every link on a mobile device to verify that size, color, and destination match the video.",
        "17. Apply to Amazon Associates: Follow official Amazon Associates India programme rules. Supply active profile URLs, comply with disclosure mandates, use official SiteStripe affiliate tags, and monitor the dashboard for ordered vs. shipped items and returns.",
        "18. Understand Basket Attribution: A user clicking an affiliate link may purchase other household or electronics items during the active attribution window, generating unexpected commissions. However, never build forecasts assuming broad cart purchases; calculate baseline unit economics purely on direct product conversions."
      ],
      callout: {
        type: "checklist",
        title: "Affiliate Link Quality Audit",
        items: [
          "Open each Linktree link on a mobile browser in incognito mode.",
          "Verify the tag parameter (?tag=yourassociate-21) is active.",
          "Check that the product is in stock and sold by a verified seller.",
          "Ensure clear disclosure statement is visible on the landing page."
        ]
      }
    },
    {
      id: "part-7-digital-product-funnel",
      number: 7,
      title: "Part 7 — Create and Sell a Digital Product: The 90-Day Standards Journal",
      paragraphs: [
        "19. Make the Product an Extension of the Character: For 'Grandma Dot', an 18-page digital PDF '90 Day Standards Journal' was created, translating her frank relationship commentary into a practical self-assessment workbook.",
        "20. Evaluate Product Ideas Before Generation: Confirm a clear buyer persona, specific use case, direct alignment with recurring Reels, actionable prompts, defensible pricing ($8.99 / ₹750), and transparent product descriptions.",
        "21. Generate & Quality-Check the PDF: Structure the workbook: 1. Cover & Purpose, 2. How to use, 3. Personal standards inventory, 4. Boundary checklists, 5. Red flag decision filters, 6. Weekly reflection worksheets, 7. 30/60/90-day progress reviews. Audit every single page for layout, typography, and writing space.",
        "22. List on Digital Storefront (Gumroad): Upload the PDF, write a crisp outcome-driven product description, upload mockups, set pricing at $8.99, configure instant email delivery, and link directly in the character's bio."
      ]
    },
    {
      id: "part-8-seven-day-launch-plan",
      number: 8,
      title: "Part 8 — The 7-Day Sprint & Results: Reality vs Extrapolation",
      paragraphs: [
        "23. The Seven-Day Experiment Timeline: Days 1–2: Research, character creation, and visual sheets. Day 3: Content batching and profile launch. Day 4: Publishing begins. Day 5: Digital product listed on storefront. Day 7: Comprehensive performance review.",
        "24. 7-Day Action Plan: Follow a rigorous daily execution cadence from Day 1 niche selection to Day 7 commercial telemetry review.",
        "25. What the Source Experiment Reported:\n• Indian Fashion Persona: 197 followers, ₹3,400 Amazon affiliate earnings.\n• Older Character Brand: ~1,300 followers, $17.98 digital product sales (2 sales @ $8.99).\n• Combined Gross Revenue: Approximately ₹6,000 in 7 days.",
        "26. How to Interpret Results: These early earnings prove that small accounts can monetize before reaching tens of thousands of followers. However, gross revenue is not net profit. AI subscriptions, software credits, platform fees, and production hours must be subtracted."
      ],
      callout: {
        type: "quote",
        title: "The Realistic Operator Mindset",
        content: "Extrapolating ₹6,000 in 7 days into ₹70,000–₹80,000/month is a speculative hypothesis. Sustainable scaling requires accounting for subscriber churn, content burnout, seasonal affiliate rates, and real production costs."
      }
    },
    {
      id: "part-9-operating-system-safeguards",
      number: 9,
      title: "Part 9 — Safeguards, Economics & The Repeatable Production Loop",
      paragraphs: [
        "31. Transparency & Synthetic Media Rules: Always label AI personas clearly in bio and captions (#AIInfluencer, #AIGenerated). Never fabricate personal product testing, medical qualifications, or fake customer testimonials.",
        "32. Protect Viewers from Misleading Visuals: Disclose that fashion try-on visuals are AI-generated visualisations rather than personal customer fitting photos.",
        "33. Calculate True Unit Economics: Subtract OpenArt credits, Claude subscriptions, Linktree PRO fees, Gumroad 10% transaction fees, and banking FX conversion charges to determine net hourly earnings.",
        "34. The Daily & Weekly Production Loop: Execute the 8-step cycle: Research -> Plan -> Write -> Generate -> Review -> Publish -> Measure -> Improve. Scale only when retention, link CTR, and net margins are positive."
      ]
    },
    {
      id: "part-10-appendices-worksheets",
      number: 10,
      title: "Part 10 — Worksheets & Launch Appendices: Checklists & Trackers",
      paragraphs: [
        "Appendix A: One-Page Launch Worksheet — Document character name, audience, niche, content pillars, visual signatures, voice, platform, monetisation model, and stopping conditions.",
        "Appendix B: Content Idea Worksheet — Record audience pain points, hooks, core observations, visual format, CTA, and post conversions across 20 distinct topics.",
        "Appendix C: Revenue & Cost Worksheet — Track gross affiliate revenue, digital sales, platform fees, AI tool subscriptions, net earnings, and net hourly returns."
      ],
      callout: {
        type: "prompt",
        title: "Final Central Takeaway",
        content: "AI tools dramatically lower the technical barrier to content production, allowing solo operators to test creator-business models rapidly. Start small, review every output with rigorous editorial standards, maintain 100% transparency, and scale based on verified net revenue."
      }
    }
  ],
  closingParagraphs: [
    "Important Notice: This playbook provides educational business-planning methodologies for digital content creators. It does not promise guaranteed revenue or substitute for legal, tax, or affiliate platform compliance. Always consult official platform terms and tax professionals before operating commercial affiliate accounts."
  ]
};
