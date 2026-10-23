import { Lesson, Module } from "@/lib/playbooks-data";
import type { ExtendedLesson } from "./ai-automations-content-1";

// ==========================================
// MODULE 04: Tool 3 — ManyChat: Automated DMs & Lead Funnels on Instagram
// ==========================================
export const MODULE_04_LESSONS: ExtendedLesson[] = [
  {
    id: "04-1",
    number: "4.1",
    title: "Why Automated DMs Convert 5x Better Than Links in Bio",
    duration: "10 min",
    summary:
      "Understand the mechanics of social media conversion. Learn why asking followers to click a link in bio loses 80% of potential leads, and how direct message automation captures them instantly.",
    learningObjective:
      "Explain the commercial advantages of comment-to-DM automation over traditional link-in-bio methods for creators and businesses.",
    takeaway:
      "Never make people leave Instagram to hunt for a link in a profile bio; send the resource directly to their private inbox while their attention is highest.",
    slides: [
      {
        id: "s-0401-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 04 · LESSON 4.1",
        headline: "TOOL 3: MANYCHAT DM AUTOMATION",
        subheadline: "Turning social media comments into instant leads, sales, and conversations 24/7.",
      },
      {
        id: "s-0401-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "Over 85% of people who read 'link in bio' never actually leave the post to click it.",
        subheadline: "When you tell them 'Comment GUIDE and I'll DM it to you', you eliminate the friction entirely.",
      },
      {
        id: "s-0401-3",
        order: 3,
        type: "COMPARISON",
        headline: "Link in Bio vs Automated DM Funnel",
        comparison: {
          leftTitle: "Traditional Link in Bio",
          leftItems: [
            "User must leave their feed to find the profile",
            "Scroll through a cluttered list of 10 links",
            "Fill out a lengthy form on a slow mobile browser",
            "Typical conversion rate: 1% to 3%",
          ],
          rightTitle: "ManyChat DM Automation",
          rightItems: [
            "User types one single word in the comments ('GUIDE')",
            "They instantly receive a private DM within 3 seconds",
            "A friendly automated conversation collects their email",
            "Typical conversion rate: 15% to 35%",
          ],
        },
      },
      {
        id: "s-0401-4",
        order: 4,
        type: "FRAMEWORK",
        headline: "The 3 Win-Win Benefits of DM Automation",
        pillars: [
          {
            badge: "BENEFIT 1",
            title: "Algorithm Boost",
            description: "Hundreds of comments on a post tell Instagram the content is engaging, multiplying organic reach.",
          },
          {
            badge: "BENEFIT 2",
            title: "Private Conversation",
            description: "Moves a public casual viewer into a 1-on-1 private messaging channel where relationships form.",
          },
          {
            badge: "BENEFIT 3",
            title: "Automated Email Capture",
            description: "ManyChat collects and verifies email addresses inside the DM and sends them directly to a spreadsheet.",
          },
        ],
      },
      {
        id: "s-0401-5",
        order: 5,
        type: "RECAP",
        headline: "Key Takeaways",
        recapPoints: [
          "ManyChat is an official Meta Business Partner (100% compliant with Instagram rules).",
          "Every creator, coach, clinic, and influencer wants more leads from their social media.",
          "Building simple comment-to-DM funnels is one of the easiest services to sell.",
        ],
      },
    ],
    writtenLesson: `# Why Automated DMs Convert 5x Better Than Links in Bio

If you spend any time on Instagram, LinkedIn, or Facebook, you have likely seen top creators and brands posting videos with captions like:
> *"Comment 'CHECKLIST' below and I’ll send you the complete PDF guide right now!"*

Within minutes, hundreds of people comment the keyword, and each of them receives an automated direct message containing the download link.

This is powered by **ManyChat**, an official Meta Business Partner tool that automates direct messages, lead capture, and customer support.

---

### The Friction Problem: Why "Link in Bio" Is Broken

For years, the standard advice on Instagram was: *"Click the link in my bio to get the resource."*
Here is what actually happens when someone reads that:
1. They are enjoying their feed and don't want to leave the post.
2. If they do click into the creator's profile, they are confronted with a Linktree page displaying 12 different buttons.
3. They click the wrong button, get impatient waiting for an external website to load on their mobile connection, and close the browser.

Result: **Over 85% of interested people give up before ever entering their email.**

---

### Why Comment-to-DM Automations Win Every Time

When you use ManyChat, the entire experience changes:
1. **Zero Friction for the User:**
   The follower simply comments one word (e.g., \`GUIDE\` or \`RECIPE\`). That takes half a second and requires zero effort.
2. **The Algorithm Loves It:**
   When an Instagram Reel or post receives 200 comments in the first hour, the Instagram algorithm assumes the post is wildly popular and shows it to thousands of new people!
3. **Instant Private Message:**
   The user's phone immediately buzzes with a private direct message:
   > *"Hey Sarah! Thanks for your comment. Here is your free 7-Day Guide link: [Link]. By the way, what is the best email to send future updates to?"*
4. **Natural Conversation:**
   The user replies with their email inside Instagram. ManyChat saves the email to a Google Sheet automatically!

---

### Why Businesses Will Pay You to Set This Up
Most business owners have heard of ManyChat, but they find the flow builder intimidating or simply don't have the 2 hours to configure the triggers.
When you offer:
> *"I will set up an automatic comment-to-DM funnel on your Instagram so that every person who comments on your posts receives your free guide, quote link, or menu instantly, and their emails get saved to your list."*

...they immediately see the value. You can easily charge **$350 to $750** for a complete setup that takes under an hour to deploy.

---

### Practical Action Task
Open Instagram and browse 5 posts from well-known business coaches, podcasters, or marketing influencers. Look for a post where the caption asks people to comment a specific keyword. Comment the keyword yourself and observe the direct message you receive. Notice the timing, tone, and buttons!`,
  },
  {
    id: "04-2",
    number: "4.2",
    title: "Step-by-Step: Setting Up a 'Comment KEYWORD to Get Link' Flow",
    duration: "11 min",
    summary:
      "A complete, click-by-click walkthrough for beginners. Connect ManyChat to an Instagram Business account and build a fully automated comment-triggered lead funnel.",
    learningObjective:
      "Build, test, and deploy a live Instagram comment-to-DM automation flow using ManyChat's visual canvas.",
    takeaway:
      "Setting up a ManyChat flow is like drawing a flowchart. When a user types your keyword, the flow branches automatically to deliver the link and collect their email.",
    slides: [
      {
        id: "s-0402-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 04 · LESSON 4.2",
        headline: "BUILDING YOUR FIRST DM FUNNEL",
        subheadline: "A visual, step-by-step walkthrough to creating a comment-to-DM automation in ManyChat.",
      },
      {
        id: "s-0402-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "The 4-Step ManyChat Blueprint",
        pillars: [
          {
            badge: "STEP 1",
            title: "Connect Instagram",
            description: "Log into ManyChat and link your Instagram Professional/Creator account via Facebook.",
          },
          {
            badge: "STEP 2",
            title: "Set the Comment Trigger",
            description: "Select 'User comments on your Post or Reel' and specify your keyword (e.g. 'START').",
          },
          {
            badge: "STEP 3",
            title: "Draft the DM Message",
            description: "Type the friendly greeting, add a clickable button linking to the PDF or booking calendar.",
          },
          {
            badge: "STEP 4",
            title: "Public Comment Reply",
            description: "Add an automated public reply: 'Sent you a DM! Check your inbox 😊' to encourage others.",
          },
        ],
      },
      {
        id: "s-0402-3",
        order: 3,
        type: "SCENARIO",
        headline: "Avoiding the Spam Filter Trap",
        scenario: {
          situation: "100 people comment 'START' at the exact same time on a viral post.",
          instinctiveReaction: "Sending the exact same robotic public comment reply 100 times in a row.",
          calibratedMove: "In ManyChat, configure 3 to 5 alternating public replies: 'Sent to your DMs!', 'Check your inbox! ✨', 'Just messaged you the link!'.",
          whyItWorks: "Randomizing replies looks completely natural and protects the client's account.",
        },
      },
      {
        id: "s-0402-4",
        order: 4,
        type: "CHECKLIST",
        headline: "Prerequisites Checklist",
        checklist: [
          { label: "Instagram account must be set to 'Professional' or 'Creator' (free in IG settings)", passed: true, note: "Personal accounts cannot connect to automation tools" },
          { label: "Connected to a Facebook Page (Meta requirement)", passed: true, note: "Takes 2 minutes to create a free blank page" },
          { label: "Tested with a friend or secondary account before publishing", passed: true, note: "Confirms button clicks work" },
        ],
      },
      {
        id: "s-0402-5",
        order: 5,
        type: "RECAP",
        headline: "Implementation Summary",
        recapPoints: [
          "ManyChat's free plan allows up to 500 contacts, perfect for testing.",
          "Visual drag-and-drop builder makes connecting messages effortless.",
          "Always test the link inside the button to ensure the PDF or page opens smoothly.",
        ],
      },
    ],
    writtenLesson: `# Step-by-Step: Setting Up a 'Comment KEYWORD to Get Link' Flow

In this lesson, we will construct a live comment-to-DM automation flow using [ManyChat](https://manychat.com).

---

### Step 1: Create Your Free Account and Connect Instagram
1. Go to [ManyChat.com](https://manychat.com) and click **Get Started Free**.
2. Choose **Instagram** as your primary channel.
3. Follow the standard prompt to log into your Facebook account and select the Instagram account you wish to connect.
   *(Note: The Instagram account must be a free **Professional / Creator** account, which you can switch to anytime in Instagram's settings under "Account Type").*

---

### Step 2: Create a New Automation
1. In your ManyChat dashboard, click **Automations** in the left sidebar.
2. Click the blue **+ New Automation** button in the top right.
3. You will see several pre-made templates. Click on the one labeled:
   **"Convert your Instagram comments into sales"** (or click *Start from Scratch*).

---

### Step 3: Configure the Trigger
1. In the first box, select the trigger called **"User comments on your Post or Reel"**.
2. You can choose:
   - *Any Post or Reel* (great for an evergreen keyword like "HELP" or "MENU").
   - *A specific Post or Reel* (great for a campaign video).
3. Under **"Comments contain specific keywords"**, type your chosen word: e.g., \`GUIDE\`.
4. Click **Save**.

---

### Step 4: Configure the Public Comment Auto-Reply
Whenever someone comments, ManyChat can automatically reply to their public comment so other viewers see that the system is active:
1. Under **"Reply in comments"**, add 3 friendly variations:
   - *“Just sent it to your DMs! Check your inbox 😊”*
   - *“Sent you a message with the full link! ✨”*
   - *“Check your direct messages! Happy reading 👍”*
ManyChat will rotate between these three automatically so it looks completely natural.

---

### Step 5: Craft the Direct Message (The DM)
1. Click on the connected box labeled **"Send Message"**.
2. Type a warm, casual greeting:
   > *"Hey there! Thanks so much for your comment on our latest post. Here is your direct link to download the complete guide:"*
3. Below your text, click **+ Add Button**.
4. Label the button: \`📥 Open Guide PDF\`.
5. Paste the link to the client’s Google Drive file, website page, or Calendly booking link.

---

### Step 6: Test and Publish
1. Click the blue **Preview** button in the top right corner. ManyChat will send a live test message directly to your personal Instagram account so you can see it in real life!
2. Click the button to make sure it opens the link correctly.
3. Once satisfied, click the orange **Set Live** switch at the top right.

That’s it! Your Instagram automation is now running. Whenever anyone on Earth comments that keyword, they will receive their link in under 5 seconds.

---

### Practical Action Task
Set up a simple free ManyChat account and create a draft flow using a keyword like \`TEST\`. Send yourself a test preview message to experience the magic of receiving a DM directly on your phone.`,
  },
  {
    id: "04-3",
    number: "4.3",
    title: "Real-World Service: Setting Up Lead Funnels for Local Clinics & Creators",
    duration: "11 min",
    summary:
      "Learn how to sell ManyChat funnels to local clinics, beauty salons, personal trainers, and real estate agents who struggle to convert their social media followers into paying clients.",
    learningObjective:
      "Package, pitch, and sell automated social media lead capture funnels to local businesses and digital creators.",
    takeaway:
      "Businesses spend hours making Instagram Reels that get views but zero customers; ManyChat bridges the gap by turning casual views into phone numbers and appointments.",
    slides: [
      {
        id: "s-0401-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 04 · LESSON 4.3",
        headline: "SELLING DM FUNNELS TO BUSINESSES",
        subheadline: "Helping local clinics, salons, and creators turn casual followers into paying clients.",
      },
      {
        id: "s-0401-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "Followers and video views do not pay the rent. Collected email addresses and booked appointments do.",
        subheadline: "You are giving the business owner a simple engine that turns social media traffic into real revenue.",
      },
      {
        id: "s-0401-3",
        order: 3,
        type: "FRAMEWORK",
        headline: "3 Profitable Niches for ManyChat",
        pillars: [
          {
            badge: "NICHE 1",
            title: "Aesthetic Clinics & Salons",
            description: "Keyword: 'PRICING' -> Sends treatment menu, before/after photos, and direct WhatsApp booking link.",
          },
          {
            badge: "NICHE 2",
            title: "Fitness & Wellness Coaches",
            description: "Keyword: 'RECIPE' or 'PLAN' -> Delivers free PDF guide and captures verified email into spreadsheet.",
          },
          {
            badge: "NICHE 3",
            title: "Local Restaurants & Cafes",
            description: "Keyword: 'VIP' -> Delivers 15% off first visit coupon and invites them to their weekly specials list.",
          },
        ],
      },
      {
        id: "s-0401-4",
        order: 4,
        type: "COMPARISON",
        headline: "Service Packaging Options",
        comparison: {
          leftTitle: "Starter Funnel ($350 - $500)",
          leftItems: [
            "1 Keyword Automation (e.g. 'GUIDE')",
            "Delivers PDF or link in DM",
            "Rotated public comment replies",
            "Delivered in 24 to 48 hours",
          ],
          rightTitle: "Complete Social Lead System ($750 - $1,200)",
          rightItems: [
            "3 Keyword Funnels (Pricing, Freebie, Booking)",
            "Automated email & phone number collection",
            "Syncs contacts directly to Google Sheets via Make",
            "Includes monthly maintenance for $149/month",
          ],
        },
      },
      {
        id: "s-0401-5",
        order: 5,
        type: "RECAP",
        headline: "Key Takeaways",
        recapPoints: [
          "Target businesses that already post regularly on Instagram but have low engagement.",
          "Record a quick video on your phone showing a ManyChat flow working in real time.",
          "Offer to set up their first keyword for free for 7 days as a risk-free trial.",
        ],
      },
    ],
    writtenLesson: `# Real-World Service: Setting Up Lead Funnels for Local Clinics & Creators

One of the most common frustrations among small business owners and creators is:
> *"I post videos on Instagram every week, but nobody ever visits our website or books an appointment."*

They are suffering from **The Social Media Disconnect**: they have an audience watching their posts, but they have no simple, frictionless mechanism to turn that attention into customer contact details.

This is where you step in with a **Turnkey ManyChat Lead Funnel**.

---

### The Three Best Niches for This Service

#### 1. Medical Spas, Cosmetic Dentists & Salons
- *The Problem:* Potential clients see a transformation photo and wonder: *"How much does this cost? How do I book?"* But they don't want to call on the phone.
- *Your Automation:* Post caption: *"Comment 'PRICING' to see our full treatment menu and autumn specials."*
- *The Result:* ManyChat sends a direct message with their price list and a one-click button to book a consultation on their calendar.
- *The Value:* A single dental veneer or spa package can be worth $1,500+. One booking pays for your service 3 times over.

#### 2. Personal Trainers & Nutritionists
- *The Problem:* Coaches want to grow their email newsletter list, but putting a Linktree link in their bio yields only 1 or 2 sign-ups a week.
- *Your Automation:* Post caption: *"Comment 'MEALPLAN' and I'll send you my 7-day high-protein grocery guide."*
- *The Result:* ManyChat asks for their email inside the DM, sends the PDF link, and automatically saves the email address into their Google Sheet using Make.com!

#### 3. Real Estate Agents
- *The Problem:* Agents post a video tour of a beautiful home, but interested buyers scroll past without reaching out.
- *Your Automation:* Post caption: *"Comment 'TOUR' to see the full photo gallery, floor plan, and price for this home."*
- *The Result:* ManyChat instantly delivers the listing details and asks: *"Would you like to schedule an in-person walkthrough this weekend?"*

---

### How to Pitch This Without Sounding Salesy

Send this simple, friendly message to a business that is already posting video content on Instagram:

> *"Hi [Name]! Loved your recent video about [Topic]. I noticed a lot of people in the comments were asking questions about pricing/details. Have you ever considered setting up an automated keyword DM? When someone comments '[KEYWORD]', it sends them your full details in 3 seconds automatically so you don’t lose potential clients. I set these up for local businesses in about an hour. Happy to show you a quick 60-second video of how it works if you're curious!"*

This message is respectful, offers immediate value, and requires zero technical understanding from the client.

---

### Practical Action Task
Find 3 Instagram accounts of businesses in your town (e.g., a local boutique gym, a dermatologist, and a wedding venue). Look at their last 3 posts. What is one free resource, guide, or offer they could give away using a keyword automation?`,
  },
  {
    id: "04-4",
    number: "4.4",
    title: "Instagram Guidelines, Pricing Your Setup, and Your Action Task",
    duration: "11 min",
    summary:
      "Navigate Meta's 24-hour messaging rules safely, understand ManyChat's affordable pricing plans, and complete your Module 4 practical action task.",
    learningObjective:
      "Ensure full compliance with Instagram platform messaging rules and price ongoing DM maintenance services.",
    takeaway:
      "Meta has strict rules against unsolicited spam; ManyChat keeps you 100% safe as long as your automation only triggers when a user interacts first.",
    slides: [
      {
        id: "s-0404-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 04 · LESSON 4.4",
        headline: "COMPLIANCE, PRICING & BEST PRACTICES",
        subheadline: "Staying 100% compliant with Meta rules while delivering maximum client results.",
      },
      {
        id: "s-0404-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "The Golden Rule of Meta Messaging",
        pillars: [
          {
            badge: "RULE 1",
            title: "Interaction First",
            description: "Only send messages to people who comment or DM first. Never cold-message strangers automatically.",
          },
          {
            badge: "RULE 2",
            title: "The 24-Hour Window",
            description: "You have 24 hours from the user's interaction to respond and deliver the promised resource.",
          },
          {
            badge: "RULE 3",
            title: "No Deceptive Keywords",
            description: "If you promise a 'Free Guide', make sure the first button immediately delivers the promised guide.",
          },
        ],
      },
      {
        id: "s-0404-3",
        order: 3,
        type: "CHECKLIST",
        headline: "ManyChat Free vs Pro Pricing Guide",
        checklist: [
          { label: "Free Plan: Up to 500 contacts (perfect for learning and initial testing)", passed: true, note: "Zero cost to build your skills" },
          { label: "Pro Plan: $15/month starting tier (covers up to 500 active contacts)", passed: true, note: "Unlocks unlimited keywords & analytics" },
          { label: "Client pays the $15/mo directly; you charge your $350-$600 setup fee", passed: true, note: "Clean software boundary" },
        ],
      },
      {
        id: "s-0404-4",
        order: 4,
        type: "RECAP",
        headline: "Module 4 Wrap-Up",
        recapPoints: [
          "DM automation is one of the highest-converting marketing tools available today.",
          "Every business owner wants more qualified inquiries without spending all day in DMs.",
          "Next up: Tool 4 — Notion AI, where we organize company chaos into sleek operating hubs.",
        ],
      },
    ],
    writtenLesson: `# Instagram Guidelines, Pricing Your Setup, and Your Action Task

Before delivering ManyChat setups to paying clients, it is vital to understand **Meta’s official messaging guidelines** so your clients' accounts remain in good standing.

---

### Meta’s Official Rules (Made Simple)

Meta (the parent company of Instagram and Facebook) welcomes automation tools like ManyChat because ManyChat is an official partner. However, they enforce two clear boundaries:

1. **Permission-Based Only:**
   You must **never** use automation to send unsolicited cold messages to people who have never interacted with your account. ManyChat is designed strictly for inbound engagement: the user *must* comment, DM, or mention your account in a Story first.
2. **The 24-Hour Customer Window:**
   Once a user comments or sends a message, you have a **24-hour window** to send automated messages. After 24 hours, you cannot send further promotional messages unless they reply again. This is why you should always ask for their email address inside the initial DM flow so the business can stay in touch long-term!

---

### Understanding ManyChat's Low Pricing
- **Free Plan:** ManyChat offers a completely free plan that supports up to **500 subscribed contacts**. This includes basic Instagram automation, making it ideal for practicing and setting up your first portfolio tests.
- **Pro Plan:** Begins at only **$15 per month** for up to 500 contacts, unlocking advanced triggers, audio messages, and integration with email systems.
- *Just like Make.com, have the client sign up for their own ManyChat account and enter their credit card for the $15/month software fee.*

---

### How to Package Ongoing Monthly Retainers
Many businesses run new promotions, seasonal discounts, or weekly content themes. You can offer an ongoing **"Social DM Management Retainer"**:
- **Setup Fee:** $400 (Initial setup of account, 2 core keyword funnels, and testing).
- **Monthly Retainer:** $149/month.
- **What you do each month:**
  - Update keyword triggers for their latest weekly Reel or promotion.
  - Export new leads from ManyChat into their main customer spreadsheet.
  - Spend 30 minutes ensuring no messages got stuck.

With just 5 local clients paying you $149/month, you generate **$745/month in predictable, hands-off income** for about 3 hours of total monthly work.

---

### Your Practical Action Task for Module 4
1. Draft a 3-part DM flow on paper:
   - What keyword will people comment? (e.g. \`CHECKLIST\`)
   - What will the public comment reply say? (e.g. *"Sent it to your inbox! ✨"*)
   - What will the private DM say, and what will the button link to?
2. Write this out clearly. This 3-part blueprint is the exact proposal you will show prospective clients when pitching this service.`,
  },
];

