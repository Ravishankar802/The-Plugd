import re

content = open('src/lib/playbooks-data.ts', encoding='utf-8').read()
slugs = [
    'the-best-ai-side-hustles-to-start-in-2026-no-skills',
    'how-to-become-rich-with-social-media-my-exact-playbook',
    'how-to-catch-up-in-life-using-logic',
    'how-to-use-trading-212-in-2026-full-investing-guide',
    '7-proven-ways-to-make-money-with-ai-no-experience',
    'my-honest-advice-to-someone-who-wants-to-get-rich'
]

for s in slugs:
    m = re.search(r'["\']' + s + r'["\']:\s*(\w+)', content)
    if m:
        c_var = m.group(1)
        # find where c_var is defined or imported
        def_idx = content.find(c_var + ': PlaybookCourse =')
        if def_idx == -1:
            def_idx = content.find(c_var + ' =')
        chunk = content[def_idx:def_idx+300] if def_idx != -1 else 'Not found'
        m_title = re.search(r'title:\s*["\']([^"\']+)["\']', chunk)
        title = m_title.group(1) if m_title else 'N/A'
        print(f"{s} -> {c_var}: {title}")
    else:
        print(f"{s} -> NOT FOUND")
