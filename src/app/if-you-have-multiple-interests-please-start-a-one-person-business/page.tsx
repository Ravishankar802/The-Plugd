import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { MULTIPLE_INTERESTS_ONE_PERSON_DETAIL_DATA } from "@/lib/playbooks/multiple-interests-one-person-detail";

export const metadata: Metadata = {
  title: "If You Have Multiple Interests, Please Start a One-Person Business | Plugd",
  description: "If You Have Multiple Interests, Please Start a One-Person Business. Comprehensive slide decks and deep written lessons.",
  openGraph: {
    title: "If You Have Multiple Interests, Please Start a One-Person Business | Plugd",
    description: "If You Have Multiple Interests, Please Start a One-Person Business. Comprehensive slide decks and deep written lessons.",
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
          (await hasUserAccessToCourse(customer.id, "if-you-have-multiple-interests-please-start-a-one-person-business", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-24", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={MULTIPLE_INTERESTS_ONE_PERSON_DETAIL_DATA} hasAccess={hasAccess} />;
}
