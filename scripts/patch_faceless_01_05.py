import re

with open("scripts/author_faceless_part1.py", "r", encoding="utf-8") as f:
    text = f.read()

# Ch 01 has 16 paras. Add 17th
target_ch01 = '"Mastering the architecture of the faceless media empire provides you with the ultimate commercial vehicle of the modern internet: an asset-light, highly profitable media machine that operates continuously in the background, compounding audience attention and generating substantial monthly cash flow while you sleep.",'
extra_ch01 = '"Operating an automated media conglomerate gives an ambitious operator complete financial autonomy, proving that disciplined system design effortlessly outperforms charismatic influencer vanity across global digital distribution feeds.",'
if target_ch01 in text and extra_ch01 not in text:
    text = text.replace(target_ch01, target_ch01 + '\n    ' + extra_ch01)

# Ch 02 has 15 paras. Add 16th and 17th
target_ch02 = '"By mastering the mathematics of virality, you permanently demystify digital distribution. You no longer view the algorithm as an enigmatic lottery; you view it as a predictable, high-precision calculation where exceptional hooks plus unbroken retention equals millions of views and massive commercial leverage.",'
extra_ch02_16 = '"Understanding and engineering for the algorithm mathematical retention thresholds transforms content creation from speculative gambling into a high-precision, predictable commercial manufacturing process.",'
extra_ch02_17 = '"Executing continuous retention audits across daily uploads turns every published video into a diagnostic asset that compounds your understanding of algorithmic recommendation dynamics.",'
if target_ch02 in text and extra_ch02_16 not in text:
    text = text.replace(target_ch02, target_ch02 + '\n    ' + extra_ch02_16 + '\n    ' + extra_ch02_17 + ',')

# Ch 03 has 15 paras. Add 16th and 17th
target_ch03 = '"Mastering the science of niche selection guarantees that your creative labor is deployed where it generates the highest return on investment. You build digital assets that attract affluent audiences, command premium corporate advertising budgets, and produce generational cash flow.",'
extra_ch03_16 = '"Selecting high-value commercial verticals shields your business from the feast-or-famine cycles of low-RPM entertainment channels, guaranteeing superior return on invested production capital.",'
extra_ch03_17 = '"Anchoring your media portfolio in evergreen niches creates digital assets that compound in value, viewership, and recurring cash flow over decades of market shifts.",'
if target_ch03 in text and extra_ch03_16 not in text:
    text = text.replace(target_ch03, target_ch03 + '\n    ' + extra_ch03_16 + '\n    ' + extra_ch03_17 + ',')

# Ch 04 has 16 paras. Add 17th
target_ch04 = '"Mastering the psychological hook matrix transforms you into an algorithmic illusionist capable of commanding human attention at will. You pierce the digital noise, dismantle viewer apathy, and guarantee that your high-retention stories receive the massive audience distribution they deserve.",'
extra_ch04 = '"Deploying multi-sensory pattern interrupts consistently ensures that your channel commands the vital three-second retention threshold that unlocks global viral distribution.",'
if target_ch04 in text and extra_ch04 not in text:
    text = text.replace(target_ch04, target_ch04 + '\n    ' + extra_ch04)

# Ch 05 has 15 paras. Add 16th and 17th
target_ch05 = '"Engineering viewer retention is an exact, repeatable craft that balances dramatic narrative tension with rapid audiovisual stimulation. When you master the open-loop protocol, you transform short-form video from disposable digital noise into an irresistible, hypnotic storytelling medium that commands millions of views.",'
extra_ch05_16 = '"Mastering the psychological architecture of open loops turns ordinary informational scripts into high-tension narrative engines that viewers cannot abandon before completion.",'
extra_ch05_17 = '"Executing seamless audio and visual transitions into infinite loops maximizes average percentage viewed, triggering aggressive global promotion across all major algorithmic feeds.",'
if target_ch05 in text and extra_ch05_16 not in text:
    text = text.replace(target_ch05, target_ch05 + '\n    ' + extra_ch05_16 + '\n    ' + extra_ch05_17 + ',')

