import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { FIVE_YEARS_GET_RICH_AI_DETAIL } from "@/lib/playbooks/five-years-get-rich-before-ai-detail";

export const metadata: Metadata = {
  title: "You Have 5 Years to Get Rich Before AI Takes Over | Plugd",
  description: "A macro roadmap to front-run the greatest wealth transfer in history and accumulate sovereign assets before 2031.",
  openGraph: {
    title: "You Have 5 Years to Get Rich Before AI Takes Over | Plugd",
    description: "A macro roadmap to front-run the greatest wealth transfer in history and accumulate sovereign assets before 2031.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;
  try {
    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;
    if (accessKey) {
      const customer = await getCustomerByAccessKey(accessKey);
      if (customer) {
        hasAccess =
          (await hasUserAccessToCourse(customer.id, "you-have-5-years-to-get-rich-before-ai-takes-over", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-30", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={FIVE_YEARS_GET_RICH_AI_DETAIL} hasAccess={hasAccess} />;
}
