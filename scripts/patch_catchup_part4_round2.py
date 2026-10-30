import re

path = "scripts/author_catchup_part4.py"
txt = open(path, encoding="utf-8").read()

# ch16: add ~130 words
t_ch16_1 = "Willpower is not a moral virtue; it is a delicate, rapidly exhausting metabolic resource governed by the prefrontal cortex."
r_ch16_1 = "Willpower is not a moral virtue; it is a delicate, rapidly exhausting metabolic resource governed by the prefrontal cortex. Treating it as an infinite reservoir is the primary reason high-achieving individuals frequently crash into depressive stagnation when attempting sudden life turnarounds."

t_ch16_2 = "When retreat is physically impossible, the human nervous system accesses reserves of focus and courage that are inaccessible under optionality."
r_ch16_2 = "When retreat is physically impossible, the human nervous system accesses reserves of focus and courage that are inaccessible under optionality. By eliminating all soft landing zones and alternative escapes, you force your subconscious mind to treat success as an urgent survival requirement."

t_ch16_3 = "When default carries guaranteed financial and psychological pain, excuses vanish and execution speed accelerates."
r_ch16_3 = "When default carries guaranteed financial and psychological pain, excuses vanish and execution speed accelerates. Mechanical stakes force your behavior into alignment with your stated ambitions, cutting through weeks of psychological hesitation and internal debate."

t_ch16_4 = "When you cross the threshold into that physical zone, your subconscious mind immediately recognizes that you are in a high-stakes operational war room, dropping effortlessly into flow."
r_ch16_4 = "When you cross the threshold into that physical zone, your subconscious mind immediately recognizes that you are in a high-stakes operational war room, dropping effortlessly into flow. Spatial conditioning removes the exhausting mental negotiation that typically precedes the initiation of deep work."

# ch17: add ~85 words
t_ch17_1 = "How you deploy your first fifty thousand dollars of surplus cash will dictate whether you build permanent wealth or slip back into stagnation."
r_ch17_1 = "How you deploy your first fifty thousand dollars of surplus cash will dictate whether you build permanent wealth or slip back into stagnation. Misallocating early capital into lifestyle inflation resets your vulnerability and ensures you remain trapped on the treadmill of active labor."

t_ch17_2 = "Channel diversification transforms vulnerable cash spikes into predictable, institutional revenue pipelines."
r_ch17_2 = "Channel diversification transforms vulnerable cash spikes into predictable, institutional revenue pipelines. Operating multiple client funnels simultaneously shields your enterprise from platform volatility and arbitrary account suspensions."

t_ch17_3 = "Proprietary assets compound in value while physical labor hours inevitably decay with biological exhaustion."
r_ch17_3 = "Proprietary assets compound in value while physical labor hours inevitably decay with biological exhaustion. Digital intellectual property represents the definitive mechanical bridge separating exhausted freelancers from true enterprise architects."

# ch18: add ~30 words
t_ch18_1 = "You have converted an emotional trauma into a technical optimization problem that can be solved with cool engineering precision."
r_ch18_1 = "You have converted an emotional trauma into a technical optimization problem that can be solved with cool engineering precision. Clinical problem formulation removes the paralyzing shame of failure and allows you to iterate with unshakeable tactical focus."

# ch20: add ~80 words
t_ch20_1 = "Long-term victory requires transitioning from high-velocity sprints to patient, structural endurance."
r_ch20_1 = "Long-term victory requires transitioning from high-velocity sprints to patient, structural endurance. Building an enduring enterprise demands the patient cultivation of institutional depth, operational moats, and generational wisdom that survive macroeconomic cycles."

t_ch20_2 = "Timeless foundations insulate your wealth against technological churn and temporary fads."
r_ch20_2 = "Timeless foundations insulate your wealth against technological churn and temporary fads. When your commercial offerings solve enduring human problems with technological excellence, your enterprise becomes an immovable pillar of value."

for t, r in [(t_ch16_1, r_ch16_1), (t_ch16_2, r_ch16_2), (t_ch16_3, r_ch16_3), (t_ch16_4, r_ch16_4),
            (t_ch17_1, r_ch17_1), (t_ch17_2, r_ch17_2), (t_ch17_3, r_ch17_3),
            (t_ch18_1, r_ch18_1),
            (t_ch20_1, r_ch20_1), (t_ch20_2, r_ch20_2)]:
    assert t in txt, f"Target not found: {t[:40]}"
    txt = txt.replace(t, r, 1)

open(path, "w", encoding="utf-8").write(txt)
print("Round 2 patch applied successfully!")
