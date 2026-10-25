import json

def make_slide(sid, order, eyebrow, headline, subheadline, bullets, takeaway):
    return {
        "id": sid,
        "order": order,
        "type": "LIST",
        "eyebrow": eyebrow,
        "headline": headline,
        "subheadline": subheadline,
        "title": headline,
        "subtitle": subheadline,
        "bulletPoints": bullets,
        "takeaway": takeaway
    }

m05_l1_slides = [
    make_slide(
        "s-051-1", 1, "MODULE 05 · LESSON 5.1",
        "The Direct-Response AI Copywriting Engine",
        "Why specialized prompt scaffolding outperforms generic ChatGPT writing for commercial sales pages.",
        [
            "The Generic Prompt Failure: Asking an AI to 'write a sales page' outputs robotic fluff, empty clichés, and zero psychological urgency.",
            "Direct-Response Anchoring: Grounding the model in proven frameworks (Problem-Agitate-Solve, Hook-Story-Offer) with strict tone restrictions.",
            "Voice Matching: Injecting the creator's top 10 social media captions into the context window ensures the sales copy sounds 100% authentic.",
            "Rapid Execution: Producing a 2,000-word long-form sales page, VSL script, and 5 launch emails in under 2.5 hours."
        ],
        "Scaffolded AI prompt frameworks allow you to write elite direct-response sales copy without years of copywriting experience."
    ),
    make_slide(
        "s-051-2", 2, "MODULE 05 · LESSON 5.1",
        "The 5-Part High-Converting Landing Page Anatomy",
        "The non-negotiable structural elements required to convert cold mobile traffic on Whop.",
        [
            "Section 1: The Hero Header & Headline — Clear outcome promise, subheadline addressing the #1 objection, and prominent CTA button.",
            "Section 2: The Agitation & Villain — Validating the reader's frustration with traditional broken methods in the niche.",
            "Section 3: The 'New Mechanism' — Introducing the creator's unique proprietary framework that makes success inevitable.",
            "Section 4: Curriculum Breakdown & Deliverables — Visually detailing every module, worksheet, and bonus included in the purchase.",
            "Section 5: Risk Reversal Guarantee & FAQ — 14-day action guarantee and addressing the top 5 buying objections directly."
        ],
        "A high-converting landing page follows a proven psychological flow designed to eliminate buyer hesitation at every scroll."
    ),
    make_slide(
        "s-051-3", 3, "MODULE 05 · LESSON 5.1",
        "The 90-Second Video Sales Letter (VSL) Script",
        "Structuring the short video script the creator records for the top of the sales page.",
        [
            "Banish the 45-Minute Webinar: Modern mobile audiences have zero patience; keep the landing page VSL strictly under 90 to 120 seconds.",
            "0:00–0:15: The Hook & Pattern Interrupt — Creator addresses the exact problem their followers DM them about daily.",
            "0:15–0:45: The Story & Realization — Creator shares the breakthrough insight that changed their own journey.",
            "0:45–1:15: The Offer Overview — Introducing the exact masterclass, modules, and implementation worksheets.",
            "1:15–1:30: The Call to Action — Inviting the viewer to click the button below and join the initial launch cohort."
        ],
        "A concise 90-second VSL recorded by the creator on their smartphone converts higher than a bloated 60-minute webinar."
    ),
    make_slide(
        "s-051-4", 4, "MODULE 05 · LESSON 5.1",
        "The 5-Part Email Announcement Sequence",
        "The psychological launch sequence that drives urgency without burning audience goodwill.",
        [
            "Email 1 (48h Pre-Launch): The Curiosity Hook — 'Something major is coming on Thursday...'",
            "Email 2 (Launch Morning): Doors Open — Announcing the program with early-bird pricing for the first 100 members.",
            "Email 3 (Day 3): The Case Study Breakdown — Breaking down how a student achieved the core result in 14 days.",
            "Email 4 (Day 5): Overcoming the #1 Objection — Addressing time commitment, equipment, or difficulty.",
            "Email 5 (Day 7 - Final 6 Hours): Urgency & Doors Closing — 'Final call: early-bird cohort access closes at midnight.'"
        ],
        "The final 24 hours of a launch typically generate over 45% of total sales due to scarcity and deadline urgency."
    )
]

