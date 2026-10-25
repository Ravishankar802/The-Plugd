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

m06_l1_slides = [
    make_slide(
        "s-061-1", 1, "MODULE 06 · LESSON 6.1",
        "The Death of Generic Cold Email Spam",
        "Why blasting thousands of automated AI email templates produces zero high-ticket B2B deals.",
        [
            "The Spam Apocalypse: Business owners receive 20 identical automated cold emails daily; open rates and domain reputations are crashing.",
            "The Volume Trap: Beginners think sending 1,000 spam emails will generate clients; it only generates spam complaints and blacklists.",
            "The Value-First Paradigm: One hyper-personalized, undeniable value asset sent to 10 qualified prospects outperforms 1,000 generic emails.",
            "The Trojan Horse Concept: Delivering an actionable 3-minute video diagnosis of a visible problem before ever asking for a meeting."
        ],
        "Stop spamming hundreds of unqualified inboxes; send hyper-targeted, value-first diagnostic videos to 10 dream clients."
    ),
    make_slide(
        "s-061-2", 2, "MODULE 06 · LESSON 6.1",
        "The 3-Minute Loom Audit Methodology",
        "How to record a personalized video teardown that proves immediate commercial ROI.",
        [
            "Minute 1: The Public Observation — Show their website form, booking link, or social profile; highlight the exact point of customer friction.",
            "Minute 2: The Simulated Breakdown — Submit a test inquiry live on screen; demonstrate how slow or broken the current follow-up experience is.",
            "Minute 3: The Automated Solution — Switch screens to your Make.com or Airtable sandbox; show the 30-second automated fix in action.",
            "The Frictionless Call to Action: 'No pitch or obligation. If you want the workflow diagram for your team, reply and I'll send it over.'"
        ],
        "A 3-minute personalized Loom teardown proves your competence and eliminates sales resistance instantly."
    ),
    make_slide(
        "s-061-3", 3, "MODULE 06 · LESSON 6.1",
        "Target Account Identification & Prospecting",
        "Finding local and mid-market companies with high deal values and acute operational waste.",
        [
            "High Deal-Value Niches: Commercial HVAC, luxury kitchen remodelers, personal injury attorneys, cosmetic dentists, boutique agencies.",
            "The Speed-to-Lead Test: Submit an inquiry on their website at 6:30 PM; if you don't receive an automated SMS within 5 minutes, they are a prime target.",
            "Decision Maker Identification: Use LinkedIn Sales Navigator or Apollo to find the Managing Partner, Founder, or VP of Sales.",
            "Daily Prospecting Cadence: Record 3 personalized Loom audits every morning before 10:00 AM; 15 per week yields 2 to 3 booked calls."
        ],
        "Target businesses where a single recovered customer is worth $3,000 to $10,000 to maximize your perceived service ROI."
    ),
    make_slide(
        "s-061-4", 4, "MODULE 06 · LESSON 6.1",
        "Outreach Email Copy & Video Thumbnail Strategy",
        "Crafting the short introductory email that guarantees a 70%+ video play rate.",
        [
            "The Animated GIF Thumbnail: Insert an animated GIF showing yourself waving with their website displayed in the background.",
            "Subject Line Framework: 'Quick video teardown for [Founder Name] (found a leak in your inquiry form)'.",
            "Under-50-Word Email Body: Short, polite, and direct; zero agency bragging, zero corporate bios, purely focused on the video link.",
            "Follow-Up Cadence: Send 1 polite follow-up 48 hours later: 'Hey [Name], made this 3-min video for you Tuesday—did you get a chance to watch?'"
        ],
        "A short email with an animated Loom GIF achieves an industry-leading 70%+ video view rate."
    )
]

