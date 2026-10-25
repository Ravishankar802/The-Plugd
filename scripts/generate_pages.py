import os

PAGES = [
    {
        "slug": "side-hustles",
        "course_id": "side-hustles-08",
        "title": "10 Ways to Find Paying Customers Without Spending on Ads",
        "detail_var": "ZERO_AD_CUSTOMERS_DETAIL_DATA",
        "detail_import": "@/lib/playbooks/zero-ad-customers-detail"
    },
    {
        "slug": "give-me-26-minutes-ill-give-you-10000-hours-of-claude-knowledge",
        "course_id": "ai-businesses-03",
        "title": "Give Me 26 Minutes, I'll Give You 10,000 Hours of Claude Knowledge",
        "detail_var": "CLAUDE_KNOWLEDGE_DETAIL_DATA",
        "detail_import": "@/lib/playbooks/claude-knowledge-detail"
    },
    {
        "slug": "give-me-28-minutes-ill-give-you-10000-hours-of-chatgpt-knowledge",
        "course_id": "ai-businesses-04",
        "title": "Give Me 28 Minutes, I'll Give You 10,000 Hours of ChatGPT Knowledge",
        "detail_var": "CHATGPT_KNOWLEDGE_DETAIL_DATA",
        "detail_import": "@/lib/playbooks/chatgpt-knowledge-detail"
    },
    {
        "slug": "5-proven-ways-to-make-money-with-ai-no-experience",
        "course_id": "ai-businesses-05",
        "title": "5 Proven Ways To Make Money With AI (No Experience)",
        "detail_var": "FIVE_PROVEN_WAYS_DETAIL_DATA",
        "detail_import": "@/lib/playbooks/five-proven-ways-detail"
    },
    {
        "slug": "the-best-ai-side-hustles-to-start-in-2026-no-skills",
        "course_id": "ai-businesses-06",
        "title": "The Best AI Side Hustles To Start In 2026 (No Skills)",
        "detail_var": "AI_SIDE_HUSTLES_2026_DETAIL_DATA",
        "detail_import": "@/lib/playbooks/ai-side-hustles-2026-detail"
    },
    {
        "slug": "copy-paste-this-strategy-to-make-13k-month-with-ai-in-2026",
        "course_id": "ai-businesses-07",
        "title": "Copy & Paste THIS Strategy to Make $13k/Month with AI in 2026",
        "detail_var": "COPY_PASTE_13K_DETAIL_DATA",
        "detail_import": "@/lib/playbooks/copy-paste-13k-detail"
    },
    {
        "slug": "build-a-one-person-business-as-a-beginner-from-0-to-10k",
        "course_id": "ai-businesses-08",
        "title": "Build A One-Person Business As A Beginner (From $0 To $10K)",
        "detail_var": "ONE_PERSON_BUSINESS_DETAIL_DATA",
        "detail_import": "@/lib/playbooks/one-person-business-detail"
    }
]

for p in PAGES:
    dir_path = f"src/app/{p['slug']}"
    os.makedirs(dir_path, exist_ok=True)
    file_path = f"{dir_path}/page.tsx"
    
    code = f"""import {{ Metadata }} from "next";
import {{ cookies }} from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import {{ getCustomerByAccessKey, hasUserAccessToCourse }} from "@/lib/playbooks";
import {{ {p['detail_var']} }} from "{p['detail_import']}";

export const metadata: Metadata = {{
  title: "{p['title']} | Plugd",
  description: "{p['title']}. Comprehensive slide decks and deep written lessons.",
  openGraph: {{
    title: "{p['title']} | Plugd",
    description: "{p['title']}. Comprehensive slide decks and deep written lessons.",
  }},
}};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {{
  let hasAccess = false;
  try {{
    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;
    if (accessKey) {{
      const customer = await getCustomerByAccessKey(accessKey);
      if (customer) {{
        hasAccess =
          (await hasUserAccessToCourse(customer.id, "{p['slug']}", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "{p['course_id']}", customer.email));
      }}
    }}
  }} catch (err) {{
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }}

  return <PlaybookDetailView playbook={{{p['detail_var']}}} hasAccess={{hasAccess}} />;
}}
"""
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(code)
    print(f"Created {file_path}")

print("All 7 playbook pages created successfully.")
