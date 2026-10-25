import json
import os

# Helper to build slide
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

# =========================================================================
# MODULE 03: Business #2 — AI Creative & Short-Form Content Studio
# =========================================================================

m03_l1_slides = [
    make_slide(
        "s-031-1", 1, "MODULE 03 · LESSON 3.1",
        "The Organic Attention Crisis",
        "Why modern algorithms prioritize high-volume vertical video over traditional static ads.",
        [
            "The Shift to Algorithmic Feeds: TikTok, Instagram Reels, and YouTube Shorts prioritize watch time and retention curves over existing follower counts.",
            "The Paid Ad Fatigue Problem: Rising customer acquisition costs (CAC) on Meta and Google force brands to invest aggressively in organic distribution.",
            "The Founder Dilemma: CEOs, authors, and agency owners understand they need daily video presence, but cannot afford 20 hours a week to write, film, and edit.",
            "The AI Production Opportunity: Using AI tools to script, voice, and generate visual B-roll allows a solo studio to produce 30 polished videos in under 4 hours."
        ],
        "The demand for high-quality short-form content is virtually limitless; your job is to remove the production bottleneck for busy founders."
    ),
    make_slide(
        "s-031-2", 2, "MODULE 03 · LESSON 3.1",
        "The Anatomy of a High-Retention Vertical Video",
        "The structural elements required to hook viewers in the first 2 seconds and maintain 80%+ completion rates.",
        [
            "The 2-Second Visual & Audio Hook: Provocative question, contrarian thesis, or high-contrast visual that disrupts passive mindless scrolling.",
            "The Narrative Body Loop: Fast-paced delivery of 3 concise insights or case points with visual scene transitions every 2.5 to 3.5 seconds.",
            "Kinetic Subtitles & Sound Design: Animated word-by-word typography with emphasis highlights paired with subtle sound effects (whooshes, risers).",
            "The Engagement or Conversion CTA: Guiding viewers to comment a specific keyword for an automated resource link via DM."
        ],
        "A great short-form video is an engineered psychological experience designed to optimize algorithmic retention metrics."
    ),
    make_slide(
        "s-031-3", 3, "MODULE 03 · LESSON 3.1",
        "Studio Unit Economics: Retainers vs. Hourly Billing",
        "Structuring monthly recurring content packages that generate predictable $2,500/month fees per account.",
        [
            "The Freelancer Flaw: Charging $50 per edited video forces you to edit 50 videos a month just to make $2,500, leading to immediate creative exhaustion.",
            "The Retainer Transformation: Package 20 to 30 fully edited vertical videos with captions, B-roll, and hooks into a flat $2,500/month retainer.",
            "The $10,000/Month Target: Exactly 4 monthly retainer clients at $2,500 each equals $10,000/month in gross studio revenue.",
            "Operational Fulfillments: Leveraging batch AI generation allows you to fulfill one client's entire monthly quota in a single 4-hour production sprint."
        ],
        "Never sell individual video files; sell a turnkey monthly organic growth engine on a recurring retainer."
    ),
    make_slide(
        "s-031-4", 4, "MODULE 03 · LESSON 3.1",
        "The 5-Criteria Profile of the Content Studio Model",
        "Evaluating the pros and operational constraints of running an AI creative agency.",
        [
            "Difficulty: Moderate (2.5/5) — Accessible consumer tools like ElevenLabs and Higgsfield make technical execution straightforward.",
            "Time Intensity: High (4/5) — Video requires aesthetic curation, rendering checks, and creative pacing.",
            "Scalability: Moderate (2.5/5) — Creative review cycles limit solo capacity to 4 or 5 active accounts without hiring assistance.",
            "Income Potential: Moderate (3/5) — Generates reliable $8k to $15k/month, but lacks the explosive upside of creator rev-share.",
            "Stress Level: Moderate (3/5) — Lower urgency than broken enterprise code, but client creative revisions require firm management."
        ],
        "The Content Studio is ideal for visually creative entrepreneurs seeking their first $10k/month, provided client revisions are strictly governed."
    )
]