m06_l1_written = """# 6.1 Value-First B2B Outreach: The 3-Minute Loom Audit for AAA & Content

> **Module 06: Client Acquisition & Deal Structuring Without Ad Spend**  
> *Playbook: These 3 AI Businesses Will Make You $10k+/Month (With Zero Employees)*

---

## Executive Overview & The Fall of Commodity Outreach

If you search YouTube for "how to get agency clients," you will find thousands of videos teaching mass cold email: buy 20 secondary domains, scrape 10,000 emails from Apollo, run them through an AI re-writer, and blast 1,000 cold emails every day.

**This spray-and-pray method is completely dead in 2026.**
- Google and Microsoft have deployed aggressive AI spam filters that immediately blacklist new cold domains.
- Business owners delete generic cold emails in 0.5 seconds without opening them.
- Even if you manage to book a meeting through mass spam, you enter the call as a low-status, desperate commodity freelancer competing on price.

To command premium **$2,500 setup fees and $1,500/month recurring retainers** as a solo AI Automation or Content Studio operator, you must flip your outbound strategy to **Value-First Diagnostic Prospecting**.

Instead of spamming 1,000 strangers, you identify **15 high-value prospective businesses each week**, audit their public operational bottlenecks, and send the founder a **personalized 3-minute Loom video audit**.

---

## 1. The 3-Minute Loom Audit Architecture

A great diagnostic video is not a sales pitch; it is an **engineering consultation**. You do not talk about yourself, your agency, or your credentials. You focus 100% of the video on **their company, their customer journey, and the exact dollar leak in their operations**:

```
[0:00 - 0:45] Minute 1: The Observation
Open their website on screen with your camera bubble in the corner.
"Hey Mark, was checking out your roofing business in Austin because I love your project portfolio. 
Noticed you have a 'Get a Quote' form here, but I tested it earlier and noticed a friction point..."

[0:45 - 2:00] Minute 2: The Proof of Friction
Show the user experience. 
"When a prospect submits this form at 7:00 PM, nothing happens. No instant SMS, no confirmation text. 
In high-end roofing, homeowners reach out to 3 contractors at once. Harvard Business Review shows 
if you don't respond in 5 minutes, qualification drops by 80%."

[2:00 - 2:45] Minute 3: The Automated Sandbox Demonstration
Switch screens to your Make.com / Airtable demo sandbox.
"I put together a quick 3-node automation diagram for you guys. When this form is submitted, 
it triggers an instant SMS within 30 seconds, checks your estimator's Google Calendar, 
and books the inspection directly into your CRM."

[2:45 - 3:00] The Zero-Pressure Call to Action
"I'm not trying to sell you anything today. If you'd like me to send over the workflow diagram 
so your team can install it internally, just reply to this email and I'll send the link over. 
Hope this adds some value!"
```

---

## 2. Why This Generates a 40%+ Response Rate

Notice the psychological brilliance of this approach:
1. **Undeniable Proof of Work:** You didn't send a generic template; you took 5 minutes to study their specific business, demonstrating elite professionalism.
2. **High Status Positioning:** By offering the workflow diagram for free without begging for a phone call, you position yourself as an abundant, in-demand technical consultant rather than a hungry salesperson.
3. **Curiosity & Reciprocity:** 8 out of 10 business owners who watch this video will reply: *"Hey, thanks so much for pointing this out. Actually, we don't have anyone in-house who knows how to set this up. Could you hop on a quick 10-minute call to tell us what it would cost for you to build this for us?"*

**They are now asking YOU to pitch them.**

---

## 3. High-Ticket Niche Selection Matrix

| Target Commercial Niche | Average Customer Lifetime Value | Typical Operational Bottleneck | Pitch Angle |
|---|---|---|---|
| **Commercial HVAC & Roofing** | $5,000 – $25,000 | Inbound form delay, missed emergency calls | Instant 30s SMS response & estimator booking |
| **Personal Injury Law Firms** | $8,000 – $50,000 | After-hours intake delay, lost case inquiries | 24/7 AI intake bot & conflict-of-interest check |
| **High-End Dental & Med-Spas** | $2,500 – $12,000 | Unanswered phone calls during clinic hours | Missed-Call AI Text-Back & Cal.com booking |
| **Boutique B2B Consulting Agencies** | $10,000 – $60,000 | Manual proposal creation, disconnected CRMs | HubSpot to PandaDoc automated contract sync |

---

## 4. Production Email Outreach Template (Under 50 Words)

\`\`\`
Subject: Quick 3-min video teardown for {{firstName}} (Austin Roofing)

Hey {{firstName}},

Recorded a quick 3-minute Loom video for you showing a friction point on your quote form that might be causing you to lose after-hours leads to competitors:

[INSERT ANIMATED LOOM GIF LINK HERE]

No pitch or obligation. If you'd like the workflow diagram to fix it, just reply and I'll send it over.

Best,
[Your Name]
AI Systems Architect | Plugd Operations
\`\`\`

---

## 5. Diagnostic Failure Analysis

| Outreach Error | Root Cause | Tactical Remedy |
|---|---|---|
| **Loom Video Exceeds 4 Minutes** | Rambling about personal background or agency history | Cut all introductory fluff; start speaking immediately on their website within 2 seconds. |
| **Low Video View Rate (<30%)** | Plain text link looks like a suspicious phishing link | Always embed the animated Loom GIF preview showing their website and your face. |
| **Aggressive Pitch in Video** | Asking for a "quick 30-minute demo call" too early | Offer the solution/diagram for free; let them request the call. |

---

## 6. Practical Implementation Exercise

1. **Find 5 Local High-Ticket Contractors:** Search Google Maps for commercial contractors with 20+ reviews in a major metro area.
2. **Submit a Test Inquiry:** Note how long it takes them to contact you (if at all).
3. **Record a 3-Minute Loom Audit:** Follow the 4-part script above, showing their form and your Make.com sandbox. Send it to the founder via LinkedIn or email.

---

## 7. Key Actionable Takeaways

1. **Value-first audits beat generic spam 10-to-1:** Send 15 personalized Looms a week instead of 1,000 spam emails.
2. **Target high deal-value niches:** A single recovered $10,000 deal makes your $2,500 fee an effortless decision.
3. **Keep the video strictly under 3 minutes:** Observation, proof of friction, automated solution, zero-pressure CTA.
4. **Let the client ask for the call:** Providing undeniable value triggers reciprocity, turning cold prospects into eager buyers.
"""

