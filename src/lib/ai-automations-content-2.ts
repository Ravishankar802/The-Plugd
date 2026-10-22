import { Lesson, Module } from "@/lib/playbooks-data";
import type { ExtendedLesson } from "./ai-automations-content-1";

// ==========================================
// MODULE 04: Automation 3 — Intelligent Document Processing & Financial Ingestion
// ==========================================
export const MODULE_04_LESSONS: ExtendedLesson[] = [
  {
    id: "04-1",
    number: "4.1",
    title: "The High-Ticket Document Problem: Invoices, POs & Compliance",
    duration: "11 min",
    summary:
      "Understand why manual document processing costs enterprises millions in payroll and errors, and why traditional OCR templates fail against unstructured variations.",
    learningObjective:
      "Audit an organization's paper and PDF document workflows to quantify data entry costs, error rates, and compliance risks.",
    takeaway:
      "Traditional template-based OCR breaks whenever an invoice format changes; multimodal LLMs understand document semantics regardless of layout.",
    slides: [
      {
        id: "s-0401-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 04 · LESSON 4.1",
        headline: "AUTOMATION 3: INTELLIGENT DOCUMENT PROCESSING",
        subheadline: "Eliminating manual data entry across invoices, bills of lading, contracts, and regulatory filings.",
      },
      {
        id: "s-0401-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "The average company spends $15 to $40 to manually process a single vendor invoice or complex PDF document.",
        subheadline: "Human accounting clerks spend up to 70% of their working hours re-typing numbers from PDFs into spreadsheets and ERPs.",
      },
      {
        id: "s-0401-3",
        order: 3,
        type: "COMPARISON",
        headline: "Legacy OCR vs Multimodal Document Intelligence",
        comparison: {
          leftTitle: "Legacy OCR (ABBYY, Tesseract)",
          leftItems: [
            "Requires rigid bounding box templates for every vendor",
            "Breaks immediately if a vendor moves the subtotal line",
            "Cannot extract tabular line items with multi-line text",
            "Requires manual programming for every new document type",
          ],
          rightTitle: "Multimodal AI (GPT-4o / Claude Vision)",
          rightItems: [
            "Zero template setup required; understands visual semantics",
            "Extracts complex tables, tax breakdowns, and discounts",
            "Handles rotated scans, mobile camera photos, and wrinkles",
            "Outputs strict typed JSON conforming to your database schema",
          ],
        },
      },
      {
        id: "s-0401-4",
        order: 4,
        type: "RECAP",
        headline: "The Commercial Value Thesis",
        recapPoints: [
          "Target mid-market businesses handling 500+ invoices or contracts per month.",
          "Demonstrate 90%+ time savings with near-zero manual transcription errors.",
          "Deliver automated two-way and three-way purchase order matching out of the box.",
        ],
      },
    ],
    writtenLesson: `# The High-Ticket Document Problem: Invoices, POs & Compliance

Accounts payable (AP) departments and logistics hubs are buried in unstructured PDF documents. Every supplier uses a distinct invoice layout, terms format, and tax nomenclature.

Historically, organizations attempted to solve this using **Legacy Template OCR** (Optical Character Recognition). These legacy systems required human engineers to draw bounding boxes around specific coordinates on the page. The moment a supplier refreshed their logo, added a promotional banner, or formatted dates as \`DD/MM/YYYY\` instead of \`MM/DD/YYYY\`, the entire template broke.

### The Multimodal LLM Paradigm Shift
Modern vision-capable foundation models (such as GPT-4o and Claude 3.5 Sonnet) do not rely on spatial pixel coordinates. They possess **spatial and semantic comprehension**:
- They recognize what an invoice number looks like, whether it appears in the top-right header, a floating text block, or a footer table.
- They understand complex tabular relationships, associating item descriptions with unit prices, quantity multipliers, and discounts across multiple pages.
- They can read messy mobile phone camera photos taken by delivery drivers on loading docks.

By offering a turnkey **Intelligent Document Processing (IDP) Pipeline**, you can charge $10,000 to $25,000 for the initial deployment, plus ongoing per-document or monthly retainer fees.`,
  },
  {
    id: "04-2",
    number: "4.2",
    title: "Multimodal Vision Architecture & Strict JSON Schema Enforcement",
    duration: "12 min",
    summary:
      "Design the extraction architecture: image pre-processing, resolution scaling, multi-page PDF decomposition, and Pydantic/Zod schema enforcement.",
    learningObjective:
      "Implement a robust document extraction pipeline that guarantees typed, error-free JSON outputs even from complex multi-page financial records.",
    takeaway:
      "Never accept raw text from an LLM in financial systems; always enforce typed JSON schemas with automated mathematical reconciliation checks.",
    slides: [
      {
        id: "s-0402-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 04 · LESSON 4.2",
        headline: "MULTIMODAL EXTRACTION ARCHITECTURE",
        subheadline: "Engineering strict type-safe pipelines from unstructured PDF pixels to normalized database rows.",
      },
      {
        id: "s-0402-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "The 4-Step Document Pipeline",
        pillars: [
          {
            badge: "STEP 1",
            title: "PDF Normalization & Rasterization",
            description: "Convert vector and scanned PDF pages into high-DPI (300 DPI) optimized PNG images.",
          },
          {
            badge: "STEP 2",
            title: "Vision Model Analysis",
            description: "Feed normalized images to vision model with strict JSON schema definitions for all fields.",
          },
          {
            badge: "STEP 3",
            title: "Deterministic Validation",
            description: "Run code verifying: Line Items Sum == Subtotal; Subtotal + Tax + Shipping == Total Amount.",
          },
          {
            badge: "STEP 4",
            title: "ERP & Database Write",
            description: "Insert validated records into QuickBooks, Xero, or PostgreSQL; route mismatches to human audit queue.",
          },
        ],
      },
      {
        id: "s-0402-3",
        order: 3,
        type: "CHECKLIST",
        headline: "Document Schema Verification Rules",
        checklist: [
          { label: "Vendor identification via tax ID / VAT number match", passed: true, note: "Prevents vendor spoofing or duplicate account creation" },
          { label: "Mathematical validation: sum(line items) == subtotal", passed: true, note: "Catches missing lines or hallucinated currency figures" },
          { label: "Currency normalization (e.g. converting EUR to USD if needed)", passed: true, note: "Standardizes ledger entries for accounting" },
        ],
      },
      {
        id: "s-0402-4",
        order: 4,
        type: "RECAP",
        headline: "Engineering Guardrails",
        recapPoints: [
          "Always process multi-page documents page-by-page or in chunks to prevent token limits.",
          "Preserve the original source document PDF URL in every database record for audit compliance.",
          "Flag confidence scores below 0.90 for human verification before posting to general ledger.",
        ],
      },
    ],
    writtenLesson: `# Multimodal Vision Architecture & Strict JSON Schema Enforcement

Financial documents require 100% precision. You cannot allow an LLM to hallucinate that a line item was $1,500 instead of $150.00.

### The Strict Extraction Schema
Using TypeScript and Zod (or Python Pydantic), define the exact structure of an invoice:

\`\`\`typescript
import { z } from "zod";

export const InvoiceLineItemSchema = z.object({
  description: z.string(),
  skuOrCode: z.string().optional(),
  quantity: z.number().positive(),
  unitPrice: z.number().nonnegative(),
  totalPrice: z.number().nonnegative(),
});

export const ExtractedInvoiceSchema = z.object({
  vendorName: z.string(),
  vendorTaxId: z.string().optional(),
  vendorAddress: z.string().optional(),
  invoiceNumber: z.string(),
  invoiceDate: z.string(), // ISO format YYYY-MM-DD
  dueDate: z.string().optional(),
  currency: z.string().default("USD"),
  lineItems: z.array(InvoiceLineItemSchema),
  subtotal: z.number().nonnegative(),
  taxAmount: z.number().nonnegative(),
  shippingAmount: z.number().default(0),
  totalAmount: z.number().positive(),
  paymentTerms: z.string().optional(),
  bankDetails: z.object({
    routingNumber: z.string().optional(),
    accountNumber: z.string().optional(),
    iban: z.string().optional(),
  }).optional(),
});
\`\`\`

### Deterministic Mathematical Reconciler
Once the LLM returns the structured JSON, run a deterministic validation script before writing to any database:

\`\`\`typescript
export function validateInvoiceMath(invoice: z.infer<typeof ExtractedInvoiceSchema>): { valid: boolean; error?: string } {
  // Calculate sum of line items
  const computedSubtotal = invoice.lineItems.reduce((acc, item) => acc + item.totalPrice, 0);
  
  // Check if line item math matches subtotal within 2 cents (rounding tolerance)
  if (Math.abs(computedSubtotal - invoice.subtotal) > 0.02) {
    return {
      valid: false,
      error: \`Line items sum (\${computedSubtotal}) does not equal subtotal (\${invoice.subtotal})\`,
    };
  }

  // Check subtotal + tax + shipping == total
  const computedTotal = invoice.subtotal + invoice.taxAmount + invoice.shippingAmount;
  if (Math.abs(computedTotal - invoice.totalAmount) > 0.02) {
    return {
      valid: false,
      error: \`Subtotal + Tax + Shipping (\${computedTotal}) does not match Total Amount (\${invoice.totalAmount})\`,
    };
  }

  return { valid: true };
}
\`\`\``,
  },
  {
    id: "04-3",
    number: "4.3",
    title: "Step-by-Step Build: Ingestion, Optical Parsing & Accounting Sync",
    duration: "12 min",
    summary:
      "Build the end-to-end processing pipeline: monitoring a designated inbox / S3 bucket, extracting fields via vision API, checking duplicate invoice numbers, and posting to accounting software.",
    learningObjective:
      "Construct a live production pipeline that automatically ingests email attachments, performs extraction, and writes accounting records to QuickBooks/Xero APIs.",
    takeaway:
      "Enterprise systems need idempotency: always check for duplicate invoice numbers and vendor IDs before creating bills.",
    slides: [
      {
        id: "s-0403-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 04 · LESSON 4.3",
        headline: "STEP-BY-STEP IDP PIPELINE BUILD",
        subheadline: "From inbox attachment capture to automated general ledger posting in QuickBooks/Xero.",
      },
      {
        id: "s-0403-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "The Complete Data Flow",
        pillars: [
          {
            badge: "STAGE 1",
            title: "Email & S3 Ingress",
            description: "Dedicated inbox (e.g. invoices@client.com) automatically transfers incoming PDF attachments to encrypted AWS S3 storage.",
          },
          {
            badge: "STAGE 2",
            title: "Extraction Lambda / Node Flow",
            description: "Dispatches high-res document images to vision endpoint; parses and enforces mathematical checks.",
          },
          {
            badge: "STAGE 3",
            title: "ERP Matching Logic",
            description: "Matches vendor name against existing vendor master list in accounting software.",
          },
          {
            badge: "STAGE 4",
            title: "Bill Creation & Archival",
            description: "Creates draft bill in QuickBooks/Xero and moves processed file to 'Archive/Approved' bucket.",
          },
        ],
      },
      {
        id: "s-0403-3",
        order: 3,
        type: "CHECKLIST",
        headline: "Security & Retention Checklist",
        checklist: [
          { label: "S3 Server-Side Encryption (SSE-KMS) enabled", passed: true, note: "Protects proprietary vendor pricing data" },
          { label: "Retention policy: raw files archived for 7 years for tax audits", passed: true, note: "Satisfies IRS and international statutory requirements" },
          { label: "Audit trail record saved with exact extraction timestamps", passed: true, note: "Provides transparent compliance records" },
        ],
      },
      {
        id: "s-0403-4",
        order: 4,
        type: "RECAP",
        headline: "Build Wrap-Up",
        recapPoints: [
          "Connect directly to client accounting APIs using OAuth 2.0 refresh tokens.",
          "Always create bills in 'Draft' or 'Pending Approval' status initially until client team builds confidence.",
          "Track extraction throughput and report weekly labor hours saved to the CFO.",
        ],
      },
    ],
    writtenLesson: `# Step-by-Step Build: Ingestion, Optical Parsing & Accounting Sync

In this lesson, we implement the end-to-end pipeline connecting email ingestion to the accounting general ledger.

### Ingestion Setup: Email to Cloud Storage
Most businesses receive invoices as PDF attachments sent to accounts payable emails.
1. Configure an email forwarder or Microsoft Graph / Google Workspace webhook watching \`invoices@clientdomain.com\`.
2. Extract all attachments ending in \`.pdf\`, \`.png\`, or \`.jpeg\`.
3. Generate a unique hash of the file bytes (SHA-256) and upload to AWS S3 or Supabase Storage:
\`\`\`
s3://company-invoices-vault/raw/2026/10/a8f94e2b_invoice.pdf
\`\`\`
4. Check whether this SHA-256 hash has already been processed in your PostgreSQL database. If it exists, immediately abort to prevent duplicate billing.

### ERP Synchronization via API
When pushing to QuickBooks Online, Xero, or NetSuite:
1. Query the **Vendor Endpoint** using the extracted \`vendorName\` and \`taxId\`.
2. If no exact match exists, query the vector store of vendor aliases (e.g. "Acme Corp LLC" vs "Acme Corporation").
3. Create a **Purchase Bill** linking each line item to the client's standard Chart of Accounts (COA) category (e.g. "Software Subscriptions", "Office Supplies", "Freight & Shipping").
4. Attach the permanent S3 PDF download link to the bill record so the client's internal auditors can inspect the original file with a single click.`,
  },
  {
    id: "04-4",
    number: "4.4",
    title: "Discrepancy Flags, Audit Trails & Human Verification UI",
    duration: "11 min",
    summary:
      "Build a sleek internal verification interface where human controllers review flagged anomalies, correct ambiguous fields, and train the system over time.",
    learningObjective:
      "Design and deploy an internal human-in-the-loop audit dashboard for rapid review of low-confidence documents.",
    takeaway:
      "A 95% automated system with a 30-second review screen for the remaining 5% is infinitely better than a 100% manual process.",
    slides: [
      {
        id: "s-0404-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 04 · LESSON 4.4",
        headline: "HUMAN AUDIT UI & COMPLIANCE",
        subheadline: "Providing controllers with side-by-side verification tools for rapid anomaly resolution.",
      },
      {
        id: "s-0404-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "The Verification Interface Blueprint",
        pillars: [
          {
            badge: "LEFT PANE",
            title: "Original Document Viewer",
            description: "High-resolution PDF viewer with zoom, rotation, and bounding highlight controls.",
          },
          {
            badge: "RIGHT PANE",
            title: "Structured Editable Form",
            description: "Pre-filled inputs with confidence indicators; flagged discrepancy fields highlighted in amber.",
          },
          {
            badge: "BOTTOM BAR",
            title: "One-Click Resolution Controls",
            description: "[Approve & Sync to ERP] [Reject to Vendor] [Request Re-scan].",
          },
        ],
      },
      {
        id: "s-0404-3",
        order: 3,
        type: "CHECKLIST",
        headline: "Audit Log Requirements",
        checklist: [
          { label: "Timestamp and user ID recorded for every human modification", passed: true, note: "Essential for financial and Sarbanes-Oxley audits" },
          { label: "Diff history showing original LLM extraction vs human corrected values", passed: true, note: "Used as fine-tuning dataset to improve future runs" },
          { label: "Automated vendor notification email template for rejected invoices", passed: true, note: "Explains missing purchase order numbers instantly" },
        ],
      },
      {
        id: "s-0404-4",
        order: 4,
        type: "RECAP",
        headline: "Module 4 Summary",
        recapPoints: [
          "Document extraction delivers immediate, tangible time savings to accounting and operations teams.",
          "A $10,000+ package includes the ingestion pipeline, ERP integration, and a clean verification dashboard.",
          "Offer ongoing maintenance retainers to support new document types and vendor formats.",
        ],
      },
    ],
    writtenLesson: `# Discrepancy Flags, Audit Trails & Human Verification UI

No enterprise finance director will allow an autonomous script to pay invoices without an audit trail. Building a lightweight, elegant **Human Verification Interface** bridges the gap between machine speed and human accountability.

### The Side-by-Side Review Experience
When the pipeline detects an anomaly (e.g., math mismatch, unknown vendor, or confidence score < 85%), it routes the record to the review queue:
- **Side-by-Side Display:** The left half of the screen displays the original PDF; the right half displays the extracted fields.
- **Visual Confidence Highlighting:** Fields with 99%+ certainty appear in neutral gray; fields with low certainty or math discrepancies glow with an amber warning border.
- **Rapid Keyboard Controls:** Accounting clerks can use \`Tab\` and \`Enter\` to verify fields in 15 seconds, compared to the 8 to 12 minutes required for manual transcription.

### Continuous Improvement Loop
Every time a human controller edits a field in the review dashboard, your system logs:
1. The raw cropped image of that region.
2. The initial LLM prediction.
3. The human ground-truth correction.

This structured dataset can be fed back into your prompt few-shot examples or used to fine-tune specialized extraction models, increasing the autonomous pass-through rate from 80% to 96% over a 90-day period.`,
  },
];