m05_l1_written = """# 5.1 AI-Powered Launch Strategy & Automated Sales Asset Generation

> **Module 05: The AI Shadow Operator Launch & Monetization Engine**  
> *Playbook: These 3 AI Businesses Will Make You $10k+/Month (With Zero Employees)*

---

## Executive Overview & Asset Velocity

Historically, preparing a product launch for a creator was a grueling, multi-month endeavor requiring a direct-response copywriter ($5,000 fee), a funnel designer ($3,000 fee), and an email marketing consultant ($2,500 fee).

As an **AI Shadow Operator**, you replace this entire agency roster with specialized frontier LLM prompting frameworks.

In less than 3 hours, you can generate:
1. A high-converting **2,000-word direct-response sales page** optimized for mobile viewing on Whop.
2. A charismatic **90-second Video Sales Letter (VSL) script** tailored to the creator's natural speaking style.
3. A battle-tested **5-part launch email sequence** that drives urgency without alienating the creator's audience.
4. A complete set of **Instagram Story teaser scripts** formatted for natural smartphone recording.

---

## 1. The Direct-Response Landing Page Framework

Never build a complex, multi-page website with confusing tabs and external links. The highest-converting digital product funnels use a **single-page linear layout**:

```
[Section 1: Hero Block]          Catchy Headline + 90s VSL Video + Checkout Button
       |
[Section 2: The Pain Hook]       "Why everything you've tried before has failed..."
       |
[Section 3: The New Mechanism]   Introducing the Creator's Proprietary Framework
       |
[Section 4: Curriculum Breakdown] Detailed 4-Module Overview + Included Worksheets
       |
[Section 5: Trust & Risk Reversal] Creator Bio + 14-Day Action Guarantee + FAQs
       |
[Section 6: Final CTA Button]    "Join the Cohort - Instant Mobile Checkout"
```

---

## 2. Production Prompt: The AI Sales Page Copywriter

Deploy this exact prompt inside Claude 3.5 Sonnet to draft the complete sales page in one pass:

```
You are a legendary direct-response copywriter combining the psychological urgency of Gary Halbert with the modern clean aesthetics of high-converting Whop campuses.
You are writing a mobile-optimized sales page for [Creator Name]'s new digital masterclass: [Product Name].

PRODUCT DETAILS:
- Niche: [e.g. Marathon injury prevention]
- Price: $399
- Target Audience: [e.g. Amateur runners struggling with knee and calf pain]
- Core Transformation: [e.g. Run pain-free in 30 days without expensive physical therapy]
- Modules: [Paste 4 module titles from extraction call]

RULES:
1. Tone: Warm, authoritative, and direct. Banish corporate buzzwords.
2. Format: Clear section headers, bulleted benefit statements, and bold emphasis on key outcomes.
3. Objections: Directly address "I don't have time" and "I've already tried generic stretches".

GENERATE THE COMPLETE SALES COPY:
- Section 1: Hero headline, subhead, and CTA label.
- Section 2: 90-second VSL video script for the creator.
- Section 3: The 3 core problems the reader is facing right now.
- Section 4: The curriculum breakdown (Module 1 through 4 with benefit bullets).
- Section 5: The 14-day "Do-The-Work" satisfaction guarantee.
- Section 6: Top 5 buyer FAQs with concise answers.
```

---

## 3. The 90-Second VSL Architecture

Do not ask the creator to record a 45-minute slide presentation. Mobile social media traffic will not watch it.

The creator stands in front of their smartphone with natural window lighting and speaks directly to the camera for 90 seconds:

```
[0:00 - 0:15]  "If you've been struggling to [solve acute pain], stop scrolling for 60 seconds."
[0:15 - 0:35]  "For the past 3 years, my DMs have been flooded with the exact same question: 
               'How do I [achieve result] without [painful barrier]?'"
[0:35 - 0:55]  "Most people think the answer is [common myth], but that actually makes things worse. 
               The real breakthrough is [proprietary mechanism]."
[0:55 - 1:15]  "I've spent the last 2 months packaging my exact step-by-step protocol into 
               [Product Name]—a 30-day guided masterclass on Whop."
[1:15 - 1:30]  "We're opening doors for our first cohort of 100 students today. 
               Click the button below, grab your access, and I'll see you inside the private campus."
```

---

## 4. The 5-Part Email & Story Sequence Calendar

| Launch Day | Communication Channel | Subject Line / Hook | Psychological Objective |
|---|---|---|---|
| **Day -2 (Tuesday)** | Instagram Stories + Email | *"I'm finally doing this..."* | Seed curiosity; ask audience to vote in a poll if they want early access. |
| **Day 1 (Thursday)** | Stories + Email + Feed | *"Doors are officially open (first 100 spots only)"* | Announce availability; trigger early-adopter FOMO. |
| **Day 3 (Saturday)** | Stories + Email | *"How Mark fixed his [problem] in 11 days"* | Proof of concept; social proof and relatable case study. |
| **Day 5 (Monday)** | Email + DM outreach | *"The #1 reason people hesitate..."* | Neutralize price and time objections directly. |
| **Day 7 (Wednesday)** | 3x Stories + 2x Emails | *"Final 6 Hours: Early-bird access closes tonight"* | Strict deadline scarcity; drives 40%+ of total launch revenue. |

---

## 5. Diagnostic Failure Analysis

| Copywriting Error | Why It Destroys Conversion | Solution |
|---|---|---|
| **Weak, Vague Headline** | "Learn how to be better at running" fails to excite anyone | Anchor to specific transformation: "The 30-Day Joint Resilience Protocol for Pain-Free Running". |
| **Lack of Scarcity** | Customers put off buying until "next week" and forget | Implement cohort caps (100 spots) or early-bird pricing that expires on Day 7. |
| **Over-Promising Fictitious Results** | Triggers skepticism and chargebacks | Use authentic, grounded language; clearly state that results require executing the daily drills. |

---

## 6. Practical Implementation Exercise

1. **Run the AI Sales Page Prompt:** Execute the master prompt in Claude for a fictional $399 product.
2. **Review the Generated VSL Script:** Read the 90-second script aloud and time yourself with a stopwatch.
3. **Format the Whop Landing Page:** Log into Whop, open the product description editor, and paste the generated copy into the layout blocks.

---

## 7. Key Actionable Takeaways

1. **AI replaces expensive copywriting agencies:** Scaffolded prompts generate broadcast-ready sales pages in under 3 hours.
2. **Single-page linear funnels convert highest:** Guide the mobile buyer seamlessly from hero to VSL to checkout.
3. **90-second VSL beats long webinars:** Keep video scripts concise, authentic, and smartphone-friendly.
4. **Scarcity drives the close:** The final 24 hours of a launch generate over 40% of total revenue.
"""

