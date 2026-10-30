path = 'scripts/author_money_online_part3.py'
text = open(path, encoding='utf-8').read()
target = 'print("\\n--- Validating Chapters 15 to 20 and Epilogue ---")'
if target in text:
    parts = text.split(target)
    commented_tail = '\n'.join('# ' + line if line.strip() else line for line in (target + parts[1]).split('\n'))
    open(path, 'w', encoding='utf-8').write(parts[0] + commented_tail)
    print('Commented out successfully.')
else:
    print('Target not found.')