m03_l1_written = """# 3.1 The Attention Economy & The High-Ticket Short-Form Bottleneck

> **Module 03: Business #2 — AI Creative & Short-Form Content Studio**  
> *Playbook: These 3 AI Businesses Will Make You $10k+/Month (With Zero Employees)*

---

## Executive Overview & Commercial Opportunity

The second business model in the master framework is the **AI Creative & Short-Form Content Studio**.

Across every digital platform—TikTok, Instagram Reels, YouTube Shorts, and LinkedIn—organic distribution has consolidated around high-velocity vertical video. Algorithms are no longer indexed purely on social graphs (who follows whom); they are indexed almost entirely on **viewer retention, watch time, and completion rate**.

This dynamic has created an unprecedented commercial crisis for business founders, executives, real estate developers, and personal brands:
1. **Rising Paid Ad Costs:** Meta and Google ad costs have surged over 40% in recent cycles, making paid customer acquisition increasingly unaffordable for boutique operators.
2. **Insatiable Organic Appetite:** To maintain top-of-mind awareness and feed platform algorithms, brands must publish 15 to 30 pieces of polished vertical video every single month.
3. **The Founder Time Bottleneck:** A CEO or consultant simply does not have the 20 hours each week required to brainstorm hooks, write scripts, record B-roll, edit captions, and format videos across three platforms.

As an AI Content Studio operator, you do not need a film degree, an expensive camera studio, or a team of editors in the Philippines. **By combining frontier LLMs for viral script architectures with specialized generative AI video tools (Higgsfield AI, Midjourney, ElevenLabs), a single operator can produce 30 broadcast-quality short-form videos in 4 hours of focused work.**

---

## 1. The Anatomy of an Algorithmic High-Retention Video

To justify charging a premium $2,500/month retainer, your deliverables must consistently outperform amateur iPhone recordings. Modern algorithmic video adheres to a precise psychological formula:

```
[0:00 - 0:02]  Hook Phase: High-contrast visual + Contrarian audio thesis
[0:02 - 0:10]  Context Loop: Agitate problem & preview high-value payoff
[0:10 - 0:45]  Delivery Phase: 3 rapid value points with scene changes every 2.5s
[0:45 - 0:55]  Action Call: Drive comments via keyword automation (e.g. "Comment 'AUDIT'")
```

### 1. The 2-Second Multi-Sensory Hook
Viewers scroll through feeds in a state of passive hypnotic trance. Your video has less than 2.0 seconds to interrupt that pattern:
- **Audio Hook:** A bold, counter-intuitive statement (*"Why hiring a 5-person agency is the fastest way to bankrupt your business in 2026."*).
- **Visual Disruption:** Fast cinematic motion or unusual imagery generated via AI rather than a static talking head.

### 2. High-Frequency Visual Pacing
Human attention spans on mobile devices require visual stimulation every 2.5 to 3.5 seconds. If a video remains on a single camera angle for 8 seconds, 50% of the audience drops off. Using AI B-roll generators, you insert relevant cinematic cutaways, animated diagrams, and contextual overlays that reset viewer attention continuously.

### 3. Kinetic Typography & Micro-Sound Design
Over 60% of short-form video is consumed with sound muted or at low volume in public environments. Dynamic word-by-word subtitles with high-contrast color highlights (yellow, cyan, white) and animated transitions are mandatory for retention.

---

## 2. Studio Unit Economics: Reaching $10,000/Month

Amateur video editors sell their time on Fiverr or Upwork for $30 to $50 per video. This is a fatal business model: to earn $5,000, you must source, negotiate, and deliver 100 individual video projects every month.

Professional AI studio operators package their services into **Monthly Organic Growth Retainers**:

| Retainer Package Tier | Monthly Deliverables | Production Time (Batch AI) | Monthly Retainer (USD) | Client Roster Needed for $10k/mo |
|---|---|---|---|---|
| **Tier 1: Starter Engine** | 12 Vertical Videos (3/week) | 2.5 hours / month | $1,500 / month | 7 clients |
| **Tier 2: Daily Authority (Target)** | **24 Vertical Videos (6/week)** | **4.0 hours / month** | **$2,500 / month** | **Exactly 4 clients** |
| **Tier 3: Omnichannel Domination** | 30 Videos + 15 X/LinkedIn Carousels | 6.0 hours / month | $3,500 / month | 3 clients |

Notice the mathematical clarity of **Tier 2**:
- You sign exactly **4 founder or brand accounts** at $2,500/month.
- Gross Revenue = **$10,000 / month**.
- Total monthly production time = 16 hours of batch editing.
- Software costs (Higgsfield, ElevenLabs, CapCut, Claude) = ~$160/month.
- **Net Founder Margin = 98.4%!**

---

## 3. The 5-Criteria Profile Audit for the Content Studio

Before choosing this model, review how it scored in our master framework:

| Framework Dimension | Studio Score | Real-World Operational Context |
|---|---|---|
| **General Difficulty** | **2.5 / 5.0 (Moderate)** | Highly accessible; modern AI tools have intuitive user interfaces and preset workflows. |
| **Time Intensity** | **4.0 / 5.0 (High)** | Requires active visual curation, checking render artifacts, and verifying subtitle spelling. |
| **Scalability Ceiling** | **2.5 / 5.0 (Moderate)** | Hard solo cap at 5–6 accounts. Beyond 6 accounts, manual rendering bottlenecks emerge. |
| **Income Potential** | **3.0 / 5.0 (Moderate)** | Comfortably generates $8,000 to $15,000/month; difficult to reach $50k/mo without staff. |
| **Operational Stress** | **3.0 / 5.0 (Moderate)** | Clients can be subjective about creative aesthetics; requires strict revision governance. |

---

## 4. Production Service Level Agreement & Boundary Scope

To prevent "creative revision creep," incorporate these rigid boundaries into your client onboarding document:

```json
{
  "service_tier": "daily_authority_ai_video_retainer",
  "monthly_deliverables": {
    "total_vertical_videos": 24,
    "distribution_formats": ["tiktok_9x16", "instagram_reels", "youtube_shorts"],
    "asset_specifications": "1080x1920_60fps_prores_or_h264"
  },
  "client_collaboration_rules": {
    "script_approval_window_hours": 48,
    "batch_delivery_cadence": "delivered_on_the_1st_and_15th_of_every_month",
    "maximum_revisions_per_video": 1,
    "revision_criteria": "factual_or_pronunciation_errors_only",
    "subjective_stylistic_overhauls": "billed_at_125_usd_per_video"
  }
}
```

---

## 5. Diagnostic Failure Analysis

| Failure Mode | Root Mechanism | Tactical Remedy |
|---|---|---|
| **Endless Client Revisions** | Client treats you like an on-demand personal animator | Limit revisions strictly to 1 round per batch and require timestamped Loom feedback. |
| **Robotic AI Voice Tone** | Using default robotic text-to-speech models | Use ElevenLabs Voice Cloning trained on 15 minutes of the founder's authentic audio. |
| **Repetitive Generic Stock B-Roll** | Overusing standard Pexels/Unsplash video clips | Generate bespoke cinematic scenes in Higgsfield AI or Midjourney for unique aesthetic value. |

---

## 6. Practical Implementation Exercise

1. **Audit a Target Founder's Profile:** Find a successful boutique agency owner or consultant on LinkedIn or X with 5,000+ followers who rarely posts video.
2. **Identify Their Top Written Post:** Select their highest-engagement written post or article.
3. **Deconstruct into a 45-Second Video Hook:** Turn their written insight into a compelling 3-part script using the 2-second hook framework.

---

## 7. Key Actionable Takeaways

1. **Short-form video is the new SEO:** Every founder needs organic video presence to combat rising paid ad costs.
2. **Sell monthly retainers, not individual clips:** 4 clients at $2,500/month generates a predictable $10,000/month income.
3. **Pacing drives algorithm retention:** Cut away every 2.5 to 3.5 seconds using AI-generated visual assets.
4. **Enforce a strict 1-revision limit:** Never allow clients to endlessly tweak subjective creative preferences without paying extra.
"""

