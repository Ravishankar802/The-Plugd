const courseTitle = "Build a Micro-SaaS With AI in 7 Days Instead of Spending Months Coding";
const courseId = "ai-businesses-07";
const courseSlug = "build-a-micro-saas-with-ai-in-7-days-instead-of-spending-months-coding";

const modulesData = [
  {
    "num": 1,
    "id": "module-01",
    "title": "Day 1 — Problem Validation, Wireframing & Scope Containment",
    "description": "Validate expensive B2B pain points within 24 hours, enforce ruthless MVP scope boundaries, and lock in the rapid architecture.",
    "duration": "60m",
    "lessons": [
      {
        "lesNum": 1,
        "title": "The Micro-SaaS Paradigm & 24-Hour B2B Problem Discovery",
        "duration": "15m",
        "summary": "Identify narrow, high-urgency B2B problems where businesses already pay for clumsy workarounds or manual labor.",
        "bulletPoints": [
          "The Micro-SaaS Edge: Solving one specific workflow 10x better than bloated enterprise software suites.",
          "Validation Mining: Searching Reddit, G2 1-star reviews, and trade forums where businesses explicitly complain about existing tools.",
          "Willingness to Pay Signal: Verifying that prospects currently hire virtual assistants or spend 5+ hours weekly on the problem.",
          "The 24-Hour Validation Sprint: Testing proposition clarity with 10 cold outreach messages before writing a single line of code."
        ],
        "takeaway": "Never build software looking for a problem. Find where businesses are already losing money and automate that exact pain point."
      },
      {
        "lesNum": 2,
        "title": "Ruthless MVP Scoping: The 1-Core-Action Rule & Excalidraw Wireframing",
        "duration": "15m",
        "summary": "Strip away non-essential features and design a streamlined 3-screen user journey focused on delivering immediate time-to-value.",
        "bulletPoints": [
          "The 1-Core-Action Rule: Limiting your V1 product to a single primary user input and a single magical output.",
          "Cutting Feature Creep: Deferring team permissions, dark mode, and complex settings until after initial revenue.",
          "Rapid Excalidraw Wireframing: Sketching the Landing Page, Auth Gate, and Core App Dashboard in under 90 minutes.",
          "Defining Time-to-Value: Ensuring a new user experiences the core utility of the app within 60 seconds of registration."
        ],
        "takeaway": "Your MVP is not a smaller version of a large product; it is the absolute simplest vehicle that solves the core problem."
      },
      {
        "lesNum": 3,
        "title": "The Speed-Optimized Modern Stack: Next.js 15, Tailwind & Supabase",
        "duration": "15m",
        "summary": "Establish an opinionated, high-velocity tech stack designed for rapid development, built-in security, and low hosting overhead.",
        "bulletPoints": [
          "Next.js 15 App Router: Leveraging Server Actions and React Server Components for minimal boilerplate and instant data mutations.",
          "Tailwind CSS & Shadcn UI: Assembling polished, accessible, production-grade interfaces using copy-paste headless components.",
          "Supabase as Backend: Instant PostgreSQL, built-in authentication, database webhooks, and automatic REST/GraphQL endpoints.",
          "Vercel Deployment Pipeline: Zero-configuration Git-based CI/CD with instant preview branches and global edge network delivery."
        ],
        "takeaway": "A standardized tech stack eliminates architectural hesitation and lets you focus 100% of your energy on the core AI feature."
      },
      {
        "lesNum": 4,
        "title": "AI Coding Workflows: Cursor Rules, Copilot & Day 1 Milestone Lock",
        "duration": "15m",
        "summary": "Configure AI pair-programming assistants with project-specific rules, schemas, and design constraints to 5x coding speed.",
        "bulletPoints": [
          "Cursor .cursorrules Configuration: Feeding project tech stack, conventions, and database schemas directly to the AI model.",
          "Context-Aware Prompting: Referencing documentation files (@docs) and database types to generate hallucination-free React components.",
          "Prompt-Driven Component Building: Generating form validation, state management, and API clients in seconds.",
          "Day 1 Milestone Audit: Freezing product specifications and creating repository scaffolding before starting Day 2 implementation."
        ],
        "takeaway": "Configuring Cursor rules upfront turns an AI code assistant into a senior engineer who knows your exact architecture."
      }
    ]
  },
  {
    "num": 2,
    "id": "module-02",
    "title": "Day 2 — Full-Stack Scaffolding & Database Architecture",
    "description": "Scaffold the Next.js application, configure PostgreSQL schemas in Supabase, and enforce rock-solid Row Level Security.",
    "duration": "60m",
    "lessons": [
      {
        "lesNum": 1,
        "title": "Next.js 15 App Scaffolding, TypeScript & Shadcn UI Theming",
        "duration": "15m",
        "summary": "Initialize the production Next.js 15 project, install Tailwind utilities, and configure a cohesive design system.",
        "bulletPoints": [
          "Clean Next.js Initialization: Scaffolding with TypeScript, ESLint, Tailwind CSS, and App Router directory structure.",
          "Shadcn UI Installation: Adding core UI primitives including Button, Dialog, DropdownMenu, Card, and Input components.",
          "Global Theme Customization: Configuring color tokens, typography scales, and subtle border radius values for a modern aesthetic.",
          "Project Structure Standards: Organizing server actions, database helpers, hooks, and UI components into maintainable directories."
        ],
        "takeaway": "A clean component foundation ensures your UI looks enterprise-ready from day one without wasting hours on custom CSS."
      },
      {
        "lesNum": 2,
        "title": "Supabase Postgres Architecture: Relational Data Modeling & Enums",
        "duration": "15m",
        "summary": "Design normalized database tables for users, subscriptions, credits, and AI-generated assets with foreign key constraints.",
        "bulletPoints": [
          "Core Schema Architecture: Modeling users, subscriptions, usage_ledger, and projects tables in PostgreSQL.",
          "Postgres Enums & Check Constraints: Enforcing strict data integrity for subscription tiers (free, pro, enterprise) and task statuses.",
          "Automated Timestamp Triggers: Utilizing Postgres functions to automatically maintain created_at and updated_at fields.",
          "Cascading Deletes: Ensuring user-generated data is cleanly purged or archived when accounts are deleted."
        ],
        "takeaway": "Spend time designing your schema correctly on Day 2. A clean relational model makes every subsequent feature easy to build."
      },
      {
        "lesNum": 3,
        "title": "Row Level Security (RLS) Policies & Data Isolation",
        "duration": "15m",
        "summary": "Implement ironclad database security policies ensuring users can only read, write, and delete their own private data.",
        "bulletPoints": [
          "The Supabase Security Model: Why client-side queries are completely safe only when RLS is enabled on every table.",
          "Crafting RLS Policies: Writing SQL expressions using auth.uid() to restrict SELECT, INSERT, UPDATE, and DELETE operations.",
          "Admin Bypass Mechanisms: Using Supabase service_role keys strictly within secure Next.js Server Actions for elevated mutations.",
          "Testing RLS Boundaries: Simulating cross-user unauthorized access attempts to verify zero data leakage."
        ],
        "takeaway": "Never ship a database without RLS enabled. It is your primary defense against multi-tenant data breaches."
      },
      {
        "lesNum": 4,
        "title": "End-to-End Type Safety: Auto-Generating TypeScript Types & Verification",
        "duration": "15m",
        "summary": "Generate TypeScript definitions directly from your live database schema to guarantee compile-time type safety across your app.",
        "bulletPoints": [
          "Supabase CLI Type Generation: Running supabase gen types typescript to create a single source of truth for database models.",
          "Typed Server Actions: Typing server inputs and database returns to catch schema mismatches during compilation.",
          "Zod Form Validation: Pairing client-side React Hook Form validation with server-side Zod schemas for total input sanitization.",
          "Day 2 Milestone Certification: Verifying that all CRUD operations execute flawlessly against the secured Supabase database."
        ],
        "takeaway": "Auto-generated types eliminate an entire class of runtime bugs and provide instant autocomplete across your full stack."
      }
    ]
  },
  {
    "num": 3,
    "id": "module-03",
    "title": "Day 3 — LLM Orchestration, Prompt Engineering & Streaming APIs",
    "description": "Integrate frontier AI models, enforce deterministic structured outputs with Zod, and deliver real-time streaming interfaces.",
    "duration": "60m",
    "lessons": [
      {
        "lesNum": 1,
        "title": "Frontier LLM Selection & Token Economics: Claude 3.5 Sonnet vs GPT-4o",
        "duration": "15m",
        "summary": "Evaluate frontier models for reasoning quality, latency, token costs, and structured JSON reliability to maximize gross margins.",
        "bulletPoints": [
          "Model Comparison: Claude 3.5 Sonnet for superior coding and nuanced reasoning vs GPT-4o for ultra-fast conversational latency.",
          "Token Economics & Gross Margins: Calculating per-request API costs ($0.003-$0.02) to ensure a 90%+ software margin on subscription plans.",
          "Prompt Caching Strategies: Utilizing Anthropic and OpenAI prompt caching to slash input token costs by up to 90% on large system prompts.",
          "Fallback Routing: Designing multi-provider failover logic if primary LLM APIs experience rate limits or downtime."
        ],
        "takeaway": "Keep token costs under 10% of subscription revenue by caching system prompts and choosing the right model for each task."
      },
      {
        "lesNum": 2,
        "title": "Deterministic JSON Generation with Pydantic & Zod Schemas",
        "duration": "15m",
        "summary": "Force LLM responses into strict, validated JSON structures to prevent UI crashes and ensure flawless downstream parsing.",
        "bulletPoints": [
          "The Hallucinated JSON Problem: Why free-text LLM generation breaks frontend components and parsing pipelines.",
          "OpenAI & Anthropic Structured Outputs: Passing JSON Schema definitions to force strict schema adherence at the decoding layer.",
          "Zod Runtime Parsing: Parsing raw LLM responses through Zod schemas with automated self-healing retry prompts on validation errors.",
          "Extracting Complex Nested Data: Structuring schemas for multi-step outputs, tables, and categorized analytical reports."
        ],
        "takeaway": "Never parse LLM output with regex or raw JSON.parse. Enforce strict JSON schema guarantees at the API boundary."
      },
      {
        "lesNum": 3,
        "title": "Real-Time Streaming Responses with Vercel AI SDK & SSE",
        "duration": "15m",
        "summary": "Implement Server-Sent Events (SSE) streaming so users see tokens appear instantly instead of staring at blank loading spinners.",
        "bulletPoints": [
          "Perceived Latency Psychology: Why streaming an immediate response feels 5x faster than waiting 8 seconds for a complete payload.",
          "Vercel AI SDK Core: Utilizing streamText and useCompletion / useChat hooks for effortless streaming state management.",
          "Server Action Streaming: Piping OpenAI / Anthropic streams directly through Next.js App Router edge routes.",
          "Handling Stream Interruptions: Gracefully catching client abort signals and saving partial generations to the database."
        ],
        "takeaway": "Instant streaming transforms an AI application from sluggish to magical. It is mandatory for premium Micro-SaaS UX."
      },
      {
        "lesNum": 4,
        "title": "Multimodal Parsing (PDFs/Images), Token Caching & Error Guardrails",
        "duration": "15m",
        "summary": "Process client-uploaded documents and images, protect against prompt injection, and gracefully recover from API errors.",
        "bulletPoints": [
          "Multimodal File Processing: Passing user-uploaded PDFs and screenshots into Claude 3.5 Sonnet Vision for instant extraction.",
          "Token Budgeting Guardrails: Enforcing maximum input size limits and truncating context windows to prevent runaway API billing.",
          "Prompt Injection Defenses: Sanitizing user inputs with XML tags and system prompt boundary delimiters to prevent jailbreaks.",
          "Day 3 Milestone Verification: Stress-testing the core AI feature with 20 varied inputs to verify 100% output reliability."
        ],
        "takeaway": "Defend your AI pipeline against abusive inputs and runaway token usage with hard token caps and defensive system prompts."
      }
    ]
  },
  {
    "num": 4,
    "id": "module-04",
    "title": "Day 4 — Authentication, Multi-Tenancy & Usage Metering",
    "description": "Implement seamless social authentication, user profile provisioning, credit metering, and workspace permissions.",
    "duration": "60m",
    "lessons": [
      {
        "lesNum": 1,
        "title": "Supabase Auth with Next.js Server Components & Middleware Guards",
        "duration": "15m",
        "summary": "Configure passwordless magic links, Google OAuth, and Next.js middleware route protection for private dashboard routes.",
        "bulletPoints": [
          "SSR-Compatible Authentication: Utilizing @supabase/ssr to seamlessly handle auth cookies across Server Components and Client Components.",
          "Next.js Middleware Gatekeeper: Protecting /dashboard and /app routes with lightning-fast edge redirection for unauthenticated visitors.",
          "Google & GitHub Social OAuth: Enabling 1-click social logins to slash signup friction by up to 50%.",
          "Secure Session Refreshing: Automatically refreshing expired auth tokens in middleware to prevent unexpected user logouts."
        ],
        "takeaway": "Authentication should be frictionless for legitimate users and airtight against unauthorized requests."
      },
      {
        "lesNum": 2,
        "title": "Automated User Profile Provisioning via Database Triggers",
        "duration": "15m",
        "summary": "Use PostgreSQL triggers to instantly create user profile records and assign starter trial credits upon user registration.",
        "bulletPoints": [
          "The Disconnected Auth Problem: Why creating profiles in client code causes race conditions and orphaned accounts.",
          "PostgreSQL on_auth_user_created Trigger: Writing an automated SQL trigger that fires instantly when a user confirms their email.",
          "Assigning Trial Credits: Automatically populating the user usage_ledger with 10 free generations upon account initialization.",
          "Populating Default Preferences: Seeding user settings, default workspaces, and notification preferences automatically."
        ],
        "takeaway": "Database triggers guarantee that every new user has a perfectly initialized profile and starter credits without code race conditions."
      },
      {
        "lesNum": 3,
        "title": "Credit-Based Usage Metering & Pre-Flight Token Gates",
        "duration": "15m",
        "summary": "Build a bulletproof credit consumption engine that intercepts zero-credit requests and prompts users to upgrade.",
        "bulletPoints": [
          "Credit System Architecture: Decoupling raw LLM token costs into intuitive user-facing credits (e.g. 1 generation = 1 credit).",
          "Atomic Credit Deductions: Utilizing Postgres functions to atomically decrement user credits and prevent double-spend race conditions.",
          "Pre-Flight Balance Check: Halting execution in Server Actions before firing expensive LLM API calls if credit balance is zero.",
          "Low-Balance UI Warnings: Displaying persistent credit counters and upgrade modal prompts when balance drops below 20%."
        ],
        "takeaway": "Atomic credit checks protect your API budget. Never generate an AI response without first verifying available credits."
      },
      {
        "lesNum": 4,
        "title": "Multi-Tenant Workspaces, Team Seats & Document History UI",
        "duration": "15m",
        "summary": "Create the primary user dashboard, document history archive, and multi-user workspace sharing capabilities.",
        "bulletPoints": [
          "Document Library Architecture: Storing all generated outputs in PostgreSQL with full-text search and tagging capabilities.",
          "Optimistic UI Updates: Updating the frontend document list immediately while the database write finishes in the background.",
          "Multi-Tenant Team Invitations: Allowing paying users to invite collaborators with read-only or editor role permissions.",
          "Day 4 Milestone Review: Verifying that user registration, credit deduction, and generation history work seamlessly end-to-end."
        ],
        "takeaway": "A clean document history gives users a reason to return daily, creating strong product stickiness and low churn."
      }
    ]
  },
  {
    "num": 5,
    "id": "module-05",
    "title": "Day 5 — Stripe Subscriptions, Checkout & Webhook Reconciliation",
    "description": "Connect Stripe Billing, build checkout sessions with Next.js Server Actions, and handle webhooks with idempotent reconciliation.",
    "duration": "60m",
    "lessons": [
      {
        "lesNum": 1,
        "title": "Stripe Billing Architecture: Tiered Pricing, Usage Records & Customer Portals",
        "duration": "15m",
        "summary": "Configure recurring subscription products, price IDs, and self-service customer billing management in the Stripe Dashboard.",
        "bulletPoints": [
          "SaaS Pricing Structure: Setting up Starter ($19/mo), Pro ($49/mo), and Agency ($99/mo) recurring subscription products.",
          "Annual Discount Incentives: Offering 2 months free on annual plans to pull forward cash flow and reduce annualized churn.",
          "Stripe Customer Portal: Enabling self-service credit card updates, invoice downloads, and plan changes with zero custom code.",
          "Test vs Production Mode: Managing isolated Stripe API keys and webhook secrets across staging and live environments."
        ],
        "takeaway": "Leverage Stripe Customer Portal to handle 100% of billing inquiries, card updates, and cancellations automatically."
      },
      {
        "lesNum": 2,
        "title": "Stripe Checkout Sessions via Next.js Server Actions",
        "duration": "15m",
        "summary": "Build type-safe Server Actions that generate Stripe Checkout URLs and redirect users to secure payment flows.",
        "bulletPoints": [
          "Server Action Checkout Initiator: Validating authenticated user session and fetching or creating their stripe_customer_id.",
          "Dynamic Metadata Attachment: Passing internal user_id in Stripe session metadata to ensure accurate downstream reconciliation.",
          "Success and Cancel Redirects: Routing users back to /dashboard?session_id={CHECKOUT_SESSION_ID} with celebration UI.",
          "Preventing Duplicate Customers: Querying existing Stripe customers by email before creating new customer records."
        ],
        "takeaway": "Server Actions make initiating Stripe checkout effortless and secure without exposing secret keys to the browser."
      },
      {
        "lesNum": 3,
        "title": "Webhook Security: Signature Verification & Idempotent Event Processing",
        "duration": "15m",
        "summary": "Construct an ironclad webhook endpoint that validates cryptographic signatures and protects against replay attacks.",
        "bulletPoints": [
          "Raw Body Ingestion: Capturing the unparsed request body in Next.js App Router for strict stripe.webhooks.constructEvent verification.",
          "Webhook Signature Verification: Rejecting any payload that fails cryptographic signature check with a 400 Bad Request.",
          "Idempotency Table Architecture: Recording processed Stripe event IDs in PostgreSQL to prevent double-crediting on retried events.",
          "Sub-2-Second Webhook Response: Acknowledging events immediately with HTTP 200 before executing background state updates."
        ],
        "takeaway": "Always verify Stripe webhook signatures and record processed event IDs to prevent double-crediting users on webhook retries."
      },
      {
        "lesNum": 4,
        "title": "Full Subscription Lifecycle: Upgrades, Downgrades, Cancellations & Dunning",
        "duration": "15m",
        "summary": "Handle all core Stripe lifecycle events: customer.subscription.created, updated, deleted, and invoice.payment_failed.",
        "bulletPoints": [
          "Fulfilling checkout.session.completed: Upgrading user status to active and provisioning monthly credits immediately.",
          "Managing Renewals: Listening for invoice.paid to reset monthly generation credits on the billing cycle anniversary date.",
          "Handling Payment Failures: Listening for invoice.payment_failed to downgrade accounts to past_due and send polite recovery alerts.",
          "Day 5 Milestone Verification: Simulating complete checkout, renewal, and cancellation cycles using Stripe CLI test triggers."
        ],
        "takeaway": "A robust webhook handler is the revenue spine of your SaaS. Test every subscription state transition thoroughly."
      }
    ]
  },
  {
    "num": 6,
    "id": "module-06",
    "title": "Day 6 — Production Hardening, Rate Limiting & Telemetry",
    "description": "Deploy edge rate limiting with Redis, configure real-time error tracking with Sentry, and audit database query performance.",
    "duration": "60m",
    "lessons": [
      {
        "lesNum": 1,
        "title": "Edge Rate Limiting with Upstash Redis & Token Bucket Algorithms",
        "duration": "15m",
        "summary": "Deploy ultra-fast Redis rate limiting at the edge to protect your endpoints from DDoS attacks, scrapers, and API abuse.",
        "bulletPoints": [
          "The Threat of API Abuse: How malicious actors or buggy client loops can rack up thousands of dollars in LLM API bills.",
          "Upstash Serverless Redis: Initializing an HTTP-based Redis instance with sub-10ms global edge lookup latency.",
          "Implementing Sliding Window Rate Limiting: Restricting unauthenticated endpoints to 10 req/min and authenticated users to 60 req/min.",
          "Returning HTTP 429 Too Many Requests: Providing clear Retry-After headers so legitimate clients can throttle requests gracefully."
        ],
        "takeaway": "Edge rate limiting is mandatory for any AI application to prevent unexpected financial losses from rogue scripts."
      },
      {
        "lesNum": 2,
        "title": "Full-Stack Error Monitoring & Tracing with Sentry",
        "duration": "15m",
        "summary": "Install and configure Sentry across Next.js client, server, and edge runtimes to catch crashes before users report them.",
        "bulletPoints": [
          "Sentry Next.js Wizard: Automatically configuring sentry.client.config, sentry.server.config, and sentry.edge.config.",
          "Context Enrichment: Attaching user_id, subscription_tier, and route parameters to error breadcrumbs for instant debugging.",
          "Filtering Sensitive Data: Redacting auth tokens, passwords, and client PII before transmitting exception payloads.",
          "Slack & Discord Crash Alerts: Routing critical production errors directly to a dedicated developer notification channel."
        ],
        "takeaway": "Fix bugs before your customers notice them. Real-time error alerts with stack traces make rapid debugging effortless."
      },
      {
        "lesNum": 3,
        "title": "Performance Optimization: Edge Caching, Dynamic OG & SEO Metadata",
        "duration": "15m",
        "summary": "Maximize Core Web Vitals, implement dynamic OpenGraph social share cards, and generate automated XML sitemaps.",
        "bulletPoints": [
          "Next.js 15 Caching Rules: Leveraging unstable_cache and revalidation tags to cache expensive public database queries.",
          "Dynamic OpenGraph Image Generation: Using @vercel/og to dynamically generate branded preview cards for social media sharing.",
          "Automated Metadata & Sitemap: Programmatically creating sitemap.xml and robots.txt using Next.js route handlers.",
          "Font & Image Optimization: Utilizing next/font and next/image to achieve perfect 95+ Google PageSpeed performance scores."
        ],
        "takeaway": "Fast load times and beautiful social share images dramatically improve viral conversion when users share your app."
      },
      {
        "lesNum": 4,
        "title": "Database Indexing, Query Profiling, Terms of Service & Security Auditing",
        "duration": "15m",
        "summary": "Audit database performance with Postgres indexes, implement legal policies, and certify production launch readiness.",
        "bulletPoints": [
          "Postgres Index Auditing: Adding B-Tree indexes on user_id, created_at, and lookup keys to maintain sub-5ms query performance.",
          "EXPLAIN ANALYZE Profiling: Benchmarking the slowest SQL queries under simulated 10,000-row table loads.",
          "Essential Legal Pages: Deploying standard Terms of Service, Privacy Policy, and AI Disclaimer generated from verified templates.",
          "Day 6 Milestone Certification: Running a complete end-to-end security, performance, and legal readiness audit."
        ],
        "takeaway": "Index your foreign keys and publish clear legal terms before launching to protect your business and ensure smooth scaling."
      }
    ]
  },
  {
    "num": 7,
    "id": "module-07",
    "title": "Day 7 — Launch Architecture, Distribution & Scaling to $5K MRR",
    "description": "Execute the high-impact Product Hunt launch playbook, drive organic traffic through build-in-public channels, and scale to $5,000 MRR.",
    "duration": "60m",
    "lessons": [
      {
        "lesNum": 1,
        "title": "The Product Hunt Playbook: Hunter Outreach & Top 5 Product of the Day Strategy",
        "duration": "15m",
        "summary": "Orchestrate a winning Product Hunt launch campaign that captures thousands of visitors and reaches the front page leaderboard.",
        "bulletPoints": [
          "Launch Asset Preparation: Crafting high-converting gallery GIFs, a 60-second product demo video, and a punchy tagline.",
          "Timing & Scheduling: Launching at exactly 12:01 AM PST on a Tuesday or Wednesday for maximum global voting exposure.",
          "The First-Comment Narrative: Writing a vulnerable, transparent maker comment explaining the problem and offering a launch discount.",
          "Community Activation: Rallying early supporters and social followers throughout the day without violating PH voting guidelines."
        ],
        "takeaway": "A top 5 finish on Product Hunt delivers an immediate surge of early adopters, backlinks, and valuable feedback."
      },
      {
        "lesNum": 2,
        "title": "High-Leverage Distribution: X/Twitter Build in Public & Video Demos",
        "duration": "15m",
        "summary": "Leverage short-form video demonstrations and transparent building updates to generate consistent organic inbound users.",
        "bulletPoints": [
          "The 45-Second Demo Formula: Hook the problem in 3 seconds, show the magical AI transformation, and finish with a clear CTA.",
          "Build in Public Metrics: Sharing real revenue screenshots, technical challenges, and early customer milestones on X and LinkedIn.",
          "Repurposing Content: Cross-posting high-performing demo videos to YouTube Shorts, TikTok, and Instagram Reels.",
          "Engaging Niche Communities: Participating in conversations where your ideal customers ask for software recommendations."
        ],
        "takeaway": "Authentic demo videos that show the product solving a painful task outperform polished commercial ads every single time."
      },
      {
        "lesNum": 3,
        "title": "Community Infiltration: Ethical Reddit, Slack & Discord Lead Sourcing",
        "duration": "15m",
        "summary": "Source your first 50 paying customers from relevant subreddits and professional communities without spamming.",
        "bulletPoints": [
          "The Value-First Reddit Formula: Writing detailed, educational guides that solve 80% of the problem with text, referencing your tool as the automation.",
          "Searching High-Intent Keywords: Setting up keyword alerts for \"how do I automate X\" or \"recommend a tool for Y\".",
          "Direct Founder Outreach: Messaging users who recently posted about the exact pain point with a free extended trial code.",
          "Niche Slack & Discord Groups: Building relationships in professional micro-communities where your target buyers congregate."
        ],
        "takeaway": "Help people genuinely in public forums. When you demonstrate deep domain expertise, users will naturally seek out your software."
      },
      {
        "lesNum": 4,
        "title": "Free-to-Paid Conversion Funnels, Churn Control & The Path to $5,000/Month MRR",
        "duration": "15m",
        "summary": "Optimize onboarding email sequences, monitor feature adoption, and map the mathematical trajectory to $5,000 MRR.",
        "bulletPoints": [
          "The 3-Part Onboarding Email Drip: Welcome & Quick Start (Day 0), Core Feature Deep Dive (Day 2), Expiring Trial Urgency (Day 5).",
          "Churn Telemetry: Tracking the exact drop-off points where free users fail to convert or paid users stop logging in.",
          "The $5,000/Month MRR Blueprint: 100 customers at $49/mo or 170 customers at $29/mo with under 5% monthly churn.",
          "The Solo SaaS Lifestyle: Operating a high-margin, automated software business with zero employees and total personal freedom."
        ],
        "takeaway": "Scale to $5,000 MRR by obsessing over user retention. Keep churn low, and steady organic acquisition will compound your revenue."
      }
    ]
  }
];

module.exports = {
  courseTitle,
  courseId,
  courseSlug,
  modulesData,
};
