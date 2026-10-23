import { Lesson, Module } from "@/lib/playbooks-data";
import type { ExtendedLesson } from "./ai-automations-content-1";

// ==========================================
// MODULE 07: Tool 6 — Canva Magic Studio: Automated Design & Content Bundles
// ==========================================
export const MODULE_07_LESSONS: ExtendedLesson[] = [
  {
    id: "07-1",
    number: "7.1",
    title: "Speed Over Manual Design: How Bulk Creation Saves 10+ Hours a Week",
    duration: "10 min",
    summary:
      "Discover Canva Magic Studio and Bulk Create. Learn how businesses and creators create 30 to 50 cohesive, branded social media posts in 5 minutes using simple spreadsheets and AI templates.",
    learningObjective:
      "Understand the mechanics of Canva's Bulk Create feature and identify visual content creation bottlenecks in small businesses.",
    takeaway:
      "You do not need to be a professional graphic designer; Canva's AI templates and Bulk Create feature do the design heavy lifting for you.",
    slides: [
      {
        id: "s-0701-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 07 · LESSON 7.1",
        headline: "TOOL 6: CANVA MAGIC STUDIO",
        subheadline: "Automating visual design: generating 30 branded graphics in under 5 minutes.",
      },
      {
        id: "s-0701-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "Designing 30 social media graphics one by one takes hours of tedious resizing and copying.",
        subheadline: "With Canva Bulk Create, you design one master template and let AI generate an entire month of content instantly.",
      },
      {
        id: "s-0701-3",
        order: 3,
        type: "COMPARISON",
        headline: "Manual Design vs Bulk AI Generation",
        comparison: {
          leftTitle: "The Old Manual Design Way",
          leftItems: [
            "Open Photoshop or Figma from scratch",
            "Manually type quotes, tips, or stats 30 times",
            "Manually export 30 separate PNG files",
            "Time required: 4 to 6 hours every week",
          ],
          rightTitle: "The Canva Bulk Create Way",
          rightItems: [
            "Design 1 clean master brand template",
            "Connect a 30-row spreadsheet of tips or quotes",
            "Click 'Generate' to create all 30 slides in 10 seconds",
            "Time required: 5 minutes total",
          ],
        },
      },
      {
        id: "s-0701-4",
        order: 4,
        type: "FRAMEWORK",
        headline: "The 3 Magic Studio Features for Beginners",
        pillars: [
          {
            badge: "FEATURE 1",
            title: "Bulk Create",
            description: "Takes a table of text/quotes and maps it onto visual cards automatically.",
          },
          {
            badge: "FEATURE 2",
            title: "Magic Switch & Resize",
            description: "Turns an Instagram square post into a Story, LinkedIn banner, and flyer in one click.",
          },
          {
            badge: "FEATURE 3",
            title: "Magic Write",
            description: "Rewrites headlines, summarizes key takeaways, and generates tip lists on the canvas.",
          },
        ],
      },
      {
        id: "s-0701-5",
        order: 5,
        type: "RECAP",
        headline: "Key Takeaways",
        recapPoints: [
          "Small businesses struggle to maintain visual consistency across social media.",
          "Bulk Create turns text spreadsheets into polished visual carousels and graphics.",
          "You can sell monthly content packs ($350 - $750/mo) that take you under an hour to produce.",
        ],
      },
    ],
    writtenLesson: `# Speed Over Manual Design: How Bulk Creation Saves 10+ Hours a Week

Every local business owner, fitness coach, real estate agent, and marketing consultant knows they need to post regularly on LinkedIn, Instagram, and Facebook to stay top of mind.

Yet most of them post once a month—or not at all.

Why? Because sitting down in graphic design software to manually create 30 graphics, format fonts, center text boxes, and export files takes **4 to 6 hours of tedious work**.

With **Canva Magic Studio** and its built-in **Bulk Create** feature, this entire process is automated.

---

### What Is Canva Bulk Create?

Imagine you have a spreadsheet with 30 helpful business tips, quotes, or client testimonials:
- Column A: *Headline*
- Column B: *Tip Description*
- Column C: *Author or Category Tag*

Normally, you would have to open a design template, paste Tip #1, export it, paste Tip #2, export it, and repeat that thirty times.

With **Canva Bulk Create**, you design **one master template**. You tell Canva: *"Connect Column A to this headline box, and Column B to this body box."*
You click **Generate**, and Canva instantly creates a **30-page finished presentation or carousel** in 5 seconds flat!

---

### What Can You Produce for Clients?

1. **Monthly Educational Carousels:**
   30 branded, bite-sized industry tips for an accountant, doctor, or mortgage broker.
2. **Client Testimonial Showcase Packs:**
   Turning 20 customer reviews into beautiful social proof cards ready to post.
3. **Multi-Platform Visual Packs:**
   Using Canva's **Magic Switch** to instantly convert square Instagram posts into vertical Stories, Twitter/X cards, and LinkedIn slides in one click.

---

### The Service You Can Sell
You can approach busy professionals with a simple monthly deliverable:
> *"I will deliver 30 branded social media graphics and carousels customized to your colors, fonts, and niche every single month so your accounts stay active without you spending hours in Photoshop."*

Let’s see how to build this step-by-step in the next lesson.

---

### Practical Action Task
If you don't already have one, create a free account at [Canva.com](https://www.canva.com). Type *"Instagram Carousel"* or *"Quote Post"* in the search bar to see how professional graphic designers structure modern social media layouts.`,
  },
  {
    id: "07-2",
    number: "7.2",
    title: "Step-by-Step: Bulk Creating 30 Branded Social Posts in 5 Minutes",
    duration: "11 min",
    summary:
      "A complete walkthrough: generating 30 tips with AI, setting up a master template in Canva, connecting data with Bulk Create, and exporting a full month's content pack.",
    learningObjective:
      "Build a master template, link tabular text data, and bulk-generate 30 branded social graphics in Canva.",
    takeaway:
      "When you combine ChatGPT for generating 30 industry tips with Canva Bulk Create for visual layout, you can create a month of content in under 15 minutes.",
    slides: [
      {
        id: "s-0702-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 07 · LESSON 7.2",
        headline: "STEP-BY-STEP BULK CREATION",
        subheadline: "Generating an entire month of branded visual content in 4 simple steps.",
      },
      {
        id: "s-0702-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "The 4-Step Bulk Creation Flow",
        pillars: [
          {
            badge: "STEP 1: GENERATE TEXT",
            title: "Prompt ChatGPT / Claude",
            description: "Ask for a 2-column table with 30 tips: Column 1 = Short Hook, Column 2 = Practical Tip.",
          },
          {
            badge: "STEP 2: DESIGN TEMPLATE",
            title: "Pick 1 Clean Canva Layout",
            description: "Select a clean square (1080x1080) or vertical layout with a headline, body text, and handle.",
          },
          {
            badge: "STEP 3: CONNECT DATA",
            title: "Open 'Bulk Create' in Canva",
            description: "Click 'Enter data manually', paste your 30 rows, and right-click text boxes to 'Connect Data'.",
          },
          {
            badge: "STEP 4: GENERATE & EXPORT",
            title: "Click Generate (30 Pages)",
            description: "Canva instantly renders all 30 pages. Review briefly and download as high-res PNGs.",
          },
        ],
      },
      {
        id: "s-0702-3",
        order: 3,
        type: "SCENARIO",
        headline: "The Master Prompt for Content Tables",
        scenario: {
          situation: "You need 30 great tips for a local residential real estate agent.",
          instinctiveReaction: "Trying to write 30 tips by hand or asking for a long essay.",
          calibratedMove: "Prompt: 'Generate a 2-column table with 30 practical home-buying and selling tips. Column A: 3-5 word punchy hook. Column B: 1-2 sentence practical tip.'",
          whyItWorks: "Outputs clean tabular data ready to paste directly into Canva in one click.",
        },
      },
      {
        id: "s-0702-4",
        order: 4,
        type: "CHECKLIST",
        headline: "Quality Control Checklist",
        checklist: [
          { label: "Verify text does not overflow template boundaries on longer tips", passed: true, note: "Keep font size balanced" },
          { label: "Ensure client logo and social handle (@handle) appear on every slide", passed: true, note: "Protects brand recognition" },
          { label: "Check contrast: dark text on light backgrounds for easy mobile reading", passed: true, note: "Optimizes feed engagement" },
        ],
      },
      {
        id: "s-0702-5",
        order: 5,
        type: "RECAP",
        headline: "Implementation Summary",
        recapPoints: [
          "Bulk Create turns hours of manual graphic design into an automated process.",
          "Works with quotes, facts, product highlights, and customer reviews.",
          "You now have the capability to produce high-volume visual assets on demand.",
        ],
      },
    ],
    writtenLesson: `# Step-by-Step: Bulk Creating 30 Branded Social Posts in 5 Minutes

In this lesson, we will execute the entire **AI + Canva Bulk Creation Workflow** together.

---

### Step 1: Generate Your 30 Content Rows with AI
Open ChatGPT or Claude and paste this prompt:

\`\`\`markdown
You are a senior social media strategist. 
Create a table with 30 punchy, high-value tips for [Industry: e.g., First-Time Homebuyers].

Output the result strictly as a 2-column table:
- Column 1: Short Hook (3 to 6 words)
- Column 2: Practical Advice (15 to 25 words maximum)

Make the tips specific, practical, and beginner-friendly.
\`\`\`

Copy the resulting 30 rows to your clipboard.

---

### Step 2: Set Up Your Canva Master Template
1. In Canva, click **Create a design > Instagram Post (Square)** or **Instagram Story / Reel (Vertical)**.
2. Choose a clean, minimalist template from the left sidebar or design your own:
   - Add a bold text box for the **Hook** (e.g., Font: Montserrat Bold, 48pt).
   - Add a clean text box for the **Advice** (e.g., Font: Open Sans, 28pt).
   - Add the client's logo or social handle at the bottom (e.g., \`@ApexRealty\`).
   - Set the background to the client's brand color.

---

### Step 3: Open Bulk Create and Connect the Data
1. In the far left toolbar of Canva, scroll down and click on **Apps**.
2. Search for **"Bulk Create"** and click on it.
3. Click the button that says **"Enter data manually"**.
4. Click **Clear table** to remove the placeholder text.
5. Click in the top-left cell and press \`Ctrl+V\` (or \`Cmd+V\` on Mac) to paste your 30 rows directly from ChatGPT!
6. Click the blue **Done** button at the bottom.

---

### Step 4: Map the Data to Your Design
1. Right-click on your **Hook** text box on the canvas.
2. In the menu that appears, hover over **Connect data** and select the column name for the hook.
3. Right-click on your **Advice** text box.
4. Hover over **Connect data** and select the column name for the advice.
5. In the left sidebar, click **Continue**.
6. Canva will show checkmarks next to all 30 rows. Click **Generate 30 designs**!

A brand new tab will open in your browser containing **30 beautifully formatted, unique graphics** ready to download!

---

### Step 5: Export for the Client
1. Scroll through the 30 pages briefly to make sure no sentences wrapped awkwardly.
2. Click **Share > Download > PNG**.
3. Choose **All pages** and click **Download**.
4. Canva exports a neat zip file containing all 30 graphics numbered in order.

Total time taken: **less than 10 minutes**.

---

### Practical Action Task
Follow the steps above and generate 10 simple tips for any topic (e.g., "10 Time Management Hacks"). Use Canva Bulk Create to generate the 10 slides and export the images. Observe how fast and effortless the process is.`,
  },
  {
    id: "07-3",
    number: "7.3",
    title: "Real-World Service: Selling Monthly Content & Marketing Bundles",
    duration: "11 min",
    summary:
      "Package Canva bulk-creation into monthly recurring retainers for small businesses, marketing agencies, and busy solo consultants.",
    learningObjective:
      "Package, market, and deliver monthly visual content packs to clients who lack an in-house design team.",
    takeaway:
      "Small businesses don't want to hire a full-time graphic designer for $4,000/month; they will gladly pay you $400 to $800/month for a fresh monthly pack of branded graphics.",
    slides: [
      {
        id: "s-0701-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 07 · LESSON 7.3",
        headline: "SELLING CONTENT BUNDLES AS A SERVICE",
        subheadline: "How to offer monthly social media asset packs to busy local businesses.",
      },
      {
        id: "s-0701-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "Most business owners know they should post, but they run out of ideas after day 4.",
        subheadline: "When you hand them 30 ready-to-post graphics at the start of every month, you solve their consistency problem forever.",
      },
      {
        id: "s-0701-3",
        order: 3,
        type: "FRAMEWORK",
        headline: "The Monthly 'Content In A Box' Deliverable",
        pillars: [
          {
            badge: "ASSET 1",
            title: "30 Branded Static Graphics",
            description: "High-value tips, industry facts, myths vs facts, and client testimonials.",
          },
          {
            badge: "ASSET 2",
            title: "Matching Post Captions",
            description: "A simple Google Doc with 30 pre-written captions and hashtags ready to copy and paste.",
          },
          {
            badge: "ASSET 3",
            title: "Organized Shared Folder",
            description: "Delivered in a shared Google Drive folder categorized by week (Week 1, Week 2, etc.).",
          },
        ],
      },
      {
        id: "s-0701-4",
        order: 4,
        type: "COMPARISON",
        headline: "Retainer Packages",
        comparison: {
          leftTitle: "Starter Pack ($350/mo)",
          leftItems: [
            "15 branded graphics per month",
            "Delivered once per month",
            "1 round of visual revisions",
            "Takes you ~30 minutes to make",
          ],
          rightTitle: "Complete Omnichannel ($750/mo)",
          rightItems: [
            "30 branded graphics + matching captions",
            "Formatted for both Instagram & LinkedIn",
            "Includes 4 multi-slide carousels",
            "Takes you ~1.5 hours to make",
          ],
        },
      },
      {
        id: "s-0701-5",
        order: 5,
        type: "RECAP",
        headline: "Key Takeaways",
        recapPoints: [
          "Content bundles provide high perceived value with low time investment.",
          "Target accountants, dentists, financial advisors, and boutique realtors.",
          "Signing 4 monthly clients at $500/month = $2,000/month in recurring income.",
        ],
      },
    ],
    writtenLesson: `# Real-World Service: Selling Monthly Content & Marketing Bundles

A huge percentage of small businesses hire local marketing agencies and pay **$1,500 to $3,000 per month** just to have someone create social media graphics.

When you show up with a streamlined, specialized offer called the **"Monthly Content In A Box"**, you provide the exact same aesthetic quality at a fraction of the agency cost—while earning an incredible hourly return for yourself.

---

### The Anatomy of the Monthly Deliverable

Here is what you deliver to a client on the 25th of every month:
1. **A Shared Google Drive Folder** titled: \`[Client Name] - Social Content - [Month]\`.
2. Inside the folder are 4 subfolders:
   - \`Week 1 (Days 1 - 7)\`
   - \`Week 2 (Days 8 - 14)\`
   - \`Week 3 (Days 15 - 21)\`
   - \`Week 4 (Days 22 - 30)\`
3. Inside each subfolder:
   - The high-resolution PNG image ready to upload.
   - A simple text file with the recommended caption, question to ask followers, and 5 relevant hashtags.

---

### Why Clients Love This
- **Zero Thinking Required:** The business owner or their assistant simply opens the folder on Monday morning, grabs the image for Day 1, copies the caption, and hits post in 45 seconds.
- **Predictable Quality:** Their feed looks clean, cohesive, and professional, building instant authority with prospective customers.
- **Affordable Peace of Mind:** At **$400 to $650 per month**, this is far cheaper than hiring an agency or a full-time marketing employee.

---

### How to Pitch This Service

Reach out to businesses that have abandoned social media accounts (e.g., their last Instagram post was 4 months ago):

> *"Hi [Name]! I noticed you do incredible work at [Business Name], but your Instagram hasn’t had an update since June. I know how impossible it is to find time to design graphics when you’re busy with clients. I create monthly branded content packs (30 ready-to-post tips, customer spotlights, and graphics in your exact brand colors) so your page stays active on autopilot. Happy to design 3 free sample graphics with your logo if you’d like to see how they look!"*

When you send 3 free branded sample graphics that look clean and modern, **the client can immediately visualize their social media looking professional.**

---

### Practical Action Task
Pick one local business (e.g., a local accounting firm or gym). Using ChatGPT and Canva Bulk Create, generate **3 sample branded graphics** with their name and colors. Save them to a folder—you can use them as a personalized outreach example.`,
  },
  {
    id: "07-4",
    number: "7.4",
    title: "Brand Consistency Rules, Free vs Pro Features, and Your Action Task",
    duration: "10 min",
    summary:
      "Learn how to manage fonts and colors with Canva Brand Kits, navigate Canva Free vs Pro requirements for commercial use, and complete your Module 7 action task.",
    learningObjective:
      "Maintain brand consistency across client assets and manage Canva tool capabilities efficiently.",
    takeaway:
      "Great design is not about flashy illustrations; it is about consistency. Using the client's exact brand colors and clean typography builds instant trust.",
    slides: [
      {
        id: "s-0704-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 07 · LESSON 7.4",
        headline: "BRAND CONSISTENCY & ACTION TASK",
        subheadline: "Professional design hygiene and completing your visual asset demo.",
      },
      {
        id: "s-0704-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "The 3 Brand Consistency Rules",
        pillars: [
          {
            badge: "RULE 1: MAXIMUM 2 FONTS",
            title: "Keep Typography Clean",
            description: "One bold font for headlines (e.g. Montserrat, Playfair) and one clean font for body text (e.g. Open Sans, Inter).",
          },
          {
            badge: "RULE 2: THE 60-30-10 RULE",
            title: "Color Balance",
            description: "60% dominant neutral (white or dark gray), 30% brand color, and 10% vibrant accent color for highlights.",
          },
          {
            badge: "RULE 3: HIGH CONTRAST",
            title: "Readability First",
            description: "Never put medium-gray text on a light-gray background; ensure text is readable on a smartphone in sunlight.",
          },
        ],
      },
      {
        id: "s-0704-3",
        order: 3,
        type: "CHECKLIST",
        headline: "Canva Free vs Canva Pro Guide",
        checklist: [
          { label: "Canva Free includes basic Bulk Create and thousands of free templates", passed: true, note: "Zero software cost to start" },
          { label: "Canva Pro ($12.99/mo) unlocks Brand Kits and Magic Switch resizing", passed: true, note: "Well worth it once you have 1 paying client" },
          { label: "Commercial use is fully allowed for graphics you create for clients", passed: true, note: "100% legal for client services" },
        ],
      },
      {
        id: "s-0704-4",
        order: 4,
        type: "RECAP",
        headline: "Module 7 Wrap-Up",
        recapPoints: [
          "Canva Bulk Create is an incredible time-saving asset for any digital service business.",
          "You can now produce high-volume social content and presentation decks in minutes.",
          "Next up: Tool 7 — Perplexity & Research AI, for automated market intelligence and lead lists.",
        ],
      },
    ],
    writtenLesson: `# Brand Consistency Rules, Free vs Pro Features, and Your Action Task

To ensure your Canva content bundles look like they were designed by a high-end agency rather than an amateur, adhere to these simple **Brand Consistency Rules**.

---

### The Three Rules of Professional Social Design

#### 1. Stick to Two Fonts Maximum
Amateurs use 5 different decorative fonts on the same graphic. Professionals use two:
- **Font A (Headline / Hook):** A strong, legible font (e.g., *Montserrat, Poppins, League Spartan, or Playfair Display*).
- **Font B (Body Text):** An ultra-readable sans-serif font (e.g., *Inter, Open Sans, or Roboto*).

#### 2. The 60-30-10 Color Rule
- **60% Dominant Base:** Clean off-white, light cream, or deep charcoal.
- **30% Secondary Brand Color:** The client's primary brand color (e.g., navy blue or forest green).
- **10% Accent Color:** A pop of contrasting color (e.g., gold or coral) used sparingly to underline an important word.

#### 3. Leave Breathing Room (Whitespace)
Never crowd text all the way to the edges of the square. Leave at least **15% padding** around the borders so the graphic feels spacious and premium.

---

### Canva Free vs Canva Pro
- **Canva Free:** You can access Bulk Create and thousands of free templates without paying anything.
- **Canva Pro ($12.99 / month):** Unlocks **Brand Kits** (saving client logos and exact hex color codes for 1-click access), premium stock photography, transparent PNG background removal, and **Magic Switch** (1-click resizing from Instagram square to Instagram Story).
- *Recommendation: Start on the free plan. Upgrade to Pro only after you sign your first paying client.*

---

### Your Practical Action Task for Module 7
1. Open Canva and create a **30-Day Social Content Pack** for any niche (e.g., Real Estate, Fitness, or Freelancing).
2. Use ChatGPT to generate 15 or 30 tips in a table format.
3. Use Bulk Create to render all 15 or 30 slides into a single Canva document.
4. Download the first 3 slides and add them to your portfolio folder. You now have a tangible, visually stunning graphic design sample ready to show prospective clients!`,
  },
];

