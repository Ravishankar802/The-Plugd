import { MODULE_01_DATA } from "./module-01-content";

export type SlideType =
  | "TITLE"
  | "BIG_STATEMENT"
  | "QUOTE"
  | "FRAMEWORK"
  | "COMPARISON"
  | "BEFORE_AFTER"
  | "MYTH_REALITY"
  | "TEXT_MOCKUP"
  | "LIST"
  | "CHECKLIST"
  | "SCENARIO"
  | "EXERCISE"
  | "RECAP"
  | "CHAPTER_END";

export interface TextMessage {
  sender: "them" | "you";
  text: string;
  time?: string;
  reaction?: string;
}

export interface FrameworkPillar {
  title: string;
  badge?: string;
  description: string;
  points?: string[];
}

export interface Slide {
  id: string;
  order: number;
  type: SlideType;
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  quote?: {
    text: string;
    author: string;
    role?: string;
  };
  statement?: string;
  pillars?: FrameworkPillar[];
  comparison?: {
    leftTitle: string;
    leftItems: string[];
    rightTitle: string;
    rightItems: string[];
  };
  beforeAfter?: {
    beforeLabel: string;
    beforeText: string;
    afterLabel: string;
    afterText: string;
  };
  mythReality?: {
    myth: string;
    reality: string;
    takeaway: string;
  };
  messages?: TextMessage[];
  messageContext?: string;
  messageBreakdown?: string;
  listItems?: {
    number: string;
    title: string;
    description: string;
  }[];
  checklist?: {
    label: string;
    passed: boolean;
    note?: string;
  }[];
  scenario?: {
    situation: string;
    instinctiveReaction: string;
    calibratedMove: string;
    whyItWorks: string;
  };
  exercise?: {
    title: string;
    timeframe: string;
    objective: string;
    steps: string[];
  };
  recapPoints?: string[];
  nextLessonTitle?: string;
  transitionType?: "horizontal" | "vertical" | "scale" | "perspective" | "morph";
}

export interface Lesson {
  id: string;
  number: string;
  title: string;
  duration: string;
  summary: string;
  slides: Slide[];
  learningObjective?: string;
  writtenLesson?: string;
  takeaway?: string;
}

export interface Module {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  lessonsCount: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: "men" | "women";
  title: string;
  shortTitle: string;
  audience: "Men" | "Women";
  targetGender: "for-men" | "for-women";
  headline: string;
  subheadline: string;
  description: string;
  price: number;
  originalPrice: number;
  currency: string;
  modulesCount: number;
  lessonsCount: number;
  hoursOfMaterial: string;
  accentColor: string;
  stats: {
    label: string;
    value: string;
  }[];
  highlights: string[];
  modules: Module[];
  faqs: {
    question: string;
    answer: string;
  }[];
  testimonials: {
    name: string;
    handle: string;
    role: string;
    quote: string;
    metric?: string;
  }[];
}