m06_l2_slides = [
    make_slide(
        "s-062-1", 1, "MODULE 06 · LESSON 6.2",
        "The Creator DM Infiltration Philosophy",
        "How to initiate authentic, high-status conversations with 10k–50k creators on Instagram and X.",
        [
            "Why Creators Ignore Business DMs: They receive dozens of generic 'Let me edit your reels' and 'Let me grow your brand' copy-pasted pitches daily.",
            "The Peer-to-Peer Positioning: Approach creators not as an agency vendor begging for a gig, but as a strategic operator presenting a lucrative commercial opportunity.",
            "The Public Interaction Warm-Up: Spend 3 days leaving thoughtful, analytical comments on their recent posts before sliding into their DMs.",
            "The 1-Sentence Curiosity Opener: A message so relevant and specific to their content that it is virtually impossible to ignore."
        ],
        "Warm up the creator in public comments before initiating private direct message conversations."
    ),
    make_slide(
        "s-062-2", 2, "MODULE 06 · LESSON 6.2",
        "The 3-Step Creator DM Conversation Arc",
        "Guiding the dialogue from a casual question to a confirmed 15-minute diagnostic partnership call.",
        [
            "Step 1: The Context Compliment & Observation — 'Hey [Name], loved your breakdown on kettlebell hip hinge mechanics. Saw your audience begging for a 30-day program in the comments.'",
            "Step 2: The Monetization Gap Question — 'Have you ever considered packaging that into a guided cohort, or are you just keeping it 100% free for now?'",
            "Step 3: The Aligned Partnership Proposal — 'I run the backend infrastructure for creators in the fitness space. Put together a 2-page outline for you—mind if I send a 2-min Loom walking through it?'",
            "The 90%+ Opt-In Rate: Because you asked permission before sending the link, creators almost always reply: 'Sure, send it over!'"
        ],
        "Never paste links or sales pitches in your first DM; earn permission to send the personalized video breakdown."
    ),
    make_slide(
        "s-062-3", 3, "MODULE 06 · LESSON 6.2",
        "The 2-Minute Creator Teardown Loom",
        "Showing the creator exactly how much money they are leaving on the table with simple math.",
        [
            "Show Their Comment Section: Screen-record comments where followers ask: 'Where can I buy your full routine?'",
            "The Non-Guaranteed Mathematics: Walk through the 0.2% audience conversion math (50k followers -> 100 buyers @ $399 = $39,900 gross).",
            "The 70/30 Risk-Free Offer: 'I'll build the entire Whop campus, copy, and DM funnels for free. You keep 70% of every sale.'",
            "The Low-Pressure Close: 'If you like the idea, let's hop on a 15-minute call this Thursday. If not, no worries at all!'"
        ],
        "Demonstrating untrapped audience demand in their own comment section creates undeniable commercial desire."
    ),
    make_slide(
        "s-062-4", 4, "MODULE 06 · LESSON 6.2",
        "Outreach Tracking & Cadence for Solopreneurs",
        "The daily numbers required to sign your first creator partner within 21 days.",
        [
            "The Weekly Funnel Target: Identify 20 qualified micro-creators per week (4 per day, Monday through Friday).",
            "Warm-Up Phase: Comment on 4 creators' posts daily; send 4 personalized DM openers.",
            "Conversion Metrics: 20 DMs sent -> 12 conversations started -> 6 Loom audits sent -> 2 diagnostic calls booked.",
            "Signing Ratio: Booking 4 to 6 discovery calls reliably closes 1 to 2 high-affinity 70/30 creator partnerships."
        ],
        "Consistency over intensity: contacting 4 targeted creators daily guarantees signing a partner within 3 weeks."
    )
]