// ==========================================
// MODULE 08: Tool 7 — Perplexity & Research AI: Fast Market Research & Lead Lists
// ==========================================
export const MODULE_08_LESSONS: ExtendedLesson[] = [
  {
    id: "08-1",
    number: "8.1",
    title: "Turning Internet Research into High-Value Business Intelligence",
    duration: "10 min",
    summary:
      "Explore Perplexity AI and modern conversational search tools. Learn how to gather market insights, analyze competitors, and build prospect lists in minutes instead of days.",
    learningObjective:
      "Use conversational AI search engines with direct citations to conduct rapid market intelligence and competitor analysis.",
    takeaway:
      "Google gives you 10 blue links that you have to click and read manually; Perplexity gives you the exact answer with verified source citations in 5 seconds.",
    slides: [
      {
        id: "s-0801-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 08 · LESSON 8.1",
        headline: "TOOL 7: PERPLEXITY & RESEARCH AI",
        subheadline: "Accelerating market research, competitor analysis, and lead list building with conversational search.",
      },
      {
        id: "s-0801-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "Knowledge is power, but finding knowledge on Google has become slow and cluttered with ads.",
        subheadline: "Perplexity AI searches the live web and synthesizes clean, cited executive summaries in seconds.",
      },
      {
        id: "s-0801-3",
        order: 3,
        type: "COMPARISON",
        headline: "Traditional Google Search vs Perplexity AI",
        comparison: {
          leftTitle: "Traditional Google Search",
          leftItems: [
            "Top 4 results are sponsored paid advertisements",
            "Must click into 10 SEO blog posts filled with fluff",
            "Manually copy-pasting numbers into a spreadsheet",
            "Time required: 2 to 3 hours per research topic",
          ],
          rightTitle: "Perplexity AI Search",
          rightItems: [
            "Asks questions in plain conversational English",
            "Synthesizes real-time web data with clickable citations",
            "Formats findings directly into clean comparison tables",
            "Time required: 2 to 3 minutes",
          ],
        },
      },
      {
        id: "s-0801-4",
        order: 4,
        type: "FRAMEWORK",
        headline: "3 Business Applications for Research AI",
        pillars: [
          {
            badge: "APP 1",
            title: "Competitor Price Audits",
            description: "Compare pricing, packages, and offerings across 5 competitors in a target city.",
          },
          {
            badge: "APP 2",
            title: "Local Prospect Sourcing",
            description: "Find local businesses with missing websites, slow response times, or weak social media presence.",
          },
          {
            badge: "APP 3",
            title: "Executive Topic Briefings",
            description: "Compile a 1-page briefing on industry trends, new regulations, or market statistics.",
          },
        ],
      },
      {
        id: "s-0801-5",
        order: 5,
        type: "RECAP",
        headline: "Key Takeaways",
        recapPoints: [
          "Perplexity AI combines web search with language intelligence.",
          "Every claim is backed by clickable source footnotes, ensuring accuracy.",
          "You can sell research briefings and curated prospect lists for $250 to $600 each.",
        ],
      },
    ],
    writtenLesson: `# Turning Internet Research into High-Value Business Intelligence

When business founders, sales managers, or consultants need to enter a new market, launch a product, or find prospective clients, they need **accurate information**.

Historically, doing this research meant spending hours clicking through Google search results, dodging annoying ads, reading through SEO fluff articles, and manually copy-pasting notes into a document.

With **Perplexity AI** (perplexity.ai), research has undergone a massive revolution.

---

### What Is Perplexity AI?

Perplexity is an **AI-powered conversational search engine**.
Unlike regular ChatGPT (which relies on static training data unless web browsing is activated), Perplexity searches the live internet in real time for every single question you ask.

It reads across dozens of authoritative sources and delivers a **complete, structured answer with numbered citations** linking directly to the original web pages.

---

### What Makes This a Commercial Opportunity?

Busy business owners frequently need answers to questions like:
- *"Who are the top 5 commercial roofing contractors in Denver, what warranties do they offer, and what are their Google review ratings?"*
- *"What are the new medical privacy compliance rules for clinics in our state for 2026?"*
- *"Find 20 boutique wedding planning agencies in Southern California with their owner's name and contact email."*

A business owner does not have 5 hours to sit at a desk gathering this data.
If you can deliver a **Clean Market Intelligence Dossier** or a **Curated Prospect List** in a neat PDF or spreadsheet, they will gladly pay you **$250 to $600** for the deliverable.

---

### How to Access Perplexity for Free
- Go to [Perplexity.ai](https://www.perplexity.ai).
- You can use it **completely free with zero account required** (though creating a free account allows you to save your search history in dedicated collections).
- The free plan offers unlimited standard searches, which is more than enough to conduct deep business research and lead sourcing!

---

### Practical Action Task
Visit Perplexity.ai and ask:
*"What are the 5 most common operational problems faced by independent dental clinics, and what software tools do they typically use to manage appointments?"*
Observe how Perplexity synthesizes a structured breakdown with cited sources in under 10 seconds.`,
  },
  {
    id: "08-2",
    number: "8.2",
    title: "Step-by-Step: Compiling a Verified 50-Prospect Lead List with AI",
    duration: "11 min",
    summary:
      "A complete walkthrough to sourcing high-value sales prospects. Combine Perplexity with Google Sheets to compile a clean 50-company prospect list with names, websites, and verified contact info.",
    learningObjective:
      "Execute structured research queries to compile, format, and verify targeted B2B lead lists.",
    takeaway:
      "Every sales rep and business owner needs leads. Delivering a clean, verified list of 50 targeted prospects is one of the fastest services to sell.",
    slides: [
      {
        id: "s-0802-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 08 · LESSON 8.2",
        headline: "STEP-BY-STEP LEAD SOURCING",
        subheadline: "Compiling a verified 50-prospect business list in 4 simple steps.",
      },
      {
        id: "s-0802-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "The 4-Step Lead Sourcing Blueprint",
        pillars: [
          {
            badge: "STEP 1: DEFINE ICP",
            title: "Target Profile",
            description: "Define the exact business type and city (e.g., 'Residential Solar Installers in Phoenix, AZ').",
          },
          {
            badge: "STEP 2: RESEARCH QUERY",
            title: "Run Perplexity Search",
            description: "Ask for a table with Company Name, Website, Owner/Manager, Phone, and Review Score.",
          },
          {
            badge: "STEP 3: SPREADSHEET SYNC",
            title: "Export to Google Sheets",
            description: "Format into a clean, sortable spreadsheet with clickable website links.",
          },
          {
            badge: "STEP 4: SPOT-CHECK",
            title: "Verify 5 Random Entries",
            description: "Click 5 websites manually to confirm phone numbers and emails are active.",
          },
        ],
      },
      {
        id: "s-0802-3",
        order: 3,
        type: "SCENARIO",
        headline: "The Power Query Formula",
        scenario: {
          situation: "You need a list of independent accounting firms in Austin, Texas.",
          instinctiveReaction: "Searching 'Austin accountants' on Google and copying one by one.",
          calibratedMove: "In Perplexity: 'Find 15 independent CPA and accounting firms in Austin, Texas. Output a table with: Firm Name, Website URL, Managing Partner / Founder Name, Phone Number, and Primary Specialization.'",
          whyItWorks: "Delivers a structured, copy-paste ready table in 15 seconds.",
        },
      },
      {
        id: "s-0802-4",
        order: 4,
        type: "CHECKLIST",
        headline: "Data Cleanliness Checklist",
        checklist: [
          { label: "Format all phone numbers consistently: (XXX) XXX-XXXX", passed: true, note: "Looks professional in CRM" },
          { label: "Check website URLs to ensure there are no dead 404 links", passed: true, note: "Guarantees data quality" },
          { label: "Add a 'Notes / Observation' column identifying potential pain points", passed: true, note: "High added value for client" },
        ],
      },
      {
        id: "s-0802-5",
        order: 5,
        type: "RECAP",
        headline: "Implementation Summary",
        recapPoints: [
          "Curated lead lists are the lifeblood of outbound sales teams.",
          "Combining AI search with quick human verification creates a premium deliverable.",
          "Charge $300 to $600 for a clean list of 50 to 100 targeted prospects.",
        ],
      },
    ],
    writtenLesson: `# Step-by-Step: Compiling a Verified 50-Prospect Lead List with AI

Sales teams, agency founders, and local business owners are constantly looking for **new prospects to contact**.

However, buying massive commercial email databases (like ZoomInfo or Apollo) can cost **$5,000 to $10,000 per year**, and 40% of the data is outdated or invalid.

By using Perplexity AI combined with quick human spot-checking, you can build **custom, highly-targeted lead lists** that clients will eagerly purchase.

---

### Step 1: Define the Client's Target Profile (ICP)
Before running a search, define three specific filters:
1. **Industry:** e.g., *HVAC Contractors*, *Cosmetic Dentists*, or *Boutique Digital Marketing Agencies*.
2. **Geography:** e.g., *Dallas-Fort Worth Metro*, *Greater Manchester*, or *Toronto Area*.
3. **Company Size / Focus:** e.g., *Independent businesses with 5 to 50 employees*.

---

### Step 2: Use the Perplexity Structured Table Prompt
In Perplexity.ai, use this structured query:

\`\`\`markdown
Find 15 independent [Industry: e.g. Roofing and Siding Contractors] located in [City: e.g. Columbus, Ohio].

Output the results strictly in a structured table with the following columns:
1. Business Name
2. Website URL
3. Owner or General Manager Name (if publicly listed)
4. Office Phone Number
5. Google Star Rating & Review Count
6. Primary Service Specialization

Include source links for each business.
\`\`\`

Perplexity will crawl the live web, cross-reference local directories, business filings, and company websites, and format the results into a clean table.
To get 50 leads, simply ask: *"Find 15 more in the surrounding suburbs of Dublin and Westerville"* and repeat!

---

### Step 3: Format in Google Sheets
1. Open a blank Google Sheet titled \`[Client Name] - Targeted Prospect List\`.
2. Paste the data into the sheet.
3. Clean up the formatting:
   - Bold the header row and set a clean background color.
   - Format phone numbers consistently.
   - Add a column on the far right titled: \`Opportunity Notes\` (e.g., *"Website does not have an instant quote form"* or *"Active on Instagram but no DM automation"*).

---

### Step 4: The 5-Minute Verification Spot-Check
Never deliver a list without checking it yourself:
- Click on 5 random website links to confirm they load properly.
- Call 1 or 2 phone numbers to verify they reach the actual business.
This takes 5 minutes and ensures your deliverable has **99% accuracy**, justifying your premium fee.

---

### Practical Action Task
Run a query in Perplexity for 10 local businesses in a specific trade in your city (e.g., *"10 commercial landscaping companies in [Your City]"*). Paste them into a Google Sheet and format it cleanly.`,
  },
  {
    id: "08-3",
    number: "8.3",
    title: "Real-World Service: Providing Competitor Summaries & Sourced Lead Dossiers",
    duration: "10 min",
    summary:
      "Learn how to sell competitor intelligence dossiers and targeted B2B lead lists to sales leaders, agency founders, and local business owners.",
    learningObjective:
      "Package research deliverables into executive briefings and high-converting prospect lists.",
    takeaway:
      "A raw spreadsheet is commodity data; an organized executive summary comparing 5 competitors' pricing and services is high-value intelligence.",
    slides: [
      {
        id: "s-0801-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 08 · LESSON 8.3",
        headline: "SELLING RESEARCH & LEADS",
        subheadline: "Packaging competitor audits and targeted lead dossiers for $300 to $750.",
      },
      {
        id: "s-0801-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "Every business owner is curious about what their local competitors are charging and offering.",
        subheadline: "When you hand them a clean competitor comparison matrix, they read every single word.",
      },
      {
        id: "s-0801-3",
        order: 3,
        type: "FRAMEWORK",
        headline: "The Competitor Intelligence Package",
        pillars: [
          {
            badge: "SECTION A",
            title: "The Pricing & Package Matrix",
            description: "Direct comparison of 5 local rivals: pricing tiers, guarantees, and service inclusions.",
          },
          {
            badge: "SECTION B",
            title: "Customer Review Sentiment",
            description: "Analysis of 1-star and 5-star reviews revealing what customers complain about most.",
          },
          {
            badge: "SECTION C",
            title: "The Opportunity Gap",
            description: "A 3-bullet summary identifying where the client can differentiate and win more customers.",
          },
        ],
      },
      {
        id: "s-0801-4",
        order: 4,
        type: "COMPARISON",
        headline: "Service Pricing Options",
        comparison: {
          leftTitle: "Targeted Lead List ($300 - $500)",
          leftItems: [
            "50 verified local business prospects",
            "Owner names, phone numbers, website links",
            "Delivered in a clean Google Sheet",
            "Takes you ~45 minutes to compile and verify",
          ],
          rightTitle: "Complete Competitor Dossier ($600 - $900)",
          rightItems: [
            "Deep audit of 5 direct competitors",
            "Pricing breakdown + customer sentiment",
            "Formatted as a branded 4-page PDF briefing",
            "Takes you ~1.5 hours to compile",
          ],
        },
      },
      {
        id: "s-0801-5",
        order: 5,
        type: "RECAP",
        headline: "Key Takeaways",
        recapPoints: [
          "Research deliverables provide immediate, actionable insight to decision makers.",
          "Target new business owners, expanding agencies, and sales managers.",
          "Selling two research dossiers a month generates an extra $1,200 to $1,800.",
        ],
      },
    ],
    writtenLesson: `# Real-World Service: Providing Competitor Summaries & Sourced Lead Dossiers

When entrepreneurs and small business owners launch a new service or enter a new neighborhood, their first challenge is understanding the local competitive landscape:
- *What are other local providers charging?*
- *What packages and guarantees do they offer?*
- *What do customers complain about in their negative Google reviews?*

Gathering this information by hand requires hours of visiting websites, reading through hundreds of reviews, and organizing messy notes.

By using Perplexity AI, you can generate a **Complete Competitor Intelligence Dossier** in an afternoon and sell it for **$450 to $800**.

---

### What to Include in a Competitor Intelligence Dossier

Deliver the final product as a clean, branded **4-page PDF document** (which you can assemble in Canva using a clean report template):

#### Page 1: Executive Overview
- A 1-paragraph summary of the competitive landscape in their city.
- A visual comparison table comparing the client against 4 top competitors (Google star rating, years in business, service radius, and price positioning).

#### Page 2: Pricing & Package Breakdown
- Detailed notes on what each competitor includes in their starter, intermediate, and premium packages.
- Special promotions, financing options, or seasonal discounts currently active.

#### Page 3: Customer Sentiment Analysis
Ask Perplexity:
> *"Analyze the negative 1-star and 2-star reviews for [Competitor Name]. What are the top 3 recurring complaints customers mention?"*
- Examples: *"Customers frequently complain that they don't show up on time"* or *"Customer service never answers the phone on weekends."*
- This gives your client immediate ammunition to highlight their own reliability!

#### Page 4: Strategic Recommendations
Three concrete opportunities for your client:
- E.g., *"None of your top 3 competitors offer weekend service. Advertising 'Weekend Appointments Available' will capture high-intent callers."*

---

### How to Find Buyers for This Service
1. **New Businesses:** Search business registration registries, local Chamber of Commerce directories, or LinkedIn for founders who recently launched a company.
2. **Expanding Businesses:** Reach out to established businesses opening a second location in an adjacent city.
3. Send a brief message:
   > *"Hi [Name]! Congrats on opening [Business Name]. I specialize in compiling comprehensive local competitor dossiers (analyzing pricing, competitor review complaints, and service gaps). I put together a 1-page sample comparing 2 of your main local competitors in [City]. Would you like me to send it over for free?"*

When they see how valuable the sample is, offering to complete the full 5-competitor dossier for **$500** is an easy yes.

---

### Practical Action Task
Pick two competitors in any field you know (e.g., two local gym franchises or two software tools). Use Perplexity to compare their pricing, pros, and cons in a simple 1-paragraph summary.`,
  },
  {
    id: "08-4",
    number: "8.4",
    title: "Verifying Facts, Free Search Techniques, and Your Action Task",
    duration: "10 min",
    summary:
      "Learn how to fact-check AI search results quickly, use Perplexity's Focus filters to source exact data, and complete your Module 8 action task.",
    learningObjective:
      "Apply fact-checking protocols to AI research outputs and use search filters to extract accurate business data.",
    takeaway:
      "AI accelerates your research by 10x; your human role is verifying that phone numbers and websites are active before handing the deliverable to a client.",
    slides: [
      {
        id: "s-0804-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 08 · LESSON 8.4",
        headline: "FACT-CHECKING & SEARCH FILTERS",
        subheadline: "Ensuring 100% data reliability and mastering Perplexity's built-in search modes.",
      },
      {
        id: "s-0804-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "The 3 Perplexity Focus Filters",
        pillars: [
          {
            badge: "FILTER 1: WEB",
            title: "Standard Web Search",
            description: "Searches the entire public internet for broad news, reviews, and company websites.",
          },
          {
            badge: "FILTER 2: WRITING",
            title: "Creative Synthesis",
            description: "Generates text and cleans up formatting without searching live websites.",
          },
          {
            badge: "FILTER 3: ACADEMIC / FINANCE",
            title: "Scholarly & Industry Data",
            description: "Restricts search strictly to published industry reports, regulatory filings, and papers.",
          },
        ],
      },
      {
        id: "s-0804-3",
        order: 3,
        type: "CHECKLIST",
        headline: "The 3-Minute Verification Protocol",
        checklist: [
          { label: "Click citation footnote [1] or [2] to verify source legitimacy", passed: true, note: "Confirms original URL is trustworthy" },
          { label: "Check publication date of sources to ensure pricing is current", passed: true, note: "Avoids 3-year-old outdated pricing" },
          { label: "Scan for any placeholder text before exporting final spreadsheet", passed: true, note: "Maintains professional polish" },
        ],
      },
      {
        id: "s-0804-4",
        order: 4,
        type: "RECAP",
        headline: "Module 8 Wrap-Up",
        recapPoints: [
          "You now have a complete, practical toolkit of 7 distinct AI automation tools.",
          "Every tool solves an everyday problem for real people, creators, or small businesses.",
          "Next: Module 9 — The Client Acquisition & $10,000 Scaling Blueprint.",
        ],
      },
    ],
    writtenLesson: `# Verifying Facts, Free Search Techniques, and Your Action Task

While Perplexity AI is vastly more reliable than standard chatbots because it cites live websites, smart automation consultants always apply a **3-minute verification protocol** to ensure client deliverables are bulletproof.

---

### The Three Perplexity Focus Filters
When you click inside the Perplexity search box, you will see a small button labeled **Focus**. This allows you to restrict where the AI searches:

1. **Web (Default):**
   Searches the entire open internet. Use this for general local business research, finding websites, and finding phone numbers.
2. **Academic:**
   Searches published research papers and industry studies. Excellent if you are compiling a formal whitepaper or health/medical briefing for a clinic client.
3. **Writing Mode:**
   Disables internet search and acts like standard Claude or ChatGPT. Great for formatting raw tables, rewriting notes, and polishing draft text.

---

### The 3-Minute Fact-Checking Protocol
Before you send a lead list or competitor report to a paying client:
1. **Check the Footnote Links:**
   Click on 2 or 3 of the numbered citations in Perplexity’s response. Make sure the link leads to an active, official company page rather than an outdated directory from 2019.
2. **Verify Pricing Dates:**
   If you are reporting a competitor’s package price, ensure the article or webpage was updated in the last 12 months.
3. **Sanitize Your Spreadsheet:**
   Ensure company names don't contain stray formatting symbols (like \`[1]\` or asterisks). A quick find-and-replace in Google Sheets cleans this up in 10 seconds.

---

### You Now Possess All 7 Core Tools!
Take a moment to appreciate what you have learned across Modules 2 through 8:
1. **Make.com:** Connecting forms, email, and spreadsheets visually on autopilot.
2. **Custom GPTs:** Building specialized AI assistants trained on client guidelines.
3. **ManyChat:** Automating Instagram and Facebook DMs to capture leads 24/7.
4. **Notion AI:** Centralizing messy business operations into sleek company hubs.
5. **Opus Clip & Descript:** Repurposing long videos into polished vertical short clips.
6. **Canva Magic Studio:** Bulk-creating 30 branded social media graphics in minutes.
7. **Perplexity AI:** Sourcing targeted prospect lists and competitor intelligence dossiers.

Every single one of these 7 tools can be sold as an independent service for **$300 to $1,000+**.
In our final module, we will learn how to package these tools, land your first paying clients, and scale toward the $10,000 milestone!

---

### Your Practical Action Task for Module 8
Compile a **Sample 10-Lead Prospect List** in Google Sheets using Perplexity for any industry in your city. Ensure all 10 entries have a Name, Website, Phone, and 1-sentence note. Save this sheet in your portfolio folder!`,
  },
];

