import os
import glob

files = glob.glob("src/app/*/page.tsx")
fixed = 0
for f in files:
    with open(f, "r", encoding="utf-8") as fp:
        content = fp.read()
    if "const hasAccess = true;" in content:
        # replace with let hasAccess = true;
        content = content.replace("const hasAccess = true;", "let hasAccess = true;")
        with open(f, "w", encoding="utf-8") as fp:
            fp.write(content)
        fixed += 1

print(f"Fixed {fixed} files: replaced const with let.")