m03_l2_slides = [
    make_slide(
        "s-032-1", 1, "MODULE 03 · LESSON 3.2",
        "The 3-Stage Generative Production Pipeline",
        "How to decouple the creation process into an efficient, repeatable assembly line.",
        [
            "Stage 1: Cognitive Script Architecture — Using Claude 3.5 Sonnet to draft 30 viral retention scripts from client audio transcripts or long-form blogs in 45 minutes.",
            "Stage 2: Synthetic Voice Cloning (ElevenLabs) — Generating studio-grade voiceovers using professional voice clones trained on the client's authentic voice.",
            "Stage 3: Generative Visual Synthesis — Producing high-contrast cinematic B-roll using Higgsfield AI, Midjourney v6, and Runway Gen-3.",
            "The Solo Advantage: Decoupling these phases allows you to batch 30 scripts on Monday morning, generate all audio in 30 minutes, and render visuals on Tuesday."
        ],
        "Treat video creation like an industrial manufacturing line: batch each component stage separately to maximize output velocity."
    ),
    make_slide(
        "s-032-2", 2, "MODULE 03 · LESSON 3.2",
        "Engineering High-Retention Script Prompts",
        "Configuring LLM prompts that write natural, spoken dialogue rather than stiff written essays.",
        [
            "Banish the Academic Tone: LLMs naturally default to corporate vocabulary ('delve', 'moreover', 'testament'); force prompts into 5th-grade conversational cadence.",
            "Punctuation for Audio Cadence: Use commas, dashes, and ellipses to force natural breath pauses and vocal inflection in downstream synthesis engines.",
            "The Script Constraint Formula: Enforce strict word counts (110–135 words for 45 seconds; 140–165 words for 60 seconds).",
            "Hook Generation Multipliers: Require the model to output 5 alternative opening hooks for every script to select the most viral angle."
        ],
        "Scripts must be engineered for the human ear, not the eye; write for spoken rhythm and emotional pacing."
    ),
    make_slide(
        "s-032-3", 3, "MODULE 03 · LESSON 3.2",
        "Voice Cloning & Audio Mastery in ElevenLabs",
        "Creating indistinguishable synthetic audio that sounds authentic, energetic, and professional.",
        [
            "Professional Voice Cloning (PVC): Upload 15 to 20 minutes of high-fidelity, room-noise-free audio of the client speaking passionately.",
            "Stability & Clarity Calibration: Set Stability to 45% and Similarity to 85% to achieve natural emotional variation without vocal artifacts.",
            "Speech-to-Speech (STS) Dynamic Inflection: Record your own voice providing the exact cadence and pacing, then transform it into the client's vocal timbre.",
            "Exporting Multi-Track Stems: Download 48kHz WAV audio files for crystal-clear fidelity in downstream editing software."
        ],
        "Professional Voice Cloning allows clients to publish daily content without ever stepping in front of a microphone."
    ),
    make_slide(
        "s-032-4", 4, "MODULE 03 · LESSON 3.2",
        "Visual Asset Synthesis with Higgsfield AI & Runway",
        "Generating bespoke cinematic video clips that elevate production value beyond commodity stock footage.",
        [
            "The Higgsfield AI Advantage: Specialized generative video engine tailored for commercial marketing, dynamic camera moves, and human action.",
            "Camera Motion Control: Utilize prompt motion directives ('cinematic push-in', 'slow motion orbital 4k', 'anamorphic lens flare') to create drama.",
            "Image-to-Video Continuity: Generate high-resolution base frames in Midjourney v6 and animate them using Runway Gen-3 Alpha for consistent visual style.",
            "Asset Library Organization: Build a categorized cloud folder of generic high-performing B-roll clips (luxury office, cyber data streams, trading desks) for instant reuse."
        ],
        "Generative video tools allow solo creators to deploy Hollywood-level cinematic visual B-roll on a shoestring budget."
    )
]