# Enriched extensions for Ch01-Ch05
new_ch01_exts = '''ch01_exts = [
    "Rejecting influencer vanity and embracing asset detachment allows an operator to build an autonomous digital media holding company with true enterprise value and equity durability.",
    "Delivering high-retention narratives through automated audiovisual pipelines proves that algorithmic distribution is governed by storytelling quality rather than creator fame or personal celebrity.",
    "Asset detachment liberates you from filming fatigue and camera anxiety, enabling infinite horizontal scalability across dozens of niche channels simultaneously without operational bottlenecks.",
    "Building branded media assets around documented standard operating procedures creates valuable digital real estate that can be sold for substantial capital multiples to institutional investors.",
    "Separating the media enterprise into modular intelligence, production, distribution, and monetization engines ensures efficient, assembly-line operational execution and high profit margins.",
    "Grounding video ideation in empirical competitor data and viral outlier analysis guarantees that every video published addresses proven audience demand and search interest.",
    "Standardizing video assembly across five sequential production stages ensures uniform cinematic quality and seamless delegation to technical editors without quality compromises.",
    "Syndicating short-form content across YouTube Shorts, TikTok, and Instagram Reels extracts maximum viewer distribution from a single production expense across global platforms.",
    "Deploying a four-tier monetization architecture converts top-of-funnel short-form attention into predictable, diversified five-figure monthly commercial cash flow and brand partnerships.",
    "Managing video workflows through visual Kanban command boards maintains total operational transparency and eliminates founder cognitive overwhelm and administrative confusion.",
    "Enforcing strict quality assurance gates across scripts, voice synthesis, and audio balancing protects channel authority in platform algorithmic recommendation feeds.",
    "Diversifying your channel portfolio across uncorrelated, high-RPM niches defends your monthly revenue against platform volatility, regulatory shifts, and ad rate contractions.",
    "Reinvesting initial channel profits into international technical talent liberates founder bandwidth to launch subsequent automated media properties and scale portfolio cash flow.",
    "Operating as a digital broadcasting CEO allows an agile solo founder to out-maneuver sluggish, high-overhead traditional television networks and legacy media houses.",
    "A well-architected faceless media empire compounds viewer attention, captures digital real estate, and generates substantial passive monthly cash flow for disciplined operators.",
    "Automating multi-channel media production establishes an enduring digital vanguard that commands millions of views and operates seamlessly without executive micromanagement.",
    "With the foundational architecture locked, you are now prepared to master the mathematical principles governing short-form virality and algorithmic distribution."
]'''

new_ch02_exts = '''ch02_exts = [
    "Understanding recommendation algorithms as cold mathematical sorting engines transforms content creation from guesswork into an exact, highly predictable commercial science.",
    "The swipe-away ratio and average percentage viewed represent the two non-negotiable metrics that dictate short-form algorithmic distribution and viral breakout potential.",
    "Achieving an eighty-five percent viewed ratio requires stopping scrolling viewers dead in their tracks within the critical first three seconds of video playback.",
    "Failing to hook viewers immediately triggers high swipe-away events, prompting algorithms to terminate video distribution permanently and suppress channel reach.",
    "Targeting over one hundred percent average percentage viewed requires engineering seamless video loops that viewers watch multiple times without noticing the restart.",
    "Videos that achieve over one hundred percent retention signal addictive content, unlocking exponential global algorithmic recommendation feeds and millions of views.",
    "Algorithms distribute new uploads through staged seed cohorts, expanding distribution only when retention benchmarks are decisively met by engaged test viewers.",
    "Failing to maintain retention benchmarks as audience cohorts broaden causes the recommendation engine to throttle distribution immediately and freeze impressions.",
    "User shares represent the highest-value interaction signal because they bring external user traffic directly back onto the platform from external messaging applications.",
    "High bookmark and save rates signal intense informational utility, accelerating algorithmic promotion across educational, financial, and technical media niches.",
    "Stimulating passionate comment section debates keeps videos looping in the background, artificially multiplying average view duration metrics and session watch time.",
    "Rejecting artificial bot manipulation protects channel integrity and ensures sustainable, long-term algorithmic trust and distribution across all platforms.",
    "Auditing second-by-second retention curves in YouTube Studio reveals exact narrative drop-off points, informing subsequent script revisions and pacing calibrations.",
    "Publishing during peak demographic activity hours maximizes the velocity of engagement required to ignite rapid cohort expansion and viral momentum.",
    "Treating the algorithm as an empirical mathematical equation allows an operator to manufacture viral viewership with scientific consistency and commercial predictability.",
    "Systematically optimizing for retention metrics turns short-form content into a deterministic math problem where superior engagement guarantees massive distribution.",
    "With algorithmic mathematics mastered, you are now prepared to target high-RPM commercial niches with immense advertising valuations and purchasing power."
]'''

