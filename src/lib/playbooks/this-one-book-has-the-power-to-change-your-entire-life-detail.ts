import type { PlaybookDetailData } from "../dating-playbook-detail";
import { PSYCHO_CYBERNETICS_ONE_BOOK_MODULES } from "./this-one-book-has-the-power-to-change-your-entire-life-data";

export const PSYCHO_CYBERNETICS_ONE_BOOK_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-80",
  slug: "this-one-book-has-the-power-to-change-your-entire-life",
  title: "This ONE Book Has The Power to Change Your ENTIRE Life",
  headline: "A practical guide to reshaping your self-image, breaking limiting beliefs, and using mental rehearsal and goal-setting to change how you approach everyday life.",
  description: "Inspired by Maxwell Maltz’s Psycho-Cybernetics, this playbook explores how your beliefs about yourself can influence your decisions, confidence, and behaviour. Work through five core principles with practical exercises, visualization techniques, goal cards, self-reflection worksheets, and a structured 30-day plan designed to turn a healthier self-image into consistent, measurable action.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,910",
  instructorName: "Manish Yadav",
  instructorTitle: "Behavioral Systems Architect & Performance Researcher",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,910",
  instructorCourses: 3,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793023911/This_ONE_Book_Has_The_Power_to_Change_Your_ENTIRE_Life.png",
  hoursOfMaterial: "10.5 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  whatYouWillLearn: [
    "Recalibrate your subconscious self-image from a baseline of self-doubt to high-leverage sovereign agency",
    "Master the cybernetic servo-mechanism steering loop to treat failures as directional telemetry rather than personal shame",
    "Rebuild broken self-trust through mathematically verifiable micro-commitment ledgers and progressive resistance",
    "Deploy 5-minute pre-performance process rehearsals to inoculate your nervous system against pressure and anxiety",
    "Construct and implement physical goal-card anchors to prime subconscious reticular filtering (RAS)",
    "Decouple raw sensory facts from catastrophic internal narratives using the Stoic-Cybernetic Filter",
    "Design and execute live micro-behavioral experiments that systematically dissolve lifelong limiting beliefs",
    "Execute a structured 30-day transformation sprint that turns a resilient identity into automatic daily execution"
  ],
  relatedTopics: [
    "Psycho-Cybernetics",
    "Self-Image Psychology",
    "Mental Rehearsal & Visualization",
    "Subconscious Steering Systems",
    "Cognitive Reframing",
    "Behavioral Micro-Commitments"
  ],
  requirements: [
    "A notebook, physical index cards (3x5 inch), and a pen for tactile cognitive anchoring",
    "Willingness to honestly audit automatic internal dialogue and past emotional narratives",
    "Commitment to execute 1-3 tiny, observable micro-commitments every day for 30 consecutive days",
    "An open, experimental mindset willing to test limiting beliefs against physical reality"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive operating manual for This ONE Book Has The Power to Change Your ENTIRE Life. This playbook turns Dr. Maxwell Maltz's legendary masterpiece, Psycho-Cybernetics, into a rigorous, repeatable behavioral operating system.",
      "Rather than relying on ungrounded positive thinking mantras, superficial motivational hype, or cosmetic alterations that leave internal feelings of inadequacy untouched, this curriculum establishes the exact step-by-step operating architecture required to reset your subconscious thermostat, reprogram your automatic goal-seeking mechanism, rebuild broken self-trust, and execute with quiet, unshakeable confidence.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: Foundations of Cybernetics & The Self-Image Blueprint",
      "Act 2: Mental Rehearsal & The Architecture of Process Visualization",
      "Act 3: The Cybernetic Feedback Engine & Goal-Seeking Mechanics",
      "Act 4: Cognitive Reframing, Crisis De-Escalation & Stress Sovereignty",
      "Act 5: Limiting Belief Dissection & Empirical Behavioral Experiments",
      "Act 6: Compounding Identity & The Personal Evidence Repository",
      "Act 7: The 30-Day Psycho-Cybernetic Transformation Protocol"
    ],
    closing: [
      "Whether you are an ambitious operator struggling with hidden imposter syndrome, an entrepreneur facing high-stakes performance anxiety, or a builder looking to permanently align your identity with your goals, this playbook delivers the exact worksheets, cognitive filters, and daily routines needed to change your self-image through action."
    ]
  },
  targetAudience: [
    "Entrepreneurs and operators who know what they should do, but continually bump against an invisible internal ceiling.",
    "Professionals seeking to conquer performance anxiety, public speaking fear, or negotiation hesitation.",
    "Individuals tired of temporary motivational spikes who want an automated, cybernetic behavioral operating system.",
    "Anyone ready to stop treating limiting childhood beliefs as permanent, unchangeable facts of existence."
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "5-Minute Mental Rehearsal Scripts & Physical Goal Card Templates" },
    { iconName: "file-text", text: "Fact vs Story Decoupling Audits, Behavioral Experiment Sheets & 30-Day Trackers" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: PSYCHO_CYBERNETICS_ONE_BOOK_MODULES.map((mod) => ({
    id: mod.id,
    number: String(mod.number),
    title: mod.title,
    description: mod.description,
    duration: "90 min",
    lessonsCount: mod.lessons.length,
    lessons: mod.lessons.map((les: any, idx: number) => ({
      id: les.id,
      number: String(les.number),
      title: les.title,
      duration: les.duration,
      isPreview: idx === 0 && mod.number === "01",
    })),
  })),
  testimonials: [
    {
      name: "Rebecca Mitchell",
      role: "Operations Director & Founder",
      rating: 5,
      quote: "I didn't expect a book about self-image to be this practical. The self-trust exercises made me realise how often I undermine myself by making promises I don't keep. Starting smaller has actually helped me become more consistent.",
      initials: "R",
      date: "August 04 2026"
    },
    {
      name: "Omar Hassan",
      role: "Product Strategist",
      rating: 5,
      quote: "The visualization section was my favourite. Instead of just imagining success, it teaches you to mentally walk through the actual process, including the uncomfortable parts. I've started using the five-minute exercise before presentations.",
      initials: "O",
      date: "August 08 2026"
    },
    {
      name: "Chloe Martin",
      role: "Creative Agency Director",
      rating: 5,
      quote: "Really liked the way this breaks down limiting beliefs. The belief audit and experiment worksheets are especially useful because they make you question your assumptions instead of simply replacing them with motivational quotes.",
      initials: "C",
      date: "August 14 2026"
    },
    {
      name: "Akash",
      role: "Autonomous Tech Operator",
      rating: 5,
      quote: "It's the 30-day structure that makes this stand out. You get a clear sequence to follow, daily exercises, weekly reviews and trackers. It feels less like reading another self-help guide and more like actually working on yourself.",
      initials: "A",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "What is Psycho-Cybernetics and how does it differ from traditional motivational self-help?",
      answer: "Psycho-Cybernetics was developed by Dr. Maxwell Maltz, a reconstructive plastic surgeon. Unlike traditional self-help that relies on fleeting emotional hype or positive thinking mantras, Psycho-Cybernetics treats the human mind as a cybernetic goal-seeking servo-mechanism governed by an internal self-image blueprint. True transformation occurs by resetting this subconscious thermostat through empirical behavioral proof and mental rehearsal."
    },
    {
      question: "Does visualization actually produce measurable physical and neurological changes?",
      answer: "Yes. Neuroscience and clinical experiments demonstrate that the motor cortex and nervous system activate the same synaptic pathways during vivid mental rehearsal as they do during physical performance. This playbook teaches process visualization—rehearsing friction, obstacles, and composed execution—rather than passive fantasy daydreaming."
    },
    {
      question: "How does the micro-commitment strategy rebuild broken self-trust?",
      answer: "Every time you make an ambitious promise to yourself and break it, your subconscious ledger logs a withdrawal of self-trust. The micro-commitment strategy establishes daily actions that are too small to trigger resistance. By executing these tasks with 100% consistency, you accumulate undeniable empirical evidence that your word carries authority."
    },
    {
      question: "How is the 30-day implementation plan structured?",
      answer: "The 30-day plan is structured into four progressive weekly sprints: Week 1 focuses on rebuilding self-trust and establishing the evidence ledger; Week 2 deploys physical goal cards and process visualization; Week 3 inoculates against pressure and decouples facts from emotional stories; and Week 4 runs live behavioral experiments to dissolve limiting beliefs permanently."
    }
  ]
};
