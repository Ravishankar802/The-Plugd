import type { PlaybookDetailData } from "../dating-playbook-detail";
import { ZERO_AD_CUSTOMERS_MODULES } from "./zero-ad-customers-data";

export const ZERO_AD_CUSTOMERS_DETAIL_DATA: PlaybookDetailData = {
  id: "side-hustles-08",
  slug: "side-hustles",
  title: "10 Ways to Find Paying Customers Without Spending on Ads",
  headline: "Discover 10 zero-ad customer acquisition strategies to find and close paying clients for your business.",
  description: "A battle-tested tactical guide to finding paying clients organically through direct outreach, community channels, content leverage, and partnerships without spending a single dollar on ads. Learn how to sign high-ticket retainers, construct 3-minute video audits, hijack job boards, and scale to $10,000+/month solo.",
  categoryName: "AI Businesses",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,
  badge: "Bestseller",
  rating: 4.9,
  ratingCount: 312,
  studentsCount: "1,180",
  instructorName: "Plugd Acquisition Team",
  instructorTitle: "B2B Client Strategists & Organic Growth Architects",
  instructorBio: "The Plugd Acquisition Team specializes in designing zero-ad customer acquisition systems, cold outreach engines, and high-ticket service packaging for solo founders.",
  instructorRating: 4.9,
  instructorReviews: "312",
  instructorStudents: "1,180",
  instructorCourses: 3,
  lastUpdated: "10/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "",
  hoursOfMaterial: "7.0 hours",
  modulesCount: 7,
  lessonsCount: 28,
  whatYouWillLearn: [
    "Deploy 10 distinct, proven client acquisition methods that require zero ad spend",
    "Master the 3-minute Loom video audit framework that turns cold prospects into enthusiastic buyers",
    "Intercept companies currently hiring full-time staff and pitch fractional automated solutions",
    "Infiltrate niche Slack, Discord, and Skool communities to generate qualified inbound leads organically",
    "Unlock hidden revenue by reactivating dormant past contacts with a proven 3-step sequence",
    "Build non-competing partner agency flywheels that deliver steady, uncompetitive client referrals",
    "Execute high-converting spear content on LinkedIn and Twitter with automated DM fulfillment funnels",
    "Scale to a predictable $10,000+/month solo operation with exactly 5 retainers @ $2,000/month"
  ],
  relatedTopics: [
    "Client Acquisition",
    "Zero-Ad Marketing",
    "Cold Outreach",
    "B2B Sales",
    "Solopreneurship",
    "Loom Audits",
    "Agency Growth"
  ],
  requirements: [
    "No paid advertising budget required; 100% organic and direct methods",
    "A computer with a web browser, internet connection, and Loom account",
    "Willingness to spend 60 minutes daily executing the direct outreach protocol"
  ],
  descriptionSections: {
    intro: [
      "Spending thousands of dollars on speculative Facebook or LinkedIn ads is the fastest way for a new service business or solo operator to go broke. In this comprehensive playbook, you will master the 10 battle-tested customer acquisition strategies that allow you to sign high-paying clients without spending a single dollar on advertising.",
      "From high-converting 3-minute video audits and reverse job board hijacking to non-competing agency partnerships and organic spear posts, every method is broken down with step-by-step implementation guides, outreach scripts, decision matrices, and real-world unit economics.",
      "Designed specifically for solo operators, agency founders, and consultants who want to reach $10,000+/month with 95%+ profit margins."
    ],
    keyPointsTitle: "The 10 Client Acquisition Methods Curriculum",
    keyPoints: [
      "Module 1: The Zero-Ad Paradigm & Client Acquisition Foundations",
      "Module 2: Inbound Organic Flywheels (Methods 1 & 2)",
      "Module 3: Community & Executive Infiltration (Methods 3 & 4)",
      "Module 4: Network & Partner Multipliers (Methods 5 & 6)",
      "Module 5: Authority Assets & Organic Spear Posts (Methods 7 & 8)",
      "Module 6: Direct Sprints & Referral Loops (Methods 9 & 10)",
      "Module 7: Scaling to $10,000/Month Solo Client Operations"
    ],
    closing: [
      "Every single lesson provides both interactive executive presentation slides and a comprehensive written lesson detailing step-by-step execution.",
      "Stop wasting money on paid ads. Master the art of direct value delivery and build an enduring, highly profitable client roster today."
    ]
  },
  targetAudience: [
    "Freelancers and consultants who want to transition to high-ticket recurring retainers",
    "Agency founders looking to reduce client acquisition costs and eliminate ad spend",
    "Solopreneurs wanting to reach $10,000+/month with minimal overhead and zero employees",
    "Service providers who struggle with cold outreach and want a proven value-first methodology"
  ],
  includes: [
    { iconName: "layers", text: "7 Modules & 28 High-Impact Lessons" },
    { iconName: "file-text", text: "Interactive Slide Presentations & Deep Written Implementation Guides" },
    { iconName: "video", text: "Proven DM Outreach Scripts, Loom Teardown Frameworks & Pitch Templates" },
    { iconName: "infinity", text: "Lifetime Access & Continuous Curriculum Updates" },
    { iconName: "shield-check", text: "Verified Certificate of Completion" }
  ],
  testimonials: [
  {
    "name": "Marcus Vance",
    "role": "Solo Systems Operator",
    "rating": 5,
    "quote": "Following these exact zero-ad methods allowed me to sign my first 3 B2B retainers in under 3 weeks. No ad spend, pure profit.",
    "initials": "MV",
    "date": "October 2026"
  },
  {
    "name": "Elena Rostova",
    "role": "Automation Consultant",
    "rating": 5,
    "quote": "The written lessons provide more tactical depth than multi-thousand dollar courses. Everything is mathematically grounded.",
    "initials": "ER",
    "date": "October 2026"
  }
],
  faqs: [
  {
    "question": "Do I need coding or machine learning experience to apply this Playbook?",
    "answer": "No. All frameworks, prompt schemas, and automation setups are designed for non-technical solo founders using modern tools like Claude, ChatGPT, Make.com, and Airtable."
  },
  {
    "question": "How quickly can I realistically reach $10,000/month?",
    "answer": "Operators who execute the 60-to-90-minute daily acquisition protocol consistently typically secure their first pilot within 14 days and scale to 4\u20135 retainers or creator partnerships within 60 to 90 days."
  },
  {
    "question": "Are the slides and written guides included with purchase?",
    "answer": "Yes. Every lesson includes both an interactive executive slide presentation and an in-depth, step-by-step written implementation guide with full lifetime access."
  }
],
  modules: ZERO_AD_CUSTOMERS_MODULES.map((mod) => ({
    id: mod.id,
    number: mod.number,
    title: mod.title,
    duration: mod.duration,
    lessonsCount: mod.lessons.length,
    lessons: mod.lessons.map((l) => ({
      id: l.id,
      number: l.number,
      title: l.title,
      duration: l.duration
    }))
  }))
};
