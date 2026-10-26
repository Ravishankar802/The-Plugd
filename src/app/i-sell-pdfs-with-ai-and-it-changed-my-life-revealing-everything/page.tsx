import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { SELL_PDFS_WITH_AI_DETAIL } from "@/lib/playbooks/sell-pdfs-with-ai-changed-life-detail";

export const metadata: Metadata = {
  title: "I Sell PDFs With AI and It Changed My Life (Revealing Everything) | Plugd",
  description: "The complete blueprint to engineering and selling simple, high-converting digital PDFs with AI for 95%+ net profit margins.",
  openGraph: {
    title: "I Sell PDFs With AI and It Changed My Life (Revealing Everything) | Plugd",
    description: "The complete blueprint to engineering and selling simple, high-converting digital PDFs with AI for 95%+ net profit margins.",
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
          (await hasUserAccessToCourse(customer.id, "i-sell-pdfs-with-ai-and-it-changed-my-life-revealing-everything", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-58", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={SELL_PDFS_WITH_AI_DETAIL} hasAccess={hasAccess} />;
}