m05_l2_slides = [
    make_slide(
        "s-052-1", 1, "MODULE 05 · LESSON 5.2",
        "The 7-Day Launch Architecture",
        "The daily execution cadence that turns passive followers into an active buying frenzy.",
        [
            "Phase 1: Pre-Launch Seeding (Days -3 to -1) — Polling audience interest, sharing behind-the-scenes filming, building anticipation.",
            "Phase 2: The Early-Bird Surge (Days 1 & 2) — Opening doors with a strict 100-student cap or $100 launch discount.",
            "Phase 3: The Mid-Launch Value Anchor (Days 3 to 5) — Sharing sample worksheets, answering FAQs, and spotlighting early student wins.",
            "Phase 4: The Urgency Climax (Days 6 & 7) — Countdown timers, final call notifications, and locking the doors at midnight."
        ],
        "Structure the launch as an exclusive, time-sensitive event to force prospective buyers to make a definitive decision."
    ),
    make_slide(
        "s-052-2", 2, "MODULE 05 · LESSON 5.2",
        "Automated DM Lead Funnels via ManyChat / Chatfuel",
        "Turning story comments and DM triggers into instant checkout links without manual typing.",
        [
            "The Keyword Trigger: Creator posts a story: 'Reply PROTOCOL to this story and I'll send you the private link.'",
            "Sub-15-Second Automated DM: An automated Instagram bot instantly sends the user a personalized message with the Whop link.",
            "The Conversion Dividend: DM links convert at 35% higher rates than generic 'link-in-bio' clicks because the interaction feels 1-on-1.",
            "Zero Creator Labor: Thousands of interested followers receive immediate personalized links while the creator goes about their day."
        ],
        "Automated keyword DMs bridge the gap between casual story viewers and confirmed checkout conversions."
    ),
    make_slide(
        "s-052-3", 3, "MODULE 05 · LESSON 5.2",
        "The 100-Sale Milestone Math",
        "Deconstructing the conversion numbers behind a $50,000 launch from a 50k following.",
        [
            "Total Creator Following: 50,000 followers across Instagram and TikTok.",
            "Story Viewers Reached: 2,500 active, loyal daily story viewers (5% of following).",
            "DM Triggers Captured: 450 followers comment 'PROTOCOL' during the 7-day launch.",
            "Total Paid Conversions: 100 students purchase at $500 ($50,000 gross / $15,000 operator profit).",
            "The 99.8% Reality: Over 49,900 followers did not buy, yet the launch was an astronomical financial triumph."
        ],
        "You do not need mass virality to earn $15,000; you only need a fraction of 1% of the audience to purchase."
    ),
    make_slide(
        "s-052-4", 4, "MODULE 05 · LESSON 5.2",
        "Post-Launch Cohort Onboarding & Delivery",
        "Welcoming students and locking in high satisfaction to prevent refunds.",
        [
            "Instant Welcome Video: Creator records an authentic 60-second video welcoming students inside the Whop classroom.",
            "The Quick-Win Action Step: Guide students to complete Module 1, Lesson 1 immediately for an instant dopamine hit.",
            "Community Moderation Bot: Set up an automated Discord or Whop bot that answers basic access questions 24/7.",
            "Refund Mitigation: Over 95% of refunds occur when students feel lost; automated onboarding eliminates buyer remorse entirely."
        ],
        "Flawless Day 1 onboarding transforms buyers into passionate brand advocates and reduces refunds to near zero."
    )
]

