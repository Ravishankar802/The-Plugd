import { PlaybookArticle } from "./types";

export const CHATGPT_KNOWLEDGE_ARTICLE: PlaybookArticle = {
  "slug": "give-me-28-minutes-ill-give-you-10000-hours-of-chatgpt-knowledge",
  "title": "Give Me 28 Minutes, I'll Give You 10,000 Hours of ChatGPT Knowledge",
  "readingTime": "30 min read",
  "categoryName": "AI",
  "categorySlug": "ai-businesses",
  "thumbnail": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793013301/Give_Me_28_Minutes_I_ll_Give_You_10_000_Hours_of_ChatGPT_Knowledge.png",
  "publishedDate": "2026",
  "authorName": "Sean Mitchell",
  "authorTitle": "AI Systems Architect & Prompt Engineering Lead",
  "introParagraphs": [
    "How to Use This Playbook\nThis playbook organises the core ideas into a practical guide. It moves from personalisation and better conversations to specialised modes, connected tools, scheduled work, research, and agent-style execution.",
    "The central principle is that ChatGPT becomes more useful when you stop treating it as a box for one-off questions and start treating it as a flexible work system:\n- Give it relevant context.\n- Explain the result you want.\n- Choose the right interaction mode for the task.\n- Connect useful information and tools when appropriate.\n- Break complex work into clear stages.\n- Review important outputs and approve consequential actions.",
    "The source material describes particular product features and interface paths. ChatGPT changes over time, and availability can differ by plan, region, device, and settings. Therefore, use the feature names and workflows as a conceptual guide, and check the current interface for the exact controls available to your account. Do not assume every feature described is available to every user."
  ],
  "chapters": [
    {
      "id": "chapter-1",
      "number": 1,
      "title": "Part I — Build a Better Foundation: Stop Using ChatGPT Like a Search Box",
      "paragraphs": [
        "1. Stop Using ChatGPT Like a Search Box\nMany people use ChatGPT for isolated, low-context questions: rewrite a sentence, suggest a meal, explain a term, or summarise a paragraph. Those are useful tasks, but they represent only one way to work with it.",
        "A more valuable approach is to treat ChatGPT as a general-purpose assistant that can support several kinds of work:\n- Drafting and editing.\n- Research and synthesis.\n- Learning and practice.\n- Planning and decision support.\n- Data and document analysis.\n- Creative exploration.\n- Repetitive administrative work.\n- Multi-step tasks that involve connected tools.",
        "The difference is not simply the number of features you know. It is the quality of the workflow you build around them.",
        "**The assistant analogy**\nImagine working with a capable assistant who can help with many tasks. The assistant becomes more effective when they understand:\n- Who you are and what you do.\n- What you are trying to achieve.\n- Which projects matter.\n- How you prefer information to be presented.\n- What standards they should follow.\n- Which actions they are authorised to take.\n\nWithout that context, every task begins with unnecessary explanation. With the right context, you can spend more time on the work itself.",
        "**The operating principle**\nDo not ask only, “What can ChatGPT answer?”\n\nAsk:\n1. What outcome am I trying to achieve?\n2. What context does it need?\n3. Which capability is suited to this task?\n4. What should it produce?\n5. How will I check whether the result is correct?\n6. What should happen next?\n\nThis turns casual prompting into deliberate use."
      ]
    },
    {
      "id": "chapter-2",
      "number": 2,
      "title": "Personalise the Assistant",
      "paragraphs": [
        "A useful assistant should not need to rediscover your basic preferences in every conversation. ChatGPT offers personalisation features that can help provide continuity and make responses more relevant.",
        "The source material distinguishes two concepts: explicit instructions and information learned over time. The exact names and controls have evolved, so focus on the distinction rather than relying on an old menu path.",
        "2.1 Explicit instructions: the standing brief\nThink of persistent instructions as a short working brief. They can communicate things such as:\n- Your role, field, or recurring responsibilities.\n- Your main goals or ongoing projects.\n- Your level of knowledge in a subject.\n- Your preferred response length and tone.\n- Whether you prefer examples, tables, or step-by-step explanations.\n- Constraints the assistant should respect.\n- Common mistakes or styles you want it to avoid.",
        "Good instructions are specific and useful across many conversations. Avoid filling them with temporary details that will become irrelevant next week.",
        "2.2 A practical personalisation template\nUse this as a draft to adapt to the personalisation controls available in your account:\n\n```\nAbout me\nI am [role/background]. I regularly work on [main responsibilities or projects]. My current priorities are [goals]. My knowledge level in [subjects] is [beginner/intermediate/advanced].\n\nHow I want assistance\n- Be clear, direct, and practical.\n- Explain unfamiliar concepts without assuming prior knowledge.\n- Use examples relevant to [industry, location, or context].\n- For complex tasks, organise the work into steps.\n- Distinguish facts, assumptions, and recommendations.\n- Point out important risks and missing information.\n- Do not invent sources, figures, or results.\n\nWhat to avoid\n- Avoid generic motivational filler.\n- Do not agree with me just to be agreeable.\n- Do not overcomplicate simple questions.\n- Ask for clarification when a missing detail materially changes the answer.\n```",
        "2.3 Keep the brief useful\nA personalisation brief should not become a biography. Include information that changes the quality of assistance. For example, “I run a small accounting practice and mostly work with local retailers” is more useful than a long list of unrelated personal facts. Do not include passwords, authentication codes, financial credentials, private client data, or secrets."
      ]
    },
    {
      "id": "chapter-3",
      "number": 3,
      "title": "Use Memory and Conversation Context Carefully",
      "paragraphs": [
        "Persistent instructions and memory are related but not identical:\n- **Explicit instructions** communicate what you want the assistant to know or how you want it to respond.\n- **Memory and conversation context** can provide continuity from information shared across interactions, depending on current product settings and capabilities.",
        "The source describes memory as a system that can learn useful details over time, including preferences and corrections. The practical idea is valuable: repeated context can reduce the need to start from zero.",
        "However, memory is not a perfect transcript of every conversation. It may be selective, incomplete, or mistaken. Do not assume it has retained every detail or every decision.",
        "3.1 Use corrections to improve future work\nWhen an answer misses the mark, explain what was wrong and what you wanted instead.\n\nWeak correction:\n*No, that's not right.*\n\nUseful correction:\n*Keep the same structure, but make the explanation more concise. The intended audience is a first-time business owner. Avoid jargon and include one practical example.*",
        "3.2 Review important remembered context\nIf the assistant refers to an incorrect preference or outdated project detail, correct it. Use the current Memory and Personalization controls to review or adjust the summary where available. For sensitive information, be especially cautious about what you share and what you allow to persist.",
        "3.3 Organise long-running work\nFor substantial projects, use a dedicated project or a clearly organised conversation where available. Keep together the project objective, requirements, reference documents, decisions made, current status, and next actions."
      ]
    },
    {
      "id": "chapter-4",
      "number": 4,
      "title": "Part II — Improve the Quality of Every Conversation: Make ChatGPT Challenge Your Thinking",
      "paragraphs": [
        "4. Make ChatGPT Challenge Your Thinking\nOne of the most useful habits is to stop using AI only for validation.",
        "If you ask a leading question, you may receive an answer that follows your framing rather than exposing its weaknesses. A confident response is not proof that your assumption is correct.",
        "Use ChatGPT as a critical thinking partner. Ask it to identify blind spots, counterarguments, risks, and alternative explanations.",
        "4.1 The devil's advocate method\nBefore making an important decision, ask the assistant to:\n- Challenge your assumptions.\n- Identify what you may be overlooking.\n- Present the strongest argument against your position.\n- Explain what evidence would change the conclusion.\n- Distinguish a weak objection from a serious one.\n- Suggest alternative interpretations.",
        "4.2 Copy-and-use prompt: challenge my idea\n```\nI want you to act as a rigorous but constructive devil's advocate.\n\nMy current position or idea: [explain it]\n\nDo not agree with me just to be supportive. Analyse it critically.\n1. Identify the assumptions I am making.\n2. Explain which assumptions are least supported.\n3. Give the strongest argument against my position.\n4. Identify risks, blind spots, and second-order effects.\n5. Present at least two plausible alternative explanations or approaches.\n6. Tell me what evidence would help decide between them.\n\nSeparate factual claims from interpretation. Be direct, but do not manufacture objections just to disagree.\n```",
        "4.3 Ask for a pre-mortem\n```\nAssume this plan has failed six months from now. Identify the five most plausible reasons. For each one, explain the early warning signs, what I could do now to reduce the risk, and what evidence I should monitor.\n```\n\nThis is particularly useful for business plans, launches, hiring decisions, purchases, and complex projects.",
        "4.4 Keep judgement with the human\nDevil's advocate is not an instruction to reject everything. The assistant can be wrong in either direction. Its role is to widen the analysis, not make the decision for you."
      ]
    },
    {
      "id": "chapter-5",
      "number": 5,
      "title": "Treat Hallucinations as a Quality-Control Problem",
      "paragraphs": [
        "ChatGPT can produce incorrect information in fluent, confident language. It may misstate a fact, invent a reference, misunderstand a document, or give an answer that sounds plausible but is unsupported.",
        "The important question is not whether the assistant sounds confident. It is whether the answer can be checked.",
        "5.1 A better verification instruction\n```\nAccuracy is more important than sounding confident.\n- If you do not know, say so.\n- Do not invent facts, quotations, statistics, sources, or citations.\n- Distinguish verified information from assumptions and estimates.\n- State when information may be out of date.\n- Identify which claims need external verification.\n- For calculations, show the inputs and method.\n- If my question contains a false assumption, correct it before answering.\n```",
        "5.2 Use a risk-based verification system\n\n| Task | Appropriate review |\n| --- | --- |\n| Brainstorming names or ideas | Check usefulness and suitability |\n| Rewriting a paragraph | Check meaning, tone, and omissions |\n| Summarising a document | Compare important claims with the source |\n| Researching a market | Check sources, dates, methods, and definitions |\n| Calculating money or metrics | Recalculate independently |\n| Legal, medical, or financial information | Verify with authoritative sources and qualified professionals |\n| Sending messages or changing records | Review the exact content and action before approval |",
        "5.3 Do not use arbitrary signals as proof\nThe source describes using a personalised greeting as a personal warning signal when an answer seems unusually generic. That may remind you to pay attention, but it is not a reliable hallucination detector. Verify the substance, not a stylistic cue."
      ]
    },
    {
      "id": "chapter-6",
      "number": 6,
      "title": "Part III — Choose the Right Working Mode: Editing Workspace, Study Mode & Images",
      "paragraphs": [
        "6. Use an Editing Workspace for Iterative Writing\nA common frustration is receiving a nearly correct document and then asking for a complete rewrite just to change one paragraph. The rewrite may unintentionally alter sections that were already good.",
        "For substantial writing and coding tasks, an editing workspace can make iteration more controlled. The source calls this Canvas mode.",
        "6.1 When to use a dedicated editing workspace\nIt is useful when you are drafting a long document, revising a report or proposal, editing code, working on a structured article, or refining a particular section while preserving the rest.",
        "6.2 Edit locally instead of rewriting everything\nUse precise instructions:\n```\nRevise only the section titled “Implementation Plan.”\nKeep the rest of the document unchanged.\nMake the section more practical by adding a sequence of actions and a clear owner for each action. Preserve the current tone and heading structure.\n```\n\nOr:\n```\nEdit the selected paragraph only. Make it more concise and confident, but preserve every factual claim. Do not change the surrounding sections.\n```",
        "6.3 A disciplined editing loop\n1. Generate the initial draft.\n2. Read the whole draft once.\n3. Identify the sections that need improvement.\n4. Request targeted edits.\n5. Review the changed section in context.\n6. Check that important meaning and facts remain intact.\n7. Save or export the approved version.",
        "7. Use Study Mode to Learn, Not Just Read\nReading an explanation can create the feeling that you understand something. That feeling is not the same as being able to recall, explain, or apply the concept. A stronger learning workflow includes explanation, questioning, practice, feedback, and retrieval.",
        "7.1 Copy-and-use prompt: personal tutor\n```\nAct as a patient but rigorous tutor for [topic].\n\nMy current level is [beginner/intermediate/advanced]. My goal is to be able to [specific learning outcome].\n\nTeach me interactively:\n1. Start by asking what I already know.\n2. Explain one concept at a time.\n3. Use a simple example, then a more realistic one.\n4. Ask me a question before moving to the next concept.\n5. Do not reveal the answer immediately when I make a mistake.\n6. Explain why the mistake happened and give me another attempt.\n7. Finish with a short assessment and a list of topics I should review.\n\nPrioritise genuine understanding over speed.\n```",
        "7.2 Use active recall\nAfter learning a concept, close the notes and try to explain it from memory:\n- *Quiz me on the material. Ask one question at a time and wait for my answer.*\n- *Give me a practical problem that requires me to apply the concept rather than repeat its definition.*\n- *Identify the difference between what I can explain confidently and what I only recognise when I see it.*",
        "8. Use Image Generation for Visual Work\nChatGPT can generate and edit images from natural-language instructions. Explain the subject, intended purpose, composition, camera angle, environment, lighting, visual style, details to preserve, and elements to avoid.",
        "For edits, state what must remain unchanged as well as what should change (e.g. *Keep the composition, but make the background lighter*)."
      ]
    },
    {
      "id": "chapter-7",
      "number": 7,
      "title": "Part IV — Make ChatGPT Available Across Your Workday: Voice, Connected Apps & Scheduling",
      "paragraphs": [
        "9. Use Voice as a Thinking and Communication Interface\nTyping is not always the best way to express a complex problem. Voice interaction can make it easier to think aloud, explain context, ask follow-up questions, or work through an idea while away from a keyboard.",
        "**A voice briefing structure**:\n1. Context: What situation are you dealing with?\n2. Goal: What do you want to achieve?\n3. Constraints: What limits or requirements matter?\n4. Current thinking: What have you already considered?\n5. Request: What kind of help do you need?",
        "At the end of a voice conversation, ask:\n*Summarise the decisions we reached, the assumptions that remain unverified, and the next five actions. Separate what I committed to doing from what you merely suggested.*",
        "10. Connect Apps to Reduce Context Switching\nChatGPT can work with supported connected apps and services (e.g., email, calendar, cloud documents). Bring relevant information and actions into a single workflow rather than repeatedly switching between disconnected tools.",
        "**Email triage workflow**:\n1. Review new messages within permitted scope.\n2. Summarise important topics.\n3. Identify messages that require a response.\n4. Separate urgent items from those that can wait.\n5. Draft suggested replies.\n6. Review the drafts before sending.",
        "**Copy-and-use prompt: daily briefing**\n```\nCreate a concise daily briefing from the information you are authorised to access.\n\nOrganise it into:\n1. Important messages that need my attention.\n2. Messages that require a reply today.\n3. Calendar commitments.\n4. Potential scheduling conflicts.\n5. Three priorities for the day.\n\nDo not send messages, change events, or make commitments. Identify uncertainty and show the source of important details where available.\n```",
        "Keep connected-app work reviewable: Read → Summarise → Propose → Review → Approve → Execute.",
        "11. Schedule Repetitive Tasks\nScheduling can reduce the mental burden of remembering routine work:\n\n| Task | Possible cadence | Useful output |\n| --- | --- | --- |\n| Project review | Every Monday | Status, blockers, next actions |\n| Weekly planning | Every Sunday evening | Priorities and calendar preparation |\n| Content planning | Every week | Draft ideas based on defined themes |\n| Expense review | Monthly | Categorised items and questions |\n| Learning review | Twice a week | Recall quiz and weak areas |\n| Team reminder | Before a recurring deadline | Reminder with required deliverable |"
      ]
    },
    {
      "id": "chapter-8",
      "number": 8,
      "title": "Part V — Research and Agent-Style Execution: Deep Research & Agent Tasks",
      "paragraphs": [
        "12. Use Deep Research for Questions That Deserve Investigation\nA quick question and a research project are different tasks. If you need to compare a market, examine several sources, or identify gaps in existing information, a deeper research workflow is appropriate.",
        "Write a research brief, not a vague question. The six-part research brief includes:\n1. Research question: What exactly must be understood?\n2. Scope: Which market, location, audience, or time period?\n3. Subquestions: What dimensions must be investigated?\n4. Source standards: Which sources are acceptable?\n5. Output format: What should the report contain?\n6. Uncertainty rules: How should missing or conflicting evidence be handled?",
        "**Copy-and-use prompt: structured research**\n```\nConduct a structured investigation into [research question].\nScope: [geography, audience, industry, time period]\nInvestigate:\n1. [Subquestion one]\n2. [Subquestion two]\n3. [Subquestion three]\n4. [Subquestion four]\nSource requirements:\n- Prioritise primary sources and reputable publications.\n- Prefer recent evidence when the topic changes quickly.\n- Cite factual claims.\n- Do not invent statistics or quotations.\n- Distinguish direct evidence from interpretation.\n- Identify conflicting sources and explain the disagreement.\nDeliverable:\n- Executive summary.\n- Key findings.\n- Evidence table.\n- Implications.\n- Limitations and unknowns.\n- Recommended next steps.\nIf the evidence does not support a conclusion, say so rather than filling the gap with speculation.\n```",
        "13. Use Agent-Style Work for Multi-Step Tasks\nAn agent-style workflow can perform parts of the task through supported tools and interfaces. The more consequential the action, the more important it is to define boundaries and require review.",
        "**Copy-and-use prompt: controlled agent task**\n```\nComplete the following task using only the tools and sources available to you.\n\nObjective: [specific outcome]\nContext: [relevant details]\nCriteria: [requirements and preferences]\nAllowed actions: [research, compare, draft, organise, etc.]\nApproval required before: sending messages, submitting forms, making purchases, booking, deleting, publishing, or changing important records.\n\nDo not: invent information, bypass access controls, expose private information, or make commitments that I have not approved.\n\nBefore any consequential action, show me:\n1. What you intend to do.\n2. The exact information or content involved.\n3. Any cost, commitment, or irreversible effect.\nIf you encounter uncertainty, stop and ask rather than guessing.\n\nAt the end, provide a concise report of completed actions, unresolved items, and anything requiring my attention.\n```",
        "Start with low-risk tasks and keep user approval on all payments and commitments."
      ]
    },
    {
      "id": "chapter-9",
      "number": 9,
      "title": "Part VI — Put the Capabilities Together: Personal AI Operating System & Workflows",
      "paragraphs": [
        "14. Build a Personal AI Operating System\nA practical system has six layers:\n\n| Layer | Purpose | Example |\n| --- | --- | --- |\n| Context | Explain who you are and what matters | Personalisation, project context |\n| Conversation | Think, ask, draft, and refine | Chat and voice |\n| Learning | Build durable understanding | Study and active recall |\n| Knowledge | Gather and analyse information | Research and connected sources |\n| Execution | Complete supported multi-step work | Agent-style workflows |\n| Continuity | Reduce repeated effort | Memory, projects, scheduled tasks |",
        "15. A Daily Workflow\n- **Start of day**: orient yourself with authorized calendar and email context. Ask for commitments, messages requiring reply, conflicts, and three priorities.\n- **During work**: use ordinary chat for quick questions, editing workspace for documents, voice for thinking aloud, connected apps for context, agent workflows for bounded multi-step work.\n- **When learning**: practise active recall and retrieval.\n- **When deciding**: challenge assumptions with devil's advocate.\n- **End of day**: close loops with a summary of decisions, completed work, and next actions.",
        "16. A Weekly Workflow\nOnce a week, review: completed work, unfinished commitments, approaching deadlines, blockers, decisions required, and repetitive tasks worth automating."
      ]
    },
    {
      "id": "chapter-10",
      "number": 10,
      "title": "Part VII — Implementation Plan, Master Framework & Troubleshooting",
      "paragraphs": [
        "17. The 7-Day ChatGPT Upgrade Plan\n- **Day 1: Write your working brief** (personalisation, role, goals, response preferences).\n- **Day 2: Improve your conversations** (devil's advocate, assumptions check, precise corrections).\n- **Day 3: Build a learning workflow** (structured lesson, interactive testing, application).\n- **Day 4: Practise writing and visual workflows** (workspace drafting, section edits, visual brief).\n- **Day 5: Explore voice and connected apps** (voice thinking, single connected app with read-only workflow).\n- **Day 6: Research and schedule** (structured research brief, one recurring task scheduled).\n- **Day 7: Test an agent workflow** (bounded task, approval checkpoints, error review).",
        "18. The Master Prompting Framework\nUse this structure for important tasks:\n```\nRole: Act as [role or perspective].\nContext: [relevant background and situation].\nObjective: Help me achieve [specific outcome].\nInputs: Use [documents, information, data, or sources].\nConstraints: Follow [requirements, limits, and exclusions].\nOutput: Produce [format, structure, and level of detail].\nQuality control: Check accuracy, identify assumptions, flag uncertainty, and challenge weak reasoning.\nNext step: End with the most useful next action.\n```",
        "19. Troubleshooting: When ChatGPT Is Not Helping\n\n| Problem | Likely cause | Better approach |\n| --- | --- | --- |\n| The answer is generic | Not enough context or specificity | Add audience, situation, and desired outcome |\n| It changes too much during editing | The revision request is too broad | Specify the exact section and what must remain unchanged |\n| It agrees with a weak idea | The prompt invites validation | Ask for counterarguments and a pre-mortem |\n| It invents details | The task lacks verification constraints or the model is uncertain | Request sources, uncertainty labels, and independent checks |\n| The research is shallow | The question is too broad | Define scope, subquestions, source standards, and deliverable |\n| The agent takes the wrong path | Instructions or boundaries are unclear | Narrow the task and define approval checkpoints |\n| Automation creates noise | The task has little practical value | Schedule only meaningful recurring work |\n| Connected apps do not behave as expected | Permissions or supported actions are limited | Check the connection, permissions, and current feature support |\n| You are not retaining what you learn | You are reading rather than practising | Use active recall, quizzes, and application exercises |"
      ]
    },
    {
      "id": "chapter-11",
      "number": 11,
      "title": "Part VIII — Responsible Use, Limits & Conclusion",
      "paragraphs": [
        "20. Keep Privacy and Permissions in the Workflow\n- Never share passwords, one-time codes, or private authentication secrets.\n- Avoid uploading confidential information unless authorised and product-compliant.\n- Use minimum connected-app permissions needed.\n- Review data-sharing and privacy settings.\n- Check generated messages before sending.\n- Require approval for purchases, bookings, submissions, and record changes.",
        "21. Understand the Limits of a Generalist Assistant\nBroad capability does not mean specialist-level reliability in every field. For legal, medical, financial, or safety decisions, verify with authoritative sources and qualified domain professionals.",
        "22. The Real Advantage Is Workflow, Not Feature Collecting\nKnowing feature names is not the same as using ChatGPT well. Match the right capability to the right task, and choose the ones that remove friction from work you actually do.",
        "Conclusion — Make ChatGPT Part of How You Work\nThe biggest shift is moving from isolated questions to intentional workflows. Start by giving ChatGPT useful context. Learn to ask better questions and challenge its answers. Use the right mode for writing, learning, research, images, and voice. Connect only apps that improve a real process. Schedule genuinely repetitive tasks. Use agent-style execution for bounded work, while keeping approval and judgement in human hands.",
        "The goal is not to make ChatGPT do everything. It is to use it to reduce avoidable work, improve the quality of your thinking, learn faster, and give yourself more time for the decisions and actions that matter."
      ]
    }
  ]
};
