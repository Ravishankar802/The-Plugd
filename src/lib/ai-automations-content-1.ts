import { Lesson, Module } from "@/lib/playbooks-data";

export interface ExtendedLesson extends Lesson {
  learningObjective: string;
  writtenLesson: string;
  takeaway: string;
}

// ==========================================
// MODULE 01: Getting Started with AI Automation & The $10,000 Milestone
// ==========================================
export const MODULE_01_LESSONS: ExtendedLesson[] = [
  {
    id: "01-1",
    number: "1.1",
    title: "What AI Automation Really Is (And Why You Don't Need Coding Skills)",
    duration: "10 min",
    summary:
      "Demystify AI automation for complete beginners. Learn how modern visual tools let anyone connect apps and automate everyday tasks without writing a single line of code.",
    learningObjective:
      "Understand what AI automation means in everyday business terms and identify repetitive tasks that can be automated with visual, no-code tools.",
    takeaway:
      "AI automation is simply using smart software to handle repetitive steps so people can focus on higher-value work. You do not need to be a programmer to build useful workflows.",
    slides: [
      {
        id: "s-0101-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 01 · LESSON 1.1",
        headline: "WHAT AI AUTOMATION REALLY IS",
        subheadline: "Why complete beginners can build valuable business workflows without writing code.",
      },
      {
        id: "s-0101-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "Automation is not about building robots. It is about connecting apps so repetitive tasks happen on their own.",
        subheadline: "If a business owner spends 2 hours every evening copying inquiries from email to spreadsheets, that is an automation opportunity.",
      },
      {
        id: "s-0101-3",
        order: 3,
        type: "COMPARISON",
        headline: "Old Way vs Modern AI Automation",
        comparison: {
          leftTitle: "The Old Technical Way",
          leftItems: [
            "Hiring software engineers at $100/hr",
            "Writing complex Python scripts and databases",
            "Months of custom development and testing",
            "Inaccessible to non-technical business owners",
          ],
          rightTitle: "The Modern No-Code Way",
          rightItems: [
            "Visual drag-and-drop connectors (Make, Zapier)",
            "Ready-made templates for common business tasks",
            "Build working automations in 30 to 60 minutes",
            "Accessible to students, freelancers, and beginners",
          ],
        },
      },
      {
        id: "s-0101-4",
        order: 4,
        type: "FRAMEWORK",
        headline: "The 3 Building Blocks of Any Automation",
        pillars: [
          {
            badge: "STEP 1: TRIGGER",
            title: "When Something Happens",
            description: "A customer fills out a website form, sends an Instagram DM, or uploads a document.",
          },
          {
            badge: "STEP 2: AI STEP",
            title: "A Smart Decision or Draft",
            description: "AI reads the message, summarizes it, classifies the urgency, or drafts a helpful reply.",
          },
          {
            badge: "STEP 3: ACTION",
            title: "The Result That Gets Delivered",
            description: "The information is saved to a spreadsheet, an alert is sent to the team, or a reply is sent.",
          },
        ],
      },
      {
        id: "s-0101-5",
        order: 5,
        type: "RECAP",
        headline: "Lesson 1.1 Core Principles",
        recapPoints: [
          "You do not need programming knowledge, mathematics, or computer science degrees.",
          "Everyday businesses waste hundreds of hours on simple copy-paste tasks.",
          "Modern AI tools act like smart glue connecting tools people already use.",
          "Your job is finding an annoying repetitive task and replacing it with a smooth automated flow.",
        ],
      },
    ],
    writtenLesson: `# What AI Automation Really Is (And Why You Don't Need Coding Skills)

If you have ever felt intimidated by terms like "artificial intelligence," "machine learning," or "algorithms," take a deep breath. You do not need to understand any of that to build profitable automations.

In the real world, **AI automation** simply means using friendly software tools to handle repetitive, boring tasks that humans normally have to do by hand.

Think of it like setting a smart thermostat in a home. You don't need to understand electrical engineering to program the temperature to lower when you go to sleep. Modern AI automation tools work the exact same way: you tell them *"When X happens, have AI do Y, and then save the result to Z."*

---

### Everyday Examples of What We Mean by "Automation"

Here are three simple examples that happen in small businesses every single day:

1. **The Overwhelmed Dentist Office:**
   - *The manual problem:* Patients fill out a contact form on their website. The receptionist spends 30 minutes every morning opening emails, typing names and phone numbers into an appointment spreadsheet, and emailing each patient back with available times.
   - *The automated solution:* A no-code tool automatically adds the new inquiry to their schedule, sends an instant friendly confirmation email, and texts the office manager when a high-priority consultation request arrives.

2. **The Fitness Coach on Instagram:**
   - *The manual problem:* The coach posts a workout video and says *"Comment WORKOUT and I'll send you my free 7-day meal plan."* Three hundred people comment. The coach spends four hours clicking into 300 profiles and typing the same direct message over and over.
   - *The automated solution:* An AI tool detects the keyword comment and instantly sends the download link to their direct messages in three seconds, 24 hours a day.

3. **The Local Real Estate Agent:**
   - *The manual problem:* The agent receives 15 new property listings every week and spends whole afternoons writing social media descriptions, drafting email blast newsletters, and creating flyer copy.
   - *The automated solution:* A custom AI assistant trained on the agent's preferred style takes the property bullet points and drafts the full listing description, social post, and client email in under 30 seconds.

---

### The Three Parts of Every Automation

No matter which tool you use throughout this Playbook, every automation follows a simple three-step structure:

1. **The Trigger (The Starting Event):**
   This is what kicks off the process. Examples: A new form response, a new email in your inbox, a comment on an Instagram post, or a scheduled time (like every Monday at 9:00 AM).

2. **The AI Step (The Brain):**
   This is where AI does the thinking work that a human used to do. It might summarize a long email, check if an inquiry is urgent, clean up messy notes, or draft a polite reply.

3. **The Action (The Output):**
   This is what happens at the end. The information is saved in a Google Sheet, an alert is sent to a phone, a calendar invite is created, or a message is sent to a customer.

---

### What You Will Need to Get Started

To complete this Playbook and start building your own automations, all you need is:
- A laptop or desktop computer with an internet connection.
- A free Google account (for Gmail and Google Sheets).
- A willingness to follow visual, step-by-step instructions.

You **do not** need any coding experience, math skills, or a large budget. Almost every tool featured in this Playbook offers a generous free tier or free trial so you can practice without spending money.

---

### Practical Action Task
Take a piece of paper or open a blank note. Write down **three repetitive digital tasks** you or someone you know performs regularly (e.g., copying notes, replying to common questions, formatting weekly updates). You will learn how to automate all three of them as you progress through this Playbook.`,
  },
  {
    id: "01-2",
    number: "1.2",
    title: "How Businesses Value Automation: The Math of Saved Hours",
    duration: "10 min",
    summary:
      "Learn the simple financial math that explains why small business owners and creators will happily pay hundreds of dollars for an automation that takes you two hours to build.",
    learningObjective:
      "Calculate the dollar value of time saved for small businesses and understand how to present automation as an investment that pays for itself.",
    takeaway:
      "Businesses do not buy software because it is cool; they buy it because it saves them payroll hours or stops them from losing potential customers.",
    slides: [
      {
        id: "s-0102-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 01 · LESSON 1.2",
        headline: "THE MATH OF SAVED HOURS",
        subheadline: "Why businesses gladly pay for simple automations that buy back their time.",
      },
      {
        id: "s-0102-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "A business owner who earns $100/hour should never spend 5 hours a week doing $15/hour data entry.",
        subheadline: "When you eliminate that chore, you are saving them 20 hours a month of high-value founder time.",
      },
      {
        id: "s-0102-3",
        order: 3,
        type: "FRAMEWORK",
        headline: "The Time Savings Formula",
        pillars: [
          {
            badge: "HOURS LOST",
            title: "Identify Weekly Time",
            description: "How many hours per week does the owner or their team spend on the manual task? (e.g., 5 hours/week).",
          },
          {
            badge: "VALUE OF TIME",
            title: "Calculate Hourly Cost",
            description: "Even at an entry-level wage of $20/hour, 5 hours/week equals $100/week or $5,200/year.",
          },
          {
            badge: "THE OFFER",
            title: "Your Setup Price",
            description: "Charging $500 to fix that problem once and forever is a 10x return on investment for the client.",
          },
        ],
      },
      {
        id: "s-0102-4",
        order: 4,
        type: "SCENARIO",
        headline: "Real-World Conversation Scenario",
        scenario: {
          situation: "You are speaking with a local personal trainer who complains they are overwhelmed managing client check-in forms.",
          instinctiveReaction: "Say: 'I can build you an AI automation pipeline using Make.com and webhooks.' (They get confused and decline)",
          calibratedMove: "Say: 'If I could make it so every time a client submits a check-in, their stats update automatically and you get a 1-sentence summary on your phone, would that save you time?'",
          whyItWorks: "It focuses entirely on their daily relief, not the technical tool.",
        },
      },
      {
        id: "s-0102-5",
        order: 5,
        type: "RECAP",
        headline: "Key Takeaways",
        recapPoints: [
          "Never pitch tools or technology names; pitch the hours saved.",
          "A $500 project that saves 15 hours a month pays for itself in less than two months.",
          "Small businesses are desperate for simple, reliable help that just works.",
        ],
      },
    ],
    writtenLesson: `# How Businesses Value Automation: The Math of Saved Hours

The number one question beginners ask is:
> *"Why would a business pay me $300 or $500 for an automation that only took me an hour or two to set up?"*

To understand the answer, you must understand how business owners think about time and money.

---

### The Reality of Small Business Owners

Most small business owners (contractors, doctors, accountants, gym owners, photographers, e-commerce sellers) did not start their business to sit at a desk copying data between software tabs.

They are already working 50 to 60 hours a week. Every hour they spend:
- Answering repetitive emails
- Copying lead information into a spreadsheet
- Formatting client invoices
- Cropping and captioning social media clips

...is an hour they **cannot** spend meeting new clients, serving existing customers, or spending time with their families.

---

### The Simple ROI Math

Let’s look at a concrete, realistic example:

Imagine a local boutique law firm with one administrative assistant earning $22 per hour.
- The assistant spends approximately **6 hours every week** manually copying client intake form responses from their website into their calendar, case management folder, and email draft list.
- **Weekly cost to the law firm:** $22 × 6 hours = $132 per week.
- **Annual cost to the law firm:** $132 × 52 weeks = **$6,864 per year**.

Now, suppose you come in and build a simple visual automation connecting their intake form to their calendar and email using Make.com.
- It takes you **2 hours** to set up and test using a standard template.
- You charge the law firm a one-time setup fee of **$600**.

From the law firm’s perspective:
- They invest $600 once.
- They immediately recover over **300 hours of staff time** every year.
- Their assistant can now spend those hours on higher-value client communication.
- The investment pays for itself in less than five weeks.

This is why businesses gladly pay for automation. You are not charging for two hours of your time; you are charging for **hundreds of hours of their time saved**.

---

### The Two Types of Value You Can Create

1. **Hard Cost Savings (Time Recovered):**
   Removing repetitive manual data entry, manual document creation, or manual scheduling.
2. **Speed-to-Lead (Revenue Protected):**
   When a customer requests a quote on a website, contacting them in 5 minutes versus 5 hours can double the chance of closing the sale. Automating instant notifications directly protects incoming revenue.

---

### Practical Action Task
Think of one small local business you personally frequent (your barber, a nearby cafe, a gym, or an accountant). Write down one repetitive administrative chore they probably hate doing. Estimate how many hours a week it takes them.`,
  },
  {
    id: "01-3",
    number: "1.3",
    title: "The $10,000 Roadmap: Breaking Big Goals into Realistic Client Projects",
    duration: "10 min",
    summary:
      "Demystify the $10,000 title milestone. Learn the exact math of how simple $300 to $1,000 automation projects and monthly retainers compound into a realistic $10,000+ income stream over time.",
    learningObjective:
      "Break down a $10,000 income milestone into manageable, step-by-step client project targets without unrealistic hype.",
    takeaway:
      "$10,000 is not a magical overnight lottery; it is simply 10 businesses paying you $1,000 for a valuable solution, or 20 businesses paying you $500.",
    slides: [
      {
        id: "s-0103-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 01 · LESSON 1.3",
        headline: "THE $10,000 ROADMAP",
        subheadline: "Breaking big income numbers into realistic, bite-sized client projects.",
      },
      {
        id: "s-0103-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "Making $10,000 with AI tools is not one big secret deal. It is simple arithmetic.",
        subheadline: "When you understand the unit economics of simple services, the path becomes clear and achievable.",
      },
      {
        id: "s-0103-3",
        order: 3,
        type: "COMPARISON",
        headline: "3 Realistic Pathways to $10,000",
        comparison: {
          leftTitle: "Path A: The Project Path",
          leftItems: [
            "10 client projects at $1,000 each",
            "Or 20 quick workflow setups at $500 each",
            "Delivered over 3 to 6 months",
            "Great for freelancers building a portfolio",
          ],
          rightTitle: "Path B: The Retainer Path",
          rightItems: [
            "5 clients on a $400/month recurring plan",
            "Providing ongoing updates, content, or support",
            "Produces $2,000/month in steady revenue",
            "Reaches $10,000 in cumulative income in 5 months",
          ],
        },
      },
      {
        id: "s-0103-4",
        order: 4,
        type: "FRAMEWORK",
        headline: "The Realistic Timeline Breakdown",
        pillars: [
          {
            badge: "STAGE 1: LEARN (Month 1)",
            title: "Build Your First 3 Workflows",
            description: "Practice the 7 tools, build sample automations for yourself, and assemble a simple 1-page portfolio.",
          },
          {
            badge: "STAGE 2: PROVE (Months 2-3)",
            title: "Land First 3-5 Clients",
            description: "Deliver high-quality work for initial clients at $300-$500 each, collecting testimonials and referrals.",
          },
          {
            badge: "STAGE 3: COMPOUND (Months 4-6)",
            title: "Raise Rates & Add Retainers",
            description: "Charge $750-$1,200 per setup and convert past clients into recurring monthly maintenance partners.",
          },
        ],
      },
      {
        id: "s-0103-5",
        order: 5,
        type: "RECAP",
        headline: "Honest Truth About Income",
        recapPoints: [
          "No software will deposit money in your bank account while you sleep without initial effort.",
          "Your income is always tied to finding someone with a problem and delivering a working solution.",
          "Start small with a $250 project to build confidence before aiming for larger engagements.",
        ],
      },
    ],
    writtenLesson: `# The $10,000 Roadmap: Breaking Big Goals into Realistic Client Projects

The title of this Playbook mentions **$10,000+**. It is crucial to address this milestone honestly and transparently right at the start.

### What the $10,000 Figure Really Means
- It is **not** a get-rich-quick promise.
- It is **not** something that happens with the push of a single magic button.
- It is **not** guaranteed simply by reading these pages.

Instead, $10,000 represents a **realistic cumulative revenue milestone** that countless independent freelancers, side-hustlers, and digital service providers have achieved using the exact tools in this Playbook.

---

### The Simple Arithmetic of $10,000

When you view $10,000 as a single giant lump sum, it can feel overwhelming. But when you break it into individual client deliverables, the math becomes accessible:

| Business Model | How Many Clients? | Price Per Client | Cumulative Total |
| :--- | :--- | :--- | :--- |
| **Quick Starter Projects** | 20 clients | $500 one-off setup | **$10,000** |
| **Comprehensive Workflows** | 10 clients | $1,000 one-off build | **$10,000** |
| **Monthly Client Retainers** | 5 clients | $400 / month for 5 months | **$10,000** |
| **Hybrid Model** | 6 setups ($600 ea) + 4 retainers ($400/mo × 4 mos) | Mixed | **$10,000** |

Notice what this table demonstrates:
- You do **not** need 1,000 customers.
- You do **not** need an audience of 50,000 social media followers.
- You only need between **5 and 20 happy clients** who appreciate that you saved them hours of frustration.

---

### A Realistic 6-Month Trajectory

Here is what a grounded, realistic path looks like for someone starting with zero experience:

#### Month 1: Skill Mastery & Practice
- You complete this Playbook and practice all 7 tools using their free tiers.
- You build 2 or 3 sample automations for demo purposes (e.g., an automated lead capture flow, an Instagram DM auto-responder, and a video clip repurposing batch).
- You show them to friends, colleagues, or local business acquaintances.

#### Months 2–3: Your First Paid Work ($1,500 – $3,000)
- You reach out to people in your network or local area and offer to solve one specific problem (e.g., setting up automated lead notifications for a local contractor).
- You charge a modest introductory fee ($250 to $500).
- You overdeliver, fix any small issues, and ask for a short written review.

#### Months 4–6: Scaling to the $10,000 Milestone ($7,000+)
- With real testimonials and confidence, you charge $750 to $1,200 for complete workflow setups.
- You offer clients ongoing peace of mind: *"For $250/month, I’ll monitor your automations, update your templates, and make sure nothing ever breaks."*
- Over the next few months, your combined one-off projects and recurring retainers cross the $10,000 mark.

---

### Practical Action Task
Write down which of the three paths appeals most to you:
1. One-off quick projects ($300 – $600 each)
2. In-depth system setups ($1,000 each)
3. Recurring monthly retainers ($300 – $500/month)
Keep this preference in mind as we explore each of the 7 tools.`,
  },
  {
    id: "01-4",
    number: "1.4",
    title: "The Problem-Solver Mindset: Fixing Annoying Tasks vs Selling AI Hype",
    duration: "10 min",
    summary:
      "Learn the communication secret that separates successful automation consultants from ignored freelancers: speak the client's language and focus on the problem, not the technology.",
    learningObjective:
      "Frame automation services around everyday business relief and customer satisfaction rather than confusing technical jargon.",
    takeaway:
      "Clients do not care what tool you used; they care that their phone buzzed with a qualified lead while they were eating dinner with their family.",
    slides: [
      {
        id: "s-0104-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 01 · LESSON 1.4",
        headline: "THE PROBLEM-SOLVER MINDSET",
        subheadline: "Why speaking plain English makes you 10x more persuasive than talking about AI.",
      },
      {
        id: "s-0104-2",
        order: 2,
        type: "BEFORE_AFTER",
        headline: "How to Talk to Potential Clients",
        beforeAfter: {
          beforeLabel: "The AI Hype Pitch (Fails)",
          beforeText: "'Hi, I build autonomous generative AI agents using LLMs and API webhooks to optimize your digital transformation.' (Client has no idea what this means and deletes the message)",
          afterLabel: "The Problem-Solver Pitch (Works)",
          afterText: "'Hi! I noticed that when someone asks for a quote on your site, it can take a few hours to reply. I help local businesses send instant confirmation texts so you never lose a customer to a competitor. Would it be helpful if I showed you how it works?'",
        },
      },
      {
        id: "s-0104-3",
        order: 3,
        type: "CHECKLIST",
        headline: "The 4 Rules of Client Communication",
        checklist: [
          { label: "Rule 1: Never use technical acronyms (API, Webhook, JSON, Vector) with a non-technical client", passed: true, note: "Call it an 'instant connection' or 'automated sync'" },
          { label: "Rule 2: Focus on the annoying emotion (frustration, overwhelm, lost leads)", passed: true, note: "Make them feel understood" },
          { label: "Rule 3: Show a short 60-second video demo rather than sending a long pitch", passed: true, note: "Seeing is believing" },
          { label: "Rule 4: Offer a clear guarantee or simple test before asking for large commitments", passed: true, note: "Reduces client hesitation" },
        ],
      },
      {
        id: "s-0104-4",
        order: 4,
        type: "RECAP",
        headline: "Module 1 Wrap-Up",
        recapPoints: [
          "You are now grounded in the core fundamentals of AI automation.",
          "You understand why businesses happily pay for saved time.",
          "You know that $10,000 is a series of realistic, practical client wins.",
          "Next: We dive into Tool 1 — Make.com, the ultimate visual automation builder.",
        ],
      },
    ],
    writtenLesson: `# The Problem-Solver Mindset: Fixing Annoying Tasks vs Selling AI Hype

Many people who try to start an online business with AI make the same critical mistake: **they get so excited about the technology that they talk like a computer science manual.**

They send messages to local business owners or prospective clients saying things like:
> *"Hello! I specialize in deploying cutting-edge generative AI models, prompt engineering, and webhook pipelines to accelerate your digital transformation."*

To a normal human being running a bakery, an accounting office, or an online shop, that sentence sounds like alien gibberish. They have no idea what it means, they assume it will be complicated and expensive, and they immediately delete the message.

---

### The Golden Rule of Automation Consulting

> **Clients do not care about the tools. They care about their problems.**

A wedding photographer does not care if you used Make.com, Zapier, Python, or carrier pigeons.
They care that when a bride submits an inquiry on Saturday night:
- The bride immediately receives a warm, personalized portfolio link.
- The photographer gets a clean text message with the wedding date, location, and guest count.
- The client feels taken care of, and the photographer can enjoy their weekend without being glued to their laptop.

---

### The Plain-English Translation Table

Use this translation guide whenever you write a proposal, talk to a client, or describe what you do:

| What Tech People Say | What You Should Say Instead |
| :--- | :--- |
| "I set up multi-step API webhooks" | "I connect your contact form directly to your phone and email" |
| "I build autonomous RAG knowledge bases" | "I create a private assistant that answers common client questions" |
| "I implement Zapier automation infrastructure" | "I eliminate the 5 hours a week your team spends copying data" |
| "I optimize short-form generative video pipelines" | "I turn your long videos into 10 ready-to-post short video clips" |
| "I deploy an AI chatbot agent" | "I make sure visitors to your page get immediate answers 24/7" |

---

### The Three Questions That Unlock Client Deals

When speaking with any prospective client, simply ask these three friendly questions:
1. *"What is the most repetitive, annoying task you or your team have to do every single week?"*
2. *"How long does it usually take you to do it by hand?"*
3. *"If that happened automatically in the background without you touching it, what would you spend those hours on instead?"*

By asking these questions, the client themselves will identify the problem and calculate its value for you. All you have to do is show them how one of the 7 tools in this Playbook solves it.

---

### Practical Action Task
Rewrite the following sentence into friendly, plain English:
*"We leverage LLM-driven automation paradigms to optimize customer relationship management data ingestion."*
*(Hint: Make it sound like a helpful friend explaining how an automated form saves someone from typing into a database).*`,
  },
];