// ==========================================
// MODULE 05: Automation 4 — Autonomous Executive Reporting & Financial Synthesis
// ==========================================
export const MODULE_05_LESSONS: ExtendedLesson[] = [
  {
    id: "05-1",
    number: "5.1",
    title: "The Executive Time Drain: Manual Aggregation vs Real-Time Synthesis",
    duration: "10 min",
    summary:
      "Explore the hidden cost of leadership reporting: why CFOs, COOs, and business owners waste 15-20 hours every month cobbling together spreadsheets for board decks.",
    learningObjective:
      "Quantify the executive opportunity cost of manual business reporting and identify high-value data sources for autonomous aggregation.",
    takeaway:
      "Executives do not need more dashboards they never log into; they need proactive narrative briefings delivered directly to their inbox.",
    slides: [
      {
        id: "s-0501-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 05 · LESSON 5.1",
        headline: "AUTOMATION 4: EXECUTIVE REPORTING ENGINE",
        subheadline: "Replacing manual monthly spreadsheet scrambles with autonomous multi-source narrative briefings.",
      },
      {
        id: "s-0501-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "Leadership teams spend tens of thousands in executive hours assembling static PowerPoint reports from fragmented tools.",
        subheadline: "By the time the report is compiled on the 10th of the month, the financial data is already ten days out of date.",
      },
      {
        id: "s-0501-3",
        order: 3,
        type: "COMPARISON",
        headline: "Passive Dashboards vs Autonomous Briefings",
        comparison: {
          leftTitle: "Passive BI Dashboards (Tableau, Looker)",
          leftItems: [
            "Requires busy executives to remember logins and apply filters",
            "Displays raw charts with zero contextual explanation",
            "Fails to highlight *why* customer churn spiked last week",
            "Costly enterprise seat licenses ($80/user/mo)",
          ],
          rightTitle: "Autonomous Narrative Briefing",
          rightItems: [
            "Delivered automatically every Monday morning at 7:00 AM",
            "Synthesizes numbers into clear, prioritized executive prose",
            "Identifies hidden anomalies, correlations, and risks",
            "Includes actionable recommendations backed by data",
          ],
        },
      },
      {
        id: "s-0501-4",
        order: 4,
        type: "RECAP",
        headline: "Executive Reporting Value Metrics",
        recapPoints: [
          "Eliminate 15+ hours of monthly manual data pulling per department head.",
          "Enable proactive operational interventions before small problems become quarterly disasters.",
          "Position this automation as a 24/7 Virtual Chief of Staff for the C-Suite.",
        ],
      },
    ],
    writtenLesson: `# The Executive Time Drain: Manual Aggregation vs Real-Time Synthesis

Every business owner, CEO, and managing director knows the pain of "Board Prep Week" or the "End of Month Scramble." Department managers spend days exporting CSV files from Stripe, Shopify, Google Analytics, Salesforce, and their internal production database, trying to piece together what happened over the prior 30 days.

### The Failure of Traditional Dashboards
Companies have spent hundreds of thousands of dollars deploying Tableau, PowerBI, and Metabase dashboards, only to find that executives rarely log into them.
- Dashboards show *what* the metrics are, but they do not explain *why* they changed.
- They require manual interpretation, filtering, and cross-comparison.
- They are passive: if churn quietly doubles among a specific customer cohort, the dashboard does not ring an alarm.

### The Autonomous Executive Briefing
With an **Autonomous Executive Reporting & Financial Synthesis Engine**, you build an automated pipeline that:
1. Connects to the client’s core databases and APIs on a schedule.
2. Calculates variances across daily, weekly, and monthly intervals.
3. Uses an advanced reasoning model to analyze drivers behind the variances.
4. Generates a beautifully formatted PDF report and executive Slack digest delivered to leadership every Monday morning.`,
  },
  {
    id: "05-2",
    number: "5.2",
    title: "Data Pipeline: Read-Only SQL Replicas, Stripe, Shopify & GA4",
    duration: "11 min",
    summary:
      "Architect secure data ingress across disparate operational platforms: connecting to read-only SQL replicas, querying payment APIs, and aggregating web metrics into a unified data warehouse.",
    learningObjective:
      "Build secure data extraction connectors that extract financial and operational KPIs without impacting production database performance.",
    takeaway:
      "Never connect an analytical extraction pipeline to a primary write database; always use read-only replicas or analytical snapshots.",
    slides: [
      {
        id: "s-0502-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 05 · LESSON 5.2",
        headline: "DATA EXTRACTION & NORMALIZATION",
        subheadline: "Pulling operational metrics securely from SQL replicas, Stripe, Shopify, and CRM systems.",
      },
      {
        id: "s-0502-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "The Core Data Connectors",
        pillars: [
          {
            badge: "CONNECTOR 1",
            title: "Financial Ledger (Stripe / QuickBooks)",
            description: "Pulls Net Revenue, MRR, Refunds, Disputes, Churn, and Aging Accounts Receivable.",
          },
          {
            badge: "CONNECTOR 2",
            title: "Commerce & Operations (Shopify / ERP)",
            description: "Pulls Gross Merchandise Value, Units Shipped, Average Order Value, and Inventory Depletion.",
          },
          {
            badge: "CONNECTOR 3",
            title: "Marketing & Acquisition (GA4 / Ad Platforms)",
            description: "Pulls Blended Customer Acquisition Cost (CAC), Ad Spend, Conversion Rates, and Organic Traffic.",
          },
        ],
      },
      {
        id: "s-0502-3",
        order: 3,
        type: "CHECKLIST",
        headline: "Security Architecture Rules",
        checklist: [
          { label: "Dedicated read-only database credentials with restricted table views", passed: true, note: "Guarantees zero risk of accidental data mutation" },
          { label: "Restricted API keys with minimal scopes (read_charges, read_customers)", passed: true, note: "Adheres to enterprise least-privilege standards" },
          { label: "End-to-end TLS encryption on all data transfers", passed: true, note: "Protects sensitive corporate financial figures" },
        ],
      },
      {
        id: "s-0502-4",
        order: 4,
        type: "RECAP",
        headline: "Ingestion Best Practices",
        recapPoints: [
          "Normalize all currencies and timezone offsets to UTC before running comparative math.",
          "Store historical weekly snapshots in a dedicated analytical table for longitudinal trend analysis.",
          "Implement health check alerts if any upstream API credentials expire.",
        ],
      },
    ],
    writtenLesson: `# Data Pipeline: Read-Only SQL Replicas, Stripe, Shopify & GA4

Reliable executive reporting begins with clean, dependable data ingestion. You must establish secure, read-only connections to the client’s operational systems.

### 1. Connecting to Relational Databases Safely
Never run analytical aggregation queries on the client’s primary production database during peak business hours. A heavy \`COUNT(*)\` or multi-table \`JOIN\` across millions of historical transactions can lock tables and degrade user performance.
- Request a **Read-Only Replica** endpoint.
- Alternatively, run extraction queries at 2:00 AM UTC on an isolated background worker.
- Restrict database user permissions strictly to \`SELECT\` on specific analytical views.

### 2. Normalizing Financial Data
Different platforms calculate revenue using conflicting definitions:
- **Stripe:** Reports Gross Volume before refunds and processing fees.
- **Shopify:** Reports Sales inclusive of shipping fees and local sales taxes.
- **QuickBooks:** Reports Accrual Revenue based on invoiced dates.

During your discovery phase, document the client's official definitions for:
- **Net Revenue:** (Gross Payments - Refunds - Disputes).
- **Active MRR / ARR:** (Total recurring subscription contracts active on the final day of the period).
- **Blended CAC:** (Total ad spend across Google + Meta / New paying customers).`,
  },
  {
    id: "05-3",
    number: "5.3",
    title: "Building the Analytical Engine: Metric Variance & Trend Reasoning",
    duration: "11 min",
    summary:
      "Develop the reasoning prompt chain: feeding normalized financial metrics into reasoning models to detect anomalies, quantify week-over-week trends, and isolate root causes.",
    learningObjective:
      "Formulate prompt architectures that analyze mathematical variations and synthesize actionable executive commentary.",
    takeaway:
      "Feed the model computed mathematical deltas (+14.2%, -$4,200), not raw uncalculated spreadsheets; let the LLM focus on synthesis, not arithmetic.",
    slides: [
      {
        id: "s-0503-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 05 · LESSON 5.3",
        headline: "THE ANALYTICAL REASONING ENGINE",
        subheadline: "Transforming raw calculated metric variances into high-level strategic intelligence.",
      },
      {
        id: "s-0503-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "The 3-Stage Analytical Synthesis",
        pillars: [
          {
            badge: "STAGE 1",
            title: "Deterministic Delta Computation",
            description: "Code computes exact % changes, standard deviations, and historical benchmarks.",
          },
          {
            badge: "STAGE 2",
            title: "Anomaly Isolation",
            description: "Filters metrics where deviation exceeds thresholds (e.g. churn > +15% WoW or CAC > +20%).",
          },
          {
            badge: "STAGE 3",
            title: "Executive Strategic Synthesis",
            description: "LLM contextualizes the numbers into: Highlights, Concerns, Root Causes, and Action Recommendations.",
          },
        ],
      },
      {
        id: "s-0503-3",
        order: 3,
        type: "BEFORE_AFTER",
        headline: "Raw Data vs Synthesized Intelligence",
        beforeAfter: {
          beforeLabel: "Standard Automated Email",
          beforeText: "'Weekly Report: Revenue was $42,100. New users: 412. Churn: 28. Refunds: $1,420.' (Requires executive to figure out what it means)",
          afterLabel: "Executive AI Synthesis",
          afterText: "'Revenue increased +8.4% WoW driven by Enterprise plan upgrades (+24%). However, refund volume surged 3.2x following the v2.4 mobile app release, with 82% of refund notes citing checkout bugs. Recommended action: Prioritize mobile checkout hotfix immediately.'",
        },
      },
      {
        id: "s-0503-4",
        order: 4,
        type: "RECAP",
        headline: "Prompt Engineering Principles",
        recapPoints: [
          "Always provide historical benchmarks so the model knows what is 'normal'.",
          "Explicitly constrain the tone: direct, objective, data-backed, and devoid of fluff.",
          "Structure outputs with clear Markdown headers for automated PDF rendering.",
        ],
      },
    ],
    writtenLesson: `# Building the Analytical Engine: Metric Variance & Trend Reasoning

The secret to generating executive-level insights is **never asking the LLM to do the underlying math**. Calculate all deltas, growth rates, and standard deviations in deterministic TypeScript/Python first, and pass the pre-computed metrics into the model.

### The Synthesis Prompt Architecture

\`\`\`typescript
export function buildExecutiveSynthesisPrompt(metrics: {
  currentWeek: Record<string, number>;
  priorWeek: Record<string, number>;
  variancePercentage: Record<string, number>;
  topAnomalies: string[];
  customerFeedbackTags: { tag: string; count: number }[];
}) {
  return \`
You are an elite Chief of Staff and Financial Analyst preparing the Weekly Executive Briefing for the CEO and Leadership Team.

Synthesize the following operational and financial performance data. Be direct, authoritative, and concise. Do not use filler or introductory pleasantries.

COMPUTED METRIC DELTAS:
- Net Revenue: $\${metrics.currentWeek.revenue.toLocaleString()} (\${metrics.variancePercentage.revenue > 0 ? "+" : ""}\${metrics.variancePercentage.revenue}%)
- New MRR: $\${metrics.currentWeek.newMrr.toLocaleString()} (\${metrics.variancePercentage.newMrr > 0 ? "+" : ""}\${metrics.variancePercentage.newMrr}%)
- Blended CAC: $\${metrics.currentWeek.cac} (\${metrics.variancePercentage.cac > 0 ? "+" : ""}\${metrics.variancePercentage.cac}%)
- Churn Rate: \${metrics.currentWeek.churnRate}% (Prior: \${metrics.priorWeek.churnRate}%)

DETECTED OPERATIONAL ANOMALIES:
\${metrics.topAnomalies.map(a => \`- \${a}\`).join("\\n")}

PRIMARY CUSTOMER SUPPORT / CANCEL REASONS:
\${metrics.customerFeedbackTags.map(f => \`- \${f.tag}: \${f.count} instances\`).join("\\n")}

FORMAT YOUR EXECUTIVE BRIEFING IN EXACTLY 4 SECTIONS:
1. EXECUTIVE SUMMARY (3 bullet points: bottom-line financial health)
2. KEY DRIVERS & OUTPERFORMERS (What worked and why)
3. THREATS & OPERATIONAL CONCERNS (Specific risks detected in the numbers)
4. RECOMMENDED 7-DAY ACTION ITEMS (2-3 concrete moves for leadership)
\`;
}
\`\`\``,
  },
  {
    id: "05-4",
    number: "5.4",
    title: "Scheduled Delivery: Automated PDF Generation & Executive Briefings",
    duration: "11 min",
    summary:
      "Automate the final delivery pipeline: generating branded PDF executive summaries with dynamic charts, and dispatching multi-channel briefings via email and Slack.",
    learningObjective:
      "Build a scheduled publication engine that renders HTML/Tailwind templates into crisp PDF documents and delivers automated executive summaries.",
    takeaway:
      "Executive reporting must meet leaders where they live: in their primary email inbox and private executive Slack channels.",
    slides: [
      {
        id: "s-0504-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 05 · LESSON 5.4",
        headline: "SCHEDULED MULTI-CHANNEL DELIVERY",
        subheadline: "Rendering branded executive PDF documents and delivering synchronized Slack digests.",
      },
      {
        id: "s-0504-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "The Automated Delivery Pipeline",
        pillars: [
          {
            badge: "CRON 06:00",
            title: "Data Pull & Aggregation",
            description: "Extracts final weekly data snapshots from all APIs and computes deltas.",
          },
          {
            badge: "CRON 06:15",
            title: "AI Synthesis & Formatting",
            description: "Generates narrative insights and formats into structured JSON presentation model.",
          },
          {
            badge: "CRON 06:30",
            title: "Headless PDF Rendering",
            description: "Puppeteer / Playwright renders Tailwind HTML template into a high-DPI executive PDF.",
          },
          {
            badge: "CRON 07:00",
            title: "Multi-Channel Dispatch",
            description: "Emails PDF to CEO/Board; posts 3-bullet summary with PDF attachment to #leadership Slack.",
          },
        ],
      },
      {
        id: "s-0504-3",
        order: 3,
        type: "CHECKLIST",
        headline: "Delivery Reliability Checklist",
        checklist: [
          { label: "Cron trigger configured in timezone of client headquarters", passed: true, note: "Arrives before Monday morning standup" },
          { label: "Fallback notification to developer if data extraction fails", passed: true, note: "Prevents silent missing reports" },
          { label: "PDF styling matches client corporate brand typography and colors", passed: true, note: "Board-ready visual polish" },
        ],
      },
      {
        id: "s-0504-4",
        order: 4,
        type: "RECAP",
        headline: "Module 5 Wrap-Up",
        recapPoints: [
          "Executive reporting automations command high prices because they save the time of the highest-paid people in the company.",
          "Deliver tangible physical artifacts: clean PDFs and concise Slack summaries.",
          "Upsell quarterly strategy modules and custom data connector expansions.",
        ],
      },
    ],
    writtenLesson: `# Scheduled Delivery: Automated PDF Generation & Executive Briefings

The final deliverable of an executive reporting engine is the **Executive Briefing Packet**. To ensure the deliverable looks like a $10,000 corporate asset, render it as a beautifully branded PDF document alongside a synchronized Slack digest.

### Generating Branded PDFs with Headless Chrome
The most maintainable approach to generating publication-grade PDF documents is rendering a React / Tailwind CSS template using headless Chromium (Puppeteer or Playwright):

\`\`\`typescript
import puppeteer from "puppeteer";

export async function generateExecutiveReportPdf(htmlContent: string): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });
  
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
  });

  await browser.close();
  return Buffer.from(pdfBuffer);
}
\`\`\`

### The Multi-Channel Dispatch Strategy
Deliver the briefing across two channels simultaneously:
1. **Direct Email to C-Suite:** An email containing the key narrative summary in the body, with the full high-resolution PDF attached for review on iPads or desktop.
2. **Slack / Microsoft Teams Channel:** An interactive card posted to \`#exec-briefing\` at 7:00 AM every Monday with the 3 biggest wins, the single biggest risk to watch, and a 1-click download link.`,
  },
];

