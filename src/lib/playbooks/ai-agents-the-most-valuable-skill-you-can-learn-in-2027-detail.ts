import type { PlaybookDetailData } from "../dating-playbook-detail";
import { AI_AGENTS_2027_MODULES } from "./ai-agents-the-most-valuable-skill-you-can-learn-in-2027-data";

export const AI_AGENTS_2027_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-74",
  slug: "ai-agents-the-most-valuable-skill-you-can-learn-in-2027-full-course",
  title: "AI Agents: The Most Valuable Skill You Can Learn in 2027 (Full Course)",
  headline: "A hands-on guide to building your own AI operating system using context, tools, reusable skills, and automated workflows.",
  description: "Move beyond asking AI questions and start delegating meaningful work to it. This playbook shows you how to configure agents with business knowledge, connect them to the tools they need, create repeatable procedures, and build workflows that produce real deliverables. It also covers security, memory, team adoption, and a practical 90-day roadmap for making AI part of your everyday operations.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 5,
  originalPrice: 12.99,
  currency: "USD",
  discountPercentage: 62,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,340",
  instructorName: "Pranav Joshi",
  instructorTitle: "AI Systems Architect & Automation Engineer",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,340",
  instructorCourses: 3,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996169/AI_Agents_The_Most_Valuable_Skill_You_Can_Learn_in_2027_Full_Course.png",
  hoursOfMaterial: "10.2 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Build a complete personal and enterprise AI operating system with context, tools, skills, and repeatable workflows",
    "Transition from reactive conversational chat to goal-seeking autonomous agent execution loops that deliver finished work",
    "Author durable, inspectable Markdown context files for business overview, ICP, offer catalogs, and brand guidelines",
    "Integrate local shells, web crawlers, headless browsers, and Model Context Protocol (MCP) servers with least-privilege security",
    "Convert successful real-world task corrections into reusable, version-controlled skills that improve with every run",
    "Execute the structured 90-day roadmap from 90-minute setup to scheduled, unattended enterprise agent operations"
  ],
  relatedTopics: [
    "AI Agents",
    "Model Context Protocol (MCP)",
    "Workflow Automation",
    "Context Engineering",
    "Agentic Architecture",
    "Autonomous Operations"
  ],
  requirements: [
    "A computer with internet connection and access to modern AI agent harnesses",
    "Basic familiarity with terminal environments, file systems, and web applications",
    "Willingness to configure structured Markdown files and test automated workflows",
    "Zero prior machine learning engineering or neural network training required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive operational manual for AI Agents: The Most Valuable Skill You Can Learn in 2027 (Full Course). This playbook deconstructs how modern knowledge workers, entrepreneurs, and enterprise operators move beyond asking AI questions in chat windows and start delegating meaningful, multi-step work to autonomous systems.",
      "Rather than collecting brittle prompt hacks or waiting for next-generation foundation models, this curriculum establishes the exact step-by-step operating architecture required to anchor agents in verifiable context, connect them to external tools via Model Context Protocol (MCP), package corrective feedback into reusable skills, and govern autonomous workflows with least-privilege security.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: The Shift from Chat to Agents & The Autonomous Execution Engine",
      "Act 2: The Core Four Levers: Context, Skills, Models, and Tooling",
      "Act 3: Structured Context Files, Folder Hierarchies & Controlled Memory",
      "Act 4: Tool Execution, Connectors & Model Context Protocol (MCP)",
      "Act 5: Reusable Agent Skills & Standard Operating Procedures",
      "Act 6: The AI Operating System Architecture & End-to-End Workflows",
      "Act 7: Enterprise Scaling, Cron Governance & The 90-Day Roadmap"
    ],
    closing: [
      "Whether you are looking to reclaim 20+ hours each week from repetitive operational drag or scale a high-output agency without expanding headcount, this playbook provides the exact frameworks, configuration schemas, and decision matrices needed to build a sovereign AI operating system."
    ]
  },
  targetAudience: [
    "Digital entrepreneurs and agency founders scaling high-output operations with lean teams.",
    "Knowledge workers and operators seeking to automate repetitive multi-tool workflows.",
    "Software engineers and technical architects implementing Model Context Protocol (MCP) systems.",
    "Enterprise leaders designing bottom-up AI literacy and automation build sprints."
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Model Context Protocol (MCP) Schemas & Tool Registry Templates" },
    { iconName: "file-text", text: "CLAUDE.md/AGENTS.md Starter Blueprints, Memory Auditing Prompts & 90-Day Worksheets" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: AI_AGENTS_2027_MODULES.map((mod) => ({
    id: mod.id,
    number: mod.number,
    title: mod.title,
    description: mod.description,
    duration: mod.duration,
    lessonsCount: mod.lessons.length,
    lessons: mod.lessons.map((les, idx) => ({
      id: les.id,
      number: les.number,
      title: les.title,
      duration: les.duration,
      isPreview: idx === 0 && mod.number === "01",
    })),
  })),
  testimonials: [
    {
      name: "Samantha",
      role: "Operations Director",
      rating: 5,
      quote: "This completely changed how I think about using AI. The difference between chatting with a model and actually giving an agent a job is explained brilliantly. I especially liked the employee-onboarding analogy.",
      initials: "S",
      date: "August 04 2026"
    },
    {
      name: "Miguel",
      role: "Digital Product Founder",
      rating: 5,
      quote: "The context, tools, and skills framework is incredibly useful. Instead of collecting random prompts, I now have a much clearer picture of how to build something reusable that improves with every task.",
      initials: "M",
      date: "August 08 2026"
    },
    {
      name: "Leah",
      role: "Agency Founder",
      rating: 5,
      quote: "I came for the AI agent tutorials, but the sections on folder organisation, memory, and reusable skills were what really stood out. The practical templates make getting started much less overwhelming.",
      initials: "L",
      date: "August 14 2026"
    },
    {
      name: "Siddharth",
      role: "Systems Architect",
      rating: 5,
      quote: "A surprisingly balanced guide. It covers automation and productivity, but also explains permissions, human approval, context limitations, and reliability. The 30-day and 90-day plans give the whole thing a clear direction.",
      initials: "S",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "What is the core difference between a chat model and an AI agent?",
      answer: "A chat model behaves like an external consultant: you ask a question, receive an answer, and remain responsible for carrying out the work. An agent receives a defined outcome and autonomously works through the multi-step execution trajectory—inspecting files, invoking tools, auditing results, and iterating until the completion gate is reached."
    },
    {
      question: "Do I need complex coding knowledge to build an AI operating system?",
      answer: "No. The foundation of an AI operating system is built on plain-text Markdown files, clean directory structures, and standard tool interfaces. While understanding CLI environments and APIs is helpful, configuring an agent harness is primarily about providing accurate context, clear SOPs, and defined deliverables."
    },
    {
      question: "What is Model Context Protocol (MCP) and why is it important?",
      answer: "MCP is an open, standardized protocol that acts like a universal translator between AI agents and external systems. Instead of writing custom brittle API integrations for every application, MCP allows an agent to discover and interact with tools, databases, and services through a uniform client-server specification."
    },
    {
      question: "How does the system prevent agents from taking dangerous or unintended actions?",
      answer: "Through strict least-privilege access and human-in-the-loop approval gates. Agents operate in sandboxed, read-only modes by default. Any action that sends external messages, publishes live assets, modifies databases, or triggers financial transactions requires explicit operator authorization."
    }
  ]
};
