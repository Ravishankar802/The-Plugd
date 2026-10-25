import { DATING_PLAYBOOK_MODULES } from "./dating-playbook-curriculum";

export interface PlaybookDetailLesson {
  id: string;
  number: string;
  title: string;
  duration?: string;
  isPreview?: boolean;
}

export interface PlaybookDetailModule {
  id: string;
  number: string;
  title: string;
  description?: string;
  duration?: string;
  lessons: PlaybookDetailLesson[];
}

export interface PlaybookDetailData {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  headline: string;
  description: string;
  categoryName: string;
  categorySlug: string;
  price: number;
  originalPrice: number;
  currency: string;
  discountPercentage: number;
  badge?: string;
  primaryColor?: string;
  accentColor?: string;
  rating: number;
  ratingCount: string | number;
  studentsCount: string | number;
  instructorName: string;
  instructorTitle: string;
  instructorBio: string;
  instructorRating: number;
  instructorReviews: string;
  instructorStudents: string;
  instructorCourses: number;
  lastUpdated: string;
  language: string;
  subtitles?: string;
  thumbnail: string;
  hoursOfMaterial: string;
  modulesCount: number;
  lessonsCount: number;
  slidesCount?: number;
  whatYouWillLearn: string[];
  relatedTopics: string[];
  requirements: string[];
  descriptionSections: {
    intro: string[];
    keyPointsTitle?: string;
    keyPoints?: string[];
    closing?: string[];
  };
  targetAudience: string[];
  includes: {
    iconName: "video" | "file-text" | "smartphone" | "infinity" | "shield-check" | "layers" | "presentation";
    text: string;
  }[];
  modules: PlaybookDetailModule[];
  testimonials: {
    name: string;
    role?: string;
    rating: number;
    quote: string;
    initials: string;
    date: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

const MODULE_DURATIONS: Record<string, string> = {
  "module-01": "52m",
  "module-02": "48m",
  "module-03": "54m",
  "module-04": "50m",
  "module-05": "46m",
  "module-06": "58m",
  "module-07": "50m",
  "module-08": "52m",
  "module-09": "48m",
  "module-10": "42m",
};

const LESSON_DURATIONS: Record<string, string> = {
  "01-1": "8m",
  "01-2": "7m",
  "01-3": "8m",
  "01-4": "7m",
  "01-5": "8m",
  "01-6": "7m",
  "01-7": "7m",
};

export const DATING_PLAYBOOK_DETAIL: PlaybookDetailData = {
  id: "dating-playbook",
  slug: "men",
  title: "The Dating Playbook — Everything you need to get a girl",
  headline:
    "Master attraction psychology, authentic confidence, approach, texting, date planning, and healthy relationships.",
  description:
    "Learn how to attract women, build genuine confidence, and get the girl you want. Practical, outcome-focused lessons on attraction, flirting, texting, dates, and emotional intelligence — no gimmicks or fake personas.",
  categoryName: "Dating",
  categorySlug: "dating",
  price: 3.0,
  originalPrice: 9.0,
  currency: "USD",
  discountPercentage: 67,
  badge: "Bestseller",
  rating: 4.7,
  ratingCount: "1,201",
  studentsCount: "5,420",
  instructorName: "Plugd",
  instructorTitle: "Outcome-focused Playbooks & Frameworks",
  instructorBio:
    "Plugd creates clear, condensed, battle-tested playbooks to help individuals master high-value life, social, and business skills. Every playbook eliminates filler, outdated theory, and fluff in favor of immediate, actionable execution.",
  instructorRating: 4.7,
  instructorReviews: "1,201",
  instructorStudents: "5,420",
  instructorCourses: 1,
  lastUpdated: "10/2026",
  language: "English",
  thumbnail: "/dating-couple-collage.png",
  hoursOfMaterial: "8.5 hours",
  modulesCount: 10,
  lessonsCount: 69,
  whatYouWillLearn: [
    "Becoming more attractive through confidence, personal presence, and lifestyle presentation.",
    "Approaching women and starting conversations naturally without awkwardness or scripted lines.",
    "Flirting naturally, building romantic tension, and recognizing signs of mutual interest.",
    "Texting without overthinking every reply, playing games, or getting left on read.",
    "Planning memorable dates, reading body language, and handling awkward moments with ease.",
    "Overcoming approach anxiety, handling rejection, and developing genuine self-respect.",
    "Understanding attraction psychology and the difference between chemistry and compatibility.",
    "Transitioning from first dates into a fulfilling, mutually respectful long-term relationship.",
  ],
  relatedTopics: [
    "Dating",
    "Social Skills",
    "Attraction",
    "Confidence",
    "Communication",
    "Relationships",
  ],
  requirements: [
    "No requirements.",
  ],
  descriptionSections: {
    intro: [
      "Getting a girl shouldn't feel like guesswork. You see a girl you like. You want to approach her, but you don't know what to say. You overthink the conversation, second-guess your texts, and wonder whether she's interested. It doesn't have to be that complicated.",
      "That's why we created The Dating Playbook. Being attractive isn't just about looks, money, or having the perfect line. It's about how you carry yourself, how you communicate, how you make her feel, and what you do when the moment actually arrives.",
      "The goal isn't to memorize scripts or pretend to be someone you're not. It's to understand attraction, develop real confidence, and know how to handle situations that used to leave you clueless.",
    ],
    keyPointsTitle: "What makes this Playbook different:",
    keyPoints: [
      "No fake alpha-male persona: You don't have to change who you are to be attractive.",
      "Zero pickup gimmicks: Grounded in social psychology and honest interpersonal connection.",
      "69 bite-sized slide lessons: Easy to absorb on your phone, with clear examples and scripts.",
      "Step-by-step from zero to relationship: From first impressions to texting, dating, and commitment.",
    ],
    closing: [
      "No magic lines. No promises that every woman will like you. Just practical guidance to help you become more confident, understand attraction, and handle real-life dating situations better.",
    ],
  },
  targetAudience: [
    "Men who want to feel more confident around women and understand what creates genuine attraction.",
    "Men who want to approach, flirt, and start conversations without feeling like they're performing a character.",
    "Men looking for clear frameworks on texting, date planning, chemistry, and moving things forward naturally.",
    "Anyone looking for honest, practical guidance for both dating and building a meaningful relationship.",
    "Anyone tired of gimmicks, manipulation, or fake personas who wants genuine, grounded self-improvement.",
  ],
  includes: [
    { iconName: "video", text: "8.5 hours total course length" },
    { iconName: "layers", text: "10 structured, progressive modules" },
    { iconName: "file-text", text: "69 comprehensive slide & text lessons" },
    { iconName: "smartphone", text: "Optimized for mobile, tablet & desktop" },
    { iconName: "infinity", text: "Full lifetime digital access" },
    { iconName: "shield-check", text: "One-time purchase · Instant access" },
  ],
  modules: DATING_PLAYBOOK_MODULES.map((m, idx) => ({
    id: m.id,
    number: m.number,
    title: m.title,
    description: m.description,
    duration: MODULE_DURATIONS[m.id] || "50m",
    lessons: m.lessons.map((l, lIdx) => ({
      id: l.id,
      number: l.number,
      title: l.title,
      duration: LESSON_DURATIONS[l.id] || "7m",
      isPreview: (idx === 0 && lIdx === 0) || (idx === 1 && lIdx === 0),
    })),
  })),
  testimonials: [
    {
      name: "Alex Morgan",
      role: "Verified Purchaser",
      rating: 5,
      quote:
        "I used to overthink every conversation with a girl I liked. Learning to relax, start conversations naturally, and stop treating every interaction like a test made a real difference.",
      initials: "AM",
      date: "3 weeks ago",
    },
    {
      name: "Daniel Brooks",
      role: "Verified Purchaser",
      rating: 5,
      quote:
        "The biggest shift was realizing I didn't need a perfect line. Being more comfortable with myself and actually listening made conversations feel much more natural.",
      initials: "DB",
      date: "1 month ago",
    },
    {
      name: "Ryan Mitchell",
      role: "Verified Purchaser",
      rating: 5,
      quote:
        "I always made texting more complicated than it needed to be. Keeping things simple, showing genuine interest, and not overthinking every reply changed how I approached it.",
      initials: "RM",
      date: "2 months ago",
    },
  ],
  faqs: [
    {
      question: "What's included in The Dating Playbook?",
      answer:
        "The Dating Playbook covers attraction, confidence, approaching women, flirting, texting, planning dates, handling rejection, and building better relationships. Everything is organised into 10 practical modules with 69 lessons containing examples and actionable advice.",
    },
    {
      question: "Is this suitable for beginners?",
      answer:
        "Yes. Whether you're new to dating or have some experience but want to improve, the playbook helps you understand the fundamentals and put them into practice step-by-step.",
    },
    {
      question: "How do I access the playbook?",
      answer:
        "You'll get instant digital access after your purchase. You can revisit the material whenever you want from any device with an internet browser.",
    },
    {
      question: "Is this a one-time payment?",
      answer:
        "Yes. Pay $3 once and keep access to the playbook. There is no recurring subscription or hidden fee.",
    },
    {
      question: "Will this help me become more confident around women?",
      answer:
        "The playbook is designed to help you develop confidence, improve your communication, understand attraction, and approach dating more naturally. Your results will depend on how you apply what you learn.",
    },
    {
      question: "Will I get lifetime access?",
      answer:
        "Yes. Your $3 purchase gives you permanent lifetime access to The Dating Playbook, including all future lesson updates.",
    },
  ],
};