m05_l2_written = """# 5.2 The 1-Week Launch Gauntlet: From Teaser Campaign to 100 Paying Customers

> **Module 05: The AI Shadow Operator Launch & Monetization Engine**  
> *Playbook: These 3 AI Businesses Will Make You $10k+/Month (With Zero Employees)*

---

## Executive Overview & The 7-Day Campaign Strategy

A product launch is not an announcement; **a product launch is a choreographed psychological drama**.

When amateur creators attempt to launch, they post a single link in their Instagram bio on a random Tuesday, write *"Check out my new course!"*, and wonder why only two people buy.

Professional AI Shadow Operators understand that human decision-making requires **anticipation, social proof, and non-negotiable deadline scarcity**. By executing a structured 7-day launch gauntlet, you create an event atmosphere where followers feel compelled to act before the doors close.

---

## 1. The Day-by-Day Launch Playbook

```
[Days -3 to -1]:  Pre-Launch Seeding (Polls, BTS Teasers, Curiosity Traps)
[Day 1]:           The Early-Bird Surge (First 100 Spots / $100 Discount Open)
[Day 2]:           The Momentum Proof (Celebrating First 30 Students Inside)
[Day 3]:           The Deep-Dive Teardown (Sample Worksheet Walkthrough)
[Day 4]:           The Student Win Case Study (Early Feedback Spotlight)
[Day 5]:           The Objection Crusher (Addressing "I don't have time")
[Day 6]:           The Scarcity Warning (Only 14 Spots Remaining)
[Day 7]:           The Midnight Climax (Doors Close - Final Urgency Spike)
```

### Days -3 to -1: The Seeding Phase
- The creator posts an Instagram story poll: *"I've spent the last 6 weeks packaging my exact mobility routine into a guided program. Should I release it to 50 of you this Thursday? Vote YES or NO."* (94% vote yes, priming the algorithm).
- Behind-the-scenes clips of the creator filming modules on their phone.

### Day 1: The Doors-Open Surge
- Post a story and reel announcing that enrollment is officially live.
- The call to action is strictly: *"Reply PROTOCOL to this story and I'll DM you the link."*
- The first 25–40 sales occur within the first 6 hours.

### Days 3 to 5: Mid-Launch Proof & Education
- Share screenshots of early students introducing themselves in the Whop community lounge.
- Creator records a 3-minute video breaking down one specific high-impact worksheet from Module 2.

### Days 6 & 7: The Scarcity Climax
- Announce: *"The early-bird cohort pricing closes tonight at midnight, or when the final 12 spots fill."*
- Post 3 stories throughout Day 7 with countdown stickers: 6 hours left, 2 hours left, 30 minutes left.
- **Over 40% of total launch sales occur in the final 8 hours of Day 7.**

---

## 2. Automated DM Funnels: The ManyChat Infrastructure

Never tell followers to *"go click the link in my bio"*. The bio link is a conversion graveyard: users leave the story, get distracted by other posts, and abandon the purchase.

Deploy **automated keyword DM triggers**:

```
[Follower Watches Story] ---> [Types "PROTOCOL" in DM Box]
                                         |
                                         v (Sub-15s Response)
                       [Automated ManyChat / Chatfuel Bot]
                       "Hey [Name]! Here is your private early-bird link:
                        https://whop.com/checkout/protocol?code=EARLYBIRD
                        Grab your spot before the first 100 fill!"
```

### Why DM Automation Converts 300% Higher:
1. **Personal Connection:** The message lands in the user's private direct messages, creating a 1-on-1 feeling.
2. **Push Notifications:** The user receives an instant phone notification with the link.
3. **Tracking & Analytics:** You track exactly how many users requested the link versus how many completed checkout.

---

## 3. The 100-Sale Milestone Unit Economics

Review the mathematical reality of achieving 100 sales from a 50,000-follower micro-creator:

$$\\text{Total Following} = 50,000$$
$$\\text{Active Story Viewers} = 2,500 \\quad (5\\% \\text{ of following})$$
$$\\text{DM Inquiries Triggered} = 450 \\quad (18\\% \\text{ of story viewers})$$
$$\\text{Checkout Link Clicks} = 380 \\quad (84.4\\% \\text{ of inquiries})$$
$$\\text{Purchased Customers} = 100 \\quad (26.3\\% \\text{ of clicks})$$
$$\\text{Gross Revenue (100} \\times \\$500) = \\$50,000$$
$$\\text{Creator Share (70\\%)} = \\$35,000$$
$$\\mathbf{\\text{Your Net Operator Profit (30\\%)}} = \\mathbf{\\$15,000}$$

Notice the staggering implication: **49,900 followers (99.8% of the creator's total audience) did not buy anything**, and you still earned **$15,000 in a single week**.

---

## 4. Production ManyChat JSON Workflow Specification

```json
{
  "trigger": {
    "channel": "instagram_direct",
    "event": "story_reply_or_comment",
    "keyword": "PROTOCOL"
  },
  "actions": [
    {
      "type": "send_message",
      "text": "Hey there! Thanks for reaching out. Here is the private link to join our early-bird cohort on Whop:",
      "buttons": [
        {
          "type": "web_url",
          "url": "https://whop.com/checkout/joint-protocol?ref=launch",
          "title": "Access The Masterclass"
        }
      ]
    },
    {
      "type": "delay",
      "delay_seconds": 1800
    },
    {
      "type": "conditional_check",
      "condition": "has_purchased == false",
      "follow_up_message": "Hey! Just wanted to check if you had any questions about the 30-day protocol before the first cohort spots fill up?"
    }
  ]
}
```

---

## 5. Diagnostic Failure Analysis

| Launch Crisis | Root Cause | Real-Time Triage |
|---|---|---|
| **Slow Sales on Day 1 (Only 5 sales)** | Offer lacks a clear, urgent problem hook | Have creator post a raw story addressing the #1 frustration of their followers and offer a bonus Q&A call to the next 15 buyers. |
| **DM Bot Token Rate Limit** | Viral surge crashing unverified bot | Use native Whop checkout links in creator bio as emergency backup; respond to DMs manually with pre-saved keyboard shortcuts. |
| **High Checkout Drop-Off** | Form asks for too many fields | Disable shipping address and unnecessary fields; enable Apple Pay 1-click checkout on Whop. |

---

## 6. Practical Implementation Exercise

1. **Configure a Test Keyword in ManyChat:** Set up an Instagram automation triggering on the word `LAUNCH` that replies with a sample link.
2. **Test the DM Trigger:** Send `LAUNCH` from a personal test account and verify that the automated response arrives within 15 seconds.
3. **Map the 7-Day Calendar:** Create a Google Sheet scheduling exact story post times (e.g. 9:00 AM and 6:30 PM daily) for the launch week.

---

## 7. Key Actionable Takeaways

1. **Launches are psychological events:** Follow the 7-day arc from seeding to early-bird surge to midnight scarcity.
2. **DM triggers convert 300% better than bio links:** Use ManyChat to deliver instant checkout links in private messages.
3. **99.8% rejection still equals $15,000 profit:** 100 sales at $500 yields $50,000 gross with a fractional audience conversion.
4. **The final 24 hours matter most:** Never ease up on Day 6 and 7; scarcity drives the majority of revenue.
"""

