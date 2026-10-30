import re

with open("scripts/author_copypaste5k_ch11_ch15.py", "r", encoding="utf-8") as f:
    text = f.read()

new_ch13_exts = '''ch13_exts = [
    "Transforming chaotic fulfillment into repeatable assembly lines via standard operating procedures is the foundational secret of scalable agency success, exceptional client satisfaction, high profitability, and institutional longevity.",
    "Constructing visual, step-by-step technical recipes allows complex workflows to be executed with zero error by any trained technical operator across your distributed engineering team.",
    "Modularizing service delivery into asset ingestion, funnel deployment, automation configuration, and quality testing guarantees consistent, high-performing results across all commercial client accounts.",
    "Standardizing onboarding checklists ensures that software workspaces, sub-accounts, and phone systems are provisioned rapidly without administrative friction, unnecessary confusion, or missed technical dependencies.",
    "Deploying proven master landing page templates slashes development timelines from weeks to hours while maintaining peak conversion performance in competitive, fast-moving live commercial markets.",
    "Engineering instant automated conversational SMS workflows captures prospect interest within sixty seconds, driving rapid consultation bookings and higher top-line client revenue across campaigns.",
    "Structuring intelligent branch logic and multi-step reminder sequences slashes appointment no-show rates and maximizes clinical utilization for your high-paying B2B commercial clients.",
    "Executing comprehensive end-to-end quality assurance testing with live simulated inquiries catches technical bugs before clients ever see them in an active production environment.",
    "Centralizing agency delivery playbooks inside an organized knowledge repository ensures that operational knowledge compounds predictably over time across the entire corporate firm and team.",
    "Updating standard operating procedures continuously as software platforms evolve defends your agency against technical obsolescence, broken API integrations, and operational glitches.",
    "Deploying enterprise-grade conversion architectures within seventy-two hours shocks clients with extreme velocity and builds deep commercial trust from the very first kickoff day.",
    "Predictable, flawless operational execution eliminates client anxiety, cements professional authority, and sets the unshakeable foundation for high long-term contract retention and growth.",
    "Documented standard operating procedures transform a fragile personal freelancing job into a scalable, valuable commercial enterprise capable of running autonomously without founder burnout or friction.",
    "Presenting completed projects through executive Loom walkthroughs and clean asset dossiers reinforces high perceived value and delights corporate stakeholders and executive leaders across the board.",
    "SOP-driven fulfillment protects your profit margins and guarantees that every client receives an identical standard of world-class operational excellence, responsiveness, and care.",
    "Codified delivery systems liberate the agency founder to focus exclusively on high-ticket client acquisition, strategic enterprise growth, team leadership, and aggressive market expansion.",
    "With fulfillment systematized, you can now orchestrate vetted subcontractors to execute delivery while capturing massive arbitrage profit spreads effortlessly, securely, and reliably."
]'''

text = re.sub(r'ch13_exts = \[.*?\]', new_ch13_exts, text, flags=re.DOTALL)

with open("scripts/author_copypaste5k_ch11_ch15.py", "w", encoding="utf-8") as f:
    f.write(text)

print("Updated ch13_exts in author_copypaste5k_ch11_ch15.py")
