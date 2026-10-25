import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { MONEY_PRINCIPLES_20S_DETAIL_DATA } from "@/lib/playbooks/money-principles-20s-detail";

export const metadata: Metadata = {
  title: "The 5 Money Principles that will make anyone RICH in their 20s | Plugd",
  description: "The 5 Money Principles that will make anyone RICH in their 20s. Comprehensive slide decks and deep written lessons.",
  openGraph: {
    title: "The 5 Money Principles that will make anyone RICH in their 20s | Plugd",
    description: "The 5 Money Principles that will make anyone RICH in their 20s. Comprehensive slide decks and deep written lessons.",
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
          (await hasUserAccessToCourse(customer.id, "the-5-money-principles-that-will-make-anyone-rich-in-their-20s", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-12", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={MONEY_PRINCIPLES_20S_DETAIL_DATA} hasAccess={hasAccess} />;
}