m03_l2_written = """# 3.2 The AI Creative Pipeline: Scripting, Voice Synthesis & Visual Generation

> **Module 03: Business #2 — AI Creative & Short-Form Content Studio**  
> *Playbook: These 3 AI Businesses Will Make You $10k+/Month (With Zero Employees)*

---

## Executive Overview & Pipeline Architecture

The primary reason most video editing agencies struggle to scale is that their workflow is chaotic and linear: an editor sits down, writes one script, records one audio track, searches for B-roll clips for 2 hours, edits the video, renders it, and repeats the cycle 30 times.

This linear method caps personal production at 15 to 20 videos per month and guarantees burnout.

To operate as a zero-employee **AI Creative Studio** generating $10,000/month, you must operate like a modern micro-manufacturing plant. You **decouple the production stages into discrete, batched pipelines**:

```
[Stage 1: Script Engine]   --->   [Stage 2: Voice Cloning]   --->   [Stage 3: Visual Synthesis]
 (Claude 3.5 Sonnet)             (ElevenLabs PVC Model)            (Higgsfield / Runway Gen-3)
      |                                |                                   |
 Batch 30 Scripts                Generate 30 Audio Stems           Render 60 Cinematic B-Rolls
 (Time: 45 minutes)              (Time: 30 minutes)                (Time: 90 minutes)
```

By batching each phase across an entire month's deliverables, your total active production time per client drops to **under 4 hours per month**.

---

## 1. Stage 1: Frontier LLM Scriptwriting Architecture

Stiff, corporate text kills short-form video instantly. If your AI prompt generates sentences like *"In today's fast-paced digital landscape, innovation is paramount"*, viewers scroll past within 0.8 seconds.

Spoken dialogue requires short sentences, natural breath pauses, casual vocabulary, and intense emotional curiosity loops.

### Production System Prompt: The Viral Short-Form Scriptwriter
Deploy this exact prompt inside Claude 3.5 Sonnet or ChatGPT-4o:

```
You are an elite short-form retention director specializing in viral vertical video for YouTube Shorts and Instagram Reels.
Your objective is to adapt the provided source topic into a high-retention 45-second script.

RULES:
1. WORD COUNT: Exactly 115 to 130 words (approx. 45 seconds at 160 WPM).
2. READING LEVEL: 5th-grade conversational English. Banish words like "delve", "testament", "tapestry", "moreover", "crucial".
3. PACING: Break sentences into short clauses (5-10 words max) separated by dashes or commas to guide synthetic voice breathing.
4. STRUCTURE:
   - [0-2s] HOOK: A contrarian or curiosity-driven hook. Provide 3 alternative options.
   - [2-10s] CONTEXT: The high-stakes problem that 90% of people get wrong.
   - [10-38s] VALUE POINTS: 3 distinct, tactical insights.
   - [38-45s] CALL TO ACTION: A single clear keyword directive (e.g., "Comment 'BLUEPRINT' below and I'll DM you the system.").

OUTPUT FORMAT:
Return strictly structured JSON matching this schema:
{
  "topic": "string",
  "hook_variations": ["Hook A", "Hook B", "Hook C"],
  "selected_script_text": "string",
  "b_roll_visual_prompts": ["Visual 1 prompt", "Visual 2 prompt", "Visual 3 prompt"]
}
```

---

## 2. Stage 2: Authentic Synthetic Audio in ElevenLabs

Voice cloning technology has crossed the threshold of human perceptual indistinguishability. When calibrated correctly, your clients' own followers will not realize the voiceover was synthesized by AI.

### Calibration Protocol for Professional Voice Cloning (PVC):
1. **Source Audio Ingestion:** Obtain 15 to 20 minutes of clean, dry microphone audio from the client (interviews, podcast appearances, or voice notes). Ensure there is zero background music, echo, or room noise.
2. **Model Selection:** Use the **Eleven Multilingual v2** or **Eleven Turbo v2.5** model for lowest latency and highest vocal stability.
3. **Parameter Calibration Matrix:**
   - **Stability:** `0.45` (Lower values introduce emotional inflection, breath sounds, and vocal dynamism; higher values sound monotone).
   - **Similarity:** `0.85` (Ensures fidelity to the original voice timbre while allowing natural phonetic variations).
   - **Style Exaggeration:** `0.15` (Adds subtle enthusiasm without distorting vowels).
   - **Speaker Boost:** `Enabled` (Enhances vocal clarity and presence in mobile speakers).

---

## 3. Stage 3: Generative Visual Synthesis with Higgsfield AI & Runway

To elevate your client's videos above commodity competitors who use overused stock video clips from Pexels or Storyblocks, you engineer custom generative B-roll.

### Using Higgsfield AI for High-Impact Commercial Action:
Higgsfield AI is engineered specifically for dynamic social media video, featuring native camera motion controls and realistic character expressions.
- **Cinematic Lighting Directives:** Prompt with lighting specifications: *"cinematic 35mm lens, volumetric god rays, high-contrast chiaroscuro, muted corporate teal-and-orange grading"*.
- **Motion Controls:** Direct the camera movement explicitly: *"slow orbital camera push-in towards the character's focused eyes, 60fps slow-motion"*.

### The Midjourney-to-Runway Gen-3 Pipeline:
When you require absolute aesthetic control over a scene:
1. **Base Frame Generation in Midjourney v6:**
   ```
   /imagine prompt: A high-end luxury minimalist office at night, glowing Bloomberg financial terminals, rain on floor-to-ceiling windows, hyper-realistic 8k, cinematic lighting --ar 9:16 --v 6.0
   ```
2. **Motion Animation in Runway Gen-3 Alpha:** Upload the 9:16 vertical image into Runway Image-to-Video.
3. **Motion Prompt:** *"Slow cinematic dolly zoom into the financial monitors, rain droplets rolling down the window glass, subtle ambient neon glow, photorealistic."*
4. **Export:** Render in 1080x1920 at 24 or 30 fps.

---

## 4. Production Code: Automated Audio Generation Script (Node.js)

Automate the batch generation of voice files via the ElevenLabs REST API:

```javascript
const fs = require('fs');
const axios = require('axios');

async function synthesizeVoiceover({ voiceId, apiKey, scriptText, outputPath }) {
  const url = "https://api.elevenlabs.io/v1/text-to-speech/" + voiceId;
  
  const payload = {
    text: scriptText,
    model_id: "eleven_turbo_v2_5",
    voice_settings: {
      stability: 0.45,
      similarity_boost: 0.85,
      style: 0.15,
      use_speaker_boost: true
    }
  };

  const response = await axios.post(url, payload, {
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg'
    },
    responseType: 'arraybuffer'
  });

  fs.writeFileSync(outputPath, Buffer.from(response.data));
  console.log("Voiceover synthesized successfully to " + outputPath);
}
```

---

## 5. Diagnostic Failure Analysis

| Failure Mode | Root Mechanism | Diagnostic Remedy |
|---|---|---|
| **AI Vocal Drift** | ElevenLabs voice sounds robotic or changes accent mid-sentence | Increase Stability to 0.55 or split the paragraph into separate shorter audio clips. |
| **Generative Video Morphing** | Character's hands or faces distort during AI video generation | Use Runway Gen-3 with image-to-video anchoring rather than pure text-to-video prompting. |
| **Pacing Desynchronization** | Audio is 48 seconds but B-roll footage is only 30 seconds | Render 6 to 8 distinct 4-second B-roll clips per script to ensure 100% visual coverage. |

---

## 6. Practical Implementation Exercise

1. **Record a 60-Second Audio Sample:** Use your smartphone voice memo app to record yourself reading a 1-paragraph business tip.
2. **Generate an Instant Voice Clone:** Create a free account on ElevenLabs, upload the audio sample, and synthesize a test script.
3. **Generate 1 Cinematic B-Roll Clip:** In Higgsfield AI or Runway Gen-3, generate a 4-second vertical video depicting a modern tech entrepreneur working on a laptop.

---

## 7. Key Actionable Takeaways

1. **Decouple the creation pipeline:** Batch scripts, voiceovers, and visual renders separately to achieve 10x production speed.
2. **Prompt for spoken cadence:** Use short sentences, natural breath marks, and conversational 5th-grade English.
3. **Calibrate ElevenLabs parameters:** Stability at 0.45 and Similarity at 0.85 delivers optimal emotional realism.
4. **Image-to-video yields the highest quality:** Create base frames in Midjourney v6 and animate them in Runway Gen-3.
"""

