import re

with open("scripts/author_faceless_part2.py", "r", encoding="utf-8") as f:
    text = f.read()

# ch06 has 16 paras -> add 17th
target_ch06 = '"Mastering algorithmic scriptwriting gives your media empire an insurmountable competitive moat. While amateur creators churn out low-retention generic text, your scripts deliver gripping, cinematic storytelling that captures human hearts and commands algorithmic distribution.",'
extra_ch06 = '"Codifying your scriptwriting framework into rigorous standard operating procedures allows you to scale high-retention video production across dozens of automated channels without sacrificing narrative depth or dramatic tension.",'
if target_ch06 in text and extra_ch06 not in text:
    text = text.replace(target_ch06, target_ch06 + '\n    ' + extra_ch06)

# ch07 has 14 paras -> add 15, 16, 17
target_ch07 = '"Never underestimate the emotional power of a commanding voice. When an authoritative, beautifully balanced narration resonates through a viewer\'s headphones, it bypasses conscious skepticism and speaks directly to their emotional subconscious, transforming a thirty-second video into a profound cinematic experience.",'
extra_ch07_15 = '"Calibrating vocal micro-dynamics and dynamic pitch modulation ensures that synthetic narration delivers the gravitas, nuance, and emotional conviction of an elite human storyteller.",'
extra_ch07_16 = '"Mastering acoustic post-production and equalization transforms raw neural voice files into warm, broadcast-grade audio assets that command instant viewer respect across all mobile devices.",'
extra_ch07_17 = '"Establishing signature vocal identities for each channel in your media portfolio creates recognizable audio brands that viewers subconsciously associate with premium storytelling.",'
if target_ch07 in text and extra_ch07_15 not in text:
    text = text.replace(target_ch07, target_ch07 + '\n    ' + extra_ch07_15 + '\n    ' + extra_ch07_16 + '\n    ' + extra_ch07_17 + ',')

# ch08 has 15 paras -> add 16, 17
target_ch08 = '"Visual storytelling is the art of painting with light, motion, and emotion to grip the human soul. When your visuals dance in perfect, hypnotic synchronization with an authoritative voiceover and compelling script, you create a work of digital art that captivates millions of viewers across the globe.",'
extra_ch08_16 = '"Curating an expansive internal vault of categorized historical and cinematic B-roll assets slashes editing turnaround times while ensuring consistent aesthetic excellence.",'
extra_ch08_17 = '"Executing dynamic visual pacing and constant evolutionary cuts keeps the viewer sensory cortex in a state of continuous anticipation, driving completion rates past ninety percent.",'
if target_ch08 in text and extra_ch08_16 not in text:
    text = text.replace(target_ch08, target_ch08 + '\n    ' + extra_ch08_16 + '\n    ' + extra_ch08_17 + ',')

# ch09 has 15 paras -> add 16, 17
target_ch09 = '"Kinetic typography is the silent visual engine that bridges auditory storytelling with mobile browsing reality. When your words dance across the screen with bold authority and flawless rhythmic timing, you capture the undivided attention of silent browsers and headphone listeners alike, driving unprecedented watch time.",'
extra_ch09_16 = '"Mastering word-by-word kinetic subtitle animation ensures that your video delivers relentless visual momentum, capturing the sixty percent of mobile users who browse without sound.",'
extra_ch09_17 = '"Positioning bold, color-highlighted typography in the central vertical safe zone defends your text against mobile interface overlays and maximizes reading ease.",'
if target_ch09 in text and extra_ch09_16 not in text:
    text = text.replace(target_ch09, target_ch09 + '\n    ' + extra_ch09_16 + '\n    ' + extra_ch09_17 + ',')

# ch10 has 16 paras -> add 17th
target_ch10 = '"Mastering sound design completes the sensory triangle of short-form video production: uniting gripping scriptwriting, captivating visuals, and visceral acoustic atmospheres into a lethal, high-retention media asset that dominates platform recommendation feeds and captures millions of views.",'
extra_ch10 = '"Engineering three-dimensional acoustic atmospheres with tactile Foley effects and dynamic audio ducking transforms flat digital video into an immersive visceral experience that commands deep emotional engagement.",'
if target_ch10 in text and extra_ch10 not in text:
    text = text.replace(target_ch10, target_ch10 + '\n    ' + extra_ch10)

