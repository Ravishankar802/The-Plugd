with open('scripts/solve_book4_ch08_to_14.py', 'r', encoding='utf-8') as f:
    text = f.read()

safe_text = text.split('print("Validating Chapters 08 to 14 for Book 4...")')[0]
local_vars = {}
exec(safe_text, local_vars)

for ch_num in range(8, 15):
    name = f'ch{ch_num:02d}_paras'
    plist = local_vars[name]
    counts = [len(p.split()) for p in plist]
    print(f"{name}: total={sum(counts)} words, min={min(counts)}, max={max(counts)}")
    print('  short (<65):', [(i+1, c) for i, c in enumerate(counts) if c < 65])
    print('  long (>135):', [(i+1, c) for i, c in enumerate(counts) if c > 135])
