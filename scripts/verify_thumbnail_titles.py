catalog = open('src/lib/playbooks-catalog.ts', encoding='utf-8').read()

thumbnails_map = {
    "7 Proven Ways to Make Money With AI (No Experience)": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793013084/7_Proven_Ways_to_Make_Money_With_AI_No_Experience.png",
    "7 Remote Jobs You Can Do From Home": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793013298/7_Remote_Jobs_You_Can_Do_From_Home.png",
    "Give Me 26 Minutes, I'll Give You 10,000 Hours of Claude Knowledge": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793013299/Give_Me_26_Minutes_I_ll_Give_You_10_000_Hours_of_Claude_Knowledge.png",
    "7 Side Hustles Students Can Start In 2026": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793013300/7_Side_Hustles_Students_Can_Start_In_2026.png",
    "18 Years Of UGLY Business Advice In 19 Minutes": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793013301/18_Years_Of_UGLY_Business_Advice_In_19_Minutes.png",
    "Give Me 28 Minutes, I'll Give You 10,000 Hours of ChatGPT Knowledge": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793013301/Give_Me_28_Minutes_I_ll_Give_You_10_000_Hours_of_ChatGPT_Knowledge.png",
    "Copy & Paste THIS Strategy To Make Your First $5,000 Online": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793013302/Copy_Paste_THIS_Strategy_To_Make_Your_First_5_000_Online.png",
    "Copy & Paste THIS Strategy to Make $13k/Month with AI in 2026": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793013302/Copy_Paste_THIS_Strategy_to_Make_13kMonth_with_AI_in_2026_7.png",
    "Build A One-Person Business As A Beginner (From $0 To $10K)": "https://res.cloudinary.com/cy3gfawr/image/upload/v1793013304/Build_A_One-Person_Business_As_A_Beginner_From_0_To_10K.png"
}

for title, url in thumbnails_map.items():
    idx = catalog.find(f'"title": "{title}"')
    if idx == -1:
        # Try searching by partial title
        part = title[:25]
        idx2 = catalog.find(part)
        print(f"FAILED exact match for: {title} (partial at {idx2})")
    else:
        # Find the card id
        id_start = catalog.rfind('"id": "', 0, idx)
        id_end = catalog.find('"', id_start + 7)
        card_id = catalog[id_start+7:id_end]
        print(f"MATCH: {card_id} -> {title}")