m06_l2_written = """# 6.2 The Creator DM Infiltration Script: Signing Micro-Creators As Partners

> **Module 06: Client Acquisition & Deal Structuring Without Ad Spend**  
> *Playbook: These 3 AI Businesses Will Make You $10k+/Month (With Zero Employees)*

---

## Executive Overview & The Psychology of the Creator DM

Micro-creators with 10k to 50k followers live in their direct messages. Unlike corporate CEOs who communicate via email, **creators conduct their entire digital lives inside Instagram DMs and X messages**.

However, because their follower counts are visible, they are bombarded daily by amateur agency spammers:
- *"Hey bro, want me to edit your reels for cheap?"*
- *"I can help you scale your personal brand to $50k/mo, let's hop on a call."*
- *"Check out our agency website for growth hacking."*

Creators instantly delete and block these messages. They view agency owners as parasitic vendors trying to extract cash from their hard-earned creative audience.

To sign micro-creators as a **Shadow Operator**, you must position yourself as an **elite, respectful peer and strategic business partner**.

---

## 1. The 3-Day Public Warm-Up Protocol

Never send a cold DM to a creator without warming up their notifications first:

\`\`\`
[Day 1]: Follow their account + Like their 3 best recent educational posts.
[Day 2]: Leave a thoughtful, analytical comment (2-3 sentences) adding genuine value to their topic.
[Day 3]: Creator likes or replies to your comment (Your profile is now recognized).
[Day 3 Evening]: Send the 1-Sentence Conversational DM Opener.
\`\`\`

When your DM arrives, the creator recognizes your handle: *"Oh, that's the person who left that smart comment on my reel yesterday."* Your message is opened immediately.

---

## 2. The 3-Step DM Conversation Framework

Follow this exact dialogue arc to transition from friendly banter to a booked discovery call:

\`\`\`
STEP 1: The Context Compliment & Observation
"Hey [Name], loved your breakdown on hip mobility for runners yesterday—super clear cues. 
Noticed in your comments that at least 5 people were asking if you have a full 30-day routine."

STEP 2: The Monetization Gap Question (Wait for reply)
"Have you ever thought about packaging your exact daily routine into a guided Whop masterclass, 
or are you just keeping everything 100% free for now?"
\`\`\`

### The Creator's Inevitable Reply:
9 out of 10 creators will reply:  
*"Haha man, I've wanted to do that for months! Honestly I just don't have the time to figure out all the course websites, checkouts, and tech stuff. So I just haven't done it."*

Now, the door is wide open. You deliver **Step 3**:

\`\`\`
STEP 3: The Aligned Partnership Proposal
"Totally get that—building funnels and setting up payment systems is a massive headache when you just want to create content. 
I run the backend monetization and AI infrastructure for a few creators in the health space. 

I actually put together a quick 2-minute video showing how we could package your exact routine into a 4-module Whop campus 
and launch it to your audience on a 70/30 revenue share (you keep 70%, zero upfront cost). 

Mind if I drop the Loom link here?"
\`\`\`

Notice the phrase: **"Mind if I drop the Loom link here?"**
Never paste links uninvited. When you ask permission, 95% of creators will reply: *"Yeah, definitely send it over!"*

---

## 3. The 2-Minute Creator Teardown Loom Structure

Record a 2-minute video on Loom with their Instagram profile on screen:

\`\`\`
[0:00 - 0:30] The Evidence
Show their top 3 reels and highlight followers asking questions. 
"Look at these comments on your Tuesday reel: 'Where can I buy your full routine?', 'Do you offer coaching?' 
Your audience is actively begging you to take their money."

[0:30 - 1:15] The Realistic Unit Economics
Show a clean Google Sheet with conservative numbers.
"You have 35,000 followers and get 2,000 story views. Even if 99.7% of your audience ignores this, 
converting just 80 people on a $399 guided protocol generates $31,900 gross revenue. 
At a 70/30 split, that puts over $22,000 directly into your bank account next month."

[1:15 - 1:45] The Division of Labor
"Here is how it works: I do 100% of the heavy lifting. I build the Whop campus, write the sales page, 
and set up the automated DM checkout triggers. All you do is film 12 short videos on your phone 
and post 3 announcement stories during launch week."

[1:45 - 2:00] The Low-Pressure Next Step
"If you like the sound of this, let's hop on a 15-minute call this Thursday to see if our personalities mesh. 
If not, you can take the outline and run it yourself. Let me know what you think!"
\`\`\`

---

## 4. Solopreneur Daily Outreach Cadence (4 DMs / Day)

To build a thriving Shadow Operating business without burning out, follow this **4-a-Day Routine**:

| Time Window | Daily Operational Action | Weekly Cumulative Volume |
|---|---|---|
| **9:00 AM – 9:30 AM** | Research & qualify 4 new micro-creators (10k–50k followers). | 20 New Creators Audited |
| **9:30 AM – 9:45 AM** | Leave thoughtful comments on their latest posts. | 20 Public Touchpoints |
| **2:00 PM – 2:30 PM** | Send 4 customized Step 1 & 2 DMs to warmed accounts. | 20 Direct Conversations |
| **4:00 PM – 4:30 PM** | Record 2 personalized Looms for creators who opted in. | 8–10 Custom Video Audits |
| **Weekly Outcome** | **2 to 3 booked diagnostic partnership calls every single week!** | **1–2 Signed Partners / Month** |

---

## 5. Diagnostic Failure Analysis

| Outreach Mistake | Why It Destroys the Deal | Tactical Fix |
|---|---|---|
| **Sending the Loom link in the first message** | Triggers Instagram spam filters and looks like malware | Always wait for the creator to reply and give permission before sending any URL. |
| **Pitching creators who already have courses** | They already have an operator or know how to build funnels | Only target creators whose link-in-bio is blank, an Amazon affiliate store, or a Linktree with free links. |
| **Talking down to the creator** | Sounding arrogant or lecturing them on business | Treat them as an equal expert in their domain; you are simply providing the operational bridge. |

---

## 6. Practical Implementation Exercise

1. **Find 4 Micro-Creators Today:** Search hashtags in your niche on Instagram (#mobilitywod, #kettlebellcoach, #sourdoughbaking).
2. **Execute the Public Warm-Up:** Like 3 posts and leave a 2-sentence value comment on their latest reel.
3. **Send the Step 1 DM Tomorrow:** Use the exact conversational script to initiate dialogue.

---

## 7. Key Actionable Takeaways

1. **Warm up creators publicly first:** A thoughtful comment ensures your DM gets opened.
2. **Never pitch in the first DM:** Ask diagnostic questions about their monetization goals.
3. **Always ask permission to send the Loom:** "Mind if I send over a 2-min breakdown?" achieves a 95% opt-in rate.
4. **4 DMs a day is all you need:** Consistent daily outreach yields 1 to 2 signed partnerships every month.
"""