m05_l3_slides = [
    make_slide(
        "s-053-1", 1, "MODULE 05 · LESSON 5.3",
        "From Launch Spike to Evergreen Compounding",
        "How to avoid the dreaded post-launch revenue collapse and build sustainable income.",
        [
            "The Post-Launch Trap: Amateur operators celebrate a $15,000 launch, do nothing for 3 months, and watch revenue drop to zero.",
            "The Evergreen Architecture: Integrating subtle monetization hooks into the creator's ongoing organic content cadence.",
            "The Weekly Story Highlight Funnel: Permanent Instagram highlights that funnel new followers into the automated DM booking link 24/7.",
            "The Sustainable Rhythm: Generating 50 evergreen sales/month at $500 = $25,000 gross = $7,500/month recurring operator profit."
        ],
        "An evergreen system monetizes new followers automatically the moment they discover the creator's profile."
    ),
    make_slide(
        "s-053-2", 2, "MODULE 05 · LESSON 5.3",
        "The 3 Evergreen Organic Conversion Assets",
        "The permanent profile assets that generate hands-off sales week after week.",
        [
            "Asset 1: The Pinned Profile Reel — A viral breakdown of the core problem ending with: 'Comment GUIDE to get my full protocol.'",
            "Asset 2: The Highlight Story Case Study — A dedicated 6-story highlight showing before-and-after student transformations and testimonials.",
            "Asset 3: The Free Lead Magnet Bridge — A 2-page PDF summary that captures email addresses and triggers an automated 4-day nurture sequence.",
            "Passive Distribution: Every new viral reel published by the creator drives fresh eyeballs into this permanent evergreen funnel."
        ],
        "Permanent pinned assets ensure that every piece of organic content the creator posts drives evergreen sales."
    ),
    make_slide(
        "s-053-3", 3, "MODULE 05 · LESSON 5.3",
        "Automated Email Retargeting & Abandoned Cart Recovery",
        "Recapturing interested prospects who clicked checkout but failed to enter their card.",
        [
            "The Abandoned Cart Bleed: Over 70% of mobile checkout visitors drop off due to momentary interruptions (phone calls, lost internet).",
            "The 60-Minute Cart Recovery Email: Automated webhook triggers an email 1 hour later: 'Did life get in the way? Your spot is held for 24 hours.'",
            "Recovering 15% to 22% of Lost Sales: This single automated sequence adds $3,000 to $5,000 in monthly evergreen revenue with zero human work.",
            "One-Click Checkout Recovery: The email contains an authenticated direct link that pre-populates their email and cart items."
        ],
        "Automated cart recovery pipelines recover thousands of dollars in lost revenue silently in the background."
    ),
    make_slide(
        "s-053-4", 4, "MODULE 05 · LESSON 5.3",
        "The Solo Operator Weekly Maintenance Protocol",
        "How to manage an active evergreen product in less than 2 hours per week.",
        [
            "Monday (20m): Check Stripe payout reconciliations and review community analytics on Whop.",
            "Wednesday (30m): Send creator a 2-minute Loom suggesting 2 organic story hooks based on trending questions in comments.",
            "Friday (30m): Review abandoned cart recovery metrics and update student onboarding announcement boards.",
            "Total Weekly Commitment: Less than 90 minutes of active work per creator partner, enabling massive portfolio scale."
        ],
        "Proper evergreen automation gives you complete schedule autonomy while generating predictable 5-figure monthly profits."
    )
]

m05_l3_written = """# 5.3 Post-Launch Evergreen Systems: Compounding 50 Recurring Sales/Month

> **Module 05: The AI Shadow Operator Launch & Monetization Engine**  
> *Playbook: These 3 AI Businesses Will Make You $10k+/Month (With Zero Employees)*

---

## Executive Overview & The Evergreen Dividend

In the source masterclass, Iman Gadzhi emphasized a crucial mathematical transition:

> *"Even if after the initial launch week you only go on to make 50 sales per month going forward, you would still get paid $7,500 per month for doing practically no work. And the fact that you can scale with minimal additional work means there isn't a cap on the number of partnerships in your portfolio."*

Many amateur operators treat product launches like a one-night fireworks show: they celebrate an initial $15,000 launch payday, close the doors, and allow the product to gather dust for the next six months while their revenue plunges back to zero.

**Elite Shadow Operators construct permanent Evergreen Conversion Engines.**

Once the initial launch cohort completes, you transition the product from a closed event into an evergreen asset that captures, qualifies, and converts new social media followers automatically 24 hours a day, 365 days a year.

---

## 1. The 3 Permanent Profile Conversion Assets

Every month, the creator's organic content attracts between 2,000 and 8,000 new followers. To convert this fresh traffic into paying customers without annoying their audience with constant sales pitches, install these **3 Permanent Conversion Assets**:

```
[New Follower Discovers Profile]
               |
               +---> [Asset 1: Pinned Profile Reel]  --> "Comment 'GUIDE' for my exact system"
               |
               +---> [Asset 2: Highlight Case Study]  --> "6 stories showing before & after wins"
               |
               +---> [Asset 3: Free 2-Page Checklist] --> Captures email into 4-day nurture
```

### Asset 1: The Pinned Viral Video Bridge
Pin a high-value educational video to the top of the creator's profile. The video delivers a genuine breakthrough insight and concludes with:  
*"If you want the complete step-by-step 30-day framework, comment 'START' below and I'll send you the private masterclass link."*
- Every new visitor who views their profile sees this reel first.
- ManyChat automatically DMs the checkout link to every commenter.

### Asset 2: The Permanent "Results" Story Highlight
Create a dedicated Instagram Story Highlight titled **"Results"** or **"Reviews"**:
- Story 1: Creator explains why they built the program.
- Stories 2–5: Screenshots of real customer reviews and progress photos from the Whop community.
- Story 6: Direct swipe-up/sticker link to the Whop checkout page.

### Asset 3: The Automated Abandoned Cart Recovery Loop
Over 68% of users who tap "Buy Now" on mobile abandon checkout before completing payment (often interrupted by an incoming phone call or distracted by a text).
- **The Trigger:** A webhook fires in Whop/Stripe when checkout is initiated but unpaid after 60 minutes.
- **The Email:** An automated message is sent: *"Hey! Saw you were checking out the 30-Day Protocol. Just held your early-bird access for 24 hours in case your internet cut out. Click here to resume where you left off."*
- **The Impact:** Recovers 16% to 24% of abandoned carts, adding **$3,000 to $6,000 in monthly evergreen revenue** with zero human effort.

---

## 2. Unit Economics of the Evergreen Model

Let us examine the recurring math of a single creator partner in evergreen mode:

$$\\text{Monthly New Followers} = 3,500 \\text{ followers}$$
$$\\text{Evergreen Sales Target} = 50 \\text{ units / month} \\quad (1.4\\% \\text{ of new followers})$$
$$\\text{Product Price} = \\$500.00$$
$$\\text{Gross Monthly Sales} = 50 \\times \\$500 = \\$25,000.00 / \\text{month}$$
$$\\text{Stripe / Merchant Fees (2.9\\%)} = \\$725.00$$
$$\\text{Net Distributable Cash} = \\$24,275.00$$
$$\\text{Creator's 70\\% Share} = \\$16,992.50 / \\text{month} \\quad \\text{(Passive creator income)}$$
$$\\mathbf{\\text{Your 30\\% Operator Share}} = \\mathbf{\\$7,282.50 / \\text{month}} \\quad \\text{(Predictable solo profit!)}$$

Now, multiply this by **2 or 3 creator partnerships** in different niches:
- Partner 1 (Fitness): $7,280 / mo
- Partner 2 (Finance): $5,500 / mo
- Partner 3 (Productivity): $4,200 / mo
- **Total Combined Evergreen Income = $16,980.00 per month**

You have built a business generating over **$200,000 a year in personal take-home profit**, with zero employees, zero payroll liabilities, and less than 6 hours of total weekly maintenance!

---

## 3. Production Make.com Abandoned Cart Automation Architecture

```json
{
  "scenario_name": "whop_abandoned_cart_recovery",
  "trigger": {
    "module": "whop_webhook",
    "event": "checkout_abandoned",
    "required_delay_minutes": 60
  },
  "logic": [
    {
      "module": "filter",
      "condition": "customer_has_active_membership == false"
    },
    {
      "module": "email_dispatcher",
      "provider": "resend_or_postmark",
      "template": "abandoned_cart_reminder",
      "params": {
        "customer_first_name": "{{trigger.first_name}}",
        "recovery_checkout_url": "{{trigger.checkout_recovery_url}}"
      }
    },
    {
      "module": "telemetry_logger",
      "target": "airtable_cart_recoveries",
      "status": "email_dispatched"
    }
  ]
}
```

---

## 4. Diagnostic Failure Analysis

| Evergreen Leak | Root Cause | Tactical Correction |
|---|---|---|
| **Creator Stops Posting Organic Content** | Creator gets complacent with initial cash flow | Send monthly performance reports showing exact dollar losses per day of inactivity to rekindle motivation. |
| **Outdated Links in Bio** | Broken redirect links losing mobile traffic | Audit all bio links and ManyChat keywords on the 1st and 15th of every month. |
| **Community Engagement Decay** | Whop members feel ignored after initial launch | Set up a weekly discussion prompt bot inside Whop to maintain lively member banter. |

---

## 5. Practical Implementation Exercise

1. **Set Up an Abandoned Cart Sequence:** In Whop or Stripe, enable automated abandoned checkout recovery emails.
2. **Draft a 3-Story Evergreen Highlight:** Write copy for a 3-slide Instagram story highlight showcasing real customer results and a direct booking link.
3. **Calculate Multi-Partner Projections:** Build a simple financial table modeling monthly earnings across 2, 3, and 4 creator partners.

---

## 6. Key Actionable Takeaways

1. **Launches start the engine; evergreen pays the bills:** Aim for 50 evergreen sales/month per partner.
2. **50 sales @ $500 yields $7,500/mo net profit:** Generates predictable 5-figure income from a single creator.
3. **Install the 3 permanent profile assets:** Pinned reel, results highlight, and abandoned cart recovery.
4. **Scale to 3 creator partners:** Manage a portfolio generating $15k–$25k/mo in under 6 hours of weekly maintenance.
"""

