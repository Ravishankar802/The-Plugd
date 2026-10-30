import re

with open("scripts/author_faceless_part2.py", "r", encoding="utf-8") as f:
    text = f.read()

new_ch06_exts = '''ch06_exts = [
    "Algorithmic scriptwriting represents the foundational structural engineering that carries emotional tension, prevents narrative sag, and guarantees complete short-form video retention across mobile entertainment platforms and feeds.",
    "Restricting script length strictly to one hundred and forty words maintains dramatic narrative pacing, prevents rushed voiceover delivery, and allows every spoken syllable to breathe with cinematic weight, emotional clarity, and resonant power.",
    "Structuring scripts across the five-beat narrative arc ensures that every millisecond of video carries deliberate psychological momentum, escalating stakes, and emotional urgency that compels viewers to stay until the final frame.",
    "Escalating narrative stakes immediately following the opening hook captures viewer emotional investment and prevents costly audience drop-off during the critical early seconds when thumbs are poised to swipe away.",
    "Introducing unexpected structural complications keeps viewers in continuous cognitive recalculation, defeating narrative predictability, and keeping eyes glued to the unfolding story without a moment of boredom or distraction.",
    "Delivering the core story revelation at the climax provides intense emotional payoff that rewards viewer patience, deepens channel loyalty, and stimulates passionate comment discussions that loop the video in the background.",
    "Pivoting the final beat into an infinite loop transition feeds seamless watch time directly back into the opening hook, multiplying average percentage viewed across platforms and triggering exponential algorithmic distribution.",
    "Authoring prose specifically for auditory processing ensures that rhythm, cadence, sentence fragments, and breath control sound completely natural, authoritative, and gripping to the human ear in headphones.",
    "Deploying sensory, physical verbs stimulates viewer mirror neurons, creating vivid mental cinema that commands undivided attention and bypasses analytical skepticism before logical defenses can react.",
    "Purging corporate adverbs and weak descriptive adjectives produces lean, muscular prose that sustains high short-form algorithmic momentum from the opening second to the final closing punctuation mark.",
    "Inserting deliberate pregnant pauses into script punctuation builds unbearable narrative suspense immediately prior to major dramatic revelations, historical climaxes, and shocking factual discoveries.",
    "Drafting three distinct hook variations for every narrative guarantees that only the highest-converting psychological angle enters expensive production pipelines and editing timelines across your media firm.",
    "Organizing scripts inside standardized five-part schemas provides clear, unambiguous direction for voice synthesizers, asset curators, motion graphic artists, and technical video editors across your team.",
    "Applying rigorous human editorial polish to raw AI drafts eliminates robotic clichés, corporate jargon, and generic tropes, infusing scripts with genuine emotional power and narrative resonance.",
    "Mastering the craft of algorithmic scriptwriting provides the supreme creative weapon that powers your automated channels to massive virality, multi-million-view distribution, and market leadership.",
    "Codifying narrative formulas into repeatable standard operating procedures allows you to scale production across multiple channels without sacrificing dramatic storytelling standards or structural rigor.",
    "With your script calibrated to perfection, you must now synthesize hyper-realistic voice narration that commands deep dramatic authority, emotional resonance, and cinematic presence."
]'''

new_ch07_exts = '''ch07_exts = [
    "Audio constitutes fifty percent of the viewing experience, making hyper-realistic neural voice synthesis the emotional anchor of short-form viewer retention, psychological immersion, and narrative authority across mobile devices.",
    "Deploying advanced neural voice models replicates subtle human respiratory pauses, dynamic inflections, micro-tremors, and vocal fry, completely eliminating robotic uncanny valley effects that trigger immediate feed abandonment.",
    "Aligning the vocal archetype with your niche's emotional gravity ensures that the voice projects authentic authority, timeless wisdom, uncompromising technical precision, and captivating dramatic power that commands respect.",
    "Creating bespoke custom voice clones protects your channel from audience fatigue associated with overused, generic platform voice presets flooding social feeds and repelling discerning viewers in Tier-One markets.",
    "Fine-tuning voice stability and clarity sliders achieves the optimal balance between natural human emotional expression, dramatic nuance, crisp pronunciation, and unshakeable acoustic consistency across paragraphs.",
    "Calibrating narration speed to one hundred and fifty words per minute maintains the energetic momentum required for modern short-form retention curves without sounding breathless, frantic, or artificially rushed.",
    "Utilizing phonetic spelling adjustments ensures that historical names, foreign places, and complex technical terms are pronounced with flawless, classical accuracy that establishes deep institutional credibility.",
    "Injecting deliberate punctuation pauses forces natural synthetic breathing cycles, tricking the human brain into perceiving genuine living speech, biological vulnerability, and commanding human presence.",
    "Generating multiple takes of the opening hook allows you to audition and deploy only the most emotionally captivating vocal performance for live production across your automated channel portfolio.",
    "Routing synthetic voice tracks through standardized mastering chains removes digital sibilance, adds low-end warmth, and locks in broadcast-grade loudness levels that sound phenomenal on smartphone speakers.",
    "Mastering vocal tracks to minus fourteen LUFS ensures consistent audio levels that blend seamlessly with mobile platform recommendation feeds, user expectations, and competing mainstream commercial media.",
    "Documenting custom voice generation presets inside standard operating procedures allows seamless delegation to technical production assistants, audio specialists, and overseas editors without quality loss.",
    "A commanding, resonant voiceover bypasses conscious viewer defenses, transforming simple educational scripts into profound cinematic experiences that linger in the mind long after the video ends.",
    "Mastering neural voice generation provides an unshakeable acoustic advantage that elevates your channels far above low-effort automated competitors in the algorithmic recommendation stream.",
    "Calibrating vocal micro-dynamics ensures that synthetic narration delivers the gravitas, nuance, and emotional conviction of an elite Hollywood voice actor performing a major theatrical trailer.",
    "Acoustic post-production and equalization transform raw neural voice files into warm, broadcast-grade audio assets that command instant viewer respect across all mobile devices and headphone environments.",
    "With vocal performance secured, you must now assemble the visual architecture that captivates viewer eyes across every frame of short-form playback and visual storytelling."
]'''

