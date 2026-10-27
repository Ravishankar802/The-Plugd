import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { LAZIEST_WAYS_AI_BEGINNERS_DETAIL } from "@/lib/playbooks/laziest-ways-money-ai-beginners-detail";

export const metadata: Metadata = {
  title: "Laziest Ways to Make Money with AI (For Beginners) | Plugd",
  description: "A beginner's turnkey guide to low-maintenance AI income streams with zero inventory, minimal effort, and global laptop freedom.",
  openGraph: {
    title: "Laziest Ways to Make Money with AI (For Beginners) | Plugd",
    description: "A beginner's turnkey guide to low-maintenance AI income streams with zero inventory, minimal effort, and global laptop freedom.",
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
          (await hasUserAccessToCourse(customer.id, "laziest-ways-to-make-money-with-ai-for-beginners", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-32", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={LAZIEST_WAYS_AI_BEGINNERS_DETAIL} hasAccess={hasAccess} />;
}
