import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from generate_batch_4_configs import CONFIGS_BATCH_4
from generate_batch_4_playbooks import file_prefixes, detail_export_names

for cfg in CONFIGS_BATCH_4:
    slug = cfg["slug"]
    prefix = file_prefixes[slug]
    detail_const = detail_export_names[slug]
    
    dir_path = f"src/app/{slug}"
    os.makedirs(dir_path, exist_ok=True)
    
    page_content = f'''import {{ Metadata }} from "next";
import {{ cookies }} from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import {{ getCustomerByAccessKey, hasUserAccessToCourse }} from "@/lib/playbooks";
import {{ {detail_const} }} from "@/lib/playbooks/{prefix}-detail";

export const metadata: Metadata = {{
  title: "{cfg["title"]} | Plugd",
  description: "{cfg["headline"]}",
  openGraph: {{
    title: "{cfg["title"]} | Plugd",
    description: "{cfg["headline"]}",
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
          (await hasUserAccessToCourse(customer.id, "{slug}", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "{cfg["id"]}", customer.email));
      }}
    }}
  }} catch (err) {{
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }}

  return <PlaybookDetailView playbook={{{detail_const}}} hasAccess={{hasAccess}} />;
}}
'''
    with open(f"{dir_path}/page.tsx", "w", encoding="utf-8") as f:
        f.write(page_content)
    print(f"Created {dir_path}/page.tsx")

print("All Batch 4 routes created successfully!")
