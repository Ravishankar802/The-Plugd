import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { TURNED_300_TO_100K_DETAIL_DATA } from "@/lib/playbooks/turned-300-to-100k-detail";

export const metadata: Metadata = {
  title: "How I turned $300 to $100,000 At 19 (My Side Hustles) | Plugd",
  description: "Turn your first few dollars into the foundation of something much bigger—discover how to build side hustles, master sales, grow e-commerce businesses, and turn your experience into multiple income streams.",
  openGraph: {
    title: "How I turned $300 to $100,000 At 19 (My Side Hustles) | Plugd",
    description: "Turn your first few dollars into the foundation of something much bigger—discover how to build side hustles, master sales, grow e-commerce businesses, and turn your experience into multiple income streams.",
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
          (await hasUserAccessToCourse(customer.id, "how-i-turned-300-to-100-000-at-19-my-side-hustles", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-17", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={TURNED_300_TO_100K_DETAIL_DATA} hasAccess={hasAccess} />;
}
