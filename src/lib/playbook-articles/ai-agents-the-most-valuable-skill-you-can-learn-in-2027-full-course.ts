import { PlaybookArticle } from "./types";

export const AI_AGENTS_2027_ARTICLE: PlaybookArticle = {
  "slug": "ai-agents-the-most-valuable-skill-you-can-learn-in-2027-full-course",
  "title": "AI Agents: The Most Valuable Skill You Can Learn in 2027 (Full Course)",
  "readingTime": "45 min read",
  "categoryName": "AI",
  "categorySlug": "ai-businesses",
  "thumbnail": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996169/AI_Agents_The_Most_Valuable_Skill_You_Can_Learn_in_2027_Full_Course.png",
  "publishedDate": "2026",
  "authorName": "Pranav Joshi",
  "authorTitle": "AI Systems Architect & Automation Engineer",
  "introParagraphs": [
    "The practical playbook for building an AI operating system with context, tools, skills, and repeatable workflows\nHow to use this playbook\nThis playbook converts the supplied transcript into a practical implementation guide. It preserves the source's central frameworks, terminology, demonstrations, and operating philosophy while reorganising them into a sequence you can follow.",
    "The core lesson is not “find the perfect prompt” or “use the most powerful model.” It is to learn how to configure an AI agent around a real job:\n- Give it reliable context.\n- Give it access to the tools required to act.\n- Teach it repeatable procedures through skills.\n- Define the outcome clearly.\n- Review its work and improve the system.\nThe transcript is a practitioner account, not a formal technical specification. Tool names, product interfaces, model capabilities, and connector availability can change. Treat named products as examples of categories, not permanent recommendations. The source's productivity multipliers and business predictions are opinions and anecdotes, not guaranteed results.\nPart I — The shift from chat to agents"
  ],
  "chapters": [
    {
      "id": "chapter-1",
      "number": 1,
      "title": "Chapter 1 — Two stages of practical AI use",
      "paragraphs": [
        "The transcript describes a shift from using AI primarily through chat to using AI agents to complete multi-step work.\nStage 1: Chat — question to answer\nA chat model behaves like a capable consultant. You ask a question, provide information, and receive an answer. You remain responsible for carrying out the work.",
        "Good chat use cases include:\n- Explaining a concept.\n- Comparing two options.\n- Brainstorming campaign angles.\n- Critiquing a draft.\n- Thinking through a decision.\n- Asking quick, self-contained questions.\nChat remains useful. If you only need a quick answer, setting up an agent workflow can be unnecessary overhead.\nStage 2: Agents — goal to result\nAn agent receives an objective and works through the steps required to produce a deliverable. It can inspect information, decide what to do next, use tools, check the results, and continue until it reaches the defined outcome or a limitation.",
        "Examples:\n- Research ten relevant podcasts and create a presentation.\n- Analyse social videos and produce a ranked report.\n- Prepare a marketing campaign using a brief, product catalogue, and brand guidelines.\n- Review an inbox, classify messages, and draft replies.\n- Gather business data and produce a recurring report.\n- Find competitor ads, inspect their landing pages, and organise the findings.\nThe important distinction is not that agents are magically intelligent in a different way. It is that the system can take actions and complete a multi-step workflow rather than stopping after an answer.\nThe consultant-versus-employee analogy\nThink of a chat model as a brilliant consultant: it can advise you, but you still implement the advice.",
        "Think of an agent as a capable employee: you assign an outcome, and it can perform parts of the work using the systems and information you provide.",
        "That analogy also exposes the limitation. A capable person who knows nothing about your business, has no access to the required tools, and has never been taught your procedures will not perform well. The same is true of an agent."
      ]
    },
    {
      "id": "chapter-2",
      "number": 2,
      "title": "Chapter 2 — Decide when to use chat and when to use an agent",
      "paragraphs": [
        "Use chat when:\n- The task is small and self-contained.\n- You need an explanation, idea, answer, or critique.\n- No external action is required.\n- The result does not need to be saved into another system.\n- Setting up tools would take longer than doing the task yourself.\nUse an agent when:\n- The task has several steps.\n- It requires gathering information from multiple sources.\n- It involves moving information between applications.\n- It produces a defined deliverable.\n- It is repeated often enough to justify a reusable process.\n- It requires actions such as creating drafts, updating records, organising files, or generating reports.\nDecision question\tIf yes\tIf no\nIs there a concrete end result?\tConsider an agent\tUse chat to clarify the problem\nDoes the work involve multiple steps?\tConsider an agent\tA chat response may be enough\nDoes it need external tools or data?\tConnect the required tools\tKeep it simple\nWill you repeat it?\tTurn it into a skill or workflow\tRun it as a one-off task\nCould an incorrect action cause harm?\tAdd restrictions and approval gates\tStill verify the output",
        "Do not automate a process simply because it is possible. Automate it because the result is valuable and the workflow can be made reliable."
      ]
    },
    {
      "id": "chapter-3",
      "number": 3,
      "title": "Chapter 3 — What an agent actually is",
      "paragraphs": [
        "The source's simplest definition is:\n- Chat: question → answer\n- Agent: goal → result\nAn agent receives an objective, develops a plan, takes actions, observes the results, and adjusts its next step. It can repeat this process many times.",
        "For example, “research ten business podcasts I should appear on and put the findings into a ten-page presentation” implies several subtasks:\n1. Understand the intended audience and subject.\n2. Find relevant podcasts.\n3. Gather evidence about each podcast.\n4. Evaluate relevance.\n5. Select ten.\n6. Organise the findings.\n7. Create the presentation.\n8. Check that it contains ten useful entries.\n9. Return the finished file.\nA chat model might give you a list. An agent can potentially do the research and build the presentation, provided it has the right tools and instructions.\nAgent harness: the environment that runs the loop\nThe transcript uses the term agent harness for an application or environment that facilitates the agent loop. It names tools such as Claude Code, Claude Cowork, Codex, Manus, and Perplexity Computer as examples.",
        "A person configuring an existing harness for a specific job is often better described as tuning an agent than building an entirely new agent runtime. The platform provides the loop; you configure it around the work you need done."
      ]
    },
    {
      "id": "chapter-4",
      "number": 4,
      "title": "Chapter 4 — The observe–think–act loop",
      "paragraphs": [
        "The source explains agent behaviour through three repeating steps:\n1. Observe: inspect the current situation and available information.\n2. Think: decide the next useful step.\n3. Act: take that step using an available tool or capability.\nThen the agent observes again. The loop continues until the requested outcome is achieved, or the agent reaches a limitation that requires help.\nExample: analysing social videos\nThe source demonstration asked an agent to analyse Instagram videos and create an HTML report explaining:\n- Which videos performed best.\n- Their angles and topics.\n- Their titles and hooks.\n- Why each video may have worked.\n- Patterns that could inform future content.\nThe agent first searched the available files and found a dataset containing video performance information. It then noticed that the spoken hook from the first few seconds was missing. Rather than pretending the data was complete, it identified the gap and pursued another route to retrieve the missing information. It then assembled the report.",
        "The example illustrates a useful workflow:\n- Search existing information before collecting it again.\n- Inspect data quality and completeness.\n- Identify the bottleneck.\n- Use another tool or delegated task when necessary.\n- Produce the requested deliverable.\n- Stop when the deliverable meets the stated requirements.\nDefine “done” before the agent starts\nAn agent's stopping point depends heavily on the goal you give it. “Research some podcasts” is vague. “Find ten relevant business podcasts, include audience fit and evidence for each, rank them, and create a ten-slide presentation” is much clearer.",
        "A strong task definition states:\n- Objective.\n- Scope.\n- Sources or systems to use.\n- Expected output.\n- Required level of detail.\n- Constraints.\n- Completion criteria.\n- What to do if information is missing.\nThe clearer the finish line, the easier it is to evaluate the result."
      ]
    },
    {
      "id": "chapter-5",
      "number": 5,
      "title": "Chapter 5 — Context, skills, model, and tools",
      "paragraphs": [
        "The source identifies four levers for improving an agent:\nAgent stage\tLever\tWhat it controls\nObserve\tContext\tWhat the agent knows about you, the business, and the task\nObserve\tSkills\tThe procedures and standards it should follow\nThink\tModel\tThe reasoning capability used to choose the next step\nAct\tTools\tThe systems and actions available to the agent",
        "These levers work together. A more capable model is not automatically the best solution if it lacks relevant context, procedures, or access to the tools needed to complete the work.\nThe vehicle analogy\nThe source compares models and agent platforms to different vehicles. One may be faster or have a feature another lacks, but knowing how to drive is more fundamental than memorising one vehicle.",
        "The transferable skill is learning the operating principles:\n- Give the system useful context.\n- Teach it the procedure.\n- Connect the tools.\n- Define the desired result.\n- Verify its work.\nOnce you understand those fundamentals, moving between agent platforms becomes easier."
      ]
    },
    {
      "id": "chapter-6",
      "number": 6,
      "title": "Chapter 6 — Treat agent setup like onboarding an employee",
      "paragraphs": [
        "Imagine hiring a very capable person who:\n- Has strong general problem-solving ability.\n- Can work through many tasks.\n- Does not yet know your business.\n- Does not know your standards.\n- Has not been given access to your applications.\n- Has not been trained on your processes.\nYou would not expect that person to perform well without onboarding.",
        "The same onboarding has three pillars:\nContext\nGive the agent the information it should already know.\nTools\nGive it access to the systems required to perform the work.\nSkills\nGive it procedures, checklists, standards, and repeatable methods that define how the work should be done.",
        "A practical onboarding sequence:\n1. Create a working folder or project.\n2. Write a concise top-level instruction file.\n3. Add accurate context documents.\n4. Connect only the tools required for the job.\n5. Document recurring procedures as skills.\n6. Test with a low-risk task.\n7. Review the result and correct the system.\n8. Reuse the improved setup."
      ]
    },
    {
      "id": "chapter-7",
      "number": 7,
      "title": "Chapter 7 — What context means",
      "paragraphs": [
        "Context is the information an agent should have before it begins a task. It is the difference between asking a stranger to write something for an unknown business and asking a trained employee who understands the company, customer, offer, and brand.",
        "Useful context can include:\n- Information about the user or operator.\n- Business overview.\n- Brand voice.\n- Ideal customer profile.\n- Product and service catalogue.\n- Offer structure and pricing.\n- Company values and operating principles.\n- Relevant examples.\n- Preferences and constraints.\n- Definitions of important internal terms.\nThe source recommends building these as files the operator owns and can inspect, rather than relying entirely on hidden or platform-specific memory."
      ]
    },
    {
      "id": "chapter-8",
      "number": 8,
      "title": "Chapter 8 — Why Markdown files are useful",
      "paragraphs": [
        "Markdown (.md) is a plain-text format with lightweight structure such as headings, bullet points, numbered lists, and emphasis.",
        "It is useful for agent context because:\n- People can read and edit it easily.\n- Agents can inspect it as text.\n- It is portable between tools.\n- It can be maintained like other project files.\n- It avoids relying exclusively on opaque platform settings.\nA PDF may contain the same words, but an agent may need to extract or interpret the document before using the text. Markdown is already text-based and structured.",
        "Markdown does not make information automatically true or useful. The quality of the content matters more than the file extension.\nA practical Markdown style\nUse:\n- One clear topic per file.\n- Descriptive headings.\n- Short paragraphs.\n- Bullets for facts and rules.\n- Tables for structured comparisons.\n- Explicit labels for confirmed facts, estimates, and assumptions.\n- Dates for information that can become outdated.\nAvoid:\n- Long, unstructured walls of text.\n- Contradictory rules.\n- Unsupported claims.\n- Generic AI-generated filler.\n- Repeating the same information in many files.\n- Instructions too vague to apply."
      ]
    },
    {
      "id": "chapter-9",
      "number": 9,
      "title": "Chapter 9 — The foundational context files",
      "paragraphs": [
        "The source describes several separate context documents. You do not need to create every file on day one. Start with the files that materially improve the tasks you want to delegate.\n9.1 About the user\nThis file explains who the operator is and how they work.",
        "Possible contents:\n- Role and responsibilities.\n- Relevant experience.\n- Current priorities.\n- Skills and areas of expertise.\n- Communication preferences.\n- Professional background that is genuinely useful for work.\n- Constraints and recurring responsibilities.\nDo not put sensitive personal information into an agent workspace unless it is necessary and you understand the access and retention implications.\n9.2 Business information\nInclude:\n- Business name and description.\n- Products or services.\n- Target markets.\n- Business model.\n- Main channels.\n- Team structure and responsibilities.\n- Key systems.\n- Current priorities.\n- Important terminology.\n- What the business does not do.\n9.3 Brand voice\nDescribe how the business should communicate:\n- Desired tone.\n- Formality level.\n- Sentence style.\n- Preferred vocabulary.\n- Words or phrases to avoid.\n- How the brand handles humour.\n- How it explains technical ideas.\n- Examples of strong and weak copy.\n- Channel-specific differences.\n“Sound friendly” is subjective. A few approved examples make the standard easier to apply.\n9.4 Ideal customer profile (ICP)\nThe ideal customer profile is one of the most important context documents for marketing and sales tasks.",
        "Include:\n- Customer type.\n- Industry or segment.\n- Relevant role or situation.\n- Problems the product actually solves.\n- Desired outcomes.\n- Buying triggers.\n- Objections.\n- Existing alternatives.\n- Budget or purchasing constraints, if known.\n- Evidence supporting each claim.\nBe careful not to invent customer pain points. An inaccurate ICP can contaminate every downstream marketing output. If a product does not solve a particular problem, do not add that problem to the ICP just because it sounds plausible.\n9.5 Offer catalogue\nDocument:\n- Every product or service.\n- Price and billing model.\n- Deliverables and exclusions.\n- Who each offer is for.\n- The problem each offer solves.\n- Guarantees or terms, where applicable.\n- Upsells, downsells, and related offers.\n- How the offers fit together.\nThe agent should not invent a price, promise, feature, or guarantee because the document is incomplete.\n9.6 Values and working preferences\nRecord:\n- Operating principles.\n- Decision preferences.\n- Quality standards.\n- Preferred collaboration style.\n- Communication conventions.\n- Formatting preferences.\n- What the operator considers unacceptable work.\nKeep objective business facts separate from subjective preferences. The distinction helps the agent avoid treating an opinion as a verified fact."
      ]
    },
    {
      "id": "chapter-10",
      "number": 10,
      "title": "Chapter 10 — Make context an asset, not AI-generated filler",
      "paragraphs": [
        "The source strongly emphasises that context files are assets for the individual and the company. A poor file can create repeated errors because many later tasks may rely on it.",
        "A practical process for building them:\n1. Ask a chat model to help design the documents you need.\n2. Have it interview you rather than invent your background.\n3. Answer in detail, using voice input if that is faster.\n4. Ask it to organise your answers into separate Markdown files.\n5. Review every line.\n6. Correct inaccuracies and remove assumptions.\n7. Add examples and evidence where they improve clarity.\n8. Approve the files before making them part of the agent's default context.\nThe transcript describes an interview-style process in which the operator spoke through their experience and preferences for an extended session, then used the resulting material to build context files.\nInterview prompt\nI want to build a set of accurate Markdown context files for an AI agent.",
        "First, propose the files that would be useful for my role and business.\nThen interview me one topic at a time. Ask follow-up questions when an answer is vague.\nDo not invent facts or fill gaps with assumptions.",
        "When the interview is complete, create separate Markdown files for:\n- About me\n- Business information\n- Brand voice\n- Ideal customer profile\n- Offer catalogue\n- Values and working preferences",
        "Label uncertain information as unknown or unverified.\nKeep objective facts separate from opinions and preferences.\nDo not treat an assumption as a confirmed fact."
      ]
    },
    {
      "id": "chapter-11",
      "number": 11,
      "title": "Chapter 11 — The top-level instruction file: CLAUDE.md / AGENTS.md",
      "paragraphs": [
        "The source describes a top-level Markdown file as the agent's “north star” or macro instruction file. In the demonstrated setup, Claude uses CLAUDE.md; other environments may use a differently named instruction file, such as AGENTS.md.",
        "The exact filename and automatic-loading behaviour depend on the harness. Check the documentation for the platform you use.",
        "The file should:\n- Explain the user's or business's high-level context.\n- Describe the folder structure.\n- Tell the agent which context files exist.\n- Explain when to load each file.\n- State important working rules.\n- Tell the agent to ask when information is missing.\n- Point to the memory and skills locations.\n- Define boundaries and approval requirements.\nExample top-level instruction file\n# Operating Instructions",
        "## Purpose\nThis folder is the working environment for my personal and business tasks.",
        "## Before every task\n1. Read this file.\n2. Identify which context documents are relevant.\n3. Read the relevant documents before making assumptions.\n4. Check applicable skills and follow their procedures.\n5. If a required fact is missing, ask me instead of inventing it.",
        "## Context\nThe `context/` folder contains:\n- `about-me.md`\n- `business.md`\n- `brand-voice.md`\n- `ideal-customer-profile.md`\n- `offers.md`\n- `values-and-preferences.md`",
        "Load only the files relevant to the current task unless I explicitly request a broader review.",
        "## Skills\nReusable procedures live in the `skills/` directory.\nUse the relevant skill when the task matches its purpose.",
        "## Memory\nCheck `memory.md` for approved lessons and preferences.\nWhen I correct a recurring behaviour, propose a concise rule to add.\nDo not save temporary details as permanent rules.",
        "## Working standards\n- Be accurate and explicit about uncertainty.\n- Do not fabricate facts, metrics, testimonials, or sources.\n- Preserve existing work unless I ask for a change.\n- Explain material assumptions.\n- Ask before sending messages, publishing content, spending money, deleting data, or making other consequential external changes.\nThis is an adaptable template, not a universal configuration file. Adjust filenames and syntax to the harness you use."
      ]
    },
    {
      "id": "chapter-12",
      "number": 12,
      "title": "Chapter 12 — Organise context into folders",
      "paragraphs": [
        "The source demonstrates a simple progression.\nVersion 1: one top-level file\nStart with one file that tells the agent who you are and what you do.\nVersion 2: a dedicated context folder\nAs the system grows, move detailed information into separate files and point the top-level instruction file to them.",
        "Example:\nAI-OS/\n├── CLAUDE.md\n├── context/\n│   ├── about-me.md\n│   ├── business.md\n│   ├── brand-voice.md\n│   ├── ideal-customer-profile.md\n│   ├── offers.md\n│   └── values-and-preferences.md\n├── memory.md\n├── skills/\n└── active/\nThe top-level file is the map. The context folder is the library.\nLoad only relevant context\nThe source recommends keeping information compartmentalised and telling the agent to load relevant files before a task. For example, a marketing task may need the business overview, brand voice, ICP, and offer catalogue. A finance task may need finance policies and reporting definitions instead.",
        "Do not automatically load every document into every task if it creates unnecessary noise or consumes valuable context capacity."
      ]
    },
    {
      "id": "chapter-13",
      "number": 13,
      "title": "Chapter 13 — Context windows and context rot",
      "paragraphs": [
        "An agent session has a finite context window: a limit on how much information can be considered at once. As a session becomes crowded, earlier information may become less accessible or the model may lose track of details.",
        "The source calls the resulting degradation context rot.",
        "Practical habits:\n- Start a fresh session for a new substantial task.\n- Keep persistent facts in files, not only in a long conversation.\n- Use concise top-level instructions.\n- Load task-relevant context.\n- Summarise important decisions before switching sessions.\n- Avoid repeatedly pasting large amounts of irrelevant material.\n- Check the harness's context-usage tools where available.\nA long conversation is not a reliable knowledge base. Important information should be stored in an intentional, inspectable location."
      ]
    },
    {
      "id": "chapter-14",
      "number": 14,
      "title": "Chapter 14 — A controlled memory system",
      "paragraphs": [
        "Context describes what the agent should know. Memory captures lessons and preferences learned through work.",
        "The source demonstrates a memory.md file containing rules such as:\n- Avoid overly formal writing.\n- Use real examples rather than generic placeholders.\n- Apply a recurring design preference.\nThe top-level instruction file points the agent to this memory file and tells it to check the rules before tasks. When the operator corrects a recurring behaviour, the agent adds a concise lesson.\nExample memory file\n# Approved Working Memory",
        "## Writing\n- Prefer direct, natural language.\n- Avoid unnecessary formality.\n- Use concrete examples rather than generic placeholders.",
        "## Design\n- For website work in this project, use the approved dark theme.\n- Do not change the established design system without approval.",
        "## Workflow lessons\n- Before creating a client proposal, follow the proposal skill.\n- Ask when a required client fact is missing.\nMemory update instruction\nWhen I correct a recurring preference or process:\n1. Decide whether it is a durable rule or a one-time correction.\n2. If durable, propose a concise rule for memory.md.\n3. Do not save sensitive or irrelevant information.\n4. Check for conflicts with existing rules.\n5. Tell me what you propose to add.\n6. Do not change the memory file until I approve the rule.\nThe source demonstrates automatic updates to memory. For a safer implementation, keep review or approval in the loop, especially when the agent can edit files.\nAudit memory periodically\nAs memory grows, rules can become repetitive, outdated, or contradictory. Periodically ask the agent to:\n- Find duplicates.\n- Identify conflicts.\n- Flag rules that may be outdated.\n- Separate global preferences from project-specific rules.\n- Propose a cleaned version.\nReview the proposed changes before replacing the existing file.\nOwn your context\nA major reason for using files is portability. If your context and preferences exist only inside one product's hidden memory, moving to another agent harness may require rebuilding them.",
        "Files you control can be reused across tools. Keep them in a secure location, maintain backups, and avoid storing credentials or secrets in plain text."
      ]
    },
    {
      "id": "chapter-15",
      "number": 15,
      "title": "Chapter 15 — What tools do",
      "paragraphs": [
        "Tools are the agent's ability to act. Without tools, an agent may be able to reason about an email, spreadsheet, or campaign but cannot necessarily access or change it.",
        "Examples mentioned in the source include:\n- Browser access.\n- Local computer and file access.\n- Gmail or email systems.\n- Notion and document workspaces.\n- Slack.\n- Shopify.\n- Advertising platforms.\n- Analytics systems.\n- Image-generation services.\n- Web scraping and crawling tools.\nThe right tools depend on the job. An agent that writes a report may need access to source data and a file output capability. An agent that prepares a campaign may need the campaign brief, product assets, email platform, and advertising platform."
      ]
    },
    {
      "id": "chapter-16",
      "number": 16,
      "title": "Chapter 16 — Connectors and MCP: the universal translator idea",
      "paragraphs": [
        "The transcript discusses MCP (Model Context Protocol) and MCP connectors as a way to connect an agent to external tools and services.",
        "The source's “universal translator” analogy is useful: instead of manually copying information between applications, a compatible connector can expose a service's data or actions to the agent in a standardised way.",
        "For example, an agent might:\n1. Read a campaign brief from a workspace.\n2. Retrieve product information from an ecommerce platform.\n3. Draft email content.\n4. Prepare creative assets through an image tool.\n5. Create campaign drafts in the email and advertising platforms.\n6. Return a review package for approval.\nMCP is not magic access to every application. The connector must exist, be configured, have the required permissions, and support the actions you want. Some services may instead use native integrations, APIs, browser automation, or other connector mechanisms.\nConnector selection checklist\nBefore connecting a service, ask:\n- Does the connector support the exact read or write action needed?\n- Which account and data can it access?\n- Does it need read-only or write permission?\n- Can it create drafts without publishing?\n- Can permissions be limited?\n- Is the connector maintained and trustworthy?\n- How are errors reported?\n- Can actions be audited?\n- What happens if the connector returns incomplete or stale data?\nConnect only what the agent needs. More connectors can increase capability, but they also increase complexity and risk."
      ]
    },
    {
      "id": "chapter-17",
      "number": 17,
      "title": "Chapter 17 — A practical starter tool stack",
      "paragraphs": [
        "The transcript names several tools during demonstrations. Their roles are more important than the brand names:\nTool category\tRole in the workflow\tExample mentioned in source\nAgent harness\tRuns the observe–think–act loop\tClaude Code, Claude Cowork, Codex, Manus\nWeb research\tFinds public information\tBuilt-in web search\nWeb scraping / crawling\tExtracts public pages and ad-library information\tApify, Firecrawl\nApp connector layer\tConnects agents to external services\tComposio and MCP connectors\nBrowser inspection\tHelps inspect browser pages and behaviour\tChrome DevTools MCP\nEmail / newsletter platform\tReads campaign and subscriber data\tbeehiiv\nEcommerce platform\tSupplies product and store information\tShopify\nWorkspace\tStores briefs, documents, and project data\tNotion\nImage generation\tCreates visual assets\tHiggsfield and image models\nVoice input\tCaptures thoughts quickly\tWhisper Flow",
        "This is a source-derived list of examples, not an endorsement or claim that every product currently supports every described feature."
      ]
    },
    {
      "id": "chapter-18",
      "number": 18,
      "title": "Chapter 18 — Security and permissions",
      "paragraphs": [
        "The transcript explicitly raises security and permissions as a core consideration when connecting tools. This matters because an agent may have access to email, files, customer records, advertising accounts, and other sensitive systems.",
        "Use the principle of least privilege:\n- Give read-only access when reading is sufficient.\n- Grant write access only when the task requires it.\n- Use separate accounts or workspaces where practical.\n- Avoid sharing passwords or API keys in prompts or plain-text context files.\n- Use a secrets manager or the platform's secure credential mechanism.\n- Limit access to the relevant folders, records, and accounts.\n- Keep an audit trail for consequential actions.\n- Revoke access when it is no longer needed.\nHuman approval gates\nKeep human approval for actions such as:\n- Sending external emails or messages.\n- Publishing public content.\n- Launching or changing paid advertising.\n- Issuing refunds or payments.\n- Changing prices or product availability.\n- Deleting or overwriting important files.\n- Modifying customer or employee records.\n- Sharing confidential information.\nA good early workflow lets the agent prepare the work and save it as a draft. You inspect it, approve it, and only then allow the final action.\nTreat retrieved content as untrusted\nA webpage, email, document, or customer message may contain instructions that are irrelevant or malicious. The agent should treat retrieved content as data, not as permission to override its operating rules. Do not let content from an external source grant itself access or authorise actions."
      ]
    },
    {
      "id": "chapter-19",
      "number": 19,
      "title": "Chapter 19 — What a skill is",
      "paragraphs": [
        "A skill is a reusable procedure or SOP that tells an agent how to perform a recurring task.",
        "The source compares skills to the SOPs and reference documents you would give an employee. A skill can include:\n- When to use it.\n- Required inputs.\n- Tools to use.\n- Step-by-step process.\n- Decision rules.\n- Quality standards.\n- Examples.\n- Expected output.\n- Error handling.\n- Completion checks.\nContext tells the agent what it needs to know. Tools let it act. Skills tell it how to perform a particular job consistently.\nWhy skills matter\nImagine spending 15–20 minutes correcting an agent until it creates a client proposal exactly the way you want. If you start a fresh session next week, those corrections may not be available.",
        "You could store a general preference in memory, but the source argues that a detailed, repeatable workflow belongs in a skill. Ask the agent to convert the successful process—including your corrections and an approved example—into a reusable SOP.",
        "Then the next time you request a proposal, the agent can follow the saved procedure instead of rediscovering it."
      ]
    },
    {
      "id": "chapter-20",
      "number": 20,
      "title": "Chapter 20 — What belongs in a skill",
      "paragraphs": [
        "A useful skill should be specific enough to execute.\nSection\tWhat to include\nPurpose\tWhat job the skill performs\nTrigger\tWhen the agent should use it\nInputs\tFiles, links, data, or answers required\nPreconditions\tRequired context and connected tools\nProcedure\tOrdered steps\nDecision rules\tHow to choose between alternatives\nQuality bar\tWhat good work looks like\nOutput\tExact deliverables and format\nVerification\tHow to check the work\nBoundaries\tWhat the agent must not do\nExamples\tApproved examples and counterexamples",
        "Avoid making one giant skill that tries to cover unrelated jobs. Split procedures when they have distinct inputs, steps, or quality standards."
      ]
    },
    {
      "id": "chapter-21",
      "number": 21,
      "title": "Chapter 21 — Build a skill from a task you have completed",
      "paragraphs": [
        "The source describes a bottom-up method and uses it for most of its skills.\n1. Start a new session.\n2. Give the agent a real task.\n3. Provide the necessary context and tools.\n4. Let it perform the work.\n5. Correct it when it misses your standard.\n6. Explain why the correction matters.\n7. Continue until the output is acceptable.\n8. Ask it to package the successful process as a skill.\n9. Review the skill for accuracy and missing steps.\n10. Test the skill on a different example.\nSkill creation prompt\nWe have just completed this task together, and I want to repeat it in the future.",
        "Turn the process into a reusable skill.",
        "Capture:\n- When the skill should be used.\n- Required inputs and prerequisites.\n- Tools and sources used.\n- The exact sequence of steps.\n- Decisions and checks made along the way.\n- My corrections and preferences.\n- Common failure cases and how to handle them.\n- The expected final deliverable.\n- A quality-control checklist.",
        "Do not invent steps we did not perform.\nSeparate required steps from optional improvements.\nInclude an approved example if useful.\nSave the skill in the project's skills directory and show me the complete file for review."
      ]
    },
    {
      "id": "chapter-22",
      "number": 22,
      "title": "Chapter 22 — Two approaches to creating skills",
      "paragraphs": [
        "The source distinguishes two broad approaches.\nBottom-up: perform first, document second\nThis is the source's usual method.\n- Start with a real task.\n- Work through it with the agent.\n- Give feedback and corrections.\n- Once the result is right, ask the agent to turn the process into a skill.\nThis is especially useful when you know what a good result looks like but have not yet written down the full procedure.\nTop-down: specify the procedure first\nWrite the process before executing it. This works when:\n- The workflow is already well documented.\n- You have an established SOP.\n- The task is straightforward.\n- You know the required inputs, steps, and outputs.\nYou can also combine the two: write a first draft of the procedure, run it, then improve it based on real execution."
      ]
    },
    {
      "id": "chapter-23",
      "number": 23,
      "title": "Chapter 23 — Example skill: competitor ad research",
      "paragraphs": [
        "The transcript demonstrates an ads-analysis skill. The operator gives the agent a competitor's ad-library URL. The skill orchestrates research and produces a structured report.",
        "A workflow based on the demonstration:\n1. Receive the competitor's ad-library URL.\n2. Use the configured scraping tool to collect the available ads.\n3. Save the ad assets and metadata.\n4. Identify landing pages linked from the ads.\n5. Capture or inspect those landing pages.\n6. Group ads by angle, format, offer, and other relevant patterns.\n7. Analyse recurring hooks and creative approaches.\n8. Summarise what appears effective and what could be tested differently.\n9. Save a master report and supporting files.\n10. Clearly label observations and hypotheses; do not claim to know actual performance unless reliable performance data is available.\nThe source's demo reports details such as the number and format of active ads, offer positioning, landing pages, and creative patterns. It also uses the analysis to identify positioning ideas—for example, framing a template as a broader operating system.",
        "Important distinction: public ad-library visibility does not necessarily reveal impressions, conversions, spend, or profitability. A long-running ad can be a clue, not proof of success.\nExample output structure\n# Competitor Ad Research",
        "## Executive summary\n## Competitor and offer overview\n## Ads collected\n## Creative formats and recurring angles\n## Hooks and messaging patterns\n## Landing-page analysis\n## Offer and pricing observations\n## Positioning opportunities\n## Ideas to test\n## Evidence gaps and limitations\n## Source links and collected assets"
      ]
    },
    {
      "id": "chapter-24",
      "number": 24,
      "title": "Chapter 24 — Example skill: product photography",
      "paragraphs": [
        "The transcript also demonstrates a product-shoot skill.",
        "The operator supplies a reference image of a product. The skill uses an image-generation service and a detailed procedure to create a consistent set of production-ready visual assets.",
        "A robust workflow:\n1. Receive the approved product reference image.\n2. Identify the product's non-negotiable physical features.\n3. Read the brand's visual guidelines.\n4. Define the intended scenes, angles, and crops.\n5. Generate the required image variations.\n6. Compare every output against the reference.\n7. Reject outputs that change product geometry, materials, details, or branding.\n8. Export the approved images in the required dimensions and formats.\n9. Organise the outputs for the relevant product page or campaign.\nThe transcript's example includes editorial-style scenes, alternate angles, and close-ups of material details. The skill makes a repeatable production workflow from a simple reference image.",
        "Do not assume generated images are accurate product photography. A human should verify that they do not misrepresent the product, its features, or materials."
      ]
    },
    {
      "id": "chapter-25",
      "number": 25,
      "title": "Chapter 25 — Example skill: newsletter subject-line research",
      "paragraphs": [
        "The transcript describes a skill that uses newsletter performance data to inform new subject lines.",
        "The process:\n1. Open the newsletter platform through its configured connector.\n2. Retrieve recent and historical subject lines.\n3. Collect available performance data.\n4. Identify patterns among stronger and weaker results.\n5. Avoid treating correlation as proof of causation.\n6. Use the findings to draft new subject lines for the latest newsletter.\n7. Apply the brand's established formatting preferences.\n8. Save a ranked set of options for review.\nThe source mentions analysing patterns such as bold positioning, tool-name overload, and recurring emoji conventions. Those are observations from the demonstration, not universal rules for every newsletter."
      ]
    },
    {
      "id": "chapter-26",
      "number": 26,
      "title": "Chapter 26 — A skill library should be built from real work",
      "paragraphs": [
        "Useful first skills might include:\n- Proposal creation.\n- Social media caption writing.\n- Competitor research.\n- Ad analysis.\n- Product photography.\n- Newsletter subject-line research.\n- Weekly reporting.\n- Customer-support triage.\n- Meeting preparation.\n- Research-to-presentation production.\nDo not create dozens of speculative skills before you have used them. Start with a task you repeat, make the process work, and then capture it."
      ]
    },
    {
      "id": "chapter-27",
      "number": 27,
      "title": "Chapter 27 — Why the folder structure matters",
      "paragraphs": [
        "The source describes an OS folder—an operating-system-style working directory—as the place from which the operator runs most tasks.",
        "The point is not to create a separate anthropomorphic agent for every job. The source argues that people often overcomplicate their setups by naming many “agents” when the underlying system is mostly folders, skills, context, and scheduled tasks.",
        "Instead of maintaining dozens of narrowly scoped agent identities, the operator uses one broad workspace and calls the relevant folder or skill when needed.\nExample operating-system structure\nAI-OS/\n├── CLAUDE.md\n├── context/\n├── memory.md\n├── skills/\n├── Business-A/\n│   ├── content/\n│   ├── finance/\n│   ├── legal/\n│   ├── newsletter/\n│   ├── website/\n│   └── marketing/\n├── Business-B/\n│   ├── content/\n│   ├── operations/\n│   ├── finance/\n│   └── marketing/\n├── Personal/\n│   ├── learning/\n│   ├── planning/\n│   └── projects/\n└── active/\nThis is an illustrative structure adapted from the source's description. Rename the folders to match your real work.\nThe main folder categories\n- OS: the top-level working environment.\n- Business or pillar folders: major companies, roles, or areas of responsibility.\n- Functional folders: marketing, content, finance, legal, newsletter, website, and similar workstreams.\n- Personal: personal projects or planning, if appropriate.\n- Active: temporary projects and experiments that do not yet belong in a permanent pillar.\n- Skills: reusable procedures.\n- Context: reference information.\n- Memory: approved lessons and preferences.\nWhen an experiment becomes a substantial ongoing project, move it from active/ into the relevant business or functional folder."
      ]
    },
    {
      "id": "chapter-28",
      "number": 28,
      "title": "Chapter 28 — Work from the broad OS folder and reference specific folders",
      "paragraphs": [
        "The source describes moving away from opening a separate narrow folder for every task. Instead, the operator opens the broad OS folder and explicitly references the relevant subfolder when needed.",
        "For example:\n- Work from the OS folder.\n- Reference the marketing/ folder.\n- Ask for ten new ads for an upcoming workshop.\n- The agent uses the broader operating context and gives extra attention to the marketing materials.\nThe exact behaviour depends on the harness and how it handles file references. A folder reference is not necessarily the same as loading every file in that folder into the model's active context. Verify what the platform actually reads."
      ]
    },
    {
      "id": "chapter-29",
      "number": 29,
      "title": "Chapter 29 — Slash commands and file references",
      "paragraphs": [
        "The source describes two common interaction patterns:\n- Slash commands (/) can expose skills, commands, and platform settings.\n- File references (@) can help point the agent to a particular file or folder.\nExamples vary by harness. In some systems, a slash command may select a skill or change a model setting. An @ reference may attach or point to a file or folder.",
        "The practical lesson:\n- Learn the command system of the harness you use.\n- Give skills clear, recognisable names.\n- Use file references to direct attention to the right material.\n- Do not assume that every harness interprets these symbols identically.\nNaming conventions\nUse names that describe the task or information:\n- ads-analyst\n- proposal-writer\n- product-shoot\n- newsletter-subject-lines\n- ideal-customer-profile.md\nAvoid vague names such as helper2, new-agent, or final-final."
      ]
    },
    {
      "id": "chapter-30",
      "number": 30,
      "title": "Chapter 30 — Global versus project-level resources",
      "paragraphs": [
        "The transcript distinguishes resources that apply everywhere from resources that apply only to one business or project.",
        "Think of the global level as a holding company and the project level as an individual subsidiary.\nGlobal resources\nExamples:\n- General writing preferences.\n- Universal safety rules.\n- Common research standards.\n- Shared formatting conventions.\n- Cross-project skills that genuinely apply everywhere.\nProject-level resources\nExamples:\n- A specific brand voice.\n- A business's ICP.\n- A product-shoot skill for one brand.\n- A finance-reporting procedure for one company.\n- A particular client's proposal format.\nDo not make every rule global. A preference that is correct for one brand may be wrong for another.\nExample\nAI-OS/\n├── global/\n│   ├── writing-standards.md\n│   ├── research-standards.md\n│   └── skills/\n├── Business-A/\n│   ├── CLAUDE.md\n│   ├── context/\n│   ├── memory.md\n│   └── skills/\n└── Business-B/\n    ├── CLAUDE.md\n    ├── context/\n    ├── memory.md\n    └── skills/\nThe structure should reflect real differences in the work, not an urge to create more folders."
      ]
    },
    {
      "id": "chapter-31",
      "number": 31,
      "title": "Chapter 31 — Workflow example: marketing campaign production",
      "paragraphs": [
        "The transcript's marketing example contrasts a fragmented manual process with an agent-assisted workflow.\nTraditional fragmented process\n1. Find the campaign brief in a workspace.\n2. Copy it into a chat model.\n3. Ask for ad copy and email copy.\n4. Copy the email into the email platform.\n5. Send copy to a designer.\n6. Move social content into a calendar.\n7. Manually create campaigns in the advertising platform.\n8. Re-enter details and check settings in several places.\nThis creates repeated copying, switching costs, and manual data entry.\nAgent-assisted process\n1. Give the agent the campaign objective.\n2. It reads the brief from the workspace.\n3. It checks the offer and discount details.\n4. It retrieves approved product information and images.\n5. It reads brand guidelines and relevant skills.\n6. It drafts email variations and ad concepts.\n7. It generates or requests creative assets where configured.\n8. It prepares campaigns in the relevant platforms.\n9. It saves the work as drafts.\n10. A human reviews and approves the final material.\nCampaign task prompt\nPrepare the campaign described in the project brief.",
        "Before starting:\n- Read the campaign brief.\n- Read the relevant brand voice, offer, and product context.\n- Use the campaign-production skill.\n- Confirm the dates, discount, products, audience, and required channels.",
        "Deliver:\n- Five email drafts.\n- A set of ad concepts and copy variations.\n- A content-calendar draft.\n- A list of creative assets required.\n- A campaign setup checklist.",
        "Do not publish, send, or activate any campaign.\nSave all work as drafts and report missing information.\nThis workflow reduces manual coordination, but the agent still needs accurate source material and careful review. It should not invent discounts, product benefits, or campaign terms."
      ]
    },
    {
      "id": "chapter-32",
      "number": 32,
      "title": "Chapter 32 — Workflow example: daily analytics report",
      "paragraphs": [
        "The source describes the possibility of receiving a report at a fixed time each morning.",
        "A useful report workflow:\n1. Retrieve data from the approved analytics sources.\n2. Confirm the date range and time zone.\n3. Check whether all sources updated successfully.\n4. Calculate agreed metrics.\n5. Compare with the previous period or target.\n6. Highlight meaningful changes.\n7. Explain where data is missing.\n8. Produce a PDF or dashboard.\n9. Email the report to the intended recipient, if authorised.\nReport definition\nBefore scheduling, specify:\n- Metrics.\n- Data sources.\n- Date range.\n- Time zone.\n- Comparison period.\n- Definitions and formulas.\n- Report format.\n- Delivery recipient.\n- Error-handling rules.\n- Whether sending requires approval.\nDo not let the agent invent metric definitions or treat missing data as zero."
      ]
    },
    {
      "id": "chapter-33",
      "number": 33,
      "title": "Chapter 33 — Workflow example: inbox management",
      "paragraphs": [
        "The source lists inbox tasks such as:\n- Cleaning or organising messages.\n- Drafting email responses.\n- Identifying potential cold-email opportunities.\n- Suggesting newsletters to unsubscribe from based on repeated non-engagement.\nStart with low-risk read-and-draft tasks:\n1. Classify incoming messages.\n2. Identify urgent or time-sensitive items.\n3. Group messages by topic.\n4. Draft responses.\n5. Flag uncertain or sensitive cases.\n6. Present drafts for review.\nOnly consider sending or unsubscribing automatically after the workflow has been tested, the rules are clear, and the user has explicitly authorised the relevant actions."
      ]
    },
    {
      "id": "chapter-34",
      "number": 34,
      "title": "Chapter 34 — Workflow example: research and outreach",
      "paragraphs": [
        "A source example describes finding relevant business podcasts, drafting outreach, and potentially scheduling recurring research.",
        "A safe implementation:\n1. Define the target podcast profile.\n2. Research public podcast information.\n3. Verify the show is active and relevant.\n4. Identify the appropriate public contact route.\n5. Draft a personalised email using approved context.\n6. Include a truthful reason for the outreach.\n7. Save the draft for review.\n8. Track outreach status and replies.\nDo not mass-send generic messages. Do not fabricate relationships, credentials, audience metrics, or personalisation."
      ]
    },
    {
      "id": "chapter-35",
      "number": 35,
      "title": "Chapter 35 — A scheduled task is not a magical workforce",
      "paragraphs": [
        "The source demystifies claims about “dozens of agents working overnight.” In many cases, the underlying system may simply be:\n- A folder.\n- A skill.\n- Connected tools.\n- A scheduled task.\nFor example: every weekday morning, run the advertising-report skill, collect the latest data, and email a draft report.",
        "That can be valuable without pretending that a large team of independent agents exists."
      ]
    },
    {
      "id": "chapter-36",
      "number": 36,
      "title": "Chapter 36 — Convert a working skill into a recurring task",
      "paragraphs": [
        "Before scheduling:\n1. Run the skill manually several times.\n2. Check the quality of the outputs.\n3. Confirm that the data sources remain accessible.\n4. Define the schedule and time zone.\n5. Set limits on actions.\n6. Decide who receives the output.\n7. Define what happens when a tool fails.\n8. Add a notification or approval step for consequential actions.\nScheduled-task specification\nTask name:\nPurpose:\nSchedule and time zone:\nSkill to run:\nFolders and context to use:\nConnected tools:\nInputs:\nExpected output:\nDelivery location:\nActions permitted:\nActions requiring approval:\nBudget or rate limits:\nFailure behaviour:\nAudit / logging requirements:\nOwner:"
      ]
    },
    {
      "id": "chapter-37",
      "number": 37,
      "title": "Chapter 37 — Reliability checklist",
      "paragraphs": [
        "A workflow is not ready for unattended operation merely because it worked once.",
        "Test:\n- Normal inputs.\n- Missing inputs.\n- Incorrect links.\n- Empty datasets.\n- Duplicate records.\n- Tool timeouts.\n- Permission failures.\n- Conflicting information.\n- Unexpected content.\n- Output formatting failures.\nDefine a safe fallback. If the agent cannot verify a critical input, it should stop and report the issue rather than improvising."
      ]
    },
    {
      "id": "chapter-38",
      "number": 38,
      "title": "Chapter 38 — Layer one: your personal AI operating system",
      "paragraphs": [
        "The first layer is the personal operating system described throughout this playbook.",
        "It is an extension of the individual operator:\n- A working folder.\n- Context files.\n- Memory.\n- Skills.\n- Connected tools.\n- Personal workflows.\nThe source describes using this environment for much of the operator's daily work, including research, content, marketing, and administrative tasks.",
        "Start here. It is easier to understand and improve a system that supports your own work before trying to redesign an entire organisation."
      ]
    },
    {
      "id": "chapter-39",
      "number": 39,
      "title": "Chapter 39 — Layer two: AI business infrastructure",
      "paragraphs": [
        "The second layer is for agents that need to run as part of the business rather than on one person's laptop.",
        "The source discusses more autonomous agent frameworks and a separate machine, such as a dedicated computer, to host agents. The important difference is operational: a business workflow may need to run continuously, serve a team, or access shared business systems without depending on one employee's personal computer.",
        "The same principles still apply:\n- Context.\n- Tools.\n- Skills.\nThe framework may be more advanced, but the underlying onboarding method does not change.\nWhen a separate environment makes sense\nConsider it when:\n- A workflow needs to run on a schedule independent of your laptop.\n- Multiple people need to use the same service.\n- The task is business-critical.\n- You need centralised access control and logging.\n- The agent needs a stable, managed environment.\nA separate machine or hosted environment also creates operational responsibilities: updates, security, backups, monitoring, access management, and incident response."
      ]
    },
    {
      "id": "chapter-40",
      "number": 40,
      "title": "Chapter 40 — Skill ownership and team sharing",
      "paragraphs": [
        "The transcript raises an unresolved organisational question: if an employee builds a useful skill, does it belong to the employee, the role, or the company?",
        "A practical distinction:\n- Personal preferences and personal workflows may belong to the individual.\n- Company procedures, customer knowledge, and proprietary operating methods may be company assets.\n- Some skills may contain both and need to be separated.\nThe source notes that simply sharing files through tools such as GitHub or Google Drive can create version drift if people maintain separate copies. It also observes that clean, centralised skill management across a team is an emerging problem.\nPractical team approach\nUntil a dedicated shared skill-management system fits your needs:\n- Store approved company skills in a controlled shared repository.\n- Use version control or a clear change history.\n- Assign an owner to each skill.\n- Document the purpose and scope.\n- Review changes before broad rollout.\n- Avoid distributing credentials inside skill files.\n- Keep employee-specific preferences separate from company-wide standards.\nAgree on ownership, access, and reuse rules before a skill becomes business-critical."
      ]
    },
    {
      "id": "chapter-41",
      "number": 41,
      "title": "Chapter 41 — Two ways to introduce AI into a company",
      "paragraphs": [
        "The transcript contrasts a top-down and bottom-up approach.\nTop-down\nBring in AI specialists to inspect departments, interview employees, and build automations for them.",
        "Advantages:\n- Central coordination.\n- Potentially consistent architecture.\n- Easier to set company-wide security and governance standards.\nLimitations:\n- Outside specialists may not understand the nuance of every employee's work.\n- They need time to learn each task.\n- One central team may become a bottleneck.\n- The resulting systems may not reflect how work is actually performed.\nBottom-up\nTrain employees to become AI-literate and have them improve or automate parts of their own work.",
        "Advantages:\n- Employees already understand the details of their jobs.\n- They can identify repetitive tasks and bottlenecks.\n- They can test improvements in the real workflow.\n- Useful skills emerge from actual work rather than guesses.\nLimitations:\n- Practices may become fragmented.\n- Skills can be duplicated or inconsistent.\n- Employees need time, support, and safe tools.\n- Company-wide governance is still necessary.\nThe practical answer: combine both\nThe discussion ultimately supports a combination:\n- Central leadership sets standards, priorities, security, and infrastructure.\n- Employees map and improve their own workflows.\n- Specialists support difficult integrations and high-risk automations.\n- Successful skills are reviewed and shared across the company.\nThis preserves employee expertise while avoiding a disconnected collection of personal systems."
      ]
    },
    {
      "id": "chapter-42",
      "number": 42,
      "title": "Chapter 42 — Start with an AI literacy assessment",
      "paragraphs": [
        "Before launching a large programme, find out how employees currently work.",
        "Ask each team member:\n- Which AI tools do you use?\n- What do you use them for?\n- Which tasks take the most repetitive time?\n- Which systems do you use daily?\n- What information do you repeatedly copy between tools?\n- What parts of your role require the most judgement?\n- What would you like to automate?\n- What must never be automated without approval?\nThe source mentions using a structured employee questionnaire to establish a baseline. A common set of questions can be used across the company, with role-specific follow-ups."
      ]
    },
    {
      "id": "chapter-43",
      "number": 43,
      "title": "Chapter 43 — Build an employee-led AI improvement culture",
      "paragraphs": [
        "The transcript suggests:\n- AI build weeks.\n- Internal competitions.\n- A “skill of the month” award.\n- Cash prizes for useful improvements.\n- Weekly meetings where employees share what they have built.\n- Recognition for practical contributions.\nThe point is to make AI adoption part of the operating culture rather than a one-off software rollout.",
        "Be careful about incentives. Reward useful, safe, maintainable improvements—not the number of automations or the number of agents someone claims to have created."
      ]
    },
    {
      "id": "chapter-44",
      "number": 44,
      "title": "Chapter 44 — Address employee concerns honestly",
      "paragraphs": [
        "The transcript recognises that employees may fear that automating their work will make their roles redundant.",
        "A responsible adoption programme should explain:\n- Why the company is introducing AI.\n- How roles may change.\n- What employees are expected to learn.\n- How productivity gains will be used.\n- What human responsibilities remain.\n- How employees can raise concerns.\n- What data and monitoring practices apply.\nThe source's proposed goal is to make capable employees more effective and allow the business to grow without automatically increasing headcount. That is a strategic viewpoint, not a guarantee that every role will remain unchanged."
      ]
    },
    {
      "id": "chapter-45",
      "number": 45,
      "title": "Chapter 45 — A company-wide rollout sequence",
      "paragraphs": [
        "1. Assess: map current AI usage, tools, processes, and bottlenecks.\n2. Choose pilots: select repetitive, measurable, low-risk workflows.\n3. Train: teach employees the fundamentals of context, tools, and skills.\n4. Build: let employees document and improve their own workflows.\n5. Review: evaluate quality, time saved, error rates, and risks.\n6. Standardise: promote successful skills into shared company resources.\n7. Integrate: connect systems and centralise governance where needed.\n8. Expand: move to more complex workflows only after the basics are reliable."
      ]
    },
    {
      "id": "chapter-46",
      "number": 46,
      "title": "Chapter 46 — Your first 90 minutes",
      "paragraphs": [
        "The transcript suggests that a basic personal setup can be assembled in a focused sitting. The exact time depends on how much context you already have and which tools you use.\nMinutes 0–15: create the workspace\n- Create an AI-OS folder.\n- Open it in your chosen agent harness.\n- Create a top-level instruction file.\nMinutes 15–35: create initial context\n- Draft an about-me file.\n- Draft a business overview.\n- Add a brand voice or working-preferences file if relevant.\n- Review all information for accuracy.\nMinutes 35–50: create the folder map\n- Add context/, skills/, and active/.\n- Add business or project folders.\n- Tell the top-level instruction file how to find the context.\nMinutes 50–65: add controlled memory\n- Create a memory file.\n- Add only a few durable, approved preferences.\n- Tell the agent how to propose updates.\nMinutes 65–80: connect one tool\n- Choose a low-risk service needed for a real task.\n- Start with the minimum required permissions.\n- Test a read-only action.\nMinutes 80–90: run a real task\n- Ask for a small deliverable.\n- Check whether the agent used the right context.\n- Correct the result.\n- Record what needs to improve.\nDo not connect every account or build dozens of skills in the first sitting. Get one useful workflow working."
      ]
    },
    {
      "id": "chapter-47",
      "number": 47,
      "title": "Chapter 47 — Your first seven days",
      "paragraphs": [
        "Day\tFocus\tDeliverable\n1\tWorkspace and top-level instructions\tWorking OS folder\n2\tContext interview and review\tAccurate core context files\n3\tMemory and preferences\tControlled memory file\n4\tFirst connector\tOne tested tool integration\n5\tComplete a real task\tReviewed deliverable\n6\tTurn the process into a skill\tFirst reusable SOP\n7\tRetest and improve\tVersion 2 of the workflow"
      ]
    },
    {
      "id": "chapter-48",
      "number": 48,
      "title": "Chapter 48 — Your first 30 days",
      "paragraphs": [
        "Week 1: establish the foundation\nBuild the folder structure, top-level instructions, context, and one working connector.\nWeek 2: build your first three skills\nChoose recurring work that has a clear input and output. For example:\n- Research report.\n- Proposal.\n- Newsletter or social content workflow.\nWeek 3: improve reliability\nTest missing data, incorrect inputs, tool failures, and output quality. Add approval gates and better instructions.\nWeek 4: schedule one stable workflow\nOnly schedule a process that has already worked reliably when run manually. Start with a report or draft, not an irreversible external action."
      ]
    },
    {
      "id": "chapter-49",
      "number": 49,
      "title": "Chapter 49 — A 90-day maturity roadmap",
      "paragraphs": [
        "Period\tObjective\tEvidence of progress\nDays 1–30\tBuild personal AI OS\tAccurate context, one connector, three tested skills\nDays 31–60\tImprove repeatability\tSkills reused successfully across multiple tasks\nDays 61–90\tIntroduce controlled autonomy\tOne scheduled workflow, logging, approvals, failure handling",
        "The goal is not to accumulate tools. The goal is to build a dependable system that repeatedly produces useful work."
      ]
    },
    {
      "id": "chapter-50",
      "number": 50,
      "title": "Chapter 50 — The universal agent task brief",
      "paragraphs": [
        "Use this structure for important tasks:\n# Task",
        "## Objective\nWhat outcome do I want?",
        "## Background\nWhat context should the agent understand?",
        "## Inputs\nWhich files, links, accounts, or datasets should it use?",
        "## Scope\nWhat is included and excluded?",
        "## Process\nWhich skill or procedure should it follow?",
        "## Output\nWhat exact deliverable should it produce?",
        "## Quality criteria\nWhat makes the result acceptable?",
        "## Constraints\nWhat must it avoid? What assumptions are prohibited?",
        "## Permissions\nWhich actions may it take?\nWhich actions require approval?",
        "## Completion criteria\nHow will we know the task is done?",
        "## If blocked\nWhat should the agent do when information or access is missing?"
      ]
    },
    {
      "id": "chapter-51",
      "number": 51,
      "title": "Chapter 51 — The agent onboarding checklist",
      "paragraphs": [
        "- [ ] Working folder or project exists.\n- [ ] Top-level instruction file is present.\n- [ ] Context files are accurate and reviewed.\n- [ ] Folder structure is documented.\n- [ ] Memory rules are explicit.\n- [ ] Relevant skills are available.\n- [ ] Required tools are connected.\n- [ ] Permissions are limited to what is needed.\n- [ ] External actions have approval gates.\n- [ ] The agent has completed a low-risk test.\n- [ ] The output has been reviewed.\n- [ ] Failure handling is understood."
      ]
    },
    {
      "id": "chapter-52",
      "number": 52,
      "title": "Chapter 52 — The skill quality checklist",
      "paragraphs": [
        "- [ ] The purpose is specific.\n- [ ] The trigger is clear.\n- [ ] Required inputs are listed.\n- [ ] Prerequisites and tools are documented.\n- [ ] Steps are ordered and actionable.\n- [ ] Decision rules are explicit.\n- [ ] Examples are accurate and approved.\n- [ ] Output format is specified.\n- [ ] Quality checks are included.\n- [ ] Failure cases are covered.\n- [ ] Boundaries and approval requirements are explicit.\n- [ ] The skill has been tested on a second example."
      ]
    },
    {
      "id": "chapter-53",
      "number": 53,
      "title": "Chapter 53 — The context quality checklist",
      "paragraphs": [
        "- [ ] Facts are accurate.\n- [ ] Opinions are labelled as opinions.\n- [ ] Assumptions are not presented as facts.\n- [ ] Customer problems match the product's actual capabilities.\n- [ ] Prices and offers are current.\n- [ ] Brand examples are approved.\n- [ ] Sensitive information is excluded unless necessary.\n- [ ] Duplicates and contradictions are removed.\n- [ ] Each file has a clear purpose.\n- [ ] The top-level file points to the right documents."
      ]
    },
    {
      "id": "chapter-54",
      "number": 54,
      "title": "Chapter 54 — The tool and connector checklist",
      "paragraphs": [
        "- [ ] The connector is needed for a real workflow.\n- [ ] Its source and maintainer are trusted.\n- [ ] The required actions are supported.\n- [ ] Permissions are limited.\n- [ ] Credentials are stored securely.\n- [ ] Read and write access are distinguished.\n- [ ] Draft mode is used where possible.\n- [ ] Consequential actions require approval.\n- [ ] Failures are visible.\n- [ ] Access can be revoked."
      ]
    },
    {
      "id": "chapter-55",
      "number": 55,
      "title": "Chapter 55 — The weekly agent review",
      "paragraphs": [
        "At the end of each week, review:\nArea\tQuestions\nOutput quality\tDid the agent produce work that met the standard?\nAccuracy\tWere there invented or unsupported details?\nTime\tWhich manual steps were actually reduced?\nReliability\tWhere did the workflow fail or require intervention?\nContext\tWas information missing, stale, or contradictory?\nSkills\tWhich corrections should become a reusable procedure?\nTools\tWere permissions appropriate?\nRisk\tDid the agent attempt an action it should not take?\nNext improvement\tWhat one change would make the workflow better?",
        "Measure actual results. Do not assume that a task is faster simply because the agent performed many actions."
      ]
    },
    {
      "id": "chapter-56",
      "number": 56,
      "title": "Chapter 56 — The principles worth remembering",
      "paragraphs": [
        "Principle 1: Goal to result\nGive agents outcomes, not just questions.\nPrinciple 2: Onboard the agent\nTreat it like a capable new employee who needs context, tools, and training.\nPrinciple 3: Own your context\nKeep important knowledge in files you can inspect, edit, and move between systems.\nPrinciple 4: Context should be accurate\nA false detail in a foundational file can contaminate many downstream outputs.\nPrinciple 5: Turn corrections into skills\nIf you have solved the same task well, preserve the process so you do not have to teach it again.\nPrinciple 6: Tools enable action\nConnect the services required for the task, but do not grant unnecessary access.\nPrinciple 7: Define done\nA clear deliverable and completion test make agent behaviour more predictable.\nPrinciple 8: Keep the system modular\nSeparate context, memory, skills, and project information so each can be maintained.\nPrinciple 9: Start personal, then scale\nBuild a useful personal operating system before attempting complex company-wide infrastructure.\nPrinciple 10: Automate from real work\nThe people doing the work often understand its nuance best. Involve them in building and improving the skills."
      ]
    },
    {
      "id": "chapter-57",
      "number": 57,
      "title": "Chapter 57 — Common beginner mistakes",
      "paragraphs": [
        "Mistake 1: Treating the agent like a chat window\nA vague request produces an unpredictable result. Give it an outcome, scope, inputs, and completion criteria.\nMistake 2: Expecting it to know your business\nThe model may be capable, but it does not automatically know your offer, customer, processes, or preferences. Build context.\nMistake 3: Creating context with unreviewed AI output\nAI-generated context can contain invented or inaccurate facts. Interview yourself, review every line, and correct the files.\nMistake 4: Relying on one endless session\nLong sessions can become crowded and inconsistent. Store durable information in files and start fresh sessions when appropriate.\nMistake 5: Using memory for everything\nA recurring procedure belongs in a skill. A durable preference belongs in memory. A business fact belongs in context.\nMistake 6: Connecting every tool immediately\nMore integrations create more permissions and failure points. Connect only what a real workflow needs.\nMistake 7: Giving broad write access too early\nStart with read-only access and drafts. Add write permissions only after testing and defining approvals.\nMistake 8: Creating too many “agents”\nDo not confuse folders and skills with independent autonomous employees. A clear operating system may be simpler and easier to maintain.\nMistake 9: Building skills before doing the work\nIf you have not performed or understood a process, the skill may encode guesses. Complete a real task first when possible.\nMistake 10: Assuming public data proves performance\nAn ad, post, or landing page being visible does not reveal its actual business results. Label evidence gaps.\nMistake 11: Automating a broken process\nAn agent can make a bad process run faster. Improve the procedure before scheduling it.\nMistake 12: Ignoring team ownership\nPersonal skills, company procedures, and shared resources may have different owners. Establish governance as adoption grows."
      ]
    },
    {
      "id": "chapter-58",
      "number": 58,
      "title": "Chapter 58 — What the source does—and does not—establish",
      "paragraphs": [
        "The transcript provides practical demonstrations and a practitioner's operating philosophy. It does not establish:\n- That every agent user becomes five, seven, or ten times more productive.\n- That a one-to-three-person team can reliably build a billion-dollar company.\n- That any named harness or model is always the best choice.\n- That every connector supports the actions shown in the demonstrations today.\n- That a public ad's longevity proves it is profitable.\n- That generated product imagery is automatically accurate.\n- That every company should automate every task.\n- That an autonomous workflow can safely operate without monitoring.\nThe source's productivity multipliers and predictions should be treated as opinions or illustrative claims. The strongest transferable material is the operating method: context, tools, skills, clear goals, repeatable workflows, and human review."
      ]
    },
    {
      "id": "chapter-59",
      "number": 59,
      "title": "Appendix A — Ready-to-adapt prompts",
      "paragraphs": [
        "A1. Build my AI operating system\nHelp me build a practical personal AI operating system in this project folder.",
        "Start by inspecting the existing files. Do not overwrite anything without asking.",
        "Propose a simple structure containing:\n- A top-level instruction file.\n- A context directory.\n- A memory file.\n- A skills directory.\n- Project or business folders.\n- An active-projects directory.",
        "Interview me to gather accurate information.\nCreate only the files we have enough information to complete.\nDo not invent personal, business, customer, or financial facts.\nShow me every file for review before treating it as approved context.\nA2. Audit my context\nAudit the context files in this project.",
        "Find:\n- Unsupported claims.\n- Contradictions.\n- Outdated information.\n- Duplicated content.\n- Vague instructions.\n- Missing facts that matter to recurring tasks.",
        "Do not silently rewrite facts.\nReturn a table with the file, issue, why it matters, and proposed correction.\nWait for approval before changing the files.\nA3. Turn this successful task into a skill\nConvert the task we just completed into a reusable skill.",
        "Document the trigger, inputs, prerequisites, tools, exact steps, decision rules,\nquality criteria, output format, failure handling, and approval requirements.",
        "Include my corrections and an approved example.\nDo not add steps that were not performed unless you label them as proposed improvements.\nSave it in the skills directory and show me the full file for review.\nA4. Run a skill safely\nUse the relevant skill for this task.",
        "First read the skill and all context files it references.\nConfirm that the required inputs and tools are available.\nFollow the procedure and report any missing information.",
        "Prepare the deliverable as a draft.\nDo not send, publish, purchase, delete, or make external changes.\nAt the end, provide:\n- The deliverable location.\n- A short summary of what was completed.\n- Any assumptions.\n- Any missing information.\n- Any checks that failed.\n- The actions that require my approval.\nA5. Review a workflow for automation\nReview this recurring workflow and determine whether it is suitable for an AI agent.",
        "Map:\n- Trigger.\n- Inputs.\n- Current manual steps.\n- Systems involved.\n- Decisions requiring judgement.\n- Expected output.\n- Failure cases.\n- Sensitive data.\n- Consequential actions.",
        "Identify which steps can be assisted, which can be automated safely,\nand which should remain human-controlled.",
        "Propose a minimum viable workflow with limited permissions and explicit approval gates.\nDo not build or activate it yet."
      ]
    },
    {
      "id": "chapter-60",
      "number": 60,
      "title": "Appendix B — Your first agent project",
      "paragraphs": [
        "Choose one real task that you already perform repeatedly. Do not begin with the most complex or highest-risk process.",
        "A good first project has:\n- A clear trigger.\n- Reliable input data.\n- A predictable sequence.\n- A defined output.\n- Low consequences if the first version is imperfect.\n- A human who can judge quality.\nExamples:\n- Turn a project brief into a structured draft.\n- Analyse a set of public competitor pages.\n- Create a weekly internal report.\n- Organise a folder of documents.\n- Draft newsletter subject lines using historical examples.\n- Prepare a meeting brief from approved documents.\nProject worksheet\n# First Agent Project",
        "Task:\nWhy it matters:\nHow often it occurs:\nCurrent time required:\nCurrent manual steps:\nInput sources:\nOutput required:\nContext files needed:\nTools needed:\nSkill needed:\nActions the agent may take:\nActions requiring approval:\nHow quality will be measured:\nHow failures will be handled:\nTest date:\nReview date:\nRun the workflow manually with the agent first. Capture the corrections. Convert the successful process into a skill. Test it again. Only then consider scheduling it."
      ]
    },
    {
      "id": "chapter-61",
      "number": 61,
      "title": "Final Operating Model",
      "paragraphs": [
        "The complete system can be remembered as:",
        "Goal → Observe → Think → Act → Review → Improve",
        "And the four configuration levers are:\n- Context: what the agent knows.\n- Skills: how the agent should work.\n- Model: how it reasons.\n- Tools: what it can do.\nStart with one folder, one accurate context file, one useful tool, and one real task. Build from there. The valuable skill is not collecting AI products or inventing elaborate agent names. It is learning to turn useful work into a well-contextualised, tool-enabled, repeatable process that can be checked and improved."
      ]
    }
  ]
};
