import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { LAZIEST_WAY_500_DAY_DETAIL_DATA } from "@/lib/playbooks/laziest-way-500-day-detail";

export const metadata: Metadata = {
  title: "Laziest Way to Make Money Online in 2026 ($500/day) | Plugd",
  description: "Build a digital product once, put it in front of the right audience, and turn AI into your unfair advantage for making money online.",
  openGraph: {
    title: "Laziest Way to Make Money Online in 2026 ($500/day) | Plugd",
    description: "Build a digital product once, put it in front of the right audience, and turn AI into your unfair advantage for making money online.",
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
          (await hasUserAccessToCourse(customer.id, "laziest-way-to-make-money-online-in-2026-500-day", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-09", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={LAZIEST_WAY_500_DAY_DETAIL_DATA} hasAccess={hasAccess} />;
}
