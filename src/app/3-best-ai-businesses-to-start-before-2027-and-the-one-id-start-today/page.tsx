import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { THREE_BEST_AI_BIZ_2027_DETAIL } from "@/lib/playbooks/three-best-ai-businesses-before-2027-detail";

export const metadata: Metadata = {
  title: "3 best AI businesses to start before 2027 (and the one i'd start today) | Plugd",
  description: "The objective comparison of the top 3 AI business models\u2014and the exact low-drag asset system to launch today.",
  openGraph: {
    title: "3 best AI businesses to start before 2027 (and the one i'd start today) | Plugd",
    description: "The objective comparison of the top 3 AI business models\u2014and the exact low-drag asset system to launch today.",
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
          (await hasUserAccessToCourse(customer.id, "3-best-ai-businesses-to-start-before-2027-and-the-one-id-start-today", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-59", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={THREE_BEST_AI_BIZ_2027_DETAIL} hasAccess={hasAccess} />;
}