new_ch08_exts = '''ch08_exts = [
    "Visuals in short-form video function as an active dramatic engine, communicating meaning, evoking emotion, and driving narrative comprehension across every single frame of mobile video playback.",
    "Enforcing the rule of visual evolution through continuous motion and dynamic zooms prevents visual stillness from triggering subconscious swipe-aways on mobile devices during rapid feed scrolling.",
    "Constructing a multi-tiered sourcing pipeline combining historical archives, licensed stock, and AI imagery creates rich cinematic variety that captivates diverse audiences across global demographics.",
    "Curating public-domain historical archives from cultural institutions infuses your channels with authentic visual gravity, historical texture, and undeniable credibility that stock footage cannot match.",
    "Utilizing premium licensed stock footage provides the atmospheric connective tissue that bridges specific historical events to universal emotional themes and modern conceptual frameworks.",
    "Deploying custom generative AI imagery allows an operator to visualize unrecorded historical events and dramatic concepts with photorealistic cinematic precision and bespoke artistic lighting.",
    "Maintaining strict visual style consistency through uniform color grading, lighting palettes, and film grain overlays establishes a signature channel aesthetic that viewers recognize in an instant.",
    "Executing semantic visual synchronization ensures that every spoken word is instantly mirrored by an exact, emotionally resonant image on the screen, maximizing cognitive processing ease.",
    "Animating flat historical photographs with 2.5D parallax depth effects creates an immersive three-dimensional illusion that captivates viewers and elevates perceived production value dramatically.",
    "Translating abstract financial and philosophical concepts into visceral visual metaphors communicates narrative weight in milliseconds, aiding rapid comprehension and emotional impact.",
    "Applying subtle 35mm film grain and light leak overlays unifies diverse visual assets into a cohesive, high-budget documentary film stock that looks television-grade and authoritative.",
    "Upscaling all visual assets to high-definition vertical resolution guarantees pristine visual clarity on modern high-density smartphone displays across all short-form distribution platforms.",
    "Organizing internal footage libraries into thematic cloud directories accelerates editing workflows and slashes production turnaround times to under an hour per completed video asset.",
    "Synchronizing visual motion with narrative cadence creates an irresistible aesthetic harmony that elevates your agency far above amateur video competition in the algorithm.",
    "Mastering visual storytelling transforms disposable short-form clips into gripping cinematic art that commands compounding algorithmic reach, audience respect, and subscriber growth.",
    "Curating an expansive internal vault of categorized historical and cinematic B-roll assets slashes editing turnaround times while ensuring consistent aesthetic excellence across channels.",
    "Executing dynamic visual pacing and constant evolutionary cuts keeps the viewer sensory cortex in a state of continuous anticipation, driving completion rates past ninety percent."
]'''

