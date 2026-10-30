import re

with open("scripts/author_faceless_part1.py", "r", encoding="utf-8") as f:
    text = f.read()

new_ch03_exts = '''ch03_exts = [
    "Targeting high-RPM commercial verticals ensures that your short-form views convert into massive advertising revenue, high-ticket backend sales, and lucrative corporate sponsorships across competitive markets.",
    "Audience purchasing power directly dictates advertising auction bidding, rewarding channels that attract affluent, working-age corporate professionals with substantial disposable capital, executive authority, and investment interest.",
    "Executing audience geographic arbitrage targets Tier-One nations, multiplying advertising revenue by twenty times compared to low-GDP developing media markets that generate empty vanity views with zero purchasing intent.",
    "Personal finance and investing niches command peak advertising rates as banks and fintech brands bid aggressively for affluent, investment-minded consumers seeking wealth accumulation and capital preservation strategies.",
    "Historical philosophy and psychology channels possess immense viral reach and convert exceptionally well for digital guides, audio courses, and private community memberships with zero physical inventory or shipping logistics.",
    "Advanced technology and robotics verticals attract educated professionals, commanding high-ticket sponsorships and SaaS software affiliate deals from leading global tech firms, AI labs, and venture-backed startups.",
    "Luxury real estate and architectural engineering content attracts aspirational and high-net-worth viewers, opening doors for luxury brand partnerships, architectural sponsorships, and high-ticket real estate commissions.",
    "Avoiding saturated, low-RPM entertainment niches protects your business from worthless vanity views that generate near-zero cash flow, invite copyright disputes, and drain vital production energy and capital.",
    "Evaluating niches through the monetization multiplier matrix guarantees that every channel supports multiple, highly profitable revenue streams and commercial backends from the very first day of public launch.",
    "Focusing on evergreen historical and financial narratives creates compounding digital assets that continue generating views, subscribers, and recurring revenue for decades without losing cultural relevance or viewer fascination.",
    "Building content with a moderate barrier to technical excellence defends your channel against low-effort copycat spammers in the increasingly competitive short-form media marketplace and ecosystem.",
    "Prioritizing public domain archives and licensed cinematic stock footage shields your media channels from catastrophic copyright strikes, DMCA takedowns, and permanent monetization suspensions from platform hosts.",
    "Incubating a proof-of-concept channel over thirty days validates audience geographic demographics and RPM metrics before scaling significant production capital across full portfolio campaigns and channel assets.",
    "Deploying creative production capital exclusively into high-value commercial territories maximizes enterprise profitability, gross operating margins, and investment return across all automated channel assets.",
    "Dominating high-RPM niches transforms an anonymous media channel into an indispensable digital asset with extraordinary commercial value, defensible moats, recurring cash flow, and equity multiples.",
    "Targeting affluent audiences with specialized content ensures that every million views generates substantial commercial cash flow, high-margin sales, and lasting institutional brand equity for founders.",
    "With your niche validated, you must now engineer the psychological hooks that seize human attention within the opening three seconds of video playback."
]'''

new_ch04_exts = '''ch04_exts = [
    "Piercing the hypnotic scrolling trance within the opening three seconds is the non-negotiable prerequisite for short-form video survival, high algorithmic scoring, and massive viral reach across feeds.",
    "Triggering acute cognitive dissonance through unexpected visual and auditory stimuli forces the viewer's conscious brain to pay undivided, immediate attention to the unfolding narrative and characters.",
    "Synchronizing visual pattern interrupts, tactile sound effects, and verbal information gaps captures all sensory channels simultaneously in the first twenty frames of mobile playback and interaction.",
    "Deploying shocking historical documents, rapid zooms, or inverted visuals disrupts visual autopilot and prevents instant swipe-aways on mobile devices during fast, casual feed navigation.",
    "Opening with crisp Foley sound effects and immediate voice narration within the first quarter-second commands auditory engagement and builds instant dramatic momentum for the unfolding story.",
    "Presenting an incomplete narrative scenario creates an irresistible cognitive itch that compels the viewer to watch for the ultimate story resolution, logical climax, and factual truth.",
    "Contradictory paradox hooks shatter conventional wisdom, forcing the viewer's brain to stay engaged to understand the logical anomaly, historical reality, and surprising narrative outcome.",
    "Forbidden secret hooks tap into deep psychological curiosity, elevating the perceived value of your narrative through exclusive, classified, and provocative investigative storytelling and framing.",
    "Extreme consequence hooks drop viewers into the aftermath of catastrophic historical decisions, fueling intense commercial and dramatic curiosity about the ultimate systemic failure and crisis.",
    "High-stakes dilemma hooks engage the viewer's personal ego, making it psychologically painful to scroll away without evaluating their own personal choice, moral perspective, and reaction.",
    "Fulfilling the hook's promise with authoritative narrative depth protects viewer trust and defends channel standing from spam penalties, negative comments, and severe audience backlash.",
    "Syncing bold kinetic typography to the opening spoken words ensures that silent mobile browsers are captured just as effectively as active headphone listeners across all video platforms.",
    "Eliminating polite conversational preambles drops the viewer straight into the narrative fire, preventing early retention drop-offs and premature audience abandonment of the algorithmic feed.",
    "Curating an active swipe file of viral outliers across platforms allows you to model proven psychological hook structures systematically across all future video production campaigns and scripts.",
    "Mastering the hook matrix guarantees that your production investments consistently achieve the eighty-five percent viewed ratio required for massive viral scale and global distribution.",
    "Mastering psychological pattern interruption ensures that your short-form channels consistently command viewer attention in hyper-competitive mobile feeds without expensive marketing budgets or paid traffic.",
    "With viewer attention secured, you must now engineer the subsequent narrative flow to sustain retention through the final frame of the video."
]'''

