import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { ZERO_AD_CUSTOMERS_DETAIL_DATA } from "@/lib/playbooks/zero-ad-customers-detail";

export const metadata: Metadata = {
  title: "5 Ways to Find Paying Customers Without Spending on Ads | Plugd",
  description: "Discover how to attract customers through Threads, Pinterest, email marketing, short-form video, and YouTube without depending on advertising budgets. Learn how to choose the right platforms, create content people actually care about, and build a clear path from discovery to purchase. Turn one piece of content into multiple marketing assets, capture leads, and build an audience you can reach again. Includes ready-to-use AI prompts, content templates, practical checklists, tracking frameworks, and a 30-day organic customer acquisition plan.",
  openGraph: {
    title: "5 Ways to Find Paying Customers Without Spending on Ads | Plugd",
    description: "Discover how to attract customers through Threads, Pinterest, email marketing, short-form video, and YouTube without depending on advertising budgets. Learn how to choose the right platforms, create content people actually care about, and build a clear path from discovery to purchase. Turn one piece of content into multiple marketing assets, capture leads, and build an audience you can reach again. Includes ready-to-use AI prompts, content templates, practical checklists, tracking frameworks, and a 30-day organic customer acquisition plan.",
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
          (await hasUserAccessToCourse(customer.id, "side-hustles", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "side-hustles-08", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={ZERO_AD_CUSTOMERS_DETAIL_DATA} hasAccess={hasAccess} />;
}
