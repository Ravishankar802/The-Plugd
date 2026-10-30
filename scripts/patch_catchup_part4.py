import os, re

path = "scripts/author_catchup_part4.py"
txt = open(path, encoding="utf-8").read()

# Expand ch16
target_ch16 = [
    ('The undisciplined individual surrounds themselves with low-friction destructive temptations—smartphones on desks, streaming apps on televisions, junk food in pantries—while keeping high-yield behaviors behind high-friction barriers.',
     'The undisciplined individual surrounds themselves with low-friction destructive temptations—smartphones on desks, streaming apps on televisions, junk food in pantries—while keeping high-yield behaviors behind high-friction barriers. Every trivial obstacle standing in front of high-value work acts as an excuse for the exhausted executive brain to retreat into familiar digital sedation.'),
    ('When execution requires zero friction, discipline happens by default.',
     'When execution requires zero friction, discipline happens by default. You systematically engineer a frictionless runway where your productive energy flows directly into asset creation without preliminary mental friction.'),
    ('When retreat is physically impossible, the human nervous system accesses reserves of focus and courage that are inaccessible under optionality.',
     'When retreat is physically impossible, the human nervous system accesses reserves of focus and courage that are inaccessible under optionality. You eliminate the subtle psychological escape hatches that whisper of comfortable surrender.'),
    ('When default carries guaranteed financial and psychological pain, excuses vanish and execution speed accelerates.',
     'When default carries guaranteed financial and psychological pain, excuses vanish and execution speed accelerates. You align your immediate survival instincts with your long-term strategic objectives.'),
    ('The desire to maintain standing among high-performing peers acts as a powerful neurochemical forcing function that carries you through days when internal motivation is completely absent.',
     'The desire to maintain standing among high-performing peers acts as a powerful neurochemical forcing function that carries you through days when internal motivation is completely absent. Social expectation becomes an external engine of relentless consistency.'),
    ('When the brain realizes that it cannot escape, it directs its full analytical processing power toward conquering the primary obstacle.',
     'When the brain realizes that it cannot escape, it directs its full analytical processing power toward conquering the primary obstacle. Burning the bridges behind you transforms ambiguous hesitation into fierce operational focus.'),
    ('When the trigger is pulled consistently for thirty days, the behavioral response becomes automated, requiring zero conscious willpower to initiate.',
     'When the trigger is pulled consistently for thirty days, the behavioral response becomes automated, requiring zero conscious willpower to initiate. Your morning routine operates as a deterministic conveyor belt carrying you into deep work.'),
    ('When you cross the threshold into that physical zone, your subconscious mind immediately recognizes that you are in a high-stakes operational war room, dropping effortlessly into flow.',
     'When you cross the threshold into that physical zone, your subconscious mind immediately recognizes that you are in a high-stakes operational war room, dropping effortlessly into flow. Environmental cues eliminate the friction of initiating complex cognitive tasks.')
]

for t, r in target_ch16:
    assert t in txt, f"ch16 target not found: {t[:40]}"
    txt = txt.replace(t, r, 1)

# Expand ch17
target_ch17 = [
    ('How you deploy your first fifty thousand dollars of surplus cash will dictate whether you build permanent wealth or slip back into stagnation.',
     'How you deploy your first fifty thousand dollars of surplus cash will dictate whether you build permanent wealth or slip back into stagnation. Capital allocation at this stage is the ultimate test of strategic maturity and emotional control.'),
    ('The rational operator views business profits as fuel to purchase permanent, self-sustaining assets that generate cash flow around the clock.',
     'The rational operator views business profits as fuel to purchase permanent, self-sustaining assets that generate cash flow around the clock. Every dollar of surplus becomes a digital worker permanently assigned to expanding your balance sheet.'),
    ('Every dollar spent removing operational drag pays an immediate, compounding dividend in expanded output and reduced cognitive fatigue.',
     'Every dollar spent removing operational drag pays an immediate, compounding dividend in expanded output and reduced cognitive fatigue. Relieving founder bottlenecks is the highest-yielding operational investment available in modern enterprise.'),
    ('Multiple independent acquisition funnels ensure continuous, unkillable deal flow regardless of algorithmic changes.',
     'Multiple independent acquisition funnels ensure continuous, unkillable deal flow regardless of algorithmic changes. Channel diversification transforms vulnerable cash spikes into predictable, institutional revenue pipelines.'),
    ('Intellectual property transforms you from a disposable service provider into an enterprise asset owner.',
     'Intellectual property transforms you from a disposable service provider into an enterprise asset owner. Proprietary assets compound in value while physical labor hours inevitably decay with biological exhaustion.')
]

for t, r in target_ch17:
    assert t in txt, f"ch17 target not found: {t[:40]}"
    txt = txt.replace(t, r, 1)

# Expand ch18
target_ch18 = [
    ('The suffering, panic, rage, and despair are entirely optional mental constructs that you layer on top of the data.',
     'The suffering, panic, rage, and despair are entirely optional mental constructs that you layer on top of the data. Recognizing the distinction between objective occurrence and subjective interpretation liberates your cognitive processor for strategic resolution.'),
    ('You have converted an emotional trauma into a technical optimization problem that can be solved with cool engineering precision.',
     'You have converted an emotional trauma into a technical optimization problem that can be solved with cool engineering precision. Technical framing removes the paralyzing sting of failure and restores operational clarity.')
]

for t, r in target_ch18:
    assert t in txt, f"ch18 target not found: {t[:40]}"
    txt = txt.replace(t, r, 1)

# Expand ch20
target_ch20 = [
    ('You have won the immediate recovery battle; now you must architect a durable, decades-long empire of peace, purpose, and impact.',
     'You have won the immediate recovery battle; now you must architect a durable, decades-long empire of peace, purpose, and impact. Long-term victory requires transitioning from high-velocity sprints to patient, structural endurance.'),
    ('When you build assets that cater to immutable human nature and solve evergreen problems, your enterprises compound reliably across economic cycles.',
     'When you build assets that cater to immutable human nature and solve evergreen problems, your enterprises compound reliably across economic cycles. Timeless foundations insulate your wealth against technological churn and temporary fads.'),
    ('Your role evolves into that of a high-level capital allocator, strategic vision architect, and culture guardian, spending your time thinking deeply, evaluating risks, and identifying transformative opportunities.',
     'Your role evolves into that of a high-level capital allocator, strategic vision architect, and culture guardian, spending your time thinking deeply, evaluating risks, and identifying transformative opportunities. True enterprise ownership is measured by how effectively systems run without your daily physical intervention.')
]

for t, r in target_ch20:
    assert t in txt, f"ch20 target not found: {t[:40]}"
    txt = txt.replace(t, r, 1)

# Expand epilogue
target_epilogue = [
    ('The conditions will always be messy, imperfect, and fraught with uncertainty.',
     'The conditions will always be messy, imperfect, and fraught with uncertainty. Waiting for ideal circumstances is simply fear dressed in analytical clothing, delaying the inevitable collision with market reality.'),
    ('Permanent freedom is the only luxury that matters.',
     'Permanent freedom is the only luxury that matters. Everything else is depreciating noise designed to capture the attention of the insecure and keep them running on corporate treadmills.')
]

for t, r in target_epilogue:
    assert t in txt, f"epilogue target not found: {t[:40]}"
    txt = txt.replace(t, r, 1)

open(path, "w", encoding="utf-8").write(txt)
print("Part 4 patched successfully!")
