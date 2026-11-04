import { PlaybookArticle } from "./types";

export const FIVE_SIMPLE_APPS_10K_ARTICLE: PlaybookArticle = {
  slug: "5-simple-apps-making-10-000-month-that-you-can-build-with-ai",
  title: "5 Simple Apps Making $10,000/month That You Can Build with AI",
  readingTime: "30 min read",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793023911/5_Simple_Apps_Making_10_000_Month_That_You_Can_Build_With_AI.png",
  publishedDate: "2026",
  authorName: "Kelvin Ng",
  authorTitle: "Micro-SaaS Architect & Mobile Product Operator",
  introParagraphs: [
  "Introduction: Small apps can solve valuable problems\nNot every profitable software business needs to become the next billion-dollar startup.",
  "Some successful apps focus on one ordinary, recurring problem: tracking a fast, recording water intake, following habits, understanding mood patterns, or planning a day visually. Their interfaces can be simple. Their value comes from helping users complete a small task repeatedly, making progress visible, and offering more advanced tools once the basic experience becomes part of a routine.",
  "The opportunity is not to copy an app screen and hope people pay for it. It is to understand why an existing product is useful, confirm that a market already pays for this kind of solution, identify an audience or use case that is underserved, and build a meaningfully differentiated version.",
  "This playbook focuses on five app models from the source material:\n1. **Fasting and routine tracking**.\n2. **Hydration tracking with playful rewards**.\n3. **Habit tracking and custom routines**.\n4. **Quick mood journaling and pattern analysis**.\n5. **Visual daily planning for people who struggle with conventional planners**.\n\nTwo additional examples—guided behavioural routines and shared expense splitting—are included as bonus case studies because they reveal two more valuable product patterns.",
  "Important note about revenue figures\nThe revenue and download figures in the source are described as Sensor Tower estimates for the United States iOS market. They are not audited financial statements or confirmed figures supplied by the app companies. They may not represent Android revenue, global revenue, net revenue after platform fees, refunds, taxes, or operating costs.\n\nTreat them as market signals—not guarantees. A competing app's estimated revenue can show that users spend money in a category. It cannot prove that your particular product will attract users or earn a particular amount."
],
  chapters: [
  {
    "id": "chapter-1",
    "number": 1,
    "title": "Part I — The Micro-App Opportunity: The One-Problem Product",
    "paragraphs": [
      "Part I — The Micro-App Opportunity\n1. The one-problem product\nA focused app is built around a clear job the user wants to complete.",
      "Examples:\n- “Help me track how long I have been fasting.”\n- “Help me remember to drink water.”\n- “Help me follow the habits I have chosen.”\n- “Help me record my mood in a few seconds.”\n- “Help me see my day as a visual sequence of tasks.”\nThese products do not need to become all-purpose productivity platforms. In fact, focus can be an advantage.",
      "A narrow product is often:\n- Easier to explain.\n- Easier for a new user to understand.\n- Faster to prototype.\n- Easier to test with a specific audience.\n- Easier to measure.\n- More likely to deliver one clear outcome well.\nThe key is not to make the app artificially small. It is to keep the product centred on the problem that gives users a reason to return.\nThe one-screen test\nImagine explaining the app to someone in one sentence.",
      "If you need a long explanation before the person understands what it does, the product may be trying to do too much.",
      "A useful product statement follows this structure:",
      "“This app helps [specific user] do [specific task] so they can [desired outcome].”",
      "Examples:\n- “This app helps people who follow fasting schedules track sessions and review their consistency.”\n- “This app helps people who forget to drink water record drinks and see progress toward a daily goal.”\n- “This app helps people organise recurring routines and understand how consistently they complete them.”\nOne problem does not mean one feature\nA focused app can still include several supporting features. The distinction is that those features reinforce the same user outcome.",
      "For example, a hydration app may include:\n- Drink logging.\n- Daily goals.\n- Reminders.\n- Streaks.\n- A calendar.\n- Custom beverage types.\nThese features all support hydration tracking. Adding an unrelated task manager, social network, and note-taking system would weaken the product's focus."
    ]
  },
  {
    "id": "chapter-2",
    "number": 2,
    "title": "Why Recurring Problems Create Sustainable Subscription Opportunities",
    "paragraphs": [
      "2. Why recurring problems create subscription opportunities\nThe strongest examples in this category solve problems that repeat.",
      "A one-time calculator may be useful once. A habit tracker can be useful every morning. A shared expense tool can remain useful throughout a trip or shared household arrangement.",
      "Recurring behaviour creates recurring opportunities to deliver value.",
      "The product loop often looks like this:\n1. The user opens the app to complete a small action.\n2. The app makes that action quick.\n3. The app records the action.\n4. The app shows progress or useful history.\n5. The user returns because the next day creates another reason to use it.\n6. Premium features become more valuable as the user's history or needs grow.\nThe basic utility creates the habit. The accumulated data, advanced controls, or additional convenience can support a paid tier.\nThe habit-to-subscription loop\n| Stage | User experience | Product opportunity |\n| --- | --- | --- |\n| First use | Understands the app quickly | Simple onboarding |\n| First action | Completes a useful task | Fast core interaction |\n| Repeated use | Returns to log another day or event | Reminders and progress |\n| Accumulated history | Has enough data to see patterns | Charts and insights |\n| Advanced need | Wants more flexibility or depth | Premium features |",
      "A subscription should not exist merely because the builder wants recurring revenue. It should correspond to continuing value.\nWhat users may pay for\nThe source examples repeatedly use several premium-value patterns:\n- Longer or unlimited history.\n- More tracked items or customisation.\n- Deeper charts and analytics.\n- Personalised goals or schedules.\n- Exporting data.\n- Advanced routines or guided content.\n- Shared or collaborative functionality.\n- Reduced limits and additional convenience.\nThe free experience should be useful enough to demonstrate the product's value. The paid experience should make sense once the user has a reason to need more."
    ]
  },
  {
    "id": "chapter-3",
    "number": 3,
    "title": "Reverse-Engineer Demand: Category Research & App Store Signal Analysis",
    "paragraphs": [
      "3. Reverse-engineer demand before building\nThe central strategy is to start with evidence of existing demand rather than inventing an idea and hoping people want it.",
      "A market with several successful apps in the same category can be a useful signal. It suggests that:\n- People recognise the problem.\n- Users are willing to download solutions.\n- At least some users pay for advanced features.\n- More than one product may be able to serve the category.\nIt does not mean every entrant will succeed. Competition may be intense, acquisition may be expensive, and existing products may have advantages that are difficult to reproduce.\nResearch with app intelligence tools\nThe source uses Sensor Tower as an example of a tool for examining mobile app performance. Its public app overview pages can provide estimates such as:\n- Monthly downloads.\n- Estimated monthly revenue.\n- Category rankings.\n- App-store performance.\nThe source notes that public overview information may be accessible without a paid subscription, although access and available fields can change.\nA practical research workflow\nStep 1: Search the category, not just one app.",
      "If you are interested in hydration tracking, search for several hydration apps. If you are interested in visual planning, inspect multiple products serving similar needs.",
      "Step 2: Record several competitors.",
      "Do not base your decision on one apparent winner. Look for multiple products with meaningful activity.",
      "Step 3: Compare estimated downloads and revenue.",
      "Look for evidence that users are both discovering the product and paying for it.",
      "Step 4: Check category position.",
      "A product's category ranking can help put its estimated performance into context.",
      "Step 5: Study the actual experience.",
      "Install or inspect the product where possible. Note:\n- What happens on the first screen?\n- What is the main action?\n- How long does it take?\n- What encourages a return visit?\n- What is free?\n- What is paid?\n- What seems confusing or missing?\nStep 6: Find a reason to be chosen.",
      "Do not simply reproduce the market leader. Consider:\n- A more specific audience.\n- A simpler experience.\n- A better workflow.\n- A distinctive visual approach.\n- A feature that solves a repeated complaint.\n- Better accessibility or localisation.\n- A clearer free-to-paid transition.\nA competitor research table\n| App | Core problem | Estimated downloads | Estimated revenue | Free experience | Premium value | Weakness / opportunity |\n| --- | --- | --- | --- | --- | --- | --- |\n| Competitor A |  |  |  |  |  |  |\n| Competitor B |  |  |  |  |  |  |\n| Competitor C |  |  |  |  |  |  |\n| Competitor D |  |  |  |  |  |  |",
      "What counts as a strong signal?\nThe source suggests that seeing several apps in a category earning meaningful estimated monthly revenue—using roughly $30,000 per month as an illustrative threshold—is stronger evidence than finding one isolated success.",
      "Use that as a research heuristic, not a universal cutoff. A smaller niche can still be attractive if users have a strong need, acquisition is accessible, and the economics work."
    ]
  },
  {
    "id": "chapter-4",
    "number": 4,
    "title": "Part II — App Model 1: Fasting Tracker & Daily Routine Timer",
    "paragraphs": [
      "Part II — Five App Models Worth Studying\n4. App model one: Fasting tracker and daily routine app\n<badge color=\"success\">Core model 1</badge>",
      "<text color=\"secondary\" size=\"sm\">Reference product discussed: Zero</text>\nThe problem\nPeople who follow a fasting schedule may want to know:\n- When a fasting session started.\n- How long it has lasted.\n- When it ends.\n- How their sessions compare over time.\n- Whether they are following their chosen routine consistently.\nA simple timer can solve the immediate problem. Session history and progress views make the app more useful over time.\nThe core experience\nThe reference product combines several focused elements:\n1. Start and stop a fasting timer.\n2. Select a fasting protocol.\n3. Record completed sessions.\n4. View session history.\n5. Track a streak.\n6. Review average fasting duration.\n7. See progress over time.\nThe timer supports the immediate task. History and streaks support repeated use. The dashboard helps users understand their own pattern.\nWhy the model can monetise\nThe free version can provide enough functionality for a person to try the habit and record a limited number of sessions.",
      "Premium features can include:\n- Unlimited session logging.\n- Weekly trend charts.\n- Longer-term history.\n- Additional progress views.\nThe paid features become easier to understand after the user has accumulated sessions and wants a broader view of their behaviour.\nRevenue signal in the source\nThe source reports Sensor Tower estimates of approximately:\n- 40,000 monthly downloads.\n- $300,000 monthly revenue from US iOS users.\nThese are third-party estimates presented in the source, not verified company figures. They should not be interpreted as the amount a new fasting app could expect to earn.\nSuggested MVP\nKeep the first version focused:",
      "Main screen\n- Current session status.\n- Start / stop control.\n- Selected protocol.\n- Elapsed time.\n- Next milestone or target.\nHistory\n- Date.\n- Start time.\n- End time.\n- Duration.\n- Selected protocol.\nProgress\n- Number of completed sessions.\n- Average duration.\n- Current streak.\n- Simple weekly trend.\nAccount\n- Sign-in.\n- User preferences.\n- Subscription status.\nSuggested free and premium split\n| Free | Premium |\n| --- | --- |\n| Limited number of saved sessions | Unlimited session history |\n| Basic timer | Weekly and longer-term trends |\n| Basic session list | Deeper progress views |\n| Standard protocols | Additional customisation, if validated |",
      "The source's demonstration used a five-session free limit. That is a prototype example, not a proven optimal pricing boundary. Test limits with users rather than assuming five is the right number.\nAI build brief\nUse the following as a starting prompt in an AI app builder:\nBuild a clean fasting-session tracker for users who want to record and review their fasting routines.",
      "The main screen must show whether a session is active, the selected protocol, the start time, and a live elapsed-time display. Include clear Start and End Session actions. Provide common protocol presets such as 16:8, 18:6, and 24-hour, while allowing users to choose a custom target where appropriate.",
      "Create a session history with date, start time, end time, duration, and protocol. Add a dashboard showing total completed sessions, average session duration, current streak, and a simple weekly trend chart.",
      "Include user authentication and ensure each user can access only their own records. Provide a useful free tier with a limited history and a premium tier that unlocks unlimited records and advanced trend views.",
      "Use a calm, readable interface with a dark background and restrained green accents. Prioritise a fast timer interaction, accessible text, clear states, and responsive layouts.",
      "Include validation for incomplete sessions, time-zone handling, session edits, and interrupted sessions. Do not make medical claims or recommend fasting schedules. Clearly communicate that the app is a tracking tool, not medical advice.",
      "Important product safeguards\nFasting is not appropriate for everyone. A tracking app should not pressure users to extend a fast, shame them for breaking a streak, or imply that a longer fast is inherently better. Avoid personalised medical recommendations unless the product has appropriate clinical oversight. Give users control over notifications and make it easy to stop tracking.\nDifferentiation ideas\nPotential directions to validate:\n- A simpler timer for users who dislike complex dashboards.\n- A routine tracker that records fasting without encouraging competitive streaks.\n- A culturally localised product with relevant time formats and language support.\n- A privacy-first tracker with clear data controls.\n- A product designed around user-defined routines rather than prescriptive targets."
    ]
  },
  {
    "id": "chapter-5",
    "number": 5,
    "title": "App Model 2: Hydration Tracker With Playful Rewards & Visual Gamification",
    "paragraphs": [
      "5. App model two: Hydration tracker with playful rewards\n<badge color=\"success\">Core model 2</badge>",
      "<text color=\"secondary\" size=\"sm\">Reference product discussed: Waterllama</text>\nThe problem\nPeople may intend to drink water regularly but forget, lose track of how much they have consumed, or find plain tracking apps boring.",
      "A hydration tracker solves the logging problem. A daily goal makes progress visible. Reminders support recall. A playful reward system can make repeated logging more enjoyable.\nThe core experience\nThe reference model combines:\n- Drink logging by type and amount.\n- A daily hydration target.\n- A progress bar.\n- Reminders.\n- Streak tracking.\n- A calendar of completed days.\n- Collectible characters or rewards.\n- A home-screen widget.\nThe character system is not the core utility. It gives the app a memorable personality and makes the progress loop feel rewarding.\nWhy the model can monetise\nThe basic act of logging a drink can remain free.",
      "Premium features may include:\n- Custom drink types.\n- More flexible goals.\n- Hydration charts.\n- Personalised settings.\n- More detailed history.\nA user who logs drinks repeatedly may value additional flexibility and insight.\nRevenue signal in the source\nThe source reports Sensor Tower estimates of approximately:\n- 80,000 monthly downloads.\n- $80,000 monthly revenue from US iOS users.\nThese are estimates, not verified company financials.\nSuggested MVP\nDaily dashboard\n- Daily target.\n- Amount recorded.\n- Remaining amount.\n- Progress indicator.\n- Quick-add buttons.\nDrink logging\n- Drink type.\n- Amount.\n- Time.\n- Optional custom drink.\nConsistency\n- Daily streak.\n- Calendar.\n- Reminder preferences.\nRewards\n- A small collection of unlockable characters, badges, or visual themes.\nSuggested free and premium split\n| Free | Premium |\n| --- | --- |\n| One or a few drink types | Custom beverage types |\n| Basic daily goal | Personalised goal settings |\n| Daily progress | Historical charts |\n| Basic streak and calendar | More detailed history and insights |",
      "The source's demonstration used one beverage type for free users and unlocked custom drinks, charts, and personalised settings through a subscription. Treat this as a prototype structure, not a proven conversion formula.\nAI build brief\nBuild a friendly hydration-tracking app that makes it quick to record drinks and see progress toward a daily goal.",
      "The dashboard must show the user's daily target, total recorded intake, remaining amount, and a clear progress bar. Allow users to add a drink by selecting its type and amount. Include quick-add actions for common amounts and a history of today's entries.",
      "Add a calendar showing days when the user reached their chosen goal, a consistency streak, and optional reminders. Include a small reward system with unlockable characters or visual items that are earned through consistent use.",
      "Add authentication and user-specific data storage. The free plan should support basic logging and a limited selection of drink types. The premium plan should support custom beverages, historical charts, and more flexible goal settings.",
      "Use a bright, friendly visual style with light blue accents, clear typography, and large touch targets. Make logging possible in as few steps as practical.",
      "Include settings for units, reminder frequency, notification permissions, and data deletion. Do not present hydration targets as medical prescriptions. Let users set or adjust their own goals and explain that individual needs vary.",
      "Product differentiation\nPotential opportunities:\n- A very fast one-tap logging interface.\n- Local beverage presets.\n- A widget-first experience.\n- A less childish design for adults.\n- A family or household view, if users validate the need.\n- Strong accessibility and reminder controls.\nThe lesson\nA basic utility can become more engaging when the product has a recognisable personality. The design should reinforce the behaviour—not distract from it."
    ]
  },
  {
    "id": "chapter-6",
    "number": 6,
    "title": "App Model 3: Habit Tracker & Custom Routine Manager",
    "paragraphs": [
      "6. App model three: Habit tracker and custom routine manager\n<badge color=\"success\">Core model 3</badge>",
      "<text color=\"secondary\" size=\"sm\">Reference product discussed: Productive</text>\nThe problem\nPeople often have several habits they want to follow but struggle to organise them, remember their schedules, or understand whether they are becoming consistent.",
      "A habit app makes the routine visible and gives the user a simple way to mark completion.\nThe core experience\nThe reference model includes:\n- Creating multiple habits.\n- Daily and weekly schedules.\n- Selected weekdays.\n- A completion checklist.\n- Morning and evening routine groups.\n- Streak visuals.\n- Completion statistics.\n- Monthly progress.\nThe product is narrower than a general productivity suite. It focuses on habit formation and consistency.\nWhy the model can monetise\nA basic habit checklist can be free.",
      "As users add more habits and become more invested in their routines, premium features may become useful:\n- More habits.\n- Custom schedules.\n- Separate routine groups.\n- Monthly statistics.\n- More detailed progress history.\nThe subscription expands the experience when the user has outgrown the basic version.\nRevenue signal in the source\nThe source reports Sensor Tower estimates of approximately:\n- 40,000 monthly downloads.\n- $80,000 monthly revenue from US iOS users.\nThese are third-party estimates, not audited figures.\nSuggested MVP\nHabit creation\n- Name.\n- Optional icon or colour.\n- Schedule.\n- Selected days.\n- Routine group.\nDaily checklist\n- Habits due today.\n- Completion toggle.\n- Clear completed and pending states.\nProgress\n- Current streak.\n- Weekly completion percentage.\n- Basic calendar or history.\nRoutine groups\n- Morning.\n- Afternoon.\n- Evening.\n- Custom groups, if validated.\nSuggested free and premium split\n| Free | Premium |\n| --- | --- |\n| Up to three habits | More or unlimited habits |\n| Basic daily and weekly schedules | Custom schedules |\n| Basic checklist | Multiple routine groups |\n| Simple streak display | Monthly statistics and deeper history |",
      "The three-habit limit comes from the source's demonstration prompt. It is a possible packaging choice, not a universal recommendation.\nAI build brief\nBuild a focused habit tracker that helps users create routines and complete scheduled habits consistently.",
      "Users must be able to create a habit with a name, optional icon, colour, schedule, and routine group. Support daily schedules, selected weekdays, and weekly schedules. Provide morning and evening groups by default.",
      "The main dashboard must show the habits due today as a checklist. When a user marks a habit complete, update the completion state, streak, and weekly completion percentage. Include a history view so users can understand their consistency over time.",
      "Add authentication and store each user's habits and completion records separately. The free plan should allow up to three habits with basic scheduling and progress. The premium plan should unlock more habits, custom schedules, additional routine groups, and monthly statistics.",
      "Use a clean white interface with simple typography and a calm visual hierarchy. Make the daily checklist the centre of the experience. Avoid unnecessary project-management features.",
      "Handle missed days, schedule changes, time zones, habit deletion, and edits without corrupting historical completion records. Give users control over reminders and streak settings.",
      "What makes this product different?\nThe product's value is not the checkbox itself. It is the combination of:\n- A clear schedule.\n- A low-friction daily action.\n- A history of completed behaviour.\n- A useful view of consistency.\nDifferentiation ideas\n- A minimal tracker for people who dislike feature-heavy productivity apps.\n- A routine planner for students.\n- A habit app built around shift workers' schedules.\n- A private, offline-friendly habit tracker.\n- A tracker that focuses on weekly consistency rather than punishing missed days."
    ]
  },
  {
    "id": "chapter-7",
    "number": 7,
    "title": "App Model 4: Mood Journal & Quick Emotional Check-in",
    "paragraphs": [
      "7. App model four: Mood journal and quick emotional check-in\n<badge color=\"success\">Core model 4</badge>",
      "<text color=\"secondary\" size=\"sm\">Reference product discussed: Daylio</text>\nThe problem\nTraditional journaling can feel like too much effort. Someone may want to record how they feel but not want to write a full entry every evening.",
      "A quick mood check-in reduces the effort required to create a personal record. Over time, the accumulated entries may help the user notice patterns.\nThe core experience\nThe reference model includes:\n- A small set of mood levels represented by emojis.\n- Activity tags such as work, exercise, and sleep.\n- A fast daily entry.\n- A scrollable history.\n- Mood trend charts.\n- Activity correlation views.\n- Custom mood levels.\n- Data export.\nThe product's core insight is that logging should take only a few seconds. The value of the history grows as more entries accumulate.\nWhy the model can monetise\nThe free experience helps users build the logging habit.",
      "Premium features can unlock:\n- Unlimited entries.\n- Full history.\n- Trend charts.\n- Activity comparisons.\n- Custom mood levels.\n- CSV export.\nThe user can begin with a simple check-in and later pay for deeper ways to explore the record.\nRevenue signal in the source\nThe source reports Sensor Tower estimates of approximately:\n- 50,000 monthly downloads.\n- $100,000 monthly revenue from US iOS users.\nThese figures are estimates and should not be treated as verified financial statements.\nSuggested MVP\nQuick entry\n- Five selectable mood levels.\n- Optional activity tags.\n- Optional short note.\n- Date and time.\nHistory\n- Scrollable daily entries.\n- Calendar view.\n- Edit or delete controls.\nInsights\n- 30-day mood trend.\n- Activity frequency.\n- Simple descriptive summaries.\nExport\n- CSV export for users who want a copy of their records.\nSuggested free and premium split\n| Free | Premium |\n| --- | --- |\n| Limited number of entries | Unlimited entries |\n| Basic mood check-in | Full history |\n| Basic activity tags | Custom tags and mood levels |\n| Recent entry list | Trend and activity charts |\n| — | CSV export |",
      "The source's example used a ten-entry free limit. This is a prototype boundary, not evidence that ten is the best limit.\nAI build brief\nBuild a private mood-journaling app where a user can record a daily mood in a few seconds without writing a long journal entry.",
      "Provide five selectable mood levels with clear emoji-based visual labels. Allow users to add activity tags such as work, exercise, sleep, social time, and rest. Include an optional short note. Save each entry with a date and time.",
      "Create a scrollable history and a calendar view. Add a 30-day mood trend chart and simple activity-frequency views. Where the data supports it, show descriptive comparisons between logged activities and mood entries. Do not imply that correlations establish causation.",
      "Include authentication and strict user-specific data access. The free plan should allow a limited number of entries. Premium should unlock unlimited entries, complete history, custom mood levels, deeper charts, and CSV export.",
      "Use a soft pastel visual style, simple language, and a very fast entry flow. Make the app private by default, with clear controls for editing, exporting, and deleting personal records.",
      "Do not diagnose conditions, provide clinical conclusions, or present mood correlations as medical evidence. Clearly explain that the app is a personal reflection tool and not a substitute for professional mental-health care.",
      "Privacy and trust are product features\nMood data can be sensitive. A product in this category should:\n- Explain what information is collected.\n- Avoid unnecessary collection.\n- Restrict access to the user's own records.\n- Protect stored data.\n- Offer deletion and export controls.\n- Avoid exposing private entries in public profiles or leaderboards.\n- Make notifications discreet and configurable.\nDifferentiation ideas\n- A private mood log with no social feed.\n- A check-in designed for people who dislike writing.\n- A journaling app with strong export and data portability.\n- A mood-and-routine diary that avoids medical claims.\n- A lightweight tool with custom activity tags."
    ]
  },
  {
    "id": "chapter-8",
    "number": 8,
    "title": "App Model 5: Visual Daily Planner for Neurodivergent Users & Visual Timelines",
    "paragraphs": [
      "8. App model five: Visual daily planner for neurodivergent users\n<badge color=\"success\">Core model 5</badge>",
      "<text color=\"secondary\" size=\"sm\">Reference product discussed: Tiimo</text>\nThe problem\nTraditional calendars often present a day as a list of events, blocks, and small text. Some people find this difficult to interpret or follow.",
      "The source describes users who may experience challenges with:\n- Time awareness.\n- Executive function.\n- Knowing when to begin.\n- Estimating how long an activity will take.\n- Moving from one task to the next.\nThe reference product is designed around a visual timeline rather than expecting every user to adapt to a conventional calendar.\nThe core experience\nThe model includes:\n- Colour-coded task blocks.\n- A vertical daily timeline.\n- Task title, colour, start time, and duration.\n- A visible countdown timer.\n- Transition reminders.\n- Schedule templates.\n- Optional sharing with an accountability partner.\nThe visual design is functional. It helps users see what is happening now and what comes next.\nWhy the model can monetise\nThe paid value is not merely additional calendar entries. It is a workflow tailored to a specific audience.",
      "Premium features can include:\n- More daily blocks.\n- Recurring schedule templates.\n- More flexible planning.\n- Transition reminders.\n- Sharing or accountability features.\nA product that understands a particular audience's workflow can be more valuable than a generic tool with a larger feature list.\nRevenue signal in the source\nThe source reports Sensor Tower estimates of approximately:\n- 90,000 monthly downloads.\n- $200,000 monthly revenue from US iOS users.\nThese are third-party estimates, not verified revenue figures from the company.\nSuggested MVP\nVisual schedule builder\n- Create a task block.\n- Set title.\n- Choose colour.\n- Set start time.\n- Set duration.\n- Add optional emoji.\nTimeline\n- Display the day's blocks vertically.\n- Highlight the active block.\n- Show remaining time.\n- Make the next activity visible.\nReminders\n- Optional transition warning.\n- Configurable notification timing.\n- Easy snooze or dismissal.\nTemplates\n- Save a recurring daily schedule.\n- Reuse a template.\n- Edit one day's plan without unexpectedly changing every future day.\nSuggested free and premium split\n| Free | Premium |\n| --- | --- |\n| Up to five daily blocks | More or unlimited blocks |\n| Basic visual timeline | Recurring schedule templates |\n| Basic countdown | More flexible planning |\n| Basic reminders | Advanced reminder settings |\n| — | Optional sharing tools |",
      "The source's prototype used five blocks per day as the free limit. Validate the limit with actual users.\nAI build brief\nBuild a visual daily planner for people who prefer a clear timeline over a conventional calendar or dense task list.",
      "Users must be able to create schedule blocks with a title, colour, start time, duration, and optional emoji. Display the blocks in a vertical, colour-coded timeline with readable labels and a clear indication of the current activity.",
      "When a block becomes active, show a live countdown timer. Display the next scheduled activity and provide an optional transition reminder before it begins. Allow users to create and reuse recurring schedule templates.",
      "Use large readable text, strong contrast, clear spacing, and a low-clutter layout. Make the interface responsive and accessible. Avoid relying on colour alone to communicate task status; include text labels and other visual cues.",
      "Include authentication and user-specific storage. The free plan should support a limited number of daily blocks. Premium should unlock more blocks and recurring schedule templates.",
      "Provide flexible reminder controls, time-zone handling, schedule editing, and a way to pause or disable notifications. Ensure the app does not make assumptions about a user's diagnosis or needs. Let users customise the experience.",
      "Why this is a strong niche model\nThe product is designed around a specific set of user problems rather than trying to serve everyone.",
      "That can create a clearer value proposition:\n- The audience recognises its own problem.\n- The product's design choices have a reason.\n- The user can understand why the app differs from a generic planner.\n- Recommendations may travel through communities where people share useful tools.\nThe source identifies this category as a particularly interesting opportunity because it sees a need for tools built around time awareness and executive-function challenges. That is a hypothesis to validate, not proof that the market is underserved today.\nBuild with the audience, not just for the audience\nIf you pursue this category:\n- Speak with people who experience the workflow problem.\n- Ask what they currently use.\n- Observe where existing planners fail them.\n- Test prototypes with a diverse range of users.\n- Make accessibility and customisation central.\n- Avoid presenting the app as a treatment or medical intervention."
    ]
  },
  {
    "id": "chapter-9",
    "number": 9,
    "title": "Part III — Bonus Case Studies: Guided Behavioural Routines & Expense Splitting",
    "paragraphs": [
      "Part III — Two Bonus Case Studies\n9. Bonus app: Guided behavioural routines\n<text color=\"secondary\" size=\"sm\">Reference product discussed: Fabulous</text>",
      "This example is included as a bonus because it extends the habit-tracking model into guided routines and educational content.\nThe problem\nA checklist can tell someone what to do, but it may not help them understand how to build a routine or stay engaged.",
      "The reference product guides users through routines in stages rather than simply presenting an empty list.\nThe core experience\n- Morning, afternoon, and evening routines.\n- Guided journeys that introduce behaviours gradually.\n- Coaching content explaining the reasoning behind steps.\n- Guided audio sessions.\n- Behaviour and progress insights.\n- A community or accountability layer.\nThe paid value comes from the guidance and content surrounding the tracker.\nRevenue signal in the source\nThe source reports Sensor Tower estimates of approximately:\n- 40,000 monthly downloads.\n- $70,000 monthly revenue from US iOS users.\nThese are estimates, not verified company financials.\nSuggested MVP\nStart with:\n- Three routine categories.\n- A sequence of steps for each routine.\n- A name and duration for each step.\n- A motivational or explanatory tip.\n- A guided session with a timer.\n- A completion summary.\n- A weekly streak.\nAI build brief\nBuild a guided routine app that helps users follow structured morning, afternoon, and evening sequences.",
      "Each routine contains ordered steps. Each step has a name, optional duration, and short explanatory tip. Starting a routine should guide the user through one step at a time with a countdown when a duration is specified.",
      "At the end, show a completion summary and update the user's weekly consistency record. Allow users to save and repeat routines.",
      "Keep the initial version focused on routine execution. Use a clean interface with clear progress and simple navigation. Add authentication and private user-specific storage.",
      "Do not generate unsupported psychological or medical claims. Present educational material as general guidance, and allow users to customise or skip steps.",
      "Product lesson\nA tracker records behaviour. A guided program helps the user understand and perform it. Adding useful instruction can create a stronger premium proposition than simply adding more checkboxes.\n10. Bonus app: Shared expenses and bill splitting\n<text color=\"secondary\" size=\"sm\">Reference product discussed: Splitwise</text>",
      "This example has a different growth mechanism. Its value increases when other people join the same group.\nThe problem\nSplitting one bill between two people is simple. Tracking many expenses across a trip, household, or group becomes confusing.",
      "People need to know:\n- Who paid.\n- Who participated.\n- How each expense should be split.\n- Who owes whom.\n- How the group can settle the balance.\nThe core experience\n- Create a group.\n- Add members.\n- Record shared expenses.\n- Split equally or using custom amounts.\n- Maintain a running balance.\n- Show suggested settlements.\nPremium features described in the source include:\n- Receipt scanning.\n- Spending categories.\n- Currency conversion.\n- More groups.\n- Simplified debt settlement.\nWhy this model can grow\nA person cannot get the full value of a group expense tool entirely alone. They invite roommates, friends, or travel companions.",
      "Each new member has a reason to use the product because they are involved in the shared expenses. The product's utility can therefore create invitations naturally.\nRevenue signal in the source\nThe source reports Sensor Tower estimates of approximately:\n- 500,000 monthly downloads.\n- $400,000 monthly revenue from US iOS users.\nThese are third-party estimates and not verified company financials.\nSuggested MVP\nGroups\n- Create a group.\n- Invite members.\n- View group activity.\nExpenses\n- Description.\n- Amount.\n- Payer.\n- Participants.\n- Equal or custom split.\nBalances\n- Net balance per member.\n- Who owes whom.\n- Suggested settlement sequence.\nAI build brief\nBuild a shared expense-splitting app for groups of friends, roommates, or travel companions.",
      "Users must be able to create a group, add or invite members, and record expenses with a description, amount, payer, and participating members. Support equal splits and custom amounts.",
      "Maintain a running balance for each group member. Create a settlements view that calculates a practical way to settle outstanding balances while avoiding unnecessary individual repayments.",
      "Include an activity history and clear explanations for every balance calculation. Make it possible to edit or delete an expense while recalculating all affected balances accurately.",
      "Use authentication, secure group membership, and strict access control so only authorised members can see group expenses. Start with a simple, readable interface and support a consistent currency per group in the first version.",
      "Include validation for rounding, custom split totals, removed members, duplicate expenses, and settlement records. Do not process actual money transfers in the initial version; record settlements only.",
      "Product lesson\nSome apps grow because users invite other people to participate in the same workflow. This is a natural distribution loop, not an artificial referral scheme."
    ]
  },
  {
    "id": "chapter-10",
    "number": 10,
    "title": "Part IV — The Shared Blueprint: Common Micro-SaaS Product Architecture",
    "paragraphs": [
      "Part IV — The Shared Blueprint\n11. The common architecture behind the examples\nAlthough the apps solve different problems, they share a structure.\n| Product layer | Purpose | Examples |\n| --- | --- | --- |\n| Core action | Solve the immediate problem | Start a timer, log a drink, check off a habit |\n| Low-friction interface | Make the action easy | One-tap logging, visual timeline |\n| Persistence | Remember what happened | Session history, journal entries, expenses |\n| Progress | Show change over time | Streaks, charts, completion percentages |\n| Return trigger | Give a reason to come back | Daily goal, scheduled habit, next task |\n| Premium depth | Add value for invested users | Analytics, history, customisation |\n| Distribution loop | Help users discover the app | Sharing, groups, recommendations |",
      "This is the reusable blueprint:",
      "One problem → one simple action → saved history → visible progress → repeated use → premium depth.",
      "Not every app needs every layer. A first version should include only what is necessary to prove the core experience.\nThe minimum useful product\nA useful first version generally needs:\n- A clear first screen.\n- One main action.\n- Reliable data storage.\n- A history or result view where relevant.\n- Basic account or privacy controls if data is personal.\n- A way to collect feedback.\nDo not start by building every feature in the reference product. Reproduce the underlying job, not the entire feature catalogue."
    ]
  },
  {
    "id": "chapter-11",
    "number": 11,
    "title": "Opportunity Scorecard: How to Choose Which App to Build",
    "paragraphs": [
      "12. How to choose which app to build\nDo not choose only by the largest revenue estimate.",
      "Evaluate each opportunity across several dimensions:\n1. Problem strength: How frequently does the problem occur?\n2. Audience clarity: Can you identify and reach the people who have it?\n3. Existing demand: Are multiple products already attracting users and payments?\n4. Build complexity: Can you create a reliable first version?\n5. Retention potential: Is there a natural reason to return?\n6. Premium logic: Does advanced functionality become more valuable over time?\n7. Differentiation: Why would someone choose your version?\n8. Risk and responsibility: Does the app handle sensitive data or require special care?\nOpportunity scorecard\nScore each dimension from 1 to 5.\n| Dimension | Fasting | Hydration | Habits | Mood journal | Visual planner |\n| --- | --- | --- | --- | --- | --- |\n| Problem frequency |  |  |  |  |  |\n| Audience clarity |  |  |  |  |  |\n| Demand evidence |  |  |  |  |  |\n| MVP simplicity |  |  |  |  |  |\n| Return-use potential |  |  |  |  |  |\n| Premium logic |  |  |  |  |  |\n| Differentiation opportunity |  |  |  |  |  |\n| Responsible implementation |  |  |  |  |  |",
      "These scores should come from your research and user conversations, not from the revenue estimates alone.\nA practical selection rule\nChoose the product where you can answer all three questions:\n- Can I explain the problem clearly?\n- Can I reach people who experience it?\n- Can I build a small version that gives them value quickly?\nIf you cannot answer these, do more research before building."
    ]
  },
  {
    "id": "chapter-12",
    "number": 12,
    "title": "Finding Market Gaps: Differentiation Strategies Over Cloning",
    "paragraphs": [
      "13. Find the gap instead of cloning the leader\nThe source repeatedly emphasises that market data should confirm demand, not justify copying.",
      "A successful competitor proves that a product category may have paying users. Your product still needs a reason to be chosen.\nFive differentiation routes\n1. Audience focus",
      "Serve a more specific group with a clear shared problem.",
      "Example: A daily planner designed around visual time-blocking needs rather than a general-purpose calendar.",
      "2. Simpler workflow",
      "Remove steps that make the existing solution slow or confusing.",
      "Example: A mood check-in that can be completed in a few seconds.",
      "3. Better presentation",
      "Use a design that makes the core task easier to understand.",
      "Example: A clear hydration progress screen with large, accessible controls.",
      "4. More useful insight",
      "Help users understand their own accumulated information.",
      "Example: A habit tracker with meaningful weekly summaries.",
      "5. Better fit for a particular context",
      "Adapt the product to a specific routine, language, device, or environment.",
      "Example: A planner designed for a particular work schedule or a group expense app tailored to a particular travel workflow.\nCompetitor gap worksheet\nFor each competitor, record:\n- What users appear to like.\n- What the product makes easy.\n- What users repeatedly complain about.\n- Which audience is not well served.\n- Which feature feels unnecessarily complex.\n- What the competitor charges for.\n- What you could do differently without expanding the product too far.\nDo not assume a missing feature is an opportunity. It may be missing because users do not need it. Validate the gap."
    ]
  },
  {
    "id": "chapter-13",
    "number": 13,
    "title": "Part V — Building With AI: Prototyping With Natural Language & App Builders",
    "paragraphs": [
      "Part V — Building the App with AI\n14. Use an AI app builder to create the first version\nThe source demonstrates building prototypes with Base44, an AI-assisted app-building platform. The general workflow is to describe the app in natural language, generate the initial structure, test it, and refine it.",
      "An AI builder can accelerate:\n- Interface generation.\n- Basic data models.\n- Forms and dashboards.\n- Authentication scaffolding.\n- CRUD operations.\n- Charts and visual components.\n- Early product iteration.\nIt does not remove the need to understand the product or verify the implementation.",
      "A generated app can look convincing while containing:\n- Incorrect calculations.\n- Broken permissions.\n- Insecure data handling.\n- Incomplete payment logic.\n- Poor mobile behaviour.\n- Missing error states.\n- Unreliable notifications.\nTreat AI output as a draft that must be tested.\nThe build sequence\nStep 1: Write the product brief.",
      "Describe:\n- Target user.\n- Problem.\n- Main action.\n- Essential screens.\n- Data to store.\n- Free and premium boundaries.\n- Visual direction.\n- Privacy and accessibility needs.\nStep 2: Build the core experience first.",
      "Ask the builder to implement the main action before adding subscription payments, analytics, or elaborate settings.",
      "Step 3: Test the core workflow.",
      "Create test accounts and complete the main task from beginning to end.",
      "Step 4: Add history and progress.",
      "Ensure that the data is saved correctly and displayed accurately.",
      "Step 5: Add premium boundaries.",
      "Implement feature limits and subscription entitlements.",
      "Step 6: Add payment integration.",
      "Use a supported, secure payment flow. Verify the subscription state on the server rather than trusting a client-side screen.",
      "Step 7: Test and refine.",
      "Fix the real problems discovered in testing before adding more features."
    ]
  },
  {
    "id": "chapter-14",
    "number": 14,
    "title": "Reusable Master Prompt Architecture for AI App Generation",
    "paragraphs": [
      "15. A reusable master prompt for an AI app builder\nUse this prompt as the starting point for any of the five app models. Replace the bracketed sections with your own product details.\nI want to build a focused micro-SaaS application.",
      "Product: [APP NAME]",
      "Target user: [SPECIFIC AUDIENCE]",
      "Problem: [ONE RECURRING PROBLEM]",
      "Core promise: [WHAT THE APP HELPS THE USER DO]",
      "Main action: [THE MOST IMPORTANT USER ACTION]",
      "Build the smallest useful version of this product. Do not turn it into a general-purpose platform.\nCore experience\nCreate a simple dashboard where the user can complete the main action in as few steps as practical. Make the primary action visually obvious. Include the essential screens needed to complete the workflow and review previous activity.\nData and accounts\nAdd authentication where user-specific data is required. Store records persistently. Ensure each user can access only their own data, unless the product explicitly supports shared groups. Validate inputs and handle empty states, errors, edits, and deletions.\nProgress\nAdd only the progress indicators that directly help users understand their activity. Use accurate calculations and explain what each metric represents.\nFree and premium plans\nFree plan: [USEFUL BASIC FEATURES AND CLEAR LIMITS].",
      "Premium plan: [ADVANCED FEATURES THAT BECOME VALUABLE WITH REPEATED USE].",
      "Create clear feature gating. Do not block the basic value of the product behind a payment screen.\nDesign\nUse [VISUAL STYLE]. Prioritise readable typography, accessible contrast, responsive layouts, clear navigation, and fast completion of the main task.\nQuality requirements\nInclude loading, empty, success, and error states. Test all primary flows. Do not use fake data in production views. Do not claim that an action succeeded unless it has actually been saved. Make the application usable on mobile and desktop.\nSecurity and privacy\nEnforce access control on the server or backend, not only in the interface. Do not expose secret keys in client-side code. Provide appropriate privacy, export, and deletion controls for personal data.",
      "First, create the core working experience and its data model. Do not add unrelated features. After the core flow works, we will add analytics and subscription functionality.",
      "Why a master prompt helps\nIt reduces ambiguity. Instead of telling the AI to “make me an app like [competitor],” you specify:\n- The user.\n- The problem.\n- The core action.\n- The data.\n- The limits.\n- The expected quality.\nThis gives the builder a clearer target and makes the output easier to evaluate."
    ]
  },
  {
    "id": "chapter-15",
    "number": 15,
    "title": "Turning Prototypes Into Production Products: QA, Edge Cases & Data Isolation",
    "paragraphs": [
      "16. Turn the prototype into a reliable product\nA generated prototype is not automatically ready for paying customers.\nFunctional testing\nTest every important action:\n- Can the user create an account?\n- Can the user complete the core action?\n- Is the data saved?\n- Does the history show the correct record?\n- Do calculations match the underlying data?\n- Can the user edit or delete a record?\n- Does the app work after refreshing or signing in on another device?\n- Are errors explained clearly?\nAccount and data testing\nTest:\n- A new user with no records.\n- A user with many records.\n- Two different users.\n- A user who changes settings.\n- A user who deletes an account.\n- A user who loses connectivity.\n- A user who tries to access another user's record.\nNever rely only on hiding a button in the interface. Access rules must be enforced by the backend.\nMobile testing\nEven if the builder creates a responsive interface, inspect it on real mobile screen sizes:\n- Is the main action easy to tap?\n- Does the timer remain readable?\n- Are charts usable?\n- Does the keyboard cover important controls?\n- Are modals and forms easy to close?\n- Does the layout work in portrait orientation?\nSubscription testing\nTest:\n- New subscription.\n- Successful payment.\n- Failed payment.\n- Cancellation.\n- Expiration.\n- Renewal.\n- Refund or charge reversal where supported.\n- Restoring a subscription on another device.\nThe application should grant premium access based on a trusted subscription status, not merely because the user reached a success screen.",
      "Security note: The source's demonstrations describe simple Stripe setups using publishable and secret keys and, in some cases, omitting webhooks. That may illustrate a prototype flow, but it should not be treated as a complete production payment architecture. A secret key must never be exposed in client-side code. Use the payment provider's recommended server-side integration and subscription-event handling so entitlements remain accurate."
    ]
  },
  {
    "id": "chapter-16",
    "number": 16,
    "title": "Part VI — Subscription Design: Free-to-Paid Entitlements & Unit Economics",
    "paragraphs": [
      "Part VI — Subscription Design and Revenue Logic\n17. Give users a reason to upgrade\nThe best free-to-paid boundary is connected to the user's growing need.",
      "A user may start with one or two habits. Later, they want more habits and monthly statistics. A mood journal user may begin with a few entries and later want full history and charts.",
      "The upgrade should feel like a logical next step—not a toll gate placed in front of the basic product.\nFour common premium boundaries\n1. Usage limits",
      "Examples:\n- Limited saved sessions.\n- Limited daily planner blocks.\n- Limited number of habits.\n- Limited journal entries.\n2. Advanced insight",
      "Examples:\n- Weekly or monthly charts.\n- Activity comparisons.\n- Longer-term trends.\n- Completion statistics.\n3. Customisation",
      "Examples:\n- Custom drink types.\n- Custom schedules.\n- Custom mood labels.\n- Personalised goals.\n4. Convenience and collaboration",
      "Examples:\n- Recurring templates.\n- Export tools.\n- Shared groups.\n- Additional workflow automation.\nAvoid arbitrary limits\nA limit should create a sensible upgrade moment. If users hit it before understanding the product's value, they may simply leave.",
      "Test:\n- How often users hit the limit.\n- Whether they understand what premium unlocks.\n- Whether they return after seeing the paywall.\n- Whether the paid feature solves a real need.\n- Whether paying users continue using the app.\nSimple subscription arithmetic\nRevenue targets are useful for planning, but they are not forecasts.",
      "For example, if a hypothetical app charges $5 per month:\n| Paying subscribers | Monthly subscription revenue before fees and costs |\n| --- | --- |\n| 100 | $500 |\n| 500 | $2,500 |\n| 1,000 | $5,000 |\n| 2,000 | $10,000 |\n| 5,000 | $25,000 |",
      "At $10 per month, 1,000 paying subscribers would generate $10,000 in monthly subscription revenue before fees and costs.",
      "This is arithmetic, not a claim that acquiring or retaining those subscribers is easy. Real results depend on conversion, churn, refunds, taxes, payment fees, platform commissions, infrastructure, support, and acquisition costs.\nTrack the right numbers\nAt minimum, monitor:\n- New downloads or sign-ups.\n- Activation: users who complete the core action.\n- Day 1, Day 7, and Day 30 retention.\n- Free-to-paid conversion.\n- Monthly recurring revenue.\n- Churn.\n- Refunds.\n- Support requests.\n- Cost to acquire a paying customer.\nA high download count with weak retention is not a healthy subscription business."
    ]
  },
  {
    "id": "chapter-17",
    "number": 17,
    "title": "Ethical Retention Design: Habits, Progress & Avoiding Manipulative Mechanics",
    "paragraphs": [
      "18. Design for retention without manipulating users\nDaily-use products need a reason to be reopened. The source examples use timers, streaks, reminders, calendars, and progress views.",
      "These can be useful when they support the user's own goal.\nUseful retention mechanics\n- A clear next action.\n- A visible record of progress.\n- Optional reminders.\n- A weekly summary.\n- A calendar of completed activity.\n- A saved routine.\n- A helpful widget.\n- A meaningful reward.\nAvoid harmful engagement patterns\nDo not use:\n- Shame-based streak warnings.\n- False urgency.\n- Misleading progress claims.\n- Excessive notifications.\n- Artificially difficult cancellation.\n- Social pressure around sensitive personal data.\nA good app helps people complete the task they came to do. It should not create anxiety merely to increase session frequency."
    ]
  },
  {
    "id": "chapter-18",
    "number": 18,
    "title": "Part VII — Validation Sprint: Real User Feedback & The 30-Day Build Plan",
    "paragraphs": [
      "Part VII — Launch and Validation\n19. Validate with real users before scaling\nThe source recommends choosing a category, building a first version with AI, putting it in front of users, and using feedback to decide what to improve.",
      "That is the right direction. A prototype is only useful if it reaches people who have the problem.\nStep 1: Define the first audience\nAvoid targeting “everyone who wants to be productive.”",
      "Instead, define a group:\n- People who already track fasting sessions.\n- People who want a simple hydration reminder.\n- Students managing a few recurring habits.\n- People who prefer quick mood check-ins.\n- People who want a visual daily timeline.\nA clear audience makes research and distribution more practical.\nStep 2: Talk to potential users\nAsk:\n- How do you currently solve this problem?\n- What is frustrating about your current solution?\n- How often does the problem occur?\n- Have you paid for a tool to solve it?\n- What would make you switch?\n- What would make you keep using a new app?\nAvoid asking only whether they “like” your idea. People may be encouraging without becoming users.\nStep 3: Show a working prototype\nObserve whether users can complete the core action without explanation.",
      "Look for:\n- Confusing labels.\n- Too many steps.\n- Missing information.\n- Unexpected behaviour.\n- Features users ignore.\n- Moments where they ask what to do next.\nStep 4: Measure repeated use\nA daily utility needs repeated use. Track whether people return after the first session.",
      "Ask:\n- Did they complete the main action?\n- Did they return the next day?\n- Did they use the history or progress view?\n- Did they enable reminders?\n- Did they ask for an advanced feature?\n- Did they recommend the app?\nStep 5: Improve based on evidence\nDo not build every suggestion. Look for repeated problems shared by multiple users and prioritise fixes that improve the core workflow.\n20. A practical 30-day build plan\nDays 1–5: Research and choose\nGoal: Select one problem and confirm initial demand.",
      "Actions:\n1. Choose one of the five app categories or a closely related niche.\n2. Identify at least five competing products.\n3. Record their core features and monetisation approach.\n4. Review estimated downloads and revenue where available.\n5. Read user reviews and note recurring complaints.\n6. Speak with potential users.\n7. Write a one-sentence product promise.\nDeliverable: A short product brief and competitor research table.\nDays 6–10: Define the MVP\nGoal: Decide exactly what the first version will do.",
      "Actions:\n1. Define the target user.\n2. Define the main action.\n3. List the essential screens.\n4. Define the data that must be saved.\n5. Decide what belongs in the free version.\n6. Identify one or two premium features.\n7. Write the AI builder prompt.\nDeliverable: A focused MVP specification.\nDays 11–17: Build the core app\nGoal: Create a working version of the main experience.",
      "Actions:\n1. Generate the initial interface with an AI builder.\n2. Implement the core action.\n3. Add persistent storage.\n4. Add account access where required.\n5. Add the history view.\n6. Add the simplest useful progress indicator.\n7. Test the entire workflow.\nDeliverable: A working prototype.\nDays 18–22: Test and refine\nGoal: Find and fix usability and reliability problems.",
      "Actions:\n1. Ask a small group of target users to test the app.\n2. Observe them using it without instructions.\n3. Fix confusing screens.\n4. Verify calculations and saved data.\n5. Test mobile layouts.\n6. Test user data isolation.\n7. Remove features that distract from the core experience.\nDeliverable: A more reliable beta.\nDays 23–26: Add monetisation\nGoal: Implement a paid tier only after the core value works.",
      "Actions:\n1. Choose a simple subscription structure.\n2. Define clear free and premium entitlements.\n3. Integrate a supported payment flow.\n4. Keep secret keys on the server.\n5. Verify subscription status and cancellation behaviour.\n6. Test successful and failed payment flows.\n7. Make cancellation and account controls clear.\nDeliverable: A testable subscription experience.\nDays 27–30: Launch a small test\nGoal: Put the app in front of the intended audience.",
      "Actions:\n1. Prepare a clear landing page or app listing.\n2. Explain the problem and the product's main benefit.\n3. Show screenshots of the core workflow.\n4. Invite relevant users to try it.\n5. Collect feedback and usage data.\n6. Track activation and retention.\n7. Choose the next improvement based on evidence.\nDeliverable: A live or limited beta with real usage signals."
    ]
  },
  {
    "id": "chapter-19",
    "number": 19,
    "title": "Part VIII — Common Pitfalls: The 8 Micro-SaaS Traps to Avoid",
    "paragraphs": [
      "Part VIII — Common Mistakes\n21. Mistake: Building before confirming demand\nA polished app is not proof of a business.",
      "Better approach: Study multiple competitors, speak with potential users, and confirm that the problem is frequent enough to matter.\n22. Mistake: Copying the market leader feature for feature\nA clone may have no reason to be chosen and may inherit complexity without understanding why the original features exist.",
      "Better approach: Recreate the core job, then differentiate through audience, workflow, design, or a validated unmet need.\n23. Mistake: Adding too many features\nEvery extra feature creates more interface, code, testing, support, and maintenance.",
      "Better approach: Build the smallest version that completes the user's main task reliably.\n24. Mistake: Treating estimated revenue as guaranteed opportunity\nA competitor's estimated revenue does not predict your results.",
      "Better approach: Use market estimates as one signal among user research, retention, acquisition access, competition, and product economics.\n25. Mistake: Putting the paywall too early\nIf users cannot experience the basic value, they may not understand why the app is worth paying for.",
      "Better approach: Let users complete the core action before asking them to upgrade.\n26. Mistake: Treating an AI-generated prototype as production-ready\nA generated interface may hide incorrect calculations, weak security, or incomplete payment handling.",
      "Better approach: Test every important workflow, permission, calculation, and subscription state.\n27. Mistake: Building for downloads instead of retention\nDownloads are only the beginning. A subscription product needs people to return and continue receiving value.",
      "Better approach: Measure activation, repeated use, retention, conversion, and churn.\n28. Mistake: Ignoring privacy and accessibility\nMood records, schedules, routines, and group expenses can contain sensitive information.",
      "Better approach: Collect only what is needed, secure user data, provide deletion and export controls, and make the interface accessible."
    ]
  },
  {
    "id": "chapter-20",
    "number": 20,
    "title": "Part IX — Action Templates 1–3, MVP Acceptance Checklist & Conclusion",
    "paragraphs": [
      "Part IX — Final Templates\n29. One-page app opportunity brief\nApp name:",
      "Target user:",
      "Recurring problem:",
      "Current alternatives:",
      "What users dislike about current alternatives:",
      "One-sentence promise:",
      "Main action:",
      "Essential screens:",
      "Data the app stores:",
      "Reason to return:",
      "Free features:",
      "Premium features:",
      "Why users would choose this version:",
      "How to reach the first 100 users:",
      "Main product risks:",
      "First success metric:\n30. User interview script\nUse these questions in a short conversation with someone who fits the intended audience.\n1. Tell me about the last time you experienced this problem.\n2. What did you do to solve it?\n3. What tools or apps have you tried?\n4. What works well about those tools?\n5. What is frustrating or missing?\n6. How often does this problem occur?\n7. Have you paid for a solution?\n8. What would make you try a different product?\n9. What would make you stop using it?\n10. Would you be willing to test a prototype?\nFocus on actual past behaviour rather than hypothetical enthusiasm.\n31. MVP acceptance checklist\nCore workflow\n- [ ] The main purpose is clear on the first screen.\n- [ ] The user can complete the main action.\n- [ ] The action is saved correctly.\n- [ ] The user can view previous activity.\n- [ ] Empty and error states are understandable.\nData and accounts\n- [ ] Users can access only authorised records.\n- [ ] Data persists after refresh and sign-in.\n- [ ] Editing and deletion work correctly.\n- [ ] Sensitive information is handled appropriately.\nExperience\n- [ ] The interface works on mobile.\n- [ ] Text and controls are readable.\n- [ ] The main action is easy to find.\n- [ ] Notifications are optional and configurable.\nMonetisation\n- [ ] Free and premium features are clear.\n- [ ] Premium access is verified securely.\n- [ ] Failed payments are handled.\n- [ ] Cancellation works.\n- [ ] Users can understand their subscription status.\nLaunch\n- [ ] The app has been tested by target users.\n- [ ] Feedback has been collected.\n- [ ] Activation can be measured.\n- [ ] Retention can be measured.\n- [ ] There is a clear next iteration.\nConclusion — Build one small thing people genuinely need\nThe strongest lesson across these app examples is not that a particular fasting tracker, hydration app, habit tool, mood journal, or planner is guaranteed to make $10,000 per month.",
      "It is that a small product can create meaningful value when it solves a recurring problem for a clearly defined audience.",
      "The repeatable approach is:\n1. Find a problem people already try to solve.\n2. Confirm that users download and pay for solutions in the category.\n3. Study several products, not just one market leader.\n4. Identify a specific reason your version should exist.\n5. Build the smallest useful experience with AI.\n6. Test it with real users.\n7. Make the free product genuinely useful.\n8. Charge for advanced value that becomes relevant over time.\n9. Measure retention and improve the product based on evidence.\nDo not build seven apps at once. Choose one problem, one audience, and one core workflow. Get the first version working, put it in front of real people, and let their behaviour—not your assumptions—decide what comes next.",
      "The opportunity is not in making the biggest app. It is in making a small app that solves an important problem well enough that people choose to keep using it.\nSource and interpretation notes\n- The five core app models and two bonus case studies are drawn from the supplied source material.\n- The revenue and download figures are Sensor Tower estimates described in that material, primarily for US iOS users. They are not independently verified in this playbook.\n- The Base44 prompts are structured adaptations of the app requirements described in the source, expanded into clearer build briefs and quality requirements.\n- The source's promotional material for a paid/free masterclass and creator-specific calls to action has been excluded.\n- The source demonstrates prototype payment flows. Production payment systems require secure server-side handling and reliable subscription-state verification.\n- The source ends after recommending that builders choose one category, create a first version, and put it in front of users. No missing conclusion has been invented."
    ]
  }
]
};
