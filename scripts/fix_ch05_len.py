with open("scripts/author_faceless_part1.py", "r", encoding="utf-8") as f:
    text = f.read()

target = '"Engineering viewer retention through the open-loop protocol ensures that hooked audiences stay engaged through the final frame of your short-form video without dropping off or swiping.",'
replacement = '"Engineering viewer retention through the open-loop protocol ensures that hooked audiences stay engaged through the final frame of your short-form video without dropping off or swiping to competing feeds in the algorithmic stream.",'

if target in text:
    text = text.replace(target, replacement)
    print("Replaced target in ch05_exts")
else:
    print("Target not found!")

with open("scripts/author_faceless_part1.py", "w", encoding="utf-8") as f:
    f.write(text)
