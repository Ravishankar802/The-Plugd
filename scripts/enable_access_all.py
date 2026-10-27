import os
import json
import re

with open("scripts_remaining_playbooks.json", "r", encoding="utf-8") as f:
    playbooks = json.load(f)

updated_count = 0
already_true_count = 0

for p in playbooks:
    page_file = os.path.join("src", "app", p["slug"], "page.tsx")
    if not os.path.exists(page_file):
        print(f"Warning: {page_file} does not exist!")
        continue
    
    with open(page_file, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Check if hasAccess is already set to true
    if "const hasAccess = true;" in content or "hasAccess={true}" in content:
        already_true_count += 1
        continue
        
    # We want to ensure PlaybookPage has `const hasAccess = true;` and passes `hasAccess={hasAccess}`
    # Look for export default async function ...
    # Often it has cookies() check or let hasAccess = ...
    # Replace hasAccess logic with const hasAccess = true;
    
    # Check if it has `let hasAccess = false;` or similar
    if "let hasAccess = false;" in content:
        content = content.replace("let hasAccess = false;", "const hasAccess = true;")
        with open(page_file, "w", encoding="utf-8") as f:
            f.write(content)
        updated_count += 1
        continue
        
    # Or in the function body
    func_match = re.search(r"export default async function\s+\w+\s*\([^)]*\)\s*\{", content)
    if func_match:
        idx = func_match.end()
        # insert const hasAccess = true; right after
        new_content = content[:idx] + "\n  const hasAccess = true;" + content[idx:]
        # check if <PlaybookDetailView has hasAccess
        if "hasAccess=" not in new_content:
            new_content = re.sub(
                r"<PlaybookDetailView\s+([^>]+)/>",
                r"<PlaybookDetailView \1 hasAccess={hasAccess} />",
                new_content
            )
        with open(page_file, "w", encoding="utf-8") as f:
            f.write(new_content)
        updated_count += 1
    else:
        print(f"Could not parse function in {page_file}")

print(f"Updated {updated_count} files, {already_true_count} were already true.")