# Lessons 3.3 and 3.4
m03_l3_slides = [
    make_slide(
        "s-033-1", 1, "MODULE 03 · LESSON 3.3",
        "The Standardized Timeline Architecture",
        "Structuring editing timelines for maximum assembly speed and visual consistency.",
        [
            "Track 1 (Voiceover Master): Normalized to -14 LUFS with dynamic EQ and subtle compression for maximum mobile punchiness.",
            "Track 2 (Background Ambience): Lo-fi or dark cinematic instrumental track ducked automatically to -24 dB beneath speech.",
            "Track 3 (Visual B-Roll Layer): Generative AI video clips cut precisely at 2.5 to 3.5-second intervals on downbeats.",
            "Track 4 (Kinetic Subtitles & Overlays): Dynamic auto-caption layer with custom brand colors, drop shadows, and word animations."
        ],
        "A locked timeline template cuts manual editing time from 45 minutes down to 8 minutes per video."
    ),
    make_slide(
        "s-033-2", 2, "MODULE 03 · LESSON 3.3",
        "Kinetic Auto-Captions & Subtitle Styling",
        "Why dynamic subtitles drive watch time and how to configure them with sub-second accuracy.",
        [
            "The Read-Along Psychology: Viewers subconsciously read subtitles faster than speech, creating continuous visual forward momentum.",
            "Word-by-Word Highlight Animation: Highlighting the active spoken word in vibrant yellow (#FFE500) or neon green (#00FF66).",
            "Typography Hierarchy: Heavy, clean sans-serif fonts (The Bold Font, Montserrat Black, Futura Heavy) with black stroke borders.",
            "Automated Caption Generators: Tools like Submagic, CapCut Pro, or Auto-Cut transcribe and animate subtitles in 60 seconds with 98% accuracy."
        ],
        "High-contrast dynamic captions keep silent viewers glued to the screen across all social media platforms."
    ),
    make_slide(
        "s-033-3", 3, "MODULE 03 · LESSON 3.3",
        "Faceless Channels vs. Branded Founder Channels",
        "Comparing the two dominant video agency models and their commercial positioning.",
        [
            "The Faceless Channel Model: 100% synthetic audio, generative AI B-roll, zero camera presence; monetized via TikTok Creator Rewards and affiliate links.",
            "The Branded Founder Studio: Repurposing executive interviews or voice cloning founders to drive inbound B2B consulting leads.",
            "Commercial Stability Comparison: Founder studios command predictable $2,500/month retainers; faceless channels rely on algorithm ad revenue.",
            "The Hybrid Approach: Provide busy founders with a 'Done-for-You' faceless studio that represents their corporate brand without requiring their face on camera."
        ],
        "Branded founder studios provide higher, more stable monthly retainers than speculative faceless consumer channels."
    ),
    make_slide(
        "s-033-4", 4, "MODULE 03 · LESSON 3.3",
        "Batch Exporting & Quality Assurance Protocol",
        "Ensuring flawless video exports with zero audio clipping or visual compression artifacts.",
        [
            "Export Preset Standards: H.264 MP4, 1080x1920 vertical resolution, 30fps or 60fps, variable bitrate (VBR 2-pass) target 15 Mbps.",
            "Mobile Audio Check: Test rendered video audio on smartphone speakers to ensure the voiceover cuts through ambient room noise.",
            "Safe-Zone Verification: Keep captions and critical visual elements within the 1080x1400 center safe zone to prevent UI button overlap.",
            "Cloud Delivery Staging: Organize exported files in Google Drive or Frame.io with clear naming conventions (e.g., 'Client_Video_01_HookA.mp4')."
        ],
        "Strict export standards and safe-zone compliance ensure deliverables look flawless inside native mobile app interfaces."
    )
]