// ==========================================
// MODULE 02: Tool 1 — Make.com: Visual No-Code Workflows on Autopilot
// ==========================================
export const MODULE_02_LESSONS: ExtendedLesson[] = [
  {
    id: "02-1",
    number: "2.1",
    title: "What Make.com Is and What Beginners Can Build in 30 Minutes",
    duration: "11 min",
    summary:
      "Get introduced to Make.com, the premier visual automation platform. Understand modules, connections, and how anyone can link everyday apps like digital Lego blocks.",
    learningObjective:
      "Navigate the Make.com visual interface, understand the concept of triggers and actions, and explore the template gallery.",
    takeaway:
      "Make.com is like digital Lego. Each circular bubble represents an app (like Gmail or Google Sheets), and connecting them creates an automatic chain reaction.",
    slides: [
      {
        id: "s-0201-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 02 · LESSON 2.1",
        headline: "TOOL 1: MAKE.COM",
        subheadline: "Visual no-code automation: connecting your favorite apps like digital Lego blocks.",
      },
      {
        id: "s-0201-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "Make.com lets you build powerful automations by clicking and dragging colorful bubbles on a canvas.",
        subheadline: "No code, no syntax errors, and no programming required. If you can use a mouse, you can build a workflow.",
      },
      {
        id: "s-0201-3",
        order: 3,
        type: "FRAMEWORK",
        headline: "The Anatomy of a Make.com Scenario",
        pillars: [
          {
            badge: "MODULE 1",
            title: "The Watcher (Trigger)",
            description: "Watches for new events, like a new response submitted to a Google Form or a new email in Gmail.",
          },
          {
            badge: "MODULE 2",
            title: "The Processor (AI / Filter)",
            description: "Passes the text through ChatGPT to summarize it or classify whether it is an urgent lead.",
          },
          {
            badge: "MODULE 3",
            title: "The Doer (Action)",
            description: "Creates a row in Google Sheets and sends an instant SMS or Slack notification to the business owner.",
          },
        ],
      },
      {
        id: "s-0201-4",
        order: 4,
        type: "CHECKLIST",
        headline: "Why Make.com is the Beginner's Best Friend",
        checklist: [
          { label: "Free plan includes 1,000 free operations every month", passed: true, note: "Enough to build and test multiple real workflows" },
          { label: "Visual testing: see little numbers flow through bubbles when it runs", passed: true, note: "Makes troubleshooting intuitive and fun" },
          { label: "Over 1,500 pre-built apps (Google, Slack, Shopify, Airtable)", passed: true, note: "Works with tools clients already have" },
        ],
      },
      {
        id: "s-0201-5",
        order: 5,
        type: "RECAP",
        headline: "Lesson 2.1 Core Ideas",
        recapPoints: [
          "Make.com replaces manual copy-pasting across different software applications.",
          "Workflows in Make are called 'Scenarios' and consist of connected 'Modules'.",
          "You can start completely free without entering a credit card.",
        ],
      },
    ],
    writtenLesson: `# What Make.com Is and What Beginners Can Build in 30 Minutes

Welcome to **Tool 1: Make.com**.

If you only master one automation tool in your entire life, Make.com should be it. It is widely considered the most versatile, cost-effective visual automation platform available today.

---

### What Exactly Is Make.com?

Think of Make.com as a **universal digital translator and conveyor belt**.

Usually, different apps do not talk to each other automatically:
- When someone fills out a Google Form, Google does not automatically send an SMS to your phone.
- When an order comes into a Shopify store, Shopify does not automatically draft a personalized thank-you note in Gmail.
- When someone asks a question in an email, Gmail does not automatically consult a price list and draft a response.

Make.com sits in the middle. It visually connects those tools so that when something happens in App A, data flows seamlessly into App B and App C on its own.

---

### Key Terms You Need to Know (Only 3!)

1. **Scenario:** This is simply the name Make.com gives to a workflow. A scenario is the entire chain of steps from start to finish.
2. **Module:** Each individual circle on your screen is a module. One circle might be Google Sheets, the next circle might be OpenAI, and the third circle might be Gmail.
3. **Operation:** Every time a circle performs one task (like reading an email or adding a row), Make counts it as one operation.

---

### What Can a Beginner Build in Their First 30 Minutes?

Here are three real automations you can construct in half an hour using ready-made connections:

1. **Instant Form-to-Spreadsheet & Alert:**
   When someone fills out a contact form on a website, their details are instantly added to a clean Google Sheet, and the business owner gets an instant ping in Slack or email with a 1-sentence summary.
2. **Automated Review Alerts:**
   When a customer leaves a positive review on Google or Facebook, Make detects it and automatically drafts a personalized thank-you response.
3. **Invoice Reminder Dispatcher:**
   Every Monday morning at 9:00 AM, Make checks a Google Sheet of unpaid invoices. If an invoice is more than 7 days overdue, it automatically drafts a polite reminder email to the client.

---

### How to Get Started for Free
1. Go to [Make.com](https://www.make.com) and click **Sign Up Free**.
2. Create an account using your email or Google login.
3. The free plan gives you **1,000 free operations every single month** and allows you to run up to 2 active scenarios simultaneously.
4. This is more than enough to practice, test, and even run a small live automation for your first client!

---

### Practical Action Task
Create your free account on Make.com. Click on **Templates** in the left sidebar and search for *"Google Sheets"*. Browse three popular templates to see how visual modules connect together.`,
  },
  {
    id: "02-2",
    number: "2.2",
    title: "Step-by-Step: Connecting Google Forms to Instant Email & Spreadsheet Alerts",
    duration: "11 min",
    summary:
      "A complete, click-by-click walkthrough for beginners. Build your very first live automated workflow connecting a form, a spreadsheet, and an email notification.",
    learningObjective:
      "Build, test, and activate a real working Make.com scenario from scratch with zero code.",
    takeaway:
      "Once you connect your first two apps and watch data move automatically with the click of a test button, the fear of automation disappears forever.",
    slides: [
      {
        id: "s-0202-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 02 · LESSON 2.2",
        headline: "STEP-BY-STEP WORKFLOW BUILD",
        subheadline: "Building your first automated lead capture scenario from scratch in 5 simple steps.",
      },
      {
        id: "s-0202-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "The 5-Step Build Blueprint",
        pillars: [
          {
            badge: "STEP 1",
            title: "Create the Form & Sheet",
            description: "Set up a simple 3-field Google Form: Name, Email, and 'What do you need help with?'.",
          },
          {
            badge: "STEP 2",
            title: "Add the Trigger Module",
            description: "In Make, select 'Google Forms > Watch Responses' and link your Google account.",
          },
          {
            badge: "STEP 3",
            title: "Add the Spreadsheet Module",
            description: "Select 'Google Sheets > Add a Row' and map the form answers into columns.",
          },
          {
            badge: "STEP 4",
            title: "Add the Email Alert",
            description: "Select 'Gmail > Send an Email' to send an instant notification with the lead details.",
          },
        ],
      },
      {
        id: "s-0202-3",
        order: 3,
        type: "SCENARIO",
        headline: "Mapping Fields: Connecting the Dots",
        scenario: {
          situation: "You need the person's name from the form to appear in the email greeting.",
          instinctiveReaction: "Wondering how to write code or variables to pull the text.",
          calibratedMove: "Simply click inside the Email Subject box in Make. A popup appears showing your form fields. Click on 'Name' like choosing an emoji.",
          whyItWorks: "Make handles all the data piping behind the scenes visually.",
        },
      },
      {
        id: "s-0202-4",
        order: 4,
        type: "CHECKLIST",
        headline: "Testing & Activation Checklist",
        checklist: [
          { label: "Click 'Run Once' in Make to put the workflow in listening mode", passed: true, note: "Turns the canvas blue" },
          { label: "Submit a real test entry in your Google Form", passed: true, note: "Use your own name and email" },
          { label: "Watch green checkmarks appear on each module bubble", passed: true, note: "Confirms data flowed with zero errors" },
          { label: "Switch the scenario toggle at bottom-left from OFF to ON", passed: true, note: "Makes it run 24/7 on autopilot" },
        ],
      },
      {
        id: "s-0202-5",
        order: 5,
        type: "RECAP",
        headline: "Congratulations!",
        recapPoints: [
          "You just built an end-to-end automated data pipeline without writing code.",
          "This exact 3-step workflow is something small businesses pay $300 to $500 for.",
          "Every advanced automation is just this exact concept with a few extra steps.",
        ],
      },
    ],
    writtenLesson: `# Step-by-Step: Connecting Google Forms to Instant Email & Spreadsheet Alerts

In this lesson, we will walk through building your very first real-world automation together. Follow along step by step.

---

### Step 1: Set Up Your Free Form and Spreadsheet
1. Go to [Google Forms](https://forms.google.com) and create a simple form called **"New Customer Inquiry"**.
2. Add three simple questions:
   - *Full Name* (Short answer)
   - *Email Address* (Short answer)
   - *What do you need help with?* (Paragraph)
3. Open a new tab, go to [Google Sheets](https://sheets.google.com), and create a blank sheet called **"Customer Leads"**.
4. In Row 1, type three column headers:
   - Cell A1: \`Date\`
   - Cell B1: \`Full Name\`
   - Cell C1: \`Email\`
   - Cell D1: \`Inquiry Note\`

---

### Step 2: Open Make.com and Create a New Scenario
1. In your Make.com dashboard, click the purple **"Create a new scenario"** button in the top right corner.
2. You will see a large canvas with a plus sign (\`+\`) in the center. Click that plus sign.
3. Type **"Google Forms"** in the search box and select it.
4. Choose the trigger called **"Watch Responses"**.
5. Click **Add** to connect your Google account (a simple Google login popup will ask for permission).
6. Select your **"New Customer Inquiry"** form from the dropdown list.

---

### Step 3: Add the Google Sheets Module
1. Hover over the right edge of your Google Forms bubble until you see a little plus sign appear, then click it.
2. Search for **"Google Sheets"** and select **"Add a Row"**.
3. Choose your **"Customer Leads"** spreadsheet.
4. Make will automatically detect the columns you created!
5. Click into the **Full Name** field. A small popup window will appear showing the data fields from Step 1. Click on the item that says *Full Name*.
6. Do the same for **Email** and **Inquiry Note**. In the **Date** field, you can select the built-in variable \`now\` (which records the current timestamp).

---

### Step 4: Add the Instant Email Alert
1. Click the plus sign next to the Google Sheets bubble.
2. Search for **"Gmail"** and choose **"Send an Email"**.
3. In the **To** field, enter your own email address (or the client's email address).
4. In the **Subject** field, type: \`New Inquiry from: \` and click the *Full Name* variable from the form.
5. In the **Content** field, type:
   > *"You have a new inquiry!\\n\\nName: [Full Name]\\nEmail: [Email]\\nMessage: [Inquiry Note]"*

---

### Step 5: Test and Turn It On!
1. At the bottom-left corner of the screen, click the big button that says **"Run once"**.
2. Go to your Google Form and fill it out once with test information.
3. Switch back to your Make.com tab: you will see a little green checkmark pop up over all three bubbles!
4. Check your Google Sheet: a new row has appeared.
5. Check your Gmail inbox: your instant alert email is waiting for you!
6. Finally, look at the bottom-left corner of Make.com and flip the switch from **OFF to ON**.

Your automation is now permanently active, working for you 24 hours a day, 7 days a week!

---

### Practical Action Task
Complete the 5 steps above and run your first successful test. Take a screenshot of the green checkmarks in Make.com. You have just completed the exact core skill needed to deliver your first paid automation service.`,
  },
  {
    id: "02-3",
    number: "2.3",
    title: "Real-World Service: Automated Lead Notification Systems for Local Businesses",
    duration: "11 min",
    summary:
      "Turn this simple Make.com workflow into a packaged, sellable service for home contractors, dentists, accountants, and service businesses.",
    learningObjective:
      "Package, pitch, and deliver an automated lead capture and notification system for local businesses.",
    takeaway:
      "Local service businesses lose thousands of dollars every month simply because they take 8 hours to reply to website quote requests. Fixing this is an easy sell.",
    slides: [
      {
        id: "s-0201-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 02 · LESSON 2.3",
        headline: "TURNING MAKE.COM INTO A SERVICE",
        subheadline: "Packaging instant lead response systems for local contractors, clinics, and professionals.",
      },
      {
        id: "s-0201-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "78% of customers buy from the company that responds to their inquiry first.",
        subheadline: "When you install an instant lead alert, you directly increase their customer close rate.",
      },
      {
        id: "s-0201-3",
        order: 3,
        type: "FRAMEWORK",
        headline: "The 'Fast-Responder' Package Deliverables",
        pillars: [
          {
            badge: "COMPONENT 1",
            title: "Clean Contact Form",
            description: "Embed or connect a clean, mobile-friendly inquiry form on their website or social profile.",
          },
          {
            badge: "COMPONENT 2",
            title: "Instant SMS / WhatsApp Ping",
            description: "The business owner's personal phone buzzes within 5 seconds with the caller's name, phone, and project.",
          },
          {
            badge: "COMPONENT 3",
            title: "Immediate Auto-Reply Email",
            description: "The prospective client gets an immediate, friendly email: 'Thanks! We received your request and will call you shortly.'",
          },
        ],
      },
      {
        id: "s-0201-4",
        order: 4,
        type: "COMPARISON",
        headline: "Pricing Models for This Service",
        comparison: {
          leftTitle: "Option A: One-Time Setup",
          leftItems: [
            "Charge $350 - $600 fixed setup fee",
            "Includes form setup, testing, and 14 days of support",
            "Ideal for getting your first 3 to 5 clients quickly",
            "Client covers their own free or $9/mo Make plan",
          ],
          rightTitle: "Option B: Setup + Monthly Care",
          rightItems: [
            "$300 setup fee + $99/month ongoing support",
            "Includes monthly checks, updating email templates",
            "10 clients on this plan = $990/month in steady recurring income",
            "High retention because businesses hate touching software",
          ],
        },
      },
      {
        id: "s-0201-5",
        order: 5,
        type: "RECAP",
        headline: "Key Takeaways",
        recapPoints: [
          "Target local businesses with high ticket values: roofers, plumbers, dentists, lawyers, accountants.",
          "For these businesses, closing just one extra customer pays for your service 5 times over.",
          "Offer to set it up in 48 hours with a 100% satisfaction guarantee.",
        ],
      },
    ],
    writtenLesson: `# Real-World Service: Automated Lead Notification Systems for Local Businesses

Now that you know how to build a 3-step automation in Make.com, let’s explore how to turn this exact skill into a paid service that clients will happily buy.

---

### The Target Client: High-Ticket Local Service Businesses

Do not try to sell this to multinational corporations. Target local, independent service businesses where **a single new customer is worth $500 to $5,000+**:
- **Home Services:** Roofers, HVAC technicians, plumbers, solar installers, painters, landscapers.
- **Health & Wellness:** Cosmetic dentists, physical therapists, chiropractors.
- **Professional Services:** Real estate brokers, mortgage advisors, independent accountants, wedding venues.

---

### The Pain Point You Are Solving

Put yourself in the shoes of a roofing contractor.
They are on a ladder inspecting shingles all day. A homeowner visits their website at 11:30 AM, fills out a quote request form, and waits.
- The roofer doesn't check their email until 7:30 PM.
- By 7:30 PM, the homeowner has already called two competitors who picked up the phone.
- The roofer just lost an **$8,000 roof replacement job** because of an 8-hour communication delay.

When you offer to fix this, you are not selling *"Make.com software."* You are selling **The Instant Lead Recovery System**.

---

### What Your Package Includes

When a client hires you for this service, you provide a simple 3-part deliverable:
1. **Website Form Connection:** You link their existing contact form (WordPress, Squarespace, Wix, or Google Forms) to Make.com.
2. **Instant Phone Notification:** The second someone submits an inquiry, the contractor’s phone gets an instant SMS, WhatsApp message, or Telegram alert:
   > *"🚨 New Quote Request: John Smith (555-0192) needs roof inspection for storm damage in North Suburbs."*
3. **Instant Polite Client Confirmation:** The homeowner immediately gets an automated email:
   > *"Hi John, thanks for reaching out to Apex Roofing! We received your inspection request and our team is reviewing it right now. We'll call you within 30 minutes."*

---

### How Much to Charge

- **Beginner Pricing (First 3 Clients):**
  Charge a flat fee of **$300 to $450**.
  Explain: *"I'm expanding my local client portfolio and offering a discounted setup in exchange for a short video or written review once you see it working."*
- **Standard Pricing (After You Have Testimonials):**
  Charge **$600 to $900** for the setup, or **$400 setup + $99/month** to monitor their alerts and adjust email copy whenever they run seasonal promotions.

If you sign just 2 clients a month at $600 each, you are generating $1,200/month in extra income from a workflow that takes under 2 hours to deploy.

---

### Practical Action Task
Search Google Maps for 5 local service businesses in your town (e.g., search *"roofing repair near me"* or *"chiropractor near me"*). Visit their websites and check their contact forms. Notice how many of them do not offer instant text messaging or immediate automated confirmation. Write down their names.`,
  },
  {
    id: "02-4",
    number: "2.4",
    title: "Pricing Your Workflow, Free Plan Tips, and Your First Action Task",
    duration: "11 min",
    summary:
      "Learn how to manage Make.com pricing efficiently, avoid common beginner mistakes, handle API key connections safely, and complete your Module 2 action task.",
    learningObjective:
      "Manage client account setups, navigate free vs paid limits, and prevent common workflow errors.",
    takeaway:
      "Always set up automations inside the client's own free Make.com account so they own their data and pay any future software fees directly.",
    slides: [
      {
        id: "s-0204-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 02 · LESSON 2.4",
        headline: "WORKFLOW PRICING & BEST PRACTICES",
        subheadline: "Navigating free tiers, avoiding common traps, and delivering clean client handovers.",
      },
      {
        id: "s-0204-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "3 Client Account Setup Rules",
        pillars: [
          {
            badge: "RULE 1",
            title: "Client Owns the Account",
            description: "Have the client create their own free Make account and invite you as a member or collaborator.",
          },
          {
            badge: "RULE 2",
            title: "Never Share Password Credentials",
            description: "Use official Google and Make permission prompts; never ask a client to text you their email password.",
          },
          {
            badge: "RULE 3",
            title: "Set Error Notification Emails",
            description: "Configure Make to email you if a spreadsheet column is accidentally deleted by client staff.",
          },
        ],
      },
      {
        id: "s-0204-3",
        order: 3,
        type: "MYTH_REALITY",
        headline: "Common Beginner Fears",
        mythReality: {
          myth: "If something breaks, the client's business will crash and I'll get into trouble.",
          reality: "Make pauses and saves uncompleted data in an 'Incomplete Executions' queue so nothing is ever lost.",
          takeaway: "You can simply fix the typo or re-link the sheet, click 'Retry', and all pending items process safely.",
        },
      },
      {
        id: "s-0204-4",
        order: 4,
        type: "CHECKLIST",
        headline: "Module 2 Action Task Checklist",
        checklist: [
          { label: "Create free Make.com account", passed: true, note: "Takes 2 minutes" },
          { label: "Build Form -> Sheet -> Email scenario", passed: true, note: "Test with your own email" },
          { label: "Record a 60-second video of your screen showing it work", passed: true, note: "Use Loom or phone video" },
          { label: "Save this video as your first portfolio asset", passed: true, note: "Ready to show prospective clients" },
        ],
      },
      {
        id: "s-0204-5",
        order: 5,
        type: "RECAP",
        headline: "Module 2 Wrap-Up",
        recapPoints: [
          "Make.com gives you the foundation to automate virtually any web tool.",
          "You now have a real, working skill that solves immediate small business problems.",
          "Next up: Tool 2 — Custom GPTs, where we build specialized AI assistants.",
        ],
      },
    ],
    writtenLesson: `# Pricing Your Workflow, Free Plan Tips, and Your First Action Task

As you begin offering Make.com automation services, there are a few practical rules that will save you time, protect your reputation, and ensure smooth client handovers.

---

### Rule 1: Always Have the Client Create Their Own Account
When building a workflow for a business, **never build it inside your personal Make.com account**.
- Have the client visit Make.com and sign up for their own free account.
- For 90% of small businesses, the free tier (1,000 operations/month) is more than enough for their lead volume.
- If they receive more than 1,000 inquiries a month, they can upgrade to Make's Core plan for just **$9 per month**.
- Because the account is in their name, they pay Make directly. You never have to deal with reimbursing software fees or managing their credit card.

---

### Rule 2: How to Handle Client Logins Safely
Never ask a client: *"What is your Gmail password?"*
Make.com uses **OAuth Connections**:
- When you click "Add Connection" in Make, a standard official Google or Microsoft login box pops up.
- You can simply share your screen on a brief Zoom call and let the client click "Allow", or invite your email address as an "Admin / Operator" in their Make team workspace.
- This maintains complete security and builds deep professional trust.

---

### Rule 3: Common Mistakes to Avoid
1. **Renaming Google Sheet Columns After Connecting:**
   If you name a column "Full Name" in Make and then someone goes into Google Sheets and renames it to "Customer Name", Make won't know where to put the data. Remind clients not to change column header names once active.
2. **Forgetting to Turn the Scenario ON:**
   Remember that clicking "Run Once" is only a test. Always check that the toggle switch at the bottom left is flipped to **ON** before finishing.

---

### Your Practical Action Task for Module 2
1. Record a **60-second video** of your computer screen using a free tool like [Loom.com](https://www.loom.com) or your phone camera.
2. In the video:
   - Show your Google Form.
   - Type in a test name like *"Jane Doe"* and click Submit.
   - Switch tabs to your Google Sheet and show the row appearing.
   - Switch to your inbox and show the instant notification email.
3. Say: *"Hi! Here’s a quick demo of how an automated lead notification works. Whenever someone fills out your contact form, you get an instant alert on your phone and the lead is logged automatically."*

Save this video link. This 60-second clip is now your **official demo portfolio**. Whenever someone asks what you do, you can send them this 1-minute video!`,
  },
];