# Enriched extensions for ch06-ch10
new_ch06_exts = '''ch06_exts = [
    "Algorithmic scriptwriting represents the foundational structural engineering that carries emotional tension, prevents narrative sag, and guarantees complete short-form video retention across mobile platforms.",
    "Restricting script length strictly to one hundred and forty words maintains dramatic narrative pacing, prevents rushed voiceover delivery, and allows every spoken syllable to breathe with cinematic weight.",
    "Structuring scripts across the five-beat narrative arc ensures that every millisecond of video carries deliberate psychological momentum, escalating stakes, and emotional urgency.",
    "Escalating narrative stakes immediately following the opening hook captures viewer emotional investment and prevents costly audience drop-off during the critical early seconds.",
    "Introducing unexpected structural complications keeps viewers in continuous cognitive recalculation, defeating narrative predictability and keeping eyes glued to the unfolding story.",
    "Delivering the core story revelation at the climax provides intense emotional payoff that rewards viewer patience, deepens channel loyalty, and stimulates comment discussions.",
    "Pivoting the final beat into an infinite loop transition feeds seamless watch time directly back into the opening hook, multiplying average percentage viewed across platforms.",
    "Authoring prose specifically for auditory processing ensures that rhythm, cadence, sentence fragments, and breath control sound completely natural and gripping to the human ear.",
    "Deploying sensory, physical verbs stimulates viewer mirror neurons, creating vivid mental cinema that commands undivided attention and bypasses analytical skepticism.",
    "Purging corporate adverbs and weak descriptive adjectives produces lean, muscular prose that sustains high short-form algorithmic momentum from beginning to end.",
    "Inserting deliberate pregnant pauses into script punctuation builds unbearable narrative suspense immediately prior to major dramatic revelations and historical climaxes.",
    "Drafting three distinct hook variations for every narrative guarantees that only the highest-converting psychological angle enters expensive production pipelines.",
    "Organizing scripts inside standardized five-part schemas provides clear, unambiguous direction for voice synthesizers, asset curators, and technical video editors.",
    "Applying rigorous human editorial polish to raw AI drafts eliminates robotic clichés, corporate jargon, and generic tropes, infusing scripts with genuine emotional power.",
    "Mastering the craft of algorithmic scriptwriting provides the supreme creative weapon that powers your automated channels to massive virality and multi-million-view distribution.",
    "Codifying narrative formulas into repeatable standard operating procedures allows you to scale production across multiple channels without sacrificing dramatic storytelling standards.",
    "With your script calibrated to perfection, you must now synthesize hyper-realistic voice narration that commands deep dramatic authority and emotional resonance."
]'''

new_ch07_exts = '''ch07_exts = [
    "Audio constitutes fifty percent of the viewing experience, making hyper-realistic neural voice synthesis the emotional anchor of short-form viewer retention and narrative immersion.",
    "Deploying advanced neural voice models replicates subtle human respiratory pauses, dynamic inflections, and vocal fry, completely eliminating robotic uncanny valley effects.",
    "Aligning the vocal archetype with your niche's emotional gravity ensures that the voice projects authentic authority, timeless wisdom, and uncompromising technical precision.",
    "Creating bespoke custom voice clones protects your channel from audience fatigue associated with overused, generic platform voice presets flooding social feeds.",
    "Fine-tuning voice stability and clarity sliders achieves the optimal balance between natural human emotional expression, dramatic nuance, and crisp pronunciation.",
    "Calibrating narration speed to one hundred and fifty words per minute maintains the energetic momentum required for modern short-form retention curves without sounding breathless.",
    "Utilizing phonetic spelling adjustments ensures that historical names, foreign places, and complex technical terms are pronounced with flawless, classical accuracy.",
    "Injecting deliberate punctuation pauses forces natural synthetic breathing cycles, tricking the human brain into perceiving genuine living speech and human presence.",
    "Generating multiple takes of the opening hook allows you to audition and deploy only the most emotionally captivating vocal performance for live production.",
    "Routing synthetic voice tracks through standardized mastering chains removes digital sibilance, adds low-end warmth, and locks in broadcast-grade loudness levels.",
    "Mastering vocal tracks to minus fourteen LUFS ensures consistent audio levels that blend seamlessly with mobile platform recommendation feeds and user expectations.",
    "Documenting custom voice generation presets inside standard operating procedures allows seamless delegation to technical production assistants and overseas editors.",
    "A commanding, resonant voiceover bypasses conscious viewer defenses, transforming simple educational scripts into profound cinematic experiences that linger in the mind.",
    "Mastering neural voice generation provides an unshakeable acoustic advantage that elevates your channels far above low-effort automated competitors in the algorithm.",
    "Calibrating vocal micro-dynamics ensures that synthetic narration delivers the gravitas, nuance, and emotional conviction of an elite Hollywood voice actor.",
    "Acoustic post-production and equalization transform raw neural voice files into warm, broadcast-grade audio assets that command instant viewer respect across all mobile devices.",
    "With vocal performance secured, you must now assemble the visual architecture that captivates viewer eyes across every frame of short-form playback."
]'''

