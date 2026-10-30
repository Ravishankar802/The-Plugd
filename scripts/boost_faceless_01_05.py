import re

with open("scripts/author_faceless_part1.py", "r", encoding="utf-8") as f:
    text = f.read()

new_ch01_exts = '''ch01_exts = [
    "Rejecting influencer vanity and embracing asset detachment allows an ambitious operator to build an autonomous digital media holding company with true enterprise value and equity durability.",
    "Delivering high-retention narratives through automated audiovisual pipelines proves that algorithmic distribution is governed by storytelling quality rather than creator fame, social clout, or personal celebrity.",
    "Asset detachment liberates you from filming fatigue and camera anxiety, enabling infinite horizontal scalability across dozens of niche channels simultaneously without operational bottlenecks or personal burnout.",
    "Building branded media assets around documented standard operating procedures creates valuable digital real estate that can be sold for substantial capital multiples to institutional private equity investors.",
    "Separating the media enterprise into modular intelligence, production, distribution, and monetization engines ensures efficient, assembly-line operational execution and exceptionally high gross operating profit margins.",
    "Grounding video ideation in empirical competitor data and viral outlier analysis guarantees that every video published addresses proven audience demand, commercial interest, and high search intent.",
    "Standardizing video assembly across five sequential production stages ensures uniform cinematic quality and seamless delegation to technical editors without quality compromises or executive micromanagement.",
    "Syndicating short-form content across YouTube Shorts, TikTok, and Instagram Reels extracts maximum viewer distribution from a single production expense across major global distribution platforms.",
    "Deploying a four-tier monetization architecture converts top-of-funnel short-form attention into predictable, diversified five-figure monthly commercial cash flow, software affiliate commissions, and brand partnerships.",
    "Managing video workflows through visual Kanban command boards maintains total operational transparency and eliminates founder cognitive overwhelm, miscommunication, and administrative confusion across projects.",
    "Enforcing strict quality assurance gates across scripts, voice synthesis, and audio balancing protects channel authority in platform algorithmic recommendation feeds and search databases.",
    "Diversifying your channel portfolio across uncorrelated, high-RPM niches defends your monthly revenue against platform volatility, regulatory shifts, seasonal ad spend contractions, and algorithmic changes.",
    "Reinvesting initial channel profits into international technical talent liberates founder bandwidth to launch subsequent automated media properties and scale portfolio cash flow across new verticals.",
    "Operating as a digital broadcasting CEO allows an agile solo founder to out-maneuver sluggish, high-overhead traditional television networks, streaming conglomerates, and legacy media houses.",
    "A well-architected faceless media empire compounds viewer attention, captures digital real estate, and generates substantial passive monthly cash flow for disciplined, systematic digital operators.",
    "Automating multi-channel media production establishes an enduring digital vanguard that commands millions of views and operates seamlessly without executive micromanagement or founder dependency.",
    "With the foundational architecture locked, you are now prepared to master the mathematical principles governing short-form virality and algorithmic distribution."
]'''

new_ch03_exts = '''ch03_exts = [
    "Targeting high-RPM commercial verticals ensures that your short-form views convert into massive advertising revenue, high-ticket backend sales, and lucrative corporate sponsorships across markets.",
    "Audience purchasing power directly dictates advertising auction bidding, rewarding channels that attract affluent, working-age corporate professionals with substantial disposable capital and investment interest.",
    "Executing audience geographic arbitrage targets Tier-One nations, multiplying advertising revenue by twenty times compared to low-GDP developing media markets that generate empty vanity views.",
    "Personal finance and investing niches command peak advertising rates as banks and fintech brands bid aggressively for affluent, investment-minded consumers seeking wealth accumulation strategies.",
    "Historical philosophy and psychology channels possess immense viral reach and convert exceptionally well for digital guides, audio courses, and private community memberships with zero physical inventory.",
    "Advanced technology and robotics verticals attract educated professionals, commanding high-ticket sponsorships and SaaS software affiliate deals from leading global tech firms and venture-backed startups.",
    "Luxury real estate and architectural engineering content attracts aspirational and high-net-worth viewers, opening doors for luxury brand partnerships, architectural sponsorships, and high-ticket commissions.",
    "Avoiding saturated, low-RPM entertainment niches protects your business from worthless vanity views that generate near-zero cash flow, invite copyright disputes, and drain production energy.",
    "Evaluating niches through the monetization multiplier matrix guarantees that every channel supports multiple, highly profitable revenue streams and commercial backends from day one of launch.",
    "Focusing on evergreen historical and financial narratives creates compounding digital assets that continue generating views, subscribers, and recurring revenue for decades without losing cultural relevance.",
    "Building content with a moderate barrier to technical excellence defends your channel against low-effort copycat spammers in the increasingly competitive short-form media marketplace.",
    "Prioritizing public domain archives and licensed cinematic stock footage shields your media channels from catastrophic copyright strikes, DMCA takedowns, and monetization suspensions.",
    "Incubating a proof-of-concept channel over thirty days validates audience geographic demographics and RPM metrics before scaling significant production capital across full portfolio campaigns.",
    "Deploying creative production capital exclusively into high-value commercial territories maximizes enterprise profitability, gross margins, and investment return across all channel assets.",
    "Dominating high-RPM niches transforms an anonymous media channel into an indispensable digital asset with extraordinary commercial value, defensible moats, and equity multiples.",
    "Targeting affluent audiences with specialized content ensures that every million views generates substantial commercial cash flow, high-margin sales, and lasting brand equity.",
    "With your niche validated, you must now engineer the psychological hooks that seize human attention within the opening three seconds of video playback."
]'''

