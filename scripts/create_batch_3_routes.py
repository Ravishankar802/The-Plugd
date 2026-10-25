import os

ROUTES = [
    {
        "slug": "how-i-turned-300-to-100-000-at-19-my-side-hustles",
        "course_id": "ai-businesses-17",
        "title": "How I turned $300 to $100,000 At 19 (My Side Hustles)",
        "file_name": "turned-300-to-100k",
        "export_var": "TURNED_300_TO_100K_DETAIL_DATA"
    },
    {
        "slug": "how-to-become-rich-with-social-media-my-exact-playbook",
        "course_id": "ai-businesses-18",
        "title": "How to become rich with social media (my exact playbook)",
        "file_name": "rich-with-social-media",
        "export_var": "RICH_WITH_SOCIAL_MEDIA_DETAIL_DATA"
    },
    {
        "slug": "how-to-get-rich-for-service-based-businesses-thank-me-later",
        "course_id": "ai-businesses-19",
        "title": "How to Get Rich for Service-Based Businesses (Thank Me Later)",
        "file_name": "get-rich-service-businesses",
        "export_var": "GET_RICH_SERVICE_BUSINESSES_DETAIL_DATA"
    },
    {
        "slug": "the-new-way-of-making-content-in-the-age-of-ai",
        "course_id": "ai-businesses-20",
        "title": "The New Way of Making Content In The Age of AI",
        "file_name": "new-way-content-ai",
        "export_var": "NEW_WAY_CONTENT_AI_DETAIL_DATA"
    },
    {
        "slug": "how-to-catch-up-in-life-using-logic",
        "course_id": "ai-businesses-21",
        "title": "How to Catch Up In Life (Using Logic)",
        "file_name": "catch-up-in-life-logic",
        "export_var": "CATCH_UP_IN_LIFE_LOGIC_DETAIL_DATA"
    },
    {
        "slug": "what-makes-the-perfect-business-5-things",
        "course_id": "ai-businesses-22",
        "title": "What Makes The Perfect Business (5 Things)",
        "file_name": "perfect-business-5-things",
        "export_var": "PERFECT_BUSINESS_5_THINGS_DETAIL_DATA"
    },
    {
        "slug": "how-to-use-ai-in-your-business-in-2026",
        "course_id": "ai-businesses-23",
        "title": "How to Use AI in Your Business in 2026",
        "file_name": "use-ai-in-business-2026",
        "export_var": "USE_AI_IN_BUSINESS_2026_DETAIL_DATA"
    },
    {
        "slug": "if-you-have-multiple-interests-please-start-a-one-person-business",
        "course_id": "ai-businesses-24",
        "title": "If You Have Multiple Interests, Please Start a One-Person Business",
        "file_name": "multiple-interests-one-person",
        "export_var": "MULTIPLE_INTERESTS_ONE_PERSON_DETAIL_DATA"
    }
]

TEMPLATE = """import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { __EXPORT_VAR__ } from "@/lib/playbooks/__FILE_NAME__-detail";

export const metadata: Metadata = {
  title: "__ESCAPED_TITLE__ | Plugd",
  description: "__ESCAPED_TITLE__. Comprehensive slide decks and deep written lessons.",
  openGraph: {
    title: "__ESCAPED_TITLE__ | Plugd",
    description: "__ESCAPED_TITLE__. Comprehensive slide decks and deep written lessons.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;
  try {
    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;
    if (accessKey) {
      const customer = await getCustomerByAccessKey(accessKey);
      if (customer) {
        hasAccess =
          (await hasUserAccessToCourse(customer.id, "__SLUG__", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "__COURSE_ID__", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={__EXPORT_VAR__} hasAccess={hasAccess} />;
}
"""

for r in ROUTES:
    dir_path = os.path.join("src", "app", r["slug"])
    os.makedirs(dir_path, exist_ok=True)
    page_file = os.path.join(dir_path, "page.tsx")
    content = (
        TEMPLATE
        .replace("__EXPORT_VAR__", r["export_var"])
        .replace("__FILE_NAME__", r["file_name"])
        .replace("__ESCAPED_TITLE__", r["title"].replace('"', '\\"'))
        .replace("__SLUG__", r["slug"])
        .replace("__COURSE_ID__", r["course_id"])
    )
    with open(page_file, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created: {page_file}")

print("All batch 3 routes created successfully!")