// ==========================================
// MODULE 06: Automation 5 — Conversational Voice AI & Appointment Booking Agent
// ==========================================
export const MODULE_06_LESSONS: ExtendedLesson[] = [
  {
    id: "06-1",
    number: "6.1",
    title: "Voice Opportunity: Recapturing High-Intent Missed Inbound Calls",
    duration: "11 min",
    summary:
      "Explore the high-ticket economics of inbound phone calls for local services, medical practices, law firms, and home contractors: why missed calls cost thousands in lost revenue.",
    learningObjective:
      "Analyze the commercial value of telephone inbound leads and quantify the revenue recovery potential of 24/7 conversational voice automation.",
    takeaway:
      "Over 60% of people who call a local service business hang up without leaving a voicemail if nobody answers; they immediately call the next competitor on Google.",
    slides: [
      {
        id: "s-0601-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 06 · LESSON 6.1",
        headline: "AUTOMATION 5: CONVERSATIONAL VOICE AI",
        subheadline: "Deploying ultra-realistic voice agents that answer inbound phone calls and book appointments 24/7.",
      },
      {
        id: "s-0601-2",
        order: 2,
        type: "BIG_STATEMENT",
        headline: "In high-ticket local services, a single missed inbound phone call represents $1,000 to $15,000 in lost customer revenue.",
        subheadline: "Dental clinics, HVAC companies, law firms, and luxury auto repair shops miss between 20% and 40% of their calls during peak hours and weekends.",
      },
      {
        id: "s-0601-3",
        order: 3,
        type: "COMPARISON",
        headline: "Traditional Phone Trees vs Conversational Voice AI",
        comparison: {
          leftTitle: "Traditional IVR (Press 1 for Sales)",
          leftItems: [
            "Robotic, robotic menus that callers despise",
            "Cannot answer specific questions about services",
            "Forces callers to leave a voicemail that is rarely checked",
            "High hang-up rate (>50% abandonment)",
          ],
          rightTitle: "Conversational Voice AI Agent",
          rightItems: [
            "Speaks with human warmth, natural pacing, and zero delay",
            "Answers questions regarding pricing, location, and hours",
            "Queries live calendar API and books appointments in call",
            "Transcribes call and syncs audio recording to CRM instantly",
          ],
        },
      },
      {
        id: "s-0601-4",
        order: 4,
        type: "RECAP",
        headline: "The Voice Commercial Value Thesis",
        recapPoints: [
          "Target businesses with high average ticket sizes ($1,000+ per client).",
          "Guarantee 100% call answer rates including lunch hours, weekends, and holidays.",
          "Charge an initial $10,000 build fee plus a $1,500/mo retainer + per-minute telephony pass-through.",
        ],
      },
    ],
    writtenLesson: `# Voice Opportunity: Recapturing High-Intent Missed Inbound Calls

When a homeowner’s air conditioning breaks in July, or a commercial warehouse has a pipe burst, they do not fill out a web contact form and wait 24 hours. **They pick up the phone and call.**

If that call rings to an answering machine or a generic phone tree, **67% of callers hang up within 10 seconds** and call the next service provider on Google. For a roofing company or an HVAC contractor where the average job is $8,500, missing just three calls a week costs the business over **$1,300,000 in lost gross revenue annually**.

### The Breakthrough in Natural Voice AI
Until recently, telephone bots sounded unmistakably artificial. Today, the convergence of three technologies makes conversational voice agents virtually indistinguishable from human receptionists:
1. **Ultra-Fast Speech-to-Text (STT):** Deepgram Nova-2 transcribes audio streams in under 150 milliseconds.
2. **Low-Latency LLM Inference:** Groq-hosted open weights and OpenAI GPT-4o-mini generate tokens in under 200 milliseconds.
3. **Hyper-Realistic Neural Text-to-Speech (TTS):** Cartesia Sonic and ElevenLabs Turbo synthesize human speech with emotional cadence, breath pauses, and natural tone in under 200 milliseconds.

Total end-to-end latency: **under 600 milliseconds**—well below the human conversational pause threshold.`,
  },
  {
    id: "06-2",
    number: "6.2",
    title: "Ultra-Low-Latency Stack: Twilio, LiveKit, Deepgram & Cartesia",
    duration: "13 min",
    summary:
      "Architect the modern voice pipeline: connecting Twilio telephony to LiveKit WebSockets, streaming bi-directional audio to Deepgram STT and Cartesia TTS, and managing token streams.",
    learningObjective:
      "Diagram and assemble an end-to-end real-time audio pipeline achieving sub-700ms round-trip latency.",
    takeaway:
      "In voice AI, latency is everything; a brilliant response delivered with 2 seconds of delay feels robotic, while a simple response delivered in 400ms feels magical.",
    slides: [
      {
        id: "s-0602-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 06 · LESSON 6.2",
        headline: "THE REAL-TIME VOICE PIPELINE STACK",
        subheadline: "Architecting sub-600ms bi-directional audio streaming for lifelike phone conversations.",
      },
      {
        id: "s-0602-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "The 4-Node Audio Streaming Loop",
        pillars: [
          {
            badge: "NODE 1",
            title: "Telephony (Twilio / Telnyx)",
            description: "Receives PSTN phone call and establishes bi-directional 8kHz/16kHz audio WebSocket to your server.",
          },
          {
            badge: "NODE 2",
            title: "Streaming STT (Deepgram Nova-2)",
            description: "Transcribes caller speech into text streams in real time with endpointing detection.",
          },
          {
            badge: "NODE 3",
            title: "Reasoning LLM (Groq / GPT-4o-mini)",
            description: "Evaluates conversational state, executes function tools, and streams response tokens.",
          },
          {
            badge: "NODE 4",
            title: "Streaming TTS (Cartesia / ElevenLabs)",
            description: "Synthesizes incoming text tokens directly into audio chunks streamed back to caller's ear.",
          },
        ],
      },
      {
        id: "s-0602-3",
        order: 3,
        type: "CHECKLIST",
        headline: "Voice Latency Budget (Target: < 700ms)",
        checklist: [
          { label: "PSTN Network & WebSocket Ingress: ~100ms", passed: true, note: "Network transit delay" },
          { label: "Deepgram Streaming STT Finalization: ~150ms", passed: true, note: "End-of-speech detection" },
          { label: "LLM First Token Generation (Groq/OpenAI): ~180ms", passed: true, note: "Streaming token start" },
          { label: "Cartesia TTS First Audio Chunk: ~120ms", passed: true, note: "Neural audio synthesis" },
        ],
      },
      {
        id: "s-0602-4",
        order: 4,
        type: "RECAP",
        headline: "Stack Engineering Rules",
        recapPoints: [
          "Never wait for the LLM to complete its entire response before starting TTS synthesis.",
          "Stream sentences or clauses as soon as punctuation (comma, period) appears.",
          "Use LiveKit Agents framework or Retell/Vapi infrastructure for rapid deployment.",
        ],
      },
    ],
    writtenLesson: `# Ultra-Low-Latency Stack: Twilio, LiveKit, Deepgram & Cartesia

In voice applications, human conversation operates on strict temporal psychology. If a pause extends past **800 milliseconds**, the caller perceives the delay as awkward or robotic. If it extends past **1,500 milliseconds**, the caller will say, *"Hello? Are you there?"*, interrupting the bot’s response.

### The Streaming Audio Architecture
To maintain sub-600ms latency, the system must stream audio continuously rather than processing discrete files:

\`\`\`
Caller Phone
    │ (PSTN Call)
    ▼
[ Twilio Media Stream WebSocket ]
    │ (Raw PCM Audio Chunks)
    ▼
[ Deepgram Nova-2 Streaming STT ]
    │ (Real-Time Text Stream)
    ▼
[ Fast Reasoning Engine (Groq / GPT-4o-mini) ]
    │ (Streaming Token Stream: "Yes, we have an opening tomorrow at...")
    ▼
[ Cartesia Sonic Streaming TTS ]
    │ (Binary Audio Packets)
    ▼
[ Twilio Media Stream WebSocket ]
    │ (PSTN Audio Out)
    ▼
Caller Ear
\`\`\`

### Choosing Your Implementation Layer
You have two primary ways to deploy this stack:
1. **Turnkey Voice Frameworks (Vapi / Retell AI):** Handles the telephony orchestration, WebSocket scaling, and audio buffering out of the box. You configure the assistant prompt, select your voices, and attach your webhook tools. **Recommended for your first 3 client deployments.**
2. **Open-Source LiveKit Agents (Python):** Offers complete control over the WebSocket infrastructure, self-hosted deployment, and zero platform markup fees. Recommended for enterprise clients with custom on-premises security requirements.`,
  },
  {
    id: "06-3",
    number: "6.3",
    title: "State Machine, Real-time Calendar Tool Calling & Intent Interruption",
    duration: "12 min",
    summary:
      "Program complex voice behavior: conversational state machines, live calendar availability queries during the call, and instant interruption handling when the caller speaks.",
    learningObjective:
      "Implement real-time tool calling and interruption handling (barge-in) in voice agents without losing conversational state.",
    takeaway:
      "Barge-in capability is mandatory: if the caller interrupts, the agent must immediately stop speaking and listen.",
    slides: [
      {
        id: "s-0603-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 06 · LESSON 6.3",
        headline: "VOICE STATE MACHINES & BARGE-IN",
        subheadline: "Engineering natural conversational turn-taking, tool execution, and instantaneous speech interruption.",
      },
      {
        id: "s-0603-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "The Voice Turn-Taking Protocol",
        pillars: [
          {
            badge: "FEATURE 1",
            title: "Voice Activity Detection (VAD)",
            description: "Silero VAD detects user vocalization within 30ms, immediately cutting off outbound audio playback.",
          },
          {
            badge: "FEATURE 2",
            title: "Filler Audio Management",
            description: "Plays subtle natural verbal fillers ('Let me check that opening for you...') while executing calendar APIs.",
          },
          {
            badge: "FEATURE 3",
            title: "Multi-Slot Entity Extraction",
            description: "Extracts Caller Name, Phone Number, Service Needed, and Preferred Time across natural conversation.",
          },
        ],
      },
      {
        id: "s-0603-3",
        order: 3,
        type: "SCENARIO",
        headline: "Handling an Interruption Gracefully",
        scenario: {
          situation: "The voice agent is reciting three available appointment slots, and the caller interrupts: 'Actually, do you have anything on Friday morning instead?'",
          instinctiveReaction: "Keep playing the queued audio until the sentence completes, talking over the caller.",
          calibratedMove: "VAD immediately halts audio buffer playback, clears outbound audio queue, captures the new utterance, and queries Friday morning availability.",
          whyItWorks: "Replicates natural human conversational etiquette and prevents caller frustration.",
        },
      },
      {
        id: "s-0603-4",
        order: 4,
        type: "RECAP",
        headline: "Tool Calling in Voice Rules",
        recapPoints: [
          "Keep tool execution latency under 400ms—cache calendar slots in memory.",
          "Always confirm extracted details: 'Just to confirm, that was Sarah at 555-0192 for Friday at 10 AM, correct?'",
          "If a calendar write fails, offer to transfer the caller immediately.",
        ],
      },
    ],
    writtenLesson: `# State Machine, Real-time Calendar Tool Calling & Intent Interruption

A voice agent cannot afford dead silence while it executes an external API request. If an API call takes 800ms, the caller assumes the connection was dropped.

### The "Filler Audio" Strategy
When your voice agent invokes a tool (such as \`check_calendar_availability\`), instruct the model to emit a conversational bridge phrase before triggering the tool:
- *"Let me pull up tomorrow's schedule for you right now..."*
- *"One moment while I check Dr. Miller's calendar..."*

This bridge sentence is immediately synthesized into speech while the backend API executes asynchronously. By the time the sentence finishes playing, the calendar data has returned and the agent can seamlessly announce the available slots.

### The Mechanics of Barge-In (Interruption Handling)
Humans frequently interrupt receptionists to clarify a detail or provide a shortcut. Your voice architecture must support **Barge-In**:
1. When **Voice Activity Detection (VAD)** detects user decibel power above the noise floor while the bot is speaking, it triggers an \`interrupt\` event.
2. The orchestrator immediately sends a \`clear_buffer\` command to the Twilio WebSocket.
3. The model stops generating the rest of the prior sentence, discards unplayed audio, and updates conversational context with what the caller just said.`,
  },
  {
    id: "06-4",
    number: "6.4",
    title: "Telephony Compliance, Call Logging & Post-Call CRM Handshake",
    duration: "12 min",
    summary:
      "Wrap the voice system in enterprise compliance: call recording disclosures, TCPA regulations, automated audio transcription archiving, and post-call CRM synchronization.",
    learningObjective:
      "Implement post-call processing workflows that transcribe audio, log sentiment and action items into CRMs, and dispatch SMS confirmations.",
    takeaway:
      "The value of a phone call does not end when the call hangs up; the automatic logging and instant SMS confirmation lock in the appointment.",
    slides: [
      {
        id: "s-0604-1",
        order: 1,
        type: "TITLE",
        eyebrow: "MODULE 06 · LESSON 6.4",
        headline: "COMPLIANCE & POST-CALL AUTOMATION",
        subheadline: "Ensuring regulatory safety, CRM synchronization, and automated SMS confirmation handshakes.",
      },
      {
        id: "s-0604-2",
        order: 2,
        type: "FRAMEWORK",
        headline: "The Post-Call Orchestration Flow",
        pillars: [
          {
            badge: "STAGE 1",
            title: "Recording & Transcript Storage",
            description: "Encrypted S3 storage of dual-channel audio recording and full JSON speaker-diarized transcript.",
          },
          {
            badge: "STAGE 2",
            title: "CRM Synchronization",
            description: "Creates/updates contact in HubSpot/Salesforce with audio recording link and appointment details.",
          },
          {
            badge: "STAGE 3",
            title: "Instant SMS Confirmation",
            description: "Sends Twilio SMS to caller: 'Hi Sarah, your appointment with Acme Dental is confirmed for Friday at 10 AM.'",
          },
        ],
      },
      {
        id: "s-0604-3",
        order: 3,
        type: "CHECKLIST",
        headline: "Telephony Legal Compliance Checklist",
        checklist: [
          { label: "Call recording disclosure played if recording in two-party consent states", passed: true, note: "'This call may be recorded for quality assurance'" },
          { label: "TCPA compliance: no outbound marketing calls without explicit written opt-in", passed: true, note: "Protects client from statutory fines" },
          { label: "Emergency 911 / Medical triage disclosure configured", passed: true, note: "Immediately instructs callers in acute emergencies to dial 911" },
        ],
      },
      {
        id: "s-0604-4",
        order: 4,
        type: "RECAP",
        headline: "Module 6 Wrap-Up",
        recapPoints: [
          "Voice AI provides the most jaw-dropping live demonstration you can show a client.",
          "Target local service businesses, clinics, and professional firms losing high-ticket inbound calls.",
          "Package setup at $10,000+ with ongoing per-minute margins and monthly retainer.",
        ],
      },
    ],
    writtenLesson: `# Telephony Compliance, Call Logging & Post-Call CRM Handshake

Building a high-ticket voice automation requires bulletproof compliance and post-call follow-through.

### 1. Legal Compliance & Recording Disclosures
Depending on your client's operational jurisdiction (e.g., California, Florida, Massachusetts, Germany), wiretapping laws require **Two-Party Consent** for recording phone conversations.
- **Inbound Disclosure Prompt:** Ensure your assistant opens with:
  > *"Thank you for calling Acme Dental. This call is recorded for quality assurance. How can I help you today?"*
- **TCPA Guardrails:** Never use automated voice systems for cold outbound telemarketing without verified prior express written consent. Focus your high-ticket voice solutions on **Inbound Customer Care & Inbound Appointment Scheduling**.

---

### 2. The Post-Call Automation Pipeline
The moment the call disconnects (Twilio \`CallCompleted\` webhook), your orchestrator executes four asynchronous actions:
1. **Diarized Transcript Archival:** Generate speaker labels (\`Agent\` vs \`Caller\`) with exact timestamps and persist to your secure database.
2. **CRM Activity Creation:** Log a completed "Phone Call" activity in the client’s CRM (HubSpot, Salesforce, Jobber, ServiceTitan) containing the 3-sentence call summary, audio recording URL, and caller sentiment.
3. **Calendar Booking Finalization:** If an appointment was reserved during the call, confirm the calendar invite and notify the assigned staff member.
4. **Instant SMS Confirmation Handshake:** Dispatch a personalized SMS to the caller:
   > *"Hi [Name], your appointment with Dr. Miller is confirmed for Friday, Oct 24 at 10:00 AM. If you need to make changes, simply reply to this text. See you soon!"*

This automated SMS locks in the commitment, slashing appointment no-show rates by over **50%**.`,
  },
];