m06_l3_slides = [
    make_slide(
        "s-063-1", 1, "MODULE 06 · LESSON 6.3",
        "The Diagnostic Discovery Call Framework",
        "Conducting natural, consultative discovery calls that close high-ticket deals without high-pressure sales tactics.",
        [
            "The Posture Shift: You are not an aggressive pitchman; you are a doctor diagnosing an operational bottleneck.",
            "The 80/20 Listening Rule: The client or creator should speak 80% of the time, revealing their exact goals, fears, and frustrations.",
            "Uncovering Pain Points: Asking targeted questions that lead them to admit that their current manual setup is unsustainable.",
            "The Natural Close: Presenting your productized package or 70/30 partnership as the obvious, logical solution."
        ],
        "A great sales call feels like an insightful consultation where the prospect sells themselves on working with you."
    ),
    make_slide(
        "s-063-2", 2, "MODULE 06 · LESSON 6.3",
        "Handling Objections with Complete Calm",
        "Neutralizing the 3 most common client and creator hesitations effortlessly.",
        [
            "Objection 1: 'What if my audience doesn't buy?' — 'That's exactly why we do a 70/30 split. If nobody buys, you owe me zero dollars. I take all the risk.'",
            "Objection 2: 'I don't have time to film 10 hours of video.' — 'We don't film 10 hours. You film twelve 6-minute videos on your phone. You can finish it this Sunday afternoon.'",
            "Objection 3: 'I don't want to look greedy to my followers.' — 'Selling a solution to people who are begging for your help is an act of service, not greed.'",
            "The Pressure-Free Close: Never push for an instant decision; give them 24 hours to review the simple agreement."
        ],
        "Calm, empathetic objection handling reinforces your status as a professional partner."
    ),
    make_slide(
        "s-063-3", 3, "MODULE 06 · LESSON 6.3",
        "Airtight Legal Partnership Contracts",
        "The essential contractual clauses that protect your revenue share and prevent partner disputes.",
        [
            "Term Duration & Exclusivity: 12-month exclusive monetization agreement on the specific digital product offer.",
            "Automated Merchant Settlement: Explicitly specifying that all revenue is split automatically at source via Stripe Connect / Whop.",
            "Intellectual Property Isolation: You retain 100% ownership of the landing page code, marketing copy, and automation funnels.",
            "Sunset & Termination Terms: Defining clear operational milestones and a 6-month trailing rev-share if terminated amicably."
        ],
        "A simple, transparent 2-page contract builds mutual confidence and prevents future commercial misunderstandings."
    ),
    make_slide(
        "s-063-4", 4, "MODULE 06 · LESSON 6.3",
        "Closing & Onboarding in Under 24 Hours",
        "Executing the digital signature and setting up infrastructure before momentum fades.",
        [
            "DocuSign / PandaDoc Automation: Send the pre-filled agreement link within 30 minutes of ending the discovery call.",
            "Stripe Connect Handshake: Guide the creator through the 3-minute Stripe Connect onboarding link to link their bank.",
            "Private Communication Scaffolding: Create a dedicated Slack channel or Telegram group: 'Apex Launch Command'.",
            "Immediate Action Kickoff: Schedule the 45-minute knowledge extraction interview for the following day."
        ],
        "Strike while momentum is high: execute contracts and initiate onboarding within 24 hours of the call."
    )
]

