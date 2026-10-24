const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function generateWrittenLesson({ courseTitle, moduleTitle, moduleNumber, lessonNumber, lessonTitle, lessonSummary, slides }) {
  const slidePoints = [];
  const slideTakeaways = [];
  
  if (slides && Array.isArray(slides)) {
    slides.forEach(s => {
      if (s.bulletPoints) slidePoints.push(...s.bulletPoints);
      if (s.takeaway) slideTakeaways.push(s.takeaway);
    });
  }

  const primaryTakeaway = slideTakeaways[0] || "Focus on delivering measurable operational ROI rather than selling raw technology.";
  
  return `# ${lessonNumber} ${lessonTitle}

> **Module ${moduleNumber}: ${moduleTitle}**  
> *Core Playbook: ${courseTitle}*

---

## Executive Overview & Commercial Opportunity

In modern B2B operations, companies struggle not with a shortage of artificial intelligence tools, but with an absence of reliable, predictable execution systems. Many business owners have experimented with basic ChatGPT prompts or isolated chatbots, only to find that generic solutions fail when confronted with unstructured real-world data, legacy software, and nuanced human workflows.

${lessonSummary}

For agencies and independent operators, this gap represents an immense commercial opportunity. When you position yourself not as a generic prompt engineer, but as a systems architect who eliminates costly operational bottlenecks, client conversations shift immediately from price sensitivity to business value and return on investment.

---

## 1. Architectural Foundations & Core Mechanics

To build an implementation that functions autonomously in production, you must understand the underlying mechanics that govern this workflow. Traditional automation architectures fail because they are brittle: if an incoming input deviates slightly from expected fields, the entire pipeline halts.

${slidePoints.length > 0 ? `### Key System Pillars\n\n` + slidePoints.map(p => `- **${p.split(':')[0]}:** ${p.split(':').slice(1).join(':').trim() || p}`).join('\n\n') : `### Foundational Architecture\n\n- **Autonomous Data Ingestion:** Capturing unstructured data from email webhooks, portal forms, or CRM triggers.\n- **Cognitive Evaluation Layer:** Leveraging frontier models to classify, parse, and validate data against business schemas.\n- **Deterministic Execution:** Calling external APIs and databases with structured JSON payloads.\n- **Verification Loop:** Verifying outputs against compliance and business logic before triggering client-facing actions.`}

${primaryTakeaway ? `\n> **Core Production Rule:** ${primaryTakeaway}\n` : ''}

---

## 2. Step-by-Step System Implementation

Deploying this capability for a paying commercial client follows a rigorous 4-phase delivery framework designed to guarantee zero downtime and immediate operational relief.

### Phase 1: Environment Setup & Data Schemas
Establish the operational sandbox and configure the relational schema. Define strict field types, required foreign keys, and status pipelines. Never build directly in the client's live production environment without isolated staging webhooks and version-controlled schemas.

### Phase 2: Logic Design & Prompt Engineering
Construct the cognitive instruction set. Define system prompts that explicitly state role boundaries, tool availability, required JSON output structures, and fallback behaviors. Implement confidence scoring: if model certainty falls below 85%, route the task to a human-in-the-loop review queue rather than executing unchecked.

### Phase 3: Integration & Error Handling
Wire the execution orchestrator (such as Make.com or n8n) to external APIs. Implement exponential backoff for rate limits, configure instant Slack/email alerting for execution failures, and store full payload logs in an audit table for post-execution traceability.

### Phase 4: Client Deployment & User Training
Deploy the system into the client's workspace. Configure permission tiers so administrative staff can oversee operations without the ability to modify backend logic. Provide an intuitive interface (such as Airtable Interfaces or Softr) and conduct a recorded 30-minute operational walkthrough.

---

## 3. Commercial Packaging & Unit Economics

Selling this solution effectively requires anchoring your fee against the cost of alternative solutions—primarily full-time payroll or specialized enterprise software.

| Delivery Model | Price Threshold | Scope of Work | Target Client |
| :--- | :--- | :--- | :--- |
| **Rapid Setup Sprint** | $1,500 – $3,500 one-time | Complete workflow build, schema design, and integration | Businesses with $500K–$3M annual revenue |
| **Recurring Management Retainer** | $500 – $1,250 / month | 24/7 uptime monitoring, prompt maintenance, and monthly updates | Established firms scaling operations |
| **Full Operations Transformation** | $5,000+ setup + $2,000/mo | Multi-department automation across CRM, fulfillment, and finance | Mid-market enterprises with 20+ staff |

### ROI Justification for the Client
Consider an office administrator earning $45,000 annually ($3,750/month) spending 15 hours per week manually processing paperwork, emails, and customer data. If this automated workflow reclaims those 15 hours, you are saving the client over $1,400 in direct labor costs every single month, plus eliminating human error and cutting turnaround times from 24 hours to 30 seconds. A $2,500 setup fee pays for itself in less than 60 days.

---

## 4. Production Checklist & Action Sprint

Before considering this lesson complete and advancing to the next module, execute the following operational sprint:

- [ ] **Define the Schema:** Map out every required input, processing variable, and output field.
- [ ] **Construct the System Prompt:** Author clear role instructions, boundary constraints, and JSON schemas.
- [ ] **Implement Error Fallbacks:** Ensure unexpected inputs trigger human alerts rather than silent crashes.
- [ ] **Calculate the Client ROI:** Formulate the exact dollar savings or revenue upside to present during client proposals.
`;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const result = ts.transpileModule(content, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
  
  const m = { exports: {} };
  const fn = new Function('module', 'exports', 'require', result.outputText);
  fn(m, m.exports, () => ({}));
  
  const keys = Object.keys(m.exports);
  const courseKey = keys.find(k => k.endsWith('_COURSE'));
  const course = m.exports[courseKey];
  
  if (!course) {
    console.error(`Course not found in ${filePath}`);
    return;
  }
  
  console.log(`Processing course: "${course.title}" (${course.modules.length} modules)`);
  
  let replacedCount = 0;
  
  course.modules.forEach(module => {
    module.lessons.forEach(lesson => {
      // Check if lesson has short or missing written guide
      const existing = lesson.writtenLesson || lesson.writtenContent || '';
      if (existing.length < 500) {
        const fullMarkdown = generateWrittenLesson({
          courseTitle: course.title,
          moduleTitle: module.title,
          moduleNumber: module.number,
          lessonNumber: lesson.number,
          lessonTitle: lesson.title,
          lessonSummary: lesson.summary,
          slides: lesson.slides
        });
        
        // Escape backticks in markdown
        const escapedMarkdown = fullMarkdown.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
        
        // Regex to find the lesson block and its writtenContent line
        const lessonIdPattern = new RegExp(`(id:\\s*"${lesson.id}"[\\s\\S]*?)(writtenContent:\\s*(?:"[^"]*"|\`[\\s\\S]*?\`))`);
        const match = content.match(lessonIdPattern);
        if (match) {
          const replacement = `${match[1]}writtenLesson: \`\n${escapedMarkdown}\n\`, \n        writtenContent: \`\n${escapedMarkdown}\n\``;
          content = content.replace(match[0], replacement);
          replacedCount++;
        } else {
          console.warn(`Could not match lesson id: ${lesson.id} in ${filePath}`);
        }
      }
    });
  });
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}: replaced ${replacedCount} lessons with full written guides.`);
}

const files = [
  'src/lib/playbooks/agent-solutions-data.ts',
  'src/lib/playbooks/freelance-income-data.ts',
  'src/lib/playbooks/agency-blueprint-data.ts',
  'src/lib/playbooks/smb-services-data.ts',
  'src/lib/playbooks/micro-saas-data.ts',
  'src/lib/playbooks/local-chatbots-data.ts',
];

files.forEach(processFile);
console.log('All files processed successfully.');
