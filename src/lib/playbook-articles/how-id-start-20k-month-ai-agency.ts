import { PlaybookArticle } from "./types";

export const HOW_ID_START_20K_MONTH_AI_AGENCY_ARTICLE: PlaybookArticle = {
  slug: "how-id-start-a-20k-month-ai-agency-with-claude-in-30-days",
  title: "How I'd Start a $20K/Month AI Agency With Claude in 30 Days",
  readingTime: "35 min read",
  categoryName: "AI",
  categorySlug: "ai-businesses",
  thumbnail: "",
  publishedDate: "November 2026",
  authorName: "Nathan Cole",
  authorTitle: "Commercial Deal Architect & Agency Strategist",
  introParagraphs: [
    "How I'd Start a $20K/Month AI Agency With Claude in 30 Days\nA practical 30-day operating playbook for niche selection, offer design, client acquisition, sales, and delivery",
    "The operating idea:\nThe model in this playbook is an AI implementation agency built around a clear division of labour: you originate and manage the deal (finding expensive business problems, shaping offers, selling outcomes, and maintaining relationships), while a qualified technical partner builds the solution. The client pays for a business result, not a collection of AI tools.",
    "Claude is deployed as a research, analysis, writing, and planning assistant—investigating candidate niches, analyzing discovery call transcripts, drafting audit decks, writing personalized outreach variations, and structuring scopes of work. It does not replace real human conversations, technical verification, or accountable delivery.",
    "The title sets a $20,000-per-month ambition and a 30-day launch window. Treat $20K/month as a strategic benchmark to model toward rather than a guaranteed outcome. This is a demanding B2B sales and delivery business involving research, prospecting, diagnosis, proposals, developer coordination, client support, and ongoing responsibility.",
    "Follow the sequence systematically: select three candidate niches, validate through operator conversations, craft outcome-driven offers, launch multi-channel acquisition, execute the two-call sales method, scope with developer partners, collect deposits, and scale through recurring retainers."
  ],
  chapters: [
    {
      id: "chapter-1",
      number: 1,
      title: "Part I — Understand the Agency Model",
      paragraphs: [
        "1.1 You are the deal originator, not necessarily the developer\nA deal originator finds a business with an expensive operational problem, sells a well-defined solution tied to a measurable outcome, and coordinates a capable developer or implementation partner to build it. This separates account ownership from coding. However, you must understand the architecture: what the system does, which APIs it connects to, how exceptions are handled, and how success is measured.",
        "1.2 Why partner-led delivery reduces fixed payroll risk\nHiring full-time engineers creates immediate fixed monthly overhead whether or not you close deals. Engaging project-based technical partners aligns delivery costs directly with closed client revenue. Project Gross Margin = Client Project Revenue − Partner Delivery Cost − Software/Infrastructure Costs. Always obtain written developer quotes and defined acceptance criteria before signing client agreements.",
        "1.3 Sell the business outcome; AI is merely the mechanism\nBusiness owners do not purchase 'voice AI receptionists' or 'AI CRM systems'—they purchase fewer missed enquiries, faster speed-to-lead, more booked appointments, and lower administrative labor. Translate technical features into commercial outcomes: a voice AI receptionist means more captured calls; automated speed-to-lead means higher lead-to-job conversion.",
        "1.4 Solution families and client-agency responsibilities\nViable solutions include missed-call text-back, inbound receptionists, custom quoting agents, and full CRM overhauls. Establish clear contractual boundaries: you diagnose, scope, coordinate implementation, test, and support; the client provides accurate operational data, system access, and testing personnel."
      ],
      callout: {
        type: "info",
        title: "The Deal-Originator Equation",
        content: "Gross Project Contribution = Client Contract Value − Developer Partner Fee − API/Hosting Infrastructure − Testing & Buffer Allowance (10%). Never sell an unvetted custom build without confirmed developer scoping."
      }
    },
    {
      id: "chapter-2",
      number: 2,
      title: "Part II — Days 1–3: Choose Three Niches",
      paragraphs: [
        "2.1 The three-niche portfolio strategy\nStarting with only one niche is fragile, while targeting ten dilutes messaging. Select three distinct candidates: Niche A (Your Background — where you have existing relationships and speak the lingo), Niche B (Undervalued & High-Ticket — where solved problems yield substantial financial impact), and Niche C (Recurring Demand — where continuous customer workflows create natural monthly retainers). Shorthand: A pays first, B pays biggest, C pays forever.",
        "2.2 Candidate niche scorecard\nEvaluate each candidate from 1 to 5 across six factors: Ability to Pay, Pain Intensity, Urgency, Decision-Maker Reachability, Repeatability Across Businesses, and Delivery Feasibility. Prioritize niches where owners have budget, clearly recognize their operational friction, and feel urgent pressure to fix it.",
        "2.3 Claude prompts for niche research and prospect list building\nDeploy Claude to generate candidate B2B sectors, score operational feasibility, and organize publicly observable lead workflows for target companies in the $1M–$10M revenue range. Capture company names, decision-makers, visible customer contact channels, and observable lead friction. Manually verify all AI-generated research before initiating outreach.",
        "2.4 The 48-hour decision deadline and operator discovery\nLimit niche research to a strict 48-hour sprint. Conduct five informal discovery conversations per niche with real operators. Ask where enquiries get lost, what happens after hours, and what manual tasks consume staff hours. Use the 20-conversation test to identify repeatable pain and customer language."
      ]
    },
    {
      id: "chapter-3",
      number: 3,
      title: "Part III — Days 4–7: Design an Offer People Can Understand",
      paragraphs: [
        "3.1 Outcome-driven offer framing\nA weak offer describes technology: 'We build voice AI bots.' A strong offer articulates a transformation: 'We help high-volume service businesses respond to missed enquiries within 60 seconds so fewer potential jobs disappear before staff can follow up.' Formula: We help [specific buyer] achieve [specific outcome] within [time frame] using [mechanism].",
        "3.2 The low-friction 'wedge' strategy\nNever open negotiations with a complex $50,000 digital overhaul. Lead with a narrow, high-value wedge—such as missed-call text-back or an after-hours booking assistant. Once the initial system proves commercial value and builds trust, expand into CRM integrations, custom quoting agents, and automated follow-up funnels around days 60 and 120.",
        "3.3 Value-based pricing and scope management\nPrice against business impact while anchoring to developer costs. Quote in stages: price the initial proof-of-concept phase firmly, and outline subsequent phases as future options. If a prospect hesitates on price, reduce the project scope (e.g. limit to one location or single integration) rather than discounting your rates."
      ],
      callout: {
        type: "info",
        title: "The Scope-First Negotiation Rule",
        content: "When a prospect pushes back on price, never slash your fees for the same deliverable. Remove secondary integrations, limit user seats, or narrow deployment to a single branch. Preserve your price integrity by reducing deliverable scope."
      }
    },
    {
      id: "chapter-4",
      number: 4,
      title: "Part IV — Days 8–21: Build a Consistent Acquisition Engine",
      paragraphs: [
        "4.1 Multi-channel acquisition architecture\nAvoid relying on a single outreach route. Deploy a diversified acquisition engine: phone prospecting, personalized cold email, LinkedIn connections, referral partnerships, and educational content. Ensure strict compliance with platform terms, anti-spam legislation, and do-not-call registries.",
        "4.2 Phone prospecting and cold outreach systems\nFor phone prospecting, enforce the discipline: One caller, one niche, one block. Maintain fluency in industry terminology. Open with genuine operational inquiries: 'When [event] happens after hours, what does your team usually do next?' For cold email, avoid generic bulk mailers; send concise, highly personalized messages highlighting one verifiable observation about their customer journey.",
        "4.3 Using AI to accelerate prospecting and preparation\nDeploy Claude to analyze prospect websites, draft discovery questionnaires, turn call notes into structured diagnostic audits, and script tailored demonstration scenarios. Never upload confidential client data without permission, and scrub sensitive details.",
        "4.4 Demonstrations and strategic referral partnerships\nBuild interactive, tailored workflow demos showing an incoming call being transcribed, qualified, and routed into a CRM. Partner with complementary non-competing service providers—such as web design agencies, SEO firms, or industry consultants—who already serve your ideal clients, establishing written referral commission terms."
      ]
    },
    {
      id: "chapter-5",
      number: 5,
      title: "Part V — Days 20–30: Run a Two-Call Sales Process",
      paragraphs: [
        "5.1 The two-call sales methodology\nClosing a complex custom AI project on a single call creates excessive friction. Split the sales cycle into two stages: Call One (30-Minute Free AI Audit & Workflow Diagnosis) and Call Two (Tailored Demonstration, Scope Presentation & Close). This gives you time to validate technical feasibility and obtain firm developer pricing.",
        "5.2 Call One diagnostic framework\nSpend Call One diagnosing the business: lead sources, response times, after-hours handling, software tools, and operational impact. Ask the keystone question: 'What got you to want to implement AI in your business today?' Listen to uncover the real operational failure or growth goal.",
        "5.3 Scoping between calls and preparing Options A & B\nBetween calls, obtain written estimates from your developer partner and structure a two-tier proposal: Option A (Focused Pilot addressing the single acute pain point) and Option B (Comprehensive Implementation covering multi-workflow automation). Both options must be complete, viable, and fully deliverable.",
        "5.4 Call Two presentation, deposit collection, and objection handling\nRestate the client's problem in their own words, present the tailored demo, walk through delivery milestones, and present commercial terms. Collect an agreed deposit (typically 50% upfront) before beginning any technical work. If the prospect hesitates, revisit the diagnosed pain point rather than offering immediate price discounts."
      ],
      callout: {
        type: "info",
        title: "The Keystone Discovery Question",
        content: "Always ask: 'What got you to want to implement AI in your business today?' The prospect's exact answer reveals their deepest commercial urgency—whether a lost enterprise deal, severe staffing shortages, or leadership mandates. Anchor your proposal directly to their words."
      }
    },
    {
      id: "chapter-6",
      number: 6,
      title: "Part VI — Deliver the Project and Retain the Client",
      paragraphs: [
        "6.1 Post-sale onboarding and kickoff protocols\nNever go silent after collecting the deposit. Schedule an immediate kickoff meeting, reconfirm project objectives, collect necessary API and software credentials using secure password management, establish communication channels, and publish a structured 4-week delivery roadmap.",
        "6.2 Technical delivery governance and safeguards\nImplement strict data security: access only necessary systems, separate staging environments, and verify data retention policies. Establish fail-safe escalation triggers: if an AI model encounters an edge case, it must route cleanly to human staff with full context logging. Never claim an AI system is 100% autonomous.",
        "6.3 The 30-day review and recurring retainers\nReturn 30 days after deployment to conduct a formal performance review. Compare actual lead capture and response velocity against baseline metrics. Fix operational snags, document staff feedback, and transition the relationship into a monthly recurring service agreement covering hosting, model updates, monitoring, and workflow optimization."
      ]
    },
    {
      id: "chapter-7",
      number: 7,
      title: "Part VII — Build the $20K/Month Model & Execution Sprint",
      paragraphs: [
        "7.1 Deconstructing the $20K/month model\nDistinguish between signed contract value, cash collected, and monthly recurring revenue (MRR). A $20,000/month agency can be structured as: Model A (Project-Led: Two $10K implementations/month), Model B (Hybrid: One $8K project + 12 clients at $1,000/mo retainer), or Model C (Retainer-Led: 20 active clients at $1,000/mo). Choose the model that matches your delivery capacity.",
        "7.2 Pipeline math and conversion tracking\nTrack your full funnel: Outreach Attempts → Connections → Qualified Conversations → Booked Audits → Attended Demos → Closed Deals. Base future revenue projections on your own verified conversion rates rather than optimistic assumptions.",
        "7.3 Week-three resilience and founder operating rhythm\nMany agency founders quit during week three when initial cold outreach generates rejection before closing deals. Build psychological immunity: separate rejected offers from self-worth, measure controllable inputs (audits delivered, calls made) over lagging outcomes, and maintain a disciplined daily operating schedule.",
        "7.4 The 30-day execution sprint roadmap\nExecute in four focused waves: Days 1–3 (Niche Selection & Hypothesis Scoring), Days 4–7 (Operator Interviews & Offer Design), Days 8–21 (Multi-Channel Outreach & Discovery Audits), and Days 20–30 (Tailored Demos, Scoped Proposals, Deposit Collection & Kickoff)."
      ]
    }
  ],
  closingParagraphs: [
    "An AI implementation agency is not built on complex custom coding or speculative hype; it succeeds by bridging the gap between expensive business inefficiencies and proven automation workflows.",
    "By adopting the deal-originator model, you leverage technical partners for execution while focusing your energy on client acquisition, problem diagnosis, and account stewardship.",
    "Commit to the 30-day execution sprint: choose your three niches, validate operator pain, engineer outcome-led offers, run the two-call sales process, and build an agency anchored in positive unit economics and lasting recurring value."
  ]
};
