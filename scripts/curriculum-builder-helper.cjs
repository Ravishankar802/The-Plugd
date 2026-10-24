/**
 * Enhanced Curriculum Builder Helper
 * Generates deeply informative, multi-slide presentations and comprehensive written lessons
 * strictly adhering to the 6-7 modules / exactly 4 lessons per module standard.
 */

function createDeepLesson({
  modNum,
  lesNum,
  title,
  duration = "15m",
  summary,
  // Educational Content
  conceptualFoundations, // { whyItMatters, coreMechanics, architecturalDecisions }
  bulletPointsSlide1,    // 4 detailed points for Slide 1
  takeawaySlide1,
  implementationPhases,  // [ { phase: "Phase 1: ...", steps: [...] }, ... ]
  bulletPointsSlide2,    // 4 detailed implementation points for Slide 2
  takeawaySlide2,
  workedCalculations,    // { scenario, mathTableOrBreakdown, roiFormula }
  bulletPointsSlide3,    // 4 diagnostic & quality points for Slide 3
  takeawaySlide3,
  codeOrSchema,          // Production code, JSON schema, or prompt template
  failureAnalysisTable,  // Array of { failureMode, cause, remedy }
  deliverableExercise,   // { task, acceptanceCriteria: [...] }
  keyTakeaways,          // Array of 3-4 bullet strings
  courseTitle,
  modTitle,
}) {
  const lessonId = `${String(modNum).padStart(2, "0")}-${lesNum}`;
  const lessonNumber = `${modNum}.${lesNum}`;

  // Slide 1: Conceptual Foundations & System Architecture
  const slide1 = {
    id: `s-${String(modNum).padStart(2, "0")}${lesNum}-1`,
    order: 1,
    type: "LIST",
    eyebrow: `MODULE ${String(modNum).padStart(2, "0")} · LESSON ${lessonNumber}`,
    headline: title,
    subheadline: summary,
    title: title,
    subtitle: summary,
    bulletPoints: bulletPointsSlide1 || [
      "Architectural Blueprint: Defining clear system boundaries, data contracts, and deterministic state transitions.",
      "Commercial Rationale: Eliminating high-friction manual labor to deliver measurable operational ROI for clients.",
      "Core Mechanism: Orchestrating cognitive LLM reasoning with deterministic tool calling and database persistence.",
      "Strategic Advantage: Packaging repeatable workflows that deliver value in days rather than months.",
    ],
    takeaway: takeawaySlide1 || "Master the architectural foundations before writing automation logic to prevent brittle deployments.",
  };

  // Slide 2: Step-by-Step Implementation, Calculations & Decision Metrics
  const slide2 = {
    id: `s-${String(modNum).padStart(2, "0")}${lesNum}-2`,
    order: 2,
    type: "LIST",
    eyebrow: `EXECUTION & ECONOMICS · LESSON ${lessonNumber}`,
    headline: `${title}: Implementation & Unit Economics`,
    subheadline: "Tactical deployment sequence, quantitative cost-benefit models, and decision criteria.",
    title: `${title}: Implementation & Unit Economics`,
    subtitle: "Tactical deployment sequence, quantitative cost-benefit models, and decision criteria.",
    bulletPoints: bulletPointsSlide2 || [
      "Phase 1 Environment Setup: Provisioning isolated staging tables, API access keys, and webhook endpoints.",
      "Phase 2 Schema Validation: Enforcing strict Pydantic/Zod JSON data contracts at the API boundary.",
      "Unit Economics: Pricing setup sprints at $2,500-$4,500 with ongoing $750-$1,500/mo monitoring retainers.",
      "ROI Metric: Delivering 10x value by recovering 15+ weekly administrative hours per deployed workflow.",
    ],
    takeaway: takeawaySlide2 || "Always anchor implementation fees to quantifiable labor recovery and verified operational savings.",
  };

  // Slide 3: Troubleshooting, Failure Modes & Quality Assurance
  const slide3 = {
    id: `s-${String(modNum).padStart(2, "0")}${lesNum}-3`,
    order: 3,
    type: "LIST",
    eyebrow: `DIAGNOSTICS & AUDIT · LESSON ${lessonNumber}`,
    headline: `${title}: Failure Analysis & Quality Gate`,
    subheadline: "Common engineering edge cases, diagnostic remedies, and deliverable verification criteria.",
    title: `${title}: Failure Analysis & Quality Gate`,
    subtitle: "Common engineering edge cases, diagnostic remedies, and deliverable verification criteria.",
    bulletPoints: bulletPointsSlide3 || [
      "Edge-Case Detection: Handling payload null fields, malformed PDF scans, and API timeout rate limits gracefully.",
      "Human-in-the-Loop Routing: Automatically diverting low-confidence outputs (<85%) to an exception review queue.",
      "Telemetry & Alerting: Instant SMS/Discord webhooks alerting engineering within 60 seconds of any 500 error.",
      "Acceptance Gate: Executing a 20-payload test gauntlet before transferring live system ownership to the client.",
    ],
    takeaway: takeawaySlide3 || "Automated error interception and human-in-the-loop fallback turn fragile automations into enterprise software.",
  };

  const slides = [slide1, slide2, slide3];

  // Format Implementation Phases for Written Lesson
  let implementationMarkdown = "";
  if (Array.isArray(implementationPhases)) {
    implementationMarkdown = implementationPhases
      .map(
        (p) => `### ${p.phase}\n\n${p.steps.map((s, idx) => `${idx + 1}. **${s.title}:** ${s.detail}`).join("\n\n")}`
      )
      .join("\n\n");
  } else {
    implementationMarkdown = `### Phase 1: Environment Configuration & Access Scaffolding
1. **Workspace Initialization:** Provision an isolated staging environment in Make.com, Airtable, or Supabase. Never build or test directly within client production tables.
2. **API Credential Handshake:** Configure restricted-scope API tokens with granular read/write permissions. Store credentials exclusively in encrypted environment vaults.
3. **Webhook Endpoint Handshake:** Establish TLS-encrypted webhook listener endpoints and verify handshakes using SHA-256 HMAC signature validation.

### Phase 2: Schema Modeling & Deterministic Validation
1. **Strict Data Contract Authoring:** Define relational schemas using Zod or Pydantic models. Enforce non-nullable constraints on core operational fields (e.g. customer phone, invoice total).
2. **Pre-Processing Normalization:** Strip markdown formatting ticks, sanitize phone numbers into E.164 format, and standardize dates into ISO 8601 strings prior to downstream ingestion.
3. **Guardrail Calibration:** Set LLM temperature strictly between 0.0 and 0.2 to enforce deterministic output, and mandate structured JSON output schemas.

### Phase 3: Error Directives & Fallback Architecture
1. **Exponential Backoff Retries:** Configure automatic retry loops for HTTP 429 (Rate Limit) and 503 (Service Unavailable) status codes with randomized jitter.
2. **Exception Routing:** Route extraction confidence scores below 85% to an exception staging table for manual operator review rather than dispatching corrupted data.
3. **Real-Time Telemetry Alerts:** Configure instant webhook alerts to Slack or SMS if any pipeline step experiences an unhandled failure.

### Phase 4: Production Deployment & Acceptance Hand-Off
1. **End-to-End Stress Testing:** Execute a 20-sample validation gauntlet containing diverse edge cases, missing fields, and varied formats.
2. **Staff Operator Runbook:** Deliver an annotated 1-page standard operating procedure (SOP) and record a 5-minute video walkthrough for client team members.
3. **Final Acceptance Sign-Off:** Execute the milestone acceptance document and initiate the ongoing monthly monitoring retainer.`;
  }

  // Format Failure Analysis Table for Written Lesson
  let failureTableMarkdown = "";
  if (Array.isArray(failureAnalysisTable)) {
    failureTableMarkdown = `| Failure Mode | Root Cause | Technical & Operational Remedy |
|---|---|---|
${failureAnalysisTable.map((f) => `| **${f.failureMode}** | ${f.cause} | ${f.remedy} |`).join("\n")}`;
  } else {
    failureTableMarkdown = `| Failure Mode | Root Cause | Technical & Operational Remedy |
|---|---|---|
| **API Rate Limit Exceeded (HTTP 429)** | High burst traffic exceeding tier thresholds | Implement sliding-window rate limiters with Upstash Redis and configure exponential backoff retries. |
| **Hallucinated JSON Syntax** | LLM outputting conversational prefix or unescaped quotes | Use native API structured outputs (\`response_format: { type: "json_object" }\`) and validate via Zod \`safeParse()\`. |
| **Malformed Document Input** | Blurry photo scans or non-standard invoice layouts | Deploy multimodal vision preprocessing with confidence threshold gating; route low-confidence scans to human review. |
| **Silent Webhook Dropping** | Downstream CRM API downtime or expired OAuth tokens | Log all raw inbound payloads to an immutable audit table in Postgres/Airtable before triggering asynchronous dispatch. |`;
  }

  // Format Worked Calculations
  let calculationsMarkdown = "";
  if (workedCalculations) {
    calculationsMarkdown = `### Practical Scenario & Assumptions
${workedCalculations.scenario}

### Quantitative Breakdown & Economic Model
${workedCalculations.mathTableOrBreakdown}

### ROI & Client Value Formula
${workedCalculations.roiFormula}`;
  } else {
    calculationsMarkdown = `### Practical Scenario & Assumptions
A mid-market service company processing 250 customer transactions per month incurs significant manual overhead. Administrative staff spend approximately 18 hours weekly manually copying data, verifying line items, and updating internal spreadsheets.

### Quantitative Breakdown & Economic Model
| Metric | Manual Legacy Workflow | Automated System Deployment | Net Economic Delta |
|---|---|---|---|
| **Weekly Staff Labor** | 18.0 hours | 1.5 hours (exceptions only) | **-16.5 hours / week** |
| **Fully Burdened Labor Cost ($35/hr)** | $630.00 / week ($2,520/mo) | $52.50 / week ($210/mo) | **+$2,310 / month saved** |
| **Processing Latency** | 4 to 24 hours | 45 to 90 seconds | **99% speed improvement** |
| **Data Entry Error Rate** | 6.8% (17 errors / mo) | <0.4% (with schema validation) | **94% error reduction** |

### ROI & Client Value Formula
$$\\text{Annual Client Savings} = (16.5 \\text{ hrs/wk} \\times \$35/\\text{hr} \\times 52 \\text{ wks}) + \\text{Error Recovery Value (\$4,200)} = \$34,230$$
Deploying this system as a **$3,500 initial implementation sprint** with a **$750/month maintenance retainer** yields a **384% first-year return on investment (ROI)** for the client.`;
  }

  // Format Code or Schema
  const codeBlock = codeOrSchema || `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "${title.replace(/[^a-zA-Z0-9 ]/g, '')}",
  "type": "object",
  "required": ["transaction_id", "status", "timestamp", "metrics"],
  "properties": {
    "transaction_id": { "type": "string", "format": "uuid" },
    "status": { "type": "string", "enum": ["COMPLETED", "FLAGGED_FOR_REVIEW", "FAILED"] },
    "timestamp": { "type": "string", "format": "date-time" },
    "confidence_score": { "type": "number", "minimum": 0.0, "maximum": 1.0 },
    "metrics": {
      "type": "object",
      "required": ["processing_latency_ms", "tokens_consumed", "estimated_cost_usd"],
      "properties": {
        "processing_latency_ms": { "type": "integer" },
        "tokens_consumed": { "type": "integer" },
        "estimated_cost_usd": { "type": "number" }
      }
    }
  }
}`;

  // Format Deliverables Checklist
  let exerciseMarkdown = "";
  if (deliverableExercise) {
    exerciseMarkdown = `### Implementation Objective
${deliverableExercise.task}

### Acceptance & Verification Criteria
${deliverableExercise.acceptanceCriteria.map((c) => `- [ ] ${c}`).join("\n")}`;
  } else {
    exerciseMarkdown = `### Implementation Objective
Construct and deploy the verified lesson architecture in an isolated sandbox environment, executing a complete end-to-end integration test with sample commercial data.

### Acceptance & Verification Criteria
- [ ] Staging database tables provisioned with strict field typing and foreign key constraints.
- [ ] Inbound webhook listener authenticated via TLS and cryptographically verified headers.
- [ ] System prompt instructions calibrated with zero temperature and Zod/JSON schema output controls.
- [ ] Error handler configured with automatic retry loops and instant alert webhooks.
- [ ] End-to-end test payload processed in under 90 seconds with 100% schema compliance.`;
  }

  // Format Takeaways
  const takeawaysList = keyTakeaways || [
    "Always enforce deterministic data schemas at the API boundary to prevent downstream pipeline crashes.",
    "Price implementations around quantifiable business labor recovery rather than commodity hourly rates.",
    "Automate exception alerting so human operators only intervene on low-confidence anomalies.",
    "Secure recurring monthly retainers by providing ongoing telemetry monitoring and schema adaptation.",
  ];

  // Deep Written Lesson Content (>2,500 characters)
  const writtenLesson = `# ${lessonNumber} ${title}

> **Module ${String(modNum).padStart(2, "0")}: ${modTitle}**  
> *Core Playbook: ${courseTitle}*

---

## Executive Overview & Commercial Opportunity

In modern commercial operations, enterprise and mid-market organizations struggle not with a shortage of generic software tools, but with an absence of reliable, predictable execution architecture. While amateur operators attempt to solve business challenges with brittle prompt engineering or disconnected chatbots, high-earning systems architects engineer deterministic workflows that interface directly with operational databases, validate schemas, and run silently in the background.

${summary}

${conceptualFoundations?.whyItMatters || "The commercial value of this capability lies in operational certainty. When an organization can rely on an autonomous pipeline to process customer inquiries, parse complex documents, or dispatch critical data without human latency or data-entry errors, the operational efficiency dividend directly improves net margins."}

---

## 1. Technical Foundations & Architectural Design

Understanding the structural mechanics of this workflow is essential for building systems that survive real-world edge cases. A robust production architecture must decouple event ingestion, cognitive transformation, and downstream dispatching.

${conceptualFoundations?.coreMechanics || "Deterministic system design requires enforcing strict typing at the boundary, parsing and normalizing incoming webhooks prior to LLM reasoning, and using structured JSON tool definitions. By constraining model temperature between 0.0 and 0.2, hallucinations are virtually eliminated across high-throughput production cycles."}

### Architectural Decision Matrix

| Architectural Approach | Latency Profile | Fault Tolerance | Implementation Complexity | Recommended Use Case |
|---|---|---|---|---|
| **Direct Synchronous API Call** | Sub-second (200-800ms) | Low (Client connection times out on failure) | Minimal | Low-stakes interactive UI lookups |
| **Asynchronous Webhook Queue** | Near real-time (1-3s) | High (Dead-letter queues & retries) | Moderate | Production B2B transaction processing |
| **Batch Scheduled ETL Poll** | High latency (Hourly/Daily) | Extremely High (Bulk reconciliation) | Moderate | Financial ledger sync & weekly reporting |
| **Autonomous Multi-Agent Loop** | Variable (5-30s) | High with Human-in-the-Loop | Advanced | Complex multi-source research & triage |

> **Core Architectural Rule:** ${slide1.takeaway}

---

## 2. Step-by-Step Implementation Framework

Follow this structured deployment sequence to configure, test, and release this capability into client operations with zero downtime.

${implementationMarkdown}

---

## 3. Quantitative Economics & Financial Value Model

Every high-ticket B2B service must be anchored in transparent mathematical economics. By demonstrating measurable labor recovery and margin expansion, price resistance is eliminated during commercial negotiations.

${calculationsMarkdown}

---

## 4. Production Code & Technical Specification

Deploy the following production-validated schema and configuration template to implement the core mechanics of this lesson:

\`\`\`json
${codeBlock}
\`\`\`

---

## 5. Failure Analysis & Diagnostic Troubleshooting

In mission-critical business systems, understanding failure modes before they occur in production is what distinguishes senior consultants from commodity freelancers.

${failureTableMarkdown}

---

## 6. Practical Implementation Exercise & Deliverables

${exerciseMarkdown}

---

## 7. Key Actionable Takeaways

${takeawaysList.map((t, idx) => `${idx + 1}. **${t.split(':')[0] || 'Rule'}:** ${t.split(':').slice(1).join(':').trim() || t}`).join("\n\n")}
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
  createDeepLesson,
};
