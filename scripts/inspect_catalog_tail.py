import re

with open('src/lib/playbooks-catalog.ts', 'r', encoding='utf-8') as f:
    text = f.read()

matches = re.findall(r'"id":\s*"(ai-businesses-\d+)"', text)
print(f'Total ai-businesses items: {len(matches)}')
print('Last 15:', matches[-15:])

titles = [
    "Want to made god-tier money",
    "There Are Only 3 Types Of Profitable Businesses",
    "If You Don't Understand Leadership",
    "I Built A Business With AI In 24 Hours",
    "Copy & Paste THIS Strategy To Make Your First $5,000",
    "7 Remote Jobs You Can Do From Home",
    "I Asked AI To Make Me As Much Money As Possible",
    "These Are The Best Business Books To Read",
    "My honest advice to someone who wants to get rich",
    "The $30K/Month Al Faceless Shorts Method",
    "How to Build $10K Websites in Minutes",
    "Master Higgsfield AI in 20 Minutes"
]

for t in titles:
    found = False
    for line in text.splitlines():
        if t.lower() in line.lower():
            print(f"FOUND in catalog: {line.strip()}")
            found = True
            break
    if not found:
        print(f"NOT FOUND in catalog: {t}")