m05_l4_slides = [
    make_slide(
        "s-054-1", 1, "MODULE 05 · LESSON 5.4",
        "The 5% Inaction Problem",
        "Why some creators freeze when asked to film course content and how to unblock them.",
        [
            "The Artist Mindset: Creators are creative, intuitive beings; when faced with a large, undefined project, they experience anxiety and procrastinate.",
            "Perfectionism Paralysis: 'I need a better camera, I need to buy studio lights, my hair isn't right today.'",
            "The Honest Reality: In 95% of cases, creators are thrilled and execute promptly; but in 5% of cases, they stall.",
            "The Operator's Remedy: Never say 'film your course'; give them a 1-page script and say 'record this single 6-minute video on your phone today.'"
        ],
        "Eliminate creator procrastination by breaking content production into tiny, frictionless 15-minute daily micro-tasks."
    ),
    make_slide(
        "s-054-2", 2, "MODULE 05 · LESSON 5.4",
        "The 14-Day Micro-Milestone Sprint Calendar",
        "A structured, day-by-day roadmap that turns overwhelming course production into child's play.",
        [
            "Day 1–2: The 45-Minute Extraction Interview (You record the call and extract their knowledge).",
            "Day 3–4: AI Curriculum Generation (You deliver 12 bulleted lesson cards to their phone).",
            "Day 5–7: Module 1 & 2 Filming (Creator records 6 short videos on smartphone while walking or at desk).",
            "Day 8–10: Module 3 & 4 Filming (Creator finishes remaining 6 videos; uploads to shared Drive folder).",
            "Day 11–14: Funnel Deployment & Launch Testing (You assemble Whop campus, test checkouts, and launch)."
        ],
        "A rigid, visual 14-day calendar provides the psychological momentum creators need to complete deliverables."
    ),
    make_slide(
        "s-054-3", 3, "MODULE 05 · LESSON 5.4",
        "The 'Live Cohort' Filming Hack",
        "How to eliminate pre-recording entirely by selling the program before filming a single module.",
        [
            "What is the Live Cohort Hack? Launch the program as a 'Live 4-Week Masterclass' where the creator teaches 1 live session every week on Zoom.",
            "Instant Proof & Zero Waste: You sell 100 spots first ($50,000 collected) before recording a single video.",
            "Extreme Accountability: When 100 paying students show up to Zoom on Tuesday night, the creator is guaranteed to perform with 100% focus.",
            "The Permanent Asset Dividend: The 4 recorded Zoom sessions are automatically edited and uploaded to Whop as the permanent self-paced course."
        ],
        "Selling a live cohort first guarantees 100% creator accountability and eliminates upfront filming friction completely."
    ),
    make_slide(
        "s-054-4", 4, "MODULE 05 · LESSON 5.4",
        "The 30-Day Sunset & Release Clause",
        "Protecting your time from chronically unresponsive creator partners.",
        [
            "Recognizing the Chronic Ghost: If a creator fails to respond for 14 consecutive days despite reminders, do not chase them endlessly.",
            "The 30-Day Sunset Clause: If the creator fails to deliver agreed assets within 30 days of signing, the contract automatically terminates.",
            "Retaining Your Funnel Assets: You retain 100% ownership of the landing page, scripts, and funnels to deploy with a different creator.",
            "Abundance Mindset: There are millions of hungry micro-creators; cut ties with slow partners immediately and sign an eager replacement."
        ],
        "Never chase an uninspired creator; enforce a 30-day sunset clause and partner with creators who respect your time."
    )
]

