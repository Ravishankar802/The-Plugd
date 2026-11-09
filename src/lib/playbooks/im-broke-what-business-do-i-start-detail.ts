import type { PlaybookDetailData } from "../dating-playbook-detail";
import { IM_BROKE_BUSINESS_MODULES } from "./im-broke-what-business-do-i-start-data";

export const IM_BROKE_BUSINESS_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-92",
  slug: "im-broke-what-business-do-i-start",
  title: "\"I'm Broke, What Business Do I Start?\"",
  headline: "Broke but ready to build? Find a business hiding in your skills, turn a real customer problem into an irresistible offer, and get your first customers without needing a big budget.",
  description: "You don't need a perfect idea, expensive tools, or a huge investment to start a business. This playbook walks you through the entire process — from discovering your business idea using the Three Ps (Pain, Profession, Passion) to identifying your ideal customers, crafting an outcome-driven offer, and landing your first five customers through warm outreach.\n\nIncludes customer avatar worksheets, problem-discovery questions, offer-building frameworks, outreach scripts, business validation exercises, and a practical 7-day action plan to take you from idea to real customer conversations.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 2,
  originalPrice: 4.99,
  currency: "USD",
  discountPercentage: 60,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,910",
  instructorName: "Eduardo Martins",
  instructorTitle: "Zero-Capital Business Strategist & Offer Design Architect",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,910",
  instructorCourses: 2,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793996181/I_m_Broke_What_Business_Do_I_Start.png",
  hoursOfMaterial: "11.2 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  accentColor: "#f59e0b",
  whatYouWillLearn: [
    "Uncover validated business ideas using the Three Ps framework (Pain, Profession, Passion)",
    "Define a razor-sharp customer avatar using the 5-dimension qualification grid",
    "Pass the Room Test to ensure your target market shares recognizable, acute struggles",
    "Decouple technical deliverables from high-value commercial and emotional outcomes",
    "Conduct non-adversarial problem-discovery interviews to capture customer vernacular",
    "Formulate the canonical one-sentence offer: Who + Outcome + Without Friction",
    "Execute the 4-part warm outreach message structure to land your first five paying clients",
    "Design a 7-day execution sprint to move from raw capability to cash flow without ad spend"
  ],
  relatedTopics: [
    "Zero-Capital Business Ideation",
    "The Three Ps Diagnostic Framework",
    "Customer Avatar & Room Test Design",
    "Outcome-Based Offer Architecture",
    "Non-Adversarial Customer Discovery",
    "4-Part Warm Outreach & Pilot Conversion"
  ],
  requirements: [
    "A computer or smartphone with internet connectivity",
    "Willingness to inventory existing skills, past struggles, and professional capabilities honestly",
    "Commitment to conducting direct 1-on-1 customer discovery conversations",
    "An action-oriented mindset focused on testing real offers rather than waiting for perfect ideas"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive operating manual for \"I'm Broke, What Business Do I Start?\". This playbook transforms the uncertainty of starting with limited resources into a structured, step-by-step roadmap to your first paying customers.",
      "Rather than chasing speculative business models, taking on debt, or wasting months building complicated products in isolation, this curriculum grounds your venture in what you already know, who you can genuinely help, and how to craft an outcome-driven offer that prospects eagerly pay for.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: The Zero-Capital Paradigm & The Three Ps Diagnostic (Pain, Profession, Passion)",
      "Act 2: Customer Precision & The 5-Dimension Avatar Framework",
      "Act 3: Outcome Engineering: Positive Gains & Negative Experience Avoidance",
      "Act 4: Customer Discovery & High-Signal Problem Interviews",
      "Act 5: The One-Sentence Outcome Offer & Unique Mechanism Design",
      "Act 6: Warm Outreach Architecture & Landing Your First 5 Customers",
      "Act 7: The 7-Day Zero-Capital Launch Blueprint & Studio Scaling"
    ],
    closing: [
      "Whether you are starting from financial distress or seeking a low-risk, high-conviction path to launch your first independent service, this playbook delivers the exact operational blueprint needed to execute with confidence."
    ]
  },
  targetAudience: [
    "Aspiring entrepreneurs with limited capital who want to launch a viable business without debt.",
    "Working professionals seeking to translate their job skills into an independent service venture.",
    "Freelancers and creators struggling to differentiate their services and secure paying clients.",
    "Builders and operators committed to mastering the discipline and mechanics of direct customer validation."
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "The Three Ps Diagnostic Matrix & One-Sentence Offer Builders" },
    { iconName: "file-text", text: "Customer Avatar Worksheets, Discovery Scripts & 7-Day Sprint Trackers" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: IM_BROKE_BUSINESS_MODULES.map((mod) => ({
    id: mod.id,
    number: String(mod.number),
    title: mod.title,
    description: mod.description,
    duration: "96 min",
    lessonsCount: mod.lessons.length,
    lessons: mod.lessons.map((les) => ({
      id: les.id,
      number: String(les.number),
      title: les.title,
      duration: les.duration,
      isPreview: les.id === "01-1"
    }))
  })),
  testimonials: [
    {
      name: "Theo",
      role: "Verified Reader",
      rating: 5,
      quote: "I've been stuck in the loop of researching business ideas for months. The Three Ps framework made me look at my existing skills and experiences differently. Instead of chasing another trendy business model, I finally have a direction I can actually test.",
      initials: "T",
      date: "August 04 2026"
    },
    {
      name: "Fatima",
      role: "Verified Reader",
      rating: 5,
      quote: "The customer avatar and offer-building sections are genuinely useful. I especially liked the idea of explaining what customers get AND what they don't have to deal with anymore. That completely changed how I think about positioning a service.",
      initials: "F",
      date: "August 08 2026"
    },
    {
      name: "Ferreira",
      role: "Verified Reader",
      rating: 5,
      quote: "The warm outreach section is what made this playbook worth reading for me. The message structure feels natural, not like some aggressive sales script. The examples and tracker make it much easier to actually start conversations instead of endlessly planning.",
      initials: "F",
      date: "August 14 2026"
    },
    {
      name: "Kavya",
      role: "Verified Reader",
      rating: 5,
      quote: "What I appreciated most is that it doesn't tell beginners to build a website, create a complicated brand, or spend money before validating anything. It focuses on finding a real problem, making a clear offer, and talking to potential customers. Very practical, especially when you're starting with limited resources.",
      initials: "K",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "How can I start a business if I have zero capital to invest?",
      answer: "By focusing on zero-capital service validation: unbundle a skill you already possess from your work, lived experience, or personal interest, solve an acute problem for a specific customer avatar, and acquire initial clients through direct warm outreach without spending money on software, inventory, or ads."
    },
    {
      question: "What is the Three Ps framework?",
      answer: "The Three Ps framework identifies business ideas across: 1) Pain (a personal struggle you successfully navigated and systemized), 2) Profession (a specialized task employers already pay you to execute), and 3) Passion (a subject you voluntarily study and understand deeply)."
    },
    {
      question: "Why does the playbook emphasize an offer statement rather than a website?",
      answer: "Websites are cosmetic artifacts that do not generate sales on their own. A clear one-sentence offer ('I help [WHO] achieve [OUTCOME] without [UNWANTED FRICTION]') communicates immediate value in real conversations and allows you to test market demand before spending time or money on branding."
    },
    {
      question: "What is the 4-part warm outreach structure?",
      answer: "The 4-part structure consists of: 1) A friendly greeting, 2) A specific, genuine compliment about their work, 3) Your clear one-sentence outcome offer, and 4) A low-pressure referral ask ('Do you happen to know anyone who might find this useful? No worries at all if not.')."
    },
    {
      question: "How long does it take to get the first customer using this system?",
      answer: "By following the 7-day action plan—spending Day 1 on the Three Ps, Day 2 on avatar definition, Day 3 on interviews, Day 4 on the offer statement, Day 5 on scoping, and Days 6–7 on warm outreach—operators routinely initiate client conversations and secure paid pilots within one to two weeks."
    },
    {
      question: "What is a unique mechanism and when should I build one?",
      answer: "A unique mechanism is the structured, repeatable process (checklist, sequence, or workflow) through which you deliver client outcomes. You should develop and name this mechanism after delivering results for your first few clients, turning your hands-on service into proprietary intellectual property."
    }
  ]
};
