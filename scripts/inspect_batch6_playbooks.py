import glob
import re
import os

slug_to_var = {
    'the-best-ai-side-hustles-to-start-in-2026-no-skills': 'AI_SIDE_HUSTLES_2026_COURSE',
    'how-to-become-rich-with-social-media-my-exact-playbook': 'RICH_WITH_SOCIAL_MEDIA_COURSE',
    'how-to-catch-up-in-life-using-logic': 'CATCH_UP_IN_LIFE_LOGIC_COURSE',
    'how-to-use-trading-212-in-2026-full-investing-guide': 'TRADING_212_GUIDE_COURSE',
    '7-proven-ways-to-make-money-with-ai-no-experience': 'SEVEN_PROVEN_WAYS_AI_NO_EXP_COURSE',
    'my-honest-advice-to-someone-who-wants-to-get-rich': 'HONEST_ADVICE_GET_RICH_COURSE'
}

playbook_data_ts = open('src/lib/playbooks-data.ts', encoding='utf-8').read()

print("=== Batch 6 Playbooks Metadata ===")
for slug, var in slug_to_var.items():
    # find import path
    m = re.search(r'import\s*\{\s*' + var + r'\s*\}\s*from\s*["\']\./playbooks/([^"\']+)["\']', playbook_data_ts)
    if m:
        path = os.path.join('src', 'lib', 'playbooks', m.group(1) + '.ts')
        if os.path.exists(path):
            txt = open(path, encoding='utf-8').read()
            m_t = re.search(r'title:\s*["\']([^"\']+)["\']', txt)
            m_s = re.search(r'subtitle:\s*["\']([^"\']+)["\']', txt)
            m_d = re.search(r'description:\s*["\']([^"\']+)["\']', txt)
            # count modules
            mods = re.findall(r'title:\s*["\'](Module \d+:[^"\']+)["\']', txt)
            print(f"\nSlug: {slug}")
            print(f"  File: {path}")
            print(f"  Title: {m_t.group(1) if m_t else 'N/A'}")
            print(f"  Subtitle: {m_s.group(1) if m_s else 'N/A'}")
            print(f"  Desc: {m_d.group(1)[:120] if m_d else 'N/A'}...")
            print(f"  Modules ({len(mods)}): {mods[:3]}...")
        else:
            print(f"\nSlug: {slug} -> File not found: {path}")
    else:
        print(f"\nSlug: {slug} -> Import not found for {var}")