new_ch09_exts = '''ch09_exts = [
    "Kinetic typography serves as the essential visual reading engine that captures silent mobile browsers who consume content without audio enabled in public spaces, offices, and transit.",
    "Animating written text with fluid motion physics guides the viewer's gaze across the screen and creates a hypnotic reading rhythm that prevents feed abandonment during rapid scrolling.",
    "Deploying the word-by-word animation protocol ensures rapid visual momentum, preventing cognitive fatigue caused by static paragraph blocks, dense text overlays, and slow subtitles.",
    "Selecting bold geometric sans-serif typefaces guarantees immediate legibility on small smartphone screens against moving, high-contrast background footage and dynamic visual cuts.",
    "Utilizing high-contrast color highlights on critical emotional words directs viewer attention instantly to the dramatic crux of the narrative sentence, building intense anticipation.",
    "Color-coding dramatic trigger words stimulates subconscious visual processing, reinforcing narrative tension before conscious reading even occurs in the biological visual cortex.",
    "Positioning subtitles strictly in the central vertical safe zone defends text legibility against native mobile interface overlays, icons, comments, and account handles across apps.",
    "Centralizing typography within the viewer's natural focal plane provides a frictionless reading experience that maximizes completion rates, average view duration, and watch time.",
    "Applying snappy ease-out scale animations makes typography feel organic, tactile, and physically responsive to vocal cadence, rhythm, and dramatic narrative emphasis.",
    "Embedding contextual micro-emojis and vector icons alongside highlighted words bridges linguistic and visual brain hemispheres effortlessly, intuitively, and enjoyably.",
    "Deploying dynamic motion graphics and animated maps visualizes complex data, geopolitical maneuvers, and historical timelines in clear, intuitive seconds without cognitive strain.",
    "Auditing automated transcription outputs manually ensures that proper nouns are spelled correctly and key words are highlighted with surgical precision and zero typos.",
    "Maintaining consistent font choices and animation styling establishes an authoritative visual brand identity that viewers recognize instantly across their personalized feeds.",
    "Kinetic typography unifies silent browsing behavior with auditory storytelling, capturing the sixty percent of users who browse on mute with zero friction or comprehension loss.",
    "Mastering subtitle animation transforms spoken words into captivating visual art, driving peak retention across global recommendation feeds, search engines, and algorithms.",
    "Mastering word-by-word kinetic subtitle animation ensures that your video delivers relentless visual momentum, capturing the sixty percent of mobile users who browse without sound.",
    "Positioning bold, color-highlighted typography in the central vertical safe zone defends your text against mobile interface overlays and maximizes reading ease across devices."
]'''

new_ch10_exts = '''ch10_exts = [
    "Sound design acts as the invisible emotional puppet master of short-form media, directly triggering visceral nervous system responses, adrenaline surges, curiosity, and awe.",
    "Orchestrating acoustic frequencies with deliberate dramatic intent controls viewer emotional states and sustains deep narrative suspense throughout every second of playback.",
    "Constructing multi-layered sound landscapes combining vocals, atmospheric beds, and tactile Foley elevates videos to cinematic heights comparable to high-budget theatrical trailers.",
    "Preserving the vocal track as the primary centerpiece of the mix ensures that background audio never compromises speech intelligibility, presence, or auditory clarity in headphones.",
    "Selecting dark ambient soundscapes and brooding orchestral passages provides the emotional gravity that mirrors your script's narrative arc, rising tension, and ultimate climax.",
    "Synchronizing tactile Foley sound effects with visual cuts imparts physical weight to digital pixels, making visuals feel tangible, real, impactful, and deeply immersive.",
    "Deploying dynamic audio ducking carves out acoustic space for vocal clarity while allowing music to swell during dramatic pauses, transitions, and story climaxes.",
    "Utilizing sudden dead silence prior to major narrative climaxes creates a shocking pattern interrupt that magnifies dramatic impact, emotional tension, and viewer focus.",
    "Anchoring monumental plot twists with sub-bass frequency impacts imparts a physical sense of gravity that heightens narrative weight, consequence, and emotional shock.",
    "Aligning sound effects to visual cuts with frame-level accuracy creates a seamless professional polish that commands audience respect, authority, and engagement across platforms.",
    "Enforcing the rule of acoustic economy prevents audio clutter and protects vocal clarity from confusing cacophonies of competing, chaotic sound effects on mobile audio chips.",
    "Balancing audio levels to minus fourteen LUFS and controlling peaks defends your content against digital clipping on mobile smartphone speakers across all short-form apps.",
    "Auditioning audio mixes across studio headphones, earbuds, and smartphone speakers guarantees consistent acoustic excellence for all viewers regardless of playback hardware.",
    "Curating an internal categorized sound effects library accelerates editor turnaround times and cements your signature sonic brand identity across all channel uploads.",
    "Uniting scriptwriting, cinematic visuals, and visceral sound design completes the sensory triangle that guarantees viral short-form retention, completion, and re-watches.",
    "Engineering three-dimensional acoustic atmospheres with tactile Foley effects and dynamic audio ducking transforms flat digital video into an immersive visceral experience.",
    "With production mechanics mastered, you must now systematize fulfillment into an automated assembly line that runs without founder labor, stress, or supervision."
]'''

text = re.sub(r'ch06_exts = \[.*?\]', new_ch06_exts, text, flags=re.DOTALL)
text = re.sub(r'ch07_exts = \[.*?\]', new_ch07_exts, text, flags=re.DOTALL)
text = re.sub(r'ch08_exts = \[.*?\]', new_ch08_exts, text, flags=re.DOTALL)
text = re.sub(r'ch09_exts = \[.*?\]', new_ch09_exts, text, flags=re.DOTALL)
text = re.sub(r'ch10_exts = \[.*?\]', new_ch10_exts, text, flags=re.DOTALL)

with open("scripts/author_faceless_part2.py", "w", encoding="utf-8") as f:
    f.write(text)

print("Updated author_faceless_part2.py with fully expanded extensions")