// ==========================================
// MODULE 09: Landing Clients, Packaging Services & Building to $10,000+
// ==========================================
export const MODULE_09_LESSONS: ExtendedLesson[] = [
  {
    id: "09-1",
    number: "9.1",
    title: "Packaging Simple Offers: The 'Fix One Headache' Service Model",
    duration: "11 min",
    summary:
      "Learn how to create offers that clients say yes to immediately. Package your skills around fixing one specific, painful headache rather than selling vague 'AI consulting'.",
    learningObjective:
      "Structure high-converting, single-outcome service offers with transparent pricing and clear deliverables.",
    takeaway:
      "Vague offers like 'I do AI automation' get ignored; specific offers like 'I make sure you never miss an inquiry on your website' get booked.",
    slides: [
      {
        id: "s-0901-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 09 · LESSON 9.1",
        headline: "PACKAGING SIMPLE OFFERS",
        subheadline: "The 'Fix One Headache' model: creating offers clients understand and buy immediately.",
      },
      {
        id: "s-0901-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "Nobody wants to buy 'AI Consulting'. They want their phone to ping when a customer asks for a quote.",
        subheadline: "Sell the finished destination, not the plane engine.",
      },
      {
        id: "s-0901-3",
        order: 3,
        type: "FRAMEWORK",
        headline: "The 3 Pillars of an Irresistible Starter Offer",
        pillars: [
          {
            badge: "PILLAR 1",
            title: "One Clear Outcome",
            description: "Solve one specific problem (e.g., '10 ready-to-post short video clips delivered every Monday').",
          },
          {
            badge: "PILLAR 2",
            title: "Zero Technical Effort for Client",
            description: "They don't have to learn software; you handle the setup and hand them the result.",
          },
          {
            badge: "PILLAR 3",
            title: "Transparent Flat Pricing",
            description: "A fixed price ($350 - $750) so they don't fear runaway hourly consulting bills.",
          },
        ],
      },
      {
        id: "s-0901-4",
        order: 4,
        type: "COMPARISON",
        headline: "Vague Pitch vs 'Fix One Headache' Pitch",
        comparison: {
          leftTitle: "The Vague Pitch (Ignored)",
          leftItems: [
            "'I'm an AI automation specialist'",
            "'I can optimize your business processes'",
            "'Let's have a 30-minute discovery call'",
            "Client has no idea what you actually do",
          ],
          rightTitle: "Fix One Headache Pitch (Hired)",
          rightItems: [
            "'I set up instant text alerts for quote requests'",
            "'You get an alert on your phone in 5 seconds'",
            "'Flat $450 setup, finished in 48 hours'",
            "Client immediately understands the value",
          ],
        },
      },
      {
        id: "s-0901-5",
        order: 5,
        type: "RECAP",
        headline: "Key Takeaways",
        recapPoints: [
          "Pick one tool from this Playbook that you enjoyed most and master it first.",
          "Package it into a single clear service with a fixed price.",
          "Simplicity builds trust; complexity causes hesitation.",
        ],
      },
    ],
    writtenLesson: `# Packaging Simple Offers: The 'Fix One Headache' Service Model

The biggest reason new freelancers struggle to land clients is that their offer is too vague.

They create a profile on Upwork, LinkedIn, or Instagram that says:
> *"Freelance AI Automation Specialist | Helping businesses grow with AI solutions."*

When a prospective client reads that, they think: *"That sounds nice, but I have no idea what that means for my plumbing company."*

To win clients quickly, you must adopt the **"Fix One Headache" Service Model**.

---

### The Three Rules of the "Fix One Headache" Model

1. **Target One Specific Annoyance:**
   Instead of promising to revolutionize their entire business, offer to fix one specific task they hate doing.
2. **Name the Concrete Deliverable:**
   Tell them exactly what they will receive in their hands (e.g., *a Google Sheet with 50 verified leads*, *16 edited vertical video clips*, or *an instant text alert on their phone*).
3. **Offer Fixed, Transparent Pricing:**
   Business owners hate open-ended hourly billing because they fear a surprise $2,000 invoice. A flat price (e.g., *"Flat $450, fully tested and delivered in 48 hours"*) removes all fear.

---

### 5 Ready-to-Sell Service Packages from This Playbook

Pick the one you feel most confident with:

#### Offer 1: The "Speed-to-Lead" Setup (Tool 1: Make.com)
- **The Headache:** Taking hours to respond to website inquiries.
- **The Deliverable:** Connect their website form to an instant SMS alert on the owner's phone + Google Sheet backup.
- **Price:** $350 – $500 one-off setup.

#### Offer 2: The "Instagram Lead Engine" (Tool 3: ManyChat)
- **The Headache:** Posting Reels that get views but zero customer bookings.
- **The Deliverable:** Set up an automated "Comment KEYWORD to get link" DM funnel that delivers their price list and collects emails.
- **Price:** $400 setup + $99/month maintenance.

#### Offer 3: The "Weekly Video Repurposing Retainer" (Tool 5: Opus Clip)
- **The Headache:** Having long podcasts or webinars that nobody watches on social media.
- **The Deliverable:** 16 captioned, vertical video clips delivered every month in a shared Google Drive folder.
- **Price:** $600 – $900 per month.

#### Offer 4: The "Monthly Content in a Box" (Tool 6: Canva)
- **The Headache:** Staring at a blank screen wondering what to post on social media.
- **The Deliverable:** 30 branded graphics + pre-written captions delivered on the 25th of every month.
- **Price:** $400 – $650 per month.

#### Offer 5: The "Tailored Assistant Package" (Tool 2: Custom GPTs)
- **The Headache:** Spending hours drafting the same proposals, listings, or customer emails.
- **The Deliverable:** A private custom AI assistant loaded with their past work and brand tone.
- **Price:** $300 – $500 one-off.

---

### Practical Action Task
Select **one** of the five offers above as your primary service to start with. Write out a 1-sentence description of what problem it fixes and what your flat introductory price will be.`,
  },
  {
    id: "09-2",
    number: "09.2",
    title: "Where to Find Your First 3 Clients Without Cold Calling or Paid Ads",
    duration: "11 min",
    summary:
      "Learn beginner-friendly client acquisition strategies: leveraging existing personal networks, the 'Help a Friend' audit, local business footwork, and freelancing platforms.",
    learningObjective:
      "Identify and contact 10 warm prospective clients using non-intrusive, value-first outreach methods.",
    takeaway:
      "You do not need to cold-call strangers or spend money on ads; your first 3 clients are almost always within 2 degrees of people you already know.",
    slides: [
      {
        id: "s-0902-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 09 · LESSON 9.2",
        headline: "LANDING YOUR FIRST 3 CLIENTS",
        subheadline: "Value-first client acquisition methods with zero cold calling and zero ad spend.",
      },
      {
        id: "s-0902-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "The 3 Warmest Channels to Start With",
        pillars: [
          {
            badge: "CHANNEL 1",
            title: "Your Existing Network",
            description: "Friends, family, previous employers, and acquaintances who own businesses or work in busy roles.",
          },
          {
            badge: "CHANNEL 2",
            title: "Local Businesses You Patronize",
            description: "The gym you visit, your dentist, your local coffee roaster, or an accountant you know.",
          },
          {
            badge: "CHANNEL 3",
            title: "Freelance Marketplaces",
            description: "Upwork and Fiverr jobs where clients are actively searching for 'Make.com', 'ManyChat', or 'Video Repurposing'.",
          },
        ],
      },
      {
        id: "s-0902-3",
        order: 3,
        type: "SCENARIO",
        headline: "The Warm Outreach Message",
        scenario: {
          situation: "Messaging an acquaintance who owns an independent fitness studio or consulting firm.",
          instinctiveReaction: "Sending a hard pitch asking them to hire you for $1,000.",
          calibratedMove: "Say: 'Hey [Name]! I'm expanding my services into simple business automations. I'd love to set up an automated lead notification for your studio for free/at a heavy discount in exchange for honest feedback and a review. Would that be helpful?'",
          whyItWorks: "Zero pressure, builds goodwill, and creates your first real case study.",
        },
      },
      {
        id: "s-0902-4",
        order: 4,
        type: "CHECKLIST",
        headline: "Client Outreach Rules",
        checklist: [
          { label: "Reach out to 5 people you know who run or work in a business", passed: true, note: "The fastest path to client #1" },
          { label: "Offer a risk-free trial or 100% money-back guarantee for your first project", passed: true, note: "Eliminates client hesitation" },
          { label: "Always ask for a 2-sentence written review upon completion", passed: true, note: "Testimonials make client #4 and #5 easy" },
        ],
      },
      {
        id: "s-0902-5",
        order: 5,
        type: "RECAP",
        headline: "Key Takeaways",
        recapPoints: [
          "Focus on landing Client #1, not Client #100.",
          "Overdeliver for your first clients—they will naturally refer their business friends.",
          "Confidence comes from taking action, not waiting for perfection.",
        ],
      },
    ],
    writtenLesson: `# Where to Find Your First 3 Clients Without Cold Calling or Paid Ads

When you are starting from zero, the thought of finding paying clients can feel intimidating. Many people imagine having to cold-call hundreds of strangers or spend thousands of dollars on Facebook ads.

You do **not** need to do either of those things.

Your first three clients will almost certainly come from one of three simple, beginner-friendly channels:

---

### Channel 1: The Warm Network Announcement
You already know dozens of people: former colleagues, friends, family members, alumni, and local acquaintances. Many of them own businesses, manage teams, or know someone who does.

Post a simple, friendly update on your personal LinkedIn, Facebook, or Instagram:
> *"Hey friends! Over the past few months, I’ve been building practical AI automation workflows that help busy business owners save 5 to 10 hours a week (things like automated customer inquiry alerts, instant social media lead funnels, and video repurposing). I’m taking on 2 small businesses this month to set up an automated workflow at a heavy discount in exchange for feedback and a short review. If you or someone you know runs a business and feels overwhelmed by repetitive admin work, shoot me a DM!"*

This simple post frequently yields 2 or 3 immediate conversations because people prefer doing business with someone they know and trust.

---

### Channel 2: The Businesses You Already Visit
Think about where you spend your money every month:
- Your dentist or chiropractor
- Your local barber or hair salon
- The independent mechanic who fixes your car
- A local accountant who prepared your taxes

You are already an established, paying customer! Next time you visit, strike up a casual conversation:
> *"Hey Dave, I love coming here. I noticed on your website that when people ask for an appointment, it just sends an email. Have you ever thought about setting up an instant text notification so you can reply while they're still interested? I actually build those setups for local businesses. Happy to set one up for you in an hour if you'd like!"*

Because they already know your face, their guard is down and they will gladly listen.

---

### Channel 3: Inbound Freelance Marketplaces (Upwork)
On platforms like [Upwork.com](https://www.upwork.com), thousands of clients post jobs every single day explicitly searching for:
- *"Need someone to connect Google Sheets to Make.com"*
- *"ManyChat Instagram automation setup"*
- *"Repurpose my podcast into 10 TikTok shorts with Opus Clip"*
- *"Create a Notion client portal"*

These people **already have their credit card out and are actively looking to hire**.
- Filter for jobs posted in the last 24 hours.
- Submit a short 4-sentence proposal explaining that you can deliver the project in 24 hours.
- Include a link to the 60-second Loom video you recorded in earlier modules!

---

### Practical Action Task
Write down a list of **10 people or local businesses you know**. Send 3 of them the warm announcement message today.`,
  },
  {
    id: "09-3",
    number: "9.3",
    title: "How to Price Confidently: One-Off Setup Fees vs Monthly Retainers",
    duration: "11 min",
    summary:
      "Master the economics of freelance pricing. Learn when to charge fixed setup fees, how to introduce monthly maintenance retainers, and how to raise your rates as your portfolio grows.",
    learningObjective:
      "Calculate pricing tiers confidently and transition one-time project clients into recurring monthly retainers.",
    takeaway:
      "Never charge by the hour; charge a fixed fee based on the value of the completed solution. An hour of your work that saves 20 hours of their work is worth hundreds of dollars.",
    slides: [
      {
        id: "s-0903-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 09 · LESSON 9.3",
        headline: "PRICING CONFIDENTLY",
        subheadline: "Why hourly billing punishes speed, and how to structure recurring retainers.",
      },
      {
        id: "s-0903-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "If you charge $25/hour, the faster and better you get, the less money you make.",
        subheadline: "Always charge flat project fees ($350 - $1,000) or monthly retainers ($300 - $600/month).",
      },
      {
        id: "s-0903-3",
        order: 3,
        type: "FRAMEWORK",
        headline: "The 3-Tier Rate Progression",
        pillars: [
          {
            badge: "TIER 1: STARTER (Clients 1-3)",
            title: "Portfolio Building",
            description: "$250 - $450 fixed fee. Your primary goal is getting a delighted client and a glowing written testimonial.",
          },
          {
            badge: "TIER 2: ESTABLISHED (Clients 4-8)",
            title: "Standard Market Rate",
            description: "$600 - $900 fixed fee. You have real examples to show, eliminating client hesitation.",
          },
          {
            badge: "TIER 3: PREMIUM (Clients 9+)",
            title: "High-Value Bundles & Retainers",
            description: "$1,200+ for multi-tool setups or $400-$800/month for ongoing content and workflow management.",
          },
        ],
      },
      {
        id: "s-0903-4",
        order: 4,
        type: "SCENARIO",
        headline: "How to Pitch the Monthly Retainer",
        scenario: {
          situation: "You just finished setting up a Make.com or ManyChat flow for a client, and they love it.",
          instinctiveReaction: "Saying 'Thanks! Let me know if you need anything else' and leaving.",
          calibratedMove: "Say: 'Now that your system is live, software updates or new promotions will happen. For $149/month, I will monitor your system, update your links, and ensure you never miss a lead. Would you like me to keep that running for you?'",
          whyItWorks: "Most business owners hate maintaining software and will happily say yes.",
        },
      },
      {
        id: "s-0903-5",
        order: 5,
        type: "RECAP",
        headline: "Key Takeaways",
        recapPoints: [
          "Fixed pricing protects both you and the client.",
          "Aim to convert at least 1 out of every 3 project clients into a monthly retainer.",
          "5 retainers at $400/month = $2,000/month in reliable base revenue.",
        ],
      },
    ],
    writtenLesson: `# How to Price Confidently: One-Off Setup Fees vs Monthly Retainers

One of the biggest hurdles for beginners is overcoming **pricing insecurity**:
> *"Am I really allowed to charge $500 for something that took me two hours?"*

The answer is an emphatic **YES**.

When a homeowner hires an emergency plumber to fix a leaking pipe, and the plumber uses a wrench to tighten a valve in 15 minutes, the homeowner gladly pays $250. They are not paying for 15 minutes of wrench turning; they are paying for **the knowledge of which valve to turn to stop their house from flooding.**

The exact same principle applies to AI automation. You are being paid for the result: **a business that runs smoother and captures more customers.**

---

### Why You Must Never Charge Hourly
- If you charge $30/hour and an automation takes you 2 hours, you make $60.
- If you become an expert and build the exact same automation in 45 minutes, you only make $22.50!
- Hourly billing **penalizes you for being fast and skilled**.

Always quote a **Flat Project Fee**:
- *"For this complete lead capture setup, the total fee is $450."*
- Whether it takes you 1 hour or 3 hours, the client knows their exact cost, and you are rewarded for efficiency.

---

### The Natural Bridge to Monthly Retainers

The holy grail of freelancing is **Monthly Recurring Revenue (MRR)**.
When you finish a project, never just say goodbye. Offer a **Monthly Peace-of-Mind Retainer**:

> *"Sarah, your new automation is fully tested and live! Going forward, software tools occasionally update, and you’ll want to change your promo codes or add seasonal offers. For a simple $149/month, I’ll keep an eye on your workflow, run weekly health checks, and handle any updates you need so you never have to think about it. Would you like me to add that on?"*

If 1 out of every 2 clients accepts:
- Client 1: $149/mo
- Client 2: $149/mo
- Client 3: $250/mo
- Client 4: $400/mo (includes monthly video clips)

Within a few months, you have **$1,000 to $2,500 every single month** hitting your bank account before you even get out of bed.

---

### Practical Action Task
Write down your personal pricing menu on a clean sheet of paper:
- Starter Setup: $350
- Advanced Setup: $650
- Monthly Care Retainer: $149/month
Keep this next to your computer whenever you speak with a prospective client.`,
  },
  {
    id: "09-4",
    number: "09.4",
    title: "The Client Handover Checklist: Delivering Work That Gets Referrals",
    duration: "11 min",
    summary:
      "The master handover protocol: clean documentation, recording a 3-minute video walkthrough, requesting written testimonials, and generating natural word-of-mouth client referrals.",
    learningObjective:
      "Execute a professional client delivery and handover that maximizes client satisfaction and generates organic word-of-mouth referrals.",
    takeaway:
      "The best marketing in the world is a delighted client who tells their fellow business owner friends about you.",
    slides: [
      {
        id: "s-0904-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 09 · LESSON 9.4",
        headline: "THE CLIENT HANDOVER CHECKLIST",
        subheadline: "Delivering work with extreme polish to unlock glowing reviews and effortless referrals.",
      },
      {
        id: "s-0904-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "The 4 Handover Deliverables",
        pillars: [
          {
            badge: "STEP 1",
            title: "Live End-to-End Test",
            description: "Run one final test in front of the client (or send a screen recording proving it works).",
          },
          {
            badge: "STEP 2",
            title: "3-Minute Video Guide",
            description: "Record a short Loom video showing where their data lives and how to view new inquiries.",
          },
          {
            badge: "STEP 3",
            title: "1-Page Cheat Sheet",
            description: "A clean Google Doc summarizing links, logins, and emergency contact instructions.",
          },
          {
            badge: "STEP 4",
            title: "The Review & Referral Ask",
            description: "Ask for a 2-sentence review and inquire if they know 1 other business owner with a similar pain.",
          },
        ],
      },
      {
        id: "s-0904-3",
        order: 3,
        type: "SCENARIO",
        headline: "The Magical Referral Question",
        scenario: {
          situation: "The client emails you: 'Wow, this is amazing! We just got our first automated lead and it worked perfectly.'",
          instinctiveReaction: "Replying 'Glad you like it!' and closing the email.",
          calibratedMove: "Reply: 'So glad to hear that, John! I really enjoyed working with you. Quick question: who are 1 or 2 other business owners in your network who are swamped with admin work that I should reach out to?'",
          whyItWorks: "When someone is delighted, they are excited to recommend great people to their friends.",
        },
      },
      {
        id: "s-0904-4",
        order: 4,
        type: "CHECKLIST",
        headline: "Final Playbook Completion Checklist",
        checklist: [
          { label: "You know how to use 7 distinct beginner-friendly AI automation tools", passed: true, note: "Make, GPTs, ManyChat, Notion, Opus, Canva, Perplexity" },
          { label: "You have your 60-second Loom portfolio demo recorded", passed: true, note: "Ready to share with prospective clients" },
          { label: "You know how to price fixed fees and monthly retainers", passed: true, note: "No more trading time for low hourly rates" },
          { label: "You have a clear, realistic roadmap to cross the $10,000 milestone", passed: true, note: "10 clients at $1,000 or 20 at $500" },
        ],
      },
      {
        id: "s-0904-5",
        order: 5,
        type: "RECAP",
        headline: "Congratulations!",
        recapPoints: [
          "You have completed the entire 7 AI Automation Tools Playbook.",
          "The skills you learned are in high demand right now across every industry.",
          "Pick one tool, find one client, and build your first automation this week!",
        ],
      },
    ],
    writtenLesson: `# The Client Handover Checklist: Delivering Work That Gets Referrals

Congratulations! You have reached the final lesson of **7 AI Automation Tools That Could Make You $10,000+**.

Throughout this Playbook, you have acquired practical, accessible, no-code skills across 7 major tools:
1. **Make.com:** Visual workflow automation.
2. **Custom GPTs:** Specialized AI assistants.
3. **ManyChat:** Social media lead capture.
4. **Notion AI:** Centralized company workspaces.
5. **Opus Clip & Descript:** Video repurposing.
6. **Canva Magic Studio:** Automated visual content packs.
7. **Perplexity AI:** Sourced research and lead lists.

Now, let’s review the final operational step: **The Client Handover Protocol**.

---

### The Professional Handover Package

When you finish setting up an automation for a client, do not just send a one-line email saying *"It's done."*

Deliver a clean **Handover Dossier**:

1. **The Proof of Life:**
   Send a screenshot or a 30-second screen recording showing a live test submission successfully passing through their new system.
2. **The 3-Minute "How It Works" Video:**
   Record your screen on Loom:
   - *"Hi John! Here is where your new leads appear in Google Sheets."*
   - *"Here is how to check your phone alerts."*
   - *"If you ever need to change your notification email, here is the exact button to click."*
3. **The 1-Page Summary Sheet:**
   A simple Google Doc containing:
   - Account links (Make.com, ManyChat, etc.)
   - Who owns the accounts (their email)
   - Your contact email for questions

This level of care makes your client feel like they hired a high-end corporate consulting firm.

---

### The 2-Step Review & Referral Engine

Within 7 days of delivering a working system, send this simple message:

> *"Hi [Name], hope you’re having a great week! Just wanted to check in and make sure your new automation has been running smoothly for you. If you’ve been happy with the setup, would you mind writing 2 short sentences sharing your experience? I’d love to feature you on my portfolio."*

Once they send their positive review, reply immediately with the **Referral Ask**:

> *"Thank you so much, [Name]! That means the world to me. Quick question: who are one or two other business owners or colleagues in your circle who are feeling overwhelmed by repetitive admin work that I should connect with?"*

Over **40% of satisfied clients** will happily introduce you to another business owner in their network. This is how successful freelancers build thriving, six-figure businesses without ever spending a dime on advertising.

---

### Your Next Step: Take Action This Week
Knowledge is only potential power. Real results come from taking action:
1. Pick **one tool** from this Playbook that resonated with you most.
2. Build one working automation for yourself or a friend this weekend.
3. Show it to 3 people.
4. Close your first $350 starter project.

You have the tools, the blueprints, and the roadmap. Now go build your first automation!`,
  },
];