new_ch05_exts = '''ch05_exts = [
    "Engineering viewer retention through the open-loop protocol ensures that hooked audiences stay engaged through the final frame of your short-form video without dropping off or swiping.",
    "Leveraging the Zeigarnik effect creates acute cognitive tension in the viewer's mind, making it psychologically painful to swipe away before complete narrative closure and revelation are achieved.",
    "Deploying nested open-loop architectures guarantees that a secondary narrative loop is always active before an earlier loop is resolved on screen during mobile video playback.",
    "Maintaining an unbroken chain of narrative tension pulls the viewer effortlessly through the middle sections of your video without cognitive fatigue, boredom, confusion, or distraction.",
    "Enforcing the micro-pacing rule by cutting visuals every two seconds prevents visual boredom and suppresses the subconscious urge to swipe away to competing entertainment content.",
    "Executing the rule of visual evolution through dynamic framing variations keeps the viewer's visual cortex in continuous, stimulated engagement throughout the entire thirty to forty seconds.",
    "Writing punchy, rhythmic declarative sentences provides the syntactic momentum required to maintain rapid short-form narrative drive, auditory clarity, emotional weight, and dramatic impact.",
    "Scattering strategic information breadcrumbs throughout the middle section of the script defeats the valley of death drop-off curve in YouTube Shorts and TikTok recommendation analytics.",
    "Using tactical audio cuts and sudden silence before major narrative reveals creates dramatic contrast that heightens viewer emotional engagement, anticipation, and physiological focus.",
    "Delaying the core narrative payoff until the eighty-five percent mark of the video protects your retention curve from premature audience abandonment and early swipe-offs at the end.",
    "Engineering seamless infinite loops where the ending connects to the opening hook pushes average percentage viewed beyond one hundred percent effortlessly across daily video uploads.",
    "Achieving over one hundred percent retention tricks platform algorithms into recognizing an addictive piece of content, driving massive global virality and compounding channel subscriber growth.",
    "Calculating drop-off deltas in YouTube Studio allows you to diagnose and eliminate pacing weaknesses across subsequent production batches, scripts, storyboards, and editing templates.",
    "Balancing dramatic psychological tension with rapid cinematic pacing transforms short-form videos into irresistible storytelling assets with extraordinarily high replay value and shares.",
    "Mastering retention engineering provides the mathematical foundation that powers your automated channels to consistent multi-five-figure monthly revenue, commercial stability, and category dominance.",
    "Sustaining viewer attention through disciplined narrative pacing transforms anonymous clicks into compounding algorithmic reach, long-term brand equity, loyal audiences, and commercial profit.",
    "We now explore the art and science of algorithmic scriptwriting, emotional narrative arcs, and crafting high-retention short-form prose."
]'''

text = re.sub(r'ch03_exts = \[.*?\]', new_ch03_exts, text, flags=re.DOTALL)
text = re.sub(r'ch04_exts = \[.*?\]', new_ch04_exts, text, flags=re.DOTALL)
text = re.sub(r'ch05_exts = \[.*?\]', new_ch05_exts, text, flags=re.DOTALL)

with open("scripts/author_faceless_part1.py", "w", encoding="utf-8") as f:
    f.write(text)

print("Updated author_faceless_part1.py with fully boosted ch03, ch04, ch05")