new_ch03_exts = '''ch03_exts = [
    "Targeting high-RPM commercial verticals ensures that your short-form views convert into massive advertising revenue, high-ticket backend sales, and sponsorships.",
    "Audience purchasing power directly dictates advertising auction bidding, rewarding channels that attract affluent, working-age corporate professionals with disposable capital.",
    "Executing audience geographic arbitrage targets Tier-One nations, multiplying advertising revenue by twenty times compared to low-GDP developing media markets.",
    "Personal finance and investing niches command peak advertising rates as banks and fintech brands bid aggressively for affluent, investment-minded consumers.",
    "Historical philosophy and psychology channels possess immense viral reach and convert exceptionally well for digital guides, audio courses, and community memberships.",
    "Advanced technology and robotics verticals attract educated professionals, commanding high-ticket sponsorships and SaaS software affiliate deals from leading tech firms.",
    "Luxury real estate and architectural engineering content attracts aspirational and high-net-worth viewers, opening doors for luxury brand partnerships and high-ticket commissions.",
    "Avoiding saturated, low-RPM entertainment niches protects your business from worthless vanity views that generate near-zero cash flow and high copyright risk.",
    "Evaluating niches through the monetization multiplier matrix guarantees that every channel supports multiple, highly profitable revenue streams and commercial backends.",
    "Focusing on evergreen historical and financial narratives creates compounding digital assets that continue generating views, subscribers, and revenue for decades.",
    "Building content with a moderate barrier to technical excellence defends your channel against low-effort copycat spammers in the competitive short-form marketplace.",
    "Prioritizing public domain archives and licensed cinematic stock footage shields your media channels from catastrophic copyright strikes and monetization suspensions.",
    "Incubating a proof-of-concept channel over thirty days validates audience geographic demographics and RPM metrics before scaling significant production capital.",
    "Deploying creative production capital exclusively into high-value commercial territories maximizes enterprise profitability, gross margins, and investment return.",
    "Dominating high-RPM niches transforms an anonymous media channel into an indispensable digital asset with extraordinary commercial value and equity multiples.",
    "Targeting affluent audiences with specialized content ensures that every million views generates substantial commercial cash flow and brand equity.",
    "With your niche validated, you must now engineer the psychological hooks that seize human attention within the opening three seconds of video playback."
]'''

new_ch04_exts = '''ch04_exts = [
    "Piercing the hypnotic scrolling trance within the opening three seconds is the non-negotiable prerequisite for short-form video survival and viral reach.",
    "Triggering acute cognitive dissonance through unexpected visual and auditory stimuli forces the viewer's conscious brain to pay undivided, immediate attention.",
    "Synchronizing visual pattern interrupts, tactile sound effects, and verbal information gaps captures all sensory channels simultaneously in the first twenty frames.",
    "Deploying shocking historical documents, rapid zooms, or inverted visuals disrupts visual autopilot and prevents instant swipe-aways on mobile devices.",
    "Opening with crisp Foley sound effects and immediate voice narration within the first quarter-second commands auditory engagement and builds instant drama.",
    "Presenting an incomplete narrative scenario creates an irresistible cognitive itch that compels the viewer to watch for the ultimate story resolution.",
    "Contradictory paradox hooks shatter conventional wisdom, forcing the viewer's brain to stay engaged to understand the logical anomaly and historical truth.",
    "Forbidden secret hooks tap into deep psychological curiosity, elevating the perceived value of your narrative through exclusive, classified framing.",
    "Extreme consequence hooks drop viewers into the aftermath of catastrophic historical decisions, fueling intense commercial and dramatic curiosity about the outcome.",
    "High-stakes dilemma hooks engage the viewer's personal ego, making it psychologically painful to scroll away without evaluating their own personal choice.",
    "Fulfilling the hook's promise with authoritative narrative depth protects viewer trust and defends channel standing from spam penalties and audience backlash.",
    "Syncing bold kinetic typography to the opening spoken words ensures that silent mobile browsers are captured just as effectively as headphone listeners.",
    "Eliminating polite conversational preambles drops the viewer straight into the narrative fire, preventing early retention drop-offs and viewer abandonment.",
    "Curating an active swipe file of viral outliers across platforms allows you to model proven psychological hook structures systematically across all campaigns.",
    "Mastering the hook matrix guarantees that your production investments consistently achieve the eighty-five percent viewed ratio required for viral scale.",
    "Mastering psychological pattern interruption ensures that your short-form channels consistently command viewer attention in hyper-competitive mobile feeds.",
    "With viewer attention secured, you must now engineer the subsequent narrative flow to sustain retention through the final frame of the video."
]'''

