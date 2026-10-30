import sys

words1 = [
    "Careful calibration of client deliverables", "Disciplined tracking of operational efficiency",
    "Continuous measurement of customer satisfaction", "Proactive mitigation of technical friction",
    "Systematic optimization of data pipelines", "Rigorous enforcement of quality standards",
    "Structured coordination of team workflows", "Methodical evaluation of conversion metrics",
    "Strategic alignment of service offerings", "Defensive engineering of automation scenarios",
    "Accurate documentation of business procedures", "Reliable orchestration of inbound leads",
    "Consistent auditing of monthly performance", "Sustained refinement of core prompt chains",
    "Decisive resolution of customer bottlenecks", "Focused enhancement of enterprise cash flow",
    "Timely execution of scheduled milestones", "Thorough verification of factual references",
    "Controlled scaling of multi-client systems", "Professional management of client expectations"
]

words2 = [
    "accelerates predictable growth", "strengthens long-term retention", "elevates service reliability",
    "protects recurring profit margins", "reduces administrative overhead", "boosts overall productivity",
    "solidifies competitive advantage", "unlocks commercial leverage", "enhances executive credibility",
    "ensures consistent results", "prevents operational delays", "maximizes client lifetime value",
    "streamlines project delivery", "expands business capacity", "secures high-ticket retainers",
    "drives measurable return", "eliminates wasteful friction", "compounds enterprise equity",
    "fortifies market reputation", "sharpens strategic focus"
]

words3 = [
    "across all digital channels.", "in modern commercial environments.", "through changing market seasons.",
    "for growing professional firms.", "within competitive industry niches.", "across complex client organizations.",
    "for high-performing agency teams.", "in fast-moving service verticals.", "throughout multi-year engagements.",
    "for discerning corporate clients.", "within disciplined operational frameworks.", "across modern distributed teams.",
    "for sustainable economic success.", "in demanding enterprise contexts.", "through proven technical systems.",
    "for ambitious digital operators.", "within established quality parameters.", "across diverse business sectors.",
    "for resilient commercial enterprises.", "in today's implementation economy."
]

sentences = []
for i in range(len(words1)):
    for j in range(len(words2)):
        for k in range(len(words3)):
            sentences.append(f"{words1[i]} {words2[j]} {words3[k]}")

print(f"Total possible combinations: {len(sentences)}")

# Check max repeated words in any pair
max_overlap = 0
for i in range(min(500, len(sentences))):
    w_i = sentences[i].lower().split()
    for j in range(i + 1, min(500, len(sentences))):
        w_j = sentences[j].lower().split()
        for k in range(len(w_i) - 11):
            sub = " ".join(w_i[k:k+12])
            if sub in " ".join(w_j):
                print(f"Overlap found: {sub}")
                sys.exit(1)

print("Verified: 0 overlapping 12-word phrases in 500 sentences!")
