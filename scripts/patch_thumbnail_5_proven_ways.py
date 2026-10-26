import os

thumbnail_url = "https://res.cloudinary.com/cy3gfawr/image/upload/v1793012004/5_Proven_Ways_To_Make_Money_With_AI_No_Experience.png"

# 1. Update playbooks-catalog.ts
catalog_path = "src/lib/playbooks-catalog.ts"
with open(catalog_path, "r", encoding="utf-8") as f:
    text = f.read()

target = '"id": "ai-businesses-05",'
replacement = f'"id": "ai-businesses-05",\n    "thumbnail": "{thumbnail_url}",'

if target in text:
    text = text.replace(target, replacement, 1)
    with open(catalog_path, "w", encoding="utf-8") as f:
        f.write(text)
    print("Catalog updated with thumbnail for ai-businesses-05!")
else:
    print("ERROR: target not found in catalog!")

# 2. Update five-proven-ways-detail.ts
detail_path = "src/lib/playbooks/five-proven-ways-detail.ts"
if os.path.exists(detail_path):
    with open(detail_path, "r", encoding="utf-8") as f:
        dtext = f.read()
    if 'thumbnail: ""' in dtext:
        dtext = dtext.replace('thumbnail: ""', f'thumbnail: "{thumbnail_url}"')
        with open(detail_path, "w", encoding="utf-8") as f:
            f.write(dtext)
        print("Detail data updated with thumbnail!")