new_ch04_exts = '''ch04_exts = [
    "Piercing the hypnotic scrolling trance within the opening three seconds is the non-negotiable prerequisite for short-form video survival, high algorithmic scoring, and viral reach.",
    "Triggering acute cognitive dissonance through unexpected visual and auditory stimuli forces the viewer's conscious brain to pay undivided, immediate attention to the unfolding narrative.",
    "Synchronizing visual pattern interrupts, tactile sound effects, and verbal information gaps captures all sensory channels simultaneously in the first twenty frames of mobile playback.",
    "Deploying shocking historical documents, rapid zooms, or inverted visuals disrupts visual autopilot and prevents instant swipe-aways on mobile devices during fast feed navigation.",
    "Opening with crisp Foley sound effects and immediate voice narration within the first quarter-second commands auditory engagement and builds instant dramatic momentum for the story.",
    "Presenting an incomplete narrative scenario creates an irresistible cognitive itch that compels the viewer to watch for the ultimate story resolution and factual truth.",
    "Contradictory paradox hooks shatter conventional wisdom, forcing the viewer's brain to stay engaged to understand the logical anomaly, historical reality, and surprising outcome.",
    "Forbidden secret hooks tap into deep psychological curiosity, elevating the perceived value of your narrative through exclusive, classified, and provocative investigative framing.",
    "Extreme consequence hooks drop viewers into the aftermath of catastrophic historical decisions, fueling intense commercial and dramatic curiosity about the ultimate systemic failure.",
    "High-stakes dilemma hooks engage the viewer's personal ego, making it psychologically painful to scroll away without evaluating their own personal choice and moral reaction.",
    "Fulfilling the hook's promise with authoritative narrative depth protects viewer trust and defends channel standing from spam penalties, negative comments, and audience backlash.",
    "Syncing bold kinetic typography to the opening spoken words ensures that silent mobile browsers are captured just as effectively as active headphone listeners across platforms.",
    "Eliminating polite conversational preambles drops the viewer straight into the narrative fire, preventing early retention drop-offs and premature audience abandonment of the feed.",
    "Curating an active swipe file of viral outliers across platforms allows you to model proven psychological hook structures systematically across all future video production campaigns.",
    "Mastering the hook matrix guarantees that your production investments consistently achieve the eighty-five percent viewed ratio required for massive viral scale and distribution.",
    "Mastering psychological pattern interruption ensures that your short-form channels consistently command viewer attention in hyper-competitive mobile feeds without expensive marketing budgets.",
    "With viewer attention secured, you must now engineer the subsequent narrative flow to sustain retention through the final frame of the video."
]'''

new_ch05_exts = '''ch05_exts = [
    "Engineering viewer retention through the open-loop protocol ensures that hooked audiences stay engaged through the final frame of your short-form video without dropping off.",
    "Leveraging the Zeigarnik effect creates acute cognitive tension in the viewer's mind, making it psychologically painful to swipe away before complete narrative closure is achieved.",
    "Deploying nested open-loop architectures guarantees that a secondary narrative loop is always active before an earlier loop is resolved on screen during playback.",
    "Maintaining an unbroken chain of narrative tension pulls the viewer effortlessly through the middle sections of your video without cognitive fatigue, boredom, or distraction.",
    "Enforcing the micro-pacing rule by cutting visuals every two seconds prevents visual boredom and suppresses the subconscious urge to swipe away to competing content.",
    "Executing the rule of visual evolution through dynamic framing variations keeps the viewer's visual cortex in continuous, stimulated engagement throughout the entire thirty seconds.",
    "Writing punchy, rhythmic declarative sentences provides the syntactic momentum required to maintain rapid short-form narrative drive, auditory clarity, and emotional impact.",
    "Scattering strategic information breadcrumbs throughout the middle section of the script defeats the valley of death drop-off curve in YouTube and TikTok analytics.",
    "Using tactical audio cuts and sudden silence before major narrative reveals creates dramatic contrast that heightens viewer emotional engagement and physiological focus.",
    "Delaying the core narrative payoff until the eighty-five percent mark of the video protects your retention curve from premature audience abandonment and early swipe-offs.",
    "Engineering seamless infinite loops where the ending connects to the opening hook pushes average percentage viewed beyond one hundred percent effortlessly across uploads.",
    "Achieving over one hundred percent retention tricks platform algorithms into recognizing an addictive piece of content, driving massive global virality and channel growth.",
    "Calculating drop-off deltas in YouTube Studio allows you to diagnose and eliminate pacing weaknesses across subsequent production batches, scripts, and editing templates.",
    "Balancing dramatic psychological tension with rapid cinematic pacing transforms short-form videos into irresistible storytelling assets with extraordinarily high replay value.",
    "Mastering retention engineering provides the mathematical foundation that powers your automated channels to consistent multi-five-figure monthly revenue and dominant category scale.",
    "Sustaining viewer attention through disciplined narrative pacing transforms anonymous clicks into compounding algorithmic reach, long-term brand equity, and commercial profit.",
    "We now explore the art and science of algorithmic scriptwriting, emotional narrative arcs, and crafting high-retention short-form prose."
]'''

text = re.sub(r'ch01_exts = \[.*?\]', new_ch01_exts, text, flags=re.DOTALL)
text = re.sub(r'ch03_exts = \[.*?\]', new_ch03_exts, text, flags=re.DOTALL)
text = re.sub(r'ch04_exts = \[.*?\]', new_ch04_exts, text, flags=re.DOTALL)
text = re.sub(r'ch05_exts = \[.*?\]', new_ch05_exts, text, flags=re.DOTALL)

with open("scripts/author_faceless_part1.py", "w", encoding="utf-8") as f:
    f.write(text)

print("Updated author_faceless_part1.py with expanded extensions")