m05_l4_written = """# 5.4 Creator Account Management: Overcoming the 5% Inaction & Delivery Stall

> **Module 05: The AI Shadow Operator Launch & Monetization Engine**  
> *Playbook: These 3 AI Businesses Will Make You $10k+/Month (With Zero Employees)*

---

## Executive Overview & The 5% Inaction Phenomenon

In his masterclass, Iman Gadzhi shared a candid, behind-the-scenes truth about AI Shadow Operating:

> *"I'll be honest with you: the only headache that you might encounter is needing to push the creators to get their side of the work done. Some creators are a little lazy or slow... but this happens maybe in 5% of the cases where you have a creator who is slower than you would like."*

It is vital to understand the psychology behind why this happens:
Creators are artistic, intuitive, and often emotionally driven. They thrive when talking spontaneously to their phone camera, but **the moment you give them a large, undefined corporate task, they freeze**.

If you tell a creator: *"Okay, go film your 16-lesson masterclass and upload it to Google Drive by next Friday"*, you trigger immediate **Perfectionism Paralysis**:
- They worry their microphone isn't professional enough.
- They spend 3 weeks agonizing over background lighting.
- They procrastinate, avoid your messages, and stall the launch.

As an elite AI Shadow Operator, your job is not merely to build software; **your job is to act as an executive producer who makes execution completely effortless and frictionless for the creator**.

---

## 1. The Spoon-Feeding Protocol: Eliminating Creative Friction

Never give a creator a multi-day homework assignment. Break every deliverable down into **bite-sized, 15-minute daily micro-tasks**:

```
BAD OPERATOR DIRECTIVE:
"Film all 4 modules this weekend."  -->  (Triggers overwhelm and ghosting)

ELITE SHADOW OPERATOR DIRECTIVE:
"Hey Mark! Here is your 1-page script card for Lesson 1.1 (The 3 Foundation Drills). 
Just prop your phone against a coffee cup and record a casual 5-minute video answering 
these 3 bullet points. Send the raw MP4 to our WhatsApp when done!" 
--> (Completed in 15 minutes!)
```

### The Rules of Frictionless Creator Direction:
1. **Smartphone-First:** Explicitly forbid them from buying expensive cameras or lighting gear. Emphasize that raw, authentic iPhone footage converts significantly better on social media than sterile corporate studio recordings.
2. **One Lesson at a Time:** Deliver lesson outlines via WhatsApp or Telegram one at a time. Celebrate the completion of Lesson 1.1 before sending Lesson 1.2.
3. **No Retakes for Minor Flubs:** Teach the creator that small stumbles, pauses, and natural speech mannerisms make them relatable and authentic.

---

## 2. The Secret Weapon: The "Live Cohort" Filming Hack

If you partner with a creator who is extremely intimidated by the idea of filming pre-recorded courses alone in an empty room, deploy the **Live Cohort Filming Hack**:

```
Phase 1: Pre-Sell the "Live 4-Week Masterclass" to 100 students @ $499 ($50,000 gross).
Phase 2: Creator hosts ONE 60-minute interactive live workshop on Zoom every Tuesday for 4 weeks.
Phase 3: The 4 recorded Zoom sessions are uploaded into Whop as the permanent self-paced course!
```

### Why This Hack is Unstoppable:
1. **Immediate Upfront Cash:** You and the creator collect the full $50,000 launch revenue **before a single video is recorded**.
2. **Extreme Social Accountability:** When 100 paying human beings are waiting inside a Zoom room on Tuesday at 7:00 PM, the creator will not procrastinate—they will show up, deliver with high energy, and shine.
3. **Interactive Q&A Value:** Student questions during the live calls reveal the exact sticking points of beginners, making the recorded sessions 10x more valuable for future evergreen buyers.

---

## 3. The 30-Day Contractual Sunset Clause

While 95% of creators execute enthusiastically when money is on the line, you must protect your business against the 5% who chronically stall.

Incorporate this **Sunset & Release Clause** into your partnership contract:

```
30-DAY OPERATIONAL SUNSET CLAUSE:
If Creator fails to deliver the required core educational recordings within thirty (30) calendar days 
of formal contract execution, Operator reserves the unilateral right to terminate the partnership 
without penalty. Upon termination under this clause, Operator retains full intellectual property 
and commercial ownership of all marketing copy, funnels, and curricula created, and may repurpose 
such assets with alternative creators in the same vertical.
```

When a creator signs an agreement with a hard 30-day deadline, they recognize that your time is valuable and that you will not wait around forever. If a creator fails to communicate for 14 consecutive days, invoke the sunset clause politely, archive the project, and move on to the next eager creator.

---

## 4. Production Creator Onboarding Checklist (Airtable)

```json
{
  "creator_launch_milestones": [
    { "day": 1, "task": "Execute 70/30 Partnership Agreement & Set Up Stripe Connect", "owner": "Both" },
    { "day": 2, "task": "Conduct 45-Minute Knowledge Extraction Call via Zoom", "owner": "Operator" },
    { "day": 3, "task": "Generate 4-Module Curriculum & 12 Lesson Cards via Claude", "owner": "Operator" },
    { "day": 5, "task": "Review and Sign Off on Lesson Cards", "owner": "Creator" },
    { "day": 7, "task": "Film Module 1 & 2 (6 x 6m videos on smartphone)", "owner": "Creator" },
    { "day": 9, "task": "Build Whop Campus & Upload Module 1 & 2 Videos", "owner": "Operator" },
    { "day": 11, "task": "Film Module 3 & 4 (6 x 6m videos on smartphone)", "owner": "Creator" },
    { "day": 12, "task": "Deploy Sales Landing Page & Connect Stripe Payment Processor", "owner": "Operator" },
    { "day": 13, "task": "Configure ManyChat DM Keyword Triggers & Test Checkouts", "owner": "Operator" },
    { "day": 14, "task": "LAUNCH DAY: Publish First Announcement Story & Reel", "owner": "Both" }
  ]
}
```

---

## 5. Diagnostic Failure Analysis

| Warning Sign | Root Psychological Cause | Immediate Intervention |
|---|---|---|
| **Creator stops replying to DMs for 3 days** | Overwhelmed by curriculum scope | Send voice note: *"Hey Mark, don't worry about the whole course! Just record 3 minutes on your favorite warm-up drill and text it to me."* |
| **Creator complains about camera quality** | Perfectionism defense mechanism | Send them 3 viral TikToks filmed on an iPhone with 2M+ views to prove that raw phone video converts best. |
| **Creator hesitant about pricing at $399** | Fear of audience backlash | Show them that charging $399 filters out bad actors and attracts dedicated, serious students who get real results. |

---

## 6. Practical Implementation Exercise

1. **Draft a Frictionless WhatsApp Message Template:** Write an encouraging, low-pressure message instructing a creator to record their first 5-minute video.
2. **Review the 14-Day Milestone Checklist:** Ensure you have template assets ready for every step of the 2-week launch sequence.
3. **Internalize the Abundance Mindset:** Remember that there are hundreds of thousands of micro-creators waiting for a professional operator; never waste months babysitting an unresponsive partner.

---

## 7. Key Actionable Takeaways

1. **Spoon-feed tasks one at a time:** Break course creation into 15-minute daily video recordings to prevent overwhelm.
2. **Use the Live Cohort Hack:** Pre-sell $50k in tickets and record the masterclass live on Zoom over 4 weeks.
3. **iPhone footage converts best:** Never let creators stall by shopping for expensive camera equipment.
4. **Enforce the 30-day sunset clause:** Protect your time and focus exclusively on motivated, cooperative partners.
"""