m03_l3_written = """# 3.3 Automated Video Assembly, Pacing & Faceless Channel Systems

> **Module 03: Business #2 — AI Creative & Short-Form Content Studio**  
> *Playbook: These 3 AI Businesses Will Make You $10k+/Month (With Zero Employees)*

---

## Executive Overview & Assembly Architecture

When video editors attempt to craft every video from scratch on an empty timeline, they waste 40 minutes per video arranging clips, syncing audio, adjusting volume levels, and manually setting font styles.

In an **AI Content Studio**, you do not edit from scratch. You work inside a **locked, modular timeline master template**.

By establishing a rigid 4-track timeline structure and leveraging automated speech-to-text caption engines, your manual editing time drops from 40 minutes down to **6 to 8 minutes per video**. That means a full monthly package of 24 videos is assembled, captioned, and queued for export in under 3.5 hours.

---

## 1. The 4-Track Master Timeline Architecture

Configure your master project in CapCut Pro, Adobe Premiere Pro, or DaVinci Resolve using this strict hierarchy:

```
Track 4 [Video Top]:     Kinetic Subtitles & Keyword Overlays (Dynamic Text Engine)
Track 3 [Video Mid]:     Visual B-Roll Layer (Generative AI Clips cut every 2.5–3.5s)
Track 2 [Audio Sub]:     Background Ambient Music (Sidechain Ducked to -24 dB)
Track 1 [Audio Master]:  Normalized AI Voiceover (-14 LUFS, High-Pass Filter @ 80Hz)
```

### Track 1: Voiceover Normalization & EQ
- **Gain Staging:** Normalize the synthetic voiceover stem to **-14 LUFS** (integrated loudness) with peak ceiling at **-1.0 dB**.
- **EQ & Dynamics:** Apply a gentle high-pass filter cutting frequencies below 80 Hz (eliminates synthetic sub-rumble) and boost presence around 3.5 kHz for vocal clarity on mobile speakers.

### Track 2: Background Music & Sidechain Compression
- Select rhythmic, non-intrusive instrumental tracks (lo-fi hip-hop, tech house, or cinematic percussion).
- Configure **sidechain ducking**: whenever the voiceover on Track 1 is active, the background music volume automatically drops by -10 dB to prevent vocal masking.

### Track 3: B-Roll Pacing & Transition Logic
- Lay down generative AI video clips or stock footage in 2.5 to 3.5-second segments.
- Align visual cuts with vocal sentence breaks or rhythmic beats in the background track.
- Avoid tacky, amateur 3D transitions (page curls, star wipes); use clean hard cuts, subtle optical zoom punches (105% scale), or fast motion blur whips.

### Track 4: Kinetic Typography & Visual Safe Zones
- Keep all animated subtitles strictly within the **Mobile Platform Safe Zone** (between 300px from the top and 450px from the bottom) so platform UI elements (like buttons, comments, account handles, sound discs) do not obscure text.

---

## 2. Dynamic Kinetic Subtitle Configuration

Subtitles are not merely an accessibility aid; they are the primary psychological driver of viewer retention on mobile feeds.

### The Subtitle Styling Rulebook:
1. **Font Family:** Heavy, condensed sans-serif fonts with thick strokes:
   - *Montserrat Black*
   - *The Bold Font*
   - *Komika Axis*
   - *Futura Bold*
2. **Font Size:** 18pt to 22pt relative to 1080x1920 canvas.
3. **Stroke & Shadow:** White fill with a 4px black outer stroke and a subtle 25% black drop shadow. This guarantees legibility across white, bright, and dark backgrounds.
4. **Active Word Coloring:** Set the active spoken word to illuminate in high-visibility neon:
   - Primary: Electric Yellow (`#FFE500`)
   - Secondary / Action: Neon Green (`#00FF66`)
   - Urgency: Bright Coral (`#FF3B30`)

---

## 3. Faceless Channels vs. Branded Executive Studios

When launching an AI Content Studio, you will encounter two primary operating styles:

| Feature Dimension | Faceless AI Channels | Branded Executive Studio (Recommended) |
|---|---|---|
| **Target Audience** | Mass consumer entertainment / trivia | B2B founders, consultants, luxury brands |
| **Monetization Engine** | Ad revenue (TikTok Rewards, YouTube AdSense) | **Fixed monthly retainers ($2,500/mo)** |
| **Revenue Predictability** | Highly volatile (algorithm swings) | Highly stable (contracted monthly payments) |
| **Client Interaction** | None (you own the channel) | Low (asynchronous monthly batch reviews) |
| **Time to $10,000/Month** | 6 to 12 months of daily uploading | **30 to 60 days (4 retainer clients)** |
| **Strategic Advantage** | Passive asset ownership | Immediate, high-margin cash flow |

**Strategic Directive:** Prioritize the **Branded Executive Studio**. Signing 4 business owners who pay you $2,500 every single month provides instant, stress-free $10k cash flow without gambling on platform algorithmic monetization policies.

---

## 4. Production Code: Video Safe-Zone Overlay Specifications

```json
{
  "canvas_resolution": {
    "width_px": 1080,
    "height_px": 1920,
    "aspect_ratio": "9:16",
    "framerate": 30
  },
  "mobile_ui_safe_zones": {
    "top_safe_margin_px": 280,
    "bottom_safe_margin_px": 420,
    "left_safe_margin_px": 60,
    "right_safe_margin_px": 140,
    "subtitle_anchor_y_px": 1280
  },
  "audio_standards": {
    "target_lufs": -14.0,
    "true_peak_max_db": -1.0,
    "music_ducking_attenuation_db": -12.0
  }
}
```

---

## 5. Diagnostic Failure Analysis

| Assembly Error | Root Cause | Preventive Measure |
|---|---|---|
| **Subtitles Blocked by UI** | Placing text too low on the 9:16 canvas | Anchor all caption blocks at Y: 1280px (above TikTok caption box and account name). |
| **Muffled Mobile Audio** | Over-boosting low-end bass in background music | Cut all music frequencies below 120 Hz; keep voiceover crisp and bright in the 2–5 kHz range. |
| **Visual Stutter / Lag** | Exporting at mismatched variable framerates | Lock project sequence strictly to constant 30.0 fps or 60.0 fps before rendering. |

---

## 6. Practical Implementation Exercise

1. **Set Up a Master CapCut or Premiere Project:** Create a 1080x1920 vertical sequence.
2. **Apply the 4-Track Structure:** Configure Track 1 (Voice), Track 2 (Music), Track 3 (B-Roll), Track 4 (Captions).
3. **Assemble a 30-Second Video:** Import your ElevenLabs voiceover stem, add 8 AI B-roll clips, generate auto-captions, and export a test MP4 in under 10 minutes.

---

## 7. Key Actionable Takeaways

1. **Use locked timeline templates:** Never edit from an empty canvas; templates cut production time by 80%.
2. **Dynamic subtitles are non-negotiable:** Over 60% of mobile users watch without sound; animated text drives retention.
3. **Target B2B founders over faceless channels:** 4 retainers @ $2,500/mo is far more reliable than chasing viral ad revenue.
4. **Respect mobile safe zones:** Keep critical text and visuals between Y: 280px and Y: 1500px to avoid platform UI interference.
"""

m03_l4_slides = [
    make_slide(
        "s-034-1", 1, "MODULE 03 · LESSON 3.4",
        "The Creative Agency Revision Trap",
        "Why subjective client feedback rapidly destroys effective hourly rates and causes burnout.",
        [
            "The Subjectivity Hazard: In software automation, code either works or fails; in video editing, every client believes they are an art director.",
            "The Endless Tweak Cycle: 'Can you make the blue slightly warmer? Can you change the music track? What if we tried a different font?'",
            "Effective Hourly Rate Collapse: Spending 5 hours tweaking a single $100 video reduces your earnings to $20/hour.",
            "The Professional Antidote: Establish definitive, non-negotiable boundary frameworks during the initial onboarding handshake."
        ],
        "Client revisions must be strictly governed by contractual rules, not subjective emotional whims."
    ),
    make_slide(
        "s-034-2", 2, "MODULE 03 · LESSON 3.4",
        "The 2-Stage Asynchronous Approval Gate",
        "How to decouple script validation from visual rendering to eliminate wasted editing hours.",
        [
            "Gate 1: Script & Concept Sign-Off — Client reviews and approves written scripts in Airtable/Notion before a single frame of video is rendered.",
            "The 48-Hour Silence Protocol: If the client does not request script edits within 48 hours, scripts are marked automatically as approved.",
            "Gate 2: Final Visual Assembly Check — Client receives the assembled video batch with a strict limit of 1 round of minor timestamped revisions.",
            "Zero Live Zoom Reviews: Banish live review meetings; require all feedback via timestamped comments in Frame.io or Loom."
        ],
        "Never render video without an approved script; separating words from visuals eliminates 90% of structural revisions."
    ),
    make_slide(
        "s-034-3", 3, "MODULE 03 · LESSON 3.4",
        "Packaging Deliverables with Frame.io & Airtable",
        "Providing an enterprise-grade review experience that reinforces your premium positioning.",
        [
            "Frame.io Review Links: Clients click directly on the video timeline to leave timestamped notes rather than typing vague paragraphs.",
            "Airtable Content Calendar Portal: Clients view their upcoming monthly queue with status tags ('In Production', 'Pending Review', 'Ready to Publish').",
            "Automated Publishing Integrations: Connect approved videos directly to Metricool, Buffer, or repurpose.io for hands-off publishing.",
            "The Premium Perception: A clean, branded portal makes clients feel like they are working with a 20-person production house."
        ],
        "Structured review portals elevate perceived client value while enforcing strict revision boundaries."
    ),
    make_slide(
        "s-034-4", 4, "MODULE 03 · LESSON 3.4",
        "Protecting 90%+ Net Margins as a Solo Studio",
        "The economic discipline required to scale to $10,000/month without margin compression.",
        [
            "The $125 Out-of-Scope Fee: Charge a flat $125 fee for any stylistic overhaul requested after script sign-off.",
            "Software Cost Control: Limit studio tool subscriptions to $200/month (Higgsfield, ElevenLabs, CapCut, Frame.io).",
            "Batch Production Discipline: Schedule dedicated editing blocks (e.g., Tuesday and Thursday mornings) to preserve deep creative focus.",
            "Capacity Governance: Cap your active client roster at 4 retainers ($10,000/month); only accept client #5 if a current client churns or upgrades."
        ],
        "Disciplined boundary management and batch scheduling allow you to earn $10k/month while working just 15 hours per week."
    )
]

