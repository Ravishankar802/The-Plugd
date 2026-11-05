import type { PlaybookDetailData } from "../dating-playbook-detail";
import { BUILD_10K_WEBSITE_GPT6_MODULES } from "./how-to-build-a-10000-website-with-gpt-6-astra-full-tutorial-data";

export const BUILD_10K_WEBSITE_GPT6_DETAIL_DATA: PlaybookDetailData = {
  id: "ai-businesses-86",
  slug: "how-to-build-a-10000-website-with-gpt-6-astra-full-tutorial",
  title: "How To Build a $10,000 Website with GPT-6 Astra (Full Tutorial)",
  headline: "Build premium, client-ready websites with AI — from brand identity and custom design to working forms, deployment, and landing your first paying clients.",
  description: "**Build premium, client-ready websites with AI — from brand identity and custom design to working forms, deployment, and landing your first paying clients.**\n\nLearn how to turn GPT-6 Astra into your website-building partner, taking a project from the initial business brief to a polished, responsive website that's ready for real customers. Master branding, image generation, design refinement, mobile optimisation, lead-form integration, hosting, and deployment — then use your skills to find businesses, create demo websites, and pitch your services.\n\nIncludes reusable AI prompts, brand-kit workflows, website briefs, design checklists, deployment instructions, pricing worksheets, outreach templates, and a practical 7-day launch roadmap.",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  price: 3,
  originalPrice: 9,
  currency: "USD",
  discountPercentage: 67,

  rating: 4.9,
  ratingCount: "4.9k",
  studentsCount: "4,910",
  instructorName: "Diego Valera",
  instructorTitle: "Generative Web Architect & Digital Agency Strategist",
  instructorBio: "",
  instructorRating: 4.9,
  instructorReviews: "4.9k",
  instructorStudents: "4,910",
  instructorCourses: 2,
  lastUpdated: "11/2026",
  language: "English",
  subtitles: "English [Auto]",
  thumbnail: "https://res.cloudinary.com/cy3gfawr/image/upload/v1793023911/How_To_Build_a_10_000_Website_with_GPT_6_Astra_Full_Tutorial.png",
  hoursOfMaterial: "11.2 hours",
  modulesCount: 7,
  lessonsCount: 28,
  slidesCount: 112,
  accentColor: "#0284c7",
  whatYouWillLearn: [
    "Master the 8-point professional website benchmark spanning branding, layout, mobile UX, forms, and speed",
    "Engineer exhaustive business briefs and conversion-first section hierarchies that turn visitors into inbound leads",
    "Orchestrate GPT-6 Astra project workspaces to lock brand tokens, typography pairs, and cohesive asset libraries",
    "Deconstruct elite design references ethically and compile custom homepages with before-and-after sliders",
    "Deploy scope-locked revision prompts to refine layouts and add restrained CSS motion without code regressions",
    "Wire up live lead forms to secure webhooks with verified email/CRM delivery and honeypot spam protection",
    "Compress image weight by 70%+, achieve sub-second mobile loading speeds, and deploy to live domains with SSL",
    "Execute local B2B demo prospecting on Google Maps and close $3,000–$10,000 builds paired with monthly care retainers"
  ],
  relatedTopics: [
    "AI Web Design & Generation",
    "GPT-6 Astra Workflows",
    "Client-Ready Frontend Development",
    "Lead Form Integration & Webhooks",
    "Mobile Responsive Calibration",
    "B2B Agency Client Acquisition"
  ],
  requirements: [
    "A computer with internet access and a browser capable of accessing AI tools and hosting dashboards",
    "Basic familiarity with web concepts (domains, pages, forms) with no advanced coding experience required",
    "Willingness to follow structured quality checklists and conduct live end-to-end form and mobile tests",
    "An open, professional mindset ready to approach business prospects with tailored value-first demos"
  ],
  descriptionSections: {
    intro: [
      "Welcome to the definitive operating manual for How To Build a $10,000 Website with GPT-6 Astra (Full Tutorial). This playbook transforms generative web design from a casual experimental novelty into a structured, client-ready agency production engine.",
      "Rather than generating generic code snippets that look good in screenshots but fail in production, this curriculum provides the exact step-by-step frameworks, scope-locked prompts, component architectures, and deployment protocols required to build polished, responsive websites with working forms, fast load times, and custom domains.",
      "Every single lesson provides both an interactive, visual slide deck presentation and a comprehensive, in-depth written guide detailing step-by-step implementation."
    ],
    keyPointsTitle: "The Master Curriculum Overview",
    keyPoints: [
      "Act 1: The $10K Website Benchmark & Business Brief Architecture",
      "Act 2: Brand System Engineering & Asset Library Governance",
      "Act 3: Visual Inspiration Deconstruction & First-Draft Synthesis",
      "Act 4: Focused Design Refinement & Restrained Animation",
      "Act 5: Mobile Optimization, Functional Lead Forms & Performance",
      "Act 6: Production Hosting, Custom Domains & SSL Deployment",
      "Act 7: B2B Prospecting, Demo Pitching & High-Ticket Retainers"
    ],
    closing: [
      "Whether you are an aspiring freelancer wanting to offer client-ready web services, a digital agency owner looking to compress delivery timelines by 80%, or an independent builder launching your own digital venture, this playbook delivers the exact checklists, prompts, and workflows needed to succeed."
    ]
  },
  targetAudience: [
    "Freelancers and designers who want to charge premium $3,000–$10,000 fees by delivering complete, client-ready websites.",
    "Agency owners looking to deploy GPT-6 Astra to slash production hours while increasing design quality and profit margins.",
    "Digital builders who want to launch custom-branded, high-converting websites for their own ventures without hiring developers.",
    "Independent operators seeking a repeatable, high-leverage service business built on local B2B demo prospecting."
  ],
  includes: [
    { iconName: "layers", text: "7 Structured Modules & 28 Production Lessons" },
    { iconName: "presentation", text: "112 Visual Presentation Slides & 28 In-Depth Written Guides" },
    { iconName: "video", text: "Brand Kit Prompts, Master Build Schemas & Scope-Locked Revision Formulas" },
    { iconName: "file-text", text: "7-Day Client Launch Roadmaps, Form Webhook Blueprints & Pricing Worksheets" },
    { iconName: "infinity", text: "Full Lifetime Digital Access & All Future Curriculum Updates" },
    { iconName: "shield-check", text: "Official Certificate of Completion from The Plugd" }
  ],
  modules: BUILD_10K_WEBSITE_GPT6_MODULES.map((mod) => ({
    id: mod.id,
    number: String(mod.number),
    title: mod.title,
    description: mod.description,
    duration: "96 min",
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
      name: "Nathan",
      role: "Digital Agency Lead",
      rating: 5,
      quote: "Honestly, this made the whole website-building process feel much less intimidating. I especially liked how it starts with branding and the business brief instead of immediately generating random code. The prompts are incredibly useful.",
      initials: "N",
      date: "August 04 2026"
    },
    {
      name: "Gabriela",
      role: "Freelance Web Consultant",
      rating: 5,
      quote: "The section about turning a finished website into a service was my favourite. Finding businesses with outdated websites, creating a demo, and pitching the actual improvement is a much clearer approach than just trying to sell AI websites.",
      initials: "G",
      date: "August 08 2026"
    },
    {
      name: "Ethan",
      role: "Full-Stack Operator",
      rating: 5,
      quote: "I've experimented with AI website builders before, but usually ended up with something that looked good and barely worked. The form testing, mobile optimisation, deployment, and launch checklists make this playbook genuinely practical.",
      initials: "E",
      date: "August 14 2026"
    },
    {
      name: "Anjali",
      role: "Creative Director",
      rating: 5,
      quote: "Loved the attention to detail. The focused revision prompts alone are worth going through because they help prevent AI from changing five other things when you only wanted one small adjustment. A solid guide from start to finish.",
      initials: "A",
      date: "August 21 2026"
    }
  ],
  faqs: [
    {
      question: "What makes a website worth $10,000 to a business client?",
      answer: "A $10,000 website is not defined by complex custom code, but by its commercial effectiveness: bespoke branding, high-converting visitor journeys, touch-friendly mobile optimization, verified lead capture, sub-second load times, and professional deployment that consistently generates high-ticket customer enquiries."
    },
    {
      question: "How does GPT-6 Astra accelerate the website build process?",
      answer: "GPT-6 Astra acts as a multimodal design and engineering assistant within a persistent project workspace. It generates complete brand identity kits, custom photographic prompts, semantic responsive layouts, and interactive components while maintaining context continuity across all revision cycles."
    },
    {
      question: "How do I prevent AI from changing unrelated page elements during revisions?",
      answer: "Deploy the Scope-Locking Revision Formula: explicitly define the exact element to modify, describe the current issue and desired result, and strictly command the model to preserve all other sections, typography, colors, copy, and responsive behavior without making unrelated changes."
    },
    {
      question: "How do I find and pitch local businesses for high-ticket website services?",
      answer: "Search Google Maps for local businesses with 4.8+ ratings and dozens of positive reviews whose current websites are outdated or non-responsive. Build a private, tailored concept homepage addressing their specific weaknesses, and pitch the tangible commercial improvement rather than pitching the AI tool."
    }
  ]
};