// ==========================================
// MODULE 05: Tool 4 — Notion AI: Building Client Workspaces & Operations Hubs
// ==========================================
export const MODULE_05_LESSONS: ExtendedLesson[] = [
  {
    id: "05-1",
    number: "5.1",
    title: "The Small Business Organization Headache and How Notion Solves It",
    duration: "10 min",
    summary:
      "Explore the hidden operational chaos of small businesses: scattered notes, lost passwords, missing project files, and how Notion AI creates a unified business operating hub.",
    learningObjective:
      "Identify organizational bottlenecks in small business operations and understand how Notion AI centralizes projects, clients, and documents.",
    takeaway:
      "Small business owners lose hours every week simply hunting for files and notes. A clean, organized workspace is one of the highest-relief deliverables you can provide.",
    slides: [
      {
        id: "s-0501-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 05 · LESSON 5.1",
        headline: "TOOL 4: NOTION AI WORKSPACES",
        subheadline: "Transforming messy files, lost notes, and scattered emails into an all-in-one company hub.",
      },
      {
        id: "s-0501-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "Most small businesses are run on 14 scattered spreadsheets, sticky notes, and buried email chains.",
        subheadline: "When you build them a clean, all-in-one Notion operating hub, you bring calm to their daily chaos.",
      },
      {
        id: "s-0501-3",
        order: 3,
        type: "COMPARISON",
        headline: "Operational Chaos vs Centralized Notion Hub",
        comparison: {
          leftTitle: "The Messy Business Reality",
          leftItems: [
            "Client files in random desktop folders",
            "Project status tracked in messy group chats",
            "No standard onboarding checklist for new hires",
            "Owner constantly stressed trying to remember everything",
          ],
          rightTitle: "Clean Notion Operating System",
          rightItems: [
            "Every client has a dedicated 1-click dashboard",
            "Automated project status boards (Kanban)",
            "Standard Operating Procedures (SOPs) written with AI",
            "Team members know exactly what to do every morning",
          ],
        },
      },
      {
        id: "s-0501-4",
        order: 4,
        type: "FRAMEWORK",
        headline: "The 3 Superpowers of Notion AI",
        pillars: [
          {
            badge: "POWER 1",
            title: "Instant Summaries",
            description: "Automatically turns messy 1-hour meeting notes into 3 concise bullet points and action items.",
          },
          {
            badge: "POWER 2",
            title: "Autofill Databases",
            description: "Extracts key details (due dates, project risks, priority levels) into structured database properties.",
          },
          {
            badge: "POWER 3",
            title: "SOP Generator",
            description: "Turns rough bullet points from the owner into professional, polished company training manuals.",
          },
        ],
      },
      {
        id: "s-0501-5",
        order: 5,
        type: "RECAP",
        headline: "Key Takeaways",
        recapPoints: [
          "Notion is free, visual, and highly customizable.",
          "You can sell pre-made Notion templates as digital products or build custom hubs for clients.",
          "Small businesses and solo consultants will gladly pay $500 to $1,500 for a clean operating system.",
        ],
      },
    ],
    writtenLesson: `# The Small Business Organization Headache and How Notion Solves It

Ask any wedding photographer, boutique marketing agency owner, independent architect, or consultant what their biggest daily frustration is, and they will almost always say:
> *"I feel disorganized. My client files are in Google Drive, my tasks are on sticky notes, my communication is in WhatsApp, and I'm terrified something is going to slip through the cracks."*

Small businesses do not have the budget or technical skill to deploy complex enterprise systems like SAP or Salesforce. They need something visual, intuitive, and flexible.

This is why **Notion** (and **Notion AI**) has become the secret weapon of modern digital service providers.

---

### What Is Notion and Notion AI?

- **Notion:** A visual, all-in-one workspace where you can build custom dashboards, project trackers, client directories, and resource libraries as easily as typing on a piece of digital paper.
- **Notion AI:** A built-in assistant directly inside the workspace that can summarize meeting notes, draft standard operating procedures (SOPs), translate text, and automatically populate database properties with smart insights.

---

### Two Ways You Can Make Money with Notion

#### Model A: Selling Reusable Digital Templates ($50 – $150 each)
You build a beautiful, pre-configured workspace template for a specific niche once (e.g., *"The Ultimate Wedding Photographer Client Hub"* or *"The Freelance Content Creator Operating System"*).
You sell it as a downloadable digital template on Gumroad, Etsy, or your own site. When someone buys it, they click "Duplicate" and it copies directly into their free Notion account!
- Selling just 20 copies a month at $75 each = **$1,500/month in passive digital product income**.

#### Model B: Custom Business Setup Services ($600 – $1,500 per client)
You work directly with a local business or agency. You interview them for 45 minutes, understand their workflow, and build them a tailored, branded Notion workspace equipped with client portals, task trackers, and meeting note templates.
- Complete delivery takes 4 to 6 hours.
- 2 clients a month at $1,000 each = **$2,000/month in client service income**.

---

### Practical Action Task
If you don't already have one, create a free account at [Notion.so](https://notion.so). Browse Notion's official Template Gallery (under "Templates" in the left sidebar) and look at the "Freelance" and "Small Business" sections to see how structured workspaces look.`,
  },
  {
    id: "05-2",
    number: "5.2",
    title: "Step-by-Step: Building a Clean Client Project Hub with AI Summaries",
    duration: "11 min",
    summary:
      "A complete walkthrough to building a client operating hub in Notion: creating project databases, setting up Kanban boards, and configuring AI autofill summary fields.",
    learningObjective:
      "Build a structured Notion client management database equipped with automated AI summary and action-item properties.",
    takeaway:
      "Databases in Notion are not boring spreadsheets; they are visual, interactive cards that can be viewed as boards, calendars, or galleries with one click.",
    slides: [
      {
        id: "s-0502-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 05 · LESSON 5.2",
        headline: "BUILDING A CLIENT HUB IN NOTION",
        subheadline: "Creating an interactive project workspace with automated AI summary fields in 5 steps.",
      },
      {
        id: "s-0502-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "The 4 Essential Components of a Client Hub",
        pillars: [
          {
            badge: "COMPONENT 1",
            title: "Client Directory Database",
            description: "Table of active clients with contact info, contract value, and project status tags.",
          },
          {
            badge: "COMPONENT 2",
            title: "Visual Kanban Task Board",
            description: "Cards organized by: To Do, In Progress, Awaiting Review, and Completed.",
          },
          {
            badge: "COMPONENT 3",
            title: "Meeting Notes with AI Summary",
            description: "A notes template equipped with a 1-click AI button that generates action items from rough bullet points.",
          },
          {
            badge: "COMPONENT 4",
            title: "Deliverables & Links Vault",
            description: "A clean resource section storing final Google Drive folders, contracts, and invoices in one place.",
          },
        ],
      },
      {
        id: "s-0502-3",
        order: 3,
        type: "SCENARIO",
        headline: "How Notion AI Saves Meeting Time",
        scenario: {
          situation: "A business owner gets off a 45-minute phone call with messy notes typed in random shorthand.",
          instinctiveReaction: "Spending 20 minutes re-reading and organizing notes into a coherent email to the client.",
          calibratedMove: "Highlight the messy notes in Notion and press the AI button: 'Generate Action Items & Summary'.",
          whyItWorks: "In 5 seconds, Notion AI outputs a 3-bullet executive summary and a numbered list of next steps ready to send.",
        },
      },
      {
        id: "s-0502-4",
        order: 4,
        type: "CHECKLIST",
        headline: "Build Checklist",
        checklist: [
          { label: "Create a new blank page named 'Company Operating Hub'", passed: true, note: "The central home screen" },
          { label: "Add a database table for Projects with status tags", passed: true, note: "Active, On Hold, Done" },
          { label: "Add an 'AI Custom Autofill' property to summarize page contents", passed: true, note: "Generates automatic status preview" },
          { label: "Test the 1-click 'Share as Template' duplicate link", passed: true, note: "Enables instant client delivery" },
        ],
      },
      {
        id: "s-0502-5",
        order: 5,
        type: "RECAP",
        headline: "Build Summary",
        recapPoints: [
          "Notion makes software design feel like editing a document.",
          "AI autofill properties keep databases updated without manual typing.",
          "You can build and package complete company hubs in a single afternoon.",
        ],
      },
    ],
    writtenLesson: `# Step-by-Step: Building a Clean Client Project Hub with AI Summaries

Let’s build a clean, client-ready **Project Management Hub** in Notion. Follow these steps:

---

### Step 1: Create Your Master Page
1. In Notion, click **+ Add a page** in the left sidebar.
2. Title it: \`🏢 Client Project Hub\`.
3. Add a clean cover image and an icon (like a briefcase or folder) to give it a polished, professional look.

---

### Step 2: Create the Projects Database
1. On your page, type \`/table\` and select **Table view**.
2. Click **+ New database** and name it **"Active Client Projects"**.
3. Create 5 essential columns (properties):
   - **Project Name** (Title) — e.g., *"Apex Roofing Website Redesign"*
   - **Client Name** (Text or Person) — e.g., *"Sarah Jenkins"*
   - **Status** (Status property) — with options: \`Not Started\`, \`In Progress\`, \`Under Review\`, \`Completed\`.
   - **Due Date** (Date property)
   - **Contract Value** (Number property set to Currency) — e.g., \`$1,200\`

---

### Step 3: Add an AI Autofill Summary Column
This is the magic feature that makes the workspace feel high-tech:
1. Click the **+** button to add a new column to your table.
2. Scroll down to the **AI** section and choose **AI summary**.
3. Set the prompt: *"Summarize the current status and next deliverables of this project in 1 clear sentence."*
4. Whenever notes or tasks are added inside that project's page, Notion AI automatically reads them and updates the summary sentence in the table!

---

### Step 4: Create a Kanban Board View
Clients and business owners love visual cards:
1. At the top of your database, click **+ Add view**.
2. Select **Board**.
3. Under *Group by*, choose **Status**.
4. Now, your projects appear as clean draggable cards divided into columns (*To Do*, *In Progress*, *Done*). You can drag a card across columns just like Trello!

---

### Step 5: Build a Meeting Notes Template with Instant Action Items
1. Open any project card in your database.
2. In the body of the page, type \`/template\` and create a section titled **"Meeting Notes"**.
3. Add a built-in AI block: type \`/ai\` and select **Action items**.
4. Whenever the client or team pastes messy notes into the page, they simply click that button, and Notion AI instantly extracts every task with checkable boxes!

---

### Practical Action Task
Build this exact table in your personal Notion account with 2 sample projects. Test adding a note and using the AI summary feature. Once built, this page can serve as your master template to sell to clients.`,
  },
  {
    id: "05-3",
    number: "5.3",
    title: "Real-World Service: Selling Turnkey Business Operating Hubs",
    duration: "11 min",
    summary:
      "Learn how to sell custom Notion workspaces to small agencies, consultants, and service providers who are drowning in disorganization.",
    learningObjective:
      "Package, price, and deliver high-value Notion operating system setups for service businesses.",
    takeaway:
      "When you organize a company's projects, files, and onboarding into one beautiful hub, you eliminate hundreds of hours of team confusion.",
    slides: [
      {
        id: "s-0501-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 05 · LESSON 5.3",
        headline: "SELLING NOTION HUBS AS A SERVICE",
        subheadline: "How to package custom business workspaces for $600 to $1,500 per setup.",
      },
      {
        id: "s-0501-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "Consultants and small agency owners will happily pay $1,000 for someone to organize their company.",
        subheadline: "They know they need a better system, but they never have the 10 hours of uninterrupted time to build it themselves.",
      },
      {
        id: "s-0501-3",
        order: 3,
        type: "FRAMEWORK",
        headline: "The 3 Deliverables of an Operating Hub",
        pillars: [
          {
            badge: "MODULE A",
            title: "Client & Project Pipeline",
            description: "Track all active deals, project milestones, invoices, and deadlines on one visual dashboard.",
          },
          {
            badge: "MODULE B",
            title: "Team SOP & Wiki Center",
            description: "Store all company training guides, passwords, and standard operating procedures.",
          },
          {
            badge: "MODULE C",
            title: "Client Portal Pages",
            description: "Private 1-page hubs shared with the client so they can see project progress without sending 10 emails a week.",
          },
        ],
      },
      {
        id: "s-0501-4",
        order: 4,
        type: "COMPARISON",
        headline: "Pricing Tiers for Notion Services",
        comparison: {
          leftTitle: "Starter Setup ($500 - $750)",
          leftItems: [
            "Project & Task Tracker setup",
            "Client directory database",
            "Basic branded visual styling",
            "1-hour team training recorded video",
          ],
          rightTitle: "Complete Agency OS ($1,200 - $2,000)",
          rightItems: [
            "Full company workspace (Sales + Projects + SOPs)",
            "Automated Make.com form sync",
            "Custom client-facing portal templates",
            "Live 60-minute staff training walkthrough call",
          ],
        },
      },
      {
        id: "s-0501-5",
        order: 5,
        type: "RECAP",
        headline: "Key Takeaways",
        recapPoints: [
          "Target boutique creative agencies, marketing freelancers, architects, and business coaches.",
          "Show them a screen recording of your clean demo hub—they will immediately want their company to look like that.",
          "Delivering two $1,000 workspace setups a month puts you well on your way to five figures.",
        ],
      },
    ],
    writtenLesson: `# Real-World Service: Selling Turnkey Business Operating Hubs

Many freelancers and business owners spend their days frantically searching through browser tabs, email threads, and Google Drive folders. They know they need an organized system, but every time they think about setting one up, client work gets in the way.

By offering a **Turnkey Business Operating Hub**, you provide them with instant clarity and structure.

---

### The Anatomy of What You Sell

When you sell a complete Notion Operating System, you are delivering a branded package consisting of three interconnected hubs:

#### 1. The Project & Client Pipeline
- A unified database where every project has a card showing the deadline, assigned team member, contract value, and current stage.
- Kanban boards, calendar views, and financial revenue trackers all linked together.

#### 2. The Company SOP & Training Wiki
- Standard Operating Procedures (SOPs) for how the business operates:
  - *How we onboard a new client*
  - *Brand guidelines and typography*
  - *Standard invoice templates*
  - *Emergency contact numbers*
- Using Notion AI, you can take their messy voice notes or rough bullet points and turn them into polished, professional employee manuals in minutes!

#### 3. Shareable Client Portals
- Instead of emailing back and forth 20 times a week asking *"Where are we on the project?"*, the business gives each client a private link to their own **Client Portal**.
- The client can see upcoming milestones, review drafts, and access shared Google Drive folders in real time.
- This single feature eliminates dozens of weekly client support emails.

---

### How to Deliver the Project in 4 Simple Steps

1. **The 30-Minute Discovery Call:**
   Ask the client: *"Show me your current spreadsheets and where you track tasks. What is falling through the cracks?"*
2. **Customize Your Master Template:**
   Duplicate your master Notion hub. Add their company logo, set their brand colors, and configure their specific project tags.
3. **Migrate Their Active Clients:**
   Copy their 5 to 10 active projects into the new database so they start with real, live data immediately.
4. **Record a 5-Minute Loom Walkthrough:**
   Walk through the dashboard: *"Here’s how you add a project, here’s how you check off tasks, and here’s the link to share with your clients."*

The client receives a complete, beautiful digital headquarters without having had to build a single database themselves.

---

### Practical Action Task
Identify 2 friends, colleagues, or local business owners who run service businesses. Ask them how they currently track client projects (spreadsheet, Trello, email, or memory). Notice how many are open to a simpler, more organized solution.`,
  },
  {
    id: "05-4",
    number: "5.4",
    title: "Sharing Templates, Free Tier Capabilities, and Your Action Task",
    duration: "10 min",
    summary:
      "Learn how to export and deliver Notion templates with 1-click sharing, understand Notion's generous free plans, and complete your Module 5 action task.",
    learningObjective:
      "Package, lock, and share Notion templates with clients seamlessly while ensuring zero risk of accidental formula deletion.",
    takeaway:
      "Notion's 'Duplicate' feature lets you sell the exact same workspace design to 100 different customers with zero additional inventory cost.",
    slides: [
      {
        id: "s-0504-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 05 · LESSON 5.4",
        headline: "DELIVERY, SHARING & BEST PRACTICES",
        subheadline: "How to package, lock, and deliver Notion workspaces cleanly and professionally.",
      },
      {
        id: "s-0504-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "The 3 Delivery Steps",
        pillars: [
          {
            badge: "STEP 1",
            title: "Clean Out Test Data",
            description: "Replace your personal names with clear placeholders like '[Client Company Name]' and '[Sample Task]'.",
          },
          {
            badge: "STEP 2",
            title: "Lock Database Views",
            description: "Click 'Lock Database' so clients cannot accidentally drag columns or break formulas.",
          },
          {
            badge: "STEP 3",
            title: "Enable 'Allow Duplicate'",
            description: "Click Share > Publish to Web > 'Allow duplicate as template' to generate the magic copy link.",
          },
        ],
      },
      {
        id: "s-0504-3",
        order: 3,
        type: "CHECKLIST",
        headline: "Notion Pricing & Free Tiers",
        checklist: [
          { label: "Notion is completely free for individual users with unlimited pages", passed: true, note: "Zero software cost for your clients" },
          { label: "Notion Plus ($10/mo) is only needed for teams with multiple members", passed: true, note: "Very affordable for small agencies" },
          { label: "Notion AI add-on is optional ($10/mo) but has a free trial included", passed: true, note: "Easy to test before buying" },
        ],
      },
      {
        id: "s-0504-4",
        order: 4,
        type: "RECAP",
        headline: "Module 5 Wrap-Up",
        recapPoints: [
          "Notion workspaces are digital assets that can be sold repeatedly or delivered as custom consulting setups.",
          "You now have a powerful organization skill to add to your automation toolkit.",
          "Next up: Tool 5 — Opus Clip & Descript, where we automate short-form video repurposing.",
        ],
      },
    ],
    writtenLesson: `# Sharing Templates, Free Tier Capabilities, and Your Action Task

Delivering a finished Notion workspace to a paying customer is the easiest part of the entire process. Because Notion is built for collaboration, you don't need to send zip files, email attachments, or install complex software.

---

### How to Deliver a Notion Workspace in 30 Seconds

1. Open the master page you designed for the client.
2. Ensure you have removed any personal or test data and replaced it with helpful placeholders (e.g., \`[Example Client: Acme Inc]\`).
3. Click the **Share** button in the top right corner.
4. Go to the **Publish** tab and click **Publish to web**.
5. Ensure the toggle switch for **"Allow duplicate as template"** is turned **ON**.
6. Copy the web link and send it to your client with this note:
   > *"Hi [Name], here is your custom Operating Hub! When you open this link, simply click the 'Duplicate' button in the top right corner, and it will instantly install the entire workspace into your personal Notion account."*

---

### The Power of Digital Template Sales
Think about the economic leverage of this delivery model:
- You spend a weekend designing a magnificent **"Interior Designer Client & Project Tracker"**.
- You create a 2-minute video showing how it works.
- You publish it on Gumroad or Etsy for **$49**.
- When 50 interior designers buy it over the next 3 months, you earn **$2,450** in profit from work you did once.
- There are no inventory costs, no shipping fees, and no ongoing software hosting expenses.

---

### Understanding Notion's Free Tier
- **Individual Free Plan:** Completely free forever. Allows unlimited pages and blocks for solo users.
- **Team Plus Plan:** Costs approximately **$10 per user per month**, which is only necessary if your client has multiple full-time employees collaborating in the same workspace.
- **Notion AI Add-on:** Costs $10/month per user, but includes several free AI responses out of the box so clients can test the features immediately.

---

### Your Practical Action Task for Module 5
1. Open the Project Hub you built in Lesson 5.2.
2. Click **Share > Publish > Publish to web** and enable **"Allow duplicate as template"**.
3. Open a private/incognito browser window and paste the link.
4. Verify that the page loads cleanly and that the blue **"Duplicate"** button appears in the top right corner.
5. Save this shareable link. You now possess a finished digital workspace ready to sell or demonstrate!`,
  },
];

