import os

ROUTES = [
    {
        "slug": "laziest-way-to-make-money-online-in-2026-500-day",
        "course_id": "ai-businesses-09",
        "title": "Laziest Way to Make Money Online in 2026 ($500/day)",
        "file_name": "laziest-way-500-day",
        "export_var": "LAZIEST_WAY_500_DAY_DETAIL_DATA"
    },
    {
        "slug": "the-blueprint-to-go-from-0-to-1000000",
        "course_id": "ai-businesses-10",
        "title": "The Blueprint To Go From $0 To $1,000,000",
        "file_name": "blueprint-0-to-1m",
        "export_var": "BLUEPRINT_0_TO_1M_DETAIL_DATA"
    },
    {
        "slug": "your-first-1m-is-simple-heres-how",
        "course_id": "ai-businesses-11",
        "title": "Your First $1M Is Simple (Here's How)",
        "file_name": "first-1m-is-simple",
        "export_var": "FIRST_1M_IS_SIMPLE_DETAIL_DATA"
    },
    {
        "slug": "the-5-money-principles-that-will-make-anyone-rich-in-their-20s",
        "course_id": "ai-businesses-12",
        "title": "The 5 Money Principles that will make anyone RICH in their 20s",
        "file_name": "money-principles-20s",
        "export_var": "MONEY_PRINCIPLES_20S_DETAIL_DATA"
    },
    {
        "slug": "its-boring-but-will-make-even-beginners-millionaires-in-2026",
        "course_id": "ai-businesses-13",
        "title": "It's Boring, But Will Make Even Beginners Millionaires in 2026",
        "file_name": "boring-millionaires-2026",
        "export_var": "BORING_MILLIONAIRES_2026_DETAIL_DATA"
    },
    {
        "slug": "i-locked-myself-in-a-room-until-i-built-a-350-000-mo-business",
        "course_id": "ai-businesses-14",
        "title": "I Locked Myself In a Room Until I Built a $350,000/mo Business",
        "file_name": "locked-in-room-350k",
        "export_var": "LOCKED_IN_ROOM_350K_DETAIL_DATA"
    },
    {
        "slug": "the-4-levels-to-getting-rich-in-2026",
        "course_id": "ai-businesses-15",
        "title": "The 4 Levels To Getting RICH in 2026",
        "file_name": "four-levels-getting-rich-2026",
        "export_var": "FOUR_LEVELS_GETTING_RICH_2026_DETAIL_DATA"
    },
    {
        "slug": "the-a-i-revolution-8-ways-to-get-rich",
        "course_id": "ai-businesses-16",
        "title": "The A.I. Revolution: 8 Ways to get RICH",
        "file_name": "ai-revolution-8-ways",
        "export_var": "AI_REVOLUTION_8_WAYS_DETAIL_DATA"
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

REDIRECT_TEMPLATE = """import { redirect } from "next/navigation";

export default function RedirectPage() {
  redirect("/the-4-levels-to-getting-rich-in-2026");
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

# Also create redirect from 2023 slug
dir_2023 = os.path.join("src", "app", "the-4-levels-to-getting-rich-in-2023")
os.makedirs(dir_2023, exist_ok=True)
with open(os.path.join(dir_2023, "page.tsx"), "w", encoding="utf-8") as f:
    f.write(REDIRECT_TEMPLATE)
print(f"Created redirect: {os.path.join(dir_2023, 'page.tsx')}")
