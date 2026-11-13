import type { PlaybookDetailData } from "../dating-playbook-detail";
import { IS_CS_STILL_WORTH_IT_MODULES } from "./is-computer-science-still-worth-it-data";

export const IS_CS_STILL_WORTH_IT_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-114",
  slug: "is-computer-science-still-worth-it-in-2027-winter-arc",
  title: "Is Computer Science Still Worth It in 2027? | Winter Arc",
  headline: "AI changed the rules. Your degree alone won't make you job-ready — your ability to build will. Take on the 12-week Winter Arc: master DSA, ship full-stack projects, build AI agents, and discover whether computer science is truly your future.",
  description: "**AI changed the rules. Your degree alone won't make you job-ready — your ability to build will. Take on the 12-week Winter Arc: master DSA, ship full-stack projects, build AI agents, and discover whether computer science is truly your future.**\n\nA practical 12-week roadmap to go from programming fundamentals to modern software engineering. Work through JavaScript, backend and frontend development, databases, system design, DSA, RAG, coding agents, and voice AI — while building projects that demonstrate what you can actually do.\n\nIncludes weekly assignments, five portfolio project ideas, an AI-assisted learning framework, a seven-day-style execution mindset, career-readiness checklists, and a final self-assessment to help you evaluate your skills, discover your strengths, and decide your next move in computer science.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "0.1k",
  publishedAt: "2026-11-13",
  studentsCount: "4,680",
  instructorName: "Harsha Vardhan",
  instructorTitle: "Applied Systems Architect & Engineering Mentor",
  instructorBio: "Harsha Vardhan is an applied systems architect, engineering mentor, and software builder specializing in full-stack engineering, distributed systems, applied AI integration, and technical career readiness.",
  instructorRating: 4.9,
  instructorReviews: "0.1k",
  instructorStudents: "4,680",
  instructorCourses: 2,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1794352588/Is_CS_Still_Worth_It_Winter_Arc.png",
  hoursOfMaterial: "10.5 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Navigate the AI-transformed job market by moving beyond code generation into deep systems reasoning and verification",
    "Master foundational and asynchronous JavaScript, the Node.js event loop, and resilient HTTP server architecture",
    "Design normalized relational PostgreSQL databases, enforce secure user authorization, and build full-stack web applications",
    "Scale applications with database indexing, query profiling (EXPLAIN ANALYZE), Redis caching, and background job queues",
    "Build financial RAG systems with text chunking, vector embeddings, hybrid retrieval, and grounded source attribution",
    "Engineer autonomous coding agents with least-privilege tool schemas, context engineering, and test-driven verification",
    "Develop real-time voice AI assistants with WebRTC audio streaming, acoustic turn detection, and instant barge-in yielding",
    "Apply the Four-Pass problem-solving method to master data structures and algorithms without superficial memorization"
  ],
  relatedTopics: [
    "Computer Science Foundations",
    "Full-Stack Web Engineering",
    "Data Structures & Algorithms",
    "Applied AI & RAG Architecture",
    "System Design & Scalability",
    "Technical Career Readiness"
  ],
  requirements: [
    "A computer, tablet, or smartphone with internet access and a modern web browser",
    "Curiosity about how software works internally and willingness to debug from first principles",
    "Zero prior computer science degree or formal pedigree required"
  ],
  descriptionSections: {
    intro: [
      "Welcome to Is Computer Science Still Worth It in 2027? | Winter Arc. This is a practical 12-week field guide to testing your fit for computer science, building modern engineering skills, and preparing for an AI-shaped job market.",
      "AI has lowered the cost of producing syntax, but it has dramatically raised the bar for what counts as meaningful engineering ability. The question is no longer simply: Can you write code? It is: Can you understand a problem, reason about a system, build a reliable solution, use AI tools intelligently, debug what they get wrong, and explain the architectural trade-offs you made?"
    ],
    keyPoints: [
      "Module 1: The New CS Paradigm & Language Mastery",
      "Module 2: Full-Stack Engineering & Database Architecture",
      "Module 3: Substantial Product Workflows & System Design",
      "Module 4: Applied AI Engineering & Financial RAG Systems",
      "Module 5: Autonomous Coding Agents & Multi-Step Workflows",
      "Module 6: Real-Time Voice AI & Low-Latency Interfaces",
      "Module 7: Portfolio Polish, Career Readiness & Self-Assessment"
    ],
    closing: [
      "A Winter Arc is not about pretending that twelve weeks can solve your entire career. It is about using twelve focused weeks to build undeniable evidence of ability: what you can build, what you understand, where you struggle, and what you need to improve next. Let your code speak for your competence."
    ]
  },
  targetAudience: [
    "Computer science students and self-taught developers seeking to bridge the gap between academic theory and production building",
    "Career transitioners and ambitious professionals evaluating whether software engineering remains a viable, high-leverage path",
    "Builders who know how to prompt AI tools but want to understand underlying systems, databases, networks, and algorithms deeply",
    "Anyone ready to commit to an intensive, disciplined 12-week sprint to test their aptitude and build portfolio-grade evidence"
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Cinematic Production Masterclasses" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "file-text", text: "12-Week Winter Arc Syllabus, Weekly Review Templates & Four-Pass DSA Sheets" },
    { iconName: "video", text: "5 Portfolio Project Blueprints, System Design Diagrams & 12-Week Assessment" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: IS_CS_STILL_WORTH_IT_MODULES.map((mod) => ({
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
      question: "Is this playbook designed only for students with computer science degrees?",
      answer: "No. The 12-week Winter Arc roadmap is specifically built for anyone—self-taught builders, career transitioners, and degree students alike—who wants to build verifiable, practical engineering ability that degrees alone cannot provide."
    },
    {
      question: "Does this playbook guarantee a high-paying software engineering job in 12 weeks?",
      answer: "No. We reject deceptive placement guarantees. Hiring conditions depend on market cycles, personal persistence, and verified portfolio evidence. This playbook provides a rigorous, controllable preparation roadmap that tests your genuine fit and builds undeniable evidence of ability."
    },
    {
      question: "How should I use AI tools while going through the 12-week curriculum?",
      answer: "Follow the Three-Level Assistance Rule taught in the curriculum: request conceptual hints first, request error explanations second, and request implementation assistance only after you thoroughly understand the requirements and can critically review every line."
    },
    {
      question: "What is included with my one-time purchase?",
      answer: "You receive immediate lifetime access to all 7 comprehensive modules, including 112 visual presentation slides, 28 detailed written lessons, weekly assignment rubrics, five portfolio project architecture briefs, and the 12-week career self-assessment scorecard."
    },
    {
      question: "Can I access this playbook across mobile and desktop devices?",
      answer: "Yes. Both the interactive PowerPoint-style slide presentation player and the warm light-mode editorial reader are fully responsive and optimized for seamless viewing across smartphones, tablets, and desktop computers."
    }
  ]
};