MODULE_05 = [
    {
        "id": "05-1", "number": "5.1", "title": "AI-Powered Launch Strategy & Automated Sales Asset Generation",
        "duration": "15m",
        "summary": "Generate complete product launch funnels—including high-converting VSL scripts, landing page copy, and email announcement sequences—using specialized AI frameworks.",
        "learningObjective": "Deploy specialized AI copywriting prompts to generate a high-converting Video Sales Letter (VSL), a compelling landing page, and a 5-part launch email sequence in under 3 hours.",
        "takeaway": "You do not need to be an expert copywriter; modern LLMs anchored to proven direct-response frameworks produce world-class sales copy in minutes.",
        "slides": m05_l1_slides, "writtenLesson": m05_l1_written
    },
    {
        "id": "05-2", "number": "5.2", "title": "The 1-Week Launch Gauntlet: From Teaser Campaign to 100 Paying Customers",
        "duration": "15m",
        "summary": "Execute a structured 7-day launch to a 50k audience to achieve 100 sales at $500 ($50,000 gross / $15,000 operator profit) even if 99.8% ignore it.",
        "learningObjective": "Orchestrate an end-to-end 7-day product launch campaign with a micro-creator, executing the teaser phase, doors-open sequence, and final closing push.",
        "takeaway": "A successful launch is not an emotional gamble; it is an engineered 7-day event with precise daily posting directives and automated DM funnels.",
        "slides": m05_l2_slides, "writtenLesson": m05_l2_written
    },
    {
        "id": "05-3", "number": "5.3", "title": "Post-Launch Evergreen Systems: Compounding 50 Recurring Sales/Month",
        "duration": "15m",
        "summary": "Automate evergreen DM qualification, automated story triggers, and onboarding loops that generate steady $7,500/month recurring operator revenue.",
        "learningObjective": "Transform a 1-time product launch into a perpetual evergreen sales machine generating 50 consistent sales every month with minimal labor.",
        "takeaway": "The launch is just the kickoff; the real wealth of Shadow Operating comes from turning the product into a quiet evergreen cash machine generating $7,500/mo indefinitely.",
        "slides": m05_l3_slides, "writtenLesson": m05_l3_written
    },
    {
        "id": "05-4", "number": "5.4", "title": "Creator Account Management: Overcoming the 5% Inaction & Delivery Stall",
        "duration": "14m",
        "summary": "Prevent creator procrastination and launch delays using structured milestone tracking, collaborative sprint calendars, and contract safeguards.",
        "learningObjective": "Manage the human psychology of creators, identify early warning signs of delivery stall, and implement milestone sprint systems that keep launches on schedule.",
        "takeaway": "The only point of failure in Shadow Operating is the 5% of creators who stall on filming; solve this by spoon-feeding them short, structured 15-minute recording tasks.",
        "slides": m05_l4_slides, "writtenLesson": m05_l4_written
    }
]