m03_l4_written = """# 3.4 Managing Revision Traps, Client Boundaries & Defending Studio Margins

> **Module 03: Business #2 — AI Creative & Short-Form Content Studio**  
> *Playbook: These 3 AI Businesses Will Make You $10k+/Month (With Zero Employees)*

---

## Executive Overview & The Revision Crisis

In our 5-Dimensional Business Evaluation Framework, the **AI Creative & Short-Form Content Studio** model scored a **3.0 out of 5.0 on Operational Stress Level**.

It is crucial to analyze why this stress arises:
In the AI Automation Agency model, performance is binary and objective: the webhook either successfully fires and populates Airtable, or it throws an error code. There is no subjective debate about whether the data looks "stylish."

In creative content, however, **every client considers themselves a visual expert**. Without rigid operational governance, you will inevitably encounter the "Revision Trap":
- A client approves a script, watches the finished 60-second video, and says: *"I don't love the vibe of the music. Can you try something more jazz-fusion?"*
- You swap the music, and they say: *"Now the font feels too aggressive. Can we make it softer? And can we change the opening hook entirely?"*
- Three rounds of revisions later, you have spent 4 hours on a single video, completely destroying your hourly profitability.

To operate a sustainable, stress-free AI Content Studio netting $10,000/month with zero employees, **you must replace subjective emotional back-and-forth with an automated, gated approval architecture**.

---

## 1. The 2-Stage Asynchronous Approval Gate

To eliminate 90% of client revision requests, decouple the **Words (Script)** from the **Visuals (Assembly)**:

```
[Stage 1: Script Approval Gate]
 Client reviews written script in Airtable.
 Must approve within 48 hours or auto-approved.
                |
                v (Script Locked)
[Stage 2: Assembly & Visual Render]
 AI Voiceover synthesized + B-Roll placed + Captions added.
                |
                v
[Stage 3: Single Final Review Pass]
 Timestamped Frame.io comments only (Factual/Pronunciation errors).
 Subjective stylistic overhauls billed at $125/video.
```

### Rule 1: Never Render on an Unlocked Script
A script takes 3 minutes to edit in text; an assembled video takes 30 minutes to re-voice, re-cut, and re-export. Never record a single line of synthetic audio or animate B-roll until the client has explicitly signed off on the written script.

### Rule 2: The 48-Hour Silence Protocol
Clients are notoriously slow at reviewing deliverables. In your agreement, state:  
*"Scripts are delivered on the 1st of the month. If feedback is not received within 48 business hours, the batch is deemed approved and progresses directly to production."*

### Rule 3: Zero Live Zoom Review Sessions
Never allow a client to "hop on a quick 15-minute Zoom call" to review videos together. Live review calls turn into rambling 60-minute brainstorming sessions. Mandate that all feedback must be submitted via timestamped comments in Frame.io or recorded as a 2-minute Loom teardown.

---

## 2. Review Portal Architecture: Frame.io + Airtable

Amateur freelancers send unlisted YouTube links or MP4 files via Google Drive and ask: *"What do you think?"*

This invites vague, unstructured feedback like: *"Around the middle, can you make it punchier?"*

Professional studios deploy **Frame.io**:
1. Upload the 24-video batch into a private Frame.io project.
2. The client receives a single secure review link.
3. To leave feedback, the client pauses the video at the exact second (e.g., `0:14.2`) and types their note directly on the frame: *"Please fix spelling of 'Proprietary' here."*
4. You receive a clean, actionable checklist of timestamped tasks. You resolve all items in 20 minutes and mark the batch closed.

---

## 3. Scope of Work (SOW) Contract Clause: Revision Boundaries

Copy and paste this contractual term into your client retainers:

```
REVISION & APPROVAL POLICY:
1. Script Phase: Client is entitled to one (1) round of structural revisions during the initial script delivery window. Once approved, the script is locked.
2. Video Assembly Phase: Client is entitled to one (1) consolidated round of minor technical revisions per video batch. "Technical revisions" are strictly defined as: factual errors, mispronounced company names, or incorrect subtitle spelling.
3. Out-of-Scope Revisions: Any request to alter an approved script, re-record voiceovers, change agreed-upon visual styles, or replace approved background music after production has commenced will incur an Out-of-Scope Production Fee of $125.00 USD per video asset.
```

When a client realizes that changing their mind about background music will cost them $125 per video across 10 videos ($1,250), their sudden desire to tweak subjective details evaporates immediately.

---

## 4. Financial Health Matrix: Protecting 90%+ Studio Margins

| Cost Category | Monthly Allocation (4 Retainer Clients = $10k/mo) | Percentage of Gross |
|---|---|---|
| **Higgsfield AI Pro** | $39.00 / month | 0.39% |
| **ElevenLabs Creator** | $22.00 / month | 0.22% |
| **CapCut Pro / Adobe Cloud** | $20.00 / month | 0.20% |
| **Frame.io Pro Tier** | $15.00 / month | 0.15% |
| **Stripe Merchant Processing (2.9%)** | $290.00 / month | 2.90% |
| **Total Operational Costs** | **$386.00 / month** | **3.86%** |
| **Net Founder Take-Home Profit** | **$9,614.00 / month** | **96.14% Net Margin** |

---

## 5. Diagnostic Failure Analysis

| Margin Trap | Underlying Cause | Tactical Correction |
|---|---|---|
| **Scope Creep via Slack** | Client texting ad-hoc requests outside the formal portal | Politely redirect: *"Hey Mark! Please drop that note into Frame.io so our production pipeline tracks it accurately."* |
| **Delayed Monthly Payments** | Invoicing after the work is delivered | Require automated Stripe recurring subscriptions charged on the 1st of every month prior to production. |
| **Over-Delivering Unused Content** | Creating 40 videos when the contract specified 24 | Deliver exactly the contracted 24 assets; offer remaining concepts as an upsell for an extra $1,000. |

---

## 6. Practical Implementation Exercise

1. **Create a Free Frame.io Account:** Set up an isolated project named `Client Review Demo`.
2. **Upload a Sample 30-Second Video:** Test leaving a timestamped comment at `0:05` and verify how the notification appears.
3. **Draft Your 1-Page Revision Policy:** Prepare a PDF document clearly explaining the 2-stage approval process and the $125 out-of-scope fee.

---

## 7. Key Actionable Takeaways

1. **Decouple scripts from assembly:** Always lock scripts in text before recording voiceovers or rendering visuals.
2. **Enforce the 48-hour auto-approval protocol:** Never let slow client review cycles stall your production schedule.
3. **Mandate timestamped Frame.io feedback:** Banish unstructured feedback and live Zoom review calls entirely.
4. **Attach a price tag to subjective changes:** Charging $125 per out-of-scope edit protects your margins and trains clients to respect your time.
"""

