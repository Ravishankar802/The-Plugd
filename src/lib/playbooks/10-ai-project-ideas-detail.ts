import type { PlaybookDetailData } from "../dating-playbook-detail";
import { TEN_AI_PROJECT_IDEAS_MODULES } from "./10-ai-project-ideas-data";

export const TEN_AI_PROJECT_IDEAS_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-113",
  slug: "10-ai-project-ideas-in-30-minutes-for-the-vibe-coding-era",
  title: "10 AI Project ideas in 30 minutes for the Vibe coding era",
  headline: "10 AI projects. 30 minutes. One idea could become your next big build. Explore the frontier of vibe coding — from autonomous coding agents and AI-powered code reviewers to agent infrastructure, reasoning benchmarks, and real-time voice systems. Stop building another generic AI wrapper. Build something that actually works.",
  description: "**10 AI projects. 30 minutes. One idea could become your next big build. Explore the frontier of vibe coding — from autonomous coding agents and AI-powered code reviewers to agent infrastructure, reasoning benchmarks, and real-time voice systems. Stop building another generic AI wrapper. Build something that actually works.**\n\nDiscover 10 practical AI project ideas across coding agents, evaluation systems, agent infrastructure, and voice AI. Learn how to build everything from terminal-based coding agents and cloud development environments to automated PR reviewers, computer-use benchmarks, memory services, and multi-person AI voice assistants.\n\nEach project breaks down its architecture, core challenges, MVP scope, and evaluation methods. Includes a project-selection scorecard, a 30-minute idea-to-plan exercise, a seven-day build sprint, and practical engineering principles to help you turn an AI idea into a working product.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "0.1k",
  publishedAt: "2026-11-13",
  studentsCount: "4,120",
  instructorName: "Harsha Vardhan",
  instructorTitle: "Applied AI Systems Architect & Agent Infrastructure Engineer",
  instructorBio: "Harsha Vardhan is an applied AI systems engineer, software architect, and builder specializing in autonomous coding agents, sandbox infrastructure, evaluation benchmarks, and real-time voice systems.",
  instructorRating: 4.9,
  instructorReviews: "0.1k",
  instructorStudents: "4,120",
  instructorCourses: 1,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1794352588/10_AI_Project_Ideas_Vibe_Coding.png",
  hoursOfMaterial: "10.4 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Build a production-grade terminal coding agent with bounded tool schemas, AST search, and safe command execution",
    "Architect unified multi-agent workspaces using normalized event streaming models and durable session persistence",
    "Design cloud coding runners with microVM execution sandboxes, resource limits, and automated GitHub PR creation",
    "Engineer automated pull-request reviewers that retrieve caller context and eliminate speculative style comments",
    "Construct software engineering benchmarks with verified fail-to-pass tests, holdout splits, and contamination defense",
    "Create computer-use evaluation suites measuring step efficiency, error recovery, and backend application state changes",
    "Develop multi-tier agent memory services separating working, episodic, semantic, document, and relationship memory",
    "Execute the 30-minute idea-to-plan scoping framework and lead a structured 7-day build sprint to launch a working AI product"
  ],
  relatedTopics: [
    "Autonomous Coding Agents",
    "Agent Infrastructure & Sandboxes",
    "AI Evaluation & SWE Benchmarks",
    "Real-Time Voice AI & WebRTC",
    "Context Engineering & Memory Services",
    "Applied AI Product Engineering"
  ],
  requirements: [
    "A computer, tablet, or smartphone with internet access and a modern web browser",
    "Familiarity with modern software development concepts (APIs, Git, terminals, testing)",
    "No GPU cluster or foundation model pre-training experience required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to 10 AI Project ideas in 30 minutes for the Vibe coding era. This is a practical builder's field guide to applied AI products, autonomous agent systems, evaluation infrastructure, and voice interfaces.",
      "The easiest thing to build in the current AI era is often a convincing demo. The harder thing is building a system that remains useful after the first prompt, handles imperfect inputs, recovers from failure, and gives users a reason to return. This playbook equips you with the architecture, engineering principles, and build plans to do exactly that."
    ],
    keyPoints: [
      "Module 1: The Vibe Coding Paradigm & Terminal Agent Architecture",
      "Module 2: Cloud Coding Agents, Orchestration & Sandboxes",
      "Module 3: Automated Pull-Request Reviewers & Signal Engineering",
      "Module 4: Rigorous Benchmarks & Evaluation Systems",
      "Module 5: Agent Infrastructure: Sandboxes, Memory, Browsers & Gateways",
      "Module 6: Voice AI: Multi-Person Calls & Vertical Workflows",
      "Module 7: Project Selection, 7-Day Sprints & Production Governance"
    ],
    closing: [
      "Whether you are building an autonomous engineering tool, an enterprise evaluation suite, a multi-tier memory service, or a live voice assistant, this curriculum provides the exact technical blueprints and operational checklists needed to turn AI ideas into reliable, defensible products."
    ]
  },
  targetAudience: [
    "Software engineers and applied AI builders seeking to move beyond generic LLM wrappers into durable systems engineering",
    "Technical founders and solo developers looking for high-leverage, defensible project ideas across coding agents, evals, and voice AI",
    "Engineering leaders and architects designing agent infrastructure, execution sandboxes, and automated developer tooling",
    "Anyone looking to master the technical frontier of the vibe coding era through structured architecture and build sprints"
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Engineering Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Masterclasses" },
    { iconName: "file-text", text: "10 Project Architecture Blueprints, Scoring Matrices & 7-Day Sprint Plans" },
    { iconName: "video", text: "Sandbox Threat Models, Multi-Tier Memory Schemas & 20-Point Launch Checklists" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: TEN_AI_PROJECT_IDEAS_MODULES.map((mod) => ({
    id: mod.id,
    number: mod.number,
    title: mod.title,
    description: mod.description,
    duration: mod.duration,
    lessons: mod.lessons.map((les) => ({
      id: les.id,
      number: les.number,
      title: les.title,
      duration: les.duration,
    })),
  })),
  testimonials: [],
  faqs: [
    {
      question: "Do I need to train my own foundation models or own a GPU cluster?",
      answer: "No. These are applied-AI projects designed around existing frontier models and APIs. The engineering focus is on orchestration, execution sandboxes, context management, deterministic verification, evaluation harnesses, and real-time audio transport."
    },
    {
      question: "What makes these 10 projects different from typical YouTube AI tutorials?",
      answer: "Typical tutorials show superficial 'AI wrappers' that fall apart on edge cases. This playbook teaches real systems engineering: microVM sandboxing, AST context retrieval, multi-tiered memory architecture, noise-suppressed PR reviews, formal reasoning benchmarks, and WebRTC barge-in handling."
    },
    {
      question: "How does the 30-minute idea-to-plan exercise work?",
      answer: "It is a disciplined step-by-step protocol that takes you from raw concept to a one-page specification with five concrete acceptance tests and a strict seven-day prototype scope in exactly thirty minutes."
    },
    {
      question: "What is included with my one-time purchase?",
      answer: "You receive immediate lifetime access to all 7 comprehensive modules, including 112 visual presentation slides, 28 detailed written lessons, 10 complete architectural briefs, scoring templates, and the 20-point production launch checklist."
    },
    {
      question: "Can I access this playbook across mobile and desktop devices?",
      answer: "Yes. Both the interactive PowerPoint-style slide presentation player and the warm light-mode editorial reader are fully responsive and optimized for seamless viewing across smartphones, tablets, and desktop computers."
    }
  ]
};