// ==========================================
// MODULE 06: Tool 5 — Opus Clip & Descript: Automated Video Repurposing
// ==========================================
export const MODULE_06_LESSONS: ExtendedLesson[] = [
  {
    id: "06-1",
    number: "6.1",
    title: "The Short-Form Content Bottleneck: Why Creators and Businesses Need Help",
    duration: "11 min",
    summary:
      "Explore the explosion of short-form video across TikTok, Instagram Reels, and YouTube Shorts, and why busy professionals will pay you to turn their long videos into viral clips.",
    learningObjective:
      "Understand the demand for video repurposing services and how AI tools automate 90% of the manual editing workload.",
    takeaway:
      "Every podcaster, CEO, coach, and speaker knows they need short-form clips to grow, but manually finding timestamps, cropping, and captioning takes 10+ hours a week.",
    slides: [
      {
        id: "s-0601-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 06 · LESSON 6.1",
        headline: "TOOL 5: OPUS CLIP & DESCRIPT",
        subheadline: "Automating short-form video repurposing: turning 1 long video into 10 viral clips in minutes.",
      },
      {
        id: "s-0601-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "Short-form video is the #1 way businesses get discovered online today.",
        subheadline: "Yet editing a 60-minute podcast into 10 vertical clips manually takes a human editor an entire full-time workday.",
      },
      {
        id: "s-0601-3",
        order: 3,
        type: "COMPARISON",
        headline: "Manual Editing vs Automated AI Repurposing",
        comparison: {
          leftTitle: "Traditional Video Editing",
          leftItems: [
            "Watching an entire 60-minute recording by hand",
            "Manually noting down timestamps for good hooks",
            "Cropping landscape 16:9 into vertical 9:16 manually",
            "Typing subtitles word-by-word in Premiere Pro",
            "Time required: 6 to 8 hours per episode",
          ],
          rightTitle: "AI Automated Repurposing",
          rightItems: [
            "Paste 1 YouTube link into Opus Clip",
            "AI analyzes humor, hooks, and topic relevance",
            "Auto-crops face tracking to keep speaker centered",
            "Generates animated, colorful captions automatically",
            "Time required: 15 minutes of review",
          ],
        },
      },
      {
        id: "s-0601-4",
        order: 4,
        type: "FRAMEWORK",
        headline: "The 2 Tools You Need to Know",
        pillars: [
          {
            badge: "TOOL A: OPUS CLIP",
            title: "Automated Clip Extraction",
            description: "Pastes a video link, automatically extracts the 10 best viral moments, adds captions, and scores viral potential.",
          },
          {
            badge: "TOOL B: DESCRIPT",
            title: "Text-Based Video Editing",
            description: "Edit video like a Word document: delete 'ums', stutters, and pauses by simply backspacing the transcribed text.",
          },
        ],
      },
      {
        id: "s-0601-5",
        order: 5,
        type: "RECAP",
        headline: "Key Takeaways",
        recapPoints: [
          "You do not need to be a professional Adobe Premiere video editor.",
          "Opus Clip and Descript do the heavy lifting of hook detection, cropping, and captioning.",
          "You can charge $500 to $1,500/month per creator for a weekly repurposing retainer.",
        ],
      },
    ],
    writtenLesson: `# The Short-Form Content Bottleneck: Why Creators and Businesses Need Help

If you open TikTok, Instagram Reels, or YouTube Shorts today, you will notice that almost every popular creator, CEO, business coach, and podcast host is posting vertical short videos with animated, colorful captions.

Short-form vertical video is currently the **single most effective organic marketing channel in the world**. It allows a complete stranger with zero followers to reach 50,000 people overnight.

---

### The Massive Bottleneck Creators Face

Consider a typical podcaster, keynote speaker, or business founder:
- They record a 45-minute podcast episode or webinar every single week.
- They know they *should* chop that episode into 5 or 10 bite-sized clips for TikTok and Instagram.
- But doing that manually is brutal:
  - You have to listen to the whole hour and write down timestamps.
  - You have to import the footage into complex software like Premiere or Final Cut.
  - You have to manually reframe the video from horizontal (16:9) to vertical (9:16) so the speaker's face stays in the frame.
  - You have to type and synchronize animated captions word-for-word.

Most busy founders simply don't have the 8 hours a week to do this. They either don't post at all, or they search for someone to help them.

---

### How AI Automation Flips the Script

With tools like **Opus Clip** and **Descript**, the entire process changes:
1. You take the link to their YouTube video or upload their raw Zoom recording.
2. **Opus Clip’s AI** listens to the entire video, analyzes conversational hooks, and identifies the 5 to 10 most engaging standalone moments.
3. It automatically crops the video to vertical 9:16 and uses smart face-tracking so the speaker is always perfectly framed in the center.
4. It transcribes the words and generates eye-catching, animated karaoke-style captions (with highlights on key words).
5. It assigns each clip a **Virality Score** (from 1 to 99) explaining *why* that moment will perform well on social media.

What used to take an entire Saturday now takes **15 minutes of review and minor tweaking**.

---

### The Service You Can Sell
You can approach podcasters, business coaches, consultants, and webinar hosts with a simple proposition:
> *"Send me your weekly podcast or webinar link. Every Monday morning, I will deliver 8 polished, captioned vertical short-form video clips ready to post on Instagram Reels, TikTok, and YouTube Shorts."*

This is one of the highest-demand freelance services in the digital economy today.

---

### Practical Action Task
Open YouTube and find one 20-minute podcast or interview you enjoy (e.g., an episode of Diary of a CEO, Huberman Lab, or an interview with a business founder). Copy the URL. In the next lesson, we will use it to generate our first batch of short-form clips!`,
  },
  {
    id: "06-2",
    number: "6.2",
    title: "Step-by-Step: Extracting 10 Polished Clips with Animated Captions",
    duration: "12 min",
    summary:
      "A complete walkthrough using Opus Clip. Upload a long video, customize caption templates, adjust speaker face-framing, and export ready-to-post short clips.",
    learningObjective:
      "Generate, review, and customize professional vertical short-form video clips with animated captions using Opus Clip.",
    takeaway:
      "AI detects the best moments and writes the captions; your human role is spending 5 minutes reviewing the clips to ensure the hook and ending feel natural.",
    slides: [
      {
        id: "s-0602-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 06 · LESSON 6.2",
        headline: "STEP-BY-STEP OPUS CLIP WALKTHROUGH",
        subheadline: "From raw YouTube link to 10 ready-to-post viral clips in 5 simple steps.",
      },
      {
        id: "s-0602-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "The 5-Step Repurposing Blueprint",
        pillars: [
          {
            badge: "STEP 1",
            title: "Paste Video Link",
            description: "Go to Opus.pro and paste any public YouTube, Zoom, or Google Drive link.",
          },
          {
            badge: "STEP 2",
            title: "AI Analysis",
            description: "The AI transcribes the video, detects emotional hooks, and extracts 8-12 standalone clips.",
          },
          {
            badge: "STEP 3",
            title: "Select Caption Style",
            description: "Choose popular animated caption styles (Hormozi, MrBeast, Minimal, or Custom Colors).",
          },
          {
            badge: "STEP 4",
            title: "Trim & Review",
            description: "Use the built-in visual timeline editor to tweak the starting hook or ending punchline.",
          },
        ],
      },
      {
        id: "s-0602-3",
        order: 3,
        type: "SCENARIO",
        headline: "Selecting the Best Clips",
        scenario: {
          situation: "Opus Clip generates 10 clips with virality scores ranging from 65 to 94.",
          instinctiveReaction: "Exporting all 10 clips without watching them and sending them to the client.",
          calibratedMove: "Watch the top 5 clips scored above 80. Verify that the first 3 seconds contain an intriguing opening sentence and that the clip doesn't cut off mid-thought.",
          whyItWorks: "Human curation takes 5 minutes and guarantees the client receives top-tier quality.",
        },
      },
      {
        id: "s-0602-4",
        order: 4,
        type: "CHECKLIST",
        headline: "Quality Control Checklist",
        checklist: [
          { label: "Check spellings of proper nouns, names, and technical terms in captions", passed: true, note: "AI occasionally mishears uncommon names" },
          { label: "Verify speaker's face is centered in the vertical 9:16 frame", passed: true, note: "Use the Auto-Reframe tool if needed" },
          { label: "Ensure clip length is between 30 and 60 seconds", passed: true, note: "The sweet spot for Reels and Shorts retention" },
        ],
      },
      {
        id: "s-0602-5",
        order: 5,
        type: "RECAP",
        headline: "Implementation Summary",
        recapPoints: [
          "Opus Clip cuts video production time from hours to minutes.",
          "Free tier gives you 60 free minutes of processing to practice with.",
          "Delivering 5 curated, error-free clips is 10x better than sending 20 sloppy ones.",
        ],
      },
    ],
    writtenLesson: `# Step-by-Step: Extracting 10 Polished Clips with Animated Captions

In this lesson, we will use **Opus Clip** (opus.pro) to convert a standard horizontal YouTube video into polished, captioned vertical short clips.

---

### Step 1: Create Your Free Account
1. Go to [Opus.pro](https://www.opus.pro).
2. Sign up with your Google account.
3. Opus Clip automatically provides **60 to 90 free processing minutes** on signup, allowing you to process one or two full-length podcast episodes without entering a credit card.

---

### Step 2: Submit a Video for Repurposing
1. In your dashboard, you will see a box that says: **"Drop a link or upload a file"**.
2. Paste the YouTube URL you selected in Lesson 6.1 (e.g., an educational interview or podcast).
3. Click **"Get clips in 1 click"**.
4. The AI will begin analyzing the video. This takes about 5 to 10 minutes depending on the video length. You can close the tab and grab a cup of coffee; Opus will email you when it's done!

---

### Step 3: Review the Generated Clips
When you return to your dashboard, you will see a feed of **8 to 15 vertical clips**:
- Each clip has a **Viral Score** (e.g. 92/100) and a headline explaining the core hook (e.g. *"Why most habits fail after 14 days"*).
- The video is already cropped vertically to 9:16 with dynamic face tracking.
- Captions are already generated with colorful highlights on key words!

---

### Step 4: Customize the Captions and Brand Style
1. Click **Edit Clip** on any of the top-ranked clips.
2. In the design panel on the right, you can customize:
   - **Caption Template:** Choose styles like *Hormozi* (bold yellow/green text), *Beast* (punchy clean text), or *Minimal* (subtle elegant captions).
   - **Colors:** Match the client’s brand colors (e.g., vibrant blue or neon green highlights).
   - **Auto-B-Roll:** Opus can even automatically insert relevant stock video b-roll over certain sentences to keep viewers hooked!

---

### Step 5: Proofread and Trim
1. Play the clip from start to finish.
2. If there is a typo on a specific word (like someone's last name), simply click on that word in the transcript text editor and fix the spelling.
3. If the ending cuts off a second too early, drag the timeline handle at the bottom by 1 second to let the sentence finish naturally.
4. Click **Save & Compile**, then click **Download HD**.

You now have a production-grade, 1080x1920 vertical video clip ready to upload directly to Instagram Reels, YouTube Shorts, and TikTok!

---

### Practical Action Task
Run a 15-minute video through Opus Clip using your free credits. Select the single best clip, edit the caption style, and download the video to your computer. Watch it on your phone to see how professional it looks.`,
  },
  {
    id: "06-3",
    number: "6.3",
    title: "Real-World Service: Offering a Monthly Video Repurposing Retainer",
    duration: "11 min",
    summary:
      "Structure and sell monthly short-form video packages to creators, podcast hosts, and business founders looking for consistent social media presence.",
    learningObjective:
      "Package video repurposing into a recurring monthly retainer service and pitch prospective clients effectively.",
    takeaway:
      "Creators and businesses don't want a one-off clip; they need 3 to 5 clips every single week. This makes video repurposing the ultimate recurring retainer service.",
    slides: [
      {
        id: "s-0601-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 06 · LESSON 6.3",
        headline: "THE VIDEO REPURPOSING RETAINER",
        subheadline: "Packaging recurring monthly video services for podcasters, coaches, and founders.",
      },
      {
        id: "s-0601-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "Consistency is the hardest part of content marketing. That is why retainers work so well.",
        subheadline: "When you handle their weekly clip extraction, they never have to worry about running out of content.",
      },
      {
        id: "s-0601-3",
        order: 3,
        type: "FRAMEWORK",
        headline: "The 3 Monthly Retainer Tiers",
        pillars: [
          {
            badge: "TIER 1: STARTER ($450/mo)",
            title: "8 Clips Per Month",
            description: "2 polished clips per week extracted from their existing YouTube videos, podcasts, or webinars.",
          },
          {
            badge: "TIER 2: GROWTH ($850/mo)",
            title: "16 Clips Per Month",
            description: "4 clips per week (Monday, Wednesday, Friday, Saturday) with custom brand fonts and captions.",
          },
          {
            badge: "TIER 3: OMNIPRESENCE ($1,500/mo)",
            title: "Daily Clips + Scheduling",
            description: "30 clips per month + you schedule them directly into their Instagram and YouTube channels using Buffer.",
          },
        ],
      },
      {
        id: "s-0601-4",
        order: 4,
        type: "SCENARIO",
        headline: "How the Monthly Retainer Math Works",
        scenario: {
          situation: "You sign 3 clients on the Tier 2 Growth Plan ($850/month each).",
          instinctiveReaction: "Worrying that you won't have enough time to do the work.",
          calibratedMove: "Each client sends 2 podcast links per month. Using Opus Clip, extracting and reviewing 16 clips takes about 2 hours per client. Total work: 6 hours a month.",
          whyItWorks: "You earn $2,550/month in steady recurring revenue for approximately 6 to 8 hours of focused creative work.",
        },
      },
      {
        id: "s-0601-5",
        order: 5,
        type: "RECAP",
        headline: "Key Takeaways",
        recapPoints: [
          "Podcasts and webinars are goldmines of untapped short-form content.",
          "Monthly retainers give you predictable income that compounds over time.",
          "Always provide clips formatted in a shared Google Drive folder organized by week.",
        ],
      },
    ],
    writtenLesson: `# Real-World Service: Offering a Monthly Video Repurposing Retainer

If you want predictable, recurring monthly income, **Video Repurposing** is one of the best services you can offer.

Why? Because content creation is never a one-time project. A podcast host releases an episode every single week. A webinar speaker hosts a presentation every two weeks. If they want to stay relevant, they need fresh clips every Monday, Wednesday, and Friday.

---

### The Three Retainer Service Packages

Here is a proven pricing structure you can use right away:

#### Package 1: The Starter Bundle ($450 / month)
- **What they give you:** 2 long videos or podcast links per month.
- **What you deliver:** 8 edited vertical clips (2 per week) with animated captions and custom brand colors.
- **Delivery format:** Organized in a shared Google Drive folder with suggested captions and hashtags.

#### Package 2: The Growth Bundle ($850 / month) — *Most Popular*
- **What they give you:** 4 podcast episodes or Zoom calls per month (1 per week).
- **What you deliver:** 16 edited vertical clips (4 per week).
- **Time required for you:** About 2 to 3 hours per month using Opus Clip.

#### Package 3: The Full-Service Omnipresence Package ($1,500 / month)
- **What you deliver:** 25 to 30 clips per month (1 daily post).
- **Added value:** In addition to editing the clips, you use a free social media scheduler like [Buffer](https://buffer.com) or [Later](https://later.com) to schedule the clips directly into their Instagram Reels, TikTok, and YouTube Shorts accounts.
- The client literally does nothing except record their podcast, and their social media channels run on complete autopilot!

---

### How to Land Your First Video Repurposing Client

The most effective way to land a video client is **The Free Sample Strategy**:
1. Find a podcaster, coach, or YouTuber who has great long-form content but does **not** consistently post vertical short clips on Instagram or TikTok.
2. Take one of their public YouTube videos and run it through Opus Clip.
3. Pick the single best 45-second moment. Polish the captions, add their brand color, and export it in high definition.
4. Send them a polite email or direct message:
   > *"Hi [Name]! Loved your podcast episode with [Guest]. There was an incredible 45-second moment at the 14-minute mark where you explained [Topic]. I took the liberty of turning it into a captioned vertical Reel for you so you can see how it looks. No strings attached—you’re welcome to post it directly! Here is the download link: [Link]. If you’d like 4 of these every week for your podcast, I’d love to help you out."*

When a busy creator sees a finished, professional video of themselves ready to post, **over 30% of them will reply asking how much you charge to do it every week.**

---

### Practical Action Task
Identify 3 podcasters or YouTubers in an area you enjoy (business, fitness, self-improvement, finance). Check if they are currently posting vertical captioned clips on Instagram Reels or TikTok. Pick one and find a good 30-minute episode to practice on.`,
  },
  {
    id: "06-4",
    number: "6.4",
    title: "Quality Checkpoints, Free Credits Tips, and Your Action Task",
    duration: "11 min",
    summary:
      "Master the subtle editing details that elevate your clips above amateur work, manage software subscriptions efficiently, and complete your Module 6 action task.",
    learningObjective:
      "Execute professional quality control on short-form clips and avoid common amateur editing mistakes.",
    takeaway:
      "Amateurs post whatever the AI spits out; professionals spend 3 minutes tweaking the hook, fixing name spellings, and ensuring the video starts with punchy energy.",
    slides: [
      {
        id: "s-0604-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 06 · LESSON 6.4",
        headline: "QUALITY CONTROL & PRO TIPS",
        subheadline: "The subtle touches that separate high-earning editors from low-value amateurs.",
      },
      {
        id: "s-0604-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "The 3 Golden Rules of Viral Clips",
        pillars: [
          {
            badge: "RULE 1: THE 3-SECOND HOOK",
            title: "Cut the Fluff",
            description: "Never start a clip with 'Um, so yeah, basically...'. Cut straight to the intriguing statement.",
          },
          {
            badge: "RULE 2: CAPTION ACCURACY",
            title: "Check Proper Nouns",
            description: "Ensure names, cities, book titles, and company names are spelled with 100% precision.",
          },
          {
            badge: "RULE 3: SAFE MARGINS",
            title: "Avoid UI Overlap",
            description: "Keep text away from the extreme bottom or right side where TikTok/Reels buttons cover the screen.",
          },
        ],
      },
      {
        id: "s-0604-3",
        order: 3,
        type: "CHECKLIST",
        headline: "Managing Tool Costs Efficiently",
        checklist: [
          { label: "Use Opus Clip's free trial minutes to create your initial sample portfolio", passed: true, note: "Zero upfront risk" },
          { label: "Upgrade to Opus Starter ($9/mo) only when you land your first paying client", passed: true, note: "Paid for immediately by client revenue" },
          { label: "Use Descript ($12/mo) if you need advanced text-based removal of filler words", passed: true, note: "Automatically removes 'um' and 'uh'" },
        ],
      },
      {
        id: "s-0604-4",
        order: 4,
        type: "RECAP",
        headline: "Module 6 Wrap-Up",
        recapPoints: [
          "Video repurposing solves a massive, weekly bottleneck for modern creators and founders.",
          "You can charge $450 to $1,500/month per client for a service that takes a few hours to manage.",
          "Next up: Tool 6 — Canva Magic Studio, where we automate visual graphics and social content packs.",
        ],
      },
    ],
    writtenLesson: `# Quality Checkpoints, Free Credits Tips, and Your Action Task

Anyone can paste a link into an AI video tool. The reason clients will pay **you** $850 a month instead of doing it themselves is because you provide **human quality control and reliable consistency**.

Here are the professional quality checks you should always run before delivering clips to a client:

---

### The Professional Quality Checklist

#### 1. The 3-Second Hook Check
On social media, viewers decide whether to keep watching within the first **3 seconds**.
- If a clip starts with the speaker saying: *"Yeah, so, I was thinking about that other day and, uh..."*, open the editor and trim those first 4 seconds off!
- Start the clip directly when they say: *"Most people lose money in real estate because they buy for appreciation instead of cash flow."*
- That punchy opening immediately hooks the viewer.

#### 2. The Proper Noun & Spelling Check
AI transcription is about 98% accurate. The 2% it gets wrong are usually:
- People's names (e.g., transcribing *"Gary Vee"* as *"Gary V"* or *"Sara"* as *"Sarah"*).
- Technical jargon or brand names (e.g., transcribing *"Shopify"* as *"Shop if I"*).
- Always scan the text once to fix these small details.

#### 3. Safe Zone Margins (Crucial!)
On Instagram Reels and TikTok, the bottom 20% of the screen is covered by the caption and sound title, and the right side is covered by the Like, Comment, and Share buttons.
- In Opus Clip, ensure your caption position is set to **Center or Upper-Center**.
- Never let text sit at the very bottom edge of the screen where it will be obscured by the app's interface.

---

### Managing Tool Subscriptions
- **Start for Free:** Use Opus Clip’s initial free minutes to generate 2 or 3 sample clips for your portfolio.
- **When You Land a Client:** Upgrade to Opus Clip Starter for **$9 to $19 per month** (which gives you 150 to 300 processing minutes—plenty for 1 or 2 clients).
- Because your client is paying you **$450 to $850 per month**, your software expense is less than 3% of your revenue, leaving you with over 95% profit margin!

---

### Your Practical Action Task for Module 6
1. Take the sample clip you created in Lesson 6.2.
2. Review it against the 3 Quality Checkpoints above:
   - Does it start with an immediate hook?
   - Are all names spelled correctly?
   - Are the captions in the safe zone?
3. Save the download link in your portfolio folder. You now have a working Make.com demo, a Custom GPT demo, and a Short-Form Video demo ready to show!`,
  },
];
