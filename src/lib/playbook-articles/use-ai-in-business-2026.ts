import { PlaybookArticle } from "./types";

export const USE_AI_IN_BUSINESS_2026_ARTICLE: PlaybookArticle = {
  slug: "how-to-use-ai-in-your-business-in-2026",
  title: "How to Use AI in Your Business in 2026",
  readingTime: "35 min read",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793015889/How_to_Use_AI_in_Your_Business_in_2026.png",
  publishedDate: "2026",
  authorName: "Jason Teo",
  authorTitle: "AI Operations Strategist & Enterprise Systems Architect",
  introParagraphs: [
  "How to Use AI in Your Business in 2026\nA Practical Playbook for Making Your Business Better, Faster, Cheaper, and Less Risky\nIntroduction: AI Is a Business Tool, Not a Business Identity\nThe most useful way to think about AI in 2026 is not that every company needs to become an AI company. A business does not need to rebuild its identity around technology. It needs to use the tools available to deliver its existing products and services more effectively.",
  "The internet provides a useful comparison. Businesses adopted websites, email, online payments, and digital communication without all becoming internet companies. The technology became part of how business was done. AI is following a similar path, but its reach is broader: it can assist with work across almost every department and workflow.",
  "The objective is not to advertise that a company uses AI. Customers generally care about the outcome:\n- Is the product or service better?\n- Can they receive it faster?\n- Does it cost less?\n- Is the experience more reliable?\n- Does the business reduce the risk, friction, or effort involved?\nAI matters when it improves those outcomes.",
  "This playbook explains how to approach AI as an operating capability: how to understand your workflows, identify opportunities, build useful automations, train AI against the standards of your business, and apply it across marketing, sales, customer support, and other functions.\nWhat this playbook will help you do\nBy the end, you should be able to:\n1. Identify business processes that are suitable for AI assistance or automation.\n2. Translate your practical business knowledge into clear workflows an AI system can follow.\n3. Avoid the common mistake of comparing an untrained AI workflow with a mature human process.\n4. Build and improve one automation from beginning to end.\n5. Apply AI to marketing, lead management, sales follow-up, scheduling, support, and administrative work.\n6. Measure AI by business outcomes rather than novelty or the number of tools deployed."
],
  chapters: [
  {
    "id": "chapter-1",
    "number": 1,
    "title": "The Right Mental Model for AI in Business",
    "paragraphs": [
      "1.1 Think of the Business as a Production System\nA business can be understood as a system that turns attention, demand, and resources into customer outcomes and ultimately profit.",
      "A simplified operating chain might look like this:\n1. Attention: Potential customers discover the business.\n2. Interest: They engage with its content, offer, or sales process.\n3. Conversion: Some become customers.\n4. Delivery: The business provides the product or service.\n5. Support: Questions and problems are resolved.\n6. Retention: Customers return, renew, or recommend the business.\n7. Economics: Revenue is generated while costs and risks are managed.\nEach stage contains tasks, decisions, handoffs, and information. Those are the places where AI may be useful.",
      "Instead of asking, “What AI tool should I buy?”, ask:\n- Which part of this process is slow?\n- Where do people repeatedly perform the same task?\n- Where does information have to be copied from one system to another?\n- Where do customers wait for a response?\n- Where are errors, missed opportunities, or unnecessary costs occurring?\n- Which decisions rely on patterns that can be documented and checked?\nThe better the process is understood, the easier it becomes to identify an appropriate use for AI.\n1.2 You Do Not Need to Become an AI Company\nAI should be treated as an enabling technology. A restaurant does not need to become a software company to use AI for reservations, customer questions, demand forecasting, or marketing. A professional services firm does not need to become an AI lab to use it for document review, meeting summaries, research, and administrative work.",
      "The same principle applies to a small business.",
      "The business remains focused on its customers and its core offer. AI becomes one of the tools used to operate it.",
      "Practical rule: Start with a business problem, not a technology trend.",
      "A weak starting point is:\nWe need to use AI. What can we automate?",
      "A stronger starting point is:\nOur team spends several hours every day sorting enquiries and answering the same questions. How can we reduce that workload without lowering answer quality?",
      "The second question provides a defined problem, an existing process, and a result that can be measured.\n1.3 Combine Business Knowledge With Technical Knowledge\nOne of the strongest advantages an owner or operator can develop is an understanding that connects high-level business strategy with the practical details of how work gets done.",
      "This can be thought of as cloud-to-dirt knowledge:\n| Level | What it involves |\n| --- | --- |\n| Strategic | Understanding the business model, customer, economics, and priorities |\n| Functional | Understanding marketing, sales, delivery, support, finance, and people |\n| Operational | Knowing the actual steps employees take to complete work |\n| Technical | Understanding tools, integrations, data, APIs, permissions, and automation logic |",
      "The value comes from connecting these levels.",
      "A technical specialist may know how to connect two applications, but may not understand why that connection matters to the business. An owner may understand the customer problem and the value of solving it, but may not know which technical components can deliver the solution.",
      "The strongest results often come from combining both perspectives.\nWhy the owner must participate\nIf an owner delegates AI implementation without explaining the business context, the implementation may default to familiar, generic automations. Those can be useful, but they may miss opportunities that depend on a deeper understanding of the company's customers, processes, and economics.",
      "The owner does not need to personally write every integration or configure every system. The owner should, however, understand enough to:\n- Explain the desired business outcome.\n- Describe how the current workflow operates.\n- Identify the important exceptions and edge cases.\n- Recognise where a proposed automation creates value.\n- Evaluate whether the finished process is actually working.\nAI literacy is therefore not only a technical skill. It is an operating skill.\n1.4 Avoid Automating a Process You Do Not Understand\nAutomation does not automatically fix a poor process. It can make a bad process run faster and at a larger scale.",
      "Before introducing AI, understand:\n- What triggers the process?\n- What information is required?\n- What steps are performed?\n- What decisions are made?\n- What happens when information is missing?\n- What exceptions occur?\n- What counts as a successful result?\n- Who is responsible when the process fails?\nIf the current process is unclear, document and improve it before automating it."
    ]
  },
  {
    "id": "chapter-2",
    "number": 2,
    "title": "Find the Right Work to Automate",
    "paragraphs": [
      "2.1 Look for Observable Behaviours, Not “Magic”\nPeople often describe their work using phrases such as:\n- “I just know what to do.”\n- “I have a gut feeling.”\n- “I can tell when something is wrong.”\n- “I know what a good idea looks like.”\n- “I can usually tell which customer is serious.”\nThese statements can make a process seem impossible to explain. But many forms of expertise involve pattern recognition developed through experience.",
      "The useful question is not whether a task feels intuitive. It is:",
      "What do you actually observe, consider, compare, and do to reach the result?",
      "For example, a business owner may say that coming up with content ideas is instinctive. Breaking the activity down might reveal a repeatable process:\n1. Review the events and conversations from the previous week.\n2. Identify unusual customer questions or problems.\n3. Look for decisions, disagreements, mistakes, or unexpected outcomes.\n4. Select the moments that would be useful or interesting to the audience.\n5. Turn those moments into stories, lessons, or content ideas.\nOnce the behaviours are visible, AI can assist with parts of the process.\n2.2 Build a Workflow Inventory\nList recurring activities across the business. Do not begin by deciding which ones AI should replace. First establish what work exists.\n| Department | Example recurring activities | Potential AI contribution |\n| --- | --- | --- |\n| Marketing | Research, ideation, scripting, packaging, reporting | Research assistance, idea generation, draft creation, analysis |\n| Sales | Lead research, qualification, follow-up, scheduling | Enrichment, prioritisation, personalised drafts, routing |\n| Customer support | Repeated questions, ticket classification, status requests | Suggested answers, classification, routine resolution |\n| Operations | Data entry, handoffs, status updates, checklists | Information transfer, alerts, task coordination |\n| Legal administration | Document organisation, first-pass review, routine correspondence | Extraction, summarisation, draft preparation for review |\n| Management | Reviewing activity, identifying issues, preparing updates | Summaries, pattern detection, decision support |",
      "These are candidate uses, not automatic recommendations. The suitability of each task depends on its risk, data, complexity, and need for human judgement.\n2.3 Prioritise by Value and Feasibility\nA useful first-pass assessment scores each workflow against five questions:\n1. Frequency: How often does it happen?\n2. Time: How much human time does it consume?\n3. Repetition: Does it follow a consistent pattern?\n4. Impact: What is the value of doing it faster or more reliably?\n5. Risk: What could happen if the AI makes a mistake?\nA simple prioritisation table:\n| Workflow | Frequency | Repetition | Business impact | Risk | Initial priority |\n| --- | --- | --- | --- | --- | --- |\n| Categorising routine enquiries | High | High | Medium–high | Medium | High |\n| Drafting internal meeting summaries | High | High | Medium | Low–medium | High |\n| Approving refunds automatically | Medium | Medium | Medium | High | Low without controls |\n| Making final legal decisions | Low–medium | Low | High | Very high | Human-led |\n| Generating content ideas from company activity | Weekly | Medium–high | Medium | Low–medium | High |",
      "Use the table to decide what deserves a pilot. Do not treat the scores as universal; adjust them to the business.\n2.4 Start With a Bounded Workflow\nA good first project is small enough to complete, but meaningful enough to produce a measurable benefit.",
      "Examples:\n- Turn incoming support messages into categorised tickets.\n- Create a daily summary of new leads.\n- Draft follow-up messages for human approval.\n- Extract key details from a standard document.\n- Turn meeting transcripts into action lists.\n- Collect business events and conversations into a weekly content brief.\nAvoid starting with a promise to automate an entire department. A department usually contains many distinct processes, exceptions, and responsibilities."
    ]
  },
  {
    "id": "chapter-3",
    "number": 3,
    "title": "Build AI Workflows That Actually Work",
    "paragraphs": [
      "3.1 Use Existing Tutorials as Implementation Guides\nA practical way to learn a specific automation is to find a tutorial that demonstrates the workflow you want to build.",
      "A useful learning loop is:\n1. Find a tutorial for the specific task.\n2. Obtain the tutorial transcript or written instructions.\n3. Give the material to an AI assistant.\n4. Explain the business outcome you want.\n5. Ask the assistant to translate the instructions into steps for your situation.\n6. Follow the steps in the relevant applications.\n7. When you get stuck, provide a screenshot and explain what you expected to happen.\n8. Ask for the next step, make the change, and test again.\n9. Repeat until the workflow operates from beginning to end.\nThe AI assistant can function as an implementation guide, helping interpret instructions and troubleshoot the interface.\nA prompt for turning a tutorial into a build plan\nI want to build the workflow described in the tutorial material below.",
      "My business context:\n[Explain the business, team, customers, and relevant systems.]",
      "Desired outcome:\n[Describe exactly what should happen when the workflow is complete.]",
      "Current setup:\n[List the tools, accounts, data sources, and integrations available.]",
      "Please:\n1. Explain the workflow in plain language.\n2. List the required tools and prerequisites.\n3. Break the build into small, ordered steps.\n4. Explain what I should see after each important step.\n5. Identify likely errors and how to troubleshoot them.\n6. Clearly mark any step that could send a message, change a record,\n   spend money, or affect a customer.\n7. Do not assume a step is complete unless I confirm it.\n8. Ask me for a screenshot or missing detail when necessary.",
      "Tutorial material:\n[Paste transcript or instructions here.]\nDo not paste confidential customer information, credentials, API keys, or sensitive business records into an AI tool unless the tool and your organisation's policies permit it.\n3.2 Build From Trigger to Completion\nA workflow is not complete merely because one part works. It should be tested from the event that starts it through to the final outcome.",
      "For each automation, document:\n- Trigger: What starts the workflow?\n- Input: What information enters?\n- Processing: What does the AI or automation do?\n- Decision: What rules determine the next step?\n- Action: What system is updated or what communication is sent?\n- Output: What result should be produced?\n- Exception: What happens when the process cannot continue?\n- Owner: Who monitors the workflow?\n- Recovery: How can a failed or incorrect action be reversed?\nExample: incoming customer enquiry.\n| Stage | Example |\n| --- | --- |\n| Trigger | A customer submits an enquiry form |\n| Input | Name, contact details, question, product or service of interest |\n| Processing | AI classifies the enquiry and extracts relevant details |\n| Decision | Is the request routine, urgent, incomplete, or high-value? |\n| Action | Route it to the appropriate queue and draft a response |\n| Output | A categorised enquiry with a suggested next step |\n| Exception | Missing information or uncertain classification |\n| Human control | A team member reviews sensitive or uncertain cases |",
      "3.3 Give AI the Same Quality of Process You Expect From People\nA common implementation mistake is to compare a newly installed AI function with a human process that has been refined over many years.",
      "That is not a fair comparison.",
      "A mature human process may include:\n- Documented standard operating procedures.\n- Training and coaching.\n- Examples of successful and unsuccessful work.\n- Feedback from managers.\n- Rules for unusual cases.\n- Quality checks.\n- Repeated practice and refinement.\nAn AI workflow needs an equivalent foundation. Simply connecting a model to a business application does not reproduce years of operational learning.\nThe apples-to-apples comparison\nWhen evaluating AI against a human process, compare:\n| Human process | AI process |\n| --- | --- |\n| Training and onboarding | Instructions, context, examples, and tests |\n| SOPs | Explicit workflow and decision rules |\n| Coaching | Feedback and prompt/workflow updates |\n| Quality assurance | Evaluation cases and review sampling |\n| Escalation rules | Confidence thresholds and exception routing |\n| Performance review | Measured results over time |",
      "If the human process is well-developed and the AI process is not, the comparison says more about implementation maturity than about the long-term potential of the technology.\n3.4 Train Against Real Business Examples\nWhere appropriate, give the AI examples of what good work looks like.",
      "For a sales assistant, examples might include:\n- A strong response to a qualified lead.\n- A response to a poor-fit lead.\n- A respectful follow-up after no reply.\n- A case where the prospect needs a human conversation.\n- A situation where the correct action is not to sell.\nFor a support assistant:\n- A routine question and approved answer.\n- A refund request and the relevant policy.\n- A complaint that requires escalation.\n- A question the business cannot confidently answer.\n- An example of a response that should never be sent.\nUse approved, appropriately anonymised examples. Make the rules explicit rather than expecting the model to infer every policy from a small collection of messages.\n3.5 Test Before You Deploy\nBuild a test set that represents normal and difficult cases.",
      "Include:\n- Typical requests.\n- Incomplete information.\n- Ambiguous wording.\n- Unusual customer behaviour.\n- Out-of-scope requests.\n- Conflicting information.\n- Requests involving money, legal issues, privacy, or safety.\nFor each test, define the expected behaviour. Sometimes the correct response is to ask a question or escalate—not to produce an answer.",
      "Start with a draft-only or approval-required mode. Expand autonomy only after the system demonstrates reliable performance."
    ]
  },
  {
    "id": "chapter-4",
    "number": 4,
    "title": "Apply AI Across Marketing",
    "paragraphs": [
      "Marketing is not one task. It is a collection of activities: research, positioning, idea development, content production, creative testing, distribution, and performance analysis.",
      "AI can assist across the full process.\n4.1 Research Trends and Formats\nAn AI-supported research workflow can gather:\n- Topics that are receiving attention in the market.\n- Common questions and objections from customers.\n- Emerging content formats.\n- Verbal hooks and opening structures.\n- Visual patterns and creative approaches.\n- Themes that have performed well in the business's own past content.\nThe goal is not to copy a trending post. It is to understand the pattern behind it and decide whether that pattern fits the brand.\n4.2 Combine Market Patterns With Your Brand\nA useful content ideation method is to combine two information sets:",
      "Set A: What is working in the market\n- Topics\n- Formats\n- Hooks\n- Visual openings\n- Story structures\n- Distribution patterns\nSet B: What is distinctive about your business\n- Customer problems\n- Product knowledge\n- Company experience\n- Brand perspective\n- Customer stories\n- Demonstrated results\nAsk AI to find the overlap between the two sets.\nContent ideation prompt\nAct as a marketing research and content strategist.",
      "Here are patterns currently appearing in my market:\n[Paste researched topics, formats, hooks, and visual patterns.]",
      "Here is my brand:\n[Describe the audience, offer, expertise, voice, values, and boundaries.]",
      "Here is our source material:\n[Add customer questions, product information, company stories, and\napproved examples.]",
      "Generate 10 content concepts that combine relevant market patterns\nwith our actual expertise and brand.",
      "For each concept, provide:\n- The audience problem or desire\n- The central idea\n- The proposed format\n- A possible opening hook\n- The visual approach\n- The evidence or real example needed\n- A suitable call to action",
      "Do not invent customer results, testimonials, or company experiences.\nFlag concepts that need additional proof.\nAI can generate options, but a person should select the ideas that are accurate, useful, distinctive, and appropriate for the brand.\n4.3 Move From Idea to Content Package\nOnce an idea is selected, AI can help turn it into a complete content package:\n- Headline or title.\n- Opening hook.\n- Script or outline.\n- Supporting points.\n- Thumbnail or visual concept.\n- Caption and description.\n- Call to action.\n- Variations for different platforms.\nThis reduces the friction between having an idea and preparing it for publication.",
      "A useful production sequence is:\n1. Select the idea.\n2. Confirm the audience and intended outcome.\n3. Gather the facts and examples.\n4. Draft the content.\n5. Check accuracy and brand voice.\n6. Create the visual assets.\n7. Review the final package.\n8. Publish and measure the result.\nDo not let AI invent proof to make content more persuasive. If a claim needs a customer result, demonstration, source, or case study, obtain real evidence.\n4.4 Use Business Activity as a Source of Content\nA business already creates stories through its normal operations:\n- Customer conversations.\n- Sales calls.\n- Product decisions.\n- Problems solved.\n- Mistakes and lessons.\n- Unexpected customer questions.\n- Important events during the week.\nThese moments can become a source of original content.",
      "A practical workflow:\n1. Review the business calendar for the week.\n2. Collect relevant meeting notes or call transcripts, where recording and processing are permitted.\n3. Identify meaningful decisions, problems, and unusual situations.\n4. Select the five most useful moments.\n5. Turn each moment into a short factual summary.\n6. Develop suitable stories, lessons, or content ideas.\n7. Have a knowledgeable person verify the details before publication.\nWeekly story-finding prompt\nReview the approved calendar notes, meeting summaries, and conversation\ntranscripts provided below.",
      "Identify the five most interesting or useful events from this period.",
      "Prioritise:\n- A customer problem that was solved\n- A surprising question or objection\n- A meaningful business decision\n- A mistake and what it taught us\n- A result that can be supported by evidence\n- A recurring pattern worth explaining",
      "For each event, provide:\n1. What happened\n2. Why it matters to our audience\n3. The lesson or insight\n4. What facts need verification\n5. Three possible content angles",
      "Do not invent dialogue, outcomes, customer identities, or details.\nRemove personal and confidential information.\nThis approach can make content more authentic because it starts with actual business activity rather than fabricated stories.",
      "Important: Call recording, transcription, and reuse of conversations require appropriate notice, consent, access controls, and compliance with applicable privacy and recording laws. Do not assume that a conversation can automatically be repurposed for marketing.\n4.5 Automate Creative Testing Carefully\nAI can help generate variations of headlines, thumbnails, images, and ad concepts. A more advanced workflow can connect creative production with testing and performance data.",
      "A possible system:\n1. Generate several creative variations from an approved campaign brief.\n2. Check each variation against brand and factual requirements.\n3. Publish or test the approved variations.\n4. Collect performance data.\n5. Compare results using the same measurement window and audience context.\n6. Identify patterns in the better-performing creative.\n7. Feed those observations into the next round of creative development.\nThe objective is a learning loop, not simply producing a large volume of assets.",
      "Do not assume that the best-performing variation will always be the best long-term choice. Results can be affected by audience, placement, budget, seasonality, and sample size. Review the underlying data before changing the creative strategy.\n4.6 Turn Existing Customer Wins Into Creative Assets\nIf a business community, customer programme, or product generates verified customer wins, those records can become a source of marketing material.",
      "For example, a system could:\n1. Detect a newly submitted customer win.\n2. Check whether the entry contains the information required for publication.\n3. Remove or mask personal details unless permission has been granted.\n4. Pass the approved information into a set of brand templates.\n5. Generate several creative formats.\n6. Route the assets for approval.\n7. Add approved assets to an advertising or publishing queue.\nThe workflow should never treat a submitted claim as verified merely because it exists in a database. Obtain permission and check the accuracy of claims before using them in public advertising."
    ]
  },
  {
    "id": "chapter-5",
    "number": 5,
    "title": "Apply AI Across Sales",
    "paragraphs": [
      "Sales is not simply a sequence of automated messages. It is a process that helps the right customer understand an offer, decide whether it fits, and take an appropriate next step.",
      "AI can improve speed and consistency, but it does not remove the need for a sound sales process.\n5.1 Do Not Install an AI Salesperson Into a Broken Sales Process\nAn AI sales agent should not be expected to repair a sales process that has never been properly designed.",
      "Before deploying one, understand:\n- Who is a good-fit customer?\n- What problem are they trying to solve?\n- What makes a lead qualified?\n- What questions should be asked?\n- What objections commonly arise?\n- What claims can the business support?\n- When should a lead be scheduled with a human?\n- When should the business decline or disqualify the opportunity?\nIf the current human sales process is inconsistent, document and improve it first.\n5.2 Treat AI Sales Deployment Like Hiring and Training\nPutting an AI sales agent into a new business is not equivalent to transferring a fully trained employee into a new environment.",
      "The system needs context about:\n- The product or service.\n- The target customer.\n- Pricing and commercial terms.\n- The sales process.\n- The brand's communication style.\n- Qualification rules.\n- Approved claims.\n- Escalation conditions.\n- Examples of good and bad interactions.\nIt also needs to be tested against real scenarios before it is trusted with customer-facing actions.\n5.3 Lead Enrichment and Prioritisation\nAI can help organise incoming leads by extracting and summarising relevant information.",
      "Potential data points include:\n- Business name and industry.\n- Stated need.\n- Product or service of interest.\n- Company size, where lawfully available and relevant.\n- Timing and urgency.\n- Questions or objections.\n- Missing information.\nThe system can then help route leads into suitable categories.",
      "Avoid collecting irrelevant personal data or making sensitive inferences. Use legitimate, relevant business information and follow the rules governing your data sources.\n5.4 Personalised Follow-Up\nAI can help prepare a message that reflects the prospect's actual business and stated needs.",
      "A controlled workflow might be:\n1. A new lead enters the CRM.\n2. The system retrieves approved business context.\n3. AI summarises the lead's stated problem.\n4. AI drafts a relevant message.\n5. A salesperson reviews the draft.\n6. The message is sent through an approved channel.\n7. The interaction is recorded in the CRM.\nThe important distinction is between personalisation and fabricated familiarity. A message should not pretend that the salesperson has researched, observed, or experienced something that did not happen.\nLead follow-up prompt\nYou are assisting a salesperson with a follow-up message.",
      "Business:\n[Describe our company and offer.]",
      "Prospect information:\n[Provide only relevant, approved business information.]",
      "Prospect's stated need:\n[Summarise what the prospect actually said.]",
      "Previous interaction:\n[Summarise the conversation accurately.]",
      "Write a concise follow-up that:\n- Refers only to verified information\n- Connects our offer to the prospect's stated need\n- Avoids exaggerated claims\n- Does not pretend to have a personal relationship\n- Includes one clear next step",
      "If the information is insufficient, list what needs to be clarified\ninstead of inventing details.\n5.5 Use AI to Improve Response Speed\nAI can assist with initial responses, lead routing, and follow-up preparation. Faster response can reduce delays, but speed alone is not the measure of success.",
      "Track whether faster responses lead to:\n- More qualified conversations.\n- More meetings that actually take place.\n- Better conversion rates.\n- Less manual work.\n- A better customer experience.\nDo not automatically contact every person who submits a form. The appropriate follow-up depends on the sales motion, customer expectations, consent, channel rules, and the economics of the business.\n5.6 AI-Assisted Scheduling and Handoffs\nA scheduling workflow can use one system to identify a lead's next step and another to check availability or arrange a meeting.",
      "A basic handoff could be:\n1. A lead completes qualification.\n2. The system determines the appropriate meeting type.\n3. Availability is checked against the relevant calendar.\n4. Suitable times are offered.\n5. The prospect selects a time.\n6. The booking is confirmed.\n7. The human salesperson receives the relevant context.\nThe purpose is to reduce administrative friction and avoid unnecessary back-and-forth. The human should still receive enough context to conduct a useful meeting."
    ]
  },
  {
    "id": "chapter-6",
    "number": 6,
    "title": "Apply AI to Customer Support and Risk Reduction",
    "paragraphs": [
      "Customer support is a strong candidate for AI assistance because many support operations contain repeated questions, predictable information requests, and routing decisions.",
      "However, the business must distinguish routine questions from situations that require human judgement.\n6.1 Start With the Support Categories\nReview the support queue and group tickets into categories such as:\n- Product or service information.\n- Account access.\n- Order or delivery status.\n- Billing questions.\n- Refund requests.\n- Troubleshooting.\n- Complaints.\n- Requests for human assistance.\nIdentify which categories have approved, consistent answers and which require investigation or discretion.\n6.2 Build a Support Knowledge Base\nA support assistant should use current, approved business information.",
      "A useful knowledge base may contain:\n- Frequently asked questions.\n- Product documentation.\n- Policies and procedures.\n- Delivery or fulfilment information.\n- Troubleshooting steps.\n- Escalation rules.\n- Approved response examples.\nAssign an owner to keep this information up to date. An AI assistant should not confidently answer from an outdated policy or guess when the relevant information is missing.\n6.3 Use a Triage-and-Resolve Workflow\nA controlled support workflow:\n1. Receive the ticket.\n2. Identify its category and urgency.\n3. Extract the customer's actual question.\n4. Retrieve relevant approved information.\n5. Determine whether the case is eligible for automated handling.\n6. Draft or provide the approved answer.\n7. Escalate uncertain, sensitive, or high-impact cases.\n8. Record the outcome.\n9. Review samples for quality and recurring errors.\nExample decision rules\n| Case | Suggested handling |\n| --- | --- |\n| Routine question with a documented answer | AI may answer using approved information |\n| Missing order or account details | Ask for the required information through a secure process |\n| Refund request | Apply the documented policy; require approval where appropriate |\n| Angry or distressed customer | Use careful language and offer human escalation |\n| Legal threat or serious complaint | Escalate to an authorised person |\n| Unclear or unsupported question | Do not guess; route to a human |",
      "6.4 Use Automation to Reduce Operational Risk\nAI can help identify patterns that are difficult to detect manually across large volumes of activity.",
      "Potential applications include:\n- Flagging unusual transaction patterns for review.\n- Identifying repeated support issues.\n- Detecting inconsistencies in records.\n- Highlighting missing information in documents.\n- Prioritising cases that may need attention.\nThe system should be treated as a decision-support mechanism unless it has been validated and authorised for a more autonomous role.",
      "For fraud-related workflows, false positives and false negatives both matter. A flagged transaction is not proof of wrongdoing, and an unflagged transaction is not proof that it is safe. Human review, monitoring, and a process for appeals or corrections may be necessary.\n6.5 Use AI for Document-Heavy Work, With Human Oversight\nThe source material highlights legal and agreement-related work as an area where AI can reduce repetitive review effort. This is a useful category to examine, but it requires strong controls.",
      "Possible assistance includes:\n- Extracting key fields from standard documents.\n- Comparing a document with an approved checklist.\n- Summarising clauses for a qualified reviewer.\n- Identifying missing information.\n- Organising documents by matter or transaction.\n- Preparing a first draft of routine correspondence.\nAI output should not be treated as legal advice or a final legal decision. Qualified professionals must review consequential legal analysis, contractual commitments, filings, and external communications.",
      "A general workflow can divide work into separate stages:\n1. Intake and document classification.\n2. Extraction of relevant information.\n3. First-pass comparison against approved criteria.\n4. Flagging of missing, unusual, or conflicting provisions.\n5. Human legal review.\n6. Approved drafting or response.\n7. Final verification and recordkeeping.\nSeparate agents or automated steps may perform different administrative tasks, but splitting work between agents does not eliminate the need for accountable professional review."
    ]
  },
  {
    "id": "chapter-7",
    "number": 7,
    "title": "Design a Business-Wide AI Operating System",
    "paragraphs": [
      "7.1 Think in Workflows, Not Isolated Tools\nA collection of disconnected AI tools can create more complexity than value.",
      "A better approach is to identify how information moves through the business and where assistance is useful.",
      "For example, marketing and sales may share information:\n1. Marketing produces content.\n2. Prospects respond or submit enquiries.\n3. The CRM records the lead.\n4. AI helps classify and summarise the enquiry.\n5. Sales reviews and follows up.\n6. Scheduling coordinates the next meeting.\n7. The outcome is recorded.\n8. Insights from customer conversations can inform future marketing.\nThis is more valuable than treating each AI feature as an unrelated experiment.\n7.2 Define Roles and Permissions\nFor every AI-enabled workflow, specify what the system may do.\n| Permission level | Example |\n| --- | --- |\n| Read | Retrieve approved information |\n| Analyse | Classify, compare, summarise, or identify patterns |\n| Draft | Prepare a message or document for review |\n| Recommend | Suggest a next action |\n| Execute with approval | Perform an action after a person confirms |\n| Execute within limits | Perform a narrow, pre-approved action |\n| Prohibited | Make decisions or access data outside its authorised scope |",
      "Start with the lowest level of autonomy that can produce value. Increase permissions only after testing and monitoring.\n7.3 Keep Human Accountability Clear\nAutomation does not remove organisational responsibility.",
      "For each workflow, identify:\n- The person accountable for the process.\n- The person who approves important actions.\n- The person who monitors quality.\n- The person who handles exceptions.\n- The person who updates the instructions and knowledge base.\nA workflow without an owner is likely to become unreliable over time.\n7.4 Protect Data and Business Systems\nBefore connecting AI to business applications:\n- Review the provider's data handling and retention terms.\n- Use business-approved accounts and tools.\n- Limit access to the information needed for the task.\n- Do not place passwords, secret keys, or credentials in prompts.\n- Use role-based access and secure secret storage for integrations.\n- Remove or anonymise personal information when possible.\n- Confirm permissions before recording or processing customer conversations.\n- Keep logs of important automated actions.\n- Establish a way to pause the workflow if it behaves incorrectly.\nFor sensitive workflows, consult the relevant legal, security, privacy, and compliance professionals."
    ]
  },
  {
    "id": "chapter-8",
    "number": 8,
    "title": "Measure Whether AI Is Improving the Business",
    "paragraphs": [
      "AI adoption should be judged by operating results, not by how impressive a demo looks.\n8.1 Establish a Baseline\nBefore changing a workflow, record how it performs today.",
      "Depending on the process, measure:\n- Time spent per task.\n- Total labour hours.\n- Cost per completed task.\n- Response time.\n- Completion rate.\n- Error rate.\n- Rework rate.\n- Customer satisfaction.\n- Conversion rate.\n- Escalation rate.\nWithout a baseline, it is difficult to know whether the new process has improved anything.\n8.2 Compare the Full Cost\nThe cost of an AI workflow is not only the subscription price.",
      "Include:\n- Software and model usage.\n- Integration and setup.\n- Staff time spent reviewing outputs.\n- Training and maintenance.\n- Error correction and rework.\n- Security and compliance work.\n- Costs caused by failed or incorrect actions.\nA workflow that generates more output but requires extensive human correction may not be cheaper.\n8.3 Use a Balanced Scorecard\n| Dimension | Questions |\n| --- | --- |\n| Better | Is the output more useful or accurate? |\n| Faster | Has total time from start to completion decreased? |\n| Cheaper | Has the full cost per successful outcome fallen? |\n| Less risky | Have errors, missed steps, or preventable losses decreased? |\n| Customer experience | Are customers receiving a more reliable service? |",
      "Do not optimise one metric at the expense of the whole customer experience. For example, reducing support response time is not an improvement if incorrect answers and repeat contacts increase.\n8.4 Run a Fair Comparison\nCompare the AI workflow with a properly documented human workflow.",
      "Use similar task types, quality standards, and evaluation periods. Where possible, test the same set of cases through both processes.",
      "Record:\n- What the human process received.\n- What the AI process received.\n- The expected outcome.\n- The actual outcome.\n- Time and cost.\n- Errors and corrections.\n- Cases requiring escalation.\nThis helps distinguish a genuine capability gap from an implementation gap."
    ]
  },
  {
    "id": "chapter-9",
    "number": 9,
    "title": "A Practical 30-Day AI Implementation Plan",
    "paragraphs": [
      "The goal of the first month is not to automate the entire business. It is to complete one useful workflow from beginning to end, measure it, and establish a repeatable method for the next project.\nWeek 1: Understand the Business and Select a Workflow\nDay 1 — Map the operating process",
      "Write down the main steps through which the business attracts, converts, serves, and retains customers.",
      "Day 2 — List repetitive work",
      "Ask team members what they do repeatedly, where they wait for information, and which tasks create avoidable friction.",
      "Day 3 — Document one process",
      "Choose a recurring task and write its trigger, inputs, steps, decisions, outputs, exceptions, and owner.",
      "Day 4 — Establish the baseline",
      "Measure time, cost, quality, and current failure points.",
      "Day 5 — Select the pilot",
      "Choose a bounded workflow with meaningful value, manageable risk, and accessible data.",
      "Days 6–7 — Define the target",
      "Write down what success means. Specify what the AI may read, draft, recommend, and execute.\nWeek 2: Build the First Version\nDay 8 — Gather approved information",
      "Collect the relevant SOPs, policies, examples, and source data.",
      "Day 9 — Design the workflow",
      "Define the trigger, processing steps, decisions, actions, exceptions, and human handoffs.",
      "Day 10 — Build the first version",
      "Use an appropriate AI tool and integration platform. Keep the first version narrow.",
      "Day 11 — Create test cases",
      "Include normal, incomplete, ambiguous, and high-risk examples.",
      "Day 12 — Test and inspect",
      "Compare each output with the expected result. Record errors and missing instructions.",
      "Days 13–14 — Improve",
      "Update the workflow, examples, rules, and escalation conditions.\nWeek 3: Run a Controlled Pilot\nDay 15 — Start in draft or approval mode",
      "Let the AI prepare outputs while a person checks them.",
      "Days 16–17 — Review quality",
      "Measure accuracy, time saved, rework, and escalations.",
      "Day 18 — Investigate failures",
      "Identify whether errors came from missing context, poor instructions, bad data, system integration, or an unsuitable use case.",
      "Day 19 — Improve safeguards",
      "Add validation, limits, and clear exception handling.",
      "Days 20–21 — Repeat the test",
      "Run the same evaluation cases again and check whether the changes improved results.\nWeek 4: Evaluate and Decide\nDays 22–24 — Expand cautiously",
      "If the pilot is reliable, increase its workload or introduce a small amount of additional autonomy.",
      "Days 25–26 — Document the operating procedure",
      "Write down how the workflow works, who owns it, how it is monitored, and how it can be paused.",
      "Day 27 — Calculate the economics",
      "Compare the full cost and performance with the baseline.",
      "Day 28 — Gather team feedback",
      "Ask what improved, what became harder, and which exceptions remain frustrating.",
      "Day 29 — Make the decision",
      "Choose to continue, improve, expand, or stop the workflow.",
      "Day 30 — Select the next opportunity",
      "Use the same method to identify the next valuable process."
    ]
  },
  {
    "id": "chapter-10",
    "number": 10,
    "title": "Ready-to-Use Business Templates",
    "paragraphs": [
      "10.1 Workflow Documentation Template\nWORKFLOW NAME:\n[Name]",
      "BUSINESS PURPOSE:\n[Why this process exists]",
      "PROCESS OWNER:\n[Responsible person]",
      "CURRENT TRIGGER:\n[What starts the process]",
      "CURRENT INPUTS:\n[Information required]",
      "CURRENT STEPS:\n1.\n2.\n3.",
      "DECISIONS:\n[Rules and judgement points]",
      "OUTPUT:\n[What a successful result looks like]",
      "COMMON EXCEPTIONS:\n[What can go wrong]",
      "CURRENT PERFORMANCE:\n[Time, cost, volume, quality, error rate]",
      "PROPOSED AI ROLE:\n[Read / analyse / draft / recommend / execute]",
      "HUMAN APPROVAL REQUIRED:\n[Which actions need review]",
      "SUCCESS METRICS:\n[How improvement will be measured]",
      "FAILURE AND RECOVERY:\n[How to detect, pause, correct, and resume]\n10.2 AI Workflow Instruction Template\nROLE:\nYou assist with [specific business workflow].",
      "OBJECTIVE:\nProduce [defined outcome].",
      "BUSINESS CONTEXT:\n[Relevant company, customer, product, and process information.]",
      "APPROVED SOURCES:\n[Documents, records, policies, and systems you may use.]",
      "PROCESS:\n1.\n2.\n3.",
      "DECISION RULES:\n[Explicit conditions and routing logic.]",
      "QUALITY STANDARD:\n[What a correct, useful result must contain.]",
      "RESTRICTIONS:\n- Do not invent facts.\n- Do not claim an action was completed unless it was confirmed.\n- Do not access or disclose information outside the authorised scope.\n- Do not make decisions outside the permitted role.\n- Escalate uncertainty and high-impact cases.",
      "OUTPUT FORMAT:\n[Required fields or structure.]",
      "ESCALATION:\n[When and how to involve a person.]\n10.3 AI Evaluation Log\n| Date | Test case | Expected result | Actual result | Error or issue | Correction |\n| --- | --- | --- | --- | --- | --- |\n|  |  |  |  |  |  |\n|  |  |  |  |  |  |\n|  |  |  |  |  |  |",
      "10.4 Business Outcome Scorecard\n| Metric | Before AI | Pilot result | Target |\n| --- | --- | --- | --- |\n| Average completion time |  |  |  |\n| Cost per completed task |  |  |  |\n| Error rate |  |  |  |\n| Rework rate |  |  |  |\n| Human review time |  |  |  |\n| Customer satisfaction |  |  |  |",
      "Use the metrics that matter to the workflow. Do not fill every row if a measure is irrelevant or unavailable.\n10.5 Weekly AI Review\nAt the end of each week, ask:\n1. Which AI-enabled workflows operated successfully?\n2. What work did they remove or reduce?\n3. Where did they make mistakes?\n4. Which mistakes were caused by missing context or poor process design?\n5. Did any output reach a customer or system without the required approval?\n6. Did the workflow improve the customer experience?\n7. What should be changed before the next week?\n8. Should the workflow be expanded, held steady, or paused?"
    ]
  },
  {
    "id": "chapter-11",
    "number": 11,
    "title": "Common Mistakes to Avoid",
    "paragraphs": [
      "Mistake 1: Thinking the Business Must Become an AI Company\nAI is an operating tool. Keep the focus on the customer, the offer, and the business result.",
      "Mistake 2: Expecting a Technical Specialist to Discover Every Opportunity\nTechnical knowledge is valuable, but the business owner must explain the process, context, constraints, and value of the work.",
      "Mistake 3: Automating Before Understanding the Process\nA workflow that has not been documented is difficult to automate reliably. Make the steps and exceptions visible first.",
      "Mistake 4: Comparing an Untrained AI With an Experienced Employee\nA mature human process has accumulated SOPs, examples, feedback, and quality controls. Give the AI process a comparable foundation before judging it.",
      "Mistake 5: Assuming AI Makes Every Existing Activity Effective\nAI can make an activity faster or cheaper without making it worthwhile. Review the underlying business logic and customer experience.",
      "Mistake 6: Automating Every Lead or Customer Interaction\nMore messages do not automatically mean more sales or better service. Use qualification, relevance, consent, and appropriate escalation.",
      "Mistake 7: Publishing AI-Generated Claims Without Proof\nAI can produce convincing language, but convincing language is not evidence. Verify results, testimonials, customer stories, and performance claims.",
      "Mistake 8: Giving Agents Too Much Autonomy Too Early\nBegin with read, analyse, and draft permissions. Add execution rights only after testing, monitoring, and defining recovery procedures.",
      "Mistake 9: Ignoring Maintenance\nPolicies change, products change, prices change, integrations fail, and customer behaviour evolves. Assign an owner to maintain every important workflow.",
      "Mistake 10: Measuring Activity Instead of Outcomes\nThe number of agents, prompts, automations, or generated assets does not demonstrate business value. Measure quality, speed, cost, risk, and customer outcomes."
    ]
  },
  {
    "id": "chapter-12",
    "number": 12,
    "title": "Use AI to Improve the Work That Matters",
    "paragraphs": [
      "The practical opportunity in AI is not limited to building a new technology company or launching an AI-branded product. It is the opportunity to improve the way an existing business operates.",
      "The most important capabilities are straightforward:\n- Understand the business from strategy down to the details of daily work.\n- Identify observable workflows rather than treating expertise as mysterious.\n- Document the process before automating it.\n- Give AI the context, examples, and standards needed to perform well.\n- Compare AI and human processes fairly.\n- Use AI across marketing, sales, support, administration, and other suitable functions.\n- Keep people accountable for important decisions.\n- Measure whether the result is genuinely better, faster, cheaper, and less risky.\nYou do not need to automate everything at once. Choose one part of the business, dedicate focused time to it, and take the workflow from its initial trigger to its final outcome. Test it, improve it, and measure what changed.",
      "Then repeat the process.",
      "The lasting advantage will not come from simply having access to AI tools. It will come from understanding your business well enough to apply those tools where they create real value.\nSource and Scope Note\nThis playbook reorganises and expands the business practices and examples contained in the supplied transcript. The source discusses the overall AI operating philosophy, workflow implementation, fair comparisons between human and AI processes, marketing, sales, customer support, risk reduction, and the beginning of a legal-workflow example. The transcript ends abruptly during that final discussion. Accordingly, this playbook does not claim to reproduce any missing continuation.",
      "Specific company examples and numerical claims mentioned in the source are not presented here as independently verified facts. They are omitted from the main instructional framework because the playbook is focused on methods that a business can evaluate in its own environment."
    ]
  }
]
};
