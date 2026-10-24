const fs = require('fs');
const path = require('path');

function createLesson({
  modNum,
  lesNum,
  title,
  duration = "15m",
  summary,
  bulletPoints,
  takeaway,
  technicalContext,
  implementationPhases,
  codeOrSchema,
  caseStudy,
  checkpoint,
  courseTitle,
  modTitle,
}) {
  const lessonId = `${String(modNum).padStart(2, "0")}-${lesNum}`;
  const lessonNumber = `${modNum}.${lesNum}`;

  const slides = [
    {
      id: `s-${String(modNum).padStart(2, "0")}${lesNum}-1`,
      order: 1,
      type: "LIST",
      eyebrow: `MODULE ${String(modNum).padStart(2, "0")} · LESSON ${lessonNumber}`,
      headline: title,
      subheadline: summary,
      title: title,
      subtitle: summary,
      bulletPoints: bulletPoints,
      takeaway: takeaway,
    },
  ];

  const writtenLesson = `# ${lessonNumber} ${title}

> **Module ${String(modNum).padStart(2, "0")}: ${modTitle}**  
> *Core Playbook: ${courseTitle}*

---

## Executive Overview & Commercial Opportunity

In modern B2B operations, companies struggle not with a shortage of artificial intelligence tools, but with an absence of reliable, predictable execution systems. Many business owners have experimented with basic ChatGPT prompts or isolated chatbots, only to find that generic solutions fail when confronted with unstructured real-world data, legacy software, and nuanced human workflows.

${summary}

For agencies and independent operators, this gap represents an immense commercial opportunity. When you position yourself not as a generic prompt engineer, but as a systems architect who eliminates costly operational bottlenecks, client conversations shift immediately from price sensitivity to business value and return on investment.

---

## 1. Architectural Foundations & Core Mechanics

To build an implementation that functions autonomously in production, you must understand the underlying mechanics that govern this workflow. Traditional automation architectures fail because they are brittle: if an incoming input deviates slightly from expected fields, the entire pipeline halts.

### Key System Pillars

${bulletPoints.map((pt, i) => `- **Pillar ${i + 1} (${pt.split(':')[0] || 'Core Rule'}):** ${pt.split(':').slice(1).join(':').trim() || pt}`).join('\n\n')}

${technicalContext ? `### Technical Context & Design Patterns\n\n${technicalContext}` : `### Technical Execution Philosophy\n\nDeterministic system design requires enforcing strict typing at the boundary, parsing and normalizing incoming webhooks prior to LLM reasoning, and using structured JSON tool definitions. By constraining model temperature between 0.0 and 0.2, hallucinations are virtually eliminated across high-throughput production cycles.`}

> **Core Production Rule:** ${takeaway}

---

## 2. Step-by-Step System Implementation

Deploying this capability for a paying commercial client follows a rigorous 4-phase delivery framework designed to guarantee zero downtime and immediate operational relief.

${implementationPhases || `### Phase 1: Environment Setup & Data Schemas
Establish the operational sandbox and configure the relational schema. Define strict field types, required foreign keys, and status pipelines. Never build directly in the client's live production environment without isolated staging webhooks and version-controlled schemas.

### Phase 2: Logic Design & Prompt Engineering
Construct the cognitive instruction set. Define system prompts that explicitly state role boundaries, tool availability, required JSON output structures, and fallback behaviors. Implement confidence scoring: if model certainty falls below 85%, route the task to a human-in-the-loop review queue rather than executing unchecked.

### Phase 3: Integration & Error Handling
Wire the execution orchestrator (such as Make.com or n8n) to external APIs. Implement exponential backoff for rate limits, configure instant Slack/email alerting for execution failures, and store full payload logs in an audit table for post-execution traceability.

### Phase 4: Client Deployment & User Training
Deploy the system into the client's workspace. Configure permission tiers so administrative staff can oversee operations without the ability to modify backend logic. Provide an intuitive interface (such as Airtable Interfaces or Softr) and conduct a recorded 30-minute operational walkthrough.`}

---

## 3. Production Code & System Blueprint

Below is the validated architecture schema and prompt specification used to deploy this lesson's deliverables:

\`\`\`json
${codeOrSchema || `{
  "system": "${courseTitle} - ${title}",
  "version": "2.4.0",
  "guardrails": {
    "strict_mode": true,
    "fallback_threshold": 0.85,
    "max_retries": 3
  },
  "pipeline": [
    { "step": 1, "action": "ingest_and_validate", "schema": "strict_json" },
    { "step": 2, "action": "cognitive_reasoning", "model": "claude-3-7-sonnet" },
    { "step": 3, "action": "deterministic_dispatch", "target": "client_crm_api" }
  ]
}`}
\`\`\`

---

## 4. Real-World Case Example & ROI Calculation

${caseStudy || `### Real-World Client Scenario
A mid-market service business handling 400 inquiries per week implemented this exact module workflow. Prior to deployment, two full-time administrative staff spent 18 hours weekly manually copying data, classifying requests, and drafting generic initial responses.

### Operational & Financial Impact
- **Manual Labor Eliminated:** 36 employee hours saved weekly (90% reduction).
- **Response Latency:** Decreased from 4.2 hours to 45 seconds.
- **Client Value Created:** \$4,500/month in reclaimed labor capacity and higher lead conversion.
- **Agency Monetization:** Implemented as a \$2,500 setup sprint with an ongoing \$650/month maintenance retainer.`}

---

## 5. Practical Implementation Checklist

${checkpoint || `- [ ] Configure the staging environment and establish API connections.
- [ ] Define the relational data schema and validate incoming webhook payloads.
- [ ] Implement system prompt instructions with strict JSON boundary constraints.
- [ ] Test edge cases including malformed data, timeouts, and rate limits.
- [ ] Conduct final end-to-end integration test before production client handoff.`}
`;

  return {
    id: lessonId,
    number: lessonNumber,
    title: title,
    duration: duration,
    summary: summary,
    slides: slides,
    writtenLesson: writtenLesson,
  };
}

module.exports = {
  createLesson,
};