// ==========================================
// MODULE 03: Tool 2 — Custom GPTs: Building Tailored AI Assistants Anyone Can Use
// ==========================================
export const MODULE_03_LESSONS: ExtendedLesson[] = [
  {
    id: "03-1",
    number: "3.1",
    title: "Understanding Custom GPTs: How They Differ from Generic Chatbots",
    duration: "10 min",
    summary:
      "Discover the power of Custom GPTs and AI Projects. Learn how pre-loading instructions, tone rules, and reference files turns a generic chatbot into a specialized business assistant.",
    learningObjective:
      "Explain the difference between a standard ChatGPT conversation and a purpose-built Custom GPT with specialized knowledge.",
    takeaway:
      "A generic AI gives generic answers. A Custom GPT loaded with specific business guidelines acts like an experienced team member who already knows all the rules.",
    slides: [
      {
        id: "s-0301-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 03 · LESSON 3.1",
        headline: "TOOL 2: CUSTOM GPTS",
        subheadline: "Building tailored AI assistants with pre-loaded instructions and specialized knowledge.",
      },
      {
        id: "s-0301-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "Most people get mediocre results from AI because they start every conversation from a blank white box.",
        subheadline: "A Custom GPT eliminates that completely by remembering all rules, tone guidelines, and reference documents permanently.",
      },
      {
        id: "s-0301-3",
        order: 3,
        type: "COMPARISON",
        headline: "Regular ChatGPT vs Custom Assistant",
        comparison: {
          leftTitle: "Generic ChatGPT",
          leftItems: [
            "Starts with zero context every single time",
            "You have to type a 5-paragraph prompt repeatedly",
            "Frequently writes in a robotic, generic tone",
            "Does not know your pricing, services, or guidelines",
          ],
          rightTitle: "Trained Custom GPT",
          rightItems: [
            "Permanently remembers who it is and how to speak",
            "Includes uploaded PDF guides, price lists, and FAQs",
            "One-click starter buttons for common repetitive tasks",
            "Can be shared with clients via a simple private link",
          ],
        },
      },
      {
        id: "s-0301-4",
        order: 4,
        type: "FRAMEWORK",
        headline: "The 3 Core Parts of a Custom Assistant",
        pillars: [
          {
            badge: "PART 1: ROLE",
            title: "Identity & Instructions",
            description: "Who is the assistant, what is its job, and how should it format every response?",
          },
          {
            badge: "PART 2: KNOWLEDGE",
            title: "Reference Files",
            description: "PDFs, spreadsheets, brand guidelines, product catalogs, and sample outputs.",
          },
          {
            badge: "PART 3: ACTIONS",
            title: "Conversation Starters",
            description: "4 clickable prompt buttons that let users get instant results without typing long instructions.",
          },
        ],
      },
      {
        id: "s-0301-5",
        order: 5,
        type: "RECAP",
        headline: "Key Takeaways",
        recapPoints: [
          "Custom GPTs turn repetitive prompting into a 1-click reusable asset.",
          "Anyone with a web browser can build one in under 20 minutes.",
          "Professionals and small businesses will gladly pay you to set them up.",
        ],
      },
    ],
    writtenLesson: `# Understanding Custom GPTs: How They Differ from Generic Chatbots

Almost everyone has tried typing a question into ChatGPT. But 95% of people use it the hard way: they open a blank chat window, type a quick question, receive a generic response, and get frustrated that it sounds robotic or doesn’t understand their specific business.

Enter **Custom GPTs** (and Claude Projects).

---

### What Is a Custom GPT?

A Custom GPT is a specialized version of ChatGPT that has been **pre-trained by you** with specific instructions, brand guidelines, and reference documents.

Instead of re-explaining your business every single time you open the app, a Custom GPT permanently remembers:
- Exactly who it is (e.g., *"You are the Senior Listing Copywriter for Coastal Realty"*).
- What tone to use (e.g., *"Warm, sophisticated, and community-focused; never use cheesy buzzwords like 'nestled' or 'boasts'"*).
- What rules to follow (e.g., *"Always include square footage, bedroom count, and school district rating"*).
- Reference documents you upload (like PDF brochures, price lists, employee handbooks, or sample client proposals).

---

### Why People Pay for Custom Assistants

Imagine you are a fitness coach who sells custom training programs.
- Every week, you spend 4 hours typing out nutrition recommendations, grocery lists, and workout schedules for 10 new clients.
- If you use generic ChatGPT, you have to spend 15 minutes typing in your coaching philosophy, calorie formulas, and banned foods every time.
- But if an automation consultant (you!) builds them a **"Client Workout & Meal Plan Assistant"** loaded with the coach's exact formulas, the coach simply types:
  > *"Client: Mark, 42 years old, goal: lose 15 lbs, 3 days/week gym access, hates broccoli."*
- In 10 seconds, the assistant outputs a complete, formatted plan matching the coach's exact style.

The coach just saved 4 hours a week. To them, paying you **$300 to $500** for that one-time setup is an absolute bargain.

---

### Free vs Paid Platform Options
- **OpenAI Custom GPTs:** Creating custom GPTs requires a ChatGPT Plus subscription ($20/month), but anyone with a free ChatGPT account can *use* public custom GPTs you share with them!
- **Claude Projects (Anthropic):** Similar project-based knowledge system for Claude Pro users.
- **Free Alternative (System Prompts):** If you or your client do not want to pay $20/month, you can save the exact same instructions as a simple text template that the client copies into free ChatGPT, or use free tools like Poe.com.

---

### Practical Action Task
Think of one job or profession (e.g., wedding planner, high school teacher, social media manager, real estate agent). Write down 3 questions they answer or documents they draft repeatedly every week.`,
  },
  {
    id: "03-2",
    number: "3.2",
    title: "Step-by-Step: Building an Assistant with Custom Knowledge Files",
    duration: "11 min",
    summary:
      "A complete walkthrough of the GPT Builder interface. Learn how to craft structured instructions, upload reference PDFs, set conversation starters, and test behavior.",
    learningObjective:
      "Build a functional, specialized custom AI assistant with uploaded reference documentation using the visual GPT builder.",
    takeaway:
      "The secret to a great Custom GPT is not complex code; it is giving it clear boundaries on what it should do and what it should never do.",
    slides: [
      {
        id: "s-0302-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 03 · LESSON 3.2",
        headline: "BUILDING YOUR CUSTOM ASSISTANT",
        subheadline: "A click-by-click walkthrough to crafting your first specialized AI helper.",
      },
      {
        id: "s-0302-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "The 4 Sections of the Configure Tab",
        pillars: [
          {
            badge: "SECTION 1",
            title: "Name & Description",
            description: "Give it a clear, friendly name (e.g., 'Real Estate Listing Crafter') and a 1-sentence description.",
          },
          {
            badge: "SECTION 2",
            title: "Instructions (The System Prompt)",
            description: "The rulebook telling the assistant its role, tone, formatting rules, and banned words.",
          },
          {
            badge: "SECTION 3",
            title: "Conversation Starters",
            description: "4 clickable buttons (e.g., 'Draft a 3-Bedroom Home Listing', 'Write an Open House Email').",
          },
          {
            badge: "SECTION 4",
            title: "Knowledge Files",
            description: "Upload PDFs, Word docs, or CSVs containing sample work and brand guidelines.",
          },
        ],
      },
      {
        id: "s-0302-3",
        order: 3,
        type: "SCENARIO",
        headline: "Instruction Formula That Never Fails",
        scenario: {
          situation: "You want the assistant to write consistent social media posts for a boutique bakery.",
          instinctiveReaction: "Typing: 'Write social media posts for our bakery.' (Results are generic and boring)",
          calibratedMove: "Structure instructions into 4 headers: Role, Target Audience, Formatting Template, and Rules (Always include price, opening hours, and 3 hashtags; never use emojis in headlines).",
          whyItWorks: "Clear constraints produce predictable, high-quality outputs every single time.",
        },
      },
      {
        id: "s-0302-4",
        order: 4,
        type: "CHECKLIST",
        headline: "Quality Testing Checklist",
        checklist: [
          { label: "Test with minimal input to see if it asks helpful clarifying questions", passed: true, note: "Prevents making wild assumptions" },
          { label: "Verify it cites information from your uploaded knowledge file correctly", passed: true, note: "Confirms documents are indexed" },
          { label: "Check output against your banned word list", passed: true, note: "Ensures natural human tone" },
        ],
      },
      {
        id: "s-0302-5",
        order: 5,
        type: "RECAP",
        headline: "Implementation Summary",
        recapPoints: [
          "Always use the 'Configure' tab directly rather than the conversational chat builder.",
          "Upload 2 to 3 good examples of past work so the AI can mimic the style.",
          "Save the assistant as 'Anyone with a link' to share it with your client easily.",
        ],
      },
    ],
    writtenLesson: `# Step-by-Step: Building an Assistant with Custom Knowledge Files

Let’s build a specialized custom assistant together. In this example, we will create the **"Client Welcome Email & Onboarding Assistant"**, a tool that any agency, freelancer, or consultant can use.

---

### Step 1: Open the GPT Builder
1. Log into ChatGPT (chatgpt.com).
2. In the left sidebar, click **Explore GPTs**.
3. In the top right corner, click the **+ Create** button.
4. You will see two tabs at the top: *Create* and *Configure*. **Always click the "Configure" tab.** The Configure tab gives you direct, precise control over the instructions.

---

### Step 2: Fill in the Name and Description
- **Name:** \`Client Onboarding Crafter\`
- **Description:** \`Drafts warm, professional client welcome emails, project timelines, and intake requests in 30 seconds.\`

---

### Step 3: Write the Master Instructions
Paste the following structured template into the **Instructions** box:

\`\`\`markdown
### ROLE & PURPOSE
You are an expert Client Success Manager. Your mission is to help freelancers and consultants draft clear, welcoming, and reassuring onboarding emails for new clients.

### TONE & VOICE
- Warm, organized, professional, and clear.
- Avoid stiff corporate jargon (never say "synergy", "touch base", or "as per our discussion").
- Keep paragraphs short (2 to 3 sentences max) for easy reading on mobile devices.

### REQUIRED EMAIL STRUCTURE
Every welcome email you draft must follow this format:
1. Enthusiastic Welcome: 1-2 warm sentences welcoming the client to the project.
2. Next Steps Checklist: 3 bullet points showing what happens this week.
3. Action Item for Client: 1 clear request (e.g., "Please reply with your logo files").
4. Kickoff Call Reminder: Date and link placeholder for their first meeting.

### RULES
- If the user does not provide the client's name or project type, ask 1 friendly question before generating.
- Always include bracketed placeholders like [Client Name] or [Project Deadline] for easy editing.
\`\`\`

---

### Step 4: Add Clickable Conversation Starters
Under **Conversation starters**, add four helpful sample buttons:
1. \`Draft a welcome email for a web design client\`
2. \`Create an onboarding email for a monthly marketing retainer\`
3. \`Draft a polite email requesting missing brand assets\`
4. \`Write a kickoff call agenda and timeline preview\`

---

### Step 5: Upload Knowledge Files
Under the **Knowledge** section, click **Upload files**.
You can upload:
- A PDF of your client's services and pricing.
- A Word document with 2 or 3 examples of real emails they loved in the past.
- A list of frequently asked questions from new clients.

The assistant will now refer to these exact documents whenever drafting messages!

---

### Step 6: Test and Save
1. In the right-hand **Preview** window, click one of your conversation starter buttons.
2. Review the output. If it’s too formal, edit your instructions in the left pane to say *"Make the tone more relaxed and friendly."*
3. Once satisfied, click the green **Create** or **Update** button in the top right.
4. Choose **Anyone with a link** (so your client can access it via a private URL without it being searchable by the public).

---

### Practical Action Task
Build your first custom assistant following the steps above. Test it in the preview panel with a sample client scenario.`,
  },
  {
    id: "03-3",
    number: "3.3",
    title: "Real-World Service: Creating Industry Assistants for Real Estate & Coaches",
    duration: "11 min",
    summary:
      "Explore high-demand niches that pay for custom AI assistants: real estate agents, fitness coaches, course creators, and boutique consulting firms.",
    learningObjective:
      "Identify high-margin niches, package industry-specific assistants, and present them effectively to non-technical buyers.",
    takeaway:
      "Do not sell a 'Custom GPT'. Sell a '24/7 Listing Copywriter' to a real estate agent or a 'Client Check-In Assistant' to a personal trainer.",
    slides: [
      {
        id: "s-0301-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 03 · LESSON 3.3",
        headline: "SELLING ASSISTANTS AS A SERVICE",
        subheadline: "Packaging industry-tailored AI helpers for coaches, real estate agents, and professionals.",
      },
      {
        id: "s-0301-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "Professionals spend 10 to 15 hours every week writing the exact same 5 types of documents.",
        subheadline: "When you deliver a pre-configured assistant tailored to their industry, you eliminate their writing block forever.",
      },
      {
        id: "s-0301-3",
        order: 3,
        type: "FRAMEWORK",
        headline: "Top 3 Niches That Buy Custom Assistants",
        pillars: [
          {
            badge: "NICHE 1",
            title: "Real Estate Agents",
            description: "Property listing descriptions, neighborhood guides, open house announcements, and follow-up emails.",
          },
          {
            badge: "NICHE 2",
            title: "Online Coaches & Trainers",
            description: "Personalized meal and workout drafts, client check-in feedback, and weekly motivational newsletters.",
          },
          {
            badge: "NICHE 3",
            title: "Local Consultants & Accountants",
            description: "Proposal drafts, client intake questionnaires, service overview memos, and meeting recap notes.",
          },
        ],
      },
      {
        id: "s-0301-4",
        order: 4,
        type: "COMPARISON",
        headline: "The Packaged Offer: Single vs Bundle",
        comparison: {
          leftTitle: "Single Assistant ($250 - $400)",
          leftItems: [
            "1 specialized assistant (e.g. Listing Writer)",
            "Configured with their personal brand voice",
            "Includes 3-minute video showing them how to use it",
            "Quick 24-hour turnaround",
          ],
          rightTitle: "Complete Team Bundle ($750 - $1,200)",
          rightItems: [
            "Suite of 3 assistants (Marketing, Email, Operations)",
            "Includes uploaded company SOPs and past work",
            "30-minute team walkthrough call",
            "Higher value, easily justifies four-figure pricing",
          ],
        },
      },
      {
        id: "s-0301-5",
        order: 5,
        type: "RECAP",
        headline: "Key Takeaways",
        recapPoints: [
          "Pre-load the assistant with real examples from the client's past work.",
          "Record a 3-minute video showing them how easy it is to use.",
          "Selling just three $750 bundles per month equals $2,250/month in income.",
        ],
      },
    ],
    writtenLesson: `# Real-World Service: Creating Industry Assistants for Real Estate & Coaches

Creating a Custom GPT takes about 20 to 30 minutes once you understand the layout. But to a busy professional who has never looked under the hood of ChatGPT, having a tailored tool that speaks in their exact voice feels like pure magic.

Let’s examine how to package and sell this service into two of the most lucrative beginner-friendly niches: **Real Estate Agents** and **Online Coaches**.

---

### Niche A: Real Estate Agents

#### The Problem:
Real estate agents are constantly on the move. They take photos of a new 3-bedroom colonial on Tuesday afternoon. They have to write:
- A compelling MLS property listing (under 1,000 characters).
- An Instagram carousel caption with bullet points.
- An email blast to their buyer database.
- A neighborhood highlights summary.

Most agents spend 2 to 3 agonizing hours staring at a blinking cursor trying to write engaging descriptions.

#### The Solution You Sell:
You build them the **"Coastal Realty Listing & Marketing Assistant"**:
- You upload the agent's 5 best past listing descriptions as knowledge files.
- You set rules: *"Highlight natural light, architectural details, and local walkability; strictly adhere to Fair Housing Advertising regulations."*
- You create 4 conversation starter buttons:
  1. \`Write MLS Listing from Property Bullet Points\`
  2. \`Create Instagram Caption with Key Specs\`
  3. \`Draft Email Blast for New Open House\`
  4. \`Generate Neighborhood Highlights Guide\`

The agent types 5 bullet points into their phone: *"3 bed, 2 bath, renovated kitchen, quartz counters, maple trees, top-rated school district."*
The assistant immediately formats the full MLS listing, Instagram caption, and email blast in 15 seconds.

---

### Niche B: Online Coaches & Course Creators

#### The Problem:
A fitness or business coach has 20 clients. Every Sunday, all 20 clients submit their weekly progress update. The coach spends 5 hours writing personalized feedback, adjusting meal plans, and answering the same basic questions about protein intake or time management.

#### The Solution You Sell:
The **"Coaching Feedback & Accountability Co-Pilot"**:
- Pre-loaded with the coach's core principles, nutrition guidelines, and approved exercise substitutes.
- When the coach pastes a client's weekly update, the assistant drafts a personalized, encouraging response highlighting their wins and suggesting small tweaks for the coming week.
- The coach reviews it, adds their personal touch, and hits send in 45 seconds instead of 15 minutes.

---

### What to Deliver to the Client
When someone buys an assistant from you, do not just send a raw link. Deliver a professional package:
1. **The Private Link:** A direct link granting their team access.
2. **A 3-Minute Loom Walkthrough:** Record your screen demonstrating:
   - *"Here’s how you click the button."*
   - *"Here’s how you paste in your bullet points."*
   - *"Here’s where you copy the final result."*
3. **A 1-Page Cheat Sheet (PDF):** A clean summary with 5 example prompts they can use anytime.

This extra polish makes your $350 – $750 fee feel completely worth it.

---

### Practical Action Task
Pick one local real estate agent or independent coach in your area. Look at their website or Instagram. Write down 3 specific documents they produce regularly that you could automate with a custom assistant.`,
  },
  {
    id: "03-4",
    number: "3.4",
    title: "How to Package & Sell Assistants, Workarounds for Free Users & Action Task",
    duration: "10 min",
    summary:
      "Learn how to deliver assistants to clients who don't have paid ChatGPT subscriptions, establish fair pricing tiers, and complete your Module 3 action task.",
    learningObjective:
      "Package custom AI assistants effectively, navigate client subscription constraints, and complete a client-ready demo assistant.",
    takeaway:
      "A client without a paid ChatGPT Plus subscription can still use free alternative methods, ensuring you never lose a sale over a $20 software barrier.",
    slides: [
      {
        id: "s-0304-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 03 · LESSON 3.4",
        headline: "PACKAGING, PRICING & FREE WORKAROUNDS",
        subheadline: "How to deliver value to any client, regardless of which AI subscription they have.",
      },
      {
        id: "s-0304-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "3 Ways to Deliver an Assistant to Clients",
        pillars: [
          {
            badge: "METHOD 1",
            title: "Direct Custom GPT Link",
            description: "Send the private shareable link. Free ChatGPT users can now use public GPTs with generous usage allowances.",
          },
          {
            badge: "METHOD 2",
            title: "Custom System Prompt Dossier",
            description: "Provide a clean 1-page document with the exact prompt the client pastes into ChatGPT Custom Instructions.",
          },
          {
            badge: "METHOD 3",
            title: "Team Workspace Share",
            description: "Build inside their ChatGPT Team or Claude Team workspace for full multi-user business deployment.",
          },
        ],
      },
      {
        id: "s-0304-3",
        order: 3,
        type: "CHECKLIST",
        headline: "Assistant Delivery Quality Checklist",
        checklist: [
          { label: "Tested with at least 3 realistic client scenarios", passed: true, note: "Verifies formatting and tone consistency" },
          { label: "Recorded 3-minute video walkthrough showing how to use it", passed: true, note: "Reduces client questions to zero" },
          { label: "Uploaded clean, non-confidential reference documents", passed: true, note: "Protects proprietary client data" },
        ],
      },
      {
        id: "s-0304-4",
        order: 4,
        type: "RECAP",
        headline: "Module 3 Wrap-Up",
        recapPoints: [
          "Custom GPTs are one of the fastest digital deliverables you can create.",
          "They solve immediate, painful writing and drafting bottlenecks for busy professionals.",
          "Next up: Tool 3 — ManyChat, where we automate social media DMs and lead capture on Instagram.",
        ],
      },
    ],
    writtenLesson: `# How to Package & Sell Assistants, Workarounds for Free Users & Action Task

As you begin offering Custom AI Assistants to small businesses and professionals, you will occasionally encounter clients who ask:
> *"Do I need to pay $20 a month for ChatGPT Plus to use this?"*

Here is how you handle this smoothly and professionally.

---

### The 3 Ways to Deliver an Assistant

#### Method 1: The Direct Shareable Link (Best for Most Clients)
OpenAI now allows **free ChatGPT users to interact with custom GPTs created by others**, subject to standard message rate limits.
- When you finish building the assistant, set access to **"Anyone with a link"**.
- Send that URL to your client.
- When they click it, the assistant opens right in their browser or mobile ChatGPT app. They can use it immediately without upgrading.

#### Method 2: The "Custom Instructions" Template (Free Workaround)
If the client prefers to use standard free ChatGPT and doesn't want to use an external link:
- Open their ChatGPT settings and click on **Personalization > Custom Instructions**.
- Paste your structured prompt into the box: *"How would you like ChatGPT to respond?"*
- Now, every standard conversation the client opens automatically follows your tone guidelines, formatting rules, and business identity!

#### Method 3: Claude Projects (For Claude Users)
If your client uses Claude by Anthropic, you can set up a **Claude Project**:
- Create a project called *"Agency Copywriting Hub"*.
- Paste the system instructions into Project Knowledge.
- Upload their PDF guidelines and brand files.
- Invite their team members directly.

---

### How to Price This Service

Here is a simple, proven pricing framework:
- **Starter Assistant:** **$250 – $350**
  One single-purpose assistant (e.g., Listing Writer, Email Responder, or Social Caption Creator).
- **Professional Assistant Suite:** **$600 – $900**
  A set of three coordinated assistants (e.g., Lead Qualifier + Content Drafter + Client Onboarding Guide).
- **Ongoing Maintenance Retainer (Optional):** **$99 – $150 / month**
  You review their assistant's outputs once a month, update knowledge files with new seasonal products or pricing, and refine prompts as their business grows.

---

### Your Practical Action Task for Module 3
1. Choose an industry you find interesting (e.g., Real Estate, Fitness, Photography, or Local Restaurants).
2. Build one specialized custom assistant inside ChatGPT or write a structured master prompt following the format in Lesson 3.2.
3. Test it with 2 sample prompts to ensure it produces polished, human-sounding results.
4. Record a quick 2-minute Loom video walking through how it works. Save this link in your portfolio folder alongside your Make.com demo!`,
  },
];
