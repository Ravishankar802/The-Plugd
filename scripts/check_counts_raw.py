with open('scripts/author_investing_ch01_ch05.py', encoding='utf-8') as f:
    text = f.read().split('print(')[0]
ns = {'__file__': 'scripts/author_investing_ch01_ch05.py'}
exec(text, ns)
for k in ['ch02_paras', 'ch03_paras', 'ch04_paras', 'ch05_paras']:
    wc = sum(len(p.split()) for p in ns[k])
    print(k, len(ns[k]), wc, f"avg {wc/len(ns[k]):.1f}")