export const COURSES: Record<"men" | "women", Course> = {
  women: {
    id: "course-women-01",
    slug: "women",
    title: "HOW TO GET THE MAN OF YOUR DREAMS",
    shortTitle: "For Women",
    audience: "Women",
    targetGender: "for-women",
    headline: "Attraction is not luck. It is calibration, standards, and clarity.",
    subheadline:
      "A practical playbook for women who want to stop tolerating lukewarm effort and start creating genuine magnetism with the caliber of man they actually respect.",
    description:
      "A practical playbook for attraction, standards, confidence, communication, and building relationships with the kind of man you actually want.",
    price: 49,
    originalPrice: 129,
    currency: "USD",
    modulesCount: 10,
    lessonsCount: 42,
    hoursOfMaterial: "6.5 hours",
    accentColor: "#FF5500",
    stats: [
      { label: "Modules", value: "10" },
      { label: "Slide Decks", value: "42" },
      { label: "Real Text Breakdowns", value: "85+" },
      { label: "Access", value: "Lifetime" },
    ],
    highlights: [
      "The Attraction Gap: Why seeking validation repels high-caliber men",
      "De-escalating drama without losing your boundaries or power",
      "How to text with high interest without ever looking like you are chasing",
      "Spotting emotional avoidance and covert narcissism in week one",
      "The calibration of feminine self-possession and organic tension",
    ],
    modules: [
      {
        id: "mod-w-01",
        number: "01",
        title: "The Attraction Gap",
        subtitle: "What actually creates attraction versus what social media told you",
        description:
          "Why attraction isn't the same thing as attention, validation, or compliance. Understand the primal psychology of high-value masculine desire.",
        duration: "48 min",
        lessonsCount: 4,
        lessons: [
          {
            id: "w-01-01",
            number: "01.01",
            title: "The Difference Between Attention and Attraction",
            duration: "11 min",
            summary: "Attention is cheap; any man with a phone can give it. Genuine attraction requires respect, scarcity, and emotional weight.",
            slides: [
              {
                id: "s-w-0101-1",
                order: 1,
                type: "TITLE",
                eyebrow: "MODULE 01 · LESSON 01",
                headline: "ATTENTION IS NOT ATTRACTION.",
                subheadline: "The fundamental confusion ruining modern dating for capable women.",
                transitionType: "scale",
              },
              {
                id: "s-w-0101-2",
                order: 2,
                type: "BIG_STATEMENT",
                headline: "A man can give you attention for months without ever having an ounce of attraction or respect for you.",
                subheadline: "If you measure a man's interest by his texts and likes, you are using currency that costs him zero effort to produce.",
                transitionType: "horizontal",
              },
              {
                id: "s-w-0101-3",
                order: 3,
                type: "MYTH_REALITY",
                headline: "The Validation Trap",
                mythReality: {
                  myth: "If he is texting me every single morning and viewing every story, he must be genuinely invested.",
                  reality: "He is simply bored, enjoying low-effort dopamine, and occupying space in your head without earning it.",
                  takeaway: "High-value men invest through presence, forward momentum, and real logistical commitment—never ambient notifications.",
                },
                transitionType: "vertical",
              },
              {
                id: "s-w-0101-4",
                order: 4,
                type: "FRAMEWORK",
                headline: "The 3 Levels of Male Engagement",
                subheadline: "Every man operates on one of these three tiers. Learn to spot where he sits immediately.",
                pillars: [
                  {
                    title: "Tier 1: Ambient",
                    badge: "Zero Investment",
                    description: "Social media reactions, late night 'thinking of u' texts, non-committal banter. Requires no risk or calendar sacrifice.",
                  },
                  {
                    title: "Tier 2: Physical",
                    badge: "Transactional",
                    description: "Wants your company when convenient, avoids daylight dates, hesitates to introduce you to his inner circle.",
                  },
                  {
                    title: "Tier 3: Committed",
                    badge: "High Respect",
                    description: "Protects your peace, commits to dates 3+ days in advance, respects your time, aligns long-term actions.",
                  },
                ],
                transitionType: "perspective",
              },
              {
                id: "s-w-0101-5",
                order: 5,
                type: "BEFORE_AFTER",
                headline: "The Internal Shift",
                beforeAfter: {
                  beforeLabel: "The Performative Woman",
                  beforeText: "Overanalyzes response times, alters plans to stay available, proves how 'easygoing' and low-maintenance she is.",
                  afterLabel: "The Grounded Woman",
                  afterText: "Observes his actions calmly, keeps her life full and exciting, lets inconsistent behavior quietly eliminate him.",
                },
                transitionType: "scale",
              },
              {
                id: "s-w-0101-6",
                order: 6,
                type: "EXERCISE",
                headline: "The 7-Day Audit",
                exercise: {
                  title: "Cut Low-Effort Ambient Access",
                  timeframe: "Next 7 Days",
                  objective: "Filter out men who occupy your emotional bandwidth without taking you on actual dates.",
                  steps: [
                    "Stop responding to vague 'wyd' texts sent after 8 PM.",
                    "If a man asks to 'hang out' without a time and location, reply with calm warmth: 'Let me know when you have a specific plan in mind!'",
                    "Do not initiate contact with someone who let 48 hours pass without checking in.",
                  ],
                },
                transitionType: "horizontal",
              },
              {
                id: "s-w-0101-7",
                order: 7,
                type: "RECAP",
                headline: "Key Principles",
                recapPoints: [
                  "Attention costs nothing; respect and planning require character.",
                  "Never confuse being easygoing with having no boundaries.",
                  "Men value what they actively have to calibrate for, not what falls into their lap unconditionally.",
                ],
                transitionType: "morph",
              },
              {
                id: "s-w-0101-8",
                order: 8,
                type: "CHAPTER_END",
                headline: "LESSON COMPLETE",
                subheadline: "Next: What Actually Creates Tension (and why agreeable women get friend-zoned).",
                nextLessonTitle: "01.02 What Actually Creates Tension",
                transitionType: "scale",
              },
            ],
          },
          {
            id: "w-01-02",
            number: "01.02",
            title: "What Actually Creates Tension",
            duration: "13 min",
            summary: "Tension requires polarity. When you agree with everything a man says, polarity collapses into boredom.",
            slides: [
              {
                id: "s-w-0102-1",
                order: 1,
                type: "TITLE",
                eyebrow: "MODULE 01 · LESSON 02",
                headline: "POLARITY & TENSION.",
                subheadline: "Why sweet, agreeable women get sidelined, and why playful friction commands respect.",
                transitionType: "horizontal",
              },
              {
                id: "s-w-0102-2",
                order: 2,
                type: "QUOTE",
                headline: "The Law of Friction",
                quote: {
                  text: "A man does not fall in love with someone who mirrors his every opinion. He falls in love with the person who holds her ground with a smile.",
                  author: "The Plugd Playbook",
                  role: "Chapter 1",
                },
                transitionType: "scale",
              },
              {
                id: "s-w-0102-3",
                order: 3,
                type: "COMPARISON",
                headline: "Pleasing vs Magnetism",
                comparison: {
                  leftTitle: "The People-Pleaser",
                  leftItems: [
                    "Nods along with his music, politics, and bad jokes",
                    "Answers immediately to prevent him losing interest",
                    "Laughs nervously at condescending banter",
                    "Afraid of slight disagreements",
                  ],
                  rightTitle: "The Calibrated Woman",
                  rightItems: [
                    "Playfully challenges weak logic with eye contact",
                    "Comfortable with silence without rushing to fill it",
                    "Has distinct taste, strong opinions, and warm humor",
                    "Understands that attraction thrives on gentle tension",
                  ],
                },
                transitionType: "vertical",
              },
              {
                id: "s-w-0102-4",
                order: 4,
                type: "SCENARIO",
                headline: "When He Tests Your Boundaries",
                scenario: {
                  situation: "He jokingly criticizes your career goal or taste in books on the second date.",
                  instinctiveReaction: "Over-explaining or getting insecure and defending your credentials.",
                  calibratedMove: "Sip your drink, smile slowly, look him dead in the eye, and say: 'Bold take for someone who's only known me for 40 minutes. Try again.'",
                  whyItWorks: "It communicates unshakeable self-worth, zero defensiveness, and creates an intoxicating flirtatious power dynamic.",
                },
                transitionType: "scale",
              },
            ],
          },
          {
            id: "w-01-03",
            number: "01.03",
            title: "Why Validation Kills Attraction",
            duration: "12 min",
            summary: "When you shower an uncommitted man with praise, he assumes you possess low standards rather than genuine generosity.",
            slides: [
              {
                id: "s-w-0103-1",
                order: 1,
                type: "BIG_STATEMENT",
                headline: "Earned praise is an honor. Unearned praise is an apology for existing.",
                subheadline: "Men do not value compliments they didn't work to deserve.",
                transitionType: "scale",
              },
              {
                id: "s-w-0103-2",
                order: 2,
                type: "FRAMEWORK",
                headline: "The Validation Economy",
                pillars: [
                  {
                    title: "The Premature Supporter",
                    description: "Acts like his wife during week two. Cooks dinner, manages his schedule, boosts his fragile ego when he has earned nothing.",
                  },
                  {
                    title: "The Objective Observer",
                    description: "Gives genuine compliments ONLY when his behavior is truly exemplary. Keeps her appreciation rare and deeply meaningful.",
                  },
                ],
                transitionType: "horizontal",
              },
            ],
          },
          {
            id: "w-01-04",
            number: "01.04",
            title: "The Scarcity Equation",
            duration: "12 min",
            summary: "Availability is the killer of longing. How to remain delightfully engaged while maintaining your own universe.",
            slides: [
              {
                id: "s-w-0104-1",
                order: 1,
                type: "TITLE",
                eyebrow: "MODULE 01 · LESSON 04",
                headline: "LEAVE ROOM FOR HIS DESIRE.",
                subheadline: "Men fall in love during the quiet moments when they are wondering about you.",
                transitionType: "horizontal",
              },
            ],
          },
        ],
      },
      {
        id: "mod-w-02",
        number: "02",
        title: "Know Your Value",
        subtitle: "Standards, boundaries, and sovereign self-respect",
        description:
          "High standards do not push high-caliber men away—they attract them like a lighthouse. Learn how to set ironclad boundaries without sounding defensive.",
        duration: "42 min",
        lessonsCount: 4,
        lessons: [
          {
            id: "w-02-01",
            number: "02.01",
            title: "Boundaries Without Bitterness",
            duration: "10 min",
            summary: "How to say NO with calm elegance. Why anger gives away power, and how serene enforcement commands instant respect.",
            slides: [
              {
                id: "s-w-0201-1",
                order: 1,
                type: "TITLE",
                headline: "BOUNDARIES ARE NOT ARGUMENTS.",
                subheadline: "A boundary is simply information about what you will and will not participate in.",
                transitionType: "scale",
              },
              {
                id: "s-w-0201-2",
                order: 2,
                type: "TEXT_MOCKUP",
                headline: "When He Cancels at 6 PM for an 8 PM Date",
                messageContext: "He texts: 'Hey sorry got caught up at the gym/office, can we reschedule for 10 PM drinks at my spot?'",
                messages: [
                  { sender: "them", text: "Hey sorry got caught up at the gym, can we do drinks at mine around 10 instead?", time: "6:14 PM" },
                  { sender: "you", text: "No worries at all! Hope you have a productive evening. Let's catch up another time.", time: "6:32 PM" },
                  { sender: "them", text: "Wait are you free later tonight though?", time: "6:33 PM" },
                  { sender: "you", text: "I've already made other plans. Talk soon!", time: "6:45 PM" },
                ],
                messageBreakdown: "Notice: No angry exclamation marks. No guilt tripping. Complete poise. He instantly realizes your calendar does not sit idle for last-minute scrap offers.",
                transitionType: "vertical",
              },
            ],
          },
        ],
      },
      {
        id: "mod-w-03",
        number: "03",
        title: "Attracting Better Men",
        subtitle: "How environment, behavior, and social posture dictate who approaches you",
        description: "High-caliber men do not approach women who appear frantic, buried in their smartphones, or flanked by a defensive wall of six friends.",
        duration: "38 min",
        lessonsCount: 4,
        lessons: [
          {
            id: "w-03-01",
            number: "03.01",
            title: "The Green Light Signal",
            duration: "9 min",
            summary: "How high-achieving men decide whether to approach. The micro-cues of warmth, open posture, and triangular eye contact.",
            slides: [
              {
                id: "s-w-0301-1",
                order: 1,
                type: "TITLE",
                headline: "INVITATION, NOT PURSUIT.",
                subheadline: "How women lead by invitation while allowing the man to experience the thrill of the approach.",
                transitionType: "scale",
              },
            ],
          },
        ],
      },
      {
        id: "mod-w-04",
        number: "04",
        title: "Flirting",
        subtitle: "Creating tension, banter, and playfulness without performing",
        description: "Flirting is the art of giving him 80% of what he needs to feel confident, while keeping the other 20% shrouded in alluring mystery.",
        duration: "45 min",
        lessonsCount: 4,
        lessons: [
          {
            id: "w-04-01",
            number: "04.01",
            title: "Playful Misinterpretation",
            duration: "11 min",
            summary: "The single highest-converting verbal technique for turning a standard, boring conversation into electric romantic chemistry.",
            slides: [
              {
                id: "s-w-0401-1",
                order: 1,
                type: "TITLE",
                headline: "PLAYFUL MISINTERPRETATION.",
                subheadline: "Turn ordinary remarks into charged moments of wit.",
                transitionType: "horizontal",
              },
            ],
          },
        ],
      },
      {
        id: "mod-w-05",
        number: "05",
        title: "Texting",
        subtitle: "Communicating interest without chasing or over-investing",
        description: "Stop writing paragraphs. Stop keeping men entertained on iMessage. Texting is a logistical launchpad to get into real life, not a virtual boyfriend simulator.",
        duration: "52 min",
        lessonsCount: 5,
        lessons: [
          {
            id: "w-05-01",
            number: "05.01",
            title: "Stop Writing Paragraphs",
            duration: "10 min",
            summary: "If your text bubble looks like an essay next to his one-line replies, you have surrendered the frame. Here is the exact calibration rule.",
            slides: [
              {
                id: "s-w-0501-1",
                order: 1,
                type: "TITLE",
                eyebrow: "MODULE 05 · LESSON 01",
                headline: "STOP WRITING PARAGRAPHS.",
                subheadline: "Why digital enthusiasm without reciprocal investment murders mystery.",
                transitionType: "scale",
              },
              {
                id: "s-w-0501-2",
                order: 2,
                type: "TEXT_MOCKUP",
                headline: "The Paragraph vs The Calibrated Ping",
                messageContext: "He asks: 'How was your weekend?'",
                messages: [
                  { sender: "them", text: "Hey! How was your weekend?", time: "2:04 PM" },
                  { sender: "you", text: "Unreal. Went to this tiny espresso bar in Soho, bought two vintage prints, and finished that book we argued about. You?", time: "4:15 PM" },
                ],
                messageBreakdown: "Vivid, intriguing, easy to reply to, zero desperate over-sharing. You reveal taste without writing an autobiography.",
                transitionType: "horizontal",
              },
            ],
          },
        ],
      },
      {
        id: "mod-w-06",
        number: "06",
        title: "Dating",
        subtitle: "Recognizing compatibility, values, and emotional maturity early",
        description: "Dating is not an audition where you try to make him pick you. Dating is an evaluation where you discover whether he meets your bar.",
        duration: "40 min",
        lessonsCount: 4,
        lessons: [
          {
            id: "w-06-01",
            number: "06.01",
            title: "The Reverse Audition Framework",
            duration: "10 min",
            summary: "Flipping your internal question from 'Does he like me?' to 'Do I actually respect how this man handles his life?'",
            slides: [
              {
                id: "s-w-0601-1",
                order: 1,
                type: "TITLE",
                headline: "THE REVERSE AUDITION.",
                subheadline: "Step off the stage and sit in the director's chair.",
                transitionType: "scale",
              },
            ],
          },
        ],
      },
      {
        id: "mod-w-07",
        number: "07",
        title: "Feminine Confidence",
        subtitle: "Presence, self-possession, voice, and non-verbal calm",
        description: "Confidence in a woman is not loud, confrontational, or aggressive. It is quiet certainty, deep self-trust, and grounded presence.",
        duration: "35 min",
        lessonsCount: 4,
        lessons: [
          {
            id: "w-07-01",
            number: "07.01",
            title: "The Power of Stillness",
            duration: "9 min",
            summary: "Nervous pacing, rushing speech, and fidgeting telegraph insecurity. Calm pacing creates an aura of unshakeable status.",
            slides: [
              {
                id: "s-w-0701-1",
                order: 1,
                type: "TITLE",
                headline: "STILLNESS COMMANDS RESPECT.",
                subheadline: "Slow down your breath, slow down your cadence, and watch the room adapt to you.",
                transitionType: "horizontal",
              },
            ],
          },
        ],
      },
      {
        id: "mod-w-08",
        number: "08",
        title: "Red Flags",
        subtitle: "Identifying toxic patterns before emotional attachment forms",
        description: "How to spot love-bombing, inconsistent words vs actions, avoidance, and emotional unreadiness before you give away months of your life.",
        duration: "44 min",
        lessonsCount: 4,
        lessons: [
          {
            id: "w-08-01",
            number: "08.01",
            title: "Dissecting The Love Bomber",
            duration: "11 min",
            summary: "When a man talks about your future wedding during week two, he is not in love with you—he is in love with his own fantasy.",
            slides: [
              {
                id: "s-w-0801-1",
                order: 1,
                type: "TITLE",
                headline: "INTENSITY IS NOT INTIMACY.",
                subheadline: "Real intimacy builds brick by brick over months. Fast burn always means fast crash.",
                transitionType: "scale",
              },
            ],
          },
        ],
      },
      {
        id: "mod-w-09",
        number: "09",
        title: "Keeping Attraction",
        subtitle: "Building long-term devotion without becoming boring or performative",
        description: "How to maintain romantic polarity, sexual charge, and mutual respect after the initial honeymoon phase transitions into partnership.",
        duration: "46 min",
        lessonsCount: 4,
        lessons: [
          {
            id: "w-09-01",
            number: "09.01",
            title: "Maintaining Your Individual Universe",
            duration: "11 min",
            summary: "Never merge your entire life into his. The most captivating partner is one who still has her own passions, friends, and intellectual fire.",
            slides: [
              {
                id: "s-w-0901-1",
                order: 1,
                type: "TITLE",
                headline: "STAY A WHOLE PERSON.",
                subheadline: "A man fell in love with a woman with a vibrant world. If you sacrifice your world for him, you kill the very thing he admired.",
                transitionType: "horizontal",
              },
            ],
          },
        ],
      },
      {
        id: "mod-w-10",
        number: "10",
        title: "The System",
        subtitle: "A practical weekly protocol for your dating life and standards",
        description: "Synthesize everything into an actionable weekly checklist: where to go, how to screen candidates, and how to maintain emotional sovereignty.",
        duration: "36 min",
        lessonsCount: 4,
        lessons: [
          {
            id: "w-10-01",
            number: "10.01",
            title: "The Weekly Calibration Routine",
            duration: "10 min",
            summary: "A 15-minute Sunday ritual to review your boundaries, clear low-effort prospects, and protect your emotional runway.",
            slides: [
              {
                id: "s-w-1001-1",
                order: 1,
                type: "TITLE",
                headline: "THE SUNDAY SCREENING RITUAL.",
                subheadline: "Systematize your peace of mind and protect your future.",
                transitionType: "scale",
              },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Is this course about playing games or being manipulative?",
        answer:
          "Zero games. This playbook is strictly about calibration, high self-worth, and understanding male psychology. It teaches you how to stop wasting months on emotionally unavailable men, how to communicate boundaries with total elegance, and how to build authentic, reciprocal devotion.",
      },
      {
        question: "How is this different from typical relationship advice?",
        answer:
          "Most content tells you to either 'just be yourself' (which provides no tactical guidance) or to 'play hard to get' (which attracts toxic avoidants). Plugd gives you high-impact slide presentations, verbatim text breakdowns, and real psychological frameworks designed like an executive playbook.",
      },
      {
        question: "Do I get lifetime access?",
        answer:
          "Yes. One-time payment of $49 gives you permanent access to all 10 modules, all future slide updates, and all bonus case studies with no recurring fees.",
      },
      {
        question: "Can I view the slide presentations on my phone?",
        answer:
          "Absolutely. The presentation engine is built natively for mobile with swipe gestures, fullscreen mode, and optimized typography.",
      },
    ],
    testimonials: [
      {
        name: "Elena Rostova",
        handle: "@elenarostova",
        role: "Brand Director, NYC",
        quote:
          "I used to write entire novels over text and wonder why men went quiet. The Stop Writing Paragraphs and Reverse Audition modules shifted my entire reality. Started dating a man who plans our dates 5 days in advance and treats my time like gold.",
      },
      {
        name: "Chloe Vance",
        handle: "@chloevance_art",
        role: "Creative Strategist, London",
        quote:
          "The slide presentation design is unlike anything I've seen in the education space. It feels like an Apple keynote meets an Ivy League psychology masterclass. Brutally practical.",
      },
      {
        name: "Maya Sterling",
        handle: "@mayasterling",
        role: "Tech Founder, SF",
        quote:
          "No cheesy 'feminine divine' nonsense. Just raw, razor-sharp behavioral calibration. It saved me from tolerating breadcrumbs and gave me my pride back.",
      },
    ],
  },
  men: {
    id: "course-men-01",
    slug: "men",
    title: "HOW TO DATE THE HOTTEST WOMEN",
    shortTitle: "For Men",
    audience: "Men",
    targetGender: "for-men",
    headline: "Attraction is a skill. Not a lottery.",
    subheadline:
      "A practical playbook for men who want to become significantly more attractive, confident, socially capable, emotionally calibrated, and genuinely great at dating.",
    description:
      "A practical playbook for becoming more attractive, confident, socially capable, and genuinely better at dating.",
    price: 49,
    originalPrice: 129,
    currency: "USD",
    modulesCount: 10,
    lessonsCount: 46,
    hoursOfMaterial: "7.2 hours",
    accentColor: "#FF5500",
    stats: [
      { label: "Modules", value: "10" },
      { label: "Slide Decks", value: "46" },
      { label: "Tactical Scenarios", value: "95+" },
      { label: "Access", value: "Lifetime" },
    ],
    highlights: [
      "The Attraction Gap: Why being agreeable and 'nice' kills female sexual interest",
      "Presence & Posture: Physical calibration that signals high status in 5 seconds",
      "Conversation without performing: How to create chemistry without scripted lines",
      "Texting calibrated for real dates: Cut out pen-pal banter and close logistics fast",
      "The Escalation Framework: Calibrating touch, eye contact, and tension smoothly",
    ],
    modules: [
      MODULE_01_DATA,
      {
        id: "mod-m-02",
        number: "02",
        title: "Become The Man",
        subtitle: "Presence, lifestyle, physical standards, and vocal weight",
        description:
          "Women are intuitive barometers of male vitality. We cover the non-negotiables: physical conditioning, grooming, voice tonality, wardrobe calibration, and purpose.",
        duration: "45 min",
        lessonsCount: 4,
        lessons: [
          {
            id: "m-02-01",
            number: "02.01",
            title: "The 3-Second Visual Filter",
            duration: "11 min",
            summary: "Before you open your mouth, her subconscious has already calculated your status. Posture, shoulder width, eye contact, and grooming.",
            slides: [
              {
                id: "s-m-0201-1",
                order: 1,
                type: "TITLE",
                headline: "THE 3-SECOND VISUAL FILTER.",
                subheadline: "Fixing your physical presence before saying a single syllable.",
                transitionType: "scale",
              },
            ],
          },
        ],
      },
      {
        id: "mod-m-03",
        number: "03",
        title: "Social Skill",
        subtitle: "How to talk to women naturally without performing or stuttering",
        description:
          "Transform your conversational ability. Move from awkward interrogations to high-vibe storytelling, emotional callbacks, and playful frame control.",
        duration: "48 min",
        lessonsCount: 5,
        lessons: [
          {
            id: "m-03-01",
            number: "03.01",
            title: "Killing The Job Interview Dynamic",
            duration: "10 min",
            summary: "Stop asking 'Where are you from?' and 'What do you do for work?' Replace boring questions with cold reads and statements.",
            slides: [
              {
                id: "s-m-0301-1",
                order: 1,
                type: "TITLE",
                eyebrow: "MODULE 03 · LESSON 01",
                headline: "KILL THE JOB INTERVIEW.",
                subheadline: "Dating is not an HR screening. How to speak in assumptions and playful observations.",
                transitionType: "scale",
              },
              {
                id: "s-m-0301-2",
                order: 2,
                type: "COMPARISON",
                headline: "Questions vs Cold Reads",
                comparison: {
                  leftTitle: "Boring Question (Interrogation)",
                  leftItems: [
                    "'What do you do for a living?'",
                    "'Do you have any siblings?'",
                    "'Where did you grow up?'",
                    "'What kind of music do you like?'",
                  ],
                  rightTitle: "Cold Read (Intriguing & Fun)",
                  rightItems: [
                    "'You give off heavy corporate lawyer energy, but with an underground creative side.'",
                    "'You definitely grew up as the bossy older sister who organized everyone.'",
                    "'Let me guess: you only listen to techno when you're stressed.'",
                    "Statements spark curiosity and playful corrections.",
                  ],
                },
                transitionType: "horizontal",
              },
            ],
          },
        ],
      },
      {
        id: "mod-m-04",
        number: "04",
        title: "Flirting & Tension",
        subtitle: "Playful teasing, calibration, physical escalation, and eye contact",
        description:
          "Learn the delicate mechanics of sexual escalation. How to touch without being creepy, how to hold eye contact until she blushes, and how to calibrate tension.",
        duration: "55 min",
        lessonsCount: 5,
        lessons: [
          {
            id: "m-04-01",
            number: "04.01",
            title: "The Escalation Ladder",
            duration: "13 min",
            summary: "Physical touch must be progressive and calibrated. From casual social gestures to intimate romantic contact without awkwardness.",
            slides: [
              {
                id: "s-m-0401-1",
                order: 1,
                type: "TITLE",
                headline: "THE ESCALATION LADDER.",
                subheadline: "Calibrating touch so it feels natural, exciting, and welcome.",
                transitionType: "scale",
              },
            ],
          },
        ],
      },
      {
        id: "mod-m-05",
        number: "05",
        title: "Texting That Converts",
        subtitle: "What to say, when to send it, and what never to do",
        description:
          "Stop acting like her digital entertainer. Texting exists to schedule in-person dates, ignite anticipation, and maintain momentum—nothing else.",
        duration: "50 min",
        lessonsCount: 5,
        lessons: [
          {
            id: "m-05-01",
            number: "05.01",
            title: "Stop Writing Paragraphs",
            duration: "10 min",
            summary: "The definitive texting blueprint. Why less is more, how to handle delayed replies with effortless cool, and how to close the date in under 5 messages.",
            slides: [
              {
                id: "s-m-0501-1",
                order: 1,
                type: "TITLE",
                eyebrow: "MODULE 05 · LESSON 01",
                headline: "STOP WRITING PARAGRAPHS.",
                subheadline: "Over-texting is the #1 way high-potential men sabotage attraction before the first drink.",
                transitionType: "scale",
              },
              {
                id: "s-m-0501-2",
                order: 2,
                type: "TEXT_MOCKUP",
                headline: "From Casual Chat to Locked Calendar in 4 Moves",
                messageContext: "Setting up a date without the endless 'what are you up to' ping-pong.",
                messages: [
                  { sender: "you", text: "You survived Monday. Impressive.", time: "6:15 PM" },
                  { sender: "them", text: "Barely! Need 3 coffees and a vacation already 😂", time: "6:22 PM" },
                  { sender: "you", text: "Let's grab a martini Thursday. Know this moody mezcal spot in Soho you won't hate.", time: "6:30 PM" },
                  { sender: "them", text: "Haha okay Deal, what time?", time: "6:31 PM" },
                  { sender: "you", text: "8:30. Wear something sharp.", time: "6:35 PM" },
                ],
                messageBreakdown: "Direct, decisive, high leadership. No asking 'Would you maybe want to hang out sometime if you're not busy?' Men who lead dates stand out immediately.",
                transitionType: "vertical",
              },
            ],
          },
        ],
      },
      {
        id: "mod-m-06",
        number: "06",
        title: "Effortless Dates",
        subtitle: "Planning experiences that feel organic rather than stressful interviews",
        description:
          "How to construct dates with built-in venue changes, movement, fun, and intimacy. Avoid stiff dinner tables where you sit across like two business partners.",
        duration: "40 min",
        lessonsCount: 4,
        lessons: [
          {
            id: "m-06-01",
            number: "06.01",
            title: "The Multi-Venue Architecture",
            duration: "10 min",
            summary: "Why changing locations once during an evening tricks the brain into feeling like you've known each other for three dates instead of one.",
            slides: [
              {
                id: "s-m-0601-1",
                order: 1,
                type: "TITLE",
                headline: "THE MULTI-VENUE EFFECT.",
                subheadline: "Movement builds bonding. Sit side-by-side, change scenery, create memories.",
                transitionType: "scale",
              },
            ],
          },
        ],
      },
      {
        id: "mod-m-07",
        number: "07",
        title: "Unshakeable Confidence",
        subtitle: "Ending validation-seeking and developing sovereign internal peace",
        description:
          "Confidence is not the belief that she will definitely like you; confidence is knowing you will be completely fine even if she doesn't.",
        duration: "44 min",
        lessonsCount: 4,
        lessons: [
          {
            id: "m-07-01",
            number: "07.01",
            title: "Detachment From Outcome",
            duration: "11 min",
            summary: "When you stop desperately needing a specific reaction, your natural humor and presence immediately ignite.",
            slides: [
              {
                id: "s-m-0701-1",
                order: 1,
                type: "TITLE",
                headline: "OUTCOME INDEPENDENCE.",
                subheadline: "The most magnetic energy in the world is a man who is having fun regardless of the result.",
                transitionType: "scale",
              },
            ],
          },
        ],
      },
      {
        id: "mod-m-08",
        number: "08",
        title: "Handling Rejection",
        subtitle: "Calibrating rejection without becoming bitter, resentful, or fragile",
        description:
          "High-status men view rejection as simple market calibration, not a verdict on their worth. How to walk away with grace and leave doors open.",
        duration: "36 min",
        lessonsCount: 4,
        lessons: [
          {
            id: "m-08-01",
            number: "08.01",
            title: "Grace Under Fire",
            duration: "9 min",
            summary: "How you react to a 'no' reveals everything about your emotional maturity. Men who stay calm and charming become legendary.",
            slides: [
              {
                id: "s-m-0801-1",
                order: 1,
                type: "TITLE",
                headline: "GRACE UNDER FIRE.",
                subheadline: "Never burn a bridge, never show fragility, smile and keep moving.",
                transitionType: "scale",
              },
            ],
          },
        ],
      },
      {
        id: "mod-m-09",
        number: "09",
        title: "Keeping Attraction",
        subtitle: "Maintaining passion and respect after getting together",
        description:
          "Many men work hard to get the girl, then let themselves go, stop leading, and become complacent. How to keep romantic polarity roaring for years.",
        duration: "42 min",
        lessonsCount: 4,
        lessons: [
          {
            id: "m-09-01",
            number: "09.01",
            title: "Never Stop Courting Your Woman",
            duration: "10 min",
            summary: "Continue having a mission outside the relationship. Attraction is fueled by a partner who continues to grow and inspire.",
            slides: [
              {
                id: "s-m-0901-1",
                order: 1,
                type: "TITLE",
                headline: "THE POLARITY MAINTENANCE MANUAL.",
                subheadline: "Complacency is the slow poison of passion.",
                transitionType: "scale",
              },
            ],
          },
        ],
      },
      {
        id: "mod-m-10",
        number: "10",
        title: "The System",
        subtitle: "A practical weekly protocol for expanding your dating life",
        description:
          "A structured roadmap to build your social circles, optimize your style, practice daily conversations, and maintain standards in modern dating.",
        duration: "38 min",
        lessonsCount: 4,
        lessons: [
          {
            id: "m-10-01",
            number: "10.01",
            title: "The Weekly Field Protocol",
            duration: "10 min",
            summary: "Actionable weekly checkpoints to expand your dating funnel, meet women organically, and avoid stagnation.",
            slides: [
              {
                id: "s-m-1001-1",
                order: 1,
                type: "TITLE",
                headline: "THE WEEKLY EXECUTION PROTOCOL.",
                subheadline: "Dating is a skill. Practice it like an athlete.",
                transitionType: "scale",
              },
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Is this pick-up artist (PUA) material?",
        answer:
          "No. Cheap pick-up routines and canned lines make men look pathetic and transparent. This playbook focuses on deep masculine presence, genuine social intelligence, calibrated escalation, lifestyle development, and high emotional standards.",
      },
      {
        question: "Does this work if I am not 6'4 or a millionaire?",
        answer:
          "Yes. High-caliber women respond to posture, emotional grounding, witty tension, vocal tonality, and decisive leadership. When you stop giving off anxious approval-seeking vibes, you immediately outperform 95% of men with shiny resumes.",
      },
      {
        question: "How long does it take to see results?",
        answer:
          "The texting and conversation adjustments produce immediate changes in how women respond to you within days. The physical and presence calibrations deepen your results over several weeks.",
      },
      {
        question: "What format is the course delivered in?",
        answer:
          "High-end presentation slide decks and playbooks. No fluff, no endless podcast banter. Designed with huge typography, interactive diagrams, real text breakdowns, and actionable drills you can consume and review on desktop or mobile.",
      },
    ],
    testimonials: [
      {
        name: "Marcus Cole",
        handle: "@m_cole88",
        role: "Software Founder, Austin",
        quote:
          "The texting and date planning modules paid for themselves the first weekend. Stopped doing the 2-week text pen-pal routine. Closed a date in 4 messages and felt zero anxiety the entire evening. Unbelievable difference.",
      },
      {
        name: "Julian Rivera",
        handle: "@julian.rvr",
        role: "Architect, Miami",
        quote:
          "The slide experience makes normal courses look like trash. It's like going through an Apple pitch deck for your dating life. Clean, brutal, practical, zero bullshit.",
      },
      {
        name: "David Sterling",
        handle: "@dsterlz",
        role: "Private Equity, NYC",
        quote:
          "I used to think being nice and successful was enough. The 'Attraction Gap' module shook me to my core. If you want to understand how attractive women actually think, buy this.",
      },
    ],
  },
};

export function getCourse(slug: "men" | "women"): Course {
  return COURSES[slug];
}

export function getAllCourses(): Course[] {
  return [COURSES.women, COURSES.men];
}

export function getLesson(courseSlug: "men" | "women", lessonId: string): { lesson: Lesson; module: Module; course: Course } | null {
  const course = COURSES[courseSlug];
  if (!course) return null;

  for (const mod of course.modules) {
    const lesson = mod.lessons.find(
      (l) =>
        l.id === lessonId ||
        l.number === lessonId ||
        (lessonId.startsWith("m-01-") &&
          l.id === "01-" + parseInt(lessonId.replace("m-01-0", "").replace("m-01-", ""), 10))
    );
    if (lesson) {
      return { lesson, module: mod, course };
    }
  }

  // fallback to first lesson of first module if not matched
  const firstMod = course.modules[0];
  if (firstMod && firstMod.lessons[0]) {
    return { lesson: firstMod.lessons[0], module: firstMod, course };
  }

  return null;
}

export function getNextLesson(courseSlug: "men" | "women", currentLessonId: string): { lesson: Lesson; module: Module } | null {
  const course = COURSES[courseSlug];
  if (!course) return null;

  const allLessons: { lesson: Lesson; module: Module }[] = [];
  for (const mod of course.modules) {
    for (const l of mod.lessons) {
      allLessons.push({ lesson: l, module: mod });
    }
  }

  const currentIndex = allLessons.findIndex(
    (item) =>
      item.lesson.id === currentLessonId ||
      item.lesson.number === currentLessonId ||
      (currentLessonId.startsWith("m-01-") &&
        item.lesson.id === "01-" + parseInt(currentLessonId.replace("m-01-0", "").replace("m-01-", ""), 10))
  );
  if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
    return allLessons[currentIndex + 1];
  }

  return null;
}

export function getPreviousLesson(courseSlug: "men" | "women", currentLessonId: string): { lesson: Lesson; module: Module } | null {
  const course = COURSES[courseSlug];
  if (!course) return null;

  const allLessons: { lesson: Lesson; module: Module }[] = [];
  for (const mod of course.modules) {
    for (const l of mod.lessons) {
      allLessons.push({ lesson: l, module: mod });
    }
  }

  const currentIndex = allLessons.findIndex(
    (item) =>
      item.lesson.id === currentLessonId ||
      item.lesson.number === currentLessonId ||
      (currentLessonId.startsWith("m-01-") &&
        item.lesson.id === "01-" + parseInt(currentLessonId.replace("m-01-0", "").replace("m-01-", ""), 10))
  );
  if (currentIndex > 0) {
    return allLessons[currentIndex - 1];
  }

  return null;
}