m06_l3_written = """# 6.3 The Diagnostic Partnership Call & Bulletproof Legal Contracts

> **Module 06: Client Acquisition & Deal Structuring Without Ad Spend**  
> *Playbook: These 3 AI Businesses Will Make You $10k+/Month (With Zero Employees)*

---

## Executive Overview & Consultative Closing

When amateur freelancers get a prospective client or creator on a Zoom call, they become nervous, talk too fast, open a 40-slide presentation, and aggressively pitch features for 30 minutes.

This high-pressure approach triggers immediate defense mechanisms.

**Elite operators conduct Diagnostic Discovery Calls.**
- You enter the call with the calm, objective authority of a specialized surgeon.
- You do not pitch; you **diagnose**.
- You ask calibrated questions that guide the client to articulate their own problems, calculate their own losses, and conclude that working with you is the only rational decision.

By the end of the 20-minute call, closing is not a confrontation; it is a **natural administrative handshake**.

---

## 1. The 4-Part Discovery Call Framework

\`\`\`
[Minutes 0–3]:   The Frame & Agenda Setting (You establish consultative control)
[Minutes 3–12]:  The Diagnostic Inquiry (Client speaks 80% of the time)
[Minutes 12–17]: The Solution Architecture (You reveal the tailored roadmap)
[Minutes 17–20]: The Logistics & Handshake (Agreement terms & onboarding)
\`\`\`

### Phase 1: Setting the Frame (Minutes 0–3)
*"Hey Mark, great to connect. The goal of today's call is simple: I want to dig into your current setup, understand what you're trying to achieve with your audience over the next 6 months, and share how our monetization infrastructure works. If we both feel there's a strong fit, we can talk about next steps. If not, no hard feelings at all. Sound fair?"*

### Phase 2: Diagnostic Inquiry (Minutes 3–12)
1. *"What is the #1 question or problem your followers constantly ask you about in your DMs?"*
2. *"How have you tried monetizing so far, and why did that feel unsatisfactory?"*
3. *"If you could package your knowledge into a simple digital product that generated an extra $5,000 to $10,000 every month without taking you away from creating content, what would that change for your business?"*

### Phase 3: Presenting the Solution (Minutes 12–17)
Summarize their words back to them:
*"Here is what I am hearing: your audience is desperately seeking your help with [Topic], but you don't have the time to build funnels, courses, and checkouts. Here is exactly what we do: I build the Whop campus, write all the sales copy, and set up the automated DM checkout systems. You record 12 short 6-minute videos on your phone. We launch on a 70/30 split. You keep 70% of every dollar."*

### Phase 4: The Closing Handshake (Minutes 17–20)
*"I can have the simple 2-page partnership agreement and Stripe Connect link over to you by 2:00 PM today. Once signed, we can do our 45-minute extraction interview tomorrow and have this launched in 14 days. How does that sound?"*

---

## 2. Overcoming the Top 3 Hesitations

### Objection 1: "What if my audience gets mad that I'm selling something?"
- **The Reframing:** *"Mark, right now you have thousands of followers asking you for detailed guidance, and you can't help all of them in short Instagram comments. Creating a structured program isn't being greedy—it is the highest form of service for your most dedicated followers. And for the 98% who don't buy, you will continue providing your free content as usual."*

### Objection 2: "What if it doesn't sell?"
- **The Reframing:** *"That is exactly why we operate on a 70/30 partnership. If it doesn't sell, you have lost zero dollars. I take 100% of the financial and technical risk. But based on your 2,000 story views, even a tiny 0.2% conversion generates over $20,000 for you on our first launch."*

---

## 3. The 4 Essential Contractual Clauses

To protect your business, never rely on a verbal handshake. Send a clean, 2-page contract containing these 4 mandatory clauses:

\`\`\`
1. TERM & EXCLUSIVITY:
This Agreement establishes a twelve (12) month exclusive partnership commencing on [Date]. 
Creator agrees that Operator shall be the sole and exclusive provider of digital product infrastructure 
and launch management for the [Product Name] offer.

2. REVENUE DISTRIBUTION & AUTOMATED SPLIT:
All gross revenues generated from the sale of [Product Name] shall be processed through Stripe Connect / Whop 
and automatically distributed at source: seventy percent (70%) to Creator, thirty percent (30%) to Operator, 
after third-party merchant processing fees.

3. INTELLECTUAL PROPERTY:
Creator retains all rights to their personal name, likeness, and video recordings. 
Operator retains 100% exclusive intellectual property ownership of all sales copy, funnels, 
landing pages, automated workflows, and marketing curricula developed.

4. 30-DAY OPERATIONAL SUNSET:
If Creator fails to deliver required video recordings within thirty (30) days of execution, 
Operator may terminate this Agreement with immediate effect and retain all developed funnel assets.
\`\`\`

---

## 4. Production Contract Configuration (PandaDoc / DocuSign)

\`\`\`json
{
  "document_template": "shadow_operator_partnership_v2",
  "signers": [
    { "role": "operator", "name": "Solo Operator", "email": "operator@agency.com" },
    { "role": "creator", "name": "Partner Creator", "email": "creator@email.com" }
  ],
  "auto_trigger_post_signature": {
    "webhook_endpoint": "https://api.make.com/v1/whop_onboarding",
    "actions": [
      "create_airtable_partner_record",
      "provision_whop_draft_campus",
      "dispatch_stripe_connect_onboarding_link_via_email"
    ]
  }
}
\`\`\`

---

## 5. Diagnostic Failure Analysis

| Closing Trap | Underlying Cause | Tactical Correction |
|---|---|---|
| **Negotiating Down on Split (Creator wants 85/15)** | Operator sounds unconfident about their technical value | Hold firm at 70/30: explain that you manage all copywriting, funnels, and tech forever. |
| **Delaying Contract Delivery** | Sending agreement 3 days later when enthusiasm has waned | Send the electronic signature link within 30 minutes of hanging up the Zoom call. |
| **Over-Complicated 20-Page Legal Contracts** | Scares creative artists with corporate jargon | Use a clean, plain-English 2-page agreement focusing on fairness, IP, and automated splits. |

---

## 6. Practical Implementation Exercise

1. **Rehearse the 4-Part Discovery Script:** Practice reciting the opening frame and the 3 diagnostic questions aloud until they feel natural.
2. **Set Up a PandaDoc or DocuSign Template:** Create a reusable 2-page partnership agreement template with merge tags for Creator Name and Offer Title.
3. **Connect Your Stripe Connect Developer Settings:** Verify that your Stripe account can issue Connect onboarding links for instant payout splits.

---

## 7. Key Actionable Takeaways

1. **Diagnose, do not pitch:** Let the client speak 80% of the time and articulate their own pain.
2. **Reframe selling as service:** Remind creators that monetizing their expertise helps their audience succeed.
3. **Enforce the 70/30 split:** Hold firm on your 30% share in exchange for taking 100% of the operational risk.
4. **Send contracts within 30 minutes:** Close deals immediately while momentum and excitement are at their peak.
"""

m06_l4_slides = [
    make_slide(
        "s-064-1", 1, "MODULE 06 · LESSON 6.4",
        "The Power of Client & Partner Retention",
        "Why retaining existing relationships for 12+ months is vastly easier than constantly hunting new clients.",
        [
            "The Agency Churn Trap: Signing 2 new clients every month while losing 2 clients keeps your revenue permanently stagnant.",
            "The Cost of Acquisition vs Retention: Sourcing and signing a new client takes 15 hours of prospecting; retaining an existing client takes 1 hour of monthly care.",
            "The 12-Month Lifetime Value (LTV): A $2,000/month AAA client retained for 12 months is worth $24,000 in pure cash flow.",
            "The Compounding Creator Partner: A creator partner whose audience grows from 30k to 60k followers doubles your monthly evergreen rev-share automatically."
        ],
        "Client retention is the single greatest multiplier of solopreneur profitability and sanity."
    ),
    make_slide(
        "s-064-2", 2, "MODULE 06 · LESSON 6.4",
        "The Monthly Asynchronous ROI Report",
        "The 5-minute video report that makes your retainer feel like the best investment the client makes all month.",
        [
            "The Invisibility Problem: When an automated system works smoothly in the background, clients forget how much painful manual work it is performing.",
            "The 1st-of-the-Month Loom Report: Walk through their live analytics dashboard showing exact metrics.",
            "Metrics to Highlight: Total leads auto-contacted in under 60s, appointments booked, hours of manual labor saved, and gross revenue generated.",
            "The Psychological Impact: When a business owner sees that your system saved their team 60 hours and generated $18k, your $1,500 retainer is re-approved instantly."
        ],
        "Proactively prove your mathematical ROI every 30 days to make your monthly retainer completely un-cancellable."
    ),
    make_slide(
        "s-064-3", 3, "MODULE 06 · LESSON 6.4",
        "The Natural Upsell Ladder for B2B Clients",
        "How to expand a $1,500/month client relationship into a $3,500/month multi-system contract.",
        [
            "Phase 1 (Month 1–3): Speed-to-Lead & Core CRM Triage ($2,500 setup + $1,000/mo retainer).",
            "Phase 2 (Month 4): Upsell Autonomous Invoicing & Payment Chasing (Adds $1,500 setup + $500/mo).",
            "Phase 3 (Month 6): Upsell AI Short-Form Content Repurposing (Adds $1,500/mo studio retainer).",
            "The Account Maximizer: A single satisfied client can easily expand to $3,000–$3,500/month across multiple automated workflows."
        ],
        "Deepen relationships with your best clients by systematically solving their next operational bottleneck."
    ),
    make_slide(
        "s-064-4", 4, "MODULE 06 · LESSON 6.4",
        "Building an Unbreakable 12-Month Moat",
        "Structuring switching costs and deep operational integration that make replacing you unthinkable.",
        [
            "Deep Database Integration: When their customer database, portal, and workflows live inside your standardized architecture, leaving requires rebuilding from scratch.",
            "Quarterly Roadmap Strategy Sessions: Host a 30-minute quarterly review outlining new AI capabilities to deploy over the next 90 days.",
            "The Referral Machine: Introduce an executive referral credit: '$500 off your next invoice for every business founder you introduce who signs.'",
            "The Sustainable Solopreneur Ceiling: 4 to 6 deeply integrated, high-retention clients provide an unbreakable $10,000 to $15,000/month recurring income."
        ],
        "Integrate your systems deeply into client operations to build a durable, high-retention recurring revenue moat."
    )
]

