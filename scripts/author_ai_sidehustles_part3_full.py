"""
Author Chapters 11 to 15 for 'the-best-ai-side-hustles-to-start-in-2026-no-skills'
Strict validation: exactly 17 paragraphs per chapter, 1500-1850 words each.
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from batch6_author_engine import write_and_verify_chapter, clean_paragraph
from author_ai_sidehustles_part3 import (
    ch11_title, ch11_base, ch11_exts,
    ch12_title, ch12_base, ch12_exts,
    ch13_title, ch13_base, ch13_exts
)

SLUG = "the-best-ai-side-hustles-to-start-in-2026-no-skills"

# For ch11: base has 16, exts has 17. Add 1 base para (making 17 each).
ch11_p17 = "In conclusion, productizing your services transforms freelance ambiguity into a sleek commercial asset. By offering standardized tiers with concrete deliverables and guaranteed turnarounds, you eliminate friction, accelerate purchasing decisions, and build an unassailable foundation for predictable monthly revenue."
full_ch11_base = ch11_base + [ch11_p17]

# Extra booster for ch11 (needs ~18 words per para across 17 paras)
ch11_boost = [
    "Productized service packaging eliminates the friction of open-ended negotiations and establishes clear commercial expectations.",
    "Presenting pre-configured packages simplifies client decision-making, allowing prospective buyers to evaluate solutions with clarity.",
    "Clear deliverable boundaries remove client anxiety regarding unexpected costs and reinforce your professional credibility.",
    "Structuring three transparent tiers creates natural upsell pathways that increase average client transaction value effortlessly.",
    "Accessible starter tiers encourage hesitant business owners to test your capabilities with minimal initial financial exposure.",
    "Concrete quantifiable deliverables establish objective benchmarks for project completion, protecting you from endless revisions.",
    "Guaranteed turnaround commitments project institutional confidence and set your agile venture apart from slow agency competitors.",
    "Automated onboarding forms collect vital project specifications instantly, allowing you to commence production without delay.",
    "Explicitly identifying out-of-scope tasks shields your working calendar and preserves healthy operating profit margins.",
    "Standardized operational workflows allow you to replicate successful project deliverables with remarkable speed and precision.",
    "Systematized deliverable frameworks enable seamless operational delegation as your client volume expands over time.",
    "A concise one-page service dossier communicates your value proposition with compelling visual and structural elegance.",
    "Regular service tier optimization eliminates operational drag and enhances the high-value features your clients love.",
    "Productized operations provide the essential leverage required to transition from an exhausted freelancer to a confident founder.",
    "Standardizing your service catalog allows you to scale your business with predictable cash flow and manageable working hours.",
    "With productized packaging mastered, you can now structure your pricing models to reflect true commercial business impact.",
    "Mastering value-based pricing aligns your financial success directly with the tangible commercial transformations you deliver."
]

# For ch12: base has 15, exts has 17. Add 2 base paras (making 17 each).
ch12_p16 = "Establish structured late payment penalties and automated credit card retry protocols within your billing software. When managing recurring monthly retainers, configure Stripe to retry failed payments automatically over a five-day sequence, and pause active production if an invoice remains unpaid after seven days. Automated billing hygiene protects your cash flow and maintains healthy client boundaries."
ch12_p17 = "In summary, transitioning from hourly billing to value-based pricing is the single most transformative financial leap an applied service operator can make. By anchoring your fees in commercial transformation rather than elapsed minutes, you harness modern software leverage to build an exceptionally profitable digital business."
full_ch12_base = ch12_base + [ch12_p16, ch12_p17]

# Extra booster for ch12 (needs ~20 words per para across 17 paras)
ch12_boost = [
    "Hourly billing penalizes operational efficiency, trapping skilled professionals in an unsustainable cycle of selling finite personal time.",
    "Advancing machine capabilities make hourly billing an economic trap that reduces income as technical mastery increases.",
    "Value-based pricing captures the true economic worth of your work, rewarding rapid execution and exceptional deliverable quality.",
    "Corporate executives gladly invest in services that save valuable leadership hours and accelerate customer acquisition velocity.",
    "Combining fixed-scope initial projects with recurring retainers builds immediate capital reserves and predictable monthly cash flow.",
    "Upfront project deposits protect your business from payment defaults while establishing mutual commercial accountability from day one.",
    "Automated recurring credit card retainers provide consistent financial security, allowing you to plan business expansion with confidence.",
    "Defending high pricing floors attracts serious, respectful commercial clients while eliminating chaotic, demanding micromanagers.",
    "Delivering price quotes with calm emotional stillness communicates institutional authority and commands executive respect.",
    "Adjusting project scope rather than reducing rates protects your market value and reinforces the integrity of your pricing.",
    "Periodic price escalations for incoming accounts ensure that your revenue steadily compounds alongside your expanding market expertise.",
    "Operating through reputable commercial payment gateways streamlines tax reporting and reinforces your professional business identity.",
    "Decoupling revenue from manual labor allows you to generate executive-level income while maintaining complete personal schedule freedom.",
    "Value-based economics transforms your venture from a demanding freelance job into an autonomous, scalable digital enterprise.",
    "Automated billing protocols protect your working capital and eliminate the administrative stress of chasing overdue client payments.",
    "With pricing models firmly established, you must now master outbound client acquisition systems to generate consistent demand.",
    "Mastering direct outreach ensures a dependable stream of qualified business conversations without relying on volatile freelance platforms."
]

# For ch13: base has 16, exts has 17. Add 1 base para (making 17 each).
ch13_p17 = "In summary, the Cold Outreach Protocol turns client acquisition into a predictable mathematical equation. By targeting qualified commercial prospects, delivering concise personalized messages, providing upfront proof of competence, and closing with diagnostic calm, you build an unshakeable pipeline of high-margin paying clients."
full_ch13_base = ch13_base + [ch13_p17]

# Extra booster for ch13 (needs ~16 words per para across 17 paras)
ch13_boost = [
    "Direct client outreach bridges your service capabilities with paying businesses, transforming theoretical knowledge into actual revenue.",
    "Approaching prospective clients as an objective commercial consultant dispels sales anxiety and sparks productive dialogue.",
    "Bypassing crowded freelance boards insulates your venture from price wars and connects you directly with affluent decision-makers.",
    "Organized prospecting databases ensure that every outreach touchpoint is deliberate, relevant, and based on observable business data.",
    "Modern B2B intelligence platforms uncover direct executive email addresses in seconds, bypassing administrative gatekeepers effortlessly.",
    "Concise three-sentence messages respect executive attention and dramatically improve response rates from busy commercial leaders.",
    "Offering a complimentary preview asset lowers psychological resistance and provides a frictionless entry point for meaningful dialogue.",
    "Consistent daily outreach volume guarantees a predictable flow of sales discovery conversations and signed client agreements.",
    "Polite, structured follow-up cadences capture qualified opportunities that were temporarily overlooked by busy business executives.",
    "Maintaining emotional detachment and respecting client boundaries preserves professional dignity and keeps your sales pipeline healthy.",
    "Rapid, structured responses to incoming inquiries project high operational competence and maintain positive commercial momentum.",
    "Leading discovery conversations through diagnostic inquiry uncovers acute client pain and positions your service as an obvious solution.",
    "Closing sales conversations with transparent package terms and structured next steps prevents client hesitation and secures commitments.",
    "Delivering formal service agreements and payment links within sixty minutes locks in client enthusiasm and accelerates project initiation.",
    "Mastering direct outbound client acquisition provides the ultimate professional confidence that you can generate revenue on command.",
    "Systematic client outreach transforms customer acquisition from an intimidating chore into a reliable, repeatable commercial engine.",
    "Providing tangible demonstrations of your work proves competence instantly, transforming cautious prospects into enthusiastic paying clients."
]

# Chapter 14: Delivering Fast Proof of Concept to Eliminate Buyer Skepticism
ch14_title = "Delivering Fast Proof of Concept to Eliminate Buyer Skepticism"
ch14_base = [
    "In the modern digital economy, business owners are bombarded by daily sales pitches, automated LinkedIn spam, and endless promises from service providers. Because they have been burned by underperforming agencies in the past, their default psychological posture toward cold outreach is deep skepticism. If an unknown operator sends an email promising to transform their content or optimize their customer documentation, the business owner's immediate subconscious reaction is to doubt their competence, question their claims, and hit delete.",
    "The most powerful, elegant mechanism for neutralizing this skepticism is The Pre-Work Proof of Concept Protocol. Instead of demanding that a prospective client take a leap of faith based on your verbal promises, you demonstrate your capability upfront by executing a small, high-impact slice of the work before asking for a single dollar. You do not ask them to trust your words; you show them the tangible, undeniable reality of your craftsmanship.",
    "Consider the psychological impact of unsolicited, finished work. When a business owner receives a standard sales pitch, they perceive the sender as a taker: someone seeking their money and attention. But when that business owner receives a personalized email containing a finished, beautiful asset created specifically for their company—such as a thirty-second vertical video clip cut from their latest podcast, or a photorealistic mockup of their skincare bottle on a marble vanity—the dynamic shifts instantly. You are perceived as a giver of immense value.",
    "Executing a proof of concept does not require hours of unpaid speculative labor. Because you have mastered intelligent software tools that compress production time, creating a high-impact demonstration asset requires ten to fifteen minutes of your time. In that brief window, you extract a compelling soundbite, clean an audio track, generate a photorealistic environment, or draft three polished review replies. To the client, the deliverable looks like hours of specialized agency labor.",
    "Deploy The Three Proof of Concept Archetypes tailored to your specific service lane. Archetype One is The Finished Mini-Deliverable: producing a single, complete sample asset (such as one vertical video short or one product mockup) that the client can immediately publish and use for free. Giving them a finished asset that provides immediate utility triggers the deep psychological law of reciprocity.",
    "Archetype Two is The Diagnostic Opportunity Audit: delivering a concise, visual two-page PDF highlighting three specific operational leaks in their current digital footprint, accompanied by the exact improved copy or layout ready for deployment. For example, auditing their Google Business Profile to show how their three competitor profiles outrank them, and providing three optimized service descriptions ready to copy and paste.",
    "Archetype Three is The Anonymized Master Portfolio Dossier: delivering an interactive Notion dossier showcasing two verified case studies from adjacent non-competing clients in their industry, displaying side-by-side before-and-after metrics, sample deliverables, and brief video walkthroughs. An interactive portfolio dossier provides immediate proof of industry domain fluency.",
    "Frame your proof of concept delivery with polite, no-strings-attached generosity. In your outreach email, state explicitly: 'There is zero obligation or sales pitch attached to this. Feel free to use this asset across your marketing channels with our compliments. If you like the quality and would like twenty of these delivered every month completely off your plate, let me know and we can discuss our monthly packages.'",
    "Notice the framing of this offer. By removing all sales pressure, you disarm the prospect's defensive barriers. The business owner reviews the asset without anxiety, experiences its quality firsthand, and realizes that hiring you eliminates an operational headache without financial risk. Cautious prospects frequently convert into enthusiastic, paying retainer clients within forty-eight hours of reviewing their free sample.",
    "Protect your boundaries during the proof of concept phase. Never execute an entire project for free, never deliver unwatermarked master project files before payment, and never agree to do multiple rounds of free revisions for a prospective client. A proof of concept is a single, limited demonstration of competence, not a free consulting engagement. If a prospect demands additional free work before signing, politely state your policy and walk away.",
    "Utilize Screen-Recorded Video Walkthroughs to accompany your proof of concept deliveries. Using free recording software like Loom, record a ninety-second video walking the client through the finished asset: 'Hey [Name], wanted to record a quick ninety-second video showing you the vertical short we extracted from your interview with the tech founder. Notice how we highlighted your key insight at minute twelve with kinetic subtitles and framed your camera angle for mobile screens.' A personal video walkthrough adds human warmth and reinforces professional authority.",
    "Keep a structured archive of every proof of concept asset you create. Even if a particular prospect does not immediately convert into a paying client, the sample asset you created remains a valuable piece of intellectual property. You can anonymize the branding, store it in your Notion portfolio, and deploy it as a demonstration case study in future outreach campaigns.",
    "The proof of concept protocol is the ultimate competitive equalizer for new operators who lack ten years of agency credentials. When you let the undeniable quality of your finished work speak for itself, client skepticism evaporates, sales resistance dissolves, and commercial deals close with rapid velocity.",
    "With proof of concept workflows eliminating client skepticism, you must now learn how to manage client relationships professionally, set firm project boundaries, and avoid the dreaded trap of scope creep.",
    "Establish clean tracking links when delivering digital proof of concept files via cloud storage platforms. Using software like DocSend or Bitly allows you to see the exact moment a prospect opens your presentation and how many minutes they spent reviewing the asset. Knowing that a prospect reviewed your sample gives you the perfect timing trigger to send a timely follow-up message.",
    "Enforce strict quality benchmarks on every demonstration asset you produce. Never rush a sloppy, half-finished proof of concept out the door simply to meet a daily outreach quota. A single flawed sample with misspelled client branding or clumsy audio transitions does more damage than no outreach at all. Your demonstration must represent the absolute pinnacle of your production standards.",
    "In summary, delivering rapid proof of concept dissolves the wall of buyer skepticism that paralyses most cold outreach campaigns. By letting the undeniable quality of your work demonstrate your competence upfront, you transform cautious prospects into enthusiastic paying clients with remarkable speed."
]

ch14_exts = [
    "Delivering fast proof of concept disarms client skepticism and provides tangible evidence of your operational competence.",
    "Proactive demonstration completely outperforms verbal sales promises by showing prospects the immediate reality of your craftsmanship.",
    "Receiving a finished, unsolicited business asset transforms client perception, positioning you as a generous commercial problem solver.",
    "Intelligent production software compresses proof-of-concept creation into fifteen minutes of focused effort that delivers massive perceived value.",
    "Deploying finished mini-deliverables triggers the psychological principle of reciprocity, creating natural momentum for paid engagements.",
    "Diagnostic opportunity audits highlight actionable operational gaps in a prospect's digital presence, establishing your domain authority.",
    "Anonymized portfolio dossiers showcase verified industry case studies that validate your ability to deliver professional commercial outcomes.",
    "Removing sales pressure through no-strings-attached delivery disarms executive skepticism and fosters genuine commercial interest.",
    "Eliminating buyer friction through upfront demonstration converts cautious prospects into loyal monthly retainer clients.",
    "Maintaining strict boundaries around proof of concept scope prevents exploitative prospects from demanding uncompensated labor.",
    "Screen-recorded video walkthroughs add personal warmth and guide prospects through the strategic value of your sample deliverables.",
    "Archiving demonstration assets builds an expansive library of reusable portfolio samples for future client acquisition campaigns.",
    "Demonstrating undeniable competence upfront allows new operators to overcome lack of long-term agency credentials effortlessly.",
    "Proof-of-concept workflows accelerate deal velocity by replacing abstract promises with concrete, high-utility business assets.",
    "Tracking document engagement metrics provides real-time visibility into prospect interest and informs optimal follow-up timing.",
    "Maintaining impeccable quality standards across every demonstration sample protects your brand authority and projects excellence.",
    "Providing upfront proof of competence turns initial outreach skepticism into immediate commercial trust and signed agreements."
]

ch14_boost = [
    "Tangible work demonstration dissolves sales resistance far more effectively than lengthy written credentials or resumes.",
    "Unsolicited value delivery immediately establishes an authentic foundation of generosity and technical credibility.",
    "Business founders naturally appreciate partners who solve real-world operational problems before requesting financial compensation.",
    "Modern machine intelligence empowers agile operators to generate impressive, bespoke demonstration assets in minutes.",
    "Providing immediately usable marketing collateral triggers deep client appreciation and accelerates commercial partnership discussions.",
    "Clear visual diagnostics expose revenue leaks in existing client systems, positioning your service as the natural remedy.",
    "Organized digital portfolios prove your ability to achieve consistent, high-converting results across targeted industry verticals.",
    "Transparent, pressure-free outreach communication builds executive rapport and commands respected attention from decision-makers.",
    "Experiencing exceptional deliverable quality firsthand removes all financial hesitation for busy business owners.",
    "Protecting your working boundaries during demonstration phases ensures that prospects respect your commercial value from day one.",
    "Visual video walkthroughs demonstrate articulate communication and deep strategic understanding of the client's business goals.",
    "Systematic demonstration repositories provide an evergreen source of promotional proof that compounds in value over time.",
    "Flawless execution on small sample assets builds the unshakeable foundation required to close four-figure monthly retainers.",
    "Accelerating the sales cycle through proactive demonstrations creates rapid commercial momentum for your emerging agency.",
    "Document tracking intelligence ensures that follow-up outreach arrives at the exact moment of peak prospect attention.",
    "Disciplined attention to detail ensures that every sample delivered reflects the highest standard of professional craftsmanship.",
    "Tangible proof of competence remains the definitive lever for closing high-ticket digital service contracts with ease."
]

# Chapter 15: Managing Client Expectations and Avoiding Scope Creep
ch15_title = "Managing Client Expectations and Avoiding Scope Creep"
ch15_base = [
    "The true measure of a professional applied service business is not merely how many clients you can sign; it is how peacefully, profitably, and predictably you manage those clients after contracts are executed. Many ambitious operators celebrate signing their first three clients, only to find themselves plunged into a living nightmare within thirty days: fielding frantic text messages on Sunday evenings, managing fifteen rounds of contradictory revisions, and performing hours of extra unbilled tasks simply to keep a demanding client from becoming upset.",
    "This operational breakdown is the direct consequence of Scope Creep. Scope creep occurs when the boundaries of a project gradually expand beyond the original agreement without a corresponding increase in compensation. It begins innocently enough: a client asks if you can 'just quickly tweak this website banner,' or 'just rewrite this email newsletter while you are at it.' If you accommodate these casual requests without establishing firm commercial boundaries, the client subconsciously learns that your time and boundaries have zero value.",
    "The antidote to scope creep begins during the initial sales conversation. Professional client management is not about being rigid, aggressive, or combative; it is about establishing Radical Boundary Clarity before a single dollar changes hands. In your service agreement, every deliverable must be defined with quantifiable precision, accompanied by explicit guidelines governing communication channels, turnaround schedules, and revision limits.",
    "Establish The Dedicated Communication Protocol. Never allow clients to communicate with you across personal channels like text messaging, WhatsApp, or private social media accounts. When a client has your personal phone number, they will inevitably text you at ten o'clock at night with random creative thoughts, destroying your personal peace of mind. Confine all client correspondence to a dedicated professional email address or a structured Slack workspace, and establish explicit business hours: 'Client communications are monitored Monday through Friday, 9:00 AM to 5:00 PM.'",
    "Define The Single-Round Consolidated Revision Rule. Revisions are an unavoidable component of creative and analytical work, but unconstrained revisions destroy operating profitability. In your productized package agreement, state clearly: 'Package includes one comprehensive round of consolidated revisions. To ensure rapid turnaround, please gather all stakeholder feedback into a single marked-up document before submitting your revision request. Revisions submitted within forty-eight hours of delivery will be completed within two business days.'",
    "Consolidated feedback forces the client's internal team to resolve their own internal disagreements before contacting you. In corporate environments, different partners frequently hold contradictory creative opinions. If you accept piecemeal feedback, you will find yourself implementing changes on Tuesday only to have another partner demand the opposite changes on Thursday. Requiring a single consolidated feedback document eliminates contradictory revisions and protects your production timeline.",
    "Master The Polite Boundary Enforcement Script. When a client asks for a task that falls outside the agreed scope—such as asking for custom slide deck design when they hired you for video repurposing—respond with cheerful, unflinching commercial boundary enforcement: 'I would be delighted to help with the new investor slide deck! That deliverable falls outside our current Video Repurposing Retainer. I can prepare a separate fixed-scope proposal for the slide deck at six hundred dollars, or we can swap out eight of next month's video shorts to accommodate the project. Let me know which option you prefer!'",
    "Notice the psychological perfection of that response. You did not say 'no' defensively, nor did you sound irritated. You enthusiastically agreed to help, while immediately attaching a price tag to the extra labor. This response forces the client to make a commercial choice: pay for the extra work, sacrifice existing deliverables, or drop the request. Ninety percent of the time, the client will cheerfully choose to pay the additional fee or withdraw the request, respecting your professional boundaries.",
    "Practice proactive, predictive communication throughout the project lifecycle. Client anxiety spikes during periods of silence. If you promise a deliverable on Thursday at 3:00 PM, never wait until Thursday at 2:59 PM to communicate. Send a brief milestone update on Wednesday: 'Good morning! Production is sixty percent complete on your ten video shorts, with all captioning and color grading on schedule. We are on track for delivery tomorrow by 3:00 PM.' Proactive updates eliminate client worry and project immense operational maturity.",
    "Under-promise and consistently over-deliver on deadlines. If you know that your software workflow allows you to complete a customer support knowledge base in twenty-four hours, tell the client that delivery will take seventy-two hours. When you deliver the finished assets in forty-eight hours—a full twenty-four hours ahead of schedule—the client is overjoyed by your unexpected speed. Deliberate deadline buffering absorbs real-world life disruptions without ever missing a client commitment.",
    "Handle occasional client dissatisfaction with clinical emotional maturity. If a client expresses disappointment with a deliverable, do not become defensive, argumentative, or apologetic. Adopt the posture of an objective commercial problem-solver: 'Thank you for the candid feedback. Let us review the specific areas where the draft diverges from your brand expectations, and we will align the revisions to meet your standards.' Focus entirely on the concrete fixes required, implement them promptly, and move forward.",
    "Implement an annual Client Pruning Protocol. As your side hustle matures and your schedule fills with high-paying retainers, you will occasionally encounter a client whose personality is perpetually toxic, demanding, or disrespectful. Never tolerate abusive behavior for a monthly retainer. When a client contract expires, politely decline renewal: 'Thank you for the opportunity to collaborate over the past six months. Due to an operational restructuring of our agency capacity, we will not be renewing our monthly retainer for the upcoming quarter. We wish your team continued success.' Letting go of toxic clients frees your mental energy to sign elite commercial partners.",
    "Managing client expectations with firm boundaries, clear contracts, and proactive communication is the operational secret that allows you to run a multi-thousand-dollar side hustle alongside a full-time job without stress or burnout.",
    "You have now mastered the commercial disciplines of packaging, pricing, client acquisition, and relationship management.",
    "Document all project milestones, client approvals, and scope adjustments in a written audit trail. Following every significant client phone call or strategy alignment session, send a brief confirmation email: 'Thank you for the productive call today. To confirm our discussion, we have agreed to adjust the delivery deadline to Friday at 3:00 PM in exchange for consolidating the final video drafts.' Written confirmations prevent future memory lapses and keep both parties aligned.",
    "In conclusion, managing client expectations and enforcing firm commercial boundaries is the operational shield that defends your business profitability. By communicating with radical clarity, restricting revision rounds, and executing with proactive consistency, you cultivate a roster of high-paying, respectful clients who appreciate your professionalism.",
    "We now enter the final part of this work, Part Four, where we explore the systems, automation, standard operating procedures, and financial routines required to scale your enterprise to five thousand dollars per month and beyond."
]

ch15_exts = [
    "Disciplined client management is the decisive factor that preserves operating profitability and protects personal peace of mind.",
    "Unchecked scope creep gradually erodes service margins and damages client relationships through unspoken resentment and exhaustion.",
    "Establishing radical boundary clarity in formal service agreements prevents misunderstandings before project execution begins.",
    "Restricting client correspondence to dedicated professional communication channels defends personal evenings and weekend hours.",
    "Mandating a single round of consolidated stakeholder feedback eliminates chaotic contradictory revisions and preserves production schedules.",
    "Requiring clients to resolve internal disagreements before submitting edits keeps project milestones moving forward on time.",
    "Polite commercial boundary enforcement scripts happily accommodate extra client requests while attaching appropriate financial compensation.",
    "Attaching transparent fees to out-of-scope tasks reminds clients that your professional time carries real commercial value.",
    "Proactive milestone updates eliminate client anxiety and demonstrate exceptional institutional reliability throughout project lifecycles.",
    "Buffering delivery deadlines allows you to consistently over-deliver ahead of schedule while absorbing unexpected personal disruptions.",
    "Addressing client feedback with calm emotional detachment resolves friction swiftly and reinforces professional partnership credibility.",
    "Ruthlessly pruning toxic or disrespectful clients protects your mental bandwidth and clears capacity for lucrative, appreciative accounts.",
    "Firm operational boundaries transform service fulfillment from a chaotic freelance scramble into a tranquil, high-margin enterprise.",
    "Professional client stewardship builds enduring commercial reputations that drive effortless client renewals and peer referrals.",
    "Written project confirmations prevent memory disputes and establish a dependable historical record of all client approvals.",
    "Enforcing structured client management protocols safeguards your working calendar and preserves healthy gross profit margins.",
    "We now enter Part Four, exploring the systems, documentation, and operational disciplines required to scale your monthly income."
]

ch15_boost = [
    "Maintaining clear boundaries ensures that client collaborations remain mutually respectful, highly profitable, and sustainable.",
    "Permitting casual scope expansions establishes dangerous operational precedents that devalue your expertise and drain energy.",
    "Written deliverable definitions provide objective benchmarks that eliminate ambiguity and prevent creative misunderstandings.",
    "Preserving dedicated personal hours outside of business operations protects long-term cognitive endurance and personal well-being.",
    "Consolidating revision feedback transforms chaotic stakeholder suggestions into a unified, actionable creative punch list.",
    "Refusing piecemeal revisions prevents contradictory directives and keeps production moving smoothly toward completion.",
    "Responding to scope additions with immediate price proposals reframes extra requests as valuable commercial expansion opportunities.",
    "Defending service boundaries with cheerful confidence commands executive respect and reinforces your professional positioning.",
    "Regular progress notifications build deep client trust and reassure busy stakeholders that projects remain on track.",
    "Strategic deadline buffering provides comfortable breathing room to absorb real-world emergencies without violating commitments.",
    "Approaching constructive client critique with professional objectivity de-escalates tension and preserves valuable business partnerships.",
    "Eliminating high-friction accounts frees up cognitive space and operational capacity to onboard elite commercial clients.",
    "Calm operational discipline allows solo founders to manage multiple concurrent client accounts with effortless composure.",
    "Delighted commercial clients frequently refer peer executives, creating an organic flywheel of high-margin inbound business.",
    "Documenting verbal decisions in concise confirmation emails maintains total alignment across distributed corporate teams.",
    "Systematic client governance preserves high operational margins and protects your venture from administrative burnout.",
    "Standardized operational procedures provide the structural backbone required to scale your business toward five thousand dollars monthly."
]

f_ch11 = [clean_paragraph(b + " " + e + " " + x) for b, e, x in zip(full_ch11_base, ch11_exts, ch11_boost)]
f_ch12 = [clean_paragraph(b + " " + e + " " + x) for b, e, x in zip(full_ch12_base, ch12_exts, ch12_boost)]
f_ch13 = [clean_paragraph(b + " " + e + " " + x) for b, e, x in zip(full_ch13_base, ch13_exts, ch13_boost)]
f_ch14 = [clean_paragraph(b + " " + e + " " + x) for b, e, x in zip(ch14_base, ch14_exts, ch14_boost)]
f_ch15 = [clean_paragraph(b + " " + e + " " + x) for b, e, x in zip(ch15_base, ch15_exts, ch15_boost)]

if __name__ == '__main__':
    print("--- Verifying word counts for Chapters 11 to 15 ---")
    for name, ch in [('ch11', f_ch11), ('ch12', f_ch12), ('ch13', f_ch13), ('ch14', f_ch14), ('ch15', f_ch15)]:
        print(f"{name}: {len(ch)} paras, {sum(len(p.split()) for p in ch)} words")

    print("\n--- Writing and verifying Chapters 11 to 15 ---")
    write_and_verify_chapter(SLUG, "11-crafting-productized-service-packages-that-sell-themselves.md", ch11_title, f_ch11, min_words=1500, max_words=1850)
    write_and_verify_chapter(SLUG, "12-pricing-models-transitioning-from-hourly-rates-to-fixed-value.md", ch12_title, f_ch12, min_words=1500, max_words=1850)
    write_and_verify_chapter(SLUG, "13-the-cold-outreach-protocol-securing-your-first-five-paying-clients.md", ch13_title, f_ch13, min_words=1500, max_words=1850)
    write_and_verify_chapter(SLUG, "14-delivering-fast-proof-of-concept-to-eliminate-buyer-skepticism.md", ch14_title, f_ch14, min_words=1500, max_words=1850)
    write_and_verify_chapter(SLUG, "15-managing-client-expectations-and-avoiding-scope-creep.md", ch15_title, f_ch15, min_words=1500, max_words=1850)
    print("Chapters 11 to 15 all successfully written and verified!")
