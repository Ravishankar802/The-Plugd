import { PlaybookArticle } from "./types";

export const HOW_I_BUILT_400K_IOS_ARTICLE: PlaybookArticle = {
  "slug": "how-i-built-it-400k-month-ios-app",
  "title": "How I Built It: $400K/Month iOS App",
  "readingTime": "35 min read",
  "categoryName": "AI",
  "categorySlug": "ai-businesses",
  "thumbnail": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996169/How_I_Built_It_400KMonth_iOS_App.png",
  "publishedDate": "2026",
  "authorName": "Jason Teo",
  "authorTitle": "iOS App Founder & Growth Engineer",
  "introParagraphs": [
    "A practical playbook for finding a focused app idea, building a useful mobile product, validating demand, understanding user behaviour, and scaling distribution without losing sight of product value.\nHow to read this playbook: This manual turns the supplied founder interview transcript into an actionable operating guide. It preserves the founder's reported story, methods, tools, and advice while separating those reports from recommendations derived to make the material easier to execute. The reported $400,000 per month is revenue as described in the interview—not verified profit, cash flow, or a guaranteed outcome. The transcript does not provide audited financial statements, margins, ad spend, customer acquisition cost, subscription conversion rates, or the founder's complete operating model.",
    "Contents\n1. The case study: Brain Rot\n2. The founder's starting point\n3. Find a problem you personally understand\n4. Turn a familiar problem into a distinctive app concept\n5. Choose a narrow utility, not a super app\n6. Build something you are excited to work on\n7. Launch preparation and audience building\n8. The first launch and early revenue\n9. Learn from real user behaviour\n10. Find and understand power users\n11. Instrument the app with analytics\n12. Improve activation and the core experience\n13. Run small, measurable experiments\n14. Find the acquisition channels that work\n15. Scale what is already working\n16. Match acquisition cost to user value\n17. Subscription design and retention\n18. Build the right founding team\n19. Decide when to go full-time\n20. A practical iOS app development stack\n21. A 90-day app-building roadmap\n22. Weekly operating rhythm\n23. Metrics and decision dashboard\n24. Experiment templates\n25. User research and power-user interview guide\n26. Launch checklist\n27. Common mistakes and traps\n28. Founder decision principles\n29. From a useful app to a durable business\n30. Final execution checklist\n31. What the source does—and does not—establish"
  ],
  "chapters": [
    {
      "id": "chapter-1",
      "number": 1,
      "title": "Chapter 1 — The case study: Brain Rot",
      "paragraphs": [
        "The central example is Brain Rot, a gamified screen-time management app. Its concept is simple: a small digital pet brain becomes more “rotten” as the user spends time in selected distracting apps. The product combines screen-time awareness, app-blocking rules, usage statistics, and a playful layer that makes the consequence of excessive scrolling visible.",
        "The founder described the app as a subscription business, with annual subscriptions making up most of its sales. In the interview, he reported:\n- Launching in the summer of 2025.\n- Growing from approximately $10,000 per month to approximately $400,000 per month.\n- Around two million downloads.\n- Roughly 150,000-plus users.\n- Approximately $400,000 in monthly revenue at the time of the interview.\n- A launch day that generated around $10,000 in revenue.\n- A pre-launch Instagram audience of approximately 100,000–150,000 followers.\nThese are founder-reported figures from the interview. The transcript does not specify the exact date of the $400,000 figure, whether it is gross or net revenue, the subscription mix, refunds, platform fees, marketing spend, or net profit. Treat the figures as a case-study account, not independently audited financial results.\nWhat made the product understandable?\nThe product has a short explanation:\n1. Pick the apps that consume too much of your time.\n2. Track how much time you spend in them.\n3. Apply blocking rules or friction to those apps.\n4. See the digital pet's condition reflect your usage.\n5. Use the feedback to make a different choice.\nThe app does not need to explain an enormous platform or dozens of unrelated features. A user can understand the central promise quickly: make distracting screen time visible and introduce enough friction to help change the habit.\nThe strategic lesson\nThe important lesson is not “copy a screen-time app.” The lesson is that a familiar problem can become a compelling product when the founder finds a distinctive interaction, understands a specific user, and builds a product people want to use repeatedly.",
        "A useful app is not defined by how many features it contains. It is defined by how effectively it solves a meaningful problem for a particular person."
      ]
    },
    {
      "id": "chapter-2",
      "number": 2,
      "title": "Chapter 2 — The founder's starting point",
      "paragraphs": [
        "The founder described a background as a corporate software engineer who had repeatedly tried small business ideas without finding a major success. Along the way, he began publishing content about his entrepreneurial journey.",
        "He was interested in the indie-hacker model: build in public, develop an audience, and have people who already understand the founder's work when a new product launches.",
        "This created two assets before the app existed:\n- Technical capability: experience building software.\n- Distribution groundwork: an audience that had followed the founder's progress.\nThe founder did not describe a perfectly planned startup journey. He had tried projects, developed an online presence, noticed a personal problem, and became excited enough about a solution to focus on it.\nPractical takeaway\nDo not assume that you need a complete company, a large team, or a sophisticated business plan before you can start. Begin by identifying the assets you already have:\n- Skills you can use to build or distribute a product.\n- Problems you encounter frequently.\n- Communities you understand.\n- People who might become early users.\n- An audience, even if it is small.\n- Existing software, workflows, or prototypes you can adapt.\nYour starting point should influence your strategy. A technical founder with an audience has different advantages from a non-technical founder with deep industry access. Build around your actual strengths rather than copying someone else's route."
      ]
    },
    {
      "id": "chapter-3",
      "number": 3,
      "title": "Chapter 3 — Find a problem you personally understand",
      "paragraphs": [
        "The Brain Rot concept began with a personal problem: the founder felt that he was spending too much time on his phone, particularly on social and entertainment apps.",
        "He knew that app blockers already existed. The opportunity was not the discovery of screen-time management itself. It was the observation that the existing category could be approached through a different experience: what if the user's brain were represented as a digital pet whose condition changed with their screen habits?",
        "This is a useful pattern for idea discovery:\n1. Notice a recurring frustration.\n2. Identify what people currently do to solve it.\n3. Find the part of the experience that feels ineffective, boring, confusing, or incomplete.\n4. Imagine a different interaction or mechanism.\n5. Test whether other people experience the same problem.\nPersonal problem inventory\nSpend 30–60 minutes listing problems you encounter repeatedly. Do not begin by brainstorming startup ideas in the abstract.\nArea\tQuestions to ask\nWork\tWhat task do you repeatedly do manually?\nStudy\tWhat makes learning, remembering, or organising difficult?\nMoney\tWhat financial task is confusing or inconvenient?\nHealth\tWhat routine is difficult to maintain?\nCommunication\tWhat information gets lost or repeated?\nDevices\tWhat do you wish your phone or computer did differently?\nHobbies\tWhat tools are missing from an activity you understand?\nLocal life\tWhat recurring problem exists in a city, campus, or profession?",
        "For every problem, record:\n- When it occurs.\n- How often it occurs.\n- How painful or costly it is.\n- What you currently use to handle it.\n- What you dislike about current solutions.\n- Whether you would use a better solution yourself.\nDo not confuse personal interest with market demand\nA problem being real for you is a useful starting signal, not proof that a business exists. You still need to establish that other people experience it, care enough to change behaviour, and are willing to use or pay for a solution.",
        "Talk to potential users before treating your own experience as representative."
      ]
    },
    {
      "id": "chapter-4",
      "number": 4,
      "title": "Chapter 4 — Turn a familiar problem into a distinctive app concept",
      "paragraphs": [
        "The founder's insight was not simply “people use their phones too much.” It was the specific product framing: a digital brain that visibly deteriorates as the user spends time in selected apps.",
        "The concept added an emotional and visual layer to a utility that could otherwise feel like a plain settings screen.",
        "A product concept can become more memorable through:\n- A distinctive visual metaphor.\n- A clear feedback loop.\n- A satisfying interaction.\n- A simple way to understand progress.\n- A recognisable personality or brand.\n- A small amount of friction at the right moment.\nThe concept formula\nUse this as a planning prompt, not as a formula guaranteed to produce a winning app:",
        "For [specific user], who struggles with [specific problem], the app helps them [desired outcome] through [distinctive mechanism].",
        "Example inspired by the case study:\nFor people who repeatedly lose time to distracting apps, the product makes screen-time behaviour visible and introduces a playful interruption before they continue scrolling.",
        "The key is to describe the user, problem, outcome, and mechanism in plain language.\nDistinctiveness is not decoration\nA cute character, unusual name, or attractive interface can make an app easier to remember. But visual novelty cannot compensate for a weak core utility.",
        "Ask:\n- Does the distinctive feature make the product more useful?\n- Does it make the problem easier to understand?\n- Does it encourage the desired behaviour?\n- Would the product still be valuable after the novelty wears off?\nThe strongest product identity reinforces the core function."
      ]
    },
    {
      "id": "chapter-5",
      "number": 5,
      "title": "Chapter 5 — Choose a narrow utility, not a super app",
      "paragraphs": [
        "The founder advised beginners against building a super app with many features for many different people. Instead, he recommended a simple utility with one core function, one core problem, and one core user.",
        "This is especially important for a first app.",
        "A broad product creates several problems:\n- More features to build before launch.\n- More complicated onboarding.\n- More user types to understand.\n- More possible reasons for users to abandon the product.\n- More difficult analytics.\n- More expensive maintenance.\n- Less clarity in marketing.\nA narrow utility gives you a better chance of learning whether the central problem is worth solving.\nDefine the first version\nWrite down:",
        "Primary user: Who is the first person this app is for?",
        "Core problem: What recurring problem are you solving?",
        "Core action: What is the one main thing the user should be able to do?",
        "Core outcome: What changes for the user after using the app?",
        "Proof of value: What observable behaviour would show that the app helped?",
        "Not included: Which attractive features are deliberately postponed?\nFeature prioritisation\nFeature\tQuestion\tInitial decision\nCore utility\tIs it necessary for the main promise?\tBuild\nActivation\tDoes it help the user reach value quickly?\tUsually build\nMeasurement\tDoes it help the user understand progress?\tBuild if central\nSocial layer\tIs it essential to the core use case?\tUsually defer\nAdvanced customisation\tDo early users need it?\tDefer\nSecondary use case\tDoes it serve a different user/problem?\tDefer\nCosmetic feature\tDoes it improve comprehension or satisfaction?\tTest later",
        "A small product can still feel polished. “Narrow” means focused, not careless."
      ]
    },
    {
      "id": "chapter-6",
      "number": 6,
      "title": "Chapter 6 — Build something you are excited to work on",
      "paragraphs": [
        "The founder's first recommendation for someone starting over was to choose a problem space that genuinely excites them.",
        "Building an app is difficult. There will be bugs, confusing user feedback, disappointing experiments, slow growth, and periods when the work is repetitive. If the problem itself does not interest you, it becomes harder to keep going when progress slows.",
        "This does not mean that passion alone creates a business. It means that sustained curiosity can help you remain engaged long enough to learn.\nTest your own interest\nBefore committing, ask:\n- Would I enjoy learning about this problem for a year?\n- Would I use the product myself?\n- Am I curious about the users and their behaviour?\n- Would I still care if the first version attracted only a small number of users?\n- Do I want to improve this product, or am I mainly attracted to the revenue story?\nBe a power user\nThe founder specifically recommended using your own app every day and being brutally honest about it.",
        "Use the app in real conditions. Do not merely open it to admire the interface.",
        "Record:\n- What feels useful.\n- What feels slow.\n- What is confusing.\n- What you repeatedly avoid.\n- What you wish existed.\n- Which features you use without prompting.\n- Whether the product changes your behaviour.\nFounder usage is valuable because it creates a constant feedback loop. It is not a substitute for external user research: your own habits may differ from the market's."
      ]
    },
    {
      "id": "chapter-7",
      "number": 7,
      "title": "Chapter 7 — Launch preparation and audience building",
      "paragraphs": [
        "Before launching Brain Rot, the founder had built a substantial Instagram following by sharing his entrepreneurial journey. He described keeping the product somewhat suspenseful, telling followers that he was building an app and inviting them to join a waitlist.",
        "He reported approximately 100,000–150,000 followers before launch.",
        "This was an unusual advantage and should not be treated as a prerequisite for app success. The general lesson is that distribution can be developed before the product is finished.\nBuild an audience around the problem and the process\nA practical pre-launch content system:\n1. Explain the problem you are trying to solve.\n2. Share what you currently do to handle it.\n3. Show prototypes or small product decisions.\n4. Ask people with the problem how they handle it.\n5. Share lessons from user conversations.\n6. Invite interested people to a waitlist or early-access group.\n7. Demonstrate progress without making unsupported promises.\nContent pillars\nPillar\tExample content\nProblem\t“Why do I keep opening the same distracting apps?”\nFounder journey\tWhat you learned while building the first prototype\nProduct development\tA short demonstration of one interaction\nUser research\tA recurring frustration users described\nProgress\tA measured improvement or milestone\nInvitation\tA clear request to join a beta or waitlist",
        "Do not manufacture suspense without substance\nThe purpose of a waitlist is to identify people who genuinely want to try the product. Do not use fake scarcity, fabricated user counts, or exaggerated claims. Give people a clear reason to sign up and tell them what will happen next.\nIf you have no audience\nYou can still validate and launch through:\n- Relevant communities where the problem is discussed.\n- Direct conversations with potential users.\n- Small creator partnerships.\n- App-focused communities and directories.\n- Search-oriented content.\n- A limited beta shared with people who match the target user.\nThe right channel depends on the audience and product. The transcript does not prescribe one universal acquisition channel."
      ]
    },
    {
      "id": "chapter-8",
      "number": 8,
      "title": "Chapter 8 — The first launch and early revenue",
      "paragraphs": [
        "The founder reported that Brain Rot generated around $10,000 on its first launch day. That result came after building a large pre-launch audience and creating anticipation.",
        "Do not treat this as a normal launch benchmark. The transcript does not provide the number of waitlist subscribers, launch conversion rate, price, refund rate, or the exact breakdown of purchases.\nWhat to prepare before launch\n- A clear app description.\n- A focused App Store page.\n- Screenshots that explain the core use case.\n- A short product demonstration.\n- A working onboarding flow.\n- A reliable subscription and purchase flow.\n- Analytics for the main user journey.\n- A support channel.\n- A privacy policy and required disclosures.\n- A process for handling crashes and user reports.\nLaunch-day operating plan\nBefore launch\n- Test installation and onboarding on supported devices.\n- Verify that core functionality works.\n- Test subscription purchase, restore, and cancellation information.\n- Confirm analytics events are being recorded.\n- Prepare support responses for predictable issues.\nDuring launch\n- Publish the product announcement.\n- Send the launch message to interested users.\n- Monitor crashes, failed purchases, and onboarding problems.\n- Respond to questions.\n- Record traffic and conversion data.\nAfter launch\n- Review user behaviour.\n- Identify where users stop.\n- Read support messages and reviews.\n- Interview early users.\n- Fix serious friction before adding secondary features.\nA launch is the beginning of product learning, not the finish line."
      ]
    },
    {
      "id": "chapter-9",
      "number": 9,
      "title": "Chapter 9 — Learn from real user behaviour",
      "paragraphs": [
        "One of the founder's strongest recommendations was to understand exactly how users use the app after it launches.",
        "Before launch, you are working with assumptions. After launch, you can observe actual behaviour.",
        "You can begin to identify:\n- Users who repeatedly return.\n- Users who complete the main action.\n- Users who pay.\n- Users who abandon onboarding.\n- Users who use a feature in an unexpected way.\n- Users who stop returning.\n- Users who generate more value than the average user.\nThe founder described understanding power users as a major unlock.\nMove from opinions to behaviour\nA user may say that a feature is interesting but never use it. Another user may barely mention a feature but return to it every day.",
        "Both feedback and analytics matter, but they answer different questions:\n- Interviews: Why does a user behave this way?\n- Analytics: What did the user actually do?\n- Support messages: Where is the experience failing?\n- Cohort analysis: Does behaviour persist over time?\n- Revenue data: Which users and channels create economic value?\nDo not rely on a single source of evidence."
      ]
    },
    {
      "id": "chapter-10",
      "number": 10,
      "title": "Chapter 10 — Find and understand power users",
      "paragraphs": [
        "A power user is someone who uses the app more frequently, more deeply, or more consistently than a typical user. The exact definition depends on the product.",
        "For a screen-time utility, possible signals might include:\n- Completing setup.\n- Creating app-blocking rules.\n- Reviewing screen-time statistics.\n- Returning to the app across multiple days.\n- Adjusting rules based on experience.\n- Maintaining a subscription.\nFor another category, the relevant behaviours will be different.\nBuild a behavioural profile\n1. Identify users with repeated meaningful usage.\n2. Compare their actions with casual users.\n3. Look for common paths through the app.\n4. Identify the first moment they receive value.\n5. Find which features correlate with continued use.\n6. Interview a sample of these users.\n7. Turn the findings into product hypotheses.\nAvoid the average-user trap\nAn average across all users can hide important differences. A small segment may be receiving much more value than everyone else.",
        "Segment users by meaningful behaviour, not just by demographics.",
        "Possible segments:\n- Activated vs. not activated.\n- Repeated users vs. one-time users.\n- Subscribers vs. non-subscribers.\n- Users acquired from different channels.\n- Users who use a specific core feature vs. those who do not.\nThe goal is to understand what makes a user successful with the product, then help more users experience that path."
      ]
    },
    {
      "id": "chapter-11",
      "number": 11,
      "title": "Chapter 11 — Instrument the app with analytics",
      "paragraphs": [
        "The founder named Mixpanel and PostHog as analytics options and recommended sending app events to an analytics provider. He also mentioned using Firebase for analytics and experiments.",
        "The important principle is to instrument the product so you can understand the user journey.\nStart with a simple event plan\nDo not track every possible tap. Track the actions needed to understand activation, engagement, retention, and revenue.",
        "Example event taxonomy:\nEvent\tWhat it tells you\nonboarding_started\tUser entered onboarding\nonboarding_completed\tUser finished setup\ncore_action_completed\tUser experienced the central utility\nfeature_used\tUser engaged with a key feature\npaywall_viewed\tUser reached the subscription offer\ntrial_started\tUser began a trial, if offered\nsubscription_started\tUser purchased a subscription\nsubscription_renewed\tSubscription renewed\nsubscription_cancelled\tSubscription was cancelled\napp_opened\tUser returned to the app",
        "These are example event names, not events confirmed in the source.",
        "For each event, define:\n- Event name.\n- Trigger condition.\n- Properties to record.\n- User identity rules.\n- Whether the event is essential or optional.\n- How the event will inform a decision.\nTrack the activation moment\nActivation is the point at which a new user experiences the product's core value.",
        "It is not necessarily account creation or finishing a tutorial.",
        "For Brain Rot, a candidate activation hypothesis might be that a user has selected distracting apps, configured a rule, and experienced the app's intervention. The actual activation event should be validated against later retention data rather than assumed.\nCohort analysis\nA cohort groups users by a shared starting point, such as install week or acquisition channel.",
        "Compare cohorts on:\n- Activation rate.\n- Day 1, Day 7, and Day 30 retention.\n- Core feature usage.\n- Trial or purchase conversion.\n- Subscription renewal.\n- Revenue per acquired user.\nUse consistent definitions. A retention number is meaningless if the underlying event changes between reports."
      ]
    },
    {
      "id": "chapter-12",
      "number": 12,
      "title": "Chapter 12 — Improve activation and the core experience",
      "paragraphs": [
        "The founder recommended understanding the activation moment and trying to help more users exhibit the behaviours of the most engaged users.",
        "This suggests a practical product-improvement cycle:\n1. Observe how power users reach value.\n2. Find where new users fail to reach that point.\n3. Form a specific hypothesis.\n4. Change one part of the experience.\n5. Measure the result.\n6. Keep, reverse, or refine the change.\nExample activation investigation\nSuppose analytics show that users who configure a key feature during their first session tend to return more often.",
        "Possible hypotheses:\n- The setup process is too long.\n- Users do not understand why the feature matters.\n- The feature is hidden too deep in the interface.\n- The default settings are not useful.\n- The app asks for too much information before delivering value.\nPossible experiments:\n- Move the key setup step earlier.\n- Explain the benefit in simpler language.\n- Use a sensible default.\n- Remove an unnecessary onboarding screen.\n- Show a small demonstration before requesting configuration.\nDo not assume that correlation proves causation. Users who configure a feature may already be more motivated. Run experiments where possible."
      ]
    },
    {
      "id": "chapter-13",
      "number": 13,
      "title": "Chapter 13 — Run small, measurable experiments",
      "paragraphs": [
        "The founder recommended relentless iteration through small experiments. His examples included changing the order of onboarding screens or moving a screen from one position to another.",
        "He noted that many experiments will not move the needle, but occasional improvements can have a substantial effect.\nThe experiment cycle\n1. Identify friction",
        "Use analytics, reviews, support conversations, and interviews to find a specific problem.",
        "2. Write a hypothesis",
        "Example:\nIf we explain the main benefit before asking the user to configure the feature, more users will complete setup because they will understand why the step matters.",
        "3. Choose one change",
        "Avoid changing five unrelated things at once if you want to understand what caused the result.",
        "4. Define the metric",
        "Choose the metric closest to the behaviour being changed.",
        "5. Set a test window",
        "Choose a duration and sample size appropriate to your traffic. Low-volume apps may need longer tests.",
        "6. Review the result",
        "Look at the primary metric and guardrail metrics.",
        "7. Decide",
        "Keep, revert, or run a follow-up test.\nExample experiment backlog\nArea\tExperiment\tPrimary metric\nOnboarding\tRemove an unnecessary step\tOnboarding completion\nActivation\tMove core setup earlier\tActivation rate\nClarity\tRewrite feature explanation\tCore action completion\nPaywall\tTest a clearer value proposition\tPurchase conversion\nRetention\tImprove a recurring reminder\tMeaningful return usage\nDistribution\tTest a new creator audience\tCost per activated user",
        "The table is a set of possible tests, not a list of changes proven by the case study.\nMaintain an experiment log\nFor every experiment, record:\n- Date.\n- Problem observed.\n- Hypothesis.\n- Change made.\n- Target audience.\n- Primary metric.\n- Guardrail metrics.\n- Result.\n- Decision.\n- Follow-up question.\nThis prevents the team from repeatedly testing the same idea without learning from it."
      ]
    },
    {
      "id": "chapter-14",
      "number": 14,
      "title": "Chapter 14 — Find the acquisition channels that work",
      "paragraphs": [
        "The founder said influencer content and paid advertising were the channels that enabled early growth for Brain Rot. The team scaled those channels because they were working for that particular business.",
        "This is a critical distinction: the lesson is not that every app should use influencer marketing and paid ads. The lesson is to identify which distribution channels work for your product and audience, then concentrate effort on them.\nPotential app acquisition channels\n- Short-form creator content.\n- Influencer partnerships.\n- Paid social advertising.\n- Search and App Store discovery.\n- Founder-led content.\n- Community participation.\n- Referral loops.\n- Partnerships with relevant products or communities.\nThe right mix depends on the category, user, price, and economics.\nChannel evaluation\nFor each channel, track:\nMetric\tWhy it matters\nImpressions or reach\tHow many people could see the offer?\nClick-through rate\tDoes the message attract interest?\nStore-page conversion\tDo visitors install?\nActivation rate\tDo installs become meaningful users?\nPaid conversion\tDo users become customers?\nCost per install\tWhat does an install cost?\nCost per activated user\tWhat does a useful user cost?\nRevenue per user\tHow much value does the cohort generate?\nRetention\tDo users continue using the product?",
        "A channel that produces many cheap installs may still be poor if those users never activate or pay."
      ]
    },
    {
      "id": "chapter-15",
      "number": 15,
      "title": "Chapter 15 — Scale what is already working",
      "paragraphs": [
        "The founder's advice was direct: if something is working, try to do substantially more of it. For Brain Rot, influencer content and paid ads were the early growth drivers, so the team scaled those channels.",
        "This is a better starting point than copying a growth tactic because it is popular.\nA practical scaling sequence\n1. Find a channel that produces users who activate.\n2. Check whether those users retain and generate revenue.\n3. Understand which creative, audience, or placement is working.\n4. Increase spend or output gradually.\n5. Monitor acquisition costs and user quality.\n6. Stop or revise campaigns that deteriorate.\n7. Keep testing new creative and audiences.\nDo not scale a broken funnel\nIf users install but do not activate, more installs may simply create more waste.",
        "Before scaling, inspect the full funnel:",
        "Reach → Click → Store page → Install → Onboarding → Activation → Subscription → Renewal",
        "Find the weakest important step. Improving that step may be more valuable than increasing top-of-funnel volume.\nThe 10× principle, used carefully\nThe founder suggested trying to do much more of what works. Treat this as a direction for prioritisation, not a command to multiply budgets blindly.",
        "Scale in measured increments and keep a close eye on:\n- Marginal acquisition cost.\n- Conversion quality.\n- Retention by acquisition cohort.\n- Refunds and cancellations.\n- Support load.\n- Cash available to fund acquisition."
      ]
    },
    {
      "id": "chapter-16",
      "number": 16,
      "title": "Chapter 16 — Match acquisition cost to user value",
      "paragraphs": [
        "The founder emphasised that different audiences can provide different amounts of value. You should understand which users can be acquired more cheaply through each channel and how much revenue those users generate.",
        "This is the foundation of acquisition economics.\nCompare channels by cohort\nA simple example:\nChannel\tCost per activated user\t90-day revenue per user\tInterpretation\nCreator A\t$4\t$12\tPotentially attractive\nPaid social\t$7\t$10\tNeeds margin and retention analysis\nCommunity\t$2\t$3\tCheap, but lower monetisation\nSearch\t$5\t$18\tPotentially strong",
        "These numbers are illustrative only. They are not Brain Rot's reported data.\nDo not compare revenue with acquisition cost alone\nRevenue is not profit. A proper decision should account for:\n- Apple/platform fees.\n- Payment processing.\n- Refunds.\n- Taxes.\n- Marketing costs.\n- Customer support.\n- Infrastructure.\n- Contractors and payroll.\n- Other operating expenses.\nA user cohort can generate more revenue than it costs to acquire and still be unprofitable after other costs.\nUseful unit-economics measures\nCAC (customer acquisition cost):\n\\[\nCAC = \\frac{\\text{Acquisition spend}}{\\text{New paying customers}}\n\\]\nRevenue per user:\n\\[\nARPU = \\frac{\\text{Revenue in period}}{\\text{Users in period}}\n\\]\nContribution after acquisition:\n\\[\n\\text{Contribution} = \\text{Net revenue} - \\text{Variable costs} - \\text{Acquisition cost}\n\\]\nUse consistent periods and cohort definitions. Do not treat projected lifetime value as cash already received."
      ]
    },
    {
      "id": "chapter-17",
      "number": 17,
      "title": "Chapter 17 — Subscription design and retention",
      "paragraphs": [
        "The founder described Brain Rot as a subscription app and said that annual subscriptions were the primary sales model.",
        "The transcript does not provide the exact pricing, trial structure, conversion rate, cancellation rate, renewal rate, or lifetime value. Therefore, this chapter focuses on the principles needed to evaluate a subscription model rather than claiming to reproduce Brain Rot's pricing strategy.\nWhen a subscription can make sense\nA subscription is most defensible when the app provides ongoing value, such as:\n- Repeated utility.\n- Continued monitoring or insights.\n- Regularly updated content.\n- Persistent personalisation.\n- Ongoing workflow support.\n- Continued access to a service that has recurring costs.\nA one-time utility may be better suited to a one-time purchase. Do not force a subscription onto a product that does not create recurring value.\nDesign around value, not pressure\nA good subscription experience should make clear:\n- What the user gets.\n- What is free and what is paid.\n- How much and how often they will be charged.\n- Whether a trial converts automatically.\n- How to cancel.\n- What happens after cancellation.\n- How to restore a purchase.\nUse clear terms and follow the applicable App Store rules and consumer-protection requirements.\nAnnual vs. monthly plans\nAnnual plans can improve upfront cash collection and reduce monthly billing friction, but they also create a larger commitment for the customer. Monthly plans offer a lower initial commitment but may produce different retention and revenue patterns.",
        "Evaluate both using:\n- Trial-to-paid conversion.\n- Refund rate.\n- Renewal rate.\n- Cancellation rate.\n- Net revenue per subscriber.\n- Customer support burden.\n- Long-term retention.\nThe transcript only establishes that Brain Rot mostly sold annual subscriptions; it does not prove annual subscriptions are best for every app."
      ]
    },
    {
      "id": "chapter-18",
      "number": 18,
      "title": "Chapter 18 — Build the right founding team",
      "paragraphs": [
        "The founder said that partnering with his co-founder was a major force multiplier. He recommended that solo founders consider finding a co-founder or building a team, especially after repeated attempts to build alone.",
        "The practical lesson is that a startup requires several kinds of work. A founder may be able to do many tasks, but cannot necessarily do all of them well at the same time.\nLook for complementary strengths\nPossible areas of responsibility:\n- Product and engineering.\n- Design and user experience.\n- Marketing and distribution.\n- Analytics and experimentation.\n- Operations and customer support.\n- Finance and administration.\nA co-founder should complement your capabilities, not simply duplicate them.\nQuestions to discuss before partnering\n- What is each person's role?\n- Who owns product decisions?\n- Who controls spending?\n- How will disagreements be resolved?\n- How much time can each person commit?\n- What happens if one person leaves?\n- How will equity vest?\n- Who owns the code, brand, and other intellectual property?\n- How will salaries and expenses be handled?\n- What decisions require joint approval?\nPut agreements in writing and obtain appropriate legal and tax advice. Do not give away equity casually or use it as a substitute for a clear role and commitment.\nContractors and freelancers\nThe founder mentioned using Upwork to find contractors and freelancers. This can help fill skill gaps without immediately creating a full-time team.",
        "Use contractors for clearly scoped work with:\n- Defined deliverables.\n- Milestones.\n- Access controls.\n- Ownership and confidentiality terms.\n- Review criteria.\n- A documented handover.\nKeep strategic product knowledge and critical infrastructure under appropriate company control."
      ]
    },
    {
      "id": "chapter-19",
      "number": 19,
      "title": "Chapter 19 — Decide when to go full-time",
      "paragraphs": [
        "The founder described spending time thinking about when to leave his software engineering job. He was waiting for a moment when the leap felt less risky, but concluded that every path contains risk.",
        "He also mentioned practical considerations, especially having enough financial runway.",
        "This should not be reduced to “quit as soon as you feel uncomfortable.” The decision depends on personal obligations, business evidence, savings, and downside protection.\nA decision framework\nBefore leaving employment, assess:",
        "Business evidence\n- Is revenue recurring or merely a launch spike?\n- Are users retaining?\n- Is acquisition repeatable?\n- Are unit economics understood?\n- Is the business dependent on one channel or one person?\nPersonal runway\n- How many months of essential expenses are covered?\n- Do you have dependants or debt obligations?\n- What happens if revenue falls?\n- Can you return to employment or freelance work?\nOperational readiness\n- Can the product operate reliably?\n- Is customer support manageable?\n- Are legal, tax, and business basics in place?\n- Is there a realistic plan for the next six months?\nOpportunity cost\n- What can you do full-time that you cannot do while employed?\n- What evidence suggests that additional time will materially improve the business?\n- Is the current job harming your health or ability to execute?\nA safer transition\nPossible alternatives include:\n- Build evenings and weekends while validating demand.\n- Negotiate reduced hours.\n- Save a defined runway.\n- Move to contract work.\n- Set a revenue or retention milestone before resigning.\nThe right threshold is personal. The source does not provide a universal revenue number for leaving a job."
      ]
    },
    {
      "id": "chapter-20",
      "number": 20,
      "title": "Chapter 20 — A practical iOS app development stack",
      "paragraphs": [
        "The founder named the following tools in the interview:\nTool\tRole described in the interview\nMixpanel\tProduct analytics\nFirebase\tAnalytics and experiments\nSupabase\tInternal tools and tracking\nSuperwall\tPaywalls\nAppstack\tPaid-ad attribution\nClaude Code\tCoding and internal business work\nCodex\tCoding and internal business work\nUpwork\tFinding contractors and freelancers",
        "The interview does not provide a complete architecture, codebase, implementation details, or a claim that these tools are required. Treat them as examples of the founder's stack at the time of the interview.\nChoose tools by job to be done\nA lean app stack usually needs to support:\n1. Building and shipping the app.\n2. Authentication, if required.\n3. Data storage and backend services, if required.\n4. Product analytics.\n5. Crash and performance monitoring.\n6. Subscription and paywall management.\n7. Attribution for paid acquisition.\n8. Internal operations and customer support.\nDo not add a tool just because another founder uses it. Every tool adds cost, complexity, data handling, and maintenance.\nTool-selection checklist\n- Does it solve a current problem?\n- Does it integrate with the rest of the stack?\n- Can you export your data?\n- What does it cost at your expected scale?\n- What happens if you need to migrate?\n- Does it meet privacy and security requirements?\n- Can the team operate it reliably?\nAI coding tools\nThe founder mentioned using Claude Code and Codex for coding and internal business tasks. AI coding tools can help with implementation, debugging, documentation, and repetitive work, but they do not remove the need for engineering review.",
        "For every AI-assisted change:\n- Review the diff.\n- Run tests.\n- Check permissions and data handling.\n- Test on real devices.\n- Inspect edge cases.\n- Keep secrets out of prompts and repositories.\n- Maintain version control and rollback options."
      ]
    },
    {
      "id": "chapter-21",
      "number": 21,
      "title": "Chapter 21 — A 90-day app-building roadmap",
      "paragraphs": [
        "The following roadmap is a practical plan derived from the founder's advice. It is not a claim that Brain Rot followed this exact 90-day schedule or that every app can reach product-market fit in three months.\nDays 1–15: Problem and user discovery\nObjective: Find a focused problem and a specific user.",
        "Actions:\n- Write a personal problem inventory.\n- Choose one problem space you understand.\n- Identify a narrow first user group.\n- Interview 10–15 potential users.\n- Study current alternatives.\n- Write a one-sentence product promise.\n- Sketch the core interaction.\n- Decide what the first version will not include.\nDeliverables:\n- Problem brief.\n- User profile.\n- Interview notes.\n- Competitor/alternative map.\n- One-page product concept.\nSuccess signal:\n- Multiple people independently describe the problem.\n- You understand how they currently solve it.\n- The problem is frequent or important enough to justify a product.\nDays 16–30: Prototype and test\nObjective: Test the core experience before building a large product.",
        "Actions:\n- Create a clickable prototype or technical proof of concept.\n- Test the core flow with target users.\n- Observe where they hesitate.\n- Remove unnecessary steps.\n- Confirm technical feasibility.\n- Define the first activation hypothesis.\n- Choose the minimum analytics events.\nDeliverables:\n- Prototype.\n- Tested core flow.\n- Initial product specification.\n- Event taxonomy.\n- Prioritised MVP backlog.\nSuccess signal:\n- Users understand the promise.\n- They can complete the core task.\n- Their feedback reveals specific improvements rather than general confusion.\nDays 31–50: Build the MVP\nObjective: Ship a narrow, reliable product.",
        "Actions:\n- Implement the core utility.\n- Build onboarding around the first value moment.\n- Add required permissions and explanations.\n- Implement analytics.\n- Add subscription functionality only if recurring value is real.\n- Test purchase and restore flows if monetised.\n- Add crash monitoring and support handling.\n- Test on supported devices.\nDeliverables:\n- Working MVP.\n- Basic analytics dashboard.\n- Store listing assets.\n- Privacy and support materials.\n- Known-issues list.\nSuccess signal:\n- A new user can install, understand, and use the core feature without founder assistance.\nDays 51–65: Beta and launch\nObjective: Get real users into the product and observe their behaviour.",
        "Actions:\n- Recruit a focused beta group.\n- Watch users complete onboarding.\n- Fix critical usability and reliability issues.\n- Publish launch content.\n- Send invitations to the waitlist or relevant communities.\n- Monitor activation and support.\n- Interview early users.\nDeliverables:\n- Public or limited launch.\n- First user cohorts.\n- Support and feedback log.\n- Initial activation baseline.\nSuccess signal:\n- Users reach the core value moment.\n- You can identify the most common failure points.\nDays 66–80: Analytics and experimentation\nObjective: Improve the product using evidence.",
        "Actions:\n- Identify power users.\n- Compare their behaviour with casual users.\n- Find the activation moment.\n- Review retention by cohort.\n- Create an experiment backlog.\n- Run small onboarding and core-flow tests.\n- Improve the highest-impact friction point.\nDeliverables:\n- Power-user profile.\n- Funnel report.\n- Experiment log.\n- Prioritised improvement plan.\nSuccess signal:\n- You understand more clearly which behaviours are associated with retention and value.\nDays 81–90: Distribution and next-stage plan\nObjective: Find a repeatable acquisition path and decide what to scale.",
        "Actions:\n- Test relevant creator or community partnerships.\n- Test paid acquisition only if the funnel is sufficiently understood.\n- Compare channels by activated-user quality and revenue.\n- Review subscription conversion and retention.\n- Estimate contribution after variable costs.\n- Decide which channel deserves more investment.\n- Define the next 90-day product and growth priorities.\nDeliverables:\n- Channel comparison.\n- Cohort economics.\n- Product roadmap.\n- Hiring/contractor needs.\n- Next-quarter operating plan.\nSuccess signal:\n- You have a credible understanding of the user, core value, product bottlenecks, and most promising distribution opportunities—even if the business is not yet profitable."
      ]
    },
    {
      "id": "chapter-22",
      "number": 22,
      "title": "Chapter 22 — Weekly operating rhythm",
      "paragraphs": [
        "A useful operating rhythm keeps the team close to users and prevents activity from becoming a substitute for progress.\nMonday: Review and prioritise\n- Review activation, retention, revenue, and acquisition.\n- Read user feedback.\n- Identify the most important bottleneck.\n- Choose one or two priorities for the week.\nTuesday–Wednesday: Build and test\n- Work on the highest-impact product improvement.\n- Keep scope narrow.\n- Test the core flow.\n- Review analytics instrumentation.\nThursday: Distribution\n- Create or coordinate content.\n- Contact relevant creators or partners.\n- Review paid campaigns, if running.\n- Compare acquisition quality.\nFriday: Learn and decide\n- Review experiments.\n- Document what changed.\n- Decide what to keep, reverse, or test next.\n- Update the roadmap.\nThis is a suggested cadence, not a schedule specified in the interview. Adapt it to team size and product stage.\nProtect maker time\nAvoid filling every day with meetings and minor administrative tasks. Founders need time for difficult work: understanding users, improving the product, solving technical problems, and making important distribution decisions."
      ]
    },
    {
      "id": "chapter-23",
      "number": 23,
      "title": "Chapter 23 — Metrics and decision dashboard",
      "paragraphs": [
        "A small dashboard is more useful than a wall of numbers that nobody acts on.\nProduct metrics\nMetric\tDefinition or question\nInstalls\tHow many people install the app?\nOnboarding completion\tHow many finish setup?\nActivation rate\tHow many reach the core value moment?\nCore feature usage\tAre users using the main utility?\nRetention\tDo users return over time?\nCrash-free sessions\tIs the app reliable?\nSupport contacts\tWhere are users getting stuck?",
        "Business metrics\nMetric\tDefinition or question\nTrials\tHow many users begin a trial?\nPaid conversion\tHow many become paying customers?\nMRR\tMonthly recurring revenue\nARR\tAnnual recurring revenue run-rate\nRefund rate\tHow much revenue is refunded?\nRenewal rate\tHow many subscriptions renew?\nCAC\tCost to acquire a paying customer\nRevenue by cohort\tHow much does each user group generate?\nContribution margin\tWhat remains after relevant variable costs?",
        "Distribution metrics\n- Spend by channel.\n- Reach and clicks.\n- Store-page conversion.\n- Cost per install.\n- Cost per activated user.\n- Cost per paying customer.\n- Revenue and retention by acquisition source.\nUse metrics to make decisions\nA dashboard is not a trophy. Every metric should support a question or decision.",
        "Examples:\n- If installs rise but activation falls, inspect the acquisition audience and onboarding.\n- If activation rises but retention does not, investigate whether the core product delivers recurring value.\n- If paid conversion rises but refunds also rise, inspect pricing clarity and expectation-setting.\n- If one channel has low CAC but poor retention, do not scale it based on install cost alone."
      ]
    },
    {
      "id": "chapter-24",
      "number": 24,
      "title": "Chapter 24 — Experiment templates",
      "paragraphs": [
        "Template A: Product experiment\nProblem observed:\nWhat is happening, and where is the evidence?",
        "User segment:\nWho experiences this problem?",
        "Hypothesis:\nIf we change ______, then ______ will improve because ______.",
        "Change:\nWhat exactly will be different?",
        "Primary metric:\nWhat is the closest measurable outcome?",
        "Guardrails:\nWhat must not get worse?",
        "Test window:\nWhen will the test begin and end?",
        "Result:\nWhat happened?",
        "Decision:\nKeep / revert / iterate.",
        "Learning:\nWhat did this teach us about users?\nTemplate B: Acquisition channel test\nChannel:\nCreator / paid social / search / community / referral / other.",
        "Audience:\nWho should see the offer?",
        "Creative or message:\nWhat promise is being communicated?",
        "Budget or effort limit:\nWhat is the maximum acceptable test cost?",
        "Tracking:\nHow will installs and downstream behaviour be attributed?",
        "Primary metric:\nCost per activated user or paying customer.",
        "Quality metrics:\nRetention, revenue, refunds, and support burden.",
        "Decision:\nScale / revise / stop.\nTemplate C: Power-user interview\n1. What originally made you try the app?\n2. What problem were you hoping it would solve?\n3. What do you use most often?\n4. When do you usually open the app?\n5. What would you miss if the app disappeared?\n6. What feels confusing or frustrating?\n7. What alternatives have you tried?\n8. What would make the app more valuable?\n9. Have you recommended it to anyone? Why?\n10. What almost made you stop using it?\nAvoid leading questions such as “You love this feature, right?” Ask for examples of real behaviour."
      ]
    },
    {
      "id": "chapter-25",
      "number": 25,
      "title": "Chapter 25 — User research and power-user interview guide",
      "paragraphs": [
        "Analytics can show what happened, but conversations help explain why.\nRecruit users across different behaviours\nSpeak with:\n- Highly engaged users.\n- New users.\n- Users who completed onboarding but did not return.\n- Users who abandoned onboarding.\n- Paying users.\n- Users who cancelled or requested refunds.\nDo not interview only enthusiastic fans. Users who leave can reveal important product weaknesses.\nAsk about actual events\nInstead of asking “Would you use this feature?”, ask:\n- “Tell me about the last time this problem happened.”\n- “What did you do?”\n- “What tools did you try?”\n- “What was frustrating?”\n- “Did you pay for anything to solve it?”\n- “What happened after you tried that solution?”\nPast behaviour is generally more informative than hypothetical enthusiasm.\nTurn research into product decisions\nAfter each conversation, classify findings:\n- Repeated pain point.\n- Confusing product step.\n- Missing capability.\n- Unexpected use case.\n- Pricing objection.\n- Trust or privacy concern.\n- Acquisition source.\n- Reason for churn.\nLook for patterns across users. One person's request should not automatically become a product feature."
      ]
    },
    {
      "id": "chapter-26",
      "number": 26,
      "title": "Chapter 26 — Launch checklist",
      "paragraphs": [
        "Product\n- [ ] Core use case is clear.\n- [ ] First-session experience is understandable.\n- [ ] Core function works reliably.\n- [ ] Permissions are requested with clear explanations.\n- [ ] Analytics events are tested.\n- [ ] Crash monitoring is enabled.\n- [ ] Support process exists.\n- [ ] Privacy and data practices are documented.\nMonetisation\n- [ ] Pricing is clear.\n- [ ] Subscription terms are understandable.\n- [ ] Trial terms are disclosed.\n- [ ] Purchase flow is tested.\n- [ ] Restore purchases works.\n- [ ] Cancellation information is accessible.\n- [ ] Refund and support process is defined.\nDistribution\n- [ ] Target audience is defined.\n- [ ] Store listing explains the main value.\n- [ ] Screenshots demonstrate the core experience.\n- [ ] Launch content is prepared.\n- [ ] Waitlist or beta invitations are ready.\n- [ ] Acquisition links and attribution are tested.\nOperations\n- [ ] App ownership and access are documented.\n- [ ] Critical credentials are secured.\n- [ ] Team responsibilities are clear.\n- [ ] Contractor agreements are in place where needed.\n- [ ] A rollback and incident process exists."
      ]
    },
    {
      "id": "chapter-27",
      "number": 27,
      "title": "Chapter 27 — Common mistakes and traps",
      "paragraphs": [
        "1. Building a super app too early\nMore features create more complexity. Start with one user, one problem, and one core function.\n2. Chasing trends instead of understanding users\nA trend can create attention without creating lasting value. Build something you understand and can improve.\n3. Copying an existing app without a point of difference\nCompetition is not automatically bad, but a copy needs a clear reason for users to choose it. Find a specific unmet need, audience, or interaction.\n4. Treating downloads as proof of product success\nDownloads do not tell you whether users activate, return, subscribe, or receive value.\n5. Ignoring power users\nHighly engaged users can reveal the product's strongest value proposition and most important behaviours.\n6. Making product decisions without analytics\nWithout instrumentation, teams can spend months guessing about onboarding, retention, and feature usage.\n7. Running experiments without a hypothesis\nChanging random UI elements creates activity but not necessarily learning. State what you expect to change and why.\n8. Scaling acquisition before understanding retention\nMore installs can amplify a weak product funnel. Establish product quality and cohort economics before scaling aggressively.\n9. Optimising for cheap installs only\nA low-cost install is not necessarily a valuable customer. Compare channels using activation, retention, and revenue.\n10. Building alone by default\nA complementary co-founder or carefully selected contractors can increase execution capacity. But a bad partnership can create more problems than it solves.\n11. Quitting employment without runway\nEntrepreneurship involves uncertainty. Protect your downside and make the decision using business evidence and personal obligations.\n12. Staying busy instead of making high-impact decisions\nThe founder's closing advice was that some decisions produce far greater impact than many small tasks. Identify the changes that could materially improve the product or business, and delegate or eliminate low-value work where possible."
      ]
    },
    {
      "id": "chapter-28",
      "number": 28,
      "title": "Chapter 28 — Founder decision principles",
      "paragraphs": [
        "The interview contains several principles worth turning into an operating philosophy.\nPrinciple 1: Build around a problem you care about\nThe work will become difficult. Genuine interest helps sustain attention through setbacks.\nPrinciple 2: Keep the first product narrow\nA simple utility for a specific user is easier to build, explain, test, and improve than a broad platform.\nPrinciple 3: Use your own product\nBecome a real user. Experience the friction and improve the product honestly.\nPrinciple 4: Observe what users do\nDo not rely only on what users say. Combine analytics, interviews, support, and cohort analysis.\nPrinciple 5: Study the most engaged users\nUnderstand what they do differently and help more users reach the same value.\nPrinciple 6: Experiment relentlessly\nSmall changes can create meaningful improvements. Most tests may fail to move the metric; the purpose is to learn.\nPrinciple 7: Scale what works\nDo not spread effort equally across every possible channel. Double down on the channels that produce valuable users.\nPrinciple 8: Understand audience economics\nDifferent acquisition sources can bring users with different retention and revenue profiles.\nPrinciple 9: Build a team that multiplies capability\nFind people whose strengths complement yours. Agree on roles and expectations.\nPrinciple 10: Watch for delayed results\nThe founder warned that inputs and outcomes can be separated by a meaningful delay. Continue doing useful work, but keep checking whether the strategy is supported by evidence. Persistence is not the same as refusing to adapt.\nPrinciple 11: Prioritise high-leverage decisions\nDo not confuse busyness with progress. A product change, distribution breakthrough, or operational improvement can matter more than dozens of minor tasks."
      ]
    },
    {
      "id": "chapter-29",
      "number": 29,
      "title": "Chapter 29 — From a useful app to a durable business",
      "paragraphs": [
        "A product becomes a business when it repeatedly creates value and can acquire and retain customers in a financially sustainable way.",
        "The Brain Rot case illustrates several connected systems:\n1. Problem discovery: the founder experienced the underlying problem.\n2. Product concept: a digital pet made screen-time behaviour visible.\n3. Distribution: an existing audience helped create launch momentum.\n4. Monetisation: subscriptions provided a recurring revenue model.\n5. Analytics: user behaviour helped reveal power users and product opportunities.\n6. Experimentation: small product changes improved the experience.\n7. Acquisition: influencer content and paid ads were scaled because they worked for the business.\n8. Team: a co-founder increased the company's capacity.\nThese systems reinforce one another, but none can compensate indefinitely for a product that does not deliver value.\nThe compounding loop\nA practical way to think about the business:",
        "Better product → more user value → stronger retention → better economics → more room to invest in distribution → more users and feedback → better product.",
        "This loop is a strategic model, not a guarantee. It only works when the product creates real value and the economics are sustainable.\nWhat to focus on at each stage\nStage\tPrimary question\tPriority\nIdea\tIs the problem real?\tUser discovery\nPrototype\tDoes the concept make sense?\tUsability testing\nMVP\tCan users get value?\tCore functionality\nEarly launch\tWho uses it and why?\tAnalytics and interviews\nRetention\tWhy do users return or leave?\tProduct improvement\nGrowth\tWhich channels produce good users?\tAcquisition experiments\nScale\tCan the economics support more volume?\tMargins, systems, team",
        "Do not jump to scaling before understanding the earlier stages."
      ]
    },
    {
      "id": "chapter-30",
      "number": 30,
      "title": "Chapter 30 — Final execution checklist",
      "paragraphs": [
        "Use this checklist as the operating summary.\nIdea\n- [ ] I understand the problem personally.\n- [ ] I have spoken with other people who experience it.\n- [ ] I can describe one specific target user.\n- [ ] I can explain the core value in one sentence.\n- [ ] I know why the product should be different from current alternatives.\nProduct\n- [ ] The first version solves one core problem.\n- [ ] The main action is easy to understand.\n- [ ] I use the product myself.\n- [ ] I have tested the flow with real users.\n- [ ] I have postponed nonessential features.\nAnalytics\n- [ ] I track onboarding.\n- [ ] I have a testable activation definition.\n- [ ] I track core feature usage.\n- [ ] I review retention by cohort.\n- [ ] I can identify power users.\n- [ ] I know where users abandon the product.\nExperimentation\n- [ ] Every experiment has a hypothesis.\n- [ ] I define a primary metric.\n- [ ] I monitor guardrail metrics.\n- [ ] I document results.\n- [ ] I act on what the results teach me.\nDistribution\n- [ ] I know where my target users spend time.\n- [ ] I test relevant channels.\n- [ ] I track activated users, not just installs.\n- [ ] I compare channel quality and cost.\n- [ ] I scale only when the funnel and economics support it.\nBusiness\n- [ ] My pricing matches recurring customer value.\n- [ ] I understand net revenue and variable costs.\n- [ ] I have a realistic cash runway.\n- [ ] Team roles and ownership are clear.\n- [ ] I focus on high-leverage work."
      ]
    },
    {
      "id": "chapter-31",
      "number": 31,
      "title": "Chapter 31 — What the source does—and does not—establish",
      "paragraphs": [
        "Directly reported in the interview\n- Brain Rot is a gamified screen-time app with a digital pet brain.\n- Its core functionality includes screen-time information, app-blocking rules, statistics, and an interruption flow that adds friction before opening selected apps.\n- The founder said the app launched in summer 2025.\n- The founder reported growth from around $10,000 per month to around $400,000 per month.\n- The founder reported around two million downloads and approximately 150,000-plus users.\n- The founder said annual subscriptions were the main sales model.\n- The founder had built an Instagram audience before launch and reported approximately $10,000 in launch-day revenue.\n- Influencer content and paid ads were described as important growth channels.\n- The founder emphasised analytics, power users, activation, experimentation, and cohort-level acquisition value.\n- The founder said his co-founder was a major force multiplier.\n- The founder named Mixpanel, Firebase, Supabase, Superwall, Appstack, Claude Code, Codex, and Upwork as tools used by the business.\nNot established by the transcript\nThe interview does not provide:\n- Audited proof of monthly revenue.\n- Net profit or operating margin.\n- The exact subscription prices or plan mix.\n- App Store fees, refunds, taxes, or payment costs.\n- Advertising spend or influencer fees.\n- CAC, LTV, payback period, or retention figures.\n- Exact activation or onboarding conversion rates.\n- The size or conversion rate of the waitlist.\n- A complete technical architecture.\n- A detailed staffing or equity structure.\n- A guarantee that the same approach will work for another founder.\nFinal lesson\nThe strongest lesson from this case is not that an iOS app can automatically become a $400,000-per-month business. It is that a founder can start with a problem they understand, build a focused utility around it, develop distribution, observe how users behave, improve the product through experiments, and scale the channels that produce valuable customers.",
        "Start narrow. Make the product genuinely useful. Measure what users do. Learn from the people who love it. Improve the experience. Then scale what the evidence supports."
      ]
    }
  ]
};
