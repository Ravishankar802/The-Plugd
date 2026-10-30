import re
import os

batch6_slugs = [
    'the-best-ai-side-hustles-to-start-in-2026-no-skills',
    'how-to-become-rich-with-social-media-my-exact-playbook',
    'how-to-catch-up-in-life-using-logic',
    'how-to-use-trading-212-in-2026-full-investing-guide',
    '7-proven-ways-to-make-money-with-ai-no-experience',
    'my-honest-advice-to-someone-who-wants-to-get-rich'
]

index_ts = open('src/lib/book-content/index.ts', encoding='utf-8').read()

print("=== Batch 6 ($5 Tier - 6 Books) Status ===")
for slug in batch6_slugs:
    m = re.search(r'["\']' + re.escape(slug) + r'["\']:\s*(\w+)', index_ts)
    var_name = m.group(1) if m else 'NOT FOUND'
    
    # find which file imports this var
    file_m = re.search(r'import\s*\{\s*' + re.escape(var_name) + r'\s*\}\s*from\s*["\']\./([^"\']+)["\']', index_ts)
    file_name = file_m.group(1) if file_m else 'UNKNOWN'
    
    manuscript_dir = os.path.join('book-manuscripts', slug)
    has_manuscript = os.path.exists(manuscript_dir)
    num_files = len(os.listdir(manuscript_dir)) if has_manuscript else 0
    
    print(f"Slug: {slug}")
    print(f"  Var: {var_name} in src/lib/book-content/{file_name}.ts")
    print(f"  Manuscript dir: {has_manuscript} ({num_files} files)")
