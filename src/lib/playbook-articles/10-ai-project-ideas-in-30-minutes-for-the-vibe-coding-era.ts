import { PlaybookArticle } from "./types";

export const TEN_AI_PROJECT_IDEAS_ARTICLE: PlaybookArticle = {
  slug: "10-ai-project-ideas-in-30-minutes-for-the-vibe-coding-era",
  title: "10 AI Project ideas in 30 minutes for the Vibe coding era",
  readingTime: "30 min read",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1794352588/10_AI_Project_Ideas_Vibe_Coding.png",
  publishedDate: "2026-11-13",
  authorName: "Harsha Vardhan",
  authorTitle: "Applied AI Systems Architect & Agent Infrastructure Engineer",
  introParagraphs: [
    "10 AI projects. 30 minutes. One idea could become your next big build. Explore the frontier of vibe coding — from autonomous coding agents and AI-powered code reviewers to agent infrastructure, reasoning benchmarks, and real-time voice systems. Stop building another generic AI wrapper. Build something that actually works.",
    "The easiest thing to build in the current AI era is often a convincing demo. The harder thing is building a system that remains useful after the first prompt, handles imperfect inputs, recovers from failure, and gives users a reason to return. That distinction is the organizing principle of this Playbook.",
    "The projects in this field guide are drawn from four areas of applied AI: Coding Agents (systems that plan, edit, run, inspect, and improve software), Benchmarks & Evaluations (rigorously designed tasks that reveal what models can and cannot do), Agent Infrastructure (the supporting systems that make agents safe, reliable, and observable), and Voice AI (real-time spoken interfaces with turn-taking and shared context).",
    "These are applied-AI projects. The emphasis is on using existing models and building the product, orchestration, evaluation, and infrastructure around them. Most do not require training a foundation model or owning a GPU cluster. They can still involve meaningful systems engineering: secure execution, queues, databases, browser automation, streaming audio, and deployment infrastructure."
  ],
  chapters: [
    {
      id: "chapter-1",
      number: 1,
      title: "Chapter 1 — The Anatomy of a Dependable Applied AI Product",
      paragraphs: [
        "Vibe coding can accelerate initial implementation, but it does not remove the need to understand the underlying system. In fact, the more code an agent can generate, the more important it becomes to define the boundaries in which that code runs, test what it produces, and observe what happens after deployment.",
        "A good project is therefore not simply 'an app with an LLM.' It requires five fundamental pillars:",
        "1. A specific user and a recurring, expensive operational problem.",
        "2. A clear, bounded input and an unambiguous, verifiable output.",
        "3. A workflow that can be deterministically tested and validated.",
        "4. A failure mode that can be isolated, detected, and gracefully handled.",
        "5. A defensible reason the product is superior to a generic chat interface.",
        "The projects detailed across this guide turn these principles into concrete, production-grade architectural blueprints."
      ],
      callout: {
        type: "checklist",
        title: "The Five-Pillar Product Filter",
        items: [
          "Target User: Identified a concrete demographic with daily recurring friction.",
          "Data Contract: Bounded schemas for input ingestion and output artifacts.",
          "Deterministic Gates: Verification checks that do not rely on LLM self-evaluation.",
          "Failure Recovery: Isolated sandboxes, automatic retries, and human escalation.",
          "Structural Moat: Custom retrieval, proprietary evals, or domain integrations."
        ]
      }
    },
    {
      id: "chapter-2",
      number: 2,
      title: "Chapter 2 — Project 1: Build a Terminal-Based Coding Agent",
      paragraphs: [
        "Coding agents are a natural starting point because they combine a visible user experience with concrete engineering challenges. A basic agent can be surprisingly small. A dependable agent that works across large repositories and long-running tasks is a much bigger system.",
        "Build a command-line assistant that can inspect a codebase, understand a task, edit files, run commands, observe the results, and continue until it reaches a useful stopping point. A terminal agent is a strong first project because it avoids the need to build a complex graphical UI, focusing entirely on the core agent loop.",
        "A developer should be able to open a repository, describe a task in ordinary language (e.g., 'Find why the profile page crashes when a user has no avatar, fix the issue, add a regression test, and explain what changed'), and let the agent work through the codebase.",
        "Start with the smallest useful tool set: read_file (read ranges within project boundaries), list_files (inspect structure while excluding secrets/build folders), search_code (symbol lookups), write_file (targeted file editing), run_command (isolated execution with timeout), and finish (report changes and caveats).",
        "Context engineering is the true bottleneck. Sending everything forever inflates costs and degrades attention. Deploy repository orientation, targeted AST retrieval, output trimming on build logs, and external task state records to keep working memory clean."
      ],
      callout: {
        type: "prompt",
        title: "Durable Task State Schema",
        code: `{\n  "goal": "Fix avatar rendering when profile has no image",\n  "findings": ["ProfileCard assumes avatarUrl is non-null"],\n  "files_changed": ["src/components/Avatar.tsx", "src/components/Avatar.test.tsx"],\n  "checks": ["Avatar unit tests passed"],\n  "remaining": ["Run full integration test suite"]\n}`
      }
    },
    {
      id: "chapter-3",
      number: 3,
      title: "Chapter 3 — Project 2: Create a Unified Coding-Agent Workspace",
      paragraphs: [
        "Instead of building a new foundation model or recreating every agent's internal harness, this product focuses on the operational experience around existing tools: starting sessions, switching between agents, reviewing output, managing tasks, and monitoring remote work.",
        "A unified workspace provides one centralized dashboard where developers supervise local terminal agents, background cloud runners, and PR review bots without constant terminal switching.",
        "The technical crux is event normalization. Normalize heterogeneous activity into a standardized schema: session.started, message.delta, tool.started, tool.completed, approval.required, session.waiting, session.completed, and session.failed.",
        "Persist these structured events in an append-only database so developers can close their browser, switch devices, and reconstruct the full execution trace without data loss."
      ]
    },
    {
      id: "chapter-4",
      number: 4,
      title: "Chapter 4 — Project 3: Build a Cloud Coding Agent",
      paragraphs: [
        "Move the coding-agent loop from a developer's local machine into an isolated cloud environment. A user connects a repository, describes a task, and starts an agent. Your service creates an isolated workspace, checks out the code, executes the agent loop, runs tests, and returns a reviewable pull request.",
        "Sandboxing is the core security moat. Agent-generated code is untrusted until inspected. Running it on the primary application server creates severe security vulnerabilities. Deploy microVMs (such as Firecracker) or hardened container sandboxes with strict CPU, memory, disk, and execution time ceilings.",
        "Model the asynchronous execution as a formal Finite State Machine (FSM): Queued → Provisioning → Running → (WaitingForApproval) → Verifying → Completed / Failed / TimedOut. Persist state transitions in an authoritative datastore to survive worker crashes.",
        "Implement strict notification governance: keep routine telemetry inside the execution log, send concise summaries upon completion, and trigger urgent alerts only when human approval is required for sensitive operations."
      ],
      callout: {
        type: "checklist",
        title: "Sandbox Isolation Boundaries",
        items: [
          "Hardware Virtualization: MicroVM guest kernel per tenant.",
          "Network Egress Control: Whitelist package registries; block cloud metadata.",
          "Resource Caps: Enforce 2-4 vCPU, 4-8 GB RAM, and 15-minute global timeout.",
          "Ephemeral Lifecycle: Zero-wipe storage blocks immediately upon task finish."
        ]
      }
    },
    {
      id: "chapter-5",
      number: 5,
      title: "Chapter 5 — Project 4: Create an Automated Pull-Request Reviewer",
      paragraphs: [
        "Build an agent that reviews pull requests, identifies meaningful risks, checks proposed changes against the surrounding codebase, and returns a small number of actionable findings.",
        "The naive approach sends a raw diff to an LLM and asks for feedback. This fails because diffs lack critical context: helper invariants, type contracts, and distant caller dependencies.",
        "Construct a rich Context Bundle: fetch full modified files, map caller sites using tree-sitter parsers, and gather type definitions before model invocation.",
        "Deploy a Hybrid Verification Pipeline: run deterministic static linters (TypeScript, ESLint) and security scanners first to gather indisputable facts, and reserve the language model exclusively for semantic reasoning (logic bugs, race conditions, architecture drift).",
        "Enforce Signal Engineering: suppress speculative nitpicks, deduplicate linter output, require structured finding schemas, and practice the Golden Rule of Abstention—if no critical defects exist, post a clean approval checkmark."
      ]
    },
    {
      id: "chapter-6",
      number: 6,
      title: "Chapter 6 — Project 5: Build a Difficult Coding Benchmark",
      paragraphs: [
        "As code generation becomes commoditized, the scarce engineering work shifts toward defining what good performance means. A benchmark is a carefully specified set of tasks, expected outcomes, and reliable ways to determine whether an attempt succeeded.",
        "A production benchmark task consists of: frozen repository commit, objective problem statement, fail-to-pass (F2P) tests, pass-to-pass (P2P) regression tests, and environmental constraints.",
        "Defend against task failure modes: tasks that are too easy, ambiguous specifications, fragile dependency environments, and data contamination from pre-training web scrapes.",
        "Maintain strict benchmark lifecycle governance: use semantic versioning, keep holdout splits air-gapped, and introduce higher difficulty tiers as frontier models advance."
      ]
    },
    {
      id: "chapter-7",
      number: 7,
      title: "Chapter 7 — Project 6: Create a Computer-Use Evaluation Suite",
      paragraphs: [
        "Build an evaluation suite for AI agents that operate computers through graphical interfaces (GUIs). Instead of asking whether a model can answer a question, measure whether it can complete tasks in real desktop or web applications: navigating menus, filling forms, editing media, or executing multi-step workflows.",
        "Evaluating GUI automation requires measuring the process as well as the outcome: track step efficiency, error recovery rates, prohibited action constraints, and execution duration.",
        "Verify success by auditing the underlying application and database states rather than trusting self-reported model claims. Execute all tests inside isolated virtual display containers equipped with mock credentials."
      ]
    },
    {
      id: "chapter-8",
      number: 8,
      title: "Chapter 8 — Project 7: Build a Reasoning Benchmark with Novel Puzzles",
      paragraphs: [
        "Standard standardized tests are saturated across public training datasets. To test true structural reasoning rather than memorized regurgitation, create benchmarks using synthetic mini-languages or formal rule systems with novel syntax and unconventional operators.",
        "Provide the model with the exact axiomatic rules governing the synthetic language. Challenge it to predict internal register states or write instruction sequences that reach a target outcome.",
        "Pair deterministic task generators with mathematical reference solvers to produce infinite validated, difficulty-calibrated puzzle sets with adversarial edge cases."
      ]
    },
    {
      id: "chapter-9",
      number: 9,
      title: "Chapter 9 — Project 8: Build an Agent Infrastructure Toolkit",
      paragraphs: [
        "Agent infrastructure is the B2B layer that helps companies build and run agents reliably. Instead of wrapping an API, take a difficult operational responsibility off engineering teams' hands.",
        "Module A (Sandboxes): Multi-tenant execution environments with ephemeral filesystems, seccomp filters, and egress proxies.",
        "Module B (Memory Service): Multi-tiered architecture partitioning working memory (task state), episodic memory (event ledger), semantic memory (durable rules), document memory (RAG), and relationship memory (graphs).",
        "Module C (Browser Infrastructure): Headless Chromium fleets offering screenshot streaming and structured markdown DOM extraction.",
        "Module D (Tool Gateway): Centralized credential vaulting, rate-limiting governors, and schema translation layers.",
        "Module E (Observability): End-to-end tracing connecting user prompts, intermediate LLM calls, tool executions, token velocity, and financial cost accounting."
      ],
      callout: {
        type: "quote",
        title: "The B2B Infrastructure Mandate",
        content: "The important question is not 'Can I wrap an API?' It is 'What difficult systems responsibility can I take off another engineering team's hands?'"
      }
    },
    {
      id: "chapter-10",
      number: 10,
      title: "Chapter 10 — Project 9: Multi-Person Voice Call with an AI Participant",
      paragraphs: [
        "Voice AI is easy to prototype as a 1-on-1 bot. The deeper engineering challenge is making an AI agent participate naturally in a live group call with multiple human speakers, overlapping chatter, interruptions, and shared context.",
        "Deploy WebSockets or WebRTC with low-overhead codecs (e.g. Opus) to keep round-trip audio latency under the 500ms conversational naturalness threshold.",
        "Master the social physics of conversational turn-taking: deploy acoustic speaker diarization to attribute incoming packets to distinct participants, analyze falling pitch intonation and semantic completion to detect turn ends, and enforce explicit participation policies (Listen-Only, Mentioned, Facilitator, Active).",
        "Implement instant barge-in mechanics: use Acoustic Echo Cancellation (AEC) and Voice Activity Detection (VAD) to truncate synthetic audio streams within 150ms when a human speaks."
      ]
    },
    {
      id: "chapter-11",
      number: 11,
      title: "Chapter 11 — Project 10: Build a Vertical Voice Workflow Agent",
      paragraphs: [
        "A generic voice bot that tries to handle all conversations is a business liability. Build vertical voice agents tailored to specific business workflows: clinic appointment intake, restaurant reservation booking, or service maintenance dispatch.",
        "Enforce the Rule of Authoritative Verification: the agent must never confirm an appointment or quote a price based on conversational context alone. It must execute a validated tool call against the business's real API and receive a 200 OK before confirming verbally.",
        "Define explicit red-line conditions that immediately transfer callers to human staff with a live transcript: medical emergencies, agitated callers, repeated audio recognition failures, or requests outside operational scope."
      ]
    },
    {
      id: "chapter-12",
      number: 12,
      title: "Chapter 12 — The Ten Ideas at a Glance & Project-Selection Scorecard",
      paragraphs: [
        "Select your project based on what you want to learn and your specific unfair advantages:",
        "- New to agents: Start with Project 1 (Terminal Coding Agent) to master the core loop.",
        "- Full-stack strength: Build Project 2 (Unified Agent Workspace) for orchestration and session persistence.",
        "- Deep systems challenge: Build Project 3 (Cloud Coding Agent) for sandboxing, queues, and Git integration.",
        "- Software engineering rigor: Build Project 4 (PR Reviewer) or Project 5 (Coding Benchmark) for signal quality and evals.",
        "- Enterprise infrastructure: Build Project 8 (Sandboxes, Memory, or Observability).",
        "- Audio & real-time: Build Project 9 (Multi-Person Voice) or Project 10 (Vertical Voice Workflow).",
        "Score each candidate on a 1-5 scale across User Access, Problem Frequency, Technical Feasibility, Evaluation Clarity, Structural Moat, Operational Cost, and Knowledge Compounding."
      ]
    },
    {
      id: "chapter-13",
      number: 13,
      title: "Chapter 13 — The 30-Minute Idea-to-Plan Exercise",
      paragraphs: [
        "Use this timed scoping protocol to transform raw inspiration into an actionable technical blueprint in thirty minutes:",
        "- Minutes 0–5 (User Isolation): Narrow down to one specific user cohort you can directly interview.",
        "- Minutes 5–10 (Problem Sentence): Articulate the problem: 'When [situation occurs], [user] currently has to [painful workaround], causing [cost/risk].'",
        "- Minutes 10–15 (Minimum Bounded Outcome): Define the single deliverable the system must produce in one automated session.",
        "- Minutes 15–20 (Isolate Hardest Risk): Identify the single biggest uncertainty (reasoning, sandboxing, latency, or data access).",
        "- Minutes 20–25 (Draft Five Acceptance Tests): Write out 1 normal path, 1 edge case, 1 malformed input, 1 clarification request, and 1 refusal.",
        "- Minutes 25–30 (7-Day Scope Cut): Cut all secondary features and commit to a single verifiable prototype deliverable."
      ]
    },
    {
      id: "chapter-14",
      number: 14,
      title: "Chapter 14 — The Seven-Day Build Sprint: Days 1 Through 4",
      paragraphs: [
        "A build sprint forces technical decisions and prevents prototype drift. Time-box development to seven days:",
        "Day 1 (Specification & Tests): Write a one-page product specification, finalize the five acceptance tests, and define explicitly forbidden actions.",
        "Day 2 (Core Capability Proof): Connect the model API and execute the bare minimum workflow on test inputs, proving cognitive feasibility even with raw console logging.",
        "Day 3 (System Boundaries & Sandboxes): Build the runtime boundary: create the isolated execution sandbox, local session store, or WebRTC audio room.",
        "Day 4 (Deterministic Verification): Add linters, compilers, and test runners, ensuring the agent cannot declare completion unless verification checks pass 100%."
      ]
    },
    {
      id: "chapter-15",
      number: 15,
      title: "Chapter 15 — The Seven-Day Build Sprint: Days 5 Through 7",
      paragraphs: [
        "Day 5 (Operator Interface & UX): Build the minimal front-end console showing real-time progress, tool call states, approval buttons, and structured error messages.",
        "Day 6 (Stress Testing & Failure Audits): Run acceptance tests alongside adversarial edge cases: simulated network drops, malformed payloads, and unexpected cancellations. Fix unhandled crashes.",
        "Day 7 (Live Demonstration & Decision): Record a continuous, unedited demo showing at least one failure and recovery. Demo the system to target users, collect unvarnished feedback, and decide whether to double down, refine scope, or pivot."
      ]
    },
    {
      id: "chapter-16",
      number: 16,
      title: "Chapter 16 — The Eight Applied AI Engineering Principles",
      paragraphs: [
        "1. Treat the model as one component, not the whole product: Wrap probabilistic reasoning inside input validation, permissions, sandboxes, and retries.",
        "2. Separate deterministic work from probabilistic work: Use code for rules, calculations, and tests; use LLMs for flexible interpretation and synthesis.",
        "3. Make state explicit: Store task status, decisions, completed steps, and pending work in structured form rather than reconstructing from raw chat.",
        "4. Design for interruption and failure: Build timeouts, cancellations, retries, idempotency, and recoverable state into every service.",
        "5. Measure outcomes, not activity: Tool call volume and transcript length do not equal value; measure verified task completion and cost.",
        "6. Keep humans in control of consequential actions: Require explicit confirmation for irreversible, expensive, or security-sensitive actions.",
        "7. Do not confuse benchmark scores with real-world capability: Evals measure performance on a defined task distribution, not universal intelligence.",
        "8. Build around a specific workflow: Generic assistants are hard to differentiate; specific workflows give you concrete requirements and clear adoption reasons."
      ]
    },
    {
      id: "chapter-17",
      number: 17,
      title: "Chapter 17 — Compact Implementation Briefs A Through E",
      paragraphs: [
        "Brief A (Terminal Coding Agent): User: Individual developer. Promise: Turn a bounded coding task into a tested patch. Core loop: Inspect → plan → tool call → observe → edit → test → report.",
        "Brief B (Unified Agent Workspace): User: Developer using multiple tools. Promise: Supervise heterogeneous coding sessions from one place. Core loop: Connect → start session → stream events → inspect → resume/stop.",
        "Brief C (Cloud Coding Agent): User: Engineering team. Promise: Delegate repository tasks to isolated background agents. Core loop: Connect repo → provision sandbox → execute → verify → open PR.",
        "Brief D (Pull-Request Reviewer): User: Engineering team. Promise: Catch meaningful regressions without spamming speculative comments. Core loop: Fetch diff → retrieve context → run checks → inspect → validate → report.",
        "Brief E (Coding Benchmark): User: Model developers and researchers. Promise: Measure coding capability on reproducible repository tasks. Core loop: Specify → validate → freeze env → run → score → analyze."
      ]
    },
    {
      id: "chapter-18",
      number: 18,
      title: "Chapter 18 — Compact Implementation Briefs F Through J",
      paragraphs: [
        "Brief F (Computer-Use Evaluation): User: Teams building GUI agents. Promise: Measure whether an agent can complete GUI workflows safely. Core loop: Init app → execute task → record actions → verify state → score.",
        "Brief G (Reasoning Benchmark): User: Teams evaluating reasoning. Promise: Test problem-solving on generated tasks with known solutions. Core loop: Generate → validate → solve → score → analyze.",
        "Brief H (Agent Infrastructure Toolkit): User: Companies building agents. Promise: Provide modular sandboxing, memory, or gateway infrastructure. Core loop: Integrate → configure policy → execute → observe → recover.",
        "Brief I (Multi-Person Voice Participant): User: Teams on live calls. Promise: Add a transparent AI participant that listens and contributes under clear rules. Core loop: Join room → listen → track speakers → decide → respond.",
        "Brief J (Vertical Voice Workflow Agent): User: Specific business vertical. Promise: Complete one routine voice workflow accurately and escalate exceptions. Core loop: Disclose → understand → collect → verify → act/escalate → log."
      ]
    },
    {
      id: "chapter-19",
      number: 19,
      title: "Chapter 19 — Glossary of Applied AI Systems",
      paragraphs: [
        "Agent loop: The iterative cycle where a model receives context, requests a tool action, observes execution feedback, and updates state.",
        "Agent orchestration: The distributed coordination of agents, tools, tasks, queues, and isolated execution runtimes.",
        "Asynchronous agent: A background worker that executes multi-step tasks independently without an active user browser connection.",
        "Computer-use agent: An agent that perceives and manipulates graphical software interfaces via screenshots, mouse clicks, and keystrokes.",
        "Context engineering: The disciplined curation, truncation, and structural management of information passed into an LLM context window.",
        "Diarization: Real-time acoustic speaker identification that separates incoming audio streams by individual speaker profiles.",
        "MicroVM: Lightweight hardware-virtualized virtual machines (e.g. Firecracker) providing kernel-level security with sub-second boot times.",
        "Model Context Protocol (MCP): An open standard for connecting AI models to external tools, databases, and local context repositories.",
        "Observability: End-to-end telemetry linking user prompts, intermediate LLM calls, tool executions, errors, and cost accounting.",
        "Turn-taking: The algorithmic management of speech pauses, intonation cues, and barge-in yielding in real-time conversational voice AI."
      ]
    },
    {
      id: "chapter-20",
      number: 20,
      title: "Chapter 20 — The 20-Point Pre-Launch Production Checklist",
      paragraphs: [
        "Before deploying any applied AI system to production customers, execute this 20-point audit:",
        "Product: One clearly defined user group; one recurring problem; one complete core workflow; clear refusal boundaries for unsupported tasks; visible way to inspect results.",
        "Reliability: Strict input schema validation; execution timeouts and cancellation handlers; retry policies with exponential backoff; persistent task state machines; error reporting with stack traces; automated recovery after worker restarts.",
        "Safety & Security: Least-privilege permission checks; API credentials and secrets isolated from prompts and logs; microVM or container isolation for untrusted execution; human approval gates for irreversible actions; clear data retention and hard deletion policies; immutable audit trails for external mutations.",
        "Evaluation & Governance: Comprehensive test suite covering normal, edge, malformed, clarification, and refusal cases; versioned evaluation datasets; real-time token, latency, and financial cost tracking; documented migration plan for upstream model changes."
      ],
      callout: {
        type: "checklist",
        title: "Final Launch Sign-Off",
        items: [
          "Security: Zero secrets exposed in prompt traces or client logs.",
          "Sandboxing: Untrusted code isolated with CPU/memory/network caps.",
          "Reliability: Automatic recovery from worker crashes verified.",
          "Economics: Cost-per-task model verified with positive gross margins."
        ]
      }
    }
  ]
};
