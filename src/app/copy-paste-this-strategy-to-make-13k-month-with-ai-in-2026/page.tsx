import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { COPY_PASTE_13K_DETAIL_DATA } from "@/lib/playbooks/copy-paste-13k-detail";

export const metadata: Metadata = {
  title: "Copy & Paste THIS Strategy to Make $13k/Month with AI in 2026 | Plugd",
  description: "Copy & Paste THIS Strategy to Make $13k/Month with AI in 2026. Comprehensive slide decks and deep written lessons.",
  openGraph: {
    title: "Copy & Paste THIS Strategy to Make $13k/Month with AI in 2026 | Plugd",
    description: "Copy & Paste THIS Strategy to Make $13k/Month with AI in 2026. Comprehensive slide decks and deep written lessons.",
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
          (await hasUserAccessToCourse(customer.id, "copy-paste-this-strategy-to-make-13k-month-with-ai-in-2026", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-07", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={COPY_PASTE_13K_DETAIL_DATA} hasAccess={hasAccess} />;
}
