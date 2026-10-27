import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { MAKING_MONEY_ONLINE_EASY_DETAIL } from "@/lib/playbooks/making-money-online-easy-copy-detail";

export const metadata: Metadata = {
  title: "Making Money Online is Easy, Actually (Just Copy Me) | Plugd",
  description: "A veteran entrepreneur's simplified blueprint to stripping away noise and generating consistent online cash flow.",
  openGraph: {
    title: "Making Money Online is Easy, Actually (Just Copy Me) | Plugd",
    description: "A veteran entrepreneur's simplified blueprint to stripping away noise and generating consistent online cash flow.",
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
          (await hasUserAccessToCourse(customer.id, "making-money-online-is-easy-actually-just-copy-me", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-35", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={MAKING_MONEY_ONLINE_EASY_DETAIL} hasAccess={hasAccess} />;
}
