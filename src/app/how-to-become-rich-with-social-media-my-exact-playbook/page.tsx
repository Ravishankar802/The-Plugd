import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { RICH_WITH_SOCIAL_MEDIA_DETAIL_DATA } from "@/lib/playbooks/rich-with-social-media-detail";

export const metadata: Metadata = {
  title: "How to become rich with social media (my exact playbook) | Plugd",
  description: "How to become rich with social media (my exact playbook). Comprehensive slide decks and deep written lessons.",
  openGraph: {
    title: "How to become rich with social media (my exact playbook) | Plugd",
    description: "How to become rich with social media (my exact playbook). Comprehensive slide decks and deep written lessons.",
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
          (await hasUserAccessToCourse(customer.id, "how-to-become-rich-with-social-media-my-exact-playbook", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-18", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={RICH_WITH_SOCIAL_MEDIA_DETAIL_DATA} hasAccess={hasAccess} />;
}