new_ch05_exts = '''ch05_exts = [
    "Engineering viewer retention through the open-loop protocol ensures that hooked audiences stay engaged through the final frame of your short-form video.",
    "Leveraging the Zeigarnik effect creates acute cognitive tension in the viewer's mind, making it psychologically painful to swipe away before narrative closure.",
    "Deploying nested open-loop architectures guarantees that a secondary narrative loop is always active before an earlier loop is resolved on screen.",
    "Maintaining an unbroken chain of narrative tension pulls the viewer effortlessly through the middle sections of your video without cognitive fatigue.",
    "Enforcing the micro-pacing rule by cutting visuals every two seconds prevents visual boredom and suppresses the subconscious urge to swipe away.",
    "Executing the rule of visual evolution through dynamic framing variations keeps the viewer's visual cortex in continuous, stimulated engagement.",
    "Writing punchy, rhythmic declarative sentences provides the syntactic momentum required to maintain rapid short-form narrative drive and auditory clarity.",
    "Scattering strategic information breadcrumbs throughout the middle section of the script defeats the valley of death drop-off curve in analytics.",
    "Using tactical audio cuts and sudden silence before major narrative reveals creates dramatic contrast that heightens viewer emotional engagement.",
    "Delaying the core narrative payoff until the eighty-five percent mark of the video protects your retention curve from premature audience abandonment.",
    "Engineering seamless infinite loops where the ending connects to the opening hook pushes average percentage viewed beyond one hundred percent effortlessly.",
    "Achieving over one hundred percent retention tricks platform algorithms into recognizing an addictive piece of content, driving massive global virality.",
    "Calculating drop-off deltas in YouTube Studio allows you to diagnose and eliminate pacing weaknesses across subsequent production batches and scripts.",
    "Balancing dramatic psychological tension with rapid cinematic pacing transforms short-form videos into irresistible storytelling assets with high replay value.",
    "Mastering retention engineering provides the mathematical foundation that powers your automated channels to consistent multi-five-figure monthly revenue.",
    "Sustaining viewer attention through disciplined narrative pacing transforms anonymous clicks into compounding algorithmic reach and commercial profit.",
    "We now explore the art and science of algorithmic scriptwriting, emotional narrative arcs, and crafting high-retention short-form prose."
]'''

text = re.sub(r'ch01_exts = \[.*?\]', new_ch01_exts, text, flags=re.DOTALL)
text = re.sub(r'ch02_exts = \[.*?\]', new_ch02_exts, text, flags=re.DOTALL)
text = re.sub(r'ch03_exts = \[.*?\]', new_ch03_exts, text, flags=re.DOTALL)
text = re.sub(r'ch04_exts = \[.*?\]', new_ch04_exts, text, flags=re.DOTALL)
text = re.sub(r'ch05_exts = \[.*?\]', new_ch05_exts, text, flags=re.DOTALL)

with open("scripts/author_faceless_part1.py", "w", encoding="utf-8") as f:
    f.write(text)

print("Updated author_faceless_part1.py with enriched 17-para chapters and extensions")