new_ch08_exts = '''ch08_exts = [
    "Visuals in short-form video function as an active dramatic engine, communicating meaning, evoking emotion, and driving narrative comprehension across every single frame.",
    "Enforcing the rule of visual evolution through continuous motion and dynamic zooms prevents visual stillness from triggering subconscious swipe-aways on mobile devices.",
    "Constructing a multi-tiered sourcing pipeline combining historical archives, licensed stock, and AI imagery creates rich cinematic variety that captivates diverse audiences.",
    "Curating public-domain historical archives from cultural institutions infuses your channels with authentic visual gravity, historical texture, and undeniable credibility.",
    "Utilizing premium licensed stock footage provides the atmospheric connective tissue that bridges specific historical events to universal emotional themes.",
    "Deploying custom generative AI imagery allows an operator to visualize unrecorded historical events and dramatic concepts with photorealistic cinematic precision.",
    "Maintaining strict visual style consistency through uniform color grading, lighting palettes, and film grain overlays establishes a signature channel aesthetic.",
    "Executing semantic visual synchronization ensures that every spoken word is instantly mirrored by an exact, emotionally resonant image on the screen.",
    "Animating flat historical photographs with 2.5D parallax depth effects creates an immersive three-dimensional illusion that captivates viewers and elevates production value.",
    "Translating abstract financial and philosophical concepts into visceral visual metaphors communicates narrative weight in milliseconds, aiding rapid comprehension.",
    "Applying subtle 35mm film grain and light leak overlays unifies diverse visual assets into a cohesive, high-budget documentary film stock that looks television-grade.",
    "Upscaling all visual assets to high-definition vertical resolution guarantees pristine visual clarity on modern high-density smartphone displays across platforms.",
    "Organizing internal footage libraries into thematic cloud directories accelerates editing workflows and slashes production turnaround times to under an hour.",
    "Synchronizing visual motion with narrative cadence creates an irresistible aesthetic harmony that elevates your agency far above amateur video competition.",
    "Mastering visual storytelling transforms disposable short-form clips into gripping cinematic art that commands compounding algorithmic reach and audience respect.",
    "Curating an expansive internal vault of categorized historical and cinematic B-roll assets slashes editing turnaround times while ensuring consistent aesthetic excellence.",
    "Executing dynamic visual pacing and constant evolutionary cuts keeps the viewer sensory cortex in a state of continuous anticipation, driving completion rates past ninety percent."
]'''

new_ch09_exts = '''ch09_exts = [
    "Kinetic typography serves as the essential visual reading engine that captures silent mobile browsers who consume content without audio enabled in public spaces.",
    "Animating written text with fluid motion physics guides the viewer's gaze across the screen and creates a hypnotic reading rhythm that prevents feed abandonment.",
    "Deploying the word-by-word animation protocol ensures rapid visual momentum, preventing cognitive fatigue caused by static paragraph blocks and dense text.",
    "Selecting bold geometric sans-serif typefaces guarantees immediate legibility on small smartphone screens against moving, high-contrast background footage.",
    "Utilizing high-contrast color highlights on critical emotional words directs viewer attention instantly to the dramatic crux of the narrative sentence.",
    "Color-coding dramatic trigger words stimulates subconscious visual processing, reinforcing narrative tension before conscious reading even occurs in the brain.",
    "Positioning subtitles strictly in the central vertical safe zone defends text legibility against native mobile interface overlays, icons, and account handles.",
    "Centralizing typography within the viewer's natural focal plane provides a frictionless reading experience that maximizes completion rates and watch time.",
    "Applying snappy ease-out scale animations makes typography feel organic, tactile, and physically responsive to vocal cadence and dramatic emphasis.",
    "Embedding contextual micro-emojis and vector icons alongside highlighted words bridges linguistic and visual brain hemispheres effortlessly and intuitively.",
    "Deploying dynamic motion graphics and animated maps visualizes complex data and historical timelines in clear, intuitive seconds without cognitive strain.",
    "Auditing automated transcription outputs manually ensures that proper nouns are spelled correctly and key words are highlighted with surgical precision.",
    "Maintaining consistent font choices and animation styling establishes an authoritative visual brand identity that viewers recognize instantly across feeds.",
    "Kinetic typography unifies silent browsing behavior with auditory storytelling, capturing the sixty percent of users who browse on mute with zero friction.",
    "Mastering subtitle animation transforms spoken words into captivating visual art, driving peak retention across global recommendation feeds and algorithms.",
    "Mastering word-by-word kinetic subtitle animation ensures that your video delivers relentless visual momentum, capturing the sixty percent of mobile users who browse without sound.",
    "Positioning bold, color-highlighted typography in the central vertical safe zone defends your text against mobile interface overlays and maximizes reading ease."
]'''