m06_l4_written = """# 6.4 Client Retention & Portfolio Compounding: Building a 12-Month Moat

> **Module 06: Client Acquisition & Deal Structuring Without Ad Spend**  
> *Playbook: These 3 AI Businesses Will Make You $10k+/Month (With Zero Employees)*

---

## Executive Overview & The Compounding Flywheel

Most agency owners and freelancers live on an emotional roller coaster:
- In January, they sign 2 new clients and celebrate reaching $8,000/month.
- In February, 2 existing clients cancel, and they plunge back down to $4,000/month.
- They spend the rest of the year frantically chasing new prospects simply to replace the revenue they lost.

This churn treadmill is the primary cause of entrepreneurial exhaustion.

**In an AI Solopreneur business, client retention is your primary growth engine.**
- Sourcing, pitching, and onboarding a new client requires approximately **15 to 20 hours of focused effort**.
- Maintaining and retaining an existing happy client requires **less than 1.5 hours of monthly operational care**.

If you retain every client for an average of 12 months, **every new client you sign stacks directly on top of your existing cash flow**, creating an unbreakable compounding staircase toward $10,000, $15,000, and $25,000 per month.

---

## 1. The 1st-of-the-Month Asynchronous ROI Teardown

Why do B2B clients cancel software and automation retainers?
Not because the system broke—but because **the system worked so silently and smoothly in the background that the client forgot it existed**.

After 90 days of flawless execution, the business owner looks at your $1,500 monthly invoice and thinks: *"Wait, what am I paying this for again? Everything seems to just run on its own."*

To permanently inoculate your business against this perception, deliver a **5-Minute Asynchronous ROI Loom Report on the 1st of every month**:

\`\`\`
[0:00 - 1:00] Executive Summary
"Hey Mark, happy 1st of the month! Recording your quick monthly operations telemetry report 
for Apex Roofing for the month of October."

[1:00 - 2:30] The Hard Metric Telemetry (Screen-share Airtable / Make)
- "Total Inbound Webhook Leads Ingested: 142 leads."
- "Average Speed-to-Lead SMS Response Time: 34 seconds."
- "Direct Estimates Scheduled Autonomously: 38 booked appointments."
- "Estimated Administrative Hours Saved: 47 human hours."

[2:30 - 4:00] The Financial Translation
"At an average staff rate of $25/hr, that represents $1,175 in direct labor savings. 
More importantly, those 38 scheduled estimates produced $42,000 in closed new roofing contracts. 
Your $1,000 system retainer delivered an estimated 42x commercial ROI this month."

[4:00 - 5:00] Proactive Next Month Roadmap
"Next month, we are deploying an automated customer review request trigger via Twilio 
to boost your Google 5-star ratings. Have an amazing week!"
\`\`\`

When a client receives a video showing that your $1,000 retainer generated $42,000 in closed deals and saved 47 hours of staff time, **cancelling your retainer is unthinkable**.

---

## 2. The 3-Tier Client Upsell Ladder

Never pitch a brand-new client on an expensive, intimidating $10,000 enterprise system on Day 1. Start with an accessible "Trojan Horse" offer and ascend them up your **Value Ladder**:

\`\`\`
[Month 1: The Gateway]    Speed-to-Lead & Missed-Call AI Text-Back ($2,500 setup + $750/mo)
          |
[Month 3: Expansion]      CRM Data Sync & Automated Stripe Invoicing (+$1,500 setup + $500/mo)
          |
[Month 6: Studio Upsell]  Monthly Short-Form Video Repurposing Retainer (+$1,500/mo)
          |
[Total Account Value]     $3,750/Month Recurring Cash Flow from a Single Client!
\`\`\`

By focusing on deep expansion within your best 3 or 4 client accounts, you can reach $12,000+/month without needing an endless conveyor belt of new leads.

---

## 3. The Compounding Creator Partner Flywheel

In **AI Shadow Operating**, retention compounding is even more powerful:
- As the creator's audience grows organically over 12 months (e.g. from 25,000 to 50,000 followers), your monthly evergreen 30% rev-share naturally **doubles from $3,500/mo to $7,000/mo** without requiring a single hour of additional software development!
- You can launch a second complimentary digital product (e.g., an Advanced Level 2 Cohort or a $49/mo membership community) to their existing student base, unlocking a second compounding revenue stream from the same partnership.

---

## 4. Production Monthly Client Telemetry Template (Airtable)

\`\`\`json
{
  "monthly_client_telemetry": {
    "fields": [
      { "name": "Report_Month", "type": "single_line_text", "example": "October 2026" },
      { "name": "Client_Account", "type": "single_select", "options": ["Apex Roofing", "Summit Law", "Boutique Dental"] },
      { "name": "Leads_Processed", "type": "number", "example": 142 },
      { "name": "Avg_Response_Time_Seconds", "type": "number", "example": 34 },
      { "name": "Appointments_Booked", "type": "number", "example": 38 },
      { "name": "Staff_Hours_Saved", "type": "number", "example": 47.5 },
      { "name": "Calculated_Labor_Value_USD", "type": "currency", "example": 1187.50 },
      { "name": "Loom_Walkthrough_URL", "type": "url", "example": "https://www.loom.com/share/..." }
    ]
  }
}
\`\`\`

---

## 5. Diagnostic Failure Analysis

| Retention Threat | Underlying Cause | Tactical Correction |
|---|---|---|
| **Silent Retainer Cancellation** | Client forgot what the automation does | Deliver the 5-minute monthly ROI Loom report on the 1st of every month without exception. |
| **Client Team Overwrites Workflows** | Client staff modifying Airtable field names, breaking webhooks | Restrict edit permissions in Airtable; give staff 'Editor' access only to records, not base schemas. |
| **Creator Audience Fatigue** | Creator pitching the exact same product every week | Shift to value-first educational content; rotate between 3 distinct lead magnets and case studies. |

---

## 6. Practical Implementation Exercise

1. **Create an ROI Reporting Template:** Set up a clean 1-page Google Sheet tracking leads processed, hours saved, and estimated deal value.
2. **Record a Simulated 3-Minute Monthly Report:** Record yourself walking through the sample metrics above using Loom.
3. **Map Your 6-Month Upsell Path:** For your target niche, identify 2 additional automated workflows you can propose to existing clients in Month 3 and Month 6.

---

## 7. Key Actionable Takeaways

1. **Retention is the foundation of $10k+/month:** It takes 15 hours to sign a new client, but only 1 hour to retain an existing one.
2. **Deliver the 1st-of-the-month ROI Loom:** Proactively prove your financial return before the client ever questions your fee.
3. **Ascend clients up the value ladder:** Expand a single $1,000 retainer into a $3,500/month multi-system contract.
4. **Creator rev-shares compound organically:** As their audience doubles, your monthly income doubles automatically.
"""

