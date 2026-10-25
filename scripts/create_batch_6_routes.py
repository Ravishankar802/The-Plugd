import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from generate_batch_6_configs import CONFIGS_BATCH_6
from generate_batch_6_full import file_prefixes, export_const_names

for pb in CONFIGS_BATCH_6:
    slug = pb["slug"]
    fn = file_prefixes[slug]
    exp = export_const_names[slug]
    pb_id = pb["id"]
    title = pb["title"]
    headline = pb["headline"]
    
    dir_path = os.path.join("src", "app", slug)
    os.makedirs(dir_path, exist_ok=True)
    
    page_content = f"""import {{ Metadata }} from "next";
import {{ cookies }} from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import {{ getCustomerByAccessKey, hasUserAccessToCourse }} from "@/lib/playbooks";
import {{ {exp}_DETAIL }} from "@/lib/playbooks/{fn}-detail";

export const metadata: Metadata = {{
  title: "{title.replace('"', '\\"')} | Plugd",
  description: "{headline.replace('"', '\\"')}",
  openGraph: {{
    title: "{title.replace('"', '\\"')} | Plugd",
    description: "{headline.replace('"', '\\"')}",
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
          (await hasUserAccessToCourse(customer.id, "{pb_id}", customer.email));
      }}
    }}
  }} catch (err) {{
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }}

  return <PlaybookDetailView playbook={{{exp}_DETAIL}} hasAccess={{hasAccess}} />;
}}
"""
    file_path = os.path.join(dir_path, "page.tsx")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(page_content)
    print(f"Created route: {file_path}")

print("Batch 6 routes created successfully!")