new_ch10_exts = '''ch10_exts = [
    "Sound design acts as the invisible emotional puppet master of short-form media, directly triggering visceral nervous system responses, adrenaline, and awe.",
    "Orchestrating acoustic frequencies with deliberate dramatic intent controls viewer emotional states and sustains deep narrative suspense throughout playback.",
    "Constructing multi-layered sound landscapes combining vocals, atmospheric beds, and tactile Foley elevates videos to cinematic heights comparable to film trailers.",
    "Preserving the vocal track as the primary centerpiece of the mix ensures that background audio never compromises speech intelligibility or auditory clarity.",
    "Selecting dark ambient soundscapes and brooding orchestral passages provides the emotional gravity that mirrors your script's narrative arc and climax.",
    "Synchronizing tactile Foley sound effects with visual cuts imparts physical weight to digital pixels, making visuals feel tangible, real, and immersive.",
    "Deploying dynamic audio ducking carves out acoustic space for vocal clarity while allowing music to swell during dramatic pauses and story climaxes.",
    "Utilizing sudden dead silence prior to major narrative climaxes creates a shocking pattern interrupt that magnifies dramatic impact and viewer focus.",
    "Anchoring monumental plot twists with sub-bass frequency impacts imparts a physical sense of gravity that heightens narrative weight and emotional shock.",
    "Aligning sound effects to visual cuts with frame-level accuracy creates a seamless professional polish that commands audience respect and engagement.",
    "Enforcing the rule of acoustic economy prevents audio clutter and protects vocal clarity from confusing cacophonies of competing, chaotic sound effects.",
    "Balancing audio levels to minus fourteen LUFS and controlling peaks defends your content against digital clipping on mobile smartphone speakers across apps.",
    "Auditioning audio mixes across studio headphones, earbuds, and smartphone speakers guarantees consistent acoustic excellence for all viewers regardless of hardware.",
    "Curating an internal categorized sound effects library accelerates editor turnaround times and cements your signature sonic brand identity across uploads.",
    "Uniting scriptwriting, cinematic visuals, and visceral sound design completes the sensory triangle that guarantees viral short-form retention and completion.",
    "Engineering three-dimensional acoustic atmospheres with tactile Foley effects and dynamic audio ducking transforms flat digital video into an immersive visceral experience.",
    "With production mechanics mastered, you must now systematize fulfillment into an automated assembly line that runs without founder labor or supervision."
]'''

text = re.sub(r'ch06_exts = \[.*?\]', new_ch06_exts, text, flags=re.DOTALL)
text = re.sub(r'ch07_exts = \[.*?\]', new_ch07_exts, text, flags=re.DOTALL)
text = re.sub(r'ch08_exts = \[.*?\]', new_ch08_exts, text, flags=re.DOTALL)
text = re.sub(r'ch09_exts = \[.*?\]', new_ch09_exts, text, flags=re.DOTALL)
text = re.sub(r'ch10_exts = \[.*?\]', new_ch10_exts, text, flags=re.DOTALL)

with open("scripts/author_faceless_part2.py", "w", encoding="utf-8") as f:
    f.write(text)

print("Updated author_faceless_part2.py with full 17-para chapters and enriched extensions")