MODULE_06 = [
    {
        "id": "06-1", "number": "6.1", "title": "Value-First B2B Outreach: The 3-Minute Loom Audit for AAA & Content",
        "duration": "14m",
        "summary": "Land high-ticket agency clients organically by auditing public bottlenecks and sending personalized video teardowns that prove immediate ROI.",
        "learningObjective": "Master the 3-minute Loom diagnostic audit methodology, identify high deal-value target accounts, and achieve 40%+ response rates without spending on ads.",
        "takeaway": "Stop spamming hundreds of unqualified inboxes; send hyper-targeted, value-first diagnostic videos to 10 dream clients.",
        "slides": m06_l1_slides, "writtenLesson": m06_l1_written
    },
    {
        "id": "06-2", "number": "6.2", "title": "The Creator DM Infiltration Script: Signing Micro-Creators As Partners",
        "duration": "14m",
        "summary": "Initiate genuine conversations with 10k–50k creators on Instagram and X using value-focused scripts that trigger responses and build trust.",
        "learningObjective": "Execute the 3-day public warm-up protocol and deploy the 3-step conversational DM framework to sign micro-creators on 70/30 partnerships.",
        "takeaway": "Warm up the creator in public comments before initiating private direct message conversations.",
        "slides": m06_l2_slides, "writtenLesson": m06_l2_written
    },
    {
        "id": "06-3", "number": "6.3", "title": "The Diagnostic Partnership Call & Bulletproof Legal Contracts",
        "duration": "15m",
        "summary": "Conduct diagnostic discovery calls that close without pressure, and protect your revenue share with enforceable, transparent partnership agreements.",
        "learningObjective": "Conduct a 20-minute diagnostic discovery call, handle common client objections with calm authority, and execute airtight 2-page legal partnership agreements.",
        "takeaway": "A great sales call feels like an insightful consultation where the prospect sells themselves on working with you.",
        "slides": m06_l3_slides, "writtenLesson": m06_l3_written
    },
    {
        "id": "06-4", "number": "6.4", "title": "Client Retention & Portfolio Compounding: Building a 12-Month Moat",
        "duration": "14m",
        "summary": "Retain B2B clients and creator partners long-term through automated monthly performance reporting, upsells, and quarterly revenue expansions.",
        "learningObjective": "Implement the 1st-of-the-month asynchronous ROI reporting framework, construct a 3-tier client upsell ladder, and maximize 12-month customer lifetime value.",
        "takeaway": "Client retention is the single greatest multiplier of solopreneur profitability and sanity.",
        "slides": m06_l4_slides, "writtenLesson": m06_l4_written
    }
]
