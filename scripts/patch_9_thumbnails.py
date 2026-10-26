import os

thumbnails_data = [
    {
        "id": "ai-businesses-38",
        "title": "7 Proven Ways to Make Money With AI (No Experience)",
        "url": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793013084/7_Proven_Ways_to_Make_Money_With_AI_No_Experience.png",
        "detail_path": "src/lib/playbooks/seven-proven-ways-ai-no-exp-detail.ts"
    },
    {
        "id": "ai-businesses-46",
        "title": "7 Remote Jobs You Can Do From Home",
        "url": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793013298/7_Remote_Jobs_You_Can_Do_From_Home.png",
        "detail_path": "src/lib/playbooks/seven-remote-jobs-from-home-detail.ts"
    },
    {
        "id": "ai-businesses-03",
        "title": "Give Me 26 Minutes, I'll Give You 10,000 Hours of Claude Knowledge",
        "url": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793013299/Give_Me_26_Minutes_I_ll_Give_You_10_000_Hours_of_Claude_Knowledge.png",
        "detail_path": "src/lib/playbooks/claude-knowledge-detail.ts"
    },
    {
        "id": "ai-businesses-34",
        "title": "7 Side Hustles Students Can Start In 2026",
        "url": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793013300/7_Side_Hustles_Students_Can_Start_In_2026.png",
        "detail_path": "src/lib/playbooks/side-hustles-students-2026-detail.ts"
    },
    {
        "id": "ai-businesses-40",
        "title": "18 Years Of UGLY Business Advice In 19 Minutes",
        "url": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793013301/18_Years_Of_UGLY_Business_Advice_In_19_Minutes.png",
        "detail_path": "src/lib/playbooks/eighteen-years-ugly-advice-detail.ts"
    },
    {
        "id": "ai-businesses-04",
        "title": "Give Me 28 Minutes, I'll Give You 10,000 Hours of ChatGPT Knowledge",
        "url": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793013301/Give_Me_28_Minutes_I_ll_Give_You_10_000_Hours_of_ChatGPT_Knowledge.png",
        "detail_path": "src/lib/playbooks/chatgpt-knowledge-detail.ts"
    },
    {
        "id": "ai-businesses-45",
        "title": "Copy & Paste THIS Strategy To Make Your First $5,000 Online",
        "url": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793013302/Copy_Paste_THIS_Strategy_To_Make_Your_First_5_000_Online.png",
        "detail_path": "src/lib/playbooks/copy-paste-strategy-first-5k-detail.ts"
    },
    {
        "id": "ai-businesses-07",
        "title": "Copy & Paste THIS Strategy to Make $13k/Month with AI in 2026",
        "url": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793013302/Copy_Paste_THIS_Strategy_to_Make_13kMonth_with_AI_in_2026_7.png",
        "detail_path": "src/lib/playbooks/copy-paste-13k-detail.ts"
    },
    {
        "id": "ai-businesses-08",
        "title": "Build A One-Person Business As A Beginner (From $0 To $10K)",
        "url": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793013304/Build_A_One-Person_Business_As_A_Beginner_From_0_To_10K.png",
        "detail_path": "src/lib/playbooks/one-person-business-detail.ts"
    }
]

catalog_path = "src/lib/playbooks-catalog.ts"
with open(catalog_path, "r", encoding="utf-8") as f:
    catalog_text = f.read()

for item in thumbnails_data:
    card_id = item["id"]
    url = item["url"]
    detail_path = item["detail_path"]
    
    # 1. Update Catalog
    target = f'"id": "{card_id}",'
    replacement = f'"id": "{card_id}",\n    "thumbnail": "{url}",'
    
    # Check if thumbnail already exists on card
    id_pos = catalog_text.find(target)
    if id_pos != -1:
        # Check next 200 chars for thumbnail
        chunk = catalog_text[id_pos:id_pos+300]
        if '"thumbnail":' in chunk:
            print(f"Thumbnail already present in catalog for {card_id}, skipping catalog replacement.")
        else:
            catalog_text = catalog_text.replace(target, replacement, 1)
            print(f"Added thumbnail to catalog for {card_id}!")
    else:
        print(f"ERROR: {target} not found in catalog!")
        
    # 2. Update Detail file
    if os.path.exists(detail_path):
        with open(detail_path, "r", encoding="utf-8") as df:
            dtext = df.read()
        if 'thumbnail: ""' in dtext:
            dtext = dtext.replace('thumbnail: ""', f'thumbnail: "{url}"')
            with open(detail_path, "w", encoding="utf-8") as df:
                df.write(dtext)
            print(f"Updated detail file {detail_path} with thumbnail!")
        elif f'thumbnail: "{url}"' in dtext:
            print(f"Thumbnail already in {detail_path}")
        else:
            print(f"Warning: thumbnail: \"\" not found in {detail_path}")

with open(catalog_path, "w", encoding="utf-8") as f:
    f.write(catalog_text)

print("Finished applying all 9 thumbnails!")