MODULE_03 = [
    {
        "id": "03-1", "number": "3.1", "title": "The Attention Economy & The High-Ticket Short-Form Bottleneck",
        "duration": "14m",
        "summary": "Capitalize on the explosive demand for short-form video (Reels, TikTok, Shorts) among brands and founders who lack the time or tools to produce content.",
        "learningObjective": "Analyze the commercial demand for high-velocity short-form content, evaluate founder time constraints, and structure an AI-powered content studio offer.",
        "takeaway": "Every business founder knows organic short-form video is essential for brand growth, but none have the 20 hours per week required to film and edit it manually.",
        "slides": m03_l1_slides, "writtenLesson": m03_l1_written
    },
    {
        "id": "03-2", "number": "3.2", "title": "The AI Creative Pipeline: Scripting, Voice Synthesis & Visual Generation",
        "duration": "14m",
        "summary": "Harness LLMs for high-retention storytelling hooks, ElevenLabs for voice cloning, and Higgsfield AI, Midjourney & Runway for cinematic B-roll.",
        "learningObjective": "Build a standardized production pipeline connecting LLM prompt engineering, voice synthesis, and generative video tools to batch-create high-performing assets.",
        "takeaway": "True video studio efficiency comes from pipeline modularity: decouple scripting, audio synthesis, and visual rendering into a repeatable assembly line.",
        "slides": m03_l2_slides, "writtenLesson": m03_l2_written
    },
    {
        "id": "03-3", "number": "3.3", "title": "Automated Video Assembly, Pacing & Faceless Channel Systems",
        "duration": "14m",
        "summary": "Standardize rapid video assembly, dynamic subtitle animation, B-roll pacing, and audio mixing to produce 30 high-performing video assets in 4 hours.",
        "learningObjective": "Master the assembly and templating workflows that allow a solo operator to edit, caption, and export 30 vertical videos in under 4 hours.",
        "takeaway": "Editing is not about reinventing the wheel on every clip; it is about building standardized timeline templates and leveraging automated caption engines.",
        "slides": m03_l3_slides, "writtenLesson": m03_l3_written
    },
    {
        "id": "03-4", "number": "3.4", "title": "Managing Revision Traps, Client Boundaries & Defending Studio Margins",
        "duration": "14m",
        "summary": "Protect agency profitability from endless client revisions using rigid review portals, asynchronous approval gates, and clear deliverable caps.",
        "learningObjective": "Implement boundary-management protocols, design an asynchronous client review portal, and protect 90%+ studio profit margins against creative scope creep.",
        "takeaway": "In creative agencies, profit is not lost on production; it is lost in endless rounds of unpaid, subjective client revisions.",
        "slides": m03_l4_slides, "writtenLesson": m03_l4_written
    }
]

# Read Module 4 and Module 5 lessons from their respective python definitions
from module4_data import MODULE_04
from module5_data import MODULE_05

output_content = f"""import {{ Lesson }} from "@/lib/playbooks-data";

export interface ExtendedLesson extends Lesson {{
  learningObjective: string;
  writtenLesson: string;
  takeaway: string;
}}

// ==========================================
// MODULE 03: Business #2 — AI Creative & Short-Form Content Studio
// ==========================================
export const MODULE_03_LESSONS: ExtendedLesson[] = {json.dumps(MODULE_03, indent=2)};

// ==========================================
// MODULE 04: Business #3 — AI Shadow Operating for Micro-Creators
// ==========================================
export const MODULE_04_LESSONS: ExtendedLesson[] = {json.dumps(MODULE_04, indent=2)};

// ==========================================
// MODULE 05: The AI Shadow Operator Launch & Monetization Engine
// ==========================================
export const MODULE_05_LESSONS: ExtendedLesson[] = {json.dumps(MODULE_05, indent=2)};
"""

target_path = os.path.join(os.path.dirname(__file__), '../src/lib/ai-automations-content-2.ts')
with open(target_path, 'w', encoding='utf-8') as f:
    f.write(output_content)

print(f"Successfully generated {target_path}")
